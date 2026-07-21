import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { CareerEngineResult } from "@/data/careerEngineScoring";
/**
 * Employer console — server functions.
 *
 * Verification → login mapping (see docs/employer-console.md):
 *   • An employer signs in via /employer/login (email/password or Google).
 *   • Console access requires a row in `employer_members` linking the user
 *     to a verified employer (`employers.verified_at IS NOT NULL`).
 *   • Every read/write below is gated by RLS via `has_employer_access()`.
 */

// ────────────────────────────────────────────────────────────────────
// Access: the employers the current user can act on
// ────────────────────────────────────────────────────────────────────

export type MyEmployer = {
  employer_id: string;
  slug: string;
  name: string;
  logo_url: string | null;
  member_role: string;
  verified_at: string;
};

export const listMyEmployers = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase.rpc("list_my_employers");
    if (error) throw new Error(error.message);
    return { employers: (data ?? []) as MyEmployer[] };
  });

// ────────────────────────────────────────────────────────────────────
// Jobs
// ────────────────────────────────────────────────────────────────────

export const PROGRAM_SLUGS = [
  "pharmacovigilance",
  "medical-coding",
  "clinical-data-management",
  "sas-clinical",
  "regulatory-affairs",
  "medical-writing",
] as const;

export const EMPLOYMENT_TYPES = ["full_time", "contract", "internship"] as const;
export const JOB_STATUSES = ["draft", "open", "closed", "filled"] as const;

const JobUpsertSchema = z
  .object({
    employerId: z.string().uuid(),
    jobId: z.string().uuid().optional(),
    programSlug: z.enum(PROGRAM_SLUGS),
    title: z.string().trim().min(3).max(160),
    location: z.string().trim().min(2).max(120),
    employmentType: z.enum(EMPLOYMENT_TYPES),
    experienceMinYrs: z.number().min(0).max(40),
    experienceMaxYrs: z.number().min(0).max(40).optional().nullable(),
    salaryMinInr: z.number().int().min(0).max(100_000_000).optional().nullable(),
    salaryMaxInr: z.number().int().min(0).max(100_000_000).optional().nullable(),
    description: z.string().trim().min(20).max(8000),
    skills: z.array(z.string().trim().min(1).max(40)).max(30),
    status: z.enum(JOB_STATUSES),
    opensAt: z.string().datetime().optional().nullable(),
    closesAt: z.string().datetime().optional().nullable(),
  })
  .refine((v) => v.experienceMaxYrs == null || v.experienceMaxYrs >= v.experienceMinYrs, {
    message: "experienceMaxYrs must be ≥ experienceMinYrs",
    path: ["experienceMaxYrs"],
  })
  .refine(
    (v) => v.salaryMaxInr == null || v.salaryMinInr == null || v.salaryMaxInr >= v.salaryMinInr,
    { message: "salaryMaxInr must be ≥ salaryMinInr", path: ["salaryMaxInr"] },
  )
  .refine((v) => !v.closesAt || !v.opensAt || new Date(v.closesAt) >= new Date(v.opensAt), {
    message: "closesAt must be on/after opensAt",
    path: ["closesAt"],
  });

export const listJobs = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ employerId: z.string().uuid() }).parse(data))
  .handler(async ({ data, context }) => {
    const { data: rows, error } = await context.supabase
      .from("employer_jobs")
      .select(
        "id, program_slug, title, location, employment_type, experience_min_yrs, experience_max_yrs, salary_min_inr, salary_max_inr, description, skills, status, opens_at, closes_at, created_at, updated_at",
      )
      .eq("employer_id", data.employerId)
      .order("updated_at", { ascending: false });
    if (error) throw new Error(error.message);
    return { jobs: rows ?? [] };
  });

export const upsertJob = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => JobUpsertSchema.parse(data))
  .handler(async ({ data, context }) => {
    const row = {
      employer_id: data.employerId,
      program_slug: data.programSlug,
      title: data.title,
      location: data.location,
      employment_type: data.employmentType,
      experience_min_yrs: data.experienceMinYrs,
      experience_max_yrs: data.experienceMaxYrs ?? null,
      salary_min_inr: data.salaryMinInr ?? null,
      salary_max_inr: data.salaryMaxInr ?? null,
      description: data.description,
      skills: data.skills,
      status: data.status,
      opens_at: data.opensAt ?? null,
      closes_at: data.closesAt ?? null,
      created_by: context.userId,
    };
    if (data.jobId) {
      const { error } = await context.supabase
        .from("employer_jobs")
        .update(row)
        .eq("id", data.jobId);
      if (error) throw new Error(error.message);
      return { id: data.jobId };
    }
    const { data: inserted, error } = await context.supabase
      .from("employer_jobs")
      .insert(row)
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { id: inserted.id };
  });

