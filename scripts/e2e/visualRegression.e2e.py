"""
Visual regression check for the enrolment funnel stepper pips and pay-screen CTA chip.

Guards against two classes of past bugs:
  1. Clipping - a pip, label, or CTA chip getting cut off (usually at 384px mobile).
  2. Bleaching - a pip/chip rendering as an invisible white-on-white blob because
     tokens collapsed to `#fff` on `#fff` (mean luminance ≈ 255, stddev ≈ 0).

Run: `python3 -u scripts/e2e/visualRegression.e2e.py`
Screenshots land in scripts/e2e/screenshots/visual/<viewport>/.
"""
import asyncio, sys, time
from pathlib import Path
from statistics import mean, pstdev
from PIL import Image
from playwright.async_api import async_playwright

BASE = "http://localhost:8080"
OUT = Path(__file__).parent / "screenshots" / "visual"
OUT.mkdir(parents=True, exist_ok=True)

VIEWPORTS = [
    ("desktop", 1280, 1800),
    ("mobile",  384, 900),   # narrowest phone class we support
]

# (label, url, extra_setup_fn_name)
ROUTES = [
    ("enrol_index",  "/enrol",                None),
    ("enrol_tier",   "/enrol/career",         None),
    ("pay_pre",      "/enrol/career/pay",     "seed_pay"),
    ("pay_post",     "/enrol/career/pay",     "seed_pay_then_coupon"),
]

PIP_SEL = 'nav[aria-label="Enrolment progress"]'
CTA_SEL = '[data-testid="prereg-cta-button"]'

# ---- image analysis helpers -----------------------------------------------

def analyse(path: Path):
    """Return dict(mean_lum, stddev_lum, w, h) for a screenshot."""
    img = Image.open(path).convert("L")
    px = list(img.getdata())
    return {
        "mean": mean(px),
        "std":  pstdev(px),
        "w":    img.width,
        "h":    img.height,
    }

def assert_visible(name: str, stats: dict, failures: list[str]):
    """A visible element must not be washed out."""
    if stats["mean"] > 250 and stats["std"] < 3:
        failures.append(
            f"{name}: BLEACHED (mean={stats['mean']:.1f}, std={stats['std']:.1f}) - "
            f"element is effectively invisible on background."
        )
    if stats["w"] < 4 or stats["h"] < 4:
        failures.append(f"{name}: DEGENERATE size {stats['w']}x{stats['h']}")

# ---- flow helpers ---------------------------------------------------------

async def seed_pay(page):
    """Fill enrol form so we land on /pay."""
    await page.goto(f"{BASE}/enrol/career", wait_until="networkidle")
    await page.fill("#name", "Visual Test")
    await page.fill("#phone", "9000000002")
    await page.fill("#email", f"visual+{int(time.time()*1000)}@arzontest.dev")
    await page.locator("button[type=submit]").first.click()
    for _ in range(40):
        if "/pay" in page.url: break
        await page.wait_for_timeout(500)
    assert "/pay" in page.url, f"never reached /pay (at {page.url})"
    await page.get_by_text("Split-pay option").wait_for(timeout=15000)

async def seed_pay_then_coupon(page):
    await seed_pay(page)
    await page.get_by_role("button", name="I already have a code").click()
    await page.get_by_placeholder("ENTER COUNSELLOR CODE").fill("ARZONPRIME60")
    await page.get_by_role("button", name="Apply", exact=True).click()
    await page.get_by_text("Offer expires in").wait_for(timeout=15000)

SETUPS = {"seed_pay": seed_pay, "seed_pay_then_coupon": seed_pay_then_coupon}

# ---- per-viewport run -----------------------------------------------------

