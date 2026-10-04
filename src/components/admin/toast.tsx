"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ToastVariant = "success" | "error" | "warning" | "info";

type Toast = {
  id: string;
  variant: ToastVariant;
  title: string;
  description?: string;
  duration?: number;
};

type ToastContextType = {
  toast: (t: Omit<Toast, "id">) => void;
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  warning: (title: string, description?: string) => void;
  info: (title: string, description?: string) => void;
  dismiss: (id: string) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

const VARIANT_CONFIG: Record<
  ToastVariant,
  { icon: typeof CheckCircle2; className: string; iconBg: string }
> = {
  success: {
    icon: CheckCircle2,
    className: "border-emerald-200",
    iconBg: "bg-emerald-100 text-emerald-600",
  },
  error: {
    icon: XCircle,
    className: "border-red-200",
    iconBg: "bg-red-100 text-red-600",
  },
  warning: {
    icon: AlertTriangle,
    className: "border-amber-200",
    iconBg: "bg-amber-100 text-amber-600",
  },
  info: {
    icon: Info,
    className: "border-blue-200",
    iconBg: "bg-blue-100 text-blue-600",
  },
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (t: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).slice(2, 10);
      const newToast: Toast = { ...t, id, duration: t.duration ?? 4000 };
      setToasts((prev) => [...prev, newToast]);
    },
    []
  );

  const success = useCallback(
    (title: string, description?: string) =>
      toast({ variant: "success", title, description }),
    [toast]
  );
  const error = useCallback(
    (title: string, description?: string) =>
      toast({ variant: "error", title, description }),
    [toast]
  );
  const warning = useCallback(
    (title: string, description?: string) =>
      toast({ variant: "warning", title, description }),
    [toast]
  );
  const info = useCallback(
    (title: string, description?: string) =>
      toast({ variant: "info", title, description }),
    [toast]
  );

  return (
    <ToastContext.Provider
      value={{ toast, success, error, warning, info, dismiss }}
    >
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return ctx;
}

function ToastContainer({
  toasts,
  onDismiss,
}: {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}) {
  return (
    <div className="fixed top-4 left-4 z-[200] flex flex-col gap-2 w-[calc(100vw-2rem)] max-w-sm" dir="rtl">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: Toast;
  onDismiss: (id: string) => void;
}) {
  const config = VARIANT_CONFIG[toast.variant];
  const Icon = config.icon;

  useEffect(() => {
    if (!toast.duration || toast.duration <= 0) return;
    const timer = setTimeout(() => onDismiss(toast.id), toast.duration);
    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onDismiss]);

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-xl border bg-surface p-3.5 shadow-elevated animate-in slide-in-from-top-2 duration-200",
        config.className
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
          config.iconBg
        )}
      >
        <Icon className="h-4 w-4" />
      </div>

      <div className="flex-1 min-w-0 pt-0.5">
        <div className="text-sm font-bold text-ink-800 leading-tight">
          {toast.title}
        </div>
        {toast.description && (
          <div className="mt-1 text-xs text-muted leading-relaxed">
            {toast.description}
          </div>
        )}
      </div>

      <button
        onClick={() => onDismiss(toast.id)}
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-muted hover:bg-background transition"
        aria-label="بستن"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}