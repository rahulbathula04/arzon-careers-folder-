import { test, expect } from "@playwright/test";

const ROUTE = "/enrol?programme=regulatory-affairs&source=course-final";

test.describe("Enrol programme selection visual contract", () => {
  for (const viewport of [
    { name: "mobile", width: 390, height: 844 },
    { name: "desktop", width: 1440, height: 900 },
  ]) {
    test(`renders readable programme content and canonical branding on ${viewport.name}`, async ({
      page,
    }) => {
      const consoleErrors: string[] = [];
      const pageErrors: string[] = [];

      page.on("console", (message) => {
        if (message.type() === "error") consoleErrors.push(message.text());
      });
      page.on("pageerror", (error) => pageErrors.push(error.message));

      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });
      await page.goto(ROUTE, { waitUntil: "networkidle" });

      await expect(page.getByRole("heading", { name: /choose the programme/i })).toBeVisible();
      await expect(page.getByText("Self-Paced Career Track")).toBeVisible();
      await expect(page.getByText("Recruiter Track")).toBeVisible();
      await expect(page.getByText("Elite One-on-One")).toBeVisible();

      const trackCards = page.locator("article");
      await expect(trackCards).toHaveCount(3);

      for (const card of await trackCards.all()) {
        const heading = card.locator("h3").first();
        const description = card.locator("p").first();
        await expect(heading).toBeVisible();
        await expect(description).toBeVisible();

        for (const element of [heading, description]) {
          const styles = await element.evaluate((node) => {
            const computed = getComputedStyle(node);
            const rect = node.getBoundingClientRect();
            return {
              color: computed.color,
              fill: computed.webkitTextFillColor,
              rect: { width: rect.width, height: rect.height },
            };
          });

          expect(styles.rect.width).toBeGreaterThan(0);
          expect(styles.rect.height).toBeGreaterThan(0);
          expect(styles.color).not.toBe("rgb(255, 255, 255)");
          expect(styles.fill).not.toBe("rgb(255, 255, 255)");
        }
      }

      const canonicalLogo = page.locator('img[alt="Arzon Global"]').first();
      await expect(canonicalLogo).toBeVisible();
      await expect(canonicalLogo).toHaveAttribute(
        "src",
        /arzon-global-lockup-light\.svg|arzon-global-lockup\.svg/,
      );

      await expect(page.locator('img[src*="arzon-logo.jpg"], img[src*="arzon-logo.webp"]')).toHaveCount(0);

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      );
      expect(overflow).toBe(false);

      expect(consoleErrors).toEqual([]);
      expect(pageErrors).toEqual([]);
    });
  }
});
