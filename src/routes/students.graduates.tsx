import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap, Clock, ArrowRight, CheckCircle2, ShieldCheck, AlertCircle, Briefcase, ChevronRight } from "lucide-react";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/students/graduates")({
  head: () => {
    const seo = pageSeo({
      path: "/students/graduates",
      title: "Recent Graduate Fast-Track Hub · Arzon Global",
      description:
        "Stop losing post-graduation time. Fast-track your transition into Pharmacovigilance, CDM, and Medical Coding with 12-week role training, applied capstone internships, and ACRI benchmarking.",
      image: "/og/about.jpg",
    });
    return {
      meta: [{ title: "Recent Graduate Fast-Track Hub · Arzon Global" }, ...seo.meta],
      links: seo.links,
    };
  },
  component: GraduatesStudentComponent,
});

function GraduatesStudentComponent() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#0B1325] font-sans pb-24">
      {/* Hero Header */}
      <section className="relative border-b border-stone-200 bg-white tone-light py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-[#1B3F8B]" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">
              PROBLEM: &ldquo;I HAVE ALREADY GRADUATED. HOW DO I STOP WASTING TIME?&rdquo;
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight leading-tight max-w-4xl">
            Stop Losing Post-Graduation Time: Become Role-Ready in 12 Weeks
          </h1>

          <p className="text-base sm:text-lg text-stone-700 max-w-3xl leading-relaxed font-sans">
            Already graduated? Every month spent applying blindly to job portals with a generic resume decreases callback rates. Transition directly into intensive role-focused practical training, verified capstone internship work, and calibrated ACRI readiness benchmarking.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs text-stone-600">
            <span className="px-2.5 py-1 rounded-md bg-stone-100 border border-stone-200 text-stone-800 font-bold">
              POST-DEGREE FAST TRACK
            </span>
            <span>&bull;</span>
            <span>APPLIED INTERNSHIP ATTACHED</span>
            <span>&bull;</span>
            <span className="text-emerald-800 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md font-mono">
              VERIFIED PORTFOLIO OF WORK
            </span>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        {/* Fast-Track Recovery Roadmap */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-stone-200 pb-4">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">
                EXECUTION TIMELINE
              </p>
              <h2 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                The 12-Week Post-Graduation Career Turnaround
              </h2>
            </div>
            <Link
              to="/career-engine/test"
              className="text-xs font-mono font-bold uppercase text-[#1B3F8B] hover:underline flex items-center gap-1"
            >
              <span>Diagnose Your Skill Gap</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                period: "WEEKS 01–04",
                title: "Regulatory & Software Fluency",
                desc: "ICH E2B(R3), FDA 21 CFR 314.80, and hands-on simulation in Oracle Argus Safety 8.4 and MedDRA coding.",
                linkText: "View PV Curriculum",
                linkTo: "/courses",
              },
              {
                period: "WEEKS 05–08",
                title: "Capstone ICSR Case Processing",
                desc: "Process 25+ de-identified clinical safety reports: intake, WHO-UMC causality evaluation, and medical narrative writing.",
                linkText: "View Internship Projects",
                linkTo: "/internships",
              },
              {
                period: "WEEKS 09–12",
                title: "ACRI Certification & Employer Drives",
                desc: "Benchmark your score on the ACRI terminal, generate your recruiter dossier, and face technical hiring rounds.",
                linkText: "Start ACRI Terminal",
                linkTo: "/career-engine/test",
              },
            ].map((st, i) => (
              <div
                key={i}
                className="rounded-xl border border-stone-200 bg-white tone-light p-6 shadow-xs hover:border-stone-300 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <span className="font-mono text-xs font-bold text-[#1B3F8B] bg-blue-50/80 px-2 py-0.5 rounded border border-blue-100">
                    {st.period}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-stone-900">
                    {st.title}
                  </h3>
                  <p className="text-xs text-stone-600 font-sans leading-relaxed">
                    {st.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-stone-100">
                  <Link
                    to={st.linkTo}
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

        {/* Why Generic Applications Fail */}
        <section className="rounded-2xl bg-white tone-light border border-stone-200 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="space-y-2 max-w-3xl">
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-amber-800">
              RECRUITER INSIGHT
            </p>
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Why Generic Resumes Get Filtered Out by ATS
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
              CROs and healthcare IT firms receive thousands of applications from fresh B.Pharm and Life Sciences graduates every month. When a resume lists only university coursework and lacks practical software exposure (Argus, MedDRA, RAVE), ATS screening automatically deprioritizes it. Having a verified ACRI score and real case processing proof sets you apart instantly.
            </p>
          </div>
          <div className="pt-2">
            <Link
              to="/career-engine/test"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-[#0B1325] hover:bg-[#1B3F8B] text-slate-50 font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
            >
              <span>Take ACRI Certification Simulation</span>
              <ArrowRight className="h-4 w-4 text-slate-50" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
