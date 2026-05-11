import { getEvents } from '@/data/events';
import Link from 'next/link';
import { Calendar, MapPin, Search } from 'lucide-react';
import Image from 'next/image';

export default async function EventsDirectory() {
  const events = await getEvents();

  return (
    <div className="min-h-screen bg-slate-50 pt-10 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-5xl font-extrabold text-slate-900 mb-6">Discover <span className="text-gradient">Events</span></h1>
          
          <div className="relative max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search by artist, event, or location..." 
              className="block w-full pl-12 pr-4 py-4 border border-slate-200 rounded-full leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-lg transition-shadow shadow-sm hover:shadow-md"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {events.map((event) => (
            <Link href={`/events/${event.id}`} key={event.id} className="group">
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
        {events.length === 0 && (
          <div className="text-center py-20 text-slate-500 glass-card rounded-3xl max-w-2xl mx-auto">
            <p className="text-xl font-medium">No events currently available.</p>
          </div>
        )}
      </div>
    </div>
  );
}
