import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toPersianDigits(input: string | number): string {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return String(input).replace(/\d/g, (d) => persianDigits[Number(d)]);
}

export function formatPrice(rials: number, unit: "rial" | "toman" = "toman"): string {
  const value = unit === "toman" ? Math.floor(rials / 10) : rials;
  return toPersianDigits(value.toLocaleString("en-US"));
}