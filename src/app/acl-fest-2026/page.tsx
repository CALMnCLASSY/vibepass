'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Calendar, MapPin, Music, Users, Leaf } from 'lucide-react';
import { getACLFestEvent } from '@/data/events';
import { ACLFestCheckoutModal } from '@/components/ACLFestCheckoutModal';
import { AvailabilityBadge } from '@/components/AvailabilityBadge';

const ticketOptions = [
  {
    id: 'acl-friday-ga',
    name: 'Friday General Admission',
    day: 'Friday, Oct 2',
    description: 'Full access to all 9 stages at Zilker Park for Friday of the festival.',
    price: 170,
    features: [
      'Access to all 9 live music stages',
      'Food & beverage vendors throughout the park',
      'Bars with cocktails, beer, wine & mocktails',
      'Official ACL merch & art vendor access',
      'Children 8 & under free (limit 2 per adult)',
    ],
  },
  {
    id: 'acl-saturday-ga',
    name: 'Saturday General Admission',
    day: 'Saturday, Oct 3',
    description: 'Full access to all 9 stages at Zilker Park for Saturday of the festival.',
    price: 170,
    features: [
      'Access to all 9 live music stages',
      'Food & beverage vendors throughout the park',
      'Bars with cocktails, beer, wine & mocktails',
      'Official ACL merch & art vendor access',
      'Children 8 & under free (limit 2 per adult)',
    ],
  },
  {
    id: 'acl-sunday-ga',
    name: 'Sunday General Admission',
    day: 'Sunday, Oct 4',
    description: 'Full access to all 9 stages at Zilker Park for Sunday of the festival.',
    price: 170,
    features: [
      'Access to all 9 live music stages',
      'Food & beverage vendors throughout the park',
      'Bars with cocktails, beer, wine & mocktails',
      'Official ACL merch & art vendor access',
      'Children 8 & under free (limit 2 per adult)',
    ],
  },
  {
    id: 'acl-friday-collectible',
    name: 'Collectible Credential + Friday GA',
    day: 'Friday, Oct 2',
    description: 'Friday GA + a 3D Collectible Credential keepsake and custom ACL Festival lanyard.',
    price: 184,
    features: [
      '3D Collectible Credential (keepsake — not for entry)',
      'Custom ACL Festival lanyard included',
      'Full Friday GA festival access',
      'All 9 live music stages, food, bars & merch',
      'Children 8 & under free (limit 2 per adult)',
    ],
  },
  {
    id: 'acl-saturday-collectible',
    name: 'Collectible Credential + Saturday GA',
    day: 'Saturday, Oct 3',
    description: 'Saturday GA + a 3D Collectible Credential keepsake and custom ACL Festival lanyard.',
    price: 184,
    features: [
      '3D Collectible Credential (keepsake — not for entry)',
      'Custom ACL Festival lanyard included',
      'Full Saturday GA festival access',
      'All 9 live music stages, food, bars & merch',
      'Children 8 & under free (limit 2 per adult)',
    ],
  },
  {
    id: 'acl-sunday-collectible',
    name: 'Collectible Credential + Sunday GA',
    day: 'Sunday, Oct 4',
    description: 'Sunday GA + a 3D Collectible Credential keepsake and custom ACL Festival lanyard.',
    price: 184,
    features: [
      '3D Collectible Credential (keepsake — not for entry)',
      'Custom ACL Festival lanyard included',
      'Full Sunday GA festival access',
      'All 9 live music stages, food, bars & merch',
      'Children 8 & under free (limit 2 per adult)',
    ],
  },
];

type TicketOption = (typeof ticketOptions)[0];

