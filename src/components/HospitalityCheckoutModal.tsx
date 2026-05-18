'use client';

import { useState } from 'react';
import { X, Check, ShieldCheck, Loader2, Info, MapPin } from 'lucide-react';

type SelectedItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  matchesIncluded?: string[];
  type: 'package' | 'series';
};

type HospitalityCheckoutModalProps = {
  item: SelectedItem | null;
  onClose: () => void;
};

export function HospitalityCheckoutModal({ item, onClose }: HospitalityCheckoutModalProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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

    const matchesListText = item.matchesIncluded 
      ? item.matchesIncluded.join(', ') 
      : 'Standard Hospitality';

    try {
      // 1. Notify Discord of Purchase Attempt
      await fetch('/api/notifications/discord', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'inquiry',
          content: '👑 **World Cup Hospitality Checkout Attempt Initiated**',
          embeds: [{
            title: `Hospitality Seating Checkout Started: ${item.name}`,
            fields: [
              { name: 'Selected Offer', value: item.name, inline: true },
              { name: 'Type', value: item.type === 'series' ? 'Venue Series' : 'Hospitality Package', inline: true },
              { name: 'Price Per Package', value: `$${item.price.toLocaleString()}`, inline: true },
              { name: 'Quantity', value: quantity.toString(), inline: true },
              { name: 'Total Amount', value: `$${totalPrice.toLocaleString()}`, inline: true },
              { name: 'Buyer Email', value: email, inline: true },
              { name: 'Matches Included', value: matchesListText, inline: false },
            ],
            color: 0xeab308, // Gold / Yellow
          }]
        }),
      });

      // 2. Initialize Paystack Setup
      const handler = (window as any).PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
        email: email,
        amount: totalPrice * 100, // Paystack expects amount in kobo/cents
        currency: 'USD',
        callback: async (response: any) => {
          // 3. Notify Discord of Payment Success
          await fetch('/api/notifications/discord', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'payment',
              content: '✅ **World Cup Hospitality Payment Successful**',
              embeds: [{
                title: `World Cup Hospitality Booking Confirmed: ${item.name}`,
                fields: [
                  { name: 'Package Name', value: item.name, inline: false },
                  { name: 'User Email', value: email, inline: true },
                  { name: 'Quantity Purchased', value: quantity.toString(), inline: true },
                  { name: 'Amount Paid', value: `$${totalPrice.toLocaleString()}`, inline: true },
                  { name: 'Paystack Reference', value: response.reference, inline: true },
                  { name: 'Matches Included', value: matchesListText, inline: false },
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
              eventId: item.id, 
              email, 
              quantity, 
              categoryName: item.name,
              price: item.price,
              matchesIncluded: item.matchesIncluded,
              reference: response.reference 
            }),
          });

          if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error || 'Failed to process and save World Cup hospitality ticket');
          }

          setIsSuccess(true);
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
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-card bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl relative animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-10 h-10" />
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 mb-4">Booking Confirmed!</h3>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              We have successfully confirmed your booking for the <strong>{item.name}</strong>.
              An email containing your digital Ticket IDs, details of matches, and hospitality guides has been sent to <strong>{email}</strong>.
            </p>
            <button 
              onClick={onClose}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl font-bold transition-all"
            >
              Back to Hospitality Listings
            </button>
          </div>
        ) : (
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold mb-4">
              <Info className="w-3.5 h-3.5" />
              {item.type === 'series' ? 'Venue Pass Series' : 'Hospitality Package'}
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 mb-2">{item.name}</h3>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">{item.description}</p>

            {/* Included Matches block */}
            {item.matchesIncluded && item.matchesIncluded.length > 0 && (
              <div className="p-4 bg-purple-50 rounded-2xl mb-6 border border-purple-100">
                <h4 className="font-bold text-purple-950 text-xs mb-2.5 flex items-center gap-1.5 uppercase tracking-wider">
                  <MapPin className="w-4 h-4 text-purple-600" />
                  Included Matches ({item.matchesIncluded.length}):
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {item.matchesIncluded.map((m, i) => (
                    <li key={i} className="text-xs text-purple-800 flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            )}

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

              {/* Price Breakdown */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                <div>
                  <span className="text-slate-500 text-xs">Total price for {quantity} package{quantity > 1 ? 's' : ''}</span>
                  <div className="text-2xl font-black text-slate-900">${totalPrice.toLocaleString()}</div>
                </div>
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
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
