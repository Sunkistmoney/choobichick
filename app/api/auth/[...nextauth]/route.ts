import { handlers } from "@/auth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    return await handlers.GET(req);
  } catch (error) {
    console.error("[Auth] GET error:", error);
    throw error;
  }
}

export async function POST(req: NextRequest) {
  try {
    return await handlers.POST(req);
  } catch (error) {
    console.error("[Auth] POST error:", error);
    throw error;
  }
}
