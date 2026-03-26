import { getEvents } from '@/data/events';
import DuwaraClient from './DuwaraClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Duwara - Afrohouse & Amapiano',
  description: 'Duwara brings together the best of Afrohouse and Amapiano for a powerful celebration of African sound at Masshouse.',
};

export const dynamic = 'force-dynamic';

export default async function DuwaraPage() {
  const events = await getEvents();
  
  // Filter for DUWARA events (all ticket tiers)
  const duwaraEvents = events.filter(e => 
    e.name.toUpperCase().includes('DUWARA')
  );

  return (
    <main>
      <DuwaraClient initialEvents={duwaraEvents} />
    </main>
  );
}
