"use client";

import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import {
  ArrowRight,
  Clock,
  CalendarCheck,
  ShieldCheck,
  Sparkles,
  Star,
  Phone,
  MapPin,
} from "lucide-react";
import { useMemo } from "react";
import { useAdminStore } from "@/lib/stores/admin-store";

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params?.id as string;

  // ═══ Store ═══
  const services = useAdminStore((s) => s.services);
  const content = useAdminStore((s) => s.content);

  // ═══ Find service by slug ═══
  const service = useMemo(
    () => services.find((s) => s.slug === slug),
    [services, slug]
  );

  // اگه خدمت پیدا نشد یا غیرفعال بود
  if (!service || !service.isActive) {
    notFound();
  }

  return (
    <div className="bg-background min-h-screen pb-56 md:pb-64">
      {/* ═══ Hero ═══════════════════════════════ */}
      <div className="relative h-[280px] md:h-[400px] bg-gradient-to-br from-ink-900 via-brand-900 to-ink-900">
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/40 via-transparent to-ink-900/80" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-[120px] md:text-[180px] opacity-80">
            {service.emoji}
          </div>
        </div>

        {/* Back button */}
        <Link
          href="/services"
          className="absolute top-4 right-4 md:top-6 md:right-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition"
          aria-label="بازگشت"
        >
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>

      {/* ═══ Content ═══════════════════════════ */}
      <div className="container mx-auto px-4 md:px-6 -mt-12 relative z-10">
        <div className="rounded-3xl bg-surface border border-border shadow-elevated p-5 md:p-8">
          {/* Category + Stars */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span
              className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium"
              style={{
                background: "var(--theme-primary-soft)",
                color: "var(--theme-primary)",
              }}
            >
              <Sparkles className="h-3 w-3" />
              {service.category === "cosmetic" && "زیبایی"}
              {service.category === "therapeutic" && "درمانی"}
              {service.category === "surgery" && "جراحی"}
              {service.category === "preventive" && "پیشگیری"}
              {service.category === "kids" && "کودکان"}
            </span>
            {service.isFeatured && (
              <span
                className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium"
                style={{
                  background: "var(--theme-accent)",
                  color: "#0b1f1d",
                }}
              >
                <Star className="h-3 w-3" />
                منتخب
              </span>
            )}
            <span
              className="inline-flex items-center gap-0.5"
              style={{ color: "var(--theme-accent)" }}
            >
              <Star
                className="h-3.5 w-3.5"
                fill="currentColor"
              />
              <Star
                className="h-3.5 w-3.5"
                fill="currentColor"
              />
              <Star
                className="h-3.5 w-3.5"
                fill="currentColor"
              />
              <Star
                className="h-3.5 w-3.5"
                fill="currentColor"
              />
              <Star
                className="h-3.5 w-3.5"
                fill="currentColor"
              />
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-ink-800">
            {service.name}
          </h1>

          <p className="mt-3 text-sm md:text-base text-muted leading-relaxed">
            {service.longDescription}
          </p>

          {/* Info boxes */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-cream-200 p-4">
              <div className="flex items-center gap-2 text-xs text-ink-800/70 mb-1">
                <Clock className="h-3.5 w-3.5" />
                مدت زمان
              </div>
              <div className="text-base md:text-lg font-bold text-ink-800">
                {service.duration} دقیقه
              </div>
            </div>
            <div className="rounded-2xl bg-cream-200 p-4">
              <div className="flex items-center gap-2 text-xs text-ink-800/70 mb-1">
                <Sparkles className="h-3.5 w-3.5" />
                هزینه
              </div>
              <div className="text-base md:text-lg font-bold text-ink-800">
                {service.price
                  ? service.price.toLocaleString("fa-IR")
                  : "مشاوره رایگان"}
                {service.price && (
                  <span className="text-xs font-normal text-ink-800/50 mr-1">
                    تومان
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Payment method */}
          <div className="mt-4 rounded-2xl bg-cream-200 p-4 flex items-center justify-between">
            <span className="text-xs text-ink-800/70">روش پرداخت</span>
            <span className="text-sm font-bold text-ink-800">
              {service.paymentMethod === "ONLINE" && "پرداخت آنلاین"}
              {service.paymentMethod === "IN_PERSON" && "پرداخت در محل"}
              {service.paymentMethod === "BOTH" && "آنلاین یا در محل"}
            </span>
          </div>

          {/* Divider */}
          <div className="my-6 border-t border-border" />

          {/* Contact options */}
          <div className="grid grid-cols-2 gap-3">
            <a
              href={`tel:${content.phone}`}
              className="flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium transition"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--theme-primary-soft)";
                e.currentTarget.style.borderColor = "var(--theme-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "";
                e.currentTarget.style.borderColor = "";
              }}
            >
              <Phone
                className="h-4 w-4"
                style={{ color: "var(--theme-primary)" }}
              />
              تماس تلفنی
            </a>
            <a
              href={content.googleMaps}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium transition"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--theme-primary-soft)";
                e.currentTarget.style.borderColor = "var(--theme-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "";
                e.currentTarget.style.borderColor = "";
              }}
            >
              <MapPin
                className="h-4 w-4"
                style={{ color: "var(--theme-primary)" }}
              />
              مسیریابی
            </a>
          </div>
        </div>
      </div>

      {/* ═══ Bottom CTA ═══════════════════════════ */}
      <div className="fixed bottom-5 right-4 left-4 md:left-auto md:right-6 md:w-auto z-30 md:max-w-md">
        <Link
          href={`/booking?service=${service.slug}`}
          className="group flex items-center justify-between gap-3 rounded-2xl px-5 py-4 md:px-7 md:py-5 shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all"
          style={{
            background: "var(--theme-accent)",
            color: "#0b1f1d",
          }}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/10 backdrop-blur-sm">
              <CalendarCheck className="h-5 w-5" />
            </div>
            <div className="text-right">
              <div className="text-sm md:text-base font-bold">
                رزرو این خدمت
              </div>
              <div className="text-[10px] md:text-xs opacity-70">
                همین حالا وقت خود را رزرو کنید
              </div>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 rotate-180 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}