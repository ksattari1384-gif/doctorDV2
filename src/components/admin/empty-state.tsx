import { ReactNode } from "react";
import { Inbox } from "lucide-react";

type EmptyStateProps = {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  compact?: boolean;
};

export function EmptyState({
  icon,
  title,
  description,
  action,
  compact = false,
}: EmptyStateProps) {
  return (
    <div
      className={
        compact
          ? "flex flex-col items-center justify-center py-8 px-4 text-center"
          : "flex flex-col items-center justify-center py-16 px-6 text-center"
      }
    >
      <div
        className={
          compact
            ? "flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-700 mb-3"
            : "flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-700 mb-4"
        }
      >
        {icon || (
          <Inbox className={compact ? "h-6 w-6" : "h-8 w-8"} />
        )}
      </div>

      <h3
        className={
          compact
            ? "text-sm font-bold text-ink-800 mb-1"
            : "text-base font-bold text-ink-800 mb-1.5"
        }
      >
        {title}
      </h3>

      {description && (
        <p
          className={
            compact
              ? "text-xs text-muted max-w-sm leading-relaxed"
              : "text-sm text-muted max-w-md leading-relaxed"
          }
        >
          {description}
        </p>
      )}

      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}