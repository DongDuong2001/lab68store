import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Container, Button } from "@/components/ui";
import { ArrowRight } from "lucide-react";
import { ProductGrid } from "@/components/product-grid";

export default function HomePage() {
  const t = useTranslations("hero");
  const tp = useTranslations("products");

  return (
    <>
      {/* Hero Section */}
      <section className="border-b-3 border-black bg-white">
        <Container className="py-32 lg:py-40">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="heading-caps text-6xl md:text-8xl lg:text-9xl mb-8 leading-none">
              {t("title")}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              {t("subtitle")}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/products">
                <Button variant="primary" size="lg">
                  {t("cta")}
                  <ArrowRight className="ml-2 inline-block" size={18} />
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Products - Gallery Style */}
      <section className="bg-white">
        <Container className="py-24">
          <div className="mb-16 text-center">
            <h2 className="heading-caps text-4xl md:text-6xl mb-4">
              {tp("title")}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {tp("subtitle")}
            </p>
          </div>
          <ProductGrid featured />
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-black text-white border-t-3 border-black">
        <Container className="py-24 text-center">
          <h2 className="heading-caps text-4xl md:text-6xl mb-6">
            Ship Faster. Build Smarter.
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-xl leading-relaxed">
            Production-ready code built by senior engineers. Stop writing
            boilerplate from scratch.
          </p>
          <Link href="/products">
            <Button variant="secondary" size="lg">
              Browse All Products
              <ArrowRight className="ml-2 inline-block" size={18} />
            </Button>
          </Link>
        </Container>
      </section>
    </>
  );
}
