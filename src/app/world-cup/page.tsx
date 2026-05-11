import Link from "next/link";
import Image from "next/image";
import { matches, venues, ticketCategories, hospitalityPackages } from "@/data/worldcup";
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
            src="https://images.unsplash.com/photo-1577223625816-7546f2f65e2e?q=80&w=2070&auto=format&fit=crop"
            alt="FIFA World Cup 2026 Stadium"
            fill
            className="object-cover opacity-40"
            priority
            unoptimized
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
            104 matches. 16 venues. 48 nations. One unforgettable summer of football across North America.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/world-cup/matches"
              className="bg-gradient-to-r from-blue-600 to-emerald-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:shadow-emerald-500/20 transition-all hover:-translate-y-1 w-full sm:w-auto text-center flex items-center justify-center gap-2"
            >
              <Ticket className="w-5 h-5" />
              Browse Matches
            </Link>
            <Link
              href="/world-cup/hospitality"
              className="glass bg-white/10 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all hover:-translate-y-1 w-full sm:w-auto text-center flex items-center justify-center gap-2 border border-white/20"
            >
              <Crown className="w-5 h-5" />
              Hospitality Packages
            </Link>
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
              { stage: "Group Stage", dates: "Jun 11 – Jun 27", matches: "72", color: "from-blue-500 to-blue-600" },
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
                      {match.sold_out && (
                        <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded-full">Sold Out</span>
                      )}
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
                  <Image src={cat.image} alt={cat.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" unoptimized />
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
                  <Image src={venue.image} alt={venue.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" unoptimized />
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
