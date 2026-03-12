import { getEvents } from '@/data/events';
import ShowmanClient from './ShowmanClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nyashinski ShowMan 2026 - The Residency',
  description: 'The production builds on the success of his previous concert, SHIN CITY, and elevates it into a first-of-its-kind residency format in Kenya.',
};

export default async function ShowmanPage() {
  const events = await getEvents();
  
  // Filter for SHOWMAN events
  const showmanEvents = events.filter(e => 
    e.name.toUpperCase().includes('SHOWMAN')
  );

  return (
    <main>
      <ShowmanClient initialEvents={showmanEvents} />
    </main>
  );
}
