'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { hospitalityPackages, ticketCategories, venueSeries, venues } from "@/data/worldcup";
import { HospitalityCheckoutModal } from "@/components/HospitalityCheckoutModal";
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

type SelectedItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  matchesIncluded?: string[];
  type: 'package' | 'series';
};

export default function HospitalityPage() {
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <div className="bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="data:image/jpeg;base64,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"
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
                src="data:image/jpeg;base64,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"
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
                  <button
                    onClick={() => setSelectedItem({
                      id: pkg.id,
                      name: pkg.name,
                      description: pkg.description,
                      price: pkg.price_from,
                      features: pkg.features,
                      matchesIncluded: pkg.id === 'group-stage-pass'
                        ? ["All group stage matches at selected venue"]
                        : pkg.id === 'knockout-package'
                        ? ["All knockout stage matches from the Round of 32 through the Final"]
                        : pkg.id === 'final-experience'
                        ? ["The FIFA World Cup 2026™ Final Match"]
                        : ["Official hospitality match access"],
                      type: 'package'
                    })}
                    className="mt-auto inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold hover:shadow-lg transition-all text-sm"
                  >
                    Select Package <ArrowRight className="w-4 h-4" />
                  </button>
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
                    <button
                      onClick={() => setSelectedItem({
                        id: series.id,
                        name: series.name,
                        description: series.description,
                        price: series.price_from,
                        features: series.packages,
                        matchesIncluded: series.matches_included,
                        type: 'series'
                      })}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 hover:shadow-lg transition-all"
                    >
                      Book Series
                    </button>
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

      {/* Checkout Modal */}
      <HospitalityCheckoutModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
}
