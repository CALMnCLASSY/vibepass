'use client';

import { useState } from 'react';
import { X, Check, ShieldCheck, Loader2, Music } from 'lucide-react';

type SelectedItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
};

type ACLFestCheckoutModalProps = {
  item: SelectedItem | null;
  onClose: () => void;
};

export function ACLFestCheckoutModal({ item, onClose }: ACLFestCheckoutModalProps) {
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
          content: '🎸 **ACL Fest 2026 Ticket Checkout Attempt Initiated**',
          embeds: [{
            title: `Ticket Checkout Started: ${item.name}`,
            description: `**Description:** ${item.description}\n\n**Price per Ticket:** $${item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
            fields: [
              { name: 'Selected Ticket', value: item.name, inline: true },
              { name: 'Price', value: `$${item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, inline: true },
              { name: 'Quantity', value: quantity.toString(), inline: true },
              { name: 'Total Amount', value: `$${totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, inline: true },
              { name: 'Buyer Email', value: email, inline: true },
            ],
            color: 0x4B6E3C,
          }]
        }),
      });

      // Initialize Flutterwave
      (window as any).FlutterwaveCheckout({
        public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || 'FLWPUBK-2e4373dda23b34dd487aa3e6b2444c3f-X',
        tx_ref: `tx-acl-${Date.now()}`,
        amount: totalPrice,
        currency: 'USD',
        customer: {
          email,
        },
        customizations: {
          title: 'ACL Fest 2026 Checkout',
          description: `Payment for ${item.name}`,
          logo: 'https://static-label.frontgatetickets.com/common/events/158566_lg.jpg',
        },
        meta: {
          price_per_ticket: `$${item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
          ticket_description: item.description,
          event: '2026 ACL Music Festival — Weekend One',
        },
        callback: function(response: any) {
          if (response.status === 'successful' || response.status === 'completed') {
            const processPayment = async () => {
              const reference = response.transaction_id ? String(response.transaction_id) : (response.tx_ref || `FLW-${Date.now()}`);

              await fetch('/api/notifications/discord', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  type: 'payment',
                  content: '✅ **ACL Fest 2026 Ticket Payment Successful**',
                  embeds: [{
                    title: `ACL Fest 2026 Booking Confirmed: ${item.name}`,
                    description: `**Description:** ${item.description}\n\n**Price per Ticket:** $${item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
                    fields: [
                      { name: 'Ticket Name', value: item.name, inline: false },
                      { name: 'User Email', value: email, inline: true },
                      { name: 'Quantity Purchased', value: quantity.toString(), inline: true },
                      { name: 'Amount Paid', value: `$${totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, inline: true },
                      { name: 'Reference', value: reference, inline: true },
                    ],
                    color: 0x4B6E3C,
                  }]
                }),
              });

              const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  eventId: 'acl-fest-2026',
                  email,
                  quantity,
                  categoryName: item.name,
                  price: item.price,
                  reference: reference,
                }),
              });

              if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to process ACL Fest ticket');
              }

              const data = await res.json();
              setTicketId(data.ticket?.id || `ACL-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
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
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during checkout.');
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-[#1a2214] border border-[#4B6E3C]/40 rounded-3xl max-w-2xl w-full p-8 shadow-2xl relative animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-[#2a3a20] hover:bg-white hover:text-[#1a2214] transition text-white rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6">
            <div className="w-20 h-20 bg-[#4B6E3C] text-white rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-10 h-10" />
            </div>
            <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tight">Booking Confirmed!</h3>
            <p className="text-[#a0b890] text-lg mb-8 leading-relaxed">
              Your ACL Fest ticket is locked in for <strong className="text-white">{item.name}</strong>. A confirmation email has been sent to <strong className="text-[#7cb87a]">{email}</strong>.
            </p>
            <div className="bg-[#0f1a0c] p-6 rounded-3xl border border-[#4B6E3C]/30 mb-8">
              <p className="text-[#6b8f5e] text-sm mb-2 uppercase tracking-widest">Ticket Reference</p>
              <p className="text-2xl font-mono font-bold text-white tracking-widest">{ticketId}</p>
            </div>
            <div className="bg-[#0f1a0c] p-4 rounded-2xl border border-[#4B6E3C]/20 mb-6 text-left">
              <p className="text-[#6b8f5e] text-xs mb-2 uppercase tracking-widest">What's included</p>
              <ul className="space-y-1 text-sm text-[#a0b890]">
                <li>✓ Live music on 9 stages at Zilker Park</li>
                <li>✓ Access to food vendors, bars & merch</li>
                <li>✓ Austin Kiddie Limits access</li>
                <li>✓ A portion benefits Austin Parks Foundation</li>
              </ul>
            </div>
            <button
              onClick={onClose}
              className="w-full bg-[#4B6E3C] hover:bg-white hover:text-[#4B6E3C] text-white py-4 font-black transition-all uppercase tracking-widest rounded-2xl"
            >
              Back to event
            </button>
          </div>
        ) : (
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#4B6E3C]/20 border border-[#4B6E3C]/40 text-[#7cb87a] text-xs font-bold uppercase tracking-widest rounded-full mb-6">
              <Music className="w-3.5 h-3.5" />
              ACL Music Festival 2026 — Weekend One
            </div>

            <h3 className="text-3xl font-black text-white mb-2">{item.name}</h3>
            <p className="text-[#a0b890] mb-6 leading-relaxed">{item.description}</p>

            <div className="grid gap-3 mb-8">
              {item.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-2xl border border-[#4B6E3C]/30 bg-[#0f1a0c]">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#4B6E3C] mt-2 shrink-0" />
                  <p className="text-[#a0b890] text-sm leading-snug">{feature}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleCheckout} className="space-y-6">
              <div className="bg-[#0f1a0c] border border-[#4B6E3C]/30 rounded-3xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold text-white uppercase tracking-widest text-sm">Quantity</span>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={decrement}
                      className="w-11 h-11 rounded-2xl bg-[#2a3a20] text-[#a0b890] hover:text-white hover:bg-[#4B6E3C] transition"
                    >
                      -
                    </button>
                    <span className="text-white font-black text-lg w-6 text-center">{quantity}</span>
                    <button
                      type="button"
                      onClick={increment}
                      className="w-11 h-11 rounded-2xl bg-[#2a3a20] text-[#a0b890] hover:text-white hover:bg-[#4B6E3C] transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                <label htmlFor="acl-email" className="block text-xs font-bold text-[#6b8f5e] uppercase tracking-widest mb-2">
                  Email address
                </label>
                <input
                  id="acl-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-[#4B6E3C]/30 bg-[#1a2214] px-4 py-4 text-white placeholder-[#4a5e40] focus:outline-none focus:border-[#4B6E3C]"
                />
              </div>

              {error && (
                <div className="p-4 rounded-2xl bg-red-950 border border-red-900 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-[#4B6E3C]/20">
                <div className="text-center sm:text-left">
                  <span className="text-[#6b8f5e] text-xs uppercase tracking-widest block mb-1">
                    Total for {quantity} ticket{quantity > 1 ? 's' : ''}
                  </span>
                  <div className="text-3xl font-black text-white">${totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full sm:w-auto bg-[#4B6E3C] text-white px-10 py-4 font-black rounded-2xl hover:bg-white hover:text-[#4B6E3C] transition disabled:opacity-50 uppercase tracking-widest flex items-center justify-center gap-2"
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
