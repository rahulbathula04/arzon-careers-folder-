import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Guards the exact rendered text of the SectionHeader `sub` inside
 * BentoProgrammes across mobile/tablet/desktop. The DOM text is viewport-
 * independent (CSS only affects wrapping), so all three breakpoints share the
 * same expected string. Wrapping behavior is verified by the Playwright
 * checks under /tmp/browser/punct/.
 *
 * The sentence must:
 *  - end the 2026 clause with "2026." (period tight against digits)
 *  - NOT contain a NBSP or any whitespace immediately before that period
 *  - be followed by exactly one regular space before "Take"
 */

const SOURCE = readFileSync(resolve(__dirname, "../BentoProgrammes.tsx"), "utf8");

/** Extract the JSX `sub={<>…</>}` literal and normalize whitespace like React. */
function extractSubText(): string {
  const match = SOURCE.match(/sub=\{\s*<>([\s\S]*?)<\/>\s*\}/);
  if (!match) throw new Error("sub={<>...</>} literal not found");
  return match[1]
    .replace(/<strong>|<\/strong>/g, "")
    .replace(/\{"\s"\}/g, " ") // {" "} → space
    .replace(/\s+/g, " ") // collapse JSX whitespace like React
    .trim();
}

const EXPECTED =
  "Each track trains you for a specific role recruiters in India hire for, " +
  "with the tools and workflows from real JDs. Engineering, Agri-tech and " +
  "Business tracks roll out across 2026. Take the Readiness Test to get matched.";

describe("BentoProgrammes SectionHeader sub sentence", () => {
  const text = extractSubText();

  it.each([["mobile (390px)"], ["tablet (768px)"], ["desktop (1440px)"]])(
    "renders the exact copy at %s",
    () => {
      expect(text).toBe(EXPECTED);
    },
  );

  it("has no NBSP or stray whitespace before the period after 2026", () => {
    expect(text).not.toMatch(/2026[\s\u00A0]+\./);
    expect(text).toMatch(/2026\. Take/);
  });

  it("matches inline snapshot", () => {
    expect(text).toMatchInlineSnapshot(
      `"Each track trains you for a specific role recruiters in India hire for, with the tools and workflows from real JDs. Engineering, Agri-tech and Business tracks roll out across 2026. Take the Readiness Test to get matched."`,
    );
  });
});