export const deleteJob = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ jobId: z.string().uuid() }).parse(data))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("employer_jobs").delete().eq("id", data.jobId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ────────────────────────────────────────────────────────────────────
// Shortlists
// ────────────────────────────────────────────────────────────────────

export const SHORTLIST_STATUSES = [
  "shortlisted",
  "contacted",
  "interviewing",
  "offer_extended",
  "hired",
  "rejected",
] as const;

const ShortlistCreateSchema = z.object({
  jobId: z.string().uuid(),
  employerId: z.string().uuid(),
  candidateName: z.string().trim().min(2).max(120),
  candidateEmail: z.string().trim().email().max(160).optional().nullable(),
  candidatePhone: z.string().trim().max(20).optional().nullable(),
  candidateRef: z.string().trim().min(2).max(80).optional().nullable(),
  candidateNotes: z.string().trim().max(2000).optional().nullable(),
});

export const listShortlists = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z
      .object({
        employerId: z.string().uuid(),
        jobId: z.string().uuid().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    let q = context.supabase
      .from("job_shortlists")
      .select(
        "id, job_id, employer_id, candidate_name, candidate_email, candidate_phone, candidate_ref, candidate_notes, status, status_changed_at, hired_at, placement_id, created_at, updated_at",
      )
      .eq("employer_id", data.employerId)
      .order("updated_at", { ascending: false });
    if (data.jobId) q = q.eq("job_id", data.jobId);
    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);
    return { shortlists: rows ?? [] };
  });

export const addShortlistCandidate = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => ShortlistCreateSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { data: inserted, error } = await context.supabase
      .from("job_shortlists")
      .insert({
        job_id: data.jobId,
        employer_id: data.employerId,
        candidate_name: data.candidateName,
        candidate_email: data.candidateEmail ?? null,
        candidate_phone: data.candidatePhone ?? null,
        candidate_ref: data.candidateRef ?? null,
        candidate_notes: data.candidateNotes ?? null,
        created_by: context.userId,
      })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { id: inserted.id };
  });

export const updateShortlistStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z
      .object({
        shortlistId: z.string().uuid(),
        status: z.enum(SHORTLIST_STATUSES),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("job_shortlists")
      .update({ status: data.status })
      .eq("id", data.shortlistId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteShortlist = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ shortlistId: z.string().uuid() }).parse(data))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("job_shortlists")
      .delete()
      .eq("id", data.shortlistId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ────────────────────────────────────────────────────────────────────
// Evidence → Verified Placement Ledger
// ────────────────────────────────────────────────────────────────────

export const EVIDENCE_SOURCES = [
  "signed_offer_letter",
  "employer_hr_email",
  "payslip",
  "joining_letter",
  "linkedin_confirmation",
] as const;

const EvidenceSchema = z.object({
  shortlistId: z.string().uuid(),
  evidenceSource: z.enum(EVIDENCE_SOURCES),
  evidenceRef: z.string().trim().min(2).max(500),
  evidenceNotes: z.string().trim().max(1000).optional().nullable(),
  roleTitle: z.string().trim().min(2).max(120),
  city: z.string().trim().min(2).max(80),
  monthStart: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "YYYY-MM-DD"),
  salaryBandInr: z.string().trim().max(40).optional().nullable(),
  candidateRef: z.string().trim().min(2).max(80).optional().nullable(),
});

export const submitPlacementEvidence = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => EvidenceSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { data: placementId, error } = await context.supabase.rpc(
      "employer_submit_placement_evidence",
      {
        p_shortlist_id: data.shortlistId,
        p_evidence_source: data.evidenceSource,
        p_evidence_ref: data.evidenceRef,
        p_evidence_notes: data.evidenceNotes ?? "",
        p_role_title: data.roleTitle,
        p_city: data.city,
        p_month_start: data.monthStart,
        p_salary_band_inr: data.salaryBandInr ?? "",
        p_candidate_ref: data.candidateRef ?? "",
      },
    );
    if (error) throw new Error(error.message);
    return { placementId: placementId as string };
  });

// ────────────────────────────────────────────────────────────────────
// Candidate Evaluation
// ────────────────────────────────────────────────────────────────────

export const generateDeploymentScore = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ result: z.any() }).parse(data))
  .handler(async ({ data }) => {
    const result = data.result as CareerEngineResult;

    // Fallback if AI hasn't run yet
    const readiness = result.aiAnalysis?.industryReadiness ?? 50;
    const micro = result.microAccuracy ?? 50;

    // Average normalized trait score (traits are -10 to +10, so normalize to 0-100)
    const traits = Object.values(result.traitScores);
    const avgTraitRaw = traits.length ? traits.reduce((a, b) => a + b, 0) / traits.length : 0;
    const traitScore = Math.max(0, Math.min(100, (avgTraitRaw + 10) * 5));

    // Weighted final score
    const deploymentScore = Math.round(readiness * 0.5 + micro * 0.3 + traitScore * 0.2);

    let recommendation = "Needs Upskilling";
    if (deploymentScore >= 80) recommendation = "Highly Recommended";
    else if (deploymentScore >= 60) recommendation = "Recommended";

    return { deploymentScore, recommendation };
  });
