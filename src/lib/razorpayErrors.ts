// Maps Razorpay / server errors to user-facing copy + recovery guidance.

export interface FriendlyPayError {
  title: string;
  message: string;
  retry: string;
  canRetry: boolean;
  contactSupport: boolean;
  /** Optional WhatsApp waitlist URL surfaced for cohort_locked errors. */
  waitlistUrl?: string;
}

/** Server-side createRazorpayOrder error string → friendly UI block. */
export function mapServerOrderError(raw: string): FriendlyPayError {
  const s = raw.toLowerCase();

  if (s.includes("not yet configured")) {
    return {
      title: "Payments aren't ready yet",
      message:
        "Our payment gateway isn't connected on our side right now - this isn't a problem with your card or account.",
      retry: "Message your counsellor on WhatsApp to complete enrolment manually.",
      canRetry: false,
      contactSupport: true,
    };
  }
  if (s.includes("401") || s.includes("authentication")) {
    return {
      title: "Payment gateway authentication failed",
      message: "We couldn't reach Razorpay with valid credentials. Your card has not been charged.",
      retry:
        "Please try again in a minute. If it keeps failing, message your counsellor - we'll send you a direct payment link.",
      canRetry: true,
      contactSupport: true,
    };
  }
  if (s.includes("order not found") || s.includes("could not load")) {
    return {
      title: "We couldn't load your order",
      message: "Your enrolment details didn't load correctly.",
      retry: "Refresh this page and try again.",
      canRetry: true,
      contactSupport: true,
    };
  }
  if (s.includes("could not create payment order")) {
    return {
      title: "Couldn't start payment",
      message: "Razorpay didn't accept the order. Your card has not been charged.",
      retry: "Tap Retry payment. If it fails twice, switch to UPI or contact your counsellor.",
      canRetry: true,
      contactSupport: true,
    };
  }
  return {
    title: "Couldn't start payment",
    message: raw || "Something went wrong while starting your payment.",
    retry: "Please try again. Your card has not been charged.",
    canRetry: true,
    contactSupport: true,
  };
}

/** Razorpay client-side payment.failed event → friendly UI block. */
export function mapPaymentFailed(err: {
  code?: string;
  description?: string;
  reason?: string;
  source?: string;
  step?: string;
}): FriendlyPayError {
  const reason = (err.reason ?? "").toLowerCase();
  const code = (err.code ?? "").toLowerCase();

  if (reason.includes("payment_cancelled") || reason.includes("cancelled")) {
    return {
      title: "Payment cancelled",
      message: "You cancelled the payment before it completed. No money was deducted.",
      retry: "Tap Retry payment whenever you're ready.",
      canRetry: true,
      contactSupport: false,
    };
  }
  if (reason.includes("insufficient")) {
    return {
      title: "Insufficient funds",
      message: "Your bank declined the charge for insufficient balance.",
      retry:
        "Try another card, UPI, or net banking. Your counsellor can also share alternate options.",
      canRetry: true,
      contactSupport: true,
    };
  }
  if (reason.includes("authentication") || code.includes("auth")) {
    return {
      title: "Card authentication failed",
      message:
        err.description ||
        "Your bank couldn't verify the payment (OTP / 3D-Secure failed). No money was deducted.",
      retry: "Retry with the correct OTP, or use UPI / a different card.",
      canRetry: true,
      contactSupport: true,
    };
  }
  if (reason.includes("network") || code.includes("network")) {
    return {
      title: "Network interrupted",
      message: "The connection dropped before payment could complete.",
      retry:
        "Check your internet and retry. If your bank shows a debit, it will auto-reverse within 5–7 working days.",
      canRetry: true,
      contactSupport: true,
    };
  }
  if (err.source === "bank" || reason.includes("bank")) {
    return {
      title: "Bank declined the payment",
      message:
        err.description ||
        "Your bank refused the transaction. This is usually a card limit or risk filter.",
      retry:
        "Try UPI or a different card. If it keeps failing, message your counsellor for a direct link.",
      canRetry: true,
      contactSupport: true,
    };
  }
  return {
    title: "Payment failed",
    message: err.description || "Your payment didn't go through. No money was deducted.",
    retry: "Tap Retry payment. If the issue persists, contact your counsellor on WhatsApp.",
    canRetry: true,
    contactSupport: true,
  };
}
