import { describe, it, expect } from "vitest";
import { bandForScore } from "../ScoreChip";

describe("bandForScore", () => {
  it("maps ranges to bands so the ScoreChip color language is stable", () => {
    expect(bandForScore(90)).toBe("strong");
    expect(bandForScore(78)).toBe("strong");
    expect(bandForScore(60)).toBe("recommended");
    expect(bandForScore(40)).toBe("watch");
    expect(bandForScore(10)).toBe("notfit");
  });
});
