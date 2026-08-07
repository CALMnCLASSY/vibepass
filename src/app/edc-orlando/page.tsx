'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Sparkles, ShieldCheck, Ticket, Users, Check, Filter } from 'lucide-react';
import { EDCCheckoutModal, EDCTicketItem } from '@/components/EDCCheckoutModal';

const EDC_TICKETS: EDCTicketItem[] = [
  {
    id: 'h0v0c1mtb64ihow4',
    name: '2026 EDC Orlando - 3-Day GA Experience Pass',
    category: '3day',
    tier: 'GA',
    dayText: 'Fri - Sun',
    dateText: 'Nov 6-8, 2026',
    price: 333.71,
    ageLimit: 'Ages 18+ Only',
    image: '/edc-orlando/158544_lg.jpg',
    features: [
      'Access to 3 full days of festival music & carnival rides',
      'Entry to kineticFIELD, circuitGROUNDS, stereoBLOOM & neonGARDEN',
      'Interactive art installations, food vendors & merch shops',
      'Free water refill stations throughout Tinker Field grounds',
      'Festival wristband fulfillment included',
    ],
  },
  {
    id: 'gq27bicu44e3zdil',
    name: '2026 EDC Orlando - 3-Day GA+ Experience Plus',
    category: '3day',
    tier: 'GA+',
    dayText: 'Fri - Sun',
    dateText: 'Nov 6-8, 2026',
    price: 402.67,
    ageLimit: 'Ages 18+ Only',
    image: '/edc-orlando/158545_lg.jpg',
    features: [
      'All 3-Day General Admission perks & stage access',
      'Dedicated premium air-conditioned restroom trailers',
      'Expedited GA+ entry lanes at festival gates',
      'Exclusive GA+ lounge access & dedicated water stations',
      'Collectible commemorative wristband',
    ],
  },
  {
    id: 'cjyktet993djnilc',
    name: '2026 EDC Orlando - 3-Day VIP Elevated Experience Pass',
    category: '3day',
    tier: 'VIP',
    dayText: 'Fri - Sun',
    dateText: 'Nov 6-8, 2026',
    price: 699.99,
    ageLimit: 'Ages 21+ Only',
    image: '/edc-orlando/158546_lg.jpg',
    features: [
      'Elevated VIP viewing decks at kineticFIELD, circuitGROUNDS & neonGARDEN',
      'Dedicated fast-track VIP entry portals',
      'Exclusive VIP air-conditioned restrooms with attendants',
      'Dedicated VIP craft cocktail bars & gourmet food options',
      'VIP Wi-Fi, beauty bar, glitter station & complimentary body paint',
    ],
  },
  {
    id: 'e7x39fmqhsnq6lip',
    name: '2026 EDC Orlando - Friday GA Experience Pass',
    category: 'friday',
    tier: 'GA',
    dayText: 'Friday',
    dateText: 'Nov 6, 2026',
    price: 146.99,
    ageLimit: 'Ages 18+ Only',
    image: '/edc-orlando/160815_lg.jpg',
    features: [
      'Full 1-day access to all festival stages on Friday',
      'Carnival rides, art installations & food vendors',
      'Free water refill stations throughout festival grounds',
      'Official Insomniac digital order confirmation',
    ],
  },
  {
    id: 'uxfvq4qnggmsb9f9',
    name: '2026 EDC Orlando - Friday GA+ Experience Plus',
    category: 'friday',
    tier: 'GA+',
    dayText: 'Friday',
    dateText: 'Nov 6, 2026',
    price: 212.99,
    ageLimit: 'Ages 18+ Only',
    image: '/edc-orlando/160816_lg.jpg',
    features: [
      'Friday 1-day festival & stage access',
      'Dedicated air-conditioned restroom trailers',
      'Expedited GA+ entry lanes at festival gates',
      'Access to GA+ lounge amenities',
    ],
  },
  {
    id: 'r1weh9rdkrx44pxh',
    name: '2026 EDC Orlando - Friday VIP Elevated Experience Pass',
    category: 'friday',
    tier: 'VIP',
    dayText: 'Friday',
    dateText: 'Nov 6, 2026',
    price: 244.99,
    ageLimit: 'Ages 21+ Only',
    image: '/edc-orlando/160817_lg.jpg',
    features: [
      'Friday VIP elevated viewing decks & fast-track portals',
      'Luxury air-conditioned restrooms & VIP bars',
      'Exclusive VIP photo ops, beauty bar & lounges',
      'Dedicated festival concierge & complimentary amenities',
    ],
  },
  {
    id: 'na030fllwd3litpl',
    name: '2026 EDC Orlando - Saturday GA Experience Pass',
    category: 'saturday',
    tier: 'GA',
    dayText: 'Saturday',
    dateText: 'Nov 7, 2026',
    price: 157.99,
    ageLimit: 'Ages 18+ Only',
    image: '/edc-orlando/158544_lg.jpg',
    features: [
      'Full 1-day access to all festival stages on Saturday',
      'Carnival rides, art installations & food vendors',
      'Free water refill stations throughout festival grounds',
      'Official Insomniac digital order confirmation',
    ],
  },
  {
    id: 'jew5vldqbzg1u3wm',
    name: '2026 EDC Orlando - Saturday GA+ Experience Plus',
    category: 'saturday',
    tier: 'GA+',
    dayText: 'Saturday',
    dateText: 'Nov 7, 2026',
    price: 212.99,
    ageLimit: 'Ages 18+ Only',
    image: '/edc-orlando/158545_lg.jpg',
    features: [
      'Saturday 1-day festival & stage access',
      'Dedicated air-conditioned restroom trailers',
      'Expedited GA+ entry lanes at festival gates',
      'Access to GA+ lounge amenities',
    ],
  },
  {
    id: 'reo8aurk0svbot4v',
    name: '2026 EDC Orlando - Saturday VIP Elevated Experience Pass',
    category: 'saturday',
    tier: 'VIP',
    dayText: 'Saturday',
    dateText: 'Nov 7, 2026',
    price: 244.99,
    ageLimit: 'Ages 21+ Only',
    image: '/edc-orlando/158546_lg.jpg',
    isSoldOut: true,
    features: [
      'Saturday VIP elevated viewing decks & fast-track portals',
      'Luxury air-conditioned restrooms & VIP bars',
      'Exclusive VIP photo ops, beauty bar & lounges',
      'Dedicated festival concierge & complimentary amenities',
    ],
  },
  {
    id: '1plku3zyfbbrkyks',
    name: '2026 EDC Orlando - Sunday GA Experience Pass',
    category: 'sunday',
    tier: 'GA',
    dayText: 'Sunday',
    dateText: 'Nov 8, 2026',
    price: 146.99,
    ageLimit: 'Ages 18+ Only',
    image: '/edc-orlando/160815_lg.jpg',
    features: [
      'Full 1-day access to all festival stages on Sunday',
      'Carnival rides, art installations & food vendors',
      'Free water refill stations throughout festival grounds',
      'Official Insomniac digital order confirmation',
    ],
  },
  {
    id: '1tqegxrz0c3bww16',
    name: '2026 EDC Orlando - Sunday GA+ Experience Plus',
    category: 'sunday',
    tier: 'GA+',
    dayText: 'Sunday',
    dateText: 'Nov 8, 2026',
    price: 212.99,
    ageLimit: 'Ages 18+ Only',
    image: '/edc-orlando/160816_lg.jpg',
    features: [
      'Sunday 1-day festival & stage access',
      'Dedicated air-conditioned restroom trailers',
      'Expedited GA+ entry lanes at festival gates',
      'Access to GA+ lounge amenities',
    ],
  },
  {
    id: 'hn1gfejvcsvee6uh',
    name: '2026 EDC Orlando - Sunday VIP Elevated Experience Pass',
    category: 'sunday',
    tier: 'VIP',
    dayText: 'Sunday',
    dateText: 'Nov 8, 2026',
    price: 244.99,
    ageLimit: 'Ages 21+ Only',
    image: '/edc-orlando/160817_lg.jpg',
    features: [
      'Sunday VIP elevated viewing decks & fast-track portals',
      'Luxury air-conditioned restrooms & VIP bars',
      'Exclusive VIP photo ops, beauty bar & lounges',
      'Dedicated festival concierge & complimentary amenities',
    ],
  },
];

