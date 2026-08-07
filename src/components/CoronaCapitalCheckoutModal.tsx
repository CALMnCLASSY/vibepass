'use client';

import { useState } from 'react';
import { X, Check, ShieldCheck, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import Image from 'next/image';

export type CoronaTicketItem = {
  id: string;
  name: string;
  category: '3day' | 'friday' | 'saturday' | 'sunday';
  tier: 'General' | 'Comfort' | 'VIP' | 'Club';
  dayText: string;
  dateText: string;
  priceUsd: number;
  priceMxn: string;
  image: string;
  isSoldOut?: boolean;
  features: string[];
};

type CoronaCapitalCheckoutModalProps = {
  item: CoronaTicketItem | null;
  onClose: () => void;
};

export function CoronaCapitalCheckoutModal({ item, onClose }: CoronaCapitalCheckoutModalProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [ticketId, setTicketId] = useState<string>('');

  if (!item) return null;

  const totalPriceUsd = item.priceUsd * quantity;

  const increment = () => setQuantity(prev => (prev < 10 ? prev + 1 : prev));
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address to proceed.');
      return;
    }

    if (item.isSoldOut) {
      setError('This ticket option is currently sold out.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // 1. Send Discord notification attempt
      await fetch('/api/notifications/discord', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'inquiry',
          content: '🇲🇽 **Corona Capital CDMX 2026 Ticket Checkout Attempt**',
          embeds: [
            {
              title: `Checkout Initiated: ${item.name}`,
              description: `**Pass:** ${item.name}\n**Day/Date:** ${item.dayText} (${item.dateText})\n**Official Price:** ${item.priceMxn} MXN (~$${item.priceUsd} USD)`,
              fields: [
                { name: 'Ticket Pass', value: item.name, inline: true },
                { name: 'Price per Pass', value: `$${item.priceUsd.toFixed(2)} USD`, inline: true },
                { name: 'Quantity', value: quantity.toString(), inline: true },
                { name: 'Total Amount', value: `$${totalPriceUsd.toFixed(2)} USD`, inline: true },
                { name: 'Buyer Email', value: email, inline: true },
              ],
              color: 0x002356, // Corona Blue
            },
          ],
        }),
      });

      // 2. Trigger Flutterwave Payment Modal
      (window as any).FlutterwaveCheckout({
        public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || 'FLWPUBK-2e4373dda23b34dd487aa3e6b2444c3f-X',
        tx_ref: `tx-[#cc]-${Date.now()}`,
        amount: totalPriceUsd,
        currency: 'USD',
        customer: {
          email,
        },
        customizations: {
          title: 'Corona Capital CDMX 2026 Checkout',
          description: `Payment for ${quantity}x ${item.name}`,
          logo: 'https://coronacapital.com.mx/_next/image?url=%2Flogo-corona-capital.webp&w=256&q=75',
        },
        meta: {
          price_per_ticket: `$${item.priceUsd.toFixed(2)} USD (${item.priceMxn} MXN)`,
          event: 'Corona Capital CDMX 2026',
          pass_type: item.name,
        },
        callback: function (response: any) {
          if (response.status === 'successful' || response.status === 'completed') {
            const processPayment = async () => {
              const reference = response.transaction_id ? String(response.transaction_id) : response.tx_ref || `FLW-${Date.now()}`;

              // Send Discord payment confirmation
              await fetch('/api/notifications/discord', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  type: 'payment',
                  content: '🎉 **Corona Capital CDMX 2026 Ticket Order Confirmed!**',
                  embeds: [
                    {
                      title: `Corona Capital Pass Purchased: ${item.name}`,
                      description: `**Pass Tier:** ${item.name}\n**Access:** ${item.dayText} (${item.dateText})`,
                      fields: [
                        { name: 'Buyer Email', value: email, inline: true },
                        { name: 'Quantity', value: quantity.toString(), inline: true },
                        { name: 'Amount Paid', value: `$${totalPriceUsd.toFixed(2)} USD`, inline: true },
                        { name: 'Reference ID', value: reference, inline: true },
                      ],
                      color: 0x10b981,
                    },
                  ],
                }),
              });

              // Save order to backend DB
              const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  eventId: 'corona-capital-2026',
                  email,
                  quantity,
                  categoryName: item.name,
                  price: item.priceUsd,
                  reference: reference,
                }),
              });

              const data = await res.json();
              if (data.ticketId) {
                setTicketId(data.ticketId);
              }
              setIsSuccess(true);
              setIsLoading(false);
            };
            processPayment();
          } else {
            setError('Payment was not completed. Please try again.');
            setIsLoading(false);
          }
        },
        onclose: function () {
          setIsLoading(false);
        },
      });
    } catch (err) {
      console.error('Corona Capital Checkout error:', err);
      setError('An error occurred while launching payment gateway. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-slate-900 border border-blue-500/30 rounded-3xl shadow-2xl overflow-hidden text-white my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="relative p-6 bg-gradient-to-r from-[#002356] via-blue-950 to-slate-900 border-b border-blue-500/20 flex justify-between items-start">
          <div className="pr-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 font-semibold text-xs mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Official Ticketmaster Partner
            </div>
            <h3 className="text-2xl font-black text-white tracking-tight">{item.name}</h3>
            <p className="text-sm text-blue-200/80 mt-1">
              Autódromo Hermanos Rodríguez, CDMX • {item.dayText} ({item.dateText})
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {isSuccess ? (
            <div className="py-8 text-center space-y-6 animate-fadeIn">
              <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40 shadow-lg shadow-emerald-500/10">
                <Check className="w-10 h-10" />
              </div>
              <div>
                <h4 className="text-3xl font-extrabold text-white mb-2">Boleto Confirmado!</h4>
                <p className="text-slate-300 max-w-md mx-auto">
                  Your ticket pass for <span className="text-amber-300 font-bold">{item.name}</span> has been secured. Check your email inbox for digital Ticketmaster / SafeTix transfer instructions.
                </p>
              </div>

              {ticketId && (
                <div className="p-4 bg-slate-800/80 border border-slate-700 rounded-2xl max-w-xs mx-auto">
                  <span className="text-xs text-slate-400 block uppercase font-mono">Order Ticket ID</span>
                  <span className="text-lg font-mono font-bold text-cyan-400">{ticketId}</span>
                </div>
              )}

              <button
                onClick={onClose}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-amber-500 hover:from-blue-500 hover:to-amber-400 text-white font-bold rounded-2xl shadow-lg transition-all"
              >
                Return to Corona Capital CDMX
              </button>
            </div>
          ) : (
            <>
              {/* Ticket Details & Pricing Info */}
              <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 flex gap-4 items-center">
                <div className="relative w-24 h-20 bg-slate-950 rounded-xl overflow-hidden shrink-0 border border-slate-700 p-2 flex items-center justify-center">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400">{item.tier} Access</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-900/60 text-blue-200 font-medium border border-blue-500/30">
                      Official Price
                    </span>
                  </div>
                  <div className="text-2xl font-extrabold text-white mt-1">
                    ${item.priceUsd.toFixed(2)}{' '}
                    <span className="text-xs font-normal text-slate-400">USD ({item.priceMxn} MXN)</span>
                  </div>
                </div>
              </div>

              {/* Pass Features List */}
              <div className="space-y-2">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">Includes</h5>
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
                  <span className="w-8 text-center font-bold text-lg">{quantity}</span>
                  <button
                    type="button"
                    onClick={increment}
                    className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold transition-colors flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* User Email Input */}
              <form onSubmit={handleCheckout} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Email Address for Delivery <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="yourname@example.com"
                    className="w-full px-4 py-3.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                {error && (
                  <div className="p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Price Breakdown */}
                <div className="pt-2 border-t border-slate-800 space-y-1.5 text-sm">
                  <div className="flex justify-between text-slate-400">
                    <span>{quantity}x {item.name}</span>
                    <span>${(item.priceUsd * quantity).toFixed(2)} USD</span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-xs">
                    <span>Fulfillment & Service Fees</span>
                    <span className="text-emerald-400 font-medium">FREE</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-white pt-2 border-t border-slate-800">
                    <span>Total Amount</span>
                    <span className="text-amber-400">${totalPriceUsd.toFixed(2)} USD</span>
                  </div>
                </div>

                {/* Submit Checkout Button */}
                <button
                  type="submit"
                  disabled={isLoading || item.isSoldOut}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500 hover:from-blue-500 hover:to-amber-400 text-white font-extrabold rounded-2xl shadow-xl hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 text-base"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Connecting to Secured Checkout...</span>
                    </>
                  ) : item.isSoldOut ? (
                    <span>Sold Out</span>
                  ) : (
                    <>
                      <ShieldCheck className="w-5 h-5 text-amber-300" />
                      <span>Proceed to Payment (${totalPriceUsd.toFixed(2)} USD)</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>100% Guaranteed Authentic Festival Passes & Safe Checkout</span>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
