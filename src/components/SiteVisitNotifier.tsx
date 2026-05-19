'use client';

import { useEffect, useRef } from 'react';

export function SiteVisitNotifier() {
  const notified = useRef(false);

  useEffect(() => {
    if (notified.current) return;
    notified.current = true;

    const notify = async () => {
      try {
        const timeString = new Date().toLocaleString('en-US', { timeZoneName: 'short' });
        const referrerString = document.referrer || "Direct / None";
        const pageUrl = window.location.href;
        const pathname = window.location.pathname;

        let device = 'Desktop';
        const ua = navigator.userAgent;
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
          device = 'Tablet';
        } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(ua)) {
          device = 'Mobile';
        }

        const embedDescription = `A user has just visited ${pathname}

📍 Page URL
${pageUrl}

🔄 Referrer
${referrerString}

📱 Device
${device}

💻 User Agent
${ua}

⏰ Time
${timeString}`;

        await fetch('/api/notifications/discord', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'inquiry',
            content: '',
            embeds: [{
              title: '🌍 New Website Visitor',
              description: embedDescription,
              color: 0x3b82f6, // Blue
              footer: { text: "VibePass Africa Analytics • System Notification" },
              timestamp: new Date().toISOString(),
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

