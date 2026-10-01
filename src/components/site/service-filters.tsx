"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { MAIN_CATEGORIES, SUB_CATEGORIES } from "@/lib/data/services";

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
  const [activeSub, setActiveSub] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategory = (id: string) => {
    setActiveCategory(id);
    setActiveSub("all");
    onCategoryChange?.(id);
    onSubCategoryChange?.("all");
  };

  return (
    <div className="mt-6 md:mt-8 space-y-2.5">
      {/* ─── Search bar (always visible) ──────────── */}
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
          className="w-full rounded-full border border-border bg-surface pr-11 pl-4 py-3.5 text-sm placeholder:text-muted focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition"
        />
      </div>

      {/* ─── Main category chips ────────────────────── */}
      <div className="flex items-center gap-1.5 rounded-full bg-ink-900/95 backdrop-blur-md p-1.5 shadow-xl shadow-ink-900/20">
        <div className="flex-1 flex gap-1 overflow-x-auto scrollbar-hide">
          {MAIN_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategory(cat.id)}
                className={cn(
                  "shrink-0 flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium transition-all whitespace-nowrap",
                  isActive
                    ? "bg-gold-500 text-ink-900 shadow-md"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                )}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── Sub-categories ─────────────────────────── */}
      {SUB_CATEGORIES[activeCategory] &&
        SUB_CATEGORIES[activeCategory].length > 1 && (
          <div className="flex items-center gap-1 rounded-full bg-ink-900/85 backdrop-blur-md p-1.5 shadow-lg shadow-ink-900/10">
            <div className="flex-1 flex gap-1 overflow-x-auto scrollbar-hide justify-end">
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
                      "shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition-all whitespace-nowrap",
                      isActive
                        ? "border-gold-500 bg-gold-500/10 text-gold-400"
                        : "border-transparent text-white/60 hover:border-white/20 hover:text-white/90"
                    )}
                  >
                    {sub.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
    </div>
  );
}