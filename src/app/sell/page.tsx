'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Tag, CheckCircle, Loader2, ArrowRight, ShieldCheck, DollarSign, Users, Sparkles, AlertCircle } from 'lucide-react';

const FEATURED_SELL_EVENTS = [
  {
    id: 'corona-capital-2026',
    name: 'Corona Capital CDMX 2026',
    date: 'Nov 15–17, 2026',
    location: 'Mexico City, MX',
    image: '/corona-capital/logo-corona-capital.webp',
    badge: 'Trending CDMX',
    badgeColor: 'bg-amber-400 text-slate-950',
  },
  {
    id: 'edc-orlando-2026',
    name: '2026 EDC Orlando',
    date: 'Nov 6–8, 2026',
    location: 'Orlando, FL',
    image: '/edc-orlando/header.png',
    badge: 'High Demand',
    badgeColor: 'bg-purple-600',
  },
  {
    id: 'tomorrowland-belgium-2026',
    name: 'Tomorrowland Belgium 2026',
    date: 'Jul 17–26, 2026',
    location: 'Boom, Belgium',
    image: '/tomorrowland/250725-183050-tlbe25-sl.webp',
    badge: 'Hot Seller',
    badgeColor: 'bg-amber-500 text-slate-950',
  },
  {
    id: 'afronation-portugal-2026',
    name: 'Afro Nation Portugal 2026',
    date: 'Jul 9–11, 2026',
    location: 'Portimão, Portugal',
    image: 'https://images.unsplash.com/photo-1540039155732-d6749b932507?q=80&w=2070&auto=format&fit=crop',
    badge: 'Popular',
    badgeColor: 'bg-orange-500',
  },
  {
    id: 'acl-fest-2026',
    name: '2026 ACL Music Festival',
    date: 'Oct 2–4, 2026',
    location: 'Austin, TX',
    image: '/acl-fest/header.png',
    badge: 'Top Market',
    badgeColor: 'bg-emerald-600',
  },
  {
    id: 'monaco-grand-prix-2026',
    name: 'Monaco Grand Prix 2026',
    date: 'May 24, 2026',
    location: 'Monte Carlo, Monaco',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop',
    badge: 'VIP Demand',
    badgeColor: 'bg-blue-600',
  },
  {
    id: 'world-cup-2026',
    name: 'FIFA World Cup 2026™',
    date: 'Jun 11 – Jul 19, 2026',
    location: 'USA, Canada & Mexico',
    image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=2070&auto=format&fit=crop',
    badge: 'Global Peak',
    badgeColor: 'bg-red-600',
  },
];

export default function SellHubPage() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    eventName: '2026 EDC Orlando',
    ticketCategory: 'General Admission Pass',
    numberOfTickets: '1',
    askingPrice: '',
    notes: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.askingPrice || !form.eventName) {
      setError('Please fill in all required fields.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/sell', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          ticketCategory: `${form.eventName} — ${form.ticketCategory}`,
          numberOfTickets: parseInt(form.numberOfTickets, 10),
          askingPrice: parseFloat(form.askingPrice),
          notes: form.notes,
          eventId: form.eventName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit listing request.');
      }

      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans">
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-28 overflow-hidden bg-slate-900 border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-purple-950/60 to-slate-950 z-0" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-25 mix-blend-overlay z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent z-10" />

        <div className="relative z-20 max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 font-bold text-xs uppercase tracking-widest mb-6 backdrop-blur-md">
            <Tag className="w-3.5 h-3.5 text-blue-400" /> Official VibePass Resale Marketplace
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Sell Your Festival & Event <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
              Tickets with Confidence
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-medium mb-10">
            List your spare passes to thousands of verified fans. Zero seller commission, guaranteed fast payouts, and 100% secure transfers.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl text-left backdrop-blur-md">
              <DollarSign className="w-8 h-8 text-emerald-400 mb-3" />
              <h4 className="font-bold text-white text-base">Top Dollar Payouts</h4>
              <p className="text-xs text-slate-400 mt-1">Set your own asking price and keep 100% of your earnings.</p>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl text-left backdrop-blur-md">
              <ShieldCheck className="w-8 h-8 text-blue-400 mb-3" />
              <h4 className="font-bold text-white text-base">Guaranteed Transfers</h4>
              <p className="text-xs text-slate-400 mt-1">Direct buyer matching with anti-fraud ticket verification.</p>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl text-left backdrop-blur-md">
              <Users className="w-8 h-8 text-purple-400 mb-3" />
              <h4 className="font-bold text-white text-base">Verified Fan Reach</h4>
              <p className="text-xs text-slate-400 mt-1">Instantly connect with active buyers searching for sold-out events.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Select Event Grid */}
      <section className="py-16 bg-slate-950 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              Choose Event to <span className="text-blue-400">List Your Tickets</span>
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Select your festival or sporting event below to open dedicated seller options.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_SELL_EVENTS.map(evt => (
              <Link
                key={evt.id}
                href={`/sell/${evt.id}`}
                className="group relative bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-blue-500/10 transition-all flex flex-col justify-between"
              >
                <div className="relative w-full h-40 bg-slate-950 overflow-hidden">
                  <Image
                    src={evt.image}
                    alt={evt.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${evt.badgeColor}`}>
                      {evt.badge}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {evt.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      {evt.date} • {evt.location}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-blue-400 group-hover:translate-x-1 transition-transform">
                    <span>List Tickets for This Event</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Universal Ticket Submission Form */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-extrabold text-white">Can't Find Your Event?</h3>
              <p className="text-slate-400 text-sm mt-2">
                Submit your ticket listing lead directly to our marketplace team below.
              </p>
            </div>

            {isSuccess ? (
              <div className="py-12 text-center space-y-6">
                <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white mb-2">Listing Lead Submitted!</h4>
                  <p className="text-slate-300 text-sm max-w-md mx-auto">
                    Thank you, <span className="font-bold text-white">{form.fullName}</span>! Our team has received your ticket details for <span className="font-bold text-blue-400">{form.eventName}</span>. We will review your listing and email you at <span className="font-bold text-white">{form.email}</span> shortly.
                  </p>
                </div>

                <button
                  onClick={() => setIsSuccess(false)}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-sm transition-all"
                >
                  Submit Another Ticket Listing
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.fullName}
                      onChange={e => setForm({ ...form, fullName: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Event Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.eventName}
                      onChange={e => setForm({ ...form, eventName: e.target.value })}
                      placeholder="e.g. 2026 EDC Orlando, Tomorrowland..."
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Ticket Pass Tier <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.ticketCategory}
                      onChange={e => setForm({ ...form, ticketCategory: e.target.value })}
                      placeholder="e.g. 3-Day VIP Elevated Pass"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Number of Tickets <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={form.numberOfTickets}
                      onChange={e => setForm({ ...form, numberOfTickets: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors text-sm"
                    >
                      {[1, 2, 3, 4, 5, 6, 8, 10].map(n => (
                        <option key={n} value={n}>{n} {n === 1 ? 'Ticket' : 'Tickets'}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Asking Price per Ticket ($ USD) <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={form.askingPrice}
                      onChange={e => setForm({ ...form, askingPrice: e.target.value })}
                      placeholder="e.g. 250.00"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Additional Notes / Transfer Method
                  </label>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={e => setForm({ ...form, notes: e.target.value })}
                    placeholder="Provide wristband shipping details or mobile app transfer details..."
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors text-sm resize-none"
                  />
                </div>

                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 text-base"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Submitting Ticket Lead...</span>
                    </>
                  ) : (
                    <span>Submit Ticket Listing Request</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
