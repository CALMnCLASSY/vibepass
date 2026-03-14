import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, embed } = body;

    let webhookUrl = '';
    if (type === 'inquiry') {
      webhookUrl = process.env.DISCORD_INQUIRIES_WEBHOOK_URL || '';
    } else if (type === 'payment') {
      webhookUrl = process.env.DISCORD_PAYMENTS_WEBHOOK_URL || '';
    }

    if (!webhookUrl) {
      console.warn(`Discord Webhook URL for ${type} not configured.`);
      return NextResponse.json({ success: false, error: 'Webhook URL missing' }, { status: 500 });
    }

    const payload = {
      embeds: [embed]
    };

    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      throw new Error(`Discord returned ${res.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending Discord webhook:", error);
    return NextResponse.json({ success: false, error: 'Failed to send webhook' }, { status: 500 });
  }
}
