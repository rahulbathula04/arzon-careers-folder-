import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Footer } from "@/components/landing/Footer";
import { ArzonV2PageHero } from "@/components/system/ArzonV2PageHero";
import { Nav } from "@/components/landing/Nav";
import { SITE, absUrl, PROOF, GOOGLE_FORM_URL, COUNSELLOR_PHONE } from "@/components/landing/constants";
import { PremiumChip } from "@/components/ui/PremiumChip";
import { HoverCard } from "@/components/motion/HoverCard";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import { trackEvent } from "@/lib/analytics";
import { useFunnelTracking } from "@/hooks/useFunnelTracking";
import {
  CheckCircle2,
  ShieldCheck,
  FileCheck,
  Users,
  Layers,
  Award,
  Building2,
  Landmark,
  BadgeCheck,
  Timer,
  X,
  Check,
  ArrowRight,
  Briefcase,
  Target,
  Microscope,
  ExternalLink,
  Sparkles,
  Lock,
  Star,
  MessageCircle,
  ChevronRight,
  TrendingUp,
  ShieldAlert,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/why-arzon")({
  head: () => {
    const title = "Why Arzon · How our career readiness system works";
    const desc =
      "See how Arzon connects role research, practical training, readiness assessment, evidence and career support.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `${SITE.origin}/why-arzon` },
        { property: "og:image", content: absUrl(SITE.ogImage.inauguration) },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `${SITE.origin}/why-arzon` }],
    };
  },
  component: WhyArzonPage,
});

const PILLARS = [
  {
    icon: Layers,
    title: "40/30/20/10 Deployment Model",
    badge: "Core Architecture",
    badgeColor: "text-[var(--arzon-teal-600)] bg-[var(--arzon-teal-100)] border-[#BCE6DE]",
    iconBg: "bg-[#DDF3EC] text-[var(--arzon-teal-600)]",
    body: "Every course splits into 40% domain, 30% live process, 20% real-tool exposure, 10% workplace readiness. No filler theory — the ratio itself is the guarantee.",
  },
  {
    icon: FileCheck,
    title: "JD-Sourced Syllabus",
    badge: "JD-Mirrored",
    badgeColor: "text-[var(--arzon-blue-700)] bg-sky-50 border-sky-200",
    iconBg: "bg-sky-100 text-[var(--arzon-blue-700)]",
    body: "We reverse-engineer syllabi from 100–200 live Indian JDs (IQVIA, Cognizant, Tier-1 Enterprise Tech, Parexel, ICON). The job description IS the blueprint.",
  },
  {
    icon: ShieldCheck,
    title: "ISO-Aligned Certification",
    badge: "ISO 9001:2015",
    badgeColor: "text-[var(--arzon-amber-600)] bg-[#FFF7ED] border-[#FED7AA]",
    iconBg: "bg-amber-100 text-[#8A6D1F]",
    body: "Each cohort's assessment maps to the ISO 9001 competency framework so certificates are recognised outside our own network.",
  },
  {
    icon: Award,
    title: "MCA-Registered Entity",
    badge: "Legal Standing",
    badgeColor: "text-[var(--arzon-blue-700)] bg-[var(--arzon-blue-100)] border-[#D5E3F5]",
    iconBg: "bg-purple-100 text-purple-700",
    body: "Arzon Global is a legally registered Indian company (MCA) — invoices, refund policy, and grievance escalation are on-record, not on a WhatsApp DM.",
  },
  {
    icon: Users,
    title: "Hiring-Partner Network",
    badge: "Partner Desk",
    badgeColor: "text-[var(--arzon-teal-600)] bg-[var(--arzon-teal-100)] border-[#BCE6DE]",
    iconBg: "bg-teal-100 text-teal-700",
    body: "TASK-partnered employers, cohort briefings, and JD-mirror interview loops so the recruiter conversation starts inside the programme, not after it.",
  },
  {
    icon: CheckCircle2,
    title: "Recruiter North-Star",
    badge: "Week-1 Ready",
    badgeColor: "text-[var(--arzon-teal-600)] bg-[var(--arzon-teal-100)] border-[#BCE6DE]",
    iconBg: "bg-[#DDF3EC] text-[var(--arzon-teal-600)]",
    body: 'We test everything against a single question: "would this candidate ship in week one?" If the answer isn\'t yes, the module gets cut.',
  },
];

