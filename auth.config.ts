import type { NextAuthConfig } from "next-auth";

const protectedRoutes = [
  "/chickens",
  "/inventory",
  "/sales",
  "/expenses",
  "/finance",
  "/egg-production",
];

export const authConfig: NextAuthConfig = {
  trustHost: true,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isProtected = protectedRoutes.some((route) =>
        nextUrl.pathname.startsWith(route)
      );
      if (isProtected && !isLoggedIn) return false;
      return true;
    },
    jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    session({ session, token }) {
      if (token?.id) session.user.id = token.id as string;
      return session;
    },
  },
  providers: [],
};
