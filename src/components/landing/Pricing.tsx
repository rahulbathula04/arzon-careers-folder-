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
  type LucideIcon,
} from "lucide-react";
import { PRICE_ESSENTIAL, PRICE_CAREER, PRICE_ELITE, waLink, NEXT_COHORT } from "./constants";
import { track } from "@/lib/track";

type TierId = "essential" | "career" | "elite";

interface Tier {
  id: TierId;
  name: string;
  eyebrow: string;
  pill?: string;
  price: string;
  priceNum: number;
  perWeek: string;
  savingsNote?: string;
  lossNote?: string;
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
    eyebrow: "Self-paced",
    price: PRICE_ESSENTIAL,
    priceNum: 14999,
    perWeek: "≈ ₹1,875 / week",
    lossNote: "No live mentor · no placement support",
    tagline: "For self-starters who'll watch on their own pace.",
    outcome: "Build the foundation",
    outcomeIcon: BookOpen,
    roi: "Course completion certificate",
    perks: [
      "8-week recorded curriculum",
      "Group mentor calls",
      "Community access",
      "Course completion certificate",
    ],
    cta: "Enrol Now",
    glyph: Sparkles,
    source: "pricing_side",
  },
  career: {
    id: "career",
    name: "Career",
    eyebrow: "Most picked by graduates",
    pill: "Best ROI",
    price: PRICE_CAREER,
    priceNum: 24999,
    perWeek: "≈ ₹2,083 / week of live training",
    savingsNote: "Save ₹15,000 vs Elite",
    tagline: "For most graduates · live cohort + interview prep",
    outcome: "Become job-ready in 12 weeks",
    outcomeIcon: Briefcase,
    roi: "Target offers ₹2.4–4.2 LPA",
    perks: [
      "Everything in Essential",
      "Live mentor sessions (8 weeks)",
      "Real-data labs + graded assignments",
      "Capstone internship + certification",
      "Placement support + mock interviews",
    ],
    cta: "Apply Now",
    glyph: Rocket,
    source: "pricing_anchor",
  },
  elite: {
    id: "elite",
    name: "Elite",
    eyebrow: "Concierge · 1:1",
    price: PRICE_ELITE,
    priceNum: 39999,
    perWeek: "≈ ₹3,333 / week + weekly 1:1",
    tagline: "For guaranteed-interview seekers · 1:1 mentor",
    outcome: "Land interviews, guaranteed",
    outcomeIcon: Crown,
    roi: "3 guaranteed hiring partner interviews",
    perks: [
      "Everything in Career",
      "1:1 mentor (weekly)",
      "Performance-based LOR",
      "3 guaranteed hiring partner interviews",
    ],
    cta: "Request Invite",
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

  // Per-tier accent — color psychology:
  //   Essential: cool steel-blue   → safe, low commitment
  //   Career:    gold/amber on navy → premium, urgency, "winner"
  //   Elite:     deep emerald       → prestige, growth, exclusivity
  const sideAccent = isElite ? "#0d7a5f" : "#3b6fa0";

  return (
    <div className={`${colSpan} ${order} relative flex`}>
      {/* Soft halo behind anchor card */}
      {isAnchor && (
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-4 rounded-[32px] opacity-80 blur-3xl"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 30%, rgba(201,168,76,0.32), rgba(59,111,160,0.18) 40%, transparent 75%)",
          }}
        />
      )}

      <div
        className={`relative flex w-full flex-col overflow-hidden card-interactive ${
          isAnchor
            ? "card-dark text-slate-50 ring-1 ring-[#c9a84c]/30"
            : "glass-panel-deep text-slate-50"
        }`}
      >
        {/* Top accent strip — color psychology cue */}
        <div
          aria-hidden
          className="h-1 w-full"
          style={{
            background: isAnchor
              ? "linear-gradient(90deg, #c9a84c 0%, #f0d78c 50%, #c9a84c 100%)"
              : sideAccent,
          }}
        />

        {isAnchor && (
          <div className="px-6 pt-3 pb-1 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#c9a84c]/15 px-3 py-1 font-mono text-micro font-bold uppercase tracking-[0.22em] text-[#f0d78c] ring-1 ring-[#c9a84c]/40">
              <Star className="h-3 w-3 fill-[#f0d78c]" /> {t.eyebrow}
            </span>
          </div>
        )}

        {/* Glyph watermark — desktop only to avoid overlap on mobile/tablet */}
        <Glyph
          aria-hidden
          className={`pointer-events-none absolute right-4 top-6 hidden lg:block ${
            isAnchor ? "h-24 w-24 text-white/[0.05]" : "h-14 w-14 text-white/[0.05]"
          }`}
        />

        <div
          className={`relative flex flex-1 flex-col ${isAnchor ? "p-6 sm:p-8 lg:p-10" : "p-5 sm:p-6 lg:p-7"}`}
        >
          {/* Eyebrow (side cards) */}
          {!isAnchor && (
            <p
              className="mb-3 font-mono text-micro font-semibold uppercase tracking-[0.22em]"
              style={{ color: sideAccent }}
            >
              {t.eyebrow}
            </p>
          )}

          {/* Name + pill */}
          <div className="mb-2 flex items-center gap-2 flex-wrap">
            <h3
              className={`font-display ${
                isAnchor ? "text-h1 text-slate-50!" : "text-h3 text-slate-50!"
              }`}
            >
              {t.name}
            </h3>
            {t.pill && (
              <span className="rounded-full bg-[#c9a84c] px-2.5 py-0.5 font-mono text-micro font-bold uppercase tracking-wider text-slate-950! shadow-sm">
                {t.pill}
              </span>
            )}
          </div>

          <p
            className={`leading-relaxed ${
              isAnchor ? "text-base mb-5 text-slate-100/70!" : "text-sm mb-5 text-slate-300!"
            }`}
          >
            {t.tagline}
          </p>

          {/* OUTCOME — benefit-led, top of card (color psychology: what you GET) */}
          <div
            className={`mb-6 flex items-start gap-2.5 rounded-lg px-3 py-2.5 ${
              isAnchor ? "bg-[#c9a84c]/12 ring-1 ring-[#c9a84c]/30" : "bg-white/[0.06] ring-1 ring-white/10"
            }`}
          >
            <OutcomeIcon
              className={`mt-0.5 h-4 w-4 shrink-0 ${isAnchor ? "text-[#f0d78c]!" : ""}`}
              style={!isAnchor ? { color: sideAccent } : undefined}
              strokeWidth={2.5}
            />
            <div className="min-w-0">
              <div
                className={`text-caption font-bold leading-tight ${
                  isAnchor ? "text-slate-50!" : "text-slate-50!"
                }`}
              >
                {t.outcome}
              </div>
              <div
                className={`mt-0.5 text-micro font-medium ${isAnchor ? "text-[#f0d78c]!" : ""}`}
                style={!isAnchor ? { color: sideAccent } : undefined}
              >
                <TrendingUp className="-mt-0.5 mr-1 inline h-3 w-3" /> {t.roi}
              </div>
            </div>
          </div>

          {/* Price block */}
          <div
            className={`mb-7 ${isAnchor ? "rounded-xl bg-white/[0.06] p-5 ring-1 ring-white/10" : ""}`}
          >
            <div className="flex items-baseline gap-2">
              <div
                className={`font-display ${
                  isAnchor ? "text-display text-slate-50!" : "text-h1 text-slate-50!"
                }`}
              >
                {t.price}
              </div>
            </div>
            <div
              className={`mt-1.5 font-mono text-micro font-bold uppercase tracking-[0.18em] ${
                isAnchor ? "text-slate-100/55!" : "text-slate-100/55!"
              }`}
            >
              one-time • all-inclusive
            </div>
            <div
              className={`mt-2 text-meta font-medium ${
                isAnchor ? "text-slate-100/75!" : "text-slate-300!"
              }`}
            >
              {t.perWeek}
            </div>
            {t.savingsNote && (
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-sky-400/20 px-2.5 py-1 text-micro font-bold text-sky-300! ring-1 ring-sky-300/40">
                <Sparkles className="h-3 w-3" /> {t.savingsNote}
              </div>
            )}
          </div>

          {/* Perks */}
          <ul
            className={`mb-8 flex-grow space-y-3 ${
              isAnchor ? "lg:grid lg:grid-cols-2 lg:gap-x-6 lg:gap-y-3 lg:space-y-0" : ""
            }`}
          >
            {t.perks.map((p, idx) => {
              const isUpgradeRow = idx === 0 && t.id !== "essential";
              return (
                <li
                  key={p}
                  className={`flex items-start gap-3 ${
                    isUpgradeRow
                      ? isAnchor
                        ? "-mx-2 rounded-lg bg-white/[0.06] px-2 py-1.5 lg:col-span-2 ring-1 ring-white/10"
                        : "-mx-2 rounded-lg bg-white/[0.06] px-2 py-1.5 lg:col-span-2 ring-1 ring-white/10"
                      : ""
                  }`}
                >
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0"
                    style={{
                      color: isAnchor ? "#f0d78c" : sideAccent,
                    }}
                    strokeWidth={2.75}
                  />
                  <span
                    className={`text-body-sm leading-snug ${isUpgradeRow ? "font-semibold" : ""} ${
                      isAnchor ? "text-slate-50!" : "text-slate-50!"
                    }`}
                  >
                    {p}
                  </span>
                </li>
              );
            })}
          </ul>

          {t.lossNote && (
            <p className="-mt-3 mb-6 text-micro italic text-slate-100/55!">{t.lossNote}</p>
          )}

          {/* CTA */}
          <div className="mt-auto space-y-3">
            <CTAButton
              asChild
              variant={isAnchor ? "gold" : isElite ? "primary" : "primary"}
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
                `Hi Arzon, I'm looking at the ${t.name} programme. Can you share the launch code?`,
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
              className={`inline-flex min-h-11 w-full items-center justify-center rounded-md border px-4 text-center text-caption font-bold transition-colors ${
                isAnchor
                  ? "border-slate-200/30 bg-slate-50/10 text-slate-50! hover:border-slate-200/55 hover:bg-slate-50/16"
                  : isElite
                    ? "border-[#0056D2]/25 bg-[#EAF2FF] text-[#0056D2]! hover:border-[#0056D2] hover:bg-[#dceaff]"
                    : "border-[#0056D2]/25 bg-[#EAF2FF] text-[#0056D2]! hover:border-[#0056D2] hover:bg-[#dceaff]"
              }`}
            >
              Ask counsellor for code
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrustItem({ icon: Icon, title, sub }: { icon: LucideIcon; title: string; sub: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white/[0.04] px-4 py-3 ring-1 ring-white/10">
      <Icon className="h-5 w-5 shrink-0 text-brand-gold" strokeWidth={2} />
      <div className="min-w-0">
        <div className="text-caption font-bold text-slate-50">{title}</div>
        <div className="text-micro text-slate-100/70">{sub}</div>
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
    <Section id="pricing" size="lg" className="tone-dark bg-[#0a0c10]">
      <SectionHeader
        tone="dark"
        eyebrow="Fees"
        title={<>One fee. No surprises.</>}
        sub={
          <>
            Take the <strong className="font-semibold text-ink">free 3-min fit test</strong> first.
            The right plan is shown after your result, with a{" "}
            <strong className="font-semibold text-ink">counsellor on call.</strong>
          </>
        }
      />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto mt-8 flex max-w-7xl items-center justify-center gap-2 text-center"
      >
        <span
          className="h-1.5 w-1.5 motion-safe:animate-pulse rounded-full bg-sky-500"
          aria-hidden
        />
        <span className="font-mono text-micro font-semibold uppercase tracking-[0.2em] text-[#1e3a5f]/80">
          Next cohort: {NEXT_COHORT.label} · starts {NEXT_COHORT.startsLabel}
        </span>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto mt-6 max-w-7xl rounded-[24px] border border-slate-200/10 bg-surface-raised p-4 sm:rounded-[32px] sm:p-8 lg:p-12"
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
            title="ISO 9001 issuer"
            sub="Arzon Global Pvt. Ltd. · MCA + MSME"
          />
          <TrustItem icon={Receipt} title="All-inclusive" sub="One-time fee, no add-ons" />
          <TrustItem icon={Trophy} title="0% EMI" sub="3 / 6 / 9 months via Razorpay" />
        </motion.div>

        {/* Cost-per-placement reframe — kills sticker shock with arithmetic */}
        <motion.div variants={itemVariants}>
          <BreakevenReframe />
        </motion.div>
      </motion.div>
    </Section>
  );
}

