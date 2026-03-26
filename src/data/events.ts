import { supabase } from '@/lib/supabase';

export interface EventType {
  id: string;
  name: string;
  date: string;
  location: string;
  imageUrl: string;
  price: number;
  organizer: string;
  description: string;
  longDescription: string;
  isActive?: boolean;
}

export async function getEvents(): Promise<EventType[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching events:', error);
    return [];
  }

  // Map from snake_case db columns to camelCase types
  return data.map((event) => ({
    id: event.id,
    name: event.name,
    date: event.date,
    location: event.location,
    imageUrl: event.image_url,
    price: event.price,
    organizer: event.organizer,
    description: event.description,
    longDescription: event.long_description,
  }));
}

export async function getEventById(id: string): Promise<EventType | null> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    if (error?.code !== 'PGRST116') { // PGRST116 is "No rows returned"
      console.error('Error fetching event by id:', error);
    }
    return null;
  }

  return {
    id: data.id,
    name: data.name,
    date: data.date,
    location: data.location,
    imageUrl: data.image_url,
    price: data.price,
    organizer: data.organizer,
    description: data.description,
    longDescription: data.long_description,
  };
}

// Configuration for grouping events with multiple ticket tiers
export const GROUP_CONFIG: Record<string, { displayName: string, route: string, basePrice?: number }> = {
  'SHOWMAN': { displayName: 'NYASHINSKI SHOWMAN - THE RESIDENCY', route: '/showman', basePrice: 3500 },
  'VURUGU': { displayName: 'VURUGU BOXING - KASARANI', route: '/vurugu', basePrice: 1500 },
  'DUWARA': { displayName: 'DUWARA - AFROHOUSE & AMAPIANO', route: '/duwara', basePrice: 2000 },
};

export async function getGroupedEvents(): Promise<EventType[]> {
  const allEvents = await getEvents();
  const groupedIds = new Set<string>();
  const finalEvents: EventType[] = [];

  // 1. Handle grouped events defined in GROUP_CONFIG
  for (const [keyword, config] of Object.entries(GROUP_CONFIG)) {
    const matchingEvents = allEvents.filter(e => e.name.toUpperCase().includes(keyword));
    if (matchingEvents.length > 0) {
      // Find the lowest price or use basePrice from config
      const minPrice = Math.min(...matchingEvents.map(e => e.price));
      
      finalEvents.push({
        ...matchingEvents[0],
        id: `grouped-${keyword.toLowerCase()}`,
        name: config.displayName,
        price: config.basePrice || minPrice,
      });
      
      // Mark these events as grouped so we don't include them individually
      matchingEvents.forEach(e => groupedIds.add(e.id));
    }
  }

  // 2. Add all other events that weren't grouped
  const remainingEvents = allEvents.filter(e => !groupedIds.has(e.id));
  finalEvents.push(...remainingEvents);

  return finalEvents;
}
