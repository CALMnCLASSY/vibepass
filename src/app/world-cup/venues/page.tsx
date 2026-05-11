import Image from "next/image";
import Link from "next/link";
import { venues, getMatchesByVenue } from "@/data/worldcup";
import { MapPin, ArrowRight, Building2 } from "lucide-react";

export default function VenuesPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <div className="bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1577223625816-7546f2f65e2e?q=80&w=2070&auto=format&fit=crop"
            alt="World Cup Venues"
            fill
            className="object-cover opacity-20"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 to-slate-900" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-emerald-400" />
            <span className="text-slate-400 font-medium">FIFA World Cup 2026™</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            16 Host <span className="text-gradient bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Cities</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            From Vancouver to Mexico City, experience football across three nations. World-class venues in iconic destinations.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        {/* USA */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm">🇺🇸</span>
            United States
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {venues.filter((v) => v.country === "USA").map((venue) => {
              const venueMatches = getMatchesByVenue(venue.id);
              return (
                <VenueCard key={venue.id} venue={venue} matchCount={venueMatches.length} />
              );
            })}
          </div>
        </div>

        {/* Canada */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-sm">🇨🇦</span>
            Canada
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {venues.filter((v) => v.country === "Canada").map((venue) => {
              const venueMatches = getMatchesByVenue(venue.id);
              return (
                <VenueCard key={venue.id} venue={venue} matchCount={venueMatches.length} />
              );
            })}
          </div>
        </div>

        {/* Mexico */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-sm">🇲🇽</span>
            Mexico
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {venues.filter((v) => v.country === "Mexico").map((venue) => {
              const venueMatches = getMatchesByVenue(venue.id);
              return (
                <VenueCard key={venue.id} venue={venue} matchCount={venueMatches.length} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function VenueCard({
  venue,
  matchCount,
}: {
  venue: (typeof venues)[0];
  matchCount: number;
}) {
  return (
    <Link href="/world-cup/matches" className="group block">
      <div className="glass-card bg-white rounded-2xl overflow-hidden h-full flex flex-col">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={venue.image}
            alt={venue.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
          <div className="absolute top-3 right-3">
            <span className="bg-white/90 text-slate-900 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
              {matchCount} matches
            </span>
          </div>
          <div className="absolute bottom-3 left-3 right-3">
            <div className="text-white font-bold text-lg leading-tight">{venue.name}</div>
            <div className="flex items-center text-slate-300 text-sm mt-1">
              <MapPin className="w-3.5 h-3.5 mr-1" />
              {venue.city}, {venue.country}
            </div>
          </div>
        </div>
        <div className="p-5 flex-grow flex flex-col">
          <p className="text-sm text-slate-500 mb-4 flex-grow">{venue.description}</p>
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600 font-medium">
              Capacity: <span className="text-slate-900 font-bold">{venue.capacity.toLocaleString()}</span>
            </div>
            <span className="text-sm font-bold text-blue-600 group-hover:text-blue-700 flex items-center gap-1">
              View Matches <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
