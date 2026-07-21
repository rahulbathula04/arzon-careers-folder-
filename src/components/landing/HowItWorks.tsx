import type { ReactNode } from "react";
import { SectionHeader } from "./SectionHeader";
import { Section } from "@/components/ui/Section";
import {
  ClipboardCheck,
  GraduationCap,
  Briefcase,
  Award,
  Check,
  Trophy,
  Sparkles,
} from "lucide-react";

type Step = {
  i: string;
  icon: typeof ClipboardCheck;
  weeks: string;
  title: string;
  desc: ReactNode;
  checklist: string[];
  xp: string;
  accent: string; // solid color
  gradient: string; // tailwind from-/via-/to- classes
  glyph: typeof ClipboardCheck; // background lucide icon
};

const STEPS: Step[] = [
  {
    i: "01",
    icon: ClipboardCheck,
    weeks: "Day 0",
    title: "Apply in 1 minute",
    desc: (
      <>
        Fill the form. A counsellor calls you back the <strong>same day or next morning.</strong>
      </>
    ),
    checklist: ["1-minute form", "Same-day callback", "No payment to apply"],
    xp: "+1 counsellor call",
    accent: "#2563eb",
    gradient: "from-[#1e3a8a] via-[#2563eb] to-[#38bdf8]",
    glyph: ClipboardCheck,
  },
  {
    i: "02",
    icon: GraduationCap,
    weeks: "Weeks 1–8",
    title: "Learn live for 8 weeks",
    desc: (
      <>
        <strong>Live classes with industry mentors.</strong> Weekly homework on{" "}
        <strong>real medical files.</strong>
      </>
    ),
    checklist: ["Live industry mentors", "Graded weekly homework", "Real medical files"],
    xp: "+8 graded lessons",
    accent: "#ea580c",
    gradient: "from-[#7c2d12] via-[#ea580c] to-[#fb923c]",
    glyph: GraduationCap,
  },
  {
    i: "03",
    icon: Briefcase,
    weeks: "Weeks 9–12",
    title: "Real internship · 4 weeks",
    desc: (
      <>
        Work on <strong>actual hospital or CRO projects.</strong> Get a certificate you can{" "}
        <strong>verify online.</strong>
      </>
    ),
    checklist: ["Hospital / CRO project", "Mentor reviews", "Verifiable certificate"],
    xp: "+1 capstone project",
    accent: "#059669",
    gradient: "from-[#064e3b] via-[#059669] to-[#34d399]",
    glyph: Briefcase,
  },
  {
    i: "04",
    icon: Award,
    weeks: "Week 12+",
    title: "Resume + interview help",
    desc: (
      <>
        We fix your CV, do mock interviews, and connect you to <strong>hiring partners.</strong>
      </>
    ),
    checklist: ["CV rewrite", "Mock interviews", "Direct hiring intros"],
    xp: "+1 shot at an offer",
    accent: "#7c3aed",
    gradient: "from-[#4c1d95] via-[#7c3aed] to-[#a78bfa]",
    glyph: Award,
  },
];

const FINISH_ACCENT = "#f59e0b";

