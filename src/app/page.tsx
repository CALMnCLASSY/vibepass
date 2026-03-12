import Header from '@/components/Header';
import Hero from '@/components/Hero';
import EventCard from '@/components/EventCard';
import Newsletter from '@/components/Newsletter';
import { getEvents } from '@/data/events';
import type { EventType } from '@/data/events';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let events = await getEvents();

  const showmanEvents = events.filter(e => e.name.toUpperCase().includes('SHOWMAN'));
  const otherEvents = events.filter(e => !e.name.toUpperCase().includes('SHOWMAN'));

  if (showmanEvents.length > 0) {
    const groupedShowman: EventType = {
      ...showmanEvents[0],
      name: "NYASHINSKI SHOWMAN - THE RESIDENCY",
      price: 3500 // Base price for display
    };
    events = [groupedShowman, ...otherEvents];
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
              <p className="text-gray-400 text-lg">The most anticipated events across the continent.</p>
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
        <p>&copy; {new Date().getFullYear()} Vibe Pass Africa. All rights reserved.</p>
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
