"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

type MenuHeroProps = {
  videoUrl?: string;
  posterUrl?: string;
  enabled?: boolean;
  brandName?: string;
  brandSubtitle?: string;
  slogan?: string;
};

export function MenuHero({
  videoUrl = "",
  posterUrl = "",
  enabled = false,
  brandName = "دکتر قره‌داغی",
  brandSubtitle = "دندانپزشکی تخصصی",
  slogan = "لبخند؛ هنر دستان ما",
}: MenuHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

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

  return (
    <section className="relative min-h-[75svh] md:min-h-[80svh] w-full overflow-hidden rounded-b-[32px] md:rounded-b-[48px]">
      {enabled && videoUrl ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={videoUrl}
          poster={posterUrl || undefined}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-brand-800 via-brand-900 to-ink-900" />
      )}

<div className="absolute inset-0 bg-gradient-to-b from-ink-900/80 via-ink-900/65 to-ink-900/90" />
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gold-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-brand-400/20 blur-3xl" />

      <div className="relative z-10 flex min-h-[75svh] md:min-h-[80svh] flex-col items-center justify-center px-6 pt-20 text-center">
        <div className="relative mb-6">
          <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-gold-400 via-gold-500 to-gold-600 opacity-50 blur-md" />
          <div className="relative flex h-28 w-28 md:h-32 md:w-32 items-center justify-center rounded-full bg-gradient-to-br from-brand-700 via-brand-800 to-ink-900 border-4 border-gold-500/40 shadow-2xl">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gold-400">
                ق
              </div>
              <div className="mt-0.5 text-[10px] md:text-xs text-gold-200/80 tracking-widest">
                QARAH
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
          {brandName}
        </h1>
        <p className="mt-1.5 text-sm md:text-base text-gold-300/90 font-medium">
          {brandSubtitle}
        </p>

        <p className="mt-6 max-w-md text-base md:text-lg text-white/85 leading-relaxed">
          {slogan}
        </p>

        {enabled && videoUrl && (
          <div className="absolute bottom-6 right-6 flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-ink-900/50 backdrop-blur-md text-white hover:bg-ink-900/70 transition"
              aria-label={isPlaying ? "توقف" : "پخش"}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </button>
            <button
              onClick={toggleMute}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-ink-900/50 backdrop-blur-md text-white hover:bg-ink-900/70 transition"
              aria-label={isMuted ? "روشن" : "قطع"}
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}