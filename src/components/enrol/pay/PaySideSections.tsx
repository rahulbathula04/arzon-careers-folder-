import {
  ShieldCheck,
  GraduationCap,
  FileCheck2,
  Briefcase,
  BrainCircuit,
  FileText,
  Users,
  Target,
  CreditCard,
  MessageCircle,
  Monitor,
  CalendarCheck,
  Rocket,
  Star,
  Lock,
  BadgeCheck,
  ArrowRight,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatInr } from "@/data/enrolmentTiers";

/**
 * Sticky trust chips + rich supporting sections rendered in the payment
 * page's right column (and, on mobile, stacked below the checkout card).
 *
 * Purely presentational — every conversion-relevant number (fee, discount,
 * total, coupon) is passed in from the authoritative server intent.
 */

export function WhatYouGet() {
  const items: { icon: React.ElementType; label: string }[] = [
    { icon: GraduationCap, label: "Live training with mentors" },
    { icon: FileCheck2, label: "Internship + completion certificate" },
    { icon: Briefcase, label: "Portfolio-grade capstone projects" },
    { icon: BrainCircuit, label: "AI learning portal, 24×7" },
    { icon: FileText, label: "Recruiter-ready resume rebuild" },
    { icon: Users, label: "Mock interviews with feedback" },
    { icon: Target, label: "Placement support until offer" },
  ];
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow">
        What you get
      </p>
      <h2 className="mt-2 font-grotesk text-h4 font-bold text-white">
        Everything unlocks the moment payment clears.
      </h2>
      <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {items.map(({ icon: Icon, label }) => (
          <li
            key={label}
            className="flex items-start gap-2.5 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2.5"
          >
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/25">
              <Icon className="h-3.5 w-3.5 text-primary-glow" aria-hidden />
            </span>
            <span className="text-sm leading-snug text-white/85">{label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function AfterPaymentTimeline() {
  const steps: { icon: React.ElementType; title: string; sub?: string }[] = [
    { icon: CreditCard, title: "Payment confirmed", sub: "Razorpay receipt instantly" },
    { icon: MessageCircle, title: "WhatsApp welcome", sub: "From your counsellor in 30 min" },
    { icon: Monitor, title: "Learning portal access", sub: "Login + orientation email" },
    { icon: CalendarCheck, title: "Batch allocation", sub: "Cohort dates locked" },
    { icon: Rocket, title: "Training begins", sub: "Live sessions + projects" },
  ];
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow">
        After payment
      </p>
      <h2 className="mt-2 font-grotesk text-h4 font-bold text-white">
        Your first 72 hours, step by step.
      </h2>
      <ol className="mt-4 space-y-3">
        {steps.map((s, i) => {
          const Icon = s.icon;
          const isLast = i === steps.length - 1;
          return (
            <li key={s.title} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15 ring-1 ring-primary/30">
                  <Icon className="h-4 w-4 text-primary-glow" aria-hidden />
                </span>
                {!isLast && (
                  <span
                    aria-hidden
                    className="mt-1 h-6 w-px bg-gradient-to-b from-primary/40 to-transparent"
                  />
                )}
              </div>
              <div className="min-w-0 flex-1 pb-1">
                <p className="font-grotesk text-sm font-semibold text-white">{s.title}</p>
                {s.sub && <p className="mt-0.5 text-xs text-white/65">{s.sub}</p>}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export function TrustStrip() {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center">
      <div className="flex items-center justify-center gap-1 text-gold">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" aria-hidden />
        ))}
      </div>
      <p className="mt-2 font-grotesk text-sm font-semibold text-white">
        Trusted by learners across India
      </p>
      <p className="mt-1 text-micro leading-relaxed text-white/65">
        Secure payments via Razorpay · PCI-DSS Level 1 · 256-bit TLS encryption
      </p>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-micro uppercase tracking-wider text-white/70">
          <Lock className="h-3 w-3 text-eyebrow" /> Encrypted
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-micro uppercase tracking-wider text-white/70">
          <BadgeCheck className="h-3 w-3 text-eyebrow" /> GST invoice
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-micro uppercase tracking-wider text-white/70">
          <ShieldCheck className="h-3 w-3 text-eyebrow" /> 7-day onboarding
        </span>
      </div>
    </section>
  );
}

export function RoiCalculator({
  totalInr,
  monthlySalaryInr = 26667,
}: {
  totalInr: number;
  monthlySalaryInr?: number;
}) {
  const dailySalary = monthlySalaryInr / 30;
  const days = Math.max(1, Math.ceil(totalInr / dailySalary));
  return (
    <section className="rounded-2xl border border-accent-glow/25 bg-accent-glow/[0.06] p-5">
      <div className="flex items-center gap-2">
        <TrendingUp className="h-4 w-4 text-eyebrow" aria-hidden />
        <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-eyebrow-strong">
          ROI calculator
        </p>
      </div>
      <h2 className="mt-2 font-grotesk text-h4 font-bold text-white">
        Fee recovered in <span className="text-eyebrow-strong">≈ {days} days</span>.
      </h2>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <RoiCell label="Programme fee" value={formatInr(totalInr)} />
        <RoiCell label="First salary" value={`${formatInr(monthlySalaryInr)}/mo`} />
        <RoiCell label="Break-even" value={`${days} days`} accent />
      </div>
      <p className="mt-3 text-micro leading-relaxed text-white/65">
        Based on median first-month salary reported by peer graduates. Everything after break-even
        is upside.
      </p>
    </section>
  );
}

function RoiCell({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border px-2 py-3 ${
        accent ? "border-accent-glow/40 bg-accent-glow/10" : "border-white/10 bg-white/[0.03]"
      }`}
    >
      <p className="font-mono text-micro uppercase tracking-wider text-white/60">{label}</p>
      <p
        className={`mt-1 font-grotesk text-sm font-bold tabular-nums ${
          accent ? "text-eyebrow-strong" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

export function SuccessCard() {
  return (
    <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-primary/10 via-white/[0.03] to-transparent p-5">
      <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow">
        Student success
      </p>
      <p className="mt-3 font-display text-h4 leading-snug text-white">
        &ldquo;Placed in 63 days after the internship wrapped — the JD-mapped projects made the
        interview loop feel like revision.&rdquo;
      </p>
      <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/10 pt-3">
        <div>
          <p className="font-grotesk text-sm font-semibold text-white">
            Recent placement · career track
          </p>
          <p className="mt-0.5 text-xs text-white/60">Pharmacovigilance associate, mid-size CRO</p>
        </div>
        <div className="text-right">
          <p className="font-mono text-micro uppercase tracking-wider text-white/60">Package</p>
          <p className="font-grotesk text-sm font-bold text-eyebrow-strong">₹4.8 LPA</p>
        </div>
      </div>
    </section>
  );
}

export function PayFaq() {
  const items = [
    {
      q: "Is the coupon genuine?",
      a: "Every coupon is server-verified. The price you see is the exact amount Razorpay charges — computed from the server intent, not from the client. If the counsellor code you were given ever fails, message us on WhatsApp.",
    },
    {
      q: "Can I pay later or split the payment?",
      a: "Yes. Use Lock seat · ₹1,065 to reserve your spot today. Your counsellor sends the balance link on WhatsApp within 7 days. With ARZONPRIME60 applied, that balance is ₹5,000 (Essential), ₹7,000 (Career), or ₹9,000 (Elite).",
    },
    {
      q: "Can I get a GST invoice?",
      a: "Yes. A GST-compliant tax invoice is emailed within 24 hours of payment, addressed to the name and details you enter at checkout.",
    },
    {
      q: "When does my batch start?",
      a: "You'll be allocated to the nearest live cohort. Cohort dates land in your onboarding email; your counsellor confirms on WhatsApp.",
    },
    {
      q: "Is placement guaranteed?",
      a: "We commit to placement support — mock interviews, referrals, and recruiter intros — until you land an offer or opt out. We do not promise a specific company or CTC.",
    },
    {
      q: "Can I change my batch later?",
      a: "One free batch reschedule is included, subject to seat availability in the new cohort. Just ping your counsellor before your current batch begins.",
    },
  ];
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
      <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow">
        Frequently asked
      </p>
      <h2 className="mt-2 font-grotesk text-h3 font-bold text-white">Answers before you pay</h2>
      <Accordion type="single" collapsible className="mt-4">
        {items.map((it, i) => (
          <AccordionItem key={it.q} value={`q-${i}`} className="border-white/10">
            <AccordionTrigger className="text-left text-sm font-semibold text-white hover:no-underline">
              {it.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed text-white/70">
              {it.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

export function FinalCtaBlock({
  totalInr,
  paying,
  disabled,
  onPay,
  onFooterScrollHint,
}: {
  totalInr: number;
  paying: boolean;
  disabled: boolean;
  onPay: () => void;
  onFooterScrollHint?: () => void;
}) {
  return (
    <section className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent p-6 text-center sm:p-8">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 font-mono text-micro uppercase tracking-wider text-white/75">
        <Sparkles className="h-3 w-3 text-gold" /> Ready when you are
      </div>
      <h2 className="mt-3 font-display text-h2 text-white">
        Confirm your seat and start building.
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-white/70">
        One secure payment · instant portal access · onboarding within 30 minutes.
      </p>
      <button
        type="button"
        onClick={() => {
          onFooterScrollHint?.();
          onPay();
        }}
        disabled={disabled || paying}
        className="btn btn-primary btn-lg mx-auto mt-5 min-w-[260px] disabled:opacity-60"
      >
        <Lock className="mr-1.5 h-4 w-4" />
        {paying ? "Opening Razorpay…" : `Pay ${formatInr(totalInr)} securely`}
      </button>
      <p className="mt-3 text-micro text-white/65">
        UPI · Cards · EMI · Net Banking · Wallets, powered by Razorpay
      </p>
      <div className="mt-4 flex items-center justify-center gap-2 text-white/60">
        <ArrowRight className="h-3 w-3 rotate-90" aria-hidden />
        <span className="font-mono text-micro uppercase tracking-wider">
          100% secure · PCI-DSS Level 1
        </span>
      </div>
    </section>
  );
}
