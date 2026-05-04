import Header from '@/components/Header';
import Hero from '@/components/Hero';
import EventCard from '@/components/EventCard';
import Newsletter from '@/components/Newsletter';
import { getGroupedEvents } from '@/data/events';
import type { EventType } from '@/data/events';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let events = await getGroupedEvents();

  // If database is empty, provide fallback mock data for demonstration
  if (events.length === 0) {
    events = [
      {
        id: 'mock-worldcup',
        name: 'FIFA World Cup 2026™',
        date: '2026-06-11',
        location: 'Canada, Mexico, USA',
        imageUrl: 'https://digitalhub.fifa.com/transform/2d17c91d-eb88-46c5-8ee3-cd250004ad42/FIFA-World-Cup-2026-Emblem?io=transform:fill,height:868,width:1536&quality=100',
        price: 250,
        organizer: 'FIFA',
        description: 'The biggest single-sport event in the world.',
        longDescription: '',
        isActive: true
      }
    ];
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      
      <Hero />
      
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Trending Now</h2>
              <p className="text-gray-400 text-lg">The most anticipated events across the globe.</p>
            </div>
            <Link href="/events" className="text-electric-purple font-semibold hover:text-purple-400 mt-4 md:mt-0 transition-colors">
              View All Events &rarr;
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {events.slice(0, 4).map(event => (
              <EventCard 
                key={event.id} 
                event={event} 
              />
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
      
      {/* Footer */}
      <footer className="py-8 border-t border-white/10 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Vibe Pass. All rights reserved.</p>
      </footer>
      
      {/* Global CSS animation rules built into this file for ease, normally in globals.css */}
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
    </main>
  );
}
