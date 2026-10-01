import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Sparkles,
  Smile,
  Stethoscope,
  Syringe,
  Heart,
  Baby,
} from "lucide-react";

const SERVICES = [
  {
    id: "implant",
    name: "ایمپلنت دندان",
    short: "جایگزینی دندان‌های از دست رفته با ایمپلنت‌های تیتانیومی با دوام بالا",
    price: "از ۱۵,۰۰۰,۰۰۰ تومان",
    duration: "۶۰ دقیقه",
    icon: Sparkles,
    category: "تخصصی",
  },
  {
    id: "laminate",
    name: "لمینت و کامپوزیت",
    short: "طراحی لبخند با لمینت‌های سرامیکی نازک و طبیعی",
    price: "از ۸,۰۰۰,۰۰۰ تومان",
    duration: "۹۰ دقیقه",
    icon: Smile,
    category: "زیبایی",
  },
  {
    id: "orthodontics",
    name: "ارتودنسی",
    short: "مرتب‌سازی دندان‌ها با براکت‌های فلزی، سرامیکی یا نامرئی",
    price: "مشاوره رایگان",
    duration: "۴۵ دقیقه",
    icon: Stethoscope,
    category: "تخصصی",
  },
  {
    id: "root-canal",
    name: "عصب‌کشی (ریشه)",
    short: "درمان ریشه‌ی دندان با تجهیزات مدرن و بدون درد",
    price: "از ۲,۵۰۰,۰۰۰ تومان",
    duration: "۶۰ دقیقه",
    icon: Syringe,
    category: "درمانی",
  },
  {
    id: "scaling",
    name: "جرم‌گیری و بروساژ",
    short: "پاک‌سازی تخصصی جرم و پلاک با دستگاه اولتراسونیک",
    price: "از ۸۰۰,۰۰۰ تومان",
    duration: "۳۰ دقیقه",
    icon: Heart,
    category: "پیشگیری",
  },
  {
    id: "pediatric",
    name: "دندانپزشکی کودکان",
    short: "درمان تخصصی کودکان با رویکردی آرام و دوستانه",
    price: "از ۵۰۰,۰۰۰ تومان",
    duration: "۳۰ دقیقه",
    icon: Baby,
    category: "کودکان",
  },
];

export function FeaturedServices() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-background to-brand-50/30">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-2 text-sm font-medium text-brand-800 mb-4">
            <Sparkles className="h-4 w-4" />
            خدمات ما
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-ink-800 leading-tight">
            خدمات <span className="text-brand-700">منتخب</span> مطب
          </h2>
          <p className="mt-4 text-base text-muted leading-relaxed">
            مجموعه‌ای کامل از خدمات تخصصی دندانپزشکی، با تجهیزات مدرن و
            تیمی حرفه‌ای
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className="group relative rounded-2xl border border-border bg-surface p-6 hover:border-brand-300 hover:shadow-elevated transition-all duration-300 overflow-hidden"
              >
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-50/0 to-brand-100/0 group-hover:from-brand-50/60 group-hover:to-gold-50/40 transition-all" />

                {/* Content */}
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 group-hover:bg-brand-700 group-hover:text-white transition-colors">
                      <Icon className="h-7 w-7" />
                    </div>
                    <span className="inline-flex items-center rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-800">
                      {service.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-ink-800 group-hover:text-brand-800 transition-colors">
                    {service.name}
                  </h3>

                  <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-2">
                    {service.short}
                  </p>

                  <div className="mt-5 flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <div className="text-sm font-bold text-brand-700">
                        {service.price}
                      </div>
                      <div className="flex items-center gap-1 mt-0.5 text-xs text-muted">
                        <Clock className="h-3 w-3" />
                        {service.duration}
                      </div>
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-700 group-hover:bg-brand-700 group-hover:text-white transition-all">
                      <ArrowLeft className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 rounded-xl border border-brand-200 bg-surface px-7 py-3.5 text-sm font-bold text-brand-800 hover:bg-brand-50 transition"
          >
            مشاهده همه خدمات
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}