'use client';

import { useState } from 'react';
import { ShieldCheck, Loader2 } from 'lucide-react';

type CheckoutSidebarProps = {
  eventId: string;
  price: number;
};

export function CheckoutSidebar({ eventId, price }: CheckoutSidebarProps) {
  const [quantity, setQuantity] = useState(1);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
          content: '🛒 **Purchase Attempt Initiated**',
          embeds: [{
            title: 'Checkout Started',
            fields: [
              { name: 'User Email', value: email, inline: true },
              { name: 'Event ID', value: eventId, inline: true },
              { name: 'Quantity', value: quantity.toString(), inline: true },
              { name: 'Total Amount', value: `$${(price * quantity).toFixed(2)}`, inline: true },
            ],
            color: 0xfacc15, // Yellow
          }]
        }),
      });

      // 2. Initialize Paystack
      const handler = (window as any).PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
        email: email,
        amount: price * quantity * 100, // Paystack expects amount in kobo/cents
        currency: 'USD', // Adjust currency as needed
        callback: function(response: any) {
          const processPayment = async () => {
            // 3. Notify Discord of Payment Success
            await fetch('/api/notifications/discord', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                type: 'payment',
                content: '✅ **Payment Successful**',
                embeds: [{
                  title: 'Transaction Completed',
                  fields: [
                    { name: 'User Email', value: email, inline: true },
                    { name: 'Amount Paid', value: `$${(price * quantity).toFixed(2)}`, inline: true },
                    { name: 'Reference', value: response.reference, inline: true },
                  ],
                  color: 0x22c55e, // Green
                }]
              }),
            });

            // 4. Finalize Checkout in Backend
            const res = await fetch('/api/checkout', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ eventId, email, quantity, reference: response.reference }),
            });

            if (!res.ok) {
              const data = await res.json();
              throw new Error(data.error || 'Failed to save ticket');
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
      setError(err.message || 'An unexpected error occurred.');
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="sticky top-28 glass-card bg-white p-8 rounded-3xl text-center">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Purchase Successful!</h3>
        <p className="text-slate-600 mb-6">
          We've sent your tickets to <strong>{email}</strong>.
        </p>
        <button 
          onClick={() => { setIsSuccess(false); setEmail(''); setQuantity(1); }}
          className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
        >
          Buy More Tickets
        </button>
      </div>
    );
  }

  return (
    <div className="sticky top-28 glass-card bg-white p-8 rounded-3xl">
      <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-6">
        <h3 className="text-2xl font-bold text-slate-900">Tickets</h3>
        <span className="text-4xl font-extrabold text-blue-600">${price}</span>
      </div>
      
      <form onSubmit={handleCheckout}>
        <div className="space-y-6 mb-8">
          <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="font-semibold text-slate-700">General Admission</span>
            <div className="flex items-center space-x-4">
              <button type="button" onClick={decrement} className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-colors">-</button>
              <span className="font-bold text-slate-900">{quantity}</span>
              <button type="button" onClick={increment} className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-colors">+</button>
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Guest Email Address</label>
            <input 
              type="email" 
              id="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
            {error}
          </div>
        )}

        <div className="flex justify-between items-center mb-6 text-slate-600 font-medium">
          <span>Total ({quantity}x)</span>
          <span className="text-lg font-bold text-slate-900">${(price * quantity).toFixed(2)}</span>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-gradient-primary text-white py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-blue-500/40 transition-all hover:-translate-y-1 mb-4 flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Complete Checkout'}
        </button>
      </form>

      <div className="flex items-center justify-center text-sm text-slate-500 mt-6">
        <ShieldCheck className="w-5 h-5 mr-2 text-green-500" />
        100% Secure Checkout
      </div>
    </div>
  );
}
