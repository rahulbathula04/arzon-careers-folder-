import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import type { ComponentType } from "react";
import {
  Activity,
  Award,
  BookOpen,
  ChevronDown,
  ClipboardCheck,
  Clock3,
  Globe2,
  GraduationCap,
  Languages,
  MessageCircle,
  PlayCircle,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Users,
} from "lucide-react";
import { Footer } from "@/components/landing/Footer";
import { COURSES, COURSES_BY_SLUG } from "@/data/courses";
import { reportSsrError } from "@/lib/ssrErrorReporter";
import { thumbFor } from "@/data/courseThumbs";
import {
  NEXT_COHORT,
  SEAT_FEE_AMOUNT,
  SITE,
  LINKS,
  absUrl,
  waLink,
} from "@/components/landing/constants";
import { getCourseMeta } from "@/data/courseMeta";
import { pageSeo } from "@/lib/seo";
import { COURSE_SEO_BOOST } from "@/data/seoBoost";
import { getTrackTheme } from "@/data/trackTheme";
import { EnquiryDrawer } from "@/components/courses/EnquiryDrawer";

const BRAND = "var(--primary)"; // Maps to --color-primary
const BRAND_DARK = "var(--primary-deep)"; // Maps to --color-primary-deep
const INK = "var(--foreground)"; // Maps to --color-foreground
const INK_SOFT = "var(--muted-foreground)"; // Maps to --color-muted-foreground
const RULE = "var(--border)"; // Maps to --color-border
const SURFACE = "var(--muted)"; // Maps to --color-muted

type TabId = "about" | "outcomes" | "modules" | "recommendations" | "reviews";
const TABS: { id: TabId; label: string }[] = [
  { id: "about", label: "About" },
  { id: "outcomes", label: "Outcomes" },
  { id: "modules", label: "Modules" },
  { id: "recommendations", label: "Recommendations" },
  { id: "reviews", label: "Testimonials" },
];

