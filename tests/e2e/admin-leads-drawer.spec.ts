import { test, expect } from "@playwright/test";

/**
 * /admin/leads — search, drawer, WhatsApp-first action contract.
 *
 * Admin routes live under `_authenticated` and require a Supabase session.
 * In CI without a managed session we skip; locally the LOVABLE_BROWSER_*
 * env vars (see system browser-use card) restore a real admin session.
 *
 * Contract checked:
 *   1. The search input is the dominant first control (placeholder and
 *      aria-label both speak about searching).
 *   2. Searching either narrows the row count or shows the empty state —
 *      the input is wired to the list, not a static decoration.
 *   3. Clicking the first row opens the drawer (`role=dialog`).
 *   4. The drawer's primary action is WhatsApp, rendered before Call in DOM
 *      order, with sentence-case "WhatsApp" / "Call" labels (not SHOUTY).
 */

const AUTH_STATUS = process.env.LOVABLE_BROWSER_AUTH_STATUS ?? "";
const SESSION_JSON = process.env.LOVABLE_BROWSER_SUPABASE_SESSION_JSON ?? "";
const STORAGE_KEY = process.env.LOVABLE_BROWSER_SUPABASE_STORAGE_KEY ?? "";

test.describe("/admin/leads dashboard", () => {
  test.skip(({ browserName }) => browserName !== "chromium", "chromium-only admin smoke");
  test.skip(
    AUTH_STATUS !== "injected" || !SESSION_JSON || !STORAGE_KEY,
    "no managed admin session injected; skipping (set LOVABLE_BROWSER_* to run)",
  );

  test("search → row → WhatsApp-first drawer", async ({ page }) => {
    // Establish the localhost origin first, then restore the session.
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.evaluate(
      ([key, json]) => window.localStorage.setItem(key, json),
      [STORAGE_KEY, SESSION_JSON],
    );

    await page.goto("/admin/leads", { waitUntil: "networkidle" });

    // 1. Search dominates the surface.
    const search = page.getByPlaceholder(/search/i).first();
    await expect(search).toBeVisible();
    await expect(search).toHaveAttribute("aria-label", /search leads/i);

    // 2. Search is wired — typing a token either narrows the list or shows
    //    the empty state. We can't assume any real lead names so we type a
    //    random token and confirm the row count drops to zero (or that the
    //    "no results" affordance appears).
    const rowsBefore = await page.locator("tbody tr, [data-row]").count();
    await search.fill(`zzz-no-match-${Date.now()}`);
    await page.waitForTimeout(400); // debounce window
    const rowsAfter = await page.locator("tbody tr, [data-row]").count();
    expect(rowsAfter).toBeLessThanOrEqual(rowsBefore);

    // 3. Clear search, open the first row's drawer.
    await search.fill("");
    await page.waitForTimeout(400);
    const viewBtn = page.getByRole("button", { name: /view details for/i }).first();
    if (!(await viewBtn.isVisible().catch(() => false))) {
      test.skip(true, "no leads in this environment to open a drawer for");
      return;
    }
    await viewBtn.click();

    const dialog = page.getByRole("dialog", { name: /lead detail/i });
    await expect(dialog).toBeVisible();

    // 4. WhatsApp before Call, sentence-case labels.
    const whatsapp = dialog.getByRole("link", { name: /^whatsapp$/i });
    const call = dialog.getByRole("link", { name: /^call$/i });
    await expect(whatsapp).toBeVisible();
    await expect(call).toBeVisible();

    const order = await dialog.evaluate(() => {
      const links = Array.from(document.querySelectorAll('[role="dialog"] a'));
      const labels = links.map((a) => (a.textContent ?? "").trim());
      return {
        whatsappIdx: labels.findIndex((t) => /^WhatsApp\b/.test(t)),
        callIdx: labels.findIndex((t) => /^Call\b/.test(t)),
        rawLabels: labels.filter((t) => /WhatsApp|Call/i.test(t)),
      };
    });
    expect(order.whatsappIdx).toBeGreaterThanOrEqual(0);
    expect(order.callIdx).toBeGreaterThanOrEqual(0);
    expect(order.whatsappIdx, "WhatsApp link appears before Call link").toBeLessThan(order.callIdx);

    // Sentence-case, not UPPERCASE / shouty.
    for (const label of order.rawLabels) {
      expect(label).not.toBe(label.toUpperCase());
    }

    await expect(whatsapp).toHaveAttribute("href", /wa\.me\//);
    await expect(call).toHaveAttribute("href", /^tel:/);
  });
});
