import { Link } from "@tanstack/react-router";
import { SectionHeader } from "./SectionHeader";
import { Section } from "@/components/ui/Section";
import { CTAButton } from "./CTAButton";
import { motion } from "framer-motion";
import {
  Check,
  ShieldCheck,
  Receipt,
  Trophy,
  Sparkles,
  Crown,
  Rocket,
  BookOpen,
  Briefcase,
  Star,
  TrendingUp,
  ArrowRight,
  Calculator,
  Tag,
  Clock,
  type LucideIcon,
} from "lucide-react";
import { waLink, NEXT_COHORT } from "./constants";
import { track } from "@/lib/track";
import { TIER_META, formatInr, type TierId } from "@/data/enrolmentTiers";

interface Tier {
  id: TierId;
  name: string;
  eyebrow: string;
  pill?: string;
  price: string;
  offerPrice: string;
  couponSavings: string;
  tagline: string;
  outcome: string;
  outcomeIcon: LucideIcon;
  roi: string;
  perks: string[];
  cta: string;
  glyph: LucideIcon;
  source: "pricing_side" | "pricing_anchor";
}

const tiers: Record<TierId, Tier> = {
  essential: {
    id: "essential",
    name: "Essential",
    eyebrow: "Self-paced Foundation",
    price: formatInr(TIER_META.essential.mrpInr),
    offerPrice: formatInr(TIER_META.essential.offerPriceInr),
    couponSavings: "Drops to ₹4,999 with coupon",
    tagline: "For self-starters who'll watch on their own pace.",
    outcome: "Build the foundation",
    outcomeIcon: BookOpen,
    roi: "Course completion certificate",
    perks: [
      "8-week recorded curriculum",
      "Course completion certificate",
      "Community cohort group access",
      "Self-paced learning portal",
    ],
    cta: "Enrol Essential — ₹14,999",
    glyph: Sparkles,
    source: "pricing_side",
  },
  career: {
    id: "career",
    name: "Career",
    eyebrow: "Most picked by graduates",
    pill: "84% Choice · Best ROI",
    price: formatInr(TIER_META.career.mrpInr),
    offerPrice: formatInr(TIER_META.career.offerPriceInr),
    couponSavings: "Drops to ₹7,999 with coupon",
    tagline: "For most graduates · live cohort + interview prep",
    outcome: "Become job-ready in 12 weeks",
    outcomeIcon: Briefcase,
    roi: "Target offers ₹2.4–4.2 LPA",
    perks: [
      "Everything in Essential",
      "Live mentor sessions (8 weeks)",
      "Real-data labs + capstone projects",
      "Capstone internship certificate",
      "Job placement support + mock interviews",
    ],
    cta: "Enrol Career — ₹24,999",
    glyph: Rocket,
    source: "pricing_anchor",
  },
  elite: {
    id: "elite",
    name: "Elite",
    eyebrow: "Concierge · 1:1 Mentor",
    pill: "Guaranteed Interviews",
    price: formatInr(TIER_META.elite.mrpInr),
    offerPrice: formatInr(TIER_META.elite.offerPriceInr),
    couponSavings: "Drops to ₹9,999 with coupon",
    tagline: "For guaranteed-interview seekers · 1:1 mentor",
    outcome: "Land interviews, guaranteed",
    outcomeIcon: Crown,
    roi: "3 guaranteed hiring partner interviews",
    perks: [
      "Everything in Career",
      "1:1 dedicated mentor pairing (weekly)",
      "3 guaranteed hiring partner interviews",
      "Custom resume & LinkedIn rewrite by experts",
    ],
    cta: "Enrol Elite — ₹39,999",
    glyph: Crown,
    source: "pricing_side",
  },
};

