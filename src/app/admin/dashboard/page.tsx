import Link from "next/link";
import {
  CalendarCheck,
  Clock,
  Users,
  Wallet,
  TrendingUp,
  TrendingDown,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Sparkles,
} from "lucide-react";

const STATS = [
  {
    label: "نوبت‌های امروز",
    value: "۱۲",
    change: "+۳ از دیروز",
    trend: "up",
    icon: CalendarCheck,
    color: "from-brand-500 to-brand-700",
  },
  {
    label: "در انتظار تأیید",
    value: "۵",
    change: "نیاز به بررسی",
    trend: "warn",
    icon: Clock,
    color: "from-gold-500 to-gold-600",
  },
  {
    label: "بیماران کل",
    value: "۴,۸۲۳",
    change: "+۲۸ این ماه",
    trend: "up",
    icon: Users,
    color: "from-emerald-500 to-emerald-700",
  },
  {
    label: "درآمد این ماه",
    value: "۸۲,۵۰۰,۰۰۰",
    change: "+۱۲٪ از ماه قبل",
    trend: "up",
    icon: Wallet,
    color: "from-purple-500 to-purple-700",
    unit: "تومان",
  },
];

const RECENT_APPOINTMENTS = [
  {
    id: "QD-241007-0042",
    patient: "سارا محمدی",
    service: "لمینت سرامیکی",
    time: "۱۰:۳۰",
    date: "امروز",
    status: "confirmed",
  },
  {
    id: "QD-241007-0041",
    patient: "علی رضایی",
    service: "ایمپلنت دندان",
    time: "۱۱:۰۰",
    date: "امروز",
    status: "pending",
  },
  {
    id: "QD-241007-0040",
    patient: "مریم کریمی",
    service: "ارتودنسی",
    time: "۱۴:۳۰",
    date: "امروز",
    status: "confirmed",
  },
  {
    id: "QD-241007-0039",
    patient: "رضا احمدی",
    service: "جرم‌گیری",
    time: "۱۶:۰۰",
    date: "امروز",
    status: "cancelled",
  },
  {
    id: "QD-241007-0038",
    patient: "نگار حسینی",
    service: "عصب‌کشی",
    time: "۱۷:۳۰",
    date: "امروز",
    status: "confirmed",
  },
];

