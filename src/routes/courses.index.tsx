import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  ChevronRight,
  Compass,
  ShieldCheck,
  Users,
} from "lucide-react";
import { CourseGrid } from "@/components/courses/CourseGrid";
import { TrackDomainGrid } from "@/components/track/TrackDomainGrid";
import { CourseCompareTable } from "@/components/courses/CourseCompareTable";
import { ToolsYouTouchStrip } from "@/components/courses/ToolsYouTouchStrip";
import { RecruiterQuoteStrip } from "@/components/courses/RecruiterQuoteStrip";
import { COURSES } from "@/data/courses";
import { ARZON_CORE_PROGRAMME_SLUGS } from "@/data/siteArchitecture";
import { NEXT_COHORT, SITE } from "@/components/landing/constants";
import { pageSeo } from "@/lib/seo";
import { breadcrumbSchema, itemListSchema } from "@/lib/jsonLd";
import { useFunnelTracking } from "@/hooks/useFunnelTracking";

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
    <main className="min-h-screen bg-white tone-light card-light overflow-x-clip text-[#081F38]">
      {/* ─── SECTION 1: HERO (ALIGNED WITH ARZON HOME V2 BRAND GUIDELINES) ─── */}
      <section className="relative overflow-hidden bg-white pt-10 sm:pt-16 pb-14 sm:pb-20 border-b border-[#E4EAF2] tone-light card-light">
        {/* Ambient Radial Accent */}
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(37,99,235,0.06),rgba(255,255,255,0))] pointer-events-none"
          aria-hidden="true"
        />

        <div className="ap-shell relative z-10">
          <div className="mx-auto flex max-w-5xl xl:max-w-6xl flex-col items-center text-center">
            {/* Breadcrumb Navigation */}
            <nav
              aria-label="Breadcrumb"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#64748B] mb-5"
            >
              <Link to="/" className="hover:text-[#081F38] transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3 w-3 text-[#94A3B8]" />
              <span className="text-[#081F38] font-bold">Role Programmes</span>
            </nav>

            {/* Clear Healthcare Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#BFDBFE] bg-[#EEF6FF]/95 backdrop-blur-xs px-3.5 sm:px-4 py-1.5 text-[11px] sm:text-xs font-mono font-bold tracking-wider uppercase text-[#1D4ED8] shadow-2xs mb-4 sm:mb-6">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
              </span>
              <span className="sm:hidden">
                {total} HEALTHCARE PROGRAMMES
              </span>
              <span className="hidden sm:inline">
                {total} HEALTHCARE PROGRAMMES &bull; {NEXT_COHORT?.label ?? "UPCOMING"} COHORT
              </span>
            </div>

            {/* High-Impact Typography Scale with Home Page Gradient */}
            <h1 className="text-[26px] min-[390px]:text-[30px] sm:text-[46px] md:text-[54px] lg:text-[62px] font-extrabold tracking-[-0.035em] text-[#081F38] leading-[1.12] sm:leading-[1.05] max-w-5xl mx-auto mb-4 sm:mb-6 px-1">
              <span>Choose the role first.</span>{" "}
              <span className="bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent [box-decoration-break:clone]">
                Then build what the job requires.
              </span>
            </h1>

            {/* Arzon Slate Subtitle */}
            <p className="text-[15px] sm:text-lg md:text-[19px] text-[#475569] leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-8 font-normal">
              Every programme below is reverse-engineered from 2,000+ entry-level healthcare and clinical data job descriptions across Indian GCCs and CROs.
            </p>

            {/* Rebuilt Credibility Grid (Zero Negative Claims, High Institutional Trust) */}
            <div className="pt-6 sm:pt-8 w-full max-w-4xl mx-auto border-t border-[#E4EAF2]">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5">
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left p-3 sm:p-3.5 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC]/90 hover:bg-white hover:border-[#BFDBFE] hover:shadow-xs transition-all tone-light card-light group">
                  <div className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-xl bg-[#EEF6FF] text-[#2563EB] border border-[#D0E1FD] mb-2 group-hover:scale-105 transition-transform">
                    <BarChart3 className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#081F38] leading-tight">2,000+ Verified JDs</div>
                  <div className="text-[10px] sm:text-[11px] text-[#64748B] mt-0.5 leading-snug">Reverse-engineered skills</div>
                </div>

                <div className="flex flex-col items-center sm:items-start text-center sm:text-left p-3 sm:p-3.5 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC]/90 hover:bg-white hover:border-[#A7F3D0] hover:shadow-xs transition-all tone-light card-light group">
                  <div className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2 group-hover:scale-105 transition-transform">
                    <Building2 className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#081F38] leading-tight">Recognized by TASK</div>
                  <div className="text-[10px] sm:text-[11px] text-[#64748B] mt-0.5 leading-snug">Govt. of Telangana alignment</div>
                </div>

                <div className="flex flex-col items-center sm:items-start text-center sm:text-left p-3 sm:p-3.5 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC]/90 hover:bg-white hover:border-[#FED7AA] hover:shadow-xs transition-all tone-light card-light group">
                  <div className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-xl bg-amber-50 text-amber-700 border border-amber-200 mb-2 group-hover:scale-105 transition-transform">
                    <Users className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#081F38] leading-tight">10,000+ Assessed</div>
                  <div className="text-[10px] sm:text-[11px] text-[#64748B] mt-0.5 leading-snug">Calibrated role benchmarks</div>
                </div>

                <div className="flex flex-col items-center sm:items-start text-center sm:text-left p-3 sm:p-3.5 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC]/90 hover:bg-white hover:border-[#DDD6FE] hover:shadow-xs transition-all tone-light card-light group">
                  <div className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200 mb-2 group-hover:scale-105 transition-transform">
                    <ShieldCheck className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#081F38] leading-tight">Practical Work Samples</div>
                  <div className="text-[10px] sm:text-[11px] text-[#64748B] mt-0.5 leading-snug">Audit-ready clinical outputs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: CAREER DECISION RAIL (DIAGNOSTIC FIRST) ─────────────── */}
      <section className="py-8 sm:py-12 bg-[#F8FAFC]/70 border-b border-[#E4EAF2]">
        <div className="ap-shell">
          <div className="rounded-2xl border border-[#BFDBFE] bg-[#EEF6FF]/90 p-6 sm:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 tone-light card-light shadow-2xs">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#1D4ED8] border border-[#BFDBFE] mb-2 tone-light card-light">
                <Compass className="h-3 w-3 text-[#2563EB]" />
                <span>BEFORE YOU CHOOSE A PROGRAMME</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#081F38] tracking-tight">
                Not sure which clinical role matches your degree?
              </h2>
              <p className="mt-1.5 text-sm sm:text-[15px] text-[#475569] max-w-2xl font-normal leading-relaxed">
                Take the free 3-minute Career Assessment to evaluate your background against current industry hiring criteria and receive a tailored role recommendation.
              </p>
            </div>

            <div className="w-full sm:w-auto shrink-0" data-fab-avoid>
              <Link
                to="/career-assessment"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-7 py-3.5 text-sm font-bold shadow-md shadow-blue-600/15 transition-all"
              >
                <span>Find my career path</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: FLAGSHIP CLINICAL TRACKS (CONTRACT-COMPLIANT GRID) ─── */}
      <section className="py-12 sm:py-16 bg-white border-b border-[#E4EAF2] tone-light card-light">
        <div className="ap-shell">
          <div className="mb-8">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-[#2563EB] mb-2 shadow-2xs tone-light card-light">
              <CheckCircle2 className="h-3 w-3 text-[#10B981]" />
              <span>CHOOSE YOUR DIRECTION</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#081F38] tracking-tight">
              Explore Career Tracks in{" "}
              <span className="bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent [box-decoration-break:clone]">
                Healthcare
              </span>
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-[#475569] max-w-2xl font-normal">
              Role-focused programmes designed from real job requirements with practical learning and verifiable outcomes.
            </p>
          </div>

          <TrackDomainGrid tone="light" coreOnly={true} />
        </div>
      </section>

      {/* ─── SECTION 4: ALL 11 PROGRAMMES COMPREHENSIVE CATALOGUE ─────────── */}
      <section className="py-12 sm:py-16 bg-white tone-light card-light">
        <div className="ap-shell">
          <div className="mb-8">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-[#2563EB] mb-2 shadow-2xs tone-light card-light">
              <CheckCircle2 className="h-3 w-3 text-[#10B981]" />
              <span>ALL 11 PROGRAMMES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#081F38] tracking-tight">
              Browse All Healthcare, Clinical &amp; Informatics Programmes
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-[#475569] max-w-2xl font-normal">
              Filter by clinical discipline, target degree, or search by software tools and skills.
            </p>
          </div>

          <CourseGrid />
        </div>
      </section>

      {/* ─── SECTION 5: INTERACTIVE 6-TRACK COMPARISON MATRIX ─────────────── */}
      <div className="ap-shell">
        <CourseCompareTable />
      </div>

      {/* ─── SECTION 6: TOOLS YOU WILL TOUCH LAB SHOWCASE ───────────────────── */}
      <div className="ap-shell">
        <ToolsYouTouchStrip />
      </div>

      {/* ─── SECTION 7: RECRUITER SCREENING BENCHMARKS ─────────────────────── */}
      <div className="ap-shell pb-12 sm:pb-16">
        <RecruiterQuoteStrip />
      </div>

      {/* ─── SECTION 8: HOME-STYLE CLOSING HERO BANNER ──────────────────────── */}
      <section className="py-10 sm:py-20 bg-white border-t border-[#E4EAF2] tone-light card-light">
        <div className="ap-shell">
          <div className="relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] bg-gradient-to-br from-[#071A4A] via-[#0A1F56] to-[#040E29] p-6 sm:p-12 lg:p-16 text-white shadow-xl">
            {/* Ambient glow */}
            <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-[#1557D6]/20 blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4 sm:space-y-6">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#93C5FD]">
                  <CheckCircle2 className="h-3 w-3 text-[#10B981]" />
                  <span>YOUR NEXT STEP</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-snug">
                  Ready to build verified healthcare role readiness?
                </h2>
                <p
                  className="text-sm sm:text-base text-slate-200 max-w-xl font-normal leading-relaxed"
                  style={{ color: "#E2E8F0" }}
                >
                  Take the free 3-minute career diagnostic or reserve your seat for the upcoming intake with mentorship from senior industry professionals.
                </p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <Link
                    to="/career-engine/start"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-7 py-3.5 text-sm font-bold shadow-md shadow-blue-600/20 transition-all"
                  >
                    <span>Get my industry-fit score</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 hover:bg-white/15 text-white px-6 py-3.5 text-sm font-bold transition-all"
                    style={{ color: "#FFFFFF" }}
                  >
                    <span>Talk to a counsellor</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-4 space-y-2.5">
                {[
                  "Personalised career report",
                  "Reverse-engineered from 2,000+ JDs",
                  "Audit-ready clinical case samples",
                  "Placement & interview guidance",
                ].map((text) => (
                  <div
                    key={text}
                    className="flex items-center gap-2.5 rounded-xl bg-white/10 border border-white/15 px-4 py-3 text-xs sm:text-sm font-semibold text-white shadow-xs"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                      borderColor: "rgba(255, 255, 255, 0.15)",
                    }}
                  >
                    <CheckCircle2 className="h-4 w-4 text-[#10B981] shrink-0" />
                    <span className="text-white font-medium" style={{ color: "#FFFFFF" }}>
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
