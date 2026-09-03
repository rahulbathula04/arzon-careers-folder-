import js from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", ".output", ".vinxi"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      // Re-enable critical rules for code quality
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": ["warn"],
      "@typescript-eslint/ban-ts-comment": "warn",
      "@typescript-eslint/no-empty-object-type": "warn",
      "@typescript-eslint/no-unused-expressions": "warn",
      "no-unused-expressions": "warn",
      "react-hooks/rules-of-hooks": "error", // CRITICAL: React hook violations cause runtime errors
      "prefer-const": "warn",
      "no-useless-escape": "warn",
      "no-empty": "warn",
      "no-empty-pattern": "warn",
      "prettier/prettier": "warn",
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    ignores: ["src/server/**", "src/lib/**/*.functions.ts"],
    rules: {
      "no-restricted-imports": [
        "warn",
        {
          patterns: [
            {
              group: ["@/server/*.functions", "@/server/*.functions.*", "**/server/*.functions"],
              message:
                "Client-imported server functions must live in src/lib/*.functions.ts, not src/server/. Move the file and import from @/lib/<name>.functions.",
            },
          ],
        },
      ],
    },
  },
  {
    // Ban raw Tailwind white utilities in gated trees. These get silently
    // rewritten by the global tone-light safety net and collapse to navy ink.
    // Fix with `node scripts/codemod-raw-white.mjs` or add
    // `// @allow-raw-white` on the same line.
    files: [
      "src/components/landing/**/*.{ts,tsx}",
      "src/components/admin/**/*.{ts,tsx}",
      "src/routes/admin*.tsx",
      "src/routes/internships.*.tsx",
    ],
    rules: {
      "no-restricted-syntax": [
        "warn",
        {
          selector:
            "Literal[value=/\\b(?:text-white(?:\\/\\d{1,3})?|bg-white\\/\\d{1,3}|border-white\\/\\d{1,3})\\b/]",
          message:
            "Raw text-white/bg-white/border-white utilities are banned here - use text-slate-50/100/200/300 or add // @allow-raw-white on the line. Run `node scripts/codemod-raw-white.mjs` to auto-fix.",
        },
        {
          selector:
            "TemplateElement[value.raw=/\\b(?:text-white(?:\\/\\d{1,3})?|bg-white\\/\\d{1,3}|border-white\\/\\d{1,3})\\b/]",
          message:
            "Raw text-white/bg-white/border-white utilities are banned here - use text-slate-50/100/200/300 or add // @allow-raw-white on the line.",
        },
      ],
    },
  },
  eslintPluginPrettier,
);
