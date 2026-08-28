# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: public-routes-smoke.spec.ts >> public routes smoke - mobile (iPhone 12) >> GET /contact renders, no console errors, nav visible
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
  - paragraph: Contact
  - heading "Talk to a real counsellor." [level=1]
  - paragraph: Pick the channel that's easiest for you. WhatsApp is fastest. Our team replies within an hour during 10 AM–8 PM IST.
  - link "Fastest WhatsApp +91 91212 83638 · usually replies in 5 min":
    - /url: https://wa.me/919121283638?text=Hi%20Arzon.%20I'd%20like%20to%20know%20more%20about%20your%20programmes.
    - text: Fastest
    - paragraph: WhatsApp
    - paragraph: +91 91212 83638 · usually replies in 5 min
  - link "Email info@arzonglobal.com · reply within 1 working day":
    - /url: mailto:info@arzonglobal.com
    - paragraph: Email
    - paragraph: info@arzonglobal.com · reply within 1 working day
  - link "Call +91 91212 83638 · 10 AM – 8 PM IST · Mon–Sat":
    - /url: tel:+919121283638
    - paragraph: Call
    - paragraph: +91 91212 83638 · 10 AM – 8 PM IST · Mon–Sat
  - paragraph: Visit
  - paragraph: Arzon Global Pvt Ltd 1st floor, S Chandra Reddy Towers, 100 Feet Rd, Ayyappa Society, VIP Hills, Jaihind Enclave, Madhapur, Hyderabad, Telangana 500081, India
  - link "Get directions →":
    - /url: https://www.google.com/maps/search/?api=1&query=Arzon%20Global%2C%201st%20floor%2C%20S%20Chandra%20Reddy%20Towers%2C%20100%20Feet%20Rd%2C%20Ayyappa%20Society%2C%20VIP%20Hills%2C%20Jaihind%20Enclave%2C%20Madhapur%2C%20Hyderabad%2C%20Telangana%20500081
  - paragraph: Or send us a callback request
  - paragraph: One real counsellor (not a bot) will message you back within an hour. Your details are never sold or shared.
  - text: Your name So we know who to greet.
  - textbox "Your name So we know who to greet.":
    - /placeholder: e.g. Priya R.
  - text: WhatsApp number We only use this to text you a callback time.
  - textbox "WhatsApp number We only use this to text you a callback time.":
    - /placeholder: +91 98xxx xxxxx
  - text: Which programme are you exploring? Helps us route you to the right counsellor.
  - combobox "Which programme are you exploring? Helps us route you to the right counsellor.":
    - option "Not sure yet - help me decide" [selected]
    - option "Pharmacovigilance"
    - option "Medical Coding"
    - option "Clinical Research"
    - option "SAS Clinical"
  - text: How can we help? Optional - a sentence about your background helps a lot.
  - textbox "How can we help? Optional - a sentence about your background helps a lot.":
    - /placeholder: e.g. I'm a final-year B.Pharm student exploring PV…
  - button "Send & open WhatsApp"
  - paragraph: By submitting you agree to be contacted by an Arzon counsellor. No spam, ever.
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