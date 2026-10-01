import Link from "next/link";
import { CalendarCheck, ArrowLeft } from "lucide-react";

export function MenuCta() {
  return (
    <div className="fixed bottom-5 right-4 md:bottom-6 md:right-6 z-30 md:max-w-md">
      <Link
        href="/booking"
        className="group flex items-center gap-2 md:gap-3 rounded-2xl bg-gradient-to-l from-brand-700 to-brand-800 px-4 py-3 md:px-7 md:py-5 text-white shadow-2xl shadow-brand-700/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
      >
        <div className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
          <CalendarCheck className="h-4 w-4 md:h-5 md:w-5" />
        </div>
        <div className="text-right">
          <div className="text-xs md:text-base font-bold whitespace-nowrap">
            رزرو نوبت
          </div>
          <div className="hidden md:block text-[10px] md:text-xs text-white/70 whitespace-nowrap">
            همین حالا وقت خود را رزرو کنید
          </div>
        </div>
        <ArrowLeft className="hidden md:block h-5 w-5 transition-transform group-hover:-translate-x-1" />
      </Link>
    </div>
  );
}