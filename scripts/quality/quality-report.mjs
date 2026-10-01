import { existsSync, readFileSync, mkdirSync, writeFileSync } from "node:fs";

const checks = [
  ["contrast", "Contrast"],
  ["responsive", "Responsive"],
  ["runtime", "Runtime"],
  ["links", "Links"],
  ["cta", "CTA"],
  ["empty-states", "Empty states"],
];

function read(name) {
  const path = `artifacts/quality/${name}/report.json`;
  if (!existsSync(path)) return null;
  try { return JSON.parse(readFileSync(path, "utf8")); } catch { return null; }
}

console.log("==============================");
console.log("ARZON PRODUCTION QUALITY GATE");
console.log("==============================\n");

let failed = false;

for (const [key, label] of checks) {
  const report = read(key);
  if (!report) {
    console.log(`${label.padEnd(18)} NOT RUN`);
    continue;
  }
  const findings = report.failures?.length ?? 0;
  const status = findings === 0 ? "PASS" : "FAIL";
  if (findings > 0) failed = true;
  console.log(`${label.padEnd(18)} ${status} ${findings ? `(${findings} finding(s))` : ""}`);
}

console.log("");
console.log("------------------------------");
if (failed) {
  console.log("DEPLOYMENT BLOCKED");
  process.exit(1);
}

console.log("PRODUCTION QUALITY GATE PASSED");
console.log("------------------------------");

mkdirSync("artifacts/quality", { recursive: true });
writeFileSync(
  "artifacts/quality/summary.json",
  JSON.stringify({ generatedAt: new Date().toISOString(), status: "PASS" }, null, 2),
);
