"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  slug: string;
  nameEn: string;
  nameVi: string;
}

interface CategoryFilterProps {
  categories: Category[];
  activeCategory?: string;
  locale: string;
}

export function CategoryFilter({
  categories,
  activeCategory,
  locale,
}: CategoryFilterProps) {
  const t = useTranslations("products");

  return (
    <div className="flex flex-wrap gap-3 mb-10">
      <Link
        href="/products"
        className={cn(
          "px-4 py-2 text-xs font-bold uppercase tracking-wider border-2 border-black transition-all",
          !activeCategory
            ? "bg-black text-white"
            : "bg-white text-black hover:bg-gray-50"
        )}
      >
        {t("allCategories")}
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/products?category=${cat.slug}`}
          className={cn(
            "px-4 py-2 text-xs font-bold uppercase tracking-wider border-2 border-black transition-all",
            activeCategory === cat.slug
              ? "bg-black text-white"
              : "bg-white text-black hover:bg-gray-50"
          )}
        >
          {locale === "vi" ? cat.nameVi : cat.nameEn}
        </Link>
      ))}
    </div>
  );
}
