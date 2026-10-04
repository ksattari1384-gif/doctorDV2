import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

type Trend = "up" | "down" | "neutral" | "warn";

type StatCardProps = {
  label: string;
  value: string | number;
  unit?: string;
  change?: string;
  trend?: Trend;
  icon: LucideIcon;
  gradient?: string;
};

const TREND_CONFIG: Record<
  Trend,
  { icon: typeof TrendingUp; className: string }
> = {
  up: {
    icon: TrendingUp,
    className: "text-emerald-600",
  },
  down: {
    icon: TrendingDown,
    className: "text-red-600",
  },
  neutral: {
    icon: Minus,
    className: "text-muted",
  },
  warn: {
    icon: Minus,
    className: "text-amber-600",
  },
};

export function StatCard({
  label,
  value,
  unit,
  change,
  trend = "neutral",
  icon: Icon,
  gradient = "from-brand-500 to-brand-700",
}: StatCardProps) {
  const trendConfig = TREND_CONFIG[trend];
  const TrendIcon = trendConfig.icon;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-5 shadow-soft transition-all hover:shadow-elevated group">
      {/* Decorative gradient */}
      <div
        className={cn(
          "absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br opacity-[0.08] group-hover:opacity-[0.15] transition-opacity",
          gradient
        )}
      />

      <div className="relative flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-muted">{label}</p>
          <p className="mt-2 text-2xl md:text-[28px] font-bold text-ink-800 leading-none tracking-tight">
            {value}
            {unit && (
              <span className="text-xs font-normal text-muted mr-1.5">
                {unit}
              </span>
            )}
          </p>
          {change && (
            <div
              className={cn(
                "mt-3 inline-flex items-center gap-1 text-[11px] font-medium",
                trendConfig.className
              )}
            >
              <TrendIcon className="h-3 w-3" />
              <span>{change}</span>
            </div>
          )}
        </div>

        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-md",
            gradient
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}