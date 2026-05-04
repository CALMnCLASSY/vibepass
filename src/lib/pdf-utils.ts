import { jsPDF } from 'jspdf';

export async function generateTicketPDF(data: {
  ticketId: string;
  customerName: string;
  eventName: string;
  date: string;
  location: string;
  quantity: number;
  totalAmount: number;
  qrCodeUrl: string;
}) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Colors
  const purple = '#8b5cf6';
  const dark = '#0a0a0a';

  // Header Background
  doc.setFillColor(dark);
  doc.rect(0, 0, 210, 40, 'F');

  // Header Text
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('VIBE PASS', 105, 25, { align: 'center' });

  // Event Section
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(20);
  doc.text(data.eventName, 20, 60);

  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text('E-TICKET FOR ADMISSION', 20, 68);

  // Divider
  doc.setDrawColor(200, 200, 200);
  doc.line(20, 75, 190, 75);

  // Ticket Details
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('TICKET ID:', 20, 90);
  doc.setFont('helvetica', 'normal');
  doc.text(data.ticketId, 60, 90);

  doc.setFont('helvetica', 'bold');
  doc.text('CUSTOMER:', 20, 100);
  doc.setFont('helvetica', 'normal');
  doc.text(data.customerName, 60, 100);

  doc.setFont('helvetica', 'bold');
  doc.text('DATE:', 20, 110);
  doc.setFont('helvetica', 'normal');
  doc.text(data.date, 60, 110);

  doc.setFont('helvetica', 'bold');
  doc.text('LOCATION:', 20, 120);
  doc.setFont('helvetica', 'normal');
  doc.text(data.location, 60, 120);

  doc.setFont('helvetica', 'bold');
  doc.text('QUANTITY:', 20, 130);
  doc.setFont('helvetica', 'normal');
  doc.text(`${data.quantity}x Admission`, 60, 130);

  // QR Code
  // Note: jspdf's addImage requires an image data URL. 
  // Since we're using an external URL, we'd need to fetch it first.
  // For now, I'll use a placeholder or assume the URL is already fetched (but it's not).
  // Better: The PDF can just contain the Ticket ID and text, 
  // or we fetch the QR image on the server before adding it.

  try {
    console.log('Fetching QR code image from:', data.qrCodeUrl);
    const qrResponse = await fetch(data.qrCodeUrl);
    console.log('QR response status:', qrResponse.status);
    const qrBuffer = await qrResponse.arrayBuffer();
    console.log('QR buffer size:', qrBuffer.byteLength);
    const qrBase64 = Buffer.from(qrBuffer).toString('base64');
    doc.addImage(`data:image/png;base64,${qrBase64}`, 'PNG', 75, 150, 60, 60);
    console.log('QR code added to PDF');
  } catch (err) {
    console.error('Failed to add QR code to PDF:', err);
    doc.text(`TICKET ID: ${data.ticketId}`, 105, 180, { align: 'center' });
  }

  // Footer
  doc.setFontSize(10);
  doc.setTextColor(150, 150, 150);
  doc.text('Please present this PDF at the entrance.', 105, 250, { align: 'center' });
  doc.text('Keep your ticket secure. Unique ID scanned once per entry.', 105, 255, { align: 'center' });

  return doc.output('datauristring').split(',')[1]; // Return base64 content
}
