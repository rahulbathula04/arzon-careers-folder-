/**
 * Retry an async operation only on transient network errors, with capped
 * exponential backoff and jitter. Designed for fire-and-forget analytics:
 * succeeds silently, swallows non-retryable errors, and never throws.
 *
 * Why "network errors only": retrying on logical errors (e.g. 400 Bad
 * Request) just creates duplicate analytics events without ever succeeding.
 * We only retry when the request never actually reached the server.
 *
 * The classifier is exported so the helper can be unit-tested deterministically.
 */

export interface RetryOptions {
  maxAttempts: number; // total attempts including the first call
  baseDelayMs: number; // delay for the first retry
  maxDelayMs: number; // ceiling for any single delay
  maxJitterMs: number; // upper bound for the random jitter added per retry
  /** Test seam - defaults to Math.random. */
  random?: () => number;
  /** Test seam - defaults to setTimeout. Returns a cancel handle (unused). */
  sleep?: (ms: number) => Promise<void>;
  /** Override the classifier (e.g. to retry on 5xx as well). */
  isRetryable?: (err: unknown) => boolean;
  /** Optional observer for tests / debugging. */
  onAttempt?: (info: {
    attempt: number;
    error?: unknown;
    willRetry: boolean;
    delayMs: number;
  }) => void;
}

/**
 * Returns true when the error indicates the request never reached the server
 * (DNS failure, offline, fetch aborted, connection reset). Returns false for
 * any HTTP-level failure or unknown error so we don't duplicate analytics.
 */
export function isNetworkError(err: unknown): boolean {
  if (!err) return false;
  // The DOM throws a TypeError ("Failed to fetch", "Load failed", "NetworkError when attempting to fetch resource")
  // when the request never makes it to the server.
  if (err instanceof TypeError) {
    const msg = err.message?.toLowerCase() ?? "";
    return (
      msg.includes("failed to fetch") ||
      msg.includes("load failed") ||
      msg.includes("network") ||
      msg.includes("fetch") ||
      msg === "" // some browsers throw an empty-message TypeError on offline
    );
  }
  // Node / undici style.
  const code = (err as { code?: string; name?: string }).code;
  if (
    code &&
    [
      "ECONNRESET",
      "ECONNREFUSED",
      "ENOTFOUND",
      "EAI_AGAIN",
      "ETIMEDOUT",
      "UND_ERR_SOCKET",
    ].includes(code)
  ) {
    return true;
  }
  // AbortError from a fetch timeout is treated as transient.
  const name = (err as { name?: string }).name;
  if (name === "AbortError") return true;
  return false;
}

const defaultSleep = (ms: number) =>
  new Promise<void>((resolve) => {
    if (typeof setTimeout === "undefined") {
      resolve();
      return;
    }
    setTimeout(resolve, ms);
  });

/**
 * Compute the delay for the Nth retry with full jitter. Pure function - used
 * directly by tests.
 */
export function computeBackoffDelay(
  retryIndex: number, // 0 for first retry, 1 for second, etc.
  opts: Pick<RetryOptions, "baseDelayMs" | "maxDelayMs" | "maxJitterMs"> & {
    random?: () => number;
  },
): number {
  const exp = opts.baseDelayMs * Math.pow(2, retryIndex);
  const capped = Math.min(exp, opts.maxDelayMs);
  const jitter = (opts.random ?? Math.random)() * opts.maxJitterMs;
  return Math.min(capped + jitter, opts.maxDelayMs + opts.maxJitterMs);
}

export interface RetryResult<T> {
  ok: boolean;
  value?: T;
  error?: unknown;
  attempts: number;
}

/**
 * Serialise an unknown error into a plain object safe for JSON logging.
 * Captures name, message, code, status, and a trimmed stack so production
 * logs (which only have the bundled file) remain mappable to original
 * sources via the published source maps.
 */
export function serializeError(err: unknown): Record<string, unknown> {
  if (!err) return { value: err };
  if (err instanceof Error) {
    const anyErr = err as Error & { code?: string; status?: number; cause?: unknown };
    return {
      name: err.name,
      message: err.message,
      code: anyErr.code,
      status: anyErr.status,
      stack: err.stack?.split("\n").slice(0, 8).join("\n"),
      cause: anyErr.cause ? String(anyErr.cause) : undefined,
    };
  }
  if (typeof err === "object") {
    try {
      return { value: JSON.parse(JSON.stringify(err)) };
    } catch {
      return { value: String(err) };
    }
  }
  return { value: String(err) };
}

/** Default structured logger - uses console.warn/error with a stable prefix. */
function defaultLog(level: "warn" | "error", payload: Record<string, unknown>) {
  if (typeof console === "undefined") return;
  const line = { tag: "retryWithBackoff", ts: new Date().toISOString(), ...payload };
  if (level === "error") console.error("[retryWithBackoff]", line);
  else console.warn("[retryWithBackoff]", line);
}

/**
 * Run `op` up to `maxAttempts` times. Retries only when `isRetryable(err)`
 * returns true (defaults to network-only). Always resolves - never throws -
 * so callers can use it fire-and-forget without a try/catch wrapper.
 */
export async function retryWithBackoff<T>(
  op: () => Promise<T>,
  opts: RetryOptions & {
    /** Human label used in structured logs (e.g. analytics event name). */
    label?: string;
    /** Override the structured logger; defaults to console.warn/error. */
    log?: (level: "warn" | "error", payload: Record<string, unknown>) => void;
  },
): Promise<RetryResult<T>> {
  const sleep = opts.sleep ?? defaultSleep;
  const isRetryable = opts.isRetryable ?? isNetworkError;
  const log = opts.log ?? defaultLog;
  const label = opts.label ?? "anonymous";
  let lastError: unknown;
  let attempt = 0;
  for (attempt = 1; attempt <= opts.maxAttempts; attempt++) {
    try {
      const value = await op();
      opts.onAttempt?.({ attempt, willRetry: false, delayMs: 0 });
      if (attempt > 1) {
        log("warn", { label, msg: "succeeded after retry", attempt });
      }
      return { ok: true, value, attempts: attempt };
    } catch (err) {
      lastError = err;
      const hasMore = attempt < opts.maxAttempts;
      const retry = hasMore && isRetryable(err);
      const delayMs = retry ? computeBackoffDelay(attempt - 1, opts) : 0;
      opts.onAttempt?.({ attempt, error: err, willRetry: retry, delayMs });
      log(retry ? "warn" : "error", {
        label,
        msg: retry ? "transient failure, retrying" : "giving up",
        attempt,
        maxAttempts: opts.maxAttempts,
        delayMs,
        retryable: isRetryable(err),
        error: serializeError(err),
      });
      if (!retry) break;
      await sleep(delayMs);
    }
  }
  return { ok: false, error: lastError, attempts: attempt };
}
