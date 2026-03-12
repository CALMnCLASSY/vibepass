const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const events = [
  {
    name: "SHOWMAN - April 4",
    date: "2026-04-04",
    location: "CARNIVORE GARDENS, NAIROBI",
    image_url: "https://getaticket.co.ke/storage/covers/01KAJKRAPTN2T1ZG0RRNVDBKDJ.jpg",
    price: 3500,
    organizer: "Nyashinski",
    description: "SHOWMAN Residency - Day 1",
    long_description: "SHOWMAN is more than just a concert. it is a full theatrical spectacle that brings the worlds of music and theatre crashing together.",
    is_active: true
  },
  {
    name: "SHOWMAN - April 5",
    date: "2026-04-05",
    location: "CARNIVORE GARDENS, NAIROBI",
    image_url: "https://getaticket.co.ke/storage/covers/01KAJKRAPTN2T1ZG0RRNVDBKDJ.jpg",
    price: 3500,
    organizer: "Nyashinski",
    description: "SHOWMAN Residency - Day 2",
    long_description: "SHOWMAN is more than just a concert. it is a full theatrical spectacle that brings the worlds of music and theatre crashing together.",
    is_active: true
  },
  {
    name: "SHOWMAN VIP - April 8",
    date: "2026-04-08",
    location: "CARNIVORE GARDENS, NAIROBI",
    image_url: "https://getaticket.co.ke/storage/covers/01KAJKQ30YGCTEHPY1D9MZ45E7.png",
    price: 20000,
    organizer: "Nyashinski",
    description: "SHOWMAN Residency - VIP Day",
    long_description: "SHOWMAN is more than just a concert. it is a full theatrical spectacle that brings the worlds of music and theatre crashing together. VIP mid-week show.",
    is_active: true
  },
  {
    name: "SHOWMAN - April 11",
    date: "2026-04-11",
    location: "CARNIVORE GARDENS, NAIROBI",
    image_url: "https://getaticket.co.ke/storage/covers/01KAJKRAPTN2T1ZG0RRNVDBKDJ.jpg",
    price: 3500,
    organizer: "Nyashinski",
    description: "SHOWMAN Residency - Day 4",
    long_description: "SHOWMAN is more than just a concert. it is a full theatrical spectacle that brings the worlds of music and theatre crashing together.",
    is_active: true
  },
  {
    name: "SHOWMAN - April 12",
    date: "2026-04-12",
    location: "CARNIVORE GARDENS, NAIROBI",
    image_url: "https://getaticket.co.ke/storage/covers/01KAJKRAPTN2T1ZG0RRNVDBKDJ.jpg",
    price: 3500,
    organizer: "Nyashinski",
    description: "SHOWMAN Residency - Day 5",
    long_description: "SHOWMAN is more than just a concert. it is a full theatrical spectacle that brings the worlds of music and theatre crashing together.",
    is_active: true
  }
];

async function seed() {
  console.log("Cleaning up previously mangled SHOWMAN events...");
  const { error: delError } = await supabase.from('events').delete().like('name', '%SHOWMAN%');
  if (delError) {
    console.error("Cleanup error:", delError);
  } else {
    console.log("Cleanup complete.");
  }

  for (const data of events) {
    const { error } = await supabase.from('events').insert([data]);
    if (error) {
      console.error('Error inserting:', data.name, error);
    } else {
      console.log('Inserted:', data.name);
    }
  }
  
  console.log("Validation check:");
  const { data: fetchCheck } = await supabase.from('events').select('name, is_active').like('name', '%SHOWMAN%');
  console.log("Currently active local Showman events:", fetchCheck);
}

seed();
