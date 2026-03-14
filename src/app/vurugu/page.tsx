import { getEvents } from '@/data/events';
import VuruguClient from './VuruguClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vurugu Boxing - Kasarani',
  description: 'Witness fierce warriors clash in an adrenaline-pumping boxing showdown, where strength, skill and sheer determination collide.',
};

export const dynamic = 'force-dynamic';

export default async function VuruguPage() {
  const events = await getEvents();
  
  // Filter for VURUGU events (all ticket tiers)
  const vuruguEvents = events.filter(e => 
    e.name.toUpperCase().includes('VURUGU')
  );

  return (
    <main>
      <VuruguClient initialEvents={vuruguEvents} />
    </main>
  );
}
