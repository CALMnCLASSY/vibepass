'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Sparkles, ShieldCheck, Ticket, Check, Filter } from 'lucide-react';
import { CreamfieldsCheckoutModal, CreamfieldsTicketItem } from '@/components/CreamfieldsCheckoutModal';
import { AvailabilityBadge } from '@/components/AvailabilityBadge';

const CREAMFIELDS_TICKETS: CreamfieldsTicketItem[] = [
  {
    id: 'cf-gold-4day',
    name: '4-Day Gold Camping Pass',
    category: 'gold',
    tier: 'Gold',
    dayText: 'Thu - Sun',
    dateText: 'Aug 27-30, 2026',
    priceUsd: 559,
    priceGbp: 430,
    image: '/creamfields/1.png',
    features: [
      'Full 4-day festival arena & exclusive Gold campsite access',
      'Entry to PayPal+ Hospitality Arena with luxury bar & lounge',
      'Complimentary hot meals served daily & free car parking pass',
      'Exclusive Gold air-conditioned restrooms & hot shower facilities',
      'Expedited Gold fast-track entry lanes at main gates',
    ],
  },
  {
    id: 'cf-gold-3day',
    name: '3-Day Gold Camping Pass (Fri - Sun)',
    category: 'gold',
    tier: 'Gold',
    dayText: 'Fri - Sun',
    dateText: 'Aug 28-30, 2026',
    priceUsd: 507,
    priceGbp: 390,
    image: '/creamfields/1.png',
    features: [
      '3 days (Fri-Sun) event arena & Gold campsite access',
      'Entry to PayPal+ Hospitality Arena with VIP amenities',
      'Complimentary hot meals & free festival parking pass',
      'Gold luxury restrooms & hot shower village access',
      'Fast-track gate entry portal',
    ],
  },
  {
    id: 'cf-gold-2day',
    name: '2-Day Gold Camping Pass (Sat - Sun)',
    category: 'gold',
    tier: 'Gold',
    dayText: 'Sat - Sun',
    dateText: 'Aug 29-30, 2026',
    priceUsd: 442,
    priceGbp: 340,
    image: '/creamfields/1.png',
    features: [
      '2 days (Sat-Sun) event arena & Gold campsite access',
      'Entry to PayPal+ Hospitality Arena with luxury bar',
      'Complimentary festival hot meals & free car parking',
      'Gold luxury restrooms & hot shower village access',
      'Fast-track gate entry portal',
    ],
  },
  {
    id: 'cf-silver-4day',
    name: '4-Day Silver Camping Pass',
    category: 'silver',
    tier: 'Silver',
    dayText: 'Thu - Sun',
    dateText: 'Aug 27-30, 2026',
    priceUsd: 481,
    priceGbp: 370,
    image: '/creamfields/2.png',
    features: [
      'Full 4-day festival arena & Silver campsite access',
      'Access to exclusive Silver pamper parlor & hot showers',
      'Premium air-conditioned restroom trailers',
      'Expedited Silver entry lanes at main gates',
      'Free water refill points throughout Silver village',
    ],
  },
  {
    id: 'cf-silver-3day',
    name: '3-Day Silver Camping Pass (Fri - Sun)',
    category: 'silver',
    tier: 'Silver',
    dayText: 'Fri - Sun',
    dateText: 'Aug 28-30, 2026',
    priceUsd: 429,
    priceGbp: 330,
    image: '/creamfields/2.png',
    features: [
      '3 days (Fri-Sun) festival arena & Silver campsite access',
      'Access to Silver pamper parlor & hot showers',
      'Premium air-conditioned restroom trailers',
      'Expedited Silver entry lanes at main gates',
    ],
  },
  {
    id: 'cf-standard-4day',
    name: '4-Day Standard Camping Pass',
    category: 'standard',
    tier: 'Standard',
    dayText: 'Thu - Sun',
    dateText: 'Aug 27-30, 2026',
    priceUsd: 403,
    priceGbp: 310,
    image: '/creamfields/3.png',
    features: [
      'Full 4-day festival arena & Standard campsite access',
      'Access to all mainstages, Arc stage & Steelyard arena',
      'Food village, merch stalls & medical center access',
      'Free water refill stations throughout campsite & arena',
    ],
  },
  {
    id: 'cf-standard-3day',
    name: '3-Day Standard Camping Pass (Fri - Sun)',
    category: 'standard',
    tier: 'Standard',
    dayText: 'Fri - Sun',
    dateText: 'Aug 28-30, 2026',
    priceUsd: 351,
    priceGbp: 270,
    image: '/creamfields/3.png',
    features: [
      '3 days (Fri-Sun) festival arena & Standard campsite access',
      'Access to all mainstages, Arc stage & Steelyard arena',
      'Food village & merchandise stalls',
      'Free water refill stations throughout site',
    ],
  },
  {
    id: 'cf-standard-2day',
    name: '2-Day Standard Camping Pass (Sat - Sun)',
    category: 'standard',
    tier: 'Standard',
    dayText: 'Sat - Sun',
    dateText: 'Aug 29-30, 2026',
    priceUsd: 299,
    priceGbp: 230,
    image: '/creamfields/3.png',
    features: [
      '2 days (Sat-Sun) festival arena & Standard campsite access',
      'Access to all mainstages, Arc stage & Steelyard arena',
      'Food village & merchandise stalls',
      'Free water refill stations',
    ],
  },
  {
    id: 'cf-day-friday',
    name: 'Friday Day Pass (Non-Camping)',
    category: 'day',
    tier: 'Day Pass',
    dayText: 'Friday',
    dateText: 'Aug 28, 2026',
    priceUsd: 143,
    priceGbp: 110,
    image: '/creamfields/4.png',
    features: [
      'Full Friday 1-day arena access (No camping)',
      'Entry to all Friday mainstage acts & arenas',
      'Food court & festival merchandise access',
      'Official Live Nation digital order confirmation',
    ],
  },
  {
    id: 'cf-day-saturday',
    name: 'Saturday Day Pass (Non-Camping)',
    category: 'day',
    tier: 'Day Pass',
    dayText: 'Saturday',
    dateText: 'Aug 29, 2026',
    priceUsd: 169,
    priceGbp: 130,
    image: '/creamfields/4.png',
    features: [
      'Full Saturday 1-day arena access (No camping)',
      'Entry to all Saturday mainstage acts & arenas',
      'Food court & festival merchandise access',
      'Official Live Nation digital order confirmation',
    ],
  },
  {
    id: 'cf-day-sunday',
    name: 'Sunday Day Pass (Non-Camping)',
    category: 'day',
    tier: 'Day Pass',
    dayText: 'Sunday',
    dateText: 'Aug 30, 2026',
    priceUsd: 156,
    priceGbp: 120,
    image: '/creamfields/4.png',
    features: [
      'Full Sunday 1-day arena access (No camping)',
      'Entry to all Sunday mainstage acts & closing set',
      'Food court & festival merchandise access',
      'Official Live Nation digital order confirmation',
    ],
  },
];

