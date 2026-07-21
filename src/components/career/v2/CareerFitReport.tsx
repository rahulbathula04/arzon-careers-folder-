/**
 * CareerFitReport v3 — recruiter-grade Career Brief.
 *
 * Sequence: Verdict → Primary fit → Evidence ledger → India market →
 * Role ladder → vs runner-up → Strong fits #2/#3 → Ruled-out → Not a fit
 * → Methodology + ASSAY handoff.
 *
 * No phone numbers are printed; WhatsApp routing lives in StickyResultCta.
 */

import { useEffect, useRef } from "react";
import { CheckCircle2, XCircle, Scale } from "lucide-react";
import type { CareerEngineResult } from "@/data/careerEngineScoring";
import { PATHS } from "@/data/careerEngineScoring";
import { getPathFacts, formatSourceLine, type CareerPathFacts } from "@/data/careerPathEvidence";
import { familyForPathSlug, type CareerFamily } from "@/data/careerFamilies";
import { buildVsRunnerUp } from "@/lib/careerEngine/explainability";
import { RoleLadder } from "./RoleLadder";
import { RuledOutCard } from "./RuledOutCard";
import { VerdictHeader } from "./VerdictHeader";
import { PrimaryFit } from "./PrimaryFit";
import { EvidenceLedger } from "./EvidenceLedger";
import { IndiaMarketPanel } from "./IndiaMarketPanel";
import { MethodologyFold } from "./MethodologyFold";
import { PercentileBenchmark } from "./PercentileBenchmark";
import { EmployabilityTriad } from "./EmployabilityTriad";
import { DownloadReportPdfButton } from "./DownloadReportPdfButton";
import { recordChosenRole, recordRecommendation } from "@/lib/recommendationOutcomes.functions";

export function CareerFitReport({
  result,
  leadId,
}: {
  result: CareerEngineResult;
  leadId: string | null;
}) {
  const pathFits = result.evidence?.scoring?.topPathFits ?? [];
  const topThree = (
    pathFits.length
      ? pathFits.slice(0, 3).map((p) => p.slug)
      : (result.archetype.topPaths ?? []).slice(0, 3).map((p) => p.slug)
  ).filter((slug) => Boolean(PATHS[slug]));

  const notFitSlug = result.notFit?.id
    ? (result.archetype.topPaths.find((p) => !topThree.includes(p.slug))?.slug ??
      "regulatory-affairs")
    : null;
  const notFitPath = notFitSlug ? PATHS[notFitSlug] : null;
  const notFitFacts: CareerPathFacts | null = notFitSlug ? getPathFacts(notFitSlug) : null;

  const vsRunnerUp = buildVsRunnerUp(result);
  const topFamily: CareerFamily | null = topThree[0] ? familyForPathSlug(topThree[0]) : null;

  // Persist recommendation outcome once per render.
  const captured = useRef(false);
  useEffect(() => {
    if (captured.current) return;
    if (!leadId || !topFamily || !topThree[0]) return;
    captured.current = true;
    void recordRecommendation({
      data: { leadId, familyId: topFamily.id, topRoleSlug: topThree[0] },
    }).catch(() => {});
  }, [leadId, topFamily, topThree]);

  return (
    <div className="space-y-6">
      <VerdictHeader result={result} />

      <div className="flex justify-end">
        <DownloadReportPdfButton result={result} leadId={leadId} />
      </div>

      <EmployabilityTriad result={result} />

      {topThree[0] && <PrimaryFit result={result} slug={topThree[0]} />}

      {topThree[0] && <EvidenceLedger result={result} pathSlug={topThree[0]} />}

      <PercentileBenchmark result={result} />

      {topThree[0] && <IndiaMarketPanel pathSlug={topThree[0]} />}

      {topFamily && (
        <RoleLadder
          family={topFamily}
          result={result}
          onTrackRole={(slug) => {
            if (!leadId) return;
            void recordChosenRole({
              data: { leadId, roleSlug: slug, familyId: topFamily.id },
            }).catch(() => {});
          }}
        />
      )}

      {vsRunnerUp && (
        <section className="rounded-3xl border border-amber-300/25 bg-amber-300/[0.04] p-6 sm:p-8">
          <div className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-amber-300" />
            <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-amber-200/90">
              Why {vsRunnerUp.topTitle}, not {vsRunnerUp.runnerTitle}?
            </p>
          </div>
          <p className="mt-2 text-sm text-white/75">
            <span className="font-bold text-white">{vsRunnerUp.topTitle}</span> scored{" "}
            <span className="font-bold text-white tabular-nums">
              {Math.round(vsRunnerUp.topFit)}%
            </span>
            . <span className="font-bold text-white">{vsRunnerUp.runnerTitle}</span> scored{" "}
            <span className="font-bold text-white tabular-nums">
              {Math.round(vsRunnerUp.runnerFit)}%
            </span>
            . A gap of{" "}
            <span className="font-bold tabular-nums text-amber-200">{vsRunnerUp.delta} pts</span>.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="font-mono text-micro uppercase tracking-[0.18em] text-sky-300/85">
                {vsRunnerUp.topTitle} scored higher because
              </p>
              {vsRunnerUp.topWonOn.length ? (
                <ul className="mt-2 space-y-1 text-sm text-white/80">
                  {vsRunnerUp.topWonOn.map((r, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" /> {r}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm text-white/55">
                  Marginal — both paths use a similar trait mix.
                </p>
              )}
            </div>
            <div>
              <p className="font-mono text-micro uppercase tracking-[0.18em] text-rose-300/85">
                {vsRunnerUp.runnerTitle} lost points because
              </p>
              {vsRunnerUp.runnerLostOn.length ? (
                <ul className="mt-2 space-y-1 text-sm text-white/80">
                  {vsRunnerUp.runnerLostOn.map((r, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" /> {r}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm text-white/55">No clear trait-level gap.</p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Strong fits #2 and #3 — compact PrimaryFit cards */}
      {topThree.slice(1).map((slug) => (
        <PrimaryFit key={slug} result={result} slug={slug} />
      ))}

      <RuledOutCard course={result.profile?.course} />

      {notFitPath && (
        <section className="rounded-3xl border border-rose-400/25 bg-rose-500/[0.04] p-6 sm:p-8">
          <div className="flex items-center gap-2">
            <XCircle className="h-5 w-5 text-rose-400" />
            <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-rose-300/90">
              Not a fit
            </p>
          </div>
          <h2 className="mt-1 font-grotesk text-h3 font-extrabold text-white">
            {notFitPath.title}
          </h2>
          {result.notFitReasons?.length > 0 ? (
            <ul className="mt-3 space-y-1.5">
              {result.notFitReasons.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/75">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-rose-400/80" /> {r}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-white/70">
              Your answers don't show the trait pattern this path needs day-to-day. Skipping it is
              the honest call.
            </p>
          )}
          {notFitFacts && (
            <p className="mt-3 text-xs italic text-white/45">{formatSourceLine(notFitFacts)}</p>
          )}
        </section>
      )}

      <MethodologyFold leadId={leadId} />

      {leadId && (
        <p className="text-center font-mono text-micro uppercase tracking-[0.22em] text-white/30">
          Report ID · {leadId.slice(0, 8)}
        </p>
      )}
    </div>
  );
}

export default CareerFitReport;