export function HowItWorks() {
  return (
    <Section id="how" size="lg">
      <SectionHeader
        tone="light"
        eyebrow="How it works"
        title={<>4 simple steps</>}
        sub="No long lectures. No PDFs to read alone. You learn while you do real work."
      />

      <div className="mt-10 rounded-[24px] bg-gradient-to-b from-[#f1f4f9] to-[#e3e9f1] p-4 shadow-[0_30px_80px_-30px_rgba(15,27,61,0.45)] sm:rounded-[32px] sm:p-8 lg:p-12">
        {/* Header pill */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#0f1b3d]/15 bg-white px-4 py-1.5 font-sans text-micro font-bold uppercase tracking-[0.18em] text-primary shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" aria-hidden="true" />
            12 weeks · 4 stages · 3+ deliverables
          </span>
        </div>

        {/* Duolingo-style skill path — desktop only */}
        <SkillPath className="mt-10 hidden lg:block" />

        {/* Desktop: 4-up Coursera-style stage cards */}
        <ol className="mt-8 hidden grid-cols-4 gap-5 lg:grid">
          {STEPS.map((s) => (
            <li key={s.i} className="contents">
              <StageCard step={s} />
            </li>
          ))}
        </ol>

        {/* Mobile/Tablet: vertical path with cards */}
        <ol className="relative mt-8 lg:hidden">
          {/* vertical connector */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[27px] top-6 bottom-6 w-[3px] rounded-full bg-gradient-to-b from-[#2563eb] via-[#ea580c] via-50% to-[#7c3aed]"
          />
          {STEPS.map((s) => (
            <li key={s.i} className="relative flex gap-4 pb-6 last:pb-0">
              <div
                className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-slate-50 font-bold shadow-lg ring-4 ring-white"
                style={{
                  background: `linear-gradient(135deg, ${s.accent}, ${s.accent}cc)`,
                  boxShadow: `0 8px 20px -6px ${s.accent}80`,
                }}
                aria-hidden="true"
              >
                <s.icon className="h-6 w-6" />
              </div>
              <div className="min-w-0 flex-1 pt-1">
                <StageCard step={s} compact />
              </div>
            </li>
          ))}
          {/* Hired finish node */}
          <li className="relative mt-2 flex items-center gap-4">
            <div
              className="z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-amber-500 text-primary shadow-lg ring-4 ring-white"
              aria-hidden="true"
            >
              <Trophy className="h-6 w-6" />
            </div>
            <div className="min-w-0 flex-1 rounded-2xl border border-amber-300/40 bg-gradient-to-r from-amber-50 to-white px-4 py-3">
              <p className="font-display text-base font-bold text-primary">Hired 🎉</p>
              <p className="text-meta text-primary/70">
                Resume out, interviews booked, offer on the table.
              </p>
            </div>
          </li>
        </ol>
      </div>
    </Section>
  );
}

/* ───────────── Skill-path strip (desktop) ───────────── */

function SkillPath({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="relative mx-auto max-w-5xl px-6">
        {/* connecting line */}
        <svg
          aria-hidden="true"
          className="absolute inset-x-0 top-1/2 -translate-y-1/2"
          viewBox="0 0 1000 40"
          preserveAspectRatio="none"
          width="100%"
          height="40"
        >
          <defs>
            <linearGradient id="pathGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="33%" stopColor="#ea580c" />
              <stop offset="66%" stopColor="#059669" />
              <stop offset="90%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
          <path
            d="M 20 20 Q 250 -10 500 20 T 980 20"
            stroke="url(#pathGrad)"
            strokeWidth="3"
            strokeDasharray="6 6"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        <div className="relative grid grid-cols-5 items-center">
          {STEPS.map((s) => (
            <div key={s.i} className="flex flex-col items-center">
              <div
                className="group relative flex h-16 w-16 items-center justify-center rounded-full text-slate-50 shadow-xl ring-4 ring-white transition-transform hover:-translate-y-1"
                style={{
                  background: `linear-gradient(135deg, ${s.accent}, ${s.accent}cc)`,
                  boxShadow: `0 10px 28px -8px ${s.accent}99`,
                }}
                aria-hidden="true"
              >
                <s.icon className="h-7 w-7" />
                <span
                  className="absolute -bottom-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white text-micro font-bold text-primary shadow"
                  style={{ color: s.accent }}
                >
                  {s.i}
                </span>
              </div>
              <span className="mt-3 font-mono text-micro font-bold uppercase tracking-[0.16em] text-primary/80">
                {s.weeks}
              </span>
            </div>
          ))}
          {/* Finish trophy */}
          <div className="flex flex-col items-center">
            <div
              className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-amber-500 text-primary shadow-xl ring-4 ring-white"
              style={{ boxShadow: `0 10px 28px -8px ${FINISH_ACCENT}cc` }}
              aria-hidden="true"
            >
              <Trophy className="h-7 w-7" />
            </div>
            <span className="mt-3 font-mono text-micro font-bold uppercase tracking-[0.16em] text-warning">
              Hired
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────── Stage card (Coursera-style) ───────────── */

function StageCard({ step: s, compact = false }: { step: Step; compact?: boolean }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#0f1b3d]/10 bg-white shadow-[0_8px_24px_-12px_rgba(15,27,61,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-16px_rgba(15,27,61,0.35)]">
      {/* Gradient cover banner */}
      <div
        className={`relative overflow-hidden bg-gradient-to-br ${s.gradient} ${compact ? "h-20" : "h-24"}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.3),transparent_55%)]" />
        <s.glyph
          aria-hidden="true"
          className={`absolute -bottom-2 -right-2 text-slate-100/25 ${
            compact ? "h-12 w-12" : "h-16 w-16"
          }`}
          strokeWidth={1.5}
        />
        <div className="relative flex h-full items-start justify-between p-3.5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50/20 px-2.5 py-1 text-micro font-bold uppercase tracking-[0.14em] text-slate-50 ring-1 ring-white/30 backdrop-blur">
            <s.icon className="h-3 w-3" aria-hidden="true" />
            Step {s.i}
          </span>
          <span className="rounded-full bg-slate-50/95 px-2.5 py-1 text-micro font-bold uppercase tracking-[0.14em] text-primary shadow-sm">
            {s.weeks}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="font-display text-body font-bold leading-tight text-primary sm:text-body-lg">
          {s.title}
        </h3>
        <p className="mt-2 text-caption leading-relaxed text-primary/70 [&_strong]:font-semibold [&_strong]:text-primary">
          {s.desc}
        </p>

        {/* Deliverables checklist */}
        <ul className="mt-3 space-y-1.5">
          {s.checklist.map((item) => (
            <li key={item} className="flex items-start gap-2 text-meta text-primary/85">
              <span
                className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: `${s.accent}1a`, color: s.accent }}
                aria-hidden="true"
              >
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* XP chip */}
        <div className="mt-4 pt-3 border-t border-[#0f1b3d]/8">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-micro font-bold uppercase tracking-[0.12em]"
            style={{
              backgroundColor: `${s.accent}14`,
              color: s.accent,
              boxShadow: `inset 0 0 0 1px ${s.accent}33`,
            }}
          >
            <Sparkles className="h-3 w-3" aria-hidden="true" />
            {s.xp}
          </span>
        </div>
      </div>
    </article>
  );
}
