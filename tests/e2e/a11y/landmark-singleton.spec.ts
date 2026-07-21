import { test, expect } from "@playwright/test";

const ROUTES = ["/", "/courses", "/career-engine", "/apply", "/about", "/recruiters", "/industry"];

for (const route of ROUTES) {
  test(`exactly one <main> on ${route}`, async ({ page }) => {
    await page.goto(route);
    const count = await page.locator("main").count();
    expect(count, `route ${route} should have exactly one <main>`).toBe(1);
  });
}