function TierCard({ t, variant }: { t: Tier; variant: "side" | "anchor" }) {
  const isAnchor = variant === "anchor";
  const Glyph = t.glyph;
  const OutcomeIcon = t.outcomeIcon;
  const colSpan = isAnchor ? "lg:col-span-6" : "lg:col-span-3";
  const order = isAnchor ? "order-first lg:order-none" : "";
  const isElite = t.id === "elite";
  const sideAccent = isElite ? "#10B981" : "#38BDF8";

  return (
    <div className={`${colSpan} ${order} relative flex`}>
      {isAnchor && (
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-4 rounded-[36px] opacity-90 blur-3xl"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 30%, rgba(245,158,11,0.35), rgba(59,130,246,0.2) 40%, transparent 75%)",
          }}
        />
      )}

      <div
        className={`relative flex w-full flex-col overflow-hidden rounded-3xl border ${
          isAnchor
            ? "border-amber-400/60 bg-[#0E1529] text-slate-50! ring-2 ring-amber-400/50 shadow-[0_0_40px_rgba(245,158,11,0.25)]"
            : isElite
              ? "border-emerald-400/60 bg-[#0B1424] text-slate-50! ring-1 ring-emerald-400/50 shadow-[0_0_40px_rgba(16,185,129,0.2)]"
              : "border-white/15 bg-[#0C1222] text-slate-50! shadow-xl"
        }`}
      >
        <div
          aria-hidden
          className="h-1.5 w-full"
          style={{
            background: isAnchor
              ? "linear-gradient(90deg, #f59e0b 0%, #fef08a 50%, #f59e0b 100%)"
              : sideAccent,
          }}
        />

        {isAnchor && (
          <div className="px-6 pt-4 pb-1 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 px-3.5 py-1 font-mono text-micro font-black uppercase tracking-[0.22em] text-amber-300! ring-1 ring-amber-400/50">
              <Star className="h-3.5 w-3.5 fill-amber-300" /> {t.eyebrow}
            </span>
          </div>
        )}

        <Glyph
          aria-hidden
          className={`pointer-events-none absolute right-4 top-6 hidden lg:block ${
            isAnchor ? "h-24 w-24 text-white/[0.06]" : "h-14 w-14 text-white/[0.06]"
          }`}
        />

        <div
          className={`relative flex flex-1 flex-col ${isAnchor ? "p-6 sm:p-8 lg:p-10" : "p-5 sm:p-6 lg:p-7"}`}
        >
          {!isAnchor && (
            <p
              className="mb-3 font-mono text-micro font-bold uppercase tracking-[0.22em] text-emerald-400!"
              style={!isElite ? { color: "#38BDF8" } : undefined}
            >
              {t.eyebrow}
            </p>
          )}

          <div className="mb-2 flex items-center gap-2 flex-wrap">
            <h3
              className={`font-black ${
                isAnchor ? "text-3xl sm:text-4xl text-slate-50!" : "text-2xl text-slate-50!"
              }`}
            >
              {t.name}
            </h3>
            {t.pill && (
              <span className="rounded-full bg-amber-400 px-3 py-1 font-mono text-micro font-black uppercase tracking-wider text-slate-950! shadow-md">
                {t.pill}
              </span>
            )}
          </div>

          <p
            className={`leading-relaxed text-slate-200! ${
              isAnchor ? "text-base mb-5" : "text-xs mb-4"
            }`}
          >
            {t.tagline}
          </p>

          <div
            className={`mb-6 flex items-start gap-3 rounded-2xl px-4 py-3 border ${
              isAnchor
                ? "bg-amber-400/10 border-amber-400/30"
                : "bg-white/[0.05] border-white/15"
            }`}
          >
            <OutcomeIcon
              className="mt-0.5 h-4.5 w-4.5 shrink-0 text-amber-300!"
              style={!isAnchor ? { color: sideAccent } : undefined}
              strokeWidth={2.5}
            />
            <div className="min-w-0">
              <div className="text-sm font-bold text-slate-50!">
                {t.outcome}
              </div>
              <div
                className="mt-0.5 text-xs font-semibold text-amber-300!"
                style={!isAnchor ? { color: sideAccent } : undefined}
              >
                <TrendingUp className="-mt-0.5 mr-1 inline h-3.5 w-3.5" /> {t.roi}
              </div>
            </div>
          </div>

          {/* Standard Price Block before coupon */}
          <div
            className={`mb-6 rounded-2xl p-4.5 border ${
              isAnchor ? "bg-white/[0.06] border-white/15" : "bg-white/[0.04] border-white/10"
            }`}
          >
            <div className="flex items-baseline gap-2">
              <div
                className={`font-black ${
                  isAnchor ? "text-4xl sm:text-5xl text-slate-50!" : "text-3xl text-slate-50!"
                }`}
              >
                {t.price}
              </div>
              <span className="font-mono text-micro font-bold uppercase tracking-wider text-slate-300!">
                one-time · all-inclusive
              </span>
            </div>

            {/* Coupon Launch Discount Hint */}
            <div className="mt-3.5 flex items-center gap-2 rounded-xl bg-emerald-950/60 px-3 py-2 text-xs font-bold text-emerald-300! border border-emerald-500/40">
              <Tag className="h-4 w-4 shrink-0 text-emerald-400!" />
              <span>Apply coupon <strong className="text-white!">ARZONPRIME60</strong> at checkout ➔ {t.couponSavings}</span>
            </div>

            {/* Split-Pay Pre-Registration Callout */}
            <div className="mt-2.5 flex items-center gap-2 text-xs font-medium text-slate-200!">
              <Clock className="h-4 w-4 text-sky-400! shrink-0" />
              <span>Lock seat for <strong className="text-white!">₹1,000 today</strong> + pay balance in 7 days</span>
            </div>
          </div>

          {/* Perks */}
          <ul
            className={`mb-6 flex-grow space-y-3 ${
              isAnchor ? "lg:grid lg:grid-cols-2 lg:gap-x-4 lg:gap-y-3 lg:space-y-0" : ""
            }`}
          >
            {t.perks.map((p, idx) => {
              const isUpgradeRow = idx === 0 && t.id !== "essential";
              return (
                <li
                  key={p}
                  className={`flex items-start gap-2.5 text-xs text-slate-100! ${
                    isUpgradeRow
                      ? "-mx-2 rounded-xl bg-white/[0.08] px-2.5 py-2 lg:col-span-2 border border-white/15"
                      : ""
                  }`}
                >
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0"
                    style={{
                      color: isAnchor ? "#fef08a" : sideAccent,
                    }}
                    strokeWidth={2.75}
                  />
                  <span className="leading-snug">
                    {p}
                  </span>
                </li>
              );
            })}
          </ul>

          {/* CTA */}
          <div className="mt-auto space-y-3">
            <CTAButton
              asChild
              variant={isAnchor ? "gold" : "primary"}
              size="lg"
              fullBlock
            >
              <Link
                to="/enrol/$tier"
                params={{ tier: t.id }}
                onClick={() =>
                  track("enrol_fasttrack_clicked", {
                    program_slug: t.id,
                    props: { tier: t.id, source: t.source },
                  })
                }
              >
                <span>{t.cta}</span>
                <span data-arrow aria-hidden>
                  <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                </span>
              </Link>
            </CTAButton>
            <a
              href={waLink(
                `Hi Arzon, I'm looking at the ${t.name} programme (${t.price}). Please share the launch coupon code for the special discount.`,
              )}
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                track("coupon_counsellor_contact_clicked", {
                  props: { tier: t.id, source: t.source },
                });
                track("whatsapp_click", {
                  program_slug: t.id,
                  props: { source: "pricing_launch_code", tier: t.id },
                });
              }}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-white/20 bg-slate-800/90 px-4 text-center text-xs font-bold text-slate-100! hover:border-white/40 hover:bg-slate-700 transition-all"
            >
              Ask counsellor for coupon code
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrustItem({ icon: Icon, title, sub }: { icon: LucideIcon; title: string; sub: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/[0.05] px-4 py-3.5 border border-white/15">
      <Icon className="h-5 w-5 shrink-0 text-amber-400!" strokeWidth={2.25} />
      <div className="min-w-0">
        <div className="text-xs font-bold text-slate-50!">{title}</div>
        <div className="text-micro text-slate-200!">{sub}</div>
      </div>
    </div>
  );
}

