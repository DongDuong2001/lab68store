import { NextRequest, NextResponse } from "next/server";

// Downloads handled through Ko-fi
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  const kofiUrl = process.env.NEXT_PUBLIC_KOFI_URL || "https://ko-fi.com/lab68";
  return NextResponse.redirect(kofiUrl);
}
