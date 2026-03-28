import React from 'react';
import type { Metadata } from 'next';
import SafariClient from './SafariClient';
import { getEvents } from '@/data/events';

export const metadata: Metadata = {
    title: 'Safari Runway - Fashion Show | VibePass Africa',
    description: 'A movement focusing on sustainable safari wear and wildlife conservation at Nairobi National Park.',
    openGraph: {
        title: 'Safari Runway - Fashion Show',
        description: 'Sustainable safari wear meets wildlife conservation at Nairobi National Park.',
        images: ['/images/events/safari.jpg'],
    }
};

export default async function SafariPage() {
    const allEvents = await getEvents();
    // Filter events that have "SAFARI" in their name
    const safariEvents = allEvents.filter(e => e.name.toUpperCase().includes('SAFARI'));

    return <SafariClient initialEvents={safariEvents} />;
}
