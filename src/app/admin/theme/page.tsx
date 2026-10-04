"use client";

import { useMemo, useState } from "react";
import {
  Save,
  Palette,
  Type,
  Sparkles,
  Check,
  Sun,
  Moon,
  Monitor,
  RotateCcw,
  Sliders,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/admin/page-header";
import { useToast } from "@/components/admin/toast";
import { useAdminStore } from "@/lib/stores/admin-store";

type ThemeColors = {
  primary: string;
  primaryDark: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  muted: string;
  border: string;
};

type ThemePreset = {
  id: string;
  name: string;
  description: string;
  colors: ThemeColors;
  mode: "light" | "dark";
};

type RadiusOption = "sm" | "md" | "lg" | "xl";
type Mode = "light" | "dark" | "auto";

const FONTS = [
  { id: "vazirmatn", name: "وزیرمتن" },
  { id: "estedad", name: "استعداد" },
  { id: "dana", name: "دانا" },
  { id: "iransans", name: "ایران‌سنس" },
];

const PRESETS: ThemePreset[] = [
  {
    id: "teal-gold",
    name: "تیل-طلایی",
    description: "پیش‌فرض فعلی، حرفه‌ای و پزشکی",
    mode: "light",
    colors: {
      primary: "#0f766e",
      primaryDark: "#115e59",
      accent: "#d4af37",
      background: "#fbfbf8",
      surface: "#ffffff",
      text: "#0f172a",
      muted: "#64748b",
      border: "#e7e5e4",
    },
  },
  {
    id: "clinical-blue",
    name: "آبی کلینیکی",
    description: "حس پاکیزگی و اعتماد پزشکی",
    mode: "light",
    colors: {
      primary: "#0369a1",
      primaryDark: "#075985",
      accent: "#0ea5e9",
      background: "#f8fafc",
      surface: "#ffffff",
      text: "#0f172a",
      muted: "#64748b",
      border: "#e2e8f0",
    },
  },
  {
    id: "luxury-navy",
    name: "سرمه‌ای لوکس",
    description: "ظاهری رسمی و مجلل",
    mode: "light",
    colors: {
      primary: "#1e293b",
      primaryDark: "#0f172a",
      accent: "#c9a227",
      background: "#fafaf9",
      surface: "#ffffff",
      text: "#0c0a09",
      muted: "#78716c",
      border: "#e7e5e4",
    },
  },
  {
    id: "soft-green",
    name: "سبز آرام",
    description: "طبیعی، آرام‌بخش و صمیمی",
    mode: "light",
    colors: {
      primary: "#16a34a",
      primaryDark: "#15803d",
      accent: "#eab308",
      background: "#f7fee7",
      surface: "#ffffff",
      text: "#14532d",
      muted: "#65a30d",
      border: "#d9f99d",
    },
  },
  {
    id: "elegant-pink",
    name: "صورتی زیبایی",
    description: "مناسب خدمات زیبایی و لمینت",
    mode: "light",
    colors: {
      primary: "#be185d",
      primaryDark: "#9d174d",
      accent: "#f59e0b",
      background: "#fff7fa",
      surface: "#ffffff",
      text: "#500724",
      muted: "#9f1239",
      border: "#fbcfe8",
    },
  },
  {
    id: "dark-teal",
    name: "تیل تیره",
    description: "حالت تاریک لوکس برای شب",
    mode: "dark",
    colors: {
      primary: "#14b8a6",
      primaryDark: "#0d9488",
      accent: "#d4af37",
      background: "#0b1f1d",
      surface: "#0f2926",
      text: "#f0fdfa",
      muted: "#94a3b8",
      border: "#134e4a",
    },
  },
];

export default function ThemePage() {
  const toast = useToast();

  // ═══ Store ═══
  const content = useAdminStore((s) => s.content);
  const updateTheme = useAdminStore((s) => s.updateTheme);

  // ═══ Derived from store ═══
  const themePrimary = content.themePrimary;
  const themeAccent = content.themeAccent;
  const themeFont = content.themeFont;
  const themeRadius = content.themeRadius as RadiusOption;
  const themeMode = content.themeMode as Mode;

  // ═══ Derived colors from current preset ═══
  const [customColors, setCustomColors] = useState<ThemeColors>(
    PRESETS[0].colors
  );
  const [activePreset, setActivePreset] = useState("teal-gold");
  const [previewMode, setPreviewMode] = useState<"mobile" | "desktop">(
    "desktop"
  );
  const [saving, setSaving] = useState(false);

  const currentColors = useMemo<ThemeColors>(() => {
    const preset = PRESETS.find((p) => p.id === activePreset);
    if (preset) return preset.colors;
    return customColors;
  }, [activePreset, customColors]);

  // ═══ Actions ═══
  const handlePresetSelect = (preset: ThemePreset) => {
    setActivePreset(preset.id);
    setCustomColors(preset.colors);
    updateTheme({
      themePrimary: preset.colors.primary,
      themeAccent: preset.colors.accent,
      themeMode: preset.mode,
    });
    toast.info("تم اعمال شد", `تم «${preset.name}» انتخاب شد.`);
  };

  const updateCustomColor = (key: keyof ThemeColors, value: string) => {
    setCustomColors((prev) => ({ ...prev, [key]: value }));
    setActivePreset("custom");
    if (key === "primary") updateTheme({ themePrimary: value });
    if (key === "accent") updateTheme({ themeAccent: value });
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success("ذخیره شد", "تنظیمات تم با موفقیت ذخیره شد.");
    setSaving(false);
  };

  const handleReset = () => {
    setCustomColors(PRESETS[0].colors);
    setActivePreset("teal-gold");
    updateTheme({
      themePrimary: PRESETS[0].colors.primary,
      themeAccent: PRESETS[0].colors.accent,
      themeFont: "vazirmatn",
      themeRadius: "lg",
      themeMode: "light",
    });
    toast.info("بازنشانی شد", "تنظیمات به حالت پیش‌فرض برگشت.");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="تم و ظاهر"
        description="رنگ‌بندی، فونت و ظاهر کلی سایت را شخصی‌سازی کنید"
        badge={
          activePreset === "custom" ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 border border-purple-200 px-3 py-1 text-xs font-medium text-purple-700">
              <Sliders className="h-3 w-3" />
              سفارشی
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 border border-brand-200 px-3 py-1 text-xs font-medium text-brand-800">
              <Palette className="h-3 w-3" />
              {PRESETS.find((p) => p.id === activePreset)?.name}
            </span>
          )
        }
        actions={
          <>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium hover:bg-background transition"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="hidden sm:inline">بازنشانی</span>
            </button>
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
                  ذخیره
                </>
              )}
            </button>
          </>
        }
      />

      {/* ═══ Presets ═══ */}
      <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-soft">
        <div className="border-b border-border p-5">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="h-4 w-4 text-gold-500" />
            <h2 className="text-base font-bold text-ink-800">تم‌های آماده</h2>
          </div>
          <p className="text-xs text-muted">
            یکی از تم‌های زیر را انتخاب کنید یا از پایین رنگ‌ها را شخصی‌سازی
            کنید
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-5">
          {PRESETS.map((preset) => {
            const isActive = activePreset === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handlePresetSelect(preset)}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border-2 p-4 text-right transition-all hover:shadow-md",
                  isActive
                    ? "border-brand-500 shadow-md"
                    : "border-border hover:border-brand-300"
                )}
              >
                {isActive && (
                  <div className="absolute top-3 left-3 flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-white shadow-md">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                )}

                <div className="flex gap-1 mb-3">
                  <div
                    className="h-12 flex-1 rounded-lg shadow-sm"
                    style={{ background: preset.colors.primary }}
                  />
                  <div
                    className="h-12 w-8 rounded-lg shadow-sm"
                    style={{ background: preset.colors.accent }}
                  />
                  <div
                    className="h-12 w-8 rounded-lg shadow-sm"
                    style={{
                      background: preset.colors.background,
                      border: `1px solid ${preset.colors.border}`,
                    }}
                  />
                </div>

                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-bold text-ink-800">
                    {preset.name}
                  </h3>
                  {preset.mode === "dark" && (
                    <Moon className="h-3 w-3 text-muted" />
                  )}
                </div>
                <p className="text-[11px] text-muted leading-relaxed">
                  {preset.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* ═══ Customization ═══ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Colors */}
        <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-soft">
          <div className="border-b border-border p-5">
            <div className="flex items-center gap-2 mb-1">
              <Palette className="h-4 w-4 text-brand-700" />
              <h2 className="text-base font-bold text-ink-800">
                رنگ‌های سفارشی
              </h2>
            </div>
            <p className="text-xs text-muted">
              برای شخصی‌سازی، هر رنگ را تغییر دهید
            </p>
          </div>

          <div className="p-5 space-y-4">
            {[
              { key: "primary" as const, label: "رنگ اصلی" },
              { key: "primaryDark" as const, label: "رنگ اصلی تیره" },
              { key: "accent" as const, label: "رنگ تأکید (Accent)" },
              { key: "background" as const, label: "پس‌زمینه" },
              { key: "surface" as const, label: "سطح کارت" },
              { key: "text" as const, label: "متن" },
              { key: "muted" as const, label: "متن محو" },
              { key: "border" as const, label: "حاشیه‌ها" },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between gap-3"
              >
                <label className="text-sm font-medium text-ink-800 min-w-[130px]">
                  {item.label}
                </label>
                <div className="flex items-center gap-2 flex-1">
                  <div className="relative">
                    <input
                      type="color"
                      value={customColors[item.key]}
                      onChange={(e) =>
                        updateCustomColor(item.key, e.target.value)
                      }
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div
                      className="h-10 w-14 rounded-lg border-2 border-border shadow-sm cursor-pointer hover:scale-105 transition"
                      style={{ background: customColors[item.key] }}
                    />
                  </div>
                  <input
                    type="text"
                    value={customColors[item.key]}
                    onChange={(e) =>
                      updateCustomColor(item.key, e.target.value)
                    }
                    dir="ltr"
                    className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-xs text-left font-mono focus:border-brand-500 focus:outline-none transition"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Typography & Layout */}
        <div className="space-y-6">
          {/* Fonts */}
          <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-soft">
            <div className="border-b border-border p-5">
              <div className="flex items-center gap-2 mb-1">
                <Type className="h-4 w-4 text-brand-700" />
                <h2 className="text-base font-bold text-ink-800">فونت</h2>
              </div>
              <p className="text-xs text-muted">فونت اصلی متن‌های سایت</p>
            </div>

            <div className="p-5 space-y-2">
              {FONTS.map((f) => {
                const isActive = themeFont === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => updateTheme({ themeFont: f.id })}
                    className={cn(
                      "w-full flex items-center justify-between gap-3 rounded-xl border-2 p-4 transition-all text-right",
                      isActive
                        ? "border-brand-500 bg-brand-50"
                        : "border-border hover:border-brand-300"
                    )}
                  >
                    <div>
                      <div className="text-sm font-bold text-ink-800">
                        {f.name}
                      </div>
                      <div className="text-[11px] text-muted mt-0.5">
                        نمونه‌ی نمایش متن فارسی
                      </div>
                    </div>
                    {isActive && (
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white">
                        <Check className="h-3.5 w-3.5" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Radius */}
          <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-soft">
            <div className="border-b border-border p-5">
              <div className="flex items-center gap-2 mb-1">
                <Sliders className="h-4 w-4 text-brand-700" />
                <h2 className="text-base font-bold text-ink-800">
                  گردی گوشه‌ها
                </h2>
              </div>
              <p className="text-xs text-muted">
                میزان گردی کارت‌ها و دکمه‌ها
              </p>
            </div>

            <div className="p-5">
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: "sm" as RadiusOption, label: "کم", radius: "4px" },
                  { id: "md" as RadiusOption, label: "متوسط", radius: "8px" },
                  { id: "lg" as RadiusOption, label: "زیاد", radius: "14px" },
                  {
                    id: "xl" as RadiusOption,
                    label: "خیلی زیاد",
                    radius: "22px",
                  },
                ].map((r) => {
                  const isActive = themeRadius === r.id;
                  return (
                    <button
                      key={r.id}
                      onClick={() => updateTheme({ themeRadius: r.id })}
                      className={cn(
                        "flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all",
                        isActive
                          ? "border-brand-500 bg-brand-50"
                          : "border-border hover:border-brand-300"
                      )}
                    >
                      <div
                        className="h-10 w-10 border-2 border-ink-800"
                        style={{ borderRadius: r.radius }}
                      />
                      <span className="text-[11px] font-medium">
                        {r.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mode */}
          <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-soft">
            <div className="border-b border-border p-5">
              <div className="flex items-center gap-2 mb-1">
                <Sun className="h-4 w-4 text-brand-700" />
                <h2 className="text-base font-bold text-ink-800">حالت</h2>
              </div>
              <p className="text-xs text-muted">
                حالت روشن، تاریک یا خودکار (بر اساس سیستم کاربر)
              </p>
            </div>

            <div className="p-5">
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "light" as Mode, label: "روشن", icon: Sun },
                  { id: "dark" as Mode, label: "تاریک", icon: Moon },
                  { id: "auto" as Mode, label: "خودکار", icon: Monitor },
                ].map((m) => {
                  const Icon = m.icon;
                  const isActive = themeMode === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => updateTheme({ themeMode: m.id })}
                      className={cn(
                        "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
                        isActive
                          ? "border-brand-500 bg-brand-50"
                          : "border-border hover:border-brand-300"
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-6 w-6",
                          isActive ? "text-brand-700" : "text-muted"
                        )}
                      />
                      <span
                        className={cn(
                          "text-xs font-medium",
                          isActive ? "text-brand-800" : "text-muted"
                        )}
                      >
                        {m.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Live Preview ═══ */}
      <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-soft">
        <div className="border-b border-border p-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Eye className="h-4 w-4 text-brand-700" />
              <h2 className="text-base font-bold text-ink-800">
                پیش‌نمایش زنده
              </h2>
            </div>
            <p className="text-xs text-muted">
              تغییرات بالا فوراً در این پیش‌نمایش اعمال می‌شوند
            </p>
          </div>

          <div className="flex items-center gap-1 rounded-xl border border-border bg-background p-1">
            <button
              onClick={() => setPreviewMode("desktop")}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium transition",
                previewMode === "desktop"
                  ? "bg-brand-700 text-white"
                  : "text-muted hover:text-ink-800"
              )}
            >
              دسکتاپ
            </button>
            <button
              onClick={() => setPreviewMode("mobile")}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium transition",
                previewMode === "mobile"
                  ? "bg-brand-700 text-white"
                  : "text-muted hover:text-ink-800"
              )}
            >
              موبایل
            </button>
          </div>
        </div>

        <div
          className="p-6 flex justify-center"
          style={{ background: currentColors.background }}
        >
          <div
            className={cn(
              "transition-all duration-500",
              previewMode === "mobile" ? "w-[375px]" : "w-full max-w-3xl"
            )}
          >
            <div
              className="rounded-2xl overflow-hidden shadow-2xl"
              style={{ background: currentColors.background }}
            >
              {/* Mock Header */}
              <div
                className="flex items-center justify-between p-4 border-b"
                style={{
                  background: currentColors.surface,
                  borderColor: currentColors.border,
                }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl font-bold text-sm"
                    style={{
                      background: currentColors.primary,
                      color: "#ffffff",
                    }}
                  >
                    ق
                  </div>
                  <div>
                    <div
                      className="text-xs font-bold"
                      style={{ color: currentColors.text }}
                    >
                      {content.brandName}
                    </div>
                    <div
                      className="text-[10px]"
                      style={{ color: currentColors.muted }}
                    >
                      {content.brandSubtitle}
                    </div>
                  </div>
                </div>
                <button
                  className="rounded-lg px-3 py-1.5 text-[11px] font-bold"
                  style={{
                    background: currentColors.accent,
                    color: currentColors.text,
                  }}
                >
                  رزرو نوبت
                </button>
              </div>

              {/* Mock Hero */}
              <div
                className="p-8 text-center"
                style={{
                  background: `linear-gradient(135deg, ${currentColors.primaryDark}, ${currentColors.primary})`,
                }}
              >
                <div
                  className="inline-flex h-16 w-16 items-center justify-center rounded-full font-bold text-xl mb-3"
                  style={{
                    background: currentColors.primary,
                    color: currentColors.accent,
                    border: `2px solid ${currentColors.accent}66`,
                  }}
                >
                  ق
                </div>
                <h1 className="text-xl font-bold text-white">
                  {content.brandName}
                </h1>
                <p
                  className="text-xs mt-1"
                  style={{ color: currentColors.accent }}
                >
                  {content.brandSubtitle}
                </p>
                <p className="text-xs mt-3 text-white/80">{content.slogan}</p>
              </div>

              {/* Mock Content */}
              <div className="p-5 space-y-3">
                {[
                  {
                    name: "ایمپلنت دندان",
                    desc: "جایگزینی دندان‌های از دست رفته با ایمپلنت تیتانیومی",
                    price: "۱۵,۰۰۰,۰۰۰ تومان",
                  },
                  {
                    name: "لمینت سرامیکی",
                    desc: "طراحی لبخند با لمینت‌های نازک و طبیعی",
                    price: "۸,۰۰۰,۰۰۰ تومان",
                  },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="rounded-xl p-4"
                    style={{
                      background: currentColors.surface,
                      border: `1px solid ${currentColors.border}`,
                    }}
                  >
                    <div
                      className="text-sm font-bold mb-1"
                      style={{ color: currentColors.text }}
                    >
                      {item.name}
                    </div>
                    <div
                      className="text-xs leading-relaxed"
                      style={{ color: currentColors.muted }}
                    >
                      {item.desc}
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div
                        className="text-sm font-bold"
                        style={{ color: currentColors.primary }}
                      >
                        {item.price}
                      </div>
                      <div
                        className="flex h-8 w-8 items-center justify-center rounded-full text-white text-xs"
                        style={{ background: currentColors.primary }}
                      >
                        +
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}