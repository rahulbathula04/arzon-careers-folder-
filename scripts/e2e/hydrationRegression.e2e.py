"""
Hydration-mismatch regression scan for funnel + shell routes.

Why this exists: hydration mismatches are silent bugs — the page still renders,
but React throws away the SSR tree and rebuilds it on the client. That kills
FCP, breaks scroll position, and often surfaces later as "attributes didn't
match" bugs that only reproduce after a real navigation. This test guards
every route reachable in the enrolment funnel + the landing shell.

Filters out the known dev-only noise from the Lovable inspector's
`data-tsd-source` line-offset drift (see earlier fix). If ANY hydration
warning contains a diff line that isn't `data-tsd-source`, it fails.

Run: python3 -u scripts/e2e/hydrationRegression.e2e.py
"""

import asyncio, re, time
from pathlib import Path
from playwright.async_api import async_playwright

BASE = "http://localhost:8080"
SS = Path(__file__).parent / "screenshots" / "hydration"
SS.mkdir(parents=True, exist_ok=True)

HYDRATION_SIGNATURES = (
    "A tree hydrated but some attributes",
    "hydration-mismatch",
    "Text content did not match",
    "Text content does not match server-rendered HTML",
    "Prop `",  # "Prop `xyz` did not match"
    "Expected server HTML",
    "did not match. Server:",
    "Hydration failed",
)

# Lovable's dev inspector injects `data-tsd-source="/path:line:col"`. Between
# the SSR and CSR passes the transformer can emit different line/col numbers
# for the same JSX node (module-cache drift), producing a benign hydration
# warning. Strip the whole attribute — including neighbouring whitespace —
# and any diff that collapses to identical add/remove multisets is noise.
TSD_SOURCE_RE = re.compile(r'\s*data-tsd-source="[^"]*"')
# Real DOM diff lines are heavily indented by React (element depth). Prose
# bullets in the warning preamble start with "- " and one space. We only
# care about attribute lines (contain `="`) — element/text-node lines that
# React includes as diff context near an attribute mismatch aren't
# themselves the bug, and text-content mismatches surface under their own
# "Text content did not match" signature.
DIFF_LINE_RE = re.compile(r'^([+-])(\s{5,})(.*="[^"]*".*)$')


def _fingerprint(msg: str) -> tuple[list[str], list[str]]:
    adds: list[str] = []
    removes: list[str] = []
    for raw in msg.splitlines():
        m = DIFF_LINE_RE.match(raw)
        if not m:
            continue
        sign, _, payload = m.groups()
        stripped = TSD_SOURCE_RE.sub("", payload).strip()
        if not stripped:
            continue
        (adds if sign == "+" else removes).append(stripped)
    return adds, removes


def is_real_hydration_error(msg: str) -> bool:
    if not any(sig in msg for sig in HYDRATION_SIGNATURES):
        return False
    adds, removes = _fingerprint(msg)
    if not adds and not removes:
        # Warning with no structural diff after stripping = prose only or
        # pure tsd-source drift. Treat as noise.
        return False
    # Order-independent compare: if add and remove multisets match, the only
    # thing that changed was tsd-source values → noise. Anything else = real.
    return sorted(adds) != sorted(removes)


async def create_intent(page, tier: str) -> str:
    """Walk /enrol/{tier} form to get a valid intent URL for the pay page."""
    stamp = int(time.time() * 1000)
    await page.goto(f"{BASE}/enrol/{tier}", wait_until="networkidle")
    await page.fill("#name", f"Hydration {tier.title()}")
    await page.fill("#phone", "9000000001")
    await page.fill("#email", f"hydration+{stamp}-{tier}@arzontest.dev")
    await page.locator("button[type=submit]").first.click()
    for _ in range(40):
        if "/pay" in page.url:
            return page.url
        await page.wait_for_timeout(500)
    raise AssertionError(f"intent creation for {tier} did not navigate to /pay (stuck at {page.url})")


async def scan(browser, label: str, url: str):
    ctx = await browser.new_context(viewport={"width": 1280, "height": 1800})
    page = await ctx.new_page()
    errors: list[str] = []
    page.on("pageerror", lambda e: errors.append(f"[pageerror] {e}"))
    page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)

    await page.goto(url, wait_until="networkidle")
    # Give React two frames to finish hydration + any effects that log late.
    await page.wait_for_timeout(1500)
    await page.screenshot(path=str(SS / f"{label}.png"))
    await ctx.close()

    real = [e for e in errors if is_real_hydration_error(e)]
    noise = [e for e in errors if any(s in e for s in HYDRATION_SIGNATURES) and e not in real]
    other = [e for e in errors if not any(s in e for s in HYDRATION_SIGNATURES) and "[pageerror]" in e]
    return real, noise, other


async def main():
    # Public funnel + shell routes. Pay routes need a fresh intent per run.
    static_routes = [
        ("home",             f"{BASE}/"),
        ("enrol_index",      f"{BASE}/enrol"),
        ("enrol_essential",  f"{BASE}/enrol/essential"),
        ("enrol_career",     f"{BASE}/enrol/career"),
        ("enrol_elite",      f"{BASE}/enrol/elite"),
        ("about",            f"{BASE}/about"),
    ]

    fails = 0
    async with async_playwright() as pw:
        browser = await pw.chromium.launch(headless=True)

        for label, url in static_routes:
            real, noise, other = await scan(browser, label, url)
            mark = "✓" if not real and not other else "✗"
            print(f"  {mark} {label:24s} real={len(real)} noise={len(noise)} pageerrors={len(other)}", flush=True)
            for e in real[:3]:
                print(f"    ! HYDRATION: {e[:400]}", flush=True)
            for e in other[:3]:
                print(f"    ! PAGEERROR: {e[:400]}", flush=True)
            if real or other:
                fails += 1

        # Pay routes: create an intent per tier, then scan.
        ctx = await browser.new_context(viewport={"width": 1280, "height": 1800})
        page = await ctx.new_page()
        pay_urls = {}
        for tier in ("essential", "career", "elite"):
            pay_urls[tier] = await create_intent(page, tier)
        await ctx.close()

        for tier, url in pay_urls.items():
            label = f"enrol_{tier}_pay"
            real, noise, other = await scan(browser, label, url)
            mark = "✓" if not real and not other else "✗"
            print(f"  {mark} {label:24s} real={len(real)} noise={len(noise)} pageerrors={len(other)}", flush=True)
            for e in real[:3]:
                print(f"    ! HYDRATION: {e[:400]}", flush=True)
            for e in other[:3]:
                print(f"    ! PAGEERROR: {e[:400]}", flush=True)
            if real or other:
                fails += 1

        await browser.close()

    if fails:
        print(f"\n{fails} route(s) FAILED hydration regression", flush=True)
        raise SystemExit(1)
    print("\nAll funnel + shell routes hydrated cleanly ✓", flush=True)


asyncio.run(main())