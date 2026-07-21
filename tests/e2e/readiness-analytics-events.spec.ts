import { test, expect } from "@playwright/test";

/**
 * Asserts the two GA4 readiness events fire with the same session_id that
 * was minted by the client and stored in sessionStorage (which is the same
 * session_id used as the readiness_journey row key). This is the contract
 * the admin /admin/readiness-journeys page relies on to correlate analytics
 * with the DB row.
 *
 * We don't load GA4 in tests (no measurement id). Instead we use the
 * `?debug_ga=1` query flag to mirror trackEvent calls into the console, then
 * assert on the captured payloads.
 */
test.describe("readiness analytics events carry session_id", () => {
  test("readiness_test_started fires with the same session_id stored in sessionStorage", async ({
    page,
  }) => {
    const events: Array<{ name: string; props: Record<string, unknown> }> = [];
    page.on("console", (msg) => {
      if (msg.type() !== "log") return;
      const text = msg.text();
      // analytics.trackEvent debug shape: "[GA4] <name> { ... }"
      if (!text.startsWith("[GA4]")) return;
      const args = msg.args();
      if (args.length < 3) return;
      Promise.all([args[1].jsonValue(), args[2].jsonValue()])
        .then(([n, p]) =>
          events.push({ name: String(n), props: (p ?? {}) as Record<string, unknown> }),
        )
        .catch(() => {});
    });

    await page.goto("/career-engine/start?debug_ga=1");
    await page.getByRole("heading", { level: 1 }).waitFor();
    // The effect on /start fires markReadinessStarted + trackEvent on mount.
    await expect.poll(() => events.some((e) => e.name === "readiness_test_started")).toBeTruthy();

    const sid = await page.evaluate(() => window.sessionStorage.getItem("arzon.readiness.sid"));
    expect(sid).toBeTruthy();
    expect(sid!.length).toBeGreaterThanOrEqual(8);

    const started = events.find((e) => e.name === "readiness_test_started");
    expect(started, "readiness_test_started must be tracked").toBeTruthy();
    expect(started!.props.session_id).toBe(sid);
    expect(started!.props.surface).toBe("career-engine-start");
  });

  test("hero CTA click event also carries the session_id", async ({ page }) => {
    const events: Array<{ name: string; props: Record<string, unknown> }> = [];
    page.on("console", (msg) => {
      if (msg.type() !== "log") return;
      const text = msg.text();
      if (!text.startsWith("[GA4]")) return;
      const args = msg.args();
      if (args.length < 3) return;
      Promise.all([args[1].jsonValue(), args[2].jsonValue()])
        .then(([n, p]) =>
          events.push({ name: String(n), props: (p ?? {}) as Record<string, unknown> }),
        )
        .catch(() => {});
    });

    await page.goto("/?debug_ga=1");
    const primary = page.locator('[data-testid="hero-primary-cta"]');
    await expect(primary).toBeVisible();
    await primary.click({ noWaitAfter: true });

    await expect.poll(() => events.some((e) => e.name === "readiness_cta_click")).toBeTruthy();
    const sid = await page.evaluate(() => window.sessionStorage.getItem("arzon.readiness.sid"));
    expect(sid).toBeTruthy();
    const click = events.find((e) => e.name === "readiness_cta_click");
    expect(click!.props.session_id).toBe(sid);
    expect(click!.props.surface).toBe("home-hero");
  });
});
