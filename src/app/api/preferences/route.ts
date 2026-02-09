// app/api/events/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getOrCreateVisitorId } from '@/lib/visitor';

export async function POST(request: NextRequest) {
  try {
    // Get or create visitor ID from cookie
    const visitorId = await getOrCreateVisitorId();

    // Parse request body
    const body = await request.json();
    const { event_name, page_path, metadata } = body;

    // Validate required fields
    if (!event_name || !page_path) {
      return NextResponse.json(
        { error: 'Missing required fields: event_name and page_path' },
        { status: 400 }
      );
    }

    // Get referrer from headers
    const referrer = request.headers.get('referer') || null;

    // Insert event
    const { data, error } = await supabaseAdmin
      .from('events')
      .insert({
        visitor_id: visitorId,
        event_name,
        page_path,
        referrer,
        metadata: metadata || null,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to save event' },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, data });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
