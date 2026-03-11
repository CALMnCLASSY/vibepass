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
}

export const DUMMY_EVENTS: EventType[] = [
  {
    id: '1',
    name: 'Sauti Sol: The Final Tour',
    date: 'Dec 15, 2026',
    location: 'Uhuru Gardens, Nairobi',
    imageUrl: 'https://images.unsplash.com/photo-1540039155732-68473668c430?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 3500,
    organizer: 'Sauti Sol Entertainment',
    description: 'The end of an era. Join us for one last dance with Africa’s biggest boy band as they perform all their hits.',
    longDescription: 'Sauti Sol is bowing out, and they are doing it in grand style. This final tour promises an unforgettable night of nostalgia, incredible live performance, and the signature style that made them legends. Expect special guest appearances, an immersive stage design, and all their multi-platinum hits.'
  },
  {
    id: '2',
    name: 'WRC Safari Rally Naivasha Afterparty',
    date: 'Mar 28, 2027',
    location: 'Naivasha, Kenya',
    imageUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 5000,
    organizer: 'Vasha Vibes',
    description: 'The dust settles but the party doesn’t. The official Safari Rally afterparty featuring top continental DJs.',
    longDescription: 'After an adrenaline-filled weekend of high-speed rally action, Vasha Vibes brings you the ultimate cooldown. Featuring top DJs from Kenya, South Africa, and Nigeria playing back-to-back sets until sunrise. VIP experiences, premium bottle service, and an unforgettable party atmosphere." '
  },
  {
    id: '3',
    name: 'Blankets & Wine: Summer Edition',
    date: 'Jan 10, 2027',
    location: 'Ngong Racecourse',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 2500,
    organizer: 'Muthoni Drummer Queen',
    description: 'Discover the next big sound. A Sunday afternoon curation of alternative music, fashion, and food.',
    longDescription: 'Blankets and Wine returns for a special summer edition. Grab your shuka, your friends, and your favorite wine for an afternoon discovering emerging African artists alongside established headliners. Curated food vendors, a massive fashion pop-up, and family-friendly zones make this the perfect Sunday plan.'
  },
  {
    id: '4',
    name: 'Afro Nation Rising',
    date: 'Feb 14, 2027',
    location: 'Carnivore Grounds',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 4000,
    organizer: 'Afro Nation',
    description: 'The world’s biggest Afrobeats festival touches down in Nairobi for a special Valentine’s edition.',
    longDescription: 'Afro Nation is the premiere global Afrobeats franchise, and they are bringing the heat to Nairobi. Featuring massive international stars, incredible production value, and a high-energy vibe. This Valentine’s Day, fall in love with the rhythm. Multiple stages, VIP cabanas, and world-class sound systems.'
  }
];