export default function CreamfieldsPage() {
  const [selectedTicket, setSelectedTicket] = useState<CreamfieldsTicketItem | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredTickets = filterCategory === 'all'
    ? CREAMFIELDS_TICKETS
    : CREAMFIELDS_TICKETS.filter(t => t.category === filterCategory);

  return (
    <div className="min-h-screen bg-[#070b19] text-white selection:bg-amber-400 selection:text-slate-950 font-sans">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden border-b border-blue-900/40">
        <div className="absolute inset-0 z-0">
          <Image
            src="/creamfields/1.png"
            alt="Creamfields 2026 Background"
            fill
            className="object-cover opacity-20 blur-sm"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070b19]/60 via-[#070b19]/90 to-[#070b19]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Official Event Logo / Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-950/80 border border-blue-600/40 text-blue-300 text-xs font-bold uppercase tracking-wider mb-6 shadow-xl backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Rockstar Energy presents Creamfields 2026</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 uppercase drop-shadow-2xl">
            CREAMFIELDS <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-400">2026</span>
          </h1>

          <p className="max-w-3xl mx-auto text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed font-medium">
            The UK's biggest electronic dance music festival returns for the August Bank Holiday weekend. Reserve official Gold, Silver, Standard Camping, or Day Passes with guaranteed fulfillment.
          </p>

          {/* Quick Event Details Bar */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-semibold text-slate-300">
            <div className="flex items-center gap-2 bg-slate-900/90 px-4 py-2.5 rounded-2xl border border-slate-800 backdrop-blur-md">
              <Calendar className="w-4 h-4 text-blue-400" />
              <span>August 27 – 30, 2026</span>
            </div>

            <div className="flex items-center gap-2 bg-slate-900/90 px-4 py-2.5 rounded-2xl border border-slate-800 backdrop-blur-md">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Daresbury, Cheshire, UK</span>
            </div>

            <div className="flex items-center gap-2 bg-slate-900/90 px-4 py-2.5 rounded-2xl border border-slate-800 backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Official 100% Verified Marketplace</span>
            </div>
          </div>
        </div>
      </section>

      {/* Ticket Pass Categories & Filter Bar */}
      <section className="py-8 bg-[#0a1026]/90 border-b border-blue-900/60 sticky top-16 z-30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-slate-300 font-bold text-sm">
              <Filter className="w-4 h-4 text-amber-400" />
              <span>Filter Pass Options:</span>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {[
                { id: 'all', label: 'All Admission Passes' },
                { id: 'gold', label: 'Gold Camping (Luxury)' },
                { id: 'silver', label: 'Silver Camping (Hot Showers)' },
                { id: 'standard', label: 'Standard Camping' },
                { id: 'day', label: 'Day Passes (Non-Camping)' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setFilterCategory(tab.id)}
                  className={`px-4 py-2 rounded-full font-bold text-xs transition-all cursor-pointer ${
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

      {/* Tickets Display Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">Available Admission Passes</h2>
            <p className="text-xs text-slate-400 mt-1">Select your pass option to start secured checkout</p>
          </div>

          <Link
            href="/sell/creamfields-2026"
            className="px-4 py-2 bg-blue-950/80 hover:bg-blue-900 text-blue-200 hover:text-white border border-blue-800 rounded-xl text-xs font-bold transition-all flex items-center gap-2"
          >
            <Ticket className="w-4 h-4 text-amber-400" />
            <span>Selling Creamfields Tickets? List Here</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTickets.map(ticket => (
            <div
              key={ticket.id}
              className="group relative bg-[#0d1636]/90 border border-blue-900/80 hover:border-amber-400/50 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Card Header & Tier Badge */}
                <div className="p-6 border-b border-blue-900/60 bg-gradient-to-r from-blue-950 to-[#0d1636] flex items-center justify-between relative">
                  <span className={`px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase ${
                    ticket.tier === 'Gold'
                      ? 'bg-amber-400 text-slate-950'
                      : ticket.tier === 'Silver'
                      ? 'bg-slate-300 text-slate-950'
                      : ticket.tier === 'Standard'
                      ? 'bg-blue-600 text-white'
                      : 'bg-indigo-600 text-white'
                  }`}>
                    {ticket.tier} Pass
                  </span>

                  <span className="px-2.5 py-1 rounded-full bg-slate-900/80 text-blue-200 text-xs font-bold border border-blue-700/50">
                    {ticket.dayText} ({ticket.dateText})
                  </span>

                  <AvailabilityBadge ticketId={ticket.id} price={ticket.priceUsd} className="top-2 right-2 border border-emerald-400/40" />
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

              {/* Pricing & Checkout Action */}
              <div className="p-6 pt-0 border-t border-blue-900/60 mt-4 flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Price per Pass</span>
                  <div className="text-2xl font-black text-white">
                    ${ticket.priceUsd}{' '}
                    <span className="text-xs font-normal text-slate-400">USD (£{ticket.priceGbp} GBP)</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedTicket(ticket)}
                  disabled={ticket.isSoldOut}
                  className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-lg flex items-center gap-1.5 cursor-pointer ${
                    ticket.isSoldOut
                      ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500 hover:from-blue-500 hover:to-amber-400 text-white shadow-blue-500/20 hover:scale-105'
                  }`}
                >
                  {ticket.isSoldOut ? 'Sold Out' : 'Select Ticket'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Checkout Modal Component */}
      <CreamfieldsCheckoutModal
        item={selectedTicket}
        isOpen={!!selectedTicket}
        onClose={() => setSelectedTicket(null)}
      />
    </div>
  );
}
