'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Calendar, MapPin } from 'lucide-react';
import { PastActionModal } from './PastActionModal';

type Event = {
  id: string;
  name: string;
  date: string;
  location: string;
  image_url: string;
  price: number;
  is_world_cup?: boolean;
};

export function PastEventsGrid({ events }: { events: Event[] }) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  if (events.length === 0) {
    return null;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 opacity-70 hover:opacity-100 transition-opacity duration-300">
        {events.map((event) => (
          <button
            key={event.id}
            onClick={() => setSelectedEvent(event)}
            className="group text-left w-full"
          >
            <div className="glass-card rounded-3xl overflow-hidden h-full flex flex-col bg-white grayscale group-hover:grayscale-0 transition-all duration-500">
              <div className="relative h-72 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-slate-900/20 z-10" />
                <Image
                  src={event.image_url || 'https://images.unsplash.com/photo-1540039155732-687468680c14?q=80&w=2070&auto=format&fit=crop'}
                  alt={event.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4 z-20">
                  <span className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-md uppercase tracking-wider">
                    Ended
                  </span>
                </div>
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 line-clamp-2">
                  {event.name}
                </h3>
                <div className="space-y-3 mb-6 text-slate-500 font-medium">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-3 text-red-400" />
                    <span>
                      {new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-3 text-slate-400" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <PastActionModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </>
  );
}
