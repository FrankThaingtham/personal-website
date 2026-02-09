// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

// Environment variables - these will be set in .env.local (NOT committed to git)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env.local file.'
  );
}

/**
 * Supabase client with service role key (server-side only)
 * DO NOT use this in client components - it has full database access
 */
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Type definitions for our tables
export interface Preference {
  visitor_id: string;
  role: 'recruiter' | 'friends' | 'love-interest' | 'ex' | 'other';
  goal: 'see-projects' | 'view-resume' | 'contact' | 'just-browsing';
  from_where?: string;
  message?: string;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  visitor_id: string;
  event_name: string;
  page_path: string;
  referrer?: string;
  metadata?: Record<string, any>;
  created_at: string;
}
