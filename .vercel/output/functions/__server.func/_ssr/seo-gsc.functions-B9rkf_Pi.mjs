import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CGVBerDj.mjs";
import { r as requireAdmin } from "./auth-guards.server-Cz9eye0S.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { p as objectType, x as numberType, w as booleanType, q as stringType } from "../_libs/zod.mjs";
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
import "./client.server-DUn3rRvm.mjs";
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
const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console/webmasters/v3";
const GATEWAY_ROOT = "https://connector-gateway.lovable.dev/google_search_console";
const DEFAULT_SITE_URL = "https://arzoncareers.in/";
async function getConfiguredSiteUrl() {
  const {
    supabaseAdmin
  } = await import("./client.server-DUn3rRvm.mjs");
  const {
    data
  } = await supabaseAdmin.from("gsc_settings").select("site_url").eq("id", 1).maybeSingle();
  return data?.site_url ?? DEFAULT_SITE_URL;
}
function sitemapForSite(siteUrl) {
  try {
    return new URL("/sitemap.xml", siteUrl).toString();
  } catch {
    return siteUrl.replace(/\/?$/, "/") + "sitemap.xml";
  }
}
function gwHeaders() {
  const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
  const GSC_KEY = process.env.GOOGLE_SEARCH_CONSOLE_API_KEY;
  if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");
  if (!GSC_KEY) throw new Error("GOOGLE_SEARCH_CONSOLE_API_KEY is not configured");
  return {
    Authorization: `Bearer ${LOVABLE_API_KEY}`,
    "X-Connection-Api-Key": GSC_KEY,
    "Content-Type": "application/json"
  };
}
function isoDaysAgo(days) {
  const d = /* @__PURE__ */ new Date();
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString().slice(0, 10);
}
async function gscQuery(siteUrl, body) {
  const res = await fetch(`${GATEWAY}/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`, {
    method: "POST",
    headers: gwHeaders(),
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`GSC query failed [${res.status}]: ${txt.slice(0, 200)}`);
  }
  const json = await res.json();
  return json.rows ?? [];
}
const getGscOverview_createServerFn_handler = createServerRpc({
  id: "7b554eaf7a037d3ae894a661523b9e701f1a822a0802b282c473f26fa63dbf4e",
  name: "getGscOverview",
  filename: "src/lib/seo-gsc.functions.ts"
}, (opts) => getGscOverview.__executeServer(opts));
const getGscOverview = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator(objectType({
  days: numberType().int().min(7).max(90).default(28)
}).parse).handler(getGscOverview_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireAdmin(context.userId);
  const endDate = isoDaysAgo(2);
  const startDate = isoDaysAgo(2 + data.days);
  const siteUrl = await getConfiguredSiteUrl();
  const siteEnc = encodeURIComponent(siteUrl);
  const [daily, queries, pages, countries, devices, sitemapRes] = await Promise.all([gscQuery(siteUrl, {
    startDate,
    endDate,
    dimensions: ["date"],
    rowLimit: 100
  }), gscQuery(siteUrl, {
    startDate,
    endDate,
    dimensions: ["query"],
    rowLimit: 25
  }), gscQuery(siteUrl, {
    startDate,
    endDate,
    dimensions: ["page"],
    rowLimit: 25
  }), gscQuery(siteUrl, {
    startDate,
    endDate,
    dimensions: ["country"],
    rowLimit: 10
  }), gscQuery(siteUrl, {
    startDate,
    endDate,
    dimensions: ["device"],
    rowLimit: 10
  }), fetch(`${GATEWAY}/sites/${siteEnc}/sitemaps`, {
    headers: gwHeaders()
  })]);
  const totals = daily.reduce((acc, r) => {
    acc.clicks += r.clicks;
    acc.impressions += r.impressions;
    acc._posWeight += r.position * r.impressions;
    return acc;
  }, {
    clicks: 0,
    impressions: 0,
    _posWeight: 0
  });
  const ctr = totals.impressions ? totals.clicks / totals.impressions : 0;
  const position = totals.impressions ? totals._posWeight / totals.impressions : 0;
  let sitemap = null;
  if (sitemapRes.ok) {
    const sj = await sitemapRes.json();
    const sm = sj.sitemap?.[0];
    if (sm) {
      const c = sm.contents?.[0];
      sitemap = {
        submitted: Number(c?.submitted ?? 0),
        indexed: Number(c?.indexed ?? 0),
        errors: Number(sm.errors ?? 0),
        warnings: Number(sm.warnings ?? 0),
        lastSubmitted: sm.lastSubmitted ?? null,
        lastDownloaded: sm.lastDownloaded ?? null,
        isPending: !!sm.isPending
      };
    }
  }
  return {
    range: {
      startDate,
      endDate,
      days: data.days
    },
    totals: {
      clicks: totals.clicks,
      impressions: totals.impressions,
      ctr,
      position
    },
    daily: daily.map((r) => ({
      date: r.keys?.[0] ?? "",
      clicks: r.clicks,
      impressions: r.impressions,
      ctr: r.ctr,
      position: r.position
    })),
    topQueries: queries.map((r) => ({
      query: r.keys?.[0] ?? "",
      clicks: r.clicks,
      impressions: r.impressions,
      ctr: r.ctr,
      position: r.position
    })),
    topPages: pages.map((r) => ({
      page: r.keys?.[0] ?? "",
      clicks: r.clicks,
      impressions: r.impressions,
      ctr: r.ctr,
      position: r.position
    })),
    countries: countries.map((r) => ({
      country: r.keys?.[0] ?? "",
      clicks: r.clicks,
      impressions: r.impressions
    })),
    devices: devices.map((r) => ({
      device: r.keys?.[0] ?? "",
      clicks: r.clicks,
      impressions: r.impressions,
      ctr: r.ctr
    })),
    sitemap
  };
});
const pingGsc_createServerFn_handler = createServerRpc({
  id: "bd1394d04df53d846688fe4e5d798fdfc0accf9a9066aa783ab648141d09198a",
  name: "pingGsc",
  filename: "src/lib/seo-gsc.functions.ts"
}, (opts) => pingGsc.__executeServer(opts));
const pingGsc = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(pingGsc_createServerFn_handler, async ({
  context
}) => {
  await requireAdmin(context.userId);
  const started = Date.now();
  const siteUrl = await getConfiguredSiteUrl();
  const sitesRes = await fetch(`${GATEWAY}/sites`, {
    headers: gwHeaders()
  });
  if (!sitesRes.ok) {
    const txt = await sitesRes.text();
    throw new Error(`GSC /sites failed [${sitesRes.status}]: ${txt.slice(0, 300)}`);
  }
  const sitesJson = await sitesRes.json();
  const entries = sitesJson.siteEntry ?? [];
  const match = entries.find((s) => s.siteUrl === siteUrl);
  const endDate = isoDaysAgo(2);
  const startDate = isoDaysAgo(2 + 7);
  const rows = await gscQuery(siteUrl, {
    startDate,
    endDate,
    dimensions: ["query"],
    rowLimit: 5
  });
  const totals = rows.reduce((acc, r) => {
    acc.clicks += r.clicks;
    acc.impressions += r.impressions;
    return acc;
  }, {
    clicks: 0,
    impressions: 0
  });
  return {
    ok: true,
    site: siteUrl,
    sitesCount: entries.length,
    permissionLevel: match?.permissionLevel ?? null,
    sample: {
      range: {
        startDate,
        endDate
      },
      rowCount: rows.length,
      totals,
      rows: rows.map((r) => ({
        query: r.keys?.[0] ?? "",
        clicks: r.clicks,
        impressions: r.impressions,
        ctr: r.ctr,
        position: r.position
      }))
    },
    latencyMs: Date.now() - started
  };
});
const listSeoAlerts_createServerFn_handler = createServerRpc({
  id: "1cf5eeb65e982829d3aa286bb995e3431aeeb6f6043844353b0eecf345fea015",
  name: "listSeoAlerts",
  filename: "src/lib/seo-gsc.functions.ts"
}, (opts) => listSeoAlerts.__executeServer(opts));
const listSeoAlerts = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator(objectType({
  includeAcknowledged: booleanType().default(false)
}).parse).handler(listSeoAlerts_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireAdmin(context.userId);
  const {
    supabaseAdmin
  } = await import("./client.server-DUn3rRvm.mjs");
  let q = supabaseAdmin.from("seo_alerts").select("id, created_at, query, metric, prev_value, curr_value, pct_change, prev_window_start, prev_window_end, curr_window_start, curr_window_end, acknowledged_at").order("created_at", {
    ascending: false
  }).limit(100);
  if (!data.includeAcknowledged) q = q.is("acknowledged_at", null);
  const {
    data: rows,
    error
  } = await q;
  if (error) throw new Error(error.message);
  const {
    data: cfg
  } = await supabaseAdmin.from("seo_alert_config").select("min_impressions, drop_pct").eq("id", 1).maybeSingle();
  return {
    alerts: rows ?? [],
    config: {
      min_impressions: cfg?.min_impressions ?? 20,
      drop_pct: Number(cfg?.drop_pct ?? 50)
    }
  };
});
const acknowledgeSeoAlert_createServerFn_handler = createServerRpc({
  id: "93226e40162274ceca532d8ca5159640f4a4152c83ea2f6966a8a789426db95c",
  name: "acknowledgeSeoAlert",
  filename: "src/lib/seo-gsc.functions.ts"
}, (opts) => acknowledgeSeoAlert.__executeServer(opts));
const acknowledgeSeoAlert = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator(objectType({
  id: stringType().uuid()
}).parse).handler(acknowledgeSeoAlert_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireAdmin(context.userId);
  const {
    supabaseAdmin
  } = await import("./client.server-DUn3rRvm.mjs");
  const {
    error
  } = await supabaseAdmin.from("seo_alerts").update({
    acknowledged_at: (/* @__PURE__ */ new Date()).toISOString(),
    acknowledged_by: context.userId
  }).eq("id", data.id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const updateSeoAlertConfig_createServerFn_handler = createServerRpc({
  id: "edf33526009e2ba637219fd2726091bb730db07e19bd2e3f3c4e1874dd9d9643",
  name: "updateSeoAlertConfig",
  filename: "src/lib/seo-gsc.functions.ts"
}, (opts) => updateSeoAlertConfig.__executeServer(opts));
const updateSeoAlertConfig = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator(objectType({
  min_impressions: numberType().int().min(1).max(1e4),
  drop_pct: numberType().min(5).max(95)
}).parse).handler(updateSeoAlertConfig_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireAdmin(context.userId);
  const {
    supabaseAdmin
  } = await import("./client.server-DUn3rRvm.mjs");
  const {
    error
  } = await supabaseAdmin.from("seo_alert_config").update({
    min_impressions: data.min_impressions,
    drop_pct: data.drop_pct,
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  }).eq("id", 1);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const runSeoAlertSweep_createServerFn_handler = createServerRpc({
  id: "6d936304854b5d85803835b7142bb5d2f1cd6f1ccec88989a2363214de295704",
  name: "runSeoAlertSweep",
  filename: "src/lib/seo-gsc.functions.ts"
}, (opts) => runSeoAlertSweep.__executeServer(opts));
const runSeoAlertSweep = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(runSeoAlertSweep_createServerFn_handler, async ({
  context
}) => {
  await requireAdmin(context.userId);
  const {
    getRequest
  } = await import("./server-BKkhNWog.mjs").then(function(n) {
    return n.s;
  });
  const req = getRequest();
  const url = new URL("/api/public/hooks/seo-alerts", req.url);
  const res = await fetch(url.toString(), {
    method: "POST"
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`Sweep failed [${res.status}]: ${JSON.stringify(json)}`);
  return {
    result: JSON.stringify(json)
  };
});
const submitSitemap_createServerFn_handler = createServerRpc({
  id: "e88532aa8cfef9144d773909691832ab27861f448db6b4dc4cd8b090158a3956",
  name: "submitSitemap",
  filename: "src/lib/seo-gsc.functions.ts"
}, (opts) => submitSitemap.__executeServer(opts));
const submitSitemap = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator(objectType({
  feedpath: stringType().url().optional()
}).parse).handler(submitSitemap_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireAdmin(context.userId);
  const siteUrl = await getConfiguredSiteUrl();
  const siteEnc = encodeURIComponent(siteUrl);
  const feedpath = data.feedpath ?? sitemapForSite(siteUrl);
  const feedEnc = encodeURIComponent(feedpath);
  const putRes = await fetch(`${GATEWAY}/sites/${siteEnc}/sitemaps/${feedEnc}`, {
    method: "PUT",
    headers: gwHeaders()
  });
  if (!putRes.ok && putRes.status !== 204) {
    const txt = await putRes.text();
    throw new Error(`Sitemap submit failed [${putRes.status}]: ${txt.slice(0, 300)}`);
  }
  const getRes = await fetch(`${GATEWAY}/sites/${siteEnc}/sitemaps/${feedEnc}`, {
    headers: gwHeaders()
  });
  let status = null;
  if (getRes.ok) {
    const sm = await getRes.json();
    const c = sm.contents?.[0];
    status = {
      lastSubmitted: sm.lastSubmitted ?? null,
      lastDownloaded: sm.lastDownloaded ?? null,
      isPending: !!sm.isPending,
      errors: Number(sm.errors ?? 0),
      warnings: Number(sm.warnings ?? 0),
      submitted: Number(c?.submitted ?? 0),
      indexed: Number(c?.indexed ?? 0)
    };
  }
  return {
    ok: true,
    feedpath,
    status
  };
});
const inspectUrl_createServerFn_handler = createServerRpc({
  id: "3397750d47b78dd4c690501d626b15ffa1235edefba3f08f448b1662dd4a55e5",
  name: "inspectUrl",
  filename: "src/lib/seo-gsc.functions.ts"
}, (opts) => inspectUrl.__executeServer(opts));
const inspectUrl = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator(objectType({
  inspectionUrl: stringType().url()
}).parse).handler(inspectUrl_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireAdmin(context.userId);
  const siteUrl = await getConfiguredSiteUrl();
  const res = await fetch(`${GATEWAY_ROOT}/v1/urlInspection/index:inspect`, {
    method: "POST",
    headers: gwHeaders(),
    body: JSON.stringify({
      inspectionUrl: data.inspectionUrl,
      siteUrl
    })
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`URL inspection failed [${res.status}]: ${txt.slice(0, 300)}`);
  }
  const json = await res.json();
  const r = json.inspectionResult ?? {};
  const isr = r.indexStatusResult ?? {};
  return {
    inspectionUrl: data.inspectionUrl,
    verdict: isr.verdict ?? null,
    coverageState: isr.coverageState ?? null,
    robotsTxtState: isr.robotsTxtState ?? null,
    indexingState: isr.indexingState ?? null,
    lastCrawlTime: isr.lastCrawlTime ?? null,
    pageFetchState: isr.pageFetchState ?? null,
    googleCanonical: isr.googleCanonical ?? null,
    userCanonical: isr.userCanonical ?? null,
    crawledAs: isr.crawledAs ?? null,
    referringUrls: isr.referringUrls ?? [],
    sitemaps: isr.sitemap ?? [],
    mobileVerdict: r.mobileUsabilityResult?.verdict ?? null,
    richResultsVerdict: r.richResultsResult?.verdict ?? null,
    inspectionResultLink: r.inspectionResultLink ?? null
  };
});
const listGscSites_createServerFn_handler = createServerRpc({
  id: "0497f6db6ccb16c005d8e32b3adf55954450b873a3924e373e42257074c8a1bf",
  name: "listGscSites",
  filename: "src/lib/seo-gsc.functions.ts"
}, (opts) => listGscSites.__executeServer(opts));
const listGscSites = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(listGscSites_createServerFn_handler, async ({
  context
}) => {
  await requireAdmin(context.userId);
  const res = await fetch(`${GATEWAY}/sites`, {
    headers: gwHeaders()
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`GSC /sites failed [${res.status}]: ${txt.slice(0, 300)}`);
  }
  const json = await res.json();
  return {
    sites: json.siteEntry ?? []
  };
});
const getGscSettings_createServerFn_handler = createServerRpc({
  id: "31f8b3c562fe45127656c1a591d68cbe5339e67f8062f61118ea02c9c3b6ed49",
  name: "getGscSettings",
  filename: "src/lib/seo-gsc.functions.ts"
}, (opts) => getGscSettings.__executeServer(opts));
const getGscSettings = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(getGscSettings_createServerFn_handler, async ({
  context
}) => {
  await requireAdmin(context.userId);
  const {
    supabaseAdmin
  } = await import("./client.server-DUn3rRvm.mjs");
  const {
    data
  } = await supabaseAdmin.from("gsc_settings").select("site_url, updated_at").eq("id", 1).maybeSingle();
  return {
    site_url: data?.site_url ?? DEFAULT_SITE_URL,
    updated_at: data?.updated_at ?? null
  };
});
const saveGscSettings_createServerFn_handler = createServerRpc({
  id: "72ac26951bd07192ffa120a62ae4750acbd1cc8207d347c14846d11880bc5948",
  name: "saveGscSettings",
  filename: "src/lib/seo-gsc.functions.ts"
}, (opts) => saveGscSettings.__executeServer(opts));
const saveGscSettings = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator(objectType({
  site_url: stringType().min(4).max(255)
}).parse).handler(saveGscSettings_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireAdmin(context.userId);
  const {
    supabaseAdmin
  } = await import("./client.server-DUn3rRvm.mjs");
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const {
    data: row,
    error
  } = await supabaseAdmin.from("gsc_settings").upsert({
    id: 1,
    site_url: data.site_url,
    updated_at: now,
    updated_by: context.userId
  }).select("site_url, updated_at").single();
  if (error) throw new Error(error.message);
  return {
    site_url: row.site_url,
    updated_at: row.updated_at
  };
});
export {
  acknowledgeSeoAlert_createServerFn_handler,
  getGscOverview_createServerFn_handler,
  getGscSettings_createServerFn_handler,
  inspectUrl_createServerFn_handler,
  listGscSites_createServerFn_handler,
  listSeoAlerts_createServerFn_handler,
  pingGsc_createServerFn_handler,
  runSeoAlertSweep_createServerFn_handler,
  saveGscSettings_createServerFn_handler,
  submitSitemap_createServerFn_handler,
  updateSeoAlertConfig_createServerFn_handler
};
