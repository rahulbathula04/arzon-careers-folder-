// Structured server-side logging helper for enrolment / checkout flows.
//
// Emits a single-line JSON payload to the Worker's stdout so entries are
// grep-able in Server Logs by `op`, `code`, or `correlationId`. Never
// includes raw email / phone (PII) - only a short intent-id prefix that
// is safe to expose in logs.

export type EnrolOp =
  | "createEnrolmentIntent"
  | "applyEnrolmentCoupon"
  | "getEnrolmentIntent"
  | "expireEnrolmentCoupon"
  | "markPreRegistrationInitiated"
  | "createRazorpayOrder"
  | "attachRazorpayOrder"
  | "cohortStatus"
  | "razorpayVerify";

export interface EnrolLogContext {
  op: EnrolOp;
  /** short DB code / error tag, e.g. "rpc_error", "http_401", "coupon_expired" */
  code?: string;
  intentId?: string | null;
  tier?: string | null;
  httpStatus?: number;
  correlationId?: string;
  /** any additional non-PII fields to include */
  extra?: Record<string, unknown>;
}

function safeMessage(err: unknown): string {
  if (!err) return "unknown error";
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  try {
    return JSON.stringify(err).slice(0, 500);
  } catch {
    return String(err);
  }
}

function shortId(id?: string | null): string | undefined {
  if (!id) return undefined;
  return id.slice(0, 8);
}

/** Generate a short correlation id for grouping related log lines. */
export function newCorrelationId(): string {
  return Math.random().toString(36).slice(2, 10);
}

/**
 * Log a structured server-side enrolment/checkout error. Also returns the
 * correlation id so it can be surfaced to the client for support triage.
 */
export function logEnrolError(
  err: unknown,
  ctx: EnrolLogContext,
): { correlationId: string; message: string } {
  const correlationId = ctx.correlationId ?? newCorrelationId();
  const payload = {
    level: "error" as const,
    scope: "enrolment" as const,
    op: ctx.op,
    code: ctx.code ?? "unhandled",
    correlationId,
    intent: shortId(ctx.intentId),
    tier: ctx.tier ?? undefined,
    httpStatus: ctx.httpStatus,
    message: safeMessage(err).slice(0, 500),
    stack:
      err instanceof Error && typeof err.stack === "string" ? err.stack.slice(0, 1200) : undefined,
    ...ctx.extra,
    ts: new Date().toISOString(),
  };

  console.error(`[enrol-error] ${JSON.stringify(payload)}`);
  return { correlationId, message: payload.message };
}

/** Log a lower-severity warn (non-fatal recovery, degraded path). */
export function logEnrolWarn(message: string, ctx: EnrolLogContext): { correlationId: string } {
  const correlationId = ctx.correlationId ?? newCorrelationId();
  const payload = {
    level: "warn" as const,
    scope: "enrolment" as const,
    op: ctx.op,
    code: ctx.code ?? "warn",
    correlationId,
    intent: shortId(ctx.intentId),
    tier: ctx.tier ?? undefined,
    httpStatus: ctx.httpStatus,
    message: message.slice(0, 500),
    ...ctx.extra,
    ts: new Date().toISOString(),
  };

  console.warn(`[enrol-warn] ${JSON.stringify(payload)}`);
  return { correlationId };
}
