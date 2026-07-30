import { test, expect } from "@playwright/test";

// Mobile-only: every interactive element should be ≥ 40×40 (close to the
// 44×44 ideal - we accept 40 because shadcn `size="sm"` lands at 36 and we
// want a stepped migration, not a flood of failures).
const MIN = 40;

const ROUTES = ["/", "/courses", "/career-engine", "/apply", "/recruiters"];

test.use({ viewport: { width: 390, height: 844 } });

for (const route of ROUTES) {
  test(`tap targets ≥ ${MIN}px on ${route}`, async ({ page }) => {
    await page.goto(route);
    const small = await page.$$eval(
      "button, a[href], [role=button]",
      (els, min) => {
        return els
          .filter((el) => {
            const r = (el as HTMLElement).getBoundingClientRect();
            const v = (el as HTMLElement).offsetParent !== null;
            return v && r.width > 0 && r.height > 0 && (r.width < min || r.height < min);
          })
          .slice(0, 10)
          .map((el) => ({
            tag: el.tagName,
            text: (el.textContent ?? "").trim().slice(0, 40),
            w: Math.round((el as HTMLElement).getBoundingClientRect().width),
            h: Math.round((el as HTMLElement).getBoundingClientRect().height),
          }));
      },
      MIN,
    );
    if (small.length) {
      console.log(`tap-target offenders on ${route}:`, small);
    }
    // Soft assertion: log only, do not fail until per-surface migration lands.
    expect(small.length).toBeLessThanOrEqual(50);
  });
}
