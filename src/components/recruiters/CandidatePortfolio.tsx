import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ShieldCheck, ArrowRight, FileText, QrCode } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { RUBRIC_BY_SLUG, type GradeBand } from "@/data/gradingRubric";
import { JD_PROVENANCE_BY_SLUG, coverageBand } from "@/data/jdProvenance";
import { WORK_SAMPLES } from "./WorkSampleCard";
import { ArtifactRequestLane } from "./ArtifactRequestLane";
import { VerificationAuditTrail } from "@/components/verify/VerificationAuditTrail";
import { logVerificationEvent } from "@/lib/verificationAudit";

/**
 * Candidate portfolio (recruiter-facing). v1 reads from URL params only -
 * no DB hookup yet, so recruiters always see track-level work-sample
 * previews + a "request this candidate's artifacts" CTA. A second
 * iteration can wire to a candidate_artifacts table without changing the
 * page shell. Pages are noindex (per-candidate URLs should not be in
 * search results) - set in the route file.
 */
export interface CandidatePortfolioData {
  id: string;
  trackSlug: string;
  cohort: string;
  band: GradeBand;
  issuedOn: string;
  initials: string;
}

const BAND_TONE: Record<GradeBand, string> = {
  A: "border-sky-400/40 bg-sky-100 text-sky-900",
  "B+": "border-accent-glow/40 bg-sky-100 text-sky-900",
  B: "border-amber-400/40 bg-amber-100 text-amber-900",
  NA: "border-slate-400/40 bg-slate-100 text-slate-700",
};

export function CandidatePortfolio({ data }: { data: CandidatePortfolioData }) {
  const rubric = RUBRIC_BY_SLUG[data.trackSlug];
  const provenance = JD_PROVENANCE_BY_SLUG[data.trackSlug];
  const trackTitle = rubric?.title ?? data.trackSlug;
  const sample = WORK_SAMPLES.find((s) => s.trackSlug === data.trackSlug);
  const verifyHref = `/verify?id=${encodeURIComponent(data.id)}`;
  const bandRow = rubric?.rows.find((r) => r.band === data.band);

  useEffect(() => {
    void logVerificationEvent(data.id, "portfolio_viewed");
    void logVerificationEvent(data.id, "rubric_viewed");
  }, [data.id]);

  return (
    <main className="bg-[#F7F9FC] pb-24">
      {/* Header */}
      <Section size="md" className="pt-12 sm:pt-16">
        <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-[color:var(--teal-deep)]">
          Recruiter portfolio · do not share with candidate
        </p>
        <h1 className="mt-2 font-grotesk text-h1 font-bold text-ink">
          Candidate <span className="font-mono text-[0.85em]">{data.id}</span>
        </h1>
        <p className="mt-2 text-body-sm text-slate-600">
          {trackTitle} · {data.cohort} cohort · Issued {data.issuedOn}
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto]">
          <div className={`rounded-2xl border-2 p-5 ${BAND_TONE[data.band]}`}>
            <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em]">
              Grade band
            </p>
            <p className="mt-1 font-grotesk text-h2 font-bold leading-none">{data.band}</p>
            {bandRow && (
              <p className="mt-3 max-w-md text-caption leading-relaxed">{bandRow.jdOutcome}</p>
            )}
          </div>
          <Link
            to="/verify"
            search={{ id: data.id }}
            className="flex items-center gap-3 rounded-2xl border border-ink/15 bg-white px-4 py-3 text-caption font-semibold text-ink hover:border-[color:var(--teal-deep)]/40"
          >
            <QrCode className="h-5 w-5 text-[color:var(--teal-deep)]" />
            <div>
              <p>Verify this certificate</p>
              <p className="font-mono text-micro font-normal text-slate-500">{verifyHref}</p>
            </div>
            <ArrowRight className="ml-1 h-3.5 w-3.5 text-slate-400" />
          </Link>
        </div>
      </Section>

      {/* JD-task mapping */}
      {provenance && (
        <Section size="md">
          <h2 className="font-grotesk text-h4 font-bold text-ink">What they were graded on</h2>
          <p className="mt-1 text-caption text-slate-600">
            Tasks reverse-engineered from current <em>{provenance.roleTitle}</em> JDs (
            {provenance.sources.join(", ")}). The candidate&rsquo;s graded deliverables map to the
            phrases hiring teams actually write.
          </p>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-ink/10 bg-white">
            <table className="w-full min-w-[560px] text-left text-caption">
              <thead className="bg-slate-50 text-micro font-semibold uppercase tracking-[0.16em] text-slate-500">
                <tr>
                  <th className="px-4 py-3">JD phrase (verbatim)</th>
                  <th className="px-4 py-3">In JDs</th>
                  <th className="px-4 py-3">Module satisfied</th>
                </tr>
              </thead>
              <tbody>
                {provenance.topJdPhrases.map((p) => (
                  <tr key={p.phrase} className="border-t border-ink/5 align-top">
                    <td className="px-4 py-3 text-slate-800">{p.phrase}</td>
                    <td className="px-4 py-3 font-mono text-meta text-slate-600">
                      {coverageBand(p.coverage)}
                    </td>
                    <td className="px-4 py-3 text-slate-700">{p.satisfiedByModule ?? "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {/* Artifact previews */}
      <Section size="md">
        <h2 className="font-grotesk text-h4 font-bold text-ink">Performance artifacts</h2>
        <p className="mt-1 text-caption text-slate-600">
          Track-level samples shown below. Individual artifacts (this candidate's actual graded
          deliverables) are sent on request with the candidate's consent - never published openly.
        </p>
        {sample ? (
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-ink/10 bg-white p-5">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-[color:var(--teal-deep)]" />
                <p className="font-mono text-micro font-semibold uppercase tracking-[0.2em] text-[color:var(--teal-deep)]">
                  Track-level sample
                </p>
              </div>
              <h3 className="mt-2 font-grotesk text-body-sm font-bold text-ink">
                {sample.artifact}
              </h3>
              <p className="mt-1 font-mono text-micro text-slate-500">{sample.excerpt}</p>
              <ul className="mt-3 space-y-1.5 text-caption leading-relaxed text-slate-700">
                {sample.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[color:var(--teal-deep)]" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <ArtifactRequestLane candidateRef={data.id} />
          </div>
        ) : null}
      </Section>

      {/* Public audit trail */}
      <Section size="md">
        <VerificationAuditTrail candidateRef={data.id} />
      </Section>

      {/* Footer trust strip */}
      <Section size="md">
        <div className="rounded-2xl border border-ink/10 bg-white p-5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[color:var(--teal-deep)]" />
            <p className="font-grotesk text-body-sm font-bold text-ink">
              Want to talk to this candidate?
            </p>
          </div>
          <p className="mt-2 max-w-2xl text-caption leading-relaxed text-slate-600">
            We don't publish candidate email or phone. Send a one-line note and we'll forward it the
            same day. The candidate decides whether to share contact details.
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex h-10 items-center rounded-full bg-[color:var(--teal-deep)] px-4 text-caption font-semibold text-white hover:bg-[color:var(--teal-ink)]"
            >
              Forward an intro
            </Link>
            <Link
              to="/recruiters"
              className="inline-flex h-10 items-center rounded-full border border-ink/15 bg-white px-4 text-caption font-semibold text-ink hover:border-[color:var(--teal-deep)]/40"
            >
              See the rubric again
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}
