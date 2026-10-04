"use client";

import { AlertTriangle, Trash2, Info, CheckCircle2 } from "lucide-react";
import { Modal } from "./modal";
import { cn } from "@/lib/utils";

type ConfirmVariant = "danger" | "warning" | "info" | "success";

type ConfirmDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: ConfirmVariant;
  loading?: boolean;
};

const VARIANT_CONFIG: Record<
  ConfirmVariant,
  {
    icon: typeof AlertTriangle;
    iconBg: string;
    iconColor: string;
    buttonClass: string;
  }
> = {
  danger: {
    icon: Trash2,
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    buttonClass: "bg-red-500 hover:bg-red-600 text-white",
  },
  warning: {
    icon: AlertTriangle,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    buttonClass: "bg-amber-500 hover:bg-amber-600 text-white",
  },
  info: {
    icon: Info,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    buttonClass: "bg-blue-500 hover:bg-blue-600 text-white",
  },
  success: {
    icon: CheckCircle2,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    buttonClass: "bg-emerald-500 hover:bg-emerald-600 text-white",
  },
};

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "تأیید",
  cancelLabel = "انصراف",
  variant = "danger",
  loading = false,
}: ConfirmDialogProps) {
  const config = VARIANT_CONFIG[variant];
  const Icon = config.icon;

  const handleConfirm = async () => {
    await onConfirm();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="sm"
      hideCloseButton
      closeOnBackdrop={!loading}
    >
      <div className="text-center py-2">
        {/* Icon */}
        <div
          className={cn(
            "inline-flex h-16 w-16 items-center justify-center rounded-full mb-4",
            config.iconBg
          )}
        >
          <Icon className={cn("h-8 w-8", config.iconColor)} />
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-ink-800 mb-2">{title}</h3>

        {/* Description */}
        {description && (
          <p className="text-sm text-muted leading-relaxed mb-6">
            {description}
          </p>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 justify-center mt-6">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 rounded-xl border border-border bg-background px-5 py-3 text-sm font-medium hover:bg-surface transition disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className={cn(
              "flex-1 rounded-xl px-5 py-3 text-sm font-bold transition disabled:opacity-50 inline-flex items-center justify-center gap-2",
              config.buttonClass
            )}
          >
            {loading && (
              <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            )}
            {confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
}