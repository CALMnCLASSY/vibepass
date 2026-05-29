'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin } from 'lucide-react';
import { ActionModal } from './ActionModal';
import { AvailabilityBadge } from './AvailabilityBadge';

type Event = {
  id: string;
  name: string;
  date: string;
  location: string;
  image_url: string;
  price: number;
  is_world_cup?: boolean;
};

export function EventsGrid({ events }: { events: Event[] }) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {events.map((event) => (
          <button
            key={event.id}
            onClick={() => setSelectedEvent(event)}
            className="group text-left w-full"
          >
            <div className="glass-card rounded-3xl overflow-hidden h-full flex flex-col bg-white">
              <div className="relative h-72 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10" />
                <Image
                  src={event.image_url || 'https://images.unsplash.com/photo-1540039155732-687468680c14?q=80&w=2070&auto=format&fit=crop'}
                  alt={event.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <AvailabilityBadge ticketId={event.id} />
                <div className="absolute bottom-5 left-5 z-20">
                  <span className="bg-white/95 text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold shadow-md">
                    From ${event.price}
                  </span>
                </div>
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {event.name}
                </h3>
                <div className="space-y-3 mb-6 text-slate-600 font-medium">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-3 text-blue-500" />
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
                    <MapPin className="w-5 h-5 mr-3 text-purple-500" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <ActionModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </>
  );
}
