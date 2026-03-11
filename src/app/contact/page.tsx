import Header from '@/components/Header';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Contact() {
  return (
    <main className="min-h-screen flex flex-col bg-[#0a0a0a]">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-electric-purple/10 rounded-full blur-[100px] -z-10 mix-blend-screen pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">Get in Touch</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Got questions about tickets, partnerships, or an upcoming drop? Our support team is here for you 24/7.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-12 w-full">
        {/* Contact Info */}
        <div className="flex-1 space-y-8">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm shadow-[0_0_20px_rgba(139,92,246,0.05)]">
            <h2 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-neon-pink/20 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-neon-pink" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Email Us</h3>
                  <p className="text-gray-400 mb-1">For general inquiries and support</p>
                  <a href="mailto:support@vibepass.africa" className="text-electric-purple hover:underline font-medium">support@vibepass.africa</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-electric-purple/20 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-electric-purple" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Call/WhatsApp</h3>
                  <p className="text-gray-400 mb-1">Instant support line</p>
                  <a href="tel:+254700000000" className="text-neon-pink hover:underline font-medium">+254 700 000 000</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Office Location</h3>
                  <p className="text-gray-400">Nairobi Garage, Kilimani<br />Nairobi, Kenya</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="flex-1">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-300 ml-1">First Name</label>
                  <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-electric-purple/50 focus:border-electric-purple transition-all" placeholder="John" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-300 ml-1">Last Name</label>
                  <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-electric-purple/50 focus:border-electric-purple transition-all" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
                <input type="email" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-electric-purple/50 focus:border-electric-purple transition-all" placeholder="john@example.com" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-300 ml-1">Subject</label>
                <select className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-electric-purple/50 focus:border-electric-purple transition-all">
                  <option>Ticket Support</option>
                  <option>Refund Request</option>
                  <option>Organizer Partnership</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-300 ml-1">Message</label>
                <textarea rows={5} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-electric-purple/50 focus:border-electric-purple transition-all resize-none" placeholder="How can we help?"></textarea>
              </div>
              <button type="button" className="w-full bg-electric-purple hover:bg-purple-600 text-white font-bold py-4 rounded-xl mt-2 transition-transform hover:scale-[1.02] shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                Send Message
              </button>
            </form>
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
