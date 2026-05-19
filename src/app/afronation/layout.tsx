import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Book Tickets | Afro Nation Portugal',
  description: 'Book tickets for Afro Nation Portugal. The world\'s biggest Afrobeats festival.',
};

export default function AfronationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="-mt-20 min-h-screen bg-black text-white selection:bg-[#ff651f] selection:text-white">
      {/* Custom Afronation Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#feaa1e] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-24 items-center">
            <div className="flex items-center gap-4">
              <Link href="/" className="font-black text-2xl hover:text-black transition-colors hover:underline underline-offset-4">VIBEPASS HOME</Link>
            </div>
            <div className="hidden lg:flex items-center space-x-10 font-bold text-[15px] tracking-[0.05em]">
              <Link href="/afronation" className="hover:text-black transition-colors hover:underline underline-offset-4">LINE UP</Link>
              <Link href="/afronation/book-tickets" className="hover:text-black transition-colors hover:underline underline-offset-4">INFO</Link>
            </div>
            <div className="flex items-center">
              <Link
                href="/afronation/book-tickets"
                className="bg-[#ff651f] text-white px-8 py-3.5 font-bold text-lg hover:bg-black transition-colors border-2 border-transparent hover:border-[#ff651f]"
              >
                BUY TICKETS
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="pt-24 min-h-screen">
        {children}
      </main>

      {/* Custom Afronation Footer */}
      <footer className="bg-[#111] py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="font-black text-3xl tracking-tighter text-white opacity-80">
              AFRO NATION
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm font-bold tracking-wider text-white/50 uppercase">
              <Link href="/terms" className="hover:text-[#ff651f] transition-colors">Terms</Link>
              <Link href="/privacy" className="hover:text-[#ff651f] transition-colors">Privacy</Link>
              <Link href="/contact" className="hover:text-[#ff651f] transition-colors">Contact</Link>
            </div>
            <div className="text-white/30 text-xs">
              © {new Date().getFullYear()} VibePass.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
