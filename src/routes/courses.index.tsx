import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CourseGrid } from "@/components/courses/CourseGrid";
import { TrackDomainGrid } from "@/components/track/TrackDomainGrid";
import { ToolsYouTouchStrip } from "@/components/courses/ToolsYouTouchStrip";
import { RecruiterQuoteStrip } from "@/components/courses/RecruiterQuoteStrip";
import { COURSES } from "@/data/courses";
import { ARZON_CORE_PROGRAMME_SLUGS } from "@/data/siteArchitecture";
import { NEXT_COHORT } from "@/components/landing/constants";
import { pageSeo } from "@/lib/seo";
import { breadcrumbSchema, itemListSchema } from "@/lib/jsonLd";
import { SITE } from "@/components/landing/constants";
import { FEATURE_FLAGS } from "@/config/featureFlags";
import { useFunnelTracking } from "@/hooks/useFunnelTracking";
import { ArzonDecisionHub } from "@/components/funnel/ArzonDecisionHub";

const CORE_COURSES = COURSES.filter((course) =>
  ARZON_CORE_PROGRAMME_SLUGS.includes(course.slug as (typeof ARZON_CORE_PROGRAMME_SLUGS)[number]),
);

export const Route = createFileRoute("/courses/")({
  headers: () => {
    return {
      "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
    };
  },
  head: () => {
    const ps = pageSeo({
      path: "/courses",
      title: "Programmes. Arzon Global",
      description:
        "Compare pharmacovigilance, medical coding, clinical research & SAS clinical courses in India. Fees, duration, internship & certification. Pick your programme.",
      image: SITE.ogImages.internships,
    });
    return {
      meta: [{ title: "Programmes. Arzon Global" }, ...ps.meta],
      links: ps.links,
      scripts: [
        {
          type: "application/ld+json",
          children: breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Programmes", path: "/courses" },
          ]),
        },
        {
          type: "application/ld+json",
          children: itemListSchema({
            name: "Arzon Global Programmes",
            items: CORE_COURSES.map((c) => ({
              name: c.title,
              path: `/courses/${c.slug}`,
              description: c.blurb,
            })),
          }),
        },
      ],
    };
  },
  component: CoursesIndex,
});

function CoursesIndex() {
  const total = CORE_COURSES.length;
  useFunnelTracking({ pageName: "courses_catalog", category: "catalog" });

  return (
    <main className="min-h-app bg-[var(--arzon-surface)] text-[#0B1325]">
      {/* Hero */}
      <section className="arzon-v2-page border-b border-[var(--arzon-border)] bg-white tone-light">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-16">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--arzon-ink-soft)] transition hover:text-[#0B1325]"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to home
          </Link>
          
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-stone-500">
              {total} HEALTHCARE PROGRAMMES &bull; {NEXT_COHORT?.label ?? "UPCOMING"} COHORT
            </p>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[var(--arzon-blue-700)] text-[11px] font-bold">
              <span>B.Pharm &bull; Pharm.D &bull; M.Pharm &bull; Life Sciences</span>
            </span>
          </div>

          <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--arzon-ink-strong)] tracking-tight leading-tight mt-3 max-w-3xl">
            Choose the role first.{" "}
            <span className="italic text-[var(--arzon-blue-700)]">Then build what the job requires.</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-[var(--arzon-ink-soft)] leading-relaxed">
            Every programme below is reverse-engineered from current Indian fresher job descriptions
            on Naukri, LinkedIn India, Foundit, and company careers pages.
          </p>

          {/* Mobile Human Image - programme catalogue */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--arzon-border)] bg-[var(--arzon-surface-subtle)] shadow-[var(--arzon-shadow-card)] md:hidden">
            <img
              src="/images/bpharm-female-graduate-hero.jpg"
              alt="Indian healthcare graduate preparing for a career"
              className="h-64 w-full object-cover object-top"
              loading="eager"
              decoding="async"
            />
          </div>

          {/* Decision CTA */}
          <div className="mt-8 max-w-3xl arzon-v2-card p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl">
                <span className="arzon-v2-eyebrow">NOT SURE WHICH ROLE FITS?</span>
                <h2 className="mt-3 text-xl font-bold text-[var(--arzon-ink)] sm:text-2xl">
                  Get a career plan before you choose a programme.
                </h2>
                <p className="mt-2 text-sm leading-6 text-[var(--arzon-ink-soft)]">
                  Take the free career assessment and get a role recommendation plus the skills you need to work on next.
                </p>
              </div>
              <Link
                to={FEATURE_FLAGS.ENABLE_ASSESSMENT ? "/career-engine" : "/courses"}
                className="arzon-v2-button-primary shrink-0"
              >
                Find my career path <ArrowLeft className="h-4 w-4 rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ArzonDecisionHub
        eyebrow="BEFORE YOU ENROL"
        title="Not sure which programme to choose?"
        description="Use the free Career Engine or inspect the role intelligence first. The catalogue should come after you understand the work you are choosing."
        primaryLabel="Find my career path"
        primaryTo="/career-engine"
        secondaryLabel="Explore Roles & Skills"
        secondaryTo="/roles"
      />

      {/* Main Track Domain Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <TrackDomainGrid />
      </section>

      {/* Core Programme Catalogue */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 border-t border-slate-200/80">
        <div className="mb-8">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-[#707C90]">
            ALL {total} PROGRAMMES
          </p>
          <h2 className="font-sans text-2xl sm:text-3xl font-bold text-[#151C2E] mt-1">
            Browse healthcare and clinical role programmes
          </h2>
        </div>
        <CourseGrid />
      </section>

      {/* Tools strip */}
      <ToolsYouTouchStrip />

      {/* Recruiter quotes */}
      <RecruiterQuoteStrip />

      {/* Bottom CTA */}
      <PageCTA
        title="Ready to pick your track?"
        subtitle={
          FEATURE_FLAGS.ENABLE_ASSESSMENT
            ? "Reserve your seat for the next intake or take the free 3-minute assessment."
            : "Reserve your seat for the next intake and start your application."
        }
        primary={
          FEATURE_FLAGS.ENABLE_ASSESSMENT
            ? {
                label: "Get my industry-fit score →",
                to: "/career-engine/start",
              }
            : {
                label: "Start your application →",
                to: "/enrol",
              }
        }
      />
    </main>
  );
}
