import { Link } from "@tanstack/react-router";
import { Calculator, Compass, Layers, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

const TOOLS = [
  {
    title: "Healthcare Training & Relocation Cost Calculator",
    slug: "/tools/cost-calculator",
    icon: Calculator,
    tag: "INTERACTIVE CALCULATOR",
    badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
    description:
      "Calculate your true financial commitment: compare direct tuition fees, PG accommodation rent, food, transport, and job-search windows across Hyderabad, Bangalore, and Pune.",
    bullets: [
      "Audited across 45 PG accommodations & student hubs",
      "Calculates hidden living cost vs foregone salary",
      "Compares remote vs in-person training ROI",
    ],
    ctaText: "Launch Cost Calculator",
  },
  {
    title: "Cross-Qualification Role Compatibility Matrix",
    slug: "/tools/role-matrix",
    icon: Layers,
    tag: "HIRING ALIGNMENT MATRIX",
    badgeColor: "bg-blue-50 text-[#1D4ED8] border-blue-200",
    description:
      "Interactive matrix comparing B.Pharm, Pharm.D, M.Pharm, B.Sc, M.Sc, and Allied Health qualifications across 5 high-growth corporate tracks with recruiter rationale.",
    bullets: [
      "Direct prerequisite vs bridge status indicators",
      "Calibrated against 2,000+ corporate JDs",
      "Starting CTC bands and transition roadmaps",
    ],
    ctaText: "Open Role Matrix",
  },
  {
    title: "Clinical Skill Gap & JD Match Analyzer",
    slug: "/tools/skill-gap-analyzer",
    icon: Compass,
    tag: "COMPETENCY BENCHMARK",
    badgeColor: "bg-purple-50 text-purple-800 border-purple-200",
    description:
      "Evaluate your academic background against day-one enterprise software expectations across Pharmacovigilance, Clinical SAS, and Medical Coding.",
    bullets: [
      "Identifies software voids before recruiter screening",
      "Reverse-engineered from Tier-1 GCC hiring rounds",
      "Generates 90-day applied bridge roadmap",
    ],
    ctaText: "Analyze Skill Gaps",
  },
];

export function ResourceToolsStrip() {
  return (
    <section className="py-12 sm:py-16 bg-[#F8FAFC]/80 border-b border-[#E4EAF2] tone-light card-light">
      <div className="mb-8 sm:mb-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-[#2563EB] mb-3 shadow-2xs tone-light card-light">
          <Sparkles className="h-3 w-3 text-[#2563EB]" />
          <span>INTERACTIVE BRAINSTORMING TOOLS</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081F38] tracking-tight">
          Interactive Calculators &amp;{" "}
          <span className="bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent [box-decoration-break:clone]">
            Career Decision Engines
          </span>
        </h2>
        <p className="mt-2 text-sm sm:text-base text-[#475569] font-normal leading-relaxed">
          Self-serve analytical tools designed to help candidates model career economics, compare degree mobility, and benchmark technical skills before investing time or money.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {TOOLS.map((tool) => {
          const Icon = tool.icon;
          return (
            <div
              key={tool.title}
              className="flex flex-col justify-between rounded-2xl border border-[#E2E8F0] bg-white p-6 sm:p-7 shadow-xs hover:border-[#2563EB]/40 hover:shadow-lg transition-all tone-light card-light relative group"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                  <span
                    className={`font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${tool.badgeColor}`}
                  >
                    {tool.tag}
                  </span>
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-blue-50 text-[#2563EB] border border-blue-100 group-hover:scale-105 transition-transform">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                </div>

                <h3 className="mt-4 text-lg sm:text-xl font-bold text-[#081F38] group-hover:text-[#2563EB] transition-colors leading-snug">
                  {tool.title}
                </h3>

                <p className="mt-2.5 text-xs sm:text-sm text-[#475569] leading-relaxed">
                  {tool.description}
                </p>

                <div className="mt-4 pt-3.5 border-t border-[#F1F5F9] space-y-2">
                  {tool.bullets.map((b) => (
                    <div key={b} className="flex items-start gap-2 text-xs text-[#334155]">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E4EAF2]">
                <Link
                  to={tool.slug as never}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-5 py-2.5 text-xs font-bold transition-all shadow-xs"
                >
                  <span>{tool.ctaText}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
