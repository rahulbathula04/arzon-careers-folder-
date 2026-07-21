import { Link } from "@tanstack/react-router";
import { Activity, Gauge, ShieldCheck, ArrowRight } from "lucide-react";
import { ACRI_DIMENSIONS, ASSAY_FULL, ACRI_FULL } from "./constants";

/**
 * Three-card row that explains the readiness layer:
 *   1. ASSAY, the evaluation philosophy
 *   2. ACRI , the score with its 5 dimensions
 *   3. CTA  , preview your ACRI in 3 minutes
 * Used on the homepage and the PV programme page.
 */
export function AssayExplainer() {
  return (
    <section aria-labelledby="assay-heading" className="mx-auto mt-20 max-w-6xl px-4 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-gold">
          The readiness layer
        </p>
        <h2 id="assay-heading" className="h-section mt-3">
          Resumes are claims. <span className="text-primary-glow">Readiness is measurable.</span>
        </h2>
        <p className="body-lg mt-3 text-slate-100/70">
          ASSAY evaluates how operationally ready you are for entry-level healthcare roles, and
          turns that into a single index recruiters can trust.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <Card
          icon={ShieldCheck}
          eyebrow="ASSAY"
          title="The evaluation system"
          body={`${ASSAY_FULL}. Structured workflow simulations and operational scenarios that mirror what production teams do every day.`}
        />
        <Card
          icon={Gauge}
          eyebrow="ACRI"
          title="Your readiness index"
          body={`${ACRI_FULL}, a single 0-100 score across five dimensions recruiters actually screen for.`}
          dimensions
        />
        <CardCta />
      </div>
    </section>
  );
}

function Card({
  icon: Icon,
  eyebrow,
  title,
  body,
  dimensions,
}: {
  icon: typeof ShieldCheck;
  eyebrow: string;
  title: string;
  body: string;
  dimensions?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-slate-200/10 bg-white/[0.03] p-6">
      <div className="flex items-center gap-2 text-gold">
        <Icon className="h-4 w-4" />
        <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em]">{eyebrow}</p>
      </div>
      <h3 className="mt-3 font-grotesk text-lg font-bold text-slate-50">{title}</h3>
      <p className="mt-2 text-sm text-slate-100/70">{body}</p>
      {dimensions && (
        <ul className="mt-4 space-y-1.5">
          {ACRI_DIMENSIONS.map((d) => (
            <li
              key={d.id}
              className="flex items-center justify-between rounded-lg border border-slate-200/5 bg-white/[0.02] px-3 py-1.5 text-meta text-slate-100/80"
            >
              <span>{d.label}</span>
              <span className="font-mono text-micro uppercase tracking-[0.18em] text-slate-100/60">
                Dim
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function CardCta() {
  return (
    <div className="flex flex-col rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/[0.10] to-gold/[0.03] p-6">
      <div className="flex items-center gap-2 text-gold">
        <Activity className="h-4 w-4" />
        <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em]">
          ACRI Preview
        </p>
      </div>
      <h3 className="mt-3 font-grotesk text-lg font-bold text-slate-50">
        Score your industry fit in 3 minutes
      </h3>
      <p className="mt-2 text-sm text-slate-100/70">
        Free. Personalised. Yours forever, even if you never enrol.
      </p>
      <SampleChart />
      <Link to="/career-engine" className="btn btn-primary btn-block btn-glow-pulse mt-5">
        Preview my ACRI
        <ArrowRight className="ml-1 h-4 w-4" />
      </Link>
    </div>
  );
}

function SampleChart() {
  // Static recruiter-style sample. Numbers are illustrative only.
  const sample = [62, 71, 48, 55, 68];
  return (
    <div className="mt-4 rounded-xl border border-slate-200/10 bg-surface-ink/70 p-3">
      <div className="flex items-end justify-between gap-1.5">
        {sample.map((v, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
            <div className="relative h-20 w-full overflow-hidden rounded-md bg-white/[0.04]">
              <div
                className="absolute inset-x-0 bottom-0 rounded-md bg-gradient-to-t from-primary-glow/80 to-gold/70"
                style={{ height: `${v}%` }}
                aria-hidden
              />
            </div>
            <span className="font-mono text-micro uppercase tracking-[0.12em] text-slate-100/60">
              {ACRI_DIMENSIONS[i].label.split(" ")[0]}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-micro text-slate-100/50">
        Sample preview · your real ACRI will be personalised
      </p>
    </div>
  );
}
