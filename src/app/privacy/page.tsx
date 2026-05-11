export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-12">Privacy <span className="text-gradient">Policy</span></h1>
      
      <div className="space-y-12 text-slate-700 leading-relaxed text-lg">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Information We Collect</h2>
          <p>
            When you purchase a ticket as a guest, we collect necessary information including your name, email address, and billing information. This data is used solely to process your order and deliver your tickets.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">2. How We Use Your Data</h2>
          <p>
            Your information is used to facilitate ticket delivery, provide customer support, and communicate essential event updates. We do not sell your personal information to third-party marketers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Security Measures</h2>
          <p>
            We implement industry-standard security protocols, including SSL encryption for all transactions, to ensure your data remains protected. Payment information is handled through secure, PCI-compliant processors.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Cookies and Tracking</h2>
          <p>
            We use essential cookies to maintain your shopping cart and provide a personalized experience. You can manage cookie preferences through your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Your Rights</h2>
          <p>
            You have the right to request access to your data or ask for its deletion. For any privacy-related inquiries, please contact us at myvibepass@gmail.com.
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
