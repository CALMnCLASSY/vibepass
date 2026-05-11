import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h1 className="text-5xl font-extrabold text-slate-900 mb-6">
          Contact <span className="text-gradient">Us</span>
        </h1>
        <p className="text-xl text-slate-600 leading-relaxed">
          Have questions about your tickets or an upcoming event? Our team is here to help you 24/7.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Contact Information */}
        <div className="space-y-12">
          <div className="glass-card p-10 rounded-3xl space-y-8">
            <h2 className="text-3xl font-bold text-slate-900">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Email Us</p>
                  <p className="text-xl font-bold text-slate-900">myvibepass@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Call Us</p>
                  <p className="text-xl font-bold text-slate-900">+1 (800) VIBE-PASS</p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Our Office</p>
                  <p className="text-xl font-bold text-slate-900">London, United Kingdom</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-10 rounded-3xl bg-gradient-to-br from-blue-600 to-purple-700 text-white">
            <h3 className="text-2xl font-bold mb-4">Event Support</h3>
            <p className="text-blue-100 text-lg leading-relaxed">
              For urgent inquiries regarding tickets for events happening within the next 24 hours, please include "URGENT" in your email subject line.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="glass-card p-10 rounded-3xl">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-blue-500 focus:outline-none transition-colors bg-slate-50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
                <input 
                  type="email" 
                  placeholder="john@example.com" 
                  className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-blue-500 focus:outline-none transition-colors bg-slate-50"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">Subject</label>
              <input 
                type="text" 
                placeholder="How can we help?" 
                className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-blue-500 focus:outline-none transition-colors bg-slate-50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">Message</label>
              <textarea 
                rows={5}
                placeholder="Tell us more about your inquiry..." 
                className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-blue-500 focus:outline-none transition-colors bg-slate-50 resize-none"
              ></textarea>
            </div>
            <button className="w-full bg-gradient-primary text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:shadow-xl hover:shadow-blue-500/30 transition-all hover:-translate-y-1">
              <Send className="w-5 h-5" />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
