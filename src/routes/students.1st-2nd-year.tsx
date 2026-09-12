import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap, Compass, ArrowRight, CheckCircle2, ShieldCheck, Sparkles, BookOpen, Search, Target, Layers } from "lucide-react";
import { pageSeo } from "@/lib/seo";
import { Interactive3dCard, Card3dLayer } from "@/components/3d/Interactive3dCard";
import { Floating3dBadge } from "@/components/3d/Floating3dBadge";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";

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
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans pb-24 relative overflow-hidden">
      {/* Background Subtle Mesh Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1B3F8B_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none z-0" />

      {/* Hero Header */}
      <section className="relative border-b border-stone-200 bg-white/95 tone-light backdrop-blur-md py-12 sm:py-16 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-[#1B3F8B]" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">
              1ST & 2ND YEAR EARLY EXPLORATION WINDOW
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight leading-tight max-w-4xl">
            Build Early Career Clarity:{" "}
            <AnimatedGradientText className="font-serif italic font-bold">
              Train Before Placement Stress Begins
            </AnimatedGradientText>
          </h1>

          <p className="text-base sm:text-lg text-stone-700 max-w-3xl leading-relaxed font-sans">
            Your 1st and 2nd year is the ideal window to explore domain options without the intense pressure of final-year campus placements. Understand industry role expectations early and build genuine skill clarity.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs text-stone-600">
            <Floating3dBadge duration={4} delay={0.2}>
              <span className="px-2.5 py-1 rounded bg-blue-50 border border-blue-200 text-[#1B3F8B] font-bold">
                ZERO PLACEMENT PRESSURE
              </span>
            </Floating3dBadge>
            <span>·</span>
            <span>DOMATION EXPLORATION</span>
            <span>·</span>
            <span className="text-emerald-800 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded font-mono">
              LONG-TERM CAREER PATHWAY
            </span>
          </div>
        </div>
      </section>

      <main className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12 z-10">
        {/* Core Exploration Cards */}
        <section className="space-y-6">
          <h2 className="font-serif text-2xl font-bold text-stone-900">
            What 1st & 2nd Year Students Should Focus On
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Compass,
                title: "1. Role Discovery & Taxonomy",
                desc: "Understand what Drug Safety Associates, Clinical Data Managers, and Medical Coders actually do daily in global companies.",
                linkText: "Explore Role Library →",
                linkTo: "/roles",
              },
              {
                icon: Target,
                title: "2. Degree-to-Role Alignment",
                desc: "See how your specific degree (B.Pharm, Pharm.D, B.Sc, B.Tech) maps directly to entry-level GCC opportunities.",
                linkText: "View Degree Pathways →",
                linkTo: "/degrees",
              },
              {
                icon: Layers,
                title: "3. Tool Awareness & Fundamentals",
                desc: "Learn about industry standard software suites like Oracle Argus, MedDRA, ICD-10, and Clinical SAS before hands-on practice.",
                linkText: "Browse Software Tools →",
                linkTo: "/training",
              },
            ].map((card, i) => {
              const IconComp = card.icon;
              return (
                <Interactive3dCard
                  key={i}
                  maxTilt={8}
                  className="rounded-3xl border border-stone-300 bg-white/95 tone-light p-6 shadow-md hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
                >
                  <Card3dLayer translateZ={10} className="space-y-3">
                    <div className="h-10 w-10 rounded-xl bg-stone-100 flex items-center justify-center text-[#1B3F8B]">
                      <IconComp className="h-5 w-5" />
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
              );
            })}
          </div>
        </section>

        {/* Step-by-Step Strategic Roadmap for Early-Years */}
        <section className="rounded-3xl border border-stone-300 bg-white/95 tone-light p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#1B3F8B]" />
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              The 1st & 2nd Year Strategic Playbook
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-stone-700">
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">
                Phase 1: Academic Focus + Conceptual Exposure
              </span>
              <h3 className="font-serif text-lg font-bold text-stone-900">Keep College Grades High While Exploring Options</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Maintain strong academic performance in college while spending 1-2 hours a week reading industry job descriptions and domain workflows.
              </p>
              <ul className="space-y-1.5 text-xs text-stone-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Identify primary domain interest (Safety, Data, Coding)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Understand key industry terminologies (FDA, EMA, CDISC, ICD-10)</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">
                Phase 2: Preparatory Roadmap Planning
              </span>
              <h3 className="font-serif text-lg font-bold text-stone-900">Plan Your 3rd & 4th Year Practical Training</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Pre-schedule your practical hands-on software training and internship deliverables for 3rd and 4th year so you finish before graduation.
              </p>
              <ul className="space-y-1.5 text-xs text-stone-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Review Arzon 12-week role training structure</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Check eligibility for applied capstone internships</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Action Banners */}
        <section className="rounded-3xl bg-gradient-to-br from-[#1B3F8B] to-[#0F2860] text-white p-8 space-y-6 shadow-xl">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-blue-200">
              STUDENT PROBLEM SOLVER ENGINE
            </span>
            <h2 className="font-serif text-3xl font-bold text-white">
              Not Sure Which Healthcare or Data Domain Fits Your Degree?
            </h2>
            <p className="text-sm text-blue-100 leading-relaxed">
              Use our interactive 3-step decision wizard to generate a personalized career role map based on your current degree, year, and technical interests.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-stone-950 font-mono text-xs font-bold px-6 py-3 rounded-full transition-colors shadow-md"
            >
              <span>Launch Student Problem Solver Wizard</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/internships"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold px-6 py-3 rounded-full border border-white/20 transition-colors"
            >
              <span>Learn About Applied Internships</span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
