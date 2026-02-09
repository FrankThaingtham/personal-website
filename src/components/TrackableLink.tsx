// components/TrackableLink.tsx
'use client';

import { track } from '@/lib/onboarding';

interface TrackableLinkProps {
  href: string;
  eventName: string;
  metadata?: Record<string, any>;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  target?: string;
  rel?: string;
}

/**
 * Link component that tracks clicks to analytics
 * 
 * Usage:
 * <TrackableLink
 *   href="/resume.pdf"
 *   eventName="resume_clicked"
 *   style={{ color: 'blue' }}
 * >
 *   View Resume
 * </TrackableLink>
 */
export default function TrackableLink({
  href,
  eventName,
  metadata,
  children,
  style,
  className,
  target,
  rel,
}: TrackableLinkProps) {
  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Track the event (non-blocking)
    track(eventName, metadata).catch((err) => {
      console.error('Failed to track event:', err);
    });

    // If it's an external link or download, let it proceed normally
    // No need to preventDefault
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      style={style}
      className={className}
      target={target}
      rel={rel}
    >
      {children}
    </a>
  );
}
