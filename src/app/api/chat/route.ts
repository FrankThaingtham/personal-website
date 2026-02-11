// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { supabaseAdmin } from '@/lib/supabase';
import { getOrCreateVisitorId } from '@/lib/visitor';

// Required for Cloudflare Pages deployment
export const runtime = 'edge';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const VECTOR_STORE_ID = process.env.VECTOR_STORE_ID!;
const PHONE_NUMBER = process.env.FRANK_PHONE_NUMBER || 'frankthaingtham@hotmail.com';

// Structured output schema
interface ChatResponse {
  answer: string;
  mode: 'recruiter' | 'casual';
  confidence: 'high' | 'medium' | 'low';
  next_actions?: Array<{
    label: string;
    href: string;
    reason: string;
  }>;
  fallback?: {
    type: 'phone' | 'email';
    message: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const visitorId = await getOrCreateVisitorId();
    const body = await request.json();
    const { message, session_id } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // RATE LIMITING: Check message count in last 24 hours
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { data: recentMessages, error: countError } = await supabaseAdmin
      .from('chat_messages')
      .select('id, created_at')
      .eq('visitor_id', visitorId)
      .eq('role', 'user')
      .gte('created_at', twentyFourHoursAgo);

    if (countError) throw countError;

    const messageCount = recentMessages?.length || 0;

    // Limit: 10 messages per 24 hours
    if (messageCount >= 10) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded',
          message: "You've reached your daily limit (10 messages). Try again tomorrow!",
          rate_limited: true
        },
        { status: 429 }
      );
    }

    // SPAM DETECTION: Check if > 3 messages in last 10 seconds
    if (recentMessages && recentMessages.length >= 3) {
      const tenSecondsAgo = new Date(Date.now() - 10 * 1000);
      const recentSpam = recentMessages.filter(
        msg => new Date(msg.created_at) > tenSecondsAgo
      );
      
      if (recentSpam.length >= 3) {
        return NextResponse.json(
          { 
            error: 'Spam detected',
            message: 'Slow down! Please wait a few seconds between messages.',
            rate_limited: true
          },
          { status: 429 }
        );
      }
    }

    // 1. Get or create session
    let sessionId = session_id;
    if (!sessionId) {
      const { data: newSession, error: sessionError } = await supabaseAdmin
        .from('chat_sessions')
        .insert({ visitor_id: visitorId })
        .select()
        .single();

      if (sessionError) throw sessionError;
      sessionId = newSession.id;
    }

    // 2. Fetch visitor preferences for context
    const { data: preferences } = await supabaseAdmin
      .from('preferences')
      .select('role, goal, from_where')
      .eq('visitor_id', visitorId)
      .single();

    // 3. Determine mode based on preferences
    const mode: 'recruiter' | 'casual' =
      preferences?.role === 'recruiter' ? 'recruiter' : 'casual';

    // 4. Load last 12 messages from this session
    const { data: previousMessages } = await supabaseAdmin
      .from('chat_messages')
      .select('role, content')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true })
      .limit(12);

    // 5. Build conversation history
    const conversationHistory = previousMessages?.map((msg) => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
    })) || [];

    // 6. Build system instructions with knowledge base context
    const systemInstructions = buildSystemInstructions(mode, preferences);

    // 7. Create or get assistant with file search
    let assistantId = process.env.OPENAI_ASSISTANT_ID;
    
    if (!assistantId) {
      // Create assistant on first run
      const assistant = await openai.beta.assistants.create({
        name: "Frank's AI Assistant",
        instructions: systemInstructions,
        model: 'gpt-4o-mini',
        tools: [{ type: 'file_search' }],
        tool_resources: {
          file_search: {
            vector_store_ids: [VECTOR_STORE_ID],
          },
        },
      });
      assistantId = assistant.id;
      console.log('💡 Save this Assistant ID to .env.local as OPENAI_ASSISTANT_ID:', assistantId);
    }

    // 8. Create a thread (conversation)
    const thread = await openai.beta.threads.create({
      messages: [
        ...conversationHistory.map(msg => ({
          role: msg.role,
          content: msg.content,
        })),
        {
          role: 'user',
          content: message,
        },
      ],
    });

    // 9. Run the assistant
    const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
      assistant_id: assistantId,
      instructions: systemInstructions, // Override with current mode
    });

    // 10. Get the assistant's response
    let assistantMessage = '';
    
    if (run.status === 'completed') {
      const messages = await openai.beta.threads.messages.list(thread.id);
      const lastMessage = messages.data[0];
      
      if (lastMessage.content[0].type === 'text') {
        assistantMessage = lastMessage.content[0].text.value;
      }
    } else {
      throw new Error(`Run failed with status: ${run.status}`);
    }

    // 11. Determine confidence (simple heuristic)
    const confidence = determineConfidence(assistantMessage, run);

    // 12. Generate next actions based on content
    const nextActions = generateNextActions(assistantMessage, mode);

    // 13. Generate fallback if low confidence
    const fallback =
      confidence === 'low'
        ? {
            type: 'phone' as const,
            message: `I don't have enough info on that. Frank can help! Reach him at ${PHONE_NUMBER}`,
          }
        : undefined;

    // 14. Save user message to database
    await supabaseAdmin.from('chat_messages').insert({
      session_id: sessionId,
      visitor_id: visitorId,
      role: 'user',
      content: message,
    });

    // 15. Save assistant message to database
    await supabaseAdmin.from('chat_messages').insert({
      session_id: sessionId,
      visitor_id: visitorId,
      role: 'assistant',
      content: assistantMessage,
      mode,
      confidence,
      metadata: { next_actions: nextActions, fallback },
    });

    // 16. Log events
    await supabaseAdmin.from('events').insert([
      {
        visitor_id: visitorId,
        event_name: 'chat_message_sent',
        page_path: '/chat',
        metadata: { session_id: sessionId, mode },
      },
      {
        visitor_id: visitorId,
        event_name: 'chat_response_received',
        page_path: '/chat',
        metadata: { session_id: sessionId, mode, confidence },
      },
    ]);

    if (fallback) {
      await supabaseAdmin.from('events').insert({
        visitor_id: visitorId,
        event_name: 'chat_fallback_phone_shared',
        page_path: '/chat',
        metadata: { session_id: sessionId },
      });
    }

    // 17. Return structured response
    const response: ChatResponse = {
      answer: assistantMessage,
      mode,
      confidence,
      next_actions: nextActions,
      fallback,
    };

    return NextResponse.json({
      ...response,
      session_id: sessionId,
    });
  } catch (error: any) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process chat message',
        details: error.message,
        type: error.name 
      },
      { status: 500 }
    );
  }
}

