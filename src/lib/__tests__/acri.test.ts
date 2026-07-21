import { describe, expect, it } from "bun:test";
import {
  computeAcri,
  acriOverall,
  readinessBand,
  acriGapMap,
  validateTraitCoverage,
  recommendedTracks,
} from "../acri";
import type { Trait, ArchetypeId } from "@/data/careerEngineQuestions";

const ALL_TRAITS: Trait[] = [
  "detail",
  "logic",
  "language",
  "screen",
  "patient",
  "data",
  "writing",
  "sales",
  "compliance",
  "tech",
  "lab",
  "empathy",
  "pressure",
];

describe("computeAcri", () => {
  it("returns 5 dimensions, all in 0-100 range", () => {
    const p = computeAcri({ detail: 8, logic: 6, language: 4 });
    const dims = ["operational", "communication", "documentation", "workflow", "domain"] as const;
    for (const d of dims) {
      expect(p[d]).toBeGreaterThanOrEqual(0);
      expect(p[d]).toBeLessThanOrEqual(100);
    }
  });

  it("returns all zeros when every trait is zero", () => {
    const p = computeAcri(
      Object.fromEntries(ALL_TRAITS.map((t) => [t, 0])) as Record<Trait, number>,
    );
    expect(acriOverall(p)).toBe(0);
  });

  it("returns all zeros when no traits provided", () => {
    const p = computeAcri({});
    expect(acriOverall(p)).toBe(0);
  });

  it("clamps negative trait scores to 0", () => {
    const p = computeAcri({ detail: -5, logic: -10 });
    expect(acriOverall(p)).toBe(0);
  });

  it("documentation dominates when detail trait is highest", () => {
    const p = computeAcri({ detail: 10, logic: 1, language: 1 });
    expect(p.documentation).toBeGreaterThan(p.communication);
    expect(p.documentation).toBeGreaterThan(p.workflow);
  });

  it("communication dominates when language + sales + empathy are high", () => {
    const p = computeAcri({ language: 8, sales: 8, empathy: 8 });
    expect(p.communication).toBeGreaterThanOrEqual(p.documentation);
    expect(p.communication).toBeGreaterThanOrEqual(p.workflow);
  });

  it("is deterministic for the same input (snapshot stability)", () => {
    const a = computeAcri({ detail: 5, logic: 5, data: 3, language: 2 });
    const b = computeAcri({ detail: 5, logic: 5, data: 3, language: 2 });
    expect(a).toEqual(b);
  });
});

describe("acriOverall", () => {
  it("averages the five dimensions", () => {
    const v = acriOverall({
      operational: 80,
      communication: 60,
      documentation: 40,
      workflow: 20,
      domain: 0,
    });
    expect(v).toBe(40);
  });

  it("rounds to integer", () => {
    const v = acriOverall({
      operational: 33,
      communication: 33,
      documentation: 33,
      workflow: 33,
      domain: 33,
    });
    expect(Number.isInteger(v)).toBe(true);
  });
});

describe("readinessBand", () => {
  it("returns industry_ready at 70+", () => {
    expect(readinessBand(70).id).toBe("industry_ready");
    expect(readinessBand(95).id).toBe("industry_ready");
  });
  it("returns developing in 45-69", () => {
    expect(readinessBand(45).id).toBe("developing");
    expect(readinessBand(69).id).toBe("developing");
  });
  it("returns foundation below 45", () => {
    expect(readinessBand(0).id).toBe("foundation");
    expect(readinessBand(44).id).toBe("foundation");
  });
  it("each band has label, sub, tone", () => {
    for (const v of [10, 50, 80]) {
      const b = readinessBand(v);
      expect(b.label.length).toBeGreaterThan(0);
      expect(b.sub.length).toBeGreaterThan(0);
      expect(b.tone.length).toBeGreaterThan(0);
    }
  });
});

describe("acriGapMap", () => {
  it("returns the two lowest dimensions in ascending order", () => {
    const gaps = acriGapMap({
      operational: 90,
      communication: 30,
      documentation: 50,
      workflow: 10,
      domain: 70,
    });
    expect(gaps).toHaveLength(2);
    expect(gaps[0].id).toBe("workflow");
    expect(gaps[1].id).toBe("communication");
    expect(gaps[0].score).toBeLessThanOrEqual(gaps[1].score);
  });

  it("each gap entry has id, label, score", () => {
    const gaps = acriGapMap({
      operational: 1,
      communication: 2,
      documentation: 3,
      workflow: 4,
      domain: 5,
    });
    for (const g of gaps) {
      expect(typeof g.id).toBe("string");
      expect(typeof g.label).toBe("string");
      expect(typeof g.score).toBe("number");
    }
  });
});

describe("validateTraitCoverage", () => {
  it("every Trait has a TRAIT_TO_ACRI entry (no missing traits)", () => {
    const missing = validateTraitCoverage(ALL_TRAITS);
    expect(missing).toEqual([]);
  });
});

describe("computeAcri snapshot lock", () => {
  it("freezes the canonical PV-shaped profile", () => {
    const p = computeAcri({ detail: 10, compliance: 8, writing: 6, language: 5 });
    // If TRAIT_TO_ACRI weights change, this test fails loudly.
    expect(p).toEqual({
      operational: 17,
      communication: 27,
      documentation: 100,
      workflow: 0,
      domain: 18,
    });
  });
});

describe("readinessBand boundaries", () => {
  it("44 → foundation, 45 → developing", () => {
    expect(readinessBand(44).id).toBe("foundation");
    expect(readinessBand(45).id).toBe("developing");
  });
  it("69 → developing, 70 → industry_ready", () => {
    expect(readinessBand(69).id).toBe("developing");
    expect(readinessBand(70).id).toBe("industry_ready");
  });
});

describe("acriGapMap tie-break", () => {
  it("returns 2 entries with stable ordering when scores tie", () => {
    const gaps = acriGapMap({
      operational: 10,
      communication: 10,
      documentation: 10,
      workflow: 10,
      domain: 10,
    });
    expect(gaps).toHaveLength(2);
    expect(gaps[0].score).toBe(gaps[1].score);
  });
});

describe("recommendedTracks", () => {
  const profile = computeAcri({ detail: 8, logic: 6 });

  it("always includes PV as the flagship first", () => {
    const archetypes: ArchetypeId[] = [
      "coder",
      "sentinel",
      "data_storyteller",
      "regulatory_architect",
      "operator",
      "ai_builder",
    ];
    for (const a of archetypes) {
      const t = recommendedTracks(a, profile);
      expect(t[0].slug).toBe("pharmacovigilance");
      expect(t[0].tag).toBe("flagship");
    }
  });

  it("dedupes when archetype is sentinel (PV only)", () => {
    const t = recommendedTracks("sentinel", profile);
    expect(t).toHaveLength(1);
    expect(t[0].slug).toBe("pharmacovigilance");
  });

  it("maps each non-sentinel archetype to its secondary slug", () => {
    const cases: Array<[ArchetypeId, string]> = [
      ["coder", "ai-intelligence"],
      ["data_storyteller", "clinical-data-management"],
      ["regulatory_architect", "regulatory-affairs"],
      ["operator", "medical-coding"],
      ["ai_builder", "ai-intelligence"],
    ];
    for (const [a, slug] of cases) {
      const t = recommendedTracks(a, profile);
      expect(t).toHaveLength(2);
      expect(t[1].slug).toBe(slug);
      expect(t[1].tag).toBe("secondary");
    }
  });
});
