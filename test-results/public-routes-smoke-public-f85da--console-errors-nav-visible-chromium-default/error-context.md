# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: public-routes-smoke.spec.ts >> public routes smoke - mobile (iPhone 12) >> GET /verify renders, no console errors, nav visible
- Location: tests\e2e\public-routes-smoke.spec.ts:86:5

# Error details

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
  - paragraph: Public Verifier Portal
  - heading "Verify an Arzon Credential or Partner Contract." [level=1]
  - paragraph: Every Arzon Global certificate and recruitment partner contract carries a unique ID. Paste the ID here to confirm authentic registration, issue date, and signatory details.
  - textbox "e.g. AG-VC-2026-10231X or ENT2026-GLOBAL-VMO026"
  - button "Verify Credential"
  - link "See our public proof":
    - /url: /proof
  - link "Earn one, start your application":
    - /url: /apply
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
- link "Chat with an Arzon counsellor on WhatsApp":
  - /url: https://wa.me/919121283638?text=Hi%20Arzon%2C%20I%20have%20a%20quick%20question%20before%20applying.
  - text: WhatsApp counsellor
```