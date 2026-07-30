import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright config - accessibility + cross-browser smoke tests.
 *
 * We run two axes:
 *   1. Engine: Chromium, WebKit (Safari), Firefox.
 *   2. Reduced motion: on (`reduce`) and off (`no-preference`).
 *
 * Specs target "reduced-motion" can be filtered with a project name; the
 * default `npx playwright test` will run all 6 combinations.
 */
const PORT = Number(process.env.PW_PORT ?? 3000);
const BASE_URL = process.env.PW_BASE_URL ?? `http://localhost:${PORT}`;
// Escape hatch for sandboxes where the bundled Playwright chromium is
// missing native shared libraries: point at a system chromium binary
// (e.g. /bin/chromium). Ignored in CI, where the standard install works.
const CHROMIUM_EXECUTABLE = process.env.PW_CHROMIUM_EXECUTABLE;
const chromiumLaunchOptions = CHROMIUM_EXECUTABLE
  ? { executablePath: CHROMIUM_EXECUTABLE }
  : undefined;

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [["github"], ["list"]] : "list",
  use: {
    baseURL: BASE_URL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    // Reduced-motion ON
    {
      name: "chromium-reduced-motion",
      use: {
        ...devices["Desktop Chrome"],
        reducedMotion: "reduce",
        launchOptions: chromiumLaunchOptions,
      },
    },
    {
      name: "webkit-reduced-motion",
      use: { ...devices["Desktop Safari"], reducedMotion: "reduce" },
    },
    {
      name: "firefox-reduced-motion",
      use: { ...devices["Desktop Firefox"], reducedMotion: "reduce" },
    },
    // Reduced-motion OFF (default browser behaviour, animations allowed)
    {
      name: "chromium-default",
      use: {
        ...devices["Desktop Chrome"],
        reducedMotion: "no-preference",
        launchOptions: chromiumLaunchOptions,
      },
    },
    {
      name: "webkit-default",
      use: { ...devices["Desktop Safari"], reducedMotion: "no-preference" },
    },
    {
      name: "firefox-default",
      use: { ...devices["Desktop Firefox"], reducedMotion: "no-preference" },
    },
  ],
  webServer: process.env.PW_NO_SERVER
    ? undefined
    : {
        command: "npm run dev",
        url: BASE_URL,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
});
