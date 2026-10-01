import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { loadRoutes, withBrowserServer } from "./browser-utils.mjs";

const routes = loadRoutes();
const failures = [];

await withBrowserServer(async (base) => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

  for (const route of routes) {
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];
    const onConsole = (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    };
    const onPageError = (error) => pageErrors.push(error.message);
    page.on("console", onConsole);
    page.on("pageerror", onPageError);

    try {
      const response = await page.goto(base + route, { waitUntil: "domcontentloaded", timeout: 30_000 });
      await page.waitForLoadState("networkidle", { timeout: 8_000 }).catch(() => {});

      if (!response || response.status() >= 400) {
        failures.push({ route, type: "http", status: response?.status() ?? "no-response" });
      }
      if (consoleErrors.length) failures.push({ route, type: "console", errors: consoleErrors.slice(0, 10) });
      if (pageErrors.length) failures.push({ route, type: "pageerror", errors: pageErrors.slice(0, 10) });
    } catch (error) {
      failures.push({ route, type: "navigation", message: error.message });
    } finally {
      page.removeListener("console", onConsole);
      page.removeListener("pageerror", onPageError);
    }
  }

  await page.close();
  await browser.close();
});

mkdirSync("artifacts/quality/runtime", { recursive: true });
writeFileSync("artifacts/quality/runtime/report.json", JSON.stringify({ routes, failures }, null, 2));
if (failures.length) {
  console.error(`❌ Runtime QA failed with ${failures.length} finding(s).`);
  console.error(JSON.stringify(failures.slice(0, 30), null, 2));
  process.exit(1);
}
console.log(`✅ Runtime QA: ${routes.length} routes loaded without browser/runtime errors.`);
