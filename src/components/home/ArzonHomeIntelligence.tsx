import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Building2,
  Check,
  ChevronRight,
  CirclePlay,
  ClipboardCheck,
  FileCheck2,
  Globe2,
  GraduationCap,
  Layers3,
  Microscope,
  ShieldCheck,
  Users,
} from "lucide-react";
import { LINKS } from "@/components/landing/constants";

const LINKEDIN = LINKS.linkedin;

const CAREER_PATHS = [
  {
    title: "Pharmacovigilance",
    subtitle: "Medicine safety and case processing",
    image: "/images/pv-workstation-realistic.jpg",
    href: "/pv-associate",
    tag: "Drug safety",
  },
  {
    title: "Clinical Data Management",
    subtitle: "Clinical data review and quality",
    image: "/images/pv-clinical-collaboration.jpg",
    href: "/courses/clinical-data-management",
    tag: "Clinical operations",
  },
  {
    title: "Medical Coding",
    subtitle: "Clinical documentation and coding",
    image: "/images/pv-clinical-coding.jpg",
    href: "/courses/medical-coding",
    tag: "Healthcare operations",
  },
  {
    title: "Regulatory Affairs",
    subtitle: "Regulatory information and submissions",
    image: "/images/pv-regulatory-audit.jpg",
    href: "/courses/regulatory-affairs",
    tag: "Regulatory",
  },
] as const;

const TRACK_PREVIEWS = {
  pv: {
    label: "Pharmacovigilance",
    task: "Review a synthetic safety case",
    detail: "Check the four minimum case elements, review the chronology and document what is missing.",
    stages: ["Case intake", "Validity check", "Timeline review", "Narrative quality"],
  },
  cdm: {
    label: "Clinical Data Management",
    task: "Resolve a sample data query",
    detail: "Review an eCRF discrepancy, assess the supporting information and record a clear query outcome.",
    stages: ["Data review", "Query raised", "Response review", "Closure check"],
  },
  coding: {
    label: "Medical Coding",
    task: "Review a clinical note",
    detail: "Identify the documented condition, check the coding reference and record the rationale for the selected code.",
    stages: ["Read the note", "Identify concepts", "Check references", "Record rationale"],
  },
} as const;

type TrackKey = keyof typeof TRACK_PREVIEWS;

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#008F83]">
      {children}
    </p>
  );
}

