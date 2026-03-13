import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      fromName,
      fromEmail,
      subject,
      message,
      phone = 'Not provided',
      formType = 'Contact Form'
    } = body;

    if (!fromEmail || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const smtpEmail = process.env.SMTP_EMAIL;
    const smtpPassword = process.env.SMTP_PASSWORD;

    if (!smtpEmail || !smtpPassword) {
      console.error('SMTP credentials are not set');
      return NextResponse.json({ error: 'Email service configuration error' }, { status: 500 });
    }

    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #f6f6f9; padding: 20px;">
        <h2 style="color: #1d1c1d; border-bottom: 2px solid #8b5cf6; padding-bottom: 10px;">New ${formType} Submission</h2>
        <p><strong>Name:</strong> ${fromName || 'Not provided'}</p>
        <p><strong>Email:</strong> <a href="mailto:${fromEmail}">${fromEmail}</a></p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Subject:</strong> ${subject || 'No subject'}</p>
        <br/>
        <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #e1e0e8;">
          <p style="white-space: pre-wrap; margin: 0; color: #525f7f; line-height: 1.5;">${message}</p>
        </div>
      </div>
    `;

    // Create a Nodemailer transporter using Gmail explicit SMTP
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // Use STARTTLS
      auth: {
        user: smtpEmail,
        pass: smtpPassword,
      },
      // Force IPv4 to avoid ENETUNREACH errors on certain hosting providers like Railway
      family: 4,
      connectionTimeout: 15000, // 15 seconds
      greetingTimeout: 15000,
      socketTimeout: 15000,
      debug: true,
      logger: true
    } as any);

    // Send the email to the admin/owner (from themselves, but authenticated)
    const info = await transporter.sendMail({
      from: `"Vibe Pass System" <${smtpEmail}>`, 
      to: smtpEmail, // Send to the owner
      replyTo: fromEmail, // So clicking reply responds to the customer
      subject: `[VibePass] ${subject || formType + ' Submission'}`,
      html: htmlContent,
    });

    console.log('Admin notification sent: %s', info.messageId);
    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (error: any) {
    console.error('Form email sending error:', error);
    return NextResponse.json({ 
      error: error.message || 'Failed to send email', 
      details: error.toString() 
    }, { status: 500 });
  }
}
