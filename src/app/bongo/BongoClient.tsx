'use client';

import React, { useState, useEffect } from 'react';
import type { EventType } from '@/data/events';
import './bongo.css';

declare global {
  interface Window {
    PaystackPop: any;
  }
}

const PAYSTACK_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string;

export default function BongoClient({ initialEvents }: { initialEvents: EventType[] }) {
    const [quantities, setQuantities] = useState<Record<string, number>>({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Form data for checkout
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    
    // Fallback data if DB fetch failed
    const hasData = initialEvents.length > 0;
    const fallbackImage = "/images/events/bongo.png";
    const eventDescription = "Old School Bongo 6.0 with a touch of Kenyan flavor. Featuring Mejja, Nameless, and Harmonize.";
    
    // Sort events by price
    const displayEvents = hasData ? initialEvents.sort((a,b) => a.price - b.price) : [
        { id: 'b1', name: 'BONGO - DIEHARD', price: 1000, date: '2026-04-05', location: 'Cavalli @ The Manor', imageUrl: fallbackImage, description: eventDescription, organizer: 'MADFUN', longDescription: '' },
        { id: 'b2', name: 'BONGO - EARLY BIRD', price: 1500, date: '2026-04-05', location: 'Cavalli @ The Manor', imageUrl: fallbackImage, description: eventDescription, organizer: 'MADFUN', longDescription: '' },
        { id: 'b3', name: 'BONGO - WAVE 1', price: 2000, date: '2026-04-05', location: 'Cavalli @ The Manor', imageUrl: fallbackImage, description: eventDescription, organizer: 'MADFUN', longDescription: '' }
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
            .map(e => `${quantities[e.id]}x ${e.name.replace('BONGO - ', '')}`)
            .join(', ');

        // Notify Discord: Payment Initialized
        fetch('/api/notify-discord', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                type: 'payment',
                embed: {
                    title: "⏳ Bongo 6.0 Payment Initialized",
                    color: 0xfcc419,
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
            ref: `vibe-pass-bongo-${Date.now()}`,
            metadata: {
                custom_fields: [
                    { display_name: 'Customer Name', variable_name: 'customer_name', value: name },
                    { display_name: 'Phone Number', variable_name: 'phone_number', value: phone },
                    { display_name: 'Tickets', variable_name: 'tickets', value: ticketSummary },
                ],
            },
            onSuccess: async (response: any) => {
                try {
                    // Notify Success
                    fetch('/api/notify-discord', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            type: 'payment',
                            embed: {
                                title: "✅ Bongo 6.0 Payment Successful",
                                color: 0x4ade80,
                                fields: [
                                    { name: "👤 Customer", value: name, inline: true },
                                    { name: "🎫 Tickets", value: ticketSummary, inline: true },
                                    { name: "💰 Amount", value: `KES ${totalAmount.toLocaleString()}`, inline: true }
                                ],
                                timestamp: new Date().toISOString()
                            }
                        })
                    }).catch(() => {});

                    // Send Ticket
                    fetch('/api/send-ticket', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            customerEmail: email,
                            customerName: name,
                            eventName: `Old School Bongo 6.0 - ${ticketSummary}`,
                            quantity: totalTickets,
                            totalAmount: totalAmount,
                            date: '5th April, 2026',
                            location: 'Cavalli @ The Manor',
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
        <div className="bongo-root">
            {successMessage && (
                <div className="bongo-success-overlay">
                    <div className="bongo-success-card">
                        <div className="bongo-success-icon">✓</div>
                        <h2 className="bongo-success-title">Success!</h2>
                        <p className="bongo-success-msg">{successMessage}</p>
                        <button onClick={() => setSuccessMessage(null)} className="bongo-back-btn">Done</button>
                    </div>
                </div>
            )}

            {/* Header Section (Dark) */}
            <div className="bongo-header-section">
                <div className="container">
                    <div className="bongo-hero">
                        <div className="bongo-poster-container">
                            <img src={fallbackImage} alt="Bongo 6.0" className="bongo-poster" />
                        </div>
                        <div className="bongo-details">
                            <span className="bongo-tagline">with a touch of Kenyan flavor</span>
                            <h1 className="bongo-title">Old School Bongo 6.0</h1>
                            <div className="bongo-meta">
                                <div className="bongo-meta-item">
                                    <strong>5th April, 2026</strong>
                                </div>
                                <div className="bongo-meta-item">
                                    <strong>CAVALLI @ THE MANOR</strong>
                                </div>
                            </div>
                            <p className="bongo-description">
                                MEJJA, NAMELESS, HARMONIZE. Starting from 2:00 PM. <br/>
                                <strong>NO GATE TICKETS.</strong>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ticket & Checkout Section */}
            <div className="container">
                <div className="bongo-content-grid">
                    {/* Tickets List */}
                    <div className="bongo-card">
                        <div className="bongo-card-header">TICKETS</div>
                        <div className="bongo-tiers">
                            {displayEvents.map((tier) => (
                                <div key={tier.id} className="bongo-tier">
                                    <div className="bongo-tier-info">
                                        <h3>{tier.name.replace('BONGO - ', '')}</h3>
                                        <div className="bongo-tier-price">KES {tier.price.toLocaleString()}</div>
                                        {tier.name.includes('DIEHARD') || tier.name.includes('EARLY BIRD') ? (
                                            <div className="bongo-sold-out-status">- Sold Out (Available on VibePass)</div>
                                        ) : null}
                                    </div>
                                    <div className="bongo-quantity-controls">
                                        <button className="bongo-qty-btn" onClick={() => updateQuantity(tier.id, -1)}>−</button>
                                        <span className="bongo-qty-value">{quantities[tier.id] || 0}</span>
                                        <button className="bongo-qty-btn" onClick={() => updateQuantity(tier.id, 1)}>+</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Checkout Card */}
                    <div className="bongo-checkout-section">
                        <h2 className="bongo-summary-title">Total</h2>
                        <div className="bongo-summary-total">
                            <span>Tickets</span>
                            <strong>{totalTickets}</strong>
                        </div>
                        
                        <div className="bongo-input-group">
                            <label className="bongo-label">Full Name</label>
                            <input className="bongo-input" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" />
                        </div>
                        <div className="bongo-input-group">
                            <label className="bongo-label">Email</label>
                            <input className="bongo-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email Address" />
                        </div>
                        <div className="bongo-input-group">
                            <label className="bongo-label">Phone</label>
                            <input className="bongo-input" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone Number" />
                        </div>

                        <div className="bongo-summary-total" style={{ borderTop: '1px solid #eee', marginTop: '20px', paddingTop: '20px' }}>
                            <span>Amount</span>
                            <strong>KES {totalAmount.toLocaleString()}</strong>
                        </div>

                        <button 
                            className="bongo-pay-btn" 
                            onClick={handleCheckout}
                            disabled={totalAmount === 0 || isProcessing}
                        >
                            {isProcessing ? 'Processing...' : 'Purchase tickets'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
