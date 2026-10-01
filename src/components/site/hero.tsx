"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, CalendarCheck, ArrowLeft, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type HeroProps = {
  videoUrl?: string;
  posterUrl?: string;
  enabled?: boolean;
};

export function Hero({
  videoUrl = "",
  posterUrl = "",
  enabled = false,
}: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = isMuted;
  }, [isMuted]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => setIsMuted((m) => !m);

  const showVideo = enabled && videoUrl && videoReady;

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-ink-900">
      {/* ─── Background: Video or Poster ───────────────── */}
      {enabled && videoUrl ? (
        <video
          ref={videoRef}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000",
            videoReady ? "opacity-100" : "opacity-0"
          )}
          src={videoUrl}
          poster={posterUrl || undefined}
          autoPlay
          loop
          muted
          playsInline
          onCanPlay={() => setVideoReady(true)}
        />
      ) : posterUrl ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${posterUrl})` }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-brand-800 via-brand-900 to-ink-900" />
      )}

      {/* ─── Overlay gradient ──────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900/70 via-ink-900/50 to-ink-900/80" />

      {/* ─── Decorative circles ─────────────────────────── */}
      <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />

      {/* ─── Content ───────────────────────────────────── */}
      <div className="relative z-10 container mx-auto flex min-h-[100svh] flex-col items-center justify-center px-4 md:px-6 py-24 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-2 text-sm font-medium text-white/95 mb-6 animate-fade-in">
          <Sparkles className="h-4 w-4 text-gold-400" />
          <span>دندانپزشکی تخصصی و زیبایی</span>
        </div>

        {/* Title */}
        <h1 className="max-w-4xl text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white animate-fade-in">
          لبخندی که{" "}
          <span className="bg-gradient-to-l from-gold-400 via-gold-500 to-gold-600 bg-clip-text text-transparent">
            به یاد می‌مانَد
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-white/80 animate-fade-in">
          با جدیدترین تکنولوژی‌ها و تیمی متخصص، لبخندتان را به بهترین شکل
          ممکن می‌سازیم. تجربه‌ای آرام، حرفه‌ای و امن در مطب دکتر قره‌داغی.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-3 animate-fade-in">
          <Link
            href="/booking"
            className="group inline-flex items-center gap-2 rounded-xl bg-gold-500 px-7 py-3.5 text-base font-bold text-ink-900 hover:bg-gold-400 transition shadow-lg shadow-gold-500/20"
          >
            <CalendarCheck className="h-5 w-5" />
            رزرو نوبت آنلاین
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          </Link>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/5 backdrop-blur-md px-7 py-3.5 text-base font-medium text-white hover:bg-white/10 transition"
          >
            مشاهده خدمات
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-6 md:gap-12 animate-fade-in">
          {[
            { value: "+۱۵", label: "سال تجربه" },
            { value: "+۵۰۰۰", label: "بیمار راضی" },
            { value: "۱۰۰٪", label: "تضمین کیفیت" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">
                {s.value}
              </div>
              <div className="mt-1 text-xs md:text-sm text-white/70">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Video controls ─────────────────────────────── */}
      {enabled && videoUrl && (
        <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-ink-900/60 backdrop-blur-md text-white hover:bg-ink-900/80 transition"
            aria-label={isPlaying ? "توقف ویدیو" : "پخش ویدیو"}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </button>
          <button
            onClick={toggleMute}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-ink-900/60 backdrop-blur-md text-white hover:bg-ink-900/80 transition"
            aria-label={isMuted ? "روشن کردن صدا" : "قطع صدا"}
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5" />
            ) : (
              <Volume2 className="h-5 w-5" />
            )}
          </button>
        </div>
      )}

      {/* ─── Scroll indicator ───────────────────────────── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-white/60 animate-bounce-slow">
        <span className="text-xs">اسکرول کنید</span>
        <div className="h-8 w-5 rounded-full border border-white/30 flex items-start justify-center p-1">
          <div className="h-1.5 w-1.5 rounded-full bg-white/60" />
        </div>
      </div>
    </section>
  );
}