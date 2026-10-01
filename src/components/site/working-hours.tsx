import { Clock, MapPin, Calendar, ExternalLink } from "lucide-react";

const HOURS = [
  { day: "شنبه", time: "۹:۰۰ - ۱۹:۰۰", open: true },
  { day: "یک‌شنبه", time: "۹:۰۰ - ۱۹:۰۰", open: true },
  { day: "دوشنبه", time: "۹:۰۰ - ۱۹:۰۰", open: true },
  { day: "سه‌شنبه", time: "۹:۰۰ - ۱۹:۰۰", open: true },
  { day: "چهارشنبه", time: "۹:۰۰ - ۱۹:۰۰", open: true },
  { day: "پنجشنبه", time: "۹:۰۰ - ۱۴:۰۰", open: true },
  { day: "جمعه", time: "تعطیل", open: false },
];

export function WorkingHours() {
  // امروز رو بر اساس روز هفته شمسی حساب می‌کنیم (خیلی ساده)
  const jsDay = new Date().getDay(); // 0=Sunday..6=Saturday
  // تبدیل به شنبه=0..جمعه=6
  const faDayIndex = (jsDay + 1) % 7;

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-2 text-sm font-medium text-brand-800 mb-4">
            <Clock className="h-4 w-4" />
            ساعات کاری و آدرس
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-ink-800 leading-tight">
            ما را <span className="text-brand-700">پیدا کنید</span>
          </h2>
          <p className="mt-4 text-base text-muted leading-relaxed">
            در روزهای کاری پذیرای شما هستیم. برای رزرو نوبت، از قبل تماس بگیرید.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Working hours */}
          <div className="rounded-3xl border border-border bg-surface p-6 md:p-8 shadow-soft">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-ink-800">
                  ساعات کاری مطب
                </h3>
                <p className="text-xs text-muted">به‌روزرسانی هفتگی</p>
              </div>
            </div>

            <ul className="space-y-1">
              {HOURS.map((item, idx) => {
                const isToday = idx === faDayIndex;
                return (
                  <li
                    key={item.day}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 transition ${
                      isToday
                        ? "bg-brand-50 border border-brand-200"
                        : "hover:bg-background"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-sm font-medium ${
                          isToday ? "text-brand-800" : "text-foreground/80"
                        }`}
                      >
                        {item.day}
                      </span>
                      {isToday && (
                        <span className="inline-flex items-center rounded-full bg-brand-700 px-2 py-0.5 text-[10px] font-medium text-white">
                          امروز
                        </span>
                      )}
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        item.open
                          ? "text-ink-800"
                          : "text-rose-500"
                      }`}
                      dir={item.open ? "ltr" : "rtl"}
                    >
                      {item.time}
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 rounded-2xl bg-gradient-to-br from-brand-50 to-gold-50/40 border border-brand-100 p-4">
              <p className="text-xs text-brand-800 leading-relaxed">
                💡 برای رزرو نوبت در ساعات خارج از این بازه، با منشی تماس
                بگیرید.
              </p>
            </div>
          </div>

          {/* Location + Map */}
          <div className="rounded-3xl border border-border bg-surface overflow-hidden shadow-soft">
            {/* Map placeholder */}
            <div className="relative aspect-[4/3] bg-gradient-to-br from-brand-100 via-brand-50 to-gold-50/30 overflow-hidden">
              {/* Decorative map lines */}
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
                  <div className="absolute -inset-8 rounded-full bg-brand-500/20 animate-ping" />
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-brand-700 text-white shadow-xl">
                    <MapPin className="h-8 w-8" />
                  </div>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=Tehran"
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-xl bg-white/95 backdrop-blur-md px-4 py-2 text-xs font-bold text-brand-800 hover:bg-white transition shadow-md"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                مشاهده در نقشه
              </a>
            </div>

            {/* Address */}
            <div className="p-6 md:p-8">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-ink-800">
                    آدرس مطب
                  </h3>
                  <p className="mt-1 text-sm text-muted leading-relaxed">
                    تهران، خیابان ولیعصر، بالاتر از پارک ساعی، پلاک ۱۲۳،
                    طبقه‌ی ۲، واحد ۴
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <a
                  href="tel:+982100000000"
                  className="rounded-xl border border-border bg-background px-4 py-3 text-center text-sm font-medium hover:bg-brand-50 hover:border-brand-200 transition"
                >
                  تماس تلفنی
                </a>
                <a
                  href="https://wa.me/989120000000"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-brand-700 px-4 py-3 text-center text-sm font-bold text-white hover:bg-brand-800 transition"
                >
                  واتساپ
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}