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
            src="data:image/jpeg;base64,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"
            alt="World Cup Matches"
            fill
            className="object-cover opacity-20"
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
