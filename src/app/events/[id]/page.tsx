import { getEventById } from '@/data/events';
import { notFound, redirect } from 'next/navigation';
import Image from 'next/image';
import { Calendar, MapPin, Info } from 'lucide-react';
import { CheckoutSidebar } from '@/components/CheckoutSidebar';

export default async function EventDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) {
    notFound();
  }

  if (event.is_world_cup) {
    redirect('/world-cup');
  }

  if (event.id === 'corona-capital-2026') {
    redirect('/corona-capital');
  }

  if (event.id === 'edc-orlando-2026') {
    redirect('/edc-orlando');
  }

  if (event.id === 'afronation-portugal-2026') {
    redirect('/afronation');
  }

  if (event.id === 'monaco-grand-prix-2026' || event.ticket_url === 'https://tickets.formula1.com/en/f1-3202-monaco') {
    redirect('/monaco-grand-prix-2026');
  }

  if (event.id === 'tomorrowland-belgium-2026') {
    redirect('/tomorrowland');
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Event Hero */}
      <div className="relative w-full h-[50vh] md:h-[60vh] bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-10" />
        <Image 
          src={event.image_url || 'https://images.unsplash.com/photo-1540039155732-687468680c14?q=80&w=2070&auto=format&fit=crop'} 
          alt={event.name}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full z-20 p-8 md:p-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-blue-600/20 text-blue-300 backdrop-blur-md rounded-full text-sm font-bold tracking-wider uppercase mb-4 border border-blue-500/30">
              {event.organizer || 'Featured Event'}
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
              {event.name}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <section className="glass-card bg-white p-8 md:p-10 rounded-3xl">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Event <span className="text-gradient">Details</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="flex items-start">
                  <div className="p-3 bg-blue-50 rounded-2xl mr-5">
                    <Calendar className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">Date & Time</h3>
                    <p className="text-slate-600 font-medium">{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p className="text-slate-500">{new Date(event.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="p-3 bg-purple-50 rounded-2xl mr-5">
                    <MapPin className="w-8 h-8 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">Location</h3>
                    <p className="text-slate-600 font-medium">{event.location}</p>
                    <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-semibold mt-1 inline-block">Get Directions</a>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                  <Info className="w-6 h-6 mr-3 text-slate-400" /> About this Event
                </h3>
                <div className="prose prose-lg prose-slate max-w-none">
                  <p className="text-slate-600 leading-relaxed">
                    {event.long_description || event.description}
                  </p>
                </div>
                {event.ticket_url && (
                  <div className="mt-8">
                    <a
                      href={event.ticket_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-700"
                    >
                      Visit official ticket site
                    </a>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar / Checkout Form */}
          <div className="lg:col-span-1">
            <CheckoutSidebar eventId={event.id} price={event.price} />
          </div>
        </div>
      </div>
    </div>
  );
}
