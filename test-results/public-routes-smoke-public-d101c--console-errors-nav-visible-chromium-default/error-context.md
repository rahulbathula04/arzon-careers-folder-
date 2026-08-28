# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: public-routes-smoke.spec.ts >> public routes smoke - mobile (iPhone 12) >> GET /recruiters renders, no console errors, nav visible
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
  - paragraph: For recruiters & hiring managers
  - heading "Verify any Arzon candidate. See the rubric. See the work." [level=1]
  - paragraph: One page that answers every recruiter question about an Arzon Global candidate - is the certificate real, what does the grade mean in JD-task terms, and what work have they actually shipped.
  - textbox "Paste a certificate ID, e.g. AG-PV-2026-001": AG-PV-2026-001
  - button "Verify"
  - paragraph: Grade band → JD-task outcomes
  - heading "What B+ vs A actually means on day 1" [level=2]
  - paragraph: Bands are performance-based, mapped to live JD requirements. Pick a track to see the rubric the auditor scored against.
  - button "Pharmacovigilance" [pressed]
  - button "Medical Coding"
  - button "Clinical Data Management"
  - button "SAS Programming (Clinical)"
  - button "Regulatory Affairs"
  - button "Medical Writing"
  - paragraph: JD role calibrated against
  - paragraph: Drug Safety Associate
  - paragraph: Graded deliverables
  - list:
    - listitem: 10 redacted ICSR cases, end-to-end (intake → MedDRA → narrative)
    - listitem: 1 aggregate-report section (PSUR / PBRER)
    - listitem: Argus Safety hands-on capstone (simulated)
  - table:
    - rowgroup:
      - row "Band Cutoff What they can do (JD-task terms) Recruiter read":
        - columnheader "Band"
        - columnheader "Cutoff"
        - columnheader "What they can do (JD-task terms)"
        - columnheader "Recruiter read"
    - rowgroup:
      - row "A ≥ 90 % Owns ICSR end-to-end at ≥ 95% accuracy, MedDRA-codes without supervisor edits, drafts narrative + aggregate sections without rework. Shippable from day 1. Skip the QC pod, put on live cases.":
        - cell "A"
        - cell "≥ 90 %"
        - cell "Owns ICSR end-to-end at ≥ 95% accuracy, MedDRA-codes without supervisor edits, drafts narrative + aggregate sections without rework."
        - cell "Shippable from day 1. Skip the QC pod, put on live cases."
      - row "B+ 75-89 % Processes ICSRs with reviewer sign-off, MedDRA hit-rate ≥ 90%, narrative drafts need light editing. Standard fresher hire - pair with senior for 4-6 weeks, then production.":
        - cell "B+"
        - cell "75-89 %"
        - cell "Processes ICSRs with reviewer sign-off, MedDRA hit-rate ≥ 90%, narrative drafts need light editing."
        - cell "Standard fresher hire - pair with senior for 4-6 weeks, then production."
      - row "B 60-74 % Completes intake + coding but needs supervised QC on every case, narrative requires major rewrite. Hire only into structured training pods (Cognizant / Accenture-style).":
        - cell "B"
        - cell "60-74 %"
        - cell "Completes intake + coding but needs supervised QC on every case, narrative requires major rewrite."
        - cell "Hire only into structured training pods (Cognizant / Accenture-style)."
      - row "NA < 60 % Certificate not awarded. Did not clear the production accuracy bar. Not on the recruiter list.":
        - cell "NA"
        - cell "< 60 %"
        - cell "Certificate not awarded. Did not clear the production accuracy bar."
        - cell "Not on the recruiter list."
  - paragraph: Bands are performance-based, not participation-based. A student who does not clear the production accuracy bar does not receive a certificate - they are not on the recruiter list at all.
  - paragraph: The work, not the quote
  - heading "De-identified work samples, one per active track" [level=2]
  - paragraph: Track-level previews; full artifacts (redacted PDF + auditor scoring sheet) sent on recruiter request with student consent.
  - paragraph: Pharmacovigilance
  - heading "ICSR case file (de-identified)" [level=3]
  - paragraph: Spontaneous report · 64F · suspected SAE post-anticoagulant initiation
  - list:
    - listitem: Full E2B(R3) intake - primary source, reporter, dates
    - listitem: MedDRA LLT coding with PT roll-up + WHO-DD product mapping
    - listitem: Mentor-reviewed narrative; 3 graded passes before sign-off
  - paragraph: Full artifact (redacted PDF + auditor scoring sheet) sent on recruiter request - student consent recorded.
  - link "Request the full sample":
    - /url: /contact
  - paragraph: Medical Coding
  - heading "Multi-specialty chart (de-identified)" [level=3]
  - paragraph: Outpatient cardiology consult · ICD-10 + CPT + E/M level 4
  - list:
    - listitem: ICD-10-CM primary + 4 comorbidities, NCCI edits checked
    - listitem: CPT with modifiers; E/M leveled with MDM justification
    - listitem: Mock CPC audit form attached - accuracy 96%
  - paragraph: Full artifact (redacted PDF + auditor scoring sheet) sent on recruiter request - student consent recorded.
  - link "Request the full sample":
    - /url: /contact
  - paragraph: Clinical Data Management
  - heading "eCRF + edit-check spec (Rave study)" [level=3]
  - paragraph: Phase II oncology · Demographics, AE, ConMed forms
  - list:
    - listitem: CDASH-aligned CRF build in Medidata Rave (study build screenshot)
    - listitem: Edit-check spec written + executed; query log attached
    - listitem: SAE reconciliation report from mock database lock
  - paragraph: Full artifact (redacted PDF + auditor scoring sheet) sent on recruiter request - student consent recorded.
  - link "Request the full sample":
    - /url: /contact
  - paragraph: Selectivity, not volume
  - heading "We turn away ~ 64% of applicants. On purpose." [level=2]:
    - text: We turn away
    - emphasis: ~ 64%
    - text: of applicants. On purpose.
  - paragraph:
    - text: Cohorts cap at 60 seats. We accept
    - strong: 36 out of every 100
    - text: who apply because mentor attention does not scale, and weak fits hurt the cohort.
  - paragraph: "0"
  - paragraph: Applied
  - paragraph: to the last 3 cohorts
  - paragraph: "0"
  - paragraph: Cleared the fit-test
  - paragraph: ACRI score ≥ 62
  - paragraph: "0"
  - paragraph: Enrolled
  - paragraph: we accepted
  - paragraph: "0"
  - paragraph: Turned away
  - paragraph: we declined
  - paragraph: Acceptance rate · last 3 cohorts
  - paragraph: 36%
  - paragraph:
    - text: Compared to industry edtech average of
    - strong: ~92%
    - text: (almost everyone is accepted). We are deliberately strict, that's why hiring partners trust our certificate.
  - paragraph: TASK · Govt of Telangana · 30 July 2025
  - paragraph: TASK officials joined as chief guests at our public launch.
  - list:
    - listitem:
      - link "ISO 9001":
        - /url: /proof#iso
    - listitem:
      - link "MCA":
        - /url: /proof#mca
    - listitem:
      - link "MSME":
        - /url: /proof#msme
  - link "Apply now":
    - /url: /apply
  - paragraph: Want it all in one PDF?
  - heading "Get the de-identified recruiter pack" [level=2]
  - paragraph: The rubric, sample artifacts, and verification flow on one page. We email the link to your work address and a counsellor follows up within 4 working hours.
  - paragraph: Request the recruiter pack
  - heading "We email the de-identified pack to your work address" [level=3]
  - text: Your name
  - textbox "Your name"
  - text: Company
  - textbox "Company"
  - text: Work email
  - textbox "Work email"
  - text: Your role (optional)
  - textbox "Your role (optional)"
  - text: Hiring year / cohort
  - textbox "Hiring year / cohort"
  - text: Hiring domain (e.g. CR, PV)
  - textbox "Hiring domain (e.g. CR, PV)"
  - checkbox "I agree to be contacted by an Arzon counsellor about this request. We won't add you to any marketing list."
  - text: I agree to be contacted by an Arzon counsellor about this request. We won't add you to any marketing list.
  - button "Send me the pack"
  - paragraph: We use your email only to send the pack and have a counsellor follow up. No marketing list.
  - heading "Hire from the next Arzon cohort" [level=2]
  - paragraph: Tell us the role + city, we send a shortlist with verified IDs and grade bands. We do not charge recruiters; placements go on the public ledger.
  - link "Talk to partnerships":
    - /url: /contact
  - link "Read the public ledger →":
    - /url: /trust-report
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