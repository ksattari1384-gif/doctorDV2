"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Clock,
  Eye,
  EyeOff,
  Sparkles,
  Star,
  ChevronDown,
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
  type Service,
  type ServiceCategory,
} from "@/lib/stores/admin-store";

const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  cosmetic: "زیبایی",
  therapeutic: "درمانی",
  surgery: "جراحی",
  preventive: "پیشگیری",
  kids: "کودکان",
};

const PAYMENT_LABELS: Record<Service["paymentMethod"], string> = {
  ONLINE: "آنلاین",
  IN_PERSON: "در محل",
  BOTH: "هر دو",
};

const FILTERS = [
  { id: "all", label: "همه" },
  { id: "cosmetic", label: "زیبایی" },
  { id: "therapeutic", label: "درمانی" },
  { id: "surgery", label: "جراحی" },
  { id: "preventive", label: "پیشگیری" },
  { id: "kids", label: "کودکان" },
];

const formatPrice = (price: number | null) => {
  if (!price) return "مشاوره رایگان";
  return price.toLocaleString("fa-IR");
};

// ═══ Form Type ═══
type ServiceForm = {
  name: string;
  slug: string;
  emoji: string;
  shortDescription: string;
  longDescription: string;
  category: ServiceCategory;
  price: string;
  duration: string;
  buffer: string;
  paymentMethod: "ONLINE" | "IN_PERSON" | "BOTH";
  isFeatured: boolean;
  isActive: boolean;
};

const emptyForm: ServiceForm = {
  name: "",
  slug: "",
  emoji: "",
  shortDescription: "",
  longDescription: "",
  category: "cosmetic",
  price: "",
  duration: "30",
  buffer: "15",
  paymentMethod: "IN_PERSON",
  isFeatured: false,
  isActive: true,
};

