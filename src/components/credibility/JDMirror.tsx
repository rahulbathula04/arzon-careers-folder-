import { Link } from "@tanstack/react-router";
import { ArrowRight, RefreshCw, Sparkles, CheckCircle2, BookOpen, MapPin } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { JD_PROVENANCE } from "@/data/jdProvenance";
import { JDProvenanceBlock } from "./JDProvenanceBadge";

function formatRefreshDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
}

/** Coursera-style colored "course cover" gradient per track. */
const TRACK_THEMES: Record<
  string,
  { gradient: string; accent: string; ring: string; chip: string; emoji: string }
> = {
  pharmacovigilance: {
    gradient: "from-[#1f3a8a] via-[#2563eb] to-[#0ea5e9]",
    accent: "#38bdf8",
    ring: "ring-accent-glow/40",
    chip: "bg-accent-glow/15 text-eyebrow-strong ring-accent-glow/30",
    emoji: "💊",
  },
  "medical-coding": {
    gradient: "from-[#7c2d12] via-[#ea580c] to-[#f59e0b]",
    accent: "#fb923c",
    ring: "ring-orange-400/40",
    chip: "bg-orange-400/15 text-orange-200 ring-orange-300/30",
    emoji: "🩺",
  },
  "clinical-data-management": {
    gradient: "from-[#064e3b] via-[#059669] to-[#34d399]",
    accent: "#34d399",
    ring: "ring-accent-glow/40",
    chip: "bg-accent-glow/15 text-eyebrow-strong ring-accent-glow/30",
    emoji: "📊",
  },
  "sas-clinical": {
    gradient: "from-[#4c1d95] via-[#7c3aed] to-[#a78bfa]",
    accent: "#a78bfa",
    ring: "ring-violet-400/40",
    chip: "bg-violet-400/15 text-violet-200 ring-violet-300/30",
    emoji: "💻",
  },
  "regulatory-affairs": {
    gradient: "from-[#831843] via-[#db2777] to-[#f472b6]",
    accent: "#f472b6",
    ring: "ring-pink-400/40",
    chip: "bg-pink-400/15 text-pink-200 ring-pink-300/30",
    emoji: "📋",
  },
  "medical-writing": {
    gradient: "from-[#1e3a8a] via-[#3b82f6] to-[#93c5fd]",
    accent: "#60a5fa",
    ring: "ring-accent-glow/40",
    chip: "bg-accent-glow/15 text-eyebrow-strong ring-accent-glow/30",
    emoji: "✍️",
  },
};

const DEFAULT_THEME = TRACK_THEMES.pharmacovigilance;

/**
 * JD Mirror — the sitewide credibility pillar.
 * Shows side-by-side: JD line → Arzon module that trains for it.
 * Embeddable on home, /proof, /jd-mirror.
 */
