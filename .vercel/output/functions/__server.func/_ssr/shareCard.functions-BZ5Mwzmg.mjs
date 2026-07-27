import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { createClient } from "../_libs/supabase__supabase-js.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { p as objectType, q as stringType, z as recordType, A as unknownType, x as numberType } from "../_libs/zod.mjs";
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
function admin() {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      persistSession: false
    }
  });
}
const ALPHABET = "abcdefghijkmnpqrstuvwxyz23456789";
function shortId(len = 7) {
  let s = "";
  for (let i = 0; i < len; i++) {
    s += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return s;
}
const CreateInput = objectType({
  archetype: stringType().min(1).max(64),
  archetypeName: stringType().min(1).max(120),
  topTrackSlug: stringType().min(1).max(64).optional(),
  topTrackTitle: stringType().min(1).max(120).optional(),
  acriOverall: numberType().int().min(0).max(100),
  bandLabel: stringType().min(1).max(64).optional(),
  payload: recordType(stringType(), unknownType()).optional(),
  referralCode: stringType().min(3).max(64).optional()
});
const createShareCard_createServerFn_handler = createServerRpc({
  id: "c5e48662d66707ad44051f38bf646bf4f5f29f089623f9b56fcb9e457160af2b",
  name: "createShareCard",
  filename: "src/lib/shareCard.functions.ts"
}, (opts) => createShareCard.__executeServer(opts));
const createShareCard = createServerFn({
  method: "POST"
}).inputValidator((d) => CreateInput.parse(d)).handler(createShareCard_createServerFn_handler, async ({
  data
}) => {
  const sb = admin();
  for (let i = 0; i < 5; i++) {
    const slug = shortId(7);
    const {
      data: row,
      error
    } = await sb.from("assessment_shares").insert({
      slug,
      archetype: data.archetype,
      archetype_name: data.archetypeName,
      top_track_slug: data.topTrackSlug ?? null,
      top_track_title: data.topTrackTitle ?? null,
      acri_overall: data.acriOverall,
      band_label: data.bandLabel ?? null,
      payload: data.payload ?? {},
      referral_code: data.referralCode ?? slug
    }).select("slug").single();
    if (!error && row) return {
      slug: row.slug
    };
    if (error && error.code !== "23505") {
      throw new Error(error.message);
    }
  }
  throw new Error("Could not generate share slug");
});
const GetInput = objectType({
  slug: stringType().min(3).max(32)
});
const getShareCard_createServerFn_handler = createServerRpc({
  id: "c951fbb016441ea9f7d4b28d1e006392c64ae9319bf46cabe2805c5acb9bd3c4",
  name: "getShareCard",
  filename: "src/lib/shareCard.functions.ts"
}, (opts) => getShareCard.__executeServer(opts));
const getShareCard = createServerFn({
  method: "GET"
}).inputValidator((d) => GetInput.parse(d)).handler(getShareCard_createServerFn_handler, async ({
  data
}) => {
  const sb = admin();
  const {
    data: row
  } = await sb.from("assessment_shares").select("slug, archetype, archetype_name, top_track_slug, top_track_title, acri_overall, band_label, payload, referral_code, views, created_at").eq("slug", data.slug).maybeSingle();
  if (!row) return null;
  sb.from("assessment_shares").update({
    views: (row.views ?? 0) + 1
  }).eq("slug", data.slug).then(() => void 0);
  return row;
});
const RefInput = objectType({
  referralCode: stringType().min(3).max(64),
  landingPath: stringType().min(1).max(255),
  userAgent: stringType().min(1).max(512).optional()
});
const recordReferralVisit_createServerFn_handler = createServerRpc({
  id: "894b83cdaa217e9f89d28a3eb00269470b6702f7951604b8c69a5670a6cb436b",
  name: "recordReferralVisit",
  filename: "src/lib/shareCard.functions.ts"
}, (opts) => recordReferralVisit.__executeServer(opts));
const recordReferralVisit = createServerFn({
  method: "POST"
}).inputValidator((d) => RefInput.parse(d)).handler(recordReferralVisit_createServerFn_handler, async ({
  data
}) => {
  const sb = admin();
  await sb.from("referral_attributions").insert({
    referral_code: data.referralCode,
    landing_path: data.landingPath,
    user_agent: data.userAgent ?? null
  });
  return {
    ok: true
  };
});
export {
  createShareCard_createServerFn_handler,
  getShareCard_createServerFn_handler,
  recordReferralVisit_createServerFn_handler
};
