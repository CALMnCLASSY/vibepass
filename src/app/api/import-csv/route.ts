import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const csvPath = path.join(process.cwd(), 'nyashinski_events.csv');
    const fileContent = fs.readFileSync(csvPath, 'utf-8');
    
    // Simple basic CSV parser (assuming no commas inside quotes for this specific file, except maybe location)
    // The provided CSV actually has quotes, so we need a slightly better parser
    const rows = fileContent.split('\n').filter(row => row.trim() !== '');
    
    // Skip header
    const dataRows = rows.slice(1);
    
    const eventsToInsert = dataRows.map(row => {
      // Handle the strict CSV format: "Name","YYYY-MM-DD","Location","Url",Price,"Organizer","Desc","LongDesc",TRUE
      // We will use a regex to split by commas outside of quotes
      const regex = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;
      const columns = row.split(regex).map(col => col.replace(/^"|"$/g, '').trim());
      
      if (columns.length < 9) return null;
      
      return {
        name: columns[0],
        date: columns[1],
        location: columns[2],
        image_url: columns[3],
        price: parseInt(columns[4], 10),
        organizer: columns[5],
        description: columns[6],
        long_description: columns[7],
        is_active: columns[8].toUpperCase() === 'TRUE'
      };
    }).filter(Boolean);

    // Insert into Supabase
    const { data, error } = await supabase
      .from('events')
      .upsert(eventsToInsert, { onConflict: 'name' }); // Assuming name is unique, or just insert
      
    if (error) {
      console.error('Supabase Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, count: eventsToInsert.length, inserted: eventsToInsert });
  } catch (error: any) {
    console.error('Import Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
