import { useCallback, useEffect, useRef, useState } from "react";
import { createFileRoute, useNavigate, notFound, Link, redirect } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  Tag,
  Timer,
  ShieldCheck,
  AlertCircle,
  Lock,
  ArrowRight,
  MessageCircle,
  RefreshCw,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { TIER_META, isTier, formatInr } from "@/data/enrolmentTiers";
import { EnrolErrorFallback } from "@/components/enrol/EnrolErrorFallback";
import {
  applyEnrolmentCoupon,
  getEnrolmentIntent,
  expireEnrolmentCoupon,
  markPreRegistrationInitiated,
} from "@/lib/enrolment.functions";
import { createRazorpayOrder } from "@/lib/razorpay.functions";
import { openRazorpayCheckout } from "@/lib/razorpayCheckout";
import { mapServerOrderError, mapPaymentFailed, type FriendlyPayError } from "@/lib/razorpayErrors";
import {
  waLink,
  PREREG_URL,
  PREREG_AMOUNT_INR,
  PREREG_BALANCE_WINDOW_DAYS,
} from "@/components/landing/constants";
import { useCountdown, useCountdownWithSync, formatHMS } from "@/hooks/useCountdown";
import { track } from "@/lib/track";
import { trackUrgencyCouponLowTime } from "@/lib/urgencyAnalytics";
import {
  recordPrime60Window,
  recordIntentExpiry,
  resolvePersistentExpiry,
  clearIntentExpiry,
} from "@/lib/arzonPrime60";
import { Prime60WaitlistForm } from "@/components/Prime60WaitlistForm";
import { enrolProgressStore } from "@/hooks/useEnrolProgress";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import {
  WhatYouGet,
  AfterPaymentTimeline,
  TrustStrip,
  RoiCalculator,
  PayFaq,
  FinalCtaBlock,
} from "@/components/enrol/pay/PaySideSections";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const paySearch = z.object({
  intent: z.string().uuid().optional(),
  t: z.string().min(16).max(64).optional(),
});

type EnrolmentIntent = {
  id: string;
  tier: "essential" | "career" | "elite";
  name: string;
  email: string;
  phone: string;
  basePriceInr: number;
  couponCode: string | null;
  discountPct: number | null;
  couponExpiresAt: string | null;
  status: string;
  finalPriceInr: number | null;
  razorpayOrderId: string | null;
  razorpayPaymentId: string | null;
  failureReason: string | null;
  paidAt: string | null;
  preRegistrationInitiatedAt: string | null;
  preRegistrationAmountInr: number | null;
  balanceDueInr: number | null;
  balanceDueAt: string | null;
  balancePaidAt: string | null;
};