export default function EDCOrlandoPage() {
  const [selectedTicket, setSelectedTicket] = useState<EDCTicketItem | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredTickets = EDC_TICKETS.filter(ticket => {
    if (filterCategory === 'all') return true;
    if (filterCategory === '3day') return ticket.category === '3day';
    if (filterCategory === 'friday') return ticket.category === 'friday';
    if (filterCategory === 'saturday') return ticket.category === 'saturday';
    if (filterCategory === 'sunday') return ticket.category === 'sunday';
    if (filterCategory === 'vip') return ticket.tier === 'VIP';
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans">
      {/* Hero Header Section */}
      <section className="relative w-full py-20 md:py-28 overflow-hidden bg-slate-900 border-b border-purple-500/20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 via-fuchsia-950/80 to-slate-950 z-0" />
        <div
          className="absolute inset-0 bg-[url('/edc-orlando/header.png')] bg-cover bg-center opacity-30 mix-blend-overlay z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-300 font-bold text-xs uppercase tracking-widest mb-6 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-purple-400" /> Electric Daisy Carnival 2026
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-6 uppercase leading-none drop-shadow-2xl">
            EDC <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">Orlando</span>
          </h1>

          <p className="text-lg md:text-2xl text-purple-100/90 max-w-3xl mx-auto font-medium mb-8 drop-shadow-md">
            Under the Electric Sky • November 6–8, 2026 • Tinker Field, Orlando, FL
          </p>

          <div className="flex flex-wrap justify-center items-center gap-6 text-sm md:text-base text-slate-300 font-semibold mb-10">
            <div className="flex items-center gap-2 bg-slate-900/80 border border-purple-500/30 px-4 py-2 rounded-full">
              <Calendar className="w-4 h-4 text-purple-400" />
              <span>November 6–8, 2026</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/80 border border-purple-500/30 px-4 py-2 rounded-full">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>Tinker Field • Orlando, FL</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/80 border border-purple-500/30 px-4 py-2 rounded-full">
              <Users className="w-4 h-4 text-fuchsia-400" />
              <span>18+ General • 21+ VIP</span>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-6 py-2.5 rounded-full text-xs md:text-sm font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Guaranteed Authentic Passes • Instant Fulfillment & Secure Checkout</span>
          </div>
        </div>
      </section>

      {/* Ticket Pass Categories & Filter Bar */}
      <section className="py-12 bg-slate-900/40 border-b border-slate-800 sticky top-16 z-30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-slate-300 font-bold text-sm">
              <Filter className="w-4 h-4 text-purple-400" />
              <span>Filter Ticket Passes:</span>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {[
                { id: 'all', label: 'All Admission Passes' },
                { id: '3day', label: '3-Day Passes' },
                { id: 'friday', label: 'Friday Nov 6' },
                { id: 'saturday', label: 'Saturday Nov 7' },
                { id: 'sunday', label: 'Sunday Nov 8' },
                { id: 'vip', label: 'VIP Elevated Passes' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setFilterCategory(tab.id)}
                  className={`px-4 py-2 rounded-full font-bold text-xs transition-all ${
                    filterCategory === tab.id
                      ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-500/20'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
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
      <section className="py-16 bg-slate-950 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                Official EDC Orlando <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Admission Passes</span>
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Select your preferred pass below to proceed to instant secure checkout.
              </p>
            </div>
            <Link
              href="/sell/edc-orlando-2026"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-slate-800 border border-purple-500/40 text-purple-300 hover:bg-purple-900/30 text-xs font-bold transition-all"
            >
              <Ticket className="w-4 h-4" />
              <span>Selling EDC Tickets? List Here</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTickets.map(ticket => (
              <div
                key={ticket.id}
                className="group relative bg-slate-900/90 border border-slate-800 hover:border-purple-500/50 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-purple-500/10 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Card Thumbnail Image */}
                  <div className="relative w-full h-44 bg-slate-950 overflow-hidden">
                    <Image
                      src={ticket.image}
                      alt={ticket.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase backdrop-blur-md shadow-md ${
                        ticket.tier === 'VIP'
                          ? 'bg-amber-500/90 text-slate-950 font-extrabold'
                          : ticket.tier === 'GA+'
                          ? 'bg-cyan-500/90 text-slate-950 font-extrabold'
                          : 'bg-purple-600/90 text-white'
                      }`}>
                        {ticket.tier} Pass
                      </span>

                      <span className="px-2.5 py-1 rounded-full bg-slate-950/80 text-slate-300 text-xs font-bold border border-slate-700/60 backdrop-blur-md">
                        {ticket.ageLimit}
                      </span>
                    </div>

                    {/* Date & Day overlay */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-950/90 text-purple-300 text-xs font-bold border border-purple-500/30">
                        {ticket.dayText} ({ticket.dateText})
                      </span>
                    </div>
                  </div>

                  {/* Card Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 leading-snug group-hover:text-purple-300 transition-colors">
                      {ticket.name}
                    </h3>

                    {/* Features list */}
                    <ul className="space-y-2 my-4">
                      {ticket.features.slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <Check className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer Pricing & Action */}
                <div className="p-6 pt-0 border-t border-slate-800/80 mt-4 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Price per Pass</span>
                    <div className="text-2xl font-black text-white">
                      ${ticket.price.toFixed(2)}{' '}
                      <span className="text-xs font-normal text-slate-400">USD</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedTicket(ticket)}
                    disabled={ticket.isSoldOut}
                    className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-lg flex items-center gap-1.5 ${
                      ticket.isSoldOut
                        ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white hover:scale-[1.02]'
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
      <EDCCheckoutModal
        item={selectedTicket}
        onClose={() => setSelectedTicket(null)}
      />
    </div>
  );
}
