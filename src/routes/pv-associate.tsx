import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ChevronDown,
  MessageCircle,
  CheckCircle2,
  X,
  ArrowRight,
  Target,
  BookOpen,
  Briefcase,
  ClipboardCheck,
  Award,
  Users,
  FileCheck,
  Layers,
  Zap,
  Star,
  ShieldCheck,
  Clock3,
  ChevronRight,
  Plus,
  AlertCircle,
} from "lucide-react";
import { Footer } from "@/components/landing/Footer";
import { Nav } from "@/components/landing/Nav";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import { COUNSELLOR_PHONE, SITE, absUrl } from "@/components/landing/constants";
import { TRANSITION_PRESETS } from "@/components/motion/motion-tokens";
import { trackEvent } from "@/lib/analytics";
import { PremiumChip } from "@/components/ui/PremiumChip";

// ─── WhatsApp link helpers ────────────────────────────────────────────────────
const waMsg = (text: string) =>
  `https://wa.me/${COUNSELLOR_PHONE}?text=${encodeURIComponent(text)}`;

const WA_HERO = waMsg(
  "Hi! I'm interested in the Fresher Pharmacovigilance Associate – 12 Week Role Track. I'd like to know more.",
);
const WA_ELIGIBILITY = waMsg(
  "Hi! I want to check my eligibility for the Fresher Pharmacovigilance Associate – 12 Week Role Track.",
);
const WA_MID = waMsg(
  "Hi! I'd like more details about the Pharmacovigilance Associate track – the program, internship, and next steps.",
);
const WA_FAQ = waMsg(
  "Hi! I have a question about the Fresher Pharmacovigilance Associate track before I join.",
);

// ─── Route definition ─────────────────────────────────────────────────────────
export const Route = createFileRoute("/pv-associate")({
  head: () => {
    const title = "Train for the Pharmacovigilance Associate Role | Arzon Global";
    const desc =
      "A 12-week, role-first track for B.Pharm, Pharm.D and M.Pharm students and graduates. Built from what companies actually expect from freshers — not a generic pharmacovigilance course. Includes practical projects, assessment, and structured internship. ₹10,000.";
    const url = `${SITE.origin}/pv-associate`;
    const og = absUrl(SITE.ogImage.inauguration);
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        {
          name: "keywords",
          content:
            "pharmacovigilance associate training, fresher pharmacovigilance course, bpharm pharmacovigilance, pharmd pharmacovigilance training, mpharm pharmacovigilance job, pharmacovigilance internship india, pv associate fresher program",
        },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:image", content: og },
        { property: "og:locale", content: "en_IN" },
        { property: "og:site_name", content: "Arzon Global" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
        { name: "twitter:image", content: og },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: PV_FAQS.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: "Fresher Pharmacovigilance Associate – 12 Week Role Track",
            description: desc,
            provider: {
              "@type": "Organization",
              name: "Arzon Global",
              sameAs: SITE.origin,
            },
            hasCourseInstance: {
              "@type": "CourseInstance",
              courseMode: "Online",
              offers: {
                "@type": "Offer",
                price: "10000",
                priceCurrency: "INR",
              },
            },
          }),
        },
      ],
    };
  },
  component: PVAssociatePage,
});

// ─── Data ─────────────────────────────────────────────────────────────────────

const SYLLABUS_WEEKS = [
  {
    week: "Week 1",
    module: "Role Orientation & Industry Expectations",
    do: "Understand the Pharmacovigilance Associate role, where it sits in a company, and what freshers are expected to know on day one.",
    build: "Clear picture of the role and what 'ready' looks like.",
  },
  {
    week: "Weeks 2–4",
    module: "Core Pharmacovigilance Knowledge",
    do: "Learn the foundational concepts, terminology, and processes this role is built on.",
    build: "Working knowledge you can explain and apply, not just recall.",
  },
  {
    week: "Weeks 5–7",
    module: "Role-Specific Industry Skills",
    do: "Practice the specific skills freshers are commonly expected to have — individual case safety reports (ICSRs), case processing, MedDRA coding fundamentals, narrative writing, and signal awareness.",
    build: "Applied skill, not just theory.",
  },
  {
    week: "Weeks 8–9",
    module: "Practical Work & Projects",
    do: "Work on guided projects that mirror real tasks in this role — case documentation exercises, signal-review style tasks, and report-writing tasks.",
    build: "Project output you can show.",
  },
  {
    week: "Week 10",
    module: "Assessment",
    do: "Be evaluated against the role requirements the track was built on.",
    build: "A clear picture of where you stand.",
  },
  {
    week: "Week 11",
    module: "Internship / Practical Exposure",
    do: "Structured, more independent practical exposure — applying what you've been trained and assessed on.",
    build: "Internship experience and evidence of work done.",
  },
  {
    week: "Week 12",
    module: "Final Assessment + Career Readiness",
    do: "Final evaluation and preparation for entry-level applications.",
    build: "Role-readiness evaluation + resume-ready material.",
  },
];

const EMPLOYER_EXPECTATIONS = [
  {
    icon: BookOpen,
    title: "Domain Knowledge",
    desc: "Core pharmacovigilance concepts and terminology — what every fresher is expected to know before day one.",
  },
  {
    icon: FileCheck,
    title: "Role-Specific Skills",
    desc: "ICSR processing, MedDRA coding fundamentals, case narrative writing, adverse event documentation.",
  },
  {
    icon: ClipboardCheck,
    title: "Documentation",
    desc: "Accuracy and structure in the kind of documentation this role involves — forms, narratives, case files.",
  },
  {
    icon: Target,
    title: "Analytical Thinking",
    desc: "Reading and interpreting case-level information correctly, not just memorising definitions.",
  },
  {
    icon: MessageCircle,
    title: "Communication",
    desc: "Clear, professional written communication — a hard requirement in a documentation-heavy role.",
  },
  {
    icon: Zap,
    title: "Practical Execution",
    desc: "Completing tasks correctly, not just understanding them in theory. Employers test this, not just recall.",
  },
  {
    icon: Briefcase,
    title: "Professional Readiness",
    desc: "Behaving like someone ready for a workplace, not a classroom — showing up, following process, delivering on time.",
  },
];

const TRAINING_STEPS = [
  { icon: BookOpen, label: "Learn", desc: "Core concepts and role context, taught directly." },
  {
    icon: ClipboardCheck,
    label: "Practice",
    desc: "Exercises and assignments built around real task types.",
  },
  { icon: Layers, label: "Apply", desc: "Practical projects that mirror actual work in the role." },
  {
    icon: Target,
    label: "Get Assessed",
    desc: "Evaluated against the same requirements employers commonly look for.",
  },
  {
    icon: Zap,
    label: "Improve",
    desc: "Feedback so gaps get fixed before you're job-hunting, not after.",
  },
];

