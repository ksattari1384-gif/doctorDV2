"use client";

import Link from "next/link";
import { ShieldAlert, ArrowRight, Home } from "lucide-react";

type AccessDeniedProps = {
  title?: string;
  description?: string;
};

export function AccessDenied({
  title = "دسترسی محدود",
  description = "شما به این بخش دسترسی ندارید. برای اطلاعات بیشتر با مدیر سیستم تماس بگیرید.",
}: AccessDeniedProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-red-600 mb-5">
          <ShieldAlert className="h-10 w-10" />
        </div>

        <h1 className="text-2xl font-bold text-ink-800 mb-3">{title}</h1>

        <p className="text-sm text-muted leading-relaxed mb-6">
          {description}
        </p>

        <Link
          href="/admin/dashboard"
          className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-6 py-3 text-sm font-bold text-white hover:bg-brand-800 transition"
        >
          <Home className="h-4 w-4" />
          بازگشت به داشبورد
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}