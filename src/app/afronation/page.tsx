import Link from 'next/link';
import Image from 'next/image';

export default function AfronationHome() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#feaa1e] via-[#ff651f] to-red-600 opacity-90 z-0" />
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540039155732-d6749b932507?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-60 z-0" 
        />
        <div className="absolute inset-0 bg-black/30 z-10" />

        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
          <div className="inline-block mb-8 px-6 py-2 border-2 border-white/80 text-white font-bold text-sm tracking-[0.2em] uppercase backdrop-blur-sm shadow-xl">
            July 9-11, 2026 • Praia Da Rocha, Portugal
          </div>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white mb-6 leading-none drop-shadow-2xl uppercase">
            The World's <br className="hidden md:block" />
            Biggest <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#feaa1e] to-white">Afrobeats</span> <br className="hidden md:block" />
            Festival
          </h1>
          <p className="text-xl md:text-3xl text-white/90 mb-12 max-w-3xl mx-auto font-medium drop-shadow-md">
            Join us on the beach for an unforgettable summer.
          </p>
          <Link 
            href="/afronation/book-tickets" 
            className="bg-white text-black px-12 py-5 font-black text-xl hover:bg-[#ff651f] hover:text-white transition-all transform hover:scale-105 shadow-2xl uppercase tracking-widest"
          >
            Book Tickets Now
          </Link>
        </div>
      </section>

      {/* Lineup Teaser */}
      <section className="py-32 bg-black relative border-t-8 border-[#feaa1e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-7xl font-black mb-16 text-white uppercase tracking-tighter">
            Phase 1 <span className="text-[#feaa1e]">Lineup</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {['BURNA BOY', 'WIZKID', 'DAVIDO', 'REMA', 'ASAKE', 'TEMS'].map((artist, idx) => (
              <div key={idx} className="group relative aspect-[4/5] bg-zinc-900 overflow-hidden cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 transition-opacity group-hover:opacity-70" />
                <div className="absolute bottom-0 left-0 w-full p-8 z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  <h3 className="text-4xl font-black text-white tracking-tighter uppercase">{artist}</h3>
                  <div className="w-12 h-1 bg-[#feaa1e] mt-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-20">
            <button className="text-white border-b-2 border-[#feaa1e] pb-1 font-bold text-xl hover:text-[#feaa1e] transition-colors uppercase tracking-widest">
              View Full Lineup
            </button>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-32 bg-zinc-950 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl md:text-7xl font-black mb-8 uppercase tracking-tighter leading-none">
                The <span className="text-[#ff651f]">Ultimate</span> <br/>
                Experience
              </h2>
              <p className="text-xl text-zinc-400 mb-8 leading-relaxed">
                Elevate your festival experience with our exclusive VIP Oasis. 
                Enjoy priority entry, private beaches, luxury bars, and premium table service, all while experiencing the best Afrobeats acts on the planet.
              </p>
              <ul className="space-y-4 mb-12 font-bold text-lg text-zinc-300">
                <li className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-[#feaa1e] rounded-full" /> Private Beach Access
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-[#feaa1e] rounded-full" /> VIP Oasis & Table Service
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-[#feaa1e] rounded-full" /> Fast-track Entry
                </li>
              </ul>
              <Link 
                href="/afronation/book-tickets" 
                className="inline-block bg-[#ff651f] text-white px-10 py-4 font-black text-lg hover:bg-white hover:text-black transition-all uppercase tracking-widest"
              >
                Explore Packages
              </Link>
            </div>
            <div className="relative aspect-square bg-zinc-900 p-4">
              <div className="absolute inset-0 border-2 border-[#feaa1e] translate-x-4 translate-y-4 -z-10" />
              <div 
                className="w-full h-full bg-[url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