export const Route = createFileRoute("/courses/$slug")({
  headers: () => {
    return {
      "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
    };
  },
  loader: ({ params }) => {
    const course = COURSES_BY_SLUG[params.slug];
    if (!course) throw notFound();
    // Loader data must be SSR-serializable. The full Course object holds
    // a React component on `Icon` (lucide forwardRef), which Seroval can't
    // dehydrate — returning it blanks the page on the client with a
    // "$_TSR.router" invariant. Return only the slug; the component
    // re-resolves the full record from the in-module catalogue.
    return { slug: course.slug };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const path = `/courses/${loaderData.slug}`;
    // Loader only ships the slug (Icon is non-serializable). Resolve the
    // full record here for SEO / schema construction.
    const fullCourse = COURSES_BY_SLUG[loaderData.slug];
    if (!fullCourse) return {};
    const loaded = fullCourse;
    // SEO boost: per-slug keyword-tuned title/description for slugs we are
    // actively ranking for (Hyderabad / India intent). Falls back to the
    // auto title/blurb for the rest of the catalogue.
    const boost = COURSE_SEO_BOOST[loaderData.slug];
    const title = boost?.title ?? `${loaded.title} · Arzon Global`;
    const description = boost?.description ?? loaded.blurb;
    const image = thumbFor(loaderData.slug, loaded.category);
    const ps = pageSeo({ path, title, description, image, ogType: "website" });
    // Derived metadata for richer Course + Internship schema.
    const rich = getCourseMeta(loaded);
    const startISO = NEXT_COHORT.startsISO;
    // 12-week cohort → end date = start + 84 days (keep as date only).
    const endISO = new Date(new Date(startISO).getTime() + 84 * 24 * 60 * 60 * 1000).toISOString();
    const absImage = absUrl(image);
    const provider = {
      "@type": "EducationalOrganization",
      name: "Arzon Global",
      url: SITE.origin,
      logo: absUrl("/brand/arzon-logo.jpg"),
      sameAs: [LINKS.linkedin, LINKS.instagram, LINKS.website],
    };
    return {
      meta: [
        { title },
        ...(boost?.keywords?.length
          ? [{ name: "keywords", content: boost.keywords.join(", ") }]
          : []),
        ...ps.meta,
      ],
      links: ps.links,
      scripts: [
        {
          // Course schema, eligible for Google's "Courses" rich result.
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: loaded.title,
            description: loaded.blurb,
            provider,
            image: absImage,
            url: absUrl(path),
            inLanguage: "en-IN",
            about: loaded.category,
            teaches: loaded.jd.topSkills,
            coursePrerequisites: rich.prerequisites,
            educationalCredentialAwarded: {
              "@type": "EducationalOccupationalCredential",
              name: `${loaded.title} — ISO-certified Internship Completion Certificate`,
              credentialCategory: "Certificate",
              recognizedBy: { "@type": "Organization", name: "Arzon Global" },
              url: absUrl(`/certificates/sample/${loaderData.slug}`),
            },
            audience: {
              "@type": "EducationalAudience",
              educationalRole: "student",
              audienceType: rich.bestFor,
            },
            offers: {
              "@type": "Offer",
              category: "Paid",
              priceCurrency: "INR",
              price: String(SEAT_FEE_AMOUNT),
              availability: "https://schema.org/InStock",
              url: absUrl(path),
              validFrom: new Date().toISOString(),
              priceValidUntil: NEXT_COHORT.applicationsCloseISO,
            },
            hasCourseInstance: {
              "@type": "CourseInstance",
              name: `${loaded.title} · ${NEXT_COHORT.label} cohort`,
              courseMode: "Blended",
              courseWorkload: "PT12W",
              location: {
                "@type": "Place",
                name: "Online + Hyderabad",
                address: { "@type": "PostalAddress", addressCountry: "IN" },
              },
              startDate: startISO,
              endDate: endISO,
              instructor: {
                "@type": "Person",
                name: rich.instructor.name,
                jobTitle: rich.instructor.title,
                description: rich.instructor.bio,
              },
              offers: {
                "@type": "Offer",
                category: "Paid",
                priceCurrency: "INR",
                price: String(SEAT_FEE_AMOUNT),
                availability: "https://schema.org/InStock",
                url: absUrl(path),
              },
            },
          }),
        },
        {
          // EducationalOccupationalProgram → internship rich result.
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOccupationalProgram",
            programType: "Internship",
            name: `${loaded.title} · 12-week Industry Internship`,
            description: `${loaded.blurb} Structured 12-week, ${rich.weeklyHours} hrs/week internship with live mentoring, real-data work, capstone, and an ISO-certified completion certificate.`,
            url: absUrl(path),
            provider,
            educationalProgramMode: "Blended",
            timeOfDay: "Evening",
            timeToComplete: "P12W",
            startDate: startISO,
            endDate: endISO,
            applicationStartDate: new Date().toISOString().slice(0, 10),
            applicationDeadline: NEXT_COHORT.applicationsCloseISO,
            occupationalCategory: loaded.jd.hiringRoles,
            programPrerequisites: rich.prerequisites,
            numberOfCredits: rich.totalHours,
            educationalCredentialAwarded: {
              "@type": "EducationalOccupationalCredential",
              name: `${loaded.title} — ISO-certified Internship Completion Certificate`,
              credentialCategory: "Certificate",
              url: absUrl(`/certificates/sample/${loaderData.slug}`),
            },
            offers: {
              "@type": "Offer",
              category: "Paid",
              priceCurrency: "INR",
              price: String(SEAT_FEE_AMOUNT),
              availability: "https://schema.org/InStock",
              url: absUrl(path),
            },
            inLanguage: "en-IN",
          }),
        },
        {
          // Breadcrumb trail: Home → Programmes → This course.
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE.origin },
              { "@type": "ListItem", position: 2, name: "Programmes", item: absUrl("/courses") },
              { "@type": "ListItem", position: 3, name: loaded.title, item: absUrl(path) },
            ],
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <main className="min-h-app bg-[#0A0F1E] text-white">
      <div className="mx-auto max-w-2xl px-5 py-32 text-center sm:px-6">
        <h2 className="h-display">Programme not found</h2>
        <p className="mt-3 text-white/80">This course does not exist.</p>
        <Link
          to="/courses"
          className="mt-8 inline-flex h-11 items-center rounded-full border border-white/15 bg-white/5 px-5 text-sm font-semibold text-white hover:bg-white/10"
        >
          See all programmes
        </Link>
      </div>
      <Footer />
    </main>
  ),
  errorComponent: ({ error, reset }) => {
    if (typeof console !== "undefined") console.error(error);
    return <CourseErrorView error={error} reset={reset} />;
  },
  component: CoursePage,
  pendingComponent: () => (
    <div className="min-h-screen animate-pulse" style={{ background: SURFACE }}>
      {/* Hero skeleton */}
      <div className="h-64 w-full" style={{ background: RULE }} />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-4">
            <div className="h-3 w-24 rounded" style={{ background: RULE }} />
            <div className="h-8 w-3/4 rounded-lg" style={{ background: RULE }} />
            <div className="h-4 w-full rounded" style={{ background: RULE }} />
            <div className="h-4 w-5/6 rounded" style={{ background: RULE }} />
            <div className="flex gap-2 pt-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-8 w-24 rounded-full" style={{ background: RULE }} />
              ))}
            </div>
            <div className="h-48 rounded-2xl" style={{ background: RULE }} />
            <div className="h-64 rounded-2xl" style={{ background: RULE }} />
          </div>
          <div className="space-y-3">
            <div className="h-96 rounded-2xl" style={{ background: RULE }} />
            <div className="h-24 rounded-2xl" style={{ background: RULE }} />
          </div>
        </div>
      </div>
    </div>
  ),
});

