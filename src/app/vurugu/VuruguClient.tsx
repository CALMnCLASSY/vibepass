'use client';

import React, { useState, useEffect } from 'react';
import type { EventType } from '@/data/events';
import './vurugu.css';

declare global {
  interface Window {
    PaystackPop: any;
  }
}

const PAYSTACK_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string;

export default function VuruguClient({ initialEvents }: { initialEvents: EventType[] }) {
    const [selectedTier, setSelectedTier] = useState<EventType | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        tickets: '1'
    });
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isHovering, setIsHovering] = useState<string | null>(null);

    // Support Form
    const [supportForm, setSupportForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
    const [supportStatus, setSupportStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    useEffect(() => {
        document.body.style.overflow = isModalOpen ? 'hidden' : 'auto';
        return () => { document.body.style.overflow = 'auto'; };
    }, [isModalOpen]);

    // Sort tiers by price
    const sortedEvents = [...initialEvents].sort((a, b) => a.price - b.price);

    const openCheckout = (tier: EventType) => {
        setSelectedTier(tier);
        setIsModalOpen(true);
        setSuccessMessage(null);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSuccessMessage(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedTier) return;
        if (!window.PaystackPop) { alert('Payment system is loading...'); return; }
        if (!PAYSTACK_KEY) { alert('Key missing'); return; }

        setIsProcessing(true);
        const quantity = parseInt(formData.tickets, 10);
        const totalAmount = selectedTier.price * quantity;

        const paystack = new window.PaystackPop();
        paystack.newTransaction({
            key: PAYSTACK_KEY,
            email: formData.email,
            amount: totalAmount * 100,
            currency: 'KES',
            ref: `vibe-pass-vurugu-${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
            metadata: {
                custom_fields: [
                    { display_name: 'Customer Name', variable_name: 'customer_name', value: formData.name },
                    { display_name: 'Phone Number', variable_name: 'phone_number', value: formData.phone },
                    { display_name: 'Event', variable_name: 'event_name', value: selectedTier.name },
                    { display_name: 'Quantity', variable_name: 'ticket_quantity', value: quantity },
                ],
            },
            onSuccess: async (response: any) => {
                try {
                    const res = await fetch('https://classybooks.onrender.com/api/verify-payment', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            reference: response.reference,
                            eventId: selectedTier.id,
                            eventName: selectedTier.name,
                            customerName: formData.name,
                            customerEmail: formData.email,
                            customerPhone: formData.phone,
                            amount: totalAmount,
                            quantity: quantity
                        })
                    });

                    if (!res.ok) throw new Error('Backend verification failed');

                    fetch('/api/send-ticket', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            customerEmail: formData.email,
                            customerName: formData.name,
                            eventName: selectedTier.name,
                            quantity: quantity,
                            totalAmount: totalAmount,
                            date: selectedTier.date,
                            location: selectedTier.location,
                            ticketId: `VP-${Date.now().toString().slice(-6)}`,
                            eventImageUrl: selectedTier.imageUrl || undefined
                        })
                    }).catch(console.error);

                    setIsProcessing(false);
                    setSuccessMessage(`Tickets for ${selectedTier.name} confirmed! Check your email.`);
                } catch (error) {
                    console.error('Error:', error);
                    alert('Payment succeeded but verification failed.');
                    setIsProcessing(false);
                }
            },
            onCancel: () => setIsProcessing(false),
            onError: (error: any) => {
                alert(`Error: ${error.message}`);
                setIsProcessing(false);
            }
        });
    };

    const handleSupportSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSupportStatus('submitting');
        try {
            const res = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fromName: supportForm.name,
                    fromEmail: supportForm.email,
                    subject: 'Vurugu Event Support Form',
                    message: supportForm.message,
                    formType: 'Vurugu Event Page'
                })
            });
            if (!res.ok) throw new Error('Failed to send');
            setSupportStatus('success');
            setSupportForm({ name: '', email: '', phone: '', subject: '', message: '' });
            setTimeout(() => setSupportStatus('idle'), 5000);
        } catch (err) {
            setSupportStatus('error');
        }
    };

    return (
        <div className="vurugu-root">
            <div className="noise-overlay"></div>
            
            <div className="container">
                <header>
                    <div className="pre-title">MADFUN PRESENTS</div>
                    <h1>VURUGU</h1>
                    <div className="subtitle">THE ULTIMATE BOXING SHOWDOWN</div>
                </header>
                
                <div className="info-block">
                    <p>Witness fierce warriors clash in an adrenaline-pumping boxing showdown, where strength, skill and sheer determination collide. Vurugu promises an unforgettable night of raw energy, intense rivalries and moments that will have the crowd on its feet. Don’t miss the action, this is boxing at its fiercest.</p>
                    <div className="event-meta">
                        <span>🗓️ APR 04, 2026</span>
                        <span>📍 KASARANI STADIUM INDOOR ARENA</span>
                    </div>
                </div>

                <div className="tiers-section">
                    <h2 className="section-title">SELECT YOUR TICKET</h2>
                    {sortedEvents.length === 0 ? (
                        <p style={{textAlign: 'center', color: '#888'}}>Ticket information is currently loading or unavailable.</p>
                    ) : (
                        <div className="tiers-grid">
                            {sortedEvents.map((tier) => (
                                <div 
                                    key={tier.id} 
                                    className="tier-card"
                                    onMouseEnter={() => setIsHovering(tier.id)}
                                    onMouseLeave={() => setIsHovering(null)}
                                    style={isHovering === tier.id ? { borderColor: '#ef4444' } : {}}
                                >
                                    <div className="tier-header">
                                        <h3>{tier.name.replace('VURUGU - ', '')}</h3>
                                        <div className="tier-price">KES {tier.price.toLocaleString()}</div>
                                    </div>
                                    <button 
                                        className="btn-buy"
                                        onClick={() => openCheckout(tier)}
                                    >
                                        PROCEED TO CHECKOUT
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <section className="support-section">
                    <h3 className="support-title">Support / Inquiries</h3>
                    <p className="support-subtitle">Questions about the event? Reach out.</p>
                    <form className="support-form" onSubmit={handleSupportSubmit}>
                        <div className="support-row">
                            <input type="text" placeholder="Your name" required value={supportForm.name} onChange={e => setSupportForm({...supportForm, name: e.target.value})} />
                            <input type="email" placeholder="Your email" required value={supportForm.email} onChange={e => setSupportForm({...supportForm, email: e.target.value})} />
                        </div>
                        <div className="support-row">
                            <input type="tel" placeholder="Phone (optional)" value={supportForm.phone} onChange={e => setSupportForm({...supportForm, phone: e.target.value})} />
                            <input type="text" placeholder="Subject" required value={supportForm.subject} onChange={e => setSupportForm({...supportForm, subject: e.target.value})} />
                        </div>
                        <textarea placeholder="Message..." required value={supportForm.message} onChange={e => setSupportForm({...supportForm, message: e.target.value})}></textarea>
                        
                        {supportStatus === 'success' && <p style={{color: '#4ade80', marginTop: '10px'}}>Sent successfully!</p>}
                        {supportStatus === 'error' && <p style={{color: '#ef4444', marginTop: '10px'}}>Error sending message.</p>}
                        
                        <button type="submit" disabled={supportStatus === 'submitting'} style={{marginTop: '10px'}}>
                            {supportStatus === 'submitting' ? 'SENDING...' : 'SEND INQUIRY'}
                        </button>
                    </form>
                </section>
            </div>

            <div className={`modal ${isModalOpen ? 'active' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
                <div className="modal-content">
                    <button type="button" className="close-btn" onClick={closeModal}>&times;</button>
                    
                    {!successMessage ? (
                        <div>
                            <h2 className="modal-title">{selectedTier?.name}</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input type="text" required placeholder="Enter your name" 
                                        value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" required placeholder="Enter your email" 
                                        value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input type="tel" required placeholder="Enter your phone number" 
                                        value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                                </div>
                                <div className="form-group">
                                    <label>Number of Tickets</label>
                                    <select required value={formData.tickets} onChange={e => setFormData({...formData, tickets: e.target.value})}>
                                        {[1,2,3,4,5,6,7,8,9,10].map(n => (
                                            <option key={n} value={n}>{n} Ticket{n > 1 ? 's' : ''}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group" style={{marginTop: '15px', marginBottom: '5px'}}>
                                    <label style={{color: '#ffffff', fontSize: '1.2rem'}}>
                                        Total: KES {selectedTier ? (selectedTier.price * parseInt(formData.tickets)).toLocaleString() : 0}
                                    </label>
                                </div>
                                <button type="submit" className="submit-btn" style={{marginTop: '20px'}} disabled={isProcessing}>
                                    {isProcessing ? 'PROCESSING...' : 'CONFIRM TO PAY'}
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="success-message active">
                            <div className="success-icon">★</div>
                            <div className="success-text">SUCCESS</div>
                            <p style={{ marginTop: '15px', lineHeight: 1.6, fontSize: '0.95rem', color: '#111', fontWeight: 600 }}>{successMessage}</p>
                            <button type="button" className="submit-btn" style={{ marginTop: '20px' }} onClick={closeModal}>CLOSE</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
