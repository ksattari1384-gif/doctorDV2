"use client";

import { useMemo, useState } from "react";
import {
  Clock,
  Save,
  Plus,
  Trash2,
  Coffee,
  Calendar,
  Ban,
  UserMinus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/admin/page-header";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { Modal } from "@/components/admin/modal";
import { EmptyState } from "@/components/admin/empty-state";
import { useToast } from "@/components/admin/toast";
import {
  useAdminStore,
  type BreakTime,
  type Holiday,
  type Leave,
} from "@/lib/stores/admin-store";

const WEEKDAYS = [
  "شنبه",
  "یک‌شنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
];

type Tab = "hours" | "breaks" | "holidays" | "leaves";

export default function SchedulePage() {
  const toast = useToast();

  // ═══ Store ═══
  const workingHours = useAdminStore((s) => s.workingHours);
  const breaks = useAdminStore((s) => s.breaks);
  const holidays = useAdminStore((s) => s.holidays);
  const leaves = useAdminStore((s) => s.leaves);

  const updateWorkingHour = useAdminStore((s) => s.updateWorkingHour);
  const addBreak = useAdminStore((s) => s.addBreak);
  const deleteBreak = useAdminStore((s) => s.deleteBreak);
  const addHoliday = useAdminStore((s) => s.addHoliday);
  const deleteHoliday = useAdminStore((s) => s.deleteHoliday);
  const addLeave = useAdminStore((s) => s.addLeave);
  const deleteLeave = useAdminStore((s) => s.deleteLeave);

  // ═══ UI State ═══
  const [activeTab, setActiveTab] = useState<Tab>("hours");

  // Modal states
  const [breakModalOpen, setBreakModalOpen] = useState(false);
  const [holidayModalOpen, setHolidayModalOpen] = useState(false);
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);

  // Form values
  const [breakForm, setBreakForm] = useState({
    weekday: 0,
    startTime: "13:00",
    endTime: "14:00",
    reason: "",
  });
  const [holidayForm, setHolidayForm] = useState({ date: "", title: "" });
  const [leaveForm, setLeaveForm] = useState({
    startDate: "",
    endDate: "",
    reason: "",
  });

  // Delete targets
  const [deleteBreakId, setDeleteBreakId] = useState<string | null>(null);
  const [deleteHolidayId, setDeleteHolidayId] = useState<string | null>(null);
  const [deleteLeaveId, setDeleteLeaveId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // ═══ Derived ═══
  const deleteBreakTarget = useMemo(
    () => breaks.find((b) => b.id === deleteBreakId) || null,
    [breaks, deleteBreakId]
  );
  const deleteHolidayTarget = useMemo(
    () => holidays.find((h) => h.id === deleteHolidayId) || null,
    [holidays, deleteHolidayId]
  );
  const deleteLeaveTarget = useMemo(
    () => leaves.find((l) => l.id === deleteLeaveId) || null,
    [leaves, deleteLeaveId]
  );

  // ═══ Stats ═══
  const stats = useMemo(() => {
    const activeDays = workingHours.filter((h) => h.isActive).length;
    const totalWeeklyHours = workingHours.reduce((sum, h) => {
      if (!h.isActive) return sum;
      const [sh, sm] = h.startTime.split(":").map(Number);
      const [eh, em] = h.endTime.split(":").map(Number);
      return sum + (eh * 60 + em - (sh * 60 + sm)) / 60;
    }, 0);
    return {
      activeDays,
      totalWeeklyHours: Math.round(totalWeeklyHours),
      totalBreaks: breaks.length,
      totalHolidays: holidays.length + leaves.length,
    };
  }, [workingHours, breaks, holidays, leaves]);

  // ═══ Actions ═══
  const handleSaveHours = () => {
    toast.success("ذخیره شد", "ساعات کاری با موفقیت به‌روزرسانی شد.");
  };

  const handleAddBreak = () => {
    if (!breakForm.reason.trim()) {
      toast.error("خطا", "عنوان استراحت را وارد کنید.");
      return;
    }
    const id = Math.random().toString(36).slice(2, 10);
    addBreak({
      id,
      weekday: breakForm.weekday,
      startTime: breakForm.startTime,
      endTime: breakForm.endTime,
      reason: breakForm.reason,
    });
    toast.success("اضافه شد", "استراحت جدید ثبت شد.");
    setBreakModalOpen(false);
    setBreakForm({
      weekday: 0,
      startTime: "13:00",
      endTime: "14:00",
      reason: "",
    });
  };

  const handleAddHoliday = () => {
    if (!holidayForm.date.trim() || !holidayForm.title.trim()) {
      toast.error("خطا", "عنوان و تاریخ را وارد کنید.");
      return;
    }
    const id = Math.random().toString(36).slice(2, 10);
    addHoliday({
      id,
      date: holidayForm.date,
      title: holidayForm.title,
    });
    toast.success("اضافه شد", "تعطیلی جدید ثبت شد.");
    setHolidayModalOpen(false);
    setHolidayForm({ date: "", title: "" });
  };

  const handleAddLeave = () => {
    if (
      !leaveForm.startDate.trim() ||
      !leaveForm.endDate.trim() ||
      !leaveForm.reason.trim()
    ) {
      toast.error("خطا", "عنوان و بازه‌ی تاریخ را وارد کنید.");
      return;
    }
    const id = Math.random().toString(36).slice(2, 10);
    addLeave({
      id,
      startDate: leaveForm.startDate,
      endDate: leaveForm.endDate,
      reason: leaveForm.reason,
    });
    toast.success("اضافه شد", "مرخصی جدید ثبت شد.");
    setLeaveModalOpen(false);
    setLeaveForm({ startDate: "", endDate: "", reason: "" });
  };

  const handleDeleteBreak = async () => {
    if (!deleteBreakId) return;
    setDeleteLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    deleteBreak(deleteBreakId);
    toast.success("حذف شد", "زمان استراحت حذف شد.");
    setDeleteLoading(false);
    setDeleteBreakId(null);
  };

  const handleDeleteHoliday = async () => {
    if (!deleteHolidayId) return;
    setDeleteLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    deleteHoliday(deleteHolidayId);
    toast.success("حذف شد", "تعطیلی حذف شد.");
    setDeleteLoading(false);
    setDeleteHolidayId(null);
  };

  const handleDeleteLeave = async () => {
    if (!deleteLeaveId) return;
    setDeleteLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    deleteLeave(deleteLeaveId);
    toast.success("حذف شد", "مرخصی حذف شد.");
    setDeleteLoading(false);
    setDeleteLeaveId(null);
  };

  const TABS = [
    { id: "hours" as Tab, label: "ساعات کاری", icon: Clock },
    { id: "breaks" as Tab, label: "استراحت‌ها", icon: Coffee },
    { id: "holidays" as Tab, label: "تعطیلات", icon: Ban },
    { id: "leaves" as Tab, label: "مرخصی پزشک", icon: UserMinus },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="زمان‌بندی"
        description="تعیین ساعات کاری، استراحت‌ها، تعطیلات و مرخصی‌ها"
        badge={
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 border border-brand-200 px-3 py-1 text-xs font-medium text-brand-800">
            <Clock className="h-3 w-3" />
            {stats.totalWeeklyHours} ساعت در هفته
          </span>
        }
      />

      {/* ═══ Stats ═══ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          {
            label: "روزهای فعال",
            value: `${stats.activeDays} روز`,
            icon: Calendar,
            color: "bg-brand-50 text-brand-700",
          },
          {
            label: "ساعت هفتگی",
            value: `${stats.totalWeeklyHours} ساعت`,
            icon: Clock,
            color: "bg-emerald-50 text-emerald-700",
          },
          {
            label: "استراحت‌ها",
            value: `${stats.totalBreaks} مورد`,
            icon: Coffee,
            color: "bg-amber-50 text-amber-700",
          },
          {
            label: "تعطیلات و مرخصی",
            value: `${stats.totalHolidays} مورد`,
            icon: Ban,
            color: "bg-red-50 text-red-700",
          },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4"
            >
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                  s.color
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] text-muted">{s.label}</div>
                <div className="text-base font-bold text-ink-800 truncate">
                  {s.value}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ═══ Tabs ═══ */}
      <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-1">
        {TABS.map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={cn(
                "inline-flex items-center gap-2 shrink-0 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                isActive
                  ? "bg-brand-700 text-white shadow-sm"
                  : "bg-surface border border-border text-muted hover:bg-brand-50 hover:text-brand-800"
              )}
            >
              <Icon className="h-4 w-4" />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* ═══ TAB 1: Hours ═══ */}
      {activeTab === "hours" && (
        <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-soft">
          <div className="border-b border-border p-5">
            <h2 className="text-base font-bold text-ink-800">
              ساعات کاری هفتگی
            </h2>
            <p className="text-xs text-muted mt-1">
              ساعات کاری هر روز هفته را تعیین کنید. روزهای غیرفعال در سایت
              نمایش داده نمی‌شوند.
            </p>
          </div>

          <div className="divide-y divide-border">
            {workingHours.map((h) => {
              const dayName = WEEKDAYS[h.weekday];
              return (
                <div
                  key={h.weekday}
                  className={cn(
                    "flex flex-wrap items-center gap-4 p-4 transition",
                    !h.isActive && "bg-background/50 opacity-70"
                  )}
                >
                  <div className="flex items-center gap-3 min-w-[110px]">
                    <button
                      onClick={() =>
                        updateWorkingHour(h.weekday, "isActive", !h.isActive)
                      }
                      className={cn(
                        "relative h-6 w-11 rounded-full transition shrink-0",
                        h.isActive ? "bg-emerald-500" : "bg-border"
                      )}
                      aria-label={h.isActive ? "غیرفعال" : "فعال"}
                    >
                      <span
                        className={cn(
                          "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all",
                          h.isActive ? "right-0.5" : "right-[22px]"
                        )}
                      />
                    </button>
                    <span
                      className={cn(
                        "text-sm font-bold",
                        h.isActive ? "text-ink-800" : "text-muted"
                      )}
                    >
                      {dayName}
                    </span>
                  </div>

                  {h.isActive ? (
                    <div className="flex items-center gap-2 flex-1 min-w-[240px]">
                      <div className="flex-1">
                        <input
                          type="time"
                          value={h.startTime}
                          onChange={(e) =>
                            updateWorkingHour(
                              h.weekday,
                              "startTime",
                              e.target.value
                            )
                          }
                          className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-center focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition"
                          dir="ltr"
                        />
                      </div>
                      <span className="text-muted text-sm">تا</span>
                      <div className="flex-1">
                        <input
                          type="time"
                          value={h.endTime}
                          onChange={(e) =>
                            updateWorkingHour(
                              h.weekday,
                              "endTime",
                              e.target.value
                            )
                          }
                          className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-center focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition"
                          dir="ltr"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600">
                        <Ban className="h-3 w-3" />
                        تعطیل
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="border-t border-border bg-background/50 p-4 flex items-center justify-between">
            <span className="text-xs text-muted">
              مجموع:{" "}
              <strong className="text-ink-800">
                {stats.totalWeeklyHours}
              </strong>{" "}
              ساعت در هفته
            </span>
            <button
              onClick={handleSaveHours}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-800 transition shadow-sm"
            >
              <Save className="h-4 w-4" />
              ذخیره تغییرات
            </button>
          </div>
        </div>
      )}

      {/* ═══ TAB 2: Breaks ═══ */}
      {activeTab === "breaks" && (
        <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-soft">
          <div className="border-b border-border p-5 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-ink-800">
                استراحت‌های روزانه
              </h2>
              <p className="text-xs text-muted mt-1">
                زمان‌هایی که در آن نوبت‌دهی انجام نمی‌شود
              </p>
            </div>
            <button
              onClick={() => setBreakModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-800 transition shadow-sm"
            >
              <Plus className="h-4 w-4" />
              استراحت جدید
            </button>
          </div>

          {breaks.length > 0 ? (
            <div className="divide-y divide-border">
              {breaks.map((b) => (
                <div
                  key={b.id}
                  className="flex items-center gap-4 p-4 hover:bg-background/50 transition"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                    <Coffee className="h-5 w-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-ink-800">
                      {b.reason}
                    </div>
                    <div className="text-xs text-muted mt-0.5">
                      {WEEKDAYS[b.weekday]}
                    </div>
                  </div>

                  <div
                    className="flex items-center gap-2 text-sm text-ink-800 font-mono"
                    dir="ltr"
                  >
                    <span>{b.startTime}</span>
                    <span className="text-muted">—</span>
                    <span>{b.endTime}</span>
                  </div>

                  <button
                    onClick={() => setDeleteBreakId(b.id)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-red-500 hover:bg-red-50 transition"
                    aria-label="حذف"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<Coffee className="h-7 w-7" />}
              title="هیچ استراحتی ثبت نشده"
              description="با کلیک روی «استراحت جدید» یک بازه‌ی استراحت اضافه کنید."
            />
          )}
        </div>
      )}

      {/* ═══ TAB 3: Holidays ═══ */}
      {activeTab === "holidays" && (
        <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-soft">
          <div className="border-b border-border p-5 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-ink-800">تعطیلات</h2>
              <p className="text-xs text-muted mt-1">
                روزهای تعطیل رسمی یا خاص مطب
              </p>
            </div>
            <button
              onClick={() => setHolidayModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-800 transition shadow-sm"
            >
              <Plus className="h-4 w-4" />
              تعطیلی جدید
            </button>
          </div>

          {holidays.length > 0 ? (
            <div className="divide-y divide-border">
              {holidays.map((h) => (
                <div
                  key={h.id}
                  className="flex items-center gap-4 p-4 hover:bg-background/50 transition"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <Ban className="h-5 w-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-ink-800">
                      {h.title}
                    </div>
                    <div className="text-xs text-muted mt-0.5">{h.date}</div>
                  </div>

                  <button
                    onClick={() => setDeleteHolidayId(h.id)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-red-500 hover:bg-red-50 transition"
                    aria-label="حذف"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<Ban className="h-7 w-7" />}
              title="هیچ تعطیلی ثبت نشده"
              description="روزهای تعطیل رسمی یا خاص را اینجا اضافه کنید."
            />
          )}
        </div>
      )}

      {/* ═══ TAB 4: Leaves ═══ */}
      {activeTab === "leaves" && (
        <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-soft">
          <div className="border-b border-border p-5 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-ink-800">
                مرخصی پزشک
              </h2>
              <p className="text-xs text-muted mt-1">
                بازه‌هایی که پزشک در مطب حضور ندارد
              </p>
            </div>
            <button
              onClick={() => setLeaveModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-800 transition shadow-sm"
            >
              <Plus className="h-4 w-4" />
              مرخصی جدید
            </button>
          </div>

          {leaves.length > 0 ? (
            <div className="divide-y divide-border">
              {leaves.map((l) => (
                <div
                  key={l.id}
                  className="flex items-center gap-4 p-4 hover:bg-background/50 transition"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                    <UserMinus className="h-5 w-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-ink-800">
                      {l.reason}
                    </div>
                    <div className="text-xs text-muted mt-0.5">
                      از {l.startDate} تا {l.endDate}
                    </div>
                  </div>

                  <button
                    onClick={() => setDeleteLeaveId(l.id)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-red-500 hover:bg-red-50 transition"
                    aria-label="حذف"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<UserMinus className="h-7 w-7" />}
              title="هیچ مرخصی ثبت نشده"
              description="بازه‌های مرخصی پزشک را اینجا اضافه کنید."
            />
          )}
        </div>
      )}

      {/* ═══ Break Modal ═══ */}
      <Modal
        open={breakModalOpen}
        onClose={() => setBreakModalOpen(false)}
        title="استراحت جدید"
        description="بازه‌ی استراحت را تعیین کنید"
        size="md"
        footer={
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => setBreakModalOpen(false)}
              className="rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-medium hover:bg-surface transition"
            >
              انصراف
            </button>
            <button
              onClick={handleAddBreak}
              className="rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-800 transition"
            >
              افزودن
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink-800 mb-1.5">
              روز هفته
            </label>
            <select
              value={breakForm.weekday}
              onChange={(e) =>
                setBreakForm({
                  ...breakForm,
                  weekday: parseInt(e.target.value),
                })
              }
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-500 focus:outline-none transition"
            >
              {WEEKDAYS.map((day, idx) => (
                <option key={idx} value={idx}>
                  {day}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-ink-800 mb-1.5">
                از ساعت
              </label>
              <input
                type="time"
                value={breakForm.startTime}
                onChange={(e) =>
                  setBreakForm({ ...breakForm, startTime: e.target.value })
                }
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-center focus:border-brand-500 focus:outline-none transition"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-800 mb-1.5">
                تا ساعت
              </label>
              <input
                type="time"
                value={breakForm.endTime}
                onChange={(e) =>
                  setBreakForm({ ...breakForm, endTime: e.target.value })
                }
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-center focus:border-brand-500 focus:outline-none transition"
                dir="ltr"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-800 mb-1.5">
              عنوان
            </label>
            <input
              type="text"
              value={breakForm.reason}
              onChange={(e) =>
                setBreakForm({ ...breakForm, reason: e.target.value })
              }
              placeholder="مثلاً: ناهار و استراحت"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-500 focus:outline-none transition"
            />
          </div>
        </div>
      </Modal>

      {/* ═══ Holiday Modal ═══ */}
      <Modal
        open={holidayModalOpen}
        onClose={() => setHolidayModalOpen(false)}
        title="تعطیلی جدید"
        description="روز تعطیل را اضافه کنید"
        size="md"
        footer={
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => setHolidayModalOpen(false)}
              className="rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-medium hover:bg-surface transition"
            >
              انصراف
            </button>
            <button
              onClick={handleAddHoliday}
              className="rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-800 transition"
            >
              افزودن
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink-800 mb-1.5">
              عنوان
            </label>
            <input
              type="text"
              value={holidayForm.title}
              onChange={(e) =>
                setHolidayForm({ ...holidayForm, title: e.target.value })
              }
              placeholder="مثلاً: عید نوروز"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-500 focus:outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-800 mb-1.5">
              تاریخ
            </label>
            <input
              type="text"
              value={holidayForm.date}
              onChange={(e) =>
                setHolidayForm({ ...holidayForm, date: e.target.value })
              }
              placeholder="۱۴۰۳/۰۷/۱۵"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-500 focus:outline-none transition"
            />
          </div>
        </div>
      </Modal>

      {/* ═══ Leave Modal ═══ */}
      <Modal
        open={leaveModalOpen}
        onClose={() => setLeaveModalOpen(false)}
        title="مرخصی جدید"
        description="بازه‌ی مرخصی پزشک را تعیین کنید"
        size="md"
        footer={
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => setLeaveModalOpen(false)}
              className="rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-medium hover:bg-surface transition"
            >
              انصراف
            </button>
            <button
              onClick={handleAddLeave}
              className="rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-800 transition"
            >
              افزودن
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink-800 mb-1.5">
              عنوان
            </label>
            <input
              type="text"
              value={leaveForm.reason}
              onChange={(e) =>
                setLeaveForm({ ...leaveForm, reason: e.target.value })
              }
              placeholder="مثلاً: سفر"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-500 focus:outline-none transition"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-ink-800 mb-1.5">
                از تاریخ
              </label>
              <input
                type="text"
                value={leaveForm.startDate}
                onChange={(e) =>
                  setLeaveForm({ ...leaveForm, startDate: e.target.value })
                }
                placeholder="۱۴۰۳/۰۸/۰۱"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-500 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-800 mb-1.5">
                تا تاریخ
              </label>
              <input
                type="text"
                value={leaveForm.endDate}
                onChange={(e) =>
                  setLeaveForm({ ...leaveForm, endDate: e.target.value })
                }
                placeholder="۱۴۰۳/۰۸/۰۵"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-500 focus:outline-none transition"
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* ═══ Delete Confirms ═══ */}
      <ConfirmDialog
        open={!!deleteBreakTarget}
        onClose={() => setDeleteBreakId(null)}
        onConfirm={handleDeleteBreak}
        loading={deleteLoading}
        variant="danger"
        title="حذف استراحت"
        description={
          deleteBreakTarget
            ? `آیا از حذف استراحت «${deleteBreakTarget.reason}» مطمئن هستید؟`
            : ""
        }
        confirmLabel="حذف کن"
      />

      <ConfirmDialog
        open={!!deleteHolidayTarget}
        onClose={() => setDeleteHolidayId(null)}
        onConfirm={handleDeleteHoliday}
        loading={deleteLoading}
        variant="danger"
        title="حذف تعطیلی"
        description={
          deleteHolidayTarget
            ? `آیا از حذف تعطیلی «${deleteHolidayTarget.title}» مطمئن هستید؟`
            : ""
        }
        confirmLabel="حذف کن"
      />

      <ConfirmDialog
        open={!!deleteLeaveTarget}
        onClose={() => setDeleteLeaveId(null)}
        onConfirm={handleDeleteLeave}
        loading={deleteLoading}
        variant="danger"
        title="حذف مرخصی"
        description={
          deleteLeaveTarget
            ? `آیا از حذف مرخصی «${deleteLeaveTarget.reason}» مطمئن هستید؟`
            : ""
        }
        confirmLabel="حذف کن"
      />
    </div>
  );
}