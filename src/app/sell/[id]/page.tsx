'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Tag, CheckCircle, Loader2, Calendar, MapPin, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { getMatchById } from '@/data/worldcup';
import { supabase } from '@/lib/supabase';

const TICKET_CATEGORIES = [
  'General Admission',
  'Standard Seating',
  'Premium Seating',
  'VIP / Hospitality',
  'Pitchside / Courtside',
  'Private Suite',
  'Other',
];

export default function SellTicketPage() {
  const params = useParams();
  const eventId = params.id as string;

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    ticketCategory: '',
    numberOfTickets: '1',
    askingPrice: '',
    notes: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [eventName, setEventName] = useState<string>('Your Tickets');
  const [categories, setCategories] = useState<string[]>(TICKET_CATEGORIES);

  useEffect(() => {
    async function loadEvent() {
      if (!eventId) return;

      // 1. Check if hardcoded Afronation
      if (eventId === 'afronation-portugal-2026') {
        setEventName('Afro Nation Portugal 2026');
        setCategories([
          '2026 General Admission Ticket',
          '2026 VIP Ticket',
          '2026 Golden Ticket'
        ]);
        return;
      }

      // 2. Check if Tomorrowland Belgium
      if (eventId === 'tomorrowland-belgium-2026') {
        setEventName('Tomorrowland Belgium 2026');
        setCategories([
          'Regular Day Pass',
          'Pleasure Day Pass',
          'Comfort Day Pass'
        ]);
        return;
      }

      // 3. Check if World Cup Match
      if (eventId.startsWith('m')) {
        const match = getMatchById(eventId);
        if (match) {
          setEventName(`FIFA World Cup 2026™: ${match.home_team} vs ${match.away_team}`);
        } else {
          setEventName('FIFA World Cup 2026 Match');
        }
        setCategories([
          'Standard Match Ticket',
          'Premium Seating',
          'Pitchside Lounge',
          'Trophy Lounge'
        ]);
        return;
      }

      // 3. Check if World Cup Hospitality
      if (eventId.includes('package') || eventId.includes('series') || eventId.includes('pass') || eventId === 'world-cup-2026') {
        setEventName('FIFA World Cup 2026™ Hospitality');
        setCategories([
          'Venue Series',
          'Group Stage Pass',
          'Knockout Package'
        ]);
        return;
      }

      // 4. Standard Event from Supabase
      try {
        const { data, error } = await supabase
          .from('events')
          .select('name')
          .eq('id', eventId)
          .single();
        if (data && !error) {
          setEventName(data.name);
        }
      } catch (err) {
        console.error('Error fetching event details for sell page:', err);
      }
      setCategories([
        'General Admission',
        'Standard Seating',
        'Premium Seating',
        'VIP / Hospitality',
        'Other'
      ]);
    }

    loadEvent();
  }, [eventId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/sell', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, eventId }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-lg w-full bg-white rounded-3xl shadow-xl p-12 text-center glass-card">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">You&apos;re All Set!</h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-8">
            Your listing inquiry has been received! We will reach out to you via email within 24 hours
            with instructions on how to verify and transfer your tickets.
          </p>
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 mb-8">
            <p className="text-emerald-700 text-sm font-medium">
              📧 Confirmation sent to <strong>{form.email}</strong>
            </p>
          </div>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-slate-900 to-emerald-900 pt-10 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Events
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-sm font-semibold mb-4">
            <Tag className="w-4 h-4" /> Sell Your Tickets
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            List Your Tickets for {eventName}
          </h1>
          <p className="text-slate-300 text-lg max-w-xl">
            Have original tickets you can&apos;t use? List them on VibePass and we&apos;ll connect you with verified buyers. No hassle, just vibes.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-4 -mt-8">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 glass-card">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            Your Ticket Details
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold text-slate-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-slate-900"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-slate-900"
                />
              </div>
            </div>

            {/* Ticket Category */}
            <div>
              <label htmlFor="ticketCategory" className="block text-sm font-semibold text-slate-700 mb-2">
                Ticket Category <span className="text-red-500">*</span>
              </label>
              <select
                id="ticketCategory"
                name="ticketCategory"
                required
                value={form.ticketCategory}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-slate-900 bg-white"
              >
                <option value="" disabled>Select a ticket category…</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Quantity + Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="numberOfTickets" className="block text-sm font-semibold text-slate-700 mb-2">
                  Number of Tickets <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="numberOfTickets"
                  name="numberOfTickets"
                  required
                  min="1"
                  max="20"
                  value={form.numberOfTickets}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-slate-900"
                />
              </div>
              <div>
                <label htmlFor="askingPrice" className="block text-sm font-semibold text-slate-700 mb-2">
                  Asking Price (per ticket, USD) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-4 flex items-center text-slate-400 font-semibold">$</span>
                  <input
                    type="number"
                    id="askingPrice"
                    name="askingPrice"
                    required
                    min="1"
                    value={form.askingPrice}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-slate-900"
                  />
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="notes" className="block text-sm font-semibold text-slate-700 mb-2">
                Additional Notes <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                value={form.notes}
                onChange={handleChange}
                placeholder="Any other details about your tickets (seat numbers, section, etc.)…"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-slate-900 resize-none"
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-emerald-500/30 transition-all hover:-translate-y-1 flex justify-center items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Submitting…</>
              ) : (
                <><Tag className="w-5 h-5" /> Submit Listing Request</>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-slate-400 mt-6">
            By submitting, you agree to our{' '}
            <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>.
            We&apos;ll verify your tickets before listing.
          </p>
        </div>
      </div>
    </div>
  );
}
