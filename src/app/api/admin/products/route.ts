import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/admin-auth";

// Create product
export async function POST(req: NextRequest) {
  try {
    const isAdmin = await getAdminSession();
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const product = await db.product.create({
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
    console.error("Product creation error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create product" },
      { status: 500 }
    );
  }
}
