import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const kofiUrl = process.env.NEXT_PUBLIC_KOFI_URL || "https://ko-fi.com/lab68";
    return NextResponse.json({ url: kofiUrl });
  } catch (error) {
    console.error("[CHECKOUT_ERROR]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
