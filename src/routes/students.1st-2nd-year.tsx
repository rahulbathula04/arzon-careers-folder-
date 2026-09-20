import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap, Compass, ArrowRight, BookOpen, Target, Layers, ChevronRight } from "lucide-react";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/students/1st-2nd-year")({
  head: () => {
    const seo = pageSeo({
      path: "/students/1st-2nd-year",
      title: "1st & 2nd-Year Student Career Exploration Hub · Arzon Global",
      description:
        "Build early career clarity in your 1st and 2nd year of college. Discover healthcare, clinical, and data role competencies without final-year placement pressure.",
      image: "/og/about.jpg",
    });
    return {
      meta: [{ title: "1st & 2nd-Year Student Career Exploration Hub · Arzon Global" }, ...seo.meta],
      links: seo.links,
    };
  },
  component: FirstSecondYearStudentComponent,
});

function FirstSecondYearStudentComponent() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#0B1325] font-sans pb-24">
      {/* Hero Header */}
      <section className="relative border-b border-stone-200 bg-white tone-light py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-[#1B3F8B]" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">
              1ST &amp; 2ND YEAR EARLY EXPLORATION WINDOW
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight leading-tight max-w-4xl">
            Build Early Career Clarity: Explore Pathways Before Placement Stress Begins
          </h1>

          <p className="text-base sm:text-lg text-stone-700 max-w-3xl leading-relaxed font-sans">
            Your 1st and 2nd year is the ideal window to explore domain options without the pressure of final-year campus drives. Understand industry role expectations early and build foundational pharmaceutical and clinical data literacy.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs text-stone-600">
            <span className="px-2.5 py-1 rounded-md bg-stone-100 border border-stone-200 text-stone-800 font-bold">
              ZERO PLACEMENT PRESSURE
            </span>
            <span>&bull;</span>
            <span>DOMAIN EXPLORATION</span>
            <span>&bull;</span>
            <span className="text-emerald-800 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md font-mono">
              LONG-TERM CAREER PATHWAY
            </span>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        {/* Core Exploration Cards */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-stone-200 pb-4">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">
                EARLY FOUNDATIONS
              </p>
              <h2 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                What 1st &amp; 2nd Year Students Should Focus On
              </h2>
            </div>
            <Link
              to="/roles"
              className="text-xs font-mono font-bold uppercase text-[#1B3F8B] hover:underline flex items-center gap-1"
            >
              <span>Explore Roles</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Compass,
                title: "1. Role Discovery & Taxonomy",
                desc: "Understand what Drug Safety Associates, Clinical Data Managers, and Medical Coders actually do daily in global life sciences companies.",
                linkText: "Explore Role Library",
                linkTo: "/roles",
              },
              {
                icon: Target,
                title: "2. Degree-to-Role Alignment",
                desc: "See how your specific degree (B.Pharm, Pharm.D, B.Sc, M.Sc) maps directly to entry-level GCC opportunities and salary trajectories.",
                linkText: "View Degree Pathways",
                linkTo: "/degrees",
              },
              {
                icon: Layers,
                title: "3. Tool Awareness & Terminology",
                desc: "Learn about industry software suites like Oracle Argus, MedDRA, ICD-10, and Medidata RAVE before beginning hands-on practice.",
                linkText: "Browse Software Curricula",
                linkTo: "/courses",
              },
            ].map((card, i) => {
              const IconComp = card.icon;
              return (
                <div
                  key={i}
                  className="rounded-xl border border-stone-200 bg-white tone-light p-6 shadow-xs hover:border-stone-300 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="h-10 w-10 rounded-lg bg-stone-100 flex items-center justify-center text-[#1B3F8B]">
                      <IconComp className="h-5 w-5" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-stone-900">{card.title}</h3>
                    <p className="text-xs text-stone-600 leading-relaxed font-sans">{card.desc}</p>
                  </div>
                  <div className="pt-3 border-t border-stone-100">
                    <Link
                      to={card.linkTo}
                      className="text-xs font-semibold text-[#1B3F8B] hover:text-[#0B1325] inline-flex items-center gap-1"
                    >
                      <span>{card.linkText}</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Step-by-Step Strategic Roadmap for Early-Years */}
        <section className="rounded-2xl border border-stone-200 bg-white tone-light p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="space-y-1 border-b border-stone-100 pb-3">
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">
              4-YEAR HORIZON
            </p>
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              The 1st &amp; 2nd Year Strategic Playbook
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-stone-700">
            <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
              <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">
                Phase 1: Academic Excellence + Regulatory Exposure
              </span>
              <p className="text-xs leading-relaxed text-stone-600">
                Focus on core pharmacology, physiology, and pathology coursework while reading ICH guidelines (ICH E2A, E2D) to understand why clinical safety matters globally.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
              <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">
                Phase 2: Digital Literacy &amp; Career Diagnostic
              </span>
              <p className="text-xs leading-relaxed text-stone-600">
                Take an early diagnostic assessment to identify natural aptitudes—whether your thinking aligns better with analytical coding, case narratives, or data verification.
              </p>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-stone-600">
              Ready to see what clinical workplace questions look like?
            </p>
            <Link
              to="/career-engine/test"
              className="px-5 py-2.5 rounded-lg bg-[#0B1325] hover:bg-[#1B3F8B] text-slate-50 font-mono text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 shrink-0"
            >
              <span>Try ACRI Simulation Terminal</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
