// ═══════════════════════════════════════════════════════
//  Video URL Parser — تشخیص نوع ویدیو
// ═══════════════════════════════════════════════════════

export type VideoSource =
  | { type: "mp4"; url: string; embedUrl: null }
  | { type: "aparat"; url: string; embedUrl: string }
  | { type: "youtube"; url: string; embedUrl: string }
  | { type: "empty"; url: ""; embedUrl: null }
  | { type: "unknown"; url: string; embedUrl: null };

export function parseVideoUrl(url: string): VideoSource {
  const trimmed = (url || "").trim();
  if (!trimmed) {
    return { type: "empty", url: "", embedUrl: null };
  }

  // ─── Aparat ────────────────────────────
  // https://www.aparat.com/v/9Fwxn
  const aparatMatch = trimmed.match(/aparat\.com\/v\/([a-zA-Z0-9_-]+)/);
  if (aparatMatch) {
    const hash = aparatMatch[1];
    return {
      type: "aparat",
      url: trimmed,
      embedUrl: `https://www.aparat.com/video/video/embed/videohash/${hash}/vt/frame?autoplay=true&mute=true`,
    };
  }

  // ─── YouTube ───────────────────────────
  const ytMatch = trimmed.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/
  );
  if (ytMatch) {
    const id = ytMatch[1];
    return {
      type: "youtube",
      url: trimmed,
      embedUrl: `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}`,
    };
  }

  // ─── Direct MP4/WebM ───────────────────
  if (/\.(mp4|webm|ogg|mov)(\?|$)/i.test(trimmed)) {
    return { type: "mp4", url: trimmed, embedUrl: null };
  }

  return { type: "unknown", url: trimmed, embedUrl: null };
}