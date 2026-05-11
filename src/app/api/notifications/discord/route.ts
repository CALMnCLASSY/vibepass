import { NextResponse } from 'next/server';
import { sendDiscordNotification } from '@/lib/discord';

export async function POST(request: Request) {
  try {
    const { type, content, embeds } = await request.json();

    if (!content && !embeds) {
      return NextResponse.json({ error: 'Missing content or embeds' }, { status: 400 });
    }

    await sendDiscordNotification(type || 'inquiry', content, embeds);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Discord API Route Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
