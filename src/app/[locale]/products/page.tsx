import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui";
import { ProductGrid } from "@/components/product-grid";
import { db } from "@/lib/db";
import { CategoryFilter } from "@/components/category-filter";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "products" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function ProductsPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { category } = await searchParams;
  const t = await getTranslations({ locale, namespace: "products" });

  const categories = await db.category.findMany({
    orderBy: { nameEn: "asc" },
  });

  return (
    <section className="py-16">
      <Container className="py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="heading-caps text-4xl md:text-5xl mb-3">
            {t("title")}
          </h1>
          <p className="text-gray-500 text-lg">{t("subtitle")}</p>
        </div>

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          activeCategory={category}
          locale={locale}
        />

        {/* Product Grid */}
        <ProductGrid categorySlug={category} />
      </Container>
    </section>
  );
}
