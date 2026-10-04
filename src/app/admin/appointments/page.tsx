"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Filter,
  Calendar,
  Clock,
  Phone,
  MoreVertical,
  ChevronDown,
  Download,
  Plus,
  Mail,
  MessageSquare,
  Edit,
  Trash2,
  AlertCircle,
  X,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/admin/page-header";
import { StatusBadge } from "@/components/admin/status-badge";
import { EmptyState } from "@/components/admin/empty-state";
import { Drawer } from "@/components/admin/drawer";
import { Modal } from "@/components/admin/modal";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { useToast } from "@/components/admin/toast";
import {
  useAdminStore,
  type Appointment,
  type AppointmentStatus,
} from "@/lib/stores/admin-store";

// ═══ Filter Options ═══

const STATUS_FILTERS = [
  { id: "all", label: "همه" },
  { id: "pending", label: "در انتظار تأیید" },
  { id: "contact_required", label: "نیاز به تماس" },
  { id: "confirmed", label: "قطعی" },
  { id: "completed", label: "انجام شده" },
  { id: "cancelled", label: "لغو شده" },
];

const DATE_FILTERS = [
  { id: "all", label: "همه‌ی تاریخ‌ها" },
  { id: "today", label: "امروز" },
  { id: "yesterday", label: "دیروز" },
  { id: "this-week", label: "این هفته" },
];

const SERVICE_FILTERS = [
  { id: "all", label: "همه‌ی خدمات" },
  { id: "ایمپلنت دندان", label: "ایمپلنت دندان" },
  { id: "لمینت سرامیکی", label: "لمینت سرامیکی" },
  { id: "ارتودنسی", label: "ارتودنسی" },
  { id: "عصب‌کشی", label: "عصب‌کشی" },
  { id: "جرم‌گیری", label: "جرم‌گیری" },
];

