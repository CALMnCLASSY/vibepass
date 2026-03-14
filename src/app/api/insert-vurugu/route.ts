import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const vuruguDescription = "Witness fierce warriors clash in an adrenaline-pumping boxing showdown, where strength, skill and sheer determination collide. Vurugu promises an unforgettable night of raw energy, intense rivalries and moments that will have the crowd on its feet. Don’t miss the action, this is boxing at its fiercest.";
    const image_url = "https://madfun.s3.af-south-1.amazonaws.com/Vurugu_720.jpeg";
    const location = "Kasarani Stadium Indoor Arena";
    const date = "2026-04-04";

    const ticketTypes = [
      { name: 'VURUGU - REGULAR', price: 1500 },
      { name: 'VURUGU - VIP', price: 5000 },
      { name: 'VURUGU - VVIP RINGSIDE', price: 10000 },
      { name: 'VURUGU - RINGSIDE EXCLUSIVE', price: 100000 },
      { name: 'VURUGU - RINGSIDE EXCLUSIVE TABLE', price: 100000 }
    ];

    const eventsToInsert = ticketTypes.map(ticket => ({
      name: ticket.name,
      date: date,
      location: location,
      image_url: image_url,
      price: ticket.price,
      organizer: 'Vibe Pass Africa',
      description: vuruguDescription,
      long_description: vuruguDescription,
      is_active: true
    }));

    const { data, error } = await supabase
      .from('events')
      .upsert(eventsToInsert, { onConflict: 'name' });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, count: eventsToInsert.length, data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
