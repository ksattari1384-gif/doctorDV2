"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Phone, CalendarCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAdminStore } from "@/lib/stores/admin-store";

const NAV_ITEMS = [
  { label: "خانه", href: "/" },
  { label: "خدمات", href: "/services" },
  { label: "درباره ما", href: "/about" },
  { label: "تماس", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // ═══ Store ═══
  const content = useAdminStore((s) => s.content);
  const brandName = content.brandName;
  const brandSubtitle = content.brandSubtitle;
  const phone = content.phone;
  const logoUrl = content.logoUrl;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  // ─── Header state ──────────────────────────────
  const variant: "solid" | "glass" | "clear" = isScrolled
    ? "solid"
    : isHomePage
    ? "clear"
    : "glass";

  const textMain = variant === "solid" ? "text-ink-800" : "text-white";
  const textSub = variant === "solid" ? "text-muted" : "text-white/70";

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          variant === "solid" &&
            "bg-surface/95 backdrop-blur-md shadow-[var(--shadow-soft)] border-b border-border",
          variant === "glass" &&
            "bg-ink-900/50 backdrop-blur-md border-b border-white/10",
          variant === "clear" && "bg-transparent"
        )}
      >
        <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-4 md:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl text-white font-bold shadow-sm overflow-hidden shrink-0"
              style={{ background: "var(--theme-primary)" }}
            >
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={brandName}
                  className="h-full w-full object-cover"
                />
              ) : (
                "ق"
              )}
            </div>
            <div className="flex flex-col leading-tight">
              <span
                className={cn(
                  "text-sm md:text-base font-bold transition-colors",
                  textMain
                )}
              >
                {brandName}
              </span>
              <span
                className={cn(
                  "text-[10px] md:text-xs transition-colors",
                  textSub
                )}
              >
                {brandSubtitle}
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-medium transition",
                  variant === "solid"
                    ? "text-foreground/80 hover:bg-[var(--theme-primary-soft)]"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                )}
                onMouseEnter={(e) => {
                  if (variant === "solid") {
                    e.currentTarget.style.color = "var(--theme-primary)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (variant === "solid") {
                    e.currentTarget.style.color = "";
                  }
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <a
              href={`tel:${phone}`}
              className={cn(
                "hidden md:flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition",
                variant === "solid"
                  ? "border-border hover:bg-[var(--theme-primary-soft)]"
                  : "border-white/30 text-white hover:bg-white/10"
              )}
            >
              <Phone
                className="h-4 w-4"
                style={
                  variant === "solid"
                    ? { color: "var(--theme-primary)" }
                    : { color: "#ffffff" }
                }
              />
              <span dir="ltr">{phone}</span>
            </a>

            <Link
              href="/booking"
              className="hidden md:inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition shadow-sm"
              style={
                variant === "solid"
                  ? { background: "var(--theme-primary)", color: "#ffffff" }
                  : { background: "var(--theme-accent)", color: "#0b1f1d" }
              }
            >
              <CalendarCheck className="h-4 w-4" />
              رزرو نوبت
            </Link>

            <button
              onClick={() => setIsMobileOpen(true)}
              className={cn(
                "md:hidden flex h-10 w-10 items-center justify-center rounded-lg border transition",
                variant === "solid"
                  ? "border-border text-foreground"
                  : "border-white/30 text-white"
              )}
              aria-label="باز کردن منو"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div
            className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 w-[85%] max-w-sm bg-surface shadow-2xl flex flex-col">
            <div className="flex items-center justify-between border-b border-border p-4">
              <span className="font-bold text-ink-800">منو</span>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-[var(--theme-primary-soft)]"
                aria-label="بستن"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="block rounded-lg px-4 py-3 text-base font-medium hover:bg-[var(--theme-primary-soft)] transition"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="border-t border-border p-4 space-y-2">
              <a
                href={`tel:${phone}`}
                className="flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-3 font-medium"
              >
                <Phone
                  className="h-4 w-4"
                  style={{ color: "var(--theme-primary)" }}
                />
                <span dir="ltr">{phone}</span>
              </a>
              <Link
                href="/booking"
                onClick={() => setIsMobileOpen(false)}
                className="flex items-center justify-center gap-2 rounded-lg px-4 py-3 font-medium text-white"
                style={{ background: "var(--theme-primary)" }}
              >
                <CalendarCheck className="h-4 w-4" />
                رزرو نوبت
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}