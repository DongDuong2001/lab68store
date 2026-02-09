import { db } from "@/lib/db";
import { ProductForm } from "@/components/admin/product-form";

export default async function AddProductPage() {
  const categories = await db.category.findMany({
    orderBy: { nameEn: "asc" },
  });

  return <ProductForm categories={categories} />;
}
