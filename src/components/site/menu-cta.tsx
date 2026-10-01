import Link from "next/link";
import { CalendarCheck, ArrowLeft } from "lucide-react";

export function MenuCta() {
  return (
    <div className="fixed bottom-5 right-20 md:right-6 md:left-auto left-20 md:w-auto z-30 md:max-w-md">
      <Link
        href="/booking"
        className="group flex items-center justify-between gap-3 rounded-2xl bg-gradient-to-l from-brand-700 to-brand-800 px-5 py-4 md:px-7 md:py-5 text-white shadow-2xl shadow-brand-700/30 hover:shadow-brand-700/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
            <CalendarCheck className="h-5 w-5" />
          </div>
          <div className="text-right">
            <div className="text-sm md:text-base font-bold">
              رزرو نوبت آنلاین
            </div>
            <div className="text-[10px] md:text-xs text-white/70">
              همین حالا وقت خود را رزرو کنید
            </div>
          </div>
        </div>
        <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
      </Link>
    </div>
  );
}