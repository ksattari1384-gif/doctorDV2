"use client";

import Link from "next/link";
import { Info, ArrowLeft, Clock, MapPin } from "lucide-react";
import { useAdminStore } from "@/lib/stores/admin-store";

export function AboutCard() {
  const content = useAdminStore((s) => s.content);

  return (
    <div className="rounded-3xl bg-gradient-to-br from-[#FCEBC9] via-[#FDF3DC] to-[#FCEBC9] p-5 md:p-6 shadow-soft">
      <div className="flex items-start gap-4">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-white shadow-sm"
          style={{ background: "var(--theme-primary)" }}
        >
          <Info className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-base md:text-lg font-bold text-ink-800">
            درباره مطب {content.brandName}
          </h2>
          <p className="mt-1 text-xs md:text-sm text-muted leading-relaxed">
            ارائه‌ی خدمات تخصصی دندانپزشکی زیبایی، ترمیمی و ایمپلنت با
            جدیدترین تکنولوژی‌ها
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
            <span
              className="inline-flex items-center gap-1.5"
              style={{ color: "var(--theme-primary)" }}
            >
              <Clock className="h-3.5 w-3.5" />
              {content.workingHoursShort}
            </span>
            <span
              className="inline-flex items-center gap-1.5"
              style={{ color: "var(--theme-primary)" }}
            >
              <MapPin className="h-3.5 w-3.5" />
              {content.address.split("،")[0]}، {content.address.split("،")[1]}
            </span>
          </div>

          <Link
            href="/about"
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold transition"
            style={{ color: "var(--theme-primary)" }}
          >
            اطلاعات بیشتر
            <ArrowLeft className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}