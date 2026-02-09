'use client';

import { useState, useEffect } from 'react';
import { isOnboardingComplete, setOnboarding, track } from '@/lib/onboarding';

export default function OnboardingGate({ children }: { children: React.ReactNode }) {
  const [isComplete, setIsComplete] = useState<boolean | null>(null);
  const [role, setRole] = useState<string>('');
  const [goal, setGoal] = useState<string>('');
  const [fromWhere, setFromWhere] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    // Check if onboarding is already complete
    const complete = isOnboardingComplete();
    setIsComplete(complete);
    
    // Track if gate is shown
    if (!complete) {
      track('onboarding_required_shown');
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!role || !goal) return;
    
    // Save to localStorage
    setOnboarding({
      role: role as any,
      goal: goal as any,
      fromWhere: fromWhere || undefined,
      message: message || undefined,
    });
    
    // Track completion
    track('onboarding_completed', { role, goal });
    
    // Update state to show site
    setIsComplete(true);
  };

  // Always render children so there's content to blur
  const canSubmit = role && goal;
  const showModal = isComplete === false; // Only show when explicitly not complete

  return (
    <>
      {children}
      
      {showModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)', // Safari support
          }}
        >
      <div style={{ width: '100%', maxWidth: 480, margin: '0 20px' }}>
        <div
          style={{
            backgroundColor: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            padding: 32,
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          }}
        >
          <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>
            Welcome!
          </h2>
          <p style={{ color: 'var(--muted)', marginBottom: 24, fontSize: 15 }}>
            Help me show you what's most relevant
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Role field */}
            <div>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 500, marginBottom: 12 }}>
                I'm visiting as a... <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { value: 'recruiter', label: 'Recruiter' },
                  { value: 'friends', label: 'Friend' },
                  { value: 'love-interest', label: 'Potential date' },
                  { value: 'ex', label: 'Ex' },
                  { value: 'other', label: 'Other' },
                ].map((option) => (
                  <label
                    key={option.value}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      cursor: 'pointer',
                      fontSize: 14,
                    }}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={option.value}
                      checked={role === option.value}
                      onChange={(e) => setRole(e.target.value)}
                      style={{ width: 16, height: 16, cursor: 'pointer' }}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Goal field */}
            <div>
              <label
                htmlFor="goal"
                style={{ display: 'block', fontSize: 14, fontWeight: 500, marginBottom: 8 }}
              >
                I want to... <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <select
                id="goal"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  backgroundColor: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: 4,
                  fontSize: 14,
                  color: 'var(--text)',
                  cursor: 'pointer',
                }}
              >
                <option value="">Select an option</option>
                <option value="see-projects">See your projects</option>
                <option value="view-resume">View your resume</option>
                <option value="contact">Get in touch</option>
                <option value="just-browsing">Just browsing</option>
              </select>
            </div>

            {/* Optional: From where */}
            <div>
              <label
                htmlFor="fromWhere"
                style={{ display: 'block', fontSize: 14, fontWeight: 500, marginBottom: 8 }}
              >
                How'd you find me? (optional)
              </label>
              <input
                id="fromWhere"
                type="text"
                value={fromWhere}
                onChange={(e) => setFromWhere(e.target.value)}
                placeholder="e.g., LinkedIn, Twitter, friend referral"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  backgroundColor: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: 4,
                  fontSize: 14,
                  color: 'var(--text)',
                }}
              />
            </div>

            {/* Optional: Message */}
            <div>
              <label
                htmlFor="message"
                style={{ display: 'block', fontSize: 14, fontWeight: 500, marginBottom: 8 }}
              >
                Anything you want me to know? (optional)
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, 500))}
                placeholder="Leave a note..."
                rows={3}
                maxLength={500}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  backgroundColor: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: 4,
                  fontSize: 14,
                  color: 'var(--text)',
                  resize: 'none',
                  fontFamily: 'inherit',
                }}
              />
              <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
                {message.length}/500 characters
              </p>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={!canSubmit}
              style={{
                width: '100%',
                padding: '10px 16px',
                backgroundColor: canSubmit ? 'var(--accent)' : 'var(--muted)',
                color: '#ffffff',
                border: 'none',
                borderRadius: 4,
                fontSize: 14,
                fontWeight: 500,
                cursor: canSubmit ? 'pointer' : 'not-allowed',
                opacity: canSubmit ? 1 : 0.5,
              }}
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
      )}
    </>
  );
}
