'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function VisitorTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasTrackedInitialRender = useRef(false);

  useEffect(() => {
    // Basic dev environment guard to prevent tracking yourself endlessly
    if (process.env.NODE_ENV === 'development') return;

    // Track on initial mount and route changes
    const trackPage = async () => {
      try {
        const fullUrl = window.location.href;
        const referrer = document.referrer;
        const userAgent = navigator.userAgent;
        
        await fetch('/api/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            url: fullUrl,
            referrer,
            userAgent,
            timestamp: Date.now()
          }),
        });
      } catch (err) {
        console.error("Failed to track visit:", err);
      }
    };

    // React strict mode guard (if active) to prevent double firing on initial load
    if (!hasTrackedInitialRender.current) {
      trackPage();
      hasTrackedInitialRender.current = true;
    } else {
      // It's a route change
      trackPage();
    }
  }, [pathname, searchParams]);

  return null; // This is a headless component, it doesn't render anything
}
