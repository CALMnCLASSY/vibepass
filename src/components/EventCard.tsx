import React from 'react';
import { Calendar, MapPin, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { GROUP_CONFIG } from '@/data/events';
import type { EventType } from '@/data/events';

interface EventCardProps {
  event: EventType;
}

export default function EventCard({ event }: EventCardProps) {
  // Determine the target route based on GROUP_CONFIG
  let targetHref = `/events/${event.id}`;
  
  // First check if it's a grouped ID
  if (event.id.startsWith('grouped-')) {
    const keyword = event.id.replace('grouped-', '').toUpperCase();
    if (GROUP_CONFIG[keyword]) {
      targetHref = GROUP_CONFIG[keyword].route;
    }
  } else {
    // Fallback: search for keyword in name
    for (const [keyword, config] of Object.entries(GROUP_CONFIG)) {
      if (event.name.toUpperCase().includes(keyword)) {
        targetHref = config.route;
        break;
      }
    }
  }

  return (
    <Link href={targetHref} className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-electric-purple/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] flex flex-col cursor-pointer hover:-translate-y-1">
      <div className="relative h-56 w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.imageUrl}
          alt={event.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-xs font-semibold text-green-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          Verified Seller
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
      </div>

      <div className="p-5 flex-1 flex flex-col relative z-10 -mt-8">
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{event.name}</h3>

        <p className="text-sm text-gray-300 mb-4 line-clamp-2 flex-1">
          {event.description}
        </p>

        <div className="space-y-2 mb-6 border-t border-white/10 pt-4">
          <div className="flex items-center text-xs text-gray-400 gap-2">
            <Calendar className="w-4 h-4 text-electric-purple" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center text-xs text-gray-400 gap-2">
            <MapPin className="w-4 h-4 text-neon-pink" />
            <span>{event.location}</span>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="font-bold text-lg text-white">
            Kes {event.price.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-sm font-semibold text-electric-purple group-hover:text-neon-pink transition-colors">
            Get Ticket
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
