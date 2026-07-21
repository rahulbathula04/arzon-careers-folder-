# SEO Content Brief — Medical Coding Internship

**Target route:** `/internships/medical-coding`  
**Primary keyword:** medical coding internship  
**Search intent:** transactional / commercial-investigation. Users are students or fresh grads evaluating a paid programme that will get them a coding job in India.

## Keyword cluster

| Keyword                                    | Intent        | Monthly volume (est.) | Difficulty |
| ------------------------------------------ | ------------- | --------------------- | ---------- |
| medical coding internship                  | commercial    | 4 800                 | Med        |
| medical coding internship for freshers     | commercial    | 1 600                 | Low        |
| medical coding internship in hyderabad     | local         | 720                   | Low        |
| icd-10 internship online india             | informational | 320                   | Low        |
| medical coding internship with certificate | commercial    | 590                   | Low        |
| medical coder course for b.pharm           | commercial    | 480                   | Low        |

## SERP findings (manual prompts)

Run a private SERP scan for the primary keyword and capture:

1. Top 3 ranking pages (URL, word count, schema, H2 set)
2. People-Also-Ask box (use as FAQ source)
3. "Related searches" (use as internal-linking targets)
4. Whether Google shows a Course rich result, FAQ accordion, or video carousel

## Required schema

- `Course` (already wired)
- `BreadcrumbList` (already wired)
- `FAQPage` (already wired via `faqJsonLd()` in InternshipLanding)
- `Organization` inherited from root

## Page outline (H1 → H2 → H3)

- **H1 — A medical coding internship that actually gets you hired**
  - Sub: live mentors, real charts, ICD-10 + CPT + HCPCS, built for Indian students.
- **H2 — Who this internship is for**
  - List: B.Pharm, Pharm.D, B.Sc Life Sciences, BDS, BHMS, BAMS, Nursing
- **H2 — What you'll learn (12-week breakdown)**
  - H3 — Anatomy + medical terminology, fast-tracked
  - H3 — ICD-10-CM coding from real (anonymised) charts
  - H3 — CPT and HCPCS Level II
  - H3 — Audit trails, NCCI edits, denial workflow
- **H2 — Real outcomes (with salary bands)**
  - Table: Coder fresher / Senior coder / QA / HCC coder
- **H2 — Live mentor sessions, not pre-recorded fluff**
- **H2 — Certificate + LOR you can actually show on LinkedIn**
- **H2 — Why Arzon Global** (compliance bar — ISO 9001 / MSME / MCA)
- **H2 — Frequently asked questions**
- **H2 — Reserve your seat** (CTA → fit test)

## Internal links (must include)

- → `/internships/pharmacovigilance` (cross-stream)
- → `/internships/clinical-data-management`
- → `/courses` (full catalogue)
- → `/proof` (compliance evidence)
- → `/cohorts` (next batch dates)
- → `/refund` (risk-reversal)
- → `/career-engine` (top-of-funnel)

## Word count target

1 400 – 1 800 words. Current page is ~750. Expand the "What you'll learn" + outcomes sections with concrete examples (sample charts coded, MAC + payer rules covered, denial-handling workflow walkthrough).

## Primary CTA

"Take the free 3-min fit test" → `/career-engine`. Secondary CTA: WhatsApp counsellor.

## Checklist before shipping copy

- [ ] H1 contains primary keyword
- [ ] First paragraph mentions location ("India") + audience ("students")
- [ ] At least one image with descriptive alt mentioning "medical coding internship"
- [ ] FAQ has 6+ questions targeting PAA box
- [ ] Internal links above are all present
- [ ] Schema validated in `https://search.google.com/test/rich-results`
