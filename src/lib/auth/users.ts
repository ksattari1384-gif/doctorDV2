// ═══════════════════════════════════════════════════════
//  Auth Users — خواندن کاربران از Environment Variables
//  ⚠️ هش رمزها فقط در env vars (نه توی گیت)
// ═══════════════════════════════════════════════════════

export type UserRole = "ADMIN" | "DOCTOR" | "RECEPTIONIST";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  passwordHash: string;
};

/**
 * خواندن لیست کاربران از env var (JSON array)
 */
export function getUsers(): AuthUser[] {
  const raw = process.env.ADMIN_USERS;
  if (!raw) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[auth] ADMIN_USERS env var is not set. Login will fail."
      );
    }
    return [];
  }
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch (err) {
    console.error("[auth] Failed to parse ADMIN_USERS:", err);
    return [];
  }
}

/**
 * پیدا کردن کاربر با ایمیل
 */
export function findUserByEmail(email: string): AuthUser | undefined {
  const users = getUsers();
  return users.find(
    (u) => u.email.toLowerCase().trim() === email.toLowerCase().trim()
  );
}