const WHAT_YOU_LEAVE_WITH = [
  "A clear understanding of the Pharmacovigilance Associate role",
  "Role-specific knowledge, not general theory",
  "Practical project experience you can show",
  "An assessment record against role requirements",
  "Structured internship experience",
  "Resume material that reflects actual work done",
  "Preparation for entry-level interviews",
  "A clearer sense of career direction",
];

const ROLE_FLOW_STEPS = [
  { label: "Job", sub: "Entry-level PV Associate role" },
  { label: "Skills Companies Look For", sub: "Identified from public hiring patterns" },
  { label: "Training", sub: "Weeks 1–7: knowledge + skills" },
  { label: "Practical Projects", sub: "Weeks 8–9: guided, graded" },
  { label: "Assessment", sub: "Week 10: evaluated against role requirements" },
  { label: "Internship", sub: "Week 11: independent, evaluated" },
  { label: "Role Readiness", sub: "Week 12: final evaluation + career prep" },
];

const WHY_DIFFERENT = [
  "We start with the role, not a syllabus",
  "Curriculum built from current hiring-requirement patterns, not a fixed textbook",
  "Every module maps to something employers commonly ask for",
  "You work on real practical projects, not just lessons",
  "Assessed against the same requirements the curriculum was built on",
  "Structured internship experience before you apply for jobs",
  "You leave with career preparation, not just a certificate",
];

