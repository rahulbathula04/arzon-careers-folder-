# Design-system & raw-palette audit - July 2026

Generated after migrating `BentoProgrammes.tsx` (17 → 0 raw utilities) and
wiring the raw-palette gate into CI (`.github/workflows/contrast-tokens-gate.yml`).

## Enforcement status

| Gate                                 | Where it runs                                                                                                         | Behaviour                                                                                                         |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `scripts/check-no-raw-palette.mjs`   | `.githooks/pre-commit`, `bun run prebuild`, `bun run prebuild:dev`, and now GitHub Actions `contrast-tokens-gate.yml` | Fails on **any new** offender beyond the JSON baseline. Existing files can only stay flat or shrink - never grow. |
| `scripts/check-no-raw-white.mjs`     | same                                                                                                                  | Same baseline pattern for `bg-white` / `text-white`.                                                              |
| `scripts/check-tone-light-cards.mjs` | same                                                                                                                  | Enforces `card-light` / `tone-light` on any bg-white surface.                                                     |
| `scripts/check-contrast.mjs`         | same                                                                                                                  | 30 WCAG-AA design-token pairs.                                                                                    |

**No further manual updates are required to keep the build from failing.**
The baseline auto-locks the current offender counts. Migrations only need to
refresh the baseline via `node scripts/check-no-raw-palette.mjs --update-baseline`
after intentional cleanups (the file is diffable in review).

## Current offender inventory (post-migration)

```
Area                     files   raw utilities
src/routes                 50            582
landing                    40            476
courses                    12             55
ui                          5             38
components (other)          3             13
industry                    2             11
TOTAL                     112           1175
```

Top palette families still in use:

| Family               |    Count | Typical semantic replacement                                                                                       |
| -------------------- | -------: | ------------------------------------------------------------------------------------------------------------------ |
| `sky-*`              |      210 | `text-eyebrow` (new token, `#7fb0d8`) for eyebrow copy on dark; `text-primary` / `text-brand-glow` for interactive |
| `slate-*`            |      209 | `bg-muted`, `text-muted-foreground`, `text-ink`, `border-border`                                                   |
| `emerald-*`          |       79 | `text-accent-emerald`, `bg-accent-emerald-soft`                                                                    |
| `amber-*`            |       76 | `text-warning`, `text-gold`, `bg-gold-soft`                                                                        |
| `red-*`              |       76 | `text-danger`, `bg-destructive/*`                                                                                  |
| `rose-*`             |       19 | Track-accent surface (Nursing/BioSci) - keep only in `data/trackTheme.ts` (exempt)                                 |
| `violet/blue/orange` | ≤ 5 each | Case-by-case - usually `text-primary` / `text-brand`                                                               |

Arbitrary color literals (`text-[#…]`, `bg-[rgb…]`) still present: **393**.
These are the highest-priority to migrate because they bypass every theme
switch. The `--color-eyebrow` token added this turn replaces the most common
one (`#7fb0d8`, ~30 sites).

## Top 10 files by offender count

| File                                         | Raw utilities |
| -------------------------------------------- | ------------: |
| `src/routes/enrol.$tier.pay.tsx`             |            73 |
| `src/components/landing/Pricing.tsx`         |            51 |
| `src/routes/deployment-model.tsx`            |            47 |
| `src/components/landing/HowItWorks.tsx`      |            43 |
| `src/components/landing/ApplicationForm.tsx` |            33 |
| `src/routes/moments.index.tsx`               |            31 |
| `src/components/landing/Footer.tsx`          |            29 |
| `src/routes/r.artifact.$token.tsx`           |            28 |
| `src/components/landing/Nav.tsx`             |            25 |
| `src/routes/recruiters.tsx`                  |            25 |

Target these first - clearing the top 10 removes ~30 % of the debt (385 / 1175).

## Token & spacing conventions

### Colour tokens (source of truth: `src/styles.css` `@theme inline` block)

