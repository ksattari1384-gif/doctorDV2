"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

// ═══════════════════════════════════════════════════════
//  TYPES
// ═══════════════════════════════════════════════════════

export type AppointmentStatus =
  | "pending"
  | "approved"
  | "contact_required"
  | "confirmed"
  | "rejected"
  | "cancelled"
  | "completed"
  | "no_show";

export type Appointment = {
  id: string;
  patient: string;
  phone: string;
  email: string;
  serviceId: string;
  service: string;
  duration: number;
  date: string;
  time: string;
  status: AppointmentStatus;
  notes?: string;
  price: string;
};

export type ServiceCategory =
  | "cosmetic"
  | "therapeutic"
  | "surgery"
  | "preventive"
  | "kids";

export type Service = {
  id: string;
  slug: string;
  name: string;
  emoji: string;
  shortDescription: string;
  longDescription: string;
  category: ServiceCategory;
  price: number | null;
  priceFrom: boolean;
  duration: number;
  buffer: number;
  paymentMethod: "ONLINE" | "IN_PERSON" | "BOTH";
  isFeatured: boolean;
  isActive: boolean;
};

export type Patient = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  nationalId: string;
  birthDate: string;
  gender: "male" | "female";
  address: string;
  totalAppointments: number;
  totalSpent: number;
  lastVisit: string;
  notes: string;
  createdAt: string;
};

export type WorkingHour = {
  weekday: number;
  startTime: string;
  endTime: string;
  isActive: boolean;
};

export type BreakTime = {
  id: string;
  weekday: number;
  startTime: string;
  endTime: string;
  reason: string;
};

export type Holiday = {
  id: string;
  date: string;
  title: string;
};

export type Leave = {
  id: string;
  startDate: string;
  endDate: string;
  reason: string;
};

export type WebsiteContent = {
  brandName: string;
  brandSubtitle: string;
  slogan: string;
  logoUrl: string;
  heroVideoUrl: string;
  heroPosterUrl: string;
  heroEnabled: boolean;
  phone: string;
  email: string;
  address: string;
  workingHoursShort: string;
  whatsapp: string;
  instagram: string;
  googleMaps: string;
  telegram: string;
  themePrimary: string;
  themeAccent: string;
  themeFont: string;
  themeRadius: string;
  themeMode: "light" | "dark" | "auto";
};

// ═══════════════════════════════════════════════════════
//  INITIAL DATA
// ═══════════════════════════════════════════════════════

const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: "QD-241007-0042",
    patient: "سارا محمدی",
    phone: "۰۹۱۲۳۴۵۶۷۸۹",
    email: "sara@example.com",
    serviceId: "2",
    service: "لمینت سرامیکی",
    duration: 90,
    date: "امروز",
    time: "۱۰:۳۰",
    status: "confirmed",
    notes: "بیمار حساسیت به بی‌حسی دارد.",
    price: "۸,۰۰۰,۰۰۰",
  },
  {
    id: "QD-241007-0041",
    patient: "علی رضایی",
    phone: "۰۹۱۲۳۴۵۶۷۸۹",
    email: "ali@example.com",
    serviceId: "1",
    service: "ایمپلنت دندان",
    duration: 60,
    date: "امروز",
    time: "۱۱:۰۰",
    status: "pending",
    price: "۱۵,۰۰۰,۰۰۰",
  },
  {
    id: "QD-241007-0040",
    patient: "مریم کریمی",
    phone: "۰۹۱۲۳۴۵۶۷۸۹",
    email: "maryam@example.com",
    serviceId: "3",
    service: "ارتودنسی",
    duration: 45,
    date: "امروز",
    time: "۱۴:۳۰",
    status: "confirmed",
    price: "مشاوره رایگان",
  },
  {
    id: "QD-241007-0039",
    patient: "رضا احمدی",
    phone: "۰۹۱۲۳۴۵۶۷۸۹",
    email: "reza@example.com",
    serviceId: "5",
    service: "جرم‌گیری",
    duration: 30,
    date: "امروز",
    time: "۱۶:۰۰",
    status: "cancelled",
    price: "۸۰۰,۰۰۰",
  },
  {
    id: "QD-241007-0038",
    patient: "نگار حسینی",
    phone: "۰۹۱۲۳۴۵۶۷۸۹",
    email: "negar@example.com",
    serviceId: "4",
    service: "عصب‌کشی",
    duration: 60,
    date: "امروز",
    time: "۱۷:۳۰",
    status: "contact_required",
    notes: "منشی باید برای تأیید تماس بگیرد.",
    price: "۲,۵۰۰,۰۰۰",
  },
  {
    id: "QD-241006-0037",
    patient: "امیر تهرانی",
    phone: "۰۹۱۲۳۴۵۶۷۸۹",
    email: "amir@example.com",
    serviceId: "2",
    service: "کامپوزیت",
    duration: 60,
    date: "دیروز",
    time: "۱۰:۰۰",
    status: "completed",
    price: "۵,۵۰۰,۰۰۰",
  },
  {
    id: "QD-241006-0036",
    patient: "زهرا نوری",
    phone: "۰۹۱۲۳۴۵۶۷۸۹",
    email: "zahra@example.com",
    serviceId: "2",
    service: "بلیچینگ",
    duration: 45,
    date: "دیروز",
    time: "۱۵:۰۰",
    status: "completed",
    price: "۳,۲۰۰,۰۰۰",
  },
];

