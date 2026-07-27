import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { createClient } from "../_libs/supabase__supabase-js.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
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
function pub() {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      persistSession: false
    }
  });
}
const fetchTrustLedger_createServerFn_handler = createServerRpc({
  id: "172fc4f516ba319001ec0584fd92a2203994128744d55c159ccd152a1236c324",
  name: "fetchTrustLedger",
  filename: "src/lib/trust.functions.ts"
}, (opts) => fetchTrustLedger.__executeServer(opts));
const fetchTrustLedger = createServerFn({
  method: "GET"
}).handler(fetchTrustLedger_createServerFn_handler, async () => {
  const sb = pub();
  const {
    data: ledger
  } = await sb.from("trust_ledger").select("id, occurred_on, kind, headline, detail, amount_inr, resolved").order("occurred_on", {
    ascending: false
  }).limit(50);
  const {
    count: refunds
  } = await sb.from("trust_ledger").select("id", {
    count: "exact",
    head: true
  }).eq("kind", "refund");
  const {
    count: complaints
  } = await sb.from("trust_ledger").select("id", {
    count: "exact",
    head: true
  }).eq("kind", "complaint");
  const {
    count: complaintsResolved
  } = await sb.from("trust_ledger").select("id", {
    count: "exact",
    head: true
  }).eq("kind", "complaint").eq("resolved", true);
  const {
    count: placements
  } = await sb.from("trust_ledger").select("id", {
    count: "exact",
    head: true
  }).eq("kind", "placement");
  const {
    count: incidents
  } = await sb.from("trust_ledger").select("id", {
    count: "exact",
    head: true
  }).eq("kind", "incident");
  return {
    entries: ledger ?? [],
    counts: {
      refunds: refunds ?? 0,
      complaints: complaints ?? 0,
      complaintsResolved: complaintsResolved ?? 0,
      placements: placements ?? 0,
      incidents: incidents ?? 0
    }
  };
});
const fetchChangelog_createServerFn_handler = createServerRpc({
  id: "e03fb74b3e71ce18afd7e99ebea442bc606b7f8657a541e0c27a56d3f1249ed8",
  name: "fetchChangelog",
  filename: "src/lib/trust.functions.ts"
}, (opts) => fetchChangelog.__executeServer(opts));
const fetchChangelog = createServerFn({
  method: "GET"
}).handler(fetchChangelog_createServerFn_handler, async () => {
  const sb = pub();
  const {
    data
  } = await sb.from("changelog_entries").select("id, released_on, area, title, body").order("released_on", {
    ascending: false
  }).limit(40);
  return {
    entries: data ?? []
  };
});
const fetchStatus_createServerFn_handler = createServerRpc({
  id: "4b05414530f89986af9d0d7340ed7ef87d5ca38443a879091804c1b3459d605c",
  name: "fetchStatus",
  filename: "src/lib/trust.functions.ts"
}, (opts) => fetchStatus.__executeServer(opts));
const fetchStatus = createServerFn({
  method: "GET"
}).handler(fetchStatus_createServerFn_handler, async () => {
  const sb = pub();
  const {
    data
  } = await sb.from("status_components").select("id, name, state, note, updated_at").order("name", {
    ascending: true
  });
  const components = data ?? [];
  const overall = components.every((c) => c.state === "operational") ? "operational" : components.some((c) => c.state === "down") ? "down" : "degraded";
  return {
    components,
    overall
  };
});
export {
  fetchChangelog_createServerFn_handler,
  fetchStatus_createServerFn_handler,
  fetchTrustLedger_createServerFn_handler
};
