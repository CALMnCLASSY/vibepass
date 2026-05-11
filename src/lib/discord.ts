export async function sendDiscordNotification(
  type: 'payment' | 'inquiry',
  content: string,
  embeds?: any[]
) {
  const webhookUrl = 
    type === 'payment' 
      ? process.env.DISCORD_PAYMENTS_WEBHOOK_URL 
      : process.env.DISCORD_INQUIRIES_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error(`Discord webhook URL for ${type} not found`);
    return;
  }

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content,
        embeds,
      }),
    });
  } catch (error) {
    console.error('Error sending Discord notification:', error);
  }
}
