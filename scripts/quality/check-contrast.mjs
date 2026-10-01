import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { loadRoutes, withBrowserServer } from "./browser-utils.mjs";

const routes = loadRoutes();
const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1440, height: 900 },
];
const failures = [];

const scan = () => {
  function parseColor(value) {
    const match = value?.match(/rgba?\(([^)]+)\\)/);
    if (!match) return null;
    const parts = match[1].split(",").map((part) => Number.parseFloat(part.trim()));
    return { r: parts[0], g: parts[1], b: parts[2], a: parts[3] ?? 1 };
  }

  function linear(value) {
    const channel = value / 255;
    return channel <= 0.04045
      ? channel / 12.92
      : Math.pow((channel + 0.055) / 1.055, 2.4);
  }

  function luminance(color) {
    return 0.2126 * linear(color.r) + 0.7152 * linear(color.g) + 0.0722 * linear(color.b);
  }

  function contrast(a, b) {
    const l1 = luminance(a);
    const l2 = luminance(b);
    const hi = Math.max(l1, l2);
    const lo = Math.min(l1, l2);
    return (hi + 0.05) / (lo + 0.05);
  }

  function backgroundFor(element) {
    let node = element;
    while (node) {
      const color = parseColor(getComputedStyle(node).backgroundColor);
      if (color && color.a > 0.95) return color;
      node = node.parentElement;
    }
    return { r: 255, g: 255, b: 255, a: 1 };
  }

  const results = [];
  for (const element of document.querySelectorAll("body *")) {
    const style = getComputedStyle(element);
    if (style.display === "none" || style.visibility !== "visible" || style.opacity === "0") continue;

    const text = [...element.childNodes]
      .filter((node) => node.nodeType === Node.TEXT_NODE)
      .map((node) => node.textContent ?? "")
      .join(" ")
      .replace(/\\s+/g, " ")
      .trim();

    if (!text) continue;
    const rect = element.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) continue;

    const foreground = parseColor(style.color);
    if (!foreground || foreground.a < 0.95) continue;

    const background = backgroundFor(element);
    const ratio = contrast(foreground, background);
    const fontSize = Number.parseFloat(style.fontSize);
    const large = fontSize >= 24 || (fontSize >= 18.5 && Number.parseInt(style.fontWeight, 10) >= 700);
    const threshold = large ? 3 : 4.5;

    if (ratio < threshold) {
      results.push({
        text: text.slice(0, 120),
        tag: element.tagName.toLowerCase(),
        className: String(element.className).slice(0, 180),
        foreground: style.color,
        background: `rgb(${Math.round(background.r)}, ${Math.round(background.g)}, ${Math.round(background.b)})`,
        ratio: Number(ratio.toFixed(2)),
        threshold,
      });
    }
  }
  return results;
};

await withBrowserServer(async (base) => {
  const browser = await chromium.launch();

  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } });
    for (const route of routes) {
      try {
        const response = await page.goto(base + route, { waitUntil: "domcontentloaded", timeout: 30_000 });
        await page.waitForLoadState("networkidle", { timeout: 8_000 }).catch(() => {});
        if (!response || response.status() >= 400) continue;

        const findings = await page.evaluate(scan);
        for (const finding of findings) {
          failures.push({ route, viewport: viewport.name, ...finding });
        }
      } catch (error) {
        failures.push({ route, viewport: viewport.name, type: "error", message: error.message });
      }
    }
    await page.close();
  }

  await browser.close();
});

mkdirSync("artifacts/quality/contrast", { recursive: true });
writeFileSync("artifacts/quality/contrast/report.json", JSON.stringify({ routes, viewports, failures }, null, 2));

if (failures.length) {
  console.error(`❌ Contrast QA failed with ${failures.length} finding(s).`);
  console.error(JSON.stringify(failures.slice(0, 40), null, 2));
  process.exit(1);
}

console.log(`✅ Contrast QA: ${routes.length} routes × ${viewports.length} viewports passed.`);
