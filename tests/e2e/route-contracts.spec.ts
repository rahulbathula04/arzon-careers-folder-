import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

// Load the route manifest
const manifestPath = path.join(process.cwd(), "quality/route-manifest.json");
let routeManifest;
try {
  routeManifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
} catch (e) {
  routeManifest = { routes: [] };
}

test.describe("Route Contracts APQG", () => {
  for (const route of routeManifest.routes) {
    if (typeof route === "string") continue; // Skip old format

    test(`Contract: ${route.path}`, async ({ page }) => {
      // 1. Visit the route
      // We expect no 404s (unless intentionally broken by an attack)
      const response = await page.goto(route.path, { waitUntil: "networkidle" });
      expect(response?.status()).toBeLessThan(400);

      // 2. Check required CTAs
      if (route.requiredCTAs && route.requiredCTAs.length > 0) {
        for (const cta of route.requiredCTAs) {
          const ctaLocator = page.locator(`text="${cta}"`).first();
          await expect(ctaLocator).toBeVisible({ timeout: 5000 });
        }
      }

      // 3. Overflow check (mobile)
      await page.setViewportSize({ width: 390, height: 844 });
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      expect(hasHorizontalScroll).toBe(false);

      // 4. Console errors
      const consoleErrors: string[] = [];
      page.on('pageerror', error => consoleErrors.push(error.message));
      page.on('console', msg => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });
      
      // Navigate again to capture console errors
      await page.goto(route.path, { waitUntil: "networkidle" });
      expect(consoleErrors.length).toBe(0);
    });
  }
});
