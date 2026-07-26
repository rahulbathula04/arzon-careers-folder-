import { Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  ShieldCheck,
  BookOpen,
  Crown,
  ArrowRight,
  Sparkles,
  Zap,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";
import { TIER_META, formatInr, type TierId } from "@/data/enrolmentTiers";

interface TierDetail {
  badge: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  icon: any;
  iconColor: string;
  tagline: string;
  cardBg: string;
  cardBorder: string;
  cardShadow: string;
  titleColor: string;
  taglineColor: string;
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
  textColor: string;
  checkIconColor: string;
  btnBg: string;
  btnText: string;
  btnHover: string;
  btnShadow: string;
  uniqueHook: string;
  perks: string[];
  cta: string;
}

const TIERS_CONFIG: Record<TierId, TierDetail> = {
  essential: {
    badge: "Self-Paced Core",
    badgeBg: "bg-slate-800/80",
    badgeText: "text-slate-200 font-semibold",
    badgeBorder: "border-slate-700",
    icon: BookOpen,
    iconColor: "text-slate-300",
    tagline: "For self-starters who want core recorded curriculum.",
    cardBg: "bg-[#0D1527]",
    cardBorder: "border-slate-800 hover:border-slate-700",
    cardShadow: "shadow-xl hover:shadow-2xl",
    titleColor: "text-white",
    taglineColor: "text-slate-300",
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
    textColor: "text-white",
    checkIconColor: "text-slate-400",
    btnBg: "bg-slate-800",
    btnText: "text-white",
    btnHover: "hover:bg-slate-700",
    btnShadow: "shadow-md hover:shadow-lg",
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
    badge: "⭐ MOST POPULAR · 87% ENROL HERE",
    badgeBg: "bg-gradient-to-r from-amber-400 to-amber-500",
    badgeText: "text-slate-950 font-bold",
    badgeBorder: "border-amber-400",
    icon: Star,
    iconColor: "text-amber-400",
    tagline: "For graduates seeking live mentor instruction and placement prep.",
    cardBg: "bg-[#0B132B]",
    cardBorder: "border-amber-400/80 ring-2 ring-amber-400/40",
    cardShadow: "shadow-[0_20px_50px_rgba(29,78,216,0.3)] scale-[1.02]",
    titleColor: "text-white",
    taglineColor: "text-slate-300",
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
    textColor: "text-white",
    checkIconColor: "text-amber-400",
    btnBg: "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700",
    btnText: "text-white",
    btnHover: "hover:from-blue-500 hover:to-indigo-600",
    btnShadow: "shadow-xl shadow-blue-900/50",
    uniqueHook: "⚡ Direct Access to 120+ Hiring Partners (Optum, Omega, Access)",
    perks: [
      "Everything in Essential Tier",
      "Live mentor sessions (8 weeks)",
      "Real-data labs + capstone projects",
      "Verifiable internship certificate",
      "Job placement support + 1:1 mock interviews",
    ],
    cta: "Select Career Tier (Recommended)",
  },
  elite: {
    badge: "👑 DIRECT RECRUITER SLA · INTERVIEW GUARANTEE",
    badgeBg: "bg-emerald-500/20",
    badgeText: "text-emerald-300 font-bold",
    badgeBorder: "border-emerald-400/40",
    icon: Crown,
    iconColor: "text-emerald-400",
    tagline: "For candidates wanting 1:1 mentor pairing and interview guarantees.",
    cardBg: "bg-[#041D17]",
    cardBorder: "border-emerald-500/70",
    cardShadow: "shadow-[0_20px_50px_rgba(16,185,129,0.2)]",
    titleColor: "text-white",
    taglineColor: "text-emerald-100/90",
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
    textColor: "text-white",
    checkIconColor: "text-emerald-400",
    btnBg: "bg-emerald-600",
    btnText: "text-white",
    btnHover: "hover:bg-emerald-500",
    btnShadow: "shadow-xl shadow-emerald-950/60",
    uniqueHook: "🛡️ Dedicated 1:1 Senior Mentor + 3 Guaranteed Hiring Manager Interviews",
    perks: [
      "Everything in Career Tier",
      "1:1 dedicated mentor pairing",
      "3 guaranteed hiring partner interviews",
      "Custom ATS resume & LinkedIn rewrite",
    ],
    cta: "Select Elite VIP Tier",
  },
};

export function Pricing() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section id="pricing" className="editorial-page-bg py-16 px-4 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1500px] space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-800">
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            <span>TRANSPARENT INVESTMENT STRUCTURE</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#151C2E] tracking-tight">
            Select your <span className="italic text-[#8A6D1F]">workforce readiness tier</span>
          </h2>
          <p className="text-sm text-[#5B6472]">
            Standard programme fees shown below. All tiers include full learning portal access,
            project feedback, and zero hidden charges.
          </p>
        </motion.div>

        {/* Tier Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch"
        >
          {(["essential", "career", "elite"] as TierId[]).map((id) => {
            const t = TIERS_CONFIG[id];
            const meta = TIER_META[id];
            const Icon = t.icon;

            return (
              <motion.div
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ duration: 0.2 }}
                key={id}
                className={`relative flex flex-col justify-between rounded-3xl border p-6 sm:p-8 transition-all duration-300 ${t.cardBg} ${t.cardBorder} ${t.cardShadow}`}
              >
                <div>
                  {/* Eyebrow & Pill Header */}
                  <div className="mb-5 flex items-center justify-between gap-2">
                    <span
                      className={`inline-block rounded-full px-3.5 py-1 text-[11px] uppercase tracking-wider border ${t.badgeBg} ${t.badgeText} ${t.badgeBorder}`}
                    >
                      {t.badge}
                    </span>
                    <Icon className={`h-5 w-5 ${t.iconColor}`} />
                  </div>

                  <div>
                    <h3 className={`font-serif text-3xl sm:text-4xl font-bold ${t.titleColor}`}>
                      {meta.name}
                    </h3>
                    <p className={`text-xs ${t.taglineColor} mt-1.5 min-h-[32px] leading-relaxed`}>
                      {t.tagline}
                    </p>
                  </div>

                  {/* Pricing Display Box */}
                  <div
                    className={`mt-6 rounded-2xl border p-5 space-y-2.5 ${t.priceBoxBg} ${t.priceBoxBorder}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-[11px] font-mono uppercase tracking-wider ${t.feeLabelColor}`}
                      >
                        Total Programme Fee
                      </span>
                      {meta.savingsInr > 0 && (
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${t.savingsBg} ${t.savingsText}`}
                        >
                          Save {formatInr(meta.savingsInr)}
                        </span>
                      )}
                    </div>
                    <div className="overflow-hidden">
                      <span
                        className={`font-serif text-3xl sm:text-4xl lg:text-3xl xl:text-4xl font-bold tabular-nums tracking-tight whitespace-nowrap block ${t.priceColor}`}
                      >
                        {formatInr(meta.mrpInr)}
                      </span>
                    </div>
                  </div>

                  {/* Unique Hook Banner */}
                  <div
                    className={`mt-4 rounded-xl border p-3 text-xs flex items-center gap-2.5 ${t.uniqueHookBg} ${t.uniqueHookBorder} ${t.uniqueHookText}`}
                  >
                    <Zap className="h-4 w-4 shrink-0 text-amber-400" />
                    <span className="leading-snug">{t.uniqueHook}</span>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 pt-4">
                    <p
                      className={`text-[11px] font-mono uppercase tracking-wider font-semibold ${t.deliverablesHeaderColor}`}
                    >
                      Included Deliverables
                    </p>
                    <ul className="space-y-3 text-xs">
                      {t.perks.map((p, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className={`h-4 w-4 shrink-0 mt-0.5 ${t.checkIconColor}`} />
                          <span className={`leading-snug font-medium ${t.textColor}`}>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Primary Button */}
                <div className="mt-8 pt-5 border-t border-white/10">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      to="/enrol/$tier"
                      params={{ tier: id }}
                      style={{ color: "#FFFFFF" }}
                      className={`flex items-center justify-center gap-2 rounded-2xl text-sm font-bold h-13 px-5 w-full transition-all duration-200 ${t.btnBg} ${t.btnText} ${t.btnHover} ${t.btnShadow}`}
                    >
                      <span>{t.cta}</span>
                      <ArrowRight className="h-4 w-4 text-white" />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Security Footer */}
        <div className="editorial-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left rounded-2xl">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-emerald-600 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-[#151C2E]">256-bit TLS Encrypted Checkout</p>
              <p className="text-xs text-[#5B6472]">
                Processed via Razorpay · GST tax invoice issued upon payment confirmation.
              </p>
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
