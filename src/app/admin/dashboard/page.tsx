import { db } from "@/lib/db";
import { Container, Button, Card, CardContent } from "@/components/ui";
import { Edit, Trash2, ExternalLink, Plus } from "lucide-react";
import Link from "next/link";
import { DeleteProductButton } from "@/components/admin/delete-product-button";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const products = await db.product.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const categories = await db.category.findMany({
    orderBy: { nameEn: "asc" },
  });

  return (
    <Container>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="heading-caps text-4xl mb-2">Product Management</h1>
          <p className="text-gray-600">Manage your store inventory</p>
        </div>
        <Link href="/admin/dashboard/add">
          <Button variant="primary">
            <Plus className="mr-2" size={16} />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="text-3xl font-black mb-1">{products.length}</div>
            <div className="text-sm text-gray-600 uppercase font-bold">
              Total Products
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-3xl font-black mb-1">
              {products.filter((p) => p.status === "PUBLISHED").length}
            </div>
            <div className="text-sm text-gray-600 uppercase font-bold">
              Published
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-3xl font-black mb-1">{categories.length}</div>
            <div className="text-sm text-gray-600 uppercase font-bold">
              Categories
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Products Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-3 border-black">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-black uppercase">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-black uppercase">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-black uppercase">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-black uppercase">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-black uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <p className="text-gray-500 mb-4">No products yet</p>
                      <Link href="/admin/dashboard/add">
                        <Button variant="outline">
                          <Plus className="mr-2" size={16} />
                          Add Your First Product
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id} className="border-b-2 border-gray-200">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {product.imageUrl && (
                            <div className="w-12 h-12 border-2 border-black bg-gray-100 shrink-0">
                              <img
                                src={product.imageUrl}
                                alt={product.nameEn}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div>
                            <div className="font-bold text-sm">
                              {product.nameEn}
                            </div>
                            <div className="text-xs text-gray-500">
                              {product.slug}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm">
                          {product.category?.nameEn || "—"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-sm">
                          ${(product.price / 100).toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-2 py-1 text-xs font-bold uppercase ${
                            product.status === "PUBLISHED"
                              ? "bg-green-100 text-green-900"
                              : product.status === "DRAFT"
                              ? "bg-gray-100 text-gray-900"
                              : "bg-red-100 text-red-900"
                          }`}
                        >
                          {product.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/products/${product.slug}`}
                            target="_blank"
                          >
                            <button className="p-2 hover:bg-gray-100 rounded">
                              <ExternalLink size={16} />
                            </button>
                          </Link>
                          <Link href={`/admin/dashboard/edit/${product.id}`}>
                            <button className="p-2 hover:bg-gray-100 rounded">
                              <Edit size={16} />
                            </button>
                          </Link>
                          <DeleteProductButton productId={product.id} />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}
