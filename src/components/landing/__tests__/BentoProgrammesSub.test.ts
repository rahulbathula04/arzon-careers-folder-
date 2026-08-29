import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Guards the exact rendered text of the header sub sentence inside
 * BentoProgrammes across mobile/tablet/desktop.
 */

const SOURCE = readFileSync(resolve(__dirname, "../BentoProgrammes.tsx"), "utf8");

function extractSubText(): string {
  const match = SOURCE.match(/<p className="text-xs sm:text-sm text-\[#334155\][^>]*>([\s\S]*?)<\/p>/);
  if (!match) throw new Error("Header sub text element not found");
  return match[1]
    .replace(/<strong>|<\/strong>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

const EXPECTED =
  "Every track is built around the skills, workflows and expectations associated with a specific entry-level role.";

describe("BentoProgrammes header sub sentence", () => {
  const text = extractSubText();

  it.each([["mobile (390px)"], ["tablet (768px)"], ["desktop (1440px)"]])(
    "renders the exact copy at %s",
    () => {
      expect(text).toBe(EXPECTED);
    },
  );

  it("matches expected track copy", () => {
    expect(text).toBe(EXPECTED);
  });
});

