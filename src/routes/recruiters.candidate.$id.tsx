import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import {
  CandidatePortfolio,
  type CandidatePortfolioData,
} from "@/components/recruiters/CandidatePortfolio";
import { Footer } from "@/components/landing/Footer";
import { RUBRIC_BY_SLUG, type GradeBand } from "@/data/gradingRubric";
import { pageSeo } from "@/lib/seo";

const searchSchema = z.object({
  track: z.string().optional(),
  band: z.enum(["A", "B+", "B", "NA"]).optional(),
  cohort: z.string().optional(),
  issued: z.string().optional(),
});

/**
 * Recruiter-facing per-candidate portfolio. v1 reads the candidate
 * shape from URL params (track/band/cohort/issued) with sensible
 * inferences from the certificate ID prefix. Always noindex — these
 * URLs are not for the search engine, only for recruiters with the
 * link. A future iteration wires to a candidate_artifacts table.
 */
export const Route = createFileRoute("/recruiters/candidate/$id")({
  validateSearch: (input) => searchSchema.parse(input),
  head: ({ params }) => {
    const title = `Candidate ${params.id} · Arzon Careers recruiter portfolio`;
    const description =
      "Recruiter portfolio for an individual Arzon Global candidate. Verified ID, grade band, JD-task mapping and de-identified work samples.";
    const ps = pageSeo({
      path: `/recruiters/candidate/${params.id}`,
      title,
      description,
      noindex: true,
    });
    return { meta: [{ title }, ...ps.meta], links: ps.links };
  },
  component: CandidatePortfolioRoute,
});

const TRACK_PREFIX: Record<string, string> = {
  PV: "pharmacovigilance",
  MC: "medical-coding",
  CDM: "clinical-data-management",
  SAS: "sas-clinical",
  RA: "regulatory-affairs",
  MW: "medical-writing",
};

function inferTrackFromId(id: string): string {
  // Expected shape: AG-{TRACK}-{YEAR}-{NNN}
  const m = id.toUpperCase().match(/^AG-([A-Z]+)-/);
  const code = m?.[1] ?? "";
  return TRACK_PREFIX[code] ?? "pharmacovigilance";
}

function inferCohortFromId(id: string): string {
  const m = id.toUpperCase().match(/-(\d{4})-/);
  return m?.[1] ? `${m[1]}` : "2026";
}

function CandidatePortfolioRoute() {
  const params = Route.useParams();
  const search = Route.useSearch();

  const trackSlug = search.track ?? inferTrackFromId(params.id);
  const rubric = RUBRIC_BY_SLUG[trackSlug];
  const data: CandidatePortfolioData = {
    id: params.id.toUpperCase(),
    trackSlug: rubric ? trackSlug : "pharmacovigilance",
    cohort: search.cohort ?? inferCohortFromId(params.id),
    band: (search.band as GradeBand) ?? "B+",
    issuedOn: search.issued ?? "March 2026",
    initials: params.id.slice(-3).toUpperCase(),
  };

  return (
    <>
      <CandidatePortfolio data={data} />
      <Footer />
    </>
  );
}
