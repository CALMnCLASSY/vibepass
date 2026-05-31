'use client';

import { useState, useEffect } from 'react';
import { X, Calendar, MapPin, AlertCircle, ArrowUp } from 'lucide-react';

type Event = {
  id: string;
  name: string;
  date: string;
  location: string;
  is_world_cup?: boolean;
};

type PastActionModalProps = {
  event: Event | null;
  onClose: () => void;
};

export function PastActionModal({ event, onClose }: PastActionModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!event) {
      return;
    }
    const t = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(t);
  }, [event]);

  if (!event) return null;

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 250);
  };

  const handleCheckLiveEvents = () => {
    handleClose();
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 250);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div
        className={`relative z-10 w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 ${
          isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
      >
        <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 p-8 pb-6">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-2 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1.5" />
            Event Ended
          </div>
          <h2 className="text-2xl font-extrabold text-white leading-tight line-clamp-2">
            {event.name}
          </h2>
          <div className="mt-3 space-y-1.5 opacity-60">
            <div className="flex items-center text-slate-300 text-sm">
              <Calendar className="w-4 h-4 mr-2 text-red-400 shrink-0" />
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

        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">This event has ended.</h3>
          <p className="text-slate-500 mb-8">
            Tickets and hospitality packages are no longer available for this past event.
          </p>
          
          <button
            onClick={handleCheckLiveEvents}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
          >
            <ArrowUp className="w-5 h-5" />
            Check Live Events
          </button>
        </div>
      </div>
    </div>
  );
}
