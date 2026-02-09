// lib/visitor.ts
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

const COOKIE_NAME = 'ft_vid';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 365 days in seconds

/**
 * Get or create visitor ID from cookie (server-side only)
 */
export async function getOrCreateVisitorId(): Promise<string> {
  const cookieStore = await cookies();
  const existingCookie = cookieStore.get(COOKIE_NAME);

  if (existingCookie?.value) {
    return existingCookie.value;
  }

  // Generate new visitor ID
  const visitorId = uuidv4();

  // Set cookie (will be sent with response)
  cookieStore.set({
    name: COOKIE_NAME,
    value: visitorId,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: COOKIE_MAX_AGE,
  });

  return visitorId;
}

/**
 * Get visitor ID from cookie (returns null if not set)
 */
export async function getVisitorId(): Promise<string | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(COOKIE_NAME);
  return cookie?.value || null;
}
