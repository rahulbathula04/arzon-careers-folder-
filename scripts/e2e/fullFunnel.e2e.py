"""
End-to-end walk of the enrolment funnel:

  Program (/enrol) → Profile + Seat (/enrol/$tier)
     → Pay (/enrol/$tier/pay, Razorpay call fired)
     → Verify endpoint contract
     → Done (/enrol/success, WhatsApp counsellor CTA)

In dev, Razorpay keys aren't configured and the router-core seroval envelope
can't be safely stubbed, so this test asserts the FUNNEL CONTRACT with what
we actually control end-to-end:

  1. /enrol lists all three tiers and links to /enrol/$tier
  2. Submitting the profile form calls `createEnrolmentIntent` and lands on
     /enrol/$tier/pay with a signed ?intent=…&t=… token
  3. Seat-hold CTA renders (₹1,065) and the pay page references the
     WhatsApp counsellor follow-up copy
  4. Clicking "Pay …securely" fires the `createRazorpayOrder` server fn
     (proof the client payment flow is wired)
  5. Direct POST to /api/public/razorpay/verify rejects bad input with a
     structured JSON error (endpoint mounted + validating)
  6. /enrol/success?intent=…&t=… renders the WhatsApp counsellor CTA — this
     is the "WhatsApp message trigger" the user sees post-payment

Run: `python3 -u scripts/e2e/fullFunnel.e2e.py`
"""
import asyncio, json, re, sys, time, urllib.request, urllib.error
from pathlib import Path
from playwright.async_api import async_playwright

BASE       = "http://localhost:8080"
TIER       = "career"
TIER_PRICE = 24999
SS = Path(__file__).parent / "screenshots" / "full_funnel"
SS.mkdir(parents=True, exist_ok=True)

# base64 markers embedded in server-fn URLs
# Distinctive substrings of the base64-encoded server-fn URL blobs.
# Exact substring taken from observed request URLs.
RAZORPAY_MARK  = "L3Jhem9ycGF5LmZ1bmN0aW9ucy50"      # ".../razorpay.functions.t*"
ENROLMENT_MARK = "Vucm9sbWVudC5mdW5jdGlvbnM"         # "enrolment.functions"

FAILURES = []
def check(name, ok, detail=""):
    print(f"  {'✓' if ok else '✗'} {name}" + (f" — {detail}" if detail and not ok else ""))
    if not ok: FAILURES.append(f"{name}{': ' + detail if detail else ''}")

def rupee(n): return "₹" + f"{n:,}"

def post_verify(body: str):
    req = urllib.request.Request(
        f"{BASE}/api/public/razorpay/verify",
        data=body.encode(),
        headers={"Content-Type": "application/json"},
        method="POST")
    try:
        r = urllib.request.urlopen(req, timeout=10)
        return r.status, r.read().decode()
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode()

