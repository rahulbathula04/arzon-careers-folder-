# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: public-routes-smoke.spec.ts >> public routes smoke - mobile (iPhone 12) >> GET /industry renders, no console errors, nav visible
- Location: tests\e2e\public-routes-smoke.spec.ts:86:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('nav-menu-button')
Expected: visible
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
  - paragraph: Industry Intelligence
  - heading "What hiring actually pays in India, 2026." [level=1]
  - paragraph: We scrape the JD boards, talk to alumni inside these firms, and publish the numbers. No staffing-agency spin, no LinkedIn brag-posts. Refreshed every quarter.
  - button "Download full PDF summary"
  - text: All 5 roles · pay, employers, abroad markets, sources.
  - link "Salary tables Pay by role, city, experience.":
    - /url: /industry/salaries?city=all&exp=fresher&role=all
    - paragraph: Salary tables
    - paragraph: Pay by role, city, experience.
  - link "Top employers ~30 firms, what they pay at L1.":
    - /url: /industry/employers?city=all&role=all&tier=all
    - paragraph: Top employers
    - paragraph: ~30 firms, what they pay at L1.
  - 'link "Compare all 5 Side-by-side: pay, demand, AI risk."':
    - /url: /industry/compare
    - paragraph: Compare all 5
    - paragraph: "Side-by-side: pay, demand, AI risk."
  - paragraph: Role profiles
  - link "PV Pharmacovigilance The drug-safety job that India quietly runs for the world.":
    - /url: /industry/pharmacovigilance
    - paragraph: PV
    - paragraph: Pharmacovigilance
    - paragraph: The drug-safety job that India quietly runs for the world.
  - link "Open profile":
    - /url: /industry/pharmacovigilance
  - link "Apply for PV →":
    - /url: /apply?programme=pharmacovigilance&source=industry-hub-pharmacovigilance
  - link "Coding Medical Coding The highest-volume healthcare hire in India. 80,000 openings/yr.":
    - /url: /industry/medical-coding
    - paragraph: Coding
    - paragraph: Medical Coding
    - paragraph: The highest-volume healthcare hire in India. 80,000 openings/yr.
  - link "Open profile":
    - /url: /industry/medical-coding
  - link "Apply for Coding →":
    - /url: /apply?programme=medical-coding&source=industry-hub-medical-coding
  - link "CDM Clinical Data Management The data backbone of every clinical trial. Pays better than PV.":
    - /url: /industry/clinical-data-management
    - paragraph: CDM
    - paragraph: Clinical Data Management
    - paragraph: The data backbone of every clinical trial. Pays better than PV.
  - link "Open profile":
    - /url: /industry/clinical-data-management
  - link "Apply for CDM →":
    - /url: /apply?programme=clinical-data-management&source=industry-hub-clinical-data-management
  - link "RA Regulatory Affairs The job that decides whether a drug or device is allowed to be sold.":
    - /url: /industry/regulatory-affairs
    - paragraph: RA
    - paragraph: Regulatory Affairs
    - paragraph: The job that decides whether a drug or device is allowed to be sold.
  - link "Open profile":
    - /url: /industry/regulatory-affairs
  - link "Apply for RA →":
    - /url: /apply?programme=regulatory-affairs&source=industry-hub-regulatory-affairs
  - link "AI Health AI in Healthcare The role healthcare companies are creating fastest in 2025-26.":
    - /url: /industry/ai-in-healthcare
    - paragraph: AI Health
    - paragraph: AI in Healthcare
    - paragraph: The role healthcare companies are creating fastest in 2025-26.
  - link "Open profile":
    - /url: /industry/ai-in-healthcare
  - link "Apply for AI Health →":
    - /url: /apply?programme=ai-intelligence&source=industry-hub-ai-in-healthcare
  - link "CRA/CTM Clinical Research The job that runs the trial that gets the drug approved.":
    - /url: /industry/clinical-research
    - paragraph: CRA/CTM
    - paragraph: Clinical Research
    - paragraph: The job that runs the trial that gets the drug approved.
  - link "Open profile":
    - /url: /industry/clinical-research
  - link "Apply for CRA/CTM →":
    - /url: /apply?programme=clinical-research&source=industry-hub-clinical-research
  - link "MW Medical Writing The job that turns clinical data into the document the regulator reads.":
    - /url: /industry/medical-writing
    - paragraph: MW
    - paragraph: Medical Writing
    - paragraph: The job that turns clinical data into the document the regulator reads.
  - link "Open profile":
    - /url: /industry/medical-writing
  - link "Apply for MW →":
    - /url: /apply?programme=medical-writing&source=industry-hub-medical-writing
  - paragraph: More roles (SAS Programming, Clinical Research, RCM, Healthcare IT) ship next cohort.
  - region "See if you're ready for these roles - in 3 minutes, free.":
    - paragraph: What does this mean for you?
    - paragraph: Five roles. Real pay. The honest answer to "am I ready?" takes three minutes.
    - heading "See if you're ready for these roles - in 3 minutes, free." [level=2]
    - paragraph: Take the ACRI Readiness Preview. You'll get a score across the 5 dimensions recruiters screen for, the track that fits, and the next step you can take today.
    - link "Take the free 3-min assessment":
      - /url: /career-engine
    - link "Or talk to a counsellor on WhatsApp":
      - /url: https://wa.me/919121283638?text=Hi%20Arzon%2C%20I'm%20exploring%20healthcare%20roles%20on%20the%20industry%20pages.%20Can%20a%20counsellor%20guide%20me%3F
    - paragraph: Free · 3 minutes · yours forever · no login
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