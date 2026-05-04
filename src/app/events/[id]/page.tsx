'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import CheckoutModal from '@/components/CheckoutModal';
import { getEventById } from '@/data/events';
import { Calendar, MapPin, ShieldCheck, Ticket } from 'lucide-react';

export default function EventPage() {
  const params = useParams();
  const eventId = params.id as string;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [event, setEvent] = useState<any>(null);

  React.useEffect(() => {
    async function loadEvent() {
      const e = await getEventById(eventId);
      setEvent(e);
    }
    loadEvent();
  }, [eventId]);
  
  if (!event) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a]">
        <Header />
        <h1 className="text-3xl font-bold text-white mb-4">Event Not Found</h1>
        <p className="text-gray-400">The event you are looking for does not exist or has been removed.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-[#0a0a0a]">
      <Header />
      
      {/* Immersive Hero Banner */}
      <section className="relative h-[60vh] min-h-[500px] w-full mt-[-64px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={event.imageUrl} 
          alt={event.name} 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-green-400 text-sm font-semibold mb-4">
              <ShieldCheck className="w-4 h-4" />
              Official Organizer Partner
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
              {event.name}
            </h1>
            <p className="text-xl text-gray-300 font-medium">Presented by {event.organizer}</p>
          </div>
          
          <div className="hidden md:flex flex-col items-end">
            <p className="text-gray-400 mb-2">Starting at</p>
            <p className="text-4xl font-bold text-white mb-4">USD ${event.price.toLocaleString()}</p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-electric-purple hover:bg-purple-600 text-white font-bold py-4 px-10 rounded-full transition-transform hover:scale-105 shadow-[0_0_30px_rgba(139,92,246,0.3)] flex items-center gap-2"
            >
              <Ticket className="w-5 h-5" />
              Get Tickets Now
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-12 w-full">
        {/* Left Column: Details & Blog */}
        <div className="flex-1 space-y-10">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white mb-6">About the Event</h2>
            <div className="text-gray-300 space-y-4 leading-relaxed text-lg">
              <p>{event.description}</p>
              <p>{event.longDescription}</p>
            </div>
          </div>
        </div>

        {/* Right Column: Key Info & Mobile CTA */}
        <div className="w-full lg:w-96 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sticky top-24 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Event Details</h3>
            
            <div className="space-y-6 mb-8">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-electric-purple/20 flex items-center justify-center shrink-0">
                  <Calendar className="w-6 h-6 text-electric-purple" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm font-medium">Date & Time</p>
                  <p className="text-white font-semibold text-lg">{event.date}</p>
                  <p className="text-gray-500 text-sm">Doors open at 6:00 PM</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-neon-pink/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-neon-pink" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm font-medium">Location</p>
                  <p className="text-white font-semibold text-lg">{event.location}</p>
                  <a href="#" className="text-electric-purple hover:underline text-sm block mt-1">Get Directions</a>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 md:hidden mb-6">
              <p className="text-gray-400 text-center mb-2">Starting at</p>
              <p className="text-3xl font-bold text-white text-center mb-6">USD ${event.price.toLocaleString()}</p>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-electric-purple hover:bg-purple-600 text-white font-bold py-4 rounded-xl transition-colors shadow-[0_0_20px_rgba(139,92,246,0.3)] flex justify-center items-center gap-2"
              >
                <Ticket className="w-5 h-5" />
                Get Tickets Now
              </button>
            </div>

            <div className="bg-black/50 rounded-xl p-4 border border-white/5 flex items-center gap-3">
              <ShieldCheck className="text-green-400 w-8 h-8 shrink-0" />
              <p className="text-xs text-gray-400 leading-tight">
                <strong className="text-gray-200 block mb-0.5">Vibe Pass Guarantee</strong>
                100% Guaranteed authentic event tickets. 24/7 support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 border-t border-white/10 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Vibe Pass. All rights reserved.</p>
      </footer>

      {/* State management logic for the global animation */}
      <style dangerouslySetInnerHTML={{__html: `
        .animation-fade-in { animation: fadeIn 0.3s ease-out forwards; }
        .animation-slide-up { animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />

      <CheckoutModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        event={event} 
      />
    </main>
  );
}
