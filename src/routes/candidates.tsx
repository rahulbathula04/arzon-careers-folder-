import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  Building2,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Compass,
  Database,
  FileCheck2,
  GraduationCap,
  Layers,
  LineChart,
  Lock,
  MessageCircle,
  Microscope,
  PhoneCall,
  Play,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { COURSES, type Course } from "@/data/courses";
import { thumbFor } from "@/data/courseThumbs";
import { openCounsellorModal } from "@/components/system/CounsellorLeadModal";
import { SITE, absUrl } from "@/components/landing/constants";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/candidates")({
  head: () => {
    const seo = pageSeo({
      path: "/candidates",
      title: "For Candidates · Career Programmes & Pathways",
      description:
        "Transform from an academic graduate into an audit-ready clinical professional with practical CRO casework, tool labs, and recruiter introduction.",
      image: "/og/internships.jpg",
    });
    return {
      meta: [{ title: "For Candidates · Career Programmes & Pathways" }, ...seo.meta],
      links: seo.links,
    };
  },
  component: CandidatesPage,
});

const FEATURED_TRACKS = [
  {
    slug: "pharmacovigilance",
    title: "Pharmacovigilance (Drug Safety)",
    role: "Drug Safety Associate / ICSR Analyst",
    salary: "₹3.5 – 7.0 LPA",
    duration: "12 Weeks",
    tools: ["Safety Database", "Argus", "MedDRA", "E2B(R3)", "WHODrug"],
    employers: ["Cognizant", "IQVIA", "Parexel", "Accenture", "Novartis"],
    highlight: "ICSR Processing & Narrative Writing",
    category: "Pharmacy & Life Sciences" as const,
  },
  {
    slug: "sas-clinical",
    title: "Clinical SAS Programming",
    role: "Clinical SAS Programmer / Biostatistical Analyst",
    salary: "₹4.0 – 8.0 LPA",
    duration: "14 Weeks",
    tools: ["Base SAS", "SAS Macros", "CDISC SDTM", "ADaM", "TLFs"],
    employers: ["IQVIA", "Syneos Health", "Cytel", "TCS", "Pfizer"],
    highlight: "CDISC Standards & FDA Regulatory Submissions",
    category: "Pharmacy & Life Sciences" as const,
  },
  {
    slug: "medical-coding",
    title: "Medical Coding & RCM",
    role: "Certified Medical Coder / CPC Executive",
    salary: "₹3.0 – 6.0 LPA",
    duration: "10 Weeks",
    tools: ["ICD-10-CM", "CPT", "HCPCS Level II", "CPC Exam Prep", "RCM Systems"],
    employers: ["Omega Healthcare", "Optum", "AGS Health", "Access Healthcare"],
    highlight: "Anatomy, Pathology & AAPC Coding Standards",
    category: "Commerce & Marketing" as const,
  },
  {
    slug: "clinical-data-management",
    title: "Clinical Data Management (CDM)",
    role: "Clinical Data Coordinator / EDC Reviewer",
    salary: "₹3.5 – 6.5 LPA",
    duration: "12 Weeks",
    tools: ["Medidata RAVE", "Oracle InForm", "eCRF Design", "Discrepancy Mgmt"],
    employers: ["Labcorp", "PPD", "ICON", "Cognizant", "IQVIA"],
    highlight: "Study Build, Data Cleaning & Query Resolution",
    category: "Pharmacy & Life Sciences" as const,
  },
  {
    slug: "regulatory-affairs",
    title: "Regulatory Affairs",
    role: "Regulatory Affairs Associate / Dossier Executive",
    salary: "₹3.5 – 6.0 LPA",
    duration: "10 Weeks",
    tools: ["eCTD Software", "ICH Guidelines", "Module 1-5 Compilation"],
    employers: ["Dr. Reddy's", "Aurobindo", "Sun Pharma", "Cipla"],
    highlight: "Dossier Lifecycle & Global Submissions",
    category: "Pharmacy & Life Sciences" as const,
  },
  {
    slug: "ai-intelligence",
    title: "Healthcare AI & Clinical Informatics",
    role: "Clinical AI Analyst / Digital Health Specialist",
    salary: "₹4.5 – 9.0 LPA",
    duration: "12 Weeks",
    tools: ["FHIR Standards", "Health Informatics", "Clinical NLP", "Python"],
    employers: ["Global Health Tech", "Startups", "Hospital Networks"],
    highlight: "AI Validation & Digital Health Pipelines",
    category: "Tech Programmes" as const,
  },
] as const;

