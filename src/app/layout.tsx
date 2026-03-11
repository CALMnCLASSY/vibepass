import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vibe Pass Africa",
  description: "Your All-Access Pass to Africa's Biggest Vibes. The ultimate plug for concerts, festivals, and exclusive events.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} antialiased bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}
