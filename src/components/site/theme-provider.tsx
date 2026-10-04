"use client";

import { useEffect } from "react";
import { useAdminStore } from "@/lib/stores/admin-store";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const content = useAdminStore((s) => s.content);

  useEffect(() => {
    const root = document.documentElement;

    // ─── رنگ اصلی ─────────────────────────
    root.style.setProperty("--theme-primary", content.themePrimary);
    root.style.setProperty("--theme-accent", content.themeAccent);
    root.style.setProperty(
      "--theme-primary-soft",
      hexToRgba(content.themePrimary, 0.1)
    );
    root.style.setProperty(
      "--theme-primary-medium",
      hexToRgba(content.themePrimary, 0.2)
    );

    // ─── Radius ────────────────────────────
    const radiusMap = {
      sm: "6px",
      md: "10px",
      lg: "14px",
      xl: "22px",
    } as const;
    const radius =
      radiusMap[content.themeRadius as keyof typeof radiusMap] || "14px";
    root.style.setProperty("--theme-radius", radius);

    // ─── Mode ──────────────────────────────
    root.classList.remove("light", "dark");

    if (content.themeMode === "auto") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      root.classList.add(prefersDark ? "dark" : "light");
    } else {
      root.classList.add(content.themeMode);
    }
  }, [
    content.themePrimary,
    content.themeAccent,
    content.themeRadius,
    content.themeMode,
  ]);

  return <>{children}</>;
}

function hexToRgba(hex: string, alpha: number): string {
  const cleanHex = hex.replace("#", "");
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}