export default function AppointmentsPage() {
  const toast = useToast();

  // ═══ Store ═══
  const appointments = useAdminStore((s) => s.appointments);
  const updateAppointmentStatus = useAdminStore(
    (s) => s.updateAppointmentStatus
  );
  const deleteAppointment = useAdminStore((s) => s.deleteAppointment);

  // ═══ UI State ═══
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [serviceFilter, setServiceFilter] = useState("all");

  const [selectedAptId, setSelectedAptId] = useState<string | null>(null);
  const [confirmAction, setConfirmAction] = useState<{
    type: "approve" | "reject" | "delete";
    appointmentId: string;
  } | null>(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [newModalOpen, setNewModalOpen] = useState(false);

  // ═══ Derived ═══
  const selectedApt = useMemo(
    () => appointments.find((a) => a.id === selectedAptId) || null,
    [appointments, selectedAptId]
  );

  const confirmTarget = useMemo(
    () =>
      confirmAction
        ? appointments.find((a) => a.id === confirmAction.appointmentId) || null
        : null,
    [appointments, confirmAction]
  );

  // ═══ Filtered ═══
  const filtered = useMemo(() => {
    return appointments.filter((apt) => {
      // فیلتر وضعیت
      if (activeFilter !== "all" && apt.status !== activeFilter) return false;

      // فیلتر تاریخ
      if (dateFilter !== "all") {
        if (dateFilter === "today" && apt.date !== "امروز") return false;
        if (dateFilter === "yesterday" && apt.date !== "دیروز") return false;
        if (dateFilter === "this-week") {
          // این هفته = امروز + دیروز + ۵ روز آینده (تقریب ساده)
          const validDates = [
            "امروز",
            "دیروز",
            "فردا",
            "یک‌شنبه",
            "دوشنبه",
            "سه‌شنبه",
            "چهارشنبه",
            "پنجشنبه",
          ];
          if (!validDates.includes(apt.date)) return false;
        }
      }

      // فیلتر خدمت
      if (serviceFilter !== "all" && apt.service !== serviceFilter) {
        return false;
      }

      // جستجو
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        return (
          apt.patient.toLowerCase().includes(q) ||
          apt.service.toLowerCase().includes(q) ||
          apt.id.toLowerCase().includes(q) ||
          apt.phone.includes(q)
        );
      }
      return true;
    });
  }, [appointments, activeFilter, dateFilter, serviceFilter, searchQuery]);

  // ═══ Counts ═══
  const counts = useMemo(() => {
    return {
      all: appointments.length,
      pending: appointments.filter((a) => a.status === "pending").length,
      contact_required: appointments.filter(
        (a) => a.status === "contact_required"
      ).length,
      confirmed: appointments.filter((a) => a.status === "confirmed").length,
      completed: appointments.filter((a) => a.status === "completed").length,
      cancelled: appointments.filter((a) => a.status === "cancelled").length,
    };
  }, [appointments]);

  // ═══ Active Filter Count ═══
  const activeFiltersCount = [
    activeFilter !== "all",
    dateFilter !== "all",
    serviceFilter !== "all",
  ].filter(Boolean).length;

  // ═══ Actions ═══
  const handleApprove = async () => {
    if (!confirmTarget) return;
    setConfirmLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    updateAppointmentStatus(confirmTarget.id, "confirmed");
    toast.success(
      "نوبت تأیید شد",
      `نوبت ${confirmTarget.patient} با موفقیت تأیید شد.`
    );
    setConfirmLoading(false);
    setConfirmAction(null);
  };

  const handleReject = async () => {
    if (!confirmTarget) return;
    setConfirmLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    updateAppointmentStatus(confirmTarget.id, "rejected");
    toast.error("نوبت رد شد", `نوبت ${confirmTarget.patient} رد شد.`);
    setConfirmLoading(false);
    setConfirmAction(null);
  };

  const handleDelete = async () => {
    if (!confirmTarget) return;
    setConfirmLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    deleteAppointment(confirmTarget.id);
    toast.success("نوبت حذف شد", "نوبت مورد نظر از لیست حذف شد.");
    setConfirmLoading(false);
    setConfirmAction(null);
    setSelectedAptId(null);
  };

  const handleConfirm = () => {
    if (confirmAction?.type === "approve") return handleApprove();
    if (confirmAction?.type === "reject") return handleReject();
    if (confirmAction?.type === "delete") return handleDelete();
  };

  const clearAllFilters = () => {
    setActiveFilter("all");
    setDateFilter("all");
    setServiceFilter("all");
    setSearchQuery("");
    toast.info("پاک شد", "همه‌ی فیلترها پاک شدن.");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="نوبت‌ها"
        description="مدیریت، تأیید و پیگیری نوبت‌های بیماران"
        badge={
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-xs font-medium text-amber-700">
            <AlertCircle className="h-3 w-3" />
            {counts.pending + counts.contact_required} در انتظار بررسی
          </span>
        }
        actions={
          <>
            <button
              onClick={() =>
                toast.info("خروجی", "این قابلیت به‌زودی فعال می‌شود.")
              }
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium hover:bg-background transition"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">خروجی</span>
            </button>
            <button
              onClick={() => setNewModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-800 transition shadow-sm"
            >
              <Plus className="h-4 w-4" />
              نوبت جدید
            </button>
          </>
        }
      />

      {/* ═══ Filter Bar ═══ */}
      <div className="rounded-2xl border border-border bg-surface p-4 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو بر اساس نام، خدمت، کد نوبت یا شماره تماس..."
              className="w-full rounded-xl border border-border bg-background pr-10 pl-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition"
            />
          </div>

          {/* Date Filter */}
          <div className="relative">
            <button
              onClick={() => setDateDropdownOpen((v) => !v)}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition",
                dateFilter !== "all"
                  ? "border-brand-500 bg-brand-50 text-brand-800"
                  : "border-border bg-background hover:bg-brand-50 hover:border-brand-200"
              )}
            >
              <Calendar className="h-4 w-4 text-brand-700" />
              {DATE_FILTERS.find((d) => d.id === dateFilter)?.label}
              <ChevronDown
                className={cn(
                  "h-3 w-3 text-muted transition",
                  dateDropdownOpen && "rotate-180"
                )}
              />
            </button>

            {dateDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setDateDropdownOpen(false)}
                />
                <div className="absolute top-full right-0 mt-2 w-48 rounded-xl border border-border bg-surface shadow-elevated p-1.5 z-50">
                  {DATE_FILTERS.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => {
                        setDateFilter(d.id);
                        setDateDropdownOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm text-right transition",
                        dateFilter === d.id
                          ? "bg-brand-50 text-brand-800 font-medium"
                          : "text-foreground/80 hover:bg-background"
                      )}
                    >
                      <span>{d.label}</span>
                      {dateFilter === d.id && (
                        <Check className="h-4 w-4 text-brand-700" />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setFilterPanelOpen((v) => !v)}
            className={cn(
              "relative inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition",
              activeFiltersCount > 0
                ? "border-brand-500 bg-brand-50 text-brand-800"
                : "border-border bg-background hover:bg-brand-50 hover:border-brand-200"
            )}
          >
            <Filter className="h-4 w-4 text-brand-700" />
            فیلتر
            {activeFiltersCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-700 text-white text-[10px] font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* ═══ Expanded Filter Panel ═══ */}
        {filterPanelOpen && (
          <div className="rounded-xl border border-border bg-background p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-ink-800">
                فیلتر پیشرفته
              </h3>
              <button
                onClick={clearAllFilters}
                className="text-xs font-medium text-red-600 hover:text-red-700 transition"
              >
                پاک کردن همه
              </button>
            </div>

            {/* Service Filter */}
            <div>
              <label className="block text-xs font-medium text-muted mb-2">
                خدمت
              </label>
              <div className="flex flex-wrap gap-2">
                {SERVICE_FILTERS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setServiceFilter(s.id)}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs font-medium transition",
                      serviceFilter === s.id
                        ? "border-brand-500 bg-brand-50 text-brand-800"
                        : "border-border bg-surface text-muted hover:border-brand-300"
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Filters Display */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border">
                <span className="text-xs text-muted">
                  فیلترهای فعال:
                </span>
                {activeFilter !== "all" && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 border border-brand-200 px-2.5 py-1 text-[11px] font-medium text-brand-800">
                    {STATUS_FILTERS.find((s) => s.id === activeFilter)?.label}
                    <button onClick={() => setActiveFilter("all")}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {dateFilter !== "all" && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 border border-brand-200 px-2.5 py-1 text-[11px] font-medium text-brand-800">
                    {DATE_FILTERS.find((d) => d.id === dateFilter)?.label}
                    <button onClick={() => setDateFilter("all")}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {serviceFilter !== "all" && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 border border-brand-200 px-2.5 py-1 text-[11px] font-medium text-brand-800">
                    {serviceFilter}
                    <button onClick={() => setServiceFilter("all")}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {/* ═══ Status Tabs ═══ */}
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-1">
          {STATUS_FILTERS.map((f) => {
            const count = counts[f.id as keyof typeof counts] ?? 0;
            const isActive = activeFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={cn(
                  "shrink-0 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium transition-all",
                  isActive
                    ? "bg-brand-700 text-white shadow-sm"
                    : "bg-background text-muted hover:bg-brand-50 hover:text-brand-800"
                )}
              >
                <span>{f.label}</span>
                <span
                  className={cn(
                    "rounded-full px-1.5 text-[10px]",
                    isActive ? "bg-white/20" : "bg-surface"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ═══ Table ═══ */}
      <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-soft">
        <div className="hidden md:grid grid-cols-12 gap-3 items-center border-b border-border bg-background/50 px-5 py-3 text-xs font-bold text-muted">
          <div className="col-span-3">بیمار</div>
          <div className="col-span-3">خدمت</div>
          <div className="col-span-2">تاریخ و ساعت</div>
          <div className="col-span-2">وضعیت</div>
          <div className="col-span-2 text-left">عملیات</div>
        </div>

        <div className="divide-y divide-border">
          {filtered.map((apt) => (
            <div
              key={apt.id}
              onClick={() => setSelectedAptId(apt.id)}
              className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center px-5 py-4 hover:bg-background/50 transition cursor-pointer"
            >
              <div className="md:col-span-3 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 font-bold text-sm">
                  {apt.patient.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-ink-800 truncate">
                    {apt.patient}
                  </div>
                  <div className="text-[11px] text-muted truncate" dir="ltr">
                    {apt.phone}
                  </div>
                </div>
              </div>

              <div className="md:col-span-3">
                <div className="text-sm text-ink-800">{apt.service}</div>
                <div className="text-[10px] text-muted font-mono">
                  {apt.id}
                </div>
              </div>

              <div className="md:col-span-2 flex items-center gap-2 text-sm text-muted">
                <Clock className="h-3.5 w-3.5" />
                <span>{apt.time}</span>
                <span className="text-[10px]">•</span>
                <span className="text-xs">{apt.date}</span>
              </div>

              <div className="md:col-span-2">
                <StatusBadge variant={apt.status} />
              </div>

              <div
                className="md:col-span-2 flex items-center justify-end gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                {apt.status === "pending" && (
                  <>
                    <button
                      onClick={() =>
                        setConfirmAction({
                          type: "approve",
                          appointmentId: apt.id,
                        })
                      }
                      className="rounded-lg bg-emerald-500 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-emerald-600 transition"
                    >
                      تأیید
                    </button>
                    <button
                      onClick={() =>
                        setConfirmAction({
                          type: "reject",
                          appointmentId: apt.id,
                        })
                      }
                      className="rounded-lg bg-red-50 px-3 py-1.5 text-[11px] font-bold text-red-600 hover:bg-red-100 transition"
                    >
                      رد
                    </button>
                  </>
                )}
                <button
                  onClick={() => setSelectedAptId(apt.id)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-background transition"
                  aria-label="جزئیات"
                >
                  <MoreVertical className="h-4 w-4 text-muted" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <EmptyState
            title="نوبتی پیدا نشد"
            description={
              searchQuery || activeFiltersCount > 0
                ? "با فیلترهای فعلی نوبتی پیدا نشد. فیلترها را تغییر دهید."
                : "هنوز نوبتی ثبت نشده است."
            }
            action={
              activeFiltersCount > 0 || searchQuery ? (
                <button
                  onClick={clearAllFilters}
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-medium hover:bg-surface transition"
                >
                  <X className="h-4 w-4" />
                  پاک کردن فیلترها
                </button>
              ) : undefined
            }
          />
        )}
      </div>

      {/* Footer info */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
        <span>
          نمایش <strong className="text-ink-800">{filtered.length}</strong> از{" "}
          <strong className="text-ink-800">{appointments.length}</strong> نوبت
        </span>
        <span>آخرین به‌روزرسانی: چند لحظه پیش</span>
      </div>

      {/* ═══ Drawer ═══ */}
      <Drawer
        open={!!selectedApt}
        onClose={() => setSelectedAptId(null)}
        title="جزئیات نوبت"
        description={selectedApt?.id}
        size="md"
        footer={
          selectedApt && (
            <div className="flex items-center gap-2">
              {selectedApt.status === "pending" && (
                <>
                  <button
                    onClick={() =>
                      setConfirmAction({
                        type: "reject",
                        appointmentId: selectedApt.id,
                      })
                    }
                    className="flex-1 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-100 transition"
                  >
                    رد نوبت
                  </button>
                  <button
                    onClick={() =>
                      setConfirmAction({
                        type: "approve",
                        appointmentId: selectedApt.id,
                      })
                    }
                    className="flex-1 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-600 transition"
                  >
                    تأیید نوبت
                  </button>
                </>
              )}
              {selectedApt.status !== "pending" && (
                <button
                  onClick={() =>
                    setConfirmAction({
                      type: "delete",
                      appointmentId: selectedApt.id,
                    })
                  }
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-100 transition"
                >
                  <Trash2 className="h-4 w-4" />
                  حذف نوبت
                </button>
              )}
            </div>
          )
        }
      >
        {selectedApt && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-background p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-700 text-white font-bold text-lg">
                  {selectedApt.patient.charAt(0)}
                </div>
                <div>
                  <div className="text-base font-bold text-ink-800">
                    {selectedApt.patient}
                  </div>
                  <StatusBadge variant={selectedApt.status} className="mt-1" />
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-brand-700 shrink-0" />
                  <a
                    href={`tel:${selectedApt.phone}`}
                    className="text-ink-800 hover:text-brand-700 transition"
                    dir="ltr"
                  >
                    {selectedApt.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-brand-700 shrink-0" />
                  <a
                    href={`mailto:${selectedApt.email}`}
                    className="text-ink-800 hover:text-brand-700 transition"
                  >
                    {selectedApt.email}
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-ink-800 mb-3">
                اطلاعات خدمت
              </h3>
              <div className="rounded-2xl border border-border bg-background p-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted">خدمت</span>
                  <span className="font-bold text-ink-800">
                    {selectedApt.service}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted">مدت زمان</span>
                  <span className="font-medium text-ink-800">
                    {selectedApt.duration} دقیقه
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted">تاریخ</span>
                  <span className="font-medium text-ink-800">
                    {selectedApt.date}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted">ساعت</span>
                  <span className="font-medium text-ink-800">
                    {selectedApt.time}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm pt-3 border-t border-border">
                  <span className="text-muted">هزینه</span>
                  <span className="font-bold text-brand-700">
                    {selectedApt.price}
                    {selectedApt.price !== "مشاوره رایگان" && (
                      <span className="text-xs font-normal text-muted mr-1">
                        تومان
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </div>

            {selectedApt.notes && (
              <div>
                <h3 className="text-sm font-bold text-ink-800 mb-3">
                  یادداشت
                </h3>
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 leading-relaxed">
                  {selectedApt.notes}
                </div>
              </div>
            )}

            <div>
              <h3 className="text-sm font-bold text-ink-800 mb-3">
                اقدامات سریع
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() =>
                    toast.info("ارسال پیام", "این قابلیت به‌زودی فعال می‌شود.")
                  }
                  className="flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-3 py-3 text-xs font-medium hover:bg-brand-50 hover:border-brand-200 transition"
                >
                  <MessageSquare className="h-4 w-4 text-brand-700" />
                  ارسال پیام
                </button>
                <button
                  onClick={() =>
                    toast.info("ویرایش", "این قابلیت به‌زودی فعال می‌شود.")
                  }
                  className="flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-3 py-3 text-xs font-medium hover:bg-brand-50 hover:border-brand-200 transition"
                >
                  <Edit className="h-4 w-4 text-brand-700" />
                  ویرایش نوبت
                </button>
              </div>
            </div>
          </div>
        )}
      </Drawer>

      {/* ═══ Confirm Dialog ═══ */}
      <ConfirmDialog
        open={!!confirmAction}
        onClose={() => setConfirmAction(null)}
        onConfirm={handleConfirm}
        loading={confirmLoading}
        variant={
          confirmAction?.type === "approve"
            ? "success"
            : confirmAction?.type === "delete"
            ? "danger"
            : "warning"
        }
        title={
          confirmAction?.type === "approve"
            ? "تأیید نوبت"
            : confirmAction?.type === "reject"
            ? "رد نوبت"
            : "حذف نوبت"
        }
        description={
          confirmTarget
            ? confirmAction?.type === "approve"
              ? `آیا از تأیید نوبت «${confirmTarget.patient}» مطمئن هستید؟`
              : confirmAction?.type === "reject"
              ? `آیا از رد نوبت «${confirmTarget.patient}» مطمئن هستید؟ این عمل قابل بازگشت است.`
              : `آیا از حذف نوبت «${confirmTarget.patient}» مطمئن هستید؟ این عمل قابل بازگشت نیست.`
            : ""
        }
        confirmLabel={
          confirmAction?.type === "approve"
            ? "تأیید"
            : confirmAction?.type === "reject"
            ? "رد نوبت"
            : "حذف کن"
        }
      />

      {/* ═══ New Appointment Modal ═══ */}
      <Modal
        open={newModalOpen}
        onClose={() => setNewModalOpen(false)}
        title="ثبت نوبت جدید"
        description="اطلاعات بیمار و خدمت را وارد کنید"
        size="lg"
        footer={
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => setNewModalOpen(false)}
              className="rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-medium hover:bg-surface transition"
            >
              انصراف
            </button>
            <button
              onClick={() => {
                toast.success(
                  "نوبت ثبت شد",
                  "نوبت جدید با موفقیت ثبت شد. در انتظار تأیید."
                );
                setNewModalOpen(false);
              }}
              className="rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-800 transition"
            >
              ثبت نوبت
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink-800 mb-1.5">
                نام و نام خانوادگی
              </label>
              <input
                type="text"
                placeholder="مثلاً: علی محمدی"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-800 mb-1.5">
                شماره موبایل
              </label>
              <input
                type="tel"
                placeholder="۰۹۱۲..."
                dir="ltr"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition text-left"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-800 mb-1.5">
              خدمت
            </label>
            <select className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition">
              <option>ایمپلنت دندان</option>
              <option>لمینت سرامیکی</option>
              <option>ارتودنسی</option>
              <option>عصب‌کشی</option>
              <option>جرم‌گیری</option>
              <option>دندانپزشکی کودکان</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink-800 mb-1.5">
                تاریخ
              </label>
              <input
                type="text"
                placeholder="۱۴۰۳/۰۷/۱۵"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-800 mb-1.5">
                ساعت
              </label>
              <input
                type="text"
                placeholder="۱۰:۳۰"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-800 mb-1.5">
              توضیحات (اختیاری)
            </label>
            <textarea
              rows={3}
              placeholder="هر نکته‌ای که لازم است..."
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition resize-none"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}