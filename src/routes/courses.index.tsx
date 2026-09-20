import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/landing/Footer";
import { CourseGrid } from "@/components/courses/CourseGrid";
import { TrackDomainGrid } from "@/components/track/TrackDomainGrid";
import { ToolsYouTouchStrip } from "@/components/courses/ToolsYouTouchStrip";
import { RecruiterQuoteStrip } from "@/components/courses/RecruiterQuoteStrip";
import { PageCTA } from "@/components/landing/PageCTA";
import { COURSES } from "@/data/courses";
import { NEXT_COHORT } from "@/components/landing/constants";
import { pageSeo } from "@/lib/seo";
import { breadcrumbSchema, itemListSchema } from "@/lib/jsonLd";
import { SITE } from "@/components/landing/constants";
import { FEATURE_FLAGS } from "@/config/featureFlags";
import { useFunnelTracking } from "@/hooks/useFunnelTracking";

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
            items: COURSES.slice(0, 20).map((c) => ({
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
  const total = COURSES.length;
  useFunnelTracking({ pageName: "courses_catalog", category: "catalog" });

  return (
    <main className="min-h-app bg-[#FAF8F5] text-[#0B1325]">
      {/* Hero */}
      <section className="border-b border-stone-200 bg-white tone-light">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-16">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 transition hover:text-[#0B1325]"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to home
          </Link>
          
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-stone-500">
              {total} PROGRAMMES &bull; {NEXT_COHORT?.label ?? "UPCOMING"} COHORT
            </p>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[#1B3F8B] text-[11px] font-bold">
              <span>B.Pharm &bull; Pharm.D &bull; M.Pharm &bull; Life Sciences</span>
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight leading-tight mt-3 max-w-3xl">
            Pick the role first.{" "}
            <span className="italic text-[#1B3F8B]">The syllabus follows the JD.</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-stone-600 leading-relaxed">
            Every programme below is reverse-engineered from current Indian fresher job descriptions
            on Naukri, LinkedIn India, Foundit, and company careers pages.
          </p>

          {/* Personalization strategy */}
          <div className="mt-8 rounded-2xl border border-stone-200 bg-stone-50 p-6 shadow-xs max-w-3xl space-y-4">
            <h2 className="text-base font-bold text-stone-900">
              Not sure where to start? Select your target goal:
            </h2>
            <div className="flex flex-wrap gap-2.5">
              <Link
                to={FEATURE_FLAGS.ENABLE_ASSESSMENT ? "/career-engine/test" : "/enrol"}
                className="inline-flex items-center justify-center rounded-lg bg-white hover:bg-stone-100 px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider text-stone-900 border border-stone-300 transition-colors"
              >
                Start Career Preparation
              </Link>
              <Link
                to={FEATURE_FLAGS.ENABLE_ASSESSMENT ? "/career-engine/test" : "/enrol"}
                className="inline-flex items-center justify-center rounded-lg bg-white hover:bg-stone-100 px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider text-stone-900 border border-stone-300 transition-colors"
              >
                Upskill in Clinical Data
              </Link>
              <Link
                to={FEATURE_FLAGS.ENABLE_ASSESSMENT ? "/career-engine/test" : "/enrol"}
                className="inline-flex items-center justify-center rounded-lg bg-white hover:bg-stone-100 px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider text-stone-900 border border-stone-300 transition-colors"
              >
                Transition to Healthcare IT
              </Link>
            </div>
            <p className="text-xs text-stone-500">
              {FEATURE_FLAGS.ENABLE_ASSESSMENT
                ? "Take the ACRI assessment simulation to evaluate your role fit and discover capability gaps."
                : "Select a goal to view our job-aligned learning paths."}
            </p>
          </div>
        </div>
      </section>

      {/* Main Track Domain Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <TrackDomainGrid />
      </section>

      {/* Legacy Course List (All tracks) */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 border-t border-slate-200/80">
        <div className="mb-8">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-[#707C90]">
            ALL {total} PROGRAMMES
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151C2E] mt-1">
            Browse full catalog by domain
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
