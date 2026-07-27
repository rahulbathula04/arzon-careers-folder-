import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { p as objectType, B as anyType } from "../_libs/zod.mjs";
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
const inputSchema = objectType({
  result: anyType()
});
const getAIAnalysis_createServerFn_handler = createServerRpc({
  id: "2b58fc143e4566caf1db41d0aa6b96dbd639bb3239f584670d85cdd05d164b89",
  name: "getAIAnalysis",
  filename: "src/lib/careerEngine.functions.ts"
}, (opts) => getAIAnalysis.__executeServer(opts));
const getAIAnalysis = createServerFn({
  method: "POST"
}).inputValidator((i) => inputSchema.parse(i)).handler(getAIAnalysis_createServerFn_handler, async ({
  data
}) => {
  try {
    const {
      generateAIAnalysis
    } = await import("./llm.server-qnCZ4SUZ.mjs");
    const analysis = await generateAIAnalysis(data.result);
    return {
      ok: true,
      analysis
    };
  } catch (e) {
    console.error("AI Analysis failed:", e);
    return {
      ok: false,
      error: "Failed to generate AI analysis."
    };
  }
});
export {
  getAIAnalysis_createServerFn_handler
};
