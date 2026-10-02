#!/usr/bin/env node
import fs from "node:fs";

const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
const lock = JSON.parse(fs.readFileSync("package-lock.json", "utf8"));
const packages = lock.packages ?? {};

const minimums = {
  "@tanstack/react-start": "1.168.60",
  "@tanstack/start-server-core": "1.169.39",
};

function versionParts(v) {
  return String(v).replace(/^v/, "").split(".").map((x) => Number.parseInt(x, 10) || 0);
}

function lt(a, b) {
  const x = versionParts(a);
  const y = versionParts(b);
  for (let i = 0; i < 3; i++) {
    if (x[i] !== y[i]) return x[i] < y[i];
  }
  return false;
}

const failures = [];

for (const [name, minimum] of Object.entries(minimums)) {
  const declared = pkg.dependencies?.[name] ?? pkg.overrides?.[name];
  const locked = packages[`node_modules/${name}`]?.version;

  if (!declared) failures.push(`${name} is not declared`);
  if (!locked) failures.push(`${name} is missing from package-lock.json`);
  if (locked && lt(locked, minimum)) {
    failures.push(`${name}@${locked} is below patched minimum ${minimum}`);
  }
}

// Only inspect the two affected TanStack Start packages.
// Do not reject unrelated packages that happen to share historical version numbers.
const forbidden = {
  "@tanstack/react-start": new Set(["1.168.42"]),
  "@tanstack/start-server-core": new Set(["1.169.25"]),
};

for (const [name, versions] of Object.entries(forbidden)) {
  const locked = packages[`node_modules/${name}`]?.version;
  if (locked && versions.has(locked)) {
    failures.push(`${name}@${locked} is a known vulnerable version`);
  }
}

if (failures.length) {
  console.error("DEPLOYMENT BLOCKED: vulnerable or unverified TanStack Start dependency detected.");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("TanStack security gate passed: patched versions are locked.");
