import {
  ShieldCheck,
  Sparkles,
  HeartPulse,
  Clock,
  Users,
  Award,
} from "lucide-react";

const ADVANTAGES = [
  {
    icon: ShieldCheck,
    title: "استریل کامل",
    description:
      "استفاده از اتوکلاو کلاس B و رعایت کامل پروتکل‌های بهداشتی در هر درمان",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Sparkles,
    title: "تجهیزات مدرن",
    description:
      "استفاده از جدیدترین دستگاه‌های دیجیتال و تکنولوژی‌های روز دنیا",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: HeartPulse,
    title: "درمان بدون درد",
    description:
      "با تکنیک‌های پیشرفته بی‌حسی، تجربه‌ای راحت و بدون استرس خواهید داشت",
    color: "from-rose-500 to-rose-600",
  },
  {
    icon: Clock,
    title: "وقت‌شناسی دقیق",
    description:
      "احترام به وقت شما، با سیستم نوبت‌دهی منظم و کاهش زمان انتظار",
    color: "from-amber-500 to-amber-600",
  },
  {
    icon: Users,
    title: "تیم متخصص",
    description:
      "تیمی از متخصصان مجرب در تمام حوزه‌های دندانپزشکی زیبایی و درمانی",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    icon: Award,
    title: "تضمین کیفیت",
    description:
      "استفاده از بهترین متریال‌ها با ضمانت نامه‌ی کتبی برای درمان‌ها",
    color: "from-brand-500 to-brand-700",
  },
];

export function Advantages() {
  return (
    <section className="py-20 md:py-28 bg-surface">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-2 text-sm font-medium text-brand-800 mb-4">
            <Award className="h-4 w-4" />
            چرا ما؟
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-ink-800 leading-tight">
            مزایای <span className="text-brand-700">مطب دکتر قره‌داغی</span>
          </h2>
          <p className="mt-4 text-base text-muted leading-relaxed">
            تجربه‌ای متفاوت از دندانپزشکی، با تمرکز بر آرامش و رضایت شما
          </p>
        </div>

        {/* Advantages grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {ADVANTAGES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group relative rounded-2xl border border-border bg-background p-6 md:p-7 hover:bg-surface hover:shadow-elevated hover:border-brand-200 transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                <div
                  className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-lg shadow-brand-500/10`}
                >
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="mt-5 text-lg font-bold text-ink-800">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {item.description}
                </p>

                {/* Decorative */}
                <div className="absolute top-6 left-6 text-5xl font-bold text-brand-50 opacity-0 group-hover:opacity-100 transition-opacity select-none">
                  {String(idx + 1).padStart(2, "0")}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}