import React, { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  MessageCircle,
  ArrowRight,
  ArrowDown,
  Play,
  Check,
  CheckCircle2,
  Plus,
  Minus,
  ShieldCheck,
  FileText,
  Database,
  Search,
  Award,
  Briefcase,
  Clock,
  Laptop,
  Users,
  Layers,
  Activity,
  Building2,
  HelpCircle,
  Send,
  Phone,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Code,
  FileCheck,
  Shield,
  BarChart3,
  Flame
  Eye,
  CheckSquare,
  AlertCircle,
  Stethoscope,
  BookOpen,
} from "lucide-react";
import { COUNSELLOR_PHONE, SITE, absUrl } from "@/components/landing/constants";
import { trackEvent } from "@/lib/analytics";

// ── WhatsApp URL Helper ───────────────────────────────────────────────────────
const waMsg = (text: string) =>
  `https://wa.me/${COUNSELLOR_PHONE}?text=${encodeURIComponent(text)}`;

const WA_HERO = waMsg(
  "Hi! I'm interested in the Pharmacovigilance Associate 12-Week Role Readiness Program. I'd like to talk to a career counsellor.",
);
const WA_COUNSELLOR = waMsg(
  "Hi! I want to check my eligibility for the Pharmacovigilance Associate Program and understand if PV is the right career fit for me.",
);

// ── Route Definition ─────────────────────────────────────────────────────────
export const Route = createFileRoute("/pv-associate")({
  head: () => {
    const title = "Build Toward a Pharmacovigilance Career | Arzon Global";
    const desc =
      "A role-focused 12-week program for B.Pharm, M.Pharm, Pharm.D and life-science graduates to prepare for entry-level Pharmacovigilance Associate roles. Understand the role, build industry skills, and prove readiness.";
    const url = `${SITE.origin}/pv-associate`;
    const og = absUrl(SITE.ogImage.inauguration);
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        {
          name: "keywords",
          content:
            "pharmacovigilance associate, pv associate training, bpharm pharmacovigilance, pharmd drug safety, mpharm pv jobs, icsr case processing, meddra coding, argus safety",
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
            "@type": "Course",
            name: "Pharmacovigilance Associate 12-Week Role Readiness Program",
            description: desc,
            provider: {
              "@type": "Organization",
              name: "Arzon Global",
              sameAs: SITE.origin,
            },
          }),
        },
      ],
    };
  },
  component: PVAssociateRebuildPage,
});

// ── FAQs Data ────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "Is this suitable for freshers?",
    a: "Yes. The program is specifically designed for fresh graduates and final-year students (B.Pharm, M.Pharm, Pharm.D, MBBS, BDS, and relevant life sciences) who want to build verified, job-ready practical skills for entry-level Pharmacovigilance Associate roles.",
  },
  {
    q: "Do I need previous PV experience?",
    a: "No previous experience is required. The curriculum begins with core pharmacological safety principles and methodically scales into authentic ICSR case triage, MedDRA coding hierarchies, narrative drafting, and safety database exposure.",
  },
  {
    q: "Will I get practical exposure?",
    a: "Yes. Over 60% of the program consists of hands-on simulation projects mirroring authentic drug safety operations: intake triage, adverse event extraction, MedDRA LLT mapping, causality assessments, and regulatory narrative writing.",
  },
  {
    q: "Do you provide placement support?",
    a: "We provide structured career preparation, including resume alignment to 247+ verified PV job descriptions, technical interview preparation for CRO/Pharma hiring panels, and verified Role Readiness scorecards that demonstrate practical competency.",
  },
  {
    q: "What qualifications can apply?",
    a: "Candidates with degrees or ongoing studies in B.Pharm, M.Pharm, Pharm.D, MBBS, BDS, BHMS, BAMS, B.Sc/M.Sc in Life Sciences, Biotechnology, Microbiology, or Biochemistry are eligible.",
  },
  {
    q: "What tools will be covered?",
    a: "You will master operational workflows and data entry standards modeled after global industry safety databases (such as Oracle Argus Safety and ARISg principles), MedDRA dictionary coding tools, and WHO-UMC causality algorithms.",
  },
  {
    q: "Will I get a certificate?",
    a: "Yes. Upon completing the 12-week syllabus, guided project deliverables, and the benchmark evaluation, you receive an official Arzon Role Readiness Certificate and ACRI Competency Scorecard.",
  },
  {
    q: "How do I apply?",
    a: "Click 'Talk to a Career Counsellor' to schedule an exploratory conversation. Our counsellors verify your academic background, explain the cohort roadmap, and guide you through the enrollment process.",
  },
];

