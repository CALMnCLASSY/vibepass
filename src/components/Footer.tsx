import Link from 'next/link';
import { Ticket } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-gradient-primary rounded-lg">
              <Ticket className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">
              VibePass
            </span>
          </div>
          <div className="flex space-x-6">
            <Link href="#" className="text-slate-500 hover:text-blue-600 transition-colors">About</Link>
            <Link href="#" className="text-slate-500 hover:text-blue-600 transition-colors">Terms</Link>
            <Link href="#" className="text-slate-500 hover:text-blue-600 transition-colors">Privacy</Link>
            <Link href="#" className="text-slate-500 hover:text-blue-600 transition-colors">Contact</Link>
          </div>
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} VibePass. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
