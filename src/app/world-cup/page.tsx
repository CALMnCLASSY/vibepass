import Link from "next/link";
import Image from "next/image";
import { matches as rawMatches, venues, ticketCategories, hospitalityPackages } from "@/data/worldcup";

const matches = rawMatches.filter((m) => m.stage !== "Group Stage");
import {
  Calendar,
  MapPin,
  Trophy,
  Users,
  ArrowRight,
  Star,
  Shield,
  Clock,
  ChevronRight,
  Ticket,
  Wine,
  Crown,
  Building2,
} from "lucide-react";

export default function WorldCupPage() {
  const featuredMatches = matches.filter((m) => m.sold_out || m.stage === "Final" || m.stage === "Semi Finals").slice(0, 6);
  const featuredVenues = venues.slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <Image
            src="data:image/jpeg;base64,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"
            alt="FIFA World Cup 2026 Stadium"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto pt-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold text-sm mb-8">
            <Trophy className="w-4 h-4 text-yellow-400" />
            FIFA World Cup 2026™ — USA, Canada & Mexico
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight">
            The World&apos;s Game <br className="hidden md:block" />
            <span className="text-gradient bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              On Our Soil
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            104 matches. 16 venues. 48 nations. Buy tickets from verified fans or list your own on the VibePass marketplace.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="inline-flex items-center gap-3 rounded-full border border-slate-600 bg-slate-800/80 px-8 py-4 text-sm font-bold uppercase tracking-widest text-slate-400">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
              Tournament Completed — Final: July 19, 2026
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { label: "Matches", value: "104", icon: Calendar },
              { label: "Venues", value: "16", icon: MapPin },
              { label: "Teams", value: "48", icon: Users },
              { label: "Host Countries", value: "3", icon: GlobeIcon },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 text-center"
              >
                <stat.icon className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <div className="text-3xl font-extrabold text-white">{stat.value}</div>
                <div className="text-sm text-slate-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tournament Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Tournament <span className="text-gradient">Schedule</span></h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Six weeks of football spanning three nations. From the opening match to the Final.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { stage: "Group Stage (Completed)", dates: "Jun 11 – Jun 27", matches: "72", color: "from-blue-500 to-blue-600" },
              { stage: "Round of 32", dates: "Jun 29 – Jul 1", matches: "16", color: "from-indigo-500 to-indigo-600" },
              { stage: "Round of 16", dates: "Jul 4 – Jul 5", matches: "8", color: "from-violet-500 to-violet-600" },
              { stage: "Quarter Finals", dates: "Jul 9 – Jul 10", matches: "4", color: "from-purple-500 to-purple-600" },
              { stage: "Semi Finals", dates: "Jul 14 – Jul 15", matches: "2", color: "from-fuchsia-500 to-fuchsia-600" },
              { stage: "Final", dates: "Jul 19", matches: "1", color: "from-emerald-500 to-emerald-600" },
            ].map((item) => (
              <div key={item.stage} className="glass-card bg-white rounded-2xl p-6 text-center group hover:-translate-y-1 transition-all">
                <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white font-bold shadow-lg`}>
                  {item.matches}
                </div>
                <h3 className="font-bold text-slate-900 mb-1">{item.stage}</h3>
                <p className="text-sm text-slate-500">{item.dates}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Matches */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Featured <span className="text-gradient">Matches</span></h2>
              <p className="text-slate-500 text-lg">The biggest fixtures you can&apos;t afford to miss.</p>
            </div>
            <Link href="/world-cup/matches" className="hidden md:flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors group text-lg">
              All Matches <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredMatches.map((match) => {
              const venue = venues.find((v) => v.id === match.venue_id);
              return (
                <Link href={`/world-cup/matches/${match.id}`} key={match.id} className="group">
                  <div className="glass-card bg-white rounded-2xl p-6 hover:shadow-xl transition-all hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{match.stage}</span>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Available</span>
                    </div>
                    <div className="flex items-center justify-between md:justify-start gap-4">
                      <div className="flex items-center gap-3 flex-1 md:flex-initial">
                        <span className="text-3xl" style={{ fontFamily: 'Apple Color Emoji, "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", sans-serif' }}>{match.home_flag}</span>
                        <span className="font-bold text-slate-900 hidden sm:inline">{match.home_team}</span>
                      </div>
                      <span className="text-xl font-extrabold text-slate-300 px-2">VS</span>
                      <div className="flex items-center gap-3 flex-1 md:flex-initial justify-end md:justify-start">
                        <span className="font-bold text-slate-900 hidden sm:inline">{match.away_team}</span>
                        <span className="text-3xl" style={{ fontFamily: 'Apple Color Emoji, "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", sans-serif' }}>{match.away_flag}</span>
                      </div>
                    </div>
                    <div className="border-t border-slate-100 pt-4 space-y-2">
                      <div className="flex items-center text-sm text-slate-600">
                        <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                        {new Date(match.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                        <span className="mx-2 text-slate-300">|</span>
                        {match.time} ET
                      </div>
                      <div className="flex items-center text-sm text-slate-600">
                        <MapPin className="w-4 h-4 mr-2 text-purple-500" />
                        {venue?.city}, {venue?.country}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/world-cup/matches" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors group text-lg">
              All Matches <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Ticket Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Ticket <span className="text-gradient">Categories</span></h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              From standard match tickets to ultra-premium hospitality. Find the perfect experience for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {ticketCategories.map((cat) => (
              <div key={cat.id} className="glass-card bg-white rounded-2xl overflow-hidden group hover:-translate-y-1 transition-all flex flex-col">
                <div className="relative h-40 w-full overflow-hidden">
                  <Image src={cat.image} alt={cat.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="text-white font-bold text-sm">{cat.price_range}</div>
                  </div>
                </div>
                <div className="p-5 flex-grow flex flex-col">
                  <h3 className="font-bold text-slate-900 mb-2">{cat.name}</h3>
                  <p className="text-sm text-slate-500 mb-4 flex-grow">{cat.description}</p>
                  <ul className="space-y-1.5 mb-4">
                    {cat.features.slice(0, 3).map((f, i) => (
                      <li key={i} className="flex items-start text-xs text-slate-600">
                        <Star className="w-3 h-3 mr-2 text-emerald-500 mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/world-cup/matches"
                    className="mt-auto text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    Find Tickets <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hospitality Packages */}
      <section className="py-20 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-slate-900 to-slate-900" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Hospitality <span className="text-gradient bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Packages</span></h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Elevate your World Cup experience with premium hospitality packages from official provider On Location.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hospitalityPackages.map((pkg) => (
              <div key={pkg.id} className="glass bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group flex flex-col">
                {pkg.badge && (
                  <span className="inline-block self-start px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 text-white text-xs font-bold mb-4">
                    {pkg.badge}
                  </span>
                )}
                <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                <p className="text-sm text-slate-400 mb-4 flex-grow">{pkg.description}</p>
                <div className="text-lg font-bold text-emerald-400 mb-4">{pkg.price_display}</div>
                <ul className="space-y-2 mb-6">
                  {pkg.features.slice(0, 3).map((f, i) => (
                    <li key={i} className="flex items-start text-sm text-slate-300">
                      <Shield className="w-4 h-4 mr-2 text-blue-400 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/world-cup/hospitality"
                  className="mt-auto w-full py-3 rounded-xl bg-white/10 text-white font-bold text-center hover:bg-white/20 transition-colors border border-white/10"
                >
                  Explore Package
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venue Showcase */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">16 Host <span className="text-gradient">Cities</span></h2>
              <p className="text-slate-500 text-lg">From coast to coast across North America.</p>
            </div>
            <Link href="/world-cup/venues" className="hidden md:flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors group text-lg">
              All Venues <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredVenues.map((venue) => (
              <Link href="/world-cup/venues" key={venue.id} className="group">
                <div className="relative rounded-2xl overflow-hidden aspect-square">
                  <Image src={venue.image} alt={venue.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="text-white font-bold text-sm leading-tight">{venue.city}</div>
                    <div className="text-slate-300 text-xs">{venue.country}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Shield, label: "Officially Licensed", desc: "FIFA Authorized" },
              { icon: Clock, label: "Secure Checkout", desc: "Encrypted Payments" },
              { icon: Star, label: "Verified Tickets", desc: "100% Authentic" },
              { icon: Building2, label: "On Location Partner", desc: "Official Hospitality" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center">
                <item.icon className="w-8 h-8 text-blue-600 mb-3" />
                <div className="font-bold text-slate-900">{item.label}</div>
                <div className="text-sm text-slate-500">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
