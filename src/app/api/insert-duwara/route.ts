import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const duwaraDescription = "Duwara brings together the best of Afrohouse and Amapiano for a powerful celebration of African sound. In partnership with Masshouse, this experience will feature a curated lineup of top local DJs and featured artist Xduppy from South Africa, delivering deep grooves, soulful melodies, and dancefloor-shaking log drums. Duwara is a sonic journey for house heads and Amapiano lovers.";
    const longDescription = "Duwara brings together the best of Afrohouse and Amapiano for a powerful celebration of African sound. In partnership with Masshouse, this experience will feature a curated lineup of top local DJs (including Skylers, Big Nyagz, Suraj, Mura, Ally Fresh, Santa, MGM, Bune) and featured artist Xduppy from South Africa, delivering deep grooves, soulful melodies, and dancefloor-shaking log drums. Duwara is a sonic journey for house heads and Amapiano lovers.";
    const image_url = "/images/Duwara.jpeg";
    const location = "Masshouse";
    const date = "2026-04-03";
    const organizer = "MADFUN + MASSHOUSE";

    const ticketTypes = [
      { name: 'DUWARA - ADVANCE', price: 2000 },
      { name: 'DUWARA - GATE', price: 3000 },
      { name: 'DUWARA - PAIR TICKETS', price: 3500 },
      { name: 'DUWARA - VIP', price: 5000 }
    ];

    const eventsToInsert = ticketTypes.map(ticket => ({
      name: ticket.name,
      date: date,
      location: location,
      image_url: image_url,
      price: ticket.price,
      organizer: organizer,
      description: duwaraDescription,
      long_description: longDescription,
      is_active: true
    }));

    const { data, error } = await supabase
      .from('events')
      .upsert(eventsToInsert, { onConflict: 'name' });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Duwara events successfully added to database!",
      count: eventsToInsert.length, 
      data 
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
