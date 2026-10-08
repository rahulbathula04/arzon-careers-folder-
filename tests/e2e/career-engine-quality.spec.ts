import { expect, test } from "@playwright/test";

test.describe("Career Engine production quality", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("first question renders readable answer choices and advances", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => consoleErrors.push(error.message));

    await page.goto("/career-engine/", { waitUntil: "domcontentloaded" });
    await page.evaluate(() => {
      sessionStorage.setItem(
        "ce_profile",
        JSON.stringify({
          name: "QA Bot",
          phone: "9999999999",
          email: "qa@arzon.test",
          whatsappOptin: false,
        }),
      );
    });

    await page.goto("/career-engine/test", { waitUntil: "networkidle" });
    await expect(page.getByText(/Question 1 of/i)).toBeVisible();

    const options = page.locator("button.arzon-assessment-option");
    await expect(options).toHaveCount(4);

    for (let i = 0; i < await options.count(); i += 1) {
      const option = options.nth(i);
      await expect(option).toBeVisible();
      await expect(option).toHaveText(/.+/);

      const audit = await option.evaluate((element) => {
        const label = element.querySelector("span:last-child");
        const style = getComputedStyle(label ?? element);
        const background = getComputedStyle(element).backgroundColor;
        const rect = element.getBoundingClientRect();
        return {
          color: style.color,
          background,
          width: rect.width,
          height: rect.height,
          text: (label?.textContent ?? element.textContent ?? "").trim(),
        };
      });

      expect(audit.text.length).toBeGreaterThan(0);
      expect(audit.width).toBeGreaterThanOrEqual(300);
      expect(audit.height).toBeGreaterThanOrEqual(52);
      expect(audit.color).not.toBe("rgb(255, 255, 255)");
      expect(audit.background).not.toBe("rgb(255, 255, 255)");
    }

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    expect(consoleErrors).toEqual([]);

    await options.first().click();
    await expect(page.getByText(/Question 2 of/i)).toBeVisible();
  });
});
