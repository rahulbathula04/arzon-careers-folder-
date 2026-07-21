import { useEffect, useRef, useState } from "react";
import { ExternalLink, PlayCircle, Tv } from "lucide-react";
import { LINKS } from "./constants";
import { trackEvent } from "@/lib/analytics";

/**
 * ETV Telangana video embed with automatic click-out fallback.
 *
 * YouTube lets the rights holder (here, ETV News) disable third-party
 * embedding. When that happens the iframe loads but shows
 * "Video unavailable. This video contains content from ETV News..."
 *, there is no DOM error event we can hook into because the iframe
 * itself loaded fine; only the cross-origin player content is blocked.
 *
 * Strategy:
 *  1. By default, render a poster + Play button (no iframe yet, keeps
 *     LCP clean and avoids the blocked frame on first paint).
 *  2. On click, mount the iframe and probe the YouTube oEmbed endpoint
 *     (`https://www.youtube.com/oembed?url=...`). If oEmbed returns
 *     non-OK, the video is unavailable for embedding → swap to a
 *     "Watch on YouTube" click-out card pointing at LINKS.mediaETV.watch.
 *  3. If oEmbed succeeds we keep the iframe; if the user reports it's
 *     still blocked, the click-out CTA shown alongside the player
 *     remains the reliable escape hatch.
 */
export function EtvVideoEmbed({
  variant = "section",
  autoStart = false,
}: {
  /** "section" = full poster card with Tv chip overlay; "dialog" = bare frame inside a modal. */
  variant?: "section" | "dialog";
  /** If true, mount the iframe immediately (used inside the dialog). */
  autoStart?: boolean;
}) {
  const m = LINKS.mediaETV;
  const [playing, setPlaying] = useState(autoStart);
  const [blocked, setBlocked] = useState(false);
  const probedRef = useRef(false);
  const blockedReportedRef = useRef(false);

  // Fire one event when the fallback poster is shown (either via oEmbed
  // probe or because autoStart users hit the same blocked state).
  useEffect(() => {
    if (!blocked || blockedReportedRef.current) return;
    blockedReportedRef.current = true;
    trackEvent("media_embed_blocked", {
      provider: "youtube",
      video_id: m.youtubeId,
      surface: variant,
      auto_start: autoStart,
    });
  }, [blocked, m.youtubeId, variant, autoStart]);

  // Probe oEmbed once, when we first decide to play.
  useEffect(() => {
    if (!playing || probedRef.current) return;
    probedRef.current = true;
    const watchUrl = `https://www.youtube.com/watch?v=${m.youtubeId}`;
    const oembed = `https://www.youtube.com/oembed?url=${encodeURIComponent(watchUrl)}&format=json`;
    fetch(oembed, { mode: "cors" })
      .then((res) => {
        // 401 / 403 / 404 from oEmbed = not embeddable.
        if (!res.ok) setBlocked(true);
      })
      .catch(() => {
        // Network blocked / CORS: don't assume blocked, leave iframe in place.
      });
  }, [playing, m.youtubeId]);

  const fallbackPoster = (
    <a
      href={m.watch}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        trackEvent("media_youtube_clickout", {
          provider: "youtube",
          video_id: m.youtubeId,
          surface: variant,
          reason: "embed_blocked",
        })
      }
      className="group absolute inset-0 flex items-center justify-center text-slate-50"
      aria-label={`Watch on YouTube: ${m.outlet} feature on Srikanth Sinha`}
    >
      <img
        src={m.poster}
        alt={`${m.outlet} feature on Srikanth Sinha, ${m.title}`}
        loading="lazy"
        decoding="async"
        onError={(e) => {
          const img = e.currentTarget;
          if (!img.dataset.fallback) {
            img.dataset.fallback = "1";
            img.src = `https://i.ytimg.com/vi/${m.youtubeId}/mqdefault.jpg`;
          }
        }}
        className="absolute inset-0 h-full w-full object-cover opacity-80 transition group-hover:opacity-95"
      />
      <span className="relative inline-flex items-center gap-2 rounded-full bg-gold/95 px-5 py-2.5 text-sm font-semibold text-gold-ink shadow-xl">
        <ExternalLink className="h-4 w-4" /> Watch on YouTube
      </span>
      {variant === "section" ? (
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1 font-mono text-micro font-semibold uppercase tracking-[0.18em] text-slate-50 backdrop-blur">
          <Tv className="h-3 w-3 text-gold" /> {m.outlet}
        </span>
      ) : null}
      <span className="absolute bottom-3 left-3 right-3 text-center font-mono text-micro uppercase tracking-[0.18em] text-slate-100/75">
        Plays on YouTube, embed disabled by the broadcaster
      </span>
    </a>
  );

  if (blocked) {
    return <div className="tone-dark relative aspect-video w-full bg-black">{fallbackPoster}</div>;
  }

  if (!playing) {
    return (
      <div className="tone-dark relative aspect-video w-full bg-black">
        <button
          type="button"
          onClick={() => {
            setPlaying(true);
            trackEvent("media_play_click", {
              provider: "youtube",
              video_id: m.youtubeId,
              surface: variant,
            });
          }}
          className="group absolute inset-0 flex items-center justify-center text-slate-50"
          aria-label={`Play: ${m.outlet} feature on Srikanth Sinha`}
        >
          <img
            src={m.poster}
            alt={`${m.outlet} feature on Srikanth Sinha, ${m.title}`}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              const img = e.currentTarget;
              if (!img.dataset.fallback) {
                img.dataset.fallback = "1";
                img.src = `https://i.ytimg.com/vi/${m.youtubeId}/mqdefault.jpg`;
              }
            }}
            className="absolute inset-0 h-full w-full object-cover opacity-80 transition group-hover:opacity-95"
          />
          <span className="relative inline-flex items-center gap-2 rounded-full bg-gold/95 px-5 py-2.5 text-sm font-semibold text-gold-ink shadow-xl">
            <PlayCircle className="h-4 w-4" /> Play feature
          </span>
          {variant === "section" ? (
            <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1 font-mono text-micro font-semibold uppercase tracking-[0.18em] text-slate-50 backdrop-blur">
              <Tv className="h-3 w-3 text-gold" /> {m.outlet}
            </span>
          ) : null}
        </button>
      </div>
    );
  }

  return (
    <div className="tone-dark relative aspect-video w-full bg-black">
      <iframe
        src={`${m.embed}&autoplay=1&rel=0&modestbranding=1`}
        title={`${m.outlet}, ${m.title}`}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  );
}
