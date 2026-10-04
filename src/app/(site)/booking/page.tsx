"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Calendar,
  Clock,
  User,
  CheckCircle2,
  Sparkles,
  Phone,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAdminStore } from "@/lib/stores/admin-store";

type Step = 1 | 2 | 3 | 4;

const TIME_SLOTS = [
  "۰۹:۰۰", "۰۹:۳۰", "۱۰:۰۰", "۱۰:۳۰",
  "۱۱:۰۰", "۱۱:۳۰", "۱۲:۰۰",
  "۱۴:۰۰", "۱۴:۳۰", "۱۵:۰۰", "۱۵:۳۰",
  "۱۶:۰۰", "۱۶:۳۰", "۱۷:۰۰", "۱۷:۳۰", "۱۸:۰۰",
];

const getNextDays = () => {
  const days = [];
  const weekdays = ["یک‌شنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه", "شنبه"];
  const now = new Date();
  for (let i = 0; i < 14; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    days.push({
      date: d,
      dayName: weekdays[d.getDay()],
      dayNum: d.getDate(),
      month: d.toLocaleDateString("fa-IR", { month: "short" }),
      isToday: i === 0,
      isClosed: d.getDay() === 5,
    });
  }
  return days;
};

export default function BookingPage() {
  // ═══ Store ═══
  const services = useAdminStore((s) => s.services);
  const content = useAdminStore((s) => s.content);
  const addAppointment = useAdminStore((s) => s.addAppointment);

  // فقط خدمات فعال
  const activeServices = services.filter((s) => s.isActive);

  // ═══ UI State ═══
  const [step, setStep] = useState<Step>(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    null
  );
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const days = getNextDays();
  const service = activeServices.find((s) => s.id === selectedServiceId);

  const canGoNext =
    (step === 1 && selectedServiceId) ||
    (step === 2 && selectedDay !== null && selectedTime) ||
    (step === 3 && form.firstName && form.lastName && form.phone);

  const handleSubmit = () => {
    if (!service || selectedDay === null || !selectedTime) return;

    // ثبت نوبت توی store
    const appointment = {
      id: `QD-${Date.now().toString().slice(-10)}`,
      patient: `${form.firstName} ${form.lastName}`,
      phone: form.phone,
      email: "",
      serviceId: service.id,
      service: service.name,
      duration: service.duration,
      date: days[selectedDay].isToday ? "امروز" : days[selectedDay].dayName,
      time: selectedTime,
      status: "pending" as const,
      notes: form.notes,
      price: service.price
        ? service.price.toLocaleString("fa-IR")
        : "مشاوره رایگان",
    };

    addAppointment(appointment);
    setSubmitted(true);
  };

  // ─── Success view ─────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full rounded-3xl bg-surface border border-border p-8 text-center shadow-elevated">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600 mb-5">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h1 className="text-2xl font-bold text-ink-800 mb-3">
            درخواست شما ثبت شد!
          </h1>
          <p className="text-sm text-muted leading-relaxed mb-6">
            درخواست رزرو شما با موفقیت دریافت شد. همکاران ما در اسرع وقت با
            شما تماس می‌گیرند تا نوبت شما را تأیید کنند.
          </p>

          <div className="rounded-2xl bg-cream-200 p-4 mb-6 text-right space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink-800/60">خدمت:</span>
              <span className="font-bold text-ink-800">{service?.name}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink-800/60">تاریخ:</span>
              <span className="font-bold text-ink-800">
                {selectedDay !== null && days[selectedDay].dayName}{" "}
                {selectedDay !== null && days[selectedDay].dayNum}{" "}
                {selectedDay !== null && days[selectedDay].month}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink-800/60">ساعت:</span>
              <span className="font-bold text-ink-800">{selectedTime}</span>
            </div>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition"
            style={{ background: "var(--theme-primary)" }}
          >
            بازگشت به صفحه اصلی
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  // ─── Multi-step form ──────────────────────────
  return (
    <div className="min-h-screen bg-background pb-72 md:pb-80">
      {/* ═══ Header ═══ */}
      <div className="bg-gradient-to-br from-ink-900 via-brand-900 to-ink-900 pt-24 md:pt-28 pb-16 md:pb-20 rounded-b-[32px] md:rounded-b-[48px]">
        <div className="container mx-auto px-4 md:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition mb-5"
          >
            <ArrowRight className="h-4 w-4" />
            بازگشت
          </Link>

          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            رزرو نوبت{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(to left, var(--theme-accent), var(--theme-accent))",
              }}
            >
              آنلاین
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-base md:text-lg text-white/80 leading-relaxed">
            در ۳ مرحله‌ی ساده، نوبت خود را رزرو کنید
          </p>
        </div>
      </div>

      {/* ═══ Steps indicator ═══ */}
      <div className="container mx-auto px-4 md:px-6 -mt-8 relative z-10">
        <div className="rounded-3xl bg-surface border border-border shadow-elevated p-4 md:p-5">
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: "انتخاب خدمت", icon: Sparkles },
              { num: 2, label: "زمان", icon: Calendar },
              { num: 3, label: "اطلاعات", icon: User },
              { num: 4, label: "تأیید", icon: CheckCircle2 },
            ].map((s, idx) => {
              const Icon = s.icon;
              const isActive = step === s.num;
              const isDone = step > s.num;
              return (
                <div key={s.num} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={cn(
                        "flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full transition-all text-white"
                      )}
                      style={
                        isDone
                          ? { background: "#10b981" }
                          : isActive
                          ? { background: "var(--theme-accent)", color: "#0b1f1d" }
                          : {
                              background: "var(--theme-primary-soft)",
                              color: "var(--theme-primary)",
                            }
                      }
                    >
                      {isDone ? (
                        <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5" />
                      ) : (
                        <Icon className="h-4 w-4 md:h-5 md:w-5" />
                      )}
                    </div>
                    <span
                      className={cn(
                        "mt-1.5 text-[10px] md:text-xs font-medium hidden sm:block",
                        isActive ? "text-ink-800" : "text-muted"
                      )}
                    >
                      {s.label}
                    </span>
                  </div>
                  {idx < 3 && (
                    <div
                      className={cn(
                        "h-0.5 flex-1 mx-1 transition-colors",
                        step > s.num ? "bg-green-400" : "bg-border"
                      )}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ═══ Content ═══ */}
      <div className="container mx-auto px-4 md:px-6 mt-6 md:mt-8">
        {/* STEP 1 */}
        {step === 1 && (
          <div>
            <h2 className="text-lg md:text-xl font-bold text-ink-800 mb-4">
              چه خدمتی می‌خواهید؟
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeServices.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedServiceId(s.id)}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl border-2 p-4 transition-all text-right"
                  )}
                  style={{
                    borderColor:
                      selectedServiceId === s.id
                        ? "var(--theme-accent)"
                        : undefined,
                    background:
                      selectedServiceId === s.id
                        ? "var(--theme-primary-soft)"
                        : undefined,
                  }}
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-cream-200 text-3xl">
                    {s.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-ink-800 text-sm md:text-base">
                      {s.name}
                    </div>
                    <div className="mt-1 flex items-center gap-3 text-xs text-muted">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {s.duration} دقیقه
                      </span>
                      <span
                        className="font-bold"
                        style={{ color: "var(--theme-primary)" }}
                      >
                        {s.price
                          ? s.price.toLocaleString("fa-IR")
                          : "مشاوره رایگان"}
                      </span>
                    </div>
                  </div>
                  {selectedServiceId === s.id && (
                    <CheckCircle2
                      className="h-5 w-5 shrink-0"
                      style={{ color: "var(--theme-accent)" }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div>
            <h2 className="text-lg md:text-xl font-bold text-ink-800 mb-4">
              چه زمانی مناسب شماست؟
            </h2>

            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {days.map((d, idx) => (
                <button
                  key={idx}
                  onClick={() => !d.isClosed && setSelectedDay(idx)}
                  disabled={d.isClosed}
                  className={cn(
                    "shrink-0 rounded-2xl border-2 px-4 py-3 text-center min-w-[80px] transition-all",
                    d.isClosed && "bg-background opacity-40 cursor-not-allowed"
                  )}
                  style={{
                    borderColor:
                      selectedDay === idx
                        ? "var(--theme-accent)"
                        : undefined,
                    background:
                      selectedDay === idx
                        ? "var(--theme-primary-soft)"
                        : undefined,
                  }}
                >
                  <div className="text-xs text-muted">{d.dayName}</div>
                  <div className="mt-1 text-lg font-bold text-ink-800">
                    {d.dayNum}
                  </div>
                  <div className="text-[10px] text-muted">{d.month}</div>
                  {d.isToday && (
                    <div
                      className="mt-1 inline-block rounded-full px-2 py-0.5 text-[9px]"
                      style={{
                        background: "var(--theme-primary-soft)",
                        color: "var(--theme-primary)",
                      }}
                    >
                      امروز
                    </div>
                  )}
                  {d.isClosed && (
                    <div className="mt-1 inline-block rounded-full bg-red-100 px-2 py-0.5 text-[9px] text-red-600">
                      تعطیل
                    </div>
                  )}
                </button>
              ))}
            </div>

            {selectedDay !== null && (
              <div className="mt-6">
                <h3 className="text-sm font-bold text-ink-800 mb-3">
                  ساعت‌های آزاد
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {TIME_SLOTS.map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className={cn(
                        "rounded-xl border py-2.5 text-sm font-medium transition-all"
                      )}
                      style={
                        selectedTime === t
                          ? {
                              background: "var(--theme-accent)",
                              color: "#0b1f1d",
                              borderColor: "var(--theme-accent)",
                            }
                          : undefined
                      }
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div>
            <h2 className="text-lg md:text-xl font-bold text-ink-800 mb-4">
              اطلاعات شما
            </h2>
            <div className="rounded-3xl bg-surface border border-border p-5 md:p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-ink-800 mb-1.5">
                    نام <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={(e) =>
                      setForm({ ...form, firstName: e.target.value })
                    }
                    placeholder="مثلاً: علی"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 transition"
                    style={
                      { "--tw-ring-color": "var(--theme-primary)" } as any
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink-800 mb-1.5">
                    نام خانوادگی <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={(e) =>
                      setForm({ ...form, lastName: e.target.value })
                    }
                    placeholder="مثلاً: محمدی"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 transition"
                    style={
                      { "--tw-ring-color": "var(--theme-primary)" } as any
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-ink-800 mb-1.5">
                  شماره موبایل <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  dir="ltr"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-left focus:outline-none focus:ring-2 transition"
                  style={{ "--tw-ring-color": "var(--theme-primary)" } as any}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ink-800 mb-1.5">
                  توضیحات (اختیاری)
                </label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="اگر نکته‌ی خاصی هست، اینجا بنویسید..."
                  rows={3}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 transition resize-none"
                  style={{ "--tw-ring-color": "var(--theme-primary)" } as any}
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <div>
            <h2 className="text-lg md:text-xl font-bold text-ink-800 mb-4">
              تأیید نهایی
            </h2>
            <div className="rounded-3xl bg-surface border border-border p-5 md:p-6">
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-cream-200 text-3xl">
                  {service?.emoji}
                </div>
                <div>
                  <div className="font-bold text-ink-800">{service?.name}</div>
                  <div className="text-xs text-muted mt-0.5">
                    مدت زمان: {service?.duration} دقیقه
                  </div>
                </div>
              </div>

              <div className="py-4 space-y-3 border-b border-border">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar
                    className="h-4 w-4"
                    style={{ color: "var(--theme-primary)" }}
                  />
                  <span className="text-muted">تاریخ:</span>
                  <span className="font-medium text-ink-800">
                    {selectedDay !== null && days[selectedDay].dayName}{" "}
                    {selectedDay !== null && days[selectedDay].dayNum}{" "}
                    {selectedDay !== null && days[selectedDay].month}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock
                    className="h-4 w-4"
                    style={{ color: "var(--theme-primary)" }}
                  />
                  <span className="text-muted">ساعت:</span>
                  <span className="font-medium text-ink-800">
                    {selectedTime}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <User
                    className="h-4 w-4"
                    style={{ color: "var(--theme-primary)" }}
                  />
                  <span className="text-muted">نام:</span>
                  <span className="font-medium text-ink-800">
                    {form.firstName} {form.lastName}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone
                    className="h-4 w-4"
                    style={{ color: "var(--theme-primary)" }}
                  />
                  <span className="text-muted">موبایل:</span>
                  <span className="font-medium text-ink-800" dir="ltr">
                    {form.phone}
                  </span>
                </div>
                {form.notes && (
                  <div className="rounded-xl bg-cream-200 p-3 text-sm text-ink-800/80">
                    {form.notes}
                  </div>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-muted">هزینه‌ی تقریبی:</span>
                <span
                  className="text-base font-bold"
                  style={{ color: "var(--theme-primary)" }}
                >
                  {service?.price
                    ? service.price.toLocaleString("fa-IR")
                    : "مشاوره رایگان"}
                  {service?.price && (
                    <span className="text-xs font-normal text-muted mr-1">
                      تومان
                    </span>
                  )}
                </span>
              </div>

              <div
                className="mt-5 rounded-2xl p-4"
                style={{
                  background: "var(--theme-primary-soft)",
                  borderColor: "var(--theme-primary)",
                  borderWidth: 1,
                }}
              >
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--theme-primary)" }}
                >
                  💡 پس از ثبت درخواست، منشی مطب برای تأیید نهایی با شما تماس
                  خواهد گرفت. نوبت شما پس از تأیید، قطعی می‌شود.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ═══ Navigation bar ═══ */}
      <div className="fixed bottom-5 right-4 left-4 md:left-auto md:right-6 md:w-auto z-30 md:max-w-md">
        <div className="flex items-center gap-2">
          {step > 1 && (
            <button
              onClick={() => setStep((s) => (s - 1) as Step)}
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white border-2 border-border text-ink-800 hover:bg-cream-200 transition shadow-lg"
              aria-label="مرحله قبل"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          )}

          {step < 4 ? (
            <button
              onClick={() => canGoNext && setStep((s) => (s + 1) as Step)}
              disabled={!canGoNext}
              className={cn(
                "flex flex-1 items-center justify-between gap-3 rounded-2xl px-5 py-4 transition-all",
                canGoNext
                  ? "text-white shadow-2xl hover:scale-[1.02]"
                  : "bg-border text-muted cursor-not-allowed"
              )}
              style={canGoNext ? { background: "var(--theme-primary)" } : undefined}
            >
              <span className="text-sm md:text-base font-bold">
                مرحله بعد
              </span>
              <ArrowLeft className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex flex-1 items-center justify-between gap-3 rounded-2xl px-5 py-4 shadow-2xl hover:scale-[1.02] transition-all"
              style={{
                background: "var(--theme-accent)",
                color: "#0b1f1d",
              }}
            >
              <span className="text-sm md:text-base font-bold">
                ثبت درخواست رزرو
              </span>
              <CheckCircle2 className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}