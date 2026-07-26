import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  MessageCircle,
  Sparkles,
  Target,
} from "lucide-react";
import { CareerShell } from "@/components/career/CareerShell";
import { ARCHETYPES } from "@/data/careerEngineScoring";
import type { ArchetypeId } from "@/data/careerEngineQuestions";
import { getResult } from "@/lib/careerEngineApi";
import { waLink } from "@/components/landing/constants";
import { CTAButton } from "@/components/landing/CTAButton";
import { pageSeo } from "@/lib/seo";

const search = z.object({ id: z.string().optional().catch(undefined) });

export const Route = createFileRoute("/career-engine/plan")({
  validateSearch: (s) => search.parse(s),
  head: () => {
    const ps = pageSeo({
      path: "/career-engine/plan",
      title: "Your free 7-day learning plan · Arzon Careers",
      description:
        "A free, personalised 7-day learning plan based on your ACRI assessment. No payment, no login.",
      image: "/og/career-engine.jpg",
      noindex: true,
    });
    return {
      meta: [{ title: "Your free 7-day learning plan · Arzon Careers" }, ...ps.meta],
      links: ps.links,
    };
  },
  component: PlanPage,
});

type PlanContext = {
  archetypeId: ArchetypeId | null;
  archetypeName: string;
  primaryTrack: string;
  primarySlug: string;
};

const TRACK_BY_ARCHETYPE: Record<ArchetypeId, { title: string; slug: string }> = {
  coder: { title: "Medical Coding", slug: "medical-coding" },
  sentinel: { title: "Pharmacovigilance", slug: "pharmacovigilance" },
  data_storyteller: { title: "Clinical Data Management", slug: "clinical-data-management" },
  regulatory_architect: { title: "Regulatory Affairs", slug: "regulatory-affairs" },
  operator: { title: "Pharmacovigilance", slug: "pharmacovigilance" },
  ai_builder: { title: "AI in Healthcare", slug: "ai-intelligence" },
};

function PlanPage() {
  const { id } = Route.useSearch();
  const [ctx, setCtx] = useState<PlanContext>({
    archetypeId: null,
    archetypeName: "Healthcare Graduate",
    primaryTrack: "Pharmacovigilance",
    primarySlug: "pharmacovigilance",
  });

  // Try sessionStorage first, then RPC by leadId.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const cached = JSON.parse(sessionStorage.getItem("ce_result") || "null");
      if (cached?.archetypeId && ARCHETYPES[cached.archetypeId as ArchetypeId]) {
        applyArchetype(cached.archetypeId as ArchetypeId);
        return;
      }
    } catch {
      /* noop */
    }
    if (id) {
      getResult(id)
        .then((row: { archetype?: string } | null) => {
          if (row?.archetype && ARCHETYPES[row.archetype as ArchetypeId]) {
            applyArchetype(row.archetype as ArchetypeId);
          }
        })
        .catch(() => {
          /* noop */
        });
    }
    function applyArchetype(aId: ArchetypeId) {
      const arche = ARCHETYPES[aId];
      const t = TRACK_BY_ARCHETYPE[aId];
      setCtx({
        archetypeId: aId,
        archetypeName: arche.name,
        primaryTrack: t.title,
        primarySlug: t.slug,
      });
    }
  }, [id]);

  const days = buildDays(ctx);

  return (
    <CareerShell>
      {/* Hero */}
      <div className="rounded-3xl border border-primary-glow/30 bg-gradient-to-br from-primary/[0.10] to-primary/[0.02] p-6 sm:p-8">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary-glow" />
          <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow">
            Your free 7-day plan
          </p>
        </div>
        <h1 className="mt-3 font-display text-h1 text-white">
          Seven days to confirm <span className="italic-accent not-italic">{ctx.primaryTrack}</span>{" "}
          is the right fit.
        </h1>
        <p className="mt-3 max-w-xl text-sm text-white/70">
          A short, honest plan based on your ACRI result. ~20 minutes a day. No payment. By day 7
          you'll know whether to enrol — or whether a different path fits you better.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3 text-micro text-white/80">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5 text-primary-glow" /> 7 days · ~20 min/day
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Target className="h-3.5 w-3.5 text-gold" /> Tuned for {ctx.archetypeName}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ClipboardList className="h-3.5 w-3.5 text-eyebrow" /> No login required
          </span>
        </div>
      </div>

      {/* Days */}
      <ol className="mt-8 space-y-3">
        {days.map((d, i) => (
          <DayCard key={d.day} day={d} index={i} primarySlug={ctx.primarySlug} />
        ))}
      </ol>

      {/* Closing CTA */}
      <div className="mt-10 rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/[0.08] to-transparent p-6">
        <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-gold">
          When you're ready
        </p>
        <h2 className="mt-2 font-display text-h3 text-white">
          Skip ahead. Lock your seat in the next {ctx.primaryTrack} cohort.
        </h2>
        <p className="mt-2 text-sm text-white/65">
          Most students who finish day 3 of the plan apply by day 5. Counsellors hold launch codes
          for graduates who've actually engaged.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <CTAButton asChild variant="gold" size="md">
            <Link
              to="/apply"
              search={{ programme: ctx.primarySlug, source: "career-engine-plan" } as never}
            >
              Apply <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CTAButton>
          <a
            href={waLink(
              `Hi Arzon, I'm working through the 7-day plan for ${ctx.primaryTrack}. Can you walk me through what's next?`,
            )}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-accent-glow/30 bg-accent-glow/10 px-4 py-2 text-sm font-semibold text-eyebrow-strong hover:bg-accent-glow/15"
          >
            <MessageCircle className="h-4 w-4" /> Ask my counsellor
          </a>
        </div>
      </div>
    </CareerShell>
  );
}

