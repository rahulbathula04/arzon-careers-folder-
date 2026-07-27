import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
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
async function getPublishableClient() {
  const {
    createClient
  } = await import("../_libs/supabase__supabase-js.mjs");
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !anonKey) throw new Error("Supabase env vars missing");
  return createClient(url, anonKey, {
    auth: {
      storage: void 0,
      persistSession: false,
      autoRefreshToken: false
    }
  });
}
const recordChosenRole_createServerFn_handler = createServerRpc({
  id: "793f7a969b0f471a25a2d44366e64fe7f9bb6dee9ebd26cc0667db5cb1f87a34",
  name: "recordChosenRole",
  filename: "src/lib/recommendationOutcomes.functions.ts"
}, (opts) => recordChosenRole.__executeServer(opts));
const recordChosenRole = createServerFn({
  method: "POST"
}).inputValidator((data) => {
  if (!data || typeof data.leadId !== "string" || typeof data.roleSlug !== "string" || typeof data.familyId !== "string") {
    throw new Error("Invalid payload");
  }
  return data;
}).handler(recordChosenRole_createServerFn_handler, async ({
  data
}) => {
  try {
    const client = await getPublishableClient();
    await client.rpc("record_recommendation_outcome", {
      p_lead_id: data.leadId,
      p_family_id: data.familyId,
      p_recommended_role_slug: null,
      p_chosen_role_slug: data.roleSlug,
      p_stage: "chose_role"
    });
  } catch {
  }
  return {
    ok: true
  };
});
const recordRecommendation_createServerFn_handler = createServerRpc({
  id: "e80e2c0e804860d808e9a4755112144f9d82c00ac9fe301bb96484d34bef405f",
  name: "recordRecommendation",
  filename: "src/lib/recommendationOutcomes.functions.ts"
}, (opts) => recordRecommendation.__executeServer(opts));
const recordRecommendation = createServerFn({
  method: "POST"
}).inputValidator((data) => {
  if (!data || typeof data.leadId !== "string" || typeof data.familyId !== "string" || typeof data.topRoleSlug !== "string") {
    throw new Error("Invalid payload");
  }
  return data;
}).handler(recordRecommendation_createServerFn_handler, async ({
  data
}) => {
  try {
    const client = await getPublishableClient();
    await client.rpc("record_recommendation_outcome", {
      p_lead_id: data.leadId,
      p_family_id: data.familyId,
      p_recommended_role_slug: data.topRoleSlug,
      p_chosen_role_slug: null,
      p_stage: "recommended"
    });
  } catch {
  }
  return {
    ok: true
  };
});
export {
  recordChosenRole_createServerFn_handler,
  recordRecommendation_createServerFn_handler
};
