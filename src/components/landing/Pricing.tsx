import { Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  ShieldCheck,
  BookOpen,
  Briefcase,
  Crown,
  ArrowRight,
  Clock,
  Sparkles,
  Zap,
} from "lucide-react";
import { TIER_META, formatInr, type TierId } from "@/data/enrolmentTiers";

const TIERS_CONFIG = {
  essential: {
    id: "essential" as TierId,
    name: "Essential",
    badge: "Self-Paced Core",
    badgeStyle: "bg-slate-200/80 text-slate-800 border-slate-300",
    price: formatInr(TIER_META.essential.mrpInr),
    tagline: "For self-starters who want core recorded curriculum.",
    outcome: "Build baseline domain skills",
    cardBg: "bg-white",
    borderColor: "border-slate-200 hover:border-slate-300 shadow-sm",
    textColor: "text-slate-900",
    subTextColor: "text-slate-600",
    priceBoxBg: "bg-slate-50",
    priceBoxBorder: "border-slate-200",
    btnStyle:
      "bg-slate-900 text-white hover:bg-slate-800 shadow-md hover:shadow-lg focus:ring-slate-900",
    uniqueHook: "12-Month Access to Video Modules & Codebook Reference Labs",
    perks: [
      "8-week recorded video curriculum",
      "Course completion certificate",
      "Community cohort group access",
      "Self-paced learning portal",
    ],
    cta: "Select Essential Tier",
  },
  career: {
    id: "career" as TierId,
    name: "Career",
    badge: "⭐ MOST POPULAR · 87% ENROL HERE",
    badgeStyle: "bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold shadow-md",
    price: formatInr(TIER_META.career.mrpInr),
    tagline: "For graduates seeking live mentor instruction and placement prep.",
    outcome: "Become job-ready in 12 weeks",
    cardBg: "bg-gradient-to-b from-[#0F1B3D] via-[#14234C] to-[#0A122A]",
    borderColor: "border-amber-400/60 ring-2 ring-amber-400/40 shadow-2xl scale-[1.02]",
    textColor: "text-white",
    subTextColor: "text-slate-200/90",
    priceBoxBg: "bg-white/10 backdrop-blur-md",
    priceBoxBorder: "border-amber-400/30",
    btnStyle:
      "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white hover:from-blue-500 hover:to-indigo-600 shadow-xl shadow-blue-900/40 focus:ring-blue-400",
    uniqueHook: "⚡ Direct Access to 120+ Hiring Partners (Optum, Omega, Access)",
    perks: [
      "Everything in Essential",
      "Live mentor sessions (8 weeks)",
      "Real-data labs + capstone projects",
      "Verifiable internship certificate",
      "Job placement support + 1:1 mock interviews",
    ],
    cta: "Select Career Tier (Recommended)",
  },
  elite: {
    id: "elite" as TierId,
    name: "Elite",
    badge: "👑 DIRECT RECRUITER SLA · INTERVIEW GUARANTEE",
    badgeStyle:
      "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 font-bold shadow-sm",
    price: formatInr(TIER_META.elite.mrpInr),
    tagline: "For candidates wanting 1:1 mentor pairing and interview guarantees.",
    outcome: "Land hiring partner interviews",
    cardBg: "bg-gradient-to-b from-[#061A14] via-[#0A2920] to-[#04120E]",
    borderColor: "border-emerald-500/50 hover:border-emerald-400 shadow-xl",
    textColor: "text-white",
    subTextColor: "text-emerald-100/80",
    priceBoxBg: "bg-emerald-950/40 backdrop-blur-md",
    priceBoxBorder: "border-emerald-500/30",
    btnStyle:
      "bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-950/50 focus:ring-emerald-400",
    uniqueHook: "🛡️ Dedicated 1:1 Senior Mentor + 3 Guaranteed Hiring Manager Interviews",
    perks: [
      "Everything in Career",
      "1:1 dedicated mentor pairing",
      "3 guaranteed hiring partner interviews",
      "Custom ATS resume & LinkedIn rewrite",
    ],
    cta: "Select Elite VIP Tier",
  },
};

