import Link from 'next/link';
import { Ticket } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-gradient-primary rounded-xl group-hover:scale-105 transition-transform">
                <Ticket className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-foreground">
                Vibe<span className="text-gradient">Pass</span>
              </span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
              Home
            </Link>
            <Link href="/events" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
              All Events
            </Link>
          </div>
          <div className="flex items-center">
            <button className="bg-gradient-primary text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all hover:-translate-y-0.5">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
