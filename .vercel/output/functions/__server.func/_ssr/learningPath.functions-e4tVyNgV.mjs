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
const CURRENT_SCORE = 62;
const TARGET_SCORE = 85;
function computeProjected(mods) {
  return CURRENT_SCORE + mods.reduce((s, m) => m.status === "done" ? s : s + m.lift, 0);
}
function assemble(catalog, progress) {
  const byId = new Map(progress.map((p) => [p.module_id, p.status]));
  const sorted = [...catalog].sort((a, b) => a.sort_order - b.sort_order);
  const firstNonDoneIdx = sorted.findIndex((m) => byId.get(m.id) !== "done");
  return sorted.map((m, idx) => {
    const raw = byId.get(m.id);
    let status = "locked";
    if (raw === "done") status = "done";
    else if (idx === firstNonDoneIdx) status = "current";
    return {
      id: m.id,
      slug: m.slug,
      title: m.title,
      pillar: m.pillar,
      minutes: m.minutes,
      lift: m.lift,
      gaps: m.gaps ?? [],
      deepLink: m.deep_link,
      status
    };
  });
}
const getLearningPath_createServerFn_handler = createServerRpc({
  id: "c99ea6e8611b45782eec25d8ec7d5e250ff3fd7e35fd2c9ea00f9469d435ae18",
  name: "getLearningPath",
  filename: "src/lib/learningPath.functions.ts"
}, (opts) => getLearningPath.__executeServer(opts));
const getLearningPath = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(getLearningPath_createServerFn_handler, async ({
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const [catalogRes, progressRes] = await Promise.all([supabase.from("learning_modules").select("*").order("sort_order"), supabase.from("student_module_progress").select("module_id, status").eq("user_id", userId)]);
  if (catalogRes.error) throw catalogRes.error;
  if (progressRes.error) throw progressRes.error;
  const modules = assemble(catalogRes.data ?? [], progressRes.data ?? []);
  return {
    modules,
    currentScore: CURRENT_SCORE,
    targetScore: TARGET_SCORE,
    projected: computeProjected(modules)
  };
});
const markModuleComplete_createServerFn_handler = createServerRpc({
  id: "6d696ecf09952c0cc44f4f2519941e826b689387a46fc01606455271f54c00dd",
  name: "markModuleComplete",
  filename: "src/lib/learningPath.functions.ts"
}, (opts) => markModuleComplete.__executeServer(opts));
const markModuleComplete = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => input).handler(markModuleComplete_createServerFn_handler, async ({
  context,
  data
}) => {
  const {
    supabase,
    userId
  } = context;
  const {
    error
  } = await supabase.from("student_module_progress").upsert({
    user_id: userId,
    module_id: data.moduleId,
    status: "done",
    completed_at: (/* @__PURE__ */ new Date()).toISOString(),
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  }, {
    onConflict: "user_id,module_id"
  });
  if (error) throw error;
  const [catalogRes, progressRes] = await Promise.all([supabase.from("learning_modules").select("*").order("sort_order"), supabase.from("student_module_progress").select("module_id, status").eq("user_id", userId)]);
  if (catalogRes.error) throw catalogRes.error;
  if (progressRes.error) throw progressRes.error;
  const modules = assemble(catalogRes.data ?? [], progressRes.data ?? []);
  return {
    modules,
    currentScore: CURRENT_SCORE,
    targetScore: TARGET_SCORE,
    projected: computeProjected(modules)
  };
});
export {
  getLearningPath_createServerFn_handler,
  markModuleComplete_createServerFn_handler
};
