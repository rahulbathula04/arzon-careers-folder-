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

export const Route = createFileRoute("/courses/")({
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
    <main className="min-h-app text-white">
      {/* Hero */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-white/80 transition hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to home
          </Link>
          <p className="mt-5 font-mono text-micro font-semibold uppercase tracking-[0.22em] text-eyebrow/90">
            {total} programmes · {NEXT_COHORT?.label ?? "Upcoming"} cohort
          </p>
          <h1 className="h-display mt-3 max-w-3xl">
            Pick the role first.{" "}
            <em className="not-italic text-primary-glow">The syllabus follows the JD.</em>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/80">
            Every programme below is reverse-engineered from current Indian fresher job descriptions
            on Naukri, LinkedIn India, Foundit and company careers pages.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-6 sm:pt-12">
        <TrackDomainGrid
          title="Pick your domain"
          subtitle="Every track is reverse-engineered from real Indian JDs and locked to its own colour across the site."
          source="courses-index"
          className="mb-14"
        />
        {/* 70%-band: tools the role uses */}
        <ToolsYouTouchStrip />
        {/* 20%-band: recruiter quotes */}
        <RecruiterQuoteStrip />
        <div className="mt-12">
          <CourseGrid />
        </div>
      </section>
      <PageCTA
        title="Not sure which one fits?"
        subtitle="Take the 3-min fit test, 30 honest questions tell you which programme matches you. Or chat with a counsellor first."
        primary={{ label: "Take the 3-min fit test", to: "/career-engine" }}
        secondary={{ label: "Talk to a counsellor", to: "/contact" }}
      />
      <Footer />
    </main>
  );
}
