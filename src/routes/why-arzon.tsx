import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Footer } from "@/components/landing/Footer";
import { Nav } from "@/components/landing/Nav";
import { SITE, absUrl, PROOF, GOOGLE_FORM_URL, COUNSELLOR_PHONE } from "@/components/landing/constants";
import { PremiumChip } from "@/components/ui/PremiumChip";
import { HoverCard } from "@/components/motion/HoverCard";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import { trackEvent } from "@/lib/analytics";
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
    const title = "Why Arzon · Proof, Methodology & Credibility";
    const desc =
      "One page for how Arzon Global is built: the 40/30/20/10 deployment-ready model, JD-sourced curriculum, ISO-aligned certification, MCA registration and hiring-partner network.";
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
    badgeColor: "text-emerald-900 bg-emerald-50 border-emerald-200",
    iconBg: "bg-emerald-100 text-emerald-700",
    body: "Every course splits into 40% domain, 30% live process, 20% real-tool exposure, 10% workplace readiness. No filler theory — the ratio itself is the guarantee.",
  },
  {
    icon: FileCheck,
    title: "JD-Sourced Syllabus",
    badge: "JD-Mirrored",
    badgeColor: "text-[#1B3F8B] bg-sky-50 border-sky-200",
    iconBg: "bg-sky-100 text-[#1B3F8B]",
    body: "We reverse-engineer syllabi from 100–200 live Indian JDs (IQVIA, Cognizant, Tier-1 Enterprise Tech, Parexel, ICON). The job description IS the blueprint.",
  },
  {
    icon: ShieldCheck,
    title: "ISO-Aligned Certification",
    badge: "ISO 9001:2015",
    badgeColor: "text-amber-900 bg-amber-50 border-amber-200",
    iconBg: "bg-amber-100 text-[#8A6D1F]",
    body: "Each cohort's assessment maps to the ISO 9001 competency framework so certificates are recognised outside our own network.",
  },
  {
    icon: Award,
    title: "MCA-Registered Entity",
    badge: "Legal Standing",
    badgeColor: "text-purple-900 bg-purple-50 border-purple-200",
    iconBg: "bg-purple-100 text-purple-700",
    body: "Arzon Global is a legally registered Indian company (MCA) — invoices, refund policy, and grievance escalation are on-record, not on a WhatsApp DM.",
  },
  {
    icon: Users,
    title: "Hiring-Partner Network",
    badge: "Partner Desk",
    badgeColor: "text-teal-900 bg-teal-50 border-teal-200",
    iconBg: "bg-teal-100 text-teal-700",
    body: "TASK-partnered employers, cohort briefings, and JD-mirror interview loops so the recruiter conversation starts inside the programme, not after it.",
  },
  {
    icon: CheckCircle2,
    title: "Recruiter North-Star",
    badge: "Week-1 Ready",
    badgeColor: "text-emerald-900 bg-emerald-50 border-emerald-200",
    iconBg: "bg-emerald-100 text-emerald-700",
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
    accent: "text-[#1B3F8B] border-sky-200 bg-sky-50",
  },
  {
    icon: Landmark,
    label: "Government Alignment",
    value: "TASK Collaboration",
    detail: "Telangana Academy for Skill & Knowledge (Dept of ITE&C) — launch event inaugurated by TASK CEO Dr. Srikanth Sinha.",
    verifyUrl: "/proof",
    verifyText: "View Launch Receipts ↗",
    accent: "text-teal-800 border-teal-200 bg-teal-50",
  },
  {
    icon: BadgeCheck,
    label: "Quality Framework",
    value: "ISO 9001:2015 Certified",
    detail: "Assessment and grading tied to external ISO quality management system for educational rigor.",
    verifyUrl: "/proof",
    verifyText: "View ISO Credential ↗",
    accent: "text-amber-900 border-amber-200 bg-amber-50",
  },
  {
    icon: FileCheck,
    label: "MSME Enterprise",
    value: "UDYAM Government of India",
    detail: "Officially registered MSME under UDYAM with complete open-ledger transparency compliance.",
    verifyUrl: "https://udyamregistration.gov.in/",
    verifyText: "Verify UDYAM Portal ↗",
    accent: "text-emerald-900 border-emerald-200 bg-emerald-50",
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
  { label: "Learners Trained", value: "12,000+", note: "Across clinical and AI/ML programs in India." },
  { label: "AmbitionBox Rating", value: "4.8 / 5.0", note: "30+ verified employee reviews (4.6 overall rating)." },
  { label: "Cohorts Completed", value: "12+", note: "PV, MC, CR and AI/ML tracks across 2024–2026." },
  {
    label: "Hiring Partners Briefed",
    value: "40+",
    note: "GCCs, CROs, hospitals, and tech hubs across Hyderabad, Bengaluru, Pune.",
  },
  {
    label: "Transparency Policy",
    value: "Open-Ledger",
    note: "Enrollments, certifications & refunds independently verifiable.",
  },
  {
    label: "Certificate Verification",
    value: "Public URL + QR",
    note: "Every certificate resolves live at arzoncareers.in/verify.",
  },
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
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold shadow-2xs">
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
    <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold shadow-2xs font-mono">
      {v}
    </span>
  );
}

function WhyArzonPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] tone-light isolate overflow-hidden font-sans antialiased">
      {/* Floating Header Nav */}
      <Nav />

      <main className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-24 space-y-20 sm:space-y-28">
        
        {/* Page Hero Section */}
        <header className="text-center space-y-6 max-w-4xl mx-auto">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-200 bg-sky-50 text-[#1B3F8B] shadow-2xs">
              <Sparkles className="h-4 w-4 text-[#1B3F8B] motion-safe:animate-pulse" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em]">
                LIVE PROOF LEDGER · 12,000+ CANDIDATES VERIFIED
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#1A1A1A] leading-[1.12]">
              Why Arzon Global.<br />
              <span className="italic font-normal text-[#1B3F8B]">
                The Standard for Proof &amp; Workforce Readiness.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-base sm:text-xl text-stone-700 font-sans leading-relaxed max-w-3xl mx-auto font-normal">
              Six honest reasons candidates and hiring desks trust our cohorts. Every single claim is independently verifiable — zero anonymous testimonials, zero manufactured badges, zero scarcity tricks.
            </p>
          </Reveal>

          {/* Hero Stats Matrix */}
          <Reveal delay={0.15}>
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
              <HoverCard className="p-5 rounded-2xl border border-stone-200 bg-white shadow-xs text-center transition-all hover:shadow-md hover:border-[#1B3F8B]/40">
                <p className="font-serif text-3xl sm:text-4xl font-bold text-[#1B3F8B]">12,000+</p>
                <p className="font-mono text-[10px] sm:text-[11px] text-stone-500 uppercase tracking-widest mt-1.5 font-bold">Learners Trained</p>
              </HoverCard>

              <HoverCard className="p-5 rounded-2xl border border-stone-200 bg-white shadow-xs text-center transition-all hover:shadow-md hover:border-amber-400">
                <div className="flex items-center justify-center gap-1.5 text-[#8A6D1F] font-serif text-3xl sm:text-4xl font-bold">
                  <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                  <span>4.8 / 5</span>
                </div>
                <p className="font-mono text-[10px] sm:text-[11px] text-stone-500 uppercase tracking-widest mt-1.5 font-bold">AmbitionBox Rating</p>
              </HoverCard>

              <HoverCard className="p-5 rounded-2xl border border-stone-200 bg-white shadow-xs text-center transition-all hover:shadow-md hover:border-sky-400">
                <p className="font-serif text-3xl sm:text-4xl font-bold text-sky-700">ISO 9001</p>
                <p className="font-mono text-[10px] sm:text-[11px] text-stone-500 uppercase tracking-widest mt-1.5 font-bold">Certified Standard</p>
              </HoverCard>

              <HoverCard className="p-5 rounded-2xl border border-stone-200 bg-white shadow-xs text-center transition-all hover:shadow-md hover:border-emerald-500">
                <p className="font-serif text-3xl sm:text-4xl font-bold text-emerald-700">MCA Legal</p>
                <p className="font-mono text-[10px] sm:text-[11px] text-stone-500 uppercase tracking-widest mt-1.5 font-bold">Incorporated Entity</p>
              </HoverCard>
            </div>
          </Reveal>
        </header>

        {/* Section 1: The 6 Core Architectural Pillars */}
        <section id="pillars" aria-labelledby="pillars-heading" className="space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <PremiumChip variant="navy" size="md">
              ARCHITECTURAL FOUNDATION
            </PremiumChip>
            <h2 id="pillars-heading" className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight">
              The 6 Core Architectural Principles
            </h2>
            <p className="text-sm text-stone-600 font-sans">
              Designed from first principles to structurally prohibit low-quality course seller habits.
            </p>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PILLARS.map(({ icon: Icon, title, badge, badgeColor, iconBg, body }) => (
              <StaggerItem key={title}>
                <HoverCard className="h-full rounded-2xl border border-stone-200 bg-white p-7 sm:p-8 flex flex-col justify-between space-y-6 shadow-xs hover:shadow-md transition-all">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBg}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className={`font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${badgeColor}`}>
                        {badge}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-[#1A1A1A] leading-snug">
                      {title}
                    </h3>

                    <p className="text-sm text-stone-700 font-sans leading-relaxed font-normal">
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
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-6">
            <div className="space-y-2">
              <PremiumChip variant="gold" size="md">
                INDEPENDENTLY VERIFIABLE DOCUMENTS
              </PremiumChip>
              <h2 id="authority-heading" className="font-serif text-3xl sm:text-5xl font-bold text-[#1A1A1A] tracking-tight">
                Authority — The Paperwork
              </h2>
              <p className="text-sm sm:text-base text-stone-700 max-w-2xl font-sans">
                Every line below is on the public record. Ask for the certificate scan and we send it — zero gatekeeping.
              </p>
            </div>

            <Link
              to="/verify"
              className="inline-flex items-center gap-2.5 text-xs font-bold text-white bg-[#1B3F8B] hover:bg-[#153270] px-5 py-3 rounded-xl font-mono shadow-md transition-all shrink-0 cursor-pointer"
            >
              <span>Go to Live Verifier</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {AUTHORITY.map(({ icon: Icon, label, value, detail, verifyUrl, verifyText, accent }) => (
              <HoverCard
                key={label}
                className="rounded-2xl border border-stone-200 bg-white p-7 sm:p-8 space-y-5 shadow-xs hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className={`flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-bold px-3 py-1 rounded-full border ${accent}`}>
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </div>
                  <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </div>

                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">{value}</h3>
                  <p className="mt-2 text-xs sm:text-sm text-stone-700 leading-relaxed font-sans font-normal">{detail}</p>
                </div>

                <div className="pt-3 border-t border-stone-100">
                  <a
                    href={verifyUrl}
                    target={verifyUrl.startsWith("http") ? "_blank" : undefined}
                    rel={verifyUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                    onClick={() => trackEvent("authority_verify_click", { label })}
                    className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#1B3F8B] hover:underline transition-colors"
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
            <h2 id="methodology-heading" className="font-serif text-3xl sm:text-5xl font-bold text-[#1A1A1A] tracking-tight">
              Methodology — The JD-Mirror Engine
            </h2>
            <p className="text-sm sm:text-base text-stone-700 max-w-3xl leading-relaxed font-sans">
              Most edtech writes a syllabus once and re-runs it for years. We rebuild the syllabus every cohort by mirroring what Indian pharma, GCCs, and tech hiring desks are actively requiring.
            </p>
          </div>

          {/* 40/30/20/10 Ratio Visualizer */}
          <div className="rounded-2xl border border-stone-200 bg-white p-7 sm:p-10 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">
                  The 40/30/20/10 Deployment-Ready Ratio
                </h3>
                <p className="text-xs text-stone-500 font-sans mt-1">
                  Fixed structural ratio. If a topic cannot be defended in these 4 blocks, it does not ship.
                </p>
              </div>
              <span className="font-mono text-xs font-bold text-[#1B3F8B] bg-sky-50 px-4 py-1.5 rounded-full border border-sky-200 w-fit shrink-0">
                LOCKED RECRUITMENT RATIO
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="rounded-xl border border-teal-200 bg-teal-50/70 p-5 space-y-2">
                <span className="font-mono text-3xl font-bold text-teal-800">40%</span>
                <p className="font-mono text-xs font-bold uppercase text-teal-900 tracking-wider">Domain Science</p>
                <p className="text-xs text-stone-600 font-sans">Fundamentals &amp; Theory</p>
              </div>

              <div className="rounded-xl border border-sky-200 bg-sky-50/70 p-5 space-y-2">
                <span className="font-mono text-3xl font-bold text-[#1B3F8B]">30%</span>
                <p className="font-mono text-xs font-bold uppercase text-[#1B3F8B] tracking-wider">Live Process</p>
                <p className="text-xs text-stone-600 font-sans">SOPs &amp; Workflows</p>
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-5 space-y-2">
                <span className="font-mono text-3xl font-bold text-[#8A6D1F]">20%</span>
                <p className="font-mono text-xs font-bold uppercase text-amber-900 tracking-wider">Real Tools</p>
                <p className="text-xs text-stone-600 font-sans">Argus / Python / SQL</p>
              </div>

              <div className="rounded-xl border border-purple-200 bg-purple-50/70 p-5 space-y-2">
                <span className="font-mono text-3xl font-bold text-purple-800">10%</span>
                <p className="font-mono text-xs font-bold uppercase text-purple-900 tracking-wider">Workplace</p>
                <p className="text-xs text-stone-600 font-sans">JD-Mirror Mocks</p>
              </div>
            </div>
          </div>

          {/* 4-Step Pipeline Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {METHODOLOGY_STEPS.map(({ n, title, body }) => (
              <HoverCard
                key={n}
                className="rounded-2xl border border-stone-200 bg-white p-7 flex flex-col justify-between space-y-4 shadow-xs hover:shadow-md transition-all"
              >
                <div className="space-y-2.5">
                  <span className="font-mono text-3xl font-bold text-[#1B3F8B]">{n}</span>
                  <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">{title}</h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans font-normal">{body}</p>
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
            <h2 id="proof-heading" className="font-serif text-3xl sm:text-5xl font-bold text-[#1A1A1A] tracking-tight">
              Proof — What We Can Defend
            </h2>
            <p className="text-sm sm:text-base text-stone-700 max-w-3xl leading-relaxed font-sans">
              Numbers below reflect what is shipped today on the public record. Nothing here is aspirational or unverified.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm font-sans border-collapse">
                <thead>
                  <tr className="border-b border-stone-200 bg-stone-50 font-mono text-xs uppercase tracking-widest text-stone-600">
                    <th className="py-4 px-6 font-bold">Metric / Claim</th>
                    <th className="py-4 px-6 font-bold text-[#1B3F8B]">Verified Value</th>
                    <th className="py-4 px-6 font-bold">Verification Basis &amp; Source</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {PROOF_ROWS.map((r) => (
                    <tr key={r.label} className="hover:bg-stone-50 transition-colors">
                      <td className="py-4 px-6 font-serif font-bold text-[#1A1A1A] text-base">{r.label}</td>
                      <td className="py-4 px-6 font-mono font-bold text-[#1B3F8B] text-base">{r.value}</td>
                      <td className="py-4 px-6 text-xs text-stone-600 leading-relaxed font-normal">{r.note}</td>
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
            <h2 id="compare-heading" className="font-serif text-3xl sm:text-5xl font-bold text-[#1A1A1A] tracking-tight">
              Compared Honestly Against Alternatives
            </h2>
            <p className="text-sm sm:text-base text-stone-700 max-w-3xl leading-relaxed font-sans">
              If any row below flips for a competitor, tell us and we will update it live. Here is how we defend our value to prospective candidates.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-sm font-sans border-collapse">
                <thead>
                  <tr className="border-b border-stone-200 bg-stone-50 font-mono text-xs uppercase tracking-widest">
                    <th className="py-4 px-6 text-left font-bold text-stone-700">Capability / Deliverable</th>
                    <th className="py-4 px-4 text-center font-bold text-[#1B3F8B] bg-sky-50 border-x border-sky-100">Arzon Global</th>
                    <th className="py-4 px-4 text-center font-semibold text-stone-500">YouTube</th>
                    <th className="py-4 px-4 text-center font-semibold text-stone-500">Udemy / Coursera</th>
                    <th className="py-4 px-4 text-center font-semibold text-stone-500">Local Coaching</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {COMPARISON.map((r) => (
                    <tr key={r.row} className="hover:bg-stone-50 transition-colors">
                      <th scope="row" className="py-4 px-6 text-left font-serif font-bold text-[#1A1A1A] text-base">
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
            <h2 id="scarcity-heading" className="font-serif text-3xl sm:text-5xl font-bold text-[#1A1A1A] tracking-tight">
              Why Cohort Seats Are Capped
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-sans">
              We structurally limit cohort capacity to guarantee individual mentor feedback.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <HoverCard className="rounded-2xl border border-stone-200 bg-white p-8 text-center space-y-3 shadow-xs hover:shadow-md transition-all">
              <p className="font-serif text-6xl font-bold text-[#8A6D1F]">60</p>
              <p className="font-serif text-xl font-bold text-[#1A1A1A]">Students Per Cohort</p>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">Hard cap enforced on every track. We never over-enroll or crowd mentor sessions.</p>
            </HoverCard>

            <HoverCard className="rounded-2xl border border-stone-200 bg-white p-8 text-center space-y-3 shadow-xs hover:shadow-md transition-all">
              <p className="font-serif text-6xl font-bold text-[#1B3F8B]">&lt;15</p>
              <p className="font-serif text-xl font-bold text-[#1A1A1A]">Learners Per Breakout</p>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">Small group code reviews and process evaluation for direct 1:1 attention.</p>
            </HoverCard>

            <HoverCard className="rounded-2xl border border-stone-200 bg-white p-8 text-center space-y-3 shadow-xs hover:shadow-md transition-all">
              <p className="font-serif text-6xl font-bold text-emerald-700">1</p>
              <p className="font-serif text-xl font-bold text-[#1A1A1A]">Cohort Per Quarter</p>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">Focused execution ensures every candidate receives full placement routing support.</p>
            </HoverCard>
          </div>

          {/* Anti-Gimmick Transparency Box */}
          <div className="rounded-2xl border border-stone-200 bg-white p-7 sm:p-10 space-y-6 shadow-xs">
            <div className="flex items-center gap-3 border-b border-stone-200 pb-4">
              <ShieldAlert className="h-6 w-6 text-rose-600 shrink-0" />
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">What We Do NOT Claim</h3>
                <p className="text-xs text-stone-500 font-mono uppercase tracking-wider mt-0.5">Our Anti-Gimmick Transparency Pledge</p>
              </div>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-stone-700 font-sans">
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
        <section className="rounded-2xl border border-stone-200 bg-white p-8 sm:p-14 text-center space-y-6 shadow-lg max-w-4xl mx-auto relative overflow-hidden">
          <div className="space-y-3 relative z-10">
            <div className="inline-flex justify-center">
              <PremiumChip variant="gold" size="md">
                🔥 REGISTRATION OPEN · LIVE OPENINGS AT TIER-1 TECH ENTERPRISES
              </PremiumChip>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1A1A1A] leading-tight">
              Ready to Put Yourself in the Pipeline?
            </h2>

            <p className="text-base sm:text-lg text-stone-700 max-w-2xl mx-auto font-sans leading-relaxed">
              Submit your candidate dossier in under 2 minutes for immediate partner desk screening. Free application.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("why_arzon_page_cta_click", { target: "google_form" })}
              className="h-13 px-8 inline-flex items-center justify-center gap-3 text-base font-extrabold text-white rounded-xl bg-[#1B3F8B] hover:bg-[#153270] shadow-md shadow-[#1B3F8B]/25 transition-all cursor-pointer w-full sm:w-auto"
            >
              <span>Apply Now (Free Form)</span>
              <ExternalLink className="h-4 w-4 text-white" />
            </a>

            <Link
              to="/enrol"
              className="h-13 px-7 inline-flex items-center justify-center gap-2.5 text-sm font-bold text-stone-800 hover:text-stone-950 bg-white hover:bg-stone-50 rounded-xl border border-stone-300 transition-all w-full sm:w-auto shadow-xs"
            >
              <span>Browse Enrolment Tiers</span>
              <ArrowRight className="h-4 w-4 text-stone-400" />
            </Link>
          </div>

          <div className="pt-4 border-t border-stone-200 flex items-center justify-center gap-2 text-xs sm:text-sm text-stone-600 relative z-10 font-sans">
            <MessageCircle className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>Questions? Chat with admissions at </span>
            <a
              href={`https://wa.me/${COUNSELLOR_PHONE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-emerald-700 hover:underline"
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
