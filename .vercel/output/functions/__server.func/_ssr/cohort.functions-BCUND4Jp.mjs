import { c as createSsrRpc } from "./createSsrRpc-BV3sOdh8.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CGVBerDj.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import { p as objectType, q as stringType, x as numberType, w as booleanType } from "../_libs/zod.mjs";
const ACTIVE_COHORT_ID = "aug-2026";
const idSchema = objectType({
  id: stringType().min(1).max(64)
});
const getCohortStatus = createServerFn({
  method: "GET"
}).inputValidator((i) => idSchema.parse(i)).handler(createSsrRpc("7a98acfaade324c88e03d14178be0063ccc35feb91462129eacecc7c0e40289b"));
const setCapSchema = objectType({
  id: stringType().min(1).max(64),
  cap: numberType().int().min(1).max(1e4)
});
const setLockSchema = objectType({
  id: stringType().min(1).max(64),
  locked: booleanType(),
  reason: stringType().trim().max(240).optional().nullable()
});
const adminSetCohortCapacity = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((i) => setCapSchema.parse(i)).handler(createSsrRpc("7c41091e72cb4cab84bab5013eeea465ce6dea2c4bf9071b90ab9bacaecd89b1"));
const adminSetCohortLock = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((i) => setLockSchema.parse(i)).handler(createSsrRpc("05f900eb27aca4e512202f172c250ebf0165a1ef17e61003b0e4ca314f92d775"));
const adminListCohorts = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("eedba752e2a5170f3845d9ca2ae5113ad38a65bdef2958ab514b06c9d60bd1cc"));
const auditSchema = objectType({
  id: stringType().min(1).max(64).optional().nullable(),
  limit: numberType().int().min(1).max(500).optional()
});
const adminCohortAudit = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((i) => auditSchema.parse(i)).handler(createSsrRpc("4fd3072c6e3418404251d01685d259646cc47a57cabfd47730d9ed6e0e741bfd"));
function cohortWaitlistUrl(label) {
  const text = `Hi Arzon, the ${label} cohort is locked. Please add me to the waitlist for the next batch.`;
  return `https://wa.me/919121283638?text=${encodeURIComponent(text)}`;
}
export {
  ACTIVE_COHORT_ID as A,
  adminListCohorts as a,
  adminCohortAudit as b,
  cohortWaitlistUrl as c,
  adminSetCohortCapacity as d,
  adminSetCohortLock as e,
  getCohortStatus as g
};