type Day = {
  day: number;
  title: string;
  why: string;
  action: string;
  minutes: number;
};

function buildDays(ctx: PlanContext): Day[] {
  const track = ctx.primaryTrack;

  // Archetype-specific workflow and tools content
  type WorkflowMap = { workflow: string; tool: string; toolAction: string };
  const WORKFLOW_BY_TRACK: Record<string, WorkflowMap> = {
    Pharmacovigilance: {
      workflow: "Walk through one ICSR case study end-to-end. Note where you got stuck.",
      tool: "Argus, Veeva, Excel macros",
      toolAction: "Watch the Argus tour video and complete the free interactive demo.",
    },
    "Medical Coding": {
      workflow:
        "Code a set of 10 sample diagnoses using ICD-10. Compare your codes against the answer sheet.",
      tool: "Optum360, 3M CodeFinder, Excel",
      toolAction:
        "Explore the free ICD-10 browser at ICD10Data.com for 20 minutes, then code 5 real diagnoses.",
    },
    "Clinical Data Management": {
      workflow: "Review a sample Case Report Form (CRF) and identify 5 data discrepancies.",
      tool: "Medidata Rave, Oracle InForm, OpenClinica",
      toolAction: "Create a free OpenClinica account and navigate through a sample study database.",
    },
    "Regulatory Affairs": {
      workflow: "Read a real CDSCO submission checklist and map it to an eCTD module structure.",
      tool: "Veeva Vault, eCTD Builder, eRegulatory",
      toolAction:
        "Download and review a public FDA drug approval document from Drugs@FDA. Map the sections to eCTD modules.",
    },
    "AI in Healthcare": {
      workflow:
        "Trace how a single patient record flows from EHR entry to an AI prediction model output.",
      tool: "Python, FHIR APIs, Google Health AI",
      toolAction:
        "Run a pre-built Colab notebook on a sample clinical dataset and interpret one model output.",
    },
  };
  const wf: WorkflowMap = WORKFLOW_BY_TRACK[track] ?? WORKFLOW_BY_TRACK["Pharmacovigilance"];

  return [
    {
      day: 1,
      title: "Map the territory",
      why: `Understand what a ${track} role actually does day-to-day in an Indian CRO.`,
      action: `Read the "What is ${track}?" overview and write 3 bullets in your own words.`,
      minutes: 20,
    },
    {
      day: 2,
      title: "Meet a real workflow",
      why: "Real workflows are unglamorous. We want you to see them before you commit.",
      action: wf.workflow,
      minutes: 25,
    },
    {
      day: 3,
      title: "Salary + market reality",
      why: "Decide with eyes open. Most students skip this and regret it later.",
      action: "Read the salary report for your region. Pick a 12-month target band.",
      minutes: 15,
    },
    {
      day: 4,
      title: "Tools you'll touch",
      why: `${wf.tool} — pick one and explore it for 20 minutes.`,
      action: wf.toolAction,
      minutes: 30,
    },
    {
      day: 5,
      title: "Talk to someone in the role",
      why: "Nothing replaces a 10-minute call with someone two years ahead of you.",
      action: "Book a 15-min call with an Arzon alumnus working in the field.",
      minutes: 20,
    },
    {
      day: 6,
      title: "Stress-test the fit",
      why: "Re-read your ACRI honesty section. Is anything still bothering you?",
      action: "List your 3 biggest doubts. Bring them to your counsellor call.",
      minutes: 15,
    },
    {
      day: 7,
      title: "Decide",
      why: "By now you have data, not vibes. Make the call.",
      action: "Pick one: apply for the cohort, ask for a launch code, or save the plan for later.",
      minutes: 10,
    },
  ];
}

function DayCard({ day, index, primarySlug }: { day: Day; index: number; primarySlug: string }) {
  const [done, setDone] = useState(false);
  // Persist completion per-day in localStorage so the plan feels owned.
  const storageKey = `ce_plan_d${day.day}_${primarySlug}`;
  useEffect(() => {
    if (typeof window === "undefined") return;
    setDone(window.localStorage.getItem(storageKey) === "1");
  }, [storageKey]);
  const toggle = () => {
    if (typeof window === "undefined") return;
    const next = !done;
    setDone(next);
    if (next) window.localStorage.setItem(storageKey, "1");
    else window.localStorage.removeItem(storageKey);
  };

  return (
    <li
      className={`rounded-2xl border p-5 transition ${
        done
          ? "border-accent-glow/30 bg-accent-glow/[0.06]"
          : index === 0
            ? "border-primary-glow/30 bg-primary/[0.04]"
            : "border-white/10 bg-white/[0.03]"
      }`}
    >
      <div className="flex items-start gap-4">
        <button
          onClick={toggle}
          aria-label={done ? `Mark day ${day.day} as not done` : `Mark day ${day.day} as done`}
          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition ${
            done
              ? "border-accent-glow/60 bg-accent-glow/20 text-eyebrow-strong"
              : "border-white/15 bg-white/5 text-white/65 hover:border-white/40"
          }`}
        >
          {done ? <CheckCircle2 className="h-5 w-5" /> : <BookOpen className="h-4 w-4" />}
        </button>
        <div className="flex-1">
          <div className="flex flex-wrap items-baseline gap-2">
            <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow">
              Day {day.day}
            </p>
            <span className="font-mono text-micro text-white/60">~{day.minutes} min</span>
          </div>
          <p className="mt-1 font-grotesk text-base font-bold text-white sm:text-lg">{day.title}</p>
          <p className="mt-1 text-sm text-white/65">{day.why}</p>
          <p className="mt-3 inline-flex items-start gap-2 text-caption text-white/85">
            <ClipboardList className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {day.action}
          </p>
        </div>
      </div>
    </li>
  );
}
