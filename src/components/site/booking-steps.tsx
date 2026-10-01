import Link from "next/link";
import { Search, CalendarCheck, CheckCircle2, ArrowLeft, Sparkles } from "lucide-react";

const STEPS = [
  {
    number: "۰۱",
    title: "انتخاب خدمت",
    description: "از بین خدمات متنوع ما، خدمت مورد نظرتان را انتخاب کنید",
    icon: Search,
  },
  {
    number: "۰۲",
    title: "انتخاب زمان",
    description: "تاریخ و ساعت مناسب خود را از بین زمان‌های آزاد انتخاب کنید",
    icon: CalendarCheck,
  },
  {
    number: "۰۳",
    title: "ثبت اطلاعات",
    description: "اطلاعات خود را وارد کنید و درخواست رزرو را ثبت کنید",
    icon: CheckCircle2,
  },
  {
    number: "۰۴",
    title: "تأیید نهایی",
    description: "پس از تأیید منشی، نوبت شما قطعی می‌شود و یادآوری دریافت می‌کنید",
    icon: Sparkles,
  },
];

export function BookingSteps() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-brand-50/30 to-background">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-2 text-sm font-medium text-brand-800 mb-4">
            <CalendarCheck className="h-4 w-4" />
            رزرو آسان
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-ink-800 leading-tight">
            مراحل <span className="text-brand-700">رزرو نوبت</span>
          </h2>
          <p className="mt-4 text-base text-muted leading-relaxed">
            فقط در ۴ مرحله‌ی ساده، نوبت خود را ثبت کنید
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-0.5 bg-gradient-to-l from-brand-200 via-brand-300 to-brand-200" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="relative text-center">
                  {/* Icon circle */}
                  <div className="relative inline-flex">
                    <div className="flex h-[120px] w-[120px] items-center justify-center rounded-full bg-surface border-2 border-brand-100 shadow-soft">
                      <div className="flex h-[90px] w-[90px] items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-brand-800 text-white">
                        <Icon className="h-10 w-10" />
                      </div>
                    </div>
                    {/* Number badge */}
                    <div className="absolute -top-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-gold-500 text-ink-900 text-sm font-bold shadow-lg">
                      {step.number}
                    </div>
                  </div>

                  <h3 className="mt-6 text-lg font-bold text-ink-800">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>

                  {/* Arrow (mobile) */}
                  {idx < STEPS.length - 1 && (
                    <div className="lg:hidden mt-6 flex justify-center">
                      <ArrowLeft className="h-5 w-5 text-brand-300 rotate-90 sm:rotate-0" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/booking"
            className="group inline-flex items-center gap-2 rounded-xl bg-brand-700 px-8 py-4 text-base font-bold text-white hover:bg-brand-800 transition shadow-lg shadow-brand-700/20"
          >
            <CalendarCheck className="h-5 w-5" />
            شروع رزرو نوبت
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}