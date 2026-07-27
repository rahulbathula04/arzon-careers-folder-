import { AsyncLocalStorage } from "node:async_hooks";
import { g as getRequestIP, H as H3Event, t as toResponse } from "../_libs/h3-v2.mjs";
import { w as defineHandlerCallback, q as resolveManifestAssetLink, j as rootRouteId, x as parseRedirect, y as mergeHeaders, l as isRedirect, z as getNormalizedURL, A as getOrigin, C as attachRouterServerSsrUtils, D as createSerializationAdapter, E as createRawStreamRPCPlugin, i as invariant, g as isNotFound, F as isResolvedRedirect, G as executeRewriteInput, H as defaultSerovalPlugins, I as makeSerovalPlugin, s as transformPipeableStreamWithRouter, t as transformReadableStreamWithRouter } from "../_libs/tanstack__router-core.mjs";
import { a as au, I as Iu, o as ou } from "../_libs/seroval.mjs";
import { c as createMemoryHistory } from "../_libs/tanstack__history.mjs";
import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { R as RouterProvider, r as renderRouterToStream } from "../_libs/tanstack__react-router.mjs";
function StartServer(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(RouterProvider, { router: props.router });
}
var defaultStreamHandler = defineHandlerCallback(({ request, router, responseHeaders }) => renderRouterToStream({
  request,
  router,
  responseHeaders,
  children: /* @__PURE__ */ jsxRuntimeExports.jsx(StartServer, { router })
}));
var GLOBAL_EVENT_STORAGE_KEY = /* @__PURE__ */ Symbol.for("tanstack-start:event-storage");
var globalObj$1 = globalThis;
if (!globalObj$1[GLOBAL_EVENT_STORAGE_KEY]) globalObj$1[GLOBAL_EVENT_STORAGE_KEY] = new AsyncLocalStorage();
var eventStorage = globalObj$1[GLOBAL_EVENT_STORAGE_KEY];
function isPromiseLike(value) {
  return typeof value.then === "function";
}
function getSetCookieValues(headers) {
  const headersWithSetCookie = headers;
  if (typeof headersWithSetCookie.getSetCookie === "function") return headersWithSetCookie.getSetCookie();
  const value = headers.get("set-cookie");
  return value ? [value] : [];
}
function mergeEventResponseHeaders(response, event) {
  if (response.ok) return;
  const eventSetCookies = getSetCookieValues(event.res.headers);
  if (eventSetCookies.length === 0) return;
  const responseSetCookies = getSetCookieValues(response.headers);
  response.headers.delete("set-cookie");
  for (const cookie of responseSetCookies) response.headers.append("set-cookie", cookie);
  for (const cookie of eventSetCookies) response.headers.append("set-cookie", cookie);
}
function attachResponseHeaders(value, event) {
  if (isPromiseLike(value)) return value.then((resolved) => {
    if (resolved instanceof Response) mergeEventResponseHeaders(resolved, event);
    return resolved;
  });
  if (value instanceof Response) mergeEventResponseHeaders(value, event);
  return value;
}
function requestHandler(handler) {
  return (request, requestOpts) => {
    const h3Event = new H3Event(request);
    return toResponse(attachResponseHeaders(eventStorage.run({ h3Event }, () => handler(request, requestOpts)), h3Event), h3Event);
  };
}
function getH3Event() {
  const event = eventStorage.getStore();
  if (!event) throw new Error(`No StartEvent found in AsyncLocalStorage. Make sure you are using the function within the server runtime.`);
  return event.h3Event;
}
function getRequest() {
  return getH3Event().req;
}
function getRequestHeaders() {
  return getH3Event().req.headers;
}
function getRequestHeader(name) {
  return getRequestHeaders().get(name) || void 0;
}
function getRequestIP$1(opts) {
  return getRequestIP(getH3Event(), opts);
}
function getResponse() {
  return getH3Event().res;
}
var HEADERS = { TSS_SHELL: "X-TSS_SHELL" };
async function getStartManifest(matchedRoutes) {
  const { tsrStartManifest } = await import("../_tanstack-start-manifest_v-BPIC7F_7.mjs");
  const startManifest = tsrStartManifest();
  const rootRoute = startManifest.routes[rootRouteId] = startManifest.routes[rootRouteId] || {};
  rootRoute.assets = rootRoute.assets || [];
  let injectedHeadScripts;
  return {
    manifest: { routes: Object.fromEntries(Object.entries(startManifest.routes).flatMap(([k, v]) => {
      const result = {};
      let hasData = false;
      if (v.preloads && v.preloads.length > 0) {
        result["preloads"] = v.preloads;
        hasData = true;
      }
      if (v.assets && v.assets.length > 0) {
        result["assets"] = v.assets;
        hasData = true;
      }
      if (!hasData) return [];
      return [[k, result]];
    })) },
    clientEntry: startManifest.clientEntry,
    injectedHeadScripts
  };
}
const manifest = { "5b12b9e55705b3e25dd049623d626573efe8b92dbc010e9d97ced956e4e51769": {
  functionName: "listPublishedMoments_createServerFn_handler",
  importer: () => import("./moments.functions-k5xp07h1.mjs")
}, "e90dd4cbaf90d961a7fddee08b84d71273800db72f1420f8a747ff143123ff91": {
  functionName: "getMomentBySlug_createServerFn_handler",
  importer: () => import("./moments.functions-k5xp07h1.mjs")
}, "bf03975efd47d1fb603f7700697995cbf1d369ceb9d8f07c4a451f82c0eda80e": {
  functionName: "listMomentsAdmin_createServerFn_handler",
  importer: () => import("./moments.functions-k5xp07h1.mjs")
}, "556897b785d794de3f03905ef8bbc0be146f404c8057e2b88ac2c7f2796cd6f5": {
  functionName: "getMomentAdmin_createServerFn_handler",
  importer: () => import("./moments.functions-k5xp07h1.mjs")
}, "f0652ee2747f5f4d93e0bdde248ea1cf3407898511df4aad194c6aeaf48ca2d5": {
  functionName: "createMoment_createServerFn_handler",
  importer: () => import("./moments.functions-k5xp07h1.mjs")
}, "865de48116bb59b9f17184aebe364e1305f0bb70878edbb7ef3d83f3a8a686a9": {
  functionName: "updateMoment_createServerFn_handler",
  importer: () => import("./moments.functions-k5xp07h1.mjs")
}, "5201c3d6dbb8b17413f0246a9887a8a60ce5ec6f02dd4ddca629664716ff0edd": {
  functionName: "deleteMoment_createServerFn_handler",
  importer: () => import("./moments.functions-k5xp07h1.mjs")
}, "c9bba08335c1e341478d1a799f770154545f015179fdf5a9f46aac83ffd5bd7b": {
  functionName: "addMomentImage_createServerFn_handler",
  importer: () => import("./moments.functions-k5xp07h1.mjs")
}, "c7bbbf33ffca8507c935688b50c0c8cadf0d109536f50f04c1e6c06f1acd5085": {
  functionName: "removeMomentImage_createServerFn_handler",
  importer: () => import("./moments.functions-k5xp07h1.mjs")
}, "22c55f90c737dfcf527786bf73971ae005f0bfe773a431865e12ece705fbfc79": {
  functionName: "setMomentCover_createServerFn_handler",
  importer: () => import("./moments.functions-k5xp07h1.mjs")
}, "31447ff58de484807235c9c47ba69c4c20a87ef8fc039e3efaf1b2dccb9d0023": {
  functionName: "updateMomentImage_createServerFn_handler",
  importer: () => import("./moments.functions-k5xp07h1.mjs")
}, "308c8e5f988ca3644d4f8227009769b48bd5e35d0365d5720d7028762504984c": {
  functionName: "listMomentSitemap_createServerFn_handler",
  importer: () => import("./moments.functions-k5xp07h1.mjs")
}, "30c88add11a75e94e58b1520c8b674a1b0b69101b23d56c9f49a975e3e87dd35": {
  functionName: "listPublicPlacements_createServerFn_handler",
  importer: () => import("./placements.functions-DkZ2QUSs.mjs")
}, "9775d5ed55ea5d4eb77f81f410523ea1930370be29b2e371cd5ffb88d2859247": {
  functionName: "listEmployers_createServerFn_handler",
  importer: () => import("./placements.functions-DkZ2QUSs.mjs")
}, "59110b2f7b25b992c7b62817a001defd5e9f475f4ab0e94317fad903e829dd12": {
  functionName: "createEmployer_createServerFn_handler",
  importer: () => import("./placements.functions-DkZ2QUSs.mjs")
}, "dd89b9fafa1cd83683764eb374ab0d4fbcafe56da38ba5f3c71cd5ecee7c4a83": {
  functionName: "listPlacementsAdmin_createServerFn_handler",
  importer: () => import("./placements.functions-DkZ2QUSs.mjs")
}, "1bdc2d8afcc84a18c7e3a9b99636a92d5654d7a5a5aac9fcea37d774940ce09e": {
  functionName: "createPlacement_createServerFn_handler",
  importer: () => import("./placements.functions-DkZ2QUSs.mjs")
}, "1c39e028aa1a38859385b9db8083d3988dcc5e37c0f10612eb72e3301a5a6154": {
  functionName: "retractPlacement_createServerFn_handler",
  importer: () => import("./placements.functions-DkZ2QUSs.mjs")
}, "e42a9df2f67fc10008c13c4777b1d08cf435f8e4955e8ea60a383a9bb684b13b": {
  functionName: "countVerifiedPlacements_createServerFn_handler",
  importer: () => import("./placements.functions-DkZ2QUSs.mjs")
}, "172fc4f516ba319001ec0584fd92a2203994128744d55c159ccd152a1236c324": {
  functionName: "fetchTrustLedger_createServerFn_handler",
  importer: () => import("./trust.functions-BLXRRvkk.mjs")
}, "e03fb74b3e71ce18afd7e99ebea442bc606b7f8657a541e0c27a56d3f1249ed8": {
  functionName: "fetchChangelog_createServerFn_handler",
  importer: () => import("./trust.functions-BLXRRvkk.mjs")
}, "4b05414530f89986af9d0d7340ed7ef87d5ca38443a879091804c1b3459d605c": {
  functionName: "fetchStatus_createServerFn_handler",
  importer: () => import("./trust.functions-BLXRRvkk.mjs")
}, "05b6d8861a11eded4fc6c6cdfc52b296933d1a6fe5958ae462b79e62fab67414": {
  functionName: "listDemandTracks_createServerFn_handler",
  importer: () => import("./demand.functions-cRmPNxUf.mjs")
}, "d1dee96c04a6f69191b478b7e67dc5a66ed4d1d8a2bfb807baf007948b49df9a": {
  functionName: "listFeaturedDemandTracks_createServerFn_handler",
  importer: () => import("./demand.functions-cRmPNxUf.mjs")
}, "4bb4c93cf39e618b241955cd75a3cf04803f72d9b2448a6aa962c75a3ec71367": {
  functionName: "getDemandTrackBySlug_createServerFn_handler",
  importer: () => import("./demand.functions-cRmPNxUf.mjs")
}, "08dd06c8979a4b1bd0001ca90a10d92e7d7bcd429eafb794cef3b9082e53c743": {
  functionName: "castDemandVote_createServerFn_handler",
  importer: () => import("./demand.functions-cRmPNxUf.mjs")
}, "d8e577c0db185eb5027fdac3582b1436d30445757f528b575b886de2986116d2": {
  functionName: "requestDemandTrack_createServerFn_handler",
  importer: () => import("./demand.functions-cRmPNxUf.mjs")
}, "c5e48662d66707ad44051f38bf646bf4f5f29f089623f9b56fcb9e457160af2b": {
  functionName: "createShareCard_createServerFn_handler",
  importer: () => import("./shareCard.functions-BZ5Mwzmg.mjs")
}, "c951fbb016441ea9f7d4b28d1e006392c64ae9319bf46cabe2805c5acb9bd3c4": {
  functionName: "getShareCard_createServerFn_handler",
  importer: () => import("./shareCard.functions-BZ5Mwzmg.mjs")
}, "894b83cdaa217e9f89d28a3eb00269470b6702f7951604b8c69a5670a6cb436b": {
  functionName: "recordReferralVisit_createServerFn_handler",
  importer: () => import("./shareCard.functions-BZ5Mwzmg.mjs")
}, "d53e9cafa332a86af343128fe4b60556305dd9fa429d0062e6a80075f3c3f573": {
  functionName: "createEnrolmentIntent_createServerFn_handler",
  importer: () => import("./enrolment.functions-BW_cIqPn.mjs")
}, "9211b0cb4061e4e2ef55696ec54afd0774d6ec3fc5233af2f85224cd91073216": {
  functionName: "applyEnrolmentCoupon_createServerFn_handler",
  importer: () => import("./enrolment.functions-BW_cIqPn.mjs")
}, "d3d24128135c3e28f586dda698c3eade75a2881b6aaf1c22b38298070065bc1a": {
  functionName: "getEnrolmentIntent_createServerFn_handler",
  importer: () => import("./enrolment.functions-BW_cIqPn.mjs")
}, "90cde55ab49b6f4d624d321a492897beed377b04635571745ccc111bb54148c2": {
  functionName: "expireEnrolmentCoupon_createServerFn_handler",
  importer: () => import("./enrolment.functions-BW_cIqPn.mjs")
}, "2c88355db84b420cffbebaf207506c6d4ae671ce1597f853ffee8b6c23db0089": {
  functionName: "markPreRegistrationInitiated_createServerFn_handler",
  importer: () => import("./enrolment.functions-BW_cIqPn.mjs")
}, "39a0417704f811794703987a71b321d62c2696baad2dc944fcb08205fb9476df": {
  functionName: "trackEvent_createServerFn_handler",
  importer: () => import("./analytics.functions-WJGbhaB4.mjs")
}, "3c29fca30de0f7d71f6a255060add7718a14707c7c777f21ba6f49b077035149": {
  functionName: "getFunnel_createServerFn_handler",
  importer: () => import("./analytics.functions-WJGbhaB4.mjs")
}, "d9f5ca7dbe41852cd55ccffc85669ee3be9e876632c24521c6f7af9c001c93cf": {
  functionName: "getRecentEvents_createServerFn_handler",
  importer: () => import("./analytics.functions-WJGbhaB4.mjs")
}, "c65ba4535ca8c74e1c6c28e86729c8f287f251e7c255f446c0cdfa7fc6948f78": {
  functionName: "getConversionFunnel_createServerFn_handler",
  importer: () => import("./analytics.functions-WJGbhaB4.mjs")
}, "961354ebbeb96325964931171493ec5e10f3e5b4d8d3b8ee32859f54ad17f3c8": {
  functionName: "getExperimentLift_createServerFn_handler",
  importer: () => import("./analytics.functions-WJGbhaB4.mjs")
}, "87f6f71f4dd451d3da8673de63ffc5b495598be85d3ab0087c9f8951e2ebb22e": {
  functionName: "getFunnelDropoff_createServerFn_handler",
  importer: () => import("./analytics.functions-WJGbhaB4.mjs")
}, "3e8b233ddd754a91ab6de5feb9d161a29ddf4c85a22ca10910f8a99b4e71cc46": {
  functionName: "getWhatsAppConversion_createServerFn_handler",
  importer: () => import("./analytics.functions-WJGbhaB4.mjs")
}, "450426229cf1934f598f5b5ad0bdaafee285ce98077c165e4fe0daf751eccd17": {
  functionName: "getSsrErrors_createServerFn_handler",
  importer: () => import("./analytics.functions-WJGbhaB4.mjs")
}, "2e7b552e0fcd7f1c3e4d64a5f756d2ab0099591de70fd8d1f15aaf127e1b8451": {
  functionName: "getCareerEngineFunnel_createServerFn_handler",
  importer: () => import("./analytics.functions-WJGbhaB4.mjs")
}, "7a98acfaade324c88e03d14178be0063ccc35feb91462129eacecc7c0e40289b": {
  functionName: "getCohortStatus_createServerFn_handler",
  importer: () => import("./cohort.functions-CHwAn2-L.mjs")
}, "7c41091e72cb4cab84bab5013eeea465ce6dea2c4bf9071b90ab9bacaecd89b1": {
  functionName: "adminSetCohortCapacity_createServerFn_handler",
  importer: () => import("./cohort.functions-CHwAn2-L.mjs")
}, "05f900eb27aca4e512202f172c250ebf0165a1ef17e61003b0e4ca314f92d775": {
  functionName: "adminSetCohortLock_createServerFn_handler",
  importer: () => import("./cohort.functions-CHwAn2-L.mjs")
}, "eedba752e2a5170f3845d9ca2ae5113ad38a65bdef2958ab514b06c9d60bd1cc": {
  functionName: "adminListCohorts_createServerFn_handler",
  importer: () => import("./cohort.functions-CHwAn2-L.mjs")
}, "4fd3072c6e3418404251d01685d259646cc47a57cabfd47730d9ed6e0e741bfd": {
  functionName: "adminCohortAudit_createServerFn_handler",
  importer: () => import("./cohort.functions-CHwAn2-L.mjs")
}, "43caaf065d858cec9ed6d45b059b3ce74b6bce0e6e14336e4d50f0df8fa4ff2c": {
  functionName: "listAdmins_createServerFn_handler",
  importer: () => import("./admin-roles.functions-C2lmGEQ0.mjs")
}, "4789a3aa90a64f04c586e359b5b9d8d96c2ca3cb297e290629e7c8b142fe8bfc": {
  functionName: "grantAdmin_createServerFn_handler",
  importer: () => import("./admin-roles.functions-C2lmGEQ0.mjs")
}, "29fe1a8fa1555f5ae3b80e31027016cafeaf59fd4c45a68533d2c9b052301b81": {
  functionName: "revokeAdmin_createServerFn_handler",
  importer: () => import("./admin-roles.functions-C2lmGEQ0.mjs")
}, "bde3ffa4211e8425af7edd50706889c3432eb3d8df3f6dc842bd19bafe1d56a7": {
  functionName: "listRoleAssignments_createServerFn_handler",
  importer: () => import("./admin-roles-extended.functions-lyGl5r7r.mjs")
}, "ec4c41aad24db1ea5c2160fdb3230e161c8026c3e1eb10c54db41be4bab64649": {
  functionName: "grantWorkspaceRole_createServerFn_handler",
  importer: () => import("./admin-roles-extended.functions-lyGl5r7r.mjs")
}, "b54e157f398325f26a2a54a40f1224f6cfcca0bd043554b3e77aa705aaf6c89a": {
  functionName: "revokeWorkspaceRole_createServerFn_handler",
  importer: () => import("./admin-roles-extended.functions-lyGl5r7r.mjs")
}, "efadad4220f15a12f94dc520a2d24405c59cb6340d8567694c8b7ea17cc3b0c8": {
  functionName: "recordAdminExport_createServerFn_handler",
  importer: () => import("./admin-export.functions-p4S9gJwv.mjs")
}, "8a9b736346f6001195f12364f263510771201637f23138cc86f891bd9c33c6f4": {
  functionName: "fetchAcriStats_createServerFn_handler",
  importer: () => import("./acri-stats.functions-DtKQYEQ4.mjs")
}, "c99ea6e8611b45782eec25d8ec7d5e250ff3fd7e35fd2c9ea00f9469d435ae18": {
  functionName: "getLearningPath_createServerFn_handler",
  importer: () => import("./learningPath.functions-e4tVyNgV.mjs")
}, "6d696ecf09952c0cc44f4f2519941e826b689387a46fc01606455271f54c00dd": {
  functionName: "markModuleComplete_createServerFn_handler",
  importer: () => import("./learningPath.functions-e4tVyNgV.mjs")
}, "582ede857c83c008849d2d2f0e10fd648866b51c77682d5166f9247ccdf36d97": {
  functionName: "getWeeklyGoal_createServerFn_handler",
  importer: () => import("./weeklyGoal.functions-DQ2ys9_Y.mjs")
}, "111312abf8406356bcf313d16e7ef40e84bbcd8341731c7d2dde466359f519ff": {
  functionName: "toggleWeeklyGoal_createServerFn_handler",
  importer: () => import("./weeklyGoal.functions-DQ2ys9_Y.mjs")
}, "8c863bc08a58f4ab37d4b2afefd49bf54fcdd4cc15b588829bdfd89bcef6fe8b": {
  functionName: "getRecruiterViews_createServerFn_handler",
  importer: () => import("./recruiterViews.functions-DHTAt-97.mjs")
}, "77acd1c20769f0aaa93fdea78adabaa9f8b27285e13363740e4c85703e8554bc": {
  functionName: "listLeads_createServerFn_handler",
  importer: () => import("./leads.functions-Dj3DdHjg.mjs")
}, "1d72a981ddda94c3e788533eaae7d5cc47770ba4291f272c09ec798630f777a7": {
  functionName: "getLeadDetail_createServerFn_handler",
  importer: () => import("./leads.functions-Dj3DdHjg.mjs")
}, "db2365b3919f1b7b2667b010cf0d43aabf9c9502573319ac0c857bf82916c641": {
  functionName: "getResultDetail_createServerFn_handler",
  importer: () => import("./leads.functions-Dj3DdHjg.mjs")
}, "5ad740de131cf43b837d0464e5b58252c7fef4ab1a5ec36eac8a5243e469a977": {
  functionName: "getLatestLeadByEmail_createServerFn_handler",
  importer: () => import("./leads.functions-Dj3DdHjg.mjs")
}, "feefac6ed2632b1257c5d929f3cb8c3e62bd6b70387b9954e3b017f9c346bb29": {
  functionName: "listResults_createServerFn_handler",
  importer: () => import("./leads.functions-Dj3DdHjg.mjs")
}, "cd1707f1325761c7a6e97b12339b2bee1b055947db473310570bee0dba05c1f5": {
  functionName: "markLeadContacted_createServerFn_handler",
  importer: () => import("./leads.functions-Dj3DdHjg.mjs")
}, "a2d83a89925a8e6fc39241e2456466dcf5d6d586aa004c0da5480d8504e9bcbb": {
  functionName: "deleteLead_createServerFn_handler",
  importer: () => import("./leads.functions-Dj3DdHjg.mjs")
}, "c97af74688dabadc77afe17538c53df9173e6ee71221c2abd6c7a74c6bddef09": {
  functionName: "submitLeadEndpoint_createServerFn_handler",
  importer: () => import("./leads.functions-Dj3DdHjg.mjs")
}, "38714a784ef18026be665fb1d4b5b789c83232ca7f938cc0524b512160be5ff1": {
  functionName: "adminCounts_createServerFn_handler",
  importer: () => import("./leads.functions-Dj3DdHjg.mjs")
}, "a79cede85faaf45a8e23da0628f7235e83a0348365cc05732606cd932e6dfccd": {
  functionName: "adminOverview_createServerFn_handler",
  importer: () => import("./leads.functions-Dj3DdHjg.mjs")
}, "c83da84564b2feda11fe88ba7a3e8a4a7dacc3927fee34d33e1b131e84ab1e13": {
  functionName: "getDomainGridMetrics_createServerFn_handler",
  importer: () => import("./metrics.functions-CMkBDneb.mjs")
}, "e980f9e0d0d9887b7ac1705c01f14f5bfd92b741068390a00347704efe96edb2": {
  functionName: "getApplyFunnel_createServerFn_handler",
  importer: () => import("./metrics.functions-CMkBDneb.mjs")
}, "dffb2992e4b72f9a1a23e9ec07b115f3b7d925aee33e616e9405b09c3f1aa58b": {
  functionName: "listContentQAReviews_createServerFn_handler",
  importer: () => import("./contentQA.functions-BsJt-o_3.mjs")
}, "40fb0f0e7d16ed6d524fad6522f0e3f8829d8d7a7fc95fd0ea926d216698885c": {
  functionName: "upsertContentQAReview_createServerFn_handler",
  importer: () => import("./contentQA.functions-BsJt-o_3.mjs")
}, "ba002a653b4789a1f8574ccb866a2ebea1bb92ef717e01a2a113262057ed04aa": {
  functionName: "clearTestEvents_createServerFn_handler",
  importer: () => import("./analytics-test.functions-4O7uS6Pd.mjs")
}, "a6f1a7df2dd032270b33ae7f01da2576971e1b7652c3d182f28f0f762ce126d4": {
  functionName: "createRazorpayOrder_createServerFn_handler",
  importer: () => import("./razorpay.functions-Bwjph-K3.mjs")
}, "0eb51b4df6b0d88ecdda68f490c97172a3b61b1cca7dcca9590a260f83d004f5": {
  functionName: "submitApplication_createServerFn_handler",
  importer: () => import("./applications.functions-r_YbzkpG.mjs")
}, "1e9e3b335f696f04224ab187fa3131a6d38970d9a29a8de98e16b829548176a3": {
  functionName: "listApplications_createServerFn_handler",
  importer: () => import("./applications.functions-r_YbzkpG.mjs")
}, "8b2d852cc98c70ec99a61c1119c48424001d661eff4ccaaf5dd0b1ccea5d7f57": {
  functionName: "updateApplicationStatus_createServerFn_handler",
  importer: () => import("./applications.functions-r_YbzkpG.mjs")
}, "7b6d8df8a4b7ab63ea55fb1f0178b664cb2a2d84f7e95edf99a8fb9a1c5c6da7": {
  functionName: "getArzonPrime60Funnel_createServerFn_handler",
  importer: () => import("./arzonPrime60Funnel.functions-CybCekNz.mjs")
}, "310eb6582dd0252aa0a33fb0e6e78ca648b60aaf2d8727950924db821b6f862f": {
  functionName: "listReadinessJourneys_createServerFn_handler",
  importer: () => import("./admin-readiness-journeys.functions-JfzeygDv.mjs")
}, "02528c9d410bb812cc9c7a6e5939df814bbabe9d941e29590f0724e077391dbc": {
  functionName: "generateAtsResume_createServerFn_handler",
  importer: () => import("./resume.functions-tkso7hva.mjs")
}, "249a1cacb0cc84e36857b2631a3e02223edcc6ebb7b87d43013ebb64a3b61717": {
  functionName: "listLandingCopyChanges_createServerFn_handler",
  importer: () => import("./landingCopyChangelog.functions-BE-UocKP.mjs")
}, "b7eeaafc6347c002586e4b6b933e80dba90fcfa7f7c6bf6b4061aebf9ddfdb89": {
  functionName: "recordLandingCopyChange_createServerFn_handler",
  importer: () => import("./landingCopyChangelog.functions-BE-UocKP.mjs")
}, "e9e7960da1d1c1f102f9304c57e5a1b86ab97af74eeb5b7df519208cb7749799": {
  functionName: "requestPublishRollback_createServerFn_handler",
  importer: () => import("./landingCopyChangelog.functions-BE-UocKP.mjs")
}, "b375f4c10e448daeb2bcf2f96fe4316ff2ecd0de2f01c539d915193aae5bf092": {
  functionName: "listMyEmployers_createServerFn_handler",
  importer: () => import("./employer.functions-d8YPb4g5.mjs")
}, "3c525d458ec832a49340ffabd8e3f116caa2c6b24301ba25e7b66030c3aca1d0": {
  functionName: "listJobs_createServerFn_handler",
  importer: () => import("./employer.functions-d8YPb4g5.mjs")
}, "7a52631de71902a99b0a6e80b1b92677582fa4da7fac20f1ec01a7aa14015bfe": {
  functionName: "upsertJob_createServerFn_handler",
  importer: () => import("./employer.functions-d8YPb4g5.mjs")
}, "8428dc224331a1a1c34baaaf07fcea15715d7cce39b3fa12967e74c5e963bc1a": {
  functionName: "deleteJob_createServerFn_handler",
  importer: () => import("./employer.functions-d8YPb4g5.mjs")
}, "fb90442753ee56e849c80e32741e9fbcdb44be85a94f09956e14a33189485677": {
  functionName: "listShortlists_createServerFn_handler",
  importer: () => import("./employer.functions-d8YPb4g5.mjs")
}, "6d31a8eaaef886e9fa4eed27692c5b176bf934667f5d16dac4e4ead7fa5fe71e": {
  functionName: "addShortlistCandidate_createServerFn_handler",
  importer: () => import("./employer.functions-d8YPb4g5.mjs")
}, "5a08161ec05bd974184db88166754b91bfa2cdee8a1acaec3b037b32e87c39f3": {
  functionName: "updateShortlistStatus_createServerFn_handler",
  importer: () => import("./employer.functions-d8YPb4g5.mjs")
}, "e2df24b068993a439c7953ac53aaf5715cd44798f87a0febeacb9cea053e5fae": {
  functionName: "deleteShortlist_createServerFn_handler",
  importer: () => import("./employer.functions-d8YPb4g5.mjs")
}, "b2c5833dab3dd034385d8731e02e43f1ca7b43a9007a9c19a51b2592f5d12d43": {
  functionName: "submitPlacementEvidence_createServerFn_handler",
  importer: () => import("./employer.functions-d8YPb4g5.mjs")
}, "39683eb0fa04b612cf2df6f236d37711975cffa70843e91bb04e72d7ecf58a59": {
  functionName: "generateDeploymentScore_createServerFn_handler",
  importer: () => import("./employer.functions-d8YPb4g5.mjs")
}, "7b554eaf7a037d3ae894a661523b9e701f1a822a0802b282c473f26fa63dbf4e": {
  functionName: "getGscOverview_createServerFn_handler",
  importer: () => import("./seo-gsc.functions-B9rkf_Pi.mjs")
}, "bd1394d04df53d846688fe4e5d798fdfc0accf9a9066aa783ab648141d09198a": {
  functionName: "pingGsc_createServerFn_handler",
  importer: () => import("./seo-gsc.functions-B9rkf_Pi.mjs")
}, "1cf5eeb65e982829d3aa286bb995e3431aeeb6f6043844353b0eecf345fea015": {
  functionName: "listSeoAlerts_createServerFn_handler",
  importer: () => import("./seo-gsc.functions-B9rkf_Pi.mjs")
}, "93226e40162274ceca532d8ca5159640f4a4152c83ea2f6966a8a789426db95c": {
  functionName: "acknowledgeSeoAlert_createServerFn_handler",
  importer: () => import("./seo-gsc.functions-B9rkf_Pi.mjs")
}, "edf33526009e2ba637219fd2726091bb730db07e19bd2e3f3c4e1874dd9d9643": {
  functionName: "updateSeoAlertConfig_createServerFn_handler",
  importer: () => import("./seo-gsc.functions-B9rkf_Pi.mjs")
}, "6d936304854b5d85803835b7142bb5d2f1cd6f1ccec88989a2363214de295704": {
  functionName: "runSeoAlertSweep_createServerFn_handler",
  importer: () => import("./seo-gsc.functions-B9rkf_Pi.mjs")
}, "e88532aa8cfef9144d773909691832ab27861f448db6b4dc4cd8b090158a3956": {
  functionName: "submitSitemap_createServerFn_handler",
  importer: () => import("./seo-gsc.functions-B9rkf_Pi.mjs")
}, "3397750d47b78dd4c690501d626b15ffa1235edefba3f08f448b1662dd4a55e5": {
  functionName: "inspectUrl_createServerFn_handler",
  importer: () => import("./seo-gsc.functions-B9rkf_Pi.mjs")
}, "0497f6db6ccb16c005d8e32b3adf55954450b873a3924e373e42257074c8a1bf": {
  functionName: "listGscSites_createServerFn_handler",
  importer: () => import("./seo-gsc.functions-B9rkf_Pi.mjs")
}, "31f8b3c562fe45127656c1a591d68cbe5339e67f8062f61118ea02c9c3b6ed49": {
  functionName: "getGscSettings_createServerFn_handler",
  importer: () => import("./seo-gsc.functions-B9rkf_Pi.mjs")
}, "72ac26951bd07192ffa120a62ae4750acbd1cc8207d347c14846d11880bc5948": {
  functionName: "saveGscSettings_createServerFn_handler",
  importer: () => import("./seo-gsc.functions-B9rkf_Pi.mjs")
}, "1bf5e239da7247688602bc0576f9a7ce34cae1d05979063c06613fdb110380f8": {
  functionName: "getAnalyticsAlerts_createServerFn_handler",
  importer: () => import("./analytics-alerts.functions-fjMtQVp-.mjs")
}, "257b614ceea6b2d535878f78aef5452f09ced63b8fffb16ba0bfc01c741d42a1": {
  functionName: "runAnalyticsAnomalyCheck_createServerFn_handler",
  importer: () => import("./analytics-alerts.functions-fjMtQVp-.mjs")
}, "9949d2ccdb384234bb4cd72e2c530026131f6df50e84d8a201af20bd07cdde27": {
  functionName: "createAdminInvite_createServerFn_handler",
  importer: () => import("./admin-invites.functions-BYUf5889.mjs")
}, "7d7b27bfcbaf284a7147ca03bbdbf8b2685cb738bdf1484f1243c2d85fc9a7bb": {
  functionName: "listAdminInvites_createServerFn_handler",
  importer: () => import("./admin-invites.functions-BYUf5889.mjs")
}, "09796c945a727fa41907b08b6db9c5e89db2c188c221b4791e4271d733de288a": {
  functionName: "revokeAdminInvite_createServerFn_handler",
  importer: () => import("./admin-invites.functions-BYUf5889.mjs")
}, "1db86a91a0eca2f3c64d5fdadf547c620414385132db6db9ab5fe068eab67971": {
  functionName: "lookupAdminInvite_createServerFn_handler",
  importer: () => import("./admin-invites.functions-BYUf5889.mjs")
}, "356f32c800efa18b7eba291d33e92a960fce2b39a6a58210bdaca33be64b399a": {
  functionName: "listAdminActivity_createServerFn_handler",
  importer: () => import("./admin-activity.functions-CFswieFQ.mjs")
}, "69c41417e7cb89d63cdb91ecc4180a437367ec5c5975a76c3d221ab28168a171": {
  functionName: "getCurriculumExperimentResults_createServerFn_handler",
  importer: () => import("./curriculumExperiments.functions-BdF8pFc4.mjs")
}, "793f7a969b0f471a25a2d44366e64fe7f9bb6dee9ebd26cc0667db5cb1f87a34": {
  functionName: "recordChosenRole_createServerFn_handler",
  importer: () => import("./recommendationOutcomes.functions-C4a4nOh1.mjs")
}, "e80e2c0e804860d808e9a4755112144f9d82c00ac9fe301bb96484d34bef405f": {
  functionName: "recordRecommendation_createServerFn_handler",
  importer: () => import("./recommendationOutcomes.functions-C4a4nOh1.mjs")
}, "4a986f8563d5452ec6529c252949789ae60f7d2f53ec15fe0ca109067991d83b": {
  functionName: "getExperimentResults_createServerFn_handler",
  importer: () => import("./experiment.functions-CxeSSsL_.mjs")
}, "1eadefdb5aed79b1fd8e077a7a5dfbdf0ff6b3cb86441f17e8f395116222618b": {
  functionName: "getMyEnrolments_createServerFn_handler",
  importer: () => import("./learner.functions-CVIU4Yoo.mjs")
}, "a0f94959601c3f74f420d2101f1ae301511c74759e46ab165f8d7effba5a5285": {
  functionName: "getMySubmissions_createServerFn_handler",
  importer: () => import("./learner.functions-CVIU4Yoo.mjs")
}, "762173d2beeab8a950902df4e81eea4585a41dbc13d3143e6ebd22a77a9e68c5": {
  functionName: "scanLandingCopy_createServerFn_handler",
  importer: () => import("./landingCopyScan.functions-iEarYoaL.mjs")
}, "2b58fc143e4566caf1db41d0aa6b96dbd639bb3239f584670d85cdd05d164b89": {
  functionName: "getAIAnalysis_createServerFn_handler",
  importer: () => import("./careerEngine.functions-BcOOOsIc.mjs")
}, "2457e6d5b2a6d8c9cffacf3a223926670d2a925f7f1bd62df2590832bd7113a0": {
  functionName: "listAuditLog_createServerFn_handler",
  importer: () => import("./audit.functions-CRVKn0Rk.mjs")
}, "080d9565d89460dc658df79c1f7aa655d26197b4f1b8b1e984b213cd9a4529ed": {
  functionName: "restoreRecord_createServerFn_handler",
  importer: () => import("./audit.functions-CRVKn0Rk.mjs")
}, "d041f1cc804ecbe4a9b42c9c8b06f2a4bc705b00c478b5da89685561c4fae43f": {
  functionName: "getPercentileBenchmark_createServerFn_handler",
  importer: () => import("./percentileBenchmark.functions-CEfDKXUs.mjs")
}, "f3ee55de12e3eb1fa27eabfe3cc945f779a39efbf0f7bd05bf4b0281f4216394": {
  functionName: "refreshPercentileSnapshots_createServerFn_handler",
  importer: () => import("./percentileBenchmark.functions-CEfDKXUs.mjs")
}, "04cc1b132b23e18a7c392ab0a565455cfd32a5613307d8cd84ed61f891b23194": {
  functionName: "logClientError_createServerFn_handler",
  importer: () => import("./client-error-log.functions-Ez-IHTCw.mjs")
}, "5a0e7287677644406295efb8a53182a6dd7feedafedb0d6ea484bc8de85025b3": {
  functionName: "getReportProgress_createServerFn_handler",
  importer: () => import("./progress.functions-CPHFVVCn.mjs")
}, "a3ebb223cc220de939232ba0fc9ae82cf18b63993ae0de577b59edc789e37fa6": {
  functionName: "upsertReportProgress_createServerFn_handler",
  importer: () => import("./progress.functions-CPHFVVCn.mjs")
}, "11728bdcd5f95d4e95a51c1aee4fd31e9ca9d32b201b812773d010406abd75ee": {
  functionName: "submitCourseEnquiry_createServerFn_handler",
  importer: () => import("./enquiries.functions-CbscdA3_.mjs")
}, "f72ba63d20727a14eb4afab0da2bcc4d3dec13b84418233c1433cdce486b203f": {
  functionName: "logExperimentEvent_createServerFn_handler",
  importer: () => import("./experiments.functions-CgnjOFad.mjs")
} };
async function getServerFnById(id) {
  const serverFnInfo = manifest[id];
  if (!serverFnInfo) {
    throw new Error("Server function info not found for " + id);
  }
  const fnModule = await serverFnInfo.importer();
  if (!fnModule) {
    console.info("serverFnInfo", serverFnInfo);
    throw new Error("Server function module not resolved for " + id);
  }
  const action = fnModule[serverFnInfo.functionName];
  if (!action) {
    console.info("serverFnInfo", serverFnInfo);
    console.info("fnModule", fnModule);
    throw new Error(
      `Server function module export not resolved for serverFn ID: ${id}`
    );
  }
  return action;
}
var TSS_FORMDATA_CONTEXT = "__TSS_CONTEXT";
var TSS_SERVER_FUNCTION = /* @__PURE__ */ Symbol.for("TSS_SERVER_FUNCTION");
var TSS_SERVER_FUNCTION_FACTORY = /* @__PURE__ */ Symbol.for("TSS_SERVER_FUNCTION_FACTORY");
var X_TSS_SERIALIZED = "x-tss-serialized";
var X_TSS_RAW_RESPONSE = "x-tss-raw";
var TSS_CONTENT_TYPE_FRAMED = "application/x-tss-framed";
var FrameType = {
  JSON: 0,
  CHUNK: 1,
  END: 2,
  ERROR: 3
};
var FRAME_HEADER_SIZE = 9;
var TSS_CONTENT_TYPE_FRAMED_VERSIONED = `${TSS_CONTENT_TYPE_FRAMED}; v=1`;
function isSafeKey(key) {
  return key !== "__proto__" && key !== "constructor" && key !== "prototype";
}
function safeObjectMerge(target, source) {
  const result = /* @__PURE__ */ Object.create(null);
  if (target) {
    for (const key of Object.keys(target)) if (isSafeKey(key)) result[key] = target[key];
  }
  if (source && typeof source === "object") {
    for (const key of Object.keys(source)) if (isSafeKey(key)) result[key] = source[key];
  }
  return result;
}
function createNullProtoObject(source) {
  if (!source) return /* @__PURE__ */ Object.create(null);
  const obj = /* @__PURE__ */ Object.create(null);
  for (const key of Object.keys(source)) if (isSafeKey(key)) obj[key] = source[key];
  return obj;
}
var GLOBAL_STORAGE_KEY = /* @__PURE__ */ Symbol.for("tanstack-start:start-storage-context");
var globalObj = globalThis;
if (!globalObj[GLOBAL_STORAGE_KEY]) globalObj[GLOBAL_STORAGE_KEY] = new AsyncLocalStorage();
var startStorage = globalObj[GLOBAL_STORAGE_KEY];
async function runWithStartContext(context, fn) {
  return startStorage.run(context, fn);
}
function getStartContext(opts) {
  const context = startStorage.getStore();
  if (!context && opts?.throwIfNotFound !== false) throw new Error(`No Start context found in AsyncLocalStorage. Make sure you are using the function within the server runtime.`);
  return context;
}
var getStartOptions = () => getStartContext().startOptions;
var getStartContextServerOnly = getStartContext;
var createServerFn = (options, __opts) => {
  const resolvedOptions = __opts || options || {};
  if (typeof resolvedOptions.method === "undefined") resolvedOptions.method = "GET";
  const res = {
    options: resolvedOptions,
    middleware: (middleware) => {
      const newMiddleware = [...resolvedOptions.middleware || []];
      middleware.map((m) => {
        if (TSS_SERVER_FUNCTION_FACTORY in m) {
          if (m.options.middleware) newMiddleware.push(...m.options.middleware);
        } else newMiddleware.push(m);
      });
      const res2 = createServerFn(void 0, {
        ...resolvedOptions,
        middleware: newMiddleware
      });
      res2[TSS_SERVER_FUNCTION_FACTORY] = true;
      return res2;
    },
    inputValidator: (inputValidator) => {
      return createServerFn(void 0, {
        ...resolvedOptions,
        inputValidator
      });
    },
    handler: (...args) => {
      const [extractedFn, serverFn] = args;
      const newOptions = {
        ...resolvedOptions,
        extractedFn,
        serverFn
      };
      const resolvedMiddleware = [...newOptions.middleware || [], serverFnBaseToMiddleware(newOptions)];
      extractedFn.method = resolvedOptions.method;
      return Object.assign(async (opts) => {
        const result = await executeMiddleware$1(resolvedMiddleware, "client", {
          ...extractedFn,
          ...newOptions,
          data: opts?.data,
          headers: opts?.headers,
          signal: opts?.signal,
          fetch: opts?.fetch,
          context: createNullProtoObject()
        });
        const redirect = parseRedirect(result.error);
        if (redirect) throw redirect;
        if (result.error) throw result.error;
        return result.result;
      }, {
        ...extractedFn,
        method: resolvedOptions.method,
        __executeServer: async (opts) => {
          const startContext = getStartContextServerOnly();
          const serverContextAfterGlobalMiddlewares = startContext.contextAfterGlobalMiddlewares;
          return await executeMiddleware$1(resolvedMiddleware, "server", {
            ...extractedFn,
            ...opts,
            serverFnMeta: extractedFn.serverFnMeta,
            context: safeObjectMerge(serverContextAfterGlobalMiddlewares, opts.context),
            request: startContext.request
          }).then((d) => ({
            result: d.result,
            error: d.error,
            context: d.sendContext
          }));
        }
      });
    }
  };
  const fun = (options2) => {
    return createServerFn(void 0, {
      ...resolvedOptions,
      ...options2
    });
  };
  return Object.assign(fun, res);
};
async function executeMiddleware$1(middlewares, env, opts) {
  let flattenedMiddlewares = flattenMiddlewares([...getStartOptions()?.functionMiddleware || [], ...middlewares]);
  if (env === "server") {
    const startContext = getStartContextServerOnly({ throwIfNotFound: false });
    if (startContext?.executedRequestMiddlewares) flattenedMiddlewares = flattenedMiddlewares.filter((m) => !startContext.executedRequestMiddlewares.has(m));
  }
  const callNextMiddleware = async (ctx) => {
    const nextMiddleware = flattenedMiddlewares.shift();
    if (!nextMiddleware) return ctx;
    try {
      if ("inputValidator" in nextMiddleware.options && nextMiddleware.options.inputValidator && env === "server") ctx.data = await execValidator(nextMiddleware.options.inputValidator, ctx.data);
      let middlewareFn = void 0;
      if (env === "client") {
        if ("client" in nextMiddleware.options) middlewareFn = nextMiddleware.options.client;
      } else if ("server" in nextMiddleware.options) middlewareFn = nextMiddleware.options.server;
      if (middlewareFn) {
        const userNext = async (userCtx = {}) => {
          const result2 = await callNextMiddleware({
            ...ctx,
            ...userCtx,
            context: safeObjectMerge(ctx.context, userCtx.context),
            sendContext: safeObjectMerge(ctx.sendContext, userCtx.sendContext),
            headers: mergeHeaders(ctx.headers, userCtx.headers),
            _callSiteFetch: ctx._callSiteFetch,
            fetch: ctx._callSiteFetch ?? userCtx.fetch ?? ctx.fetch,
            result: userCtx.result !== void 0 ? userCtx.result : userCtx instanceof Response ? userCtx : ctx.result,
            error: userCtx.error ?? ctx.error
          });
          if (result2.error) throw result2.error;
          return result2;
        };
        const result = await middlewareFn({
          ...ctx,
          next: userNext
        });
        if (isRedirect(result)) return {
          ...ctx,
          error: result
        };
        if (result instanceof Response) return {
          ...ctx,
          result
        };
        if (!result) throw new Error("User middleware returned undefined. You must call next() or return a result in your middlewares.");
        return result;
      }
      return callNextMiddleware(ctx);
    } catch (error) {
      return {
        ...ctx,
        error
      };
    }
  };
  return callNextMiddleware({
    ...opts,
    headers: opts.headers || {},
    sendContext: opts.sendContext || {},
    context: opts.context || createNullProtoObject(),
    _callSiteFetch: opts.fetch
  });
}
function flattenMiddlewares(middlewares, maxDepth = 100) {
  const seen = /* @__PURE__ */ new Set();
  const flattened = [];
  const recurse = (middleware, depth) => {
    if (depth > maxDepth) throw new Error(`Middleware nesting depth exceeded maximum of ${maxDepth}. Check for circular references.`);
    middleware.forEach((m) => {
      if (m.options.middleware) recurse(m.options.middleware, depth + 1);
      if (!seen.has(m)) {
        seen.add(m);
        flattened.push(m);
      }
    });
  };
  recurse(middlewares, 0);
  return flattened;
}
async function execValidator(validator, input) {
  if (validator == null) return {};
  if ("~standard" in validator) {
    const result = await validator["~standard"].validate(input);
    if (result.issues) throw new Error(JSON.stringify(result.issues, void 0, 2));
    return result.value;
  }
  if ("parse" in validator) return validator.parse(input);
  if (typeof validator === "function") return validator(input);
  throw new Error("Invalid validator type!");
}
function serverFnBaseToMiddleware(options) {
  return {
    "~types": void 0,
    options: {
      inputValidator: options.inputValidator,
      client: async ({ next, sendContext, fetch: fetch2, ...ctx }) => {
        const payload = {
          ...ctx,
          context: sendContext,
          fetch: fetch2
        };
        return next(await options.extractedFn?.(payload));
      },
      server: async ({ next, ...ctx }) => {
        const result = await options.serverFn?.(ctx);
        return next({
          ...ctx,
          result
        });
      }
    }
  };
}
function getDefaultSerovalPlugins() {
  return [...getStartOptions()?.serializationAdapters?.map(makeSerovalPlugin) ?? [], ...defaultSerovalPlugins];
}
var textEncoder$1 = new TextEncoder();
var EMPTY_PAYLOAD = new Uint8Array(0);
function encodeFrame(type, streamId, payload) {
  const frame = new Uint8Array(FRAME_HEADER_SIZE + payload.length);
  frame[0] = type;
  frame[1] = streamId >>> 24 & 255;
  frame[2] = streamId >>> 16 & 255;
  frame[3] = streamId >>> 8 & 255;
  frame[4] = streamId & 255;
  frame[5] = payload.length >>> 24 & 255;
  frame[6] = payload.length >>> 16 & 255;
  frame[7] = payload.length >>> 8 & 255;
  frame[8] = payload.length & 255;
  frame.set(payload, FRAME_HEADER_SIZE);
  return frame;
}
function encodeJSONFrame(json) {
  return encodeFrame(FrameType.JSON, 0, textEncoder$1.encode(json));
}
function encodeChunkFrame(streamId, chunk) {
  return encodeFrame(FrameType.CHUNK, streamId, chunk);
}
function encodeEndFrame(streamId) {
  return encodeFrame(FrameType.END, streamId, EMPTY_PAYLOAD);
}
function encodeErrorFrame(streamId, error) {
  const message = error instanceof Error ? error.message : String(error ?? "Unknown error");
  return encodeFrame(FrameType.ERROR, streamId, textEncoder$1.encode(message));
}
function createMultiplexedStream(jsonStream, rawStreams) {
  let activePumps = 1 + rawStreams.size;
  let controllerRef = null;
  let cancelled = false;
  const cancelReaders = [];
  const safeEnqueue = (chunk) => {
    if (cancelled || !controllerRef) return;
    try {
      controllerRef.enqueue(chunk);
    } catch {
    }
  };
  const safeError = (err) => {
    if (cancelled || !controllerRef) return;
    try {
      controllerRef.error(err);
    } catch {
    }
  };
  const safeClose = () => {
    if (cancelled || !controllerRef) return;
    try {
      controllerRef.close();
    } catch {
    }
  };
  const checkComplete = () => {
    activePumps--;
    if (activePumps === 0) safeClose();
  };
  return new ReadableStream({
    start(controller) {
      controllerRef = controller;
      cancelReaders.length = 0;
      const pumpJSON = async () => {
        const reader = jsonStream.getReader();
        cancelReaders.push(() => {
          reader.cancel().catch(() => {
          });
        });
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (cancelled) break;
            if (done) break;
            safeEnqueue(encodeJSONFrame(value));
          }
        } catch (error) {
          safeError(error);
        } finally {
          reader.releaseLock();
          checkComplete();
        }
      };
      const pumpRawStream = async (streamId, stream) => {
        const reader = stream.getReader();
        cancelReaders.push(() => {
          reader.cancel().catch(() => {
          });
        });
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (cancelled) break;
            if (done) {
              safeEnqueue(encodeEndFrame(streamId));
              break;
            }
            safeEnqueue(encodeChunkFrame(streamId, value));
          }
        } catch (error) {
          safeEnqueue(encodeErrorFrame(streamId, error));
        } finally {
          reader.releaseLock();
          checkComplete();
        }
      };
      pumpJSON();
      for (const [streamId, stream] of rawStreams) pumpRawStream(streamId, stream);
    },
    cancel() {
      cancelled = true;
      controllerRef = null;
      for (const cancelReader of cancelReaders) cancelReader();
      cancelReaders.length = 0;
    }
  });
}
var serovalPlugins = void 0;
var textEncoder = new TextEncoder();
var FORM_DATA_CONTENT_TYPES = ["multipart/form-data", "application/x-www-form-urlencoded"];
var MAX_PAYLOAD_SIZE = 1e6;
var handleServerAction = async ({ request, context, serverFnId }) => {
  const methodUpper = request.method.toUpperCase();
  const url = new URL(request.url);
  const action = await getServerFnById(serverFnId);
  if (action.method && methodUpper !== action.method) return new Response(`expected ${action.method} method. Got ${methodUpper}`, {
    status: 405,
    headers: { Allow: action.method }
  });
  const isServerFn = request.headers.get("x-tsr-serverFn") === "true";
  if (!serovalPlugins) serovalPlugins = getDefaultSerovalPlugins();
  const contentType = request.headers.get("Content-Type");
  function parsePayload(payload) {
    return Iu(payload, { plugins: serovalPlugins });
  }
  return await (async () => {
    try {
      let serializeResult = function(res2) {
        let nonStreamingBody = void 0;
        const alsResponse = getResponse();
        if (res2 !== void 0) {
          const rawStreams = /* @__PURE__ */ new Map();
          const plugins = [createRawStreamRPCPlugin((id, stream2) => {
            rawStreams.set(id, stream2);
          }), ...serovalPlugins || []];
          let done = false;
          const callbacks = {
            onParse: (value) => {
              nonStreamingBody = value;
            },
            onDone: () => {
              done = true;
            },
            onError: (error) => {
              throw error;
            }
          };
          au(res2, {
            refs: /* @__PURE__ */ new Map(),
            plugins,
            onParse(value) {
              callbacks.onParse(value);
            },
            onDone() {
              callbacks.onDone();
            },
            onError: (error) => {
              callbacks.onError(error);
            }
          });
          if (done && rawStreams.size === 0) return new Response(nonStreamingBody ? JSON.stringify(nonStreamingBody) : void 0, {
            status: alsResponse.status,
            statusText: alsResponse.statusText,
            headers: {
              "Content-Type": "application/json",
              [X_TSS_SERIALIZED]: "true"
            }
          });
          if (rawStreams.size > 0) {
            const multiplexedStream = createMultiplexedStream(new ReadableStream({ start(controller) {
              callbacks.onParse = (value) => {
                controller.enqueue(JSON.stringify(value) + "\n");
              };
              callbacks.onDone = () => {
                try {
                  controller.close();
                } catch {
                }
              };
              callbacks.onError = (error) => controller.error(error);
              if (nonStreamingBody !== void 0) callbacks.onParse(nonStreamingBody);
            } }), rawStreams);
            return new Response(multiplexedStream, {
              status: alsResponse.status,
              statusText: alsResponse.statusText,
              headers: {
                "Content-Type": TSS_CONTENT_TYPE_FRAMED_VERSIONED,
                [X_TSS_SERIALIZED]: "true"
              }
            });
          }
          const stream = new ReadableStream({ start(controller) {
            callbacks.onParse = (value) => controller.enqueue(textEncoder.encode(JSON.stringify(value) + "\n"));
            callbacks.onDone = () => {
              try {
                controller.close();
              } catch (error) {
                controller.error(error);
              }
            };
            callbacks.onError = (error) => controller.error(error);
            if (nonStreamingBody !== void 0) callbacks.onParse(nonStreamingBody);
          } });
          return new Response(stream, {
            status: alsResponse.status,
            statusText: alsResponse.statusText,
            headers: {
              "Content-Type": "application/x-ndjson",
              [X_TSS_SERIALIZED]: "true"
            }
          });
        }
        return new Response(void 0, {
          status: alsResponse.status,
          statusText: alsResponse.statusText
        });
      };
      let res = await (async () => {
        if (FORM_DATA_CONTENT_TYPES.some((type) => contentType && contentType.includes(type))) {
          if (methodUpper === "GET") {
            if (false) ;
            invariant();
          }
          const formData = await request.formData();
          const serializedContext = formData.get(TSS_FORMDATA_CONTEXT);
          formData.delete(TSS_FORMDATA_CONTEXT);
          const params = {
            context,
            data: formData,
            method: methodUpper
          };
          if (typeof serializedContext === "string") try {
            const deserializedContext = Iu(JSON.parse(serializedContext), { plugins: serovalPlugins });
            if (typeof deserializedContext === "object" && deserializedContext) params.context = safeObjectMerge(context, deserializedContext);
          } catch (e) {
            if (false) ;
          }
          return await action(params);
        }
        if (methodUpper === "GET") {
          const payloadParam = url.searchParams.get("payload");
          if (payloadParam && payloadParam.length > MAX_PAYLOAD_SIZE) throw new Error("Payload too large");
          const payload2 = payloadParam ? parsePayload(JSON.parse(payloadParam)) : {};
          payload2.context = safeObjectMerge(context, payload2.context);
          payload2.method = methodUpper;
          return await action(payload2);
        }
        let jsonPayload;
        if (contentType?.includes("application/json")) jsonPayload = await request.json();
        const payload = jsonPayload ? parsePayload(jsonPayload) : {};
        payload.context = safeObjectMerge(payload.context, context);
        payload.method = methodUpper;
        return await action(payload);
      })();
      const unwrapped = res.result || res.error;
      if (isNotFound(res)) res = isNotFoundResponse(res);
      if (!isServerFn) return unwrapped;
      if (unwrapped instanceof Response) {
        if (isRedirect(unwrapped)) return unwrapped;
        unwrapped.headers.set(X_TSS_RAW_RESPONSE, "true");
        return unwrapped;
      }
      return serializeResult(res);
    } catch (error) {
      if (error instanceof Response) return error;
      if (isNotFound(error)) return isNotFoundResponse(error);
      console.info();
      console.info("Server Fn Error!");
      console.info();
      console.error(error);
      console.info();
      const serializedError = JSON.stringify(await Promise.resolve(ou(error, {
        refs: /* @__PURE__ */ new Map(),
        plugins: serovalPlugins
      })));
      const response = getResponse();
      return new Response(serializedError, {
        status: response.status ?? 500,
        statusText: response.statusText,
        headers: {
          "Content-Type": "application/json",
          [X_TSS_SERIALIZED]: "true"
        }
      });
    }
  })();
};
function isNotFoundResponse(error) {
  const { headers, ...rest } = error;
  return new Response(JSON.stringify(rest), {
    status: 404,
    headers: {
      "Content-Type": "application/json",
      ...headers || {}
    }
  });
}
function normalizeTransformAssetResult(result) {
  if (typeof result === "string") return { href: result };
  return result;
}
function resolveTransformAssetsCrossOrigin(config, kind) {
  if (!config) return void 0;
  if (typeof config === "string") return config;
  return config[kind];
}
function isObjectShorthand(transform) {
  return "prefix" in transform;
}
function resolveTransformAssetsConfig(transform) {
  if (typeof transform === "string") {
    const prefix = transform;
    return {
      type: "transform",
      transformFn: ({ url }) => ({ href: `${prefix}${url}` }),
      cache: true
    };
  }
  if (typeof transform === "function") return {
    type: "transform",
    transformFn: transform,
    cache: true
  };
  if (isObjectShorthand(transform)) {
    const { prefix, crossOrigin } = transform;
    return {
      type: "transform",
      transformFn: ({ url, kind }) => {
        const href = `${prefix}${url}`;
        if (kind === "clientEntry") return { href };
        const co = resolveTransformAssetsCrossOrigin(crossOrigin, kind);
        return co ? {
          href,
          crossOrigin: co
        } : { href };
      },
      cache: true
    };
  }
  if ("createTransform" in transform && transform.createTransform) return {
    type: "createTransform",
    createTransform: transform.createTransform,
    cache: transform.cache !== false
  };
  return {
    type: "transform",
    transformFn: typeof transform.transform === "string" ? (({ url }) => ({ href: `${transform.transform}${url}` })) : transform.transform,
    cache: transform.cache !== false
  };
}
function adaptTransformAssetUrlsToTransformAssets(transformFn) {
  return async ({ url, kind }) => ({ href: await transformFn({
    url,
    type: kind
  }) });
}
function adaptTransformAssetUrlsConfigToTransformAssets(transform) {
  if (typeof transform === "string") return transform;
  if (typeof transform === "function") return adaptTransformAssetUrlsToTransformAssets(transform);
  if ("createTransform" in transform && transform.createTransform) return {
    createTransform: async (ctx) => adaptTransformAssetUrlsToTransformAssets(await transform.createTransform(ctx)),
    cache: transform.cache,
    warmup: transform.warmup
  };
  return {
    transform: typeof transform.transform === "string" ? transform.transform : adaptTransformAssetUrlsToTransformAssets(transform.transform),
    cache: transform.cache,
    warmup: transform.warmup
  };
}
function buildClientEntryScriptTag(clientEntry, injectedHeadScripts) {
  let script = `import(${JSON.stringify(clientEntry)})`;
  if (injectedHeadScripts) script = `${injectedHeadScripts};${script}`;
  return {
    tag: "script",
    attrs: {
      type: "module",
      async: true
    },
    children: script
  };
}
function assignManifestAssetLink(link, next) {
  if (typeof link === "string") return next.crossOrigin ? next : next.href;
  return next.crossOrigin ? next : { href: next.href };
}
async function transformManifestAssets(source, transformFn, _opts) {
  const manifest2 = structuredClone(source.manifest);
  for (const route of Object.values(manifest2.routes)) {
    if (route.preloads) route.preloads = await Promise.all(route.preloads.map(async (link) => {
      const result = normalizeTransformAssetResult(await transformFn({
        url: resolveManifestAssetLink(link).href,
        kind: "modulepreload"
      }));
      return assignManifestAssetLink(link, {
        href: result.href,
        crossOrigin: result.crossOrigin
      });
    }));
    if (route.assets) {
      for (const asset of route.assets) if (asset.tag === "link" && asset.attrs?.href) {
        const rel = asset.attrs.rel;
        if (!(typeof rel === "string" ? rel.split(/\s+/) : []).includes("stylesheet")) continue;
        const result = normalizeTransformAssetResult(await transformFn({
          url: asset.attrs.href,
          kind: "stylesheet"
        }));
        asset.attrs.href = result.href;
        if (result.crossOrigin) asset.attrs.crossOrigin = result.crossOrigin;
        else delete asset.attrs.crossOrigin;
      }
    }
  }
  const transformedClientEntry = normalizeTransformAssetResult(await transformFn({
    url: source.clientEntry,
    kind: "clientEntry"
  }));
  const rootRoute = manifest2.routes[rootRouteId];
  if (rootRoute) {
    rootRoute.assets = rootRoute.assets || [];
    rootRoute.assets.push(buildClientEntryScriptTag(transformedClientEntry.href, source.injectedHeadScripts));
  }
  return manifest2;
}
function buildManifestWithClientEntry(source) {
  const scriptTag = buildClientEntryScriptTag(source.clientEntry, source.injectedHeadScripts);
  const baseRootRoute = source.manifest.routes[rootRouteId];
  return { routes: {
    ...source.manifest.routes,
    ...baseRootRoute ? { [rootRouteId]: {
      ...baseRootRoute,
      assets: [...baseRootRoute.assets || [], scriptTag]
    } } : {}
  } };
}
var ServerFunctionSerializationAdapter = createSerializationAdapter({
  key: "$TSS/serverfn",
  test: (v) => {
    if (typeof v !== "function") return false;
    if (!(TSS_SERVER_FUNCTION in v)) return false;
    return !!v[TSS_SERVER_FUNCTION];
  },
  toSerializable: ({ serverFnMeta }) => ({ functionId: serverFnMeta.id }),
  fromSerializable: ({ functionId }) => {
    const fn = async (opts, signal) => {
      return (await (await getServerFnById(functionId))(opts ?? {}, signal)).result;
    };
    return fn;
  }
});
function getStartResponseHeaders(opts) {
  return mergeHeaders({ "Content-Type": "text/html; charset=utf-8" }, ...opts.router.stores.activeMatchesSnapshot.state.map((match) => {
    return match.headers;
  }));
}
var entriesPromise;
var baseManifestPromise;
var cachedFinalManifestPromise;
async function loadEntries() {
  const routerEntry = await import("./router-CvdLERTV.mjs").then((n) => n.bE);
  return {
    startEntry: await import("./start-Bc5fGx03.mjs"),
    routerEntry
  };
}
function getEntries() {
  if (!entriesPromise) entriesPromise = loadEntries();
  return entriesPromise;
}
function getBaseManifest(matchedRoutes) {
  if (!baseManifestPromise) baseManifestPromise = getStartManifest();
  return baseManifestPromise;
}
async function resolveManifest(matchedRoutes, transformFn, cache) {
  const base = await getBaseManifest();
  const computeFinalManifest = async () => {
    return transformFn ? await transformManifestAssets(base, transformFn) : buildManifestWithClientEntry(base);
  };
  if (!transformFn || cache) {
    if (!cachedFinalManifestPromise) cachedFinalManifestPromise = computeFinalManifest();
    return cachedFinalManifestPromise;
  }
  return computeFinalManifest();
}
var ROUTER_BASEPATH = "/";
var SERVER_FN_BASE = "/_serverFn/";
var IS_PRERENDERING = process.env.TSS_PRERENDERING === "true";
var IS_SHELL_ENV = process.env.TSS_SHELL === "true";
var ERR_NO_RESPONSE = "Internal Server Error";
var ERR_NO_DEFER = "Internal Server Error";
function throwRouteHandlerError() {
  throw new Error(ERR_NO_RESPONSE);
}
function throwIfMayNotDefer() {
  throw new Error(ERR_NO_DEFER);
}
function isSpecialResponse(value) {
  return value instanceof Response || isRedirect(value);
}
function handleCtxResult(result) {
  if (isSpecialResponse(result)) return { response: result };
  return result;
}
function executeMiddleware(middlewares, ctx) {
  let index2 = -1;
  const next = async (nextCtx) => {
    if (nextCtx) {
      if (nextCtx.context) ctx.context = safeObjectMerge(ctx.context, nextCtx.context);
      for (const key of Object.keys(nextCtx)) if (key !== "context") ctx[key] = nextCtx[key];
    }
    index2++;
    const middleware = middlewares[index2];
    if (!middleware) return ctx;
    let result;
    try {
      result = await middleware({
        ...ctx,
        next
      });
    } catch (err) {
      if (isSpecialResponse(err)) {
        ctx.response = err;
        return ctx;
      }
      throw err;
    }
    const normalized = handleCtxResult(result);
    if (normalized) {
      if (normalized.response !== void 0) ctx.response = normalized.response;
      if (normalized.context) ctx.context = safeObjectMerge(ctx.context, normalized.context);
    }
    return ctx;
  };
  return next();
}
function handlerToMiddleware(handler, mayDefer = false) {
  if (mayDefer) return handler;
  return async (ctx) => {
    const response = await handler({
      ...ctx,
      next: throwIfMayNotDefer
    });
    if (!response) throwRouteHandlerError();
    return response;
  };
}
function createStartHandler(cbOrOptions) {
  const cb = typeof cbOrOptions === "function" ? cbOrOptions : cbOrOptions.handler;
  const transformAssetsOption = typeof cbOrOptions === "function" ? void 0 : cbOrOptions.transformAssets;
  const transformAssetUrlsOption = typeof cbOrOptions === "function" ? void 0 : cbOrOptions.transformAssetUrls;
  const transformOption = transformAssetsOption !== void 0 ? resolveTransformAssetsConfig(transformAssetsOption) : transformAssetUrlsOption !== void 0 ? resolveTransformAssetsConfig(adaptTransformAssetUrlsConfigToTransformAssets(transformAssetUrlsOption)) : void 0;
  const warmupTransformManifest = !!transformAssetsOption && typeof transformAssetsOption === "object" && "warmup" in transformAssetsOption && transformAssetsOption.warmup === true || !!transformAssetUrlsOption && typeof transformAssetUrlsOption === "object" && transformAssetUrlsOption.warmup === true;
  const resolvedTransformConfig = transformOption;
  const cache = resolvedTransformConfig ? resolvedTransformConfig.cache : true;
  const shouldCacheCreateTransform = cache && true;
  let cachedCreateTransformPromise;
  const getTransformFn = async (opts) => {
    if (!resolvedTransformConfig) return void 0;
    if (resolvedTransformConfig.type === "createTransform") {
      if (shouldCacheCreateTransform) {
        if (!cachedCreateTransformPromise) cachedCreateTransformPromise = Promise.resolve(resolvedTransformConfig.createTransform(opts)).catch((error) => {
          cachedCreateTransformPromise = void 0;
          throw error;
        });
        return cachedCreateTransformPromise;
      }
      return resolvedTransformConfig.createTransform(opts);
    }
    return resolvedTransformConfig.transformFn;
  };
  if (warmupTransformManifest && cache && true && !cachedFinalManifestPromise) {
    const warmupPromise = (async () => {
      const base = await getBaseManifest();
      const transformFn = await getTransformFn({ warmup: true });
      return transformFn ? await transformManifestAssets(base, transformFn) : buildManifestWithClientEntry(base);
    })();
    cachedFinalManifestPromise = warmupPromise;
    warmupPromise.catch(() => {
      if (cachedFinalManifestPromise === warmupPromise) cachedFinalManifestPromise = void 0;
      cachedCreateTransformPromise = void 0;
    });
  }
  const startRequestResolver = async (request, requestOpts) => {
    let router = null;
    let cbWillCleanup = false;
    try {
      const { url, handledProtocolRelativeURL } = getNormalizedURL(request.url);
      const href = url.pathname + url.search + url.hash;
      const origin = getOrigin(request);
      if (handledProtocolRelativeURL) return Response.redirect(url, 308);
      const entries = await getEntries();
      const startOptions = await entries.startEntry.startInstance?.getOptions() || {};
      const serializationAdapters = [...startOptions.serializationAdapters || [], ServerFunctionSerializationAdapter];
      const requestStartOptions = {
        ...startOptions,
        serializationAdapters
      };
      const flattenedRequestMiddlewares = startOptions.requestMiddleware ? flattenMiddlewares(startOptions.requestMiddleware) : [];
      const executedRequestMiddlewares = new Set(flattenedRequestMiddlewares);
      const getRouter = async () => {
        if (router) return router;
        router = await entries.routerEntry.getRouter();
        let isShell = IS_SHELL_ENV;
        if (IS_PRERENDERING && !isShell) isShell = request.headers.get(HEADERS.TSS_SHELL) === "true";
        const history = createMemoryHistory({ initialEntries: [href] });
        router.update({
          history,
          isShell,
          isPrerendering: IS_PRERENDERING,
          origin: router.options.origin ?? origin,
          defaultSsr: requestStartOptions.defaultSsr,
          serializationAdapters: [...requestStartOptions.serializationAdapters, ...router.options.serializationAdapters || []],
          basepath: ROUTER_BASEPATH
        });
        return router;
      };
      if (SERVER_FN_BASE && url.pathname.startsWith(SERVER_FN_BASE)) {
        const serverFnId = url.pathname.slice(SERVER_FN_BASE.length).split("/")[0];
        if (!serverFnId) throw new Error("Invalid server action param for serverFnId");
        const serverFnHandler = async ({ context }) => {
          return runWithStartContext({
            getRouter,
            startOptions: requestStartOptions,
            contextAfterGlobalMiddlewares: context,
            request,
            executedRequestMiddlewares
          }, () => handleServerAction({
            request,
            context: requestOpts?.context,
            serverFnId
          }));
        };
        return handleRedirectResponse((await executeMiddleware([...flattenedRequestMiddlewares.map((d) => d.options.server), serverFnHandler], {
          request,
          pathname: url.pathname,
          context: createNullProtoObject(requestOpts?.context)
        })).response, request, getRouter);
      }
      const executeRouter = async (serverContext, matchedRoutes) => {
        const acceptParts = (request.headers.get("Accept") || "*/*").split(",");
        if (!["*/*", "text/html"].some((mimeType) => acceptParts.some((part) => part.trim().startsWith(mimeType)))) return Response.json({ error: "Only HTML requests are supported here" }, { status: 500 });
        const manifest2 = await resolveManifest(matchedRoutes, await getTransformFn({
          warmup: false,
          request
        }), cache);
        const routerInstance = await getRouter();
        attachRouterServerSsrUtils({
          router: routerInstance,
          manifest: manifest2
        });
        routerInstance.update({ additionalContext: { serverContext } });
        await routerInstance.load();
        if (routerInstance.state.redirect) return routerInstance.state.redirect;
        await routerInstance.serverSsr.dehydrate();
        const responseHeaders = getStartResponseHeaders({ router: routerInstance });
        cbWillCleanup = true;
        return cb({
          request,
          router: routerInstance,
          responseHeaders
        });
      };
      const requestHandlerMiddleware = async ({ context }) => {
        return runWithStartContext({
          getRouter,
          startOptions: requestStartOptions,
          contextAfterGlobalMiddlewares: context,
          request,
          executedRequestMiddlewares
        }, async () => {
          try {
            return await handleServerRoutes({
              getRouter,
              request,
              url,
              executeRouter,
              context,
              executedRequestMiddlewares
            });
          } catch (err) {
            if (err instanceof Response) return err;
            throw err;
          }
        });
      };
      return handleRedirectResponse((await executeMiddleware([...flattenedRequestMiddlewares.map((d) => d.options.server), requestHandlerMiddleware], {
        request,
        pathname: url.pathname,
        context: createNullProtoObject(requestOpts?.context)
      })).response, request, getRouter);
    } finally {
      if (router && !cbWillCleanup) router.serverSsr?.cleanup();
      router = null;
    }
  };
  return requestHandler(startRequestResolver);
}
async function handleRedirectResponse(response, request, getRouter) {
  if (!isRedirect(response)) return response;
  if (isResolvedRedirect(response)) {
    if (request.headers.get("x-tsr-serverFn") === "true") return Response.json({
      ...response.options,
      isSerializedRedirect: true
    }, { headers: response.headers });
    return response;
  }
  const opts = response.options;
  if (opts.to && typeof opts.to === "string" && !opts.to.startsWith("/")) throw new Error(`Server side redirects must use absolute paths via the 'href' or 'to' options. The redirect() method's "to" property accepts an internal path only. Use the "href" property to provide an external URL. Received: ${JSON.stringify(opts)}`);
  if ([
    "params",
    "search",
    "hash"
  ].some((d) => typeof opts[d] === "function")) throw new Error(`Server side redirects must use static search, params, and hash values and do not support functional values. Received functional values for: ${Object.keys(opts).filter((d) => typeof opts[d] === "function").map((d) => `"${d}"`).join(", ")}`);
  const redirect = (await getRouter()).resolveRedirect(response);
  if (request.headers.get("x-tsr-serverFn") === "true") return Response.json({
    ...response.options,
    isSerializedRedirect: true
  }, { headers: response.headers });
  return redirect;
}
async function handleServerRoutes({ getRouter, request, url, executeRouter, context, executedRequestMiddlewares }) {
  const router = await getRouter();
  const pathname = executeRewriteInput(router.rewrite, url).pathname;
  const { matchedRoutes, foundRoute, routeParams } = router.getMatchedRoutes(pathname);
  const isExactMatch = foundRoute && routeParams["**"] === void 0;
  const routeMiddlewares = [];
  for (const route of matchedRoutes) {
    const serverMiddleware = route.options.server?.middleware;
    if (serverMiddleware) {
      const flattened = flattenMiddlewares(serverMiddleware);
      for (const m of flattened) if (!executedRequestMiddlewares.has(m)) routeMiddlewares.push(m.options.server);
    }
  }
  const server2 = foundRoute?.options.server;
  if (server2?.handlers && isExactMatch) {
    const handlers = typeof server2.handlers === "function" ? server2.handlers({ createHandlers: (d) => d }) : server2.handlers;
    const handler = handlers[request.method.toUpperCase()] ?? handlers["ANY"];
    if (handler) {
      const mayDefer = !!foundRoute.options.component;
      if (typeof handler === "function") routeMiddlewares.push(handlerToMiddleware(handler, mayDefer));
      else {
        if (handler.middleware?.length) {
          const handlerMiddlewares = flattenMiddlewares(handler.middleware);
          for (const m of handlerMiddlewares) routeMiddlewares.push(m.options.server);
        }
        if (handler.handler) routeMiddlewares.push(handlerToMiddleware(handler.handler, mayDefer));
      }
    }
  }
  routeMiddlewares.push((ctx) => executeRouter(ctx.context, matchedRoutes));
  return (await executeMiddleware(routeMiddlewares, {
    request,
    context,
    params: routeParams,
    pathname
  })).response;
}
const fetch = createStartHandler(defaultStreamHandler);
function createServerEntry(entry) {
  return {
    async fetch(...args) {
      return await entry.fetch(...args);
    }
  };
}
const server = createServerEntry({ fetch });
const index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  H: HEADERS,
  S: StartServer,
  T: TSS_SERVER_FUNCTION,
  a: getRequestHeader,
  b: getRequestHeaders,
  c: createStartHandler,
  createServerEntry,
  d: defaultStreamHandler,
  default: server,
  e: getRequestIP$1,
  f: getResponse,
  g: getRequest,
  h: createServerFn,
  i: getServerFnById,
  r: requestHandler
});
const serverBKkhNWog = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  HEADERS,
  StartServer,
  attachRouterServerSsrUtils,
  createStartHandler,
  defaultStreamHandler,
  defineHandlerCallback,
  getRequest,
  getRequestHeader,
  getRequestHeaders,
  getRequestIP: getRequestIP$1,
  getResponse,
  requestHandler,
  transformPipeableStreamWithRouter,
  transformReadableStreamWithRouter
});
export {
  TSS_SERVER_FUNCTION as T,
  getRequestIP$1 as a,
  getRequest as b,
  createServerFn as c,
  getServerFnById as d,
  getRequestHeader as g,
  index as i,
  serverBKkhNWog as s
};
