import Link from "next/link";
import { CalendarCheck, Phone, Sparkles, ArrowLeft } from "lucide-react";

export function FinalCta() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 via-brand-900 to-ink-900 px-6 py-14 md:px-16 md:py-20 shadow-elevated">
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gold-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-brand-400/20 blur-3xl" />

          {/* Grid pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative text-center max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-2 text-sm font-medium text-white/95 mb-6">
              <Sparkles className="h-4 w-4 text-gold-400" />
              <span>همین امروز شروع کنید</span>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
              آماده‌اید لبخند{" "}
              <span className="bg-gradient-to-l from-gold-400 via-gold-500 to-gold-600 bg-clip-text text-transparent">
                رویایی‌تان
              </span>{" "}
              را بسازید؟
            </h2>

            {/* Subtitle */}
            <p className="mt-6 text-base md:text-lg leading-relaxed text-white/80 max-w-2xl mx-auto">
              فقط چند کلیک تا رزرو نوبت فاصله دارید. تیم ما آماده‌ی
              پذیرایی از شماست.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/booking"
                className="group inline-flex items-center gap-2 rounded-xl bg-gold-500 px-7 py-3.5 text-base font-bold text-ink-900 hover:bg-gold-400 transition shadow-lg shadow-gold-500/30"
              >
                <CalendarCheck className="h-5 w-5" />
                رزرو نوبت آنلاین
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              </Link>

              <a
                href="tel:+982100000000"
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/5 backdrop-blur-md px-7 py-3.5 text-base font-medium text-white hover:bg-white/10 transition"
              >
                <Phone className="h-5 w-5" />
                <span dir="ltr">۰۲۱-۰۰۰۰۰۰۰۰</span>
              </a>
            </div>

            {/* Trust note */}
            <p className="mt-8 text-xs text-white/60">
              ✨ مشاوره‌ی رایگان قبل از درمان • پاسخگویی در کمتر از ۲۴ ساعت
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}