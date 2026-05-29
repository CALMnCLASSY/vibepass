'use client';

import { useState } from 'react';
import { AfronationCheckoutModal } from '@/components/AfronationCheckoutModal';
import { AvailabilityBadge } from '@/components/AvailabilityBadge';
import { Check, ShieldCheck, HelpCircle } from 'lucide-react';

type SelectedItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
};

export default function AfronationBookTickets() {
  const [selectedTicket, setSelectedTicket] = useState<SelectedItem | null>(null);

  const tickets: SelectedItem[] = [
    {
      id: 'afronation-ga',
      name: '2026 General Admission Ticket',
      description: 'Three-day access to the main festival site. Experience the world\'s biggest Afrobeats festival live on the beach.',
      price: 479.68,
      features: [
        'Three-day access to the main festival site',
        'Access to general stage view areas',
        'Access to standard bars and food options',
        'Wristband exchange access'
      ]
    },
    {
      id: 'afronation-vip',
      name: '2026 VIP Ticket',
      description: 'A more relaxed way to experience the festival, with access to premium spaces and faster service.',
      price: 720.12,
      features: [
        'Access to the VIP Oasis, located behind the Lit Stage, with entry to a private beach featuring a seated restaurant and table service',
        'Faster service with access to VIP bars within the VIP Oasis',
        'Fast-track festival entry & wristband exchange',
        'Luxury serviced restrooms',
        'Three-day access to the main festival site',
        'Please note: The VIP Oasis does not have a direct view of the stage. For the closest access and best stage views, we recommend the Golden Ticket.'
      ]
    },
    {
      id: 'afronation-golden',
      name: '2026 Golden Ticket',
      description: 'The ultimate Afro Nation experience - front-of-stage access, premium spaces, and exclusive extras.',
      price: 1080.78,
      features: [
        'Golden Circle access for the closest views of the stage and artists',
        'Full access to the VIP Oasis, including the private beach, seated restaurant and table service',
        'Faster service with access to VIP bars within the VIP Oasis',
        'Priority festival entry & wristband exchange',
        'Luxury serviced restrooms',
        'Three-day access to the main festival site',
        'One (1) exclusive Afro Nation merchandise item'
      ]
    }
  ];

  return (
    <div className="bg-black min-h-screen text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="text-[#feaa1e] text-xs font-bold tracking-[0.3em] uppercase block mb-3">BOOK TICKETS</span>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white">
            CHOOSE YOUR <span className="text-[#ff651f]">TICKET</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto mt-6">
            All tickets are valid for the full 3 days of the festival. Standard booking fee applies.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="bg-zinc-950 border border-zinc-800 p-8 flex flex-col justify-between group hover:border-[#feaa1e] transition-colors relative duration-300">
              <AvailabilityBadge ticketId={ticket.id} className="top-4 right-4" />
              <div>
                <h3 className="text-2xl font-black uppercase text-white tracking-tighter mb-4">{ticket.name}</h3>
                <p className="text-zinc-400 text-sm mb-6 leading-relaxed min-h-[80px]">
                  {ticket.description}
                </p>
                <div className="text-4xl font-black text-white mb-8">
                  ${ticket.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  <span className="text-xs text-zinc-500 font-bold block mt-1 tracking-widest uppercase">/ PERSON</span>
                </div>

                <div className="border-t border-zinc-900 pt-6 mb-8">
                  <h4 className="text-xs font-bold tracking-widest text-zinc-500 uppercase mb-4">Includes:</h4>
                  <ul className="space-y-3">
                    {ticket.features.map((feature, idx) => (
                      <li key={idx} className="text-xs text-zinc-400 flex items-start gap-2.5 leading-relaxed">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#feaa1e] mt-1.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button 
                onClick={() => setSelectedTicket(ticket)}
                className="w-full bg-[#ff651f] hover:bg-white hover:text-black text-white font-black py-4 uppercase tracking-widest transition-colors duration-300 text-sm"
              >
                BUY TICKETS
              </button>
            </div>
          ))}
        </div>

        {/* Info box */}
        <div className="mt-20 bg-zinc-950 border border-zinc-800 p-8 flex flex-col md:flex-row gap-6 items-start">
          <HelpCircle className="w-8 h-8 text-[#feaa1e] shrink-0" />
          <div>
            <h4 className="text-lg font-bold uppercase tracking-tighter text-white mb-2">Frequently Asked Questions</h4>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Have questions about wristband exchange, accommodation, or festival guidelines? Read our general information guide or reach out to our team at any time. Age restriction: 18+.
            </p>
          </div>
        </div>
      </div>

      <AfronationCheckoutModal 
        item={selectedTicket} 
        onClose={() => setSelectedTicket(null)} 
      />
    </div>
  );
}
