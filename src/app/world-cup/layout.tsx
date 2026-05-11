import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FIFA World Cup 2026™ | Tickets & Hospitality - VibePass",
  description: "Secure your tickets and hospitality packages for the FIFA World Cup 2026™ across 16 venues in USA, Canada & Mexico. 104 matches. One unforgettable tournament.",
};

export default function WorldCupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      {children}
    </div>
  );
}
