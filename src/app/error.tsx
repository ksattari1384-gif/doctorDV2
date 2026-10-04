"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app] error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full text-center">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-red-600 mb-5">
          <AlertTriangle className="h-10 w-10" />
        </div>

        <h1 className="text-2xl font-bold text-ink-800 mb-3">
          یه مشکل پیش اومد
        </h1>

        <p className="text-sm text-muted leading-relaxed mb-6">
          متأسفانه در پردازش درخواست شما خطایی رخ داد. لطفاً دوباره تلاش
          کنید.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-6 py-3 text-sm font-bold text-white hover:bg-brand-800 transition"
          >
            <RotateCcw className="h-4 w-4" />
            تلاش دوباره
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-6 py-3 text-sm font-medium hover:bg-background transition"
          >
            <Home className="h-4 w-4" />
            صفحه اصلی
          </Link>
        </div>
      </div>
    </div>
  );
}