export function Pricing() {
  const essential = tiers.essential;
  const career = tiers.career;
  const elite = tiers.elite;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };
  
  const itemVariants: import("framer-motion").Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } }
  };

  return (
    <Section id="pricing" size="lg" className="tone-dark bg-[#070B18]">
      <SectionHeader
        tone="dark"
        eyebrow="Programme Fees"
        title={<>One fee. No surprises.</>}
        sub={
          <>
            Standard programme fees shown below. Apply coupon <strong className="font-bold text-emerald-400!">ARZONPRIME60</strong> at checkout to unlock up to 75% launch savings.
          </>
        }
      />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto mt-6 flex max-w-7xl items-center justify-center gap-2 text-center"
      >
        <span
          className="h-2 w-2 motion-safe:animate-pulse rounded-full bg-emerald-400"
          aria-hidden
        />
        <span className="font-mono text-micro font-bold uppercase tracking-[0.2em] text-emerald-400!">
          Next cohort: {NEXT_COHORT.label} · starts {NEXT_COHORT.startsLabel} · Limited Seats
        </span>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto mt-6 max-w-7xl rounded-[32px] border border-white/15 bg-[#0A0F20] p-4 sm:p-8 lg:p-12 shadow-2xl backdrop-blur-2xl"
      >
        <div className="grid grid-cols-1 items-stretch gap-4 sm:gap-6 lg:grid-cols-12">
          <motion.div variants={itemVariants} className="lg:col-span-3 lg:order-none relative flex">
            <TierCard t={essential} variant="side" />
          </motion.div>
          <motion.div variants={itemVariants} className="lg:col-span-6 order-first lg:order-none relative flex">
            <TierCard t={career} variant="anchor" />
          </motion.div>
          <motion.div variants={itemVariants} className="lg:col-span-3 lg:order-none relative flex">
            <TierCard t={elite} variant="side" />
          </motion.div>
        </div>

        {/* Trust bar */}
        <motion.div variants={itemVariants} data-fab-avoid className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <TrustItem
            icon={ShieldCheck}
            title="ISO 9001 Issuer"
            sub="Arzon Global Pvt. Ltd. · MCA + MSME Registered"
          />
          <TrustItem icon={Receipt} title="Split-Pay Pre-Registration" sub="Pay ₹1,000 now, balance in 7 days" />
          <TrustItem icon={Trophy} title="Guaranteed Interviews" sub="3 hiring partner interviews on Elite" />
        </motion.div>

        <motion.div variants={itemVariants}>
          <BreakevenReframe />
        </motion.div>
      </motion.div>
    </Section>
  );
}

