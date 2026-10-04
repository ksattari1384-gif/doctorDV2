import type { UserRole } from "./users";

// ═══════════════════════════════════════════════════════
//  Permissions — تعریف دسترسی هر نقش
// ═══════════════════════════════════════════════════════

export type AdminRoute =
  | "/admin/dashboard"
  | "/admin/appointments"
  | "/admin/patients"
  | "/admin/services"
  | "/admin/schedule"
  | "/admin/content"
  | "/admin/theme"
  | "/admin/settings";

// ─── کدوم نقش‌ها به کدوم مسیرها دسترسی دارن ───
export const ROUTE_PERMISSIONS: Record<AdminRoute, UserRole[]> = {
  "/admin/dashboard": ["ADMIN", "DOCTOR", "RECEPTIONIST"],
  "/admin/appointments": ["ADMIN", "DOCTOR", "RECEPTIONIST"],
  "/admin/patients": ["ADMIN", "DOCTOR", "RECEPTIONIST"],
  "/admin/services": ["ADMIN", "DOCTOR"],
  "/admin/schedule": ["ADMIN", "DOCTOR"],
  "/admin/content": ["ADMIN", "DOCTOR"],
  "/admin/theme": ["ADMIN"],
  "/admin/settings": ["ADMIN"],
};

/**
 * چک کن آیا کاربر به مسیر دسترسی داره
 */
export function canAccessRoute(
  role: UserRole | undefined,
  pathname: string
): boolean {
  if (!role) return false;

  // ─── پیدا کردن اولین مسیر matching ───
  const matchingRoute = (Object.keys(ROUTE_PERMISSIONS) as AdminRoute[])
    .filter((route) => pathname === route || pathname.startsWith(route + "/"))
    .sort((a, b) => b.length - a.length)[0]; // طولانی‌ترین matching

  if (!matchingRoute) return true; // مسیرهای ناشناخته → آزاد (مثل /admin/login)

  return ROUTE_PERMISSIONS[matchingRoute].includes(role);
}

/**
 * بررسی دسترسی به یه قابلیت خاص (نه مسیر)
 */
export const FEATURE_PERMISSIONS = {
  canDeletePatient: ["ADMIN", "DOCTOR"] as UserRole[],
  canDeleteService: ["ADMIN", "DOCTOR"] as UserRole[],
  canDeleteAppointment: ["ADMIN", "DOCTOR", "RECEPTIONIST"] as UserRole[],
  canEditSchedule: ["ADMIN", "DOCTOR"] as UserRole[],
  canEditTheme: ["ADMIN"] as UserRole[],
  canEditSettings: ["ADMIN"] as UserRole[],
  canEditContent: ["ADMIN", "DOCTOR"] as UserRole[],
  canConfirmAppointments: ["ADMIN", "DOCTOR", "RECEPTIONIST"] as UserRole[],
};

export function can(
  role: UserRole | undefined,
  feature: keyof typeof FEATURE_PERMISSIONS
): boolean {
  if (!role) return false;
  return FEATURE_PERMISSIONS[feature].includes(role);
}