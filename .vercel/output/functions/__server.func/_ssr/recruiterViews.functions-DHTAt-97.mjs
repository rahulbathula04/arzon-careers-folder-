import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CGVBerDj.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
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
const RECRUITER_ACTIONS = ["Complete one more learning module to raise your industry readiness score.", "Publish an ASSAY artefact — recruiters filter by verified work samples.", "Add your cohort tag and target city so recruiters can shortlist you.", "Boost your Deployment Score by addressing the skill gaps identified by our AI."];
const getRecruiterViews_createServerFn_handler = createServerRpc({
  id: "8c863bc08a58f4ab37d4b2afefd49bf54fcdd4cc15b588829bdfd89bcef6fe8b",
  name: "getRecruiterViews",
  filename: "src/lib/recruiterViews.functions.ts"
}, (opts) => getRecruiterViews.__executeServer(opts));
const getRecruiterViews = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(getRecruiterViews_createServerFn_handler, async ({
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const now = Date.now();
  const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1e3).toISOString();
  const twoWeeksAgo = new Date(now - 14 * 24 * 60 * 60 * 1e3).toISOString();
  const [totalRes, weekRes, prevRes] = await Promise.all([supabase.from("recruiter_profile_views").select("id", {
    count: "exact",
    head: true
  }).eq("user_id", userId), supabase.from("recruiter_profile_views").select("id", {
    count: "exact",
    head: true
  }).eq("user_id", userId).gte("viewed_at", weekAgo), supabase.from("recruiter_profile_views").select("id", {
    count: "exact",
    head: true
  }).eq("user_id", userId).gte("viewed_at", twoWeeksAgo).lt("viewed_at", weekAgo)]);
  if (totalRes.error) throw totalRes.error;
  if (weekRes.error) throw weekRes.error;
  if (prevRes.error) throw prevRes.error;
  const week = weekRes.count ?? 0;
  const prev = prevRes.count ?? 0;
  return {
    week,
    total: totalRes.count ?? 0,
    trendVsLastWeek: week - prev,
    actions: RECRUITER_ACTIONS
  };
});
export {
  getRecruiterViews_createServerFn_handler
};
