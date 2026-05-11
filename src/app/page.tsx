import { getTopEvents } from '@/data/events';
import Link from 'next/link';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import Image from 'next/image';

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
            🎉 The World's Biggest Events
          </div>
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]">
            Experience the <br className="hidden md:block"/>
            <span className="text-gradient">Extraordinary</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-2xl mx-auto">
            Secure your access to the world's most exclusive concerts, festivals, and sporting events.
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
              <p className="text-slate-500 text-lg">Don't miss out on the most anticipated events globally.</p>
            </div>
            <Link href="/events" className="hidden md:flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors group text-lg">
              View All <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {topEvents.map((event) => (
              <Link href={event.is_world_cup ? '/world-cup' : `/events/${event.id}`} key={event.id} className="group">
                <div className="glass-card rounded-3xl overflow-hidden h-full flex flex-col bg-white">
                  <div className="relative h-72 w-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10" />
                    <Image 
                      src={event.image_url || 'https://images.unsplash.com/photo-1540039155732-687468680c14?q=80&w=2070&auto=format&fit=crop'} 
                      alt={event.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute bottom-5 left-5 z-20">
                      <span className="bg-white/95 text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold shadow-md">
                        ${event.price}
                      </span>
                    </div>
                  </div>
                  <div className="p-8 flex-grow flex flex-col">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors">{event.name}</h3>
                    <div className="space-y-3 mb-6 text-slate-600 font-medium">
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 mr-3 text-blue-500" />
                        <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 mr-3 text-purple-500" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                    </div>
                    <p className="text-slate-500 line-clamp-2 mt-auto">{event.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
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
