export type Venue = {
  id: string;
  name: string;
  city: string;
  country: string;
  region: string;
  capacity: number;
  image: string;
  description: string;
  matches_count: number;
};

export type Match = {
  id: string;
  match_number: number;
  date: string;
  time: string;
  venue_id: string;
  stage: string;
  group?: string;
  home_team: string;
  away_team: string;
  home_flag: string;
  away_flag: string;
  sold_out: boolean;
};

export type TicketCategory = {
  id: string;
  name: string;
  description: string;
  features: string[];
  price_range: string;
  image: string;
};

export type HospitalityPackage = {
  id: string;
  name: string;
  description: string;
  features: string[];
  price_from: number;
  price_display: string;
  image: string;
  badge?: string;
};

export type VenueSeries = {
  id: string;
  venue_id: string;
  name: string;
  description: string;
  matches_included: string[];
  packages: string[];
  price_from: number;
};

export const venues: Venue[] = [
  {
    id: "atlanta",
    name: "Mercedes-Benz Stadium",
    city: "Atlanta",
    country: "USA",
    region: "Eastern",
    capacity: 71000,
    image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=2070&auto=format&fit=crop",
    description: "Home of the Atlanta Falcons and Atlanta United. Features a retractable roof and the world's largest halo board.",
    matches_count: 8,
  },
  {
    id: "boston",
    name: "Gillette Stadium",
    city: "Boston",
    country: "USA",
    region: "Eastern",
    capacity: 65878,
    image: "https://images.unsplash.com/photo-1556056504-5c90e963de4c?q=80&w=2070&auto=format&fit=crop",
    description: "Iconic venue in Foxborough, Massachusetts. Home to legendary sporting moments and passionate New England fans.",
    matches_count: 7,
  },
  {
    id: "dallas",
    name: "AT&T Stadium",
    city: "Dallas",
    country: "USA",
    region: "Central",
    capacity: 80000,
    image: "https://images.unsplash.com/photo-1566577739112-1087c5019c84?q=80&w=2070&auto=format&fit=crop",
    description: "The world's largest domed stadium featuring a retractable roof and one of the largest HD video displays.",
    matches_count: 9,
  },
  {
    id: "houston",
    name: "NRG Stadium",
    city: "Houston",
    country: "USA",
    region: "Central",
    capacity: 72220,
    image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=2070&auto=format&fit=crop",
    description: "A multi-purpose retractable roof stadium in the heart of Houston, Texas.",
    matches_count: 7,
  },
  {
    id: "kansas-city",
    name: "Arrowhead Stadium",
    city: "Kansas City",
    country: "USA",
    region: "Central",
    capacity: 76416,
    image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=2070&auto=format&fit=crop",
    description: "Known for having the loudest fans in the world. A true football fortress in the American Midwest.",
    matches_count: 6,
  },
  {
    id: "los-angeles",
    name: "SoFi Stadium",
    city: "Los Angeles",
    country: "USA",
    region: "Western",
    capacity: 70240,
    image: "https://images.unsplash.com/photo-1518605348400-437b458cafe9?q=80&w=2070&auto=format&fit=crop",
    description: "The most technologically advanced stadium ever built, featuring an unprecedented immersive experience.",
    matches_count: 8,
  },
  {
    id: "miami",
    name: "Hard Rock Stadium",
    city: "Miami",
    country: "USA",
    region: "Eastern",
    capacity: 64767,
    image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=2070&auto=format&fit=crop",
    description: "A world-class venue in South Florida, home to unforgettable football moments under the sun.",
    matches_count: 7,
  },
  {
    id: "new-york",
    name: "MetLife Stadium",
    city: "New York / New Jersey",
    country: "USA",
    region: "Eastern",
    capacity: 82500,
    image: "https://images.unsplash.com/photo-1556056504-5c90e963de4c?q=80&w=2070&auto=format&fit=crop",
    description: "One of the largest stadiums in the NFL, set to host the FIFA World Cup 2026 Final.",
    matches_count: 8,
  },
  {
    id: "philadelphia",
    name: "Lincoln Financial Field",
    city: "Philadelphia",
    country: "USA",
    region: "Eastern",
    capacity: 69796,
    image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=2070&auto=format&fit=crop",
    description: "Home of the Philadelphia Eagles. Known for its passionate and electric atmosphere.",
    matches_count: 6,
  },
  {
    id: "san-francisco",
    name: "Levi's Stadium",
    city: "San Francisco Bay Area",
    country: "USA",
    region: "Western",
    capacity: 68500,
    image: "https://images.unsplash.com/photo-1518605348400-437b458cafe9?q=80&w=2070&auto=format&fit=crop",
    description: "A state-of-the-art venue in Santa Clara, featuring sustainable design and cutting-edge technology.",
    matches_count: 6,
  },
  {
    id: "seattle",
    name: "Lumen Field",
    city: "Seattle",
    country: "USA",
    region: "Western",
    capacity: 72000,
    image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=2070&auto=format&fit=crop",
    description: "Home to the famous Seattle sound. Known for its incredible fan atmosphere and modern amenities.",
    matches_count: 6,
  },
  {
    id: "toronto",
    name: "BMO Field",
    city: "Toronto",
    country: "Canada",
    region: "Eastern",
    capacity: 45000,
    image: "https://images.unsplash.com/photo-1556056504-5c90e963de4c?q=80&w=2070&auto=format&fit=crop",
    description: "Canada's premier soccer-specific stadium, home to Toronto FC and the Canadian national team.",
    matches_count: 6,
  },
  {
    id: "vancouver",
    name: "BC Place",
    city: "Vancouver",
    country: "Canada",
    region: "Western",
    capacity: 54500,
    image: "https://images.unsplash.com/photo-1518605348400-437b458cafe9?q=80&w=2070&auto=format&fit=crop",
    description: "An iconic retractable roof stadium in downtown Vancouver with stunning mountain views.",
    matches_count: 7,
  },
  {
    id: "mexico-city",
    name: "Estadio Azteca",
    city: "Mexico City",
    country: "Mexico",
    region: "Central",
    capacity: 87523,
    image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=2070&auto=format&fit=crop",
    description: "The legendary cathedral of Mexican football. Hosted two World Cup Finals in 1970 and 1986.",
    matches_count: 5,
  },
  {
    id: "guadalajara",
    name: "Estadio Akron",
    city: "Guadalajara",
    country: "Mexico",
    region: "Central",
    capacity: 48071,
    image: "https://images.unsplash.com/photo-1566577739112-1087c5019c84?q=80&w=2070&auto=format&fit=crop",
    description: "Modern home of Chivas, featuring world-class facilities and passionate Mexican football culture.",
    matches_count: 4,
  },
  {
    id: "monterrey",
    name: "Estadio BBVA",
    city: "Monterrey",
    country: "Mexico",
    region: "Central",
    capacity: 53500,
    image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=2070&auto=format&fit=crop",
    description: "Known as 'El Gigante de Acero' (The Steel Giant). A stunning modern venue with mountain backdrops.",
    matches_count: 4,
  },
];

