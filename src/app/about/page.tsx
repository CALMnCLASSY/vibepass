import Header from '@/components/Header';
import Image from 'next/image';
import { Sparkles, ShieldCheck, Ticket, Users } from 'lucide-react';

export default function About() {
  return (
    <main className="min-h-screen flex flex-col bg-[#0a0a0a]">
      <Header />

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-electric-purple/10 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-electric-purple text-sm font-semibold mb-4 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
            <Sparkles className="w-4 h-4" />
            Our Mission
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
            Connecting Africa to its <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-purple to-neon-pink">Biggest Vibes</span>.
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Vibe Pass Africa is the ultimate plug for concerts, festivals, and exclusive events. We bridge the gap between world-class organizers and the continent's most passionate fans.
          </p>
        </div>
      </section>

      {/* Stats/Values Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 rounded-2xl bg-electric-purple/20 flex items-center justify-center mb-6">
              <ShieldCheck className="w-7 h-7 text-electric-purple" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">100% Secure</h3>
            <p className="text-gray-400 leading-relaxed">
              Say goodbye to fake tickets. Our Verified Seller program ensures every ticket you purchase is absolutely legitimate and guaranteed for entry.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 rounded-2xl bg-neon-pink/20 flex items-center justify-center mb-6">
              <Ticket className="w-7 h-7 text-neon-pink" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Instant Access</h3>
            <p className="text-gray-400 leading-relaxed">
              Our "fast-tap" checkout system utilizing M-Pesa means you can secure your spot in seconds, not minutes. Early-bird access has never been this smooth.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6">
              <Users className="w-7 h-7 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Community First</h3>
            <p className="text-gray-400 leading-relaxed">
              We're more than a ticketing platform. The "Inner Circle" is a community of music lovers, party-goers, and culture drivers across the continent.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-24">
        <div className="bg-[#111] border border-white/10 rounded-[40px] p-8 md:p-16 flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold text-white">The Story Behind the Pass</h2>
            <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
              <p>
                Born in Nairobi out of frustration with clunky ticketing systems and ticket scalpers, Vibe Pass was created to honor the art of the party.
              </p>
              <p>
                We noticed that Africa is hosting some of the most vibrant, high-energy events globally—from the Safari Rally afterparties in Naivasha to Afro Nation. Yet, the fan experience often started with a stressful checkout.
              </p>
              <p className="font-semibold text-white">
                We fixed that. Our mission is to make sure your great experience starts the moment you decide to buy the ticket.
              </p>
            </div>
          </div>
          <div className="flex-1 relative w-full aspect-square md:aspect-auto md:h-[500px] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(236,72,153,0.15)]">
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5RsrDc8cYFTIAQ1YFn2ewpjkXGWuCgUO7kA&s"
              alt="Crowd cheering at a concert"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-60"></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 border-t border-white/10 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Vibe Pass Africa. All rights reserved.</p>
      </footer>
    </main>
  );
}
