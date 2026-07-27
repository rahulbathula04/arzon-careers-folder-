import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { createClient } from "../_libs/supabase__supabase-js.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CGVBerDj.mjs";
import { r as requireAdmin } from "./auth-guards.server-Cz9eye0S.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { p as objectType, x as numberType, q as stringType, w as booleanType, v as enumType } from "../_libs/zod.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./createMiddleware-BvN2ghIY.mjs";
import "./client.server-DUn3rRvm.mjs";
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
function admin() {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      persistSession: false
    }
  });
}
const ListPublicSchema = objectType({
  limit: numberType().int().min(1).max(500).optional()
});
const listPublicPlacements_createServerFn_handler = createServerRpc({
  id: "30c88add11a75e94e58b1520c8b674a1b0b69101b23d56c9f49a975e3e87dd35",
  name: "listPublicPlacements",
  filename: "src/lib/placements.functions.ts"
}, (opts) => listPublicPlacements.__executeServer(opts));
const listPublicPlacements = createServerFn({
  method: "GET"
}).inputValidator((data) => ListPublicSchema.parse(data ?? {})).handler(listPublicPlacements_createServerFn_handler, async ({
  data
}) => {
  const sb = admin();
  const {
    data: rows,
    error
  } = await sb.rpc("list_verified_placements", {
    _limit: data.limit ?? 200
  });
  if (error) throw new Error(error.message);
  return {
    placements: rows ?? []
  };
});
const EmployerCreateSchema = objectType({
  slug: stringType().min(2).max(80).regex(/^[a-z0-9-]+$/, "lowercase letters, digits, and dashes only"),
  name: stringType().min(2).max(160),
  website: stringType().url().max(300).optional().nullable(),
  logoUrl: stringType().url().max(500).optional().nullable(),
  contactEmail: stringType().email().max(160).optional().nullable(),
  verifiedAt: stringType().datetime().optional().nullable(),
  notes: stringType().max(1e3).optional().nullable()
});
const listEmployers_createServerFn_handler = createServerRpc({
  id: "9775d5ed55ea5d4eb77f81f410523ea1930370be29b2e371cd5ffb88d2859247",
  name: "listEmployers",
  filename: "src/lib/placements.functions.ts"
}, (opts) => listEmployers.__executeServer(opts));
const listEmployers = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(listEmployers_createServerFn_handler, async ({
  context
}) => {
  await requireAdmin(context.userId);
  const sb = admin();
  const {
    data,
    error
  } = await sb.from("employers").select("id, slug, name, website, logo_url, contact_email, verified_at, created_at").order("name", {
    ascending: true
  });
  if (error) throw new Error(error.message);
  return {
    employers: data ?? []
  };
});
const createEmployer_createServerFn_handler = createServerRpc({
  id: "59110b2f7b25b992c7b62817a001defd5e9f475f4ab0e94317fad903e829dd12",
  name: "createEmployer",
  filename: "src/lib/placements.functions.ts"
}, (opts) => createEmployer.__executeServer(opts));
const createEmployer = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => EmployerCreateSchema.parse(data)).handler(createEmployer_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireAdmin(context.userId);
  const sb = admin();
  const {
    data: row,
    error
  } = await sb.from("employers").insert({
    slug: data.slug,
    name: data.name,
    website: data.website ?? null,
    logo_url: data.logoUrl ?? null,
    contact_email: data.contactEmail ?? null,
    verified_at: data.verifiedAt ?? null,
    notes: data.notes ?? null
  }).select("id, slug, name").single();
  if (error) throw new Error(error.message);
  return {
    employer: row
  };
});
const EVIDENCE_ENUM = ["signed_offer_letter", "employer_hr_email", "payslip", "joining_letter", "linkedin_confirmation"];
const PlacementCreateSchema = objectType({
  employerId: stringType().uuid(),
  candidateRef: stringType().min(2).max(80).describe("Anonymised reference — e.g. 'A.K. · Hyderabad' — never full name without consent"),
  candidateUserId: stringType().uuid().optional().nullable(),
  roleTitle: stringType().min(2).max(120),
  city: stringType().min(2).max(80),
  monthStart: stringType().regex(/^\d{4}-\d{2}-\d{2}$/, "YYYY-MM-DD (use the 1st of the joining month)"),
  salaryBandInr: stringType().max(60).optional().nullable(),
  evidenceSource: enumType(EVIDENCE_ENUM),
  evidenceRef: stringType().min(2).max(500).describe("Internal pointer: storage path, HR contact, or LinkedIn URL"),
  evidenceNotes: stringType().max(1e3).optional().nullable(),
  published: booleanType().optional()
});
const listPlacementsAdmin_createServerFn_handler = createServerRpc({
  id: "dd89b9fafa1cd83683764eb374ab0d4fbcafe56da38ba5f3c71cd5ecee7c4a83",
  name: "listPlacementsAdmin",
  filename: "src/lib/placements.functions.ts"
}, (opts) => listPlacementsAdmin.__executeServer(opts));
const listPlacementsAdmin = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(listPlacementsAdmin_createServerFn_handler, async ({
  context
}) => {
  await requireAdmin(context.userId);
  const sb = admin();
  const {
    data,
    error
  } = await sb.from("placements").select("id, employer_id, candidate_ref, role_title, city, month_start, salary_band_inr, evidence_source, evidence_ref, evidence_notes, verified_at, verified_by, published, retracted_at, retracted_reason, employers ( name, slug )").order("verified_at", {
    ascending: false
  }).limit(500);
  if (error) throw new Error(error.message);
  return {
    placements: data ?? []
  };
});
const createPlacement_createServerFn_handler = createServerRpc({
  id: "1bdc2d8afcc84a18c7e3a9b99636a92d5654d7a5a5aac9fcea37d774940ce09e",
  name: "createPlacement",
  filename: "src/lib/placements.functions.ts"
}, (opts) => createPlacement.__executeServer(opts));
const createPlacement = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => PlacementCreateSchema.parse(data)).handler(createPlacement_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireAdmin(context.userId);
  const sb = admin();
  const {
    data: row,
    error
  } = await sb.from("placements").insert({
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
    verified_by: context.userId
  }).select("id").single();
  if (error) throw new Error(error.message);
  return {
    placementId: row.id
  };
});
const RetractSchema = objectType({
  id: stringType().uuid(),
  reason: stringType().min(2).max(240)
});
const retractPlacement_createServerFn_handler = createServerRpc({
  id: "1c39e028aa1a38859385b9db8083d3988dcc5e37c0f10612eb72e3301a5a6154",
  name: "retractPlacement",
  filename: "src/lib/placements.functions.ts"
}, (opts) => retractPlacement.__executeServer(opts));
const retractPlacement = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => RetractSchema.parse(data)).handler(retractPlacement_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireAdmin(context.userId);
  const sb = admin();
  const {
    error
  } = await sb.from("placements").update({
    retracted_at: (/* @__PURE__ */ new Date()).toISOString(),
    retracted_reason: data.reason,
    published: false
  }).eq("id", data.id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const countVerifiedPlacements_createServerFn_handler = createServerRpc({
  id: "e42a9df2f67fc10008c13c4777b1d08cf435f8e4955e8ea60a383a9bb684b13b",
  name: "countVerifiedPlacements",
  filename: "src/lib/placements.functions.ts"
}, (opts) => countVerifiedPlacements.__executeServer(opts));
const countVerifiedPlacements = createServerFn({
  method: "GET"
}).handler(countVerifiedPlacements_createServerFn_handler, async () => {
  const sb = admin();
  const {
    data,
    error
  } = await sb.rpc("list_verified_placements", {
    _limit: 500
  });
  if (error) throw new Error(error.message);
  return {
    count: (data ?? []).length
  };
});
export {
  countVerifiedPlacements_createServerFn_handler,
  createEmployer_createServerFn_handler,
  createPlacement_createServerFn_handler,
  listEmployers_createServerFn_handler,
  listPlacementsAdmin_createServerFn_handler,
  listPublicPlacements_createServerFn_handler,
  retractPlacement_createServerFn_handler
};
