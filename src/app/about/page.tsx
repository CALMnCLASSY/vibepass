import { Tag, Users, Globe, ShieldCheck } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h1 className="text-5xl font-extrabold text-slate-900 mb-6">
          The Fan-First <span className="text-gradient">Marketplace</span>
        </h1>
        <p className="text-xl text-slate-600 leading-relaxed">
          VibePass is a community-driven ticket marketplace where real fans buy and sell tickets to the world&apos;s most exclusive events. We source every ticket from verified sellers — so you always get the real thing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-32">
        <div className="relative h-[500px] rounded-3xl overflow-hidden glass-card">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 z-10" />
          <img
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop"
            alt="Concert crowd"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="space-y-8">
          <div className="flex gap-6">
            <div className="flex-shrink-0 w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
              <Globe className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Global Reach</h3>
              <p className="text-slate-600 text-lg">We connect buyers and sellers across 40+ countries, covering the most sought-after venues and stadiums worldwide.</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex-shrink-0 w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">100% Verified</h3>
              <p className="text-slate-600 text-lg">Every ticket listed on VibePass is verified before transfer. Our guarantee protects both buyers and sellers.</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex-shrink-0 w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center">
              <Tag className="w-8 h-8 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Sell with Ease</h3>
              <p className="text-slate-600 text-lg">Have tickets you can&apos;t use? List them in minutes. We handle verification and connect you with real buyers.</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex-shrink-0 w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center">
              <Users className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Concierge Support</h3>
              <p className="text-slate-600 text-lg">Our team is available around the clock to ensure your experience — buy or sell — is seamless from start to finish.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl -ml-32 -mb-32" />

        <h2 className="text-4xl font-extrabold text-slate-900 mb-8 relative z-10">Our Mission</h2>
        <p className="text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed italic relative z-10">
          &ldquo;To democratize access to world-class entertainment by building the most trusted fan-to-fan ticket marketplace on the planet.&rdquo;
        </p>
      </div>
    </div>
  );
}
