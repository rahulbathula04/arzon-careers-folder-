import { describe, expect, it, mock } from "bun:test";
import { computeBackoffDelay, isNetworkError, retryWithBackoff } from "../retryWithBackoff";

const opts = {
  maxAttempts: 4,
  baseDelayMs: 100,
  maxDelayMs: 5_000,
  maxJitterMs: 200,
  // deterministic for tests
  random: () => 0.5,
  sleep: () => Promise.resolve(),
};

describe("isNetworkError", () => {
  it("treats 'Failed to fetch' TypeError as network error", () => {
    expect(isNetworkError(new TypeError("Failed to fetch"))).toBe(true);
  });

  it("treats Safari 'Load failed' TypeError as network error", () => {
    expect(isNetworkError(new TypeError("Load failed"))).toBe(true);
  });

  it("treats AbortError as network error", () => {
    const err = Object.assign(new Error("aborted"), { name: "AbortError" });
    expect(isNetworkError(err)).toBe(true);
  });

  it("treats undici socket / ECONN* codes as network errors", () => {
    expect(isNetworkError(Object.assign(new Error(), { code: "ECONNRESET" }))).toBe(true);
    expect(isNetworkError(Object.assign(new Error(), { code: "ENOTFOUND" }))).toBe(true);
    expect(isNetworkError(Object.assign(new Error(), { code: "UND_ERR_SOCKET" }))).toBe(true);
  });

  it("does NOT treat HTTP 400/500 errors as retryable", () => {
    expect(isNetworkError(new Error("HTTP 400 Bad Request"))).toBe(false);
    expect(isNetworkError(new Error("HTTP 500"))).toBe(false);
  });

  it("does NOT treat unknown errors as retryable", () => {
    expect(isNetworkError(null)).toBe(false);
    expect(isNetworkError(undefined)).toBe(false);
    expect(isNetworkError("oops")).toBe(false);
    expect(isNetworkError(new RangeError("nope"))).toBe(false);
  });
});

describe("computeBackoffDelay", () => {
  it("doubles base delay per retry index", () => {
    const d0 = computeBackoffDelay(0, { ...opts, maxJitterMs: 0 });
    const d1 = computeBackoffDelay(1, { ...opts, maxJitterMs: 0 });
    const d2 = computeBackoffDelay(2, { ...opts, maxJitterMs: 0 });
    expect(d0).toBe(100);
    expect(d1).toBe(200);
    expect(d2).toBe(400);
  });

  it("caps at maxDelayMs before jitter", () => {
    const d = computeBackoffDelay(20, { ...opts, maxJitterMs: 0, maxDelayMs: 1_000 });
    expect(d).toBe(1_000);
  });

  it("adds jitter bounded by maxJitterMs", () => {
    const d = computeBackoffDelay(0, { ...opts, random: () => 1 });
    expect(d).toBe(100 + 200); // base + max jitter
  });

  it("never exceeds maxDelayMs + maxJitterMs", () => {
    const d = computeBackoffDelay(50, { ...opts, random: () => 1 });
    expect(d).toBeLessThanOrEqual(opts.maxDelayMs + opts.maxJitterMs);
  });
});

describe("retryWithBackoff", () => {
  it("returns ok on first success without retrying", async () => {
    const op = mock(async () => "done");
    const onAttempt = mock(() => {});
    const res = await retryWithBackoff(op, { ...opts, onAttempt });
    expect(res.ok).toBe(true);
    expect(res.value).toBe("done");
    expect(res.attempts).toBe(1);
    expect(op).toHaveBeenCalledTimes(1);
    expect(onAttempt).toHaveBeenCalledTimes(1);
  });

  it("retries on network errors and eventually succeeds", async () => {
    let calls = 0;
    const op = async () => {
      calls++;
      if (calls < 3) throw new TypeError("Failed to fetch");
      return "ok";
    };
    const res = await retryWithBackoff(op, opts);
    expect(res.ok).toBe(true);
    expect(res.attempts).toBe(3);
    expect(res.value).toBe("ok");
  });

  it("does NOT retry on non-network errors (prevents duplicate analytics)", async () => {
    const op = mock(async () => {
      throw new Error("HTTP 400");
    });
    const res = await retryWithBackoff(op, opts);
    expect(res.ok).toBe(false);
    expect(res.attempts).toBe(1);
    expect(op).toHaveBeenCalledTimes(1);
  });

  it("stops after maxAttempts on persistent network errors", async () => {
    const op = mock(async () => {
      throw new TypeError("Failed to fetch");
    });
    const res = await retryWithBackoff(op, { ...opts, maxAttempts: 3 });
    expect(res.ok).toBe(false);
    expect(res.attempts).toBe(3);
    expect(op).toHaveBeenCalledTimes(3);
  });

  it("uses exponential backoff with jitter for sleep durations", async () => {
    const sleeps: number[] = [];
    const op = async () => {
      throw new TypeError("Failed to fetch");
    };
    await retryWithBackoff(op, {
      ...opts,
      maxAttempts: 4,
      sleep: (ms) => {
        sleeps.push(ms);
        return Promise.resolve();
      },
      random: () => 0.5, // jitter = 0.5 * 200 = 100
    });
    // After attempts 1,2,3 we sleep 3 times (no sleep after final attempt).
    expect(sleeps).toEqual([100 + 100, 200 + 100, 400 + 100]);
  });

  it("does not sleep after the final attempt", async () => {
    const sleeps: number[] = [];
    const op = async () => {
      throw new TypeError("Failed to fetch");
    };
    await retryWithBackoff(op, {
      ...opts,
      maxAttempts: 2,
      sleep: (ms) => {
        sleeps.push(ms);
        return Promise.resolve();
      },
    });
    expect(sleeps).toHaveLength(1);
  });

  it("never throws - always resolves with a result", async () => {
    const op = async () => {
      throw new Error("kaboom");
    };
    await expect(retryWithBackoff(op, opts)).resolves.toMatchObject({ ok: false });
  });

  it("respects a custom isRetryable predicate", async () => {
    let calls = 0;
    const op = async () => {
      calls++;
      if (calls < 2) throw new Error("HTTP 503");
      return "recovered";
    };
    const res = await retryWithBackoff(op, {
      ...opts,
      isRetryable: (err) => err instanceof Error && /5\d\d/.test(err.message),
    });
    expect(res.ok).toBe(true);
    expect(res.attempts).toBe(2);
  });
});
