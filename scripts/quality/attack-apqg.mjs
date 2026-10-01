#!/usr/bin/env node

/**
 * APQG Red Team Test Suite
 * Intentionally introduces defects into the application and verifies that the APQG catches them.
 */

import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const TARGET_FILE = path.join(process.cwd(), "src/routes/career-engine.index.tsx");

function runTest(name, mutation, testCommand) {
  console.log(`\n==============================================`);
  console.log(`[ATTACK] ${name}`);
  
  const original = fs.readFileSync(TARGET_FILE, "utf-8");
  
  try {
    const mutated = mutation(original);
    fs.writeFileSync(TARGET_FILE, mutated);
    
    console.log(`[+] Mutated file successfully. Running APQG gate...`);
    
    try {
      execSync(testCommand, { stdio: "pipe" });
      console.error(`[!] FAILED: APQG did NOT catch the defect! The command passed.`);
      process.exitCode = 1;
    } catch (error) {
      console.log(`[✔] SUCCESS: APQG correctly caught the defect! (Exit code: ${error.status})`);
    }
  } finally {
    // Always revert
    fs.writeFileSync(TARGET_FILE, original);
    console.log(`[-] Reverted mutations.`);
  }
}

console.log("Starting APQG Red Team Penetration...");

// 1. Missing Meta
runTest(
  "Missing Meta",
  (content) => content.replace(/export const Route = createFileRoute[\s\S]*?\}\);/m, `export const Route = createFileRoute('/career-engine/')({ component: CareerEngineIndexPage });`),
  "npm run quality:seo"
);

// 2. White text on white (Contrast/Visibility)
runTest(
  "White text on white background",
  (content) => content.replace(`className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-white px-5 text-sm font-extrabold text-slate-900 sm:mt-6 hover:bg-blue-50"`, `className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-white px-5 text-sm font-extrabold text-white sm:mt-6 hover:bg-blue-50"`),
  "npx playwright test tests/e2e/text-visibility.spec.ts --project=chromium-default -g \"/career-engine\""
);

// 3. Overflow
runTest(
  "Horizontal overflow div",
  (content) => content.replace(`<section className="rounded-3xl`, `<div className="w-[1200px] h-10 bg-red-500 shrink-0">OVERFLOW</div><section className="rounded-3xl`),
  "npx playwright test tests/e2e/readability.spec.ts --project=chromium-default -g \"/career-engine\"" // Or whichever script checks for overflow
);

console.log("\nAPQG Red Team Penetration Complete.");
