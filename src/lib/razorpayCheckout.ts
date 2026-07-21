// Lazy loader for Razorpay Checkout script + open helper
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RazorpayCtor = new (opts: any) => {
  open: () => void;
  on: (e: string, cb: (p: unknown) => void) => void;
};

declare global {
  interface Window {
    Razorpay?: RazorpayCtor;
  }
}

let loadingPromise: Promise<void> | null = null;

export function loadRazorpay(): Promise<void> {
  if (typeof window === "undefined") return Promise.reject(new Error("no_window"));
  if (window.Razorpay) return Promise.resolve();
  if (loadingPromise) return loadingPromise;
  loadingPromise = new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => {
      loadingPromise = null;
      reject(new Error("Failed to load Razorpay. Check your internet connection."));
    };
    document.head.appendChild(s);
  });
  return loadingPromise;
}

export interface OpenCheckoutArgs {
  keyId: string;
  orderId: string;
  amount: number; // paise
  currency: string;
  name: string;
  description: string;
  prefill: { name: string; email: string; contact: string };
  notes?: Record<string, string>;
  themeColor?: string;
  onSuccess: (resp: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void;
  onDismiss: () => void;
  onFailed?: (err: {
    code?: string;
    description?: string;
    reason?: string;
    source?: string;
    step?: string;
  }) => void;
}

export async function openRazorpayCheckout(args: OpenCheckoutArgs): Promise<void> {
  await loadRazorpay();
  if (!window.Razorpay) throw new Error("Razorpay unavailable");
  const rzp = new window.Razorpay({
    key: args.keyId,
    order_id: args.orderId,
    amount: args.amount,
    currency: args.currency,
    name: args.name,
    description: args.description,
    prefill: args.prefill,
    notes: args.notes ?? {},
    theme: { color: args.themeColor ?? "#3B82F6" },
    modal: { ondismiss: args.onDismiss },
    handler: args.onSuccess,
  });
  if (args.onFailed) {
    rzp.on("payment.failed", (payload: unknown) => {
      const err = (payload as { error?: Record<string, string> })?.error ?? {};
      args.onFailed?.({
        code: err.code,
        description: err.description,
        reason: err.reason,
        source: err.source,
        step: err.step,
      });
    });
  }
  rzp.open();
}
