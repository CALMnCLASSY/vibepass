import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SiteVisitNotifier } from "@/components/SiteVisitNotifier";
import Script from "next/script";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "VibePass | Buy & Sell Event Tickets",
  description: "The fan-first ticket marketplace. Buy from or sell to real fans for the world's biggest events — concerts, sports, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script src="https://checkout.flutterwave.com/v3.js" strategy="beforeInteractive" />
      </head>
      <body className={`${outfit.variable} font-sans antialiased flex flex-col min-h-screen`}>
        <SiteVisitNotifier />
        <Navbar />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