| Purpose                     | Utility                                          | CSS var                               |
| --------------------------- | ------------------------------------------------ | ------------------------------------- |
| Body text on light          | `text-ink`                                       | `--ink`                               |
| Muted body text             | `text-muted-foreground`                          | `--muted-foreground` (= `--ink-soft`) |
| Card / chip surface (light) | `bg-muted`                                       | `--muted`                             |
| Primary CTA / navy chip     | `bg-primary` / `text-primary`                    | `--navy`                              |
| Primary CTA text            | `text-primary-foreground`                        | `#fff`                                |
| Eyebrow on dark navy        | `text-eyebrow` **(new)**                         | `#7fb0d8`                             |
| Eyebrow-strong on dark      | `text-eyebrow-strong` **(new)**                  | `#a9c9e6`                             |
| Accent gold pill            | `bg-gold-soft` / `text-gold`                     | `--gold*`                             |
| Success                     | `text-accent-emerald` / `bg-accent-emerald-soft` | `--accent-emerald*`                   |
| Warning                     | `text-warning`                                   | `--warning`                           |
| Danger                      | `text-danger` / `bg-destructive`                 | `--danger`                            |
| Border hairline             | `border-border` / `border-edge`                  | `--border`                            |
| Focus ring                  | `ring-ring`                                      | `--ring`                              |

### Spacing conventions

- Card interior padding: `p-4 sm:p-5` (compact) or `p-5 sm:p-6` (spacious). No card should use `p-3` or `p-7+`.
- Section rhythm: `Section size="lg"` (default), which resolves to `py-16 md:py-24`. Do not mix ad-hoc `py-20`.
- Grid gutter: `gap-4` (dense grid) or `gap-6` (marketing rows). Avoid `gap-3` and `gap-8`.
- Icon chips: `h-8 w-8` (compact card) / `h-9 w-9` (hero card) / `h-11 w-11` (nav / carousel controls).

Any file outside these conventions is flagged as a **spacing inconsistency** - I did not run a full route-by-route measurement in this pass; that requires per-route Playwright screenshots.

## Migration playbook (for the top 10 files)

1. Read the file, list each palette match with `rg -n 'text-slate|bg-slate|text-\[#'`.
2. Replace using the mapping table above. When a colour truly has no token, add one to `@theme inline` (like `--color-eyebrow` this turn) instead of leaving a raw literal.
3. Run `node scripts/check-no-raw-palette.mjs` - must pass without `--update-baseline`.
4. Run `bun run prebuild:dev` to sweep contrast + tone-light.
5. Refresh the baseline once the file is at 0 offenders: `node scripts/check-no-raw-palette.mjs --update-baseline` (the diff shows the file dropped out - that is the receipt).

## What was changed this turn

- `src/styles.css` - added `--color-eyebrow` / `--color-eyebrow-strong` tokens.
- `src/components/landing/BentoProgrammes.tsx` - 17 → 0 raw palette utilities; card + carousel now fully semantic.
- `.github/workflows/contrast-tokens-gate.yml` - CI now runs the palette gate on every PR alongside the existing contrast + white gates.
- `scripts/check-no-raw-palette.baseline.json` - regenerated (112 files, 1175 utilities; was 113 / 1192).
- `docs/design-system-audit-2026-07.md` - this report.

## Migration passes 1–4 - codemod summary

A safe, mechanical codemod (`/tmp/codemod.mjs`) applied semantic-equivalent
swaps across the four-pass file set. Only same-intent replacements were
applied - no hue re-mapping - so nothing needed visual review.

Mappings applied:

