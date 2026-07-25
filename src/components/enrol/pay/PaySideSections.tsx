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
  TrendingUp,
  Clock,
  Sparkles,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatInr } from "@/data/enrolmentTiers";

export function WhatYouGet() {
  const items: { icon: React.ElementType; label: string }[] = [
    { icon: GraduationCap, label: "Live training with industry mentors" },
    { icon: FileCheck2, label: "Verifiable internship certificate" },
    { icon: Briefcase, label: "Portfolio-grade capstone projects" },
    { icon: BrainCircuit, label: "24×7 AI learning portal access" },
    { icon: FileText, label: "Recruiter-ready ATS resume rebuild" },
    { icon: Users, label: "Mock interviews with feedback" },
    { icon: Target, label: "Placement support until offer" },
  ];
  return (
    <section className="rounded-3xl border border-slate-200/90 bg-white p-6 space-y-4 shadow-md">
      <div>
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#707C90]">
          INCLUDED INFRASTRUCTURE
        </p>
        <h2 className="mt-1 font-serif text-xl font-bold text-[#151C2E]">
          Everything unlocks <span className="italic text-[#8A6D1F]">upon payment confirmation</span>.
        </h2>
      </div>
      <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {items.map(({ icon: Icon, label }) => (
          <li
            key={label}
            className="flex items-center gap-3 bg-slate-50 border border-slate-200/60 rounded-xl p-3"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#2563EB]">
              <Icon className="h-4 w-4" aria-hidden />
            </span>
            <span className="text-xs font-semibold text-[#151C2E]">{label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function AfterPaymentTimeline() {
  const steps: { icon: React.ElementType; title: string; sub?: string }[] = [
    { icon: CreditCard, title: "Payment Verified", sub: "Instant digital receipt & confirmation" },
    { icon: MessageCircle, title: "Admissions Orientation", sub: "Counsellor outreach within 30 min" },
    { icon: Monitor, title: "Portal Credential Provisioning", sub: "Login credentials & learning roadmap" },
    { icon: CalendarCheck, title: "Cohort Allocation", sub: "Schedule & team assignment locked" },
    { icon: Rocket, title: "Programme Kickoff", sub: "Live technical modules & projects" },
  ];
  return (
    <section className="rounded-3xl border border-slate-200/90 bg-white p-6 space-y-4 shadow-md">
      <div>
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#707C90]">
          ONBOARDING SEQUENCE
        </p>
        <h2 className="mt-1 font-serif text-xl font-bold text-[#151C2E]">
          First 72 hours <span className="italic text-[#8A6D1F]">step by step</span>.
        </h2>
      </div>
      <ol className="space-y-3.5">
        {steps.map((s, i) => {
          const Icon = s.icon;
          const isLast = i === steps.length - 1;
          return (
            <li key={s.title} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB] border border-blue-100">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                {!isLast && <span aria-hidden className="mt-1 h-5 w-px bg-slate-200" />}
              </div>
              <div className="min-w-0 flex-1 pt-0.5">
                <p className="text-xs font-bold text-[#151C2E]">{s.title}</p>
                {s.sub && <p className="text-xs text-[#5B6472] mt-0.5">{s.sub}</p>}
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
    <section className="rounded-3xl border border-slate-200/90 bg-white p-6 text-center space-y-3 shadow-md">
      <div className="flex items-center justify-center gap-1 text-amber-500">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-500" aria-hidden />
        ))}
      </div>
      <h3 className="font-serif text-lg font-bold text-[#151C2E]">
        Trusted by pharmacy & engineering candidates across India
      </h3>
      <p className="text-xs text-[#5B6472] leading-relaxed">
        Processed via Razorpay Payments · PCI-DSS Level 1 Compliant · 256-bit TLS Encryption
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
        <span className="inline-flex items-center gap-1 rounded-xl bg-slate-50 border border-slate-200 px-3 py-1 font-mono text-[11px] font-bold text-[#151C2E]">
          <Lock className="h-3 w-3 text-emerald-600" /> TLS Encrypted
        </span>
        <span className="inline-flex items-center gap-1 rounded-xl bg-slate-50 border border-slate-200 px-3 py-1 font-mono text-[11px] font-bold text-[#151C2E]">
          <BadgeCheck className="h-3 w-3 text-emerald-600" /> GST Invoice
        </span>
        <span className="inline-flex items-center gap-1 rounded-xl bg-slate-50 border border-slate-200 px-3 py-1 font-mono text-[11px] font-bold text-[#151C2E]">
          <ShieldCheck className="h-3 w-3 text-emerald-600" /> 7-day Onboarding Guarantee
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
    <section className="rounded-3xl border border-slate-200/90 bg-slate-50 p-6 space-y-2">
      <div className="flex items-center gap-2">
        <TrendingUp className="h-4 w-4 text-[#2563EB]" />
        <h3 className="font-serif text-base font-bold text-[#151C2E]">Career ROI Benchmark</h3>
      </div>
      <p className="text-xs text-[#5B6472] leading-relaxed">
        Based on an average entry placement salary of{" "}
        <strong className="font-mono text-[#151C2E]">{formatInr(monthlySalaryInr)}/month</strong>, your
        programme fee of <strong className="font-mono text-[#151C2E]">{formatInr(totalInr)}</strong> is recovered in approximately{" "}
        <strong className="font-serif italic text-[#8A6D1F] text-sm font-bold">{days} working days</strong>.
      </p>
    </section>
  );
}

/** Pre-payment Trust Card shown on checkout before payment completes */
export function CohortSeatLockCard({ tierName }: { tierName: string }) {
  return (
    <div className="rounded-3xl border border-amber-200/80 bg-amber-50/50 p-6 text-left space-y-2 shadow-sm">
      <div className="flex items-center gap-2 text-amber-800">
        <Clock className="h-4 w-4 text-amber-600" />
        <span className="font-mono text-[10px] font-bold uppercase tracking-wider">
          LIVE ADMISSIONS GUARANTEE
        </span>
      </div>
      <h3 className="font-serif text-lg font-bold text-[#151C2E]">
        Lock your <span className="italic text-[#8A6D1F]">{tierName}</span> seat
      </h3>
      <p className="text-xs text-[#5B6472] leading-relaxed">
        Seats are allocated in order of payment timestamp. Completing checkout instantly secures your slot in the upcoming cohort.
      </p>
    </div>
  );
}

/** Post-payment Success Card exclusively for /enrol/success */
export function SuccessCard({ tierName = "Programme" }: { tierName?: string }) {
  return (
    <div className="rounded-3xl border border-emerald-300 bg-emerald-50/80 p-6 text-center space-y-2 shadow-md">
      <ShieldCheck className="mx-auto h-8 w-8 text-emerald-600" />
      <h2 className="font-serif text-xl font-bold text-[#151C2E]">Payment Confirmed</h2>
      <p className="text-xs text-[#5B6472]">
        Your seat in the <span className="font-semibold text-[#151C2E]">{tierName}</span> cohort is locked. Check your email & WhatsApp for orientation details.
      </p>
    </div>
  );
}

export function PayFaq() {
  const faqs = [
    {
      q: "When do I get access to the curriculum & live sessions?",
      a: "Instant access to orientation modules is granted as soon as payment clears. Your counsellor will onboard you into the live cohort workspace within 30 minutes.",
    },
    {
      q: "Can I upgrade my tier later?",
      a: "Yes, you can upgrade to a higher tier or add 1-on-1 mentorship sessions at any point during weeks 1 to 4 by paying the price difference.",
    },
    {
      q: "How does the ₹1,000 seat lock work?",
      a: "The seat lock reserves your position in the upcoming cohort for 7 days. Your counsellor will send you the balance Razorpay payment link on WhatsApp before the cutoff date.",
    },
    {
      q: "What payment options are supported?",
      a: "We support UPI (GPay, PhonePe, Paytm, BHIM), all major Indian Credit/Debit cards, Net Banking across 50+ banks, and popular Wallets via Razorpay.",
    },
  ];

  return (
    <section className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 space-y-4 shadow-md">
      <div>
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#707C90]">
          QUESTIONS & ASSURANCE
        </p>
        <h2 className="mt-1 font-serif text-2xl font-bold text-[#151C2E]">
          Frequently Asked <span className="italic text-[#8A6D1F]">Checkout Questions</span>
        </h2>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="border-b border-slate-100">
            <AccordionTrigger className="text-left font-serif text-sm font-bold text-[#151C2E] hover:no-underline py-3.5">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-xs text-[#5B6472] leading-relaxed pb-4">
              {faq.a}
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
  onFooterScrollHint: () => void;
}) {
  return (
    <section className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 space-y-4 text-center shadow-md">
      <h3 className="font-serif text-2xl font-bold text-[#151C2E]">
        Ready to lock your <span className="italic text-[#8A6D1F]">cohort seat?</span>
      </h3>
      <p className="text-xs text-[#5B6472] max-w-md mx-auto leading-relaxed">
        Complete your checkout now for <strong className="font-mono text-[#151C2E]">{formatInr(totalInr)}</strong>. Admissions onboarding starts immediately.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-md mx-auto">
        <button
          type="button"
          onClick={onPay}
          disabled={disabled || paying}
          className="w-full sm:w-auto px-8 h-12 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold text-sm shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02] disabled:opacity-60 cursor-pointer"
        >
          {paying ? "Opening Checkout…" : `1-Click Pay ${formatInr(totalInr)}`}
        </button>
      </div>
    </section>
  );
}
