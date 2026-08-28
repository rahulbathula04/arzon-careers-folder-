# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: public-routes-smoke.spec.ts >> public routes smoke - desktop (1440×900) >> GET /courses/compare renders, no console errors, apply CTA visible
- Location: tests\e2e\public-routes-smoke.spec.ts:110:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('nav-apply-cta')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByTestId('nav-apply-cta')

```

```yaml
- link "Skip to main content":
  - /url: "#app-scroll-root"
- banner:
  - link "Arzon Global - go to home":
    - /url: /
    - paragraph: ARZON
  - navigation "Main navigation":
    - link "Programmes":
      - /url: /courses
    - link "Proof & Credibility":
      - /url: /why-arzon
    - link "Public Verifier":
      - /url: /verify
    - link "About Us":
      - /url: /about
  - link "Apply Now":
    - /url: https://forms.gle/kfB8iDEHtcBhBUrC9
- main:
  - paragraph: Side-by-side
  - heading "Arzon vs typical alternatives" [level=1]
  - paragraph: The clearest way to evaluate any programme is to put it next to its alternatives. Here is how Arzon Careers compares with typical online ed-tech and YouTube self-study.
  - table:
    - rowgroup:
      - row "Feature Arzon Careers Typical online ed-tech YouTube self-study":
        - columnheader "Feature"
        - columnheader "Arzon Careers"
        - columnheader "Typical online ed-tech"
        - columnheader "YouTube self-study"
    - rowgroup:
      - row "ISO 9001 certified provider Yes No No":
        - cell "ISO 9001 certified provider"
        - cell "Yes"
        - cell "No"
        - cell "No"
      - row "Govt-recognised (MSME · MCA) Yes Sometimes No":
        - cell "Govt-recognised (MSME · MCA)"
        - cell "Yes"
        - cell "Sometimes"
        - cell "No"
      - row "Verifiable performance certificate ACRI 0–100 Participation No":
        - cell "Verifiable performance certificate"
        - cell "ACRI 0–100"
        - cell "Participation"
        - cell "No"
      - row "JD-derived live syllabus Yes No No":
        - cell "JD-derived live syllabus"
        - cell "Yes"
        - cell "No"
        - cell "No"
      - row "Argus-style PV simulation Yes Rare No":
        - cell "Argus-style PV simulation"
        - cell "Yes"
        - cell "Rare"
        - cell "No"
      - row "1:1 counsellor on WhatsApp Yes Bot No":
        - cell "1:1 counsellor on WhatsApp"
        - cell "Yes"
        - cell "Bot"
        - cell "No"
      - row "Break-even inside month one (₹3.2 LPA entry) Yes No No":
        - cell "Break-even inside month one (₹3.2 LPA entry)"
        - cell "Yes"
        - cell "No"
        - cell "No"
      - row "Pay-after-offer for top scorers ACRI ≥ 80 No No":
        - cell "Pay-after-offer for top scorers"
        - cell "ACRI ≥ 80"
        - cell "No"
        - cell "No"
      - row "Mentors who currently work in industry Yes Mixed No":
        - cell "Mentors who currently work in industry"
        - cell "Yes"
        - cell "Mixed"
        - cell "No"
      - row "Live cohort + recorded lifetime access Yes One or other Recorded only":
        - cell "Live cohort + recorded lifetime access"
        - cell "Yes"
        - cell "One or other"
        - cell "Recorded only"
  - link "Take the 3-min ACRI Preview →":
    - /url: /career-engine
  - link "Browse all programmes":
    - /url: /courses
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