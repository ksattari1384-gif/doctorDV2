import Link from "next/link";
import { Clock, Plus } from "lucide-react";

const SERVICES = [
  {
    id: "implant",
    name: "ایمپلنت دندان",
    description: "جایگزینی دندان‌های از دست رفته با ایمپلنت تیتانیومی",
    price: "۱۵,۰۰۰,۰۰۰",
    duration: "۶۰ دقیقه",
    emoji: "🦷",
    tag: "محبوب",
  },
  {
    id: "laminate",
    name: "لمینت سرامیکی",
    description: "طراحی لبخند با لمینت‌های نازک و طبیعی",
    price: "۸,۰۰۰,۰۰۰",
    duration: "۹۰ دقیقه",
    emoji: "💎",
    tag: "پیشنهاد ویژه",
  },
  {
    id: "orthodontics",
    name: "ارتودنسی",
    description: "مرتب‌سازی دندان‌ها با براکت‌های نامرئی",
    price: "مشاوره رایگان",
    duration: "۴۵ دقیقه",
    emoji: "✨",
    tag: null,
  },
  {
    id: "root-canal",
    name: "عصب‌کشی",
    description: "درمان ریشه با تجهیزات مدرن و بدون درد",
    price: "۲,۵۰۰,۰۰۰",
    duration: "۶۰ دقیقه",
    emoji: "🩺",
    tag: null,
  },
  {
    id: "scaling",
    name: "جرم‌گیری",
    description: "پاک‌سازی تخصصی جرم و پلاک با اولتراسونیک",
    price: "۸۰۰,۰۰۰",
    duration: "۳۰ دقیقه",
    emoji: "🛡️",
    tag: null,
  },
  {
    id: "pediatric",
    name: "دندانپزشکی کودکان",
    description: "درمان آرام و دوستانه برای کوچک‌ترها",
    price: "۵۰۰,۰۰۰",
    duration: "۳۰ دقیقه",
    emoji: "🧒",
    tag: null,
  },
];

export function ServiceGrid() {
  return (
    <div className="mt-6 space-y-3 md:space-y-4">
      {SERVICES.map((service) => (
        <Link
          key={service.id}
          href={`/services/${service.id}`}
          className="group flex items-stretch gap-3 md:gap-4 rounded-3xl bg-gradient-to-l from-brand-50/80 via-background to-gold-50/30 border border-brand-100/60 p-3 md:p-4 hover:border-brand-300 hover:shadow-elevated transition-all"
        >
          <div className="relative flex h-24 w-24 md:h-32 md:w-32 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-100 to-brand-200 overflow-hidden">
            <div className="text-4xl md:text-5xl">{service.emoji}</div>
            {service.tag && (
              <div className="absolute top-1.5 right-1.5 rounded-full bg-gold-500 px-2 py-0.5 text-[9px] font-bold text-ink-900">
                {service.tag}
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col justify-between min-w-0 py-1">
            <div>
              <h3 className="text-sm md:text-base font-bold text-ink-800 leading-snug">
                {service.name}
              </h3>
              <p className="mt-1.5 text-xs md:text-sm text-muted leading-relaxed line-clamp-2">
                {service.description}
              </p>
            </div>

            <div className="mt-2 flex items-end justify-between">
              <div>
                <div className="text-sm md:text-base font-bold text-brand-700">
                  {service.price}
                  {service.price !== "مشاوره رایگان" && (
                    <span className="text-[10px] md:text-xs font-normal text-muted mr-1">
                      تومان
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 mt-0.5 text-[10px] md:text-xs text-muted">
                  <Clock className="h-3 w-3" />
                  {service.duration}
                </div>
              </div>

              <div className="flex h-9 w-9 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-full bg-brand-700 text-white group-hover:bg-gold-500 group-hover:text-ink-900 transition-colors shadow-sm">
                <Plus className="h-4 w-4 md:h-5 md:w-5" />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}