import { describe, it, expect, beforeEach, mock } from "bun:test";

// Mock the track module BEFORE importing abTest.
let mockAnon = "anon-A";
mock.module("@/lib/track", () => ({
  getAnonId: () => mockAnon,
  track: () => {},
}));

const { assignVariant, getAssignedVariant, EXPERIMENTS } = await import("@/lib/abTest");

function freshSessionStorage() {
  const store = new Map<string, string>();
  return {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
    removeItem: (k: string) => void store.delete(k),
    clear: () => store.clear(),
    key: (i: number) => [...store.keys()][i] ?? null,
    get length() {
      return store.size;
    },
  } as Storage;
}

describe("assignVariant", () => {
  beforeEach(() => {
    // Reset per-tab caches by clobbering window.sessionStorage; assignVariant
    // also memoizes in-module, so we use a fresh experiment name per test
    // when we need a clean assignment.
    (globalThis as unknown as { window: Window }).window = {
      sessionStorage: freshSessionStorage(),
      location: { href: "http://localhost/" } as Location,
    } as unknown as Window;
  });

  it("is stable across 1000 calls for the same anon_id", () => {
    mockAnon = "user-stable";
    const exp = "stable_test_" + Math.random();
    const first = assignVariant(exp, ["a", "b", "c"] as const);
    for (let i = 0; i < 1000; i++) {
      expect(assignVariant(exp, ["a", "b", "c"] as const)).toBe(first);
    }
  });

  it("distributes ~evenly across many anon_ids (±5pp tolerance)", () => {
    const counts: Record<string, number> = { a: 0, b: 0, c: 0 };
    const N = 3000;
    for (let i = 0; i < N; i++) {
      mockAnon = `user-${i}`;
      // Clear module-level cache by using unique experiment key per anon.
      const exp = `dist_${i}`;
      const v = assignVariant(exp, ["a", "b", "c"] as const);
      counts[v]++;
    }
    for (const k of ["a", "b", "c"]) {
      const frac = counts[k] / N;
      expect(frac).toBeGreaterThan(0.28);
      expect(frac).toBeLessThan(0.38);
    }
  });

  it("getAssignedVariant returns the same variant assignVariant produced", () => {
    mockAnon = "user-mutex";
    const exp = "mutex_" + Math.random();
    const v = assignVariant(exp, EXPERIMENTS.sticky_cta_placement);
    expect(getAssignedVariant(exp)).toBe(v);
  });
});
