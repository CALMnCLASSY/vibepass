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
