import { Star, Quote, MessageCircle } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "سارا محمدی",
    role: "بیمار لمینت",
    text: "تجربه‌ی فوق‌العاده‌ای داشتم. دکتر قره‌داغی خیلی با حوصله توضیح دادن و نتیجه‌ی لمینت واقعاً طبیعی و زیبا شد. حتماً به دوستانم معرفی می‌کنم.",
    rating: 5,
    initial: "س",
  },
  {
    name: "علی رضایی",
    role: "بیمار ایمپلنت",
    text: "از ابتدا تا انتها همه‌چیز حرفه‌ای بود. بدون هیچ دردی ایمپلنت گذاشتم و بعد از چند ماه کاملاً راضی هستم. مطب تمیز و تیم خوش‌برخورد.",
    rating: 5,
    initial: "ع",
  },
  {
    name: "مریم کریمی",
    role: "بیمار ارتودنسی",
    text: "دخترم از دندانپزشکی می‌ترسید ولی اینجا کاملاً آرام بود. برخورد تیم با کودکان عالیه و الان بعد از یک سال، دندان‌هاش مرتب شده.",
    rating: 5,
    initial: "م",
  },
  {
    name: "رضا احمدی",
    role: "بیمار جرم‌گیری",
    text: "برای جرم‌گیری رفتم و از تمیزی و دقت کار خیلی راضی بودم. قیمت هم منصفانه بود. زمان انتظار خیلی کوتاه و وقت‌شناس بودن.",
    rating: 5,
    initial: "ر",
  },
  {
    name: "نگار حسینی",
    role: "بیمار عصب‌کشی",
    text: "همیشه از عصب‌کشی می‌ترسیدم ولی اینجا اصلاً دردی حس نکردم. دکتر خیلی آرام و با حوصله کار کردن. ممنون از تیم حرفه‌ای.",
    rating: 5,
    initial: "ن",
  },
  {
    name: "امیر تهرانی",
    role: "بیمار کامپوزیت",
    text: "طراحی لبخند انجام دادم و نتیجه فراتر از انتظارم بود. مشاوره‌ی رایگان قبل از درمان خیلی کمک کرد تا بهترین انتخاب رو داشته باشم.",
    rating: 5,
    initial: "ا",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-surface">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-2 text-sm font-medium text-brand-800 mb-4">
            <MessageCircle className="h-4 w-4" />
            نظرات بیماران
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-ink-800 leading-tight">
            لبخند <span className="text-brand-700">رضایت</span> بیماران ما
          </h2>
          <p className="mt-4 text-base text-muted leading-relaxed">
            بیش از ۵۰۰۰ بیمار راضی، بهترین گواه کیفیت خدمات ما هستند
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={t.name}
              className="group relative rounded-2xl border border-border bg-background p-6 md:p-7 hover:shadow-elevated hover:border-brand-200 transition-all duration-300"
            >
              {/* Quote icon */}
              <div className="absolute top-6 left-6 text-brand-100 group-hover:text-brand-200 transition-colors">
                <Quote className="h-10 w-10" />
              </div>

              {/* Stars */}
              <div className="relative flex items-center gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-gold-500 text-gold-500"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="relative text-sm text-foreground/80 leading-relaxed">
                «{t.text}»
              </p>

              {/* Author */}
              <div className="mt-6 pt-5 border-t border-border flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-brand-800 text-white font-bold shadow-sm">
                  {t.initial}
                </div>
                <div>
                  <div className="text-sm font-bold text-ink-800">
                    {t.name}
                  </div>
                  <div className="text-xs text-muted">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted">
            میانگین رضایت بیماران:{" "}
            <span className="inline-flex items-center gap-1 font-bold text-ink-800">
              ۴.۹ از ۵
              <Star className="h-4 w-4 fill-gold-500 text-gold-500" />
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}