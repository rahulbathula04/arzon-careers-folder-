import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Camera, Calendar, MapPin, ImageOff, Sparkles, ArrowRight } from "lucide-react";
import { AiThinkingLoader } from "@/components/ui/AiThinkingLoader";
import { Footer } from "@/components/landing/Footer";
import { listPublishedMoments } from "@/lib/moments.functions";
import type { MomentSummary } from "@/lib/moments.types";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/moments/")({
  head: () => {
    const ps = pageSeo({
      path: "/moments",
      title: "Arzon Moments - our launch, our people, our proof",
      description:
        "A visual record of Arzon Global. Office launches, media moments, partnerships, campus visits and team milestones - published photo by photo.",
    });
    return {
      meta: [{ title: "Arzon Moments - our launch, our people, our proof" }, ...ps.meta],
      links: ps.links,
    };
  },
  component: MomentsIndex,
  errorComponent: ({ error }) => (
    <FallbackState message={error?.message ?? "Could not load moments."} />
  ),
});

function FallbackState({ message }: { message: string }) {
  return (
    <div className="tone-dark min-h-screen bg-[oklch(0.14_0.04_245)] text-white">
      <div className="mx-auto max-w-3xl px-5 py-24 text-center">
        <ImageOff className="mx-auto mb-3 h-10 w-10 text-white/50" />
        <h1 className="h-display">Arzon Moments</h1>
        <p className="mt-3 text-sm text-white/70">{message}</p>
      </div>
      <Footer />
    </div>
  );
}

