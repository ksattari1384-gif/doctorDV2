export type ServiceCategory =
  | "cosmetic"
  | "therapeutic"
  | "surgery"
  | "preventive"
  | "kids";

export type Service = {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  emoji: string;
  category: ServiceCategory;
  tag: string | null;
};

export const SERVICES: Service[] = [
  {
    id: "implant",
    name: "ایمپلنت دندان",
    description: "جایگزینی دندان‌های از دست رفته با ایمپلنت تیتانیومی",
    price: "۱۵,۰۰۰,۰۰۰",
    duration: "۶۰ دقیقه",
    emoji: "🦷",
    category: "surgery",
    tag: "محبوب",
  },
  {
    id: "laminate",
    name: "لمینت سرامیکی",
    description: "طراحی لبخند با لمینت‌های نازک و طبیعی",
    price: "۸,۰۰۰,۰۰۰",
    duration: "۹۰ دقیقه",
    emoji: "💎",
    category: "cosmetic",
    tag: "پیشنهاد ویژه",
  },
  {
    id: "orthodontics",
    name: "ارتودنسی",
    description: "مرتب‌سازی دندان‌ها با براکت‌های نامرئی",
    price: "مشاوره رایگان",
    duration: "۴۵ دقیقه",
    emoji: "✨",
    category: "cosmetic",
    tag: null,
  },
  {
    id: "root-canal",
    name: "عصب‌کشی",
    description: "درمان ریشه با تجهیزات مدرن و بدون درد",
    price: "۲,۵۰۰,۰۰۰",
    duration: "۶۰ دقیقه",
    emoji: "🩺",
    category: "therapeutic",
    tag: null,
  },
  {
    id: "scaling",
    name: "جرم‌گیری",
    description: "پاک‌سازی تخصصی جرم و پلاک با اولتراسونیک",
    price: "۸۰۰,۰۰۰",
    duration: "۳۰ دقیقه",
    emoji: "🛡️",
    category: "preventive",
    tag: null,
  },
  {
    id: "pediatric",
    name: "دندانپزشکی کودکان",
    description: "درمان آرام و دوستانه برای کوچک‌ترها",
    price: "۵۰۰,۰۰۰",
    duration: "۳۰ دقیقه",
    emoji: "🧒",
    category: "kids",
    tag: null,
  },
];

export const MAIN_CATEGORIES = [
  { id: "all", label: "همه", icon: "✨" },
  { id: "cosmetic", label: "زیبایی", icon: "💎" },
  { id: "therapeutic", label: "درمانی", icon: "🦷" },
  { id: "surgery", label: "جراحی", icon: "⚕️" },
  { id: "preventive", label: "پیشگیری", icon: "🛡️" },
  { id: "kids", label: "کودکان", icon: "🧒" },
];

export const SUB_CATEGORIES: Record<
  string,
  { id: string; label: string }[]
> = {
  all: [
    { id: "all", label: "همه" },
    { id: "popular", label: "محبوب‌ترین‌ها" },
    { id: "special", label: "پیشنهاد ویژه" },
  ],
  cosmetic: [
    { id: "all", label: "همه" },
    { id: "popular", label: "محبوب" },
  ],
  therapeutic: [
    { id: "all", label: "همه" },
    { id: "popular", label: "محبوب" },
  ],
  surgery: [
    { id: "all", label: "همه" },
    { id: "popular", label: "محبوب" },
  ],
  preventive: [{ id: "all", label: "همه" }],
  kids: [{ id: "all", label: "همه" }],
};