export function Pricing() {
  return (
    <section id="pricing" className="editorial-page-bg py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-800">
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            <span>TRANSPARENT INVESTMENT STRUCTURE</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#151C2E] tracking-tight">
            Select your <span className="italic text-[#8A6D1F]">workforce readiness tier</span>
          </h2>
          <p className="text-sm text-[#5B6472]">
            Standard programme fees shown below. All tiers include full learning portal access, project feedback, and zero hidden loan traps.
          </p>
        </div>

        {/* Tier Cards Grid */}
        <div className="grid gap-8 sm:grid-cols-3 items-stretch">
          {(["essential", "career", "elite"] as TierId[]).map((id) => {
            const t = TIERS_CONFIG[id];
            const meta = TIER_META[id];
            const isFeatured = id === "career";

            return (
              <div
                key={id}
                className={`relative flex flex-col justify-between rounded-3xl border p-6 sm:p-8 transition-all duration-300 ${t.cardBg} ${t.borderColor}`}
              >
                <div className="space-y-4">
                  {/* Eyebrow & Pill Header */}
                  <div className="mb-2">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-[11px] font-mono uppercase tracking-wider ${t.badgeStyle}`}
                    >
                      {t.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className={`font-serif text-3xl font-bold ${t.textColor}`}>{t.name}</h3>
                    <p className={`text-xs ${t.subTextColor} mt-1.5 min-h-[32px] leading-relaxed`}>
                      {t.tagline}
                    </p>
                  </div>

                  {/* Pricing Display Box */}
                  <div className={`rounded-2xl border p-5 space-y-3 ${t.priceBoxBg} ${t.priceBoxBorder}`}>
                    <div className="flex items-baseline justify-between gap-2">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                          Total Programme Fee
                        </span>
                        <span className={`font-serif text-3xl sm:text-4xl font-bold tabular-nums ${t.textColor}`}>
                          {t.price}
                        </span>
                      </div>
                      {meta.savingsInr > 0 && (
                        <span className="rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs font-semibold text-emerald-400 border border-emerald-400/30">
                          Save {formatInr(meta.savingsInr)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Unique Hook Banner */}
                  <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-xs flex items-center gap-2 text-slate-200">
                    <Zap className="h-4 w-4 shrink-0 text-amber-400" />
                    <span className="font-medium leading-snug">{t.uniqueHook}</span>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 pt-2">
                    <p className={`text-[11px] font-mono uppercase tracking-wider ${t.subTextColor}`}>
                      Included Deliverables
                    </p>
                    <ul className="space-y-2.5 text-xs">
                      {t.perks.map((p, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2
                            className={`h-4 w-4 shrink-0 mt-0.5 ${
                              id === "elite"
                                ? "text-emerald-400"
                                : isFeatured
                                ? "text-amber-400"
                                : "text-slate-700"
                            }`}
                          />
                          <span className={`leading-snug ${t.textColor}`}>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Primary Button */}
                <div className="mt-8 pt-4 border-t border-white/10">
                  <Link
                    to="/enrol/$tier"
                    params={{ tier: id }}
                    className={`flex items-center justify-center gap-2 rounded-xl text-xs sm:text-sm font-bold h-12 px-4 w-full transition-all duration-200 ${t.btnStyle}`}
                  >
                    <span>{t.cta}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security Footer */}
        <div className="editorial-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left rounded-2xl">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-emerald-600 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-[#151C2E]">256-bit TLS Encrypted Checkout</p>
              <p className="text-xs text-[#5B6472]">Processed via Razorpay · GST tax invoice issued upon payment confirmation.</p>
            </div>
          </div>
          <div className="text-xs font-mono text-[#707C90]">
            PCI-DSS Level 1 Compliant · Official GST Tax Invoice
          </div>
        </div>
      </div>
    </section>
  );
}
