"use client";

import { useMemo, useState } from "react";
import { ServiceFilters } from "./service-filters";
import { ServiceGrid } from "./service-grid";
import { useAdminStore } from "@/lib/stores/admin-store";

export function ServicesSection() {
  const services = useAdminStore((s) => s.services);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [subCategory, setSubCategory] = useState("all");

  const filtered = useMemo(() => {
    return services.filter((s) => {
      // فقط خدمات فعال
      if (!s.isActive) return false;

      // جستجو
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        if (
          !s.name.toLowerCase().includes(q) &&
          !s.shortDescription.toLowerCase().includes(q)
        ) {
          return false;
        }
      }

      // دسته‌بندی
      if (category !== "all" && s.category !== category) {
        return false;
      }

      // زیر‌دسته
      if (subCategory === "popular") {
        if (!s.isFeatured) return false;
      }

      return true;
    });
  }, [services, search, category, subCategory]);

  return (
    <>
      <ServiceFilters
        onSearch={setSearch}
        onCategoryChange={(c) => {
          setCategory(c);
          setSubCategory("all");
        }}
        onSubCategoryChange={setSubCategory}
      />
      <ServiceGrid services={filtered} />
    </>
  );
}