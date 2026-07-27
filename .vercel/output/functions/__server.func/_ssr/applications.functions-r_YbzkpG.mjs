import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { createClient } from "../_libs/supabase__supabase-js.mjs";
import { r as recordServerEvent } from "./analytics.server-CrqWaWZN.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CGVBerDj.mjs";
import { a as requireStaff, d as requireRole } from "./auth-guards.server-Cz9eye0S.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { p as objectType, q as stringType, w as booleanType, x as numberType, v as enumType } from "../_libs/zod.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "crypto";
import "./client.server-DUn3rRvm.mjs";
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
import "../_libs/isbot.mjs";
const SubmitSchema = objectType({
  name: stringType().min(2).max(80),
  email: stringType().email().max(120),
  phone: stringType().min(10).max(20),
  programSlug: stringType().min(1).max(80),
  programName: stringType().max(120).optional(),
  whatsappOptin: booleanType().optional(),
  leadId: stringType().uuid().optional().nullable(),
  utmSource: stringType().max(64).optional(),
  userAgent: stringType().max(256).optional()
});
function admin() {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      persistSession: false
    }
  });
}
const submitApplication_createServerFn_handler = createServerRpc({
  id: "0eb51b4df6b0d88ecdda68f490c97172a3b61b1cca7dcca9590a260f83d004f5",
  name: "submitApplication",
  filename: "src/lib/applications.functions.ts"
}, (opts) => submitApplication.__executeServer(opts));
const submitApplication = createServerFn({
  method: "POST"
}).inputValidator((data) => SubmitSchema.parse(data)).handler(submitApplication_createServerFn_handler, async ({
  data
}) => {
  const sb = admin();
  const {
    data: id,
    error
  } = await sb.rpc("submit_application", {
    p_name: data.name,
    p_email: data.email,
    p_phone: data.phone,
    p_program_slug: data.programSlug,
    p_program_name: data.programName ?? null,
    p_whatsapp_optin: data.whatsappOptin ?? true,
    p_lead_id: data.leadId ?? null,
    p_utm_source: data.utmSource ?? null,
    p_user_agent: data.userAgent ?? null
  });
  if (error) throw new Error(error.message);
  const slaTimeoutAt = new Date(Date.now() + 5 * 60 * 1e3).toISOString();
  await recordServerEvent({
    event_name: "speed_to_lead_sla_started",
    application_id: id,
    program_slug: data.programSlug,
    props: {
      assigned_counsellor: "RoundRobin-AutoAssigned",
      sla_timeout_at: slaTimeoutAt,
      pre_call_whatsapp_queued: true
    }
  }).catch(() => {
  });
  return {
    applicationId: id,
    assignedCounsellor: "RoundRobin-AutoAssigned",
    slaTimeoutAt,
    whatsappNudgeQueued: true
  };
});
const ListSchema = objectType({
  status: stringType().optional(),
  limit: numberType().int().min(1).max(500).optional(),
  page: numberType().int().min(0).max(1e4).optional(),
  pageSize: numberType().int().min(10).max(200).optional()
});
const listApplications_createServerFn_handler = createServerRpc({
  id: "1e9e3b335f696f04224ab187fa3131a6d38970d9a29a8de98e16b829548176a3",
  name: "listApplications",
  filename: "src/lib/applications.functions.ts"
}, (opts) => listApplications.__executeServer(opts));
const listApplications = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((data) => ListSchema.parse(data ?? {})).handler(listApplications_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireStaff(context.userId);
  const sb = admin();
  const pageSize = data.pageSize ?? data.limit ?? 50;
  const page = data.page ?? 0;
  const from = page * pageSize;
  const to = from + pageSize - 1;
  let q = sb.from("applications").select("id, created_at, name, email, phone, program_slug, program_name, status, notes, utm_source", {
    count: "exact"
  }).is("deleted_at", null).order("created_at", {
    ascending: false
  }).range(from, to);
  if (data.status) q = q.eq("status", data.status);
  const {
    data: rows,
    error,
    count
  } = await q;
  if (error) throw new Error(error.message);
  return {
    applications: rows ?? [],
    total: count ?? 0,
    page,
    pageSize
  };
});
const UpdateStatusSchema = objectType({
  id: stringType().uuid(),
  status: enumType(["submitted", "reviewing", "shortlisted", "rejected", "accepted", "enrolled", "withdrawn"]),
  notes: stringType().max(2e3).optional()
});
const updateApplicationStatus_createServerFn_handler = createServerRpc({
  id: "8b2d852cc98c70ec99a61c1119c48424001d661eff4ccaaf5dd0b1ccea5d7f57",
  name: "updateApplicationStatus",
  filename: "src/lib/applications.functions.ts"
}, (opts) => updateApplicationStatus.__executeServer(opts));
const updateApplicationStatus = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => UpdateStatusSchema.parse(data)).handler(updateApplicationStatus_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireRole(context.userId, ["admin", "reviewer"]);
  const sb = admin();
  const patch = {
    status: data.status
  };
  if (data.notes !== void 0) patch.notes = data.notes;
  const {
    data: prev
  } = await sb.from("applications").select("status, program_slug").eq("id", data.id).maybeSingle();
  const {
    error
  } = await sb.from("applications").update(patch).eq("id", data.id);
  if (error) throw new Error(error.message);
  await recordServerEvent({
    event_name: "admin_application_status_changed",
    application_id: data.id,
    program_slug: prev?.program_slug ?? null,
    props: {
      from_status: prev?.status ?? null,
      to_status: data.status
    }
  });
  return {
    ok: true
  };
});
export {
  listApplications_createServerFn_handler,
  submitApplication_createServerFn_handler,
  updateApplicationStatus_createServerFn_handler
};
