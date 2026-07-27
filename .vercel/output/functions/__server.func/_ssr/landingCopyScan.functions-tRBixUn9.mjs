import { c as createSsrRpc } from "./createSsrRpc-BV3sOdh8.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CGVBerDj.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
const scanLandingCopy = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("762173d2beeab8a950902df4e81eea4585a41dbc13d3143e6ebd22a77a9e68c5"));
export {
  scanLandingCopy as s
};
