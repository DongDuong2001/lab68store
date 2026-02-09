"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Card, CardContent, CardFooter, Badge, Button } from "@/components/ui";
import { formatPrice } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

interface ProductCardProps {
  product: {
    id: string;
    slug: string;
    nameEn: string;
    nameVi: string;
    descriptionEn: string;
    descriptionVi: string;
    price: number;
    comparePrice: number | null;
    currency: string;
    imageUrl: string | null;
    techStack: string[];
    category: { nameEn: string; nameVi: string } | null;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const locale = useLocale();
  const t = useTranslations("products");

  const name = locale === "vi" ? product.nameVi : product.nameEn;
  const description =
    locale === "vi" ? product.descriptionVi : product.descriptionEn;
  const categoryName =
    locale === "vi"
      ? product.category?.nameVi
      : product.category?.nameEn;

  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="h-full flex flex-col group overflow-hidden">
        {/* Image */}
        {product.imageUrl && (
          <div className="relative w-full aspect-4/3 border-b-3 border-black overflow-hidden bg-gray-50">
            <Image
              src={product.imageUrl}
              alt={name}
              fill
              className="object-cover transition-transform group-hover:scale-102"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        <CardContent className="flex-1 p-8">
          <h3 className="heading-caps text-2xl mb-3 leading-tight">{name}</h3>
          <p className="text-base text-gray-600 line-clamp-2 mb-6 leading-relaxed">
            {description}
          </p>

          {/* Tech Stack */}
          {product.techStack.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {product.techStack.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-bold uppercase bg-white px-3 py-1 border-2 border-black"
                >
                  {tech}
                </span>
              ))}
              {product.techStack.length > 3 && (
                <span className="text-xs font-bold text-gray-400">
                  +{product.techStack.length - 3}
                </span>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter className="p-8 pt-0 flex items-center justify-between border-t-0">
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-black">
              {formatPrice(product.price, product.currency)}
            </span>
            {product.comparePrice && (
              <span className="text-base text-gray-400 line-through">
                {formatPrice(product.comparePrice, product.currency)}
              </span>
            )}
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400 group-hover:text-black transition-colors flex items-center gap-1">
            {t("viewDetails")}
            <ArrowRight size={14} />
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
