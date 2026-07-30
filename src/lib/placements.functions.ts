import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createSafeAdminClient } from "@/lib/supabaseEnv";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { requireAdmin } from "@/server/auth-guards.server";

function admin() {
  return createSafeAdminClient();
}

// ---------------- Public: list verified placements for /placements ----------------

export type PublicPlacement = {
  id: string;
  employer_name: string;
  employer_slug: string;
  employer_logo_url: string | null;
  candidate_ref: string;
  role_title: string;
  city: string;
  month_start: string; // YYYY-MM-DD
  salary_band_inr: string | null;
  evidence_source: string;
  verified_at: string;
};

const ListPublicSchema = z.object({
  limit: z.number().int().min(1).max(500).optional(),
});

export const listPublicPlacements = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => ListPublicSchema.parse(data ?? {}))
  .handler(async ({ data }) => {
    try {
      const sb = createSafeAdminClient();
      const { data: rows, error } = await sb.rpc("list_verified_placements", {
        _limit: data.limit ?? 200,
      });
      if (error) {
        console.error("[listPublicPlacements] Error, returning fallback:", error);
        return { placements: [] };
      }
      return { placements: (rows ?? []) as PublicPlacement[] };
    } catch (err) {
      console.error("[listPublicPlacements] Exception, returning fallback:", err);
      return { placements: [] };
    }
  });

// ---------------- Admin: employer CRUD ----------------

const EmployerCreateSchema = z.object({
  slug: z
    .string()
    .min(2)
    .max(80)
    .regex(/^[a-z0-9-]+$/, "lowercase letters, digits, and dashes only"),
  name: z.string().min(2).max(160),
  website: z.string().url().max(300).optional().nullable(),
  logoUrl: z.string().url().max(500).optional().nullable(),
  contactEmail: z.string().email().max(160).optional().nullable(),
  verifiedAt: z.string().datetime().optional().nullable(),
  notes: z.string().max(1000).optional().nullable(),
});

export const listEmployers = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requireAdmin(context.userId);
    const sb = admin();
    const { data, error } = await sb
      .from("employers")
      .select("id, slug, name, website, logo_url, contact_email, verified_at, created_at")
      .order("name", { ascending: true });
    if (error) throw new Error(error.message);
    return { employers: data ?? [] };
  });

export const createEmployer = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => EmployerCreateSchema.parse(data))
  .handler(async ({ data, context }) => {
    await requireAdmin(context.userId);
    const sb = admin();
    const { data: row, error } = await sb
      .from("employers")
      .insert({
        slug: data.slug,
        name: data.name,
        website: data.website ?? null,
        logo_url: data.logoUrl ?? null,
        contact_email: data.contactEmail ?? null,
        verified_at: data.verifiedAt ?? null,
        notes: data.notes ?? null,
      })
      .select("id, slug, name")
      .single();
    if (error) throw new Error(error.message);
    return { employer: row };
  });

// ---------------- Admin: placement (verification) CRUD ----------------

const EVIDENCE_ENUM = [
  "signed_offer_letter",
  "employer_hr_email",
  "payslip",
  "joining_letter",
  "linkedin_confirmation",
] as const;

const PlacementCreateSchema = z.object({
  employerId: z.string().uuid(),
  candidateRef: z
    .string()
    .min(2)
    .max(80)
    .describe("Anonymised reference - e.g. 'A.K. · Hyderabad' - never full name without consent"),
  candidateUserId: z.string().uuid().optional().nullable(),
  roleTitle: z.string().min(2).max(120),
  city: z.string().min(2).max(80),
  monthStart: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "YYYY-MM-DD (use the 1st of the joining month)"),
  salaryBandInr: z.string().max(60).optional().nullable(),
  evidenceSource: z.enum(EVIDENCE_ENUM),
  evidenceRef: z
    .string()
    .min(2)
    .max(500)
    .describe("Internal pointer: storage path, HR contact, or LinkedIn URL"),
  evidenceNotes: z.string().max(1000).optional().nullable(),
  published: z.boolean().optional(),
});

export const listPlacementsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requireAdmin(context.userId);
    const sb = admin();
    const { data, error } = await sb
      .from("placements")
      .select(
        "id, employer_id, candidate_ref, role_title, city, month_start, salary_band_inr, evidence_source, evidence_ref, evidence_notes, verified_at, verified_by, published, retracted_at, retracted_reason, employers ( name, slug )",
      )
      .order("verified_at", { ascending: false })
      .limit(500);
    if (error) throw new Error(error.message);
    return { placements: data ?? [] };
  });

export const createPlacement = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => PlacementCreateSchema.parse(data))
  .handler(async ({ data, context }) => {
    await requireAdmin(context.userId);
    const sb = admin();
    const { data: row, error } = await sb
      .from("placements")
      .insert({
        employer_id: data.employerId,
        candidate_ref: data.candidateRef,
        candidate_user_id: data.candidateUserId ?? null,
        role_title: data.roleTitle,
        city: data.city,
        month_start: data.monthStart,
        salary_band_inr: data.salaryBandInr ?? null,
        evidence_source: data.evidenceSource,
        evidence_ref: data.evidenceRef,
        evidence_notes: data.evidenceNotes ?? null,
        published: data.published ?? true,
        verified_by: context.userId,
      })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { placementId: row.id as string };
  });

const RetractSchema = z.object({
  id: z.string().uuid(),
  reason: z.string().min(2).max(240),
});

export const retractPlacement = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => RetractSchema.parse(data))
  .handler(async ({ data, context }) => {
    await requireAdmin(context.userId);
    const sb = admin();
    const { error } = await sb
      .from("placements")
      .update({
        retracted_at: new Date().toISOString(),
        retracted_reason: data.reason,
        published: false,
      })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ---------------- Public: count for the funnel trust strip ----------------

export const countVerifiedPlacements = createServerFn({ method: "GET" }).handler(async () => {
  const sb = admin();
  const { data, error } = await sb.rpc("list_verified_placements", {
    _limit: 500,
  });
  if (error) throw new Error(error.message);
  return { count: (data ?? []).length };
});
