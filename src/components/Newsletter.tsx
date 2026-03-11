import React from 'react';
import { Facebook, Instagram, Music } from 'lucide-react'; // Music for TikTok

export default function Newsletter() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-electric-purple/5" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Join the Inner Circle</h2>
        <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
          Get plugged into the latest drops, early-bird tickets, and exclusive VIP access before anyone else.
        </p>
        
        <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-12">
          <input 
            type="email" 
            placeholder="Your email or WhatsApp number" 
            className="flex-1 bg-black/50 border border-white/10 rounded-full px-6 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-pink/50 focus:border-neon-pink transition-all"
            required
          />
          <button 
            type="submit"
            className="bg-neon-pink hover:bg-pink-600 text-white font-bold px-8 py-4 rounded-full transition-colors whitespace-nowrap shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)]"
          >
            Get Early Access
          </button>
        </form>

        <div className="flex justify-center gap-6 items-center">
          <p className="text-sm text-gray-500 font-medium">Follow the vibes:</p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-electric-purple hover:bg-electric-purple/20 transition-all">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-electric-purple hover:bg-electric-purple/20 transition-all">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-neon-pink hover:bg-neon-pink/20 transition-all">
              <Music className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
