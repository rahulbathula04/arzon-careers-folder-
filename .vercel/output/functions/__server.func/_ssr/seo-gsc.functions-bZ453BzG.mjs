import { c as createSsrRpc } from "./createSsrRpc-BV3sOdh8.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CGVBerDj.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import { p as objectType, x as numberType, q as stringType, w as booleanType } from "../_libs/zod.mjs";
const getGscOverview = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator(objectType({
  days: numberType().int().min(7).max(90).default(28)
}).parse).handler(createSsrRpc("7b554eaf7a037d3ae894a661523b9e701f1a822a0802b282c473f26fa63dbf4e"));
const pingGsc = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("bd1394d04df53d846688fe4e5d798fdfc0accf9a9066aa783ab648141d09198a"));
const listSeoAlerts = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator(objectType({
  includeAcknowledged: booleanType().default(false)
}).parse).handler(createSsrRpc("1cf5eeb65e982829d3aa286bb995e3431aeeb6f6043844353b0eecf345fea015"));
const acknowledgeSeoAlert = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator(objectType({
  id: stringType().uuid()
}).parse).handler(createSsrRpc("93226e40162274ceca532d8ca5159640f4a4152c83ea2f6966a8a789426db95c"));
const updateSeoAlertConfig = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator(objectType({
  min_impressions: numberType().int().min(1).max(1e4),
  drop_pct: numberType().min(5).max(95)
}).parse).handler(createSsrRpc("edf33526009e2ba637219fd2726091bb730db07e19bd2e3f3c4e1874dd9d9643"));
const runSeoAlertSweep = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("6d936304854b5d85803835b7142bb5d2f1cd6f1ccec88989a2363214de295704"));
const submitSitemap = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator(objectType({
  feedpath: stringType().url().optional()
}).parse).handler(createSsrRpc("e88532aa8cfef9144d773909691832ab27861f448db6b4dc4cd8b090158a3956"));
const inspectUrl = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator(objectType({
  inspectionUrl: stringType().url()
}).parse).handler(createSsrRpc("3397750d47b78dd4c690501d626b15ffa1235edefba3f08f448b1662dd4a55e5"));
const listGscSites = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("0497f6db6ccb16c005d8e32b3adf55954450b873a3924e373e42257074c8a1bf"));
const getGscSettings = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("31f8b3c562fe45127656c1a591d68cbe5339e67f8062f61118ea02c9c3b6ed49"));
const saveGscSettings = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator(objectType({
  site_url: stringType().min(4).max(255)
}).parse).handler(createSsrRpc("72ac26951bd07192ffa120a62ae4750acbd1cc8207d347c14846d11880bc5948"));
export {
  acknowledgeSeoAlert as a,
  listGscSites as b,
  getGscSettings as c,
  saveGscSettings as d,
  getGscOverview as g,
  inspectUrl as i,
  listSeoAlerts as l,
  pingGsc as p,
  runSeoAlertSweep as r,
  submitSitemap as s,
  updateSeoAlertConfig as u
};
