import Link from "next/link";
import {
  ArrowRight,
  Award,
  GraduationCap,
  HeartPulse,
  ShieldCheck,
  Sparkles,
  Clock,
  MapPin,
  Phone,
  CheckCircle2,
  Users,
  Star,
} from "lucide-react";

const STATS = [
  { value: "+۱۵", label: "سال تجربه" },
  { value: "+۵۰۰۰", label: "بیمار راضی" },
  { value: "۴.۹", label: "امتیاز رضایت" },
  { value: "+۲۰", label: "خدمت تخصصی" },
];

const VALUES = [
  {
    icon: ShieldCheck,
    title: "استریل کامل",
    description: "رعایت بالاترین استانداردهای بهداشتی در هر درمان",
  },
  {
    icon: HeartPulse,
    title: "درمان بدون درد",
    description: "استفاده از جدیدترین تکنیک‌های بی‌حسی و آرام‌سازی",
  },
  {
    icon: Award,
    title: "تضمین کیفیت",
    description: "استفاده از بهترین متریال‌ها با ضمانت‌نامه‌ی کتبی",
  },
  {
    icon: Users,
    title: "تیم متخصص",
    description: "متخصصان مجرب در تمام حوزه‌های دندانپزشکی",
  },
];

const HIGHLIGHTS = [
  "بیش از ۱۵ سال تجربه‌ی بالینی در دندانپزشکی زیبایی و ترمیمی",
  "عضو انجمن دندانپزشکی ایران و انجمن ایمپلنتولوژی",
  "شرکت در کنگره‌های بین‌المللی و به‌روزرسانی دانش تخصصی",
  "استفاده از جدیدترین تکنولوژی‌های دیجیتال دندانپزشکی",
];

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-ink-900 via-brand-900 to-ink-900 pt-8 pb-16 md:pb-20 rounded-b-[32px] md:rounded-b-[48px]">
        <div className="container mx-auto px-4 md:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition mb-5"
          >
            <ArrowRight className="h-4 w-4" />
            بازگشت
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-2 text-sm font-medium text-white/95 mb-5">
            <Sparkles className="h-4 w-4 text-gold-400" />
            <span>درباره ما</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            مطب دندانپزشکی{" "}
            <span className="bg-gradient-to-l from-gold-400 via-gold-500 to-gold-600 bg-clip-text text-transparent">
              دکتر قره‌داغی
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-base md:text-lg text-white/80 leading-relaxed">
            ما در مطب دکتر قره‌داغی، با تکیه بر تجربه‌ی بیش از ۱۵ ساله و
            استفاده از جدیدترین تکنولوژی‌ها، لبخندی زیبا و سالم به شما هدیه
            می‌دهیم.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-4 md:px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl bg-surface border border-border p-5 text-center shadow-soft"
            >
              <div className="text-2xl md:text-3xl font-bold text-brand-700">
                {s.value}
              </div>
              <div className="mt-1 text-xs md:text-sm text-muted">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Doctor intro */}
      <div className="container mx-auto px-4 md:px-6 mt-12 md:mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image placeholder */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-brand-200/50 to-gold-200/30 rounded-3xl blur-2xl" />
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-4">👨‍⚕️</div>
                <div className="text-sm text-brand-800 font-medium">
                  عکس دکتر اینجا قرار می‌گیرد
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-2 text-sm font-medium text-brand-800 mb-4">
              <GraduationCap className="h-4 w-4" />
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
                className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-6 py-3 text-sm font-bold text-white hover:bg-brand-800 transition shadow-sm"
              >
                رزرو نوبت
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <a
                href="tel:+982100000000"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-6 py-3 text-sm font-medium hover:bg-brand-50 transition"
              >
                <Phone className="h-4 w-4 text-brand-700" />
                تماس تلفنی
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="container mx-auto px-4 md:px-6 mt-20 md:mt-28">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-2 text-sm font-medium text-brand-800 mb-4">
            <Star className="h-4 w-4" />
            ارزش‌های ما
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-ink-800 leading-tight">
            تعهد ما به <span className="text-brand-700">شما</span>
          </h2>
          <p className="mt-4 text-base text-muted leading-relaxed">
            آنچه مطب دکتر قره‌داغی را متفاوت می‌کند
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {VALUES.map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className="rounded-2xl border border-border bg-surface p-6 hover:border-brand-200 hover:shadow-soft transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-bold text-ink-800">
                  {v.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted leading-relaxed">
                  {v.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contact info */}
      <div className="container mx-auto px-4 md:px-6 mt-20 md:mt-28">
        <div className="rounded-3xl bg-gradient-to-br from-cream-100 via-cream-200 to-cream-100 p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink-900 text-gold-400">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-ink-800 mb-1">آدرس</h3>
                <p className="text-xs text-ink-800/70 leading-relaxed">
                  تهران، خیابان ولیعصر، بالاتر از پارک ساعی، پلاک ۱۲۳، طبقه
                  ۲
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink-900 text-gold-400">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-ink-800 mb-1">
                  تلفن تماس
                </h3>
                <a
                  href="tel:+982100000000"
                  className="text-xs text-ink-800/70 hover:text-brand-700 transition"
                  dir="ltr"
                >
                  ۰۲۱-۰۰۰۰۰۰۰۰
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink-900 text-gold-400">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-ink-800 mb-1">
                  ساعات کاری
                </h3>
                <p className="text-xs text-ink-800/70 leading-relaxed">
                  شنبه تا چهارشنبه: ۹ تا ۱۹
                  <br />
                  پنجشنبه: ۹ تا ۱۴
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}