export function JDMirror({
  variant = "full",
  className,
}: {
  /** "full" shows methodology block + all tracks; "compact" shows only the live ticker grid. */
  variant?: "full" | "compact";
  className?: string;
}) {
  return (
    <Section
      size="md"
      tone="light"
      className={`tone-light isolate ${className ?? ""}`}
      id="jd-mirror"
    >
      <div
        className="tone-light max-w-3xl rounded-2xl p-4 shadow-sm ring-1 sm:p-5"
        style={{
          background: "var(--card)",
          color: "var(--ink)",
          borderColor: "var(--border)",
        }}
      >
        <span className="chip-enterprise">
          <Sparkles className="h-3 w-3" aria-hidden="true" />
          The JD Mirror · live credibility
        </span>
        <h2
          className="h-section mt-2.5"
          style={{
            color: "var(--ink)",
            WebkitTextFillColor: "var(--ink)",
            background: "none",
          }}
        >
          " The exact lines from real Indian JDs{" "}
          <em className="italic" style={{ color: "var(--teal-ink, #0b7d72)", fontWeight: 600 }}>
            and the module we built to train for each one.
          </em>{" "}
          "
        </h2>
        <p className="mt-2.5" style={{ color: "var(--ink-soft)", fontSize: 14, lineHeight: 1.55 }}>
          Recruiters write JDs in a very specific language. We read thousands of them, extract what
          actually repeats, and turn each recurring requirement into a graded week of training with
          a real deliverable. Nothing in our syllabus is academic filler.
        </p>
      </div>

      {variant === "full" && (
        <div className="tone-dark mt-6 rounded-3xl bg-[#0B1426] p-1">
          <JDProvenanceBlock />
        </div>
      )}

      <div className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-3.5 lg:grid-cols-3">
        {JD_PROVENANCE.map((p) => {
          const theme = TRACK_THEMES[p.slug] ?? DEFAULT_THEME;
          const phrases = p.topJdPhrases.slice(0, 3);
          const avgCoverage = Math.round(
            (phrases.reduce((s, x) => s + x.coverage, 0) / phrases.length) * 100,
          );
          return (
            <article
              key={p.slug}
              className="tone-dark group relative flex flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-1 hover:border-slate-700 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)]"
            >
              {/* Coursera-style cover banner */}
              <div className={`relative h-16 overflow-hidden bg-gradient-to-br ${theme.gradient}`}>
                {/* Dark scrim for AA contrast across all theme gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10" />
                <div
                  className="absolute -bottom-3 -right-2 text-4xl select-none mix-blend-soft-light opacity-90"
                  aria-hidden="true"
                >
                  {theme.emoji}
                </div>
                <div className="relative flex h-full flex-col justify-between p-2.5">
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex items-center gap-1 rounded-full bg-white px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] ring-1 ring-white/80"
                      style={{ color: "#0f172a", WebkitTextFillColor: "#0f172a" }}
                    >
                      <BookOpen className="h-2.5 w-2.5" aria-hidden="true" /> Track
                    </span>
                    <span
                      className="inline-flex items-center gap-1 rounded-full bg-white px-1.5 py-0.5 text-[9px] font-bold ring-1 ring-white/70"
                      style={{ color: "#0f172a", WebkitTextFillColor: "#0f172a" }}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: theme.accent }}
                        aria-hidden="true"
                      />
                      {avgCoverage}% match
                    </span>
                  </div>
                  <div>
                    <h3
                      className="font-display text-sm font-extrabold leading-tight sm:text-base [text-shadow:0_1px_3px_rgba(0,0,0,0.7)]"
                      style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
                    >
                      {p.roleTitle}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Card body */}
              <div className="flex flex-1 flex-col p-3">
                {/* Stat strip */}
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[10px] text-slate-300">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="font-mono font-bold text-white">
                      {p.jdCount.toLocaleString("en-IN")}
                    </span>{" "}
                    JDs
                  </span>
                  <span className="h-1 w-1 rounded-full bg-slate-500" aria-hidden="true" />
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-2.5 w-2.5" aria-hidden="true" />
                    {p.topMetros.slice(0, 2).join(" · ")}
                  </span>
                </div>

                {/* Lesson-style JD lines (Duolingo skill rows) */}
                <ul className="mt-2 space-y-1.5">
                  {phrases.map((phr) => {
                    const pct = Math.round(phr.coverage * 100);
                    return (
                      <li
                        key={phr.phrase}
                        className="group/row rounded-lg border border-slate-700/70 bg-slate-900/70 p-1.5 transition-colors hover:border-slate-600 hover:bg-slate-800/80"
                      >
                        <div className="flex items-start gap-2">
                          <span
                            className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full ring-2"
                            style={{
                              backgroundColor: `${theme.accent}33`,
                              color: "#ffffff",
                              boxShadow: `inset 0 0 0 1px ${theme.accent}aa`,
                            }}
                            aria-hidden="true"
                          >
                            <CheckCircle2 className="h-2.5 w-2.5" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="text-[11px] font-medium leading-snug text-slate-100">
                              "{phr.phrase}"
                            </p>
                            {/* Coverage bar */}
                            <div className="mt-1 flex items-center gap-2">
                              <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-slate-700">
                                <div
                                  className="h-full rounded-full transition-all duration-700 group-hover/row:brightness-110"
                                  style={{
                                    width: `${pct}%`,
                                    background: `linear-gradient(90deg, ${theme.accent}, ${theme.accent}cc)`,
                                    boxShadow: `0 0 12px ${theme.accent}66`,
                                  }}
                                />
                              </div>
                              <span
                                className="font-mono text-[10px] font-bold tabular-nums [text-shadow:0_1px_2px_rgba(0,0,0,0.6)]"
                                style={{ color: theme.accent }}
                              >
                                {pct}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                {/* What's new */}
                {p.lastChange && (
                  <div className="mt-2 flex items-start gap-1.5 rounded-lg border border-amber-400/40 bg-amber-950/50 px-2 py-1">
                    <RefreshCw
                      className="mt-0.5 h-3 w-3 flex-shrink-0 text-amber-300"
                      aria-hidden="true"
                    />
                    <p
                      className="text-[10px] leading-snug line-clamp-2"
                      style={{ color: "#fef3c7", WebkitTextFillColor: "#fef3c7" }}
                    >
                      <span
                        style={{
                          color: "#fde68a",
                          WebkitTextFillColor: "#fde68a",
                          fontWeight: 700,
                        }}
                      >
                        Updated {formatRefreshDate(p.lastChange.dateISO)}:
                      </span>{" "}
                      {p.lastChange.note}
                    </p>
                  </div>
                )}

                {/* CTA — Coursera-style primary button */}
                <Link
                  to="/courses/$slug"
                  params={{ slug: p.slug }}
                  className="mt-2.5 inline-flex items-center justify-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[11px] font-bold text-slate-950 shadow-md shadow-black/20 transition-all hover:scale-[1.02] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                  aria-label={`Explore the ${p.roleTitle} track`}
                >
                  Explore track
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
