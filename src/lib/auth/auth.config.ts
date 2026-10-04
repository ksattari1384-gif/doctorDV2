import type { NextAuthConfig } from "next-auth";

// ═══════════════════════════════════════════════════════
//  Auth Config — Edge-compatible (بدون bcrypt)
//  این فایل هم توی middleware (Edge) استفاده می‌شه
// ═══════════════════════════════════════════════════════

export const authConfig = {
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 60 * 60 * 24 * 7, // ۷ روز
  },
  providers: [], // خالی — توی auth.ts پر می‌شه
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;
      const isOnLoginPage = pathname === "/admin/login";
      const isOnAdmin = pathname.startsWith("/admin");

      if (isOnAdmin && !isOnLoginPage) {
        return isLoggedIn;
      }

      if (isOnLoginPage && isLoggedIn) {
        return Response.redirect(new URL("/admin/dashboard", nextUrl));
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;