const AUTHORITY = [
  {
    icon: Building2,
    label: "Legal Corporate Entity",
    value: "Arzon Global Labs Pvt Ltd",
    detail: "MCA-incorporated under Ministry of Corporate Affairs. CIN printed on all invoices & verifications.",
    verifyUrl: "https://www.mca.gov.in/mcafoportal/viewCompanyMasterData.do",
    verifyText: "Verify MCA Master Data ↗",
    accent: "text-[var(--arzon-blue-700)] border-sky-200 bg-sky-50",
  },
  {
    icon: Landmark,
    label: "Government Alignment",
    value: "TASK Collaboration",
    detail: "Telangana Academy for Skill & Knowledge (Dept of ITE&C) — launch event inaugurated by TASK CEO Dr. Srikanth Sinha.",
    verifyUrl: "/proof",
    verifyText: "View Launch Receipts ↗",
    accent: "text-teal-800 border-[#BCE6DE] bg-[var(--arzon-teal-100)]",
  },
  {
    icon: BadgeCheck,
    label: "Quality Framework",
    value: "ISO 9001:2015 Certified",
    detail: "Assessment and grading tied to external ISO quality management system for educational rigor.",
    verifyUrl: "/proof",
    verifyText: "View ISO Credential ↗",
    accent: "text-[var(--arzon-amber-600)] border-[#FED7AA] bg-[#FFF7ED]",
  },
  {
    icon: FileCheck,
    label: "MSME Enterprise",
    value: "UDYAM Government of India",
    detail: "Officially registered MSME under UDYAM with complete open-ledger transparency compliance.",
    verifyUrl: "https://udyamregistration.gov.in/",
    verifyText: "Verify UDYAM Portal ↗",
    accent: "text-[var(--arzon-teal-600)] border-[#BCE6DE] bg-[var(--arzon-teal-100)]",
  },
];

const METHODOLOGY_STEPS = [
  {
    n: "01",
    title: "Scrape Live JDs",
    body: "100–200 open Indian JDs per track from IQVIA, Cognizant, Tier-1 Enterprise Tech & Quant Fintech partners — refreshed each cohort.",
  },
  {
    n: "02",
    title: "Extract Skill Graph",
    body: "Every 'must-have', 'good-to-have' and tooling requirement is tagged. Anything appearing in less than 15% of JDs is cut immediately.",
  },
  {
    n: "03",
    title: "Synthesize Syllabus",
    body: "The top-frequency skills become the 40% domain block. Process (SOPs, workflows) becomes 30%. Tools become 20%. Workplace readiness fills 10%.",
  },
  {
    n: "04",
    title: "JD-Mirror Pressure Test",
    body: "Mock interviews scripted verbatim from the same JD pool. If a candidate can't ship in week one, the module gets rewritten before the next cohort.",
  },
];

const PROOF_ROWS = [
  { label: "Role research", value: "JD-linked", note: "Programme requirements are tied to role and job-description research." },
  { label: "Practical evidence", value: "Work samples", note: "Projects and task outputs can be reviewed as part of readiness." },
  { label: "Readiness assessment", value: "ACRI", note: "Assessment surfaces defined competency areas rather than course completion alone." },
  { label: "Certificate verification", value: "Public", note: "Certificate verification is available through the Arzon verification surface." },
  { label: "Commercial terms", value: "Published", note: "Programme pricing, refund and enrolment information are presented before payment." },
  { label: "Human support", value: "Counsellor", note: "Candidates can move from the digital assessment to a direct career conversation." },
];

