# Contributing

## Reduced-motion / `animate-*` rule

Every Tailwind `animate-*` utility used in JSX/TSX (including arbitrary
values like `animate-[wiggle_1s_ease]`) **must** be prefixed with
`motion-safe:` so users who set `prefers-reduced-motion: reduce` never
see the animation.

```tsx
// ✅ good
<Spinner className="motion-safe:animate-spin" />
<div className="motion-safe:animate-[wiggle_1s_ease-in-out_infinite]" />

// ❌ bad — trips the CI gate
<Spinner className="animate-spin" />
<div className="animate-[wiggle_1s_ease-in-out_infinite]" />
```

If an animation is legitimately essential (e.g. a data-state driven
Radix primitive that only runs for a few frames), add the file to the
`ALLOWLIST_FILES` set in
[`scripts/check-animate-motion-safe.mjs`](scripts/check-animate-motion-safe.mjs)
with a one-line justification in the surrounding comment.

### CI gate

The rule is enforced on every build by
[`scripts/check-animate-motion-safe.mjs`](scripts/check-animate-motion-safe.mjs),
which runs as part of both `prebuild` and `prebuild:dev`. The
companion script
[`scripts/check-reduced-motion.mjs`](scripts/check-reduced-motion.mjs)
guards the global CSS rules; this script guards the per-class usages.

Run locally before pushing:

```bash
node scripts/check-animate-motion-safe.mjs
```

A failing run prints every offending `file:line` with the exact class
string, so fixes are usually a one-character edit
(`animate-…` → `motion-safe:animate-…`).
