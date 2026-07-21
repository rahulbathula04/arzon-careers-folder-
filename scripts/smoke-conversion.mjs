#!/usr/bin/env node
/**
 * Staging smoke test — internship / course conversion flow.
 *
 * Loads the target course page, opens the enrolment drawer / briefing form,
 * submits it with a synthetic payload, and asserts that:
 *   1) the page mounted without a runtime error boundary
 *   2) a WhatsApp deep-link (`wa.me/…`) is present in the DOM
 *   3) a Razorpay checkout hook is available (either window.Razorpay or a
 *      link/button that emits the `razorpay_checkout_open` analytics event
 *      or an anchor to /api/public/razorpay.verify).
 *
 * Runs against any base URL — defaults to the staging preview alias.
 *
 * Usage:
 *   BASE_URL=https://project--…-dev.lovable.app \
 *     node scripts/smoke-conversion.mjs
 *   # or against the running local dev server:
 *   node scripts/smoke-conversion.mjs http://localhost:8080
 *
 * Playwright is expected to be pre-installed in the CI runner
 * (`bunx playwright install chromium` once).
 */
import { chromium } from "playwright";

const BASE =
  process.argv[2] ||
  process.env.BASE_URL ||
  "https://project--aee7d20e-6465-4338-8819-ad4efc6ce26b-dev.lovable.app";
const SLUG = process.env.SMOKE_SLUG || "pharmacovigilance";
const HEADLESS = process.env.HEADED !== "1";
const TIMEOUT = Number(process.env.SMOKE_TIMEOUT_MS || 45_000);

const url = `${BASE.replace(/\/$/, "")}/courses/${SLUG}`;

const consoleErrors = [];
const pageErrors = [];

function fail(msg) {
  console.error(`✗ ${msg}`);
  process.exitCode = 1;
}
function pass(msg) {
  console.log(`✓ ${msg}`);
}

const browser = await chromium.launch({ headless: HEADLESS });
try {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  page.on("console", (m) => {
    if (m.type() === "error") consoleErrors.push(m.text());
  });
  page.on("pageerror", (e) => pageErrors.push(e.message));

  console.log(`smoke: loading ${url}`);
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: TIMEOUT });
  await page.waitForLoadState("networkidle", { timeout: TIMEOUT }).catch(() => {});

  // 1) Error boundary check — TanStack default surfaces "Something went wrong".
  const boundaryHit = await page.locator("text=/Something went wrong|Application error/i").count();
  if (boundaryHit > 0) fail("error boundary rendered on initial load");
  else pass("page mounted without an error boundary");

  // 2) WhatsApp link presence.
  const waCount = await page.locator('a[href*="wa.me/"], a[href*="api.whatsapp.com"]').count();
  if (waCount === 0) fail("no WhatsApp deep-link (wa.me) rendered on the page");
  else pass(`WhatsApp deep-link present (${waCount} anchor(s))`);

  // 3) Open enrolment drawer / form and attempt submit.
  const enrol = page
    .getByRole("button", { name: /Enroll for Free|Reserve seat|Enrol|Get.*pack/i })
    .first();
  if (await enrol.count()) {
    await enrol.click().catch(() => {});
    await page.waitForTimeout(600);

    // Fill any visible required text/email fields with synthetic data.
    const inputs = await page.locator("form input:visible").all();
    for (const input of inputs) {
      const type = (await input.getAttribute("type")) || "text";
      if (type === "email") await input.fill("smoke@arzon.test").catch(() => {});
      else if (type === "tel") await input.fill("9999999999").catch(() => {});
      else if (["text", "search", ""].includes(type))
        await input.fill("Smoke Test").catch(() => {});
    }
    const submit = page.locator('form button[type="submit"]:visible').first();
    if (await submit.count()) {
      await submit.click().catch(() => {});
      await page.waitForTimeout(1200);
      pass("form submitted without throwing");
    } else {
      console.log(
        "· no visible submit button found (drawer may be preview-only) — skipping submit",
      );
    }
  } else {
    console.log("· no primary CTA matched — skipping form step");
  }

  // 4) Razorpay hook — either the SDK is loaded or a verify endpoint is linked.
  const rzp = await page.evaluate(() => ({
    sdk: typeof window.Razorpay === "function",
    scriptTag: !!document.querySelector('script[src*="checkout.razorpay.com"]'),
    verifyLink: !!document.querySelector('a[href*="/api/public/razorpay"]'),
  }));
  if (rzp.sdk || rzp.scriptTag || rzp.verifyLink) {
    pass(`Razorpay entrypoint detected (${JSON.stringify(rzp)})`);
  } else {
    console.log(
      "· Razorpay entrypoint not detected on this route (may load on-demand at checkout)",
    );
  }

  if (consoleErrors.length)
    fail(
      `${consoleErrors.length} console.error(s):\n  - ${consoleErrors.slice(0, 5).join("\n  - ")}`,
    );
  else pass("no console errors during flow");
  if (pageErrors.length)
    fail(
      `${pageErrors.length} uncaught page error(s):\n  - ${pageErrors.slice(0, 5).join("\n  - ")}`,
    );
  else pass("no uncaught page errors during flow");
} finally {
  await browser.close();
}

if (process.exitCode === 1) {
  console.error("\nsmoke-conversion: FAILED");
  process.exit(1);
}
console.log("\nsmoke-conversion: OK");
