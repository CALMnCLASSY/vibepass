// Removed to prevent build errors since package cannot be installed in this env.
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface TicketEmailProps {
  customerName: string;
  eventName: string;
  quantity: number;
  totalAmount: number;
  date: string;
  location: string;
  ticketId: string;
  eventImageUrl?: string;
}

export const TicketEmail = ({
  customerName = "Guest",
  eventName = "Vibe Pass Event",
  quantity = 1,
  totalAmount = 0,
  date = "TBA",
  location = "TBA",
  ticketId = "VP-000000",
  eventImageUrl = "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=3000&auto=format&fit=crop",
}: TicketEmailProps) => {
  const previewText = `Your ticket(s) for ${eventName} are confirmed!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={brandName}>VIBE PASS AFRICA</Text>
          </Section>
          
          <Img
            src={eventImageUrl}
            width="100%"
            height="250"
            alt="Event Image"
            style={heroImage}
          />
          
          <Section style={contentSection}>
            <Heading style={heading}>You're Going to {eventName}!</Heading>
            <Text style={text}>
              Hi {customerName},
              <br />
              <br />
              Your payment of <strong>KES {totalAmount.toLocaleString()}</strong> has been successfully processed. Here are your e-tickets for the event. Have an amazing time!
            </Text>

            <Section style={ticketBox}>
              <div style={ticketHeader}>
                <Text style={ticketIdText}>TICKET #{ticketId}</Text>
                <Text style={ticketQuantity}>{quantity}x ADMISSION</Text>
              </div>
              
              <Hr style={divider} />
              
              <div style={ticketDetails}>
                <div style={detailItem}>
                  <Text style={detailLabel}>EVENT</Text>
                  <Text style={detailValue}>{eventName}</Text>
                </div>
                <div style={detailItem}>
                  <Text style={detailLabel}>DATE & TIME</Text>
                  <Text style={detailValue}>{date}</Text>
                </div>
                <div style={detailItem}>
                  <Text style={detailLabel}>LOCATION</Text>
                  <Text style={detailValue}>{location}</Text>
                </div>
              </div>
              
              <Hr style={divider} />
              
              <Section style={qrSection}>
                {/* Fallback mock QR code using a public API for aesthetic purposes */}
                <Img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${ticketId}`}
                  width="120"
                  height="120"
                  alt="QR Code"
                  style={qrCode}
                />
                <Text style={scanText}>
                  Please present this code at the entrance
                </Text>
              </Section>
            </Section>

            <Text style={footerText}>
              Keep this email safe. Your ticket contains a unique QR code that will be scanned at the venue.
              <br />
              For support, please reply directly to this email or contact us on the website.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default TicketEmail;

// --- Styles ---

const main = {
  backgroundColor: "#f6f6f9",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "100%",
  maxWidth: "600px",
};

const header = {
  padding: "24px",
  textAlign: "center" as const,
  backgroundColor: "#0a0a0a",
  borderTopLeftRadius: "12px",
  borderTopRightRadius: "12px",
};

const brandName = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0",
  letterSpacing: "0.1em",
};

const heroImage = {
  objectFit: "cover" as const,
};

const contentSection = {
  padding: "32px 24px",
  backgroundColor: "#ffffff",
  borderBottomLeftRadius: "12px",
  borderBottomRightRadius: "12px",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
};

const heading = {
  fontSize: "26px",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#1d1c1d",
  margin: "0 0 16px",
  textAlign: "center" as const,
};

const text = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#525f7f",
  margin: "0 0 24px",
};

const ticketBox = {
  backgroundColor: "#f0eff6",
  borderRadius: "12px",
  border: "2px solid #e1e0e8",
  padding: "24px",
  margin: "32px 0",
};

const ticketHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "16px",
};

const ticketIdText = {
  fontSize: "14px",
  fontWeight: "700",
  color: "#8b5cf6",
  margin: "0",
  letterSpacing: "1px",
};

const ticketQuantity = {
  fontSize: "14px",
  fontWeight: "700",
  color: "#1d1c1d",
  margin: "0",
  backgroundColor: "#ffffff",
  padding: "4px 8px",
  borderRadius: "6px",
  border: "1px solid #e1e0e8",
};

const divider = {
  borderColor: "#e1e0e8",
  margin: "16px 0",
  borderStyle: "dashed",
};

const ticketDetails = {
  margin: "20px 0",
};

const detailItem = {
  marginBottom: "16px",
};

const detailLabel = {
  fontSize: "12px",
  fontWeight: "bold",
  color: "#8898aa",
  margin: "0 0 4px",
  letterSpacing: "0.5px",
};

const detailValue = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#1d1c1d",
  margin: "0",
};

const qrSection = {
  textAlign: "center" as const,
  marginTop: "24px",
};

const qrCode = {
  margin: "0 auto",
  borderRadius: "8px",
  border: "4px solid #ffffff",
  backgroundColor: "#ffffff",
};

const scanText = {
  fontSize: "13px",
  color: "#525f7f",
  marginTop: "12px",
  fontStyle: "italic",
};

const footerText = {
  fontSize: "13px",
  lineHeight: "20px",
  color: "#8898aa",
  textAlign: "center" as const,
  marginTop: "32px",
};