const COMPARISON = [
  {
    row: "Live mentors from industry",
    arzon: true,
    youtube: false,
    udemy: false,
    coaching: "sometimes",
  },
  {
    row: "JD-sourced syllabus, refreshed each cohort",
    arzon: true,
    youtube: false,
    udemy: false,
    coaching: false,
  },
  {
    row: "Real de-identified case files (ICSR, eCRF, coding charts)",
    arzon: true,
    youtube: false,
    udemy: false,
    coaching: "rare",
  },
  {
    row: "ISO-aligned, publicly verifiable certificate",
    arzon: true,
    youtube: false,
    udemy: false,
    coaching: "sometimes",
  },
  {
    row: "Recruiter briefing loop before cohort ends",
    arzon: true,
    youtube: false,
    udemy: false,
    coaching: false,
  },
  {
    row: "MCA-registered entity, invoices, refund policy",
    arzon: true,
    youtube: false,
    udemy: "partial",
    coaching: "sometimes",
  },
  {
    row: "Cohort cap (attention per student)",
    arzon: "60",
    youtube: "∞",
    udemy: "∞",
    coaching: "150+",
  },
];

function Cell({ v }: { v: boolean | string }) {
  if (v === true)
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#DDF3EC] text-[var(--arzon-teal-600)] border border-[#BCE6DE] text-xs font-bold shadow-2xs">
        <Check className="h-3.5 w-3.5 text-emerald-600" /> Yes
      </span>
    );
  if (v === false)
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-200 text-xs font-bold shadow-2xs">
        <X className="h-3.5 w-3.5 text-rose-600" /> No
      </span>
    );
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-[var(--arzon-amber-600)] border border-[#FED7AA] text-xs font-bold shadow-2xs font-mono">
      {v}
    </span>
  );
}

