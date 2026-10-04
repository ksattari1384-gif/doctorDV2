"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Phone,
  Mail,
  Calendar,
  Wallet,
  MessageSquare,
  User,
  MapPin,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/admin/page-header";
import { EmptyState } from "@/components/admin/empty-state";
import { Drawer } from "@/components/admin/drawer";
import { Modal } from "@/components/admin/modal";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { useToast } from "@/components/admin/toast";
import { useAdminStore } from "@/lib/stores/admin-store";

const formatPrice = (price: number) => price.toLocaleString("fa-IR");

export default function PatientsPage() {
  const toast = useToast();

  // ═══ Store ═══
  const patients = useAdminStore((s) => s.patients);
  const deletePatient = useAdminStore((s) => s.deletePatient);

  // ═══ UI State ═══
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "spent" | "count">("recent");
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(
    null
  );
  const [editingPatientId, setEditingPatientId] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [newModalOpen, setNewModalOpen] = useState(false);

  // ═══ Derived from store (همیشه تازه) ═══
  const selectedPatient = useMemo(
    () => patients.find((p) => p.id === selectedPatientId) || null,
    [patients, selectedPatientId]
  );

  const editingPatient = useMemo(
    () => patients.find((p) => p.id === editingPatientId) || null,
    [patients, editingPatientId]
  );

  const deleteTarget = useMemo(
    () => patients.find((p) => p.id === deleteTargetId) || null,
    [patients, deleteTargetId]
  );

  // ═══ Filtered + Sorted ═══
  const filtered = useMemo(() => {
    let list = [...patients];

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(
        (p) =>
          `${p.firstName} ${p.lastName}`.toLowerCase().includes(q) ||
          p.phone.includes(q) ||
          p.email.toLowerCase().includes(q) ||
          p.nationalId.includes(q)
      );
    }

    if (sortBy === "spent") {
      list.sort((a, b) => b.totalSpent - a.totalSpent);
    } else if (sortBy === "count") {
      list.sort((a, b) => b.totalAppointments - a.totalAppointments);
    }

    return list;
  }, [patients, searchQuery, sortBy]);

  // ═══ Stats ═══
  const stats = useMemo(() => {
    const totalSpent = patients.reduce((sum, p) => sum + p.totalSpent, 0);
    const totalAppointments = patients.reduce(
      (sum, p) => sum + p.totalAppointments,
      0
    );
    return {
      total: patients.length,
      totalSpent,
      totalAppointments,
      avgSpent: patients.length > 0 ? totalSpent / patients.length : 0,
    };
  }, [patients]);

  // ═══ Actions ═══
  const handleDelete = async () => {
    if (!deleteTargetId) return;
    setDeleteLoading(true);
    await new Promise((r) => setTimeout(r, 600));

    const name = deleteTarget
      ? `${deleteTarget.firstName} ${deleteTarget.lastName}`
      : "";
    deletePatient(deleteTargetId);

    toast.success("بیمار حذف شد", `«${name}» از لیست حذف شد.`);
    setDeleteLoading(false);
    setDeleteTargetId(null);
    setSelectedPatientId(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="بیماران"
        description="مدیریت پرونده و اطلاعات بیماران مطب"
        badge={
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 border border-brand-200 px-3 py-1 text-xs font-medium text-brand-800">
            <User className="h-3 w-3" />
            {stats.total} بیمار
          </span>
        }
        actions={
          <button
            onClick={() => setNewModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-800 transition shadow-sm"
          >
            <Plus className="h-4 w-4" />
            بیمار جدید
          </button>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          {
            label: "کل بیماران",
            value: stats.total,
            icon: User,
            color: "bg-brand-50 text-brand-700",
          },
          {
            label: "کل نوبت‌ها",
            value: stats.totalAppointments,
            icon: Calendar,
            color: "bg-emerald-50 text-emerald-700",
          },
          {
            label: "کل درآمد",
            value: `${formatPrice(stats.totalSpent)}`,
            unit: "ت",
            icon: Wallet,
            color: "bg-purple-50 text-purple-700",
          },
          {
            label: "میانگین هزینه",
            value: formatPrice(Math.round(stats.avgSpent)),
            unit: "ت",
            icon: Wallet,
            color: "bg-gold-50 text-gold-700",
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
                  {s.unit && (
                    <span className="text-[10px] font-normal text-muted mr-1">
                      {s.unit}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-border bg-surface p-4 space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو بر اساس نام، شماره تماس، ایمیل یا کد ملی..."
              className="w-full rounded-xl border border-border bg-background pr-10 pl-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition"
            />
          </div>

          <div className="flex items-center gap-1 rounded-xl border border-border bg-background p-1">
            {[
              { id: "recent", label: "جدیدترین" },
              { id: "spent", label: "بیشترین درآمد" },
              { id: "count", label: "بیشترین نوبت" },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setSortBy(s.id as typeof sortBy)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-medium transition",
                  sortBy === s.id
                    ? "bg-brand-700 text-white"
                    : "text-muted hover:bg-surface hover:text-ink-800"
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-soft">
        <div className="hidden md:grid grid-cols-12 gap-3 items-center border-b border-border bg-background/50 px-5 py-3 text-xs font-bold text-muted">
          <div className="col-span-4">بیمار</div>
          <div className="col-span-2">تماس</div>
          <div className="col-span-2">نوبت‌ها</div>
          <div className="col-span-2">آخرین مراجعه</div>
          <div className="col-span-2 text-left">عملیات</div>
        </div>

        <div className="divide-y divide-border">
          {filtered.map((patient) => (
            <div
              key={patient.id}
              onClick={() => setSelectedPatientId(patient.id)}
              className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center px-5 py-4 hover:bg-background/50 transition cursor-pointer"
            >
              <div className="md:col-span-4 flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-brand-800 text-white font-bold text-sm">
                  {patient.firstName.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-ink-800 truncate">
                    {patient.firstName} {patient.lastName}
                  </div>
                  <div className="text-[10px] text-muted font-mono truncate">
                    {patient.id}
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 min-w-0">
                <div className="text-xs text-ink-800 truncate" dir="ltr">
                  {patient.phone}
                </div>
                <div className="text-[10px] text-muted truncate">
                  {patient.email}
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="text-sm font-bold text-ink-800">
                  {patient.totalAppointments} نوبت
                </div>
                <div className="text-[10px] text-brand-700 font-medium">
                  {formatPrice(patient.totalSpent)} ت
                </div>
              </div>

              <div className="md:col-span-2 flex items-center gap-1.5 text-xs text-muted">
                <Clock className="h-3.5 w-3.5" />
                {patient.lastVisit}
              </div>

              <div
                className="md:col-span-2 flex items-center justify-end gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <a
                  href={`tel:${patient.phone}`}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-emerald-600 hover:bg-emerald-50 transition"
                  aria-label="تماس"
                >
                  <Phone className="h-4 w-4" />
                </a>
                <button
                  onClick={() => setSelectedPatientId(patient.id)}
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
            title="بیماری پیدا نشد"
            description={
              searchQuery
                ? `هیچ بیماری با «${searchQuery}» مطابقت ندارد.`
                : "هنوز بیماری ثبت نشده است."
            }
          />
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-muted">
        <span>
          نمایش <strong className="text-ink-800">{filtered.length}</strong> از{" "}
          <strong className="text-ink-800">{patients.length}</strong> بیمار
        </span>
        <span>
          مرتب‌سازی:{" "}
          {sortBy === "recent"
            ? "جدیدترین"
            : sortBy === "spent"
            ? "بیشترین درآمد"
            : "بیشترین نوبت"}
        </span>
      </div>

      <Drawer
        open={!!selectedPatient}
        onClose={() => setSelectedPatientId(null)}
        title="پرونده‌ی بیمار"
        description={selectedPatient?.id}
        size="md"
        footer={
          selectedPatient && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDeleteTargetId(selectedPatient.id)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-100 transition"
                title="حذف بیمار"
              >
                <Trash2 className="h-4 w-4" />
                <span className="hidden sm:inline">حذف</span>
              </button>
              <button
                onClick={() => {
                  setEditingPatientId(selectedPatient.id);
                  setSelectedPatientId(null);
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-700 px-4 py-3 text-sm font-bold text-white hover:bg-brand-800 transition"
              >
                <Edit className="h-4 w-4" />
                ویرایش اطلاعات
              </button>
            </div>
          )
        }
      >
        {selectedPatient && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-background p-5 text-center">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-brand-800 text-white font-bold text-2xl mb-3">
                {selectedPatient.firstName.charAt(0)}
              </div>
              <h3 className="text-lg font-bold text-ink-800">
                {selectedPatient.firstName} {selectedPatient.lastName}
              </h3>
              <div className="text-xs text-muted font-mono mt-1">
                {selectedPatient.id}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl border border-border bg-background p-3 text-center">
                <div className="text-[10px] text-muted mb-1">کل نوبت‌ها</div>
                <div className="text-lg font-bold text-ink-800">
                  {selectedPatient.totalAppointments}
                </div>
              </div>
              <div className="rounded-xl border border-border bg-background p-3 text-center">
                <div className="text-[10px] text-muted mb-1">کل پرداخت</div>
                <div className="text-sm font-bold text-brand-700">
                  {formatPrice(selectedPatient.totalSpent)}
                  <span className="text-[9px] font-normal text-muted mr-1">
                    ت
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-ink-800 mb-3">
                اطلاعات تماس
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3">
                  <Phone className="h-4 w-4 text-brand-700 shrink-0" />
                  <span className="text-sm text-ink-800" dir="ltr">
                    {selectedPatient.phone}
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3">
                  <Mail className="h-4 w-4 text-brand-700 shrink-0" />
                  <span className="text-sm text-ink-800 truncate">
                    {selectedPatient.email}
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3">
                  <MapPin className="h-4 w-4 text-brand-700 shrink-0" />
                  <span className="text-xs text-muted leading-relaxed">
                    {selectedPatient.address}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-ink-800 mb-3">
                اطلاعات شخصی
              </h4>
              <div className="rounded-2xl border border-border bg-background p-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted">کد ملی</span>
                  <span className="font-medium text-ink-800 font-mono">
                    {selectedPatient.nationalId}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted">تاریخ تولد</span>
                  <span className="font-medium text-ink-800">
                    {selectedPatient.birthDate}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted">جنسیت</span>
                  <span className="font-medium text-ink-800">
                    {selectedPatient.gender === "male" ? "آقا" : "خانم"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm pt-3 border-t border-border">
                  <span className="text-muted">تاریخ عضویت</span>
                  <span className="font-medium text-ink-800">
                    {selectedPatient.createdAt}
                  </span>
                </div>
              </div>
            </div>

            {selectedPatient.notes && (
              <div>
                <h4 className="text-sm font-bold text-ink-800 mb-3">
                  یادداشت داخلی
                </h4>
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 leading-relaxed">
                  {selectedPatient.notes}
                </div>
              </div>
            )}

            <div>
              <h4 className="text-sm font-bold text-ink-800 mb-3">
                اقدامات سریع
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${selectedPatient.phone}`}
                  className="flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-3 py-3 text-xs font-medium hover:bg-brand-50 hover:border-brand-200 transition"
                >
                  <Phone className="h-4 w-4 text-emerald-600" />
                  تماس
                </a>
                <button
                  onClick={() =>
                    toast.info("ارسال پیام", "این قابلیت به‌زودی فعال می‌شود.")
                  }
                  className="flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-3 py-3 text-xs font-medium hover:bg-brand-50 hover:border-brand-200 transition"
                >
                  <MessageSquare className="h-4 w-4 text-brand-700" />
                  پیام
                </button>
                <button
                  onClick={() =>
                    toast.info(
                      "سابقه‌ی نوبت‌ها",
                      "این قابلیت به‌زودی فعال می‌شود."
                    )
                  }
                  className="flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-3 py-3 text-xs font-medium hover:bg-brand-50 hover:border-brand-200 transition"
                >
                  <Calendar className="h-4 w-4 text-brand-700" />
                  نوبت‌ها
                </button>
                <button
                  onClick={() =>
                    toast.info(
                      "سابقه‌ی پرداخت",
                      "این قابلیت به‌زودی فعال می‌شود."
                    )
                  }
                  className="flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-3 py-3 text-xs font-medium hover:bg-brand-50 hover:border-brand-200 transition"
                >
                  <Wallet className="h-4 w-4 text-brand-700" />
                  پرداخت‌ها
                </button>
              </div>
            </div>
          </div>
        )}
      </Drawer>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={handleDelete}
        loading={deleteLoading}
        variant="danger"
        title="حذف بیمار"
        description={
          deleteTarget
            ? `آیا از حذف «${deleteTarget.firstName} ${deleteTarget.lastName}» مطمئن هستید؟ تمام سوابق نوبت‌ها و پرداخت‌ها نیز حذف خواهند شد.`
            : ""
        }
        confirmLabel="حذف کن"
      />

      <Modal
        open={newModalOpen || !!editingPatient}
        onClose={() => {
          setNewModalOpen(false);
          setEditingPatientId(null);
        }}
        title={editingPatient ? "ویرایش بیمار" : "افزودن بیمار جدید"}
        description={
          editingPatient
            ? "اطلاعات بیمار را به‌روزرسانی کنید"
            : "اطلاعات بیمار جدید را وارد کنید"
        }
        size="lg"
        footer={
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => {
                setNewModalOpen(false);
                setEditingPatientId(null);
              }}
              className="rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-medium hover:bg-surface transition"
            >
              انصراف
            </button>
            <button
              onClick={() => {
                toast.success(
                  editingPatient ? "اطلاعات ویرایش شد" : "بیمار اضافه شد",
                  "تغییرات با موفقیت ذخیره شد."
                );
                setNewModalOpen(false);
                setEditingPatientId(null);
              }}
              className="rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-800 transition"
            >
              {editingPatient ? "ذخیره تغییرات" : "افزودن بیمار"}
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink-800 mb-1.5">
                نام
              </label>
              <input
                type="text"
                defaultValue={editingPatient?.firstName || ""}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-800 mb-1.5">
                نام خانوادگی
              </label>
              <input
                type="text"
                defaultValue={editingPatient?.lastName || ""}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink-800 mb-1.5">
                شماره موبایل
              </label>
              <input
                type="tel"
                defaultValue={editingPatient?.phone || ""}
                dir="ltr"
                placeholder="۰۹۱۲..."
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition text-left"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-800 mb-1.5">
                ایمیل
              </label>
              <input
                type="email"
                defaultValue={editingPatient?.email || ""}
                dir="ltr"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition text-left"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink-800 mb-1.5">
                کد ملی
              </label>
              <input
                type="text"
                defaultValue={editingPatient?.nationalId || ""}
                dir="ltr"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition text-left"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-800 mb-1.5">
                تاریخ تولد
              </label>
              <input
                type="text"
                defaultValue={editingPatient?.birthDate || ""}
                placeholder="۱۳۷۰/۰۵/۱۲"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-800 mb-1.5">
              جنسیت
            </label>
            <div className="flex gap-2">
              {[
                { id: "male", label: "آقا" },
                { id: "female", label: "خانم" },
              ].map((g) => (
                <label
                  key={g.id}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-medium cursor-pointer transition",
                    editingPatient?.gender === g.id
                      ? "border-brand-500 bg-brand-50 text-brand-800"
                      : "border-border bg-background text-muted hover:border-brand-300"
                  )}
                >
                  <input
                    type="radio"
                    name="gender"
                    defaultChecked={editingPatient?.gender === g.id}
                    className="sr-only"
                  />
                  {g.label}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-800 mb-1.5">
              آدرس
            </label>
            <input
              type="text"
              defaultValue={editingPatient?.address || ""}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-800 mb-1.5">
              یادداشت داخلی
            </label>
            <textarea
              rows={3}
              defaultValue={editingPatient?.notes || ""}
              placeholder="هر نکته‌ای که لازم است..."
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition resize-none"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}