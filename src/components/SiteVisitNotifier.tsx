'use client';

import { useEffect, useRef } from 'react';

export function SiteVisitNotifier() {
  const notified = useRef(false);

  useEffect(() => {
    if (notified.current) return;
    notified.current = true;

    const notify = async () => {
      try {
        await fetch('/api/notifications/discord', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'inquiry',
            content: '🌐 **New Site Visit**',
            embeds: [{
              title: 'A user has just visited the site',
              description: `Time: ${new Date().toLocaleString()}`,
              color: 0x3b82f6, // Blue
            }]
          }),
        });
      } catch (e) {
        console.error('Failed to notify site visit');
      }
    };

    notify();
  }, []);

  return null;
}
