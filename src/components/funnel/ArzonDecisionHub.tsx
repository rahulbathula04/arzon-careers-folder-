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
      body: "Review roles, skills, tools and practical work so you can decide from the job—not a course title.",
      to: secondaryTo,
      cta: secondaryLabel,
    },
  ];

  return (
    <section className="border-y border-[var(--arzon-border)] bg-slate-50/70">
      <div className="arzon-v2-container py-7 sm:py-9">
        <div className="max-w-3xl">
          <span className="arzon-v2-eyebrow">{eyebrow}</span>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-[var(--arzon-ink-strong)] sm:text-3xl">
            {title}
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {cards.map(({ icon: Icon, label, title, body, to, cta }) => (
            <div key={label} className="arzon-v2-card flex items-start gap-4 p-4 sm:p-5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-700">
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <span className="arzon-v2-data-label">{label}</span>
                <h3 className="mt-1 text-base font-extrabold text-[var(--arzon-ink-strong)]">{title}</h3>
                <p className="mt-1 text-xs leading-5 text-slate-600">{body}</p>
                <Link to={to as never} className="mt-3 inline-flex items-center gap-1 text-xs font-extrabold text-blue-700">
                  {cta} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-semibold text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Start with information
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> See the role before the programme
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Decide when you have enough evidence
          </span>
        </div>
      </div>
    </section>
  );
}
