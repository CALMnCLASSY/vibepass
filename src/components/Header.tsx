import React from 'react';
import { Ticket } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <Ticket className="w-8 h-8 text-electric-purple" />
            <span className="font-bold text-xl tracking-tight text-white">Vibe Pass</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/events" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Events</Link>
            <Link href="/about" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">About</Link>
            <Link href="/contact" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Contact</Link>
          </nav>
          <div className="flex items-center">
            <Link href="/events" className="bg-electric-purple hover:bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-[0_0_15px_rgba(139,92,246,0.5)]">
              Get Plugged In
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
