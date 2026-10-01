import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  MessageCircle,
} from "lucide-react";

const QUICK_LINKS = [
  { label: "خانه", href: "/" },
  { label: "خدمات", href: "/services" },
  { label: "رزرو نوبت", href: "/booking" },
  { label: "درباره ما", href: "/about" },
  { label: "تماس با ما", href: "/contact" },
];

const SERVICES_LINKS = [
  { label: "ایمپلنت", href: "/services/implant" },
  { label: "لمینت", href: "/services/laminate" },
  { label: "ارتودنسی", href: "/services/orthodontics" },
  { label: "عصب‌کشی", href: "/services/root-canal" },
  { label: "جرم‌گیری", href: "/services/scaling" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface mt-20">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-700 text-white font-bold shadow-sm">
                ق
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-base font-bold text-ink-800">
                  دکتر قره‌داغی
                </span>
                <span className="text-xs text-muted">دندانپزشکی تخصصی</span>
              </div>
            </div>
            <p className="text-sm text-muted leading-relaxed">
              ارائه‌ی خدمات تخصصی دندانپزشکی با جدیدترین تکنولوژی‌ها و
              بالاترین استانداردهای بهداشتی، در محیطی آرام و حرفه‌ای.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="اینستاگرام"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-brand-50 hover:border-brand-200 transition"
              >
                <Instagram className="h-4 w-4 text-brand-700" />
              </a>
              <a
                href="https://wa.me/989120000000"
                target="_blank"
                rel="noreferrer"
                aria-label="واتساپ"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-brand-50 hover:border-brand-200 transition"
              >
                <MessageCircle className="h-4 w-4 text-brand-700" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-bold text-ink-800 mb-4">
              دسترسی سریع
            </h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted hover:text-brand-700 transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold text-ink-800 mb-4">
              خدمات پرطرفدار
            </h3>
            <ul className="space-y-2.5">
              {SERVICES_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted hover:text-brand-700 transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold text-ink-800 mb-4">
              اطلاعات تماس
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-brand-700" />
                <span>تهران، خیابان ولیعصر، پلاک ۱۲۳، طبقه ۲</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted">
                <Phone className="h-4 w-4 mt-0.5 shrink-0 text-brand-700" />
                <a
                  href="tel:+982100000000"
                  dir="ltr"
                  className="hover:text-brand-700 transition"
                >
                  ۰۲۱-۰۰۰۰۰۰۰۰
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted">
                <Mail className="h-4 w-4 mt-0.5 shrink-0 text-brand-700" />
                <a
                  href="mailto:info@example.com"
                  className="hover:text-brand-700 transition"
                >
                  info@example.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted">
                <Clock className="h-4 w-4 mt-0.5 shrink-0 text-brand-700" />
                <span>
                  شنبه تا چهارشنبه: ۹ تا ۱۹
                  <br />
                  پنجشنبه: ۹ تا ۱۴
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted">
            © {year} مطب دندانپزشکی دکتر قره‌داغی. تمامی حقوق محفوظ است.
          </p>
          <p className="text-xs text-muted">طراحی و توسعه با ❤️</p>
        </div>
      </div>
    </footer>
  );
}