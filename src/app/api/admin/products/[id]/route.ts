import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/admin-auth";

// Update product
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAdmin = await getAdminSession();
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    const product = await db.product.update({
      where: { id },
      data: {
        slug: body.slug,
        status: body.status,
        nameEn: body.nameEn,
        nameVi: body.nameVi,
        descriptionEn: body.descriptionEn,
        descriptionVi: body.descriptionVi,
        featuresEn: body.featuresEn,
        featuresVi: body.featuresVi,
        price: body.price,
        comparePrice: body.comparePrice,
        currency: body.currency || "USD",
        imageUrl: body.imageUrl || null,
        galleryUrls: body.galleryUrls || [],
        techStack: body.techStack || [],
        demoUrl: body.demoUrl || null,
        fileUrl: body.fileUrl,
        fileSize: body.fileSize || null,
        categoryId: body.categoryId || null,
      },
    });

    return NextResponse.json(product);
  } catch (error: any) {
    console.error("Product update error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update product" },
      { status: 500 }
    );
  }
}

// Delete product
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAdmin = await getAdminSession();
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    await db.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Product deletion error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete product" },
      { status: 500 }
    );
  }
}
