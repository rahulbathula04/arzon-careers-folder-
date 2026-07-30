# Sprint 1 · Design-system audit

- `.tsx` files scanned: **329**
- Files containing a raw `<button>`: **66** (should route through `Button` / `CTAButton`)
- Files containing a raw `<a class="…rounded-* px-…">` (button-styled anchor): **14**
- Files using non-canonical section padding (`py-12/14/16/18/20/24/28/32`): **41**
- Files with multiple `<h1>` tags: **6**

## Top offenders - raw `<button>`

| File                                           | Count |
| ---------------------------------------------- | ----: |
| `src/routes/enrol.$tier.pay.tsx`               |    10 |
| `src/components/learn/PlayerLayout.tsx`        |     9 |
| `src/components/admin/AdminShell.tsx`          |     7 |
| `src/routes/admin.demand.tsx`                  |     7 |
| `src/routes/career-engine.test.tsx`            |     7 |
| `src/components/courses/CourseGrid.tsx`        |     6 |
| `src/routes/admin.funnel.tsx`                  |     6 |
| `src/routes/admin.seo.tsx`                     |     6 |
| `src/components/feedback/AiFeedbackPrompt.tsx` |     4 |
| `src/routes/admin.leads.tsx`                   |     4 |

## Section rhythm - ad-hoc `py-*` distribution

| Utility | Occurrences |
| ------- | ----------: |
| `py-12` |          15 |
| `py-14` |           9 |
| `py-16` |          26 |
| `py-20` |          14 |
| `py-24` |          15 |
| `py-28` |           1 |
| `py-32` |           2 |

**Canonical:** `Section size="lg"` → `py-16 md:py-24`. Any file using `py-12/20/28/32` should adopt the primitive or justify with a comment.
