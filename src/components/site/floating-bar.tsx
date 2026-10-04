"use client";

import { useState } from "react";
import {
  MapPin,
  MessageCircle,
  Instagram,
  Phone,
  Sparkles,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAdminStore } from "@/lib/stores/admin-store";

type FloatingItem = {
  id: string;
  label: string;
  href?: string;
  icon: React.ReactNode;
  color: string;
  onClick?: () => void;
};

export function FloatingBar() {
  const content = useAdminStore((s) => s.content);
  const [isOpen, setIsOpen] = useState(false);
  const [showLabels, setShowLabels] = useState(false);

  const items: FloatingItem[] = [
    {
      id: "maps",
      label: "مسیریابی",
      href: content.googleMaps,
      icon: <MapPin className="h-5 w-5" />,
      color: "bg-red-500 hover:bg-red-600",
    },
    {
      id: "whatsapp",
      label: "واتساپ",
      href: content.whatsapp,
      icon: <MessageCircle className="h-5 w-5" />,
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      id: "instagram",
      label: "اینستاگرام",
      href: content.instagram,
      icon: <Instagram className="h-5 w-5" />,
      color:
        "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 hover:opacity-90",
    },
    {
      id: "call",
      label: "تماس",
      href: `tel:${content.phone}`,
      icon: <Phone className="h-5 w-5" />,
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      id: "ai",
      label: "دستیار هوشمند",
      icon: <Sparkles className="h-5 w-5" />,
      color: "text-white",
      onClick: () => {
        alert("دستیار هوشمند به‌زودی فعال می‌شود ✨");
      },
    },
  ];

  return (
    <div
      dir="ltr"
      className="z-40 flex flex-col items-start gap-2.5"
      style={{
        position: "fixed",
        left: "16px",
        bottom: "20px",
        width: "fit-content",
      }}
      onMouseEnter={() => setShowLabels(true)}
      onMouseLeave={() => setShowLabels(false)}
    >
      {/* ═══ Items ═══ */}
      <div
        className={cn(
          "flex flex-col gap-2.5 transition-all duration-300",
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        {items.map((item, idx) => {
          const isAI = item.id === "ai";
          const itemContent = (
            <>
              <span
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-full shadow-lg transition shrink-0",
                  item.color
                )}
                style={
                  isAI ? { background: "var(--theme-primary)" } : undefined
                }
              >
                {item.icon}
              </span>
              <span
                dir="rtl"
                className={cn(
                  "whitespace-nowrap rounded-lg bg-ink-800 px-3 py-1.5 text-xs font-medium text-white shadow-md transition-all",
                  showLabels
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-2 pointer-events-none"
                )}
              >
                {item.label}
              </span>
            </>
          );

          const wrapperClass =
            "flex items-center gap-2 group";

          if (item.href) {
            return (
              <a
                key={item.id}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                className={wrapperClass}
                style={{ transitionDelay: `${idx * 40}ms` }}
                aria-label={item.label}
              >
                {itemContent}
              </a>
            );
          }

          return (
            <button
              key={item.id}
              onClick={item.onClick}
              className={wrapperClass}
              style={{ transitionDelay: `${idx * 40}ms` }}
              aria-label={item.label}
            >
              {itemContent}
            </button>
          );
        })}
      </div>

      {/* ═══ Toggle Button ═══ */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className={cn(
          "flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full shadow-xl transition-all duration-300 text-white",
          isOpen ? "rotate-90" : "md:animate-pulse-slow"
        )}
        style={{
          background: isOpen ? "#0b1f1d" : "var(--theme-primary)",
        }}
        aria-label={isOpen ? "بستن منوی ارتباط" : "باز کردن منوی ارتباط"}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>
    </div>
  );
}