const INITIAL_SERVICES: Service[] = [
  {
    id: "1",
    slug: "implant",
    name: "ایمپلنت دندان",
    emoji: "🦷",
    shortDescription: "جایگزینی دندان‌های از دست رفته با ایمپلنت تیتانیومی",
    longDescription:
      "ایمپلنت دندان روشی مدرن برای جایگزینی دندان‌های از دست رفته است...",
    category: "surgery",
    price: 15000000,
    priceFrom: true,
    duration: 60,
    buffer: 15,
    paymentMethod: "BOTH",
    isFeatured: true,
    isActive: true,
  },
  {
    id: "2",
    slug: "laminate",
    name: "لمینت سرامیکی",
    emoji: "💎",
    shortDescription: "طراحی لبخند با لمینت‌های نازک و طبیعی",
    longDescription: "لمینت‌های سرامیکی لایه‌های نازکی هستند...",
    category: "cosmetic",
    price: 8000000,
    priceFrom: true,
    duration: 90,
    buffer: 15,
    paymentMethod: "ONLINE",
    isFeatured: true,
    isActive: true,
  },
  {
    id: "3",
    slug: "orthodontics",
    name: "ارتودنسی",
    emoji: "✨",
    shortDescription: "مرتب‌سازی دندان‌ها با براکت‌های نامرئی",
    longDescription: "ارتودنسی روشی برای مرتب‌سازی دندان‌ها...",
    category: "cosmetic",
    price: null,
    priceFrom: false,
    duration: 45,
    buffer: 10,
    paymentMethod: "IN_PERSON",
    isFeatured: true,
    isActive: true,
  },
  {
    id: "4",
    slug: "root-canal",
    name: "عصب‌کشی",
    emoji: "🩺",
    shortDescription: "درمان ریشه با تجهیزات مدرن و بدون درد",
    longDescription: "عصب‌کشی یا درمان ریشه، روشی برای نجات دندان...",
    category: "therapeutic",
    price: 2500000,
    priceFrom: true,
    duration: 60,
    buffer: 15,
    paymentMethod: "IN_PERSON",
    isFeatured: false,
    isActive: true,
  },
  {
    id: "5",
    slug: "scaling",
    name: "جرم‌گیری",
    emoji: "🛡️",
    shortDescription: "پاک‌سازی تخصصی جرم و پلاک با اولتراسونیک",
    longDescription: "جرم‌گیری روشی برای پاک‌سازی جرم و پلاک...",
    category: "preventive",
    price: 800000,
    priceFrom: true,
    duration: 30,
    buffer: 10,
    paymentMethod: "BOTH",
    isFeatured: false,
    isActive: true,
  },
  {
    id: "6",
    slug: "pediatric",
    name: "دندانپزشکی کودکان",
    emoji: "🧒",
    shortDescription: "درمان آرام و دوستانه برای کوچک‌ترها",
    longDescription: "دندانپزشکی کودکان نیازمند رویکردی خاص...",
    category: "kids",
    price: 500000,
    priceFrom: true,
    duration: 30,
    buffer: 10,
    paymentMethod: "IN_PERSON",
    isFeatured: false,
    isActive: false,
  },
];

