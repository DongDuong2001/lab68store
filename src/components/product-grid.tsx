import { db } from "@/lib/db";
import { ProductCard } from "@/components/product-card";

interface ProductGridProps {
  featured?: boolean;
  categorySlug?: string;
}

export async function ProductGrid({
  featured = false,
  categorySlug,
}: ProductGridProps) {
  const products = await db.product.findMany({
    where: {
      status: "PUBLISHED",
      ...(categorySlug && {
        category: { slug: categorySlug },
      }),
    },
    include: {
      category: true,
    },
    orderBy: { createdAt: "desc" },
    ...(featured && { take: 6 }),
  });

  if (products.length === 0) {
    return (
      <div className="neo-border bg-gray-50 p-16 text-center">
        <p className="text-gray-500 font-bold uppercase tracking-wide text-sm">
          No products available yet. Check back soon.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
