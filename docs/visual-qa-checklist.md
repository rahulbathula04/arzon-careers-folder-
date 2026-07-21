# Visual QA Checklist

Run before every publish. Two halves: **automated** (one command) and
**manual** (eyeball at 360 / 768 / 1280 / 1920). Skipping the manual half
is how broken layouts ship.

---

## 1. Automated gate (≈ 2 minutes)

```bash
bun run lint:visual              # contrast tokens + dark-island lint
bun run test:visual              # Playwright: text-visibility, readability,
                                 # full-pages-visual, result-cards-visual,
                                 # background-layer-visual
bunx playwright test overlap-clipping --project=chromium-default
```

The `overlap-clipping` spec sweeps **14 public routes × 5 viewports
(360 / 390 / 768 / 1280 / 1920)** and fails when it finds:

- Interactive controls (a, button, input) sitting outside the viewport
- Headings/paragraphs whose `scrollWidth > clientWidth` while `overflow`
  is hidden/clip (silently truncated text)
- Two `position: fixed | sticky` elements that overlap (FAB on top of
  the sticky mobile CTA, two toasts colliding, etc.)
- A heading whose computed `color` equals its background (invisible)

If `overlap-clipping` fails, the error message lists each offender as
`[kind] selector — note`. Fix the component, do not loosen `ALLOWANCE`
unless the offender is intentional and documented inline.

---

## 2. Manual sweep (≈ 5 minutes)

Open the preview at each viewport with the device switcher above the
preview window. Walk these routes top to bottom:

```
/, /curriculum, /courses, /courses/pharmacovigilance, /credibility,
/proof, /about, /cohorts, /contact, /apply, /refund, /verify,
/legal/terms, /legal/privacy
```

For each route, at **360 / 390 / 768 / 1280 / 1920**, confirm:

### Layout

- [ ] No horizontal scrollbar on `<body>` (drag the page sideways — it
      should not move).
- [ ] Hero headline never line-breaks awkwardly (no orphan word on its
      own line at 1280).
- [ ] Cards in the same grid row share the same height.
- [ ] Sticky bottom CTA on mobile does not cover the last paragraph of
      the route; scroll all the way down and confirm the footer is fully
      readable above the FAB + sticky CTA.

### Typography

- [ ] Headings on dark sections render white-on-dark (not navy-on-navy).
- [ ] Body copy on light sections renders dark ink (not light-grey on
      white).
- [ ] No `[overflow-wrap:anywhere]` words breaking unnecessarily on
      desktop (means the container is too narrow, not the type rule).

### Interaction

- [ ] All CTAs are tappable: minimum 44 × 44 px on mobile, with the full
      label visible.
- [ ] Track-jump pills on `/curriculum` scroll horizontally on mobile,
      wrap on `sm+`.
- [ ] Footer external links (`arzonglobal.com`, `assaylabs.in`) open in a
      new tab.

### Overlap / hidden

- [ ] WhatsApp FAB does not sit on top of disclaimer fine-print
      (`[data-fab-avoid]` markers handle this — verify on
      `/refund` and `/legal/*` where the disclaimers live).
- [ ] Nav SectionRail on mobile does not cover the first heading.
- [ ] Toast / dialog content (TrustVideoDialog, sheet menu) is fully
      inside the viewport.

---

## 3. Tone-dark contract

Any element that ships a hard-coded dark background (`bg-[#0…]`,
`bg-black`, `bg-slate-9..`) **must** carry `tone-dark` on the same
element, or sit inside a `.surface-island-dark` parent. Run:

```bash
bun run check:darkislands
```

The lint currently runs informationally (104 false-positive descendants
to triage). Treat new offenders introduced by your branch as blockers.

---

## 4. After publish

- [ ] Open the production URL on a real phone (not just devtools).
- [ ] Walk `/`, `/curriculum`, `/credibility`, `/apply` once.
- [ ] Check Lighthouse mobile score in Chrome devtools → Performance
      ≥ 85, Accessibility = 100.
