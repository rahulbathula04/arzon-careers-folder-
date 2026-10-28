import { chromium } from "@playwright/test";

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  // Prevent background lead magnet modal from interfering with CTA clicks
  await page.addInitScript(() => {
    sessionStorage.setItem("arzon_lead_magnet_session_done", "true");
  });

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err));

  console.log("1. Navigating to http://127.0.0.1:3006/...");
  await page.goto("http://127.0.0.1:3006/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2000); // Allow hydration to complete

  console.log("2. Checking Header CTA...");
  const headerBtn = page.locator("header").getByRole("button", { name: "Talk to a counsellor" });
  await headerBtn.waitFor({ state: "visible", timeout: 5000 });
  console.log("   ✓ Header CTA present:", await headerBtn.innerText());

  console.log("3. Checking Hero CTAs...");
  const heroPrimary = page.locator('[data-testid="primary-counsellor-cta"]');
  await heroPrimary.waitFor({ state: "visible", timeout: 5000 });
  console.log("   ✓ Hero Primary CTA present:", await heroPrimary.innerText());

  const heroSecondary = page.locator('[data-testid="secondary-assessment-cta"]');
  await heroSecondary.waitFor({ state: "visible", timeout: 5000 });
  console.log("   ✓ Hero Secondary CTA present:", await heroSecondary.innerText());
  const heroSecondaryHref = await heroSecondary.getAttribute("href");
  console.log("   ✓ Hero Secondary links to:", heroSecondaryHref);
  if (!heroSecondaryHref?.includes("/career-assessment")) {
    throw new Error(`Expected secondary CTA to link to /career-assessment, got ${heroSecondaryHref}`);
  }

  console.log("4. Clicking Hero Primary 'Talk to a counsellor'...");
  await heroPrimary.click();
  const modal = page.locator('[data-testid="counsellor-lead-modal"]');
  await modal.waitFor({ state: "visible", timeout: 5000 });
  console.log("   ✓ CounsellorLeadModal rendered successfully");

  // Fill form
  await modal.locator('input[placeholder*="Rahul Bathula"]').fill("Dr. Rahul Playwright");
  await modal.locator('input[placeholder*="91212"]').fill("9876543210");
  await modal.locator('select').first().selectOption({ index: 1 });
  
  await page.screenshot({ path: "C:/Users/Rahul/.gemini/antigravity/brain/69928177-6d69-45be-8efb-16f8f16ea5fe/counsellor-modal-filled.png" });
  console.log("   ✓ Captured filled modal screenshot");

  const submitBtn = modal.locator('button[type="submit"]');
  await submitBtn.click();

  const successHeader = modal.getByText("Your Career Counsellor is Ready!");
  await successHeader.waitFor({ state: "visible", timeout: 8000 });
  console.log("   ✓ Form submitted successfully! Success screen displayed.");

  await page.screenshot({ path: "C:/Users/Rahul/.gemini/antigravity/brain/69928177-6d69-45be-8efb-16f8f16ea5fe/counsellor-modal-success.png" });

  // Close modal
  await modal.getByRole("button", { name: "Close", exact: true }).click();
  await modal.waitFor({ state: "hidden", timeout: 3000 });
  console.log("   ✓ Modal closed");

  console.log("5. Checking Priority Tracks card CTA...");
  const trackCardBtn = page.locator('#career-paths').getByRole("button", { name: "Talk to counsellor" }).first();
  await trackCardBtn.scrollIntoViewIfNeeded();
  await trackCardBtn.waitFor({ state: "visible" });
  await trackCardBtn.click();
  await modal.waitFor({ state: "visible" });
  console.log("   ✓ Priority track card 'Talk to counsellor' triggers modal!");
  await modal.getByRole("button", { name: "Close modal" }).click();
  await modal.waitFor({ state: "hidden" });

  console.log("6. Testing Mobile Viewport (375x812)...");
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("http://127.0.0.1:3006/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2000);

  // If lead magnet popup is open, close it
  const leadMagnetClose = page.locator('button[aria-label="Close guide banner"]');
  if (await leadMagnetClose.isVisible().catch(() => false)) {
    await leadMagnetClose.click();
    await page.waitForTimeout(500);
  }

  const menuBtn = page.getByRole("button", { name: "Open navigation menu" });
  await menuBtn.click({ force: true });

  const mobileDrawerBtn = page.locator(".arzon-site-mobile").getByRole("button", { name: "Talk to a counsellor" });
  await mobileDrawerBtn.waitFor({ state: "visible" });
  console.log("   ✓ Mobile menu has 'Talk to a counsellor'");
  await mobileDrawerBtn.click();
  await modal.waitFor({ state: "visible" });
  await page.screenshot({ path: "C:/Users/Rahul/.gemini/antigravity/brain/69928177-6d69-45be-8efb-16f8f16ea5fe/counsellor-modal-mobile.png" });
  console.log("   ✓ Mobile modal opened and verified!");
  await modal.getByRole("button", { name: "Close modal" }).click();
  await modal.waitFor({ state: "hidden" });

  console.log("7. Testing /courses catalog page...");
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("http://127.0.0.1:3006/courses", { waitUntil: "networkidle" });
  await page.waitForTimeout(4000); // Extra wait for courses hydration

  if (await leadMagnetClose.isVisible().catch(() => false)) {
    await leadMagnetClose.click();
    await page.waitForTimeout(500);
  }

  // Try data-testid first, fall back to data-track selector
  const courseCardLocator = page.locator('[data-testid="course-card"]').first();
  await courseCardLocator.waitFor({ state: "visible", timeout: 15000 });
  console.log("   ✓ Course cards rendered in DOM");

  const catalogCardBtn = courseCardLocator.getByRole("button", { name: /Talk to counsellor/i });
  await catalogCardBtn.scrollIntoViewIfNeeded();
  await catalogCardBtn.waitFor({ state: "visible", timeout: 10000 });
  await catalogCardBtn.click();
  await modal.waitFor({ state: "visible" });
  await page.screenshot({ path: "C:/Users/Rahul/.gemini/antigravity/brain/69928177-6d69-45be-8efb-16f8f16ea5fe/course-card-counsellor-modal.png" });
  console.log("   ✓ Course catalog card 'Talk to counsellor' works flawlessly!");

  await browser.close();
  console.log("\nALL VERIFICATION CHECKS PASSED!");
}

run().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
