import { handlers } from "@/auth";
import { type NextRequest } from "next/server";

async function wrappedGET(req: NextRequest) {
  try {
    return await handlers.GET(req);
  } catch (e) {
    console.error("[auth] GET error:", e);
    throw e;
  }
}

async function wrappedPOST(req: NextRequest) {
  try {
    return await handlers.POST(req);
  } catch (e) {
    console.error("[auth] POST error:", e);
    throw e;
  }
}

export { wrappedGET as GET, wrappedPOST as POST };
