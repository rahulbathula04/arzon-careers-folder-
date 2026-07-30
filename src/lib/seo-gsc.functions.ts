import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { requireAdmin } from "@/server/auth-guards.server";

const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console/webmasters/v3";
const GATEWAY_ROOT = "https://connector-gateway.lovable.dev/google_search_console";
const DEFAULT_SITE_URL = "https://arzoncareers.in/";

/** Read the currently configured GSC property URL from the settings table. */
async function getConfiguredSiteUrl(): Promise<string> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data } = await supabaseAdmin
    .from("gsc_settings")
    .select("site_url")
    .eq("id", 1)
    .maybeSingle();
  return data?.site_url ?? DEFAULT_SITE_URL;
}

function sitemapForSite(siteUrl: string) {
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
    "Content-Type": "application/json",
  } as const;
}

function isoDaysAgo(days: number) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString().slice(0, 10);
}

type SARow = {
  keys?: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

async function gscQuery(siteUrl: string, body: Record<string, unknown>): Promise<SARow[]> {
  const res = await fetch(`${GATEWAY}/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`, {
    method: "POST",
    headers: gwHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`GSC query failed [${res.status}]: ${txt.slice(0, 200)}`);
  }
  const json = (await res.json()) as { rows?: SARow[] };
  return json.rows ?? [];
}

export type GscOverview = {
  range: { startDate: string; endDate: string; days: number };
  totals: { clicks: number; impressions: number; ctr: number; position: number };
  daily: Array<{
    date: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  }>;
  topQueries: Array<{
    query: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  }>;
  topPages: Array<{
    page: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  }>;
  countries: Array<{ country: string; clicks: number; impressions: number }>;
  devices: Array<{ device: string; clicks: number; impressions: number; ctr: number }>;
  sitemap: {
    submitted: number;
    indexed: number;
    errors: number;
    warnings: number;
    lastSubmitted: string | null;
    lastDownloaded: string | null;
    isPending: boolean;
  } | null;
};

export const getGscOverview = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ days: z.number().int().min(7).max(90).default(28) }).parse)
  .handler(async ({ data, context }): Promise<GscOverview> => {
    await requireAdmin(context.userId);

    const endDate = isoDaysAgo(2); // GSC has ~2 day lag
    const startDate = isoDaysAgo(2 + data.days);
    const siteUrl = await getConfiguredSiteUrl();
    const siteEnc = encodeURIComponent(siteUrl);

    const [daily, queries, pages, countries, devices, sitemapRes] = await Promise.all([
      gscQuery(siteUrl, { startDate, endDate, dimensions: ["date"], rowLimit: 100 }),
      gscQuery(siteUrl, { startDate, endDate, dimensions: ["query"], rowLimit: 25 }),
      gscQuery(siteUrl, { startDate, endDate, dimensions: ["page"], rowLimit: 25 }),
      gscQuery(siteUrl, { startDate, endDate, dimensions: ["country"], rowLimit: 10 }),
      gscQuery(siteUrl, { startDate, endDate, dimensions: ["device"], rowLimit: 10 }),
      fetch(`${GATEWAY}/sites/${siteEnc}/sitemaps`, { headers: gwHeaders() }),
    ]);

    const totals = daily.reduce(
      (acc, r) => {
        acc.clicks += r.clicks;
        acc.impressions += r.impressions;
        acc._posWeight += r.position * r.impressions;
        return acc;
      },
      { clicks: 0, impressions: 0, _posWeight: 0 },
    );
    const ctr = totals.impressions ? totals.clicks / totals.impressions : 0;
    const position = totals.impressions ? totals._posWeight / totals.impressions : 0;

    let sitemap: GscOverview["sitemap"] = null;
    if (sitemapRes.ok) {
      const sj = (await sitemapRes.json()) as {
        sitemap?: Array<{
          lastSubmitted: string;
          lastDownloaded?: string;
          isPending: boolean;
          warnings: string;
          errors: string;
          contents?: Array<{ submitted: string; indexed: string }>;
        }>;
      };
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
          isPending: !!sm.isPending,
        };
      }
    }

    return {
      range: { startDate, endDate, days: data.days },
      totals: { clicks: totals.clicks, impressions: totals.impressions, ctr, position },
      daily: daily.map((r) => ({
        date: r.keys?.[0] ?? "",
        clicks: r.clicks,
        impressions: r.impressions,
        ctr: r.ctr,
        position: r.position,
      })),
      topQueries: queries.map((r) => ({
        query: r.keys?.[0] ?? "",
        clicks: r.clicks,
        impressions: r.impressions,
        ctr: r.ctr,
        position: r.position,
      })),
      topPages: pages.map((r) => ({
        page: r.keys?.[0] ?? "",
        clicks: r.clicks,
        impressions: r.impressions,
        ctr: r.ctr,
        position: r.position,
      })),
      countries: countries.map((r) => ({
        country: r.keys?.[0] ?? "",
        clicks: r.clicks,
        impressions: r.impressions,
      })),
      devices: devices.map((r) => ({
        device: r.keys?.[0] ?? "",
        clicks: r.clicks,
        impressions: r.impressions,
        ctr: r.ctr,
      })),
      sitemap,
    };
  });

