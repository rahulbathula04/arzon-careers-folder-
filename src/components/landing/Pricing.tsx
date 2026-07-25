import { Link } from "@tanstack/react-router";
import {
  Check,
  ShieldCheck,
  BookOpen,
  Briefcase,
  Crown,
  ArrowRight,
  Clock,
  type LucideIcon,
} from "lucide-react";
import { TIER_META, formatInr, type TierId } from "@/data/enrolmentTiers";

interface Tier {
  id: TierId;
  name: string;
  eyebrow: string;
  pill?: string;
  price: string;
  tagline: string;
  outcome: string;
  outcomeIcon: LucideIcon;
  roi: string;
  perks: string[];
  cta: string;
}

const tiers: Record<TierId, Tier> = {
  essential: {
    id: "essential",
    name: "Essential",
    eyebrow: "Self-Paced Foundation",
    price: formatInr(TIER_META.essential.mrpInr),
    tagline: "For self-starters who want core recorded curriculum.",
    outcome: "Build baseline domain skills",
    outcomeIcon: BookOpen,
    roi: "Course completion certificate",
    perks: [
      "8-week recorded curriculum",
      "Course completion certificate",
      "Community cohort group access",
      "Self-paced learning portal",
    ],
    cta: "Select Essential Tier",
  },
  career: {
    id: "career",
    name: "Career",
    eyebrow: "Most Picked by Candidates",
    pill: "84% Choice · Best ROI",
    price: formatInr(TIER_META.career.mrpInr),
    tagline: "For graduates seeking live mentor instruction and placement prep.",
    outcome: "Become job-ready in 12 weeks",
    outcomeIcon: Briefcase,
    roi: "Target offers ₹2.4–4.2 LPA",
    perks: [
      "Everything in Essential",
      "Live mentor sessions (8 weeks)",
      "Real-data labs + capstone projects",
      "Verifiable internship certificate",
      "Placement support + mock interviews",
    ],
    cta: "Select Career Tier",
  },
  elite: {
    id: "elite",
    name: "Elite",
    eyebrow: "Concierge Mentorship",
    pill: "Guaranteed Interviews",
    price: formatInr(TIER_META.elite.mrpInr),
    tagline: "For candidates wanting 1:1 mentor pairing and interview guarantees.",
    outcome: "Land hiring partner interviews",
    outcomeIcon: Crown,
    roi: "3 guaranteed hiring partner interviews",
    perks: [
      "Everything in Career",
      "1:1 dedicated mentor pairing",
      "3 guaranteed hiring partner interviews",
      "Custom ATS resume & LinkedIn rewrite",
    ],
    cta: "Select Elite Tier",
  },
};

export function Pricing() {
  return (
    <section id="pricing" className="editorial-page-bg py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-10">
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <p className="text-xs font-medium uppercase tracking-widest text-[#707C90]">
            Transparent Investment Structure
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#151C2E] tracking-tight">
            Transparent <span className="italic text-[#8A6D1F]">investment in your career</span>
          </h2>
          <p className="text-sm text-[#5B6472]">
            Standard programme fees shown below. All tiers include full learning portal access and project feedback.
          </p>
        </div>

        {/* Tier Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-3 items-stretch">
          {(["essential", "career", "elite"] as TierId[]).map((id) => {
            const t = tiers[id];
            const isCareer = id === "career";
            const OutcomeIcon = t.outcomeIcon;

            return (
              <div
                key={id}
                className={`editorial-card p-6 flex flex-col justify-between relative transition-transform hover:-translate-y-1 ${
                  isCareer ? "ring-2 ring-[#1D4ED8]" : ""
                }`}
              >
                <div className="space-y-4">
                  {/* Eyebrow & Pill Header */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-medium uppercase tracking-widest text-[#707C90]">
                      {t.eyebrow}
                    </span>
                    {t.pill && (
                      <span className="rounded-full editorial-badge-warning px-2.5 py-0.5 text-xs font-semibold">
                        {t.pill}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#151C2E]">{t.name}</h3>
                    <p className="text-xs text-[#5B6472] mt-1 min-h-[32px]">{t.tagline}</p>
                  </div>

                  {/* Outcome Box */}
                  <div className="editorial-stat-tile p-3 flex items-center gap-3">
                    <OutcomeIcon className="h-4 w-4 text-[#1D4ED8] shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-[#151C2E]">{t.outcome}</p>
                      <p className="text-[11px] text-[#5B6472]">{t.roi}</p>
                    </div>
                  </div>

                  {/* Pricing Inset */}
                  <div className="editorial-stat-tile p-4 space-y-2">
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-3xl font-bold text-[#151C2E] tabular-nums">
                        {t.price}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#707C90]">
                        Standard Fee
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-[#5B6472]">
                      <Clock className="h-3.5 w-3.5 shrink-0 text-[#707C90]" />
                      <span>Split-pay option: <strong className="text-[#151C2E]">₹1,000 to lock seat</strong></span>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-2.5 pt-2">
                    <p className="text-xs font-medium uppercase tracking-widest text-[#707C90]">Included</p>
                    <ul className="space-y-2 text-xs text-[#5B6472]">
                      {t.perks.map((p) => (
                        <li key={p} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-[#1D4ED8] shrink-0 mt-0.5" />
                          <span className="text-[#151C2E]">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Primary Royal Blue Button */}
                <Link
                  to="/enrol/$tier"
                  params={{ tier: id }}
                  className="mt-8 editorial-btn-blue text-xs h-11 px-4 w-full flex items-center justify-center gap-2 text-white font-bold"
                >
                  <span>{t.cta}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Security Footer */}
        <div className="editorial-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-emerald-600 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-[#151C2E]">256-bit TLS Encrypted Checkout</p>
              <p className="text-xs text-[#5B6472]">Processed via Razorpay · GST tax invoice issued upon payment confirmation.</p>
            </div>
          </div>
          <div className="text-xs font-mono text-[#707C90]">
            PCI-DSS Level 1 Compliant
          </div>
        </div>
      </div>
    </section>
  );
}
