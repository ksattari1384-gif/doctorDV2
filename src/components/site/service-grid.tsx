import Link from "next/link";
import { Plus, Search } from "lucide-react";
import type { Service } from "@/lib/stores/admin-store";

type ServiceGridProps = {
  services: Service[];
};

export function ServiceGrid({ services }: ServiceGridProps) {
  if (services.length === 0) {
    return (
      <div className="mt-6 rounded-3xl bg-surface border border-border p-12 text-center">
        <div
          className="inline-flex h-16 w-16 items-center justify-center rounded-full mb-4"
          style={{
            background: "var(--theme-primary-soft)",
            color: "var(--theme-primary)",
          }}
        >
          <Search className="h-8 w-8" />
        </div>
        <h3 className="text-base font-bold text-ink-800 mb-1">
          نتیجه‌ای یافت نشد
        </h3>
        <p className="text-sm text-muted">
          با تغییر جستجو یا دسته‌بندی، دوباره امتحان کنید
        </p>
      </div>
    );
  }

  return (
    <div className="mt-5 space-y-3">
      {services.map((service) => (
        <Link
          key={service.id}
          href={`/services/${service.slug}`}
          className="group flex items-stretch gap-3 rounded-3xl bg-gradient-to-l from-[#FCEBC9] via-[#FDF3DC] to-[#FCEBC9] p-3 hover:shadow-elevated transition-all"
        >
          {/* Image / emoji */}
          <div className="relative flex h-[88px] w-[88px] md:h-[110px] md:w-[110px] shrink-0 items-center justify-center rounded-2xl bg-white/70 overflow-hidden">
            <div className="text-4xl md:text-5xl">{service.emoji}</div>
            {service.isFeatured && (
              <div
                className="absolute top-1.5 right-1.5 rounded-full px-2 py-0.5 text-[9px] font-bold"
                style={{
                  background: "var(--theme-accent)",
                  color: "#0b1f1d",
                }}
              >
                منتخب
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col justify-between min-w-0 py-0.5">
            <div>
              <h3 className="text-sm md:text-base font-bold text-ink-800 leading-snug">
                {service.name}
              </h3>
              <p className="mt-1 text-[11px] md:text-xs text-ink-800/60 leading-relaxed line-clamp-2">
                {service.shortDescription}
              </p>
            </div>

            <div className="flex items-end justify-between">
              <div className="text-sm md:text-base font-bold text-ink-800">
                {service.price
                  ? service.price.toLocaleString("fa-IR")
                  : "مشاوره رایگان"}
                {service.price && (
                  <span className="text-[10px] font-normal text-ink-800/50 mr-1">
                    تومان
                  </span>
                )}
              </div>

              {/* Plus button */}
              <div
                className="flex h-9 w-9 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-full text-white shadow-md transition-all group-hover:scale-110"
                style={{ background: "var(--theme-primary)" }}
              >
                <Plus className="h-4 w-4 md:h-5 md:w-5" />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}