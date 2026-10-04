import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth/auth.config";

// ═══════════════════════════════════════════════════════
//  Middleware — محافظت از مسیرهای /admin/*
// ═══════════════════════════════════════════════════════

export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/admin/:path*"],
};