import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";

const QUICK_LINKS = [
  { label: "خانه", href: "/" },
  { label: "خدمات", href: "/services" },
  { label: "رزرو نوبت", href: "/booking" },
  { label: "درباره ما", href: "/about" },
  { label: "تماس با ما", href: "/contact" },
];

const SERVICE_LINKS = [
  { label: "ایمپلنت دندان", href: "/services/implant" },
  { label: "لمینت سرامیکی", href: "/services/laminate" },
  { label: "ارتودنسی", href: "/services/orthodontics" },
  { label: "عصب‌کشی", href: "/services/root-canal" },
  { label: "جرم‌گیری", href: "/services/scaling" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-ink-900 via-brand-900 to-ink-900 text-white mt-20 overflow-hidden">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-brand-400/10 blur-3xl" />

      <div className="relative container mx-auto px-4 md:px-6 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-gold-400 to-gold-600 opacity-40 blur-md" />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-700 to-ink-900 border-2 border-gold-500/40 text-gold-400 font-bold text-lg shadow-lg">
                  ق
                </div>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-base font-bold text-white">
                  دکتر قره‌داغی
                </span>
                <span className="text-xs text-gold-300/80">
                  دندانپزشکی تخصصی
                </span>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              ارائه‌ی خدمات تخصصی دندانپزشکی با جدیدترین تکنولوژی‌ها و
              بالاترین استانداردهای بهداشتی، در محیطی آرام و حرفه‌ای.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="اینستاگرام"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-white/80 hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-600 hover:text-white hover:border-transparent transition"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/989120000000"
                target="_blank"
                rel="noreferrer"
                aria-label="واتساپ"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-white/80 hover:bg-green-500 hover:text-white hover:border-transparent transition"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href="tel:+982100000000"
                aria-label="تماس"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-white/80 hover:bg-brand-600 hover:text-white hover:border-transparent transition"
              >
                <Phone className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-base font-bold text-white mb-5 flex items-center gap-2">
              <span className="h-1 w-6 rounded-full bg-gold-500" />
              دسترسی سریع
            </h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-sm text-white/70 hover:text-gold-400 transition"
                  >
                    <ArrowLeft className="h-3 w-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-base font-bold text-white mb-5 flex items-center gap-2">
              <span className="h-1 w-6 rounded-full bg-gold-500" />
              خدمات پرطرفدار
            </h3>
            <ul className="space-y-3">
              {SERVICE_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-sm text-white/70 hover:text-gold-400 transition"
                  >
                    <ArrowLeft className="h-3 w-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base font-bold text-white mb-5 flex items-center gap-2">
              <span className="h-1 w-6 rounded-full bg-gold-500" />
              اطلاعات تماس
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/70">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-gold-400">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="leading-relaxed">
                  تهران، خیابان ولیعصر، بالاتر از پارک ساعی، پلاک ۱۲۳، طبقه ۲
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/70">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-gold-400">
                  <Phone className="h-4 w-4" />
                </div>
                <a
                  href="tel:+982100000000"
                  dir="ltr"
                  className="hover:text-gold-400 transition leading-relaxed"
                >
                  ۰۲۱-۰۰۰۰۰۰۰۰
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/70">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-gold-400">
                  <Mail className="h-4 w-4" />
                </div>
                <a
                  href="mailto:info@example.com"
                  className="hover:text-gold-400 transition leading-relaxed"
                >
                  info@example.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/70">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-gold-400">
                  <Clock className="h-4 w-4" />
                </div>
                <span className="leading-relaxed">
                  شنبه تا چهارشنبه: ۹ تا ۱۹
                  <br />
                  پنجشنبه: ۹ تا ۱۴
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/50">
            © {year} مطب دندانپزشکی دکتر قره‌داغی. تمامی حقوق محفوظ است.
          </p>
          <p className="text-xs text-white/50 flex items-center gap-1.5">
            طراحی و توسعه با
            <span className="text-red-400">❤</span>
            برای لبخند شما
          </p>
        </div>
      </div>
    </footer>
  );
}