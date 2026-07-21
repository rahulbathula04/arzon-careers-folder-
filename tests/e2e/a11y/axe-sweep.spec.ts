import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const ROUTES = ["/", "/courses", "/career-engine", "/apply", "/about", "/recruiters", "/industry"];
const VIEWPORTS: Array<[number, number, string]> = [
  [360, 800, "mobile"],
  [768, 1024, "tablet"],
  [1280, 900, "desktop"],
];

for (const route of ROUTES) {
  for (const [w, h, label] of VIEWPORTS) {
    test(`axe ${label} ${route}`, async ({ page }) => {
      await page.setViewportSize({ width: w, height: h });
      await page.goto(route);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa"])
        .disableRules(["color-contrast"]) // handled by check-contrast.mjs
        .analyze();
      const serious = results.violations.filter(
        (v) => v.impact === "serious" || v.impact === "critical",
      );
      if (serious.length) {
        console.log(
          `axe ${route} ${label}:`,
          serious.map((v) => `${v.id} (${v.nodes.length})`).join(", "),
        );
      }
      // Soft: log violations now, fail on critical only.
      const critical = serious.filter((v) => v.impact === "critical");
      expect(critical, `critical a11y violations on ${route} ${label}`).toEqual([]);
    });
  }
}