export default function ACLFestPage() {
  const event = getACLFestEvent();
  const [selectedTicket, setSelectedTicket] = useState<TicketOption>(ticketOptions[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#1a2214] text-white">

      {/* ── HERO — Header image banner, exactly like the FrontGate page ── */}
      <div className="relative w-full overflow-hidden">
        {/* Full-width banner image */}
        <div className="relative w-full h-[220px] sm:h-[280px] md:h-[340px]">
          <Image
            src="/acl-fest/header.png"
            alt="ACL Festival Weekend One"
            fill
            priority
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a2214]/20 to-[#1a2214]" />
        </div>

        {/* Event title band — mirrors the FrontGate "Event Detail" style */}
        <div className="bg-[#4B6E3C] px-4 py-3 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c8dbb8]">Event Detail</p>
        </div>
      </div>

      {/* ── EVENT INFO STRIP — date / venue row ── */}
      <div className="bg-[#111a0d] border-b border-[#4B6E3C]/30 px-4 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-start gap-6">

          {/* Thumbnail */}
          <div className="shrink-0 w-32 h-32 rounded-2xl overflow-hidden border border-[#4B6E3C]/30 hidden md:block">
            <Image
              src="/acl-fest/event-thumb.jpg"
              alt="ACL Fest"
              width={128}
              height={128}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Title + meta */}
          <div className="flex-1">
            <div className="inline-block mb-2 px-3 py-0.5 text-xs font-bold uppercase tracking-widest text-[#7cb87a] bg-[#4B6E3C]/20 rounded-full border border-[#4B6E3C]/30">
              All Ages
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-white leading-tight mb-3">
              1-Day General Admission Ticket<br />
              <span className="text-[#7cb87a]">2026 ACL Festival Weekend One</span>
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 text-sm text-[#a0b890]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#4B6E3C]" />
                <span>Zilker Park · Austin, TX</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#4B6E3C]" />
                <span>Friday, October 2 – Sunday, October 4, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <Music className="w-4 h-4 text-[#4B6E3C]" />
                <span>Show at 12:00 PM CDT</span>
              </div>
            </div>
          </div>

          {/* Quick buy CTA */}
          <div className="md:text-right shrink-0">
            <div className="text-xs text-[#6b8f5e] uppercase tracking-widest mb-1">Starting from</div>
            <div className="text-3xl font-black text-white mb-3">$170.00</div>
            <button
              onClick={() => { setSelectedTicket(ticketOptions[0]); setIsModalOpen(true); }}
              className="bg-[#4B6E3C] hover:bg-[#3a5830] text-white px-8 py-3 rounded-full font-bold text-sm uppercase tracking-widest transition-all hover:-translate-y-0.5 shadow-lg"
            >
              Select Tickets
            </button>
          </div>
        </div>
      </div>

      {/* ── DESCRIPTION — mirrors the FrontGate event description block ── */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-[1fr_360px] gap-10 items-start">

          {/* Left: description + ticket grid */}
          <div>
            {/* Description box */}
            <div className="bg-[#111a0d] border border-[#4B6E3C]/30 rounded-3xl p-8 mb-10">
              <h2 className="text-xl font-black text-white mb-4 uppercase tracking-tight">About this ticket</h2>
              <div className="text-[#a0b890] space-y-4 leading-relaxed">
                <p>
                  <strong className="text-white">The Weekend One, 1-Day General Admission Ticket</strong> allows admittance to Zilker Park for Friday, Saturday or Sunday of the festival. <strong className="text-[#7cb87a] underline">You must select the day you want to attend below.</strong> Your ticket includes access to:
                </p>
                <ul className="space-y-2 ml-4">
                  {[
                    'Live music on 9 stages in Austin\'s Zilker Park',
                    'Food choices for purchase from local chefs and restaurants including vegan, vegetarian & gluten-free options',
                    'Bars, concessions, official band merch, festival merch, free water stations and specialty items from art vendors throughout the festival grounds',
                    'Bars throughout Zilker Park will feature cocktails and mixed drinks in addition to beer, wine, seltzers and mocktails',
                    'Children 8 and under are allowed in General Admission for free, which includes access to Austin Kiddie Limits*',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-[#4B6E3C] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[#6b8f5e] text-sm italic">
                  *Kids Policy: Children 8 and under are free and must be accompanied by a ticketed adult. Limit two children per ticketed adult.
                </p>
                <p className="text-[#7cb87a] text-sm italic">
                  A portion of your purchase goes to Austin Parks Foundation, benefitting 300+ public parks, trails, and green spaces!
                </p>
                <p className="text-[#6b8f5e] text-xs italic">
                  Festival performers are subject to change or cancelation at any time without notice. No refund will be owed if a festival performer is changed or canceled. Prices subject to change without notice.
                </p>
              </div>
            </div>

            {/* ── TICKET SECTION HEADER ── */}
            <div className="bg-[#4B6E3C] rounded-t-2xl px-6 py-3 grid grid-cols-[1fr_auto_auto] gap-4 text-xs font-bold uppercase tracking-widest text-white">
              <span>Ticket</span>
              <span className="text-right pr-6">Price</span>
              <span className="text-right">Quantity</span>
            </div>

            {/* ── TICKET ROWS ── */}
            <div className="border border-[#4B6E3C]/30 border-t-0 rounded-b-2xl overflow-hidden divide-y divide-[#4B6E3C]/20">
              {ticketOptions.map((ticket) => (
                <div
                  key={ticket.id}
                  className={`relative bg-[#111a0d] transition-all ${selectedTicket.id === ticket.id ? 'bg-[#1d2e16]' : 'hover:bg-[#162012]'}`}
                >
                  <AvailabilityBadge ticketId={ticket.id} className="top-4 right-4" />
                  <div className="grid grid-cols-[1fr_auto_auto] gap-4 px-6 py-5 items-start">
                    {/* Name + description */}
                    <div>
                      <div className="font-bold text-white text-sm mb-1">{ticket.name}</div>
                      <div className="text-xs text-[#4B6E3C] font-semibold mb-1">{ticket.day}</div>
                      <div className="text-xs text-[#6b8f5e] leading-relaxed max-w-md">{ticket.description}</div>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <span className="text-white font-black text-lg">${ticket.price.toFixed(2)}</span>
                    </div>

                    {/* Buy button */}
                    <div className="text-right">
                      <button
                        onClick={() => { setSelectedTicket(ticket); setIsModalOpen(true); }}
                        className="bg-[#4B6E3C] hover:bg-[#3a5830] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all hover:-translate-y-0.5"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: sticky sidebar — quick buy + event facts */}
          <aside className="space-y-6 lg:sticky lg:top-6">
            {/* Selected ticket box */}
            <div className="bg-[#111a0d] border border-[#4B6E3C]/30 rounded-3xl p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-[#6b8f5e] mb-4">Selected Ticket</p>
              <h3 className="text-lg font-black text-white mb-1">{selectedTicket.name}</h3>
              <p className="text-xs text-[#4B6E3C] font-semibold mb-3">{selectedTicket.day}</p>
              <p className="text-sm text-[#a0b890] mb-5 leading-relaxed">{selectedTicket.description}</p>
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs text-[#6b8f5e] uppercase tracking-widest">Price</span>
                <span className="text-2xl font-black text-white">${selectedTicket.price.toFixed(2)}</span>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-[#4B6E3C] hover:bg-white hover:text-[#4B6E3C] text-white py-4 rounded-full font-black uppercase tracking-widest transition-all text-sm"
              >
                Proceed to Checkout
              </button>
            </div>

            {/* Event facts */}
            <div className="bg-[#111a0d] border border-[#4B6E3C]/30 rounded-3xl p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-[#6b8f5e] mb-4">Event Facts</p>
              <ul className="space-y-3 text-sm text-[#a0b890]">
                <li className="flex items-start gap-3">
                  <Music className="w-4 h-4 text-[#4B6E3C] mt-0.5 shrink-0" />
                  <span>9 stages across Zilker Park</span>
                </li>
                <li className="flex items-start gap-3">
                  <Users className="w-4 h-4 text-[#4B6E3C] mt-0.5 shrink-0" />
                  <span>All Ages · Kids 8 & under free</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#4B6E3C] mt-0.5 shrink-0" />
                  <span>2100 Barton Springs Rd, Austin, TX 78746</span>
                </li>
                <li className="flex items-start gap-3">
                  <Leaf className="w-4 h-4 text-[#4B6E3C] mt-0.5 shrink-0" />
                  <span>Proceeds support Austin Parks Foundation</span>
                </li>
                <li className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-[#4B6E3C] mt-0.5 shrink-0" />
                  <span>Oct 2–4, 2026 · Doors 12:00 PM CDT</span>
                </li>
              </ul>
            </div>

            {/* Trust badge */}
            <div className="bg-[#0f1a0c] border border-[#4B6E3C]/20 rounded-3xl p-5 text-center">
              <div className="text-2xl mb-2">🔒</div>
              <p className="text-xs text-[#6b8f5e] leading-relaxed">
                Secure checkout powered by VibePass & Flutterwave. Your ticket confirmation will be sent via email immediately after purchase.
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* ── FOOTER BAR — mirrors FrontGate's bottom trust strip ── */}
      <div className="border-t border-[#4B6E3C]/30 bg-[#0f1a0c] px-4 py-8 mt-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#4a5e40]">
          <span>© 2026 ACL Festival Weekend One · Zilker Park, Austin TX · Powered by VibePass</span>
          <span>Organizer: C3 Presents · All Ages · Prices include service fees</span>
        </div>
      </div>

      {isModalOpen && (
        <ACLFestCheckoutModal
          item={selectedTicket}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
