import { test, expect } from "@playwright/test";

/**
 * End-to-end submit assertion: when the user completes the funnel and clicks
 * "Pay seat reservation" on /apply/confirm, the submitApplication server
 * function must be called with the exact `programSlug` and `utmSource`
 * that were captured at the top of the funnel.
 *
 * We seed a fully-completed application state into localStorage, intercept
 * the TanStack Start server-fn POST (identified by the `x-tsr-serverFn`
 * header) and stub a success response so the test does not actually create
 * a row in the backend or redirect to Razorpay.
 */

const STORAGE_KEY = "arzon_application_v1";

const SEED = {
  step: "confirm",
  profile: {
    fullName: "Test Applicant",
    email: "test.applicant@example.com",
    phone: "9876543210",
    city: "Hyderabad",
    yearOfStudy: "Final Year",
    background: "Pharmacy / Pharm.D",
    goal: "Land a PV associate role",
  },
  programmeSlug: "pharmacovigilance",
  cohortId: "may-2026",
  source: "domain-grid",
  depositPaid: false,
};

test("submit forwards programmeSlug + utmSource to the backend", async ({ page, context }) => {
  // Pre-seed before any app script runs so useApplication hydrates from it.
  await context.addInitScript(([k, v]) => window.localStorage.setItem(k, v), [
    STORAGE_KEY,
    JSON.stringify(SEED),
  ] as const);

  let capturedBody: string | null = null;
  let capturedUrl: string | null = null;

  await page.route("**/*", async (route) => {
    const req = route.request();
    if (req.method() === "POST" && req.headers()["x-tsr-serverfn"] === "true") {
      capturedBody = req.postData();
      capturedUrl = req.url();
      // Pretend the server fn returned a fresh application id. The client
      // path then sets depositPaid + navigates to Razorpay — we don't care.
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        headers: { "x-tss-raw-response": "true" },
        body: JSON.stringify({ applicationId: "AG-TEST-0001" }),
      });
      return;
    }
    await route.continue();
  });

  // Prevent the post-submit redirect from leaving the page mid-assertion.
  await page.addInitScript(() => {
    Object.defineProperty(window, "location", {
      configurable: true,
      value: new Proxy(window.location, {
        set(_t, p) {
          if (p === "href") return true;
          return Reflect.set(_t, p, true);
        },
      }),
    });
  });

  await page.goto("/apply/confirm");

  // Acknowledge the seat-urgency checkbox so the Pay button enables.
  const ack = page.getByRole("checkbox").first();
  if (await ack.isVisible().catch(() => false)) {
    await ack.check();
  }

  const payBtn = page.getByRole("button", { name: /pay|reserve|seat/i }).first();
  await payBtn.click();

  await expect.poll(() => capturedBody, { timeout: 7_000 }).not.toBeNull();
  expect(capturedUrl).toMatch(/submitApplication|application/i);

  const body = capturedBody as unknown as string;
  expect(body).toContain('"programSlug"');
  expect(body).toContain('"pharmacovigilance"');
  expect(body).toContain('"utmSource"');
  expect(body).toContain('"domain-grid"');
});
