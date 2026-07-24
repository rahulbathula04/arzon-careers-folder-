import { useCallback, useEffect, useRef, useState } from "react";
import { createFileRoute, useNavigate, notFound, Link } from "@tanstack/react-router";
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
  SuccessCard,
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
  intent: z.string().uuid(),
  t: z.string().min(16).max(64),
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
  beforeLoad: ({ params }) => {
    if (!isTier(params.tier)) throw notFound();
  },
  loader: ({ location }) => {
    const { intent, t } = paySearch.parse(location.search);
    return getEnrolmentIntent({ data: { intentId: intent, intentToken: t } });
  },
  head: () => ({
    meta: [
      { title: "Secure checkout. Arzon Global" },
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
        navigator.sendBeacon("/api/public/hooks/payment-recovery", JSON.stringify({ intentId: initial.id }));
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
  }, [expireCoupon, intent.id, tier]);

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
  }, [checkingStatus, getIntent, intent.id, navigate, tier]);

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
    <div className="min-h-screen bg-[#090d16] text-slate-100 p-4 sm:p-6 lg:p-10">
      <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      {couponActive && (
        <div className="lg:col-span-2">
          <div
            className={`sticky top-4 z-30 rounded-xl border p-4 backdrop-blur-md ${
              lowTime
                ? "border-rose-500/40 bg-rose-500/10"
                : "border-sky-500/30 bg-[#0f172a]"
            }`}
            role="status"
            aria-live="polite"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Timer className={`h-5 w-5 shrink-0 ${lowTime ? "text-rose-400" : "text-sky-400"}`} />
                <div>
                  <p className="font-mono text-xs font-medium uppercase tracking-wider text-slate-300">
                    {intent.couponCode} applied — pay within
                  </p>
                  <p className="text-xs text-slate-400">
                    Lock in <span className="font-mono font-medium text-white">{formatInr(total)}</span>
                    <span> (save {formatInr(discount)})</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="font-mono text-2xl font-bold tabular-nums text-sky-400">
                  {formatHMS(remaining)}
                </div>
                <button
                  type="button"
                  onClick={scrollToPay}
                  className="hidden sm:inline-flex items-center gap-1 rounded-lg bg-sky-500/10 border border-sky-500/20 px-3 py-1.5 text-xs font-medium text-sky-400 hover:bg-sky-500/20 transition-colors"
                >
                  Pay now <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div>
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-sky-500/10 border border-sky-500/20 px-3 py-1 text-xs font-mono font-medium text-sky-400">
            Step 3 of 3 — Secure Payment & Checkout
          </span>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-3xl font-bold text-white tracking-tight">Confirm & Checkout</h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              14 learners enrolled in last 24h
            </span>
          </div>
          <p className="text-sm text-slate-400">
            Hi {intent.name.split(" ")[0]}, review your order specification and complete payment securely via Razorpay.
          </p>
        </div>

        {/* Order summary */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center justify-between">
            <p className="font-grotesk text-sm font-bold text-white">Order summary</p>
            <span className="inline-flex items-center gap-1 rounded-full border border-accent-glow/30 bg-accent-glow/5 px-2 py-0.5 font-mono text-micro uppercase tracking-wider text-eyebrow-strong">
              <ShieldCheck className="h-3 w-3" /> Server-verified
            </span>
          </div>
          <div className="mt-4 space-y-2 text-sm">
            <Row
              label={`${meta.name} programme`}
              value={formatInr(intent.basePriceInr)}
              strike={couponActive}
            />
            {couponActive && (
              <Row
                label={`Coupon ${intent.couponCode}`}
                value={`−${formatInr(Math.max(0, intent.basePriceInr - total))}`}
                accent="text-eyebrow"
              />
            )}
            <div className="my-3 h-px bg-white/10" />
            <Row label="Total payable" value={formatInr(total)} bold />
            {preregEligible && (
              <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.04] p-3">
                <p className="font-mono text-micro uppercase tracking-[0.18em] text-eyebrow-strong">
                  Split-pay option
                </p>
                <div className="mt-2 space-y-1.5">
                  <Row
                    label="Pre-register now"
                    value={formatInr(PREREG_AMOUNT_INR)}
                    accent="text-white"
                  />
                  <Row label="Balance (due in 7 days)" value={formatInr(preregBalance)} muted />
                </div>
                <p className="mt-2 text-micro text-white/60">
                  Balance recomputes if a coupon is applied before you lock the seat.
                </p>
              </div>
            )}
            <p className="pt-1 text-micro text-white/70">
              You'll be charged exactly{" "}
              <span className="font-mono font-semibold text-white/70">{formatInr(total)}</span> on
              the next screen. The amount is locked by us — it can't be changed at checkout.
            </p>
          </div>

          {couponActive && (
            <p
              className={`mt-3 inline-flex items-center gap-1.5 text-xs ${lowTime ? "text-danger" : "text-eyebrow-strong"}`}
            >
              <Timer className="h-3.5 w-3.5" /> Offer expires in{" "}
              <span className="font-mono font-bold">{formatHMS(remaining)}</span>
            </p>
          )}
          {payLocked && (
            <div className="mt-4 rounded-xl border border-danger/40 bg-danger/10 p-4">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-danger" />
                <div className="min-w-0 flex-1">
                  <p className="font-grotesk text-sm font-bold text-danger">
                    Your ARZONPRIME60 offer has expired
                  </p>
                  <p className="mt-1 text-xs text-danger/85">
                    {prime60Expired
                      ? "The 60-minute window has ended. Checkout at this price is no longer available."
                      : "The 60-minute window has ended. Regular price now applies."}
                  </p>
                  {prime60Expired ? (
                    <>
                      <a
                        href={waLink(
                          `Hi Arzon, my ARZONPRIME60 offer expired before I could pay for the ${meta.name} programme. Can you help?`,
                        )}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-secondary btn-sm mt-3 inline-flex items-center gap-1.5"
                      >
                        <MessageCircle className="h-3.5 w-3.5" /> Talk to your counsellor
                      </a>
                      <div className="mt-4">
                        <Prime60WaitlistForm
                          variant="dark"
                          source="pay"
                          tier={tier}
                          intentId={intent.id}
                          leadId={null}
                          defaultEmail={intent.email ?? ""}
                          defaultName={intent.name ?? ""}
                          defaultPhone={intent.phone ?? ""}
                        />
                      </div>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setExpiredAck(true)}
                      className="btn btn-secondary btn-sm mt-3"
                    >
                      Continue at regular price&nbsp; {formatInr(intent.basePriceInr)}
                    </button>
                  )}
                  {expireSyncError && (
                    <div className="mt-3 rounded-lg border border-danger/30 bg-danger/5 p-2.5 text-xs text-danger/90">
                      We couldn't confirm expiry with our server, but you'll be charged the regular{" "}
                      {formatInr(intent.basePriceInr)}.
                      <button
                        type="button"
                        onClick={() => void tryExpire()}
                        className="ml-2 underline underline-offset-2 hover:text-danger"
                      >
                        Retry sync
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {expired && expiredAck && (
            <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-white/80">
              <AlertCircle className="h-3.5 w-3.5" /> Coupon expired · regular price
            </p>
          )}

          {payError && (
            <div
              role="alert"
              aria-live="assertive"
              className="mt-4 rounded-xl border border-danger/40 bg-danger/10 p-4 text-sm text-danger"
            >
              <div className="flex items-start gap-2">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-danger" />
                <div className="flex-1">
                  <p className="font-grotesk text-caption font-bold text-danger">
                    {payError.title}
                  </p>
                  <p className="mt-1 text-meta leading-relaxed text-danger/90">
                    {payError.message}
                  </p>
                  <p className="mt-2 text-meta leading-relaxed text-danger/80">
                    <span className="font-semibold text-danger">What to do: </span>
                    {payError.retry}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {payError.waitlistUrl && (
                      <a
                        href={payError.waitlistUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-success/25 px-3 py-1.5 text-meta font-semibold text-success transition hover:bg-success/35"
                      >
                        <MessageCircle className="h-3.5 w-3.5" /> Join WhatsApp waitlist
                      </a>
                    )}
                    {payError.canRetry && (
                      <button
                        type="button"
                        onClick={() => {
                          setPayError(null);
                          onPay();
                        }}
                        disabled={paying}
                        className="inline-flex items-center gap-1.5 rounded-full bg-danger/20 px-3 py-1.5 text-meta font-semibold text-danger transition hover:bg-danger/30 disabled:opacity-60"
                      >
                        <RefreshCw className="h-3.5 w-3.5" /> Retry payment
                      </button>
                    )}
                    {payError.contactSupport && (
                      <a
                        href={waLink(
                          `Hi Arzon, my payment for the ${meta.name} programme failed (${payError.title}). Order ${intent.id.slice(0, 8)}. Can you help?`,
                        )}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-meta font-medium text-white/85 transition hover:bg-white/[0.08]"
                      >
                        <MessageCircle className="h-3.5 w-3.5" /> WhatsApp counsellor
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={onCheckPaymentStatus}
                      disabled={checkingStatus}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-meta font-medium text-white/85 transition hover:bg-white/[0.08] disabled:opacity-60"
                    >
                      {checkingStatus ? (
                        <Loader2 className="h-3.5 w-3.5 motion-safe:animate-spin" />
                      ) : (
                        <RefreshCw className="h-3.5 w-3.5" />
                      )}
                      {checkingStatus ? "Checking…" : "Check payment status"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <span onPointerDown={() => trackExpiredClaimClick("pay_main")} className="block">
            <button
              onClick={onPay}
              disabled={paying || payLocked}
              ref={payBtnRef}
              className={`btn btn-block mt-5 py-4 text-base shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-transform hover:scale-[1.01] ${couponActive ? "bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-950 border-none shadow-[0_0_20px_rgba(234,179,8,0.4)]" : "btn-primary"} disabled:opacity-60`}
            >
              <Lock className="mr-2 h-5 w-5" />
              {payLocked
                ? prime60Expired
                  ? "Offer expired — checkout disabled"
                  : "Pay locked — review price above"
                : paying
                  ? "Opening Secure Checkout…"
                  : `1-Click Pay ${formatInr(total)}`}
            </button>
          </span>
          <p className="mt-3 text-center text-micro text-white/70">
            UPI · Cards · Net Banking · Wallets, powered by Razorpay
          </p>
          <p className="mt-1.5 flex items-center justify-center gap-1.5 text-center font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/55">
            <ShieldCheck className="h-3 w-3 text-eyebrow" aria-hidden />
            Payments secured by Razorpay · PCI-DSS Level 1
          </p>

          {!preregLocked && total > PREREG_AMOUNT_INR && (
            <div
              data-testid="prereg-cta"
              className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            >
              <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-white/60">
                <span className="h-px flex-1 bg-white/10" />
                or lock your seat
                <span className="h-px flex-1 bg-white/10" />
              </div>
              <button
                type="button"
                onClick={onPrereg}
                disabled={preregBusy || !preregEligible}
                data-testid="prereg-cta-button"
                className="btn btn-block btn-secondary disabled:opacity-60"
              >
                <Lock className="mr-1.5 h-4 w-4" />
                {preregBusy
                  ? "Opening Razorpay…"
                  : preregWindowExpired
                    ? "7-day window closed"
                    : payLocked
                      ? "Locked"
                      : `Lock seat · ${formatInr(PREREG_AMOUNT_INR)} now`}
              </button>
              <p className="mt-2 text-center text-micro text-white/70">
                Pay <span className="font-semibold text-white">{formatInr(PREREG_AMOUNT_INR)}</span>{" "}
                now to reserve your spot. Your counsellor sends the balance link on WhatsApp within{" "}
                {PREREG_BALANCE_WINDOW_DAYS} days.
              </p>
            </div>
          )}

          {preregLocked && (
            <div
              role="status"
              aria-live="polite"
              data-testid="prereg-locked-card"
              className={`mt-5 rounded-2xl border p-4 ${
                preregWindowExpired
                  ? "border-danger/40 bg-danger/10"
                  : "border-accent-glow/40 bg-accent-glow/10"
              }`}
            >
              <div className="flex items-start gap-3">
                <CheckCircle2
                  className={`mt-0.5 h-5 w-5 shrink-0 ${preregWindowExpired ? "text-danger" : "text-eyebrow"}`}
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1">
                  <p
                    className={`font-grotesk text-sm font-bold ${preregWindowExpired ? "text-danger" : "text-eyebrow-strong"}`}
                  >
                    {preregWindowExpired
                      ? "Balance window closed"
                      : `Seat locked — ${formatInr(preregLockedAmountInr ?? PREREG_AMOUNT_INR)} pre-registration`}
                  </p>

                  <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    <div className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2">
                      <dt className="font-mono text-[10px] uppercase tracking-wider text-white/60">
                        Locked now
                      </dt>
                      <dd className="mt-0.5 font-semibold text-white tabular-nums">
                        {formatInr(preregLockedAmountInr ?? PREREG_AMOUNT_INR)}
                      </dd>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2">
                      <dt className="font-mono text-[10px] uppercase tracking-wider text-white/60">
                        Balance due
                      </dt>
                      <dd className="mt-0.5 font-semibold text-white tabular-nums">
                        {formatInr(preregLockedBalanceInr ?? preregBalance)}
                      </dd>
                    </div>
                  </dl>

                  {(() => {
                    // Post-lock consistency check: the locked amount +
                    // balance were reconciled server-side against the
                    // intent's total at lock time. If the current cart
                    // total has since diverged (e.g. a coupon was applied
                    // AFTER the seat was locked), surface a note so the
                    // user understands the locked figures are the source
                    // of truth — the server refuses to overwrite them.
                    const lockedAmt = preregLockedAmountInr ?? PREREG_AMOUNT_INR;
                    const lockedBal = preregLockedBalanceInr ?? preregBalance;
                    const lockedTotal = lockedAmt + lockedBal;
                    const drift = lockedTotal !== total;
                    if (!drift) return null;
                    return (
                      <p
                        data-testid="prereg-lock-drift"
                        className="mt-3 rounded-lg border border-warning/30 bg-warning/10 px-3 py-2 text-[11px] leading-relaxed text-warning"
                      >
                        <span className="font-semibold">Locked at {formatInr(lockedTotal)}.</span>{" "}
                        Your cart now shows {formatInr(total)}. The seat-lock amount and 7-day
                        balance stay at the figures above — they were reconciled with the server at
                        lock time and can't be retroactively changed by later coupons.
                      </p>
                    );
                  })()}

                  {preregBalanceDueAt && (
                    <p
                      data-testid="prereg-countdown"
                      className={`mt-3 flex items-center gap-2 rounded-lg border px-3 py-2 font-mono text-[11px] tabular-nums ${
                        preregWindowExpired
                          ? "border-danger/30 bg-danger/10 text-danger"
                          : "border-white/10 bg-white/[0.04] text-white/85"
                      }`}
                    >
                      <Timer className="h-3.5 w-3.5" />
                      {preregWindowExpired ? (
                        <>
                          Balance was due by{" "}
                          {new Date(preregBalanceDueAt).toLocaleString("en-IN", {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </>
                      ) : (
                        <>
                          Balance link expires in{" "}
                          <span className="font-semibold text-white">
                            {formatHMS(preregDueRemaining)}
                          </span>{" "}
                          · due{" "}
                          {new Date(preregBalanceDueAt).toLocaleString("en-IN", {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </>
                      )}
                    </p>
                  )}

                  <p className="mt-3 text-xs text-white/75">
                    <span className="font-semibold text-white">Next steps:</span>{" "}
                    {preregWindowExpired
                      ? "Message your counsellor on WhatsApp to reissue the balance payment link."
                      : "1) Complete the ₹1,065 pre-registration in the Razorpay tab. 2) Your counsellor sends the balance Razorpay link on WhatsApp before the window closes."}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {!preregWindowExpired && (
                      <a
                        href={PREREG_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid="prereg-reopen"
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-meta font-medium text-white transition hover:bg-white/[0.12]"
                      >
                        Reopen Razorpay <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                    <a
                      href={waLink(
                        `Hi Arzon, I've locked my seat for the ${meta.name} track with the ${formatInr(preregLockedAmountInr ?? PREREG_AMOUNT_INR)} pre-registration (intent ${intent.id.slice(0, 8)}). Balance ${formatInr(preregLockedBalanceInr ?? preregBalance)} — please share the balance payment link.`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="prereg-whatsapp"
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-meta font-medium text-white transition hover:bg-white/[0.12]"
                    >
                      <MessageCircle className="h-3.5 w-3.5" /> Talk to counsellor
                    </a>
                    <button
                      type="button"
                      onClick={onCheckPaymentStatus}
                      disabled={checkingStatus}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-meta font-medium text-white transition hover:bg-white/[0.12] disabled:opacity-60"
                    >
                      {checkingStatus ? (
                        <Loader2 className="h-3.5 w-3.5 motion-safe:animate-spin" />
                      ) : (
                        <RefreshCw className="h-3.5 w-3.5" />
                      )}
                      {checkingStatus ? "Checking…" : "View details"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Counsellor coupon — collapsed by default. Coupons are issued
            only by Arzon directors / sales counsellors, never advertised. */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          {couponActive ? (
            <div
              role="status"
              aria-live="polite"
              className="rounded-xl border border-accent-glow/40 bg-accent-glow/10 px-4 py-3 shadow-[0_0_0_1px_rgba(16,185,129,0.08)]"
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-glow/20">
                  <CheckCircle2 className="h-4 w-4 text-eyebrow" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-grotesk text-sm font-bold text-eyebrow-strong">
                    Coupon applied
                  </p>
                  <p className="mt-0.5 text-xs text-eyebrow-strong/85">
                    <span className="font-mono font-bold text-eyebrow-strong">
                      {intent.couponCode}
                    </span>
                    {" · "}You save{" "}
                    <span className="font-semibold text-white">{formatInr(discount)}</span>
                    {" · "}New total{" "}
                    <span className="font-semibold text-white">{formatInr(total)}</span>
                  </p>
                </div>
                {!expired && !paying && (
                  <button
                    type="button"
                    onClick={() => {
                      setRemoveError(null);
                      setConfirmRemoveOpen(true);
                    }}
                    disabled={removing}
                    className="shrink-0 self-start text-xs font-medium text-eyebrow-strong/80 underline underline-offset-2 hover:text-white disabled:opacity-60"
                  >
                    {removing ? "Removing…" : "Remove"}
                  </button>
                )}
              </div>
              {removeError && (
                <p role="alert" aria-live="polite" className="mt-2 text-xs text-danger">
                  {removeError}
                </p>
              )}
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-gold" />
                <p className="font-grotesk text-sm font-bold text-white">Have a counsellor code?</p>
              </div>
              <p className="mt-1.5 text-meta leading-relaxed text-white/65">
                Coupons are issued only by Arzon directors and sales counsellors. Pay the listed
                price now, or ask your counsellor if there&rsquo;s a code you can use.
              </p>

              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <a
                  href={waLink(
                    `Hi Arzon, I'd like to enrol in the ${meta.name} programme — do you have any current offer or code I can use? Order ref ${intent.id.slice(0, 8)}.`,
                  )}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() =>
                    track("coupon_counsellor_contact_clicked", {
                      program_slug: tier,
                      props: { intent_id: intent.id, tier },
                    })
                  }
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-accent-glow/15 px-4 py-2.5 text-meta font-semibold text-eyebrow-strong ring-1 ring-accent-glow/30 hover:bg-accent-glow/25"
                >
                  <MessageCircle className="h-3.5 w-3.5" /> Talk to a counsellor on WhatsApp
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setShowCouponInput((v) => !v);
                    if (couponError) setCouponError(null);
                  }}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2.5 text-meta font-semibold text-white/85 hover:bg-white/[0.08]"
                  aria-expanded={showCouponInput}
                  aria-controls="counsellor-code-input"
                >
                  {showCouponInput ? "Hide code field" : "I already have a code"}
                </button>
              </div>

              {showCouponInput && (
                <form
                  id="counsellor-code-input"
                  onSubmit={onApplyCoupon}
                  aria-busy={applying || removing}
                  className="mt-4 border-t border-white/10 pt-4"
                >
                  <div className="flex flex-wrap items-stretch gap-2 rounded-2xl border border-white/10 bg-[#070B17] p-1.5 ring-1 ring-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] focus-within:border-gold/40 focus-within:ring-gold/20">
                    <input
                      value={code}
                      onChange={(e) => {
                        setCode(e.target.value.toUpperCase());
                        if (couponError) setCouponError(null);
                      }}
                      placeholder="ENTER COUNSELLOR CODE"
                      maxLength={32}
                      autoFocus
                      aria-invalid={couponError ? true : undefined}
                      aria-describedby={couponError ? "coupon-error" : undefined}
                      disabled={applying || removing}
                      className={`h-11 flex-1 min-w-[160px] rounded-xl border bg-transparent px-4 font-mono text-sm uppercase tracking-[0.18em] text-white outline-none placeholder:text-white/40 disabled:cursor-not-allowed disabled:opacity-60 ${couponError ? "border-danger/60" : "border-transparent"}`}
                    />
                    <button
                      type="submit"
                      disabled={applying || removing || code.trim().length < 3}
                      className="btn btn-gold btn-md min-w-[96px] disabled:opacity-60"
                    >
                      {applying ? (
                        <>
                          <Loader2 className="mr-1.5 h-3.5 w-3.5 motion-safe:animate-spin" />{" "}
                          Applying…
                        </>
                      ) : (
                        "Apply"
                      )}
                    </button>
                  </div>
                  {couponError && (
                    <div
                      id="coupon-error"
                      role="alert"
                      aria-live="polite"
                      className="mt-2 flex items-start gap-2 rounded-lg border border-danger/40 bg-danger/10 px-3 py-2 text-xs text-danger"
                    >
                      <AlertCircle
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-danger"
                        aria-hidden="true"
                      />
                      <span>{couponError}</span>
                    </div>
                  )}
                </form>
              )}
            </div>
          )}
        </div>
      </div>

      <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
        <WhatYouGet />
        <AfterPaymentTimeline />
        <TrustStrip />
        <RoiCalculator totalInr={total} />
        <SuccessCard />
      </aside>

      <div className="lg:col-span-2 space-y-6 pt-2">
        <PayFaq />
        <FinalCtaBlock
          totalInr={total}
          paying={paying}
          disabled={payLocked}
          onPay={onPay}
          onFooterScrollHint={scrollToPay}
        />
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
