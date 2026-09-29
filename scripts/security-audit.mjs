import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const failures = [];

function read(path) {
  return readFileSync(resolve(root, path), "utf8");
}

function fail(message) {
  failures.push(message);
}

const pkg = JSON.parse(read("package.json"));
const semverMajorMinorPatch = (value) => {
  const match = value.match(/(\d+)\.(\d+)\.(\d+)/);
  return match ? [Number(match[1]), Number(match[2]), Number(match[3])] : null;
};
const atLeast = (value, minimum) => {
  const parsed = semverMajorMinorPatch(value);
  if (!parsed) return false;
  for (let i = 0; i < 3; i++) {
    if (parsed[i] !== minimum[i]) return parsed[i] > minimum[i];
  }
  return true;
};

if (!atLeast(pkg.devDependencies?.vite ?? "", [7, 3, 2])) {
  fail("Vite must be >= 7.3.2 because older 7.x releases have a Vite dev-server file-read advisory.");
}
if (!atLeast(pkg.dependencies?.["@tanstack/react-start"] ?? "", [1, 167, 30])) {
  fail("TanStack React Start must be >= 1.167.30.");
}
if (pkg.overrides?.seroval !== "1.6.7") {
  fail("seroval must be pinned to a known-good 1.6.7+ release.");
}
if (pkg.overrides?.["@tanstack/start-server-core"] !== "1.169.38") {
  fail("@tanstack/start-server-core must be pinned to 1.169.38.");
}

const vite = read("vite.config.ts");
if (!/host:\s*"127\.0\.0\.1"/.test(vite)) fail("Vite dev server must bind to loopback.");
if (!/sourcemap:\s*false/.test(vite)) fail("Production source maps must not be publicly emitted.");

const vercel = read("vercel.json");
for (const header of [
  "Strict-Transport-Security",
  "X-Content-Type-Options",
  "X-Frame-Options",
  "Referrer-Policy",
  "Content-Security-Policy",
]) {
  if (!vercel.includes(header)) fail("Vercel production headers missing: " + header);
}
if (vercel.includes("'unsafe-eval'")) fail("Production CSP must not allow unsafe-eval.");

const demand = read("src/lib/demand.functions.ts");
if (/verified_at:\s*new Date\(\)\.toISOString\(\)/.test(demand)) {
  fail("Public demand submission must never mark verified_at directly.");
}

const securityMigration = read("supabase/migrations/20260929190000_security_hardening.sql");
if (!securityMigration.includes("verified_at") || !securityMigration.includes("REVOKE ALL")) {
  fail("Demand verification hardening migration is incomplete.");
}

const tracked = execFileSync("git", ["ls-files"], { encoding: "utf8" })
  .split(/\r?\n/)
  .filter(Boolean)
  .filter((path) => !path.startsWith("node_modules/"));

const secretPatterns = [
  ["private key", /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/],
  ["GitHub token", /\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9_]{20,}\b/],
  ["Razorpay live secret", /rzp_live_[A-Za-z0-9]{10,}/],
  ["OpenAI secret", /sk-[A-Za-z0-9]{20,}/],
  ["service-role assignment", /SUPABASE_SERVICE_ROLE_KEY\s*[:=]\s*["'](?!\$|process\.env|<)[^"']{20,}["']/],
];

for (const path of tracked) {
  if (/^(\.env|\.env\.|.*\.pem$|.*\.key$)/.test(path)) {
    fail("Sensitive environment/key file is tracked: " + path);
    continue;
  }
  let content = "";
  try {
    content = read(path);
  } catch {
    continue;
  }
  for (const [label, pattern] of secretPatterns) {
    if (pattern.test(content)) fail("Potential " + label + " found in tracked file: " + path);
  }
}

if (failures.length) {
  console.error("Security audit failed:");
  for (const failure of failures) console.error(" - " + failure);
  process.exit(1);
}

console.log("Security audit passed: dependency floors, production headers, dev-server exposure, verification integrity, and tracked-secret checks.");
