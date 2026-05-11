import Image from "next/image";
import Link from "next/link";
import { hospitalityPackages, ticketCategories, venueSeries, venues } from "@/data/worldcup";
import {
  Crown,
  Check,
  ArrowRight,
  Wine,
  Utensils,
  Car,
  Star,
  Shield,
  Ticket,
  Users,
  MapPin,
} from "lucide-react";

export default function HospitalityPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <div className="bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1566577739112-1087c5019c84?q=80&w=2070&auto=format&fit=crop"
            alt="World Cup Hospitality"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 to-slate-900" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-2 mb-4">
            <Crown className="w-5 h-5 text-yellow-400" />
            <span className="text-slate-400 font-medium">FIFA World Cup 2026™</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Hospitality <span className="text-gradient bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Packages</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            The ultimate World Cup experience. Premium seating, world-class cuisine, and exclusive access — all in one unforgettable package.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        {/* Why Hospitality */}
        <div className="glass-card bg-white rounded-2xl p-6 md:p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Why Choose Hospitality?</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                FIFA World Cup 2026™ hospitality packages are ticket-inclusive offerings that provide premium seating, exclusive entertainment, and upscale food and beverage, with service levels ranging from private suites to shared lounges. These packages provide an elevated experience beyond the standard offerings of a general ticket at host venues.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Shield, label: "Official Provider", desc: "On Location — FIFA Partner" },
                  { icon: Ticket, label: "Ticket Included", desc: "Match ticket + hospitality" },
                  { icon: Utensils, label: "Gourmet Dining", desc: "World-class cuisine" },
                  { icon: Car, label: "Premium Access", desc: "Parking & entrance" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <item.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{item.label}</div>
                      <div className="text-xs text-slate-500">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-72 md:h-80 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1556056504-5c90e963de4c?q=80&w=2070&auto=format&fit=crop"
                alt="Premium Hospitality"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 text-slate-900 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 text-yellow-500" />
                  Official FIFA Hospitality
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Experience Levels */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Wine className="w-6 h-6 text-blue-600" />
            Experience Levels
          </h2>
          <p className="text-slate-500 mb-6">From premium lounge access to private suites — find your perfect level of luxury.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ticketCategories.slice(1).map((cat) => (
              <div
                key={cat.id}
                className="glass-card bg-white rounded-2xl overflow-hidden flex flex-col"
              >
                <div className="relative h-40 w-full overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="text-white font-bold">{cat.price_range}</div>
                  </div>
                </div>
                <div className="p-5 flex-grow flex flex-col">
                  <h3 className="font-bold text-slate-900 mb-2">{cat.name}</h3>
                  <p className="text-sm text-slate-500 mb-4 flex-grow">{cat.description}</p>
                  <ul className="space-y-1.5 mb-5">
                    {cat.features.slice(0, 4).map((f, i) => (
                      <li key={i} className="flex items-start text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 mr-2 text-emerald-500 mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/world-cup/matches"
                    className="mt-auto w-full py-2.5 rounded-xl bg-blue-50 text-blue-700 font-bold text-center hover:bg-blue-100 transition-colors text-sm"
                  >
                    Explore {cat.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Package Types */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Users className="w-6 h-6 text-emerald-600" />
            Package Types
          </h2>
          <p className="text-slate-500 mb-6">Curated experiences designed for every kind of football fan.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hospitalityPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="glass-card bg-white rounded-2xl overflow-hidden flex flex-col md:flex-row"
              >
                <div className="relative w-full md:w-48 h-48 md:h-auto shrink-0 overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent md:bg-gradient-to-r" />
                  {pkg.badge && (
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 text-white text-xs font-bold">
                        {pkg.badge}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{pkg.name}</h3>
                  <p className="text-sm text-slate-500 mb-4 flex-grow">{pkg.description}</p>
                  <div className="text-lg font-bold text-blue-600 mb-4">{pkg.price_display}</div>
                  <ul className="space-y-1.5 mb-6">
                    {pkg.features.slice(0, 3).map((f, i) => (
                      <li key={i} className="flex items-start text-sm text-slate-600">
                        <Check className="w-4 h-4 mr-2 text-emerald-500 mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/world-cup/matches"
                    className="mt-auto inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors text-sm"
                  >
                    Select Package <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Venue Series */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-purple-600" />
            Venue Series
          </h2>
          <p className="text-slate-500 mb-6">Watch every match at your chosen host city. The complete immersive experience.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {venueSeries.map((series) => {
              const venue = venues.find((v) => v.id === series.venue_id);
              return (
                <div
                  key={series.id}
                  className="glass-card bg-white rounded-2xl p-6 flex flex-col"
                >
                  <div className="mb-4">
                    <h3 className="font-bold text-slate-900 text-lg">{series.name}</h3>
                    <p className="text-sm text-slate-500 mt-1">{venue?.city}, {venue?.country}</p>
                  </div>
                  <p className="text-sm text-slate-600 mb-4 flex-grow">{series.description}</p>
                  <div className="space-y-2 mb-4">
                    {series.matches_included.map((m, i) => (
                      <div key={i} className="flex items-center text-sm text-slate-600">
                        <Check className="w-4 h-4 mr-2 text-emerald-500 shrink-0" />
                        {m}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {series.packages.map((p, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 text-xs font-medium text-slate-700"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                    <div>
                      <div className="text-xl font-extrabold text-blue-600">${series.price_from.toLocaleString()}</div>
                      <div className="text-xs text-slate-500">Starting price</div>
                    </div>
                    <Link
                      href="/world-cup/matches"
                      className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-colors"
                    >
                      View
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Booking Info */}
        <div className="glass-card bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Book?</h2>
          <p className="text-slate-300 max-w-2xl mx-auto mb-6">
            All hospitality packages include official match tickets. Select your preferred match to view available seating categories and complete your purchase.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/world-cup/matches"
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-emerald-500 font-bold hover:shadow-lg hover:shadow-emerald-500/20 transition-all"
            >
              Browse Matches
            </Link>
            <Link
              href="/world-cup/venues"
              className="px-8 py-3 rounded-xl bg-white/10 font-bold hover:bg-white/20 transition-colors border border-white/10"
            >
              View Venues
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
