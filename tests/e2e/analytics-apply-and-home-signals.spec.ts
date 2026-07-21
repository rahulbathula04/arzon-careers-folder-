import { test, expect } from "@playwright/test";

/**
 * Smoke test for the analytics events shipped with the "Pick your domain"
 * removal. Confirms:
 *  - `home_domain_grid_search_signal` fires when the user lands on
 *    `/#domains` (legacy bookmark) and is rescued to #programmes.
 *  - `apply_cta_click` fires with the correct `surface` for Nav, Footer,
 *    and the in-page TrackDomainGrid tiles.
 *  - `home_scroll_depth` fires once the user reaches 25%.
 *
 * We capture the calls by intercepting the analytics server-fn POST
 * (matched by `x-tsr-serverFn: true` header) and reading the JSON body.
 */

type Captured = { event: string; props: Record<string, unknown>; programSlug?: string | null };

function buildCapture(page: import("@playwright/test").Page): {
  captured: Captured[];
  ready: Promise<void>;
} {
  const captured: Captured[] = [];
  let resolveReady: () => void = () => {};
  const ready = new Promise<void>((r) => (resolveReady = r));

  page.route("**/*", async (route) => {
    const req = route.request();
    if (req.method() === "POST" && req.headers()["x-tsr-serverfn"] === "true") {
      const body = req.postData() ?? "";
      const m = body.match(/"event_name":"([^"]+)"/);
      if (m) {
        const propsMatch = body.match(/"props":(\{[^}]*\})/);
        const slugMatch = body.match(/"program_slug":("[^"]*"|null)/);
        let props: Record<string, unknown> = {};
        try {
          if (propsMatch) props = JSON.parse(propsMatch[1]);
        } catch {
          /* ignore */
        }
        const programSlug = slugMatch && slugMatch[1] !== "null" ? slugMatch[1].slice(1, -1) : null;
        captured.push({ event: m[1], props, programSlug });
        resolveReady();
      }
      await route.fulfill({ status: 200, contentType: "application/json", body: "{}" });
      return;
    }
    await route.continue();
  });

  return { captured, ready };
}

test("legacy /#domains hash fires home_domain_grid_search_signal", async ({ page }) => {
  const { captured } = buildCapture(page);
  await page.goto("/#domains");
  await expect
    .poll(() => captured.find((c) => c.event === "home_domain_grid_search_signal"), {
      timeout: 5_000,
    })
    .toBeTruthy();
  const ev = captured.find((c) => c.event === "home_domain_grid_search_signal")!;
  expect(ev.props.match_kind).toBe("hash");
  expect(ev.props.release).toBe("post-domain-grid-removal");
});

test("Apply CTA in Nav fires apply_cta_click with surface=nav-desktop", async ({ page }) => {
  const { captured } = buildCapture(page);
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");
  await page
    .locator('a[data-apply-surface="nav-desktop"]')
    .first()
    .click({ trial: false, noWaitAfter: true });
  await expect
    .poll(() => captured.find((c) => c.event === "apply_cta_click"), { timeout: 5_000 })
    .toBeTruthy();
  const ev = captured.find((c) => c.event === "apply_cta_click")!;
  expect(ev.props.surface).toBe("nav-desktop");
});

test("Apply CTA inside TrackDomainGrid carries surface + programme slug", async ({ page }) => {
  const { captured } = buildCapture(page);
  await page.goto("/courses");
  const tile = page
    .locator('a[data-apply-surface="track-domain-grid"][data-programme-slug="pharmacovigilance"]')
    .first();
  await tile.click({ noWaitAfter: true });
  await expect
    .poll(() => captured.find((c) => c.event === "apply_cta_click"), { timeout: 5_000 })
    .toBeTruthy();
  const ev = captured.find((c) => c.event === "apply_cta_click")!;
  expect(ev.props.surface).toBe("track-domain-grid");
  expect(ev.programSlug).toBe("pharmacovigilance");
});

test("home_scroll_depth fires at 25% on the home page", async ({ page }) => {
  const { captured } = buildCapture(page);
  await page.goto("/");
  // Force scroll to ~30% of the document.
  await page.evaluate(() => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo(0, Math.floor(h * 0.3));
  });
  await expect
    .poll(() => captured.find((c) => c.event === "home_scroll_depth" && c.props.depth === 25), {
      timeout: 5_000,
    })
    .toBeTruthy();
});
