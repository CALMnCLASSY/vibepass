import { getEvents } from '@/data/events';
import BongoClient from './BongoClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Old School Bongo 6.0 - Cavalli At The Manor',
  description: 'Old School Bongo 6.0 with a touch of Kenyan flavor featuring Mejja, Harmonize, and Nameless at Cavalli At The Manor.',
};

export const dynamic = 'force-dynamic';

export default async function BongoPage() {
  const events = await getEvents();
  
  // Filter for BONGO events (all ticket tiers)
  const bongoEvents = events.filter(e => 
    e.name.toUpperCase().includes('BONGO')
  );

  return (
    <main>
      <BongoClient initialEvents={bongoEvents} />
    </main>
  );
}
