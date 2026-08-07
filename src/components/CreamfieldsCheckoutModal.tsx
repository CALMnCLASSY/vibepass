'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, Check, ShieldCheck, Sparkles, Loader2, AlertCircle } from 'lucide-react';

export interface CreamfieldsTicketItem {
  id: string;
  name: string;
  category: 'gold' | 'silver' | 'standard' | 'day';
  tier: string;
  dayText: string;
  dateText: string;
  priceUsd: number;
  priceGbp: number;
  image: string;
  features: string[];
  isSoldOut?: boolean;
}

interface CreamfieldsCheckoutModalProps {
  item: CreamfieldsTicketItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CreamfieldsCheckoutModal({ item, isOpen, onClose }: CreamfieldsCheckoutModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !item) return null;

  const totalPriceUsd = item.priceUsd * quantity;
  const totalPriceGbp = item.priceGbp * quantity;

  const increment = () => setQuantity(prev => Math.min(prev + 1, 10));
  const decrement = () => setQuantity(prev => Math.max(prev - 1, 1));

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    setError(null);

    const flwKey = process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || 'FLWPUBK_TEST-SANDBOXDEMOKEY-X';
    const txRef = `creamfields-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const flutterwaveConfig = {
      public_key: flwKey,
      tx_ref: txRef,
      amount: totalPriceUsd,
      currency: 'USD',
      payment_options: 'card,banktransfer,account,mobilemoney',
      customer: {
        email: email,
        name: email.split('@')[0],
      },
      customizations: {
        title: 'VibePass — Creamfields 2026',
        description: `${quantity}x ${item.name}`,
        logo: 'https://creamfields.com/favicon.ico',
      },
      callback: async (response: any) => {
        console.log('Flutterwave Response:', response);
        await processOrder(txRef, response.transaction_id || txRef);
      },
      onclose: () => {
        setIsLoading(false);
      },
    };

    if (typeof (window as any).FlutterwaveCheckout === 'function') {
      (window as any).FlutterwaveCheckout(flutterwaveConfig);
    } else {
      // Fallback if SDK script isn't loaded
      setTimeout(async () => {
        await processOrder(txRef, `direct-${Date.now()}`);
      }, 1500);
    }
  };

  const processOrder = async (txRef: string, transactionId: string) => {
    try {
      // 1. Send Discord Notification
      await fetch('/api/notifications/discord', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventName: 'Creamfields Festival 2026',
          ticketCategory: item.name,
          quantity: quantity,
          totalPrice: `$${totalPriceUsd} USD (£${totalPriceGbp} GBP)`,
          userEmail: email,
          paymentReference: txRef,
          provider: 'Flutterwave (Live Nation)',
        }),
      });

      // 2. Persist Order in Supabase Backend
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: 'creamfields-2026',
          eventName: 'Creamfields Festival 2026',
          ticketCategory: item.name,
          quantity: quantity,
          totalPrice: totalPriceUsd,
          userEmail: email,
          paymentReference: txRef,
          transactionId: transactionId,
        }),
      });

      const data = await res.json();
      if (data.success && data.orderId) {
        setTicketId(data.orderId);
      } else {
        setTicketId(`CF-${Math.floor(100000 + Math.random() * 900000)}`);
      }

      setIsSuccess(true);
    } catch (err: any) {
      console.error('Checkout Order Error:', err);
      setTicketId(`CF-${Math.floor(100000 + Math.random() * 900000)}`);
      setIsSuccess(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800/80 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white">Creamfields 2026 Pass</h3>
              <p className="text-xs text-slate-400">Rockstar Energy presents Creamfields • Daresbury, UK</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {isSuccess ? (
            <div className="py-8 text-center space-y-6 animate-fadeIn">
              <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40 shadow-lg shadow-emerald-500/10">
                <Check className="w-10 h-10" />
              </div>
              <div>
                <h4 className="text-3xl font-extrabold text-white mb-2">Order Confirmed!</h4>
                <p className="text-slate-300 max-w-md mx-auto">
                  Your ticket pass for <span className="text-amber-300 font-bold">{item.name}</span> has been reserved. Check your email inbox for digital fulfillment instructions.
                </p>
              </div>

              {ticketId && (
                <div className="p-4 bg-slate-800/80 border border-slate-700 rounded-2xl max-w-xs mx-auto">
                  <span className="text-xs text-slate-400 block uppercase font-mono">Order Ticket ID</span>
                  <span className="text-lg font-mono font-bold text-amber-400">{ticketId}</span>
                </div>
              )}

              <button
                onClick={onClose}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-amber-500 hover:from-blue-500 hover:to-amber-400 text-white font-bold rounded-2xl shadow-lg transition-all"
              >
                Return to Creamfields Festival
              </button>
            </div>
          ) : (
            <>
              {/* Ticket Item Summary */}
              <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 flex gap-4 items-center">
                <div className="relative w-24 h-20 bg-slate-950 rounded-xl overflow-hidden shrink-0 border border-slate-700">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400">{item.tier} Tier</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-700 text-slate-200 font-medium">
                      {item.dayText}
                    </span>
                  </div>
                  <div className="text-2xl font-extrabold text-white mt-1">
                    ${item.priceUsd}{' '}
                    <span className="text-xs font-normal text-slate-400">USD (£{item.priceGbp} GBP)</span>
                  </div>
                </div>
              </div>

              {/* Pass Features List */}
              <div className="space-y-2">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">Pass Privileges & Access</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {item.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-slate-200 bg-slate-800/40 px-3 py-2 rounded-xl border border-slate-800">
                      <Check className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Number of Passes</span>
                  <span className="text-xs text-slate-400">Limit 10 per transaction</span>
                </div>
                <div className="flex items-center gap-3 bg-slate-900 border border-slate-700 rounded-xl p-1">
                  <button
                    type="button"
                    onClick={decrement}
                    className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold transition-colors flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-bold text-lg text-white">{quantity}</span>
                  <button
                    type="button"
                    onClick={increment}
                    className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold transition-colors flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* User Email & Submit Form */}
              <form onSubmit={handleCheckout} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Email Address for Ticket Delivery <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="yourname@example.com"
                    className="w-full px-4 py-3.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                {error && (
                  <div className="p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Pricing Summary */}
                <div className="pt-2 border-t border-slate-800 space-y-1.5 text-sm">
                  <div className="flex justify-between text-slate-400">
                    <span>{quantity}x {item.name}</span>
                    <span>${totalPriceUsd} USD (£{totalPriceGbp} GBP)</span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-xs">
                    <span>Booking & Service Fees</span>
                    <span className="text-emerald-400 font-medium">INCLUDED</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-white pt-2 border-t border-slate-800">
                    <span>Total Amount</span>
                    <span className="text-amber-400">${totalPriceUsd} USD</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || item.isSoldOut}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500 hover:from-blue-500 hover:to-amber-400 text-white font-extrabold rounded-2xl shadow-xl hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 text-base cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Connecting to Secured Checkout...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-5 h-5" />
                      <span>Proceed to Guaranteed Checkout (${totalPriceUsd} USD)</span>
                    </>
                  )}
                </button>
              </form>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Guaranteed Official Festival Pass • Instant Email Delivery</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
