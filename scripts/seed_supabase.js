const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  const file = fs.readFileSync('nyashinski_events.csv', 'utf8');
  const lines = file.split('\n').slice(1).filter(l => l.trim() !== '');

  for (const line of lines) {
    const parts = line.split('","');
    // Basic CSV parse
    const data = {
      name: parts[0].replace(/"/g, ''),
      date: parts[1].replace(/"/g, ''),
      location: parts[2].replace(/"/g, ''),
      image_url: parts[3].replace(/"/g, ''),
      price: parseInt(parts[4].replace(/"/g, '')),
      organizer: parts[5].replace(/"/g, ''),
      description: parts[6].replace(/"/g, ''),
      long_description: parts[7].replace(/"/g, ''),
      is_active: parts[8].replace(/"/g, '') === 'true'
    };

    const { error } = await supabase.from('events').insert([data]);
    if (error) {
      console.error('Error inserting:', data.name, error);
    } else {
      console.log('Inserted:', data.name);
    }
  }
}

seed();