const INITIAL_PATIENTS: Patient[] = [
  {
    id: "P-1001",
    firstName: "سارا",
    lastName: "محمدی",
    phone: "۰۹۱۲۳۴۵۶۷۸۹",
    email: "sara@example.com",
    nationalId: "۰۰۱۲۳۴۵۶۷۸",
    birthDate: "۱۳۷۰/۰۵/۱۲",
    gender: "female",
    address: "تهران، خیابان ولیعصر، پلاک ۱۲۳",
    totalAppointments: 8,
    totalSpent: 42000000,
    lastVisit: "امروز",
    notes: "بیمار حساسیت به بی‌حسی دارد.",
    createdAt: "۱۴۰۲/۰۳/۱۵",
  },
  {
    id: "P-1002",
    firstName: "علی",
    lastName: "رضایی",
    phone: "۰۹۱۲۳۴۵۶۷۸۹",
    email: "ali@example.com",
    nationalId: "۰۰۲۳۴۵۶۷۸۹",
    birthDate: "۱۳۶۵/۰۸/۲۰",
    gender: "male",
    address: "تهران، سعادت‌آباد",
    totalAppointments: 3,
    totalSpent: 18500000,
    lastVisit: "امروز",
    notes: "",
    createdAt: "۱۴۰۳/۰۱/۱۰",
  },
  {
    id: "P-1003",
    firstName: "مریم",
    lastName: "کریمی",
    phone: "۰۹۱۲۳۴۵۶۷۸۹",
    email: "maryam@example.com",
    nationalId: "۰۰۳۴۵۶۷۸۹۰",
    birthDate: "۱۳۷۵/۱۱/۰۳",
    gender: "female",
    address: "تهران، پونک",
    totalAppointments: 12,
    totalSpent: 56000000,
    lastVisit: "امروز",
    notes: "در حال ارتودنسی.",
    createdAt: "۱۴۰۱/۰۹/۰۵",
  },
  {
    id: "P-1004",
    firstName: "رضا",
    lastName: "احمدی",
    phone: "۰۹۱۲۳۴۵۶۷۸۹",
    email: "reza@example.com",
    nationalId: "۰۰۴۵۶۷۸۹۰۱",
    birthDate: "۱۳۶۰/۰۲/۱۸",
    gender: "male",
    address: "کرج، عظیمیه",
    totalAppointments: 5,
    totalSpent: 8500000,
    lastVisit: "امروز",
    notes: "",
    createdAt: "۱۴۰۲/۱۲/۲۰",
  },
  {
    id: "P-1005",
    firstName: "نگار",
    lastName: "حسینی",
    phone: "۰۹۱۲۳۴۵۶۷۸۹",
    email: "negar@example.com",
    nationalId: "۰۰۵۶۷۸۹۰۱۲",
    birthDate: "۱۳۶۸/۰۷/۲۵",
    gender: "female",
    address: "تهران، تجریش",
    totalAppointments: 15,
    totalSpent: 72000000,
    lastVisit: "امروز",
    notes: "بیمار VIP",
    createdAt: "۱۴۰۰/۰۵/۱۲",
  },
  {
    id: "P-1006",
    firstName: "امیر",
    lastName: "تهرانی",
    phone: "۰۹۱۲۳۴۵۶۷۸۹",
    email: "amir@example.com",
    nationalId: "۰۰۶۷۸۹۰۱۲۳",
    birthDate: "۱۳۷۲/۰۹/۱۰",
    gender: "male",
    address: "تهران، نیاوران",
    totalAppointments: 6,
    totalSpent: 24000000,
    lastVisit: "دیروز",
    notes: "",
    createdAt: "۱۴۰۲/۰۶/۰۱",
  },
];

const INITIAL_WORKING_HOURS: WorkingHour[] = [
  { weekday: 0, startTime: "09:00", endTime: "19:00", isActive: true },
  { weekday: 1, startTime: "09:00", endTime: "19:00", isActive: true },
  { weekday: 2, startTime: "09:00", endTime: "19:00", isActive: true },
  { weekday: 3, startTime: "09:00", endTime: "19:00", isActive: true },
  { weekday: 4, startTime: "09:00", endTime: "19:00", isActive: true },
  { weekday: 5, startTime: "09:00", endTime: "14:00", isActive: true },
  { weekday: 6, startTime: "09:00", endTime: "19:00", isActive: false },
];