// ═══ Helper: slug از نام ═══
const slugify = (name: string, existingSlugs: string[]): string => {
  // اگه نام فارسی بود، از یه slug یکتا استفاده کن
  const baseSlug = name
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06FF\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();

  if (baseSlug && /^[a-z0-9-]+$/.test(baseSlug)) {
    let slug = baseSlug;
    let counter = 1;
    while (existingSlugs.includes(slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    return slug;
  }

  // اگه فارسی بود، یه slug تصادفی بساز
  let slug = `service-${Date.now().toString(36)}`;
  while (existingSlugs.includes(slug)) {
    slug = `service-${Date.now().toString(36)}-${Math.random()
      .toString(36)
      .slice(2, 6)}`;
  }
  return slug;
};

export default function ServicesPage() {
  const toast = useToast();

  // ═══ Store ═══
  const services = useAdminStore((s) => s.services);
  const toggleServiceActive = useAdminStore((s) => s.toggleServiceActive);
  const toggleServiceFeatured = useAdminStore((s) => s.toggleServiceFeatured);
  const addService = useAdminStore((s) => s.addService);
  const updateService = useAdminStore((s) => s.updateService);
  const deleteService = useAdminStore((s) => s.deleteService);

  // ═══ UI State ═══
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    null
  );
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<ServiceForm>(emptyForm);
  const [saving, setSaving] = useState(false);

  // ═══ Derived from store ═══
  const selectedService = useMemo(
    () => services.find((s) => s.id === selectedServiceId) || null,
    [services, selectedServiceId]
  );

  const deleteTarget = useMemo(
    () => services.find((s) => s.id === deleteTargetId) || null,
    [services, deleteTargetId]
  );

  const isEditing = !!editingServiceId;

  // ═══ Filtered ═══
  const filtered = useMemo(() => {
    return services.filter((s) => {
      if (activeFilter !== "all" && s.category !== activeFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        return (
          s.name.toLowerCase().includes(q) ||
          s.shortDescription.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [services, activeFilter, searchQuery]);

  // ═══ Stats ═══
  const stats = useMemo(() => {
    return {
      total: services.length,
      active: services.filter((s) => s.isActive).length,
      featured: services.filter((s) => s.isFeatured).length,
      categories: new Set(services.map((s) => s.category)).size,
    };
  }, [services]);

  // ═══ Actions ═══
  const handleToggleActive = (id: string) => {
    const service = services.find((s) => s.id === id);
    toggleServiceActive(id);
    if (service) {
      toast.success(
        service.isActive ? "غیرفعال شد" : "فعال شد",
        `خدمت «${service.name}» ${service.isActive ? "غیرفعال" : "فعال"} شد.`
      );
    }
  };

  const handleToggleFeatured = (id: string) => {
    toggleServiceFeatured(id);
  };

  // ═══ Form Actions ═══
  const openNewForm = () => {
    setForm(emptyForm);
    setEditingServiceId(null);
    setModalOpen(true);
  };

  const openEditForm = (service: Service) => {
    setForm({
      name: service.name,
      slug: service.slug,
      emoji: service.emoji,
      shortDescription: service.shortDescription,
      longDescription: service.longDescription,
      category: service.category,
      price: service.price ? service.price.toString() : "",
      duration: service.duration.toString(),
      buffer: service.buffer.toString(),
      paymentMethod: service.paymentMethod,
      isFeatured: service.isFeatured,
      isActive: service.isActive,
    });
    setEditingServiceId(service.id);
    setSelectedServiceId(null);
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    // اعتبارسنجی
    if (!form.name.trim()) {
      toast.error("خطا", "نام خدمت را وارد کنید.");
      return;
    }
    if (!form.emoji.trim()) {
      toast.error("خطا", "ایموجی خدمت را وارد کنید.");
      return;
    }

    setSaving(true);
    await new Promise((r) => setTimeout(r, 400));

    const parsedPrice = form.price
      ? parseInt(form.price.replace(/[,٬،\s]/g, "")) || null
      : null;

    if (isEditing && editingServiceId) {
      // ویرایش
      updateService(editingServiceId, {
        name: form.name.trim(),
        emoji: form.emoji.trim(),
        shortDescription: form.shortDescription.trim(),
        longDescription: form.longDescription.trim(),
        category: form.category,
        price: parsedPrice,
        priceFrom: parsedPrice !== null,
        duration: parseInt(form.duration) || 30,
        buffer: parseInt(form.buffer) || 15,
        paymentMethod: form.paymentMethod,
        isFeatured: form.isFeatured,
        isActive: form.isActive,
      });
      toast.success("خدمت ویرایش شد", `«${form.name}» به‌روزرسانی شد.`);
    } else {
      // افزودن
      const existingSlugs = services.map((s) => s.slug);
      const newService: Service = {
        id: `s-${Date.now().toString(36)}`,
        slug: slugify(form.name, existingSlugs),
        name: form.name.trim(),
        emoji: form.emoji.trim(),
        shortDescription: form.shortDescription.trim(),
        longDescription: form.longDescription.trim(),
        category: form.category,
        price: parsedPrice,
        priceFrom: parsedPrice !== null,
        duration: parseInt(form.duration) || 30,
        buffer: parseInt(form.buffer) || 15,
        paymentMethod: form.paymentMethod,
        isFeatured: form.isFeatured,
        isActive: form.isActive,
      };
      addService(newService);
      toast.success(
        "خدمت اضافه شد",
        `«${form.name}» به لیست خدمات اضافه شد.`
      );
    }

    setSaving(false);
    setModalOpen(false);
    setEditingServiceId(null);
    setForm(emptyForm);
  };

  const handleDelete = async () => {
    if (!deleteTargetId) return;
    setDeleteLoading(true);
    await new Promise((r) => setTimeout(r, 600));

    const name = deleteTarget?.name || "";
    deleteService(deleteTargetId);
    toast.success("خدمت حذف شد", `«${name}» از لیست حذف شد.`);

    setDeleteLoading(false);
    setDeleteTargetId(null);
    setSelectedServiceId(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="خدمات"
        description="مدیریت خدمات مطب — افزودن، ویرایش و حذف"
        badge={
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-medium text-emerald-700">
            <Sparkles className="h-3 w-3" />
            {stats.active} خدمت فعال
          </span>
        }
        actions={
          <button
            onClick={openNewForm}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-800 transition shadow-sm"
          >
            <Plus className="h-4 w-4" />
            خدمت جدید
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "کل خدمات", value: stats.total, icon: Sparkles },
          { label: "فعال", value: stats.active, icon: Eye },
          { label: "منتخب", value: stats.featured, icon: Star },
          { label: "دسته‌بندی", value: stats.categories, icon: ChevronDown },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-[11px] text-muted">{s.label}</div>
                <div className="text-lg font-bold text-ink-800">
                  {s.value}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search + Filter */}
      <div className="rounded-2xl border border-border bg-surface p-4 space-y-4">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجوی خدمات..."
            className="w-full rounded-xl border border-border bg-background pr-10 pl-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-1">
          {FILTERS.map((f) => {
            const isActive = activeFilter === f.id;
            const count =
              f.id === "all"
                ? services.length
                : services.filter((s) => s.category === f.id).length;
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

      {/* Services Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((service) => (
            <div
              key={service.id}
              className={cn(
                "group relative rounded-2xl border bg-surface p-5 transition-all hover:shadow-elevated",
                service.isActive ? "border-border" : "border-dashed opacity-70"
              )}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cream-200 text-3xl">
                    {service.emoji}
                  </div>
                  {service.isFeatured && (
                    <div className="absolute -top-1 -left-1 flex h-6 w-6 items-center justify-center rounded-full bg-gold-500 text-ink-900 shadow-md">
                      <Star className="h-3 w-3 fill-ink-900" />
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleToggleFeatured(service.id)}
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-lg transition",
                      service.isFeatured
                        ? "bg-gold-50 text-gold-600 hover:bg-gold-100"
                        : "hover:bg-background text-muted"
                    )}
                    title={
                      service.isFeatured ? "حذف از منتخب" : "افزودن به منتخب"
                    }
                  >
                    <Star
                      className={cn(
                        "h-4 w-4",
                        service.isFeatured && "fill-gold-500 text-gold-500"
                      )}
                    />
                  </button>
                  <button
                    onClick={() => handleToggleActive(service.id)}
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-lg transition",
                      service.isActive
                        ? "text-emerald-600 hover:bg-emerald-50"
                        : "text-muted hover:bg-background"
                    )}
                    title={service.isActive ? "غیرفعال کردن" : "فعال کردن"}
                  >
                    {service.isActive ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    onClick={() => setSelectedServiceId(service.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-background transition"
                  >
                    <MoreVertical className="h-4 w-4 text-muted" />
                  </button>
                </div>
              </div>

              <h3 className="text-base font-bold text-ink-800">
                {service.name}
              </h3>

              <span className="inline-block rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-medium text-brand-800 mb-3 mt-2">
                {CATEGORY_LABELS[service.category]}
              </span>

              <p className="text-xs text-muted leading-relaxed line-clamp-2 mb-4 min-h-[32px]">
                {service.shortDescription}
              </p>

              <div className="border-t border-border pt-4 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-brand-700">
                    {formatPrice(service.price)}
                    {service.price && (
                      <span className="text-[10px] font-normal text-muted mr-1">
                        تومان
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-muted mt-0.5">
                    <Clock className="h-3 w-3" />
                    {service.duration} دقیقه
                  </div>
                </div>
                <StatusBadge
                  variant={service.isActive ? "active" : "inactive"}
                  withIcon={false}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-surface">
          <EmptyState
            title="خدمتی پیدا نشد"
            description={
              searchQuery
                ? `هیچ خدمتی با «${searchQuery}» مطابقت ندارد.`
                : "خدمتی با این فیلتر وجود ندارد."
            }
            action={
              <button
                onClick={openNewForm}
                className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-800 transition"
              >
                <Plus className="h-4 w-4" />
                افزودن خدمت جدید
              </button>
            }
          />
        </div>
      )}

      {/* Drawer */}
      <Drawer
        open={!!selectedService}
        onClose={() => setSelectedServiceId(null)}
        title="جزئیات خدمت"
        description={selectedService?.name}
        size="md"
        footer={
          selectedService && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDeleteTargetId(selectedService.id)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-100 transition"
                title="حذف خدمت"
              >
                <Trash2 className="h-4 w-4" />
                <span className="hidden sm:inline">حذف</span>
              </button>
              <button
                onClick={() => openEditForm(selectedService)}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-700 px-4 py-3 text-sm font-bold text-white hover:bg-brand-800 transition"
              >
                <Edit className="h-4 w-4" />
                ویرایش خدمت
              </button>
            </div>
          )
        }
      >
        {selectedService && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-background p-4 text-center">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-cream-200 text-5xl mb-3">
                {selectedService.emoji}
              </div>
              <h3 className="text-lg font-bold text-ink-800">
                {selectedService.name}
              </h3>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="inline-block rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-medium text-brand-800">
                  {CATEGORY_LABELS[selectedService.category]}
                </span>
                {selectedService.isFeatured && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-gold-500 px-2.5 py-1 text-[10px] font-bold text-ink-900">
                    <Star className="h-3 w-3 fill-ink-900" />
                    منتخب
                  </span>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-ink-800 mb-2">توضیحات</h4>
              <p className="text-sm text-muted leading-relaxed">
                {selectedService.longDescription || "—"}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-ink-800 mb-3">
                اطلاعات کلی
              </h4>
              <div className="rounded-2xl border border-border bg-background p-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted">قیمت</span>
                  <span className="font-bold text-brand-700">
                    {formatPrice(selectedService.price)}
                    {selectedService.price && (
                      <span className="text-xs font-normal text-muted mr-1">
                        تومان
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted">مدت زمان</span>
                  <span className="font-medium text-ink-800">
                    {selectedService.duration} دقیقه
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted">فاصله بین نوبت‌ها</span>
                  <span className="font-medium text-ink-800">
                    {selectedService.buffer} دقیقه
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm pt-3 border-t border-border">
                  <span className="text-muted">روش پرداخت</span>
                  <span className="font-medium text-ink-800">
                    {PAYMENT_LABELS[selectedService.paymentMethod]}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-ink-800 mb-3">
                وضعیت نمایش
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3">
                  <span className="text-sm text-ink-800">فعال در سایت</span>
                  <button
                    onClick={() => handleToggleActive(selectedService.id)}
                    className={cn(
                      "relative h-6 w-11 rounded-full transition",
                      selectedService.isActive ? "bg-emerald-500" : "bg-border"
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all",
                        selectedService.isActive
                          ? "right-0.5"
                          : "right-[22px]"
                      )}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3">
                  <span className="text-sm text-ink-800">نمایش در منتخب</span>
                  <button
                    onClick={() => handleToggleFeatured(selectedService.id)}
                    className={cn(
                      "relative h-6 w-11 rounded-full transition",
                      selectedService.isFeatured ? "bg-gold-500" : "bg-border"
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all",
                        selectedService.isFeatured
                          ? "right-0.5"
                          : "right-[22px]"
                      )}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Drawer>

      {/* Confirm Delete */}
      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={handleDelete}
        loading={deleteLoading}
        variant="danger"
        title="حذف خدمت"
        description={
          deleteTarget
            ? `آیا از حذف خدمت «${deleteTarget.name}» مطمئن هستید؟ این عمل قابل بازگشت نیست.`
            : ""
        }
        confirmLabel="حذف کن"
      />

      {/* Add/Edit Modal */}
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingServiceId(null);
          setForm(emptyForm);
        }}
        title={isEditing ? "ویرایش خدمت" : "افزودن خدمت جدید"}
        description={
          isEditing
            ? "اطلاعات خدمت را به‌روزرسانی کنید"
            : "اطلاعات خدمت جدید را وارد کنید"
        }
        size="lg"
        footer={
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => {
                setModalOpen(false);
                setEditingServiceId(null);
                setForm(emptyForm);
              }}
              className="rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-medium hover:bg-surface transition"
            >
              انصراف
            </button>
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-800 transition disabled:opacity-70"
            >
              {saving ? (
                <>
                  <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  در حال ذخیره...
                </>
              ) : isEditing ? (
                "ذخیره تغییرات"
              ) : (
                "افزودن خدمت"
              )}
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink-800 mb-1.5">
                نام خدمت <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="مثلاً: ایمپلنت دندان"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-800 mb-1.5">
                ایموجی <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.emoji}
                onChange={(e) => setForm({ ...form, emoji: e.target.value })}
                placeholder="🦷"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-center focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-800 mb-1.5">
              توضیح کوتاه
            </label>
            <input
              type="text"
              value={form.shortDescription}
              onChange={(e) =>
                setForm({ ...form, shortDescription: e.target.value })
              }
              placeholder="توضیح مختصر که در کارت نمایش داده می‌شود"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-800 mb-1.5">
              توضیح کامل
            </label>
            <textarea
              rows={4}
              value={form.longDescription}
              onChange={(e) =>
                setForm({ ...form, longDescription: e.target.value })
              }
              placeholder="توضیحات کامل خدمت..."
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink-800 mb-1.5">
                دسته‌بندی
              </label>
              <select
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category: e.target.value as ServiceCategory,
                  })
                }
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition"
              >
                {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-800 mb-1.5">
                مدت زمان (دقیقه)
              </label>
              <input
                type="number"
                value={form.duration}
                onChange={(e) =>
                  setForm({ ...form, duration: e.target.value })
                }
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-800 mb-1.5">
                فاصله (دقیقه)
              </label>
              <input
                type="number"
                value={form.buffer}
                onChange={(e) => setForm({ ...form, buffer: e.target.value })}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink-800 mb-1.5">
                قیمت (تومان)
              </label>
              <input
                type="text"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="اگر خالی باشد، «مشاوره رایگان» نمایش داده می‌شود"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-800 mb-1.5">
                روش پرداخت
              </label>
              <select
                value={form.paymentMethod}
                onChange={(e) =>
                  setForm({
                    ...form,
                    paymentMethod: e.target.value as Service["paymentMethod"],
                  })
                }
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition"
              >
                {Object.entries(PAYMENT_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <label className="flex items-center gap-3 rounded-xl border border-border bg-background p-4 cursor-pointer hover:border-brand-300 transition">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) =>
                  setForm({ ...form, isActive: e.target.checked })
                }
                className="h-4 w-4 accent-emerald-500"
              />
              <div>
                <div className="text-sm font-medium text-ink-800">
                  فعال در سایت
                </div>
                <div className="text-[11px] text-muted mt-0.5">
                  نمایش در صفحات سایت
                </div>
              </div>
            </label>

            <label className="flex items-center gap-3 rounded-xl border border-border bg-background p-4 cursor-pointer hover:border-gold-300 transition">
              <input
                type="checkbox"
                checked={form.isFeatured}
                onChange={(e) =>
                  setForm({ ...form, isFeatured: e.target.checked })
                }
                className="h-4 w-4 accent-yellow-500"
              />
              <div>
                <div className="text-sm font-medium text-ink-800">
                  نمایش در منتخب
                </div>
                <div className="text-[11px] text-muted mt-0.5">
                  بخش «خدمات منتخب» صفحه اصلی
                </div>
              </div>
            </label>
          </div>
        </div>
      </Modal>
    </div>
  );
}