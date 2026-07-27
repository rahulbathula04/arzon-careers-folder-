import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CGVBerDj.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { p as objectType, q as stringType, v as enumType, C as arrayType, x as numberType, B as anyType } from "../_libs/zod.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./createMiddleware-BvN2ghIY.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
const listMyEmployers_createServerFn_handler = createServerRpc({
  id: "b375f4c10e448daeb2bcf2f96fe4316ff2ecd0de2f01c539d915193aae5bf092",
  name: "listMyEmployers",
  filename: "src/lib/employer.functions.ts"
}, (opts) => listMyEmployers.__executeServer(opts));
const listMyEmployers = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(listMyEmployers_createServerFn_handler, async ({
  context
}) => {
  const {
    data,
    error
  } = await context.supabase.rpc("list_my_employers");
  if (error) throw new Error(error.message);
  return {
    employers: data ?? []
  };
});
const PROGRAM_SLUGS = ["pharmacovigilance", "medical-coding", "clinical-data-management", "sas-clinical", "regulatory-affairs", "medical-writing"];
const EMPLOYMENT_TYPES = ["full_time", "contract", "internship"];
const JOB_STATUSES = ["draft", "open", "closed", "filled"];
const JobUpsertSchema = objectType({
  employerId: stringType().uuid(),
  jobId: stringType().uuid().optional(),
  programSlug: enumType(PROGRAM_SLUGS),
  title: stringType().trim().min(3).max(160),
  location: stringType().trim().min(2).max(120),
  employmentType: enumType(EMPLOYMENT_TYPES),
  experienceMinYrs: numberType().min(0).max(40),
  experienceMaxYrs: numberType().min(0).max(40).optional().nullable(),
  salaryMinInr: numberType().int().min(0).max(1e8).optional().nullable(),
  salaryMaxInr: numberType().int().min(0).max(1e8).optional().nullable(),
  description: stringType().trim().min(20).max(8e3),
  skills: arrayType(stringType().trim().min(1).max(40)).max(30),
  status: enumType(JOB_STATUSES),
  opensAt: stringType().datetime().optional().nullable(),
  closesAt: stringType().datetime().optional().nullable()
}).refine((v) => v.experienceMaxYrs == null || v.experienceMaxYrs >= v.experienceMinYrs, {
  message: "experienceMaxYrs must be ≥ experienceMinYrs",
  path: ["experienceMaxYrs"]
}).refine((v) => v.salaryMaxInr == null || v.salaryMinInr == null || v.salaryMaxInr >= v.salaryMinInr, {
  message: "salaryMaxInr must be ≥ salaryMinInr",
  path: ["salaryMaxInr"]
}).refine((v) => !v.closesAt || !v.opensAt || new Date(v.closesAt) >= new Date(v.opensAt), {
  message: "closesAt must be on/after opensAt",
  path: ["closesAt"]
});
const listJobs_createServerFn_handler = createServerRpc({
  id: "3c525d458ec832a49340ffabd8e3f116caa2c6b24301ba25e7b66030c3aca1d0",
  name: "listJobs",
  filename: "src/lib/employer.functions.ts"
}, (opts) => listJobs.__executeServer(opts));
const listJobs = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
  employerId: stringType().uuid()
}).parse(data)).handler(listJobs_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    data: rows,
    error
  } = await context.supabase.from("employer_jobs").select("id, program_slug, title, location, employment_type, experience_min_yrs, experience_max_yrs, salary_min_inr, salary_max_inr, description, skills, status, opens_at, closes_at, created_at, updated_at").eq("employer_id", data.employerId).order("updated_at", {
    ascending: false
  });
  if (error) throw new Error(error.message);
  return {
    jobs: rows ?? []
  };
});
const upsertJob_createServerFn_handler = createServerRpc({
  id: "7a52631de71902a99b0a6e80b1b92677582fa4da7fac20f1ec01a7aa14015bfe",
  name: "upsertJob",
  filename: "src/lib/employer.functions.ts"
}, (opts) => upsertJob.__executeServer(opts));
const upsertJob = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => JobUpsertSchema.parse(data)).handler(upsertJob_createServerFn_handler, async ({
  data,
  context
}) => {
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
    created_by: context.userId
  };
  if (data.jobId) {
    const {
      error: error2
    } = await context.supabase.from("employer_jobs").update(row).eq("id", data.jobId);
    if (error2) throw new Error(error2.message);
    return {
      id: data.jobId
    };
  }
  const {
    data: inserted,
    error
  } = await context.supabase.from("employer_jobs").insert(row).select("id").single();
  if (error) throw new Error(error.message);
  return {
    id: inserted.id
  };
});
const deleteJob_createServerFn_handler = createServerRpc({
  id: "8428dc224331a1a1c34baaaf07fcea15715d7cce39b3fa12967e74c5e963bc1a",
  name: "deleteJob",
  filename: "src/lib/employer.functions.ts"
}, (opts) => deleteJob.__executeServer(opts));
const deleteJob = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
  jobId: stringType().uuid()
}).parse(data)).handler(deleteJob_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    error
  } = await context.supabase.from("employer_jobs").delete().eq("id", data.jobId);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const SHORTLIST_STATUSES = ["shortlisted", "contacted", "interviewing", "offer_extended", "hired", "rejected"];
