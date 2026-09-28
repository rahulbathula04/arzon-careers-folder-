import { test, expect } from "@playwright/test";

const PAGES = [
  { id: "home", path: "/" },
  { id: "careers", path: "/healthcare-careers" },
  { id: "degrees", path: "/degrees" },
  { id: "career-engine", path: "/career-engine" },
  { id: "assessment-start", path: "/career-engine/start" },
  { id: "programmes", path: "/courses" },
  { id: "reviews", path: "/reviews" },
] as const;

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1440, height: 900 },
] as const;

for (const viewport of VIEWPORTS) {
  for (const target of PAGES) {
    test(`${target.id} visual contract @ ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(target.path, { waitUntil: "networkidle" });

      await expect(page.locator("h1").first()).toBeVisible();

      const overflow = await page.evaluate(() => ({
        viewportWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));
      expect(
        overflow.scrollWidth,
        `${target.path} has horizontal overflow at ${viewport.width}px`,
      ).toBeLessThanOrEqual(overflow.viewportWidth + 2);

      const interactive = page.locator("a, button, input, select, textarea").filter({
        visible: true,
      });
      const count = await interactive.count();

      for (let i = 0; i < count; i++) {
        const box = await interactive.nth(i).boundingBox();
        if (!box) continue;
        expect(box.width, `${target.path} interactive #${i} has zero width`).toBeGreaterThan(0);
        expect(box.height, `${target.path} interactive #${i} has zero height`).toBeGreaterThan(0);
      }

      if (target.id === "career-engine" || target.id === "assessment-start") {
        await expect(page.locator(".arzon-site-header")).toHaveCount(1);
      }

      if (target.id === "assessment-start") {
        await expect(page.getByText("Find the healthcare role that fits your background.")).toBeVisible();
      }

      if (target.id === "degrees") {
        await expect(page.getByText("What can you do with your degree?")).toBeVisible();
      }

      if (target.id === "reviews") {
        await expect(page.getByText("Ratings from public business listings")).toBeVisible();
        await expect(page.getByText("More than map ratings")).toBeVisible();
      }
    });
  }
}
