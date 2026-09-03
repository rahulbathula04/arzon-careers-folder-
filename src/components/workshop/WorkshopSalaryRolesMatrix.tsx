import { TrendingUp, CheckCircle, XCircle, ArrowUpRight } from "lucide-react";

export function WorkshopSalaryRolesMatrix({ onSelectRole }: { onSelectRole: (role: string) => void }) {
  const corporateRoles = [
    {
      title: "Drug Safety Associate (PV)",
      ctc: "₹3.8L – ₹6.5L CTC",
      monthly: "~₹32,000 – ₹54,000 /mo",
      tools: "Oracle Argus 8.4, MedDRA 27.0, ICSR Case Triage",
      growth: "Progresses to Senior Safety Specialist (₹8L–₹12L) in 3 yrs",
      badge: "HIGHEST DEMAND",
      badgeColor: "bg-blue-50 text-[#1B3F8B] border-blue-200",
    },
    {
      title: "Clinical Data Coordinator (CDM)",
      ctc: "₹3.5L – ₹5.8L CTC",
      monthly: "~₹29,000 – ₹48,000 /mo",
      tools: "Medidata RAVE, CDASH, eCRF Query Management",
      growth: "Progresses to Lead Clinical Data Manager (₹9L–₹14L) in 4 yrs",
      badge: "HIGH GROWTH",
      badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
    },
    {
      title: "Medical Coder & Risk Analyst",
      ctc: "₹3.2L – ₹5.0L CTC",
      monthly: "~₹26,000 – ₹42,000 /mo",
      tools: "ICD-10-CM, CPT, HCPCS, CPC Certification Prep",
      growth: "Progresses to Senior Medical Coding Auditor (₹7L–₹11L) in 3 yrs",
      badge: "CONSISTENT RECRUITING",
      badgeColor: "bg-purple-50 text-purple-800 border-purple-200",
    },
    {
      title: "Regulatory Affairs Associate",
      ctc: "₹3.6L – ₹6.0L CTC",
      monthly: "~₹30,000 – ₹50,000 /mo",
      tools: "eCTD Modules 1-5, ANDA/NDA Submissions, FDA/EMA Guidelines",
      growth: "Progresses to Regulatory Submissions Lead (₹10L–₹16L) in 4 yrs",
      badge: "GLOBAL EXPOSURE",
      badgeColor: "bg-amber-50 text-amber-900 border-amber-200",
    },
  ];

  return (
    <section className="py-16 sm:py-20 border-b border-stone-200 bg-white tone-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-mono text-xs font-bold uppercase tracking-wider border border-emerald-200">
            <TrendingUp className="w-3.5 h-3.5" />
            CAREER BENCHMARK &amp; CTC TRANSPARENCY
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-serif font-bold text-stone-950 leading-[1.18]">
            What Entry-Level Healthcare Roles Actually Pay
          </h2>
          <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
            Most pharmacy and life science graduates settle for local ₹12,000/month jobs because their college never explained global CRO salaries. Here is the real 2026 entry-level compensation benchmark:
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {corporateRoles.map((role) => (
            <div
              key={role.title}
              className="p-6 sm:p-7 rounded-2xl border border-stone-200/90 bg-stone-50/60 hover:bg-white hover:border-[#1B3F8B]/40 hover:shadow-md transition-all space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className={`inline-block px-2.5 py-0.5 rounded-md font-mono text-[10px] font-extrabold tracking-wider uppercase border mb-2 ${role.badgeColor}`}>
                    {role.badge}
                  </span>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-950">
                    {role.title}
                  </h3>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-mono text-base sm:text-lg font-black text-[#1B3F8B] block">
                    {role.ctc}
                  </span>
                  <span className="font-sans text-[11px] text-stone-500 font-medium">
                    {role.monthly}
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-stone-200/80 text-xs text-stone-700 font-sans">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] font-bold text-stone-500 uppercase shrink-0">CORE TOOLS:</span>
                  <span className="font-semibold text-stone-900">{role.tools}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] font-bold text-emerald-700 uppercase shrink-0">3-YR TRAJECTORY:</span>
                  <span className="text-stone-700">{role.growth}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onSelectRole(role.title)}
                  className="w-full py-2.5 px-4 rounded-xl bg-white tone-light hover:bg-stone-100 border border-stone-300 text-stone-900 font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <span>Explore {role.title.split("(")[0].trim()} Roadmap in Workshop</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#1B3F8B]" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* The Reality Contrast Card */}
        <div className="rounded-2xl border border-stone-300 bg-gradient-to-r from-stone-100/90 to-stone-50 p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-rose-700 font-mono text-xs font-bold uppercase">
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>The Unprepared Graduate Trap</span>
              </div>
              <h4 className="font-serif text-lg font-bold text-stone-900">
                Local Chemist / Production Assistant: ₹12K – ₹16K/mo
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                Relying only on academic textbooks with zero enterprise tool knowledge leads to 12-hour shifts in retail pharmacies or quality control labs with minimal salary increments.
              </p>
            </div>

            <div className="space-y-3 md:border-l md:border-stone-300 md:pl-6">
              <div className="flex items-center gap-2 text-emerald-800 font-mono text-xs font-bold uppercase">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>The Corporate Healthcare Track</span>
              </div>
              <h4 className="font-serif text-lg font-bold text-stone-900">
                Global CRO / Drug Safety Specialist: ₹32K – ₹54K/mo
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                Candidates with practical software workflow skills (Oracle Argus, MedDRA, RAVE) enter Tier-1 MNCs with structured career progression and 5-day corporate workweeks.
              </p>
            </div>
          </div>
        </div>

        {/* Salary Data Source Citation (Transparent Research Footnote) */}
        <p className="text-[11px] text-stone-500 font-mono text-center pt-2">
          Source: AmbitionBox &amp; Glassdoor fresher PV, CDM &amp; Medical Coding reported salary data (India, 2024–2025). Range spans 0–1 year experience across global CROs &amp; IT-enabled healthcare services.
        </p>
      </div>
    </section>
  );
}
