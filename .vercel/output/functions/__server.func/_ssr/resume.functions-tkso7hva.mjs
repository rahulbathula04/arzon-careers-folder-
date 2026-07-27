import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CGVBerDj.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { p as objectType, B as anyType } from "../_libs/zod.mjs";
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
const generateAtsResume_createServerFn_handler = createServerRpc({
  id: "02528c9d410bb812cc9c7a6e5939df814bbabe9d941e29590f0724e077391dbc",
  name: "generateAtsResume",
  filename: "src/lib/resume.functions.ts"
}, (opts) => generateAtsResume.__executeServer(opts));
const generateAtsResume = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
  result: anyType()
}).parse(data)).handler(generateAtsResume_createServerFn_handler, async ({
  data
}) => {
  const result = data.result;
  const skillGaps = result.aiAnalysis?.skillGaps ?? [];
  const readiness = result.aiAnalysis?.industryReadiness ?? 50;
  const atsScore = Math.min(100, Math.round(readiness * 0.7 + (result.microAccuracy ?? 0) * 0.3));
  const resumeJson = {
    summary: `A detail-oriented candidate targeting ${result.archetype.topPaths[0]?.title ?? "Healthcare"} roles. Profile aligns with ${result.archetype.name} archetype.`,
    skills: Object.entries(result.traitScores).filter(([_, score]) => score > 0).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([trait]) => trait),
    gapsToAddress: skillGaps,
    atsScore
  };
  return {
    ok: true,
    resume: resumeJson
  };
});
export {
  generateAtsResume_createServerFn_handler
};
