'use client';

import { useState } from 'react';
import { X, Check, ShieldCheck, Loader2, Info } from 'lucide-react';

type SelectedItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
};

type TomorrowlandCheckoutModalProps = {
  item: SelectedItem | null;
  onClose: () => void;
};

export function TomorrowlandCheckoutModal({ item, onClose }: TomorrowlandCheckoutModalProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [ticketId, setTicketId] = useState<string>('');

  if (!item) return null;

  const totalPrice = item.price * quantity;

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

    try {
      await fetch('/api/notifications/discord', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'inquiry',
          content: '🔥 **Tomorrowland Ticket Checkout Attempt Initiated**',
          embeds: [{
            title: `Ticket Checkout Started: ${item.name}`,
            description: `**Description:** ${item.description}\n\n**Price per Ticket:** $${item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
            fields: [
              { name: 'Selected Offer', value: item.name, inline: true },
              { name: 'Price', value: `$${item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, inline: true },
              { name: 'Quantity', value: quantity.toString(), inline: true },
              { name: 'Total Amount', value: `$${totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, inline: true },
              { name: 'Buyer Email', value: email, inline: true },
            ],
            color: 0x8b5cf6,
          }]
        }),
      });

      const handler = (window as any).PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
        email,
        amount: Math.round(totalPrice * 100),
        currency: 'USD',
        metadata: {
          custom_fields: [
            {
              display_name: 'Price per Ticket',
              variable_name: 'price_per_ticket',
              value: `$${item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
            },
            {
              display_name: 'Ticket Description',
              variable_name: 'ticket_description',
              value: item.description
            }
          ]
        },
        callback: function(response: any) {
          const processPayment = async () => {
            await fetch('/api/notifications/discord', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                type: 'payment',
                content: '✅ **Tomorrowland Ticket Payment Successful**',
                embeds: [{
                  title: `Tomorrowland Booking Confirmed: ${item.name}`,
                  description: `**Description:** ${item.description}\n\n**Price per Ticket:** $${item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
                  fields: [
                    { name: 'Ticket Name', value: item.name, inline: false },
                    { name: 'User Email', value: email, inline: true },
                    { name: 'Quantity Purchased', value: quantity.toString(), inline: true },
                    { name: 'Amount Paid', value: `$${totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, inline: true },
                    { name: 'Paystack Reference', value: response.reference, inline: true },
                  ],
                  color: 0x4f46e5,
                }]
              }),
            });

            const res = await fetch('/api/checkout', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                eventId: 'tomorrowland-belgium-2026',
                email,
                quantity,
                categoryName: item.name,
                price: item.price,
                reference: response.reference,
              }),
            });

            if (!res.ok) {
              const data = await res.json();
              throw new Error(data.error || 'Failed to process and save Tomorrowland ticket');
            }

            const data = await res.json();
            setTicketId(data.ticket?.id || `TL-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
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

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-2xl w-full p-8 shadow-2xl relative animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-slate-900 hover:bg-white hover:text-slate-950 transition text-white rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6">
            <div className="w-20 h-20 bg-violet-500 text-white rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-10 h-10" />
            </div>
            <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">Booking Confirmed!</h3>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Your Tomorrowland booking is locked in for <strong className="text-white">{item.name}</strong>. A confirmation email has been sent to <strong className="text-violet-400">{email}</strong>.
            </p>
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 mb-8">
              <p className="text-slate-500 text-sm mb-2 uppercase tracking-widest">Ticket Reference</p>
              <p className="text-2xl font-mono font-bold text-white tracking-widest">{ticketId}</p>
            </div>
            <button
              onClick={onClose}
              className="w-full bg-violet-500 hover:bg-white hover:text-violet-700 text-white py-4 font-black transition-all uppercase tracking-widest"
            >
              Back to event
            </button>
          </div>
        ) : (
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-bold uppercase tracking-widest rounded-full mb-6">
              <Info className="w-3.5 h-3.5" />
              Tomorrowland Festival Pass
            </div>

            <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">{item.name}</h3>
            <p className="text-slate-400 mb-6 leading-relaxed">{item.description}</p>

            <div className="grid gap-3 mb-8">
              {item.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-3xl border border-slate-800 bg-slate-900">
                  <div className="w-2.5 h-2.5 rounded-full bg-violet-500 mt-2" />
                  <p className="text-slate-400 text-sm leading-snug">{feature}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleCheckout} className="space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold text-white uppercase tracking-widest text-sm">Quantity</span>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={decrement}
                      className="w-11 h-11 rounded-2xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
                    >
                      -
                    </button>
                    <span className="text-white font-black text-lg">{quantity}</span>
                    <button
                      type="button"
                      onClick={increment}
                      className="w-11 h-11 rounded-2xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                <label htmlFor="email" className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                />
              </div>

              {error && (
                <div className="p-4 rounded-3xl bg-red-950 border border-red-900 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-slate-800">
                <div className="text-center sm:text-left">
                  <span className="text-slate-500 text-xs uppercase tracking-widest block mb-1">Total price for {quantity} ticket{quantity > 1 ? 's' : ''}</span>
                  <div className="text-3xl font-black text-white">${totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full sm:w-auto bg-violet-500 text-white px-10 py-4 font-black rounded-3xl hover:bg-white hover:text-violet-700 transition disabled:opacity-50 uppercase tracking-widest"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Complete Checkout'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
