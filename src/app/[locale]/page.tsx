import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Container, Button } from "@/components/ui";
import { ArrowRight, Sparkles, Code2, Palette, Rocket } from "lucide-react";
import { db } from "@/lib/db";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });
  const tp = await getTranslations({ locale, namespace: "products" });

  // Fetch featured products
  const products = await db.product.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
    take: 6,
    select: {
      id: true,
      slug: true,
      nameEn: true,
      nameVi: true,
      descriptionEn: true,
      descriptionVi: true,
      price: true,
      comparePrice: true,
      currency: true,
      imageUrl: true,
      techStack: true,
    },
  });

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white">
        <Container className="py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 text-xs font-bold uppercase mb-6 rounded-full">
              <Sparkles size={14} />
              <span>Premium Digital Products</span>
            </div>
            <h1 className="heading-caps text-4xl md:text-6xl lg:text-7xl mb-5 leading-tight">
              {t("title")}
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
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
      <section className="bg-white py-12 md:py-16">
        <Container>
          <div className="mb-10">
            <h2 className="heading-caps text-2xl md:text-3xl mb-2">
              {tp("title")}
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              {tp("subtitle")}
            </p>
          </div>
          
          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => {
              const name = locale === "vi" ? product.nameVi : product.nameEn;
              const description = locale === "vi" ? product.descriptionVi : product.descriptionEn;
              
              return (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group"
                >
                  <div className="h-full bg-white border border-gray-200 hover:border-gray-400 transition-all duration-200 overflow-hidden flex flex-col">
                    {/* Product Image */}
                    {product.imageUrl && (
                      <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-50">
                        <Image
                          src={product.imageUrl}
                          alt={name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    )}

                    <div className="p-5 flex-1 flex flex-col">
                      {/* Product Info */}
                      <h3 className="font-bold text-lg mb-2 leading-tight group-hover:text-gray-700 transition-colors">
                        {name}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-1">
                        {description}
                      </p>

                      {/* Tech Stack */}
                      {product.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {product.techStack.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="text-xs font-semibold uppercase bg-gray-100 px-2 py-1 text-gray-700"
                            >
                              {tech}
                            </span>
                          ))}
                          {product.techStack.length > 3 && (
                            <span className="text-xs font-semibold text-gray-400">
                              +{product.techStack.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Price and CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-black">
                            {formatPrice(product.price, product.currency)}
                          </span>
                          {product.comparePrice && (
                            <span className="text-sm text-gray-400 line-through">
                              {formatPrice(product.comparePrice, product.currency)}
                            </span>
                          )}
                        </div>
                        <ArrowRight
                          size={16}
                          className="text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* View All Link */}
          <div className="mt-12 text-center">
            <Link href="/products">
              <Button variant="outline" size="lg">
                View All Products
                <ArrowRight className="ml-2 inline-block" size={18} />
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Custom Services Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="heading-caps text-3xl md:text-4xl mb-4">
                {locale === "vi" ? "Cần dịch vụ tùy chỉnh?" : "Need Custom Services?"}
              </h2>
              <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                {locale === "vi" 
                  ? "Tôi cung cấp dịch vụ phát triển tùy chỉnh cho script, template và landing page theo nhu cầu riêng của bạn."
                  : "I provide custom development services for scripts, templates, and landing pages tailored to your specific needs."}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {/* Script Development */}
              <div className="bg-white border border-gray-200 p-6 text-center hover:border-gray-400 transition-colors">
                <div className="w-12 h-12 mx-auto mb-4 bg-black text-white flex items-center justify-center">
                  <Code2 size={24} />
                </div>
                <h3 className="font-bold text-lg mb-2 uppercase">
                  {locale === "vi" ? "Custom Scripts" : "Custom Scripts"}
                </h3>
                <p className="text-sm text-gray-600">
                  {locale === "vi" 
                    ? "Automation, tools, và scripts chuyên biệt"
                    : "Automation, tools, and specialized scripts"}
                </p>
              </div>

              {/* Template Development */}
              <div className="bg-white border border-gray-200 p-6 text-center hover:border-gray-400 transition-colors">
                <div className="w-12 h-12 mx-auto mb-4 bg-black text-white flex items-center justify-center">
                  <Palette size={24} />
                </div>
                <h3 className="font-bold text-lg mb-2 uppercase">
                  {locale === "vi" ? "Templates & Themes" : "Templates & Themes"}
                </h3>
                <p className="text-sm text-gray-600">
                  {locale === "vi" 
                    ? "Website templates và UI themes"
                    : "Website templates and UI themes"}
                </p>
              </div>

              {/* Landing Pages */}
              <div className="bg-white border border-gray-200 p-6 text-center hover:border-gray-400 transition-colors">
                <div className="w-12 h-12 mx-auto mb-4 bg-black text-white flex items-center justify-center">
                  <Rocket size={24} />
                </div>
                <h3 className="font-bold text-lg mb-2 uppercase">
                  {locale === "vi" ? "Landing Pages" : "Landing Pages"}
                </h3>
                <p className="text-sm text-gray-600">
                  {locale === "vi" 
                    ? "High-converting landing pages"
                    : "High-converting landing pages"}
                </p>
              </div>
            </div>

            <div className="text-center">
              <Link href="/custom-services">
                <Button variant="primary" size="lg">
                  {locale === "vi" ? "Yêu cầu dịch vụ" : "Request Custom Service"}
                  <ArrowRight className="ml-2 inline-block" size={18} />
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-black text-white">
        <Container className="py-16 md:py-20 text-center">
          <h2 className="heading-caps text-3xl md:text-4xl mb-4">
            Ship Faster. Build Smarter.
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
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
