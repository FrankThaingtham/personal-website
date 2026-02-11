'use client';

import { useState, useEffect, useRef } from 'react';
import { track } from '@/lib/onboarding';
import { getOnboarding } from '@/lib/onboarding';

interface Message {
  role: 'user' | 'assistant';
  content: string;
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

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [rateLimitMessage, setRateLimitMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load session ID from localStorage
    const saved = localStorage.getItem('chat_session_id');
    if (saved) {
      setSessionId(saved);
      // TODO: Optionally load message history from localStorage
    }
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleOpen = () => {
    setIsOpen(true);
    track('chat_opened');

    // Show greeting if first time
    if (messages.length === 0) {
      const onboarding = getOnboarding();
      const greeting = getGreeting(onboarding?.role);
      setMessages([
        {
          role: 'assistant',
          content: greeting,
        },
      ]);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input.trim();
    if (!textToSend || isLoading || cooldownSeconds > 0) return;

    // Add user message to UI
    const userMessage: Message = {
      role: 'user',
      content: textToSend,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Call chat API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          session_id: sessionId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle rate limiting
        if (response.status === 429) {
          setIsRateLimited(true);
          setRateLimitMessage(data.message || 'Rate limit exceeded');
          setMessages((prev) => [
            ...prev,
            {
              role: 'assistant',
              content: data.message || 'Rate limit exceeded. Please try again later.',
              fallback: {
                type: 'phone',
                message: `Need to reach Frank urgently? Call ${data.phone || '3365672469'}`,
              },
            },
          ]);
          return;
        }
        throw new Error(data.error || 'Failed to send message');
      }

      // Reset rate limit status on success
      setIsRateLimited(false);
      setRateLimitMessage('');

      // Start 5-second cooldown
      setCooldownSeconds(5);
      const cooldownInterval = setInterval(() => {
        setCooldownSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(cooldownInterval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Save session ID
      if (data.session_id && !sessionId) {
        setSessionId(data.session_id);
        localStorage.setItem('chat_session_id', data.session_id);
      }

      // Add assistant message to UI
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.answer,
        next_actions: data.next_actions,
        fallback: data.fallback,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      // Show error message
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "Sorry, I couldn't process that. Please try again!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePromptChip = (prompt: string) => {
    track('chat_prompt_chip_clicked', { chip: prompt });
    handleSend(prompt);
  };

  const handleNewChat = () => {
    setMessages([]);
    setSessionId(null);
    localStorage.removeItem('chat_session_id');
    const onboarding = getOnboarding();
    const greeting = getGreeting(onboarding?.role);
    setMessages([
      {
        role: 'assistant',
        content: greeting,
      },
    ]);
  };

  const handleActionClick = (href: string) => {
    track('chat_cta_clicked', { href });
    window.location.href = href;
  };

  return (
    <>
      {/* Chat Bubble Button */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            width: 60,
            height: 60,
            borderRadius: '50%',
            backgroundColor: 'var(--accent, #3b82f6)',
            color: '#ffffff',
            border: 'none',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 28,
            zIndex: 1000,
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
          }}
        >
          💬
        </button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            width: 380,
            maxWidth: 'calc(100vw - 48px)',
            height: 500,
            maxHeight: 'calc(100vh - 120px)',
            backgroundColor: '#1f2937',
            border: '1px solid #374151',
            borderRadius: 12,
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1000,
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '12px 16px',
              borderBottom: '1px solid #374151',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, color: '#ffffff' }}>Chat with Frank's AI</div>
              <div style={{ fontSize: 11, color: '#9ca3af' }}>
                Powered by OpenAI
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={handleNewChat}
                title="New chat"
                style={{
                  padding: '6px 10px',
                  fontSize: 12,
                  border: '1px solid #374151',
                  borderRadius: 6,
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  color: '#ffffff',
                }}
              >
                New
              </button>
              <button
                onClick={handleClose}
                style={{
                  width: 32,
                  height: 32,
                  border: 'none',
                  borderRadius: 6,
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  fontSize: 20,
                  color: '#ffffff',
                }}
              >
                ×
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              backgroundColor: '#111827',
            }}
          >
            {messages.map((msg, idx) => (
              <div key={idx}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <div
                    style={{
                      maxWidth: '85%',
                      padding: '10px 14px',
                      borderRadius: 12,
                      backgroundColor:
                        msg.role === 'user'
                          ? '#3b82f6'
                          : '#374151',
                      color: '#ffffff',
                      fontSize: 14,
                      lineHeight: 1.5,
                      whiteSpace: 'pre-wrap',
                      boxShadow: msg.role === 'user' 
                        ? '0 2px 8px rgba(59, 130, 246, 0.3)'
                        : '0 1px 3px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    {msg.content}
                  </div>
                </div>

                {/* Next Actions */}
                {msg.next_actions && msg.next_actions.length > 0 && (
                  <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {msg.next_actions.map((action, actionIdx) => (
                      <button
                        key={actionIdx}
                        onClick={() => handleActionClick(action.href)}
                        style={{
                          padding: '8px 12px',
                          fontSize: 12,
                          border: '1px solid #3b82f6',
                          borderRadius: 8,
                          backgroundColor: '#eff6ff',
                          color: '#1e40af',
                          cursor: 'pointer',
                          textAlign: 'left',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 2,
                          transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#3b82f6';
                          e.currentTarget.style.color = '#ffffff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#eff6ff';
                          e.currentTarget.style.color = '#1e40af';
                        }}
                      >
                        <span style={{ fontWeight: 600 }}>{action.label} →</span>
                        <span style={{ fontSize: 11, opacity: 0.8 }}>{action.reason}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Fallback */}
                {msg.fallback && (
                  <div
                    style={{
                      marginTop: 8,
                      padding: '10px 12px',
                      backgroundColor: '#fef3c7',
                      border: '1px solid #f59e0b',
                      borderRadius: 8,
                      fontSize: 12,
                      color: '#78350f',
                      fontWeight: 500,
                    }}
                  >
                    💡 {msg.fallback.message}
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div
                  style={{
                    padding: '10px 14px',
                    borderRadius: 12,
                    backgroundColor: '#374151',
                    fontSize: 14,
                    color: '#9ca3af',
                  }}
                >
                  <span className="typing-indicator">●●●</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Chips - Only show if no messages yet */}
          {messages.length === 1 && messages[0].role === 'assistant' && (
            <div
              style={{
                padding: '0 16px 10px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: 8,
              }}
            >
              {[
                'Tell me about Frank',
                'What projects has he worked on?',
                'What roles is he looking for?',
                'How can I contact him?',
              ].map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handlePromptChip(prompt)}
                  style={{
                    padding: '6px 12px',
                    fontSize: 12,
                    border: '1px solid #4b5563',
                    borderRadius: 20,
                    backgroundColor: '#374151',
                    cursor: 'pointer',
                    color: '#e5e7eb',
                    transition: 'all 0.2s',
                    fontWeight: 500,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#3b82f6';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.borderColor = '#3b82f6';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#374151';
                    e.currentTarget.style.color = '#e5e7eb';
                    e.currentTarget.style.borderColor = '#4b5563';
                  }}
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div
            style={{
              padding: '12px 16px',
              borderTop: '1px solid #374151',
            }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              style={{ display: 'flex', gap: 8 }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                disabled={isLoading}
                style={{
                  flex: 1,
                  padding: '12px 14px',
                  border: '2px solid #374151',
                  borderRadius: 8,
                  fontSize: 14,
                  backgroundColor: '#374151',
                  color: '#ffffff',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#3b82f6';
                  e.currentTarget.style.backgroundColor = '#1f2937';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#374151';
                  e.currentTarget.style.backgroundColor = '#374151';
                }}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim() || cooldownSeconds > 0 || isRateLimited}
                style={{
                  padding: '12px 20px',
                  border: 'none',
                  borderRadius: 8,
                  backgroundColor: isLoading || !input.trim() || cooldownSeconds > 0 || isRateLimited ? '#9ca3af' : '#3b82f6',
                  color: '#ffffff',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: isLoading || !input.trim() || cooldownSeconds > 0 || isRateLimited ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: isLoading || !input.trim() || cooldownSeconds > 0 || isRateLimited ? 'none' : '0 2px 8px rgba(59, 130, 246, 0.3)',
                }}
                onMouseEnter={(e) => {
                  if (!isLoading && input.trim() && cooldownSeconds === 0 && !isRateLimited) {
                    e.currentTarget.style.backgroundColor = '#2563eb';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoading && input.trim() && cooldownSeconds === 0 && !isRateLimited) {
                    e.currentTarget.style.backgroundColor = '#3b82f6';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                {isLoading ? 'Sending...' : cooldownSeconds > 0 ? `Wait ${cooldownSeconds}s` : 'Send'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CSS for typing indicator */}
      <style jsx>{`
        @keyframes typing {
          0%,
          60%,
          100% {
            opacity: 0.3;
          }
          30% {
            opacity: 1;
          }
        }
        .typing-indicator {
          display: inline-block;
          letter-spacing: 4px;
          animation: typing 1.4s infinite;
        }
      `}</style>
    </>
  );
}

function getGreeting(role?: string): string {
  switch (role) {
    case 'recruiter':
      return "Hi! I'm Frank's AI assistant. I can answer questions about his experience, projects, and availability. What would you like to know?";
    case 'friends':
      return "Hey! I'm here to help answer questions about Frank. Want to know what he's been working on?";
    default:
      return "Hi there! 👋 I'm Frank's AI assistant. Ask me anything about his background, projects, or how to get in touch!";
  }
}
