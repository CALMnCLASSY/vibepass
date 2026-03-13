'use client';

import React, { useState, useEffect } from 'react';
import type { EventType } from '@/data/events';
import './showman.css';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    PaystackPop: any;
  }
}

const PAYSTACK_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string;

export default function ShowmanClient({ initialEvents }: { initialEvents: EventType[] }) {
    const [selectedShow, setSelectedShow] = useState<EventType | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        tickets: '1',
        payment_mode: 'full'
    });
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    // Support Form State
    const [supportForm, setSupportForm] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [supportStatus, setSupportStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [isModalOpen]);

    // Format utility
    const formatDateCompact = (dateString: string) => {
        const date = new Date(dateString + 'T00:00:00');
        const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    };

    const getDayShort = (dateString: string) => {
        const date = new Date(dateString + 'T00:00:00');
        const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        return days[date.getDay()];
    };

    const showsToDisplay = initialEvents.map(event => {
        const isVip = event.name.toUpperCase().includes('VIP');
        const bg = isVip ? '#1d1d1d' : '#e42e2e';
        const fg = isVip ? '#e42e2e' : '#ffffff';
        const nameColor = isVip ? '#e42e2e' : '#1d1d1d';
        return {
            ...event,
            bg,
            fg,
            nameColor,
            isVip,
            formattedDate: formatDateCompact(event.date),
            dayShort: getDayShort(event.date),
            // Defaulting show time based on VIP or not for realism
            showTime: isVip ? '20:00' : '18:00'
        };
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const openModal = (show: EventType) => {
        setSelectedShow(show);
        setIsModalOpen(true);
        setSuccessMessage(null);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedShow(null);
        setSuccessMessage(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!selectedShow) return;

        if (!window.PaystackPop) {
            alert('Payment system is loading. Please wait a moment and try again.');
            return;
        }

        if (!PAYSTACK_KEY) {
            alert('Paystack public key is missing. Please check your environment variables.');
            return;
        }

        setIsProcessing(true);

        const quantity = parseInt(formData.tickets, 10);
        const totalAmount = selectedShow.price * quantity;

        const paystack = new window.PaystackPop();
        paystack.newTransaction({
            key: PAYSTACK_KEY,
            email: formData.email,
            amount: totalAmount * 100, // Paystack uses smallest currency unit
            currency: 'KES',
            ref: `vibe-pass-showman-${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
            metadata: {
                custom_fields: [
                    { display_name: 'Customer Name', variable_name: 'customer_name', value: formData.name },
                    { display_name: 'Phone Number', variable_name: 'phone_number', value: formData.phone },
                    { display_name: 'Event', variable_name: 'event_name', value: selectedShow.name },
                    { display_name: 'Quantity', variable_name: 'ticket_quantity', value: quantity },
                ],
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onSuccess: async (response: any) => {
                try {
                    const res = await fetch('https://classybooks.onrender.com/api/verify-payment', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            reference: response.reference,
                            eventId: selectedShow.id,
                            eventName: selectedShow.name,
                            customerName: formData.name,
                            customerEmail: formData.email,
                            customerPhone: formData.phone,
                            amount: totalAmount,
                            quantity: quantity
                        })
                    });

                    if (!res.ok) {
                        throw new Error('Backend verification failed');
                    }

                    // Call internal email API route
                    fetch('/api/send-ticket', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            customerEmail: formData.email,
                            customerName: formData.name,
                            eventName: selectedShow.name,
                            quantity: quantity,
                            totalAmount: totalAmount,
                            date: selectedShow.date,
                            location: selectedShow.location,
                            ticketId: `VP-${Date.now().toString().slice(-6)}`,
                            eventImageUrl: selectedShow.imageUrl || undefined
                        })
                    }).catch(err => console.error('Error dispatching ticket email:', err));

                    setIsProcessing(false);
                    setSuccessMessage(`Tickets for ${selectedShow.name} confirmed! Please check your email for the e-tickets.`);
                } catch (error) {
                    console.error('Error verifying payment:', error);
                    alert('Payment succeeded but we could not verify the ticket on our end. Please contact support.');
                    setIsProcessing(false);
                }
            },
            onCancel: () => {
                setIsProcessing(false);
            },
            onLoad: () => {
                // Window loaded
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                console.error('Paystack error:', error);
                alert(`Payment error: ${error.message || 'Unknown error'}`);
                setIsProcessing(false);
            }
        });
    };

    const handleSupportSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSupportStatus('submitting');
        
        const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
        if (!accessKey) {
            alert('Web3Forms key is missing in environment variables.');
            setSupportStatus('error');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('access_key', accessKey);
            formData.append('subject', supportForm.subject);
            formData.append('name', supportForm.name);
            formData.append('email', supportForm.email);
            formData.append('phone', supportForm.phone);
            formData.append('message', supportForm.message);

            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const data = await res.json();
            if (data.success) {
                setSupportStatus('success');
                setSupportForm({ name: '', email: '', phone: '', subject: '', message: '' });
                setTimeout(() => setSupportStatus('idle'), 5000);
            } else {
                setSupportStatus('error');
            }
        } catch (err) {
            console.error('Support form error:', err);
            setSupportStatus('error');
        }
    };

    return (
        <div className="showman-root">
            <div className="noise-overlay"></div>
            
            <div className="container">
                <header>
                    <div className="center-star">★</div>
                    <div className="pre-title">NYASHINSKI</div>
                    <h1>SHOWMAN</h1>
                    <div className="subtitle">THE RESIDENCY</div>
                </header>
                
                <div className="shows-section">
                    <div className="shows-grid">
                        {showsToDisplay.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '40px', color: '#1d1d1d', fontSize: '1.5rem' }}>
                                Loading shows...
                            </div>
                        ) : showsToDisplay.map((show, idx) => (
                            <div 
                                key={idx} 
                                className="show-card" 
                                style={{ background: show.bg, color: show.fg, cursor: 'pointer' }}
                                onClick={() => openModal(show)}
                            >
                                <div className="show-card-left">
                                    <div className="show-date-compact" style={{ color: show.fg }}>{show.formattedDate}</div>
                                    <div className="show-day-time">{show.dayShort} {show.showTime}</div>
                                </div>
                                <div className="show-card-right">
                                    <div className="show-event-name" style={{ color: show.nameColor }}>
                                        {show.name.replace(' - ', ' \n')}
                                    </div>
                                    <div className="show-venue" style={{ color: '#ffffff' }}>
                                        {show.location}
                                    </div>
                                    {show.isVip && <div className="vip-show-badge"><span className="vip-star">★</span> VIP SHOW</div>}
                                    <button className={`btn-buy ${show.isVip ? 'vip-button' : ''}`}>
                                        GET TICKETS
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Simplified Contact Section copied from original */}
                <section className="support-section">
                    <h3 className="support-title">Support / Inquiries</h3>
                    <p className="support-subtitle">Have a question? Send us a message and our team will get back to you.</p>
                    <form className="support-form" onSubmit={handleSupportSubmit}>
                        <div className="support-row">
                            <input type="text" placeholder="Your name" required 
                                value={supportForm.name} onChange={e => setSupportForm({...supportForm, name: e.target.value})} />
                            <input type="email" placeholder="Your email" required 
                                value={supportForm.email} onChange={e => setSupportForm({...supportForm, email: e.target.value})} />
                        </div>
                        <div className="support-row">
                            <input type="tel" placeholder="Your phone (optional)" 
                                value={supportForm.phone} onChange={e => setSupportForm({...supportForm, phone: e.target.value})} />
                            <input type="text" placeholder="Subject" required 
                                value={supportForm.subject} onChange={e => setSupportForm({...supportForm, subject: e.target.value})} />
                        </div>
                        <textarea placeholder="Type your message here..." required
                                value={supportForm.message} onChange={e => setSupportForm({...supportForm, message: e.target.value})}></textarea>
                        
                        {supportStatus === 'success' && <p style={{color: '#0f7b2d', marginTop: '10px', fontSize: '0.9rem', fontWeight: 'bold'}}>Your message has been sent successfully!</p>}
                        {supportStatus === 'error' && <p style={{color: '#b42318', marginTop: '10px', fontSize: '0.9rem', fontWeight: 'bold'}}>There was an error sending your message. Please try again.</p>}
                        
                        <button type="submit" disabled={supportStatus === 'submitting'} style={{marginTop: '10px'}}>
                            {supportStatus === 'submitting' ? 'SENDING...' : 'SEND INQUIRY'}
                        </button>
                    </form>
                </section>

                <div className="footer-note">
                    ★ TICKET COST SUBJECT TO AVAILABILITY ★
                </div>
            </div>

            {/* Ticket Modal */}
            <div className={`modal ${isModalOpen ? 'active' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
                <div className="modal-content">
                    <button type="button" className="close-btn" onClick={closeModal}>&times;</button>
                    
                    {!successMessage ? (
                        <div id="formSection">
                            <h2 className="modal-title">{selectedShow?.name}</h2>
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
                                    <label>Ticket Type</label>
                                    <select required>
                                        <option value={selectedShow?.price || ""}>
                                            {selectedShow ? `${selectedShow.name.toUpperCase().includes('VIP') ? 'VIP' : 'General Admission'} - KES ${selectedShow.price.toLocaleString()}` : 'Select ticket type'}
                                        </option>
                                    </select>
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
                                        Total Amount: KES {selectedShow ? (selectedShow.price * parseInt(formData.tickets)).toLocaleString() : 0}
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
                            <p style={{ marginTop: '15px', lineHeight: 1.6, fontSize: '0.95rem', color: '#1d1d1d', fontWeight: 600 }}>
                                {successMessage}
                            </p>
                            <button type="button" className="submit-btn" style={{ marginTop: '20px' }} onClick={closeModal}>CLOSE</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
