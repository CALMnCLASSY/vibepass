import { getEvents } from '@/data/events';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { EventsGrid } from '@/components/EventsGrid';
import { PastEventsGrid } from '@/components/PastEventsGrid';

export default async function Home() {
  const allEvents = await getEvents();
  const now = new Date();
  
  const upcomingEvents = allEvents.filter(e => new Date(e.date) >= now).slice(0, 3);
  const pastEvents = allEvents.filter(e => new Date(e.date) < now).slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900 opacity-70 z-0" />
        <div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-40 z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent z-10" />

        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto pt-20">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-white/10 border border-white/30 text-white font-semibold text-sm shadow-sm backdrop-blur-md animate-bounce">
            🎉 The World's Biggest Events — Buy & Sell with Confidence
          </div>
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-white mb-8 leading-[1.1] drop-shadow-lg">
            Your Ticket, <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">Your Way</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-100 mb-12 max-w-2xl mx-auto drop-shadow-md">
            Secure your access to the world's most exclusive events. Buy from or Sell to our community of real fans.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/events" className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-100 transition-all hover:-translate-y-1 w-full sm:w-auto text-center shadow-lg">
              Explore Events
            </Link>
            <Link href="/sell" className="bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-full font-bold text-lg border border-white/30 hover:bg-white/30 transition-all hover:-translate-y-1 w-full sm:w-auto text-center">
              Sell Your Tickets
            </Link>
          </div>
        </div>
      </section>

      {/* Top Events Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Trending <span className="text-gradient">Now</span></h2>
              <p className="text-slate-500 text-lg">Click any event to buy or list your tickets on the marketplace.</p>
            </div>
            <Link href="/events" className="hidden md:flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors group text-lg">
              View All <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <EventsGrid events={upcomingEvents} />

          {upcomingEvents.length === 0 && (
            <div className="text-center py-20 text-slate-500 glass-card rounded-3xl mx-auto max-w-2xl">
              <p className="text-xl font-medium">No active events currently available.</p>
            </div>
          )}
        </div>
      </section>

      {/* Past Events Section */}
      {pastEvents.length > 0 && (
        <section className="py-24 bg-slate-50 relative border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Past <span className="text-slate-500">Events</span></h2>
              <p className="text-slate-500 text-lg">Browse highlights from our past flagship experiences.</p>
            </div>

            <PastEventsGrid events={pastEvents} />
          </div>
        </section>
      )}
    </div>
  );
}
