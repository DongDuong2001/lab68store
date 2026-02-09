import { Container } from "@/components/ui";

export default function PrivacyPage() {
  return (
    <section className="border-b-3 border-black">
      <Container className="py-16 max-w-3xl">
        <h1 className="heading-caps text-3xl md:text-4xl mb-8">
          Privacy Policy
        </h1>
        <div className="prose prose-lg max-w-none space-y-6">
          <div className="neo-border p-6">
            <h2 className="heading-caps text-lg mb-3">Data Collection</h2>
            <p className="text-gray-700 leading-relaxed">
              We collect only the data necessary to process your purchases and
              deliver products. This includes your email address, payment
              information (processed securely by Stripe), and order history.
            </p>
          </div>
          <div className="neo-border p-6">
            <h2 className="heading-caps text-lg mb-3">Data Usage</h2>
            <p className="text-gray-700 leading-relaxed">
              Your data is used solely for order fulfillment, license
              management, and customer support. We do not sell or share your
              personal information with third parties.
            </p>
          </div>
          <div className="neo-border p-6">
            <h2 className="heading-caps text-lg mb-3">Cookies</h2>
            <p className="text-gray-700 leading-relaxed">
              We use essential cookies for authentication and session management.
              No tracking or advertising cookies are used.
            </p>
          </div>
          <div className="neo-border p-6">
            <h2 className="heading-caps text-lg mb-3">Contact</h2>
            <p className="text-gray-700 leading-relaxed">
              For privacy-related inquiries, contact us at privacy@lab68.dev.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
