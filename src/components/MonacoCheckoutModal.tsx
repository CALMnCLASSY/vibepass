'use client';

import { useState } from 'react';
import { X, ShieldCheck, Loader2, Info } from 'lucide-react';

type SelectedItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
};

type MonacoCheckoutModalProps = {
  item: SelectedItem | null;
  onClose: () => void;
};

type MonacoFlutterwaveResponse = {
  status: string;
  transaction_id: number;
  tx_ref: string;
  flw_ref?: string;
  amount?: number;
  currency?: string;
};

type MonacoFlutterwaveConfig = {
  public_key: string;
  tx_ref: string;
  amount: number;
  currency: string;
  customer: {
    email: string;
    name?: string;
    phone_number?: string;
  };
  meta?: Record<string, any>;
  customizations?: {
    title?: string;
    description?: string;
    logo?: string;
  };
  callback: (response: MonacoFlutterwaveResponse) => void;
  onclose: () => void;
};

export function MonacoCheckoutModal({ item, onClose }: MonacoCheckoutModalProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [ticketId, setTicketId] = useState<string>('');

  if (!item) return null;

  const totalPrice = item.price * quantity;

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleCheckout = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await fetch('/api/notifications/discord', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'inquiry',
          content: '🏎️ **Monaco Grand Prix Ticket Checkout Initiated**',
          embeds: [
            {
              title: `Checkout Started: ${item.name}`,
              fields: [
                { name: 'Ticket Category', value: item.name, inline: true },
                { name: 'Price', value: `$${item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, inline: true },
                { name: 'Quantity', value: quantity.toString(), inline: true },
                { name: 'Buyer Email', value: email, inline: true },
                { name: 'Total', value: `$${totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, inline: true },
              ],
              color: 0xf97316,
            },
          ],
        }),
      });

      const flutterwaveCheckout = (window as unknown as { FlutterwaveCheckout?: (config: MonacoFlutterwaveConfig) => void }).FlutterwaveCheckout;
      if (!flutterwaveCheckout) {
        throw new Error('Flutterwave is not available.');
      }

      flutterwaveCheckout({
        public_key: (process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || 'FLWPUBK-4b28912f42b436c26942587b0aa3a124-X') as string,
        tx_ref: `tx-monaco-${Date.now()}`,
        amount: totalPrice,
        currency: 'USD',
        customer: {
          email,
        },
        customizations: {
          title: "Monaco Grand Prix Checkout",
          description: `Payment for ${item.name}`,
        },
        meta: {
          ticket_category: item.name,
          monaco_ticket_type: item.description,
        },
        callback: function (response: MonacoFlutterwaveResponse) {
          if (response.status === 'successful' || response.status === 'completed') {
            const processPayment = async () => {
              const reference = response.transaction_id ? String(response.transaction_id) : (response.tx_ref || `FLW-${Date.now()}`);

              await fetch('/api/notifications/discord', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  type: 'payment',
                  content: '✅ **Monaco Ticket Payment Successful**',
                  embeds: [
                    {
                      title: `Monaco Booking Confirmed: ${item.name}`,
                      fields: [
                        { name: 'Ticket Category', value: item.name, inline: true },
                        { name: 'Quantity', value: quantity.toString(), inline: true },
                        { name: 'Amount Paid', value: `$${totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, inline: true },
                        { name: 'Buyer Email', value: email, inline: true },
                        { name: 'Reference', value: reference, inline: true },
                      ],
                      color: 0x22c55e,
                    },
                  ],
                }),
              });

              const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  eventId: 'monaco-grand-prix-2026',
                  email,
                  quantity,
                  categoryName: item.name,
                  price: item.price,
                  reference: reference,
                }),
              });

              if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to save ticket.');
              }

              const data = await res.json();
              setTicketId(data.ticket?.id || `MC-${Math.random().toString(36).slice(2, 11).toUpperCase()}`);
              setIsSuccess(true);
            };

            processPayment();
          } else {
            setError('Payment was not successful. Please try again.');
            setIsLoading(false);
          }
        },
        onclose: () => {
          setIsLoading(false);
          setError('Payment window closed. Please try again.');
        },
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred during checkout.';
      setError(message);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-950 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white transition"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-8 sm:p-10">
          {isSuccess ? (
            <div className="text-center py-10">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 text-white">
                <ShieldCheck className="h-10 w-10" />
              </div>
              <h2 className="text-3xl font-black text-white mb-3">Booking Confirmed!</h2>
              <p className="text-slate-400 mb-8">
                Your Monaco Grand Prix tickets are booked. A confirmation email has been sent to <strong className="text-white">{email}</strong>.
              </p>
              <div className="mx-auto max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-6 text-left">
                <p className="text-slate-500 uppercase tracking-[0.25em] text-xs mb-3">Ticket Reference</p>
                <p className="text-2xl font-black text-white break-words">{ticketId}</p>
              </div>
              <button
                onClick={onClose}
                className="mt-10 inline-flex items-center justify-center rounded-full bg-rose-500 px-8 py-4 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-rose-400"
              >
                Return to Monaco page
              </button>
            </div>
          ) : (
            <>
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-amber-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">
                    <Info className="h-3.5 w-3.5" /> Monaco Grand Prix 2026
                  </span>
                  <h2 className="mt-4 text-3xl font-black text-white tracking-tight">{item.name}</h2>
                  <p className="mt-3 max-w-2xl text-slate-400 leading-relaxed">{item.description}</p>
                </div>
                <div className="rounded-full border border-slate-800 bg-slate-900 px-6 py-4 text-center text-white shadow-lg shadow-slate-950/50">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Starting from</p>
                  <p className="mt-2 text-3xl font-black text-emerald-400">${item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                </div>
              </div>

              <form onSubmit={handleCheckout} className="space-y-6">
                <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                  <div className="flex items-center justify-between text-slate-400 text-sm uppercase tracking-[0.24em] mb-4">
                    <span>Quantity</span>
                    <span>{quantity} {quantity === 1 ? 'ticket' : 'tickets'}</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-3xl border border-slate-800 bg-slate-950 p-3">
                    <button
                      type="button"
                      onClick={decrement}
                      className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-slate-300 hover:bg-slate-800 transition"
                    >
                      -
                    </button>
                    <span className="text-xl font-black text-white">{quantity}</span>
                    <button
                      type="button"
                      onClick={increment}
                      className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-slate-300 hover:bg-slate-800 transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                  <label className="block text-sm font-semibold text-slate-400 mb-3" htmlFor="monaco-email">
                    Email address
                  </label>
                  <input
                    id="monaco-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                  />
                </div>

                {error && (
                  <div className="rounded-3xl border border-red-900 bg-red-950 p-4 text-sm text-red-300">
                    {error}
                  </div>
                )}

                <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                  <div className="flex items-center justify-between text-slate-400 text-sm uppercase tracking-[0.24em] mb-4">
                    <span>Total</span>
                    <span>${totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-full bg-rose-500 px-5 py-4 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-rose-400 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isLoading ? <Loader2 className="inline-block h-5 w-5 animate-spin" /> : 'Complete Checkout'}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