function buildSystemInstructions(
  mode: 'recruiter' | 'casual',
  preferences: any
): string {
  const baseInstructions = `You are Frank's personal AI assistant. Your job is to answer questions about Frank Thaingtham based ONLY on the knowledge base files provided.

CRITICAL RULES:
1. Only answer using information from the knowledge base files
2. Never make up or hallucinate information
3. If you don't know something, say so and offer contact info
4. Be helpful but honest about limitations

SCOPE - You can answer questions about:
- Frank's background, skills, and experience
- His projects (what/why/how/results)
- Roles he's looking for and availability
- How to contact him
- His blog posts and reflections (if asked)

SCOPE - You CANNOT:
- Provide coding help or tutorials
- Give opinions on topics not in the knowledge base
- Make up stories or embellish
- Answer hypothetical "what if" scenarios

`;

  const modeInstructions =
    mode === 'recruiter'
      ? `VOICE MODE: Recruiter (Professional & Concise)
- Keep responses 2-4 sentences unless asked for detail
- Use bullet points when listing multiple items
- Focus on skills, experience, projects, and availability
- Be direct and results-oriented
- No fluff or casual language

EXAMPLE STYLE:
Q: What technologies does Frank work with?
A: Frank specializes in React, Next.js, TypeScript, and Node.js. He has strong experience with PostgreSQL, Supabase, and Cloudflare. Currently learning AI/ML integration and edge computing.
`
      : `VOICE MODE: Casual (Friendly & Conversational)
- Write like you're texting a friend
- Keep it brief but warm
- Use contractions (don't, he's, it's)
- Show personality
- Natural flow, no corporate speak

EXAMPLE STYLE:
Q: What's Frank working on?
A: Right now he's building this site with a chatbot (hey, that's me!). He's also diving into AI stuff which has been pretty interesting. Always tinkering with something new.
`;

  const contextInfo = preferences
    ? `
VISITOR CONTEXT:
- Role: ${preferences.role}
- Goal: ${preferences.goal}
${preferences.from_where ? `- Found via: ${preferences.from_where}` : ''}

Use this context to tailor your responses slightly, but don't mention it explicitly.
`
    : '';

  return baseInstructions + modeInstructions + contextInfo;
}

function determineConfidence(
  message: string,
  run: any
): 'high' | 'medium' | 'low' {
  // Simple heuristic based on response patterns
  const lowConfidencePhrases = [
    "i don't have",
    "i'm not sure",
    "not in my knowledge",
    "don't know",
    "can't answer",
    "outside my scope",
  ];

  const messageLower = message.toLowerCase();

  // Check if response indicates uncertainty
  if (lowConfidencePhrases.some((phrase) => messageLower.includes(phrase))) {
    return 'low';
  }

  // Check if file search was used (indicates found relevant info)
  // In Assistants API, check if run used file_search tool
  const usedFileSearch = run.tools?.some(
    (tool: any) => tool.type === 'file_search'
  );

  if (usedFileSearch) {
    return 'high';
  }

  // Default to medium confidence
  return 'medium';
}

function generateNextActions(
  message: string,
  mode: 'recruiter' | 'casual'
): Array<{ label: string; href: string; reason: string }> | undefined {
  const actions: Array<{ label: string; href: string; reason: string }> = [];

  // Keywords that trigger specific actions
  if (
    message.toLowerCase().includes('project') ||
    message.toLowerCase().includes('built') ||
    message.toLowerCase().includes('work')
  ) {
    actions.push({
      label: 'View Projects',
      href: '/projects',
      reason: 'See detailed project case studies',
    });
  }

  if (
    message.toLowerCase().includes('resume') ||
    message.toLowerCase().includes('cv') ||
    message.toLowerCase().includes('experience')
  ) {
    actions.push({
      label: 'View Resume',
      href: '/about#resume',
      reason: 'See full work history',
    });
  }

  if (
    message.toLowerCase().includes('contact') ||
    message.toLowerCase().includes('reach') ||
    message.toLowerCase().includes('email')
  ) {
    actions.push({
      label: 'Get in Touch',
      href: '/contact',
      reason: 'Send Frank a message',
    });
  }

  if (
    message.toLowerCase().includes('blog') ||
    message.toLowerCase().includes('writing') ||
    message.toLowerCase().includes('article')
  ) {
    actions.push({
      label: 'Read Blog',
      href: '/blog',
      reason: 'Check out his latest posts',
    });
  }

  // Return undefined if no actions (cleaner response)
  return actions.length > 0 ? actions : undefined;
}