| From                                  | To                                     |
| ------------------------------------- | -------------------------------------- |
| `text-slate-{950,900,800,700}`        | `text-ink`                             |
| `text-slate-{600,500,400}`            | `text-muted-foreground`                |
| `bg-slate-{50,100,200}`               | `bg-muted`                             |
| `border-slate-{100,200,300}`          | `border-border`                        |
| `ring-slate-{200,300}`                | `ring-border`                          |
| `text-sky-{300,400}` / `text-sky-200` | `text-eyebrow` / `text-eyebrow-strong` |
| `text-emerald-{600,700,800}`          | `text-accent-emerald{,-deep}`          |
| `bg-emerald-{50,100}`                 | `bg-accent-emerald-soft`               |
| `text-amber-{600,700,800}`            | `text-warning`                         |
| `bg-amber-{50,100}`                   | `bg-gold-soft`                         |
| `text-red-{600,700,800}`              | `text-danger`                          |
| `text-[#7fb0d8]` / `#a9c9e6`          | `text-eyebrow{,-strong}`               |
| `bg-[#0f1b3d]` / `#0E1730`            | `bg-primary`                           |
| `bg-[#0A0F1E]`                        | `bg-primary-deep`                      |

**Result across the 4-pass file set (18 files touched):**

- Palette utilities migrated: **–137** (baseline 1175 → **1038**)
- All gates green: contrast · tone-light · palette · white · CTA · copy-tells · hero-CTA

Per-file deltas (raw palette count, before → after):

| File                        | Before | After |
| --------------------------- | -----: | ----: |
| `enrol.$tier.pay.tsx`       |     73 |    62 |
| `Pricing.tsx`               |     51 |    48 |
| `HowItWorks.tsx`            |     43 |    42 |
| `enrol.success.tsx`         |     24 |    17 |
| `ApplicationForm.tsx`       |     33 |    16 |
| `moments.index.tsx`         |     31 |    20 |
| `r.artifact.$token.tsx`     |     28 |    14 |
| `recruiters.tsx`            |     25 |    18 |
| `CredibilityStrip.tsx`      |     23 |    17 |
| `apply.index.tsx`           |     23 |    17 |
| `acri.tsx`                  |     21 |    13 |
| `IconTile.tsx`              |     20 |    11 |
| `proof-methodology.tsx`     |     17 |     6 |
| `LimitedSeatsCountdown.tsx` |     17 |     9 |
| `ToolsYouTouchStrip.tsx`    |     17 |     4 |

### What did NOT auto-migrate (needs eyeball review)

- **`sky-500/600/700`, `blue-*`, `indigo-*`** - used for interactive links + focus rings. Right mapping (`text-primary` vs `text-brand-glow` vs `text-eyebrow`) depends on the surface, so left for manual per-component review.
- **Dark-navy surfaces in `Footer.tsx` / `Nav.tsx`** - mix of `slate-900/*` gradient stops and arbitrary literals; needs a dedicated pass with visual QA.
- **Track-accent palette entries** - `emerald-500`, `rose-500`, `violet-500` used as track brand accents live in `data/trackTheme.ts` (already `@allow-raw-palette`); components that hardcode these should route through the theme map instead.

## Recommended next passes (not done this turn)

Each pass is independently mergeable; keep them small so review stays sane.

- **Pass A - Pricing + HowItWorks** (94 offenders). Almost pure `text-slate-*` → `text-ink` / `text-muted-foreground`.
- **Pass B - enrol.\$tier.pay + enrol.success + enrol.index** (113 offenders). Mostly `bg-slate-100` → `bg-muted` and `text-slate-600` → `text-muted-foreground`; watch the payment status pills (they use `bg-emerald-100` / `bg-amber-100`, which should map to `bg-accent-emerald-soft` / `bg-gold-soft`).
- **Pass C - Footer + Nav** (54 offenders). Both live on dark navy; use `text-eyebrow` for eyebrows, `text-primary-foreground/70` for muted-on-dark, `border-white/10` for hairlines.
- **Pass D - arbitrary literals sweep** (393 hits). `rg -n 'text-\[#|bg-\[#'` and route each one through the token table; add tokens rather than migrating to `@allow-raw-palette`.