const ShortlistCreateSchema = objectType({
  jobId: stringType().uuid(),
  employerId: stringType().uuid(),
  candidateName: stringType().trim().min(2).max(120),
  candidateEmail: stringType().trim().email().max(160).optional().nullable(),
  candidatePhone: stringType().trim().max(20).optional().nullable(),
  candidateRef: stringType().trim().min(2).max(80).optional().nullable(),
  candidateNotes: stringType().trim().max(2e3).optional().nullable()
});
const listShortlists_createServerFn_handler = createServerRpc({
  id: "fb90442753ee56e849c80e32741e9fbcdb44be85a94f09956e14a33189485677",
  name: "listShortlists",
  filename: "src/lib/employer.functions.ts"
}, (opts) => listShortlists.__executeServer(opts));
const listShortlists = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
  employerId: stringType().uuid(),
  jobId: stringType().uuid().optional()
}).parse(data)).handler(listShortlists_createServerFn_handler, async ({
  data,
  context
}) => {
  let q = context.supabase.from("job_shortlists").select("id, job_id, employer_id, candidate_name, candidate_email, candidate_phone, candidate_ref, candidate_notes, status, status_changed_at, hired_at, placement_id, created_at, updated_at").eq("employer_id", data.employerId).order("updated_at", {
    ascending: false
  });
  if (data.jobId) q = q.eq("job_id", data.jobId);
  const {
    data: rows,
    error
  } = await q;
  if (error) throw new Error(error.message);
  return {
    shortlists: rows ?? []
  };
});
const addShortlistCandidate_createServerFn_handler = createServerRpc({
  id: "6d31a8eaaef886e9fa4eed27692c5b176bf934667f5d16dac4e4ead7fa5fe71e",
  name: "addShortlistCandidate",
  filename: "src/lib/employer.functions.ts"
}, (opts) => addShortlistCandidate.__executeServer(opts));
const addShortlistCandidate = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => ShortlistCreateSchema.parse(data)).handler(addShortlistCandidate_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    data: inserted,
    error
  } = await context.supabase.from("job_shortlists").insert({
    job_id: data.jobId,
    employer_id: data.employerId,
    candidate_name: data.candidateName,
    candidate_email: data.candidateEmail ?? null,
    candidate_phone: data.candidatePhone ?? null,
    candidate_ref: data.candidateRef ?? null,
    candidate_notes: data.candidateNotes ?? null,
    created_by: context.userId
  }).select("id").single();
  if (error) throw new Error(error.message);
  return {
    id: inserted.id
  };
});
const updateShortlistStatus_createServerFn_handler = createServerRpc({
  id: "5a08161ec05bd974184db88166754b91bfa2cdee8a1acaec3b037b32e87c39f3",
  name: "updateShortlistStatus",
  filename: "src/lib/employer.functions.ts"
}, (opts) => updateShortlistStatus.__executeServer(opts));
const updateShortlistStatus = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
  shortlistId: stringType().uuid(),
  status: enumType(SHORTLIST_STATUSES)
}).parse(data)).handler(updateShortlistStatus_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    error
  } = await context.supabase.from("job_shortlists").update({
    status: data.status
  }).eq("id", data.shortlistId);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const deleteShortlist_createServerFn_handler = createServerRpc({
  id: "e2df24b068993a439c7953ac53aaf5715cd44798f87a0febeacb9cea053e5fae",
  name: "deleteShortlist",
  filename: "src/lib/employer.functions.ts"
}, (opts) => deleteShortlist.__executeServer(opts));
const deleteShortlist = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
  shortlistId: stringType().uuid()
}).parse(data)).handler(deleteShortlist_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    error
  } = await context.supabase.from("job_shortlists").delete().eq("id", data.shortlistId);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const EVIDENCE_SOURCES = ["signed_offer_letter", "employer_hr_email", "payslip", "joining_letter", "linkedin_confirmation"];
