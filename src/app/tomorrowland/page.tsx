'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Calendar, MapPin, Info } from 'lucide-react';
import { getTomorrowlandEvent } from '@/data/events';
import { TomorrowlandCheckoutModal } from '@/components/TomorrowlandCheckoutModal';
import { AvailabilityBadge } from '@/components/AvailabilityBadge';

const ticketOptions = [
  {
    id: 'regular-day-pass',
    name: 'Regular Day Pass',
    description: 'Full access to the festival grounds and all daytime stages for one day.',
    price: 138,
    features: [
      'Access to all main stages',
      'General entry to festival grounds',
      'Food court access',
      'On-site support and event staff',
    ],
  },
  {
    id: 'pleasure-day-pass',
    name: 'Pleasure Day Pass',
    description: 'Premium access with shorter lines, dedicated lounges, and enhanced comfort.',
    price: 198,
    features: [
      'Fast-track venue entry',
      'Dedicated lounge seating',
      'Exclusive beverage line',
      'Priority access to featured stages',
    ],
  },
  {
    id: 'comfort-day-pass',
    name: 'Comfort Day Pass',
    description: 'The highest level of comfort with premium amenities and VIP lounge access.',
    price: 278,
    features: [
      'VIP lounge access',
      'Premium viewing areas',
      'Complimentary refreshments',
      'Dedicated restroom facilities',
    ],
  },
];

type TicketOption = (typeof ticketOptions)[0];

export default function TomorrowlandPage() {
  const event = getTomorrowlandEvent();
  const [selectedTicket, setSelectedTicket] = useState<TicketOption>(ticketOptions[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="relative w-full h-[65vh] md:h-[75vh] overflow-hidden">
        <div className="absolute inset-0 bg-slate-950/70 z-10" />
        <Image
          src={event.image_url}
          alt={event.name}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent z-20" />
        <div className="relative z-30 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-16">
          <span className="inline-flex items-center gap-2 uppercase tracking-[0.35em] text-xs text-violet-300 font-bold mb-6">
            {event.organizer} • {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
          <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight text-white max-w-4xl">
            {event.name}
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-slate-300 leading-relaxed">
            {event.long_description}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center rounded-full bg-violet-500 px-10 py-4 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-violet-700"
            >
              Buy Tickets
            </button>
            <div className="rounded-full border border-slate-800 bg-slate-900/70 px-5 py-3 text-sm text-slate-300">
              From <span className="text-white font-bold">${event.price}</span>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
          <section className="space-y-12">
            <div className="rounded-[2rem] bg-slate-900 border border-slate-800 p-10 shadow-2xl">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4 text-slate-400">
                  <Calendar className="w-5 h-5 text-violet-400" />
                  <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-4 text-slate-400">
                  <MapPin className="w-5 h-5 text-violet-400" />
                  <span>{event.location}</span>
                </div>
              </div>

              <div className="mt-10 prose prose-invert max-w-none text-slate-300">
                <h2 className="text-3xl font-black tracking-tight text-white">About the Event</h2>
                <p>{event.description}</p>
                <p>{event.long_description}</p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {ticketOptions.map((ticket) => (
                <button
                  key={ticket.id}
                  onClick={() => {
                    setSelectedTicket(ticket);
                    setIsModalOpen(true);
                  }}
                  className={`rounded-[2rem] border p-6 text-left transition-all relative ${selectedTicket.id === ticket.id ? 'border-violet-500 bg-violet-500/10 shadow-xl' : 'border-slate-800 bg-slate-900 hover:border-violet-500 hover:bg-slate-900/80'}`}
                >
                  <AvailabilityBadge ticketId={ticket.id} className="top-4 right-4" />
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div>
                      <h3 className="text-xl font-black text-white">{ticket.name}</h3>
                      <p className="text-sm text-slate-400 mt-2">{ticket.description}</p>
                    </div>
                    <span className="text-xl font-black text-white">${ticket.price}</span>
                  </div>
                  <div className="space-y-3 text-slate-400 text-sm">
                    {ticket.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-violet-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </section>

          <aside className="space-y-8">
            <div className="rounded-[2rem] bg-slate-900 border border-slate-800 p-8">
              <p className="text-sm uppercase tracking-[0.24em] text-violet-300 font-bold mb-6">Tomorrowland Belgium 2026</p>
              <div className="space-y-5">
                <div className="rounded-3xl bg-slate-950 border border-slate-800 p-5">
                  <h3 className="text-lg font-bold text-white">Fast Facts</h3>
                  <ul className="mt-4 space-y-4 text-slate-400 text-sm">
                    <li>Immersive festival experience in Boom, Belgium</li>
                    <li>Day passes, lounge access, and VIP comfort options</li>
                    <li>World-class stages, art installations, and nightlife</li>
                    <li>Official Tomorrowland organizer: We Are One World</li>
                  </ul>
                </div>
                <div className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
                  <h3 className="text-lg font-bold text-white">Why attend?</h3>
                  <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                    Tomorrowland is the world’s premier electronic music festival. This pass gives you access to a weekend of unforgettable performances, immersive stages, and premium festival amenities.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] bg-slate-900 border border-slate-800 p-8">
              <p className="text-sm uppercase tracking-[0.24em] text-violet-300 font-bold mb-4">Selected Ticket</p>
              <div className="space-y-4">
                <div className="rounded-3xl bg-slate-950 border border-slate-800 p-5">
                  <h3 className="text-xl font-black text-white">{selectedTicket.name}</h3>
                  <p className="mt-3 text-slate-400 text-sm leading-relaxed">{selectedTicket.description}</p>
                </div>
                <div className="rounded-3xl bg-slate-950 border border-slate-800 p-5">
                  <div className="flex items-center justify-between text-slate-400 uppercase text-xs tracking-[0.2em] mb-3">
                    <span>Total</span>
                    <span className="text-white font-black">${selectedTicket.price}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="w-full rounded-full bg-violet-500 px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-white hover:bg-white hover:text-violet-700 transition"
                  >
                    Purchase now
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {isModalOpen && (
        <TomorrowlandCheckoutModal
          item={selectedTicket}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
