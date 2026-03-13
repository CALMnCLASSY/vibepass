import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      customerEmail, 
      customerName, 
      eventName, 
      quantity, 
      totalAmount,
      date = 'TBA',
      location = 'TBA',
      ticketId,
      eventImageUrl = 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=3000&auto=format&fit=crop'
    } = body;

    if (!customerEmail || !eventName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const smtpEmail = process.env.SMTP_EMAIL;
    const smtpPassword = process.env.SMTP_PASSWORD;

    if (!smtpEmail || !smtpPassword) {
      console.error('SMTP credentials are not set');
      return NextResponse.json({ error: 'Email service configuration error' }, { status: 500 });
    }

    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #f6f6f9; padding: 20px 0 48px;">
        <div style="background: #0a0a0a; padding: 24px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; font-size: 24px; letter-spacing: 0.1em; margin: 0;">VIBE PASS AFRICA</h1>
        </div>
        <img src="${eventImageUrl}" style="width: 100%; height: 250px; object-fit: cover;" alt="Event" />
        <div style="background: white; padding: 32px 24px; border-radius: 0 0 12px 12px;">
          <h2 style="text-align: center; color: #1d1c1d;">You're Going to ${eventName}!</h2>
          <p style="color: #525f7f; line-height: 1.5;">Hi ${customerName},<br/><br/>Your payment of <strong>KES ${totalAmount.toLocaleString()}</strong> has been successfully processed. Here are your e-tickets for the event. Have an amazing time!</p>
          
          <div style="background: #f0eff6; border: 2px solid #e1e0e8; border-radius: 12px; padding: 24px; margin: 32px 0;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 16px;">
              <strong style="color: #8b5cf6;">TICKET #${ticketId}</strong>
              <strong style="background: white; padding: 4px 8px; border-radius: 6px; border: 1px solid #e1e0e8;">${quantity}x ADMISSION</strong>
            </div>
            <hr style="border: none; border-top: 2px dashed #e1e0e8; margin: 16px 0;" />
            <div style="margin-bottom: 16px;">
              <div style="color: #8898aa; font-size: 12px; font-weight: bold;">EVENT</div>
              <div style="font-size: 18px; font-weight: 600;">${eventName}</div>
            </div>
            <div style="margin-bottom: 16px;">
              <div style="color: #8898aa; font-size: 12px; font-weight: bold;">DATE & TIME</div>
              <div style="font-size: 18px; font-weight: 600;">${date}</div>
            </div>
            <div>
              <div style="color: #8898aa; font-size: 12px; font-weight: bold;">LOCATION</div>
              <div style="font-size: 18px; font-weight: 600;">${location}</div>
            </div>
            <hr style="border: none; border-top: 2px dashed #e1e0e8; margin: 16px 0;" />
            <div style="text-align: center; margin-top: 24px;">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${ticketId}" style="border: 4px solid white; border-radius: 8px;" alt="QR" />
              <p style="color: #525f7f; font-size: 13px; font-style: italic; margin-top: 12px;">Please present this code at the entrance</p>
            </div>
          </div>
          <p style="text-align: center; color: #8898aa; font-size: 13px; line-height: 1.5;">Keep this email safe. Your ticket contains a unique QR code that will be scanned at the venue.</p>
        </div>
      </div>
    `;

    // Create a Nodemailer transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpEmail,
        pass: smtpPassword, // App-specific password required for Gmail
      },
    });

    // Send the email
    const info = await transporter.sendMail({
      from: `"Vibe Pass Africa" <${smtpEmail}>`, 
      to: customerEmail,
      subject: `Your Tickets for ${eventName} 🎟️`,
      html: htmlContent,
    });

    console.log('Message sent: %s', info.messageId);
    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (error: any) {
    console.error('Email sending error:', error);
    return NextResponse.json({ error: error.message || 'Failed to send email' }, { status: 500 });
  }
}