function WhyArzonPage() {
  useFunnelTracking({ pageName: "why_arzon", category: "credibility" });

  return (
    <div className="arzon-v2-page min-h-screen bg-white text-[var(--arzon-ink)] tone-light isolate overflow-hidden font-sans antialiased">
      {/* Floating Header Nav */}
      <Nav />

      <ArzonV2PageHero
        eyebrow="WHY ARZON"
        title="A career platform built around role readiness, not course completion."
        description="Arzon combines career intelligence, practical programmes, assessment and evidence so a candidate can see what to build before deciding what to buy."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to="/career-engine" className="arzon-v2-button-primary">
            Get My Career Plan <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/courses" className="arzon-v2-button-secondary">
            Explore Programmes
          </Link>
        </div>
      </ArzonV2PageHero>

      <main className="arzon-v2-container pb-24 pt-12 space-y-16 sm:space-y-20">
        {/* Section 1: The 6 Core Architectural Pillars */}
        <section id="pillars" aria-labelledby="pillars-heading" className="space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <PremiumChip variant="navy" size="md">
              ARCHITECTURAL FOUNDATION
            </PremiumChip>
            <h2 id="pillars-heading" className="font-serif text-3xl sm:text-4xl font-bold text-[var(--arzon-ink)] tracking-tight">
              The 6 Core Architectural Principles
            </h2>
            <p className="text-sm text-[var(--arzon-ink-soft)] font-sans">
              Designed from first principles to structurally prohibit low-quality course seller habits.
            </p>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PILLARS.map(({ icon: Icon, title, badge, badgeColor, iconBg, body }) => (
              <StaggerItem key={title}>
                <HoverCard className="h-full rounded-2xl border border-[var(--arzon-border)] bg-white p-7 sm:p-8 flex flex-col justify-between space-y-6 shadow-xs hover:shadow-md transition-all">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBg}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className={`font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${badgeColor}`}>
                        {badge}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-[var(--arzon-ink)] leading-snug">
                      {title}
                    </h3>

                    <p className="text-sm text-[var(--arzon-ink-soft)] font-sans leading-relaxed font-normal">
                      {body}
                    </p>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* Section 2: Authority & Public Paperwork */}
        <section id="authority" aria-labelledby="authority-heading" className="space-y-8 scroll-mt-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--arzon-border)] pb-6">
            <div className="space-y-2">
              <PremiumChip variant="gold" size="md">
                INDEPENDENTLY VERIFIABLE DOCUMENTS
              </PremiumChip>
              <h2 id="authority-heading" className="font-serif text-3xl sm:text-5xl font-bold text-[var(--arzon-ink)] tracking-tight">
                Authority — The Paperwork
              </h2>
              <p className="text-sm sm:text-base text-[var(--arzon-ink-soft)] max-w-2xl font-sans">
                Every line below is on the public record. Ask for the certificate scan and we send it — zero gatekeeping.
              </p>
            </div>

            <Link
              to="/verify"
              className="inline-flex items-center gap-2.5 text-xs font-bold text-[var(--arzon-ink)] bg-[#1B3F8B] hover:bg-[#153270] px-5 py-3 rounded-xl font-mono shadow-md transition-all shrink-0 cursor-pointer"
            >
              <span>Go to Live Verifier</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {AUTHORITY.map(({ icon: Icon, label, value, detail, verifyUrl, verifyText, accent }) => (
              <HoverCard
                key={label}
                className="rounded-2xl border border-[var(--arzon-border)] bg-white p-7 sm:p-8 space-y-5 shadow-xs hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className={`flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-bold px-3 py-1 rounded-full border ${accent}`}>
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </div>
                  <span className="flex h-2.5 w-2.5 rounded-full bg-[var(--arzon-teal-100)]0" />
                </div>

                <div>
                  <h3 className="font-serif text-2xl font-bold text-[var(--arzon-ink)]">{value}</h3>
                  <p className="mt-2 text-xs sm:text-sm text-[var(--arzon-ink-soft)] leading-relaxed font-sans font-normal">{detail}</p>
                </div>

                <div className="pt-3 border-t border-[var(--arzon-border)]">
                  <a
                    href={verifyUrl}
                    target={verifyUrl.startsWith("http") ? "_blank" : undefined}
                    rel={verifyUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                    onClick={() => trackEvent("authority_verify_click", { label })}
                    className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[var(--arzon-blue-700)] hover:underline transition-colors"
                  >
                    <span>{verifyText}</span>
                  </a>
                </div>
              </HoverCard>
            ))}
          </div>
        </section>

        {/* Section 3: Methodology — The 40/30/20/10 Model & Pipeline */}
        <section id="methodology" aria-labelledby="methodology-heading" className="space-y-8 scroll-mt-28">
          <div className="space-y-2">
            <PremiumChip variant="navy" size="md">
              CURRICULUM REVERSE-ENGINEERING
            </PremiumChip>
            <h2 id="methodology-heading" className="font-serif text-3xl sm:text-5xl font-bold text-[var(--arzon-ink)] tracking-tight">
              Methodology — The JD-Mirror Engine
            </h2>
            <p className="text-sm sm:text-base text-[var(--arzon-ink-soft)] max-w-3xl leading-relaxed font-sans">
              Most edtech writes a syllabus once and re-runs it for years. We rebuild the syllabus every cohort by mirroring what Indian pharma, GCCs, and tech hiring desks are actively requiring.
            </p>
          </div>

          {/* 40/30/20/10 Ratio Visualizer */}
          <div className="rounded-2xl border border-[var(--arzon-border)] bg-white p-7 sm:p-10 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[var(--arzon-ink)]">
                  The 40/30/20/10 Deployment-Ready Ratio
                </h3>
                <p className="text-xs text-[var(--arzon-ink-muted)] font-sans mt-1">
                  Fixed structural ratio. If a topic cannot be defended in these 4 blocks, it does not ship.
                </p>
              </div>
              <span className="font-mono text-xs font-bold text-[var(--arzon-blue-700)] bg-sky-50 px-4 py-1.5 rounded-full border border-sky-200 w-fit shrink-0">
                LOCKED RECRUITMENT RATIO
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="rounded-xl border border-[#BCE6DE] bg-[var(--arzon-teal-100)]/70 p-5 space-y-2">
                <span className="font-mono text-3xl font-bold text-teal-800">40%</span>
                <p className="font-mono text-xs font-bold uppercase text-[var(--arzon-teal-600)] tracking-wider">Domain Science</p>
                <p className="text-xs text-[var(--arzon-ink-soft)] font-sans">Fundamentals &amp; Theory</p>
              </div>

              <div className="rounded-xl border border-sky-200 bg-sky-50/70 p-5 space-y-2">
                <span className="font-mono text-3xl font-bold text-[var(--arzon-blue-700)]">30%</span>
                <p className="font-mono text-xs font-bold uppercase text-[var(--arzon-blue-700)] tracking-wider">Live Process</p>
                <p className="text-xs text-[var(--arzon-ink-soft)] font-sans">SOPs &amp; Workflows</p>
              </div>

              <div className="rounded-xl border border-[#FED7AA] bg-[#FFF7ED]/70 p-5 space-y-2">
                <span className="font-mono text-3xl font-bold text-[#8A6D1F]">20%</span>
                <p className="font-mono text-xs font-bold uppercase text-[var(--arzon-amber-600)] tracking-wider">Real Tools</p>
                <p className="text-xs text-[var(--arzon-ink-soft)] font-sans">Argus / Python / SQL</p>
              </div>

              <div className="rounded-xl border border-[#D5E3F5] bg-[var(--arzon-blue-100)]/70 p-5 space-y-2">
                <span className="font-mono text-3xl font-bold text-purple-800">10%</span>
                <p className="font-mono text-xs font-bold uppercase text-[var(--arzon-blue-700)] tracking-wider">Workplace</p>
                <p className="text-xs text-[var(--arzon-ink-soft)] font-sans">JD-Mirror Mocks</p>
              </div>
            </div>
          </div>

          {/* 4-Step Pipeline Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {METHODOLOGY_STEPS.map(({ n, title, body }) => (
              <HoverCard
                key={n}
                className="rounded-2xl border border-[var(--arzon-border)] bg-white p-7 flex flex-col justify-between space-y-4 shadow-xs hover:shadow-md transition-all"
              >
                <div className="space-y-2.5">
                  <span className="font-mono text-3xl font-bold text-[var(--arzon-blue-700)]">{n}</span>
                  <h3 className="font-serif text-xl font-bold text-[var(--arzon-ink)]">{title}</h3>
                  <p className="text-xs sm:text-sm text-[var(--arzon-ink-soft)] leading-relaxed font-sans font-normal">{body}</p>
                </div>
              </HoverCard>
            ))}
          </div>
        </section>

        {/* Section 4: Proof — Verifiable Numbers Vault */}
        <section id="proof" aria-labelledby="proof-heading" className="space-y-8 scroll-mt-28">
          <div className="space-y-2">
            <PremiumChip variant="gold" size="md">
              PUBLIC EVIDENCE LEDGER
            </PremiumChip>
            <h2 id="proof-heading" className="font-serif text-3xl sm:text-5xl font-bold text-[var(--arzon-ink)] tracking-tight">
              Proof — What We Can Defend
            </h2>
            <p className="text-sm sm:text-base text-[var(--arzon-ink-soft)] max-w-3xl leading-relaxed font-sans">
              Numbers below reflect what is shipped today on the public record. Nothing here is aspirational or unverified.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[var(--arzon-border)] bg-white shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm font-sans border-collapse">
                <thead>
                  <tr className="border-b border-[var(--arzon-border)] bg-[var(--arzon-surface-subtle)] font-mono text-xs uppercase tracking-widest text-[var(--arzon-ink-soft)]">
                    <th className="py-4 px-6 font-bold">Metric / Claim</th>
                    <th className="py-4 px-6 font-bold text-[var(--arzon-blue-700)]">Verified Value</th>
                    <th className="py-4 px-6 font-bold">Verification Basis &amp; Source</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {PROOF_ROWS.map((r) => (
                    <tr key={r.label} className="hover:bg-[var(--arzon-surface-subtle)] transition-colors">
                      <td className="py-4 px-6 font-serif font-bold text-[var(--arzon-ink)] text-base">{r.label}</td>
                      <td className="py-4 px-6 font-mono font-bold text-[var(--arzon-blue-700)] text-base">{r.value}</td>
                      <td className="py-4 px-6 text-xs text-[var(--arzon-ink-soft)] leading-relaxed font-normal">{r.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 5: Honest Comparative Matrix */}
        <section id="compare" aria-labelledby="compare-heading" className="space-y-8 scroll-mt-28">
          <div className="space-y-2">
            <PremiumChip variant="navy" size="md">
              HONEST COMPETITIVE AUDIT
            </PremiumChip>
            <h2 id="compare-heading" className="font-serif text-3xl sm:text-5xl font-bold text-[var(--arzon-ink)] tracking-tight">
              Compared Honestly Against Alternatives
            </h2>
            <p className="text-sm sm:text-base text-[var(--arzon-ink-soft)] max-w-3xl leading-relaxed font-sans">
              If any row below flips for a competitor, tell us and we will update it live. Here is how we defend our value to prospective candidates.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[var(--arzon-border)] bg-white shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-sm font-sans border-collapse">
                <thead>
                  <tr className="border-b border-[var(--arzon-border)] bg-[var(--arzon-surface-subtle)] font-mono text-xs uppercase tracking-widest">
                    <th className="py-4 px-6 text-left font-bold text-[var(--arzon-ink-soft)]">Capability / Deliverable</th>
                    <th className="py-4 px-4 text-center font-bold text-[var(--arzon-blue-700)] bg-sky-50 border-x border-sky-100">Arzon Global</th>
                    <th className="py-4 px-4 text-center font-semibold text-[var(--arzon-ink-muted)]">YouTube</th>
                    <th className="py-4 px-4 text-center font-semibold text-[var(--arzon-ink-muted)]">Udemy / Coursera</th>
                    <th className="py-4 px-4 text-center font-semibold text-[var(--arzon-ink-muted)]">Local Coaching</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {COMPARISON.map((r) => (
                    <tr key={r.row} className="hover:bg-[var(--arzon-surface-subtle)] transition-colors">
                      <th scope="row" className="py-4 px-6 text-left font-serif font-bold text-[var(--arzon-ink)] text-base">
                        {r.row}
                      </th>
                      <td className="py-4 px-4 text-center bg-sky-50/50 border-x border-sky-100">
                        <Cell v={r.arzon} />
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Cell v={r.youtube} />
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Cell v={r.udemy} />
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Cell v={r.coaching} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 6: Quality Control & Cohort Hard Cap */}
        <section id="scarcity" aria-labelledby="scarcity-heading" className="space-y-8 scroll-mt-28">
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <PremiumChip variant="gold" size="md">
              QUALITY CONTROL HARD CAP
            </PremiumChip>
            <h2 id="scarcity-heading" className="font-serif text-3xl sm:text-5xl font-bold text-[var(--arzon-ink)] tracking-tight">
              Why Cohort Seats Are Capped
            </h2>
            <p className="text-sm sm:text-base text-[var(--arzon-ink-soft)] font-sans">
              We structurally limit cohort capacity to guarantee individual mentor feedback.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <HoverCard className="rounded-2xl border border-[var(--arzon-border)] bg-white p-8 text-center space-y-3 shadow-xs hover:shadow-md transition-all">
              <p className="font-serif text-6xl font-bold text-[#8A6D1F]">60</p>
              <p className="font-serif text-xl font-bold text-[var(--arzon-ink)]">Students Per Cohort</p>
              <p className="text-xs sm:text-sm text-[var(--arzon-ink-soft)] leading-relaxed font-sans">Hard cap enforced on every track. We never over-enroll or crowd mentor sessions.</p>
            </HoverCard>

            <HoverCard className="rounded-2xl border border-[var(--arzon-border)] bg-white p-8 text-center space-y-3 shadow-xs hover:shadow-md transition-all">
              <p className="font-serif text-6xl font-bold text-[var(--arzon-blue-700)]">&lt;15</p>
              <p className="font-serif text-xl font-bold text-[var(--arzon-ink)]">Learners Per Breakout</p>
              <p className="text-xs sm:text-sm text-[var(--arzon-ink-soft)] leading-relaxed font-sans">Small group code reviews and process evaluation for direct 1:1 attention.</p>
            </HoverCard>

            <HoverCard className="rounded-2xl border border-[var(--arzon-border)] bg-white p-8 text-center space-y-3 shadow-xs hover:shadow-md transition-all">
              <p className="font-serif text-6xl font-bold text-[var(--arzon-teal-600)]">1</p>
              <p className="font-serif text-xl font-bold text-[var(--arzon-ink)]">Cohort Per Quarter</p>
              <p className="text-xs sm:text-sm text-[var(--arzon-ink-soft)] leading-relaxed font-sans">Focused execution ensures every candidate receives full placement routing support.</p>
            </HoverCard>
          </div>

          {/* Anti-Gimmick Transparency Box */}
          <div className="rounded-2xl border border-[var(--arzon-border)] bg-white p-7 sm:p-10 space-y-6 shadow-xs">
            <div className="flex items-center gap-3 border-b border-[var(--arzon-border)] pb-4">
              <ShieldAlert className="h-6 w-6 text-rose-600 shrink-0" />
              <div>
                <h3 className="font-serif text-2xl font-bold text-[var(--arzon-ink)]">What We Do NOT Claim</h3>
                <p className="text-xs text-[var(--arzon-ink-muted)] font-mono uppercase tracking-wider mt-0.5">Our Anti-Gimmick Transparency Pledge</p>
              </div>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-[var(--arzon-ink-soft)] font-sans">
              <li className="flex items-start gap-3">
                <X className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
                <span>No fabricated student testimonials, stock photos, or fake quotes.</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
                <span>No unverified aggregate star ratings on marketing surfaces.</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
                <span>No "learn in 30 days" shortcuts — every track requires real work.</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
                <span>No 100% placement guarantees — outcomes are reported per cohort.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 7: Conversion CTA Banner */}
        <section className="rounded-2xl border border-[var(--arzon-border)] bg-white p-8 sm:p-14 text-center space-y-6 shadow-lg max-w-4xl mx-auto relative overflow-hidden">
          <div className="space-y-3 relative z-10">
            <div className="inline-flex justify-center">
              <PremiumChip variant="gold" size="md">
                🔥 REGISTRATION OPEN · LIVE OPENINGS AT TIER-1 TECH ENTERPRISES
              </PremiumChip>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[var(--arzon-ink)] leading-tight">
              Ready to Put Yourself in the Pipeline?
            </h2>

            <p className="text-base sm:text-lg text-[var(--arzon-ink-soft)] max-w-2xl mx-auto font-sans leading-relaxed">
              Submit your candidate dossier in under 2 minutes for immediate partner desk screening. Free application.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("why_arzon_page_cta_click", { target: "google_form" })}
              className="h-13 px-8 inline-flex items-center justify-center gap-3 text-base font-extrabold text-[var(--arzon-ink)] rounded-xl bg-[#1B3F8B] hover:bg-[#153270] shadow-md shadow-[#1B3F8B]/25 transition-all cursor-pointer w-full sm:w-auto"
            >
              <span>Apply Now (Free Form)</span>
              <ExternalLink className="h-4 w-4 text-[var(--arzon-ink)]" />
            </a>

            <Link
              to="/enrol"
              className="h-13 px-7 inline-flex items-center justify-center gap-2.5 text-sm font-bold text-stone-800 hover:text-stone-950 bg-white hover:bg-[var(--arzon-surface-subtle)] rounded-xl border border-[var(--arzon-border)] transition-all w-full sm:w-auto shadow-xs"
            >
              <span>Browse Enrolment Tiers</span>
              <ArrowRight className="h-4 w-4 text-stone-400" />
            </Link>
          </div>

          <div className="pt-4 border-t border-[var(--arzon-border)] flex items-center justify-center gap-2 text-xs sm:text-sm text-[var(--arzon-ink-soft)] relative z-10 font-sans">
            <MessageCircle className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>Questions? Chat with admissions at </span>
            <a
              href={`https://wa.me/${COUNSELLOR_PHONE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[var(--arzon-teal-600)] hover:underline"
            >
              +91 91212 83638
            </a>
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
