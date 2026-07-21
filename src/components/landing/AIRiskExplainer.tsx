import { Link } from "@tanstack/react-router";
import { Section } from "@/components/ui/Section";
import { Zap, ClipboardCheck, FlaskConical, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

/**
 * "Will AI take this job?", answered honestly using the same
 * Augmented / Audit / Resistant taxonomy used on the course cards.
 */
export function AIRiskExplainer() {
  return (
    <Section size="md">
      <SectionHeader
        eyebrow="Will AI take my job?"
        title={<>Honest answer: depends which job.</>}
        sub="Every Arzon programme falls into one of three buckets. We tell you which one before you join."
      />

      <div className="mt-10 grid gap-4 sm:gap-5 md:mt-12 md:grid-cols-3">
        {CARDS.map((c) => (
          <article
            key={c.tag}
            className={`relative overflow-hidden rounded-2xl border p-5 sm:p-6 ${c.tone}`}
          >
            <div className="flex items-center gap-2">
              <c.icon className="h-4 w-4" />
              <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em]">
                {c.tag}
              </p>
            </div>
            <h3 className="mt-3 font-display text-lg font-normal leading-tight text-slate-50 sm:text-h4">
              {c.headline}
            </h3>
            <p className="body mt-3">{c.body}</p>

            <p className="mt-5 font-mono text-micro uppercase tracking-[0.18em] text-slate-100/80">
              Example roles
            </p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {c.roles.map((r) => (
                <li
                  key={r}
                  className="rounded-full border border-slate-200/10 bg-white/[0.04] px-2 py-0.5 font-mono text-micro text-slate-100/80"
                >
                  {r}
                </li>
              ))}
            </ul>

            <p className="mt-5 border-t border-slate-200/10 pt-4 text-xs italic text-slate-100/65">
              <span className="font-semibold not-italic text-slate-100/85">What we teach:</span>{" "}
              {c.whatWeTeach}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          to="/courses"
          className="inline-flex h-11 items-center gap-1.5 text-sm font-semibold text-primary-glow hover:underline"
        >
          See AI bucket for every programme
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </Section>
  );
}

const CARDS = [
  {
    tag: "AI helps you",
    icon: Zap,
    tone: "border-amber-400/25 bg-amber-400/[0.04] text-amber-200", // @allow-raw-palette semantic warning tone
    headline: "AI makes you 3× faster. Companies hire more, not less.",
    body: "Hospitals and BPOs are not firing coders. They want 3× the work per person. The job grows, it doesn't shrink.",
    roles: ["Medical Coder", "PV Associate", "Data Analyst"],
    whatWeTeach: "How to use AI tools (Copilot, AAPC AI, Argus) without making mistakes.",
  },
  {
    tag: "Humans approve",
    icon: ClipboardCheck,
    tone: "border-accent-glow/25 bg-accent-glow/[0.04] text-eyebrow-strong",
    headline: "AI writes the draft. A trained human signs it off.",
    body: "Government regulators do not accept AI submissions. Only qualified humans can sign. That signature is your career.",
    roles: ["Regulatory Associate", "CDM QA", "Clinical SAS"],
    whatWeTeach: "How to catch the 1-in-50 mistake AI makes with full confidence.",
  },
  {
    tag: "AI can't do this",
    icon: FlaskConical,
    tone: "border-accent-glow/25 bg-accent-glow/[0.04] text-eyebrow-strong",
    headline: "AI can't run a lab or hack a hospital network.",
    body: "Lab work, real research and security testing need hands and judgment. AI can't touch them.",
    roles: ["Nanotech R&D", "Ethical Hacker", "ML Engineer"],
    whatWeTeach: "Hands-on lab and security skills that don't fit in a chat box.",
  },
];
