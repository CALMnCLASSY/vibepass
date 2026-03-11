import React, { useState } from 'react';
import { X, CheckCircle2, User, Mail, Phone, Lock } from 'lucide-react';
import type { EventType } from '@/data/events';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventType | null;
}

type CheckoutStep = 'DETAILS' | 'PAYMENT' | 'SUCCESS';

export default function CheckoutModal({ isOpen, onClose, event }: CheckoutModalProps) {
  const [step, setStep] = useState<CheckoutStep>('DETAILS');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  if (!isOpen || !event) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
      // Reset state on close
      setTimeout(() => setStep('DETAILS'), 300);
    }
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('PAYMENT');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('SUCCESS');
  };

  const closeReset = () => {
    onClose();
    setTimeout(() => {
      setStep('DETAILS');
      setFormData({ name: '', email: '', phone: '' });
    }, 300);
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4 animation-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="w-full sm:max-w-md bg-[#111] sm:rounded-3xl rounded-t-3xl border border-white/10 overflow-hidden shadow-2xl animation-slide-up flex flex-col max-h-[90vh]">
        {/* Header - Fixed */}
        <div className="relative h-32 w-full shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={event.imageUrl} alt="" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent" />
          <button 
            onClick={closeReset}
            className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white/70 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 -mt-10 relative z-10 flex-1 overflow-y-auto custom-scrollbar">
          <div className="mb-6 flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1 leading-tight pr-4">{event.name}</h2>
              <p className="text-sm text-electric-purple font-medium mb-1">Kes {event.price.toLocaleString()}</p>
            </div>
          </div>

          {step === 'DETAILS' && (
            <div className="animation-fade-in">
              <div className="flex items-center gap-2 mb-6 bg-white/5 border border-white/5 p-3 rounded-lg">
                <Lock className="w-4 h-4 text-gray-400" />
                <p className="text-xs text-gray-300">Your details are secure. This is where we'll send your tickets.</p>
              </div>

              <form onSubmit={handleDetailsSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-300 ml-1">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      placeholder="Jane Doe" 
                      className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-electric-purple/50 focus:border-electric-purple transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-500" />
                    </div>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      placeholder="jane@example.com" 
                      className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-electric-purple/50 focus:border-electric-purple transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-300 ml-1">Phone Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-500" />
                    </div>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      placeholder="07XX XXX XXX" 
                      className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-electric-purple/50 focus:border-electric-purple transition-all"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-white hover:bg-gray-200 text-black font-bold py-4 rounded-xl mt-6 transition-colors flex justify-center items-center gap-2"
                >
                  Continue to Payment
                </button>
              </form>
            </div>
          )}

          {step === 'PAYMENT' && (
            <div className="animation-fade-in">
              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col mb-6 gap-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Tickets</span>
                    <span className="text-white">1x General Admission</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Total</span>
                    <span className="font-bold text-electric-purple text-lg">Kes {event.price.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-300">M-Pesa Number</label>
                  <input 
                    type="tel" 
                    placeholder="07XX XXX XXX" 
                    defaultValue={formData.phone}
                    required
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00b050]/50 focus:border-[#00b050] transition-all"
                  />
                  <p className="text-xs text-gray-500">We will send an STK push to this number.</p>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#00b050] hover:bg-[#009040] text-white font-bold py-4 rounded-xl mt-4 transition-colors flex justify-center items-center gap-2"
                >
                  Pay with M-Pesa
                </button>
                <button 
                  type="button"
                  onClick={() => setStep('DETAILS')}
                  className="w-full bg-transparent text-gray-400 hover:text-white text-sm py-2 mt-2 transition-colors"
                >
                  Back to Details
                </button>
              </form>
            </div>
          )}

          {step === 'SUCCESS' && (
            <div className="py-8 flex flex-col items-center text-center animation-fade-in">
              <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Check Your Phone</h3>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                An M-Pesa prompt has been sent to <strong className="text-white">{formData.phone || 'your phone'}</strong>. Enter your PIN to complete the purchase. Tickets will be sent to <strong className="text-white">{formData.email}</strong>.
              </p>
              <button 
                onClick={closeReset}
                className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 rounded-xl transition-colors"
              >
                Close Window
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
