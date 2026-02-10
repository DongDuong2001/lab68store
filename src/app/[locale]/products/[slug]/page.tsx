import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { db } from "@/lib/db";
import { Container, Badge, Button } from "@/components/ui";
import { formatPrice } from "@/lib/utils";
import { BuyButton } from "@/components/buy-button";
import { ArrowLeft, ExternalLink, Check } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await db.product.findFirst({ 
    where: { slug, status: "PUBLISHED" } 
  });

  if (!product) return {};

  const name = locale === "vi" ? product.nameVi : product.nameEn;
  const description =
    locale === "vi" ? product.descriptionVi : product.descriptionEn;

  return {
    title: name,
    description,
    openGraph: {
      title: name,
      description,
      images: product.imageUrl ? [product.imageUrl] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "products" });

  const product = await db.product.findFirst({
    where: { slug, status: "PUBLISHED" },
    include: { category: true },
  });

  if (!product) notFound();

  const name = locale === "vi" ? product.nameVi : product.nameEn;
  const description =
    locale === "vi" ? product.descriptionVi : product.descriptionEn;
  const features =
    locale === "vi" ? product.featuresVi : product.featuresEn;
  const categoryName =
    locale === "vi"
      ? product.category?.nameVi
      : product.category?.nameEn;

  return (
    <section>
      {/* Breadcrumb */}
      <div className="border-b border-gray-200">
        <Container className="py-4">
          <Link
            href="/products"
            className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gray-500 hover:text-black transition-colors"
          >
            <ArrowLeft size={14} />
            {t("title")}
          </Link>
        </Container>
      </div>

      <Container className="py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left Column - Image & Details */}
          <div className="lg:col-span-3">
            {product.imageUrl && (
              <div className="relative w-full aspect-video border-2 border-black shadow-lg mb-8 overflow-hidden bg-gray-100">
                <Image
                  src={product.imageUrl}
                  alt={name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>
            )}

            {/* Description */}
            <div className="prose prose-lg max-w-none">
              <h2 className="heading-caps text-xl mb-4">About</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {description}
              </p>
            </div>

            {/* Features */}
            {features.length > 0 && (
              <div className="mt-10">
                <h2 className="heading-caps text-xl mb-6">
                  {t("features")}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-4 border border-gray-200"
                    >
                      <Check
                        size={18}
                        className="text-success mt-0.5 shrink-0"
                        strokeWidth={3}
                      />
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery */}
            {product.galleryUrls.length > 0 && (
              <div className="mt-10">
                <h2 className="heading-caps text-xl mb-6">Gallery</h2>
                <div className="grid grid-cols-2 gap-4">
                  {product.galleryUrls.map((url, i) => (
                    <div
                      key={i}
                      className="relative aspect-video border border-gray-300 overflow-hidden bg-gray-100"
                    >
                      <Image
                        src={url}
                        alt={`${name} screenshot ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 30vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Purchase Card */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <div className="border-2 border-black shadow-lg p-8 bg-white">
                {/* Category */}
                {categoryName && (
                  <Badge variant="outline" className="mb-4">
                    {categoryName}
                  </Badge>
                )}

                {/* Title */}
                <h1 className="heading-caps text-2xl md:text-3xl mb-4">
                  {name}
                </h1>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-4xl font-black">
                    {formatPrice(product.price, product.currency)}
                  </span>
                  {product.comparePrice && (
                    <span className="text-lg text-gray-400 line-through">
                      {formatPrice(product.comparePrice, product.currency)}
                    </span>
                  )}
                </div>

                {/* Buy Button */}
                <BuyButton productSlug={product.slug} />

                {/* Demo Link */}
                {product.demoUrl && (
                  <a
                    href={product.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 w-full flex items-center justify-center gap-2"
                  >
                    <Button variant="outline" size="md" className="w-full">
                      {t("liveDemo")}
                      <ExternalLink className="ml-2" size={14} />
                    </Button>
                  </a>
                )}

                {/* Divider */}
                <div className="border-t border-gray-200 mt-6 pt-6">
                  {/* Tech Stack */}
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                    {t("techStack")}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {product.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-bold uppercase bg-gray-100 px-3 py-1.5 border border-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* File Info */}
                  {product.fileSize && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-bold uppercase text-gray-500">
                        File Size
                      </span>
                      <span className="font-bold">{product.fileSize}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
