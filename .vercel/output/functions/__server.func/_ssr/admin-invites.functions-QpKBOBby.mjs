import { c as createSsrRpc } from "./createSsrRpc-BV3sOdh8.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CGVBerDj.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import { p as objectType, q as stringType, v as enumType } from "../_libs/zod.mjs";
const CreateSchema = objectType({
  email: stringType().email().max(120),
  role: enumType(["admin", "reviewer", "support"])
});
const createAdminInvite = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => CreateSchema.parse(d)).handler(createSsrRpc("9949d2ccdb384234bb4cd72e2c530026131f6df50e84d8a201af20bd07cdde27"));
const listAdminInvites = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("7d7b27bfcbaf284a7147ca03bbdbf8b2685cb738bdf1484f1243c2d85fc9a7bb"));
const revokeAdminInvite = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("09796c945a727fa41907b08b6db9c5e89db2c188c221b4791e4271d733de288a"));
const LookupSchema = objectType({
  token: stringType().min(8).max(128)
});
const lookupAdminInvite = createServerFn({
  method: "GET"
}).inputValidator((d) => LookupSchema.parse(d)).handler(createSsrRpc("1db86a91a0eca2f3c64d5fdadf547c620414385132db6db9ab5fe068eab67971"));
export {
  lookupAdminInvite as a,
  createAdminInvite as c,
  listAdminInvites as l,
  revokeAdminInvite as r
};
