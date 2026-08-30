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
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { PremiumChip } from "@/components/ui/PremiumChip";
import { COUNSELLOR_PHONE } from "@/components/landing/constants";

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
    badgeBg: "bg-stone-100",
    badgeText: "text-stone-800 font-bold",
    badgeBorder: "border-stone-200",
    icon: BookOpen,
    iconColor: "text-stone-600",
    targetAudience: "Ideal for: Independent self-starters & working pros needing flexible hours",
    cardBg: "bg-white",
    cardBorder: "border-stone-200 hover:border-stone-300",
    cardShadow: "shadow-xs hover:shadow-md",
    titleColor: "text-[#1A1A1A]",
    audienceColor: "text-stone-600",
    feeLabelColor: "text-stone-500",
    priceColor: "text-[#1A1A1A]",
    savingsBg: "bg-stone-100",
    savingsText: "text-stone-800 border border-stone-200",
    priceBoxBg: "bg-stone-50",
    priceBoxBorder: "border-stone-200",
    uniqueHookBg: "bg-stone-100/60",
    uniqueHookBorder: "border-stone-200",
    uniqueHookText: "text-stone-700",
    deliverablesHeaderColor: "text-stone-500",
    itemTitleColor: "text-[#1A1A1A]",
    itemDescColor: "text-stone-600",
    highlightedTitleColor: "text-[#1A1A1A] font-bold",
    checkIconColor: "text-stone-500",
    btnBg: "bg-stone-900",
    btnText: "text-white",
    btnHover: "hover:bg-stone-800",
    btnShadow: "shadow-xs",
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
    badgeBg: "bg-sky-100",
    badgeText: "text-[#1B3F8B] font-bold",
    badgeBorder: "border-sky-200",
    icon: Star,
    iconColor: "text-[#1B3F8B]",
    targetAudience:
      "Ideal for: Career Switchers & Freshers seeking active hiring partner placement",
    cardBg: "bg-white",
    cardBorder: "border-2 border-[#1B3F8B] ring-4 ring-[#1B3F8B]/10",
    cardShadow: "shadow-md scale-[1.01]",
    titleColor: "text-[#1A1A1A]",
    audienceColor: "text-stone-600",
    feeLabelColor: "text-stone-500",
    priceColor: "text-[#1B3F8B]",
    savingsBg: "bg-emerald-100",
    savingsText: "text-emerald-800 border border-emerald-200 font-bold",
    priceBoxBg: "bg-sky-50/60",
    priceBoxBorder: "border-sky-200",
    uniqueHookBg: "bg-sky-50",
    uniqueHookBorder: "border-sky-200",
    uniqueHookText: "text-[#1B3F8B] font-semibold",
    deliverablesHeaderColor: "text-stone-500",
    itemTitleColor: "text-[#1A1A1A]",
    itemDescColor: "text-stone-600",
    highlightedTitleColor: "text-[#1B3F8B] font-bold",
    checkIconColor: "text-[#1B3F8B]",
    btnBg: "bg-[#1B3F8B]",
    btnText: "text-white",
    btnHover: "hover:bg-[#153270]",
    btnShadow: "shadow-md shadow-[#1B3F8B]/25",
    uniqueHook: "⚡ Direct Placement Access to 120+ Hiring Partners (Tier-1 Tech Enterprises & GCCs)",
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
    badgeBg: "bg-emerald-100",
    badgeText: "text-emerald-900 font-bold",
    badgeBorder: "border-emerald-200",
    icon: Crown,
    iconColor: "text-emerald-700",
    targetAudience:
      "Ideal for: High-Intent Candidates seeking fast-track executive hiring & 1:1 mentor",
    cardBg: "bg-white",
    cardBorder: "border-2 border-emerald-600 ring-4 ring-emerald-600/10",
    cardShadow: "shadow-md",
    titleColor: "text-[#1A1A1A]",
    audienceColor: "text-stone-600",
    feeLabelColor: "text-stone-500",
    priceColor: "text-emerald-800",
    savingsBg: "bg-emerald-100",
    savingsText: "text-emerald-900 border border-emerald-200 font-bold",
    priceBoxBg: "bg-emerald-50/60",
    priceBoxBorder: "border-emerald-200",
    uniqueHookBg: "bg-emerald-50",
    uniqueHookBorder: "border-emerald-200",
    uniqueHookText: "text-emerald-900 font-semibold",
    deliverablesHeaderColor: "text-stone-500",
    itemTitleColor: "text-[#1A1A1A]",
    itemDescColor: "text-stone-600",
    highlightedTitleColor: "text-emerald-900 font-bold",
    checkIconColor: "text-emerald-600",
    btnBg: "bg-emerald-600",
    btnText: "text-white",
    btnHover: "hover:bg-emerald-700",
    btnShadow: "shadow-md shadow-emerald-900/20",
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
        feature: "Full Curriculum (ICD-10, CPT, E/M, Modifiers)",
        essential: true,
        career: true,
        elite: true,
      },
      {
        feature: "Live Instructor-Led Masterclasses",
        essential: false,
        career: "8 Weeks Live",
        elite: "8 Weeks Live + 1:1",
      },
      {
        feature: "Access Duration to LMS & Labs",
        essential: "12 Months",
        career: "Lifetime",
        elite: "Lifetime + VIP",
      },
    ],
  },
  {
    category: "Practical Experience & Tools",
    items: [
      {
        feature: "Industry Real-Data Capstones (Optum / Omega style)",
        essential: false,
        career: "2 Guided Capstones",
        elite: "4 Capstones + Review",
      },
      {
        feature: "EHR / Encoder Practice Tool Sandbox",
        essential: "Standard Sandbox",
        career: "Enterprise Access",
        elite: "Enterprise VIP Access",
      },
      {
        feature: "ASSAY Readiness Score Card",
        essential: "Self-Test",
        career: "Formal Evaluation",
        elite: "Senior Review + Certification",
      },
    ],
  },
  {
    category: "Career & Recruiter Placement SLA",
    items: [
      {
        feature: "ATS Resume & Portfolio Review",
        essential: "Template Pack",
        career: "1:1 Review Loop",
        elite: "Done-For-You Rewrite",
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
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] font-sans antialiased">
      <Nav />
      <div className="mx-auto max-w-[1400px] px-4 pt-28 sm:pt-36 pb-20 sm:px-8 space-y-10">
        <ResumeBanner />

        {/* Header & Editorial Headline */}
        <header className="space-y-4 text-center max-w-4xl mx-auto">
          <div className="inline-flex justify-center">
            <PremiumChip variant="navy" size="md">
              STEP 1 OF 3 · PROGRAMME TIER SELECTION
            </PremiumChip>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight leading-tight">
            Choose your{" "}
            <span className="text-[#1B3F8B] italic font-normal">
              workforce readiness path
            </span>
          </h1>
          <p className="text-base text-stone-700 leading-relaxed max-w-2xl mx-auto font-sans">
            Select the mentoring intensity and placement support tailored to your career goals. All
            fees are 100% transparent with zero hidden charges.
          </p>

          {/* Filter Pills for Quick Selection */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5">
            <button
              type="button"
              onClick={() => setSelectedFilter("all")}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedFilter === "all"
                  ? "bg-[#1B3F8B] text-white shadow-xs"
                  : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-50"
              }`}
            >
              All 3 Tiers
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter("essential")}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedFilter === "essential"
                  ? "bg-stone-900 text-white shadow-xs"
                  : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-50"
              }`}
            >
              Self-Paced (Essential)
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter("career")}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedFilter === "career"
                  ? "bg-[#1B3F8B] text-white shadow-xs"
                  : "bg-sky-50 text-[#1B3F8B] border border-sky-200 hover:bg-sky-100/60"
              }`}
            >
              ⭐ Live Cohort + Placements (Career)
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter("elite")}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedFilter === "elite"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-emerald-50 text-emerald-900 border border-emerald-200 hover:bg-emerald-100/60"
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
                className={`relative flex flex-col justify-between rounded-2xl border p-6 sm:p-8 transition-all duration-300 ${
                  d.cardBg
                } ${d.cardBorder} ${d.cardShadow} ${
                  isDimmed ? "opacity-35 grayscale-[50%]" : "opacity-100"
                }`}
              >
                <div>
                  {/* Top Badge & Tier Header */}
                  <div className="flex items-center justify-between gap-2 pb-4">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider ${d.badgeBg} ${d.badgeText} border ${d.badgeBorder}`}
                    >
                      {d.badge}
                    </span>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-stone-100 border border-stone-200">
                      <Icon className={`h-5 w-5 ${d.iconColor}`} />
                    </div>
                  </div>

                  <h3 className={`font-serif text-2xl sm:text-3xl font-bold ${d.titleColor}`}>
                    {t.name}
                  </h3>
                  <p className={`mt-2 text-xs leading-relaxed font-sans ${d.audienceColor}`}>
                    {d.targetAudience}
                  </p>

                  {/* Unique Hook Banner */}
                  <div
                    className={`mt-4 rounded-xl border p-3 text-xs leading-snug font-sans ${d.uniqueHookBg} ${d.uniqueHookBorder} ${d.uniqueHookText}`}
                  >
                    {d.uniqueHook}
                  </div>

                  {/* Price Box */}
                  <div className={`mt-5 rounded-2xl border p-5 ${d.priceBoxBg} ${d.priceBoxBorder}`}>
                    <span
                      className={`font-mono text-[11px] font-bold uppercase tracking-wider ${d.feeLabelColor}`}
                    >
                      Tuition Fee
                    </span>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className={`font-serif text-3xl sm:text-4xl font-bold ${d.priceColor}`}>
                        {formatInr(t.offerPriceInr)}
                      </span>
                      {t.mrpInr && t.mrpInr > t.offerPriceInr && (
                        <span className="text-xs text-stone-400 line-through font-mono">
                          {formatInr(t.mrpInr)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Key Perks List */}
                  <div className="mt-6 space-y-3.5">
                    <p
                      className={`font-mono text-[11px] font-bold uppercase tracking-wider ${d.deliverablesHeaderColor}`}
                    >
                      Included Deliverables:
                    </p>
                    {d.perksDetailed.map((p, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs leading-relaxed font-sans">
                        <Check className={`h-4 w-4 shrink-0 mt-0.5 ${d.checkIconColor}`} />
                        <div>
                          <p
                            className={
                              p.highlighted ? d.highlightedTitleColor : `${d.itemTitleColor} font-semibold`
                            }
                          >
                            {p.title}
                          </p>
                          <p className={`text-stone-600 text-[11px] mt-0.5`}>{p.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Bottom CTA */}
                <div className="pt-8">
                  <Link
                    to="/enrol/$tier"
                    params={{ tier: id }}
                    className={`flex h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${d.btnBg} ${d.btnText} ${d.btnHover} ${d.btnShadow}`}
                  >
                    <span>Proceed to Verification</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Comparison Matrix Drawer */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => setShowMatrix(!showMatrix)}
            className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 px-6 py-3 text-xs font-bold text-stone-800 shadow-2xs transition-colors cursor-pointer"
          >
            <span>{showMatrix ? "Hide Feature Matrix" : "View Full Comparison Matrix"}</span>
            {showMatrix ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>

        {/* Full Comparison Matrix */}
        {showMatrix && (
          <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
            <div className="text-center space-y-1">
              <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">
                Line-by-Line Feature Comparison
              </h3>
              <p className="text-xs text-stone-600 font-sans">
                Compare technical deliverables, mentorship allocation, and placement guarantees
                across all paths.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse font-sans">
                <thead>
                  <tr className="border-b border-stone-200 bg-stone-50 font-mono text-stone-600">
                    <th className="py-3 px-4 uppercase w-1/3 font-bold">Feature</th>
                    <th className="py-3 px-4 font-serif text-sm font-bold text-[#1A1A1A] w-1/5 text-center">
                      Essential
                    </th>
                    <th className="py-3 px-4 font-serif text-sm font-bold text-[#1B3F8B] w-1/5 text-center bg-sky-50/50">
                      Career ⭐
                    </th>
                    <th className="py-3 px-4 font-serif text-sm font-bold text-emerald-900 w-1/5 text-center bg-emerald-50/50">
                      Elite 👑
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {MATRIX_FEATURES.map((cat, cIdx) => (
                    <>
                      <tr
                        key={`cat-${cIdx}`}
                        className="bg-stone-50 font-semibold text-stone-800"
                      >
                        <td
                          colSpan={4}
                          className="py-2.5 px-4 font-mono text-[11px] uppercase tracking-wider text-stone-600 font-bold"
                        >
                          {cat.category}
                        </td>
                      </tr>
                      {cat.items.map((item, iIdx) => (
                        <tr key={`item-${iIdx}`} className="hover:bg-stone-50 transition-colors">
                          <td className="py-3 px-4 font-medium text-stone-900">{item.feature}</td>
                          <td className="py-3 px-4 text-center text-stone-600">
                            {typeof item.essential === "boolean" ? (
                              item.essential ? (
                                <Check className="h-4 w-4 text-emerald-600 mx-auto" />
                              ) : (
                                <span className="text-stone-300">-</span>
                              )
                            ) : (
                              item.essential
                            )}
                          </td>
                          <td className="py-3 px-4 text-center font-semibold text-[#1B3F8B] bg-sky-50/30">
                            {typeof item.career === "boolean" ? (
                              item.career ? (
                                <Check className="h-4 w-4 text-[#1B3F8B] mx-auto" />
                              ) : (
                                <span className="text-stone-300">-</span>
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
                                <span className="text-stone-300">-</span>
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
        <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 text-[#8A6D1F] text-xs font-mono font-bold uppercase tracking-wider">
              <Building2 className="h-4 w-4" />
              <span>Direct Admissions Concierge</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1A1A]">
              Need help selecting between{" "}
              <span className="italic text-[#1B3F8B]">Career &amp; Elite</span>?
            </h3>
            <p className="text-xs text-stone-600 max-w-xl font-sans">
              Talk directly with an academic counsellor to evaluate your prior experience and target
              hiring role before locking your seat.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
            <Link
              to="/apply"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] px-5 text-xs font-bold text-white transition-colors shadow-xs cursor-pointer"
            >
              <span>Take 3-Min Fit Test</span>
              <ArrowRight className="h-4 w-4 text-white" />
            </Link>
            <a
              href={`https://wa.me/${COUNSELLOR_PHONE}?text=Hi%2C%20I'd%20like%20guidance%20on%20selecting%20an%20Arzon%20Global%20programme%20tier.`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 px-5 text-xs font-bold text-emerald-800 transition-colors"
            >
              <MessageCircle className="h-4 w-4 text-emerald-600" />
              <span>WhatsApp Counsellor</span>
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
