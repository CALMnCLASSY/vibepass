import type { Metadata } from "next";
import React, { Suspense } from "react";
import { Outfit } from "next/font/google";
import Script from "next/script";
import VisitorTracker from "@/components/VisitorTracker";
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
      <body className={`${outfit.variable} font-sans antialiased bg-background text-foreground`}>
        <Suspense fallback={null}>
          <VisitorTracker />
        </Suspense>
        {children}
        <Script src="https://js.paystack.co/v2/inline.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
