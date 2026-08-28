# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: public-routes-smoke.spec.ts >> public routes smoke - mobile (iPhone 12) >> GET /legal/privacy renders, no console errors, nav visible
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
  - article:
    - link "Back to home":
      - /url: /
    - heading "Privacy notice" [level=1]
    - paragraph: "Last updated: April 2026"
    - heading "What we collect" [level=2]
    - list:
      - listitem: Application info you submit (name, email, phone, city, year, background, goal).
      - listitem: Programme + cohort selection.
      - listitem: Learning progress (lessons completed, bookmarks, notes, stored locally on your device).
      - listitem: Standard server logs (IP, user-agent, timestamps) for security.
    - heading "How we use it" [level=2]
    - paragraph: To process your application, run your cohort, support you during the programme, and issue your certificate.
    - paragraph: Aggregated statistics may be published (e.g. "23 of 28 placed") but never with personal identifiers.
    - heading "What we never do" [level=2]
    - list:
      - listitem: Sell your data to third parties.
      - listitem: Share your contact info with anyone outside the Arzon team without consent.
      - listitem: Send marketing SMS without explicit opt-in.
    - heading "Your rights" [level=2]
    - paragraph:
      - text: You can request a copy or deletion of your data at any time by emailing
      - link "privacy@arzonglobal.com":
        - /url: mailto:privacy@arzonglobal.com
      - text: . We respond within 7 working days.
    - heading "Cookies & local storage" [level=2]
    - paragraph: We use localStorage to remember your application progress and learning state on this device. We do not use third-party tracking cookies for advertising.
    - heading "Contact" [level=2]
    - paragraph:
      - text: "Privacy questions:"
      - link "privacy@arzonglobal.com":
        - /url: mailto:privacy@arzonglobal.com
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