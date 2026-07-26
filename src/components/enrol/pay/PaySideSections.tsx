import {
  ShieldCheck,
  GraduationCap,
  FileCheck2,
  Briefcase,
  BrainCircuit,
  FileText,
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
    <section className="rounded-3xl border border-slate-800 bg-[#0F172A] p-6 sm:p-8 space-y-6 text-white shadow-2xl">
      <div>
        <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-sky-400">
          INCLUDED PROGRAMME INFRASTRUCTURE
        </p>
        <h2 className="mt-1 font-sans text-2xl font-bold text-slate-50 tracking-tight">
          Everything that unlocks upon payment confirmation
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        {items.map(({ icon: Icon, label, desc }) => (
          <div
            key={label}
            className="flex items-start gap-3.5 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 transition-all hover:border-slate-700"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-sky-400 border border-blue-500/20">
              <Icon className="h-5 w-5" />
            </span>
            <div className="space-y-0.5 min-w-0">
              <p className="text-xs font-bold text-slate-100 leading-snug">{label}</p>
              <p className="text-[11px] text-slate-400 leading-relaxed font-medium">{desc}</p>
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
    <section className="rounded-3xl border border-slate-800 bg-[#0F172A] p-6 sm:p-8 space-y-6 text-white shadow-2xl">
      <div>
        <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-sky-400">
          FIRST 72 HOURS ROADMAP
        </p>
        <h2 className="mt-1 font-sans text-2xl font-bold text-slate-50 tracking-tight">
          What happens immediately after payment
        </h2>
      </div>
      <ol className="space-y-4">
        {steps.map((s, i) => {
          const isLast = i === steps.length - 1;
          return (
            <li key={s.title} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-sky-400 border border-blue-500/20 font-bold font-mono text-xs">
                  {i + 1}
                </span>
                {!isLast && <span aria-hidden className="mt-2 h-6 w-px bg-slate-800" />}
              </div>
              <div className="min-w-0 flex-1 pt-0.5 space-y-0.5">
                <p className="text-xs font-bold text-slate-100 flex items-center gap-2">
                  <span>{s.title}</span>
                </p>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">{s.sub}</p>
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
    <section className="rounded-3xl border border-slate-800 bg-[#0F172A] p-6 text-center space-y-4 text-white shadow-xl">
      <div className="flex items-center justify-center gap-1 text-amber-400">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden />
        ))}
      </div>
      <h3 className="font-sans text-lg font-bold text-slate-100 tracking-tight">
        Trusted by pharmacy & engineering candidates across India
      </h3>
      <p className="text-xs text-slate-400 leading-relaxed max-w-lg mx-auto font-medium">
        Processed via Razorpay Payments · PCI-DSS Level 1 Compliant · 256-bit TLS Encrypted Checkout
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
        <span className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 border border-slate-800 px-3 py-1.5 font-mono text-xs font-semibold text-slate-300">
          <Lock className="h-3.5 w-3.5 text-amber-400" /> TLS Encrypted
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 border border-slate-800 px-3 py-1.5 font-mono text-xs font-semibold text-slate-300">
          <BadgeCheck className="h-3.5 w-3.5 text-sky-400" /> Official GST Invoice
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 border border-slate-800 px-3 py-1.5 font-mono text-xs font-semibold text-slate-300">
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
    <section className="rounded-3xl border border-slate-800 bg-[#0F172A] p-6 space-y-2.5 text-white shadow-xl">
      <div className="flex items-center gap-2.5">
        <TrendingUp className="h-5 w-5 text-amber-400" />
        <h3 className="font-sans text-base font-bold text-slate-100 tracking-tight">
          Career Investment ROI Benchmark
        </h3>
      </div>
      <p className="text-xs text-slate-300 leading-relaxed font-medium">
        Based on an average entry placement salary of{" "}
        <strong className="font-mono text-amber-300 font-bold">{formatInr(monthlySalaryInr)}/month</strong>,
        your programme fee of{" "}
        <strong className="font-mono text-slate-100 font-bold">{formatInr(totalInr)}</strong> is recovered in
        approximately{" "}
        <strong className="font-mono text-emerald-400 text-xs font-bold">
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
    <section className="rounded-3xl border border-slate-800 bg-[#0F172A] p-6 sm:p-8 space-y-4 text-white shadow-2xl">
      <div>
        <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-sky-400">
          ASSURANCE & CLARITY
        </p>
        <h2 className="mt-1 font-sans text-2xl font-bold text-slate-50 tracking-tight">
          Frequently Asked Checkout Questions
        </h2>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="border-b border-slate-800">
            <AccordionTrigger className="text-left font-sans text-sm font-bold text-slate-200 hover:no-underline py-3.5">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-xs text-slate-400 leading-relaxed pb-4 font-medium">
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
    <section className="rounded-3xl border border-slate-800 bg-gradient-to-r from-[#0F172A] to-[#1E293B] p-6 sm:p-8 space-y-4 text-center text-white shadow-2xl">
      <h3 className="font-sans text-2xl sm:text-3xl font-bold text-slate-50 tracking-tight">
        Confirm & launch your career transition
      </h3>
      <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed font-medium">
        Complete your payment now for{" "}
        <strong className="font-mono text-white text-sm font-bold">{formatInr(totalInr)}</strong>.
        Admissions onboarding starts immediately.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-md mx-auto">
        <button
          type="button"
          onClick={onPay}
          disabled={disabled || paying}
          style={{ color: "#FFFFFF" }}
          className="w-full sm:w-auto px-8 h-12 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-900/40 transition-all cursor-pointer disabled:opacity-60"
        >
          {paying ? "Opening Checkout…" : `1-Click Pay ${formatInr(totalInr)} →`}
        </button>
      </div>
    </section>
  );
}
