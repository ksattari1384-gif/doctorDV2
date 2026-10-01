import Link from "next/link";
import { notFound } from "next/navigation";
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

const SERVICES: Record<
  string,
  {
    name: string;
    description: string;
    longDescription: string;
    price: string;
    duration: string;
    emoji: string;
    category: string;
    features: string[];
  }
> = {
  implant: {
    name: "ایمپلنت دندان",
    description: "جایگزینی دندان‌های از دست رفته با ایمپلنت تیتانیومی",
    longDescription:
      "ایمپلنت دندان روشی مدرن برای جایگزینی دندان‌های از دست رفته است. در این روش، یک پایه‌ی تیتانیومی در استخوان فک کاشته می‌شود و پس از جوش خوردن با استخوان، تاج دندان روی آن نصب می‌شود. نتیجه، دندانی است که هم از نظر ظاهری و هم از نظر عملکردی کاملاً شبیه دندان طبیعی است.",
    price: "۱۵,۰۰۰,۰۰۰",
    duration: "۶۰ دقیقه",
    emoji: "🦷",
    category: "تخصصی",
    features: [
      "بدون آسیب به دندان‌های مجاور",
      "ماندگاری بالا (بیش از ۲۰ سال)",
      "ظاهر کاملاً طبیعی",
      "بدون درد در حین و بعد از عمل",
    ],
  },
  laminate: {
    name: "لمینت سرامیکی",
    description: "طراحی لبخند با لمینت‌های نازک و طبیعی",
    longDescription:
      "لمینت‌های سرامیکی لایه‌های نازکی هستند که روی سطح دندان‌های جلویی چسبانده می‌شوند. این روش برای اصلاح رنگ، شکل و اندازه‌ی دندان‌ها استفاده می‌شود و نتیجه‌ای طبیعی و زیبا می‌دهد.",
    price: "۸,۰۰۰,۰۰۰",
    duration: "۹۰ دقیقه",
    emoji: "💎",
    category: "زیبایی",
    features: [
      "ظاهر طبیعی و شفاف",
      "مقاوم در برابر لکه",
      "کمترین آسیب به دندان",
      "نتیجه‌ی سریع",
    ],
  },
  orthodontics: {
    name: "ارتودنسی",
    description: "مرتب‌سازی دندان‌ها با براکت‌های نامرئی",
    longDescription:
      "ارتودنسی روشی برای مرتب‌سازی دندان‌های نامرتب و اصلاح ناهنجاری‌های فکی است. با استفاده از براکت‌های ثابت یا پلاک‌های متحرک، دندان‌ها به تدریج به موقعیت صحیح منتقل می‌شوند.",
    price: "مشاوره رایگان",
    duration: "۴۵ دقیقه",
    emoji: "✨",
    category: "تخصصی",
    features: [
      "مناسب برای کودکان و بزرگسالان",
      "براکت‌های سرامیکی و نامرئی",
      "پیگیری منظم روند درمان",
    ],
  },
  "root-canal": {
    name: "عصب‌کشی",
    description: "درمان ریشه با تجهیزات مدرن و بدون درد",
    longDescription:
      "عصب‌کشی یا درمان ریشه، روشی برای نجات دندانی است که پالپ آن آسیب دیده یا عفونی شده. با استفاده از تجهیزات مدرن و بی‌حسی موضعی، این درمان به طور کامل و بدون درد انجام می‌شود.",
    price: "۲,۵۰۰,۰۰۰",
    duration: "۶۰ دقیقه",
    emoji: "🩺",
    category: "درمانی",
    features: [
      "بدون درد با بی‌حسی موضعی",
      "استفاده از دستگاه‌های روتاری",
      "نجات دندان از کشیدن",
    ],
  },
  scaling: {
    name: "جرم‌گیری",
    description: "پاک‌سازی تخصصی جرم و پلاک با دستگاه اولتراسونیک",
    longDescription:
      "جرم‌گیری روشی برای پاک‌سازی جرم و پلاک از سطح دندان‌ها و زیر لثه است. این کار با استفاده از دستگاه اولتراسونیک انجام می‌شود و به پیشگیری از بیماری‌های لثه کمک می‌کند.",
    price: "۸۰۰,۰۰۰",
    duration: "۳۰ دقیقه",
    emoji: "🛡️",
    category: "پیشگیری",
    features: [
      "پیشگیری از بیماری لثه",
      "حس تمیزی و تازگی",
      "بدون آسیب به مینای دندان",
    ],
  },
  pediatric: {
    name: "دندانپزشکی کودکان",
    description: "درمان آرام و دوستانه برای کوچک‌ترها",
    longDescription:
      "دندانپزشکی کودکان نیازمند رویکردی خاص و آرام است تا کودک تجربه‌ای مثبت از دندانپزشکی داشته باشد. تیم ما با صبر و حوصله با کودکان کار می‌کند و محیطی شاد و امن فراهم می‌کند.",
    price: "۵۰۰,۰۰۰",
    duration: "۳۰ دقیقه",
    emoji: "🧒",
    category: "کودکان",
    features: [
      "محیط شاد و امن",
      "برخورد آرام و دوستانه",
      "آموزش بهداشت دهان به کودک",
    ],
  },
};

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = SERVICES[id];

  if (!service) {
    notFound();
  }

  return (
    <div className="bg-background min-h-screen pb-40">
      <div className="relative h-[280px] md:h-[400px] bg-gradient-to-br from-ink-900 via-brand-900 to-ink-900">
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/40 via-transparent to-ink-900/80" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-[120px] md:text-[180px] opacity-80">
            {service.emoji}
          </div>
        </div>

        <Link
          href="/"
          className="absolute top-4 right-4 md:top-6 md:right-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition"
          aria-label="بازگشت"
        >
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>

      <div className="container mx-auto px-4 md:px-6 -mt-12 relative z-10">
        <div className="rounded-3xl bg-surface border border-border shadow-elevated p-5 md:p-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-800">
              <Sparkles className="h-3 w-3" />
              {service.category}
            </span>
            <span className="inline-flex items-center gap-0.5 text-gold-500">
              <Star className="h-3.5 w-3.5 fill-gold-500" />
              <Star className="h-3.5 w-3.5 fill-gold-500" />
              <Star className="h-3.5 w-3.5 fill-gold-500" />
              <Star className="h-3.5 w-3.5 fill-gold-500" />
              <Star className="h-3.5 w-3.5 fill-gold-500" />
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-ink-800">
            {service.name}
          </h1>

          <p className="mt-3 text-sm md:text-base text-muted leading-relaxed">
            {service.longDescription}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-cream-200 p-4">
              <div className="flex items-center gap-2 text-xs text-ink-800/70 mb-1">
                <Clock className="h-3.5 w-3.5" />
                مدت زمان
              </div>
              <div className="text-base md:text-lg font-bold text-ink-800">
                {service.duration}
              </div>
            </div>
            <div className="rounded-2xl bg-cream-200 p-4">
              <div className="flex items-center gap-2 text-xs text-ink-800/70 mb-1">
                <Sparkles className="h-3.5 w-3.5" />
                هزینه
              </div>
              <div className="text-base md:text-lg font-bold text-ink-800">
                {service.price}
                {service.price !== "مشاوره رایگان" && (
                  <span className="text-xs font-normal text-ink-800/50 mr-1">
                    تومان
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-base font-bold text-ink-800 mb-3">
              ویژگی‌های این خدمت
            </h3>
            <ul className="space-y-2.5">
              {service.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2.5 text-sm text-foreground/80"
                >
                  <ShieldCheck className="h-5 w-5 text-brand-600 shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="my-6 border-t border-border" />

          <div className="grid grid-cols-2 gap-3">
            <a
              href="tel:+982100000000"
              className="flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium hover:bg-brand-50 transition"
            >
              <Phone className="h-4 w-4 text-brand-700" />
              تماس تلفنی
            </a>
            <a
              href="https://maps.google.com/?q=Tehran"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium hover:bg-brand-50 transition"
            >
              <MapPin className="h-4 w-4 text-brand-700" />
              مسیریابی
            </a>
          </div>
        </div>
      </div>

      <div className="fixed bottom-5 right-4 left-4 md:left-auto md:right-6 md:w-auto z-30 md:max-w-md">
        <Link
          href={`/booking?service=${id}`}
          className="group flex items-center justify-between gap-3 rounded-2xl bg-gradient-to-l from-gold-500 to-gold-600 px-5 py-4 md:px-7 md:py-5 text-ink-900 shadow-2xl shadow-gold-500/30 hover:shadow-gold-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink-900/10 backdrop-blur-sm">
              <CalendarCheck className="h-5 w-5" />
            </div>
            <div className="text-right">
              <div className="text-sm md:text-base font-bold">
                رزرو این خدمت
              </div>
              <div className="text-[10px] md:text-xs text-ink-900/70">
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