export const matches: Match[] = [
  // Group Stage - Week 1
  { id: "m1", match_number: 1, date: "2026-06-11", time: "16:00", venue_id: "mexico-city", stage: "Group Stage", group: "A", home_team: "Mexico", away_team: "South Africa", home_flag: "🇲🇽", away_flag: "🇿🇦", sold_out: false },
  { id: "m2", match_number: 2, date: "2026-06-11", time: "19:00", venue_id: "mexico-city", stage: "Group Stage", group: "A", home_team: "Korea Republic", away_team: "Czechia", home_flag: "🇰🇷", away_flag: "🇨🇿", sold_out: false },
  { id: "m3", match_number: 3, date: "2026-06-12", time: "15:00", venue_id: "new-york", stage: "Group Stage", group: "B", home_team: "Canada", away_team: "Bosnia & Herzegovina", home_flag: "🇨🇦", away_flag: "🇧🇦", sold_out: false },
  { id: "m4", match_number: 4, date: "2026-06-12", time: "18:00", venue_id: "new-york", stage: "Group Stage", group: "B", home_team: "Qatar", away_team: "Switzerland", home_flag: "🇶🇦", away_flag: "🇨🇭", sold_out: false },
  { id: "m5", match_number: 5, date: "2026-06-12", time: "21:00", venue_id: "los-angeles", stage: "Group Stage", group: "C", home_team: "Brazil", away_team: "Morocco", home_flag: "🇧🇷", away_flag: "🇲🇦", sold_out: false },
  { id: "m6", match_number: 6, date: "2026-06-13", time: "15:00", venue_id: "dallas", stage: "Group Stage", group: "C", home_team: "Haiti", away_team: "Scotland", home_flag: "🇭🇹", away_flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", sold_out: false },
  { id: "m7", match_number: 7, date: "2026-06-13", time: "18:00", venue_id: "dallas", stage: "Group Stage", group: "D", home_team: "USA", away_team: "Paraguay", home_flag: "🇺🇸", away_flag: "🇵🇾", sold_out: false },
  { id: "m8", match_number: 8, date: "2026-06-13", time: "21:00", venue_id: "seattle", stage: "Group Stage", group: "D", home_team: "Australia", away_team: "Türkiye", home_flag: "🇦🇺", away_flag: "🇹🇷", sold_out: false },
  { id: "m9", match_number: 9, date: "2026-06-14", time: "15:00", venue_id: "miami", stage: "Group Stage", group: "E", home_team: "Germany", away_team: "Curaçao", home_flag: "🇩🇪", away_flag: "🇨🇼", sold_out: false },
  { id: "m10", match_number: 10, date: "2026-06-14", time: "18:00", venue_id: "miami", stage: "Group Stage", group: "E", home_team: "Côte d'Ivoire", away_team: "Ecuador", home_flag: "🇨🇮", away_flag: "🇪🇨", sold_out: false },
  { id: "m11", match_number: 11, date: "2026-06-14", time: "21:00", venue_id: "boston", stage: "Group Stage", group: "F", home_team: "Netherlands", away_team: "Japan", home_flag: "🇳🇱", away_flag: "🇯🇵", sold_out: false },
  { id: "m12", match_number: 12, date: "2026-06-15", time: "15:00", venue_id: "boston", stage: "Group Stage", group: "F", home_team: "Sweden", away_team: "Tunisia", home_flag: "🇸🇪", away_flag: "🇹🇳", sold_out: false },
  { id: "m13", match_number: 13, date: "2026-06-15", time: "18:00", venue_id: "atlanta", stage: "Group Stage", group: "G", home_team: "Belgium", away_team: "Egypt", home_flag: "🇧🇪", away_flag: "🇪🇬", sold_out: false },
  { id: "m14", match_number: 14, date: "2026-06-15", time: "21:00", venue_id: "atlanta", stage: "Group Stage", group: "G", home_team: "IR Iran", away_team: "New Zealand", home_flag: "🇮🇷", away_flag: "🇳🇿", sold_out: false },
  { id: "m15", match_number: 15, date: "2026-06-16", time: "15:00", venue_id: "philadelphia", stage: "Group Stage", group: "H", home_team: "Spain", away_team: "Cabo Verde", home_flag: "🇪🇸", away_flag: "🇨🇻", sold_out: false },
  { id: "m16", match_number: 16, date: "2026-06-16", time: "18:00", venue_id: "philadelphia", stage: "Group Stage", group: "H", home_team: "Saudi Arabia", away_team: "Uruguay", home_flag: "🇸🇦", away_flag: "🇺🇾", sold_out: false },
  { id: "m17", match_number: 17, date: "2026-06-16", time: "21:00", venue_id: "san-francisco", stage: "Group Stage", group: "I", home_team: "France", away_team: "Senegal", home_flag: "🇫🇷", away_flag: "🇸🇳", sold_out: false },
  { id: "m18", match_number: 18, date: "2026-06-17", time: "15:00", venue_id: "san-francisco", stage: "Group Stage", group: "I", home_team: "Iraq", away_team: "Norway", home_flag: "🇮🇶", away_flag: "🇳🇴", sold_out: false },
  { id: "m19", match_number: 19, date: "2026-06-17", time: "18:00", venue_id: "houston", stage: "Group Stage", group: "J", home_team: "Argentina", away_team: "Algeria", home_flag: "🇦🇷", away_flag: "🇩🇿", sold_out: false },
  { id: "m20", match_number: 20, date: "2026-06-17", time: "21:00", venue_id: "houston", stage: "Group Stage", group: "J", home_team: "Austria", away_team: "Jordan", home_flag: "🇦🇹", away_flag: "🇯🇴", sold_out: false },

  // More group stage (representative)
  { id: "m25", match_number: 25, date: "2026-06-20", time: "18:00", venue_id: "mexico-city", stage: "Group Stage", group: "A", home_team: "South Africa", away_team: "Korea Republic", home_flag: "🇿🇦", away_flag: "🇰🇷", sold_out: false },
  { id: "m30", match_number: 30, date: "2026-06-21", time: "21:00", venue_id: "los-angeles", stage: "Group Stage", group: "C", home_team: "Brazil", away_team: "Haiti", home_flag: "🇧🇷", away_flag: "🇭🇹", sold_out: false },
  { id: "m35", match_number: 35, date: "2026-06-22", time: "18:00", venue_id: "dallas", stage: "Group Stage", group: "D", home_team: "USA", away_team: "Australia", home_flag: "🇺🇸", away_flag: "🇦🇺", sold_out: false },
  { id: "m40", match_number: 40, date: "2026-06-23", time: "21:00", venue_id: "boston", stage: "Group Stage", group: "F", home_team: "Netherlands", away_team: "Sweden", home_flag: "🇳🇱", away_flag: "🇸🇪", sold_out: false },
  { id: "m45", match_number: 45, date: "2026-06-24", time: "18:00", venue_id: "atlanta", stage: "Group Stage", group: "G", home_team: "Belgium", away_team: "IR Iran", home_flag: "🇧🇪", away_flag: "🇮🇷", sold_out: false },
  { id: "m50", match_number: 50, date: "2026-06-25", time: "21:00", venue_id: "new-york", stage: "Group Stage", group: "I", home_team: "France", away_team: "Iraq", home_flag: "🇫🇷", away_flag: "🇮🇶", sold_out: false },
  { id: "m55", match_number: 55, date: "2026-06-26", time: "18:00", venue_id: "toronto", stage: "Group Stage", group: "K", home_team: "Portugal", away_team: "Congo DR", home_flag: "🇵🇹", away_flag: "🇨🇩", sold_out: false },
  { id: "m60", match_number: 60, date: "2026-06-27", time: "21:00", venue_id: "vancouver", stage: "Group Stage", group: "L", home_team: "England", away_team: "Ghana", home_flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", away_flag: "🇬🇭", sold_out: false },

  // Round of 32
  { id: "m65", match_number: 65, date: "2026-06-29", time: "15:00", venue_id: "dallas", stage: "Round of 32", home_team: "1B", away_team: "3A/D/E/F", home_flag: "🏳️", away_flag: "🏳️", sold_out: false },
  { id: "m66", match_number: 66, date: "2026-06-29", time: "18:00", venue_id: "dallas", stage: "Round of 32", home_team: "1C", away_team: "3A/B/E/F", home_flag: "🏳️", away_flag: "🏳️", sold_out: false },
  { id: "m67", match_number: 67, date: "2026-06-29", time: "21:00", venue_id: "houston", stage: "Round of 32", home_team: "1E", away_team: "3A/B/C/D", home_flag: "🏳️", away_flag: "🏳️", sold_out: false },
  { id: "m68", match_number: 68, date: "2026-06-30", time: "15:00", venue_id: "houston", stage: "Round of 32", home_team: "1G", away_team: "3C/D/E/F", home_flag: "🏳️", away_flag: "🏳️", sold_out: false },
  { id: "m69", match_number: 69, date: "2026-06-30", time: "18:00", venue_id: "atlanta", stage: "Round of 32", home_team: "1A", away_team: "3C/D/E/F", home_flag: "🏳️", away_flag: "🏳️", sold_out: false },
  { id: "m70", match_number: 70, date: "2026-06-30", time: "21:00", venue_id: "atlanta", stage: "Round of 32", home_team: "1D", away_team: "3B/E/F/G/H", home_flag: "🏳️", away_flag: "🏳️", sold_out: false },
  { id: "m71", match_number: 71, date: "2026-07-01", time: "15:00", venue_id: "boston", stage: "Round of 32", home_team: "1F", away_team: "3A/B/C/D", home_flag: "🏳️", away_flag: "🏳️", sold_out: false },
  { id: "m72", match_number: 72, date: "2026-07-01", time: "18:00", venue_id: "boston", stage: "Round of 32", home_team: "1H", away_team: "3A/B/C/E/F", home_flag: "🏳️", away_flag: "🏳️", sold_out: false },

  // Round of 16
  { id: "m81", match_number: 81, date: "2026-07-04", time: "15:00", venue_id: "los-angeles", stage: "Round of 16", home_team: "W65", away_team: "W66", home_flag: "🏳️", away_flag: "🏳️", sold_out: false },
  { id: "m82", match_number: 82, date: "2026-07-04", time: "19:00", venue_id: "los-angeles", stage: "Round of 16", home_team: "W67", away_team: "W68", home_flag: "🏳️", away_flag: "🏳️", sold_out: false },
  { id: "m83", match_number: 83, date: "2026-07-05", time: "15:00", venue_id: "new-york", stage: "Round of 16", home_team: "W69", away_team: "W70", home_flag: "🏳️", away_flag: "🏳️", sold_out: false },
  { id: "m84", match_number: 84, date: "2026-07-05", time: "19:00", venue_id: "new-york", stage: "Round of 16", home_team: "W71", away_team: "W72", home_flag: "🏳️", away_flag: "🏳️", sold_out: false },

  // Quarter Finals
  { id: "m97", match_number: 97, date: "2026-07-09", time: "16:00", venue_id: "dallas", stage: "Quarter Finals", home_team: "W81", away_team: "W82", home_flag: "🏳️", away_flag: "🏳️", sold_out: false },
  { id: "m98", match_number: 98, date: "2026-07-09", time: "20:00", venue_id: "dallas", stage: "Quarter Finals", home_team: "W83", away_team: "W84", home_flag: "🏳️", away_flag: "🏳️", sold_out: false },
  { id: "m99", match_number: 99, date: "2026-07-10", time: "16:00", venue_id: "boston", stage: "Quarter Finals", home_team: "W85", away_team: "W86", home_flag: "🏳️", away_flag: "🏳️", sold_out: false },
  { id: "m100", match_number: 100, date: "2026-07-10", time: "20:00", venue_id: "boston", stage: "Quarter Finals", home_team: "W87", away_team: "W88", home_flag: "🏳️", away_flag: "🏳️", sold_out: false },

  // Semi Finals
  { id: "m101", match_number: 101, date: "2026-07-14", time: "15:00", venue_id: "atlanta", stage: "Semi Finals", home_team: "W97", away_team: "W98", home_flag: "🏳️", away_flag: "🏳️", sold_out: false },
  { id: "m102", match_number: 102, date: "2026-07-15", time: "15:00", venue_id: "miami", stage: "Semi Finals", home_team: "W99", away_team: "W100", home_flag: "🏳️", away_flag: "🏳️", sold_out: false },

  // 3rd Place
  { id: "m103", match_number: 103, date: "2026-07-18", time: "15:00", venue_id: "dallas", stage: "3rd Place", home_team: "L101", away_team: "L102", home_flag: "🏳️", away_flag: "🏳️", sold_out: false },

  // Final
  { id: "m104", match_number: 104, date: "2026-07-19", time: "15:00", venue_id: "new-york", stage: "Final", home_team: "W101", away_team: "W102", home_flag: "🏳️", away_flag: "🏳️", sold_out: false },
];

export const ticketCategories: TicketCategory[] = [
  {
    id: "standard",
    name: "Standard Match Ticket",
    description: "Your gateway to the greatest show on Earth. Standard seating with access to all general stadium areas.",
    features: [
      "Official match ticket",
      "Access to general concourse",
      "Stadium food & beverage options",
      "Commemorative digital ticket",
    ],
    price_range: "$120 - $1,100",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0565c6a?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "pitchside",
    name: "Pitchside Lounge",
    description: "Get closer to the action than ever before. Premium seating just above pitch level with exclusive lounge access.",
    features: [
      "Premium lower bowl seating",
      "Access to Pitchside Lounge",
      "Premium food & open bar",
      "Pre- and post-match hospitality",
      "Matchday program",
    ],
    price_range: "$3,500 - $9,500",
    image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "trophy",
    name: "Trophy Lounge",
    description: "Elevate your experience with VIP treatment. Exclusive lounge with panoramic stadium views and world-class service.",
    features: [
      "VIP midfield seating",
      "Access to Trophy Lounge",
      "Champagne upon arrival",
      "World-class cuisine",
      "Craft cocktails & mocktails",
      "Exclusive entrance",
      "Premium parking",
    ],
    price_range: "$4,500 - $15,000",
    image: "https://images.unsplash.com/photo-1556056504-5c90e963de4c?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "champions",
    name: "Champions Club",
    description: "The ultimate football experience. All-inclusive premium hospitality with the best seats in the house.",
    features: [
      "Best-in-stadium seating",
      "Access to Champions Club",
      "Champagne upon arrival",
      "Multi-course dining experience",
      "Premium open bar",
      "Exclusive entrance & parking",
      "Dedicated host service",
      "Pre- and post-match entertainment",
      "Commemorative gift",
    ],
    price_range: "$2,500 - $8,500",
    image: "https://images.unsplash.com/photo-1566577739112-1087c5019c84?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "suite",
    name: "Private Suite",
    description: "Where luxury meets exclusivity. Your own private space with dedicated service for you and your guests.",
    features: [
      "Private suite for 12-24 guests",
      "Champagne upon arrival",
      "World-class cuisine",
      "Craft cocktails & mocktails",
      "Premium seat views",
      "Exclusive entrance",
      "Private bathroom",
      "Dedicated hosts",
      "Pre- and post-match hospitality",
    ],
    price_range: "$15,000 - $75,000",
    image: "https://images.unsplash.com/photo-1518605348400-437b458cafe9?q=80&w=2070&auto=format&fit=crop",
  },
];

export const hospitalityPackages: HospitalityPackage[] = [
  {
    id: "venue-series",
    name: "Venue Series",
    description: "Watch every match at your chosen host city venue. The complete World Cup experience in one spectacular location.",
    features: [
      "All matches at selected venue",
      "Priority seat selection",
      "Hospitality lounge access",
      "Exclusive venue merchandise",
      "Dedicated concierge",
    ],
    price_from: 8500,
    price_display: "Starting at $8,500",
    image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=2070&auto=format&fit=crop",
    badge: "Best Value",
  },
  {
    id: "group-stage-pass",
    name: "Group Stage Pass",
    description: "Experience the passion and unpredictability of the group stage. Access to all group matches at your selected venue.",
    features: [
      "All group stage matches at venue",
      "Premium seating category",
      "Pre-match hospitality",
      "Food & beverage included",
    ],
    price_from: 3200,
    price_display: "Starting at $3,200",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0565c6a?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "knockout-package",
    name: "Knockout Package",
    description: "Feel the intensity of sudden-death football. All knockout matches from the Round of 32 through the Final at selected venues.",
    features: [
      "All knockout stage matches",
      "Premium hospitality access",
      "Guaranteed final access option",
      "VIP transfers between venues",
    ],
    price_from: 18500,
    price_display: "Starting at $18,500",
    image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=2070&auto=format&fit=crop",
    badge: "Most Popular",
  },
  {
    id: "final-experience",
    name: "Final Experience",
    description: "Be there for the crowning moment. Exclusive access to the FIFA World Cup 2026 Final with premium hospitality.",
    features: [
      "Final match premium ticket",
      "Champions Club access",
      "Pre-final gala dinner",
      "Champagne celebration",
      "Limited edition memorabilia",
      "Post-match field access (optional)",
    ],
    price_from: 25000,
    price_display: "Starting at $25,000",
    image: "https://images.unsplash.com/photo-1556056504-5c90e963de4c?q=80&w=2070&auto=format&fit=crop",
    badge: "Ultimate Experience",
  },
];

export const venueSeries: VenueSeries[] = [
  {
    id: "atlanta-series",
    venue_id: "atlanta",
    name: "Atlanta Venue Series",
    description: "Watch every match in Atlanta including a Semi-Final.",
    matches_included: ["5 Group Stage", "1 Round of 32", "1 Round of 16", "1 Semi-Final"],
    packages: ["Pitchside Lounge", "Trophy Lounge", "Champions Club", "Private Suite"],
    price_from: 12500,
  },
  {
    id: "boston-series",
    venue_id: "boston",
    name: "Boston Venue Series",
    description: "Watch every match in Boston including a Quarter-Final.",
    matches_included: ["5 Group Stage", "1 Round of 32", "1 Quarter-Final"],
    packages: ["Pitchside Lounge", "Trophy Lounge", "Champions Club Suite"],
    price_from: 9800,
  },
  {
    id: "new-york-series",
    venue_id: "new-york",
    name: "New York / New Jersey Venue Series",
    description: "Watch every match in New York including the Final.",
    matches_included: ["5 Group Stage", "1 Round of 16", "1 Quarter-Final", "1 Final"],
    packages: ["Pitchside Lounge", "Trophy Lounge", "Champions Club", "Private Suite"],
    price_from: 18500,
  },
  {
    id: "dallas-series",
    venue_id: "dallas",
    name: "Dallas Venue Series",
    description: "Watch every match in Dallas including a Quarter-Final and 3rd Place match.",
    matches_included: ["6 Group Stage", "1 Round of 32", "1 Quarter-Final", "1 3rd Place"],
    packages: ["Pitchside Lounge", "Trophy Lounge", "Champions Club", "Private Suite"],
    price_from: 14200,
  },
  {
    id: "los-angeles-series",
    venue_id: "los-angeles",
    name: "Los Angeles Venue Series",
    description: "Watch every match in Los Angeles including Round of 16 fixtures.",
    matches_included: ["5 Group Stage", "1 Round of 32", "2 Round of 16"],
    packages: ["Pitchside Lounge", "Trophy Lounge", "Champions Club", "Private Suite"],
    price_from: 11500,
  },
];

export function getVenueById(id: string): Venue | undefined {
  return venues.find((v) => v.id === id);
}

export function getMatchById(id: string): Match | undefined {
  return matches.find((m) => m.id === id);
}

export function getMatchesByVenue(venueId: string): Match[] {
  return matches.filter((m) => m.venue_id === venueId);
}

export function getMatchesByStage(stage: string): Match[] {
  return matches.filter((m) => m.stage === stage);
}

export function getTicketCategoryById(id: string): TicketCategory | undefined {
  return ticketCategories.find((t) => t.id === id);
}

export function getHospitalityPackageById(id: string): HospitalityPackage | undefined {
  return hospitalityPackages.find((p) => p.id === id);
}

export function getVenueSeriesById(id: string): VenueSeries | undefined {
  return venueSeries.find((s) => s.id === id);
}

export const stages = [
  "Group Stage",
  "Round of 32",
  "Round of 16",
  "Quarter Finals",
  "Semi Finals",
  "3rd Place",
  "Final",
];

export const groups = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
