import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-electric-purple/20 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-pink/10 rounded-full blur-[100px] -z-10 mix-blend-screen pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neon-pink text-sm font-medium mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-pink opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-pink"></span>
          </span>
          Live in Nairobi & Beyond
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-400">
          Your All-Access Pass<br />
          to Africa’s <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-purple to-neon-pink">Biggest Vibes.</span>
        </h1>
        
        <p className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto mb-10">
          The ultimate plug for concerts, festivals, and exclusive events. 
          Skip the line, secure your spot, and experience the energy.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link 
            href="/events" 
            className="group flex items-center justify-center gap-2 bg-gradient-to-r from-electric-purple to-purple-600 hover:from-purple-500 hover:to-purple-500 text-white px-8 py-4 rounded-full text-lg font-bold transition-all shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] hover:-translate-y-1 w-full sm:w-auto"
          >
            Explore Events
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
