'use client';

import React, { useState, useEffect } from 'react';
import type { EventType } from '@/data/events';

declare global {
  interface Window {
    PaystackPop: any;
  }
}

const PAYSTACK_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string;

export default function VuruguClient({ initialEvents }: { initialEvents: EventType[] }) {
    // Ticket quantities map: { eventId: quantity }
    const [quantities, setQuantities] = useState<Record<string, number>>({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Form data for checkout
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    
    // Fallback data if DB fetch failed
    const hasData = initialEvents.length > 0;
    const fallbackImage = "https://madfun.s3.af-south-1.amazonaws.com/Vurugu_720.jpeg";
    const description = "Witness fierce warriors clash in an adrenaline-pumping boxing showdown, where strength, skill and sheer determination collide. Vurugu promises an unforgettable night of raw energy, intense rivalries and moments that will have the crowd on its feet. Don’t miss the action, this is boxing at its fiercest.";
    
    const displayEvents = hasData ? initialEvents.sort((a,b) => a.price - b.price) : [
        { id: 'v1', name: 'VURUGU - REGULAR', price: 1500, date: '2026-04-04', location: 'Kasarani Stadium Indoor Arena', imageUrl: fallbackImage, description, organizer: '', longDescription: '' },
        { id: 'v2', name: 'VURUGU - VIP', price: 5000, date: '2026-04-04', location: 'Kasarani Stadium Indoor Arena', imageUrl: fallbackImage, description, organizer: '', longDescription: '' },
        { id: 'v3', name: 'VURUGU - VVIP RINGSIDE', price: 10000, date: '2026-04-04', location: 'Kasarani Stadium Indoor Arena', imageUrl: fallbackImage, description, organizer: '', longDescription: '' },
        { id: 'v4', name: 'VURUGU - RINGSIDE EXCLUSIVE TABLE', price: 100000, date: '2026-04-04', location: 'Kasarani Stadium Indoor Arena', imageUrl: fallbackImage, description, organizer: '', longDescription: '' }
    ];

    const totalTickets = Object.values(quantities).reduce((a, b) => a + b, 0);
    const totalAmount = displayEvents.reduce((acc, event) => acc + (event.price * (quantities[event.id] || 0)), 0);

    const updateQuantity = (id: string, delta: number) => {
        setQuantities(prev => {
            const current = prev[id] || 0;
            const next = current + delta;
            if (next < 0 || next > 10) return prev;
            return { ...prev, [id]: next };
        });
    };

    const handleCheckout = async () => {
        if (totalTickets === 0) {
            alert('Please select at least one ticket.');
            return;
        }
        if (!email || !phone || !name) {
            alert('Please fill in your name, email, and phone number.');
            return;
        }
        if (!window.PaystackPop) {
            alert('Payment system is loading...');
            return;
        }

        setIsProcessing(true);
        const paystack = new window.PaystackPop();
        
        // Build summary of selected tickets
        const ticketSummary = displayEvents
            .filter(e => (quantities[e.id] || 0) > 0)
            .map(e => `${quantities[e.id]}x ${e.name.replace('VURUGU - ', '')}`)
            .join(', ');

        paystack.newTransaction({
            key: PAYSTACK_KEY,
            email: email,
            amount: totalAmount * 100,
            currency: 'KES',
            ref: `vibe-pass-vurugu-${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
            metadata: {
                custom_fields: [
                    { display_name: 'Customer Name', variable_name: 'customer_name', value: name },
                    { display_name: 'Phone Number', variable_name: 'phone_number', value: phone },
                    { display_name: 'Tickets', variable_name: 'tickets', value: ticketSummary },
                    { display_name: 'Total Quantity', variable_name: 'total_quantity', value: totalTickets },
                ],
            },
            onSuccess: async (response: any) => {
                try {
                    // Send to our backend
                    const res = await fetch('https://classybooks.onrender.com/api/verify-payment', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            reference: response.reference,
                            eventId: 'VURUGU-MULTIPLE',
                            eventName: `Vurugu Boxing (${ticketSummary})`,
                            customerName: name,
                            customerEmail: email,
                            customerPhone: phone,
                            amount: totalAmount,
                            quantity: totalTickets
                        })
                    });

                    if (!res.ok) throw new Error('Backend verification failed');

                    // Send Ticket Email
                    fetch('/api/send-ticket', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            customerEmail: email,
                            customerName: name,
                            eventName: `Vurugu - ${ticketSummary}`,
                            quantity: totalTickets,
                            totalAmount: totalAmount,
                            date: displayEvents[0].date,
                            location: displayEvents[0].location,
                            ticketId: `VP-${Date.now().toString().slice(-6)}`,
                            eventImageUrl: displayEvents[0].imageUrl
                        })
                    });

                    setIsProcessing(false);
                    setSuccessMessage(`Payment successful! Your tickets (${ticketSummary}) have been sent to ${email}.`);
                    setQuantities({});
                } catch (error) {
                    setIsProcessing(false);
                    alert('Payment succeeded but verification failed. Check email.');
                }
            },
            onCancel: () => setIsProcessing(false),
            onError: (error: any) => {
                setIsProcessing(false);
                alert(`Error: ${error.message}`);
            }
        });
    };

    if (successMessage) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Success!</h2>
                    <p className="text-gray-600 mb-6">{successMessage}</p>
                    <button onClick={() => setSuccessMessage(null)} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium">Buy More Tickets</button>
                </div>
            </div>
        );
    }

    return (
        <div id="app" className="bg-gray-50 min-h-screen font-sans">
            {/* Top Hero Section (Dark) */}
            <div className="relative bg-gray-900 pb-24 md:pb-48 pt-10">
                <div className="max-w-7xl mx-auto px-4 md:px-0 text-white">
                    <div className="block md:grid md:grid-cols-5 gap-8">
                        {/* Mobile Image */}
                        <div className="md:hidden mb-6 flex justify-center">
                            <div className="w-full aspect-square rounded-xl overflow-hidden shadow-2xl relative border border-white/10">
                                <img className="w-full h-full object-cover" src={displayEvents[0]?.imageUrl || fallbackImage} alt="Vurugu" />
                            </div>
                        </div>

                        {/* Title & Info */}
                        <div className="md:col-span-3 mt-3 md:mt-0">
                            <div className="text-3xl md:text-5xl font-black tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>Vurugu</div>
                            <div className="text-sm md:text-lg mb-2 font-medium mt-4 flex gap-6 md:gap-8 border-b border-white/10 pb-4 md:border-none md:pb-0">
                                <span className="text-blue-400 font-bold whitespace-nowrap">04 Apr</span>
                                <span className="opacity-70 whitespace-normal">Kasarani Stadium Indoor Arena</span>
                            </div>
                            <div className="text-opacity-75 mt-4 md:mt-6 mb-2 text-sm md:text-md leading-relaxed opacity-80 max-w-2xl">
                                {displayEvents[0]?.description || description}
                            </div>
                        </div>

                        {/* Desktop Image */}
                        <div className="hidden md:block md:col-span-2 text-right">
                            <div className="inline-block w-80 h-80 aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-gray-800">
                                <img className="w-full h-full object-cover" src={displayEvents[0]?.imageUrl || fallbackImage} alt="Vurugu" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ticket Module (Pulled up over dark background) */}
            <div className="relative max-w-7xl mx-auto block -mt-16 md:-mt-40 px-4 mb-20">
                <div className="text-gray-400 font-bold text-sm mb-2 md:text-gray-100 uppercase tracking-wider">TICKETS</div>
                
                <div className="md:grid md:grid-cols-3 bg-white border border-gray-200 md:rounded-2xl overflow-hidden shadow-xl">
                    
                    {/* Left Side: Ticket Selection Grid */}
                    <div className="md:col-span-2 min-h-fit md:border-r border-gray-200">
                        {displayEvents.map((tier) => {
                            const nameRender = tier.name.replace('VURUGU - ', '');
                            const curQty = quantities[tier.id] || 0;
                            
                            return (
                                <div key={tier.id} className="flex flex-col sm:flex-row sm:items-center px-4 md:px-6 py-5 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <div className="flex-grow mb-3 sm:mb-0">
                                        <div className="text-lg font-semibold text-gray-900">{nameRender}</div>
                                        <div className="text-sm font-medium text-blue-600 mt-1">KES {tier.price.toLocaleString()}</div>
                                    </div>
                                    <div className="flex items-center self-start sm:self-center">
                                        <button 
                                            className="w-10 h-10 bg-blue-100 text-blue-600 rounded-md flex items-center justify-center font-bold text-xl hover:bg-blue-200 transition-colors disabled:opacity-50"
                                            onClick={() => updateQuantity(tier.id, -1)}
                                            disabled={curQty <= 0}
                                        >-</button>
                                        <div className="w-12 text-center font-bold text-lg text-gray-800">{curQty}</div>
                                        <button 
                                            className="w-10 h-10 bg-blue-600 text-white rounded-md flex items-center justify-center font-bold text-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
                                            onClick={() => updateQuantity(tier.id, 1)}
                                            disabled={curQty >= 10}
                                        >+</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right Side: Checkout Summary Panel */}
                    <div className="relative bg-gray-50 flex flex-col">
                        <div className="p-4 md:p-6 bg-white border-b border-gray-200 font-bold text-gray-800 flex justify-between items-center sticky top-0 z-10 hidden md:flex">
                            <span>Summary</span>
                            <span className="text-blue-600">KES {totalAmount.toLocaleString()}</span>
                        </div>
                        
                        <div className="p-4 md:p-6 flex-grow">
                            <div className="mb-6">
                                <div className="text-sm font-bold opacity-75 mb-3 text-gray-700 uppercase tracking-wider">Cart</div>
                                <div className="text-3xl font-black text-gray-900 mb-1">{totalTickets} <span className="text-lg font-medium text-gray-500">Tickets</span></div>
                                <div className="text-sm text-gray-500">Total KES {totalAmount.toLocaleString()}</div>
                            </div>
                            
                            <hr className="border-gray-200 my-6" />
                            
                            <div className="mb-6">
                                <div className="text-sm font-bold opacity-75 mb-4 text-gray-700 uppercase tracking-wider">Your Details</div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name</label>
                                        <input className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" type="text" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-600 mb-1">Email Address</label>
                                        <input className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" type="email" placeholder="john@example.com" value={email} onChange={e => setEmail(e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-600 mb-1">Phone Number</label>
                                        <input className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" type="tel" placeholder="+254700000000" value={phone} onChange={e => setPhone(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mobile specific sticky bottom block */}
                        <div className="md:hidden flex p-4 bg-white border-t border-gray-200 font-bold sticky top-0 z-10 justify-between items-center mb-4 shadow-sm">
                            <span className="text-gray-800">Total Selection</span>
                            <span className="text-xl text-blue-600">KES {totalAmount.toLocaleString()}</span>
                        </div>

                        <div className="p-4 md:p-6 bg-white border-t border-gray-200 mt-auto sticky bottom-0 z-20 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)] md:shadow-none">
                            <button 
                                onClick={handleCheckout}
                                disabled={totalTickets === 0 || isProcessing}
                                className={`w-full py-4 rounded-xl font-bold tracking-wide transition-all ${
                                    totalTickets > 0 && !isProcessing 
                                    ? 'bg-yellow-400 text-black hover:bg-yellow-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5' 
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }`}
                                style={{ fontFamily: "'Montserrat', sans-serif" }}
                            >
                                {isProcessing ? 'PROCESSING...' : `PURCHASE ${totalTickets > 0 ? totalTickets : ''} TICKET${totalTickets > 1 ? 'S' : ''}`}
                            </button>
                            <div className="text-[10px] text-gray-400 mt-3 text-center">
                                By purchasing you agree to our Terms & Conditions
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            
        </div>
    );
}
