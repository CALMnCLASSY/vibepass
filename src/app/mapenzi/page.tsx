import React from 'react';
import type { Metadata } from 'next';
import MapenziClient from './MapenziClient';
import { getEvents } from '@/data/events';

export const metadata: Metadata = {
    title: 'Mapenzi Wewe - Gufy Dox & Billy Black | VibePass Africa',
    description: 'A 90-minute emotional journey exploring love in all its forms through poetry and live music at Braeburn Theatre.',
    openGraph: {
        title: 'Mapenzi Wewe - Gufy Dox & Billy Black',
        description: 'A 90-minute emotional journey exploring love in all its forms through poetry and live music at Braeburn Theatre.',
        images: ['/images/events/mapenzi.jpg'],
    }
};

export default async function MapenziPage() {
    const allEvents = await getEvents();
    // Filter events that have "MAPENZI" in their name
    const mapenziEvents = allEvents.filter(e => e.name.toUpperCase().includes('MAPENZI'));

    return <MapenziClient initialEvents={mapenziEvents} />;
}
