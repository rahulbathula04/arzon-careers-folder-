import { test, expect } from "@playwright/test";
import { COUNSELLOR_PHONE, waLink } from "../../src/components/landing/constants";

/**
 * Exactness guard for the hero counsellor WhatsApp link.
 *
 * Locks every contract we never want to silently drift:
 *   - host = wa.me (not api.whatsapp.com, not web.whatsapp.com)
 *   - path = /<E.164 without "+">, exactly "919121283638"
 *   - phone has no "+", no spaces, no leading 0, no dashes
 *   - ?text= decodes to the canonical counsellor message
 *   - anchor opens in a new tab with rel="noopener noreferrer"
 */

const CANONICAL_MESSAGE =
  "Hi Arzon - I'd like to talk to a counsellor about the readiness programme.";
const EXPECTED_HREF = waLink(CANONICAL_MESSAGE);

test.describe("hero WhatsApp payload", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.locator("#hero-heading").waitFor();
  });

  test("constant is plain E.164 without '+' / spaces / leading zero", () => {
    expect(COUNSELLOR_PHONE).toBe("919121283638");
    expect(COUNSELLOR_PHONE).toMatch(/^[1-9]\d{9,14}$/);
  });

  test("anchor href exactly matches waLink(canonical message)", async ({ page }) => {
    const cta = page.getByTestId("hero-secondary-cta");
    await expect(cta).toBeVisible();
    const href = (await cta.getAttribute("href")) ?? "";
    expect(href).toBe(EXPECTED_HREF);

    const url = new URL(href);
    expect(url.protocol).toBe("https:");
    expect(url.host).toBe("wa.me");
    expect(url.pathname).toBe(`/${COUNSELLOR_PHONE}`);
    expect(url.searchParams.get("text")).toBe(CANONICAL_MESSAGE);
  });

  test("anchor opens in a new tab with safe rel and a counsellor aria-label", async ({ page }) => {
    const cta = page.getByTestId("hero-secondary-cta");
    await expect(cta).toHaveAttribute("target", "_blank");
    const rel = (await cta.getAttribute("rel")) ?? "";
    expect(rel.split(/\s+/)).toEqual(expect.arrayContaining(["noopener", "noreferrer"]));
    await expect(cta).toHaveAttribute("aria-label", /counsellor.*WhatsApp/i);
  });

  test("clicking the CTA navigates a popup to the exact wa.me URL", async ({ context, page }) => {
    const cta = page.getByTestId("hero-secondary-cta");
    await cta.scrollIntoViewIfNeeded();
    const [popup] = await Promise.all([context.waitForEvent("page"), cta.click({ modifiers: [] })]);
    // Don't actually load wa.me in CI; it's enough to assert the request URL.
    const target = popup.url();
    expect(target).toBe(EXPECTED_HREF);
    await popup.close();
  });
});