export function ArzonHomeIntelligence() {
  const [activeTrack, setActiveTrack] = useState<TrackKey>("pv");
  const prefersReducedMotion = useReducedMotion();
  const preview = TRACK_PREVIEWS[activeTrack];

  const enter = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.18 },
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <main className="arzon-home-intelligence overflow-x-clip bg-[#F7FAF9] text-[#102A28]">
      {/* 01 / HERO */}
      <section
        id="platform"
        className="relative flex min-h-[calc(100svh-48px)] items-center overflow-hidden bg-[#F5FAF8]"
      >
        <div className="pointer-events-none absolute -right-40 -top-44 h-[36rem] w-[36rem] rounded-full bg-[#DFF1EF] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-52 -left-36 h-[28rem] w-[28rem] rounded-full bg-[#E8F2EF] blur-3xl" />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-5 py-10 sm:px-8 lg:min-h-[calc(100svh-48px)] lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 lg:px-10 lg:py-8">
          <motion.div {...enter} className="relative z-10 max-w-[590px]">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#CBE3DF] bg-white/80 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#42645F] shadow-[0_3px_14px_rgba(9,58,51,0.04)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#008F83]" />
              Arzon Global · Skills and career intelligence
            </div>

            <h1 className="max-w-[620px] text-[clamp(2.65rem,5.2vw,4.65rem)] font-semibold leading-[0.99] tracking-[-0.065em] text-[#063F39]">
              Build capability.
              <span className="mt-1 block text-[#008F83]">Show the work.</span>
            </h1>

            <p className="mt-6 max-w-[490px] text-[15px] leading-7 text-[#526B67] sm:text-[17px]">
              We connect role requirements, practical learning and evidence of skill - helping students make clearer career decisions.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to={"/career-engine/start" as any}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#004B45] px-6 text-[13px] font-semibold text-white shadow-[0_8px_22px_rgba(0,75,69,0.16)] transition hover:-translate-y-0.5 hover:bg-[#00675D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#008F83]"
              >
                Build my profile <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#proof"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#C7DAD6] bg-white/80 px-6 text-[13px] font-semibold text-[#174D47] transition hover:border-[#008F83] hover:bg-white"
              >
                See our work <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#DCE9E6] pt-5">
              <div className="flex items-center gap-2 text-[11px] font-medium text-[#56716C]">
                <ShieldCheck className="h-4 w-4 text-[#008F83]" />
                Student-first
              </div>
              <div className="flex items-center gap-2 text-[11px] font-medium text-[#56716C]">
                <ClipboardCheck className="h-4 w-4 text-[#008F83]" />
                Practical assessment
              </div>
              <div className="flex items-center gap-2 text-[11px] font-medium text-[#56716C]">
                <FileCheck2 className="h-4 w-4 text-[#008F83]" />
                Evidence-led reports
              </div>
            </div>
          </motion.div>

          <motion.div
            {...(prefersReducedMotion
              ? {}
              : {
                  initial: { opacity: 0, scale: 0.975 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
                })}
            className="relative mx-auto w-full max-w-[690px] lg:ml-auto"
          >
            <div className="absolute -inset-5 rounded-[36px] bg-[#D9ECE8]/70 blur-2xl" />
            <div className="relative overflow-hidden rounded-[26px] border border-white/80 bg-[#082F2C] p-2 shadow-[0_28px_80px_rgba(4,45,40,0.18)] sm:rounded-[30px] sm:p-3">
              <div className="relative aspect-[1.34/1] overflow-hidden rounded-[20px] bg-[#0B3934] sm:rounded-[23px]">
                <img
                  src={LINKS.mediaInauguration.fallbackPoster}
                  alt="Frame from the Arzon Global Hyderabad centre inauguration telecast"
                  className="absolute inset-0 h-full w-full object-cover object-center"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#031B19]/95 via-[#031B19]/10 to-[#031B19]/10" />
                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/20 bg-black/25 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/90 backdrop-blur-md sm:left-7 sm:top-7">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#7BD3C6]" />
                  Public event record
                </div>
                <div className="absolute inset-x-5 bottom-5 sm:inset-x-7 sm:bottom-7">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9EDAD2]">
                    Hyderabad · 30 July 2025
                  </p>
                  <h2 className="mt-2 max-w-[450px] text-[clamp(1.45rem,3vw,2.4rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-white">
                    A public launch with TASK leadership.
                  </h2>
                  <a
                    href={LINKS.mediaInauguration.watch}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-[11px] font-semibold text-[#073F39] transition hover:bg-[#DFF1EF]"
                  >
                    <CirclePlay className="h-4 w-4" />
                    Watch the official telecast
                  </a>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 px-2 pb-1 pt-3 text-[10px] text-white/65 sm:px-3">
                <span>Dr. Srikanth Sinha · CEO, TASK · Chief Guest</span>
                <span>HYBIZ TV HD · Event video</span>
              </div>
            </div>

            <div className="absolute -left-3 top-[13%] hidden rounded-2xl border border-[#E8D9B1] bg-[#FFFCF4] p-4 shadow-[0_14px_40px_rgba(67,52,16,0.12)] sm:block lg:-left-8">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#F4E6BE] text-[#876A27]">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#91783E]">Recognition · 2026</p>
                  <p className="mt-0.5 text-[13px] font-semibold text-[#4E4125]">Global Impact Award</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 right-4 hidden rounded-2xl border border-[#CDE2DE] bg-white/95 px-4 py-3 shadow-[0_12px_34px_rgba(6,57,51,0.10)] backdrop-blur sm:block lg:-right-5">
              <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#71908A]">Industry engagement</p>
              <p className="mt-1 text-[12px] font-semibold text-[#174D47]">PHUSE APAC · 2026</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 02 / PUBLIC PROOF */}
      <section
        id="proof"
        className="flex min-h-[calc(100svh-48px)] items-center bg-white py-12 sm:py-14 lg:py-8"
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mb-7 flex flex-col justify-between gap-4 sm:mb-8 sm:flex-row sm:items-end">
            <div>
              <SectionLabel>Proof in the public record</SectionLabel>
              <h2 className="text-[clamp(2rem,3.6vw,3.25rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-[#063F39]">
                Work worth showing.
              </h2>
            </div>
            <p className="max-w-[390px] text-[13px] leading-6 text-[#617873]">
              Milestones, campus conversations and industry participation - each linked to its public source.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-12">
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noreferrer"
              className="group relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-[24px] bg-[#073F39] p-6 text-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,75,69,0.16)] sm:min-h-[300px] lg:col-span-5 lg:p-8"
            >
              <div className="absolute -right-12 -top-14 h-56 w-56 rounded-full border border-white/10" />
              <div className="absolute -right-2 top-2 h-40 w-40 rounded-full border border-white/10" />
              <div className="relative flex items-start justify-between gap-4">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9BD8D0]">
                  Recognition · 04-05 November 2026
                </span>
                <Award className="h-6 w-6 shrink-0 text-[#E7C982]" />
              </div>
              <div className="relative">
                <p className="text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-none tracking-[-0.07em] text-[#F3D99D]">
                  2026
                </p>
                <h3 className="mt-2 max-w-sm text-[24px] font-semibold leading-[1.08] tracking-[-0.045em] text-white">
                  Global Impact Award
                </h3>
                <p className="mt-3 max-w-[380px] text-[12px] leading-5 text-white/70">
                  Presented by SARSD at the 8th ICAATAS conference, Malla Reddy University, Hyderabad.
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold text-[#A9E0D8]">
                  View Arzon's public update <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </div>
            </a>

            <a
              href={LINKS.mediaInauguration.watch}
              target="_blank"
              rel="noreferrer"
              className="group relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-[24px] bg-[#F1F7F5] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(0,75,69,0.10)] sm:min-h-[300px] lg:col-span-3"
            >
              <div className="absolute inset-0 opacity-[0.11]">
                <img src={LINKS.mediaInauguration.fallbackPoster} alt="" className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="relative flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#64827C]">Hyderabad · 2025</span>
                <CirclePlay className="h-6 w-6 text-[#008F83]" />
              </div>
              <div className="relative">
                <h3 className="text-[22px] font-semibold leading-[1.08] tracking-[-0.045em] text-[#063F39]">
                  TASK chief guest at the centre inauguration.
                </h3>
                <p className="mt-3 text-[12px] leading-5 text-[#5C756F]">
                  Dr. Srikanth Sinha, CEO of TASK, attended the public launch on 30 July 2025.
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold text-[#00796F]">
                  Watch event footage <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </div>
            </a>

            <a
              href={LINKEDIN}
              target="_blank"
              rel="noreferrer"
              className="group flex min-h-[260px] flex-col justify-between rounded-[24px] border border-[#DCE9E6] bg-[#FCFEFD] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#A9D1CB] hover:shadow-[0_18px_44px_rgba(0,75,69,0.08)] sm:min-h-[300px] lg:col-span-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#64827C]">Campus outreach</span>
                <GraduationCap className="h-6 w-6 text-[#008F83]" />
              </div>
              <div>
                <h3 className="text-[22px] font-semibold leading-[1.08] tracking-[-0.045em] text-[#063F39]">
                  Malla Reddy University
                </h3>
                <p className="mt-3 text-[12px] leading-5 text-[#5C756F]">
                  Arzon's team met the Dean and faculty to present its vision and discuss student development opportunities.
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold text-[#00796F]">
                  Read the campus update <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </div>
              <div className="mt-5 flex items-center gap-2 border-t border-[#E5EEEB] pt-4 text-[10px] font-medium text-[#78918B]">
                <Building2 className="h-3.5 w-3.5" />
                Campus visit · Dean and faculty discussion
              </div>
            </a>

            <a
              href={LINKEDIN}
              target="_blank"
              rel="noreferrer"
              className="group flex min-h-[210px] flex-col justify-between rounded-[24px] border border-[#DCE9E6] bg-[#F7FAF9] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#A9D1CB] hover:shadow-[0_18px_44px_rgba(0,75,69,0.08)] lg:col-span-7"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#64827C]">Industry participation · 2026</span>
                <Globe2 className="h-6 w-6 text-[#008F83]" />
              </div>
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <h3 className="text-[clamp(1.6rem,2.7vw,2.25rem)] font-semibold leading-[1.06] tracking-[-0.05em] text-[#063F39]">
                    PHUSE APAC
                  </h3>
                  <p className="mt-2 max-w-[500px] text-[12px] leading-5 text-[#5C756F]">
                    Arzon shared its participation in the clinical research, data science and biostatistics community at PHUSE APAC 2026.
                  </p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-2 text-[11px] font-semibold text-[#00796F]">
                  Read the update <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </div>
            </a>

            <div className="flex min-h-[210px] flex-col justify-between rounded-[24px] bg-[#E4F1EE] p-6 lg:col-span-5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#64827C]">How we work</span>
                <ShieldCheck className="h-6 w-6 text-[#008F83]" />
              </div>
              <div>
                <h3 className="text-[22px] font-semibold leading-[1.08] tracking-[-0.045em] text-[#063F39]">
                  Engagement is not the same as endorsement.
                </h3>
                <p className="mt-3 text-[12px] leading-5 text-[#5C756F]">
                  We show the context of each event clearly. A campus visit, conference participation or public inauguration is not presented as a hiring partnership or government accreditation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 / THE PRODUCT */}
      <section
        id="how-it-works"
        className="flex min-h-[calc(100svh-48px)] items-center bg-[#F2F8F6] py-12 sm:py-14 lg:py-8"
      >
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14 lg:px-10">
          <motion.div {...enter} className="max-w-[440px]">
            <SectionLabel>A clearer way to prepare</SectionLabel>
            <h2 className="text-[clamp(2rem,3.8vw,3.35rem)] font-semibold leading-[1.02] tracking-[-0.06em] text-[#063F39]">
              Understand the role.
              <span className="block text-[#008F83]">Show your capability.</span>
            </h2>
            <p className="mt-5 text-[14px] leading-7 text-[#5B746E]">
              Start with what employers ask for, practise the work in a structured environment and review what you have demonstrated.
            </p>

            <div className="mt-8 space-y-4">
              {[
                ["01", "Understand", "Review role responsibilities and published requirements."],
                ["02", "Practise", "Work through relevant tasks using synthetic training scenarios."],
                ["03", "Evidence", "See what was demonstrated, what is missing and what to improve."],
              ].map(([number, title, description]) => (
                <div key={number} className="flex gap-4 border-t border-[#D9E7E3] pt-4">
                  <span className="pt-0.5 text-[11px] font-semibold tracking-[0.12em] text-[#008F83]">{number}</span>
                  <div>
                    <h3 className="text-[14px] font-semibold text-[#174D47]">{title}</h3>
                    <p className="mt-1 text-[12px] leading-5 text-[#6B817C]">{description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to={"/career-assessment" as any}
              className="mt-7 inline-flex items-center gap-2 text-[12px] font-semibold text-[#00796F] transition hover:gap-3"
            >
              Explore the assessment <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            {...enter}
            className="relative overflow-hidden rounded-[26px] border border-[#D7E6E2] bg-white p-3 shadow-[0_24px_70px_rgba(3,55,48,0.10)] sm:rounded-[30px] sm:p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E8EFED] px-2 pb-4">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#82A099]">Interactive product sample</p>
                <h3 className="mt-1 text-[16px] font-semibold tracking-[-0.03em] text-[#0B3934]">Role readiness workspace</h3>
              </div>
              <span className="rounded-full border border-[#CFE3DE] bg-[#F1F8F6] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#39736A]">
                Synthetic training data
              </span>
            </div>

            <div className="grid gap-3 pt-4 md:grid-cols-[190px_1fr]">
              <div className="rounded-[18px] bg-[#F3F8F6] p-3">
                <p className="px-2 pb-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#819A94]">Choose a role</p>
                {([
                  ["pv", "Pharmacovigilance"],
                  ["cdm", "Clinical data"],
                  ["coding", "Medical coding"],
                ] as const).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={activeTrack === key}
                    onClick={() => setActiveTrack(key)}
                    className={[
                      "mb-1 flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-[11px] font-medium transition",
                      activeTrack === key
                        ? "bg-[#004B45] text-white shadow-[0_5px_14px_rgba(0,75,69,0.14)]"
                        : "text-[#58736D] hover:bg-white",
                    ].join(" ")}
                  >
                    {label}
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                ))}
                <div className="mt-4 rounded-xl border border-[#DCE9E5] bg-white p-3">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#88A29B]">Assessment scope</p>
                  <p className="mt-1.5 text-[11px] leading-5 text-[#56716B]">Task-specific feedback, not a job guarantee or professional certification.</p>
                </div>
              </div>

              <div className="min-w-0 rounded-[18px] border border-[#E3ECE9] bg-white p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#85A099]">Selected role</p>
                    <h4 className="mt-1 text-[19px] font-semibold tracking-[-0.04em] text-[#0B3934]">{preview.label}</h4>
                  </div>
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#E4F2EF] text-[#008F83]">
                    <Microscope className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-5 rounded-2xl bg-[#073F39] p-4 text-white sm:p-5">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#9CD8D0]">Sample task</p>
                  <p className="mt-2 text-[16px] font-semibold tracking-[-0.025em]">{preview.task}</p>
                  <p className="mt-2 max-w-[520px] text-[11px] leading-5 text-white/70">{preview.detail}</p>
                  <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {preview.stages.map((stage, index) => (
                      <div key={stage} className="rounded-xl border border-white/10 bg-white/[0.06] p-3">
                        <span className="text-[9px] font-semibold text-[#A6DDD5]">0{index + 1}</span>
                        <p className="mt-2 text-[10px] font-medium leading-4 text-white/90">{stage}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 grid gap-2 sm:grid-cols-3">
                  {[
                    [Layers3, "Role context"],
                    [ClipboardCheck, "Practical task"],
                    [FileCheck2, "Evidence report"],
                  ].map(([Icon, label]) => (
                    <div key={String(label)} className="flex items-center gap-2 rounded-xl border border-[#E5EEEB] bg-[#FAFCFB] px-3 py-3">
                      <Icon className="h-4 w-4 shrink-0 text-[#008F83]" />
                      <span className="text-[10px] font-medium text-[#58736D]">{String(label)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="px-2 pt-3 text-[9px] leading-4 text-[#8AA19B]">
              Interface preview only. The cases and examples shown here are synthetic and are not live patient or employer records.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 04 / CAREER PATHS */}
      <section
        id="career-paths"
        className="flex min-h-[calc(100svh-48px)] items-center bg-white py-12 sm:py-14 lg:py-8"
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mb-7 flex flex-col justify-between gap-3 sm:mb-8 sm:flex-row sm:items-end">
            <div>
              <SectionLabel>Explore career directions</SectionLabel>
              <h2 className="text-[clamp(2rem,3.6vw,3.25rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-[#063F39]">
                Start with the work you want to do.
              </h2>
            </div>
            <p className="max-w-[350px] text-[12px] leading-5 text-[#6B817C]">
              Explore role expectations before choosing what to learn next.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {CAREER_PATHS.map((path, index) => (
              <motion.div
                key={path.title}
                {...(prefersReducedMotion
                  ? {}
                  : {
                      initial: { opacity: 0, y: 14 },
                      whileInView: { opacity: 1, y: 0 },
                      viewport: { once: true, amount: 0.15 },
                      transition: { duration: 0.45, delay: index * 0.06 },
                    })}
              >
                <Link
                  to={path.href as any}
                  className="group block overflow-hidden rounded-[22px] border border-[#E1EBE8] bg-[#F8FBFA] transition duration-300 hover:-translate-y-1 hover:border-[#A9D1CB] hover:shadow-[0_18px_44px_rgba(0,75,69,0.10)]"
                >
                  <div className="relative aspect-[1.22/1] overflow-hidden bg-[#E6F0ED]">
                    <img
                      src={path.image}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#052E2A]/75 via-transparent to-transparent" />
                    <span className="absolute bottom-4 left-4 rounded-full border border-white/25 bg-[#062E2B]/50 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.13em] text-white backdrop-blur">
                      {path.tag}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-[17px] font-semibold tracking-[-0.035em] text-[#0B3934]">{path.title}</h3>
                    <p className="mt-2 min-h-[34px] text-[11px] leading-5 text-[#718781]">{path.subtitle}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold text-[#00796F]">
                      Explore path <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 flex flex-col justify-between gap-4 rounded-[22px] bg-[#073F39] p-5 text-white sm:flex-row sm:items-center sm:px-7">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-[#A6DDD5]">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[13px] font-semibold">For colleges, TPOs and hiring teams</p>
                <p className="mt-1 text-[10px] text-white/65">Discuss campus engagement, assessment and role requirements.</p>
              </div>
            </div>
            <Link
              to={"/contact" as any}
              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 text-[11px] font-semibold text-[#06463F] transition hover:bg-[#DFF1EF]"
            >
              Talk to Arzon <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <p className="mt-4 text-[9px] leading-4 text-[#9AAEA9]">
            Career-path images are illustrative. Programme scope, eligibility and outcomes depend on the relevant role and published programme details.
          </p>
        </div>
      </section>
    </main>
  );
}
