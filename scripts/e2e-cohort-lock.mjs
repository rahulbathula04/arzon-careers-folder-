#!/usr/bin/env node
/**
 * E2E smoke test for the locked-cohort flow.
 *
 * Verifies:
 *   1. /waitlist renders and exposes the WhatsApp link.
 *   2. The link still works after a hard refresh (server-driven).
 *   3. The locked CTA on /(home) routes users to /waitlist instead of
 *      opening Razorpay.
 *
 * Skipped automatically if Playwright isn't installed. Run with:
 *   node scripts/e2e-cohort-lock.mjs
 */
import { existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const SHOTS = "/tmp/browser/cohort-lock";
if (!existsSync(SHOTS)) mkdirSync(SHOTS, { recursive: true });

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  console.warn("[e2e-cohort-lock] Playwright not installed - skipping.");
  process.exit(0);
}

const BASE = process.env.E2E_BASE_URL ?? "http://localhost:8080";

function assert(cond, msg) {
  if (!cond) {
    console.error("FAIL:", msg);
    process.exitCode = 1;
  } else {
    console.log("OK:", msg);
  }
}

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 1800 } });
const page = await ctx.newPage();

// 1. Waitlist renders.
await page.goto(`${BASE}/waitlist`, { waitUntil: "domcontentloaded" });
await page.screenshot({ path: resolve(SHOTS, "1_waitlist.png") });
const wa = page.getByTestId("waitlist-whatsapp");
assert((await wa.count()) > 0, "waitlist page exposes WhatsApp CTA");
const href = await wa.first().getAttribute("href");
assert(href && href.includes("wa.me/919121283638"), "WhatsApp link uses business number");

// 2. Reload - state must survive a hard refresh.
await page.reload({ waitUntil: "domcontentloaded" });
await page.screenshot({ path: resolve(SHOTS, "2_waitlist_reload.png") });
assert(
  (await page.getByTestId("waitlist-whatsapp").count()) > 0,
  "waitlist persists across reload",
);

// 3. If the cohort is locked, the home countdown should link to /waitlist.
await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(1500);
const lockedCta = page.getByTestId("cohort-locked-cta");
if ((await lockedCta.count()) > 0) {
  const ctaHref = await lockedCta.first().getAttribute("href");
  assert(ctaHref === "/waitlist", "locked CTA routes to /waitlist, not Razorpay");
  await page.screenshot({ path: resolve(SHOTS, "3_home_locked.png") });
} else {
  console.log("INFO: cohort not currently locked - skipping home CTA assertion.");
}

await browser.close();
process.exit(process.exitCode ?? 0);
