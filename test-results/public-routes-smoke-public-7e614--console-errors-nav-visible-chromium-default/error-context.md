# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: public-routes-smoke.spec.ts >> public routes smoke - mobile (iPhone 12) >> GET /acri renders, no console errors, nav visible
- Location: tests\e2e\public-routes-smoke.spec.ts:86:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('nav-menu-button')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByTestId('nav-menu-button')

```

```yaml
- link "Skip to main content":
  - /url: "#app-scroll-root"
- banner:
  - link "Arzon Global - go to home":
    - /url: /
    - paragraph: ARZON
  - link "Apply Now":
    - /url: https://forms.gle/kfB8iDEHtcBhBUrC9
- main:
  - paragraph: Methodology · v1 preview rubric
  - 'heading "ACRI: the Career Engine score, in public." [level=1]'
  - paragraph:
    - strong: Authenticated Candidate Readiness Index
    - text: is the readiness score every Career Engine result page shows. It is not a hiring tool and it is not a placement predictor. This page documents exactly how it is built so recruiters, TPOs and students can audit the same code the result page uses.
  - paragraph: 1 · What ACRI measures
  - heading "Five dimensions, one composite score" [level=2]
  - paragraph: Every ACRI score is the average of five 0–100 dimension scores. Definitions below match the labels students see on their result page.
  - paragraph: Dimension
  - paragraph: Operational reasoning
  - paragraph: Translating ambiguous tasks into ordered, executable steps under realistic constraints.
  - paragraph: Dimension
  - paragraph: Communication
  - paragraph: Clear written + spoken explanation to clinicians, reviewers and non-specialists.
  - paragraph: Dimension
  - paragraph: Documentation
  - paragraph: "Accurate, audit-ready written artefacts: case files, narratives, edit-checks, SOPs."
  - paragraph: Dimension
  - paragraph: Workflow thinking
  - paragraph: Comfort with software, tickets, queues and structured pipelines that healthcare ops runs on.
  - paragraph: Dimension
  - paragraph: Domain awareness
  - paragraph: Working medical / clinical vocabulary, regulatory landscape and patient-system context.
  - paragraph: 2 · How the score is computed
  - heading "Trait → dimension weighting matrix" [level=2]
  - paragraph: The table below is rendered live from the same scoring matrix the result page runs. We can't show you one thing here and ship something else.
  - paragraph: Each row's weights sum to 1.0. The final dimension scores are normalised against the strongest trait-driven dimension so bars remain readable even when traits are sparse.
  - paragraph: 3 · The 40 questions
  - heading "13 traits, scenario + behaviour + profile" [level=2]
  - paragraph: The question bank covers 13 traits (attention, logic, language, screen, patient, data, writing, sales, compliance, tech, lab, empathy, pressure). 40 items per attempt, mixed across scenario, behaviour and profile kinds.
  - link "Take the assessment":
    - /url: /career-engine
  - link "Request the question bank for review →":
    - /url: mailto:info@arzonglobal.com?subject=ACRI%20question%20bank%20request
  - paragraph: 4 · Bands & what they mean
  - heading "Three readiness bands, not a pass/fail" [level=2]
  - paragraph: Bands map a candidate to the right cohort entry point. They are not a hiring decision and they are not a placement guarantee.
  - paragraph: 5 · Calibration & sample size
  - heading "What we DO and DON'T claim" [level=2]
  - paragraph: Honest accounting of the v1 evidence base. We will not publish a reliability coefficient until the dataset can support a stable estimate.
  - heading "Calibration source" [level=3]
  - paragraph: Trait → dimension weights are derived from current Indian JDs across 6 role tracks, last refreshed Q2 2026. Sources are public listings (Naukri, LinkedIn India, Foundit, company careers pages).
  - link "See the JD Mirror →":
    - /url: /jd-mirror
  - heading "Current sample size" [level=3]
  - paragraph:
    - text: "Completed Career Engine attempts to date:"
    - strong: "0"
    - text: ". Leads captured (subset who chose to share contact):"
    - strong: "0"
    - text: . Count is live from the public sessions table.
  - heading "Reliability (Cronbach α / test-retest)" [level=3]
  - paragraph:
    - strong: Not yet published.
    - text: "A stable α estimate needs N ≥ 500 completions and a within-7-day re-test subset. We will publish the numbers here when both conditions are met. Today:"
    - strong: below threshold
    - text: .
  - heading "v1 preview rubric" [level=3]
  - paragraph: The trait → dimension weighting is the v1 preview rubric - derived from JD aggregation, not yet validated against the full ASSAY (Arzon Science and Skill Assessment for Industry Readiness) instrument. ASSAY will replace this map without changing the result page contract.
  - paragraph: 5.5 · Live AI Evaluation Instrument
  - heading "Automated Portfolio & ACRI Scorecard" [level=2]
  - paragraph: Try the interactive scoring engine to see how candidate GitHub repos, HackerRank DSA benchmarks, and ML model accuracies are auto-evaluated across 5 enterprise dimensions.
  - heading "Automated AI Portfolio & ACRI Scorecard" [level=3]
  - paragraph: Evaluated on Aug 27, 2026
  - button "Scorecard View"
  - button "Interactive Simulator"
  - img
  - text: 95 / 100 ACRI Executive VIP Direct Manager Delivery
  - paragraph: Automated AI Evaluation Summary
  - paragraph: Candidate benchmarked at 95/100 ACRI score (Executive VIP Direct Manager Delivery). Demonstrates High DSA & Algorithmic Problem Solving & Production-Grade ML Model Accuracy. Ready for direct partner desk profile presentation.
  - text: Key Strengths
  - list:
    - listitem: • High DSA & Algorithmic Problem Solving
    - listitem: • Production-Grade ML Model Accuracy
    - listitem: • Dockerized Container Architecture
    - listitem: • Automated CI/CD Pipeline Integration
  - text: Improvement Flags
  - list:
    - listitem: • Continue expanding enterprise dataset benchmarks
  - heading "5 Enterprise Dimension Scores" [level=4]
  - text: Code Quality & DSA Efficiency 90/100
  - paragraph: Optimal O(N log N) space/time efficiency and clean modular function design.
  - text: System Architecture & Scalability 100/100
  - paragraph: Robust multi-tier project layout with containerized microservice structure.
  - text: Enterprise AI/ML Pipeline & Models 95/100
  - paragraph: High-performing model pipeline with clean cross-validation and feature scaling.
  - text: Production Hygiene & CI/CD 92/100
  - paragraph: Automated GitHub Actions CI runner present with >80% test suite assertion coverage.
  - text: Documentation & Communication 100/100
  - paragraph: Comprehensive README.md, API endpoint specs, and architecture diagrams included.
  - button "Run AI Portfolio Re-Scan"
  - button "Export PDF"
  - button "Share Verification"
  - paragraph: 6 · Limits & non-claims
  - heading "What ACRI is not" [level=2]
  - paragraph: "The score answers one question: which cohort entry point fits this candidate today. It deliberately does not try to answer the others."
  - list:
    - listitem:
      - paragraph: Not a hiring decision
      - paragraph:
        - text: ACRI is a cohort-entry signal, not an offer signal. Recruiters should rely on the
        - link "grading rubric":
          - /url: /recruiters
        - text: + verified work samples instead.
    - listitem:
      - paragraph: Not a placement predictor
      - paragraph:
        - text: We will not correlate ACRI to offer outcomes until the placements ledger is large enough to be statistically meaningful. The
        - link "public ledger":
          - /url: /trust-report
        - text: is the only outcome surface.
    - listitem:
      - paragraph: Not psychometric ASSAY
      - paragraph: ASSAY is the full Arzon assessment instrument; ACRI v1 is a JD-derived preview. The naming reflects the difference.
    - listitem:
      - paragraph: Not an IQ / personality test
      - paragraph: ACRI does not score intelligence, personality, or behavioural archetypes outside the 5 published dimensions.
  - paragraph: Spotted an error in this methodology?
  - paragraph:
    - text: Email
    - link "info@arzonglobal.com":
      - /url: mailto:info@arzonglobal.com?subject=ACRI%20methodology%20issue
    - text: with the dimension or trait in question. Every reported issue is logged on the public
    - link "trust ledger":
      - /url: /trust-report
    - text: ", resolved or not."
  - contentinfo:
    - paragraph: ONE YEAR FROM NOW…
    - heading "You can still be watching YouTube playlists and applying to black-hole job boards." [level=3]
    - paragraph: Or you can be preparing for interviews with recruiters who already know your verified assessment scorecard.
    - paragraph: Still deciding?
    - paragraph: Book a 15-minute eligibility review. No payment required. Just clarity.
    - link "Book 15-Min Eligibility Review":
      - /url: "#apply"
    - img "Arzon Global"
    - paragraph: ARZON
    - paragraph: GLOBAL
    - paragraph: India's EdTech career platform. Certified recruitment partner across Tier-1 Tech Enterprises & Quant Fintechs.
    - paragraph: "Hyderabad, India · Social: Instagram @arzon.global"
    - paragraph: PROGRAMMES
    - list:
      - listitem:
        - link "Tier-1 Enterprise AI/ML Cohort":
          - /url: /courses
      - listitem:
        - link "Quant Financial Engineering Track":
          - /url: /courses
      - listitem:
        - link "Clinical Healthcare Tracks":
          - /url: /courses
      - listitem:
        - link "Readiness Test":
          - /url: /career-engine/start
    - paragraph: PROOF & TRUST
    - list:
      - listitem:
        - link "Certificate Verifier (/verify)":
          - /url: /verify
      - listitem:
        - link "Methodology & Receipts":
          - /url: /why-arzon
      - listitem:
        - link "Refund & Trust Ledger":
          - /url: /refund
      - listitem:
        - link "System Changelog":
          - /url: /changelog
    - paragraph: LEGAL & CONTACT
    - list:
      - listitem:
        - link "Contact Us":
          - /url: /contact
      - listitem:
        - link "Privacy Policy":
          - /url: /legal/privacy
      - listitem:
        - link "Terms of Service":
          - /url: /legal/terms
      - listitem:
        - link "WhatsApp Support":
          - /url: https://wa.me/919121283638?text=Hi%20Arzon%20team%2C%20I%20would%20like%20guidance%20on%20my%20healthcare%20career%20options.
    - paragraph: "Arzon Global is a certified recruitment partner across Tier-1 Tech Enterprises & Quant Fintechs (VMO ID: ENT2026-GLOBAL-VMO026), effective July 2026. Recruitment partnership status means Arzon Global supports talent acquisition through candidate sourcing, screening, and presentation. All hiring decisions are at the sole discretion of partner employer teams. No placement guarantee is implied by recruitment partner status. Programme fees and refund policy are published in the public trust ledger. ASCI guidelines apply to all marketing communications. ISO 9001:2015 certified. MSME UDYAM registered. MCA incorporated."
    - paragraph: © 2026 Arzon Global Labs. All rights reserved. Registered under Ministry of Corporate Affairs, Govt of India.
```