export const Route = createFileRoute("/enrol/$tier/pay")({
  validateSearch: (s) => paySearch.parse(s),
  beforeLoad: ({ params, search }) => {
    if (!isTier(params.tier)) throw notFound();
    const parsed = paySearch.safeParse(search);
    if (!parsed.success || !parsed.data.intent || !parsed.data.t) {
      throw redirect({
        to: "/enrol/$tier",
        params: { tier: params.tier },
      });
    }
  },
  loader: ({ location }) => {
    const { intent, t } = paySearch.parse(location.search);
    if (!intent || !t) {
      throw notFound();
    }
    return getEnrolmentIntent({ data: { intentId: intent, intentToken: t } });
  },
  head: () => ({
    meta: [
      { title: "Secure checkout · Arzon Global" },
      {
        name: "description",
        content: "Complete your secure payment to confirm your Arzon Global enrolment.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  errorComponent: ({ error, reset }) => (
    <EnrolErrorFallback error={error} reset={reset} where="checkout" />
  ),
  component: EnrolPay,
  pendingComponent: () => (
    <div className="min-h-screen bg-[#070B17] px-5 py-12 sm:px-6 motion-safe:animate-pulse">
      <div className="mx-auto max-w-4xl h-96 motion-safe:animate-pulse rounded-xl bg-slate-200" />
    </div>
  ),
});

function EnrolPay() {
  const initial = Route.useLoaderData();
  const { tier } = Route.useParams();
  const { t: token } = Route.useSearch();
  const navigate = useNavigate();
  const applyCoupon = useServerFn(applyEnrolmentCoupon);
  const createOrder = useServerFn(createRazorpayOrder);
  const expireCoupon = useServerFn(expireEnrolmentCoupon);
  const getIntent = useServerFn(getEnrolmentIntent);
  const markPrereg = useServerFn(markPreRegistrationInitiated);

  const [intent, setIntent] = useState<EnrolmentIntent>(initial);
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [code, setCode] = useState("");
  const [applying, setApplying] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [removeError, setRemoveError] = useState<string | null>(null);
  const [confirmRemoveOpen, setConfirmRemoveOpen] = useState(false);
  const [paying, setPaying] = useState(false);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [payError, setPayError] = useState<FriendlyPayError | null>(null);
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [expired, setExpired] = useState(false);
  const [expiredAck, setExpiredAck] = useState(false);
  const [expireSyncError, setExpireSyncError] = useState(false);
  const [preregLocked, setPreregLocked] = useState(false);

  // Abandoned Cart Recovery Hook
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!initial.paidAt && initial.status !== "paid" && !preregLocked) {
        // Send a beacon to Lovable/WhatsApp hook for abandoned cart recovery
        navigator.sendBeacon(
          "/api/public/hooks/payment-recovery",
          JSON.stringify({ intentId: initial.id }),
        );
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [initial.id, initial.paidAt, initial.status, preregLocked]);
  const [preregBalanceDueAt, setPreregBalanceDueAt] = useState<string | null>(
    initial.balanceDueAt ?? null,
  );
  const [preregLockedAmountInr, setPreregLockedAmountInr] = useState<number | null>(
    initial.preRegistrationAmountInr ?? null,
  );
  const [preregLockedBalanceInr, setPreregLockedBalanceInr] = useState<number | null>(
    initial.balanceDueInr ?? null,
  );
  const [preregBusy, setPreregBusy] = useState(false);
  const hadCouponRef = useRef(!!initial.couponCode);

  // Mirror the active intent into localStorage so a refresh, tab restore,
  // or accidental back-nav can resume payment without re-entering contact
  // details. Server intent row remains authoritative.
  useEffect(() => {
    if (!isTier(tier)) return;
    enrolProgressStore.set({
      intentId: intent.id,
      intentToken: token,
      tier,
      step: intent.status === "paid" ? "confirmed" : "payment",
      contact: { name: intent.name, email: intent.email, phone: intent.phone },
      coupon:
        intent.couponCode && intent.couponExpiresAt
          ? {
              code: intent.couponCode,
              appliedAt: new Date().toISOString(),
              expiresAt: intent.couponExpiresAt,
            }
          : undefined,
    });
  }, [
    intent.id,
    intent.status,
    intent.couponCode,
    intent.couponExpiresAt,
    intent.name,
    intent.email,
    intent.phone,
    tier,
    token,
  ]);

  // Reconciliation: if the server intent already carries a
  // pre_registration_initiated_at timestamp (user reopened tab, refreshed,
  // or came back via a WhatsApp deep-link), rehydrate the locked state so
  // the UI stays consistent with the DB row.
  useEffect(() => {
    if (initial.preRegistrationInitiatedAt && !initial.paidAt) {
      setPreregLocked(true);
    }
  }, [initial.preRegistrationInitiatedAt, initial.paidAt]);

  const meta = isTier(tier) ? TIER_META[tier] : TIER_META.career;
  // Resolve the per-intent expiry: prefer the EARLIEST of localStorage vs
  // server, so a reload (or re-apply of the same coupon) can never extend
  // the original 60-minute window.
  const effectiveExpiresAt = intent.couponCode
    ? resolvePersistentExpiry(intent.id, intent.couponCode, intent.couponExpiresAt)
    : intent.couponExpiresAt;
  const { remaining, syncedAt } = useCountdownWithSync(effectiveExpiresAt);

  // Persist the active coupon's expiry per-intent on first sight, and clear
  // when the coupon is removed. Subsequent writes for the same coupon are
  // no-ops (recordIntentExpiry keeps the earlier of the two).
  useEffect(() => {
    if (intent.couponCode && intent.couponExpiresAt) {
      recordIntentExpiry(intent.id, {
        couponCode: intent.couponCode,
        expiresAt: intent.couponExpiresAt,
      });
    } else if (!intent.couponCode) {
      clearIntentExpiry(intent.id);
    }
  }, [intent.id, intent.couponCode, intent.couponExpiresAt]);
  const couponActive = !!intent.couponCode && remaining > 0 && intent.finalPriceInr != null;
  const couponJustExpired = !!intent.couponCode && remaining === 0;

  // Track if this session ever had a coupon, so the expiry notice survives
  // the DB row being cleared by expireEnrolmentCoupon.
  useEffect(() => {
    if (intent.couponCode) hadCouponRef.current = true;
  }, [intent.couponCode]);

  // Trigger expired state when the timer hits zero on an active coupon.
  useEffect(() => {
    if (hadCouponRef.current && remaining === 0 && !expired) {
      setExpired(true);
    }
  }, [remaining, expired]);

  const expireFiredRef = useRef(false);
  const tryExpire = useCallback(async () => {
    try {
      const refreshed = await expireCoupon({ data: { intentId: intent.id, intentToken: token } });
      setIntent(refreshed as EnrolmentIntent);
      setExpireSyncError(false);
    } catch (err) {
      console.error("[expireCoupon]", err);
      // Client-side fallback: locally clear coupon fields so Pay button,
      // Razorpay order creation, and re-apply all see a clean regular-price
      // intent even when the server roundtrip failed.
      setIntent((prev: typeof initial) => ({
        ...prev,
        couponCode: null,
        couponExpiresAt: null,
        discountPct: null,
        finalPriceInr: null,
        status: "started",
      }));
      setExpireSyncError(true);
      track("coupon_expire_sync_failed", {
        program_slug: tier,
        props: {
          intent_id: intent.id,
          message: err instanceof Error ? err.message : String(err),
        },
      });
    }
  }, [expireCoupon, intent.id, tier, token]);

  useEffect(() => {
    if (couponJustExpired && !expireFiredRef.current) {
      expireFiredRef.current = true;
      track("coupon_expired", {
        program_slug: tier,
        props: { intent_id: intent.id, code: intent.couponCode },
      });
      if (intent.couponCode?.toUpperCase() === "ARZONPRIME60") {
        track("prime60_countdown_expired", {
          program_slug: tier,
          props: {
            intent_id: intent.id,
            expires_at: intent.couponExpiresAt,
          },
        });
      }
      void tryExpire();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [couponJustExpired]);

  const total =
    couponActive && intent.finalPriceInr != null ? intent.finalPriceInr : intent.basePriceInr;
  const discount = intent.basePriceInr - total;

  const onRemoveCoupon = async () => {
    if (removing || paying) return;
    const previousCode = intent.couponCode;
    setRemoving(true);
    setRemoveError(null);
    try {
      const refreshed = await expireCoupon({ data: { intentId: intent.id, intentToken: token } });
      setIntent(refreshed as EnrolmentIntent);
      setCode("");
      setCouponError(null);
      setExpired(false);
      setExpiredAck(false);
      setExpireSyncError(false);
      hadCouponRef.current = false;
      expireFiredRef.current = false;
      track("coupon_removed", {
        program_slug: tier,
        props: {
          intent_id: intent.id,
          code: previousCode,
          result: "success",
          was_expired: expired,
        },
      });
      setConfirmRemoveOpen(false);
      toast.success("Coupon removed", {
        description: previousCode ? `${previousCode} is no longer applied.` : undefined,
      });
    } catch (err) {
      console.error("[removeCoupon]", err);
      const message = err instanceof Error ? err.message : String(err);
      const reason = classifyRemoveError(message);
      setRemoveError("Couldn't remove the code. Try again.");
      toast.error("Couldn't remove coupon", { description: "Please try again." });
      track("coupon_remove_failed", {
        program_slug: tier,
        props: {
          intent_id: intent.id,
          code: previousCode,
          result: "error",
          reason,
          message: message.slice(0, 200),
          was_expired: expired,
        },
      });
    } finally {
      setRemoving(false);
    }
  };

  const onApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateCouponInput(code);
    if (validationError) {
      setCouponError(validationError);
      return;
    }
    setApplying(true);
    setCouponError(null);
    try {
      const res = await applyCoupon({ data: { intentId: intent.id, intentToken: token, code } });
      if (!res.ok) {
        const msg = friendlyCouponError(res.error);
        setCouponError(msg);
        toast.error("Couldn't apply coupon", { description: msg });
      } else {
        setIntent((prev) => ({
          ...prev,
          ...intent,
          couponCode: res.couponCode,
          discountPct: res.discountPct,
          couponExpiresAt: res.couponExpiresAt,
          status: res.status,
          finalPriceInr: res.finalPriceInr,
        }));
        hadCouponRef.current = true;
        setExpired(false);
        setExpiredAck(false);
        setExpireSyncError(false);
        if (res.couponCode?.toUpperCase() === "ARZONPRIME60") {
          recordPrime60Window({
            expiresAt: res.couponExpiresAt,
            email: intent.email,
            intentId: intent.id,
          });
        }
        track("coupon_applied", {
          program_slug: tier,
          props: { intent_id: intent.id, code: res.couponCode, final_price: res.finalPriceInr },
        });
        toast.success("Coupon applied", {
          description: res.couponCode
            ? `${res.couponCode} · New total ${formatInr(res.finalPriceInr ?? intent.basePriceInr)}`
            : undefined,
        });
      }
    } catch (err) {
      const msg = err instanceof Error ? friendlyCouponError(err.message) : "Could not apply code.";
      setCouponError(msg);
      toast.error("Couldn't apply coupon", { description: msg });
    } finally {
      setApplying(false);
    }
  };

  const onPay = async () => {
    // Single consolidated outcome event so we can see exactly how each Pay
    // click resolves in analytics — fires exactly once per click.
    let outcomeFired = false;
    const fireOutcome = (result: string, extra: Record<string, unknown> = {}) => {
      if (outcomeFired) return;
      outcomeFired = true;
      track("pay_click_outcome", {
        program_slug: tier,
        props: {
          intent_id: intent.id,
          tier,
          amount_inr: total,
          coupon: couponActive ? intent.couponCode : null,
          result,
          ...extra,
        },
      });
    };
    // Hard guard: if the ARZONPRIME60 60-minute window is over, do not
    // open Razorpay or create an order — the offer is gone.
    if (prime60Expired) {
      setPayError({
        title: "ARZONPRIME60 offer expired",
        message:
          "Your 60-minute window has ended, so checkout at this price is no longer available.",
        retry: "Message your counsellor on WhatsApp to discuss next steps or re-issue an offer.",
        canRetry: false,
        contactSupport: true,
      });
      fireOutcome("blocked_prime60_expired");
      return;
    }
    setPaying(true);
    setPayError(null);
    const couponForEvent = couponActive ? intent.couponCode : null;
    track("checkout_started", {
      program_slug: tier,
      props: {
        intent_id: intent.id,
        tier,
        amount_inr: total,
        coupon: couponForEvent,
      },
    });
    try {
      const order = await createOrder({ data: { intentId: intent.id, intentToken: token } });
      if (!order.ok) {
        // Server detected the coupon expired between page load and checkout.
        // Surface a dedicated banner, force the expired UI lock, and sync
        // the DB row so the next attempt sees clean base-price state.
        if (order.code === "coupon_expired") {
          const expiredCode = order.couponCode ?? intent.couponCode ?? "Your";
          setIntent((prev: typeof initial) => ({
            ...prev,
            // Snap the timer to 0 so the live countdown reflects reality.
            couponExpiresAt: order.couponExpiresAt ?? new Date(0).toISOString(),
          }));
          setExpired(true);
          setExpiredAck(false);
          setPayError({
            title: `${expiredCode} coupon expired`,
            message:
              "We checked with our server and your coupon window had already ended, so we did not create a payment order. No money was charged.",
            retry:
              expiredCode.toUpperCase() === "ARZONPRIME60"
                ? "This offer can't be reused. Message your counsellor on WhatsApp for next steps."
                : `Continue at the regular price of ₹${order.basePriceInr?.toLocaleString("en-IN") ?? intent.basePriceInr.toLocaleString("en-IN")} or contact your counsellor.`,
            canRetry: false,
            contactSupport: true,
          });
          track("coupon_expired_at_checkout", {
            program_slug: tier,
            props: {
              intent_id: intent.id,
              tier,
              coupon: expiredCode,
              base_price_inr: order.basePriceInr ?? intent.basePriceInr,
            },
          });
          track("payment_failure", {
            program_slug: tier,
            props: {
              intent_id: intent.id,
              tier,
              coupon: expiredCode,
              stage: "order_create",
              error: "coupon_expired",
            },
          });
          // Sync the DB row (clears coupon fields) so a follow-up attempt
          // creates a base-price order cleanly.
          void tryExpire();
          fireOutcome("coupon_expired_server");
          setPaying(false);
          return;
        }
        if (order.code === "cohort_locked") {
          setPayError({
            title: `${order.cohortLabel} cohort is locked`,
            message:
              "All seats for this cohort are taken or the lock window has closed. We did not create a payment order, so nothing was charged.",
            retry: "Tap below to join the WhatsApp waitlist for the next batch.",
            canRetry: false,
            contactSupport: true,
            waitlistUrl: order.waitlistUrl,
          });
          // Fire the dedicated funnel event so we can split locked-cohort
          // bounces from generic payment failures.
          try {
            const { trackCohort } = await import("@/lib/cohortAnalytics");
            trackCohort("checkout_blocked_locked", {
              cohort_label: order.cohortLabel,
              tier,
              intent_id: intent.id,
            });
          } catch {
            /* analytics best-effort */
          }
          track("payment_failure", {
            program_slug: tier,
            props: {
              intent_id: intent.id,
              tier,
              coupon: couponForEvent,
              stage: "order_create",
              error: "cohort_locked",
            },
          });
          fireOutcome("cohort_locked");
          setPaying(false);
          return;
        }
        setPayError(mapServerOrderError(order.error));
        track("payment_failure", {
          program_slug: tier,
          props: {
            intent_id: intent.id,
            tier,
            coupon: couponForEvent,
            stage: "order_create",
            error: order.error,
          },
        });
        fireOutcome("order_create_failed", { error: order.error });
        setPaying(false);
        return;
      }

      track("payment_started", {
        program_slug: tier,
        props: { intent_id: intent.id, amount_inr: total, order_id: order.orderId },
      });
      fireOutcome("order_created", { order_id: order.orderId });

      await openRazorpayCheckout({
        keyId: order.keyId,
        orderId: order.orderId,
        amount: order.amount,
        currency: order.currency,
        name: "Arzon Global",
        description: `${meta.name} programme enrolment`,
        prefill: { name: order.name, email: order.email, contact: order.phone },
        notes: { intent_id: intent.id, tier },
        themeColor: "#3B82F6",
        onSuccess: async (resp) => {
          try {
            const verifyRes = await fetch("/api/public/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                intent_id: intent.id,
                razorpay_order_id: resp.razorpay_order_id,
                razorpay_payment_id: resp.razorpay_payment_id,
                razorpay_signature: resp.razorpay_signature,
              }),
            });
            const verified = (await verifyRes.json()) as { ok: boolean; error?: string };
            if (!verified.ok) {
              setPayError({
                title: "Payment received — verification pending",
                message:
                  "Your payment went through, but we couldn't verify it automatically. Don't pay again.",
                retry: "Your counsellor will confirm enrolment within a few minutes on WhatsApp.",
                canRetry: false,
                contactSupport: true,
              });
              track("payment_failure", {
                program_slug: tier,
                props: {
                  intent_id: intent.id,
                  tier,
                  coupon: couponForEvent,
                  order_id: order.orderId,
                  payment_id: resp.razorpay_payment_id,
                  stage: "verify",
                  error: verified.error ?? "verify_failed",
                },
              });
              setPaying(false);
              return;
            }
            track("enrol_paid", {
              program_slug: tier,
              props: {
                intent_id: intent.id,
                amount_inr: total,
                payment_id: resp.razorpay_payment_id,
                coupon: couponForEvent,
              },
            });
            track("payment_success", {
              program_slug: tier,
              props: {
                intent_id: intent.id,
                tier,
                amount_inr: total,
                coupon: couponForEvent,
                order_id: order.orderId,
                payment_id: resp.razorpay_payment_id,
              },
            });
            if (couponForEvent?.toUpperCase() === "ARZONPRIME60") {
              track("prime60_checkout_success", {
                program_slug: tier,
                props: {
                  intent_id: intent.id,
                  tier,
                  amount_inr: total,
                  base_price_inr: intent.basePriceInr,
                  discount_inr: discount,
                  order_id: order.orderId,
                  payment_id: resp.razorpay_payment_id,
                  remaining_ms_at_pay: remaining,
                },
              });
            }
            navigate({ to: "/enrol/success", search: { intent: intent.id, t: token } });
          } catch (err) {
            console.error("[verify] error", err);
            setPayError({
              title: "Payment received — verification failed",
              message:
                "We received your payment but verification didn't complete. Please do not retry payment.",
              retry: "Your counsellor will confirm your enrolment shortly on WhatsApp.",
              canRetry: false,
              contactSupport: true,
            });
            track("payment_failure", {
              program_slug: tier,
              props: {
                intent_id: intent.id,
                tier,
                coupon: couponForEvent,
                order_id: order.orderId,
                stage: "verify_exception",
                error: err instanceof Error ? err.message : "unknown",
              },
            });
            setPaying(false);
          }
        },
        onDismiss: () => {
          track("payment_cancelled", {
            program_slug: tier,
            props: { intent_id: intent.id, order_id: order.orderId },
          });
          setPaying(false);
        },
        onFailed: (err) => {
          console.warn("[razorpay] payment.failed", err);
          track("payment_failed", {
            program_slug: tier,
            props: {
              intent_id: intent.id,
              order_id: order.orderId,
              code: err.code,
              reason: err.reason,
              source: err.source,
              step: err.step,
            },
          });
          track("payment_failure", {
            program_slug: tier,
            props: {
              intent_id: intent.id,
              tier,
              coupon: couponForEvent,
              order_id: order.orderId,
              stage: "razorpay_modal",
              code: err.code,
              reason: err.reason,
              source: err.source,
              step: err.step,
            },
          });
          setPayError(mapPaymentFailed(err));
          setPaying(false);
        },
      });
      track("razorpay_modal_opened", {
        program_slug: tier,
        props: {
          intent_id: intent.id,
          tier,
          amount_inr: total,
          coupon: couponForEvent,
          order_id: order.orderId,
        },
      });
    } catch (err) {
      console.error("[pay] error", err);
      setPayError(
        mapServerOrderError(err instanceof Error ? err.message : "Could not start payment."),
      );
      track("payment_failure", {
        program_slug: tier,
        props: {
          intent_id: intent.id,
          tier,
          coupon: couponForEvent,
          stage: "checkout_open",
          error: err instanceof Error ? err.message : "unknown",
        },
      });
      // Most common cause here is the Razorpay checkout.js script being
      // blocked by an ad/script blocker or a flaky network.
      const msg = err instanceof Error ? err.message : "unknown";
      fireOutcome(
        msg.toLowerCase().includes("razorpay") || msg.toLowerCase().includes("script")
          ? "script_load_failed"
          : "checkout_open_exception",
        { error: msg },
      );
      setPaying(false);
    }
  };

  const lowTime = remaining > 0 && remaining < 10 * 60 * 1000;

  // Recovery path for "I paid but the page didn't redirect" — re-fetches the
  // server intent and routes to /enrol/success if Razorpay's webhook has
  // landed in the meantime. Safe to call at any time; idempotent.
  const onCheckPaymentStatus = useCallback(async () => {
    if (checkingStatus) return;
    setCheckingStatus(true);
    try {
      const refreshed = await getIntent({ data: { intentId: intent.id, intentToken: token } });
      track("pay_status_recheck", {
        program_slug: tier,
        props: {
          intent_id: intent.id,
          status: refreshed.status,
          paid: !!refreshed.paidAt,
        },
      });
      if (refreshed.paidAt || refreshed.status === "paid") {
        navigate({ to: "/enrol/success", search: { intent: intent.id, t: token } });
        return;
      }
      setIntent(refreshed);
      toast.message("No payment recorded yet", {
        description:
          "If you completed payment, your counsellor will confirm on WhatsApp within a few minutes.",
      });
    } catch (err) {
      console.error("[checkStatus]", err);
      toast.error("Couldn't check payment status", {
        description: "Please try again or message your counsellor on WhatsApp.",
      });
    } finally {
      setCheckingStatus(false);
    }
  }, [checkingStatus, getIntent, intent.id, navigate, tier, token]);

  // Hard lock specifically for ARZONPRIME60: once the 60-minute timer hits
  // 00:00, the Pay button stays disabled and checkout cannot proceed,
  // regardless of any ack flow.
  const prime60Expired = intent.couponCode?.toUpperCase() === "ARZONPRIME60" && remaining === 0;
  const payLocked = prime60Expired || (expired && !expiredAck);

  // Pre-registration (₹1,065) two-step lock. Available on ALL three tiers
  // as long as the balance is at least ₹1 (i.e. total price > prereg
  // amount). Disabled with the same guards as the main Pay button.
  const preregBalance = Math.max(0, total - PREREG_AMOUNT_INR);
  // 7-day balance countdown; when the window ends the secondary CTA
  // disables and the locked card switches to an "expired" state.
  const preregDueRemaining = useCountdown(preregBalanceDueAt);
  const preregWindowExpired = !!preregBalanceDueAt && preregDueRemaining === 0;
  const preregEligible = !payLocked && total > PREREG_AMOUNT_INR && !preregWindowExpired;

  const onPrereg = useCallback(async () => {
    if (preregBusy || preregLocked || !preregEligible) return;
    setPreregBusy(true);
    try {
      // Fetch the authoritative intent from the server BEFORE locking.
      // Guarantees the amounts we send to `markPrereg` — and the balance
      // shown to the user on the locked card — reflect the current
      // coupon / expiry state on the server, not a stale render.
      let freshTotal = total;
      let freshBalance = preregBalance;
      try {
        const fresh = await getIntent({
          data: { intentId: intent.id, intentToken: token },
        });
        setIntent(fresh);
        const couponStillActive =
          !!fresh.couponCode &&
          fresh.finalPriceInr != null &&
          (!fresh.couponExpiresAt || new Date(fresh.couponExpiresAt).getTime() > Date.now());
        freshTotal =
          couponStillActive && fresh.finalPriceInr != null
            ? fresh.finalPriceInr
            : fresh.basePriceInr;
        freshBalance = Math.max(0, freshTotal - PREREG_AMOUNT_INR);
        // Guard: if the fresh total sits at or below the prereg amount,
        // seat-lock no longer makes sense (would be a full-price flow).
        if (freshTotal <= PREREG_AMOUNT_INR) {
          toast.error("Seat-lock unavailable", {
            description:
              "Your current total is at or below the pre-registration amount. Please pay in full.",
          });
          return;
        }
      } catch (refreshErr) {
        console.error("[prereg] refresh failed", refreshErr);
        toast.error("Couldn't verify latest price", {
          description: "Please refresh the page and try again.",
        });
        return;
      }

      const res = await markPrereg({
        data: {
          intentId: intent.id,
          intentToken: token,
          preregAmountInr: PREREG_AMOUNT_INR,
          balanceInr: freshBalance,
        },
      });
      if (!res.ok) {
        toast.error("Couldn't lock your seat", { description: res.error });
        track("payment_prereg_click", {
          program_slug: tier,
          props: {
            intent_id: intent.id,
            tier,
            coupon: couponActive ? intent.couponCode : null,
            prereg_amount_inr: PREREG_AMOUNT_INR,
            balance_due_inr: freshBalance,
            result: "server_error",
          },
        });
        return;
      }
      setPreregLocked(true);
      setPreregBalanceDueAt(res.balanceDueAt);
      setPreregLockedAmountInr(res.preRegistrationAmountInr);
      setPreregLockedBalanceInr(res.balanceDueInr);
      track("payment_prereg_click", {
        program_slug: tier,
        props: {
          intent_id: intent.id,
          tier,
          coupon: couponActive ? intent.couponCode : null,
          prereg_amount_inr: PREREG_AMOUNT_INR,
          balance_due_inr: freshBalance,
          balance_due_at: res.balanceDueAt,
          result: "opened",
        },
      });
      if (typeof window !== "undefined") {
        window.open(PREREG_URL, "_blank", "noopener,noreferrer");
      }
    } catch (err) {
      console.error("[prereg]", err);
      toast.error("Couldn't lock your seat", {
        description: "Please try again or message your counsellor on WhatsApp.",
      });
    } finally {
      setPreregBusy(false);
    }
  }, [
    preregBusy,
    preregLocked,
    preregEligible,
    markPrereg,
    getIntent,
    intent.id,
    intent.couponCode,
    token,
    preregBalance,
    total,
    tier,
    couponActive,
  ]);

  const payBtnRef = useRef<HTMLButtonElement>(null);
  // Track clicks on the (disabled) Pay button after ARZONPRIME60 expires.
  // `disabled` swallows onClick, so we listen for pointerdown on a wrapping
  // element. Throttled so a multi-tap doesn't spam analytics.
  const expiredClickAtRef = useRef(0);
  const trackExpiredClaimClick = useCallback(
    (surface: string) => {
      if (!payLocked) return;
      const now = Date.now();
      if (now - expiredClickAtRef.current < 750) return;
      expiredClickAtRef.current = now;
      track("arzonprime60_expired_claim_click", {
        program_slug: tier,
        props: {
          surface,
          tier,
          intent_id: intent.id,
          coupon: intent.couponCode ?? null,
          reason: prime60Expired ? "prime60_expired" : "coupon_expired",
          remaining_ms: remaining,
          ack: expiredAck,
        },
      });
    },
    [payLocked, tier, intent.id, intent.couponCode, prime60Expired, remaining, expiredAck],
  );
  const scrollToPay = () => {
    payBtnRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    payBtnRef.current?.focus({ preventScroll: true });
  };

  // Fire one analytics event the first time a live coupon crosses below the
  // 10-minute "low time" visual urgency threshold. Guarded by a ref so it
  // never re-fires on subsequent ticks (or on toggling between tiers).
  const lowTimeFiredRef = useRef(false);
  useEffect(() => {
    if (!couponActive || !lowTime || lowTimeFiredRef.current) return;
    if (!isTier(tier)) return;
    lowTimeFiredRef.current = true;
    trackUrgencyCouponLowTime({
      intentId: intent.id,
      tier,
      remainingMs: remaining,
    });
  }, [couponActive, lowTime, tier, intent.id, remaining]);

  // Fire `prime60_countdown_started` exactly once per intent, the first time
  // an ARZONPRIME60 coupon is active with time remaining. Deduped across
  // page reloads via sessionStorage so refreshing within the window does
  // not re-emit the event.
  useEffect(() => {
    if (!couponActive) return;
    if (intent.couponCode?.toUpperCase() !== "ARZONPRIME60") return;
    if (remaining <= 0) return;
    if (!isTier(tier)) return;
    if (typeof window === "undefined") return;
    const key = `prime60.started.${intent.id}`;
    try {
      if (window.sessionStorage.getItem(key)) return;
      window.sessionStorage.setItem(key, "1");
    } catch {
      // sessionStorage unavailable — fall through and still track once per mount
    }
    track("prime60_countdown_started", {
      program_slug: tier,
      props: {
        intent_id: intent.id,
        expires_at: intent.couponExpiresAt,
        remaining_ms: remaining,
        final_price: intent.finalPriceInr,
      },
    });
  }, [
    couponActive,
    intent.couponCode,
    intent.couponExpiresAt,
    intent.finalPriceInr,
    intent.id,
    remaining,
    tier,
  ]);

  return (
    <div className="min-h-screen bg-[#070B19] text-white p-4 sm:p-6 lg:p-10">
      <div className="mx-auto max-w-[1728px] w-full space-y-8">
        {/* Header Chapter: Candidate Confirmation */}
        <div className="rounded-3xl border border-white/10 bg-[#0E172F] p-6 sm:p-8 backdrop-blur-2xl shadow-xl space-y-3">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-400">
            Step 2 of 2 · Secure Tuition Investment
          </span>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Confirm &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-200 to-amber-300">
                Launch Your Transition
              </span>
            </h1>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-300 border border-blue-400/30">
              <ShieldCheck className="h-4 w-4 text-blue-400" />
              MCA & MSME Verified Portal
            </span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Welcome, <strong className="text-white font-bold">{intent.name.split(" ")[0]}</strong>.
            Review your order details below and complete payment securely via Razorpay.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* Main Column */}
          <div className="space-y-8">
            {/* Strategic Pre-Registration Seat Lock Card (Option A: Recommended & Highest Converting) */}
            <div className="rounded-3xl border-2 border-emerald-500/40 bg-gradient-to-br from-[#0F231D] via-[#0E172F] to-[#0A1020] p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-5 relative overflow-hidden">
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between pb-4 border-b border-emerald-500/20">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-mono font-bold uppercase tracking-wider">
                    🔥 MOST POPULAR CHOICE · SEAT RESERVATION
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-2">
                    Lock Your Cohort Seat for{" "}
                    <span className="text-emerald-400 font-extrabold font-mono">₹1,000</span>
                  </h3>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-500/10 px-3.5 py-1 font-mono text-xs font-bold text-amber-300">
                  ⚡ Guaranteed Batch Spot
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                Don't want to pay full tuition today? Pay just{" "}
                <strong className="text-white font-mono font-bold">₹1,000</strong> now to secure
                your seat and lock the current{" "}
                <strong className="text-amber-300 font-bold">{formatInr(total)}</strong> tuition
                rate. Pay the remaining balance of{" "}
                <strong className="text-emerald-300 font-mono font-bold">
                  {formatInr(preregBalance)}
                </strong>{" "}
                within 7 days.
              </p>

              <div className="rounded-2xl bg-black/40 border border-white/10 p-4 space-y-2 font-mono text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Today's Reservation Fee:</span>
                  <span className="font-bold text-emerald-400">₹1,000</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Remaining Balance Due (7 Days):</span>
                  <span className="font-bold text-slate-200">{formatInr(preregBalance)}</span>
                </div>
                <div className="flex justify-between text-slate-400 pt-1 border-t border-white/10">
                  <span>Total Tuition (No Extra Fees):</span>
                  <span>{formatInr(total)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onPrereg}
                disabled={!preregEligible || preregBusy}
                style={{ color: "#FFFFFF" }}
                className="w-full h-14 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-base shadow-xl shadow-emerald-950/60 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {preregBusy ? (
                  <>
                    <Loader2 className="h-5 w-5 motion-safe:animate-spin" />
                    <span>Reserving Seat…</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="h-5 w-5 text-emerald-300" />
                    <span>Reserve Seat Now for ₹1,000</span>
                    <ArrowRight className="h-5 w-5 text-white" />
                  </>
                )}
              </button>
            </div>

            {/* Tuition Breakdown Card (Option B: Full Settlement) */}
            <div className="rounded-3xl border border-white/10 bg-[#0E172F] p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-amber-400">
                    Tuition Investment Breakdown
                  </p>
                  <h3 className="font-serif text-2xl font-bold text-white mt-0.5">{meta.name}</h3>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-400/30 bg-blue-500/10 px-3.5 py-1 font-mono text-xs font-bold text-blue-300">
                  <ShieldCheck className="h-3.5 w-3.5 text-blue-400" /> Server Verified
                </span>
              </div>

              <div className="space-y-3 pt-1">
                <Row
                  label={`${meta.name} programme standard tuition`}
                  value={formatInr(intent.basePriceInr)}
                  strike={couponActive}
                />
                {couponActive && (
                  <Row
                    label={`Scholarship / Coupon (${intent.couponCode})`}
                    value={`−${formatInr(Math.max(0, intent.basePriceInr - total))}`}
                    accent="text-amber-300 font-bold"
                  />
                )}
                <div className="my-3 h-px bg-white/10" />
                <Row label="Total Payable Tuition" value={formatInr(total)} bold />
                <p className="pt-2 text-xs text-slate-300 leading-relaxed">
                  You'll be charged exactly{" "}
                  <strong className="font-mono text-white font-bold">{formatInr(total)}</strong> on
                  the next screen via Razorpay. Official GST tax invoice and instant receipt issued
                  upon confirmation.
                </p>
              </div>

              {payError && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="rounded-2xl border border-rose-500/50 bg-rose-950/60 p-4 text-sm text-rose-200 space-y-2"
                >
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
                    <div className="flex-1 space-y-1">
                      <p className="font-bold text-rose-100">{payError.title}</p>
                      <p className="text-xs text-rose-200">{payError.message}</p>
                      <p className="text-xs text-rose-300 font-medium">{payError.retry}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Instant Razorpay Pay CTA */}
              <div className="pt-2">
                <button
                  type="button"
                  ref={payBtnRef}
                  onClick={onPay}
                  disabled={payLocked || paying}
                  style={{ color: "#FFFFFF" }}
                  className="w-full h-14 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-base shadow-xl shadow-blue-900/50 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {paying ? (
                    <>
                      <Loader2 className="h-5 w-5 motion-safe:animate-spin" />
                      <span>Opening Secure Razorpay Gateway…</span>
                    </>
                  ) : (
                    <>
                      <Lock className="h-5 w-5 text-amber-300" />
                      <span>Complete Enrolment — Pay {formatInr(total)}</span>
                      <ArrowRight className="h-5 w-5 text-white" />
                    </>
                  )}
                </button>

                <div className="mt-3 flex items-center justify-between text-xs text-slate-300 px-1">
                  <span className="flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5 text-amber-400" /> 256-Bit TLS Secured
                  </span>
                  <span>Razorpay Payments · UPI, Cards, NetBanking</span>
                </div>
              </div>

              {/* Coupon Code Accordion */}
              <div className="pt-2 border-t border-white/10">
                {couponActive ? (
                  <div className="rounded-2xl border border-blue-500/30 bg-blue-950/40 p-4 flex items-center justify-between text-xs text-blue-200">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4.5 w-4.5 text-blue-400" />
                      <span>
                        Coupon <strong className="text-white font-mono">{intent.couponCode}</strong>{" "}
                        applied (save {formatInr(discount)})
                      </span>
                    </div>
                    {!paying && (
                      <button
                        type="button"
                        onClick={() => setConfirmRemoveOpen(true)}
                        className="text-xs font-semibold text-rose-300 hover:underline"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ) : (
                  <div>
                    <button
                      type="button"
                      onClick={() => setShowCouponInput((v) => !v)}
                      className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5"
                    >
                      <Tag className="h-3.5 w-3.5 text-amber-400" />
                      <span>
                        {showCouponInput
                          ? "Hide promo code input"
                          : "Have a promo / counsellor code?"}
                      </span>
                    </button>

                    {showCouponInput && (
                      <form onSubmit={onApplyCoupon} className="mt-3 flex gap-2">
                        <input
                          value={code}
                          onChange={(e) => setCode(e.target.value.toUpperCase())}
                          placeholder="ENTER CODE"
                          className="h-11 flex-1 rounded-xl border border-slate-700 bg-white/[0.04] px-3.5 text-xs font-mono text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
                        />
                        <button
                          type="submit"
                          disabled={applying || code.trim().length < 3}
                          className="h-11 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md disabled:opacity-50"
                        >
                          {applying ? "Applying…" : "Apply"}
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Chapter 3: What You Get */}
            <WhatYouGet />

            {/* Chapter 4: Onboarding Timeline */}
            <AfterPaymentTimeline />
          </div>

          {/* Right Column / Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            <RoiCalculator totalInr={total} />
            <TrustStrip />
          </aside>

          {/* Bottom Full-Width Chapters */}
          <div className="lg:col-span-2 space-y-8 pt-4">
            <PayFaq />
            <FinalCtaBlock totalInr={total} paying={paying} disabled={payLocked} onPay={onPay} />
          </div>
        </div>
      </div>

      <AlertDialog
        open={confirmRemoveOpen}
        onOpenChange={(open) => {
          if (removing) return;
          setConfirmRemoveOpen(open);
          if (!open) setRemoveError(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {expired ? "This coupon has already expired" : "Remove this coupon?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {expired ? (
                <>
                  The{" "}
                  {intent.couponCode ? (
                    <span className="font-mono font-semibold">{intent.couponCode}</span>
                  ) : (
                    "discount"
                  )}{" "}
                  window ran out, so the discount is no longer active and your total is already back
                  to <span className="font-semibold">{formatInr(intent.basePriceInr)}</span>.
                  Clearing it just removes the expired badge — your payment amount won't change.
                </>
              ) : intent.couponCode ? (
                <>
                  <span className="font-mono font-semibold">{intent.couponCode}</span> will be
                  removed and your total will go back to{" "}
                  <span className="font-semibold">{formatInr(intent.basePriceInr)}</span>. You can
                  re-apply a code afterwards.
                </>
              ) : (
                "The applied coupon will be removed and your total will go back to the original price."
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          {removeError && (
            <p role="alert" aria-live="polite" className="text-xs text-danger">
              {removeError}
            </p>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel disabled={removing}>
              {expired ? "Close" : "Keep coupon"}
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={removing}
              onClick={(e) => {
                e.preventDefault();
                void onRemoveCoupon();
              }}
            >
              {removing ? "Removing…" : expired ? "Clear expired coupon" : "Remove coupon"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Toaster richColors position="top-center" theme="dark" />
    </div>
  );
}

function Row({
  label,
  value,
  accent,
  muted,
  bold,
  strike,
}: {
  label: string;
  value: string;
  accent?: string;
  muted?: boolean;
  bold?: boolean;
  strike?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className={muted ? "text-white/70" : "text-white/75"}>{label}</span>
      <span
        className={`${accent ?? "text-white"} ${bold ? "font-display text-h3" : ""} ${strike ? "text-white/70 line-through" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}

function friendlyCouponError(msg: string): string {
  const m = msg.toLowerCase();
  if (m.includes("invalid coupon")) return "That code isn't valid. Check it and try again.";
  if (m.includes("not valid for this tier")) return "This code doesn't apply to this programme.";
  if (m.includes("already used"))
    return "This code has already been used for this email. Ask your counsellor for a fresh one.";
  if (m.includes("coupon expired") || m.includes("expired"))
    return "This code has expired. Ask your counsellor for a current one.";
  if (m.includes("intent not found"))
    return "Your checkout session expired. Refresh the page and try again.";
  if (
    m.includes("intent_id required") ||
    m.includes("network") ||
    m.includes("fetch") ||
    m.includes("failed")
  ) {
    return "Couldn't reach the server. Check your connection and try again.";
  }
  return "Could not apply code. Please try again.";
}

function validateCouponInput(raw: string): string | null {
  const code = raw.trim();
  if (!code) return "Enter a coupon or counsellor code.";
  if (code.length < 3 || code.length > 32) return "Codes are 3–32 characters.";
  if (!/^[A-Z0-9_-]+$/i.test(code)) {
    return "Codes can only contain letters, numbers, hyphens and underscores.";
  }
  return null;
}

function classifyRemoveError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("intent not found")) return "intent_not_found";
  if (m.includes("network") || m.includes("fetch") || m.includes("failed to fetch"))
    return "network";
  if (m.includes("timeout") || m.includes("timed out")) return "timeout";
  if (m.includes("unauthorized") || m.includes("401")) return "unauthorized";
  if (m.includes("forbidden") || m.includes("403")) return "forbidden";
  if (m.includes("500") || m.includes("server error")) return "server_error";
  return "unknown";
}
