import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap, ArrowRight, BookOpen, Clock, ShieldCheck, Layers, ChevronRight } from "lucide-react";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/students/3rd-year")({
  head: () => {
    const seo = pageSeo({
      path: "/students/3rd-year",
      title: "3rd-Year Student Preparation Hub · Arzon Global",
      description:
        "Turn your 3rd year into a 12-month advance advantage. Master Oracle Argus, MedDRA, ICD-10-CM, and Medidata RAVE before final-year placement pressure begins.",
      image: "/og/about.jpg",
    });
    return {
      meta: [{ title: "3rd-Year Student Preparation Hub · Arzon Global" }, ...seo.meta],
      links: seo.links,
    };
  },
  component: ThirdYearStudentComponent,
});

function ThirdYearStudentComponent() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#0B1325] font-sans pb-24">
      {/* Hero Header */}
      <section className="relative border-b border-stone-200 bg-white tone-light py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-[#1B3F8B]" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">
              PROBLEM: &ldquo;I HAVE TIME. WHAT TOOLS SHOULD I START LEARNING?&rdquo;
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight leading-tight max-w-4xl">
            Turn Your 3rd Year into a 12-Month Advantage: Learn Tool Fluency Early
          </h1>

          <p className="text-base sm:text-lg text-stone-700 max-w-3xl leading-relaxed font-sans">
            Third year provides the optimal low-stress preparation runway. Master industry software suites like Oracle Argus, MedDRA, Medidata RAVE, and Clinical SAS before final-year campus drives and thesis deadlines commence.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs text-stone-600">
            <span className="px-2.5 py-1 rounded-md bg-stone-100 border border-stone-200 text-stone-800 font-bold">
              12-MONTH ADVANCE WINDOW
            </span>
            <span>&bull;</span>
            <span>DAY-ONE TOOL FLUENCY</span>
            <span>&bull;</span>
            <span className="text-emerald-800 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md font-mono">
              ISO 9001 VERIFIABLE CREDENTIAL
            </span>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        {/* Recommended 3rd-Year Milestones */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-stone-200 pb-4">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">
                STRATEGIC ROADMAP
              </p>
              <h2 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                Recommended 3rd-Year Learning Milestones
              </h2>
            </div>
            <Link
              to="/courses"
              className="text-xs font-mono font-bold uppercase text-[#1B3F8B] hover:underline flex items-center gap-1"
            >
              <span>Explore All Curricula</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "1. Software Tool Mastery",
                desc: "Gain hands-on practice on Oracle Argus Safety 8.4, MedDRA 27.0, and Medidata RAVE EDC with authentic clinical case files.",
                linkText: "Explore 12-Week Tracks",
                linkTo: "/courses",
              },
              {
                title: "2. Applied Capstone Deliverables",
                desc: "Execute simulated ICSR case entries, eCRF query resolutions, and medical chart audits to build verifiable proof of work.",
                linkText: "View Internship Hub",
                linkTo: "/internships",
              },
              {
                title: "3. Employer JD Alignment",
                desc: "Benchmark your competencies against top healthcare GCCs and CROs (Novartis, Cognizant, IQVIA, Parexel, Fortrea).",
                linkText: "Compare Role Competencies",
                linkTo: "/tools/role-matrix",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="rounded-xl border border-stone-200 bg-white tone-light p-6 shadow-xs hover:border-stone-300 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <span className="font-mono text-xs font-bold text-[#1B3F8B] bg-blue-50/80 px-2 py-0.5 rounded border border-blue-100">
                    MILESTONE 0{i + 1}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-stone-900">
                    {card.title}
                  </h3>
                  <p className="text-xs text-stone-600 font-sans leading-relaxed">
                    {card.desc}
                  </p>
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
            ))}
          </div>
        </section>

        {/* 3rd Year Advantage Story */}
        <section className="rounded-2xl bg-white tone-light border border-stone-200 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-[#1B3F8B] font-mono text-xs font-bold uppercase tracking-wider">
                <Clock className="h-4 w-4" />
                <span>WHY STARTING IN 3RD YEAR WINS</span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                Placement Drives Don&apos;t Wait for Course Completion
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                Campus placement drives typically occur in semester 7 (early 4th year). Students who begin preparing after graduation are competing 12 months late. Completing tool training during 3rd year positions your profile at the top of early recruitment shortlists.
              </p>
            </div>
            <Link
              to="/career-engine/test"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-[#0B1325] hover:bg-[#1B3F8B] text-slate-50 font-mono text-xs font-bold uppercase tracking-wider transition-colors shrink-0 shadow-xs"
            >
              <span>Take ACRI Diagnostic</span>
              <ArrowRight className="h-4 w-4 text-slate-50" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
