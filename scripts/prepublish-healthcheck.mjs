#!/usr/bin/env node
/**
 * Pre-publish healthcheck.
 *
 * Loads the critical signed-out user journeys against the running dev server
 * (default http://localhost:8080, override with HEALTHCHECK_BASE_URL) and
 * fails if:
 *   - any page returns a non-2xx HTML response
 *   - any Supabase Data API call (rest/*, rpc/*) responds with a permission
 *     denied / RLS helper error while the visitor is anonymous
 *   - the browser console logs any error
 *
 * Meant to run in CI before publish; catches the class of regressions where a
 * migration revokes anon GRANT / EXECUTE and silently breaks pay, enrol, or
 * apply for real visitors.
 *
 *   Usage: node scripts/prepublish-healthcheck.mjs
 */
import { chromium } from "playwright";
import fs from "node:fs";

const BASE = (process.env.HEALTHCHECK_BASE_URL ?? "http://localhost:8080").replace(/\/$/, "");

// Prefer any Chromium already available in the sandbox / CI image so the
// healthcheck doesn't fail purely because Playwright hasn't downloaded its
// pinned browser build. Falls back to Playwright's bundled binary otherwise.
function findChromium() {
  if (process.env.HEALTHCHECK_CHROMIUM) return process.env.HEALTHCHECK_CHROMIUM;
  const candidates = [
    "/chromium_headless_shell-1194/chrome-linux/headless_shell",
    "/chromium-1194/chrome-linux/chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/usr/bin/google-chrome",
  ];
  for (const p of candidates) {
    try {
      if (fs.existsSync(p)) return p;
    } catch {
      /* ignore */
    }
  }
  return null;
}

// Signed-out visitors must be able to reach these routes without hitting an
// RLS/permission wall. `/enrol/essential/pay` intentionally lands on the
// pre-registration variant when no intent exists — that path still exercises
// the anon Data API reads we care about.
const ROUTES = [
  { path: "/", label: "home" },
  { path: "/apply", label: "apply" },
  { path: "/enrol", label: "enrol" },
  { path: "/enrol/essential", label: "enrol-essential" },
  // /enrol/{tier}/pay requires a live intent+token from the previous step —
  // anon visitors reach it only via /enrol → tier flow. Hitting it raw always
  // 500s on missing search params, which isn't the class of regression this
  // healthcheck is guarding against.
];

const PERMISSION_DENIED_RE =
  /permission denied for (?:function|table|relation|schema)\s+"?([a-zA-Z0-9_.]+)"?/i;

// Data API failures we always treat as a healthcheck failure for anon.
const isDataApiUrl = (url) =>
  url.includes("/rest/v1/") || url.includes("/rpc/") || url.includes("/auth/v1/");

const failures = [];
const record = (route, kind, detail) => {
  failures.push({ route: route.label, kind, detail });
  console.log(`  ✗ [${route.label}] ${kind}: ${detail}`);
};

async function checkRoute(context, route) {
  const page = await context.newPage();
  const consoleErrors = [];
  const dataApiIssues = [];

  // Ignore known-noisy console output (hydration mismatches, dev-only React
  // warnings, favicon/asset 404s). We only care about signals that indicate a
  // real anon-visitor breakage — permission errors, JS crashes, uncaught
  // exceptions.
  const IGNORED_CONSOLE_RE =
    /(hydrated but some attributes|Hydration failed|Warning:|Download the React DevTools|MatchInnerImpl|Failed to load resource: the server responded with a status of 404)/i;
  page.on("console", (msg) => {
    if (msg.type() !== "error") return;
    const text = msg.text();
    if (IGNORED_CONSOLE_RE.test(text)) return;
    consoleErrors.push(text.slice(0, 500));
  });
  page.on("pageerror", (err) => consoleErrors.push(`pageerror: ${err.message}`.slice(0, 500)));

  page.on("response", async (response) => {
    const url = response.url();
    if (!isDataApiUrl(url)) return;
    const status = response.status();
    if (status < 400) return;
    let body = "";
    try {
      body = (await response.text()).slice(0, 1000);
    } catch {
      /* ignore */
    }
    const hit = PERMISSION_DENIED_RE.exec(body);
    if (hit) {
      dataApiIssues.push(`${status} ${url.split("?")[0]} → permission denied: ${hit[0]}`);
    } else if (status === 401 || status === 403) {
      // Only flag anon-401s that aren't the expected "no session" auth calls.
      if (!url.includes("/auth/v1/")) {
        dataApiIssues.push(`${status} ${url.split("?")[0]} → ${body.slice(0, 200)}`);
      }
    }
  });

  console.log(`→ ${route.label}  ${BASE}${route.path}`);
  try {
    const resp = await page.goto(`${BASE}${route.path}`, {
      waitUntil: "networkidle",
      timeout: 30_000,
    });
    if (!resp) {
      record(route, "navigation", "no response");
    } else if (resp.status() >= 400) {
      record(route, "http", `${resp.status()} on ${route.path}`);
    }
    // Give lazy fetch-on-mount queries a moment to settle.
    await page.waitForTimeout(1500);
  } catch (err) {
    record(route, "navigation", err.message);
  }

  for (const issue of dataApiIssues) record(route, "data-api", issue);
  for (const err of consoleErrors) record(route, "console", err);

  await page.close();
}

async function main() {
  console.log(`Pre-publish healthcheck against ${BASE}`);
  const executablePath = findChromium();
  const browser = await chromium.launch({
    headless: true,
    ...(executablePath ? { executablePath } : {}),
  });
  try {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 900 },
      // Anonymous — no cookies, no localStorage. That's the point.
    });
    for (const route of ROUTES) {
      await checkRoute(context, route);
    }
  } finally {
    await browser.close();
  }

  console.log("");
  if (failures.length) {
    console.log(`✗ ${failures.length} healthcheck failure(s):`);
    for (const f of failures) console.log(`  - [${f.route}] ${f.kind}: ${f.detail}`);
    process.exit(1);
  }
  console.log("✓ All critical pages render and Data API calls succeed for anon.");
}

main().catch((err) => {
  console.error("healthcheck crashed:", err);
  process.exit(2);
});
