import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Container, Button } from "@/components/ui";
import { ArrowRight, Sparkles } from "lucide-react";
import { ProductGrid } from "@/components/product-grid";

export default function HomePage() {
  const t = useTranslations("hero");
  const tp = useTranslations("products");

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white">
        <Container className="py-20 md:py-32 lg:py-40">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 text-xs font-bold uppercase mb-8">
              <Sparkles size={14} />
              <span>Premium Digital Products</span>
            </div>
            <h1 className="heading-caps text-5xl md:text-7xl lg:text-8xl mb-6 leading-tight">
              {t("title")}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
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

      {/* Featured Products */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="heading-caps text-3xl md:text-5xl mb-3">
              {tp("title")}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {tp("subtitle")}
            </p>
          </div>
          <ProductGrid featured />
          
          {/* More Products Button */}
          <div className="mt-12 text-center">
            <Link href="/products">
              <Button variant="outline" size="lg">
                More Products
                <ArrowRight className="ml-2 inline-block" size={18} />
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-black text-white">
        <Container className="py-20 md:py-24 text-center">
          <h2 className="heading-caps text-3xl md:text-5xl mb-4">
            Ship Faster. Build Smarter.
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg leading-relaxed">
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
