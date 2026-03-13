import { NextResponse } from 'next/server';

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
    const brevoApiKey = process.env.BREVO_API_KEY;

    if (!smtpEmail || !brevoApiKey) {
      console.error('Brevo credentials are not set');
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

    // Send email via Brevo REST API
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': brevoApiKey,
      },
      body: JSON.stringify({
        sender: { name: "Vibe Pass System", email: smtpEmail },
        to: [{ email: smtpEmail, name: "Vibe Pass Admin" }],
        replyTo: { email: fromEmail, name: fromName || "Customer" },
        subject: `[VibePass] ${subject || formType + ' Submission'}`,
        htmlContent: htmlContent,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Brevo API Error:', data);
      return NextResponse.json({ 
        error: data.message || 'Failed to send email via Brevo',
        details: JSON.stringify(data)
      }, { status: response.status });
    }

    console.log('Admin notification sent via Brevo:', data.messageId);
    return NextResponse.json({ success: true, messageId: data.messageId });
  } catch (error: any) {
    console.error('Form email sending error:', error);
    return NextResponse.json({ 
      error: error.message || 'Failed to send email', 
      details: error.toString() 
    }, { status: 500 });
  }
}
