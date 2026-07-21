import { test, expect } from "@playwright/test";

const MOBILE_USE = {
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
  deviceScaleFactor: 3,
} as const;

/**
 * Public-routes smoke.
 *
 * For every user-facing route we assert:
 *   1. HTTP 2xx (or the explicit 404 the placements ledger returns while empty).
 *   2. Body renders substantial content (>200 chars of visible text) — no
 *      blank-page regressions from a route deletion or a loader that throws.
 *   3. No blocking console errors during the initial paint.
 *   4. Mobile viewport: the persistent nav menu button is visible.
 *   5. Desktop viewport: the persistent nav "Apply" pill is visible.
 *
 * Separately we assert the mobile sticky CTA (WhatsApp FAB) is reachable
 * on routes where it should appear once the user has scrolled past the hero.
 */

// Routes that render inside the marketing shell (with site Nav).
const PUBLIC_ROUTES = [
  "/",
  "/courses",
  "/courses/clinical-data-management",
  "/courses/pharmacovigilance",
  "/courses/medical-coding",
  "/courses/compare",
  "/curriculum",
  "/methodology",
  "/jd-mirror",
  "/deployment-model",
  "/why-arzon",
  "/credibility",
  "/trust-report",
  "/roadmap",
  "/republic",
  "/refer",
  "/refund",
  "/faq",
  "/contact",
  "/waitlist",
  "/cohorts",
  "/changelog",
  "/verify",
  "/industry",
  "/industry/salaries",
  "/industry/employers",
  "/internships",
  "/moments",
  "/build",
  "/tpos",
  "/recruiters",
  "/about",
  "/acri",
  "/legal/privacy",
  "/legal/terms",
  // /placements is a documented conditional 404 (empty ledger) — covered
  // separately in its own test below.
] as const;

// Funnel routes render inside their own shell (no marketing Nav). We still
// smoke-check that they load with no console errors and real content.
const FUNNEL_ROUTES = ["/career-engine", "/enrol"] as const;

const CONSOLE_NOISE =
  /favicon|analytics|tracking|GA4|gtag|Failed to load resource|hydrated but some attributes/i;

async function captureConsoleErrors(page: import("@playwright/test").Page) {
  const errors: string[] = [];
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
  return () => errors.filter((e) => !CONSOLE_NOISE.test(e));
}

test.describe("public routes smoke — mobile (iPhone 12)", () => {
  test.use(MOBILE_USE);

  for (const path of PUBLIC_ROUTES) {
    test(`GET ${path} renders, no console errors, nav visible`, async ({ page }) => {
      const drainErrors = await captureConsoleErrors(page);
      const res = await page.goto(path, { waitUntil: "domcontentloaded" });
      expect(res, `no response for ${path}`).not.toBeNull();
      expect(res!.status(), `HTTP status for ${path}`).toBeLessThan(400);

      await page.waitForLoadState("networkidle").catch(() => {});

      const bodyLen = await page.evaluate(() => (document.body?.innerText ?? "").trim().length);
      expect(bodyLen, `body text length for ${path}`).toBeGreaterThan(200);

      // Persistent mobile nav — hamburger button is always mounted below xl.
      await expect(page.getByTestId("nav-menu-button")).toBeVisible();

      const errors = drainErrors();
      expect(errors, `console.error for ${path}: ${errors.join(" | ")}`).toHaveLength(0);
    });
  }
});

test.describe("public routes smoke — desktop (1440×900)", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  for (const path of PUBLIC_ROUTES) {
    test(`GET ${path} renders, no console errors, apply CTA visible`, async ({ page }) => {
      const drainErrors = await captureConsoleErrors(page);
      const res = await page.goto(path, { waitUntil: "domcontentloaded" });
      expect(res!.status(), `HTTP status for ${path}`).toBeLessThan(400);

      await page.waitForLoadState("networkidle").catch(() => {});

      const bodyLen = await page.evaluate(() => (document.body?.innerText ?? "").trim().length);
      expect(bodyLen, `body text length for ${path}`).toBeGreaterThan(200);

      // Persistent desktop primary CTA in the nav.
      await expect(page.getByTestId("nav-apply-cta")).toBeVisible();

      const errors = drainErrors();
      expect(errors, `console.error for ${path}: ${errors.join(" | ")}`).toHaveLength(0);
    });
  }
});

test.describe("mobile sticky WhatsApp FAB — /verify", () => {
  test.use(MOBILE_USE);

  // /verify has no hero (#top) so the FAB defaults to visible on mount —
  // this is the most deterministic route to assert the sticky CTA is
  // actually mounted in the DOM. Coverage of the FAB's scroll-reveal
  // behaviour on hero-bearing routes lives in ab-sticky-cta.spec.ts.
  test("FAB is mounted on /verify", async ({ page }) => {
    await page.goto("/verify", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(200);
    await expect(page.getByTestId("mobile-sticky-cta")).toBeVisible({
      timeout: 5000,
    });
  });
});

test.describe("funnel routes smoke", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  for (const path of FUNNEL_ROUTES) {
    test(`GET ${path} renders`, async ({ page }) => {
      const drainErrors = await captureConsoleErrors(page);
      const res = await page.goto(path, { waitUntil: "domcontentloaded" });
      expect(res!.status(), `HTTP status for ${path}`).toBeLessThan(400);
      await page.waitForLoadState("networkidle").catch(() => {});
      const bodyLen = await page.evaluate(() => (document.body?.innerText ?? "").trim().length);
      expect(bodyLen).toBeGreaterThan(200);
      const errors = drainErrors();
      expect(errors, `console.error for ${path}: ${errors.join(" | ")}`).toHaveLength(0);
    });
  }
});

test.describe("placements ledger — conditional 404", () => {
  test("empty ledger renders the on-brand notFound page, not a generic 404", async ({ page }) => {
    const res = await page.goto("/placements", { waitUntil: "domcontentloaded" });
    // 404 is expected while the ledger is empty; the important thing is
    // that the user sees the branded shell, not a raw error page.
    expect([200, 404]).toContain(res!.status());
    await expect(
      page.getByRole("heading", {
        name: /placement ledger|verified placements/i,
      }),
    ).toBeVisible();
  });
});