const STATUS_MAP = {
  confirmed: {
    label: "تأیید شده",
    icon: CheckCircle2,
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  pending: {
    label: "در انتظار",
    icon: AlertCircle,
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  cancelled: {
    label: "لغو شده",
    icon: XCircle,
    className: "bg-red-50 text-red-700 border-red-200",
  },
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* ─── Page header ─────────────────────── */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-ink-800">
          داشبورد
        </h1>
        <p className="mt-1 text-sm text-muted">
          خلاصه‌ی وضعیت مطب در یک نگاه
        </p>
      </div>

      {/* ─── Stats grid ──────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon =
            stat.trend === "up"
              ? TrendingUp
              : stat.trend === "warn"
              ? AlertCircle
              : TrendingDown;

          return (
            <div
              key={stat.label}
              className="relative overflow-hidden rounded-2xl border border-border bg-surface p-5 shadow-soft"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs font-medium text-muted">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-2xl md:text-3xl font-bold text-ink-800">
                    {stat.value}
                    {stat.unit && (
                      <span className="text-xs font-normal text-muted mr-1">
                        {stat.unit}
                      </span>
                    )}
                  </p>
                  <div
                    className={`mt-2 inline-flex items-center gap-1 text-[11px] font-medium ${
                      stat.trend === "up"
                        ? "text-emerald-600"
                        : stat.trend === "warn"
                        ? "text-amber-600"
                        : "text-red-600"
                    }`}
                  >
                    <TrendIcon className="h-3 w-3" />
                    <span>{stat.change}</span>
                  </div>
                </div>

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-md`}
                >
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── Two-column area ─────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent appointments */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-surface shadow-soft">
          <div className="flex items-center justify-between border-b border-border p-5">
            <div>
              <h2 className="text-base font-bold text-ink-800">
                نوبت‌های امروز
              </h2>
              <p className="text-xs text-muted mt-0.5">
                لیست نوبت‌های در انتظار و تأیید شده
              </p>
            </div>
            <Link
              href="/admin/appointments"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium hover:bg-brand-50 hover:border-brand-200 transition"
            >
              مشاهده همه
              <ArrowLeft className="h-3 w-3" />
            </Link>
          </div>

          <div className="divide-y divide-border">
            {RECENT_APPOINTMENTS.map((apt) => {
              const status = STATUS_MAP[apt.status as keyof typeof STATUS_MAP];
              const StatusIcon = status.icon;

              return (
                <div
                  key={apt.id}
                  className="flex items-center gap-4 p-4 hover:bg-background/50 transition"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 font-bold text-sm">
                    {apt.patient.charAt(0)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-ink-800">
                        {apt.patient}
                      </span>
                      <span className="hidden sm:inline text-[10px] text-muted font-mono">
                        {apt.id}
                      </span>
                    </div>
                    <p className="text-xs text-muted mt-0.5 truncate">
                      {apt.service}
                    </p>
                  </div>

                  <div className="hidden md:block text-center">
                    <div className="text-sm font-bold text-ink-800">
                      {apt.time}
                    </div>
                    <div className="text-[10px] text-muted">{apt.date}</div>
                  </div>

                  <div
                    className={`hidden sm:inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-medium ${status.className}`}
                  >
                    <StatusIcon className="h-3 w-3" />
                    {status.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick actions */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-surface shadow-soft p-5">
            <h2 className="text-base font-bold text-ink-800 mb-4">
              دسترسی سریع
            </h2>

            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/admin/appointments"
                className="flex flex-col items-center gap-2 rounded-xl border border-border bg-background p-4 hover:border-brand-300 hover:bg-brand-50 transition text-center"
              >
                <CalendarCheck className="h-5 w-5 text-brand-700" />
                <span className="text-xs font-medium">نوبت‌ها</span>
              </Link>

              <Link
                href="/admin/services"
                className="flex flex-col items-center gap-2 rounded-xl border border-border bg-background p-4 hover:border-brand-300 hover:bg-brand-50 transition text-center"
              >
                <Sparkles className="h-5 w-5 text-brand-700" />
                <span className="text-xs font-medium">خدمات</span>
              </Link>

              <Link
                href="/admin/patients"
                className="flex flex-col items-center gap-2 rounded-xl border border-border bg-background p-4 hover:border-brand-300 hover:bg-brand-50 transition text-center"
              >
                <Users className="h-5 w-5 text-brand-700" />
                <span className="text-xs font-medium">بیماران</span>
              </Link>

              <Link
                href="/admin/theme"
                className="flex flex-col items-center gap-2 rounded-xl border border-border bg-background p-4 hover:border-brand-300 hover:bg-brand-50 transition text-center"
              >
                <Sparkles className="h-5 w-5 text-brand-700" />
                <span className="text-xs font-medium">تم</span>
              </Link>
            </div>
          </div>

          {/* Summary card */}
          <div className="rounded-2xl bg-gradient-to-br from-ink-900 via-brand-900 to-ink-900 p-5 text-white shadow-elevated relative overflow-hidden">
            <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gold-500/20 blur-2xl" />

            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-gold-400" />
                <span className="text-xs font-medium text-gold-300">
                  خلاصه‌ی امروز
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/70">درآمد امروز</span>
                  <span className="font-bold">۱۲,۵۰۰,۰۰۰</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/70">بیمار جدید</span>
                  <span className="font-bold">۳ نفر</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/70">نوبت‌های آزاد</span>
                  <span className="font-bold">۷</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/60">نرخ تکمیل نوبت</span>
                  <span className="font-bold text-emerald-400">۹۲٪</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-l from-emerald-400 to-emerald-600"
                    style={{ width: "92%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}