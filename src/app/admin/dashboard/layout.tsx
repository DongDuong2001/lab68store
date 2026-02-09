import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin-auth";
import Link from "next/link";
import { Package, Plus } from "lucide-react";
import { Container } from "@/components/ui";
import { LogoutButton } from "@/components/admin/logout-button";
import Image from "next/image";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = await getAdminSession();

  if (!isAuthenticated) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-black text-white border-b-3 border-black sticky top-0 z-50">
        <Container className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/admin/dashboard" className="flex items-center gap-3">
              <div className="relative h-8 w-8">
                <Image
                  src="/lab68dev_logo.png"
                  alt="Lab SixtyEight Admin"
                  width={32}
                  height={32}
                  className="object-contain border-2 border-white rounded-md"
                  priority
                />
              </div>
              <div className="bg-white text-black px-2 py-1">
                <span className="text-sm font-black tracking-tight">ADMIN</span>
              </div>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide hover:text-gray-300 transition-colors"
              >
                <Package size={16} />
                Products
              </Link>
              <Link
                href="/admin/dashboard/add"
                className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide hover:text-gray-300 transition-colors"
              >
                <Plus size={16} />
                Add Product
              </Link>
            </nav>
          </div>

          <LogoutButton />
        </Container>
      </header>

      {/* Main Content */}
      <main className="py-8">{children}</main>
    </div>
  );
}
