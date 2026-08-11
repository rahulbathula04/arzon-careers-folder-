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
      "One page for how Arzon Careers is built: the 40/30/20/10 deployment-ready model, JD-sourced curriculum, ISO-aligned certification, MCA registration and hiring-partner network.";
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
    glowColor: "from-teal-500/20 to-emerald-500/0",
    badgeColor: "text-emerald-300 bg-emerald-500/10 border-emerald-500/30",
    body: "Every course splits into 40% domain, 30% live process, 20% real-tool exposure, 10% workplace readiness. No filler theory — the ratio itself is the guarantee.",
  },
  {
    icon: FileCheck,
    title: "JD-Sourced Syllabus",
    badge: "JD-Mirrored",
    glowColor: "from-sky-500/20 to-blue-500/0",
    badgeColor: "text-sky-300 bg-sky-500/10 border-sky-500/30",
    body: "We reverse-engineer syllabi from 100–200 live Indian JDs (IQVIA, Cognizant, HSBC, JPMorgan, Parexel, ICON). The job description IS the blueprint.",
  },
  {
    icon: ShieldCheck,
    title: "ISO-Aligned Certification",
    badge: "ISO 9001:2015",
    glowColor: "from-amber-500/20 to-yellow-500/0",
    badgeColor: "text-amber-300 bg-amber-500/10 border-amber-500/30",
    body: "Each cohort's assessment maps to the ISO 9001 competency framework so certificates are recognised outside our own network.",
  },
  {
    icon: Award,
    title: "MCA-Registered Entity",
    badge: "Legal Standing",
    glowColor: "from-indigo-500/20 to-purple-500/0",
    badgeColor: "text-indigo-300 bg-indigo-500/10 border-indigo-500/30",
    body: "Arzon Careers is a legally registered Indian company (MCA) — invoices, refund policy, and grievance escalation are on-record, not on a WhatsApp DM.",
  },
  {
    icon: Users,
    title: "Hiring-Partner Network",
    badge: "Partner Desk",
    glowColor: "from-teal-500/20 to-cyan-500/0",
    badgeColor: "text-teal-300 bg-teal-500/10 border-teal-500/30",
    body: "TASK-partnered employers, cohort briefings, and JD-mirror interview loops so the recruiter conversation starts inside the programme, not after it.",
  },
  {
    icon: CheckCircle2,
    title: "Recruiter North-Star",
    badge: "Week-1 Ready",
    glowColor: "from-emerald-500/20 to-teal-500/0",
    badgeColor: "text-emerald-300 bg-emerald-500/10 border-emerald-500/30",
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
    accent: "text-teal-400 border-teal-500/30 bg-teal-500/10",
  },
  {
    icon: Landmark,
    label: "Government Alignment",
    value: "TASK Collaboration",
    detail: "Telangana Academy for Skill & Knowledge (Dept of ITE&C) — launch event inaugurated by TASK CEO Dr. Srikanth Sinha.",
    verifyUrl: "/proof",
    verifyText: "View Launch Receipts ↗",
    accent: "text-sky-400 border-sky-500/30 bg-sky-500/10",
  },
  {
    icon: BadgeCheck,
    label: "Quality Framework",
    value: "ISO 9001:2015 Certified",
    detail: "Assessment and grading tied to external ISO quality management system for educational rigor.",
    verifyUrl: "/proof",
    verifyText: "View ISO Credential ↗",
    accent: "text-amber-400 border-amber-500/30 bg-amber-500/10",
  },
  {
    icon: FileCheck,
    label: "MSME Enterprise",
    value: "UDYAM Government of India",
    detail: "Officially registered MSME under UDYAM with complete open-ledger transparency compliance.",
    verifyUrl: "https://udyamregistration.gov.in/",
    verifyText: "Verify UDYAM Portal ↗",
    accent: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
  },
];

const METHODOLOGY_STEPS = [
  {
    n: "01",
    title: "Scrape Live JDs",
    body: "100–200 open Indian JDs per track from IQVIA, Cognizant, HSBC, JPMorgan, Parexel, ICON, and top tech partners — refreshed each cohort.",
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
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 text-xs font-bold shadow-xs">
        <Check className="h-3.5 w-3.5" /> Yes
      </span>
    );
  if (v === false)
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/40 text-xs font-bold shadow-xs">
        <X className="h-3.5 w-3.5" /> No
      </span>
    );
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-500/15 text-amber-200 border border-amber-500/40 text-xs font-bold shadow-xs font-mono">
      {v}
    </span>
  );
}

function WhyArzonPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 tone-dark isolate overflow-hidden">
      {/* Floating Header Nav */}
      <Nav />

      {/* Iridescent background spotlights */}
      <div className="pointer-events-none absolute -top-40 right-0 -z-10 h-[700px] w-[700px] rounded-full bg-gradient-to-tr from-teal-500/15 via-sky-500/10 to-transparent blur-3xl opacity-80" />
      <div className="pointer-events-none absolute top-1/3 -left-40 -z-10 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-amber-500/15 via-purple-500/5 to-transparent blur-3xl opacity-70" />
      <div className="pointer-events-none absolute bottom-10 right-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-blue-600/10 to-transparent blur-3xl opacity-60" />

      <main className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-24 space-y-24 sm:space-y-32">
        
        {/* Page Hero Section */}
        <header className="text-center space-y-8 max-w-4xl mx-auto">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-400/30 bg-teal-500/10 backdrop-blur-md shadow-lg">
              <Sparkles className="h-4 w-4 text-teal-300 motion-safe:animate-pulse" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-teal-300">
                LIVE PROOF LEDGER · 12,000+ CANDIDATES VERIFIED
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
              Why Arzon Careers.<br />
              <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-sky-300 via-amber-200 to-blue-400">
                The Standard for Proof &amp; Workforce Readiness.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-base sm:text-xl text-slate-300 font-sans leading-relaxed max-w-3xl mx-auto font-normal">
              Six honest reasons candidates and hiring desks trust our cohorts. Every single claim is independently verifiable — zero anonymous testimonials, zero manufactured badges, zero scarcity tricks.
            </p>
          </Reveal>

          {/* $1B Hero Stats Matrix */}
          <Reveal delay={0.15}>
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
              <HoverCard className="p-5 rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-2xl text-center relative overflow-hidden group hover:border-teal-500/50 transition-all">
                <div className="absolute inset-0 bg-gradient-to-b from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <p className="font-serif text-3xl sm:text-4xl font-bold text-teal-300 relative z-10">12,000+</p>
                <p className="font-mono text-[10px] sm:text-[11px] text-slate-400 uppercase tracking-widest mt-1.5 font-bold relative z-10">Learners Trained</p>
              </HoverCard>

              <HoverCard className="p-5 rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-2xl text-center relative overflow-hidden group hover:border-amber-500/50 transition-all">
                <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center justify-center gap-1.5 text-amber-300 font-serif text-3xl sm:text-4xl font-bold relative z-10">
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                  <span>4.8 / 5</span>
                </div>
                <p className="font-mono text-[10px] sm:text-[11px] text-slate-400 uppercase tracking-widest mt-1.5 font-bold relative z-10">AmbitionBox Rating</p>
              </HoverCard>

              <HoverCard className="p-5 rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-2xl text-center relative overflow-hidden group hover:border-sky-500/50 transition-all">
                <div className="absolute inset-0 bg-gradient-to-b from-sky-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <p className="font-serif text-3xl sm:text-4xl font-bold text-sky-300 relative z-10">ISO 9001</p>
                <p className="font-mono text-[10px] sm:text-[11px] text-slate-400 uppercase tracking-widest mt-1.5 font-bold relative z-10">Certified Standard</p>
              </HoverCard>

              <HoverCard className="p-5 rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-2xl text-center relative overflow-hidden group hover:border-emerald-500/50 transition-all">
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <p className="font-serif text-3xl sm:text-4xl font-bold text-emerald-300 relative z-10">MCA Legal</p>
                <p className="font-mono text-[10px] sm:text-[11px] text-slate-400 uppercase tracking-widest mt-1.5 font-bold relative z-10">Incorporated Entity</p>
              </HoverCard>
            </div>
          </Reveal>
        </header>

        {/* Section 1: The 6 Core Architectural Pillars */}
        <section id="pillars" aria-labelledby="pillars-heading" className="space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-teal-400">
              ARCHITECTURAL FOUNDATION
            </span>
            <h2 id="pillars-heading" className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
              The 6 Core Architectural Principles
            </h2>
            <p className="text-sm text-slate-400 font-sans">
              Designed from first principles to structurally prohibit low-quality course seller habits.
            </p>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PILLARS.map(({ icon: Icon, title, badge, glowColor, badgeColor, body }) => (
              <StaggerItem key={title}>
                <HoverCard className="h-full rounded-3xl border border-white/10 bg-slate-900/90 p-7 sm:p-8 flex flex-col justify-between space-y-6 shadow-2xl relative overflow-hidden group hover:border-teal-500/50 transition-all duration-300">
                  <div className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl ${glowColor} rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity`} />
                  
                  <div className="space-y-5 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 border border-teal-500/30 text-teal-300 shadow-md group-hover:scale-105 transition-transform">
                        <Icon className="h-7 w-7" />
                      </div>
                      <span className={`font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${badgeColor}`}>
                        {badge}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-white leading-snug group-hover:text-teal-200 transition-colors">
                      {title}
                    </h3>

                    <p className="text-sm text-slate-300 font-sans leading-relaxed font-normal">
                      {body}
                    </p>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* Section 2: Authority & Public Paperwork */}
        <section id="authority" aria-labelledby="authority-heading" className="space-y-10 scroll-mt-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-teal-400 font-mono text-xs font-bold uppercase tracking-[0.2em]">
                <ShieldCheck className="h-4 w-4" />
                <span>INDEPENDENTLY VERIFIABLE DOCUMENTS</span>
              </div>
              <h2 id="authority-heading" className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
                Authority — The Paperwork
              </h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-sans">
                Every line below is on the public record. Ask for the certificate scan and we send it — zero gatekeeping.
              </p>
            </div>

            <Link
              to="/verify"
              className="inline-flex items-center gap-2.5 text-xs font-bold text-slate-950 hover:text-slate-950 bg-gradient-to-r from-teal-400 to-sky-400 hover:from-teal-300 hover:to-sky-300 px-5 py-3 rounded-2xl font-mono shadow-lg shadow-teal-500/20 transition-all shrink-0 cursor-pointer"
            >
              <span>Go to Live Verifier</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {AUTHORITY.map(({ icon: Icon, label, value, detail, verifyUrl, verifyText, accent }) => (
              <HoverCard
                key={label}
                className="rounded-3xl border border-white/10 bg-slate-900/90 p-7 sm:p-8 space-y-5 shadow-2xl relative overflow-hidden group hover:border-slate-700 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className={`flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-bold px-3 py-1 rounded-full border ${accent}`}>
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </div>
                  <span className="flex h-2.5 w-2.5 rounded-full bg-teal-400 motion-safe:animate-pulse" />
                </div>

                <div>
                  <h3 className="font-serif text-2xl font-bold text-white group-hover:text-teal-200 transition-colors">{value}</h3>
                  <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans font-normal">{detail}</p>
                </div>

                <div className="pt-4 border-t border-slate-800/80">
                  <a
                    href={verifyUrl}
                    target={verifyUrl.startsWith("http") ? "_blank" : undefined}
                    rel={verifyUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                    onClick={() => trackEvent("authority_verify_click", { label })}
                    className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-teal-300 hover:text-white hover:underline transition-colors"
                  >
                    <span>{verifyText}</span>
                  </a>
                </div>
              </HoverCard>
            ))}
          </div>
        </section>

        {/* Section 3: Methodology — The 40/30/20/10 Model & Pipeline */}
        <section id="methodology" aria-labelledby="methodology-heading" className="space-y-10 scroll-mt-28">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sky-400 font-mono text-xs font-bold uppercase tracking-[0.2em]">
              <Microscope className="h-4 w-4" />
              <span>CURRICULUM REVERSE-ENGINEERING</span>
            </div>
            <h2 id="methodology-heading" className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Methodology — The JD-Mirror Engine
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed font-sans">
              Most edtech writes a syllabus once and re-runs it for years. We rebuild the syllabus every cohort by mirroring what Indian pharma, GCCs, and tech hiring desks are actively requiring.
            </p>
          </div>

          {/* 40/30/20/10 Ratio Visualizer */}
          <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-7 sm:p-10 space-y-8 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl font-bold text-white">
                  The 40/30/20/10 Deployment-Ready Ratio
                </h3>
                <p className="text-xs text-slate-400 font-sans mt-1">
                  Fixed structural ratio. If a topic cannot be defended in these 4 blocks, it does not ship.
                </p>
              </div>
              <span className="font-mono text-xs font-bold text-teal-300 bg-teal-500/10 px-4 py-1.5 rounded-full border border-teal-500/30 w-fit shrink-0">
                LOCKED RECRUITMENT RATIO
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="rounded-2xl border border-teal-500/40 bg-teal-500/10 p-5 space-y-2">
                <span className="font-mono text-3xl font-bold text-teal-300">40%</span>
                <p className="font-mono text-xs font-bold uppercase text-teal-200 tracking-wider">Domain Science</p>
                <p className="text-xs text-slate-300 font-sans">Fundamentals &amp; Theory</p>
              </div>

              <div className="rounded-2xl border border-sky-500/40 bg-sky-500/10 p-5 space-y-2">
                <span className="font-mono text-3xl font-bold text-sky-300">30%</span>
                <p className="font-mono text-xs font-bold uppercase text-sky-200 tracking-wider">Live Process</p>
                <p className="text-xs text-slate-300 font-sans">SOPs &amp; Workflows</p>
              </div>

              <div className="rounded-2xl border border-amber-500/40 bg-amber-500/10 p-5 space-y-2">
                <span className="font-mono text-3xl font-bold text-amber-300">20%</span>
                <p className="font-mono text-xs font-bold uppercase text-amber-200 tracking-wider">Real Tools</p>
                <p className="text-xs text-slate-300 font-sans">Argus / Python / SQL</p>
              </div>

              <div className="rounded-2xl border border-purple-500/40 bg-purple-500/10 p-5 space-y-2">
                <span className="font-mono text-3xl font-bold text-purple-300">10%</span>
                <p className="font-mono text-xs font-bold uppercase text-purple-200 tracking-wider">Workplace</p>
                <p className="text-xs text-slate-300 font-sans">JD-Mirror Mocks</p>
              </div>
            </div>
          </div>

          {/* 4-Step Pipeline Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {METHODOLOGY_STEPS.map(({ n, title, body }) => (
              <HoverCard
                key={n}
                className="rounded-3xl border border-white/10 bg-slate-900/90 p-7 flex flex-col justify-between space-y-4 shadow-xl hover:border-sky-500/50 transition-all"
              >
                <div className="space-y-3">
                  <span className="font-mono text-3xl font-bold text-sky-400">{n}</span>
                  <h3 className="font-serif text-xl font-bold text-white">{title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans font-normal">{body}</p>
                </div>
              </HoverCard>
            ))}
          </div>
        </section>

        {/* Section 4: Proof — Verifiable Numbers Vault */}
        <section id="proof" aria-labelledby="proof-heading" className="space-y-10 scroll-mt-28">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-[0.2em]">
              <Briefcase className="h-4 w-4" />
              <span>PUBLIC EVIDENCE LEDGER</span>
            </div>
            <h2 id="proof-heading" className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Proof — What We Can Defend
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed font-sans">
              Numbers below reflect what is shipped today on the public record. Nothing here is aspirational or unverified.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/90 shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm font-sans border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/90 font-mono text-xs uppercase tracking-widest text-slate-400">
                    <th className="py-5 px-6 font-bold">Metric / Claim</th>
                    <th className="py-5 px-6 font-bold text-teal-300">Verified Value</th>
                    <th className="py-5 px-6 font-bold">Verification Basis &amp; Source</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {PROOF_ROWS.map((r) => (
                    <tr key={r.label} className="hover:bg-slate-800/50 transition-colors">
                      <td className="py-4 px-6 font-serif font-bold text-white text-base">{r.label}</td>
                      <td className="py-4 px-6 font-mono font-bold text-teal-300 text-base">{r.value}</td>
                      <td className="py-4 px-6 text-xs text-slate-300 leading-relaxed font-normal">{r.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 5: Honest Comparative Matrix */}
        <section id="compare" aria-labelledby="compare-heading" className="space-y-10 scroll-mt-28">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-teal-400 font-mono text-xs font-bold uppercase tracking-[0.2em]">
              <Target className="h-4 w-4" />
              <span>HONEST COMPETITIVE AUDIT</span>
            </div>
            <h2 id="compare-heading" className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Compared Honestly Against Alternatives
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed font-sans">
              If any row below flips for a competitor, tell us and we will update it live. Here is how we defend our value to prospective candidates.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/90 shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-sm font-sans border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/90 font-mono text-xs uppercase tracking-widest">
                    <th className="py-5 px-6 text-left font-bold text-white">Capability / Deliverable</th>
                    <th className="py-5 px-4 text-center font-bold text-teal-300 bg-teal-500/10 border-x border-teal-500/20">Arzon Careers</th>
                    <th className="py-5 px-4 text-center font-semibold text-slate-400">YouTube</th>
                    <th className="py-5 px-4 text-center font-semibold text-slate-400">Udemy / Coursera</th>
                    <th className="py-5 px-4 text-center font-semibold text-slate-400">Local Coaching</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {COMPARISON.map((r) => (
                    <tr key={r.row} className="hover:bg-slate-800/50 transition-colors">
                      <th scope="row" className="py-4 px-6 text-left font-serif font-bold text-white text-base">
                        {r.row}
                      </th>
                      <td className="py-4 px-4 text-center bg-teal-500/5 border-x border-teal-500/10">
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
        <section id="scarcity" aria-labelledby="scarcity-heading" className="space-y-10 scroll-mt-28">
          <div className="space-y-3 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-[0.2em]">
              <Timer className="h-4 w-4" />
              <span>QUALITY CONTROL HARD CAP</span>
            </div>
            <h2 id="scarcity-heading" className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Why Cohort Seats Are Capped
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-sans">
              We structurally limit cohort capacity to guarantee individual mentor feedback.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <HoverCard className="rounded-3xl border border-white/10 bg-slate-900/90 p-8 text-center space-y-4 shadow-2xl hover:border-amber-500/50 transition-all">
              <p className="font-serif text-6xl font-bold text-amber-300">60</p>
              <p className="font-serif text-xl font-bold text-white">Students Per Cohort</p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">Hard cap enforced on every track. We never over-enroll or crowd mentor sessions.</p>
            </HoverCard>

            <HoverCard className="rounded-3xl border border-white/10 bg-slate-900/90 p-8 text-center space-y-4 shadow-2xl hover:border-amber-500/50 transition-all">
              <p className="font-serif text-6xl font-bold text-amber-300">&lt;15</p>
              <p className="font-serif text-xl font-bold text-white">Learners Per Breakout</p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">Small group code reviews and process evaluation for direct 1:1 attention.</p>
            </HoverCard>

            <HoverCard className="rounded-3xl border border-white/10 bg-slate-900/90 p-8 text-center space-y-4 shadow-2xl hover:border-amber-500/50 transition-all">
              <p className="font-serif text-6xl font-bold text-amber-300">1</p>
              <p className="font-serif text-xl font-bold text-white">Cohort Per Quarter</p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">Focused execution ensures every candidate receives full placement routing support.</p>
            </HoverCard>
          </div>

          {/* Anti-Gimmick Transparency Box */}
          <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-7 sm:p-10 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
              <ShieldAlert className="h-7 w-7 text-rose-400 shrink-0" />
              <div>
                <h3 className="font-serif text-2xl font-bold text-white">What We Do NOT Claim</h3>
                <p className="text-xs text-slate-400 font-mono uppercase tracking-wider mt-0.5">Our Anti-Gimmick Transparency Pledge</p>
              </div>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-300 font-sans">
              <li className="flex items-start gap-3">
                <X className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
                <span>No fabricated student testimonials, stock photos, or fake quotes.</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
                <span>No unverified aggregate star ratings on marketing surfaces.</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
                <span>No "learn in 30 days" shortcuts — every track requires real work.</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
                <span>No 100% placement guarantees — outcomes are reported per cohort.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 7: $1B Conversion CTA Banner */}
        <section className="rounded-3xl border border-teal-500/40 bg-gradient-to-br from-[#0D1B3E] via-[#0B1325] to-[#030712] p-8 sm:p-14 text-center space-y-8 shadow-2xl max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-500/20 via-transparent to-transparent pointer-events-none" />
          
          <div className="space-y-4 relative z-10">
            <div className="inline-flex justify-center">
              <PremiumChip variant="gold" size="md">
                🔥 REGISTRATION OPEN · LIVE OPENINGS AT HSBC &amp; JPMORGAN
              </PremiumChip>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
              Ready to Put Yourself in the Pipeline?
            </h2>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed">
              Submit your candidate dossier in under 2 minutes for immediate partner desk screening. Free application.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("why_arzon_page_cta_click", { target: "google_form" })}
              className="h-14 px-9 inline-flex items-center justify-center gap-3 text-base font-extrabold text-white rounded-2xl bg-[#1B3F8B] hover:bg-[#153270] shadow-xl shadow-[#1B3F8B]/40 transition-all cursor-pointer w-full sm:w-auto"
            >
              <span>Apply Now (Free Form)</span>
              <ExternalLink className="h-4 w-4 text-white" />
            </a>

            <Link
              to="/enrol"
              className="h-14 px-7 inline-flex items-center justify-center gap-2.5 text-sm font-bold text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-2xl border border-slate-700 transition-all w-full sm:w-auto"
            >
              <span>Browse Enrolment Tiers</span>
              <ArrowRight className="h-4 w-4 text-slate-400" />
            </Link>
          </div>

          <div className="pt-6 border-t border-slate-800/80 flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-400 relative z-10 font-sans">
            <MessageCircle className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>Questions? Chat with admissions at </span>
            <a
              href={`https://wa.me/${COUNSELLOR_PHONE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-emerald-400 hover:underline"
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

