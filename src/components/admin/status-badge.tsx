import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  Phone,
  Ban,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type StatusVariant =
  | "pending"
  | "approved"
  | "confirmed"
  | "completed"
  | "cancelled"
  | "rejected"
  | "contact_required"
  | "no_show"
  | "active"
  | "inactive"
  | "paid"
  | "unpaid";

const VARIANTS: Record<
  StatusVariant,
  { label: string; className: string; icon: typeof CheckCircle2 }
> = {
  // ─── Appointment ─────────────────────────
  pending: {
    label: "در انتظار تأیید",
    className: "bg-amber-50 text-amber-700 border-amber-200",
    icon: Clock,
  },
  approved: {
    label: "تأیید اولیه",
    className: "bg-blue-50 text-blue-700 border-blue-200",
    icon: CheckCircle2,
  },
  contact_required: {
    label: "نیاز به تماس",
    className: "bg-purple-50 text-purple-700 border-purple-200",
    icon: Phone,
  },
  confirmed: {
    label: "قطعی",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: CheckCircle2,
  },
  completed: {
    label: "انجام شده",
    className: "bg-brand-50 text-brand-800 border-brand-200",
    icon: CheckCircle2,
  },
  cancelled: {
    label: "لغو شده",
    className: "bg-gray-50 text-gray-600 border-gray-200",
    icon: Ban,
  },
  rejected: {
    label: "رد شده",
    className: "bg-red-50 text-red-700 border-red-200",
    icon: XCircle,
  },
  no_show: {
    label: "عدم مراجعه",
    className: "bg-red-50 text-red-700 border-red-200",
    icon: AlertCircle,
  },

  // ─── Generic ─────────────────────────────
  active: {
    label: "فعال",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: CheckCircle2,
  },
  inactive: {
    label: "غیرفعال",
    className: "bg-gray-50 text-gray-600 border-gray-200",
    icon: Eye,
  },
  paid: {
    label: "پرداخت شده",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: CheckCircle2,
  },
  unpaid: {
    label: "پرداخت نشده",
    className: "bg-amber-50 text-amber-700 border-amber-200",
    icon: AlertCircle,
  },
};

type StatusBadgeProps = {
  variant: StatusVariant;
  label?: string;
  className?: string;
  withIcon?: boolean;
};

export function StatusBadge({
  variant,
  label,
  className,
  withIcon = true,
}: StatusBadgeProps) {
  const config = VARIANTS[variant];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium whitespace-nowrap",
        config.className,
        className
      )}
    >
      {withIcon && <Icon className="h-3 w-3" />}
      {label || config.label}
    </span>
  );
}