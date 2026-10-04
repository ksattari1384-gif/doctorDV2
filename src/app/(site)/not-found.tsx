import Link from "next/link";
import { Home, Search, ArrowLeft, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-background p-4">
      <div className="text-center max-w-lg">
        <div className="relative inline-block mb-6">
          <h1 className="text-[100px] md:text-[140px] font-bold leading-none bg-gradient-to-b from-brand-600 via-brand-700 to-brand-900 bg-clip-text text-transparent">
            404
          </h1>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 border border-brand-200 px-4 py-2 text-sm font-medium text-brand-800 mb-4">
          <Sparkles className="h-4 w-4" />
          <span>صفحه پیدا نشد</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-ink-800 mb-4">
          این صفحه وجود نداره
        </h2>

        <p className="text-sm md:text-base text-muted leading-relaxed mb-8 max-w-md mx-auto">
          متأسفانه صفحه‌ای که به دنبال آن بودید پیدا نشد.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition"
            style={{ background: "var(--theme-primary)" }}
          >
            <Home className="h-4 w-4" />
            بازگشت به صفحه اصلی
          </Link>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-6 py-3 text-sm font-medium hover:bg-background transition"
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