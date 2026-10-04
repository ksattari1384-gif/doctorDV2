"use client";
import { canAccessRoute } from "@/lib/auth/permissions";
import type { UserRole } from "@/lib/auth/users";
import { AccessDenied } from "@/components/admin/access-denied";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  LayoutDashboard,
  CalendarCheck,
  Sparkles,
  Users,
  Clock,
  FileText,
  Palette,
  Settings,
  Menu,
  X,
  Bell,
  LogOut,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ToastProvider } from "@/components/admin/toast";
import { SessionProvider } from "@/components/admin/session-provider";
import { LogoutButton } from "@/components/admin/logout-button";

const NAV_ITEMS = [
  { label: "داشبورد", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "نوبت‌ها", href: "/admin/appointments", icon: CalendarCheck },
  { label: "خدمات", href: "/admin/services", icon: Sparkles },
  { label: "بیماران", href: "/admin/patients", icon: Users },
  { label: "زمان‌بندی", href: "/admin/schedule", icon: Clock },
  { label: "محتوای سایت", href: "/admin/content", icon: FileText },
  { label: "تم و ظاهر", href: "/admin/theme", icon: Palette },
  { label: "تنظیمات", href: "/admin/settings", icon: Settings },
];

// ═══════════════════════════════════════════════════════
//  Inner component — از useSession استفاده می‌کنه
//  (باید داخل SessionProvider باشه)
// ═══════════════════════════════════════════════════════

function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const userName = session?.user?.name || "کاربر";
  const userRole = (session?.user as any)?.role as string | undefined;

  const roleLabel =
    userRole === "ADMIN"
      ? "مدیر سیستم"
      : userRole === "DOCTOR"
      ? "پزشک"
      : userRole === "RECEPTIONIST"
      ? "منشی"
      : "کاربر";

  const userInitial = userName.charAt(0) || "ق";
  const hasAccess = canAccessRoute(userRole as UserRole, pathname || "");

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* ─── Mobile overlay ──────────────────── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-ink-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ─── Sidebar ─────────────────────────── */}
      <aside
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-72 bg-ink-900 text-white transition-transform duration-300 lg:translate-x-0 flex flex-col",
          sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6 shrink-0">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-tr from-gold-400 to-gold-600 opacity-40 blur-sm" />
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-700 to-ink-900 border-2 border-gold-500/40 text-gold-400 font-bold">
                ق
              </div>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-bold">دکتر قره‌داغی</span>
              <span className="text-[10px] text-gold-300/70">
                پنل مدیریت
              </span>
            </div>
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden flex h-9 w-9 items-center justify-center rounded-lg hover:bg-white/10"
            aria-label="بستن"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
  {NAV_ITEMS.filter((item) =>
    canAccessRoute(userRole as UserRole, item.href)
  ).map((item) => {
            const Icon = item.icon;
            const isActive = pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                  isActive
                    ? "bg-gold-500 text-ink-900 shadow-md"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span>{item.label}</span>
                {isActive && <ChevronLeft className="h-4 w-4 mr-auto" />}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-white/10 p-4 space-y-2 shrink-0">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition"
          >
            <LogOut className="h-5 w-5" />
            <span>بازگشت به سایت</span>
          </Link>

          <LogoutButton />
        </div>
      </aside>

      {/* ─── Main content area ───────────────── */}
      <div className="lg:mr-72">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-16 md:h-20 items-center justify-between border-b border-border bg-surface/95 backdrop-blur-md px-4 md:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden flex h-10 w-10 items-center justify-center rounded-lg border border-border"
              aria-label="باز کردن منو"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div>
              <h1 className="text-base md:text-lg font-bold text-ink-800">
                پنل مدیریت
              </h1>
              <p className="text-[10px] md:text-xs text-muted hidden sm:block">
                خوش آمدید، {userName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-border hover:bg-background transition"
              aria-label="اعلان‌ها"
            >
              <Bell className="h-5 w-5 text-muted" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
            </button>

            <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-700 text-white font-bold text-xs">
                {userInitial}
              </div>
              <div className="hidden md:block">
                <div className="text-xs font-bold text-ink-800">
                  {userName}
                </div>
                <div className="text-[10px] text-muted">{roleLabel}</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
<main className="p-4 md:p-6 lg:p-8">
  {hasAccess ? children : <AccessDenied />}
</main>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
//  Main Layout — wrap با SessionProvider و ToastProvider
// ═══════════════════════════════════════════════════════

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  // اگه صفحه‌ی login هست، فقط SessionProvider لازمه
  if (isLoginPage) {
    return (
      <SessionProvider>
        <ToastProvider>{children}</ToastProvider>
      </SessionProvider>
    );
  }

  return (
    <SessionProvider>
      <ToastProvider>
        <AdminShell>{children}</AdminShell>
      </ToastProvider>
    </SessionProvider>
  );
}