'use client';

import React, { useState, useMemo } from 'react';
import type { EventType } from '@/data/events';
import './mapenzi.css';

declare global {
  interface Window {
    PaystackPop: any;
  }
}

const PAYSTACK_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string;

interface ShowOption {
    id: string;
    label: string;
    date: string;
    time: string;
}

const SHOWS: ShowOption[] = [
    { id: 'fri', label: 'Friday 1st May, 7:00 PM', date: '2026-05-01', time: '7:00 PM' },
    { id: 'sat', label: 'Saturday 2nd May, 6:00 PM', date: '2026-05-02', time: '6:00 PM' },
    { id: 'sun', label: 'Sunday 3rd May, 4:00 PM', date: '2026-05-03', time: '4:00 PM' },
];

export default function MapenziClient({ initialEvents }: { initialEvents: EventType[] }) {
    const [selectedShow, setSelectedShow] = useState<string>(SHOWS[0].id);
    const [quantities, setQuantities] = useState<Record<string, number>>({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Form data
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const currentShow = SHOWS.find(s => s.id === selectedShow)!;
    
    // Filter events for the selected show date
    const displayEvents = useMemo(() => {
        const filtered = initialEvents.filter(e => e.date === currentShow.date);
        
        if (filtered.length > 0) return filtered.sort((a,b) => a.price - b.price);
        
        // Fallback mock data if DB is empty
        const fallbackImage = "/images/events/mapenzi.jpg";
        return [
            { id: `m1-${selectedShow}`, name: `MAPENZI - EARLY BIRD`, price: 2000, date: currentShow.date, location: 'Braeburn Theatre', imageUrl: fallbackImage, description: '', organizer: 'MADFUN', longDescription: '' },
            { id: `m2-${selectedShow}`, name: `MAPENZI - ADVANCE`, price: 2500, date: currentShow.date, location: 'Braeburn Theatre', imageUrl: fallbackImage, description: '', organizer: 'MADFUN', longDescription: '' },
            { id: `m3-${selectedShow}`, name: `MAPENZI - GATE`, price: 3500, date: currentShow.date, location: 'Braeburn Theatre', imageUrl: fallbackImage, description: '', organizer: 'MADFUN', longDescription: '' },
            { id: `m4-${selectedShow}`, name: `MAPENZI - COUPLE`, price: 4500, date: currentShow.date, location: 'Braeburn Theatre', imageUrl: fallbackImage, description: '', organizer: 'MADFUN', longDescription: '' },
            { id: `m5-${selectedShow}`, name: `MAPENZI - GROUP OF 5`, price: 10000, date: currentShow.date, location: 'Braeburn Theatre', imageUrl: fallbackImage, description: '', organizer: 'MADFUN', longDescription: '' }
        ];
    }, [initialEvents, currentShow, selectedShow]);

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
            .map(e => `${quantities[e.id]}x ${e.name.replace('MAPENZI - ', '')}`)
            .join(', ');

        const eventDetails = `Mapenzi Wewe (${currentShow.label})`;

        // Notify Discord
        fetch('/api/notify-discord', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                type: 'payment',
                embed: {
                    title: `⏳ ${eventDetails} Initialized`,
                    color: 0xfacc15,
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
            ref: `vibe-pass-mapenzi-${Date.now()}`,
            metadata: {
                custom_fields: [
                    { display_name: 'Customer Name', variable_name: 'customer_name', value: name },
                    { display_name: 'Tickets', variable_name: 'tickets', value: `${eventDetails}: ${ticketSummary}` },
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
                            eventName: `${eventDetails} - ${ticketSummary}`,
                            quantity: totalTickets,
                            totalAmount: totalAmount,
                            date: currentShow.date,
                            location: 'Braeburn Theatre',
                            ticketId: `VP-${Date.now().toString().slice(-6)}`,
                            eventImageUrl: displayEvents[0].imageUrl
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
        <div className="mapenzi-root">
            {successMessage && (
                <div className="bongo-success-overlay"> {/* Reusing overlay style */}
                    <div className="bongo-success-card">
                        <div className="bongo-success-icon">✓</div>
                        <h2 className="bongo-success-title">Success!</h2>
                        <p className="bongo-success-msg">{successMessage}</p>
                        <button onClick={() => setSuccessMessage(null)} className="bongo-back-btn">Done</button>
                    </div>
                </div>
            )}

            {/* Header Section (Dark) */}
            <div className="mapenzi-header">
                <div className="mapenzi-content" style={{ margin: '0 auto', maxWidth: '1100px' }}>
                    <div className="mapenzi-hero">
                        <div className="mapenzi-poster-container">
                            <img src="/images/events/mapenzi.jpg" alt="Mapenzi Wewe" className="mapenzi-poster" />
                        </div>
                        <div className="mapenzi-details">
                            <span className="mapenzi-tagline">Mapenzi Wewe - Gufy Dox & Billy Black</span>
                            <h1 className="mapenzi-title">Mapenzi Wewe</h1>
                            <div className="mapenzi-meta">
                                <div className="mapenzi-meta-item">
                                    <strong>May 1st - 3rd, 2026</strong>
                                </div>
                                <div className="mapenzi-meta-item">
                                    <strong>Braeburn Theatre, Gitanga Rd</strong>
                                </div>
                            </div>
                            <p className="mapenzi-description">
                                A journey of love through poetry and music. Featuring Gufy Dox and Billy Black. 
                                A 90-minute emotional journey.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="mapenzi-content">
                <div className="mapenzi-grid">
                    {/* Tickets Card */}
                    <div className="mapenzi-card">
                        <div className="mapenzi-card-header">TICKET SELECTION</div>
                        
                        {/* Show Selector Integration */}
                        <div className="mapenzi-show-selector">
                            <label className="mapenzi-label">Select Show Date</label>
                            <select 
                                className="mapenzi-select" 
                                value={selectedShow}
                                onChange={(e) => {
                                    setSelectedShow(e.target.value);
                                    setQuantities({}); // Reset quantities when date changes
                                }}
                            >
                                {SHOWS.map(s => (
                                    <option key={s.id} value={s.id}>{s.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mapenzi-tiers">
                            {displayEvents.map((tier) => (
                                <div key={tier.id} className="mapenzi-tier">
                                    <div className="mapenzi-tier-info">
                                        <h3>{tier.name.replace('MAPENZI - ', '').replace(/\(.*\)/, '')}</h3>
                                        <div className="mapenzi-tier-price">KES {tier.price.toLocaleString()}</div>
                                    </div>
                                    <div className="mapenzi-qty">
                                        <button className="mapenzi-qty-btn" onClick={() => updateQuantity(tier.id, -1)}>−</button>
                                        <span className="mapenzi-qty-val">{quantities[tier.id] || 0}</span>
                                        <button className="mapenzi-qty-btn" onClick={() => updateQuantity(tier.id, 1)}>+</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Checkout Card */}
                    <div className="mapenzi-card mapenzi-checkout">
                        <div className="mapenzi-card-header">ORDER SUMMARY</div>
                        <div className="mapenzi-checkout-body">
                            <div style={{ marginBottom: '24px' }}>
                                <div className="mapenzi-label">Selected Show</div>
                                <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>{currentShow.label}</div>
                            </div>

                            <div className="mapenzi-field">
                                <label className="mapenzi-label">Full Name</label>
                                <input className="mapenzi-input" type="text" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} />
                            </div>
                            <div className="mapenzi-field">
                                <label className="mapenzi-label">Email Address</label>
                                <input className="mapenzi-input" type="email" placeholder="email@example.com" value={email} onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div className="mapenzi-field">
                                <label className="mapenzi-label">Phone Number</label>
                                <input className="mapenzi-input" type="tel" placeholder="+254700000000" value={phone} onChange={e => setPhone(e.target.value)} />
                            </div>

                            <div className="mapenzi-total-row">
                                <span>Total</span>
                                <span style={{ color: '#facc15' }}>KES {totalAmount.toLocaleString()}</span>
                            </div>

                            <button 
                                className="mapenzi-pay-btn"
                                onClick={handleCheckout}
                                disabled={totalAmount === 0 || isProcessing}
                            >
                                {isProcessing ? 'Processing...' : `Purchase ${totalTickets} Ticket${totalTickets !== 1 ? 's' : ''}`}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