const TRANSFORMATION_STEPS = [
  {
    step: "01",
    title: "JD-Derived Role Matching",
    description:
      "We map your exact degree (B.Pharm, Pharm.D, Life Sciences, Biotech, BSc) against 300+ live entry-level hiring requirements so you never waste months studying outdated syllabus.",
    badge: "Initial Alignment",
  },
  {
    step: "02",
    title: "Enterprise Simulation Labs",
    description:
      "You don't just read about databases—you log into simulated safety environments, triage adverse events, write clinical narratives, and resolve real eCRF data queries.",
    badge: "Practical Casework",
  },
  {
    step: "03",
    title: "Audit-Ready Capability Dossier",
    description:
      "Instead of a generic course certificate, you graduate with a tamper-evident digital proof portfolio showing real case logs, accuracy metrics, and tool competencies.",
    badge: "Evidence, Not Claims",
  },
  {
    step: "04",
    title: "Direct CRO & Sponsor Placement",
    description:
      "Your verified profile is surfaced directly to hiring managers and talent partners at premier life sciences employers across Hyderabad, Bengaluru, and Pune.",
    badge: "Career Outcome",
  },
];

function CandidatesPage() {
  const prefersReducedMotion = useReducedMotion();
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const enter = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
      };

  const filteredTracks = selectedFilter === "all"
    ? FEATURED_TRACKS
    : FEATURED_TRACKS.filter((t) => t.category === selectedFilter);

  return (
    <main className="candidates-portal min-h-screen bg-[#F7FAF9] text-[#102A28] overflow-x-clip">
      {/* ─── 01 / HERO: TRANSFORMATION PROMISE ─── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F2F8F6] via-[#F7FAF9] to-white pt-10 sm:pt-16 pb-16 sm:pb-24 border-b border-[#DCE9E6]">
        {/* Ambient atmospheric orbs */}
        <div className="pointer-events-none absolute -top-40 right-10 h-[32rem] w-[32rem] rounded-full bg-[#DFF1EF] blur-3xl opacity-70" />
        <div className="pointer-events-none absolute top-40 -left-20 h-[24rem] w-[24rem] rounded-full bg-[#E5F2EF] blur-3xl opacity-60" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <motion.div {...enter} className="mx-auto max-w-4xl text-center">
            {/* Pill Eyebrow */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#C7E0DC] bg-white/90 backdrop-blur-md px-4 py-1.5 text-[10.5px] font-mono font-bold uppercase tracking-[0.16em] text-[#00796F] shadow-[0_2px_10px_rgba(0,75,69,0.04)]">
              <span className="h-2 w-2 rounded-full bg-[#008F83] motion-safe:animate-pulse" />
              For Students & Fresh Graduates
            </div>

            <h1 className="text-[clamp(2.1rem,4.4vw,3.75rem)] font-bold leading-[1.08] tracking-[-0.045em] text-[#063F39]">
              <span className="block sm:whitespace-nowrap">From academic degree to</span>
              <span className="block mt-1 text-[#008F83] sm:whitespace-nowrap">audit-ready professional.</span>
            </h1>

            <p className="mt-6 text-base sm:text-[17px] leading-relaxed text-[#526B67] max-w-2xl mx-auto">
              University exams test memory. CROs and Pharma hire for practical capability. Arzon bridges this divide with verified simulation casework, enterprise tool mastery, and proof-backed employer hiring.
            </p>

            {/* Triple Decision Actions */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3.5">
              <a
                href="#programmes"
                className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-[#004B45] hover:bg-[#00625A] px-7 text-[13px] font-bold text-white shadow-lg shadow-[#004B45]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Explore Role Programmes
                <ArrowRight className="h-4 w-4" />
              </a>

              <Link
                to={"/career-engine/start" as any}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#C5DDD8] bg-white hover:bg-[#F2F8F6] px-6 text-[13px] font-bold text-[#063F39] shadow-sm transition hover:border-[#008F83]"
              >
                Take Free 15-Min Diagnostic
                <ArrowUpRight className="h-4 w-4 text-[#008F83]" />
              </Link>

              <button
                type="button"
                onClick={() => openCounsellorModal({ source: "candidates_hero" })}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white/70 hover:bg-white px-5 text-[12.5px] font-semibold text-[#526B67] border border-[#DCE9E6] transition"
              >
                <PhoneCall className="h-3.5 w-3.5 text-[#008F83]" />
                Talk to Advisor
              </button>
            </div>

            {/* Proof Badges Bar */}
            <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 max-w-3xl mx-auto border-t border-[#DCE9E6] pt-6 text-left">
              <div className="p-2">
                <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#008F83]">Starting CTC</p>
                <p className="mt-1 text-[17px] font-bold text-[#063F39]">₹3.5 – 7 LPA</p>
                <p className="text-[11px] text-[#718781]">Fresher placement ranges</p>
              </div>
              <div className="p-2">
                <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#008F83]">Hiring CROs</p>
                <p className="mt-1 text-[17px] font-bold text-[#063F39]">300+ JDs</p>
                <p className="text-[11px] text-[#718781]">Cognizant, IQVIA, Parexel</p>
              </div>
              <div className="p-2">
                <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#008F83]">Methodology</p>
                <p className="mt-1 text-[17px] font-bold text-[#063F39]">Simulation</p>
                <p className="text-[11px] text-[#718781]">Actual ICSR & eCRF cases</p>
              </div>
              <div className="p-2">
                <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#008F83]">Proof of Skill</p>
                <p className="mt-1 text-[17px] font-bold text-[#063F39]">Audit Dossier</p>
                <p className="text-[11px] text-[#718781]">Verifiable digital record</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── 02 / THE TRANSFORMATION BLUEPRINT ─── */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#DCE9E6]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mb-12 max-w-2xl">
            <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#008F83] mb-2">
              The Arzon Transformation Model
            </p>
            <h2 className="text-[clamp(2rem,3.4vw,2.85rem)] font-bold leading-[1.08] tracking-[-0.045em] text-[#063F39]">
              How your career transforms with us.
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-[#5C756F]">
              Traditional coaching centres sell certificates with theoretical slides. Arzon gives you the exact practical workflow used inside CROs, equipping you to defend your decisions in every technical interview.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TRANSFORMATION_STEPS.map((s, idx) => (
              <div
                key={s.step}
                className="relative flex flex-col justify-between rounded-[22px] border border-[#E2EBE8] bg-[#F9FBFA] p-5 shadow-[0_6px_20px_rgba(0,0,0,0.03)] hover:border-[#A9D1CB] hover:shadow-[0_14px_36px_rgba(0,75,69,0.08)] transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between pb-4">
                    <span className="text-[26px] font-mono font-bold tracking-tight text-[#008F83]">
                      {s.step}
                    </span>
                    <span className="rounded-full bg-white px-2.5 py-0.5 text-[9.5px] font-mono font-semibold text-[#00796F] border border-[#DCE9E6]">
                      {s.badge}
                    </span>
                  </div>
                  <h3 className="text-[17px] font-bold text-[#063F39] leading-snug">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[12px] leading-relaxed text-[#5C756F]">
                    {s.description}
                  </p>
                </div>

                <div className="mt-5 border-t border-[#EAEFEF] pt-3 text-[11px] font-semibold text-[#00796F] flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#008F83]" />
                  <span>Verified outcome</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 03 / COMPLETE ROLE PROGRAMMES CATALOG (REAL THUMBNAILS) ─── */}
      <section id="programmes" className="py-16 sm:py-24 bg-[#F5FAF8] border-b border-[#DCE9E6]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#008F83] mb-2">
                Curated Career Pathways
              </p>
              <h2 className="text-[clamp(2.1rem,3.4vw,3.1rem)] font-bold leading-[1.04] tracking-[-0.05em] text-[#063F39]">
                Choose your healthcare career track.
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-[#5C756F] max-w-xl">
                Every track is designed backwards from 300+ entry-level healthcare JDs with direct hiring partner feedback.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                ["all", "All Tracks"],
                ["Pharmacy & Life Sciences", "Pharmacy & Life Sciences"],
                ["Commerce & Marketing", "Medical Coding / RCM"],
                ["Tech Programmes", "HealthTech & AI"],
              ].map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedFilter(key)}
                  className={[
                    "rounded-full px-3.5 py-1.5 text-[11px] font-semibold transition-all",
                    selectedFilter === key
                      ? "bg-[#004B45] text-white shadow-sm"
                      : "bg-white text-[#56716B] hover:bg-[#EBF5F3] border border-[#DCE9E6]",
                  ].join(" ")}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Course Bento Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTracks.map((track) => {
              const thumbUrl = thumbFor(track.slug, track.category);
              return (
                <div
                  key={track.slug}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-[#DCE9E6] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:border-[#A9D1CB] hover:shadow-[0_20px_48px_rgba(0,75,69,0.12)] transition-all duration-300"
                >
                  <div>
                    {/* Media Frame with Real WebP Thumbnail */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#E8F2EF]">
                      <img
                        src={thumbUrl}
                        alt={`${track.title} programme cover`}
                        loading="lazy"
                        className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                      {/* Floating Category Pill */}
                      <span className="absolute top-3 left-3 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-0.5 text-[9.5px] font-mono text-white border border-white/15">
                        {track.duration}
                      </span>

                      {/* Salary Tag Pill */}
                      <span className="absolute bottom-3 right-3 rounded-full bg-[#004B45]/90 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-mono font-bold text-[#A2E2DB] border border-[#008F83]">
                        {track.salary}
                      </span>
                    </div>

                    {/* Content Details */}
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-[10px] font-mono font-semibold uppercase tracking-wider text-[#008F83]">
                        <span>{track.role}</span>
                      </div>

                      <h3 className="mt-1 text-[18px] font-bold text-[#063F39] leading-snug group-hover:text-[#008F83] transition-colors">
                        {track.title}
                      </h3>

                      <p className="mt-2 text-[12px] leading-relaxed text-[#5C756F]">
                        {track.highlight}
                      </p>

                      {/* Key Tools Badges */}
                      <div className="mt-3.5 flex flex-wrap gap-1.5">
                        {track.tools.map((t) => (
                          <span
                            key={t}
                            className="rounded-md bg-[#F2F8F6] px-2 py-0.5 text-[10px] font-medium text-[#4B6862] border border-[#E0EBE8]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Hiring Partners Strip */}
                      <div className="mt-4 border-t border-[#EAEFEF] pt-3 text-[10.5px] text-[#718781]">
                        <span className="font-semibold text-[#48635E]">Hiring: </span>
                        <span>{track.employers.slice(0, 4).join(" · ")}</span>
                      </div>
                    </div>
                  </div>

                  {/* Dual Action Bottom Dock */}
                  <div className="p-5 pt-0 grid grid-cols-2 gap-2 border-t border-[#F0F5F3] pt-4">
                    <Link
                      to={`/courses/${track.slug}` as any}
                      className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full border border-[#DCE9E6] bg-white hover:bg-[#F2F8F6] text-[11px] font-bold text-[#063F39] transition hover:border-[#008F83]"
                    >
                      <span>Syllabus</span>
                      <ArrowRight className="h-3 w-3 text-[#008F83]" />
                    </Link>

                    <Link
                      to={`/enrol?programme=${track.slug}` as any}
                      className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-[#004B45] hover:bg-[#00625A] text-[11px] font-bold text-white shadow-sm transition active:scale-[0.98]"
                    >
                      <span>Get Registered</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 04 / COMPARISON: UNIVERSITY VS ARZON ─── */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#DCE9E6]">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-10">
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#008F83] mb-2">
              Why Traditional Degrees Fall Short
            </p>
            <h2 className="text-[clamp(2rem,3.2vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.045em] text-[#063F39]">
              The gap between college and CRO hiring.
            </h2>
          </div>

          <div className="overflow-hidden rounded-[24px] border border-[#DCE9E6] bg-white shadow-sm">
            <div className="grid grid-cols-2 bg-[#022D29] p-4 sm:p-5 text-white text-[12px] sm:text-[13px] font-bold">
              <div className="text-white/60">Typical Academic Curriculum</div>
              <div className="text-[#A2E2DB] flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-[#008F83]" />
                Arzon Healthcare Intelligence
              </div>
            </div>

            {[
              [
                "Theoretical pharmacology definitions",
                "Real casework triage in Argus & Safety Databases",
              ],
              [
                "Static textbook case studies from 2012",
                "Live E2B(R3), MedDRA coding & narrative drafting",
              ],
              [
                "Generic percentage marks sheet",
                "Verifiable Digital Capability Dossier with case logs",
              ],
              [
                "Zero hands-on software experience",
                "Direct simulation labs (RAVE, SAS, Argus, ICD-10)",
              ],
              [
                "Blindly sending resumes to cold portals",
                "Direct institutional recruiter introduction (Cognizant, IQVIA)",
              ],
            ].map(([college, arzon], i) => (
              <div
                key={college}
                className={[
                  "grid grid-cols-2 p-4 text-[12px] sm:text-[13px] leading-relaxed border-t border-[#E8EFED]",
                  i % 2 === 0 ? "bg-white" : "bg-[#F9FCFB]",
                ].join(" ")}
              >
                <div className="text-[#718781] pr-3 sm:pr-6">{college}</div>
                <div className="font-semibold text-[#063F39] pl-3 sm:pl-6 flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#008F83] shrink-0 mt-0.5" />
                  <span>{arzon}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 05 / DECISION HUB (CLEAR NEXT STEPS) ─── */}
      <section className="py-16 sm:py-24 bg-[#02201D] text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-[#A2E2DB] border border-white/10">
              Next Cohort Starting Soon
            </span>

            <h2 className="mt-4 text-[clamp(2.1rem,3.8vw,3.25rem)] font-bold tracking-tight text-white leading-tight">
              Ready to take control of your healthcare career?
            </h2>

            <p className="mt-4 text-[14px] sm:text-[15px] leading-relaxed text-[#A8D3CD] max-w-xl mx-auto">
              Choose the path that fits where you are right now. No pressure, no aggressive sales calls—just verified career intelligence.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3 max-w-4xl mx-auto">
              {/* Option A: Register */}
              <div className="rounded-[22px] border border-white/15 bg-white/[0.06] p-5 text-left flex flex-col justify-between hover:bg-white/[0.09] transition">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#00A896] font-bold">Path A</span>
                  <h3 className="mt-1 text-[16px] font-bold text-white">Get Registered</h3>
                  <p className="mt-1.5 text-[11.5px] leading-relaxed text-white/70">
                    Know your target track? Enrol directly into the upcoming cohort and reserve your lab seat.
                  </p>
                </div>
                <Link
                  to={"/enrol" as any}
                  style={{ color: "#004B45" }}
                  className="mt-5 inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-white !text-[#004B45] hover:bg-[#DFF1EF] text-[12px] font-bold transition shadow-sm cursor-pointer"
                >
                  <span style={{ color: "#004B45" }} className="!text-[#004B45] font-bold">
                    Enrol in Cohort
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 !text-[#008F83]" style={{ color: "#008F83" }} />
                </Link>
              </div>

              {/* Option B: Free Diagnostic */}
              <div className="rounded-[22px] border border-[#008F83] bg-[#004B45]/40 p-5 text-left flex flex-col justify-between shadow-lg shadow-[#004B45]/30">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#A2E2DB] font-bold">Path B · Recommended</span>
                  <h3 className="mt-1 text-[16px] font-bold text-white">Test Your Readiness</h3>
                  <p className="mt-1.5 text-[11.5px] leading-relaxed text-white/80">
                    Take our 15-minute clinical casework diagnostic to see which role matches your natural strengths.
                  </p>
                </div>
                <Link
                  to={"/career-engine/start" as any}
                  className="mt-5 inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-[#008F83] hover:bg-[#00A896] text-white text-[12px] font-bold transition shadow-sm"
                >
                  <span>Start Free Diagnostic</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Option C: Talk to Experts */}
              <div className="rounded-[22px] border border-white/15 bg-white/[0.06] p-5 text-left flex flex-col justify-between hover:bg-white/[0.09] transition">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#00A896] font-bold">Path C</span>
                  <h3 className="mt-1 text-[16px] font-bold text-white">1-on-1 Guidance</h3>
                  <p className="mt-1.5 text-[11.5px] leading-relaxed text-white/70">
                    Confused between PV, SAS, or Coding? Talk to a senior healthcare career advisor for clarity.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => openCounsellorModal({ source: "candidates_decision_hub" })}
                  className="mt-5 inline-flex h-10 items-center justify-center gap-1.5 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white text-[12px] font-bold transition"
                >
                  <PhoneCall className="h-3.5 w-3.5 text-[#00A896]" />
                  <span>Talk to Advisor</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
