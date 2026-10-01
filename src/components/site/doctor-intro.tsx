import Image from "next/image";
import Link from "next/link";
import {
  Award,
  GraduationCap,
  HeartPulse,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

const FEATURES = [
  {
    icon: GraduationCap,
    title: "تحصیلات تخصصی",
    description: "دکترای دندانپزشکی از دانشگاه تهران",
  },
  {
    icon: Award,
    title: "بورد تخصصی",
    description: "دارای بورد تخصصی دندانپزشکی",
  },
  {
    icon: HeartPulse,
    title: "درمان بدون درد",
    description: "استفاده از جدیدترین تکنیک‌های بی‌حسی",
  },
  {
    icon: ShieldCheck,
    title: "استریل کامل",
    description: "رعایت بالاترین استانداردهای بهداشتی",
  },
];

const HIGHLIGHTS = [
  "بیش از ۱۵ سال تجربه‌ی بالینی",
  "عضو انجمن دندانپزشکی ایران",
  "شرکت در کنگره‌های بین‌المللی",
  "مشاوره‌ی رایگان قبل از درمان",
];

export function DoctorIntro() {
  return (
    <section className="relative py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image side */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-brand-200/50 to-gold-200/30 rounded-3xl blur-2xl" />
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-elevated bg-gradient-to-br from-brand-100 to-brand-200">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4">👨‍⚕️</div>
                  <div className="text-sm text-brand-800 font-medium">
                    عکس دکتر اینجا قرار می‌گیرد
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 md:-left-8 bg-surface rounded-2xl shadow-elevated p-4 md:p-5 border border-border">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-700 text-white">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-ink-800">+۱۵</div>
                  <div className="text-xs text-muted">سال تجربه</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content side */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-medium text-brand-800 mb-4">
              <Sparkles className="h-4 w-4" />
              درباره پزشک
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-ink-800 leading-tight">
              دکتر{" "}
              <span className="text-brand-700">قره‌داغی</span>
            </h2>

            <p className="mt-2 text-base text-muted font-medium">
              متخصص دندانپزشکی زیبایی و ترمیمی
            </p>

            <p className="mt-6 text-base text-foreground/80 leading-relaxed">
              با بیش از ۱۵ سال تجربه در زمینه‌ی دندانپزشکی زیبایی، ترمیمی و
              ایمپلنت، دکتر قره‌داغی توانسته هزاران لبخند زیبا و سالم به
              بیماران هدیه کند. تمرکز ایشان بر درمان‌های دقیق، بدون درد و با
              کمترین زمان بهبودی است.
            </p>

            <ul className="mt-6 space-y-3">
              {HIGHLIGHTS.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-foreground/80"
                >
                  <CheckCircle2 className="h-5 w-5 text-brand-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/booking"
                className="group inline-flex items-center gap-2 rounded-xl bg-brand-700 px-6 py-3 text-sm font-bold text-white hover:bg-brand-800 transition shadow-sm"
              >
                رزرو نوبت با دکتر
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-6 py-3 text-sm font-medium hover:bg-brand-50 transition"
              >
                درباره مطب
              </Link>
            </div>
          </div>
        </div>

        {/* Features grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group rounded-2xl border border-border bg-surface p-6 hover:border-brand-200 hover:shadow-soft transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700 group-hover:bg-brand-700 group-hover:text-white transition-colors">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-bold text-ink-800">
                  {f.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted leading-relaxed">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}