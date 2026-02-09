// lib/onboarding.ts (UPDATED for Phase 2)

export interface OnboardingV1 {
  role: 'recruiter' | 'friends' | 'love-interest' | 'ex' | 'other';
  goal: 'see-projects' | 'view-resume' | 'contact' | 'just-browsing';
  fromWhere?: string;
  message?: string;
  completedAt: string; // ISO timestamp
  version: 1;
}

const STORAGE_KEY = 'ft_onboarding_v1';

/**
 * Safely retrieve onboarding data from localStorage
 */
export function getOnboarding(): OnboardingV1 | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    
    const parsed = JSON.parse(stored);
    
    // Basic validation
    if (
      parsed &&
      typeof parsed === 'object' &&
      parsed.version === 1 &&
      parsed.role &&
      parsed.goal
    ) {
      return parsed as OnboardingV1;
    }
    
    return null;
  } catch (error) {
    console.error('Failed to parse onboarding data:', error);
    return null;
  }
}

/**
 * Save onboarding data to localStorage AND database
 */
export async function setOnboarding(
  data: Omit<OnboardingV1, 'completedAt' | 'version'>
): Promise<void> {
  if (typeof window === 'undefined') return;
  
  const onboardingData: OnboardingV1 = {
    ...data,
    completedAt: new Date().toISOString(),
    version: 1,
  };
  
  try {
    // Save to localStorage (fast UX)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(onboardingData));

    // Save to database (persistent analytics)
    await fetch('/api/preferences', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        role: data.role,
        goal: data.goal,
        fromWhere: data.fromWhere,
        message: data.message,
      }),
    });
  } catch (error) {
    console.error('Failed to save onboarding data:', error);
  }
}

/**
 * Clear onboarding data (reset functionality)
 */
export function clearOnboarding(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear onboarding data:', error);
  }
}

/**
 * Check if onboarding is complete (role + goal exist)
 */
export function isOnboardingComplete(): boolean {
  const data = getOnboarding();
  return data !== null && !!data.role && !!data.goal;
}

/**
 * Track analytics events to both Google Analytics AND database
 */
export async function track(
  eventName: string,
  payload?: Record<string, any>
): Promise<void> {
  if (typeof window === 'undefined') return;
  
  // Track to Google Analytics
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, payload);
  }

  // Track to database
  try {
    await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_name: eventName,
        page_path: window.location.pathname,
        metadata: payload || null,
      }),
    });
  } catch (error) {
    console.error('Failed to track event:', error);
  }
}

// TypeScript declaration for gtag
declare global {
  interface Window {
    gtag?: (
      command: 'event',
      eventName: string,
      eventParams?: Record<string, any>
    ) => void;
  }
}
