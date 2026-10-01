import Link from "next/link";
import { Info, ArrowLeft, Clock, MapPin } from "lucide-react";

export function AboutCard() {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-brand-100 via-brand-50 to-gold-50/40 border border-brand-200/50 p-5 md:p-6 shadow-soft backdrop-blur-sm">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-700 text-white shadow-sm">
          <Info className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-base md:text-lg font-bold text-ink-800">
            درباره مطب دکتر قره‌داغی
          </h2>
          <p className="mt-1 text-xs md:text-sm text-muted leading-relaxed">
            ارائه‌ی خدمات تخصصی دندانپزشکی زیبایی، ترمیمی و ایمپلنت با
            جدیدترین تکنولوژی‌ها
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-brand-800">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              شنبه تا چهارشنبه ۹ تا ۱۹
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              تهران، ولیعصر
            </span>
          </div>

          <Link
            href="/about"
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 hover:text-brand-800 transition"
          >
            اطلاعات بیشتر
            <ArrowLeft className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}