const INITIAL_BREAKS: BreakTime[] = [
  {
    id: "b1",
    weekday: 0,
    startTime: "13:00",
    endTime: "14:00",
    reason: "ناهار و استراحت",
  },
];

const INITIAL_HOLIDAYS: Holiday[] = [
  { id: "h1", date: "۱۴۰۳/۰۷/۱۵", title: "عید نوروز" },
  { id: "h2", date: "۱۴۰۳/۰۸/۲۰", title: "تعطیل رسمی" },
];

const INITIAL_LEAVES: Leave[] = [
  {
    id: "l1",
    startDate: "۱۴۰۳/۰۷/۲۵",
    endDate: "۱۴۰۳/۰۷/۲۸",
    reason: "سفر",
  },
];

const INITIAL_CONTENT: WebsiteContent = {
  brandName: "دکتر قره‌داغی",
  brandSubtitle: "دندانپزشکی تخصصی",
  slogan: "لبخند؛ هنر دستان ما",
  logoUrl: "",
  heroVideoUrl:
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  heroPosterUrl: "",
  heroEnabled: true,
  phone: "۰۲۱-۰۰۰۰۰۰۰۰",
  email: "info@example.com",
  address: "تهران، خیابان ولیعصر، بالاتر از پارک ساعی، پلاک ۱۲۳، طبقه ۲",
  workingHoursShort: "شنبه تا چهارشنبه: ۹ تا ۱۹ — پنجشنبه: ۹ تا ۱۴",
  whatsapp: "https://wa.me/989120000000",
  instagram: "https://instagram.com/",
  googleMaps: "https://maps.google.com/?q=Tehran",
  telegram: "",
  themePrimary: "#0f766e",
  themeAccent: "#d4af37",
  themeFont: "vazirmatn",
  themeRadius: "lg",
  themeMode: "light",
};

// ═══════════════════════════════════════════════════════
//  STORE
// ═══════════════════════════════════════════════════════

type AdminStore = {
  appointments: Appointment[];
  services: Service[];
  patients: Patient[];
  workingHours: WorkingHour[];
  breaks: BreakTime[];
  holidays: Holiday[];
  leaves: Leave[];
  content: WebsiteContent;

  updateAppointmentStatus: (id: string, status: AppointmentStatus) => void;
  addAppointment: (appointment: Appointment) => void;
  deleteAppointment: (id: string) => void;

  toggleServiceActive: (id: string) => void;
  toggleServiceFeatured: (id: string) => void;
  addService: (service: Service) => void;
  updateService: (id: string, updates: Partial<Service>) => void;
  deleteService: (id: string) => void;

  addPatient: (patient: Patient) => void;
  updatePatient: (id: string, updates: Partial<Patient>) => void;
  deletePatient: (id: string) => void;

  updateWorkingHour: (
    weekday: number,
    field: "startTime" | "endTime" | "isActive",
    value: string | boolean
  ) => void;
  addBreak: (breakTime: BreakTime) => void;
  deleteBreak: (id: string) => void;
  addHoliday: (holiday: Holiday) => void;
  deleteHoliday: (id: string) => void;
  addLeave: (leave: Leave) => void;
  deleteLeave: (id: string) => void;

  updateContent: (updates: Partial<WebsiteContent>) => void;
  updateTheme: (
    updates: Partial<
      Pick<
        WebsiteContent,
        | "themePrimary"
        | "themeAccent"
        | "themeFont"
        | "themeRadius"
        | "themeMode"
      >
    >
  ) => void;

  getDashboardStats: () => {
    todayAppointments: number;
    pending: number;
    confirmed: number;
    totalPatients: number;
    totalRevenue: number;
    activeServices: number;
  };

  resetAll: () => void;
};

