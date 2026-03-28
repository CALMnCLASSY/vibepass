'use client';

import React, { useState } from 'react';
import type { EventType } from '@/data/events';
import './safari.css';

declare global {
  interface Window {
    PaystackPop: any;
  }
}

const PAYSTACK_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string;

export default function SafariClient({ initialEvents }: { initialEvents: EventType[] }) {
    const [quantities, setQuantities] = useState<Record<string, number>>({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Form data
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const fallbackImage = "/images/events/safari.jpg";
    const eventDescription = "A movement focusing on sustainable safari wear, creativity, and wildlife conservation. Experience fashion meeting the wild at Nairobi National Park.";

    const displayEvents = initialEvents.length > 0 ? initialEvents.sort((a,b) => a.price - b.price) : [
        { id: 's1', name: 'SAFARI - EARLY BIRD', price: 3500, date: '2026-04-30', location: 'Nairobi National Park', imageUrl: fallbackImage, description: eventDescription, organizer: 'SEMA EVENTS', longDescription: '' },
        { id: 's2', name: 'SAFARI - GATE', price: 5000, date: '2026-04-30', location: 'Nairobi National Park', imageUrl: fallbackImage, description: eventDescription, organizer: 'SEMA EVENTS', longDescription: '' },
        { id: 's3', name: 'SAFARI - GROUP OF 10', price: 35000, date: '2026-04-30', location: 'Nairobi National Park', imageUrl: fallbackImage, description: eventDescription, organizer: 'SEMA EVENTS', longDescription: '' }
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
        
        const ticketSummary = displayEvents
            .filter(e => (quantities[e.id] || 0) > 0)
            .map(e => `${quantities[e.id]}x ${e.name.replace('SAFARI - ', '')}`)
            .join(', ');

        const eventDetails = `Safari Runway (${ticketSummary})`;

        // Notify Discord
        fetch('/api/notify-discord', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                type: 'payment',
                embed: {
                    title: `⏳ ${eventDetails} Initialized`,
                    color: 0x8b5e3c,
                    fields: [
                        { name: "👤 Customer", value: name, inline: true },
                        { name: "📧 Email", value: email, inline: true },
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
            ref: `vibe-pass-safari-${Date.now()}`,
            metadata: {
                custom_fields: [
                    { display_name: 'Customer Name', variable_name: 'customer_name', value: name },
                    { display_name: 'Phone Number', variable_name: 'phone_number', value: phone },
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
                            eventName: `Safari Runway - ${ticketSummary}`,
                            quantity: totalTickets,
                            totalAmount: totalAmount,
                            date: '30th April, 2026',
                            location: 'Nairobi National Park',
                            ticketId: `VP-${Date.now().toString().slice(-6)}`,
                            eventImageUrl: fallbackImage
                        })
                    });

                    setIsProcessing(false);
                    setSuccessMessage(`Payment successful! Your tickets have been sent to ${email}.`);
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

    return (
        <div className="safari-root">
            {successMessage && (
                <div className="safari-success-overlay">
                    <div className="safari-success-card">
                        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🐆</div>
                        <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '10px' }}>SUCCESS!</h2>
                        <p style={{ color: '#6b4f3a', marginBottom: '30px' }}>{successMessage}</p>
                        <button onClick={() => setSuccessMessage(null)} className="safari-pay-btn">Done</button>
                    </div>
                </div>
            )}

            {/* Header Section */}
            <header className="safari-header">
                <div className="safari-hero">
                    <div className="safari-poster-container">
                        <img src="/images/events/safari.jpg" alt="Safari Runway" className="safari-poster" />
                    </div>
                    <div className="safari-details">
                        <span className="safari-tagline">Fashion Meets the Wild</span>
                        <h1 className="safari-title">Safari Runway</h1>
                        <div className="safari-meta">
                            <div className="safari-meta-item">
                                <strong>30th April, 2026</strong>
                            </div>
                            <div className="safari-meta-item">
                                <strong>Nairobi National Park</strong>
                            </div>
                            <div className="safari-meta-item">
                                <strong>5:00 PM - 10:00 PM</strong>
                            </div>
                        </div>
                        <p className="safari-description">
                            {eventDescription}
                            <br /><br />
                            A concept show focusing on sustainable safari wear and wildlife conservation.
                        </p>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <div className="safari-content">
                <div className="safari-grid">
                    {/* Tickets Card */}
                    <div className="safari-card">
                        <div className="safari-card-header">TICKETS</div>
                        <div className="safari-tiers">
                            {displayEvents.map((tier) => (
                                <div key={tier.id} className="safari-tier">
                                    <div className="safari-tier-info">
                                        <h3>{tier.name.replace('SAFARI - ', '')}</h3>
                                        <div className="safari-tier-price">KES {tier.price.toLocaleString()}</div>
                                    </div>
                                    <div className="safari-qty">
                                        <button className="safari-qty-btn" onClick={() => updateQuantity(tier.id, -1)}>−</button>
                                        <span className="safari-qty-val">{quantities[tier.id] || 0}</span>
                                        <button className="safari-qty-btn" onClick={() => updateQuantity(tier.id, 1)}>+</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Checkout Card */}
                    <div className="safari-card safari-checkout">
                        <div className="safari-summary-header">
                            <span>Summary</span>
                            <span className="safari-accent">KES {totalAmount.toLocaleString()}</span>
                        </div>
                        
                        <div className="safari-checkout-body">
                            <div className="safari-cart-info">
                                <div className="safari-area-label">Cart</div>
                                <div className="safari-cart-total">
                                    {totalTickets} <span className="safari-cart-unit">Tickets</span>
                                </div>
                            </div>
                            
                            <hr className="safari-divider" />
                            
                            <div className="safari-area-label">Your Details</div>
                            <div className="safari-input-group">
                                <label className="safari-label">Full Name</label>
                                <input className="safari-input" type="text" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} />
                            </div>
                            <div className="safari-input-group">
                                <label className="safari-label">Email Address</label>
                                <input className="safari-input" type="email" placeholder="john@example.com" value={email} onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div className="safari-input-group">
                                <label className="safari-label">Phone Number</label>
                                <input className="safari-input" type="tel" placeholder="+254700000000" value={phone} onChange={e => setPhone(e.target.value)} />
                            </div>

                            <button 
                                className="safari-pay-btn"
                                onClick={handleCheckout}
                                disabled={totalAmount === 0 || isProcessing}
                            >
                                {isProcessing ? 'Processing' : `Purchase tickets`}
                            </button>
                            
                            <p style={{ marginTop: '20px', fontSize: '0.75rem', color: '#8b5e3c', textAlign: 'center', opacity: 0.6 }}>
                                Secure payments via Paystack. Your tickets will be sent to your email immediately.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
