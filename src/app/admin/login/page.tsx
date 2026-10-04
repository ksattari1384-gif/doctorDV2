"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  Sparkles,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError("لطفاً ایمیل و رمز عبور را وارد کنید.");
      return;
    }

    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email: email.trim(),
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("ایمیل یا رمز عبور اشتباه است.");
        setLoading(false);
        return;
      }

      // موفقیت
      router.push(callbackUrl);
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("خطایی رخ داد. لطفاً دوباره تلاش کنید.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ink-900 via-brand-900 to-ink-900 p-4 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-brand-400/10 blur-3xl" />

      {/* Back to site */}
      <a
        href="/"
        className="absolute top-4 right-4 md:top-6 md:right-6 inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 backdrop-blur-md px-4 py-2.5 text-sm font-medium text-white/90 hover:bg-white/10 transition"
      >
        <ArrowRight className="h-4 w-4" />
        بازگشت به سایت
      </a>

      {/* Card */}
      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-700 to-ink-900 border-2 border-gold-500/40 shadow-xl mb-4">
            <span className="text-2xl font-bold text-gold-400">ق</span>
          </div>
          <h1 className="text-2xl font-bold text-white">ورود به پنل مدیریت</h1>
          <p className="mt-2 text-sm text-white/60">
            مطب دندانپزشکی دکتر قره‌داغی
          </p>
        </div>

        {/* Form */}
        <div className="rounded-3xl bg-surface border border-white/10 shadow-2xl p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error */}
            {error && (
              <div className="flex items-start gap-2.5 rounded-xl bg-red-50 border border-red-200 p-3.5">
                <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm text-red-700 leading-relaxed">
                  {error}
                </p>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-ink-800 mb-1.5">
                ایمیل
              </label>
              <div className="relative">
                <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@doctor.ir"
                  dir="ltr"
                  autoComplete="email"
                  className="w-full rounded-xl border border-border bg-background pr-11 pl-4 py-3 text-sm text-left placeholder:text-muted focus:outline-none focus:ring-2 transition"
                  style={
                    { "--tw-ring-color": "var(--theme-primary)" } as any
                  }
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-ink-800 mb-1.5">
                رمز عبور
              </label>
              <div className="relative">
                <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  dir="ltr"
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-border bg-background pr-11 pl-11 py-3 text-sm text-left placeholder:text-muted focus:outline-none focus:ring-2 transition"
                  style={
  { "--tw-ring-color": "var(--theme-primary, #0f766e)" } as any
}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-lg hover:bg-background transition"
                  aria-label={showPassword ? "پنهان" : "نمایش"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-md hover:opacity-95 transition disabled:opacity-70"
              style={{ background: "var(--theme-primary, #0f766e)" }}
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  در حال ورود...
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  ورود به پنل
                </>
              )}
            </button>
          </form>

          {/* Helper */}
          <div className="mt-6 pt-5 border-t border-border">
            <div className="flex items-start gap-2 text-xs text-muted leading-relaxed">
              <Sparkles className="h-3.5 w-3.5 shrink-0 mt-0.5 text-gold-500" />
              <span>
                برای تست: <code className="bg-background px-1.5 py-0.5 rounded text-[11px] font-mono">admin@doctor.ir</code> / رمز <code className="bg-background px-1.5 py-0.5 rounded text-[11px] font-mono">Admin@1403</code>
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} مطب دندانپزشکی دکتر قره‌داغی
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ink-900" />}>
      <LoginForm />
    </Suspense>
  );
}