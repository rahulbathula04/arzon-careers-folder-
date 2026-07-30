## Bugs identified in the screenshots

### Bug 1 - Home "How it works" · duplicate trophy + clipped Hired card (mobile)

File: `src/components/landing/HowItWorks.tsx`

- On the last STEP 04 `<li>` (lines 143–163), an **absolute-positioned trophy** is rendered at `left-[3px] -bottom-2`.
- Immediately after, a **second `<li>` "Hired finish node"** (lines 165–178) renders another trophy in the icon column.
- Result: two stacked orange trophies in the connector rail (matches red circle #1 in the screenshot).
- The Hired card's first character "H" is clipped because the card sits in the same flex row as the finish trophy without enough left padding once the icon column shrinks (matches red circle #2).

Fix:

- Delete the duplicate absolute trophy inside the STEP 04 `<li>` (keep only the dedicated "Hired finish node" `<li>`).
- Give the Hired callout `min-w-0` and slightly more internal padding so "Hired 🎉" is never clipped by the icon column.
- Extend the vertical connector's `bottom-*` so the gradient line reaches the Hired node instead of stopping short.

### Bug 2 - Course page sticky tab bar overlaps content (mobile)

File: `src/routes/courses.$slug.tsx` (StickyTabs, lines 690–714; Section `scroll-mt`, line 719)

- Sticky bar is pinned at `top-[57px]`, but the app scroll container has a different header height on mobile, so the tab strip visually floats mid-page and the bullseye/radar icon of the next section shows behind it (matches the red oval in screenshot 2).
- Section anchors use `scroll-mt-[140px]` while the actual sticky offset is `57 + ~48 ≈ 105px`, so hash jumps land in the wrong place and content peeks through when the user scrolls back.

Fix:

- Replace hard-coded `top-[57px]` and `scroll-mt-[140px]` with CSS variables driven by the real header height (measure once in the existing header effect or expose `--app-header-h`). Use `top: var(--app-header-h)` and `scroll-margin-top: calc(var(--app-header-h) + 3rem)`.
- Add an explicit solid background layer to the sticky bar (drop `supports-[backdrop-filter]:backdrop-blur-none`, keep `bg-white`) so no content bleeds through on browsers where the inline `backgroundColor` is overridden by `tone-light`.
- Ensure the parent of `StickyTabs` is not `overflow-hidden` (which would break `position: sticky` and cause the "floating" appearance).

## Colors validation sweep

Goal: make sure no component silently becomes invisible again (the `text-white` on raw `bg-[color:var(--navy)]` class was the previous root cause).

1. **Static audit** - run `scripts/check-no-raw-palette.mjs` and review the baseline; every entry there is an active risk. Convert the top offenders to the semantic utilities (`bg-navy`, `.cta-navy`, `bg-primary`, etc.) instead of arbitrary `bg-[color:var(--…)]` combined with `text-white`.
2. **Tone-light bleach detector** - extend the palette script (or add `scripts/check-text-white-on-raw-bg.mjs`) to fail CI when a file combines `text-white` with any of:
   - `bg-[color:var(--…)]`
   - `style={{ backgroundColor: … }}` on the same element
   - a parent chain containing `tone-light` (grep parent components).
     Bake the current legitimate exceptions (already listed in `src/styles.css` lines 2116–2124) into the allowlist.
3. **Contrast probe (Playwright)** - script `/tmp/browser/contrast/run.py`: visit `/`, `/enrol`, `/courses/clinical-data-management`, `/bd-playbook`, `/placements` at 384×800 and 1280×1800, screenshot each CTA / badge / sticky bar, and use PIL to sample the button's center pixel vs its text-layer computed color via `page.evaluate`. Fail when the computed foreground ≈ background (deltaE < 10).
4. **Baseline refresh** - after fixes land, regenerate `scripts/check-no-raw-palette.baseline.json` with `--update-baseline` so only new regressions show up.

## Verification

- Build stays green (`prebuild`, typecheck).
- Playwright pass on `/` mobile viewport confirms only one trophy and no clipped "Hired" text.
- Playwright pass on `/courses/clinical-data-management` mobile confirms the sticky tab strip is opaque, aligned to the real header, and section anchors land correctly.
- New color script reports zero new offenders across the routes above.

## Technical notes

- Header height variable can be set once from `Header.tsx` (`useLayoutEffect`) via `document.documentElement.style.setProperty("--app-header-h", `${h}px`)`.
- The Hired connector line currently ends at `bottom-10`; after removing the duplicate trophy, change to `bottom-4` so the gradient meets the finish node.
- Keep all edits in presentation code - no data or route-tree changes.
