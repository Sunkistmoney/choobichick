import { auth } from "@/auth";
import { NextResponse } from "next/server";

const protectedRoutes = [
  "/chickens",
  "/inventory",
  "/sales",
  "/expenses",
  "/finance",
  "/egg-production",
];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  if (isProtected && !req.auth) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