async def run_viewport(browser, vp_name: str, w: int, h: int) -> list[str]:
    ctx = await browser.new_context(viewport={"width": w, "height": h}, device_scale_factor=1)
    page = await ctx.new_page()
    dst = OUT / vp_name
    dst.mkdir(exist_ok=True)
    failures: list[str] = []

    for label, url, setup in ROUTES:
        try:
            if setup:
                await SETUPS[setup](page)
            else:
                await page.goto(f"{BASE}{url}", wait_until="networkidle")

            # ---- stepper pip strip -----------------------------------------
            pip_nav = page.locator(PIP_SEL).first
            await pip_nav.wait_for(state="visible", timeout=10000)
            box = await pip_nav.bounding_box()
            if not box:
                failures.append(f"[{vp_name}/{label}] stepper: no bounding box")
                continue

            # Clipping check: stepper right edge must sit inside the viewport.
            right = box["x"] + box["width"]
            if right > w + 0.5:
                failures.append(
                    f"[{vp_name}/{label}] stepper CLIPPED horizontally: "
                    f"right={right:.1f} > viewport={w}"
                )
            if box["x"] < -0.5:
                failures.append(
                    f"[{vp_name}/{label}] stepper CLIPPED left: x={box['x']:.1f}"
                )

            # Per-pip visibility - each of the 5 circles must render with
            # non-zero size and not be white-on-white.
            # Only the circular pip - sibling `span[aria-hidden]` connectors
            # are `h-px` lines that fail the "visible & non-degenerate" contract
            # by design.
            pips = pip_nav.locator('ol > li > span.rounded-full')
            count = await pips.count()
            if count < 5:
                failures.append(f"[{vp_name}/{label}] stepper: expected ≥5 pips, got {count}")
            for i in range(min(count, 5)):
                pip = pips.nth(i)
                pip_path = dst / f"{label}_pip_{i}.png"
                try:
                    await pip.screenshot(path=str(pip_path))
                except Exception as e:
                    failures.append(f"[{vp_name}/{label}] pip {i} screenshot failed: {e}")
                    continue
                assert_visible(f"[{vp_name}/{label}] pip {i}", analyse(pip_path), failures)

            strip_path = dst / f"{label}_stepper.png"
            await pip_nav.screenshot(path=str(strip_path))

            # ---- CTA chip (pay screens only) --------------------------------
            if label.startswith("pay"):
                cta = page.locator(CTA_SEL).first
                await cta.wait_for(state="visible", timeout=10000)
                cbox = await cta.bounding_box()
                if cbox:
                    cright = cbox["x"] + cbox["width"]
                    if cright > w + 0.5:
                        failures.append(
                            f"[{vp_name}/{label}] CTA CLIPPED horizontally: "
                            f"right={cright:.1f} > viewport={w}"
                        )
                cta_path = dst / f"{label}_cta.png"
                await cta.screenshot(path=str(cta_path))
                assert_visible(f"[{vp_name}/{label}] cta", analyse(cta_path), failures)

            # full-page reference (for eyeball diffing against prior runs)
            await page.screenshot(path=str(dst / f"{label}_full.png"))

        except Exception as e:
            failures.append(f"[{vp_name}/{label}] threw {type(e).__name__}: {e}")

    await ctx.close()
    return failures

# ---- entry ----------------------------------------------------------------

async def main():
    all_failures: list[str] = []
    async with async_playwright() as pw:
        browser = await pw.chromium.launch(headless=True)
        for vp_name, w, h in VIEWPORTS:
            print(f"→ viewport {vp_name} ({w}x{h})")
            fails = await run_viewport(browser, vp_name, w, h)
            for f in fails: print("  ✗", f)
            if not fails: print("  ✓ all checks passed")
            all_failures.extend(fails)
        await browser.close()

    print("\n" + "="*60)
    if all_failures:
        print(f"FAIL - {len(all_failures)} visual regression(s):")
        for f in all_failures: print("  •", f)
        sys.exit(1)
    print("PASS - no clipping, no bleaching across all viewports/routes.")

if __name__ == "__main__":
    asyncio.run(main())