import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { p as objectType, q as stringType, v as enumType } from "../_libs/zod.mjs";
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
const Schema = objectType({
  kind: enumType(["hydration", "runtime", "unhandledrejection"]),
  message: stringType().max(2e3),
  stack: stringType().max(8e3).optional(),
  url: stringType().max(500).optional(),
  route: stringType().max(200).optional(),
  ua: stringType().max(500).optional()
});
const logClientError_createServerFn_handler = createServerRpc({
  id: "04cc1b132b23e18a7c392ab0a565455cfd32a5613307d8cd84ed61f891b23194",
  name: "logClientError",
  filename: "src/lib/client-error-log.functions.ts"
}, (opts) => logClientError.__executeServer(opts));
const logClientError = createServerFn({
  method: "POST"
}).inputValidator((d) => Schema.parse(d ?? {})).handler(logClientError_createServerFn_handler, async ({
  data
}) => {
  console.error(`[client-error] kind=${data.kind} route=${data.route ?? "?"} url=${data.url ?? "?"} :: ${data.message}` + (data.stack ? `
${data.stack}` : ""));
  return {
    ok: true
  };
});
export {
  logClientError_createServerFn_handler
};
