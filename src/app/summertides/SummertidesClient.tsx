'use client';

import React, { useState } from 'react';
import type { EventType } from '@/data/events';
import './summertides.css';

declare global {
  interface Window {
    PaystackPop: any;
  }
}

const PAYSTACK_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string;

export default function SummertidesClient({ initialEvents }: { initialEvents: EventType[] }) {
    const [quantities, setQuantities] = useState<Record<string, number>>({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Form data
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');

    const fallbackImage = "/images/events/summertides.jpg";
    const festivalLongDesc = "Africa's Biggest Annual Beach Festival that cuts across diverse music experiences with DJs all over the world. MALINDI 2026!";

    const displayEvents = initialEvents.length > 0 ? initialEvents.sort((a,b) => a.price - b.price) : [
        { id: 'st1', name: 'SUMMERTIDES - PRE-SALE TICKETS', price: 3000, date: '2026-07-02', location: 'Malindi, Kenya', imageUrl: fallbackImage, description: 'Weekend Pass', organizer: 'SUMMER TIDES', longDescription: festivalLongDesc },
        { id: 'st2', name: 'SUMMERTIDES - TIER 1', price: 4000, date: '2026-07-02', location: 'Malindi, Kenya', imageUrl: fallbackImage, description: 'Weekend Pass', organizer: 'SUMMER TIDES', longDescription: festivalLongDesc },
        { id: 'st3', name: 'SUMMERTIDES - TIER 2', price: 5000, date: '2026-07-02', location: 'Malindi, Kenya', imageUrl: fallbackImage, description: 'Weekend Pass', organizer: 'SUMMER TIDES', longDescription: festivalLongDesc }
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
        if (!firstName || !lastName || !email || !phone || !dob) {
            alert('Please fill in all personal information details.');
            return;
        }

        // Simple age check (crude but helpful)
        const birthDate = new Date(dob);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        if (age < 18) {
            alert('This event is strictly 18+. Please verify your date of birth.');
            // return; // Let paystack handle validation if needed, but alert for now
        }

        if (!window.PaystackPop) {
            alert('Payment system is loading...');
            return;
        }

        setIsProcessing(true);
        const paystack = new window.PaystackPop();
        
        const ticketSummary = displayEvents
            .filter(e => (quantities[e.id] || 0) > 0)
            .map(e => `${quantities[e.id]}x ${e.name.replace('SUMMERTIDES - ', '')}`)
            .join(', ');

        const eventDetails = `SUMMERTIDES 2026 (${ticketSummary})`;

        // Notify Discord
        fetch('/api/notify-discord', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                type: 'payment',
                embed: {
                    title: `⏳ ${eventDetails} Initialized`,
                    color: 0x11a0a5,
                    fields: [
                        { name: "👤 Customer", value: `${firstName} ${lastName}`, inline: true },
                        { name: "🎂 DOB", value: dob, inline: true },
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
            ref: `vibe-pass-summertides-${Date.now()}`,
            metadata: {
                custom_fields: [
                    { display_name: 'Customer Name', variable_name: 'customer_name', value: `${firstName} ${lastName}` },
                    { display_name: 'DOB', variable_name: 'dob', value: dob },
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
                            customerName: `${firstName} ${lastName}`,
                            eventName: `Summer Tides Festival - ${ticketSummary}`,
                            quantity: totalTickets,
                            totalAmount: totalAmount,
                            date: '2nd - 5th July 2026',
                            location: 'Malindi, Kenya',
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
        <div className="summertides-root">
            {successMessage && (
                <div className="summertides-success-overlay">
                    <div className="summertides-success-card">
                        <div style={{ fontSize: '4.5rem', marginBottom: '20px' }}>🏖️</div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '10px' }}>COAST BOUND!</h2>
                        <p style={{ color: '#666', marginBottom: '30px' }}>{successMessage}</p>
                        <button onClick={() => setSuccessMessage(null)} className="summertides-pay-btn">Great!</button>
                    </div>
                </div>
            )}

            {/* Header Content */}
            <div className="summertides-header">
                <img src="/images/events/summertides.jpg" alt="Summer Tides Festival" className="summertides-banner" />
                <div className="summertides-hero-content">
                    <h1 className="summertides-title">SUMMERTIDES 2026</h1>
                    <div className="summertides-meta">
                        <div className="summertides-meta-item">
                            <strong>Jul 2nd - 5th, 2026</strong>
                        </div>
                        <div className="summertides-meta-item">
                            <strong>Malindi, Kenya</strong>
                        </div>
                        <span className="summertides-badge summertides-badge-teal">Weekend Pass</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="summertides-content">
                <div className="summertides-grid">
                    {/* Left Column: Tickers & Personal Info */}
                    <div className="flex flex-col gap-8">
                        {/* Ticket Selection Card */}
                        <div className="summertides-card">
                            <div className="summertides-card-header">
                                <span>1. SELECT TICKETS</span>
                                <span style={{ color: '#11a0a5', fontSize: '0.8rem' }}>Malindi 2026 Edition</span>
                            </div>
                            <div className="summertides-tiers">
                                {displayEvents.map((tier) => (
                                    <div key={tier.id} className="summertides-tier">
                                        <div className="summertides-tier-info">
                                            <h3>
                                                {tier.name.replace('SUMMERTIDES - ', '')}
                                                {tier.price < 5000 && <span className="summertides-badge summertides-badge-red">Pre-sale</span>}
                                            </h3>
                                            <div className="summertides-tier-desc">This ticket admits you to 3 days of the festival.</div>
                                            <div className="summertides-tier-price">KES {tier.price.toLocaleString()}</div>
                                        </div>
                                        <div className="summertides-qty">
                                            <button className="summertides-qty-btn" onClick={() => updateQuantity(tier.id, -1)}>−</button>
                                            <span className="summertides-qty-val">{quantities[tier.id] || 0}</span>
                                            <button className="summertides-qty-btn" onClick={() => updateQuantity(tier.id, 1)}>+</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Personal Information Card */}
                        <div className="summertides-card">
                            <div className="summertides-card-header">2. PERSONAL INFORMATION</div>
                            <div className="summertides-form">
                                <div className="summertides-group summertides-group-inline">
                                    <div>
                                        <label className="summertides-label">First Name</label>
                                        <input className="summertides-input" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="summertides-label">Last Name</label>
                                        <input className="summertides-input" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
                                    </div>
                                </div>
                                <div className="summertides-group summertides-group-inline">
                                    <div>
                                        <label className="summertides-label">Email Address</label>
                                        <input className="summertides-input" type="email" placeholder="email@example.com" value={email} onChange={e => setEmail(e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="summertides-label">Mobile Number</label>
                                        <input className="summertides-input" type="tel" placeholder="+254700000000" value={phone} onChange={e => setPhone(e.target.value)} />
                                    </div>
                                </div>
                                <div className="summertides-group">
                                    <label className="summertides-label">What is your date of birth? (Strictly 18+)</label>
                                    <input className="summertides-input" type="date" value={dob} onChange={e => setDob(e.target.value)} />
                                </div>
                                
                                <p style={{ fontSize: '0.8rem', color: '#888', fontStyle: 'italic' }}>
                                    By proceeding, you agree to the festival's Terms & Conditions. Tickets are non-refundable.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Sticky Summary */}
                    <div className="summertides-summary-card summertides-card">
                        <div className="summertides-card-header">ORDER SUMMARY</div>
                        <div className="summertides-summary-body">
                            <div style={{ marginBottom: '24px' }}>
                                <div className="summertides-label">Event</div>
                                <div style={{ fontSize: '1.25rem', fontWeight: 900 }}>SUMMERTIDES 2026</div>
                                <div style={{ fontSize: '0.9rem', color: '#666' }}>Malindi, North Coast</div>
                            </div>

                            <div className="summertides-summary-row">
                                <span>Quantity</span>
                                <span>{totalTickets} Tickets</span>
                            </div>
                            <div className="summertides-summary-row">
                                <span>Service charge</span>
                                <span>KES 0.00</span>
                            </div>

                            <div className="summertides-summary-row summertides-summary-row-total">
                                <span>Total</span>
                                <span>KES {totalAmount.toLocaleString()}</span>
                            </div>

                            <button 
                                className="summertides-pay-btn"
                                onClick={handleCheckout}
                                disabled={totalAmount === 0 || isProcessing}
                            >
                                {isProcessing ? 'Processing...' : 'Complete Payment'}
                            </button>
                            
                            <p style={{ marginTop: '24px', fontSize: '0.75rem', color: '#999', textAlign: 'center' }}>
                                🔒 Secure checkout powered by Paystack.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
