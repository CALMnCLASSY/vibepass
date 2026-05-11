"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { matches, venues, stages, groups } from "@/data/worldcup";
import {
  Calendar,
  MapPin,
  Search,
  Filter,
  ChevronDown,
  Trophy,
  AlertTriangle,
} from "lucide-react";

export default function MatchesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [stageFilter, setStageFilter] = useState<string>("All");
  const [groupFilter, setGroupFilter] = useState<string>("All");
  const [venueFilter, setVenueFilter] = useState<string>("All");
  const [showFilters, setShowFilters] = useState(false);

  const filteredMatches = useMemo(() => {
    return matches.filter((match) => {
      const matchesSearch =
        searchQuery === "" ||
        match.home_team.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.away_team.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.stage.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStage = stageFilter === "All" || match.stage === stageFilter;
      const matchesGroup = groupFilter === "All" || match.group === groupFilter;
      const matchesVenue = venueFilter === "All" || match.venue_id === venueFilter;

      return matchesSearch && matchesStage && matchesGroup && matchesVenue;
    });
  }, [searchQuery, stageFilter, groupFilter, venueFilter]);

  const groupedByDate = useMemo(() => {
    const groups: Record<string, typeof matches> = {};
    filteredMatches.forEach((match) => {
      if (!groups[match.date]) groups[match.date] = [];
      groups[match.date].push(match);
    });
    return groups;
  }, [filteredMatches]);

  const sortedDates = Object.keys(groupedByDate).sort();

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Page Header */}
      <div className="bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1577223625816-7546f2f65e2e?q=80&w=2070&auto=format&fit=crop"
            alt="World Cup Matches"
            fill
            className="object-cover opacity-20"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 to-slate-900" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="text-slate-400 font-medium">FIFA World Cup 2026™</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Match <span className="text-gradient bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Schedule</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Browse all 104 matches across 16 venues. Select a match to explore ticket and hospitality options.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        {/* Search & Filters */}
        <div className="glass-card bg-white rounded-2xl p-4 shadow-xl mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search by team, stage, or venue..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
            >
              <Filter className="w-5 h-5" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-100">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Stage</label>
                <select
                  value={stageFilter}
                  onChange={(e) => setStageFilter(e.target.value)}
                  className="block w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Stages</option>
                  {stages.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Group</label>
                <select
                  value={groupFilter}
                  onChange={(e) => setGroupFilter(e.target.value)}
                  className="block w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Groups</option>
                  {groups.map((g) => (
                    <option key={g} value={g}>
                      Group {g}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Venue</label>
                <select
                  value={venueFilter}
                  onChange={(e) => setVenueFilter(e.target.value)}
                  className="block w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Venues</option>
                  {venues.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.city}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-slate-500 font-medium">
            Showing <span className="text-slate-900 font-bold">{filteredMatches.length}</span> matches
          </p>
          {(stageFilter !== "All" || groupFilter !== "All" || venueFilter !== "All" || searchQuery) && (
            <button
              onClick={() => {
                setStageFilter("All");
                setGroupFilter("All");
                setVenueFilter("All");
                setSearchQuery("");
              }}
              className="text-sm text-blue-600 font-semibold hover:text-blue-700"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Match List by Date */}
        {sortedDates.length === 0 ? (
          <div className="text-center py-20 glass-card bg-white rounded-3xl">
            <AlertTriangle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-xl font-medium text-slate-500">No matches found matching your filters.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {sortedDates.map((date) => {
              const dateObj = new Date(date + "T00:00:00");
              return (
                <div key={date}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold text-lg shadow-md">
                      {dateObj.getDate()}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">
                        {dateObj.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                      </div>
                      <div className="text-sm text-slate-500">
                        {dateObj.toLocaleDateString("en-US", { year: "numeric" })}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {groupedByDate[date].map((match) => {
                      const venue = venues.find((v) => v.id === match.venue_id);
                      return (
                        <Link
                          href={`/world-cup/matches/${match.id}`}
                          key={match.id}
                          className="group block"
                        >
                          <div className="glass-card bg-white rounded-2xl p-4 md:p-6 hover:shadow-xl transition-all hover:-translate-y-0.5">
                            <div className="flex flex-col md:flex-row md:items-center gap-4">
                              {/* Time & Meta */}
                              <div className="flex items-center gap-3 md:w-48 shrink-0">
                                <div className="text-lg font-bold text-slate-900">{match.time}</div>
                                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
                                  {match.stage}
                                </div>
                                {match.group && (
                                  <div className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                                    Group {match.group}
                                  </div>
                                )}
                              </div>

                              {/* Teams */}
                              <div className="flex-grow">
                                <div className="flex items-center justify-between md:justify-start gap-4">
                                  <div className="flex items-center gap-3 flex-1 md:flex-initial">
                                    <span className="text-3xl" style={{ fontFamily: 'Apple Color Emoji, "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", sans-serif' }}>{match.home_flag}</span>
                                    <span className="font-bold text-slate-900 hidden sm:inline">{match.home_team}</span>
                                  </div>
                                  <span className="text-sm font-extrabold text-slate-300 px-2">VS</span>
                                  <div className="flex items-center gap-3 flex-1 md:flex-initial justify-end md:justify-start">
                                    <span className="font-bold text-slate-900 hidden sm:inline">{match.away_team}</span>
                                    <span className="text-3xl" style={{ fontFamily: 'Apple Color Emoji, "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", sans-serif' }}>{match.away_flag}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Venue & CTA */}
                              <div className="flex items-center justify-between md:justify-end gap-6 md:w-64 shrink-0">
                                <div className="flex items-center text-sm text-slate-500">
                                  <MapPin className="w-4 h-4 mr-1.5 text-purple-500" />
                                  {venue?.city}
                                </div>
                                {match.sold_out ? (
                                  <span className="text-xs font-bold text-red-500 bg-red-50 px-3 py-1.5 rounded-full">
                                    Sold Out
                                  </span>
                                ) : (
                                  <span className="text-sm font-bold text-blue-600 group-hover:text-blue-700 flex items-center gap-1">
                                    Tickets <ChevronDown className="w-4 h-4 -rotate-90" />
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
