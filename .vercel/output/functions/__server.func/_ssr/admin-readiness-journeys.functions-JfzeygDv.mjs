import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CGVBerDj.mjs";
import { supabaseAdmin } from "./client.server-DUn3rRvm.mjs";
import { r as requireAdmin } from "./auth-guards.server-Cz9eye0S.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { p as objectType, x as numberType, v as enumType } from "../_libs/zod.mjs";
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
const STATUSES = ["all", "started", "submitted", "paid"];
const Schema = objectType({
  status: enumType(STATUSES).optional(),
  sinceHours: numberType().int().min(1).max(24 * 365).optional(),
  limit: numberType().int().min(1).max(1e3).optional()
});
const listReadinessJourneys_createServerFn_handler = createServerRpc({
  id: "310eb6582dd0252aa0a33fb0e6e78ca648b60aaf2d8727950924db821b6f862f",
  name: "listReadinessJourneys",
  filename: "src/lib/admin-readiness-journeys.functions.ts"
}, (opts) => listReadinessJourneys.__executeServer(opts));
const listReadinessJourneys = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((data) => Schema.parse(data ?? {})).handler(listReadinessJourneys_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireAdmin(context.userId);
  const since = data.sinceHours ? new Date(Date.now() - data.sinceHours * 36e5).toISOString() : null;
  const limit = data.limit ?? 500;
  const status = data.status ?? "all";
  let q = supabaseAdmin.from("readiness_journey").select("id, session_id, lead_id, started_at, submitted_at, paid_at, archetype, score_band, amount_inr, utm").order("created_at", {
    ascending: false
  }).limit(limit);
  if (since) q = q.gte("created_at", since);
  if (status === "paid") q = q.not("paid_at", "is", null);
  else if (status === "submitted") q = q.not("submitted_at", "is", null).is("paid_at", null);
  else if (status === "started") q = q.not("started_at", "is", null).is("submitted_at", null);
  const {
    data: rows,
    error
  } = await q;
  if (error) throw new Error(error.message);
  const journeys = rows ?? [];
  const leadIds = Array.from(new Set(journeys.map((r) => r.lead_id).filter(Boolean)));
  const leadMap = /* @__PURE__ */ new Map();
  if (leadIds.length > 0) {
    const {
      data: leads,
      error: leadErr
    } = await supabaseAdmin.from("career_engine_leads").select("id, name, email, phone").in("id", leadIds);
    if (leadErr) throw new Error(leadErr.message);
    for (const l of leads ?? []) {
      leadMap.set(l.id, {
        name: l.name,
        email: l.email,
        phone: l.phone
      });
    }
  }
  const out = journeys.map((r) => {
    const lead = r.lead_id ? leadMap.get(r.lead_id) : void 0;
    return {
      id: r.id,
      sessionId: r.session_id,
      leadId: r.lead_id,
      startedAt: r.started_at,
      submittedAt: r.submitted_at,
      paidAt: r.paid_at,
      archetype: r.archetype,
      scoreBand: r.score_band,
      amountInr: r.amount_inr,
      utm: r.utm,
      leadName: lead?.name ?? null,
      leadEmail: lead?.email ?? null,
      leadPhone: lead?.phone ?? null
    };
  });
  return {
    rows: out
  };
});
export {
  listReadinessJourneys_createServerFn_handler
};
