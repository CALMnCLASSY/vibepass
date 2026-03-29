import React from 'react';
import type { Metadata } from 'next';
import BackForthClient from './BackForthClient';
import { getEvents } from '@/data/events';

export const metadata: Metadata = {
    title: 'BACK & FORTH - OLD SCHOOL PARTY | VibePass Africa',
    description: 'Get your KENYA COLORS on and let\'s have a PARTY at Carnivore Simba Saloon!',
    openGraph: {
        title: 'BACK & FORTH - OLD SCHOOL PARTY',
        description: 'Kenya Colors Old School Party at Carnivore Simba Saloon.',
        images: ['/images/events/backforth.png'],
    }
};

export default async function BackForthPage() {
    const allEvents = await getEvents();
    // Filter events that have "BACKFORTH" or "BACK & FORTH" in their name
    const backForthEvents = allEvents.filter(e => 
        e.name.toUpperCase().includes('BACKFORTH') || 
        e.name.toUpperCase().includes('BACK & FORTH')
    );

    return <BackForthClient initialEvents={backForthEvents} />;
}