function BreakevenReframe() {
  const fee = 24999;
  const monthly = Math.round(320000 / 12); // ~₹26,667
  const breakevenDays = Math.ceil((fee / monthly) * 30); // ~28 days

  return (
    <div className="relative mt-8 overflow-hidden rounded-3xl bg-[#0E1733] p-6 shadow-[0_24px_48px_-24px_rgba(10,18,41,0.6)] border border-amber-400/40 sm:p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle,rgba(245,158,11,0.55),transparent 70%)" }}
      />
      <div className="relative grid items-center gap-5 md:grid-cols-[auto_1fr_auto] md:gap-8">
        <div className="flex items-center gap-3.5">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400/20 ring-1 ring-amber-400/40">
            <Calculator className="h-6 w-6 text-amber-300!" strokeWidth={2.25} />
          </span>
          <div>
            <p className="font-mono text-micro uppercase tracking-[0.22em] text-amber-300! font-bold">
              The real math
            </p>
            <p className="font-black text-xl text-slate-50!">Cost per placement</p>
          </div>
        </div>

        <div className="min-w-0">
          <p className="font-bold text-lg leading-snug text-slate-50! sm:text-xl">
            <span className="text-amber-300! font-black">₹{fee.toLocaleString()}</span>
            <span className="text-slate-200!"> ÷ </span>
            <span className="text-slate-50! font-bold">₹{monthly.toLocaleString()}</span>
            <span className="text-slate-200!"> first-month salary = </span>
            <span className="text-amber-300! font-black">break-even in ~{breakevenDays} days of work.</span>
          </p>
          <p className="mt-2 text-xs text-slate-200! leading-relaxed">
            At the median entry offer (₹3.2 LPA), the full Career programme pays itself back inside your first month on the job.
          </p>
        </div>

        <div className="rounded-2xl bg-white/[0.08] px-5 py-4 border border-white/15 sm:min-w-[170px] sm:text-center">
          <p className="font-mono text-micro font-bold uppercase tracking-[0.22em] text-slate-200!">
            Days to recover fee
          </p>
          <p className="font-black text-3xl sm:text-4xl text-amber-300! mt-1">
            ~{breakevenDays}
            <span className="ml-1 text-sm text-slate-200! font-normal">days</span>
          </p>
        </div>
      </div>
    </div>
  );
}