export type SeoAlert = {
  id: string;
  created_at: string;
  query: string;
  metric: "clicks" | "impressions";
  prev_value: number;
  curr_value: number;
  pct_change: number;
  prev_window_start: string;
  prev_window_end: string;
  curr_window_start: string;
  curr_window_end: string;
  acknowledged_at: string | null;
};

export type SeoAlertConfig = { min_impressions: number; drop_pct: number };

export type GscPingResult = {
  ok: true;
  site: string;
  sitesCount: number;
  permissionLevel: string | null;
  sample: {
    range: { startDate: string; endDate: string };
    rowCount: number;
    totals: { clicks: number; impressions: number };
    rows: Array<{
      query: string;
      clicks: number;
      impressions: number;
      ctr: number;
      position: number;
    }>;
  };
  latencyMs: number;
};

/**
 * End-to-end connectivity check for the Google Search Console connector.
 * Verifies both the sites list endpoint and a small searchAnalytics/query
 * sample so a successful response confirms both the gateway auth and the
 * property permissions.
 */
export const pingGsc = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<GscPingResult> => {
    await requireAdmin(context.userId);
    const started = Date.now();
    const siteUrl = await getConfiguredSiteUrl();

    const sitesRes = await fetch(`${GATEWAY}/sites`, { headers: gwHeaders() });
    if (!sitesRes.ok) {
      const txt = await sitesRes.text();
      throw new Error(`GSC /sites failed [${sitesRes.status}]: ${txt.slice(0, 300)}`);
    }
    const sitesJson = (await sitesRes.json()) as {
      siteEntry?: Array<{ siteUrl: string; permissionLevel: string }>;
    };
    const entries = sitesJson.siteEntry ?? [];
    const match = entries.find((s) => s.siteUrl === siteUrl);

    const endDate = isoDaysAgo(2);
    const startDate = isoDaysAgo(2 + 7);
    const rows = await gscQuery(siteUrl, {
      startDate,
      endDate,
      dimensions: ["query"],
      rowLimit: 5,
    });

    const totals = rows.reduce(
      (acc, r) => {
        acc.clicks += r.clicks;
        acc.impressions += r.impressions;
        return acc;
      },
      { clicks: 0, impressions: 0 },
    );

    return {
      ok: true,
      site: siteUrl,
      sitesCount: entries.length,
      permissionLevel: match?.permissionLevel ?? null,
      sample: {
        range: { startDate, endDate },
        rowCount: rows.length,
        totals,
        rows: rows.map((r) => ({
          query: r.keys?.[0] ?? "",
          clicks: r.clicks,
          impressions: r.impressions,
          ctr: r.ctr,
          position: r.position,
        })),
      },
      latencyMs: Date.now() - started,
    };
  });

