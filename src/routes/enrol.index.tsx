import { createFileRoute, Link } from "@tanstack/react-router";
import { TIER_META, formatInr, type TierId } from "@/data/enrolmentTiers";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Zap,
  Award,
  Check,
  ChevronDown,
  ChevronUp,
  Building2,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";
import { ResumeBanner } from "@/components/enrol/ResumeBanner";

export const Route = createFileRoute("/enrol/")({
  head: () => ({
    meta: [
      { title: "Select Workforce Readiness Tier · Arzon Global" },
      {
        name: "description",
        content:
          "Compare Essential, Career, and Elite workforce readiness tiers. Transparent pricing, zero hidden loan traps, ₹999 seat lock token.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: EnrolIndex,
});

const TIER_DETAILS: Record<
  TierId,
  {
    badge: string;
    badgeStyle: string;
    targetAudience: string;
    cardBg: string;
    borderColor: string;
    textColor: string;
    subTextColor: string;
    priceBoxBg: string;
    priceBoxBorder: string;
    btnStyle: string;
    uniqueHook: string;
    perksDetailed: { title: string; desc: string; highlighted?: boolean }[];
  }
> = {
  essential: {
    badge: "Self-Paced Core",
    badgeStyle: "bg-slate-200/80 text-slate-800 border-slate-300",
    targetAudience: "Ideal for: Independent self-starters & working pros needing flexible hours",
    cardBg: "bg-white",
    borderColor: "border-slate-200 hover:border-slate-300 shadow-sm",
    textColor: "text-slate-900",
    subTextColor: "text-slate-600",
    priceBoxBg: "bg-slate-50",
    priceBoxBorder: "border-slate-200",
    btnStyle:
      "bg-slate-900 text-white hover:bg-slate-800 shadow-md hover:shadow-lg focus:ring-slate-900",
    uniqueHook: "12-Month Unlimited Access to Self-Paced Video Modules & Codebook Labs",
    perksDetailed: [
      {
        title: "8-Week Video Curriculum",
        desc: "Full ICD-10-CM, CPT, E/M, and modifier modules recorded by industry leads.",
      },
      {
        title: "Course Completion Certificate",
        desc: "ISO 9001 certified completion credential with verifiable QR code.",
      },
      {
        title: "Community Cohort Group",
        desc: "Access to peer study rooms and weekly coding practice channels.",
      },
      {
        title: "Codebook Reference Labs",
        desc: "Interactive practice exercises with instant solution keys.",
      },
    ],
  },
  career: {
    badge: "⭐ MOST POPULAR · 87% ENROL HERE",
    badgeStyle: "bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold shadow-md",
    targetAudience: "Ideal for: Career Switchers & Freshers seeking active hiring partner placement",
    cardBg: "bg-gradient-to-b from-[#0F1B3D] via-[#14234C] to-[#0A122A]",
    borderColor: "border-amber-400/60 ring-2 ring-amber-400/40 shadow-2xl scale-[1.02]",
    textColor: "text-white",
    subTextColor: "text-slate-200/90",
    priceBoxBg: "bg-white/10 backdrop-blur-md",
    priceBoxBorder: "border-amber-400/30",
    btnStyle:
      "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white hover:from-blue-500 hover:to-indigo-600 shadow-xl shadow-blue-900/40 focus:ring-blue-400",
    uniqueHook: "⚡ Direct Placement Access to 120+ Hiring Partners (Optum, Omega, Access)",
    perksDetailed: [
      {
        title: "Everything in Essential Tier",
        desc: "Full video curriculum + codebook reference labs included.",
      },
      {
        title: "Live Mentor Sessions (8 Weeks)",
        desc: "Interactive live classes led by Senior PV & Medical Coding Managers.",
        highlighted: true,
      },
      {
        title: "Real-Data Capstones (Optum/Omega JDs)",
        desc: "Work on live anonymized medical charts and safety reports.",
        highlighted: true,
      },
      {
        title: "Job Placement Support & 1:1 Mocks",
        desc: "Resume teardown, LinkedIn overhaul, and dedicated TPO referral.",
        highlighted: true,
      },
    ],
  },
  elite: {
    badge: "👑 DIRECT RECRUITER SLA · INTERVIEW GUARANTEE",
    badgeStyle:
      "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 font-bold shadow-sm",
    targetAudience:
      "Ideal for: High-Intent Candidates seeking fast-track executive hiring & 1:1 mentor",
    cardBg: "bg-gradient-to-b from-[#061A14] via-[#0A2920] to-[#04120E]",
    borderColor: "border-emerald-500/50 hover:border-emerald-400 shadow-xl",
    textColor: "text-white",
    subTextColor: "text-emerald-100/80",
    priceBoxBg: "bg-emerald-950/40 backdrop-blur-md",
    priceBoxBorder: "border-emerald-500/30",
    btnStyle:
      "bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-950/50 focus:ring-emerald-400",
    uniqueHook: "🛡️ Dedicated 1:1 Senior Mentor + 3 Guaranteed Hiring Manager Interviews",
    perksDetailed: [
      {
        title: "Everything in Career Tier",
        desc: "Live cohort + real-data capstones + placement support included.",
      },
      {
        title: "1:1 Dedicated Mentor Pairing (Weekly)",
        desc: "Weekly 45-min 1:1 coaching with a Senior Domain Specialist.",
        highlighted: true,
      },
      {
        title: "3 Guaranteed Recruiter Interviews",
        desc: "Direct interview scheduling with top healthcare hiring partners.",
        highlighted: true,
      },
      {
        title: "Expert Resume & LinkedIn Rewrite",
        desc: "Custom ATS resume optimization crafted by certified recruiters.",
        highlighted: true,
      },
    ],
  },
};

const MATRIX_FEATURES = [
  {
    category: "Curriculum & Learning Mode",
    items: [
      {
        feature: "Full Curriculum (ICD-10-CM / CPT / PV)",
        essential: "Recorded",
        career: "Live + Recorded",
        elite: "Live + 1:1 Dedicated",
      },
      {
        feature: "Live Mentor Classes (8 Weeks)",
        essential: false,
        career: true,
        elite: true,
      },
      {
        feature: "Real-Data Capstone Projects",
        essential: "Basic Labs",
        career: "Optum/Omega JDs",
        elite: "Custom Industry Case",
      },
    ],
  },
  {
    category: "Career & Placement Infrastructure",
    items: [
      {
        feature: "Job Placement Portal Access",
        essential: "Standard",
        career: "Priority TPO",
        elite: "VIP Fast-Track",
      },
      {
        feature: "Mock Technical Interviews",
        essential: "Peer Mocks",
        career: "3 Live Mocks",
        elite: "Unlimited AI + 5 Live Mocks",
      },
      {
        feature: "Guaranteed Hiring Partner Interviews",
        essential: false,
        career: "Direct Referral",
        elite: "3 Guaranteed Interviews",
      },
      {
        feature: "Dedicated 1:1 Mentor Pairing",
        essential: false,
        career: false,
        elite: "Weekly 1:1 Sessions",
      },
    ],
  },
];

function EnrolIndex() {
  const [selectedFilter, setSelectedFilter] = useState<"all" | TierId>("all");
  const [showMatrix, setShowMatrix] = useState(false);

  return (
    <div className="min-h-screen editorial-page-bg px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-10">
        <ResumeBanner />

        {/* Header & Editorial Headline */}
        <header className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-800">
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            <span>STEP 1 OF 3 · PROGRAMME TIER SELECTION</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#151C2E] tracking-tight leading-tight">
            Choose your <span className="italic text-[#8A6D1F]">workforce readiness path</span>
          </h1>
          <p className="text-sm sm:text-base text-[#5B6472] leading-relaxed">
            Select the mentoring intensity and placement support tailored to your career goals.
            All fees are 100% transparent — reserve your seat with a refundable ₹999 token.
          </p>

          {/* Filter Pills for Quick Selection */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedFilter("all")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedFilter === "all"
                  ? "bg-[#151C2E] text-white shadow-md"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              All 3 Tiers
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter("essential")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedFilter === "essential"
                  ? "bg-slate-800 text-white shadow-md"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              Self-Paced (Essential)
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter("career")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedFilter === "career"
                  ? "bg-blue-600 text-white shadow-md ring-2 ring-blue-300"
                  : "bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100"
              }`}
            >
              ⭐ Live Cohort + Placements (Career)
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter("elite")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedFilter === "elite"
                  ? "bg-emerald-700 text-white shadow-md ring-2 ring-emerald-300"
                  : "bg-emerald-50 text-emerald-900 border border-emerald-300 hover:bg-emerald-100"
              }`}
            >
              👑 1:1 Concierge (Elite)
            </button>
          </div>
        </header>

        {/* Tier Cards Grid */}
        <div className="grid gap-8 lg:grid-cols-3 items-stretch">
          {(Object.keys(TIER_META) as TierId[]).map((id) => {
            const t = TIER_META[id];
            const d = TIER_DETAILS[id];
            const isDimmed = selectedFilter !== "all" && selectedFilter !== id;
            const isFeatured = id === "career";

            return (
              <div
                key={id}
                className={`relative flex flex-col justify-between rounded-3xl border p-6 sm:p-8 transition-all duration-300 ${
                  d.cardBg
                } ${d.borderColor} ${isDimmed ? "opacity-40 grayscale-[40%]" : "opacity-100"}`}
              >
                <div>
                  {/* Top Floating Badge */}
                  <div className="mb-4">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-[11px] font-mono uppercase tracking-wider ${d.badgeStyle}`}
                    >
                      {d.badge}
                    </span>
                  </div>

                  {/* Tier Title & Audience Pill */}
                  <div className="space-y-2">
                    <h2 className={`font-serif text-3xl font-bold ${d.textColor}`}>{t.name}</h2>
                    <p className={`text-xs ${d.subTextColor} leading-relaxed min-h-[36px]`}>
                      {d.targetAudience}
                    </p>
                  </div>

                  {/* Pricing Display Box */}
                  <div className={`mt-6 rounded-2xl border p-5 space-y-3 ${d.priceBoxBg} ${d.priceBoxBorder}`}>
                    <div className="flex items-baseline justify-between gap-2">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                          Total Programme Fee
                        </span>
                        <span className={`font-serif text-3xl sm:text-4xl font-bold tabular-nums ${d.textColor}`}>
                          {formatInr(t.mrpInr)}
                        </span>
                      </div>
                      {t.savingsInr > 0 && (
                        <span className="rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs font-semibold text-emerald-400 border border-emerald-400/30">
                          Save {formatInr(t.savingsInr)}
                        </span>
                      )}
                    </div>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2 text-xs">
                      <span className="inline-flex items-center gap-1.5 text-slate-300 font-medium">
                        <Clock className="h-3.5 w-3.5 text-amber-400" />
                        <span>Seat Lock Token:</span>
                      </span>
                      <span className="font-mono font-bold text-white bg-white/10 px-2.5 py-1 rounded-lg border border-white/15">
                        ₹999 Refundable
                      </span>
                    </div>
                  </div>

                  {/* Unique Hook Banner */}
                  <div className="mt-4 rounded-xl bg-white/5 border border-white/10 p-3 text-xs flex items-center gap-2 text-slate-200">
                    <Zap className="h-4 w-4 shrink-0 text-amber-400" />
                    <span className="font-medium leading-snug">{d.uniqueHook}</span>
                  </div>

                  {/* Detailed Included Features */}
                  <div className="mt-6 space-y-3">
                    <p className={`text-[11px] font-mono uppercase tracking-wider ${d.subTextColor}`}>
                      Included Deliverables
                    </p>
                    <ul className="space-y-3 text-xs">
                      {d.perksDetailed.map((p, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2
                            className={`mt-0.5 h-4 w-4 shrink-0 ${
                              id === "elite"
                                ? "text-emerald-400"
                                : isFeatured
                                ? "text-amber-400"
                                : "text-slate-700"
                            }`}
                          />
                          <div>
                            <p className={`font-semibold ${p.highlighted ? "text-amber-300" : d.textColor}`}>
                              {p.title}
                            </p>
                            <p className={`text-[11px] mt-0.5 ${d.subTextColor}`}>{p.desc}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Primary CTA */}
                <div className="mt-8 pt-4 border-t border-white/10">
                  <Link
                    to="/enrol/$tier"
                    params={{ tier: id }}
                    className={`flex items-center justify-center gap-2 rounded-xl text-sm font-bold h-12 px-5 w-full transition-all duration-200 ${d.btnStyle}`}
                  >
                    <span>Select {t.name} Tier</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <p className="mt-2 text-center text-[10px] text-slate-400 font-mono">
                    ₹999 Seat Lock · Balance due before cohort
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Comparison Matrix Toggle */}
        <div className="text-center pt-4">
          <button
            type="button"
            onClick={() => setShowMatrix(!showMatrix)}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 transition-all shadow-sm"
          >
            <span>{showMatrix ? "Hide Feature Matrix" : "Inspect Detailed Feature Comparison Matrix"}</span>
            {showMatrix ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>

        {/* Expandable Feature Comparison Table */}
        {showMatrix && (
          <div className="editorial-card p-6 sm:p-8 space-y-6 motion-safe:animate-fade-in">
            <div className="text-center space-y-1">
              <h3 className="font-serif text-2xl font-bold text-[#151C2E]">
                Line-by-Line Feature Comparison
              </h3>
              <p className="text-xs text-[#5B6472]">
                Compare technical deliverables, mentorship allocation, and placement guarantees across all paths.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="py-3 px-4 font-mono uppercase text-slate-500 w-1/3">Feature</th>
                    <th className="py-3 px-4 font-serif text-sm font-bold text-slate-900 w-1/5 text-center">Essential</th>
                    <th className="py-3 px-4 font-serif text-sm font-bold text-blue-900 w-1/5 text-center bg-blue-50/50">Career ⭐</th>
                    <th className="py-3 px-4 font-serif text-sm font-bold text-emerald-900 w-1/5 text-center bg-emerald-50/50">Elite 👑</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {MATRIX_FEATURES.map((cat, cIdx) => (
                    <>
                      <tr key={`cat-${cIdx}`} className="bg-slate-100/70 font-semibold text-slate-800">
                        <td colSpan={4} className="py-2.5 px-4 font-mono text-[11px] uppercase tracking-wider text-slate-600">
                          {cat.category}
                        </td>
                      </tr>
                      {cat.items.map((item, iIdx) => (
                        <tr key={`item-${iIdx}`} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-4 font-medium text-slate-900">{item.feature}</td>
                          <td className="py-3 px-4 text-center text-slate-600">
                            {typeof item.essential === "boolean" ? (
                              item.essential ? (
                                <Check className="h-4 w-4 text-emerald-600 mx-auto" />
                              ) : (
                                <span className="text-slate-300">—</span>
                              )
                            ) : (
                              item.essential
                            )}
                          </td>
                          <td className="py-3 px-4 text-center font-semibold text-blue-900 bg-blue-50/30">
                            {typeof item.career === "boolean" ? (
                              item.career ? (
                                <Check className="h-4 w-4 text-blue-600 mx-auto" />
                              ) : (
                                <span className="text-slate-300">—</span>
                              )
                            ) : (
                              item.career
                            )}
                          </td>
                          <td className="py-3 px-4 text-center font-semibold text-emerald-900 bg-emerald-50/30">
                            {typeof item.elite === "boolean" ? (
                              item.elite ? (
                                <Check className="h-4 w-4 text-emerald-600 mx-auto" />
                              ) : (
                                <span className="text-slate-300">—</span>
                              )
                            ) : (
                              item.elite
                            )}
                          </td>
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Admissions Assistance & WhatsApp Concierge Banner */}
        <div className="editorial-card p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider">
              <Building2 className="h-4 w-4" />
              <span>Direct Admissions Concierge</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
              Need help selecting between <span className="italic text-amber-300">Career & Elite</span>?
            </h3>
            <p className="text-xs text-slate-300 max-w-xl">
              Talk directly with an academic counsellor to evaluate your prior experience and target hiring role before locking your seat.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
            <Link
              to="/apply"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white hover:bg-slate-100 px-5 text-xs font-bold text-slate-900 transition-colors shadow-md"
            >
              <span>Take 3-Min Fit Test</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="https://wa.me/919999999999?text=Hi%2C%20I'd%20like%20guidance%20on%20selecting%20an%20Arzon%20Global%20programme%20tier."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/20 hover:bg-emerald-500/30 px-5 text-xs font-bold text-emerald-300 transition-colors"
            >
              <MessageCircle className="h-4 w-4 text-emerald-400" />
              <span>WhatsApp Counsellor</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

