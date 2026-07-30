import type { KnipConfig } from "knip";

/**
 * Pre-existing orphan files. The dead-code gate's job is to keep this
 * list from GROWING - these entries are the snapshot at the moment the
 * gate was introduced. Burn them down opportunistically; never add new
 * entries without an explanatory comment.
 */
const BASELINE_ORPHANS = [
  "src/components/landing/StickyMobileCTA.tsx",
  "src/components/site/MobileStickyCTA.tsx",
  "src/data/careerPaths.ts",
  "src/data/courses/_template.ts",
  "src/hooks/use-mobile.tsx",
  "src/hooks/useCounter.ts",
  "src/hooks/useInView.ts",
  "src/hooks/usePagePrimaryCTA.ts",
  "src/lib/answerFingerprint.ts",
  "src/lib/design-tokens.ts",
  "src/lib/useIntent.ts",
  // Vitest specs - picked up because no vitest entry is wired.
  "src/lib/__tests__/**",
];

/**
 * Dead-code gate.
 *
 * Goal: catch unused imports, exports, components, and orphaned files
 * that get left behind when we delete sections (recent example:
 * ProblemLandscape + SalaryCompare). Run via `bun run check:deadcode`.
 *
 * `entry` lists everything the bundler / scripts genuinely use as a
 * starting point. Anything reachable from those is "live"; anything
 * unreachable is reported.
 *
 * `ignore` is a deliberate, commented allowlist - keep it short.
 */
const config: KnipConfig = {
  entry: [
    "src/routes/**/*.{ts,tsx}",
    "src/start.ts",
    "src/router.tsx",
    "src/styles.css",
    "scripts/**/*.{ts,mjs,js}",
    "tests/**/*.{ts,tsx}",
    "playwright.config.ts",
    "vite.config.ts",
  ],
  project: ["src/**/*.{ts,tsx}"],
  ignore: [
    // Auto-generated - never hand-edit.
    "src/routeTree.gen.ts",
    // Auto-generated Supabase integration scaffolding.
    "src/integrations/supabase/**",
    // shadcn/ui primitives are intentionally kept even if a particular
    // component isn't imported today; they're part of the design system.
    "src/components/ui/**",
    ...BASELINE_ORPHANS,
  ],
  ignoreDependencies: [
    // Tailwind v4 plugin loaded via styles.css, not via JS import.
    "@tailwindcss/vite",
    // shadcn/ui primitives ship as deps but may not all be imported.
    "@radix-ui/.*",
    "@hookform/resolvers",
    "@cloudflare/vite-plugin",
    "@tanstack/router-plugin",
    "date-fns",
    "embla-carousel-react",
    "input-otp",
    "react-day-picker",
    "react-email",
    "react-hook-form",
    "react-resizable-panels",
    "vaul",
    // Used by CI / scripts only.
    "knip",
    "playwright",
    "sharp",
  ],
  ignoreBinaries: [],
  // Allow re-exported barrel files (don't flag named exports re-exported
  // through index files used externally by route loaders).
  includeEntryExports: false,
};

export default config;
