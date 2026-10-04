"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

type LogoutButtonProps = {
  variant?: "icon" | "full";
  className?: string;
};

export function LogoutButton({
  variant = "full",
  className,
}: LogoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await signOut({ callbackUrl: "/admin/login" });
  };

  if (variant === "icon") {
    return (
      <button
        onClick={handleLogout}
        disabled={loading}
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:bg-red-50 hover:text-red-600 transition",
          className
        )}
        title="خروج از حساب"
        aria-label="خروج"
      >
        {loading ? (
          <span className="h-4 w-4 rounded-full border-2 border-red-300 border-t-red-600 animate-spin" />
        ) : (
          <LogOut className="h-4 w-4" />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={cn(
        "w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-500/10 hover:text-red-400 transition",
        className
      )}
    >
      {loading ? (
        <span className="h-5 w-5 rounded-full border-2 border-red-300 border-t-red-600 animate-spin" />
      ) : (
        <LogOut className="h-5 w-5" />
      )}
      <span>{loading ? "در حال خروج..." : "خروج از حساب"}</span>
    </button>
  );
}