import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { loadRoutes, withBrowserServer } from "./browser-utils.mjs";

const routes = loadRoutes();
const requiredText = "Get My Career Plan";
const failures = [];

await withBrowserServer(async (base) => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

  for (const route of routes) {
    if (route === "/career-engine/start" || route === "/career-engine/test") continue;
    try {
      await page.goto(base + route, { waitUntil: "domcontentloaded", timeout: 30_000 });
      await page.waitForLoadState("networkidle", { timeout: 8_000 }).catch(() => {});
      const count = await page.getByText(requiredText, { exact: true }).count();
      if (count === 0) failures.push({ route, reason: `Missing "${requiredText}"` });
    } catch (error) {
      failures.push({ route, reason: error.message });
    }
  }

  await page.close();
  await browser.close();
});

mkdirSync("artifacts/quality/cta", { recursive: true });
writeFileSync("artifacts/quality/cta/report.json", JSON.stringify({ routes, failures }, null, 2));
if (failures.length) {
  console.error(`❌ CTA consistency failed with ${failures.length} route(s).`);
  console.error(JSON.stringify(failures, null, 2));
  process.exit(1);
}
console.log(`✅ CTA consistency: canonical CTA present on ${routes.filter((route) => route !== "/career-engine/start" && route !== "/career-engine/test").length} routes.`);
