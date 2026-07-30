import { createFileRoute, Link } from "@tanstack/react-router";
import { TIER_META, formatInr, type TierId } from "@/data/enrolmentTiers";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  Check,
  ChevronDown,
  ChevronUp,
  Building2,
  MessageCircle,
  BookOpen,
  Briefcase,
  Crown,
  Shield,
  Star,
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
          "Compare Essential, Career, and Elite workforce readiness tiers. Transparent pricing with zero hidden charges.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: EnrolIndex,
});

interface TierDetail {
  badge: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  icon: any;
  iconColor: string;
  targetAudience: string;
  cardBg: string;
  cardBorder: string;
  cardShadow: string;
  titleColor: string;
  audienceColor: string;
  feeLabelColor: string;
  priceColor: string;
  savingsBg: string;
  savingsText: string;
  priceBoxBg: string;
  priceBoxBorder: string;
  uniqueHookBg: string;
  uniqueHookBorder: string;
  uniqueHookText: string;
  deliverablesHeaderColor: string;
  itemTitleColor: string;
  itemDescColor: string;
  highlightedTitleColor: string;
  checkIconColor: string;
  btnBg: string;
  btnText: string;
  btnHover: string;
  btnShadow: string;
  uniqueHook: string;
  perksDetailed: { title: string; desc: string; highlighted?: boolean }[];
}

