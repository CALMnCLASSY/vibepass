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
};

export async function getEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('is_active', true)
    .order('date', { ascending: true });

  if (error) {
    console.error('Error fetching events:', error);
    return [];
  }

  return data as Event[];
}

export async function getTopEvents(limit: number = 3): Promise<Event[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('is_active', true)
    .order('date', { ascending: true }) // We can order by date for now, or popularity if that field existed
    .limit(limit);

  if (error) {
    console.error('Error fetching top events:', error);
    return [];
  }

  return data as Event[];
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
