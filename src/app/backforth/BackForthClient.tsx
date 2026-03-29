'use client';

import React, { useState } from 'react';
import type { EventType } from '@/data/events';
import './backforth.css';

declare global {
  interface Window {
    PaystackPop: any;
  }
}

const PAYSTACK_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string;

export default function BackForthClient({ initialEvents }: { initialEvents: EventType[] }) {
    const [quantities, setQuantities] = useState<Record<string, number>>({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Form data
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const fallbackImage = "/images/events/backforth.png";

    const displayEvents = initialEvents.length > 0 ? initialEvents.sort((a,b) => a.price - b.price) : [
        { id: 'bf1', name: 'BACK & FORTH - EARLY BIRD', price: 1500, date: '2026-05-02', location: 'Carnivore Simba Saloon', imageUrl: fallbackImage, description: 'Single Entry', organizer: 'BACK & FORTH LTD', longDescription: 'Get your KENYA COLORS on and let\'s have a PARTY!' },
        { id: 'bf2', name: 'BACK & FORTH - ADVANCE', price: 2000, date: '2026-05-02', location: 'Carnivore Simba Saloon', imageUrl: fallbackImage, description: 'Single Entry', organizer: 'BACK & FORTH LTD', longDescription: 'Get your KENYA COLORS on and let\'s have a PARTY!' },
        { id: 'bf3', name: 'BACK & FORTH - GATE', price: 2500, date: '2026-05-02', location: 'Carnivore Simba Saloon', imageUrl: fallbackImage, description: 'Single Entry', organizer: 'BACK & FORTH LTD', longDescription: 'Get your KENYA COLORS on and let\'s have a PARTY!' }
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
        if (!name || !email || !phone) {
            alert('Please fill in your details.');
            return;
        }

        if (!window.PaystackPop) {
            alert('Payment system is loading...');
            return;
        }

        setIsProcessing(true);
        const paystack = new window.PaystackPop();
        
        const ticketSummary = displayEvents
            .filter(e => (quantities[e.id] || 0) > 0)
            .map(e => `${quantities[e.id]}x ${e.name.replace('BACK & FORTH - ', '')}`)
            .join(', ');

        const eventDetails = `BACK & FORTH PARTY (${ticketSummary})`;

        // Notify Discord
        fetch('/api/notify-discord', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                type: 'payment',
                embed: {
                    title: `🏮 ${eventDetails} Initialized`,
                    color: 0xe62e2d,
                    fields: [
                        { name: "👤 Customer", value: name, inline: true },
                        { name: "🎫 Tickets", value: ticketSummary, inline: true },
                        { name: "💰 Total", value: `KES ${totalAmount.toLocaleString()}`, inline: true }
                    ],
                    timestamp: new Date().toISOString()
                }
            })
        }).catch(() => {});

        paystack.newTransaction({
            key: PAYSTACK_KEY,
            email: email,
            amount: totalAmount * 100,
            currency: 'KES',
            ref: `vibe-pass-backforth-${Date.now()}`,
            metadata: {
                custom_fields: [
                    { display_name: 'Customer Name', variable_name: 'customer_name', value: name },
                    { display_name: 'Tickets', variable_name: 'tickets', value: ticketSummary },
                ],
            },
            onSuccess: async (response: any) => {
                try {
                    // Send Ticket
                    fetch('/api/send-ticket', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            customerEmail: email,
                            customerName: name,
                            eventName: `BACK & FORTH - ${ticketSummary}`,
                            quantity: totalTickets,
                            totalAmount: totalAmount,
                            date: '2nd May 2026',
                            location: 'Carnivore Simba Saloon',
                            ticketId: `VP-${Date.now().toString().slice(-6)}`,
                            eventImageUrl: fallbackImage
                        })
                    });

                    setIsProcessing(false);
                    setSuccessMessage(`Payment successful! Your tickets for the Old School Party have been sent to ${email}. See you at Carnivore!`);
                    setQuantities({});
                    setName('');
                    setEmail('');
                    setPhone('');
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

    return (
        <div className="backforth-root">
            {successMessage && (
                <div className="backforth-success-overlay">
                    <div className="backforth-success-card">
                        <div style={{ fontSize: '5rem', marginBottom: '20px' }}>🔥</div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '10px' }}>PARTY READY!</h2>
                        <p style={{ color: '#666', marginBottom: '30px', fontSize: '1.1rem' }}>{successMessage}</p>
                        <button onClick={() => setSuccessMessage(null)} className="backforth-buy-btn">Awesome!</button>
                    </div>
                </div>
            )}

            {/* Premium Header */}
            <div className="backforth-header">
                <div className="backforth-header-bg" style={{ backgroundImage: `url(${fallbackImage})` }}></div>
                <img src={fallbackImage} alt="Back & Forth Poster" className="backforth-poster" />
            </div>

            {/* Dual Column Layout */}
            <div className="backforth-content">
                <div className="flex flex-col gap-6">
                    {/* Bottle Discount Highlight */}
                    <div className="backforth-highlight">
                        <div className="backforth-highlight-icon">🍾</div>
                        <div className="backforth-highlight-text">
                            <h3>SPIRIT BOTTLE DISCOUNT</h3>
                            <p>Enjoy a massive 20% discount on all spirit bottle purchases throughout the event!</p>
                        </div>
                    </div>

                    {/* Ticket Selection Card */}
                    <div className="backforth-card">
                        <div className="backforth-card-header">
                            <h2>1. Choose Your Tier</h2>
                        </div>
                        <div className="backforth-tiers">
                            {displayEvents.map((tier) => (
                                <div key={tier.id} className="backforth-tier">
                                    <div className="backforth-tier-info">
                                        <div className="backforth-tier-name">{tier.name.replace('BACK & FORTH - ', '')}</div>
                                        <div className="backforth-tier-meta">Access to Carnivore Simba Saloon</div>
                                        <div className="backforth-tier-price">KES {tier.price.toLocaleString()}</div>
                                    </div>
                                    <div className="backforth-qty">
                                        <button className="backforth-qty-btn" onClick={() => updateQuantity(tier.id, -1)}>−</button>
                                        <span className="backforth-qty-val">{quantities[tier.id] || 0}</span>
                                        <button className="backforth-qty-btn" onClick={() => updateQuantity(tier.id, 1)}>+</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Personal Info Card */}
                    <div className="backforth-card">
                        <div className="backforth-card-header">
                            <h2>2. Your Information</h2>
                        </div>
                        <div className="backforth-form">
                            <div className="backforth-input-group">
                                <label className="backforth-label">FULL NAME</label>
                                <input className="backforth-input" placeholder="Jane Doe" value={name} onChange={e => setName(e.target.value)} />
                            </div>
                            <div className="backforth-input-group">
                                <label className="backforth-label">EMAIL ADDRESS</label>
                                <input className="backforth-input" type="email" placeholder="jane@example.com" value={email} onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div className="backforth-input-group">
                                <label className="backforth-label">PHONE NUMBER (M-PESA)</label>
                                <input className="backforth-input" type="tel" placeholder="0712345678" value={phone} onChange={e => setPhone(e.target.value)} />
                            </div>
                            <p style={{ fontSize: '0.8rem', color: '#888', fontStyle: 'italic' }}>
                                By purchasing, you agree to wear your Kenya Colors! 🇰🇪 Use of Uber/Bolt is highly encouraged.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Sticky Order Summary */}
                <div className="backforth-summary-card backforth-card scale-in">
                    <div className="backforth-summary-content">
                        <div className="backforth-summary-heading">
                            <p className="text-xs text-gray-400 font-bold tracking-widest uppercase mb-2">Order Summary</p>
                            <div className="backforth-summary-event">BACK & FORTH PARTY</div>
                            <p className="text-sm text-gray-500 font-medium">Carnivore Simba Saloon, Nairobi</p>
                        </div>

                        <div className="backforth-summary-row">
                            <span>Total Tickets</span>
                            <span>{totalTickets}</span>
                        </div>
                        <div className="backforth-summary-row">
                            <span>Service Fee</span>
                            <span>KES 0.00</span>
                        </div>

                        <div className="backforth-total-row">
                            <span className="backforth-total-label">Total to Pay</span>
                            <span className="backforth-total-val">KES {totalAmount.toLocaleString()}</span>
                        </div>

                        <button 
                            className="backforth-buy-btn"
                            onClick={handleCheckout}
                            disabled={totalAmount === 0 || isProcessing}
                        >
                            {isProcessing ? 'Initializing...' : 'Get Tickets Now'}
                        </button>
                        
                        <div style={{ marginTop: '30px', textAlign: 'center' }}>
                            <img src="/images/safe-checkout.png" alt="Secure Payment" style={{ width: '150px', opacity: 0.6 }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
