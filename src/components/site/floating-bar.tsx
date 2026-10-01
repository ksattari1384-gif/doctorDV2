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

type FloatingItem = {
  id: string;
  label: string;
  href?: string;
  icon: React.ReactNode;
  color: string;
  onClick?: () => void;
};

export function FloatingBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLabels, setShowLabels] = useState(false);

  const items: FloatingItem[] = [
    {
      id: "maps",
      label: "مسیریابی",
      href: "https://maps.google.com/?q=Tehran",
      icon: <MapPin className="h-5 w-5" />,
      color: "bg-red-500 hover:bg-red-600",
    },
    {
      id: "whatsapp",
      label: "واتساپ",
      href: "https://wa.me/989120000000",
      icon: <MessageCircle className="h-5 w-5" />,
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      id: "instagram",
      label: "اینستاگرام",
      href: "https://instagram.com/",
      icon: <Instagram className="h-5 w-5" />,
      color: "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 hover:opacity-90",
    },
    {
      id: "call",
      label: "تماس",
      href: "tel:+982100000000",
      icon: <Phone className="h-5 w-5" />,
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      id: "ai",
      label: "دستیار هوشمند",
      icon: <Sparkles className="h-5 w-5" />,
      color: "bg-brand-700 hover:bg-brand-800",
      onClick: () => {
        // TODO: باز کردن پنجره‌ی AI در فاز ۸
        alert("دستیار هوشمند به‌زودی فعال می‌شود ✨");
      },
    },
  ];

  return (
    <div
className="fixed bottom-6 left-4 md:bottom-5 md:left-5 z-40 flex flex-col items-start gap-3"      onMouseEnter={() => setShowLabels(true)}
      onMouseLeave={() => setShowLabels(false)}
    >
      {/* Items */}
      <div
        className={cn(
          "flex flex-col gap-2.5 transition-all duration-300",
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        {items.map((item, idx) => {
          const content = (
            <>
              <span
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-full text-white shadow-lg transition",
                  item.color
                )}
              >
                {item.icon}
              </span>
              <span
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
                {content}
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
              {content}
            </button>
          );
        })}
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-full shadow-xl transition-all duration-300",
          isOpen
            ? "bg-ink-800 hover:bg-ink-900 rotate-90"
            : "bg-brand-700 hover:bg-brand-800 animate-pulse-slow"
        )}
        aria-label={isOpen ? "بستن منوی ارتباط" : "باز کردن منوی ارتباط"}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white" />
        )}
      </button>
    </div>
  );
}