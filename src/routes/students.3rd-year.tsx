import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap, ArrowRight, BookOpen, Sparkles, CheckCircle2, Clock, ShieldCheck, Layers } from "lucide-react";
import { pageSeo } from "@/lib/seo";
import { Interactive3dCard, Card3dLayer } from "@/components/3d/Interactive3dCard";
import { Floating3dBadge } from "@/components/3d/Floating3dBadge";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";

export const Route = createFileRoute("/students/3rd-year")({
  head: () => {
    const seo = pageSeo({
      path: "/students/3rd-year",
      title: "3rd-Year Student Acquisition Hub · Arzon Global",
      description:
        "I have time—what should I start learning? Master Oracle Argus, MedDRA, ICD-10-CM, and Medidata RAVE in 3rd year to stay ahead of campus placement pressure.",
      image: "/og/about.jpg",
    });
    return {
      meta: [{ title: "3rd-Year Student Acquisition Hub · Arzon Global" }, ...seo.meta],
      links: seo.links,
    };
  },
  component: ThirdYearStudentComponent,
});

function ThirdYearStudentComponent() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#1B3F8B_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none z-0" />

      {/* Hero Header */}
      <section className="relative border-b border-stone-200 bg-white/95 tone-light backdrop-blur-md py-12 sm:py-16 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-[#1B3F8B]" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">
              PROBLEM: "I HAVE TIME. WHAT SHOULD I START LEARNING?"
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight leading-tight max-w-4xl">
            Turn Your 3rd Year into a 12-Month Advantage:{" "}
            <AnimatedGradientText className="font-serif italic font-bold">
              Learn Tool Fluency Early
            </AnimatedGradientText>
          </h1>

          <p className="text-base sm:text-lg text-stone-700 max-w-3xl leading-relaxed font-sans">
            Third year gives you a 12-month advance preparation window. Master industry software suites like Oracle Argus, ICD-10 coding, Medidata RAVE, and Clinical SAS before final-year placement drives begin.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs text-stone-600">
            <Floating3dBadge duration={4} delay={0.2}>
              <span className="px-2.5 py-1 rounded bg-blue-50 border border-blue-200 text-[#1B3F8B] font-bold">
                12-MONTH HEAD START
              </span>
            </Floating3dBadge>
            <span>·</span>
            <span>DAY-ONE TOOL FLUENCY</span>
            <span>·</span>
            <span className="text-emerald-800 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded font-mono">
              ISO 9001 VERIFIABLE CREDENTIAL
            </span>
          </div>
        </div>
      </section>

      <main className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12 z-10">
        {/* Core Action Steps */}
        <section className="space-y-6">
          <h2 className="font-serif text-2xl font-bold text-stone-900">
            Recommended 3rd-Year Learning Milestones
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "1. Software Tool Mastery",
                desc: "Gain hands-on practice on Oracle Argus Safety 8.4, MedDRA 27.0, and Medidata RAVE EDC.",
                linkText: "Explore 12-Week Tracks →",
                linkTo: "/training",
              },
              {
                title: "2. Applied Capstone Deliverables",
                desc: "Execute simulated ICSR case entries, eCRF query resolutions, and medical chart audits.",
                linkText: "View Internship Hub →",
                linkTo: "/internships",
              },
              {
                title: "3. Employer JD Alignment",
                desc: "Compare competencies required by top Hyderabad GCCs (Novartis, Cognizant, IQVIA, Parexel).",
                linkText: "Explore Hyderabad Hub →",
                linkTo: "/locations/hyderabad",
              },
            ].map((card, i) => (
              <Interactive3dCard
                key={i}
                maxTilt={8}
                className="rounded-3xl border border-stone-300 bg-white/95 tone-light p-6 shadow-md hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
              >
                <Card3dLayer translateZ={10} className="space-y-3">
                  <div className="h-10 w-10 rounded-xl bg-stone-100 flex items-center justify-center text-[#1B3F8B]">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-stone-900">{card.title}</h3>
                  <p className="text-xs text-stone-700 leading-relaxed font-sans">{card.desc}</p>
                </Card3dLayer>
                <Card3dLayer translateZ={20} className="pt-2">
                  <Link
                    to={card.linkTo}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#1B3F8B] hover:underline"
                  >
                    <span>{card.linkText}</span>
                  </Link>
                </Card3dLayer>
              </Interactive3dCard>
            ))}
          </div>
        </section>

        {/* Action Banner */}
        <section className="rounded-3xl bg-gradient-to-br from-[#1B3F8B] to-[#0F2860] text-white p-8 space-y-6 shadow-xl">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-blue-200">
              3RD YEAR DIAGNOSTIC STEP
            </span>
            <h2 className="font-serif text-3xl font-bold text-white">
              Diagnose Your 3rd-Year Skill Requirements
            </h2>
            <p className="text-sm text-blue-100 leading-relaxed">
              Use our interactive diagnostic wizard to find out exactly which software tools align with your degree and long-term career goals.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-stone-950 font-mono text-xs font-bold px-6 py-3 rounded-full transition-colors shadow-md"
            >
              <span>Launch Diagnostic Wizard</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
