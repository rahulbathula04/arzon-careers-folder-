# Visual baseline changelog

Every change to `tests/visual/baseline/**` must have a matching entry here
(or carry the `baseline-refresh` PR label). This exists so palette / token /
gradient regressions can't be silently laundered through a screenshot diff.

Format: `## YYYY-MM-DD — short reason` followed by bullet points listing
which components changed and why.

---

## Initial lock

- Seeded by the first successful `visual:hero:update` run on `main`.
- Covers: landing hero, landing primary CTA, course hero, course enrol CTA,
  trust ribbon, testimonials (CohortVoices), final CTA band — desktop and
  mobile variants where applicable.
