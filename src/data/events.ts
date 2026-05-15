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
    price: 750,
    organizer: 'FIFA',
    description: '104 matches. 48 nations. 16 venues. The biggest World Cup ever played across three nations.',
    long_description: 'The FIFA World Cup 2026™ will be the biggest tournament in FIFA history. For the first time, 48 teams will compete across 104 matches in 16 world-class venues spanning the United States, Canada, and Mexico. From the opening match on June 11 to the Final on July 19, experience football on an unprecedented scale.',
    is_active: true,
    created_at: new Date().toISOString(),
    is_world_cup: true,
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
    return [getWorldCupEvent()];
  }

  const events = data as Event[];
  const hasWorldCup = events.some(e => e.id === 'world-cup-2026' || e.is_world_cup);
  
  return hasWorldCup ? events : [getWorldCupEvent(), ...events];
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
    return [getWorldCupEvent()];
  }

  const events = data as Event[];
  const hasWorldCup = events.some(e => e.id === 'world-cup-2026' || e.is_world_cup);
  
  const allEvents = hasWorldCup ? events : [getWorldCupEvent(), ...events];
  return allEvents.slice(0, limit);
}

export async function getEventById(id: string): Promise<Event | null> {
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
