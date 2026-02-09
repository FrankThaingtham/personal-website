'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isOnboardingComplete, setOnboarding, track } from '@/lib/onboarding';

type UserIntent = 'recruiting' | 'collaborator' | 'browsing' | 'bot';

export default function OnboardingGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isComplete, setIsComplete] = useState<boolean | null>(null);
  const [selectedIntent, setSelectedIntent] = useState<UserIntent | null>(null);
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

  const handleIntentSelect = (intent: UserIntent) => {
    setSelectedIntent(intent);

    // Easter egg for bot
    if (intent === 'bot') {
      alert('01001000 01101001 🤖\n\n(That\'s binary for "Hi")');
      // Don't save bot selection
      return;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedIntent || selectedIntent === 'bot') return;

    // Map intent to role and goal
    const mapping = {
      recruiting: { role: 'recruiter' as const, goal: 'view-resume' as const },
      collaborator: { role: 'friends' as const, goal: 'see-projects' as const },
      browsing: { role: 'other' as const, goal: 'just-browsing' as const },
    };

    const { role, goal } = mapping[selectedIntent];

    // Save to localStorage and database
    await setOnboarding({
      role,
      goal,
      fromWhere: undefined,
      message: message || undefined,
    });

    // Track completion
    track('onboarding_completed', { intent: selectedIntent, role, goal });

    // Update state to show site
    setIsComplete(true);

    // Route based on intent
    switch (selectedIntent) {
      case 'recruiting':
        router.push('/about#resume'); // Adjust to your actual resume section/page
        break;
      case 'collaborator':
        router.push('/projects');
        break;
      case 'browsing':
        router.push('/');
        break;
    }
  };

  // Always render children so there's content to blur
  const showModal = isComplete === false;

  // Get dynamic label for message input
  const getMessageLabel = () => {
    switch (selectedIntent) {
      case 'recruiting':
        return 'What role are you hiring for? (optional)';
      case 'collaborator':
        return 'What\'s your idea? (optional)';
      case 'browsing':
        return 'Anything you want me to know? (optional)';
      case 'bot':
        return '';
      default:
        return 'Anything you want me to know? (optional)';
    }
  };

  const canSubmit = selectedIntent && selectedIntent !== 'bot';

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
            WebkitBackdropFilter: 'blur(8px)',
          }}
        >
          <div style={{ width: '100%', maxWidth: 520, margin: '0 20px' }}>
            <div
              style={{
                backgroundColor: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                padding: 40,
                boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
              }}
            >
              <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
                Hi there! 👋
              </h2>
              <p style={{ color: 'var(--muted)', marginBottom: 32, fontSize: 16 }}>
                Help me get you to the right place.
              </p>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Intent Options */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    {
                      value: 'recruiting' as UserIntent,
                      label: "I'm recruiting",
                      subtitle: 'Take me to the Portfolio & Resume',
                      emoji: '💼',
                    },
                    {
                      value: 'collaborator' as UserIntent,
                      label: "I'm a potential collaborator",
                      subtitle: "Let's build something together",
                      emoji: '🤝',
                    },
                    {
                      value: 'browsing' as UserIntent,
                      label: 'Just looking around',
                      subtitle: 'Show me the Blog & About page',
                      emoji: '👀',
                    },
                    {
                      value: 'bot' as UserIntent,
                      label: "I'm a bot 🤖",
                      subtitle: 'Beep boop',
                      emoji: '🤖',
                    },
                  ].map((option) => (
                    <label
                      key={option.value}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 14,
                        padding: 16,
                        border: selectedIntent === option.value 
                          ? '2px solid var(--accent)' 
                          : '2px solid var(--border)',
                        borderRadius: 8,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        backgroundColor: selectedIntent === option.value 
                          ? 'rgba(59, 130, 246, 0.05)' 
                          : 'transparent',
                      }}
                      onMouseEnter={(e) => {
                        if (selectedIntent !== option.value) {
                          e.currentTarget.style.borderColor = 'var(--accent)';
                          e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.02)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedIntent !== option.value) {
                          e.currentTarget.style.borderColor = 'var(--border)';
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }
                      }}
                    >
                      <input
                        type="radio"
                        name="intent"
                        value={option.value}
                        checked={selectedIntent === option.value}
                        onChange={() => handleIntentSelect(option.value)}
                        style={{ 
                          marginTop: 2,
                          width: 18, 
                          height: 18, 
                          cursor: 'pointer',
                          accentColor: 'var(--accent)',
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ 
                          fontWeight: 600, 
                          fontSize: 16, 
                          marginBottom: 4,
                          color: 'var(--text)',
                        }}>
                          {option.label}
                        </div>
                        <div style={{ 
                          fontSize: 14, 
                          color: 'var(--muted)',
                        }}>
                          {option.subtitle}
                        </div>
                      </div>
                      <div style={{ fontSize: 24 }}>
                        {option.emoji}
                      </div>
                    </label>
                  ))}
                </div>

                {/* Optional Message - Only show if not bot */}
                {selectedIntent && selectedIntent !== 'bot' && (
                  <div style={{ marginTop: 8 }}>
                    <label
                      htmlFor="message"
                      style={{ 
                        display: 'block', 
                        fontSize: 14, 
                        fontWeight: 500, 
                        marginBottom: 8,
                        color: 'var(--text)',
                      }}
                    >
                      {getMessageLabel()}
                    </label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value.slice(0, 300))}
                      placeholder="Optional..."
                      rows={3}
                      maxLength={300}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        backgroundColor: 'var(--bg)',
                        border: '1px solid var(--border)',
                        borderRadius: 6,
                        fontSize: 14,
                        color: 'var(--text)',
                        resize: 'none',
                        fontFamily: 'inherit',
                      }}
                    />
                    <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>
                      {message.length}/300 characters
                    </p>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={!canSubmit}
                  style={{
                    width: '100%',
                    padding: '14px 20px',
                    backgroundColor: canSubmit ? 'var(--accent)' : 'var(--muted)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: 8,
                    fontSize: 16,
                    fontWeight: 600,
                    cursor: canSubmit ? 'pointer' : 'not-allowed',
                    opacity: canSubmit ? 1 : 0.5,
                    marginTop: 8,
                    transition: 'all 0.2s',
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