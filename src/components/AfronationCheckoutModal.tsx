'use client';

import { useState } from 'react';
import { X, Check, ShieldCheck, Loader2, Info, MapPin } from 'lucide-react';

type SelectedItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
};

type AfronationCheckoutModalProps = {
  item: SelectedItem | null;
  onClose: () => void;
};

export function AfronationCheckoutModal({ item, onClose }: AfronationCheckoutModalProps) {
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
      // 1. Notify Discord of Purchase Attempt
      await fetch('/api/notifications/discord', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'inquiry',
          content: '🔥 **Afro Nation Ticket Checkout Attempt Initiated**',
          embeds: [{
            title: `Ticket Checkout Started: ${item.name}`,
            description: `**Description:** ${item.description}\n\n**Price per Ticket:** $${item.price.toLocaleString(undefined, {minimumFractionDigits: 2})}`,
            fields: [
              { name: 'Selected Offer', value: item.name, inline: true },
              { name: 'Price', value: `$${item.price.toLocaleString(undefined, {minimumFractionDigits: 2})}`, inline: true },
              { name: 'Quantity', value: quantity.toString(), inline: true },
              { name: 'Total Amount', value: `$${totalPrice.toLocaleString(undefined, {minimumFractionDigits: 2})}`, inline: true },
              { name: 'Buyer Email', value: email, inline: true },
            ],
            color: 0xfeaa1e, // Afronation Orange
          }]
        }),
      });

      // 2. Initialize Flutterwave
      (window as any).FlutterwaveCheckout({
        public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || 'FLWPUBK-2e4373dda23b34dd487aa3e6b2444c3f-X',
        tx_ref: `tx-an-${Date.now()}`,
        amount: totalPrice, // Flutterwave expects amount in main currency units
        currency: 'USD',
        customer: {
          email: email,
        },
        customizations: {
          title: "Afro Nation Checkout",
          description: `Payment for ${item.name}`,
        },
        meta: {
          price_per_ticket: `$${item.price.toLocaleString(undefined, {minimumFractionDigits: 2})}`,
          ticket_description: item.description,
        },
        callback: function(response: any) {
          if (response.status === 'successful' || response.status === 'completed') {
            const processPayment = async () => {
              const reference = response.transaction_id ? String(response.transaction_id) : (response.tx_ref || `FLW-${Date.now()}`);

              // 3. Notify Discord of Payment Success
              await fetch('/api/notifications/discord', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  type: 'payment',
                  content: '✅ **Afro Nation Ticket Payment Successful**',
                  embeds: [{
                    title: `Afro Nation Booking Confirmed: ${item.name}`,
                    description: `**Description:** ${item.description}\n\n**Price per Ticket:** $${item.price.toLocaleString(undefined, {minimumFractionDigits: 2})}`,
                    fields: [
                      { name: 'Ticket Name', value: item.name, inline: false },
                      { name: 'User Email', value: email, inline: true },
                      { name: 'Quantity Purchased', value: quantity.toString(), inline: true },
                      { name: 'Amount Paid', value: `$${totalPrice.toLocaleString(undefined, {minimumFractionDigits: 2})}`, inline: true },
                      { name: 'Reference', value: reference, inline: true },
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
                  eventId: 'afronation-portugal-2026', 
                  email, 
                  quantity, 
                  categoryName: item.name,
                  price: item.price,
                  reference: reference 
                }),
              });

              if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to process and save Afro Nation ticket');
              }

              const data = await res.json();
              setTicketId(data.ticket?.id || `AN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
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
      <div className="bg-zinc-950 border border-zinc-800 rounded-none max-w-xl w-full p-8 shadow-2xl relative animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 p-2 bg-zinc-900 hover:bg-white hover:text-black transition-colors text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6">
            <div className="w-20 h-20 bg-[#feaa1e] text-black rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-10 h-10" />
            </div>
            <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">Booking Confirmed!</h3>
            <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
              We have successfully confirmed your booking for the <strong className="text-white">{item.name}</strong>.
              An email containing your digital Ticket IDs has been sent to <strong className="text-[#feaa1e]">{email}</strong>.
            </p>
            <div className="bg-zinc-900 p-6 rounded-none border border-zinc-800 mb-8 inline-block w-full">
              <p className="text-zinc-500 text-sm mb-2 uppercase tracking-widest">Digital Ticket ID</p>
              <p className="text-2xl font-mono font-bold text-white tracking-widest">{ticketId}</p>
            </div>
            <button 
              onClick={onClose}
              className="w-full bg-white hover:bg-[#ff651f] hover:text-white text-black py-4 font-black transition-all uppercase tracking-widest"
            >
              Back to Tickets
            </button>
          </div>
        ) : (
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#feaa1e]/10 border border-[#feaa1e]/30 text-[#feaa1e] text-xs font-bold mb-6 uppercase tracking-wider">
              <Info className="w-3.5 h-3.5" />
              Final Release
            </div>
            <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">{item.name}</h3>
            <div className="text-zinc-400 text-sm mb-6 leading-relaxed bg-zinc-900/50 p-4 border border-zinc-800 space-y-2">
              <p>{item.description}</p>
              <div className="pt-4 border-t border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <span className="text-zinc-500 block font-bold text-xs uppercase tracking-wider mb-1">Price Per Ticket</span>
                  <span className="text-[#feaa1e] text-xl font-black">${item.price.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                </div>
              </div>
            </div>

            {/* Features block */}
            {item.features && item.features.length > 0 && (
              <div className="p-5 bg-zinc-900 border border-zinc-800 mb-8">
                <h4 className="font-bold text-white text-xs mb-4 flex items-center gap-2 uppercase tracking-widest">
                  <Check className="w-4 h-4 text-[#feaa1e]" />
                  What's Included:
                </h4>
                <ul className="space-y-3">
                  {item.features.map((m, i) => (
                    <li key={i} className="text-sm text-zinc-400 flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#feaa1e] mt-1.5 shrink-0" />
                      <span className="leading-snug">{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <form onSubmit={handleCheckout} className="space-y-6">
              {/* Quantity */}
              <div className="flex justify-between items-center p-5 bg-zinc-900 border border-zinc-800">
                <span className="font-bold text-white uppercase tracking-widest text-sm">Quantity</span>
                <div className="flex items-center space-x-6">
                  <button 
                    type="button" 
                    onClick={decrement} 
                    className="w-10 h-10 bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors font-bold text-xl"
                  >
                    -
                  </button>
                  <span className="font-black text-white text-xl">{quantity}</span>
                  <button 
                    type="button" 
                    onClick={increment} 
                    className="w-10 h-10 bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors font-bold text-xl"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-xs font-bold text-zinc-400 mb-2 uppercase tracking-widest">
                  Guest Email Address
                </label>
                <input 
                  type="email" 
                  id="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-5 py-4 bg-zinc-900 border border-zinc-800 focus:outline-none focus:border-[#feaa1e] transition-colors text-white placeholder-zinc-600"
                />
              </div>

              {error && (
                <div className="p-4 bg-red-950/30 text-red-400 text-sm border border-red-900/50">
                  {error}
                </div>
              )}

              {/* Price Breakdown */}
              <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-zinc-800 gap-6">
                <div className="text-center sm:text-left">
                  <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider block mb-1">Total price for {quantity} ticket{quantity > 1 ? 's' : ''}</span>
                  <div className="text-3xl font-black text-white">${totalPrice.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
                </div>
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full sm:w-auto bg-[#ff651f] text-white px-10 py-5 font-black hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 disabled:opacity-50 uppercase tracking-widest"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    'Secure Checkout'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
