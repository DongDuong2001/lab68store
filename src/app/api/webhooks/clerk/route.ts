import { NextRequest, NextResponse } from "next/server";

// Clerk webhooks disabled - authentication removed
export async function POST(req: NextRequest) {
  return NextResponse.json(
    { message: "Clerk webhooks disabled - authentication removed" },
    { status: 200 }
  );
}
