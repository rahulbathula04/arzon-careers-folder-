# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: public-routes-smoke.spec.ts >> public routes smoke - mobile (iPhone 12) >> GET /waitlist renders, no console errors, nav visible
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
- link "Back to home":
  - /url: /
- text: Cohort locked
- heading "The 30 July 2026 cohort is full." [level=1]:
  - text: The
  - emphasis: 30 July 2026
  - text: cohort is full.
- paragraph: We cap every batch at 60 seats so mentors stay reachable. The next batch opens shortly - message us on WhatsApp and we'll hold a seat for you first.
- text: Original start 30 July 2026 Capacity 60 seats · Full
- link "Message on WhatsApp":
  - /url: https://wa.me/919121283638?text=Hi%20Arzon%2C%20the%2030%20July%202026%20cohort%20is%20locked.%20Please%20add%20me%20to%20the%20waitlist%20for%20the%20next%20batch.
- link "Browse other programmes":
  - /url: /courses
- paragraph: We reply within a few hours on weekdays. No spam, no auto-DMs.
```