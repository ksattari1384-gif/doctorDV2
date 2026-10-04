"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  CalendarCheck,
  Star,
  Users,
  Award,
  Clock,
  X as CloseIcon,
  Maximize2,
  Phone,
} from "lucide-react";
import { useAdminStore } from "@/lib/stores/admin-store";
import { parseVideoUrl } from "@/lib/utils/video";

// ═══════════════════════════════════════════════════════
//  Stats
// ═══════════════════════════════════════════════════════

const STATS = [
  { icon: Clock, value: 15, suffix: "+", label: "سال تجربه" },
  { icon: Users, value: 5000, suffix: "+", label: "بیمار راضی" },
  { icon: Star, value: 4.9, suffix: "", label: "امتیاز رضایت" },
  { icon: Award, value: 20, suffix: "+", label: "خدمت تخصصی" },
];

// ═══════════════════════════════════════════════════════
//  useCountUp
// ═══════════════════════════════════════════════════════

function useCountUp(target: number, duration: number = 2000, start: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    let rafId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(target * eased);
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [target, duration, start]);

  return count;
}

// ═══════════════════════════════════════════════════════
//  StatItem
// ═══════════════════════════════════════════════════════

function StatItem({
  icon: Icon,
  value,
  suffix,
  label,
  delay,
  animate,
}: {
  icon: any;
  value: number;
  suffix: string;
  label: string;
  delay: number;
  animate: boolean;
}) {
  const count = useCountUp(value, 2000, animate);
  const isDecimal = value % 1 !== 0;
  const displayValue = isDecimal
    ? count.toFixed(1)
    : Math.floor(count).toLocaleString("fa-IR");

  return (
    <div
      className="flex flex-col items-center gap-1.5 animate-count-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-1.5">
        <Icon
          className="h-3.5 w-3.5 md:h-4 md:w-4"
          style={{ color: "var(--theme-accent)" }}
        />
        <span className="text-lg md:text-2xl font-bold text-white">
          {displayValue}
          <span style={{ color: "var(--theme-accent)" }}>{suffix}</span>
        </span>
      </div>
      <span className="text-[10px] md:text-xs text-white/60">{label}</span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
//  Main
// ═══════════════════════════════════════════════════════

export function MenuHero() {
  const content = useAdminStore((s) => s.content);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cinemaVideoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [cinemaMode, setCinemaMode] = useState(false);

  // Parallax
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [statsAnimated, setStatsAnimated] = useState(false);

  const video = parseVideoUrl(content.heroVideoUrl || "");
  const enabled = content.heroEnabled;
  const brandName = content.brandName;
  const brandSubtitle = content.brandSubtitle;
  const slogan = content.slogan;
  const logoUrl = content.logoUrl;
  const posterUrl = content.heroPosterUrl;
  const phone = content.phone;

  const showVideo = enabled && video.type !== "empty";
  const isIframe = video.type === "aparat" || video.type === "youtube";
  const isNative = video.type === "mp4";

  // ─── Mouse ──────────────────────────────
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!sectionRef.current || cinemaMode) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x, y });
    },
    [cinemaMode]
  );

  // ─── Scroll ─────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ─── Intersection ───────────────────────
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsVisible(visible);
        if (isNative && videoRef.current && !cinemaMode) {
          if (visible) {
            videoRef.current.play().catch(() => {});
            setIsPlaying(true);
          } else {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isNative, cinemaMode]);

  // ─── Stats trigger ──────────────────────
  useEffect(() => {
    if (isVisible && !statsAnimated) {
      const timer = setTimeout(() => setStatsAnimated(true), 800);
      return () => clearTimeout(timer);
    }
  }, [isVisible, statsAnimated]);

  // ─── Mute sync ──────────────────────────
  useEffect(() => {
    const v = videoRef.current;
    if (v) v.muted = isMuted;
    const cv = cinemaVideoRef.current;
    if (cv) cv.muted = isMuted;
  }, [isMuted, videoReady, cinemaMode]);

  // ─── ESC to exit cinema ─────────────────
  useEffect(() => {
    if (!cinemaMode) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCinemaMode(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [cinemaMode]);

  // ─── Lock scroll in cinema ──────────────
  useEffect(() => {
    if (cinemaMode) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [cinemaMode]);

  // ─── Handlers ───────────────────────────
  const enterCinemaMode = () => {
    if (!showVideo) return;
    setCinemaMode(true);
  };

  const exitCinemaMode = () => {
    setCinemaMode(false);
  };

  const togglePlay = () => {
    if (isIframe) return;
    const v = cinemaMode ? cinemaVideoRef.current : videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (isIframe) {
      setIframeKey((k) => k + 1);
    }
  };

  const getIframeUrl = () => {
    if (!video.embedUrl) return "";
    const base = video.embedUrl.split("?")[0];
    const params = new URLSearchParams();

    if (video.type === "aparat") {
      params.set("autoplay", "true");
      params.set("mute", isMuted ? "true" : "false");
      params.set("hideInfo", "true");
    } else if (video.type === "youtube") {
      params.set("autoplay", "1");
      params.set("mute", isMuted ? "1" : "0");
      params.set("loop", "1");
      params.set("controls", "0");
      params.set("showinfo", "0");
      params.set("rel", "0");
      params.set("modestbranding", "1");
      params.set("playsinline", "1");
    }

    return `${base}?${params.toString()}`;
  };

  // Parallax
  const parallaxY = Math.min(scrollY * 0.4, 400);
  const contentOpacity = Math.max(1 - scrollY / 600, 0);

  return (
    <>
      {/* ═══════════════════════════════════════════════════
          Normal Hero
          ═══════════════════════════════════════════════════ */}
      <section
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
        className="relative min-h-[85svh] md:min-h-[90svh] w-full overflow-hidden rounded-b-[32px] md:rounded-b-[48px]"
      >
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{ transform: `translateY(${parallaxY * 0.3}px)` }}
        >
          {posterUrl ? (
            <div
              className="absolute inset-0 bg-cover bg-center animate-ken-burns"
              style={{ backgroundImage: `url(${posterUrl})` }}
            />
          ) : (
            <div
              className="absolute inset-0 animate-gradient"
              style={{
                background: `linear-gradient(135deg, var(--theme-primary), #0b1f1d 50%, var(--theme-primary) 100%)`,
              }}
            />
          )}

          {showVideo && isNative && (
            <video
              ref={videoRef}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                videoReady ? "opacity-100" : "opacity-0"
              }`}
              src={video.url}
              poster={posterUrl || undefined}
              autoPlay
              loop
              muted
              playsInline
              onCanPlay={() => setVideoReady(true)}
            />
          )}

          {showVideo && isIframe && video.embedUrl && (
            <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
              <iframe
                key={iframeKey}
                src={getIframeUrl()}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] h-[56.25vw] min-w-full min-h-full"
                allow="autoplay; fullscreen; encrypted-media"
                allowFullScreen
                title="Hero Video"
                frameBorder="0"
              />
            </div>
          )}
        </div>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/70 via-ink-900/25 to-ink-900/90" />
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background: `radial-gradient(ellipse at center, transparent 0%, rgba(11, 31, 29, 0.75) 100%)`,
          }}
        />

        <div
          className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full opacity-20 blur-3xl animate-pulse"
          style={{ background: "var(--theme-accent)" }}
        />
        <div
          className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full opacity-20 blur-3xl animate-pulse"
          style={{ background: "var(--theme-primary)" }}
        />

        {/* Content */}
        <div
          className="relative z-10 flex min-h-[85svh] md:min-h-[90svh] flex-col items-center justify-center px-6 pt-24 pb-24 text-center"
          style={{
            opacity: contentOpacity,
            transform: `translateY(${-scrollY * 0.15}px)`,
          }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-md px-4 py-2 text-xs md:text-sm font-medium text-white/90 mb-6 animate-fade-blur-up">
            <span
              className="relative flex h-2 w-2"
              style={{ color: "var(--theme-accent)" }}
            >
              <span className="absolute inline-flex h-full w-full rounded-full bg-current opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
            </span>
            <span>دندانپزشکی تخصصی و زیبایی</span>
          </div>

          {/* Logo */}
          <div
            className="relative mb-8 animate-scale-in animate-float cursor-pointer group"
            onClick={enterCinemaMode}
            style={{
              transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
              transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            title="کلیک برای تماشای ویدیو"
          >
            <div
              className="absolute -inset-8 rounded-full opacity-40 blur-3xl animate-glow-pulse"
              style={{
                background: `radial-gradient(circle, var(--theme-accent), transparent 70%)`,
              }}
            />
            <div
              className="absolute -inset-4 rounded-full border-2 border-dashed opacity-30 animate-spin"
              style={{
                borderColor: "var(--theme-accent)",
                animationDuration: "25s",
              }}
            />
            <div
              className="absolute -inset-2 rounded-full border opacity-40 animate-glow-ring"
              style={{ borderColor: "var(--theme-accent)" }}
            />
            <div
              className="relative flex h-28 w-28 md:h-36 md:w-36 items-center justify-center rounded-full border-4 shadow-2xl overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, var(--theme-primary), var(--theme-primary))",
                borderColor: "var(--theme-accent)",
              }}
            >
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={brandName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="text-center">
                  <div
                    className="text-4xl md:text-5xl font-bold"
                    style={{ color: "var(--theme-accent)" }}
                  >
                    ق
                  </div>
                  <div
                    className="mt-1 text-[10px] md:text-xs tracking-widest opacity-80"
                    style={{ color: "var(--theme-accent)" }}
                  >
                    QARAH
                  </div>
                </div>
              )}
              <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </div>
            </div>

            {/* Play overlay */}
            {showVideo && (
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full backdrop-blur-md"
                  style={{ background: "var(--theme-accent)" }}
                >
                  <Maximize2 className="h-6 w-6 text-ink-900" />
                </div>
              </div>
            )}
          </div>

          {/* Brand */}
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] animate-fade-blur-up"
            style={{
              animationDelay: "200ms",
              transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)`,
              transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {brandName}
          </h1>

          <div
            className="mt-3 inline-flex items-center gap-2 animate-fade-blur-up"
            style={{ animationDelay: "350ms" }}
          >
            <span
              className="h-px w-8 opacity-60"
              style={{ background: "var(--theme-accent)" }}
            />
            <p
              className="text-sm md:text-base font-medium"
              style={{ color: "var(--theme-accent)" }}
            >
              {brandSubtitle}
            </p>
            <span
              className="h-px w-8 opacity-60"
              style={{ background: "var(--theme-accent)" }}
            />
          </div>

          <p
            className="mt-6 max-w-2xl text-base md:text-xl text-white/85 leading-relaxed animate-fade-blur-up"
            style={{ animationDelay: "500ms" }}
          >
            {slogan}
          </p>

          {/* CTAs */}
          <div
            className="mt-10 flex flex-col sm:flex-row items-center gap-3 animate-fade-blur-up"
            style={{ animationDelay: "650ms" }}
          >
            <a
              href="/booking"
              className="group relative overflow-hidden inline-flex items-center gap-2 rounded-2xl px-7 py-4 text-sm md:text-base font-bold text-ink-900 shadow-2xl hover:scale-[1.03] active:scale-95 transition-all"
              style={{
                background: "var(--theme-accent)",
                boxShadow: "0 20px 40px -12px var(--theme-accent)",
              }}
            >
              <CalendarCheck className="relative z-10 h-5 w-5" />
              <span className="relative z-10">رزرو نوبت آنلاین</span>
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-shimmer" />
              </div>
            </a>

            <a
              href="/services"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/25 bg-white/5 backdrop-blur-md px-7 py-4 text-sm md:text-base font-medium text-white hover:bg-white/15 hover:border-white/40 transition-all"
            >
              <Sparkles className="h-5 w-5" />
              مشاهده خدمات
            </a>
          </div>

          {/* Stats */}
          <div
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4 max-w-2xl w-full animate-fade-blur-up"
            style={{ animationDelay: "800ms" }}
          >
            {STATS.map((stat, idx) => (
              <StatItem
                key={stat.label}
                icon={stat.icon}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                delay={idx * 100}
                animate={statsAnimated}
              />
            ))}
          </div>
        </div>

        {/* Video Controls (Normal) */}
        {showVideo && (
          <div
            className="absolute bottom-6 right-6 z-20 animate-fade-blur-up"
            style={{ animationDelay: "1000ms" }}
          >
            <div className="flex items-center gap-1 rounded-full border border-white/20 bg-ink-900/60 backdrop-blur-xl p-1 shadow-2xl">
              {isNative && (
                <button
                  onClick={togglePlay}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/10 transition-all"
                  aria-label={isPlaying ? "توقف" : "پخش"}
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </button>
              )}

              <button
                onClick={enterCinemaMode}
                className="flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/10 transition-all"
                aria-label="حالت تمام صفحه"
                title="تماشای تمام صفحه"
              >
                <Maximize2 className="h-4 w-4" />
              </button>

              <button
                onClick={toggleMute}
                className="relative flex h-10 items-center gap-2 rounded-full px-3 text-white hover:bg-white/10 transition-all"
                aria-label={isMuted ? "روشن کردن صدا" : "قطع صدا"}
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}

                {!isMuted && (
                  <div className="flex items-end gap-0.5 h-3">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="sound-wave-bar w-0.5 rounded-full"
                        style={{
                          height: "100%",
                          background: "var(--theme-accent)",
                          animationDelay: `${i * 100}ms`,
                        }}
                      />
                    ))}
                  </div>
                )}

                {isMuted && (
                  <span className="text-[10px] font-medium text-white/60">
                    بی‌صدا
                  </span>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Scroll Indicator */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-1 text-white/50 pointer-events-none animate-fade-blur-up"
          style={{ animationDelay: "1200ms", opacity: contentOpacity }}
        >
          <span className="text-[10px] tracking-wide mb-0.5">
            اسکرول کنید
          </span>
          <div className="flex h-8 w-5 items-start justify-center rounded-full border border-white/30 p-1">
            <div
              className="h-1.5 w-1 rounded-full animate-bounce-gentle"
              style={{ background: "var(--theme-accent)" }}
            />
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
      </section>

      {/* ═══════════════════════════════════════════════════
          Cinema Mode — Full Screen Video
          ═══════════════════════════════════════════════════ */}
      {cinemaMode && showVideo && (
        <div
          className="fixed inset-0 z-[100] bg-black flex flex-col"
          dir="rtl"
        >
          {/* ═══ Header ═══ */}
          <header className="relative z-30 shrink-0 border-b border-white/10 bg-ink-900/80 backdrop-blur-xl">
            <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-4 md:px-6">
              {/* Logo + Brand */}
              <div className="flex items-center gap-2.5 shrink-0">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl font-bold shadow-sm overflow-hidden shrink-0"
                  style={{ background: "var(--theme-primary)" }}
                >
                  {logoUrl ? (
                    <img
                      src={logoUrl}
                      alt={brandName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-white">ق</span>
                  )}
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-sm md:text-base font-bold text-white">
                    {brandName}
                  </span>
                  <span className="text-[10px] md:text-xs text-white/60">
                    {brandSubtitle}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${phone}`}
                  className="hidden md:flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition"
                >
                  <Phone className="h-4 w-4" />
                  <span dir="ltr">{phone}</span>
                </a>
                <a
                  href="/booking"
                  className="hidden md:inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold shadow-sm"
                  style={{
                    background: "var(--theme-accent)",
                    color: "#0b1f1d",
                  }}
                >
                  <CalendarCheck className="h-4 w-4" />
                  رزرو نوبت
                </a>

                {/* Close Button */}
                <button
                  onClick={exitCinemaMode}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 text-white hover:bg-white/10 hover:scale-105 transition-all"
                  aria-label="بستن"
                  title="بستن (ESC)"
                >
                  <CloseIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </header>

          {/* ═══ Video ═══ */}
          <div className="flex-1 relative overflow-hidden">
            {isNative ? (
              <video
                ref={cinemaVideoRef}
                src={video.url}
                className="absolute inset-0 w-full h-full object-contain"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                controls={false}
              />
            ) : video.embedUrl ? (
              <iframe
                key={`cinema-${iframeKey}`}
                src={getIframeUrl()}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; fullscreen; encrypted-media"
                allowFullScreen
                title="Cinema Video"
                frameBorder="0"
              />
            ) : null}

            {/* Bottom Controls Overlay */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
              <div className="flex items-center gap-1 rounded-full border border-white/20 bg-ink-900/70 backdrop-blur-xl p-1 shadow-2xl">
                {isNative && (
                  <button
                    onClick={togglePlay}
                    className="flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/10 transition-all"
                    aria-label={isPlaying ? "توقف" : "پخش"}
                  >
                    {isPlaying ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </button>
                )}

                <button
                  onClick={toggleMute}
                  className="flex h-10 items-center gap-2 rounded-full px-3 text-white hover:bg-white/10 transition-all"
                  aria-label={isMuted ? "روشن کردن صدا" : "قطع صدا"}
                >
                  {isMuted ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}

                  {!isMuted && (
                    <div className="flex items-end gap-0.5 h-3">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="sound-wave-bar w-0.5 rounded-full"
                          style={{
                            height: "100%",
                            background: "var(--theme-accent)",
                            animationDelay: `${i * 100}ms`,
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {isMuted && (
                    <span className="text-[10px] font-medium text-white/60">
                      بی‌صدا
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* ESC Hint */}
            <div className="absolute bottom-6 right-6 z-30 hidden md:flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-md px-4 py-2 text-xs text-white/70">
              <CloseIcon className="h-3.5 w-3.5" />
              <span>برای خروج ESC را بزنید</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}