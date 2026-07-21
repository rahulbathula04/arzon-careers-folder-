# Homepage audit — 2026-06-30

Pass: design / copy / a11y / claims hygiene for every section on `/`,
at 390, 768, 1280. Scored as Ship / Fix this ticket / Defer.

## Status legend

- ✅ Ship — passes all gates.
- 🔧 Fix this ticket — fixed alongside the hero rebuild.
- 📋 Defer — logged for a follow-up plan, does not block publish.

---

## 1. Hero — `src/components/landing/Hero.tsx`

- Design: ✅ navy + sky-300 + brand-gold combo holds at all breakpoints;
  TASK launch card has clear figure/figcaption separation; bottom proof
  rail wordmarks read at 40% opacity but pass AA against `#06080d`.
- Copy: 🔧 em-dash in "TASK officials — chief guests" replaced with
  middle dot to match the rest of the card eyebrow style.
- A11y: 🔧 both left-column CTAs now carry explicit `aria-label`s,
  `focus-visible` outlines, and ≥ 44 × 44 tap targets. `<aside>`
  re-labelled "Public launch event with TASK officials".
- Claims: ✅ no fabricated numbers, no countdown badge, no cohort
  Apply CTA. Static guard added (`scripts/check-hero-cta.mjs`).

## 2. TrackDomainGrid — `src/components/track/TrackDomainGrid.tsx`

- Design: ✅ 4-cell decision strip (Salary / Hiring / Difficulty /
  Demand) reads cleanly at mobile; `border-white/25` selected state
  passes the contrast bump.
- Copy: 📋 a couple of role labels still use marketing verbs
  ("master", "dominate") — flagged for a copy-claims pass.
- A11y: ✅ `aria-pressed` + checkmark glyph on selected card.
- Claims: ✅ numbers come from `src/data/industry/roles.ts`.

## 3. TaskPartnershipBlock (Government recognition)

- Design: ✅ recognition card titled, primary "View registration"
  pinned, watch-launch button retained.
- Copy: ✅ no superlatives caught by `check-copy-claims`.
- A11y: ✅ icon-only buttons carry labels; recent `tone-light` guard
  passes.
- Claims: ✅ all four recognition points cite the issuing body.

## 4. JD methodology / BentoProgrammes

- Design: 📋 cards still feel slightly under-dense at 1280 — defer to
  a density pass.
- Copy: ✅ JD bullets use qualitative bands from `jdProvenance.ts`.
- A11y: ✅ heading hierarchy clean (h2 → h3 → h4).
- Claims: ✅ no precise numbers.

## 5. NationalScaleBlock

- Design: ✅ IconTile primitive renders with consistent tone.
- Copy: 📋 "India's next decade" phrasing repeats the hero — defer
  for varietal copy.
- A11y: ✅
- Claims: ✅

## 6. GovtTrustBlock (continuation)

- Design: ✅
- Copy: ✅
- A11y: ✅ PlayCircle button labelled.
- Claims: ✅

## 7. Curriculum bento

- Design: 📋 some thumbnails still 1.5–1.8 MB on slow 4G — already
  on the deferred perf list.
- Copy: ✅ 40/30/20/10 framing matches `mem://design/deployment-readiness-framework`.
- A11y: ✅
- Claims: ✅

## 8. CohortVoices

- Design: ✅ "verifiable surrogates" pattern preserved
  (`mem://constraints/no-fabricated-testimonials`).
- Copy: ✅ no fabricated quotes.
- A11y: ✅
- Claims: ✅

## 9. InterviewRoadmap

- Design: 📋 lift visual separation between phases — deferred.
- Copy: ✅
- A11y: ✅
- Claims: ✅

## 10. Footer — `src/components/landing/Footer.tsx`

- Design: ✅ post raw-white baseline reset.
- Copy: ✅
- A11y: ✅ all social links have `title` + accessible name.
- Claims: ✅

---

## Deferred follow-up tickets

1. Density pass on JD/BentoProgrammes at ≥ 1280.
2. Copy variety pass — hero ↔ NationalScale share "India's next decade".
3. TrackDomainGrid copy claims sweep (marketing verbs).
4. Curriculum thumbnail perf budget (≤ 350 KB).
5. InterviewRoadmap phase-separation visual rebuild.

## Verification gates run for this ticket

- `node scripts/check-hero-cta.mjs` ✅
- `bunx tsgo --noEmit` ✅
- `bunx playwright test hero-cta-flow homepage-smoke` (CI)
