import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { url, userAgent, timestamp, referrer } = await request.json();

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      console.warn("Discord Webhook URL not configured.");
      return NextResponse.json({ success: false, error: 'Webhook URL missing' }, { status: 500 });
    }

    // Format a nice embed for Discord
    const embed = {
      title: "🌍 New Website Visitor",
      color: 9053334, // A nice purple matching VibePass branding
      fields: [
        {
          name: "Page Visited",
          value: url || "Unknown URL",
          inline: false
        },
        {
          name: "Referrer",
          value: referrer || "Direct / None",
          inline: false
        },
        {
          name: "User Agent",
          value: userAgent || "Unknown Device",
          inline: false
        },
        {
          name: "Time",
          value: new Date(timestamp).toLocaleString(),
          inline: false
        }
      ],
      footer: {
        text: "VibePass Africa Analytics"
      },
      timestamp: new Date().toISOString()
    };

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
