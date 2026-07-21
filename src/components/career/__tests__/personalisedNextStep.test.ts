import { describe, it, expect, mock } from "bun:test";
import { computeCountdown, seatsLeft, startCountdownTicker } from "../PersonalisedNextStep";

describe("computeCountdown", () => {
  it("breaks ms delta into days/hours/minutes", () => {
    const now = Date.parse("2026-06-01T00:00:00Z");
    const target = "2026-06-04T05:30:00Z"; // +3d 5h 30m
    expect(computeCountdown(target, now)).toEqual({
      days: 3,
      hours: 5,
      minutes: 30,
      expired: false,
    });
  });

  it("clamps to zero and marks expired when target is in the past", () => {
    const now = Date.parse("2026-06-10T00:00:00Z");
    const target = "2026-06-01T00:00:00Z";
    expect(computeCountdown(target, now)).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      expired: true,
    });
  });

  it("renders the final hour correctly", () => {
    const now = Date.parse("2026-06-01T23:15:00Z");
    const target = "2026-06-02T00:00:00Z"; // 45m out
    expect(computeCountdown(target, now)).toEqual({
      days: 0,
      hours: 0,
      minutes: 45,
      expired: false,
    });
  });
});

describe("seatsLeft", () => {
  it("holds at 24 when more than 30 days remain", () => {
    const now = Date.parse("2026-06-01T00:00:00Z");
    expect(seatsLeft("2026-08-01T00:00:00Z", now)).toBe(24);
  });

  it("drains as the deadline approaches", () => {
    const now = Date.parse("2026-06-01T00:00:00Z");
    const at10Days = seatsLeft("2026-06-11T00:00:00Z", now);
    const at3Days = seatsLeft("2026-06-04T00:00:00Z", now);
    expect(at10Days).toBeLessThan(24);
    expect(at3Days).toBeLessThan(at10Days);
  });

  it("never drops below the floor of 2", () => {
    const now = Date.parse("2026-06-01T00:00:00Z");
    expect(seatsLeft("2026-05-01T00:00:00Z", now)).toBe(2); // past
    expect(seatsLeft("2026-06-01T00:00:00Z", now)).toBe(2); // today
  });
});

describe("startCountdownTicker", () => {
  it("does NOT start an interval when reduced motion is enabled", () => {
    const onTick = mock(() => {});
    const cleanup = startCountdownTicker(onTick, /* reduced */ true, 1);
    expect(cleanup).toBeUndefined();
    // Even after waiting, no tick should have fired.
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        expect(onTick).not.toHaveBeenCalled();
        resolve();
      }, 25);
    });
  });

  it("starts an interval when reduced motion is disabled and stops on cleanup", () => {
    const onTick = mock(() => {});
    const cleanup = startCountdownTicker(onTick, /* reduced */ false, 5);
    expect(typeof cleanup).toBe("function");
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const callsBeforeCleanup = onTick.mock.calls.length;
        expect(callsBeforeCleanup).toBeGreaterThan(0);
        cleanup!();
        setTimeout(() => {
          // No additional ticks after cleanup.
          expect(onTick.mock.calls.length).toBe(callsBeforeCleanup);
          resolve();
        }, 25);
      }, 25);
    });
  });
});
