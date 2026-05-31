import { getEvents } from '@/data/events';
import { Search } from 'lucide-react';
import { EventsGrid } from '@/components/EventsGrid';
import { PastEventsGrid } from '@/components/PastEventsGrid';

export default async function EventsDirectory() {
  const allEvents = await getEvents();
  const now = new Date();
  
  const upcomingEvents = allEvents.filter(e => new Date(e.date) >= now);
  const pastEvents = allEvents.filter(e => new Date(e.date) < now);

  return (
    <div className="min-h-screen bg-slate-50 pt-10 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-5xl font-extrabold text-slate-900 mb-3">
            Discover <span className="text-gradient">Events</span>
          </h1>
          <p className="text-slate-500 text-lg mb-6">
            Click any event to buy tickets or list your own for sale.
          </p>

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

        <EventsGrid events={upcomingEvents} />

        {upcomingEvents.length === 0 && (
          <div className="text-center py-20 text-slate-500 glass-card rounded-3xl max-w-2xl mx-auto mb-16">
            <p className="text-xl font-medium">No active events currently available.</p>
          </div>
        )}

        {/* Past Events Section */}
        {pastEvents.length > 0 && (
          <div className="mt-24 pt-16 border-t border-slate-200">
            <div className="mb-12">
              <h2 className="text-4xl font-extrabold text-slate-900 mb-3">
                Past <span className="text-slate-500">Events</span>
              </h2>
              <p className="text-slate-500 text-lg">
                Browse our archive of successfully hosted events.
              </p>
            </div>
            
            <PastEventsGrid events={pastEvents} />
          </div>
        )}
      </div>
    </div>
  );
}
