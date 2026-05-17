import { NextRequest, NextResponse } from 'next/server';
import { sendDiscordNotification } from '@/lib/discord';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, ticketCategory, numberOfTickets, askingPrice, notes, eventId } = body;

    if (!fullName || !email || !ticketCategory || !numberOfTickets || !askingPrice || !eventId) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    await sendDiscordNotification(
      'inquiry',
      '🎟️ **New Ticket Sell Listing Request**',
      [
        {
          title: `Sell Request — Event ID: ${eventId}`,
          color: 0x10b981, // Emerald
          fields: [
            { name: '👤 Seller Name', value: fullName, inline: true },
            { name: '📧 Email', value: email, inline: true },
            { name: '🎫 Ticket Category', value: ticketCategory, inline: true },
            { name: '🔢 Number of Tickets', value: numberOfTickets.toString(), inline: true },
            { name: '💰 Asking Price (per ticket)', value: `$${askingPrice}`, inline: true },
            { name: '📋 Notes', value: notes || 'N/A', inline: false },
          ],
          footer: { text: 'VibePass Marketplace — Seller Lead' },
          timestamp: new Date().toISOString(),
        },
      ]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Sell API error:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
