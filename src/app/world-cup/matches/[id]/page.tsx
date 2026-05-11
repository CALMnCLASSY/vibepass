import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getMatchById, getVenueById, ticketCategories, getVenueSeriesById, venueSeries } from "@/data/worldcup";
import {
  Calendar,
  MapPin,
  Clock,
  ArrowLeft,
  Star,
  Shield,
  Ticket,
  AlertTriangle,
  Check,
  ChevronRight,
} from "lucide-react";

export default async function MatchDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const match = getMatchById(params.id);

  if (!match) {
    notFound();
  }

  const venue = getVenueById(match.venue_id);
  if (!venue) {
    notFound();
  }

  const series = venueSeries.find((s) => s.venue_id === venue.id);

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Hero */}
      <div className="relative w-full bg-slate-900">
        <div className="absolute inset-0">
          <Image
            src={venue.image}
            alt={venue.name}
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/80 to-slate-900" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="/world-cup/matches"
            className="inline-flex items-center text-slate-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Matches
          </Link>

          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full border border-blue-400/20">
                {match.stage}
              </span>
              {match.group && (
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
                  Group {match.group}
                </span>
              )}
              {match.sold_out && (
                <span className="text-xs font-bold uppercase tracking-wider text-red-400 bg-red-400/10 px-3 py-1 rounded-full border border-red-400/20">
                  Sold Out
                </span>
              )}
            </div>
          </div>

          {/* Match Title */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-8">
            <div className="text-center">
              <div className="text-6xl md:text-8xl mb-3" style={{ fontFamily: 'Apple Color Emoji, "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", sans-serif' }}>{match.home_flag}</div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">{match.home_team}</h2>
            </div>
            <div className="text-center">
              <div className="text-xl font-extrabold text-slate-500 bg-slate-800/50 px-6 py-3 rounded-2xl border border-slate-700">
                VS
              </div>
              <div className="text-sm text-slate-400 mt-2 font-medium">
                Match {match.match_number}
              </div>
            </div>
            <div className="text-center">
              <div className="text-6xl md:text-8xl mb-3" style={{ fontFamily: 'Apple Color Emoji, "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", sans-serif' }}>{match.away_flag}</div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">{match.away_team}</h2>
            </div>
          </div>

          {/* Match Info */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-300 mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-400" />
              <span className="font-medium">
                {new Date(match.date + "T00:00:00").toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-400" />
              <span className="font-medium">{match.time} ET</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-purple-400" />
              <span className="font-medium">{venue.name}, {venue.city}, {venue.country}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        {/* Ticket Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Ticket className="w-6 h-6 text-blue-600" />
            Choose Your Experience
          </h2>
          <p className="text-slate-500 mb-6">
            Select a ticket category to see available seats and pricing for this match.
          </p>

          {match.sold_out ? (
            <div className="glass-card bg-white rounded-2xl p-8 text-center border-red-100">
              <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">This Match is Sold Out</h3>
              <p className="text-slate-500 mb-6">
                Standard tickets for this match are no longer available. You may still be able to find hospitality packages or check our resale marketplace.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/world-cup/hospitality"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-500 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  View Hospitality Packages
                </Link>
                <Link
                  href="/world-cup/matches"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                >
                  Browse Other Matches
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ticketCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="glass-card bg-white rounded-2xl overflow-hidden flex flex-col group"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="text-white font-bold text-sm bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                        {cat.price_range}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{cat.name}</h3>
                    <p className="text-sm text-slate-500 mb-4 flex-grow">{cat.description}</p>

                    <div className="space-y-2 mb-6">
                      {cat.features.map((feature, i) => (
                        <div key={i} className="flex items-start text-sm text-slate-600">
                          <Check className="w-4 h-4 mr-2 text-emerald-500 mt-0.5 shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <Link
                      href={`/events`}
                      className="mt-auto w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-center hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
                    >
                      Select <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Venue Info */}
        <div className="glass-card bg-white rounded-2xl p-6 md:p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-4">
              <Image
                src={venue.image}
                alt={venue.name}
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <div className="text-white font-bold text-lg">{venue.name}</div>
                <div className="text-slate-300 text-sm">{venue.city}, {venue.country}</div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">About the Venue</h3>
              <p className="text-slate-600 leading-relaxed mb-6">{venue.description}</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-50 rounded-xl p-4">
                  <div className="text-2xl font-extrabold text-slate-900">{venue.capacity.toLocaleString()}</div>
                  <div className="text-sm text-slate-500 font-medium">Capacity</div>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <div className="text-2xl font-extrabold text-slate-900">{venue.matches_count}</div>
                  <div className="text-sm text-slate-500 font-medium">Matches Hosted</div>
                </div>
              </div>
              <Link
                href="/world-cup/venues"
                className="inline-flex items-center text-blue-600 font-bold hover:text-blue-700 transition-colors"
              >
                View All Venues <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Venue Series */}
        {series && (
          <div className="glass-card bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl p-6 md:p-8 border border-blue-100 mb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{series.name}</h3>
                <p className="text-slate-600">{series.description}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-extrabold text-blue-600">${series.price_from.toLocaleString()}</div>
                <div className="text-sm text-slate-500">Starting price</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-bold text-slate-900 mb-3">Matches Included</h4>
                <ul className="space-y-2">
                  {series.matches_included.map((m, i) => (
                    <li key={i} className="flex items-center text-sm text-slate-600">
                      <Check className="w-4 h-4 mr-2 text-emerald-500" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-3">Available Packages</h4>
                <div className="flex flex-wrap gap-2">
                  {series.packages.map((p, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-sm font-medium text-slate-700"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <Link
              href="/world-cup/hospitality"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-500 text-white rounded-xl font-bold hover:shadow-lg transition-all"
            >
              Explore Venue Series
            </Link>
          </div>
        )}

        {/* Trust */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Shield, label: "Officially Licensed", desc: "FIFA Authorized" },
            { icon: Star, label: "Verified Tickets", desc: "100% Authentic" },
            { icon: Ticket, label: "Secure Delivery", desc: "Digital + Physical" },
            { icon: Check, label: "Buyer Guarantee", desc: "Full Protection" },
          ].map((item) => (
            <div key={item.label} className="glass-card bg-white rounded-xl p-5 text-center">
              <item.icon className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="font-bold text-slate-900 text-sm">{item.label}</div>
              <div className="text-xs text-slate-500">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
