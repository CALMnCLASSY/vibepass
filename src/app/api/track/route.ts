import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { url, userAgent, timestamp, referrer } = await request.json();

    const webhookUrl = process.env.DISCORD_INQUIRIES_WEBHOOK_URL;

    if (!webhookUrl) {
      console.warn("Discord Inquiries Webhook URL not configured.");
      return NextResponse.json({ success: false, error: 'Webhook URL missing' }, { status: 500 });
    }

    // Extract some basic device info from userAgent
    let deviceType = "Desktop";
    if (userAgent?.match(/Mobile|Android|iPhone/i)) {
      deviceType = "Mobile";
    } else if (userAgent?.match(/Tablet|iPad/i)) {
      deviceType = "Tablet";
    }

    const pathPart = url ? new URL(url).pathname : "Unknown";

    // Format a nice embed for Discord
    const embed = {
      title: "🌍 New Website Visitor",
      url: url || undefined,
      description: `A user has just visited **${pathPart}**`,
      color: 9053334, // A nice purple matching VibePass branding
      fields: [
        {
          name: "📍 Page URL",
          value: url || "Unknown URL",
          inline: false
        },
        {
          name: "🔄 Referrer",
          value: referrer && referrer !== "" ? referrer : "Direct / None",
          inline: true
        },
        {
          name: "📱 Device",
          value: deviceType,
          inline: true
        },
        {
          name: "💻 User Agent",
          value: `\`\`\`${userAgent || "Unknown"}\`\`\``,
          inline: false
        },
        {
          name: "⏰ Time",
          value: new Date(timestamp).toLocaleString('en-US', { timeZone: 'UTC' }) + " (UTC)",
          inline: false
        }
      ],
      thumbnail: {
        url: "https://vibepass.africa/logo.png" // Fallback aesthetic
      },
      footer: {
        text: "VibePass Global Analytics • System Notification"
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
