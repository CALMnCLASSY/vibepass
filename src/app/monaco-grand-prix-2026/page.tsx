'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Calendar, MapPin, Info, Sparkles } from 'lucide-react';
import { getMonacoGrandPrixEvent } from '@/data/events';
import { MonacoCheckoutModal } from '@/components/MonacoCheckoutModal';
import { AvailabilityBadge } from '@/components/AvailabilityBadge';

const ticketOptions = [
  {
    id: 'trackside-experience',
    name: 'Trackside Experience',
    description: 'Premium access with allocated seating, hospitality service, and a front-row view of the St Devote corner.',
    price: 520,
    features: [
      'Allocated seating near the harbour chicane',
      'Bar service with selected drinks',
      'Food and refreshments included',
      'Live big-screen race coverage & exclusive lounge access',
    ],
  },
  {
    id: 'grandstand-l',
    name: 'Grandstand L',
    description: 'Reserve your spot at the famous Swimming Pool section with dramatic views of Monaco’s most iconic turn.',
    price: 238,
    features: [
      'Reserved seating at the Piscine chicane',
      'Views of the pit lane and Princely Palace',
      'Access to dedicated big screens',
      'Perfect for action-packed racing moments',
    ],
  },
  {
    id: 'grandstand-o',
    name: 'Grandstand O',
    description: 'Spectacular harbourside seats with an unobstructed view of the T-Quai and high-speed entry to the chicane.',
    price: 238,
    features: [
      'Prime location on the T-Quai docks',
      'Excellent view of the Piscine section',
      'A premium experience with exclusive access',
    ],
  },
  {
    id: 'grandstand-a1',
    name: 'Grandstand A1',
    description: 'Take in the opening corner from an unbeatable location beside the first turn of the Monaco street circuit.',
    price: 198,
    features: [
      'Reserved seating at Turn 1',
      'Ideal for race starts and dramatic overtakes',
      'Bright views of the principality and harbour',
    ],
  },
];

type TicketOption = (typeof ticketOptions)[0];

export default function MonacoGrandPrixPage() {
  const event = getMonacoGrandPrixEvent();
  const [selectedTicket, setSelectedTicket] = useState<TicketOption>(ticketOptions[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="relative w-full h-[70vh] overflow-hidden">
        <div className="absolute inset-0 bg-slate-950/75" />
        <Image
          src={event.image_url}
          alt={event.name}
          fill
          priority
          className="object-cover"
        />
        <div className="relative z-20 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 py-10 sm:px-8 lg:px-12">
          <div className="max-w-3xl space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-500/40 bg-slate-900/80 px-4 py-2 text-xs uppercase tracking-[0.24em] text-slate-300">
              <Sparkles className="h-4 w-4 text-amber-300" /> Premium Racing Experience
            </span>
            <h1 className="text-5xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              {event.name}
            </h1>
            <p className="text-lg leading-8 text-slate-300 sm:text-xl">
              {event.description}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-700/80 bg-slate-900/90 p-5">
                <div className="flex items-center gap-3 text-slate-300 mb-3">
                  <Calendar className="h-5 w-5 text-amber-400" />
                  <span className="text-sm uppercase tracking-[0.2em]">Date & Time</span>
                </div>
                <p className="text-xl font-semibold text-white">
                  {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
                <p className="mt-1 text-slate-400">{new Date(event.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
              <div className="rounded-3xl border border-slate-700/80 bg-slate-900/90 p-5">
                <div className="flex items-center gap-3 text-slate-300 mb-3">
                  <MapPin className="h-5 w-5 text-cyan-400" />
                  <span className="text-sm uppercase tracking-[0.2em]">Location</span>
                </div>
                <p className="text-xl font-semibold text-white">{event.location}</p>
                <p className="mt-1 text-slate-400">Monte Carlo, Monaco</p>
              </div>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center rounded-full bg-rose-500 px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:bg-rose-400"
              >
                Book tickets now
              </button>
              <div className="rounded-full border border-slate-700/80 bg-slate-900/90 px-5 py-4 text-sm text-slate-300">
                Starting at <span className="font-black text-white">${ticketOptions[0].price}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
          <section className="space-y-12">
            <div className="rounded-[2rem] border border-slate-800 bg-slate-900/95 p-10 shadow-2xl shadow-slate-950/30">
              <div className="flex items-center gap-3 text-slate-400 mb-6">
                <Info className="h-5 w-5 text-cyan-400" />
                <span className="uppercase tracking-[0.24em] text-xs text-slate-500">About the circuit</span>
              </div>
              <h2 className="text-4xl font-black text-white">Monaco Grand Prix native ticket shop</h2>
              <p className="mt-6 text-slate-300 leading-relaxed">
                Experience Monaco Grand Prix 2026 inside VibePass. Book your grandstand tickets with premium access, compare trackside experiences, and secure your spot for the worlds most iconic street race.
              </p>
              <p className="mt-6 text-slate-400 leading-relaxed">
                The Monaco street circuit is a legendary test of precision: from Sainte-Dévote to Rascasse, each corner is steeped in history, glamour and race-winning drama. Enjoy official-style ticket packages without leaving the VibePass experience.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {ticketOptions.map((ticket) => (
                <button
                  key={ticket.id}
                  type="button"
                  onClick={() => {
                    setSelectedTicket(ticket);
                    setIsModalOpen(true);
                  }}
                  className={`rounded-[2rem] border p-8 text-left transition-all relative ${selectedTicket.id === ticket.id ? 'border-rose-500 bg-rose-500/10 shadow-2xl shadow-rose-500/10' : 'border-slate-800 bg-slate-900/90 hover:border-rose-500 hover:bg-slate-900/80'}`}
                >
                  <AvailabilityBadge ticketId={ticket.id} className="top-4 right-4" />
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-black text-white">{ticket.name}</h3>
                      <p className="mt-3 text-slate-400 text-sm leading-relaxed">{ticket.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-black text-white">${ticket.price}</p>
                      <span className="text-slate-500 text-xs uppercase tracking-[0.24em]">per person</span>
                    </div>
                  </div>
                  <div className="space-y-3 text-slate-400 text-sm">
                    {ticket.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-rose-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </section>

          <aside className="space-y-8">
            <div className="rounded-[2rem] border border-slate-800 bg-slate-900/95 p-8">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500 font-semibold mb-4">Event details</p>
              <div className="space-y-4 text-slate-300">
                <div className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
                  <h3 className="text-lg font-bold text-white">Event overview</h3>
                  <p className="mt-3 text-slate-400 leading-relaxed">
                    {event.long_description}
                  </p>
                </div>
                <div className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
                  <h3 className="text-lg font-bold text-white">Why book here?</h3>
                  <ul className="mt-4 space-y-3 text-slate-400 text-sm leading-relaxed">
                    <li>Internal VibePass checkout experience</li>
                    <li>Streamlined event booking without external navigation</li>
                    <li>Premium and grandstand ticket packages in one place</li>
                    <li>Instant email confirmation and ticket management</li>
                  </ul>
                </div>
                <div className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
                  <h3 className="text-lg font-bold text-white">Quick facts</h3>
                  <ul className="mt-4 space-y-3 text-slate-400 text-sm leading-relaxed">
                    <li>Official 2026 Monaco Grand Prix event</li>
                    <li>Historic street circuit through Monte Carlo</li>
                    <li>Available premium grandstand and hospitality seats</li>
                    <li>Secure checkout via Flutterwave + email confirmation</li>
                  </ul>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {isModalOpen && (
        <MonacoCheckoutModal item={selectedTicket} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
