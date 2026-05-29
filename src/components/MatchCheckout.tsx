'use client';

import { useState } from 'react';
import Image from 'next/image';
import { 
  Check, 
  ShieldCheck, 
  Loader2, 
  ChevronRight, 
  AlertTriangle 
} from 'lucide-react';
import { AvailabilityBadge } from './AvailabilityBadge';

type Match = {
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

type Venue = {
  id: string;
  name: string;
  city: string;
  country: string;
  capacity: number;
  image: string;
  description: string;
  matches_count: number;
};

type TicketCategory = {
  id: string;
  name: string;
  description: string;
  features: string[];
  price_range: string;
  image: string;
};

type MatchCheckoutProps = {
  match: Match;
  venue: Venue;
  categories: TicketCategory[];
};

const CATEGORY_PRICES: Record<string, number> = {
  standard: 450,
  premium: 1200,
  pitchside: 6050,
  trophy: 7800,
  champions: 3300,
  suite: 28500,
};

export function MatchCheckout({ match, venue, categories }: MatchCheckoutProps) {
  const [selectedCatId, setSelectedCatId] = useState<string>('standard');
  const [quantity, setQuantity] = useState<number>(1);
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const selectedCategory = categories.find(c => c.id === selectedCatId) || categories[0];
  const unitPrice = CATEGORY_PRICES[selectedCatId] || 150;
  const totalPrice = unitPrice * quantity;

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    setIsLoading(true);
    setError(null);

    const matchName = `FIFA World Cup 2026™: ${match.home_team} vs ${match.away_team} (Match ${match.match_number})`;

    try {
      // 1. Notify Discord of Purchase Attempt
      await fetch('/api/notifications/discord', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'inquiry',
          content: '🛒 **World Cup Checkout Attempt Initiated**',
          embeds: [{
            title: 'World Cup Match Seating Checkout Started',
            fields: [
              { name: 'Match Name', value: matchName, inline: false },
              { name: 'Selected Seating', value: selectedCategory.name, inline: true },
              { name: 'Price Per Ticket', value: `$${unitPrice.toLocaleString()}`, inline: true },
              { name: 'Quantity', value: quantity.toString(), inline: true },
              { name: 'Total Amount', value: `$${totalPrice.toLocaleString()}`, inline: true },
              { name: 'Buyer Email', value: email, inline: true },
              { name: 'Venue', value: `${venue.name}, ${venue.city}`, inline: true },
            ],
            color: 0x3b82f6, // Blue
          }]
        }),
      });

      // 2. Initialize Paystack Setup
      const handler = (window as any).PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
        email: email,
        amount: totalPrice * 100, // Paystack expects amount in kobo/cents
        currency: 'USD',
        callback: function(response: any) {
          const processPayment = async () => {
            // 3. Notify Discord of Payment Success
            await fetch('/api/notifications/discord', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                type: 'payment',
                content: '✅ **World Cup Payment Successful**',
                embeds: [{
                  title: 'World Cup Seating Transaction Completed',
                  fields: [
                    { name: 'Match Name', value: matchName, inline: false },
                    { name: 'User Email', value: email, inline: true },
                    { name: 'Seating Category', value: selectedCategory.name, inline: true },
                    { name: 'Quantity Purchased', value: quantity.toString(), inline: true },
                    { name: 'Amount Paid', value: `$${totalPrice.toLocaleString()}`, inline: true },
                    { name: 'Paystack Reference', value: response.reference, inline: true },
                  ],
                  color: 0x10b981, // Emerald
                }]
              }),
            });

            // 4. Finalize Checkout in Backend
            const res = await fetch('/api/checkout', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                eventId: match.id, 
                email, 
                quantity, 
                categoryName: selectedCategory.name,
                price: unitPrice,
                reference: response.reference 
              }),
            });

            if (!res.ok) {
              const data = await res.json();
              throw new Error(data.error || 'Failed to process and save World Cup ticket');
            }

            setIsSuccess(true);
          };
          processPayment();
        },
        onClose: () => {
          setIsLoading(false);
          setError('Payment window closed. Please try again.');
        },
      });

      handler.openIframe();
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during checkout.');
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="glass-card bg-white p-8 md:p-12 rounded-3xl text-center max-w-2xl mx-auto shadow-xl border border-emerald-100">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="w-10 h-10" />
        </div>
        <h3 className="text-3xl font-extrabold text-slate-900 mb-4">Purchase Successful!</h3>
        <p className="text-slate-600 text-lg mb-8">
          We have successfully confirmed your seating reservation for <strong>{selectedCategory.name}</strong>.
          An email with your digital Ticket ID and attendance instructions has been sent to <strong>{email}</strong>.
        </p>
        <button 
          onClick={() => { setIsSuccess(false); setEmail(''); setQuantity(1); }}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
        >
          Book More Tickets
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      {/* Seating Categories Selector */}
      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat) => {
            const price = CATEGORY_PRICES[cat.id] || 150;
            const isSelected = selectedCatId === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCatId(cat.id);
                  setError(null);
                }}
                className={`glass-card bg-white rounded-2xl overflow-hidden flex flex-col text-left group transition-all duration-300 border-2 ${
                  isSelected ? 'border-blue-600 ring-4 ring-blue-500/10 shadow-lg' : 'border-slate-100 hover:border-slate-300'
                }`}
              >
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  <AvailabilityBadge ticketId={cat.id} variant="overlay" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-white font-extrabold text-lg bg-blue-600/90 px-3 py-1 rounded-full border border-blue-400/30">
                      ${price.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-slate-900">{cat.name}</h3>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 mb-4 flex-grow">{cat.description}</p>

                  <div className="space-y-2 mt-auto">
                    {cat.features.slice(0, 3).map((feature, i) => (
                      <div key={i} className="flex items-start text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 mr-2 text-emerald-500 mt-0.5 shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Checkout form sidebar */}
      <div className="lg:col-span-1">
        <div className="sticky top-28 glass-card bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
          <div className="border-b border-slate-100 pb-6 mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Selected Experience</span>
            <h3 className="text-xl font-bold text-slate-900 mt-1">{selectedCategory.name}</h3>
            <div className="flex items-baseline mt-4">
              <span className="text-4xl font-extrabold text-blue-600">${unitPrice.toLocaleString()}</span>
              <span className="text-sm font-medium text-slate-400 ml-2">/ ticket</span>
            </div>
          </div>

          <form onSubmit={handleCheckout} className="space-y-6">
            {/* Quantity */}
            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="font-semibold text-slate-700">Quantity</span>
              <div className="flex items-center space-x-4">
                <button 
                  type="button" 
                  onClick={decrement} 
                  className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-colors font-bold"
                >
                  -
                </button>
                <span className="font-bold text-slate-900 text-lg">{quantity}</span>
                <button 
                  type="button" 
                  onClick={increment} 
                  className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-colors font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Guest Email Address
              </label>
              <input 
                type="email" 
                id="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-slate-900"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                {error}
              </div>
            )}

            {/* Price breakdown */}
            <div className="flex justify-between items-center text-slate-600 font-medium pt-2 border-t border-slate-100">
              <span>Total ({quantity}x)</span>
              <span className="text-xl font-extrabold text-slate-900">${totalPrice.toLocaleString()}</span>
            </div>

            {/* Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-gradient-primary text-white py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-blue-500/40 transition-all hover:-translate-y-1 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                'Secure Seating Checkout'
              )}
            </button>
          </form>

          <div className="flex items-center justify-center text-xs text-slate-400 mt-6 pt-4 border-t border-slate-50">
            <ShieldCheck className="w-4 h-4 mr-1.5 text-green-500" />
            100% Verified Buyer Protection
          </div>
        </div>
      </div>
    </div>
  );
}
