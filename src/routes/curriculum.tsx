import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import {
  JD_PROVENANCE,
  RESEARCH_REFRESH_QUARTER,
  refreshQuarter,
  coverageBand,
} from "@/data/jdProvenance";
import { COURSES } from "@/data/courses";
import { Footer } from "@/components/landing/Footer";
import { pageSeo } from "@/lib/seo";
import { getTrackTheme, TRACK_THEME } from "@/data/trackTheme";
import { TrackHeroPanel } from "@/components/track/TrackHeroPanel";
import { TrackModuleCard } from "@/components/track/TrackModuleCard";

export const Route = createFileRoute("/curriculum")({
  head: () => {
    const seo = pageSeo({
      path: "/curriculum",
      title: "Curriculum — JD-derived syllabus | Arzon Careers",
      description:
        "Week-by-week syllabus for 6 fresher tracks, reverse-engineered from real Indian JDs: PV, Medical Coding, CDM, Clinical SAS, RA and Medical Writing.",
      image: "/og/internships.jpg",
    });
    return {
      meta: [{ title: "Curriculum — JD-derived syllabus | Arzon Careers" }, ...seo.meta],
      links: seo.links,
    };
  },
  component: CurriculumPage,
});

function CurriculumPage() {
  const tracks = useMemo(() => {
    return JD_PROVENANCE.map((p) => {
      const course = COURSES.find((c) => c.slug === p.slug);
      return { provenance: p, course };
    }).filter((t) => t.course);
  }, []);

  const [activeSlug, setActiveSlug] = useState<string>(tracks[0]?.provenance.slug ?? "");

  return (
    <div className="tone-dark min-h-dvh bg-[#06080d] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(59,130,246,0.18),transparent_70%)]" />
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-accent-glow/30 bg-accent-glow/10 px-3 py-1 font-mono text-micro font-semibold uppercase tracking-[0.18em] text-eyebrow-strong sm:text-micro sm:tracking-[0.2em]">
            <Sparkles className="h-3.5 w-3.5 text-eyebrow" />
            <span className="truncate">JD-derived curriculum</span>
          </div>
          <h1 className="max-w-3xl text-balance text-h1 font-semibold text-white! [overflow-wrap:anywhere] hyphens-auto">
            Six fresher tracks. Each syllabus written from{" "}
            <span className="text-eyebrow">real Indian JDs</span>, not a textbook.
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-body-sm leading-relaxed text-white/80 sm:text-base lg:text-lg">
            Week-by-week modules mapped to the phrases hiring managers in India actually write into
            job descriptions. We re-read the market every quarter. Last refresh:{" "}
            <span className="text-white">{RESEARCH_REFRESH_QUARTER}</span>.
          </p>

          {/* Track quick-jump */}
          <div className="scroll-rail -mx-4 mt-6 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:mt-8 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
            {tracks.map(({ provenance: p }) => {
              const t = TRACK_THEME[p.slug as keyof typeof TRACK_THEME];
              const active = activeSlug === p.slug;
              return (
                <button
                  key={p.slug}
                  onClick={() => {
                    setActiveSlug(p.slug);
                    document
                      .getElementById(`track-${p.slug}`)
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className={`group inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-meta font-medium transition sm:shrink sm:px-3.5 sm:text-meta ${
                    active
                      ? "border-accent-glow/40 bg-sky-300 text-[#06080d] shadow-[0_0_0_3px_rgba(125,211,252,0.15)]"
                      : "border-white/20 bg-white/10 text-white hover:border-accent-glow/40 hover:bg-white/15"
                  }`}
                >
                  <span>{t?.emoji}</span>
                  <span className="whitespace-nowrap font-medium">{p.roleTitle}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tracks */}
      <div className="mx-auto max-w-7xl space-y-12 px-4 py-12 sm:space-y-16 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {tracks.map(({ provenance: p, course }) => {
          if (!course) return null;
          const t = getTrackTheme(p.slug);
          const coverageMap = new Map<string, number>();
          p.topJdPhrases.forEach((ph) => {
            if (ph.satisfiedByModule) coverageMap.set(ph.satisfiedByModule, ph.coverage);
          });

          return (
            <section key={p.slug} id={`track-${p.slug}`} className="scroll-mt-24">
              <TrackHeroPanel
                slug={p.slug}
                eyebrow={`Track ${tracks.findIndex((x) => x.provenance.slug === p.slug) + 1} of 6`}
                title={p.roleTitle}
                blurb={course.blurb}
                stats={[
                  { label: "Modules", value: String(course.syllabus.length) },
                  { label: "Refreshed", value: refreshQuarter(p.refreshedOn) },
                  { label: "Tracks", value: "6 of 6" },
                ]}
                metaRows={[
                  { label: "Hiring metros", value: p.topMetros.join(" · ") },
                  { label: "JD sources", value: p.sources.join(" · ") },
                ]}
                lastChange={p.lastChange ?? null}
              />

              {/* Syllabus modules */}
              <div className="mt-6 grid gap-3 sm:gap-4 lg:grid-cols-2">
                {course.syllabus.map((mod, idx) => {
                  const coverage = coverageMap.get(mod.title);
                  return (
                    <TrackModuleCard
                      key={idx}
                      slug={p.slug}
                      eyebrow={`Module ${idx + 1} · ${mod.weeks}`}
                      title={mod.title}
                      bullets={mod.topics}
                      deliverable={{ value: mod.deliverable }}
                      footnote={`Maps to JD requirement: "${mod.jdSkill}"`}
                      coveragePct={coverage}
                    />
                  );
                })}
              </div>

              {/* Recurring JD phrases */}
              <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.025] p-4 sm:p-6">
                <div className="mb-3 flex items-center gap-2">
                  <span className="font-mono text-micro font-semibold uppercase tracking-[0.18em] text-eyebrow/90">
                    Recurring JD phrases
                  </span>
                </div>
                <ul className="space-y-2.5">
                  {p.topJdPhrases.map((ph, i) => (
                    <li
                      key={i}
                      className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1.5 text-meta sm:text-caption"
                    >
                      <span className="min-w-0 flex-1 leading-relaxed text-white/90 [overflow-wrap:anywhere]">
                        &ldquo;{ph.phrase}&rdquo;
                      </span>
                      <span className="inline-flex shrink-0 items-center rounded-full border border-accent-glow/30 bg-accent-glow/10 px-2 py-0.5 font-mono text-micro font-semibold uppercase tracking-[0.16em] text-eyebrow-strong">
                        {coverageBand(ph.coverage)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3">
                <Link
                  to="/courses/$slug"
                  params={{ slug: course.slug }}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-center text-caption font-semibold text-black transition hover:bg-white/90 sm:w-auto sm:justify-start"
                >
                  <span className="truncate">See full {p.roleTitle} programme</span>{" "}
                  <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                </Link>
                <Link
                  to="/apply"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-caption font-semibold text-white transition hover:bg-white/10 sm:w-auto"
                >
                  Apply for this track
                </Link>
              </div>
            </section>
          );
        })}
      </div>

      <Footer />
    </div>
  );
}
