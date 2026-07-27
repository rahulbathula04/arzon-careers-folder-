import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CGVBerDj.mjs";
import { r as requireAdmin } from "./auth-guards.server-Cz9eye0S.mjs";
import { supabaseAdmin } from "./client.server-DUn3rRvm.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { p as objectType, q as stringType, v as enumType } from "../_libs/zod.mjs";
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
const STATUSES = ["pending", "reviewed", "approved", "live", "rejected"];
const BUCKETS = ["desire", "proof", "sell", "rescue"];
const listContentQAReviews_createServerFn_handler = createServerRpc({
  id: "dffb2992e4b72f9a1a23e9ec07b115f3b7d925aee33e616e9405b09c3f1aa58b",
  name: "listContentQAReviews",
  filename: "src/lib/contentQA.functions.ts"
}, (opts) => listContentQAReviews.__executeServer(opts));
const listContentQAReviews = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(listContentQAReviews_createServerFn_handler, async ({
  context
}) => {
  await requireAdmin(context.userId);
  const {
    data,
    error
  } = await supabaseAdmin.from("content_qa_reviews").select("id, page, section_id, bucket, status, notes, reviewer_id, updated_at").order("page", {
    ascending: true
  });
  if (error) throw new Error(error.message);
  return {
    rows: data ?? []
  };
});
const UpsertSchema = objectType({
  page: stringType().min(1).max(120),
  sectionId: stringType().min(1).max(120),
  bucket: enumType(BUCKETS),
  status: enumType(STATUSES),
  notes: stringType().max(2e3).optional().nullable()
});
const upsertContentQAReview_createServerFn_handler = createServerRpc({
  id: "40fb0f0e7d16ed6d524fad6522f0e3f8829d8d7a7fc95fd0ea926d216698885c",
  name: "upsertContentQAReview",
  filename: "src/lib/contentQA.functions.ts"
}, (opts) => upsertContentQAReview.__executeServer(opts));
const upsertContentQAReview = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => UpsertSchema.parse(data)).handler(upsertContentQAReview_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireAdmin(context.userId);
  const {
    error
  } = await supabaseAdmin.from("content_qa_reviews").upsert({
    page: data.page,
    section_id: data.sectionId,
    bucket: data.bucket,
    status: data.status,
    notes: data.notes ?? null,
    reviewer_id: context.userId
  }, {
    onConflict: "page,section_id"
  });
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
export {
  listContentQAReviews_createServerFn_handler,
  upsertContentQAReview_createServerFn_handler
};