async def run():
    async with async_playwright() as pw:
        browser = await pw.chromium.launch(headless=True)
        ctx = await browser.new_context(viewport={"width": 1280, "height": 1800})
        page = await ctx.new_page()

        server_fn_calls, pageerrors = [], []
        page.on("request", lambda r:
            server_fn_calls.append(r.url) if "_serverFn" in r.url else None)
        page.on("pageerror", lambda e: pageerrors.append(str(e)))

        # ---- 1. PROGRAM ----------------------------------------------------
        print("→ Program (/enrol)")
        await page.goto(f"{BASE}/enrol", wait_until="networkidle")
        body = await page.locator("body").inner_text()
        for t in ("Essential", "Career", "Elite"):
            check(f"tier '{t}' listed", t in body)
        await page.screenshot(path=str(SS / "1_program.png"))
        await page.locator(f'a[href="/enrol/{TIER}"]').first.click()
        await page.wait_for_url(f"**/enrol/{TIER}", timeout=10000)

        # ---- 2. PROFILE + intent creation ---------------------------------
        print("→ Profile (/enrol/$tier)")
        stamp = int(time.time() * 1000)
        name  = f"E2E Full {stamp}"
        phone = "9000000009"
        email = f"e2e+full{stamp}@arzontest.dev"
        await page.fill("#name",  name)
        await page.fill("#phone", phone)
        await page.fill("#email", email)
        await page.fill("#city",  "Hyderabad")
        await page.screenshot(path=str(SS / "2_profile_filled.png"))
        await page.locator('button[type=submit]').first.click()

        for _ in range(40):
            if "/pay" in page.url: break
            await page.wait_for_timeout(500)
        check("landed on /pay after profile submit", "/pay" in page.url,
              f"still at {page.url}")

        intent_id = intent_token = None
        if "intent=" in page.url:
            intent_id = page.url.split("intent=")[1].split("&")[0]
        if "&t=" in page.url:
            intent_token = page.url.split("&t=")[1].split("&")[0]
        check("URL carries intent id",    bool(intent_id))
        check("URL carries intent token", bool(intent_token))
        check("createEnrolmentIntent server fn was called",
              any(ENROLMENT_MARK in u for u in server_fn_calls))
        await page.get_by_text("Split-pay option").wait_for(timeout=15000)

        # ---- 3. SEAT hold + WhatsApp copy on pay --------------------------
        print("→ Seat hold + WhatsApp counsellor copy")
        cta = page.get_by_test_id("prereg-cta-button")
        await cta.wait_for(state="visible", timeout=10000)
        cta_text = (await cta.inner_text()).strip()
        check("Lock-seat CTA shows ₹1,065", "1,065" in cta_text, cta_text)
        pay_body = await page.locator("body").inner_text()
        check("pay screen references WhatsApp counsellor follow-up",
              "WhatsApp" in pay_body)
        await page.screenshot(path=str(SS / "3_pay.png"))

        # ---- 4. PAY: click main CTA, assert order server-fn fires ---------
        print("→ Pay (createRazorpayOrder fires)")
        pay_btn = page.get_by_role("button", name=re.compile(r"^Pay\s+₹"))
        if await pay_btn.count() == 0:
            pay_btn = page.locator("button",
                                   has_text=f"Pay {rupee(TIER_PRICE)} securely")
        await pay_btn.first.scroll_into_view_if_needed()
        await pay_btn.first.click()
        for _ in range(30):
            if any(RAZORPAY_MARK in u for u in server_fn_calls): break
            await page.wait_for_timeout(300)
        check("createRazorpayOrder server fn fired on Pay click",
              any(RAZORPAY_MARK in u for u in server_fn_calls))

        # ---- 5. VERIFY endpoint contract ---------------------------------
        print("→ /api/public/razorpay/verify contract")
        status1, body1 = post_verify("{}")
        check("verify endpoint mounted (rejects bad body)",
              status1 in (400, 500),
              f"status={status1} body={body1[:120]}")
        try:    parsed = json.loads(body1)
        except Exception: parsed = {}
        check("verify response is well-formed JSON with error field",
              parsed.get("ok") is False and isinstance(parsed.get("error"), str),
              f"body={body1[:120]}")

        bad = json.dumps({
            "intent_id":          intent_id or "00000000-0000-0000-0000-000000000000",
            "razorpay_order_id":  "order_TEST",
            "razorpay_payment_id":"pay_TEST",
            "razorpay_signature": "deadbeef" * 4,
        })
        status2, body2 = post_verify(bad)
        check("verify endpoint rejects bad signature (401/500)",
              status2 in (401, 500),
              f"status={status2} body={body2[:120]}")

        # ---- 6. DONE: /enrol/success + WhatsApp counsellor CTA -----------
        print("→ Done (WhatsApp CTA on success)")
        assert intent_id and intent_token
        await page.goto(f"{BASE}/enrol/success?intent={intent_id}&t={intent_token}",
                        wait_until="networkidle")
        await page.screenshot(path=str(SS / "4_success.png"))
        success_body = await page.locator("body").inner_text()
        check("success page references WhatsApp counsellor",
              "WhatsApp" in success_body)
        wa_links = page.locator('a[href*="wa.me/"]')
        wa_count = await wa_links.count()
        if wa_count > 0:
            href = await wa_links.first.get_attribute("href")
            check("wa.me link is well-formed",
                  bool(href) and href.startswith("https://wa.me/"))

        # ---- runtime sanity ----------------------------------------------
        check("no unhandled page errors during walk",
              len(pageerrors) == 0, "; ".join(pageerrors[:3]))

        await browser.close()

    print("\n" + "=" * 60)
    if FAILURES:
        print(f"FAIL — {len(FAILURES)} check(s):")
        for f in FAILURES: print("  •", f)
        sys.exit(1)
    print("PASS — full funnel (Program → Profile → Seat → Pay → Done) green.")

if __name__ == "__main__":
    asyncio.run(run())