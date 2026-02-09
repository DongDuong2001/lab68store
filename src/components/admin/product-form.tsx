"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Button, Card, CardContent } from "@/components/ui";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ImageUpload, MultiImageUpload } from "@/components/admin/image-upload";

interface Category {
  id: string;
  slug: string;
  nameEn: string;
  nameVi: string;
}

export function ProductForm({
  product,
  categories,
}: {
  product?: any;
  categories: Category[];
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    slug: product?.slug || "",
    status: product?.status || "DRAFT",
    nameEn: product?.nameEn || "",
    nameVi: product?.nameVi || "",
    descriptionEn: product?.descriptionEn || "",
    descriptionVi: product?.descriptionVi || "",
    featuresEn: product?.featuresEn?.join("\n") || "",
    featuresVi: product?.featuresVi?.join("\n") || "",
    price: product?.price ? product.price / 100 : "",
    comparePrice: product?.comparePrice ? product.comparePrice / 100 : "",
    currency: product?.currency || "USD",
    imageUrl: product?.imageUrl || "",
    galleryUrls: product?.galleryUrls?.join("\n") || "",
    techStack: product?.techStack?.join(", ") || "",
    demoUrl: product?.demoUrl || "",
    fileUrl: product?.fileUrl || "",
    fileSize: product?.fileSize || "",
    categoryId: product?.categoryId || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        price: Math.round(parseFloat(formData.price as string) * 100),
        comparePrice: formData.comparePrice
          ? Math.round(parseFloat(formData.comparePrice as string) * 100)
          : null,
        featuresEn: (formData.featuresEn as string)
          .split("\n")
          .filter((f) => f.trim()),
        featuresVi: (formData.featuresVi as string)
          .split("\n")
          .filter((f) => f.trim()),
        galleryUrls: (formData.galleryUrls as string)
          .split("\n")
          .filter((u) => u.trim()),
        techStack: (formData.techStack as string)
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t),
      };

      const url = product
        ? `/api/admin/products/${product.id}`
        : "/api/admin/products";
      const method = product ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        const error = await res.json();
        alert(error.error || "Failed to save product");
      }
    } catch (error) {
      alert("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="mb-8">
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase hover:text-gray-600 mb-4"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>
        <h1 className="heading-caps text-4xl mb-2">
          {product ? "Edit Product" : "Add Product"}
        </h1>
        <p className="text-gray-600">
          {product
            ? "Update product information"
            : "Create a new product with Ko-fi link"}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-lg font-black uppercase mb-4">
                  Basic Information
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold uppercase mb-2">
                      Product Name (English) *
                    </label>
                    <input
                      type="text"
                      value={formData.nameEn}
                      onChange={(e) =>
                        setFormData({ ...formData, nameEn: e.target.value })
                      }
                      className="neo-input w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold uppercase mb-2">
                      Product Name (Vietnamese) *
                    </label>
                    <input
                      type="text"
                      value={formData.nameVi}
                      onChange={(e) =>
                        setFormData({ ...formData, nameVi: e.target.value })
                      }
                      className="neo-input w-full"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase mb-2">
                    Slug *
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    className="neo-input w-full"
                    placeholder="nextjs-saas-starter"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    URL-friendly identifier
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase mb-2">
                    Description (English) *
                  </label>
                  <textarea
                    value={formData.descriptionEn}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        descriptionEn: e.target.value,
                      })
                    }
                    className="neo-input w-full"
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase mb-2">
                    Description (Vietnamese) *
                  </label>
                  <textarea
                    value={formData.descriptionVi}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        descriptionVi: e.target.value,
                      })
                    }
                    className="neo-input w-full"
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold uppercase mb-2">
                      Features (English) *
                    </label>
                    <textarea
                      value={formData.featuresEn}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          featuresEn: e.target.value,
                        })
                      }
                      className="neo-input w-full"
                      rows={6}
                      placeholder="One feature per line"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold uppercase mb-2">
                      Features (Vietnamese) *
                    </label>
                    <textarea
                      value={formData.featuresVi}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          featuresVi: e.target.value,
                        })
                      }
                      className="neo-input w-full"
                      rows={6}
                      placeholder="One feature per line"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-lg font-black uppercase mb-4">
                  Media & Files
                </h2>

                <ImageUpload
                  value={formData.imageUrl}
                  onChange={(url) =>
                    setFormData({ ...formData, imageUrl: url })
                  }
                  label="Main Image"
                />

                <MultiImageUpload
                  values={formData.galleryUrls}
                  onChange={(urls) =>
                    setFormData({ ...formData, galleryUrls: urls })
                  }
                  label="Gallery Images"
                />

                <div>
                  <label className="block text-sm font-bold uppercase mb-2">
                    Ko-fi Product URL *
                  </label>
                  <input
                    type="url"
                    value={formData.fileUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, fileUrl: e.target.value })
                    }
                    className="neo-input w-full"
                    placeholder="https://ko-fi.com/s/..."
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Direct link to your Ko-fi product page
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase mb-2">
                    File Size
                  </label>
                  <input
                    type="text"
                    value={formData.fileSize}
                    onChange={(e) =>
                      setFormData({ ...formData, fileSize: e.target.value })
                    }
                    className="neo-input w-full"
                    placeholder="12.4 MB"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase mb-2">
                    Demo URL
                  </label>
                  <input
                    type="url"
                    value={formData.demoUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, demoUrl: e.target.value })
                    }
                    className="neo-input w-full"
                    placeholder="https://demo.example.com"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-lg font-black uppercase mb-4">Settings</h2>

                <div>
                  <label className="block text-sm font-bold uppercase mb-2">
                    Status *
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="neo-input w-full"
                    required
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="PUBLISHED">Published</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase mb-2">
                    Category
                  </label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) =>
                      setFormData({ ...formData, categoryId: e.target.value })
                    }
                    className="neo-input w-full"
                  >
                    <option value="">No Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.nameEn}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase mb-2">
                    Price (USD) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="neo-input w-full"
                    placeholder="49.00"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase mb-2">
                    Compare At Price (USD)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.comparePrice}
                    onChange={(e) =>
                      setFormData({ ...formData, comparePrice: e.target.value })
                    }
                    className="neo-input w-full"
                    placeholder="99.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase mb-2">
                    Tech Stack
                  </label>
                  <input
                    type="text"
                    value={formData.techStack}
                    onChange={(e) =>
                      setFormData({ ...formData, techStack: e.target.value })
                    }
                    className="neo-input w-full"
                    placeholder="Next.js, TypeScript, Tailwind"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Comma-separated values
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={loading}
              >
                {loading
                  ? "Saving..."
                  : product
                  ? "Update Product"
                  : "Create Product"}
              </Button>
              <Link href="/admin/dashboard" className="block">
                <Button type="button" variant="outline" className="w-full">
                  Cancel
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </Container>
  );
}
