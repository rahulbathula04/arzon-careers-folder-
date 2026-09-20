import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap, Clock, ArrowRight, CheckCircle2, ShieldCheck, HelpCircle, AlertCircle, FileText, ChevronRight } from "lucide-react";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/students/4th-year")({
  head: () => {
    const seo = pageSeo({
      path: "/students/4th-year",
      title: "4th-Year Student Preparation Hub · Arzon Global",
      description:
        "Graduate career-ready without losing a year after college. Combine 12-week role training with applied capstone internships in your final semester.",
      image: "/og/about.jpg",
    });
    return {
      meta: [{ title: "4th-Year Student Preparation Hub · Arzon Global" }, ...seo.meta],
      links: seo.links,
    };
  },
  component: FourthYearStudentComponent,
});

function FourthYearStudentComponent() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#0B1325] font-sans pb-24">
      {/* Hero Header */}
      <section className="relative border-b border-stone-200 bg-white tone-light py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-[#1B3F8B]" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">
              PROBLEM: &ldquo;I GRADUATE IN 6 MONTHS. HOW DO I PREPARE BEFORE COMMENCEMENT?&rdquo;
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight leading-tight max-w-4xl">
            Graduate Career-Ready: Don&apos;t Lose a Year After College
          </h1>

          <p className="text-base sm:text-lg text-stone-700 max-w-3xl leading-relaxed">
            Final year is your strategic transition window. Master practical clinical database workflows in Oracle Argus, MedDRA, Medidata RAVE, or Clinical SAS alongside your university coursework so you enter hiring drives ready on day one.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs text-stone-600">
            <span className="px-2.5 py-1 rounded-md bg-stone-100 border border-stone-200 text-stone-800 font-bold">
              FINAL SEMESTER STRATEGY
            </span>
            <span>&bull;</span>
            <span>12-WEEK APPLIED CURRICULUM</span>
            <span>&bull;</span>
            <span className="text-emerald-800 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
              ACRI READINESS BENCHMARK
            </span>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        {/* Milestone Steps */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-stone-200 pb-4">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">
                THE PRE-GRADUATION PATHWAY
              </p>
              <h2 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                Final Semester 4-Step Preparation Roadmap
              </h2>
            </div>
            <Link
              to="/career-engine/test"
              className="text-xs font-mono font-bold uppercase text-[#1B3F8B] hover:underline flex items-center gap-1"
            >
              <span>Test Your Readiness Index</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                step: "01",
                title: "Identify Target Role",
                desc: "Choose between Drug Safety (PV), Medical Coding, CDM, or Clinical SAS based on your degree and strengths.",
                link: "/roles",
                linkText: "Explore Roles",
              },
              {
                step: "02",
                title: "Master Industry Software",
                desc: "Learn Oracle Argus 8.2, MedDRA, ICD-10-CM, or PROC SAS with hands-on case files and clinical datasets.",
                link: "/courses",
                linkText: "View 12-Week Tracks",
              },
              {
                step: "03",
                title: "Complete Capstone Internship",
                desc: "Gain verified practical experience processing real de-identified ICSR safety cases and eCRF datasets.",
                link: "/internships",
                linkText: "Applied Internships",
              },
              {
                step: "04",
                title: "Benchmark ACRI Score",
                desc: "Validate your readiness through the calibrated ACRI occupational simulation before facing technical recruiters.",
                link: "/career-engine/test",
                linkText: "Start Simulation",
              },
            ].map((st) => (
              <div
                key={st.step}
                className="rounded-xl border border-stone-200 bg-white tone-light p-6 space-y-3 shadow-xs hover:border-stone-300 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <span className="font-mono text-xs font-bold text-[#1B3F8B] bg-blue-50/80 px-2 py-0.5 rounded border border-blue-100">
                    STEP {st.step}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-stone-900">
                    {st.title}
                  </h3>
                  <p className="text-xs text-stone-600 font-sans leading-relaxed">
                    {st.desc}
                  </p>
                </div>
                <div className="pt-2 border-t border-stone-100">
                  <Link
                    to={st.link}
                    className="text-xs font-semibold text-[#1B3F8B] hover:text-[#0B1325] inline-flex items-center gap-1"
                  >
                    <span>{st.linkText}</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Opportunity Cost Story Callout */}
        <section className="rounded-2xl bg-white tone-light border border-stone-200 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-[#8A6D1F] font-mono text-xs font-bold uppercase tracking-wider">
                <Clock className="h-4 w-4" />
                <span>THE 1-YEAR OPPORTUNITY-COST SAVINGS MODEL</span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                Save Up to &#8377;1,39,000 in Relocation &amp; PG Expenses
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                Relocating to a metro city after graduation for a 6-month offline institute costs &#8377;1.39L+ in PG rent, food, and commuting before job applications even begin. Preparing during your 4th year eliminates post-college idle time.
              </p>
            </div>
            <Link
              to="/tools/cost-calculator"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-[#0B1325] hover:bg-[#1B3F8B] text-slate-50 font-mono text-xs font-bold uppercase tracking-wider transition-colors shrink-0 shadow-xs"
            >
              <span>Calculate Expenses</span>
              <ArrowRight className="h-4 w-4 text-slate-50" />
            </Link>
          </div>
        </section>

        {/* Action Decision Strip */}
        <section className="rounded-2xl border border-stone-200 bg-stone-50 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Not sure which clinical role fits your final year preparation?
            </h3>
            <p className="text-xs text-stone-600">
              Take the 15-minute diagnostic simulation to assess your strengths across Pharmacovigilance, CDM, and Medical Coding.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/career-engine/test"
              className="px-5 py-2.5 rounded-lg bg-[#0B1325] hover:bg-[#1B3F8B] text-slate-50 font-mono text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
            >
              <span>Take ACRI Assessment</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              to="/courses"
              className="px-5 py-2.5 rounded-lg bg-white border border-stone-300 hover:bg-stone-100 text-stone-900 font-mono text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              View Curricula
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