export const listSeoAlerts = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ includeAcknowledged: z.boolean().default(false) }).parse)
  .handler(async ({ data, context }): Promise<{ alerts: SeoAlert[]; config: SeoAlertConfig }> => {
    await requireAdmin(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    let q = supabaseAdmin
      .from("seo_alerts")
      .select(
        "id, created_at, query, metric, prev_value, curr_value, pct_change, prev_window_start, prev_window_end, curr_window_start, curr_window_end, acknowledged_at",
      )
      .order("created_at", { ascending: false })
      .limit(100);
    if (!data.includeAcknowledged) q = q.is("acknowledged_at", null);
    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);
    const { data: cfg } = await supabaseAdmin
      .from("seo_alert_config")
      .select("min_impressions, drop_pct")
      .eq("id", 1)
      .maybeSingle();
    return {
      alerts: (rows ?? []) as SeoAlert[],
      config: {
        min_impressions: cfg?.min_impressions ?? 20,
        drop_pct: Number(cfg?.drop_pct ?? 50),
      },
    };
  });

export const acknowledgeSeoAlert = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ id: z.string().uuid() }).parse)
  .handler(async ({ data, context }) => {
    await requireAdmin(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("seo_alerts")
      .update({ acknowledged_at: new Date().toISOString(), acknowledged_by: context.userId })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const updateSeoAlertConfig = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    z.object({
      min_impressions: z.number().int().min(1).max(10000),
      drop_pct: z.number().min(5).max(95),
    }).parse,
  )
  .handler(async ({ data, context }) => {
    await requireAdmin(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("seo_alert_config")
      .update({
        min_impressions: data.min_impressions,
        drop_pct: data.drop_pct,
        updated_at: new Date().toISOString(),
      })
      .eq("id", 1);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Manually run the alert sweep - calls the public hook on the same origin. */
export const runSeoAlertSweep = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requireAdmin(context.userId);
    const { getRequest } = await import("@tanstack/react-start/server");
    const req = getRequest();
    const url = new URL("/api/public/hooks/seo-alerts", req.url);
    const res = await fetch(url.toString(), { method: "POST" });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(`Sweep failed [${res.status}]: ${JSON.stringify(json)}`);
    return { result: JSON.stringify(json) };
  });

export type SitemapSubmitResult = {
  ok: true;
  feedpath: string;
  status: {
    lastSubmitted: string | null;
    lastDownloaded: string | null;
    isPending: boolean;
    errors: number;
    warnings: number;
    submitted: number;
    indexed: number;
  } | null;
};

/** Submit (or re-submit) the sitemap to Google Search Console, then read back its status. */
export const submitSitemap = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ feedpath: z.string().url().optional() }).parse)
  .handler(async ({ data, context }): Promise<SitemapSubmitResult> => {
    await requireAdmin(context.userId);
    const siteUrl = await getConfiguredSiteUrl();
    const siteEnc = encodeURIComponent(siteUrl);
    const feedpath = data.feedpath ?? sitemapForSite(siteUrl);
    const feedEnc = encodeURIComponent(feedpath);

    const putRes = await fetch(`${GATEWAY}/sites/${siteEnc}/sitemaps/${feedEnc}`, {
      method: "PUT",
      headers: gwHeaders(),
    });
    if (!putRes.ok && putRes.status !== 204) {
      const txt = await putRes.text();
      throw new Error(`Sitemap submit failed [${putRes.status}]: ${txt.slice(0, 300)}`);
    }

    // Read back status
    const getRes = await fetch(`${GATEWAY}/sites/${siteEnc}/sitemaps/${feedEnc}`, {
      headers: gwHeaders(),
    });
    let status: SitemapSubmitResult["status"] = null;
    if (getRes.ok) {
      const sm = (await getRes.json()) as {
        lastSubmitted?: string;
        lastDownloaded?: string;
        isPending?: boolean;
        errors?: string;
        warnings?: string;
        contents?: Array<{ submitted?: string; indexed?: string }>;
      };
      const c = sm.contents?.[0];
      status = {
        lastSubmitted: sm.lastSubmitted ?? null,
        lastDownloaded: sm.lastDownloaded ?? null,
        isPending: !!sm.isPending,
        errors: Number(sm.errors ?? 0),
        warnings: Number(sm.warnings ?? 0),
        submitted: Number(c?.submitted ?? 0),
        indexed: Number(c?.indexed ?? 0),
      };
    }
    return { ok: true, feedpath, status };
  });

