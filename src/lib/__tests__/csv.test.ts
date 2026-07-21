import { describe, it, expect } from "bun:test";
import { rowsToCsv } from "@/lib/csv";

describe("rowsToCsv formula-injection guard", () => {
  it("prefixes cells starting with dangerous chars", () => {
    const csv = rowsToCsv(
      [{ a: "=1+1", b: "+cmd|' /c calc'!A0", c: "-2", d: "@SUM(A1)", e: "safe" }],
      [
        { key: "a", header: "A" },
        { key: "b", header: "B" },
        { key: "c", header: "C" },
        { key: "d", header: "D" },
        { key: "e", header: "E" },
      ],
    );
    expect(csv).toContain('"\'=1+1"');
    expect(csv).toContain('"\'+cmd"');
    expect(csv).toContain('"\'-2"');
    expect(csv).toContain('"\'@SUM(A1)"');
    expect(csv).toContain('"safe"');
  });

  it("leaves normal cells untouched and quotes embedded quotes", () => {
    const csv = rowsToCsv(
      [{ name: 'He said "hi"', n: 42 }],
      [
        { key: "name", header: "Name" },
        { key: "n", header: "N" },
      ],
    );
    expect(csv).toContain(`"He said ""hi"""`);
    expect(csv).toContain(`"42"`);
  });
});