/**
 * Cost-per-placement / break-even math. Anchored to the Career tier price
 * (₹24,999) and the median entry salary band (~₹3.2 LPA → ~₹26,667/mo).
 * Reframes "expensive course" → "12 days of your first paycheck".
 */
function BreakevenReframe() {
  const fee = 24999;
  const monthly = Math.round(320000 / 12); // ~₹26,667
  const breakevenDays = Math.ceil((fee / monthly) * 30); // ~28 days... show /first paycheck
  const daysOfMonth = Math.ceil((fee / monthly) * 30);

  return (
    <div className="relative mt-6 overflow-hidden rounded-2xl bg-[#0A1229] p-5 shadow-[0_24px_48px_-24px_rgba(10,18,41,0.55)] ring-1 ring-[#c9a84c]/30 sm:mt-8 sm:p-7">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle,rgba(201,168,76,0.55),transparent 70%)" }}
      />
      <div className="relative grid items-center gap-5 md:grid-cols-[auto_1fr_auto] md:gap-8">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#c9a84c]/15 ring-1 ring-[#c9a84c]/35">
            <Calculator className="h-5 w-5 text-[#f0d78c]" strokeWidth={2.25} />
          </span>
          <div>
            <p className="font-mono text-micro uppercase tracking-[0.22em] text-[#f0d78c]">
              The real math
            </p>
            <p className="font-display text-lg text-slate-50">Cost per placement</p>
          </div>
        </div>

        <div className="min-w-0">
          <p className="font-display text-h4 leading-snug text-slate-50 sm:text-h4">
            <span className="text-[#f0d78c]">₹{fee.toLocaleString()}</span>
            <span className="text-slate-100/75"> ÷ </span>
            <span className="text-slate-50">₹{monthly.toLocaleString()}</span>
            <span className="text-slate-100/80"> first-month salary = </span>
            <span className="text-[#f0d78c]">break-even in ~{breakevenDays} days.</span>
          </p>
          <p className="mt-1.5 text-meta text-slate-100/80">
            At the median entry-level offer (₹3.2 LPA), the full Career programme pays itself back
            inside your first month on the job. Everything after is upside.
          </p>
        </div>

        <div className="rounded-xl bg-white/[0.08] px-4 py-3 ring-1 ring-white/15 sm:min-w-[160px] sm:text-center">
          <p className="font-mono text-micro uppercase tracking-[0.22em] text-slate-100/70">
            Days to recover fee
          </p>
          <p className="font-display text-h2 text-[#f0d78c]">
            ~{daysOfMonth}
            <span className="ml-1 text-base text-slate-100/70">days</span>
          </p>
        </div>
      </div>
    </div>
  );
}
