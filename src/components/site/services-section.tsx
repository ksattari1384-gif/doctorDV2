"use client";

import { useMemo, useState } from "react";
import { ServiceFilters } from "./service-filters";
import { ServiceGrid } from "./service-grid";
import { SERVICES } from "@/lib/data/services";

export function ServicesSection() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [subCategory, setSubCategory] = useState("all");

  const filtered = useMemo(() => {
    return SERVICES.filter((s) => {
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        if (
          !s.name.toLowerCase().includes(q) &&
          !s.description.toLowerCase().includes(q)
        ) {
          return false;
        }
      }

      if (category !== "all" && s.category !== category) {
        return false;
      }

      if (subCategory === "popular") {
        if (s.tag !== "محبوب" && s.tag !== "پیشنهاد ویژه") return false;
      }
      if (subCategory === "special") {
        if (s.tag !== "پیشنهاد ویژه") return false;
      }

      return true;
    });
  }, [search, category, subCategory]);

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