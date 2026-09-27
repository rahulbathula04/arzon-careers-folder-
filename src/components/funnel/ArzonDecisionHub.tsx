import { ArrowRight, CheckCircle2, PlayCircle, Target } from "lucide-react";
import { Link } from "@tanstack/react-router";

type Props = {
  eyebrow?: string;
  title: string;
  description: string;
  primaryLabel: string;
  primaryTo: string;
  secondaryLabel: string;
  secondaryTo: string;
};

export function ArzonDecisionHub({
  eyebrow = "CHOOSE YOUR NEXT STEP",
  title,
  description,
  primaryLabel,
  primaryTo,
  secondaryLabel,
  secondaryTo,
}: Props) {
  const cards = [
    {
      icon: Target,
      label: "CHECK FIT",
      title: "Know which role fits you",
      body: "Use the free career assessment to map your background to role requirements before you commit to a programme.",
      to: primaryTo,
      cta: primaryLabel,
    },
    {
      icon: PlayCircle,
      label: "SEE THE WORK",
      title: "Understand what the job needs",
      body: "Review roles, skills, tools and practical work so you can make a decision based on the job, not a course title.",
      to: secondaryTo,
      cta: secondaryLabel,
    },
  ];

  return (
    <section className="arzon-v2-section border-y border-[var(--arzon-border)] bg-[var(--arzon-surface-blue)] tone-light">
      <div className="arzon-v2-container">
        <div className="max-w-3xl">
          <span className="arzon-v2-eyebrow">{eyebrow}</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--arzon-ink)] sm:text-4xl">{title}</h2>
          <p className="mt-3 text-base leading-7 text-[var(--arzon-ink-soft)]">{description}</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {cards.map(({ icon: Icon, label, title, body, to, cta }) => (
            <div key={label} className="arzon-v2-card flex flex-col p-6">
              <div className="flex items-center gap-2">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--arzon-blue-100)] text-[var(--arzon-blue-700)]"><Icon className="h-5 w-5" /></span>
                <span className="arzon-v2-data-label">{label}</span>
              </div>
              <h3 className="mt-5 text-xl font-bold text-[var(--arzon-ink)]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--arzon-ink-soft)]">{body}</p>
              <Link to={to as any} className="mt-6 inline-flex items-center gap-2 font-semibold text-[var(--arzon-blue-700)]">{cta} <ArrowRight className="h-4 w-4" /></Link>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[var(--arzon-ink-muted)]">
          <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-[var(--arzon-green-600)]" />Start with information</span>
          <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-[var(--arzon-green-600)]" />See the role before the programme</span>
          <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-[var(--arzon-green-600)]" />Decide when you have enough evidence</span>
        </div>
      </div>
    </section>
  );
}
