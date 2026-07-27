import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CGVBerDj.mjs";
import { a as requireStaff, r as requireAdmin } from "./auth-guards.server-Cz9eye0S.mjs";
import { supabaseAdmin } from "./client.server-DUn3rRvm.mjs";
import { s as scanLandingCopy } from "./landingCopyScan.functions-tRBixUn9.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { p as objectType, v as enumType, q as stringType } from "../_libs/zod.mjs";
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
import "./createSsrRpc-BV3sOdh8.mjs";
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
const listLandingCopyChanges_createServerFn_handler = createServerRpc({
  id: "249a1cacb0cc84e36857b2631a3e02223edcc6ebb7b87d43013ebb64a3b61717",
  name: "listLandingCopyChanges",
  filename: "src/lib/landingCopyChangelog.functions.ts"
}, (opts) => listLandingCopyChanges.__executeServer(opts));
const listLandingCopyChanges = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(listLandingCopyChanges_createServerFn_handler, async ({
  context
}) => {
  await requireStaff(context.userId);
  const {
    data,
    error
  } = await supabaseAdmin.from("landing_copy_changes").select("id, changed_at, actor_email, file_path, section, before_text, after_text, reason, source").order("changed_at", {
    ascending: false
  }).limit(500);
  if (error) throw new Error(error.message);
  return {
    rows: data ?? []
  };
});
const RecordSchema = objectType({
  filePath: stringType().min(1).max(240),
  section: stringType().max(120).optional().nullable(),
  before: stringType().max(4e3),
  after: stringType().max(4e3),
  reason: stringType().max(500).optional().nullable(),
  source: enumType(["agent", "admin", "migration", "scanner"]).default("admin")
});
const recordLandingCopyChange_createServerFn_handler = createServerRpc({
  id: "b7eeaafc6347c002586e4b6b933e80dba90fcfa7f7c6bf6b4061aebf9ddfdb89",
  name: "recordLandingCopyChange",
  filename: "src/lib/landingCopyChangelog.functions.ts"
}, (opts) => recordLandingCopyChange.__executeServer(opts));
const recordLandingCopyChange = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => RecordSchema.parse(data)).handler(recordLandingCopyChange_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireAdmin(context.userId);
  const {
    data: userRow
  } = await supabaseAdmin.auth.admin.getUserById(context.userId);
  const {
    error
  } = await supabaseAdmin.from("landing_copy_changes").insert({
    actor_id: context.userId,
    actor_email: userRow?.user?.email ?? null,
    file_path: data.filePath,
    section: data.section ?? null,
    before_text: data.before,
    after_text: data.after,
    reason: data.reason ?? null,
    source: data.source
  });
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const requestPublishRollback_createServerFn_handler = createServerRpc({
  id: "e9e7960da1d1c1f102f9304c57e5a1b86ab97af74eeb5b7df519208cb7749799",
  name: "requestPublishRollback",
  filename: "src/lib/landingCopyChangelog.functions.ts"
}, (opts) => requestPublishRollback.__executeServer(opts));
const requestPublishRollback = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(requestPublishRollback_createServerFn_handler, async ({
  context
}) => {
  await requireAdmin(context.userId);
  const scan = await scanLandingCopy();
  const blocking = scan.summary.warnCount;
  if (blocking === 0) {
    return {
      rollbackNeeded: false,
      summary: scan.summary,
      message: "No blocking violations detected. Rollback not required."
    };
  }
  const {
    data: userRow
  } = await supabaseAdmin.auth.admin.getUserById(context.userId);
  const top = scan.findings.filter((f) => f.severity === "warn").slice(0, 10).map((f) => `${f.file}:${f.line} — ${f.rule}`).join("\n");
  await supabaseAdmin.from("landing_copy_changes").insert({
    actor_id: context.userId,
    actor_email: userRow?.user?.email ?? null,
    file_path: "(publish-rollback)",
    section: "publish",
    before_text: `Published landing had ${blocking} blocking violation${blocking === 1 ? "" : "s"}:
${top}`,
    after_text: "Rollback to last approved landing version requested.",
    reason: "Content-QA scan detected typography or a11y regressions after publish.",
    source: "admin"
  });
  return {
    rollbackNeeded: true,
    summary: scan.summary,
    message: `Rollback requested. ${blocking} blocking violation${blocking === 1 ? "" : "s"} logged.`
  };
});
export {
  listLandingCopyChanges_createServerFn_handler,
  recordLandingCopyChange_createServerFn_handler,
  requestPublishRollback_createServerFn_handler
};
