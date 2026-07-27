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
function currentWeekStart() {
  const now = /* @__PURE__ */ new Date();
  const day = now.getUTCDay();
  const diff = (day + 6) % 7;
  const monday = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - diff));
  return monday.toISOString().slice(0, 10);
}
async function pickCurrentModule(supabase, userId) {
  const [catalogRes, progressRes] = await Promise.all([supabase.from("learning_modules").select("id, slug, title, minutes, sort_order").order("sort_order"), supabase.from("student_module_progress").select("module_id, status").eq("user_id", userId)]);
  const doneIds = new Set((progressRes.data ?? []).filter((p) => p.status === "done").map((p) => p.module_id));
  const next = (catalogRes.data ?? []).find((m) => !doneIds.has(m.id));
  return next ?? null;
}
function taskFor(mod) {
  if (!mod) return "Reflect on your career fit report and jot down one strength + one gap.";
  return `Finish "${mod.title}" — about ${mod.minutes} min. Mark it done by Sunday.`;
}
const getWeeklyGoal_createServerFn_handler = createServerRpc({
  id: "582ede857c83c008849d2d2f0e10fd648866b51c77682d5166f9247ccdf36d97",
  name: "getWeeklyGoal",
  filename: "src/lib/weeklyGoal.functions.ts"
}, (opts) => getWeeklyGoal.__executeServer(opts));
const getWeeklyGoal = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(getWeeklyGoal_createServerFn_handler, async ({
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const weekStart = currentWeekStart();
  const {
    data: existing,
    error: readErr
  } = await supabase.from("student_weekly_goals").select("id, task, done, module_id").eq("user_id", userId).eq("week_start", weekStart).maybeSingle();
  if (readErr) throw readErr;
  if (existing) {
    let slug = null;
    if (existing.module_id) {
      const {
        data: mod2
      } = await supabase.from("learning_modules").select("slug").eq("id", existing.module_id).maybeSingle();
      slug = mod2?.slug ?? null;
    }
    return {
      task: existing.task,
      done: existing.done,
      weekStart,
      moduleId: existing.module_id,
      moduleSlug: slug
    };
  }
  const mod = await pickCurrentModule(supabase, userId);
  const task = taskFor(mod);
  const {
    data: inserted,
    error: insertErr
  } = await supabase.from("student_weekly_goals").insert({
    user_id: userId,
    week_start: weekStart,
    module_id: mod?.id ?? null,
    task,
    done: false
  }).select("id, task, done, module_id").single();
  if (insertErr) throw insertErr;
  return {
    task: inserted.task,
    done: inserted.done,
    weekStart,
    moduleId: inserted.module_id,
    moduleSlug: mod?.slug ?? null
  };
});
const toggleWeeklyGoal_createServerFn_handler = createServerRpc({
  id: "111312abf8406356bcf313d16e7ef40e84bbcd8341731c7d2dde466359f519ff",
  name: "toggleWeeklyGoal",
  filename: "src/lib/weeklyGoal.functions.ts"
}, (opts) => toggleWeeklyGoal.__executeServer(opts));
const toggleWeeklyGoal = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => input).handler(toggleWeeklyGoal_createServerFn_handler, async ({
  context,
  data
}) => {
  const {
    supabase,
    userId
  } = context;
  const weekStart = currentWeekStart();
  const {
    error
  } = await supabase.from("student_weekly_goals").update({
    done: data.done,
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  }).eq("user_id", userId).eq("week_start", weekStart);
  if (error) throw error;
  return {
    ok: true
  };
});
export {
  getWeeklyGoal_createServerFn_handler,
  toggleWeeklyGoal_createServerFn_handler
};
