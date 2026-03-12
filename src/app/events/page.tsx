import Header from '@/components/Header';
import EventCard from '@/components/EventCard';
import { getEvents } from '@/data/events';

export default async function EventsList() {
  const events = await getEvents();

  return (
    <main className="min-h-screen flex flex-col bg-[#0a0a0a]">
      <Header />
      
      {/* Hero Header */}
      <section className="relative pt-20 pb-12 overflow-hidden border-b border-white/10 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Discover Events</h1>
          <p className="text-xl text-gray-400">
            Browse the curated list of top concerts and exclusive parties. 
          </p>
        </div>
      </section>

      {/* VETICAL COLUMN LISTING: Replacing Grid with a single-column stacked layout */}
      <section className="py-16 relative z-10 w-full flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
            <span className="text-electric-purple font-semibold">{events.length} Events Found</span>
            <select className="bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-electric-purple text-sm">
              <option>Sort by Date: Soonest</option>
              <option>Sort by Price: Low to High</option>
              <option>Sort by Price: High to Low</option>
            </select>
          </div>

          {/* The Column Layout */}
          <div className="flex flex-col gap-8">
            {events.map(event => (
              <EventCard 
                key={event.id} 
                event={event} 
              />
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-500 mb-4">You've reached the end of the list.</p>
            <button className="bg-white/5 border border-white/10 hover:bg-white/10 text-white px-6 py-3 rounded-full text-sm font-semibold transition-colors">
              Load More Events
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Vibe Pass Africa. All rights reserved.</p>
      </footer>
    </main>
  );
}
