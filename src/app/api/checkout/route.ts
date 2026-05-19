import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';
import { getMatchById, getVenueById } from '@/data/worldcup';

// Ensure Resend API Key is set in your environment
const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

export async function POST(request: Request) {
  try {
    const { eventId, email, quantity, categoryName, price, matchesIncluded } = await request.json();

    if (!eventId || !email || !quantity || quantity < 1) {
      return NextResponse.json(
        { error: 'Missing required fields or invalid quantity' },
        { status: 400 }
      );
    }

    let eventName = '';
    let eventPrice = 0;
    let eventDate = '';
    let eventLocation = '';
    let isMatch = false;
    let ticket = null;

    const isWorldCupMatch = eventId.startsWith('m');
    const isHospitality = eventId.includes('package') || eventId.includes('series') || eventId.includes('pass');
    const isAfronation = eventId.startsWith('afronation');

    if (isWorldCupMatch || isHospitality || isAfronation) {
      // 1. World Cup Match, Hospitality Package, or Afronation
      if (isWorldCupMatch) {
        const match = getMatchById(eventId);
        if (!match) {
          return NextResponse.json({ error: 'Match not found' }, { status: 404 });
        }
        const venue = getVenueById(match.venue_id);
        const catName = categoryName || 'Standard Match Ticket';
        eventName = `FIFA World Cup 2026™: ${match.home_team} vs ${match.away_team} (${catName})`;
        eventPrice = price || 450;
        eventDate = match.date;
        eventLocation = venue ? `${venue.name}, ${venue.city}, ${venue.country}` : 'TBA';
      } else if (isAfronation) {
        eventName = `Afro Nation Portugal 2026: ${categoryName || 'Standard Ticket'}`;
        eventPrice = price || 479.68;
        eventDate = '2026-07-09';
        eventLocation = 'Praia da Rocha, Portimão, Portugal';
      } else {
        eventName = `FIFA World Cup 2026™ — ${categoryName || 'Hospitality Package'}`;
        eventPrice = price || 3200;
        eventDate = '2026-06-11';
        eventLocation = 'Selected World Cup Host Stadiums';
      }
      
      isMatch = true;

      // Create a premium mock ticket record
      const idPrefix = isAfronation ? 't-an' : 't-wc';
      ticket = {
        id: `${idPrefix}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        event_id: eventId,
        guest_email: email,
        quantity: quantity,
        total_price: eventPrice * quantity,
        payment_status: 'completed',
      };
    } else {
      // 2. Fetch standard Event from Supabase
      const { data: event, error: eventError } = await supabase
        .from('events')
        .select('name, price, date, location')
        .eq('id', eventId)
        .single();

      if (eventError || !event) {
        return NextResponse.json({ error: 'Event not found' }, { status: 404 });
      }

      eventName = event.name;
      eventPrice = event.price;
      eventDate = event.date;
      eventLocation = event.location;

      // Insert Ticket Record
      const { data: dbTicket, error: ticketError } = await supabase
        .from('tickets')
        .insert([
          {
            event_id: eventId,
            guest_email: email,
            quantity: quantity,
            total_price: eventPrice * quantity,
            payment_status: 'completed',
          },
        ])
        .select()
        .single();

      if (ticketError) {
        console.error('Error inserting ticket:', ticketError);
        return NextResponse.json(
          { error: 'Failed to process ticket' },
          { status: 500 }
        );
      }
      ticket = dbTicket;
    }

    const totalPrice = eventPrice * quantity;

    // 3. Send Email via Resend
    const formattedDate = new Date(eventDate + (eventDate.includes('T') ? '' : 'T00:00:00')).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...(eventDate.includes('T') && { hour: '2-digit', minute: '2-digit' })
    });

    const matchesListHtml = matchesIncluded && Array.isArray(matchesIncluded)
      ? `<div style="margin-top: 12px; padding: 12px; background-color: #f3e8ff; border-radius: 8px; border: 1px solid #e9d5ff;">
           <p style="margin: 0 0 6px 0; font-weight: bold; color: #581c87;">Included Matches:</p>
           <ul style="margin: 0; padding-left: 20px; color: #6b21a8;">
             ${matchesIncluded.map((m: string) => `<li>${m}</li>`).join('')}
           </ul>
         </div>`
      : '';

    try {
      await resend.emails.send({
        from: 'VibePass <onboarding@resend.dev>', // Resend default testing domain
        to: email,
        subject: `Your Tickets for ${eventName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
            <div style="background-color: #2563eb; color: white; padding: 24px; text-align: center;">
              <h1 style="margin: 0;">🎫 You're going to ${eventName}!</h1>
            </div>
            <div style="padding: 24px; background-color: #f8fafc;">
              <p>Hello,</p>
              <p>Your guest checkout was successful. Here are your ticket details:</p>
              
              <div style="background-color: white; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; margin-top: 20px;">
                <p><strong>Event:</strong> ${eventName}</p>
                <p><strong>Quantity:</strong> ${quantity}x</p>
                <p><strong>Total Paid:</strong> $${totalPrice.toFixed(2)}</p>
                <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
                <p><strong>When:</strong> ${formattedDate}</p>
                <p><strong>Where:</strong> ${eventLocation}</p>
                <p><strong>Ticket ID:</strong> <span style="font-family: monospace; background: #f1f5f9; padding: 4px;">${ticket.id}</span></p>
                ${matchesListHtml}
              </div>

              <p style="margin-top: 24px;">Please keep this email safe. Show the Ticket ID at the entrance.</p>
              <p>Enjoy the event!<br/>- The VibePass Team</p>
            </div>
          </div>
        `,
      });
    } catch (emailError) {
      console.error('Error sending email via Resend:', emailError);
      // We still return success because the ticket was processed, just email failed
      return NextResponse.json({
        success: true,
        message: 'Ticket purchased, but email delivery failed.',
        ticket,
      });
    }

    return NextResponse.json({ success: true, ticket });
  } catch (error) {
    console.error('Checkout API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
