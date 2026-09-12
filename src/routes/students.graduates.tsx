import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap, Clock, ArrowRight, CheckCircle2, ShieldCheck, AlertCircle, Sparkles } from "lucide-react";
import { pageSeo } from "@/lib/seo";
import { Interactive3dCard, Card3dLayer } from "@/components/3d/Interactive3dCard";
import { Floating3dBadge } from "@/components/3d/Floating3dBadge";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";

export const Route = createFileRoute("/students/graduates")({
  head: () => {
    const seo = pageSeo({
      path: "/students/graduates",
      title: "Recent Graduate Fast-Track Preparation Hub · Arzon Global",
      description:
        "Eliminate post-graduation idle time. Transition directly into structured 12-week role training, applied capstone internships, and technical interview preparation.",
      image: "/og/about.jpg",
    });
    return {
      meta: [{ title: "Recent Graduate Fast-Track Preparation Hub · Arzon Global" }, ...seo.meta],
      links: seo.links,
    };
  },
  component: GraduatesStudentComponent,
});

function GraduatesStudentComponent() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#1B3F8B_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none z-0" />

      {/* Hero Header */}
      <section className="relative border-b border-stone-200 bg-white/95 tone-light backdrop-blur-md py-12 sm:py-16 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-[#1B3F8B]" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">
              PROBLEM: "I GRADUATED. HOW DO I STOP WASTING TIME FIGURING THIS OUT?"
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight leading-tight max-w-4xl">
            Stop Losing Post-Graduation Time:{" "}
            <AnimatedGradientText className="font-serif italic font-bold">
              Become Role-Ready Faster
            </AnimatedGradientText>
          </h1>

          <p className="text-base sm:text-lg text-stone-700 max-w-3xl leading-relaxed font-sans">
            Already completed your degree? Stop spending months experimenting with random YouTube playlists. Transition directly into 12-week role-focused practical training and applied capstone internship work.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs text-stone-600">
            <Floating3dBadge duration={4} delay={0.2}>
              <span className="px-2.5 py-1 rounded bg-blue-50 border border-blue-200 text-[#1B3F8B] font-bold">
                FAST-TRACK PREPARATION
              </span>
            </Floating3dBadge>
            <span>·</span>
            <span>APPLIED INTERNSHIP ATTACHED</span>
            <span>·</span>
            <span className="text-emerald-800 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded font-mono">
              ISO 9001 VERIFIABLE CREDENTIAL
            </span>
          </div>
        </div>
      </section>

      <main className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12 z-10">
        <section className="space-y-6">
          <h2 className="font-serif text-2xl font-bold text-stone-900">
            Recommended Fast-Track Role Preparation Options
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Pharmacovigilance Fast-Track",
                slug: "pharmacovigilance",
                duration: "12 Weeks (Blended + Capstone)",
                tools: "Oracle Argus Safety 8.2, MedDRA 26.0",
                blurb: "Master ICSR case safety processing and adverse event reporting for GCC hiring drives."
              },
              {
                title: "Medical Coding Fast-Track",
                slug: "medical-coding",
                duration: "12 Weeks (Blended + Capstone)",
                tools: "ICD-10-CM 2026, CPT 2026, EncoderPro",
                blurb: "Master chart auditing and diagnostic coding for US healthcare RCM companies."
              },
              {
                title: "Clinical SAS Fast-Track",
                slug: "healthcare-analytics",
                duration: "12 Weeks (Blended + Capstone)",
                tools: "SAS Studio, PROC SQL, CDISC SDTM",
                blurb: "Convert raw clinical trial data into SDTM domain structures and FDA-compliant TLFs."
              }
            ].map((trk, i) => (
              <Interactive3dCard
                key={i}
                maxTilt={8}
                className="rounded-3xl border border-stone-300 bg-white/95 tone-light p-6 shadow-md hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <Card3dLayer translateZ={20}>
                    <span className="font-mono text-xs font-bold text-[#1B3F8B] bg-blue-50 px-2.5 py-1 rounded-full">
                      {trk.duration}
                    </span>
                  </Card3dLayer>
                  <Card3dLayer translateZ={30}>
                    <h3 className="font-serif text-xl font-bold text-stone-900">
                      {trk.title}
                    </h3>
                    <p className="text-xs text-stone-700 font-sans leading-relaxed mt-1">
                      {trk.blurb}
                    </p>
                  </Card3dLayer>
                  <Card3dLayer translateZ={40} className="pt-2 border-t border-stone-200">
                    <span className="font-mono text-[10px] text-stone-500 uppercase font-bold block">SOFTWARE &amp; TOOLS</span>
                    <p className="font-mono text-xs font-bold text-stone-900">{trk.tools}</p>
                  </Card3dLayer>
                </div>

                <Card3dLayer translateZ={45}>
                  <Link
                    to={`/courses/${trk.slug}` as any}
                    className="inline-flex items-center justify-between w-full h-10 px-4 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-slate-50 font-bold text-xs transition-colors shadow-sm"
                  >
                    <span>View Track Syllabus</span>
                    <ArrowRight className="h-4 w-4 text-slate-50" />
                  </Link>
                </Card3dLayer>
              </Interactive3dCard>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
