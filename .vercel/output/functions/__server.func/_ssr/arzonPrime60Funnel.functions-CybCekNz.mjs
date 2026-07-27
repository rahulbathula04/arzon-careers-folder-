import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CGVBerDj.mjs";
import { supabaseAdmin } from "./client.server-DUn3rRvm.mjs";
import { a as requireStaff } from "./auth-guards.server-Cz9eye0S.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { p as objectType, x as numberType } from "../_libs/zod.mjs";
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
const Input = objectType({
  fromDays: numberType().int().min(1).max(365).optional()
});
const TIERS = ["essential", "career", "elite"];
function tierFromRow(row) {
  const fromProps = row.props?.tier ?? null;
  const candidate = fromProps ?? row.program_slug ?? null;
  return candidate && TIERS.includes(candidate) ? candidate : null;
}
function uniq(rows, predicate) {
  const seen = /* @__PURE__ */ new Set();
  for (const r of rows) {
    if (!r.anon_id) continue;
    if (predicate(r)) seen.add(r.anon_id);
  }
  return seen.size;
}
const getArzonPrime60Funnel_createServerFn_handler = createServerRpc({
  id: "7b6d8df8a4b7ab63ea55fb1f0178b664cb2a2d84f7e95edf99a8fb9a1c5c6da7",
  name: "getArzonPrime60Funnel",
  filename: "src/lib/arzonPrime60Funnel.functions.ts"
}, (opts) => getArzonPrime60Funnel.__executeServer(opts));
const getArzonPrime60Funnel = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((data) => Input.parse(data ?? {})).handler(getArzonPrime60Funnel_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireStaff(context.userId);
  const since = new Date(Date.now() - (data.fromDays ?? 30) * 864e5).toISOString();
  const {
    data: rows,
    error
  } = await supabaseAdmin.from("analytics_events").select("event_name, anon_id, program_slug, created_at, props").gte("created_at", since).in("event_name", ["arzonprime60_offer_shown", "arzonprime60_offer_cta_clicked", "coupon_applied", "enrol_paid"]).limit(5e4);
  if (error) throw new Error(error.message);
  const events = rows ?? [];
  const isPrime60Apply = (r) => r.event_name === "coupon_applied" && r.props?.code?.toUpperCase() === "ARZONPRIME60";
  const isPrime60Paid = (r) => r.event_name === "enrol_paid" && r.props?.coupon?.toUpperCase() === "ARZONPRIME60";
  const isClicked = (r) => r.event_name === "arzonprime60_offer_cta_clicked";
  const isShown = (r) => r.event_name === "arzonprime60_offer_shown";
  const byTier = TIERS.map((tier) => {
    const clicked = uniq(events, (r) => isClicked(r) && tierFromRow(r) === tier);
    const applied = uniq(events, (r) => isPrime60Apply(r) && tierFromRow(r) === tier);
    const paid = uniq(events, (r) => isPrime60Paid(r) && tierFromRow(r) === tier);
    const clickToPayPct = clicked ? Math.round(paid / clicked * 1e3) / 10 : 0;
    return {
      tier,
      clicked,
      applied,
      paid,
      clickToPayPct
    };
  });
  const totalShown = uniq(events, isShown);
  const totalClicked = uniq(events, isClicked);
  const totalApplied = uniq(events, isPrime60Apply);
  const totalPaid = uniq(events, isPrime60Paid);
  const totals = {
    shown: totalShown,
    clicked: totalClicked,
    applied: totalApplied,
    paid: totalPaid,
    shownToPaidPct: totalShown ? Math.round(totalPaid / totalShown * 1e3) / 10 : 0,
    clickToPayPct: totalClicked ? Math.round(totalPaid / totalClicked * 1e3) / 10 : 0,
    applyToPayPct: totalApplied ? Math.round(totalPaid / totalApplied * 1e3) / 10 : 0
  };
  const surfaceMap = /* @__PURE__ */ new Map();
  for (const r of events) {
    if (!isClicked(r) || !r.anon_id) continue;
    const surface = r.props?.surface ?? "unknown";
    let set = surfaceMap.get(surface);
    if (!set) {
      set = /* @__PURE__ */ new Set();
      surfaceMap.set(surface, set);
    }
    set.add(r.anon_id);
  }
  const bySurface = Array.from(surfaceMap.entries()).map(([surface, set]) => ({
    surface,
    clicked: set.size
  })).sort((a, b) => b.clicked - a.clicked);
  return {
    since,
    totalEvents: events.length,
    totals,
    byTier,
    bySurface
  };
});
export {
  getArzonPrime60Funnel_createServerFn_handler
};
