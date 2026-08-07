'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Sparkles, ShieldCheck, Ticket, Check, Filter } from 'lucide-react';
import { CoronaCapitalCheckoutModal, CoronaTicketItem } from '@/components/CoronaCapitalCheckoutModal';

const CORONA_TICKETS: CoronaTicketItem[] = [
  {
    id: 'cc-3day-ga',
    name: 'Corona Capital 2026 - 3-Day General Access Pass (Abono)',
    category: '3day',
    tier: 'General',
    dayText: 'Fri - Sun',
    dateText: 'Nov 15-17, 2026',
    priceUsd: 248,
    priceMxn: '$4,760',
    image: '/corona-capital/logo-corona-capital.webp',
    features: [
      'Access to 3 full days of music across all 5 main stages',
      'Entry to food truck areas, brand activations & chill zones',
      'Free water hydration stations throughout festival grounds',
      'Festival wristband / digital Ticketmaster ticket fulfillment',
    ],
  },
  {
    id: 'cc-3day-comfort',
    name: 'Corona Capital 2026 - 3-Day Comfort Pass presented by Banamex',
    category: '3day',
    tier: 'Comfort',
    dayText: 'Fri - Sun',
    dateText: 'Nov 15-17, 2026',
    priceUsd: 349,
    priceMxn: '$6,700',
    image: '/corona-capital/logo-corona-capital.webp',
    features: [
      'All 3-Day General Admission stage & area access',
      'Exclusive air-conditioned restroom trailers with attendants',
      'Fast-track expedited entry lanes at main gates',
      'Access to Comfort Pass lounge & bar service',
    ],
  },
  {
    id: 'cc-3day-vip',
    name: 'Corona Capital 2026 - 3-Day VIP Pass (Banamex Plus)',
    category: '3day',
    tier: 'VIP',
    dayText: 'Fri - Sun',
    dateText: 'Nov 15-17, 2026',
    priceUsd: 453,
    priceMxn: '$8,700',
    image: '/corona-capital/logo-corona-capital.webp',
    features: [
      'Elevated VIP platforms with premier views at main stages',
      'Fast-track VIP entry portals at gate access',
      'Luxury air-conditioned restrooms & premium bar service',
      'Exclusive gourmet food vendors, shaded seating & Wi-Fi',
      'Battery charging stations & VIP concierge service',
    ],
  },
  {
    id: 'cc-3day-club',
    name: 'Corona Capital 2026 - 3-Day Ultra Luxury Club Pass',
    category: '3day',
    tier: 'Club',
    dayText: 'Fri - Sun',
    dateText: 'Nov 15-17, 2026',
    priceUsd: 1820,
    priceMxn: '$35,000',
    image: '/corona-capital/logo-corona-capital.webp',
    features: [
      'Ultra luxury side-stage & backstage viewing lounge',
      'All-inclusive open bar & unlimited culinary tasting menus',
      'Dedicated private golf cart shuttle service across stages',
      'VIP backstage artist lounge access & concierge',
      'Commemorative gift package & premium merchandise',
    ],
  },
  {
    id: 'cc-fri-ga',
    name: 'Corona Capital 2026 - Friday General Access Pass',
    category: 'friday',
    tier: 'General',
    dayText: 'Friday',
    dateText: 'Nov 15, 2026',
    priceUsd: 135,
    priceMxn: '$2,600',
    image: '/corona-capital/logo-corona-capital.webp',
    features: [
      'Full 1-day access to all festival stages on Friday',
      'Food trucks, activation zones & merch stores',
      'Free water hydration stations throughout grounds',
    ],
  },
  {
    id: 'cc-fri-vip',
    name: 'Corona Capital 2026 - Friday VIP Pass (Banamex Plus)',
    category: 'friday',
    tier: 'VIP',
    dayText: 'Friday',
    dateText: 'Nov 15, 2026',
    priceUsd: 250,
    priceMxn: '$4,800',
    image: '/corona-capital/logo-corona-capital.webp',
    features: [
      'Friday VIP elevated viewing decks & fast-track portals',
      'Luxury air-conditioned restrooms & VIP craft bars',
      'Shaded lounge seating, charging stations & Wi-Fi',
    ],
  },
  {
    id: 'cc-sat-ga',
    name: 'Corona Capital 2026 - Saturday General Access Pass',
    category: 'saturday',
    tier: 'General',
    dayText: 'Saturday',
    dateText: 'Nov 16, 2026',
    priceUsd: 182,
    priceMxn: '$3,500',
    image: '/corona-capital/logo-corona-capital.webp',
    features: [
      'Full 1-day access to all festival stages on Saturday',
      'Food trucks, activation zones & merch stores',
      'Free water hydration stations throughout grounds',
    ],
  },
  {
    id: 'cc-sat-vip',
    name: 'Corona Capital 2026 - Saturday VIP Pass (Banamex Plus)',
    category: 'saturday',
    tier: 'VIP',
    dayText: 'Saturday',
    dateText: 'Nov 16, 2026',
    priceUsd: 250,
    priceMxn: '$4,800',
    image: '/corona-capital/logo-corona-capital.webp',
    features: [
      'Saturday VIP elevated viewing decks & fast-track portals',
      'Luxury air-conditioned restrooms & VIP craft bars',
      'Shaded lounge seating, charging stations & Wi-Fi',
    ],
  },
  {
    id: 'cc-sun-ga',
    name: 'Corona Capital 2026 - Sunday General Access Pass',
    category: 'sunday',
    tier: 'General',
    dayText: 'Sunday',
    dateText: 'Nov 17, 2026',
    priceUsd: 135,
    priceMxn: '$2,600',
    image: '/corona-capital/logo-corona-capital.webp',
    features: [
      'Full 1-day access to all festival stages on Sunday',
      'Food trucks, activation zones & merch stores',
      'Free water hydration stations throughout grounds',
    ],
  },
  {
    id: 'cc-sun-vip',
    name: 'Corona Capital 2026 - Sunday VIP Pass (Banamex Plus)',
    category: 'sunday',
    tier: 'VIP',
    dayText: 'Sunday',
    dateText: 'Nov 17, 2026',
    priceUsd: 250,
    priceMxn: '$4,800',
    image: '/corona-capital/logo-corona-capital.webp',
    features: [
      'Sunday VIP elevated viewing decks & fast-track portals',
      'Luxury air-conditioned restrooms & VIP craft bars',
      'Shaded lounge seating, charging stations & Wi-Fi',
    ],
  },
];

