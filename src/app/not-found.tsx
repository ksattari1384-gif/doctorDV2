import Link from "next/link";
import { Home, Search, ArrowLeft, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ink-900 via-brand-900 to-ink-900 p-4 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-brand-400/10 blur-3xl" />

      <div className="relative text-center max-w-lg">
        {/* Big 404 */}
        <div className="relative inline-block mb-6">
          <h1 className="text-[120px] md:text-[180px] font-bold leading-none bg-gradient-to-b from-gold-400 via-gold-500 to-gold-600 bg-clip-text text-transparent">
            404
          </h1>
          <div className="absolute inset-0 blur-3xl bg-gold-500/20 -z-10" />
        </div>

        {/* Icon */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-2 text-sm font-medium text-white/95 mb-4">
          <Sparkles className="h-4 w-4 text-gold-400" />
          <span>صفحه پیدا نشد</span>
        </div>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          این صفحه وجود نداره
        </h2>

        {/* Description */}
        <p className="text-sm md:text-base text-white/70 leading-relaxed mb-8 max-w-md mx-auto">
          متأسفانه صفحه‌ای که به دنبال آن بودید پیدا نشد. ممکنه آدرس اشتباه
          باشه یا صفحه حذف شده باشه.
        </p>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-gold-500 px-6 py-3 text-sm font-bold text-ink-900 hover:bg-gold-400 transition shadow-lg shadow-gold-500/20"
          >
            <Home className="h-4 w-4" />
            بازگشت به صفحه اصلی
          </Link>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 backdrop-blur-md px-6 py-3 text-sm font-medium text-white hover:bg-white/10 transition"
          >
            <Search className="h-4 w-4" />
            مشاهده خدمات
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}