import asyncio, time
from pathlib import Path
from playwright.async_api import async_playwright

SS = Path(__file__).parent / "screenshots"
SS.mkdir(exist_ok=True)

TIERS = [("essential", 5000), ("career", 7000), ("elite", 9000)]
COUPON = "ARZONPRIME60"
BASE = "http://localhost:8080"

def rupee(n: int) -> str:
    return "₹" + f"{n:,}"

async def enrol_and_apply(browser, tier: str, expected_balance: int):
    stamp = f"{int(time.time()*1000)}-{tier}"
    ctx = await browser.new_context(viewport={"width": 1280, "height": 1800})
    page = await ctx.new_page()
    errors = []
    page.on("pageerror", lambda e: errors.append(f"pageerror: {e}"))
    page.on("console", lambda m: errors.append(f"console.error: {m.text[:200]}") if m.type == "error" else None)

    await page.goto(f"{BASE}/enrol/{tier}", wait_until="networkidle")
    await page.fill("#name", f"E2E {tier.title()}")
    await page.fill("#phone", "9000000001")
    await page.fill("#email", f"e2e+{stamp}@arzontest.dev")
    await page.locator("button[type=submit]").first.click()

    for _ in range(40):
        if "/pay" in page.url: break
        await page.wait_for_timeout(500)
    assert "/pay" in page.url, f"still at {page.url}"
    await page.get_by_text("Split-pay option").wait_for(timeout=15000)
    await page.screenshot(path=str(SS / f"{tier}_1_pre_coupon.png"))

    await page.get_by_role("button", name="I already have a code").click()
    await page.get_by_placeholder("ENTER COUNSELLOR CODE").fill(COUPON)
    await page.get_by_role("button", name="Apply", exact=True).click()
    await page.get_by_text("Offer expires in").wait_for(timeout=15000)
    await page.screenshot(path=str(SS / f"{tier}_2_post_coupon.png"))

    body = (await page.locator("body").inner_text()).replace("\u00a0", " ")
    total_expected = 1065 + expected_balance
    checks = {
        "₹1,065 pre-register visible":            "₹1,065" in body,
        f"balance {rupee(expected_balance)} visible": rupee(expected_balance) in body,
        f"total payable {rupee(total_expected)} visible": rupee(total_expected) in body,
        "coupon countdown active":                "Offer expires in" in body,
        "Lock-seat CTA still rendered":           await page.get_by_test_id("prereg-cta-button").is_visible(),
        "Pre-register label":                     "Pre-register now" in body,
        "Balance due-in-7-days label":            "Balance (due in 7 days)" in body,
    }
    # Non-hydration console errors only (hydration warnings are noisy but harmless here).
    real_errors = [e for e in errors if "hydrated" not in e and "hydration" not in e.lower()]
    checks["no runtime console errors"] = len(real_errors) == 0

    await ctx.close()
    return checks, real_errors

async def main():
    fails = 0
    async with async_playwright() as pw:
        browser = await pw.chromium.launch(headless=True)
        for tier, bal in TIERS:
            print(f"\n=== {tier} (expected balance ₹{bal:,}) ===", flush=True)
            checks, errs = await enrol_and_apply(browser, tier, bal)
            for k, v in checks.items():
                mark = "✓" if v else "✗"
                print(f"  {mark} {k}", flush=True)
                if not v: fails += 1
            for e in errs[:5]:
                print(f"    ! {e}", flush=True)
        await browser.close()
    if fails:
        print(f"\n{fails} assertion(s) FAILED", flush=True)
        raise SystemExit(1)
    print("\nALL 3 TIERS PASSED ✓", flush=True)

asyncio.run(main())