const EvidenceSchema = objectType({
  shortlistId: stringType().uuid(),
  evidenceSource: enumType(EVIDENCE_SOURCES),
  evidenceRef: stringType().trim().min(2).max(500),
  evidenceNotes: stringType().trim().max(1e3).optional().nullable(),
  roleTitle: stringType().trim().min(2).max(120),
  city: stringType().trim().min(2).max(80),
  monthStart: stringType().regex(/^\d{4}-\d{2}-\d{2}$/, "YYYY-MM-DD"),
  salaryBandInr: stringType().trim().max(40).optional().nullable(),
  candidateRef: stringType().trim().min(2).max(80).optional().nullable()
});
const submitPlacementEvidence_createServerFn_handler = createServerRpc({
  id: "b2c5833dab3dd034385d8731e02e43f1ca7b43a9007a9c19a51b2592f5d12d43",
  name: "submitPlacementEvidence",
  filename: "src/lib/employer.functions.ts"
}, (opts) => submitPlacementEvidence.__executeServer(opts));
const submitPlacementEvidence = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => EvidenceSchema.parse(data)).handler(submitPlacementEvidence_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    data: placementId,
    error
  } = await context.supabase.rpc("employer_submit_placement_evidence", {
    p_shortlist_id: data.shortlistId,
    p_evidence_source: data.evidenceSource,
    p_evidence_ref: data.evidenceRef,
    p_evidence_notes: data.evidenceNotes ?? "",
    p_role_title: data.roleTitle,
    p_city: data.city,
    p_month_start: data.monthStart,
    p_salary_band_inr: data.salaryBandInr ?? "",
    p_candidate_ref: data.candidateRef ?? ""
  });
  if (error) throw new Error(error.message);
  return {
    placementId
  };
});
const generateDeploymentScore_createServerFn_handler = createServerRpc({
  id: "39683eb0fa04b612cf2df6f236d37711975cffa70843e91bb04e72d7ecf58a59",
  name: "generateDeploymentScore",
  filename: "src/lib/employer.functions.ts"
}, (opts) => generateDeploymentScore.__executeServer(opts));
const generateDeploymentScore = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
  result: anyType()
}).parse(data)).handler(generateDeploymentScore_createServerFn_handler, async ({
  data
}) => {
  const result = data.result;
  const readiness = result.aiAnalysis?.industryReadiness ?? 50;
  const micro = result.microAccuracy ?? 50;
  const traits = Object.values(result.traitScores);
  const avgTraitRaw = traits.length ? traits.reduce((a, b) => a + b, 0) / traits.length : 0;
  const traitScore = Math.max(0, Math.min(100, (avgTraitRaw + 10) * 5));
  const deploymentScore = Math.round(readiness * 0.5 + micro * 0.3 + traitScore * 0.2);
  let recommendation = "Needs Upskilling";
  if (deploymentScore >= 80) recommendation = "Highly Recommended";
  else if (deploymentScore >= 60) recommendation = "Recommended";
  return {
    deploymentScore,
    recommendation
  };
});
export {
  addShortlistCandidate_createServerFn_handler,
  deleteJob_createServerFn_handler,
  deleteShortlist_createServerFn_handler,
  generateDeploymentScore_createServerFn_handler,
  listJobs_createServerFn_handler,
  listMyEmployers_createServerFn_handler,
  listShortlists_createServerFn_handler,
  submitPlacementEvidence_createServerFn_handler,
  updateShortlistStatus_createServerFn_handler,
  upsertJob_createServerFn_handler
};