const TIER_DETAILS: Record<TierId, TierDetail> = {
  essential: {
    badge: "Self-Paced Core",
    badgeBg: "bg-slate-800/80",
    badgeText: "text-slate-200 font-semibold",
    badgeBorder: "border-slate-700",
    icon: BookOpen,
    iconColor: "text-slate-300",
    targetAudience: "Ideal for: Independent self-starters & working pros needing flexible hours",
    cardBg: "bg-[#0D1527]",
    cardBorder: "border-slate-800 hover:border-slate-700",
    cardShadow: "shadow-xl hover:shadow-2xl",
    titleColor: "text-white",
    audienceColor: "text-slate-300",
    feeLabelColor: "text-slate-400",
    priceColor: "text-white",
    savingsBg: "bg-slate-800",
    savingsText: "text-slate-200 border border-slate-700",
    priceBoxBg: "bg-[#111A30]",
    priceBoxBorder: "border-slate-800",
    uniqueHookBg: "bg-slate-800/50",
    uniqueHookBorder: "border-slate-700/80",
    uniqueHookText: "text-slate-200",
    deliverablesHeaderColor: "text-slate-400",
    itemTitleColor: "text-white",
    itemDescColor: "text-slate-300",
    highlightedTitleColor: "text-white",
    checkIconColor: "text-slate-400",
    btnBg: "bg-slate-800",
    btnText: "text-white",
    btnHover: "hover:bg-slate-700",
    btnShadow: "shadow-md hover:shadow-lg",
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
    badgeBg: "bg-amber-400/20",
    badgeText: "text-amber-300 font-bold",
    badgeBorder: "border-amber-400/40",
    icon: Star,
    iconColor: "text-amber-400",
    targetAudience:
      "Ideal for: Career Switchers & Freshers seeking active hiring partner placement",
    cardBg: "bg-[#0B132B]",
    cardBorder: "border-amber-400/80 ring-2 ring-amber-400/40",
    cardShadow: "shadow-[0_20px_50px_rgba(29,78,216,0.3)] scale-[1.02]",
    titleColor: "text-white",
    audienceColor: "text-slate-300",
    feeLabelColor: "text-amber-300/80",
    priceColor: "text-white",
    savingsBg: "bg-emerald-500/20",
    savingsText: "text-emerald-300 border border-emerald-400/40 font-bold",
    priceBoxBg: "bg-[#142247]",
    priceBoxBorder: "border-amber-400/40",
    uniqueHookBg: "bg-amber-500/15",
    uniqueHookBorder: "border-amber-400/40",
    uniqueHookText: "text-amber-200 font-semibold",
    deliverablesHeaderColor: "text-amber-300/80",
    itemTitleColor: "text-white",
    itemDescColor: "text-slate-300",
    highlightedTitleColor: "text-amber-300 font-bold",
    checkIconColor: "text-amber-400",
    btnBg: "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700",
    btnText: "text-white",
    btnHover: "hover:from-blue-500 hover:to-indigo-600",
    btnShadow: "shadow-xl shadow-blue-900/50",
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
    badgeBg: "bg-emerald-500/20",
    badgeText: "text-emerald-300 font-bold",
    badgeBorder: "border-emerald-400/40",
    icon: Crown,
    iconColor: "text-emerald-400",
    targetAudience:
      "Ideal for: High-Intent Candidates seeking fast-track executive hiring & 1:1 mentor",
    cardBg: "bg-[#041D17]",
    cardBorder: "border-emerald-500/70",
    cardShadow: "shadow-[0_20px_50px_rgba(16,185,129,0.2)]",
    titleColor: "text-white",
    audienceColor: "text-emerald-100/90",
    feeLabelColor: "text-emerald-300/80",
    priceColor: "text-white",
    savingsBg: "bg-emerald-500/20",
    savingsText: "text-emerald-300 border border-emerald-400/40 font-bold",
    priceBoxBg: "bg-[#0A2D24]",
    priceBoxBorder: "border-emerald-500/40",
    uniqueHookBg: "bg-emerald-500/15",
    uniqueHookBorder: "border-emerald-400/40",
    uniqueHookText: "text-emerald-200 font-semibold",
    deliverablesHeaderColor: "text-emerald-300/80",
    itemTitleColor: "text-white",
    itemDescColor: "text-emerald-100/80",
    highlightedTitleColor: "text-emerald-300 font-bold",
    checkIconColor: "text-emerald-400",
    btnBg: "bg-emerald-600",
    btnText: "text-white",
    btnHover: "hover:bg-emerald-500",
    btnShadow: "shadow-xl shadow-emerald-950/60",
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
    <div className="min-h-screen bg-[#070B19] text-white px-4 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1500px] space-y-10">
        <ResumeBanner />

        {/* Header & Editorial Headline */}
        <header className="space-y-4 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-300">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span>STEP 1 OF 3 · PROGRAMME TIER SELECTION</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
            Choose your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-200 to-amber-300">
              workforce readiness path
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Select the mentoring intensity and placement support tailored to your career goals. All
            fees are 100% transparent with zero hidden charges.
          </p>

          {/* Filter Pills for Quick Selection */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-2.5">
            <button
              type="button"
              onClick={() => setSelectedFilter("all")}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                selectedFilter === "all"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50"
                  : "bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10"
              }`}
            >
              All 3 Tiers
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter("essential")}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                selectedFilter === "essential"
                  ? "bg-slate-800 text-white shadow-md"
                  : "bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10"
              }`}
            >
              Self-Paced (Essential)
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter("career")}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                selectedFilter === "career"
                  ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-lg shadow-blue-900/50 ring-2 ring-blue-400"
                  : "bg-amber-500/15 text-amber-300 border border-amber-400/30 hover:bg-amber-500/25"
              }`}
            >
              ⭐ Live Cohort + Placements (Career)
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter("elite")}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                selectedFilter === "elite"
                  ? "bg-emerald-600 text-white shadow-lg ring-2 ring-emerald-400"
                  : "bg-emerald-500/15 text-emerald-300 border border-emerald-400/30 hover:bg-emerald-500/25"
              }`}
            >
              👑 1:1 Concierge (Elite)
            </button>
          </div>
        </header>

        {/* Tier Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch">
          {(Object.keys(TIER_META) as TierId[]).map((id) => {
            const t = TIER_META[id];
            const d = TIER_DETAILS[id];
            const Icon = d.icon;
            const isDimmed = selectedFilter !== "all" && selectedFilter !== id;

            return (
              <div
                key={id}
                className={`relative flex flex-col justify-between rounded-3xl border p-6 sm:p-8 transition-all duration-300 ${
                  d.cardBg
                } ${d.cardBorder} ${d.cardShadow} ${
                  isDimmed ? "opacity-35 grayscale-[50%]" : "opacity-100"
                }`}
              >
                <div>
                  {/* Top Floating Badge */}
                  <div className="mb-5 flex items-center justify-between gap-2">
                    <span
                      className={`inline-block rounded-full px-3.5 py-1 text-[11px] font-mono uppercase tracking-wider border ${d.badgeBg} ${d.badgeText} ${d.badgeBorder}`}
                    >
                      {d.badge}
                    </span>
                    <Icon className={`h-5 w-5 ${d.iconColor}`} />
                  </div>

                  {/* Tier Title & Audience Pill */}
                  <div className="space-y-2">
                    <h2 className={`font-serif text-3xl sm:text-4xl font-bold ${d.titleColor}`}>
                      {t.name}
                    </h2>
                    <p className={`text-xs ${d.audienceColor} leading-relaxed min-h-[36px]`}>
                      {d.targetAudience}
                    </p>
                  </div>

                  {/* Pricing Display Box */}
                  <div
                    className={`mt-6 rounded-2xl border p-5 space-y-2.5 ${d.priceBoxBg} ${d.priceBoxBorder}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-[11px] font-mono uppercase tracking-wider ${d.feeLabelColor}`}
                      >
                        Total Programme Fee
                      </span>
                      {t.savingsInr > 0 && (
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${d.savingsBg} ${d.savingsText}`}
                        >
                          Save {formatInr(t.savingsInr)}
                        </span>
                      )}
                    </div>
                    <div className="overflow-hidden">
                      <span
                        className={`font-serif text-3xl sm:text-4xl lg:text-3xl xl:text-4xl font-bold tabular-nums tracking-tight whitespace-nowrap block ${d.priceColor}`}
                      >
                        {formatInr(t.mrpInr)}
                      </span>
                    </div>
                  </div>

                  {/* Unique Hook Banner */}
                  <div
                    className={`mt-4 rounded-xl border p-3 text-xs flex items-center gap-2.5 ${d.uniqueHookBg} ${d.uniqueHookBorder} ${d.uniqueHookText}`}
                  >
                    <Zap className="h-4 w-4 shrink-0 text-amber-400" />
                    <span className="leading-snug">{d.uniqueHook}</span>
                  </div>

                  {/* Detailed Included Features */}
                  <div className="mt-6 space-y-3">
                    <p
                      className={`text-[11px] font-mono uppercase tracking-wider font-semibold ${d.deliverablesHeaderColor}`}
                    >
                      Included Deliverables
                    </p>
                    <ul className="space-y-3.5 text-xs">
                      {d.perksDetailed.map((p, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${d.checkIconColor}`} />
                          <div>
                            <p
                              className={p.highlighted ? d.highlightedTitleColor : d.itemTitleColor}
                            >
                              {p.title}
                            </p>
                            <p className={`text-[11px] mt-0.5 leading-relaxed ${d.itemDescColor}`}>
                              {p.desc}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Primary CTA */}
                <div className="mt-8 pt-5 border-t border-white/10">
                  <Link
                    to="/enrol/$tier"
                    params={{ tier: id }}
                    style={{ color: "#FFFFFF" }}
                    className={`flex items-center justify-center gap-2 rounded-2xl text-sm font-bold h-13 px-5 w-full transition-all duration-200 ${d.btnBg} ${d.btnText} ${d.btnHover} ${d.btnShadow}`}
                  >
                    <span>Select {t.name} Tier</span>
                    <ArrowRight className="h-4 w-4 text-white" />
                  </Link>
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
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-xs font-bold text-slate-800 hover:bg-slate-50 transition-all shadow-md"
          >
            <span>
              {showMatrix ? "Hide Feature Matrix" : "Inspect Detailed Feature Comparison Matrix"}
            </span>
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
                Compare technical deliverables, mentorship allocation, and placement guarantees
                across all paths.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="py-3 px-4 font-mono uppercase text-slate-500 w-1/3">Feature</th>
                    <th className="py-3 px-4 font-serif text-sm font-bold text-slate-900 w-1/5 text-center">
                      Essential
                    </th>
                    <th className="py-3 px-4 font-serif text-sm font-bold text-blue-900 w-1/5 text-center bg-blue-50/50">
                      Career ⭐
                    </th>
                    <th className="py-3 px-4 font-serif text-sm font-bold text-emerald-900 w-1/5 text-center bg-emerald-50/50">
                      Elite 👑
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {MATRIX_FEATURES.map((cat, cIdx) => (
                    <>
                      <tr
                        key={`cat-${cIdx}`}
                        className="bg-slate-100/70 font-semibold text-slate-800"
                      >
                        <td
                          colSpan={4}
                          className="py-2.5 px-4 font-mono text-[11px] uppercase tracking-wider text-slate-600"
                        >
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
                                <span className="text-slate-300">-</span>
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
                                <span className="text-slate-300">-</span>
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
                                <span className="text-slate-300">-</span>
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
              Need help selecting between{" "}
              <span className="italic text-amber-300">Career & Elite</span>?
            </h3>
            <p className="text-xs text-slate-300 max-w-xl">
              Talk directly with an academic counsellor to evaluate your prior experience and target
              hiring role before locking your seat.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
            <Link
              to="/apply"
              style={{ color: "#0F172A" }}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white hover:bg-slate-100 px-5 text-xs font-bold text-slate-950 transition-colors shadow-md cursor-pointer"
            >
              <span style={{ color: "#0F172A" }}>Take 3-Min Fit Test</span>
              <ArrowRight className="h-4 w-4 text-slate-950" />
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
