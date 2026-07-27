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
  return (
    <main className="min-h-app bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC]">
      {/* Hero */}
      <section className="border-b border-slate-200/80">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#707C90] transition hover:text-[#151C2E]"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to home
          </Link>
          <p className="mt-5 font-mono text-xs font-bold uppercase tracking-[0.24em] text-[#707C90]">
            {total} PROGRAMMES · {NEXT_COHORT?.label ?? "UPCOMING"} COHORT
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#151C2E] tracking-tight leading-tight mt-3 max-w-3xl">
            Pick the role first.{" "}
            <span className="italic text-[#8A6D1F]">The syllabus follows the JD.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm sm:text-base text-[#5B6472] leading-relaxed">
            Every programme below is reverse-engineered from current Indian fresher job descriptions
            on Naukri, LinkedIn India, Foundit and company careers pages.
          </p>

          {/* Personalization strategy */}
          <div className="mt-8 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl max-w-3xl space-y-4">
            <h2 className="text-lg font-bold text-[#151C2E]">
              Not sure where to start? Tell us your goal.
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link
                to={FEATURE_FLAGS.ENABLE_ASSESSMENT ? "/career-engine/start" : "/enrol"}
                className="inline-flex items-center justify-center rounded-full bg-slate-50 hover:bg-slate-100 px-4 py-2 text-xs sm:text-sm font-bold text-[#151C2E] border border-slate-200 transition-colors"
              >
                🚀 I want to start my career fast
              </Link>
              <Link
                to={FEATURE_FLAGS.ENABLE_ASSESSMENT ? "/career-engine/start" : "/enrol"}
                className="inline-flex items-center justify-center rounded-full bg-slate-50 hover:bg-slate-100 px-4 py-2 text-xs sm:text-sm font-bold text-[#151C2E] border border-slate-200 transition-colors"
              >
                📈 I want to upskill in my current role
              </Link>
              <Link
                to={FEATURE_FLAGS.ENABLE_ASSESSMENT ? "/career-engine/start" : "/enrol"}
                className="inline-flex items-center justify-center rounded-full bg-slate-50 hover:bg-slate-100 px-4 py-2 text-xs sm:text-sm font-bold text-[#151C2E] border border-slate-200 transition-colors"
              >
                🔄 I want to transition to a new field
              </Link>
            </div>
            <p className="text-xs text-[#5B6472]">
              {FEATURE_FLAGS.ENABLE_ASSESSMENT
                ? "Take a 3-minute assessment to get a personalized, data-driven learning path."
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

      <Footer />
    </main>
  );
}
