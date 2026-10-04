"use client";

import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";
import { useAdminStore } from "@/lib/stores/admin-store";

const QUICK_LINKS = [
  { label: "خانه", href: "/" },
  { label: "خدمات", href: "/services" },
  { label: "رزرو نوبت", href: "/booking" },
  { label: "درباره ما", href: "/about" },
  { label: "تماس با ما", href: "/contact" },
];

const SERVICE_LINKS = [
  { label: "ایمپلنت دندان", href: "/services/implant" },
  { label: "لمینت سرامیکی", href: "/services/laminate" },
  { label: "ارتودنسی", href: "/services/orthodontics" },
  { label: "عصب‌کشی", href: "/services/root-canal" },
  { label: "جرم‌گیری", href: "/services/scaling" },
];

export function Footer() {
  const content = useAdminStore((s) => s.content);
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-ink-900 via-brand-900 to-ink-900 text-white mt-20 overflow-hidden">
      {/* Decorative circles */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--theme-accent)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--theme-primary)" }}
      />

      <div className="relative container mx-auto px-4 md:px-6 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div
                  className="absolute -inset-1 rounded-2xl opacity-40 blur-md"
                  style={{ background: "var(--theme-accent)" }}
                />
                <div
                  className="relative flex h-12 w-12 items-center justify-center rounded-2xl border-2 font-bold text-lg shadow-lg"
                  style={{
                    background: "var(--theme-primary)",
                    borderColor: "var(--theme-accent)",
                    color: "var(--theme-accent)",
                  }}
                >
                  ق
                </div>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-base font-bold text-white">
                  {content.brandName}
                </span>
                <span
                  className="text-xs"
                  style={{ color: "var(--theme-accent)" }}
                >
                  {content.brandSubtitle}
                </span>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              ارائه‌ی خدمات تخصصی دندانپزشکی با جدیدترین تکنولوژی‌ها و
              بالاترین استانداردهای بهداشتی، در محیطی آرام و حرفه‌ای.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <a
                href={content.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="اینستاگرام"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-white/80 hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-600 hover:text-white hover:border-transparent transition"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={content.whatsapp}
                target="_blank"
                rel="noreferrer"
                aria-label="واتساپ"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-white/80 hover:bg-green-500 hover:text-white hover:border-transparent transition"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href={`tel:${content.phone}`}
                aria-label="تماس"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-white/80 hover:text-white hover:border-transparent transition"
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--theme-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "";
                }}
              >
                <Phone className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-base font-bold text-white mb-5 flex items-center gap-2">
              <span
                className="h-1 w-6 rounded-full"
                style={{ background: "var(--theme-accent)" }}
              />
              دسترسی سریع
            </h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-sm text-white/70 transition"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--theme-accent)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "";
                    }}
                  >
                    <ArrowLeft className="h-3 w-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-base font-bold text-white mb-5 flex items-center gap-2">
              <span
                className="h-1 w-6 rounded-full"
                style={{ background: "var(--theme-accent)" }}
              />
              خدمات پرطرفدار
            </h3>
            <ul className="space-y-3">
              {SERVICE_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-sm text-white/70 transition"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--theme-accent)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "";
                    }}
                  >
                    <ArrowLeft className="h-3 w-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base font-bold text-white mb-5 flex items-center gap-2">
              <span
                className="h-1 w-6 rounded-full"
                style={{ background: "var(--theme-accent)" }}
              />
              اطلاعات تماس
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/70">
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5"
                  style={{ color: "var(--theme-accent)" }}
                >
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="leading-relaxed">{content.address}</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/70">
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5"
                  style={{ color: "var(--theme-accent)" }}
                >
                  <Phone className="h-4 w-4" />
                </div>
                <a
                  href={`tel:${content.phone}`}
                  dir="ltr"
                  className="transition leading-relaxed"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--theme-accent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "";
                  }}
                >
                  {content.phone}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/70">
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5"
                  style={{ color: "var(--theme-accent)" }}
                >
                  <Mail className="h-4 w-4" />
                </div>
                <a
                  href={`mailto:${content.email}`}
                  className="transition leading-relaxed"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--theme-accent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "";
                  }}
                >
                  {content.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/70">
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5"
                  style={{ color: "var(--theme-accent)" }}
                >
                  <Clock className="h-4 w-4" />
                </div>
                <span className="leading-relaxed">
                  {content.workingHoursShort}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/50">
            © {year} مطب دندانپزشکی {content.brandName}. تمامی حقوق محفوظ است.
          </p>
          <p className="text-xs text-white/50 flex items-center gap-1.5">
            طراحی و توسعه با
            <span className="text-red-400">❤</span>
            برای لبخند شما
          </p>
        </div>
      </div>
    </footer>
  );
}