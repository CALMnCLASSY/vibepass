export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-12">Terms of <span className="text-gradient">Service</span></h1>
      
      <div className="space-y-12 text-slate-700 leading-relaxed text-lg">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using VibePass, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. We reserve the right to modify these terms at any time without prior notice.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Ticket Purchasing</h2>
          <p>
            VibePass acts as a marketplace for event tickets. All sales are final. Once a purchase is confirmed, it cannot be cancelled or refunded except in the event of total cancellation of the performance without a rescheduled date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Delivery of Tickets</h2>
          <p>
            Tickets are typically delivered electronically via email or mobile transfer. It is the responsibility of the buyer to provide a valid email address and ensure they have the necessary technology to receive and use the tickets.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Authenticity Guarantee</h2>
          <p>
            We guarantee that all tickets purchased through VibePass will be valid for entry. In the rare event that a ticket is not accepted by the venue, VibePass will provide a 100% refund of the purchase price.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">5. User Conduct</h2>
          <p>
            Users agree not to use the platform for any illegal activities or to circumvent any platform security measures. Attempting to manipulate ticket prices or use automated tools for purchasing is strictly prohibited.
          </p>
        </section>

        <section className="pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-500">
            Last updated: May 2026
          </p>
        </section>
      </div>
    </div>
  );
}
