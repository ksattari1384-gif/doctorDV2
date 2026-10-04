"use client";

import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type DrawerSide = "right" | "left";
type DrawerSize = "sm" | "md" | "lg" | "xl";

type DrawerProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  side?: DrawerSide;
  size?: DrawerSize;
  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;
};

const SIZE_CLASSES: Record<DrawerSize, string> = {
  sm: "w-full max-w-sm",
  md: "w-full max-w-md",
  lg: "w-full max-w-xl",
  xl: "w-full max-w-3xl",
};

export function Drawer({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  side = "right",
  size = "md",
  closeOnBackdrop = true,
  closeOnEsc = true,
}: DrawerProps) {
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  useEffect(() => {
    if (!open || !closeOnEsc) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, closeOnEsc, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]" dir="rtl">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink-900/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={closeOnBackdrop ? onClose : undefined}
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "absolute inset-y-0 flex flex-col bg-surface shadow-2xl transition-transform duration-300",
          side === "right"
            ? "right-0 border-l border-border"
            : "left-0 border-r border-border",
          SIZE_CLASSES[size]
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-4">
          <div className="flex-1 min-w-0">
            {title && (
              <h2 className="text-base md:text-lg font-bold text-ink-800">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-1 text-xs md:text-sm text-muted leading-relaxed">
                {description}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted hover:bg-background hover:text-ink-800 transition"
            aria-label="بستن"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="border-t border-border px-5 py-4 bg-background/50">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}