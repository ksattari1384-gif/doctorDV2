"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

const MAIN_CATEGORIES = [
  { id: "all", label: "همه", icon: "✨" },
  { id: "cosmetic", label: "زیبایی", icon: "💎" },
  { id: "therapeutic", label: "درمانی", icon: "🦷" },
  { id: "surgery", label: "جراحی", icon: "⚕️" },
  { id: "preventive", label: "پیشگیری", icon: "🛡️" },
];

const SUB_CATEGORIES: Record<string, { id: string; label: string }[]> = {
  all: [
    { id: "popular", label: "محبوب‌ترین‌ها" },
    { id: "new", label: "جدید" },
    { id: "special", label: "پیشنهاد ویژه" },
  ],
  cosmetic: [
    { id: "laminate", label: "لمینت" },
    { id: "composite", label: "کامپوزیت" },
    { id: "whitening", label: "بلیچینگ" },
  ],
  therapeutic: [
    { id: "root-canal", label: "عصب‌کشی" },
    { id: "filling", label: "ترمیم" },
    { id: "extraction", label: "کشیدن" },
  ],
  surgery: [
    { id: "implant", label: "ایمپلنت" },
    { id: "wisdom", label: "دندان عقل" },
  ],
  preventive: [
    { id: "scaling", label: "جرم‌گیری" },
    { id: "checkup", label: "معاینه" },
  ],
};

type ServiceFiltersProps = {
  onCategoryChange?: (id: string) => void;
  onSubCategoryChange?: (id: string) => void;
  onSearch?: (query: string) => void;
};

export function ServiceFilters({
  onCategoryChange,
  onSubCategoryChange,
  onSearch,
}: ServiceFiltersProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSub, setActiveSub] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategory = (id: string) => {
    setActiveCategory(id);
    const firstSub = SUB_CATEGORIES[id]?.[0]?.id || "";
    setActiveSub(firstSub);
    onCategoryChange?.(id);
    onSubCategoryChange?.(firstSub);
  };

  return (
    <div className="mt-6 md:mt-8 space-y-3">
      <div className="relative">
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            onSearch?.(e.target.value);
          }}
          placeholder="جستجو در خدمات..."
          className="w-full rounded-2xl border border-border bg-surface pr-11 pl-4 py-3.5 text-sm placeholder:text-muted focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {MAIN_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategory(cat.id)}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium transition-all",
                isActive
                  ? "bg-gold-500 text-ink-900 shadow-md shadow-gold-500/20"
                  : "bg-brand-900 text-white/85 hover:bg-brand-800"
              )}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {SUB_CATEGORIES[activeCategory] && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {SUB_CATEGORIES[activeCategory].map((sub) => {
            const isActive = activeSub === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => {
                  setActiveSub(sub.id);
                  onSubCategoryChange?.(sub.id);
                }}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition-all",
                  isActive
                    ? "border-gold-500 bg-gold-500/10 text-gold-700"
                    : "border-border bg-surface text-muted hover:border-brand-300"
                )}
              >
                {sub.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}