// ── Main Page Component ──────────────────────────────────────────────────────
function PVAssociateRebuildPage() {
  const [isCounsellorModalOpen, setIsCounsellorModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isJdModalOpen, setIsJdModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isCaseModalOpen, setIsCaseModalOpen] = useState(false);
  const [selectedSkillModal, setSelectedSkillModal] = useState<string | null>(null);
  const [selectedEmployerModal, setSelectedEmployerModal] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Dynamic interactive highlights
  const [activeLaptopPill, setActiveLaptopPill] = useState<number>(0);
  const [matchedTraits, setMatchedTraits] = useState<Set<string>>(
    new Set(["Medical knowledge", "Structured processes", "Detailed work"]),
  );

  // Form states for counsellor callback modal
  const [counsellorForm, setCounsellorForm] = useState({
    name: "",
    phone: "",
    degree: "B.Pharm (Bachelor of Pharmacy)",
    year: "2025 / 2026 (Final Year)",
    consent: true,
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    trackEvent("pv_page_view", {
      path: "/pv-associate",
      source: "meta_paid_handshake",
    });
  }, []);

  const openCounsellor = (triggerSource: string) => {
    trackEvent("counsellor_cta_click", { source: triggerSource });
    setIsCounsellorModalOpen(true);
  };

  const handleCounsellorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!counsellorForm.name.trim() || !counsellorForm.phone.trim() || !counsellorForm.consent) return;
    trackEvent("whatsapp_started", {
      candidateName: counsellorForm.name,
      degree: counsellorForm.degree,
    });
    setFormSubmitted(true);
    setTimeout(() => {
      window.open(
        waMsg(
          `Hi Arzon Counsellor! I submitted my details:\nName: ${counsellorForm.name}\nDegree: ${counsellorForm.degree}\nYear: ${counsellorForm.year}\nPhone: ${counsellorForm.phone}\nI would like to explore the Pharmacovigilance Associate Program.`,
        ),
        "_blank",
      );
    }, 400);
  };

  const toggleTrait = (trait: string) => {
    setMatchedTraits((prev) => {
      const next = new Set(prev);
      if (next.has(trait)) {
        next.delete(trait);
      } else {
        next.add(trait);
      }
      return next;
    });
  };

  return (
    <div className="arzon-v2-page min-h-screen bg-white tone-light text-[var(--arzon-ink-soft)] font-sans antialiased selection:bg-[var(--arzon-blue-100)] selection:text-[var(--arzon-blue-700)]">
      {/* Programme-specific content starts below the global Arzon header. */}
      {/* ── 02. HERO SECTION (MOBILE-FIRST ARCHITECTURE) ────────────────────── */}
      <section className="relative overflow-hidden border-b border-[var(--arzon-border)] bg-white tone-light">
        <div className="arzon-v2-container pt-7 pb-3">
          <nav aria-label="Breadcrumb" className="text-xs font-medium text-[var(--arzon-ink-muted)]">
            <Link to="/" className="hover:text-[var(--arzon-blue-700)]">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/healthcare-careers" className="hover:text-[var(--arzon-blue-700)]">Careers</Link>
            <span className="mx-2">/</span>
            <span className="text-[var(--arzon-ink-soft)]">Pharmacovigilance</span>
          </nav>
        </div>

        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content (Always first on mobile and desktop) */}
            <div className="lg:col-span-7 space-y-5">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF6FF] border border-[#1557D6]/20">
                <span className="h-2 w-2 rounded-full bg-[#1557D6] motion-safe:animate-pulse" />
                <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-[0.18em] text-[#071A4A]">
                  PHARMACOVIGILANCE · PV ASSOCIATE PROGRAMME
                </span>
              </div>

              {/* H1 Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight leading-[1.02] text-[#071A4A]">
                Build the skills employers expect in{" "}
                <span className="text-[var(--arzon-blue-700)]">Pharmacovigilance Associate</span> roles.
              </h1>

              {/* Subhead */}
              <p className="text-base sm:text-lg font-bold text-[#071A4A] leading-snug">
                Learn the workflow. Practice the work. Build evidence. Measure your readiness.
              </p>

              {/* Description */}
              <p className="text-sm sm:text-base text-[#69758A] max-w-[540px] leading-relaxed">
                A 12-week role-readiness programme for B.Pharm, M.Pharm, Pharm.D and relevant life-sciences graduates who want to understand and practise real Pharmacovigilance workflows.
              </p>

              {/* Hero CTA Row (Full width on mobile) */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <Link
                  to="/career-engine"
                  className="arzon-v2-button-primary text-sm cursor-pointer group"
                >
                  <Search className="h-4 w-4" />
                  <span>CHECK MY FIT FOR PV</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/enrol"
                  search={{ programme: "pharmacovigilance", source: "pv-associate-hero" }}
                  className="arzon-v2-button-secondary text-sm"
                >
                  <span>VIEW PROGRAMME &amp; FEES</span>
                  <ArrowRight className="h-4 w-4 text-[var(--arzon-blue-600)]" />
                </Link>
              </div>

              {/* Microcopy */}
              <p className="text-xs text-[#69758A] font-medium pt-1">
                Not sure whether Pharmacovigilance fits you? Start with the free career assessment.
              </p>

              {/* Trust Proof Strip */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-[#E4EAF2]">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-[#EEF6FF] text-[#1557D6] flex items-center justify-center shrink-0">
                    <Activity className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-semibold text-[#071A4A] leading-tight">
                    Role-First Learning
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-[#EEF6FF] text-[#1557D6] flex items-center justify-center shrink-0">
                    <Search className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-semibold text-[#071A4A] leading-tight">
                    Built from role research
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-[#EEF6FF] text-[#1557D6] flex items-center justify-center shrink-0">
                    <Layers className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-semibold text-[#071A4A] leading-tight">
                    Applied PV projects
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-[#EEF6FF] text-[#1557D6] flex items-center justify-center shrink-0">
                    <Award className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-semibold text-[#071A4A] leading-tight">
                    Readiness assessment
                  </span>
                </div>
              </div>
            </div>

            {/* Right Visual (Interactive Functional Elements) */}
            <div className="lg:col-span-5 relative mt-4 lg:mt-0">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#E4EAF2] bg-[#F7FAFC]">
                {/* Photorealistic Hero Image */}
                <img
                  src="/images/pv-landing/hero-student-hd.jpg?v=3"
                  alt="Young Indian pharmacy professional at workstation"
                  className="w-full h-[380px] sm:h-[460px] lg:h-[500px] object-cover object-top"
                  onError={(e) => {
                    e.currentTarget.src = "/images/pv-student-hero.jpg";
                  }}
                />

                {/* Soft White Gradient from Left into Photograph */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-transparent to-transparent pointer-events-none" />

                {/* Floating Card 1: Interactive ICSR Case (Top-Left) */}
                <div
                  onClick={() => {
                    trackEvent("icsr_case_card_click");
                    setIsCaseModalOpen(true);
                  }}
                  className="absolute top-4 left-4 rounded-xl bg-white/95 backdrop-blur-md p-3.5 shadow-md border border-[#E4EAF2] text-[11px] w-[210px] tone-light card-light cursor-pointer hover:border-[#1557D6] hover:shadow-lg transition-all group"
                  title="Click to inspect live ICSR intake details"
                >
                  <div className="flex items-center justify-between border-b border-[#E4EAF2] pb-1.5 mb-2">
                    <span className="font-mono font-bold text-[#1557D6] tracking-wider uppercase text-[10px] flex items-center gap-1">
                      <span>ICSR Case</span>
                      <Eye className="h-3 w-3 opacity-60 group-hover:opacity-100" />
                    </span>
                    <span className="h-2 w-2 rounded-full bg-emerald-500 motion-safe:animate-pulse" />
                  </div>
                  <div className="space-y-1 font-mono text-[10.5px]">
                    <div className="flex justify-between text-[#69758A] hover:bg-[#EEF6FF] rounded px-1 py-0.5 transition-colors">
                      <span>Case ID</span>
                      <strong className="text-[#071A4A]">PV-2048</strong>
                    </div>
                    <div className="flex justify-between text-[#69758A] hover:bg-[#EEF6FF] rounded px-1 py-0.5 transition-colors">
                      <span>Patient</span>
                      <strong className="text-[#071A4A]">34/F</strong>
                    </div>
                    <div className="flex justify-between text-[#69758A] hover:bg-[#EEF6FF] rounded px-1 py-0.5 transition-colors">
                      <span>Suspect Drug</span>
                      <strong className="text-[#071A4A]">Amoxicillin</strong>
                    </div>
                    <div className="flex justify-between text-[#69758A] hover:bg-[#EEF6FF] rounded px-1 py-0.5 transition-colors">
                      <span>Adverse Event</span>
                      <strong className="text-[#EF4444]">Severe rash</strong>
                    </div>
                    <div className="flex justify-between text-[#69758A] hover:bg-[#EEF6FF] rounded px-1 py-0.5 transition-colors">
                      <span>Seriousness</span>
                      <strong className="text-[#F59E0B]">Under assessment</strong>
                    </div>
                    <div className="flex justify-between text-[#69758A] hover:bg-[#EEF6FF] rounded px-1 py-0.5 transition-colors">
                      <span>Action</span>
                      <strong className="text-[#27B9B3]">Case processing →</strong>
                    </div>
                  </div>
                </div>

                {/* Floating Card 2: Interactive Skill Badges (Top-Right, matching reference) */}
                <div className="absolute top-4 right-4 rounded-xl bg-white/95 backdrop-blur-md p-2.5 sm:p-3 shadow-md border border-[#E4EAF2] space-y-2 text-[11px] tone-light card-light hidden sm:block">
                  {[
                    { label: "ICSR Processing", icon: FileText, color: "text-[#1557D6]", bg: "bg-[#EEF6FF]" },
                    { label: "MedDRA Coding", icon: Database, color: "text-[#6946E8]", bg: "bg-[#F1EEFF]" },
                    { label: "Safety Assessment", icon: Shield, color: "text-[#27B9B3]", bg: "bg-[#E6F8F7]" },
                    { label: "Case Narratives", icon: FileCheck, color: "text-[#1557D6]", bg: "bg-[#EEF6FF]" },
                  ].map((sk) => {
                    const Icon = sk.icon;
                    return (
                      <div
                        key={sk.label}
                        onClick={() => setSelectedSkillModal(sk.label)}
                        className="flex items-center gap-2 hover:bg-[#F7FAFC] rounded px-1.5 py-1 transition-colors cursor-pointer group"
                      >
                        <div className={`h-6 w-6 rounded-md ${sk.bg} ${sk.color} flex items-center justify-center shrink-0`}>
                          <Icon className="h-3.5 w-3.5" />
                        </div>
                        <span className="font-semibold text-[#071A4A] group-hover:text-[#1557D6] transition-colors">
                          {sk.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--arzon-border)] bg-[var(--arzon-surface-subtle)] tone-light">
        <div className="arzon-v2-container grid gap-3 py-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["12 WEEKS", "Role-focused learning path"],
            ["ICSR + MEDDRA", "Core PV operational skills"],
            ["3 APPLIED PROJECTS", "Work samples to review"],
            ["READINESS", "Benchmark before enrolment"],
          ].map(([value, label]) => (
            <div key={value} className="arzon-v2-card p-4">
              <p className="arzon-v2-data-label">{value}</p>
              <p className="mt-1 text-sm font-semibold text-[var(--arzon-ink)]">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 03. WHAT DOES A PV ASSOCIATE ACTUALLY DO? ────────────────────────── */}
      <section id="role-workflow" className="py-14 sm:py-20 bg-white border-b border-[#E4EAF2]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Video Card with Modal Trigger (Cols 1-6) */}
            <div className="lg:col-span-6">
              <div
                onClick={() => {
                  trackEvent("role_video_play");
                  setIsVideoModalOpen(true);
                }}
                className="group relative rounded-2xl overflow-hidden border border-[#E4EAF2] shadow-md cursor-pointer aspect-video sm:h-[300px] w-full bg-[#071A4A]"
              >
                <img
                  src="/images/pv-landing/video-workstation-hd.jpg?v=3"
                  alt="Pharmacovigilance Associate workstation"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  onError={(e) => {
                    e.currentTarget.src = "/images/pv-clinical-workstation.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-[#071A4A]/40 group-hover:bg-[#071A4A]/30 transition-colors flex flex-col items-center justify-center text-center p-4">
                  {/* Play Button */}
                  <div className="h-16 w-16 rounded-full bg-white tone-light shadow-xl flex items-center justify-center text-[#1557D6] group-hover:scale-110 transition-transform">
                    <Play className="h-7 w-7 fill-current ml-1 text-[#1557D6]" />
                  </div>
                  <div className="mt-4 font-semibold text-xs sm:text-sm text-slate-50">
                    See what a PV Associate actually does{" "}
                    <span className="text-[#27B9B3] font-mono">(2 min)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Text & Workflow (Cols 7-12) */}
            <div className="lg:col-span-6 space-y-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#071A4A] tracking-tight leading-snug">
                What Does a Pharmacovigilance <br className="hidden sm:block" />
                Associate Actually Do?
              </h2>
              <p className="text-sm sm:text-base text-[#69758A] leading-relaxed">
                A PV Associate works with drug safety data to identify, assess and document adverse events. This role contributes to patient safety and regulatory compliance across global pharmaceutical organizations.
              </p>

              {/* PV Workflow Sequence */}
              <div className="pt-4">
                <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#1557D6] mb-3">
                  THE DAILY OPERATIONAL WORKFLOW
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center">
                  {[
                    { title: "Case Intake", icon: FileText, color: "text-[#1557D6]", bg: "bg-[#EEF6FF]" },
                    { title: "Triage & Validation", icon: ShieldCheck, color: "text-[#27B9B3]", bg: "bg-[#E6F8F7]" },
                    { title: "MedDRA Coding", icon: Database, color: "text-[#6946E8]", bg: "bg-[#F1EEFF]" },
                    { title: "Narrative Writing", icon: FileCheck, color: "text-[#1557D6]", bg: "bg-[#EEF6FF]" },
                    { title: "Quality Review", icon: CheckCircle2, color: "text-[#27B9B3]", bg: "bg-[#E6F8F7]" },
                    { title: "Follow-up & Reporting", icon: Activity, color: "text-[#F59E0B]", bg: "bg-[#FFF8EE]" },
                  ].map((step) => {
                    const Icon = step.icon;
                    return (
                      <div
                        key={step.title}
                        onClick={() => setSelectedSkillModal(step.title)}
                        className="rounded-xl border border-[#E4EAF2] bg-[#F7FAFC] p-3 flex flex-col items-center justify-between min-h-[96px] shadow-2xs hover:border-[#1557D6] transition-colors cursor-pointer group"
                      >
                        <div className={`h-8 w-8 rounded-lg ${step.bg} ${step.color} flex items-center justify-center shrink-0`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className="text-[11px] font-bold text-[#071A4A] group-hover:text-[#1557D6] transition-colors leading-tight mt-2">
                          {step.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 04. WHAT EMPLOYERS EXPECT FROM A FRESHER ────────────────────────── */}
      <section className="py-14 sm:py-20 bg-[#EEF6FF] border-b border-[#E4EAF2]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 space-y-8">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-[0.18em] text-[#1557D6]">
                BASED ON ANALYSIS OF 247+ PV ASSOCIATE JOB DESCRIPTIONS
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#071A4A] tracking-tight mt-1.5">
                What Employers Expect from a Fresher
              </h2>
            </div>
            <button
              type="button"
              onClick={() => {
                trackEvent("job_description_click");
                setIsJdModalOpen(true);
              }}
              className="h-10 px-4 rounded-xl border border-[#1557D6] bg-white tone-light hover:bg-[#EEF6FF] text-[#1557D6] font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto shrink-0"
            >
              <span>View Sample Job Descriptions</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* 6 Requirement Cards (2 cols on mobile, 6 cols on desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {[
              {
                id: "01",
                title: "ICSR Case Processing",
                desc: "End-to-end handling of individual case safety reports",
                icon: FileText,
                color: "text-[#6946E8]",
                bg: "bg-[#F1EEFF]",
              },
              {
                id: "02",
                title: "MedDRA Coding",
                desc: "Adverse event terminology and accurate coding",
                icon: Database,
                color: "text-[#1557D6]",
                bg: "bg-[#EEF6FF]",
              },
              {
                id: "03",
                title: "Narrative Writing",
                desc: "Clear, structured case documentation",
                icon: FileCheck,
                color: "text-[#6946E8]",
                bg: "bg-[#F1EEFF]",
              },
              {
                id: "04",
                title: "Case Follow-up",
                desc: "Managing missing information and completing cases",
                icon: Users,
                color: "text-[#F59E0B]",
                bg: "bg-[#FFF8EE]",
              },
              {
                id: "05",
                title: "PV Tools",
                desc: "Exposure to systems like Argus / ARISg",
                icon: Laptop,
                color: "text-[#1557D6]",
                bg: "bg-[#EEF6FF]",
              },
              {
                id: "06",
                title: "Regulatory Awareness",
                desc: "ICH-GVP and global safety regulations",
                icon: ShieldCheck,
                color: "text-[#27B9B3]",
                bg: "bg-[#E6F8F7]",
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  onClick={() => setSelectedSkillModal(card.title)}
                  className="rounded-2xl border border-[#E4EAF2] bg-white tone-light p-5 flex flex-col justify-between min-h-[170px] shadow-2xs hover:border-[#1557D6] hover:shadow-md transition-all group cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`h-9 w-9 rounded-xl ${card.bg} ${card.color} flex items-center justify-center shrink-0`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#69758A]">
                      {card.id}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#071A4A] group-hover:text-[#1557D6] transition-colors leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-xs text-[#69758A] mt-1.5 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 05. ROLE-FIRST DARK SECTION ─────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-[#071A4A] text-slate-50 overflow-hidden relative border-b border-[#071A4A]">
        {/* Abstract background accents */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#1557D6]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content & Comparison (Cols 1-6) */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight leading-[1.1] text-slate-50">
                  Most Courses Start with the Syllabus. <br />
                  <span className="text-[#27B9B3]">We Start with the Job.</span>
                </h2>
                <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed max-w-lg">
                  Arzon reverse-engineers its training from real job descriptions. You learn what actually matters for the role — not just theory.
                </p>
              </div>

              {/* Comparison Cards: Traditional vs Arzon */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Traditional Course */}
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 sm:p-5 space-y-3">
                  <div className="font-bold text-xs uppercase tracking-wider text-slate-400 font-mono">
                    Traditional Course
                  </div>
                  <ul className="space-y-2 text-xs text-slate-300 font-medium">
                    <li className="flex items-center gap-2">
                      <span className="text-slate-500 font-bold">☒</span>
                      <span>Generic syllabus</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-slate-500 font-bold">☒</span>
                      <span>Theoretical learning</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-slate-500 font-bold">☒</span>
                      <span>No real practice</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-slate-500 font-bold">☒</span>
                      <span>Certificate only</span>
                    </li>
                  </ul>
                </div>

                {/* Arzon Approach */}
                <div className="rounded-xl border-2 border-[#27B9B3] bg-white tone-light p-4 sm:p-5 space-y-3 text-[#071A4A] shadow-lg">
                  <div className="font-bold text-xs uppercase tracking-wider text-[#1557D6] font-mono">
                    Arzon Approach
                  </div>
                  <ul className="space-y-2 text-xs font-semibold text-[#071A4A]">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#27B9B3] shrink-0" />
                      <span>Job description analysis</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#27B9B3] shrink-0" />
                      <span>Role-based training</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#27B9B3] shrink-0" />
                      <span>Hands-on practice</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#27B9B3] shrink-0" />
                      <span>Assessment &amp; readiness</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right: Laptop Screen Mockup with Real Interactive JD Highlights */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-2xl border border-white/20 bg-slate-900/90 p-4 sm:p-6 shadow-2xl backdrop-blur-md">
                {/* Laptop Header Bar */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                    <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                    <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="font-mono text-[10px] text-slate-400">
                    CRO / Pharma Verified Role Spec v2.4
                  </span>
                </div>

                {/* Job Description Content on Screen */}
                <div className="space-y-3 font-sans text-xs text-slate-200">
                  <div className="font-bold text-sm sm:text-base text-slate-50 flex items-center justify-between">
                    <span>Pharmacovigilance Associate</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      LIVE JD REQUIREMENT
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 font-mono">
                    Key Responsibilities &amp; Daily Deliverables:
                  </p>

                  <ul className="space-y-2 text-xs font-mono">
                    <li className={`flex items-start gap-2 p-1 rounded transition-colors ${activeLaptopPill === 0 ? "bg-[#27B9B3]/20 border border-[#27B9B3]/40" : ""}`}>
                      <span className="text-[#27B9B3] font-bold">✓</span>
                      <span>
                        Process individual{" "}
                        <mark className="bg-amber-300 text-stone-900 px-1 rounded font-bold">
                          case safety reports (ICSRs)
                        </mark>
                      </span>
                    </li>
                    <li className={`flex items-start gap-2 p-1 rounded transition-colors ${activeLaptopPill === 1 ? "bg-[#1557D6]/20 border border-[#1557D6]/40" : ""}`}>
                      <span className="text-[#27B9B3] font-bold">✓</span>
                      <span>
                        Perform{" "}
                        <mark className="bg-amber-300 text-stone-900 px-1 rounded font-bold">
                          MedDRA coding
                        </mark>{" "}
                        for reported adverse reactions
                      </span>
                    </li>
                    <li className={`flex items-start gap-2 p-1 rounded transition-colors ${activeLaptopPill === 2 ? "bg-[#23C55E]/20 border border-[#23C55E]/40" : ""}`}>
                      <span className="text-[#27B9B3] font-bold">✓</span>
                      <span>
                        Prepare{" "}
                        <mark className="bg-amber-300 text-stone-900 px-1 rounded font-bold">
                          case narratives
                        </mark>{" "}
                        aligned with ICH E2D guidelines
                      </span>
                    </li>
                    <li className={`flex items-start gap-2 p-1 rounded transition-colors ${activeLaptopPill === 3 ? "bg-white/20 border border-white/40" : ""}`}>
                      <span className="text-[#27B9B3] font-bold">✓</span>
                      <span>
                        Work on{" "}
                        <mark className="bg-amber-300 text-stone-900 px-1 rounded font-bold">
                          Argus Safety / ARISg
                        </mark>{" "}
                        workflows
                      </span>
                    </li>
                    <li className={`flex items-start gap-2 p-1 rounded transition-colors ${activeLaptopPill === 4 ? "bg-[#6946E8]/20 border border-[#6946E8]/40" : ""}`}>
                      <span className="text-[#27B9B3] font-bold">✓</span>
                      <span>
                        Ensure{" "}
                        <mark className="bg-amber-300 text-stone-900 px-1 rounded font-bold">
                          case follow-up and closure
                        </mark>{" "}
                        under SLA
                      </span>
                    </li>
                    <li className="flex items-start gap-2 p-1">
                      <span className="text-[#27B9B3] font-bold">✓</span>
                      <span>Support aggregate reporting and health authority compliance</span>
                    </li>
                  </ul>
                </div>

                {/* Floating Connected Pills (Interactive) */}
                <div className="pt-6 flex flex-wrap gap-2 border-t border-white/10 mt-4">
                  {[
                    { label: "ICSR Processing", bg: "bg-[#27B9B3] text-[#071A4A]" },
                    { label: "MedDRA Coding", bg: "bg-[#1557D6] text-slate-50" },
                    { label: "Narrative Writing", bg: "bg-[#23C55E] text-[#071A4A]" },
                    { label: "Argus / ARISg", bg: "bg-white text-[#071A4A]" },
                    { label: "Case Follow-up", bg: "bg-[#6946E8] text-slate-50" },
                  ].map((pill, idx) => (
                    <button
                      key={pill.label}
                      type="button"
                      onMouseEnter={() => setActiveLaptopPill(idx)}
                      onClick={() => setActiveLaptopPill(idx)}
                      className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold transition-transform cursor-pointer ${pill.bg} ${activeLaptopPill === idx ? "scale-105 ring-2 ring-white" : "opacity-85 hover:opacity-100"}`}
                    >
                      {pill.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 06. WHAT YOU'LL ACTUALLY PRACTICE ──────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-white border-b border-[#E4EAF2]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#071A4A] tracking-tight">
                What You&apos;ll Actually Practice
              </h2>
              <p className="text-sm sm:text-base text-[#69758A] mt-1.5">
                Work on real-world scenarios and build job-relevant skills through guided projects.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                trackEvent("project_work_click");
                setIsProjectModalOpen(true);
              }}
              className="h-10 px-4 rounded-xl border border-[#1557D6] bg-white tone-light hover:bg-[#EEF6FF] text-[#1557D6] font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto shrink-0"
            >
              <span>View Sample Project Work</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* 4 Project Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                num: "Project 01",
                title: "ICSR Case Processing",
                desc: "From case intake to final narrative documentation.",
                icon: FileText,
                color: "text-[#6946E8]",
                bg: "bg-[#F1EEFF]",
              },
              {
                num: "Project 02",
                title: "MedDRA Coding",
                desc: "Code adverse events using official MedDRA terminology.",
                icon: Database,
                color: "text-[#27B9B3]",
                bg: "bg-[#E6F8F7]",
              },
              {
                num: "Project 03",
                title: "Safety Assessment",
                desc: "Assess causality, seriousness and expectedness criteria.",
                icon: Shield,
                color: "text-[#F59E0B]",
                bg: "bg-[#FFF8EE]",
              },
              {
                num: "Project 04",
                title: "Final PV Project",
                desc: "End-to-end case handling and audit report preparation.",
                icon: BarChart3,
                color: "text-[#1557D6]",
                bg: "bg-[#EEF6FF]",
              },
            ].map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.num}
                  onClick={() => setIsProjectModalOpen(true)}
                  className="rounded-2xl border border-[#E4EAF2] bg-[#F7FAFC] p-6 space-y-4 hover:border-[#1557D6] hover:bg-white hover:shadow-md transition-all group cursor-pointer"
                >
                  <div className={`h-11 w-11 rounded-xl ${p.bg} ${p.color} flex items-center justify-center`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#69758A]">
                      {p.num}
                    </span>
                    <h3 className="font-bold text-base text-[#071A4A] group-hover:text-[#1557D6] transition-colors mt-0.5">
                      {p.title}
                    </h3>
                    <p className="text-xs text-[#69758A] mt-1.5 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 07. YOUR 12-WEEK JOURNEY (RESPONSIVE VERTICAL / HORIZONTAL) ─────── */}
      <section id="curriculum-journey" className="py-14 sm:py-20 bg-[#F7FAFC] border-b border-[#E4EAF2]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 space-y-10">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#071A4A] tracking-tight">
              Your 12-Week Journey
            </h2>
            <p className="text-sm sm:text-base text-[#69758A] mt-1.5">
              A structured path from fundamentals to real-world practice and career preparation.
            </p>
          </div>

          {/* Timeline Nodes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 relative">
            {[
              {
                step: "01",
                time: "Weeks 1–3",
                title: "Role Orientation",
                desc: "PV fundamentals, industry context and job expectations.",
                color: "bg-[#1557D6]",
              },
              {
                step: "02",
                time: "Weeks 4–7",
                title: "Role Skills",
                desc: "ICSR, MedDRA, narratives, safety concepts and tools.",
                color: "bg-[#06B6D4]",
              },
              {
                step: "03",
                time: "Weeks 8–9",
                title: "Practical Projects",
                desc: "Hands-on case work and documentation.",
                color: "bg-[#6946E8]",
              },
              {
                step: "04",
                time: "Week 10",
                title: "Assessment",
                desc: "Evaluate your knowledge and practical skills.",
                color: "bg-[#27B9B3]",
              },
              {
                step: "05",
                time: "Week 11",
                title: "Internship / Exposure",
                desc: "Structured practical experience.",
                color: "bg-[#F59E0B]",
              },
              {
                step: "06",
                time: "Week 12",
                title: "Career Preparation",
                desc: "Resume, interview guidance and next steps.",
                color: "bg-[#8B5CF6]",
              },
            ].map((node) => (
              <div
                key={node.step}
                className="rounded-2xl border border-[#E4EAF2] bg-white tone-light p-5 space-y-3 shadow-2xs hover:border-[#1557D6] transition-colors relative"
              >
                <div className={`h-8 w-8 rounded-full ${node.color} text-slate-50 flex items-center justify-center font-mono text-xs font-black shadow-xs`}>
                  {node.step}
                </div>
                <div>
                  <span className="font-mono text-[10px] font-bold text-[#1557D6] uppercase tracking-wider block">
                    {node.time}
                  </span>
                  <h3 className="font-bold text-sm text-[#071A4A] mt-0.5">
                    {node.title}
                  </h3>
                  <p className="text-xs text-[#69758A] mt-1 leading-relaxed">
                    {node.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 08. ASSESSMENT & ROLE READINESS + INTERNSHIP EXPOSURE ───────────── */}
      <section className="py-14 sm:py-20 bg-white border-b border-[#E4EAF2]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left: Assessment & Readiness (Cols 1-6) */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071A4A] tracking-tight">
                  Assessment &amp; Role Readiness
                </h2>
                <p className="text-sm text-[#69758A] mt-1">
                  Know where you stand with a structured evaluation based on role-specific competencies.
                </p>
              </div>

              {/* Progress Bars & Donut Card */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                {/* Horizontal Progress Bars (Cols 1-7) */}
                <div className="sm:col-span-7 rounded-2xl border border-[#E4EAF2] bg-[#F7FAFC] p-5 space-y-3.5">
                  <div className="font-bold text-xs uppercase tracking-wider text-[#071A4A] font-mono border-b border-[#E4EAF2] pb-2">
                    Sample Readiness Report
                  </div>
                  {[
                    { label: "PV Knowledge", pct: 82 },
                    { label: "ICSR Processing", pct: 78 },
                    { label: "MedDRA Coding", pct: 85 },
                    { label: "Case Documentation", pct: 80 },
                    { label: "Safety Assessment", pct: 76 },
                  ].map((row) => (
                    <div key={row.label} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-[#071A4A]">
                        <span>{row.label}</span>
                        <span className="font-mono text-[#1557D6]">{row.pct}%</span>
                      </div>
                      <div className="h-2 w-full bg-[#E4EAF2] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#1557D6] to-[#27B9B3] rounded-full transition-all duration-700"
                          style={{ width: `${row.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Overall Role Readiness Donut (Cols 8-12) */}
                <div className="sm:col-span-5 rounded-2xl border border-[#E4EAF2] bg-[#F7FAFC] p-5 flex flex-col items-center justify-center text-center">
                  <span className="font-bold text-xs uppercase tracking-wider text-[#071A4A] font-mono mb-2">
                    Overall Role Readiness
                  </span>

                  {/* SVG Donut Chart */}
                  <div className="relative w-28 h-28 my-1 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-[#E4EAF2]"
                        strokeWidth="3.2"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-[#27B9B3]"
                        strokeDasharray="81, 100"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-extrabold text-2xl text-[#071A4A]">81%</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#69758A] font-mono italic">
                    *Illustrative example
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Internship / Practical Exposure (Cols 7-12) */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071A4A] tracking-tight">
                  Internship / Practical Exposure
                </h2>
                <p className="text-sm text-[#69758A] mt-1">
                  Gain structured exposure to real-world PV workflows and build confidence before you apply.
                </p>
              </div>

              {/* Internship Visual with Checklist Overlay */}
              <div className="relative rounded-2xl overflow-hidden border border-[#E4EAF2] shadow-sm bg-[#F7FAFC]">
                <img
                  src="/images/pv-landing/internship-hd.jpg?v=3"
                  alt="Practical PV Internship Exposure"
                  className="w-full h-[220px] sm:h-[260px] object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/images/pv-case-triage.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071A4A]/80 via-transparent to-transparent flex items-end p-4 sm:p-5">
                  <div className="rounded-xl bg-white/95 backdrop-blur-md p-3.5 sm:p-4 shadow-lg border border-[#E4EAF2] w-full text-xs space-y-1.5 tone-light card-light">
                    {[
                      "Case processing",
                      "Data review",
                      "Documentation",
                      "Quality check",
                      "Mentor feedback",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2 font-semibold text-[#071A4A]">
                        <Check className="h-3.5 w-3.5 text-[#27B9B3] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 09. WHERE THIS ROLE EXISTS ───────────────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-white border-b border-[#E4EAF2]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 space-y-8 text-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071A4A] tracking-tight">
              Where This Role Exists
            </h2>
            <p className="text-sm sm:text-base text-[#69758A] mt-1 max-w-xl mx-auto">
              Pharmacovigilance opportunities exist across global pharma companies, CROs and life-science organizations.
            </p>
          </div>

          {/* 7 Employer Brand Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
            {[
              { name: "IQVIA", logoText: "IQVIA", color: "text-[#1557D6]" },
              { name: "Cognizant", logoText: "Cognizant", color: "text-[#0B2545]" },
              { name: "Accenture", logoText: "accenture", color: "text-[#071A4A]" },
              { name: "Parexel", logoText: "parexel.", color: "text-[#6946E8]" },
              { name: "Dr. Reddy's", logoText: "Dr.Reddy's", color: "text-[#6946E8]" },
              { name: "Sun Pharma", logoText: "SUN PHARMA", color: "text-[#D97706]" },
              { name: "Cipla", logoText: "Cipla", color: "text-[#1557D6]" },
            ].map((emp) => (
              <div
                key={emp.name}
                onClick={() => setSelectedEmployerModal(emp.name)}
                className="h-16 rounded-xl border border-[#E4EAF2] bg-white tone-light shadow-2xs hover:border-[#1557D6] hover:shadow-xs transition-all flex items-center justify-center p-2 text-center cursor-pointer group"
                title={`Click to view ${emp.name} entry-level PV role profile`}
              >
                <span className={`font-bold font-sans text-sm tracking-tight ${emp.color} group-hover:scale-105 transition-transform`}>
                  {emp.logoText}
                </span>
              </div>
            ))}
          </div>

          {/* Legal Disclaimer */}
          <p className="text-[11px] text-[#69758A] font-mono max-w-2xl mx-auto">
            Employer examples are provided for career research and role context. They do not imply hiring partnerships or placement guarantees.
          </p>
        </div>
      </section>

      {/* ── 10. IS PHARMACOVIGILANCE RIGHT FOR YOU? ─────────────────────────── */}
      <section className="py-14 sm:py-20 bg-gradient-to-b from-[#F7FAFC] to-white border-b border-[#E4EAF2]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Professional Image with Abstract Blob (Cols 1-5) */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-64 sm:w-80 h-72 sm:h-96">
                {/* Abstract Blob Behind */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#1557D6]/20 via-[#6946E8]/20 to-[#27B9B3]/20 rounded-full blur-xl transform scale-95" />
                <img
                  src="/images/pv-landing/careerfit-hd.jpg?v=3"
                  alt="Healthcare Graduate Exploring Pharmacovigilance Career"
                  className="relative z-10 w-full h-full object-cover object-top rounded-2xl border border-[#E4EAF2] shadow-md"
                  onError={(e) => {
                    e.currentTarget.src = "/images/pv-career-graduate.jpg";
                  }}
                />
              </div>
            </div>

            {/* Right: Fit Characteristics & Counsellors (Cols 6-12) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#071A4A] tracking-tight">
                  Is Pharmacovigilance Right for You?
                </h2>
                <div className="flex items-center justify-between gap-2 mt-1.5">
                  <p className="text-sm sm:text-base text-[#69758A] font-medium">
                    You might be a good fit if you enjoy:
                  </p>
                  <span className="font-mono text-xs font-bold text-[#1557D6] bg-[#EEF6FF] px-2.5 py-0.5 rounded-full">
                    {matchedTraits.size}/5 Matched
                  </span>
                </div>
              </div>

              {/* 5 Characteristics (Interactive check toggle) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { title: "Medical knowledge", icon: Activity, bg: "bg-[#EEF6FF]", color: "text-[#1557D6]" },
                  { title: "Structured processes", icon: Database, bg: "bg-[#F1EEFF]", color: "text-[#6946E8]" },
                  { title: "Detailed work", icon: Search, bg: "bg-[#E6F8F7]", color: "text-[#27B9B3]" },
                  { title: "Documentation", icon: FileText, bg: "bg-[#EEF6FF]", color: "text-[#1557D6]" },
                  { title: "Safety and compliance", icon: ShieldCheck, bg: "bg-[#FFF8EE]", color: "text-[#F59E0B]" },
                ].map((fit) => {
                  const Icon = fit.icon;
                  const isChecked = matchedTraits.has(fit.title);
                  return (
                    <div
                      key={fit.title}
                      onClick={() => toggleTrait(fit.title)}
                      className={`rounded-xl border p-3.5 flex items-center justify-between shadow-2xs transition-all cursor-pointer ${isChecked ? "border-[#1557D6] bg-[#EEF6FF]/30" : "border-[#E4EAF2] bg-white tone-light hover:border-[#1557D6]"}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`h-8 w-8 rounded-lg ${fit.bg} ${fit.color} flex items-center justify-center shrink-0`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className="text-xs font-bold text-[#071A4A] leading-tight">
                          {fit.title}
                        </span>
                      </div>
                      <div className={`h-4 w-4 rounded flex items-center justify-center border text-[10px] ${isChecked ? "bg-[#1557D6] border-[#1557D6] text-white" : "border-stone-300"}`}>
                        {isChecked && <Check className="h-3 w-3" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Counsellor Row */}
              <div className="pt-4 border-t border-[#E4EAF2] space-y-4">
                <button
                  type="button"
                  onClick={() => openCounsellor("career_fit")}
                  className="w-full sm:w-auto h-12 px-6 rounded-xl bg-[#071A4A] hover:bg-[#1557D6] text-slate-50 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-sm transition-colors cursor-pointer"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-400" />
                  <span>Talk to a Career Counsellor →</span>
                </button>

                <div className="flex items-center gap-3">
                  {/* 4 Counsellor Portraits */}
                  <div className="flex -space-x-2 shrink-0">
                    {["avatar-ananya.jpg", "avatar-priya.jpg", "avatar-rahul.jpg", "avatar-sneha.jpg"].map(
                      (av, idx) => (
                        <img
                          key={idx}
                          src={`/images/${av}`}
                          alt="Arzon Career Counsellor"
                          className="h-8 w-8 rounded-full border-2 border-white object-cover shadow-xs"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ),
                    )}
                  </div>
                  <p className="text-xs text-[#69758A] font-medium leading-tight">
                    Our counsellors will help you determine if PV is the right path for you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 11. FREQUENTLY ASKED QUESTIONS ──────────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-white border-b border-[#E4EAF2]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 space-y-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071A4A] tracking-tight text-center sm:text-left">
              Frequently Asked Questions
            </h2>
          </div>

          {/* 2-Column Accordion Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={faq.q}
                  className={`rounded-2xl border transition-all ${
                    isOpen
                      ? "border-[#1557D6] bg-[#EEF6FF]/40 shadow-xs"
                      : "border-[#E4EAF2] bg-white tone-light hover:border-[#1557D6]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      trackEvent("faq_open", { question: faq.q });
                      setOpenFaqIndex(isOpen ? null : index);
                    }}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 cursor-pointer"
                  >
                    <span className="font-bold text-xs sm:text-sm text-[#071A4A] leading-snug">
                      {faq.q}
                    </span>
                    <span
                      className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 text-sm font-bold transition-transform ${
                        isOpen ? "bg-[#1557D6] text-slate-50 rotate-180" : "bg-[#F7FAFC] text-[#1557D6]"
                      }`}
                    >
                      {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-[#69758A] leading-relaxed border-t border-[#E4EAF2]/60 mt-1">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 12. FINAL FOOTER CTA ────────────────────────────────────────────── */}
      <footer className="py-14 sm:py-16 bg-[#071A4A] text-slate-50 border-t border-slate-800">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-10 border-b border-slate-800">
            {/* Left: Brand Identity */}
            <div className="flex items-center gap-4">
              <div className="h-11 w-11 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center font-black text-xl text-[#27B9B3]">
                A
              </div>
              <div>
                <span className="font-extrabold text-lg tracking-tight text-slate-50 block font-sans">
                  ARZON GLOBAL
                </span>
                <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold">
                  YOUR CAREER. OUR COMMITMENT.
                </span>
              </div>
            </div>

            {/* Right: Message & CTA */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <div>
                <h3 className="font-bold text-base sm:text-lg text-slate-50">
                  Ready to explore a career in Pharmacovigilance?
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Talk to our career counsellor and get all your questions answered.
                </p>
              </div>

              <button
                type="button"
                onClick={() => openCounsellor("footer_final")}
                className="w-full sm:w-auto h-12 px-6 rounded-xl bg-white tone-light hover:bg-[#EEF6FF] text-[#071A4A] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-sm transition-colors cursor-pointer shrink-0"
              >
                <MessageCircle className="h-4 w-4 text-emerald-600" />
                <span>Talk to a Career Counsellor →</span>
              </button>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 font-mono gap-2">
            <span>© {new Date().getFullYear()} Arzon Global. All rights reserved.</span>
            <span>Healthcare Intelligence &amp; Role Readiness Platform</span>
          </div>
        </div>
      </footer>

      {/* ── 13. STICKY MOBILE ACTION BAR ────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E4EAF2] p-3 shadow-lg lg:hidden">
        <button
          type="button"
          onClick={() => openCounsellor("sticky_mobile")}
          className="w-full h-12 rounded-xl bg-[#071A4A] text-slate-50 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer"
        >
          <MessageCircle className="h-4 w-4 text-emerald-400" />
          <span>Talk to a Career Counsellor →</span>
        </button>
      </div>

      {/* ── INTERACTIVE MODAL 1: LIVE ICSR CASE INSPECTION DRAWER ──────────── */}
      {isCaseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white tone-light p-6 sm:p-7 shadow-2xl border border-[#E4EAF2] space-y-4 my-8">
            <button
              type="button"
              onClick={() => setIsCaseModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-[#69758A] hover:bg-[#F7FAFC] hover:text-[#071A4A]"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2.5 border-b border-[#E4EAF2] pb-3">
              <div className="h-9 w-9 rounded-xl bg-[#EEF6FF] text-[#1557D6] flex items-center justify-center shrink-0">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-bold text-[#1557D6] uppercase tracking-wider bg-[#EEF6FF] px-2 py-0.5 rounded">
                    ICSR WORKSTATION PREVIEW
                  </span>
                  <span className="font-mono text-xs font-black text-[#071A4A]">Case PV-2048</span>
                </div>
                <h3 className="font-extrabold text-lg text-[#071A4A] mt-0.5">
                  Individual Case Safety Report Intake Dossier
                </h3>
              </div>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#F7FAFC] p-3 rounded-xl border border-[#E4EAF2]">
                <div>
                  <span className="text-[10px] text-[#69758A] block">PATIENT</span>
                  <strong className="text-[#071A4A]">34 Y / Female</strong>
                </div>
                <div>
                  <span className="text-[10px] text-[#69758A] block">REPORTER</span>
                  <strong className="text-[#071A4A]">Physician (HCP)</strong>
                </div>
                <div>
                  <span className="text-[10px] text-[#69758A] block">SUSPECT DRUG</span>
                  <strong className="text-[#071A4A]">Amoxicillin 500mg</strong>
                </div>
                <div>
                  <span className="text-[10px] text-[#69758A] block">EVENT SERIOUSNESS</span>
                  <strong className="text-[#EF4444]">Serious (Hospitalization)</strong>
                </div>
              </div>

              <div className="rounded-xl border border-[#E4EAF2] p-3.5 space-y-2 bg-white">
                <span className="font-bold text-[#071A4A] block">Source Narrative Excerpt:</span>
                <p className="text-[#3F4A60] font-sans text-xs leading-relaxed">
                  &quot;Patient was prescribed oral Amoxicillin 500mg TID for streptococcal pharyngitis. On Day 3 post initiation, patient developed widespread maculopapular rash, facial erythema, and pruritus requiring emergency room admission and IV corticosteroid intervention. Drug was immediately discontinued (dechallenge positive). Symptoms resolved on Day 6.&quot;
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-xl border border-[#E4EAF2] p-3 bg-[#EEF6FF]/40 space-y-1">
                  <span className="font-bold text-[#1557D6] text-[11px] block">MedDRA Mapping:</span>
                  <div className="text-[11px] text-[#071A4A]">
                    • <strong>LLT:</strong> Skin rash severe [10037844]<br />
                    • <strong>PT:</strong> Rash generalized<br />
                    • <strong>SOC:</strong> Skin and subcutaneous tissue disorders
                  </div>
                </div>
                <div className="rounded-xl border border-[#E4EAF2] p-3 bg-[#E6F8F7]/40 space-y-1">
                  <span className="font-bold text-[#27B9B3] text-[11px] block">Regulatory Clock:</span>
                  <div className="text-[11px] text-[#071A4A]">
                    • <strong>Type:</strong> 15-day Expedited Serious Report<br />
                    • <strong>Clock Start:</strong> 24-Sep-2026<br />
                    • <strong>Due Date:</strong> 09-Oct-2026 (FDA / EMA)
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row justify-between items-center gap-3">
              <span className="text-[11px] text-[#69758A] font-sans">
                Arzon candidates practice processing 40+ authentic cases like this in the program.
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsCaseModalOpen(false);
                  openCounsellor("case_modal_cta");
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#071A4A] hover:bg-[#1557D6] text-slate-50 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <span>Learn How We Teach ICSRs →</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── INTERACTIVE MODAL 2: SKILL DETAIL MODAL ─────────────────────────── */}
      {selectedSkillModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-2xl bg-white tone-light p-6 shadow-2xl border border-[#E4EAF2] space-y-4 my-8">
            <button
              type="button"
              onClick={() => setSelectedSkillModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-[#69758A] hover:bg-[#F7FAFC] hover:text-[#071A4A]"
            >
              <X className="h-5 w-5" />
            </button>

            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EEF6FF] text-[#1557D6] font-mono text-[10px] font-bold uppercase tracking-wider mb-2">
                CORE PV ROLE COMPETENCY
              </div>
              <h3 className="font-extrabold text-xl text-[#071A4A]">
                {selectedSkillModal}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-[#3F4A60] leading-relaxed">
              In top pharma and CRO environments (IQVIA, Cognizant, Parexel), entry-level Pharmacovigilance Associates are expected to deliver error-free {selectedSkillModal} adhering to ICH-GVP guidelines.
            </p>

            <div className="rounded-xl border border-[#E4EAF2] bg-[#F7FAFC] p-4 text-xs space-y-2 font-mono">
              <span className="font-bold text-[#071A4A] block">What You Practice at Arzon:</span>
              <ul className="space-y-1.5 text-[#69758A]">
                <li className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-[#27B9B3] shrink-0 mt-0.5" />
                  <span>Interactive case simulation with instant mentor feedback</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-[#27B9B3] shrink-0 mt-0.5" />
                  <span>Standard Operating Procedures (SOPs) based on live industry workflows</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-[#27B9B3] shrink-0 mt-0.5" />
                  <span>Verified competency scorecard entry upon module completion</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => {
                setSelectedSkillModal(null);
                openCounsellor("skill_modal_cta");
              }}
              className="w-full h-11 rounded-xl bg-[#071A4A] hover:bg-[#1557D6] text-slate-50 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <span>Talk to a Counsellor About This Skill →</span>
            </button>
          </div>
        </div>
      )}

      {/* ── INTERACTIVE MODAL 3: EMPLOYER PROFILE MODAL ─────────────────────── */}
      {selectedEmployerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-2xl bg-white tone-light p-6 shadow-2xl border border-[#E4EAF2] space-y-4 my-8">
            <button
              type="button"
              onClick={() => setSelectedEmployerModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-[#69758A] hover:bg-[#F7FAFC] hover:text-[#071A4A]"
            >
              <X className="h-5 w-5" />
            </button>

            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EEF6FF] text-[#1557D6] font-mono text-[10px] font-bold uppercase tracking-wider mb-2">
                EMPLOYER ROLE CONTEXT
              </div>
              <h3 className="font-extrabold text-xl text-[#071A4A]">
                {selectedEmployerModal} · PV Hiring Profile
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="rounded-xl border border-[#E4EAF2] bg-[#F7FAFC] p-3 space-y-1 font-mono">
                <div className="flex justify-between">
                  <span className="text-[#69758A]">Typical Fresher Roles:</span>
                  <strong className="text-[#071A4A]">Trainee Drug Safety Associate / Junior PV</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#69758A]">Key Hiring Hubs:</span>
                  <strong className="text-[#071A4A]">Hyderabad, Bangalore, Mumbai, Pune, Chennai</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#69758A]">Core Tools Tested:</span>
                  <strong className="text-[#1557D6]">Argus Safety, MedDRA, ICSR Triage</strong>
                </div>
              </div>
              <p className="text-xs text-[#69758A] leading-relaxed">
                Arzon curriculum is reverse-engineered to match the day-one technical expectations of {selectedEmployerModal}&apos;s drug safety teams.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setSelectedEmployerModal(null);
                openCounsellor("employer_modal_cta");
              }}
              className="w-full h-11 rounded-xl bg-[#071A4A] hover:bg-[#1557D6] text-slate-50 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <span>Learn How We Prepare You for {selectedEmployerModal} →</span>
            </button>
          </div>
        </div>
      )}

      {/* ── INTERACTIVE MODAL 4: TALK TO A COUNSELLOR ──────────────────────── */}
      {isCounsellorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-2xl bg-white tone-light p-6 sm:p-7 shadow-2xl border border-[#E4EAF2] space-y-5 my-8">
            <button
              type="button"
              onClick={() => {
                setIsCounsellorModalOpen(false);
                setFormSubmitted(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-[#69758A] hover:bg-[#F7FAFC] hover:text-[#071A4A]"
            >
              <X className="h-5 w-5" />
            </button>

            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EEF6FF] text-[#1557D6] font-mono text-[10px] font-bold uppercase tracking-wider mb-2">
                PERSONALIZED CAREER GUIDANCE
              </div>
              <h3 className="font-extrabold text-xl sm:text-2xl text-[#071A4A] tracking-tight">
                Connect with an Arzon Career Counsellor
              </h3>
              <p className="text-xs text-[#69758A] mt-1 leading-relaxed">
                Receive personalized guidance on Pharmacovigilance career roadmaps, fresher hiring trends, and role readiness.
              </p>
            </div>

            {formSubmitted ? (
              <div className="rounded-xl bg-[#E6F8F7] border border-[#27B9B3]/40 p-5 text-center space-y-3">
                <div className="h-10 w-10 rounded-full bg-[#27B9B3] text-slate-50 flex items-center justify-center mx-auto">
                  <Check className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-base text-[#071A4A]">Request Confirmed!</h4>
                <p className="text-xs text-[#3F4A60] leading-relaxed">
                  We have connected your inquiry to our senior healthcare counsellor. Opening WhatsApp to connect immediately...
                </p>
                <a
                  href={WA_COUNSELLOR}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#071A4A] text-slate-50 font-mono text-xs font-bold uppercase tracking-wider"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-400" />
                  <span>Open WhatsApp Direct Chat →</span>
                </a>
              </div>
            ) : (
              <form onSubmit={handleCounsellorSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#071A4A] mb-1 font-mono uppercase tracking-wider">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={counsellorForm.name}
                    onChange={(e) => setCounsellorForm({ ...counsellorForm, name: e.target.value })}
                    placeholder="e.g. Priya Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4EAF2] bg-[#F7FAFC] text-xs font-medium text-[#071A4A] focus:outline-none focus:ring-2 focus:ring-[#1557D6]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#071A4A] mb-1 font-mono uppercase tracking-wider">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={counsellorForm.phone}
                    onChange={(e) => setCounsellorForm({ ...counsellorForm, phone: e.target.value })}
                    placeholder="e.g. 9876543210"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4EAF2] bg-[#F7FAFC] text-xs font-medium text-[#071A4A] focus:outline-none focus:ring-2 focus:ring-[#1557D6]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#071A4A] mb-1 font-mono uppercase tracking-wider">
                      Academic Degree
                    </label>
                    <select
                      value={counsellorForm.degree}
                      onChange={(e) => setCounsellorForm({ ...counsellorForm, degree: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4EAF2] bg-[#F7FAFC] text-xs font-medium text-[#071A4A] focus:outline-none focus:ring-2 focus:ring-[#1557D6]"
                    >
                      <option value="B.Pharm (Bachelor of Pharmacy)">B.Pharm</option>
                      <option value="M.Pharm (Master of Pharmacy)">M.Pharm</option>
                      <option value="Pharm.D (Doctor of Pharmacy)">Pharm.D</option>
                      <option value="B.Sc / M.Sc Life Sciences">B.Sc / M.Sc Life Sciences</option>
                      <option value="MBBS / BDS / BHMS / BAMS">MBBS / BDS / AYUSH</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#071A4A] mb-1 font-mono uppercase tracking-wider">
                      Graduation Status
                    </label>
                    <select
                      value={counsellorForm.year}
                      onChange={(e) => setCounsellorForm({ ...counsellorForm, year: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4EAF2] bg-[#F7FAFC] text-xs font-medium text-[#071A4A] focus:outline-none focus:ring-2 focus:ring-[#1557D6]"
                    >
                      <option value="2025 / 2026 (Final Year)">Final Year Student (2025/26)</option>
                      <option value="2024 Passed Out">2024 Graduate</option>
                      <option value="2023 or Earlier">2023 or earlier graduate</option>
                    </select>
                  </div>
                </div>

                <label className="flex items-start gap-2.5 pt-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={counsellorForm.consent}
                    onChange={(e) => setCounsellorForm({ ...counsellorForm, consent: e.target.checked })}
                    className="mt-0.5 rounded text-[#1557D6] focus:ring-[#1557D6]"
                  />
                  <span className="text-[11px] text-[#69758A] leading-tight">
                    I authorize Arzon Global to send me the 12-week PV program brochure and career advice on WhatsApp / phone under the DPDP Act 2023.
                  </span>
                </label>

                <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                  <button
                    type="submit"
                    className="flex-1 h-11 rounded-xl bg-[#071A4A] hover:bg-[#1557D6] text-slate-50 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <span>Request Counsellor Callback</span>
                    <ArrowRight className="h-3.5 w-3.5 text-[#27B9B3]" />
                  </button>

                  <a
                    href={WA_HERO}
                    target="_blank"
                    rel="noreferrer"
                    className="h-11 px-4 rounded-xl border border-emerald-500 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageCircle className="h-4 w-4 text-emerald-600" />
                    <span>WhatsApp Now</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ── INTERACTIVE MODAL 5: 2-MINUTE PV ROLE WALKTHROUGH ───────────────── */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white tone-light p-6 sm:p-7 shadow-2xl border border-[#E4EAF2] space-y-4 my-8">
            <button
              type="button"
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-[#69758A] hover:bg-[#F7FAFC] hover:text-[#071A4A]"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-[#EEF6FF] text-[#1557D6] flex items-center justify-center">
                <Play className="h-4 w-4 fill-current text-[#1557D6]" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg sm:text-xl text-[#071A4A]">
                  Day in the Life of a PV Associate (2 Min Walkthrough)
                </h3>
                <p className="text-xs text-[#69758A]">
                  Operational step-by-step breakdown of drug safety workflows
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              {[
                {
                  time: "09:00 AM",
                  title: "Global Intake & Triage",
                  desc: "Scan spontaneous reports, clinical trials, and literature for 4 criteria of a valid ICSR: identifiable patient, identifiable reporter, suspect drug, and adverse event.",
                },
                {
                  time: "11:30 AM",
                  title: "Seriousness & Expedited Clock Triage",
                  desc: "Determine if the event is serious (death, life-threatening, hospitalization, disability, congenital anomaly) and establish 7-day or 15-day regulatory submission deadline.",
                },
                {
                  time: "02:00 PM",
                  title: "MedDRA Coding (SOC / HLGT / HLT / PT / LLT)",
                  desc: "Translate verbatim patient complaints into standardized Lowest Level Terms (LLTs) using the MedDRA dictionary hierarchy without misrepresenting clinical meaning.",
                },
                {
                  time: "04:30 PM",
                  title: "Clinical Narrative Drafting & Regulatory Dispatch",
                  desc: "Author concise chronological narratives detailing patient background, drug dosing, event onset, dechallenge, rechallenge, and causality determination under WHO-UMC scale.",
                },
              ].map((step) => (
                <div key={step.time} className="rounded-xl border border-[#E4EAF2] bg-[#F7FAFC] p-3.5 flex items-start gap-3">
                  <span className="font-mono text-[11px] font-bold text-[#1557D6] bg-white tone-light px-2 py-1 rounded border border-[#E4EAF2] shrink-0">
                    {step.time}
                  </span>
                  <div>
                    <h4 className="font-bold text-xs text-[#071A4A]">{step.title}</h4>
                    <p className="text-xs text-[#69758A] mt-0.5 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setIsVideoModalOpen(false);
                  openCounsellor("video_modal_cta");
                }}
                className="px-5 py-2.5 rounded-xl bg-[#071A4A] hover:bg-[#1557D6] text-slate-50 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors"
              >
                <span>Talk to a Counsellor About This Role →</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── INTERACTIVE MODAL 6: 247+ JD ANALYSIS SAMPLE ─────────────────────── */}
      {isJdModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white tone-light p-6 sm:p-7 shadow-2xl border border-[#E4EAF2] space-y-4 my-8">
            <button
              type="button"
              onClick={() => setIsJdModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-[#69758A] hover:bg-[#F7FAFC] hover:text-[#071A4A]"
            >
              <X className="h-5 w-5" />
            </button>

            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EEF6FF] text-[#1557D6] font-mono text-[10px] font-bold uppercase tracking-wider mb-2">
                VERIFIED INDUSTRY INTELLIGENCE
              </div>
              <h3 className="font-extrabold text-xl text-[#071A4A]">
                Analysis of 247+ PV Fresher Job Descriptions
              </h3>
              <p className="text-xs text-[#69758A] mt-1">
                Synthesized across active openings at IQVIA, Cognizant, Accenture, Parexel, and leading pharma sponsors.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {[
                {
                  skill: "ICSR Processing & Case Logging",
                  weight: "92% of JDs require this",
                  note: "Ability to record medical history, concomitant medications, and lab values in safety databases without transcription errors.",
                },
                {
                  skill: "MedDRA Dictionary Coding",
                  weight: "88% of JDs require this",
                  note: "Coding adverse reactions and indications from verbatim descriptions to PT / LLT levels with high precision.",
                },
                {
                  skill: "Medical & Narrative Writing",
                  weight: "85% of JDs require this",
                  note: "Drafting complete chronological clinical narratives adhering to ICH E2D expedited reporting standards.",
                },
                {
                  skill: "Regulatory Knowledge (ICH / GVP)",
                  weight: "79% of JDs require this",
                  note: "Clear understanding of 7-day and 15-day expedited reporting clocks, E2B(R3) data exchange, and post-marketing surveillance.",
                },
              ].map((jd) => (
                <div key={jd.skill} className="rounded-xl border border-[#E4EAF2] bg-[#F7FAFC] p-3.5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#071A4A]">{jd.skill}</span>
                    <span className="text-[11px] font-mono font-bold text-[#1557D6] bg-white tone-light px-2 py-0.5 rounded border border-[#E4EAF2]">
                      {jd.weight}
                    </span>
                  </div>
                  <p className="text-xs text-[#69758A] leading-relaxed">{jd.note}</p>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setIsJdModalOpen(false);
                  openCounsellor("jd_modal_cta");
                }}
                className="px-5 py-2.5 rounded-xl bg-[#071A4A] hover:bg-[#1557D6] text-slate-50 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors"
              >
                <span>Talk to a Counsellor About Skills →</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── INTERACTIVE MODAL 7: SAMPLE PROJECT WORK ───────────────────────── */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white tone-light p-6 sm:p-7 shadow-2xl border border-[#E4EAF2] space-y-4 my-8">
            <button
              type="button"
              onClick={() => setIsProjectModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-[#69758A] hover:bg-[#F7FAFC] hover:text-[#071A4A]"
            >
              <X className="h-5 w-5" />
            </button>

            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E6F8F7] text-[#27B9B3] font-mono text-[10px] font-bold uppercase tracking-wider mb-2">
                AUTHENTIC WORK SIMULATION
              </div>
              <h3 className="font-extrabold text-xl text-[#071A4A]">
                Sample Guided Project Deliverables
              </h3>
              <p className="text-xs text-[#69758A] mt-1">
                You work on actual case files and build documentation you can showcase during hiring interviews.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="rounded-xl border border-[#E4EAF2] bg-[#F7FAFC] p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#071A4A]">Deliverable 01: ICSR Case Intake Dossier</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EEF6FF] text-[#1557D6] font-bold">
                    Project 01
                  </span>
                </div>
                <p className="text-xs text-[#69758A] leading-relaxed">
                  Extracting patient demographics, suspect drug details, and adverse reaction timelines from raw spontaneous physician reports into standard E2B XML format.
                </p>
              </div>

              <div className="rounded-xl border border-[#E4EAF2] bg-[#F7FAFC] p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#071A4A]">Deliverable 02: MedDRA Terminology Mapping Sheet</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F1EEFF] text-[#6946E8] font-bold">
                    Project 02
                  </span>
                </div>
                <p className="text-xs text-[#69758A] leading-relaxed">
                  Mapping verbatim expressions (e.g. &quot;blistering eruptions after 3rd dose&quot;) into exact MedDRA Lowest Level Terms (LLTs), Preferred Terms (PTs), and System Organ Classes (SOCs).
                </p>
              </div>

              <div className="rounded-xl border border-[#E4EAF2] bg-[#F7FAFC] p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#071A4A]">Deliverable 03: Executive Case Narrative &amp; Causality Form</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#E6F8F7] text-[#27B9B3] font-bold">
                    Project 03
                  </span>
                </div>
                <p className="text-xs text-[#69758A] leading-relaxed">
                  Authoring an audit-ready medical narrative summarizing hospital admission, concomitant therapies, dechallenge response, and assigning WHO-UMC causality classification.
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setIsProjectModalOpen(false);
                  openCounsellor("project_modal_cta");
                }}
                className="px-5 py-2.5 rounded-xl bg-[#071A4A] hover:bg-[#1557D6] text-slate-50 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors"
              >
                <span>Talk to a Counsellor About Projects →</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
