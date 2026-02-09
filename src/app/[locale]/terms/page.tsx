import { Container } from "@/components/ui";

export default function TermsPage() {
  return (
    <section className="border-b-3 border-black">
      <Container className="py-16 max-w-3xl">
        <h1 className="heading-caps text-3xl md:text-4xl mb-8">
          Terms of Service
        </h1>
        <div className="prose prose-lg max-w-none space-y-6">
          <div className="neo-border p-6">
            <h2 className="heading-caps text-lg mb-3">License</h2>
            <p className="text-gray-700 leading-relaxed">
              Each purchase grants you a single-user license to use the source
              code in unlimited personal and commercial projects. You may not
              redistribute, resell, or sublicense the source code.
            </p>
          </div>
          <div className="neo-border p-6">
            <h2 className="heading-caps text-lg mb-3">Refunds</h2>
            <p className="text-gray-700 leading-relaxed">
              Due to the digital nature of our products, all sales are final.
              If you experience technical issues, contact support and we will
              work with you to resolve them.
            </p>
          </div>
          <div className="neo-border p-6">
            <h2 className="heading-caps text-lg mb-3">Support</h2>
            <p className="text-gray-700 leading-relaxed">
              All products include basic support via email. We respond to
              inquiries within 48 business hours. Extended support packages are
              available upon request.
            </p>
          </div>
          <div className="neo-border p-6">
            <h2 className="heading-caps text-lg mb-3">Updates</h2>
            <p className="text-gray-700 leading-relaxed">
              Product updates, when available, are provided free of charge to
              existing license holders. Major version upgrades may require a
              separate purchase.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
