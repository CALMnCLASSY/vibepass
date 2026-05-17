'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Tag, X, ArrowRight, Calendar, MapPin } from 'lucide-react';

type Event = {
  id: string;
  name: string;
  date: string;
  location: string;
  is_world_cup?: boolean;
};

type ActionModalProps = {
  event: Event | null;
  onClose: () => void;
};

export function ActionModal({ event, onClose }: ActionModalProps) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (event) {
      // Trigger animation after mount
      const t = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(t);
    } else {
      setIsVisible(false);
    }
  }, [event]);

  if (!event) return null;

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 250);
  };

  const handleBuy = () => {
    handleClose();
    setTimeout(() => {
      router.push(event.is_world_cup ? '/world-cup' : `/events/${event.id}`);
    }, 250);
  };

  const handleSell = () => {
    handleClose();
    setTimeout(() => {
      router.push(event.is_world_cup ? `/sell/world-cup-2026` : `/sell/${event.id}`);
    }, 250);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={`relative z-10 w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 ${
          isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 p-8 pb-6">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-2">
            How would you like to proceed?
          </div>
          <h2 className="text-2xl font-extrabold text-white leading-tight line-clamp-2">
            {event.name}
          </h2>
          <div className="mt-3 space-y-1.5">
            <div className="flex items-center text-slate-300 text-sm">
              <Calendar className="w-4 h-4 mr-2 text-blue-400 shrink-0" />
              {new Date(event.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
            <div className="flex items-center text-slate-300 text-sm">
              <MapPin className="w-4 h-4 mr-2 text-purple-400 shrink-0" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Buy */}
          <button
            onClick={handleBuy}
            className="group flex flex-col items-start p-6 rounded-2xl border-2 border-blue-100 bg-blue-50 hover:border-blue-500 hover:bg-blue-600 transition-all duration-200 text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-600 group-hover:bg-white flex items-center justify-center mb-4 transition-colors">
              <ShoppingBag className="w-6 h-6 text-white group-hover:text-blue-600 transition-colors" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-white transition-colors mb-1">
              Buy Tickets
            </h3>
            <p className="text-sm text-slate-500 group-hover:text-blue-100 transition-colors">
              Browse available listings and secure your spot.
            </p>
            <div className="mt-4 flex items-center text-blue-600 group-hover:text-white font-semibold text-sm transition-colors">
              Find tickets <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Sell */}
          <button
            onClick={handleSell}
            className="group flex flex-col items-start p-6 rounded-2xl border-2 border-emerald-100 bg-emerald-50 hover:border-emerald-500 hover:bg-emerald-600 transition-all duration-200 text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-600 group-hover:bg-white flex items-center justify-center mb-4 transition-colors">
              <Tag className="w-6 h-6 text-white group-hover:text-emerald-600 transition-colors" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-white transition-colors mb-1">
              Sell Tickets
            </h3>
            <p className="text-sm text-slate-500 group-hover:text-emerald-100 transition-colors">
              List your original tickets and we'll handle the rest.
            </p>
            <div className="mt-4 flex items-center text-emerald-600 group-hover:text-white font-semibold text-sm transition-colors">
              List tickets <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>

        {/* Trust line */}
        <div className="px-6 pb-6 text-center text-xs text-slate-400">
          🔒 All transactions are verified and secured by VibePass
        </div>
      </div>
    </div>
  );
}
