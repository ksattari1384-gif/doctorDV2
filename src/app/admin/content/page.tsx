"use client";

import { useState } from "react";
import {
  Save,
  Upload,
  Video,
  Image as ImageIcon,
  Phone,
  Mail,
  MapPin,
  Instagram,
  MessageCircle,
  Globe,
  Type,
  Sparkles,
  X,
  Trash2,
  Link as LinkIcon,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/admin/page-header";
import { useToast } from "@/components/admin/toast";
import { Modal } from "@/components/admin/modal";
import { useAdminStore } from "@/lib/stores/admin-store";
import { parseVideoUrl } from "@/lib/utils/video";

type Tab = "brand" | "hero" | "contact" | "social";

export default function ContentPage() {
  const toast = useToast();

  // ═══ Store ═══
  const content = useAdminStore((s) => s.content);
  const updateContent = useAdminStore((s) => s.updateContent);

  // ═══ UI State ═══
  const [activeTab, setActiveTab] = useState<Tab>("brand");
  const [saving, setSaving] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [videoUrlDraft, setVideoUrlDraft] = useState("");

  // ═══ Actions ═══
  const update = <K extends keyof typeof content>(
    key: K,
    value: (typeof content)[K]
  ) => {
    updateContent({ [key]: value } as any);
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success("ذخیره شد", "تغییرات با موفقیت ذخیره شد.");
    setSaving(false);
  };

  // ═══ Logo Upload → Base64 ═══
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("حجم زیاده", "حداکثر ۲ مگابایت مجاز است.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      update("logoUrl", base64);
      toast.success("لوگو آپلود شد", "لوگو با موفقیت ذخیره شد.");
    };
    reader.readAsDataURL(file);
  };

  // ═══ Poster Upload → Base64 ═══
  const handlePosterUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("حجم زیاده", "حداکثر ۲ مگابایت مجاز است.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      update("heroPosterUrl", base64);
      toast.success("تصویر آپلود شد", "تصویر جایگزین ذخیره شد.");
    };
    reader.readAsDataURL(file);
  };

  // ═══ Video URL Save ═══
  const handleSaveVideo = () => {
    const url = videoUrlDraft.trim();
    if (!url) {
      toast.error("خطا", "لطفاً یک آدرس معتبر وارد کنید.");
      return;
    }

    update("heroVideoUrl", url);

    if (/aparat\.com/.test(url)) {
      toast.success("ویدیو ثبت شد", "ویدیوی آپارات با موفقیت ثبت شد.");
    } else if (/youtube\.com|youtu\.be/.test(url)) {
      toast.success("ویدیو ثبت شد", "ویدیوی یوتیوب با موفقیت ثبت شد.");
    } else if (/\.(mp4|webm|ogg|mov)(\?|$)/i.test(url)) {
      toast.success("ویدیو ثبت شد", "ویدیوی MP4 با موفقیت ثبت شد.");
    } else {
      toast.warning(
        "ثبت شد، ولی...",
        "این لینک ممکن است پخش نشود. از لینک MP4، آپارات یا یوتیوب استفاده کنید."
      );
    }

    setVideoModalOpen(false);
    setVideoUrlDraft("");
  };

  // ═══ Parsed Video ═══
  const parsedVideo = parseVideoUrl(content.heroVideoUrl || "");
  const parsedDraft = parseVideoUrl(videoUrlDraft);

  const TABS = [
    { id: "brand" as Tab, label: "برند", icon: Type },
    { id: "hero" as Tab, label: "ویدیو Hero", icon: Video },
    { id: "contact" as Tab, label: "اطلاعات تماس", icon: Phone },
    { id: "social" as Tab, label: "شبکه‌های اجتماعی", icon: Globe },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="محتوای سایت"
        description="مدیریت لوگو، ویدیو، اطلاعات تماس و لینک‌های سایت"
        actions={
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
        }
      />

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

      {/* ═══ TAB 1: Brand ═══ */}
      {activeTab === "brand" && (
        <div className="space-y-5">
          {/* Logo */}
          <div className="rounded-2xl border border-border bg-surface p-5">
            <h2 className="text-base font-bold text-ink-800 mb-1">لوگو</h2>
            <p className="text-xs text-muted mb-4">
              فرمت PNG، JPG یا SVG — حداکثر ۲ مگابایت
            </p>

            <div className="flex flex-wrap items-center gap-5">
              <div className="relative">
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-700 to-ink-900 border-2 border-gold-500/40 text-gold-400 font-bold text-3xl shadow-md overflow-hidden">
                  {content.logoUrl ? (
                    <img
                      src={content.logoUrl}
                      alt="لوگو"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    "ق"
                  )}
                </div>
                {content.logoUrl && (
                  <button
                    onClick={() => update("logoUrl", "")}
                    className="absolute -top-2 -left-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white shadow-md hover:bg-red-600 transition"
                    aria-label="حذف"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              <div className="flex-1 min-w-[200px] space-y-2">
                <label className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium hover:bg-brand-50 hover:border-brand-300 transition cursor-pointer">
                  <Upload className="h-4 w-4 text-brand-700" />
                  {content.logoUrl ? "تغییر لوگو" : "آپلود لوگو"}
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/svg+xml,image/webp"
                    className="sr-only"
                    onChange={handleLogoUpload}
                  />
                </label>
                <div className="text-[11px] text-muted">
                  پیشنهاد: اندازه‌ی مربع، پس‌زمینه‌ی شفاف
                </div>
              </div>
            </div>
          </div>

          {/* Brand name & slogan */}
          <div className="rounded-2xl border border-border bg-surface p-5 space-y-4">
            <h2 className="text-base font-bold text-ink-800">
              نام و شعار برند
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-ink-800 mb-1.5">
                  نام برند
                </label>
                <input
                  type="text"
                  value={content.brandName}
                  onChange={(e) => update("brandName", e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink-800 mb-1.5">
                  زیرعنوان
                </label>
                <input
                  type="text"
                  value={content.brandSubtitle}
                  onChange={(e) => update("brandSubtitle", e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-800 mb-1.5">
                شعار اصلی
              </label>
              <input
                type="text"
                value={content.slogan}
                onChange={(e) => update("slogan", e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition"
              />
              <div className="mt-1 text-[11px] text-muted">
                این متن در Hero صفحه‌ی اصلی نمایش داده می‌شود
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="rounded-2xl border border-border bg-surface p-5">
            <h2 className="text-base font-bold text-ink-800 mb-4">
              پیش‌نمایش
            </h2>
            <div className="rounded-2xl bg-gradient-to-br from-ink-900 via-brand-900 to-ink-900 p-8 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-700 to-ink-900 border-2 border-gold-500/40 text-gold-400 font-bold text-xl mb-3 overflow-hidden">
                {content.logoUrl ? (
                  <img
                    src={content.logoUrl}
                    alt={content.brandName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  "ق"
                )}
              </div>
              <div className="text-xl font-bold text-white">
                {content.brandName || "نام برند"}
              </div>
              <div className="text-sm text-gold-300/90 mt-1">
                {content.brandSubtitle || "زیرعنوان"}
              </div>
              <div className="text-sm text-white/80 mt-3">
                {content.slogan || "شعار"}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══ TAB 2: Hero Video ═══ */}
      {activeTab === "hero" && (
        <div className="space-y-5">
          {/* Enabled toggle */}
          <div className="rounded-2xl border border-border bg-surface p-5">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <h2 className="text-base font-bold text-ink-800">
                  ویدیو پس‌زمینه
                </h2>
                <p className="text-xs text-muted mt-1">
                  نمایش ویدیو در بالای صفحه‌ی اصلی به جای پس‌زمینه‌ی ساده
                </p>
              </div>
              <button
                onClick={() => update("heroEnabled", !content.heroEnabled)}
                className={cn(
                  "relative h-6 w-11 rounded-full transition shrink-0",
                  content.heroEnabled ? "bg-emerald-500" : "bg-border"
                )}
                aria-label={content.heroEnabled ? "غیرفعال" : "فعال"}
              >
                <span
                  className={cn(
                    "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all",
                    content.heroEnabled ? "right-0.5" : "right-[22px]"
                  )}
                />
              </button>
            </div>
          </div>

          {/* Current video preview */}
          {content.heroVideoUrl && parsedVideo.type !== "empty" ? (
            <div className="rounded-2xl border border-border bg-surface overflow-hidden">
              <div className="relative aspect-video bg-ink-900">
                {parsedVideo.type === "mp4" ? (
                  <video
                    src={parsedVideo.url}
                    className="absolute inset-0 h-full w-full object-cover"
                    muted
                    loop
                    playsInline
                    controls
                  />
                ) : parsedVideo.embedUrl ? (
                  <iframe
                    src={parsedVideo.embedUrl}
                    className="absolute inset-0 h-full w-full"
                    allow="autoplay; fullscreen; encrypted-media"
                    allowFullScreen
                    title="Video Preview"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-white/60 text-sm">
                    پیش‌نمایش در دسترس نیست
                  </div>
                )}
              </div>
              <div className="p-5 flex flex-wrap items-center gap-3 justify-between border-t border-border">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <Video className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-ink-800">
                      {parsedVideo.type === "aparat" && "ویدیوی آپارات فعال است"}
                      {parsedVideo.type === "youtube" && "ویدیوی یوتیوب فعال است"}
                      {parsedVideo.type === "mp4" && "ویدیوی MP4 فعال است"}
                      {parsedVideo.type === "unknown" && "ویدیو ثبت شده"}
                    </div>
                    <div
                      className="text-xs text-muted truncate max-w-[280px]"
                      dir="ltr"
                    >
                      {content.heroVideoUrl}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setVideoUrlDraft(content.heroVideoUrl);
                      setVideoModalOpen(true);
                    }}
                    className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium hover:bg-brand-50 hover:border-brand-200 transition"
                  >
                    <LinkIcon className="h-4 w-4" />
                    تغییر
                  </button>
                  <button
                    onClick={() => {
                      update("heroVideoUrl", "");
                      toast.success("حذف شد", "ویدیو حذف شد.");
                    }}
                    className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-100 transition"
                  >
                    <Trash2 className="h-4 w-4" />
                    حذف
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-border bg-surface p-10 text-center">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-700 mb-3">
                <Video className="h-7 w-7" />
              </div>
              <h3 className="text-base font-bold text-ink-800 mb-1">
                هیچ ویدیویی تنظیم نشده
              </h3>
              <p className="text-xs text-muted mb-4 max-w-md mx-auto leading-relaxed">
                لینک ویدیو از MP4، آپارات یا یوتیوب را وارد کنید
              </p>
              <button
                onClick={() => {
                  setVideoUrlDraft("");
                  setVideoModalOpen(true);
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-800 transition"
              >
                <LinkIcon className="h-4 w-4" />
                افزودن لینک ویدیو
              </button>
            </div>
          )}

          {/* Poster image */}
          <div className="rounded-2xl border border-border bg-surface p-5">
            <h2 className="text-base font-bold text-ink-800 mb-1">
              تصویر جایگزین
            </h2>
            <p className="text-xs text-muted mb-4">
              در حین بارگذاری ویدیو نمایش داده می‌شود — برای موبایل هم مفید است
            </p>

            <div className="flex flex-wrap items-center gap-5">
              <div className="relative">
                <div className="flex h-24 w-40 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-100 to-brand-200 border border-border overflow-hidden">
                  {content.heroPosterUrl ? (
                    <img
                      src={content.heroPosterUrl}
                      alt="Poster"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="h-8 w-8 text-brand-700/50" />
                  )}
                </div>
                {content.heroPosterUrl && (
                  <button
                    onClick={() => update("heroPosterUrl", "")}
                    className="absolute -top-2 -left-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white shadow-md hover:bg-red-600 transition"
                    aria-label="حذف"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium hover:bg-brand-50 hover:border-brand-300 transition cursor-pointer">
                  <Upload className="h-4 w-4 text-brand-700" />
                  {content.heroPosterUrl ? "تغییر تصویر" : "آپلود تصویر"}
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    className="sr-only"
                    onChange={handlePosterUpload}
                  />
                </label>
                <div className="mt-1 text-[11px] text-muted">
                  پیشنهاد: ۱۹۲۰×۱۰۸۰ پیکسل — حداکثر ۲ مگابایت
                </div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-800 leading-relaxed">
              <strong>نکته:</strong> می‌توانید از لینک‌های MP4 مستقیم، آپارات
              (مثل <code dir="ltr" className="bg-amber-100 px-1 rounded">aparat.com/v/xxxxx</code>)،
              یا یوتیوب استفاده کنید. برای بهترین کیفیت، MP4 با حجم کمتر از ۲۰
              مگابایت توصیه می‌شود.
            </div>
          </div>
        </div>
      )}

      {/* ═══ TAB 3: Contact ═══ */}
      {activeTab === "contact" && (
        <div className="space-y-5">
          <div className="rounded-2xl border border-border bg-surface p-5 space-y-4">
            <h2 className="text-base font-bold text-ink-800">
              اطلاعات تماس اصلی
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-ink-800 mb-1.5 flex items-center gap-2">
                  <Phone className="h-4 w-4 text-brand-700" />
                  شماره تلفن
                </label>
                <input
                  type="text"
                  value={content.phone}
                  onChange={(e) => update("phone", e.target.value)}
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
                  value={content.email}
                  onChange={(e) => update("email", e.target.value)}
                  dir="ltr"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-left focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-800 mb-1.5 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand-700" />
                آدرس
              </label>
              <textarea
                rows={2}
                value={content.address}
                onChange={(e) => update("address", e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-800 mb-1.5">
                خلاصه‌ی ساعات کاری
              </label>
              <input
                type="text"
                value={content.workingHoursShort}
                onChange={(e) => update("workingHoursShort", e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition"
              />
              <div className="mt-1 text-[11px] text-muted">
                برای نمایش در فوتر و کارت درباره مطب
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="rounded-2xl border border-border bg-surface p-5">
            <h2 className="text-base font-bold text-ink-800 mb-4">
              پیش‌نمایش
            </h2>
            <div className="rounded-2xl bg-gradient-to-br from-cream-100 via-cream-200 to-cream-100 p-5 space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink-900 text-gold-400">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-ink-800 mb-0.5">
                    آدرس
                  </div>
                  <div className="text-xs text-ink-800/70 leading-relaxed">
                    {content.address}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink-900 text-gold-400">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-ink-800 mb-0.5">
                    تماس
                  </div>
                  <div className="text-xs text-ink-800/70" dir="ltr">
                    {content.phone}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink-900 text-gold-400">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-ink-800 mb-0.5">
                    ایمیل
                  </div>
                  <div className="text-xs text-ink-800/70">
                    {content.email}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══ TAB 4: Social ═══ */}
      {activeTab === "social" && (
        <div className="space-y-5">
          <div className="rounded-2xl border border-border bg-surface p-5 space-y-4">
            <h2 className="text-base font-bold text-ink-800">
              لینک‌های شبکه‌های اجتماعی
            </h2>
            <p className="text-xs text-muted">
              این لینک‌ها در فوتر و Floating Bar نمایش داده می‌شوند
            </p>

            <div>
              <label className="block text-sm font-medium text-ink-800 mb-1.5 flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-emerald-600" />
                واتساپ
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="url"
                  value={content.whatsapp}
                  onChange={(e) => update("whatsapp", e.target.value)}
                  dir="ltr"
                  placeholder="https://wa.me/989120000000"
                  className="flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm text-left focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition"
                />
                <a
                  href={content.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-background hover:bg-brand-50 transition"
                  aria-label="تست"
                >
                  <ExternalLink className="h-4 w-4 text-muted" />
                </a>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-800 mb-1.5 flex items-center gap-2">
                <Instagram className="h-4 w-4 text-pink-600" />
                اینستاگرام
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="url"
                  value={content.instagram}
                  onChange={(e) => update("instagram", e.target.value)}
                  dir="ltr"
                  placeholder="https://instagram.com/username"
                  className="flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm text-left focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition"
                />
                <a
                  href={content.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-background hover:bg-brand-50 transition"
                  aria-label="تست"
                >
                  <ExternalLink className="h-4 w-4 text-muted" />
                </a>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-800 mb-1.5 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-red-600" />
                Google Maps
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="url"
                  value={content.googleMaps}
                  onChange={(e) => update("googleMaps", e.target.value)}
                  dir="ltr"
                  placeholder="https://maps.google.com/?q=..."
                  className="flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm text-left focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition"
                />
                <a
                  href={content.googleMaps}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-background hover:bg-brand-50 transition"
                  aria-label="تست"
                >
                  <ExternalLink className="h-4 w-4 text-muted" />
                </a>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-800 mb-1.5 flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-blue-600" />
                تلگرام (اختیاری)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="url"
                  value={content.telegram}
                  onChange={(e) => update("telegram", e.target.value)}
                  dir="ltr"
                  placeholder="https://t.me/username"
                  className="flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm text-left focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition"
                />
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="rounded-2xl border border-border bg-surface p-5">
            <h2 className="text-base font-bold text-ink-800 mb-4">
              پیش‌نمایش در Floating Bar
            </h2>
            <div className="flex items-center gap-2">
              <a
                href={content.googleMaps}
                target="_blank"
                rel="noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-white shadow-md hover:bg-red-600 transition"
              >
                <MapPin className="h-5 w-5" />
              </a>
              <a
                href={content.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow-md hover:bg-green-600 transition"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href={content.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white shadow-md hover:opacity-90 transition"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={`tel:${content.phone}`}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow-md hover:bg-blue-600 transition"
              >
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ═══ Video URL Modal ═══ */}
      <Modal
        open={videoModalOpen}
        onClose={() => {
          setVideoModalOpen(false);
          setVideoUrlDraft("");
        }}
        title="آدرس ویدیو"
        description="لینک MP4، آپارات یا یوتیوب را وارد کنید"
        size="md"
        footer={
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => {
                setVideoModalOpen(false);
                setVideoUrlDraft("");
              }}
              className="rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-medium hover:bg-surface transition"
            >
              انصراف
            </button>
            <button
              onClick={handleSaveVideo}
              className="rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-800 transition"
            >
              ذخیره ویدیو
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink-800 mb-1.5">
              آدرس ویدیو
            </label>
            <input
              type="url"
              value={videoUrlDraft}
              onChange={(e) => setVideoUrlDraft(e.target.value)}
              dir="ltr"
              placeholder="https://www.aparat.com/v/xxxxx  یا  https://example.com/video.mp4"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-left focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition"
            />
            <div className="mt-1.5 text-[11px] text-muted leading-relaxed">
              پشتیبانی از: آپارات، یوتیوب، فایل MP4/WebM مستقیم
            </div>
          </div>

          {videoUrlDraft && (
            <div className="rounded-2xl border border-border bg-background overflow-hidden">
              <div className="relative aspect-video bg-ink-900">
                {parsedDraft.type === "mp4" ? (
                  <video
                    src={parsedDraft.url}
                    className="absolute inset-0 h-full w-full object-cover"
                    muted
                    loop
                    playsInline
                    controls
                  />
                ) : parsedDraft.embedUrl ? (
                  <iframe
                    src={parsedDraft.embedUrl}
                    className="absolute inset-0 h-full w-full"
                    allow="autoplay; fullscreen; encrypted-media"
                    allowFullScreen
                    title="Video Preview"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-white/60 text-sm">
                    پیش‌نمایش در دسترس نیست
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}