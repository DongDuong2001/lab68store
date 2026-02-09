import { NextRequest, NextResponse } from "next/server";

// Stripe webhooks disabled - using Ko-fi for payments
export async function POST(req: NextRequest) {
  return NextResponse.json(
    { message: "Stripe webhooks disabled - using Ko-fi" },
    { status: 200 }
  );
}
