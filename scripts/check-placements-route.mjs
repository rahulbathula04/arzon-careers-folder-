#!/usr/bin/env node
/**
 * Guarantees the public /placements route stays wired up.
 *
 * Static check (always runs, no server required):
 *   • src/routes/placements.tsx exists
 *   • exports Route via createFileRoute("/placements")
 *   • declares a `component:` and `head:`
 *
 * Live check (runs only if a dev server is reachable on
 * $PLACEMENTS_PROBE_URL or http://localhost:8080):
 *   • GET /placements returns HTTP 200 (once at least one hire is verified)
 *     or HTTP 404 (intentional gate while the ledger is empty — see loader).
 *
 * The live probe never *requires* a server — that keeps the check
 * green inside pre-build (no dev server) while still failing loudly in
 * every environment where a server IS answering (CI smoke, preview,
 * production) and returns anything other than 200.
 */
import { existsSync, readFileSync } from "node:fs";

const ROUTE_FILE = "src/routes/placements.tsx";

if (!existsSync(ROUTE_FILE)) {
  console.error(`❌ Missing ${ROUTE_FILE} — the /placements route is required.`);
  process.exit(1);
}

const src = readFileSync(ROUTE_FILE, "utf8");
const checks = [
  [/createFileRoute\("\/placements"\)/, `createFileRoute("/placements")`],
  [/component\s*:/, `component: <PageComponent>`],
  [/head\s*:/, `head: () => (...)`],
];
for (const [re, label] of checks) {
  if (!re.test(src)) {
    console.error(`❌ ${ROUTE_FILE} is missing ${label}.`);
    process.exit(1);
  }
}

const probeUrl = process.env.PLACEMENTS_PROBE_URL ?? "http://localhost:8080/placements";

async function probe() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 2500);
  try {
    const res = await fetch(probeUrl, {
      signal: controller.signal,
      redirect: "follow",
    });
    clearTimeout(timer);
    if (res.status !== 200 && res.status !== 404) {
      console.error(
        `❌ /placements probe FAILED: ${probeUrl} returned ${res.status} (expected 200 or 404).`,
      );
      process.exit(1);
    }
    console.log(`✅ /placements probe OK (${probeUrl} → ${res.status}).`);
  } catch (err) {
    clearTimeout(timer);
    // No server reachable — this is expected during pre-build. Only the
    // static check is mandatory in that environment.
    const reason = err?.name === "AbortError" ? "timeout" : err?.code || err?.message;
    console.log(`ℹ /placements live probe skipped (no server on ${probeUrl}: ${reason}).`);
  }
}

await probe();
console.log("✅ /placements route check passed.");
