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
  ticket_url?: string;
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
    image_url: 'data:image/jpeg;base64,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',
    price: 479.68,
    organizer: 'Afro Nation',
    description: 'The world\'s biggest Afrobeats festival returns to the stunning beach of Portimão, Portugal.',
    long_description: 'Afro Nation Portugal returns in July 2026 to bring the best of Afrobeats, Amapiano, dancehall, and R&B to the beautiful sands of Praia da Rocha. Enjoy three days of music, sun, culture, and high-energy performances from the world\'s biggest stars.',
    is_active: true,
    created_at: new Date().toISOString(),
  };
}

export function getTomorrowlandEvent(): Event {
  return {
    id: 'tomorrowland-belgium-2026',
    name: 'Tomorrowland Belgium 2026',
    date: '2026-07-17T12:00:00',
    location: 'Boom, Belgium',
    image_url: '/tomorrowland/250725-183050-tlbe25-sl.webp',
    price: 138,
    organizer: 'We Are One World',
    description: 'Experience the magic of Tomorrowland in Boom, Belgium. Regular Day Passes, Pleasure Day Passes, and Comfort Day Passes available.',
    long_description: 'Tomorrowland Belgium returns in July 2026. Prepare for a magnificent new chapter with the world\'s best electronic music acts, breathtaking stage designs, and an immersive wonderland of music and art.',
    is_active: true,
    created_at: new Date().toISOString(),
  };
}

export function getMonacoGrandPrixEvent(): Event {
  return {
    id: 'monaco-grand-prix-2026',
    name: 'Monaco Grand Prix 2026',
    date: '2026-05-24T14:00:00',
    location: 'Monte Carlo, Monaco',
    image_url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop',
    price: 720,
    organizer: 'Formula 1',
    description: 'The iconic Monaco Grand Prix returns with street racing through the heart of Monte Carlo and legendary glamour on the Côte d’Azur.',
    long_description: 'Experience the ultimate Formula 1 spectacle at Monaco Grand Prix 2026. The world\'s most famous street circuit delivers dramatic racing through Monte Carlo, legendary tight turns, and breathtaking harbor views. Book premium grandstand and hospitality-style access directly through VibePass.',
    is_active: true,
    created_at: new Date().toISOString(),
  };
}

export function getACLFestEvent(): Event {
  return {
    id: 'acl-fest-2026',
    name: '2026 ACL Music Festival — Weekend One',
    date: '2026-10-02T12:00:00',
    location: 'Zilker Park, Austin, TX',
    image_url: '/acl-fest/header.png',
    price: 170,
    organizer: 'C3 Presents',
    description: 'Three days of live music on 9 stages at Austin\'s iconic Zilker Park. One-day General Admission tickets for Friday, Saturday, or Sunday.',
    long_description: 'The Weekend One 1-Day General Admission Ticket allows admittance to Zilker Park for Friday, Saturday, or Sunday of the festival. Your ticket includes access to live music on 9 stages, food from local chefs and restaurants, bars with cocktails and craft drinks throughout the park, and Austin Kiddie Limits. Children 8 and under are free with a ticketed adult (limit 2 per adult). A portion of your purchase goes to Austin Parks Foundation, benefitting 300+ public parks, trails, and green spaces.',
    ticket_url: 'https://aclfest-weekend1.frontgatetickets.com/event/wkqxl7c4tv1tn1xr',
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
    return [getACLFestEvent(), getWorldCupEvent(), getAfronationEvent(), getTomorrowlandEvent(), getMonacoGrandPrixEvent()];
  }

  // Filter out any World Cup event from the DB to avoid duplicates with our hardcoded version
  const events = (data as Event[]).filter(e => !e.name.toLowerCase().includes('world cup'));

  return [getACLFestEvent(), getWorldCupEvent(), getAfronationEvent(), getTomorrowlandEvent(), getMonacoGrandPrixEvent(), ...events];
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
    return [getACLFestEvent(), getWorldCupEvent(), getAfronationEvent(), getTomorrowlandEvent(), getMonacoGrandPrixEvent()].slice(0, limit);
  }

  // Filter out any World Cup event from the DB to avoid duplicates with our hardcoded version
  const events = (data as Event[]).filter(e => !e.name.toLowerCase().includes('world cup'));

  return [getACLFestEvent(), getWorldCupEvent(), getAfronationEvent(), getTomorrowlandEvent(), getMonacoGrandPrixEvent(), ...events].slice(0, limit);
}

export async function getEventById(id: string): Promise<Event | null> {
  if (id === 'acl-fest-2026') {
    return getACLFestEvent();
  }
  if (id === 'world-cup-2026') {
    return getWorldCupEvent();
  }
  if (id === 'afronation-portugal-2026') {
    return getAfronationEvent();
  }
  if (id === 'tomorrowland-belgium-2026') {
    return getTomorrowlandEvent();
  }

  if (id === 'monaco-grand-prix-2026') {
    return getMonacoGrandPrixEvent();
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
