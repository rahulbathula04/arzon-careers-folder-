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
    <section className="rounded-xl border border-white/10 bg-[#0f172a] p-6 space-y-4">
      <div>
        <p className="font-mono text-xs font-medium uppercase tracking-wider text-sky-400">
          Included Infrastructure
        </p>
        <h2 className="mt-1 text-lg font-semibold text-white">
          Everything unlocks immediately upon verification.
        </h2>
      </div>
      <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {items.map(({ icon: Icon, label }) => (
          <li
            key={label}
            className="flex items-center gap-3 rounded-lg border border-white/5 bg-slate-900/60 p-3"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-sky-500/10 border border-sky-500/20 text-sky-400">
              <Icon className="h-4 w-4" aria-hidden />
            </span>
            <span className="text-xs font-medium text-slate-300">{label}</span>
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
    <section className="rounded-xl border border-white/10 bg-[#0f172a] p-6 space-y-4">
      <div>
        <p className="font-mono text-xs font-medium uppercase tracking-wider text-sky-400">
          Onboarding Roadmap
        </p>
        <h2 className="mt-1 text-lg font-semibold text-white">
          First 72 hours execution sequence.
        </h2>
      </div>
      <ol className="space-y-3.5">
        {steps.map((s, i) => {
          const Icon = s.icon;
          const isLast = i === steps.length - 1;
          return (
            <li key={s.title} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-sky-500/10 border border-sky-500/20 text-sky-400">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                {!isLast && <span aria-hidden className="mt-1 h-5 w-px bg-white/10" />}
              </div>
              <div className="min-w-0 flex-1 pt-0.5">
                <p className="text-xs font-semibold text-white">{s.title}</p>
                {s.sub && <p className="text-xs text-slate-400 mt-0.5">{s.sub}</p>}
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
    <section className="rounded-xl border border-white/10 bg-[#0f172a] p-6 text-center space-y-3">
      <div className="flex items-center justify-center gap-1 text-amber-400">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-amber-400" aria-hidden />
        ))}
      </div>
      <h3 className="text-sm font-semibold text-white">
        Enterprise Security & Payment Encryption
      </h3>
      <p className="text-xs text-slate-400">
        Processed via Razorpay Payments · PCI-DSS Level 1 Compliant · 256-bit TLS Encryption
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
        <span className="inline-flex items-center gap-1 rounded bg-slate-900 border border-white/10 px-2.5 py-1 font-mono text-xs text-slate-300">
          <Lock className="h-3 w-3 text-emerald-400" /> TLS Encrypted
        </span>
        <span className="inline-flex items-center gap-1 rounded bg-slate-900 border border-white/10 px-2.5 py-1 font-mono text-xs text-slate-300">
          <BadgeCheck className="h-3 w-3 text-emerald-400" /> GST Compliant Invoice
        </span>
        <span className="inline-flex items-center gap-1 rounded bg-slate-900 border border-white/10 px-2.5 py-1 font-mono text-xs text-slate-300">
          <ShieldCheck className="h-3 w-3 text-emerald-400" /> Onboarding Guarantee
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
    <section className="rounded-xl border border-sky-500/20 bg-sky-500/5 p-6 space-y-2">
      <div className="flex items-center gap-2">
        <TrendingUp className="h-4 w-4 text-sky-400" />
        <h3 className="text-sm font-semibold text-white">Career ROI Benchmark</h3>
      </div>
      <p className="text-xs text-slate-300 leading-relaxed">
        Based on an average entry placement salary of{" "}
        <strong className="font-mono text-white">{formatInr(monthlySalaryInr)}/month</strong>, your
        programme fee of <strong className="font-mono text-white">{formatInr(totalInr)}</strong> is recovered in approximately{" "}
        <strong className="font-mono text-sky-400">{days} working days</strong>.
      </p>
    </section>
  );
}

export function SuccessCard({ tierName }: { tierName: string }) {
  return (
    <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center space-y-2">
      <ShieldCheck className="mx-auto h-8 w-8 text-emerald-400" />
      <h2 className="text-lg font-bold text-white">Payment Confirmed</h2>
      <p className="text-xs text-slate-300">
        Your seat in the <span className="font-semibold text-white">{tierName}</span> cohort is locked. Check your email & WhatsApp for orientation details.
      </p>
    </div>
  );
}

export function PayFaq() {
  const faqs = [
    {
      q: "When do I get access to the curriculum & live sessions?",
      a: "Instant access to the foundational orientation modules is granted as soon as payment clears. Your assigned admissions officer will onboard you into the live cohort workspace within 30 minutes.",
    },
    {
      q: "Can I upgrade my tier later?",
      a: "Yes. You can upgrade from Essential to Career or Elite tier by paying the differential amount directly from your student dashboard before live modules start.",
    },
    {
      q: "How does the ₹1,000 seat lock work?",
      a: "The ₹1,000 pre-registration locks your promotional price and reserves your seat in the current cohort. The remaining balance can be paid within 7 days before module access unlocks.",
    },
  ];

  return (
    <section className="rounded-xl border border-white/10 bg-[#0f172a] p-6 space-y-4">
      <h2 className="text-base font-semibold text-white">Frequently Asked Checkout Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="border-white/10">
            <AccordionTrigger className="text-xs font-medium text-slate-200 hover:text-white text-left py-3">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-xs text-slate-400 leading-relaxed">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

export function FinalCtaBlock() {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/60 p-6 text-center space-y-2">
      <p className="text-xs text-slate-400">Have questions before confirming your enrolment?</p>
      <p className="text-xs font-medium text-slate-200">
        Contact Admissions Desk: <span className="font-mono text-sky-400">+91 91217 62608</span>
      </p>
    </div>
  );
}
