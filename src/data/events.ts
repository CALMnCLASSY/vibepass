import { supabase } from '@/lib/supabase';

export type Event = {
  id: string;
  name: string;
  date: string;
  location: string;
  image_url: string;
  price: number;
  organizer: string;
  description: string;
  long_description: string;
  is_active: boolean;
  created_at: string;
  is_world_cup?: boolean;
};

export function getWorldCupEvent(): Event {
  return {
    id: 'world-cup-2026',
    name: 'FIFA World Cup 2026™',
    date: '2026-06-11T16:00:00',
    location: 'USA, Canada & Mexico — 16 Host Cities',
    image_url: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=2070&auto=format&fit=crop',
    price: 450,
    organizer: 'FIFA',
    description: '104 matches. 48 nations. 16 venues. The biggest World Cup ever played across three nations.',
    long_description: 'The FIFA World Cup 2026™ will be the biggest tournament in FIFA history. For the first time, 48 teams will compete across 104 matches in 16 world-class venues spanning the United States, Canada, and Mexico. From the opening match on June 11 to the Final on July 19, experience football on an unprecedented scale.',
    is_active: true,
    created_at: new Date().toISOString(),
    is_world_cup: true,
  };
}

export function getAfronationEvent(): Event {
  return {
    id: 'afronation-portugal-2026',
    name: 'Afro Nation Portugal 2026',
    date: '2026-07-09T17:00:00',
    location: 'Praia da Rocha, Portimão, Portugal',
    image_url: 'https://www.243stars.com/assets/img/2025/06/Afro-Nation-Portugal-2025-2049309486.jpeg',
    price: 479.68,
    organizer: 'Afro Nation',
    description: 'The world\'s biggest Afrobeats festival returns to the stunning beach of Portimão, Portugal.',
    long_description: 'Afro Nation Portugal returns in July 2026 to bring the best of Afrobeats, Amapiano, dancehall, and R&B to the beautiful sands of Praia da Rocha. Enjoy three days of music, sun, culture, and high-energy performances from the world\'s biggest stars.',
    is_active: true,
    created_at: new Date().toISOString(),
  };
}

export async function getEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('is_active', true)
    .order('date', { ascending: true });

  if (error) {
    console.error('Error fetching events:', error);
    return [getWorldCupEvent(), getAfronationEvent()];
  }

  // Filter out any World Cup event from the DB to avoid duplicates with our hardcoded version
  const events = (data as Event[]).filter(e => !e.name.toLowerCase().includes('world cup'));

  return [getWorldCupEvent(), getAfronationEvent(), ...events];
}

export async function getTopEvents(limit: number = 3): Promise<Event[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('is_active', true)
    .order('date', { ascending: true })
    .limit(limit);

  if (error) {
    console.error('Error fetching top events:', error);
    return [getWorldCupEvent(), getAfronationEvent()];
  }

  // Filter out any World Cup event from the DB to avoid duplicates with our hardcoded version
  const events = (data as Event[]).filter(e => !e.name.toLowerCase().includes('world cup'));

  return [getWorldCupEvent(), getAfronationEvent(), ...events].slice(0, limit);
}

export async function getEventById(id: string): Promise<Event | null> {
  if (id === 'world-cup-2026') {
    return getWorldCupEvent();
  }
  if (id === 'afronation-portugal-2026') {
    return getAfronationEvent();
  }

  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching event by id:', error);
    return null;
  }

  return data as Event;
}
