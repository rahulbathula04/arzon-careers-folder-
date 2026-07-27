import { c as createSsrRpc } from "./createSsrRpc-BV3sOdh8.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import { p as objectType, q as stringType, x as numberType, v as enumType } from "../_libs/zod.mjs";
const tierEnum = enumType(["essential", "career", "elite"]);
const createSchema = objectType({
  tier: tierEnum,
  name: stringType().trim().min(2).max(80),
  email: stringType().trim().email().max(120),
  phone: stringType().trim().min(10).max(20),
  city: stringType().trim().max(80).optional().nullable(),
  background: stringType().trim().max(120).optional().nullable(),
  basePriceInr: numberType().int().positive().max(1e7).optional(),
  leadId: stringType().uuid().optional().nullable(),
  utmSource: stringType().trim().max(64).optional().nullable(),
  userAgent: stringType().trim().max(256).optional().nullable()
});
const createEnrolmentIntent = createServerFn({
  method: "POST"
}).inputValidator((input) => createSchema.parse(input)).handler(createSsrRpc("d53e9cafa332a86af343128fe4b60556305dd9fa429d0062e6a80075f3c3f573"));
const applySchema = objectType({
  intentId: stringType().uuid(),
  intentToken: stringType().min(16).max(64),
  code: stringType().trim().min(2).max(32)
});
const applyEnrolmentCoupon = createServerFn({
  method: "POST"
}).inputValidator((input) => applySchema.parse(input)).handler(createSsrRpc("9211b0cb4061e4e2ef55696ec54afd0774d6ec3fc5233af2f85224cd91073216"));
const idSchema = objectType({
  intentId: stringType().uuid(),
  intentToken: stringType().min(16).max(64)
});
const getEnrolmentIntent = createServerFn({
  method: "GET"
}).inputValidator((input) => idSchema.parse(input)).handler(createSsrRpc("d3d24128135c3e28f586dda698c3eade75a2881b6aaf1c22b38298070065bc1a"));
const expireEnrolmentCoupon = createServerFn({
  method: "POST"
}).inputValidator((input) => idSchema.parse(input)).handler(createSsrRpc("90cde55ab49b6f4d624d321a492897beed377b04635571745ccc111bb54148c2"));
const preregSchema = objectType({
  intentId: stringType().uuid(),
  intentToken: stringType().min(16).max(64),
  preregAmountInr: numberType().int().positive().max(1e5),
  balanceInr: numberType().int().min(0).max(1e7)
});
const markPreRegistrationInitiated = createServerFn({
  method: "POST"
}).inputValidator((input) => preregSchema.parse(input)).handler(createSsrRpc("2c88355db84b420cffbebaf207506c6d4ae671ce1597f853ffee8b6c23db0089"));
export {
  applyEnrolmentCoupon as a,
  createEnrolmentIntent as c,
  expireEnrolmentCoupon as e,
  getEnrolmentIntent as g,
  markPreRegistrationInitiated as m
};
