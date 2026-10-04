"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  CalendarCheck,
  Clock,
  Users,
  Wallet,
  ArrowLeft,
  Sparkles,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import { PageHeader } from "@/components/admin/page-header";
import { StatCard } from "@/components/admin/stat-card";
import { StatusBadge } from "@/components/admin/status-badge";
import { EmptyState } from "@/components/admin/empty-state";
import { useAdminStore } from "@/lib/stores/admin-store";

const formatPrice = (price: number) => price.toLocaleString("fa-IR");

const parsePrice = (priceStr: string): number => {
  const cleaned = priceStr
    .replace(/[,٬،\s]/g, "")
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
  return parseInt(cleaned) || 0;
};

export default function DashboardPage() {
  // ═══ Store (فقط داده خام) ═══
  const appointments = useAdminStore((s) => s.appointments);
  const services = useAdminStore((s) => s.services);
  const patients = useAdminStore((s) => s.patients);

  // ═══ Derived stats (لوکال، نه از store) ═══
  const stats = useMemo(() => {
    const today = appointments.filter((a) => a.date === "امروز");
    const pending = appointments.filter(
      (a) => a.status === "pending" || a.status === "contact_required"
    );
    const confirmed = appointments.filter((a) => a.status === "confirmed");
    const completed = appointments.filter((a) => a.status === "completed");

    let totalRevenue = 0;
    for (const apt of completed) {
      totalRevenue += parsePrice(apt.price);
    }

    return {
      todayAppointments: today.length,
      pending: pending.length,
      confirmed: confirmed.length,
      completed: completed.length,
      totalPatients: patients.length,
      totalRevenue,
      activeServices: services.filter((s) => s.isActive).length,
    };
  }, [appointments, patients, services]);

  // ═══ Today's appointments (لیست پایین) ═══
  const todayAppointments = useMemo(
    () => appointments.filter((a) => a.date === "امروز").slice(0, 5),
    [appointments]
  );

  // ═══ Free slots (mock) ═══
  const freeSlots = 7;

  // ═══ Completion rate ═══
  const completionRate = useMemo(() => {
    const total = appointments.length;
    if (total === 0) return 0;
    return Math.round((stats.completed / total) * 100);
  }, [appointments.length, stats.completed]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="داشبورد"
        description="خلاصه‌ی وضعیت مطب در یک نگاه"
        badge={
          stats.pending > 0 ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-xs font-medium text-amber-700">
              <AlertCircle className="h-3 w-3" />
              {stats.pending} نوبت در انتظار
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-medium text-emerald-700">
              <Sparkles className="h-3 w-3" />
              همه‌چیز مرتب است
            </span>
          )
        }
      />

      {/* ═══ Stats grid ═══ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="نوبت‌های امروز"
          value={stats.todayAppointments}
          change="نوبت ثبت‌شده"
          trend="neutral"
          icon={CalendarCheck}
          gradient="from-brand-500 to-brand-700"
        />
        <StatCard
          label="در انتظار تأیید"
          value={stats.pending}
          change={stats.pending > 0 ? "نیاز به بررسی" : "همه تأیید شدن"}
          trend={stats.pending > 0 ? "warn" : "up"}
          icon={Clock}
          gradient="from-gold-500 to-gold-600"
        />
        <StatCard
          label="بیماران کل"
          value={stats.totalPatients}
          change={`${patients.length} بیمار ثبت‌شده`}
          trend="up"
          icon={Users}
          gradient="from-emerald-500 to-emerald-700"
        />
        <StatCard
          label="درآمد (انجام‌شده)"
          value={formatPrice(stats.totalRevenue)}
          unit="تومان"
          change={`${stats.completed} نوبت تکمیل‌شده`}
          trend="up"
          icon={Wallet}
          gradient="from-purple-500 to-purple-700"
        />
      </div>

      {/* ═══ Two-column ═══ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-surface shadow-soft">
          <div className="flex items-center justify-between border-b border-border p-5">
            <div>
              <h2 className="text-base font-bold text-ink-800">
                نوبت‌های امروز
              </h2>
              <p className="text-xs text-muted mt-0.5">
                {todayAppointments.length > 0
                  ? `${todayAppointments.length} نوبت برای امروز ثبت شده`
                  : "نوبتی برای امروز ثبت نشده"}
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

          {todayAppointments.length > 0 ? (
            <div className="divide-y divide-border">
              {todayAppointments.map((apt) => (
                <Link
                  key={apt.id}
                  href="/admin/appointments"
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

                  <div className="hidden sm:block">
                    <StatusBadge variant={apt.status} />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <EmptyState
              compact
              title="نوبتی برای امروز نیست"
              description="امروز هیچ نوبتی ثبت نشده است."
            />
          )}
        </div>

        {/* Side */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-surface shadow-soft p-5">
            <h2 className="text-base font-bold text-ink-800 mb-4">
              دسترسی سریع
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {[
                {
                  label: "نوبت‌ها",
                  icon: CalendarCheck,
                  href: "/admin/appointments",
                  badge: stats.pending > 0 ? stats.pending : null,
                },
                {
                  label: "خدمات",
                  icon: Sparkles,
                  href: "/admin/services",
                  badge: null,
                },
                {
                  label: "بیماران",
                  icon: Users,
                  href: "/admin/patients",
                  badge: null,
                },
                {
                  label: "تم",
                  icon: Sparkles,
                  href: "/admin/theme",
                  badge: null,
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="relative flex flex-col items-center gap-2 rounded-xl border border-border bg-background p-4 hover:border-brand-300 hover:bg-brand-50 transition text-center"
                  >
                    {item.badge !== null && (
                      <span className="absolute top-2 left-2 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white">
                        {item.badge}
                      </span>
                    )}
                    <Icon className="h-5 w-5 text-brand-700" />
                    <span className="text-xs font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Summary */}
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
                  <span className="text-white/70">نوبت‌های امروز</span>
                  <span className="font-bold">
                    {stats.todayAppointments} نوبت
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/70">در انتظار تأیید</span>
                  <span className="font-bold">{stats.pending} نوبت</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/70">نوبت‌های آزاد</span>
                  <span className="font-bold">{freeSlots}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-white/60">نرخ تکمیل نوبت</span>
                  <span
                    className={`font-bold ${
                      completionRate >= 70
                        ? "text-emerald-400"
                        : completionRate >= 40
                        ? "text-amber-400"
                        : "text-red-400"
                    }`}
                  >
                    {completionRate}٪
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      completionRate >= 70
                        ? "bg-gradient-to-l from-emerald-400 to-emerald-600"
                        : completionRate >= 40
                        ? "bg-gradient-to-l from-amber-400 to-amber-600"
                        : "bg-gradient-to-l from-red-400 to-red-600"
                    }`}
                    style={{ width: `${completionRate}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Activity */}
          <div className="rounded-2xl border border-border bg-surface shadow-soft p-5">
            <h3 className="text-sm font-bold text-ink-800 mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-brand-700" />
              فعالیت اخیر
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-xs">
                <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                <div className="flex-1 min-w-0">
                  <div className="text-ink-800">
                    {stats.confirmed} نوبت تأیید شده
                  </div>
                  <div className="text-[10px] text-muted mt-0.5">
                    در حال حاضر
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2 text-xs">
                <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                <div className="flex-1 min-w-0">
                  <div className="text-ink-800">
                    {stats.pending} نوبت در انتظار تأیید
                  </div>
                  <div className="text-[10px] text-muted mt-0.5">
                    نیاز به بررسی
                  </div>
                </div>
              </div>
              <div className="flex flex-start gap-2 text-xs">
                <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                <div className="flex-1 min-w-0">
                  <div className="text-ink-800">
                    {stats.activeServices} خدمت فعال
                  </div>
                  <div className="text-[10px] text-muted mt-0.5">
                    در سایت نمایش داده می‌شود
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}