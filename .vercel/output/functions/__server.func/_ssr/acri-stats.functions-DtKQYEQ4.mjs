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
const fetchAcriStats_createServerFn_handler = createServerRpc({
  id: "8a9b736346f6001195f12364f263510771201637f23138cc86f891bd9c33c6f4",
  name: "fetchAcriStats",
  filename: "src/lib/acri-stats.functions.ts"
}, (opts) => fetchAcriStats.__executeServer(opts));
const fetchAcriStats = createServerFn({
  method: "GET"
}).handler(fetchAcriStats_createServerFn_handler, async () => {
  const sb = pub();
  const reliabilityThreshold = 500;
  const [{
    count: sessions
  }, {
    count: leads
  }] = await Promise.all([sb.from("career_engine_sessions").select("id", {
    count: "exact",
    head: true
  }), sb.from("career_engine_leads").select("id", {
    count: "exact",
    head: true
  })]);
  const completedAttempts = sessions ?? 0;
  return {
    completedAttempts,
    leadsCount: leads ?? 0,
    reliabilityReady: completedAttempts >= reliabilityThreshold,
    reliabilityThreshold
  };
});
export {
  fetchAcriStats_createServerFn_handler
};
