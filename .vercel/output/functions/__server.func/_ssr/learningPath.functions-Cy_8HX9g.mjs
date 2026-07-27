import { c as createSsrRpc } from "./createSsrRpc-BV3sOdh8.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CGVBerDj.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
const getLearningPath = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("c99ea6e8611b45782eec25d8ec7d5e250ff3fd7e35fd2c9ea00f9469d435ae18"));
const markModuleComplete = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => input).handler(createSsrRpc("6d696ecf09952c0cc44f4f2519941e826b689387a46fc01606455271f54c00dd"));
export {
  getLearningPath as g,
  markModuleComplete as m
};