const PV_FAQS = [
  {
    q: "Does Arzon guarantee placement or a job?",
    a: "No. We don't guarantee placement or a job. We train you against real role requirements, give you practical project and internship experience, and prepare you for entry-level applications. Hiring decisions are made by employers, not by us.",
  },
  {
    q: "Is this program for freshers?",
    a: "Yes — it's built specifically for students and fresh graduates who don't yet have pharmacovigilance work experience.",
  },
  {
    q: "Who can apply?",
    a: "B.Pharm, Pharm.D, and M.Pharm students and graduates, and related life-science / allied healthcare students. Chat with us on WhatsApp to confirm your eligibility.",
  },
  {
    q: "What does the ₹10,000 include?",
    a: "Training across all 12 weeks, practical projects, assessments, and the internship component. For full details on what is and isn't included, chat with us on WhatsApp.",
  },
  {
    q: "What is the internship, exactly?",
    a: "Structured, evaluated practical exposure in week 11, connected directly to what you've learned and practiced in the earlier weeks. It's more independent than the guided projects in weeks 8–9, and it produces evidence of work done — not just a completion certificate.",
  },
  {
    q: "Do I need prior pharmacovigilance knowledge to join?",
    a: "No. The track starts from role orientation and builds core knowledge from week 1.",
  },
  {
    q: "How are students assessed?",
    a: "Against the same role requirements the curriculum was built from — through a formal assessment in week 10 and a final evaluation in week 12.",
  },
  {
    q: "Is the curriculum based on actual industry requirements?",
    a: "Yes — it's built by reviewing current, publicly available entry-level role requirements and identifying what comes up repeatedly across them.",
  },
  {
    q: "Which companies is the program designed around?",
    a: "It isn't designed around any single company. It's built from patterns found across multiple relevant entry-level roles. This doesn't mean any specific employer endorses the program or guarantees hiring.",
  },
  {
    q: "What happens after the 12 weeks?",
    a: "You receive your final role-readiness evaluation and career preparation support to help you apply for entry-level opportunities. Chat with us on WhatsApp for full details of any post-program support.",
  },
  {
    q: "What if I'm not sure pharmacovigilance is the right role for me?",
    a: "Chat with us on WhatsApp before enrolling — we'll help you check whether this track fits where you want to go.",
  },
  {
    q: "What happens after I message on WhatsApp?",
    a: "You'll get a few quick questions to check eligibility and fit, then a counsellor will walk you through the program and next steps.",
  },
  {
    q: "Can final-year students join?",
    a: "Chat with us on WhatsApp to confirm — eligibility for final-year students depends on your course and timeline.",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function WaButton({
  href,
  children,
  className = "",
  style,
  id,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.a
      id={id}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={shouldReduceMotion ? undefined : { scale: 1.02, y: -1 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
      style={style}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all cursor-pointer ${className}`}
      onClick={() =>
        trackEvent("pv_whatsapp_click", { location: id ?? "unknown" })
      }
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 shrink-0 fill-current"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
      {children}
    </motion.a>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-2">
      <PremiumChip variant="navy" size="sm">
        {children}
      </PremiumChip>
    </div>
  );
}

function SectionHeading({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <h2
      id={id}
      className={`font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A] leading-tight tracking-tight ${className}`}
    >
      {children}
    </h2>
  );
}

function PlaceholderNote({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 border border-amber-200 px-2 py-0.5 text-[11px] font-mono text-amber-900">
      <AlertCircle className="h-3 w-3 shrink-0 text-amber-600" aria-hidden="true" />
      {children}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function PVAssociatePage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-[#FAF8F5] text-[#1A1A1A] font-sans antialiased">
      <Nav />

      {/* ── 1. HERO ─────────────────────────────────────────────────── */}
      <HeroSection />

      {/* ── 2. PROBLEM ─────────────────────────────────────────────── */}
      <ProblemSection />

      {/* ── 3. BIG IDEA: Role-first flow ───────────────────────────── */}
      <BigIdeaSection />

      {/* ── 4. WE STUDIED THE ROLE ─────────────────────────────────── */}
      <StudiedTheRoleSection />

      {/* ── 5. SYLLABUS ────────────────────────────────────────────── */}
      <SyllabusSection />

      {/* ── 6. WHAT COMPANIES LOOK FOR ─────────────────────────────── */}
      <EmployerExpectationsSection />

      {/* ── 7. TRAINING EXPERIENCE ─────────────────────────────────── */}
      <TrainingExperienceSection />

      {/* ── 8. PRACTICAL PROJECTS ──────────────────────────────────── */}
      <PracticalProjectsSection />

      {/* ── 9. INTERNSHIP ──────────────────────────────────────────── */}
      <InternshipSection />

      {/* ── 10. ROLE READINESS ─────────────────────────────────────── */}
      <RoleReadinessSection />

      {/* ── 11. WHAT YOU LEAVE WITH ────────────────────────────────── */}
      <WhatYouLeaveWithSection />

      {/* ── 12. WHO THIS IS FOR ────────────────────────────────────── */}
      <WhoThisIsForSection />

      {/* ── 13. PROGRAM DETAILS ────────────────────────────────────── */}
      <ProgramDetailsSection />

      {/* ── 13B. TUITION PAYBACK & ROI ──────────────────────────────── */}
      <TuitionPaybackSection />

      {/* ── 14. WHY ARZON ──────────────────────────────────────────── */}
      <WhyArzonSection />

      {/* ── 15. SOCIAL PROOF ───────────────────────────────────────── */}
      <SocialProofSection />

      {/* ── 16. FAQ ────────────────────────────────────────────────── */}
      <FAQSection />

      {/* ── 17. FINAL CTA ──────────────────────────────────────────── */}
      <FinalCTASection />

      {/* ── 18. FOOTER ─────────────────────────────────────────────── */}
      <PVFooter />

      {/* Sticky mobile CTA */}
      <StickyMobileBar />
    </div>
  );
}

// ─── Section 1: Hero ─────────────────────────────────────────────────────────

function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  return (
    <section
      id="hero"
      aria-labelledby="pv-hero-heading"
      className="relative isolate flex min-h-[90svh] flex-col items-center justify-center px-4 pb-20 pt-28 sm:pt-36 sm:px-6 lg:px-8 overflow-hidden bg-[#FAF8F5]"
    >
      <div className="mx-auto max-w-4xl w-full text-center space-y-6">
        {/* Eyebrow chip */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...TRANSITION_PRESETS.medium, delay: 0.05 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-[#1B3F8B] shadow-2xs">
            <span className="h-2 w-2 rounded-full bg-[#1B3F8B] motion-safe:animate-pulse" />
            Fresher Pharmacovigilance Associate · 12 Week Role Track
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          id="pv-hero-heading"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...TRANSITION_PRESETS.medium, delay: 0.12 }}
          className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A1A1A] leading-[1.15] tracking-tight"
        >
          Train for the{" "}
          <span className="text-[#1B3F8B] italic font-normal">
            Pharmacovigilance Associate
          </span>{" "}
          role — not just another certificate.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...TRANSITION_PRESETS.medium, delay: 0.2 }}
          className="text-base sm:text-lg text-stone-700 leading-relaxed max-w-2xl mx-auto font-sans"
        >
          A 12-week, role-first track for B.Pharm, Pharm.D and M.Pharm students and fresh graduates.
          Built from what companies actually expect from freshers in this role — not a generic
          pharmacovigilance course.
        </motion.p>

        {/* CTA cluster */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...TRANSITION_PRESETS.medium, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          <WaButton
            id="pv-hero-wa-cta"
            href={WA_HERO}
            className="h-13 px-8 text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all font-bold"
            style={{ color: "#FFFFFF" }}
          >
            Chat on WhatsApp
          </WaButton>
          <WaButton
            id="pv-hero-eligibility-cta"
            href={WA_ELIGIBILITY}
            className="h-13 px-8 text-sm border border-stone-300 text-stone-800 hover:border-[#1B3F8B] hover:text-[#1B3F8B] bg-white shadow-2xs font-bold"
            style={{ color: "#1C1917" }}
          >
            Check Eligibility
          </WaButton>
        </motion.div>

        {/* Proof strip */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...TRANSITION_PRESETS.slow, delay: 0.42 }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-mono text-stone-600 pt-2"
        >
          {[
            "₹10,000",
            "12 weeks",
            "Practical projects + internship",
            "Final role-readiness evaluation",
          ].map((item, i) => (
            <span key={item} className="flex items-center gap-2">
              {i > 0 && <span className="h-1 w-1 rounded-full bg-stone-400" />}
              {item}
            </span>
          ))}
        </motion.div>

        {/* Qualification line */}
        <motion.p
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...TRANSITION_PRESETS.slow, delay: 0.5 }}
          className="text-xs text-stone-500 font-mono"
        >
          For B.Pharm, Pharm.D, M.Pharm and related life-science students and graduates.
        </motion.p>
      </div>
    </section>
  );
}

// ─── Section 2: Problem ───────────────────────────────────────────────────────

function ProblemSection() {
  const problems = [
    "Which entry-level role should you actually target?",
    "What do companies expect from a fresher applying to that role?",
    "What skills are you missing that a certificate alone doesn't fix?",
    "How do you get real practical experience before your first job?",
    "What does an internship for this role actually look like?",
  ];
  return (
    <section
      id="problem"
      aria-labelledby="problem-heading"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-y border-stone-200"
    >
      <div className="mx-auto max-w-3xl space-y-8">
        <Reveal className="space-y-3">
          <SectionLabel>The Problem</SectionLabel>
          <SectionHeading id="problem-heading">
            You have a degree. You still don't know what to do with it.
          </SectionHeading>
        </Reveal>

        <Reveal
          delay={0.1}
          className="text-stone-700 leading-relaxed text-base font-sans space-y-3"
        >
          <p>
            You've finished (or you're finishing) your B.Pharm, Pharm.D or M.Pharm. You may have
            already taken a course or two, maybe even collected a certificate.
          </p>
          <p className="font-semibold text-stone-900">But a few questions are still open:</p>
        </Reveal>

        <StaggerContainer className="space-y-3" staggerInterval={0.07}>
          {problems.map((p) => (
            <StaggerItem
              key={p}
              className="flex items-start gap-3 rounded-xl border border-stone-200 bg-[#FAF8F5] px-5 py-4"
            >
              <ChevronRight className="h-4 w-4 shrink-0 text-[#1B3F8B] mt-0.5" aria-hidden="true" />
              <p className="text-sm text-stone-800 leading-relaxed font-medium">{p}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <Reveal
          delay={0.2}
          className="rounded-xl border border-sky-200 bg-sky-50 px-6 py-5"
        >
          <p className="text-sm text-stone-800 leading-relaxed">
            Most training answers{" "}
            <span className="text-[#1B3F8B] font-bold">"what will I learn."</span> It rarely
            answers{" "}
            <span className="text-stone-900 font-bold">
              "what will companies expect me to already know."
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Section 3: Big Idea ──────────────────────────────────────────────────────

function BigIdeaSection() {
  const shouldReduceMotion = useReducedMotion();
  return (
    <section
      id="approach"
      aria-labelledby="big-idea-heading"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]"
    >
      <div className="mx-auto max-w-4xl space-y-10">
        <Reveal className="space-y-3 text-center">
          <SectionLabel>Our Approach</SectionLabel>
          <SectionHeading id="big-idea-heading" className="text-center">
            Start with the role, not the course.
          </SectionHeading>
          <p className="text-stone-600 text-base leading-relaxed max-w-xl mx-auto font-sans">
            Most training starts with a syllabus and hopes it's relevant. We start the other way.
          </p>
        </Reveal>

        {/* Flow chain */}
        <div className="flex flex-col items-center gap-0">
          {ROLE_FLOW_STEPS.map((step, i) => (
            <div key={step.label} className="flex flex-col items-center w-full max-w-sm">
              <motion.div
                initial={
                  shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
                }
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ ...TRANSITION_PRESETS.medium, delay: i * 0.08 }}
                className={`w-full rounded-2xl border px-6 py-4 text-center transition-all bg-white shadow-2xs ${
                  i === 0
                    ? "border-[#1B3F8B] bg-sky-50/60"
                    : i === ROLE_FLOW_STEPS.length - 1
                      ? "border-emerald-500 bg-emerald-50/60"
                      : i === 5
                        ? "border-amber-400 bg-amber-50/60"
                        : "border-stone-200"
                }`}
              >
                <p
                  className={`font-mono text-xs font-bold uppercase tracking-widest ${
                    i === 0
                      ? "text-[#1B3F8B]"
                      : i === ROLE_FLOW_STEPS.length - 1
                        ? "text-emerald-800"
                        : i === 5
                          ? "text-amber-900"
                          : "text-stone-700"
                  }`}
                >
                  {step.label}
                </p>
                <p className="text-xs text-stone-500 mt-0.5 font-sans">{step.sub}</p>
              </motion.div>

              {i < ROLE_FLOW_STEPS.length - 1 && (
                <motion.div
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 + 0.15 }}
                  className="flex flex-col items-center py-1"
                >
                  <div className="w-px h-4 bg-stone-300" />
                  <ChevronDown className="h-4 w-4 text-stone-400" aria-hidden="true" />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 4: We Studied The Role ──────────────────────────────────────────

function StudiedTheRoleSection() {
  return (
    <section
      id="methodology"
      aria-labelledby="studied-heading"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-y border-stone-200"
    >
      <div className="mx-auto max-w-3xl space-y-6">
        <Reveal className="space-y-3">
          <SectionLabel>Research Basis</SectionLabel>
          <SectionHeading id="studied-heading">
            Before we built this track, we studied the role.
          </SectionHeading>
        </Reveal>

        <Reveal delay={0.1} className="text-stone-700 text-base leading-relaxed space-y-4 font-sans">
          <p>
            We looked at what relevant companies commonly look for in freshers applying for the
            Pharmacovigilance Associate role.
          </p>
          <p>
            We identified the recurring knowledge, skills, documentation standards, and tasks that
            come up across entry-level openings — and built the 12 weeks around them.
          </p>
          <p className="text-xs text-stone-500 font-mono">
            Note: Program content is built from common patterns across relevant roles, not from any
            single employer's internal hiring standard.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Section 5: Syllabus ─────────────────────────────────────────────────────

function SyllabusSection() {
  const [openWeek, setOpenWeek] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="syllabus"
      aria-labelledby="syllabus-heading"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]"
    >
      <div className="mx-auto max-w-5xl space-y-8">
        <Reveal className="space-y-3">
          <SectionLabel>Week by Week</SectionLabel>
          <SectionHeading id="syllabus-heading">
            Fresher Pharmacovigilance Associate — 12 Week Role Track
          </SectionHeading>
          <p className="text-stone-600 text-base leading-relaxed max-w-2xl font-sans">
            Exactly what you'll learn, practice, and be evaluated on — week by week.
          </p>
        </Reveal>

        {/* Desktop table */}
        <Reveal
          delay={0.1}
          className="hidden md:block overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xs"
        >
          <table
            className="w-full text-sm"
            role="table"
            aria-label="12-week pharmacovigilance syllabus"
          >
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200">
                <th className="text-left px-5 py-4 font-mono text-[11px] font-bold uppercase tracking-widest text-stone-600 w-[100px]">
                  When
                </th>
                <th className="text-left px-5 py-4 font-mono text-[11px] font-bold uppercase tracking-widest text-stone-600 w-[200px]">
                  Module
                </th>
                <th className="text-left px-5 py-4 font-mono text-[11px] font-bold uppercase tracking-widest text-stone-600">
                  What you'll do
                </th>
                <th className="text-left px-5 py-4 font-mono text-[11px] font-bold uppercase tracking-widest text-stone-600">
                  What you'll build
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {SYLLABUS_WEEKS.map((row, i) => (
                <tr
                  key={row.week}
                  className={`transition-colors ${
                    i === 5
                      ? "bg-amber-50/50 hover:bg-amber-50"
                      : "hover:bg-stone-50"
                  }`}
                >
                  <td className="px-5 py-4 align-top">
                    <span
                      className={`font-mono text-xs font-bold ${
                        i === 5 ? "text-[#8A6D1F]" : "text-[#1B3F8B]"
                      }`}
                    >
                      {row.week}
                    </span>
                  </td>
                  <td className="px-5 py-4 align-top">
                    <span className="text-[#1A1A1A] font-semibold text-xs leading-snug">
                      {row.module}
                    </span>
                    {i === 5 && (
                      <span className="mt-1 flex">
                        <span className="text-[10px] font-mono font-bold text-amber-900 bg-amber-100 border border-amber-200 rounded-full px-2 py-0.5">
                          INTERNSHIP
                        </span>
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 align-top text-stone-600 text-xs leading-relaxed font-sans">
                    {row.do}
                  </td>
                  <td className="px-5 py-4 align-top text-stone-800 text-xs leading-relaxed font-medium font-sans">
                    {row.build}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        {/* Mobile accordion */}
        <div className="md:hidden space-y-2.5">
          {SYLLABUS_WEEKS.map((row, i) => {
            const isOpen = openWeek === i;
            const isInternship = i === 5;
            return (
              <div
                key={row.week}
                className={`rounded-2xl border overflow-hidden bg-white shadow-2xs transition-colors ${
                  isInternship ? "border-amber-300" : "border-stone-200"
                }`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenWeek(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left cursor-pointer"
                >
                  <div className="space-y-0.5">
                    <p
                      className={`font-mono text-[10px] font-bold uppercase tracking-widest ${
                        isInternship ? "text-[#8A6D1F]" : "text-[#1B3F8B]"
                      }`}
                    >
                      {row.week}
                    </p>
                    <p className="text-sm text-[#1A1A1A] font-semibold leading-snug">
                      {row.module}
                    </p>
                  </div>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={TRANSITION_PRESETS.fast}
                    className="shrink-0"
                  >
                    <ChevronDown className="h-4 w-4 text-stone-400" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={shouldReduceMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={TRANSITION_PRESETS.medium}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 space-y-3 border-t border-stone-100 pt-3">
                        <div>
                          <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-stone-500 mb-1">
                            What you'll do
                          </p>
                          <p className="text-xs text-stone-600 leading-relaxed font-sans">{row.do}</p>
                        </div>
                        <div>
                          <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-stone-500 mb-1">
                            What you'll build
                          </p>
                          <p className="text-xs text-stone-800 leading-relaxed font-medium font-sans">
                            {row.build}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Section 6: Employer Expectations ────────────────────────────────────────

function EmployerExpectationsSection() {
  return (
    <section
      id="employer-expectations"
      aria-labelledby="employer-heading"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-y border-stone-200"
    >
      <div className="mx-auto max-w-5xl space-y-8">
        <Reveal className="space-y-3">
          <SectionLabel>What Employers Look For</SectionLabel>
          <SectionHeading id="employer-heading">
            What employers commonly expect from freshers in this role
          </SectionHeading>
          <p className="text-stone-600 text-sm leading-relaxed max-w-xl font-sans">
            Common requirements found across relevant entry-level roles — not claims about any
            specific employer.
          </p>
        </Reveal>

        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          staggerInterval={0.06}
        >
          {EMPLOYER_EXPECTATIONS.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.title}>
                <div className="group h-full rounded-2xl border border-stone-200 bg-[#FAF8F5] p-5 hover:border-[#1B3F8B]/40 hover:bg-white hover:shadow-sm transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-[#1B3F8B]">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <p className="font-semibold text-sm text-[#1A1A1A]">{item.title}</p>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">{item.desc}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}

// ─── Section 7: Training Experience ──────────────────────────────────────────

function TrainingExperienceSection() {
  return (
    <section
      id="training-experience"
      aria-labelledby="training-heading"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]"
    >
      <div className="mx-auto max-w-4xl space-y-10">
        <Reveal className="space-y-3 text-center">
          <SectionLabel>How It Works</SectionLabel>
          <SectionHeading id="training-heading" className="text-center">
            Learn. Practice. Apply. Get assessed. Improve.
          </SectionHeading>
          <p className="text-stone-600 text-base leading-relaxed max-w-xl mx-auto font-sans">
            You won't just watch videos. Each part of the track is built to get you doing the work,
            not just hearing about it.
          </p>
        </Reveal>

        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5"
          staggerInterval={0.07}
        >
          {TRAINING_STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <StaggerItem
                key={step.label}
                className="flex flex-col items-center text-center gap-3 rounded-2xl border border-stone-200 bg-white p-5 shadow-2xs"
              >
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sky-50 border border-sky-200 text-[#1B3F8B]">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                  <span className="absolute -top-2 -left-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#1B3F8B] text-[10px] font-mono font-bold text-white">
                    {i + 1}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-sm text-[#1A1A1A] mb-1">{step.label}</p>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">{step.desc}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <Reveal delay={0.2}>
          <div className="rounded-xl border border-stone-200 bg-white px-6 py-4 flex items-start gap-3 shadow-2xs">
            <AlertCircle className="h-4 w-4 text-[#8A6D1F] shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              <span className="text-stone-900 font-bold">Delivery details:</span> Full details
              on live sessions, recorded modules, and mentor/trainer interaction format will be
              confirmed before launch.{" "}
              <a
                href={WA_MID}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1B3F8B] font-bold underline underline-offset-2 hover:text-[#153270]"
              >
                Chat on WhatsApp
              </a>{" "}
              to ask about format now.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Section 8: Practical Projects ───────────────────────────────────────────

function PracticalProjectsSection() {
  return (
    <section
      id="practical-projects"
      aria-labelledby="projects-heading"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-y border-stone-200"
    >
      <div className="mx-auto max-w-3xl space-y-8">
        <Reveal className="space-y-3">
          <SectionLabel>Weeks 8–9</SectionLabel>
          <SectionHeading id="projects-heading">What you'll actually do</SectionHeading>
        </Reveal>

        <Reveal delay={0.1} className="text-stone-700 text-base leading-relaxed space-y-3 font-sans">
          <p>
            This isn't a "watch and understand" program. From week 8, you're working on projects
            built to mirror real pharmacovigilance tasks.
          </p>
        </Reveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-4" staggerInterval={0.08}>
          {[
            {
              icon: FileCheck,
              label: "Case documentation exercises",
              desc: "Structured practice with real-format case documentation tasks.",
            },
            {
              icon: Target,
              label: "Signal-review style tasks",
              desc: "Work through the kind of analytical tasks this role involves.",
            },
            {
              icon: ClipboardCheck,
              label: "Report-writing tasks",
              desc: "Written outputs in the format and structure expected in the role.",
            },
          ].map((p) => {
            const Icon = p.icon;
            return (
              <StaggerItem key={p.label}>
                <div className="h-full rounded-2xl border border-stone-200 bg-[#FAF8F5] p-5 space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-[#1B3F8B]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <p className="font-semibold text-sm text-[#1A1A1A]">{p.label}</p>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">{p.desc}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <Reveal delay={0.2} className="rounded-xl border border-sky-200 bg-sky-50 px-6 py-5">
          <p className="text-sm text-stone-800 leading-relaxed font-sans">
            Every project produces something you can{" "}
            <span className="text-[#1B3F8B] font-bold">point to:</span> a completed piece of work,
            not just a completion certificate.
          </p>
          <p className="text-xs text-stone-500 mt-2 font-mono">
            Note: project types listed above are illustrative examples of the kind of project, not
            confirmed final project content.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Section 9: Internship ────────────────────────────────────────────────────

function InternshipSection() {
  const internshipDetails = [
    { label: "What it is", value: null, placeholder: true },
    { label: "What you're expected to do", value: null, placeholder: true },
    { label: "What you produce", value: null, placeholder: true },
    { label: "How you're evaluated", value: null, placeholder: true },
  ];
  return (
    <section
      id="internship"
      aria-labelledby="internship-heading"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]"
    >
      <div className="mx-auto max-w-3xl space-y-8">
        <Reveal className="space-y-3">
          <PremiumChip variant="gold" size="sm">
            WEEK 11 INTERNSHIP
          </PremiumChip>
          <SectionHeading id="internship-heading">
            The internship — what it actually is
          </SectionHeading>
          <p className="text-stone-600 text-sm font-sans">
            Not a certificate. Structured, evaluated practical exposure.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-2xs">
            <div className="p-6 space-y-4">
              {internshipDetails.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 pb-4 border-b border-stone-100 last:border-0 last:pb-0"
                >
                  <span className="shrink-0 font-mono text-xs font-bold uppercase tracking-widest text-[#8A6D1F] sm:w-56">
                    {item.label}
                  </span>
                  <PlaceholderNote>To be confirmed — chat on WhatsApp for details</PlaceholderNote>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal
          delay={0.2}
          className="rounded-xl border border-amber-200 bg-amber-50/70 px-6 py-5"
        >
          <p className="text-sm text-stone-800 leading-relaxed font-sans">
            <span className="text-[#8A6D1F] font-bold">How it connects:</span> The internship
            sits at week 11, after your core training, skills practice, and assessment — so you're
            applying what you've already been evaluated on, not starting from zero.
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <WaButton
            id="pv-internship-wa-cta"
            href={WA_MID}
            className="h-12 px-6 text-sm bg-white border border-stone-300 text-stone-800 hover:border-[#1B3F8B] hover:text-[#1B3F8B] shadow-2xs font-bold"
          >
            Ask about the internship on WhatsApp
          </WaButton>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Section 10: Role Readiness ───────────────────────────────────────────────

function RoleReadinessSection() {
  return (
    <section
      id="role-readiness"
      aria-labelledby="readiness-heading"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-y border-stone-200"
    >
      <div className="mx-auto max-w-3xl space-y-8">
        <Reveal className="space-y-3">
          <SectionLabel>The Goal</SectionLabel>
          <SectionHeading id="readiness-heading">
            The goal isn't completion. It's role readiness.
          </SectionHeading>
          <p className="text-stone-600 text-base leading-relaxed font-sans">
            Finishing the 12 weeks isn't the finish line. Role readiness means you've completed the
            training, the practical work, the projects, the assessments, and the internship — and
            been evaluated against all of it.
          </p>
        </Reveal>

        {/* Score card */}
        <Reveal delay={0.1}>
          <div className="max-w-sm mx-auto">
            <div className="rounded-2xl border border-stone-200 bg-[#FAF8F5] overflow-hidden shadow-xs">
              <div className="bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between">
                <p className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-widest">
                  Role Readiness Output
                </p>
                <span className="rounded-full bg-amber-100 border border-amber-200 px-2 py-0.5 text-[9px] font-mono font-bold text-amber-900 uppercase">
                  Illustrative Example
                </span>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { label: "Knowledge", value: 82 },
                  { label: "Practical", value: 78 },
                  { label: "Assessment", value: 85 },
                ].map((metric) => (
                  <div key={metric.label} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-stone-600 font-mono">{metric.label}</span>
                      <span className="text-[#1B3F8B] font-mono font-bold">{metric.value}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-stone-200 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${metric.value}%` }}
                        viewport={{ once: true, amount: 0.8 }}
                        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-full bg-[#1B3F8B]"
                      />
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-2 border-t border-stone-200">
                  <span className="text-stone-600 font-mono text-xs">Project</span>
                  <span className="text-[#1B3F8B] font-mono font-bold text-xs flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                    Completed
                  </span>
                </div>
                <div className="rounded-xl bg-sky-100 border border-sky-200 px-4 py-3 text-center">
                  <p className="font-mono text-sm font-bold text-[#1B3F8B] tracking-wider">
                    ROLE READY
                  </p>
                </div>
              </div>
            </div>
            <p className="text-center text-xs text-stone-500 mt-3 font-mono">
              Example output — illustrative only. Not a live scoring system.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Section 11: What You Leave With ─────────────────────────────────────────

function WhatYouLeaveWithSection() {
  return (
    <section
      id="outcomes"
      aria-labelledby="outcomes-heading"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]"
    >
      <div className="mx-auto max-w-3xl space-y-8">
        <Reveal className="space-y-3">
          <SectionLabel>Outcomes</SectionLabel>
          <SectionHeading id="outcomes-heading">What you actually walk away with</SectionHeading>
        </Reveal>

        <StaggerContainer className="space-y-3" staggerInterval={0.06}>
          {WHAT_YOU_LEAVE_WITH.map((item) => (
            <StaggerItem key={item}>
              <div className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white px-5 py-4 shadow-2xs">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                <p className="text-sm text-stone-800 font-medium font-sans">{item}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <Reveal
          delay={0.2}
          className="rounded-2xl border border-stone-200 bg-white px-6 py-5 shadow-2xs"
        >
          <p className="text-sm text-stone-600 leading-relaxed font-sans">
            <span className="text-[#1A1A1A] font-bold">We don't promise a job.</span> We prepare
            you to be a stronger candidate for one.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Section 12: Who This Is For ─────────────────────────────────────────────

function WhoThisIsForSection() {
  const idealFor = [
    "B.Pharm students and graduates",
    "Pharm.D students and graduates",
    "M.Pharm students and graduates",
    "Related life-science / allied healthcare students, depending on eligibility",
  ];
  const notFor = [
    "You're looking for a guaranteed job, not training",
    "You want a certificate without doing the practical work",
    "You're not able to commit time across 12 weeks",
  ];

  return (
    <section
      id="eligibility"
      aria-labelledby="eligibility-heading"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-y border-stone-200"
    >
      <div className="mx-auto max-w-4xl space-y-8">
        <Reveal className="space-y-3 text-center">
          <SectionLabel>Is This Right For You?</SectionLabel>
          <SectionHeading id="eligibility-heading" className="text-center">
            Is this track right for you?
          </SectionHeading>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Reveal direction="left">
            <div className="h-full rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6 space-y-4 shadow-2xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                <p className="font-bold text-emerald-900 text-sm font-mono uppercase tracking-wider">
                  Ideal for
                </p>
              </div>
              <ul className="space-y-3">
                {idealFor.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-stone-800 font-sans">
                    <CheckCircle2
                      className="h-3.5 w-3.5 shrink-0 text-emerald-600 mt-0.5"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal direction="right">
            <div className="h-full rounded-2xl border border-rose-200 bg-rose-50/50 p-6 space-y-4 shadow-2xs">
              <div className="flex items-center gap-2">
                <X className="h-5 w-5 text-rose-600" aria-hidden="true" />
                <p className="font-bold text-rose-900 text-sm font-mono uppercase tracking-wider">
                  This is not for you if
                </p>
              </div>
              <ul className="space-y-3">
                {notFor.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-stone-700 font-sans">
                    <X className="h-3.5 w-3.5 shrink-0 text-rose-500 mt-0.5" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="text-center">
          <p className="text-sm text-stone-600 mb-3 font-sans">Not sure if this is the right fit?</p>
          <WaButton
            id="pv-eligibility-check-cta"
            href={WA_ELIGIBILITY}
            className="h-12 px-7 text-sm border border-stone-300 bg-white text-stone-800 hover:border-[#1B3F8B] hover:text-[#1B3F8B] shadow-2xs font-bold"
          >
            Check Eligibility on WhatsApp
          </WaButton>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Section 13: Program Details ─────────────────────────────────────────────

function ProgramDetailsSection() {
  const details: { label: string; value: React.ReactNode }[] = [
    { label: "Program", value: "Fresher Pharmacovigilance Associate" },
    { label: "Duration", value: "12 weeks" },
    { label: "Mode", value: <PlaceholderNote>To be confirmed</PlaceholderNote> },
    { label: "Start date", value: <PlaceholderNote>To be confirmed</PlaceholderNote> },
    { label: "Price", value: "₹10,000" },
    {
      label: "Internship",
      value: <PlaceholderNote>To be confirmed — Week 11, structured & evaluated</PlaceholderNote>,
    },
    { label: "Assessment", value: <PlaceholderNote>To be confirmed</PlaceholderNote> },
    { label: "Certificate", value: <PlaceholderNote>To be confirmed</PlaceholderNote> },
    { label: "Support", value: <PlaceholderNote>To be confirmed</PlaceholderNote> },
  ];

  return (
    <section
      id="program-details"
      aria-labelledby="details-heading"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]"
    >
      <div className="mx-auto max-w-3xl space-y-8">
        <Reveal className="space-y-3">
          <SectionLabel>Program Details</SectionLabel>
          <SectionHeading id="details-heading">Program details</SectionHeading>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-xs">
            {details.map((row, i) => (
              <div
                key={row.label}
                className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 px-6 py-4 border-b border-stone-100 last:border-0 ${
                  i % 2 === 0 ? "bg-stone-50/50" : "bg-white"
                }`}
              >
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-stone-500 sm:w-36 shrink-0">
                  {row.label}
                </span>
                <span className="text-sm text-stone-800 font-medium font-sans">{row.value}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2} className="text-center space-y-3">
          <p className="text-sm text-stone-600 font-sans">Ready to get started?</p>
          <WaButton
            id="pv-details-wa-cta"
            href={WA_MID}
            className="h-13 px-8 text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-md font-bold"
          >
            Chat on WhatsApp
          </WaButton>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Section 13B: Tuition Payback & Career ROI ──────────────────────────────────

function TuitionPaybackSection() {
  const [selectedDegree, setSelectedDegree] = useState<"bpharm" | "pharmd" | "mpharm">("bpharm");

  const SALARY_BY_DEGREE = {
    bpharm: {
      title: "B.Pharm Graduate",
      avgStartingMonth: 38000,
      avgStartingLpa: "₹4.5 LPA",
      paybackDays: 19,
    },
    pharmd: {
      title: "Pharm.D Graduate",
      avgStartingMonth: 52000,
      avgStartingLpa: "₹6.2 LPA",
      paybackDays: 14,
    },
    mpharm: {
      title: "M.Pharm Specialist",
      avgStartingMonth: 58000,
      avgStartingLpa: "₹7.0 LPA",
      paybackDays: 12,
    },
  };

  const curr = SALARY_BY_DEGREE[selectedDegree];

  return (
    <section
      id="roi-payback"
      aria-labelledby="roi-heading"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-stone-200"
    >
      <div className="mx-auto max-w-4xl space-y-10">
        <Reveal className="space-y-3 text-center">
          <SectionLabel>Investment &amp; Career ROI</SectionLabel>
          <SectionHeading id="roi-heading" className="text-center">
            How quickly does this program pay for itself?
          </SectionHeading>
          <p className="text-base text-stone-600 font-sans max-w-2xl mx-auto">
            Compare your tuition investment against verified fresher compensation packages in Tier-1
            Healthcare GCCs.
          </p>
        </Reveal>

        {/* Degree Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {(["bpharm", "pharmd", "mpharm"] as const).map((deg) => (
            <button
              key={deg}
              type="button"
              onClick={() => setSelectedDegree(deg)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedDegree === deg
                  ? "bg-[#1B3F8B] text-white shadow-xs"
                  : "bg-[#FAF8F5] text-stone-700 border border-stone-200 hover:bg-stone-100"
              }`}
            >
              {SALARY_BY_DEGREE[deg].title}
            </button>
          ))}
        </div>

        {/* ROI Matrix Card */}
        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-sky-200 bg-sky-50/50 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="grid gap-6 sm:grid-cols-3 text-center">
              <div className="rounded-xl bg-white border border-stone-200 p-5 shadow-2xs">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-stone-500">
                  Target Starting Salary
                </span>
                <p className="font-serif text-3xl font-bold text-[#1A1A1A] mt-1.5">
                  ₹{curr.avgStartingMonth.toLocaleString("en-IN")}
                  <span className="text-xs font-sans text-stone-500 font-normal"> /mo</span>
                </p>
                <span className="inline-block mt-2 font-mono text-xs font-bold text-[#1B3F8B] bg-sky-100 px-2.5 py-0.5 rounded-md">
                  {curr.avgStartingLpa} CTC
                </span>
              </div>

              <div className="rounded-xl bg-white border border-stone-200 p-5 shadow-2xs">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-stone-500">
                  Tuition Investment
                </span>
                <p className="font-serif text-3xl font-bold text-[#8A6D1F] mt-1.5">₹10,000</p>
                <span className="inline-block mt-2 font-mono text-xs font-bold text-stone-600 bg-stone-100 px-2.5 py-0.5 rounded-md">
                  One-Time · No Hidden Fees
                </span>
              </div>

              <div className="rounded-xl bg-white border border-emerald-200 p-5 shadow-2xs">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                  Tuition Payback Period
                </span>
                <p className="font-serif text-3xl font-bold text-emerald-700 mt-1.5">
                  ~{curr.paybackDays} Days
                </p>
                <span className="inline-block mt-2 font-mono text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-md">
                  100% Recouped in Month 1
                </span>
              </div>
            </div>

            <div className="rounded-xl bg-white border border-stone-200 p-4 text-xs text-stone-700 font-sans leading-relaxed text-center sm:text-left">
              💡 <strong>The Arzon Outcome Math</strong>: Over a 3-year period as a Pharmacovigilance
              Associate, a graduate earns upwards of <strong>₹18,00,000+</strong> in cumulative
              salary. The training tuition represents less than <strong>0.6%</strong> of your 3-year
              career earnings.
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Section 14: Why Arzon ────────────────────────────────────────────────────

function WhyArzonSection() {
  return (
    <section
      id="why-arzon"
      aria-labelledby="why-heading"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-y border-stone-200"
    >
      <div className="mx-auto max-w-4xl space-y-10">
        <Reveal className="space-y-3 text-center">
          <SectionLabel>Why This Is Different</SectionLabel>
          <SectionHeading id="why-heading" className="text-center">
            Why this is different
          </SectionHeading>
        </Reveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4" staggerInterval={0.06}>
          {WHY_DIFFERENT.map((item, i) => (
            <StaggerItem key={item}>
              <div className="flex items-start gap-4 rounded-2xl border border-stone-200 bg-[#FAF8F5] px-5 py-4 h-full shadow-2xs">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-100 font-mono text-xs font-bold text-[#1B3F8B]">
                  {i + 1}
                </span>
                <p className="text-sm text-stone-800 leading-relaxed font-sans">{item}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

// ─── Section 15: Social Proof ─────────────────────────────────────────────────

function SocialProofSection() {
  return (
    <section
      id="testimonials"
      aria-labelledby="proof-heading"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]"
    >
      <div className="mx-auto max-w-3xl space-y-6">
        <Reveal className="space-y-3 text-center">
          <SectionLabel>What Students Say</SectionLabel>
          <SectionHeading id="proof-heading" className="text-center">
            What students say
          </SectionHeading>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-10 text-center space-y-3 shadow-2xs">
            <div className="flex justify-center gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 text-amber-400 fill-amber-400"
                  aria-hidden="true"
                />
              ))}
            </div>
            <p className="text-stone-600 text-sm leading-relaxed max-w-sm mx-auto font-sans">
              Student testimonials will appear here. This section will be populated with real
              student feedback before launch.
            </p>
            <p className="font-mono text-xs text-stone-400 uppercase tracking-wider">
              Coming soon
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Section 16: FAQ ──────────────────────────────────────────────────────────

function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-y border-stone-200"
    >
      <div className="mx-auto max-w-3xl space-y-8">
        <Reveal className="space-y-3 text-center">
          <SectionLabel>Before You Join</SectionLabel>
          <SectionHeading id="faq-heading" className="text-center">
            Questions people ask before joining
          </SectionHeading>
        </Reveal>

        <Reveal
          delay={0.1}
          className="divide-y divide-stone-200 rounded-2xl border border-stone-200 bg-[#FAF8F5] overflow-hidden shadow-2xs"
        >
          {PV_FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={faq.q}
                className={`transition-colors ${isOpen ? "bg-white" : "bg-[#FAF8F5]"}`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex min-h-[56px] w-full items-center justify-between gap-4 px-6 py-4 text-left hover:bg-stone-50 transition-colors focus-visible:outline-none cursor-pointer"
                >
                  <span className="font-sans text-sm font-semibold text-[#1A1A1A] leading-snug pr-2">
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={TRANSITION_PRESETS.fast}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-stone-300 text-[#1B3F8B]"
                    aria-hidden="true"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="faq-content"
                      initial={shouldReduceMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={TRANSITION_PRESETS.medium}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-sm text-stone-600 leading-relaxed border-t border-stone-100 font-sans">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </Reveal>

        <Reveal delay={0.2} className="text-center">
          <p className="text-sm text-stone-600 mb-3 font-sans">Question not answered here?</p>
          <WaButton
            id="pv-faq-wa-cta"
            href={WA_FAQ}
            className="h-12 px-7 text-sm border border-stone-300 bg-white text-stone-800 hover:border-[#1B3F8B] hover:text-[#1B3F8B] shadow-2xs font-bold"
          >
            Ask on WhatsApp
          </WaButton>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Section 17: Final CTA ────────────────────────────────────────────────────

function FinalCTASection() {
  return (
    <section
      id="enrol"
      aria-labelledby="final-cta-heading"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]"
    >
      <div className="mx-auto max-w-3xl text-center space-y-6">
        <Reveal className="space-y-4">
          <SectionLabel>Get Started</SectionLabel>
          <h2
            id="final-cta-heading"
            className="font-serif text-3xl sm:text-5xl font-bold text-[#1A1A1A] leading-tight tracking-tight"
          >
            Stop collecting courses.{" "}
            <span className="text-[#1B3F8B] italic font-normal">
              Start building for the role you want.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="inline-flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-stone-200 bg-white px-8 py-5 shadow-xs">
            <div className="text-center">
              <p className="font-mono text-xs text-stone-500 uppercase tracking-widest mb-1">
                Program
              </p>
              <p className="font-semibold text-sm text-[#1A1A1A]">
                Fresher Pharmacovigilance Associate
              </p>
            </div>
            <div className="h-8 w-px bg-stone-200 hidden sm:block" />
            <div className="text-center">
              <p className="font-mono text-xs text-stone-500 uppercase tracking-widest mb-1">
                Duration
              </p>
              <p className="font-semibold text-sm text-[#1A1A1A]">12 weeks</p>
            </div>
            <div className="h-8 w-px bg-stone-200 hidden sm:block" />
            <div className="text-center">
              <p className="font-mono text-xs text-stone-500 uppercase tracking-widest mb-1">
                Price
              </p>
              <p className="font-bold text-base text-[#1B3F8B]">₹10,000</p>
            </div>
          </div>
        </Reveal>

        <Reveal
          delay={0.18}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          <WaButton
            id="pv-final-wa-cta"
            href={WA_HERO}
            className="h-13 px-9 text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-md font-bold"
            style={{ color: "#FFFFFF" }}
          >
            Chat on WhatsApp
          </WaButton>
          <WaButton
            id="pv-final-eligibility-cta"
            href={WA_ELIGIBILITY}
            className="h-13 px-9 text-sm border border-stone-300 bg-white text-stone-800 hover:border-[#1B3F8B] hover:text-[#1B3F8B] shadow-2xs font-bold"
            style={{ color: "#1C1917" }}
          >
            Check Eligibility
          </WaButton>
        </Reveal>

        <Reveal
          delay={0.26}
          className="rounded-2xl border border-stone-200 bg-white px-6 py-4 shadow-2xs max-w-2xl mx-auto"
        >
          <p className="text-xs text-stone-500 leading-relaxed font-mono">
            Arzon Global does not guarantee employment, placement, or interviews. Training,
            practical projects, assessments, and internship components are designed to prepare
            candidates for entry-level opportunities. Hiring decisions are made solely by employers.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ─── PV-specific footer extension ────────────────────────────────────────────

function PVFooter() {
  return <Footer />;
}

// ─── Sticky Mobile Bottom Bar ─────────────────────────────────────────────────

function StickyMobileBar() {
  const shouldReduceMotion = useReducedMotion();
  return (
    <div
      className="fixed bottom-0 inset-x-0 z-40 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ...TRANSITION_PRESETS.medium, delay: 0.8 }}
        className="flex gap-2 border-t border-stone-200 bg-white/95 backdrop-blur-xl px-4 py-3 shadow-lg"
      >
        <WaButton
          id="pv-sticky-wa-cta"
          href={WA_HERO}
          className="h-12 flex-1 text-xs bg-emerald-600 text-white shadow-xs font-bold"
          style={{ color: "#FFFFFF" }}
        >
          Chat on WhatsApp
        </WaButton>
        <WaButton
          id="pv-sticky-eligibility-cta"
          href={WA_ELIGIBILITY}
          className="h-12 flex-1 text-xs border border-stone-300 text-stone-800 bg-white font-bold"
          style={{ color: "#1C1917" }}
        >
          Check Eligibility
        </WaButton>
      </motion.div>
    </div>
  );
}
