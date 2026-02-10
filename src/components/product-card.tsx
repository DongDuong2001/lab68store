"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
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
      <div className="h-full flex flex-col group bg-white border border-gray-200 hover:border-black transition-all duration-200 overflow-hidden">
        {/* Image */}
        {product.imageUrl && (
          <div className="relative w-full aspect-4/3 overflow-hidden bg-gray-50">
            <Image
              src={product.imageUrl}
              alt={name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        <div className="flex-1 p-6">
          <h3 className="font-bold text-xl mb-2 leading-tight">{name}</h3>
          <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">
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
        </div>

        <div className="p-6 pt-4 flex items-center justify-between border-t border-gray-100">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black">
              {formatPrice(product.price, product.currency)}
            </span>
            {product.comparePrice && (
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(product.comparePrice, product.currency)}
              </span>
            )}
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400 group-hover:text-black transition-colors flex items-center gap-1">
            {t("viewDetails")}
            <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}
