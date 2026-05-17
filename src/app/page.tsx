import { getTopEvents } from '@/data/events';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { EventsGrid } from '@/components/EventsGrid';

export default async function Home() {
  const topEvents = await getTopEvents(3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden bg-slate-50">
        <div className="absolute inset-0 bg-slate-100 z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/50 via-slate-50 to-white z-10" />

        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto pt-20">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full glass border-blue-200 text-blue-700 font-semibold text-sm shadow-sm animate-bounce">
            🎉 The World's Biggest Events — Buy & Sell with Confidence
          </div>
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]">
            Your Ticket, <br className="hidden md:block" />
            <span className="text-gradient">Your Way</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-2xl mx-auto">
            Secure your access to the world's most exclusive events. Buy from or Sell to our community of real fans.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/events" className="bg-gradient-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:shadow-blue-500/40 transition-all hover:-translate-y-1 w-full sm:w-auto text-center">
              Explore Events
            </Link>
            <Link href="/world-cup" className="glass text-slate-800 px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition-all hover:-translate-y-1 w-full sm:w-auto text-center">
              FIFA World Cup
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

          <EventsGrid events={topEvents} />

          {topEvents.length === 0 && (
            <div className="text-center py-20 text-slate-500 glass-card rounded-3xl mx-auto max-w-2xl">
              <p className="text-xl font-medium">No events found. Please run the SQL seed script in your Supabase dashboard.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
