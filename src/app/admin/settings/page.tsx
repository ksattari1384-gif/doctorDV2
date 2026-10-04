"use client";

import { useEffect, useState } from "react";
import {
  Save,
  User,
  Lock,
  Bell,
  Globe,
  Shield,
  CreditCard,
  MessageSquare,
  Bot,
  Database,
  AlertTriangle,
  Check,
  Eye,
  EyeOff,
  Key,
  Smartphone,
  Mail,
  Copy,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/admin/page-header";
import { useToast } from "@/components/admin/toast";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";

type Tab =
  | "profile"
  | "security"
  | "notifications"
  | "payments"
  | "integrations"
  | "danger";

export default function SettingsPage() {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [deleteAccountOpen, setDeleteAccountOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Notifications state
  const [notifications, setNotifications] = useState(() => {
    if (typeof window === "undefined") {
      return {
        newAppointment: true,
        cancelAppointment: true,
        dailyReport: true,
        weeklyReport: false,
        appointmentReminder: true,
        lowBalance: false,
        systemUpdates: true,
      };
    }
    try {
      const saved = localStorage.getItem("admin-notifications");
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      newAppointment: true,
      cancelAppointment: true,
      dailyReport: true,
      weeklyReport: false,
      appointmentReminder: true,
      lowBalance: false,
      systemUpdates: true,
    };
  });

  // ذخیره توی localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        "admin-notifications",
        JSON.stringify(notifications)
      );
    } catch {}
  }, [notifications]);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success("ذخیره شد", "تنظیمات با موفقیت ذخیره شد.");
    setSaving(false);
  };

  const handleDeleteAccount = async () => {
    setDeleteLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.error("غیرفعال", "این عمل توسط مدیر سیستم قابل انجام است.");
    setDeleteLoading(false);
    setDeleteAccountOpen(false);
  };

  const TABS = [
    { id: "profile" as Tab, label: "پروفایل", icon: User },
    { id: "security" as Tab, label: "امنیت", icon: Shield },
    { id: "notifications" as Tab, label: "اعلان‌ها", icon: Bell },
    { id: "payments" as Tab, label: "پرداخت", icon: CreditCard },
    { id: "integrations" as Tab, label: "یکپارچه‌سازی", icon: Globe },
    { id: "danger" as Tab, label: "خطرناک", icon: AlertTriangle },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="تنظیمات"
        description="مدیریت حساب کاربری، امنیت و یکپارچه‌سازی‌ها"
        actions={
          activeTab !== "danger" && (
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-800 transition shadow-sm disabled:opacity-70"
            >
              {saving ? (
                <>
                  <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  در حال ذخیره...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  ذخیره تغییرات
                </>
              )}
            </button>
          )
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* ─── Tabs sidebar ────────────────────── */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-border bg-surface p-2 shadow-soft lg:sticky lg:top-24">
            <nav className="space-y-0.5">
              {TABS.map((t) => {
                const Icon = t.icon;
                const isActive = activeTab === t.id;
                const isDanger = t.id === "danger";
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={cn(
                      "w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all text-right",
                      isActive
                        ? isDanger
                          ? "bg-red-500 text-white shadow-sm"
                          : "bg-brand-700 text-white shadow-sm"
                        : isDanger
                        ? "text-red-600 hover:bg-red-50"
                        : "text-muted hover:bg-brand-50 hover:text-brand-800"
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* ─── Tab content ─────────────────────── */}
        <div className="lg:col-span-3 space-y-5">
          {/* ═══════════════════════════════════════
              Profile
              ═══════════════════════════════════════ */}
          {activeTab === "profile" && (
            <>
              {/* Avatar */}
              <div className="rounded-2xl border border-border bg-surface p-5">
                <h2 className="text-base font-bold text-ink-800 mb-4">
                  تصویر پروفایل
                </h2>
                <div className="flex flex-wrap items-center gap-5">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-brand-800 text-white font-bold text-2xl shadow-md">
                    ق
                  </div>
                  <div className="flex-1 min-w-[180px] space-y-2">
                    <label className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium hover:bg-brand-50 hover:border-brand-300 transition cursor-pointer">
                      تغییر تصویر
                      <input
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={() =>
                          toast.success("آپلود شد", "تصویر پروفایل تغییر کرد.")
                        }
                      />
                    </label>
                    <div className="text-[11px] text-muted">
                      JPG یا PNG، حداکثر ۲ مگابایت
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal info */}
              <div className="rounded-2xl border border-border bg-surface p-5 space-y-4">
                <h2 className="text-base font-bold text-ink-800">
                  اطلاعات شخصی
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-ink-800 mb-1.5">
                      نام
                    </label>
                    <input
                      type="text"
                      defaultValue="دکتر"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink-800 mb-1.5">
                      نام خانوادگی
                    </label>
                    <input
                      type="text"
                      defaultValue="قره‌داغی"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-ink-800 mb-1.5 flex items-center gap-2">
                      <Smartphone className="h-4 w-4 text-brand-700" />
                      شماره موبایل
                    </label>
                    <input
                      type="tel"
                      defaultValue="۰۹۱۲۳۴۵۶۷۸۹"
                      dir="ltr"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-left focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink-800 mb-1.5 flex items-center gap-2">
                      <Mail className="h-4 w-4 text-brand-700" />
                      ایمیل
                    </label>
                    <input
                      type="email"
                      defaultValue="doctor@example.com"
                      dir="ltr"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-left focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-ink-800 mb-1.5">
                    بیوگرافی
                  </label>
                  <textarea
                    rows={3}
                    defaultValue="متخصص دندانپزشکی زیبایی و ترمیمی با بیش از ۱۵ سال تجربه"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition resize-none"
                  />
                </div>
              </div>
            </>
          )}

          {/* ═══════════════════════════════════════
              Security
              ═══════════════════════════════════════ */}
          {activeTab === "security" && (
            <>
              {/* Change password */}
              <div className="rounded-2xl border border-border bg-surface p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-brand-700" />
                  <h2 className="text-base font-bold text-ink-800">
                    تغییر رمز عبور
                  </h2>
                </div>

                <div>
                  <label className="block text-sm font-medium text-ink-800 mb-1.5">
                    رمز عبور فعلی
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 pl-12 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition"
                      dir="ltr"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-lg hover:bg-background transition"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-ink-800 mb-1.5">
                      رمز عبور جدید
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition"
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink-800 mb-1.5">
                      تکرار رمز عبور
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="rounded-xl bg-brand-50 border border-brand-100 p-3 text-xs text-brand-800 leading-relaxed">
                  رمز عبور باید حداقل ۸ کاراکتر باشد و شامل حروف و اعداد باشد.
                </div>
              </div>

              {/* 2FA */}
              <div className="rounded-2xl border border-border bg-surface p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                      <Shield className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-ink-800">
                        احراز هویت دو مرحله‌ای
                      </h3>
                      <p className="text-xs text-muted mt-1 max-w-lg leading-relaxed">
                        با فعال‌سازی این قابلیت، علاوه بر رمز عبور، یک کد
                        یکبارمصرف از طریق پیامک دریافت می‌کنید.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShow2FAModal(true)}
                    className="shrink-0 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-600 transition"
                  >
                    فعال‌سازی
                  </button>
                </div>
              </div>

              {/* Sessions */}
              <div className="rounded-2xl border border-border bg-surface p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-brand-700" />
                  <h2 className="text-base font-bold text-ink-800">
                    دستگاه‌های فعال
                  </h2>
                </div>

                {[
                  {
                    device: "Chrome — Windows 11",
                    location: "تهران، ایران",
                    time: "الان — دستگاه فعلی",
                    current: true,
                  },
                  {
                    device: "Safari — iPhone 15",
                    location: "تهران، ایران",
                    time: "۲ ساعت پیش",
                    current: false,
                  },
                ].map((s, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4",
                      s.current
                        ? "border-emerald-200 bg-emerald-50"
                        : "border-border bg-background"
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                          s.current
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-brand-50 text-brand-700"
                        )}
                      >
                        <Smartphone className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-bold text-ink-800 truncate">
                          {s.device}
                          {s.current && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 text-white px-2 py-0.5 text-[9px] font-medium mr-2">
                              <Check className="h-2.5 w-2.5" />
                              فعلی
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-muted mt-0.5">
                          {s.location} — {s.time}
                        </div>
                      </div>
                    </div>
                    {!s.current && (
                      <button
                        onClick={() =>
                          toast.info("خروج", "این دستگاه خارج شد.")
                        }
                        className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-100 transition"
                      >
                        خروج
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ═══════════════════════════════════════
              Notifications
              ═══════════════════════════════════════ */}
          {activeTab === "notifications" && (
            <div className="rounded-2xl border border-border bg-surface p-5 space-y-5">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-brand-700" />
                <h2 className="text-base font-bold text-ink-800">
                  تنظیمات اعلان‌ها
                </h2>
              </div>

              <p className="text-xs text-muted leading-relaxed">
                مشخص کنید کدام اعلان‌ها را دریافت کنید. این اعلان‌ها از طریق
                ایمیل، پیامک یا اپلیکیشن ارسال می‌شوند.
              </p>

              <div className="space-y-3">
                {[
                  {
                    key: "newAppointment" as const,
                    label: "نوبت جدید",
                    desc: "وقتی بیمار درخواست نوبت جدید ثبت می‌کند",
                  },
                  {
                    key: "cancelAppointment" as const,
                    label: "لغو نوبت",
                    desc: "وقتی بیماری نوبتش را لغو می‌کند",
                  },
                  {
                    key: "appointmentReminder" as const,
                    label: "یادآوری نوبت",
                    desc: "۲۴ ساعت قبل از نوبت، یادآوری برای بیمار",
                  },
                  {
                    key: "dailyReport" as const,
                    label: "گزارش روزانه",
                    desc: "خلاصه‌ی فعالیت‌های روز در پایان روز",
                  },
                  {
                    key: "weeklyReport" as const,
                    label: "گزارش هفتگی",
                    desc: "گزارش کامل هفته در پایان هفته",
                  },
                  {
                    key: "lowBalance" as const,
                    label: "اعتبار کم",
                    desc: "وقتی اعتبار پیامک یا سرویس‌ها رو به اتمام است",
                  },
                  {
                    key: "systemUpdates" as const,
                    label: "به‌روزرسانی سیستم",
                    desc: "اطلاع از قابلیت‌های جدید و به‌روزرسانی‌ها",
                  },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background p-4"
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-ink-800">
                        {item.label}
                      </div>
                      <div className="text-xs text-muted mt-0.5 leading-relaxed">
                        {item.desc}
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        setNotifications((prev) => ({
                          ...prev,
                          [item.key]: !prev[item.key],
                        }))
                      }
                      className={cn(
                        "relative h-6 w-11 rounded-full transition shrink-0",
                        notifications[item.key]
                          ? "bg-emerald-500"
                          : "bg-border"
                      )}
                    >
                      <span
                        className={cn(
                          "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all",
                          notifications[item.key]
                            ? "right-0.5"
                            : "right-[22px]"
                        )}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════
              Payments
              ═══════════════════════════════════════ */}
          {activeTab === "payments" && (
            <>
              <div className="rounded-2xl border border-border bg-surface p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-brand-700" />
                  <h2 className="text-base font-bold text-ink-800">
                    درگاه پرداخت
                  </h2>
                </div>

                <p className="text-xs text-muted leading-relaxed">
                  اطلاعات درگاه پرداخت (زرین‌پال، آیدی‌پی و...) را وارد کنید.
                  این اطلاعات به‌صورت رمزنگاری‌شده ذخیره می‌شوند.
                </p>

                <div>
                  <label className="block text-sm font-medium text-ink-800 mb-1.5">
                    درگاه فعال
                  </label>
                  <select className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-500 focus:outline-none transition">
                    <option>زرین‌پال</option>
                    <option>آیدی‌پی</option>
                    <option>پی‌پینگ</option>
                    <option>پرداخت در محل</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-ink-800 mb-1.5">
                    Merchant ID
                  </label>
                  <input
                    type="text"
                    placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                    dir="ltr"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-left font-mono focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-ink-800 mb-1.5">
                    Callback URL
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      defaultValue="https://doctor.ir/api/payments/callback"
                      dir="ltr"
                      className="flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm text-left font-mono focus:border-brand-500 focus:outline-none transition"
                    />
                    <button
                      onClick={() =>
                        toast.success("کپی شد", "لینک کپی شد.")
                      }
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-background hover:bg-brand-50 transition"
                      aria-label="کپی"
                    >
                      <Copy className="h-4 w-4 text-muted" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-xl border-2 border-dashed border-border bg-background p-4">
                  <div>
                    <div className="text-sm font-bold text-ink-800">
                      حالت آزمایشی (Sandbox)
                    </div>
                    <div className="text-xs text-muted mt-0.5">
                      برای تست پرداخت بدون کسر وجه واقعی
                    </div>
                  </div>
                  <button className="relative h-6 w-11 rounded-full bg-border transition">
                    <span className="absolute top-0.5 right-[22px] h-5 w-5 rounded-full bg-white shadow transition-all" />
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ═══════════════════════════════════════
              Integrations
              ═══════════════════════════════════════ */}
          {activeTab === "integrations" && (
            <>
              <div className="rounded-2xl border border-border bg-surface p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-emerald-600" />
                  <h2 className="text-base font-bold text-ink-800">
                    پیامک
                  </h2>
                </div>
                <p className="text-xs text-muted">
                  برای ارسال کد OTP و یادآوری نوبت
                </p>

                <div>
                  <label className="block text-sm font-medium text-ink-800 mb-1.5">
                    سرویس‌دهنده
                  </label>
                  <select className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-500 focus:outline-none transition">
                    <option>کاوه‌نگار</option>
                    <option>ملی‌پیامک</option>
                    <option>فراز اس‌ام‌اس</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-ink-800 mb-1.5">
                    API Key
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••••••••••"
                    dir="ltr"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-left font-mono focus:border-brand-500 focus:outline-none transition"
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-surface p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-purple-600" />
                  <h2 className="text-base font-bold text-ink-800">
                    هوش مصنوعی (AI)
                  </h2>
                </div>
                <p className="text-xs text-muted">
                  برای دستیار هوشمند مطب
                </p>

                <div>
                  <label className="block text-sm font-medium text-ink-800 mb-1.5">
                    Provider
                  </label>
                  <select className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-500 focus:outline-none transition">
                    <option>OpenAI</option>
                    <option>Anthropic</option>
                    <option>Google Gemini</option>
                    <option>سرویس داخلی</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-ink-800 mb-1.5">
                    API Key
                  </label>
                  <input
                    type="password"
                    placeholder="sk-••••••••••••••••••••••••"
                    dir="ltr"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-left font-mono focus:border-brand-500 focus:outline-none transition"
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-surface p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-brand-700" />
                  <h2 className="text-base font-bold text-ink-800">
                    فضای ذخیره‌سازی
                  </h2>
                </div>
                <p className="text-xs text-muted">
                  برای ذخیره‌ی لوگو، ویدیو و تصاویر
                </p>

                <div>
                  <label className="block text-sm font-medium text-ink-800 mb-1.5">
                    Provider
                  </label>
                  <select className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-500 focus:outline-none transition">
                    <option>MinIO (لوکال)</option>
                    <option>Cloudflare R2</option>
                    <option>AWS S3</option>
                    <option>آروان</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {/* ═══════════════════════════════════════
              Danger Zone
              ═══════════════════════════════════════ */}
          {activeTab === "danger" && (
            <>
              <div className="rounded-2xl border-2 border-red-200 bg-red-50/50 p-5 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-red-800">
                      منطقه‌ی خطرناک
                    </h2>
                    <p className="text-xs text-red-700 mt-1 leading-relaxed">
                      عملیات زیر غیرقابل بازگشت هستند. با احتیاط عمل کنید.
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-red-200 bg-white p-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-bold text-ink-800">
                      پاک کردن همه‌ی نوبت‌ها
                    </div>
                    <div className="text-xs text-muted mt-0.5">
                      تمام نوبت‌ها از دیتابیس حذف می‌شوند
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      toast.error("غیرفعال", "این عمل در دسترس نیست.")
                    }
                    className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-100 transition"
                  >
                    پاک کردن
                  </button>
                </div>

                <div className="rounded-xl border border-red-200 bg-white p-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-bold text-ink-800">
                      بازنشانی تنظیمات سایت
                    </div>
                    <div className="text-xs text-muted mt-0.5">
                      همه‌ی تنظیمات به حالت پیش‌فرض برمی‌گردد
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      toast.error("غیرفعال", "این عمل در دسترس نیست.")
                    }
                    className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-100 transition"
                  >
                    بازنشانی
                  </button>
                </div>

                <div className="rounded-xl border border-red-300 bg-white p-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-bold text-red-800">
                      حذف حساب کاربری
                    </div>
                    <div className="text-xs text-red-600 mt-0.5">
                      تمام اطلاعات به‌طور کامل حذف می‌شود
                    </div>
                  </div>
                  <button
                    onClick={() => setDeleteAccountOpen(true)}
                    className="rounded-lg bg-red-500 px-4 py-2 text-xs font-bold text-white hover:bg-red-600 transition"
                  >
                    حذف حساب
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ═══════════════════════════════════════
          2FA Modal
          ═══════════════════════════════════════ */}
      <ConfirmDialog
        open={show2FAModal}
        onClose={() => setShow2FAModal(false)}
        onConfirm={() => {
          toast.success(
            "فعال شد",
            "احراز هویت دو مرحله‌ای فعال شد. کد تأیید به موبایل شما ارسال شد."
          );
          setShow2FAModal(false);
        }}
        variant="info"
        title="فعال‌سازی احراز هویت دو مرحله‌ای"
        description="یک کد تأیید به شماره موبایل ۰۹۱۲۳۴۵۶۷۸۹ ارسال می‌شود. برای تکمیل فرآیند، کد را وارد کنید."
        confirmLabel="ارسال کد"
      />

      {/* ═══════════════════════════════════════
          Delete Account Confirm
          ═══════════════════════════════════════ */}
      <ConfirmDialog
        open={deleteAccountOpen}
        onClose={() => setDeleteAccountOpen(false)}
        onConfirm={handleDeleteAccount}
        loading={deleteLoading}
        variant="danger"
        title="حذف حساب کاربری"
        description="آیا مطمئن هستید که می‌خواهید حساب خود را حذف کنید؟ این عمل غیرقابل بازگشت است و تمام اطلاعات شما حذف خواهد شد."
        confirmLabel="بله، حذف کن"
      />
    </div>
  );
}