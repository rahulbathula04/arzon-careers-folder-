import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap, Clock, ArrowRight, CheckCircle2, ShieldCheck, HelpCircle, AlertCircle, Sparkles } from "lucide-react";
import { pageSeo } from "@/lib/seo";
import { Interactive3dCard, Card3dLayer } from "@/components/3d/Interactive3dCard";
import { Floating3dBadge } from "@/components/3d/Floating3dBadge";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";

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
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans pb-24 relative overflow-hidden">
      {/* Background Dot Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#1B3F8B_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none z-0" />

      {/* Hero Header */}
      <section className="relative border-b border-stone-200 bg-white/95 tone-light backdrop-blur-md py-12 sm:py-16 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-[#1B3F8B]" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">
              PROBLEM: "I GRADUATE SOON. HOW DO I PREPARE BEFORE GRADUATION?"
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight leading-tight max-w-4xl">
            Graduate Career-Ready:{" "}
            <AnimatedGradientText className="font-serif italic font-bold">
              Don't Lose a Year After College
            </AnimatedGradientText>
          </h1>

          <p className="text-base sm:text-lg text-stone-700 max-w-3xl leading-relaxed">
            Final year is the strategic preparation window. Start building practical database fluency in Oracle Argus, MedDRA, Medidata RAVE, or Clinical SAS alongside your university coursework so you enter hiring drives ready.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs text-stone-600">
            <Floating3dBadge duration={4} delay={0.2}>
              <span className="px-2.5 py-1 rounded bg-amber-100 border border-amber-300 text-stone-900 font-bold">
                HIGH INTENT ACQUISITION HUB
              </span>
            </Floating3dBadge>
            <span>·</span>
            <span>12-WEEK BLENDED MODEL</span>
            <span>·</span>
            <span className="text-emerald-800 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded">
              ISO 9001 VERIFIABLE CREDENTIAL
            </span>
          </div>
        </div>
      </section>

      <main className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12 z-10">
        {/* Milestone Steps */}
        <section className="space-y-6">
          <h2 className="font-serif text-2xl font-bold text-stone-900">
            Final Semester 4-Step Preparation Roadmap
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Identify Target Role",
                desc: "Choose between Drug Safety (PV), Medical Coding, CDM, or Clinical SAS based on your degree."
              },
              {
                step: "02",
                title: "Master Industry Software",
                desc: "Learn Oracle Argus 8.2, MedDRA, ICD-10-CM, or PROC SAS with hands-on case files."
              },
              {
                step: "03",
                title: "Complete Capstone Internship",
                desc: "Gain verified practical experience processing real de-identified clinical datasets."
              },
              {
                step: "04",
                title: "Enter Technical Hiring Drives",
                desc: "Practice answering technical interview questions compiled from 300+ verified employer JDs."
              }
            ].map((st, i) => (
              <Interactive3dCard
                key={i}
                maxTilt={6}
                className="rounded-2xl border border-stone-300 bg-white/95 tone-light p-5 space-y-3 shadow-md hover:shadow-lg transition-all"
              >
                <Card3dLayer translateZ={20}>
                  <span className="font-mono text-xs font-bold text-[#1B3F8B] bg-blue-50 px-2.5 py-1 rounded-md">
                    STEP {st.step}
                  </span>
                </Card3dLayer>
                <Card3dLayer translateZ={30}>
                  <h3 className="font-serif text-lg font-bold text-stone-900">
                    {st.title}
                  </h3>
                  <p className="text-xs text-stone-600 font-sans leading-relaxed mt-1">
                    {st.desc}
                  </p>
                </Card3dLayer>
              </Interactive3dCard>
            ))}
          </div>
        </section>

        {/* Opportunity Cost Story Callout */}
        <section className="rounded-3xl bg-white/95 tone-light border border-stone-300 p-6 sm:p-8 shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-[#8A6D1F] font-mono text-xs font-bold uppercase tracking-wider">
                <Clock className="h-4 w-4" />
                <span>THE 1-YEAR OPPORTUNITY-COST SAVINGS MODEL</span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                Save Up to ₹1,39,000 in Relocation &amp; PG Expenses
              </h2>
              <p className="text-xs sm:text-sm text-stone-700 font-sans max-w-2xl mt-1">
                Relocating to a metro city after graduation for a 6-month course costs ₹1.39L+ in PG rent, food, and transport before job applications even begin. Preparing in your 4th year eliminates post-college idle time.
              </p>
            </div>
            <Link
              to="/tools/cost-calculator"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-slate-50 font-bold text-xs transition-colors shrink-0 shadow-sm"
            >
              <span>Calculate Relocation Cost</span>
              <ArrowRight className="h-4 w-4 text-slate-50" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
