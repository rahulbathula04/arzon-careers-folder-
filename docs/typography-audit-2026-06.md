# Typography Audit Report

Generated: 2026-06-17T10:10:10.757Z
Total ad-hoc usages: **1388** across **193** files

## Summary by category

| Category                                 | Count |
| ---------------------------------------- | ----: | ---- |
| raw text-[Npx                            |  rem] | 1330 |
| ad-hoc text-Nxl (use text-display/h1/h2) |    51 |
| raw leading-[…]                          |     7 |

## Top 30 offenders by file

| File                                                   | Total | Breakdown     | Sample                                                                       |
| ------------------------------------------------------ | ----: | ------------- | ---------------------------------------------------------------------------- | -------------------- |
| `src/routes/career-engine.result.tsx`                  |    50 | raw text-[Npx | rem] (48); raw leading-[…] (1); ad-hoc text-Nxl (use text-display/h1/h2) (1) | `413: text-[10px]`   |
| `src/routes/admin.funnel.tsx`                          |    40 | raw text-[Npx | rem] (40)                                                                    | `167: text-[11px]`   |
| `src/routes/admin.index.tsx`                           |    33 | raw text-[Npx | rem] (33)                                                                    | `33: text-[24px]`    |
| `src/routes/build.$slug.tsx`                           |    29 | raw text-[Npx | rem] (28); ad-hoc text-Nxl (use text-display/h1/h2) (1)                      | `46: text-[12px]`    |
| `src/components/landing/Footer.tsx`                    |    28 | raw text-[Npx | rem] (28)                                                                    | `55: text-[13px]`    |
| `src/routes/admin.results.tsx`                         |    25 | raw text-[Npx | rem] (25)                                                                    | `221: text-[11px]`   |
| `src/components/landing/Pricing.tsx`                   |    24 | raw text-[Npx | rem] (20); ad-hoc text-Nxl (use text-display/h1/h2) (4)                      | `154: text-[10.5px]` |
| `src/components/learn/PlayerLayout.tsx`                |    24 | raw text-[Npx | rem] (24)                                                                    | `161: text-[11px]`   |
| `src/routes/career-engine.test.tsx`                    |    23 | raw text-[Npx | rem] (21); raw leading-[…] (2)                                               | `347: text-[10px]`   |
| `src/routes/industry.compare.tsx`                      |    23 | raw text-[Npx | rem] (22); ad-hoc text-Nxl (use text-display/h1/h2) (1)                      | `45: text-[11px]`    |
| `src/components/recruiters/CandidatePortfolio.tsx`     |    21 | raw text-[Npx | rem] (19); ad-hoc text-Nxl (use text-display/h1/h2) (2)                      | `53: text-[10px]`    |
| `src/components/career/CareerForecast.tsx`             |    20 | raw text-[Npx | rem] (19); ad-hoc text-Nxl (use text-display/h1/h2) (1)                      | `95: text-[10.5px]`  |
| `src/routes/enrol.$tier.pay.tsx`                       |    20 | raw text-[Npx | rem] (19); ad-hoc text-Nxl (use text-display/h1/h2) (1)                      | `757: text-[11px]`   |
| `src/components/career/cards/IndustryFitScoreCard.tsx` |    18 | raw text-[Npx | rem] (18)                                                                    | `82: text-[10.5px]`  |
| `src/routes/courses.$slug.tsx`                         |    18 | raw text-[Npx | rem] (18)                                                                    | `246: text-[11px]`   |
| `src/routes/deployment-model.tsx`                      |    17 | raw text-[Npx | rem] (12); raw leading-[…] (1); ad-hoc text-Nxl (use text-display/h1/h2) (4) | `160: text-[10px]`   |
| `src/routes/acri.tsx`                                  |    16 | raw text-[Npx | rem] (14); ad-hoc text-Nxl (use text-display/h1/h2) (2)                      | `53: text-[10.5px]`  |
| `src/routes/curriculum.tsx`                            |    16 | raw text-[Npx | rem] (14); raw leading-[…] (1); ad-hoc text-Nxl (use text-display/h1/h2) (1) | `44: text-[10px]`    |
| `src/routes/r.$id.brief.tsx`                           |    16 | raw text-[Npx | rem] (16)                                                                    | `66: text-[10.5px]`  |
| `src/components/landing/ApplicationForm.tsx`           |    15 | raw text-[Npx | rem] (15)                                                                    | `248: text-[10.5px]` |
| `src/components/recruiters/ArtifactRequestLane.tsx`    |    15 | raw text-[Npx | rem] (15)                                                                    | `75: text-[15px]`    |
| `src/routes/build.index.tsx`                           |    15 | raw text-[Npx | rem] (15)                                                                    | `95: text-[12.5px]`  |
| `src/routes/build.request.tsx`                         |    15 | raw text-[Npx | rem] (13); ad-hoc text-Nxl (use text-display/h1/h2) (2)                      | `140: text-[11px]`   |
| `src/routes/r.artifact.$token.tsx`                     |    15 | raw text-[Npx | rem] (14); ad-hoc text-Nxl (use text-display/h1/h2) (1)                      | `76: text-[10.5px]`  |
| `src/components/briefing/BriefingPackForm.tsx`         |    14 | raw text-[Npx | rem] (14)                                                                    | `104: text-[16px]`   |
| `src/components/career/cards/FlagshipTrackCard.tsx`    |    14 | raw text-[Npx | rem] (14)                                                                    | `33: text-[10.5px]`  |
| `src/components/courses/Certificate.tsx`               |    14 | raw text-[Npx | rem] (12); ad-hoc text-Nxl (use text-display/h1/h2) (2)                      | `54: text-[120px]`   |
| `src/components/landing/BentoProgrammes.tsx`           |    13 | raw text-[Npx | rem] (13)                                                                    | `96: text-[10px]`    |
| `src/components/landing/HowItWorks.tsx`                |    13 | raw text-[Npx | rem] (12); ad-hoc text-Nxl (use text-display/h1/h2) (1)                      | `117: text-[11px]`   |
| `src/routes/industry.$role.$city.tsx`                  |    13 | raw text-[Npx | rem] (12); ad-hoc text-Nxl (use text-display/h1/h2) (1)                      | `93: text-[11px]`    |

## Recommended replacements

| Ad-hoc pattern                               | Replacement utility (defined in src/styles.css) |
| -------------------------------------------- | ----------------------------------------------- |
| `text-6xl md:text-7xl` / `text-[Npx]` ≥ 40px | `text-display`                                  |
| `text-4xl md:text-5xl`                       | `text-h1`                                       |
| `text-2xl md:text-3xl`                       | `text-h2`                                       |
| `text-xl md:text-2xl`                        | `text-h3`                                       |
| `text-lg` heading                            | `text-h4`                                       |
| `text-base` paragraph                        | `text-body`                                     |
| `text-sm` paragraph                          | `text-body-sm`                                  |
| `text-xs` label                              | `text-caption`                                  |
| `text-[11px] uppercase tracking-widest`      | `text-overline`                                 |
| `leading-[1.1]` etc. on headings             | none - `text-h*` ships line-height              |
