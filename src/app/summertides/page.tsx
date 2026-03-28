import React from 'react';
import type { Metadata } from 'next';
import SummertidesClient from './SummertidesClient';
import { getEvents } from '@/data/events';

export const metadata: Metadata = {
    title: 'Summer Tides Festival 2026 - Malindi | VibePass Africa',
    description: 'Africa\'s Biggest Annual Beach Festival cutting across diverse music experiences in Malindi, Kenya.',
    openGraph: {
        title: 'Summer Tides Festival 2026 - Malindi',
        description: 'Africa\'s Biggest Annual Beach Festival cutting across diverse music experiences in Malindi, Kenya.',
        images: ['/images/events/summertides.jpg'],
    }
};

export default async function SummertidesPage() {
    const allEvents = await getEvents();
    // Filter events that have "SUMMERTIDES" in their name
    const summertidesEvents = allEvents.filter(e => e.name.toUpperCase().includes('SUMMERTIDES'));

    return <SummertidesClient initialEvents={summertidesEvents} />;
}