export default function CoronaCapitalPage() {
  const [selectedTicket, setSelectedTicket] = useState<CoronaTicketItem | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredTickets = CORONA_TICKETS.filter(ticket => {
    if (filterCategory === 'all') return true;
    if (filterCategory === '3day') return ticket.category === '3day';
    if (filterCategory === 'friday') return ticket.category === 'friday';
    if (filterCategory === 'saturday') return ticket.category === 'saturday';
    if (filterCategory === 'sunday') return ticket.category === 'sunday';
    if (filterCategory === 'vip') return ticket.tier === 'VIP' || ticket.tier === 'Club';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#001738] text-white flex flex-col font-sans">
      {/* Hero Header Section */}
      <section className="relative w-full py-20 md:py-28 overflow-hidden bg-[#002356] border-b border-blue-500/20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#002356] via-[#001738] to-slate-950 z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001738] via-transparent to-transparent z-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="w-56 md:w-72 h-20 relative mb-6">
            <Image
              src="/corona-capital/logo-corona-capital.webp"
              alt="Corona Capital CDMX"
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 font-bold text-xs uppercase tracking-widest mb-6 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-400" /> Capítulo 15 • Official Marketplace Partner
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-4 uppercase leading-none drop-shadow-2xl">
            Corona Capital <span className="text-amber-400">CDMX 2026</span>
          </h1>

          <p className="text-lg md:text-2xl text-blue-100/90 max-w-3xl mx-auto font-medium mb-8 drop-shadow-md">
            November 15–17, 2026 • Autódromo Hermanos Rodríguez • Mexico City
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-slate-300 font-semibold mb-8">
            <div className="flex items-center gap-2 bg-[#001738]/80 border border-blue-500/30 px-4 py-2 rounded-full">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>November 15–17, 2026</span>
            </div>
            <div className="flex items-center gap-2 bg-[#001738]/80 border border-blue-500/30 px-4 py-2 rounded-full">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span>Autódromo Hermanos Rodríguez • CDMX</span>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-6 py-2.5 rounded-full text-xs md:text-sm font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Guaranteed Official Tickets • Secure Payment & Digital Fulfillment</span>
          </div>
        </div>
      </section>

      {/* Ticket Pass Categories & Filter Bar */}
      <section className="py-8 bg-[#001738]/90 border-b border-blue-900/60 sticky top-16 z-30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-slate-300 font-bold text-sm">
              <Filter className="w-4 h-4 text-amber-400" />
              <span>Filter Corona Capital Passes:</span>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {[
                { id: 'all', label: 'All Admission Passes' },
                { id: '3day', label: '3-Day Abonos' },
                { id: 'friday', label: 'Friday Nov 15' },
                { id: 'saturday', label: 'Saturday Nov 16' },
                { id: 'sunday', label: 'Sunday Nov 17' },
                { id: 'vip', label: 'VIP & Club Passes' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setFilterCategory(tab.id)}
                  className={`px-4 py-2 rounded-full font-bold text-xs transition-all ${
                    filterCategory === tab.id
                      ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20'
                      : 'bg-blue-950/80 text-blue-200 hover:bg-blue-900 hover:text-white border border-blue-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tickets Selection Grid */}
      <section className="py-16 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                Official Corona Capital <span className="text-amber-400">Passes & Boletos</span>
              </h2>
              <p className="text-blue-200/70 text-sm mt-1">
                Choose your pass category below to launch secure payment and digital transfer.
              </p>
            </div>
            <Link
              href="/sell/corona-capital-2026"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-blue-900/60 border border-blue-500/40 text-blue-200 hover:bg-blue-800 text-xs font-bold transition-all"
            >
              <Ticket className="w-4 h-4 text-amber-400" />
              <span>Selling Corona Capital Tickets? List Here</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTickets.map(ticket => (
              <div
                key={ticket.id}
                className="group relative bg-[#002356]/90 border border-blue-900/80 hover:border-amber-400/50 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Card Header & Tier Badge */}
                  <div className="p-6 border-b border-blue-900/60 bg-gradient-to-r from-blue-950 to-[#002356] flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase ${
                      ticket.tier === 'Club'
                        ? 'bg-purple-500 text-white'
                        : ticket.tier === 'VIP'
                        ? 'bg-amber-400 text-slate-950'
                        : ticket.tier === 'Comfort'
                        ? 'bg-cyan-500 text-slate-950'
                        : 'bg-blue-600 text-white'
                    }`}>
                      {ticket.tier} Tier
                    </span>

                    <span className="px-2.5 py-1 rounded-full bg-slate-900/80 text-blue-200 text-xs font-bold border border-blue-700/50">
                      {ticket.dayText} ({ticket.dateText})
                    </span>
                  </div>

                  {/* Card Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 leading-snug group-hover:text-amber-300 transition-colors">
                      {ticket.name}
                    </h3>

                    {/* Features list */}
                    <ul className="space-y-2 my-4">
                      {ticket.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer Pricing & Action */}
                <div className="p-6 pt-0 border-t border-blue-900/60 mt-4 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Price per Pass</span>
                    <div className="text-2xl font-black text-white">
                      ${ticket.priceUsd}{' '}
                      <span className="text-xs font-normal text-amber-300">USD ({ticket.priceMxn} MXN)</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedTicket(ticket)}
                    disabled={ticket.isSoldOut}
                    className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-lg flex items-center gap-1.5 ${
                      ticket.isSoldOut
                        ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-amber-500 hover:from-blue-500 hover:to-amber-400 text-white hover:scale-[1.02]'
                    }`}
                  >
                    {ticket.isSoldOut ? 'Sold Out' : 'Select Ticket'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Checkout Modal Component */}
      <CoronaCapitalCheckoutModal
        item={selectedTicket}
        onClose={() => setSelectedTicket(null)}
      />
    </div>
  );
}
