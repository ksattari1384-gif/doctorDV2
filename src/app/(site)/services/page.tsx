import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Search,
  Plus,
} from "lucide-react";
import { SERVICES } from "@/lib/data/services";

export default function ServicesPage() {
  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-ink-900 via-brand-900 to-ink-900 pt-8 pb-16 md:pb-20 rounded-b-[32px] md:rounded-b-[48px]">
        <div className="container mx-auto px-4 md:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition mb-5"
          >
            <ArrowRight className="h-4 w-4" />
            بازگشت
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-2 text-sm font-medium text-white/95 mb-5">
            <Sparkles className="h-4 w-4 text-gold-400" />
            <span>خدمات ما</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            همه‌ی{" "}
            <span className="bg-gradient-to-l from-gold-400 via-gold-500 to-gold-600 bg-clip-text text-transparent">
              خدمات
            </span>{" "}
            مطب
          </h1>

          <p className="mt-4 max-w-2xl text-base md:text-lg text-white/80 leading-relaxed">
            مجموعه‌ی کامل خدمات تخصصی دندانپزشکی، از زیبایی تا درمانی
          </p>
        </div>
      </div>

      {/* Services list */}
      <div className="container mx-auto px-4 md:px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.id}`}
              className="group rounded-3xl bg-gradient-to-br from-[#FCEBC9] via-[#FDF3DC] to-[#FCEBC9] p-5 hover:shadow-elevated transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/80 text-4xl">
                  {service.emoji}
                </div>
                {service.tag && (
                  <span className="rounded-full bg-gold-500 px-2.5 py-1 text-[10px] font-bold text-ink-900">
                    {service.tag}
                  </span>
                )}
              </div>

              <h3 className="text-base md:text-lg font-bold text-ink-800">
                {service.name}
              </h3>
              <p className="mt-1.5 text-xs md:text-sm text-ink-800/60 leading-relaxed line-clamp-2">
                {service.description}
              </p>

              <div className="mt-5 pt-4 border-t border-ink-900/10 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-ink-800">
                    {service.price}
                    {service.price !== "مشاوره رایگان" && (
                      <span className="text-[10px] font-normal text-ink-800/50 mr-1">
                        تومان
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-ink-800/50 mt-0.5">
                    {service.duration}
                  </div>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink-900 text-white group-hover:bg-gold-500 group-hover:text-ink-900 transition-colors shadow-md">
                  <Plus className="h-5 w-5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty message if no services */}
        {SERVICES.length === 0 && (
          <div className="rounded-3xl bg-surface border border-border p-12 text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-700 mb-4">
              <Search className="h-8 w-8" />
            </div>
            <h3 className="text-base font-bold text-ink-800 mb-1">
              هنوز خدمتی اضافه نشده
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}