export const useAdminStore = create<AdminStore>()(
  persist(
    (set, get) => ({
      appointments: INITIAL_APPOINTMENTS,
      services: INITIAL_SERVICES,
      patients: INITIAL_PATIENTS,
      workingHours: INITIAL_WORKING_HOURS,
      breaks: INITIAL_BREAKS,
      holidays: INITIAL_HOLIDAYS,
      leaves: INITIAL_LEAVES,
      content: INITIAL_CONTENT,

      // ─── Appointments ────────────────────────
      updateAppointmentStatus: (id, status) => {
        set((state) => ({
          appointments: state.appointments.map((a) =>
            a.id === id ? { ...a, status } : a
          ),
        }));
      },

      addAppointment: (appointment) => {
        set((state) => ({
          appointments: [appointment, ...state.appointments],
        }));
      },

      deleteAppointment: (id) => {
        set((state) => ({
          appointments: state.appointments.filter((a) => a.id !== id),
        }));
      },

      // ─── Services ────────────────────────────
      toggleServiceActive: (id) => {
        set((state) => ({
          services: state.services.map((s) =>
            s.id === id ? { ...s, isActive: !s.isActive } : s
          ),
        }));
      },

      toggleServiceFeatured: (id) => {
        set((state) => ({
          services: state.services.map((s) =>
            s.id === id ? { ...s, isFeatured: !s.isFeatured } : s
          ),
        }));
      },

      addService: (service) => {
        set((state) => ({
          services: [...state.services, service],
        }));
      },

      updateService: (id, updates) => {
        set((state) => ({
          services: state.services.map((s) =>
            s.id === id ? { ...s, ...updates } : s
          ),
        }));
      },

      deleteService: (id) => {
        set((state) => ({
          services: state.services.filter((s) => s.id !== id),
        }));
      },

      // ─── Patients ────────────────────────────
      addPatient: (patient) => {
        set((state) => ({
          patients: [patient, ...state.patients],
        }));
      },

      updatePatient: (id, updates) => {
        set((state) => ({
          patients: state.patients.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        }));
      },

      deletePatient: (id) => {
        set((state) => ({
          patients: state.patients.filter((p) => p.id !== id),
        }));
      },

      // ─── Schedule ────────────────────────────
      updateWorkingHour: (weekday, field, value) => {
        set((state) => ({
          workingHours: state.workingHours.map((h) =>
            h.weekday === weekday ? { ...h, [field]: value } : h
          ),
        }));
      },

      addBreak: (breakTime) => {
        set((state) => ({
          breaks: [...state.breaks, breakTime],
        }));
      },

      deleteBreak: (id) => {
        set((state) => ({
          breaks: state.breaks.filter((b) => b.id !== id),
        }));
      },

      addHoliday: (holiday) => {
        set((state) => ({
          holidays: [...state.holidays, holiday],
        }));
      },

      deleteHoliday: (id) => {
        set((state) => ({
          holidays: state.holidays.filter((h) => h.id !== id),
        }));
      },

      addLeave: (leave) => {
        set((state) => ({
          leaves: [...state.leaves, leave],
        }));
      },

      deleteLeave: (id) => {
        set((state) => ({
          leaves: state.leaves.filter((l) => l.id !== id),
        }));
      },

      // ─── Content ─────────────────────────────
      updateContent: (updates) => {
        set((state) => ({
          content: { ...state.content, ...updates },
        }));
      },

      updateTheme: (updates) => {
        set((state) => ({
          content: { ...state.content, ...updates },
        }));
      },

      // ─── Derived stats ───────────────────────
      getDashboardStats: () => {
        const { appointments, patients, services } = get();

        const todayApts = appointments.filter((a) => a.date === "امروز");
        const pending = appointments.filter(
          (a) => a.status === "pending" || a.status === "contact_required"
        );
        const confirmed = appointments.filter(
          (a) => a.status === "confirmed"
        );
        const completed = appointments.filter((a) => a.status === "completed");
        const activeServices = services.filter((s) => s.isActive);

        let totalRevenue = 0;
        for (const apt of completed) {
          const priceStr = apt.price
            .replace(/[,٬،\s]/g, "")
            .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
          const price = parseInt(priceStr) || 0;
          totalRevenue += price * 10;
        }

        return {
          todayAppointments: todayApts.length,
          pending: pending.length,
          confirmed: confirmed.length,
          totalPatients: patients.length,
          totalRevenue,
          activeServices: activeServices.length,
        };
      },

      // ─── Reset ───────────────────────────────
      resetAll: () => {
        set({
          appointments: INITIAL_APPOINTMENTS,
          services: INITIAL_SERVICES,
          patients: INITIAL_PATIENTS,
          workingHours: INITIAL_WORKING_HOURS,
          breaks: INITIAL_BREAKS,
          holidays: INITIAL_HOLIDAYS,
          leaves: INITIAL_LEAVES,
          content: INITIAL_CONTENT,
        });
      },
    }),
    {
      name: "doctor-admin-store",
      version: 1,
    }
  )
);