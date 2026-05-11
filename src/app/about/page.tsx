import { Ticket, Users, Globe, ShieldCheck } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h1 className="text-5xl font-extrabold text-slate-900 mb-6">
          Access the <span className="text-gradient">Extraordinary</span>
        </h1>
        <p className="text-xl text-slate-600 leading-relaxed">
          VibePass is the world's premier gateway to exclusive global events. From sold-out concerts to front-row sports, we connect you with the experiences that define a lifetime.
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
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Global Access</h3>
              <p className="text-slate-600 text-lg">We operate in over 40 countries, providing verified tickets to the most sought-after venues and stadiums worldwide.</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex-shrink-0 w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">100% Guaranteed</h3>
              <p className="text-slate-600 text-lg">Every ticket on VibePass is 100% verified. We stand behind every purchase with our comprehensive buyer guarantee.</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex-shrink-0 w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center">
              <Users className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Expert Concierge</h3>
              <p className="text-slate-600 text-lg">Our dedicated support team is available 24/7 to ensure your experience is seamless from purchase to performance.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl -ml-32 -mb-32" />
        
        <h2 className="text-4xl font-extrabold text-slate-900 mb-8 relative z-10">Our Mission</h2>
        <p className="text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed italic relative z-10">
          "To democratize access to world-class entertainment, creating a frictionless and secure platform where every fan can witness the extraordinary."
        </p>
      </div>
    </div>
  );
}
