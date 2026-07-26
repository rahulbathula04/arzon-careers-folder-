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
  const items = [
    {
      icon: GraduationCap,
      label: "Live Mentor Sessions (8 Weeks)",
      desc: "Interactive live classes with Senior PV & Medical Coding leads",
    },
    {
      icon: Briefcase,
      label: "Real-Data Capstone Projects",
      desc: "Work on live anonymized medical charts & safety reports",
    },
    {
      icon: FileCheck2,
      label: "Verifiable Internship Credential",
      desc: "ISO 9001 certified completion & QR-verified credential",
    },
    {
      icon: BrainCircuit,
      label: "24×7 AI Learning Portal Access",
      desc: "Unlimited practice labs & medical coding question bank",
    },
    {
      icon: FileText,
      label: "Recruiter-Ready ATS Resume Rebuild",
      desc: "Custom resume & LinkedIn optimization by hiring leads",
    },
    {
      icon: Target,
      label: "Direct Hiring Partner Referrals",
      desc: "Direct interview scheduling with Optum, Omega & Access",
    },
  ];

  return (
    <section className="rounded-3xl border border-white/10 bg-[#0E172F] p-6 sm:p-8 space-y-5 text-white shadow-xl">
      <div>
        <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-amber-400">
          INCLUDED PROGRAMME INFRASTRUCTURE
        </p>
        <h2 className="mt-1 font-serif text-2xl font-bold text-white">
          Everything that unlocks{" "}
          <span className="italic text-amber-300">upon payment confirmation</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        {items.map(({ icon: Icon, label, desc }) => (
          <div
            key={label}
            className="flex items-start gap-3 bg-white/[0.03] border border-white/10 rounded-2xl p-4 transition-all hover:bg-white/[0.06]"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/20 text-blue-300 border border-blue-400/30">
              <Icon className="h-4.5 w-4.5" />
            </span>
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-white leading-snug">{label}</p>
              <p className="text-[11px] text-slate-300 leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AfterPaymentTimeline() {
  const steps = [
    {
      icon: CreditCard,
      title: "Payment Verified",
      sub: "Instant digital receipt & GST tax invoice issued to your email",
    },
    {
      icon: MessageCircle,
      title: "Admissions Orientation",
      sub: "Academic counsellor outreach on WhatsApp within 30 minutes",
    },
    {
      icon: Monitor,
      title: "Portal Credential Provisioning",
      sub: "Personal LMS login, courseware & ACRI skill radar unlocked",
    },
    {
      icon: CalendarCheck,
      title: "Cohort Allocation",
      sub: "Live batch schedule, team assignment & mentor pairing locked",
    },
    {
      icon: Rocket,
      title: "Programme Kickoff",
      sub: "First live mentor class & hands-on capstone project launch",
    },
  ];

  return (
    <section className="rounded-3xl border border-white/10 bg-[#0E172F] p-6 sm:p-8 space-y-5 text-white shadow-xl">
      <div>
        <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-amber-400">
          FIRST 72 HOURS ROADMAP
        </p>
        <h2 className="mt-1 font-serif text-2xl font-bold text-white">
          What happens <span className="italic text-amber-300">immediately after payment</span>
        </h2>
      </div>
      <ol className="space-y-4">
        {steps.map((s, i) => {
          const Icon = s.icon;
          const isLast = i === steps.length - 1;
          return (
            <li key={s.title} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600/30 text-blue-300 border border-blue-400/40 font-bold font-mono text-xs">
                  {i + 1}
                </span>
                {!isLast && <span aria-hidden className="mt-2 h-6 w-px bg-white/15" />}
              </div>
              <div className="min-w-0 flex-1 pt-0.5 space-y-0.5">
                <p className="text-xs font-bold text-white flex items-center gap-2">
                  <span>{s.title}</span>
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">{s.sub}</p>
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
    <section className="rounded-3xl border border-white/10 bg-[#0E172F] p-6 sm:p-7 text-center space-y-4 text-white shadow-xl">
      <div className="flex items-center justify-center gap-1 text-amber-400">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden />
        ))}
      </div>
      <h3 className="font-serif text-xl font-bold text-white">
        Trusted by pharmacy & engineering candidates across India
      </h3>
      <p className="text-xs text-slate-300 leading-relaxed max-w-lg mx-auto">
        Processed via Razorpay Payments · PCI-DSS Level 1 Compliant · 256-bit TLS Encrypted Checkout
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
        <span className="inline-flex items-center gap-1.5 rounded-xl bg-white/5 border border-white/10 px-3 py-1.5 font-mono text-xs font-semibold text-slate-200">
          <Lock className="h-3.5 w-3.5 text-amber-400" /> TLS Encrypted
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-xl bg-white/5 border border-white/10 px-3 py-1.5 font-mono text-xs font-semibold text-slate-200">
          <BadgeCheck className="h-3.5 w-3.5 text-blue-400" /> Official GST Invoice
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-xl bg-white/5 border border-white/10 px-3 py-1.5 font-mono text-xs font-semibold text-slate-200">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> ISO 9001 Issuer
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
    <section className="rounded-3xl border border-blue-500/30 bg-[#0D1938] p-6 space-y-2 text-white shadow-lg">
      <div className="flex items-center gap-2.5">
        <TrendingUp className="h-5 w-5 text-amber-400" />
        <h3 className="font-serif text-lg font-bold text-white">Career Investment ROI Benchmark</h3>
      </div>
      <p className="text-xs text-slate-200 leading-relaxed">
        Based on an average entry placement salary of{" "}
        <strong className="font-mono text-amber-300">{formatInr(monthlySalaryInr)}/month</strong>,
        your programme fee of{" "}
        <strong className="font-mono text-white">{formatInr(totalInr)}</strong> is recovered in
        approximately{" "}
        <strong className="font-serif italic text-amber-300 text-sm font-bold">
          {days} working days
        </strong>
        .
      </p>
    </section>
  );
}

export function PayFaq() {
  const faqs = [
    {
      q: "When do I get access to the curriculum & live sessions?",
      a: "Instant access to portal courseware is granted as soon as payment clears. Your counsellor will onboard you into the live cohort workspace within 30 minutes.",
    },
    {
      q: "Can I upgrade my tier later?",
      a: "Yes, you can upgrade to a higher tier or add 1-on-1 mentorship sessions at any point during weeks 1 to 4 by paying the price difference.",
    },
    {
      q: "What payment options are supported?",
      a: "We support UPI (GPay, PhonePe, Paytm, BHIM), all major Indian Credit/Debit cards, Net Banking across 50+ banks, and popular Wallets via Razorpay.",
    },
    {
      q: "How do I receive my official tax receipt?",
      a: "An official GST tax invoice with full payment breakdown is automatically generated and emailed to your registered address upon checkout completion.",
    },
  ];

  return (
    <section className="rounded-3xl border border-white/10 bg-[#0E172F] p-6 sm:p-8 space-y-4 text-white shadow-xl">
      <div>
        <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-amber-400">
          ASSURANCE & CLARITY
        </p>
        <h2 className="mt-1 font-serif text-2xl font-bold text-white">
          Frequently Asked <span className="italic text-amber-300">Checkout Questions</span>
        </h2>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="border-b border-white/10">
            <AccordionTrigger className="text-left font-serif text-sm font-bold text-white hover:no-underline py-3.5">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-xs text-slate-300 leading-relaxed pb-4">
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
}: {
  totalInr: number;
  paying: boolean;
  disabled: boolean;
  onPay: () => void;
  onFooterScrollHint?: () => void;
}) {
  return (
    <section className="rounded-3xl border border-white/10 bg-gradient-to-r from-[#0E172F] to-[#14234C] p-6 sm:p-8 space-y-4 text-center text-white shadow-2xl">
      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
        Confirm & launch your <span className="italic text-amber-300">career transition</span>
      </h3>
      <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
        Complete your payment now for{" "}
        <strong className="font-serif text-white text-base">{formatInr(totalInr)}</strong>.
        Admissions onboarding starts immediately.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-md mx-auto">
        <button
          type="button"
          onClick={onPay}
          disabled={disabled || paying}
          style={{ color: "#FFFFFF" }}
          className="w-full sm:w-auto px-8 h-13 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-blue-900/50 transition-all cursor-pointer disabled:opacity-60"
        >
          {paying ? "Opening Checkout…" : `1-Click Pay ${formatInr(totalInr)} →`}
        </button>
      </div>
    </section>
  );
}