export type UrlInspectionResult = {
  inspectionUrl: string;
  verdict: string | null;
  coverageState: string | null;
  robotsTxtState: string | null;
  indexingState: string | null;
  lastCrawlTime: string | null;
  pageFetchState: string | null;
  googleCanonical: string | null;
  userCanonical: string | null;
  crawledAs: string | null;
  referringUrls: string[];
  sitemaps: string[];
  mobileVerdict: string | null;
  richResultsVerdict: string | null;
  inspectionResultLink: string | null;
};

/** Query the URL Inspection API for a single URL on the connected property. */
export const inspectUrl = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ inspectionUrl: z.string().url() }).parse)
  .handler(async ({ data, context }): Promise<UrlInspectionResult> => {
    await requireAdmin(context.userId);
    const siteUrl = await getConfiguredSiteUrl();
    const res = await fetch(`${GATEWAY_ROOT}/v1/urlInspection/index:inspect`, {
      method: "POST",
      headers: gwHeaders(),
      body: JSON.stringify({ inspectionUrl: data.inspectionUrl, siteUrl }),
    });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`URL inspection failed [${res.status}]: ${txt.slice(0, 300)}`);
    }
    const json = (await res.json()) as {
      inspectionResult?: {
        inspectionResultLink?: string;
        indexStatusResult?: {
          verdict?: string;
          coverageState?: string;
          robotsTxtState?: string;
          indexingState?: string;
          lastCrawlTime?: string;
          pageFetchState?: string;
          googleCanonical?: string;
          userCanonical?: string;
          crawledAs?: string;
          referringUrls?: string[];
          sitemap?: string[];
        };
        mobileUsabilityResult?: { verdict?: string };
        richResultsResult?: { verdict?: string };
      };
    };
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
      inspectionResultLink: r.inspectionResultLink ?? null,
    };
  });

export type GscSite = { siteUrl: string; permissionLevel: string };

/** List every GSC property the connected account can see. */
export const listGscSites = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<{ sites: GscSite[] }> => {
    await requireAdmin(context.userId);
    const res = await fetch(`${GATEWAY}/sites`, { headers: gwHeaders() });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`GSC /sites failed [${res.status}]: ${txt.slice(0, 300)}`);
    }
    const json = (await res.json()) as { siteEntry?: GscSite[] };
    return { sites: json.siteEntry ?? [] };
  });

export type GscSettings = { site_url: string; updated_at: string | null };

export const getGscSettings = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<GscSettings> => {
    await requireAdmin(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data } = await supabaseAdmin
      .from("gsc_settings")
      .select("site_url, updated_at")
      .eq("id", 1)
      .maybeSingle();
    return {
      site_url: data?.site_url ?? DEFAULT_SITE_URL,
      updated_at: data?.updated_at ?? null,
    };
  });

export const saveGscSettings = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ site_url: z.string().min(4).max(255) }).parse)
  .handler(async ({ data, context }): Promise<GscSettings> => {
    await requireAdmin(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const now = new Date().toISOString();
    const { data: row, error } = await supabaseAdmin
      .from("gsc_settings")
      .upsert({ id: 1, site_url: data.site_url, updated_at: now, updated_by: context.userId })
      .select("site_url, updated_at")
      .single();
    if (error) throw new Error(error.message);
    return { site_url: row.site_url, updated_at: row.updated_at };
  });
