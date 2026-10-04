export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="relative inline-flex mb-4">
          <div className="absolute -inset-3 rounded-full bg-brand-500/20 blur-xl animate-pulse" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-700 to-ink-900 border-2 border-gold-500/40 text-gold-400 font-bold text-xl">
            ق
          </div>
        </div>
        <div className="flex items-center justify-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-brand-500 animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="h-2 w-2 rounded-full bg-brand-500 animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="h-2 w-2 rounded-full bg-brand-500 animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
        <p className="mt-4 text-sm text-muted">در حال بارگذاری...</p>
      </div>
    </div>
  );
}