function MomentsIndex() {
  const [moments, setMoments] = useState<MomentSummary[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    listPublishedMoments()
      .then((res) => {
        if (mounted) setMoments(res.moments);
      })
      .catch((e: Error) => {
        if (mounted) setError(e.message);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="tone-dark min-h-screen bg-[oklch(0.14_0.04_245)] text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <p className="font-mono text-micro font-bold uppercase tracking-[0.22em] text-sky-300">
            <Camera className="mr-2 inline h-3.5 w-3.5" /> Arzon Moments
          </p>
          <h1 className="h-display mt-3 max-w-3xl text-h1">Our story, told in photos.</h1>
          <p className="mt-4 max-w-2xl text-base text-white/75">
            Every launch, every guest, every campus visit. We publish the ceremony, not just the
            logo. Each story can hold up to 10 photos.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-12">
        {error ? (
          <p className="text-sm text-red-300">{error}</p>
        ) : moments === null ? (
          <AiThinkingLoader label="Thinking through moments…" />
        ) : moments.length === 0 ? (
          <EmptyMoments />
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {moments.map((m) => (
              <li key={m.id}>
                <Link
                  to="/moments/$slug"
                  params={{ slug: m.slug }}
                  className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-sky-300/40 hover:bg-white/10"
                >
                  <div className="aspect-[4/3] w-full bg-[#0a0c10]/40 backdrop-blur-md shadow-sm">
                    {m.cover_url ? (
                      <img
                        src={m.cover_url}
                        alt={m.subtitle ?? m.title}
                        className="h-full w-full object-cover transition group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-white/30">
                        <ImageOff className="h-10 w-10" />
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="font-mono text-micro font-bold uppercase tracking-[0.22em] text-sky-300/90">
                      {m.category}
                    </p>
                    <h2 className="mt-2 font-grotesk text-lg font-semibold leading-snug text-white">
                      {m.title}
                    </h2>
                    {m.subtitle ? (
                      <p className="mt-1 text-sm text-white/70 line-clamp-2">{m.subtitle}</p>
                    ) : null}
                    <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/55">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(m.event_date)}
                      </span>
                      {m.location ? (
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {m.location}
                        </span>
                      ) : null}
                      <span>
                        {m.image_count} photo{m.image_count === 1 ? "" : "s"}
                      </span>
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>

      <Footer />
    </div>
  );
}

function formatDate(iso: string): string {
  try {
    return new Date(iso + "T00:00:00").toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

const UPCOMING: Array<{ tag: string; title: string; hint: string }> = [
  { tag: "Launch", title: "Office inauguration reel", hint: "Ribbon cut, first cohort walk-in." },
  { tag: "Campus", title: "TASK campus visits", hint: "Faculty briefings + Q&A." },
  { tag: "Media", title: "ETV / press coverage", hint: "Segments as they publish." },
];

export function EmptyMoments({ tone = "dark" }: { tone?: "dark" | "light" } = {}) {
  const isLight = tone === "light";
  const t = {
    hairline: isLight ? "border-slate-900/10" : "border-white/10",
    hairlineDashed: isLight ? "border-slate-900/15" : "border-white/12",
    panelBg: isLight
      ? "bg-gradient-to-br from-sky-50 via-white to-white"
      : "bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-transparent",
    iconBg: isLight ? "bg-sky-500/10 ring-sky-600/30" : "bg-sky-300/10 ring-sky-300/30",
    iconFg: isLight ? "text-accent-emerald-deep" : "text-sky-300",
    eyebrow: isLight ? "text-accent-emerald-deep" : "text-sky-300",
    eyebrowSoft: isLight ? "text-accent-emerald-deep/80" : "text-sky-300/80",
    heading: isLight ? "text-ink" : "text-white",
    body: isLight ? "text-muted-foreground" : "text-white/70",
    micro: isLight ? "text-muted-foreground" : "text-white/60",
    itemBg: isLight ? "bg-muted/70" : "bg-white/[0.02]",
    iconGhost: isLight ? "text-muted-foreground" : "text-white/25",
    // Buttons are tonal islands. On the light shell the primary CTA is a
    // dark navy button, so it opts into the dark palette via `tone-dark`;
    // on the dark shell it is a white button that opts into `tone-light`.
    primaryBtn: isLight
      ? "tone-dark bg-[#0A1024] text-white hover:bg-[#0A1024]/90"
      : "tone-light bg-white text-[#0A1024] hover:bg-white/90",
    secondaryBtn: isLight
      ? "border-border text-ink hover:border-slate-400 hover:bg-muted"
      : "border-white/20 text-white hover:border-white/40 hover:bg-white/5",
  };
  return (
    <div data-testid="moments-empty-root" data-tone={tone} className="mx-auto max-w-4xl">
      <div className={`rounded-3xl border ${t.hairline} ${t.panelBg} p-8 sm:p-10`}>
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-xl ring-1 ${t.iconBg}`}
            >
              <Sparkles className={`h-5 w-5 ${t.iconFg}`} aria-hidden />
            </div>
            <div>
              <p
                className={`font-mono text-micro font-bold uppercase tracking-[0.22em] ${t.eyebrow}`}
              >
                Publishing soon
              </p>
              <h2
                className={`mt-1 font-grotesk text-xl font-semibold leading-snug sm:text-2xl ${t.heading}`}
              >
                The first stories are in edit.
              </h2>
              <p className={`mt-2 max-w-xl text-sm leading-relaxed ${t.body}`}>
                No stock photos. No placeholders. Every moment we ship is a real event, published
                with the date, place and the people who were in the room.
              </p>
            </div>
          </div>
          <div className="flex w-full flex-wrap gap-3 sm:w-auto sm:justify-end">
            <Link
              to="/courses"
              className={`inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-md px-4 text-sm font-semibold transition sm:flex-none ${t.primaryBtn}`}
            >
              Browse programmes
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              to="/about"
              className={`inline-flex h-10 flex-1 items-center justify-center rounded-md border px-4 text-sm font-semibold transition sm:flex-none ${t.secondaryBtn}`}
            >
              About Arzon
            </Link>
          </div>
        </div>
      </div>

      <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {UPCOMING.map((u) => (
          <li
            key={u.title}
            className={`overflow-hidden rounded-2xl border border-dashed ${t.hairlineDashed} ${t.itemBg}`}
          >
            <div
              className="relative aspect-[4/3] w-full bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.14),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(59,130,246,0.12),transparent_60%)]"
              aria-hidden
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Camera className={`h-8 w-8 ${t.iconGhost}`} />
              </div>
            </div>
            <div className="p-4">
              <p
                className={`font-mono text-micro font-bold uppercase tracking-[0.22em] ${t.eyebrowSoft}`}
              >
                {u.tag}
              </p>
              <p className={`mt-1.5 font-grotesk text-sm font-semibold ${t.heading}`}>{u.title}</p>
              <p className={`mt-1 text-xs ${t.micro}`}>{u.hint}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
