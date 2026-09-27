import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { AcriCareerIntelligenceReport } from "@/components/acri/assessment/AcriCareerIntelligenceReport";
import type { AcriDecisionResult } from "@/data/acri/acriPvStandard";
import { ACRI_PV_COMPETENCIES } from "@/data/acri/acriPvStandard";
import { pageSeo } from "@/lib/seo";
import { getAcriResultFn } from "@/lib/acri-core.functions";

const resultSearchSchema = z.object({
  score: z.coerce.number().optional(),
  name: z.string().optional(),
  college: z.string().optional(),
  qualification: z.string().optional(),
  mode: z.enum(["certified", "practice"]).optional(),
});

export const Route = createFileRoute("/acri/result/$resultId")({
  validateSearch: (input) => resultSearchSchema.parse(input),
  head: () => {
    const ps = pageSeo({
      path: "/acri/result",
      title: "ACRI Career Intelligence Report · Arzon Global",
      description:
        "Official ACRI Pharmacovigilance readiness intelligence report and competency profile.",
      noindex: true,
    });
    return {
      meta: [
        { title: "ACRI Career Intelligence Report · Arzon Global" },
        { name: "robots", content: "noindex,nofollow" },
        ...ps.meta,
      ],
      links: ps.links,
    };
  },
  component: AcriResultPage,
});

function AcriResultPage() {
  const { resultId } = Route.useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState<AcriDecisionResult | null>(null);
  const [meta, setMeta] = useState<{name:string;college:string;qualification:string;credentialId:string|null;date:string;mode:"certified"|"practice"} | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void getAcriResultFn({ data: { resultId } })
      .then((saved) => {
        if (cancelled) return;
        if (!saved) {
          setError("This assessment result could not be found.");
          return;
        }
        setResult({
          decision: saved.readinessLevel === "Industry Ready" ? "Industry Ready" : "Readiness Gap Identified",
          compositeScore: saved.score,
          passedGates: saved.passedGates,
          failedGates: [],
          dimensionScores: saved.dimensionScores,
          strengths: [],
          developmentGaps: [],
          tailoredRemediation: [],
        });
        setMeta({
          name: saved.candidateName,
          college: saved.college ?? "Not provided",
          qualification: saved.qualification ?? "Not provided",
          credentialId: saved.credentialId,
          date: saved.completedAt,
          mode: saved.credentialId ? "certified" : "practice",
        });
      })
      .catch(() => {
        if (!cancelled) setError("Unable to load this assessment result right now.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [resultId]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading assessment result…</div>;
  if (error || !result || !meta) return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md text-center space-y-4">
        <h1 className="text-2xl font-bold">Result unavailable</h1>
        <p className="text-stone-600">{error ?? "No valid assessment result was found."}</p>
        <button type="button" onClick={() => navigate({ to: "/career-engine/test" })} className="rounded-xl bg-[#0B1325] px-5 py-2.5 text-white font-bold">Take the assessment</button>
      </div>
    </div>
  );

  return (
    <div className="relative">
      <AcriCareerIntelligenceReport
        result={result}
        mode={meta.mode}
        candidateName={meta.name}
        candidateCollege={meta.college}
        candidateQualification={meta.qualification}
        credentialId={meta.credentialId ?? undefined}
        assessmentDate={meta.date}
        onRetake={() => navigate({ to: "/career-engine/test" })}
      />
    </div>
  );
}