function CourseErrorView({ error, reset }: { error: Error; reset: () => void }) {
  const params = Route.useParams();
  // Report immediately so the admin "SSR errors" tab can tally per-slug.
  useEffect(() => {
    reportSsrError({
      message: error.message,
      stack: error.stack,
      source: "errorComponent",
      programSlug: params.slug,
    });
  }, [error, params.slug]);
  return (
    <main className="min-h-app bg-[#0A0F1E] text-white">
      <div className="mx-auto max-w-2xl px-5 py-24 text-center sm:px-6">
        <p className="font-mono text-micro font-semibold uppercase tracking-[0.28em] text-white/70">
          Programme couldn't load
        </p>
        <h2 className="h-display mt-3">Something went wrong loading this page</h2>
        <p className="mt-3 text-white/70">
          Try again, or head back to the full list of programmes.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex h-11 items-center rounded-full bg-white text-[#0A0F1E] px-5 text-sm font-semibold hover:bg-white/90"
          >
            Try again
          </button>
          <Link
            to="/courses"
            className="inline-flex h-11 items-center rounded-full border border-white/15 bg-white/5 px-5 text-sm font-semibold text-white hover:bg-white/10"
          >
            See all programmes
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}

function CoursePage() {
  const loaderData = Route.useLoaderData();
  const course = COURSES_BY_SLUG[loaderData.slug];
  if (!course) return null;
  const meta = getCourseMeta(course);
  const theme = getTrackTheme(course.slug);
  const cohort = NEXT_COHORT;
  const heroImg = thumbFor(course.slug, course.category);
  const [drawer, setDrawer] = useState(false);
  const pitch = `Hi, I'd like to enrol in the ${course.title} programme.`;

  const rating = 4.8;
  const learners = 12482;
  const reviews = 1834;
  const totalHours = meta.totalHours;

  const recommended = useMemo(
    () => COURSES.filter((c) => c.slug !== course.slug).slice(0, 3),
    [course.slug],
  );

  return (
    <div className="tone-light min-h-screen bg-white">
      {/* Hero */}
      <section className="border-b" style={{ borderColor: RULE, background: "#F0F4FA" }}>
        {/* @allow-raw-palette */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 py-8 sm:px-6 sm:py-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12 lg:py-16">
          <div className="min-w-0">
            <Breadcrumb title={course.title} />
            <div
              className="mt-5 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold"
              style={{ borderColor: RULE, background: "#FFFFFF", color: BRAND }}
            >
              {/* @allow-raw-palette */}
              <span
                aria-hidden
                className="inline-flex h-3.5 w-5 overflow-hidden rounded-[2px] ring-1 ring-black/10"
              >
                {/* copy-claims-ok: tricolour flag ratios are geometric, not statistical */}
                <span
                  className="h-full w-full"
                  style={{
                    background:
                      "linear-gradient(to bottom, var(--flag-in-saffron) 33.33%, var(--flag-in-white) 33.33% 66.66%, var(--flag-in-green) 66.66%)",
                  }} /* copy-claims-ok */
                />
              </span>
              Made in India · Offered by <span style={{ color: INK }}>Arzon Global</span>
            </div>
            <h1
              className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[44px]"
              style={{ color: INK }}
            >
              {course.title}
            </h1>
            <p
              className="mt-3 max-w-2xl text-base leading-relaxed sm:text-lg"
              style={{ color: INK_SOFT }}
            >
              {course.heroTagline || course.blurb}
            </p>

            <div
              className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm"
              style={{ color: INK }}
            >
              <span className="inline-flex items-center gap-1.5">
                <span className="font-semibold">{rating.toFixed(1)}</span>
                <Stars value={rating} />
                <a
                  href="#reviews"
                  className="underline decoration-transparent hover:decoration-current"
                  style={{ color: BRAND }}
                >
                  ({reviews.toLocaleString("en-IN")} reviews)
                </a>
              </span>
              <span className="inline-flex items-center gap-1.5" style={{ color: INK_SOFT }}>
                <Users className="h-4 w-4" /> {learners.toLocaleString("en-IN")} already enrolled
              </span>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <div
                className="grid h-10 w-10 place-items-center rounded-full text-sm font-semibold text-white"
                style={{ background: BRAND }}
              >
                {meta.instructor.initials}
              </div>
              <div className="text-sm">
                <span style={{ color: INK_SOFT }}>Instructor: </span>
                <span className="font-semibold underline" style={{ color: BRAND }}>
                  {meta.instructor.name}
                </span>
              </div>
            </div>

            {/* BHARAT UX / Scaler Strategy: ROI Front-and-Center */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:gap-6 border-y border-dashed border-slate-300 py-4">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Avg. Salary
                </p>
                <p className="text-lg font-bold text-slate-900">{course.jd.salary}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Placement In
                </p>
                <p className="text-lg font-bold text-slate-900">12 Weeks</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Top Partners
                </p>
                <p className="text-sm font-bold text-slate-900">
                  {course.jd.sampleEmployers.slice(0, 3).join(", ")}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {/* High-Intent CTA */}
              <button
                type="button"
                onClick={() => setDrawer(true)}
                className="inline-flex h-12 items-center justify-center rounded-md px-6 text-sm font-semibold text-white shadow-sm transition-colors"
                style={{ background: BRAND, color: "#FFFFFF" }}
                onMouseOver={(e) => (e.currentTarget.style.background = BRAND_DARK)}
                onMouseOut={(e) => (e.currentTarget.style.background = BRAND)}
              >
                Apply Now · Starts {cohort.startsLabel}
              </button>

              {/* Low-Intent CTA (Tiered CTAs Strategy) */}
              <a
                href={waLink(pitch)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md border px-5 text-sm font-semibold"
                style={{ borderColor: BRAND, color: BRAND, background: "#FFFFFF" }}
              >
                <MessageCircle className="h-4 w-4" /> Get programme details
              </a>
            </div>
            <p className="mt-3 text-xs" style={{ color: INK_SOFT }}>
              Financial aid available · Limited cohort seats · Applications close soon{" "}
              {new Date(cohort.applicationsCloseISO).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
              })}
            </p>
          </div>

          <aside className="hidden lg:block">
            <div
              className="overflow-hidden rounded-xl border shadow-sm"
              style={{ borderColor: RULE, background: "#FFFFFF" }}
            >
              <div className="relative aspect-[4/3] w-full">
                <img
                  src={heroImg}
                  alt={`${course.title} programme preview`}
                  className="h-full w-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 grid place-items-center">
                  <button
                    type="button"
                    onClick={() => setDrawer(true)}
                    className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold shadow"
                    style={{ color: INK }}
                  >
                    <PlayCircle className="h-4 w-4" style={{ color: BRAND }} /> Watch a 2-min
                    preview
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 divide-x" style={{ borderColor: RULE }}>
                <SummaryStat icon={GraduationCap} label="Level" value="Beginner" />
                <SummaryStat icon={Languages} label="Taught in" value="English" />
                <SummaryStat icon={Clock3} label="Duration" value={`${totalHours} hrs · 12 wks`} />
                <SummaryStat icon={Globe2} label="Cohorts" value="Blended online" />
              </div>
            </div>
          </aside>
        </div>
      </section>

      <StickyTabs />

      <Section id="about" title="What you'll learn">
        <div className="grid gap-4 sm:grid-cols-2">
          {meta.outcomes.slice(0, 6).map((line) => (
            <div
              key={line}
              className="flex items-start gap-3 rounded-lg border p-4"
              style={{ borderColor: RULE, background: "#FFFFFF" }}
            >
              <ClipboardCheck className="mt-0.5 h-5 w-5 shrink-0" style={{ color: BRAND }} />
              <p className="text-sm leading-relaxed" style={{ color: INK }}>
                {line}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Details to know">
        <div className="grid gap-3 sm:grid-cols-3">
          <DetailCard
            icon={Share2}
            title="Shareable certificate"
            body="Add to your LinkedIn profile"
          />
          <DetailCard
            icon={Award}
            title="Assessments"
            body="12 quizzes · 4 assignments · 1 capstone"
          />
          <DetailCard
            icon={Clock3}
            title={`${meta.weeklyHours} hrs/week`}
            body={`Flexible schedule · finish in ${Math.ceil(totalHours / meta.weeklyHours)} weeks`}
          />
        </div>
      </Section>

      <section
        id="outcomes"
        className="border-y scroll-mt-[140px]"
        style={{ borderColor: RULE, background: SURFACE }}
      >
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-12">
          <h2 className="text-2xl font-bold sm:text-3xl" style={{ color: INK }}>
            Skills you'll gain
          </h2>
          <p className="mt-2 max-w-3xl text-sm sm:text-base" style={{ color: INK_SOFT }}>
            The tools and workflows recruiters actually screen for — pulled from live JDs.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {[...course.jd.topSkills, ...course.tools].map((s) => (
              <span
                key={s}
                className="rounded-full border bg-white px-3 py-1.5 text-sm"
                style={{ borderColor: RULE, color: INK }}
              >
                {s}
              </span>
            ))}
          </div>

          <h3 className="mt-10 text-xl font-bold sm:text-2xl" style={{ color: INK }}>
            Build career-ready outcomes
          </h3>
          <p className="mt-2 max-w-3xl text-sm sm:text-base" style={{ color: INK_SOFT }}>
            Placements are tracked against JDs from{" "}
            {course.jd.sampleEmployers.slice(0, 4).join(", ")} and more. Here's what graduates of
            comparable Arzon tracks are earning.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <StatBig value={course.jd.salary} label="Fresher salary band (India)" />
            <StatBig value="1,247" label="Live JDs mirrored into the syllabus" />
            <StatBig value="86%" label="Capstone shipped on time · last cohort" />
          </div>
          <div
            className="tone-light mt-8 flex flex-wrap items-center gap-3 rounded-xl border bg-white p-5"
            style={{ borderColor: RULE }}
          >
            <Target className="h-5 w-5 shrink-0" style={{ color: BRAND }} />
            <p className="text-sm" style={{ color: INK }}>
              <span className="font-semibold">Hiring roles you'll qualify for:</span>{" "}
              {course.jd.hiringRoles.join(" · ")}
            </p>
          </div>
        </div>
      </section>

      <Section id="modules" title={`There are ${course.syllabus.length} modules in this course`}>
        <p className="mb-6 max-w-3xl text-sm sm:text-base" style={{ color: INK_SOFT }}>
          Structured over 12 weeks · {totalHours} hours of guided practice, live mentor reviews and
          one capstone. Every module maps to a real JD requirement.
        </p>
        <ModulesAccordion course={course} />
      </Section>

      <Section title="Your Industry Mentor">
        {/* BHARAT UX / GrowthSchool Strategy: Mentor Influencer Status */}
        <div
          className="flex flex-col gap-6 rounded-2xl border p-6 sm:flex-row sm:items-start"
          style={{ borderColor: RULE, background: "linear-gradient(145deg, #FFFFFF, #F8FAFC)" }}
        >
          <div className="flex flex-col items-center gap-3 sm:items-start">
            <div
              className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl text-2xl font-bold text-white shadow-lg"
              style={{ background: BRAND, transform: "rotate(-3deg)" }}
            >
              <span style={{ transform: "rotate(3deg)" }}>{meta.instructor.initials}</span>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-700">
              <Star className="h-3 w-3 fill-amber-500 text-amber-500" /> 4.9/5
            </div>
          </div>
          <div className="min-w-0 text-center sm:text-left flex-1">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="text-xl font-bold" style={{ color: BRAND_DARK }}>
                  {meta.instructor.name}
                </span>
                <p
                  className="mt-1 text-sm font-semibold uppercase tracking-wider"
                  style={{ color: BRAND }}
                >
                  {meta.instructor.title}
                </p>
              </div>
              <div
                className="mt-3 flex items-center justify-center gap-4 sm:mt-0 sm:justify-end text-xs font-semibold"
                style={{ color: INK_SOFT }}
              >
                <div className="text-center">
                  <p className="text-lg font-bold" style={{ color: INK }}>
                    12k+
                  </p>
                  <p>Learners</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold" style={{ color: INK }}>
                    8+
                  </p>
                  <p>Years Exp</p>
                </div>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed" style={{ color: INK }}>
              {meta.instructor.bio}
            </p>
          </div>
        </div>
      </Section>

      <Section title="Offered by">
        <div
          className="flex flex-col items-start gap-4 rounded-xl border p-6 sm:flex-row sm:items-center sm:gap-6"
          style={{ borderColor: RULE, background: "#FFFFFF" }}
        >
          <div
            className="grid h-14 w-14 shrink-0 place-items-center rounded-lg text-white"
            style={{ background: theme.hex.from }}
          >
            <Activity className="h-7 w-7" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-lg font-semibold" style={{ color: INK }}>
              Arzon Global
            </p>
            <p className="mt-1 text-sm" style={{ color: INK_SOFT }}>
              ISO 9001 · MSME · MCA registered. India's JD-first upskilling company for pharma &
              life-sciences careers.
            </p>
          </div>
          <Link
            to="/courses"
            className="inline-flex h-10 items-center rounded-md border px-4 text-sm font-semibold"
            style={{ borderColor: BRAND, color: BRAND }}
          >
            All programmes
          </Link>
        </div>
      </Section>

      <section className="border-y" style={{ borderColor: RULE, background: SURFACE }}>
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-12">
          <h2 className="text-2xl font-bold sm:text-3xl" style={{ color: INK }}>
            Why people choose Arzon for their {course.category.split(" ")[0]} career
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <ValueBlock
              icon={ShieldCheck}
              title="Verified ISO-9001 certificate"
              body="Employer-verifiable via a unique QR — never a downloaded PDF."
            />
            <ValueBlock
              icon={BookOpen}
              title="JD-first curriculum"
              body={`Reverse-engineered from live ${course.jd.hiringRoles[0] ?? "role"} JDs${course.jdRefreshedOn ? `, refreshed ${new Date(course.jdRefreshedOn).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}` : ""}.`}
            />
            <ValueBlock
              icon={Sparkles}
              title="Human mentor reviews"
              body="Every capstone reviewed line-by-line by an industry-trained specialist."
            />
          </div>
        </div>
      </section>

      <Section
        id="recommendations"
        title={`Recommended if you're interested in ${course.category}`}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recommended.map((c) => (
            <Link
              key={c.slug}
              to="/courses/$slug"
              params={{ slug: c.slug }}
              className="group rounded-xl border p-5 transition-colors"
              style={{ borderColor: RULE, background: "#FFFFFF" }}
            >
              <p className="text-xs font-mono uppercase tracking-widest" style={{ color: BRAND }}>
                Course
              </p>
              <p
                className="mt-2 text-base font-semibold group-hover:underline"
                style={{ color: INK }}
              >
                {c.title}
              </p>
              <p className="mt-1 text-sm" style={{ color: INK_SOFT }}>
                {c.jd.topSkills.slice(0, 3).join(" · ")}
              </p>
              <p
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold"
                style={{ color: BRAND }}
              >
                Learn more →
              </p>
            </Link>
          ))}
        </div>
      </Section>

      <section
        id="reviews"
        className="border-y scroll-mt-[140px]"
        style={{ borderColor: RULE, background: SURFACE }}
      >
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-12">
          <h2 className="text-2xl font-bold sm:text-3xl" style={{ color: INK }}>
            What learners are saying
          </h2>
          <p className="mt-2 text-sm" style={{ color: INK_SOFT }}>
            Curated from cohort feedback forms — full audit trail available on request.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {LEARNER_QUOTES.map((q) => (
              <figure
                key={q.name}
                className="tone-light rounded-xl border bg-white p-5"
                style={{ borderColor: RULE }}
              >
                <Stars value={5} />
                <blockquote className="mt-3 text-sm leading-relaxed" style={{ color: INK }}>
                  &ldquo;{q.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4 text-xs" style={{ color: INK_SOFT }}>
                  <span className="font-semibold" style={{ color: INK }}>
                    {q.name}
                  </span>{" "}
                  · {q.role}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <Section title="Frequently asked questions">
        <FaqList items={meta.faq} />
      </Section>

      <section className="border-t border-white/10 bg-[#0B0F19]">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-5 py-10 sm:flex-row sm:items-center sm:px-6">
          <div>
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              Ready to start? {cohort.label} seats are open.
            </h2>
            <p className="mt-1 text-sm text-slate-300">
              Applications close{" "}
              {new Date(cohort.applicationsCloseISO).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
              })}
              . Refundable ₹{SEAT_FEE_AMOUNT.toLocaleString("en-IN")} seat block.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setDrawer(true)}
              className="inline-flex h-11 items-center rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] px-6 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
            >
              Enroll now
            </button>
            <a
              href={waLink(pitch)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-emerald-400/40 bg-emerald-500/20 hover:bg-emerald-500/30 px-5 text-sm font-bold text-emerald-300 transition-colors"
            >
              <MessageCircle className="h-4 w-4 text-emerald-400" /> WhatsApp Counsellor
            </a>
          </div>
        </div>
      </section>

      <Footer />

      <EnquiryDrawer
        open={drawer}
        onOpenChange={setDrawer}
        courseSlug={course.slug}
        courseTitle={course.title}
        placement="hero"
        theme={theme}
      />
    </div>
  );
}

function Breadcrumb({ title }: { title: string }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-1 text-xs"
      style={{ color: INK_SOFT }}
    >
      <Link to="/" className="hover:underline">
        Home
      </Link>
      <span>›</span>
      <Link to="/courses" className="hover:underline">
        Programmes
      </Link>
      <span>›</span>
      <span style={{ color: INK }}>{title}</span>
    </nav>
  );
}

function StickyTabs() {
  const [active, setActive] = useState<TabId>("about");
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Tab bar is pinned to top of the scroll root once the page nav scrolls
    // away; only the tab strip (~48px) plus a little breathing room counts.
    const HEADER_OFFSET = 72;

    const sections = TABS.map(({ id }) => ({
      id: id as TabId,
      el: document.getElementById(id),
    })).filter((s): s is { id: TabId; el: HTMLElement } => !!s.el);

    if (sections.length === 0) return;

    // Pick the section whose top is closest to (but not past) the header
    // line — deterministic even during fast scrolls or when several
    // sections intersect the viewport simultaneously.
    const computeActive = () => {
      let current: TabId = sections[0].id;
      for (const { id, el } of sections) {
        const top = el.getBoundingClientRect().top;
        if (top - HEADER_OFFSET <= 1) current = id;
        else break;
      }
      // Snap to last section once the page is scrolled to the bottom, so
      // short trailing sections still get highlighted.
      // The app scrolls inside #app-scroll-root — window.scrollY stays 0 —
      // so measure "at bottom" against that container.
      const scroller =
        (document.getElementById("app-scroll-root") as HTMLElement | null) ??
        document.scrollingElement;
      const atBottom = scroller
        ? scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 4
        : false;
      if (atBottom) current = sections[sections.length - 1].id;
      setActive((prev) => (prev === current ? prev : current));
    };

    // If the URL lands with a matching hash, honour it immediately so the
    // correct tab is highlighted before the scroll listener fires.
    const applyHash = () => {
      const hash = window.location.hash.replace("#", "") as TabId;
      if (TABS.some((t) => t.id === hash)) {
        setActive(hash);
      } else {
        computeActive();
      }
    };
    applyHash();

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        computeActive();
        ticking = false;
      });
    };

    // The app scrolls inside #app-scroll-root, not on window — so the scroll
    // listener must attach there or `computeActive` never fires and the
    // highlighted tab drifts out of sync with the visible section.
    const scrollRoot = document.getElementById("app-scroll-root");
    const scrollTarget: HTMLElement | Window = scrollRoot ?? window;
    scrollTarget.addEventListener("scroll", onScroll, { passive: true } as AddEventListenerOptions);
    window.addEventListener("resize", onScroll);
    window.addEventListener("hashchange", applyHash);
    // Recompute once now that listeners are wired (covers direct-link loads).
    computeActive();
    return () => {
      scrollTarget.removeEventListener("scroll", onScroll as EventListener);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("hashchange", applyHash);
    };
  }, []);
  return (
    <div
      className="sticky top-0 z-30 border-b bg-white shadow-sm"
      style={{ borderColor: RULE, backgroundColor: "#FFFFFF" }}
    >
      <div className="mx-auto max-w-6xl overflow-x-auto px-4 sm:px-6">
        <ul className="flex min-w-max items-stretch gap-4 text-sm sm:gap-6">
          {TABS.map((t) => {
            const on = active === t.id;
            return (
              <li key={t.id}>
                <a
                  href={`#${t.id}`}
                  className="inline-flex h-11 items-center whitespace-nowrap border-b-2 font-medium sm:h-12"
                  style={{ borderColor: on ? BRAND : "transparent", color: on ? BRAND : INK }}
                >
                  {t.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-[72px]">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-6 sm:py-10">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: INK }}>
          {title}
        </h2>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}

type IconType = ComponentType<{ className?: string }>;

function SummaryStat({
  icon: Icon,
  label,
  value,
}: {
  icon: IconType;
  label: string;
  value: string;
}) {
  return (
    <div className="p-4">
      <div
        className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider"
        style={{ color: INK_SOFT }}
      >
        <Icon className="h-3.5 w-3.5" /> {label}
      </div>
      <p className="mt-1 text-sm font-semibold" style={{ color: INK }}>
        {value}
      </p>
    </div>
  );
}

function DetailCard({ icon: Icon, title, body }: { icon: IconType; title: string; body: string }) {
  return (
    <div
      className="flex items-start gap-3 rounded-lg border p-4"
      style={{ borderColor: RULE, background: "#FFFFFF" }}
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0" />
      <div className="min-w-0">
        <p className="text-sm font-semibold" style={{ color: INK }}>
          {title}
        </p>
        <p className="mt-0.5 text-sm" style={{ color: INK_SOFT }}>
          {body}
        </p>
      </div>
    </div>
  );
}

function StatBig({ value, label }: { value: string; label: string }) {
  return (
    <div className="tone-light rounded-xl border bg-white p-5" style={{ borderColor: RULE }}>
      <p className="text-3xl font-bold tabular-nums" style={{ color: BRAND }}>
        {value}
      </p>
      <p className="mt-1 text-sm" style={{ color: INK_SOFT }}>
        {label}
      </p>
    </div>
  );
}

function ValueBlock({ icon: Icon, title, body }: { icon: IconType; title: string; body: string }) {
  return (
    <div>
      <Icon className="h-6 w-6" />
      <p className="mt-3 text-base font-semibold" style={{ color: INK }}>
        {title}
      </p>
      <p className="mt-1 text-sm leading-relaxed" style={{ color: INK_SOFT }}>
        {body}
      </p>
    </div>
  );
}

function Stars({ value }: { value: number }) {
  const filled = Math.round(value);
  return (
    <span className="inline-flex" aria-label={`Rated ${value} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="h-4 w-4"
          fill={i < filled ? "#F5A623" : "none"}
          stroke={i < filled ? "#F5A623" : "#CBD5E1"}
        />
      ))}
    </span>
  );
}

function ModulesAccordion({ course }: { course: (typeof COURSES_BY_SLUG)[string] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div
      className="divide-y overflow-hidden rounded-xl border"
      style={{ borderColor: RULE, background: "#FFFFFF" }}
    >
      {course.syllabus.map((m, i) => {
        const isOpen = open === i;
        return (
          <div key={m.title}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={isOpen}
            >
              <div className="min-w-0">
                <p className="text-xs font-mono uppercase tracking-widest" style={{ color: BRAND }}>
                  Module {i + 1} · {m.weeks}
                </p>
                <p className="mt-1 text-base font-semibold" style={{ color: INK }}>
                  {m.title}
                </p>
                <p className="mt-1 text-xs" style={{ color: INK_SOFT }}>
                  {m.topics.length} topics · 1 deliverable · ~{2 + i} hrs to complete
                </p>
              </div>
              <ChevronDown
                className="mt-1 h-5 w-5 shrink-0 transition-transform"
                style={{ color: INK_SOFT, transform: isOpen ? "rotate(180deg)" : "none" }}
              />
            </button>
            {isOpen && (
              <div
                className="border-t px-5 py-4"
                style={{ borderColor: RULE, background: SURFACE }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: INK_SOFT }}
                >
                  What's included
                </p>
                <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
                  {m.topics.map((t) => (
                    <li key={t} className="flex items-start gap-2 text-sm" style={{ color: INK }}>
                      <PlayCircle className="mt-0.5 h-4 w-4 shrink-0" style={{ color: BRAND }} />{" "}
                      {t}
                    </li>
                  ))}
                </ul>
                {/* BHARAT UX / Coursera Strategy: Practice-first scaffolding */}
                <div className="mt-4 flex flex-col gap-2">
                  <div
                    className="flex items-center gap-2 rounded-md bg-slate-50 p-2.5 text-sm border"
                    style={{ borderColor: RULE }}
                  >
                    <ClipboardCheck className="h-4 w-4 shrink-0" style={{ color: INK_SOFT }} />
                    <span className="font-medium" style={{ color: INK }}>
                      Formative Practice:
                    </span>
                    <span style={{ color: INK_SOFT }}>Ungraded concept check</span>
                  </div>
                  <div
                    className="flex items-center gap-2 rounded-md p-2.5 text-sm border"
                    style={{ borderColor: BRAND, backgroundColor: "#F0F4FA" }}
                  >
                    <Award className="h-4 w-4 shrink-0" style={{ color: BRAND }} />
                    <span className="font-semibold" style={{ color: BRAND }}>
                      Final Deliverable:
                    </span>
                    <span style={{ color: BRAND_DARK }}>{m.deliverable}</span>
                  </div>
                </div>
                <p className="mt-2 text-xs" style={{ color: INK_SOFT }}>
                  <span className="font-semibold">JD requirement satisfied:</span> {m.jdSkill}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function FaqList({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const rows = useMemo(() => items.slice(0, 8), [items]);
  return (
    <div
      className="divide-y overflow-hidden rounded-xl border"
      style={{ borderColor: RULE, background: "#FFFFFF" }}
    >
      {rows.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-semibold sm:text-base" style={{ color: INK }}>
                {f.q}
              </span>
              <ChevronDown
                className="h-5 w-5 shrink-0 transition-transform"
                style={{ color: INK_SOFT, transform: isOpen ? "rotate(180deg)" : "none" }}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: INK_SOFT }}>
                {f.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

const LEARNER_QUOTES = [
  {
    name: "Fresher · B.Pharm 2025",
    role: "Cohort feedback · verified enrolment",
    quote:
      "The mentor-led walkthroughs felt exactly like the interview screen I had at a Tier-1 CRO. Best ₹1,065 I've spent on my career.",
  },
  {
    name: "Pharm.D · Hyderabad",
    role: "Cohort feedback · verified enrolment",
    quote:
      "The concepts got demystified quickly. Passed the screening at Cognizant on the first attempt.",
  },
  {
    name: "M.Pharm · Vizag",
    role: "Cohort feedback · verified enrolment",
    quote:
      "Loved the JD-first structure. Every module linked back to a real JD I could actually apply to.",
  },
];
