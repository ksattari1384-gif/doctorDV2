"use client";

import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  MessageCircle,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { useAdminStore } from "@/lib/stores/admin-store";

export default function ContactPage() {
  const content = useAdminStore((s) => s.content);

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* ═══ Header ═══ */}
      <div className="bg-gradient-to-br from-ink-900 via-brand-900 to-ink-900 pt-24 md:pt-28 pb-16 md:pb-20 rounded-b-[32px] md:rounded-b-[48px]">
        <div className="container mx-auto px-4 md:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition mb-5"
          >
            <ArrowRight className="h-4 w-4" />
            بازگشت
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-2 text-sm font-medium text-white/95 mb-5">
            <Sparkles
              className="h-4 w-4"
              style={{ color: "var(--theme-accent)" }}
            />
            <span>تماس با ما</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            در{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(to left, var(--theme-accent), var(--theme-accent))",
              }}
            >
              ارتباط
            </span>{" "}
            باشید
          </h1>

          <p className="mt-4 max-w-2xl text-base md:text-lg text-white/80 leading-relaxed">
            برای رزرو نوبت، مشاوره‌ی رایگان یا هر سوالی، از راه‌های زیر با ما
            در تماس باشید
          </p>
        </div>
      </div>

      {/* ═══ Contact cards ═══ */}
      <div className="container mx-auto px-4 md:px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Phone */}
          <a
            href={`tel:${content.phone}`}
            className="group rounded-2xl bg-surface border border-border p-5 transition-all hover:shadow-elevated"
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--theme-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "";
            }}
          >
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl transition-all"
              style={{
                background: "var(--theme-primary-soft)",
                color: "var(--theme-primary)",
              }}
            >
              <Phone className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-base font-bold text-ink-800">
              تماس تلفنی
            </h3>
            <p className="mt-1 text-sm text-muted" dir="ltr">
              {content.phone}
            </p>
          </a>

          {/* WhatsApp */}
          <a
            href={content.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="group rounded-2xl bg-surface border border-border p-5 transition-all hover:shadow-elevated"
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#22c55e";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "";
            }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600 transition-all group-hover:bg-green-500 group-hover:text-white">
              <MessageCircle className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-base font-bold text-ink-800">واتساپ</h3>
            <p className="mt-1 text-sm text-muted">
              پاسخ سریع در ساعات کاری
            </p>
          </a>

          {/* Instagram */}
          <a
            href={content.instagram}
            target="_blank"
            rel="noreferrer"
            className="group rounded-2xl bg-surface border border-border p-5 transition-all hover:shadow-elevated"
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#ec4899";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "";
            }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-50 text-pink-600 transition-all group-hover:bg-gradient-to-tr group-hover:from-yellow-400 group-hover:via-pink-500 group-hover:to-purple-600 group-hover:text-white">
              <Instagram className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-base font-bold text-ink-800">
              اینستاگرام
            </h3>
            <p className="mt-1 text-sm text-muted">
              نمونه‌کارها و اخبار مطب
            </p>
          </a>
        </div>
      </div>

      {/* ═══ Map + Form ═══ */}
      <div className="container mx-auto px-4 md:px-6 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Map placeholder */}
          <div className="rounded-3xl border border-border bg-surface overflow-hidden shadow-soft">
            <div className="relative aspect-[4/3] bg-gradient-to-br from-brand-100 via-brand-50 to-cream-200 overflow-hidden">
              <svg
                className="absolute inset-0 w-full h-full opacity-20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern
                    id="grid"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.5"
                      className="text-brand-800"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>

              {/* Pin */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div
                    className="absolute -inset-8 rounded-full animate-ping opacity-20"
                    style={{ background: "var(--theme-primary)" }}
                  />
                  <div
                    className="relative flex h-16 w-16 items-center justify-center rounded-full text-white shadow-xl"
                    style={{ background: "var(--theme-primary)" }}
                  >
                    <MapPin className="h-8 w-8" />
                  </div>
                </div>
              </div>

              <a
                href={content.googleMaps}
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-xl bg-white/95 backdrop-blur-md px-4 py-2 text-xs font-bold shadow-md transition"
                style={{ color: "var(--theme-primary)" }}
              >
                <ExternalLink className="h-3.5 w-3.5" />
                باز کردن در نقشه
              </a>
            </div>

            <div className="p-5 md:p-6">
              <h3 className="text-base font-bold text-ink-800 mb-2">
                آدرس مطب
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {content.address}
              </p>

              <div className="mt-4 flex items-center gap-2 flex-wrap">
                <a
                  href={content.googleMaps}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition"
                  style={{
                    background: "var(--theme-primary-soft)",
                    color: "var(--theme-primary)",
                  }}
                >
                  <MapPin className="h-3.5 w-3.5" />
                  مسیریابی
                </a>
                <a
                  href={content.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-green-50 px-3 py-2 text-xs font-medium text-green-700 hover:bg-green-100 transition"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  واتساپ
                </a>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="rounded-3xl border border-border bg-surface p-5 md:p-6 shadow-soft">
            <h3 className="text-lg font-bold text-ink-800 mb-1">
              ارسال پیام
            </h3>
            <p className="text-xs text-muted mb-5">
              پیام خود را بنویسید، در اولین فرصت پاسخ می‌دهیم
            </p>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-ink-800 mb-1.5">
                    نام و نام خانوادگی
                  </label>
                  <input
                    type="text"
                    placeholder="مثلاً: علی محمدی"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm placeholder:text-muted focus:outline-none focus:ring-2 transition"
                    style={
                      { "--tw-ring-color": "var(--theme-primary)" } as any
                    }
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-800 mb-1.5">
                    شماره موبایل
                  </label>
                  <input
                    type="tel"
                    placeholder="۰۹۱۲..."
                    dir="ltr"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-left placeholder:text-muted focus:outline-none focus:ring-2 transition"
                    style={
                      { "--tw-ring-color": "var(--theme-primary)" } as any
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-ink-800 mb-1.5">
                  موضوع
                </label>
                <input
                  type="text"
                  placeholder="مثلاً: سوال درباره ایمپلنت"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm placeholder:text-muted focus:outline-none focus:ring-2 transition"
                  style={{ "--tw-ring-color": "var(--theme-primary)" } as any}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-ink-800 mb-1.5">
                  پیام شما
                </label>
                <textarea
                  rows={4}
                  placeholder="پیام خود را اینجا بنویسید..."
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm placeholder:text-muted focus:outline-none focus:ring-2 transition resize-none"
                  style={{ "--tw-ring-color": "var(--theme-primary)" } as any}
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl px-6 py-3.5 text-sm font-bold text-white transition shadow-sm"
                style={{ background: "var(--theme-primary)" }}
              >
                ارسال پیام
              </button>
            </form>

            {/* Working hours */}
            <div className="mt-6 rounded-2xl bg-cream-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock
                  className="h-4 w-4"
                  style={{ color: "var(--theme-primary)" }}
                />
                <h4 className="text-sm font-bold text-ink-800">
                  ساعات کاری
                </h4>
              </div>
              <p className="text-xs text-ink-800/70 leading-relaxed">
                {content.workingHoursShort}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Email row ═══ */}
      <div className="container mx-auto px-4 md:px-6 mt-8">
        <div className="rounded-3xl bg-gradient-to-br from-cream-100 via-cream-200 to-cream-100 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center md:text-right">
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
              style={{
                background: "var(--theme-primary)",
                color: "var(--theme-accent)",
              }}
            >
              <Mail className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-base font-bold text-ink-800">
                ارتباط ایمیلی
              </h3>
              <p className="text-xs text-ink-800/70 mt-0.5">
                برای همکاری و درخواست‌های خاص
              </p>
            </div>
          </div>
          <a
            href={`mailto:${content.email}`}
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition"
            style={{ background: "var(--theme-primary)" }}
          >
            <Mail className="h-4 w-4" />
            {content.email}
          </a>
        </div>
      </div>
    </div>
  );
}