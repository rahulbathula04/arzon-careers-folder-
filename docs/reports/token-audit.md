# Token audit report

_Generated 2026-10-13T17:08:42.288Z_

- **Total raw palette literals:** 7225
- **Files affected:** 408
- **Scope:** `src/**` (excluding `styles.css`, `data/trackTheme`, generated files, and lines annotated `@allow-raw-palette`).

## How to fix

Replace hex/rgb literals with a semantic token from `src/styles.css` (`--brand`, `--ink`, `--surface-1`, `--flag-in-*`, etc.) or a track-theme accessor from `@/data/trackTheme`. When a raw value is genuinely required (e.g. the tricolour flag glyph), add a trailing comment `/* @allow-raw-palette <reason> */` on the same line.

## Findings

### `src\styles.css` - 1292

| Line | Kind | Value | Context |
|---:|---|---|---|
| 52 | hex | `#000000` | `--color-pitch-black: #000000;` |
| 53 | hex | `#05070e` | `--color-surface-dark: #05070e;` |
| 55 | rgba | `rgba(59, 130, 246, 0.14)` | `--color-accent-glow: rgba(59, 130, 246, 0.14);` |
| 56 | rgba | `rgba(0, 0, 0, 0.08)` | `--color-border-subtle: rgba(0, 0, 0, 0.08);` |
| 60 | hex | `#1557D6` | `--arzon-blue-700: #1557D6;` |
| 61 | hex | `#071A4A` | `--arzon-ink-strong: #071A4A;` |
| 65 | rgba | `rgba(255, 255, 255, 0.9)` | `background-color: rgba(255, 255, 255, 0.9);` |
| 68 | rgba | `rgba(0, 0, 0, 0.08)` | `border: 1px solid rgba(0, 0, 0, 0.08);` |
| 69 | rgba | `rgba(0, 0, 0, 0.04)` | `box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);` |
| 73 | rgba | `rgba(138, 109, 31, 0.2)` | `box-shadow: 0 0 25px rgba(138, 109, 31, 0.2);` |
| 77 | rgba | `rgba(16, 185, 129, 0.2)` | `box-shadow: 0 0 25px rgba(16, 185, 129, 0.2);` |
| 84 | hex | `#FFFFFF` | `0 0 0 2px #FFFFFF,` |
| 85 | hex | `#1B3F8B` | `0 0 0 4px #1B3F8B;` |
| 97 | hex | `#1A1A1A` | `color: #1A1A1A;` |
| 104 | hex | `#94a3b8` | `color: #94a3b8;` |
| 123 | hex | `#FFFFFF` | `box-shadow: 0 0 0px 1000px #FFFFFF inset !important;` |
| 132 | hex | `#ffffff` | `color: #ffffff;` |
| 133 | hex | `#0d1322` | `background-color: #0d1322;` |
| 134 | hex | `#38bdf8` | `caret-color: #38bdf8;` |
| 139 | hex | `#94a3b8` | `color: #94a3b8;` |
| 154 | hex | `#ffffff` | `-webkit-text-fill-color: #ffffff !important;` |
| 155 | hex | `#0d1322` | `-webkit-box-shadow: 0 0 0px 1000px #0d1322 inset !important;` |
| 156 | hex | `#0d1322` | `box-shadow: 0 0 0px 1000px #0d1322 inset !important;` |
| 158 | hex | `#ffffff` | `color: #ffffff !important;` |
| 163 | hex | `#0284c7` | `background-color: #0284c7 !important;` |
| 164 | hex | `#ffffff` | `color: #ffffff !important;` |
| 169 | rgba | `rgba(255, 255, 255, 0.72)` | `color: rgba(255, 255, 255, 0.72) !important;` |
| 174 | hex | `#94a3b8` | `color: #94a3b8 !important;` |
| 182 | hex | `#e4ebfb` | `background: radial-gradient(ellipse 1200px 800px at 50% -100px, #e4ebfb 0%, #ffffff 75%);` |
| 182 | hex | `#ffffff` | `background: radial-gradient(ellipse 1200px 800px at 50% -100px, #e4ebfb 0%, #ffffff 75%);` |
| 187 | hex | `#ffffff` | `background-color: #ffffff;` |
| 188 | hex | `#e2e8f0` | `border: 1px solid #e2e8f0;` |
| 191 | rgba | `rgba(21, 28, 46, 0.08)` | `0 10px 30px -10px rgba(21, 28, 46, 0.08),` |
| 192 | rgba | `rgba(21, 28, 46, 0.04)` | `0 2px 6px -2px rgba(21, 28, 46, 0.04);` |
| 196 | hex | `#f2f4f9` | `background-color: #f2f4f9;` |
| 198 | hex | `#e2e8f0` | `border: 1px solid #e2e8f0;` |
| 202 | hex | `#fdf6e2` | `background-color: #fdf6e2;` |
| 203 | hex | `#7c4a03` | `color: #7c4a03;` |
| 204 | hex | `#f7e4b2` | `border: 1px solid #f7e4b2;` |
| 208 | hex | `#f0a339` | `background: linear-gradient(90deg, #f0a339 0%, #c2410c 100%);` |
| 208 | hex | `#c2410c` | `background: linear-gradient(90deg, #f0a339 0%, #c2410c 100%);` |
| 212 | hex | `#1d4ed8` | `background-color: #1d4ed8;` |
| 213 | hex | `#ffffff` | `color: #ffffff;` |
| 218 | hex | `#1e40af` | `background-color: #1e40af;` |
| 232 | rgba | `rgba(255, 255, 255, 0.035)` | `linear-gradient(180deg, rgba(255, 255, 255, 0.035) 0%, rgba(255, 255, 255, 0.01) 100%),` |
| 232 | rgba | `rgba(255, 255, 255, 0.01)` | `linear-gradient(180deg, rgba(255, 255, 255, 0.035) 0%, rgba(255, 255, 255, 0.01) 100%),` |
| 233 | rgba | `rgba(10, 14, 25, 0.55)` | `rgba(10, 14, 25, 0.55);` |
| 234 | rgba | `rgba(255, 255, 255, 0.08)` | `border: 1px solid rgba(255, 255, 255, 0.08);` |
| 237 | rgba | `rgba(255, 255, 255, 0.05)` | `inset 0 1px 0 0 rgba(255, 255, 255, 0.05),` |
| 238 | rgba | `rgba(0, 0, 0, 0.35)` | `0 1px 0 0 rgba(0, 0, 0, 0.35),` |
| 239 | rgba | `rgba(0, 0, 0, 0.55)` | `0 20px 60px -30px rgba(0, 0, 0, 0.55);` |
| 244 | rgba | `rgba(255, 255, 255, 0.14)` | `border-color: rgba(255, 255, 255, 0.14);` |
| 246 | rgba | `rgba(255, 255, 255, 0.07)` | `inset 0 1px 0 0 rgba(255, 255, 255, 0.07),` |
| 247 | rgba | `rgba(0, 0, 0, 0.4)` | `0 1px 0 0 rgba(0, 0, 0, 0.4),` |
| 248 | rgba | `rgba(0, 0, 0, 0.6)` | `0 24px 70px -30px rgba(0, 0, 0, 0.6);` |
| 256 | rgba | `rgba(255, 255, 255, 0.05)` | `background: linear-gradient(180deg, rgba(255, 255, 255, 0.05), transparent 30%);` |
| 268 | rgba | `rgba(255, 255, 255, 0.1)` | `background: rgba(255, 255, 255, 0.1);` |
| 284 | rgba | `rgba(255, 255, 255, 0.85)` | `color: rgba(255, 255, 255, 0.85);` |
| 285 | rgba | `rgba(255, 255, 255, 0.04)` | `background: rgba(255, 255, 255, 0.04);` |
| 286 | rgba | `rgba(255, 255, 255, 0.12)` | `border: 1px solid rgba(255, 255, 255, 0.12);` |
| 296 | rgba | `rgba(255, 255, 255, 0.06)` | `border: 1px solid rgba(255, 255, 255, 0.06);` |
| 297 | rgba | `rgba(255, 255, 255, 0.015)` | `background: rgba(255, 255, 255, 0.015);` |
| 298 | rgba | `rgba(255, 255, 255, 0.6)` | `color: rgba(255, 255, 255, 0.6);` |
| 306 | rgba | `rgba(255, 255, 255, 0.9)` | `color: rgba(255, 255, 255, 0.9);` |
| 307 | rgba | `rgba(255, 255, 255, 0.14)` | `border-color: rgba(255, 255, 255, 0.14);` |
| 312 | hex | `#5eead4` | `background: color-mix(in oklab, var(--rail-accent, #5eead4) 8%, transparent);` |
| 313 | hex | `#5eead4` | `border-color: color-mix(in oklab, var(--rail-accent, #5eead4) 40%, transparent);` |
| 315 | hex | `#5eead4` | `0 0 0 1px color-mix(in oklab, var(--rail-accent, #5eead4) 25%, transparent),` |
| 316 | hex | `#5eead4` | `0 8px 24px -12px color-mix(in oklab, var(--rail-accent, #5eead4) 60%, transparent);` |
| 319 | rgba | `rgba(255, 255, 255, 0.75)` | `color: rgba(255, 255, 255, 0.75);` |
| 320 | rgba | `rgba(255, 255, 255, 0.1)` | `border-color: rgba(255, 255, 255, 0.1);` |
| 321 | rgba | `rgba(255, 255, 255, 0.025)` | `background: rgba(255, 255, 255, 0.025);` |
| 348 | hex | `#e5e7eb` | `border-color: #e5e7eb !important;` |
| 359 | rgba | `rgba(255, 255, 255, 0.03)` | `background: rgba(255, 255, 255, 0.03);` |
| 362 | rgba | `rgba(255, 255, 255, 0.08)` | `border: 1px solid rgba(255, 255, 255, 0.08);` |
| 363 | rgba | `rgba(0, 0, 0, 0.1)` | `box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);` |
| 367 | rgba | `rgba(255, 255, 255, 0.05)` | `background: linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%);` |
| 367 | rgba | `rgba(255, 255, 255, 0.01)` | `background: linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%);` |
| 370 | rgba | `rgba(255, 255, 255, 0.1)` | `border: 1px solid rgba(255, 255, 255, 0.1);` |
| 372 | rgba | `rgba(255, 255, 255, 0.05)` | `inset 0 1px 0 0 rgba(255, 255, 255, 0.05),` |
| 373 | rgba | `rgba(0, 0, 0, 0.3)` | `0 8px 32px 0 rgba(0, 0, 0, 0.3);` |
| 379 | rgba | `rgba(255, 255, 255, 0.07)` | `background: rgba(255, 255, 255, 0.07);` |
| 380 | rgba | `rgba(255, 255, 255, 0.2)` | `border-color: rgba(255, 255, 255, 0.2);` |
| 382 | rgba | `rgba(125, 211, 252, 0.15)` | `0 0 20px rgba(125, 211, 252, 0.15),` |
| 383 | rgba | `rgba(255, 255, 255, 0.1)` | `inset 0 1px 0 0 rgba(255, 255, 255, 0.1);` |
| 441 | hex | `#7fb0d8` | `/* Light-blue eyebrow used on dark navy surfaces (was #7fb0d8) */` |
| 442 | hex | `#7fb0d8` | `--color-eyebrow: #7fb0d8;` |
| 443 | hex | `#a9c9e6` | `--color-eyebrow-strong: #a9c9e6;` |
| 447 | hex | `#38bdf8` | `--color-accent-glow: #38bdf8;` |
| 451 | hex | `#03060d` | `--color-surface-dark: #03060d;` |
| 452 | hex | `#070b17` | `--color-surface-raised: #070b17;` |
| 453 | hex | `#050811` | `--color-surface-dim: #050811;` |
| 454 | hex | `#0a0f1e` | `--color-surface-ink: #0a0f1e;` |
| 455 | hex | `#06080d` | `--color-surface-abyss: #06080d;` |
| 456 | hex | `#1a1300` | `--color-gold-ink: #1a1300;` |
| 457 | hex | `#7fb0d8` | `--color-navy-sky: #7fb0d8;` |
| 458 | hex | `#3b6fa0` | `--color-nav-blue: #3b6fa0;` |
| 459 | hex | `#8ec5ff` | `--color-focus-accent: #8ec5ff;` |
| 460 | hex | `#dbe6f6` | `--color-edge: #dbe6f6;` |
| 470 | hex | `#0e1730` | `--color-navy-card: #0e1730;` |
| 477 | hex | `#dceaff` | `--color-cta-blue-wash: #dceaff;` |
| 481 | hex | `#0f1b3d` | `so the Footer / Nav don't inline `from-slate-900 via-[#0f1b3d]` etc. */` |
| 500 | hex | `#0f1b3d` | `Locked ramp: #0f1b3d deep navy → #1e3a5f mid navy → #3b6fa0 mid blue` |
| 500 | hex | `#1e3a5f` | `Locked ramp: #0f1b3d deep navy → #1e3a5f mid navy → #3b6fa0 mid blue` |
| 500 | hex | `#3b6fa0` | `Locked ramp: #0f1b3d deep navy → #1e3a5f mid navy → #3b6fa0 mid blue` |
| 501 | hex | `#e8edf3` | `→ #e8edf3 pale ice. Historical --teal-* / --navy-* / --mint-* tokens` |
| 504 | hex | `#0f1b3d` | `--navy: #0f1b3d; /* deep navy - hero shells */` |
| 505 | hex | `#1e3a5f` | `--navy-elevated: #1e3a5f; /* mid navy - cards */` |
| 512 | hex | `#5b8fc5` | `--teal: #5b8fc5; /* light mid-blue (chips, glows) */` |
| 513 | hex | `#2f5f8f` | `--teal-deep: #2f5f8f; /* primary CTA blue, AA on paper (5.65:1 on ice) */` |
| 514 | hex | `#1e3a5f` | `--teal-ink: #1e3a5f; /* eyebrow / link ink on light */` |
| 515 | hex | `#e8edf3` | `--teal-soft: #e8edf3; /* pale ice wash */` |
| 519 | hex | `#0f1b3d` | `--color-career-navy: #0f1b3d;` |
| 520 | hex | `#1e3a5f` | `--color-career-mid: #1e3a5f;` |
| 521 | hex | `#2f5f8f` | `--color-career-blue: #2f5f8f;` |
| 522 | hex | `#e8edf3` | `--color-career-ice: #e8edf3;` |
| 525 | hex | `#ffffff` | `--surface-1: #ffffff; /* paper card */` |
| 562 | hex | `#ffffff` | `--cta-fg: #ffffff;` |
| 565 | hex | `#0056d2` | `--cta-blue: #0056d2;` |
| 566 | hex | `#00419e` | `--cta-blue-hover: #00419e;` |
| 567 | hex | `#eaf2ff` | `--cta-blue-soft: #eaf2ff;` |
| 701 | hex | `#ff9933` | `--flag-in-saffron: #ff9933;` |
| 702 | hex | `#ffffff` | `--flag-in-white: #ffffff;` |
| 703 | hex | `#138808` | `--flag-in-green: #138808;` |
| 858 | hex | `#ffffff` | `--tone-blue-surface: #ffffff;` |
| 864 | hex | `#ffffff` | `--tone-orange-surface: #ffffff;` |
| 871 | hex | `#ffffff` | `--tone-navy-ink: #ffffff;` |
| 876 | hex | `#ffffff` | `--tone-emerald-surface: #ffffff;` |
| 882 | hex | `#ffffff` | `--tone-violet-surface: #ffffff;` |
| 889 | hex | `#ffffff` | `--tone-slate-ink: #ffffff;` |
| 900 | hex | `#e8edf3` | `--ink: #e8edf3; /* primary text on navy */` |
| 901 | hex | `#b8c4d6` | `--ink-soft: #b8c4d6;` |
| 902 | hex | `#8697b0` | `--ink-mute: #8697b0;` |
| 903 | hex | `#0a1229` | `--paper: #0a1229;` |
| 905 | hex | `#0f1b3d` | `--surface-1: #0f1b3d; /* card */` |
| 906 | hex | `#142549` | `--surface-2: #142549; /* tinted card */` |
| 907 | hex | `#1e3a5f` | `--surface-3: #1e3a5f; /* elevated */` |
| 909 | hex | `#0a1229` | `--background: #0a1229;` |
| 911 | hex | `#0f1b3d` | `--card: #0f1b3d;` |
| 913 | hex | `#0f1b3d` | `--popover: #0f1b3d;` |
| 916 | hex | `#5b8fc5` | `--primary: #5b8fc5;` |
| 917 | hex | `#0a1229` | `--primary-foreground: #0a1229;` |
| 918 | hex | `#3b6fa0` | `--primary-deep: #3b6fa0;` |
| 919 | hex | `#7fb0e0` | `--primary-glow: #7fb0e0;` |
| 921 | hex | `#142549` | `--secondary: #142549;` |
| 923 | hex | `#142549` | `--muted: #142549;` |
| 925 | hex | `#5b8fc5` | `--accent: #5b8fc5;` |
| 926 | hex | `#0a1229` | `--accent-foreground: #0a1229;` |
| 928 | rgba | `rgba(232, 237, 243, 0.1)` | `--border: rgba(232, 237, 243, 0.1);` |
| 929 | rgba | `rgba(232, 237, 243, 0.08)` | `--input: rgba(232, 237, 243, 0.08);` |
| 930 | hex | `#5b8fc5` | `--ring: #5b8fc5;` |
| 933 | hex | `#5b8fc5` | `--cta-bg: #5b8fc5;` |
| 934 | hex | `#0a1229` | `--cta-fg: #0a1229;` |
| 935 | hex | `#7fb0e0` | `--cta-hover: #7fb0e0;` |
| 936 | hex | `#3b6fa0` | `--cta-press: #3b6fa0;` |
| 937 | hex | `#7fb0e0` | `--focus-ring: #7fb0e0;` |
| 939 | hex | `#0f1b3d` | `--sidebar: #0f1b3d;` |
| 941 | hex | `#5b8fc5` | `--sidebar-primary: #5b8fc5;` |
| 942 | hex | `#0a1229` | `--sidebar-primary-foreground: #0a1229;` |
| 943 | hex | `#1e3a5f` | `--sidebar-accent: #1e3a5f;` |
| 945 | rgba | `rgba(232, 237, 243, 0.1)` | `--sidebar-border: rgba(232, 237, 243, 0.1);` |
| 946 | hex | `#5b8fc5` | `--sidebar-ring: #5b8fc5;` |
| 948 | hex | `#ffffff` | `--text-strong: #ffffff;` |
| 953 | hex | `#0a1229` | `background-color: #0a1229;` |
| 967 | hex | `#ffffff` | `background-color: #ffffff;` |
| 972 | hex | `#ffffff` | `background-color: #ffffff;` |
| 1022 | hex | `#000` | `Large bold headings use pure black (#000), not navy. Navy is reserved` |
| 1109 | hex | `#ffffff` | `background-color: #ffffff;` |
| 1123 | hex | `#070b17` | `background-color: #070b17;` |
| 1124 | hex | `#ffffff` | `color: #ffffff;` |
| 1125 | hex | `#ffffff` | `--ink: #ffffff;` |
| 1126 | rgba | `rgba(255, 255, 255, 0.86)` | `--ink-soft: rgba(255, 255, 255, 0.86);` |
| 1127 | rgba | `rgba(255, 255, 255, 0.68)` | `--ink-mute: rgba(255, 255, 255, 0.68);` |
| 1128 | hex | `#ffffff` | `--text-strong: #ffffff;` |
| 1129 | rgba | `rgba(255, 255, 255, 0.1)` | `--border: rgba(255, 255, 255, 0.1);` |
| 1137 | hex | `#070b17` | `background-color: #070b17;` |
| 1193 | rgba | `rgba(20, 184, 166, 0.45)` | `0 0 0 0 rgba(20, 184, 166, 0.45),` |
| 1194 | rgba | `rgba(20, 184, 166, 0.45)` | `0 18px 48px -16px rgba(20, 184, 166, 0.45);` |
| 1198 | rgba | `rgba(20, 184, 166, 0)` | `0 0 0 14px rgba(20, 184, 166, 0),` |
| 1199 | rgba | `rgba(20, 184, 166, 0.65)` | `0 18px 48px -16px rgba(20, 184, 166, 0.65);` |
| 1282 | rgba | `rgba(27, 63, 139, 0.2)` | `0 8px 20px -6px rgba(27, 63, 139, 0.2),` |
| 1283 | rgba | `rgba(20, 184, 166, 0.25)` | `0 16px 32px -12px rgba(20, 184, 166, 0.25);` |
| 1287 | rgba | `rgba(15, 27, 61, 0.15)` | `box-shadow: 0 2px 6px -2px rgba(15, 27, 61, 0.15);` |
| 1293 | hex | `#ffffff` | `0 0 0 2px #ffffff,` |
| 1295 | rgba | `rgba(15, 27, 61, 0.1)` | `-2px 6px 0 0 rgba(15, 27, 61, 0.1);` |
| 1342 | rgba | `rgba(20, 184, 166, 0.18)` | `-6px 14px 0 -8px rgba(20, 184, 166, 0.18),` |
| 1343 | rgba | `rgba(15, 27, 61, 0.25)` | `0 28px 60px -28px rgba(15, 27, 61, 0.25),` |
| 1344 | rgba | `rgba(255, 255, 255, 0.6)` | `0 2px 0 0 rgba(255, 255, 255, 0.6) inset;` |
| 1353 | hex | `#ffffff` | `0 0 0 2px #ffffff,` |
| 1355 | rgba | `rgba(20, 184, 166, 0.18)` | `-6px 14px 0 -8px rgba(20, 184, 166, 0.18);` |
| 1522 | rgba | `rgba(255, 255, 255, 0.82)` | `background: linear-gradient(180deg, rgba(255, 255, 255, 0.82), rgba(255, 255, 255, 0.62));` |
| 1522 | rgba | `rgba(255, 255, 255, 0.62)` | `background: linear-gradient(180deg, rgba(255, 255, 255, 0.82), rgba(255, 255, 255, 0.62));` |
| 1525 | rgba | `rgba(15, 27, 61, 0.08)` | `border: 1px solid rgba(15, 27, 61, 0.08);` |
| 1529 | rgba | `rgba(255, 255, 255, 0.92)` | `background: linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.82));` |
| 1529 | rgba | `rgba(255, 255, 255, 0.82)` | `background: linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.82));` |
| 1532 | rgba | `rgba(15, 27, 61, 0.1)` | `border-bottom: 1px solid rgba(15, 27, 61, 0.1);` |
| 1538 | rgba | `rgba(255, 255, 255, 0.96)` | `background: linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(248, 250, 252, 0.92));` |
| 1538 | rgba | `rgba(248, 250, 252, 0.92)` | `background: linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(248, 250, 252, 0.92));` |
| 1541 | rgba | `rgba(226, 232, 240, 0.9)` | `border: 1px solid rgba(226, 232, 240, 0.9);` |
| 1542 | rgba | `rgba(15, 23, 42, 0.05)` | `box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.8);` |
| 1542 | rgba | `rgba(255, 255, 255, 0.8)` | `box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.8);` |
| 1546 | rgba | `rgba(15, 23, 42, 0.92)` | `background: linear-gradient(180deg, rgba(15, 23, 42, 0.92), rgba(11, 19, 37, 0.95));` |
| 1546 | rgba | `rgba(11, 19, 37, 0.95)` | `background: linear-gradient(180deg, rgba(15, 23, 42, 0.92), rgba(11, 19, 37, 0.95));` |
| 1549 | rgba | `rgba(255, 255, 255, 0.12)` | `border: 1px solid rgba(255, 255, 255, 0.12);` |
| 1550 | rgba | `rgba(0, 0, 0, 0.5)` | `box-shadow: 0 20px 50px -15px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1);` |
| 1550 | rgba | `rgba(255, 255, 255, 0.1)` | `box-shadow: 0 20px 50px -15px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1);` |
| 1562 | rgba | `rgba(245, 158, 11, 0.6)` | `background: linear-gradient(135deg, rgba(245, 158, 11, 0.6), rgba(217, 119, 6, 0.1), rgba(245, 158, 11, 0.4));` |
| 1562 | rgba | `rgba(217, 119, 6, 0.1)` | `background: linear-gradient(135deg, rgba(245, 158, 11, 0.6), rgba(217, 119, 6, 0.1), rgba(245, 158, 11, 0.4));` |
| 1562 | rgba | `rgba(245, 158, 11, 0.4)` | `background: linear-gradient(135deg, rgba(245, 158, 11, 0.6), rgba(217, 119, 6, 0.1), rgba(245, 158, 11, 0.4));` |
| 1563 | hex | `#fff` | `-webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);` |
| 1563 | hex | `#fff` | `-webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);` |
| 1564 | hex | `#fff` | `mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);` |
| 1564 | hex | `#fff` | `mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);` |
| 1579 | rgba | `rgba(56, 189, 248, 0.7)` | `background: linear-gradient(135deg, rgba(56, 189, 248, 0.7), rgba(27, 63, 139, 0.2), rgba(56, 189, 248, 0.5));` |
| 1579 | rgba | `rgba(27, 63, 139, 0.2)` | `background: linear-gradient(135deg, rgba(56, 189, 248, 0.7), rgba(27, 63, 139, 0.2), rgba(56, 189, 248, 0.5));` |
| 1579 | rgba | `rgba(56, 189, 248, 0.5)` | `background: linear-gradient(135deg, rgba(56, 189, 248, 0.7), rgba(27, 63, 139, 0.2), rgba(56, 189, 248, 0.5));` |
| 1580 | hex | `#fff` | `-webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);` |
| 1580 | hex | `#fff` | `-webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);` |
| 1581 | hex | `#fff` | `mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);` |
| 1581 | hex | `#fff` | `mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);` |
| 1588 | rgba | `rgba(27, 63, 139, 0.45)` | `box-shadow: 0 0 25px -5px rgba(27, 63, 139, 0.45);` |
| 1592 | rgba | `rgba(27, 63, 139, 0.65)` | `box-shadow: 0 0 35px -2px rgba(27, 63, 139, 0.65);` |
| 1599 | rgba | `rgba(255, 255, 255, 0.78)` | `background-color: rgba(255, 255, 255, 0.78);` |
| 1611 | rgba | `rgba(255, 255, 255, 0.92)` | `background-color: rgba(255, 255, 255, 0.92);` |
| 1612 | rgba | `rgba(15, 27, 61, 0.08)` | `border-bottom-color: rgba(15, 27, 61, 0.08);` |
| 1614 | rgba | `rgba(15, 27, 61, 0.18)` | `0 8px 24px -16px rgba(15, 27, 61, 0.18),` |
| 1615 | rgba | `rgba(255, 255, 255, 0.6)` | `inset 0 1px 0 rgba(255, 255, 255, 0.6);` |
| 1619 | hex | `#ffffff` | `background: #ffffff;` |
| 1622 | hex | `#ffffff` | `background: #ffffff;` |
| 1712 | rgba | `rgba(15, 27, 61, 0.1)` | `border: 1px solid rgba(15, 27, 61, 0.1);` |
| 1724 | hex | `#0f1b3d` | `#0f1b3d 0%,` |
| 1725 | hex | `#1e3a5f` | `#1e3a5f 30%,` |
| 1726 | hex | `#6fa8e8` | `#6fa8e8 50%,` |
| 1727 | hex | `#1e3a5f` | `#1e3a5f 70%,` |
| 1728 | hex | `#0f1b3d` | `#0f1b3d 100%` |
| 1756 | hex | `#ffffff` | `background: #ffffff;` |
| 1758 | hex | `#e2e8f0` | `border: 1px solid #e2e8f0;` |
| 1768 | hex | `#f4f7fb` | `background: #f4f7fb;` |
| 1770 | hex | `#e2e8f0` | `border: 1px solid #e2e8f0;` |
| 1774 | hex | `#f8fafc` | `color: #f8fafc;` |
| 1775 | rgba | `rgba(148, 163, 184, 0.14)` | `border: 1px solid rgba(148, 163, 184, 0.14);` |
| 1779 | rgba | `rgba(148, 163, 184, 0.14)` | `border-color: rgba(148, 163, 184, 0.14);` |
| 1843 | hex | `#ffffff` | `color: #ffffff;` |
| 1847 | rgba | `rgba(255, 255, 255, 0.88)` | `color: rgba(255, 255, 255, 0.88);` |
| 1850 | hex | `#bfd7f0` | `color: #bfd7f0; /* teal-300, readable on navy */` |
| 1854 | rgba | `rgba(255, 255, 255, 0.88)` | `color: rgba(255, 255, 255, 0.88);` |
| 1857 | hex | `#ffffff` | `color: #ffffff;` |
| 1871 | hex | `#ffffff` | `color: #ffffff;` |
| 1890 | hex | `#e6c97a` | `color: #e6c97a;` |
| 1891 | hex | `#e6c97a` | `-webkit-text-fill-color: #e6c97a;` |
| 1923 | hex | `#ffffff` | `--card: #ffffff;` |
| 1924 | hex | `#ffffff` | `--popover: #ffffff;` |
| 1925 | hex | `#ffffff` | `--background: #ffffff;` |
| 1929 | hex | `#ffffff` | `--primary-foreground: #ffffff;` |
| 1934 | hex | `#0a0e1a` | `color: #0a0e1a !important;` |
| 1935 | hex | `#0a0e1a` | `-webkit-text-fill-color: #0a0e1a !important;` |
| 1963 | hex | `#FFFFFF` | `AA on #FFFFFF: contrast ratio 5.4:1. */` |
| 1964 | hex | `#8a6a14` | `color: #8a6a14 !important;` |
| 1965 | hex | `#8a6a14` | `-webkit-text-fill-color: #8a6a14 !important;` |
| 2008 | rgba | `rgba(255, 255, 255, 0.55)` | `color: rgba(255, 255, 255, 0.55);` |
| 2015 | rgba | `rgba(15, 27, 61, 0.08)` | `border: 1px solid rgba(15, 27, 61, 0.08);` |
| 2016 | rgba | `rgba(255, 255, 255, 0.78)` | `background: rgba(255, 255, 255, 0.78);` |
| 2035 | rgba | `rgba(15, 27, 61, 0.12)` | `border: 1px solid rgba(15, 27, 61, 0.12);` |
| 2036 | rgba | `rgba(255, 255, 255, 0.85)` | `background: rgba(255, 255, 255, 0.85);` |
| 2052 | rgba | `rgba(15, 27, 61, 0.14)` | `border: 1px solid rgba(15, 27, 61, 0.14);` |
| 2053 | rgba | `rgba(255, 255, 255, 0.92)` | `background: rgba(255, 255, 255, 0.92);` |
| 2062 | rgba | `rgba(15, 27, 61, 0.04)` | `box-shadow: 0 1px 2px rgba(15, 27, 61, 0.04);` |
| 2074 | rgba | `rgba(255, 255, 255, 0.06)` | `background: rgba(255, 255, 255, 0.06);` |
| 2075 | rgba | `rgba(255, 255, 255, 0.18)` | `border-color: rgba(255, 255, 255, 0.18);` |
| 2076 | rgba | `rgba(255, 255, 255, 0.9)` | `color: rgba(255, 255, 255, 0.9);` |
| 2084 | hex | `#000` | `#000 16px,` |
| 2085 | hex | `#000` | `#000 calc(100% - 16px),` |
| 2091 | hex | `#000` | `#000 16px,` |
| 2092 | hex | `#000` | `#000 calc(100% - 16px),` |
| 2133 | hex | `#ffffff` | `0 0 0 2px #ffffff,` |
| 2138 | hex | `#ffffff` | `color: #ffffff;` |
| 2141 | rgba | `rgba(255, 255, 255, 0.18)` | `inset 0 1px 0 rgba(255, 255, 255, 0.18),` |
| 2142 | rgba | `rgba(0, 0, 0, 0.15)` | `inset 0 -1px 0 rgba(0, 0, 0, 0.15),` |
| 2143 | rgba | `rgba(15, 27, 61, 0.2)` | `0 1px 2px rgba(15, 27, 61, 0.2),` |
| 2144 | rgba | `rgba(0, 86, 210, 0.45)` | `0 12px 28px -12px rgba(0, 86, 210, 0.45);` |
| 2149 | rgba | `rgba(255, 255, 255, 0.22)` | `inset 0 1px 0 rgba(255, 255, 255, 0.22),` |
| 2150 | rgba | `rgba(0, 0, 0, 0.18)` | `inset 0 -1px 0 rgba(0, 0, 0, 0.18),` |
| 2151 | rgba | `rgba(15, 27, 61, 0.18)` | `0 2px 4px rgba(15, 27, 61, 0.18),` |
| 2152 | rgba | `rgba(0, 86, 210, 0.55)` | `0 18px 36px -14px rgba(0, 86, 210, 0.55);` |
| 2155 | hex | `#003b8f` | `background: #003b8f;` |
| 2157 | rgba | `rgba(0, 0, 0, 0.25)` | `inset 0 1px 2px rgba(0, 0, 0, 0.25),` |
| 2158 | rgba | `rgba(255, 255, 255, 0.05)` | `inset 0 -1px 0 rgba(255, 255, 255, 0.05),` |
| 2159 | rgba | `rgba(15, 27, 61, 0.3)` | `0 1px 2px rgba(15, 27, 61, 0.3);` |
| 2164 | hex | `#ffffff` | `background: #ffffff;` |
| 2169 | rgba | `rgba(15, 27, 61, 0.06)` | `0 1px 2px rgba(15, 27, 61, 0.06),` |
| 2170 | rgba | `rgba(255, 255, 255, 0.6)` | `inset 0 1px 0 rgba(255, 255, 255, 0.6);` |
| 2177 | rgba | `rgba(244, 247, 251, 0.95)` | `background: rgba(244, 247, 251, 0.95);` |
| 2183 | rgba | `rgba(94, 234, 212, 0.1)` | `background: rgba(94, 234, 212, 0.1);` |
| 2184 | hex | `#ffffff` | `color: #ffffff;` |
| 2185 | rgba | `rgba(94, 234, 212, 0.55)` | `border: 1px solid rgba(94, 234, 212, 0.55);` |
| 2188 | rgba | `rgba(0, 0, 0, 0.18)` | `0 1px 2px rgba(0, 0, 0, 0.18),` |
| 2189 | rgba | `rgba(255, 255, 255, 0.06)` | `inset 0 1px 0 rgba(255, 255, 255, 0.06);` |
| 2192 | rgba | `rgba(94, 234, 212, 0.18)` | `background: rgba(94, 234, 212, 0.18);` |
| 2193 | rgba | `rgba(94, 234, 212, 0.85)` | `border-color: rgba(94, 234, 212, 0.85);` |
| 2194 | hex | `#ffffff` | `color: #ffffff;` |
| 2199 | hex | `#ffffff` | `color: #ffffff;` |
| 2201 | rgba | `rgba(255, 255, 255, 0.4)` | `inset 0 1px 0 rgba(255, 255, 255, 0.4),` |
| 2202 | rgba | `rgba(0, 0, 0, 0.12)` | `inset 0 -1px 0 rgba(0, 0, 0, 0.12),` |
| 2203 | rgba | `rgba(0, 45, 115, 0.24)` | `0 1px 2px rgba(0, 45, 115, 0.24),` |
| 2204 | rgba | `rgba(0, 86, 210, 0.55)` | `0 14px 34px -12px rgba(0, 86, 210, 0.55);` |
| 2208 | hex | `#ffffff` | `color: #ffffff;` |
| 2210 | rgba | `rgba(255, 255, 255, 0.5)` | `inset 0 1px 0 rgba(255, 255, 255, 0.5),` |
| 2211 | rgba | `rgba(0, 0, 0, 0.15)` | `inset 0 -1px 0 rgba(0, 0, 0, 0.15),` |
| 2212 | rgba | `rgba(0, 45, 115, 0.24)` | `0 2px 4px rgba(0, 45, 115, 0.24),` |
| 2213 | rgba | `rgba(0, 86, 210, 0.62)` | `0 20px 40px -12px rgba(0, 86, 210, 0.62);` |
| 2216 | hex | `#003b8f` | `background: #003b8f;` |
| 2218 | rgba | `rgba(0, 0, 0, 0.2)` | `inset 0 1px 2px rgba(0, 0, 0, 0.2),` |
| 2219 | rgba | `rgba(120, 85, 0, 0.3)` | `0 1px 2px rgba(120, 85, 0, 0.3);` |
| 2223 | hex | `#ffffff` | `background: #ffffff;` |
| 2237 | hex | `#ffffff` | `background: #ffffff;` |
| 2239 | rgba | `rgba(255, 255, 255, 0.82)` | `border: 1px solid rgba(255, 255, 255, 0.82);` |
| 2245 | hex | `#ffffff` | `border-color: #ffffff;` |
| 2331 | hex | `#ffffff` | `color: #ffffff;` |
| 2339 | hex | `#1a1300` | `color: #1a1300;` |
| 2384 | hex | `#ffffff` | `background: #ffffff;` |
| 2390 | hex | `#ffffff` | `background: #ffffff;` |
| 2394 | rgba | `rgba(15, 27, 61, 0.04)` | `0 1px 2px rgba(15, 27, 61, 0.04),` |
| 2395 | rgba | `rgba(15, 27, 61, 0.1)` | `0 8px 24px -10px rgba(15, 27, 61, 0.1);` |
| 2399 | hex | `#ffffff` | `background: #ffffff;` |
| 2403 | rgba | `rgba(15, 27, 61, 0.05)` | `0 1px 2px rgba(15, 27, 61, 0.05),` |
| 2404 | rgba | `rgba(15, 27, 61, 0.14)` | `0 10px 28px -10px rgba(15, 27, 61, 0.14),` |
| 2405 | rgba | `rgba(15, 27, 61, 0.2)` | `0 28px 56px -22px rgba(15, 27, 61, 0.2);` |
| 2425 | hex | `#ffffff` | `--card: #ffffff;` |
| 2426 | hex | `#ffffff` | `--popover: #ffffff;` |
| 2427 | hex | `#ffffff` | `--background: #ffffff;` |
| 2431 | hex | `#ffffff` | `--primary-foreground: #ffffff;` |
| 2437 | hex | `#181b21` | `background: linear-gradient(180deg, #181b21 0%, #0a0c10 100%);` |
| 2437 | hex | `#0a0c10` | `background: linear-gradient(180deg, #181b21 0%, #0a0c10 100%);` |
| 2438 | hex | `#ffffff` | `color: #ffffff;` |
| 2439 | rgba | `rgba(255, 255, 255, 0.08)` | `border: 1px solid rgba(255, 255, 255, 0.08);` |
| 2442 | rgba | `rgba(255, 255, 255, 0.1)` | `inset 0 1px 0 rgba(255, 255, 255, 0.1),` |
| 2443 | rgba | `rgba(0, 0, 0, 0.2)` | `0 2px 4px rgba(0, 0, 0, 0.2),` |
| 2444 | rgba | `rgba(10, 20, 48, 0.55)` | `0 24px 48px -16px rgba(10, 20, 48, 0.55);` |
| 2459 | rgba | `rgba(15, 27, 61, 0.06)` | `0 2px 4px rgba(15, 27, 61, 0.06),` |
| 2460 | rgba | `rgba(15, 27, 61, 0.18)` | `0 14px 36px -10px rgba(15, 27, 61, 0.18),` |
| 2461 | rgba | `rgba(15, 27, 61, 0.22)` | `0 32px 64px -22px rgba(15, 27, 61, 0.22);` |
| 2464 | rgba | `rgba(255, 255, 255, 0.16)` | `border-color: rgba(255, 255, 255, 0.16);` |
| 2466 | rgba | `rgba(255, 255, 255, 0.14)` | `inset 0 1px 0 rgba(255, 255, 255, 0.14),` |
| 2467 | rgba | `rgba(0, 0, 0, 0.25)` | `0 4px 8px rgba(0, 0, 0, 0.25),` |
| 2468 | rgba | `rgba(10, 20, 48, 0.65)` | `0 32px 64px -16px rgba(10, 20, 48, 0.65);` |
| 2489 | hex | `#000` | `linear-gradient(#000 0 0) content-box,` |
| 2490 | hex | `#000` | `linear-gradient(#000 0 0);` |
| 2492 | hex | `#000` | `linear-gradient(#000 0 0) content-box,` |
| 2493 | hex | `#000` | `linear-gradient(#000 0 0);` |
| 2513 | hex | `#c9a84c` | `--card-accent: linear-gradient(90deg, #c9a84c 0%, #f0d78c 50%, #c9a84c 100%);` |
| 2513 | hex | `#f0d78c` | `--card-accent: linear-gradient(90deg, #c9a84c 0%, #f0d78c 50%, #c9a84c 100%);` |
| 2513 | hex | `#c9a84c` | `--card-accent: linear-gradient(90deg, #c9a84c 0%, #f0d78c 50%, #c9a84c 100%);` |
| 2522 | hex | `#0d7a5f` | `--card-accent: #0d7a5f;` |
| 2633 | rgba | `rgba(255, 255, 255, 0.85)` | `radial-gradient(1px 1px at 20px 30px, rgba(255, 255, 255, 0.85), transparent 60%),` |
| 2634 | rgba | `rgba(255, 255, 255, 0.7)` | `radial-gradient(1px 1px at 90px 140px, rgba(255, 255, 255, 0.7), transparent 60%),` |
| 2635 | rgba | `rgba(255, 255, 255, 0.9)` | `radial-gradient(1.2px 1.2px at 160px 60px, rgba(255, 255, 255, 0.9), transparent 60%),` |
| 2636 | rgba | `rgba(255, 255, 255, 0.75)` | `radial-gradient(1px 1px at 240px 200px, rgba(255, 255, 255, 0.75), transparent 60%),` |
| 2637 | rgba | `rgba(255, 255, 255, 0.8)` | `radial-gradient(1px 1px at 320px 90px, rgba(255, 255, 255, 0.8), transparent 60%);` |
| 2643 | rgba | `rgba(180, 210, 255, 0.85)` | `radial-gradient(1.5px 1.5px at 50px 80px, rgba(180, 210, 255, 0.85), transparent 60%),` |
| 2644 | rgba | `rgba(200, 220, 255, 0.7)` | `radial-gradient(1.5px 1.5px at 220px 160px, rgba(200, 220, 255, 0.7), transparent 60%),` |
| 2645 | rgba | `rgba(255, 255, 255, 0.8)` | `radial-gradient(1.2px 1.2px at 380px 40px, rgba(255, 255, 255, 0.8), transparent 60%);` |
| 2652 | rgba | `rgba(245, 192, 74, 0.85)` | `radial-gradient(2px 2px at 120px 220px, rgba(245, 192, 74, 0.85), transparent 60%),` |
| 2653 | rgba | `rgba(96, 165, 250, 0.85)` | `radial-gradient(1.5px 1.5px at 460px 120px, rgba(96, 165, 250, 0.85), transparent 60%);` |
| 2673 | hex | `#0a0c10` | ``text-white`, `bg-[#0a0c10]`, `bg-white/N`, `border-white/N`,` |
| 2685 | hex | `#1B3F8B` | `a[class*="bg-[#1B3F8B]"],` |
| 2686 | hex | `#1B3F8B` | `button[class*="bg-[#1B3F8B]"],` |
| 2687 | hex | `#1B3F8B` | `a[class*="bg-[#1B3F8B]"] *,` |
| 2688 | hex | `#1B3F8B` | `button[class*="bg-[#1B3F8B]"] *,` |
| 2693 | hex | `#102E5C` | `a[class*="bg-[#102E5C]"],` |
| 2694 | hex | `#102E5C` | `button[class*="bg-[#102E5C]"],` |
| 2695 | hex | `#102E5C` | `a[class*="bg-[#102E5C]"] *,` |
| 2696 | hex | `#102E5C` | `button[class*="bg-[#102E5C]"] *,` |
| 2697 | hex | `#0B1325` | `a[class*="bg-[#0B1325]"],` |
| 2698 | hex | `#0B1325` | `button[class*="bg-[#0B1325]"],` |
| 2699 | hex | `#0B1325` | `a[class*="bg-[#0B1325]"] *,` |
| 2700 | hex | `#0B1325` | `button[class*="bg-[#0B1325]"] * {` |
| 2701 | hex | `#ffffff` | `color: #ffffff !important;` |
| 2807 | hex | `#0a0c10` | `.bg-\[\#0a0c10\]:not(.tone-dark, .tone-dark *, [class*="bg-[#0"], [class*="bg-[#0"] *) {` |
| 2808 | rgba | `rgba(255, 255, 255, 0.92)` | `background-color: rgba(255, 255, 255, 0.92) !important;` |
| 2811 | hex | `#0a0c10` | `.bg-\[\#0a0c10\]\/90:not(.tone-dark *, [class*="bg-[#0"] *) {` |
| 2812 | rgba | `rgba(255, 255, 255, 0.9)` | `background-color: rgba(255, 255, 255, 0.9) !important;` |
| 2815 | hex | `#0a0c10` | `.bg-\[\#0a0c10\]\/80:not(.tone-dark *, [class*="bg-[#0"] *) {` |
| 2816 | rgba | `rgba(255, 255, 255, 0.86)` | `background-color: rgba(255, 255, 255, 0.86) !important;` |
| 2819 | hex | `#0a0c10` | `.bg-\[\#0a0c10\]\/70:not(.tone-dark *, [class*="bg-[#0"] *) {` |
| 2820 | rgba | `rgba(255, 255, 255, 0.8)` | `background-color: rgba(255, 255, 255, 0.8) !important;` |
| 2823 | hex | `#0a0c10` | `.bg-\[\#0a0c10\]\/60:not(.tone-dark *, [class*="bg-[#0"] *) {` |
| 2824 | rgba | `rgba(255, 255, 255, 0.72)` | `background-color: rgba(255, 255, 255, 0.72) !important;` |
| 2827 | hex | `#0a0c10` | `.bg-\[\#0a0c10\]\/50:not(.tone-dark *, [class*="bg-[#0"] *) {` |
| 2828 | rgba | `rgba(255, 255, 255, 0.64)` | `background-color: rgba(255, 255, 255, 0.64) !important;` |
| 2831 | hex | `#0a0c10` | `.bg-\[\#0a0c10\]\/40:not(.tone-dark *, [class*="bg-[#0"] *) {` |
| 2832 | rgba | `rgba(255, 255, 255, 0.56)` | `background-color: rgba(255, 255, 255, 0.56) !important;` |
| 2835 | hex | `#0a0c10` | `.bg-\[\#0a0c10\]\/30:not(.tone-dark *, [class*="bg-[#0"] *) {` |
| 2836 | rgba | `rgba(255, 255, 255, 0.48)` | `background-color: rgba(255, 255, 255, 0.48) !important;` |
| 2842 | rgba | `rgba(15, 27, 61, 0.025)` | `background-color: rgba(15, 27, 61, 0.025) !important;` |
| 2845 | rgba | `rgba(15, 27, 61, 0.03)` | `background-color: rgba(15, 27, 61, 0.03) !important;` |
| 2848 | rgba | `rgba(15, 27, 61, 0.03)` | `background-color: rgba(15, 27, 61, 0.03) !important;` |
| 2851 | rgba | `rgba(15, 27, 61, 0.04)` | `background-color: rgba(15, 27, 61, 0.04) !important;` |
| 2854 | rgba | `rgba(15, 27, 61, 0.05)` | `background-color: rgba(15, 27, 61, 0.05) !important;` |
| 2857 | rgba | `rgba(15, 27, 61, 0.05)` | `background-color: rgba(15, 27, 61, 0.05) !important;` |
| 2860 | rgba | `rgba(15, 27, 61, 0.06)` | `background-color: rgba(15, 27, 61, 0.06) !important;` |
| 2863 | rgba | `rgba(255, 255, 255, 0.85)` | `background-color: rgba(255, 255, 255, 0.85) !important;` |
| 2866 | rgba | `rgba(15, 27, 61, 0.05)` | `background-color: rgba(15, 27, 61, 0.05) !important;` |
| 2869 | rgba | `rgba(255, 255, 255, 0.8)` | `background-color: rgba(255, 255, 255, 0.8) !important;` |
| 2872 | rgba | `rgba(255, 255, 255, 0.86)` | `background-color: rgba(255, 255, 255, 0.86) !important;` |
| 2875 | rgba | `rgba(255, 255, 255, 0.9)` | `background-color: rgba(255, 255, 255, 0.9) !important;` |
| 2880 | rgba | `rgba(15, 27, 61, 0.06)` | `border-color: rgba(15, 27, 61, 0.06) !important;` |
| 2883 | rgba | `rgba(15, 27, 61, 0.07)` | `border-color: rgba(15, 27, 61, 0.07) !important;` |
| 2886 | rgba | `rgba(15, 27, 61, 0.08)` | `border-color: rgba(15, 27, 61, 0.08) !important;` |
| 2889 | rgba | `rgba(15, 27, 61, 0.09)` | `border-color: rgba(15, 27, 61, 0.09) !important;` |
| 2892 | rgba | `rgba(15, 27, 61, 0.1)` | `border-color: rgba(15, 27, 61, 0.1) !important;` |
| 2895 | rgba | `rgba(15, 27, 61, 0.12)` | `border-color: rgba(15, 27, 61, 0.12) !important;` |
| 2898 | rgba | `rgba(15, 27, 61, 0.14)` | `border-color: rgba(15, 27, 61, 0.14) !important;` |
| 2901 | rgba | `rgba(15, 27, 61, 0.16)` | `border-color: rgba(15, 27, 61, 0.16) !important;` |
| 2904 | rgba | `rgba(15, 27, 61, 0.18)` | `border-color: rgba(15, 27, 61, 0.18) !important;` |
| 2907 | rgba | `rgba(15, 27, 61, 0.2)` | `border-color: rgba(15, 27, 61, 0.2) !important;` |
| 2910 | rgba | `rgba(15, 27, 61, 0.1)` | `--tw-ring-color: rgba(15, 27, 61, 0.1) !important;` |
| 2913 | rgba | `rgba(15, 27, 61, 0.12)` | `--tw-ring-color: rgba(15, 27, 61, 0.12) !important;` |
| 2916 | rgba | `rgba(15, 27, 61, 0.14)` | `--tw-ring-color: rgba(15, 27, 61, 0.14) !important;` |
| 2960 | rgba | `rgba(15, 27, 61, 0.04)` | `background-color: rgba(15, 27, 61, 0.04) !important;` |
| 2965 | rgba | `rgba(15, 27, 61, 0.05)` | `background-color: rgba(15, 27, 61, 0.05) !important;` |
| 2971 | rgba | `rgba(15, 27, 61, 0.08)` | `background-color: rgba(15, 27, 61, 0.08) !important;` |
| 2979 | rgba | `rgba(15, 27, 61, 0.1)` | `border-color: rgba(15, 27, 61, 0.1) !important;` |
| 2985 | rgba | `rgba(15, 27, 61, 0.15)` | `border-color: rgba(15, 27, 61, 0.15) !important;` |
| 2991 | rgba | `rgba(15, 27, 61, 0.12)` | `--tw-ring-color: rgba(15, 27, 61, 0.12) !important;` |
| 3001 | hex | `#0f1b3d` | `.tone-light [class*="bg-[#0f1b3d]"],` |
| 3002 | hex | `#0f1b3d` | `.tone-light [class*="bg-[#0f1b3d]"] .text-white,` |
| 3003 | hex | `#0a1430` | `.tone-light [class*="bg-[#0a1430]"],` |
| 3004 | hex | `#0a1430` | `.tone-light [class*="bg-[#0a1430]"] .text-white,` |
| 3005 | hex | `#1B3F8B` | `.tone-light [class~="bg-[#1B3F8B]"],` |
| 3006 | hex | `#1B3F8B` | `.tone-light [class~="bg-[#1B3F8B]"] .text-white,` |
| 3007 | hex | `#1B3F8B` | `.tone-light [class~="bg-[#1B3F8B]"] span,` |
| 3008 | hex | `#1B3F8B` | `.tone-light [class~="bg-[#1B3F8B]"] p,` |
| 3009 | hex | `#1B3F8B` | `.tone-light [class~="bg-[#1B3F8B]"] h2,` |
| 3010 | hex | `#1B3F8B` | `.tone-light [class~="bg-[#1B3F8B]"] h3 {` |
| 3011 | hex | `#ffffff` | `color: #ffffff !important;` |
| 3025 | hex | `#ffffff` | `background-color: #ffffff !important;` |
| 3067 | hex | `#0f1b3d` | `[style*="background-color: #0f1b3d"] .text-white,` |
| 3068 | hex | `#0f1b3d` | `[style*="background:#0f1b3d"] .text-white,` |
| 3073 | hex | `#ffffff` | `color: #ffffff !important;` |
| 3077 | hex | `#0f1b3d` | `themselves (e.g. <Link className="bg-[#0f1b3d] text-white">). The` |
| 3080 | hex | `#0f1b3d` | `[class*="bg-[#0f1b3d]"].text-white,` |
| 3081 | hex | `#1e3a5f` | `[class*="bg-[#1e3a5f]"].text-white,` |
| 3082 | hex | `#0a1430` | `[class*="bg-[#0a1430]"].text-white,` |
| 3083 | hex | `#0a1b30` | `[class*="bg-[#0a1b30]"].text-white,` |
| 3084 | hex | `#071226` | `[class*="bg-[#071226]"].text-white,` |
| 3085 | hex | `#040d1c` | `[class*="bg-[#040d1c]"].text-white,` |
| 3086 | hex | `#0A0F1E` | `[class*="bg-[#0A0F1E]"].text-white,` |
| 3092 | hex | `#ffffff` | `color: #ffffff !important;` |
| 3098 | hex | `#0f1b3d` | `background-color: #0f1b3d;` |
| 3099 | hex | `#ffffff` | `color: #ffffff !important;` |
| 3106 | hex | `#1e3a5f` | `background-color: #1e3a5f;` |
| 3109 | hex | `#0a1430` | `background-color: #0a1430;` |
| 3113 | hex | `#ffffff` | `color: #ffffff !important;` |
| 3120 | rgba | `rgba(255, 255, 255, 0.92)` | `background-color: rgba(255, 255, 255, 0.92);` |
| 3122 | rgba | `rgba(15, 27, 61, 0.12)` | `border-color: rgba(15, 27, 61, 0.12);` |
| 3139 | rgba | `rgba(20, 184, 166, 0.25)` | `background: rgba(20, 184, 166, 0.25);` |
| 3149 | hex | `#0f1b3d` | `[class*="bg-[#0f1b3d]"],` |
| 3150 | hex | `#1e3a5f` | `[class*="bg-[#1e3a5f]"],` |
| 3151 | hex | `#0a1b30` | `[class*="bg-[#0a1b30]"],` |
| 3152 | hex | `#0a1430` | `[class*="bg-[#0a1430]"],` |
| 3153 | hex | `#071226` | `[class*="bg-[#071226]"],` |
| 3154 | hex | `#040d1c` | `[class*="bg-[#040d1c]"],` |
| 3155 | hex | `#0A0F1E` | `[class*="bg-[#0A0F1E]"],` |
| 3156 | hex | `#000` | `[class*="bg-[#000"] {` |
| 3157 | hex | `#ffffff` | `color: #ffffff !important;` |
| 3162 | hex | `#ffffff` | `color: #ffffff;` |
| 3166 | hex | `#0f1b3d` | `[class*="bg-[#0f1b3d]"] .text-white,` |
| 3167 | hex | `#1e3a5f` | `[class*="bg-[#1e3a5f]"] .text-white,` |
| 3168 | hex | `#0a1b30` | `[class*="bg-[#0a1b30]"] .text-white,` |
| 3169 | hex | `#0a1430` | `[class*="bg-[#0a1430]"] .text-white,` |
| 3170 | hex | `#0A0F1E` | `[class*="bg-[#0A0F1E]"] .text-white,` |
| 3171 | hex | `#000` | `[class*="bg-[#000"] .text-white,` |
| 3175 | hex | `#102E5C` | `[class*="bg-[#102E5C]"] .text-white,` |
| 3176 | hex | `#071223` | `[class*="bg-[#071223]"] .text-white,` |
| 3177 | hex | `#0B1325` | `[class*="bg-[#0B1325]"] .text-white,` |
| 3178 | hex | `#0A1F3E` | `[class*="bg-[#0A1F3E]"] .text-white,` |
| 3179 | hex | `#0A2246` | `[class*="bg-[#0A2246]"] .text-white,` |
| 3183 | hex | `#102E5C` | `[class*="bg-[#102E5C]"] [class*="text-white"],` |
| 3184 | hex | `#071223` | `[class*="bg-[#071223]"] [class*="text-white"],` |
| 3185 | hex | `#0B1325` | `[class*="bg-[#0B1325]"] [class*="text-white"],` |
| 3186 | hex | `#0f1b3d` | `[class*="bg-[#0f1b3d]"] [class*="text-white\\/"],` |
| 3187 | hex | `#1e3a5f` | `[class*="bg-[#1e3a5f]"] [class*="text-white\\/"],` |
| 3188 | hex | `#0a1430` | `[class*="bg-[#0a1430]"] [class*="text-white\\/"] {` |
| 3189 | hex | `#ffffff` | `color: #ffffff !important;` |
| 3195 | hex | `#0B1325` | `color: var(--color-arzon-ink, #0B1325) !important;` |
| 3200 | hex | `#102E5C` | `color: var(--color-medical-navy, #102E5C) !important;` |
| 3205 | hex | `#D99A20` | `color: var(--color-editorial-amber, #D99A20) !important;` |
| 3210 | hex | `#0F766E` | `color: var(--color-clinical-teal, #0F766E) !important;` |
| 3215 | hex | `#0a1430` | `.bg-\[\#0a1430\],` |
| 3216 | hex | `#0a1430` | `.bg-\[\#0a1430\] * {` |
| 3217 | hex | `#ffffff` | `color: #ffffff;` |
| 3219 | hex | `#0a1430` | `.bg-\[\#0a1430\] .text-white\/85,` |
| 3220 | hex | `#0a1430` | `.bg-\[\#0a1430\] .text-white\/80,` |
| 3221 | hex | `#0a1430` | `.bg-\[\#0a1430\] .text-white\/75,` |
| 3222 | hex | `#0a1430` | `.bg-\[\#0a1430\] .text-white\/70,` |
| 3223 | hex | `#0a1430` | `.bg-\[\#0a1430\] .text-white\/65,` |
| 3224 | hex | `#0a1430` | `.bg-\[\#0a1430\] .text-white\/60 {` |
| 3225 | rgba | `rgba(255, 255, 255, 0.78)` | `color: rgba(255, 255, 255, 0.78) !important;` |
| 3227 | hex | `#0a1430` | `.bg-\[\#0a1430\] .btn-secondary,` |
| 3228 | hex | `#0a1430` | `.bg-\[\#0a1430\] .btn-secondary * {` |
| 3229 | hex | `#ffffff` | `color: #ffffff !important;` |
| 3233 | hex | `#0a1430` | `keep their own ink - the blanket `.bg-[#0a1430] *` rule above would` |
| 3235 | hex | `#0a1430` | `.bg-\[\#0a1430\] .tone-light,` |
| 3236 | hex | `#0a1430` | `.bg-\[\#0a1430\] .tone-light * {` |
| 3239 | hex | `#0a1430` | `.bg-\[\#0a1430\] .tone-light .text-black,` |
| 3240 | hex | `#0a1430` | `.bg-\[\#0a1430\] .tone-light .text-\[\#0f1b3d\] {` |
| 3240 | hex | `#0f1b3d` | `.bg-\[\#0a1430\] .tone-light .text-\[\#0f1b3d\] {` |
| 3241 | hex | `#000000` | `color: #000000 !important;` |
| 3243 | hex | `#0a1430` | `.bg-\[\#0a1430\] .tone-light .text-white {` |
| 3244 | hex | `#ffffff` | `color: #ffffff !important;` |
| 3249 | hex | `#0f1b3d` | `[class*="hover:bg-[#0f1b3d]"]:hover,` |
| 3250 | hex | `#1e3a5f` | `[class*="hover:bg-[#1e3a5f]"]:hover {` |
| 3251 | hex | `#ffffff` | `color: #ffffff !important;` |
| 3253 | hex | `#0f1b3d` | `[class*="hover:bg-[#0f1b3d]"]:hover .text-white,` |
| 3254 | hex | `#1e3a5f` | `[class*="hover:bg-[#1e3a5f]"]:hover .text-white {` |
| 3255 | hex | `#ffffff` | `color: #ffffff !important;` |
| 3258 | hex | `#0f1b3d` | `/* Dark navy panels rendered via inline style="background:#0f1b3d" */` |
| 3259 | hex | `#0f1b3d` | `[style*="background-color: #0f1b3d"],` |
| 3260 | hex | `#0f1b3d` | `[style*="background:#0f1b3d"],` |
| 3261 | hex | `#1e3a5f` | `[style*="background-color: #1e3a5f"],` |
| 3262 | hex | `#1e3a5f` | `[style*="background:#1e3a5f"],` |
| 3267 | hex | `#ffffff` | `color: #ffffff !important;` |
| 3273 | hex | `#f8fafc` | `color: #f8fafc;` |
| 3276 | hex | `#ffffff` | `color: #ffffff !important;` |
| 3282 | hex | `#ffffff` | `color: #ffffff !important;` |
| 3286 | hex | `#ffffff` | `color: #ffffff !important;` |
| 3291 | hex | `#0a1430` | `.bg-\[\#0a1430\] .btn-primary {` |
| 3292 | rgba | `rgba(20, 184, 166, 0.55)` | `border: 1px solid rgba(20, 184, 166, 0.55);` |
| 3294 | rgba | `rgba(20, 184, 166, 0.18)` | `0 0 0 1px rgba(20, 184, 166, 0.18),` |
| 3295 | rgba | `rgba(20, 184, 166, 0.55)` | `0 14px 36px -14px rgba(20, 184, 166, 0.55),` |
| 3296 | rgba | `rgba(20, 184, 166, 0.35)` | `0 0 24px -8px rgba(20, 184, 166, 0.35);` |
| 3298 | hex | `#0a1430` | `.bg-\[\#0a1430\] .btn-primary:hover {` |
| 3299 | rgba | `rgba(20, 184, 166, 0.85)` | `border-color: rgba(20, 184, 166, 0.85);` |
| 3301 | rgba | `rgba(20, 184, 166, 0.3)` | `0 0 0 1px rgba(20, 184, 166, 0.3),` |
| 3302 | rgba | `rgba(20, 184, 166, 0.7)` | `0 18px 44px -14px rgba(20, 184, 166, 0.7),` |
| 3303 | rgba | `rgba(20, 184, 166, 0.5)` | `0 0 32px -6px rgba(20, 184, 166, 0.5);` |
| 3305 | hex | `#0a1430` | `.bg-\[\#0a1430\] .btn-primary:active {` |
| 3307 | rgba | `rgba(20, 184, 166, 0.95)` | `border-color: rgba(20, 184, 166, 0.95);` |
| 3309 | rgba | `rgba(20, 184, 166, 0.4)` | `0 0 0 1px rgba(20, 184, 166, 0.4),` |
| 3310 | rgba | `rgba(20, 184, 166, 0.6)` | `0 8px 20px -8px rgba(20, 184, 166, 0.6);` |
| 3315 | hex | `#0a1430` | `.bg-\[\#0a1430\] .btn-secondary:hover {` |
| 3316 | hex | `#ffffff` | `background: #ffffff;` |
| 3317 | rgba | `rgba(20, 184, 166, 0.6)` | `border-color: rgba(20, 184, 166, 0.6);` |
| 3318 | rgba | `rgba(20, 184, 166, 0.45)` | `box-shadow: 0 12px 28px -14px rgba(20, 184, 166, 0.45);` |
| 3320 | hex | `#0a1430` | `.bg-\[\#0a1430\] .btn-secondary:hover,` |
| 3321 | hex | `#0a1430` | `.bg-\[\#0a1430\] .btn-secondary:hover * {` |
| 3324 | hex | `#0a1430` | `.bg-\[\#0a1430\] .btn-secondary:active {` |
| 3325 | hex | `#e8edf3` | `background: #e8edf3;` |
| 3330 | hex | `#0a1430` | `#0a1430 backdrop. Skips .btn which already has its own ring. */` |
| 3331 | hex | `#0a1430` | `.bg-\[\#0a1430\] a:not(.btn):focus-visible,` |
| 3332 | hex | `#0a1430` | `.bg-\[\#0a1430\] button:not(.btn):focus-visible {` |
| 3335 | hex | `#0a1430` | `0 0 0 2px #0a1430,` |
| 3336 | hex | `#6fa8e8` | `0 0 0 4px #6fa8e8;` |
| 3353 | hex | `#ffffff` | `background-color: #ffffff;` |
| 3356 | rgba | `rgba(59, 130, 246, 0.35)` | `rgba(59, 130, 246, 0.35),` |
| 3374 | hex | `#6fa8e8` | `outline: 2px solid #6fa8e8;` |
| 3381 | rgba | `rgba(255, 255, 255, 0.75)` | `color: rgba(255, 255, 255, 0.75) !important;` |
| 3384 | rgba | `rgba(255, 255, 255, 0.85)` | `color: rgba(255, 255, 255, 0.85) !important;` |
| 3388 | rgba | `rgba(255, 255, 255, 0.92)` | `color: rgba(255, 255, 255, 0.92) !important;` |
| 3391 | rgba | `rgba(255, 255, 255, 0.7)` | `color: rgba(255, 255, 255, 0.7) !important;` |
| 3395 | hex | `#e2e8f0` | `color: #e2e8f0 !important;` |
| 3399 | hex | `#0f1b3d` | `color: #0f1b3d !important;` |
| 3471 | rgba | `rgba(255, 255, 255, 0.97)` | `background-color: rgba(255, 255, 255, 0.97) !important;` |
| 3481 | hex | `#ffffff` | `background-color: #ffffff;` |
| 3488 | rgba | `rgba(255, 255, 255, 0.6)` | `0 0 0 1px rgba(255, 255, 255, 0.6),` |
| 3495 | hex | `#0a1430` | `.bg-\[\#0a1430\],` |
| 3497 | hex | `#0a1430` | `background-color: #0a1430 !important;` |
| 3504 | hex | `#03060d` | `with very low contrast against #03060d / #070B17. Force readable` |
| 3504 | hex | `#070B17` | `with very low contrast against #03060d / #070B17. Force readable` |
| 3530 | rgba | `rgba(255, 255, 255, 0.88)` | `color: rgba(255, 255, 255, 0.88) !important;` |
| 3539 | rgba | `rgba(255, 255, 255, 0.82)` | `color: rgba(255, 255, 255, 0.82) !important;` |
| 3550 | rgba | `rgba(255, 255, 255, 0.9)` | `color: rgba(255, 255, 255, 0.9) !important;` |
| 3558 | rgba | `rgba(255, 255, 255, 0.82)` | `color: rgba(255, 255, 255, 0.82) !important;` |
| 3562 | rgba | `rgba(255, 255, 255, 0.9)` | `color: rgba(255, 255, 255, 0.9) !important;` |
| 3567 | rgba | `rgba(255, 255, 255, 0.95)` | `color: rgba(255, 255, 255, 0.95) !important;` |
| 3585 | hex | `#ffffff` | `color: #ffffff !important;` |
| 3586 | hex | `#ffffff` | `-webkit-text-fill-color: #ffffff !important;` |
| 3667 | hex | `#ffffff` | `color: #ffffff !important;` |
| 3698 | rgba | `rgba(0, 0, 0, 0.12)` | `border-color: rgba(0, 0, 0, 0.12) !important;` |
| 3715 | rgba | `rgba(7, 11, 22, 1)` | `0 0 0 2px rgba(7, 11, 22, 1),` |
| 3716 | hex | `#5eead4` | `0 0 0 4px color-mix(in oklab, var(--card-accent, #5eead4) 80%, white);` |
| 3736 | rgba | `rgba(255, 255, 255, 0.05)` | `inset 0 1px 0 0 rgba(255, 255, 255, 0.05),` |
| 3737 | rgba | `rgba(0, 0, 0, 0.5)` | `0 8px 24px -12px rgba(0, 0, 0, 0.5) !important;` |
| 3748 | hex | `#070b16` | `background: #070b16;` |
| 3749 | rgba | `rgba(255, 255, 255, 0.08)` | `border-top: 1px solid rgba(255, 255, 255, 0.08);` |
| 3759 | hex | `#0f172a` | `color: #0f172a;` |
| 3765 | hex | `#5eead4` | `color-mix(in oklab, var(--card-accent, #5eead4) 14%, transparent) 0%,` |
| 3768 | hex | `#faf7f0` | `linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.85) 100%), #faf7f0;` |
| 3768 | rgba | `rgba(255, 255, 255, 0.9)` | `linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.85) 100%), #faf7f0;` |
| 3768 | rgba | `rgba(255, 255, 255, 0.85)` | `linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.85) 100%), #faf7f0;` |
| 3769 | rgba | `rgba(15, 23, 42, 0.08)` | `border: 1px solid rgba(15, 23, 42, 0.08);` |
| 3771 | rgba | `rgba(255, 255, 255, 0.9)` | `inset 0 1px 0 0 rgba(255, 255, 255, 0.9),` |
| 3772 | rgba | `rgba(15, 23, 42, 0.2)` | `0 24px 60px -32px rgba(15, 23, 42, 0.2);` |
| 3773 | hex | `#0f172a` | `color: #0f172a;` |
| 3782 | hex | `#0b1220` | `color: #0b1220 !important;` |
| 3791 | hex | `#0f172a` | `color: #0f172a !important;` |
| 3797 | hex | `#4b5563` | `color: #4b5563 !important;` |
| 3800 | rgba | `rgba(15, 23, 42, 0.1)` | `border-color: rgba(15, 23, 42, 0.1) !important;` |
| 3803 | rgba | `rgba(15, 23, 42, 0.04)` | `background-color: rgba(15, 23, 42, 0.04) !important;` |
| 3815 | hex | `#5eead4` | `color-mix(in oklab, #5eead4 14%, transparent) 0%,` |
| 3820 | hex | `#a78bfa` | `color-mix(in oklab, #a78bfa 12%, transparent) 0%,` |
| 3825 | hex | `#a3e635` | `color-mix(in oklab, #a3e635 8%, transparent) 0%,` |
| 3828 | hex | `#0a0f1f` | `linear-gradient(180deg, #0a0f1f 0%, #0b1226 50%, #0a0f1f 100%);` |
| 3828 | hex | `#0b1226` | `linear-gradient(180deg, #0a0f1f 0%, #0b1226 50%, #0a0f1f 100%);` |
| 3828 | hex | `#0a0f1f` | `linear-gradient(180deg, #0a0f1f 0%, #0b1226 50%, #0a0f1f 100%);` |
| 3839 | hex | `#a78bfa` | `color-mix(in oklab, #a78bfa 18%, transparent) 0%,` |
| 3844 | hex | `#5eead4` | `color-mix(in oklab, #5eead4 14%, transparent) 0%,` |
| 3847 | rgba | `rgba(255, 255, 255, 0.06)` | `linear-gradient(160deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%),` |
| 3847 | rgba | `rgba(255, 255, 255, 0.02)` | `linear-gradient(160deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%),` |
| 3848 | rgba | `rgba(20, 26, 46, 0.7)` | `rgba(20, 26, 46, 0.7);` |
| 3849 | rgba | `rgba(255, 255, 255, 0.09)` | `border: 1px solid rgba(255, 255, 255, 0.09);` |
| 3851 | rgba | `rgba(255, 255, 255, 0.08)` | `inset 0 1px 0 0 rgba(255, 255, 255, 0.08),` |
| 3852 | rgba | `rgba(94, 234, 212, 0.35)` | `0 40px 120px -40px rgba(94, 234, 212, 0.35),` |
| 3853 | rgba | `rgba(0, 0, 0, 0.6)` | `0 20px 60px -30px rgba(0, 0, 0, 0.6);` |
| 3860 | hex | `#5eead4` | `color-mix(in oklab, var(--card-accent, #5eead4) 6%, transparent) 0%,` |
| 3863 | hex | `#141a2e` | `linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%), #141a2e;` |
| 3863 | rgba | `rgba(255, 255, 255, 0.03)` | `linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%), #141a2e;` |
| 3863 | rgba | `rgba(255, 255, 255, 0.01)` | `linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%), #141a2e;` |
| 3864 | rgba | `rgba(255, 255, 255, 0.07)` | `border: 1px solid rgba(255, 255, 255, 0.07);` |
| 3875 | rgba | `rgba(255, 255, 255, 0.08)` | `scrollbar-color: rgba(255, 255, 255, 0.08) transparent;` |
| 3886 | rgba | `rgba(230, 251, 246, 0.06)` | `background: rgba(230, 251, 246, 0.06);` |
| 3890 | rgba | `rgba(94, 234, 212, 0.28)` | `background: rgba(94, 234, 212, 0.28);` |
| 3900 | rgba | `rgba(230, 251, 246, 0.42)` | `color: rgba(230, 251, 246, 0.42);` |
| 3915 | rgba | `rgba(230, 251, 246, 0.68)` | `color: rgba(230, 251, 246, 0.68);` |
| 3923 | rgba | `rgba(230, 251, 246, 0.045)` | `background: rgba(230, 251, 246, 0.045);` |
| 3924 | rgba | `rgba(230, 251, 246, 0.98)` | `color: rgba(230, 251, 246, 0.98);` |
| 3927 | hex | `#5eead4` | `background: color-mix(in oklab, #5eead4 6%, transparent);` |
| 3928 | hex | `#eafdf7` | `color: #eafdf7;` |
| 3929 | hex | `#5eead4` | `border-color: color-mix(in oklab, #5eead4 16%, transparent);` |
| 3933 | rgba | `rgba(230, 251, 246, 0.55)` | `color: rgba(230, 251, 246, 0.55);` |
| 3947 | rgba | `rgba(230, 251, 246, 0.38)` | `color: rgba(230, 251, 246, 0.38);` |
| 3951 | hex | `#5eead4` | `color: #5eead4;` |
| 3955 | rgba | `rgba(94, 234, 212, 0.55)` | `color: rgba(94, 234, 212, 0.55);` |
| 3963 | rgba | `rgba(230, 251, 246, 0.08)` | `background: rgba(230, 251, 246, 0.08);` |
| 3968 | hex | `#5eead4` | `background: #5eead4;` |
| 3969 | rgba | `rgba(94, 234, 212, 0.45)` | `box-shadow: 0 0 8px 0 rgba(94, 234, 212, 0.45);` |
| 3980 | hex | `#0a0f1f` | `background: color-mix(in oklab, #0a0f1f 85%, transparent);` |
| 3981 | rgba | `rgba(255, 255, 255, 0.08)` | `border: 1px solid rgba(255, 255, 255, 0.08);` |
| 3990 | rgba | `rgba(15, 22, 38, 0.85)` | `linear-gradient(180deg, rgba(15, 22, 38, 0.85) 0%, rgba(15, 22, 38, 0) 100%),` |
| 3990 | rgba | `rgba(15, 22, 38, 0)` | `linear-gradient(180deg, rgba(15, 22, 38, 0.85) 0%, rgba(15, 22, 38, 0) 100%),` |
| 3991 | rgba | `rgba(7, 11, 22, 0.6)` | `rgba(7, 11, 22, 0.6);` |
| 3992 | rgba | `rgba(230, 251, 246, 0.08)` | `border: 1px solid rgba(230, 251, 246, 0.08);` |
| 4000 | rgba | `rgba(255, 255, 255, 0.08)` | `background: rgba(255, 255, 255, 0.08);` |
| 4001 | rgba | `rgba(255, 255, 255, 0.12)` | `border: 1px solid rgba(255, 255, 255, 0.12);` |
| 4003 | hex | `#a3e635` | `background: linear-gradient(135deg, #a3e635, #5eead4);` |
| 4003 | hex | `#5eead4` | `background: linear-gradient(135deg, #a3e635, #5eead4);` |
| 4005 | rgba | `rgba(163, 230, 53, 0.55)` | `box-shadow: 0 0 12px 0 rgba(163, 230, 53, 0.55);` |
| 4010 | rgba | `rgba(255, 255, 255, 0.02)` | `background-color: rgba(255, 255, 255, 0.02);` |
| 4011 | rgba | `rgba(255, 255, 255, 0.1)` | `border: 1px solid rgba(255, 255, 255, 0.1);` |
| 4013 | rgba | `rgba(255, 255, 255, 0.05)` | `box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05);` |
| 4017 | rgba | `rgba(10, 12, 16, 0.6)` | `background-color: rgba(10, 12, 16, 0.6);` |
| 4018 | rgba | `rgba(255, 255, 255, 0.08)` | `border: 1px solid rgba(255, 255, 255, 0.08);` |
| 4021 | rgba | `rgba(255, 255, 255, 0.02)` | `inset 0 0 0 1px rgba(255, 255, 255, 0.02),` |
| 4022 | rgba | `rgba(0, 0, 0, 0.5)` | `0 20px 40px -10px rgba(0, 0, 0, 0.5);` |
| 4028 | rgba | `rgba(255, 255, 255, 0.04)` | `background-color: rgba(255, 255, 255, 0.04);` |
| 4029 | rgba | `rgba(255, 255, 255, 0.2)` | `border-color: rgba(255, 255, 255, 0.2);` |
| 4031 | rgba | `rgba(255, 255, 255, 0.1)` | `inset 0 0 0 1px rgba(255, 255, 255, 0.1),` |
| 4032 | rgba | `rgba(255, 255, 255, 0.05)` | `0 0 20px 0 rgba(255, 255, 255, 0.05);` |
| 4040 | hex | `#0f172a` | `background-color: #0f172a !important;` |
| 4041 | hex | `#f8fafc` | `color: #f8fafc !important;` |
| 4044 | hex | `#f8fafc` | `color: #f8fafc !important;` |
| 4047 | hex | `#cbd5e1` | `color: #cbd5e1 !important;` |
| 4050 | hex | `#0f172a` | `background-color: #0f172a !important;` |
| 4053 | rgba | `rgba(255, 255, 255, 0.05)` | `background-color: rgba(255, 255, 255, 0.05) !important;` |
| 4122 | hex | `#071A4A` | `--arzon-ui-ink: #071A4A;` |
| 4123 | hex | `#334155` | `--arzon-ui-body: #334155;` |
| 4124 | hex | `#64748B` | `--arzon-ui-muted: #64748B;` |
| 4125 | hex | `#D9E2EC` | `--arzon-ui-line: #D9E2EC;` |
| 4126 | hex | `#FFFFFF` | `--arzon-ui-surface: #FFFFFF;` |
| 4127 | hex | `#F7F9FC` | `--arzon-ui-page: #F7F9FC;` |
| 4128 | hex | `#1557B0` | `--arzon-ui-primary: #1557B0;` |
| 4129 | hex | `#0F438B` | `--arzon-ui-primary-hover: #0F438B;` |
| 4130 | hex | `#FFFFFF` | `--arzon-ui-primary-contrast: #FFFFFF;` |
| 4131 | hex | `#071A4A` | `--arzon-ui-dark: #071A4A;` |
| 4132 | hex | `#FFFFFF` | `--arzon-ui-dark-text: #FFFFFF;` |
| 4133 | hex | `#2563EB` | `--arzon-ui-focus: #2563EB;` |
| 4175 | hex | `#fff` | `color: #fff !important;` |
| 4176 | hex | `#fff` | `-webkit-text-fill-color: #fff !important;` |
| 4187 | hex | `#fff` | `color: #fff !important;` |
| 4188 | hex | `#fff` | `-webkit-text-fill-color: #fff !important;` |
| 4205 | hex | `#B8C5D6` | `border: 1px solid #B8C5D6;` |
| 4207 | hex | `#fff` | `background: #fff;` |
| 4220 | hex | `#3B82F6` | `background: #3B82F6;` |
| 4221 | hex | `#fff` | `color: #fff !important;` |
| 4222 | hex | `#fff` | `-webkit-text-fill-color: #fff !important;` |
| 4226 | hex | `#fff` | `background: #fff;` |
| 4242 | hex | `#fff` | `color: #fff !important;` |
| 4243 | hex | `#fff` | `-webkit-text-fill-color: #fff !important;` |
| 4273 | hex | `#fff` | `color: #fff !important;` |
| 4274 | hex | `#fff` | `-webkit-text-fill-color: #fff !important;` |
| 4279 | hex | `#B8C5D6` | `border-color: #B8C5D6;` |
| 4280 | hex | `#fff` | `background: #fff;` |
| 4285 | hex | `#64748B` | `color: #64748B !important;` |
| 4291 | rgba | `rgba(37,99,235,.14)` | `box-shadow: 0 0 0 3px rgba(37,99,235,.14);` |
| 4294 | hex | `#0B255A` | `background: #0B255A;` |
| 4295 | hex | `#365887` | `border-color: #365887;` |
| 4296 | hex | `#fff` | `color: #fff !important;` |
| 4297 | hex | `#fff` | `-webkit-text-fill-color: #fff !important;` |
| 4300 | hex | `#B7C7DD` | `color: #B7C7DD !important;` |
| 4304 | rgba | `rgba(37,99,235,.42)` | `outline: 3px solid rgba(37,99,235,.42) !important;` |
| 4328 | hex | `#fff` | `color: #fff !important;` |
| 4329 | hex | `#fff` | `-webkit-text-fill-color: #fff !important;` |
| 4336 | hex | `#071A4A` | `background: #071A4A !important;` |
| 4337 | hex | `#FFFFFF` | `color: #FFFFFF !important;` |
| 4338 | hex | `#173B78` | `border-color: #173B78 !important;` |
| 4350 | hex | `#CBD5E1` | `color: #CBD5E1 !important;` |
| 4351 | hex | `#CBD5E1` | `-webkit-text-fill-color: #CBD5E1 !important;` |
| 4354 | hex | `#94A3B8` | `color: #94A3B8 !important;` |
| 4355 | hex | `#94A3B8` | `-webkit-text-fill-color: #94A3B8 !important;` |
| 4366 | hex | `#FFFFFF` | `color: #FFFFFF !important;` |
| 4367 | hex | `#FFFFFF` | `-webkit-text-fill-color: #FFFFFF !important;` |
| 4370 | rgba | `rgba(255,255,255,.06)` | `background-color: rgba(255,255,255,.06) !important;` |
| 4373 | rgba | `rgba(255,255,255,.14)` | `border-color: rgba(255,255,255,.14) !important;` |
| 4376 | hex | `#FFFFFF` | `background: #FFFFFF !important;` |
| 4377 | hex | `#071A4A` | `color: #071A4A !important;` |
| 4378 | hex | `#071A4A` | `-webkit-text-fill-color: #071A4A !important;` |
| 4381 | hex | `#EFF6FF` | `background: #EFF6FF !important;` |
| 4399 | hex | `#ffffff` | `--card: #ffffff;` |
| 4400 | hex | `#ffffff` | `--popover: #ffffff;` |
| 4401 | hex | `#ffffff` | `--background: #ffffff;` |
| 4405 | hex | `#ffffff` | `--primary-foreground: #ffffff;` |
| 4419 | hex | `#ffffff` | `--card: #ffffff;` |
| 4420 | hex | `#ffffff` | `--popover: #ffffff;` |
| 4421 | hex | `#ffffff` | `--background: #ffffff;` |
| 4425 | hex | `#ffffff` | `--primary-foreground: #ffffff;` |
| 4434 | hex | `#FFFFFF` | `color: #FFFFFF !important;` |
| 4435 | hex | `#FFFFFF` | `-webkit-text-fill-color: #FFFFFF !important;` |
| 4439 | hex | `#FFFFFF` | `background-color: #FFFFFF !important;` |
| 4440 | hex | `#071A3F` | `color: #071A3F !important;` |
| 4441 | hex | `#071A3F` | `-webkit-text-fill-color: #071A3F !important;` |
| 4445 | hex | `#EFF6FF` | `background-color: #EFF6FF !important;` |
| 4446 | hex | `#071A3F` | `color: #071A3F !important;` |
| 4447 | hex | `#071A3F` | `-webkit-text-fill-color: #071A3F !important;` |
| 4453 | hex | `#071A3F` | `color: #071A3F !important;` |
| 4454 | hex | `#071A3F` | `-webkit-text-fill-color: #071A3F !important;` |
| 4456 | hex | `#1557B0` | `.home-v3 .home-report-card .text-blue-700 { color: #1557B0 !important; -webkit-text-fill-color: #1557B0 !important; }` |
| 4456 | hex | `#1557B0` | `.home-v3 .home-report-card .text-blue-700 { color: #1557B0 !important; -webkit-text-fill-color: #1557B0 !important; }` |
| 4457 | hex | `#047857` | `.home-v3 .home-report-card .text-emerald-700 { color: #047857 !important; -webkit-text-fill-color: #047857 !important; }` |
| 4457 | hex | `#047857` | `.home-v3 .home-report-card .text-emerald-700 { color: #047857 !important; -webkit-text-fill-color: #047857 !important; }` |
| 4458 | hex | `#64748B` | `.home-v3 .home-report-card .text-slate-400 { color: #64748B !important; -webkit-text-fill-color: #64748B !important; }` |
| 4458 | hex | `#64748B` | `.home-v3 .home-report-card .text-slate-400 { color: #64748B !important; -webkit-text-fill-color: #64748B !important; }` |
| 4459 | hex | `#1E293B` | `.home-v3 .home-report-card .text-slate-800 { color: #1E293B !important; -webkit-text-fill-color: #1E293B !important; }` |
| 4459 | hex | `#1E293B` | `.home-v3 .home-report-card .text-slate-800 { color: #1E293B !important; -webkit-text-fill-color: #1E293B !important; }` |
| 4475 | hex | `#071a3f` | `--ap-navy: #071a3f;` |
| 4476 | hex | `#0b2557` | `--ap-navy-2: #0b2557;` |
| 4477 | hex | `#1557b0` | `--ap-blue: #1557b0;` |
| 4478 | hex | `#37d8e9` | `--ap-cyan: #37d8e9;` |
| 4479 | hex | `#0b1733` | `--ap-ink: #0b1733;` |
| 4480 | hex | `#5b687d` | `--ap-muted: #5b687d;` |
| 4481 | hex | `#e4e9f0` | `--ap-line: #e4e9f0;` |
| 4482 | hex | `#ffffff` | `--ap-paper: #ffffff;` |
| 4483 | hex | `#f5f8fc` | `--ap-soft: #f5f8fc;` |
| 4484 | hex | `#eafafa` | `--ap-teal-soft: #eafafa;` |
| 4486 | hex | `#fff` | `background: #fff;` |
| 4510 | rgba | `rgba(50, 107, 210, .25)` | `radial-gradient(900px 600px at 78% 10%, rgba(50, 107, 210, .25), transparent 60%),` |
| 4511 | rgba | `rgba(34, 197, 202, .16)` | `radial-gradient(650px 520px at 5% 95%, rgba(34, 197, 202, .16), transparent 62%),` |
| 4513 | hex | `#fff` | `color: #fff;` |
| 4522 | rgba | `rgba(64, 129, 255, .12)` | `.ap-hero-glow-one { width: 260px; height: 260px; right: 9%; top: 12%; background: rgba(64, 129, 255, .12); }` |
| 4523 | rgba | `rgba(39, 211, 205, .1)` | `.ap-hero-glow-two { width: 340px; height: 340px; left: -150px; bottom: -170px; background: rgba(39, 211, 205, .1); }` |
| 4556 | rgba | `rgba(255,255,255,.16)` | `border: 1px solid rgba(255,255,255,.16);` |
| 4558 | rgba | `rgba(255,255,255,.07)` | `background: rgba(255,255,255,.07);` |
| 4559 | hex | `#d8e9ff` | `color: #d8e9ff;` |
| 4566 | hex | `#8fa7c8` | `color: #8fa7c8;` |
| 4573 | hex | `#fff` | `color: #fff !important;` |
| 4574 | hex | `#fff` | `-webkit-text-fill-color: #fff !important;` |
| 4591 | hex | `#c6d4e7` | `color: #c6d4e7 !important;` |
| 4592 | hex | `#c6d4e7` | `-webkit-text-fill-color: #c6d4e7 !important;` |
| 4620 | hex | `#fff` | `background: #fff !important;` |
| 4623 | rgba | `rgba(0,0,0,.8)` | `box-shadow: 0 18px 36px -20px rgba(0,0,0,.8);` |
| 4625 | hex | `#eef6ff` | `.ap-btn-primary:hover { background: #eef6ff !important; }` |
| 4628 | rgba | `rgba(255,255,255,.2)` | `border: 1px solid rgba(255,255,255,.2);` |
| 4629 | rgba | `rgba(255,255,255,.07)` | `background: rgba(255,255,255,.07);` |
| 4630 | hex | `#fff` | `color: #fff !important;` |
| 4631 | hex | `#fff` | `-webkit-text-fill-color: #fff !important;` |
| 4633 | rgba | `rgba(255,255,255,.12)` | `.ap-btn-secondary:hover { background: rgba(255,255,255,.12); }` |
| 4637 | hex | `#fff` | `color: #fff !important;` |
| 4638 | rgba | `rgba(7,26,63,.8)` | `box-shadow: 0 14px 30px -20px rgba(7,26,63,.8);` |
| 4641 | hex | `#fff` | `background: #fff;` |
| 4643 | rgba | `rgba(0,0,0,.55)` | `box-shadow: 0 16px 34px -22px rgba(0,0,0,.55);` |
| 4645 | hex | `#edf7ff` | `.ap-btn-light:hover { background: #edf7ff; }` |
| 4654 | rgba | `rgba(255,255,255,.12)` | `border-top: 1px solid rgba(255,255,255,.12);` |
| 4659 | rgba | `rgba(255,255,255,.12)` | `border-left: 1px solid rgba(255,255,255,.12);` |
| 4664 | hex | `#fff` | `color: #fff !important;` |
| 4672 | hex | `#8fa7c8` | `color: #8fa7c8 !important;` |
| 4683 | rgba | `rgba(255,255,255,.18)` | `border: 1px solid rgba(255,255,255,.18);` |
| 4685 | rgba | `rgba(255,255,255,.08)` | `background: rgba(255,255,255,.08);` |
| 4686 | rgba | `rgba(0,0,0,.9)` | `box-shadow: 0 40px 100px -45px rgba(0,0,0,.9);` |
| 4702 | rgba | `rgba(4,16,39,.65)` | `background: linear-gradient(180deg, transparent 50%, rgba(4,16,39,.65) 100%);` |
| 4713 | rgba | `rgba(255,255,255,.18)` | `border: 1px solid rgba(255,255,255,.18);` |
| 4715 | rgba | `rgba(7,26,63,.58)` | `background: rgba(7,26,63,.58);` |
| 4716 | hex | `#fff` | `color: #fff !important;` |
| 4723 | hex | `#34d399` | `.ap-live-chip span { width: 7px; height: 7px; border-radius: 50%; background: #34d399; box-shadow: 0 0 0 4px rgba(52,211,153,.12); }` |
| 4723 | rgba | `rgba(52,211,153,.12)` | `.ap-live-chip span { width: 7px; height: 7px; border-radius: 50%; background: #34d399; box-shadow: 0 0 0 4px rgba(52,211,153,.12); }` |
| 4732 | rgba | `rgba(255,255,255,.14)` | `border: 1px solid rgba(255,255,255,.14);` |
| 4734 | hex | `#10376f` | `background: #10376f;` |
| 4735 | hex | `#fff` | `color: #fff !important;` |
| 4736 | rgba | `rgba(0,0,0,.75)` | `box-shadow: 0 24px 50px -25px rgba(0,0,0,.75);` |
| 4738 | hex | `#b9d0ef` | `.ap-fit-label { color: #b9d0ef !important; font-size: 9px; font-weight: 800; letter-spacing: .16em; }` |
| 4740 | hex | `#fff` | `.ap-fit-score strong { color: #fff !important; font-size: 34px; line-height: 1; }` |
| 4741 | hex | `#56e2a8` | `.ap-fit-score span { color: #56e2a8 !important; font-size: 12px; font-weight: 800; }` |
| 4742 | rgba | `rgba(255,255,255,.13)` | `.ap-fit-bar { height: 7px; margin-top: 13px; overflow: hidden; border-radius: 999px; background: rgba(255,255,255,.13); }` |
| 4743 | hex | `#45d9ef` | `.ap-fit-bar i { display: block; width: 82%; height: 100%; border-radius: inherit; background: linear-gradient(90deg,#45d9ef,#55e1ad); }` |
| 4743 | hex | `#55e1ad` | `.ap-fit-bar i { display: block; width: 82%; height: 100%; border-radius: inherit; background: linear-gradient(90deg,#45d9ef,#55e1ad); }` |
| 4752 | rgba | `rgba(11,23,51,.08)` | `border: 1px solid rgba(11,23,51,.08);` |
| 4754 | hex | `#fff` | `background: #fff !important;` |
| 4756 | rgba | `rgba(0,0,0,.55)` | `box-shadow: 0 25px 60px -28px rgba(0,0,0,.55);` |
| 4759 | hex | `#68809f` | `.ap-report-top small { color: #68809f !important; font-size: 8px; font-weight: 850; letter-spacing: .15em; }` |
| 4761 | hex | `#e8fbf1` | `.ap-match { padding: 6px 9px; border-radius: 999px; background: #e8fbf1; color: #08734b !important; font-size: 8px; font-weight: 850; text-transform: uppercase; letter-spacing: .08` |
| 4761 | hex | `#08734b` | `.ap-match { padding: 6px 9px; border-radius: 999px; background: #e8fbf1; color: #08734b !important; font-size: 8px; font-weight: 850; text-transform: uppercase; letter-spacing: .08` |
| 4763 | hex | `#f6f8fb` | `.ap-report-grid > div { padding: 10px; border-radius: 13px; background: #f6f8fb; }` |
| 4765 | hex | `#78869a` | `.ap-report-grid small { display: block; color: #78869a !important; font-size: 8px; font-weight: 800; letter-spacing: .1em; }` |
| 4766 | hex | `#18243a` | `.ap-report-grid strong { display: block; margin-top: 4px; color: #18243a !important; font-size: 13px; }` |
| 4767 | hex | `#2563eb` | `.ap-blue { background: #2563eb; }` |
| 4768 | hex | `#8b5cf6` | `.ap-purple { background: #8b5cf6; }` |
| 4769 | hex | `#f97316` | `.ap-orange { background: #f97316; }` |
| 4780 | hex | `#e6ebf2` | `border: 1px solid #e6ebf2;` |
| 4782 | hex | `#fff` | `background: #fff;` |
| 4784 | rgba | `rgba(0,0,0,.5)` | `box-shadow: 0 20px 45px -25px rgba(0,0,0,.5);` |
| 4786 | hex | `#edf4ff` | `.ap-time-icon { display: grid; place-items: center; width: 35px; height: 35px; border-radius: 11px; background: #edf4ff; color: #1557b0; }` |
| 4786 | hex | `#1557b0` | `.ap-time-icon { display: grid; place-items: center; width: 35px; height: 35px; border-radius: 11px; background: #edf4ff; color: #1557b0; }` |
| 4787 | hex | `#77869a` | `.ap-time-card small { display: block; color: #77869a; font-size: 8px; font-weight: 800; letter-spacing: .12em; }` |
| 4790 | rgba | `rgba(255,255,255,.1)` | `.ap-proof-bar { border-top: 1px solid rgba(255,255,255,.1); background: rgba(2,12,31,.45); }` |
| 4790 | rgba | `rgba(2,12,31,.45)` | `.ap-proof-bar { border-top: 1px solid rgba(255,255,255,.1); background: rgba(2,12,31,.45); }` |
| 4792 | hex | `#8fa7c8` | `.ap-proof-inner span { color: #8fa7c8; font-size: 11px; }` |
| 4793 | hex | `#fff` | `.ap-proof-inner b { color: #fff; font-size: 11px; }` |
| 4796 | hex | `#fff` | `.ap-white { background: #fff; }` |
| 4797 | hex | `#f4f8fd` | `.ap-tint { background: #f4f8fd; }` |
| 4798 | hex | `#1557b0` | `.ap-kicker { color: #1557b0; }` |
| 4799 | hex | `#73e4ed` | `.ap-kicker-light { color: #73e4ed; }` |
| 4816 | hex | `#1557b0` | `.ap-text-link { display: inline-flex; align-items: center; gap: 7px; color: #1557b0 !important; font-size: 13px; font-weight: 800; white-space: nowrap; }` |
| 4820 | hex | `#fff` | `.ap-role-card { overflow: hidden; border: 1px solid var(--ap-line); border-radius: 22px; background: #fff; box-shadow: 0 10px 35px -28px rgba(11,23,51,.5); transition: transform .2` |
| 4820 | rgba | `rgba(11,23,51,.5)` | `.ap-role-card { overflow: hidden; border: 1px solid var(--ap-line); border-radius: 22px; background: #fff; box-shadow: 0 10px 35px -28px rgba(11,23,51,.5); transition: transform .2` |
| 4821 | hex | `#c8d8ec` | `.ap-role-card:hover { transform: translateY(-5px); border-color: #c8d8ec; box-shadow: 0 28px 55px -35px rgba(11,23,51,.55); }` |
| 4821 | rgba | `rgba(11,23,51,.55)` | `.ap-role-card:hover { transform: translateY(-5px); border-color: #c8d8ec; box-shadow: 0 28px 55px -35px rgba(11,23,51,.55); }` |
| 4825 | rgba | `rgba(7,26,63,.05)` | `.ap-role-image-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(7,26,63,.05), rgba(7,26,63,.78)); }` |
| 4825 | rgba | `rgba(7,26,63,.78)` | `.ap-role-image-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(7,26,63,.05), rgba(7,26,63,.78)); }` |
| 4826 | rgba | `rgba(255,255,255,.72)` | `.ap-role-image-wrap > span { position: absolute; left: 18px; bottom: 45px; color: rgba(255,255,255,.72); font-size: 8px; font-weight: 850; letter-spacing: .15em; }` |
| 4827 | hex | `#fff` | `.ap-role-image-wrap > strong { position: absolute; left: 18px; bottom: 17px; color: #fff !important; font-size: 17px; font-weight: 850; }` |
| 4828 | hex | `#fff` | `.ap-role-image-wrap > i { position: absolute; right: 17px; bottom: 15px; display: grid; place-items: center; width: 35px; height: 35px; border-radius: 50%; background: rgba(255,255` |
| 4828 | rgba | `rgba(255,255,255,.16)` | `.ap-role-image-wrap > i { position: absolute; right: 17px; bottom: 15px; display: grid; place-items: center; width: 35px; height: 35px; border-radius: 50%; background: rgba(255,255` |
| 4833 | hex | `#f5f7fa` | `.ap-role-tags span { padding: 6px 9px; border-radius: 999px; background: #f5f7fa; color: #627187 !important; font-size: 9px; font-weight: 800; }` |
| 4833 | hex | `#627187` | `.ap-role-tags span { padding: 6px 9px; border-radius: 999px; background: #f5f7fa; color: #627187 !important; font-size: 9px; font-weight: 800; }` |
| 4837 | hex | `#dce5ef` | `.ap-step-list { border-top: 1px solid #dce5ef; }` |
| 4838 | hex | `#dce5ef` | `.ap-step { display: grid; grid-template-columns: 50px 1fr 22px; gap: 18px; align-items: center; padding: 23px 0; border-bottom: 1px solid #dce5ef; }` |
| 4839 | hex | `#8ba0ba` | `.ap-step > span { color: #8ba0ba; font-family: var(--font-mono); font-size: 11px; font-weight: 800; }` |
| 4842 | hex | `#16a67a` | `.ap-step-check { color: #16a67a; }` |
| 4845 | hex | `#fff` | `.ap-benefit-card { padding: 28px; border: 1px solid var(--ap-line); border-radius: 20px; background: #fff; }` |
| 4846 | hex | `#1557b0` | `.ap-benefit-icon { width: 24px; height: 24px; color: #1557b0; }` |
| 4850 | hex | `#fff` | `.ap-navy { background: var(--ap-navy); color: #fff; }` |
| 4852 | hex | `#fff` | `.ap-navy h2 { color: #fff !important; -webkit-text-fill-color: #fff !important; }` |
| 4852 | hex | `#fff` | `.ap-navy h2 { color: #fff !important; -webkit-text-fill-color: #fff !important; }` |
| 4853 | hex | `#b8cbe3` | `.ap-navy p { margin: 18px 0 27px; color: #b8cbe3 !important; font-size: 16px; line-height: 1.65; }` |
| 4855 | rgba | `rgba(255,255,255,.12)` | `.ap-navy-stats div { padding: 24px; border: 1px solid rgba(255,255,255,.12); border-radius: 18px; background: rgba(255,255,255,.05); }` |
| 4855 | rgba | `rgba(255,255,255,.05)` | `.ap-navy-stats div { padding: 24px; border: 1px solid rgba(255,255,255,.12); border-radius: 18px; background: rgba(255,255,255,.05); }` |
| 4856 | hex | `#fff` | `.ap-navy-stats strong { display: block; color: #fff !important; font-size: 28px; font-weight: 850; }` |
| 4857 | hex | `#91a9c8` | `.ap-navy-stats span { display: block; margin-top: 6px; color: #91a9c8 !important; font-size: 10px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }` |
| 4860 | hex | `#f7f9fc` | `.ap-rating { min-width: 185px; padding: 16px 18px; border: 1px solid var(--ap-line); border-radius: 16px; background: #f7f9fc; }` |
| 4863 | hex | `#f4b740` | `.ap-star { width: 14px; height: 14px; fill: #f4b740; color: #f4b740; }` |
| 4863 | hex | `#f4b740` | `.ap-star { width: 14px; height: 14px; fill: #f4b740; color: #f4b740; }` |
| 4864 | hex | `#718097` | `.ap-rating > span { display: block; margin-top: 5px; color: #718097; font-size: 9px; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; }` |
| 4866 | hex | `#fff` | `.ap-review { padding: 26px; border: 1px solid var(--ap-line); border-radius: 20px; background: #fff; }` |
| 4868 | hex | `#34425a` | `.ap-review p { min-height: 115px; margin: 18px 0 22px; color: #34425a !important; font-size: 14px; line-height: 1.7; }` |
| 4870 | hex | `#8390a2` | `.ap-review > span { display: block; margin-top: 5px; color: #8390a2 !important; font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; }` |
| 4872 | hex | `#071a3f` | `.ap-final { padding: 76px 0; background: linear-gradient(135deg, #071a3f, #0d3971); color: #fff; }` |
| 4872 | hex | `#0d3971` | `.ap-final { padding: 76px 0; background: linear-gradient(135deg, #071a3f, #0d3971); color: #fff; }` |
| 4872 | hex | `#fff` | `.ap-final { padding: 76px 0; background: linear-gradient(135deg, #071a3f, #0d3971); color: #fff; }` |
| 4874 | hex | `#fff` | `.ap-final h2 { color: #fff !important; -webkit-text-fill-color: #fff !important; max-width: 680px; }` |
| 4874 | hex | `#fff` | `.ap-final h2 { color: #fff !important; -webkit-text-fill-color: #fff !important; max-width: 680px; }` |
| 4875 | hex | `#c2d4e9` | `.ap-final p { max-width: 620px; margin: 15px 0 0; color: #c2d4e9 !important; font-size: 15px; line-height: 1.65; }` |
| 4925 | hex | `#071a3f` | `--ah5-navy: #071a3f;` |
| 4926 | hex | `#0c2858` | `--ah5-navy-soft: #0c2858;` |
| 4927 | hex | `#1557b0` | `--ah5-blue: #1557b0;` |
| 4928 | hex | `#4de0ef` | `--ah5-cyan: #4de0ef;` |
| 4929 | hex | `#0b1733` | `--ah5-ink: #0b1733;` |
| 4930 | hex | `#b9c9dd` | `--ah5-muted: #b9c9dd;` |
| 4931 | rgba | `rgba(255,255,255,.14)` | `--ah5-line: rgba(255,255,255,.14);` |
| 4936 | rgba | `rgba(36,91,180,.30)` | `radial-gradient(720px 480px at 78% 42%, rgba(36,91,180,.30), transparent 66%),` |
| 4937 | hex | `#061736` | `linear-gradient(120deg, #061736 0%, #081f49 54%, #0b2a5d 100%);` |
| 4937 | hex | `#081f49` | `linear-gradient(120deg, #061736 0%, #081f49 54%, #0b2a5d 100%);` |
| 4937 | hex | `#0b2a5d` | `linear-gradient(120deg, #061736 0%, #081f49 54%, #0b2a5d 100%);` |
| 4938 | hex | `#fff` | `color: #fff;` |
| 4970 | rgba | `rgba(255,255,255,.14)` | `border: 1px solid rgba(255,255,255,.14);` |
| 4972 | rgba | `rgba(255,255,255,.05)` | `background: rgba(255,255,255,.05);` |
| 4973 | hex | `#7dd3fc` | `color: #7dd3fc !important;` |
| 4974 | hex | `#7dd3fc` | `-webkit-text-fill-color: #7dd3fc !important;` |
| 4985 | hex | `#38bdf8` | `color: #38bdf8;` |
| 4991 | hex | `#fff` | `color: #fff !important;` |
| 4992 | hex | `#fff` | `-webkit-text-fill-color: #fff !important;` |
| 5001 | hex | `#38bdf8` | `color: #38bdf8 !important;` |
| 5002 | hex | `#38bdf8` | `-webkit-text-fill-color: #38bdf8 !important;` |
| 5008 | hex | `#c3d1e4` | `color: #c3d1e4 !important;` |
| 5009 | hex | `#c3d1e4` | `-webkit-text-fill-color: #c3d1e4 !important;` |
| 5032 | hex | `#fff` | `background: #fff !important;` |
| 5033 | hex | `#071a3f` | `color: #071a3f !important;` |
| 5034 | hex | `#071a3f` | `-webkit-text-fill-color: #071a3f !important;` |
| 5035 | rgba | `rgba(0,0,0,.85)` | `box-shadow: 0 16px 36px -18px rgba(0,0,0,.85);` |
| 5036 | rgba | `rgba(255,255,255,.9)` | `border: 1px solid rgba(255,255,255,.9);` |
| 5040 | rgba | `rgba(255,255,255,.24)` | `border: 1px solid rgba(255,255,255,.24) !important;` |
| 5041 | rgba | `rgba(255,255,255,.06)` | `background: rgba(255,255,255,.06) !important;` |
| 5042 | hex | `#fff` | `color: #fff !important;` |
| 5043 | hex | `#fff` | `-webkit-text-fill-color: #fff !important;` |
| 5051 | hex | `#f8fafc` | `.ah5-primary:hover { background: #f8fafc !important; }` |
| 5052 | rgba | `rgba(255,255,255,.12)` | `.ah5-secondary:hover { background: rgba(255,255,255,.12) !important; }` |
| 5060 | rgba | `rgba(255,255,255,.10)` | `border-top: 1px solid rgba(255,255,255,.10);` |
| 5067 | rgba | `rgba(255,255,255,.12)` | `border-left: 1px solid rgba(255,255,255,.12);` |
| 5077 | hex | `#fff` | `color: #fff !important;` |
| 5078 | hex | `#fff` | `-webkit-text-fill-color: #fff !important;` |
| 5089 | hex | `#94a3b8` | `color: #94a3b8 !important;` |
| 5090 | hex | `#94a3b8` | `-webkit-text-fill-color: #94a3b8 !important;` |
| 5109 | rgba | `rgba(255,255,255,.14)` | `border: 1px solid rgba(255,255,255,.14);` |
| 5112 | rgba | `rgba(0,0,0,.85)` | `box-shadow: 0 32px 80px -30px rgba(0,0,0,.85);` |
| 5130 | rgba | `rgba(3,15,38,.75)` | `background: linear-gradient(180deg, transparent 40%, rgba(3,15,38,.75) 100%);` |
| 5141 | rgba | `rgba(255,255,255,.45)` | `border: 1px solid rgba(255,255,255,.45);` |
| 5143 | rgba | `rgba(255,255,255,.94)` | `background: rgba(255,255,255,.94) !important;` |
| 5147 | rgba | `rgba(0,0,0,.40)` | `box-shadow: 0 20px 45px -15px rgba(0,0,0,.40);` |
| 5160 | hex | `#64748b` | `color: #64748b !important;` |
| 5161 | hex | `#64748b` | `-webkit-text-fill-color: #64748b !important;` |
| 5170 | hex | `#0b1733` | `color: #0b1733 !important;` |
| 5171 | hex | `#0b1733` | `-webkit-text-fill-color: #0b1733 !important;` |
| 5184 | rgba | `rgba(15, 23, 42, 0.08)` | `border-top: 1px solid rgba(15, 23, 42, 0.08);` |
| 5190 | hex | `#0b1733` | `color: #0b1733 !important;` |
| 5191 | hex | `#0b1733` | `-webkit-text-fill-color: #0b1733 !important;` |
| 5205 | rgba | `rgba(255,255,255,.12)` | `border: 1px solid rgba(255,255,255,.12);` |
| 5207 | rgba | `rgba(7,26,63,.86)` | `background: rgba(7,26,63,.86);` |
| 5208 | hex | `#fff` | `color: #fff !important;` |
| 5209 | rgba | `rgba(0,0,0,.9)` | `box-shadow: 0 20px 45px -28px rgba(0,0,0,.9);` |
| 5214 | hex | `#8faed2` | `color: #8faed2 !important;` |
| 5215 | hex | `#8faed2` | `-webkit-text-fill-color: #8faed2 !important;` |
| 5224 | hex | `#fff` | `color: #fff !important;` |
| 5225 | hex | `#fff` | `-webkit-text-fill-color: #fff !important;` |
| 5238 | rgba | `rgba(255,255,255,.12)` | `border-top: 1px solid rgba(255,255,255,.12);` |
| 5239 | hex | `#4de0ef` | `color: #4de0ef !important;` |
| 5240 | hex | `#4de0ef` | `-webkit-text-fill-color: #4de0ef !important;` |
| 5255 | rgba | `rgba(255,255,255,.10)` | `border-top: 1px solid rgba(255,255,255,.10);` |
| 5256 | rgba | `rgba(2,12,31,.30)` | `background: rgba(2,12,31,.30);` |
| 5264 | hex | `#9bb0ca` | `color: #9bb0ca;` |
| 5275 | hex | `#4de0ef` | `background: #4de0ef;` |
| 5280 | hex | `#7189a8` | `color: #7189a8 !important;` |
| 5281 | hex | `#7189a8` | `-webkit-text-fill-color: #7189a8 !important;` |
| 5299 | rgba | `rgba(57,113,220,.10)` | `background: rgba(57,113,220,.10);` |
| 5307 | rgba | `rgba(48,213,221,.08)` | `background: rgba(48,213,221,.08);` |
| 5385 | rgba | `rgba(255,255,255,.12)` | `border-top: 1px solid rgba(255,255,255,.12);` |
| 5392 | rgba | `rgba(255,255,255,.16)` | `border-left: 1px solid rgba(255,255,255,.16);` |
| 5408 | hex | `#fff` | `color: #fff !important;` |
| 5409 | hex | `#fff` | `-webkit-text-fill-color: #fff !important;` |
| 5419 | hex | `#38bdf8` | `color: #38bdf8 !important;` |
| 5420 | hex | `#38bdf8` | `-webkit-text-fill-color: #38bdf8 !important;` |
| 5477 | hex | `#e2e8f0` | `border: 1px solid var(--ap-line, #e2e8f0);` |
| 5479 | hex | `#fff` | `background: #fff;` |
| 5480 | rgba | `rgba(11,23,51,.5)` | `box-shadow: 0 10px 35px -28px rgba(11,23,51,.5);` |
| 5487 | hex | `#c8d8ec` | `border-color: #c8d8ec;` |
| 5488 | rgba | `rgba(11,23,51,.55)` | `box-shadow: 0 28px 55px -35px rgba(11,23,51,.55);` |
| 5507 | rgba | `rgba(7,26,63,.05)` | `background: linear-gradient(180deg, rgba(7,26,63,.05), rgba(7,26,63,.78));` |
| 5507 | rgba | `rgba(7,26,63,.78)` | `background: linear-gradient(180deg, rgba(7,26,63,.05), rgba(7,26,63,.78));` |
| 5513 | rgba | `rgba(255,255,255,.72)` | `color: rgba(255,255,255,.72);` |
| 5523 | hex | `#fff` | `color: #fff !important;` |
| 5536 | rgba | `rgba(255,255,255,.16)` | `background: rgba(255,255,255,.16);` |
| 5537 | hex | `#fff` | `color: #fff;` |
| 5544 | hex | `#0b1733` | `color: var(--ap-ink, #0b1733) !important;` |
| 5545 | hex | `#0b1733` | `-webkit-text-fill-color: var(--ap-ink, #0b1733) !important;` |
| 5552 | hex | `#5a6b82` | `color: var(--ap-muted, #5a6b82) !important;` |
| 5553 | hex | `#5a6b82` | `-webkit-text-fill-color: var(--ap-muted, #5a6b82) !important;` |
| 5566 | hex | `#f5f7fa` | `background: #f5f7fa;` |
| 5567 | hex | `#627187` | `color: #627187 !important;` |
| 5568 | hex | `#627187` | `-webkit-text-fill-color: #627187 !important;` |
| 5584 | hex | `#f7f9fc` | `background: #f7f9fc;` |
| 5596 | hex | `#64748b` | `color: #64748b;` |
| 5615 | hex | `#e2e8f0` | `border: 1px solid #e2e8f0;` |
| 5617 | hex | `#fff` | `background: #fff;` |
| 5618 | hex | `#64748b` | `color: #64748b;` |
| 5625 | hex | `#cbd5e1` | `border-color: #cbd5e1;` |
| 5626 | hex | `#f8fafc` | `background: #f8fafc;` |
| 5629 | hex | `#071a4a` | `background: #071a4a;` |
| 5630 | hex | `#071a4a` | `border-color: #071a4a;` |
| 5631 | hex | `#fff` | `color: #fff;` |
| 5632 | rgba | `rgba(7, 26, 74, 0.15)` | `box-shadow: 0 2px 8px rgba(7, 26, 74, 0.15);` |
| 5634 | hex | `#fff` | `.ap-source-pill.active strong { color: #fff; }` |
| 5635 | hex | `#cbd5e1` | `.ap-source-pill.active span { color: #cbd5e1; }` |
| 5636 | hex | `#0f172a` | `.ap-source-pill strong { color: #0f172a; font-weight: 850; }` |
| 5642 | hex | `#000` | `mask-image: linear-gradient(to right, transparent 0, #000 32px, #000 calc(100% - 32px), transparent 100%);` |
| 5642 | hex | `#000` | `mask-image: linear-gradient(to right, transparent 0, #000 32px, #000 calc(100% - 32px), transparent 100%);` |
| 5643 | hex | `#000` | `-webkit-mask-image: linear-gradient(to right, transparent 0, #000 32px, #000 calc(100% - 32px), transparent 100%);` |
| 5643 | hex | `#000` | `-webkit-mask-image: linear-gradient(to right, transparent 0, #000 32px, #000 calc(100% - 32px), transparent 100%);` |
| 5657 | hex | `#f7f9fc` | `background: linear-gradient(90deg, #f7f9fc, rgba(247, 249, 252, 0));` |
| 5657 | rgba | `rgba(247, 249, 252, 0)` | `background: linear-gradient(90deg, #f7f9fc, rgba(247, 249, 252, 0));` |
| 5661 | hex | `#f7f9fc` | `background: linear-gradient(270deg, #f7f9fc, rgba(247, 249, 252, 0));` |
| 5661 | rgba | `rgba(247, 249, 252, 0)` | `background: linear-gradient(270deg, #f7f9fc, rgba(247, 249, 252, 0));` |
| 5695 | hex | `#e2e8f0` | `border: 1px solid #e2e8f0;` |
| 5697 | hex | `#fff` | `background: #fff;` |
| 5698 | rgba | `rgba(15, 23, 42, 0.035)` | `box-shadow: 0 4px 16px rgba(15, 23, 42, 0.035);` |
| 5704 | hex | `#cbd5e1` | `border-color: #cbd5e1;` |
| 5705 | rgba | `rgba(15, 23, 42, 0.06)` | `box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);` |
| 5741 | hex | `#e2e8f0` | `border: 1px solid #e2e8f0;` |
| 5743 | hex | `#fff` | `background: #fff;` |
| 5744 | rgba | `rgba(15,23,42,.045)` | `box-shadow: 0 8px 28px rgba(15,23,42,.045);` |
| 5749 | hex | `#cbd5e1` | `border-color: #cbd5e1;` |
| 5750 | rgba | `rgba(15,23,42,.08)` | `box-shadow: 0 16px 36px rgba(15,23,42,.08);` |
| 5762 | hex | `#475569` | `color: #475569;` |
| 5766 | hex | `#0a66c2` | `.ap-testimonial-source .ap-icon { width: 14px; height: 14px; color: #0a66c2; }` |
| 5773 | hex | `#071a4a` | `background: #071a4a;` |
| 5774 | hex | `#fff` | `color: #fff;` |
| 5779 | hex | `#b45309` | `color: #b45309;` |
| 5786 | hex | `#1e293b` | `color: #1e293b;` |
| 5795 | hex | `#f1f5f9` | `border-top: 1px solid #f1f5f9;` |
| 5804 | hex | `#eaf2ff` | `background: #eaf2ff;` |
| 5805 | hex | `#1557b0` | `color: #1557b0;` |
| 5811 | hex | `#0f172a` | `.ap-testimonial-person strong { color: #0f172a; font-size: 12px; font-weight: 850; }` |
| 5812 | hex | `#94a3b8` | `.ap-testimonial-person span { margin-top: 3px; color: #94a3b8; font-size: 10px; }` |
| 5821 | hex | `#64748b` | `color: #64748b;` |
| 5828 | hex | `#cbd5e1` | `border: 2px solid #cbd5e1;` |
| 5829 | hex | `#1557b0` | `border-top-color: #1557b0;` |
| 5850 | hex | `#f8fafc` | `.rv-page{min-height:100vh;background:#f8fafc;color:#0b1733;font-family:inherit;overflow-x:hidden}` |
| 5850 | hex | `#0b1733` | `.rv-page{min-height:100vh;background:#f8fafc;color:#0b1733;font-family:inherit;overflow-x:hidden}` |
| 5852 | hex | `#f5f9ff` | `.rv-hero{background:linear-gradient(115deg,#f5f9ff 0%,#eef5ff 55%,#f7fbff 100%);border-bottom:1px solid #edf2f7}` |
| 5852 | hex | `#eef5ff` | `.rv-hero{background:linear-gradient(115deg,#f5f9ff 0%,#eef5ff 55%,#f7fbff 100%);border-bottom:1px solid #edf2f7}` |
| 5852 | hex | `#f7fbff` | `.rv-hero{background:linear-gradient(115deg,#f5f9ff 0%,#eef5ff 55%,#f7fbff 100%);border-bottom:1px solid #edf2f7}` |
| 5852 | hex | `#edf2f7` | `.rv-hero{background:linear-gradient(115deg,#f5f9ff 0%,#eef5ff 55%,#f7fbff 100%);border-bottom:1px solid #edf2f7}` |
| 5855 | hex | `#1557b0` | `.rv-eyebrow,.rv-kicker{display:block;color:#1557b0;font-size:11px;font-weight:900;letter-spacing:.12em;text-transform:uppercase}` |
| 5856 | hex | `#071a4a` | `.rv-hero h1{margin:12px 0 0;color:#071a4a;font-size:clamp(40px,4.3vw,62px);line-height:.98;letter-spacing:-.055em;font-weight:900}` |
| 5857 | hex | `#52627a` | `.rv-hero p{max-width:560px;margin:15px 0 0;color:#52627a;font-size:15px;line-height:1.55}` |
| 5859 | rgba | `rgba(35,74,130,.14)` | `.rv-hero-photo{position:absolute;right:34px;top:4px;width:284px;height:205px;overflow:hidden;border-radius:20px;box-shadow:0 18px 45px rgba(35,74,130,.14);border:6px solid rgba(255` |
| 5859 | rgba | `rgba(255,255,255,.8)` | `.rv-hero-photo{position:absolute;right:34px;top:4px;width:284px;height:205px;overflow:hidden;border-radius:20px;box-shadow:0 18px 45px rgba(35,74,130,.14);border:6px solid rgba(255` |
| 5861 | hex | `#18253b` | `.rv-float{position:absolute;z-index:3;display:flex;align-items:center;gap:9px;padding:9px 12px;border:1px solid rgba(255,255,255,.8);border-radius:13px;background:rgba(255,255,255,` |
| 5861 | rgba | `rgba(255,255,255,.8)` | `.rv-float{position:absolute;z-index:3;display:flex;align-items:center;gap:9px;padding:9px 12px;border:1px solid rgba(255,255,255,.8);border-radius:13px;background:rgba(255,255,255,` |
| 5861 | rgba | `rgba(255,255,255,.96)` | `.rv-float{position:absolute;z-index:3;display:flex;align-items:center;gap:9px;padding:9px 12px;border:1px solid rgba(255,255,255,.8);border-radius:13px;background:rgba(255,255,255,` |
| 5861 | rgba | `rgba(29,65,116,.14)` | `.rv-float{position:absolute;z-index:3;display:flex;align-items:center;gap:9px;padding:9px 12px;border:1px solid rgba(255,255,255,.8);border-radius:13px;background:rgba(255,255,255,` |
| 5866 | hex | `#fff` | `.rv-float-one>span,.rv-float-two>span{display:grid;place-items:center;width:30px;height:30px;border-radius:9px;background:#fff;color:#4285f4;font-size:16px;font-weight:900}` |
| 5866 | hex | `#4285f4` | `.rv-float-one>span,.rv-float-two>span{display:grid;place-items:center;width:30px;height:30px;border-radius:9px;background:#fff;color:#4285f4;font-size:16px;font-weight:900}` |
| 5867 | hex | `#0a66c2` | `.rv-float-two>span{background:#0a66c2;color:#fff;font-size:11px}` |
| 5867 | hex | `#fff` | `.rv-float-two>span{background:#0a66c2;color:#fff;font-size:11px}` |
| 5868 | hex | `#d62976` | `.rv-float-three>svg{width:24px;height:24px;color:#d62976}` |
| 5869 | hex | `#f2b33d` | `.rv-stars{display:inline-flex;gap:2px;color:#f2b33d}` |
| 5871 | hex | `#e6ebf1` | `.rv-source-bar{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:0;width:100%;min-width:0;margin-top:14px;padding:8px;border:1px solid #e6ebf1;border-radius:18px;backg` |
| 5871 | hex | `#fff` | `.rv-source-bar{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:0;width:100%;min-width:0;margin-top:14px;padding:8px;border:1px solid #e6ebf1;border-radius:18px;backg` |
| 5871 | rgba | `rgba(15,23,42,.035)` | `.rv-source-bar{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:0;width:100%;min-width:0;margin-top:14px;padding:8px;border:1px solid #e6ebf1;border-radius:18px;backg` |
| 5872 | hex | `#edf1f5` | `.rv-source-card{min-width:0;display:flex;align-items:center;gap:9px;padding:10px 9px;border:0;border-right:1px solid #edf1f5;background:#fff;text-align:left;cursor:pointer}` |
| 5872 | hex | `#fff` | `.rv-source-card{min-width:0;display:flex;align-items:center;gap:9px;padding:10px 9px;border:0;border-right:1px solid #edf1f5;background:#fff;text-align:left;cursor:pointer}` |
| 5873 | hex | `#f8fbff` | `.rv-source-card:last-child{border-right:0}.rv-source-card:hover{background:#f8fbff}.rv-source-card.is-active{background:#f3f7ff;border-radius:12px}` |
| 5873 | hex | `#f3f7ff` | `.rv-source-card:last-child{border-right:0}.rv-source-card:hover{background:#f8fbff}.rv-source-card.is-active{background:#f3f7ff;border-radius:12px}` |
| 5875 | hex | `#fff` | `.rv-google{background:#fff;border:1px solid #edf0f3;color:#4285f4;font-size:20px}.rv-justdial{background:#1688d4;color:#fff;font-size:11px}.rv-glassdoor{background:#0ca943;color:#f` |
| 5875 | hex | `#edf0f3` | `.rv-google{background:#fff;border:1px solid #edf0f3;color:#4285f4;font-size:20px}.rv-justdial{background:#1688d4;color:#fff;font-size:11px}.rv-glassdoor{background:#0ca943;color:#f` |
| 5875 | hex | `#4285f4` | `.rv-google{background:#fff;border:1px solid #edf0f3;color:#4285f4;font-size:20px}.rv-justdial{background:#1688d4;color:#fff;font-size:11px}.rv-glassdoor{background:#0ca943;color:#f` |
| 5875 | hex | `#1688d4` | `.rv-google{background:#fff;border:1px solid #edf0f3;color:#4285f4;font-size:20px}.rv-justdial{background:#1688d4;color:#fff;font-size:11px}.rv-glassdoor{background:#0ca943;color:#f` |
| 5875 | hex | `#fff` | `.rv-google{background:#fff;border:1px solid #edf0f3;color:#4285f4;font-size:20px}.rv-justdial{background:#1688d4;color:#fff;font-size:11px}.rv-glassdoor{background:#0ca943;color:#f` |
| 5875 | hex | `#0ca943` | `.rv-google{background:#fff;border:1px solid #edf0f3;color:#4285f4;font-size:20px}.rv-justdial{background:#1688d4;color:#fff;font-size:11px}.rv-glassdoor{background:#0ca943;color:#f` |
| 5875 | hex | `#fff` | `.rv-google{background:#fff;border:1px solid #edf0f3;color:#4285f4;font-size:20px}.rv-justdial{background:#1688d4;color:#fff;font-size:11px}.rv-glassdoor{background:#0ca943;color:#f` |
| 5875 | hex | `#625be8` | `.rv-google{background:#fff;border:1px solid #edf0f3;color:#4285f4;font-size:20px}.rv-justdial{background:#1688d4;color:#fff;font-size:11px}.rv-glassdoor{background:#0ca943;color:#f` |
| 5875 | hex | `#fff` | `.rv-google{background:#fff;border:1px solid #edf0f3;color:#4285f4;font-size:20px}.rv-justdial{background:#1688d4;color:#fff;font-size:11px}.rv-glassdoor{background:#0ca943;color:#f` |
| 5875 | hex | `#0a66c2` | `.rv-google{background:#fff;border:1px solid #edf0f3;color:#4285f4;font-size:20px}.rv-justdial{background:#1688d4;color:#fff;font-size:11px}.rv-glassdoor{background:#0ca943;color:#f` |
| 5875 | hex | `#fff` | `.rv-google{background:#fff;border:1px solid #edf0f3;color:#4285f4;font-size:20px}.rv-justdial{background:#1688d4;color:#fff;font-size:11px}.rv-glassdoor{background:#0ca943;color:#f` |
| 5875 | hex | `#f58529` | `.rv-google{background:#fff;border:1px solid #edf0f3;color:#4285f4;font-size:20px}.rv-justdial{background:#1688d4;color:#fff;font-size:11px}.rv-glassdoor{background:#0ca943;color:#f` |
| 5875 | hex | `#dd2a7b` | `.rv-google{background:#fff;border:1px solid #edf0f3;color:#4285f4;font-size:20px}.rv-justdial{background:#1688d4;color:#fff;font-size:11px}.rv-glassdoor{background:#0ca943;color:#f` |
| 5875 | hex | `#515bd4` | `.rv-google{background:#fff;border:1px solid #edf0f3;color:#4285f4;font-size:20px}.rv-justdial{background:#1688d4;color:#fff;font-size:11px}.rv-glassdoor{background:#0ca943;color:#f` |
| 5875 | hex | `#fff` | `.rv-google{background:#fff;border:1px solid #edf0f3;color:#4285f4;font-size:20px}.rv-justdial{background:#1688d4;color:#fff;font-size:11px}.rv-glassdoor{background:#0ca943;color:#f` |
| 5875 | hex | `#071a4a` | `.rv-google{background:#fff;border:1px solid #edf0f3;color:#4285f4;font-size:20px}.rv-justdial{background:#1688d4;color:#fff;font-size:11px}.rv-glassdoor{background:#0ca943;color:#f` |
| 5875 | hex | `#fff` | `.rv-google{background:#fff;border:1px solid #edf0f3;color:#4285f4;font-size:20px}.rv-justdial{background:#1688d4;color:#fff;font-size:11px}.rv-glassdoor{background:#0ca943;color:#f` |
| 5876 | hex | `#172338` | `.rv-source-copy{min-width:0;display:grid;gap:2px}.rv-source-copy strong{font-size:10px;color:#172338;font-weight:850}.rv-source-copy b{font-size:12px;color:#0d4f9f;font-weight:900;` |
| 5876 | hex | `#0d4f9f` | `.rv-source-copy{min-width:0;display:grid;gap:2px}.rv-source-copy strong{font-size:10px;color:#172338;font-weight:850}.rv-source-copy b{font-size:12px;color:#0d4f9f;font-weight:900;` |
| 5876 | hex | `#8793a4` | `.rv-source-copy{min-width:0;display:grid;gap:2px}.rv-source-copy strong{font-size:10px;color:#172338;font-weight:850}.rv-source-copy b{font-size:12px;color:#0d4f9f;font-weight:900;` |
| 5877 | hex | `#071a4a` | `.rv-main{padding:12px 0 70px}.rv-feed-head{display:flex;align-items:flex-end;justify-content:space-between;gap:24px;margin-top:22px}.rv-feed-head h2{margin:5px 0 0;color:#071a4a;fo` |
| 5877 | hex | `#718096` | `.rv-main{padding:12px 0 70px}.rv-feed-head{display:flex;align-items:flex-end;justify-content:space-between;gap:24px;margin-top:22px}.rv-feed-head h2{margin:5px 0 0;color:#071a4a;fo` |
| 5877 | hex | `#e1e7ef` | `.rv-main{padding:12px 0 70px}.rv-feed-head{display:flex;align-items:flex-end;justify-content:space-between;gap:24px;margin-top:22px}.rv-feed-head h2{margin:5px 0 0;color:#071a4a;fo` |
| 5877 | hex | `#fff` | `.rv-main{padding:12px 0 70px}.rv-feed-head{display:flex;align-items:flex-end;justify-content:space-between;gap:24px;margin-top:22px}.rv-feed-head h2{margin:5px 0 0;color:#071a4a;fo` |
| 5877 | hex | `#27364d` | `.rv-main{padding:12px 0 70px}.rv-feed-head{display:flex;align-items:flex-end;justify-content:space-between;gap:24px;margin-top:22px}.rv-feed-head h2{margin:5px 0 0;color:#071a4a;fo` |
| 5878 | hex | `#e4e9ef` | `.rv-topic-row{display:flex;gap:6px;margin-top:17px;overflow-x:auto;padding-bottom:3px;scrollbar-width:none}.rv-topic-row::-webkit-scrollbar{display:none}.rv-topic-row button{flex:0` |
| 5878 | hex | `#fff` | `.rv-topic-row{display:flex;gap:6px;margin-top:17px;overflow-x:auto;padding-bottom:3px;scrollbar-width:none}.rv-topic-row::-webkit-scrollbar{display:none}.rv-topic-row button{flex:0` |
| 5878 | hex | `#556277` | `.rv-topic-row{display:flex;gap:6px;margin-top:17px;overflow-x:auto;padding-bottom:3px;scrollbar-width:none}.rv-topic-row::-webkit-scrollbar{display:none}.rv-topic-row button{flex:0` |
| 5878 | hex | `#b9c9df` | `.rv-topic-row{display:flex;gap:6px;margin-top:17px;overflow-x:auto;padding-bottom:3px;scrollbar-width:none}.rv-topic-row::-webkit-scrollbar{display:none}.rv-topic-row button{flex:0` |
| 5878 | hex | `#1557b0` | `.rv-topic-row{display:flex;gap:6px;margin-top:17px;overflow-x:auto;padding-bottom:3px;scrollbar-width:none}.rv-topic-row::-webkit-scrollbar{display:none}.rv-topic-row button{flex:0` |
| 5878 | hex | `#1557b0` | `.rv-topic-row{display:flex;gap:6px;margin-top:17px;overflow-x:auto;padding-bottom:3px;scrollbar-width:none}.rv-topic-row::-webkit-scrollbar{display:none}.rv-topic-row button{flex:0` |
| 5878 | hex | `#fff` | `.rv-topic-row{display:flex;gap:6px;margin-top:17px;overflow-x:auto;padding-bottom:3px;scrollbar-width:none}.rv-topic-row::-webkit-scrollbar{display:none}.rv-topic-row button{flex:0` |
| 5878 | rgba | `rgba(21,87,176,.18)` | `.rv-topic-row{display:flex;gap:6px;margin-top:17px;overflow-x:auto;padding-bottom:3px;scrollbar-width:none}.rv-topic-row::-webkit-scrollbar{display:none}.rv-topic-row button{flex:0` |
| 5880 | hex | `#000` | `.rv-marquee-viewport{position:relative;width:100%;min-width:0;margin-top:17px;overflow:hidden;padding:2px 0 10px;border-radius:18px;mask-image:linear-gradient(to right,transparent ` |
| 5880 | hex | `#000` | `.rv-marquee-viewport{position:relative;width:100%;min-width:0;margin-top:17px;overflow:hidden;padding:2px 0 10px;border-radius:18px;mask-image:linear-gradient(to right,transparent ` |
| 5885 | hex | `#e5eaf0` | `@keyframes rv-marquee{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}.rv-card{min-height:245px;height:100%;display:flex;flex-direction:column;padding:17px;bo` |
| 5885 | hex | `#fff` | `@keyframes rv-marquee{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}.rv-card{min-height:245px;height:100%;display:flex;flex-direction:column;padding:17px;bo` |
| 5885 | hex | `#d4dce6` | `@keyframes rv-marquee{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}.rv-card{min-height:245px;height:100%;display:flex;flex-direction:column;padding:17px;bo` |
| 5885 | hex | `#152138` | `@keyframes rv-marquee{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}.rv-card{min-height:245px;height:100%;display:flex;flex-direction:column;padding:17px;bo` |
| 5885 | hex | `#8a96a8` | `@keyframes rv-marquee{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}.rv-card{min-height:245px;height:100%;display:flex;flex-direction:column;padding:17px;bo` |
| 5885 | hex | `#26344b` | `@keyframes rv-marquee{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}.rv-card{min-height:245px;height:100%;display:flex;flex-direction:column;padding:17px;bo` |
| 5885 | hex | `#eef1f4` | `@keyframes rv-marquee{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}.rv-card{min-height:245px;height:100%;display:flex;flex-direction:column;padding:17px;bo` |
| 5885 | hex | `#eef4ff` | `@keyframes rv-marquee{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}.rv-card{min-height:245px;height:100%;display:flex;flex-direction:column;padding:17px;bo` |
| 5885 | hex | `#175db3` | `@keyframes rv-marquee{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}.rv-card{min-height:245px;height:100%;display:flex;flex-direction:column;padding:17px;bo` |
| 5885 | hex | `#172338` | `@keyframes rv-marquee{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}.rv-card{min-height:245px;height:100%;display:flex;flex-direction:column;padding:17px;bo` |
| 5885 | hex | `#8994a4` | `@keyframes rv-marquee{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}.rv-card{min-height:245px;height:100%;display:flex;flex-direction:column;padding:17px;bo` |
| 5885 | hex | `#edf5ff` | `@keyframes rv-marquee{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}.rv-card{min-height:245px;height:100%;display:flex;flex-direction:column;padding:17px;bo` |
| 5885 | hex | `#1760b9` | `@keyframes rv-marquee{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}.rv-card{min-height:245px;height:100%;display:flex;flex-direction:column;padding:17px;bo` |
| 5885 | hex | `#f2edff` | `@keyframes rv-marquee{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}.rv-card{min-height:245px;height:100%;display:flex;flex-direction:column;padding:17px;bo` |
| 5885 | hex | `#7250b8` | `@keyframes rv-marquee{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}.rv-card{min-height:245px;height:100%;display:flex;flex-direction:column;padding:17px;bo` |
| 5885 | rgba | `rgba(15,23,42,.035)` | `@keyframes rv-marquee{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}.rv-card{min-height:245px;height:100%;display:flex;flex-direction:column;padding:17px;bo` |
| 5885 | rgba | `rgba(15,23,42,.07)` | `@keyframes rv-marquee{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}.rv-card{min-height:245px;height:100%;display:flex;flex-direction:column;padding:17px;bo` |
| 5886 | hex | `#e4e9ef` | `.rv-rating-panel{display:flex;align-items:center;justify-content:space-between;gap:20px;margin-top:17px;padding:20px;border:1px solid #e4e9ef;border-radius:17px;background:#fff}.rv` |
| 5886 | hex | `#fff` | `.rv-rating-panel{display:flex;align-items:center;justify-content:space-between;gap:20px;margin-top:17px;padding:20px;border:1px solid #e4e9ef;border-radius:17px;background:#fff}.rv` |
| 5886 | hex | `#7d8999` | `.rv-rating-panel{display:flex;align-items:center;justify-content:space-between;gap:20px;margin-top:17px;padding:20px;border:1px solid #e4e9ef;border-radius:17px;background:#fff}.rv` |
| 5886 | hex | `#0b1733` | `.rv-rating-panel{display:flex;align-items:center;justify-content:space-between;gap:20px;margin-top:17px;padding:20px;border:1px solid #e4e9ef;border-radius:17px;background:#fff}.rv` |
| 5886 | hex | `#9aa5b4` | `.rv-rating-panel{display:flex;align-items:center;justify-content:space-between;gap:20px;margin-top:17px;padding:20px;border:1px solid #e4e9ef;border-radius:17px;background:#fff}.rv` |
| 5886 | hex | `#7b8797` | `.rv-rating-panel{display:flex;align-items:center;justify-content:space-between;gap:20px;margin-top:17px;padding:20px;border:1px solid #e4e9ef;border-radius:17px;background:#fff}.rv` |
| 5886 | hex | `#071a4a` | `.rv-rating-panel{display:flex;align-items:center;justify-content:space-between;gap:20px;margin-top:17px;padding:20px;border:1px solid #e4e9ef;border-radius:17px;background:#fff}.rv` |
| 5886 | hex | `#fff` | `.rv-rating-panel{display:flex;align-items:center;justify-content:space-between;gap:20px;margin-top:17px;padding:20px;border:1px solid #e4e9ef;border-radius:17px;background:#fff}.rv` |
| 5887 | hex | `#d7dee7` | `.rv-empty{display:grid;place-items:center;margin-top:17px;padding:60px 20px;border:1px dashed #d7dee7;border-radius:17px;background:#fff;text-align:center}.rv-empty .rv-icon{margin` |
| 5887 | hex | `#fff` | `.rv-empty{display:grid;place-items:center;margin-top:17px;padding:60px 20px;border:1px dashed #d7dee7;border-radius:17px;background:#fff;text-align:center}.rv-empty .rv-icon{margin` |
| 5887 | hex | `#16243b` | `.rv-empty{display:grid;place-items:center;margin-top:17px;padding:60px 20px;border:1px dashed #d7dee7;border-radius:17px;background:#fff;text-align:center}.rv-empty .rv-icon{margin` |
| 5887 | hex | `#7b8797` | `.rv-empty{display:grid;place-items:center;margin-top:17px;padding:60px 20px;border:1px dashed #d7dee7;border-radius:17px;background:#fff;text-align:center}.rv-empty .rv-icon{margin` |
| 5887 | hex | `#7c8797` | `.rv-empty{display:grid;place-items:center;margin-top:17px;padding:60px 20px;border:1px dashed #d7dee7;border-radius:17px;background:#fff;text-align:center}.rv-empty .rv-icon{margin` |
| 5887 | hex | `#d3dce7` | `.rv-empty{display:grid;place-items:center;margin-top:17px;padding:60px 20px;border:1px dashed #d7dee7;border-radius:17px;background:#fff;text-align:center}.rv-empty .rv-icon{margin` |
| 5887 | hex | `#1557b0` | `.rv-empty{display:grid;place-items:center;margin-top:17px;padding:60px 20px;border:1px dashed #d7dee7;border-radius:17px;background:#fff;text-align:center}.rv-empty .rv-icon{margin` |
| 5888 | hex | `#e5eaf0` | `.rv-note{display:grid;grid-template-columns:1fr auto;gap:24px;margin-top:35px;padding:20px;border:1px solid #e5eaf0;border-radius:18px;background:#fff}.rv-note h3{margin:5px 0 0;fo` |
| 5888 | hex | `#fff` | `.rv-note{display:grid;grid-template-columns:1fr auto;gap:24px;margin-top:35px;padding:20px;border:1px solid #e5eaf0;border-radius:18px;background:#fff}.rv-note h3{margin:5px 0 0;fo` |
| 5888 | hex | `#12213a` | `.rv-note{display:grid;grid-template-columns:1fr auto;gap:24px;margin-top:35px;padding:20px;border:1px solid #e5eaf0;border-radius:18px;background:#fff}.rv-note h3{margin:5px 0 0;fo` |
| 5888 | hex | `#69778b` | `.rv-note{display:grid;grid-template-columns:1fr auto;gap:24px;margin-top:35px;padding:20px;border:1px solid #e5eaf0;border-radius:18px;background:#fff}.rv-note h3{margin:5px 0 0;fo` |
| 5888 | hex | `#e4e9ef` | `.rv-note{display:grid;grid-template-columns:1fr auto;gap:24px;margin-top:35px;padding:20px;border:1px solid #e5eaf0;border-radius:18px;background:#fff}.rv-note h3{margin:5px 0 0;fo` |
| 5888 | hex | `#f8fafc` | `.rv-note{display:grid;grid-template-columns:1fr auto;gap:24px;margin-top:35px;padding:20px;border:1px solid #e5eaf0;border-radius:18px;background:#fff}.rv-note h3{margin:5px 0 0;fo` |
| 5888 | hex | `#536176` | `.rv-note{display:grid;grid-template-columns:1fr auto;gap:24px;margin-top:35px;padding:20px;border:1px solid #e5eaf0;border-radius:18px;background:#fff}.rv-note h3{margin:5px 0 0;fo` |
| 5888 | hex | `#071a4a` | `.rv-note{display:grid;grid-template-columns:1fr auto;gap:24px;margin-top:35px;padding:20px;border:1px solid #e5eaf0;border-radius:18px;background:#fff}.rv-note h3{margin:5px 0 0;fo` |
| 5888 | hex | `#fff` | `.rv-note{display:grid;grid-template-columns:1fr auto;gap:24px;margin-top:35px;padding:20px;border:1px solid #e5eaf0;border-radius:18px;background:#fff}.rv-note h3{margin:5px 0 0;fo` |
| 5888 | hex | `#86a7d1` | `.rv-note{display:grid;grid-template-columns:1fr auto;gap:24px;margin-top:35px;padding:20px;border:1px solid #e5eaf0;border-radius:18px;background:#fff}.rv-note h3{margin:5px 0 0;fo` |
| 5888 | hex | `#fff` | `.rv-note{display:grid;grid-template-columns:1fr auto;gap:24px;margin-top:35px;padding:20px;border:1px solid #e5eaf0;border-radius:18px;background:#fff}.rv-note h3{margin:5px 0 0;fo` |
| 5888 | hex | `#fff` | `.rv-note{display:grid;grid-template-columns:1fr auto;gap:24px;margin-top:35px;padding:20px;border:1px solid #e5eaf0;border-radius:18px;background:#fff}.rv-note h3{margin:5px 0 0;fo` |
| 5888 | hex | `#071a4a` | `.rv-note{display:grid;grid-template-columns:1fr auto;gap:24px;margin-top:35px;padding:20px;border:1px solid #e5eaf0;border-radius:18px;background:#fff}.rv-note h3{margin:5px 0 0;fo` |
| 5890 | hex | `#edf1f5` | `@media(max-width:760px){.rv-container{width:min(100% - 28px,620px)}.rv-marquee-track{animation-duration:58s}.rv-marquee-set .rv-card{width:310px;min-width:310px;flex-basis:310px}.r` |
| 5893 | hex | `#27364d` | `.rv-filter-button{cursor:pointer}.rv-filter-button select{appearance:none;border:0;outline:0;background:transparent;color:#27364d;font:inherit;font-weight:800;cursor:pointer}.rv-fi` |
| 5899 | hex | `#d8dee7` | `.rv-star-base{color:#d8dee7;fill:#d8dee7}` |
| 5899 | hex | `#d8dee7` | `.rv-star-base{color:#d8dee7;fill:#d8dee7}` |
| 5901 | hex | `#f2b33d` | `.rv-star-fill svg{display:block;color:#f2b33d;fill:#f2b33d}` |
| 5901 | hex | `#f2b33d` | `.rv-star-fill svg{display:block;color:#f2b33d;fill:#f2b33d}` |
| 5904 | hex | `#7d8999` | `.rv-float small{display:block;width:100%;margin-top:1px;color:#7d8999;font-size:8px;line-height:1.3}` |
| 5906 | hex | `#f58529` | `.rv-float-instagram{display:grid;place-items:center;width:30px;height:30px;border-radius:9px;background:linear-gradient(135deg,#f58529,#dd2a7b,#515bd4);color:#fff}` |
| 5906 | hex | `#dd2a7b` | `.rv-float-instagram{display:grid;place-items:center;width:30px;height:30px;border-radius:9px;background:linear-gradient(135deg,#f58529,#dd2a7b,#515bd4);color:#fff}` |
| 5906 | hex | `#515bd4` | `.rv-float-instagram{display:grid;place-items:center;width:30px;height:30px;border-radius:9px;background:linear-gradient(135deg,#f58529,#dd2a7b,#515bd4);color:#fff}` |
| 5906 | hex | `#fff` | `.rv-float-instagram{display:grid;place-items:center;width:30px;height:30px;border-radius:9px;background:linear-gradient(135deg,#f58529,#dd2a7b,#515bd4);color:#fff}` |
| 5909 | rgba | `rgba(21,87,176,.22)` | `.rv-source-card:focus-visible,.rv-topic-row button:focus-visible,.rv-filter-button:focus-within,.rv-links a:focus-visible,.rv-cta a:focus-visible{outline:3px solid rgba(21,87,176,.` |
| 5910 | hex | `#cfe0fa` | `.rv-source-card.is-active{box-shadow:inset 0 0 0 1px #cfe0fa}` |
| 5912 | hex | `#b8cae4` | `.rv-card:focus-within{border-color:#b8cae4}` |
| 5950 | hex | `#f0d58a` | `.rv-preview-banner{margin-top:14px;padding:9px 12px;border:1px solid #f0d58a;border-radius:10px;background:#fff8df;color:#795b12;font-size:10px;font-weight:850;letter-spacing:.03em` |
| 5950 | hex | `#fff8df` | `.rv-preview-banner{margin-top:14px;padding:9px 12px;border:1px solid #f0d58a;border-radius:10px;background:#fff8df;color:#795b12;font-size:10px;font-weight:850;letter-spacing:.03em` |
| 5950 | hex | `#795b12` | `.rv-preview-banner{margin-top:14px;padding:9px 12px;border:1px solid #f0d58a;border-radius:10px;background:#fff8df;color:#795b12;font-size:10px;font-weight:850;letter-spacing:.03em` |
| 5951 | hex | `#fffdf7` | `.rv-card.is-preview{border-style:dashed;background:#fffdf7}` |
| 5952 | hex | `#fff0c7` | `.rv-card.is-preview .rv-tags span+span{background:#fff0c7;color:#795b12}` |
| 5952 | hex | `#795b12` | `.rv-card.is-preview .rv-tags span+span{background:#fff0c7;color:#795b12}` |
| 5953 | rgba | `rgba(7,26,74,.12)` | `.rv-marquee-viewport{box-shadow:inset 24px 0 24px -24px rgba(7,26,74,.12),inset -24px 0 24px -24px rgba(7,26,74,.12)}` |
| 5953 | rgba | `rgba(7,26,74,.12)` | `.rv-marquee-viewport{box-shadow:inset 24px 0 24px -24px rgba(7,26,74,.12),inset -24px 0 24px -24px rgba(7,26,74,.12)}` |
| 5967 | hex | `#fff` | `.rv-brand-logo{display:grid;place-items:center;background:#fff;border:1px solid #e5eaf0}` |
| 5967 | hex | `#e5eaf0` | `.rv-brand-logo{display:grid;place-items:center;background:#fff;border:1px solid #e5eaf0}` |
| 5976 | hex | `#f6f8fc` | `.rv3-page{min-height:100vh;background:#f6f8fc;color:#0a1736;overflow-x:hidden}` |
| 5976 | hex | `#0a1736` | `.rv3-page{min-height:100vh;background:#f6f8fc;color:#0a1736;overflow-x:hidden}` |
| 5978 | hex | `#e3eaf3` | `.rv3-hero{position:relative;overflow:hidden;border-bottom:1px solid #e3eaf3;background:linear-gradient(120deg,#f7fbff 0%,#edf5ff 52%,#f8fbff 100%)}` |
| 5978 | hex | `#f7fbff` | `.rv3-hero{position:relative;overflow:hidden;border-bottom:1px solid #e3eaf3;background:linear-gradient(120deg,#f7fbff 0%,#edf5ff 52%,#f8fbff 100%)}` |
| 5978 | hex | `#edf5ff` | `.rv3-hero{position:relative;overflow:hidden;border-bottom:1px solid #e3eaf3;background:linear-gradient(120deg,#f7fbff 0%,#edf5ff 52%,#f8fbff 100%)}` |
| 5978 | hex | `#f8fbff` | `.rv3-hero{position:relative;overflow:hidden;border-bottom:1px solid #e3eaf3;background:linear-gradient(120deg,#f7fbff 0%,#edf5ff 52%,#f8fbff 100%)}` |
| 5979 | rgba | `rgba(63,126,220,.10)` | `.rv3-hero::after{content:"";position:absolute;inset:auto -10% -180px auto;width:560px;height:360px;border-radius:50%;background:rgba(63,126,220,.10);filter:blur(50px);pointer-event` |
| 5982 | hex | `#155fbd` | `.rv3-eyebrow,.rv3-kicker{display:inline-block;color:#155fbd;font-size:11px;font-weight:900;letter-spacing:.13em;text-transform:uppercase}` |
| 5983 | hex | `#071a4a` | `.rv3-hero-copy h1{margin:14px 0 0;color:#071a4a;font-size:clamp(46px,5.3vw,76px);line-height:.96;letter-spacing:-.058em;font-weight:900}` |
| 5984 | hex | `#1f67c1` | `.rv3-hero-copy h1 span{color:#1f67c1}` |
| 5985 | hex | `#586a84` | `.rv3-hero-copy>p{max-width:670px;margin:22px 0 0;color:#586a84;font-size:17px;line-height:1.65}` |
| 5988 | hex | `#155fbd` | `.rv3-primary-button{padding:13px 18px;background:#155fbd;color:#fff;box-shadow:0 12px 28px rgba(21,95,189,.22)}` |
| 5988 | hex | `#fff` | `.rv3-primary-button{padding:13px 18px;background:#155fbd;color:#fff;box-shadow:0 12px 28px rgba(21,95,189,.22)}` |
| 5988 | rgba | `rgba(21,95,189,.22)` | `.rv3-primary-button{padding:13px 18px;background:#155fbd;color:#fff;box-shadow:0 12px 28px rgba(21,95,189,.22)}` |
| 5989 | hex | `#d5dfec` | `.rv3-secondary-button{padding:12px 17px;border:1px solid #d5dfec;background:#fff;color:#0d315f}` |
| 5989 | hex | `#fff` | `.rv3-secondary-button{padding:12px 17px;border:1px solid #d5dfec;background:#fff;color:#0d315f}` |
| 5989 | hex | `#0d315f` | `.rv3-secondary-button{padding:12px 17px;border:1px solid #d5dfec;background:#fff;color:#0d315f}` |
| 5992 | hex | `#dce5f0` | `.rv3-proof-row{display:flex;gap:0;margin-top:34px;border-top:1px solid #dce5f0;padding-top:18px}` |
| 5994 | hex | `#dce5f0` | `.rv3-proof-row>div+div{padding-left:22px;border-left:1px solid #dce5f0}` |
| 5995 | hex | `#0b2f61` | `.rv3-proof-row strong{display:block;color:#0b2f61;font-size:20px;font-weight:900;letter-spacing:-.03em}` |
| 5996 | hex | `#708099` | `.rv3-proof-row span{display:block;margin-top:4px;color:#708099;font-size:10px;font-weight:750}` |
| 5999 | hex | `#dbe8f8` | `.rv3-photo-frame{position:absolute;right:52px;top:2px;width:min(430px,78%);height:300px;overflow:hidden;border:7px solid rgba(255,255,255,.88);border-radius:28px;background:#dbe8f8` |
| 5999 | rgba | `rgba(255,255,255,.88)` | `.rv3-photo-frame{position:absolute;right:52px;top:2px;width:min(430px,78%);height:300px;overflow:hidden;border:7px solid rgba(255,255,255,.88);border-radius:28px;background:#dbe8f8` |
| 5999 | rgba | `rgba(30,74,130,.17)` | `.rv3-photo-frame{position:absolute;right:52px;top:2px;width:min(430px,78%);height:300px;overflow:hidden;border:7px solid rgba(255,255,255,.88);border-radius:28px;background:#dbe8f8` |
| 6001 | rgba | `rgba(7,26,74,0)` | `.rv3-photo-overlay{position:absolute;inset:0;background:linear-gradient(180deg,rgba(7,26,74,0) 50%,rgba(7,26,74,.13) 100%)}` |
| 6001 | rgba | `rgba(7,26,74,.13)` | `.rv3-photo-overlay{position:absolute;inset:0;background:linear-gradient(180deg,rgba(7,26,74,0) 50%,rgba(7,26,74,.13) 100%)}` |
| 6002 | rgba | `rgba(219,228,241,.95)` | `.rv3-floating-card{position:absolute;z-index:3;display:flex;align-items:center;gap:10px;padding:11px 13px;border:1px solid rgba(219,228,241,.95);border-radius:16px;background:rgba(` |
| 6002 | rgba | `rgba(255,255,255,.97)` | `.rv3-floating-card{position:absolute;z-index:3;display:flex;align-items:center;gap:10px;padding:11px 13px;border:1px solid rgba(219,228,241,.95);border-radius:16px;background:rgba(` |
| 6002 | rgba | `rgba(21,55,103,.15)` | `.rv3-floating-card{position:absolute;z-index:3;display:flex;align-items:center;gap:10px;padding:11px 13px;border:1px solid rgba(219,228,241,.95);border-radius:16px;background:rgba(` |
| 6004 | hex | `#152442` | `.rv3-floating-card strong{display:block;color:#152442;font-size:11px;font-weight:900}` |
| 6005 | hex | `#8290a4` | `.rv3-floating-card small{display:block;color:#8290a4;font-size:8px;line-height:1.35;white-space:nowrap}` |
| 6010 | hex | `#e1e8f0` | `.rv3-logo{display:grid;place-items:center;width:34px;height:34px;flex:0 0 34px;border:1px solid #e1e8f0;border-radius:10px;background:#fff;overflow:hidden}` |
| 6010 | hex | `#fff` | `.rv3-logo{display:grid;place-items:center;width:34px;height:34px;flex:0 0 34px;border:1px solid #e1e8f0;border-radius:10px;background:#fff;overflow:hidden}` |
| 6017 | hex | `#071a4a` | `.rv3-section-heading h2,.rv3-feed-top h2{margin:7px 0 0;color:#071a4a;font-size:31px;line-height:1.05;letter-spacing:-.035em;font-weight:900}` |
| 6018 | hex | `#e1e7ef` | `.rv3-source-count{padding:8px 12px;border:1px solid #e1e7ef;border-radius:999px;background:#fff;color:#708096;font-size:10px;font-weight:800;white-space:nowrap}` |
| 6018 | hex | `#fff` | `.rv3-source-count{padding:8px 12px;border:1px solid #e1e7ef;border-radius:999px;background:#fff;color:#708096;font-size:10px;font-weight:800;white-space:nowrap}` |
| 6018 | hex | `#708096` | `.rv3-source-count{padding:8px 12px;border:1px solid #e1e7ef;border-radius:999px;background:#fff;color:#708096;font-size:10px;font-weight:800;white-space:nowrap}` |
| 6021 | hex | `#e1e7ef` | `.rv3-source-track{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));min-width:0;border:1px solid #e1e7ef;border-radius:22px;background:#fff;box-shadow:0 10px 34px rgba(15,` |
| 6021 | hex | `#fff` | `.rv3-source-track{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));min-width:0;border:1px solid #e1e7ef;border-radius:22px;background:#fff;box-shadow:0 10px 34px rgba(15,` |
| 6021 | rgba | `rgba(15,32,62,.05)` | `.rv3-source-track{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));min-width:0;border:1px solid #e1e7ef;border-radius:22px;background:#fff;box-shadow:0 10px 34px rgba(15,` |
| 6022 | hex | `#edf1f6` | `.rv3-source-card{min-width:0;min-height:104px;display:flex;align-items:center;gap:12px;padding:16px 14px;border:0;border-right:1px solid #edf1f6;background:#fff;text-align:left;cur` |
| 6022 | hex | `#fff` | `.rv3-source-card{min-width:0;min-height:104px;display:flex;align-items:center;gap:12px;padding:16px 14px;border:0;border-right:1px solid #edf1f6;background:#fff;text-align:left;cur` |
| 6024 | hex | `#f8fbff` | `.rv3-source-card:hover{background:#f8fbff}` |
| 6025 | hex | `#f2f7ff` | `.rv3-source-card.is-active{background:#f2f7ff;box-shadow:inset 0 -3px 0 #155fbd}` |
| 6025 | hex | `#155fbd` | `.rv3-source-card.is-active{background:#f2f7ff;box-shadow:inset 0 -3px 0 #155fbd}` |
| 6029 | hex | `#14213a` | `.rv3-source-copy strong{color:#14213a;font-size:11px;font-weight:900;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}` |
| 6030 | hex | `#0c559f` | `.rv3-source-copy b{color:#0c559f;font-size:13px;font-weight:900;white-space:nowrap}` |
| 6031 | hex | `#8a97a8` | `.rv3-source-copy small{color:#8a97a8;font-size:8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}` |
| 6035 | hex | `#7a889c` | `.rv3-feed-top p{margin:7px 0 0;color:#7a889c;font-size:11px}` |
| 6037 | hex | `#dfe6ef` | `.rv3-select{display:flex;align-items:center;gap:8px;height:42px;padding:0 12px;border:1px solid #dfe6ef;border-radius:12px;background:#fff;color:#283951;font-size:10px;font-weight:` |
| 6037 | hex | `#fff` | `.rv3-select{display:flex;align-items:center;gap:8px;height:42px;padding:0 12px;border:1px solid #dfe6ef;border-radius:12px;background:#fff;color:#283951;font-size:10px;font-weight:` |
| 6037 | hex | `#283951` | `.rv3-select{display:flex;align-items:center;gap:8px;height:42px;padding:0 12px;border:1px solid #dfe6ef;border-radius:12px;background:#fff;color:#283951;font-size:10px;font-weight:` |
| 6038 | hex | `#8290a2` | `.rv3-select span{color:#8290a2;font-weight:750}` |
| 6039 | hex | `#1b2b44` | `.rv3-select select{appearance:none;border:0;outline:0;background:transparent;color:#1b2b44;font:inherit;font-weight:900;cursor:pointer;min-width:76px}` |
| 6040 | hex | `#65758b` | `.rv3-select svg{width:14px;height:14px;color:#65758b;pointer-events:none}` |
| 6041 | hex | `#dfe6ef` | `.rv3-pause{height:42px;padding:0 14px;border:1px solid #dfe6ef;border-radius:12px;background:#fff;color:#24405f;font-size:10px;font-weight:850;cursor:pointer}` |
| 6041 | hex | `#fff` | `.rv3-pause{height:42px;padding:0 14px;border:1px solid #dfe6ef;border-radius:12px;background:#fff;color:#24405f;font-size:10px;font-weight:850;cursor:pointer}` |
| 6041 | hex | `#24405f` | `.rv3-pause{height:42px;padding:0 14px;border:1px solid #dfe6ef;border-radius:12px;background:#fff;color:#24405f;font-size:10px;font-weight:850;cursor:pointer}` |
| 6042 | hex | `#f7faff` | `.rv3-pause:hover{background:#f7faff}` |
| 6045 | hex | `#dfe6ef` | `.rv3-category-rail button{flex:0 0 auto;padding:9px 13px;border:1px solid #dfe6ef;border-radius:999px;background:#fff;color:#56677e;font-size:10px;font-weight:850;cursor:pointer}` |
| 6045 | hex | `#fff` | `.rv3-category-rail button{flex:0 0 auto;padding:9px 13px;border:1px solid #dfe6ef;border-radius:999px;background:#fff;color:#56677e;font-size:10px;font-weight:850;cursor:pointer}` |
| 6045 | hex | `#56677e` | `.rv3-category-rail button{flex:0 0 auto;padding:9px 13px;border:1px solid #dfe6ef;border-radius:999px;background:#fff;color:#56677e;font-size:10px;font-weight:850;cursor:pointer}` |
| 6046 | hex | `#bdcde2` | `.rv3-category-rail button:hover{border-color:#bdcde2}` |
| 6047 | hex | `#155fbd` | `.rv3-category-rail button.is-active{border-color:#155fbd;background:#155fbd;color:#fff;box-shadow:0 7px 18px rgba(21,95,189,.16)}` |
| 6047 | hex | `#155fbd` | `.rv3-category-rail button.is-active{border-color:#155fbd;background:#155fbd;color:#fff;box-shadow:0 7px 18px rgba(21,95,189,.16)}` |
| 6047 | hex | `#fff` | `.rv3-category-rail button.is-active{border-color:#155fbd;background:#155fbd;color:#fff;box-shadow:0 7px 18px rgba(21,95,189,.16)}` |
| 6047 | rgba | `rgba(21,95,189,.16)` | `.rv3-category-rail button.is-active{border-color:#155fbd;background:#155fbd;color:#fff;box-shadow:0 7px 18px rgba(21,95,189,.16)}` |
| 6049 | hex | `#000` | `.rv3-marquee{position:relative;margin-top:22px;overflow:hidden;padding:3px 0 12px;border-radius:20px;mask-image:linear-gradient(to right,transparent 0,#000 30px,#000 calc(100% - 30` |
| 6049 | hex | `#000` | `.rv3-marquee{position:relative;margin-top:22px;overflow:hidden;padding:3px 0 12px;border-radius:20px;mask-image:linear-gradient(to right,transparent 0,#000 30px,#000 calc(100% - 30` |
| 6051 | hex | `#f6f8fc` | `.rv3-marquee::before{left:0;background:linear-gradient(90deg,#f6f8fc,rgba(246,248,252,0))}` |
| 6051 | rgba | `rgba(246,248,252,0)` | `.rv3-marquee::before{left:0;background:linear-gradient(90deg,#f6f8fc,rgba(246,248,252,0))}` |
| 6052 | hex | `#f6f8fc` | `.rv3-marquee::after{right:0;background:linear-gradient(270deg,#f6f8fc,rgba(246,248,252,0))}` |
| 6052 | rgba | `rgba(246,248,252,0)` | `.rv3-marquee::after{right:0;background:linear-gradient(270deg,#f6f8fc,rgba(246,248,252,0))}` |
| 6057 | hex | `#e1e7ef` | `.rv3-card{width:360px;min-width:360px;min-height:252px;height:auto;display:flex;flex-direction:column;padding:18px;border:1px solid #e1e7ef;border-radius:18px;background:#fff;box-s` |
| 6057 | hex | `#fff` | `.rv3-card{width:360px;min-width:360px;min-height:252px;height:auto;display:flex;flex-direction:column;padding:18px;border:1px solid #e1e7ef;border-radius:18px;background:#fff;box-s` |
| 6057 | rgba | `rgba(15,32,62,.055)` | `.rv3-card{width:360px;min-width:360px;min-height:252px;height:auto;display:flex;flex-direction:column;padding:18px;border:1px solid #e1e7ef;border-radius:18px;background:#fff;box-s` |
| 6058 | hex | `#fffdf7` | `.rv3-card.is-demo{border-style:dashed;background:#fffdf7}` |
| 6062 | hex | `#18263e` | `.rv3-card-source strong{color:#18263e;font-size:11px;font-weight:900}` |
| 6063 | hex | `#8a97a9` | `.rv3-card-source small{color:#8a97a9;font-size:8px}` |
| 6064 | hex | `#2d3b52` | `.rv3-quote{margin:16px 0 14px;flex:1;color:#2d3b52;font-size:13px;line-height:1.62}` |
| 6065 | hex | `#eef1f5` | `.rv3-person{display:flex;align-items:center;gap:9px;padding-top:12px;border-top:1px solid #eef1f5}` |
| 6066 | hex | `#edf4ff` | `.rv3-avatar{display:grid;place-items:center;width:34px;height:34px;border-radius:50%;background:#edf4ff;color:#165db4;font-size:12px;font-weight:900;flex:0 0 34px}` |
| 6066 | hex | `#165db4` | `.rv3-avatar{display:grid;place-items:center;width:34px;height:34px;border-radius:50%;background:#edf4ff;color:#165db4;font-size:12px;font-weight:900;flex:0 0 34px}` |
| 6068 | hex | `#16243b` | `.rv3-person strong{color:#16243b;font-size:11px;font-weight:900}` |
| 6069 | hex | `#8a97a9` | `.rv3-person small{color:#8a97a9;font-size:8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}` |
| 6071 | hex | `#edf5ff` | `.rv3-card-footer>span{padding:5px 8px;border-radius:999px;background:#edf5ff;color:#1760b9;font-size:8px;font-weight:900}` |
| 6071 | hex | `#1760b9` | `.rv3-card-footer>span{padding:5px 8px;border-radius:999px;background:#edf5ff;color:#1760b9;font-size:8px;font-weight:900}` |
| 6072 | hex | `#f1efff` | `.rv3-card-footer>span+span{background:#f1efff;color:#6f55b4}` |
| 6072 | hex | `#6f55b4` | `.rv3-card-footer>span+span{background:#f1efff;color:#6f55b4}` |
| 6073 | hex | `#fff0c8` | `.rv3-demo-chip{background:#fff0c8!important;color:#7a5a12!important}` |
| 6073 | hex | `#7a5a12` | `.rv3-demo-chip{background:#fff0c8!important;color:#7a5a12!important}` |
| 6076 | hex | `#e1e7ef` | `.rv3-rating-summary{display:flex;align-items:center;justify-content:space-between;gap:20px;margin-top:22px;padding:18px;border:1px solid #e1e7ef;border-radius:18px;background:#fff;` |
| 6076 | hex | `#fff` | `.rv3-rating-summary{display:flex;align-items:center;justify-content:space-between;gap:20px;margin-top:22px;padding:18px;border:1px solid #e1e7ef;border-radius:18px;background:#fff;` |
| 6076 | rgba | `rgba(15,32,62,.04)` | `.rv3-rating-summary{display:flex;align-items:center;justify-content:space-between;gap:20px;margin-top:22px;padding:18px;border:1px solid #e1e7ef;border-radius:18px;background:#fff;` |
| 6080 | hex | `#8390a2` | `.rv3-rating-label{display:block;color:#8390a2;font-size:9px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}` |
| 6082 | hex | `#0b1d3c` | `.rv3-rating-value-row strong{color:#0b1d3c;font-size:31px;font-weight:900;letter-spacing:-.04em}` |
| 6083 | hex | `#98a4b4` | `.rv3-rating-value-row>span:not(.rv3-stars){color:#98a4b4;font-size:11px;font-weight:800}` |
| 6084 | hex | `#7f8ca0` | `.rv3-rating-left small{display:block;margin-top:3px;color:#7f8ca0;font-size:9px}` |
| 6085 | hex | `#dfe6ef` | `.rv3-outline-button{padding:10px 14px;border:1px solid #dfe6ef;background:#fff;color:#1b3c67;font-size:10px}` |
| 6085 | hex | `#fff` | `.rv3-outline-button{padding:10px 14px;border:1px solid #dfe6ef;background:#fff;color:#1b3c67;font-size:10px}` |
| 6085 | hex | `#1b3c67` | `.rv3-outline-button{padding:10px 14px;border:1px solid #dfe6ef;background:#fff;color:#1b3c67;font-size:10px}` |
| 6090 | hex | `#d6dde7` | `.rv3-star-base{color:#d6dde7;fill:#d6dde7}` |
| 6090 | hex | `#d6dde7` | `.rv3-star-base{color:#d6dde7;fill:#d6dde7}` |
| 6092 | hex | `#f4b740` | `.rv3-star-fill svg{display:block;color:#f4b740;fill:#f4b740}` |
| 6092 | hex | `#f4b740` | `.rv3-star-fill svg{display:block;color:#f4b740;fill:#f4b740}` |
| 6095 | hex | `#e1e7ef` | `.rv3-trust-grid article{min-height:125px;padding:18px;border:1px solid #e1e7ef;border-radius:18px;background:#fff}` |
| 6095 | hex | `#fff` | `.rv3-trust-grid article{min-height:125px;padding:18px;border:1px solid #e1e7ef;border-radius:18px;background:#fff}` |
| 6096 | hex | `#f4f8fe` | `.rv3-trust-grid article:first-child{background:#f4f8fe}` |
| 6097 | hex | `#14233f` | `.rv3-trust-grid h3{margin:7px 0 0;color:#14233f;font-size:17px;line-height:1.25}` |
| 6098 | hex | `#69788e` | `.rv3-trust-grid p{margin:6px 0 0;color:#69788e;font-size:10px;line-height:1.6}` |
| 6100 | hex | `#0c4f9a` | `.rv3-trust-stat strong{color:#0c4f9a;font-size:28px;line-height:1;font-weight:900}` |
| 6101 | hex | `#7b899d` | `.rv3-trust-stat span{margin-top:6px;color:#7b899d;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.08em}` |
| 6103 | hex | `#071a4a` | `.rv3-cta{display:flex;align-items:center;justify-content:space-between;gap:24px;margin-top:18px;padding:26px 28px;border-radius:20px;background:#071a4a;box-shadow:0 22px 45px rgba(` |
| 6103 | rgba | `rgba(7,26,74,.17)` | `.rv3-cta{display:flex;align-items:center;justify-content:space-between;gap:24px;margin-top:18px;padding:26px 28px;border-radius:20px;background:#071a4a;box-shadow:0 22px 45px rgba(` |
| 6104 | hex | `#84a8d4` | `.rv3-cta span{display:block;color:#84a8d4;font-size:9px;font-weight:900;letter-spacing:.14em;text-transform:uppercase}` |
| 6105 | hex | `#fff` | `.rv3-cta h2{margin:6px 0 0;color:#fff!important;font-size:25px;line-height:1.1;font-weight:900;letter-spacing:-.03em}` |
| 6106 | hex | `#bfd0e7` | `.rv3-cta p{max-width:670px;margin:7px 0 0;color:#bfd0e7;font-size:11px;line-height:1.55}` |
| 6107 | hex | `#fff` | `.rv3-cta>a{flex:0 0 auto;padding:13px 18px;background:#fff;color:#071a4a;font-size:10px}` |
| 6107 | hex | `#071a4a` | `.rv3-cta>a{flex:0 0 auto;padding:13px 18px;background:#fff;color:#071a4a;font-size:10px}` |
| 6109 | rgba | `rgba(21,95,189,.22)` | `.rv3-source-card:focus-visible,.rv3-category-rail button:focus-visible,.rv3-pause:focus-visible,.rv3-select:focus-within,.rv3-primary-button:focus-visible,.rv3-secondary-button:foc` |
| 6172 | hex | `#ffffff` | `color: #ffffff !important;` |
| 6175 | hex | `#ffffff` | `color: #ffffff !important;` |
| 6176 | hex | `#ffffff` | `-webkit-text-fill-color: #ffffff !important;` |
| 6179 | rgba | `rgba(219, 234, 254, 0.9)` | `color: rgba(219, 234, 254, 0.9) !important;` |
| 6180 | rgba | `rgba(219, 234, 254, 0.9)` | `-webkit-text-fill-color: rgba(219, 234, 254, 0.9) !important;` |
| 6207 | rgba | `rgba(21,55,103,.13)` | `.rv3-floating-card{padding:8px 9px;border-radius:13px;box-shadow:0 12px 25px rgba(21,55,103,.13)}` |
| 6264 | hex | `#F7F9FC` | `background-color: #F7F9FC !important;` |
| 6265 | hex | `#071A4A` | `color: #071A4A !important;` |
| 6266 | hex | `#071A4A` | `-webkit-text-fill-color: #071A4A !important;` |
| 6273 | hex | `#071A4A` | `color: #071A4A !important;` |
| 6274 | hex | `#071A4A` | `-webkit-text-fill-color: #071A4A !important;` |
| 6278 | hex | `#475569` | `color: #475569 !important;` |
| 6279 | hex | `#475569` | `-webkit-text-fill-color: #475569 !important;` |
| 6283 | hex | `#ffffff` | `background-color: #ffffff !important;` |
| 6307 | hex | `#ffffff` | `background: #ffffff;` |
| 6308 | hex | `#e2e8f0` | `border: 1px solid #e2e8f0;` |
| 6311 | rgba | `rgba(0,0,0,0.05)` | `box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.025);` |
| 6311 | rgba | `rgba(0,0,0,0.025)` | `box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.025);` |
| 6316 | rgba | `rgba(0,0,0,0.1)` | `box-shadow: 0 12px 24px -8px rgba(0,0,0,0.1);` |
| 6317 | hex | `#cbd5e1` | `border-color: #cbd5e1;` |
| 6337 | rgba | `rgba(15, 23, 42, 0.9)` | `background: linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.3) 50%, transparent 100%);` |
| 6337 | rgba | `rgba(15, 23, 42, 0.3)` | `background: linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.3) 50%, transparent 100%);` |
| 6345 | hex | `#fff` | `color: #fff;` |
| 6353 | rgba | `rgba(0,0,0,0.5)` | `text-shadow: 0 2px 4px rgba(0,0,0,0.5);` |
| 6361 | hex | `#94a3b8` | `color: #94a3b8;` |
| 6378 | hex | `#64748b` | `color: #64748b;` |
| 6385 | hex | `#334155` | `color: #334155;` |
| 6400 | hex | `#64748b` | `color: #64748b;` |
| 6408 | hex | `#0f172a` | `color: #0f172a;` |

### `src\routes\pv-associate.tsx` - 441

| Line | Kind | Value | Context |
|---:|---|---|---|
| 231 | hex | `#EEF6FF` | `<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF6FF] border border-[#1557D6]/20">` |
| 231 | hex | `#1557D6` | `<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF6FF] border border-[#1557D6]/20">` |
| 232 | hex | `#1557D6` | `<span className="h-2 w-2 rounded-full bg-[#1557D6] motion-safe:animate-pulse" />` |
| 233 | hex | `#071A4A` | `<span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-[0.18em] text-[#071A4A]">` |
| 239 | hex | `#071A4A` | `<h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight leading-[1.02] text-[#071A4A]">` |
| 245 | hex | `#071A4A` | `<p className="text-base sm:text-lg font-bold text-[#071A4A] leading-snug">` |
| 250 | hex | `#69758A` | `<p className="text-sm sm:text-base text-[#69758A] max-w-[540px] leading-relaxed">` |
| 255 | hex | `#E4EAF2` | `<div className="mt-6 overflow-hidden rounded-2xl border border-[#E4EAF2] bg-[#F7FAFC] shadow-md md:hidden">` |
| 255 | hex | `#F7FAFC` | `<div className="mt-6 overflow-hidden rounded-2xl border border-[#E4EAF2] bg-[#F7FAFC] shadow-md md:hidden">` |
| 287 | hex | `#69758A` | `<p className="text-xs text-[#69758A] font-medium pt-1">` |
| 292 | hex | `#E4EAF2` | `<div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-[#E4EAF2]">` |
| 294 | hex | `#EEF6FF` | `<div className="h-8 w-8 rounded-lg bg-[#EEF6FF] text-[#1557D6] flex items-center justify-center shrink-0">` |
| 294 | hex | `#1557D6` | `<div className="h-8 w-8 rounded-lg bg-[#EEF6FF] text-[#1557D6] flex items-center justify-center shrink-0">` |
| 297 | hex | `#071A4A` | `<span className="text-xs font-semibold text-[#071A4A] leading-tight">` |
| 302 | hex | `#EEF6FF` | `<div className="h-8 w-8 rounded-lg bg-[#EEF6FF] text-[#1557D6] flex items-center justify-center shrink-0">` |
| 302 | hex | `#1557D6` | `<div className="h-8 w-8 rounded-lg bg-[#EEF6FF] text-[#1557D6] flex items-center justify-center shrink-0">` |
| 305 | hex | `#071A4A` | `<span className="text-xs font-semibold text-[#071A4A] leading-tight">` |
| 310 | hex | `#EEF6FF` | `<div className="h-8 w-8 rounded-lg bg-[#EEF6FF] text-[#1557D6] flex items-center justify-center shrink-0">` |
| 310 | hex | `#1557D6` | `<div className="h-8 w-8 rounded-lg bg-[#EEF6FF] text-[#1557D6] flex items-center justify-center shrink-0">` |
| 313 | hex | `#071A4A` | `<span className="text-xs font-semibold text-[#071A4A] leading-tight">` |
| 318 | hex | `#EEF6FF` | `<div className="h-8 w-8 rounded-lg bg-[#EEF6FF] text-[#1557D6] flex items-center justify-center shrink-0">` |
| 318 | hex | `#1557D6` | `<div className="h-8 w-8 rounded-lg bg-[#EEF6FF] text-[#1557D6] flex items-center justify-center shrink-0">` |
| 321 | hex | `#071A4A` | `<span className="text-xs font-semibold text-[#071A4A] leading-tight">` |
| 330 | hex | `#E4EAF2` | `<div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#E4EAF2] bg-[#F7FAFC]">` |
| 330 | hex | `#F7FAFC` | `<div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#E4EAF2] bg-[#F7FAFC]">` |
| 348 | hex | `#E4EAF2` | `className="absolute top-4 left-4 rounded-xl bg-white/95 backdrop-blur-md p-3.5 shadow-md border border-[#E4EAF2] text-[11px] w-[210px] tone-light card-light cursor-pointer hover:bo` |
| 348 | hex | `#1557D6` | `className="absolute top-4 left-4 rounded-xl bg-white/95 backdrop-blur-md p-3.5 shadow-md border border-[#E4EAF2] text-[11px] w-[210px] tone-light card-light cursor-pointer hover:bo` |
| 351 | hex | `#E4EAF2` | `<div className="flex items-center justify-between border-b border-[#E4EAF2] pb-1.5 mb-2">` |
| 352 | hex | `#1557D6` | `<span className="font-mono font-bold text-[#1557D6] tracking-wider uppercase text-[10px] flex items-center gap-1">` |
| 359 | hex | `#69758A` | `<div className="flex justify-between text-[#69758A] hover:bg-[#EEF6FF] rounded px-1 py-0.5 transition-colors">` |
| 359 | hex | `#EEF6FF` | `<div className="flex justify-between text-[#69758A] hover:bg-[#EEF6FF] rounded px-1 py-0.5 transition-colors">` |
| 361 | hex | `#071A4A` | `<strong className="text-[#071A4A]">PV-2048</strong>` |
| 363 | hex | `#69758A` | `<div className="flex justify-between text-[#69758A] hover:bg-[#EEF6FF] rounded px-1 py-0.5 transition-colors">` |
| 363 | hex | `#EEF6FF` | `<div className="flex justify-between text-[#69758A] hover:bg-[#EEF6FF] rounded px-1 py-0.5 transition-colors">` |
| 365 | hex | `#071A4A` | `<strong className="text-[#071A4A]">34/F</strong>` |
| 367 | hex | `#69758A` | `<div className="flex justify-between text-[#69758A] hover:bg-[#EEF6FF] rounded px-1 py-0.5 transition-colors">` |
| 367 | hex | `#EEF6FF` | `<div className="flex justify-between text-[#69758A] hover:bg-[#EEF6FF] rounded px-1 py-0.5 transition-colors">` |
| 369 | hex | `#071A4A` | `<strong className="text-[#071A4A]">Amoxicillin</strong>` |
| 371 | hex | `#69758A` | `<div className="flex justify-between text-[#69758A] hover:bg-[#EEF6FF] rounded px-1 py-0.5 transition-colors">` |
| 371 | hex | `#EEF6FF` | `<div className="flex justify-between text-[#69758A] hover:bg-[#EEF6FF] rounded px-1 py-0.5 transition-colors">` |
| 373 | hex | `#EF4444` | `<strong className="text-[#EF4444]">Severe rash</strong>` |
| 375 | hex | `#69758A` | `<div className="flex justify-between text-[#69758A] hover:bg-[#EEF6FF] rounded px-1 py-0.5 transition-colors">` |
| 375 | hex | `#EEF6FF` | `<div className="flex justify-between text-[#69758A] hover:bg-[#EEF6FF] rounded px-1 py-0.5 transition-colors">` |
| 377 | hex | `#F59E0B` | `<strong className="text-[#F59E0B]">Under assessment</strong>` |
| 379 | hex | `#69758A` | `<div className="flex justify-between text-[#69758A] hover:bg-[#EEF6FF] rounded px-1 py-0.5 transition-colors">` |
| 379 | hex | `#EEF6FF` | `<div className="flex justify-between text-[#69758A] hover:bg-[#EEF6FF] rounded px-1 py-0.5 transition-colors">` |
| 381 | hex | `#27B9B3` | `<strong className="text-[#27B9B3]">Case processing →</strong>` |
| 387 | hex | `#E4EAF2` | `<div className="absolute top-4 right-4 rounded-xl bg-white/95 backdrop-blur-md p-2.5 sm:p-3 shadow-md border border-[#E4EAF2] space-y-2 text-[11px] tone-light card-light hidden sm:` |
| 389 | hex | `#1557D6` | `{ label: "ICSR Processing", icon: FileText, color: "text-[#1557D6]", bg: "bg-[#EEF6FF]" },` |
| 389 | hex | `#EEF6FF` | `{ label: "ICSR Processing", icon: FileText, color: "text-[#1557D6]", bg: "bg-[#EEF6FF]" },` |
| 390 | hex | `#6946E8` | `{ label: "MedDRA Coding", icon: Database, color: "text-[#6946E8]", bg: "bg-[#F1EEFF]" },` |
| 390 | hex | `#F1EEFF` | `{ label: "MedDRA Coding", icon: Database, color: "text-[#6946E8]", bg: "bg-[#F1EEFF]" },` |
| 391 | hex | `#27B9B3` | `{ label: "Safety Assessment", icon: Shield, color: "text-[#27B9B3]", bg: "bg-[#E6F8F7]" },` |
| 391 | hex | `#E6F8F7` | `{ label: "Safety Assessment", icon: Shield, color: "text-[#27B9B3]", bg: "bg-[#E6F8F7]" },` |
| 392 | hex | `#1557D6` | `{ label: "Case Narratives", icon: FileCheck, color: "text-[#1557D6]", bg: "bg-[#EEF6FF]" },` |
| 392 | hex | `#EEF6FF` | `{ label: "Case Narratives", icon: FileCheck, color: "text-[#1557D6]", bg: "bg-[#EEF6FF]" },` |
| 399 | hex | `#F7FAFC` | `className="flex items-center gap-2 hover:bg-[#F7FAFC] rounded px-1.5 py-1 transition-colors cursor-pointer group"` |
| 404 | hex | `#071A4A` | `<span className="font-semibold text-[#071A4A] group-hover:text-[#1557D6] transition-colors">` |
| 404 | hex | `#1557D6` | `<span className="font-semibold text-[#071A4A] group-hover:text-[#1557D6] transition-colors">` |
| 434 | hex | `#E4EAF2` | `<section id="role-workflow" className="py-14 sm:py-20 bg-white border-b border-[#E4EAF2]">` |
| 444 | hex | `#E4EAF2` | `className="group relative rounded-2xl overflow-hidden border border-[#E4EAF2] shadow-md cursor-pointer aspect-video sm:h-[300px] w-full bg-[#071A4A]"` |
| 444 | hex | `#071A4A` | `className="group relative rounded-2xl overflow-hidden border border-[#E4EAF2] shadow-md cursor-pointer aspect-video sm:h-[300px] w-full bg-[#071A4A]"` |
| 454 | hex | `#071A4A` | `<div className="absolute inset-0 bg-[#071A4A]/40 group-hover:bg-[#071A4A]/30 transition-colors flex flex-col items-center justify-center text-center p-4">` |
| 454 | hex | `#071A4A` | `<div className="absolute inset-0 bg-[#071A4A]/40 group-hover:bg-[#071A4A]/30 transition-colors flex flex-col items-center justify-center text-center p-4">` |
| 456 | hex | `#1557D6` | `<div className="h-16 w-16 rounded-full bg-white tone-light shadow-xl flex items-center justify-center text-[#1557D6] group-hover:scale-110 transition-transform">` |
| 457 | hex | `#1557D6` | `<Play className="h-7 w-7 fill-current ml-1 text-[#1557D6]" />` |
| 461 | hex | `#27B9B3` | `<span className="text-[#27B9B3] font-mono">(2 min)</span>` |
| 469 | hex | `#071A4A` | `<h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#071A4A] tracking-tight leading-snug">` |
| 473 | hex | `#69758A` | `<p className="text-sm sm:text-base text-[#69758A] leading-relaxed">` |
| 479 | hex | `#1557D6` | `<div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#1557D6] mb-3">` |
| 484 | hex | `#1557D6` | `{ title: "Case Intake", icon: FileText, color: "text-[#1557D6]", bg: "bg-[#EEF6FF]" },` |
| 484 | hex | `#EEF6FF` | `{ title: "Case Intake", icon: FileText, color: "text-[#1557D6]", bg: "bg-[#EEF6FF]" },` |
| 485 | hex | `#27B9B3` | `{ title: "Triage & Validation", icon: ShieldCheck, color: "text-[#27B9B3]", bg: "bg-[#E6F8F7]" },` |
| 485 | hex | `#E6F8F7` | `{ title: "Triage & Validation", icon: ShieldCheck, color: "text-[#27B9B3]", bg: "bg-[#E6F8F7]" },` |
| 486 | hex | `#6946E8` | `{ title: "MedDRA Coding", icon: Database, color: "text-[#6946E8]", bg: "bg-[#F1EEFF]" },` |
| 486 | hex | `#F1EEFF` | `{ title: "MedDRA Coding", icon: Database, color: "text-[#6946E8]", bg: "bg-[#F1EEFF]" },` |
| 487 | hex | `#1557D6` | `{ title: "Narrative Writing", icon: FileCheck, color: "text-[#1557D6]", bg: "bg-[#EEF6FF]" },` |
| 487 | hex | `#EEF6FF` | `{ title: "Narrative Writing", icon: FileCheck, color: "text-[#1557D6]", bg: "bg-[#EEF6FF]" },` |
| 488 | hex | `#27B9B3` | `{ title: "Quality Review", icon: CheckCircle2, color: "text-[#27B9B3]", bg: "bg-[#E6F8F7]" },` |
| 488 | hex | `#E6F8F7` | `{ title: "Quality Review", icon: CheckCircle2, color: "text-[#27B9B3]", bg: "bg-[#E6F8F7]" },` |
| 489 | hex | `#F59E0B` | `{ title: "Follow-up & Reporting", icon: Activity, color: "text-[#F59E0B]", bg: "bg-[#FFF8EE]" },` |
| 489 | hex | `#FFF8EE` | `{ title: "Follow-up & Reporting", icon: Activity, color: "text-[#F59E0B]", bg: "bg-[#FFF8EE]" },` |
| 496 | hex | `#E4EAF2` | `className="rounded-xl border border-[#E4EAF2] bg-[#F7FAFC] p-3 flex flex-col items-center justify-between min-h-[96px] shadow-2xs hover:border-[#1557D6] transition-colors cursor-po` |
| 496 | hex | `#F7FAFC` | `className="rounded-xl border border-[#E4EAF2] bg-[#F7FAFC] p-3 flex flex-col items-center justify-between min-h-[96px] shadow-2xs hover:border-[#1557D6] transition-colors cursor-po` |
| 496 | hex | `#1557D6` | `className="rounded-xl border border-[#E4EAF2] bg-[#F7FAFC] p-3 flex flex-col items-center justify-between min-h-[96px] shadow-2xs hover:border-[#1557D6] transition-colors cursor-po` |
| 501 | hex | `#071A4A` | `<span className="text-[11px] font-bold text-[#071A4A] group-hover:text-[#1557D6] transition-colors leading-tight mt-2">` |
| 501 | hex | `#1557D6` | `<span className="text-[11px] font-bold text-[#071A4A] group-hover:text-[#1557D6] transition-colors leading-tight mt-2">` |
| 515 | hex | `#EEF6FF` | `<section className="py-14 sm:py-20 bg-[#EEF6FF] border-b border-[#E4EAF2]">` |
| 515 | hex | `#E4EAF2` | `<section className="py-14 sm:py-20 bg-[#EEF6FF] border-b border-[#E4EAF2]">` |
| 520 | hex | `#1557D6` | `<div className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-[0.18em] text-[#1557D6]">` |
| 523 | hex | `#071A4A` | `<h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#071A4A] tracking-tight mt-1.5">` |
| 533 | hex | `#1557D6` | `className="h-10 px-4 rounded-xl border border-[#1557D6] bg-white tone-light hover:bg-[#EEF6FF] text-[#1557D6] font-semibold text-xs flex items-center gap-1.5 transition-colors curs` |
| 533 | hex | `#EEF6FF` | `className="h-10 px-4 rounded-xl border border-[#1557D6] bg-white tone-light hover:bg-[#EEF6FF] text-[#1557D6] font-semibold text-xs flex items-center gap-1.5 transition-colors curs` |
| 533 | hex | `#1557D6` | `className="h-10 px-4 rounded-xl border border-[#1557D6] bg-white tone-light hover:bg-[#EEF6FF] text-[#1557D6] font-semibold text-xs flex items-center gap-1.5 transition-colors curs` |
| 548 | hex | `#6946E8` | `color: "text-[#6946E8]",` |
| 549 | hex | `#F1EEFF` | `bg: "bg-[#F1EEFF]",` |
| 556 | hex | `#1557D6` | `color: "text-[#1557D6]",` |
| 557 | hex | `#EEF6FF` | `bg: "bg-[#EEF6FF]",` |
| 564 | hex | `#6946E8` | `color: "text-[#6946E8]",` |
| 565 | hex | `#F1EEFF` | `bg: "bg-[#F1EEFF]",` |
| 572 | hex | `#F59E0B` | `color: "text-[#F59E0B]",` |
| 573 | hex | `#FFF8EE` | `bg: "bg-[#FFF8EE]",` |
| 580 | hex | `#1557D6` | `color: "text-[#1557D6]",` |
| 581 | hex | `#EEF6FF` | `bg: "bg-[#EEF6FF]",` |
| 588 | hex | `#27B9B3` | `color: "text-[#27B9B3]",` |
| 589 | hex | `#E6F8F7` | `bg: "bg-[#E6F8F7]",` |
| 597 | hex | `#E4EAF2` | `className="rounded-2xl border border-[#E4EAF2] bg-white tone-light p-5 flex flex-col justify-between min-h-[170px] shadow-2xs hover:border-[#1557D6] hover:shadow-md transition-all ` |
| 597 | hex | `#1557D6` | `className="rounded-2xl border border-[#E4EAF2] bg-white tone-light p-5 flex flex-col justify-between min-h-[170px] shadow-2xs hover:border-[#1557D6] hover:shadow-md transition-all ` |
| 603 | hex | `#69758A` | `<span className="font-mono text-xs font-bold text-[#69758A]">` |
| 608 | hex | `#071A4A` | `<h3 className="font-bold text-sm text-[#071A4A] group-hover:text-[#1557D6] transition-colors leading-snug">` |
| 608 | hex | `#1557D6` | `<h3 className="font-bold text-sm text-[#071A4A] group-hover:text-[#1557D6] transition-colors leading-snug">` |
| 611 | hex | `#69758A` | `<p className="text-xs text-[#69758A] mt-1.5 leading-relaxed">` |
| 623 | hex | `#071A4A` | `<section className="py-16 sm:py-24 bg-[#071A4A] text-slate-50 overflow-hidden relative border-b border-[#071A4A]">` |
| 623 | hex | `#071A4A` | `<section className="py-16 sm:py-24 bg-[#071A4A] text-slate-50 overflow-hidden relative border-b border-[#071A4A]">` |
| 625 | hex | `#1557D6` | `<div className="absolute right-0 top-0 w-96 h-96 bg-[#1557D6]/10 rounded-full blur-3xl pointer-events-none" />` |
| 634 | hex | `#27B9B3` | `<span className="text-[#27B9B3]">We Start with the Job.</span>` |
| 669 | hex | `#27B9B3` | `<div className="rounded-xl border-2 border-[#27B9B3] bg-white tone-light p-4 sm:p-5 space-y-3 text-[#071A4A] shadow-lg">` |
| 669 | hex | `#071A4A` | `<div className="rounded-xl border-2 border-[#27B9B3] bg-white tone-light p-4 sm:p-5 space-y-3 text-[#071A4A] shadow-lg">` |
| 670 | hex | `#1557D6` | `<div className="font-bold text-xs uppercase tracking-wider text-[#1557D6] font-mono">` |
| 673 | hex | `#071A4A` | `<ul className="space-y-2 text-xs font-semibold text-[#071A4A]">` |
| 675 | hex | `#27B9B3` | `<Check className="h-4 w-4 text-[#27B9B3] shrink-0" />` |
| 679 | hex | `#27B9B3` | `<Check className="h-4 w-4 text-[#27B9B3] shrink-0" />` |
| 683 | hex | `#27B9B3` | `<Check className="h-4 w-4 text-[#27B9B3] shrink-0" />` |
| 687 | hex | `#27B9B3` | `<Check className="h-4 w-4 text-[#27B9B3] shrink-0" />` |
| 724 | hex | `#27B9B3` | `<li className={`flex items-start gap-2 p-1 rounded transition-colors ${activeLaptopPill === 0 ? "bg-[#27B9B3]/20 border border-[#27B9B3]/40" : ""}`}>` |
| 724 | hex | `#27B9B3` | `<li className={`flex items-start gap-2 p-1 rounded transition-colors ${activeLaptopPill === 0 ? "bg-[#27B9B3]/20 border border-[#27B9B3]/40" : ""}`}>` |
| 725 | hex | `#27B9B3` | `<span className="text-[#27B9B3] font-bold">✓</span>` |
| 733 | hex | `#1557D6` | `<li className={`flex items-start gap-2 p-1 rounded transition-colors ${activeLaptopPill === 1 ? "bg-[#1557D6]/20 border border-[#1557D6]/40" : ""}`}>` |
| 733 | hex | `#1557D6` | `<li className={`flex items-start gap-2 p-1 rounded transition-colors ${activeLaptopPill === 1 ? "bg-[#1557D6]/20 border border-[#1557D6]/40" : ""}`}>` |
| 734 | hex | `#27B9B3` | `<span className="text-[#27B9B3] font-bold">✓</span>` |
| 743 | hex | `#23C55E` | `<li className={`flex items-start gap-2 p-1 rounded transition-colors ${activeLaptopPill === 2 ? "bg-[#23C55E]/20 border border-[#23C55E]/40" : ""}`}>` |
| 743 | hex | `#23C55E` | `<li className={`flex items-start gap-2 p-1 rounded transition-colors ${activeLaptopPill === 2 ? "bg-[#23C55E]/20 border border-[#23C55E]/40" : ""}`}>` |
| 744 | hex | `#27B9B3` | `<span className="text-[#27B9B3] font-bold">✓</span>` |
| 754 | hex | `#27B9B3` | `<span className="text-[#27B9B3] font-bold">✓</span>` |
| 763 | hex | `#6946E8` | `<li className={`flex items-start gap-2 p-1 rounded transition-colors ${activeLaptopPill === 4 ? "bg-[#6946E8]/20 border border-[#6946E8]/40" : ""}`}>` |
| 763 | hex | `#6946E8` | `<li className={`flex items-start gap-2 p-1 rounded transition-colors ${activeLaptopPill === 4 ? "bg-[#6946E8]/20 border border-[#6946E8]/40" : ""}`}>` |
| 764 | hex | `#27B9B3` | `<span className="text-[#27B9B3] font-bold">✓</span>` |
| 774 | hex | `#27B9B3` | `<span className="text-[#27B9B3] font-bold">✓</span>` |
| 783 | hex | `#27B9B3` | `{ label: "ICSR Processing", bg: "bg-[#27B9B3] text-[#071A4A]" },` |
| 783 | hex | `#071A4A` | `{ label: "ICSR Processing", bg: "bg-[#27B9B3] text-[#071A4A]" },` |
| 784 | hex | `#1557D6` | `{ label: "MedDRA Coding", bg: "bg-[#1557D6] text-slate-50" },` |
| 785 | hex | `#23C55E` | `{ label: "Narrative Writing", bg: "bg-[#23C55E] text-[#071A4A]" },` |
| 785 | hex | `#071A4A` | `{ label: "Narrative Writing", bg: "bg-[#23C55E] text-[#071A4A]" },` |
| 786 | hex | `#071A4A` | `{ label: "Argus / ARISg", bg: "bg-white text-[#071A4A]" },` |
| 787 | hex | `#6946E8` | `{ label: "Case Follow-up", bg: "bg-[#6946E8] text-slate-50" },` |
| 807 | hex | `#E4EAF2` | `<section className="py-14 sm:py-20 bg-white border-b border-[#E4EAF2]">` |
| 811 | hex | `#071A4A` | `<h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#071A4A] tracking-tight">` |
| 814 | hex | `#69758A` | `<p className="text-sm sm:text-base text-[#69758A] mt-1.5">` |
| 824 | hex | `#1557D6` | `className="h-10 px-4 rounded-xl border border-[#1557D6] bg-white tone-light hover:bg-[#EEF6FF] text-[#1557D6] font-semibold text-xs flex items-center gap-1.5 transition-colors curs` |
| 824 | hex | `#EEF6FF` | `className="h-10 px-4 rounded-xl border border-[#1557D6] bg-white tone-light hover:bg-[#EEF6FF] text-[#1557D6] font-semibold text-xs flex items-center gap-1.5 transition-colors curs` |
| 824 | hex | `#1557D6` | `className="h-10 px-4 rounded-xl border border-[#1557D6] bg-white tone-light hover:bg-[#EEF6FF] text-[#1557D6] font-semibold text-xs flex items-center gap-1.5 transition-colors curs` |
| 839 | hex | `#6946E8` | `color: "text-[#6946E8]",` |
| 840 | hex | `#F1EEFF` | `bg: "bg-[#F1EEFF]",` |
| 847 | hex | `#27B9B3` | `color: "text-[#27B9B3]",` |
| 848 | hex | `#E6F8F7` | `bg: "bg-[#E6F8F7]",` |
| 855 | hex | `#F59E0B` | `color: "text-[#F59E0B]",` |
| 856 | hex | `#FFF8EE` | `bg: "bg-[#FFF8EE]",` |
| 863 | hex | `#1557D6` | `color: "text-[#1557D6]",` |
| 864 | hex | `#EEF6FF` | `bg: "bg-[#EEF6FF]",` |
| 872 | hex | `#E4EAF2` | `className="rounded-2xl border border-[#E4EAF2] bg-[#F7FAFC] p-6 space-y-4 hover:border-[#1557D6] hover:bg-white hover:shadow-md transition-all group cursor-pointer"` |
| 872 | hex | `#F7FAFC` | `className="rounded-2xl border border-[#E4EAF2] bg-[#F7FAFC] p-6 space-y-4 hover:border-[#1557D6] hover:bg-white hover:shadow-md transition-all group cursor-pointer"` |
| 872 | hex | `#1557D6` | `className="rounded-2xl border border-[#E4EAF2] bg-[#F7FAFC] p-6 space-y-4 hover:border-[#1557D6] hover:bg-white hover:shadow-md transition-all group cursor-pointer"` |
| 878 | hex | `#69758A` | `<span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#69758A]">` |
| 881 | hex | `#071A4A` | `<h3 className="font-bold text-base text-[#071A4A] group-hover:text-[#1557D6] transition-colors mt-0.5">` |
| 881 | hex | `#1557D6` | `<h3 className="font-bold text-base text-[#071A4A] group-hover:text-[#1557D6] transition-colors mt-0.5">` |
| 884 | hex | `#69758A` | `<p className="text-xs text-[#69758A] mt-1.5 leading-relaxed">` |
| 896 | hex | `#F7FAFC` | `<section id="curriculum-journey" className="py-14 sm:py-20 bg-[#F7FAFC] border-b border-[#E4EAF2]">` |
| 896 | hex | `#E4EAF2` | `<section id="curriculum-journey" className="py-14 sm:py-20 bg-[#F7FAFC] border-b border-[#E4EAF2]">` |
| 899 | hex | `#071A4A` | `<h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#071A4A] tracking-tight">` |
| 902 | hex | `#69758A` | `<p className="text-sm sm:text-base text-[#69758A] mt-1.5">` |
| 915 | hex | `#1557D6` | `color: "bg-[#1557D6]",` |
| 922 | hex | `#06B6D4` | `color: "bg-[#06B6D4]",` |
| 929 | hex | `#6946E8` | `color: "bg-[#6946E8]",` |
| 936 | hex | `#27B9B3` | `color: "bg-[#27B9B3]",` |
| 943 | hex | `#F59E0B` | `color: "bg-[#F59E0B]",` |
| 950 | hex | `#8B5CF6` | `color: "bg-[#8B5CF6]",` |
| 955 | hex | `#E4EAF2` | `className="rounded-2xl border border-[#E4EAF2] bg-white tone-light p-5 space-y-3 shadow-2xs hover:border-[#1557D6] transition-colors relative"` |
| 955 | hex | `#1557D6` | `className="rounded-2xl border border-[#E4EAF2] bg-white tone-light p-5 space-y-3 shadow-2xs hover:border-[#1557D6] transition-colors relative"` |
| 961 | hex | `#1557D6` | `<span className="font-mono text-[10px] font-bold text-[#1557D6] uppercase tracking-wider block">` |
| 964 | hex | `#071A4A` | `<h3 className="font-bold text-sm text-[#071A4A] mt-0.5">` |
| 967 | hex | `#69758A` | `<p className="text-xs text-[#69758A] mt-1 leading-relaxed">` |
| 978 | hex | `#E4EAF2` | `<section className="py-14 sm:py-20 bg-white border-b border-[#E4EAF2]">` |
| 984 | hex | `#071A4A` | `<h2 className="text-2xl sm:text-3xl font-extrabold text-[#071A4A] tracking-tight">` |
| 987 | hex | `#69758A` | `<p className="text-sm text-[#69758A] mt-1">` |
| 995 | hex | `#E4EAF2` | `<div className="sm:col-span-7 rounded-2xl border border-[#E4EAF2] bg-[#F7FAFC] p-5 space-y-3.5">` |
| 995 | hex | `#F7FAFC` | `<div className="sm:col-span-7 rounded-2xl border border-[#E4EAF2] bg-[#F7FAFC] p-5 space-y-3.5">` |
| 996 | hex | `#071A4A` | `<div className="font-bold text-xs uppercase tracking-wider text-[#071A4A] font-mono border-b border-[#E4EAF2] pb-2">` |
| 996 | hex | `#E4EAF2` | `<div className="font-bold text-xs uppercase tracking-wider text-[#071A4A] font-mono border-b border-[#E4EAF2] pb-2">` |
| 1007 | hex | `#071A4A` | `<div className="flex justify-between text-xs font-semibold text-[#071A4A]">` |
| 1009 | hex | `#1557D6` | `<span className="font-mono text-[#1557D6]">{row.pct}%</span>` |
| 1011 | hex | `#E4EAF2` | `<div className="h-2 w-full bg-[#E4EAF2] rounded-full overflow-hidden">` |
| 1013 | hex | `#1557D6` | `className="h-full bg-gradient-to-r from-[#1557D6] to-[#27B9B3] rounded-full transition-all duration-700"` |
| 1013 | hex | `#27B9B3` | `className="h-full bg-gradient-to-r from-[#1557D6] to-[#27B9B3] rounded-full transition-all duration-700"` |
| 1022 | hex | `#E4EAF2` | `<div className="sm:col-span-5 rounded-2xl border border-[#E4EAF2] bg-[#F7FAFC] p-5 flex flex-col items-center justify-center text-center">` |
| 1022 | hex | `#F7FAFC` | `<div className="sm:col-span-5 rounded-2xl border border-[#E4EAF2] bg-[#F7FAFC] p-5 flex flex-col items-center justify-center text-center">` |
| 1023 | hex | `#071A4A` | `<span className="font-bold text-xs uppercase tracking-wider text-[#071A4A] font-mono mb-2">` |
| 1031 | hex | `#E4EAF2` | `className="text-[#E4EAF2]"` |
| 1038 | hex | `#27B9B3` | `className="text-[#27B9B3]"` |
| 1048 | hex | `#071A4A` | `<span className="font-extrabold text-2xl text-[#071A4A]">81%</span>` |
| 1051 | hex | `#69758A` | `<span className="text-[10px] text-[#69758A] font-mono italic">` |
| 1061 | hex | `#071A4A` | `<h2 className="text-2xl sm:text-3xl font-extrabold text-[#071A4A] tracking-tight">` |
| 1064 | hex | `#69758A` | `<p className="text-sm text-[#69758A] mt-1">` |
| 1070 | hex | `#E4EAF2` | `<div className="relative rounded-2xl overflow-hidden border border-[#E4EAF2] shadow-sm bg-[#F7FAFC]">` |
| 1070 | hex | `#F7FAFC` | `<div className="relative rounded-2xl overflow-hidden border border-[#E4EAF2] shadow-sm bg-[#F7FAFC]">` |
| 1079 | hex | `#071A4A` | `<div className="absolute inset-0 bg-gradient-to-t from-[#071A4A]/80 via-transparent to-transparent flex items-end p-4 sm:p-5">` |
| 1080 | hex | `#E4EAF2` | `<div className="rounded-xl bg-white/95 backdrop-blur-md p-3.5 sm:p-4 shadow-lg border border-[#E4EAF2] w-full text-xs space-y-1.5 tone-light card-light">` |
| 1088 | hex | `#071A4A` | `<div key={item} className="flex items-center gap-2 font-semibold text-[#071A4A]">` |
| 1089 | hex | `#27B9B3` | `<Check className="h-3.5 w-3.5 text-[#27B9B3] shrink-0" />` |
| 1102 | hex | `#E4EAF2` | `<section className="py-14 sm:py-20 bg-white border-b border-[#E4EAF2]">` |
| 1105 | hex | `#071A4A` | `<h2 className="text-2xl sm:text-3xl font-extrabold text-[#071A4A] tracking-tight">` |
| 1108 | hex | `#69758A` | `<p className="text-sm sm:text-base text-[#69758A] mt-1 max-w-xl mx-auto">` |
| 1116 | hex | `#1557D6` | `{ name: "IQVIA", logoText: "IQVIA", color: "text-[#1557D6]" },` |
| 1117 | hex | `#0B2545` | `{ name: "Cognizant", logoText: "Cognizant", color: "text-[#0B2545]" },` |
| 1118 | hex | `#071A4A` | `{ name: "Accenture", logoText: "accenture", color: "text-[#071A4A]" },` |
| 1119 | hex | `#6946E8` | `{ name: "Parexel", logoText: "parexel.", color: "text-[#6946E8]" },` |
| 1120 | hex | `#6946E8` | `{ name: "Dr. Reddy's", logoText: "Dr.Reddy's", color: "text-[#6946E8]" },` |
| 1121 | hex | `#D97706` | `{ name: "Sun Pharma", logoText: "SUN PHARMA", color: "text-[#D97706]" },` |
| 1122 | hex | `#1557D6` | `{ name: "Cipla", logoText: "Cipla", color: "text-[#1557D6]" },` |
| 1127 | hex | `#E4EAF2` | `className="h-16 rounded-xl border border-[#E4EAF2] bg-white tone-light shadow-2xs hover:border-[#1557D6] hover:shadow-xs transition-all flex items-center justify-center p-2 text-ce` |
| 1127 | hex | `#1557D6` | `className="h-16 rounded-xl border border-[#E4EAF2] bg-white tone-light shadow-2xs hover:border-[#1557D6] hover:shadow-xs transition-all flex items-center justify-center p-2 text-ce` |
| 1138 | hex | `#69758A` | `<p className="text-[11px] text-[#69758A] font-mono max-w-2xl mx-auto">` |
| 1145 | hex | `#F7FAFC` | `<section className="py-14 sm:py-20 bg-gradient-to-b from-[#F7FAFC] to-white border-b border-[#E4EAF2]">` |
| 1145 | hex | `#E4EAF2` | `<section className="py-14 sm:py-20 bg-gradient-to-b from-[#F7FAFC] to-white border-b border-[#E4EAF2]">` |
| 1152 | hex | `#1557D6` | `<div className="absolute inset-0 bg-gradient-to-tr from-[#1557D6]/20 via-[#6946E8]/20 to-[#27B9B3]/20 rounded-full blur-xl transform scale-95" />` |
| 1152 | hex | `#6946E8` | `<div className="absolute inset-0 bg-gradient-to-tr from-[#1557D6]/20 via-[#6946E8]/20 to-[#27B9B3]/20 rounded-full blur-xl transform scale-95" />` |
| 1152 | hex | `#27B9B3` | `<div className="absolute inset-0 bg-gradient-to-tr from-[#1557D6]/20 via-[#6946E8]/20 to-[#27B9B3]/20 rounded-full blur-xl transform scale-95" />` |
| 1156 | hex | `#E4EAF2` | `className="relative z-10 w-full h-full object-cover object-top rounded-2xl border border-[#E4EAF2] shadow-md"` |
| 1167 | hex | `#071A4A` | `<h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#071A4A] tracking-tight">` |
| 1171 | hex | `#69758A` | `<p className="text-sm sm:text-base text-[#69758A] font-medium">` |
| 1174 | hex | `#1557D6` | `<span className="font-mono text-xs font-bold text-[#1557D6] bg-[#EEF6FF] px-2.5 py-0.5 rounded-full">` |
| 1174 | hex | `#EEF6FF` | `<span className="font-mono text-xs font-bold text-[#1557D6] bg-[#EEF6FF] px-2.5 py-0.5 rounded-full">` |
| 1183 | hex | `#EEF6FF` | `{ title: "Medical knowledge", icon: Activity, bg: "bg-[#EEF6FF]", color: "text-[#1557D6]" },` |
| 1183 | hex | `#1557D6` | `{ title: "Medical knowledge", icon: Activity, bg: "bg-[#EEF6FF]", color: "text-[#1557D6]" },` |
| 1184 | hex | `#F1EEFF` | `{ title: "Structured processes", icon: Database, bg: "bg-[#F1EEFF]", color: "text-[#6946E8]" },` |
| 1184 | hex | `#6946E8` | `{ title: "Structured processes", icon: Database, bg: "bg-[#F1EEFF]", color: "text-[#6946E8]" },` |
| 1185 | hex | `#E6F8F7` | `{ title: "Detailed work", icon: Search, bg: "bg-[#E6F8F7]", color: "text-[#27B9B3]" },` |
| 1185 | hex | `#27B9B3` | `{ title: "Detailed work", icon: Search, bg: "bg-[#E6F8F7]", color: "text-[#27B9B3]" },` |
| 1186 | hex | `#EEF6FF` | `{ title: "Documentation", icon: FileText, bg: "bg-[#EEF6FF]", color: "text-[#1557D6]" },` |
| 1186 | hex | `#1557D6` | `{ title: "Documentation", icon: FileText, bg: "bg-[#EEF6FF]", color: "text-[#1557D6]" },` |
| 1187 | hex | `#FFF8EE` | `{ title: "Safety and compliance", icon: ShieldCheck, bg: "bg-[#FFF8EE]", color: "text-[#F59E0B]" },` |
| 1187 | hex | `#F59E0B` | `{ title: "Safety and compliance", icon: ShieldCheck, bg: "bg-[#FFF8EE]", color: "text-[#F59E0B]" },` |
| 1195 | hex | `#1557D6` | `className={`rounded-xl border p-3.5 flex items-center justify-between shadow-2xs transition-all cursor-pointer ${isChecked ? "border-[#1557D6] bg-[#EEF6FF]/30" : "border-[#E4EAF2] ` |
| 1195 | hex | `#EEF6FF` | `className={`rounded-xl border p-3.5 flex items-center justify-between shadow-2xs transition-all cursor-pointer ${isChecked ? "border-[#1557D6] bg-[#EEF6FF]/30" : "border-[#E4EAF2] ` |
| 1195 | hex | `#E4EAF2` | `className={`rounded-xl border p-3.5 flex items-center justify-between shadow-2xs transition-all cursor-pointer ${isChecked ? "border-[#1557D6] bg-[#EEF6FF]/30" : "border-[#E4EAF2] ` |
| 1195 | hex | `#1557D6` | `className={`rounded-xl border p-3.5 flex items-center justify-between shadow-2xs transition-all cursor-pointer ${isChecked ? "border-[#1557D6] bg-[#EEF6FF]/30" : "border-[#E4EAF2] ` |
| 1201 | hex | `#071A4A` | `<span className="text-xs font-bold text-[#071A4A] leading-tight">` |
| 1205 | hex | `#1557D6` | `<div className={`h-4 w-4 rounded flex items-center justify-center border text-[10px] ${isChecked ? "bg-[#1557D6] border-[#1557D6] text-white" : "border-stone-300"}`}>` |
| 1205 | hex | `#1557D6` | `<div className={`h-4 w-4 rounded flex items-center justify-center border text-[10px] ${isChecked ? "bg-[#1557D6] border-[#1557D6] text-white" : "border-stone-300"}`}>` |
| 1214 | hex | `#E4EAF2` | `<div className="pt-4 border-t border-[#E4EAF2] space-y-4">` |
| 1218 | hex | `#071A4A` | `className="w-full sm:w-auto h-12 px-6 rounded-xl bg-[#071A4A] hover:bg-[#1557D6] text-slate-50 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2` |
| 1218 | hex | `#1557D6` | `className="w-full sm:w-auto h-12 px-6 rounded-xl bg-[#071A4A] hover:bg-[#1557D6] text-slate-50 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2` |
| 1241 | hex | `#69758A` | `<p className="text-xs text-[#69758A] font-medium leading-tight">` |
| 1252 | hex | `#E4EAF2` | `<section className="py-14 sm:py-20 bg-white border-b border-[#E4EAF2]">` |
| 1255 | hex | `#071A4A` | `<h2 className="text-2xl sm:text-3xl font-extrabold text-[#071A4A] tracking-tight text-center sm:text-left">` |
| 1269 | hex | `#1557D6` | `? "border-[#1557D6] bg-[#EEF6FF]/40 shadow-xs"` |
| 1269 | hex | `#EEF6FF` | `? "border-[#1557D6] bg-[#EEF6FF]/40 shadow-xs"` |
| 1270 | hex | `#E4EAF2` | `: "border-[#E4EAF2] bg-white tone-light hover:border-[#1557D6]"` |
| 1270 | hex | `#1557D6` | `: "border-[#E4EAF2] bg-white tone-light hover:border-[#1557D6]"` |
| 1281 | hex | `#071A4A` | `<span className="font-bold text-xs sm:text-sm text-[#071A4A] leading-snug">` |
| 1286 | hex | `#1557D6` | `isOpen ? "bg-[#1557D6] text-slate-50 rotate-180" : "bg-[#F7FAFC] text-[#1557D6]"` |
| 1286 | hex | `#F7FAFC` | `isOpen ? "bg-[#1557D6] text-slate-50 rotate-180" : "bg-[#F7FAFC] text-[#1557D6]"` |
| 1286 | hex | `#1557D6` | `isOpen ? "bg-[#1557D6] text-slate-50 rotate-180" : "bg-[#F7FAFC] text-[#1557D6]"` |
| 1293 | hex | `#69758A` | `<div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-[#69758A] leading-relaxed border-t border-[#E4EAF2]/60 mt-1">` |
| 1293 | hex | `#E4EAF2` | `<div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-[#69758A] leading-relaxed border-t border-[#E4EAF2]/60 mt-1">` |
| 1305 | hex | `#071A4A` | `<footer className="py-14 sm:py-16 bg-[#071A4A] text-slate-50 border-t border-slate-800">` |
| 1310 | hex | `#27B9B3` | `<div className="h-11 w-11 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center font-black text-xl text-[#27B9B3]">` |
| 1337 | hex | `#EEF6FF` | `className="w-full sm:w-auto h-12 px-6 rounded-xl bg-white tone-light hover:bg-[#EEF6FF] text-[#071A4A] font-bold text-xs uppercase tracking-wider flex items-center justify-center g` |
| 1337 | hex | `#071A4A` | `className="w-full sm:w-auto h-12 px-6 rounded-xl bg-white tone-light hover:bg-[#EEF6FF] text-[#071A4A] font-bold text-xs uppercase tracking-wider flex items-center justify-center g` |
| 1353 | hex | `#E4EAF2` | `<div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E4EAF2] p-3 shadow-lg lg:hidden">` |
| 1357 | hex | `#071A4A` | `className="w-full h-12 rounded-xl bg-[#071A4A] text-slate-50 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer"` |
| 1367 | hex | `#E4EAF2` | `<div className="relative w-full max-w-2xl rounded-2xl bg-white tone-light p-6 sm:p-7 shadow-2xl border border-[#E4EAF2] space-y-4 my-8">` |
| 1371 | hex | `#69758A` | `className="absolute top-4 right-4 p-1.5 rounded-lg text-[#69758A] hover:bg-[#F7FAFC] hover:text-[#071A4A]"` |
| 1371 | hex | `#F7FAFC` | `className="absolute top-4 right-4 p-1.5 rounded-lg text-[#69758A] hover:bg-[#F7FAFC] hover:text-[#071A4A]"` |
| 1371 | hex | `#071A4A` | `className="absolute top-4 right-4 p-1.5 rounded-lg text-[#69758A] hover:bg-[#F7FAFC] hover:text-[#071A4A]"` |
| 1376 | hex | `#E4EAF2` | `<div className="flex items-center gap-2.5 border-b border-[#E4EAF2] pb-3">` |
| 1377 | hex | `#EEF6FF` | `<div className="h-9 w-9 rounded-xl bg-[#EEF6FF] text-[#1557D6] flex items-center justify-center shrink-0">` |
| 1377 | hex | `#1557D6` | `<div className="h-9 w-9 rounded-xl bg-[#EEF6FF] text-[#1557D6] flex items-center justify-center shrink-0">` |
| 1382 | hex | `#1557D6` | `<span className="font-mono text-[10px] font-bold text-[#1557D6] uppercase tracking-wider bg-[#EEF6FF] px-2 py-0.5 rounded">` |
| 1382 | hex | `#EEF6FF` | `<span className="font-mono text-[10px] font-bold text-[#1557D6] uppercase tracking-wider bg-[#EEF6FF] px-2 py-0.5 rounded">` |
| 1385 | hex | `#071A4A` | `<span className="font-mono text-xs font-black text-[#071A4A]">Case PV-2048</span>` |
| 1387 | hex | `#071A4A` | `<h3 className="font-extrabold text-lg text-[#071A4A] mt-0.5">` |
| 1394 | hex | `#F7FAFC` | `<div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#F7FAFC] p-3 rounded-xl border border-[#E4EAF2]">` |
| 1394 | hex | `#E4EAF2` | `<div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#F7FAFC] p-3 rounded-xl border border-[#E4EAF2]">` |
| 1396 | hex | `#69758A` | `<span className="text-[10px] text-[#69758A] block">PATIENT</span>` |
| 1397 | hex | `#071A4A` | `<strong className="text-[#071A4A]">34 Y / Female</strong>` |
| 1400 | hex | `#69758A` | `<span className="text-[10px] text-[#69758A] block">REPORTER</span>` |
| 1401 | hex | `#071A4A` | `<strong className="text-[#071A4A]">Physician (HCP)</strong>` |
| 1404 | hex | `#69758A` | `<span className="text-[10px] text-[#69758A] block">SUSPECT DRUG</span>` |
| 1405 | hex | `#071A4A` | `<strong className="text-[#071A4A]">Amoxicillin 500mg</strong>` |
| 1408 | hex | `#69758A` | `<span className="text-[10px] text-[#69758A] block">EVENT SERIOUSNESS</span>` |
| 1409 | hex | `#EF4444` | `<strong className="text-[#EF4444]">Serious (Hospitalization)</strong>` |
| 1413 | hex | `#E4EAF2` | `<div className="rounded-xl border border-[#E4EAF2] p-3.5 space-y-2 bg-white">` |
| 1414 | hex | `#071A4A` | `<span className="font-bold text-[#071A4A] block">Source Narrative Excerpt:</span>` |
| 1415 | hex | `#3F4A60` | `<p className="text-[#3F4A60] font-sans text-xs leading-relaxed">` |
| 1421 | hex | `#E4EAF2` | `<div className="rounded-xl border border-[#E4EAF2] p-3 bg-[#EEF6FF]/40 space-y-1">` |
| 1421 | hex | `#EEF6FF` | `<div className="rounded-xl border border-[#E4EAF2] p-3 bg-[#EEF6FF]/40 space-y-1">` |
| 1422 | hex | `#1557D6` | `<span className="font-bold text-[#1557D6] text-[11px] block">MedDRA Mapping:</span>` |
| 1423 | hex | `#071A4A` | `<div className="text-[11px] text-[#071A4A]">` |
| 1429 | hex | `#E4EAF2` | `<div className="rounded-xl border border-[#E4EAF2] p-3 bg-[#E6F8F7]/40 space-y-1">` |
| 1429 | hex | `#E6F8F7` | `<div className="rounded-xl border border-[#E4EAF2] p-3 bg-[#E6F8F7]/40 space-y-1">` |
| 1430 | hex | `#27B9B3` | `<span className="font-bold text-[#27B9B3] text-[11px] block">Regulatory Clock:</span>` |
| 1431 | hex | `#071A4A` | `<div className="text-[11px] text-[#071A4A]">` |
| 1441 | hex | `#69758A` | `<span className="text-[11px] text-[#69758A] font-sans">` |
| 1450 | hex | `#071A4A` | `className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#071A4A] hover:bg-[#1557D6] text-slate-50 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-cent` |
| 1450 | hex | `#1557D6` | `className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#071A4A] hover:bg-[#1557D6] text-slate-50 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-cent` |
| 1462 | hex | `#E4EAF2` | `<div className="relative w-full max-w-lg rounded-2xl bg-white tone-light p-6 shadow-2xl border border-[#E4EAF2] space-y-4 my-8">` |
| 1466 | hex | `#69758A` | `className="absolute top-4 right-4 p-1.5 rounded-lg text-[#69758A] hover:bg-[#F7FAFC] hover:text-[#071A4A]"` |
| 1466 | hex | `#F7FAFC` | `className="absolute top-4 right-4 p-1.5 rounded-lg text-[#69758A] hover:bg-[#F7FAFC] hover:text-[#071A4A]"` |
| 1466 | hex | `#071A4A` | `className="absolute top-4 right-4 p-1.5 rounded-lg text-[#69758A] hover:bg-[#F7FAFC] hover:text-[#071A4A]"` |
| 1472 | hex | `#EEF6FF` | `<div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EEF6FF] text-[#1557D6] font-mono text-[10px] font-bold uppercase tracking-wider mb-2">` |
| 1472 | hex | `#1557D6` | `<div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EEF6FF] text-[#1557D6] font-mono text-[10px] font-bold uppercase tracking-wider mb-2">` |
| 1475 | hex | `#071A4A` | `<h3 className="font-extrabold text-xl text-[#071A4A]">` |
| 1480 | hex | `#3F4A60` | `<p className="text-xs sm:text-sm text-[#3F4A60] leading-relaxed">` |
| 1484 | hex | `#E4EAF2` | `<div className="rounded-xl border border-[#E4EAF2] bg-[#F7FAFC] p-4 text-xs space-y-2 font-mono">` |
| 1484 | hex | `#F7FAFC` | `<div className="rounded-xl border border-[#E4EAF2] bg-[#F7FAFC] p-4 text-xs space-y-2 font-mono">` |
| 1485 | hex | `#071A4A` | `<span className="font-bold text-[#071A4A] block">What You Practice at Arzon:</span>` |
| 1486 | hex | `#69758A` | `<ul className="space-y-1.5 text-[#69758A]">` |
| 1488 | hex | `#27B9B3` | `<Check className="h-3.5 w-3.5 text-[#27B9B3] shrink-0 mt-0.5" />` |
| 1492 | hex | `#27B9B3` | `<Check className="h-3.5 w-3.5 text-[#27B9B3] shrink-0 mt-0.5" />` |
| 1496 | hex | `#27B9B3` | `<Check className="h-3.5 w-3.5 text-[#27B9B3] shrink-0 mt-0.5" />` |
| 1508 | hex | `#071A4A` | `className="w-full h-11 rounded-xl bg-[#071A4A] hover:bg-[#1557D6] text-slate-50 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer tra` |
| 1508 | hex | `#1557D6` | `className="w-full h-11 rounded-xl bg-[#071A4A] hover:bg-[#1557D6] text-slate-50 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer tra` |
| 1519 | hex | `#E4EAF2` | `<div className="relative w-full max-w-lg rounded-2xl bg-white tone-light p-6 shadow-2xl border border-[#E4EAF2] space-y-4 my-8">` |
| 1523 | hex | `#69758A` | `className="absolute top-4 right-4 p-1.5 rounded-lg text-[#69758A] hover:bg-[#F7FAFC] hover:text-[#071A4A]"` |
| 1523 | hex | `#F7FAFC` | `className="absolute top-4 right-4 p-1.5 rounded-lg text-[#69758A] hover:bg-[#F7FAFC] hover:text-[#071A4A]"` |
| 1523 | hex | `#071A4A` | `className="absolute top-4 right-4 p-1.5 rounded-lg text-[#69758A] hover:bg-[#F7FAFC] hover:text-[#071A4A]"` |
| 1529 | hex | `#EEF6FF` | `<div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EEF6FF] text-[#1557D6] font-mono text-[10px] font-bold uppercase tracking-wider mb-2">` |
| 1529 | hex | `#1557D6` | `<div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EEF6FF] text-[#1557D6] font-mono text-[10px] font-bold uppercase tracking-wider mb-2">` |
| 1532 | hex | `#071A4A` | `<h3 className="font-extrabold text-xl text-[#071A4A]">` |
| 1538 | hex | `#E4EAF2` | `<div className="rounded-xl border border-[#E4EAF2] bg-[#F7FAFC] p-3 space-y-1 font-mono">` |
| 1538 | hex | `#F7FAFC` | `<div className="rounded-xl border border-[#E4EAF2] bg-[#F7FAFC] p-3 space-y-1 font-mono">` |
| 1540 | hex | `#69758A` | `<span className="text-[#69758A]">Typical Fresher Roles:</span>` |
| 1541 | hex | `#071A4A` | `<strong className="text-[#071A4A]">Trainee Drug Safety Associate / Junior PV</strong>` |
| 1544 | hex | `#69758A` | `<span className="text-[#69758A]">Key Hiring Hubs:</span>` |
| 1545 | hex | `#071A4A` | `<strong className="text-[#071A4A]">Hyderabad, Bangalore, Mumbai, Pune, Chennai</strong>` |
| 1548 | hex | `#69758A` | `<span className="text-[#69758A]">Core Tools Tested:</span>` |
| 1549 | hex | `#1557D6` | `<strong className="text-[#1557D6]">Argus Safety, MedDRA, ICSR Triage</strong>` |
| 1552 | hex | `#69758A` | `<p className="text-xs text-[#69758A] leading-relaxed">` |
| 1563 | hex | `#071A4A` | `className="w-full h-11 rounded-xl bg-[#071A4A] hover:bg-[#1557D6] text-slate-50 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer tra` |
| 1563 | hex | `#1557D6` | `className="w-full h-11 rounded-xl bg-[#071A4A] hover:bg-[#1557D6] text-slate-50 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer tra` |
| 1574 | hex | `#E4EAF2` | `<div className="relative w-full max-w-lg rounded-2xl bg-white tone-light p-6 sm:p-7 shadow-2xl border border-[#E4EAF2] space-y-5 my-8">` |
| 1581 | hex | `#69758A` | `className="absolute top-4 right-4 p-1.5 rounded-lg text-[#69758A] hover:bg-[#F7FAFC] hover:text-[#071A4A]"` |
| 1581 | hex | `#F7FAFC` | `className="absolute top-4 right-4 p-1.5 rounded-lg text-[#69758A] hover:bg-[#F7FAFC] hover:text-[#071A4A]"` |
| 1581 | hex | `#071A4A` | `className="absolute top-4 right-4 p-1.5 rounded-lg text-[#69758A] hover:bg-[#F7FAFC] hover:text-[#071A4A]"` |
| 1587 | hex | `#EEF6FF` | `<div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EEF6FF] text-[#1557D6] font-mono text-[10px] font-bold uppercase tracking-wider mb-2">` |
| 1587 | hex | `#1557D6` | `<div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EEF6FF] text-[#1557D6] font-mono text-[10px] font-bold uppercase tracking-wider mb-2">` |
| 1590 | hex | `#071A4A` | `<h3 className="font-extrabold text-xl sm:text-2xl text-[#071A4A] tracking-tight">` |
| 1593 | hex | `#69758A` | `<p className="text-xs text-[#69758A] mt-1 leading-relaxed">` |
| 1599 | hex | `#E6F8F7` | `<div className="rounded-xl bg-[#E6F8F7] border border-[#27B9B3]/40 p-5 text-center space-y-3">` |
| 1599 | hex | `#27B9B3` | `<div className="rounded-xl bg-[#E6F8F7] border border-[#27B9B3]/40 p-5 text-center space-y-3">` |
| 1600 | hex | `#27B9B3` | `<div className="h-10 w-10 rounded-full bg-[#27B9B3] text-slate-50 flex items-center justify-center mx-auto">` |
| 1603 | hex | `#071A4A` | `<h4 className="font-bold text-base text-[#071A4A]">Request Confirmed!</h4>` |
| 1604 | hex | `#3F4A60` | `<p className="text-xs text-[#3F4A60] leading-relaxed">` |
| 1611 | hex | `#071A4A` | `className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#071A4A] text-slate-50 font-mono text-xs font-bold uppercase tracking-wider"` |
| 1620 | hex | `#071A4A` | `<label className="block text-xs font-bold text-[#071A4A] mb-1 font-mono uppercase tracking-wider">` |
| 1629 | hex | `#E4EAF2` | `className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4EAF2] bg-[#F7FAFC] text-xs font-medium text-[#071A4A] focus:outline-none focus:ring-2 focus:ring-[#1557D6]"` |
| 1629 | hex | `#F7FAFC` | `className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4EAF2] bg-[#F7FAFC] text-xs font-medium text-[#071A4A] focus:outline-none focus:ring-2 focus:ring-[#1557D6]"` |
| 1629 | hex | `#071A4A` | `className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4EAF2] bg-[#F7FAFC] text-xs font-medium text-[#071A4A] focus:outline-none focus:ring-2 focus:ring-[#1557D6]"` |
| 1629 | hex | `#1557D6` | `className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4EAF2] bg-[#F7FAFC] text-xs font-medium text-[#071A4A] focus:outline-none focus:ring-2 focus:ring-[#1557D6]"` |
| 1634 | hex | `#071A4A` | `<label className="block text-xs font-bold text-[#071A4A] mb-1 font-mono uppercase tracking-wider">` |
| 1643 | hex | `#E4EAF2` | `className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4EAF2] bg-[#F7FAFC] text-xs font-medium text-[#071A4A] focus:outline-none focus:ring-2 focus:ring-[#1557D6]"` |
| 1643 | hex | `#F7FAFC` | `className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4EAF2] bg-[#F7FAFC] text-xs font-medium text-[#071A4A] focus:outline-none focus:ring-2 focus:ring-[#1557D6]"` |
| 1643 | hex | `#071A4A` | `className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4EAF2] bg-[#F7FAFC] text-xs font-medium text-[#071A4A] focus:outline-none focus:ring-2 focus:ring-[#1557D6]"` |
| 1643 | hex | `#1557D6` | `className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4EAF2] bg-[#F7FAFC] text-xs font-medium text-[#071A4A] focus:outline-none focus:ring-2 focus:ring-[#1557D6]"` |
| 1649 | hex | `#071A4A` | `<label className="block text-xs font-bold text-[#071A4A] mb-1 font-mono uppercase tracking-wider">` |
| 1655 | hex | `#E4EAF2` | `className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4EAF2] bg-[#F7FAFC] text-xs font-medium text-[#071A4A] focus:outline-none focus:ring-2 focus:ring-[#1557D6]"` |
| 1655 | hex | `#F7FAFC` | `className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4EAF2] bg-[#F7FAFC] text-xs font-medium text-[#071A4A] focus:outline-none focus:ring-2 focus:ring-[#1557D6]"` |
| 1655 | hex | `#071A4A` | `className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4EAF2] bg-[#F7FAFC] text-xs font-medium text-[#071A4A] focus:outline-none focus:ring-2 focus:ring-[#1557D6]"` |
| 1655 | hex | `#1557D6` | `className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4EAF2] bg-[#F7FAFC] text-xs font-medium text-[#071A4A] focus:outline-none focus:ring-2 focus:ring-[#1557D6]"` |
| 1665 | hex | `#071A4A` | `<label className="block text-xs font-bold text-[#071A4A] mb-1 font-mono uppercase tracking-wider">` |
| 1671 | hex | `#E4EAF2` | `className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4EAF2] bg-[#F7FAFC] text-xs font-medium text-[#071A4A] focus:outline-none focus:ring-2 focus:ring-[#1557D6]"` |
| 1671 | hex | `#F7FAFC` | `className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4EAF2] bg-[#F7FAFC] text-xs font-medium text-[#071A4A] focus:outline-none focus:ring-2 focus:ring-[#1557D6]"` |
| 1671 | hex | `#071A4A` | `className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4EAF2] bg-[#F7FAFC] text-xs font-medium text-[#071A4A] focus:outline-none focus:ring-2 focus:ring-[#1557D6]"` |
| 1671 | hex | `#1557D6` | `className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4EAF2] bg-[#F7FAFC] text-xs font-medium text-[#071A4A] focus:outline-none focus:ring-2 focus:ring-[#1557D6]"` |
| 1685 | hex | `#1557D6` | `className="mt-0.5 rounded text-[#1557D6] focus:ring-[#1557D6]"` |
| 1685 | hex | `#1557D6` | `className="mt-0.5 rounded text-[#1557D6] focus:ring-[#1557D6]"` |
| 1687 | hex | `#69758A` | `<span className="text-[11px] text-[#69758A] leading-tight">` |
| 1695 | hex | `#071A4A` | `className="flex-1 h-11 rounded-xl bg-[#071A4A] hover:bg-[#1557D6] text-slate-50 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer tra` |
| 1695 | hex | `#1557D6` | `className="flex-1 h-11 rounded-xl bg-[#071A4A] hover:bg-[#1557D6] text-slate-50 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer tra` |
| 1698 | hex | `#27B9B3` | `<ArrowRight className="h-3.5 w-3.5 text-[#27B9B3]" />` |
| 1720 | hex | `#E4EAF2` | `<div className="relative w-full max-w-2xl rounded-2xl bg-white tone-light p-6 sm:p-7 shadow-2xl border border-[#E4EAF2] space-y-4 my-8">` |
| 1724 | hex | `#69758A` | `className="absolute top-4 right-4 p-1.5 rounded-lg text-[#69758A] hover:bg-[#F7FAFC] hover:text-[#071A4A]"` |
| 1724 | hex | `#F7FAFC` | `className="absolute top-4 right-4 p-1.5 rounded-lg text-[#69758A] hover:bg-[#F7FAFC] hover:text-[#071A4A]"` |
| 1724 | hex | `#071A4A` | `className="absolute top-4 right-4 p-1.5 rounded-lg text-[#69758A] hover:bg-[#F7FAFC] hover:text-[#071A4A]"` |
| 1730 | hex | `#EEF6FF` | `<div className="h-8 w-8 rounded-lg bg-[#EEF6FF] text-[#1557D6] flex items-center justify-center">` |
| 1730 | hex | `#1557D6` | `<div className="h-8 w-8 rounded-lg bg-[#EEF6FF] text-[#1557D6] flex items-center justify-center">` |
| 1731 | hex | `#1557D6` | `<Play className="h-4 w-4 fill-current text-[#1557D6]" />` |
| 1734 | hex | `#071A4A` | `<h3 className="font-extrabold text-lg sm:text-xl text-[#071A4A]">` |
| 1737 | hex | `#69758A` | `<p className="text-xs text-[#69758A]">` |
| 1766 | hex | `#E4EAF2` | `<div key={step.time} className="rounded-xl border border-[#E4EAF2] bg-[#F7FAFC] p-3.5 flex items-start gap-3">` |
| 1766 | hex | `#F7FAFC` | `<div key={step.time} className="rounded-xl border border-[#E4EAF2] bg-[#F7FAFC] p-3.5 flex items-start gap-3">` |
| 1767 | hex | `#1557D6` | `<span className="font-mono text-[11px] font-bold text-[#1557D6] bg-white tone-light px-2 py-1 rounded border border-[#E4EAF2] shrink-0">` |
| 1767 | hex | `#E4EAF2` | `<span className="font-mono text-[11px] font-bold text-[#1557D6] bg-white tone-light px-2 py-1 rounded border border-[#E4EAF2] shrink-0">` |
| 1771 | hex | `#071A4A` | `<h4 className="font-bold text-xs text-[#071A4A]">{step.title}</h4>` |
| 1772 | hex | `#69758A` | `<p className="text-xs text-[#69758A] mt-0.5 leading-relaxed">{step.desc}</p>` |
| 1785 | hex | `#071A4A` | `className="px-5 py-2.5 rounded-xl bg-[#071A4A] hover:bg-[#1557D6] text-slate-50 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transiti` |
| 1785 | hex | `#1557D6` | `className="px-5 py-2.5 rounded-xl bg-[#071A4A] hover:bg-[#1557D6] text-slate-50 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transiti` |
| 1797 | hex | `#E4EAF2` | `<div className="relative w-full max-w-2xl rounded-2xl bg-white tone-light p-6 sm:p-7 shadow-2xl border border-[#E4EAF2] space-y-4 my-8">` |
| 1801 | hex | `#69758A` | `className="absolute top-4 right-4 p-1.5 rounded-lg text-[#69758A] hover:bg-[#F7FAFC] hover:text-[#071A4A]"` |
| 1801 | hex | `#F7FAFC` | `className="absolute top-4 right-4 p-1.5 rounded-lg text-[#69758A] hover:bg-[#F7FAFC] hover:text-[#071A4A]"` |
| 1801 | hex | `#071A4A` | `className="absolute top-4 right-4 p-1.5 rounded-lg text-[#69758A] hover:bg-[#F7FAFC] hover:text-[#071A4A]"` |
| 1807 | hex | `#EEF6FF` | `<div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EEF6FF] text-[#1557D6] font-mono text-[10px] font-bold uppercase tracking-wider mb-2">` |
| 1807 | hex | `#1557D6` | `<div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EEF6FF] text-[#1557D6] font-mono text-[10px] font-bold uppercase tracking-wider mb-2">` |
| 1810 | hex | `#071A4A` | `<h3 className="font-extrabold text-xl text-[#071A4A]">` |
| 1813 | hex | `#69758A` | `<p className="text-xs text-[#69758A] mt-1">` |
| 1841 | hex | `#E4EAF2` | `<div key={jd.skill} className="rounded-xl border border-[#E4EAF2] bg-[#F7FAFC] p-3.5 space-y-1">` |
| 1841 | hex | `#F7FAFC` | `<div key={jd.skill} className="rounded-xl border border-[#E4EAF2] bg-[#F7FAFC] p-3.5 space-y-1">` |
| 1843 | hex | `#071A4A` | `<span className="font-bold text-xs text-[#071A4A]">{jd.skill}</span>` |
| 1844 | hex | `#1557D6` | `<span className="text-[11px] font-mono font-bold text-[#1557D6] bg-white tone-light px-2 py-0.5 rounded border border-[#E4EAF2]">` |
| 1844 | hex | `#E4EAF2` | `<span className="text-[11px] font-mono font-bold text-[#1557D6] bg-white tone-light px-2 py-0.5 rounded border border-[#E4EAF2]">` |
| 1848 | hex | `#69758A` | `<p className="text-xs text-[#69758A] leading-relaxed">{jd.note}</p>` |
| 1860 | hex | `#071A4A` | `className="px-5 py-2.5 rounded-xl bg-[#071A4A] hover:bg-[#1557D6] text-slate-50 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transiti` |
| 1860 | hex | `#1557D6` | `className="px-5 py-2.5 rounded-xl bg-[#071A4A] hover:bg-[#1557D6] text-slate-50 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transiti` |
| 1872 | hex | `#E4EAF2` | `<div className="relative w-full max-w-2xl rounded-2xl bg-white tone-light p-6 sm:p-7 shadow-2xl border border-[#E4EAF2] space-y-4 my-8">` |
| 1876 | hex | `#69758A` | `className="absolute top-4 right-4 p-1.5 rounded-lg text-[#69758A] hover:bg-[#F7FAFC] hover:text-[#071A4A]"` |
| 1876 | hex | `#F7FAFC` | `className="absolute top-4 right-4 p-1.5 rounded-lg text-[#69758A] hover:bg-[#F7FAFC] hover:text-[#071A4A]"` |
| 1876 | hex | `#071A4A` | `className="absolute top-4 right-4 p-1.5 rounded-lg text-[#69758A] hover:bg-[#F7FAFC] hover:text-[#071A4A]"` |
| 1882 | hex | `#E6F8F7` | `<div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E6F8F7] text-[#27B9B3] font-mono text-[10px] font-bold uppercase tracking-wider mb-2">` |
| 1882 | hex | `#27B9B3` | `<div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E6F8F7] text-[#27B9B3] font-mono text-[10px] font-bold uppercase tracking-wider mb-2">` |
| 1885 | hex | `#071A4A` | `<h3 className="font-extrabold text-xl text-[#071A4A]">` |
| 1888 | hex | `#69758A` | `<p className="text-xs text-[#69758A] mt-1">` |
| 1894 | hex | `#E4EAF2` | `<div className="rounded-xl border border-[#E4EAF2] bg-[#F7FAFC] p-4 space-y-2">` |
| 1894 | hex | `#F7FAFC` | `<div className="rounded-xl border border-[#E4EAF2] bg-[#F7FAFC] p-4 space-y-2">` |
| 1896 | hex | `#071A4A` | `<span className="font-bold text-xs text-[#071A4A]">Deliverable 01: ICSR Case Intake Dossier</span>` |
| 1897 | hex | `#EEF6FF` | `<span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EEF6FF] text-[#1557D6] font-bold">` |
| 1897 | hex | `#1557D6` | `<span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EEF6FF] text-[#1557D6] font-bold">` |
| 1901 | hex | `#69758A` | `<p className="text-xs text-[#69758A] leading-relaxed">` |
| 1906 | hex | `#E4EAF2` | `<div className="rounded-xl border border-[#E4EAF2] bg-[#F7FAFC] p-4 space-y-2">` |
| 1906 | hex | `#F7FAFC` | `<div className="rounded-xl border border-[#E4EAF2] bg-[#F7FAFC] p-4 space-y-2">` |
| 1908 | hex | `#071A4A` | `<span className="font-bold text-xs text-[#071A4A]">Deliverable 02: MedDRA Terminology Mapping Sheet</span>` |
| 1909 | hex | `#F1EEFF` | `<span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F1EEFF] text-[#6946E8] font-bold">` |
| 1909 | hex | `#6946E8` | `<span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F1EEFF] text-[#6946E8] font-bold">` |
| 1913 | hex | `#69758A` | `<p className="text-xs text-[#69758A] leading-relaxed">` |
| 1918 | hex | `#E4EAF2` | `<div className="rounded-xl border border-[#E4EAF2] bg-[#F7FAFC] p-4 space-y-2">` |
| 1918 | hex | `#F7FAFC` | `<div className="rounded-xl border border-[#E4EAF2] bg-[#F7FAFC] p-4 space-y-2">` |
| 1920 | hex | `#071A4A` | `<span className="font-bold text-xs text-[#071A4A]">Deliverable 03: Executive Case Narrative &amp; Causality Form</span>` |
| 1921 | hex | `#E6F8F7` | `<span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#E6F8F7] text-[#27B9B3] font-bold">` |
| 1921 | hex | `#27B9B3` | `<span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#E6F8F7] text-[#27B9B3] font-bold">` |
| 1925 | hex | `#69758A` | `<p className="text-xs text-[#69758A] leading-relaxed">` |
| 1938 | hex | `#071A4A` | `className="px-5 py-2.5 rounded-xl bg-[#071A4A] hover:bg-[#1557D6] text-slate-50 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transiti` |
| 1938 | hex | `#1557D6` | `className="px-5 py-2.5 rounded-xl bg-[#071A4A] hover:bg-[#1557D6] text-slate-50 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transiti` |

### `src\components\acri\AcriLandingPage.tsx` - 332

| Line | Kind | Value | Context |
|---:|---|---|---|
| 153 | hex | `#071A4A` | `<div className="bg-white min-h-screen text-[#071A4A] font-sans antialiased selection:bg-[#EEF6FF] selection:text-[#1557D6] tone-light">` |
| 153 | hex | `#EEF6FF` | `<div className="bg-white min-h-screen text-[#071A4A] font-sans antialiased selection:bg-[#EEF6FF] selection:text-[#1557D6] tone-light">` |
| 153 | hex | `#1557D6` | `<div className="bg-white min-h-screen text-[#071A4A] font-sans antialiased selection:bg-[#EEF6FF] selection:text-[#1557D6] tone-light">` |
| 157 | hex | `#E4EAF2` | `<section className="relative overflow-hidden bg-white pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#E4EAF2] tone-light">` |
| 163 | hex | `#D0E1FD` | `<div className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1557D6]">` |
| 163 | hex | `#EEF6FF` | `<div className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1557D6]">` |
| 163 | hex | `#1557D6` | `<div className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1557D6]">` |
| 164 | hex | `#1557D6` | `<span className="h-2 w-2 rounded-full bg-[#1557D6] motion-safe:animate-pulse" />` |
| 169 | hex | `#071A4A` | `<h1 className="font-serif text-4xl sm:text-5xl lg:text-[62px] font-bold tracking-tight text-[#071A4A] leading-[1.08]">` |
| 174 | hex | `#071A4A` | `<p className="text-base sm:text-lg font-bold text-[#071A4A] leading-snug">` |
| 179 | hex | `#3F4A60` | `<p className="text-sm sm:text-base text-[#3F4A60] leading-relaxed max-w-xl">` |
| 204 | hex | `#69758A` | `<p className="text-xs text-[#69758A] pt-0.5">` |
| 209 | hex | `#E4EAF2` | `<div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#E4EAF2]">` |
| 210 | hex | `#E4EAF2` | `<div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-[#E4EAF2]">` |
| 211 | hex | `#EEF6FF` | `<div className="h-6 w-6 rounded-full bg-[#EEF6FF] flex items-center justify-center text-[#1557D6] shrink-0">` |
| 211 | hex | `#1557D6` | `<div className="h-6 w-6 rounded-full bg-[#EEF6FF] flex items-center justify-center text-[#1557D6] shrink-0">` |
| 214 | hex | `#071A4A` | `<span className="text-xs font-semibold text-[#071A4A] truncate">Role-First Learning</span>` |
| 216 | hex | `#E4EAF2` | `<div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-[#E4EAF2]">` |
| 217 | hex | `#EEF6FF` | `<div className="h-6 w-6 rounded-full bg-[#EEF6FF] flex items-center justify-center text-[#1557D6] shrink-0">` |
| 217 | hex | `#1557D6` | `<div className="h-6 w-6 rounded-full bg-[#EEF6FF] flex items-center justify-center text-[#1557D6] shrink-0">` |
| 220 | hex | `#071A4A` | `<span className="text-xs font-semibold text-[#071A4A] truncate">Built from 247+ JDs</span>` |
| 222 | hex | `#E4EAF2` | `<div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-[#E4EAF2]">` |
| 223 | hex | `#EEF6FF` | `<div className="h-6 w-6 rounded-full bg-[#EEF6FF] flex items-center justify-center text-[#1557D6] shrink-0">` |
| 223 | hex | `#1557D6` | `<div className="h-6 w-6 rounded-full bg-[#EEF6FF] flex items-center justify-center text-[#1557D6] shrink-0">` |
| 226 | hex | `#071A4A` | `<span className="text-xs font-semibold text-[#071A4A] truncate">Hands-on Projects</span>` |
| 228 | hex | `#E4EAF2` | `<div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-[#E4EAF2]">` |
| 229 | hex | `#EEF6FF` | `<div className="h-6 w-6 rounded-full bg-[#EEF6FF] flex items-center justify-center text-[#1557D6] shrink-0">` |
| 229 | hex | `#1557D6` | `<div className="h-6 w-6 rounded-full bg-[#EEF6FF] flex items-center justify-center text-[#1557D6] shrink-0">` |
| 232 | hex | `#071A4A` | `<span className="text-xs font-semibold text-[#071A4A] truncate">Readiness Report</span>` |
| 239 | hex | `#E4EAF2` | `<div className="relative rounded-[28px] overflow-hidden border border-[#E4EAF2] shadow-2xl bg-white tone-light card-light aspect-[4/3] sm:aspect-[16/11]">` |
| 247 | hex | `#071A4A` | `<div className="absolute inset-0 bg-gradient-to-t from-[#071A4A]/40 via-transparent to-transparent pointer-events-none" />` |
| 252 | hex | `#E4EAF2` | `className="absolute top-4 left-4 bg-white/95 backdrop-blur-md border border-[#E4EAF2] rounded-2xl p-3.5 shadow-xl max-w-[210px] cursor-pointer hover:border-[#1557D6] transition-all` |
| 252 | hex | `#1557D6` | `className="absolute top-4 left-4 bg-white/95 backdrop-blur-md border border-[#E4EAF2] rounded-2xl p-3.5 shadow-xl max-w-[210px] cursor-pointer hover:border-[#1557D6] transition-all` |
| 254 | hex | `#E4EAF2` | `<div className="flex items-center justify-between pb-2 border-b border-[#E4EAF2] mb-2">` |
| 256 | hex | `#071A4A` | `<span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#071A4A]">ICSR CASE</span>` |
| 259 | hex | `#1557D6` | `<span className="text-[10px] text-[#1557D6] font-bold group-hover:underline">VIEW &rarr;</span>` |
| 261 | hex | `#3F4A60` | `<div className="space-y-1 font-mono text-[10px] text-[#3F4A60]">` |
| 263 | hex | `#69758A` | `<span className="text-[#69758A]">Case ID:</span>` |
| 264 | hex | `#071A4A` | `<span className="font-semibold text-[#071A4A]">PV-2048</span>` |
| 267 | hex | `#69758A` | `<span className="text-[#69758A]">Patient:</span>` |
| 268 | hex | `#071A4A` | `<span className="font-semibold text-[#071A4A]">34/F</span>` |
| 271 | hex | `#69758A` | `<span className="text-[#69758A]">Suspect Drug:</span>` |
| 272 | hex | `#071A4A` | `<span className="font-semibold text-[#071A4A]">Amoxicillin</span>` |
| 275 | hex | `#69758A` | `<span className="text-[#69758A]">Adverse Event:</span>` |
| 279 | hex | `#69758A` | `<span className="text-[#69758A]">Seriousness:</span>` |
| 283 | hex | `#E4EAF2` | `<div className="mt-2.5 pt-2 border-t border-[#E4EAF2] text-[10px] font-bold text-[#1557D6] flex items-center justify-between">` |
| 283 | hex | `#1557D6` | `<div className="mt-2.5 pt-2 border-t border-[#E4EAF2] text-[10px] font-bold text-[#1557D6] flex items-center justify-between">` |
| 290 | hex | `#E4EAF2` | `<div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md border border-[#E4EAF2] rounded-2xl p-3 shadow-xl space-y-2 tone-light card-light select-none hidden sm:block">` |
| 293 | hex | `#EEF6FF` | `className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-[#EEF6FF] cursor-pointer transition-colors"` |
| 295 | hex | `#1557D6` | `<FileText className="h-3.5 w-3.5 text-[#1557D6]" />` |
| 296 | hex | `#071A4A` | `<span className="text-xs font-semibold text-[#071A4A]">ICSR Processing</span>` |
| 300 | hex | `#EEF6FF` | `className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-[#EEF6FF] cursor-pointer transition-colors"` |
| 302 | hex | `#6946E8` | `<Layers className="h-3.5 w-3.5 text-[#6946E8]" />` |
| 303 | hex | `#071A4A` | `<span className="text-xs font-semibold text-[#071A4A]">MedDRA Coding</span>` |
| 307 | hex | `#EEF6FF` | `className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-[#EEF6FF] cursor-pointer transition-colors"` |
| 309 | hex | `#27B9B3` | `<ShieldAlert className="h-3.5 w-3.5 text-[#27B9B3]" />` |
| 310 | hex | `#071A4A` | `<span className="text-xs font-semibold text-[#071A4A]">Safety Assessment</span>` |
| 314 | hex | `#EEF6FF` | `className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-[#EEF6FF] cursor-pointer transition-colors"` |
| 316 | hex | `#1557D6` | `<BookOpen className="h-3.5 w-3.5 text-[#1557D6]" />` |
| 317 | hex | `#071A4A` | `<span className="text-xs font-semibold text-[#071A4A]">Case Narratives</span>` |
| 333 | hex | `#E4EAF2` | `<section id="role-in-action" className="py-16 lg:py-24 bg-slate-50 border-b border-[#E4EAF2]">` |
| 336 | hex | `#1557D6` | `<span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6] bg-[#EEF6FF] px-3.5 py-1 rounded-full border border-[#D0E1FD]">` |
| 336 | hex | `#EEF6FF` | `<span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6] bg-[#EEF6FF] px-3.5 py-1 rounded-full border border-[#D0E1FD]">` |
| 336 | hex | `#D0E1FD` | `<span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6] bg-[#EEF6FF] px-3.5 py-1 rounded-full border border-[#D0E1FD]">` |
| 339 | hex | `#071A4A` | `<h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#071A4A]">` |
| 342 | hex | `#3F4A60` | `<p className="text-base text-[#3F4A60]">` |
| 355 | hex | `#E4EAF2` | `className="relative block w-full overflow-hidden rounded-3xl border border-[#E4EAF2] bg-black p-0 text-left shadow-xl group cursor-pointer aspect-video focus:outline-none focus-vis` |
| 355 | hex | `#1557D6` | `className="relative block w-full overflow-hidden rounded-3xl border border-[#E4EAF2] bg-black p-0 text-left shadow-xl group cursor-pointer aspect-video focus:outline-none focus-vis` |
| 362 | hex | `#071A4A` | `<div className="absolute inset-0 bg-[#071A4A]/40 flex items-center justify-center">` |
| 363 | hex | `#1557D6` | `<div className="h-16 w-16 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#1557D6] shadow-2xl group-hover:scale-110 transition-transform tone-light` |
| 364 | hex | `#1557D6` | `<Play className="h-7 w-7 fill-[#1557D6] ml-1" />` |
| 368 | hex | `#071A4A` | `<span className="font-semibold text-[#071A4A]">Watch a 2-Minute Day-in-the-Life Walkthrough</span>` |
| 369 | hex | `#1557D6` | `<span className="font-mono text-[#1557D6] font-bold">02:14 &bull; HD</span>` |
| 376 | hex | `#E4EAF2` | `<div className="p-4 rounded-2xl bg-white border border-[#E4EAF2] shadow-sm tone-light card-light">` |
| 377 | hex | `#1557D6` | `<div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1557D6] uppercase">` |
| 382 | hex | `#071A4A` | `<h4 className="text-sm font-bold text-[#071A4A] mt-1">Four Minimum Criteria Verification</h4>` |
| 383 | hex | `#69758A` | `<p className="text-xs text-[#69758A] mt-0.5">` |
| 388 | hex | `#E4EAF2` | `<div className="p-4 rounded-2xl bg-white border border-[#E4EAF2] shadow-sm tone-light card-light">` |
| 389 | hex | `#6946E8` | `<div className="flex items-center gap-2 text-xs font-mono font-bold text-[#6946E8] uppercase">` |
| 394 | hex | `#071A4A` | `<h4 className="text-sm font-bold text-[#071A4A] mt-1">Medical Terminology Mapping</h4>` |
| 395 | hex | `#69758A` | `<p className="text-xs text-[#69758A] mt-0.5">` |
| 400 | hex | `#E4EAF2` | `<div className="p-4 rounded-2xl bg-white border border-[#E4EAF2] shadow-sm tone-light card-light">` |
| 401 | hex | `#27B9B3` | `<div className="flex items-center gap-2 text-xs font-mono font-bold text-[#27B9B3] uppercase">` |
| 406 | hex | `#071A4A` | `<h4 className="text-sm font-bold text-[#071A4A] mt-1">Chronological Medical Case Summary</h4>` |
| 407 | hex | `#69758A` | `<p className="text-xs text-[#69758A] mt-0.5">` |
| 412 | hex | `#E4EAF2` | `<div className="p-4 rounded-2xl bg-white border border-[#E4EAF2] shadow-sm tone-light card-light">` |
| 413 | hex | `#1557D6` | `<div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1557D6] uppercase">` |
| 418 | hex | `#071A4A` | `<h4 className="text-sm font-bold text-[#071A4A] mt-1">7-Day &amp; 15-Day Submission</h4>` |
| 419 | hex | `#69758A` | `<p className="text-xs text-[#69758A] mt-0.5">` |
| 431 | hex | `#E4EAF2` | `<section className="py-16 lg:py-24 bg-white border-b border-[#E4EAF2] tone-light">` |
| 434 | hex | `#1557D6` | `<span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6] bg-[#EEF6FF] px-3.5 py-1 rounded-full border border-[#D0E1FD]">` |
| 434 | hex | `#EEF6FF` | `<span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6] bg-[#EEF6FF] px-3.5 py-1 rounded-full border border-[#D0E1FD]">` |
| 434 | hex | `#D0E1FD` | `<span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6] bg-[#EEF6FF] px-3.5 py-1 rounded-full border border-[#D0E1FD]">` |
| 437 | hex | `#071A4A` | `<h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#071A4A]">` |
| 440 | hex | `#3F4A60` | `<p className="text-base text-[#3F4A60]">` |
| 451 | hex | `#071A4A` | `<h3 className="font-serif text-xl font-bold text-[#071A4A]">Passive Information Consumption</h3>` |
| 452 | hex | `#69758A` | `<ul className="space-y-3 text-sm text-[#69758A]">` |
| 473 | hex | `#EEF6FF` | `<div className="p-8 rounded-3xl bg-[#EEF6FF]/50 border border-[#D0E1FD] space-y-4 shadow-sm">` |
| 473 | hex | `#D0E1FD` | `<div className="p-8 rounded-3xl bg-[#EEF6FF]/50 border border-[#D0E1FD] space-y-4 shadow-sm">` |
| 474 | hex | `#1557D6` | `<div className="inline-flex items-center gap-2 text-xs font-bold font-mono uppercase text-[#1557D6] bg-white px-3 py-1 rounded-full border border-[#D0E1FD] tone-light">` |
| 474 | hex | `#D0E1FD` | `<div className="inline-flex items-center gap-2 text-xs font-bold font-mono uppercase text-[#1557D6] bg-white px-3 py-1 rounded-full border border-[#D0E1FD] tone-light">` |
| 477 | hex | `#071A4A` | `<h3 className="font-serif text-xl font-bold text-[#071A4A]">Demonstrated Clinical Capability</h3>` |
| 478 | hex | `#071A4A` | `<ul className="space-y-3 text-sm text-[#071A4A]">` |
| 480 | hex | `#1557D6` | `<CheckCircle2 className="h-4 w-4 text-[#1557D6] shrink-0 mt-0.5" />` |
| 484 | hex | `#1557D6` | `<CheckCircle2 className="h-4 w-4 text-[#1557D6] shrink-0 mt-0.5" />` |
| 488 | hex | `#1557D6` | `<CheckCircle2 className="h-4 w-4 text-[#1557D6] shrink-0 mt-0.5" />` |
| 492 | hex | `#1557D6` | `<CheckCircle2 className="h-4 w-4 text-[#1557D6] shrink-0 mt-0.5" />` |
| 504 | hex | `#E4EAF2` | `<section className="py-16 lg:py-24 bg-slate-50 border-b border-[#E4EAF2]">` |
| 507 | hex | `#1557D6` | `<span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6] bg-[#EEF6FF] px-3.5 py-1 rounded-full border border-[#D0E1FD]">` |
| 507 | hex | `#EEF6FF` | `<span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6] bg-[#EEF6FF] px-3.5 py-1 rounded-full border border-[#D0E1FD]">` |
| 507 | hex | `#D0E1FD` | `<span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6] bg-[#EEF6FF] px-3.5 py-1 rounded-full border border-[#D0E1FD]">` |
| 510 | hex | `#071A4A` | `<h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#071A4A]">` |
| 513 | hex | `#3F4A60` | `<p className="text-base text-[#3F4A60]">` |
| 520 | hex | `#E4EAF2` | `<div className="p-6 rounded-3xl bg-white border border-[#E4EAF2] shadow-sm space-y-3 tone-light card-light">` |
| 521 | hex | `#1557D6` | `<span className="font-mono text-xs font-bold text-[#1557D6] uppercase">Weeks 01 &ndash; 03</span>` |
| 522 | hex | `#071A4A` | `<h3 className="font-serif text-lg font-bold text-[#071A4A]">Drug Safety Foundations</h3>` |
| 523 | hex | `#69758A` | `<p className="text-xs text-[#69758A] leading-relaxed">` |
| 526 | hex | `#E4EAF2` | `<div className="pt-2 border-t border-[#E4EAF2] text-[11px] font-semibold text-[#071A4A]">` |
| 526 | hex | `#071A4A` | `<div className="pt-2 border-t border-[#E4EAF2] text-[11px] font-semibold text-[#071A4A]">` |
| 532 | hex | `#E4EAF2` | `<div className="p-6 rounded-3xl bg-white border border-[#E4EAF2] shadow-sm space-y-3 tone-light card-light">` |
| 533 | hex | `#6946E8` | `<span className="font-mono text-xs font-bold text-[#6946E8] uppercase">Weeks 04 &ndash; 06</span>` |
| 534 | hex | `#071A4A` | `<h3 className="font-serif text-lg font-bold text-[#071A4A]">MedDRA 27.0 Hierarchy</h3>` |
| 535 | hex | `#69758A` | `<p className="text-xs text-[#69758A] leading-relaxed">` |
| 538 | hex | `#E4EAF2` | `<div className="pt-2 border-t border-[#E4EAF2] text-[11px] font-semibold text-[#071A4A]">` |
| 538 | hex | `#071A4A` | `<div className="pt-2 border-t border-[#E4EAF2] text-[11px] font-semibold text-[#071A4A]">` |
| 544 | hex | `#E4EAF2` | `<div className="p-6 rounded-3xl bg-white border border-[#E4EAF2] shadow-sm space-y-3 tone-light card-light">` |
| 545 | hex | `#27B9B3` | `<span className="font-mono text-xs font-bold text-[#27B9B3] uppercase">Weeks 07 &ndash; 09</span>` |
| 546 | hex | `#071A4A` | `<h3 className="font-serif text-lg font-bold text-[#071A4A]">ICSR Processing &amp; Narratives</h3>` |
| 547 | hex | `#69758A` | `<p className="text-xs text-[#69758A] leading-relaxed">` |
| 550 | hex | `#E4EAF2` | `<div className="pt-2 border-t border-[#E4EAF2] text-[11px] font-semibold text-[#071A4A]">` |
| 550 | hex | `#071A4A` | `<div className="pt-2 border-t border-[#E4EAF2] text-[11px] font-semibold text-[#071A4A]">` |
| 556 | hex | `#E4EAF2` | `<div className="p-6 rounded-3xl bg-white border border-[#E4EAF2] shadow-sm space-y-3 tone-light card-light">` |
| 557 | hex | `#1557D6` | `<span className="font-mono text-xs font-bold text-[#1557D6] uppercase">Weeks 10 &ndash; 12</span>` |
| 558 | hex | `#071A4A` | `<h3 className="font-serif text-lg font-bold text-[#071A4A]">Capstone Audit &amp; ACRI</h3>` |
| 559 | hex | `#69758A` | `<p className="text-xs text-[#69758A] leading-relaxed">` |
| 562 | hex | `#E4EAF2` | `<div className="pt-2 border-t border-[#E4EAF2] text-[11px] font-semibold text-[#071A4A]">` |
| 562 | hex | `#071A4A` | `<div className="pt-2 border-t border-[#E4EAF2] text-[11px] font-semibold text-[#071A4A]">` |
| 573 | hex | `#E4EAF2` | `<section className="py-16 lg:py-24 bg-white border-b border-[#E4EAF2] tone-light">` |
| 577 | hex | `#1557D6` | `<span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6] bg-[#EEF6FF] px-3.5 py-1 rounded-full border border-[#D0E1FD]">` |
| 577 | hex | `#EEF6FF` | `<span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6] bg-[#EEF6FF] px-3.5 py-1 rounded-full border border-[#D0E1FD]">` |
| 577 | hex | `#D0E1FD` | `<span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6] bg-[#EEF6FF] px-3.5 py-1 rounded-full border border-[#D0E1FD]">` |
| 580 | hex | `#071A4A` | `<h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#071A4A]">` |
| 583 | hex | `#3F4A60` | `<p className="text-sm sm:text-base text-[#3F4A60] leading-relaxed">` |
| 592 | hex | `#1557D6` | `? "border-[#1557D6] bg-[#EEF6FF]/60 shadow-sm"` |
| 592 | hex | `#EEF6FF` | `? "border-[#1557D6] bg-[#EEF6FF]/60 shadow-sm"` |
| 593 | hex | `#E4EAF2` | `: "border-[#E4EAF2] bg-white tone-light card-light"` |
| 596 | hex | `#071A4A` | `<div className="flex items-center justify-between text-xs font-bold text-[#071A4A]">` |
| 598 | hex | `#1557D6` | `<span className="text-[#1557D6]">88% of JDs require</span>` |
| 600 | hex | `#69758A` | `<p className="text-xs text-[#69758A] mt-1">` |
| 609 | hex | `#6946E8` | `? "border-[#6946E8] bg-purple-50/60 shadow-sm"` |
| 610 | hex | `#E4EAF2` | `: "border-[#E4EAF2] bg-white tone-light card-light"` |
| 613 | hex | `#071A4A` | `<div className="flex items-center justify-between text-xs font-bold text-[#071A4A]">` |
| 615 | hex | `#6946E8` | `<span className="text-[#6946E8]">94% of JDs require</span>` |
| 617 | hex | `#69758A` | `<p className="text-xs text-[#69758A] mt-1">` |
| 626 | hex | `#27B9B3` | `? "border-[#27B9B3] bg-teal-50/60 shadow-sm"` |
| 627 | hex | `#E4EAF2` | `: "border-[#E4EAF2] bg-white tone-light card-light"` |
| 630 | hex | `#071A4A` | `<div className="flex items-center justify-between text-xs font-bold text-[#071A4A]">` |
| 632 | hex | `#27B9B3` | `<span className="text-[#27B9B3]">81% of JDs require</span>` |
| 634 | hex | `#69758A` | `<p className="text-xs text-[#69758A] mt-1">` |
| 642 | hex | `#E4EAF2` | `<div className="rounded-3xl border border-[#E4EAF2] bg-slate-50 p-6 sm:p-8 space-y-6 shadow-md">` |
| 643 | hex | `#E4EAF2` | `<div className="flex items-center justify-between pb-4 border-b border-[#E4EAF2]">` |
| 644 | hex | `#071A4A` | `<span className="font-mono text-xs font-bold uppercase text-[#071A4A]">TOP EMPLOYER SAMPLING</span>` |
| 645 | hex | `#1557D6` | `<span className="text-xs text-[#1557D6] font-semibold">HYD &bull; BLR &bull; PUNE</span>` |
| 648 | hex | `#E4EAF2` | `<div className="p-3 rounded-xl bg-white border border-[#E4EAF2] tone-light card-light">` |
| 649 | hex | `#071A4A` | `<span className="font-bold text-sm text-[#071A4A]">IQVIA</span>` |
| 650 | hex | `#69758A` | `<p className="text-[11px] text-[#69758A] mt-0.5">Drug Safety Associate I</p>` |
| 652 | hex | `#E4EAF2` | `<div className="p-3 rounded-xl bg-white border border-[#E4EAF2] tone-light card-light">` |
| 653 | hex | `#071A4A` | `<span className="font-bold text-sm text-[#071A4A]">Cognizant</span>` |
| 654 | hex | `#69758A` | `<p className="text-[11px] text-[#69758A] mt-0.5">Process Specialist - PV</p>` |
| 656 | hex | `#E4EAF2` | `<div className="p-3 rounded-xl bg-white border border-[#E4EAF2] tone-light card-light">` |
| 657 | hex | `#071A4A` | `<span className="font-bold text-sm text-[#071A4A]">Parexel</span>` |
| 658 | hex | `#69758A` | `<p className="text-[11px] text-[#69758A] mt-0.5">Safety Services Associate</p>` |
| 660 | hex | `#E4EAF2` | `<div className="p-3 rounded-xl bg-white border border-[#E4EAF2] tone-light card-light">` |
| 661 | hex | `#071A4A` | `<span className="font-bold text-sm text-[#071A4A]">Novartis</span>` |
| 662 | hex | `#69758A` | `<p className="text-[11px] text-[#69758A] mt-0.5">Clinical Safety Trainee</p>` |
| 665 | hex | `#EEF6FF` | `<div className="p-4 rounded-2xl bg-[#EEF6FF] border border-[#D0E1FD] text-xs text-[#071A4A] flex items-center justify-between">` |
| 665 | hex | `#D0E1FD` | `<div className="p-4 rounded-2xl bg-[#EEF6FF] border border-[#D0E1FD] text-xs text-[#071A4A] flex items-center justify-between">` |
| 665 | hex | `#071A4A` | `<div className="p-4 rounded-2xl bg-[#EEF6FF] border border-[#D0E1FD] text-xs text-[#071A4A] flex items-center justify-between">` |
| 667 | hex | `#1557D6` | `<span className="font-bold text-[#1557D6] font-mono">₹4.2L &ndash; ₹6.5L PA</span>` |
| 678 | hex | `#E4EAF2` | `<section className="py-16 lg:py-24 bg-slate-50 border-b border-[#E4EAF2]">` |
| 681 | hex | `#1557D6` | `<span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6] bg-[#EEF6FF] px-3.5 py-1 rounded-full border border-[#D0E1FD]">` |
| 681 | hex | `#EEF6FF` | `<span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6] bg-[#EEF6FF] px-3.5 py-1 rounded-full border border-[#D0E1FD]">` |
| 681 | hex | `#D0E1FD` | `<span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6] bg-[#EEF6FF] px-3.5 py-1 rounded-full border border-[#D0E1FD]">` |
| 684 | hex | `#071A4A` | `<h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#071A4A]">` |
| 687 | hex | `#3F4A60` | `<p className="text-base text-[#3F4A60]">` |
| 695 | hex | `#E4EAF2` | `<div className="p-4 rounded-2xl bg-white border border-[#E4EAF2] shadow-sm tone-light card-light">` |
| 696 | hex | `#071A4A` | `<h4 className="text-sm font-bold text-[#071A4A]">B.Pharm &amp; M.Pharm Graduates</h4>` |
| 697 | hex | `#69758A` | `<p className="text-xs text-[#69758A] mt-1">` |
| 701 | hex | `#E4EAF2` | `<div className="p-4 rounded-2xl bg-white border border-[#E4EAF2] shadow-sm tone-light card-light">` |
| 702 | hex | `#071A4A` | `<h4 className="text-sm font-bold text-[#071A4A]">Pharm.D Graduates</h4>` |
| 703 | hex | `#69758A` | `<p className="text-xs text-[#69758A] mt-1">` |
| 707 | hex | `#E4EAF2` | `<div className="p-4 rounded-2xl bg-white border border-[#E4EAF2] shadow-sm tone-light card-light">` |
| 708 | hex | `#071A4A` | `<h4 className="text-sm font-bold text-[#071A4A]">BDS &amp; MBBS Doctors</h4>` |
| 709 | hex | `#69758A` | `<p className="text-xs text-[#69758A] mt-1">` |
| 713 | hex | `#E4EAF2` | `<div className="p-4 rounded-2xl bg-white border border-[#E4EAF2] shadow-sm tone-light card-light">` |
| 714 | hex | `#071A4A` | `<h4 className="text-sm font-bold text-[#071A4A]">Life Sciences (B.Sc / M.Sc Biotech, Biochem)</h4>` |
| 715 | hex | `#69758A` | `<p className="text-xs text-[#69758A] mt-1">` |
| 723 | hex | `#E4EAF2` | `<div className="rounded-3xl border border-[#E4EAF2] bg-white p-6 sm:p-8 space-y-5 shadow-xl tone-light card-light">` |
| 724 | hex | `#E4EAF2` | `<div className="flex items-center justify-between pb-3 border-b border-[#E4EAF2]">` |
| 725 | hex | `#071A4A` | `<span className="font-mono text-xs font-bold uppercase text-[#071A4A]">ROLE FIT CALCULATOR</span>` |
| 726 | hex | `#1557D6` | `<span className="text-xs font-bold text-[#1557D6] bg-[#EEF6FF] px-2.5 py-1 rounded-full">` |
| 726 | hex | `#EEF6FF` | `<span className="text-xs font-bold text-[#1557D6] bg-[#EEF6FF] px-2.5 py-1 rounded-full">` |
| 731 | hex | `#69758A` | `<p className="text-xs text-[#69758A]">` |
| 748 | hex | `#1557D6` | `? "border-[#1557D6] bg-[#EEF6FF] text-[#071A4A]"` |
| 748 | hex | `#EEF6FF` | `? "border-[#1557D6] bg-[#EEF6FF] text-[#071A4A]"` |
| 748 | hex | `#071A4A` | `? "border-[#1557D6] bg-[#EEF6FF] text-[#071A4A]"` |
| 749 | hex | `#E4EAF2` | `: "border-[#E4EAF2] text-[#69758A] hover:bg-slate-50"` |
| 749 | hex | `#69758A` | `: "border-[#E4EAF2] text-[#69758A] hover:bg-slate-50"` |
| 754 | hex | `#1557D6` | `<Check className="h-4 w-4 text-[#1557D6] shrink-0" />` |
| 766 | hex | `#071A4A` | `className="w-full py-3 rounded-full bg-[#071A4A] hover:bg-[#1557D6] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2"` |
| 766 | hex | `#1557D6` | `className="w-full py-3 rounded-full bg-[#071A4A] hover:bg-[#1557D6] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2"` |
| 781 | hex | `#E4EAF2` | `<section className="py-16 lg:py-24 bg-white border-b border-[#E4EAF2] tone-light">` |
| 784 | hex | `#1557D6` | `<span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6] bg-[#EEF6FF] px-3.5 py-1 rounded-full border border-[#D0E1FD]">` |
| 784 | hex | `#EEF6FF` | `<span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6] bg-[#EEF6FF] px-3.5 py-1 rounded-full border border-[#D0E1FD]">` |
| 784 | hex | `#D0E1FD` | `<span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6] bg-[#EEF6FF] px-3.5 py-1 rounded-full border border-[#D0E1FD]">` |
| 787 | hex | `#071A4A` | `<h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#071A4A]">` |
| 790 | hex | `#3F4A60` | `<p className="text-base text-[#3F4A60]">` |
| 796 | hex | `#E4EAF2` | `<div className="p-6 rounded-3xl border border-[#E4EAF2] bg-slate-50 space-y-4">` |
| 797 | hex | `#EEF6FF` | `<div className="h-10 w-10 rounded-2xl bg-[#EEF6FF] flex items-center justify-center text-[#1557D6]">` |
| 797 | hex | `#1557D6` | `<div className="h-10 w-10 rounded-2xl bg-[#EEF6FF] flex items-center justify-center text-[#1557D6]">` |
| 800 | hex | `#071A4A` | `<h3 className="font-serif text-lg font-bold text-[#071A4A]">ICSR Processing Portfolio</h3>` |
| 801 | hex | `#69758A` | `<p className="text-xs text-[#69758A] leading-relaxed">` |
| 806 | hex | `#E4EAF2` | `<div className="p-6 rounded-3xl border border-[#E4EAF2] bg-slate-50 space-y-4">` |
| 807 | hex | `#6946E8` | `<div className="h-10 w-10 rounded-2xl bg-purple-50 flex items-center justify-center text-[#6946E8]">` |
| 810 | hex | `#071A4A` | `<h3 className="font-serif text-lg font-bold text-[#071A4A]">MedDRA Coding Audit Record</h3>` |
| 811 | hex | `#69758A` | `<p className="text-xs text-[#69758A] leading-relaxed">` |
| 816 | hex | `#E4EAF2` | `<div className="p-6 rounded-3xl border border-[#E4EAF2] bg-slate-50 space-y-4">` |
| 817 | hex | `#27B9B3` | `<div className="h-10 w-10 rounded-2xl bg-teal-50 flex items-center justify-center text-[#27B9B3]">` |
| 820 | hex | `#071A4A` | `<h3 className="font-serif text-lg font-bold text-[#071A4A]">ACRI Verified Credential</h3>` |
| 821 | hex | `#69758A` | `<p className="text-xs text-[#69758A] leading-relaxed">` |
| 832 | hex | `#E4EAF2` | `<section className="py-16 lg:py-24 bg-slate-50 border-b border-[#E4EAF2]">` |
| 836 | hex | `#1557D6` | `<span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6] bg-[#EEF6FF] px-3.5 py-1 rounded-full border border-[#D0E1FD]">` |
| 836 | hex | `#EEF6FF` | `<span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6] bg-[#EEF6FF] px-3.5 py-1 rounded-full border border-[#D0E1FD]">` |
| 836 | hex | `#D0E1FD` | `<span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6] bg-[#EEF6FF] px-3.5 py-1 rounded-full border border-[#D0E1FD]">` |
| 839 | hex | `#071A4A` | `<h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#071A4A]">` |
| 842 | hex | `#3F4A60` | `<p className="text-base text-[#3F4A60] leading-relaxed">` |
| 847 | hex | `#EEF6FF` | `<div className="h-6 w-6 rounded-full bg-[#EEF6FF] flex items-center justify-center text-[#1557D6] shrink-0 mt-0.5">` |
| 847 | hex | `#1557D6` | `<div className="h-6 w-6 rounded-full bg-[#EEF6FF] flex items-center justify-center text-[#1557D6] shrink-0 mt-0.5">` |
| 850 | hex | `#071A4A` | `<span className="text-sm text-[#071A4A] font-medium">` |
| 855 | hex | `#EEF6FF` | `<div className="h-6 w-6 rounded-full bg-[#EEF6FF] flex items-center justify-center text-[#1557D6] shrink-0 mt-0.5">` |
| 855 | hex | `#1557D6` | `<div className="h-6 w-6 rounded-full bg-[#EEF6FF] flex items-center justify-center text-[#1557D6] shrink-0 mt-0.5">` |
| 858 | hex | `#071A4A` | `<span className="text-sm text-[#071A4A] font-medium">` |
| 863 | hex | `#EEF6FF` | `<div className="h-6 w-6 rounded-full bg-[#EEF6FF] flex items-center justify-center text-[#1557D6] shrink-0 mt-0.5">` |
| 863 | hex | `#1557D6` | `<div className="h-6 w-6 rounded-full bg-[#EEF6FF] flex items-center justify-center text-[#1557D6] shrink-0 mt-0.5">` |
| 866 | hex | `#071A4A` | `<span className="text-sm text-[#071A4A] font-medium">` |
| 874 | hex | `#E4EAF2` | `<div className="p-8 rounded-3xl bg-white border border-[#E4EAF2] shadow-xl text-center space-y-5 tone-light card-light">` |
| 875 | hex | `#1557D6` | `<Building2 className="h-12 w-12 text-[#1557D6] mx-auto" />` |
| 876 | hex | `#071A4A` | `<h3 className="font-serif text-2xl font-bold text-[#071A4A]">College Partnership Inquiry</h3>` |
| 877 | hex | `#69758A` | `<p className="text-xs text-[#69758A]">` |
| 882 | hex | `#071A4A` | `className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#071A4A] hover:bg-[#1557D6] text-white text-xs font-bold transition-colors"` |
| 882 | hex | `#1557D6` | `className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#071A4A] hover:bg-[#1557D6] text-white text-xs font-bold transition-colors"` |
| 896 | hex | `#E4EAF2` | `<section className="py-16 lg:py-24 bg-white border-b border-[#E4EAF2] tone-light">` |
| 899 | hex | `#1557D6` | `<span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6] bg-[#EEF6FF] px-3.5 py-1 rounded-full border border-[#D0E1FD]">` |
| 899 | hex | `#EEF6FF` | `<span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6] bg-[#EEF6FF] px-3.5 py-1 rounded-full border border-[#D0E1FD]">` |
| 899 | hex | `#D0E1FD` | `<span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6] bg-[#EEF6FF] px-3.5 py-1 rounded-full border border-[#D0E1FD]">` |
| 902 | hex | `#071A4A` | `<h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#071A4A]">` |
| 905 | hex | `#3F4A60` | `<p className="text-base text-[#3F4A60]">` |
| 935 | hex | `#E4EAF2` | `className="rounded-2xl border border-[#E4EAF2] overflow-hidden bg-slate-50/50"` |
| 940 | hex | `#071A4A` | `className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm sm:text-base font-bold text-[#071A4A] hover:bg-slate-50 transition-colors"` |
| 944 | hex | `#69758A` | `className={`h-4 w-4 text-[#69758A] transition-transform shrink-0 ml-2 ${` |
| 945 | hex | `#1557D6` | `activeFaq === idx ? "rotate-180 text-[#1557D6]" : ""` |
| 950 | hex | `#3F4A60` | `<div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-[#3F4A60] leading-relaxed border-t border-[#E4EAF2] pt-3 bg-white tone-light">` |
| 950 | hex | `#E4EAF2` | `<div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-[#3F4A60] leading-relaxed border-t border-[#E4EAF2] pt-3 bg-white tone-light">` |
| 963 | hex | `#071A4A` | `<section className="py-20 lg:py-28 bg-[#071A4A] text-white text-center relative overflow-hidden">` |
| 964 | hex | `#1557D6` | `<div className="absolute inset-0 bg-radial-gradient from-[#1557D6]/20 via-transparent to-transparent pointer-events-none" />` |
| 980 | hex | `#071A4A` | `className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-white text-[#071A4A] hover:bg-[#EEF6FF] px-8 py-4 text-sm sm:text-base font-bold transit` |
| 980 | hex | `#EEF6FF` | `className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-white text-[#071A4A] hover:bg-[#EEF6FF] px-8 py-4 text-sm sm:text-base font-bold transit` |
| 982 | hex | `#1557D6` | `<MessageSquare className="h-4 w-4 text-[#1557D6]" />` |
| 984 | hex | `#1557D6` | `<ArrowRight className="h-4 w-4 text-[#1557D6]" />` |
| 1009 | hex | `#E4EAF2` | `<div className="bg-white tone-light card-light border border-[#E4EAF2] rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">` |
| 1013 | hex | `#69758A` | `className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-[#69758A]"` |
| 1018 | hex | `#1557D6` | `<div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1557D6] uppercase">` |
| 1023 | hex | `#071A4A` | `<h3 className="font-serif text-2xl font-bold text-[#071A4A]">Case Dossier: PV-2048</h3>` |
| 1025 | hex | `#E4EAF2` | `<div className="space-y-4 text-xs font-mono bg-slate-50 p-4 rounded-2xl border border-[#E4EAF2]">` |
| 1027 | hex | `#69758A` | `<span className="text-[#69758A] block mb-1">Source Clinical Narrative:</span>` |
| 1028 | hex | `#071A4A` | `<p className="text-[#071A4A] bg-white p-3 rounded-xl border border-[#E4EAF2] leading-relaxed tone-light">` |
| 1028 | hex | `#E4EAF2` | `<p className="text-[#071A4A] bg-white p-3 rounded-xl border border-[#E4EAF2] leading-relaxed tone-light">` |
| 1035 | hex | `#69758A` | `<span className="text-[#69758A] block mb-1">Suspect Drug:</span>` |
| 1036 | hex | `#071A4A` | `<span className="font-bold text-[#071A4A]">Amoxicillin 500mg TID</span>` |
| 1039 | hex | `#69758A` | `<span className="text-[#69758A] block mb-1">MedDRA 27.0 PT:</span>` |
| 1040 | hex | `#6946E8` | `<span className="font-bold text-[#6946E8]">Rash maculo-papular (10037868)</span>` |
| 1043 | hex | `#69758A` | `<span className="text-[#69758A] block mb-1">WHO-UMC Causality:</span>` |
| 1047 | hex | `#69758A` | `<span className="text-[#69758A] block mb-1">Regulatory Clock:</span>` |
| 1057 | hex | `#E4EAF2` | `className="px-5 py-2.5 rounded-full border border-[#E4EAF2] text-xs font-bold text-[#071A4A] hover:bg-slate-50"` |
| 1057 | hex | `#071A4A` | `className="px-5 py-2.5 rounded-full border border-[#E4EAF2] text-xs font-bold text-[#071A4A] hover:bg-slate-50"` |
| 1067 | hex | `#071A4A` | `className="px-5 py-2.5 rounded-full bg-[#071A4A] hover:bg-[#1557D6] text-white text-xs font-bold"` |
| 1067 | hex | `#1557D6` | `className="px-5 py-2.5 rounded-full bg-[#071A4A] hover:bg-[#1557D6] text-white text-xs font-bold"` |
| 1081 | hex | `#071A4A` | `className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-[#071A4A]/75 p-4 sm:items-center sm:p-6"` |
| 1092 | hex | `#DCE4EE` | `className="my-auto flex w-full max-w-2xl flex-col overflow-hidden rounded-[28px] border border-[#DCE4EE] bg-white tone-light card-light shadow-[0_30px_90px_rgba(7,26,74,0.28)]"` |
| 1094 | hex | `#E4EAF2` | `<div className="flex items-start justify-between gap-5 border-b border-[#E4EAF2] px-6 py-5 sm:px-8">` |
| 1096 | hex | `#1557D6` | `<span className="text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#1557D6]">` |
| 1101 | hex | `#071A4A` | `className="mt-1 font-serif text-2xl font-bold leading-tight text-[#071A4A] sm:text-[30px]"` |
| 1112 | hex | `#69758A` | `className="shrink-0 rounded-full p-2 text-[#69758A] transition-colors hover:bg-[#F5F7FA] hover:text-[#071A4A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1557D6] f` |
| 1112 | hex | `#F5F7FA` | `className="shrink-0 rounded-full p-2 text-[#69758A] transition-colors hover:bg-[#F5F7FA] hover:text-[#071A4A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1557D6] f` |
| 1112 | hex | `#071A4A` | `className="shrink-0 rounded-full p-2 text-[#69758A] transition-colors hover:bg-[#F5F7FA] hover:text-[#071A4A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1557D6] f` |
| 1112 | hex | `#1557D6` | `className="shrink-0 rounded-full p-2 text-[#69758A] transition-colors hover:bg-[#F5F7FA] hover:text-[#071A4A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1557D6] f` |
| 1151 | hex | `#69758A` | `<p className="text-xs leading-5 text-[#69758A]">` |
| 1160 | hex | `#071A4A` | `className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#071A4A] px-5 text-xs font-bold text-white transition-colors hover:bg-[#1557D6] focus:outline-none fo` |
| 1160 | hex | `#1557D6` | `className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#071A4A] px-5 text-xs font-bold text-white transition-colors hover:bg-[#1557D6] focus:outline-none fo` |
| 1160 | hex | `#1557D6` | `className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#071A4A] px-5 text-xs font-bold text-white transition-colors hover:bg-[#1557D6] focus:outline-none fo` |
| 1176 | hex | `#E4EAF2` | `<div className="bg-white tone-light card-light border border-[#E4EAF2] rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl relative">` |
| 1180 | hex | `#69758A` | `className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-[#69758A]"` |
| 1185 | hex | `#1557D6` | `<span className="text-xs font-mono font-bold uppercase text-[#1557D6]">COMPETENCY BENCHMARK</span>` |
| 1186 | hex | `#071A4A` | `<h3 className="font-serif text-2xl font-bold text-[#071A4A]">` |
| 1193 | hex | `#3F4A60` | `<p className="text-sm text-[#3F4A60] leading-relaxed">` |
| 1208 | hex | `#071A4A` | `className="px-5 py-2.5 rounded-full bg-[#071A4A] text-white text-xs font-bold hover:bg-[#1557D6]"` |
| 1208 | hex | `#1557D6` | `className="px-5 py-2.5 rounded-full bg-[#071A4A] text-white text-xs font-bold hover:bg-[#1557D6]"` |
| 1222 | hex | `#E4EAF2` | `<div className="bg-white tone-light card-light border border-[#E4EAF2] rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative max-h-[95vh] overflow-y-auto">` |
| 1226 | hex | `#69758A` | `className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-[#69758A]"` |
| 1231 | hex | `#1557D6` | `<div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1557D6] uppercase">` |
| 1236 | hex | `#071A4A` | `<h3 className="font-serif text-2xl font-bold text-[#071A4A]">` |
| 1240 | hex | `#69758A` | `<p className="text-xs text-[#69758A] leading-relaxed">` |
| 1246 | hex | `#071A4A` | `<label className="block text-xs font-semibold text-[#071A4A] mb-1">` |
| 1255 | hex | `#E4EAF2` | `className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E4EAF2] bg-slate-50 tone-light text-[#071A4A] focus:outline-none focus:ring-1 focus:ring-[#1557D6]"` |
| 1255 | hex | `#071A4A` | `className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E4EAF2] bg-slate-50 tone-light text-[#071A4A] focus:outline-none focus:ring-1 focus:ring-[#1557D6]"` |
| 1255 | hex | `#1557D6` | `className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E4EAF2] bg-slate-50 tone-light text-[#071A4A] focus:outline-none focus:ring-1 focus:ring-[#1557D6]"` |
| 1260 | hex | `#071A4A` | `<label className="block text-xs font-semibold text-[#071A4A] mb-1">` |
| 1269 | hex | `#E4EAF2` | `className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E4EAF2] bg-slate-50 tone-light text-[#071A4A] focus:outline-none focus:ring-1 focus:ring-[#1557D6]"` |
| 1269 | hex | `#071A4A` | `className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E4EAF2] bg-slate-50 tone-light text-[#071A4A] focus:outline-none focus:ring-1 focus:ring-[#1557D6]"` |
| 1269 | hex | `#1557D6` | `className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E4EAF2] bg-slate-50 tone-light text-[#071A4A] focus:outline-none focus:ring-1 focus:ring-[#1557D6]"` |
| 1275 | hex | `#071A4A` | `<label className="block text-xs font-semibold text-[#071A4A] mb-1">` |
| 1281 | hex | `#E4EAF2` | `className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#E4EAF2] bg-slate-50 tone-light text-[#071A4A]"` |
| 1281 | hex | `#071A4A` | `className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#E4EAF2] bg-slate-50 tone-light text-[#071A4A]"` |
| 1291 | hex | `#071A4A` | `<label className="block text-xs font-semibold text-[#071A4A] mb-1">` |
| 1297 | hex | `#E4EAF2` | `className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#E4EAF2] bg-slate-50 tone-light text-[#071A4A]"` |
| 1297 | hex | `#071A4A` | `className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#E4EAF2] bg-slate-50 tone-light text-[#071A4A]"` |
| 1309 | hex | `#69758A` | `<div className="pt-2 flex items-start gap-2.5 text-[11px] text-[#69758A]">` |
| 1315 | hex | `#E4EAF2` | `className="mt-0.5 h-3.5 w-3.5 rounded border-[#E4EAF2] text-[#1557D6] focus:ring-[#1557D6]"` |
| 1315 | hex | `#1557D6` | `className="mt-0.5 h-3.5 w-3.5 rounded border-[#E4EAF2] text-[#1557D6] focus:ring-[#1557D6]"` |
| 1315 | hex | `#1557D6` | `className="mt-0.5 h-3.5 w-3.5 rounded border-[#E4EAF2] text-[#1557D6] focus:ring-[#1557D6]"` |
| 1326 | hex | `#071A4A` | `className="w-full py-3.5 rounded-full bg-[#071A4A] hover:bg-[#1557D6] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer di` |
| 1326 | hex | `#1557D6` | `className="w-full py-3.5 rounded-full bg-[#071A4A] hover:bg-[#1557D6] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer di` |

### `src\design-system\arzon-v2.css` - 266

| Line | Kind | Value | Context |
|---:|---|---|---|
| 21 | rgba | `rgba(7, 26, 74, 0.04)` | `--arzon-shadow-card: 0 1px 2px rgba(7, 26, 74, 0.04), 0 6px 20px rgba(7, 26, 74, 0.045);` |
| 21 | rgba | `rgba(7, 26, 74, 0.045)` | `--arzon-shadow-card: 0 1px 2px rgba(7, 26, 74, 0.04), 0 6px 20px rgba(7, 26, 74, 0.045);` |
| 22 | rgba | `rgba(7, 26, 74, 0.14)` | `--arzon-shadow-popover: 0 18px 45px rgba(7, 26, 74, 0.14);` |
| 23 | rgba | `rgba(7, 26, 74, 0.16)` | `--arzon-shadow-hero: 0 20px 55px rgba(7, 26, 74, 0.16);` |
| 64 | hex | `#BFDBFE` | `border: 1px solid #BFDBFE;` |
| 66 | hex | `#EFF6FF` | `background: #EFF6FF;` |
| 67 | hex | `#1D4ED8` | `color: #1D4ED8;` |
| 93 | hex | `#4F20FF` | `background: linear-gradient(135deg, #4F20FF 0%, #2563EB 100%);` |
| 93 | hex | `#2563EB` | `background: linear-gradient(135deg, #4F20FF 0%, #2563EB 100%);` |
| 94 | hex | `#fff` | `color: #fff;` |
| 99 | rgba | `rgba(37, 99, 235, 0.18)` | `box-shadow: 0 5px 16px rgba(37, 99, 235, 0.18);` |
| 107 | rgba | `rgba(37, 99, 235, 0.24)` | `box-shadow: 0 8px 22px rgba(37, 99, 235, 0.24);` |
| 117 | hex | `#CBD5E1` | `border: 1px solid #CBD5E1;` |
| 119 | hex | `#fff` | `background: #fff;` |
| 130 | hex | `#F8FAFC` | `background: #F8FAFC;` |
| 131 | hex | `#94A3B8` | `border-color: #94A3B8;` |
| 139 | rgba | `rgba(37, 99, 235, 0.32)` | `outline: 3px solid rgba(37, 99, 235, 0.32);` |
| 146 | hex | `#071A4A` | `background: #071A4A;` |
| 147 | hex | `#fff` | `color: #fff;` |
| 176 | rgba | `rgba(255,255,255,0.84)` | `color: rgba(255,255,255,0.84);` |
| 191 | rgba | `rgba(7,26,74,0.7)` | `background: linear-gradient(90deg, rgba(7,26,74,0.7) 0%, rgba(7,26,74,0.08) 42%, rgba(7,26,74,0) 100%);` |
| 191 | rgba | `rgba(7,26,74,0.08)` | `background: linear-gradient(90deg, rgba(7,26,74,0.7) 0%, rgba(7,26,74,0.08) 42%, rgba(7,26,74,0) 100%);` |
| 191 | rgba | `rgba(7,26,74,0)` | `background: linear-gradient(90deg, rgba(7,26,74,0.7) 0%, rgba(7,26,74,0.08) 42%, rgba(7,26,74,0) 100%);` |
| 208 | rgba | `rgba(255,255,255,0.55)` | `border: 1px solid rgba(255,255,255,0.55);` |
| 210 | rgba | `rgba(255,255,255,0.94)` | `background: rgba(255,255,255,0.94);` |
| 211 | hex | `#071A4A` | `color: #071A4A;` |
| 219 | hex | `#fff` | `background: #fff;` |
| 245 | rgba | `rgba(255,255,255,0.96)` | `background: rgba(255,255,255,0.96);` |
| 269 | hex | `#2563EB` | `border-bottom-color: #2563EB;` |
| 270 | hex | `#1D4ED8` | `color: #1D4ED8;` |
| 300 | hex | `#fff` | `background: #fff;` |
| 307 | hex | `#93C5FD` | `border-color: #93C5FD;` |
| 320 | hex | `#fff` | `background: #fff;` |
| 326 | hex | `#1D4ED8` | `color: #1D4ED8;` |
| 334 | hex | `#071A4A` | `background: linear-gradient(135deg, #071A4A 0%, #102E6E 65%, #1D4ED8 100%);` |
| 334 | hex | `#102E6E` | `background: linear-gradient(135deg, #071A4A 0%, #102E6E 65%, #1D4ED8 100%);` |
| 334 | hex | `#1D4ED8` | `background: linear-gradient(135deg, #071A4A 0%, #102E6E 65%, #1D4ED8 100%);` |
| 336 | hex | `#fff` | `color: #fff;` |
| 418 | hex | `#071A4A` | `--arzon-ref-navy: #071A4A;` |
| 419 | hex | `#102E6E` | `--arzon-ref-navy-2: #102E6E;` |
| 420 | hex | `#2563EB` | `--arzon-ref-blue: #2563EB;` |
| 421 | hex | `#4F20FF` | `--arzon-ref-purple: #4F20FF;` |
| 422 | hex | `#38BDF8` | `--arzon-ref-cyan: #38BDF8;` |
| 423 | hex | `#071A4A` | `--arzon-ref-ink: #071A4A;` |
| 424 | hex | `#64748B` | `--arzon-ref-muted: #64748B;` |
| 425 | hex | `#E2E8F0` | `--arzon-ref-line: #E2E8F0;` |
| 426 | hex | `#F7F9FD` | `--arzon-ref-surface: #F7F9FD;` |
| 427 | hex | `#FFFFFF` | `--arzon-ref-white: #FFFFFF;` |
| 429 | rgba | `rgba(7, 26, 74, .07)` | `--arzon-ref-shadow: 0 5px 18px rgba(7, 26, 74, .07);` |
| 443 | hex | `#fff` | `.arzon-ref-hero { background: var(--arzon-ref-navy); color: #fff; overflow: hidden; }` |
| 447 | hex | `#38BDF8` | `.arzon-ref-hero h1 span,.arzon-ref-inner-hero h1 span { color:#38BDF8; }` |
| 448 | rgba | `rgba(255,255,255,.84)` | `.arzon-ref-hero p { max-width:560px; margin-top:14px; color:rgba(255,255,255,.84); font-size:14px; line-height:1.65; }` |
| 450 | hex | `#BFDBFE` | `.arzon-ref-kicker { color:#BFDBFE; }` |
| 451 | hex | `#2563EB` | `.arzon-ref-kicker-light { color:#2563EB; }` |
| 456 | hex | `#fff` | `.arzon-ref-btn-primary { background:linear-gradient(135deg,var(--arzon-ref-purple),var(--arzon-ref-blue)); color:#fff; box-shadow:0 7px 18px rgba(37,99,235,.22); }` |
| 456 | rgba | `rgba(37,99,235,.22)` | `.arzon-ref-btn-primary { background:linear-gradient(135deg,var(--arzon-ref-purple),var(--arzon-ref-blue)); color:#fff; box-shadow:0 7px 18px rgba(37,99,235,.22); }` |
| 457 | hex | `#fff` | `.arzon-ref-btn-outline { border:1px solid rgba(255,255,255,.7); color:#fff; background:transparent; }` |
| 457 | rgba | `rgba(255,255,255,.7)` | `.arzon-ref-btn-outline { border:1px solid rgba(255,255,255,.7); color:#fff; background:transparent; }` |
| 458 | hex | `#fff` | `.arzon-ref-btn-white { background:#fff; color:var(--arzon-ref-ink); border:1px solid #E2E8F0; }` |
| 458 | hex | `#E2E8F0` | `.arzon-ref-btn-white { background:#fff; color:var(--arzon-ref-ink); border:1px solid #E2E8F0; }` |
| 461 | rgba | `rgba(7,26,74,.2)` | `.arzon-ref-hero-person:after,.arzon-ref-inner-person:after { content:""; position:absolute; inset:0; background:linear-gradient(90deg,var(--arzon-ref-navy) 0%,rgba(7,26,74,.2) 45%,` |
| 462 | hex | `#fff` | `.arzon-ref-proof { border-bottom:1px solid var(--arzon-ref-line); background:#fff; }` |
| 475 | hex | `#fff` | `.arzon-ref-path-card { min-height:175px; padding:16px; border:1px solid var(--arzon-ref-line); border-radius:var(--arzon-ref-radius); background:#fff; box-shadow:var(--arzon-ref-sh` |
| 476 | hex | `#93C5FD` | `.arzon-ref-path-card:hover { transform:translateY(-2px); border-color:#93C5FD; }` |
| 477 | hex | `#EFF6FF` | `.arzon-ref-path-icon { width:31px; height:31px; display:grid; place-items:center; border-radius:8px; background:#EFF6FF; color:var(--arzon-ref-blue); }` |
| 486 | rgba | `rgba(7,26,74,.14)` | `.arzon-ref-image-card { position:relative; min-height:330px; overflow:hidden; border-radius:14px; box-shadow:0 14px 35px rgba(7,26,74,.14); }` |
| 488 | rgba | `rgba(255,255,255,.94)` | `.arzon-ref-image-card div { position:absolute; left:14px; right:14px; bottom:14px; padding:12px 14px; border-radius:9px; background:rgba(255,255,255,.94); backdrop-filter:blur(8px)` |
| 496 | rgba | `rgba(7,26,74,.92)` | `.arzon-ref-program-card:after { content:""; position:absolute; inset:0; background:linear-gradient(transparent 25%,rgba(7,26,74,.92)); }` |
| 497 | hex | `#fff` | `.arzon-ref-program-card div { position:absolute; z-index:2; left:0; right:0; bottom:0; padding:18px; color:#fff; }` |
| 498 | hex | `#BFDBFE` | `.arzon-ref-program-card span { color:#BFDBFE; font-size:9px; font-weight:800; letter-spacing:.12em; }` |
| 500 | hex | `#DBEAFE` | `.arzon-ref-program-card p { margin-top:5px; color:#DBEAFE; font-size:11px; }` |
| 503 | hex | `#F7F9FD` | `.arzon-ref-final { background:#F7F9FD; border-top:1px solid var(--arzon-ref-line); text-align:center; padding:55px 0; }` |
| 507 | hex | `#F4F8FF` | `.arzon-ref-inner-hero { background:linear-gradient(90deg,#F4F8FF,#EAF2FF); border-bottom:1px solid var(--arzon-ref-line); }` |
| 507 | hex | `#EAF2FF` | `.arzon-ref-inner-hero { background:linear-gradient(90deg,#F4F8FF,#EAF2FF); border-bottom:1px solid var(--arzon-ref-line); }` |
| 512 | hex | `#64748B` | `.arzon-ref-breadcrumb { color:#64748B; font-size:10px; font-weight:700; margin-bottom:13px; }` |
| 513 | hex | `#94A3B8` | `.arzon-ref-breadcrumb span { margin:0 6px; color:#94A3B8; }` |
| 515 | hex | `#E2E8F0` | `.arzon-ref-floating-stat { position:absolute; z-index:3; right:14px; bottom:14px; display:grid; grid-template-columns:auto 1fr; column-gap:8px; min-width:155px; padding:10px 12px; ` |
| 515 | rgba | `rgba(255,255,255,.95)` | `.arzon-ref-floating-stat { position:absolute; z-index:3; right:14px; bottom:14px; display:grid; grid-template-columns:auto 1fr; column-gap:8px; min-width:155px; padding:10px 12px; ` |
| 519 | rgba | `rgba(255,255,255,.96)` | `.arzon-ref-tabs { position:sticky; top:0; z-index:30; border-bottom:1px solid var(--arzon-ref-line); background:rgba(255,255,255,.96); backdrop-filter:blur(10px); }` |
| 521 | hex | `#64748B` | `.arzon-ref-tabs a { min-height:44px; display:flex; align-items:center; white-space:nowrap; border-bottom:2px solid transparent; color:#64748B; font-size:10px; font-weight:800; }` |
| 525 | hex | `#fff` | `.arzon-ref-feature { min-height:140px; padding:15px; border:1px solid var(--arzon-ref-line); border-radius:9px; background:#fff; }` |
| 531 | hex | `#fff` | `.arzon-ref-metric { min-height:105px; display:flex; flex-direction:column; justify-content:center; padding:15px; border:1px solid var(--arzon-ref-line); border-radius:9px; backgrou` |
| 535 | hex | `#fff` | `.arzon-ref-company-card { margin-top:12px; padding:18px; border:1px solid var(--arzon-ref-line); border-radius:9px; background:#fff; }` |
| 538 | hex | `#0F3A8A` | `.arzon-ref-company-grid span { color:#0F3A8A; font-size:12px; font-weight:800; }` |
| 540 | hex | `#fff` | `.arzon-ref-skill-grid > div { display:flex; align-items:center; gap:9px; padding:13px; border:1px solid var(--arzon-ref-line); border-radius:9px; background:#fff; }` |
| 547 | hex | `#fff` | `.arzon-ref-dark { background:var(--arzon-ref-navy); color:#fff; }` |
| 550 | hex | `#CBD5E1` | `.arzon-ref-dark p { max-width:650px; margin-top:10px; color:#CBD5E1; font-size:13px; line-height:1.7; }` |
| 552 | hex | `#fff` | `.arzon-ref-evidence > div { display:grid; grid-template-columns:auto 1fr auto; align-items:center; gap:9px; padding:12px 14px; border:1px solid var(--arzon-ref-line); border-radius` |
| 553 | hex | `#10B981` | `.arzon-ref-evidence svg { width:15px; color:#10B981; }` |
| 557 | hex | `#fff` | `.arzon-ref-related-grid > a,.arzon-ref-role-list > a { padding:15px; border:1px solid var(--arzon-ref-line); border-radius:9px; background:#fff; transition:transform .16s ease,bord` |
| 558 | hex | `#93C5FD` | `.arzon-ref-related-grid > a:hover,.arzon-ref-role-list > a:hover { transform:translateY(-2px); border-color:#93C5FD; }` |
| 559 | hex | `#64748B` | `.arzon-ref-related-grid span,.arzon-ref-role-list span { display:block; color:#64748B; font-size:9px; font-weight:800; text-transform:uppercase; }` |
| 590 | hex | `#475569` | `.arzon-ref-role-skills span { padding:4px 7px; border:1px solid var(--arzon-ref-line); border-radius:999px; color:#475569; background:#F8FAFC; font-size:9px; font-weight:700; }` |
| 590 | hex | `#F8FAFC` | `.arzon-ref-role-skills span { padding:4px 7px; border:1px solid var(--arzon-ref-line); border-radius:999px; color:#475569; background:#F8FAFC; font-size:9px; font-weight:700; }` |
| 592 | hex | `#fff` | `.arzon-ref-timeline > div { padding:15px; border:1px solid var(--arzon-ref-line); border-radius:9px; background:#fff; }` |
| 593 | hex | `#2563EB` | `.arzon-ref-timeline b { display:inline-grid; place-items:center; width:28px; height:28px; border-radius:50%; background:#2563EB; color:#fff; font-size:10px; }` |
| 593 | hex | `#fff` | `.arzon-ref-timeline b { display:inline-grid; place-items:center; width:28px; height:28px; border-radius:50%; background:#2563EB; color:#fff; font-size:10px; }` |
| 601 | hex | `#fff` | `.arzon-ref-retake { display:inline-flex; align-items:center; gap:6px; min-height:38px; padding:8px 12px; border:1px solid var(--arzon-ref-line); border-radius:7px; background:#fff;` |
| 601 | hex | `#475569` | `.arzon-ref-retake { display:inline-flex; align-items:center; gap:6px; min-height:38px; padding:8px 12px; border:1px solid var(--arzon-ref-line); border-radius:7px; background:#fff;` |
| 603 | hex | `#fff` | `.arzon-ref-result-card { margin-top:22px; padding:20px; border:1px solid var(--arzon-ref-line); border-radius:12px; background:#fff; box-shadow:var(--arzon-ref-shadow); }` |
| 605 | hex | `#34D399` | `.arzon-ref-score-ring { width:116px; height:116px; display:flex; flex-direction:column; justify-content:center; align-items:center; border-radius:50%; border:9px solid #34D399; bac` |
| 605 | hex | `#fff` | `.arzon-ref-score-ring { width:116px; height:116px; display:flex; flex-direction:column; justify-content:center; align-items:center; border-radius:50%; border:9px solid #34D399; bac` |
| 607 | hex | `#64748B` | `.arzon-ref-score-ring span { color:#64748B; font-size:9px; font-weight:800; }` |
| 608 | hex | `#DCFCE7` | `.arzon-ref-match-badge { display:inline-flex; padding:5px 8px; border-radius:999px; background:#DCFCE7; color:#047857; font-size:9px; font-weight:800; }` |
| 608 | hex | `#047857` | `.arzon-ref-match-badge { display:inline-flex; padding:5px 8px; border-radius:999px; background:#DCFCE7; color:#047857; font-size:9px; font-weight:800; }` |
| 612 | hex | `#EFF6FF` | `.arzon-ref-match-tags span { padding:4px 7px; border-radius:999px; background:#EFF6FF; color:#1D4ED8; font-size:9px; font-weight:700; }` |
| 612 | hex | `#1D4ED8` | `.arzon-ref-match-tags span { padding:4px 7px; border-radius:999px; background:#EFF6FF; color:#1D4ED8; font-size:9px; font-weight:700; }` |
| 614 | hex | `#fff` | `.arzon-ref-result-secondary { margin-top:20px; padding:18px; border:1px solid var(--arzon-ref-line); border-radius:12px; background:#fff; }` |
| 624 | hex | `#fff` | `.arzon-ref-result-loading,.arzon-ref-result-empty { width:min(100% - 2rem,700px); margin:100px auto; padding:40px; text-align:center; border:1px solid var(--arzon-ref-line); border` |
| 639 | hex | `#F4F8FF` | `.arzon-ref-course > section:first-of-type { background:linear-gradient(90deg,#F4F8FF,#EAF2FF) !important; border-bottom-color:var(--arzon-ref-line) !important; }` |
| 639 | hex | `#EAF2FF` | `.arzon-ref-course > section:first-of-type { background:linear-gradient(90deg,#F4F8FF,#EAF2FF) !important; border-bottom-color:var(--arzon-ref-line) !important; }` |
| 651 | hex | `#fff` | `.arzon-ref-journey { background:var(--arzon-ref-navy); color:#fff; padding:18px 0 22px; }` |
| 656 | hex | `#2563EB` | `.arzon-ref-journey-step > span { display:grid; place-items:center; width:34px; height:34px; flex:none; border-radius:50%; background:#2563EB; font-size:14px; font-weight:850; }` |
| 660 | hex | `#CBD5E1` | `.arzon-ref-journey-step small { margin-top:2px; color:#CBD5E1; font-size:8px; line-height:1.25; }` |
| 661 | hex | `#CBD5E1` | `.arzon-ref-journey-step > svg { width:15px; flex:none; color:#CBD5E1; }` |
| 662 | hex | `#F7F9FD` | `.arzon-ref-assessment { background:#F7F9FD; }` |
| 663 | hex | `#fff` | `.arzon-ref-assessment-progress { border-bottom:1px solid var(--arzon-ref-line); background:#fff; }` |
| 668 | hex | `#fff` | `.arzon-ref-assessment-steps { position:sticky; top:74px; padding:18px; border:1px solid var(--arzon-ref-line); border-radius:10px; background:#fff; box-shadow:var(--arzon-ref-shado` |
| 671 | hex | `#fff` | `.arzon-ref-assessment-question { padding:22px; border:1px solid var(--arzon-ref-line); border-radius:11px; background:#fff; box-shadow:var(--arzon-ref-shadow); }` |
| 674 | hex | `#93C5FD` | `.arzon-ref-assessment-question button:hover { border-color:#93C5FD; }` |
| 675 | hex | `#EEF2FF` | `.arzon-ref-assessment-question .bg-\[var\(--arzon-blue-100\)\] { background:#EEF2FF; }` |
| 676 | hex | `#4F20FF` | `.arzon-ref-assessment-question .bg-\[var\(--arzon-blue-700\)\] { background:#4F20FF; }` |
| 702 | hex | `#eff6ff` | `--arzon-site-blue-soft: #eff6ff;` |
| 703 | hex | `#f0f9ff` | `--arzon-site-sky-soft: #f0f9ff;` |
| 710 | rgba | `rgba(15, 23, 42, .04)` | `box-shadow: 0 4px 20px rgba(15, 23, 42, .04);` |
| 717 | rgba | `rgba(15,23,42,.08)` | `box-shadow: 0 18px 40px rgba(15,23,42,.08);` |
| 721 | rgba | `rgba(59,130,246,.055)` | `radial-gradient(circle at 10% 0%, rgba(59,130,246,.055), transparent 32rem),` |
| 722 | hex | `#fff` | `#fff;` |
| 730 | hex | `#fff` | `linear-gradient(180deg, #fff 0%, #fff 68%, #f8fbff 100%);` |
| 730 | hex | `#fff` | `linear-gradient(180deg, #fff 0%, #fff 68%, #f8fbff 100%);` |
| 730 | hex | `#f8fbff` | `linear-gradient(180deg, #fff 0%, #fff 68%, #f8fbff 100%);` |
| 736 | hex | `#f8fbff` | `background: linear-gradient(180deg, #f8fbff 0%, #fff 100%);` |
| 736 | hex | `#fff` | `background: linear-gradient(180deg, #f8fbff 0%, #fff 100%);` |
| 741 | rgba | `rgba(15, 23, 42, .055)` | `box-shadow: 0 10px 35px rgba(15, 23, 42, .055);` |
| 768 | rgba | `rgba(15,23,42,.045)` | `box-shadow: 0 10px 30px rgba(15,23,42,.045);` |
| 777 | rgba | `rgba(56,189,248,.20)` | `radial-gradient(circle at 90% 15%, rgba(56,189,248,.20), transparent 24rem),` |
| 778 | hex | `#071a4a` | `linear-gradient(135deg, #071a4a 0%, #102e6e 62%, #1d4ed8 100%);` |
| 778 | hex | `#102e6e` | `linear-gradient(135deg, #071a4a 0%, #102e6e 62%, #1d4ed8 100%);` |
| 778 | hex | `#1d4ed8` | `linear-gradient(135deg, #071a4a 0%, #102e6e 62%, #1d4ed8 100%);` |
| 781 | rgba | `rgba(255,255,255,.94)` | `background: rgba(255,255,255,.94);` |
| 790 | rgba | `rgba(56,189,248,.15)` | `radial-gradient(circle at 80% 10%, rgba(56,189,248,.15), transparent 25rem),` |
| 791 | hex | `#071a4a` | `#071a4a;` |
| 794 | hex | `#071a4a` | `background: linear-gradient(135deg,#071a4a,#102e6e);` |
| 794 | hex | `#102e6e` | `background: linear-gradient(135deg,#071a4a,#102e6e);` |
| 810 | rgba | `rgba(59,130,246,.10)` | `radial-gradient(circle at 50% 0%, rgba(59,130,246,.10), transparent 34rem),` |
| 811 | hex | `#f8fbff` | `linear-gradient(180deg,#f8fbff 0%,#fff 72%);` |
| 811 | hex | `#fff` | `linear-gradient(180deg,#f8fbff 0%,#fff 72%);` |
| 823 | hex | `#BFDBFE` | `border:1px solid #BFDBFE;` |
| 825 | hex | `#EFF6FF` | `background:#EFF6FF;` |
| 826 | hex | `#1D4ED8` | `color:#1D4ED8;` |
| 840 | hex | `#071A4A` | `color:#071A4A;` |
| 845 | hex | `#64748B` | `color:#64748B;` |
| 874 | rgba | `rgba(7,26,74,.15)` | `box-shadow:0 24px 70px rgba(7,26,74,.15);` |
| 884 | rgba | `rgba(226,232,240,.95)` | `border:1px solid rgba(226,232,240,.95);` |
| 886 | rgba | `rgba(255,255,255,.94)` | `background:rgba(255,255,255,.94);` |
| 887 | rgba | `rgba(7,26,74,.12)` | `box-shadow:0 15px 35px rgba(7,26,74,.12);` |
| 893 | hex | `#64748B` | `.arzon-site-hero-stat span { color:#64748B; font-size:.68rem; font-weight:700; }` |
| 894 | hex | `#071A4A` | `.arzon-site-hero-stat strong { margin-top:.15rem; color:#071A4A; font-size:.8rem; }` |
| 906 | rgba | `rgba(59,130,246,.08)` | `radial-gradient(circle at 50% 0%, rgba(59,130,246,.08), transparent 30rem),` |
| 907 | hex | `#f8fbff` | `linear-gradient(180deg,#f8fbff 0%,#fff 55%);` |
| 907 | hex | `#fff` | `linear-gradient(180deg,#f8fbff 0%,#fff 55%);` |
| 916 | hex | `#071A4A` | `color:#071A4A;` |
| 923 | rgba | `rgba(7,26,74,.08)` | `box-shadow:0 20px 55px rgba(7,26,74,.08);` |
| 927 | rgba | `rgba(59,130,246,.08)` | `radial-gradient(circle at 50% 0%, rgba(59,130,246,.08), transparent 32rem),` |
| 928 | hex | `#f8fbff` | `#f8fbff;` |
| 933 | rgba | `rgba(7,26,74,.06)` | `box-shadow:0 15px 45px rgba(7,26,74,.06);` |
| 937 | hex | `#fff` | `radial-gradient(circle at center,#fff 62%,transparent 63%),` |
| 938 | hex | `#2563EB` | `conic-gradient(#2563EB 0 var(--score, 0%),#DBEAFE var(--score, 0%) 100%);` |
| 938 | hex | `#DBEAFE` | `conic-gradient(#2563EB 0 var(--score, 0%),#DBEAFE var(--score, 0%) 100%);` |
| 940 | hex | `#fff` | `box-shadow:inset 0 0 0 8px #fff, 0 8px 25px rgba(37,99,235,.12);` |
| 940 | rgba | `rgba(37,99,235,.12)` | `box-shadow:inset 0 0 0 8px #fff, 0 8px 25px rgba(37,99,235,.12);` |
| 943 | hex | `#fff` | `background:linear-gradient(180deg,#fff 0%,#f8fbff 100%);` |
| 943 | hex | `#f8fbff` | `background:linear-gradient(180deg,#fff 0%,#f8fbff 100%);` |
| 947 | rgba | `rgba(59,130,246,.12)` | `radial-gradient(circle at 80% 10%,rgba(59,130,246,.12),transparent 25rem),` |
| 948 | hex | `#f4f8ff` | `linear-gradient(180deg,#f4f8ff,#fff) !important;` |
| 948 | hex | `#fff` | `linear-gradient(180deg,#f4f8ff,#fff) !important;` |
| 962 | hex | `#071A4A` | `Palette: Deep Navy #071A4A \| Royal Blue #1557D6 \| Hairline #E4EAF2` |
| 962 | hex | `#1557D6` | `Palette: Deep Navy #071A4A \| Royal Blue #1557D6 \| Hairline #E4EAF2` |
| 962 | hex | `#E4EAF2` | `Palette: Deep Navy #071A4A \| Royal Blue #1557D6 \| Hairline #E4EAF2` |
| 977 | hex | `#fff` | `.ap-white { background-color: #fff; }` |
| 978 | hex | `#F7F9FE` | `.ap-slate { background-color: #F7F9FE; }` |
| 979 | hex | `#071A4A` | `.ap-navy  { background: linear-gradient(135deg, #071A4A 0%, #0B256B 70%, #071A4A 100%); color: #fff; }` |
| 979 | hex | `#0B256B` | `.ap-navy  { background: linear-gradient(135deg, #071A4A 0%, #0B256B 70%, #071A4A 100%); color: #fff; }` |
| 979 | hex | `#071A4A` | `.ap-navy  { background: linear-gradient(135deg, #071A4A 0%, #0B256B 70%, #071A4A 100%); color: #fff; }` |
| 979 | hex | `#fff` | `.ap-navy  { background: linear-gradient(135deg, #071A4A 0%, #0B256B 70%, #071A4A 100%); color: #fff; }` |
| 986 | hex | `#D0E1FD` | `border: 1px solid #D0E1FD;` |
| 988 | hex | `#EEF6FF` | `background: #EEF6FF;` |
| 989 | hex | `#1557D6` | `color: #1557D6;` |
| 1002 | hex | `#1557D6` | `background: #1557D6;` |
| 1020 | hex | `#1557D6` | `color: #1557D6;` |
| 1028 | hex | `#69758A` | `color: #69758A;` |
| 1046 | hex | `#071A4A` | `color: #071A4A;` |
| 1050 | hex | `#3F4A60` | `color: #3F4A60;` |
| 1075 | hex | `#071A4A` | `color: #071A4A;` |
| 1079 | hex | `#69758A` | `color: #69758A;` |
| 1100 | hex | `#E4EAF2` | `border: 1px solid #E4EAF2;` |
| 1102 | hex | `#fff` | `background: #fff;` |
| 1112 | hex | `#071A4A` | `color: #071A4A;` |
| 1118 | hex | `#69758A` | `color: #69758A;` |
| 1122 | hex | `#93C5FD` | `border-color: #93C5FD;` |
| 1123 | hex | `#F8FAFF` | `background: #F8FAFF;` |
| 1126 | hex | `#1557D6` | `border-color: #1557D6;` |
| 1127 | hex | `#EEF6FF` | `background: #EEF6FF;` |
| 1128 | hex | `#1557D6` | `box-shadow: 0 0 0 1px #1557D6;` |
| 1130 | hex | `#1557D6` | `.ap-source-pill.active strong { color: #1557D6; }` |
| 1139 | hex | `#E4EAF2` | `border: 1px solid #E4EAF2;` |
| 1141 | hex | `#fff` | `background: #fff;` |
| 1143 | rgba | `rgba(7, 26, 74, 0.04)` | `box-shadow: 0 1px 3px rgba(7, 26, 74, 0.04);` |
| 1146 | rgba | `rgba(7, 26, 74, 0.08)` | `.ap-small-card:hover { box-shadow: 0 4px 12px rgba(7, 26, 74, 0.08); }` |
| 1151 | hex | `#000` | `-webkit-mask-image: linear-gradient(90deg, transparent 0, #000 6%, #000 94%, transparent 100%);` |
| 1151 | hex | `#000` | `-webkit-mask-image: linear-gradient(90deg, transparent 0, #000 6%, #000 94%, transparent 100%);` |
| 1152 | hex | `#000` | `mask-image: linear-gradient(90deg, transparent 0, #000 6%, #000 94%, transparent 100%);` |
| 1152 | hex | `#000` | `mask-image: linear-gradient(90deg, transparent 0, #000 6%, #000 94%, transparent 100%);` |
| 1181 | hex | `#1557D6` | `color: #1557D6;` |
| 1187 | hex | `#071A4A` | `.ap-text-link:hover { color: #071A4A; }` |
| 1201 | hex | `#071A4A` | `background: #071A4A;` |
| 1202 | hex | `#fff` | `color: #fff;` |
| 1208 | rgba | `rgba(7, 26, 74, 0.18)` | `box-shadow: 0 4px 14px rgba(7, 26, 74, 0.18);` |
| 1213 | hex | `#1557D6` | `background: #1557D6;` |
| 1214 | rgba | `rgba(21, 87, 214, 0.28)` | `box-shadow: 0 6px 20px rgba(21, 87, 214, 0.28);` |
| 1220 | rgba | `rgba(21, 87, 214, 0.4)` | `outline: 3px solid rgba(21, 87, 214, 0.4);` |
| 1230 | hex | `#E4EAF2` | `border: 1px solid #E4EAF2;` |
| 1232 | hex | `#fff` | `background: #fff;` |
| 1233 | hex | `#071A4A` | `color: #071A4A;` |
| 1239 | rgba | `rgba(7, 26, 74, 0.06)` | `box-shadow: 0 1px 3px rgba(7, 26, 74, 0.06);` |
| 1244 | hex | `#F7F9FE` | `background: #F7F9FE;` |
| 1245 | hex | `#93C5FD` | `border-color: #93C5FD;` |
| 1251 | rgba | `rgba(21, 87, 214, 0.3)` | `outline: 3px solid rgba(21, 87, 214, 0.3);` |
| 1261 | hex | `#D0E1FD` | `border: 1px solid #D0E1FD;` |
| 1263 | hex | `#EEF6FF` | `background: #EEF6FF;` |
| 1264 | hex | `#1557D6` | `color: #1557D6;` |
| 1274 | hex | `#DBEAFE` | `background: #DBEAFE;` |
| 1275 | hex | `#93C5FD` | `border-color: #93C5FD;` |
| 1278 | rgba | `rgba(21, 87, 214, 0.3)` | `outline: 3px solid rgba(21, 87, 214, 0.3);` |
| 1288 | hex | `#E4EAF2` | `border: 1px solid #E4EAF2;` |
| 1290 | hex | `#fff` | `background: #fff;` |
| 1295 | hex | `#E4EAF2` | `border-right: 1px solid #E4EAF2;` |
| 1304 | hex | `#69758A` | `color: #69758A;` |
| 1310 | hex | `#071A4A` | `color: #071A4A;` |
| 1317 | hex | `#E4EAF2` | `border-top: 1px solid #E4EAF2;` |
| 1322 | hex | `#E4EAF2` | `border-left: 2px solid #E4EAF2;` |
| 1328 | hex | `#071A4A` | `color: #071A4A;` |
| 1336 | hex | `#3F4A60` | `color: #3F4A60;` |
| 1342 | hex | `#69758A` | `color: #69758A;` |
| 1355 | rgba | `rgba(21,87,214,0.25)` | `radial-gradient(circle at 20% 50%, rgba(21,87,214,0.25) 0%, transparent 50%),` |
| 1356 | rgba | `rgba(105,70,232,0.15)` | `radial-gradient(circle at 80% 20%, rgba(105,70,232,0.15) 0%, transparent 40%),` |
| 1357 | hex | `#071A4A` | `linear-gradient(135deg, #071A4A 0%, #0B256B 50%, #071A4A 100%);` |
| 1357 | hex | `#0B256B` | `linear-gradient(135deg, #071A4A 0%, #0B256B 50%, #071A4A 100%);` |
| 1357 | hex | `#071A4A` | `linear-gradient(135deg, #071A4A 0%, #0B256B 50%, #071A4A 100%);` |
| 1364 | rgba | `rgba(255,255,255,0.025)` | `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),` |
| 1365 | rgba | `rgba(255,255,255,0.025)` | `linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);` |
| 1372 | hex | `#fff` | `background: #fff;` |
| 1373 | hex | `#E4EAF2` | `border: 1px solid #E4EAF2;` |
| 1375 | rgba | `rgba(7, 26, 74, 0.06)` | `box-shadow: 0 4px 18px rgba(7, 26, 74, 0.06), 0 1px 3px rgba(7, 26, 74, 0.04);` |
| 1375 | rgba | `rgba(7, 26, 74, 0.04)` | `box-shadow: 0 4px 18px rgba(7, 26, 74, 0.06), 0 1px 3px rgba(7, 26, 74, 0.04);` |
| 1379 | rgba | `rgba(7, 26, 74, 0.1)` | `box-shadow: 0 10px 32px rgba(7, 26, 74, 0.1);` |
| 1380 | hex | `#93C5FD` | `border-color: #93C5FD;` |
| 1396 | hex | `#E4EAF2` | `border: 1px solid #E4EAF2;` |
| 1398 | hex | `#fff` | `background: #fff;` |
| 1399 | hex | `#3F4A60` | `color: #3F4A60;` |
| 1406 | hex | `#93C5FD` | `.ap-track-pill:hover { border-color: #93C5FD; color: #1557D6; background: #EEF6FF; }` |
| 1406 | hex | `#1557D6` | `.ap-track-pill:hover { border-color: #93C5FD; color: #1557D6; background: #EEF6FF; }` |
| 1406 | hex | `#EEF6FF` | `.ap-track-pill:hover { border-color: #93C5FD; color: #1557D6; background: #EEF6FF; }` |
| 1408 | hex | `#1557D6` | `border-color: #1557D6;` |
| 1409 | hex | `#EEF6FF` | `background: #EEF6FF;` |
| 1410 | hex | `#1557D6` | `color: #1557D6;` |

### `src\components\career\ArzonRoleIntelligencePage.tsx` - 254

| Line | Kind | Value | Context |
|---:|---|---|---|
| 73 | hex | `#F8FAFC` | `<main className="min-h-screen bg-[#F8FAFC] tone-light font-sans antialiased text-[#1E293B]">` |
| 73 | hex | `#1E293B` | `<main className="min-h-screen bg-[#F8FAFC] tone-light font-sans antialiased text-[#1E293B]">` |
| 75 | hex | `#E2E8F0` | `<section className="relative overflow-hidden border-b border-[#E2E8F0] bg-white tone-light">` |
| 76 | hex | `#EEF6FF` | `<div className="absolute inset-0 bg-radial-[at_top_right] from-[#EEF6FF]/70 via-transparent to-transparent pointer-events-none" />` |
| 81 | hex | `#64748B` | `<nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B]">` |
| 82 | hex | `#071A4A` | `<Link to="/roles" className="hover:text-[#071A4A] transition-colors">Career Taxonomy</Link>` |
| 84 | hex | `#1557D6` | `<span className="text-[#1557D6]">{role.familyId === "drug-safety" ? "Drug Safety & PV" : role.familyId}</span>` |
| 86 | hex | `#071A4A` | `<span className="text-[#071A4A]">{role.name}</span>` |
| 89 | hex | `#D0E1FD` | `<div className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6]">` |
| 89 | hex | `#EEF6FF` | `<div className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6]">` |
| 89 | hex | `#1557D6` | `<div className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6]">` |
| 90 | hex | `#1557D6` | `<span className="h-2 w-2 rounded-full bg-[#1557D6] motion-safe:animate-pulse" />` |
| 96 | hex | `#CBD5E1` | `<div className="relative overflow-hidden rounded-3xl border border-[#CBD5E1] bg-[#071A4A] shadow-xl">` |
| 96 | hex | `#071A4A` | `<div className="relative overflow-hidden rounded-3xl border border-[#CBD5E1] bg-[#071A4A] shadow-xl">` |
| 104 | hex | `#071A4A` | `<div className="absolute inset-0 bg-gradient-to-t from-[#071A4A] via-[#071A4A]/50 to-transparent" />` |
| 104 | hex | `#071A4A` | `<div className="absolute inset-0 bg-gradient-to-t from-[#071A4A] via-[#071A4A]/50 to-transparent" />` |
| 105 | hex | `#071A4A` | `<div className="absolute inset-0 bg-gradient-to-r from-[#071A4A]/80 via-transparent to-transparent" />` |
| 136 | hex | `#D0E1FD` | `<div className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6]">` |
| 136 | hex | `#EEF6FF` | `<div className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6]">` |
| 136 | hex | `#1557D6` | `<div className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6]">` |
| 137 | hex | `#1557D6` | `<span className="h-2 w-2 rounded-full bg-[#1557D6] motion-safe:animate-pulse" />` |
| 142 | hex | `#071A4A` | `<h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#071A4A] leading-[1.12]">` |
| 144 | hex | `#1557D6` | `<span className="block text-xl sm:text-2xl font-sans font-bold text-[#1557D6] mt-2">` |
| 150 | hex | `#334155` | `<p className="text-base sm:text-lg text-[#334155] leading-relaxed">` |
| 156 | hex | `#E2E8F0` | `<div className="rounded-xl border border-[#E2E8F0] bg-white tone-light card-light p-3.5 shadow-xs">` |
| 157 | hex | `#64748B` | `<div className="text-[11px] font-mono uppercase font-bold text-[#64748B]">Live JD Evidence</div>` |
| 158 | hex | `#071A4A` | `<div className="text-xl font-extrabold text-[#071A4A] mt-1">{role.evidence ? `${role.evidence.jdCount}+` : "210+"}</div>` |
| 159 | hex | `#1557D6` | `<div className="text-[10px] text-[#1557D6] font-medium mt-0.5">Verified Indian Vacancies</div>` |
| 162 | hex | `#E2E8F0` | `<div className="rounded-xl border border-[#E2E8F0] bg-white tone-light card-light p-3.5 shadow-xs">` |
| 163 | hex | `#64748B` | `<div className="text-[11px] font-mono uppercase font-bold text-[#64748B]">Entry Pay Band</div>` |
| 164 | hex | `#071A4A` | `<div className="text-xl font-extrabold text-[#071A4A] mt-1">₹{role.salary?.entry.min ?? 3.5}–{role.salary?.entry.max ?? 5.0} LPA</div>` |
| 168 | hex | `#E2E8F0` | `<div className="rounded-xl border border-[#E2E8F0] bg-white tone-light card-light p-3.5 shadow-xs">` |
| 169 | hex | `#64748B` | `<div className="text-[11px] font-mono uppercase font-bold text-[#64748B]">AI Automation Risk</div>` |
| 170 | hex | `#071A4A` | `<div className="text-xl font-extrabold text-[#071A4A] mt-1">{role.aiRisk}</div>` |
| 171 | hex | `#64748B` | `<div className="text-[10px] text-[#64748B] font-medium mt-0.5">Human sign-off mandated</div>` |
| 174 | hex | `#E2E8F0` | `<div className="rounded-xl border border-[#E2E8F0] bg-white tone-light card-light p-3.5 shadow-xs">` |
| 175 | hex | `#64748B` | `<div className="text-[11px] font-mono uppercase font-bold text-[#64748B]">Hiring Demand</div>` |
| 176 | hex | `#1557D6` | `<div className="text-xl font-extrabold text-[#1557D6] mt-1">{role.demandIndia}</div>` |
| 177 | hex | `#64748B` | `<div className="text-[10px] text-[#64748B] font-medium mt-0.5">Hyd · Blr · Pune · Mum</div>` |
| 186 | hex | `#071A4A` | `className="inline-flex items-center gap-2 rounded-full bg-[#071A4A] hover:bg-[#1557D6] text-white px-6 py-3.5 text-sm font-bold shadow-md transition-all duration-200"` |
| 186 | hex | `#1557D6` | `className="inline-flex items-center gap-2 rounded-full bg-[#071A4A] hover:bg-[#1557D6] text-white px-6 py-3.5 text-sm font-bold shadow-md transition-all duration-200"` |
| 194 | hex | `#D0E1FD` | `className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-white tone-light card-light hover:bg-[#EEF6FF] text-[#071A4A] px-6 py-3.5 text-sm font-bold transi` |
| 194 | hex | `#EEF6FF` | `className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-white tone-light card-light hover:bg-[#EEF6FF] text-[#071A4A] px-6 py-3.5 text-sm font-bold transi` |
| 194 | hex | `#071A4A` | `className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-white tone-light card-light hover:bg-[#EEF6FF] text-[#071A4A] px-6 py-3.5 text-sm font-bold transi` |
| 196 | hex | `#1557D6` | `<BookOpen className="h-4 w-4 text-[#1557D6]" />` |
| 204 | hex | `#CBD5E1` | `<div className="rounded-2xl border border-[#CBD5E1] bg-white tone-light card-light shadow-lg overflow-hidden">` |
| 206 | hex | `#071A4A` | `<div className="bg-[#071A4A] px-4 py-3 flex items-center justify-between">` |
| 223 | hex | `#071A4A` | `<div className="flex items-center justify-between text-xs font-bold text-[#071A4A] mb-2">` |
| 224 | hex | `#64748B` | `<span className="uppercase font-mono tracking-wider text-[#64748B]">Daily Working Shift Allocation</span>` |
| 225 | hex | `#1557D6` | `<span className="font-mono text-[#1557D6]">8-Hour Production Cycle</span>` |
| 230 | hex | `#1557D6` | `{ label: "Intake Triage & Day-0 Validity", pct: 25, detail: "Source verification, 4 criteria check", color: "#1557D6" },` |
| 231 | hex | `#6946E8` | `{ label: "MedDRA & WHO-DD Term Coding", pct: 25, detail: "LLT/PT mapping, ATC product coding", color: "#6946E8" },` |
| 232 | hex | `#27B9B3` | `{ label: "Chronological Narrative Writing", pct: 30, detail: "Storytelling, dechallenge, labs", color: "#27B9B3" },` |
| 233 | hex | `#071A4A` | `{ label: "Self-QC & Duplicate Reconciliation", pct: 20, detail: "Defect review, clock compliance", color: "#071A4A" },` |
| 237 | hex | `#1E293B` | `<span className="font-semibold text-[#1E293B]">{item.label}</span>` |
| 238 | hex | `#071A4A` | `<span className="font-mono font-bold text-[#071A4A]">{item.pct}%</span>` |
| 240 | hex | `#E2E8F0` | `<div className="h-2 w-full rounded-full bg-[#E2E8F0] overflow-hidden">` |
| 246 | hex | `#64748B` | `<p className="text-[11px] text-[#64748B]">{item.detail}</p>` |
| 253 | hex | `#E2E8F0` | `<div className="pt-3 border-t border-[#E2E8F0] grid grid-cols-2 gap-2 text-xs">` |
| 254 | hex | `#F8FAFC` | `<div className="rounded-lg bg-[#F8FAFC] p-2.5 border border-[#E2E8F0]">` |
| 254 | hex | `#E2E8F0` | `<div className="rounded-lg bg-[#F8FAFC] p-2.5 border border-[#E2E8F0]">` |
| 255 | hex | `#64748B` | `<div className="text-[10px] font-mono text-[#64748B] uppercase">Daily Target</div>` |
| 256 | hex | `#071A4A` | `<div className="font-bold text-[#071A4A] mt-0.5">{pvMeta?.productionMetrics.dailyTarget ?? "3–4 Cases / Shift"}</div>` |
| 258 | hex | `#F8FAFC` | `<div className="rounded-lg bg-[#F8FAFC] p-2.5 border border-[#E2E8F0]">` |
| 258 | hex | `#E2E8F0` | `<div className="rounded-lg bg-[#F8FAFC] p-2.5 border border-[#E2E8F0]">` |
| 259 | hex | `#64748B` | `<div className="text-[10px] font-mono text-[#64748B] uppercase">Turnaround SLA</div>` |
| 260 | hex | `#071A4A` | `<div className="font-bold text-[#071A4A] mt-0.5">{pvMeta?.productionMetrics.averageSla ?? "24–48 Hours"}</div>` |
| 262 | hex | `#F8FAFC` | `<div className="rounded-lg bg-[#F8FAFC] p-2.5 border border-[#E2E8F0]">` |
| 262 | hex | `#E2E8F0` | `<div className="rounded-lg bg-[#F8FAFC] p-2.5 border border-[#E2E8F0]">` |
| 263 | hex | `#64748B` | `<div className="text-[10px] font-mono text-[#64748B] uppercase">Quality AQL</div>` |
| 264 | hex | `#1557D6` | `<div className="font-bold text-[#1557D6] mt-0.5">{pvMeta?.productionMetrics.rightFirstTimeAql ?? "≥ 98.0% RFT"}</div>` |
| 266 | hex | `#F8FAFC` | `<div className="rounded-lg bg-[#F8FAFC] p-2.5 border border-[#E2E8F0]">` |
| 266 | hex | `#E2E8F0` | `<div className="rounded-lg bg-[#F8FAFC] p-2.5 border border-[#E2E8F0]">` |
| 267 | hex | `#64748B` | `<div className="text-[10px] font-mono text-[#64748B] uppercase">Critical Defect Gate</div>` |
| 275 | hex | `#D0E1FD` | `<div className="rounded-xl border border-[#D0E1FD] bg-[#EEF6FF] p-4 flex items-start gap-3">` |
| 275 | hex | `#EEF6FF` | `<div className="rounded-xl border border-[#D0E1FD] bg-[#EEF6FF] p-4 flex items-start gap-3">` |
| 276 | hex | `#1557D6` | `<ShieldCheck className="h-5 w-5 text-[#1557D6] shrink-0 mt-0.5" />` |
| 277 | hex | `#1E293B` | `<div className="text-xs text-[#1E293B] leading-relaxed">` |
| 278 | hex | `#071A4A` | `<strong className="text-[#071A4A] block mb-0.5">Auditable Production Standard</strong>` |
| 288 | hex | `#E2E8F0` | `<section className="py-16 sm:py-20 border-b border-[#E2E8F0] bg-[#F8FAFC] tone-light">` |
| 288 | hex | `#F8FAFC` | `<section className="py-16 sm:py-20 border-b border-[#E2E8F0] bg-[#F8FAFC] tone-light">` |
| 292 | hex | `#D0E1FD` | `<div className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6]">` |
| 292 | hex | `#EEF6FF` | `<div className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6]">` |
| 292 | hex | `#1557D6` | `<div className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6]">` |
| 295 | hex | `#071A4A` | `<h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#071A4A] tracking-tight">` |
| 298 | hex | `#475569` | `<p className="text-sm sm:text-base text-[#475569] leading-relaxed">` |
| 352 | hex | `#1557D6` | `? "border-[#1557D6] bg-white tone-light card-light shadow-md ring-2 ring-[#1557D6]/10"` |
| 352 | hex | `#1557D6` | `? "border-[#1557D6] bg-white tone-light card-light shadow-md ring-2 ring-[#1557D6]/10"` |
| 353 | hex | `#E2E8F0` | `: "border-[#E2E8F0] bg-white/70 tone-light hover:bg-white hover:border-[#CBD5E1]"` |
| 353 | hex | `#CBD5E1` | `: "border-[#E2E8F0] bg-white/70 tone-light hover:bg-white hover:border-[#CBD5E1]"` |
| 358 | hex | `#1557D6` | `isActive ? "bg-[#1557D6] text-white" : "bg-[#F1F5F9] text-[#64748B]"` |
| 358 | hex | `#F1F5F9` | `isActive ? "bg-[#1557D6] text-white" : "bg-[#F1F5F9] text-[#64748B]"` |
| 358 | hex | `#64748B` | `isActive ? "bg-[#1557D6] text-white" : "bg-[#F1F5F9] text-[#64748B]"` |
| 365 | hex | `#1557D6` | `<span className="text-xs font-mono font-bold text-[#1557D6] uppercase tracking-wider">{wf.regulatoryRef}</span>` |
| 367 | hex | `#071A4A` | `<h3 className="text-sm sm:text-base font-bold text-[#071A4A]">{wf.title}</h3>` |
| 368 | hex | `#64748B` | `<p className="text-xs text-[#64748B]">{wf.tagline}</p>` |
| 388 | hex | `#CBD5E1` | `<div className="rounded-2xl border border-[#CBD5E1] bg-white tone-light card-light shadow-lg p-6 sm:p-8 space-y-6">` |
| 389 | hex | `#E2E8F0` | `<div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E2E8F0]">` |
| 391 | hex | `#071A4A` | `<span className="h-8 w-8 rounded-lg bg-[#071A4A] text-white font-mono text-xs font-bold flex items-center justify-center">` |
| 395 | hex | `#1557D6` | `<span className="text-[11px] font-mono uppercase font-bold text-[#1557D6]">` |
| 398 | hex | `#071A4A` | `<h4 className="text-lg font-bold text-[#071A4A]">{current.title}</h4>` |
| 402 | hex | `#EEF6FF` | `<span className="rounded-full bg-[#EEF6FF] border border-[#D0E1FD] px-3 py-1 font-mono text-xs font-semibold text-[#1557D6]">` |
| 402 | hex | `#D0E1FD` | `<span className="rounded-full bg-[#EEF6FF] border border-[#D0E1FD] px-3 py-1 font-mono text-xs font-semibold text-[#1557D6]">` |
| 402 | hex | `#1557D6` | `<span className="rounded-full bg-[#EEF6FF] border border-[#D0E1FD] px-3 py-1 font-mono text-xs font-semibold text-[#1557D6]">` |
| 408 | hex | `#64748B` | `<h5 className="text-xs font-mono uppercase tracking-wider font-bold text-[#64748B]">Operational Mission</h5>` |
| 409 | hex | `#334155` | `<p className="text-sm sm:text-base text-[#334155] leading-relaxed">` |
| 415 | hex | `#E2E8F0` | `<div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 space-y-3">` |
| 415 | hex | `#F8FAFC` | `<div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 space-y-3">` |
| 416 | hex | `#071A4A` | `<div className="text-xs font-mono uppercase font-bold text-[#071A4A]">Verifiable Work Deliverable</div>` |
| 418 | hex | `#1557D6` | `<FileText className="h-5 w-5 text-[#1557D6] shrink-0" />` |
| 419 | hex | `#1E293B` | `<span className="text-sm font-semibold text-[#1E293B]">{current.sampleArtifact}</span>` |
| 421 | hex | `#64748B` | `<p className="text-xs text-[#64748B] leading-relaxed">` |
| 427 | hex | `#64748B` | `<span className="text-xs text-[#64748B]">` |
| 428 | hex | `#071A4A` | `Classroom Coverage: <strong className="text-[#071A4A]">Weeks 2–5 of the 12-Week Track</strong>` |
| 432 | hex | `#1557D6` | `className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1557D6] hover:underline"` |
| 448 | hex | `#E2E8F0` | `<section className="py-16 sm:py-20 border-b border-[#E2E8F0] bg-white tone-light">` |
| 456 | hex | `#071A4A` | `<h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#071A4A] tracking-tight">` |
| 459 | hex | `#475569` | `<p className="text-sm sm:text-base text-[#475569] leading-relaxed">` |
| 465 | hex | `#CBD5E1` | `<div className="rounded-2xl border border-[#CBD5E1] bg-white tone-light card-light shadow-xl overflow-hidden">` |
| 467 | hex | `#071A4A` | `<div className="bg-[#071A4A] p-4 sm:p-5 text-white flex flex-wrap items-center justify-between gap-4">` |
| 470 | hex | `#1557D6` | `<span className="font-mono text-xs font-bold bg-[#1557D6] px-2.5 py-0.5 rounded">` |
| 494 | hex | `#071A4A` | `? "bg-white text-[#071A4A] shadow-xs"` |
| 505 | hex | `#F8FAFC` | `<div className="p-6 sm:p-8 bg-[#F8FAFC]">` |
| 510 | hex | `#64748B` | `<span className="text-xs font-mono uppercase font-bold text-[#64748B]">Raw Inbound Intake Document</span>` |
| 511 | hex | `#1557D6` | `<span className="text-xs font-mono text-[#1557D6] font-semibold">Unstructured Physician Notes</span>` |
| 513 | hex | `#CBD5E1` | `<div className="rounded-xl border border-[#CBD5E1] bg-white tone-light card-light p-5 font-mono text-xs text-[#1E293B] leading-relaxed shadow-xs">` |
| 513 | hex | `#1E293B` | `<div className="rounded-xl border border-[#CBD5E1] bg-white tone-light card-light p-5 font-mono text-xs text-[#1E293B] leading-relaxed shadow-xs">` |
| 516 | hex | `#64748B` | `<p className="text-xs text-[#64748B]">` |
| 526 | hex | `#64748B` | `<span className="text-xs font-mono uppercase font-bold text-[#64748B]">ICH E2D(R1) Minimum ICSR Validity Check</span>` |
| 532 | hex | `#E2E8F0` | `<div key={c.item} className="rounded-xl border border-[#E2E8F0] bg-white tone-light card-light p-4 flex items-start gap-3 shadow-xs">` |
| 537 | hex | `#071A4A` | `<div className="text-xs font-bold text-[#071A4A]">{c.item}</div>` |
| 538 | hex | `#64748B` | `<div className="text-xs text-[#64748B] mt-0.5">{c.note}</div>` |
| 553 | hex | `#64748B` | `<span className="text-xs font-mono uppercase font-bold text-[#64748B]">ICH MedDRA Hierarchy Path (MTS:PTC Guidelines)</span>` |
| 554 | hex | `#1557D6` | `<span className="text-xs font-mono text-[#1557D6] font-semibold">MedDRA Version 27.0</span>` |
| 557 | hex | `#CBD5E1` | `<div className="rounded-xl border border-[#CBD5E1] bg-white tone-light card-light p-5 space-y-3 shadow-xs font-mono text-xs">` |
| 558 | hex | `#E2E8F0` | `<div className="flex items-center gap-3 py-1.5 border-b border-[#E2E8F0]">` |
| 559 | hex | `#64748B` | `<span className="w-16 font-bold text-[#64748B]">SOC:</span>` |
| 560 | hex | `#071A4A` | `<span className="font-bold text-[#071A4A]">{pvMeta.interactiveCaseStudy.meddraHierarchy.soc}</span>` |
| 562 | hex | `#E2E8F0` | `<div className="flex items-center gap-3 py-1.5 border-b border-[#E2E8F0] pl-4">` |
| 563 | hex | `#64748B` | `<span className="w-16 font-bold text-[#64748B]">HLGT:</span>` |
| 564 | hex | `#334155` | `<span className="text-[#334155]">{pvMeta.interactiveCaseStudy.meddraHierarchy.hlgt}</span>` |
| 566 | hex | `#E2E8F0` | `<div className="flex items-center gap-3 py-1.5 border-b border-[#E2E8F0] pl-8">` |
| 567 | hex | `#64748B` | `<span className="w-16 font-bold text-[#64748B]">HLT:</span>` |
| 568 | hex | `#334155` | `<span className="text-[#334155]">{pvMeta.interactiveCaseStudy.meddraHierarchy.hlt}</span>` |
| 570 | hex | `#E2E8F0` | `<div className="flex items-center gap-3 py-1.5 border-b border-[#E2E8F0] pl-12 bg-[#EEF6FF] rounded">` |
| 570 | hex | `#EEF6FF` | `<div className="flex items-center gap-3 py-1.5 border-b border-[#E2E8F0] pl-12 bg-[#EEF6FF] rounded">` |
| 571 | hex | `#1557D6` | `<span className="w-16 font-bold text-[#1557D6]">PT:</span>` |
| 572 | hex | `#1557D6` | `<span className="font-extrabold text-[#1557D6]">{pvMeta.interactiveCaseStudy.meddraHierarchy.pt}</span>` |
| 573 | hex | `#1557D6` | `<span className="text-[10px] bg-[#1557D6] text-white px-2 py-0.5 rounded ml-auto">REGULATORY LEVEL</span>` |
| 576 | hex | `#64748B` | `<span className="w-16 font-bold text-[#64748B]">LLT:</span>` |
| 577 | hex | `#334155` | `<span className="text-[#334155]">{pvMeta.interactiveCaseStudy.meddraHierarchy.llt} ({pvMeta.interactiveCaseStudy.meddraHierarchy.code})</span>` |
| 580 | hex | `#64748B` | `<p className="text-xs text-[#64748B]">` |
| 590 | hex | `#64748B` | `<span className="text-xs font-mono uppercase font-bold text-[#64748B]">Submission-Standard Chronological Narrative</span>` |
| 591 | hex | `#1557D6` | `<span className="text-xs font-mono text-[#1557D6] font-semibold">ICH E2B(R3) Field B.5</span>` |
| 594 | hex | `#CBD5E1` | `<div className="rounded-xl border border-[#CBD5E1] bg-white tone-light card-light p-6 text-sm text-[#1E293B] leading-relaxed shadow-xs font-serif">` |
| 594 | hex | `#1E293B` | `<div className="rounded-xl border border-[#CBD5E1] bg-white tone-light card-light p-6 text-sm text-[#1E293B] leading-relaxed shadow-xs font-serif">` |
| 599 | hex | `#E2E8F0` | `<div className="rounded-lg bg-white tone-light p-3 border border-[#E2E8F0]">` |
| 600 | hex | `#64748B` | `<span className="text-[10px] font-mono text-[#64748B] block uppercase">Pillar 1: Chronology</span>` |
| 603 | hex | `#E2E8F0` | `<div className="rounded-lg bg-white tone-light p-3 border border-[#E2E8F0]">` |
| 604 | hex | `#64748B` | `<span className="text-[10px] font-mono text-[#64748B] block uppercase">Pillar 2: Dechallenge</span>` |
| 607 | hex | `#E2E8F0` | `<div className="rounded-lg bg-white tone-light p-3 border border-[#E2E8F0]">` |
| 608 | hex | `#64748B` | `<span className="text-[10px] font-mono text-[#64748B] block uppercase">Pillar 3: Neutrality</span>` |
| 619 | hex | `#64748B` | `<span className="text-xs font-mono uppercase font-bold text-[#64748B]">Final Triage & Regulatory Routing Decision</span>` |
| 623 | hex | `#CBD5E1` | `<div className="rounded-xl border border-[#CBD5E1] bg-white tone-light card-light p-5 space-y-4 shadow-xs">` |
| 626 | hex | `#64748B` | `<div className="text-xs font-mono text-[#64748B] uppercase">Seriousness Classification</div>` |
| 630 | hex | `#64748B` | `<div className="text-xs text-[#64748B] mt-0.5">` |
| 636 | hex | `#64748B` | `<div className="text-xs font-mono text-[#64748B] uppercase">Causality Rating</div>` |
| 637 | hex | `#071A4A` | `<div className="text-base font-bold text-[#071A4A] mt-1">` |
| 640 | hex | `#64748B` | `<div className="text-xs text-[#64748B] mt-0.5">` |
| 646 | hex | `#E2E8F0` | `<div className="pt-3 border-t border-[#E2E8F0] grid grid-cols-1 sm:grid-cols-2 gap-4">` |
| 648 | hex | `#64748B` | `<div className="text-xs font-mono text-[#64748B] uppercase">Reporting Clock</div>` |
| 649 | hex | `#1557D6` | `<div className="text-sm font-bold text-[#1557D6] mt-1">` |
| 655 | hex | `#64748B` | `<div className="text-xs font-mono text-[#64748B] uppercase">Submission Gateway</div>` |
| 656 | hex | `#071A4A` | `<div className="text-sm font-bold text-[#071A4A] mt-1">` |
| 672 | hex | `#E2E8F0` | `<section className="py-16 sm:py-20 border-b border-[#E2E8F0] bg-[#F8FAFC] tone-light">` |
| 672 | hex | `#F8FAFC` | `<section className="py-16 sm:py-20 border-b border-[#E2E8F0] bg-[#F8FAFC] tone-light">` |
| 679 | hex | `#071A4A` | `<h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#071A4A] tracking-tight">` |
| 682 | hex | `#475569` | `<p className="text-sm sm:text-base text-[#475569] leading-relaxed">` |
| 714 | hex | `#64748B` | `<span className="text-[11px] font-mono text-[#64748B]">` |
| 720 | hex | `#071A4A` | `<h3 className="text-sm font-bold text-[#071A4A]">{defect.definition}</h3>` |
| 723 | hex | `#F8FAFC` | `<div className="rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] p-3.5 space-y-2 text-xs">` |
| 723 | hex | `#E2E8F0` | `<div className="rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] p-3.5 space-y-2 text-xs">` |
| 725 | hex | `#64748B` | `<span className="font-mono text-[10px] uppercase text-[#64748B] block font-bold">Real-World Example</span>` |
| 726 | hex | `#1E293B` | `<span className="text-[#1E293B] font-medium">{defect.realWorldExample}</span>` |
| 728 | hex | `#E2E8F0` | `<div className="pt-2 border-t border-[#E2E8F0]">` |
| 729 | hex | `#64748B` | `<span className="font-mono text-[10px] uppercase text-[#64748B] block font-bold">Audit Impact</span>` |
| 730 | hex | `#334155` | `<span className="text-[#334155]">{defect.qualityImpact}</span>` |
| 734 | hex | `#64748B` | `<div className="text-xs text-[#64748B]">` |
| 747 | hex | `#E2E8F0` | `<section className="py-16 sm:py-20 border-b border-[#E2E8F0] bg-white tone-light">` |
| 750 | hex | `#D0E1FD` | `<div className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6]">` |
| 750 | hex | `#EEF6FF` | `<div className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6]">` |
| 750 | hex | `#1557D6` | `<div className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6]">` |
| 754 | hex | `#071A4A` | `<h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#071A4A] tracking-tight">` |
| 757 | hex | `#475569` | `<p className="text-sm sm:text-base text-[#475569] leading-relaxed">` |
| 762 | hex | `#CBD5E1` | `<div className="overflow-x-auto rounded-2xl border border-[#CBD5E1] bg-white tone-light card-light shadow-md">` |
| 765 | hex | `#071A4A` | `<tr className="bg-[#071A4A] text-white font-mono uppercase text-[11px] tracking-wider">` |
| 773 | hex | `#E2E8F0` | `<tbody className="divide-y divide-[#E2E8F0] text-[#334155]">` |
| 773 | hex | `#334155` | `<tbody className="divide-y divide-[#E2E8F0] text-[#334155]">` |
| 775 | hex | `#F8FAFC` | `<tr key={row.employerDemand} className="hover:bg-[#F8FAFC] transition-colors">` |
| 776 | hex | `#071A4A` | `<td className="p-4 font-bold text-[#071A4A]">` |
| 779 | hex | `#475569` | `<td className="p-4 text-[#475569] max-w-xs leading-relaxed">` |
| 782 | hex | `#1557D6` | `<td className="p-4 font-mono font-bold text-[#1557D6]">` |
| 785 | hex | `#1E293B` | `<td className="p-4 font-medium text-[#1E293B]">` |
| 789 | hex | `#EEF6FF` | `<span className="inline-block rounded-md bg-[#EEF6FF] text-[#1557D6] font-mono text-[10px] font-bold px-2 py-0.5">` |
| 789 | hex | `#1557D6` | `<span className="inline-block rounded-md bg-[#EEF6FF] text-[#1557D6] font-mono text-[10px] font-bold px-2 py-0.5">` |
| 803 | hex | `#E2E8F0` | `<section className="py-16 sm:py-20 border-b border-[#E2E8F0] bg-[#F8FAFC] tone-light">` |
| 803 | hex | `#F8FAFC` | `<section className="py-16 sm:py-20 border-b border-[#E2E8F0] bg-[#F8FAFC] tone-light">` |
| 806 | hex | `#D0E1FD` | `<div className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6]">` |
| 806 | hex | `#EEF6FF` | `<div className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6]">` |
| 806 | hex | `#1557D6` | `<div className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#1557D6]">` |
| 810 | hex | `#071A4A` | `<h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#071A4A] tracking-tight">` |
| 813 | hex | `#475569` | `<p className="text-sm sm:text-base text-[#475569] leading-relaxed">` |
| 827 | hex | `#CBD5E1` | `<div key={emp.name} className="rounded-2xl border border-[#CBD5E1] bg-white tone-light card-light p-6 shadow-xs space-y-4">` |
| 829 | hex | `#1557D6` | `<span className="text-[10px] font-mono font-bold text-[#1557D6] uppercase tracking-wider">` |
| 832 | hex | `#071A4A` | `<h3 className="text-base font-extrabold text-[#071A4A] mt-1">{emp.name}</h3>` |
| 833 | hex | `#64748B` | `<div className="text-xs text-[#64748B] mt-0.5">{emp.location}</div>` |
| 836 | hex | `#F8FAFC` | `<div className="rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] p-3 text-xs space-y-1">` |
| 836 | hex | `#E2E8F0` | `<div className="rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] p-3 text-xs space-y-1">` |
| 837 | hex | `#64748B` | `<div className="text-[10px] font-mono text-[#64748B] uppercase">Typical Fresher Title</div>` |
| 838 | hex | `#1E293B` | `<div className="font-bold text-[#1E293B]">{emp.fresherTitle}</div>` |
| 843 | hex | `#64748B` | `<div className="text-[10px] font-mono text-[#64748B] uppercase font-bold">Mandated In JDs</div>` |
| 846 | hex | `#EEF6FF` | `<span key={sk} className="rounded bg-[#EEF6FF] text-[#1557D6] text-[10px] font-semibold px-2 py-0.5">` |
| 846 | hex | `#1557D6` | `<span key={sk} className="rounded bg-[#EEF6FF] text-[#1557D6] text-[10px] font-semibold px-2 py-0.5">` |
| 860 | hex | `#E2E8F0` | `<section className="py-16 sm:py-20 border-b border-[#E2E8F0] bg-white tone-light">` |
| 867 | hex | `#071A4A` | `<h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#071A4A] tracking-tight">` |
| 870 | hex | `#475569` | `<p className="text-sm sm:text-base text-[#475569] leading-relaxed">` |
| 881 | hex | `#CBD5E1` | `className="rounded-2xl border border-[#CBD5E1] bg-white tone-light card-light shadow-xs overflow-hidden transition-all"` |
| 885 | hex | `#F8FAFC` | `className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 hover:bg-[#F8FAFC]"` |
| 888 | hex | `#1557D6` | `<span className="font-mono text-xs font-bold text-[#1557D6]">Question 0{idx + 1}</span>` |
| 889 | hex | `#071A4A` | `<h3 className="text-base font-bold text-[#071A4A]">{q.question}</h3>` |
| 890 | hex | `#64748B` | `<p className="text-xs text-[#64748B] font-medium">Panel focus: {q.whatPanelEvaluates}</p>` |
| 892 | hex | `#EEF6FF` | `<div className="h-7 w-7 rounded-full bg-[#EEF6FF] text-[#1557D6] flex items-center justify-center shrink-0 font-bold text-sm">` |
| 892 | hex | `#1557D6` | `<div className="h-7 w-7 rounded-full bg-[#EEF6FF] text-[#1557D6] flex items-center justify-center shrink-0 font-bold text-sm">` |
| 898 | hex | `#E2E8F0` | `<div className="p-5 sm:p-6 pt-0 border-t border-[#E2E8F0] bg-[#F8FAFC] space-y-2">` |
| 898 | hex | `#F8FAFC` | `<div className="p-5 sm:p-6 pt-0 border-t border-[#E2E8F0] bg-[#F8FAFC] space-y-2">` |
| 899 | hex | `#1557D6` | `<span className="text-[10px] font-mono uppercase font-bold text-[#1557D6] block">` |
| 902 | hex | `#334155` | `<p className="text-xs sm:text-sm text-[#334155] leading-relaxed">` |
| 916 | hex | `#071A4A` | `<section className="py-16 sm:py-24 bg-[#071A4A] text-white relative overflow-hidden">` |
| 918 | hex | `#EEF6FF` | `<div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#EEF6FF]">` |
| 925 | hex | `#38BDF8` | `<span className="text-[#38BDF8]">{role.name}</span> roles?` |
| 936 | hex | `#1557D6` | `className="inline-flex items-center gap-2 rounded-full bg-[#1557D6] hover:bg-[#2878F0] text-white px-8 py-4 text-sm font-bold shadow-lg transition-all duration-200"` |
| 936 | hex | `#2878F0` | `className="inline-flex items-center gap-2 rounded-full bg-[#1557D6] hover:bg-[#2878F0] text-white px-8 py-4 text-sm font-bold shadow-lg transition-all duration-200"` |
| 961 | hex | `#E2E8F0` | `<section className="py-12 bg-white tone-light border-t border-[#E2E8F0]">` |
| 965 | hex | `#1557D6` | `<span className="text-xs font-mono uppercase font-bold text-[#1557D6]">CAREER LADDER & ADJACENT ROLES</span>` |
| 966 | hex | `#071A4A` | `<h3 className="text-xl font-bold text-[#071A4A]">Explore Adjacent Pharmacovigilance & Data Paths</h3>` |
| 968 | hex | `#1557D6` | `<Link to="/roles" className="text-xs font-bold text-[#1557D6] hover:underline flex items-center gap-1">` |
| 982 | hex | `#CBD5E1` | `className="rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] p-4 hover:border-[#1557D6] hover:bg-white transition-all group"` |
| 982 | hex | `#F8FAFC` | `className="rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] p-4 hover:border-[#1557D6] hover:bg-white transition-all group"` |
| 982 | hex | `#1557D6` | `className="rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] p-4 hover:border-[#1557D6] hover:bg-white transition-all group"` |
| 984 | hex | `#64748B` | `<div className="flex items-center justify-between text-[11px] font-mono text-[#64748B] mb-1">` |
| 985 | hex | `#1557D6` | `<span className="uppercase font-bold text-[#1557D6]">{r.seniority}</span>` |
| 988 | hex | `#071A4A` | `<h4 className="text-sm font-bold text-[#071A4A] group-hover:text-[#1557D6] transition-colors">{r.name}</h4>` |
| 988 | hex | `#1557D6` | `<h4 className="text-sm font-bold text-[#071A4A] group-hover:text-[#1557D6] transition-colors">{r.name}</h4>` |
| 989 | hex | `#64748B` | `<p className="text-xs text-[#64748B] line-clamp-2 mt-1">{r.blurb}</p>` |

### `src\components\acri\landing\AcriLaunchLandingPage.tsx` - 121

| Line | Kind | Value | Context |
|---:|---|---|---|
| 92 | hex | `#F8F9F7` | `<div className="min-h-screen bg-[#F8F9F7] text-[#1D2939] font-sans antialiased selection:bg-[#E8F7F1] selection:text-[#005B4F] relative overflow-hidden">` |
| 92 | hex | `#1D2939` | `<div className="min-h-screen bg-[#F8F9F7] text-[#1D2939] font-sans antialiased selection:bg-[#E8F7F1] selection:text-[#005B4F] relative overflow-hidden">` |
| 92 | hex | `#E8F7F1` | `<div className="min-h-screen bg-[#F8F9F7] text-[#1D2939] font-sans antialiased selection:bg-[#E8F7F1] selection:text-[#005B4F] relative overflow-hidden">` |
| 92 | hex | `#005B4F` | `<div className="min-h-screen bg-[#F8F9F7] text-[#1D2939] font-sans antialiased selection:bg-[#E8F7F1] selection:text-[#005B4F] relative overflow-hidden">` |
| 96 | hex | `#E8F7F1` | `<div className="absolute top-0 right-0 w-[800px] h-[600px] bg-gradient-to-bl from-[#E8F7F1]/70 via-[#E8F7F1]/20 to-transparent rounded-full blur-3xl transform translate-x-1/3 -tran` |
| 96 | hex | `#E8F7F1` | `<div className="absolute top-0 right-0 w-[800px] h-[600px] bg-gradient-to-bl from-[#E8F7F1]/70 via-[#E8F7F1]/20 to-transparent rounded-full blur-3xl transform translate-x-1/3 -tran` |
| 97 | hex | `#E8F7F1` | `<div className="absolute top-[40%] left-[-200px] w-[600px] h-[600px] bg-gradient-to-tr from-[#E8F7F1]/50 to-transparent rounded-full blur-3xl" />` |
| 101 | hex | `#005B4F` | `className="absolute top-24 right-12 opacity-15 w-48 h-48 text-[#005B4F]"` |
| 112 | hex | `#005B4F` | `backgroundImage: "radial-gradient(#005B4F 1.25px, transparent 1.25px)",` |
| 125 | hex | `#E8F7F1` | `<div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F7F1] border border-[#005B4F]/20 text-[#005B4F] text-xs font-mono font-bold uppercase tracking-wide` |
| 125 | hex | `#005B4F` | `<div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F7F1] border border-[#005B4F]/20 text-[#005B4F] text-xs font-mono font-bold uppercase tracking-wide` |
| 125 | hex | `#005B4F` | `<div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F7F1] border border-[#005B4F]/20 text-[#005B4F] text-xs font-mono font-bold uppercase tracking-wide` |
| 126 | hex | `#005B4F` | `<ShieldCheck className="h-4 w-4 text-[#005B4F]" />` |
| 131 | hex | `#0B1325` | `<h1 className="text-4xl sm:text-5xl lg:text-[56px] font-serif font-bold text-[#0B1325] tracking-tight leading-[1.12]">` |
| 133 | hex | `#005B4F` | `<span className="text-[#005B4F]">Industry Ready.</span>` |
| 137 | hex | `#555B66` | `<p className="text-base sm:text-lg text-[#555B66] max-w-xl leading-relaxed">` |
| 143 | hex | `#D9DEE0` | `<div className="rounded-xl p-3 sm:p-3.5 bg-white card-light border border-[#D9DEE0] shadow-xs">` |
| 144 | hex | `#005B4F` | `<div className="flex items-center gap-1.5 text-[#005B4F] mb-1">` |
| 153 | hex | `#D9DEE0` | `<div className="rounded-xl p-3 sm:p-3.5 bg-white card-light border border-[#D9DEE0] shadow-xs">` |
| 154 | hex | `#005B4F` | `<div className="flex items-center gap-1.5 text-[#005B4F] mb-1">` |
| 163 | hex | `#D9DEE0` | `<div className="rounded-xl p-3 sm:p-3.5 bg-white card-light border border-[#D9DEE0] shadow-xs">` |
| 164 | hex | `#005B4F` | `<div className="flex items-center gap-1.5 text-[#005B4F] mb-1">` |
| 186 | hex | `#005B4F` | `className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-white font-sans font-bold text-sm sm:text-base tracking-wide transition-all shad` |
| 186 | hex | `#00473E` | `className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-white font-sans font-bold text-sm sm:text-base tracking-wide transition-all shad` |
| 205 | hex | `#005B4F` | `className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-white font-sans font-bold text-sm sm:text-base tracking-wide transition-all shad` |
| 205 | hex | `#00473E` | `className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-white font-sans font-bold text-sm sm:text-base tracking-wide transition-all shad` |
| 223 | hex | `#E8F7F1` | `<div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#E8F7F1]/80 to-[#D4EEE4]/50 border border-stone-200/80 shadow-xl aspect-4/5 max-w-md mx-auto">` |
| 223 | hex | `#D4EEE4` | `<div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#E8F7F1]/80 to-[#D4EEE4]/50 border border-stone-200/80 shadow-xl aspect-4/5 max-w-md mx-auto">` |
| 249 | hex | `#0B1325` | `<span className="font-serif font-black text-3xl sm:text-4xl text-[#0B1325]">` |
| 265 | hex | `#005B4F` | `<span className="text-[#005B4F] font-bold">` |
| 271 | hex | `#005B4F` | `className="h-full rounded-full bg-[#005B4F] transition-all duration-700"` |
| 280 | hex | `#E8F7F1` | `className="w-full py-2.5 rounded-xl bg-[#E8F7F1] hover:bg-[#d6f2e8] text-[#005B4F] font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"` |
| 280 | hex | `#d6f2e8` | `className="w-full py-2.5 rounded-xl bg-[#E8F7F1] hover:bg-[#d6f2e8] text-[#005B4F] font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"` |
| 280 | hex | `#005B4F` | `className="w-full py-2.5 rounded-xl bg-[#E8F7F1] hover:bg-[#d6f2e8] text-[#005B4F] font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"` |
| 292 | hex | `#E5E7EB` | `<section className="py-16 sm:py-20 bg-white card-light border-y border-[#E5E7EB]">` |
| 295 | hex | `#005B4F` | `<span className="font-mono text-xs font-bold text-[#005B4F] uppercase tracking-widest bg-[#E8F7F1] px-3 py-1 rounded-full">` |
| 295 | hex | `#E8F7F1` | `<span className="font-mono text-xs font-bold text-[#005B4F] uppercase tracking-widest bg-[#E8F7F1] px-3 py-1 rounded-full">` |
| 298 | hex | `#0B1325` | `<h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B1325] mt-3">` |
| 308 | hex | `#FAF8F5` | `<div className="rounded-2xl p-6 bg-[#FAF8F5] border border-[#D9DEE0] hover:border-[#005B4F]/40 transition-all shadow-xs group">` |
| 308 | hex | `#D9DEE0` | `<div className="rounded-2xl p-6 bg-[#FAF8F5] border border-[#D9DEE0] hover:border-[#005B4F]/40 transition-all shadow-xs group">` |
| 308 | hex | `#005B4F` | `<div className="rounded-2xl p-6 bg-[#FAF8F5] border border-[#D9DEE0] hover:border-[#005B4F]/40 transition-all shadow-xs group">` |
| 309 | hex | `#E8F7F1` | `<div className="h-11 w-11 rounded-xl bg-[#E8F7F1] text-[#005B4F] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">` |
| 309 | hex | `#005B4F` | `<div className="h-11 w-11 rounded-xl bg-[#E8F7F1] text-[#005B4F] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">` |
| 315 | hex | `#0B1325` | `<h3 className="text-lg font-serif font-bold text-[#0B1325] mb-1.5">` |
| 324 | hex | `#FAF8F5` | `<div className="rounded-2xl p-6 bg-[#FAF8F5] border border-[#D9DEE0] hover:border-[#005B4F]/40 transition-all shadow-xs group">` |
| 324 | hex | `#D9DEE0` | `<div className="rounded-2xl p-6 bg-[#FAF8F5] border border-[#D9DEE0] hover:border-[#005B4F]/40 transition-all shadow-xs group">` |
| 324 | hex | `#005B4F` | `<div className="rounded-2xl p-6 bg-[#FAF8F5] border border-[#D9DEE0] hover:border-[#005B4F]/40 transition-all shadow-xs group">` |
| 325 | hex | `#E8F7F1` | `<div className="h-11 w-11 rounded-xl bg-[#E8F7F1] text-[#005B4F] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">` |
| 325 | hex | `#005B4F` | `<div className="h-11 w-11 rounded-xl bg-[#E8F7F1] text-[#005B4F] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">` |
| 331 | hex | `#0B1325` | `<h3 className="text-lg font-serif font-bold text-[#0B1325] mb-1.5">` |
| 340 | hex | `#FAF8F5` | `<div className="rounded-2xl p-6 bg-[#FAF8F5] border border-[#D9DEE0] hover:border-[#005B4F]/40 transition-all shadow-xs group">` |
| 340 | hex | `#D9DEE0` | `<div className="rounded-2xl p-6 bg-[#FAF8F5] border border-[#D9DEE0] hover:border-[#005B4F]/40 transition-all shadow-xs group">` |
| 340 | hex | `#005B4F` | `<div className="rounded-2xl p-6 bg-[#FAF8F5] border border-[#D9DEE0] hover:border-[#005B4F]/40 transition-all shadow-xs group">` |
| 341 | hex | `#E8F7F1` | `<div className="h-11 w-11 rounded-xl bg-[#E8F7F1] text-[#005B4F] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">` |
| 341 | hex | `#005B4F` | `<div className="h-11 w-11 rounded-xl bg-[#E8F7F1] text-[#005B4F] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">` |
| 347 | hex | `#0B1325` | `<h3 className="text-lg font-serif font-bold text-[#0B1325] mb-1.5">` |
| 356 | hex | `#FAF8F5` | `<div className="rounded-2xl p-6 bg-[#FAF8F5] border border-[#D9DEE0] hover:border-[#005B4F]/40 transition-all shadow-xs group">` |
| 356 | hex | `#D9DEE0` | `<div className="rounded-2xl p-6 bg-[#FAF8F5] border border-[#D9DEE0] hover:border-[#005B4F]/40 transition-all shadow-xs group">` |
| 356 | hex | `#005B4F` | `<div className="rounded-2xl p-6 bg-[#FAF8F5] border border-[#D9DEE0] hover:border-[#005B4F]/40 transition-all shadow-xs group">` |
| 357 | hex | `#E8F7F1` | `<div className="h-11 w-11 rounded-xl bg-[#E8F7F1] text-[#005B4F] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">` |
| 357 | hex | `#005B4F` | `<div className="h-11 w-11 rounded-xl bg-[#E8F7F1] text-[#005B4F] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">` |
| 363 | hex | `#0B1325` | `<h3 className="text-lg font-serif font-bold text-[#0B1325] mb-1.5">` |
| 372 | hex | `#FAF8F5` | `<div className="rounded-2xl p-6 bg-[#FAF8F5] border border-[#D9DEE0] hover:border-[#005B4F]/40 transition-all shadow-xs group">` |
| 372 | hex | `#D9DEE0` | `<div className="rounded-2xl p-6 bg-[#FAF8F5] border border-[#D9DEE0] hover:border-[#005B4F]/40 transition-all shadow-xs group">` |
| 372 | hex | `#005B4F` | `<div className="rounded-2xl p-6 bg-[#FAF8F5] border border-[#D9DEE0] hover:border-[#005B4F]/40 transition-all shadow-xs group">` |
| 373 | hex | `#E8F7F1` | `<div className="h-11 w-11 rounded-xl bg-[#E8F7F1] text-[#005B4F] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">` |
| 373 | hex | `#005B4F` | `<div className="h-11 w-11 rounded-xl bg-[#E8F7F1] text-[#005B4F] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">` |
| 379 | hex | `#0B1325` | `<h3 className="text-lg font-serif font-bold text-[#0B1325] mb-1.5">` |
| 388 | hex | `#FAF8F5` | `<div className="rounded-2xl p-6 bg-[#FAF8F5] border border-[#D9DEE0] hover:border-[#005B4F]/40 transition-all shadow-xs group">` |
| 388 | hex | `#D9DEE0` | `<div className="rounded-2xl p-6 bg-[#FAF8F5] border border-[#D9DEE0] hover:border-[#005B4F]/40 transition-all shadow-xs group">` |
| 388 | hex | `#005B4F` | `<div className="rounded-2xl p-6 bg-[#FAF8F5] border border-[#D9DEE0] hover:border-[#005B4F]/40 transition-all shadow-xs group">` |
| 389 | hex | `#E8F7F1` | `<div className="h-11 w-11 rounded-xl bg-[#E8F7F1] text-[#005B4F] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">` |
| 389 | hex | `#005B4F` | `<div className="h-11 w-11 rounded-xl bg-[#E8F7F1] text-[#005B4F] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">` |
| 395 | hex | `#0B1325` | `<h3 className="text-lg font-serif font-bold text-[#0B1325] mb-1.5">` |
| 409 | hex | `#005B4F` | `<span className="font-mono text-xs font-bold text-[#005B4F] uppercase tracking-widest bg-[#E8F7F1] px-3 py-1 rounded-full">` |
| 409 | hex | `#E8F7F1` | `<span className="font-mono text-xs font-bold text-[#005B4F] uppercase tracking-widest bg-[#E8F7F1] px-3 py-1 rounded-full">` |
| 412 | hex | `#0B1325` | `<h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B1325] mt-3">` |
| 422 | hex | `#D9DEE0` | `<div className="rounded-2xl p-5 bg-white card-light border border-[#D9DEE0] shadow-xs relative flex flex-col justify-between">` |
| 424 | hex | `#005B4F` | `<div className="h-9 w-9 rounded-xl bg-[#005B4F] text-white flex items-center justify-center font-mono font-bold text-xs mb-3">` |
| 427 | hex | `#0B1325` | `<h4 className="font-serif font-bold text-base text-[#0B1325] mb-1">` |
| 434 | hex | `#005B4F` | `<span className="text-[10px] font-mono text-[#005B4F] font-bold uppercase tracking-wider mt-4">` |
| 440 | hex | `#D9DEE0` | `<div className="rounded-2xl p-5 bg-white card-light border border-[#D9DEE0] shadow-xs relative flex flex-col justify-between">` |
| 442 | hex | `#005B4F` | `<div className="h-9 w-9 rounded-xl bg-[#005B4F] text-white flex items-center justify-center font-mono font-bold text-xs mb-3">` |
| 445 | hex | `#0B1325` | `<h4 className="font-serif font-bold text-base text-[#0B1325] mb-1">` |
| 452 | hex | `#005B4F` | `<span className="text-[10px] font-mono text-[#005B4F] font-bold uppercase tracking-wider mt-4">` |
| 458 | hex | `#D9DEE0` | `<div className="rounded-2xl p-5 bg-white card-light border border-[#D9DEE0] shadow-xs relative flex flex-col justify-between">` |
| 460 | hex | `#005B4F` | `<div className="h-9 w-9 rounded-xl bg-[#005B4F] text-white flex items-center justify-center font-mono font-bold text-xs mb-3">` |
| 463 | hex | `#0B1325` | `<h4 className="font-serif font-bold text-base text-[#0B1325] mb-1">` |
| 470 | hex | `#005B4F` | `<span className="text-[10px] font-mono text-[#005B4F] font-bold uppercase tracking-wider mt-4">` |
| 476 | hex | `#D9DEE0` | `<div className="rounded-2xl p-5 bg-white card-light border border-[#D9DEE0] shadow-xs relative flex flex-col justify-between">` |
| 478 | hex | `#005B4F` | `<div className="h-9 w-9 rounded-xl bg-[#005B4F] text-white flex items-center justify-center font-mono font-bold text-xs mb-3">` |
| 481 | hex | `#0B1325` | `<h4 className="font-serif font-bold text-base text-[#0B1325] mb-1">` |
| 488 | hex | `#005B4F` | `<span className="text-[10px] font-mono text-[#005B4F] font-bold uppercase tracking-wider mt-4">` |
| 494 | hex | `#D9DEE0` | `<div className="rounded-2xl p-5 bg-white card-light border border-[#D9DEE0] shadow-xs relative flex flex-col justify-between bg-gradient-to-b from-white to-[#E8F7F1]/30">` |
| 494 | hex | `#E8F7F1` | `<div className="rounded-2xl p-5 bg-white card-light border border-[#D9DEE0] shadow-xs relative flex flex-col justify-between bg-gradient-to-b from-white to-[#E8F7F1]/30">` |
| 496 | hex | `#005B4F` | `<div className="h-9 w-9 rounded-xl bg-[#005B4F] text-white flex items-center justify-center font-mono font-bold text-xs mb-3">` |
| 499 | hex | `#0B1325` | `<h4 className="font-serif font-bold text-base text-[#0B1325] mb-1">` |
| 506 | hex | `#005B4F` | `<span className="text-[10px] font-mono text-[#005B4F] font-bold uppercase tracking-wider mt-4">` |
| 514 | hex | `#FAF8F5` | `<section className="py-16 bg-[#FAF8F5] border-t border-[#E5E7EB]">` |
| 514 | hex | `#E5E7EB` | `<section className="py-16 bg-[#FAF8F5] border-t border-[#E5E7EB]">` |
| 520 | hex | `#005B4F` | `<span className="font-mono text-xs font-bold text-[#005B4F] uppercase tracking-widest bg-[#E8F7F1] px-3 py-1 rounded-full">` |
| 520 | hex | `#E8F7F1` | `<span className="font-mono text-xs font-bold text-[#005B4F] uppercase tracking-widest bg-[#E8F7F1] px-3 py-1 rounded-full">` |
| 523 | hex | `#0B1325` | `<h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B1325] mt-3">` |
| 530 | hex | `#005B4F` | `<div className="h-6 w-6 rounded-full bg-emerald-100 text-[#005B4F] flex items-center justify-center shrink-0 mt-0.5">` |
| 542 | hex | `#005B4F` | `<div className="h-6 w-6 rounded-full bg-emerald-100 text-[#005B4F] flex items-center justify-center shrink-0 mt-0.5">` |
| 554 | hex | `#005B4F` | `<div className="h-6 w-6 rounded-full bg-emerald-100 text-[#005B4F] flex items-center justify-center shrink-0 mt-0.5">` |
| 570 | hex | `#D9DEE0` | `<div className="rounded-2xl p-6 bg-white card-light border border-[#D9DEE0] shadow-xs space-y-4">` |
| 597 | hex | `#E8F7F1` | `<div className="rounded-2xl p-6 bg-[#E8F7F1]/60 border border-[#005B4F]/20 flex items-start gap-4">` |
| 597 | hex | `#005B4F` | `<div className="rounded-2xl p-6 bg-[#E8F7F1]/60 border border-[#005B4F]/20 flex items-start gap-4">` |
| 598 | hex | `#005B4F` | `<div className="h-10 w-10 rounded-xl bg-[#005B4F] text-white flex items-center justify-center shrink-0">` |
| 602 | hex | `#005B4F` | `<h4 className="text-sm font-bold text-[#005B4F]">` |
| 617 | hex | `#005B4F` | `<div className="rounded-3xl bg-[#005B4F] p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">` |
| 643 | hex | `#005B4F` | `color: #005B4F !important;` |
| 644 | hex | `#005B4F` | `-webkit-text-fill-color: #005B4F !important;` |
| 654 | hex | `#005B4F` | `<ArrowRight className="h-4 w-4 text-[#005B4F] group-hover:translate-x-1 transition-transform" />` |
| 663 | hex | `#005B4F` | `<ArrowRight className="h-4 w-4 text-[#005B4F] group-hover:translate-x-1 transition-transform" />` |
| 676 | hex | `#005B4F` | `<ShieldCheck className="h-5 w-5 text-[#005B4F]" />` |
| 682 | hex | `#005B4F` | `<Link to="/acri" className="hover:text-[#005B4F]">` |
| 685 | hex | `#005B4F` | `<Link to="/courses" className="hover:text-[#005B4F]">` |
| 688 | hex | `#005B4F` | `<Link to="/verify" className="hover:text-[#005B4F]">` |
| 691 | hex | `#005B4F` | `<Link to="/contact" className="hover:text-[#005B4F]">` |

### `src\components\acri\assessment\AcriCareerIntelligenceReport.tsx` - 106

| Line | Kind | Value | Context |
|---:|---|---|---|
| 246 | hex | `#059669` | `radarStroke: "#059669",` |
| 268 | hex | `#0284C7` | `radarStroke: "#0284C7",` |
| 278 | hex | `#475569` | `radarStroke: "#475569",` |
| 422 | hex | `#060B18` | `backgroundColor: "#060B18",` |
| 464 | hex | `#060B18` | `backgroundColor: "#060B18",` |
| 511 | hex | `#059669` | `stroke = isIndustryReady ? "#059669" : isNearReady ? "#D97706" : "#475569";` |
| 511 | hex | `#475569` | `stroke = isIndustryReady ? "#059669" : isNearReady ? "#D97706" : "#475569";` |
| 514 | hex | `#94A3B8` | `stroke = "#94A3B8";` |
| 528 | hex | `#F7F8F5` | `<div className="min-h-screen bg-[#F7F8F5] text-[#0B1325] antialiased selection:bg-[#E8F7F1] selection:text-[#005B4F] pb-24 sm:pb-16">` |
| 528 | hex | `#0B1325` | `<div className="min-h-screen bg-[#F7F8F5] text-[#0B1325] antialiased selection:bg-[#E8F7F1] selection:text-[#005B4F] pb-24 sm:pb-16">` |
| 528 | hex | `#E8F7F1` | `<div className="min-h-screen bg-[#F7F8F5] text-[#0B1325] antialiased selection:bg-[#E8F7F1] selection:text-[#005B4F] pb-24 sm:pb-16">` |
| 528 | hex | `#005B4F` | `<div className="min-h-screen bg-[#F7F8F5] text-[#0B1325] antialiased selection:bg-[#E8F7F1] selection:text-[#005B4F] pb-24 sm:pb-16">` |
| 530 | hex | `#FAF8F5` | `<header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200 shadow-2xs">` |
| 538 | hex | `#005B4F` | `<span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#005B4F]">` |
| 564 | hex | `#005B4F` | `<ShieldCheck className="h-3.5 w-3.5 text-[#005B4F]" />` |
| 582 | hex | `#0B1325` | `className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0B1325] hover:bg-[#1B3F8B] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg shadow-xs transit` |
| 582 | hex | `#1B3F8B` | `className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0B1325] hover:bg-[#1B3F8B] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg shadow-xs transit` |
| 595 | hex | `#FAF9F6` | `className="rounded-3xl border border-stone-300 bg-[#FAF9F6] tone-light card-light shadow-xl relative overflow-hidden"` |
| 598 | hex | `#060B18` | `<div className="px-6 py-3.5 bg-[#060B18] text-white flex flex-wrap items-center justify-between gap-3 text-[10px] sm:text-[11px] font-mono border-b border-stone-800">` |
| 605 | hex | `#C5A572` | `<span className="text-[#C5A572] font-semibold">OFFICIAL OCCUPATIONAL DOSSIER</span>` |
| 619 | hex | `#005B4F` | `<span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#005B4F] bg-[#E8F7F1] px-2.5 py-0.5 rounded-full border border-[#005B4F]/20">` |
| 619 | hex | `#E8F7F1` | `<span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#005B4F] bg-[#E8F7F1] px-2.5 py-0.5 rounded-full border border-[#005B4F]/20">` |
| 619 | hex | `#005B4F` | `<span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#005B4F] bg-[#E8F7F1] px-2.5 py-0.5 rounded-full border border-[#005B4F]/20">` |
| 626 | hex | `#0B1325` | `<div className="text-2xl sm:text-3xl font-serif font-bold text-[#0B1325]">` |
| 643 | hex | `#0B1325` | `<span className="text-sm font-sans font-bold text-[#0B1325] text-right">` |
| 668 | hex | `#059669` | `<stop offset="0%" stopColor="#059669" />` |
| 669 | hex | `#10B981` | `<stop offset="70%" stopColor="#10B981" />` |
| 679 | hex | `#475569` | `<stop offset="0%" stopColor="#475569" />` |
| 680 | hex | `#6366F1` | `<stop offset="100%" stopColor="#6366F1" />` |
| 756 | hex | `#0B1325` | `stroke="#0B1325"` |
| 764 | hex | `#0B1325` | `<span className="text-5xl sm:text-6xl font-serif font-black text-[#0B1325] tracking-tight">` |
| 780 | hex | `#C5A572` | `<span className="h-2 w-2 rounded-full bg-[#C5A572]" />` |
| 801 | hex | `#0B1325` | `<h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B1325] tracking-tight">` |
| 856 | hex | `#C5A572` | `className="absolute top-0 bottom-0 w-0.5 bg-[#C5A572] z-10"` |
| 864 | hex | `#C5A572` | `<span className="text-[#C5A572] font-bold">Autonomy Gate: 80/100</span>` |
| 876 | hex | `#0B1325` | `className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-poi` |
| 876 | hex | `#1B3F8B` | `className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-poi` |
| 887 | hex | `#005B4F` | `<ShieldCheck className="h-4 w-4 text-[#005B4F]" />` |
| 909 | hex | `#005B4F` | `<span className="font-mono text-xs font-bold text-[#005B4F] uppercase tracking-wider">` |
| 912 | hex | `#0B1325` | `<h2 className="text-2xl font-serif font-bold text-[#0B1325] mt-1">` |
| 927 | hex | `#FAF8F5` | `score < 60 ? "bg-rose-50/70 border-rose-300 ring-2 ring-rose-500/20" : "bg-[#FAF8F5] border-stone-200"` |
| 940 | hex | `#FAF8F5` | `isNearReady ? "bg-amber-50/70 border-amber-300 ring-2 ring-amber-500/20" : "bg-[#FAF8F5] border-stone-200"` |
| 959 | hex | `#FAF8F5` | `isIndustryReady ? "bg-emerald-50/70 border-emerald-300 ring-2 ring-emerald-500/20" : "bg-[#FAF8F5] border-stone-200"` |
| 995 | hex | `#005B4F` | `<div className="h-5 w-5 rounded-full bg-white tone-light border-3 border-[#005B4F] shadow-md flex items-center justify-center" />` |
| 996 | hex | `#005B4F` | `<span className="text-[11px] font-mono font-black text-white bg-[#005B4F] px-1.5 py-0.5 rounded shadow-xs mt-1">` |
| 1008 | hex | `#005B4F` | `<span className="font-mono text-xs font-bold text-[#005B4F] uppercase tracking-wider">` |
| 1011 | hex | `#0B1325` | `<h2 className="text-2xl font-serif font-bold text-[#0B1325]">` |
| 1031 | hex | `#0B1325` | `<h3 className="text-lg font-serif font-bold text-[#0B1325]">` |
| 1048 | hex | `#005B4F` | `className="w-full py-2 px-3 text-xs font-semibold text-[#005B4F] hover:bg-[#E8F7F1]/50 rounded-lg flex items-center justify-between cursor-pointer border-t border-stone-100 transit` |
| 1048 | hex | `#E8F7F1` | `className="w-full py-2 px-3 text-xs font-semibold text-[#005B4F] hover:bg-[#E8F7F1]/50 rounded-lg flex items-center justify-between cursor-pointer border-t border-stone-100 transit` |
| 1062 | hex | `#005B4F` | `<Activity className="h-4 w-4 text-[#005B4F]" />` |
| 1065 | hex | `#0B1325` | `<h3 className="text-lg font-serif font-bold text-[#0B1325]">` |
| 1068 | hex | `#005B4F` | `<div className="flex items-baseline gap-1 mt-1 text-[#005B4F] font-serif font-black text-2xl">` |
| 1082 | hex | `#005B4F` | `className="w-full py-2 px-3 text-xs font-semibold text-[#005B4F] hover:bg-[#E8F7F1]/50 rounded-lg flex items-center justify-between cursor-pointer border-t border-stone-100 transit` |
| 1082 | hex | `#E8F7F1` | `className="w-full py-2 px-3 text-xs font-semibold text-[#005B4F] hover:bg-[#E8F7F1]/50 rounded-lg flex items-center justify-between cursor-pointer border-t border-stone-100 transit` |
| 1099 | hex | `#0B1325` | `<h3 className="text-lg font-serif font-bold text-[#0B1325]">` |
| 1129 | hex | `#005B4F` | `<span className="font-mono text-xs font-bold text-[#005B4F] uppercase tracking-wider">` |
| 1132 | hex | `#0B1325` | `<h2 className="text-2xl font-serif font-bold text-[#0B1325] mt-1">` |
| 1170 | hex | `#FAF8F5` | `className={`md:col-span-5 flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 ${` |
| 1176 | hex | `#005B4F` | `<span className="text-[#005B4F] font-bold">9 DIMENSIONS</span>` |
| 1215 | hex | `#E8F7F1` | `? "bg-[#E8F7F1] border-[#005B4F]/40 shadow-xs"` |
| 1215 | hex | `#005B4F` | `? "bg-[#E8F7F1] border-[#005B4F]/40 shadow-xs"` |
| 1230 | hex | `#0B1325` | `<div className="text-xs font-bold text-[#0B1325] truncate">` |
| 1240 | hex | `#0B1325` | `<span className="font-mono text-xs font-black text-[#0B1325]">` |
| 1264 | hex | `#005B4F` | `<span className="font-semibold text-[#005B4F] text-xs">` |
| 1275 | hex | `#005B4F` | `<span className="font-mono text-xs font-bold text-[#005B4F] uppercase tracking-wider">` |
| 1278 | hex | `#0B1325` | `<h2 className="text-2xl font-serif font-bold text-[#0B1325] mt-1">` |
| 1288 | hex | `#FAF8F5` | `<div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 space-y-3">` |
| 1290 | hex | `#005B4F` | `<Sparkles className="h-4 w-4 text-[#005B4F]" />` |
| 1305 | hex | `#FAF8F5` | `<div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 space-y-4">` |
| 1315 | hex | `#005B4F` | `<div className="w-full h-full bg-[#005B4F]" />` |
| 1325 | hex | `#005B4F` | `<div className="w-[92%] h-full bg-[#005B4F]" />` |
| 1335 | hex | `#005B4F` | `<div className="w-[95%] h-full bg-[#005B4F]" />` |
| 1353 | hex | `#005B4F` | `<span className="font-mono text-xs font-bold text-[#005B4F] uppercase tracking-wider">` |
| 1356 | hex | `#0B1325` | `<h2 className="text-2xl font-serif font-bold text-[#0B1325] mt-1">` |
| 1366 | hex | `#FAF8F5` | `<div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200 flex flex-col justify-between space-y-4">` |
| 1374 | hex | `#0B1325` | `<h3 className="text-base font-serif font-bold text-[#0B1325]">` |
| 1381 | hex | `#005B4F` | `<span className="text-[11px] font-mono font-bold text-[#005B4F]">` |
| 1387 | hex | `#FAF8F5` | `<div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200 flex flex-col justify-between space-y-4">` |
| 1395 | hex | `#0B1325` | `<h3 className="text-base font-serif font-bold text-[#0B1325]">` |
| 1402 | hex | `#005B4F` | `<span className="text-[11px] font-mono font-bold text-[#005B4F]">` |
| 1408 | hex | `#FAF8F5` | `<div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200 flex flex-col justify-between space-y-4">` |
| 1416 | hex | `#0B1325` | `<h3 className="text-base font-serif font-bold text-[#0B1325]">` |
| 1423 | hex | `#005B4F` | `<span className="text-[11px] font-mono font-bold text-[#005B4F]">` |
| 1436 | hex | `#005B4F` | `className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-white text-xs font-bold tracking-wide transition` |
| 1436 | hex | `#00473E` | `className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-white text-xs font-bold tracking-wide transition` |
| 1447 | hex | `#005B4F` | `<span className="font-mono text-xs font-bold text-[#005B4F] uppercase tracking-wider">` |
| 1450 | hex | `#0B1325` | `<h2 className="text-2xl font-serif font-bold text-[#0B1325] mt-1">` |
| 1505 | hex | `#005B4F` | `<span className="font-mono text-xs font-bold text-[#005B4F] uppercase tracking-wider">` |
| 1508 | hex | `#0B1325` | `<h2 className="text-2xl font-serif font-bold text-[#0B1325] mt-1">` |
| 1531 | hex | `#FAF9F6` | `<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#FAF9F6] border border-stone-200">` |
| 1533 | hex | `#005B4F` | `<span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#005B4F] flex items-center gap-1.5">` |
| 1547 | hex | `#0B1325` | `className="px-4 py-2.5 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 transition-all shad` |
| 1547 | hex | `#1B3F8B` | `className="px-4 py-2.5 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 transition-all shad` |
| 1567 | hex | `#005B4F` | `<ShieldCheck className="h-3.5 w-3.5 text-[#005B4F]" />` |
| 1580 | hex | `#005B4F` | `<span className="font-mono text-xs font-bold text-[#005B4F] uppercase tracking-wider">` |
| 1583 | hex | `#0B1325` | `<h2 className="text-2xl font-serif font-bold text-[#0B1325] mt-1">` |
| 1596 | hex | `#0A66C2` | `className="py-3 px-4 rounded-xl bg-[#0A66C2] hover:bg-[#084e96] text-white font-sans text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-2xs cursor-po` |
| 1596 | hex | `#084e96` | `className="py-3 px-4 rounded-xl bg-[#0A66C2] hover:bg-[#084e96] text-white font-sans text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-2xs cursor-po` |
| 1606 | hex | `#25D366` | `className="py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1fb858] text-white font-sans text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-2xs cursor-po` |
| 1606 | hex | `#1fb858` | `className="py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1fb858] text-white font-sans text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-2xs cursor-po` |
| 1634 | hex | `#FAF8F5` | `className="py-3 px-4 rounded-xl bg-[#FAF8F5] hover:bg-stone-100 border border-stone-200 text-stone-800 font-sans text-xs font-semibold flex items-center justify-center gap-2 transi` |
| 1647 | hex | `#005B4F` | `<div className="h-8 w-8 rounded-full bg-[#005B4F] text-white font-serif font-black text-xs flex items-center justify-center shrink-0">` |
| 1654 | hex | `#0B1325` | `<div className="text-xs font-bold text-[#0B1325] truncate">` |
| 1664 | hex | `#25D366` | `className="p-2 rounded-lg bg-[#25D366] text-white"` |
| 1672 | hex | `#005B4F` | `className="px-3 py-1.5 rounded-lg bg-[#005B4F] text-white text-xs font-bold"` |

### `src\routes\enrol.index.tsx` - 97

| Line | Kind | Value | Context |
|---:|---|---|---|
| 61 | hex | `#334155` | `accent: "text-[#334155]",` |
| 62 | hex | `#F1F5F9` | `soft: "bg-[#F1F5F9]",` |
| 63 | hex | `#CBD5E1` | `border: "border-[#CBD5E1]",` |
| 64 | hex | `#071A4A` | `button: "bg-[#071A4A] hover:bg-[#0F438B]",` |
| 64 | hex | `#0F438B` | `button: "bg-[#071A4A] hover:bg-[#0F438B]",` |
| 79 | hex | `#1557B0` | `accent: "text-[#1557B0]",` |
| 80 | hex | `#EFF6FF` | `soft: "bg-[#EFF6FF]",` |
| 81 | hex | `#93C5FD` | `border: "border-[#93C5FD]",` |
| 82 | hex | `#1557B0` | `button: "bg-[#1557B0] hover:bg-[#0F438B]",` |
| 82 | hex | `#0F438B` | `button: "bg-[#1557B0] hover:bg-[#0F438B]",` |
| 97 | hex | `#047857` | `accent: "text-[#047857]",` |
| 98 | hex | `#ECFDF5` | `soft: "bg-[#ECFDF5]",` |
| 99 | hex | `#86EFAC` | `border: "border-[#86EFAC]",` |
| 100 | hex | `#047857` | `button: "bg-[#047857] hover:bg-[#065F46]",` |
| 100 | hex | `#065F46` | `button: "bg-[#047857] hover:bg-[#065F46]",` |
| 131 | hex | `#F7F9FC` | `<div className="enrol-page tone-light arzon-page-surface min-h-screen bg-[#F7F9FC] text-[#071A4A] antialiased">` |
| 131 | hex | `#071A4A` | `<div className="enrol-page tone-light arzon-page-surface min-h-screen bg-[#F7F9FC] text-[#071A4A] antialiased">` |
| 141 | hex | `#071A4A` | `className="mt-6 font-serif text-4xl font-bold leading-[1.05] tracking-tight text-[#071A4A] sm:text-5xl lg:text-6xl"` |
| 142 | hex | `#071A4A` | `style={{ color: "#071A4A" }}` |
| 148 | hex | `#475569` | `className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#475569] sm:text-lg"` |
| 149 | hex | `#475569` | `style={{ color: "#475569" }}` |
| 172 | hex | `#071A4A` | `? "inline-flex min-h-10 items-center rounded-full bg-[#071A4A] px-4 text-xs font-bold text-white shadow-sm"` |
| 173 | hex | `#CBD5E1` | `: "inline-flex min-h-10 items-center rounded-full border border-[#CBD5E1] bg-white px-4 text-xs font-bold text-[#334155] hover:border-[#94A3B8] hover:bg-[#F8FAFC]"` |
| 173 | hex | `#334155` | `: "inline-flex min-h-10 items-center rounded-full border border-[#CBD5E1] bg-white px-4 text-xs font-bold text-[#334155] hover:border-[#94A3B8] hover:bg-[#F8FAFC]"` |
| 173 | hex | `#94A3B8` | `: "inline-flex min-h-10 items-center rounded-full border border-[#CBD5E1] bg-white px-4 text-xs font-bold text-[#334155] hover:border-[#94A3B8] hover:bg-[#F8FAFC]"` |
| 173 | hex | `#F8FAFC` | `: "inline-flex min-h-10 items-center rounded-full border border-[#CBD5E1] bg-white px-4 text-xs font-bold text-[#334155] hover:border-[#94A3B8] hover:bg-[#F8FAFC]"` |
| 176 | hex | `#071A4A` | `backgroundColor: active ? "#071A4A" : "#FFFFFF",` |
| 177 | hex | `#334155` | `color: active ? "#FFFFFF" : "#334155",` |
| 178 | hex | `#071A4A` | `borderColor: active ? "#071A4A" : "#CBD5E1",` |
| 227 | hex | `#071A4A` | `className="mt-5 min-h-[3.5rem] font-serif text-2xl font-bold leading-tight text-[#071A4A]"` |
| 228 | hex | `#071A4A` | `style={{ color: "#071A4A" }}` |
| 234 | hex | `#475569` | `className="mt-3 min-h-[5.25rem] text-sm leading-6 text-[#475569]"` |
| 235 | hex | `#475569` | `style={{ color: "#475569" }}` |
| 242 | hex | `#D9E2EC` | `<div className="rounded-2xl border border-[#D9E2EC] bg-[#F8FAFC] p-5">` |
| 242 | hex | `#F8FAFC` | `<div className="rounded-2xl border border-[#D9E2EC] bg-[#F8FAFC] p-5">` |
| 243 | hex | `#64748B` | `<p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#64748B]" style={{ color: "#64748B" }}>` |
| 243 | hex | `#64748B` | `<p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#64748B]" style={{ color: "#64748B" }}>` |
| 247 | hex | `#071A4A` | `className="mt-2 font-serif text-4xl font-bold tracking-tight text-[#071A4A]"` |
| 248 | hex | `#071A4A` | `style={{ color: "#071A4A" }}` |
| 252 | hex | `#64748B` | `<p className="mt-1 text-xs font-medium text-[#64748B]" style={{ color: "#64748B" }}>` |
| 252 | hex | `#64748B` | `<p className="mt-1 text-xs font-medium text-[#64748B]" style={{ color: "#64748B" }}>` |
| 258 | hex | `#64748B` | `<p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#64748B]" style={{ color: "#64748B" }}>` |
| 258 | hex | `#64748B` | `<p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#64748B]" style={{ color: "#64748B" }}>` |
| 267 | hex | `#334155` | `<span className="text-sm font-medium leading-5 text-[#334155]" style={{ color: "#334155" }}>` |
| 267 | hex | `#334155` | `<span className="text-sm font-medium leading-5 text-[#334155]" style={{ color: "#334155" }}>` |
| 280 | hex | `#2563EB` | `className={`flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold text-white shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ri` |
| 294 | hex | `#D9E2EC` | `<section className="mt-10 rounded-[24px] border border-[#D9E2EC] bg-white p-5 shadow-sm sm:p-7" style={{ backgroundColor: "#FFFFFF" }}>` |
| 297 | hex | `#64748B` | `<p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#64748B]" style={{ color: "#64748B" }}>` |
| 297 | hex | `#64748B` | `<p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#64748B]" style={{ color: "#64748B" }}>` |
| 300 | hex | `#071A4A` | `<h2 className="mt-2 font-serif text-2xl font-bold text-[#071A4A]" style={{ color: "#071A4A" }}>` |
| 300 | hex | `#071A4A` | `<h2 className="mt-2 font-serif text-2xl font-bold text-[#071A4A]" style={{ color: "#071A4A" }}>` |
| 303 | hex | `#475569` | `<p className="mt-2 max-w-2xl text-sm leading-6 text-[#475569]" style={{ color: "#475569" }}>` |
| 303 | hex | `#475569` | `<p className="mt-2 max-w-2xl text-sm leading-6 text-[#475569]" style={{ color: "#475569" }}>` |
| 312 | hex | `#CBD5E1` | `className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-5 text-sm font-bold text-[#071A4A] hover:bg-[#F8FAFC]"` |
| 312 | hex | `#071A4A` | `className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-5 text-sm font-bold text-[#071A4A] hover:bg-[#F8FAFC]"` |
| 312 | hex | `#F8FAFC` | `className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-5 text-sm font-bold text-[#071A4A] hover:bg-[#F8FAFC]"` |
| 313 | hex | `#071A4A` | `style={{ color: "#071A4A", backgroundColor: "#FFFFFF" }}` |
| 325 | hex | `#E2E8F0` | `<div className="mt-7 overflow-x-auto rounded-2xl border border-[#E2E8F0]" style={{ backgroundColor: "#FFFFFF" }}>` |
| 328 | hex | `#F8FAFC` | `<tr className="bg-[#F8FAFC]">` |
| 329 | hex | `#64748B` | `<th className="px-4 py-4 text-xs font-extrabold uppercase tracking-wider text-[#64748B]">` |
| 332 | hex | `#334155` | `<th className="px-4 py-4 text-sm font-bold text-[#334155]">Essential</th>` |
| 333 | hex | `#1557B0` | `<th className="px-4 py-4 text-sm font-bold text-[#1557B0]">Recruiter Track</th>` |
| 334 | hex | `#047857` | `<th className="px-4 py-4 text-sm font-bold text-[#047857]">Elite One-on-One</th>` |
| 339 | hex | `#E2E8F0` | `<tr key={feature} className="border-t border-[#E2E8F0]">` |
| 340 | hex | `#334155` | `<td className="px-4 py-4 text-sm font-semibold text-[#334155]" style={{ color: "#334155" }}>{feature}</td>` |
| 340 | hex | `#334155` | `<td className="px-4 py-4 text-sm font-semibold text-[#334155]" style={{ color: "#334155" }}>{feature}</td>` |
| 341 | hex | `#475569` | `<td className="px-4 py-4 text-sm text-[#475569]" style={{ color: "#475569" }}>{essential}</td>` |
| 341 | hex | `#475569` | `<td className="px-4 py-4 text-sm text-[#475569]" style={{ color: "#475569" }}>{essential}</td>` |
| 342 | hex | `#1557B0` | `<td className="px-4 py-4 text-sm font-semibold text-[#1557B0]" style={{ color: "#1557B0" }}>{career}</td>` |
| 342 | hex | `#1557B0` | `<td className="px-4 py-4 text-sm font-semibold text-[#1557B0]" style={{ color: "#1557B0" }}>{career}</td>` |
| 343 | hex | `#047857` | `<td className="px-4 py-4 text-sm font-semibold text-[#047857]" style={{ color: "#047857" }}>{elite}</td>` |
| 343 | hex | `#047857` | `<td className="px-4 py-4 text-sm font-semibold text-[#047857]" style={{ color: "#047857" }}>{elite}</td>` |
| 353 | hex | `#D9E2EC` | `<div className="rounded-2xl border border-[#D9E2EC] bg-white p-5" style={{ backgroundColor: "#FFFFFF" }}>` |
| 354 | hex | `#1557B0` | `<ShieldCheck className="h-5 w-5 text-[#1557B0]" />` |
| 355 | hex | `#071A4A` | `<h3 className="mt-3 text-sm font-bold text-[#071A4A]" style={{ color: "#071A4A" }}>Clear pricing</h3>` |
| 355 | hex | `#071A4A` | `<h3 className="mt-3 text-sm font-bold text-[#071A4A]" style={{ color: "#071A4A" }}>Clear pricing</h3>` |
| 356 | hex | `#64748B` | `<p className="mt-1 text-xs leading-5 text-[#64748B]" style={{ color: "#64748B" }}>` |
| 356 | hex | `#64748B` | `<p className="mt-1 text-xs leading-5 text-[#64748B]" style={{ color: "#64748B" }}>` |
| 360 | hex | `#D9E2EC` | `<div className="rounded-2xl border border-[#D9E2EC] bg-white p-5" style={{ backgroundColor: "#FFFFFF" }}>` |
| 361 | hex | `#1557B0` | `<BookOpen className="h-5 w-5 text-[#1557B0]" />` |
| 362 | hex | `#071A4A` | `<h3 className="mt-3 text-sm font-bold text-[#071A4A]" style={{ color: "#071A4A" }}>Role-focused learning</h3>` |
| 362 | hex | `#071A4A` | `<h3 className="mt-3 text-sm font-bold text-[#071A4A]" style={{ color: "#071A4A" }}>Role-focused learning</h3>` |
| 363 | hex | `#64748B` | `<p className="mt-1 text-xs leading-5 text-[#64748B]" style={{ color: "#64748B" }}>` |
| 363 | hex | `#64748B` | `<p className="mt-1 text-xs leading-5 text-[#64748B]" style={{ color: "#64748B" }}>` |
| 367 | hex | `#D9E2EC` | `<div className="rounded-2xl border border-[#D9E2EC] bg-white p-5" style={{ backgroundColor: "#FFFFFF" }}>` |
| 368 | hex | `#047857` | `<Users className="h-5 w-5 text-[#047857]" />` |
| 369 | hex | `#071A4A` | `<h3 className="mt-3 text-sm font-bold text-[#071A4A]" style={{ color: "#071A4A" }}>Human support</h3>` |
| 369 | hex | `#071A4A` | `<h3 className="mt-3 text-sm font-bold text-[#071A4A]" style={{ color: "#071A4A" }}>Human support</h3>` |
| 370 | hex | `#64748B` | `<p className="mt-1 text-xs leading-5 text-[#64748B]" style={{ color: "#64748B" }}>` |
| 370 | hex | `#64748B` | `<p className="mt-1 text-xs leading-5 text-[#64748B]" style={{ color: "#64748B" }}>` |
| 376 | hex | `#071A4A` | `<section className="mt-8 rounded-[24px] bg-[#071A4A] p-6 text-white shadow-lg sm:p-8" style={{ backgroundColor: "#071A4A" }}>` |
| 376 | hex | `#071A4A` | `<section className="mt-8 rounded-[24px] bg-[#071A4A] p-6 text-white shadow-lg sm:p-8" style={{ backgroundColor: "#071A4A" }}>` |
| 379 | hex | `#93C5FD` | `<p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#93C5FD]">` |
| 385 | hex | `#CBD5E1` | `<p className="mt-2 max-w-2xl text-sm leading-6 text-[#CBD5E1]">` |
| 393 | hex | `#071A4A` | `className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-bold text-[#071A4A] hover:bg-[#EFF6FF] focus:outline-none focus:rin` |
| 393 | hex | `#EFF6FF` | `className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-bold text-[#071A4A] hover:bg-[#EFF6FF] focus:outline-none focus:rin` |
| 393 | hex | `#071A4A` | `className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-bold text-[#071A4A] hover:bg-[#EFF6FF] focus:outline-none focus:rin` |

### `src\components\home\HomeAssessmentComparison.tsx` - 75

| Line | Kind | Value | Context |
|---:|---|---|---|
| 18 | hex | `#F8FAFC` | `<section id="assessments" className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-[#E2E8F0] tone-light card-light">` |
| 18 | hex | `#E2E8F0` | `<section id="assessments" className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-[#E2E8F0] tone-light card-light">` |
| 22 | hex | `#D0E1FD` | `<div className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-3.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#2563EB]` |
| 22 | hex | `#EEF6FF` | `<div className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-3.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#2563EB]` |
| 22 | hex | `#2563EB` | `<div className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-3.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#2563EB]` |
| 23 | hex | `#2563EB` | `<Sparkles className="h-3 w-3 text-[#2563EB]" />` |
| 27 | hex | `#081F38` | `<h2 className="text-3xl sm:text-5xl lg:text-[46px] font-serif font-bold text-[#081F38] tracking-tight leading-[1.12]">` |
| 29 | hex | `#2563EB` | `<span className="text-[#2563EB]">One clear path to placement.</span>` |
| 32 | hex | `#64748B` | `<p className="mt-3.5 text-sm sm:text-base text-[#64748B] max-w-2xl mx-auto leading-relaxed">` |
| 37 | hex | `#E2E8F0` | `<div className="mt-6 inline-flex items-center gap-3 rounded-full bg-white border border-[#E2E8F0] px-4 py-1.5 shadow-2xs text-[11px] font-mono font-bold text-[#64748B] tone-light c` |
| 37 | hex | `#64748B` | `<div className="mt-6 inline-flex items-center gap-3 rounded-full bg-white border border-[#E2E8F0] px-4 py-1.5 shadow-2xs text-[11px] font-mono font-bold text-[#64748B] tone-light c` |
| 38 | hex | `#2563EB` | `<span className="flex items-center gap-1.5 text-[#2563EB]">` |
| 39 | hex | `#2563EB` | `<span className="grid h-4 w-4 place-items-center rounded-full bg-[#2563EB] text-[9px] text-white">1</span>` |
| 42 | hex | `#94A3B8` | `<span className="text-[#94A3B8]">──►</span>` |
| 55 | hex | `#E2E8F0` | `<article className="flex flex-col justify-between rounded-3xl border border-[#E2E8F0] bg-white p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-[#2563EB]/40 transition-all duratio` |
| 55 | hex | `#2563EB` | `<article className="flex flex-col justify-between rounded-3xl border border-[#E2E8F0] bg-white p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-[#2563EB]/40 transition-all duratio` |
| 57 | hex | `#2563EB` | `<div className="absolute top-0 inset-x-0 h-1.5 rounded-t-3xl bg-gradient-to-r from-[#2563EB] to-[#60A5FA]" />` |
| 57 | hex | `#60A5FA` | `<div className="absolute top-0 inset-x-0 h-1.5 rounded-t-3xl bg-gradient-to-r from-[#2563EB] to-[#60A5FA]" />` |
| 62 | hex | `#EEF6FF` | `<span className="inline-flex items-center gap-1.5 rounded-full bg-[#EEF6FF] border border-[#D0E1FD] px-3 py-1 font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#2563` |
| 62 | hex | `#D0E1FD` | `<span className="inline-flex items-center gap-1.5 rounded-full bg-[#EEF6FF] border border-[#D0E1FD] px-3 py-1 font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#2563` |
| 62 | hex | `#2563EB` | `<span className="inline-flex items-center gap-1.5 rounded-full bg-[#EEF6FF] border border-[#D0E1FD] px-3 py-1 font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#2563` |
| 63 | hex | `#2563EB` | `<Compass className="h-3 w-3 text-[#2563EB]" />` |
| 66 | hex | `#64748B` | `<span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[#64748B]">` |
| 67 | hex | `#2563EB` | `<Clock className="h-3.5 w-3.5 text-[#2563EB]" />` |
| 74 | hex | `#081F38` | `<h3 className="font-sans text-2xl sm:text-[26px] font-bold text-[#081F38] tracking-tight group-hover:text-[#2563EB] transition-colors">` |
| 74 | hex | `#2563EB` | `<h3 className="font-sans text-2xl sm:text-[26px] font-bold text-[#081F38] tracking-tight group-hover:text-[#2563EB] transition-colors">` |
| 77 | hex | `#64748B` | `<p className="mt-1.5 text-xs sm:text-sm text-[#64748B] leading-relaxed">` |
| 83 | hex | `#E2E8F0` | `<div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4.5 space-y-3 shadow-inner">` |
| 83 | hex | `#F8FAFC` | `<div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4.5 space-y-3 shadow-inner">` |
| 84 | hex | `#64748B` | `<div className="flex items-center justify-between text-[11px] font-mono font-bold text-[#64748B] border-b border-[#E2E8F0] pb-2">` |
| 84 | hex | `#E2E8F0` | `<div className="flex items-center justify-between text-[11px] font-mono font-bold text-[#64748B] border-b border-[#E2E8F0] pb-2">` |
| 85 | hex | `#081F38` | `<span className="flex items-center gap-1.5 text-[#081F38]">` |
| 86 | hex | `#2563EB` | `<FileText className="h-3.5 w-3.5 text-[#2563EB]" />` |
| 89 | hex | `#2563EB` | `<span className="text-[#2563EB] bg-[#EEF6FF] px-2 py-0.5 rounded text-[10px]">` |
| 89 | hex | `#EEF6FF` | `<span className="text-[#2563EB] bg-[#EEF6FF] px-2 py-0.5 rounded text-[10px]">` |
| 104 | hex | `#2563EB` | `stroke="#2563EB"` |
| 110 | hex | `#081F38` | `<span className="absolute inset-0 flex items-center justify-center font-mono font-extrabold text-xs text-[#081F38]">` |
| 117 | hex | `#081F38` | `<strong className="text-sm font-bold text-[#081F38] truncate">` |
| 124 | hex | `#64748B` | `<div className="text-xs text-[#64748B] mt-0.5">` |
| 125 | hex | `#081F38` | `Fresher CTC Band: <span className="font-semibold text-[#081F38]">₹3.80 – ₹5.20 LPA</span>` |
| 132 | hex | `#E2E8F0` | `<span className="bg-white border border-[#E2E8F0] px-2 py-0.5 rounded text-[#081F38] font-medium tone-light card-light">` |
| 132 | hex | `#081F38` | `<span className="bg-white border border-[#E2E8F0] px-2 py-0.5 rounded text-[#081F38] font-medium tone-light card-light">` |
| 135 | hex | `#E2E8F0` | `<span className="bg-white border border-[#E2E8F0] px-2 py-0.5 rounded text-[#081F38] font-medium tone-light card-light">` |
| 135 | hex | `#081F38` | `<span className="bg-white border border-[#E2E8F0] px-2 py-0.5 rounded text-[#081F38] font-medium tone-light card-light">` |
| 138 | hex | `#EEF6FF` | `<span className="bg-[#EEF6FF] border border-[#D0E1FD] px-2 py-0.5 rounded text-[#2563EB] font-bold">` |
| 138 | hex | `#D0E1FD` | `<span className="bg-[#EEF6FF] border border-[#D0E1FD] px-2 py-0.5 rounded text-[#2563EB] font-bold">` |
| 138 | hex | `#2563EB` | `<span className="bg-[#EEF6FF] border border-[#D0E1FD] px-2 py-0.5 rounded text-[#2563EB] font-bold">` |
| 145 | hex | `#334155` | `<ul className="space-y-2.5 text-xs sm:text-sm text-[#334155]">` |
| 147 | hex | `#2563EB` | `<CheckCircle2 className="h-4 w-4 text-[#2563EB] shrink-0 mt-0.5" />` |
| 149 | hex | `#081F38` | `<strong className="font-semibold text-[#081F38]">Personalised Role Archetype:</strong> Evaluates your degree against PV, CDM, Coding, RA, and SAS.` |
| 153 | hex | `#2563EB` | `<CheckCircle2 className="h-4 w-4 text-[#2563EB] shrink-0 mt-0.5" />` |
| 155 | hex | `#081F38` | `<strong className="font-semibold text-[#081F38]">Skill Gap Diagnosis:</strong> Identifies software and regulatory knowledge employers require.` |
| 159 | hex | `#2563EB` | `<CheckCircle2 className="h-4 w-4 text-[#2563EB] shrink-0 mt-0.5" />` |
| 161 | hex | `#081F38` | `<strong className="font-semibold text-[#081F38]">12-Week Preparation Plan:</strong> Actionable steps to build portfolio work samples before applying.` |
| 168 | hex | `#F1F5F9` | `<div className="pt-6 mt-6 border-t border-[#F1F5F9] space-y-3.5">` |
| 169 | hex | `#64748B` | `<div className="flex items-center justify-between text-xs font-mono font-semibold text-[#64748B]">` |
| 174 | hex | `#2563EB` | `<span className="text-[#2563EB] font-bold">Pre-Enrolment</span>` |
| 179 | hex | `#2563EB` | `className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-3.5 px-6 text-sm font-bold transition-all shadow-sm"` |
| 179 | hex | `#1D4ED8` | `className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-3.5 px-6 text-sm font-bold transition-all shadow-sm"` |
| 190 | hex | `#E2E8F0` | `<article className="flex flex-col justify-between rounded-3xl border border-[#E2E8F0] bg-white p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all durat` |
| 201 | hex | `#64748B` | `<span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[#64748B]">` |
| 209 | hex | `#081F38` | `<h3 className="font-sans text-2xl sm:text-[26px] font-bold text-[#081F38] tracking-tight group-hover:text-emerald-700 transition-colors">` |
| 212 | hex | `#64748B` | `<p className="mt-1.5 text-xs sm:text-sm text-[#64748B] leading-relaxed">` |
| 239 | hex | `#059669` | `stroke="#059669"` |
| 252 | hex | `#081F38` | `<strong className="text-sm font-bold text-[#081F38] truncate">` |
| 255 | hex | `#081F38` | `<span className="shrink-0 text-[9px] font-mono font-bold bg-[#081F38] text-white px-1.5 py-0.5 rounded">` |
| 259 | hex | `#64748B` | `<div className="text-xs text-[#64748B] mt-0.5">` |
| 280 | hex | `#334155` | `<ul className="space-y-2.5 text-xs sm:text-sm text-[#334155]">` |
| 284 | hex | `#081F38` | `<strong className="font-semibold text-[#081F38]">Practical Case Scenarios:</strong> Tests actual adverse event intake, seriousness criteria, and coding.` |
| 290 | hex | `#081F38` | `<strong className="font-semibold text-[#081F38]">Objective Percentile Benchmark:</strong> Provides a verified score recognized by clinical research employers.` |
| 296 | hex | `#081F38` | `<strong className="font-semibold text-[#081F38]">Direct Placement Visibility:</strong> High ACRI index profiles are fast-tracked to CRO hiring panels.` |
| 303 | hex | `#F1F5F9` | `<div className="pt-6 mt-6 border-t border-[#F1F5F9] space-y-3.5">` |
| 304 | hex | `#64748B` | `<div className="flex items-center justify-between text-xs font-mono font-semibold text-[#64748B]">` |
| 314 | hex | `#E2E8F0` | `className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-[#E2E8F0] bg-white hover:bg-slate-50 text-[#081F38] py-3.5 px-6 text-sm font-bold transit` |
| 314 | hex | `#081F38` | `className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-[#E2E8F0] bg-white hover:bg-slate-50 text-[#081F38] py-3.5 px-6 text-sm font-bold transit` |

### `src\components\acri\assessment\AcriOfficialCertificate.tsx` - 71

| Line | Kind | Value | Context |
|---:|---|---|---|
| 65 | hex | `#060B18` | `backgroundColor: "#060B18",` |
| 107 | hex | `#060B18` | `backgroundColor: "#060B18",` |
| 139 | hex | `#C5A572` | `<div className="h-8 w-8 rounded-lg bg-[#C5A572]/20 border border-[#C5A572]/40 flex items-center justify-center text-[#D4AF37]">` |
| 139 | hex | `#C5A572` | `<div className="h-8 w-8 rounded-lg bg-[#C5A572]/20 border border-[#C5A572]/40 flex items-center justify-center text-[#D4AF37]">` |
| 139 | hex | `#D4AF37` | `<div className="h-8 w-8 rounded-lg bg-[#C5A572]/20 border border-[#C5A572]/40 flex items-center justify-center text-[#D4AF37]">` |
| 143 | hex | `#C5A572` | `<div className="font-mono text-[10px] uppercase tracking-widest text-[#C5A572] font-semibold">` |
| 157 | hex | `#C5A572` | `className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#C5A572] hover:bg-[#b8955f] text-stone-950 text-xs font-bold rounded-lg shadow-sm active:scale-95 transition-all cursor-` |
| 157 | hex | `#b8955f` | `className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#C5A572] hover:bg-[#b8955f] text-stone-950 text-xs font-bold rounded-lg shadow-sm active:scale-95 transition-all cursor-` |
| 198 | hex | `#060B18` | `className="relative mx-auto w-full max-w-[1020px] aspect-[1.414/1] bg-[#060B18] text-slate-100 p-5 sm:p-7 md:p-8 select-none shadow-2xl flex flex-col justify-between overflow-hidde` |
| 201 | rgba | `rgba(0, 0, 0, 0.7)` | `boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(197, 165, 114, 0.35)",` |
| 201 | rgba | `rgba(197, 165, 114, 0.35)` | `boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(197, 165, 114, 0.35)",` |
| 202 | hex | `#0E1A34` | `background: "radial-gradient(ellipse at 50% 30%, #0E1A34 0%, #080F22 55%, #050914 100%)",` |
| 202 | hex | `#080F22` | `background: "radial-gradient(ellipse at 50% 30%, #0E1A34 0%, #080F22 55%, #050914 100%)",` |
| 202 | hex | `#050914` | `background: "radial-gradient(ellipse at 50% 30%, #0E1A34 0%, #080F22 55%, #050914 100%)",` |
| 243 | hex | `#C5A572` | `<div className="absolute inset-2.5 sm:inset-3 md:inset-3.5 pointer-events-none border border-[#C5A572]/40 rounded-sm">` |
| 245 | hex | `#C5A572` | `<div className="absolute inset-1 sm:inset-1.5 border border-[#C5A572]/70 rounded-xs">` |
| 247 | hex | `#C5A572` | `<div className="absolute inset-1 border border-[#C5A572]/25" />` |
| 251 | hex | `#C5A572` | `<svg className="absolute -top-1 -left-1 w-5 h-5 text-[#C5A572]" viewBox="0 0 24 24" fill="currentColor">` |
| 254 | hex | `#C5A572` | `<svg className="absolute -top-1 -right-1 w-5 h-5 text-[#C5A572] rotate-90" viewBox="0 0 24 24" fill="currentColor">` |
| 257 | hex | `#C5A572` | `<svg className="absolute -bottom-1 -left-1 w-5 h-5 text-[#C5A572] -rotate-90" viewBox="0 0 24 24" fill="currentColor">` |
| 260 | hex | `#C5A572` | `<svg className="absolute -bottom-1 -right-1 w-5 h-5 text-[#C5A572] rotate-180" viewBox="0 0 24 24" fill="currentColor">` |
| 268 | hex | `#C5A572` | `<div className="flex items-center justify-between text-[8.5px] sm:text-[9.5px] font-mono text-[#C5A572]/90 tracking-widest uppercase border-b border-[#C5A572]/20 pb-1.5 px-2">` |
| 268 | hex | `#C5A572` | `<div className="flex items-center justify-between text-[8.5px] sm:text-[9.5px] font-mono text-[#C5A572]/90 tracking-widest uppercase border-b border-[#C5A572]/20 pb-1.5 px-2">` |
| 278 | hex | `#C5A572` | `<div className="h-px w-14 sm:w-20 bg-gradient-to-r from-transparent via-[#C5A572]/60 to-[#C5A572]" />` |
| 278 | hex | `#C5A572` | `<div className="h-px w-14 sm:w-20 bg-gradient-to-r from-transparent via-[#C5A572]/60 to-[#C5A572]" />` |
| 281 | hex | `#FBF5D4` | `<span className="font-serif font-black text-sm tracking-widest text-[#FBF5D4]">` |
| 285 | hex | `#C5A572` | `<div className="h-px w-14 sm:w-20 bg-gradient-to-l from-transparent via-[#C5A572]/60 to-[#C5A572]" />` |
| 285 | hex | `#C5A572` | `<div className="h-px w-14 sm:w-20 bg-gradient-to-l from-transparent via-[#C5A572]/60 to-[#C5A572]" />` |
| 289 | hex | `#C5A572` | `<p className="font-mono text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.28em] text-[#C5A572] font-semibold">` |
| 295 | hex | `#FFF6D6` | `backgroundImage: "linear-gradient(135deg, #FFF6D6 0%, #D4AF37 50%, #FAF0CA 100%)",` |
| 295 | hex | `#D4AF37` | `backgroundImage: "linear-gradient(135deg, #FFF6D6 0%, #D4AF37 50%, #FAF0CA 100%)",` |
| 295 | hex | `#FAF0CA` | `backgroundImage: "linear-gradient(135deg, #FFF6D6 0%, #D4AF37 50%, #FAF0CA 100%)",` |
| 296 | rgba | `rgba(212, 175, 55, 0.2)` | `textShadow: "0 2px 10px rgba(212, 175, 55, 0.2)",` |
| 318 | rgba | `rgba(0, 0, 0, 0.8)` | `textShadow: "0 2px 12px rgba(0, 0, 0, 0.8), 0 0 20px rgba(251, 245, 212, 0.15)",` |
| 318 | rgba | `rgba(251, 245, 212, 0.15)` | `textShadow: "0 2px 12px rgba(0, 0, 0, 0.8), 0 0 20px rgba(251, 245, 212, 0.15)",` |
| 323 | hex | `#C5A572` | `<div className="h-0.5 w-40 sm:w-56 mx-auto bg-gradient-to-r from-transparent via-[#C5A572] to-transparent" />` |
| 328 | hex | `#C5A572` | `<span className="text-[#C5A572] mx-2">•</span>` |
| 337 | hex | `#C5A572` | `<div className="inline-block py-1 px-5 sm:px-8 rounded-full border border-[#C5A572]/60 bg-[#C5A572]/10 backdrop-blur-xs shadow-inner">` |
| 337 | hex | `#C5A572` | `<div className="inline-block py-1 px-5 sm:px-8 rounded-full border border-[#C5A572]/60 bg-[#C5A572]/10 backdrop-blur-xs shadow-inner">` |
| 341 | hex | `#FFF9E6` | `backgroundImage: "linear-gradient(135deg, #FFF9E6 0%, #E5C158 50%, #FFEDB3 100%)",` |
| 341 | hex | `#E5C158` | `backgroundImage: "linear-gradient(135deg, #FFF9E6 0%, #E5C158 50%, #FFEDB3 100%)",` |
| 341 | hex | `#FFEDB3` | `backgroundImage: "linear-gradient(135deg, #FFF9E6 0%, #E5C158 50%, #FFEDB3 100%)",` |
| 350 | hex | `#C5A572` | `<span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-stone-900/90 border border-[#C5A572]/40 font-mono text-[10px] sm:text-xs">` |
| 352 | hex | `#FBF5D4` | `<strong className="text-xl font-serif text-[#FBF5D4] leading-none">{score}</strong>` |
| 364 | hex | `#C5A572` | `<div className="relative z-10 border-y border-[#C5A572]/20 py-1.5 my-1 bg-[#040812]/50">` |
| 364 | hex | `#040812` | `<div className="relative z-10 border-y border-[#C5A572]/20 py-1.5 my-1 bg-[#040812]/50">` |
| 366 | hex | `#C5A572` | `<span className="text-[#C5A572] font-bold">VERIFIED COMPETENCIES:</span>` |
| 389 | hex | `#C5A572` | `<div className="p-1 rounded-md bg-white tone-light border border-[#C5A572]/70 shadow-sm shrink-0">` |
| 394 | hex | `#0B1325` | `fgColor="#0B1325"` |
| 400 | hex | `#C5A572` | `<div className="text-[#C5A572] truncate max-w-[130px] font-bold">{credentialId}</div>` |
| 411 | hex | `#FFE58F` | `background: "radial-gradient(circle, #FFE58F 0%, #D4AF37 55%, #8C6D23 100%)",` |
| 411 | hex | `#D4AF37` | `background: "radial-gradient(circle, #FFE58F 0%, #D4AF37 55%, #8C6D23 100%)",` |
| 411 | hex | `#8C6D23` | `background: "radial-gradient(circle, #FFE58F 0%, #D4AF37 55%, #8C6D23 100%)",` |
| 412 | rgba | `rgba(212, 175, 55, 0.35)` | `boxShadow: "0 0 16px rgba(212, 175, 55, 0.35), inset 0 2px 4px rgba(255, 255, 255, 0.6)",` |
| 412 | rgba | `rgba(255, 255, 255, 0.6)` | `boxShadow: "0 0 16px rgba(212, 175, 55, 0.35), inset 0 2px 4px rgba(255, 255, 255, 0.6)",` |
| 416 | hex | `#5C4410` | `<div className="absolute inset-1 rounded-full border-2 border-dashed border-[#5C4410]/60" />` |
| 419 | hex | `#FFE58F` | `<div className="h-full w-full rounded-full border border-[#FFE58F]/70 bg-[#7A5C14]/90 flex flex-col items-center justify-center p-0.5 text-[#FFF6D6]">` |
| 419 | hex | `#7A5C14` | `<div className="h-full w-full rounded-full border border-[#FFE58F]/70 bg-[#7A5C14]/90 flex flex-col items-center justify-center p-0.5 text-[#FFF6D6]">` |
| 419 | hex | `#FFF6D6` | `<div className="h-full w-full rounded-full border border-[#FFE58F]/70 bg-[#7A5C14]/90 flex flex-col items-center justify-center p-0.5 text-[#FFF6D6]">` |
| 420 | hex | `#FFE082` | `<Award className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#FFE082]" />` |
| 424 | hex | `#FFE58F` | `<span className="font-mono text-[4px] sm:text-[4.5px] tracking-tight uppercase text-[#FFE58F]">` |
| 431 | hex | `#8C6D23` | `<div className="w-2 h-2.5 bg-[#8C6D23] clip-ribbon border-t border-[#D4AF37]" />` |
| 431 | hex | `#D4AF37` | `<div className="w-2 h-2.5 bg-[#8C6D23] clip-ribbon border-t border-[#D4AF37]" />` |
| 432 | hex | `#8C6D23` | `<div className="w-2 h-2.5 bg-[#8C6D23] clip-ribbon border-t border-[#D4AF37]" />` |
| 432 | hex | `#D4AF37` | `<div className="w-2 h-2.5 bg-[#8C6D23] clip-ribbon border-t border-[#D4AF37]" />` |
| 436 | hex | `#C5A572` | `<span className="mt-2 font-mono text-[6.5px] sm:text-[7px] uppercase tracking-[0.18em] text-[#C5A572] font-semibold leading-tight">` |
| 446 | hex | `#FFF6D6` | `className="italic text-base sm:text-lg md:text-xl text-[#FFF6D6] leading-none select-none drop-shadow-sm font-normal"` |
| 454 | hex | `#C5A572` | `<div className="h-px w-20 sm:w-24 bg-gradient-to-r from-transparent via-[#C5A572]/70 to-transparent mx-auto mt-1" />` |
| 458 | hex | `#C5A572` | `<div className="font-mono text-[6.5px] sm:text-[7px] text-[#C5A572] uppercase tracking-wider">` |
| 476 | hex | `#C5A572` | `<div className="h-px w-20 sm:w-24 bg-gradient-to-r from-transparent via-[#C5A572]/70 to-transparent mx-auto mt-1" />` |
| 480 | hex | `#C5A572` | `<div className="font-mono text-[6.5px] sm:text-[7px] text-[#C5A572] uppercase tracking-wider">` |

### `src\components\credibility\JDMirror.tsx` - 71

| Line | Kind | Value | Context |
|---:|---|---|---|
| 20 | hex | `#1d4ed8` | `gradient: "from-[#1d4ed8] via-[#2563eb] to-[#0ea5e9]",` |
| 20 | hex | `#2563eb` | `gradient: "from-[#1d4ed8] via-[#2563eb] to-[#0ea5e9]",` |
| 20 | hex | `#0ea5e9` | `gradient: "from-[#1d4ed8] via-[#2563eb] to-[#0ea5e9]",` |
| 21 | hex | `#38bdf8` | `accent: "#38bdf8",` |
| 22 | hex | `#38bdf8` | `barColor: "#38bdf8",` |
| 26 | hex | `#c2410c` | `gradient: "from-[#c2410c] via-[#ea580c] to-[#d97706]",` |
| 26 | hex | `#ea580c` | `gradient: "from-[#c2410c] via-[#ea580c] to-[#d97706]",` |
| 26 | hex | `#d97706` | `gradient: "from-[#c2410c] via-[#ea580c] to-[#d97706]",` |
| 32 | hex | `#047857` | `gradient: "from-[#047857] via-[#059669] to-[#0d9488]",` |
| 32 | hex | `#059669` | `gradient: "from-[#047857] via-[#059669] to-[#0d9488]",` |
| 32 | hex | `#0d9488` | `gradient: "from-[#047857] via-[#059669] to-[#0d9488]",` |
| 33 | hex | `#34d399` | `accent: "#34d399",` |
| 34 | hex | `#34d399` | `barColor: "#34d399",` |
| 38 | hex | `#6d28d9` | `gradient: "from-[#6d28d9] via-[#7c3aed] to-[#4f46e5]",` |
| 38 | hex | `#7c3aed` | `gradient: "from-[#6d28d9] via-[#7c3aed] to-[#4f46e5]",` |
| 38 | hex | `#4f46e5` | `gradient: "from-[#6d28d9] via-[#7c3aed] to-[#4f46e5]",` |
| 44 | hex | `#be185d` | `gradient: "from-[#be185d] via-[#db2777] to-[#e11d48]",` |
| 44 | hex | `#db2777` | `gradient: "from-[#be185d] via-[#db2777] to-[#e11d48]",` |
| 44 | hex | `#e11d48` | `gradient: "from-[#be185d] via-[#db2777] to-[#e11d48]",` |
| 50 | hex | `#1e40af` | `gradient: "from-[#1e40af] via-[#2563eb] to-[#0284c7]",` |
| 50 | hex | `#2563eb` | `gradient: "from-[#1e40af] via-[#2563eb] to-[#0284c7]",` |
| 50 | hex | `#0284c7` | `gradient: "from-[#1e40af] via-[#2563eb] to-[#0284c7]",` |
| 51 | hex | `#60a5fa` | `accent: "#60a5fa",` |
| 52 | hex | `#60a5fa` | `barColor: "#60a5fa",` |
| 88 | hex | `#F8FAFC` | `className={`py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC] ${className ?? ""}`}` |
| 88 | hex | `#F1F5F9` | `className={`py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC] ${className ?? ""}`}` |
| 88 | hex | `#F8FAFC` | `className={`py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC] ${className ?? ""}`}` |
| 92 | hex | `#1A1A1A` | `<div className="rounded-[28px] bg-white border border-stone-200/90 p-6 sm:p-8 text-[#1A1A1A] space-y-6 shadow-xl relative overflow-hidden tone-light card-light">` |
| 96 | hex | `#1B3F8B` | `<span className="rounded-full bg-sky-50 px-3.5 py-1 font-mono text-xs font-extrabold text-[#1B3F8B] border border-sky-200 shadow-2xs inline-flex items-center gap-1.5">` |
| 97 | hex | `#1B3F8B` | `<Zap className="h-3.5 w-3.5 text-[#1B3F8B] fill-[#1B3F8B]" />` |
| 97 | hex | `#1B3F8B` | `<Zap className="h-3.5 w-3.5 text-[#1B3F8B] fill-[#1B3F8B]" />` |
| 108 | hex | `#1A1A1A` | `<h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-[#1A1A1A] tracking-tight leading-snug">` |
| 128 | hex | `#1B3F8B` | `className="rounded-lg bg-stone-100 hover:bg-stone-200 border border-stone-200 px-2.5 py-1 text-[11px] font-mono font-bold text-[#1B3F8B] transition-all cursor-pointer"` |
| 141 | hex | `#1B3F8B` | `className="w-full rounded-2xl border border-stone-300 bg-stone-50 p-4 text-xs sm:text-sm font-mono text-stone-900 placeholder:text-stone-400 focus:border-[#1B3F8B] focus:bg-white f` |
| 141 | hex | `#1B3F8B` | `className="w-full rounded-2xl border border-stone-300 bg-stone-50 p-4 text-xs sm:text-sm font-mono text-stone-900 placeholder:text-stone-400 focus:border-[#1B3F8B] focus:bg-white f` |
| 148 | hex | `#1B3F8B` | `style={{ color: "#FFFFFF", backgroundColor: "#1B3F8B" }}` |
| 149 | hex | `#1B3F8B` | `className="rounded-xl bg-[#1B3F8B] px-7 py-3 text-xs sm:text-sm font-extrabold text-white hover:bg-[#153270] disabled:opacity-50 transition-all shadow-lg shadow-[#1B3F8B]/20 flex i` |
| 149 | hex | `#153270` | `className="rounded-xl bg-[#1B3F8B] px-7 py-3 text-xs sm:text-sm font-extrabold text-white hover:bg-[#153270] disabled:opacity-50 transition-all shadow-lg shadow-[#1B3F8B]/20 flex i` |
| 149 | hex | `#1B3F8B` | `className="rounded-xl bg-[#1B3F8B] px-7 py-3 text-xs sm:text-sm font-extrabold text-white hover:bg-[#153270] disabled:opacity-50 transition-all shadow-lg shadow-[#1B3F8B]/20 flex i` |
| 170 | hex | `#1B3F8B` | `<span className="font-mono text-xs text-[#1B3F8B] uppercase tracking-wider font-extrabold">` |
| 173 | hex | `#1A1A1A` | `<p className="text-base font-extrabold text-[#1A1A1A] mt-1">` |
| 177 | hex | `#1B3F8B` | `<span className="rounded-lg bg-sky-100 px-3 py-1 font-mono text-xs font-extrabold text-[#1B3F8B] border border-sky-300">` |
| 196 | hex | `#0F172A` | `<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-mono font-bold text-[#0F172A]">` |
| 197 | hex | `#2563EB` | `<Sparkles className="h-3.5 w-3.5 text-[#2563EB]" />` |
| 198 | hex | `#0F172A` | `<span className="text-[#0F172A] font-bold">THE JD MIRROR · LIVE CREDIBILITY</span>` |
| 200 | hex | `#0F172A` | `<h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight leading-tight">` |
| 202 | hex | `#8A6D1F` | `<span className="italic text-[#8A6D1F]">` |
| 207 | hex | `#334155` | `<p className="text-xs sm:text-sm text-[#334155] leading-relaxed font-medium">` |
| 232 | hex | `#0F172A` | `<span className="inline-flex items-center gap-1 bg-white/95 text-[#0F172A] px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm">` |
| 233 | hex | `#2563EB` | `<BookOpen className="h-2.5 w-2.5 text-[#2563EB]" />` |
| 234 | hex | `#0F172A` | `<span className="text-[#0F172A]">TRACK</span>` |
| 236 | hex | `#0F172A` | `<span className="inline-flex items-center gap-1.5 bg-white/95 text-[#0F172A] px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold shadow-sm">` |
| 241 | hex | `#0F172A` | `<span className="text-[#0F172A]">{avgCoverage}% match</span>` |
| 261 | hex | `#475569` | `<div className="flex items-center gap-2 text-xs text-[#475569] font-semibold">` |
| 262 | hex | `#0F172A` | `<span className="font-mono font-bold text-[#0F172A]">` |
| 266 | hex | `#334155` | `<span className="flex items-center gap-1 text-[#334155]">` |
| 267 | hex | `#64748B` | `<MapPin className="h-3 w-3 text-[#64748B]" />` |
| 279 | hex | `#0F172A` | `className="tone-dark bg-[#0F172A] text-slate-100 rounded-xl p-3.5 space-y-2 shadow-sm border border-slate-800"` |
| 283 | hex | `#38bdf8` | `style={{ color: "#38bdf8" }}` |
| 288 | hex | `#F8FAFC` | `className="text-xs font-bold text-[#F8FAFC] leading-snug tracking-tight"` |
| 297 | hex | `#38bdf8` | `style={{ width: `${pct}%`, backgroundColor: "#38bdf8" }}` |
| 301 | hex | `#38bdf8` | `style={{ color: "#38bdf8" }}` |
| 314 | hex | `#FEF3C7` | `<div className="bg-[#FEF3C7] border border-[#FDE68A] text-[#78350F] p-3 rounded-xl flex items-start gap-2 text-xs">` |
| 314 | hex | `#FDE68A` | `<div className="bg-[#FEF3C7] border border-[#FDE68A] text-[#78350F] p-3 rounded-xl flex items-start gap-2 text-xs">` |
| 314 | hex | `#78350F` | `<div className="bg-[#FEF3C7] border border-[#FDE68A] text-[#78350F] p-3 rounded-xl flex items-start gap-2 text-xs">` |
| 315 | hex | `#78350F` | `<RefreshCw className="h-3.5 w-3.5 text-[#78350F] shrink-0 mt-0.5" />` |
| 316 | hex | `#78350F` | `<span className="leading-snug text-[#78350F] font-medium">` |
| 317 | hex | `#78350F` | `<strong className="font-bold text-[#78350F]">` |
| 331 | hex | `#0F172A` | `className="text-xs h-10 px-4 w-full flex items-center justify-center gap-2 text-[#0F172A] font-bold rounded-xl border border-slate-300 bg-white hover:bg-slate-50 transition-colors ` |
| 333 | hex | `#0F172A` | `<span className="text-[#0F172A]">Explore track</span>` |
| 334 | hex | `#64748B` | `<ArrowRight className="h-3.5 w-3.5 text-[#64748B]" />` |

### `src\styles\arena110.css` - 68

| Line | Kind | Value | Context |
|---:|---|---|---|
| 4 | hex | `#071A4A` | `- Arzon Deep Navy: #071A4A` |
| 5 | hex | `#1557D6` | `- Electric Royal Blue: #1557D6 / #2878F0` |
| 5 | hex | `#2878F0` | `- Electric Royal Blue: #1557D6 / #2878F0` |
| 6 | hex | `#EEF6FF` | `- Soft Blue Surface: #EEF6FF` |
| 7 | hex | `#E4EAF2` | `- Hairline Border: #E4EAF2` |
| 8 | hex | `#1E293B` | `- Authoritative Ink: #1E293B / #475569` |
| 8 | hex | `#475569` | `- Authoritative Ink: #1E293B / #475569` |
| 12 | hex | `#071A4A` | `--a-navy: #071A4A;` |
| 13 | hex | `#1557D6` | `--a-blue: #1557D6;` |
| 14 | hex | `#0E44B0` | `--a-blue-hover: #0E44B0;` |
| 15 | hex | `#EEF6FF` | `--a-blue-soft: #EEF6FF;` |
| 16 | hex | `#D0E1FD` | `--a-blue-border: #D0E1FD;` |
| 17 | hex | `#F8FAFC` | `--a-surface: #F8FAFC;` |
| 18 | hex | `#FFFFFF` | `--a-white: #FFFFFF;` |
| 19 | hex | `#E4EAF2` | `--a-line: #E4EAF2;` |
| 20 | hex | `#CBD5E1` | `--a-line-strong: #CBD5E1;` |
| 21 | hex | `#071A4A` | `--a-ink: #071A4A;` |
| 22 | hex | `#334155` | `--a-body: #334155;` |
| 23 | hex | `#64748B` | `--a-muted: #64748B;` |
| 24 | hex | `#0D9488` | `--a-teal: #0D9488;` |
| 25 | hex | `#F0FDFA` | `--a-teal-soft: #F0FDFA;` |
| 26 | hex | `#CCFBF1` | `--a-teal-border: #CCFBF1;` |
| 45 | rgba | `rgba(7, 26, 74, 0.03)` | `box-shadow: 0 1px 3px rgba(7, 26, 74, 0.03);` |
| 55 | hex | `#10B981` | `background: #10B981;` |
| 56 | hex | `#D1FAE5` | `box-shadow: 0 0 0 4px #D1FAE5;` |
| 100 | hex | `#EDF2F7` | `background: #EDF2F7;` |
| 126 | rgba | `rgba(7, 26, 74, 0.08)` | `box-shadow: 0 2px 8px rgba(7, 26, 74, 0.08);` |
| 133 | hex | `#E2E8F0` | `background: #E2E8F0;` |
| 145 | hex | `#FFFFFF` | `color: #FFFFFF;` |
| 169 | rgba | `rgba(7, 26, 74, 0.03)` | `box-shadow: 0 1px 2px rgba(7, 26, 74, 0.03);` |
| 175 | rgba | `rgba(21, 87, 214, 0.12)` | `box-shadow: 0 0 0 3px rgba(21, 87, 214, 0.12);` |
| 189 | hex | `#94A3B8` | `color: #94A3B8;` |
| 233 | hex | `#FFFFFF` | `color: #FFFFFF;` |
| 234 | rgba | `rgba(7, 26, 74, 0.12)` | `box-shadow: 0 2px 6px rgba(7, 26, 74, 0.12);` |
| 242 | rgba | `rgba(7, 26, 74, 0.03)` | `box-shadow: 0 2px 10px rgba(7, 26, 74, 0.03);` |
| 261 | hex | `#F8FAFC` | `background: #F8FAFC;` |
| 270 | rgba | `rgba(7, 26, 74, 0.06)` | `box-shadow: 0 2px 6px rgba(7, 26, 74, 0.06);` |
| 335 | hex | `#E2E8F0` | `background: #E2E8F0;` |
| 343 | hex | `#1557D6` | `background: linear-gradient(90deg, #1557D6, #2878F0);` |
| 343 | hex | `#2878F0` | `background: linear-gradient(90deg, #1557D6, #2878F0);` |
| 369 | hex | `#FFFFFF` | `color: #FFFFFF;` |
| 385 | rgba | `rgba(7, 26, 74, 0.03)` | `box-shadow: 0 2px 10px rgba(7, 26, 74, 0.03);` |
| 394 | rgba | `rgba(7, 26, 74, 0.08)` | `box-shadow: 0 8px 24px rgba(7, 26, 74, 0.08);` |
| 453 | hex | `#F8FAFC` | `background: #F8FAFC;` |
| 482 | hex | `#FAFBFD` | `background: #FAFBFD;` |
| 501 | rgba | `rgba(7, 26, 74, 0.04)` | `box-shadow: 0 4px 20px rgba(7, 26, 74, 0.04);` |
| 554 | hex | `#F8FAFC` | `background: #F8FAFC;` |
| 565 | hex | `#FFFFFF` | `background: #FFFFFF;` |
| 567 | rgba | `rgba(21, 87, 214, 0.12)` | `box-shadow: 0 0 0 3px rgba(21, 87, 214, 0.12);` |
| 594 | hex | `#FFFFFF` | `color: #FFFFFF !important;` |
| 595 | hex | `#FFFFFF` | `-webkit-text-fill-color: #FFFFFF !important;` |
| 596 | rgba | `rgba(7, 26, 74, 0.18)` | `box-shadow: 0 4px 14px rgba(7, 26, 74, 0.18);` |
| 600 | hex | `#FFFFFF` | `color: #FFFFFF !important;` |
| 601 | hex | `#FFFFFF` | `-webkit-text-fill-color: #FFFFFF !important;` |
| 602 | hex | `#FFFFFF` | `stroke: #FFFFFF !important;` |
| 607 | hex | `#FFFFFF` | `color: #FFFFFF !important;` |
| 608 | hex | `#FFFFFF` | `-webkit-text-fill-color: #FFFFFF !important;` |
| 610 | rgba | `rgba(21, 87, 214, 0.28)` | `box-shadow: 0 6px 18px rgba(21, 87, 214, 0.28);` |
| 621 | hex | `#F8FAFC` | `background: #F8FAFC;` |
| 642 | rgba | `rgba(7, 26, 74, 0.2)` | `background: linear-gradient(180deg, rgba(7, 26, 74, 0.2) 0%, rgba(7, 26, 74, 0.88) 100%);` |
| 642 | rgba | `rgba(7, 26, 74, 0.88)` | `background: linear-gradient(180deg, rgba(7, 26, 74, 0.2) 0%, rgba(7, 26, 74, 0.88) 100%);` |
| 649 | hex | `#FFFFFF` | `color: #FFFFFF;` |
| 656 | hex | `#93C5FD` | `color: #93C5FD;` |
| 676 | hex | `#E2E8F0` | `color: #E2E8F0;` |
| 688 | rgba | `rgba(7, 26, 74, 0.04)` | `box-shadow: 0 4px 20px rgba(7, 26, 74, 0.04);` |
| 693 | hex | `#0B255A` | `background: #0B255A;` |
| 761 | hex | `#F8FAFC` | `background: #F8FAFC;` |
| 808 | hex | `#F8FAFC` | `background: #F8FAFC;` |

### `src\components\career\result\CareerMarketDossier.tsx` - 65

| Line | Kind | Value | Context |
|---:|---|---|---|
| 326 | hex | `#E4EAF2` | `<div className="rounded-3xl border border-[#E4EAF2] bg-white tone-light card-light p-6 sm:p-8 shadow-sm">` |
| 327 | hex | `#E4EAF2` | `<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E4EAF2]">` |
| 329 | hex | `#EEF6FF` | `<div className="grid h-10 w-10 place-items-center rounded-xl bg-[#EEF6FF] text-[#1557D6]">` |
| 329 | hex | `#1557D6` | `<div className="grid h-10 w-10 place-items-center rounded-xl bg-[#EEF6FF] text-[#1557D6]">` |
| 333 | hex | `#1557D6` | `<span className="text-[11px] font-mono uppercase tracking-wider text-[#1557D6] font-bold block">` |
| 336 | hex | `#071A4A` | `<h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#071A4A]">` |
| 348 | hex | `#D0E1FD` | `<div className="mt-6 rounded-2xl border border-[#D0E1FD] bg-[#EEF6FF]/60 p-5 sm:p-6">` |
| 348 | hex | `#EEF6FF` | `<div className="mt-6 rounded-2xl border border-[#D0E1FD] bg-[#EEF6FF]/60 p-5 sm:p-6">` |
| 351 | hex | `#1557D6` | `<span className="text-xs font-mono uppercase text-[#1557D6] font-bold tracking-wider block">` |
| 354 | hex | `#071A4A` | `<p className="mt-1 font-serif text-2xl sm:text-3xl font-bold text-[#071A4A]">` |
| 359 | hex | `#3F4A60` | `<p className="mt-3 text-xs sm:text-sm text-[#3F4A60] leading-relaxed">` |
| 363 | hex | `#D0E1FD` | `<div className="mt-4 pt-4 border-t border-[#D0E1FD]/60 flex items-start gap-2 text-xs text-[#071A4A]">` |
| 363 | hex | `#071A4A` | `<div className="mt-4 pt-4 border-t border-[#D0E1FD]/60 flex items-start gap-2 text-xs text-[#071A4A]">` |
| 372 | hex | `#69758A` | `<span className="text-xs font-mono uppercase tracking-wider text-[#69758A] font-bold">` |
| 375 | hex | `#69758A` | `<span className="text-[11px] text-[#69758A] font-mono">Real-world CTC Benchmarks</span>` |
| 380 | hex | `#E4EAF2` | `<div className="rounded-2xl border border-[#E4EAF2] bg-[#FAFBFD] p-4 text-center">` |
| 380 | hex | `#FAFBFD` | `<div className="rounded-2xl border border-[#E4EAF2] bg-[#FAFBFD] p-4 text-center">` |
| 381 | hex | `#69758A` | `<span className="text-[10px] font-mono text-[#69758A] block uppercase font-bold">` |
| 384 | hex | `#071A4A` | `<span className="mt-2 font-serif text-2xl font-bold text-[#071A4A] block">` |
| 387 | hex | `#1557D6` | `<span className="text-[11px] text-[#1557D6] font-semibold block mt-1">` |
| 390 | hex | `#69758A` | `<span className="text-[10px] text-[#69758A] block mt-0.5">Starting Package</span>` |
| 394 | hex | `#D0E1FD` | `<div className="rounded-2xl border border-[#D0E1FD] bg-[#EEF6FF]/40 p-4 text-center">` |
| 394 | hex | `#EEF6FF` | `<div className="rounded-2xl border border-[#D0E1FD] bg-[#EEF6FF]/40 p-4 text-center">` |
| 395 | hex | `#1557D6` | `<span className="text-[10px] font-mono text-[#1557D6] block uppercase font-bold">` |
| 398 | hex | `#1557D6` | `<span className="mt-2 font-serif text-2xl font-bold text-[#1557D6] block">` |
| 401 | hex | `#071A4A` | `<span className="text-[11px] text-[#071A4A] font-semibold block mt-1">` |
| 404 | hex | `#69758A` | `<span className="text-[10px] text-[#69758A] block mt-0.5">Core Technical Band</span>` |
| 408 | hex | `#E4EAF2` | `<div className="rounded-2xl border border-[#E4EAF2] bg-[#FAFBFD] p-4 text-center">` |
| 408 | hex | `#FAFBFD` | `<div className="rounded-2xl border border-[#E4EAF2] bg-[#FAFBFD] p-4 text-center">` |
| 409 | hex | `#69758A` | `<span className="text-[10px] font-mono text-[#69758A] block uppercase font-bold">` |
| 412 | hex | `#071A4A` | `<span className="mt-2 font-serif text-2xl font-bold text-[#071A4A] block">` |
| 415 | hex | `#071A4A` | `<span className="text-[11px] text-[#071A4A] font-semibold block mt-1">` |
| 418 | hex | `#69758A` | `<span className="text-[10px] text-[#69758A] block mt-0.5">Quality Reviewer Band</span>` |
| 422 | hex | `#E4EAF2` | `<div className="rounded-2xl border border-[#E4EAF2] bg-[#FAFBFD] p-4 text-center">` |
| 422 | hex | `#FAFBFD` | `<div className="rounded-2xl border border-[#E4EAF2] bg-[#FAFBFD] p-4 text-center">` |
| 423 | hex | `#69758A` | `<span className="text-[10px] font-mono text-[#69758A] block uppercase font-bold">` |
| 426 | hex | `#071A4A` | `<span className="mt-2 font-serif text-2xl font-bold text-[#071A4A] block">` |
| 429 | hex | `#071A4A` | `<span className="text-[11px] text-[#071A4A] font-semibold block mt-1">` |
| 432 | hex | `#69758A` | `<span className="text-[10px] text-[#69758A] block mt-0.5">Delivery Leadership</span>` |
| 438 | hex | `#E4EAF2` | `<div className="mt-8 grid gap-6 md:grid-cols-2 pt-6 border-t border-[#E4EAF2]">` |
| 442 | hex | `#1557D6` | `<MapPin className="h-4 w-4 text-[#1557D6]" />` |
| 443 | hex | `#071A4A` | `<span className="text-xs font-mono uppercase tracking-wider text-[#071A4A] font-bold">` |
| 451 | hex | `#E4EAF2` | `className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 rounded-xl border border-[#E4EAF2] bg-[#FAFBFD] px-3.5 py-2 text-xs"` |
| 451 | hex | `#FAFBFD` | `className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 rounded-xl border border-[#E4EAF2] bg-[#FAFBFD] px-3.5 py-2 text-xs"` |
| 453 | hex | `#071A4A` | `<span className="font-bold text-[#071A4A]">{h.city}</span>` |
| 454 | hex | `#69758A` | `<span className="text-[#69758A] text-[11px] sm:text-xs">{h.areas}</span>` |
| 463 | hex | `#1557D6` | `<Building2 className="h-4 w-4 text-[#1557D6]" />` |
| 464 | hex | `#071A4A` | `<span className="text-xs font-mono uppercase tracking-wider text-[#071A4A] font-bold">` |
| 472 | hex | `#E4EAF2` | `className="inline-flex items-center gap-1.5 rounded-lg border border-[#E4EAF2] bg-white tone-light card-light px-3 py-1.5 text-xs font-semibold text-[#071A4A] shadow-2xs"` |
| 472 | hex | `#071A4A` | `className="inline-flex items-center gap-1.5 rounded-lg border border-[#E4EAF2] bg-white tone-light card-light px-3 py-1.5 text-xs font-semibold text-[#071A4A] shadow-2xs"` |
| 474 | hex | `#1557D6` | `<span className="w-1.5 h-1.5 rounded-full bg-[#1557D6]" />` |
| 479 | hex | `#69758A` | `<p className="mt-3 text-[11px] text-[#69758A] leading-relaxed">` |
| 486 | hex | `#E4EAF2` | `<div className="mt-8 pt-6 border-t border-[#E4EAF2]">` |
| 488 | hex | `#1557D6` | `<Layers className="h-4 w-4 text-[#1557D6]" />` |
| 489 | hex | `#071A4A` | `<span className="text-xs font-mono uppercase tracking-wider text-[#071A4A] font-bold">` |
| 497 | hex | `#E4EAF2` | `className="flex items-center justify-between rounded-xl border border-[#E4EAF2] bg-[#FAFBFD] p-3 text-xs"` |
| 497 | hex | `#FAFBFD` | `className="flex items-center justify-between rounded-xl border border-[#E4EAF2] bg-[#FAFBFD] p-3 text-xs"` |
| 500 | hex | `#071A4A` | `<span className="font-bold text-[#071A4A] block">{t.name}</span>` |
| 501 | hex | `#69758A` | `<span className="text-[10px] text-[#69758A] block">{t.category}</span>` |
| 503 | hex | `#1557D6` | `<CheckCircle2 className="h-4 w-4 text-[#1557D6] shrink-0" />` |
| 510 | hex | `#E4EAF2` | `<div className="mt-8 grid gap-6 md:grid-cols-2 pt-6 border-t border-[#E4EAF2]">` |
| 512 | hex | `#FAFBFD` | `<div className="rounded-2xl border border-slate-200 bg-[#FAFBFD] p-5">` |
| 513 | hex | `#071A4A` | `<span className="text-xs font-mono uppercase tracking-wider text-[#071A4A] font-bold block mb-2">` |
| 516 | hex | `#3F4A60` | `<ul className="space-y-2 text-xs text-[#3F4A60]">` |
| 519 | hex | `#1557D6` | `<span className="font-mono text-[#1557D6] font-bold">•</span>` |

### `src\components\acri\landing\AcriCandidateModal.tsx` - 64

| Line | Kind | Value | Context |
|---:|---|---|---|
| 365 | hex | `#005B4F` | `<div className="bg-[#005B4F] px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between text-white">` |
| 375 | hex | `#00473E` | `className="p-1 rounded-lg text-emerald-200 hover:text-white hover:bg-[#00473E] transition-colors cursor-pointer"` |
| 387 | hex | `#005B4F` | `<RefreshCw className="h-4 w-4 motion-safe:animate-spin text-[#005B4F]" />` |
| 397 | hex | `#E8F7F1` | `<div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-[#E8F7F1] text-[#005B4F] mx-auto border-2 border-[#005B4F]/20 shadow-xs">` |
| 397 | hex | `#005B4F` | `<div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-[#E8F7F1] text-[#005B4F] mx-auto border-2 border-[#005B4F]/20 shadow-xs">` |
| 397 | hex | `#005B4F` | `<div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-[#E8F7F1] text-[#005B4F] mx-auto border-2 border-[#005B4F]/20 shadow-xs">` |
| 398 | hex | `#005B4F` | `<CheckCircle2 className="h-9 w-9 text-[#005B4F]" />` |
| 402 | hex | `#005B4F` | `<span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#005B4F] uppercase tracking-widest bg-[#E8F7F1] px-3.5 py-1 rounded-full border border-[#005` |
| 402 | hex | `#E8F7F1` | `<span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#005B4F] uppercase tracking-widest bg-[#E8F7F1] px-3.5 py-1 rounded-full border border-[#005` |
| 402 | hex | `#005B4F` | `<span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#005B4F] uppercase tracking-widest bg-[#E8F7F1] px-3.5 py-1 rounded-full border border-[#005` |
| 406 | hex | `#0B1325` | `<h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B1325] mt-2.5">` |
| 415 | hex | `#FAF8F5` | `<div className="bg-[#FAF8F5] border-2 border-dashed border-[#005B4F]/30 rounded-2xl p-5 space-y-2 text-center">` |
| 415 | hex | `#005B4F` | `<div className="bg-[#FAF8F5] border-2 border-dashed border-[#005B4F]/30 rounded-2xl p-5 space-y-2 text-center">` |
| 420 | hex | `#005B4F` | `<span className="font-mono text-2xl sm:text-3xl font-black text-[#005B4F] tracking-wider select-all">` |
| 427 | hex | `#005B4F` | `className="p-2 rounded-lg bg-white card-light border border-stone-200 text-stone-600 hover:text-[#005B4F] transition-colors cursor-pointer"` |
| 464 | hex | `#005B4F` | `className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-white font-sans font-bold text-sm tracking-wide transition-all shadow-` |
| 464 | hex | `#00473E` | `className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-white font-sans font-bold text-sm tracking-wide transition-all shadow-` |
| 501 | hex | `#0B1325` | `<h2 className="text-2xl font-serif font-bold text-[#0B1325] mt-2.5">` |
| 572 | hex | `#005B4F` | `<span className="font-mono text-[10px] font-bold text-[#005B4F] uppercase tracking-widest bg-[#E8F7F1] px-2.5 py-1 rounded-full">` |
| 572 | hex | `#E8F7F1` | `<span className="font-mono text-[10px] font-bold text-[#005B4F] uppercase tracking-widest bg-[#E8F7F1] px-2.5 py-1 rounded-full">` |
| 575 | hex | `#0B1325` | `<h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0B1325] mt-2">` |
| 594 | hex | `#005B4F` | `className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#005B4F]/40 focus:b` |
| 594 | hex | `#005B4F` | `className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#005B4F]/40 focus:b` |
| 608 | hex | `#005B4F` | `className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-white font-mono font-bold text-xs uppercase tracking-wider transitio` |
| 608 | hex | `#00473E` | `className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-white font-mono font-bold text-xs uppercase tracking-wider transitio` |
| 637 | hex | `#005B4F` | `<span className="font-mono text-[10px] font-bold text-[#005B4F] uppercase tracking-widest bg-[#E8F7F1] px-2.5 py-1 rounded-full">` |
| 637 | hex | `#E8F7F1` | `<span className="font-mono text-[10px] font-bold text-[#005B4F] uppercase tracking-widest bg-[#E8F7F1] px-2.5 py-1 rounded-full">` |
| 640 | hex | `#0B1325` | `<h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0B1325] mt-2">` |
| 655 | hex | `#005B4F` | `className="font-mono font-bold text-[#005B4F] hover:underline flex items-center gap-1 cursor-pointer"` |
| 674 | hex | `#005B4F` | `className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-[16px] sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#005` |
| 674 | hex | `#005B4F` | `className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-[16px] sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#005` |
| 689 | hex | `#005B4F` | `className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-[16px] sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#005` |
| 689 | hex | `#005B4F` | `className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-[16px] sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#005` |
| 704 | hex | `#005B4F` | `className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-[16px] sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#005` |
| 704 | hex | `#005B4F` | `className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-[16px] sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#005` |
| 716 | hex | `#005B4F` | `className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-[16px] sm:text-sm text-stone-900 bg-white card-light focus:outline-none focus:ring-2 focus:ring-[#005B4F]/40` |
| 716 | hex | `#005B4F` | `className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-[16px] sm:text-sm text-stone-900 bg-white card-light focus:outline-none focus:ring-2 focus:ring-[#005B4F]/40` |
| 737 | hex | `#005B4F` | `className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-[16px] sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#005` |
| 737 | hex | `#005B4F` | `className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-[16px] sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#005` |
| 754 | hex | `#005B4F` | `className="text-[#005B4F] focus:ring-[#005B4F]"` |
| 754 | hex | `#005B4F` | `className="text-[#005B4F] focus:ring-[#005B4F]"` |
| 765 | hex | `#005B4F` | `className="text-[#005B4F] focus:ring-[#005B4F]"` |
| 765 | hex | `#005B4F` | `className="text-[#005B4F] focus:ring-[#005B4F]"` |
| 775 | hex | `#005B4F` | `<ShieldCheck className="h-3.5 w-3.5 text-[#005B4F]" />` |
| 785 | hex | `#005B4F` | `className="mt-0.5 rounded border-stone-300 text-[#005B4F] focus:ring-[#005B4F]"` |
| 785 | hex | `#005B4F` | `className="mt-0.5 rounded border-stone-300 text-[#005B4F] focus:ring-[#005B4F]"` |
| 789 | hex | `#005B4F` | `<a href="/terms" target="_blank" className="text-[#005B4F] underline hover:text-[#00473E]">` |
| 789 | hex | `#00473E` | `<a href="/terms" target="_blank" className="text-[#005B4F] underline hover:text-[#00473E]">` |
| 793 | hex | `#005B4F` | `<a href="/privacy" target="_blank" className="text-[#005B4F] underline hover:text-[#00473E]">` |
| 793 | hex | `#00473E` | `<a href="/privacy" target="_blank" className="text-[#005B4F] underline hover:text-[#00473E]">` |
| 805 | hex | `#005B4F` | `className="mt-0.5 rounded border-stone-300 text-[#005B4F] focus:ring-[#005B4F]"` |
| 805 | hex | `#005B4F` | `className="mt-0.5 rounded border-stone-300 text-[#005B4F] focus:ring-[#005B4F]"` |
| 818 | hex | `#005B4F` | `className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-slate-50 font-mono font-bold text-xs uppercase tracking-wider transi` |
| 818 | hex | `#00473E` | `className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-slate-50 font-mono font-bold text-xs uppercase tracking-wider transi` |
| 839 | hex | `#E8F7F1` | `<div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-[#E8F7F1] text-[#005B4F] mx-auto border border-[#005B4F]/20">` |
| 839 | hex | `#005B4F` | `<div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-[#E8F7F1] text-[#005B4F] mx-auto border border-[#005B4F]/20">` |
| 839 | hex | `#005B4F` | `<div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-[#E8F7F1] text-[#005B4F] mx-auto border border-[#005B4F]/20">` |
| 840 | hex | `#005B4F` | `<CheckCircle2 className="h-7 w-7 text-[#005B4F]" />` |
| 844 | hex | `#005B4F` | `<span className="font-mono text-[10px] font-bold text-[#005B4F] uppercase tracking-widest bg-[#E8F7F1] px-3 py-1 rounded-full border border-[#005B4F]/20">` |
| 844 | hex | `#E8F7F1` | `<span className="font-mono text-[10px] font-bold text-[#005B4F] uppercase tracking-widest bg-[#E8F7F1] px-3 py-1 rounded-full border border-[#005B4F]/20">` |
| 844 | hex | `#005B4F` | `<span className="font-mono text-[10px] font-bold text-[#005B4F] uppercase tracking-widest bg-[#E8F7F1] px-3 py-1 rounded-full border border-[#005B4F]/20">` |
| 847 | hex | `#0B1325` | `<h2 className="text-2xl font-serif font-bold text-[#0B1325] mt-2">` |
| 871 | hex | `#005B4F` | `className="w-full py-3.5 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-slate-50 font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex ` |
| 871 | hex | `#00473E` | `className="w-full py-3.5 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-slate-50 font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex ` |

### `src\components\home\HomeClinicalWorkbench.tsx` - 63

| Line | Kind | Value | Context |
|---:|---|---|---|
| 34 | hex | `#E4EAF2` | `<section id="interactive-workbench" className="ap-section ap-tint border-y border-[#E4EAF2]">` |
| 38 | hex | `#D0E1FD` | `<div className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1557D6] mb-3">` |
| 38 | hex | `#EEF6FF` | `<div className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1557D6] mb-3">` |
| 38 | hex | `#1557D6` | `<div className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1557D6] mb-3">` |
| 39 | hex | `#1557D6` | `<Terminal className="h-3.5 w-3.5 text-[#1557D6]" />` |
| 42 | hex | `#071A4A` | `<h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#071A4A] tracking-tight">` |
| 45 | hex | `#475569` | `<p className="text-base text-[#475569] mt-3">` |
| 53 | hex | `#071A4A` | `<div className="bg-[#071A4A] px-5 py-3.5 sm:px-7 flex flex-wrap items-center justify-between gap-3 text-white border-b border-white/10">` |
| 81 | hex | `#1557D6` | `? "border-[#1557D6] text-[#071A4A] bg-white tone-light card-light rounded-t-lg shadow-2xs"` |
| 81 | hex | `#071A4A` | `? "border-[#1557D6] text-[#071A4A] bg-white tone-light card-light rounded-t-lg shadow-2xs"` |
| 94 | hex | `#1557D6` | `? "border-[#1557D6] text-[#071A4A] bg-white tone-light card-light rounded-t-lg shadow-2xs"` |
| 94 | hex | `#071A4A` | `? "border-[#1557D6] text-[#071A4A] bg-white tone-light card-light rounded-t-lg shadow-2xs"` |
| 107 | hex | `#1557D6` | `? "border-[#1557D6] text-[#071A4A] bg-white tone-light card-light rounded-t-lg shadow-2xs"` |
| 107 | hex | `#071A4A` | `? "border-[#1557D6] text-[#071A4A] bg-white tone-light card-light rounded-t-lg shadow-2xs"` |
| 120 | hex | `#1557D6` | `? "border-[#1557D6] text-[#071A4A] bg-white tone-light card-light rounded-t-lg shadow-2xs"` |
| 120 | hex | `#071A4A` | `? "border-[#1557D6] text-[#071A4A] bg-white tone-light card-light rounded-t-lg shadow-2xs"` |
| 135 | hex | `#CBD5E1` | `<div className="lg:col-span-6 rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] p-4 text-xs">` |
| 135 | hex | `#F8FAFC` | `<div className="lg:col-span-6 rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] p-4 text-xs">` |
| 136 | hex | `#E2E8F0` | `<div className="flex items-center justify-between pb-2 mb-3 border-b border-[#E2E8F0]">` |
| 137 | hex | `#071A4A` | `<span className="font-mono font-bold text-[#071A4A] uppercase tracking-wider flex items-center gap-1.5">` |
| 138 | hex | `#1557D6` | `<FileText className="h-3.5 w-3.5 text-[#1557D6]" />` |
| 141 | hex | `#E2E8F0` | `<span className="rounded bg-[#E2E8F0] px-2 py-0.5 font-mono text-[10px] text-[#475569]">` |
| 141 | hex | `#475569` | `<span className="rounded bg-[#E2E8F0] px-2 py-0.5 font-mono text-[10px] text-[#475569]">` |
| 146 | hex | `#334155` | `<div className="font-mono text-[11.5px] leading-relaxed text-[#334155] bg-white p-3 rounded-lg border border-[#E2E8F0] space-y-2 tone-light card-light">` |
| 146 | hex | `#E2E8F0` | `<div className="font-mono text-[11.5px] leading-relaxed text-[#334155] bg-white p-3 rounded-lg border border-[#E2E8F0] space-y-2 tone-light card-light">` |
| 161 | hex | `#64748B` | `<div className="mt-3 text-[11px] text-[#64748B]">` |
| 168 | hex | `#071A4A` | `<h3 className="text-sm font-bold text-[#071A4A] flex items-center gap-2">` |
| 170 | hex | `#64748B` | `<span className="text-xs font-normal text-[#64748B]">(Tap to verify)</span>` |
| 199 | hex | `#E2E8F0` | `: "border-[#E2E8F0] bg-white text-[#64748B] tone-light card-light"` |
| 199 | hex | `#64748B` | `: "border-[#E2E8F0] bg-white text-[#64748B] tone-light card-light"` |
| 208 | hex | `#071A4A` | `<strong className="block text-xs font-bold text-[#071A4A]">` |
| 211 | hex | `#475569` | `<span className="block text-[11px] text-[#475569] mt-0.5">` |
| 253 | hex | `#EEF6FF` | `<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#EEF6FF] p-4 rounded-xl border border-[#D0E1FD]">` |
| 253 | hex | `#D0E1FD` | `<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#EEF6FF] p-4 rounded-xl border border-[#D0E1FD]">` |
| 255 | hex | `#1557D6` | `<span className="text-[11px] font-mono font-bold text-[#1557D6] uppercase tracking-wider block">` |
| 258 | hex | `#071A4A` | `<strong className="text-sm sm:text-base text-[#071A4A] font-bold">` |
| 262 | hex | `#CBD5E1` | `<div className="rounded-lg bg-white px-3 py-1.5 border border-[#CBD5E1] text-xs font-mono text-[#071A4A] shrink-0 tone-light card-light">` |
| 262 | hex | `#071A4A` | `<div className="rounded-lg bg-white px-3 py-1.5 border border-[#CBD5E1] text-xs font-mono text-[#071A4A] shrink-0 tone-light card-light">` |
| 268 | hex | `#CBD5E1` | `<div className="border border-[#CBD5E1] rounded-xl overflow-hidden bg-white tone-light card-light">` |
| 269 | hex | `#F8FAFC` | `<div className="bg-[#F8FAFC] px-4 py-2.5 border-b border-[#E2E8F0] text-xs font-bold text-[#071A4A] flex items-center justify-between">` |
| 269 | hex | `#E2E8F0` | `<div className="bg-[#F8FAFC] px-4 py-2.5 border-b border-[#E2E8F0] text-xs font-bold text-[#071A4A] flex items-center justify-between">` |
| 269 | hex | `#071A4A` | `<div className="bg-[#F8FAFC] px-4 py-2.5 border-b border-[#E2E8F0] text-xs font-bold text-[#071A4A] flex items-center justify-between">` |
| 271 | hex | `#64748B` | `<span className="font-mono text-[11px] text-[#64748B]">Primary System Organ Class Path</span>` |
| 309 | hex | `#1557D6` | `color: "border-[#1557D6] bg-[#EEF6FF] text-[#071A4A] font-bold",` |
| 309 | hex | `#EEF6FF` | `color: "border-[#1557D6] bg-[#EEF6FF] text-[#071A4A] font-bold",` |
| 309 | hex | `#071A4A` | `color: "border-[#1557D6] bg-[#EEF6FF] text-[#071A4A] font-bold",` |
| 321 | hex | `#475569` | `<span className="text-[11px] text-[#475569] block">{tier.name}</span>` |
| 325 | hex | `#334155` | `<span className="font-mono text-xs font-semibold px-2 py-1 rounded bg-white/90 text-[#334155] self-start sm:self-auto tone-light card-light">` |
| 346 | hex | `#071A4A` | `<h3 className="text-sm font-bold text-[#071A4A]">` |
| 349 | hex | `#64748B` | `<span className="text-xs text-[#64748B]">Represents 30–40% of Daily DSA Work</span>` |
| 393 | hex | `#071A4A` | `<h3 className="text-sm font-bold text-[#071A4A]">Zero-Tolerance Critical Error Taxonomy</h3>` |
| 394 | hex | `#64748B` | `<p className="text-xs text-[#64748B]">How pharmacovigilance quality managers evaluate candidate submissions</p>` |
| 407 | hex | `#071A4A` | `<strong className="block text-xs font-bold text-[#071A4A] mb-1">` |
| 410 | hex | `#475569` | `<p className="text-[11px] text-[#475569] leading-relaxed mb-3">` |
| 423 | hex | `#071A4A` | `<strong className="block text-xs font-bold text-[#071A4A] mb-1">` |
| 426 | hex | `#475569` | `<p className="text-[11px] text-[#475569] leading-relaxed mb-3">` |
| 439 | hex | `#071A4A` | `<strong className="block text-xs font-bold text-[#071A4A] mb-1">` |
| 442 | hex | `#475569` | `<p className="text-[11px] text-[#475569] leading-relaxed mb-3">` |
| 457 | hex | `#071A4A` | `<strong className="text-[#071A4A] font-bold">Ready to master production case processing?</strong>` |
| 466 | hex | `#1557D6` | `className="inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-200/80 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:border-[#1557D6] ho` |
| 466 | hex | `#1557D6` | `className="inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-200/80 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:border-[#1557D6] ho` |
| 473 | hex | `#071A4A` | `className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#071A4A] px-5 py-2 text-xs font-bold text-white hover:bg-[#1557D6] shadow-xs hover:shadow transition-all` |
| 473 | hex | `#1557D6` | `className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#071A4A] px-5 py-2 text-xs font-bold text-white hover:bg-[#1557D6] shadow-xs hover:shadow transition-all` |

### `src\components\acri\landing\AcriCertificationLanding.tsx` - 57

| Line | Kind | Value | Context |
|---:|---|---|---|
| 49 | hex | `#F7F9FC` | `<div className="min-h-screen bg-[#F7F9FC] text-slate-800 pb-16">` |
| 53 | hex | `#071A4A` | `<section className="bg-gradient-to-b from-[#071A4A] via-[#0A1D54] to-[#08173E] text-white pt-8 sm:pt-12 pb-12 sm:pb-16 border-b border-[#1E3A8A]">` |
| 53 | hex | `#0A1D54` | `<section className="bg-gradient-to-b from-[#071A4A] via-[#0A1D54] to-[#08173E] text-white pt-8 sm:pt-12 pb-12 sm:pb-16 border-b border-[#1E3A8A]">` |
| 53 | hex | `#08173E` | `<section className="bg-gradient-to-b from-[#071A4A] via-[#0A1D54] to-[#08173E] text-white pt-8 sm:pt-12 pb-12 sm:pb-16 border-b border-[#1E3A8A]">` |
| 53 | hex | `#1E3A8A` | `<section className="bg-gradient-to-b from-[#071A4A] via-[#0A1D54] to-[#08173E] text-white pt-8 sm:pt-12 pb-12 sm:pb-16 border-b border-[#1E3A8A]">` |
| 64 | hex | `#A78BFA` | `<span className="text-[#A78BFA] sm:text-[#B197FC]">Demonstrating readiness is another.</span>` |
| 64 | hex | `#B197FC` | `<span className="text-[#A78BFA] sm:text-[#B197FC]">Demonstrating readiness is another.</span>` |
| 93 | hex | `#7C3AED` | `className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-7 text-sm font-bold shadow-lg shadow-purple-900/` |
| 93 | hex | `#6D28D9` | `className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-7 text-sm font-bold shadow-lg shadow-purple-900/` |
| 118 | hex | `#0F172A` | `style={{ color: "#0F172A", backgroundColor: "#FFFFFF", WebkitTextFillColor: "currentColor" }}` |
| 121 | hex | `#071A4A` | `<span className="font-bold text-xs" style={{ color: "#071A4A", WebkitTextFillColor: "#071A4A" }}>ACRI</span>` |
| 121 | hex | `#071A4A` | `<span className="font-bold text-xs" style={{ color: "#071A4A", WebkitTextFillColor: "#071A4A" }}>ACRI</span>` |
| 122 | hex | `#64748B` | `<span className="text-[9px] sm:text-[10px] font-semibold" style={{ color: "#64748B", WebkitTextFillColor: "#64748B" }}>Role Readiness Score</span>` |
| 122 | hex | `#64748B` | `<span className="text-[9px] sm:text-[10px] font-semibold" style={{ color: "#64748B", WebkitTextFillColor: "#64748B" }}>Role Readiness Score</span>` |
| 139 | hex | `#10B981` | `stroke="#10B981"` |
| 145 | hex | `#071A4A` | `<span className="text-lg sm:text-xl font-bold font-mono" style={{ color: "#071A4A", WebkitTextFillColor: "#071A4A" }}>82%</span>` |
| 145 | hex | `#071A4A` | `<span className="text-lg sm:text-xl font-bold font-mono" style={{ color: "#071A4A", WebkitTextFillColor: "#071A4A" }}>82%</span>` |
| 150 | hex | `#065F46` | `style={{ backgroundColor: "#ECFDF5", color: "#065F46", WebkitTextFillColor: "#065F46" }}` |
| 150 | hex | `#065F46` | `style={{ backgroundColor: "#ECFDF5", color: "#065F46", WebkitTextFillColor: "#065F46" }}` |
| 158 | hex | `#334155` | `<div className="flex items-center gap-1.5" style={{ color: "#334155", WebkitTextFillColor: "#334155" }}>` |
| 158 | hex | `#334155` | `<div className="flex items-center gap-1.5" style={{ color: "#334155", WebkitTextFillColor: "#334155" }}>` |
| 162 | hex | `#334155` | `<div className="flex items-center gap-1.5" style={{ color: "#334155", WebkitTextFillColor: "#334155" }}>` |
| 162 | hex | `#334155` | `<div className="flex items-center gap-1.5" style={{ color: "#334155", WebkitTextFillColor: "#334155" }}>` |
| 166 | hex | `#334155` | `<div className="flex items-center gap-1.5" style={{ color: "#334155", WebkitTextFillColor: "#334155" }}>` |
| 166 | hex | `#334155` | `<div className="flex items-center gap-1.5" style={{ color: "#334155", WebkitTextFillColor: "#334155" }}>` |
| 170 | hex | `#94A3B8` | `<div className="flex items-center gap-1.5" style={{ color: "#94A3B8", WebkitTextFillColor: "#94A3B8" }}>` |
| 170 | hex | `#94A3B8` | `<div className="flex items-center gap-1.5" style={{ color: "#94A3B8", WebkitTextFillColor: "#94A3B8" }}>` |
| 187 | hex | `#071A4A` | `<h2 className="text-xl sm:text-2xl font-serif font-bold text-[#071A4A]">` |
| 197 | hex | `#071A4A` | `<h3 className="text-sm font-bold text-[#071A4A]">Students & Fresh Graduates</h3>` |
| 207 | hex | `#071A4A` | `<h3 className="text-sm font-bold text-[#071A4A]">Early-Career Professionals</h3>` |
| 217 | hex | `#071A4A` | `<h3 className="text-sm font-bold text-[#071A4A]">Career Switchers</h3>` |
| 231 | hex | `#071A4A` | `<h2 className="text-xl sm:text-2xl font-serif font-bold text-[#071A4A]">` |
| 251 | hex | `#071A4A` | `<h3 className="text-xs sm:text-sm font-bold text-[#071A4A]">PV Fundamentals</h3>` |
| 264 | hex | `#071A4A` | `<h3 className="text-xs sm:text-sm font-bold text-[#071A4A]">ICSR Processing</h3>` |
| 277 | hex | `#071A4A` | `<h3 className="text-xs sm:text-sm font-bold text-[#071A4A]">Case Assessment</h3>` |
| 290 | hex | `#071A4A` | `<h3 className="text-xs sm:text-sm font-bold text-[#071A4A]">Medical Interpretation</h3>` |
| 303 | hex | `#071A4A` | `<h3 className="text-xs sm:text-sm font-bold text-[#071A4A]">MedDRA and Coding</h3>` |
| 316 | hex | `#071A4A` | `<h3 className="text-xs sm:text-sm font-bold text-[#071A4A]">Documentation</h3>` |
| 329 | hex | `#071A4A` | `<h3 className="text-xs sm:text-sm font-bold text-[#071A4A]">Quality and Compliance</h3>` |
| 342 | hex | `#071A4A` | `<h3 className="text-xs sm:text-sm font-bold text-[#071A4A]">Analytical Reasoning</h3>` |
| 355 | hex | `#071A4A` | `<h3 className="text-xs sm:text-sm font-bold text-[#071A4A]">Situational Judgement</h3>` |
| 368 | hex | `#071A4A` | `<h2 className="text-xl sm:text-2xl font-serif font-bold text-[#071A4A]">` |
| 385 | hex | `#071A4A` | `<h3 className="text-xs sm:text-sm font-bold text-[#071A4A]">Apply for an invite</h3>` |
| 399 | hex | `#071A4A` | `<h3 className="text-xs sm:text-sm font-bold text-[#071A4A]">Get approved</h3>` |
| 413 | hex | `#071A4A` | `<h3 className="text-xs sm:text-sm font-bold text-[#071A4A]">Take the assessment</h3>` |
| 422 | hex | `#071A4A` | `<div className="h-8 w-8 rounded-full bg-[#071A4A] text-white font-mono font-bold text-xs flex items-center justify-center">` |
| 426 | hex | `#071A4A` | `<h3 className="text-xs sm:text-sm font-bold text-[#071A4A]">Get your results</h3>` |
| 445 | hex | `#1E3A8A` | `<div className="rounded-3xl border border-[#1E3A8A] bg-gradient-to-r from-[#071A4A] via-[#091D54] to-[#0A1B44] text-white p-6 sm:p-9 shadow-xl">` |
| 445 | hex | `#071A4A` | `<div className="rounded-3xl border border-[#1E3A8A] bg-gradient-to-r from-[#071A4A] via-[#091D54] to-[#0A1B44] text-white p-6 sm:p-9 shadow-xl">` |
| 445 | hex | `#091D54` | `<div className="rounded-3xl border border-[#1E3A8A] bg-gradient-to-r from-[#071A4A] via-[#091D54] to-[#0A1B44] text-white p-6 sm:p-9 shadow-xl">` |
| 445 | hex | `#0A1B44` | `<div className="rounded-3xl border border-[#1E3A8A] bg-gradient-to-r from-[#071A4A] via-[#091D54] to-[#0A1B44] text-white p-6 sm:p-9 shadow-xl">` |
| 461 | hex | `#071A4A` | `color: "#071A4A",` |
| 463 | hex | `#071A4A` | `WebkitTextFillColor: "#071A4A",` |
| 465 | hex | `#071A4A` | `className="inline-flex h-11 w-full sm:w-auto items-center justify-center rounded-full bg-white tone-light font-extrabold px-6 text-xs sm:text-sm text-[#071A4A] shadow-md transition` |
| 467 | hex | `#071A4A` | `<span style={{ color: "#071A4A", WebkitTextFillColor: "#071A4A" }}>` |
| 467 | hex | `#071A4A` | `<span style={{ color: "#071A4A", WebkitTextFillColor: "#071A4A" }}>` |
| 470 | hex | `#071A4A` | `<ArrowRight className="ml-2 h-4 w-4 shrink-0" style={{ color: "#071A4A" }} />` |

### `src\components\home\HomeEmployerTrustStrip.tsx` - 55

| Line | Kind | Value | Context |
|---:|---|---|---|
| 32 | hex | `#081F38` | `<span className="font-sans font-extrabold text-sm text-[#081F38] flex items-center gap-1.5">` |
| 53 | hex | `#0284C7` | `<span className="font-sans font-black text-sm text-[#0284C7] uppercase tracking-wider">` |
| 73 | hex | `#E11D48` | `<span className="font-sans font-extrabold text-sm text-[#E11D48] flex items-center gap-0.5">` |
| 74 | hex | `#1E40AF` | `<span className="text-[#1E40AF]">t</span>` |
| 75 | hex | `#E11D48` | `<span className="text-[#E11D48]">c</span>` |
| 76 | hex | `#0284C7` | `<span className="text-[#0284C7]">s</span>` |
| 95 | hex | `#081F38` | `<span className="font-serif font-black text-sm tracking-tight text-[#081F38]">` |
| 115 | hex | `#E11D48` | `<span className="font-sans font-bold text-xs text-[#E11D48] flex items-center gap-1">` |
| 136 | hex | `#111827` | `<span className="font-sans font-black text-sm text-[#111827] flex items-center gap-0.5">` |
| 137 | hex | `#9333EA` | `accenture<span className="text-[#9333EA] font-extrabold text-base leading-none">&gt;</span>` |
| 155 | hex | `#F8FAFC` | `<section className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-[#E2E8F0] tone-light card-light" id="employer-insights">` |
| 155 | hex | `#E2E8F0` | `<section className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-[#E2E8F0] tone-light card-light" id="employer-insights">` |
| 160 | hex | `#D0E1FD` | `<div className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-3.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#2563EB]` |
| 160 | hex | `#EEF6FF` | `<div className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-3.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#2563EB]` |
| 160 | hex | `#2563EB` | `<div className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-3.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#2563EB]` |
| 161 | hex | `#2563EB` | `<ShieldCheck className="h-3.5 w-3.5 text-[#2563EB]" />` |
| 164 | hex | `#081F38` | `<h2 className="text-3xl sm:text-4xl lg:text-[44px] font-serif font-bold text-[#081F38] tracking-tight leading-tight">` |
| 167 | hex | `#64748B` | `<p className="mt-2 text-sm sm:text-base text-[#64748B] max-w-2xl leading-relaxed">` |
| 174 | hex | `#2563EB` | `className="inline-flex items-center gap-2 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-3 text-xs sm:text-sm font-bold transition-all shadow-sm shrink-0 self-star` |
| 174 | hex | `#1D4ED8` | `className="inline-flex items-center gap-2 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-3 text-xs sm:text-sm font-bold transition-all shadow-sm shrink-0 self-star` |
| 182 | hex | `#E2E8F0` | `<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs tone-light card-light">` |
| 184 | hex | `#EEF6FF` | `<div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#EEF6FF] text-[#2563EB]">` |
| 184 | hex | `#2563EB` | `<div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#EEF6FF] text-[#2563EB]">` |
| 188 | hex | `#081F38` | `<div className="font-mono text-xs font-bold text-[#081F38]">2,000+ JDs Mapped</div>` |
| 189 | hex | `#64748B` | `<div className="text-[11px] text-[#64748B]">Across 180+ Top CROs & Sponsors</div>` |
| 193 | hex | `#E2E8F0` | `<div className="flex items-center gap-3 px-2 border-t sm:border-t-0 sm:border-l border-[#E2E8F0] pt-2 sm:pt-0">` |
| 198 | hex | `#081F38` | `<div className="font-mono text-xs font-bold text-[#081F38]">₹3.80 – ₹6.50 LPA</div>` |
| 199 | hex | `#64748B` | `<div className="text-[11px] text-[#64748B]">Median Entry-Level CTC Range</div>` |
| 203 | hex | `#E2E8F0` | `<div className="flex items-center gap-3 px-2 border-t sm:border-t-0 sm:border-l border-[#E2E8F0] pt-2 sm:pt-0">` |
| 204 | hex | `#EEF6FF` | `<div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#EEF6FF] text-[#2563EB]">` |
| 204 | hex | `#2563EB` | `<div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#EEF6FF] text-[#2563EB]">` |
| 208 | hex | `#081F38` | `<div className="font-mono text-xs font-bold text-[#081F38]">Practical Work Samples</div>` |
| 209 | hex | `#64748B` | `<div className="text-[11px] text-[#64748B]">#1 Selection Factor in Technical Rounds</div>` |
| 219 | hex | `#E2E8F0` | `className="flex flex-col justify-between rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-xs hover:border-[#2563EB]/40 hover:shadow-xl transition-all duration-300 tone-light` |
| 219 | hex | `#2563EB` | `className="flex flex-col justify-between rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-xs hover:border-[#2563EB]/40 hover:shadow-xl transition-all duration-300 tone-light` |
| 223 | hex | `#F1F5F9` | `<div className="flex items-center justify-between gap-3 border-b border-[#F1F5F9] pb-3.5">` |
| 227 | hex | `#64748B` | `<span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#64748B] bg-[#F8FAFC] px-2 py-0.5 rounded border border-slate-200/60">` |
| 227 | hex | `#F8FAFC` | `<span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#64748B] bg-[#F8FAFC] px-2 py-0.5 rounded border border-slate-200/60">` |
| 235 | hex | `#081F38` | `<h3 className="font-sans text-base font-bold text-[#081F38] leading-snug group-hover:text-[#2563EB] transition-colors">` |
| 235 | hex | `#2563EB` | `<h3 className="font-sans text-base font-bold text-[#081F38] leading-snug group-hover:text-[#2563EB] transition-colors">` |
| 239 | hex | `#2563EB` | `<span className="font-bold text-[#2563EB] bg-[#EEF6FF] border border-[#D0E1FD] px-2.5 py-0.5 rounded-md">` |
| 239 | hex | `#EEF6FF` | `<span className="font-bold text-[#2563EB] bg-[#EEF6FF] border border-[#D0E1FD] px-2.5 py-0.5 rounded-md">` |
| 239 | hex | `#D0E1FD` | `<span className="font-bold text-[#2563EB] bg-[#EEF6FF] border border-[#D0E1FD] px-2.5 py-0.5 rounded-md">` |
| 242 | hex | `#64748B` | `<span className="text-[#64748B] text-[11px]">` |
| 250 | hex | `#94A3B8` | `<div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">` |
| 253 | hex | `#334155` | `<ul className="space-y-1.5 text-xs text-[#334155]">` |
| 256 | hex | `#2563EB` | `<CheckCircle2 className="h-3.5 w-3.5 text-[#2563EB] shrink-0 mt-0.5" />` |
| 265 | hex | `#94A3B8` | `<div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] mb-1.5">` |
| 272 | hex | `#F1F5F9` | `className="inline-flex items-center rounded-md bg-[#F1F5F9] px-2 py-0.5 text-[10.5px] font-mono font-semibold text-[#081F38] border border-slate-200/80"` |
| 272 | hex | `#081F38` | `className="inline-flex items-center rounded-md bg-[#F1F5F9] px-2 py-0.5 text-[10.5px] font-mono font-semibold text-[#081F38] border border-slate-200/80"` |
| 290 | hex | `#F1F5F9` | `<div className="pt-4 mt-5 border-t border-[#F1F5F9] flex items-center justify-between">` |
| 293 | hex | `#2563EB` | `className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:text-[#081F38] transition-colors"` |
| 293 | hex | `#081F38` | `className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:text-[#081F38] transition-colors"` |
| 307 | hex | `#E2E8F0` | `<div className="mt-10 rounded-xl border border-[#E2E8F0] bg-white p-4 text-center text-xs text-[#64748B] tone-light card-light max-w-4xl mx-auto shadow-2xs">` |
| 307 | hex | `#64748B` | `<div className="mt-10 rounded-xl border border-[#E2E8F0] bg-white p-4 text-center text-xs text-[#64748B] tone-light card-light max-w-4xl mx-auto shadow-2xs">` |

### `src\components\landing\Pricing.tsx` - 51

| Line | Kind | Value | Context |
|---:|---|---|---|
| 36 | hex | `#F7F5F0` | `className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#F7F5F0] tone-light text-[#1A1A1A] border-b border-stone-200 relative overflow-hidden"` |
| 36 | hex | `#1A1A1A` | `className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#F7F5F0] tone-light text-[#1A1A1A] border-b border-stone-200 relative overflow-hidden"` |
| 41 | hex | `#1B3F8B` | `className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 -z-10 w-[800px] h-[500px] bg-gradient-to-b from-[#1B3F8B]/5 to-transparent blur-3xl rounded-full"` |
| 52 | hex | `#1A1A1A` | `className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#1A1A1A] tracking-tight leading-[1.15]"` |
| 55 | hex | `#1B3F8B` | `<span className="italic text-[#1B3F8B]">hiring preparation.</span>` |
| 70 | hex | `#1B3F8B` | `? "bg-[#1B3F8B] text-white shadow-md"` |
| 73 | hex | `#1B3F8B` | `style={billingCycle === "full" ? { color: "#FFFFFF", backgroundColor: "#1B3F8B" } : undefined}` |
| 81 | hex | `#1B3F8B` | `? "bg-[#1B3F8B] text-white shadow-md"` |
| 84 | hex | `#1B3F8B` | `style={billingCycle === "part" ? { color: "#FFFFFF", backgroundColor: "#1B3F8B" } : undefined}` |
| 102 | hex | `#1B3F8B` | `className="rounded-3xl border border-stone-300 bg-white tone-light card-light p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-xl hover:border-[#1B3F8B]/40` |
| 111 | hex | `#1A1A1A` | `<h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">Foundation Track</h3>` |
| 116 | hex | `#1A1A1A` | `<span className="font-serif text-4xl font-bold text-[#1A1A1A]">{essentialPrice}</span>` |
| 154 | hex | `#1C1917` | `style={{ color: "#FFFFFF", backgroundColor: "#1C1917" }}` |
| 166 | hex | `#1B3F8B` | `className="relative rounded-3xl border-2 border-[#1B3F8B] bg-white tone-light card-light p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-2xl ring-4 ring-[#1B3F8B]/10 lg:-` |
| 166 | hex | `#1B3F8B` | `className="relative rounded-3xl border-2 border-[#1B3F8B] bg-white tone-light card-light p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-2xl ring-4 ring-[#1B3F8B]/10 lg:-` |
| 169 | hex | `#1B3F8B` | `<BorderBeam colorFrom="#1B3F8B" colorTo="#8A6D1F" duration={8} delay={0} borderWidth={2} />` |
| 169 | hex | `#8A6D1F` | `<BorderBeam colorFrom="#1B3F8B" colorTo="#8A6D1F" duration={8} delay={0} borderWidth={2} />` |
| 174 | hex | `#1B3F8B` | `<div className="bg-[#1B3F8B] text-white font-mono text-[10px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-sk` |
| 183 | hex | `#1B3F8B` | `<span className="inline-block px-3 py-1 rounded-full bg-[#1B3F8B]/10 text-[#1B3F8B] font-mono text-[10px] font-bold uppercase tracking-wider border border-[#1B3F8B]/20">` |
| 183 | hex | `#1B3F8B` | `<span className="inline-block px-3 py-1 rounded-full bg-[#1B3F8B]/10 text-[#1B3F8B] font-mono text-[10px] font-bold uppercase tracking-wider border border-[#1B3F8B]/20">` |
| 183 | hex | `#1B3F8B` | `<span className="inline-block px-3 py-1 rounded-full bg-[#1B3F8B]/10 text-[#1B3F8B] font-mono text-[10px] font-bold uppercase tracking-wider border border-[#1B3F8B]/20">` |
| 188 | hex | `#1A1A1A` | `<h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">Recruiter Track</h3>` |
| 193 | hex | `#1B3F8B` | `<span className="font-serif text-4xl sm:text-5xl font-bold text-[#1B3F8B]">{careerPrice}</span>` |
| 205 | hex | `#0F1A34` | `<div className="bg-[#0F1A34] border border-sky-400/40 p-4 rounded-2xl text-xs font-mono font-bold leading-snug shadow-md flex items-center gap-2">` |
| 213 | hex | `#1A1A1A` | `<li className="flex items-start gap-2.5 font-bold text-[#1A1A1A]">` |
| 214 | hex | `#1B3F8B` | `<Check className="h-4 w-4 text-[#1B3F8B] shrink-0 mt-0.5" />` |
| 218 | hex | `#1B3F8B` | `<Check className="h-4 w-4 text-[#1B3F8B] shrink-0 mt-0.5" />` |
| 221 | hex | `#1B3F8B` | `<li className="flex items-start gap-2.5 font-bold text-[#1B3F8B]">` |
| 222 | hex | `#1B3F8B` | `<Check className="h-4 w-4 text-[#1B3F8B] shrink-0 mt-0.5" />` |
| 226 | hex | `#1B3F8B` | `<Check className="h-4 w-4 text-[#1B3F8B] shrink-0 mt-0.5" />` |
| 230 | hex | `#1B3F8B` | `<Check className="h-4 w-4 text-[#1B3F8B] shrink-0 mt-0.5" />` |
| 242 | hex | `#1B3F8B` | `className="h-14 w-full flex items-center justify-center gap-2 text-base font-extrabold text-white bg-[#1B3F8B] hover:bg-[#153270] rounded-xl shadow-lg shadow-[#1B3F8B]/20 transitio` |
| 242 | hex | `#153270` | `className="h-14 w-full flex items-center justify-center gap-2 text-base font-extrabold text-white bg-[#1B3F8B] hover:bg-[#153270] rounded-xl shadow-lg shadow-[#1B3F8B]/20 transitio` |
| 242 | hex | `#1B3F8B` | `className="h-14 w-full flex items-center justify-center gap-2 text-base font-extrabold text-white bg-[#1B3F8B] hover:bg-[#153270] rounded-xl shadow-lg shadow-[#1B3F8B]/20 transitio` |
| 243 | hex | `#1B3F8B` | `style={{ color: "#FFFFFF", backgroundColor: "#1B3F8B" }}` |
| 277 | hex | `#1A1A1A` | `<h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">1-on-1 Track</h3>` |
| 294 | hex | `#241300` | `<div className="bg-[#241300] border border-amber-500/50 p-4 rounded-2xl text-xs font-mono font-bold leading-snug shadow-md flex items-center gap-2">` |
| 302 | hex | `#1A1A1A` | `<li className="flex items-start gap-2.5 font-bold text-[#1A1A1A]">` |
| 328 | hex | `#0C0A09` | `style={{ color: "#0C0A09", backgroundColor: "#F59E0B" }}` |
| 330 | hex | `#0C0A09` | `<span style={{ color: "#0C0A09" }}>Book My Recruiter Review</span>` |
| 360 | hex | `#1B3F8B` | `<th className="py-3 px-4 font-mono font-bold text-[#1B3F8B] uppercase text-center bg-[#1B3F8B]/5">Recruiter Track</th>` |
| 360 | hex | `#1B3F8B` | `<th className="py-3 px-4 font-mono font-bold text-[#1B3F8B] uppercase text-center bg-[#1B3F8B]/5">Recruiter Track</th>` |
| 368 | hex | `#1B3F8B` | `<td className="py-3 px-4 text-center text-emerald-600 font-bold bg-[#1B3F8B]/5">✓ Included</td>` |
| 374 | hex | `#1B3F8B` | `<td className="py-3 px-4 text-center text-emerald-600 font-bold bg-[#1B3F8B]/5">✓ Included</td>` |
| 380 | hex | `#1B3F8B` | `<td className="py-3 px-4 text-center text-emerald-600 font-bold bg-[#1B3F8B]/5">✓ Included</td>` |
| 386 | hex | `#1B3F8B` | `<td className="py-3 px-4 text-center text-emerald-600 font-bold bg-[#1B3F8B]/5">✓ Included</td>` |
| 392 | hex | `#1B3F8B` | `<td className="py-3 px-4 text-center text-[#1B3F8B] font-extrabold bg-[#1B3F8B]/5">✓ 7-Day Review SLA</td>` |
| 392 | hex | `#1B3F8B` | `<td className="py-3 px-4 text-center text-[#1B3F8B] font-extrabold bg-[#1B3F8B]/5">✓ 7-Day Review SLA</td>` |
| 398 | hex | `#1B3F8B` | `<td className="py-3 px-4 text-center text-stone-400 bg-[#1B3F8B]/5">—</td>` |
| 404 | hex | `#1B3F8B` | `<td className="py-3 px-4 text-center text-stone-400 bg-[#1B3F8B]/5">—</td>` |
| 421 | hex | `#1A1A1A` | `<h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1A1A]">` |

### `src\design-system\tokens\colors.css` - 51

| Line | Kind | Value | Context |
|---:|---|---|---|
| 11 | hex | `#071A4A` | `--arzon-navy-950: #071A4A;` |
| 12 | hex | `#0B255A` | `--arzon-navy-900: #0B255A;` |
| 13 | hex | `#1B4F91` | `--arzon-blue-700: #1B4F91;` |
| 14 | hex | `#2563EB` | `--arzon-blue-600: #2563EB;` |
| 15 | hex | `#3B82F6` | `--arzon-blue-500: #3B82F6;` |
| 16 | hex | `#EFF6FF` | `--arzon-blue-100: #EFF6FF;` |
| 17 | hex | `#0F766E` | `--arzon-teal-700: #0F766E;` |
| 18 | hex | `#ECFDF5` | `--arzon-teal-100: #ECFDF5;` |
| 21 | hex | `#FFFFFF` | `--arzon-white: #FFFFFF;` |
| 22 | hex | `#F8FAFC` | `--arzon-surface: #F8FAFC;` |
| 23 | hex | `#F1F5F9` | `--arzon-surface-blue: #F1F5F9;` |
| 24 | hex | `#F8FAFC` | `--arzon-surface-subtle: #F8FAFC;` |
| 27 | hex | `#111827` | `--arzon-ink: #111827;` |
| 28 | hex | `#071A4A` | `--arzon-ink-strong: #071A4A;` |
| 29 | hex | `#475569` | `--arzon-ink-soft: #475569;` |
| 30 | hex | `#64748B` | `--arzon-ink-muted: #64748B;` |
| 31 | hex | `#FFFFFF` | `--arzon-ink-inverse: #FFFFFF;` |
| 34 | hex | `#E2E8F0` | `--arzon-border: #E2E8F0;` |
| 35 | hex | `#CBD5E1` | `--arzon-border-strong: #CBD5E1;` |
| 38 | hex | `#15803D` | `--arzon-success: #15803D;` |
| 39 | hex | `#F0FDF4` | `--arzon-success-bg: #F0FDF4;` |
| 40 | hex | `#BBF7D0` | `--arzon-success-border: #BBF7D0;` |
| 41 | hex | `#B45309` | `--arzon-warning: #B45309;` |
| 42 | hex | `#FFFBEB` | `--arzon-warning-bg: #FFFBEB;` |
| 43 | hex | `#FDE68A` | `--arzon-warning-border: #FDE68A;` |
| 44 | hex | `#B91C1C` | `--arzon-error: #B91C1C;` |
| 45 | hex | `#FEF2F2` | `--arzon-error-bg: #FEF2F2;` |
| 46 | hex | `#FECACA` | `--arzon-error-border: #FECACA;` |
| 47 | hex | `#1D4ED8` | `--arzon-info: #1D4ED8;` |
| 48 | hex | `#EFF6FF` | `--arzon-info-bg: #EFF6FF;` |
| 49 | hex | `#BFDBFE` | `--arzon-info-border: #BFDBFE;` |
| 57 | rgba | `rgba(7, 26, 74, 0.64)` | `--color-bg-overlay: rgba(7, 26, 74, 0.64);` |
| 63 | rgba | `rgba(255,255,255,0.68)` | `--color-text-inverse-muted: rgba(255,255,255,0.68);` |
| 68 | hex | `#064E3B` | `--color-brand-green-deep: #064E3B;` |
| 77 | hex | `#F0FDFA` | `--arzon-light-mint: #F0FDFA;` |
| 81 | hex | `#EEF2F7` | `--arzon-soft-border: #EEF2F7;` |
| 82 | hex | `#F3A51C` | `--arzon-warning-legacy: #F3A51C;` |
| 85 | hex | `#166534` | `--color-readiness-industry-text: #166534;` |
| 89 | hex | `#78350F` | `--color-readiness-near-text: #78350F;` |
| 93 | hex | `#7F1D1D` | `--color-readiness-building-text: #7F1D1D;` |
| 112 | hex | `#F1F5F9` | `--color-divider: #F1F5F9;` |
| 120 | hex | `#94A3B8` | `--color-flag-inactive: #94A3B8;` |
| 123 | hex | `#FFFFFF` | `--color-answer-selected-text: #FFFFFF;` |
| 129 | hex | `#F8FAFF` | `--color-ai-panel-bg: #F8FAFF;` |
| 130 | hex | `#DBEAFE` | `--color-ai-panel-border: #DBEAFE;` |
| 131 | hex | `#EFF6FF` | `--color-ai-bubble-bg: #EFF6FF;` |
| 132 | hex | `#1E40AF` | `--color-ai-bubble-text: #1E40AF;` |
| 135 | hex | `#FFFFFF` | `--color-cert-bg: #FFFFFF;` |
| 136 | hex | `#A16207` | `--color-cert-gold: #A16207;` |
| 137 | hex | `#FEF3C7` | `--color-cert-gold-light: #FEF3C7;` |
| 138 | hex | `#D4A72C` | `--color-cert-border: #D4A72C;` |

### `src\components\home\HomeProgrammesShowcase.tsx` - 49

| Line | Kind | Value | Context |
|---:|---|---|---|
| 18 | hex | `#F8FAFC` | `<section id="programmes" className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-slate-200/80 tone-light card-light">` |
| 23 | hex | `#1557D6` | `<div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#1557D6] mb-3">` |
| 24 | hex | `#1557D6` | `<BookOpen className="h-3.5 w-3.5 text-[#1557D6]" />` |
| 27 | hex | `#071A4A` | `<h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#071A4A] leading-[1.12]">` |
| 29 | hex | `#1557D6` | `<span className="text-[#1557D6]">Verifiable Outcomes.</span>` |
| 38 | hex | `#1557D6` | `<span className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-blue-50 text-[#1557D6]">` |
| 54 | hex | `#071A4A` | `className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-xs font-bold text-[#071A4A] hover:bg-slate-50 hover:border-slate-400 transi` |
| 70 | hex | `#1557D6` | `<div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-[#1557D6] shrink-0">` |
| 74 | hex | `#071A4A` | `<h3 className="text-xl sm:text-2xl font-bold text-[#071A4A] leading-snug">` |
| 84 | hex | `#1557D6` | `<span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 font-mono text-xs font-bold text-[#1557D6]">` |
| 101 | hex | `#1557D6` | `<CheckCircle2 className="h-4 w-4 text-[#1557D6] shrink-0 mt-0.5" />` |
| 105 | hex | `#1557D6` | `<CheckCircle2 className="h-4 w-4 text-[#1557D6] shrink-0 mt-0.5" />` |
| 109 | hex | `#1557D6` | `<CheckCircle2 className="h-4 w-4 text-[#1557D6] shrink-0 mt-0.5" />` |
| 113 | hex | `#1557D6` | `<CheckCircle2 className="h-4 w-4 text-[#1557D6] shrink-0 mt-0.5" />` |
| 154 | hex | `#071A4A` | `className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#071A4A] py-3.5 px-6 text-xs font-bold text-white hover:bg-[#1557D6] transition-all shadow-xs"` |
| 154 | hex | `#1557D6` | `className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#071A4A] py-3.5 px-6 text-xs font-bold text-white hover:bg-[#1557D6] transition-all shadow-xs"` |
| 168 | hex | `#1557D6` | `<div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-[#1557D6] shrink-0">` |
| 172 | hex | `#071A4A` | `<h3 className="text-xl sm:text-2xl font-bold text-[#071A4A] leading-snug">` |
| 182 | hex | `#1557D6` | `<span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 font-mono text-xs font-bold text-[#1557D6]">` |
| 199 | hex | `#1557D6` | `<CheckCircle2 className="h-4 w-4 text-[#1557D6] shrink-0 mt-0.5" />` |
| 203 | hex | `#1557D6` | `<CheckCircle2 className="h-4 w-4 text-[#1557D6] shrink-0 mt-0.5" />` |
| 207 | hex | `#1557D6` | `<CheckCircle2 className="h-4 w-4 text-[#1557D6] shrink-0 mt-0.5" />` |
| 211 | hex | `#1557D6` | `<CheckCircle2 className="h-4 w-4 text-[#1557D6] shrink-0 mt-0.5" />` |
| 252 | hex | `#071A4A` | `className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#071A4A] py-3.5 px-6 text-xs font-bold text-white hover:bg-[#1557D6] transition-all shadow-xs"` |
| 252 | hex | `#1557D6` | `className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#071A4A] py-3.5 px-6 text-xs font-bold text-white hover:bg-[#1557D6] transition-all shadow-xs"` |
| 266 | hex | `#1557D6` | `<div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-[#1557D6] shrink-0">` |
| 270 | hex | `#071A4A` | `<h3 className="text-xl sm:text-2xl font-bold text-[#071A4A] leading-snug">` |
| 280 | hex | `#1557D6` | `<span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 font-mono text-xs font-bold text-[#1557D6]">` |
| 297 | hex | `#1557D6` | `<CheckCircle2 className="h-4 w-4 text-[#1557D6] shrink-0 mt-0.5" />` |
| 301 | hex | `#1557D6` | `<CheckCircle2 className="h-4 w-4 text-[#1557D6] shrink-0 mt-0.5" />` |
| 305 | hex | `#1557D6` | `<CheckCircle2 className="h-4 w-4 text-[#1557D6] shrink-0 mt-0.5" />` |
| 309 | hex | `#1557D6` | `<CheckCircle2 className="h-4 w-4 text-[#1557D6] shrink-0 mt-0.5" />` |
| 350 | hex | `#071A4A` | `className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#071A4A] py-3.5 px-6 text-xs font-bold text-white hover:bg-[#1557D6] transition-all shadow-xs"` |
| 350 | hex | `#1557D6` | `className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#071A4A] py-3.5 px-6 text-xs font-bold text-white hover:bg-[#1557D6] transition-all shadow-xs"` |
| 364 | hex | `#1557D6` | `<div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-[#1557D6] shrink-0">` |
| 368 | hex | `#071A4A` | `<h3 className="text-xl sm:text-2xl font-bold text-[#071A4A] leading-snug">` |
| 378 | hex | `#1557D6` | `<span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 font-mono text-xs font-bold text-[#1557D6]">` |
| 395 | hex | `#1557D6` | `<CheckCircle2 className="h-4 w-4 text-[#1557D6] shrink-0 mt-0.5" />` |
| 399 | hex | `#1557D6` | `<CheckCircle2 className="h-4 w-4 text-[#1557D6] shrink-0 mt-0.5" />` |
| 403 | hex | `#1557D6` | `<CheckCircle2 className="h-4 w-4 text-[#1557D6] shrink-0 mt-0.5" />` |
| 407 | hex | `#1557D6` | `<CheckCircle2 className="h-4 w-4 text-[#1557D6] shrink-0 mt-0.5" />` |
| 448 | hex | `#071A4A` | `className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#071A4A] py-3.5 px-6 text-xs font-bold text-white hover:bg-[#1557D6] transition-all shadow-xs"` |
| 448 | hex | `#1557D6` | `className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#071A4A] py-3.5 px-6 text-xs font-bold text-white hover:bg-[#1557D6] transition-all shadow-xs"` |
| 460 | hex | `#1557D6` | `<div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200/80 flex items-center justify-center text-[#1557D6] shrink-0">` |
| 464 | hex | `#071A4A` | `<strong className="block text-sm font-bold text-[#071A4A]">Role-relevant curriculum</strong>` |
| 469 | hex | `#1557D6` | `<div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200/80 flex items-center justify-center text-[#1557D6] shrink-0">` |
| 473 | hex | `#071A4A` | `<strong className="block text-sm font-bold text-[#071A4A]">Practical work samples</strong>` |
| 478 | hex | `#1557D6` | `<div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200/80 flex items-center justify-center text-[#1557D6] shrink-0">` |
| 482 | hex | `#071A4A` | `<strong className="block text-sm font-bold text-[#071A4A]">Clear programme details</strong>` |

### `src\components\landing\StudentProblemSolverWizard.tsx` - 46

| Line | Kind | Value | Context |
|---:|---|---|---|
| 102 | hex | `#FAF9F6` | `<section id="problem-solver-wizard" className="py-12 sm:py-20 bg-[#FAF9F6] border-b border-stone-200 relative overflow-hidden">` |
| 109 | hex | `#1B3F8B` | `<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1B3F8B] font-mono text-xs font-bold uppercase tracking-wider">` |
| 135 | hex | `#1B3F8B` | `? "bg-[#1B3F8B] text-white font-bold shadow-sm"` |
| 152 | hex | `#1B3F8B` | `<span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">` |
| 169 | hex | `#1B3F8B` | `? "border-[#1B3F8B] bg-blue-50/60 ring-2 ring-[#1B3F8B]/20"` |
| 169 | hex | `#1B3F8B` | `? "border-[#1B3F8B] bg-blue-50/60 ring-2 ring-[#1B3F8B]/20"` |
| 184 | hex | `#1B3F8B` | `isSelected ? "border-[#1B3F8B] bg-[#1B3F8B] text-white" : "border-stone-300 bg-white"` |
| 184 | hex | `#1B3F8B` | `isSelected ? "border-[#1B3F8B] bg-[#1B3F8B] text-white" : "border-stone-300 bg-white"` |
| 196 | hex | `#1B3F8B` | `className="inline-flex items-center gap-2 bg-[#1B3F8B] hover:bg-[#153270] text-white font-mono text-xs font-bold px-6 py-3 rounded-xl transition-colors shadow-sm"` |
| 196 | hex | `#153270` | `className="inline-flex items-center gap-2 bg-[#1B3F8B] hover:bg-[#153270] text-white font-mono text-xs font-bold px-6 py-3 rounded-xl transition-colors shadow-sm"` |
| 209 | hex | `#1B3F8B` | `<span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">` |
| 226 | hex | `#1B3F8B` | `? "border-[#1B3F8B] bg-blue-50/60 ring-2 ring-[#1B3F8B]/20"` |
| 226 | hex | `#1B3F8B` | `? "border-[#1B3F8B] bg-blue-50/60 ring-2 ring-[#1B3F8B]/20"` |
| 233 | hex | `#1B3F8B` | `isSelected ? "border-[#1B3F8B] bg-[#1B3F8B] text-white" : "border-stone-300"` |
| 233 | hex | `#1B3F8B` | `isSelected ? "border-[#1B3F8B] bg-[#1B3F8B] text-white" : "border-stone-300"` |
| 253 | hex | `#1B3F8B` | `className="inline-flex items-center gap-2 bg-[#1B3F8B] hover:bg-[#153270] text-white font-mono text-xs font-bold px-6 py-3 rounded-xl transition-colors shadow-sm"` |
| 253 | hex | `#153270` | `className="inline-flex items-center gap-2 bg-[#1B3F8B] hover:bg-[#153270] text-white font-mono text-xs font-bold px-6 py-3 rounded-xl transition-colors shadow-sm"` |
| 266 | hex | `#1B3F8B` | `<span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">` |
| 283 | hex | `#1B3F8B` | `? "border-[#1B3F8B] bg-blue-50/60 ring-2 ring-[#1B3F8B]/20"` |
| 283 | hex | `#1B3F8B` | `? "border-[#1B3F8B] bg-blue-50/60 ring-2 ring-[#1B3F8B]/20"` |
| 290 | hex | `#1B3F8B` | `isSelected ? "border-[#1B3F8B] bg-[#1B3F8B] text-white" : "border-stone-300"` |
| 290 | hex | `#1B3F8B` | `isSelected ? "border-[#1B3F8B] bg-[#1B3F8B] text-white" : "border-stone-300"` |
| 310 | hex | `#1B3F8B` | `className="inline-flex items-center gap-2 bg-[#1B3F8B] hover:bg-[#153270] text-white font-mono text-xs font-bold px-6 py-3 rounded-xl transition-colors shadow-sm"` |
| 310 | hex | `#153270` | `className="inline-flex items-center gap-2 bg-[#1B3F8B] hover:bg-[#153270] text-white font-mono text-xs font-bold px-6 py-3 rounded-xl transition-colors shadow-sm"` |
| 323 | hex | `#1B3F8B` | `<span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">` |
| 340 | hex | `#1B3F8B` | `? "border-[#1B3F8B] bg-blue-50/60 ring-2 ring-[#1B3F8B]/20"` |
| 340 | hex | `#1B3F8B` | `? "border-[#1B3F8B] bg-blue-50/60 ring-2 ring-[#1B3F8B]/20"` |
| 350 | hex | `#1B3F8B` | `isSelected ? "border-[#1B3F8B] bg-[#1B3F8B] text-white" : "border-stone-300"` |
| 350 | hex | `#1B3F8B` | `isSelected ? "border-[#1B3F8B] bg-[#1B3F8B] text-white" : "border-stone-300"` |
| 368 | hex | `#1B3F8B` | `className="inline-flex items-center gap-2 bg-[#1B3F8B] hover:bg-[#153270] text-white font-mono text-xs font-bold px-7 py-3 rounded-xl transition-colors shadow-md"` |
| 368 | hex | `#153270` | `className="inline-flex items-center gap-2 bg-[#1B3F8B] hover:bg-[#153270] text-white font-mono text-xs font-bold px-7 py-3 rounded-xl transition-colors shadow-md"` |
| 383 | hex | `#1B3F8B` | `<div className="flex items-center gap-2 font-mono text-xs font-bold text-[#1B3F8B]">` |
| 427 | hex | `#1B3F8B` | `<Building2 className="h-4 w-4 text-[#1B3F8B]" />` |
| 428 | hex | `#1B3F8B` | `<span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase">` |
| 455 | hex | `#1B3F8B` | `<span className="text-[#1B3F8B] font-bold">•</span>` |
| 467 | hex | `#1B3F8B` | `className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[#1B3F8B] hover:underline"` |
| 478 | hex | `#1B3F8B` | `<BookOpen className="h-4 w-4 text-[#1B3F8B]" />` |
| 479 | hex | `#1B3F8B` | `<span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase">` |
| 492 | hex | `#1B3F8B` | `<span key={idx} className="font-mono text-[11px] px-2 py-0.5 rounded bg-blue-50 border border-blue-200 text-[#1B3F8B] font-bold">` |
| 506 | hex | `#1B3F8B` | `<span className="text-[#1B3F8B] font-bold">•</span>` |
| 517 | hex | `#1B3F8B` | `className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[#1B3F8B] hover:underline"` |
| 528 | hex | `#1B3F8B` | `<Award className="h-4 w-4 text-[#1B3F8B]" />` |
| 529 | hex | `#1B3F8B` | `<span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase">` |
| 560 | hex | `#1B3F8B` | `className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[#1B3F8B] hover:underline"` |
| 569 | hex | `#1B3F8B` | `<div className="rounded-3xl bg-gradient-to-br from-[#1B3F8B] to-[#0F2860] text-white p-6 sm:p-8 space-y-4 shadow-xl">` |
| 569 | hex | `#0F2860` | `<div className="rounded-3xl bg-gradient-to-br from-[#1B3F8B] to-[#0F2860] text-white p-6 sm:p-8 space-y-4 shadow-xl">` |

### `src\components\career\result\PillarFitMatrix.tsx` - 43

| Line | Kind | Value | Context |
|---:|---|---|---|
| 82 | hex | `#E4EAF2` | `<div className="rounded-3xl border border-[#E4EAF2] bg-white tone-light card-light p-6 sm:p-8 shadow-sm">` |
| 83 | hex | `#E4EAF2` | `<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E4EAF2] pb-5">` |
| 86 | hex | `#1557D6` | `<span className="text-[11px] font-mono uppercase tracking-wider text-[#1557D6] font-bold">` |
| 89 | hex | `#EEF6FF` | `<span className="rounded-full bg-[#EEF6FF] border border-[#D0E1FD] px-2.5 py-0.5 text-[10px] font-bold text-[#1557D6]">` |
| 89 | hex | `#D0E1FD` | `<span className="rounded-full bg-[#EEF6FF] border border-[#D0E1FD] px-2.5 py-0.5 text-[10px] font-bold text-[#1557D6]">` |
| 89 | hex | `#1557D6` | `<span className="rounded-full bg-[#EEF6FF] border border-[#D0E1FD] px-2.5 py-0.5 text-[10px] font-bold text-[#1557D6]">` |
| 93 | hex | `#071A4A` | `<h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#071A4A] mt-1">` |
| 99 | hex | `#69758A` | `<span className="block text-[10px] font-mono uppercase text-[#69758A] font-bold">Overall Readiness</span>` |
| 100 | hex | `#071A4A` | `<span className="font-serif text-2xl font-bold text-[#071A4A]">{readiness}%</span>` |
| 105 | hex | `#3F4A60` | `<p className="mt-4 text-sm text-[#3F4A60] leading-relaxed">` |
| 106 | hex | `#071A4A` | `Rather than assigning a single static score, the engine measures your profile across the 5 core healthcare career pillars in India, separating your <strong className="text-[#071A4A` |
| 106 | hex | `#071A4A` | `Rather than assigning a single static score, the engine measures your profile across the 5 core healthcare career pillars in India, separating your <strong className="text-[#071A4A` |
| 118 | hex | `#1557D6` | `? "border-[#1557D6] bg-[#EEF6FF]/40 ring-1 ring-[#1557D6]/20 shadow-xs"` |
| 118 | hex | `#EEF6FF` | `? "border-[#1557D6] bg-[#EEF6FF]/40 ring-1 ring-[#1557D6]/20 shadow-xs"` |
| 118 | hex | `#1557D6` | `? "border-[#1557D6] bg-[#EEF6FF]/40 ring-1 ring-[#1557D6]/20 shadow-xs"` |
| 119 | hex | `#E4EAF2` | `: "border-[#E4EAF2] bg-[#FAFBFD] hover:bg-white"` |
| 119 | hex | `#FAFBFD` | `: "border-[#E4EAF2] bg-[#FAFBFD] hover:bg-white"` |
| 123 | hex | `#071A4A` | `<span className="absolute -top-3 left-4 rounded-full bg-[#071A4A] px-3 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider shadow-2xs">` |
| 129 | hex | `#071A4A` | `<h3 className="font-serif text-lg font-bold text-[#071A4A]">{p.title}</h3>` |
| 130 | hex | `#EEF6FF` | `<span className="inline-flex shrink-0 items-center rounded-full bg-[#EEF6FF] px-2.5 py-1 text-xs font-bold text-[#1557D6]">` |
| 130 | hex | `#1557D6` | `<span className="inline-flex shrink-0 items-center rounded-full bg-[#EEF6FF] px-2.5 py-1 text-xs font-bold text-[#1557D6]">` |
| 138 | hex | `#69758A` | `<span className="text-[#69758A] font-medium">Role Readiness</span>` |
| 139 | hex | `#071A4A` | `<span className="font-bold text-[#071A4A]">{p.readinessScore}%</span>` |
| 141 | hex | `#E4EAF2` | `<div className="h-1.5 w-full overflow-hidden rounded-full bg-[#E4EAF2]">` |
| 143 | hex | `#1557D6` | `className="h-full rounded-full bg-[#1557D6] transition-all"` |
| 150 | hex | `#E4EAF2` | `<div className="mt-4 pt-3 border-t border-[#E4EAF2]/80 space-y-2">` |
| 152 | hex | `#69758A` | `<span className="text-[#69758A]">Confidence</span>` |
| 153 | hex | `#1557D6` | `<span className="font-bold text-[#1557D6]">{p.confidence}</span>` |
| 156 | hex | `#69758A` | `<span className="text-[#69758A]">Diagnostic State</span>` |
| 157 | hex | `#071A4A` | `<span className="font-bold text-[#071A4A] truncate max-w-[140px]">{p.quadrantLabel}</span>` |
| 166 | hex | `#D0E1FD` | `<div className="mt-8 rounded-2xl border border-[#D0E1FD] bg-[#EEF6FF]/60 p-5 sm:p-6">` |
| 166 | hex | `#EEF6FF` | `<div className="mt-8 rounded-2xl border border-[#D0E1FD] bg-[#EEF6FF]/60 p-5 sm:p-6">` |
| 168 | hex | `#1557D6` | `<Target className="h-4 w-4 text-[#1557D6]" />` |
| 169 | hex | `#071A4A` | `<span className="text-xs font-bold uppercase tracking-wider text-[#071A4A]">` |
| 175 | hex | `#E4EAF2` | `<div className={`rounded-xl border p-3.5 ${primaryPillar.quadrant === 'job_ready' ? 'border-emerald-500 bg-emerald-50' : 'border-[#E4EAF2] bg-white'}`}>` |
| 176 | hex | `#071A4A` | `<div className="font-bold text-[#071A4A] flex items-center gap-1.5">` |
| 180 | hex | `#3F4A60` | `<p className="mt-1 text-[#3F4A60] leading-relaxed">` |
| 185 | hex | `#1557D6` | `<div className={`rounded-xl border p-3.5 ${primaryPillar.quadrant === 'training_opportunity' ? 'border-[#1557D6] bg-white ring-1 ring-[#1557D6]' : 'border-[#E4EAF2] bg-white'}`}>` |
| 185 | hex | `#1557D6` | `<div className={`rounded-xl border p-3.5 ${primaryPillar.quadrant === 'training_opportunity' ? 'border-[#1557D6] bg-white ring-1 ring-[#1557D6]' : 'border-[#E4EAF2] bg-white'}`}>` |
| 185 | hex | `#E4EAF2` | `<div className={`rounded-xl border p-3.5 ${primaryPillar.quadrant === 'training_opportunity' ? 'border-[#1557D6] bg-white ring-1 ring-[#1557D6]' : 'border-[#E4EAF2] bg-white'}`}>` |
| 186 | hex | `#071A4A` | `<div className="font-bold text-[#071A4A] flex items-center gap-1.5">` |
| 188 | hex | `#1557D6` | `{primaryPillar.quadrant === 'training_opportunity' && <span className="text-[10px] font-mono bg-[#1557D6] text-white px-2 py-0.5 rounded-full">YOUR PROFILE</span>}` |
| 190 | hex | `#3F4A60` | `<p className="mt-1 text-[#3F4A60] leading-relaxed">` |

### `src\components\career\CareerAssessmentLanding.tsx` - 39

| Line | Kind | Value | Context |
|---:|---|---|---|
| 46 | hex | `#1557D6` | `<span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#1557D6]">` |
| 50 | hex | `#071A4A` | `<h1 className="mt-2 text-2xl min-[380px]:text-3xl sm:text-4xl lg:text-[2.75rem] font-serif font-bold tracking-tight text-[#071A4A] leading-[1.18]">` |
| 52 | hex | `#1557D6` | `<span className="text-[#1557D6]">Which one should you choose?</span>` |
| 55 | hex | `#3F4A60` | `<p className="mt-3.5 max-w-xl text-xs sm:text-base leading-relaxed text-[#3F4A60]">` |
| 63 | hex | `#1557D6` | `<ShieldCheck className="h-4 w-4 text-[#1557D6] shrink-0" />` |
| 67 | hex | `#1557D6` | `<FileText className="h-4 w-4 text-[#1557D6] shrink-0" />` |
| 71 | hex | `#1557D6` | `<FileCheck2 className="h-4 w-4 text-[#1557D6] shrink-0" />` |
| 75 | hex | `#1557D6` | `<Clock className="h-4 w-4 text-[#1557D6] shrink-0" />` |
| 85 | hex | `#1557D6` | `className="arzon-button-primary inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-full px-7 text-sm font-bold shadow-md hover:bg-[#1557D6] transition-all active` |
| 122 | hex | `#071A4A` | `<p className="text-[10px] sm:text-[11px] font-bold text-[#071A4A] leading-tight truncate">Pharmacovigilance</p>` |
| 130 | hex | `#1557D6` | `<div className="h-6 w-6 rounded-lg bg-blue-100 text-[#1557D6] flex items-center justify-center shrink-0">` |
| 134 | hex | `#071A4A` | `<p className="text-[10px] sm:text-[11px] font-bold text-[#071A4A] leading-tight truncate">Clinical Data Mgmt</p>` |
| 149 | hex | `#071A4A` | `<p className="text-[10px] sm:text-[11px] font-bold text-[#071A4A] leading-tight truncate">Medical Coding</p>` |
| 161 | hex | `#071A4A` | `<p className="text-[10px] sm:text-[11px] font-bold text-[#071A4A] leading-tight truncate">Regulatory Affairs</p>` |
| 179 | hex | `#1557D6` | `<div className="h-8 w-8 rounded-lg bg-blue-50 text-[#1557D6] flex items-center justify-center shrink-0">` |
| 183 | hex | `#071A4A` | `<h3 className="text-xs sm:text-sm font-bold text-[#071A4A]">Understand your fit</h3>` |
| 193 | hex | `#071A4A` | `<h3 className="text-xs sm:text-sm font-bold text-[#071A4A]">Discover opportunities</h3>` |
| 203 | hex | `#071A4A` | `<h3 className="text-xs sm:text-sm font-bold text-[#071A4A]">Identify skill gaps</h3>` |
| 213 | hex | `#071A4A` | `<h3 className="text-xs sm:text-sm font-bold text-[#071A4A]">Plan your next step</h3>` |
| 225 | hex | `#071A4A` | `<h2 className="text-xl sm:text-2xl font-serif font-bold text-[#071A4A]">` |
| 238 | hex | `#071A4A` | `<h3 className="text-xs sm:text-sm font-bold text-[#071A4A]">Answer 42 questions</h3>` |
| 248 | hex | `#071A4A` | `<h3 className="text-xs sm:text-sm font-bold text-[#071A4A]">We analyse your profile</h3>` |
| 258 | hex | `#071A4A` | `<h3 className="text-xs sm:text-sm font-bold text-[#071A4A]">Get your personalised report</h3>` |
| 268 | hex | `#071A4A` | `<h3 className="text-xs sm:text-sm font-bold text-[#071A4A]">Plan your next steps</h3>` |
| 282 | hex | `#071A4A` | `<h2 className="text-lg sm:text-xl font-serif font-bold text-[#071A4A]">` |
| 291 | hex | `#071A4A` | `<span className="text-xs font-bold text-[#071A4A] block mb-2.5">Your Top Role Matches</span>` |
| 369 | hex | `#1557D6` | `<li>• Explore <strong className="text-[#1557D6]">Pharmacovigilance</strong> role guide</li>` |
| 383 | hex | `#071A4A` | `<h2 className="text-lg sm:text-xl font-serif font-bold text-[#071A4A]">` |
| 388 | hex | `#1557D6` | `<Link to="/careers" className="text-xs font-bold text-[#1557D6] hover:underline">` |
| 400 | hex | `#071A4A` | `<h3 className="text-xs font-bold text-[#071A4A]">Pharmacovigilance</h3>` |
| 413 | hex | `#071A4A` | `<h3 className="text-xs font-bold text-[#071A4A]">Medical Coding</h3>` |
| 426 | hex | `#071A4A` | `<h3 className="text-xs font-bold text-[#071A4A]">Clinical Data Mgmt</h3>` |
| 439 | hex | `#071A4A` | `<h3 className="text-xs font-bold text-[#071A4A]">Regulatory Affairs</h3>` |
| 459 | hex | `#D0E1FD` | `<section className="rounded-3xl border border-[#D0E1FD] bg-gradient-to-r from-[#EEF6FF] via-[#F4F8FF] to-white p-6 sm:p-8 shadow-xs">` |
| 459 | hex | `#EEF6FF` | `<section className="rounded-3xl border border-[#D0E1FD] bg-gradient-to-r from-[#EEF6FF] via-[#F4F8FF] to-white p-6 sm:p-8 shadow-xs">` |
| 459 | hex | `#F4F8FF` | `<section className="rounded-3xl border border-[#D0E1FD] bg-gradient-to-r from-[#EEF6FF] via-[#F4F8FF] to-white p-6 sm:p-8 shadow-xs">` |
| 462 | hex | `#071A4A` | `<h2 className="text-xl sm:text-2xl font-serif font-bold text-[#071A4A]">` |
| 465 | hex | `#3F4A60` | `<p className="mt-1 text-xs sm:text-sm text-[#3F4A60]">` |
| 474 | hex | `#1557D6` | `className="arzon-button-primary inline-flex h-11 w-full sm:w-auto items-center justify-center rounded-full px-6 text-xs sm:text-sm font-bold shadow-md hover:bg-[#1557D6] transition` |

### `src\routes\admin.acri.tsx` - 38

| Line | Kind | Value | Context |
|---:|---|---|---|
| 202 | hex | `#005B4F` | `<span className="px-2.5 py-0.5 rounded-full bg-[#005B4F] text-slate-50 font-mono text-[10px] font-bold uppercase tracking-widest">` |
| 234 | hex | `#005B4F` | `className="px-4 py-2 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-slate-50 text-xs font-mono font-bold uppercase inline-flex items-center gap-1.5 shadow-xs"` |
| 234 | hex | `#00473E` | `className="px-4 py-2 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-slate-50 text-xs font-mono font-bold uppercase inline-flex items-center gap-1.5 shadow-xs"` |
| 292 | hex | `#E8F7F1` | `<div className="p-3.5 rounded-2xl bg-[#E8F7F1]/60 border border-emerald-300 shadow-2xs space-y-1">` |
| 316 | hex | `#005B4F` | `? "border-[#005B4F] text-[#005B4F]"` |
| 316 | hex | `#005B4F` | `? "border-[#005B4F] text-[#005B4F]"` |
| 327 | hex | `#005B4F` | `? "border-[#005B4F] text-[#005B4F]"` |
| 327 | hex | `#005B4F` | `? "border-[#005B4F] text-[#005B4F]"` |
| 338 | hex | `#005B4F` | `? "border-[#005B4F] text-[#005B4F]"` |
| 338 | hex | `#005B4F` | `? "border-[#005B4F] text-[#005B4F]"` |
| 349 | hex | `#005B4F` | `? "border-[#005B4F] text-[#005B4F]"` |
| 349 | hex | `#005B4F` | `? "border-[#005B4F] text-[#005B4F]"` |
| 373 | hex | `#005B4F` | `<div className="bg-[#005B4F] h-2 rounded-full" style={{ width: "75%" }} />` |
| 403 | hex | `#E8F7F1` | `<div className="p-3 rounded-xl bg-[#E8F7F1]/50 border border-emerald-200 flex items-center justify-between">` |
| 435 | hex | `#005B4F` | `className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-300 bg-white text-xs font-sans text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#005B4F]"` |
| 526 | hex | `#005B4F` | `className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#005B4F] hover:bg-[#00473E] text-slate-50 font-mono text-[10px] font-bold uppercase tracking-wider shadow-2xs` |
| 526 | hex | `#00473E` | `className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#005B4F] hover:bg-[#00473E] text-slate-50 font-mono text-[10px] font-bold uppercase tracking-wider shadow-2xs` |
| 548 | hex | `#005B4F` | `className="text-stone-400 hover:text-[#005B4F] font-mono text-[10px] ml-1 hidden sm:inline"` |
| 574 | hex | `#005B4F` | `<span className="px-2.5 py-0.5 rounded-full bg-[#005B4F] text-slate-50 font-mono text-[10px] font-bold uppercase tracking-wider">` |
| 594 | hex | `#005B4F` | `<span className="font-serif font-bold text-xl text-[#005B4F] block leading-tight">9</span>` |
| 629 | hex | `#005B4F` | `className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-300 font-sans text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#005B4F` |
| 637 | hex | `#005B4F` | `className="px-3 py-2 rounded-xl border border-stone-300 font-mono text-xs text-stone-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#005B4F]"` |
| 654 | hex | `#005B4F` | `className="px-3 py-2 rounded-xl border border-stone-300 font-mono text-xs text-stone-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#005B4F]"` |
| 666 | hex | `#005B4F` | `className="px-3 py-2 rounded-xl border border-stone-300 font-mono text-xs text-stone-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#005B4F]"` |
| 690 | hex | `#005B4F` | `? "bg-white card-light border-[#005B4F] shadow-sm ring-1 ring-[#005B4F]/20"` |
| 690 | hex | `#005B4F` | `? "bg-white card-light border-[#005B4F] shadow-sm ring-1 ring-[#005B4F]/20"` |
| 701 | hex | `#005B4F` | `<span className="font-mono text-xs font-bold text-[#005B4F] bg-[#E8F7F1] px-2.5 py-0.5 rounded-md">` |
| 701 | hex | `#E8F7F1` | `<span className="font-mono text-xs font-bold text-[#005B4F] bg-[#E8F7F1] px-2.5 py-0.5 rounded-md">` |
| 761 | hex | `#005B4F` | `<p className="text-xs text-stone-700 italic border-l-2 border-[#005B4F] pl-3 py-1 mt-1">` |
| 852 | hex | `#005B4F` | `className="w-40 px-3 py-2 rounded-xl border border-stone-300 font-mono text-sm font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#005B4F]"` |
| 857 | hex | `#005B4F` | `className="px-5 py-2 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-slate-50 text-xs font-mono font-bold uppercase transition-all cursor-pointer"` |
| 857 | hex | `#00473E` | `className="px-5 py-2 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-slate-50 text-xs font-mono font-bold uppercase transition-all cursor-pointer"` |
| 876 | hex | `#E8F7F1` | `<div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E8F7F1] text-[#005B4F] font-mono text-[10px] font-bold uppercase tracking-wider">` |
| 876 | hex | `#005B4F` | `<div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E8F7F1] text-[#005B4F] font-mono text-[10px] font-bold uppercase tracking-wider">` |
| 914 | hex | `#005B4F` | `<span className="font-mono font-bold text-[#005B4F] text-sm bg-white tone-light px-2 py-0.5 rounded border border-[#005B4F]/30">` |
| 914 | hex | `#005B4F` | `<span className="font-mono font-bold text-[#005B4F] text-sm bg-white tone-light px-2 py-0.5 rounded border border-[#005B4F]/30">` |
| 974 | hex | `#25D366` | `className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-slate-50 text-xs font-mono font-bold uppercase inline-flex items-center justify-center gap-2 transitio` |
| 974 | hex | `#20ba59` | `className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-slate-50 text-xs font-mono font-bold uppercase inline-flex items-center justify-center gap-2 transitio` |

### `src\routes\verify.tsx` - 38

| Line | Kind | Value | Context |
|---:|---|---|---|
| 122 | hex | `#FAF8F5` | `<div className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] tone-light font-sans antialiased">` |
| 122 | hex | `#1A1A1A` | `<div className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] tone-light font-sans antialiased">` |
| 130 | hex | `#1A1A1A` | `<h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#1A1A1A] leading-tight">` |
| 142 | hex | `#1B3F8B` | `className="h-12 flex-1 rounded-xl border border-stone-300 bg-white px-5 text-sm text-stone-900 outline-none ring-[#1B3F8B]/30 placeholder:text-stone-400 focus:ring-2 font-mono shad` |
| 146 | hex | `#1B3F8B` | `className="inline-flex h-12 items-center justify-center rounded-xl bg-[#1B3F8B] hover:bg-[#153270] px-6 text-sm font-bold text-white shadow-md transition-all cursor-pointer"` |
| 146 | hex | `#153270` | `className="inline-flex h-12 items-center justify-center rounded-xl bg-[#1B3F8B] hover:bg-[#153270] px-6 text-sm font-bold text-white shadow-md transition-all cursor-pointer"` |
| 153 | hex | `#D0E1FD` | `<div className="mt-8 rounded-2xl border border-[#D0E1FD] bg-[#EEF6FF]/70 p-6">` |
| 153 | hex | `#EEF6FF` | `<div className="mt-8 rounded-2xl border border-[#D0E1FD] bg-[#EEF6FF]/70 p-6">` |
| 154 | hex | `#071A4A` | `<div className="flex items-center gap-2 font-bold text-lg text-[#071A4A]">` |
| 155 | hex | `#1557D6` | `<Info className="h-5 w-5 text-[#1557D6]" />` |
| 182 | hex | `#8A6D1F` | `<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-[#8A6D1F] font-bold">` |
| 187 | hex | `#8A6D1F` | `<span className="font-mono text-xs font-bold text-[#8A6D1F] uppercase tracking-wider">` |
| 194 | hex | `#1A1A1A` | `<h3 className="font-serif text-2xl font-bold text-[#1A1A1A] mt-0.5">{result.company}</h3>` |
| 203 | hex | `#1B3F8B` | `<span className="font-bold text-[#1B3F8B]">{result.id}</span>` |
| 208 | hex | `#8A6D1F` | `<span className="font-bold text-[#8A6D1F]">{result.vmo}</span>` |
| 213 | hex | `#1A1A1A` | `<span className="font-bold text-[#1A1A1A]">{result.recipient}</span>` |
| 217 | hex | `#1A1A1A` | `<span className="font-bold text-[#1A1A1A]">{result.issued}</span>` |
| 221 | hex | `#1A1A1A` | `<span className="font-bold text-[#1A1A1A]">{result.signatories}</span>` |
| 225 | hex | `#1A1A1A` | `<span className="font-bold text-[#1A1A1A]">{result.location}</span>` |
| 249 | hex | `#005B4F` | `<span className="font-mono text-[10px] font-bold text-[#005B4F] uppercase tracking-wider bg-[#E8F7F1] px-2.5 py-0.5 rounded-full border border-[#005B4F]/20">` |
| 249 | hex | `#E8F7F1` | `<span className="font-mono text-[10px] font-bold text-[#005B4F] uppercase tracking-wider bg-[#E8F7F1] px-2.5 py-0.5 rounded-full border border-[#005B4F]/20">` |
| 249 | hex | `#005B4F` | `<span className="font-mono text-[10px] font-bold text-[#005B4F] uppercase tracking-wider bg-[#E8F7F1] px-2.5 py-0.5 rounded-full border border-[#005B4F]/20">` |
| 259 | hex | `#0B1325` | `<h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B1325]">` |
| 263 | hex | `#0B1325` | `<span className="text-4xl sm:text-5xl font-serif font-black text-[#0B1325]">` |
| 290 | hex | `#005B4F` | `<div className="absolute -bottom-2 -right-2 h-7 w-7 rounded-full bg-[#005B4F] text-white flex items-center justify-center shadow-xs">` |
| 298 | hex | `#FAF8F5` | `<div className="p-3 rounded-xl bg-[#FAF8F5] border border-stone-200/80">` |
| 306 | hex | `#FAF8F5` | `<div className="p-3 rounded-xl bg-[#FAF8F5] border border-stone-200/80">` |
| 310 | hex | `#005B4F` | `<span className="font-mono font-bold text-[#005B4F] mt-0.5 block">` |
| 314 | hex | `#FAF8F5` | `<div className="p-3 rounded-xl bg-[#FAF8F5] border border-stone-200/80">` |
| 325 | hex | `#E8F7F1` | `<div className="p-4 rounded-2xl bg-[#E8F7F1]/60 border border-[#005B4F]/20 flex items-start gap-3 text-xs text-[#005B4F]">` |
| 325 | hex | `#005B4F` | `<div className="p-4 rounded-2xl bg-[#E8F7F1]/60 border border-[#005B4F]/20 flex items-start gap-3 text-xs text-[#005B4F]">` |
| 325 | hex | `#005B4F` | `<div className="p-4 rounded-2xl bg-[#E8F7F1]/60 border border-[#005B4F]/20 flex items-start gap-3 text-xs text-[#005B4F]">` |
| 326 | hex | `#005B4F` | `<ShieldCheck className="h-5 w-5 text-[#005B4F] shrink-0 mt-0.5" />` |
| 361 | hex | `#1B3F8B` | `<span className="font-mono font-bold text-[#1B3F8B]">{result.id}</span> matches the Arzon` |
| 365 | hex | `#1B3F8B` | `className="text-[#1B3F8B] font-bold underline underline-offset-2 hover:text-[#153270]"` |
| 365 | hex | `#153270` | `className="text-[#1B3F8B] font-bold underline underline-offset-2 hover:text-[#153270]"` |
| 387 | hex | `#1B3F8B` | `<ShieldCheck className="h-4 w-4 text-[#1B3F8B]" /> See our public proof` |
| 391 | hex | `#1B3F8B` | `className="inline-flex h-11 items-center text-sm font-bold text-[#1B3F8B] hover:underline"` |

### `src\components\landing\BentoProgrammes.tsx` - 37

| Line | Kind | Value | Context |
|---:|---|---|---|
| 71 | hex | `#F8FAFC` | `className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC]"` |
| 71 | hex | `#F1F5F9` | `className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC]"` |
| 71 | hex | `#F8FAFC` | `className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC]"` |
| 77 | hex | `#64748B` | `<p className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[#64748B]">` |
| 80 | hex | `#8A6D1F` | `<div className="h-0.5 w-8 bg-[#8A6D1F]/60 mt-1 rounded-full" />` |
| 82 | hex | `#0F172A` | `<h2 className="font-serif text-4xl sm:text-5xl lg:text-[44px] font-bold text-[#0F172A] tracking-tight leading-tight">` |
| 83 | hex | `#8A6D1F` | `Train for the role. <em className="italic-accent not-italic text-[#8A6D1F]">Not just the subject.</em>` |
| 85 | hex | `#334155` | `<p className="text-xs sm:text-sm text-[#334155] leading-relaxed max-w-2xl mx-auto font-medium">` |
| 104 | hex | `#0F172A` | `? "text-slate-50 border-[#0F172A]"` |
| 105 | hex | `#334155` | `: "border-slate-300 bg-white text-[#334155] hover:border-slate-400 hover:text-[#0F172A] shadow-xs"` |
| 105 | hex | `#0F172A` | `: "border-slate-300 bg-white text-[#334155] hover:border-slate-400 hover:text-[#0F172A] shadow-xs"` |
| 112 | hex | `#0F172A` | `className="absolute inset-0 bg-[#0F172A] rounded-full shadow-md -z-0"` |
| 148 | hex | `#0F172A` | `<span className="absolute right-2 top-2 rounded-full bg-[#0F172A] text-white px-3 py-1 font-mono text-[11px] font-bold shadow-md backdrop-blur-md">` |
| 158 | hex | `#0F172A` | `<h3 className="font-serif text-lg font-bold text-[#0F172A] mt-0.5">` |
| 165 | hex | `#64748B` | `<p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#64748B]">` |
| 170 | hex | `#334155` | `<li key={skill} className="flex items-center gap-1.5 text-xs text-[#334155] font-medium">` |
| 179 | hex | `#64748B` | `<p className="text-[11px] text-[#64748B] mt-3 italic font-medium">` |
| 185 | hex | `#0F172A` | `<span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 font-mono text-[10px] font-extrabold uppercase tracking-wider text-[#0F172A] border border-slate-200">` |
| 194 | hex | `#0F172A` | `className="text-xs h-10 px-3 flex items-center justify-center gap-1.5 text-white font-bold rounded-xl bg-[#0F172A] hover:bg-[#1E293B] transition-colors shadow-sm w-full"` |
| 194 | hex | `#1E293B` | `className="text-xs h-10 px-3 flex items-center justify-center gap-1.5 text-white font-bold rounded-xl bg-[#0F172A] hover:bg-[#1E293B] transition-colors shadow-sm w-full"` |
| 202 | hex | `#0F172A` | `className="text-xs h-10 px-3 flex items-center justify-center gap-1 text-[#0F172A] font-bold rounded-xl border border-slate-300 bg-white hover:bg-slate-50 transition-colors shadow-` |
| 204 | hex | `#0F172A` | `<span className="text-[#0F172A] font-bold">View role roadmap</span>` |
| 205 | hex | `#64748B` | `<ArrowUpRight className="h-3.5 w-3.5 text-[#64748B]" />` |
| 219 | hex | `#2563EB` | `className={`h-1.5 rounded-full transition-all ${i === activeIdx ? "w-6 bg-[#2563EB]" : "w-1.5 bg-slate-300"}`}` |
| 245 | hex | `#0F172A` | `<span className="absolute right-3 top-3 rounded-full bg-[#0F172A] text-white px-3 py-1 font-mono text-xs font-bold shadow-md backdrop-blur-md">` |
| 255 | hex | `#0F172A` | `<h3 className="font-serif text-xl font-bold text-[#0F172A] mt-0.5">` |
| 262 | hex | `#64748B` | `<p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#64748B]">` |
| 267 | hex | `#334155` | `<li key={skill} className="flex items-center gap-1.5 text-xs text-[#334155] font-medium">` |
| 276 | hex | `#64748B` | `<p className="text-[11px] text-[#64748B] mt-3 italic font-medium">` |
| 283 | hex | `#0F172A` | `<span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 font-mono text-[10px] font-extrabold uppercase tracking-wider text-[#0F172A] border border-slate-200">` |
| 293 | hex | `#0F172A` | `className="text-xs h-10 px-3 flex items-center justify-center gap-1.5 text-white font-bold rounded-xl bg-[#0F172A] hover:bg-[#1E293B] shadow-sm transition-colors w-full"` |
| 293 | hex | `#1E293B` | `className="text-xs h-10 px-3 flex items-center justify-center gap-1.5 text-white font-bold rounded-xl bg-[#0F172A] hover:bg-[#1E293B] shadow-sm transition-colors w-full"` |
| 304 | hex | `#0F172A` | `className="text-xs h-10 px-3 flex items-center justify-center gap-1 text-[#0F172A] font-bold rounded-xl border border-slate-300 bg-white hover:bg-slate-50 transition-colors shadow-` |
| 306 | hex | `#0F172A` | `<span className="text-[#0F172A] font-bold">View role roadmap</span>` |
| 307 | hex | `#64748B` | `<ArrowUpRight className="h-3.5 w-3.5 text-[#64748B]" />` |
| 328 | hex | `#2563EB` | `className="inline-flex items-center gap-2 text-xs font-bold text-white rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] px-6 py-3 shadow-lg shadow-blue-600/25 transition-all"` |
| 328 | hex | `#1d4ed8` | `className="inline-flex items-center gap-2 text-xs font-bold text-white rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] px-6 py-3 shadow-lg shadow-blue-600/25 transition-all"` |

### `src\components\career\result\ResultHero.tsx` - 34

| Line | Kind | Value | Context |
|---:|---|---|---|
| 49 | hex | `#E4EAF2` | `<section className="relative overflow-hidden rounded-3xl border border-[#E4EAF2] bg-white tone-light card-light p-5 sm:p-10 shadow-sm transition-all">` |
| 51 | hex | `#EEF6FF` | `<div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#EEF6FF]/60 blur-3xl" />` |
| 54 | hex | `#E4EAF2` | `<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E4EAF2] pb-5 sm:pb-6">` |
| 56 | hex | `#D0E1FD` | `<div className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-3 py-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#1557D6]"` |
| 56 | hex | `#EEF6FF` | `<div className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-3 py-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#1557D6]"` |
| 56 | hex | `#1557D6` | `<div className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-3 py-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#1557D6]"` |
| 57 | hex | `#1557D6` | `<span className="h-2 w-2 rounded-full bg-[#1557D6] motion-safe:animate-pulse" />` |
| 60 | hex | `#69758A` | `<span className="hidden sm:inline text-xs font-mono text-[#69758A]">·</span>` |
| 61 | hex | `#69758A` | `<span className="text-xs font-medium text-[#69758A]">` |
| 69 | hex | `#E4EAF2` | `className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#E4EAF2] bg-white tone-light px-3.5 py-1.5 text-xs font-semibold text-[#3F4A60] hover:bg-slat` |
| 69 | hex | `#3F4A60` | `className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#E4EAF2] bg-white tone-light px-3.5 py-1.5 text-xs font-semibold text-[#3F4A60] hover:bg-slat` |
| 69 | hex | `#071A4A` | `className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#E4EAF2] bg-white tone-light px-3.5 py-1.5 text-xs font-semibold text-[#3F4A60] hover:bg-slat` |
| 71 | hex | `#69758A` | `<RotateCcw className="h-3 w-3 text-[#69758A]" />` |
| 81 | hex | `#FAFBFD` | `className="relative grid h-28 w-28 sm:h-32 sm:w-32 place-items-center rounded-full bg-[#FAFBFD] border-4 border-[#EEF6FF] shadow-inner"` |
| 81 | hex | `#EEF6FF` | `className="relative grid h-28 w-28 sm:h-32 sm:w-32 place-items-center rounded-full bg-[#FAFBFD] border-4 border-[#EEF6FF] shadow-inner"` |
| 84 | hex | `#1557D6` | `background: `radial-gradient(closest-side, white 79%, transparent 80% 100%), conic-gradient(#1557D6 ${fitScore}%, #E4EAF2 0)`,` |
| 84 | hex | `#E4EAF2` | `background: `radial-gradient(closest-side, white 79%, transparent 80% 100%), conic-gradient(#1557D6 ${fitScore}%, #E4EAF2 0)`,` |
| 89 | hex | `#071A4A` | `<span className="block font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#071A4A]">` |
| 92 | hex | `#1557D6` | `<span className="block text-[10px] font-bold uppercase tracking-wider text-[#1557D6]">` |
| 105 | hex | `#1557D6` | `<span className="text-xs font-mono uppercase tracking-widest text-[#1557D6] font-bold">` |
| 110 | hex | `#071A4A` | `<h1 className="mt-2 font-serif text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#071A4A] leading-[1.2]">` |
| 114 | hex | `#3F4A60` | `<p className="mt-3 text-sm sm:text-base text-[#3F4A60] font-sans leading-relaxed max-w-2xl">` |
| 121 | hex | `#69758A` | `<span className="text-xs font-semibold text-[#69758A] mr-1">Primary Signals:</span>` |
| 125 | hex | `#E4EAF2` | `className="inline-flex items-center gap-1 rounded-md border border-[#E4EAF2] bg-[#FAFBFD] px-2.5 py-1 text-xs font-medium text-[#071A4A]"` |
| 125 | hex | `#FAFBFD` | `className="inline-flex items-center gap-1 rounded-md border border-[#E4EAF2] bg-[#FAFBFD] px-2.5 py-1 text-xs font-medium text-[#071A4A]"` |
| 125 | hex | `#071A4A` | `className="inline-flex items-center gap-1 rounded-md border border-[#E4EAF2] bg-[#FAFBFD] px-2.5 py-1 text-xs font-medium text-[#071A4A]"` |
| 127 | hex | `#1557D6` | `<Sparkles className="h-3 w-3 text-[#1557D6]" />` |
| 136 | hex | `#E4EAF2` | `<div className="mt-7 sm:mt-8 pt-6 border-t border-[#E4EAF2] flex flex-col sm:flex-row items-stretch sm:items-center gap-3">` |
| 140 | hex | `#071A4A` | `className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#071A4A] px-6 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-[#1557D6] transition-all act` |
| 140 | hex | `#1557D6` | `className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#071A4A] px-6 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-[#1557D6] transition-all act` |
| 149 | hex | `#D0E1FD` | `className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-6 py-3.5 text-sm font-bold text-[#1557D6] hover:bg-[#E0EEFD] ` |
| 149 | hex | `#EEF6FF` | `className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-6 py-3.5 text-sm font-bold text-[#1557D6] hover:bg-[#E0EEFD] ` |
| 149 | hex | `#1557D6` | `className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-6 py-3.5 text-sm font-bold text-[#1557D6] hover:bg-[#E0EEFD] ` |
| 149 | hex | `#E0EEFD` | `className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-6 py-3.5 text-sm font-bold text-[#1557D6] hover:bg-[#E0EEFD] ` |

### `src\components\home\CareerEngineLeaderboard.tsx` - 34

| Line | Kind | Value | Context |
|---:|---|---|---|
| 60 | hex | `#E4EAF2` | `<section className="py-14 sm:py-20 bg-white border-b border-[#E4EAF2] tone-light card-light" id="leaderboard">` |
| 65 | hex | `#1557D6` | `<div className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#1557D6] mb-2 flex items-center gap-1.5">` |
| 68 | hex | `#071A4A` | `<h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-[#071A4A] tracking-tight leading-tight">` |
| 70 | hex | `#1557D6` | `<span className="text-[#1557D6]">One place to see where you stand.</span>` |
| 76 | hex | `#1557D6` | `className="inline-flex items-center gap-2 rounded-full bg-[#1557D6] hover:bg-[#1044A5] text-white px-6 py-3 text-xs sm:text-sm font-bold transition-all shadow-sm shrink-0 self-star` |
| 76 | hex | `#1044A5` | `className="inline-flex items-center gap-2 rounded-full bg-[#1557D6] hover:bg-[#1044A5] text-white px-6 py-3 text-xs sm:text-sm font-bold transition-all shadow-sm shrink-0 self-star` |
| 91 | hex | `#1557D6` | `? "bg-[#1557D6] text-white shadow-xs"` |
| 92 | hex | `#475569` | `: "bg-slate-100 text-[#475569] hover:bg-slate-200"` |
| 102 | hex | `#1557D6` | `? "bg-[#1557D6] text-white shadow-xs"` |
| 103 | hex | `#475569` | `: "bg-slate-100 text-[#475569] hover:bg-slate-200"` |
| 113 | hex | `#1557D6` | `? "bg-[#1557D6] text-white shadow-xs"` |
| 114 | hex | `#475569` | `: "bg-slate-100 text-[#475569] hover:bg-slate-200"` |
| 129 | hex | `#E4EAF2` | `className="w-full rounded-full border border-[#E4EAF2] bg-[#F8FAFC] pl-9 pr-4 py-1.5 text-xs text-[#071A4A] placeholder-slate-400 focus:border-[#1557D6] focus:bg-white focus:outlin` |
| 129 | hex | `#F8FAFC` | `className="w-full rounded-full border border-[#E4EAF2] bg-[#F8FAFC] pl-9 pr-4 py-1.5 text-xs text-[#071A4A] placeholder-slate-400 focus:border-[#1557D6] focus:bg-white focus:outlin` |
| 129 | hex | `#071A4A` | `className="w-full rounded-full border border-[#E4EAF2] bg-[#F8FAFC] pl-9 pr-4 py-1.5 text-xs text-[#071A4A] placeholder-slate-400 focus:border-[#1557D6] focus:bg-white focus:outlin` |
| 129 | hex | `#1557D6` | `className="w-full rounded-full border border-[#E4EAF2] bg-[#F8FAFC] pl-9 pr-4 py-1.5 text-xs text-[#071A4A] placeholder-slate-400 focus:border-[#1557D6] focus:bg-white focus:outlin` |
| 139 | hex | `#E4EAF2` | `className="rounded-2xl border border-[#E4EAF2] bg-white p-5 shadow-xs hover:border-[#1557D6]/30 hover:shadow-md transition-all tone-light card-light flex flex-col justify-between"` |
| 139 | hex | `#1557D6` | `className="rounded-2xl border border-[#E4EAF2] bg-white p-5 shadow-xs hover:border-[#1557D6]/30 hover:shadow-md transition-all tone-light card-light flex flex-col justify-between"` |
| 147 | hex | `#E4EAF2` | `className="h-11 w-11 rounded-full object-cover border border-[#E4EAF2]"` |
| 152 | hex | `#071A4A` | `<span className="absolute -top-1.5 -left-1.5 grid h-5 w-5 place-items-center rounded-full bg-[#071A4A] text-white font-mono text-[9px] font-bold">` |
| 158 | hex | `#071A4A` | `<h3 className="font-sans text-sm font-bold text-[#071A4A] truncate">` |
| 161 | hex | `#64748B` | `<p className="text-[11px] text-[#64748B] truncate mt-0.5" title={c.college}>` |
| 167 | hex | `#EEF6FF` | `<div className="inline-flex items-center rounded-md bg-[#EEF6FF] px-2 py-0.5 text-[10px] font-mono font-bold text-[#1557D6] mb-4">` |
| 167 | hex | `#1557D6` | `<div className="inline-flex items-center rounded-md bg-[#EEF6FF] px-2 py-0.5 text-[10px] font-mono font-bold text-[#1557D6] mb-4">` |
| 173 | hex | `#F1F5F9` | `<div className="pt-2 border-t border-[#F1F5F9]">` |
| 175 | hex | `#64748B` | `<span className="text-[#64748B] text-[10px] font-sans font-semibold">Role Readiness</span>` |
| 176 | hex | `#1557D6` | `<span className="text-[#1557D6]">{c.score}%</span>` |
| 180 | hex | `#1557D6` | `className="h-full bg-gradient-to-r from-[#1557D6] to-[#38BDF8] rounded-full"` |
| 180 | hex | `#38BDF8` | `className="h-full bg-gradient-to-r from-[#1557D6] to-[#38BDF8] rounded-full"` |
| 190 | hex | `#69758A` | `<div className="mt-6 flex items-center justify-between flex-wrap gap-2 text-[11px] font-mono text-[#69758A] bg-[#F8FAFC] p-3 rounded-xl border border-[#E4EAF2]">` |
| 190 | hex | `#F8FAFC` | `<div className="mt-6 flex items-center justify-between flex-wrap gap-2 text-[11px] font-mono text-[#69758A] bg-[#F8FAFC] p-3 rounded-xl border border-[#E4EAF2]">` |
| 190 | hex | `#E4EAF2` | `<div className="mt-6 flex items-center justify-between flex-wrap gap-2 text-[11px] font-mono text-[#69758A] bg-[#F8FAFC] p-3 rounded-xl border border-[#E4EAF2]">` |
| 192 | hex | `#1557D6` | `<Info className="h-3.5 w-3.5 text-[#1557D6] shrink-0" />` |
| 195 | hex | `#1557D6` | `<Link to="/career-engine/start" className="text-[#1557D6] font-bold hover:underline">` |

### `src\routes\acri.invite.tsx` - 34

| Line | Kind | Value | Context |
|---:|---|---|---|
| 207 | hex | `#F8F9F7` | `<div className="min-h-screen bg-[#F8F9F7] text-[#1D2939] font-sans antialiased flex flex-col justify-between">` |
| 207 | hex | `#1D2939` | `<div className="min-h-screen bg-[#F8F9F7] text-[#1D2939] font-sans antialiased flex flex-col justify-between">` |
| 209 | hex | `#E5E7EB` | `<header className="border-b border-[#E5E7EB] bg-white/80 backdrop-blur-md py-4 px-6 sm:px-12 flex items-center justify-between">` |
| 211 | hex | `#005B4F` | `<div className="h-9 w-9 rounded-xl bg-[#005B4F] flex items-center justify-center text-white">` |
| 215 | hex | `#0B1325` | `<span className="font-serif font-bold text-lg text-[#0B1325] block leading-none">` |
| 218 | hex | `#005B4F` | `<span className="font-mono text-[9px] uppercase tracking-widest text-[#005B4F] font-bold">` |
| 226 | hex | `#005B4F` | `className="text-xs font-semibold text-stone-600 hover:text-[#005B4F] transition-colors"` |
| 234 | hex | `#D9DEE0` | `<div className="w-full max-w-lg rounded-3xl bg-white card-light border border-[#D9DEE0] shadow-xl p-6 sm:p-8 space-y-6">` |
| 238 | hex | `#E8F7F1` | `<div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-[#E8F7F1] text-[#005B4F] mx-auto shadow-xs">` |
| 238 | hex | `#005B4F` | `<div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-[#E8F7F1] text-[#005B4F] mx-auto shadow-xs">` |
| 239 | hex | `#005B4F` | `<CheckCircle2 className="h-7 w-7 text-[#005B4F]" />` |
| 243 | hex | `#005B4F` | `<span className="font-mono text-[10px] font-bold text-[#005B4F] uppercase tracking-widest bg-[#E8F7F1] px-3 py-1 rounded-full">` |
| 243 | hex | `#E8F7F1` | `<span className="font-mono text-[10px] font-bold text-[#005B4F] uppercase tracking-widest bg-[#E8F7F1] px-3 py-1 rounded-full">` |
| 246 | hex | `#0B1325` | `<h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B1325] mt-2.5">` |
| 255 | hex | `#FAF8F5` | `<div className="bg-[#FAF8F5] border-2 border-dashed border-[#005B4F]/30 rounded-2xl p-5 space-y-2">` |
| 255 | hex | `#005B4F` | `<div className="bg-[#FAF8F5] border-2 border-dashed border-[#005B4F]/30 rounded-2xl p-5 space-y-2">` |
| 260 | hex | `#005B4F` | `<span className="font-mono text-2xl sm:text-3xl font-black text-[#005B4F] tracking-wider select-all">` |
| 266 | hex | `#005B4F` | `className="p-2 rounded-lg bg-white card-light border border-stone-200 text-stone-600 hover:text-[#005B4F] transition-colors cursor-pointer"` |
| 308 | hex | `#005B4F` | `className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-white font-semibold text-base tracking-wide transition-all shadow-md c` |
| 308 | hex | `#00473E` | `className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-white font-semibold text-base tracking-wide transition-all shadow-md c` |
| 319 | hex | `#E8F7F1` | `<div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-[#E8F7F1] text-[#005B4F] mb-3">` |
| 319 | hex | `#005B4F` | `<div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-[#E8F7F1] text-[#005B4F] mb-3">` |
| 322 | hex | `#0B1325` | `<h1 className="text-2xl font-serif font-bold text-[#0B1325]">` |
| 346 | hex | `#005B4F` | `className="w-full px-4 py-3 rounded-xl border border-stone-300 font-mono text-base font-bold text-[#005B4F] tracking-wider placeholder:text-stone-400 placeholder:font-normal placeh` |
| 346 | hex | `#005B4F` | `className="w-full px-4 py-3 rounded-xl border border-stone-300 font-mono text-base font-bold text-[#005B4F] tracking-wider placeholder:text-stone-400 placeholder:font-normal placeh` |
| 346 | hex | `#005B4F` | `className="w-full px-4 py-3 rounded-xl border border-stone-300 font-mono text-base font-bold text-[#005B4F] tracking-wider placeholder:text-stone-400 placeholder:font-normal placeh` |
| 358 | hex | `#005B4F` | `className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-white font-semibold text-sm transition-all shadow-sm cursor-pointer"` |
| 358 | hex | `#00473E` | `className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-white font-semibold text-sm transition-all shadow-sm cursor-pointer"` |
| 369 | hex | `#005B4F` | `className="text-xs font-semibold text-[#005B4F] hover:text-[#00473E] inline-flex items-center gap-1.5 cursor-pointer underline underline-offset-2"` |
| 369 | hex | `#00473E` | `className="text-xs font-semibold text-[#005B4F] hover:text-[#00473E] inline-flex items-center gap-1.5 cursor-pointer underline underline-offset-2"` |
| 398 | hex | `#005B4F` | `className="flex-1 px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white card-light focus:outline-none focus:ring-2 focus:ring-[#005B4F]/30"` |
| 403 | hex | `#005B4F` | `className="px-4 py-2 bg-[#005B4F] hover:bg-[#00473E] text-white text-xs font-bold rounded-xl disabled:opacity-50 cursor-pointer"` |
| 403 | hex | `#00473E` | `className="px-4 py-2 bg-[#005B4F] hover:bg-[#00473E] text-white text-xs font-bold rounded-xl disabled:opacity-50 cursor-pointer"` |
| 431 | hex | `#005B4F` | `className="text-xs font-semibold text-[#005B4F] hover:underline mt-1 inline-block"` |

### `src\routes\enrol.success.tsx` - 34

| Line | Kind | Value | Context |
|---:|---|---|---|
| 154 | hex | `#707C90` | `<p className="text-xs font-medium uppercase tracking-widest text-[#707C90]">` |
| 157 | hex | `#151C2E` | `<h1 className="font-serif text-3xl font-bold text-[#151C2E] tracking-tight">` |
| 161 | hex | `#5B6472` | `<p className="text-sm text-[#5B6472]">` |
| 162 | hex | `#151C2E` | `<span className="font-semibold text-[#151C2E]">{tierMeta.name}</span> programme` |
| 167 | hex | `#151C2E` | `<span className="font-mono text-[#151C2E] font-semibold">` |
| 175 | hex | `#5B6472` | `<p className="text-sm text-[#5B6472]">Your enrolment record has been confirmed.</p>` |
| 177 | hex | `#5B6472` | `<p className="text-xs text-[#5B6472]">` |
| 178 | hex | `#151C2E` | `Cohort: <span className="font-semibold text-[#151C2E]">{cohortLabel}</span> · Starts{" "}` |
| 182 | hex | `#5B6472` | `<div className="inline-flex items-center gap-1.5 text-xs text-[#5B6472] editorial-stat-tile px-3 py-1">` |
| 183 | hex | `#707C90` | `<Mail className="h-3.5 w-3.5 text-[#707C90]" /> Digital receipt sent to {data.email}` |
| 201 | hex | `#1e40af` | `className="flex items-center justify-between editorial-btn-blue p-4 text-white hover:bg-[#1e40af]"` |
| 218 | hex | `#8A6D1F` | `<Sparkles className="h-4 w-4 text-[#8A6D1F]" />` |
| 219 | hex | `#151C2E` | `<h2 className="font-serif text-base font-bold text-[#151C2E]">` |
| 223 | hex | `#5B6472` | `<ul className="space-y-3.5 text-xs text-[#5B6472]">` |
| 225 | hex | `#1D4ED8` | `<span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1D4ED8] text-white text-xs font-mono font-medium">` |
| 229 | hex | `#151C2E` | `<p className="font-semibold text-[#151C2E]">Admissions Outreach (within 30 min)</p>` |
| 236 | hex | `#1D4ED8` | `<span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1D4ED8] text-white text-xs font-mono font-medium">` |
| 240 | hex | `#151C2E` | `<p className="font-semibold text-[#151C2E]">` |
| 249 | hex | `#1D4ED8` | `<span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1D4ED8] text-white text-xs font-mono font-medium">` |
| 253 | hex | `#151C2E` | `<p className="font-semibold text-[#151C2E]">Cohort Kickoff ({cohortStarts})</p>` |
| 266 | hex | `#151C2E` | `className="flex items-center gap-3 editorial-stat-tile p-4 text-[#151C2E] hover:bg-slate-200/60 transition-colors"` |
| 268 | hex | `#1D4ED8` | `<ArrowRight className="h-4 w-4 text-[#1D4ED8] shrink-0" />` |
| 270 | hex | `#151C2E` | `<p className="text-xs font-semibold text-[#151C2E]">Open Student Dashboard</p>` |
| 271 | hex | `#5B6472` | `<p className="text-xs text-[#5B6472]">Track progress & module milestones.</p>` |
| 277 | hex | `#151C2E` | `<p className="text-xs font-semibold text-[#151C2E]">ISO 9001 Certified</p>` |
| 278 | hex | `#5B6472` | `<p className="text-xs text-[#5B6472]">` |
| 291 | hex | `#5B6472` | `className="flex items-center justify-center gap-2 text-xs text-[#5B6472] hover:text-[#151C2E] transition-colors pt-2"` |
| 291 | hex | `#151C2E` | `className="flex items-center justify-center gap-2 text-xs text-[#5B6472] hover:text-[#151C2E] transition-colors pt-2"` |
| 293 | hex | `#8A6D1F` | `<Share2 className="h-3.5 w-3.5 text-[#8A6D1F]" /> Share career assessment link with a peer` |
| 312 | hex | `#707C90` | `<AiThinkingLoader label="AI Thinking & Verifying Payment…" size="lg" variant="card" textClassName="text-[#707C90] text-xs font-medium uppercase tracking-widest" />` |
| 313 | hex | `#151C2E` | `<h1 className="font-serif text-2xl font-bold text-[#151C2E]">` |
| 316 | hex | `#5B6472` | `<p className="text-xs text-[#5B6472]">` |
| 336 | hex | `#151C2E` | `<h1 className="font-serif text-2xl font-bold text-[#151C2E]">Payment Processing Issue</h1>` |
| 337 | hex | `#5B6472` | `<p className="text-xs text-[#5B6472]">` |

### `src\components\acri\assessment\AcriAssessmentTerminal.tsx` - 33

| Line | Kind | Value | Context |
|---:|---|---|---|
| 517 | hex | `#F7F8F5` | `<div className="min-h-screen bg-[#F7F8F5]">` |
| 549 | hex | `#FAF8F5` | `<div className="min-h-screen bg-[#FAF8F5] text-[#0B1325] flex flex-col justify-between">` |
| 549 | hex | `#0B1325` | `<div className="min-h-screen bg-[#FAF8F5] text-[#0B1325] flex flex-col justify-between">` |
| 551 | hex | `#0B1325` | `<header className="border-b border-stone-200 bg-[#0B1325] text-white px-4 sm:px-6 py-3.5 flex items-center justify-between">` |
| 593 | hex | `#0B1325` | `className="px-4 py-2.5 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs flex it` |
| 593 | hex | `#1B3F8B` | `className="px-4 py-2.5 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs flex it` |
| 611 | hex | `#005B4F` | `<div className="rounded-2xl border-2 border-[#005B4F]/40 bg-[#FAF9F6] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm tone-light card-light">` |
| 611 | hex | `#FAF9F6` | `<div className="rounded-2xl border-2 border-[#005B4F]/40 bg-[#FAF9F6] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm tone-light card-light">` |
| 613 | hex | `#005B4F` | `<div className="h-11 w-11 rounded-xl bg-[#005B4F] text-slate-50 flex items-center justify-center shrink-0">` |
| 618 | hex | `#005B4F` | `<span className="font-mono text-[10px] font-bold text-[#005B4F] uppercase tracking-wider bg-[#E8F7F1] px-2.5 py-0.5 rounded-full border border-[#005B4F]/20">` |
| 618 | hex | `#E8F7F1` | `<span className="font-mono text-[10px] font-bold text-[#005B4F] uppercase tracking-wider bg-[#E8F7F1] px-2.5 py-0.5 rounded-full border border-[#005B4F]/20">` |
| 618 | hex | `#005B4F` | `<span className="font-mono text-[10px] font-bold text-[#005B4F] uppercase tracking-wider bg-[#E8F7F1] px-2.5 py-0.5 rounded-full border border-[#005B4F]/20">` |
| 644 | hex | `#1B3F8B` | `<span className="font-mono text-[10px] font-bold text-[#1B3F8B] uppercase tracking-widest bg-blue-50 px-2.5 py-0.5 rounded-full">` |
| 654 | hex | `#005B4F` | `className="text-xs font-mono font-bold text-[#005B4F] hover:underline cursor-pointer text-left sm:text-right"` |
| 669 | hex | `#005B4F` | `className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 bg-white tone-light text-xs font-mono font-bold text-stone-900 tracking-wider placeholder:text-stone-400 focu` |
| 676 | hex | `#005B4F` | `className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-slate-50 font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-point` |
| 676 | hex | `#00473E` | `className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-slate-50 font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-point` |
| 689 | hex | `#07241A` | `<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#07241A] text-emerald-400 border border-emerald-800/40">` |
| 693 | hex | `#0B1325` | `<h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1325] tracking-tight">` |
| 740 | hex | `#0B1325` | `<div className="rounded-2xl border-2 border-[#0B1325] bg-white tone-light p-6 sm:p-7 shadow-md relative flex flex-col justify-between">` |
| 741 | hex | `#0B1325` | `<div className="absolute -top-3 right-6 bg-[#0B1325] text-slate-50 text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-0.5 rounded-full shadow-xs">` |
| 747 | hex | `#0B1325` | `<div className="h-10 w-10 rounded-xl bg-[#0B1325] text-slate-50 flex items-center justify-center">` |
| 751 | hex | `#0B1325` | `<h2 className="font-bold text-lg text-[#0B1325]">` |
| 788 | hex | `#0B1325` | `: "bg-[#0B1325] hover:bg-[#1B3F8B] text-slate-50 cursor-pointer"` |
| 788 | hex | `#1B3F8B` | `: "bg-[#0B1325] hover:bg-[#1B3F8B] text-slate-50 cursor-pointer"` |
| 813 | hex | `#0B1325` | `<h2 className="font-bold text-lg text-[#0B1325]">` |
| 902 | hex | `#0B1325` | `className="border-b border-stone-200 bg-[#0B1325] text-white px-4 sm:px-6 flex items-center justify-between shrink-0"` |
| 986 | hex | `#FAF8F5` | `<footer className="border-t border-stone-200 bg-[#FAF8F5] px-4 py-2 text-[11px] font-mono text-stone-500 flex flex-wrap items-center justify-between shrink-0">` |
| 995 | hex | `#0B1325` | `<div className="flex items-center gap-2.5 text-[#0B1325]">` |
| 1014 | hex | `#0B1325` | `className="flex-1 py-2.5 px-4 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"` |
| 1014 | hex | `#1B3F8B` | `className="flex-1 py-2.5 px-4 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"` |
| 1056 | hex | `#0B1325` | `className="w-full py-2.5 px-4 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"` |
| 1056 | hex | `#1B3F8B` | `className="w-full py-2.5 px-4 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"` |

### `src\routes\acri.assessment.$sessionId.tsx` - 33

| Line | Kind | Value | Context |
|---:|---|---|---|
| 207 | hex | `#F8F9F7` | `<div className="min-h-screen bg-[#F8F9F7] text-[#1D2939] font-sans antialiased flex flex-col justify-between">` |
| 207 | hex | `#1D2939` | `<div className="min-h-screen bg-[#F8F9F7] text-[#1D2939] font-sans antialiased flex flex-col justify-between">` |
| 209 | hex | `#E5E7EB` | `<header className="border-b border-[#E5E7EB] bg-white/80 backdrop-blur-md py-4 px-6 sm:px-12 flex items-center justify-between">` |
| 211 | hex | `#005B4F` | `<div className="h-9 w-9 rounded-xl bg-[#005B4F] flex items-center justify-center text-white">` |
| 215 | hex | `#0B1325` | `<span className="font-serif font-bold text-lg text-[#0B1325] block leading-none">` |
| 218 | hex | `#005B4F` | `<span className="font-mono text-[9px] uppercase tracking-widest text-[#005B4F] font-bold">` |
| 232 | hex | `#D9DEE0` | `<div className="w-full max-w-xl rounded-3xl bg-white card-light border border-[#D9DEE0] shadow-xl p-6 sm:p-10 space-y-6">` |
| 234 | hex | `#E8F7F1` | `<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F7F1] text-[#005B4F] text-xs font-mono font-bold">` |
| 234 | hex | `#005B4F` | `<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F7F1] text-[#005B4F] text-xs font-mono font-bold">` |
| 235 | hex | `#005B4F` | `<CheckCircle2 className="h-4 w-4 text-[#005B4F]" />` |
| 250 | hex | `#005B4F` | `<div className="flex items-center gap-1.5 text-[#005B4F]">` |
| 259 | hex | `#005B4F` | `<div className="flex items-center gap-1.5 text-[#005B4F]">` |
| 269 | hex | `#E8F7F1` | `<div className="rounded-2xl p-4 bg-[#E8F7F1]/40 border border-emerald-200/80 space-y-2">` |
| 289 | hex | `#005B4F` | `className="w-full py-4 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-white font-sans font-bold text-sm sm:text-base tracking-wide transition-all shadow-md hover:shadow-lg flex it` |
| 289 | hex | `#00473E` | `className="w-full py-4 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-white font-sans font-bold text-sm sm:text-base tracking-wide transition-all shadow-md hover:shadow-lg flex it` |
| 311 | hex | `#FAF8F5` | `<div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-6 text-center space-y-4">` |
| 312 | hex | `#E8F7F1` | `<div className="h-16 w-16 rounded-full bg-[#E8F7F1] flex items-center justify-center text-[#005B4F] motion-safe:animate-pulse">` |
| 312 | hex | `#005B4F` | `<div className="h-16 w-16 rounded-full bg-[#E8F7F1] flex items-center justify-center text-[#005B4F] motion-safe:animate-pulse">` |
| 327 | hex | `#FAF8F5` | `<div className="min-h-screen bg-[#FAF8F5] text-[#0B1325] font-sans antialiased flex flex-col selection:bg-[#E8F7F1]">` |
| 327 | hex | `#0B1325` | `<div className="min-h-screen bg-[#FAF8F5] text-[#0B1325] font-sans antialiased flex flex-col selection:bg-[#E8F7F1]">` |
| 327 | hex | `#E8F7F1` | `<div className="min-h-screen bg-[#FAF8F5] text-[#0B1325] font-sans antialiased flex flex-col selection:bg-[#E8F7F1]">` |
| 331 | hex | `#005B4F` | `<div className="h-8 w-8 rounded-lg bg-[#005B4F] flex items-center justify-center text-white font-serif font-bold text-sm">` |
| 357 | hex | `#005B4F` | `<Clock className="h-3.5 w-3.5 text-[#005B4F]" />` |
| 366 | hex | `#005B4F` | `className="bg-[#005B4F] h-1 transition-all duration-300"` |
| 415 | hex | `#005B4F` | `<div className="mt-2 p-3 bg-stone-50/80 rounded-lg border-l-2 border-[#005B4F] text-xs text-stone-700 italic">` |
| 443 | hex | `#E8F7F1` | `? "bg-[#E8F7F1]/50 border-[#005B4F] ring-1 ring-[#005B4F] shadow-xs"` |
| 443 | hex | `#005B4F` | `? "bg-[#E8F7F1]/50 border-[#005B4F] ring-1 ring-[#005B4F] shadow-xs"` |
| 443 | hex | `#005B4F` | `? "bg-[#E8F7F1]/50 border-[#005B4F] ring-1 ring-[#005B4F] shadow-xs"` |
| 450 | hex | `#005B4F` | `? "bg-[#005B4F] text-white"` |
| 487 | hex | `#005B4F` | `className="px-6 py-2.5 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-white text-xs font-bold font-mono inline-flex items-center gap-2 shadow-xs cursor-pointer"` |
| 487 | hex | `#00473E` | `className="px-6 py-2.5 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-white text-xs font-bold font-mono inline-flex items-center gap-2 shadow-xs cursor-pointer"` |
| 497 | hex | `#0B1325` | `className="px-6 py-2.5 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white text-xs font-bold font-mono inline-flex items-center gap-2 shadow-md cursor-pointer group"` |
| 497 | hex | `#1B3F8B` | `className="px-6 py-2.5 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white text-xs font-bold font-mono inline-flex items-center gap-2 shadow-md cursor-pointer group"` |

### `src\components\courses\sections\RiskReversalBlock.tsx` - 32

| Line | Kind | Value | Context |
|---:|---|---|---|
| 25 | hex | `#34d399` | `return <Check className="mx-auto h-5 w-5" style={{ color: "#34d399" }} aria-label="included" />;` |
| 30 | rgba | `rgba(248,250,252,0.55)` | `style={{ color: "rgba(248,250,252,0.55)" }}` |
| 71 | rgba | `rgba(255,255,255,0.10)` | `style={{ borderColor: "rgba(255,255,255,0.10)", background: "rgba(15,23,42,0.55)" }}` |
| 71 | rgba | `rgba(15,23,42,0.55)` | `style={{ borderColor: "rgba(255,255,255,0.10)", background: "rgba(15,23,42,0.55)" }}` |
| 75 | rgba | `rgba(255,255,255,0.10)` | `<tr className="border-b" style={{ borderColor: "rgba(255,255,255,0.10)" }}>` |
| 78 | rgba | `rgba(248,250,252,0.55)` | `style={{ color: "rgba(248,250,252,0.55)" }}` |
| 82 | rgba | `rgba(248,250,252,0.7)` | `style={{ color: "rgba(248,250,252,0.7)" }}` |
| 87 | rgba | `rgba(248,250,252,0.45)` | `style={{ color: "rgba(248,250,252,0.45)" }}` |
| 94 | rgba | `rgba(248,250,252,0.7)` | `style={{ color: "rgba(248,250,252,0.7)" }}` |
| 99 | rgba | `rgba(248,250,252,0.45)` | `style={{ color: "rgba(248,250,252,0.45)" }}` |
| 107 | rgba | `rgba(245,196,81,0.15)` | `style={{ background: "rgba(245,196,81,0.15)", color: "#F5C451" }}` |
| 116 | rgba | `rgba(255,255,255,0.02)` | `<tr key={i} style={{ background: i % 2 ? "rgba(255,255,255,0.02)" : "transparent" }}>` |
| 117 | rgba | `rgba(248,250,252,0.85)` | `<td className="px-4 py-3.5 sm:px-6" style={{ color: "rgba(248,250,252,0.85)" }}>` |
| 132 | hex | `#0f1b3d` | `style={{ background: "#0f1b3d", boxShadow: "inset 0 0 0 1px rgba(201,168,76,0.25)" }}` |
| 132 | rgba | `rgba(201,168,76,0.25)` | `style={{ background: "#0f1b3d", boxShadow: "inset 0 0 0 1px rgba(201,168,76,0.25)" }}` |
| 139 | rgba | `rgba(201,168,76,0.15)` | `background: "rgba(201,168,76,0.15)",` |
| 140 | rgba | `rgba(201,168,76,0.35)` | `boxShadow: "inset 0 0 0 1px rgba(201,168,76,0.35)",` |
| 160 | rgba | `rgba(248,250,252,0.55)` | `<span style={{ color: "rgba(248,250,252,0.55)" }}> ÷ </span>` |
| 162 | rgba | `rgba(248,250,252,0.55)` | `<span style={{ color: "rgba(248,250,252,0.55)" }}> median first-month salary = </span>` |
| 165 | rgba | `rgba(248,250,252,0.65)` | `<p className="mt-1.5 text-meta" style={{ color: "rgba(248,250,252,0.65)" }}>` |
| 173 | rgba | `rgba(255,255,255,0.06)` | `background: "rgba(255,255,255,0.06)",` |
| 174 | rgba | `rgba(255,255,255,0.10)` | `boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.10)",` |
| 179 | rgba | `rgba(248,250,252,0.55)` | `style={{ color: "rgba(248,250,252,0.55)" }}` |
| 185 | rgba | `rgba(248,250,252,0.55)` | `<span className="ml-1 text-base" style={{ color: "rgba(248,250,252,0.55)" }}>` |
| 196 | rgba | `rgba(255,255,255,0.10)` | `style={{ borderColor: "rgba(255,255,255,0.10)", background: "rgba(15,23,42,0.6)" }}` |
| 196 | rgba | `rgba(15,23,42,0.6)` | `style={{ borderColor: "rgba(255,255,255,0.10)", background: "rgba(15,23,42,0.6)" }}` |
| 201 | rgba | `rgba(248,250,252,0.55)` | `style={{ color: "rgba(248,250,252,0.55)" }}` |
| 207 | rgba | `rgba(248,250,252,0.6)` | `<span className="text-caption font-normal" style={{ color: "rgba(248,250,252,0.6)" }}>` |
| 211 | rgba | `rgba(248,250,252,0.6)` | `<p className="mt-1 text-caption" style={{ color: "rgba(248,250,252,0.6)" }}>` |
| 220 | hex | `#0A0F1E` | `style={{ background: "#F5C451", color: "#0A0F1E" }}` |
| 227 | hex | `#0A0F1E` | `<div className="tone-light mt-8 rounded-2xl border border-white/10 bg-white p-6 text-[#0A0F1E] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] sm:p-8">` |
| 231 | hex | `#94A3B8` | `<p className="mt-6 text-caption" style={{ color: "#94A3B8" }}>` |

### `src\routes\tools.cost-calculator.tsx` - 32

| Line | Kind | Value | Context |
|---:|---|---|---|
| 49 | hex | `#FAF9F6` | `<div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans selection:bg-[#1B3F8B] selection:text-white pb-24">` |
| 49 | hex | `#1B3F8B` | `<div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans selection:bg-[#1B3F8B] selection:text-white pb-24">` |
| 55 | hex | `#0B1325` | `className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-stone-700 hover:text-[#0B1325] uppercase tracking-wider"` |
| 59 | hex | `#1B3F8B` | `<span className="font-mono text-[10px] font-bold text-[#1B3F8B] uppercase tracking-widest">` |
| 69 | hex | `#1B3F8B` | `<span className="inline-block w-2.5 h-2.5 rounded-full bg-[#1B3F8B] motion-safe:animate-pulse" />` |
| 70 | hex | `#1B3F8B` | `<span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1B3F8B] bg-stone-100 px-2.5 py-1 rounded border border-stone-200">` |
| 75 | hex | `#0B1325` | `<h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1325] tracking-tight">` |
| 89 | hex | `#0B1325` | `<h2 className="font-serif text-xl font-bold text-[#0B1325] mb-6 flex items-center gap-2">` |
| 90 | hex | `#1B3F8B` | `<Calculator className="w-5 h-5 text-[#1B3F8B]" /> 1. Input Your Parameters` |
| 98 | hex | `#1B3F8B` | `<span className="text-[#1B3F8B]">{courseDuration} Months</span>` |
| 106 | hex | `#1B3F8B` | `className="w-full accent-[#1B3F8B]"` |
| 114 | hex | `#1B3F8B` | `<span className="text-[#1B3F8B]">₹{pgRent.toLocaleString()}/mo</span>` |
| 123 | hex | `#1B3F8B` | `className="w-full accent-[#1B3F8B]"` |
| 131 | hex | `#1B3F8B` | `<span className="text-[#1B3F8B]">₹{foodCost.toLocaleString()}/mo</span>` |
| 140 | hex | `#1B3F8B` | `className="w-full accent-[#1B3F8B]"` |
| 148 | hex | `#1B3F8B` | `<span className="text-[#1B3F8B]">₹{transportCost.toLocaleString()}/mo</span>` |
| 157 | hex | `#1B3F8B` | `className="w-full accent-[#1B3F8B]"` |
| 165 | hex | `#1B3F8B` | `<span className="text-[#1B3F8B]">₹{courseFee.toLocaleString()}</span>` |
| 174 | hex | `#1B3F8B` | `className="w-full accent-[#1B3F8B]"` |
| 182 | hex | `#1B3F8B` | `<span className="text-[#1B3F8B]">{jobSearchMonths} Months</span>` |
| 190 | hex | `#1B3F8B` | `className="w-full accent-[#1B3F8B]"` |
| 198 | hex | `#1B3F8B` | `<span className="text-[#1B3F8B]">₹{targetSalaryLpa.toFixed(1)} LPA</span>` |
| 207 | hex | `#1B3F8B` | `className="w-full accent-[#1B3F8B]"` |
| 216 | hex | `#0B1325` | `<div className="bg-[#0B1325] tone-dark text-white rounded-xl p-6 sm:p-8 border border-stone-800">` |
| 264 | hex | `#0B1325` | `<h3 className="font-serif font-bold text-base text-[#0B1325] mb-2">` |
| 277 | hex | `#0B1325` | `className="w-full inline-flex items-center justify-center gap-2 bg-[#0B1325] hover:bg-[#1B3F8B] text-white px-4 py-2.5 rounded text-xs font-mono font-bold uppercase tracking-wider ` |
| 277 | hex | `#1B3F8B` | `className="w-full inline-flex items-center justify-center gap-2 bg-[#0B1325] hover:bg-[#1B3F8B] text-white px-4 py-2.5 rounded text-xs font-mono font-bold uppercase tracking-wider ` |
| 289 | hex | `#1B3F8B` | `<span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B] bg-blue-50 px-2.5 py-1 rounded border border-blue-200 inline-block">` |
| 292 | hex | `#0B1325` | `<h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1325]">` |
| 302 | hex | `#1B3F8B` | `<span className="font-mono text-xs font-bold text-[#1B3F8B] block">1. 12 Months of Time Exposure</span>` |
| 309 | hex | `#1B3F8B` | `<span className="font-mono text-xs font-bold text-[#1B3F8B] block">2. Unearned Fresher Compensation</span>` |
| 316 | hex | `#1B3F8B` | `<span className="font-mono text-xs font-bold text-[#1B3F8B] block">3. Compounding Seniority Gap</span>` |

### `src\components\landing\RoleTrackLibrary.tsx` - 31

| Line | Kind | Value | Context |
|---:|---|---|---|
| 54 | hex | `#F8FAFC` | `<section id="role-tracks" className="py-12 sm:py-16 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC] tone-light text-[#1A1A1A] relative overflow-hidden">` |
| 54 | hex | `#F1F5F9` | `<section id="role-tracks" className="py-12 sm:py-16 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC] tone-light text-[#1A1A1A] relative overflow-hidden">` |
| 54 | hex | `#F8FAFC` | `<section id="role-tracks" className="py-12 sm:py-16 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC] tone-light text-[#1A1A1A] relative overflow-hidden">` |
| 54 | hex | `#1A1A1A` | `<section id="role-tracks" className="py-12 sm:py-16 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC] tone-light text-[#1A1A1A] relative overflow-hidden">` |
| 58 | hex | `#1B3F8B` | `<div className="inline-flex items-center gap-2 rounded-full border border-sky-300 bg-sky-50 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-[#1B3F8B] shadow-` |
| 59 | hex | `#1B3F8B` | `<Sparkles className="h-3.5 w-3.5 text-[#1B3F8B]" />` |
| 63 | hex | `#1A1A1A` | `<h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1A1A1A] leading-tight">` |
| 65 | hex | `#8A6D1F` | `<span className="italic font-normal text-[#8A6D1F]">` |
| 83 | hex | `#1B3F8B` | `? "bg-[#1B3F8B] text-white border-[#1B3F8B] shadow-xs"` |
| 83 | hex | `#1B3F8B` | `? "bg-[#1B3F8B] text-white border-[#1B3F8B] shadow-xs"` |
| 111 | hex | `#1B3F8B` | `? "bg-white border-[#1B3F8B] shadow-md ring-2 ring-[#1B3F8B]/15"` |
| 111 | hex | `#1B3F8B` | `? "bg-white border-[#1B3F8B] shadow-md ring-2 ring-[#1B3F8B]/15"` |
| 119 | hex | `#1B3F8B` | `? "bg-sky-50 text-[#1B3F8B] border-sky-300"` |
| 128 | hex | `#1A1A1A` | `<span className="font-serif font-bold text-sm sm:text-base text-[#1A1A1A] group-hover:text-[#1B3F8B] transition-colors">` |
| 128 | hex | `#1B3F8B` | `<span className="font-serif font-bold text-sm sm:text-base text-[#1A1A1A] group-hover:text-[#1B3F8B] transition-colors">` |
| 137 | hex | `#1B3F8B` | `<span className="text-[11px] font-mono font-bold text-[#1B3F8B]">` |
| 146 | hex | `#8A6D1F` | `<span className="text-[10px] font-mono font-bold text-[#8A6D1F] bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">` |
| 152 | hex | `#1B3F8B` | `isSelected ? "text-[#1B3F8B] translate-x-1" : "text-stone-400 group-hover:text-stone-600"` |
| 168 | hex | `#1B3F8B` | `<span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 border border-sky-200 px-3 py-1 text-xs font-mono font-bold text-[#1B3F8B]">` |
| 178 | hex | `#1A1A1A` | `<h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">` |
| 190 | hex | `#1B3F8B` | `<span className="font-serif font-bold text-base text-[#1B3F8B] mt-0.5 block">` |
| 197 | hex | `#1B3F8B` | `<span className="font-mono font-bold text-sm text-[#1B3F8B] mt-0.5 block">` |
| 215 | hex | `#1B3F8B` | `<BarChart3 className="h-4 w-4 text-[#1B3F8B]" />` |
| 228 | hex | `#1B3F8B` | `<span className="font-mono text-[#1B3F8B] font-bold">{item.percentage}% of JDs</span>` |
| 232 | hex | `#1B3F8B` | `className="h-full bg-[#1B3F8B] rounded-full transition-all duration-500"` |
| 245 | hex | `#1B3F8B` | `<Building2 className="h-4 w-4 text-[#1B3F8B]" />` |
| 280 | hex | `#1A1A1A` | `<p className="text-sm font-extrabold text-[#1A1A1A]">Curriculum Mapped to {selectedTrack.jdCountAnalyzed} Live JDs</p>` |
| 286 | hex | `#1B3F8B` | `style={{ color: "#FFFFFF", backgroundColor: "#1B3F8B" }}` |
| 287 | hex | `#1B3F8B` | `className="h-12 px-6 inline-flex items-center justify-center gap-2 text-sm font-extrabold text-white rounded-xl bg-[#1B3F8B] hover:bg-[#153270] shadow-md shadow-[#1B3F8B]/20 transi` |
| 287 | hex | `#153270` | `className="h-12 px-6 inline-flex items-center justify-center gap-2 text-sm font-extrabold text-white rounded-xl bg-[#1B3F8B] hover:bg-[#153270] shadow-md shadow-[#1B3F8B]/20 transi` |
| 287 | hex | `#1B3F8B` | `className="h-12 px-6 inline-flex items-center justify-center gap-2 text-sm font-extrabold text-white rounded-xl bg-[#1B3F8B] hover:bg-[#153270] shadow-md shadow-[#1B3F8B]/20 transi` |

### `src\components\system\ArzonFooter.tsx` - 31

| Line | Kind | Value | Context |
|---:|---|---|---|
| 64 | hex | `#E4EAF2` | `className="arzon-site-footer tone-light border-t border-[#E4EAF2] bg-white text-[#69758A]"` |
| 64 | hex | `#69758A` | `className="arzon-site-footer tone-light border-t border-[#E4EAF2] bg-white text-[#69758A]"` |
| 67 | hex | `#1557D6` | `<div className="h-px w-full bg-gradient-to-r from-transparent via-[#1557D6]/20 to-transparent" />` |
| 71 | hex | `#E4EAF2` | `<div className="grid gap-10 border-b border-[#E4EAF2] pb-10 lg:grid-cols-[1.2fr_2fr_1fr]">` |
| 78 | hex | `#3F4A60` | `<p className="mt-4 text-sm leading-7 text-[#3F4A60]">` |
| 85 | hex | `#E4EAF2` | `<div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#E4EAF2] bg-[#F7F9FE] px-3 py-2 text-xs font-semibold text-[#3F4A60]">` |
| 85 | hex | `#F7F9FE` | `<div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#E4EAF2] bg-[#F7F9FE] px-3 py-2 text-xs font-semibold text-[#3F4A60]">` |
| 85 | hex | `#3F4A60` | `<div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#E4EAF2] bg-[#F7F9FE] px-3 py-2 text-xs font-semibold text-[#3F4A60]">` |
| 86 | hex | `#27B9B3` | `<ShieldCheck className="h-3.5 w-3.5 text-[#27B9B3]" />` |
| 97 | hex | `#E4EAF2` | `className="grid h-8 w-8 place-items-center rounded-full border border-[#E4EAF2] bg-white tone-light text-slate-500 hover:border-[#1557D6] hover:text-[#1557D6] transition-colors"` |
| 97 | hex | `#1557D6` | `className="grid h-8 w-8 place-items-center rounded-full border border-[#E4EAF2] bg-white tone-light text-slate-500 hover:border-[#1557D6] hover:text-[#1557D6] transition-colors"` |
| 97 | hex | `#1557D6` | `className="grid h-8 w-8 place-items-center rounded-full border border-[#E4EAF2] bg-white tone-light text-slate-500 hover:border-[#1557D6] hover:text-[#1557D6] transition-colors"` |
| 106 | hex | `#E4EAF2` | `className="grid h-8 w-8 place-items-center rounded-full border border-[#E4EAF2] bg-white tone-light text-slate-500 hover:border-[#1557D6] hover:text-[#1557D6] transition-colors"` |
| 106 | hex | `#1557D6` | `className="grid h-8 w-8 place-items-center rounded-full border border-[#E4EAF2] bg-white tone-light text-slate-500 hover:border-[#1557D6] hover:text-[#1557D6] transition-colors"` |
| 106 | hex | `#1557D6` | `className="grid h-8 w-8 place-items-center rounded-full border border-[#E4EAF2] bg-white tone-light text-slate-500 hover:border-[#1557D6] hover:text-[#1557D6] transition-colors"` |
| 115 | hex | `#E4EAF2` | `className="inline-flex items-center gap-1.5 h-8 rounded-full border border-[#E4EAF2] bg-white tone-light px-3 text-[11px] font-semibold text-slate-500 hover:border-emerald-300 hove` |
| 132 | hex | `#69758A` | `className="text-sm text-[#69758A] hover:text-[#1557D6] transition-colors"` |
| 132 | hex | `#1557D6` | `className="text-sm text-[#69758A] hover:text-[#1557D6] transition-colors"` |
| 146 | hex | `#3F4A60` | `<p className="mt-3 text-sm leading-6 text-[#3F4A60]">` |
| 162 | hex | `#E4EAF2` | `className="tone-light h-10 w-full rounded-full border border-[#E4EAF2] bg-white px-4 text-sm text-[#071A4A] outline-none focus:border-[#1557D6] focus:ring-2 focus:ring-[#1557D6]/10` |
| 162 | hex | `#071A4A` | `className="tone-light h-10 w-full rounded-full border border-[#E4EAF2] bg-white px-4 text-sm text-[#071A4A] outline-none focus:border-[#1557D6] focus:ring-2 focus:ring-[#1557D6]/10` |
| 162 | hex | `#1557D6` | `className="tone-light h-10 w-full rounded-full border border-[#E4EAF2] bg-white px-4 text-sm text-[#071A4A] outline-none focus:border-[#1557D6] focus:ring-2 focus:ring-[#1557D6]/10` |
| 162 | hex | `#1557D6` | `className="tone-light h-10 w-full rounded-full border border-[#E4EAF2] bg-white px-4 text-sm text-[#071A4A] outline-none focus:border-[#1557D6] focus:ring-2 focus:ring-[#1557D6]/10` |
| 164 | hex | `#69758A` | `<label className="flex items-start gap-2 text-[11px] leading-4 text-[#69758A] cursor-pointer">` |
| 169 | hex | `#1557D6` | `className="mt-0.5 accent-[#1557D6]"` |
| 182 | hex | `#69758A` | `<div className="flex flex-col gap-4 pt-6 text-xs text-[#69758A] sm:flex-row sm:items-center sm:justify-between">` |
| 185 | hex | `#071A4A` | `<Link to="/about" className="hover:text-[#071A4A] transition-colors">About</Link>` |
| 186 | hex | `#071A4A` | `<Link to="/contact" className="hover:text-[#071A4A] transition-colors">Contact</Link>` |
| 187 | hex | `#071A4A` | `<Link to="/legal/privacy" className="hover:text-[#071A4A] transition-colors">Privacy</Link>` |
| 188 | hex | `#071A4A` | `<Link to="/legal/terms" className="hover:text-[#071A4A] transition-colors">Terms</Link>` |
| 189 | hex | `#071A4A` | `<Link to="/refund" className="hover:text-[#071A4A] transition-colors">Refunds</Link>` |

### `src\components\acri\AcriHero.tsx` - 30

| Line | Kind | Value | Context |
|---:|---|---|---|
| 30 | hex | `#FAF8F5` | `<section className="relative overflow-hidden bg-[#FAF8F5] pt-8 pb-14 lg:pt-12 lg:pb-20">` |
| 36 | hex | `#005B4F` | `<div className="inline-flex items-center gap-2 rounded-full border border-[#005B4F]/20 bg-[#E8F7F1] px-3.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#005B` |
| 36 | hex | `#E8F7F1` | `<div className="inline-flex items-center gap-2 rounded-full border border-[#005B4F]/20 bg-[#E8F7F1] px-3.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#005B` |
| 36 | hex | `#005B4F` | `<div className="inline-flex items-center gap-2 rounded-full border border-[#005B4F]/20 bg-[#E8F7F1] px-3.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#005B` |
| 37 | hex | `#005B4F` | `<span className="h-1.5 w-1.5 rounded-full bg-[#005B4F] motion-safe:animate-pulse" />` |
| 42 | hex | `#0B1325` | `<h1 className="font-serif text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-tight text-[#0B1325] leading-[1.12]">` |
| 44 | hex | `#005B4F` | `<span className="text-[#005B4F]">Healthcare Career.</span>` |
| 58 | hex | `#005B4F` | `className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#005B4F] hover:bg-[#00473E] px-7 py-4 text-sm sm:text-base font-bold text-white transition-all shadow-md h` |
| 58 | hex | `#00473E` | `className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#005B4F] hover:bg-[#00473E] px-7 py-4 text-sm sm:text-base font-bold text-white transition-all shadow-md h` |
| 76 | hex | `#E8F7F1` | `<div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E8F7F1] text-[#005B4F]">` |
| 76 | hex | `#005B4F` | `<div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E8F7F1] text-[#005B4F]">` |
| 77 | hex | `#005B4F` | `<Play className="h-2.5 w-2.5 fill-[#005B4F] ml-0.5" />` |
| 86 | hex | `#005B4F` | `<Clock className="h-3.5 w-3.5 text-[#005B4F] shrink-0" />` |
| 90 | hex | `#005B4F` | `<ShieldCheck className="h-3.5 w-3.5 text-[#005B4F] shrink-0" />` |
| 94 | hex | `#005B4F` | `<Sparkles className="h-3.5 w-3.5 text-[#005B4F] shrink-0" />` |
| 98 | hex | `#005B4F` | `<Award className="h-3.5 w-3.5 text-[#005B4F] shrink-0" />` |
| 106 | hex | `#0B1325` | `<div className="font-sans text-2xl sm:text-3xl font-extrabold text-[#0B1325]">10,000+</div>` |
| 110 | hex | `#005B4F` | `<div className="font-sans text-2xl sm:text-3xl font-extrabold text-[#005B4F]">100</div>` |
| 114 | hex | `#0B1325` | `<div className="font-sans text-2xl sm:text-3xl font-extrabold text-[#0B1325]">9</div>` |
| 118 | hex | `#0B1325` | `<div className="font-sans text-2xl sm:text-3xl font-extrabold text-[#0B1325]">25 min</div>` |
| 131 | hex | `#005B4F` | `<span className="font-serif italic font-semibold text-sm text-[#005B4F] bg-[#E8F7F1] px-3 py-1 rounded-full border border-[#005B4F]/30 shadow-xs">` |
| 131 | hex | `#E8F7F1` | `<span className="font-serif italic font-semibold text-sm text-[#005B4F] bg-[#E8F7F1] px-3 py-1 rounded-full border border-[#005B4F]/30 shadow-xs">` |
| 131 | hex | `#005B4F` | `<span className="font-serif italic font-semibold text-sm text-[#005B4F] bg-[#E8F7F1] px-3 py-1 rounded-full border border-[#005B4F]/30 shadow-xs">` |
| 148 | hex | `#0B1325` | `<div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0B1325]/70 to-transparent pointer-events-none flex items-end p-4">` |
| 183 | hex | `#005B4F` | `stroke="#005B4F"` |
| 192 | hex | `#0B1325` | `<span className="font-sans text-xl font-black text-[#0B1325]">82</span>` |
| 211 | hex | `#005B4F` | `<div className="h-full bg-[#005B4F] rounded-full" style={{ width: "86%" }} />` |
| 218 | hex | `#005B4F` | `<div className="h-full bg-[#005B4F] rounded-full" style={{ width: "76%" }} />` |
| 236 | hex | `#005B4F` | `className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white tone-light card-light border border-stone-200/60 shadow-2xs hover:border-[#005B4F]/40 transition-colors"` |
| 238 | hex | `#005B4F` | `<div className="h-2 w-2 rounded-full bg-[#005B4F]" />` |

### `src\components\candidate\EnterpriseAiAssessmentEngine.tsx` - 30

| Line | Kind | Value | Context |
|---:|---|---|---|
| 417 | hex | `#104` | `scenario: "In an oncology clinical trial dataset with 400 subjects, Subject #104 has: Date of Informed Consent = 14-Aug-2025; First Dose Administration = 10-Aug-2025. What critical` |
| 596 | hex | `#1B3F8B` | `<BorderBeam size={220} duration={8} delay={0} colorFrom="#1B3F8B" colorTo="#8A6D1F" />` |
| 596 | hex | `#8A6D1F` | `<BorderBeam size={220} duration={8} delay={0} colorFrom="#1B3F8B" colorTo="#8A6D1F" />` |
| 600 | hex | `#1B3F8B` | `<div className="mx-auto h-16 w-16 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-[#1B3F8B] shadow-md">` |
| 601 | hex | `#1B3F8B` | `<Sparkles className="h-8 w-8 text-[#1B3F8B] motion-safe:animate-spin" />` |
| 605 | hex | `#1A1A1A` | `<h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">` |
| 614 | hex | `#FAF8F5` | `<div className="rounded-2xl bg-[#FAF8F5] border border-stone-200 p-5 space-y-3">` |
| 617 | hex | `#1B3F8B` | `<span className="text-[#1B3F8B]">{(synthesisStep + 1) * 25}%</span>` |
| 622 | hex | `#1B3F8B` | `className="h-full bg-gradient-to-r from-[#1B3F8B] via-sky-500 to-[#8A6D1F] transition-all duration-500 rounded-full"` |
| 622 | hex | `#8A6D1F` | `className="h-full bg-gradient-to-r from-[#1B3F8B] via-sky-500 to-[#8A6D1F] transition-all duration-500 rounded-full"` |
| 658 | hex | `#1A1A1A` | `<h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">` |
| 666 | hex | `#1B3F8B` | `<span className="text-sm font-bold text-[#1B3F8B]">` |
| 685 | hex | `#1B3F8B` | `? "bg-sky-50/80 border-[#1B3F8B] shadow-xs ring-2 ring-[#1B3F8B]/20"` |
| 685 | hex | `#1B3F8B` | `? "bg-sky-50/80 border-[#1B3F8B] shadow-xs ring-2 ring-[#1B3F8B]/20"` |
| 688 | hex | `#FAF8F5` | `: "bg-[#FAF8F5] border-stone-200 opacity-60"` |
| 698 | hex | `#1B3F8B` | `<Icon className={`h-3.5 w-3.5 ${isCurrent ? "text-[#1B3F8B]" : "text-stone-400"}`} />` |
| 701 | hex | `#1A1A1A` | `<p className="font-serif text-xs font-bold text-[#1A1A1A] truncate">` |
| 712 | hex | `#1B3F8B` | `className="h-full bg-[#1B3F8B] transition-all duration-300 rounded-full"` |
| 730 | hex | `#1B3F8B` | `<span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider bg-sky-50 px-3 py-1 rounded-lg border border-sky-200">` |
| 731 | hex | `#1B3F8B` | `<Activity className="h-3.5 w-3.5 text-[#1B3F8B]" />` |
| 745 | hex | `#1A1A1A` | `<h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#1A1A1A] leading-snug">` |
| 749 | hex | `#FAF8F5` | `<div className="rounded-xl bg-[#FAF8F5] border border-stone-200 p-4 text-xs sm:text-sm font-sans font-medium text-stone-700 leading-relaxed">` |
| 776 | hex | `#1B3F8B` | `? "bg-sky-50/90 border-[#1B3F8B] shadow-md ring-2 ring-[#1B3F8B]/30 translate-x-1"` |
| 776 | hex | `#1B3F8B` | `? "bg-sky-50/90 border-[#1B3F8B] shadow-md ring-2 ring-[#1B3F8B]/30 translate-x-1"` |
| 783 | hex | `#1B3F8B` | `? "bg-[#1B3F8B] text-white shadow-xs"` |
| 792 | hex | `#1A1A1A` | `isSelected ? "font-bold text-[#1A1A1A]" : "text-stone-800"` |
| 829 | hex | `#1B3F8B` | `? "bg-[#1B3F8B] hover:bg-[#153270] text-white shadow-md hover:shadow-lg cursor-pointer hover:-translate-y-0.5 active:translate-y-0"` |
| 829 | hex | `#153270` | `? "bg-[#1B3F8B] hover:bg-[#153270] text-white shadow-md hover:shadow-lg cursor-pointer hover:-translate-y-0.5 active:translate-y-0"` |
| 841 | hex | `#FAF8F5` | `<div className="rounded-2xl border border-stone-200 bg-[#FAF8F5] p-4 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-stone-600">` |
| 843 | hex | `#8A6D1F` | `<ShieldCheck className="h-4 w-4 text-[#8A6D1F]" />` |

### `src\components\landing\Hero.tsx` - 30

| Line | Kind | Value | Context |
|---:|---|---|---|
| 117 | hex | `#F7F5F0` | `className="relative isolate overflow-hidden bg-[#F7F5F0] tone-light text-[#1A1A1A] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14 border-b border-stone-200"` |
| 117 | hex | `#1A1A1A` | `className="relative isolate overflow-hidden bg-[#F7F5F0] tone-light text-[#1A1A1A] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14 border-b border-stone-200"` |
| 121 | hex | `#1B3F8B` | `<div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#1B3F8B]/15 to-[#8A6D1F]/15 opacity-60 sm:le` |
| 121 | hex | `#8A6D1F` | `<div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#1B3F8B]/15 to-[#8A6D1F]/15 opacity-60 sm:le` |
| 144 | hex | `#1B3F8B` | `? "bg-[#1B3F8B] text-white shadow-xs"` |
| 154 | hex | `#1B3F8B` | `<div className="inline-flex items-center gap-2 rounded-full border border-sky-300 bg-sky-50 px-3 py-1 text-[11px] sm:text-xs font-mono font-bold text-[#1B3F8B] shadow-xs max-w-full` |
| 155 | hex | `#1B3F8B` | `<span className="h-2 w-2 rounded-full bg-[#1B3F8B] animate-pulse shrink-0" />` |
| 171 | hex | `#1A1A1A` | `className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1A1A1A] leading-[1.15]"` |
| 177 | hex | `#8A6D1F` | `colorFrom="#8A6D1F"` |
| 178 | hex | `#1B3F8B` | `colorVia="#1B3F8B"` |
| 179 | hex | `#8A6D1F` | `colorTo="#8A6D1F"` |
| 208 | hex | `#1B3F8B` | `background="#1B3F8B"` |
| 240 | hex | `#1B3F8B` | `<div className="p-2 rounded-lg bg-[#1B3F8B]/10 text-[#1B3F8B] shrink-0">` |
| 240 | hex | `#1B3F8B` | `<div className="p-2 rounded-lg bg-[#1B3F8B]/10 text-[#1B3F8B] shrink-0">` |
| 247 | hex | `#1A1A1A` | `<p className="text-xs font-bold text-[#1A1A1A]">{t.card1Desc}</p>` |
| 252 | hex | `#8A6D1F` | `<div className="p-2 rounded-lg bg-[#8A6D1F]/10 text-[#8A6D1F] shrink-0">` |
| 252 | hex | `#8A6D1F` | `<div className="p-2 rounded-lg bg-[#8A6D1F]/10 text-[#8A6D1F] shrink-0">` |
| 259 | hex | `#1A1A1A` | `<p className="text-xs font-bold text-[#1A1A1A]">{t.card2Desc}</p>` |
| 271 | hex | `#1A1A1A` | `<p className="text-xs font-bold text-[#1A1A1A]">{t.card3Desc}</p>` |
| 291 | hex | `#1B3F8B` | `className="absolute top-4 right-4 z-10 bg-white/95 backdrop-blur-xs border border-sky-300 text-[#1B3F8B] rounded-full px-3 py-1 flex items-center gap-1.5 shadow-md"` |
| 293 | hex | `#1B3F8B` | `<CheckCircle2 className="w-3.5 h-3.5 text-[#1B3F8B]" />` |
| 315 | hex | `#F7F5F0` | `<div className="p-3 text-center bg-[#F7F5F0] rounded-b-xl border-t border-stone-200 mt-2">` |
| 319 | hex | `#8A6D1F` | `<p className="text-xs font-serif italic text-[#8A6D1F] mt-0.5">` |
| 331 | hex | `#1B3F8B` | `<div className="bg-[#1B3F8B] text-white p-3.5 sm:p-4 flex items-center justify-between gap-3 shadow-xs shrink-0">` |
| 347 | hex | `#0F172A` | `color: "#0F172A",` |
| 349 | hex | `#0F172A` | `WebkitTextFillColor: "#0F172A",` |
| 354 | hex | `#0F172A` | `style={{ color: "#0F172A", WebkitTextFillColor: "#0F172A", fontWeight: 800 }}` |
| 354 | hex | `#0F172A` | `style={{ color: "#0F172A", WebkitTextFillColor: "#0F172A", fontWeight: 800 }}` |
| 360 | hex | `#0F172A` | `style={{ color: "#0F172A" }}` |
| 374 | hex | `#FAF8F5` | `<div className="flex-1 overflow-y-auto p-2 sm:p-4 bg-[#FAF8F5] tone-light">` |

### `src\components\landing\HiringSystemBlock.tsx` - 29

| Line | Kind | Value | Context |
|---:|---|---|---|
| 147 | hex | `#F7F5F0` | `className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#F7F5F0] tone-light text-[#1A1A1A] border-b border-stone-200"` |
| 147 | hex | `#1A1A1A` | `className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#F7F5F0] tone-light text-[#1A1A1A] border-b border-stone-200"` |
| 157 | hex | `#1A1A1A` | `className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1A1A1A] tracking-tight leading-[1.18]"` |
| 160 | hex | `#1B3F8B` | `<span className="italic text-[#1B3F8B]">Simple, Fast, Transparent</span>` |
| 170 | hex | `#1B3F8B` | `className="h-full bg-gradient-to-r from-[#1B3F8B] to-teal-600 rounded-full"` |
| 200 | hex | `#1B3F8B` | `? "border-2 border-[#1B3F8B] bg-white shadow-xl ring-4 ring-[#1B3F8B]/10"` |
| 200 | hex | `#1B3F8B` | `? "border-2 border-[#1B3F8B] bg-white shadow-xl ring-4 ring-[#1B3F8B]/10"` |
| 201 | hex | `#1B3F8B` | `: "border border-stone-300 bg-white/90 hover:border-[#1B3F8B]/50 hover:bg-white hover:shadow-md"` |
| 209 | hex | `#1B3F8B` | `className="absolute top-0 left-0 right-0 h-1.5 bg-[#1B3F8B]"` |
| 212 | hex | `#1B3F8B` | `<div className="absolute top-0 left-0 right-0 h-1.5 bg-transparent group-hover:bg-[#1B3F8B]/30 transition-colors" />` |
| 220 | hex | `#1B3F8B` | `? "bg-[#1B3F8B] text-white"` |
| 221 | hex | `#1B3F8B` | `: "bg-stone-200 text-stone-700 group-hover:bg-[#1B3F8B]/10 group-hover:text-[#1B3F8B]"` |
| 221 | hex | `#1B3F8B` | `: "bg-stone-200 text-stone-700 group-hover:bg-[#1B3F8B]/10 group-hover:text-[#1B3F8B]"` |
| 229 | hex | `#1B3F8B` | `? "bg-[#1B3F8B] text-white shadow-sm"` |
| 230 | hex | `#1B3F8B` | `: "bg-stone-100 text-[#1B3F8B] group-hover:bg-[#1B3F8B]/15"` |
| 230 | hex | `#1B3F8B` | `: "bg-stone-100 text-[#1B3F8B] group-hover:bg-[#1B3F8B]/15"` |
| 238 | hex | `#1A1A1A` | `<h3 className="font-serif text-lg font-bold text-[#1A1A1A] leading-snug tracking-tight">` |
| 250 | hex | `#1B3F8B` | `<span className={isActive ? "text-[#1B3F8B]" : "text-stone-500 group-hover:text-[#1B3F8B]"}>` |
| 250 | hex | `#1B3F8B` | `<span className={isActive ? "text-[#1B3F8B]" : "text-stone-500 group-hover:text-[#1B3F8B]"}>` |
| 256 | hex | `#1B3F8B` | `? "text-[#1B3F8B] translate-x-1"` |
| 257 | hex | `#1B3F8B` | `: "text-stone-400 group-hover:translate-x-1 group-hover:text-[#1B3F8B]"` |
| 268 | hex | `#1B3F8B` | `<div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-[#1B3F8B]/5 blur-3xl pointer-events-none" />` |
| 274 | hex | `#1B3F8B` | `<span className="inline-flex items-center gap-1.5 rounded-full bg-[#1B3F8B]/10 border border-[#1B3F8B]/20 px-3 py-1 text-xs font-mono font-bold text-[#1B3F8B]">` |
| 274 | hex | `#1B3F8B` | `<span className="inline-flex items-center gap-1.5 rounded-full bg-[#1B3F8B]/10 border border-[#1B3F8B]/20 px-3 py-1 text-xs font-mono font-bold text-[#1B3F8B]">` |
| 274 | hex | `#1B3F8B` | `<span className="inline-flex items-center gap-1.5 rounded-full bg-[#1B3F8B]/10 border border-[#1B3F8B]/20 px-3 py-1 text-xs font-mono font-bold text-[#1B3F8B]">` |
| 284 | hex | `#1A1A1A` | `<h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">` |
| 294 | hex | `#F7F5F0` | `<li key={i} className="flex items-center gap-2 text-xs font-medium text-stone-800 bg-[#F7F5F0] p-2.5 rounded-xl border border-stone-200">` |
| 311 | hex | `#1B3F8B` | `className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#1B3F8B] px-6 text-sm font-bold text-white shadow-lg hover:bg-[#153270] transition-all` |
| 311 | hex | `#153270` | `className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#1B3F8B] px-6 text-sm font-bold text-white shadow-lg hover:bg-[#153270] transition-all` |

### `src\routes\admin.promotions.tsx` - 29

| Line | Kind | Value | Context |
|---:|---|---|---|
| 120 | hex | `#1D4ED8` | `<RefreshCw className="h-6 w-6 animate-spin text-[#1D4ED8]" />` |
| 129 | hex | `#151C2E` | `<h2 className="font-serif text-lg font-bold text-[#151C2E]">Access Restricted</h2>` |
| 130 | hex | `#5B6472` | `<p className="text-xs text-[#5B6472]">` |
| 148 | hex | `#151C2E` | `className="bg-white border-slate-300 text-[#151C2E] hover:bg-slate-50"` |
| 195 | hex | `#151C2E` | `<h2 className="font-serif text-base font-bold text-[#151C2E] flex items-center gap-2">` |
| 196 | hex | `#1D4ED8` | `<Plus className="h-4 w-4 text-[#1D4ED8]" /> Create Promo / Flash Coupon` |
| 200 | hex | `#707C90` | `<label className="text-xs text-[#707C90] uppercase tracking-wider font-medium">` |
| 207 | hex | `#F2F4F9` | `className="mt-1 uppercase bg-[#F2F4F9] border-slate-200 text-xs text-[#151C2E] font-mono"` |
| 207 | hex | `#151C2E` | `className="mt-1 uppercase bg-[#F2F4F9] border-slate-200 text-xs text-[#151C2E] font-mono"` |
| 212 | hex | `#707C90` | `<label className="text-xs text-[#707C90] uppercase tracking-wider font-medium">` |
| 220 | hex | `#F2F4F9` | `className="mt-1 bg-[#F2F4F9] border-slate-200 text-xs text-[#151C2E] font-mono"` |
| 220 | hex | `#151C2E` | `className="mt-1 bg-[#F2F4F9] border-slate-200 text-xs text-[#151C2E] font-mono"` |
| 227 | hex | `#707C90` | `<label className="text-xs text-[#707C90] uppercase tracking-wider font-medium">` |
| 235 | hex | `#F2F4F9` | `className="mt-1 bg-[#F2F4F9] border-slate-200 text-xs text-[#151C2E] font-mono"` |
| 235 | hex | `#151C2E` | `className="mt-1 bg-[#F2F4F9] border-slate-200 text-xs text-[#151C2E] font-mono"` |
| 260 | hex | `#151C2E` | `<h2 className="font-serif text-base font-bold text-[#151C2E] flex items-center gap-2">` |
| 261 | hex | `#1D4ED8` | `<Layers className="h-4 w-4 text-[#1D4ED8]" /> Active Coupons & Campaign Rules (` |
| 265 | hex | `#707C90` | `<Search className="absolute left-3 top-2.5 h-4 w-4 text-[#707C90]" />` |
| 270 | hex | `#F2F4F9` | `className="pl-9 bg-[#F2F4F9] border-slate-200 text-xs text-[#151C2E]"` |
| 270 | hex | `#151C2E` | `className="pl-9 bg-[#F2F4F9] border-slate-200 text-xs text-[#151C2E]"` |
| 276 | hex | `#707C90` | `<div className="py-12 text-center text-[#707C90]">` |
| 277 | hex | `#1D4ED8` | `<RefreshCw className="mx-auto h-6 w-6 animate-spin text-[#1D4ED8]" />` |
| 281 | hex | `#707C90` | `<div className="py-8 text-center text-[#707C90] border border-dashed border-slate-200 rounded-lg text-xs">` |
| 286 | hex | `#151C2E` | `<table className="w-full text-left text-xs text-[#151C2E]">` |
| 287 | hex | `#F2F4F9` | `<thead className="bg-[#F2F4F9] uppercase text-[#707C90] border-b border-slate-200 font-sans tracking-wider text-[11px]">` |
| 287 | hex | `#707C90` | `<thead className="bg-[#F2F4F9] uppercase text-[#707C90] border-b border-slate-200 font-sans tracking-wider text-[11px]">` |
| 299 | hex | `#151C2E` | `<td className="p-3 font-bold text-[#151C2E]">{coupon.code}</td>` |
| 303 | hex | `#5B6472` | `<td className="p-3 text-[#5B6472]">{coupon.window_minutes} mins</td>` |
| 315 | hex | `#5B6472` | `<td className="p-3 text-[#5B6472] font-sans">` |

### `src\routes\comparisons.$slug.tsx` - 29

| Line | Kind | Value | Context |
|---:|---|---|---|
| 75 | hex | `#FAF9F6` | `<div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans selection:bg-[#1B3F8B] selection:text-white pb-24">` |
| 75 | hex | `#1B3F8B` | `<div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans selection:bg-[#1B3F8B] selection:text-white pb-24">` |
| 81 | hex | `#0B1325` | `className="inline-flex items-center gap-1.5 text-xs font-mono text-stone-700 hover:text-[#0B1325] transition-colors"` |
| 85 | hex | `#1B3F8B` | `<span className="font-mono text-[10px] font-bold text-[#1B3F8B] uppercase tracking-widest">` |
| 95 | hex | `#1B3F8B` | `<span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1B3F8B] bg-stone-100 px-2.5 py-1 rounded border border-stone-200">` |
| 103 | hex | `#0B1325` | `<h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#0B1325] leading-tight">` |
| 117 | hex | `#1B3F8B` | `<h2 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B] mb-6 flex items-center gap-2">` |
| 124 | hex | `#0B1325` | `<span className="font-serif text-xl font-bold text-[#0B1325] block">` |
| 130 | hex | `#0B1325` | `<span className="font-bold text-[#0B1325]">{comp.roleA.entrySalary}</span>` |
| 134 | hex | `#0B1325` | `<span className="font-bold text-[#0B1325]">{comp.roleA.midSalary}</span>` |
| 155 | hex | `#0B1325` | `<span className="font-serif text-xl font-bold text-[#0B1325] block">` |
| 161 | hex | `#0B1325` | `<span className="font-bold text-[#0B1325]">{comp.roleB.entrySalary}</span>` |
| 165 | hex | `#0B1325` | `<span className="font-bold text-[#0B1325]">{comp.roleB.midSalary}</span>` |
| 188 | hex | `#0B1325` | `<div className="bg-white tone-light card-light border-l-4 border-l-[#0B1325] border-stone-200 rounded-r-xl p-6">` |
| 189 | hex | `#0B1325` | `<h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#0B1325] mb-2">` |
| 197 | hex | `#1B3F8B` | `<div className="bg-white tone-light card-light border-l-4 border-l-[#1B3F8B] border-stone-200 rounded-r-xl p-6">` |
| 198 | hex | `#1B3F8B` | `<h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B] mb-2">` |
| 209 | hex | `#0B1325` | `<h2 className="font-serif text-2xl font-bold text-[#0B1325]">` |
| 218 | hex | `#0B1325` | `<h3 className="font-serif text-lg font-bold text-[#0B1325] mb-4">` |
| 223 | hex | `#FAF9F6` | `<div className="bg-[#FAF9F6] p-4 rounded border border-stone-200">` |
| 224 | hex | `#0B1325` | `<span className="font-mono font-bold text-[#0B1325] uppercase block mb-1 text-[11px]">` |
| 229 | hex | `#FAF9F6` | `<div className="bg-[#FAF9F6] p-4 rounded border border-stone-200">` |
| 230 | hex | `#1B3F8B` | `<span className="font-mono font-bold text-[#1B3F8B] uppercase block mb-1 text-[11px]">` |
| 238 | hex | `#0B1325` | `<strong className="text-[#0B1325]">ARZON ANALYSIS:</strong> {dim.analysis}` |
| 246 | hex | `#0B1325` | `<h2 className="font-serif text-xl font-bold text-[#0B1325] mb-6 flex items-center gap-2">` |
| 247 | hex | `#1B3F8B` | `<HelpCircle className="w-5 h-5 text-[#1B3F8B]" /> Frequently Asked Questions` |
| 252 | hex | `#0B1325` | `<h3 className="font-serif text-sm font-bold text-[#0B1325]">` |
| 264 | hex | `#0B1325` | `<section className="bg-[#0B1325] text-white rounded-2xl p-8 text-center">` |
| 274 | hex | `#0B1325` | `className="bg-white tone-light hover:bg-stone-100 text-[#0B1325] px-6 py-3 rounded text-xs font-mono font-bold uppercase tracking-wider transition-colors inline-flex items-center g` |

### `src\routes\starter-kit.tsx` - 29

| Line | Kind | Value | Context |
|---:|---|---|---|
| 121 | hex | `#FAF9F6` | `<div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans selection:bg-[#1B3F8B]/15 selection:text-[#0B1325]">` |
| 121 | hex | `#1B3F8B` | `<div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans selection:bg-[#1B3F8B]/15 selection:text-[#0B1325]">` |
| 121 | hex | `#0B1325` | `<div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans selection:bg-[#1B3F8B]/15 selection:text-[#0B1325]">` |
| 137 | hex | `#0B1325` | `<section className="bg-[#0B1325] tone-dark text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">` |
| 226 | hex | `#1B3F8B` | `<span className="font-mono text-2xl sm:text-3xl font-bold text-[#1B3F8B] block">20</span>` |
| 230 | hex | `#1B3F8B` | `<span className="font-mono text-2xl sm:text-3xl font-bold text-[#1B3F8B] block">2</span>` |
| 234 | hex | `#1B3F8B` | `<span className="font-mono text-2xl sm:text-3xl font-bold text-[#1B3F8B] block">35+</span>` |
| 238 | hex | `#1B3F8B` | `<span className="font-mono text-2xl sm:text-3xl font-bold text-[#1B3F8B] block">6</span>` |
| 252 | hex | `#0B1325` | `? "bg-[#0B1325] text-white shadow-xs"` |
| 263 | hex | `#0B1325` | `? "bg-[#0B1325] text-white shadow-xs"` |
| 274 | hex | `#0B1325` | `? "bg-[#0B1325] text-white shadow-xs"` |
| 285 | hex | `#0B1325` | `? "bg-[#0B1325] text-white shadow-xs"` |
| 296 | hex | `#0B1325` | `? "bg-[#0B1325] text-white shadow-xs"` |
| 328 | hex | `#1B3F8B` | `className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300 bg-white tone-light text-xs font-sans focus:outline-none focus:border-[#1B3F8B] min-h-[40px]"` |
| 342 | hex | `#1B3F8B` | `? "bg-[#1B3F8B] text-white"` |
| 372 | hex | `#1B3F8B` | `<span className="font-mono text-xs font-bold text-[#1B3F8B] bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">` |
| 410 | hex | `#0B1325` | `<div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200/80 text-xs font-sans text-[#0B1325] flex items-start gap-2">` |
| 411 | hex | `#1B3F8B` | `<Sparkles className="w-4 h-4 text-[#1B3F8B] shrink-0 mt-0.5" />` |
| 413 | hex | `#1B3F8B` | `<strong className="font-bold font-mono text-[11px] uppercase block text-[#1B3F8B]">Panelist Pro-Tip:</strong>` |
| 456 | hex | `#1B3F8B` | `<div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-50 text-[#1B3F8B] font-mono text-xs font-bold uppercase">` |
| 472 | hex | `#0B1325` | `<span className="w-6 h-6 rounded-full bg-[#0B1325] text-white flex items-center justify-center font-mono text-xs font-bold">` |
| 516 | hex | `#1B3F8B` | `<span className="w-6 h-6 rounded-full bg-[#1B3F8B] text-white flex items-center justify-center font-mono text-xs font-bold">` |
| 624 | hex | `#1B3F8B` | `<MapPin className="w-4 h-4 text-[#1B3F8B]" />` |
| 652 | hex | `#1B3F8B` | `<span className="font-mono font-bold text-[#1B3F8B]">` |
| 694 | hex | `#0B1325` | `<span className="w-8 h-8 rounded-xl bg-[#0B1325] text-white flex items-center justify-center font-mono text-xs font-bold">` |
| 698 | hex | `#1B3F8B` | `<span className="font-mono text-xs font-bold text-[#1B3F8B] block">{phase.weekRange}</span>` |
| 719 | hex | `#1B3F8B` | `<Award className="w-4 h-4 text-[#1B3F8B] shrink-0" />` |
| 721 | hex | `#1B3F8B` | `<strong className="font-mono font-bold text-[#1B3F8B] mr-1">Verified Deliverable:</strong>` |
| 732 | hex | `#0B1325` | `<section className="rounded-3xl bg-[#0B1325] tone-dark text-white p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-2xl">` |

### `src\components\acri\landing\AcriScrollLeadMagnet.tsx` - 28

| Line | Kind | Value | Context |
|---:|---|---|---|
| 330 | hex | `#071A4A` | `<div className="h-1 w-full bg-gradient-to-r from-[#071A4A] via-[#1557D6] to-[#071A4A] shrink-0" />` |
| 330 | hex | `#1557D6` | `<div className="h-1 w-full bg-gradient-to-r from-[#071A4A] via-[#1557D6] to-[#071A4A] shrink-0" />` |
| 330 | hex | `#071A4A` | `<div className="h-1 w-full bg-gradient-to-r from-[#071A4A] via-[#1557D6] to-[#071A4A] shrink-0" />` |
| 347 | hex | `#1557D6` | `<div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200/70 text-[#1557D6] font-mono text-[10px] font-bold uppercase tracking-w` |
| 353 | hex | `#071A4A` | `<h2 className="font-serif font-bold text-xl sm:text-2xl text-[#071A4A] tracking-tight leading-snug">` |
| 393 | hex | `#1557D6` | `className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 bg-white tone-light text-[16px] sm:text-xs font-sans text-slate-900 focus:outline-none focus:ring-2 focus:ring-[` |
| 393 | hex | `#1557D6` | `className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 bg-white tone-light text-[16px] sm:text-xs font-sans text-slate-900 focus:outline-none focus:ring-2 focus:ring-[` |
| 411 | hex | `#1557D6` | `className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 bg-white tone-light text-[16px] sm:text-xs font-sans text-slate-900 focus:outline-none focus:ring-2 focus:ring-[` |
| 411 | hex | `#1557D6` | `className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 bg-white tone-light text-[16px] sm:text-xs font-sans text-slate-900 focus:outline-none focus:ring-2 focus:ring-[` |
| 431 | hex | `#1557D6` | `className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 bg-white tone-light text-[16px] sm:text-xs font-sans text-slate-900 focus:outline-none focus:ring-2 focus:ring-[` |
| 431 | hex | `#1557D6` | `className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 bg-white tone-light text-[16px] sm:text-xs font-sans text-slate-900 focus:outline-none focus:ring-2 focus:ring-[` |
| 444 | hex | `#1557D6` | `className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white tone-light text-[16px] sm:text-xs font-sans text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1557` |
| 444 | hex | `#1557D6` | `className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white tone-light text-[16px] sm:text-xs font-sans text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1557` |
| 461 | hex | `#071A4A` | `className="mt-0.5 h-3.5 w-3.5 rounded border-slate-300 text-[#071A4A] focus:ring-[#1557D6] shrink-0"` |
| 461 | hex | `#1557D6` | `className="mt-0.5 h-3.5 w-3.5 rounded border-slate-300 text-[#071A4A] focus:ring-[#1557D6] shrink-0"` |
| 473 | hex | `#071A4A` | `className="w-full min-h-[44px] flex items-center justify-center gap-2 py-3 rounded-xl bg-[#071A4A] hover:bg-[#1557D6] text-white font-bold text-xs uppercase tracking-wider transiti` |
| 473 | hex | `#1557D6` | `className="w-full min-h-[44px] flex items-center justify-center gap-2 py-3 rounded-xl bg-[#071A4A] hover:bg-[#1557D6] text-white font-bold text-xs uppercase tracking-wider transiti` |
| 500 | hex | `#071A4A` | `<h2 className="font-serif font-bold text-xl sm:text-2xl text-[#071A4A] tracking-tight leading-snug">` |
| 513 | hex | `#071A4A` | `<div className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-[#071A4A] text-white flex items-center justify-center shrink-0 shadow-2xs">` |
| 517 | hex | `#1557D6` | `<span className="font-mono text-[9px] font-bold text-[#1557D6] uppercase tracking-wider block">` |
| 555 | hex | `#071A4A` | `className="flex-1 min-h-[42px] flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#071A4A] hover:bg-[#1557D6] text-white font-bold text-xs uppercase tracking-wider tra` |
| 555 | hex | `#1557D6` | `className="flex-1 min-h-[42px] flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#071A4A] hover:bg-[#1557D6] text-white font-bold text-xs uppercase tracking-wider tra` |
| 583 | hex | `#1557D6` | `<div className="h-8 w-8 rounded-lg bg-[#1557D6] text-white flex items-center justify-center shrink-0 shadow-2xs">` |
| 587 | hex | `#1557D6` | `<span className="font-mono text-[9px] font-bold text-[#1557D6] uppercase tracking-wider block">` |
| 604 | hex | `#1557D6` | `className="w-full min-h-[40px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white tone-light border border-[#1557D6]/40 hover:border-[#1557D6] hover:bg-blue-50 ` |
| 604 | hex | `#1557D6` | `className="w-full min-h-[40px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white tone-light border border-[#1557D6]/40 hover:border-[#1557D6] hover:bg-blue-50 ` |
| 604 | hex | `#071A4A` | `className="w-full min-h-[40px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white tone-light border border-[#1557D6]/40 hover:border-[#1557D6] hover:bg-blue-50 ` |
| 618 | hex | `#1557D6` | `className="text-xs font-mono font-bold text-[#1557D6] hover:underline flex items-center gap-1 cursor-pointer"` |

### `src\components\home\ArzonHomeV2.tsx` - 28

| Line | Kind | Value | Context |
|---:|---|---|---|
| 28 | hex | `#E4EAF2` | `<section className="relative overflow-hidden bg-white pt-10 sm:pt-16 pb-14 sm:pb-20 border-b border-[#E4EAF2] tone-light card-light">` |
| 30 | hex | `#EEF6FF` | `<div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#EEF6FF]/60 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />` |
| 31 | hex | `#F0F6FE` | `<div className="absolute top-1/3 right-0 w-[700px] h-[700px] bg-[#F0F6FE]/60 rounded-full blur-3xl translate-x-1/3 pointer-events-none" />` |
| 38 | hex | `#D0E1FD` | `<div className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-3.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#1557D6]` |
| 38 | hex | `#EEF6FF` | `<div className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-3.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#1557D6]` |
| 38 | hex | `#1557D6` | `<div className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-3.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#1557D6]` |
| 39 | hex | `#1557D6` | `<span className="h-1.5 w-1.5 rounded-full bg-[#1557D6] motion-safe:animate-pulse" />` |
| 44 | hex | `#071A4A` | `<h1 className="text-[2.6rem] sm:text-6xl lg:text-[62px] font-serif font-normal tracking-tight text-[#071A4A] leading-[1.05]">` |
| 46 | hex | `#1557D6` | `<span className="text-[#1557D6]">a career in healthcare.</span>` |
| 50 | hex | `#3F4A60` | `<p className="text-base sm:text-lg text-[#3F4A60] leading-relaxed max-w-xl">` |
| 59 | hex | `#1557D6` | `className="inline-flex items-center gap-2 rounded-full bg-[#1557D6] hover:bg-[#1044A5] text-white px-7 py-3.5 text-sm font-bold transition-all shadow-sm"` |
| 59 | hex | `#1044A5` | `className="inline-flex items-center gap-2 rounded-full bg-[#1557D6] hover:bg-[#1044A5] text-white px-7 py-3.5 text-sm font-bold transition-all shadow-sm"` |
| 66 | hex | `#E4EAF2` | `className="inline-flex items-center gap-2 rounded-full border border-[#E4EAF2] bg-white hover:bg-slate-50 text-[#071A4A] px-6 py-3.5 text-sm font-bold transition-all tone-light car` |
| 66 | hex | `#071A4A` | `className="inline-flex items-center gap-2 rounded-full border border-[#E4EAF2] bg-white hover:bg-slate-50 text-[#071A4A] px-6 py-3.5 text-sm font-bold transition-all tone-light car` |
| 73 | hex | `#3F4A60` | `<div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-semibold text-[#3F4A60] pt-2">` |
| 75 | hex | `#1557D6` | `<CheckCircle2 className="h-4 w-4 text-[#1557D6]" />` |
| 79 | hex | `#1557D6` | `<CheckCircle2 className="h-4 w-4 text-[#1557D6]" />` |
| 83 | hex | `#1557D6` | `<CheckCircle2 className="h-4 w-4 text-[#1557D6]" />` |
| 91 | hex | `#E4EAF2` | `<div className="relative rounded-[28px] overflow-hidden border border-[#E4EAF2] bg-[#F7F9FE] shadow-[0_20px_60px_rgba(7,26,74,0.12)] min-h-[440px] sm:min-h-[500px]">` |
| 91 | hex | `#F7F9FE` | `<div className="relative rounded-[28px] overflow-hidden border border-[#E4EAF2] bg-[#F7F9FE] shadow-[0_20px_60px_rgba(7,26,74,0.12)] min-h-[440px] sm:min-h-[500px]">` |
| 104 | hex | `#E4EAF2` | `<div className="absolute top-4 right-4 w-60 sm:w-64 rounded-2xl border border-[#E4EAF2]/90 bg-white/95 p-3.5 shadow-xl backdrop-blur-md tone-light card-light">` |
| 105 | hex | `#071A4A` | `<div className="flex items-center justify-between text-xs font-bold text-[#071A4A] pb-2 border-b border-[#F1F5F9]">` |
| 105 | hex | `#F1F5F9` | `<div className="flex items-center justify-between text-xs font-bold text-[#071A4A] pb-2 border-b border-[#F1F5F9]">` |
| 120 | hex | `#27B9B3` | `stroke="#27B9B3"` |
| 126 | hex | `#071A4A` | `<span className="absolute inset-0 flex items-center justify-center font-extrabold text-[11px] text-[#071A4A]">` |
| 131 | hex | `#071A4A` | `<div className="text-xs font-bold text-[#071A4A]">Good Fit</div>` |
| 141 | hex | `#F1F5F9` | `<div className="space-y-0.5 pt-2 border-t border-[#F1F5F9] text-[10.5px] font-semibold text-slate-700">` |
| 156 | hex | `#1557D6` | `<Icon className="h-3 w-3 text-[#1557D6]" />` |

### `src\components\landing\HowItWorks.tsx` - 28

| Line | Kind | Value | Context |
|---:|---|---|---|
| 39 | hex | `#1d4ed8` | `gradient: "from-[#1d4ed8] via-[#2563eb] to-[#0ea5e9]",` |
| 39 | hex | `#2563eb` | `gradient: "from-[#1d4ed8] via-[#2563eb] to-[#0ea5e9]",` |
| 39 | hex | `#0ea5e9` | `gradient: "from-[#1d4ed8] via-[#2563eb] to-[#0ea5e9]",` |
| 40 | hex | `#2563eb` | `accentColor: "#2563eb",` |
| 57 | hex | `#c2410c` | `gradient: "from-[#c2410c] via-[#ea580c] to-[#d97706]",` |
| 57 | hex | `#ea580c` | `gradient: "from-[#c2410c] via-[#ea580c] to-[#d97706]",` |
| 57 | hex | `#d97706` | `gradient: "from-[#c2410c] via-[#ea580c] to-[#d97706]",` |
| 75 | hex | `#047857` | `gradient: "from-[#047857] via-[#059669] to-[#0d9488]",` |
| 75 | hex | `#059669` | `gradient: "from-[#047857] via-[#059669] to-[#0d9488]",` |
| 75 | hex | `#0d9488` | `gradient: "from-[#047857] via-[#059669] to-[#0d9488]",` |
| 76 | hex | `#059669` | `accentColor: "#059669",` |
| 92 | hex | `#6d28d9` | `gradient: "from-[#6d28d9] via-[#7c3aed] to-[#4f46e5]",` |
| 92 | hex | `#7c3aed` | `gradient: "from-[#6d28d9] via-[#7c3aed] to-[#4f46e5]",` |
| 92 | hex | `#4f46e5` | `gradient: "from-[#6d28d9] via-[#7c3aed] to-[#4f46e5]",` |
| 93 | hex | `#7c3aed` | `accentColor: "#7c3aed",` |
| 121 | hex | `#F8FAFC` | `className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC]"` |
| 121 | hex | `#F1F5F9` | `className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC]"` |
| 121 | hex | `#F8FAFC` | `className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC]"` |
| 126 | hex | `#151C2E` | `<h2 className="font-serif text-4xl sm:text-5xl lg:text-[44px] font-bold text-[#151C2E] tracking-tight leading-tight">` |
| 129 | hex | `#5B6472` | `<p className="text-sm sm:text-base text-[#5B6472] leading-relaxed">` |
| 135 | hex | `#F0F5FF` | `<div className="rounded-[32px] border border-slate-200/90 bg-gradient-to-b from-[#F0F5FF]/70 via-white to-[#F8FAFC] p-6 sm:p-10 space-y-10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05` |
| 135 | hex | `#F8FAFC` | `<div className="rounded-[32px] border border-slate-200/90 bg-gradient-to-b from-[#F0F5FF]/70 via-white to-[#F8FAFC] p-6 sm:p-10 space-y-10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05` |
| 138 | hex | `#8A6D1F` | `<span className="inline-flex items-center gap-2 rounded-full bg-white border border-amber-300/80 px-5 py-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-[#8A6D1F` |
| 160 | hex | `#707C90` | `<span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#707C90]">` |
| 171 | hex | `#707C90` | `<span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#707C90]">` |
| 213 | hex | `#151C2E` | `<h3 className="font-serif text-lg font-bold text-[#151C2E]">{step.title}</h3>` |
| 214 | hex | `#5B6472` | `<p className="text-xs text-[#5B6472] leading-relaxed">{step.desc}</p>` |
| 222 | hex | `#151C2E` | `className="flex items-center gap-2 text-xs text-[#151C2E] font-medium"` |

### `src\routes\career-engine.result.tsx` - 28

| Line | Kind | Value | Context |
|---:|---|---|---|
| 393 | hex | `#F7F9FC` | `<main className="min-h-screen bg-[#F7F9FC] text-[#071A4A] tone-light arzon-page-surface font-sans py-16 sm:py-24">` |
| 393 | hex | `#071A4A` | `<main className="min-h-screen bg-[#F7F9FC] text-[#071A4A] tone-light arzon-page-surface font-sans py-16 sm:py-24">` |
| 395 | hex | `#E4EAF2` | `<div className="rounded-3xl border border-[#E4EAF2] bg-white tone-light card-light p-8 shadow-sm sm:p-10">` |
| 396 | hex | `#EEF6FF` | `<div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#EEF6FF] text-[#1557D6]">` |
| 396 | hex | `#1557D6` | `<div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#EEF6FF] text-[#1557D6]">` |
| 399 | hex | `#1557D6` | `<p className="mt-5 text-xs font-mono font-bold uppercase tracking-[0.15em] text-[#1557D6]">` |
| 402 | hex | `#071A4A` | `<h1 className="mt-2 font-serif text-2xl font-bold text-[#071A4A] sm:text-3xl">` |
| 405 | hex | `#3F4A60` | `<p className="mt-3 text-sm leading-relaxed text-[#3F4A60]">` |
| 408 | hex | `#EEF6FF` | `<div className="mx-auto mt-6 h-2 max-w-xs overflow-hidden rounded-full bg-[#EEF6FF]">` |
| 409 | hex | `#1557D6` | `<div className="h-full w-2/3 motion-safe:animate-pulse rounded-full bg-[#1557D6]" />` |
| 419 | hex | `#F7F9FC` | `<main className="min-h-screen bg-[#F7F9FC] text-[#071A4A] tone-light arzon-page-surface font-sans py-12 sm:py-20">` |
| 419 | hex | `#071A4A` | `<main className="min-h-screen bg-[#F7F9FC] text-[#071A4A] tone-light arzon-page-surface font-sans py-12 sm:py-20">` |
| 421 | hex | `#E4EAF2` | `<div className="rounded-3xl border border-[#E4EAF2] bg-white tone-light card-light p-7 shadow-sm sm:p-10">` |
| 427 | hex | `#1557D6` | `<span className="text-[10px] font-mono font-bold uppercase tracking-[0.12em] text-[#1557D6]">` |
| 430 | hex | `#071A4A` | `<h1 className="mt-2 font-serif text-2xl font-bold text-[#071A4A] sm:text-3xl">` |
| 433 | hex | `#3F4A60` | `<p className="mt-3 text-sm leading-relaxed text-[#3F4A60]">` |
| 440 | hex | `#D0E1FD` | `<div className="mt-6 rounded-2xl border border-[#D0E1FD] bg-[#EEF6FF] p-4 text-xs text-[#071A4A]">` |
| 440 | hex | `#EEF6FF` | `<div className="mt-6 rounded-2xl border border-[#D0E1FD] bg-[#EEF6FF] p-4 text-xs text-[#071A4A]">` |
| 440 | hex | `#071A4A` | `<div className="mt-6 rounded-2xl border border-[#D0E1FD] bg-[#EEF6FF] p-4 text-xs text-[#071A4A]">` |
| 452 | hex | `#071A4A` | `className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#071A4A] px-6 text-sm font-bold text-white hover:bg-[#1557D6]"` |
| 452 | hex | `#1557D6` | `className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#071A4A] px-6 text-sm font-bold text-white hover:bg-[#1557D6]"` |
| 458 | hex | `#E4EAF2` | `className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#E4EAF2] bg-white tone-light px-6 text-sm font-bold text-[#071A4A] hover:bg-slate-50"` |
| 458 | hex | `#071A4A` | `className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#E4EAF2] bg-white tone-light px-6 text-sm font-bold text-[#071A4A] hover:bg-slate-50"` |
| 498 | hex | `#F7F9FC` | `className="min-h-screen bg-[#F7F9FC] text-[#071A4A] tone-light arzon-page-surface font-sans pt-5 pb-16 sm:pt-10 sm:pb-20"` |
| 498 | hex | `#071A4A` | `className="min-h-screen bg-[#F7F9FC] text-[#071A4A] tone-light arzon-page-surface font-sans pt-5 pb-16 sm:pt-10 sm:pb-20"` |
| 503 | hex | `#69758A` | `<div className="flex items-center gap-2 text-xs font-mono text-[#69758A]">` |
| 504 | hex | `#071A4A` | `<Link to="/career-engine" className="hover:text-[#071A4A] transition-colors">` |
| 508 | hex | `#071A4A` | `<span className="text-[#071A4A] font-semibold">Career Identity Dossier</span>` |

### `src\components\career\result\ReferralSuite\ChallengeFriend.tsx` - 27

| Line | Kind | Value | Context |
|---:|---|---|---|
| 38 | hex | `#D0E1FD` | `<section className="rounded-3xl border border-[#D0E1FD] bg-[#EEF6FF]/50 p-6 sm:p-8 shadow-sm">` |
| 38 | hex | `#EEF6FF` | `<section className="rounded-3xl border border-[#D0E1FD] bg-[#EEF6FF]/50 p-6 sm:p-8 shadow-sm">` |
| 39 | hex | `#D0E1FD` | `<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D0E1FD] pb-5">` |
| 41 | hex | `#1557D6` | `<div className="grid h-8 w-8 place-items-center rounded-lg bg-[#1557D6] text-white">` |
| 45 | hex | `#1557D6` | `<span className="text-[11px] font-mono uppercase tracking-wider text-[#1557D6] font-bold">` |
| 48 | hex | `#071A4A` | `<h2 className="font-serif text-2xl font-bold text-[#071A4A]">` |
| 54 | hex | `#1557D6` | `<span className="text-xs font-mono font-semibold text-[#1557D6] bg-white tone-light px-3 py-1 rounded-full border border-[#D0E1FD]">` |
| 54 | hex | `#D0E1FD` | `<span className="text-xs font-mono font-semibold text-[#1557D6] bg-white tone-light px-3 py-1 rounded-full border border-[#D0E1FD]">` |
| 59 | hex | `#3F4A60` | `<p className="mt-3 text-sm text-[#3F4A60] leading-relaxed max-w-2xl">` |
| 66 | hex | `#D0E1FD` | `<div className="rounded-2xl border border-[#D0E1FD] bg-white tone-light card-light p-5 shadow-2xs">` |
| 67 | hex | `#1557D6` | `<span className="text-[10px] font-mono uppercase tracking-wider text-[#1557D6] font-bold block">` |
| 71 | hex | `#071A4A` | `<h3 className="font-serif text-lg font-bold text-[#071A4A]">` |
| 74 | hex | `#EEF6FF` | `<span className="rounded-full bg-[#EEF6FF] px-2.5 py-0.5 text-xs font-bold text-[#1557D6]">` |
| 74 | hex | `#1557D6` | `<span className="rounded-full bg-[#EEF6FF] px-2.5 py-0.5 text-xs font-bold text-[#1557D6]">` |
| 78 | hex | `#69758A` | `<p className="mt-2 text-xs text-[#69758A]">` |
| 84 | hex | `#1557D6` | `<div className="rounded-2xl border border-dashed border-[#1557D6]/40 bg-[#FAFBFD] p-5 text-center flex flex-col items-center justify-center">` |
| 84 | hex | `#FAFBFD` | `<div className="rounded-2xl border border-dashed border-[#1557D6]/40 bg-[#FAFBFD] p-5 text-center flex flex-col items-center justify-center">` |
| 85 | hex | `#69758A` | `<span className="text-[10px] font-mono uppercase tracking-wider text-[#69758A] font-bold block">` |
| 88 | hex | `#071A4A` | `<h3 className="mt-1 font-serif text-lg font-bold text-[#071A4A]">` |
| 91 | hex | `#69758A` | `<p className="mt-1 text-xs text-[#69758A] max-w-xs">` |
| 98 | hex | `#D0E1FD` | `<div className="mt-6 pt-5 border-t border-[#D0E1FD] flex flex-col sm:flex-row items-stretch sm:items-center gap-3">` |
| 103 | hex | `#25D366` | `className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-[#1EBE5D] transitio` |
| 103 | hex | `#1EBE5D` | `className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-[#1EBE5D] transitio` |
| 112 | hex | `#D0E1FD` | `className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#D0E1FD] bg-white tone-light px-5 py-3 text-xs sm:text-sm font-bold text-[#071A4A] hov` |
| 112 | hex | `#071A4A` | `className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#D0E1FD] bg-white tone-light px-5 py-3 text-xs sm:text-sm font-bold text-[#071A4A] hov` |
| 114 | hex | `#1557D6` | `<Share2 className="h-4 w-4 text-[#1557D6]" />` |
| 121 | hex | `#D0E1FD` | `className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#D0E1FD] bg-white tone-light px-4 py-3 text-xs font-semibold text-slate-700 hover:bg-s` |

### `src\components\landing\ROICalculator.tsx` - 27

| Line | Kind | Value | Context |
|---:|---|---|---|
| 66 | hex | `#FAF8F5` | `className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] text-[#1A1A1A] border-b border-stone-200"` |
| 66 | hex | `#1A1A1A` | `className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] text-[#1A1A1A] border-b border-stone-200"` |
| 76 | hex | `#1A1A1A` | `className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1A1A1A] tracking-tight leading-[1.18]"` |
| 79 | hex | `#1B3F8B` | `<span className="italic text-[#1B3F8B]">calibrated partner desk opportunities.</span>` |
| 107 | hex | `#1B3F8B` | `color: isSelected ? "#1B3F8B" : "#1C1917",` |
| 107 | hex | `#1C1917` | `color: isSelected ? "#1B3F8B" : "#1C1917",` |
| 109 | hex | `#1B3F8B` | `borderColor: isSelected ? "#1B3F8B" : "#D6D3D1",` |
| 111 | hex | `#1B3F8B` | `className={`p-3 rounded-xl border text-left font-sans text-xs font-extrabold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3F` |
| 113 | hex | `#1B3F8B` | `? "ring-2 ring-[#1B3F8B]/30 shadow-xs"` |
| 117 | hex | `#1B3F8B` | `<span style={{ color: isSelected ? "#1B3F8B" : "#1C1917" }}>{deg.label}</span>` |
| 117 | hex | `#1C1917` | `<span style={{ color: isSelected ? "#1B3F8B" : "#1C1917" }}>{deg.label}</span>` |
| 130 | hex | `#1B3F8B` | `style={{ color: "#1B3F8B", backgroundColor: "#DBEAFE" }}` |
| 143 | hex | `#1B3F8B` | `className="w-full h-2 bg-stone-300 rounded-lg appearance-none cursor-pointer accent-[#1B3F8B]"` |
| 153 | hex | `#065F46` | `<p className="font-mono text-[11px] font-bold flex items-center gap-1.5" style={{ color: "#065F46" }}>` |
| 155 | hex | `#065F46` | `<span style={{ color: "#065F46" }}>Target Roles: {selectedDegree.partnerRoles}</span>` |
| 162 | hex | `#1B3F8B` | `style={{ backgroundColor: "#1B3F8B", color: "#FFFFFF" }}` |
| 163 | hex | `#1B3F8B` | `className="lg:col-span-6 rounded-2xl border-2 border-[#1B3F8B] tone-dark p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden"` |
| 169 | rgba | `rgba(255, 255, 255, 0.2)` | `<div className="flex items-center justify-between border-b pb-4" style={{ borderColor: "rgba(255, 255, 255, 0.2)" }}>` |
| 174 | hex | `#6EE7B7` | `style={{ color: "#6EE7B7", backgroundColor: "rgba(6, 78, 59, 0.5)", borderColor: "rgba(110, 231, 183, 0.4)" }}` |
| 174 | rgba | `rgba(6, 78, 59, 0.5)` | `style={{ color: "#6EE7B7", backgroundColor: "rgba(6, 78, 59, 0.5)", borderColor: "rgba(110, 231, 183, 0.4)" }}` |
| 174 | rgba | `rgba(110, 231, 183, 0.4)` | `style={{ color: "#6EE7B7", backgroundColor: "rgba(6, 78, 59, 0.5)", borderColor: "rgba(110, 231, 183, 0.4)" }}` |
| 200 | rgba | `rgba(255, 255, 255, 0.12)` | `<div className="p-4 rounded-xl space-y-2 border" style={{ backgroundColor: "rgba(255, 255, 255, 0.12)", borderColor: "rgba(255, 255, 255, 0.2)" }}>` |
| 200 | rgba | `rgba(255, 255, 255, 0.2)` | `<div className="p-4 rounded-xl space-y-2 border" style={{ backgroundColor: "rgba(255, 255, 255, 0.12)", borderColor: "rgba(255, 255, 255, 0.2)" }}>` |
| 203 | hex | `#6EE7B7` | `<span className="font-extrabold" style={{ color: "#6EE7B7" }}>+₹{totalLiftLakhs} LAKH / YEAR</span>` |
| 216 | hex | `#1B3F8B` | `style={{ backgroundColor: "#FFFFFF", color: "#1B3F8B" }}` |
| 219 | hex | `#1B3F8B` | `<span style={{ color: "#1B3F8B" }}>Check Eligibility For My Degree</span>` |
| 220 | hex | `#1B3F8B` | `<ArrowRight className="w-4 h-4" style={{ color: "#1B3F8B" }} />` |

### `src\routes\why-arzon.tsx` - 27

| Line | Kind | Value | Context |
|---:|---|---|---|
| 110 | hex | `#BCE6DE` | `badgeColor: "text-[var(--arzon-teal-600)] bg-[var(--arzon-teal-100)] border-[#BCE6DE]",` |
| 111 | hex | `#DDF3EC` | `iconBg: "bg-[#DDF3EC] text-[var(--arzon-teal-600)]",` |
| 126 | hex | `#FFF7ED` | `badgeColor: "text-[var(--arzon-amber-600)] bg-[#FFF7ED] border-[#FED7AA]",` |
| 126 | hex | `#FED7AA` | `badgeColor: "text-[var(--arzon-amber-600)] bg-[#FFF7ED] border-[#FED7AA]",` |
| 127 | hex | `#8A6D1F` | `iconBg: "bg-amber-100 text-[#8A6D1F]",` |
| 134 | hex | `#D5E3F5` | `badgeColor: "text-[var(--arzon-blue-700)] bg-[var(--arzon-blue-100)] border-[#D5E3F5]",` |
| 142 | hex | `#BCE6DE` | `badgeColor: "text-[var(--arzon-teal-600)] bg-[var(--arzon-teal-100)] border-[#BCE6DE]",` |
| 150 | hex | `#BCE6DE` | `badgeColor: "text-[var(--arzon-teal-600)] bg-[var(--arzon-teal-100)] border-[#BCE6DE]",` |
| 151 | hex | `#DDF3EC` | `iconBg: "bg-[#DDF3EC] text-[var(--arzon-teal-600)]",` |
| 173 | hex | `#BCE6DE` | `accent: "text-teal-800 border-[#BCE6DE] bg-[var(--arzon-teal-100)]",` |
| 182 | hex | `#FED7AA` | `accent: "text-[var(--arzon-amber-600)] border-[#FED7AA] bg-[#FFF7ED]",` |
| 182 | hex | `#FFF7ED` | `accent: "text-[var(--arzon-amber-600)] border-[#FED7AA] bg-[#FFF7ED]",` |
| 191 | hex | `#BCE6DE` | `accent: "text-[var(--arzon-teal-600)] border-[#BCE6DE] bg-[var(--arzon-teal-100)]",` |
| 282 | hex | `#DDF3EC` | `<span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#DDF3EC] text-[var(--arzon-teal-600)] border border-[#BCE6DE] text-xs font-bold shadow-2xs">` |
| 282 | hex | `#BCE6DE` | `<span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#DDF3EC] text-[var(--arzon-teal-600)] border border-[#BCE6DE] text-xs font-bold shadow-2xs">` |
| 293 | hex | `#FED7AA` | `<span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-[var(--arzon-amber-600)] border border-[#FED7AA] text-xs font-bold shadow-2xs font-mono">` |
| 381 | hex | `#1B3F8B` | `className="inline-flex items-center gap-2.5 text-xs font-bold text-[var(--arzon-ink)] bg-[#1B3F8B] hover:bg-[#153270] px-5 py-3 rounded-xl font-mono shadow-md transition-all shrink` |
| 381 | hex | `#153270` | `className="inline-flex items-center gap-2.5 text-xs font-bold text-[var(--arzon-ink)] bg-[#1B3F8B] hover:bg-[#153270] px-5 py-3 rounded-xl font-mono shadow-md transition-all shrink` |
| 454 | hex | `#BCE6DE` | `<div className="rounded-xl border border-[#BCE6DE] bg-[var(--arzon-teal-100)]/70 p-5 space-y-2">` |
| 466 | hex | `#FED7AA` | `<div className="rounded-xl border border-[#FED7AA] bg-[#FFF7ED]/70 p-5 space-y-2">` |
| 466 | hex | `#FFF7ED` | `<div className="rounded-xl border border-[#FED7AA] bg-[#FFF7ED]/70 p-5 space-y-2">` |
| 467 | hex | `#8A6D1F` | `<span className="font-mono text-3xl font-bold text-[#8A6D1F]">20%</span>` |
| 472 | hex | `#D5E3F5` | `<div className="rounded-xl border border-[#D5E3F5] bg-[var(--arzon-blue-100)]/70 p-5 space-y-2">` |
| 603 | hex | `#8A6D1F` | `<p className="font-serif text-6xl font-bold text-[#8A6D1F]">60</p>` |
| 737 | hex | `#1B3F8B` | `className="h-13 px-8 inline-flex items-center justify-center gap-3 text-base font-extrabold text-[var(--arzon-ink)] rounded-xl bg-[#1B3F8B] hover:bg-[#153270] shadow-md shadow-[#1B` |
| 737 | hex | `#153270` | `className="h-13 px-8 inline-flex items-center justify-center gap-3 text-base font-extrabold text-[var(--arzon-ink)] rounded-xl bg-[#1B3F8B] hover:bg-[#153270] shadow-md shadow-[#1B` |
| 737 | hex | `#1B3F8B` | `className="h-13 px-8 inline-flex items-center justify-center gap-3 text-base font-extrabold text-[var(--arzon-ink)] rounded-xl bg-[#1B3F8B] hover:bg-[#153270] shadow-md shadow-[#1B` |

### `src\components\home\HomeLearnerFeedback.tsx` - 26

| Line | Kind | Value | Context |
|---:|---|---|---|
| 64 | hex | `#E4EAF2` | `<section className="py-14 sm:py-20 bg-white border-b border-[#E4EAF2] tone-light card-light" id="testimonials">` |
| 69 | hex | `#1557D6` | `<div className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#1557D6] mb-2 flex items-center gap-1.5">` |
| 72 | hex | `#071A4A` | `<h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-[#071A4A] tracking-tight leading-tight">` |
| 75 | hex | `#475569` | `<p className="mt-2 text-sm sm:text-base text-[#475569] max-w-2xl leading-relaxed">` |
| 82 | hex | `#E4EAF2` | `className="inline-flex items-center gap-2 rounded-full border border-[#E4EAF2] bg-white hover:bg-slate-50 text-[#071A4A] px-6 py-3 text-xs sm:text-sm font-bold transition-all shado` |
| 82 | hex | `#071A4A` | `className="inline-flex items-center gap-2 rounded-full border border-[#E4EAF2] bg-white hover:bg-slate-50 text-[#071A4A] px-6 py-3 text-xs sm:text-sm font-bold transition-all shado` |
| 96 | hex | `#071A4A` | `? "bg-[#071A4A] text-white shadow-xs"` |
| 97 | hex | `#475569` | `: "bg-slate-100 text-[#475569] hover:bg-slate-200"` |
| 107 | hex | `#071A4A` | `? "bg-[#071A4A] text-white shadow-xs"` |
| 108 | hex | `#475569` | `: "bg-slate-100 text-[#475569] hover:bg-slate-200"` |
| 118 | hex | `#071A4A` | `? "bg-[#071A4A] text-white shadow-xs"` |
| 119 | hex | `#475569` | `: "bg-slate-100 text-[#475569] hover:bg-slate-200"` |
| 129 | hex | `#071A4A` | `? "bg-[#071A4A] text-white shadow-xs"` |
| 130 | hex | `#475569` | `: "bg-slate-100 text-[#475569] hover:bg-slate-200"` |
| 140 | hex | `#071A4A` | `? "bg-[#071A4A] text-white shadow-xs"` |
| 141 | hex | `#475569` | `: "bg-slate-100 text-[#475569] hover:bg-slate-200"` |
| 153 | hex | `#E4EAF2` | `className="flex flex-col justify-between rounded-2xl border border-[#E4EAF2] bg-white p-5 shadow-xs hover:shadow-md transition-shadow tone-light card-light"` |
| 158 | hex | `#334155` | `<span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#334155]">` |
| 160 | hex | `#0A66C2` | `{r.source === "linkedin" && <Linkedin className="h-3.5 w-3.5 text-[#0A66C2]" />}` |
| 162 | hex | `#1557D6` | `{r.source === "arzon" && <span className="h-2 w-2 rounded-full bg-[#1557D6]" />}` |
| 180 | hex | `#334155` | `<p className="text-xs text-[#334155] leading-relaxed italic mb-4">` |
| 186 | hex | `#F1F5F9` | `<div className="pt-3 border-t border-[#F1F5F9] flex items-center gap-2.5">` |
| 187 | hex | `#EEF6FF` | `<div className="grid h-8 w-8 place-items-center rounded-full bg-[#EEF6FF] text-[#1557D6] font-bold text-xs shrink-0">` |
| 187 | hex | `#1557D6` | `<div className="grid h-8 w-8 place-items-center rounded-full bg-[#EEF6FF] text-[#1557D6] font-bold text-xs shrink-0">` |
| 191 | hex | `#071A4A` | `<strong className="block text-xs font-bold text-[#071A4A] truncate">` |
| 194 | hex | `#64748B` | `<span className="block text-[10px] text-[#64748B] truncate">` |

### `src\lib\report\exportPdf.ts` - 25

| Line | Kind | Value | Context |
|---:|---|---|---|
| 41 | hex | `#070B16` | `backgroundColor: "#070B16",` |
| 70 | hex | `#070B16` | `pageCtx.fillStyle = "#070B16";` |
| 118 | hex | `#94a3b8` | `<div style="font-size:10px;color:#94a3b8;">` |
| 121 | hex | `#cbd5e1` | `${s.rationale ? `<div style="font-size:11px;color:#cbd5e1;margin-top:2px;">${escape(s.rationale)}</div>` : ""}` |
| 129 | hex | `#f8fafc` | `<h2 style="font-family:serif;color:#f8fafc;font-size:22px;margin:0 0 4px;">Citations, assumptions & confidence</h2>` |
| 130 | hex | `#94a3b8` | `<div style="font-size:11px;color:#94a3b8;margin-bottom:12px;">` |
| 136 | hex | `#f8fafc` | `<h3 style="font-family:serif;color:#f8fafc;font-size:14px;margin:16px 0 6px;">Confidence tiers</h3>` |
| 137 | hex | `#e2e8f0` | `<ul style="font-size:11px;color:#e2e8f0;padding-left:16px;line-height:1.55;">` |
| 143 | hex | `#f8fafc` | `<h3 style="font-family:serif;color:#f8fafc;font-size:14px;margin:16px 0 6px;">Salary assumptions</h3>` |
| 144 | hex | `#e2e8f0` | `<ul style="font-size:11px;color:#e2e8f0;padding-left:16px;line-height:1.55;">` |
| 151 | hex | `#f8fafc` | `<h3 style="font-family:serif;color:#f8fafc;font-size:14px;margin:16px 0 6px;">Source catalogue</h3>` |
| 152 | hex | `#e2e8f0` | `<ol style="font-size:11px;color:#e2e8f0;padding-left:16px;line-height:1.55;">${rows}</ol>` |
| 161 | hex | `#f8fafc` | `<h3 style="font-family:serif;color:#f8fafc;font-size:14px;margin:16px 0 6px;">Your personalization</h3>` |
| 162 | hex | `#94a3b8` | `<div style="font-size:11px;color:#94a3b8;line-height:1.55;">` |
| 172 | hex | `#334155` | ``<span style="display:inline-block;border:1px solid #334155;border-radius:9999px;padding:2px 8px;margin:2px 4px 2px 0;font-size:10px;color:#e2e8f0;">${escape(s)}</span>`,` |
| 172 | hex | `#e2e8f0` | ``<span style="display:inline-block;border:1px solid #334155;border-radius:9999px;padding:2px 8px;margin:2px 4px 2px 0;font-size:10px;color:#e2e8f0;">${escape(s)}</span>`,` |
| 175 | hex | `#94a3b8` | `: `<span style="font-size:11px;color:#94a3b8;">None marked</span>`;` |
| 184 | hex | `#f8fafc` | `<h3 style="font-family:serif;color:#f8fafc;font-size:14px;margin:16px 0 6px;">Your personalization</h3>` |
| 185 | hex | `#94a3b8` | `<div style="font-size:11px;color:#94a3b8;margin-bottom:6px;">` |
| 188 | hex | `#e2e8f0` | `<table style="width:100%;border-collapse:collapse;font-size:11px;color:#e2e8f0;margin-bottom:8px;">` |
| 191 | hex | `#94a3b8` | `<td style="width:130px;padding:4px 8px 4px 0;color:#94a3b8;vertical-align:top;">Domain preference</td>` |
| 195 | hex | `#94a3b8` | `<td style="padding:4px 8px 4px 0;color:#94a3b8;vertical-align:top;">Graduation year</td>` |
| 199 | hex | `#94a3b8` | `<td style="padding:4px 8px 4px 0;color:#94a3b8;vertical-align:top;">Existing skills</td>` |
| 204 | hex | `#cbd5e1` | `<div style="font-size:11px;color:#cbd5e1;line-height:1.55;">` |
| 205 | hex | `#f8fafc` | `<strong style="color:#f8fafc;">How this changed your report:</strong>` |

### `src\components\career\result\CareerDiagnosis.tsx` - 24

| Line | Kind | Value | Context |
|---:|---|---|---|
| 16 | hex | `#E4EAF2` | `<div className="rounded-3xl border border-[#E4EAF2] bg-white tone-light card-light p-6 sm:p-8 shadow-sm">` |
| 18 | hex | `#EEF6FF` | `<div className="grid h-8 w-8 place-items-center rounded-lg bg-[#EEF6FF] text-[#1557D6]">` |
| 18 | hex | `#1557D6` | `<div className="grid h-8 w-8 place-items-center rounded-lg bg-[#EEF6FF] text-[#1557D6]">` |
| 22 | hex | `#1557D6` | `<span className="text-[11px] font-mono uppercase tracking-wider text-[#1557D6] font-bold">` |
| 25 | hex | `#071A4A` | `<h2 className="font-serif text-2xl font-bold text-[#071A4A]">` |
| 31 | hex | `#3F4A60` | `<p className="mt-3 text-sm text-[#3F4A60] leading-relaxed max-w-3xl">` |
| 42 | hex | `#E4EAF2` | `className="flex flex-col justify-between rounded-2xl border border-[#E4EAF2] bg-[#FAFBFD] p-4 text-xs"` |
| 42 | hex | `#FAFBFD` | `className="flex flex-col justify-between rounded-2xl border border-[#E4EAF2] bg-[#FAFBFD] p-4 text-xs"` |
| 45 | hex | `#69758A` | `<div className="flex items-center justify-between text-[#69758A] mb-2 font-mono">` |
| 49 | hex | `#071A4A` | `<p className="font-medium text-[#071A4A] line-clamp-3 leading-snug">` |
| 53 | hex | `#E4EAF2` | `<div className="mt-3 pt-3 border-t border-[#E4EAF2]">` |
| 54 | hex | `#69758A` | `<span className="text-[10px] text-[#69758A] block uppercase font-mono">Your Stance</span>` |
| 55 | hex | `#1557D6` | `<span className="font-semibold text-[#1557D6] text-xs mt-0.5 block truncate">` |
| 109 | hex | `#E4EAF2` | `<div className="rounded-3xl border border-[#E4EAF2] bg-[#FAFBFD] p-6 sm:p-7 shadow-xs">` |
| 109 | hex | `#FAFBFD` | `<div className="rounded-3xl border border-[#E4EAF2] bg-[#FAFBFD] p-6 sm:p-7 shadow-xs">` |
| 112 | hex | `#69758A` | `<span className="text-[11px] font-mono uppercase tracking-wider text-[#69758A] font-bold">` |
| 115 | hex | `#071A4A` | `<h3 className="font-serif text-xl font-bold text-[#071A4A]">` |
| 120 | hex | `#69758A` | `<p className="mt-1 text-xs text-[#69758A]">` |
| 128 | hex | `#E4EAF2` | `className="flex items-center justify-between rounded-xl border border-[#E4EAF2] bg-white tone-light card-light p-4 transition-hover hover:border-[#D0E1FD]"` |
| 128 | hex | `#D0E1FD` | `className="flex items-center justify-between rounded-xl border border-[#E4EAF2] bg-white tone-light card-light p-4 transition-hover hover:border-[#D0E1FD]"` |
| 133 | hex | `#071A4A` | `<strong className="text-sm font-semibold text-[#071A4A]">` |
| 137 | hex | `#69758A` | `<span className="text-xs text-[#69758A] block mt-0.5">` |
| 142 | hex | `#EEF6FF` | `<span className="inline-block rounded-full bg-[#EEF6FF] px-2.5 py-1 text-xs font-bold text-[#1557D6]">` |
| 142 | hex | `#1557D6` | `<span className="inline-block rounded-full bg-[#EEF6FF] px-2.5 py-1 text-xs font-bold text-[#1557D6]">` |

### `src\components\landing\EditorialHero.tsx` - 24

| Line | Kind | Value | Context |
|---:|---|---|---|
| 75 | hex | `#FAF8F5` | `<section className="relative pt-16 pb-14 sm:pt-32 sm:pb-24 border-b border-stone-200 bg-[#FAF8F5] overflow-hidden">` |
| 86 | hex | `#1B3F8B` | `<span className="flex h-2 w-2 rounded-full bg-[#1B3F8B] motion-safe:animate-pulse" />` |
| 87 | hex | `#1B3F8B` | `<span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">` |
| 93 | hex | `#1B3F8B` | `<span className="hidden sm:inline px-2 py-0.5 rounded bg-blue-50/80 border border-blue-200/80 text-[#1B3F8B] font-bold">` |
| 114 | hex | `#1B3F8B` | `<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-[#1B3F8B] text-xs font-semibold">` |
| 115 | hex | `#1B3F8B` | `<span className="w-1.5 h-1.5 rounded-full bg-[#1B3F8B]"></span>` |
| 119 | hex | `#1A1A1A` | `<h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#1A1A1A] tracking-tight leading-[1.1]">` |
| 128 | hex | `#1B3F8B` | `<strong className="text-[#1B3F8B] underline decoration-[#1B3F8B]/30 underline-offset-4 font-semibold">` |
| 128 | hex | `#1B3F8B` | `<strong className="text-[#1B3F8B] underline decoration-[#1B3F8B]/30 underline-offset-4 font-semibold">` |
| 141 | hex | `#1B3F8B` | `className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-slate-50 font-bold text-xs tracking-wide transition-all shadow-md` |
| 141 | hex | `#153270` | `className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-slate-50 font-bold text-xs tracking-wide transition-all shadow-md` |
| 201 | hex | `#1B3F8B` | `<Compass className="h-4 w-4 text-[#1B3F8B]" />` |
| 222 | hex | `#1B3F8B` | `? "bg-[#1B3F8B] text-slate-50 shadow-md ring-2 ring-[#1B3F8B]/30 scale-[1.02]"` |
| 222 | hex | `#1B3F8B` | `? "bg-[#1B3F8B] text-slate-50 shadow-md ring-2 ring-[#1B3F8B]/30 scale-[1.02]"` |
| 246 | hex | `#FAF8F5` | `className="rounded-2xl bg-gradient-to-br from-blue-50/70 via-[#FAF8F5] to-emerald-50/50 border border-stone-200/90 p-4 space-y-3 shadow-inner"` |
| 252 | hex | `#1B3F8B` | `<p className="font-serif text-base font-bold text-[#1B3F8B] mt-0.5">` |
| 262 | hex | `#8A6D1F` | `<p className="font-mono text-sm font-bold text-[#8A6D1F]">` |
| 268 | hex | `#1B3F8B` | `className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#1B3F8B]/10 hover:bg-[#1B3F8B] text-[#1B3F8B] hover:text-slate-50 text-xs font-bold transition-colors cursor-po` |
| 268 | hex | `#1B3F8B` | `className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#1B3F8B]/10 hover:bg-[#1B3F8B] text-[#1B3F8B] hover:text-slate-50 text-xs font-bold transition-colors cursor-po` |
| 268 | hex | `#1B3F8B` | `className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#1B3F8B]/10 hover:bg-[#1B3F8B] text-[#1B3F8B] hover:text-slate-50 text-xs font-bold transition-colors cursor-po` |
| 288 | hex | `#1B3F8B` | `<Interactive3dCard maxTilt={8} depthScale={1.03} className="p-3.5 rounded-2xl bg-white/80 border border-stone-200/90 shadow-xs hover:border-[#1B3F8B]/40 transition-colors">` |
| 290 | hex | `#1B3F8B` | `<span className="font-mono text-xl sm:text-2xl font-bold text-[#1B3F8B] flex items-center">` |
| 298 | hex | `#8A6D1F` | `<Interactive3dCard maxTilt={8} depthScale={1.03} className="p-3.5 rounded-2xl bg-white/80 border border-stone-200/90 shadow-xs hover:border-[#8A6D1F]/40 transition-colors">` |
| 300 | hex | `#8A6D1F` | `<span className="font-mono text-lg sm:text-2xl font-bold text-[#8A6D1F] block leading-tight">` |

### `src\components\acri\AcriModals.tsx` - 23

| Line | Kind | Value | Context |
|---:|---|---|---|
| 53 | hex | `#0B1325` | `<h2 className="font-sans text-2xl font-extrabold text-[#0B1325]">` |
| 66 | hex | `#0B1325` | `<span className="font-sans text-3xl font-extrabold text-[#0B1325]">82</span>` |
| 77 | hex | `#FAF8F5` | `<div className="mt-5 rounded-2xl bg-[#FAF8F5] border border-stone-200 p-4 flex flex-wrap items-center justify-between gap-4">` |
| 85 | hex | `#0B1325` | `<h3 className="font-sans text-sm font-bold text-[#0B1325]">Ananya Sharma</h3>` |
| 180 | hex | `#0B1325` | `className="inline-flex items-center gap-2 rounded-xl bg-[#0B1325] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#152342] transition-colors"` |
| 180 | hex | `#152342` | `className="inline-flex items-center gap-2 rounded-xl bg-[#0B1325] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#152342] transition-colors"` |
| 210 | hex | `#0B1325` | `<div className="rounded-2xl border-4 border-[#0B1325] p-6 sm:p-8 bg-[#FAF8F5] relative overflow-hidden text-center space-y-4">` |
| 210 | hex | `#FAF8F5` | `<div className="rounded-2xl border-4 border-[#0B1325] p-6 sm:p-8 bg-[#FAF8F5] relative overflow-hidden text-center space-y-4">` |
| 229 | hex | `#0B1325` | `<h3 className="font-sans text-2xl font-extrabold text-[#0B1325]">` |
| 236 | hex | `#0B1325` | `<span className="inline-block font-sans text-lg font-bold text-[#0B1325] border-b-2 border-emerald-500 pb-1">` |
| 246 | hex | `#0B1325` | `<span className="font-bold text-[#0B1325]">82 / 100</span>` |
| 332 | hex | `#0B1325` | `<h3 className="font-sans text-2xl font-bold text-[#0B1325]">` |
| 342 | hex | `#0B1325` | `className="rounded-xl bg-[#0B1325] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white"` |
| 354 | hex | `#0B1325` | `<h3 className="font-sans text-2xl font-extrabold text-[#0B1325]">` |
| 373 | hex | `#0B1325` | `className="w-full rounded-lg border border-stone-300 bg-white tone-light px-3 py-2 text-xs text-stone-900 focus:border-[#0B1325] focus:outline-none"` |
| 387 | hex | `#0B1325` | `className="w-full rounded-lg border border-stone-300 bg-white tone-light px-3 py-2 text-xs text-stone-900 focus:border-[#0B1325] focus:outline-none"` |
| 402 | hex | `#0B1325` | `className="w-full rounded-lg border border-stone-300 bg-white tone-light px-3 py-2 text-xs text-stone-900 focus:border-[#0B1325] focus:outline-none"` |
| 415 | hex | `#0B1325` | `className="w-full rounded-lg border border-stone-300 bg-white tone-light px-3 py-2 text-xs text-stone-900 focus:border-[#0B1325] focus:outline-none"` |
| 427 | hex | `#0B1325` | `className="w-full rounded-lg border border-stone-300 bg-white tone-light px-3 py-2 text-xs text-stone-900 focus:border-[#0B1325] focus:outline-none"` |
| 441 | hex | `#0B1325` | `className="w-full rounded-xl bg-[#0B1325] py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#152342] transition-colors"` |
| 441 | hex | `#152342` | `className="w-full rounded-xl bg-[#0B1325] py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#152342] transition-colors"` |
| 476 | hex | `#0B1325` | `<h3 className="font-sans text-xl font-bold text-[#0B1325]">` |
| 482 | hex | `#0B1325` | `<div className="relative aspect-video rounded-2xl bg-[#0B1325] flex flex-col items-center justify-center text-white overflow-hidden p-6 text-center">` |

### `src\components\landing\CandidateFitQuiz.tsx` - 22

| Line | Kind | Value | Context |
|---:|---|---|---|
| 75 | hex | `#1A1A1A` | `className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white tone-light text-[#1A1A1A] border-b border-stone-200"` |
| 85 | hex | `#1A1A1A` | `className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight leading-[1.18]"` |
| 87 | hex | `#1B3F8B` | `Check If Your Profile Qualifies for <span className="italic text-[#1B3F8B]">Live Employer Intake.</span>` |
| 109 | hex | `#FAF8F5` | `<div className="rounded-3xl border border-stone-300 bg-[#FAF8F5] p-6 sm:p-10 shadow-md relative overflow-hidden">` |
| 120 | hex | `#1B3F8B` | `className="h-full bg-[#1B3F8B] transition-all duration-300 rounded-full"` |
| 129 | hex | `#1A1A1A` | `<h3 className="font-serif text-xl font-bold text-[#1A1A1A]">` |
| 143 | hex | `#1B3F8B` | `? "bg-[#1B3F8B] text-slate-50 border-[#1B3F8B] shadow-md"` |
| 143 | hex | `#1B3F8B` | `? "bg-[#1B3F8B] text-slate-50 border-[#1B3F8B] shadow-md"` |
| 160 | hex | `#1A1A1A` | `<h3 className="font-serif text-xl font-bold text-[#1A1A1A]">` |
| 175 | hex | `#1B3F8B` | `? "bg-[#1B3F8B] text-slate-50 border-[#1B3F8B] shadow-md"` |
| 175 | hex | `#1B3F8B` | `? "bg-[#1B3F8B] text-slate-50 border-[#1B3F8B] shadow-md"` |
| 189 | hex | `#1A1A1A` | `<h3 className="font-serif text-xl font-bold text-[#1A1A1A]">` |
| 227 | hex | `#1A1A1A` | `<h3 className="font-serif text-xl font-bold text-[#1A1A1A]">` |
| 241 | hex | `#1B3F8B` | `? "bg-[#1B3F8B] text-slate-50 border-[#1B3F8B] shadow-md"` |
| 241 | hex | `#1B3F8B` | `? "bg-[#1B3F8B] text-slate-50 border-[#1B3F8B] shadow-md"` |
| 270 | hex | `#1B3F8B` | `className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-sans font-bold text-xs sm:text-sm text-slate-50 bg-[#1B3F8B] hover:bg-[#153270] shadow-sm transition-all cursor-` |
| 270 | hex | `#153270` | `className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-sans font-bold text-xs sm:text-sm text-slate-50 bg-[#1B3F8B] hover:bg-[#153270] shadow-sm transition-all cursor-` |
| 282 | hex | `#1B3F8B` | `<span className="font-mono text-xs font-bold uppercase text-[#1B3F8B]">` |
| 285 | hex | `#1A1A1A` | `<h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">` |
| 304 | hex | `#1B3F8B` | `<div className="font-serif text-5xl font-extrabold text-[#1B3F8B]">` |
| 317 | hex | `#1A1A1A` | `<h4 className="font-serif text-lg font-bold text-[#1A1A1A]">` |
| 339 | hex | `#1B3F8B` | `<div className="bg-[#1B3F8B] text-slate-50 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-blue-400/30">` |

### `src\components\landing\CareerDetailInspector.tsx` - 22

| Line | Kind | Value | Context |
|---:|---|---|---|
| 61 | hex | `#070D1B` | `<div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-[#070D1B] border border-indigo-500/50 space-y-3">` |
| 73 | hex | `#0B152C` | `<div className="p-3 rounded-xl bg-[#0B152C] border border-slate-800 text-[11px] font-mono text-slate-400 italic">` |
| 81 | hex | `#070D1B` | `<div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-[#070D1B] border border-indigo-500/40 space-y-4">` |
| 101 | hex | `#0B152C` | `<div className="p-4 rounded-xl bg-[#0B152C] border border-indigo-500/20 space-y-1">` |
| 114 | hex | `#0B152C` | `className="w-full p-4 rounded-xl bg-[#0B152C] border border-slate-700 font-sans text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-400/60 resi` |
| 143 | hex | `#0B152C` | `<div className="absolute -left-10 top-0.5 w-7 h-7 rounded-full bg-[#0B152C] border-2 border-sky-500/60 flex items-center justify-center">` |
| 146 | hex | `#070D1B` | `<div className="p-3 rounded-xl bg-[#070D1B] border border-slate-800">` |
| 178 | hex | `#0B152C` | `<div className="relative w-full max-w-4xl bg-[#0B152C] border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden text-slate-100 tone-dark max-h-[92vh] flex flex-col">` |
| 181 | hex | `#070D1B` | `<div className="p-5 sm:p-7 bg-gradient-to-r from-[#070D1B] to-[#0C1938] border-b border-slate-800 flex items-start justify-between gap-4 shrink-0">` |
| 181 | hex | `#0C1938` | `<div className="p-5 sm:p-7 bg-gradient-to-r from-[#070D1B] to-[#0C1938] border-b border-slate-800 flex items-start justify-between gap-4 shrink-0">` |
| 238 | hex | `#070D1B` | `<div className="p-5 rounded-2xl bg-[#070D1B] border border-slate-800 space-y-2">` |
| 253 | hex | `#070D1B` | `<li key={i} className="p-3 rounded-xl bg-[#070D1B] border border-slate-800 flex items-start gap-2.5 hover:border-sky-500/30 transition-colors">` |
| 263 | hex | `#070D1B` | `<div className="p-5 rounded-2xl bg-[#070D1B] border border-slate-800 space-y-3">` |
| 275 | hex | `#070D1B` | `<div className="p-5 rounded-2xl bg-[#070D1B] border border-slate-800 space-y-3">` |
| 343 | hex | `#070D1B` | `<div key={tool.name} className="p-4 rounded-xl bg-[#070D1B] border border-slate-800 space-y-2 hover:border-amber-400/30 transition-colors">` |
| 367 | hex | `#070D1B` | `<div className="p-5 rounded-2xl bg-[#070D1B] border border-slate-800 space-y-5">` |
| 379 | hex | `#0B152C` | `<div className="p-3 rounded-xl bg-[#0B152C] border border-slate-800 text-center">` |
| 383 | hex | `#0B152C` | `<div className="p-3 rounded-xl bg-[#0B152C] border border-emerald-500/20 text-center">` |
| 387 | hex | `#0B152C` | `<div className="p-3 rounded-xl bg-[#0B152C] border border-amber-500/20 text-center">` |
| 397 | hex | `#070D1B` | `<div className="p-4 rounded-xl bg-[#070D1B] border border-slate-800 flex items-start gap-3">` |
| 411 | hex | `#070D1B` | `<div className="p-4 rounded-xl bg-[#070D1B] border border-slate-800 flex items-start gap-3 mb-2">` |
| 430 | hex | `#070D1B` | `<div className="p-5 sm:p-6 bg-[#070D1B] border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">` |

### `src\components\landing\SalaryRoiCalculator.tsx` - 22

| Line | Kind | Value | Context |
|---:|---|---|---|
| 30 | hex | `#F7F5F0` | `<section className="py-12 sm:py-16 bg-[#F7F5F0] tone-light text-[#1A1A1A] relative overflow-hidden border-b border-stone-200/80">` |
| 30 | hex | `#1A1A1A` | `<section className="py-12 sm:py-16 bg-[#F7F5F0] tone-light text-[#1A1A1A] relative overflow-hidden border-b border-stone-200/80">` |
| 35 | hex | `#1B3F8B` | `<div className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white tone-light card-light px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest` |
| 36 | hex | `#1B3F8B` | `<Calculator className="h-3.5 w-3.5 text-[#1B3F8B]" />` |
| 40 | hex | `#1A1A1A` | `<h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1A1A1A] leading-tight">` |
| 42 | hex | `#8A6D1F` | `<span className="italic font-normal text-[#8A6D1F]">` |
| 71 | hex | `#1B3F8B` | `? "bg-sky-50 text-[#1B3F8B] border-[#1B3F8B] ring-2 ring-[#1B3F8B]/15 shadow-xs"` |
| 71 | hex | `#1B3F8B` | `? "bg-sky-50 text-[#1B3F8B] border-[#1B3F8B] ring-2 ring-[#1B3F8B]/15 shadow-xs"` |
| 71 | hex | `#1B3F8B` | `? "bg-sky-50 text-[#1B3F8B] border-[#1B3F8B] ring-2 ring-[#1B3F8B]/15 shadow-xs"` |
| 97 | hex | `#1A1A1A` | `? "bg-white text-[#1A1A1A] border-[#1B3F8B] ring-2 ring-[#1B3F8B]/15 shadow-sm"` |
| 97 | hex | `#1B3F8B` | `? "bg-white text-[#1A1A1A] border-[#1B3F8B] ring-2 ring-[#1B3F8B]/15 shadow-sm"` |
| 97 | hex | `#1B3F8B` | `? "bg-white text-[#1A1A1A] border-[#1B3F8B] ring-2 ring-[#1B3F8B]/15 shadow-sm"` |
| 102 | hex | `#1A1A1A` | `<div className="font-serif font-bold text-sm sm:text-base text-[#1A1A1A]">` |
| 105 | hex | `#1B3F8B` | `<div className="text-[11px] font-mono font-semibold text-[#1B3F8B] mt-0.5">` |
| 109 | hex | `#8A6D1F` | `<span className="text-[10px] font-mono font-bold text-[#8A6D1F] bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">` |
| 134 | hex | `#1B3F8B` | `<span className="font-serif font-bold text-2xl sm:text-3xl text-[#1B3F8B] block mt-1">` |
| 144 | hex | `#8A6D1F` | `<span className="font-serif font-bold text-2xl sm:text-3xl text-[#8A6D1F] block mt-1">` |
| 157 | hex | `#1B3F8B` | `<TrendingUp className="h-4 w-4 text-[#1B3F8B]" />` |
| 159 | hex | `#1B3F8B` | `<div className="font-mono font-black text-3xl text-[#1B3F8B]">` |
| 170 | hex | `#1B3F8B` | `style={{ color: "#FFFFFF", backgroundColor: "#1B3F8B" }}` |
| 171 | hex | `#1B3F8B` | `className="h-12 w-full inline-flex items-center justify-center gap-2 text-sm font-extrabold text-white rounded-xl bg-[#1B3F8B] hover:bg-[#153270] shadow-md transition-all cursor-po` |
| 171 | hex | `#153270` | `className="h-12 w-full inline-flex items-center justify-center gap-2 text-sm font-extrabold text-white rounded-xl bg-[#1B3F8B] hover:bg-[#153270] shadow-md transition-all cursor-po` |

### `src\routes\acri.leaderboard.tsx` - 22

| Line | Kind | Value | Context |
|---:|---|---|---|
| 85 | hex | `#F7F8F5` | `<main className="min-h-screen bg-[#F7F8F5] text-[#0B1325] py-10 sm:py-14 px-4 sm:px-6">` |
| 85 | hex | `#0B1325` | `<main className="min-h-screen bg-[#F7F8F5] text-[#0B1325] py-10 sm:py-14 px-4 sm:px-6">` |
| 90 | hex | `#E8F7F1` | `<span className="px-3 py-1 rounded-full bg-[#E8F7F1] text-[#005B4F] text-xs font-mono font-bold uppercase tracking-wider border border-[#005B4F]/20">` |
| 90 | hex | `#005B4F` | `<span className="px-3 py-1 rounded-full bg-[#E8F7F1] text-[#005B4F] text-xs font-mono font-bold uppercase tracking-wider border border-[#005B4F]/20">` |
| 90 | hex | `#005B4F` | `<span className="px-3 py-1 rounded-full bg-[#E8F7F1] text-[#005B4F] text-xs font-mono font-bold uppercase tracking-wider border border-[#005B4F]/20">` |
| 99 | hex | `#0B1325` | `<h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B1325] tracking-tight">` |
| 115 | hex | `#0B1325` | `<div className="text-2xl font-serif font-black text-[#0B1325]">{stats.totalCompleted}</div>` |
| 125 | hex | `#0B1325` | `<div className="text-2xl font-serif font-black text-[#0B1325]">{stats.averageScore}</div>` |
| 131 | hex | `#E8F7F1` | `<div className="h-12 w-12 rounded-xl bg-[#E8F7F1] border border-emerald-100 flex items-center justify-center text-[#005B4F] shrink-0">` |
| 131 | hex | `#005B4F` | `<div className="h-12 w-12 rounded-xl bg-[#E8F7F1] border border-emerald-100 flex items-center justify-center text-[#005B4F] shrink-0">` |
| 135 | hex | `#0B1325` | `<div className="text-2xl font-serif font-black text-[#0B1325]">{stats.industryReadyCount}</div>` |
| 149 | hex | `#005B4F` | `? "bg-[#005B4F] text-white shadow-2xs"` |
| 160 | hex | `#005B4F` | `? "bg-[#005B4F] text-white shadow-2xs"` |
| 171 | hex | `#005B4F` | `? "bg-[#005B4F] text-white shadow-2xs"` |
| 189 | hex | `#FAF8F5` | `<tr className="border-b border-stone-200 bg-[#FAF8F5]/80 text-[11px] font-mono font-bold text-stone-400 uppercase tracking-wider">` |
| 233 | hex | `#0B1325` | `<div className="font-semibold text-[#0B1325]">{entry.name}</div>` |
| 245 | hex | `#0B1325` | `<span className="font-mono font-black text-sm text-[#0B1325]">` |
| 271 | hex | `#FAF8F5` | `<div className="p-4 bg-[#FAF8F5] border-t border-stone-200 text-xs text-stone-500 flex items-start gap-2">` |
| 272 | hex | `#005B4F` | `<ShieldCheck className="h-4 w-4 text-[#005B4F] shrink-0 mt-0.5" />` |
| 281 | hex | `#005B4F` | `<div className="bg-[#005B4F] text-white p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">` |
| 293 | hex | `#005B4F` | `className="px-6 py-3 rounded-xl bg-white tone-light text-[#005B4F] font-semibold text-xs sm:text-sm hover:bg-emerald-50 transition-colors shadow-xs shrink-0 flex items-center gap-2` |
| 296 | hex | `#005B4F` | `<ArrowRight className="h-4 w-4 text-[#005B4F]" />` |

### `src\components\career\FindYourTrainingWidget.tsx` - 21

| Line | Kind | Value | Context |
|---:|---|---|---|
| 66 | hex | `#1B3F8B` | `<span className="inline-block w-2.5 h-2.5 rounded-full bg-[#1B3F8B] motion-safe:animate-pulse" />` |
| 67 | hex | `#1B3F8B` | `<span className="font-mono text-[10px] font-bold tracking-widest text-[#1B3F8B] uppercase">` |
| 72 | hex | `#0B1325` | `<h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1325]">` |
| 89 | hex | `#FAF9F6` | `className="w-full bg-[#FAF9F6] border border-stone-300 rounded p-2.5 font-sans text-stone-900 focus:ring-1 focus:ring-[#1B3F8B] focus:border-[#1B3F8B]"` |
| 89 | hex | `#1B3F8B` | `className="w-full bg-[#FAF9F6] border border-stone-300 rounded p-2.5 font-sans text-stone-900 focus:ring-1 focus:ring-[#1B3F8B] focus:border-[#1B3F8B]"` |
| 89 | hex | `#1B3F8B` | `className="w-full bg-[#FAF9F6] border border-stone-300 rounded p-2.5 font-sans text-stone-900 focus:ring-1 focus:ring-[#1B3F8B] focus:border-[#1B3F8B]"` |
| 108 | hex | `#FAF9F6` | `className="w-full bg-[#FAF9F6] border border-stone-300 rounded p-2.5 font-sans text-stone-900 focus:ring-1 focus:ring-[#1B3F8B] focus:border-[#1B3F8B]"` |
| 108 | hex | `#1B3F8B` | `className="w-full bg-[#FAF9F6] border border-stone-300 rounded p-2.5 font-sans text-stone-900 focus:ring-1 focus:ring-[#1B3F8B] focus:border-[#1B3F8B]"` |
| 108 | hex | `#1B3F8B` | `className="w-full bg-[#FAF9F6] border border-stone-300 rounded p-2.5 font-sans text-stone-900 focus:ring-1 focus:ring-[#1B3F8B] focus:border-[#1B3F8B]"` |
| 125 | hex | `#FAF9F6` | `className="w-full bg-[#FAF9F6] border border-stone-300 rounded p-2.5 font-sans text-stone-900 focus:ring-1 focus:ring-[#1B3F8B] focus:border-[#1B3F8B]"` |
| 125 | hex | `#1B3F8B` | `className="w-full bg-[#FAF9F6] border border-stone-300 rounded p-2.5 font-sans text-stone-900 focus:ring-1 focus:ring-[#1B3F8B] focus:border-[#1B3F8B]"` |
| 125 | hex | `#1B3F8B` | `className="w-full bg-[#FAF9F6] border border-stone-300 rounded p-2.5 font-sans text-stone-900 focus:ring-1 focus:ring-[#1B3F8B] focus:border-[#1B3F8B]"` |
| 143 | hex | `#FAF9F6` | `className="w-full bg-[#FAF9F6] border border-stone-300 rounded p-2.5 font-sans text-stone-900 focus:ring-1 focus:ring-[#1B3F8B] focus:border-[#1B3F8B]"` |
| 143 | hex | `#1B3F8B` | `className="w-full bg-[#FAF9F6] border border-stone-300 rounded p-2.5 font-sans text-stone-900 focus:ring-1 focus:ring-[#1B3F8B] focus:border-[#1B3F8B]"` |
| 143 | hex | `#1B3F8B` | `className="w-full bg-[#FAF9F6] border border-stone-300 rounded p-2.5 font-sans text-stone-900 focus:ring-1 focus:ring-[#1B3F8B] focus:border-[#1B3F8B]"` |
| 153 | hex | `#FAF9F6` | `<div className="mt-8 bg-[#FAF9F6] border border-stone-300 rounded-xl p-6 sm:p-8">` |
| 165 | hex | `#0B1325` | `<h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0B1325]">` |
| 185 | hex | `#0B1325` | `<strong className="text-[#0B1325]">{currentTrack.duration}</strong>` |
| 189 | hex | `#0B1325` | `<strong className="text-[#0B1325]">{currentTrack.internshipScope}</strong>` |
| 198 | hex | `#0B1325` | `className="w-full inline-flex items-center justify-center gap-2 bg-[#0B1325] hover:bg-[#1B3F8B] text-white px-6 py-3 rounded text-xs font-mono font-bold uppercase tracking-wider tr` |
| 198 | hex | `#1B3F8B` | `className="w-full inline-flex items-center justify-center gap-2 bg-[#0B1325] hover:bg-[#1B3F8B] text-white px-6 py-3 rounded text-xs font-mono font-bold uppercase tracking-wider tr` |

### `src\components\landing\LimitedSeatsCountdown.tsx` - 21

| Line | Kind | Value | Context |
|---:|---|---|---|
| 72 | hex | `#F8FAFC` | `className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC]"` |
| 72 | hex | `#F1F5F9` | `className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC]"` |
| 72 | hex | `#F8FAFC` | `className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC]"` |
| 77 | hex | `#1B3F8B` | `<div className="inline-flex items-center gap-2 rounded-full border border-sky-300/80 bg-sky-50 px-4 py-1.5 text-[11px] font-mono font-bold uppercase tracking-widest text-[#1B3F8B] ` |
| 78 | hex | `#2563EB` | `<Sparkles className="h-3.5 w-3.5 text-[#2563EB]" />` |
| 81 | hex | `#151C2E` | `<h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#151C2E] tracking-tight leading-tight">` |
| 83 | hex | `#8A6D1F` | `<span className="italic text-[#8A6D1F]">Not Just the Degree.</span>` |
| 85 | hex | `#475569` | `<p className="text-sm sm:text-base text-[#475569] max-w-2xl mx-auto leading-relaxed font-medium">` |
| 93 | hex | `#64748B` | `<h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#64748B]">` |
| 96 | hex | `#8A6D1F` | `<span className="text-xs font-mono font-semibold text-[#8A6D1F]">` |
| 109 | hex | `#2563EB` | `<span className="font-mono text-xs font-bold text-[#2563EB] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">` |
| 112 | hex | `#2563EB` | `<step.icon className="h-4 w-4 text-slate-400 group-hover:text-[#2563EB] transition-colors" />` |
| 114 | hex | `#151C2E` | `<h4 className="font-serif text-lg font-bold text-[#151C2E]">` |
| 117 | hex | `#5B6472` | `<p className="text-xs sm:text-sm text-[#5B6472] leading-relaxed">` |
| 132 | hex | `#151C2E` | `<span className="font-mono text-xs font-bold uppercase tracking-wider text-[#151C2E]">` |
| 139 | hex | `#151C2E` | `<p className="font-serif text-xl sm:text-2xl font-bold text-[#151C2E]">` |
| 140 | hex | `#8A6D1F` | `Starts <span className="text-[#8A6D1F]">{cohortDate}</span>` |
| 145 | hex | `#2563EB` | `<ShieldCheck className="h-4 w-4 text-[#2563EB]" />` |
| 151 | hex | `#475569` | `<div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-6 text-xs font-mono font-bold text-[#475569]">` |
| 172 | hex | `#151C2E` | `style={{ color: "#FFFFFF", backgroundColor: "#151C2E" }}` |
| 173 | hex | `#2563EB` | `className="w-full sm:w-auto flex-1 rounded-full hover:bg-[#2563EB] text-slate-50 text-sm font-bold h-12 px-6 flex items-center justify-center gap-2 transition-colors shadow-md grou` |

### `src\components\acri\AcriRoleSelection.tsx` - 20

| Line | Kind | Value | Context |
|---:|---|---|---|
| 94 | hex | `#E8F7F1` | `<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F7F1] border border-[#005B4F]/20 text-[#005B4F] text-[11px] font-mono font-bold uppercase tracking-wide` |
| 94 | hex | `#005B4F` | `<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F7F1] border border-[#005B4F]/20 text-[#005B4F] text-[11px] font-mono font-bold uppercase tracking-wide` |
| 94 | hex | `#005B4F` | `<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F7F1] border border-[#005B4F]/20 text-[#005B4F] text-[11px] font-mono font-bold uppercase tracking-wide` |
| 98 | hex | `#0B1325` | `<h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1325] tracking-tight">` |
| 108 | hex | `#005B4F` | `className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#005B4F] hover:text-[#00473E] group shrink-0"` |
| 108 | hex | `#00473E` | `className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#005B4F] hover:text-[#00473E] group shrink-0"` |
| 134 | hex | `#005B4F` | `<span className="absolute top-3 right-3 bg-[#005B4F] text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">` |
| 139 | hex | `#0B1325` | `<span className="absolute bottom-3 left-3 bg-[#0B1325]/80 backdrop-blur-xs text-white text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-md">` |
| 145 | hex | `#0B1325` | `<h3 className="font-serif text-xl font-bold text-[#0B1325] group-hover:text-[#005B4F] transition-colors">` |
| 145 | hex | `#005B4F` | `<h3 className="font-serif text-xl font-bold text-[#0B1325] group-hover:text-[#005B4F] transition-colors">` |
| 154 | hex | `#005B4F` | `<GraduationCap className="h-4 w-4 text-[#005B4F]" />` |
| 181 | hex | `#005B4F` | `className="text-xs font-semibold text-stone-700 hover:text-[#005B4F] flex items-center gap-1"` |
| 189 | hex | `#005B4F` | `className="px-3.5 py-1.5 rounded-lg bg-[#005B4F] hover:bg-[#00473E] text-white text-xs font-semibold shadow-2xs transition-colors"` |
| 189 | hex | `#00473E` | `className="px-3.5 py-1.5 rounded-lg bg-[#005B4F] hover:bg-[#00473E] text-white text-xs font-semibold shadow-2xs transition-colors"` |
| 199 | hex | `#FAF8F5` | `<div className="mt-12 p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200 flex flex-wrap items-center justify-between gap-6">` |
| 201 | hex | `#005B4F` | `<CheckCircle2 className="h-4 w-4 text-[#005B4F]" />` |
| 205 | hex | `#005B4F` | `<CheckCircle2 className="h-4 w-4 text-[#005B4F]" />` |
| 209 | hex | `#005B4F` | `<CheckCircle2 className="h-4 w-4 text-[#005B4F]" />` |
| 213 | hex | `#005B4F` | `<CheckCircle2 className="h-4 w-4 text-[#005B4F]" />` |
| 217 | hex | `#005B4F` | `<CheckCircle2 className="h-4 w-4 text-[#005B4F]" />` |

### `src\components\acri\assessment\AcriStageRail.tsx` - 20

| Line | Kind | Value | Context |
|---:|---|---|---|
| 4 | hex | `#07241A` | `* Reference: Image 4 — left nav with deep green (#07241A) background,` |
| 51 | rgba | `rgba(255,255,255,0.06)` | `"border-r border-[rgba(255,255,255,0.06)]",` |
| 58 | rgba | `rgba(255,255,255,0.06)` | `<div className="px-4 py-4 border-b border-[rgba(255,255,255,0.06)]">` |
| 78 | rgba | `rgba(255,255,255,0.06)` | `<div className="px-3 py-3 border-b border-[rgba(255,255,255,0.06)]">` |
| 86 | rgba | `rgba(255,255,255,0.45)` | `: "text-[rgba(255,255,255,0.45)] hover:text-[rgba(255,255,255,0.65)]",` |
| 86 | rgba | `rgba(255,255,255,0.65)` | `: "text-[rgba(255,255,255,0.45)] hover:text-[rgba(255,255,255,0.65)]",` |
| 99 | rgba | `rgba(255,255,255,0.35)` | `<div className="font-mono text-[9px] text-[rgba(255,255,255,0.35)] uppercase tracking-[0.22em] mb-2 px-2">` |
| 118 | rgba | `rgba(22,163,74,0.18)` | `? "bg-[rgba(22,163,74,0.18)] text-white"` |
| 120 | rgba | `rgba(255,255,255,0.55)` | `? "text-[rgba(255,255,255,0.55)] hover:bg-[rgba(255,255,255,0.05)]"` |
| 120 | rgba | `rgba(255,255,255,0.05)` | `? "text-[rgba(255,255,255,0.55)] hover:bg-[rgba(255,255,255,0.05)]"` |
| 121 | rgba | `rgba(255,255,255,0.35)` | `: "text-[rgba(255,255,255,0.35)] hover:bg-[rgba(255,255,255,0.04)]",` |
| 121 | rgba | `rgba(255,255,255,0.04)` | `: "text-[rgba(255,255,255,0.35)] hover:bg-[rgba(255,255,255,0.04)]",` |
| 132 | rgba | `rgba(255,255,255,0.2)` | `<Circle className="h-3 w-3 text-[rgba(255,255,255,0.2)]" />` |
| 143 | rgba | `rgba(255,255,255,0.3)` | `<span className="font-mono text-[9px] text-[rgba(255,255,255,0.3)] shrink-0">` |
| 154 | rgba | `rgba(255,255,255,0.06)` | `<div className="px-4 py-4 border-t border-[rgba(255,255,255,0.06)]">` |
| 156 | rgba | `rgba(22,163,74,0.08)` | `<div className="mb-3 p-3 rounded-[var(--radius-md)] bg-[rgba(22,163,74,0.08)] border border-[rgba(22,163,74,0.15)]">` |
| 156 | rgba | `rgba(22,163,74,0.15)` | `<div className="mb-3 p-3 rounded-[var(--radius-md)] bg-[rgba(22,163,74,0.08)] border border-[rgba(22,163,74,0.15)]">` |
| 157 | rgba | `rgba(255,255,255,0.5)` | `<p className="font-mono text-[10px] text-[rgba(255,255,255,0.5)] leading-relaxed italic">` |
| 163 | rgba | `rgba(255,255,255,0.25)` | `<div className="text-[9px] font-mono text-[rgba(255,255,255,0.25)] space-y-0.5">` |
| 164 | rgba | `rgba(255,255,255,0.35)` | `<div className="font-bold text-[rgba(255,255,255,0.35)]">ACRI-PV v1.0</div>` |

### `src\components\acri\landing\AcriLaunchHeader.tsx` - 20

| Line | Kind | Value | Context |
|---:|---|---|---|
| 16 | hex | `#FAF8F5` | `<header className="sticky top-0 z-40 w-full bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E5E7EB] transition-all">` |
| 16 | hex | `#E5E7EB` | `<header className="sticky top-0 z-40 w-full bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E5E7EB] transition-all">` |
| 20 | hex | `#005B4F` | `<div className="h-10 w-10 rounded-xl bg-[#005B4F] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">` |
| 24 | hex | `#0B1325` | `<span className="font-serif font-black text-xl tracking-tight text-[#0B1325]">` |
| 27 | hex | `#005B4F` | `<span className="font-mono text-[9px] uppercase tracking-widest text-[#005B4F] font-bold">` |
| 34 | hex | `#1D2939` | `<nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#1D2939]">` |
| 37 | hex | `#005B4F` | `className="hover:text-[#005B4F] transition-colors py-1"` |
| 43 | hex | `#005B4F` | `className="text-[#005B4F] font-semibold flex items-center gap-1.5 py-1"` |
| 46 | hex | `#005B4F` | `<span className="h-1.5 w-1.5 rounded-full bg-[#005B4F]" />` |
| 50 | hex | `#005B4F` | `className="hover:text-[#005B4F] transition-colors py-1"` |
| 56 | hex | `#005B4F` | `className="hover:text-[#005B4F] transition-colors py-1"` |
| 62 | hex | `#005B4F` | `className="hover:text-[#005B4F] transition-colors py-1"` |
| 85 | hex | `#005B4F` | `className="px-3.5 py-2 text-xs font-semibold text-stone-600 hover:text-[#005B4F] transition-colors"` |
| 93 | hex | `#005B4F` | `className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-white font-sans font-semibold text-xs tracking-wide transition-all shadow-sm h` |
| 93 | hex | `#00473E` | `className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-white font-sans font-semibold text-xs tracking-wide transition-all shadow-sm h` |
| 113 | hex | `#005B4F` | `className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#005B4F] text-white text-xs font-semibold cursor-pointer"` |
| 130 | hex | `#FAF8F5` | `<div className="md:hidden border-t border-stone-200 bg-[#FAF8F5] px-4 pt-3 pb-6 space-y-3">` |
| 142 | hex | `#E8F7F1` | `className="px-3 py-2 rounded-lg bg-[#E8F7F1] text-[#005B4F] font-semibold"` |
| 142 | hex | `#005B4F` | `className="px-3 py-2 rounded-lg bg-[#E8F7F1] text-[#005B4F] font-semibold"` |
| 182 | hex | `#005B4F` | `className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#005B4F] text-white font-semibold text-sm shadow-sm cursor-pointer"` |

### `src\components\career\result\ReferralSuite\SocialShareModal.tsx` - 20

| Line | Kind | Value | Context |
|---:|---|---|---|
| 72 | hex | `#070D1E` | `backgroundColor: "#070D1E",` |
| 93 | hex | `#E4EAF2` | `<div className="relative w-full max-w-xl rounded-3xl border border-[#E4EAF2] bg-white tone-light card-light p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">` |
| 95 | hex | `#E4EAF2` | `<div className="flex items-center justify-between border-b border-[#E4EAF2] pb-4">` |
| 97 | hex | `#1557D6` | `<Share2 className="h-5 w-5 text-[#1557D6]" />` |
| 98 | hex | `#071A4A` | `<h3 className="font-serif text-xl font-bold text-[#071A4A]">` |
| 117 | hex | `#25D366` | `activeTab === "whatsapp" ? "bg-white tone-light text-[#25D366] shadow-xs font-bold" : "hover:text-slate-900"` |
| 128 | hex | `#0077B5` | `activeTab === "linkedin" ? "bg-white tone-light text-[#0077B5] shadow-xs font-bold" : "hover:text-slate-900"` |
| 139 | hex | `#E1306C` | `activeTab === "instagram" ? "bg-white tone-light text-[#E1306C] shadow-xs font-bold" : "hover:text-slate-900"` |
| 150 | hex | `#071A4A` | `activeTab === "link" ? "bg-white tone-light text-[#071A4A] shadow-xs font-bold" : "hover:text-slate-900"` |
| 162 | hex | `#FAFBFD` | `<div className="rounded-2xl border border-slate-200 bg-[#FAFBFD] p-4 text-left text-xs font-sans text-slate-800 leading-relaxed whitespace-pre-wrap">` |
| 171 | hex | `#25D366` | `className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-[#1EBE5D] w-full sm:w-auto"` |
| 171 | hex | `#1EBE5D` | `className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-[#1EBE5D] w-full sm:w-auto"` |
| 190 | hex | `#FAFBFD` | `<div className="rounded-2xl border border-slate-200 bg-[#FAFBFD] p-4 text-left text-xs font-sans text-slate-800 leading-relaxed whitespace-pre-wrap">` |
| 199 | hex | `#0077B5` | `className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#0077B5] px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-[#005582] w-full sm:w-auto"` |
| 199 | hex | `#005582` | `className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#0077B5] px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-[#005582] w-full sm:w-auto"` |
| 233 | hex | `#071A4A` | `className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#071A4A] px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-[#1557D6] disabled:opacity-50 ` |
| 233 | hex | `#1557D6` | `className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#071A4A] px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-[#1557D6] disabled:opacity-50 ` |
| 246 | hex | `#FAFBFD` | `<div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-[#FAFBFD] p-3 text-xs font-mono text-slate-800 truncate">` |
| 251 | hex | `#071A4A` | `className="rounded-lg bg-[#071A4A] px-3 py-1.5 text-white font-sans text-xs font-bold hover:bg-[#1557D6] shrink-0"` |
| 251 | hex | `#1557D6` | `className="rounded-lg bg-[#071A4A] px-3 py-1.5 text-white font-sans text-xs font-bold hover:bg-[#1557D6] shrink-0"` |

### `src\components\home\HomePriorityTracks.tsx` - 20

| Line | Kind | Value | Context |
|---:|---|---|---|
| 65 | hex | `#E4EAF2` | `<section id="priority-tracks" className="py-14 sm:py-20 bg-white border-b border-[#E4EAF2] tone-light card-light">` |
| 70 | hex | `#1557D6` | `<div className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#1557D6] mb-2 flex items-center gap-1.5">` |
| 73 | hex | `#071A4A` | `<h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-[#071A4A] tracking-tight leading-tight">` |
| 76 | hex | `#475569` | `<p className="mt-2 text-sm sm:text-base text-[#475569] max-w-2xl leading-relaxed">` |
| 83 | hex | `#1557D6` | `className="inline-flex items-center gap-2 rounded-full bg-[#1557D6] hover:bg-[#1044A5] text-white px-6 py-3 text-xs sm:text-sm font-bold transition-all shadow-sm shrink-0 self-star` |
| 83 | hex | `#1044A5` | `className="inline-flex items-center gap-2 rounded-full bg-[#1557D6] hover:bg-[#1044A5] text-white px-6 py-3 text-xs sm:text-sm font-bold transition-all shadow-sm shrink-0 self-star` |
| 95 | hex | `#E4EAF2` | `className="flex flex-col justify-between rounded-2xl border border-[#E4EAF2] bg-white overflow-hidden shadow-xs hover:border-[#1557D6]/40 hover:shadow-lg transition-all group tone-` |
| 95 | hex | `#1557D6` | `className="flex flex-col justify-between rounded-2xl border border-[#E4EAF2] bg-white overflow-hidden shadow-xs hover:border-[#1557D6]/40 hover:shadow-lg transition-all group tone-` |
| 109 | hex | `#1557D6` | `<div className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 rounded-full bg-white/95 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-mono font-bold text-[#1557D6] ` |
| 116 | hex | `#071A4A` | `<h3 className="font-sans text-base font-bold text-[#071A4A] leading-snug group-hover:text-[#1557D6] transition-colors line-clamp-2">` |
| 116 | hex | `#1557D6` | `<h3 className="font-sans text-base font-bold text-[#071A4A] leading-snug group-hover:text-[#1557D6] transition-colors line-clamp-2">` |
| 119 | hex | `#64748B` | `<p className="text-xs text-[#64748B] leading-relaxed line-clamp-3">` |
| 128 | hex | `#F1F5F9` | `className="inline-flex items-center rounded-md bg-[#F1F5F9] px-2 py-0.5 text-[10px] font-mono font-semibold text-[#475569] border border-slate-200/70"` |
| 128 | hex | `#475569` | `className="inline-flex items-center rounded-md bg-[#F1F5F9] px-2 py-0.5 text-[10px] font-mono font-semibold text-[#475569] border border-slate-200/70"` |
| 138 | hex | `#F1F5F9` | `<div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-[#F1F5F9]">` |
| 141 | hex | `#1557D6` | `className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1557D6] hover:text-[#071A4A] transition-colors"` |
| 141 | hex | `#071A4A` | `className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1557D6] hover:text-[#071A4A] transition-colors"` |
| 149 | hex | `#EEF6FF` | `className="grid h-7 w-7 place-items-center rounded-full bg-[#EEF6FF] text-[#1557D6] group-hover:bg-[#1557D6] group-hover:text-white transition-colors"` |
| 149 | hex | `#1557D6` | `className="grid h-7 w-7 place-items-center rounded-full bg-[#EEF6FF] text-[#1557D6] group-hover:bg-[#1557D6] group-hover:text-white transition-colors"` |
| 149 | hex | `#1557D6` | `className="grid h-7 w-7 place-items-center rounded-full bg-[#EEF6FF] text-[#1557D6] group-hover:bg-[#1557D6] group-hover:text-white transition-colors"` |

### `src\components\landing\CareerExplorerTerminal.tsx` - 20

| Line | Kind | Value | Context |
|---:|---|---|---|
| 201 | hex | `#1A1A1A` | `<h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">` |
| 214 | hex | `#1B3F8B` | `<span className="font-mono text-sm font-bold text-[#1B3F8B]">` |
| 231 | hex | `#1B3F8B` | `? "bg-[#1B3F8B] text-slate-50 border-[#1B3F8B] shadow-lg ring-2 ring-[#1B3F8B]/30"` |
| 231 | hex | `#1B3F8B` | `? "bg-[#1B3F8B] text-slate-50 border-[#1B3F8B] shadow-lg ring-2 ring-[#1B3F8B]/30"` |
| 231 | hex | `#1B3F8B` | `? "bg-[#1B3F8B] text-slate-50 border-[#1B3F8B] shadow-lg ring-2 ring-[#1B3F8B]/30"` |
| 232 | hex | `#FAF8F5` | `: "bg-[#FAF8F5] text-stone-700 hover:bg-stone-100 border-stone-200 shadow-2xs"` |
| 270 | hex | `#FAF8F5` | `className="relative rounded-3xl border border-stone-200 bg-[#FAF8F5] p-6 sm:p-10 shadow-lg space-y-8 overflow-hidden"` |
| 272 | hex | `#1B3F8B` | `<BorderBeam size={220} duration={12} delay={2} colorFrom="#1B3F8B" colorTo="#0D9488" />` |
| 272 | hex | `#0D9488` | `<BorderBeam size={220} duration={12} delay={2} colorFrom="#1B3F8B" colorTo="#0D9488" />` |
| 278 | hex | `#1B3F8B` | `<span className="font-mono text-xs font-bold text-[#1B3F8B] bg-sky-50 border border-sky-200 px-2.5 py-0.5 rounded-md">` |
| 285 | hex | `#1A1A1A` | `<h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">` |
| 298 | hex | `#1B3F8B` | `<Sparkles className="h-3.5 w-3.5 text-[#1B3F8B]" />` |
| 303 | hex | `#1B3F8B` | `className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-slate-50 font-bold text-xs transition-all shadow-sm cursor-pointer hover:-transl` |
| 303 | hex | `#153270` | `className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-slate-50 font-bold text-xs transition-all shadow-sm cursor-pointer hover:-transl` |
| 316 | hex | `#1B3F8B` | `<Laptop className="h-4 w-4 text-[#1B3F8B]" />` |
| 340 | hex | `#1B3F8B` | `className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-800 font-mono text-[11px] font-bold border border-stone-200 shadow-2xs hover:border-[#1B3F8B]/50 hover:bg-blue-50/50 trans` |
| 357 | hex | `#1B3F8B` | `className="px-2.5 py-1 rounded-lg bg-sky-50 text-[#1B3F8B] font-mono text-[11px] font-bold border border-sky-200 hover:bg-sky-100 transition-colors shadow-2xs"` |
| 369 | hex | `#8A6D1F` | `<span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#8A6D1F] block pb-1 border-b border-stone-200">` |
| 379 | hex | `#1B3F8B` | `<span className="font-bold text-[#1B3F8B]">{activeTrack.salary.y3}</span>` |
| 401 | hex | `#1B3F8B` | `<div className="flex items-center gap-2 text-[#1B3F8B] font-mono font-bold">` |

### `src\components\system\ArzonHeader.tsx` - 20

| Line | Kind | Value | Context |
|---:|---|---|---|
| 59 | hex | `#E4EAF2` | `? "border-[#E4EAF2] shadow-[0_2px_16px_rgba(7,26,74,0.07)]"` |
| 60 | hex | `#E4EAF2` | `: "border-[#E4EAF2]/60",` |
| 70 | hex | `#1557D6` | `className="flex min-w-0 sm:min-w-[150px] shrink-0 items-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1557D6] focus-visible:ring-offset-2"` |
| 88 | hex | `#071A4A` | `? "text-[#071A4A]"` |
| 89 | hex | `#071A4A` | `: "text-slate-500 hover:text-[#071A4A]",` |
| 94 | hex | `#1557D6` | `<span className="absolute inset-x-2 -bottom-[1px] h-[2px] rounded-full bg-[#1557D6]" />` |
| 107 | hex | `#E4EAF2` | `className="inline-flex h-8 items-center gap-2 rounded-full border border-[#E4EAF2] bg-[#F7F9FE] px-3 text-xs font-medium text-slate-500 hover:border-slate-300 hover:bg-slate-50 hov` |
| 107 | hex | `#F7F9FE` | `className="inline-flex h-8 items-center gap-2 rounded-full border border-[#E4EAF2] bg-[#F7F9FE] px-3 text-xs font-medium text-slate-500 hover:border-slate-300 hover:bg-slate-50 hov` |
| 112 | hex | `#E4EAF2` | `<kbd className="rounded bg-white px-1 py-0.5 text-[10px] font-mono text-slate-400 border border-[#E4EAF2] tone-light">` |
| 118 | hex | `#E4EAF2` | `<div className="h-5 w-px bg-[#E4EAF2]" />` |
| 123 | hex | `#071A4A` | `className="inline-flex h-8 items-center rounded-full px-3 text-xs font-semibold text-slate-500 hover:bg-slate-50 hover:text-[#071A4A] transition-colors"` |
| 164 | hex | `#E4EAF2` | `<div className="arzon-site-mobile border-t border-[#E4EAF2] bg-white/98 backdrop-blur-md tone-light lg:hidden max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain pb-8 shad` |
| 167 | hex | `#E4EAF2` | `<div className="mb-3 pb-3 border-b border-[#E4EAF2]">` |
| 169 | hex | `#1557D6` | `<div className="h-1.5 w-1.5 rounded-full bg-[#1557D6] motion-safe:animate-pulse" />` |
| 191 | hex | `#EEF6FF` | `? "bg-[#EEF6FF] border border-[#D0E1FD]"` |
| 191 | hex | `#D0E1FD` | `? "bg-[#EEF6FF] border border-[#D0E1FD]"` |
| 196 | hex | `#071A4A` | `<span className={`text-sm font-bold ${active ? "text-[#071A4A]" : "text-slate-800"}`}>` |
| 199 | hex | `#1557D6` | `<ArrowRight className={`h-3.5 w-3.5 ${active ? "text-[#1557D6]" : "text-slate-400"}`} />` |
| 208 | hex | `#E4EAF2` | `<div className="mt-3 border-t border-[#E4EAF2] pt-3">` |
| 225 | hex | `#E4EAF2` | `<div className="mt-4 grid gap-2 border-t border-[#E4EAF2] pt-3 sm:grid-cols-2">` |

### `src\components\workshop\WorkshopRegistrationCard.tsx` - 20

| Line | Kind | Value | Context |
|---:|---|---|---|
| 90 | hex | `#080d1a` | `className="w-full flex items-center justify-between gap-2 rounded-xl border border-slate-700 bg-[#080d1a] px-4 py-3 text-sm text-white font-sans font-semibold hover:border-blue-500` |
| 106 | hex | `#0f172a` | `className="absolute top-full mt-1.5 left-0 right-0 z-50 rounded-xl border border-slate-700 bg-[#0f172a] py-1.5 shadow-2xl shadow-black/60 overflow-hidden"` |
| 124 | hex | `#080d1a` | `: "text-slate-200 hover:bg-[#080d1a] hover:text-white"` |
| 225 | hex | `#020617` | `<section className="tone-dark bg-[#020617] py-24 text-white border-t border-slate-900">` |
| 241 | hex | `#0f172a` | `<div className="rounded-2xl border border-slate-800 bg-[#0f172a]/60 p-6 sm:p-8 flex flex-col backdrop-blur-sm">` |
| 257 | hex | `#0f172a` | `<div className="rounded-2xl border border-blue-500/30 bg-[#0f172a]/80 p-6 sm:p-8 flex flex-col backdrop-blur-sm">` |
| 274 | hex | `#0f172a` | `<div className="mt-12 max-w-3xl mx-auto rounded-2xl border border-slate-800 bg-[#0f172a] p-6 sm:p-8 text-center shadow-xl">` |
| 291 | hex | `#080d1a` | `<div className="flex items-center justify-center gap-3.5 p-3 rounded-xl bg-[#080d1a] border border-slate-800 max-w-lg mx-auto mb-6 text-left">` |
| 298 | hex | `#080d1a` | `<span className="absolute bottom-0.5 right-0.5 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-[#080d1a]" />` |
| 336 | hex | `#020617` | `<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020617]/90 backdrop-blur-md">` |
| 342 | hex | `#0f172a` | `className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-[#0f172a] p-6 sm:p-8 shadow-2xl text-white"` |
| 348 | hex | `#080d1a` | `className="absolute top-4 right-4 p-1.5 rounded-xl bg-[#080d1a] border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"` |
| 365 | hex | `#080d1a` | `<div className="flex items-center gap-3 p-2.5 my-3 rounded-xl bg-[#080d1a] border border-slate-800 text-left">` |
| 372 | hex | `#080d1a` | `<span className="absolute bottom-0.5 right-0.5 h-2 w-2 rounded-full bg-emerald-400 ring-1 ring-[#080d1a]" />` |
| 404 | hex | `#080d1a` | `style={{ backgroundColor: "#080d1a", color: "#ffffff" }}` |
| 420 | hex | `#080d1a` | `style={{ backgroundColor: "#080d1a", color: "#ffffff" }}` |
| 435 | hex | `#080d1a` | `style={{ backgroundColor: "#080d1a", color: "#ffffff" }}` |
| 482 | hex | `#080d1a` | `<div className="mt-5 rounded-xl bg-[#080d1a] border border-slate-800 p-4 text-left max-w-xs mx-auto space-y-2">` |
| 498 | hex | `#080d1a` | `<div className="mt-4 flex items-center gap-3 p-3 rounded-xl bg-[#080d1a] border border-slate-800 text-left max-w-xs mx-auto">` |
| 516 | hex | `#080d1a` | `className="mt-6 inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-[#080d1a] px-6 py-2.5 text-xs font-semibold text-slate-300 hover:text-white cursor-pointer tran` |

### `src\routes\login.tsx` - 20

| Line | Kind | Value | Context |
|---:|---|---|---|
| 135 | hex | `#FAF8F5` | `<div className="min-h-[calc(100vh-4rem)] bg-[#FAF8F5] py-10 sm:py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">` |
| 145 | hex | `#E8F7F1` | `<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8F7F1] border border-[#005B4F]/20 text-[#005B4F] text-xs font-mono font-bold uppercase tracking-wider"` |
| 145 | hex | `#005B4F` | `<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8F7F1] border border-[#005B4F]/20 text-[#005B4F] text-xs font-mono font-bold uppercase tracking-wider"` |
| 145 | hex | `#005B4F` | `<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8F7F1] border border-[#005B4F]/20 text-[#005B4F] text-xs font-mono font-bold uppercase tracking-wider"` |
| 146 | hex | `#005B4F` | `<ShieldCheck className="h-4 w-4 text-[#005B4F]" />` |
| 150 | hex | `#0B1325` | `<h2 className="font-serif text-3xl font-bold text-[#0B1325] leading-tight">` |
| 160 | hex | `#E8F7F1` | `<div className="h-8 w-8 rounded-lg bg-[#E8F7F1] text-[#005B4F] flex items-center justify-center shrink-0 mt-0.5">` |
| 160 | hex | `#005B4F` | `<div className="h-8 w-8 rounded-lg bg-[#E8F7F1] text-[#005B4F] flex items-center justify-center shrink-0 mt-0.5">` |
| 170 | hex | `#1B3F8B` | `<div className="h-8 w-8 rounded-lg bg-sky-50 text-[#1B3F8B] flex items-center justify-center shrink-0 mt-0.5">` |
| 186 | hex | `#005B4F` | `<p className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#005B4F] mb-1">` |
| 189 | hex | `#0B1325` | `<h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1325]">` |
| 319 | hex | `#005B4F` | `className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-stone-300 bg-white tone-light text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus` |
| 330 | hex | `#005B4F` | `className="text-xs text-[#005B4F] font-medium hover:underline cursor-pointer"` |
| 343 | hex | `#005B4F` | `className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-stone-300 bg-white tone-light text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus` |
| 351 | hex | `#0B1325` | `className="w-full py-3 bg-[#0B1325] hover:bg-[#1B3F8B] text-white rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center ga` |
| 351 | hex | `#1B3F8B` | `className="w-full py-3 bg-[#0B1325] hover:bg-[#1B3F8B] text-white rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center ga` |
| 390 | hex | `#4285F4` | `fill="#4285F4"` |
| 394 | hex | `#34A853` | `fill="#34A853"` |
| 418 | hex | `#005B4F` | `className="font-semibold text-[#005B4F] hover:underline"` |
| 429 | hex | `#005B4F` | `className="font-semibold text-[#005B4F] hover:underline"` |

### `src\routes\placements.tsx` - 20

| Line | Kind | Value | Context |
|---:|---|---|---|
| 38 | hex | `#FAF8F5` | `<div className="min-h-screen bg-[#FAF8F5]">` |
| 52 | hex | `#FAF8F5` | `<div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-8 text-center text-stone-600">` |
| 57 | hex | `#FAF8F5` | `<div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-between">` |
| 60 | hex | `#1B3F8B` | `<ShieldCheck className="mx-auto mb-4 h-10 w-10 text-[#1B3F8B]" aria-hidden="true" />` |
| 61 | hex | `#1A1A1A` | `<h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1A1A]">` |
| 70 | hex | `#1B3F8B` | `<Link to="/why-arzon" className="text-[#1B3F8B] font-bold underline underline-offset-4 hover:text-[#153270]">` |
| 70 | hex | `#153270` | `<Link to="/why-arzon" className="text-[#1B3F8B] font-bold underline underline-offset-4 hover:text-[#153270]">` |
| 102 | hex | `#FAF8F5` | `<div className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] font-sans antialiased">` |
| 102 | hex | `#1A1A1A` | `<div className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] font-sans antialiased">` |
| 111 | hex | `#1A1A1A` | `<h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#1A1A1A]">` |
| 134 | hex | `#1A1A1A` | `<h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">` |
| 154 | hex | `#1B3F8B` | `className="inline-flex items-center gap-2 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] px-5 py-3 text-sm font-bold text-white shadow-xs transition"` |
| 154 | hex | `#153270` | `className="inline-flex items-center gap-2 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] px-5 py-3 text-sm font-bold text-white shadow-xs transition"` |
| 176 | hex | `#FAF8F5` | `<div className="rounded-2xl border border-stone-200 bg-[#FAF8F5] p-6 shadow-2xs">` |
| 177 | hex | `#1B3F8B` | `<div className="font-serif text-4xl sm:text-5xl font-bold text-[#1B3F8B]">` |
| 191 | hex | `#1A1A1A` | `<h2 className="mt-5 font-serif text-2xl font-bold text-[#1A1A1A]">` |
| 222 | hex | `#1A1A1A` | `<h3 className="font-serif font-bold text-base text-[#1A1A1A]">` |
| 252 | hex | `#1A1A1A` | `<td className="px-6 py-4 font-serif font-bold text-[#1A1A1A]">{r.role_title}</td>` |
| 273 | hex | `#1B3F8B` | `<div className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-sky-100 font-mono text-sm font-bold text-[#1B3F8B]">` |
| 277 | hex | `#1A1A1A` | `<div className="font-serif text-base font-bold text-[#1A1A1A]">{title}</div>` |

### `src\routes\resources.$slug.tsx` - 20

| Line | Kind | Value | Context |
|---:|---|---|---|
| 76 | hex | `#FAF9F6` | `<div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans selection:bg-[#1B3F8B] selection:text-white pb-24">` |
| 76 | hex | `#1B3F8B` | `<div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans selection:bg-[#1B3F8B] selection:text-white pb-24">` |
| 82 | hex | `#0B1325` | `className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-stone-700 hover:text-[#0B1325] uppercase tracking-wider"` |
| 86 | hex | `#1B3F8B` | `<span className="font-mono text-[10px] font-bold text-[#1B3F8B] uppercase tracking-widest">` |
| 96 | hex | `#1B3F8B` | `<span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1B3F8B] bg-stone-100 px-2.5 py-1 rounded border border-stone-200">` |
| 107 | hex | `#0B1325` | `<h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#0B1325] leading-tight">` |
| 112 | hex | `#FAF9F6` | `<div className="mt-6 bg-[#FAF9F6] border-l-4 border-[#1B3F8B] p-5 rounded-r border-y border-r border-stone-300">` |
| 112 | hex | `#1B3F8B` | `<div className="mt-6 bg-[#FAF9F6] border-l-4 border-[#1B3F8B] p-5 rounded-r border-y border-r border-stone-300">` |
| 113 | hex | `#1B3F8B` | `<span className="font-mono text-[10px] font-bold text-[#1B3F8B] uppercase tracking-widest block mb-2">` |
| 124 | hex | `#0B1325` | `<strong className="text-[#0B1325]">{report.sampleSize}</strong>` |
| 128 | hex | `#0B1325` | `<strong className="text-[#0B1325]">{report.geography}</strong>` |
| 138 | hex | `#0B1325` | `<h2 className="font-serif text-xl font-bold text-[#0B1325] mb-3">` |
| 146 | hex | `#1B3F8B` | `<span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#1B3F8B] block mb-2">` |
| 160 | hex | `#0B1325` | `<h2 className="font-serif text-2xl font-bold text-[#0B1325]">` |
| 166 | hex | `#0B1325` | `<h3 className="font-serif text-lg font-bold text-[#0B1325] mb-1">` |
| 184 | hex | `#1B3F8B` | `<span className="font-mono font-bold text-[#1B3F8B] shrink-0">` |
| 196 | hex | `#1B3F8B` | `<h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B] mb-2">` |
| 202 | hex | `#FAF9F6` | `<div className="mt-4 bg-[#FAF9F6] p-3 rounded text-[11px] font-mono border border-stone-200 text-stone-600">` |
| 208 | hex | `#0B1325` | `<section className="bg-[#0B1325] text-white rounded-2xl p-8 text-center">` |
| 219 | hex | `#0B1325` | `className="bg-white tone-light hover:bg-stone-100 text-[#0B1325] px-6 py-3 rounded text-xs font-mono font-bold uppercase tracking-wider transition-colors inline-flex items-center g` |

### `src\components\acri\AcriAudiencePanels.tsx` - 19

| Line | Kind | Value | Context |
|---:|---|---|---|
| 15 | hex | `#E8F7F1` | `<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F7F1] border border-[#005B4F]/20 text-[#005B4F] text-[11px] font-mono font-bold uppercase tracking-wide` |
| 15 | hex | `#005B4F` | `<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F7F1] border border-[#005B4F]/20 text-[#005B4F] text-[11px] font-mono font-bold uppercase tracking-wide` |
| 15 | hex | `#005B4F` | `<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F7F1] border border-[#005B4F]/20 text-[#005B4F] text-[11px] font-mono font-bold uppercase tracking-wide` |
| 20 | hex | `#0B1325` | `<h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0B1325] leading-tight">` |
| 22 | hex | `#005B4F` | `<span className="text-[#005B4F]">Job-Ready Talent.</span>` |
| 31 | hex | `#FAF8F5` | `<div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-stone-200/80 space-y-1">` |
| 33 | hex | `#005B4F` | `<UserCheck className="h-4 w-4 text-[#005B4F]" />` |
| 41 | hex | `#FAF8F5` | `<div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-stone-200/80 space-y-1">` |
| 43 | hex | `#005B4F` | `<Award className="h-4 w-4 text-[#005B4F]" />` |
| 51 | hex | `#FAF8F5` | `<div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-stone-200/80 space-y-1">` |
| 53 | hex | `#005B4F` | `<CheckCircle2 className="h-4 w-4 text-[#005B4F]" />` |
| 61 | hex | `#FAF8F5` | `<div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-stone-200/80 space-y-1">` |
| 63 | hex | `#005B4F` | `<Clock className="h-4 w-4 text-[#005B4F]" />` |
| 77 | hex | `#005B4F` | `className="inline-flex items-center gap-2 rounded-xl bg-[#005B4F] hover:bg-[#00473E] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all shadow-sm hove` |
| 77 | hex | `#00473E` | `className="inline-flex items-center gap-2 rounded-xl bg-[#005B4F] hover:bg-[#00473E] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all shadow-sm hove` |
| 85 | hex | `#005B4F` | `className="text-xs font-semibold text-stone-700 hover:text-[#005B4F] underline underline-offset-4"` |
| 94 | hex | `#FAF8F5` | `<div className="card-light rounded-3xl border border-stone-200 bg-[#FAF8F5] p-6 shadow-xl relative overflow-hidden">` |
| 116 | hex | `#0B1325` | `<h3 className="font-serif text-base font-bold text-[#0B1325]">` |
| 149 | hex | `#005B4F` | `<span className="font-mono text-[#005B4F] font-bold">arzoncareers.in/verify</span>` |

### `src\components\career\result\CareerRoadmap.tsx` - 19

| Line | Kind | Value | Context |
|---:|---|---|---|
| 194 | hex | `#E4EAF2` | `<section className="rounded-3xl border border-[#E4EAF2] bg-white tone-light card-light p-6 sm:p-8 shadow-sm">` |
| 196 | hex | `#EEF6FF` | `<div className="grid h-8 w-8 place-items-center rounded-lg bg-[#EEF6FF] text-[#1557D6]">` |
| 196 | hex | `#1557D6` | `<div className="grid h-8 w-8 place-items-center rounded-lg bg-[#EEF6FF] text-[#1557D6]">` |
| 200 | hex | `#1557D6` | `<span className="text-[11px] font-mono uppercase tracking-wider text-[#1557D6] font-bold">` |
| 203 | hex | `#071A4A` | `<h2 className="font-serif text-2xl font-bold text-[#071A4A]">` |
| 209 | hex | `#3F4A60` | `<p className="mt-3 text-sm text-[#3F4A60] leading-relaxed max-w-3xl">` |
| 218 | hex | `#E4EAF2` | `className="flex flex-col justify-between rounded-2xl border border-[#E4EAF2] bg-[#FAFBFD] p-5 text-sm"` |
| 218 | hex | `#FAFBFD` | `className="flex flex-col justify-between rounded-2xl border border-[#E4EAF2] bg-[#FAFBFD] p-5 text-sm"` |
| 221 | hex | `#E4EAF2` | `<div className="flex items-center justify-between pb-3 border-b border-[#E4EAF2]">` |
| 222 | hex | `#1557D6` | `<span className="text-xs font-mono font-bold uppercase text-[#1557D6]">` |
| 225 | hex | `#E4EAF2` | `<span className="h-6 w-6 rounded-full bg-white tone-light border border-[#E4EAF2] grid place-items-center text-xs font-bold text-[#071A4A]">` |
| 225 | hex | `#071A4A` | `<span className="h-6 w-6 rounded-full bg-white tone-light border border-[#E4EAF2] grid place-items-center text-xs font-bold text-[#071A4A]">` |
| 230 | hex | `#071A4A` | `<h3 className="mt-3 text-sm font-bold text-[#071A4A]">` |
| 234 | hex | `#3F4A60` | `<ul className="mt-3 space-y-2 text-xs text-[#3F4A60]">` |
| 248 | hex | `#D0E1FD` | `<div className="mt-6 rounded-2xl border border-[#D0E1FD] bg-[#EEF6FF]/60 p-4 sm:p-5 flex items-start gap-4">` |
| 248 | hex | `#EEF6FF` | `<div className="mt-6 rounded-2xl border border-[#D0E1FD] bg-[#EEF6FF]/60 p-4 sm:p-5 flex items-start gap-4">` |
| 249 | hex | `#1557D6` | `<div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#1557D6] text-white">` |
| 253 | hex | `#1557D6` | `<span className="text-xs font-mono uppercase text-[#1557D6] font-bold block">` |
| 256 | hex | `#071A4A` | `<p className="mt-1 text-sm font-semibold text-[#071A4A]">` |

### `src\components\home\HomeEmployerResearchStrip.tsx` - 19

| Line | Kind | Value | Context |
|---:|---|---|---|
| 6 | hex | `#E11D48` | `<span className="font-extrabold text-base tracking-tighter text-[#E11D48] flex items-center gap-0.5">` |
| 7 | hex | `#1E40AF` | `<span className="text-[#1E40AF]">t</span>` |
| 8 | hex | `#E11D48` | `<span className="text-[#E11D48]">c</span>` |
| 9 | hex | `#0284C7` | `<span className="text-[#0284C7]">s</span>` |
| 16 | hex | `#0284C7` | `<span className="font-sans font-black text-sm tracking-widest text-[#0284C7] uppercase">` |
| 24 | hex | `#0F172A` | `<span className="font-serif font-black text-sm tracking-tight text-[#0F172A]">` |
| 32 | hex | `#071A4A` | `<span className="font-sans font-bold text-sm tracking-tight text-[#071A4A] flex items-center gap-1.5">` |
| 41 | hex | `#9333EA` | `<span className="font-sans font-bold text-xs tracking-wider text-[#9333EA] flex items-center gap-1">` |
| 42 | hex | `#9333EA` | `<span className="h-2 w-2 rounded-full border border-[#9333EA]" />` |
| 50 | hex | `#111827` | `<span className="font-sans font-black text-sm tracking-tight text-[#111827] flex items-center gap-0.5">` |
| 51 | hex | `#9333EA` | `accenture<span className="text-[#9333EA] font-extrabold text-base leading-none">&gt;</span>` |
| 58 | hex | `#0284C7` | `<span className="font-sans font-bold text-xs tracking-wider text-[#0284C7] flex items-center gap-1">` |
| 59 | hex | `#2563EB` | `<span className="text-[10px] text-[#2563EB]">▲</span>` |
| 67 | hex | `#0F172A` | `<span className="font-sans font-extrabold text-sm tracking-tight text-[#0F172A] flex items-center gap-1">` |
| 68 | hex | `#2563EB` | `<span className="h-2 w-2 rounded-sm bg-[#2563EB]" />` |
| 76 | hex | `#E4EAF2` | `<section className="border-b border-[#E4EAF2] bg-[#FAFBFD] py-7 tone-light card-light">` |
| 76 | hex | `#FAFBFD` | `<section className="border-b border-[#E4EAF2] bg-[#FAFBFD] py-7 tone-light card-light">` |
| 79 | hex | `#69758A` | `<div className="font-mono text-[11px] font-bold tracking-wider uppercase text-[#69758A]">` |
| 82 | hex | `#69758A` | `<div className="text-[10.5px] text-[#69758A] italic">` |

### `src\components\landing\CredibilityStrip.tsx` - 19

| Line | Kind | Value | Context |
|---:|---|---|---|
| 100 | hex | `#F8FAFC` | `className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC]"` |
| 100 | hex | `#F1F5F9` | `className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC]"` |
| 100 | hex | `#F8FAFC` | `className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC]"` |
| 106 | hex | `#707C90` | `<p className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[#707C90]">` |
| 109 | hex | `#8A6D1F` | `<div className="h-0.5 w-8 bg-[#8A6D1F]/60 mt-1 rounded-full" />` |
| 111 | hex | `#151C2E` | `<h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#151C2E] tracking-tight leading-tight">` |
| 113 | hex | `#8A6D1F` | `<span className="italic text-[#8A6D1F]">independently verifiable.</span>` |
| 115 | hex | `#5B6472` | `<p className="text-xs sm:text-sm text-[#5B6472] leading-relaxed max-w-xl mx-auto">` |
| 136 | hex | `#1B3F8B` | `<BorderBeam colorFrom="#1B3F8B" colorTo="#8A6D1F" duration={20} delay={0} borderWidth={1} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />` |
| 136 | hex | `#8A6D1F` | `<BorderBeam colorFrom="#1B3F8B" colorTo="#8A6D1F" duration={20} delay={0} borderWidth={1} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />` |
| 139 | hex | `#2563EB` | `<span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 border border-blue-100 text-[#2563EB]">` |
| 142 | hex | `#707C90` | `<ArrowUpRight className="h-4 w-4 text-[#707C90] group-hover:text-[#2563EB] transition-colors" />` |
| 142 | hex | `#2563EB` | `<ArrowUpRight className="h-4 w-4 text-[#707C90] group-hover:text-[#2563EB] transition-colors" />` |
| 146 | hex | `#707C90` | `<p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#707C90]">` |
| 149 | hex | `#151C2E` | `<h3 className="font-serif text-xl font-bold text-[#151C2E] mt-1">` |
| 152 | hex | `#151C2E` | `<NumberTicker value={36} className="font-serif text-xl font-bold text-[#151C2E]" />%` |
| 157 | hex | `#151C2E` | `<NumberTicker value={9000} className="font-serif text-xl font-bold text-[#151C2E]" />+` |
| 163 | hex | `#5B6472` | `<p className="text-xs text-[#5B6472] mt-1 leading-relaxed">{t.sub}</p>` |
| 168 | hex | `#2563EB` | `<p className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#2563EB]">` |

### `src\components\landing\InstitutionalReachWall.tsx` - 19

| Line | Kind | Value | Context |
|---:|---|---|---|
| 104 | hex | `#151C2E` | `className="editorial-page-bg py-14 sm:py-16 border-y border-slate-200 text-[#151C2E] overflow-hidden relative"` |
| 114 | hex | `#151C2E` | `<h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#151C2E] tracking-tight leading-snug">` |
| 118 | hex | `#5B6472` | `<p className="text-xs sm:text-sm text-[#5B6472] leading-relaxed font-medium max-w-2xl mx-auto">` |
| 131 | hex | `#0F172A` | `? "bg-[#0F172A] text-white border-[#0F172A] shadow-md"` |
| 131 | hex | `#0F172A` | `? "bg-[#0F172A] text-white border-[#0F172A] shadow-md"` |
| 132 | hex | `#334155` | `: "bg-white text-[#334155] border-slate-300 hover:border-slate-400"` |
| 144 | hex | `#F8FAFC` | `<div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#F8FAFC] to-transparent z-20 pointer-events-none" />` |
| 145 | hex | `#F8FAFC` | `<div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#F8FAFC] to-transparent z-20 pointer-events-none" />` |
| 155 | hex | `#1D4ED8` | `<GraduationCap className="h-3.5 w-3.5 text-[#1D4ED8] shrink-0" />` |
| 156 | hex | `#151C2E` | `<span className="font-sans text-xs font-bold text-[#151C2E] whitespace-nowrap">` |
| 177 | hex | `#1D4ED8` | `<GraduationCap className="h-3.5 w-3.5 text-[#1D4ED8] shrink-0" />` |
| 178 | hex | `#151C2E` | `<span className="font-sans text-xs font-bold text-[#151C2E] whitespace-nowrap">` |
| 200 | hex | `#1D4ED8` | `<GraduationCap className="h-3.5 w-3.5 text-[#1D4ED8] shrink-0" />` |
| 201 | hex | `#151C2E` | `<span className="font-sans text-xs font-bold text-[#151C2E] whitespace-nowrap">` |
| 222 | hex | `#1D4ED8` | `<GraduationCap className="h-3.5 w-3.5 text-[#1D4ED8] shrink-0" />` |
| 223 | hex | `#151C2E` | `<span className="font-sans text-xs font-bold text-[#151C2E] whitespace-nowrap">` |
| 248 | hex | `#64748B` | `<span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#64748B]">` |
| 249 | hex | `#2563EB` | `<Building2 className="h-3 w-3 text-[#2563EB]" />` |
| 258 | hex | `#0F172A` | `<h4 className="font-serif text-sm font-bold text-[#0F172A] leading-snug">` |

### `src\routes\contact.tsx` - 19

| Line | Kind | Value | Context |
|---:|---|---|---|
| 73 | hex | `#FAF8F5` | `<div className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] tone-light font-sans antialiased">` |
| 73 | hex | `#1A1A1A` | `<div className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] tone-light font-sans antialiased">` |
| 81 | hex | `#1A1A1A` | `<h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#1A1A1A] leading-tight">` |
| 104 | hex | `#1A1A1A` | `<p className="mt-4 font-serif text-lg font-bold text-[#1A1A1A]">WhatsApp</p>` |
| 112 | hex | `#1B3F8B` | `className="group block rounded-2xl border border-stone-200 bg-white p-5 shadow-xs transition-all hover:border-[#1B3F8B]/40 hover:shadow-md"` |
| 114 | hex | `#1B3F8B` | `<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-[#1B3F8B]">` |
| 117 | hex | `#1A1A1A` | `<p className="mt-4 font-serif text-lg font-bold text-[#1A1A1A]">Email</p>` |
| 125 | hex | `#1B3F8B` | `className="group block rounded-2xl border border-stone-200 bg-white p-5 shadow-xs transition-all hover:border-[#1B3F8B]/40 hover:shadow-md"` |
| 127 | hex | `#1B3F8B` | `<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-[#1B3F8B]">` |
| 130 | hex | `#1A1A1A` | `<p className="mt-4 font-serif text-lg font-bold text-[#1A1A1A]">Call</p>` |
| 140 | hex | `#1A1A1A` | `<p className="mt-4 font-serif text-lg font-bold text-[#1A1A1A]">Visit</p>` |
| 152 | hex | `#1B3F8B` | `className="mt-3 inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#1B3F8B] hover:underline"` |
| 167 | hex | `#1A1A1A` | `<h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mt-2">Send us a callback request</h2>` |
| 191 | hex | `#1B3F8B` | `className="inline-flex h-11 items-center rounded-xl bg-[#1B3F8B] hover:bg-[#153270] px-5 text-sm font-bold text-white shadow-xs"` |
| 191 | hex | `#153270` | `className="inline-flex h-11 items-center rounded-xl bg-[#1B3F8B] hover:bg-[#153270] px-5 text-sm font-bold text-white shadow-xs"` |
| 206 | hex | `#1B3F8B` | `className="h-11 w-full rounded-xl border border-stone-300 bg-stone-50/50 px-3.5 text-sm font-medium text-stone-900 outline-none transition focus:bg-white focus:ring-2 focus:ring-[#` |
| 217 | hex | `#1B3F8B` | `className="h-11 w-full rounded-xl border border-stone-300 bg-stone-50/50 px-3.5 text-sm font-medium text-stone-900 outline-none transition focus:bg-white focus:ring-2 focus:ring-[#` |
| 227 | hex | `#1B3F8B` | `className="h-11 w-full rounded-xl border border-stone-300 bg-stone-50/50 px-3 text-sm font-medium text-stone-900 outline-none transition focus:bg-white focus:ring-2 focus:ring-[#1B` |
| 244 | hex | `#1B3F8B` | `className="h-24 w-full resize-none rounded-xl border border-stone-300 bg-stone-50/50 p-3 text-sm leading-relaxed text-stone-900 outline-none transition focus:bg-white focus:ring-2 ` |

### `src\components\career\result\CompetencyGapCard.tsx` - 18

| Line | Kind | Value | Context |
|---:|---|---|---|
| 30 | hex | `#E4EAF2` | `<section className="rounded-3xl border border-[#E4EAF2] bg-white tone-light card-light p-6 sm:p-8 shadow-sm space-y-6">` |
| 32 | hex | `#E4EAF2` | `<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E4EAF2] pb-5">` |
| 35 | hex | `#1557D6` | `<span className="text-[11px] font-mono uppercase tracking-wider text-[#1557D6] font-bold">` |
| 39 | hex | `#071A4A` | `<h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#071A4A] mt-1">` |
| 45 | hex | `#3F4A60` | `<p className="text-sm text-[#3F4A60] leading-relaxed">` |
| 46 | hex | `#071A4A` | `Your diagnostic results separate your inherent working style from your current technical domain exposure. The gap analysis below highlights the specific operational competencies re` |
| 46 | hex | `#071A4A` | `Your diagnostic results separate your inherent working style from your current technical domain exposure. The gap analysis below highlights the specific operational competencies re` |
| 50 | hex | `#E4EAF2` | `<div className="rounded-2xl border border-[#E4EAF2] bg-[#FAFBFD] p-4 sm:p-5">` |
| 50 | hex | `#FAFBFD` | `<div className="rounded-2xl border border-[#E4EAF2] bg-[#FAFBFD] p-4 sm:p-5">` |
| 52 | hex | `#1557D6` | `<Compass className="h-4 w-4 text-[#1557D6]" />` |
| 53 | hex | `#071A4A` | `<span className="text-xs font-bold uppercase tracking-wider text-[#071A4A]">` |
| 68 | hex | `#1557D6` | `? "border-[#1557D6] bg-white ring-1 ring-[#1557D6] shadow-xs"` |
| 68 | hex | `#1557D6` | `? "border-[#1557D6] bg-white ring-1 ring-[#1557D6] shadow-xs"` |
| 69 | hex | `#E4EAF2` | `: "border-[#E4EAF2] bg-white hover:border-[#D0E1FD]"` |
| 69 | hex | `#D0E1FD` | `: "border-[#E4EAF2] bg-white hover:border-[#D0E1FD]"` |
| 73 | hex | `#071A4A` | `<span className="text-xs font-bold text-[#071A4A]">{goal.label}</span>` |
| 74 | hex | `#1557D6` | `{active && <span className="h-2 w-2 rounded-full bg-[#1557D6]" />}` |
| 76 | hex | `#69758A` | `<span className="text-[11px] text-[#69758A] mt-1 leading-snug">{goal.focus}</span>` |

### `src\components\landing\ApplicationForm.tsx` - 18

| Line | Kind | Value | Context |
|---:|---|---|---|
| 13 | hex | `#FFFFFF` | `* Design: White background (#FFFFFF). Embedded official Google Form` |
| 23 | hex | `#1A1A1A` | `className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white tone-light text-[#1A1A1A] border-b border-stone-200 overflow-hidden"` |
| 35 | hex | `#1A1A1A` | `className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#1A1A1A] tracking-tight leading-[1.18]"` |
| 38 | hex | `#1B3F8B` | `<span className="italic text-[#1B3F8B]">Free. No payment. No catch.</span>` |
| 60 | hex | `#1B3F8B` | `background="#1B3F8B"` |
| 70 | hex | `#FAF8F5` | `<div className="rounded-2xl border border-stone-300 bg-[#FAF8F5] tone-light p-3 sm:p-6 shadow-md space-y-4">` |
| 71 | hex | `#1B3F8B` | `<div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#1B3F8B] p-4 rounded-xl shadow-xs">` |
| 80 | hex | `#1B3F8B` | `className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-extrabold font-sans bg-white hover:bg-slate-100 text-slate-900 border border-white shad` |
| 81 | hex | `#0F172A` | `style={{ color: "#0F172A", backgroundColor: "#FFFFFF", WebkitTextFillColor: "#0F172A" }}` |
| 81 | hex | `#0F172A` | `style={{ color: "#0F172A", backgroundColor: "#FFFFFF", WebkitTextFillColor: "#0F172A" }}` |
| 83 | hex | `#0F172A` | `<span className="font-extrabold text-slate-900" style={{ color: "#0F172A", WebkitTextFillColor: "#0F172A", fontWeight: 800 }}>Open in New Window</span>` |
| 83 | hex | `#0F172A` | `<span className="font-extrabold text-slate-900" style={{ color: "#0F172A", WebkitTextFillColor: "#0F172A", fontWeight: 800 }}>Open in New Window</span>` |
| 84 | hex | `#0F172A` | `<ExternalLink className="h-3.5 w-3.5 shrink-0 text-slate-900" style={{ color: "#0F172A" }} />` |
| 90 | hex | `#FAF8F5` | `<div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#FAF8F5] p-6 text-center space-y-3">` |
| 99 | hex | `#1B3F8B` | `className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#1B3F8B] rounded-lg shadow-xs"` |
| 118 | hex | `#F7F5F0` | `<div className="rounded-2xl border border-stone-300 bg-[#F7F5F0] tone-light p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto shadow-xs">` |
| 120 | hex | `#1A1A1A` | `<h4 className="font-serif text-lg sm:text-xl font-bold text-[#1A1A1A]">` |
| 133 | hex | `#1B3F8B` | `className="shrink-0 h-12 px-6 flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-stone-800 bg-white hover:bg-stone-100 border border-stone-300 rounded-xl tran` |

### `src\components\landing\SkillGapDiagnostic.tsx` - 18

| Line | Kind | Value | Context |
|---:|---|---|---|
| 58 | hex | `#F8FAFC` | `className="py-12 sm:py-16 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC] tone-light text-[#1A1A1A] relative overflow-hidden"` |
| 58 | hex | `#F1F5F9` | `className="py-12 sm:py-16 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC] tone-light text-[#1A1A1A] relative overflow-hidden"` |
| 58 | hex | `#F8FAFC` | `className="py-12 sm:py-16 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC] tone-light text-[#1A1A1A] relative overflow-hidden"` |
| 58 | hex | `#1A1A1A` | `className="py-12 sm:py-16 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC] tone-light text-[#1A1A1A] relative overflow-hidden"` |
| 63 | hex | `#1B3F8B` | `<div className="inline-flex items-center gap-2 rounded-full border border-sky-300 bg-sky-50 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-[#1B3F8B] shadow-` |
| 64 | hex | `#1B3F8B` | `<Sparkles className="h-3.5 w-3.5 text-[#1B3F8B]" />` |
| 68 | hex | `#1A1A1A` | `<h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1A1A1A] leading-tight">` |
| 70 | hex | `#8A6D1F` | `<span className="italic font-normal text-[#8A6D1F]">` |
| 99 | hex | `#1B3F8B` | `? "bg-sky-50/80 border-[#1B3F8B] text-[#1A1A1A] shadow-2xs"` |
| 99 | hex | `#1A1A1A` | `? "bg-sky-50/80 border-[#1B3F8B] text-[#1A1A1A] shadow-2xs"` |
| 105 | hex | `#1B3F8B` | `<CheckSquare className="h-5 w-5 text-[#1B3F8B] shrink-0" />` |
| 110 | hex | `#1A1A1A` | `<span className="font-sans font-bold text-xs sm:text-sm text-[#1A1A1A] block">` |
| 130 | hex | `#1B3F8B` | `<div className="font-mono font-black text-5xl text-[#1B3F8B]">{matchPercentage}%</div>` |
| 139 | hex | `#1B3F8B` | `className="h-full bg-[#1B3F8B] rounded-full transition-all duration-500"` |
| 145 | hex | `#8A6D1F` | `<span className="font-mono text-[11px] font-bold text-[#8A6D1F] uppercase block">` |
| 161 | hex | `#1B3F8B` | `style={{ color: "#FFFFFF", backgroundColor: "#1B3F8B" }}` |
| 162 | hex | `#1B3F8B` | `className="h-12 w-full inline-flex items-center justify-center gap-2 text-sm font-extrabold text-slate-50 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] shadow-md transition-all cursor` |
| 162 | hex | `#153270` | `className="h-12 w-full inline-flex items-center justify-center gap-2 text-sm font-extrabold text-slate-50 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] shadow-md transition-all cursor` |

### `src\routes\acri.methodology.tsx` - 18

| Line | Kind | Value | Context |
|---:|---|---|---|
| 45 | hex | `#FAF9F6` | `<div className="min-h-screen bg-[#FAF9F6] text-[#0B1325] font-sans antialiased selection:bg-[#E8F7F1]">` |
| 45 | hex | `#0B1325` | `<div className="min-h-screen bg-[#FAF9F6] text-[#0B1325] font-sans antialiased selection:bg-[#E8F7F1]">` |
| 45 | hex | `#E8F7F1` | `<div className="min-h-screen bg-[#FAF9F6] text-[#0B1325] font-sans antialiased selection:bg-[#E8F7F1]">` |
| 49 | hex | `#E8F7F1` | `<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F7F1] text-[#005B4F] text-xs font-mono font-bold">` |
| 49 | hex | `#005B4F` | `<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F7F1] text-[#005B4F] text-xs font-mono font-bold">` |
| 65 | hex | `#0B1325` | `className="px-6 py-3 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 transition-all shadow` |
| 65 | hex | `#1B3F8B` | `className="px-6 py-3 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 transition-all shadow` |
| 87 | hex | `#1B3F8B` | `<span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">` |
| 100 | hex | `#1B3F8B` | `<span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">` |
| 116 | hex | `#1B3F8B` | `<span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">` |
| 132 | hex | `#1B3F8B` | `<span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">` |
| 148 | hex | `#1B3F8B` | `<span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">` |
| 164 | hex | `#1B3F8B` | `<span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">` |
| 180 | hex | `#1B3F8B` | `<span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">` |
| 190 | hex | `#005B4F` | `<span className="font-mono text-xs font-bold text-[#005B4F] shrink-0 mt-0.5">ICH E2A / E2B(R3)</span>` |
| 197 | hex | `#005B4F` | `<span className="font-mono text-xs font-bold text-[#005B4F] shrink-0 mt-0.5">MedDRA v27.0</span>` |
| 204 | hex | `#005B4F` | `<span className="font-mono text-xs font-bold text-[#005B4F] shrink-0 mt-0.5">WHO-UMC Causality</span>` |
| 213 | hex | `#0B1325` | `<section className="rounded-3xl bg-[#0B1325] text-white p-8 sm:p-12 text-center space-y-4">` |

### `src\routes\blog.index.tsx` - 18

| Line | Kind | Value | Context |
|---:|---|---|---|
| 54 | hex | `#FAF9F6` | `<div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans selection:bg-[#1B3F8B] selection:text-white pb-24">` |
| 54 | hex | `#1B3F8B` | `<div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans selection:bg-[#1B3F8B] selection:text-white pb-24">` |
| 60 | hex | `#1B3F8B` | `<span className="font-mono text-[10px] font-bold tracking-widest text-[#1B3F8B] uppercase">` |
| 81 | hex | `#FAF9F6` | `className="w-full pl-10 pr-4 py-2.5 bg-[#FAF9F6] border border-stone-300 rounded-none text-xs font-sans text-stone-900 placeholder:text-stone-500 focus:outline-none focus:border-[#` |
| 81 | hex | `#1B3F8B` | `className="w-full pl-10 pr-4 py-2.5 bg-[#FAF9F6] border border-stone-300 rounded-none text-xs font-sans text-stone-900 placeholder:text-stone-500 focus:outline-none focus:border-[#` |
| 92 | hex | `#0B1325` | `? "bg-[#0B1325] text-white border-[#0B1325]"` |
| 92 | hex | `#0B1325` | `? "bg-[#0B1325] text-white border-[#0B1325]"` |
| 110 | hex | `#1B3F8B` | `<Sparkles className="w-3.5 h-3.5 text-[#1B3F8B]" />` |
| 114 | hex | `#1B3F8B` | `<div className="bg-white tone-light card-light border border-stone-300 grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-xs hover:border-[#1B3F8B] transition-colors">` |
| 131 | hex | `#1B3F8B` | `<h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 group-hover:text-[#1B3F8B] transition-colors leading-snug">` |
| 158 | hex | `#0B1325` | `className="inline-flex items-center gap-2 bg-[#0B1325] text-white hover:bg-[#1B3F8B] px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-colors"` |
| 158 | hex | `#1B3F8B` | `className="inline-flex items-center gap-2 bg-[#0B1325] text-white hover:bg-[#1B3F8B] px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-colors"` |
| 183 | hex | `#1B3F8B` | `<BookOpen className="w-4 h-4 text-[#1B3F8B]" />` |
| 210 | hex | `#1B3F8B` | `className="bg-white tone-light card-light border border-stone-300 p-6 flex flex-col justify-between hover:border-[#1B3F8B] transition-colors shadow-xs"` |
| 214 | hex | `#1B3F8B` | `<span className="font-mono text-[10px] font-bold text-[#1B3F8B] uppercase tracking-wider border border-stone-200 bg-stone-50 px-2 py-0.5">` |
| 227 | hex | `#1B3F8B` | `<h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-[#1B3F8B] transition-colors leading-snug line-clamp-2">` |
| 252 | hex | `#1B3F8B` | `className="font-mono text-xs font-bold text-stone-900 hover:text-[#1B3F8B] uppercase tracking-wider flex items-center gap-1"` |
| 267 | hex | `#0B1325` | `<section className="mt-12 bg-[#0B1325] text-white p-8 sm:p-12 border border-stone-900 flex flex-col md:flex-row items-center justify-between gap-8">` |

### `src\components\acri\AcriResultRoadmap.tsx` - 17

| Line | Kind | Value | Context |
|---:|---|---|---|
| 10 | hex | `#FAF8F5` | `<section className="bg-[#FAF8F5] py-16 lg:py-24 border-b border-stone-200/80">` |
| 19 | hex | `#0B1325` | `<h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#0B1325] mt-1 mb-2">` |
| 27 | hex | `#FAF8F5` | `<div className="mt-6 rounded-2xl border border-stone-150 bg-[#FAF8F5] p-4 flex flex-wrap items-center justify-between gap-4">` |
| 37 | hex | `#0B1325` | `<h3 className="font-sans text-sm font-bold text-[#0B1325]">Hey, Ananya</h3>` |
| 61 | hex | `#10B981` | `stroke="#10B981"` |
| 70 | hex | `#0B1325` | `<span className="font-sans text-xs font-black text-[#0B1325]">82</span>` |
| 128 | hex | `#0B1325` | `className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B1325] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#152342]` |
| 128 | hex | `#152342` | `className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B1325] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#152342]` |
| 144 | hex | `#0B1325` | `<h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#0B1325] mt-1 mb-2">` |
| 153 | hex | `#FAF8F5` | `<div className="flex items-start gap-3.5 p-3.5 rounded-xl border border-stone-150 bg-[#FAF8F5]">` |
| 161 | hex | `#0B1325` | `<h3 className="font-sans text-sm font-bold text-[#0B1325]">` |
| 170 | hex | `#FAF8F5` | `<div className="flex items-start gap-3.5 p-3.5 rounded-xl border border-stone-150 bg-[#FAF8F5]">` |
| 178 | hex | `#0B1325` | `<h3 className="font-sans text-sm font-bold text-[#0B1325]">` |
| 187 | hex | `#FAF8F5` | `<div className="flex items-start gap-3.5 p-3.5 rounded-xl border border-stone-150 bg-[#FAF8F5]">` |
| 195 | hex | `#0B1325` | `<h3 className="font-sans text-sm font-bold text-[#0B1325]">` |
| 210 | hex | `#0B1325` | `className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B1325] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#152342]` |
| 210 | hex | `#152342` | `className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B1325] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#152342]` |

### `src\components\career\result\CareerCertificate\CertificatePreview.tsx` - 17

| Line | Kind | Value | Context |
|---:|---|---|---|
| 23 | hex | `#D7E2F0` | `className="relative w-[840px] max-w-[840px] mx-auto overflow-hidden rounded-2xl border border-[#D7E2F0] bg-white p-8 sm:p-10 font-sans text-[#0A1128] shadow-xl"` |
| 23 | hex | `#0A1128` | `className="relative w-[840px] max-w-[840px] mx-auto overflow-hidden rounded-2xl border border-[#D7E2F0] bg-white p-8 sm:p-10 font-sans text-[#0A1128] shadow-xl"` |
| 25 | hex | `#EEF6FF` | `<div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#EEF6FF]" />` |
| 26 | hex | `#F7F9FC` | `<div className="pointer-events-none absolute -left-24 -bottom-28 h-64 w-64 rounded-full bg-[#F7F9FC]" />` |
| 30 | hex | `#071A4A` | `<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#071A4A] p-2">` |
| 34 | hex | `#1557D6` | `<p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#1557D6]">` |
| 40 | hex | `#D0E1FD` | `<span className="inline-flex items-center gap-1.5 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wide text-[#1557D` |
| 40 | hex | `#EEF6FF` | `<span className="inline-flex items-center gap-1.5 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wide text-[#1557D` |
| 40 | hex | `#1557D6` | `<span className="inline-flex items-center gap-1.5 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wide text-[#1557D` |
| 47 | hex | `#071A4A` | `<h2 className="font-serif text-3xl font-bold tracking-tight text-[#071A4A]">` |
| 54 | hex | `#FAFBFD` | `<div className="mx-auto mt-7 max-w-2xl rounded-2xl border border-slate-200 bg-[#FAFBFD] px-6 py-5">` |
| 58 | hex | `#071A4A` | `<h3 className="mt-2 font-serif text-3xl font-bold text-[#071A4A]">` |
| 68 | hex | `#D0E1FD` | `<div className="rounded-2xl border border-[#D0E1FD] bg-[#EEF6FF]/70 p-5">` |
| 68 | hex | `#EEF6FF` | `<div className="rounded-2xl border border-[#D0E1FD] bg-[#EEF6FF]/70 p-5">` |
| 69 | hex | `#1557D6` | `<p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1557D6]">` |
| 72 | hex | `#071A4A` | `<p className="mt-2 font-serif text-xl font-bold text-[#071A4A]">{data.archetypeName}</p>` |
| 78 | hex | `#071A4A` | `<p className="mt-1 font-serif text-4xl font-bold text-[#071A4A]">{data.fitScore}%</p>` |

### `src\components\landing\EdtechLies.tsx` - 17

| Line | Kind | Value | Context |
|---:|---|---|---|
| 65 | hex | `#c2654a` | `<div className="mt-5 rounded-xl border border-[#c2654a]/25 bg-[#fdf2ee] p-4">` |
| 65 | hex | `#fdf2ee` | `<div className="mt-5 rounded-xl border border-[#c2654a]/25 bg-[#fdf2ee] p-4">` |
| 67 | hex | `#c2654a` | `<span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#c2654a]/15 ring-1 ring-[#c2654a]/30">` |
| 67 | hex | `#c2654a` | `<span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#c2654a]/15 ring-1 ring-[#c2654a]/30">` |
| 68 | hex | `#9b4423` | `<X className="h-3.5 w-3.5 text-[#9b4423]" strokeWidth={3} />` |
| 70 | hex | `#9b4423` | `<span className="font-mono text-micro font-bold uppercase tracking-[0.22em] text-[#9b4423]">` |
| 74 | hex | `#5c2018` | `<p className="mt-2 text-caption leading-relaxed text-[#5c2018]/85">{l.lie}</p>` |
| 78 | hex | `#0d7a5f` | `<div className="mt-3 rounded-xl border border-[#0d7a5f]/25 bg-[#ecf6f1] p-4">` |
| 78 | hex | `#ecf6f1` | `<div className="mt-3 rounded-xl border border-[#0d7a5f]/25 bg-[#ecf6f1] p-4">` |
| 80 | hex | `#0d7a5f` | `<span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#0d7a5f]/15 ring-1 ring-[#0d7a5f]/30">` |
| 80 | hex | `#0d7a5f` | `<span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#0d7a5f]/15 ring-1 ring-[#0d7a5f]/30">` |
| 81 | hex | `#0d7a5f` | `<Check className="h-3.5 w-3.5 text-[#0d7a5f]" strokeWidth={3} />` |
| 83 | hex | `#0d7a5f` | `<span className="font-mono text-micro font-bold uppercase tracking-[0.22em] text-[#0d7a5f]">` |
| 90 | hex | `#1e3a5f` | `<p className="mt-4 flex items-start gap-1.5 text-micro text-[#1e3a5f]/60">` |
| 99 | hex | `#1e3a5f` | `<p className="mx-auto mt-8 flex max-w-3xl items-center justify-center gap-2 rounded-full bg-primary/[0.04] px-4 py-2 text-center text-meta text-[#1e3a5f]/80 ring-1 ring-[#0f1b3d]/1` |
| 99 | hex | `#0f1b3d` | `<p className="mx-auto mt-8 flex max-w-3xl items-center justify-center gap-2 rounded-full bg-primary/[0.04] px-4 py-2 text-center text-meta text-[#1e3a5f]/80 ring-1 ring-[#0f1b3d]/1` |
| 100 | hex | `#9b4423` | `<AlertTriangle className="h-3.5 w-3.5 text-[#9b4423]" />` |

### `src\design-system\tokens\motion.css` - 17

| Line | Kind | Value | Context |
|---:|---|---|---|
| 37 | rgba | `rgba(11,19,37,0.05)` | `--shadow-xs:  0 1px 2px rgba(11,19,37,0.05);` |
| 38 | rgba | `rgba(11,19,37,0.08)` | `--shadow-sm:  0 1px 4px rgba(11,19,37,0.08), 0 1px 2px rgba(11,19,37,0.04);` |
| 38 | rgba | `rgba(11,19,37,0.04)` | `--shadow-sm:  0 1px 4px rgba(11,19,37,0.08), 0 1px 2px rgba(11,19,37,0.04);` |
| 39 | rgba | `rgba(11,19,37,0.10)` | `--shadow-md:  0 4px 12px rgba(11,19,37,0.10), 0 2px 4px rgba(11,19,37,0.06);` |
| 39 | rgba | `rgba(11,19,37,0.06)` | `--shadow-md:  0 4px 12px rgba(11,19,37,0.10), 0 2px 4px rgba(11,19,37,0.06);` |
| 40 | rgba | `rgba(11,19,37,0.12)` | `--shadow-lg:  0 8px 24px rgba(11,19,37,0.12), 0 4px 8px rgba(11,19,37,0.06);` |
| 40 | rgba | `rgba(11,19,37,0.06)` | `--shadow-lg:  0 8px 24px rgba(11,19,37,0.12), 0 4px 8px rgba(11,19,37,0.06);` |
| 41 | rgba | `rgba(11,19,37,0.14)` | `--shadow-xl:  0 16px 40px rgba(11,19,37,0.14);` |
| 42 | rgba | `rgba(11,19,37,0.06)` | `--shadow-card: 0 1px 3px rgba(11,19,37,0.06), 0 4px 16px rgba(11,19,37,0.06);` |
| 42 | rgba | `rgba(11,19,37,0.06)` | `--shadow-card: 0 1px 3px rgba(11,19,37,0.06), 0 4px 16px rgba(11,19,37,0.06);` |
| 43 | rgba | `rgba(0,0,0,0.3)` | `--shadow-assessment-sidebar: 4px 0 16px rgba(0,0,0,0.3);` |
| 44 | rgba | `rgba(22,163,74,0.15)` | `--shadow-score-ring: 0 0 0 4px rgba(22,163,74,0.15);` |
| 45 | rgba | `rgba(11,19,37,0.18)` | `--shadow-cert: 0 8px 40px rgba(11,19,37,0.18), 0 2px 8px rgba(11,19,37,0.08);` |
| 45 | rgba | `rgba(11,19,37,0.08)` | `--shadow-cert: 0 8px 40px rgba(11,19,37,0.18), 0 2px 8px rgba(11,19,37,0.08);` |
| 112 | rgba | `rgba(22,163,74,0.25)` | `0%   { box-shadow: 0 0 0 0 rgba(22,163,74,0.25); }` |
| 113 | rgba | `rgba(22,163,74,0)` | `70%  { box-shadow: 0 0 0 10px rgba(22,163,74,0); }` |
| 114 | rgba | `rgba(22,163,74,0)` | `100% { box-shadow: 0 0 0 0 rgba(22,163,74,0); }` |

### `src\routes\about.tsx` - 17

| Line | Kind | Value | Context |
|---:|---|---|---|
| 56 | hex | `#FAF8F5` | `<div className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] tone-light font-sans antialiased">` |
| 56 | hex | `#1A1A1A` | `<div className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] tone-light font-sans antialiased">` |
| 64 | hex | `#1A1A1A` | `<h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#1A1A1A] leading-tight">` |
| 110 | hex | `#1A1A1A` | `<h2 className="font-serif text-3xl font-bold text-[#1A1A1A] mt-16">Leadership & Vision</h2>` |
| 123 | hex | `#1B3F8B` | `<span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-[#1B3F8B] font-bold">` |
| 127 | hex | `#1A1A1A` | `<h3 className="font-serif text-lg font-bold text-[#1A1A1A]">Manideep</h3>` |
| 128 | hex | `#1B3F8B` | `<p className="text-xs font-mono text-[#1B3F8B] font-bold uppercase tracking-wider">Co-Founder &amp; CEO</p>` |
| 143 | hex | `#8A6D1F` | `<span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-[#8A6D1F] font-bold">` |
| 147 | hex | `#1A1A1A` | `<h3 className="font-serif text-lg font-bold text-[#1A1A1A]">Shashank</h3>` |
| 148 | hex | `#8A6D1F` | `<p className="text-xs font-mono text-[#8A6D1F] font-bold uppercase tracking-wider">Co-Founder &amp; CSO</p>` |
| 163 | hex | `#1A1A1A` | `<h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">The ASSAY Verification Engine</h2>` |
| 166 | hex | `#1B3F8B` | `At the heart of Arzon Global is <strong className="text-[#1B3F8B]">ASSAY (Arzon Science and Skill Assessment for Industry Readiness)</strong>, our proprietary evaluation instrument` |
| 177 | hex | `#1A1A1A` | `<h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">Why we exist</h2>` |
| 199 | hex | `#1A1A1A` | `<h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">What we don't do</h2>` |
| 213 | hex | `#1B3F8B` | `className="inline-flex h-12 items-center rounded-xl bg-[#1B3F8B] hover:bg-[#153270] px-6 text-sm font-bold text-white shadow-md transition-all"` |
| 213 | hex | `#153270` | `className="inline-flex h-12 items-center rounded-xl bg-[#1B3F8B] hover:bg-[#153270] px-6 text-sm font-bold text-white shadow-md transition-all"` |
| 243 | hex | `#1A1A1A` | `<p className="mt-4 font-serif text-lg font-bold tracking-tight text-[#1A1A1A]">{title}</p>` |

### `src\components\career\result\CapabilityScorecard.tsx` - 16

| Line | Kind | Value | Context |
|---:|---|---|---|
| 59 | hex | `#E4EAF2` | `<section className="rounded-3xl border border-[#E4EAF2] bg-white tone-light card-light p-6 sm:p-8 shadow-sm">` |
| 60 | hex | `#E4EAF2` | `<div className="flex items-center justify-between border-b border-[#E4EAF2] pb-5">` |
| 62 | hex | `#EEF6FF` | `<div className="grid h-8 w-8 place-items-center rounded-lg bg-[#EEF6FF] text-[#1557D6]">` |
| 62 | hex | `#1557D6` | `<div className="grid h-8 w-8 place-items-center rounded-lg bg-[#EEF6FF] text-[#1557D6]">` |
| 66 | hex | `#1557D6` | `<span className="text-[11px] font-mono uppercase tracking-wider text-[#1557D6] font-bold">` |
| 69 | hex | `#071A4A` | `<h2 className="font-serif text-2xl font-bold text-[#071A4A]">` |
| 75 | hex | `#FAFBFD` | `<span className="hidden sm:inline-block rounded-full bg-[#FAFBFD] border border-[#E4EAF2] px-3 py-1 text-xs font-mono text-[#69758A]">` |
| 75 | hex | `#E4EAF2` | `<span className="hidden sm:inline-block rounded-full bg-[#FAFBFD] border border-[#E4EAF2] px-3 py-1 text-xs font-mono text-[#69758A]">` |
| 75 | hex | `#69758A` | `<span className="hidden sm:inline-block rounded-full bg-[#FAFBFD] border border-[#E4EAF2] px-3 py-1 text-xs font-mono text-[#69758A]">` |
| 80 | hex | `#3F4A60` | `<p className="mt-4 text-sm text-[#3F4A60] leading-relaxed max-w-2xl">` |
| 90 | hex | `#071A4A` | `<span className="text-sm font-bold text-[#071A4A] block">` |
| 93 | hex | `#69758A` | `<span className="text-xs text-[#69758A] block mt-0.5">` |
| 98 | hex | `#071A4A` | `<span className="font-mono text-base font-bold text-[#071A4A]">` |
| 101 | hex | `#1557D6` | `<span className="block text-[10px] font-mono uppercase text-[#1557D6]">` |
| 108 | hex | `#EEF6FF` | `<div className="h-2.5 w-full overflow-hidden rounded-full bg-[#EEF6FF]">` |
| 110 | hex | `#1557D6` | `className="h-full rounded-full bg-[#1557D6] transition-all duration-1000 ease-out"` |

### `src\components\landing\ArzonMethod.tsx` - 16

| Line | Kind | Value | Context |
|---:|---|---|---|
| 13 | hex | `#1B3F8B` | `color: "text-[#1B3F8B]",` |
| 15 | hex | `#1B3F8B` | `dot: "bg-[#1B3F8B]",` |
| 61 | hex | `#8A6D1F` | `color: "text-[#8A6D1F]",` |
| 97 | hex | `#1A1A1A` | `<section id="how-it-works" className="py-12 sm:py-16 bg-white tone-light text-[#1A1A1A] border-b border-stone-200">` |
| 102 | hex | `#1B3F8B` | `<div className="inline-flex items-center gap-2 rounded-full border border-[#1B3F8B]/20 bg-sky-50 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-[#1B3F8B] sh` |
| 102 | hex | `#1B3F8B` | `<div className="inline-flex items-center gap-2 rounded-full border border-[#1B3F8B]/20 bg-sky-50 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-[#1B3F8B] sh` |
| 105 | hex | `#1A1A1A` | `<h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1A1A1A] leading-tight">` |
| 108 | hex | `#8A6D1F` | `<span className="italic font-normal text-[#8A6D1F]">to career-ready.</span>` |
| 132 | hex | `#1B3F8B` | `? `bg-stone-50 border-[#1B3F8B] shadow-sm`` |
| 145 | hex | `#1A1A1A` | `<div className={`font-serif font-bold text-xs sm:text-sm mt-0.5 ${isActive ? "text-[#1A1A1A]" : "text-stone-500"}`}>` |
| 164 | hex | `#1A1A1A` | `<h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#1A1A1A] mt-1">` |
| 178 | hex | `#1A1A1A` | `<span className="font-sans font-bold text-sm text-[#1A1A1A] mt-0.5 block">{active.deliverable}</span>` |
| 190 | hex | `#1B3F8B` | `s.id === activeId ? `bg-[#1B3F8B]` : "bg-stone-200 hover:bg-stone-300"` |
| 211 | hex | `#1B3F8B` | `style={{ color: "#FFFFFF", backgroundColor: "#1B3F8B" }}` |
| 212 | hex | `#1B3F8B` | `className={`${activeId !== STAGES[STAGES.length - 1].id ? "flex-1" : "w-full"} h-12 inline-flex items-center justify-center gap-2 text-sm font-extrabold text-slate-50 rounded-xl bg` |
| 212 | hex | `#153270` | `className={`${activeId !== STAGES[STAGES.length - 1].id ? "flex-1" : "w-full"} h-12 inline-flex items-center justify-center gap-2 text-sm font-extrabold text-slate-50 rounded-xl bg` |

### `src\components\landing\CareerGap.tsx` - 16

| Line | Kind | Value | Context |
|---:|---|---|---|
| 39 | hex | `#1B3F8B` | `color: "bg-sky-50 text-[#1B3F8B] border-sky-300",` |
| 50 | hex | `#F8FAFC` | `<section className="py-12 sm:py-16 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC] tone-light text-[#1A1A1A] border-b border-stone-200/80">` |
| 50 | hex | `#F1F5F9` | `<section className="py-12 sm:py-16 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC] tone-light text-[#1A1A1A] border-b border-stone-200/80">` |
| 50 | hex | `#F8FAFC` | `<section className="py-12 sm:py-16 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC] tone-light text-[#1A1A1A] border-b border-stone-200/80">` |
| 50 | hex | `#1A1A1A` | `<section className="py-12 sm:py-16 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC] tone-light text-[#1A1A1A] border-b border-stone-200/80">` |
| 58 | hex | `#1A1A1A` | `<h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1A1A1A] leading-tight">` |
| 61 | hex | `#8A6D1F` | `<span className="italic font-normal text-[#8A6D1F]">` |
| 108 | hex | `#1A1A1A` | `<h3 className="font-serif font-bold text-lg sm:text-xl text-[#1A1A1A] mt-1">` |
| 133 | hex | `#1B3F8B` | `<div className="bg-white tone-light card-light rounded-2xl border-2 border-[#1B3F8B] p-5 sm:p-8 space-y-5 shadow-md">` |
| 136 | hex | `#1B3F8B` | `<span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B] block">` |
| 139 | hex | `#1A1A1A` | `<h3 className="font-serif font-bold text-lg sm:text-xl text-[#1A1A1A] mt-1">` |
| 151 | hex | `#1A1A1A` | `className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-[#1A1A1A] font-sans font-semibold"` |
| 160 | hex | `#1B3F8B` | `<div className="bg-[#1B3F8B] rounded-xl p-3.5 sm:p-4">` |
| 173 | hex | `#1B3F8B` | `style={{ color: "#FFFFFF", backgroundColor: "#1B3F8B" }}` |
| 174 | hex | `#1B3F8B` | `className="h-12 px-6 sm:px-8 w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-extrabold text-slate-50 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] shadow-m` |
| 174 | hex | `#153270` | `className="h-12 px-6 sm:px-8 w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-extrabold text-slate-50 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] shadow-m` |

### `src\components\landing\CareerPaths.tsx` - 16

| Line | Kind | Value | Context |
|---:|---|---|---|
| 11 | hex | `#1B3F8B` | `"pv-associate": { text: "text-[#1B3F8B]", bg: "bg-sky-50", border: "border-sky-300" },` |
| 21 | hex | `#8A6D1F` | `biostatistics: { text: "text-[#8A6D1F]", bg: "bg-amber-50", border: "border-amber-300" },` |
| 25 | hex | `#1B3F8B` | `text: "text-[#1B3F8B]",` |
| 31 | hex | `#F8FAFC` | `<section className="py-12 sm:py-16 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC] tone-light text-[#1A1A1A] border-b border-stone-200/80">` |
| 31 | hex | `#F1F5F9` | `<section className="py-12 sm:py-16 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC] tone-light text-[#1A1A1A] border-b border-stone-200/80">` |
| 31 | hex | `#F8FAFC` | `<section className="py-12 sm:py-16 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC] tone-light text-[#1A1A1A] border-b border-stone-200/80">` |
| 31 | hex | `#1A1A1A` | `<section className="py-12 sm:py-16 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC] tone-light text-[#1A1A1A] border-b border-stone-200/80">` |
| 38 | hex | `#1A1A1A` | `<h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1A1A1A] leading-tight">` |
| 41 | hex | `#8A6D1F` | `<span className="italic font-normal text-[#8A6D1F]">` |
| 56 | hex | `#1B3F8B` | `text: "text-[#1B3F8B]",` |
| 94 | hex | `#1A1A1A` | `<h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#1A1A1A]">` |
| 164 | hex | `#1B3F8B` | `<BarChart3 className="h-3.5 w-3.5 text-[#1B3F8B]" />` |
| 179 | hex | `#1B3F8B` | `style={{ width: `${item.percentage}%`, backgroundColor: "#1B3F8B" }}` |
| 207 | hex | `#1B3F8B` | `style={{ color: "#FFFFFF", backgroundColor: "#1B3F8B" }}` |
| 208 | hex | `#1B3F8B` | `className="h-12 w-full inline-flex items-center justify-center gap-2 text-sm font-extrabold text-slate-50 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] shadow-md transition-all cursor` |
| 208 | hex | `#153270` | `className="h-12 w-full inline-flex items-center justify-center gap-2 text-sm font-extrabold text-slate-50 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] shadow-md transition-all cursor` |

### `src\components\landing\CertificateShowcase.tsx` - 16

| Line | Kind | Value | Context |
|---:|---|---|---|
| 79 | hex | `#F8FAFC` | `<Section id="certificate" size="lg" className="bg-[#F8FAFC] tone-light text-slate-900 border-y border-stone-200">` |
| 95 | hex | `#1B3F8B` | `className={`px-4 py-2 rounded-full font-mono text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3F8B] focus-visible:ring-offset` |
| 97 | hex | `#1B3F8B` | `? "bg-[#1B3F8B] text-slate-50 shadow-md"` |
| 105 | hex | `#1B3F8B` | `className={`px-4 py-2 rounded-full font-mono text-xs font-bold transition-all flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3F8B]` |
| 107 | hex | `#1B3F8B` | `? "bg-[#1B3F8B] text-slate-50 shadow-md"` |
| 116 | hex | `#1B3F8B` | `className={`px-4 py-2 rounded-full font-mono text-xs font-bold transition-all flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3F8B]` |
| 118 | hex | `#1B3F8B` | `? "bg-[#1B3F8B] text-slate-50 shadow-md"` |
| 157 | hex | `#0F172A` | `<div className="relative min-h-[340px] sm:min-h-[420px] overflow-hidden bg-gradient-to-b from-[#0F172A] to-[#020617] p-4 sm:p-5 flex items-center justify-center cursor-pointer grou` |
| 157 | hex | `#020617` | `<div className="relative min-h-[340px] sm:min-h-[420px] overflow-hidden bg-gradient-to-b from-[#0F172A] to-[#020617] p-4 sm:p-5 flex items-center justify-center cursor-pointer grou` |
| 184 | hex | `#1B3F8B` | `<div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1B3F8B]">` |
| 214 | hex | `#1B3F8B` | `className="h-10 px-4 flex-1 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-slate-50 font-mono text-xs font-bold shadow-xs transition-colors"` |
| 214 | hex | `#153270` | `className="h-10 px-4 flex-1 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-slate-50 font-mono text-xs font-bold shadow-xs transition-colors"` |
| 250 | hex | `#1B3F8B` | `<span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1B3F8B]">` |
| 258 | hex | `#1B3F8B` | `<Link to="/verify" className="font-mono text-xs font-bold text-[#1B3F8B] hover:underline flex items-center gap-1">` |
| 273 | hex | `#1B3F8B` | `className="h-12 px-7 inline-flex items-center justify-center gap-2 font-mono text-xs font-bold text-slate-50 bg-[#1B3F8B] hover:bg-[#153270] rounded-xl shadow-md transition-colors"` |
| 273 | hex | `#153270` | `className="h-12 px-7 inline-flex items-center justify-center gap-2 font-mono text-xs font-bold text-slate-50 bg-[#1B3F8B] hover:bg-[#153270] rounded-xl shadow-md transition-colors"` |

### `src\components\landing\CounterProof.tsx` - 16

| Line | Kind | Value | Context |
|---:|---|---|---|
| 34 | hex | `#3B82F6` | `navy: { accent: "from-[#3B82F6] to-[#1E40AF]", halo: "rgba(59,130,246,0.10)", bar: "#3b6fa0" },` |
| 34 | hex | `#1E40AF` | `navy: { accent: "from-[#3B82F6] to-[#1E40AF]", halo: "rgba(59,130,246,0.10)", bar: "#3b6fa0" },` |
| 34 | hex | `#3b6fa0` | `navy: { accent: "from-[#3B82F6] to-[#1E40AF]", halo: "rgba(59,130,246,0.10)", bar: "#3b6fa0" },` |
| 34 | rgba | `rgba(59,130,246,0.10)` | `navy: { accent: "from-[#3B82F6] to-[#1E40AF]", halo: "rgba(59,130,246,0.10)", bar: "#3b6fa0" },` |
| 35 | hex | `#14B8A6` | `teal: { accent: "from-[#14B8A6] to-[#0E7490]", halo: "rgba(20,184,166,0.10)", bar: "#0d7a5f" },` |
| 35 | hex | `#0E7490` | `teal: { accent: "from-[#14B8A6] to-[#0E7490]", halo: "rgba(20,184,166,0.10)", bar: "#0d7a5f" },` |
| 35 | hex | `#0d7a5f` | `teal: { accent: "from-[#14B8A6] to-[#0E7490]", halo: "rgba(20,184,166,0.10)", bar: "#0d7a5f" },` |
| 35 | rgba | `rgba(20,184,166,0.10)` | `teal: { accent: "from-[#14B8A6] to-[#0E7490]", halo: "rgba(20,184,166,0.10)", bar: "#0d7a5f" },` |
| 36 | hex | `#F59E0B` | `gold: { accent: "from-[#F59E0B] to-[#B45309]", halo: "rgba(245,158,11,0.14)", bar: "#c9a84c" },` |
| 36 | hex | `#B45309` | `gold: { accent: "from-[#F59E0B] to-[#B45309]", halo: "rgba(245,158,11,0.14)", bar: "#c9a84c" },` |
| 36 | rgba | `rgba(245,158,11,0.14)` | `gold: { accent: "from-[#F59E0B] to-[#B45309]", halo: "rgba(245,158,11,0.14)", bar: "#c9a84c" },` |
| 37 | hex | `#F97316` | `rust: { accent: "from-[#F97316] to-[#9A3412]", halo: "rgba(249,115,22,0.12)", bar: "#c2654a" },` |
| 37 | hex | `#9A3412` | `rust: { accent: "from-[#F97316] to-[#9A3412]", halo: "rgba(249,115,22,0.12)", bar: "#c2654a" },` |
| 37 | rgba | `rgba(249,115,22,0.12)` | `rust: { accent: "from-[#F97316] to-[#9A3412]", halo: "rgba(249,115,22,0.12)", bar: "#c2654a" },` |
| 118 | hex | `#F59E0B` | `className="h-full rounded-full bg-gradient-to-r from-[#F59E0B] to-[#B45309] transition-[width] duration-[1200ms] ease-out"` |
| 118 | hex | `#B45309` | `className="h-full rounded-full bg-gradient-to-r from-[#F59E0B] to-[#B45309] transition-[width] duration-[1200ms] ease-out"` |

### `src\components\landing\EmployerConsolePreview.tsx` - 16

| Line | Kind | Value | Context |
|---:|---|---|---|
| 68 | hex | `#030712` | `<section id="employer-console" className="tone-dark py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#030712] text-slate-100 border-t border-slate-800">` |
| 84 | hex | `#0B132B` | `<div className="rounded-3xl border border-slate-700/80 bg-[#0B132B] shadow-2xl overflow-hidden ring-1 ring-white/10">` |
| 86 | hex | `#020617` | `<div className="bg-[#020617] px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">` |
| 111 | hex | `#091124` | `<div className="grid gap-6 lg:grid-cols-12 p-5 sm:p-8 bg-[#091124]">` |
| 131 | hex | `#0F224A` | `? "border-sky-400 bg-[#0F224A] shadow-xl ring-2 ring-sky-400/40"` |
| 132 | hex | `#0B152C` | `: "border-slate-800 bg-[#0B152C] hover:border-slate-700 hover:bg-[#0E1A36]"` |
| 132 | hex | `#0E1A36` | `: "border-slate-800 bg-[#0B152C] hover:border-slate-700 hover:bg-[#0E1A36]"` |
| 164 | hex | `#0B152C` | `<div className="p-4 rounded-2xl border border-slate-800 bg-[#0B152C] space-y-1 text-xs font-sans">` |
| 175 | hex | `#0B152C` | `<div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-[#0B152C] p-6 sm:p-7 space-y-6 shadow-xl">` |
| 198 | hex | `#060D1E` | `<div className="rounded-xl border border-slate-800 bg-[#060D1E] p-3.5 space-y-1">` |
| 206 | hex | `#060D1E` | `<div className="rounded-xl border border-slate-800 bg-[#060D1E] p-3.5 space-y-1">` |
| 211 | hex | `#060D1E` | `<div className="rounded-xl border border-slate-800 bg-[#060D1E] p-3.5 space-y-1 col-span-2 sm:col-span-1">` |
| 218 | hex | `#060D1E` | `<div className="space-y-3 p-4 rounded-xl border border-slate-800 bg-[#060D1E]">` |
| 250 | hex | `#060D1E` | `<span key={i} className="px-3 py-1 rounded-lg border border-slate-700 bg-[#060D1E] text-xs font-mono text-slate-100 font-semibold flex items-center gap-1.5">` |
| 259 | hex | `#060D1E` | `<div className="p-4 rounded-xl border border-sky-500/30 bg-[#060D1E] space-y-2.5">` |
| 270 | hex | `#020617` | `<div className="p-3 rounded-lg bg-[#020617] border border-slate-700 font-mono text-xs text-slate-50 flex items-center justify-between">` |

### `src\components\landing\WhyRegisterBlock.tsx` - 16

| Line | Kind | Value | Context |
|---:|---|---|---|
| 46 | hex | `#FAF8F5` | `className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] text-[#1A1A1A] border-b border-stone-200"` |
| 46 | hex | `#1A1A1A` | `className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] text-[#1A1A1A] border-b border-stone-200"` |
| 50 | hex | `#FFFDF9` | `<div className="rounded-2xl sm:rounded-full border border-stone-300/80 bg-[#FFFDF9] py-3.5 px-5 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs max-w` |
| 67 | hex | `#C2410C` | `className="px-5 py-2.5 rounded-full bg-[#C2410C] hover:bg-[#9A3412] active:scale-95 text-slate-50 text-xs font-black uppercase tracking-wider shadow-sm shrink-0 transition-all curs` |
| 67 | hex | `#9A3412` | `className="px-5 py-2.5 rounded-full bg-[#C2410C] hover:bg-[#9A3412] active:scale-95 text-slate-50 text-xs font-black uppercase tracking-wider shadow-sm shrink-0 transition-all curs` |
| 67 | hex | `#C2410C` | `className="px-5 py-2.5 rounded-full bg-[#C2410C] hover:bg-[#9A3412] active:scale-95 text-slate-50 text-xs font-black uppercase tracking-wider shadow-sm shrink-0 transition-all curs` |
| 81 | hex | `#1A1A1A` | `className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1A1A1A] tracking-tight leading-[1.18]"` |
| 102 | hex | `#1B3F8B` | `style={{ backgroundColor: "#EEF2FF", color: "#1B3F8B", borderColor: "#93C5FD" }}` |
| 102 | hex | `#93C5FD` | `style={{ backgroundColor: "#EEF2FF", color: "#1B3F8B", borderColor: "#93C5FD" }}` |
| 105 | hex | `#1B3F8B` | `<Icon className="h-5 w-5" style={{ color: "#1B3F8B" }} />` |
| 124 | hex | `#1B3F8B` | `<div className="rounded-3xl border border-[#1B3F8B]/30 bg-gradient-to-br from-[#1B3F8B]/5 via-white to-amber-500/5 p-8 sm:p-12 text-center space-y-6 max-w-4xl mx-auto shadow-md">` |
| 124 | hex | `#1B3F8B` | `<div className="rounded-3xl border border-[#1B3F8B]/30 bg-gradient-to-br from-[#1B3F8B]/5 via-white to-amber-500/5 p-8 sm:p-12 text-center space-y-6 max-w-4xl mx-auto shadow-md">` |
| 126 | hex | `#1A1A1A` | `<h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A1A1A]">` |
| 128 | hex | `#1B3F8B` | `<span className="text-[#1B3F8B] italic">Put Yourself in the Pipeline.</span>` |
| 143 | hex | `#1B3F8B` | `className="h-14 px-8 inline-flex items-center justify-center gap-3 text-base sm:text-lg font-bold text-slate-50 rounded-2xl bg-[#1B3F8B] hover:bg-[#153270] shadow-lg transition-all` |
| 143 | hex | `#153270` | `className="h-14 px-8 inline-flex items-center justify-center gap-3 text-base sm:text-lg font-bold text-slate-50 rounded-2xl bg-[#1B3F8B] hover:bg-[#153270] shadow-lg transition-all` |

### `src\components\landing\YouAreHere.tsx` - 16

| Line | Kind | Value | Context |
|---:|---|---|---|
| 14 | hex | `#1B3F8B` | `accentColor: "text-[#1B3F8B]",` |
| 15 | hex | `#1B3F8B` | `borderColor: "border-[#1B3F8B]",` |
| 17 | hex | `#1B3F8B` | `badgeBg: "bg-sky-50 border-sky-200 text-[#1B3F8B]",` |
| 28 | hex | `#8A6D1F` | `accentColor: "text-[#8A6D1F]",` |
| 31 | hex | `#8A6D1F` | `badgeBg: "bg-amber-50 border-amber-200 text-[#8A6D1F]",` |
| 55 | hex | `#1A1A1A` | `<section className="py-12 sm:py-16 bg-white tone-light text-[#1A1A1A] border-b border-stone-200">` |
| 63 | hex | `#1A1A1A` | `<h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1A1A1A] leading-tight">` |
| 66 | hex | `#8A6D1F` | `<span className="italic font-normal text-[#8A6D1F]">` |
| 93 | hex | `#1A1A1A` | `<div className={`font-serif font-bold text-sm ${isActive ? "text-[#1A1A1A]" : "text-stone-600"}`}>` |
| 115 | hex | `#1A1A1A` | `<div className="font-serif font-bold text-xl text-[#1A1A1A]">{active.label}</div>` |
| 142 | hex | `#1B3F8B` | `<div className="lg:col-span-5 bg-white tone-light card-light rounded-2xl border-2 border-[#1B3F8B] p-6 sm:p-8 space-y-6 shadow-sm flex flex-col justify-between">` |
| 144 | hex | `#1B3F8B` | `<span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#1B3F8B] block">` |
| 147 | hex | `#1A1A1A` | `<p className="text-sm sm:text-base text-[#1A1A1A] font-sans leading-relaxed font-semibold">` |
| 168 | hex | `#1B3F8B` | `style={{ color: "#FFFFFF", backgroundColor: "#1B3F8B" }}` |
| 169 | hex | `#1B3F8B` | `className="h-12 w-full inline-flex items-center justify-center gap-2 text-sm font-extrabold text-slate-50 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] shadow-md transition-all cursor` |
| 169 | hex | `#153270` | `className="h-12 w-full inline-flex items-center justify-center gap-2 text-sm font-extrabold text-slate-50 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] shadow-md transition-all cursor` |

### `src\components\acri\AcriCompetenciesGrid.tsx` - 15

| Line | Kind | Value | Context |
|---:|---|---|---|
| 155 | hex | `#E8F7F1` | `<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F7F1] border border-[#005B4F]/20 text-[#005B4F] text-[11px] font-mono font-bold uppercase tracking-wide` |
| 155 | hex | `#005B4F` | `<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F7F1] border border-[#005B4F]/20 text-[#005B4F] text-[11px] font-mono font-bold uppercase tracking-wide` |
| 155 | hex | `#005B4F` | `<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F7F1] border border-[#005B4F]/20 text-[#005B4F] text-[11px] font-mono font-bold uppercase tracking-wide` |
| 159 | hex | `#0B1325` | `<h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1325] tracking-tight">` |
| 169 | hex | `#005B4F` | `className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#005B4F] hover:text-[#00473E] group shrink-0"` |
| 169 | hex | `#00473E` | `className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#005B4F] hover:text-[#00473E] group shrink-0"` |
| 187 | hex | `#005B4F` | `? "border-[#005B4F] shadow-lg ring-1 ring-[#005B4F]/20 bg-white"` |
| 187 | hex | `#005B4F` | `? "border-[#005B4F] shadow-lg ring-1 ring-[#005B4F]/20 bg-white"` |
| 202 | hex | `#0B1325` | `<div className="absolute inset-0 bg-gradient-to-t from-[#0B1325]/80 via-[#0B1325]/20 to-transparent pointer-events-none" />` |
| 202 | hex | `#0B1325` | `<div className="absolute inset-0 bg-gradient-to-t from-[#0B1325]/80 via-[#0B1325]/20 to-transparent pointer-events-none" />` |
| 205 | hex | `#0B1325` | `<div className="absolute top-3 left-3 bg-[#0B1325]/80 backdrop-blur-xs text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-md">` |
| 212 | hex | `#005B4F` | `<div className="h-7 w-7 rounded-lg bg-[#005B4F] flex items-center justify-center text-white">` |
| 224 | hex | `#005B4F` | `<h4 className="text-xs font-bold text-[#005B4F] uppercase tracking-wide font-mono mb-1.5">` |
| 235 | hex | `#005B4F` | `<span className="font-mono text-[10px] font-bold text-[#005B4F] uppercase block mb-0.5">` |
| 275 | hex | `#005B4F` | `isExpanded ? "rotate-180 text-[#005B4F]" : ""` |

### `src\components\acri\assessment\AcriProgressRail.tsx` - 15

| Line | Kind | Value | Context |
|---:|---|---|---|
| 72 | rgba | `rgba(255,255,255,0.08)` | `"flex flex-col shrink-0 bg-[var(--color-brand-ink)] border-b border-[rgba(255,255,255,0.08)]",` |
| 84 | rgba | `rgba(255,255,255,0.45)` | `<span className="font-mono text-[10px] text-[rgba(255,255,255,0.45)] uppercase tracking-widest shrink-0">` |
| 90 | rgba | `rgba(255,255,255,0.35)` | `<span className="font-mono text-[10px] text-[rgba(255,255,255,0.35)]">` |
| 97 | rgba | `rgba(255,255,255,0.1)` | `<div className="flex-1 max-w-[160px] h-1 rounded-full bg-[rgba(255,255,255,0.1)] overflow-hidden">` |
| 103 | rgba | `rgba(255,255,255,0.45)` | `<span className="font-mono text-[10px] text-[rgba(255,255,255,0.45)] shrink-0">` |
| 126 | rgba | `rgba(255,255,255,0.35)` | `<span className="font-mono text-[10px] text-[rgba(255,255,255,0.35)] hidden md:block">` |
| 150 | rgba | `rgba(255,255,255,0.12)` | `: "border-[rgba(255,255,255,0.12)] bg-transparent text-[rgba(255,255,255,0.35)] hover:text-amber-400",` |
| 150 | rgba | `rgba(255,255,255,0.35)` | `: "border-[rgba(255,255,255,0.12)] bg-transparent text-[rgba(255,255,255,0.35)] hover:text-amber-400",` |
| 162 | rgba | `rgba(255,255,255,0.1)` | `<div className="h-5 w-px bg-[rgba(255,255,255,0.1)] shrink-0" />` |
| 171 | rgba | `rgba(255,255,255,0.15)` | `"border border-[rgba(255,255,255,0.15)] text-[rgba(255,255,255,0.6)]",` |
| 171 | rgba | `rgba(255,255,255,0.6)` | `"border border-[rgba(255,255,255,0.15)] text-[rgba(255,255,255,0.6)]",` |
| 172 | rgba | `rgba(255,255,255,0.3)` | `"hover:border-[rgba(255,255,255,0.3)] hover:text-white transition-colors cursor-pointer",` |
| 192 | rgba | `rgba(255,255,255,0.15)` | `"border border-[rgba(255,255,255,0.15)] text-[rgba(255,255,255,0.5)]",` |
| 192 | rgba | `rgba(255,255,255,0.5)` | `"border border-[rgba(255,255,255,0.15)] text-[rgba(255,255,255,0.5)]",` |
| 193 | rgba | `rgba(255,255,255,0.3)` | `"hover:border-[rgba(255,255,255,0.3)] hover:text-white transition-colors cursor-pointer",` |

### `src\components\courses\CourseHero.tsx` - 15

| Line | Kind | Value | Context |
|---:|---|---|---|
| 96 | hex | `#0A0F1E` | `<div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1E]/70 via-[#0A0F1E]/85 to-[#0A0F1E]" />` |
| 96 | hex | `#0A0F1E` | `<div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1E]/70 via-[#0A0F1E]/85 to-[#0A0F1E]" />` |
| 96 | hex | `#0A0F1E` | `<div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1E]/70 via-[#0A0F1E]/85 to-[#0A0F1E]" />` |
| 107 | hex | `#94A3B8` | `style={{ color: "#94A3B8" }}` |
| 114 | hex | `#0F172A` | `background: "#0F172A",` |
| 115 | rgba | `rgba(255,255,255,0.12)` | `borderColor: "rgba(255,255,255,0.12)",` |
| 141 | rgba | `rgba(15,23,42,0.7)` | `style={{ background: "rgba(15,23,42,0.7)", color: "#F1F5F9" }}` |
| 177 | rgba | `rgba(15,23,42,0.6)` | `background: "rgba(15,23,42,0.6)",` |
| 178 | rgba | `rgba(56,189,248,0.25)` | `borderColor: "rgba(56,189,248,0.25)",` |
| 184 | hex | `#7DD3FC` | `style={{ color: "#7DD3FC" }}` |
| 193 | hex | `#7DD3FC` | `style={{ color: "#7DD3FC" }}` |
| 217 | hex | `#1A1300` | `style={{ background: "#F5C451", color: "#1A1300" }}` |
| 241 | rgba | `rgba(255,255,255,0.04)` | `background: "rgba(255,255,255,0.04)",` |
| 242 | rgba | `rgba(255,255,255,0.15)` | `borderColor: "rgba(255,255,255,0.15)",` |
| 269 | rgba | `rgba(15,23,42,0.7)` | `style={{ background: "rgba(15,23,42,0.7)", color: "#F1F5F9" }}` |

### `src\components\landing\HiringPartnerWall.tsx` - 15

| Line | Kind | Value | Context |
|---:|---|---|---|
| 65 | hex | `#F7F5F0` | `className="relative overflow-hidden bg-[#F7F5F0] tone-light text-[#1A1A1A] py-12 sm:py-16 border-b border-stone-200/80"` |
| 65 | hex | `#1A1A1A` | `className="relative overflow-hidden bg-[#F7F5F0] tone-light text-[#1A1A1A] py-12 sm:py-16 border-b border-stone-200/80"` |
| 72 | hex | `#1A1A1A` | `<h2 id="hiring-wall-heading" className="text-[#1A1A1A]">` |
| 74 | hex | `#8A6D1F` | `<em className="italic font-normal text-[#8A6D1F]">shape our curriculum.</em>` |
| 85 | hex | `#1B3F8B` | `<div className="mx-auto mt-8 flex max-w-xl flex-wrap items-center justify-center gap-2 rounded-full border border-stone-300 bg-white tone-light card-light px-5 py-2.5 text-center f` |
| 87 | hex | `#1B3F8B` | `<span className="text-[#1B3F8B] font-extrabold">↓</span>` |
| 88 | hex | `#8A6D1F` | `<span className="text-[#8A6D1F]">ROLE REQUIREMENTS</span>` |
| 89 | hex | `#1B3F8B` | `<span className="text-[#1B3F8B] font-extrabold">↓</span>` |
| 105 | hex | `#1B3F8B` | `s.highlight ? "text-[#1B3F8B]" : "text-[#1A1A1A]"` |
| 105 | hex | `#1A1A1A` | `s.highlight ? "text-[#1B3F8B]" : "text-[#1A1A1A]"` |
| 127 | hex | `#1B3F8B` | `<span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-[#1B3F8B]">` |
| 131 | hex | `#8A6D1F` | `<span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 font-mono text-[10px] font-extrabold text-[#8A6D1F] border border-amber-200">` |
| 132 | hex | `#8A6D1F` | `<Sparkles className="h-3 w-3 text-[#8A6D1F]" /> HIGH DEMAND` |
| 136 | hex | `#1A1A1A` | `<h3 className="mt-3 font-sans text-lg font-bold text-[#1A1A1A] group-hover:text-[#1B3F8B] transition-colors">` |
| 136 | hex | `#1B3F8B` | `<h3 className="mt-3 font-sans text-lg font-bold text-[#1A1A1A] group-hover:text-[#1B3F8B] transition-colors">` |

### `src\routes\blog.$slug.tsx` - 15

| Line | Kind | Value | Context |
|---:|---|---|---|
| 102 | hex | `#FAF9F6` | `<div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans selection:bg-[#1B3F8B] selection:text-white pb-24">` |
| 102 | hex | `#1B3F8B` | `<div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans selection:bg-[#1B3F8B] selection:text-white pb-24">` |
| 122 | hex | `#1B3F8B` | `<span className="font-mono text-[10px] font-bold text-[#1B3F8B] uppercase tracking-wider border border-stone-300 bg-stone-50 px-2.5 py-1">` |
| 137 | hex | `#1B3F8B` | `<p className="mt-4 text-base sm:text-xl text-stone-700 leading-relaxed font-sans border-l-2 border-[#1B3F8B] pl-4">` |
| 222 | hex | `#0B1325` | `<div className="bg-white tone-light card-light border-2 border-[#0B1325] p-6 sm:p-8 space-y-4 my-12">` |
| 223 | hex | `#1B3F8B` | `<span className="font-mono text-[10px] font-bold text-[#1B3F8B] uppercase tracking-widest">` |
| 236 | hex | `#0B1325` | `className="bg-[#0B1325] text-white hover:bg-[#1B3F8B] px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"` |
| 236 | hex | `#1B3F8B` | `className="bg-[#0B1325] text-white hover:bg-[#1B3F8B] px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"` |
| 255 | hex | `#1B3F8B` | `<BookOpen className="w-3.5 h-3.5 text-[#1B3F8B]" /> TABLE OF CONTENTS` |
| 262 | hex | `#1B3F8B` | `className="block font-sans text-xs text-stone-700 hover:text-[#1B3F8B] hover:translate-x-0.5 transition-all py-1"` |
| 278 | hex | `#1B3F8B` | `className="inline-block font-mono text-xs font-bold text-[#1B3F8B] hover:underline uppercase tracking-wider"` |
| 296 | hex | `#1B3F8B` | `className="bg-white tone-light card-light border border-stone-300 p-5 flex flex-col justify-between hover:border-[#1B3F8B] transition-colors"` |
| 299 | hex | `#1B3F8B` | `<span className="font-mono text-[10px] font-bold text-[#1B3F8B] uppercase tracking-wider">` |
| 307 | hex | `#1B3F8B` | `<h4 className="font-serif font-bold text-base text-stone-900 group-hover:text-[#1B3F8B] mt-2 leading-snug line-clamp-2">` |
| 318 | hex | `#1B3F8B` | `className="mt-4 font-mono text-[11px] font-bold text-stone-900 uppercase tracking-wider inline-flex items-center gap-1 hover:text-[#1B3F8B]"` |

### `src\routes\comparisons.index.tsx` - 15

| Line | Kind | Value | Context |
|---:|---|---|---|
| 24 | hex | `#FAF9F6` | `<div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans selection:bg-[#1B3F8B] selection:text-white pb-24">` |
| 24 | hex | `#1B3F8B` | `<div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans selection:bg-[#1B3F8B] selection:text-white pb-24">` |
| 29 | hex | `#1B3F8B` | `<span className="inline-block w-2.5 h-2.5 rounded-full bg-[#1B3F8B] motion-safe:animate-pulse" />` |
| 30 | hex | `#1B3F8B` | `<span className="font-mono text-[10px] font-bold tracking-widest text-[#1B3F8B] uppercase">` |
| 34 | hex | `#0B1325` | `<h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#0B1325]">` |
| 53 | hex | `#1B3F8B` | `<span className="font-mono text-[10px] font-bold text-[#1B3F8B] uppercase tracking-wider bg-stone-100 px-2.5 py-1 rounded">` |
| 61 | hex | `#0B1325` | `<h2 className="font-serif text-xl font-bold text-[#0B1325] leading-snug">` |
| 65 | hex | `#1B3F8B` | `className="hover:text-[#1B3F8B] transition-colors"` |
| 76 | hex | `#FAF9F6` | `<div className="mt-6 grid grid-cols-2 gap-3 bg-[#FAF9F6] p-3.5 rounded-lg border border-stone-200 text-xs font-mono">` |
| 81 | hex | `#0B1325` | `<span className="block text-[#0B1325] font-semibold mt-1">` |
| 89 | hex | `#0B1325` | `<span className="block text-[#0B1325] font-semibold mt-1">` |
| 103 | hex | `#0B1325` | `className="inline-flex items-center gap-1.5 bg-[#0B1325] hover:bg-[#1B3F8B] text-white px-4 py-2 rounded text-xs font-mono font-bold uppercase tracking-wider transition-colors"` |
| 103 | hex | `#1B3F8B` | `className="inline-flex items-center gap-1.5 bg-[#0B1325] hover:bg-[#1B3F8B] text-white px-4 py-2 rounded text-xs font-mono font-bold uppercase tracking-wider transition-colors"` |
| 113 | hex | `#0B1325` | `<section className="mt-16 bg-[#0B1325] text-white rounded-2xl p-8 sm:p-10 border border-stone-800 relative overflow-hidden">` |
| 127 | hex | `#0B1325` | `className="inline-flex items-center gap-2 bg-white tone-light hover:bg-stone-100 text-[#0B1325] px-5 py-3 rounded text-xs font-mono font-bold uppercase tracking-wider transition-co` |

### `src\components\acri\AcriAssessmentSteps.tsx` - 14

| Line | Kind | Value | Context |
|---:|---|---|---|
| 39 | hex | `#FAF8F5` | `<section id="how-it-works" className="bg-[#FAF8F5] py-16 lg:py-24 border-b border-stone-200">` |
| 44 | hex | `#E8F7F1` | `<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F7F1] border border-[#005B4F]/20 text-[#005B4F] text-[11px] font-mono font-bold uppercase tracking-wide` |
| 44 | hex | `#005B4F` | `<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F7F1] border border-[#005B4F]/20 text-[#005B4F] text-[11px] font-mono font-bold uppercase tracking-wide` |
| 44 | hex | `#005B4F` | `<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F7F1] border border-[#005B4F]/20 text-[#005B4F] text-[11px] font-mono font-bold uppercase tracking-wide` |
| 45 | hex | `#005B4F` | `<span className="h-1.5 w-1.5 rounded-full bg-[#005B4F]" />` |
| 48 | hex | `#0B1325` | `<h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#0B1325]">` |
| 59 | hex | `#005B4F` | `className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#005B4F] hover:bg-[#00473E] px-5 py-3 text-xs font-semibold text-white transition-colors shadow-xs"` |
| 59 | hex | `#00473E` | `className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#005B4F] hover:bg-[#00473E] px-5 py-3 text-xs font-semibold text-white transition-colors shadow-xs"` |
| 73 | hex | `#005B4F` | `<div className="card-light h-full rounded-2xl border border-stone-200 bg-white tone-light p-5 hover:border-[#005B4F]/50 hover:shadow-md transition-all flex flex-col justify-between` |
| 77 | hex | `#0B1325` | `<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B1325] text-white shadow-xs group-hover:bg-[#005B4F] transition-colors">` |
| 77 | hex | `#005B4F` | `<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B1325] text-white shadow-xs group-hover:bg-[#005B4F] transition-colors">` |
| 80 | hex | `#005B4F` | `<span className="font-mono text-xs font-bold text-stone-400 group-hover:text-[#005B4F] transition-colors">` |
| 86 | hex | `#0B1325` | `<h3 className="font-serif text-base font-bold text-[#0B1325] mb-2 leading-snug">` |
| 97 | hex | `#005B4F` | `<span className="text-[#005B4F] font-bold text-[10px] uppercase">` |

### `src\components\acri\AcriNavbar.tsx` - 14

| Line | Kind | Value | Context |
|---:|---|---|---|
| 22 | hex | `#FAF8F5` | `? "bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200 shadow-xs"` |
| 23 | hex | `#FAF8F5` | `: "bg-[#FAF8F5] border-b border-stone-200/70"` |
| 38 | hex | `#0B1325` | `className="px-3 py-1.5 rounded-md hover:text-[#0B1325] hover:bg-stone-100 transition-colors"` |
| 44 | hex | `#0B1325` | `className="px-3 py-1.5 rounded-md hover:text-[#0B1325] hover:bg-stone-100 transition-colors"` |
| 50 | hex | `#0B1325` | `className="px-3 py-1.5 rounded-md hover:text-[#0B1325] hover:bg-stone-100 transition-colors"` |
| 63 | hex | `#0B1325` | `className="px-3 py-1.5 rounded-md hover:text-[#0B1325] hover:bg-stone-100 transition-colors"` |
| 69 | hex | `#0B1325` | `className="px-3 py-1.5 rounded-md hover:text-[#0B1325] hover:bg-stone-100 transition-colors"` |
| 75 | hex | `#0B1325` | `className="px-3 py-1.5 rounded-md hover:text-[#0B1325] hover:bg-stone-100 transition-colors"` |
| 82 | hex | `#0B1325` | `className="px-2.5 py-1.5 rounded-md hover:text-[#0B1325] hover:bg-stone-100 transition-colors flex items-center gap-1 cursor-pointer"` |
| 132 | hex | `#0B1325` | `className="hidden sm:inline-flex items-center justify-center px-3.5 py-1.5 text-xs font-semibold text-stone-800 hover:text-[#0B1325] transition-colors"` |
| 140 | hex | `#0B1325` | `className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#0B1325] hover:bg-[#152342] rounded-lg transition-col` |
| 140 | hex | `#152342` | `className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#0B1325] hover:bg-[#152342] rounded-lg transition-col` |
| 161 | hex | `#FAF8F5` | `<div className="lg:hidden border-b border-stone-200 bg-[#FAF8F5] px-4 pt-2 pb-6 space-y-1">` |
| 229 | hex | `#0B1325` | `className="flex-1 text-center py-2 text-xs font-bold uppercase tracking-wider bg-[#0B1325] text-white rounded-md"` |

### `src\components\career\CareerEngineAssessment.tsx` - 14

| Line | Kind | Value | Context |
|---:|---|---|---|
| 204 | hex | `#071A4A` | `<h1 className="max-w-3xl text-xl font-bold leading-snug text-[#071A4A] sm:text-2xl">` |
| 232 | hex | `#071A4A` | `className="mt-4 flex h-11 w-full items-center justify-center rounded-xl bg-[#071A4A] text-sm font-semibold text-white"` |
| 241 | hex | `#1A1A1A` | `body .arzon-ui-light button.ce-option-btn .ce-unselected-text { color: #1A1A1A !important; -webkit-text-fill-color: #1A1A1A !important; }` |
| 241 | hex | `#1A1A1A` | `body .arzon-ui-light button.ce-option-btn .ce-unselected-text { color: #1A1A1A !important; -webkit-text-fill-color: #1A1A1A !important; }` |
| 242 | hex | `#071A4A` | `body .arzon-ui-light button.ce-option-btn .ce-selected-text { color: #071A4A !important; -webkit-text-fill-color: #071A4A !important; }` |
| 242 | hex | `#071A4A` | `body .arzon-ui-light button.ce-option-btn .ce-selected-text { color: #071A4A !important; -webkit-text-fill-color: #071A4A !important; }` |
| 243 | hex | `#071A4A` | `body .arzon-ui-light button.ce-option-btn .ce-unselected-circle { color: #071A4A !important; -webkit-text-fill-color: #071A4A !important; }` |
| 243 | hex | `#071A4A` | `body .arzon-ui-light button.ce-option-btn .ce-unselected-circle { color: #071A4A !important; -webkit-text-fill-color: #071A4A !important; }` |
| 254 | hex | `#1B3F8B` | `? "border-[#1B3F8B] bg-[#F4F7FB] ring-1 ring-[#1B3F8B]"` |
| 254 | hex | `#F4F7FB` | `? "border-[#1B3F8B] bg-[#F4F7FB] ring-1 ring-[#1B3F8B]"` |
| 254 | hex | `#1B3F8B` | `? "border-[#1B3F8B] bg-[#F4F7FB] ring-1 ring-[#1B3F8B]"` |
| 255 | hex | `#1B3F8B` | `: "border-slate-200 bg-white hover:border-[#1B3F8B]/50 hover:bg-slate-50"` |
| 261 | hex | `#1B3F8B` | `? "bg-[#1B3F8B] text-white"` |
| 282 | hex | `#1B3F8B` | `className="h-full rounded-full bg-[#1B3F8B] transition-all duration-300"` |

### `src\components\career\result\CareerCertificate\CredentialVerification.tsx` - 14

| Line | Kind | Value | Context |
|---:|---|---|---|
| 73 | hex | `#E4EAF2` | `<div className="rounded-3xl border border-[#E4EAF2] bg-white tone-light card-light p-5 shadow-sm sm:p-8">` |
| 74 | hex | `#E4EAF2` | `<div className="flex flex-col justify-between gap-4 border-b border-[#E4EAF2] pb-6 sm:flex-row sm:items-center">` |
| 76 | hex | `#EEF6FF` | `<div className="grid h-8 w-8 place-items-center rounded-lg bg-[#EEF6FF] text-[#1557D6]">` |
| 76 | hex | `#1557D6` | `<div className="grid h-8 w-8 place-items-center rounded-lg bg-[#EEF6FF] text-[#1557D6]">` |
| 80 | hex | `#1557D6` | `<span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#1557D6]">` |
| 83 | hex | `#071A4A` | `<h2 className="font-serif text-2xl font-bold text-[#071A4A]">` |
| 94 | hex | `#3F4A60` | `<p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#3F4A60]">` |
| 102 | hex | `#FAFBFD` | `className="relative w-full overflow-hidden rounded-xl border border-slate-200 bg-[#FAFBFD] shadow-xs"` |
| 122 | hex | `#D0E1FD` | `className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-3.5 py-1.5 text-xs font-semibold text-[#1557D6] shadow-2xs transition active:s` |
| 122 | hex | `#EEF6FF` | `className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-3.5 py-1.5 text-xs font-semibold text-[#1557D6] shadow-2xs transition active:s` |
| 122 | hex | `#1557D6` | `className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-3.5 py-1.5 text-xs font-semibold text-[#1557D6] shadow-2xs transition active:s` |
| 130 | hex | `#E4EAF2` | `<div className="mt-8 border-t border-[#E4EAF2] pt-6">` |
| 138 | hex | `#FAFBFD` | `<div className="mt-6 flex items-start gap-3 rounded-2xl border border-slate-200 bg-[#FAFBFD] p-4 text-xs leading-5 text-[#69758A]">` |
| 138 | hex | `#69758A` | `<div className="mt-6 flex items-start gap-3 rounded-2xl border border-slate-200 bg-[#FAFBFD] p-4 text-xs leading-5 text-[#69758A]">` |

### `src\components\courses\DeploymentReadyBlock.tsx` - 14

| Line | Kind | Value | Context |
|---:|---|---|---|
| 12 | hex | `#3B82F6` | `domain: "from-[#3B82F6] to-[#1E40AF]",` |
| 12 | hex | `#1E40AF` | `domain: "from-[#3B82F6] to-[#1E40AF]",` |
| 13 | hex | `#14B8A6` | `process: "from-[#14B8A6] to-[#0E7490]",` |
| 13 | hex | `#0E7490` | `process: "from-[#14B8A6] to-[#0E7490]",` |
| 14 | hex | `#A855F7` | `tools: "from-[#A855F7] to-[#6D28D9]",` |
| 14 | hex | `#6D28D9` | `tools: "from-[#A855F7] to-[#6D28D9]",` |
| 15 | hex | `#F59E0B` | `workplace: "from-[#F59E0B] to-[#B45309]",` |
| 15 | hex | `#B45309` | `workplace: "from-[#F59E0B] to-[#B45309]",` |
| 81 | hex | `#0F1A33` | `<div key={p.id} className="rounded-2xl border border-white/10 bg-[#0F1A33] p-6">` |
| 108 | hex | `#34D399` | `<CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#34D399]" />` |
| 119 | hex | `#0F1A33` | `<div className="rounded-2xl border border-white/10 bg-[#0F1A33] p-6 sm:p-8">` |
| 133 | hex | `#34D399` | `accent: "text-[#34D399]",` |
| 139 | hex | `#F59E0B` | `accent: "text-[#F59E0B]",` |
| 145 | hex | `#A855F7` | `accent: "text-[#A855F7]",` |

### `src\components\landing\RecruiterOutcomes.tsx` - 14

| Line | Kind | Value | Context |
|---:|---|---|---|
| 20 | hex | `#F8FAFC` | `<section id="recruiter-outcomes" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC]">` |
| 20 | hex | `#F1F5F9` | `<section id="recruiter-outcomes" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC]">` |
| 20 | hex | `#F8FAFC` | `<section id="recruiter-outcomes" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC]">` |
| 25 | hex | `#707C90` | `<p className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[#707C90]">` |
| 28 | hex | `#8A6D1F` | `<div className="h-0.5 w-8 bg-[#8A6D1F]/60 mt-1 rounded-full" />` |
| 30 | hex | `#151C2E` | `<h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#151C2E] tracking-tight leading-[1.15]">` |
| 32 | hex | `#8A6D1F` | `<span className="italic text-[#8A6D1F]">when our graduate applies.</span>` |
| 34 | hex | `#5B6472` | `<p className="text-sm sm:text-base text-[#5B6472] leading-relaxed max-w-2xl mx-auto">` |
| 47 | hex | `#707C90` | `<div className="hidden md:grid md:grid-cols-[1.1fr_1.3fr_1.1fr] gap-4 pb-3 border-b border-slate-200/80 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#707C90] px` |
| 66 | hex | `#151C2E` | `<p className="text-xs font-bold text-[#151C2E]">{row.pain}</p>` |
| 67 | hex | `#151C2E` | `<div className="flex items-center gap-2 text-xs font-medium text-[#151C2E]">` |
| 68 | hex | `#2563EB` | `<CheckCircle2 className="h-3.5 w-3.5 text-[#2563EB] shrink-0" />` |
| 71 | hex | `#2563EB` | `<p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#2563EB]">` |
| 79 | hex | `#707C90` | `<p className="text-center font-mono text-[10px] text-[#707C90]">` |

### `src\components\landing\SalaryOutcomeStrip.tsx` - 14

| Line | Kind | Value | Context |
|---:|---|---|---|
| 29 | hex | `#2563EB` | `badgeBg: "bg-blue-100 text-[#2563EB]",` |
| 31 | hex | `#2563EB` | `valColor: "text-[#2563EB]",` |
| 39 | hex | `#2563EB` | `badgeBg: "bg-blue-100 text-[#2563EB]",` |
| 41 | hex | `#2563EB` | `valColor: "text-[#2563EB]",` |
| 86 | hex | `#F8FAFC` | `className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-[#F8FAFC] to-white border-y border-slate-200/80"` |
| 92 | hex | `#707C90` | `<p className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[#707C90]">` |
| 95 | hex | `#2563EB` | `<div className="h-0.5 w-10 bg-[#2563EB]/70 mt-1 rounded-full" />` |
| 99 | hex | `#151C2E` | `className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#151C2E] tracking-tight leading-[1.15]"` |
| 102 | hex | `#2563EB` | `<span className="italic text-[#2563EB]">{ENTERPRISE_SALARY_RANGE} in Enterprise. {QUANT_FINTECH_SALARY_RANGE} in Quant Fintech.</span>` |
| 125 | hex | `#1B3F8B` | `<BorderBeam colorFrom="#1B3F8B" colorTo="#8A6D1F" duration={20} delay={0} borderWidth={1} className="opacity-0 group-hover:opacity-100" />` |
| 125 | hex | `#8A6D1F` | `<BorderBeam colorFrom="#1B3F8B" colorTo="#8A6D1F" duration={20} delay={0} borderWidth={1} className="opacity-0 group-hover:opacity-100" />` |
| 152 | hex | `#0F172A` | `<div className="rounded-2xl bg-[#0F172A] text-white p-6 sm:p-8 shadow-xl">` |
| 156 | hex | `#38BDF8` | `<div className="text-2xl sm:text-3xl font-extrabold text-[#38BDF8] tracking-tight">` |
| 177 | hex | `#2563EB` | `className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2563EB] text-white text-xs font-bold shadow-md hover:bg-blue-700 transition-colors"` |

### `src\components\landing\StudentQuestionBank.tsx` - 14

| Line | Kind | Value | Context |
|---:|---|---|---|
| 256 | hex | `#0056D2` | `<Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0056D2]" />` |
| 266 | hex | `#0056D2` | `className="w-full rounded-md border border-[#0056D2]/20 bg-white py-3 pl-11 pr-4 text-sm font-medium text-primary shadow-sm placeholder:text-[#52657f] outline-none transition focus` |
| 266 | hex | `#52657f` | `className="w-full rounded-md border border-[#0056D2]/20 bg-white py-3 pl-11 pr-4 text-sm font-medium text-primary shadow-sm placeholder:text-[#52657f] outline-none transition focus` |
| 266 | hex | `#0056D2` | `className="w-full rounded-md border border-[#0056D2]/20 bg-white py-3 pl-11 pr-4 text-sm font-medium text-primary shadow-sm placeholder:text-[#52657f] outline-none transition focus` |
| 266 | hex | `#0056D2` | `className="w-full rounded-md border border-[#0056D2]/20 bg-white py-3 pl-11 pr-4 text-sm font-medium text-primary shadow-sm placeholder:text-[#52657f] outline-none transition focus` |
| 285 | hex | `#0056D2` | `? "border-[#0056D2] bg-[#0056D2] text-slate-50"` |
| 285 | hex | `#0056D2` | `? "border-[#0056D2] bg-[#0056D2] text-slate-50"` |
| 286 | hex | `#0056D2` | `: "border-[#0056D2]/20 bg-white text-[#0056D2] hover:border-[#0056D2] hover:bg-[#EAF2FF]"` |
| 286 | hex | `#0056D2` | `: "border-[#0056D2]/20 bg-white text-[#0056D2] hover:border-[#0056D2] hover:bg-[#EAF2FF]"` |
| 286 | hex | `#0056D2` | `: "border-[#0056D2]/20 bg-white text-[#0056D2] hover:border-[#0056D2] hover:bg-[#EAF2FF]"` |
| 286 | hex | `#EAF2FF` | `: "border-[#0056D2]/20 bg-white text-[#0056D2] hover:border-[#0056D2] hover:bg-[#EAF2FF]"` |
| 314 | hex | `#F7FAFF` | `<div key={i} className={isOpen ? "bg-[#F7FAFF]" : "bg-white"}>` |
| 317 | hex | `#F7FAFF` | `className="flex min-h-[56px] w-full items-start justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-[#F7FAFF] focus-visible:outline-none focus-visible:ring-2 focus` |
| 317 | hex | `#0056D2` | `className="flex min-h-[56px] w-full items-start justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-[#F7FAFF] focus-visible:outline-none focus-visible:ring-2 focus` |

### `src\components\landing\StudentYearPaths.tsx` - 14

| Line | Kind | Value | Context |
|---:|---|---|---|
| 143 | hex | `#FAF9F6` | `<section id="student-pathways" className="py-16 sm:py-24 bg-[#FAF9F6] border-b border-stone-200">` |
| 147 | hex | `#1B3F8B` | `<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B3F8B]/10 border border-[#1B3F8B]/20 text-[#1B3F8B] font-mono text-xs font-bold uppercase tracking-wider` |
| 147 | hex | `#1B3F8B` | `<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B3F8B]/10 border border-[#1B3F8B]/20 text-[#1B3F8B] font-mono text-xs font-bold uppercase tracking-wider` |
| 147 | hex | `#1B3F8B` | `<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B3F8B]/10 border border-[#1B3F8B]/20 text-[#1B3F8B] font-mono text-xs font-bold uppercase tracking-wider` |
| 152 | hex | `#1B3F8B` | `Start Preparing <span className="italic text-[#1B3F8B]">Before You Graduate</span>` |
| 170 | hex | `#1B3F8B` | `? "bg-[#1B3F8B] text-slate-50 shadow-md font-sans"` |
| 201 | hex | `#1B3F8B` | `<span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">` |
| 235 | hex | `#1B3F8B` | `? "bg-[#1B3F8B] hover:bg-[#153270] text-slate-50 shadow-sm hover:shadow-md"` |
| 235 | hex | `#153270` | `? "bg-[#1B3F8B] hover:bg-[#153270] text-slate-50 shadow-sm hover:shadow-md"` |
| 249 | hex | `#8A6D1F` | `<div className="flex items-center gap-2 text-[#8A6D1F] font-mono text-xs font-bold uppercase tracking-wider">` |
| 281 | hex | `#1B3F8B` | `className="w-12 h-12 rounded-full object-cover object-top ring-2 ring-[#1B3F8B]/20 shrink-0"` |
| 288 | hex | `#1B3F8B` | `<span className="font-mono text-[9px] font-bold text-[#1B3F8B] bg-blue-50 border border-blue-200/80 px-2 py-0.5 rounded-full shrink-0">` |
| 300 | hex | `#1B3F8B` | `<p className="text-[11px] sm:text-xs text-stone-600 font-sans italic leading-relaxed border-l-2 border-[#1B3F8B]/40 pl-2.5">` |
| 308 | hex | `#1B3F8B` | `<span className="font-bold text-[#1B3F8B]">Train for Roles, Not Courses</span>` |

### `src\components\ui\PremiumChip.tsx` - 14

| Line | Kind | Value | Context |
|---:|---|---|---|
| 19 | hex | `#1B3F8B` | `"border-[#1B3F8B]/40 bg-[#1B3F8B]/15 text-[#1B3F8B] ring-1 ring-[#1B3F8B]/25 shadow-2xs font-extrabold",` |
| 19 | hex | `#1B3F8B` | `"border-[#1B3F8B]/40 bg-[#1B3F8B]/15 text-[#1B3F8B] ring-1 ring-[#1B3F8B]/25 shadow-2xs font-extrabold",` |
| 19 | hex | `#1B3F8B` | `"border-[#1B3F8B]/40 bg-[#1B3F8B]/15 text-[#1B3F8B] ring-1 ring-[#1B3F8B]/25 shadow-2xs font-extrabold",` |
| 19 | hex | `#1B3F8B` | `"border-[#1B3F8B]/40 bg-[#1B3F8B]/15 text-[#1B3F8B] ring-1 ring-[#1B3F8B]/25 shadow-2xs font-extrabold",` |
| 47 | hex | `#064E3B` | `return { color: "#FFFFFF", backgroundColor: "#064E3B", borderColor: "#10B981" };` |
| 47 | hex | `#10B981` | `return { color: "#FFFFFF", backgroundColor: "#064E3B", borderColor: "#10B981" };` |
| 49 | hex | `#78350F` | `return { color: "#78350F", backgroundColor: "#FEF3C7", borderColor: "#F59E0B" };` |
| 51 | hex | `#0C4A6E` | `return { color: "#0C4A6E", backgroundColor: "#E0F2FE", borderColor: "#38BDF8" };` |
| 51 | hex | `#38BDF8` | `return { color: "#0C4A6E", backgroundColor: "#E0F2FE", borderColor: "#38BDF8" };` |
| 53 | hex | `#0F172A` | `return { color: "#0F172A", backgroundColor: "#F1F5F9", borderColor: "#94A3B8" };` |
| 53 | hex | `#94A3B8` | `return { color: "#0F172A", backgroundColor: "#F1F5F9", borderColor: "#94A3B8" };` |
| 55 | hex | `#701A75` | `return { color: "#FFFFFF", backgroundColor: "#701A75", borderColor: "#E879F9" };` |
| 58 | hex | `#0F172A` | `return { color: "#FFFFFF", backgroundColor: "#0F172A", borderColor: "#38BDF8" };` |
| 58 | hex | `#38BDF8` | `return { color: "#FFFFFF", backgroundColor: "#0F172A", borderColor: "#38BDF8" };` |

### `src\routes\students.1st-2nd-year.tsx` - 14

| Line | Kind | Value | Context |
|---:|---|---|---|
| 24 | hex | `#FAF8F5` | `<div className="min-h-screen bg-[#FAF8F5] text-[#0B1325] font-sans pb-24">` |
| 24 | hex | `#0B1325` | `<div className="min-h-screen bg-[#FAF8F5] text-[#0B1325] font-sans pb-24">` |
| 29 | hex | `#1B3F8B` | `<GraduationCap className="h-4 w-4 text-[#1B3F8B]" />` |
| 30 | hex | `#1B3F8B` | `<span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">` |
| 62 | hex | `#1B3F8B` | `<p className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">` |
| 71 | hex | `#1B3F8B` | `className="text-xs font-mono font-bold uppercase text-[#1B3F8B] hover:underline flex items-center gap-1"` |
| 109 | hex | `#1B3F8B` | `<div className="h-10 w-10 rounded-lg bg-stone-100 flex items-center justify-center text-[#1B3F8B]">` |
| 118 | hex | `#1B3F8B` | `className="text-xs font-semibold text-[#1B3F8B] hover:text-[#0B1325] inline-flex items-center gap-1"` |
| 118 | hex | `#0B1325` | `className="text-xs font-semibold text-[#1B3F8B] hover:text-[#0B1325] inline-flex items-center gap-1"` |
| 133 | hex | `#1B3F8B` | `<p className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">` |
| 143 | hex | `#1B3F8B` | `<span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">` |
| 152 | hex | `#1B3F8B` | `<span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">` |
| 167 | hex | `#0B1325` | `className="px-5 py-2.5 rounded-lg bg-[#0B1325] hover:bg-[#1B3F8B] text-slate-50 font-mono text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-` |
| 167 | hex | `#1B3F8B` | `className="px-5 py-2.5 rounded-lg bg-[#0B1325] hover:bg-[#1B3F8B] text-slate-50 font-mono text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-` |

### `src\routes\students.4th-year.tsx` - 14

| Line | Kind | Value | Context |
|---:|---|---|---|
| 24 | hex | `#FAF8F5` | `<div className="min-h-screen bg-[#FAF8F5] text-[#0B1325] font-sans pb-24">` |
| 24 | hex | `#0B1325` | `<div className="min-h-screen bg-[#FAF8F5] text-[#0B1325] font-sans pb-24">` |
| 29 | hex | `#1B3F8B` | `<GraduationCap className="h-4 w-4 text-[#1B3F8B]" />` |
| 30 | hex | `#1B3F8B` | `<span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">` |
| 62 | hex | `#1B3F8B` | `<p className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">` |
| 71 | hex | `#1B3F8B` | `className="text-xs font-mono font-bold uppercase text-[#1B3F8B] hover:underline flex items-center gap-1"` |
| 114 | hex | `#1B3F8B` | `<span className="font-mono text-xs font-bold text-[#1B3F8B] bg-blue-50/80 px-2 py-0.5 rounded border border-blue-100">` |
| 127 | hex | `#1B3F8B` | `className="text-xs font-semibold text-[#1B3F8B] hover:text-[#0B1325] inline-flex items-center gap-1"` |
| 127 | hex | `#0B1325` | `className="text-xs font-semibold text-[#1B3F8B] hover:text-[#0B1325] inline-flex items-center gap-1"` |
| 142 | hex | `#8A6D1F` | `<div className="flex items-center gap-2 text-[#8A6D1F] font-mono text-xs font-bold uppercase tracking-wider">` |
| 155 | hex | `#0B1325` | `className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-[#0B1325] hover:bg-[#1B3F8B] text-slate-50 font-mono text-xs font-bold uppercase tracking-wider transition-colors ` |
| 155 | hex | `#1B3F8B` | `className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-[#0B1325] hover:bg-[#1B3F8B] text-slate-50 font-mono text-xs font-bold uppercase tracking-wider transition-colors ` |
| 176 | hex | `#0B1325` | `className="px-5 py-2.5 rounded-lg bg-[#0B1325] hover:bg-[#1B3F8B] text-slate-50 font-mono text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-` |
| 176 | hex | `#1B3F8B` | `className="px-5 py-2.5 rounded-lg bg-[#0B1325] hover:bg-[#1B3F8B] text-slate-50 font-mono text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-` |

### `src\components\acri\methodology\AcriEvidenceMaturityVisual.tsx` - 13

| Line | Kind | Value | Context |
|---:|---|---|---|
| 109 | hex | `#005B4F` | `<ShieldCheck className="h-4 w-4 text-[#005B4F]" />` |
| 110 | hex | `#005B4F` | `<span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#005B4F]">` |
| 122 | hex | `#FAF9F6` | `<div className="flex items-center gap-2 bg-[#FAF9F6] border border-stone-200 px-3 py-1.5 rounded-xl font-mono text-xs text-stone-700 self-start md:self-auto">` |
| 123 | hex | `#1B3F8B` | `<Clock className="h-3.5 w-3.5 text-[#1B3F8B]" />` |
| 138 | hex | `#0B1325` | `? "bg-[#0B1325] text-white border-[#0B1325] shadow-sm"` |
| 138 | hex | `#0B1325` | `? "bg-[#0B1325] text-white border-[#0B1325] shadow-sm"` |
| 177 | hex | `#005B4F` | `isActive ? "text-emerald-400" : "text-[#005B4F]"` |
| 189 | hex | `#FAF9F6` | `<div className="p-6 rounded-2xl bg-[#FAF9F6] border border-stone-200 space-y-4">` |
| 192 | hex | `#1B3F8B` | `<span className="font-mono text-[10px] font-bold text-[#1B3F8B] uppercase tracking-wider">` |
| 200 | hex | `#005B4F` | `<div className="font-mono text-xs font-bold text-[#005B4F] bg-[#E8F7F1] border border-[#005B4F]/20 px-3 py-1 rounded-lg self-start sm:self-auto">` |
| 200 | hex | `#E8F7F1` | `<div className="font-mono text-xs font-bold text-[#005B4F] bg-[#E8F7F1] border border-[#005B4F]/20 px-3 py-1 rounded-lg self-start sm:self-auto">` |
| 200 | hex | `#005B4F` | `<div className="font-mono text-xs font-bold text-[#005B4F] bg-[#E8F7F1] border border-[#005B4F]/20 px-3 py-1 rounded-lg self-start sm:self-auto">` |
| 217 | hex | `#005B4F` | `<CheckCircle2 className="h-4 w-4 text-[#005B4F] shrink-0 mt-0.5" />` |

### `src\components\acri\methodology\AcriTraitDimensionMatrixVisual.tsx` - 13

| Line | Kind | Value | Context |
|---:|---|---|---|
| 112 | hex | `#0B1325` | `? "bg-[#0B1325] text-white"` |
| 124 | hex | `#005B4F` | `? "bg-[#005B4F] text-white"` |
| 178 | hex | `#E8F7F1` | `} ${selectedDimension === d.id ? "bg-[#E8F7F1]/50 text-[#005B4F]" : ""}`}` |
| 178 | hex | `#005B4F` | `} ${selectedDimension === d.id ? "bg-[#E8F7F1]/50 text-[#005B4F]" : ""}`}` |
| 200 | hex | `#FAF9F6` | `? "bg-[#FAF9F6]"` |
| 228 | hex | `#E8F7F1` | `selectedDimension === d.id ? "bg-[#E8F7F1]/30" : ""` |
| 258 | hex | `#FAF9F6` | `<div className="p-4 rounded-xl bg-[#FAF9F6] border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">` |
| 260 | hex | `#1B3F8B` | `<div className="h-7 w-7 rounded-lg bg-[#1B3F8B] text-white flex items-center justify-center shrink-0">` |
| 297 | hex | `#005B4F` | `? "bg-[#005B4F] text-white"` |
| 299 | hex | `#005B4F` | `? "bg-[#005B4F]/80 text-white"` |
| 301 | hex | `#E8F7F1` | `? "bg-[#E8F7F1] text-[#005B4F] border border-[#005B4F]/30"` |
| 301 | hex | `#005B4F` | `? "bg-[#E8F7F1] text-[#005B4F] border border-[#005B4F]/30"` |
| 301 | hex | `#005B4F` | `? "bg-[#E8F7F1] text-[#005B4F] border border-[#005B4F]/30"` |

### `src\components\career\result\CareerCertificate\CertificateGenerator.tsx` - 13

| Line | Kind | Value | Context |
|---:|---|---|---|
| 236 | hex | `#D0E1FD` | `className="flex-1 rounded-xl border border-[#D0E1FD] bg-white tone-light px-3.5 py-2.5 text-sm text-[#071A4A] outline-hidden focus:ring-2 focus:ring-[#1557D6] min-h-11"` |
| 236 | hex | `#071A4A` | `className="flex-1 rounded-xl border border-[#D0E1FD] bg-white tone-light px-3.5 py-2.5 text-sm text-[#071A4A] outline-hidden focus:ring-2 focus:ring-[#1557D6] min-h-11"` |
| 236 | hex | `#1557D6` | `className="flex-1 rounded-xl border border-[#D0E1FD] bg-white tone-light px-3.5 py-2.5 text-sm text-[#071A4A] outline-hidden focus:ring-2 focus:ring-[#1557D6] min-h-11"` |
| 242 | hex | `#071A4A` | `className="flex-1 sm:flex-initial rounded-xl bg-[#071A4A] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#1557D6] min-h-11"` |
| 242 | hex | `#1557D6` | `className="flex-1 sm:flex-initial rounded-xl bg-[#071A4A] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#1557D6] min-h-11"` |
| 263 | hex | `#1557D6` | `className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1557D6] hover:underline"` |
| 278 | hex | `#071A4A` | `className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#071A4A] px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-[#1557D6] transition-all activ` |
| 278 | hex | `#1557D6` | `className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#071A4A] px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-[#1557D6] transition-all activ` |
| 289 | hex | `#D0E1FD` | `className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-5 py-3 text-sm font-bold text-[#1557D6] hover:bg-[#DCEBFE] tr` |
| 289 | hex | `#EEF6FF` | `className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-5 py-3 text-sm font-bold text-[#1557D6] hover:bg-[#DCEBFE] tr` |
| 289 | hex | `#1557D6` | `className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-5 py-3 text-sm font-bold text-[#1557D6] hover:bg-[#DCEBFE] tr` |
| 289 | hex | `#DCEBFE` | `className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-5 py-3 text-sm font-bold text-[#1557D6] hover:bg-[#DCEBFE] tr` |
| 298 | hex | `#69758A` | `<p className="text-center font-mono text-[11px] text-[#69758A]">` |

### `src\components\landing\CareerComparisonMatrix.tsx` - 13

| Line | Kind | Value | Context |
|---:|---|---|---|
| 19 | hex | `#070D1B` | `<section className="py-16 sm:py-24 bg-[#070D1B] text-slate-100 tone-dark border-b border-slate-800">` |
| 38 | hex | `#0B152C` | `<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto p-4 rounded-2xl bg-[#0B152C] border border-slate-800">` |
| 50 | hex | `#070D1B` | `className="w-full h-11 px-3 rounded-xl bg-[#070D1B] border border-slate-700 text-xs font-sans text-slate-100 focus:outline-none focus:border-sky-400 cursor-pointer"` |
| 71 | hex | `#070D1B` | `className="w-full h-11 px-3 rounded-xl bg-[#070D1B] border border-slate-700 text-xs font-sans text-slate-100 focus:outline-none focus:border-emerald-400 cursor-pointer"` |
| 83 | hex | `#0B152C` | `<div className="rounded-3xl border border-slate-800 bg-[#0B152C] overflow-hidden shadow-2xl">` |
| 87 | hex | `#070D1B` | `<tr className="bg-[#070D1B] border-b border-slate-800">` |
| 101 | hex | `#070D1B` | `<td className="p-4 sm:p-5 font-mono text-xs font-bold text-slate-400 uppercase bg-[#070D1B]/50">` |
| 113 | hex | `#070D1B` | `<td className="p-4 sm:p-5 font-mono text-xs font-bold text-slate-400 uppercase bg-[#070D1B]/50">` |
| 125 | hex | `#070D1B` | `<td className="p-4 sm:p-5 font-mono text-xs font-bold text-slate-400 uppercase bg-[#070D1B]/50">` |
| 137 | hex | `#070D1B` | `<td className="p-4 sm:p-5 font-mono text-xs font-bold text-slate-400 uppercase bg-[#070D1B]/50">` |
| 149 | hex | `#070D1B` | `<td className="p-4 sm:p-5 font-mono text-xs font-bold text-slate-400 uppercase bg-[#070D1B]/50">` |
| 165 | hex | `#0C1938` | `<div className="p-6 rounded-3xl bg-gradient-to-r from-[#0C1938] to-[#070D1B] border border-sky-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">` |
| 165 | hex | `#070D1B` | `<div className="p-6 rounded-3xl bg-gradient-to-r from-[#0C1938] to-[#070D1B] border border-sky-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">` |

### `src\components\landing\EnterpriseCurriculumStrip.tsx` - 13

| Line | Kind | Value | Context |
|---:|---|---|---|
| 87 | hex | `#FFFFFF` | `* Design: White background (#FFFFFF). 10-row comparison table mapping` |
| 96 | hex | `#1A1A1A` | `className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white tone-light text-[#1A1A1A] border-b border-stone-200"` |
| 106 | hex | `#1A1A1A` | `className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1A1A1A] tracking-tight leading-[1.18]"` |
| 109 | hex | `#1B3F8B` | `<span className="italic text-[#1B3F8B]">Not from a syllabus committee.</span>` |
| 121 | hex | `#1B3F8B` | `<tr className="bg-[#1B3F8B] text-white font-mono text-[11px] font-bold uppercase tracking-wider">` |
| 131 | hex | `#F7F5F0` | `className={idx % 2 === 0 ? "bg-white" : "bg-[#F7F5F0]"}` |
| 133 | hex | `#1A1A1A` | `<td className="py-3.5 px-4 sm:px-6 font-semibold text-[#1A1A1A] max-w-[200px]">` |
| 139 | hex | `#1B3F8B` | `<td className="py-3.5 px-4 sm:px-6 font-mono text-xs font-bold text-[#1B3F8B]">` |
| 155 | hex | `#1A1A1A` | `<h3 className="font-serif text-2xl font-bold text-[#1A1A1A] text-center sm:text-left">` |
| 163 | hex | `#F7F5F0` | `className="rounded-2xl border border-stone-300 bg-[#F7F5F0] p-6 space-y-4 flex flex-col justify-between"` |
| 167 | hex | `#1B3F8B` | `style={{ backgroundColor: "#1B3F8B", color: "#FFFFFF" }}` |
| 172 | hex | `#1A1A1A` | `<h4 className="font-serif text-lg font-bold text-[#1A1A1A]">{step.title}</h4>` |
| 179 | hex | `#1B3F8B` | `<CheckCircle2 className="h-3.5 w-3.5 text-[#1B3F8B] shrink-0" />` |

### `src\components\landing\LiveOpportunityBoard.tsx` - 13

| Line | Kind | Value | Context |
|---:|---|---|---|
| 40 | hex | `#FAF9F5` | `className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF9F5] text-[#0F2942] border-b border-stone-200"` |
| 40 | hex | `#0F2942` | `className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF9F5] text-[#0F2942] border-b border-stone-200"` |
| 46 | hex | `#0F2942` | `<span className="font-mono text-[11px] font-bold tracking-widest text-[#0F2942] uppercase block">` |
| 51 | hex | `#0F2942` | `className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#0F2942] tracking-tight leading-tight"` |
| 54 | hex | `#1B3F8B` | `<span className="italic font-normal text-[#1B3F8B]">Check whether your profile qualifies.</span>` |
| 62 | hex | `#0F2942` | `<div className="flex items-center gap-2 text-[#0F2942] font-semibold">` |
| 80 | hex | `#0F2942` | `<span className="px-2 py-0.5 rounded bg-[#0F2942] text-slate-50 font-mono text-[10px] font-bold uppercase tracking-wider">` |
| 100 | hex | `#0F2942` | `<h3 className="font-serif text-2xl font-bold text-[#0F2942] tracking-tight mt-1">` |
| 147 | hex | `#0F2942` | `className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-sans font-bold text-xs sm:text-sm text-slate-50 bg-[#0F2942] hover:bg-[#153270] shadow-2xs` |
| 147 | hex | `#153270` | `className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-sans font-bold text-xs sm:text-sm text-slate-50 bg-[#0F2942] hover:bg-[#153270] shadow-2xs` |
| 163 | hex | `#0F2942` | `<h4 className="font-serif text-lg font-bold text-[#0F2942]">` |
| 175 | hex | `#0F2942` | `className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-sans font-bold text-xs sm:text-sm text-[#0F2942] bg-stone-100 hover:bg-stone-200 border border-st` |
| 178 | hex | `#0F2942` | `<ArrowRight className="w-4 h-4 text-[#0F2942]" />` |

### `src\components\landing\PractitionerMentorsProof.tsx` - 13

| Line | Kind | Value | Context |
|---:|---|---|---|
| 57 | hex | `#1A1A1A` | `<h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">` |
| 71 | hex | `#1B3F8B` | `<ArrowRight className="h-4 w-4 text-[#1B3F8B]" />` |
| 83 | hex | `#FAF8F5` | `className="rounded-3xl border border-stone-200 bg-[#FAF8F5] p-5 sm:p-6 space-y-2 shadow-xs hover:border-[#1B3F8B]/40 hover:shadow-lg transition-all"` |
| 83 | hex | `#1B3F8B` | `className="rounded-3xl border border-stone-200 bg-[#FAF8F5] p-5 sm:p-6 space-y-2 shadow-xs hover:border-[#1B3F8B]/40 hover:shadow-lg transition-all"` |
| 86 | hex | `#1B3F8B` | `<span className="font-mono text-2xl sm:text-3xl font-bold text-[#1B3F8B] block">` |
| 91 | hex | `#1A1A1A` | `<p className="font-serif text-base font-bold text-[#1A1A1A]">` |
| 112 | hex | `#FAF8F5` | `className="relative rounded-3xl border border-stone-200 bg-[#FAF8F5] p-6 sm:p-7 space-y-5 shadow-xs flex flex-col justify-between hover:border-[#1B3F8B]/40 hover:shadow-xl transiti` |
| 112 | hex | `#1B3F8B` | `className="relative rounded-3xl border border-stone-200 bg-[#FAF8F5] p-6 sm:p-7 space-y-5 shadow-xs flex flex-col justify-between hover:border-[#1B3F8B]/40 hover:shadow-xl transiti` |
| 114 | hex | `#1B3F8B` | `<BorderBeam size={180} duration={14} delay={idx * 3} colorFrom="#1B3F8B" colorTo="#8A6D1F" />` |
| 114 | hex | `#8A6D1F` | `<BorderBeam size={180} duration={14} delay={idx * 3} colorFrom="#1B3F8B" colorTo="#8A6D1F" />` |
| 119 | hex | `#8A6D1F` | `<span className="font-mono text-[10px] font-bold text-[#8A6D1F] uppercase tracking-wider block bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-md">` |
| 123 | hex | `#1A1A1A` | `<h3 className="font-serif text-xl font-bold text-[#1A1A1A] pt-1">` |
| 126 | hex | `#1B3F8B` | `<p className="text-xs font-bold text-[#1B3F8B] font-sans">` |

### `src\components\landing\PreparationArchitecture.tsx` - 13

| Line | Kind | Value | Context |
|---:|---|---|---|
| 60 | hex | `#1A1A1A` | `<h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">` |
| 71 | hex | `#1B3F8B` | `className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-slate-50 font-bold text-xs transition-all shadow-sm cursor-pointer hover:shadow-` |
| 71 | hex | `#153270` | `className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-slate-50 font-bold text-xs transition-all shadow-sm cursor-pointer hover:shadow-` |
| 89 | hex | `#FAF8F5` | `className="rounded-3xl border border-stone-200 bg-[#FAF8F5] p-6 space-y-5 shadow-xs flex flex-col justify-between hover:border-[#1B3F8B]/40 hover:shadow-xl transition-all h-full"` |
| 89 | hex | `#1B3F8B` | `className="rounded-3xl border border-stone-200 bg-[#FAF8F5] p-6 space-y-5 shadow-xs flex flex-col justify-between hover:border-[#1B3F8B]/40 hover:shadow-xl transition-all h-full"` |
| 93 | hex | `#1B3F8B` | `<span className="font-mono text-xs font-bold text-[#1B3F8B] bg-sky-50 border border-sky-200 px-2.5 py-0.5 rounded-md shadow-2xs">` |
| 104 | hex | `#1B3F8B` | `<div className="flex items-center gap-2 text-[#1B3F8B]">` |
| 106 | hex | `#1A1A1A` | `<h3 className="font-serif text-xl font-bold text-[#1A1A1A]">` |
| 133 | hex | `#FAF8F5` | `className="rounded-3xl border border-stone-200 bg-[#FAF8F5] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs hover:shadow-lg transition-all"` |
| 136 | hex | `#1B3F8B` | `<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-[#1B3F8B] shrink-0 shadow-2xs">` |
| 140 | hex | `#1A1A1A` | `<h4 className="font-serif text-lg sm:text-xl font-bold text-[#1A1A1A]">` |
| 144 | hex | `#1B3F8B` | `Every candidate certificate and project dossier includes a unique cryptographic verification hash on our public ledger at <span className="font-mono text-[#1B3F8B]">arzonglobal.com` |
| 155 | hex | `#1B3F8B` | `<ArrowRight className="h-3.5 w-3.5 text-[#1B3F8B]" />` |

### `src\components\landing\ProblemBlock.tsx` - 13

| Line | Kind | Value | Context |
|---:|---|---|---|
| 8 | hex | `#F2EFE9` | `* Design: Off-white background (#F2EFE9), slightly darker than the hero.` |
| 35 | hex | `#F2EFE9` | `className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#F2EFE9] text-[#1A1A1A] border-b border-stone-300/80"` |
| 35 | hex | `#1A1A1A` | `className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#F2EFE9] text-[#1A1A1A] border-b border-stone-300/80"` |
| 45 | hex | `#1A1A1A` | `className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1A1A1A] tracking-tight leading-[1.15]"` |
| 48 | hex | `#1B3F8B` | `<span className="italic text-[#1B3F8B]">Not because they're untalented. Because recruiters test skills that colleges never teach.</span>` |
| 73 | hex | `#991B1B` | `style={{ color: "#991B1B", backgroundColor: "#FEE2E2", borderColor: "#FCA5A5" }}` |
| 135 | hex | `#1A1A1A` | `<p className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">` |
| 146 | hex | `#1B3F8B` | `<motion.div variants={itemVariants} className="rounded-2xl border border-stone-300 bg-white tone-light p-6 space-y-2 border-l-4 border-l-[#1B3F8B]">` |
| 147 | hex | `#1B3F8B` | `<p className="font-serif text-3xl sm:text-4xl font-bold text-[#1B3F8B]">` |
| 150 | hex | `#1B3F8B` | `<p className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#1B3F8B]">` |
| 159 | hex | `#1A1A1A` | `<p className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">` |
| 177 | hex | `#F7F5F0` | `className="rounded-2xl border border-stone-300 bg-[#F7F5F0] p-6 text-center max-w-3xl mx-auto"` |
| 179 | hex | `#1A1A1A` | `<p className="text-base sm:text-lg font-serif italic text-[#1A1A1A]">` |

### `src\components\landing\StickyMobileCTA.tsx` - 13

| Line | Kind | Value | Context |
|---:|---|---|---|
| 117 | hex | `#0A0F1E` | `className="pointer-events-auto mx-3 mb-3 flex items-center gap-2 rounded-full border border-slate-200/15 bg-[#0A0F1E] px-2 py-2 sm:mx-auto sm:max-w-md"` |
| 120 | rgba | `rgba(255,255,255,0.08)` | `"inset 0 1px 0 rgba(255,255,255,0.08), 0 -1px 2px rgba(0,0,0,0.3), 0 -16px 48px -12px rgba(0,0,0,0.7), 0 8px 24px -8px rgba(15,27,61,0.6)",` |
| 120 | rgba | `rgba(0,0,0,0.3)` | `"inset 0 1px 0 rgba(255,255,255,0.08), 0 -1px 2px rgba(0,0,0,0.3), 0 -16px 48px -12px rgba(0,0,0,0.7), 0 8px 24px -8px rgba(15,27,61,0.6)",` |
| 120 | rgba | `rgba(0,0,0,0.7)` | `"inset 0 1px 0 rgba(255,255,255,0.08), 0 -1px 2px rgba(0,0,0,0.3), 0 -16px 48px -12px rgba(0,0,0,0.7), 0 8px 24px -8px rgba(15,27,61,0.6)",` |
| 120 | rgba | `rgba(15,27,61,0.6)` | `"inset 0 1px 0 rgba(255,255,255,0.08), 0 -1px 2px rgba(0,0,0,0.3), 0 -16px 48px -12px rgba(0,0,0,0.7), 0 8px 24px -8px rgba(15,27,61,0.6)",` |
| 126 | hex | `#3b6fa0` | `className="flex h-10 w-10 max-[375px]:h-9 max-[375px]:w-9 shrink-0 items-center justify-center rounded-full bg-[#3b6fa0]/15 text-[#7fb0d8] ring-1 ring-[#3b6fa0]/30 transition-all d` |
| 126 | hex | `#7fb0d8` | `className="flex h-10 w-10 max-[375px]:h-9 max-[375px]:w-9 shrink-0 items-center justify-center rounded-full bg-[#3b6fa0]/15 text-[#7fb0d8] ring-1 ring-[#3b6fa0]/30 transition-all d` |
| 126 | hex | `#3b6fa0` | `className="flex h-10 w-10 max-[375px]:h-9 max-[375px]:w-9 shrink-0 items-center justify-center rounded-full bg-[#3b6fa0]/15 text-[#7fb0d8] ring-1 ring-[#3b6fa0]/30 transition-all d` |
| 126 | hex | `#3b6fa0` | `className="flex h-10 w-10 max-[375px]:h-9 max-[375px]:w-9 shrink-0 items-center justify-center rounded-full bg-[#3b6fa0]/15 text-[#7fb0d8] ring-1 ring-[#3b6fa0]/30 transition-all d` |
| 126 | hex | `#3b6fa0` | `className="flex h-10 w-10 max-[375px]:h-9 max-[375px]:w-9 shrink-0 items-center justify-center rounded-full bg-[#3b6fa0]/15 text-[#7fb0d8] ring-1 ring-[#3b6fa0]/30 transition-all d` |
| 126 | hex | `#7fb0d8` | `className="flex h-10 w-10 max-[375px]:h-9 max-[375px]:w-9 shrink-0 items-center justify-center rounded-full bg-[#3b6fa0]/15 text-[#7fb0d8] ring-1 ring-[#3b6fa0]/30 transition-all d` |
| 126 | hex | `#0A0F1E` | `className="flex h-10 w-10 max-[375px]:h-9 max-[375px]:w-9 shrink-0 items-center justify-center rounded-full bg-[#3b6fa0]/15 text-[#7fb0d8] ring-1 ring-[#3b6fa0]/30 transition-all d` |
| 174 | hex | `#0A0F1E` | `className="flex h-10 w-10 max-[375px]:h-9 max-[375px]:w-9 shrink-0 items-center justify-center rounded-full text-slate-100/60 transition-all duration-200 hover:bg-slate-50/10 hover` |

### `src\components\learn\PlayerLayout.tsx` - 13

| Line | Kind | Value | Context |
|---:|---|---|---|
| 130 | hex | `#0f172a` | `<div className="min-h-app bg-[#0f172a] text-white">` |
| 132 | hex | `#0f172a` | `<header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-3 border-b border-white/10 bg-[#0f172a]/95 px-3 backdrop-blur sm:px-5">` |
| 197 | hex | `#0b1220` | `} border-r border-white/10 bg-[#0b1220] lg:block`}` |
| 303 | rgba | `rgba(59,130,246,0.6)` | `style={{ boxShadow: "0 8px 24px -8px rgba(59,130,246,0.6)" }}` |
| 335 | hex | `#0b1220` | `<aside className="hidden border-l border-white/10 bg-[#0b1220] p-5 lg:block">` |
| 464 | hex | `#0b1220` | `className="w-full border-l border-white/10 bg-[#0b1220] text-white sm:max-w-md"` |
| 618 | hex | `#0a0c10` | `<div className="aspect-video w-full overflow-hidden rounded-2xl bg-[#0a0c10] ring-1 ring-white/10">` |
| 719 | rgba | `rgba(59,130,246,0.6)` | `style={{ boxShadow: "0 8px 24px -8px rgba(59,130,246,0.6)" }}` |
| 778 | hex | `#0b1220` | `className="mt-4 h-28 w-full resize-none rounded-xl border border-white/10 bg-[#0b1220] p-3 text-xs text-white outline-none ring-amber-300/30 placeholder:text-slate-500 focus:ring-2` |
| 784 | hex | `#0b1220` | `className="mt-3 h-11 w-full rounded-full border border-white/10 bg-[#0b1220] px-4 text-xs text-white outline-none ring-amber-300/30 placeholder:text-slate-500 focus:ring-2"` |
| 792 | hex | `#1A1300` | `className="rounded-full bg-amber-400 text-[#1A1300] hover:bg-amber-300"` |
| 879 | hex | `#0b1220` | `className="mt-4 h-28 w-full resize-none rounded-xl border border-white/10 bg-[#0b1220] p-3 text-xs text-white outline-none ring-blue-400/30 placeholder:text-slate-500 focus:ring-2"` |
| 885 | hex | `#0b1220` | `className="mt-3 h-11 w-full rounded-full border border-white/10 bg-[#0b1220] px-4 text-xs text-white outline-none ring-blue-400/30 placeholder:text-slate-500 focus:ring-2"` |

### `src\components\workshop\ArzonEventCaseStudy.tsx` - 13

| Line | Kind | Value | Context |
|---:|---|---|---|
| 69 | hex | `#122238` | `className="w-full py-16 sm:py-20 bg-[var(--color-case-dark)] tone-dark border-y border-[#122238] text-left text-[var(--color-warm-paper)] overflow-hidden"` |
| 99 | hex | `#0B172B` | `<div className="rounded-2xl border border-white/10 bg-[#0B172B] shadow-2xl overflow-hidden">` |
| 101 | hex | `#081324` | `<div className="px-5 sm:px-8 py-4 bg-[#081324] border-b border-white/10 flex flex-wrap items-center justify-between gap-4">` |
| 118 | hex | `#071120` | `<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-b border-white/10 bg-[#071120]">` |
| 129 | hex | `#102444` | `? "bg-[#102444] text-white"` |
| 159 | hex | `#0A1628` | `<div className="p-6 sm:p-8 lg:p-10 bg-[#0A1628] min-h-[380px] flex flex-col justify-between">` |
| 201 | hex | `#081220` | `<div className="p-4 rounded-xl bg-[#081220] border border-white/10 space-y-2">` |
| 298 | hex | `#081220` | `<div className="p-5 rounded-xl bg-[#081220] border border-white/10 space-y-3">` |
| 314 | hex | `#081220` | `<div className="p-5 rounded-xl bg-[#081220] border border-white/10 space-y-3">` |
| 360 | hex | `#081220` | `<div className="p-5 rounded-xl bg-[#081220] border border-white/10 space-y-4 font-mono text-xs">` |
| 417 | hex | `#081220` | `<div className="p-4 rounded-xl bg-[#081220] border border-white/10 space-y-2">` |
| 429 | hex | `#081220` | `<div className="p-4 rounded-xl bg-[#081220] border border-white/10 space-y-2 font-mono text-[11px]">` |
| 491 | hex | `#163c75` | `className="inline-flex items-center gap-2 py-3 px-5 rounded-xl bg-[var(--color-medical-navy)] hover:bg-[#163c75] border border-white/20 text-white font-mono text-xs font-bold upper` |

### `src\routes\enrol.$tier.tsx` - 13

| Line | Kind | Value | Context |
|---:|---|---|---|
| 186 | hex | `#1B3F8B` | `<span className="text-[#1B3F8B] italic font-normal">` |
| 192 | hex | `#1B3F8B` | `<p className="mt-2 text-xs font-semibold text-[#1B3F8B]">Programme: {selectedCourse.title}</p>` |
| 197 | hex | `#1B3F8B` | `<ShieldCheck className="h-5 w-5 shrink-0 text-[#1B3F8B]" />` |
| 282 | hex | `#1B3F8B` | `className="min-w-[220px] rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-white font-bold text-sm h-12 shadow-md cursor-pointer disabled:opacity-80 transition-all"` |
| 282 | hex | `#153270` | `className="min-w-[220px] rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-white font-bold text-sm h-12 shadow-md cursor-pointer disabled:opacity-80 transition-all"` |
| 302 | hex | `#8A6D1F` | `<p className="font-mono text-xs font-bold uppercase tracking-widest text-[#8A6D1F]">` |
| 305 | hex | `#1A1A1A` | `<h3 className="font-serif text-2xl font-bold text-[#1A1A1A] mt-0.5">{meta.name}</h3>` |
| 309 | hex | `#1B3F8B` | `<span className="font-serif text-2xl font-bold text-[#1B3F8B] tabular-nums">` |
| 332 | hex | `#8A6D1F` | `<ShieldCheck className="h-6 w-6 text-[#8A6D1F] shrink-0" />` |
| 334 | hex | `#1A1A1A` | `<p className="text-xs font-bold text-[#1A1A1A]">ISO 9001 Issuer · MCA Registered</p>` |
| 377 | hex | `#1B3F8B` | `{Icon && <Icon className="h-3.5 w-3.5 text-[#1B3F8B]" />}` |
| 393 | hex | `#1B3F8B` | `className="h-11 rounded-xl border border-[var(--arzon-border)] bg-[var(--arzon-surface)]/50 text-[var(--arzon-ink-soft)] font-medium placeholder:text-[var(--arzon-ink-soft)] focus:` |
| 393 | hex | `#1B3F8B` | `className="h-11 rounded-xl border border-[var(--arzon-border)] bg-[var(--arzon-surface)]/50 text-[var(--arzon-ink-soft)] font-medium placeholder:text-[var(--arzon-ink-soft)] focus:` |

### `src\routes\locations.hyderabad.tsx` - 13

| Line | Kind | Value | Context |
|---:|---|---|---|
| 45 | hex | `#FAF8F5` | `<div className="min-h-screen bg-[#FAF8F5] text-[#0B1325] font-sans pb-24">` |
| 45 | hex | `#0B1325` | `<div className="min-h-screen bg-[#FAF8F5] text-[#0B1325] font-sans pb-24">` |
| 50 | hex | `#1B3F8B` | `<MapPin className="h-4 w-4 text-[#1B3F8B]" />` |
| 51 | hex | `#1B3F8B` | `<span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">` |
| 82 | hex | `#1B3F8B` | `<p className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">` |
| 109 | hex | `#1B3F8B` | `<Building2 className="h-4 w-4 text-[#1B3F8B] shrink-0" />` |
| 113 | hex | `#8A6D1F` | `<span className="font-mono text-[10px] font-bold text-[#8A6D1F] bg-amber-50 px-2 py-0.5 rounded border border-amber-200 block w-fit">` |
| 166 | hex | `#1B3F8B` | `<span className="font-mono text-xs font-bold text-[#1B3F8B] bg-blue-50/80 border border-blue-100 px-2.5 py-0.5 rounded inline-block">` |
| 187 | hex | `#0B1325` | `className="inline-flex items-center justify-between w-full h-10 px-4 rounded-lg bg-[#0B1325] hover:bg-[#1B3F8B] text-slate-50 font-mono text-xs font-bold uppercase tracking-wider t` |
| 187 | hex | `#1B3F8B` | `className="inline-flex items-center justify-between w-full h-10 px-4 rounded-lg bg-[#0B1325] hover:bg-[#1B3F8B] text-slate-50 font-mono text-xs font-bold uppercase tracking-wider t` |
| 202 | hex | `#8A6D1F` | `<span className="font-mono text-xs font-bold uppercase tracking-wider text-[#8A6D1F]">` |
| 214 | hex | `#0B1325` | `className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-[#0B1325] hover:bg-[#1B3F8B] text-slate-50 font-mono text-xs font-bold uppercase tracking-wider transition-colors ` |
| 214 | hex | `#1B3F8B` | `className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-[#0B1325] hover:bg-[#1B3F8B] text-slate-50 font-mono text-xs font-bold uppercase tracking-wider transition-colors ` |

### `src\routes\resources.tsx` - 13

| Line | Kind | Value | Context |
|---:|---|---|---|
| 26 | hex | `#FAF9F6` | `<div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans selection:bg-[#1B3F8B] selection:text-white pb-24">` |
| 26 | hex | `#1B3F8B` | `<div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans selection:bg-[#1B3F8B] selection:text-white pb-24">` |
| 56 | hex | `#1B3F8B` | `className="bg-white tone-light card-light border border-stone-300 rounded-xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#1B3F8B] transition-colors shadow-sm"` |
| 60 | hex | `#1B3F8B` | `<span className="font-mono text-[10px] font-bold text-[#1B3F8B] uppercase tracking-wider bg-stone-100 px-2.5 py-1 rounded border border-stone-200">` |
| 68 | hex | `#0B1325` | `<h2 className="font-serif text-xl font-bold text-[#0B1325] leading-snug">` |
| 72 | hex | `#1B3F8B` | `className="hover:text-[#1B3F8B] transition-colors"` |
| 79 | hex | `#FAF9F6` | `<div className="mt-4 bg-[#FAF9F6] border-l-2 border-[#1B3F8B] p-3 rounded-r text-xs text-stone-700 font-sans leading-relaxed">` |
| 79 | hex | `#1B3F8B` | `<div className="mt-4 bg-[#FAF9F6] border-l-2 border-[#1B3F8B] p-3 rounded-r text-xs text-stone-700 font-sans leading-relaxed">` |
| 80 | hex | `#0B1325` | `<strong className="text-[#0B1325] font-mono text-[10px] block mb-1 uppercase">EXECUTIVE GROUNDING FINDING:</strong>` |
| 102 | hex | `#0B1325` | `className="inline-flex items-center gap-1.5 bg-[#0B1325] hover:bg-[#1B3F8B] text-white px-4 py-2 rounded text-xs font-mono font-bold uppercase tracking-wider transition-colors"` |
| 102 | hex | `#1B3F8B` | `className="inline-flex items-center gap-1.5 bg-[#0B1325] hover:bg-[#1B3F8B] text-white px-4 py-2 rounded text-xs font-mono font-bold uppercase tracking-wider transition-colors"` |
| 112 | hex | `#0B1325` | `<section className="mt-16 bg-[#0B1325] text-white rounded-2xl p-8 sm:p-12 text-center">` |
| 125 | hex | `#0B1325` | `className="inline-flex items-center gap-2 bg-white tone-light hover:bg-stone-100 text-[#0B1325] px-6 py-3 rounded text-xs font-mono font-bold uppercase tracking-wider transition-co` |

### `src\components\acri\methodology\AcriAssessmentArchitectureVisual.tsx` - 12

| Line | Kind | Value | Context |
|---:|---|---|---|
| 155 | hex | `#005B4F` | `<div className="font-serif font-bold text-2xl text-[#005B4F] mt-1">13 Traits</div>` |
| 179 | hex | `#005B4F` | `<div className="bg-[#005B4F] h-full w-[50%]" title="Clinical Case Vignettes (50%)" />` |
| 180 | hex | `#1B3F8B` | `<div className="bg-[#1B3F8B] h-full w-[30%]" title="Situational Judgment (30%)" />` |
| 181 | hex | `#D4AF37` | `<div className="bg-[#D4AF37] h-full w-[20%]" title="Regulatory Precision (20%)" />` |
| 194 | hex | `#FAF9F6` | `? "bg-[#FAF9F6] border-[#005B4F] ring-2 ring-[#005B4F]/20 shadow-xs"` |
| 194 | hex | `#005B4F` | `? "bg-[#FAF9F6] border-[#005B4F] ring-2 ring-[#005B4F]/20 shadow-xs"` |
| 194 | hex | `#005B4F` | `? "bg-[#FAF9F6] border-[#005B4F] ring-2 ring-[#005B4F]/20 shadow-xs"` |
| 205 | hex | `#005B4F` | `? "bg-[#005B4F]"` |
| 207 | hex | `#1B3F8B` | `? "bg-[#1B3F8B]"` |
| 208 | hex | `#D4AF37` | `: "bg-[#D4AF37]"` |
| 225 | hex | `#FAF9F6` | `<div className="p-6 rounded-2xl bg-[#FAF9F6] border border-stone-200 space-y-4">` |
| 228 | hex | `#005B4F` | `<span className="font-mono text-xs font-bold text-[#005B4F] uppercase tracking-wider">` |

### `src\components\acri\methodology\AcriFiveDimensionsVisual.tsx` - 12

| Line | Kind | Value | Context |
|---:|---|---|---|
| 145 | hex | `#005B4F` | `? "bg-white card-light tone-light border-[#005B4F] shadow-sm ring-2 ring-[#005B4F]/20"` |
| 145 | hex | `#005B4F` | `? "bg-white card-light tone-light border-[#005B4F] shadow-sm ring-2 ring-[#005B4F]/20"` |
| 157 | hex | `#005B4F` | `? "bg-[#005B4F] text-white"` |
| 172 | hex | `#005B4F` | `<span className="font-mono text-xs font-bold text-[#005B4F]">` |
| 185 | hex | `#0B1325` | `<div className="h-12 w-12 rounded-xl bg-[#0B1325] text-white flex items-center justify-center font-serif font-bold text-lg shrink-0">` |
| 190 | hex | `#1B3F8B` | `<span className="font-mono text-[10px] font-bold text-[#1B3F8B] uppercase tracking-wider">` |
| 204 | hex | `#E8F7F1` | `<div className="bg-[#E8F7F1] border border-[#005B4F]/20 px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold text-[#005B4F] self-start md:self-auto">` |
| 204 | hex | `#005B4F` | `<div className="bg-[#E8F7F1] border border-[#005B4F]/20 px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold text-[#005B4F] self-start md:self-auto">` |
| 204 | hex | `#005B4F` | `<div className="bg-[#E8F7F1] border border-[#005B4F]/20 px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold text-[#005B4F] self-start md:self-auto">` |
| 210 | hex | `#FAF9F6` | `<div className="mt-6 p-4 rounded-xl bg-[#FAF9F6] border border-stone-200">` |
| 225 | hex | `#1B3F8B` | `<FileSpreadsheet className="h-3.5 w-3.5 text-[#1B3F8B]" />` |
| 253 | hex | `#005B4F` | `<CheckCircle2 className="h-4 w-4 text-[#005B4F] shrink-0 mt-0.5" />` |

### `src\components\acri\methodology\AcriReadinessScaleVisual.tsx` - 12

| Line | Kind | Value | Context |
|---:|---|---|---|
| 62 | hex | `#1B3F8B` | `themeColor: "text-[#1B3F8B]",` |
| 64 | hex | `#1B3F8B` | `borderTone: "border-[#1B3F8B]/30",` |
| 111 | hex | `#FAF9F6` | `<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-[#FAF9F6] border border-stone-200">` |
| 114 | hex | `#005B4F` | `<span className="font-mono text-xs font-bold text-[#005B4F] uppercase tracking-wider">` |
| 128 | hex | `#005B4F` | `<span className="font-serif font-bold text-2xl text-[#005B4F]">80 / 100</span>` |
| 146 | hex | `#E8F7F1` | `? "bg-[#E8F7F1]/40 border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm"` |
| 147 | hex | `#1B3F8B` | `: "bg-white border-[#1B3F8B] ring-2 ring-[#1B3F8B]/20 shadow-sm"` |
| 147 | hex | `#1B3F8B` | `: "bg-white border-[#1B3F8B] ring-2 ring-[#1B3F8B]/20 shadow-sm"` |
| 170 | hex | `#005B4F` | `<div className="font-mono text-[11px] text-[#005B4F] font-semibold mt-0.5">` |
| 191 | hex | `#FAF9F6` | `<div className="p-6 rounded-2xl bg-[#FAF9F6] border border-stone-200 space-y-6">` |
| 199 | hex | `#005B4F` | `<span className="font-mono text-xs font-bold text-[#005B4F]">` |
| 241 | hex | `#005B4F` | `<CheckCircle2 className="h-4 w-4 text-[#005B4F] shrink-0" />` |

### `src\components\career\result\ReferralSuite\CareerIdentityCard.tsx` - 12

| Line | Kind | Value | Context |
|---:|---|---|---|
| 41 | hex | `#070D1E` | `className="relative w-full max-w-[420px] aspect-[9/16] bg-[#070D1E] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl border-2 border-[#1557D6]/40 overflow` |
| 41 | hex | `#1557D6` | `className="relative w-full max-w-[420px] aspect-[9/16] bg-[#070D1E] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl border-2 border-[#1557D6]/40 overflow` |
| 44 | rgba | `rgba(21, 87, 214, 0.3)` | `"radial-gradient(circle at 50% 10%, rgba(21, 87, 214, 0.3), transparent 60%), radial-gradient(circle at 50% 90%, rgba(7, 26, 74, 0.8), transparent 70%)",` |
| 44 | rgba | `rgba(7, 26, 74, 0.8)` | `"radial-gradient(circle at 50% 10%, rgba(21, 87, 214, 0.3), transparent 60%), radial-gradient(circle at 50% 90%, rgba(7, 26, 74, 0.8), transparent 70%)",` |
| 54 | hex | `#D4AF37` | `<span className="font-mono text-[9px] uppercase tracking-widest text-[#D4AF37] font-bold bg-[#D4AF37]/10 px-2.5 py-1 rounded-full border border-[#D4AF37]/30">` |
| 54 | hex | `#D4AF37` | `<span className="font-mono text-[9px] uppercase tracking-widest text-[#D4AF37] font-bold bg-[#D4AF37]/10 px-2.5 py-1 rounded-full border border-[#D4AF37]/30">` |
| 54 | hex | `#D4AF37` | `<span className="font-mono text-[9px] uppercase tracking-widest text-[#D4AF37] font-bold bg-[#D4AF37]/10 px-2.5 py-1 rounded-full border border-[#D4AF37]/30">` |
| 73 | hex | `#1557D6` | `<div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#1557D6] bg-[#1557D6]/20 px-4 py-1.5 shadow-sm">` |
| 73 | hex | `#1557D6` | `<div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#1557D6] bg-[#1557D6]/20 px-4 py-1.5 shadow-sm">` |
| 77 | hex | `#EEF6FF` | `<span className="text-[10px] font-mono uppercase tracking-wider text-[#EEF6FF]">` |
| 89 | hex | `#1557D6` | `<Sparkles className="h-2.5 w-2.5 text-[#1557D6]" />` |
| 99 | hex | `#D4AF37` | `<span className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#D4AF37] block">` |

### `src\components\career\result\ReferralSuite\ReferralProgress.tsx` - 12

| Line | Kind | Value | Context |
|---:|---|---|---|
| 27 | hex | `#E4EAF2` | `<section className="rounded-3xl border border-[#E4EAF2] bg-[#FAFBFD] p-6 sm:p-8 shadow-xs">` |
| 27 | hex | `#FAFBFD` | `<section className="rounded-3xl border border-[#E4EAF2] bg-[#FAFBFD] p-6 sm:p-8 shadow-xs">` |
| 28 | hex | `#E4EAF2` | `<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E4EAF2] pb-5">` |
| 30 | hex | `#EEF6FF` | `<div className="grid h-8 w-8 place-items-center rounded-lg bg-[#EEF6FF] text-[#1557D6]">` |
| 30 | hex | `#1557D6` | `<div className="grid h-8 w-8 place-items-center rounded-lg bg-[#EEF6FF] text-[#1557D6]">` |
| 34 | hex | `#1557D6` | `<span className="text-[11px] font-mono uppercase tracking-wider text-[#1557D6] font-bold">` |
| 37 | hex | `#071A4A` | `<h3 className="font-serif text-xl font-bold text-[#071A4A]">` |
| 60 | hex | `#3F4A60` | `<p className="text-sm text-[#3F4A60] leading-relaxed">` |
| 75 | hex | `#1557D6` | `className="h-full bg-[#1557D6] transition-all duration-500 rounded-full"` |
| 79 | hex | `#071A4A` | `<span aria-live="polite" className="text-xs font-mono font-bold text-[#071A4A]">` |
| 107 | hex | `#071A4A` | `className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#071A4A] px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-[#1557D6] disabled:` |
| 107 | hex | `#1557D6` | `className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#071A4A] px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-[#1557D6] disabled:` |

### `src\components\home\HomeClosingBanner.tsx` - 12

| Line | Kind | Value | Context |
|---:|---|---|---|
| 13 | hex | `#E4EAF2` | `<section className="py-14 sm:py-20 bg-white border-b border-[#E4EAF2] tone-light card-light">` |
| 15 | hex | `#071A4A` | `<div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#071A4A] via-[#0A1F56] to-[#040E29] p-8 sm:p-12 lg:p-16 text-white shadow-xl">` |
| 15 | hex | `#0A1F56` | `<div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#071A4A] via-[#0A1F56] to-[#040E29] p-8 sm:p-12 lg:p-16 text-white shadow-xl">` |
| 15 | hex | `#040E29` | `<div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#071A4A] via-[#0A1F56] to-[#040E29] p-8 sm:p-12 lg:p-16 text-white shadow-xl">` |
| 17 | hex | `#1557D6` | `<div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-[#1557D6]/20 blur-3xl pointer-events-none" />` |
| 22 | hex | `#BAE6FD` | `<div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#BAE6FD]">` |
| 28 | hex | `#38BDF8` | `<span className="text-[#38BDF8]">` |
| 41 | hex | `#071A4A` | `className="inline-flex items-center gap-2 rounded-full bg-white tone-light text-[#071A4A] hover:bg-[#EEF6FF] px-7 py-3.5 text-xs sm:text-sm font-extrabold transition-all shadow-md"` |
| 41 | hex | `#EEF6FF` | `className="inline-flex items-center gap-2 rounded-full bg-white tone-light text-[#071A4A] hover:bg-[#EEF6FF] px-7 py-3.5 text-xs sm:text-sm font-extrabold transition-all shadow-md"` |
| 44 | hex | `#1557D6` | `<ArrowRight className="h-4 w-4 text-[#1557D6]" />` |
| 51 | hex | `#7DD3FC` | `<PhoneCall className="h-4 w-4 text-[#7DD3FC]" />` |
| 78 | hex | `#34D399` | `<CheckCircle2 className="h-3.5 w-3.5 text-[#34D399] shrink-0" />` |

### `src\components\home\HomeStatsStrip.tsx` - 12

| Line | Kind | Value | Context |
|---:|---|---|---|
| 9 | hex | `#1557D6` | `color: "text-[#1557D6] bg-[#EEF6FF]",` |
| 9 | hex | `#EEF6FF` | `color: "text-[#1557D6] bg-[#EEF6FF]",` |
| 15 | hex | `#1557D6` | `color: "text-[#1557D6] bg-[#EEF6FF]",` |
| 15 | hex | `#EEF6FF` | `color: "text-[#1557D6] bg-[#EEF6FF]",` |
| 21 | hex | `#1557D6` | `color: "text-[#1557D6] bg-[#EEF6FF]",` |
| 21 | hex | `#EEF6FF` | `color: "text-[#1557D6] bg-[#EEF6FF]",` |
| 27 | hex | `#1557D6` | `color: "text-[#1557D6] bg-[#EEF6FF]",` |
| 27 | hex | `#EEF6FF` | `color: "text-[#1557D6] bg-[#EEF6FF]",` |
| 32 | hex | `#E4EAF2` | `<section className="border-b border-[#E4EAF2] bg-white py-8 sm:py-10 tone-light card-light">` |
| 43 | hex | `#D0E1FD` | `className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-[#D0E1FD] ${item.color}`}` |
| 48 | hex | `#071A4A` | `<div className="font-sans text-xl sm:text-2xl font-extrabold tracking-tight text-[#071A4A] leading-tight">` |
| 51 | hex | `#69758A` | `<div className="text-xs sm:text-sm font-semibold text-[#69758A] mt-0.5 truncate">` |

### `src\components\landing\CompressedProofCtaBlock.tsx` - 12

| Line | Kind | Value | Context |
|---:|---|---|---|
| 42 | hex | `#1A1A1A` | `className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white tone-light text-[#1A1A1A] border-b border-stone-200"` |
| 52 | hex | `#1A1A1A` | `className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1A1A1A] tracking-tight leading-[1.18]"` |
| 56 | hex | `#1B3F8B` | `<span className="italic text-[#1B3F8B]">→ Action</span>` |
| 70 | hex | `#FAF8F5` | `className="rounded-2xl border border-stone-300 bg-[#FAF8F5] p-6 space-y-4 shadow-xs flex flex-col justify-between"` |
| 74 | hex | `#1B3F8B` | `<div className="p-2.5 rounded-xl bg-[#1B3F8B]/10 text-[#1B3F8B]">` |
| 74 | hex | `#1B3F8B` | `<div className="p-2.5 rounded-xl bg-[#1B3F8B]/10 text-[#1B3F8B]">` |
| 82 | hex | `#1A1A1A` | `<h3 className="font-serif text-lg font-bold text-[#1A1A1A]">` |
| 100 | hex | `#FAF8F5` | `<div className="bg-[#FAF8F5] rounded-2xl border border-stone-300 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">` |
| 102 | hex | `#1B3F8B` | `<span className="font-mono text-xs font-bold uppercase text-[#1B3F8B]">` |
| 105 | hex | `#1A1A1A` | `<h4 className="font-serif text-xl font-bold text-[#1A1A1A]">` |
| 129 | hex | `#1B3F8B` | `className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-sans font-bold text-xs text-slate-50 bg-[#1B3F8B] hover:bg-[#153270] shadow-sm transition-all cursor-pointer` |
| 129 | hex | `#153270` | `className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-sans font-bold text-xs text-slate-50 bg-[#1B3F8B] hover:bg-[#153270] shadow-sm transition-all cursor-pointer` |

### `src\components\landing\HiringMarketMap.tsx` - 12

| Line | Kind | Value | Context |
|---:|---|---|---|
| 44 | hex | `#F7F5F0` | `<section className="py-12 sm:py-16 bg-[#F7F5F0] tone-light text-[#1A1A1A] relative overflow-hidden border-b border-stone-200/80">` |
| 44 | hex | `#1A1A1A` | `<section className="py-12 sm:py-16 bg-[#F7F5F0] tone-light text-[#1A1A1A] relative overflow-hidden border-b border-stone-200/80">` |
| 49 | hex | `#1B3F8B` | `<div className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white tone-light card-light px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest` |
| 50 | hex | `#1B3F8B` | `<MapPin className="h-3.5 w-3.5 text-[#1B3F8B]" />` |
| 54 | hex | `#1A1A1A` | `<h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1A1A1A] leading-tight">` |
| 56 | hex | `#8A6D1F` | `<span className="italic font-normal text-[#8A6D1F]">` |
| 75 | hex | `#1B3F8B` | `? "bg-[#1B3F8B] text-white border-[#1B3F8B] shadow-sm"` |
| 75 | hex | `#1B3F8B` | `? "bg-[#1B3F8B] text-white border-[#1B3F8B] shadow-sm"` |
| 89 | hex | `#1B3F8B` | `<Briefcase className="h-4 w-4 text-[#1B3F8B]" />` |
| 92 | hex | `#1B3F8B` | `<div className="font-mono font-black text-2xl sm:text-3xl text-[#1B3F8B]">` |
| 102 | hex | `#8A6D1F` | `<TrendingUp className="h-4 w-4 text-[#8A6D1F]" />` |
| 105 | hex | `#8A6D1F` | `<div className="font-serif font-bold text-xl sm:text-2xl text-[#8A6D1F]">` |

### `src\components\landing\LiveJobMarketTerminal.tsx` - 12

| Line | Kind | Value | Context |
|---:|---|---|---|
| 117 | hex | `#FAF8F5` | `<section id="jobs" className="py-16 sm:py-24 border-b border-stone-200 bg-[#FAF8F5]">` |
| 125 | hex | `#1A1A1A` | `<h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">` |
| 136 | hex | `#1B3F8B` | `className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-slate-50 font-bold text-xs transition-all shadow-sm cursor-pointer hover:shadow-` |
| 136 | hex | `#153270` | `className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-slate-50 font-bold text-xs transition-all shadow-sm cursor-pointer hover:shadow-` |
| 156 | hex | `#1B3F8B` | `? "bg-[#1B3F8B] text-slate-50 shadow-md ring-2 ring-[#1B3F8B]/20"` |
| 156 | hex | `#1B3F8B` | `? "bg-[#1B3F8B] text-slate-50 shadow-md ring-2 ring-[#1B3F8B]/20"` |
| 173 | hex | `#1B3F8B` | `className="rounded-3xl border border-stone-200 bg-white tone-light p-6 space-y-4 shadow-xs flex flex-col justify-between hover:border-[#1B3F8B]/40 hover:shadow-xl transition-all h-` |
| 177 | hex | `#1B3F8B` | `<span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1B3F8B] bg-sky-50 border border-sky-200 px-2.5 py-0.5 rounded shadow-2xs">` |
| 186 | hex | `#1A1A1A` | `<h3 className="font-serif text-lg font-bold text-[#1A1A1A] leading-snug">` |
| 223 | hex | `#8A6D1F` | `<span className="font-mono text-xs font-bold text-[#8A6D1F]">{job.salary}</span>` |
| 228 | hex | `#1B3F8B` | `className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 text-xs font-bold text-[#1B3F8B] hover:bg-[#1B3F8B] hover:text-slate-50 transition-colors shadow-2xs"` |
| 228 | hex | `#1B3F8B` | `className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 text-xs font-bold text-[#1B3F8B] hover:bg-[#1B3F8B] hover:text-slate-50 transition-colors shadow-2xs"` |

### `src\components\landing\LossPipelineComparisonBlock.tsx` - 12

| Line | Kind | Value | Context |
|---:|---|---|---|
| 32 | hex | `#FAF9F5` | `className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF9F5] text-[#0F2942] border-b border-stone-200"` |
| 32 | hex | `#0F2942` | `className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF9F5] text-[#0F2942] border-b border-stone-200"` |
| 37 | hex | `#0F2942` | `<span className="font-mono text-[11px] font-bold tracking-widest text-[#0F2942] uppercase block">` |
| 43 | hex | `#0F2942` | `className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#0F2942] tracking-tight leading-tight"` |
| 57 | hex | `#0F2942` | `<span className="text-[#0F2942] font-bold">TEST</span>` |
| 59 | hex | `#0F2942` | `<span className="text-[#0F2942] font-bold">DOMAIN</span>` |
| 61 | hex | `#0F2942` | `<span className="text-[#0F2942] font-bold">EMPLOYER</span>` |
| 72 | hex | `#1B3F8B` | `<span className="font-mono text-[11px] font-bold tracking-widest text-[#1B3F8B] uppercase block">` |
| 75 | hex | `#0F2942` | `<h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2942] tracking-tight">` |
| 76 | hex | `#1B3F8B` | `The Cost of Waiting vs. <span className="italic font-normal text-[#1B3F8B]">The Calibrated Fast-Track</span>` |
| 146 | hex | `#0F2942` | `className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-sans font-bold text-xs sm:text-sm text-slate-50 bg-[#0F2942] hover:bg-[#153270` |
| 146 | hex | `#153270` | `className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-sans font-bold text-xs sm:text-sm text-slate-50 bg-[#0F2942] hover:bg-[#153270` |

### `src\components\workshop\InteractiveCareerFitTool.tsx` - 12

| Line | Kind | Value | Context |
|---:|---|---|---|
| 112 | hex | `#1B3F8B` | `<span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1B3F8B] text-[11px] font-mono font-bold uppercase tracking-wider">` |
| 156 | hex | `#0B1325` | `? "bg-[#0B1325] text-white border-[#0B1325] shadow-md font-bold"` |
| 156 | hex | `#0B1325` | `? "bg-[#0B1325] text-white border-[#0B1325] shadow-md font-bold"` |
| 181 | hex | `#0B1325` | `? "bg-[#0B1325] text-white border-[#0B1325] shadow-md font-bold"` |
| 181 | hex | `#0B1325` | `? "bg-[#0B1325] text-white border-[#0B1325] shadow-md font-bold"` |
| 206 | hex | `#0B1325` | `? "bg-[#0B1325] text-white border-[#0B1325] shadow-md font-bold"` |
| 206 | hex | `#0B1325` | `? "bg-[#0B1325] text-white border-[#0B1325] shadow-md font-bold"` |
| 221 | hex | `#1B3F8B` | `<div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1B3F8B] uppercase">` |
| 222 | hex | `#1B3F8B` | `<Sparkles className="w-4 h-4 text-[#1B3F8B]" />` |
| 227 | hex | `#1B3F8B` | `Based on your background, <span className="text-[#1B3F8B]">{result.roleTitle}</span> is worth exploring.` |
| 252 | hex | `#0B1325` | `className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-lg transition-all cursor-poi` |
| 252 | hex | `#1B3F8B` | `className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-lg transition-all cursor-poi` |

### `src\data\pvRoleInteractiveData.ts` - 12

| Line | Kind | Value | Context |
|---:|---|---|---|
| 83 | hex | `#1557D6` | `{ label: "Intake Triage & Day-0 Validity", pct: 25, detail: "Reviewing raw source PDFs, checking 4 minimum criteria, establishing receipt timestamp", color: "#1557D6" },` |
| 84 | hex | `#6946E8` | `{ label: "MedDRA & WHO-DD Term Coding", pct: 25, detail: "Selecting accurate LLT/PT paths, coding trade names to generic salts and ATC classes", color: "#6946E8" },` |
| 85 | hex | `#27B9B3` | `{ label: "Chronological Narrative Drafting", pct: 30, detail: "Authoring clinical sequence from onset to dechallenge, labs, and reporter causality", color: "#27B9B3" },` |
| 86 | hex | `#071A4A` | `{ label: "Self-QC & Duplicate Reconciliation", pct: 20, detail: "Running duplicate algorithms, verifying field agreement, checking expedited flags", color: "#071A4A" },` |
| 280 | hex | `#1557D6` | `{ label: "End-to-End Data Entry in Safety System", pct: 40, detail: "Populating General, Patient, Product, Event, and Analysis tabs with absolute precision", color: "#1557D6" },` |
| 281 | hex | `#6946E8` | `{ label: "MedDRA & WHO Drug Field Mapping", pct: 25, detail: "Assigning exact LLT codes and mapping brand trade names to standardized active substances", color: "#6946E8" },` |
| 282 | hex | `#27B9B3` | `{ label: "Duplicate Checks & Database Search", pct: 20, detail: "Running multi-parameter queries across patient DOB, initials, country, and event dates", color: "#27B9B3" },` |
| 283 | hex | `#071A4A` | `{ label: "Targeted Follow-Up Query Drafting", pct: 15, detail: "Identifying clinical gaps and drafting specific query forms for treating physicians", color: "#071A4A" },` |
| 477 | hex | `#1557D6` | `{ label: "Narrative Construction & Medical Coherence", pct: 35, detail: "Synthesizing complex clinical histories, hospital courses, and lab timelines into publication-standard narr` |
| 478 | hex | `#6946E8` | `{ label: "Causality & Listedness Evaluation", pct: 25, detail: "Applying WHO-UMC / Naranjo algorithms and cross-checking against active SmPC Section 4.8", color: "#6946E8" },` |
| 479 | hex | `#27B9B3` | `{ label: "Case Quality Control & Peer Audits", pct: 25, detail: "Auditing case packets for critical/major defects, verifying data field agreement, logging CAPAs", color: "#27B9B3" ` |
| 480 | hex | `#071A4A` | `{ label: "Special Situations & Escalations", pct: 15, detail: "Triaging off-label use, pregnancy exposures, medication errors, and potential signal alerts", color: "#071A4A" },` |

### `src\routes\acri.competencies.tsx` - 12

| Line | Kind | Value | Context |
|---:|---|---|---|
| 133 | hex | `#FAF9F6` | `<div className="min-h-screen bg-[#FAF9F6] text-[#0B1325] font-sans antialiased selection:bg-[#E8F7F1]">` |
| 133 | hex | `#0B1325` | `<div className="min-h-screen bg-[#FAF9F6] text-[#0B1325] font-sans antialiased selection:bg-[#E8F7F1]">` |
| 133 | hex | `#E8F7F1` | `<div className="min-h-screen bg-[#FAF9F6] text-[#0B1325] font-sans antialiased selection:bg-[#E8F7F1]">` |
| 137 | hex | `#E8F7F1` | `<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F7F1] text-[#005B4F] text-xs font-mono font-bold">` |
| 137 | hex | `#005B4F` | `<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F7F1] text-[#005B4F] text-xs font-mono font-bold">` |
| 153 | hex | `#0B1325` | `className="px-6 py-3 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 transition-all shadow` |
| 153 | hex | `#1B3F8B` | `className="px-6 py-3 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 transition-all shadow` |
| 180 | hex | `#E8F7F1` | `<span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-[#E8F7F1] text-[#005B4F]">` |
| 180 | hex | `#005B4F` | `<span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-[#E8F7F1] text-[#005B4F]">` |
| 190 | hex | `#1B3F8B` | `<span className="text-[#1B3F8B] font-bold">WEIGHT: {c.weight}</span>` |
| 213 | hex | `#005B4F` | `className="text-[#005B4F] font-bold hover:underline inline-flex items-center gap-1"` |
| 224 | hex | `#0B1325` | `<section className="rounded-3xl bg-[#0B1325] text-white p-8 sm:p-12 text-center space-y-4">` |

### `src\routes\admin.demand.tsx` - 12

| Line | Kind | Value | Context |
|---:|---|---|---|
| 79 | hex | `#0a0c10` | `"w-full rounded-lg border border-border bg-[#0a0c10]/40 backdrop-blur-md shadow-sm px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary/60 fo` |
| 267 | hex | `#0a0c10` | `<option key={c} value={c} className="bg-[#0a0c10]">` |
| 440 | hex | `#0a0c10` | `<option key={c} value={c} className="bg-[#0a0c10]">` |
| 463 | hex | `#0a0c10` | `<option value="voting" className="bg-[#0a0c10]">` |
| 466 | hex | `#0a0c10` | `<option value="building" className="bg-[#0a0c10]">` |
| 469 | hex | `#0a0c10` | `<option value="live" className="bg-[#0a0c10]">` |
| 629 | hex | `#0a0c10` | `className="flex items-center gap-2 rounded-lg border border-border bg-[#0a0c10]/40 backdrop-blur-md shadow-sm px-3 py-2 text-sm"` |
| 757 | hex | `#0a0c10` | `className="flex items-center gap-2 rounded-lg border border-border bg-[#0a0c10]/40 backdrop-blur-md shadow-sm px-3 py-2 text-sm"` |
| 786 | hex | `#0a0c10` | `<option value="mentor" className="bg-[#0a0c10]">` |
| 789 | hex | `#0a0c10` | `<option value="internship" className="bg-[#0a0c10]">` |
| 921 | hex | `#0a0c10` | `className="rounded-md border border-border bg-[#0a0c10]/40 px-2 py-1 text-xs"` |
| 929 | hex | `#0a0c10` | `<option key={s} value={s} className="bg-[#0a0c10]">` |

### `src\routes\admin.index.tsx` - 12

| Line | Kind | Value | Context |
|---:|---|---|---|
| 597 | hex | `#061438` | `<div className="rounded-3xl border border-slate-700/40 bg-gradient-to-br from-[#061438] via-[#091E54] to-[#050E24] h-48" />` |
| 597 | hex | `#091E54` | `<div className="rounded-3xl border border-slate-700/40 bg-gradient-to-br from-[#061438] via-[#091E54] to-[#050E24] h-48" />` |
| 597 | hex | `#050E24` | `<div className="rounded-3xl border border-slate-700/40 bg-gradient-to-br from-[#061438] via-[#091E54] to-[#050E24] h-48" />` |
| 614 | hex | `#071A4A` | `<div className="w-10 h-10 rounded-xl bg-[#071A4A] flex items-center justify-center text-white font-serif font-black text-lg shadow-sm ring-1 ring-black/5">` |
| 661 | hex | `#071A4A` | `className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#071A4A] hover:bg-[#0B2666] text-white font-sans text-xs font-bold shadow-xs transition active:scale-95 curso` |
| 661 | hex | `#0B2666` | `className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#071A4A] hover:bg-[#0B2666] text-white font-sans text-xs font-bold shadow-xs transition active:scale-95 curso` |
| 669 | hex | `#061438` | `<section className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#061438] via-[#091E54] to-[#050E24] text-white p-6 sm:p-7 shadow-xl space-y-5 relative overflow-hidde` |
| 669 | hex | `#091E54` | `<section className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#061438] via-[#091E54] to-[#050E24] text-white p-6 sm:p-7 shadow-xl space-y-5 relative overflow-hidde` |
| 669 | hex | `#050E24` | `<section className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#061438] via-[#091E54] to-[#050E24] text-white p-6 sm:p-7 shadow-xl space-y-5 relative overflow-hidde` |
| 823 | hex | `#071A4A` | `<Layers className="w-4 h-4 text-[#071A4A]" />` |
| 936 | hex | `#071A4A` | `? "bg-[#071A4A] text-white shadow-xs tone-dark"` |
| 1676 | hex | `#0A2246` | `className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[var(--color-medical-navy)] hover:bg-[#0A2246] text-white font-mono text-xs font-bold uppercase tracking-wider s` |

### `src\routes\students.3rd-year.tsx` - 12

| Line | Kind | Value | Context |
|---:|---|---|---|
| 24 | hex | `#FAF8F5` | `<div className="min-h-screen bg-[#FAF8F5] text-[#0B1325] font-sans pb-24">` |
| 24 | hex | `#0B1325` | `<div className="min-h-screen bg-[#FAF8F5] text-[#0B1325] font-sans pb-24">` |
| 29 | hex | `#1B3F8B` | `<GraduationCap className="h-4 w-4 text-[#1B3F8B]" />` |
| 30 | hex | `#1B3F8B` | `<span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">` |
| 62 | hex | `#1B3F8B` | `<p className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">` |
| 71 | hex | `#1B3F8B` | `className="text-xs font-mono font-bold uppercase text-[#1B3F8B] hover:underline flex items-center gap-1"` |
| 104 | hex | `#1B3F8B` | `<span className="font-mono text-xs font-bold text-[#1B3F8B] bg-blue-50/80 px-2 py-0.5 rounded border border-blue-100">` |
| 117 | hex | `#1B3F8B` | `className="text-xs font-semibold text-[#1B3F8B] hover:text-[#0B1325] inline-flex items-center gap-1"` |
| 117 | hex | `#0B1325` | `className="text-xs font-semibold text-[#1B3F8B] hover:text-[#0B1325] inline-flex items-center gap-1"` |
| 132 | hex | `#1B3F8B` | `<div className="flex items-center gap-2 text-[#1B3F8B] font-mono text-xs font-bold uppercase tracking-wider">` |
| 145 | hex | `#0B1325` | `className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-[#0B1325] hover:bg-[#1B3F8B] text-slate-50 font-mono text-xs font-bold uppercase tracking-wider transition-colors ` |
| 145 | hex | `#1B3F8B` | `className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-[#0B1325] hover:bg-[#1B3F8B] text-slate-50 font-mono text-xs font-bold uppercase tracking-wider transition-colors ` |

### `src\routes\tools.role-matrix.tsx` - 12

| Line | Kind | Value | Context |
|---:|---|---|---|
| 31 | hex | `#FAF9F6` | `<div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans selection:bg-[#1B3F8B] selection:text-white pb-24">` |
| 31 | hex | `#1B3F8B` | `<div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans selection:bg-[#1B3F8B] selection:text-white pb-24">` |
| 51 | hex | `#1B3F8B` | `<Sparkles className="w-4 h-4 text-[#1B3F8B]" />` |
| 52 | hex | `#1B3F8B` | `<span className="font-mono text-[10px] font-bold text-[#1B3F8B] uppercase tracking-wider">` |
| 61 | hex | `#1B3F8B` | `<p className="mt-4 text-base sm:text-lg text-stone-700 leading-relaxed font-sans border-l-2 border-[#1B3F8B] pl-4">` |
| 70 | hex | `#0B1325` | `? "bg-[#0B1325] text-white border-[#0B1325]"` |
| 70 | hex | `#0B1325` | `? "bg-[#0B1325] text-white border-[#0B1325]"` |
| 82 | hex | `#0B1325` | `? "bg-[#0B1325] text-white border-[#0B1325]"` |
| 82 | hex | `#0B1325` | `? "bg-[#0B1325] text-white border-[#0B1325]"` |
| 99 | hex | `#1B3F8B` | `<span className="font-mono text-[10px] font-bold text-[#1B3F8B] uppercase tracking-wider">` |
| 136 | hex | `#1B3F8B` | `<td className="py-3 px-4 font-mono text-[11px] text-[#1B3F8B] font-bold">` |
| 157 | hex | `#0B1325` | `<section className="bg-[#0B1325] text-white p-8 sm:p-10 border border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-6">` |

### `src\components\acri\assessment\AcriCompetencyDetailModal.tsx` - 11

| Line | Kind | Value | Context |
|---:|---|---|---|
| 51 | hex | `#0B1325` | `className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1325]/60 backdrop-blur-xs"` |
| 64 | hex | `#0B1325` | `<h3 id="competency-modal-title" className="text-xl font-serif font-bold text-[#0B1325]">` |
| 80 | hex | `#FAF8F5` | `<div className="flex items-center justify-between p-4 rounded-xl bg-[#FAF8F5] border border-stone-200/80">` |
| 86 | hex | `#0B1325` | `<span className="text-2xl font-serif font-black text-[#0B1325]">` |
| 103 | hex | `#005B4F` | `<Award className="h-3.5 w-3.5 text-[#005B4F]" />` |
| 109 | hex | `#005B4F` | `<span className="h-1.5 w-1.5 rounded-full bg-[#005B4F] shrink-0 mt-1.5" />` |
| 119 | hex | `#005B4F` | `<Sparkles className="h-3.5 w-3.5 text-[#005B4F]" />` |
| 122 | hex | `#FAF8F5` | `<p className="text-xs text-stone-600 leading-relaxed bg-[#FAF8F5] p-3 rounded-lg border border-stone-200/60">` |
| 130 | hex | `#005B4F` | `<TrendingUp className="h-3.5 w-3.5 text-[#005B4F]" />` |
| 158 | hex | `#005B4F` | `className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-white font-sans text-xs font-semibold shadow-xs transition-colors cursor-pointer` |
| 158 | hex | `#00473E` | `className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-white font-sans text-xs font-semibold shadow-xs transition-colors cursor-pointer` |

### `src\components\acri\assessment\AcriRadarChart.tsx` - 11

| Line | Kind | Value | Context |
|---:|---|---|---|
| 86 | hex | `#005B4F` | `<stop offset="0%" stopColor="#005B4F" stopOpacity="0.38" />` |
| 87 | hex | `#005B4F` | `<stop offset="100%" stopColor="#005B4F" stopOpacity="0.12" />` |
| 113 | hex | `#059669` | `stroke={isBenchmark ? "#059669" : isOuter ? "#CBD5E1" : "#E2E8F0"}` |
| 122 | hex | `#059669` | `className="text-[9px] font-mono font-bold fill-[#059669]"` |
| 152 | hex | `#059669` | `stroke="#059669"` |
| 163 | hex | `#005B4F` | `stroke="#005B4F"` |
| 175 | hex | `#005B4F` | `item.score >= 85 ? "#005B4F" : item.score >= 60 ? "#D97706" : "#E11D48";` |
| 251 | hex | `#005B4F` | `? "fill-[#005B4F] font-bold"` |
| 252 | hex | `#005B4F` | `: "fill-stone-800 hover:fill-[#005B4F]"` |
| 275 | hex | `#005B4F` | `<span className="h-2 w-2 rounded-full bg-[#005B4F]" />` |
| 279 | hex | `#059669` | `<span className="w-3 h-0.5 border-t border-dashed border-[#059669]" />` |

### `src\components\acri\methodology\AcriScoringPipelineEngine.tsx` - 11

| Line | Kind | Value | Context |
|---:|---|---|---|
| 123 | hex | `#005B4F` | `<span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#005B4F]">` |
| 136 | hex | `#1B3F8B` | `<Info className="h-3.5 w-3.5 text-[#1B3F8B]" />` |
| 153 | hex | `#0B1325` | `? "bg-[#0B1325] text-white border-[#0B1325] shadow-md -translate-y-0.5"` |
| 153 | hex | `#0B1325` | `? "bg-[#0B1325] text-white border-[#0B1325] shadow-md -translate-y-0.5"` |
| 159 | hex | `#0B1325` | `<div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#0B1325] rotate-45 pointer-events-none" />` |
| 196 | hex | `#FAF9F6` | `<div className="mt-4 rounded-2xl border border-stone-200 bg-[#FAF9F6] p-5 sm:p-7">` |
| 199 | hex | `#005B4F` | `<div className="h-10 w-10 rounded-xl bg-[#005B4F] text-white flex items-center justify-center font-mono font-bold text-sm shrink-0">` |
| 204 | hex | `#005B4F` | `<span className="font-mono text-[10px] font-bold text-[#005B4F] uppercase tracking-wider">` |
| 219 | hex | `#1B3F8B` | `<code className="text-[#1B3F8B] font-bold">{activeStep.formula}</code>` |
| 252 | hex | `#005B4F` | `<div className="p-4 rounded-xl bg-white tone-light border border-stone-200 space-y-1 border-l-4 border-l-[#005B4F]">` |
| 253 | hex | `#005B4F` | `<span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#005B4F] block">` |

### `src\components\career\report\LineChartSvg.tsx` - 11

| Line | Kind | Value | Context |
|---:|---|---|---|
| 51 | hsl | `hsl(174 72% 62%)` | `? "hsl(174 72% 62%)"` |
| 53 | hsl | `hsl(43 96% 60%)` | `? "hsl(43 96% 60%)"` |
| 54 | hsl | `hsl(155 65% 55%)` | `: "hsl(155 65% 55%)";` |
| 75 | hsl | `hsl(0 0% 100% / 0.08)` | `stroke="hsl(0 0% 100% / 0.08)"` |
| 81 | hsl | `hsl(0 0% 100% / 0.45)` | `fill="hsl(0 0% 100% / 0.45)"` |
| 127 | hsl | `hsl(220 40% 7%)` | `<circle cx={px(i)} cy={py(p.y)} r={active ? 1.6 : 1.2} fill="hsl(220 40% 7%)" />` |
| 131 | hsl | `hsl(0 0% 100% / 0.95)` | `fill={active ? "hsl(0 0% 100% / 0.95)" : "hsl(0 0% 100% / 0.65)"}` |
| 131 | hsl | `hsl(0 0% 100% / 0.65)` | `fill={active ? "hsl(0 0% 100% / 0.95)" : "hsl(0 0% 100% / 0.65)"}` |
| 142 | hsl | `hsl(0 0% 100% / 0.9)` | `fill="hsl(0 0% 100% / 0.9)"` |
| 187 | hsl | `hsl(220 40% 7% / 0.92)` | `fill="hsl(220 40% 7% / 0.92)"` |
| 195 | hsl | `hsl(0 0% 100% / 0.6)` | `fill="hsl(0 0% 100% / 0.6)"` |

### `src\components\landing\ClinicalTracksBlock.tsx` - 11

| Line | Kind | Value | Context |
|---:|---|---|---|
| 77 | hex | `#FAF8F5` | `* Design: Light warm background (#FAF8F5), editorial layout for pharmacy` |
| 85 | hex | `#FAF8F5` | `className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] text-[#1A1A1A] border-b border-stone-300/80"` |
| 85 | hex | `#1A1A1A` | `className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] text-[#1A1A1A] border-b border-stone-300/80"` |
| 95 | hex | `#1A1A1A` | `className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1A1A1A] tracking-tight leading-[1.18]"` |
| 98 | hex | `#1B3F8B` | `<span className="italic text-[#1B3F8B]">` |
| 120 | hex | `#1B3F8B` | `<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-100 text-[#1B3F8B]">` |
| 123 | hex | `#1B3F8B` | `<span className="font-mono text-[10px] font-bold text-[#1B3F8B] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">` |
| 129 | hex | `#1A1A1A` | `<h3 className="font-serif text-lg font-bold text-[#1A1A1A]">{t.title}</h3>` |
| 146 | hex | `#1A1A1A` | `<strong className="font-semibold text-[#1A1A1A]">What you do:</strong> {t.desc}` |
| 152 | hex | `#1B3F8B` | `className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B3F8B] hover:text-[#153270] pt-2"` |
| 152 | hex | `#153270` | `className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B3F8B] hover:text-[#153270] pt-2"` |

### `src\components\landing\CollegeVsIndustryGapBlock.tsx` - 11

| Line | Kind | Value | Context |
|---:|---|---|---|
| 10 | hex | `#070D1B` | `<section className="py-16 sm:py-24 bg-[#070D1B] text-slate-100 tone-dark border-b border-slate-800">` |
| 32 | hex | `#0B152C` | `<div className="p-6 sm:p-8 rounded-3xl border border-slate-800 bg-[#0B152C] space-y-6 flex flex-col justify-between shadow-xl">` |
| 47 | hex | `#070D1B` | `<li className="flex items-start gap-2.5 p-3 rounded-xl bg-[#070D1B] border border-slate-800">` |
| 51 | hex | `#070D1B` | `<li className="flex items-start gap-2.5 p-3 rounded-xl bg-[#070D1B] border border-slate-800">` |
| 55 | hex | `#070D1B` | `<li className="flex items-start gap-2.5 p-3 rounded-xl bg-[#070D1B] border border-slate-800">` |
| 59 | hex | `#070D1B` | `<li className="flex items-start gap-2.5 p-3 rounded-xl bg-[#070D1B] border border-slate-800">` |
| 72 | hex | `#0B152C` | `<div className="p-6 sm:p-8 rounded-3xl border border-amber-500/40 bg-[#0B152C] space-y-6 flex flex-col justify-between shadow-2xl ring-1 ring-amber-500/20">` |
| 87 | hex | `#070D1B` | `<li className="flex items-start gap-2.5 p-3 rounded-xl bg-[#070D1B] border border-amber-500/20">` |
| 91 | hex | `#070D1B` | `<li className="flex items-start gap-2.5 p-3 rounded-xl bg-[#070D1B] border border-amber-500/20">` |
| 95 | hex | `#070D1B` | `<li className="flex items-start gap-2.5 p-3 rounded-xl bg-[#070D1B] border border-amber-500/20">` |
| 99 | hex | `#070D1B` | `<li className="flex items-start gap-2.5 p-3 rounded-xl bg-[#070D1B] border border-amber-500/20">` |

### `src\components\landing\FinalHeroOfferCTA.tsx` - 11

| Line | Kind | Value | Context |
|---:|---|---|---|
| 10 | hex | `#1B3F8B` | `<section className="py-16 sm:py-20 bg-[#1B3F8B] text-slate-50 border-b border-[#153270]">` |
| 10 | hex | `#153270` | `<section className="py-16 sm:py-20 bg-[#1B3F8B] text-slate-50 border-b border-[#153270]">` |
| 39 | rgba | `rgba(255,255,255,0.85)` | `style={{ color: "rgba(255,255,255,0.85)" }}` |
| 48 | rgba | `rgba(255,255,255,0.8)` | `style={{ color: "rgba(255,255,255,0.8)" }}` |
| 59 | rgba | `rgba(255,255,255,0.3)` | `<span className="hidden sm:inline" style={{ color: "rgba(255,255,255,0.3)" }}>` |
| 75 | hex | `#1B3F8B` | `style={{ backgroundColor: "#FFFFFF", color: "#1B3F8B" }}` |
| 77 | hex | `#1B3F8B` | `<span style={{ color: "#1B3F8B" }} className="!text-[#1B3F8B] font-extrabold">` |
| 77 | hex | `#1B3F8B` | `<span style={{ color: "#1B3F8B" }} className="!text-[#1B3F8B] font-extrabold">` |
| 81 | hex | `#1B3F8B` | `className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 !text-[#1B3F8B]"` |
| 82 | hex | `#1B3F8B` | `style={{ color: "#1B3F8B" }}` |
| 102 | rgba | `rgba(255,255,255,0.5)` | `<p className="text-xs font-mono font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>` |

### `src\components\opportunity\OpportunityDetailPanel.tsx` - 11

| Line | Kind | Value | Context |
|---:|---|---|---|
| 21 | hex | `#1B3F8B` | `<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1B3F8B]/10 text-[#1B3F8B] font-bold">` |
| 21 | hex | `#1B3F8B` | `<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1B3F8B]/10 text-[#1B3F8B] font-bold">` |
| 24 | hex | `#1B3F8B` | `<span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">` |
| 50 | hex | `#1B3F8B` | `<Users className="h-3.5 w-3.5 text-[#1B3F8B]" />` |
| 73 | hex | `#1B3F8B` | `<Award className="h-4 w-4 text-[#1B3F8B]" />` |
| 139 | hex | `#1B3F8B` | `<Clock className="h-4 w-4 text-[#1B3F8B]" />` |
| 145 | hex | `#1B3F8B` | `<span className="h-6 w-6 rounded-full bg-[#1B3F8B] text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 shadow-xs">` |
| 156 | hex | `#1B3F8B` | `<span className="font-mono font-bold text-[#1B3F8B] uppercase block text-[11px]">` |
| 168 | hex | `#1B3F8B` | `className="w-full h-13 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-white text-sm font-bold font-sans flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition` |
| 168 | hex | `#153270` | `className="w-full h-13 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-white text-sm font-bold font-sans flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition` |
| 168 | hex | `#1B3F8B` | `className="w-full h-13 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-white text-sm font-bold font-sans flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition` |

### `src\data\trackTheme.ts` - 11

| Line | Kind | Value | Context |
|---:|---|---|---|
| 45 | hex | `#0EA5E9` | `hex: { from: "#0EA5E9", to: "#2563EB" },` |
| 45 | hex | `#2563EB` | `hex: { from: "#0EA5E9", to: "#2563EB" },` |
| 46 | hex | `#7DD3FC` | `accentInk: "#7DD3FC",` |
| 55 | hex | `#8B5CF6` | `hex: { from: "#8B5CF6", to: "#4F46E5" },` |
| 55 | hex | `#4F46E5` | `hex: { from: "#8B5CF6", to: "#4F46E5" },` |
| 85 | hex | `#9333EA` | `hex: { from: "#D946EF", to: "#9333EA" },` |
| 95 | hex | `#06B6D4` | `hex: { from: "#06B6D4", to: "#0EA5E9" },` |
| 95 | hex | `#0EA5E9` | `hex: { from: "#06B6D4", to: "#0EA5E9" },` |
| 96 | hex | `#67E8F9` | `accentInk: "#67E8F9",` |
| 108 | hex | `#94A3B8` | `hex: { from: "#94A3B8", to: "#475569" },` |
| 108 | hex | `#475569` | `hex: { from: "#94A3B8", to: "#475569" },` |

### `src\routes\career-engine.start.tsx` - 11

| Line | Kind | Value | Context |
|---:|---|---|---|
| 261 | hex | `#D0E1FD` | `<div className="mb-6 rounded-2xl border border-[#D0E1FD] bg-[#EEF6FF] p-4 text-center">` |
| 261 | hex | `#EEF6FF` | `<div className="mb-6 rounded-2xl border border-[#D0E1FD] bg-[#EEF6FF] p-4 text-center">` |
| 262 | hex | `#1557D6` | `<span className="text-[10px] font-mono uppercase tracking-wider text-[#1557D6] font-bold block">` |
| 265 | hex | `#071A4A` | `<p className="mt-1 text-sm font-bold text-[#071A4A]">` |
| 268 | hex | `#3F4A60` | `<p className="text-xs text-[#3F4A60] mt-0.5">` |
| 306 | hex | `#1A1A1A` | `<h1 className="font-sans text-2xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight leading-snug sm:leading-tight">` |
| 330 | hex | `#1B3F8B` | `className="rounded-xl border border-[var(--arzon-border)] bg-white tone-light card-light p-2.5 sm:p-3.5 text-center shadow-xs transition-colors hover:border-[#1B3F8B]/40"` |
| 399 | hex | `#1B3F8B` | `className="mt-1.5 h-12 rounded-xl border border-[var(--arzon-border-strong)] bg-[var(--arzon-surface-subtle)]/50 text-[var(--arzon-ink)] placeholder:text-[var(--arzon-ink-muted)] f` |
| 399 | hex | `#1B3F8B` | `className="mt-1.5 h-12 rounded-xl border border-[var(--arzon-border-strong)] bg-[var(--arzon-surface-subtle)]/50 text-[var(--arzon-ink)] placeholder:text-[var(--arzon-ink-muted)] f` |
| 427 | hex | `#1B3F8B` | `className="h-12 rounded-l-none rounded-r-xl border border-stone-300 bg-[var(--arzon-surface-subtle)]/50 text-[var(--arzon-ink)] placeholder:text-[var(--arzon-ink-muted)] focus:bg-w` |
| 427 | hex | `#1B3F8B` | `className="h-12 rounded-l-none rounded-r-xl border border-stone-300 bg-[var(--arzon-surface-subtle)]/50 text-[var(--arzon-ink)] placeholder:text-[var(--arzon-ink-muted)] focus:bg-w` |

### `src\routes\students.graduates.tsx` - 11

| Line | Kind | Value | Context |
|---:|---|---|---|
| 24 | hex | `#FAF8F5` | `<div className="min-h-screen bg-[#FAF8F5] text-[#0B1325] font-sans pb-24">` |
| 24 | hex | `#0B1325` | `<div className="min-h-screen bg-[#FAF8F5] text-[#0B1325] font-sans pb-24">` |
| 29 | hex | `#1B3F8B` | `<GraduationCap className="h-4 w-4 text-[#1B3F8B]" />` |
| 30 | hex | `#1B3F8B` | `<span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">` |
| 62 | hex | `#1B3F8B` | `<p className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">` |
| 71 | hex | `#1B3F8B` | `className="text-xs font-mono font-bold uppercase text-[#1B3F8B] hover:underline flex items-center gap-1"` |
| 107 | hex | `#1B3F8B` | `<span className="font-mono text-xs font-bold text-[#1B3F8B] bg-blue-50/80 px-2 py-0.5 rounded border border-blue-100">` |
| 120 | hex | `#1B3F8B` | `className="text-xs font-semibold text-[#1B3F8B] hover:text-[#0B1325] inline-flex items-center gap-1"` |
| 120 | hex | `#0B1325` | `className="text-xs font-semibold text-[#1B3F8B] hover:text-[#0B1325] inline-flex items-center gap-1"` |
| 147 | hex | `#0B1325` | `className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-[#0B1325] hover:bg-[#1B3F8B] text-slate-50 font-mono text-xs font-bold uppercase tracking-wider transition-colors ` |
| 147 | hex | `#1B3F8B` | `className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-[#0B1325] hover:bg-[#1B3F8B] text-slate-50 font-mono text-xs font-bold uppercase tracking-wider transition-colors ` |

### `src\routes\tools.skill-gap-analyzer.tsx` - 11

| Line | Kind | Value | Context |
|---:|---|---|---|
| 59 | hex | `#FAF9F6` | `<div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans selection:bg-[#1B3F8B] selection:text-white pb-24">` |
| 59 | hex | `#1B3F8B` | `<div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans selection:bg-[#1B3F8B] selection:text-white pb-24">` |
| 79 | hex | `#1B3F8B` | `<Sparkles className="w-4 h-4 text-[#1B3F8B]" />` |
| 80 | hex | `#1B3F8B` | `<span className="font-mono text-[10px] font-bold text-[#1B3F8B] uppercase tracking-wider">` |
| 89 | hex | `#1B3F8B` | `<p className="mt-4 text-base sm:text-lg text-stone-700 leading-relaxed font-sans border-l-2 border-[#1B3F8B] pl-4">` |
| 106 | hex | `#FAF9F6` | `className="w-full p-4 bg-[#FAF9F6] border border-stone-300 rounded-none text-xs font-sans text-stone-900 placeholder:text-stone-500 focus:outline-none focus:border-[#1B3F8B]"` |
| 106 | hex | `#1B3F8B` | `className="w-full p-4 bg-[#FAF9F6] border border-stone-300 rounded-none text-xs font-sans text-stone-900 placeholder:text-stone-500 focus:outline-none focus:border-[#1B3F8B]"` |
| 110 | hex | `#0B1325` | `className="w-full sm:w-auto bg-[#0B1325] text-white hover:bg-[#1B3F8B] px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center jus` |
| 110 | hex | `#1B3F8B` | `className="w-full sm:w-auto bg-[#0B1325] text-white hover:bg-[#1B3F8B] px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center jus` |
| 145 | hex | `#1B3F8B` | `<span className="font-mono text-[9px] font-bold text-[#1B3F8B] uppercase block">` |
| 163 | hex | `#0B1325` | `<div className="bg-[#0B1325] text-white p-8 sm:p-10 border border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-6">` |

### `src\components\acri\AcriTestimonials.tsx` - 10

| Line | Kind | Value | Context |
|---:|---|---|---|
| 53 | hex | `#FAF8F5` | `<section className="bg-[#FAF8F5] py-16 lg:py-24 border-b border-stone-200">` |
| 58 | hex | `#E8F7F1` | `<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F7F1] border border-[#005B4F]/20 text-[#005B4F] text-[11px] font-mono font-bold uppercase tracking-wide` |
| 58 | hex | `#005B4F` | `<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F7F1] border border-[#005B4F]/20 text-[#005B4F] text-[11px] font-mono font-bold uppercase tracking-wide` |
| 58 | hex | `#005B4F` | `<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F7F1] border border-[#005B4F]/20 text-[#005B4F] text-[11px] font-mono font-bold uppercase tracking-wide` |
| 62 | hex | `#0B1325` | `<h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#0B1325]">` |
| 73 | hex | `#005B4F` | `className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#005B4F] hover:text-[#00473E] transition-colors group"` |
| 73 | hex | `#00473E` | `className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#005B4F] hover:text-[#00473E] transition-colors group"` |
| 101 | hex | `#0B1325` | `<h3 className="font-serif text-sm font-bold text-[#0B1325] flex items-center gap-1.5">` |
| 116 | hex | `#005B4F` | `<Layers className="h-3.5 w-3.5 text-[#005B4F]" />` |
| 136 | hex | `#FAF8F5` | `className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-[#FAF8F5] text-stone-700 border border-stone-200"` |

### `src\components\career\report\chapters\09Companies.tsx` - 10

| Line | Kind | Value | Context |
|---:|---|---|---|
| 103 | hex | `#161F33` | `<div className="rounded-2xl border border-white/10 bg-[#161F33] text-white shadow-lg overflow-hidden">` |
| 142 | hex | `#0B0F19` | `<div className="border-t border-white/10 p-5 space-y-4 bg-[#0B0F19]">` |
| 144 | hex | `#161F33` | `<div className="rounded-xl border border-white/10 bg-[#161F33] p-4 text-xs text-slate-300 space-y-2">` |
| 205 | hex | `#161F33` | `<li key={pt} className="rounded-xl border border-white/10 bg-[#161F33] p-3">` |
| 221 | hex | `#2563EB` | `className="inline-flex items-center gap-1.5 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold text-xs px-4 py-2 shadow-md transition-colors"` |
| 221 | hex | `#1d4ed8` | `className="inline-flex items-center gap-1.5 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold text-xs px-4 py-2 shadow-md transition-colors"` |
| 350 | hex | `#161F33` | `className="w-full rounded-xl border border-white/15 bg-[#161F33] px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-400"` |
| 368 | hex | `#161F33` | `className="w-full rounded-xl border border-white/15 bg-[#161F33] px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-400"` |
| 386 | hex | `#161F33` | `className="w-full rounded-xl border border-white/15 bg-[#161F33] px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-400"` |
| 415 | hex | `#161F33` | `<div className="rounded-2xl border border-white/10 bg-[#161F33] p-6 text-sm text-slate-300">` |

### `src\components\home\HomeJourneyRoadmap.tsx` - 10

| Line | Kind | Value | Context |
|---:|---|---|---|
| 38 | hex | `#E4EAF2` | `<section className="py-14 sm:py-20 bg-white border-b border-[#E4EAF2] tone-light card-light">` |
| 42 | hex | `#1557D6` | `<div className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#1557D6] mb-2 flex items-center justify-center gap-1.5">` |
| 45 | hex | `#071A4A` | `<h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-[#071A4A] tracking-tight leading-tight">` |
| 54 | hex | `#E4EAF2` | `className="hidden lg:block absolute top-7 left-[8%] right-[8%] h-[2px] bg-[#E4EAF2] -z-0"` |
| 68 | hex | `#D0E1FD` | `<div className="grid h-14 w-14 place-items-center rounded-full bg-white border-2 border-[#D0E1FD] group-hover:border-[#1557D6] text-[#1557D6] shadow-sm transition-all tone-light ca` |
| 68 | hex | `#1557D6` | `<div className="grid h-14 w-14 place-items-center rounded-full bg-white border-2 border-[#D0E1FD] group-hover:border-[#1557D6] text-[#1557D6] shadow-sm transition-all tone-light ca` |
| 68 | hex | `#1557D6` | `<div className="grid h-14 w-14 place-items-center rounded-full bg-white border-2 border-[#D0E1FD] group-hover:border-[#1557D6] text-[#1557D6] shadow-sm transition-all tone-light ca` |
| 71 | hex | `#1557D6` | `<span className="absolute -top-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-[#1557D6] text-white text-[10px] font-mono font-bold">` |
| 77 | hex | `#071A4A` | `<h3 className="font-sans text-sm sm:text-base font-bold text-[#071A4A] leading-tight mb-1.5">` |
| 80 | hex | `#64748B` | `<p className="text-xs text-[#64748B] leading-relaxed max-w-[200px]">` |

### `src\components\landing\ProgramAtAGlance.tsx` - 10

| Line | Kind | Value | Context |
|---:|---|---|---|
| 18 | hex | `#1B3F8B` | `color: "text-[#1B3F8B]",` |
| 50 | hex | `#8A6D1F` | `color: "text-[#8A6D1F]",` |
| 65 | hex | `#1A1A1A` | `<section className="py-8 sm:py-10 bg-white tone-light text-[#1A1A1A] border-b border-stone-200">` |
| 70 | hex | `#1B3F8B` | `<div className="h-1 w-5 sm:w-6 bg-[#1B3F8B] rounded-full" />` |
| 115 | hex | `#1A1A1A` | `<p className="font-serif font-bold text-[#1A1A1A] text-base sm:text-lg mt-0.5">` |
| 122 | hex | `#1B3F8B` | `className="flex-1 sm:flex-none h-11 sm:h-12 min-h-[44px] px-3.5 sm:px-5 inline-flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold border border-[#1B3F8B` |
| 122 | hex | `#1B3F8B` | `className="flex-1 sm:flex-none h-11 sm:h-12 min-h-[44px] px-3.5 sm:px-5 inline-flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold border border-[#1B3F8B` |
| 128 | hex | `#1B3F8B` | `style={{ color: "#FFFFFF", backgroundColor: "#1B3F8B" }}` |
| 129 | hex | `#1B3F8B` | `className="flex-1 sm:flex-none h-11 sm:h-12 min-h-[44px] px-3.5 sm:px-5 inline-flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-extrabold text-slate-50 rou` |
| 129 | hex | `#153270` | `className="flex-1 sm:flex-none h-11 sm:h-12 min-h-[44px] px-3.5 sm:px-5 inline-flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-extrabold text-slate-50 rou` |

### `src\components\landing\ProofWallBlock.tsx` - 10

| Line | Kind | Value | Context |
|---:|---|---|---|
| 65 | hex | `#FFFFFF` | `* Design: White background (#FFFFFF). Grid of six verifiable tiles.` |
| 73 | hex | `#1A1A1A` | `className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white tone-light text-[#1A1A1A] border-b border-stone-200"` |
| 83 | hex | `#1A1A1A` | `className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1A1A1A] tracking-tight leading-[1.18]"` |
| 86 | hex | `#1B3F8B` | `<span className="italic text-[#1B3F8B]">We give you a link to check it yourself.</span>` |
| 97 | hex | `#F7F5F0` | `className="rounded-2xl border border-stone-300 bg-[#F7F5F0] p-6 space-y-4 flex flex-col justify-between hover:border-stone-400 transition-colors"` |
| 104 | hex | `#1B3F8B` | `<Icon className="h-4 w-4 text-[#1B3F8B]" />` |
| 107 | hex | `#1B3F8B` | `<p className="font-serif text-xl sm:text-2xl font-bold text-[#1B3F8B] tracking-tight">` |
| 111 | hex | `#1A1A1A` | `<h3 className="font-serif text-base font-bold text-[#1A1A1A] leading-snug">` |
| 122 | hex | `#1B3F8B` | `className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#1B3F8B] hover:text-[#153270] pt-3 border-t border-stone-300/80"` |
| 122 | hex | `#153270` | `className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#1B3F8B] hover:text-[#153270] pt-3 border-t border-stone-300/80"` |

### `src\components\landing\SalaryChart.tsx` - 10

| Line | Kind | Value | Context |
|---:|---|---|---|
| 19 | hex | `#1B3F8B` | `{ role: "Pharmacovigilance", min: 2.5, max: 4.5, color: "#1B3F8B" },` |
| 20 | hex | `#2563EB` | `{ role: "Medical Coding", min: 3, max: 5.5, color: "#2563EB" },` |
| 21 | hex | `#0EA5E9` | `{ role: "Clinical Data Mgmt", min: 3.5, max: 6, color: "#0EA5E9" },` |
| 22 | hex | `#8A6D1F` | `{ role: "CRA / Monitoring", min: 4, max: 7, color: "#8A6D1F" },` |
| 45 | hex | `#1A1A1A` | `<p className="font-bold text-[#1A1A1A] mb-1">{label}</p>` |
| 79 | rgba | `rgba(0,0,0,0.06)` | `<CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" vertical={false} />` |
| 82 | hex | `#6B7280` | `tick={{ fontSize: 10, fontFamily: "monospace", fill: "#6B7280", fontWeight: 600 }}` |
| 89 | hex | `#6B7280` | `tick={{ fontSize: 10, fontFamily: "monospace", fill: "#6B7280" }}` |
| 94 | rgba | `rgba(27,63,139,0.04)` | `<Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(27,63,139,0.04)" }} />` |
| 102 | hex | `#1A1A1A` | `style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", fill: "#1A1A1A" }}` |

### `src\components\opportunity\OpportunityCard.tsx` - 10

| Line | Kind | Value | Context |
|---:|---|---|---|
| 30 | hex | `#1B3F8B` | `? "border-2 border-[#1B3F8B] bg-white shadow-xl ring-4 ring-[#1B3F8B]/10 translate-x-1"` |
| 30 | hex | `#1B3F8B` | `? "border-2 border-[#1B3F8B] bg-white shadow-xl ring-4 ring-[#1B3F8B]/10 translate-x-1"` |
| 32 | hex | `#1B3F8B` | `} focus:outline-none focus:ring-2 focus:ring-[#1B3F8B] focus:ring-offset-2`}` |
| 36 | hex | `#1B3F8B` | `<div className="absolute left-0 top-3 bottom-3 w-1.5 bg-[#1B3F8B] rounded-r-full" />` |
| 43 | hex | `#1B3F8B` | `<span className="font-mono text-[11px] font-bold text-[#1B3F8B] uppercase tracking-wider block truncate">` |
| 47 | hex | `#1B3F8B` | `<span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#1B3F8B]/10 text-[#1B3F8B] font-mono text-[10px] font-bold uppercase">` |
| 47 | hex | `#1B3F8B` | `<span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#1B3F8B]/10 text-[#1B3F8B] font-mono text-[10px] font-bold uppercase">` |
| 80 | hex | `#1B3F8B` | `<Users className="h-3.5 w-3.5 text-[#1B3F8B]" />` |
| 116 | hex | `#1B3F8B` | `isSelected ? "text-[#1B3F8B] underline" : "text-stone-600 group-hover:text-[#1B3F8B]"` |
| 116 | hex | `#1B3F8B` | `isSelected ? "text-[#1B3F8B] underline" : "text-stone-600 group-hover:text-[#1B3F8B]"` |

### `src\components\workshop\InteractiveCareerExplorer.tsx` - 10

| Line | Kind | Value | Context |
|---:|---|---|---|
| 92 | hex | `#020617` | `<section id="explorer" className="tone-dark bg-[#020617] py-24 text-white border-t border-slate-900/60 relative">` |
| 125 | hex | `#0f172a` | `: "bg-[#0f172a]/60 hover:bg-[#0f172a]/90 text-slate-200 border border-slate-800"` |
| 125 | hex | `#0f172a` | `: "bg-[#0f172a]/60 hover:bg-[#0f172a]/90 text-slate-200 border border-slate-800"` |
| 129 | hex | `#080d1a` | `<div className={`p-2.5 rounded-xl ${isSelected ? "bg-blue-600 text-white" : "bg-[#080d1a] text-slate-300 border border-slate-800"}`}>` |
| 152 | hex | `#0f172a` | `className="rounded-2xl bg-[#0f172a] p-6 sm:p-8 backdrop-blur-md border border-slate-800"` |
| 169 | hex | `#080d1a` | `<div className="mt-6 rounded-xl bg-[#080d1a] p-4 border border-slate-800">` |
| 176 | hex | `#0f172a` | `<div key={sp.year} className="p-2.5 rounded-lg bg-[#0f172a] border border-slate-800">` |
| 186 | hex | `#080d1a` | `<div className="rounded-xl bg-[#080d1a] p-4 border border-slate-800">` |
| 194 | hex | `#080d1a` | `<div className="rounded-xl bg-[#080d1a] p-4 border border-slate-800">` |
| 220 | hex | `#080d1a` | `<span key={c} className="inline-flex items-center gap-1.5 rounded-lg bg-[#080d1a] px-3 py-1 text-xs font-semibold text-slate-200 border border-slate-800">` |

### `src\components\workshop\WorkshopCertificatePreview.tsx` - 10

| Line | Kind | Value | Context |
|---:|---|---|---|
| 34 | hex | `#1B3F8B` | `<Award className="w-3.5 h-3.5 text-[#1B3F8B]" />` |
| 57 | hex | `#1B3F8B` | `<span className="font-mono text-[9px] sm:text-[10px] text-[#1B3F8B] font-bold pr-2.5 sm:pr-3 uppercase">` |
| 64 | hex | `#1B3F8B` | `<div className="relative rounded-xl sm:rounded-2xl border-2 sm:border-4 border-double border-[#1B3F8B]/30 bg-white tone-light p-4 sm:p-10 space-y-4 sm:space-y-6 text-center shadow-` |
| 70 | hex | `#0B1325` | `<span className="select-none font-serif text-6xl sm:text-8xl font-black tracking-widest text-[#0B1325]">` |
| 83 | hex | `#1B3F8B` | `<span className="font-mono text-[9px] uppercase tracking-widest text-[#1B3F8B] font-extrabold block mt-0.5">` |
| 97 | hex | `#1B3F8B` | `<span className="font-mono text-[10px] sm:text-xs font-black tracking-[0.25em] text-[#1B3F8B] uppercase block">` |
| 104 | hex | `#0B1325` | `<span className="font-serif text-2xl sm:text-4xl font-bold text-[#0B1325] tracking-tight border-b-2 border-amber-500/60 pb-1 inline-block px-4">` |
| 133 | hex | `#1B3F8B` | `<div className="font-serif italic text-base text-[#1B3F8B] font-bold leading-none">` |
| 177 | hex | `#0B1325` | `className="inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono text-xs font-bold uppercase tracking-wider tran` |
| 177 | hex | `#1B3F8B` | `className="inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono text-xs font-bold uppercase tracking-wider tran` |

### `src\components\3d\Healthcare3dCanvas.tsx` - 9

| Line | Kind | Value | Context |
|---:|---|---|---|
| 66 | rgba | `rgba(27, 63, 139, 0.9)` | `{ color: "rgba(27, 63, 139, 0.9)", glow: "rgba(27, 63, 139, 0.4)" }, // Navy` |
| 66 | rgba | `rgba(27, 63, 139, 0.4)` | `{ color: "rgba(27, 63, 139, 0.9)", glow: "rgba(27, 63, 139, 0.4)" }, // Navy` |
| 67 | rgba | `rgba(13, 148, 136, 0.9)` | `{ color: "rgba(13, 148, 136, 0.9)", glow: "rgba(13, 148, 136, 0.4)" }, // Teal` |
| 67 | rgba | `rgba(13, 148, 136, 0.4)` | `{ color: "rgba(13, 148, 136, 0.9)", glow: "rgba(13, 148, 136, 0.4)" }, // Teal` |
| 68 | rgba | `rgba(138, 109, 31, 0.9)` | `{ color: "rgba(138, 109, 31, 0.9)", glow: "rgba(138, 109, 31, 0.4)" }, // Gold` |
| 68 | rgba | `rgba(138, 109, 31, 0.4)` | `{ color: "rgba(138, 109, 31, 0.9)", glow: "rgba(138, 109, 31, 0.4)" }, // Gold` |
| 69 | rgba | `rgba(2, 132, 199, 0.9)` | `{ color: "rgba(2, 132, 199, 0.9)", glow: "rgba(2, 132, 199, 0.4)" }, // Sky Blue` |
| 69 | rgba | `rgba(2, 132, 199, 0.4)` | `{ color: "rgba(2, 132, 199, 0.9)", glow: "rgba(2, 132, 199, 0.4)" }, // Sky Blue` |
| 199 | rgba | `rgba(255, 255, 255, 0)` | `gradient.addColorStop(1, "rgba(255, 255, 255, 0)");` |

### `src\components\3d\Interactive3dBoardingPass.tsx` - 9

| Line | Kind | Value | Context |
|---:|---|---|---|
| 73 | hex | `#0B1325` | `className="w-full rounded-3xl border-2 border-stone-800/90 bg-gradient-to-b from-[#0B1325] via-[#0E1B38] to-[#070D1B] text-white p-6 sm:p-7 space-y-5 relative overflow-hidden shado` |
| 73 | hex | `#0E1B38` | `className="w-full rounded-3xl border-2 border-stone-800/90 bg-gradient-to-b from-[#0B1325] via-[#0E1B38] to-[#070D1B] text-white p-6 sm:p-7 space-y-5 relative overflow-hidden shado` |
| 73 | hex | `#070D1B` | `className="w-full rounded-3xl border-2 border-stone-800/90 bg-gradient-to-b from-[#0B1325] via-[#0E1B38] to-[#070D1B] text-white p-6 sm:p-7 space-y-5 relative overflow-hidden shado` |
| 85 | hex | `#FAF8F5` | `<div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#FAF8F5] border border-stone-300" />` |
| 86 | hex | `#FAF8F5` | `<div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#FAF8F5] border border-stone-300" />` |
| 192 | hex | `#0B1325` | `<QrCode className="w-full h-full text-[#0B1325]" />` |
| 209 | hex | `#070D1B` | `className="absolute inset-0 w-full h-full rounded-3xl border-2 border-amber-400/40 bg-gradient-to-b from-[#070D1B] via-[#0E1B38] to-[#0B1325] text-white p-6 sm:p-7 space-y-4 shadow` |
| 209 | hex | `#0E1B38` | `className="absolute inset-0 w-full h-full rounded-3xl border-2 border-amber-400/40 bg-gradient-to-b from-[#070D1B] via-[#0E1B38] to-[#0B1325] text-white p-6 sm:p-7 space-y-4 shadow` |
| 209 | hex | `#0B1325` | `className="absolute inset-0 w-full h-full rounded-3xl border-2 border-amber-400/40 bg-gradient-to-b from-[#070D1B] via-[#0E1B38] to-[#0B1325] text-white p-6 sm:p-7 space-y-4 shadow` |

### `src\components\acri\AcriFooter.tsx` - 9

| Line | Kind | Value | Context |
|---:|---|---|---|
| 28 | hex | `#FAF8F5` | `<footer className="bg-[#FAF8F5] pt-16 pb-12 text-stone-700 border-t border-stone-200">` |
| 45 | hex | `#0B1325` | `className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-300 bg-white tone-light text-stone-600 hover:text-[#0B1325] hover:border-stone-400 transition-col` |
| 54 | hex | `#0B1325` | `className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-300 bg-white tone-light text-stone-600 hover:text-[#0B1325] hover:border-stone-400 transition-col` |
| 63 | hex | `#0B1325` | `className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-300 bg-white tone-light text-stone-600 hover:text-[#0B1325] hover:border-stone-400 transition-col` |
| 72 | hex | `#0B1325` | `className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-300 bg-white tone-light text-stone-600 hover:text-[#0B1325] hover:border-stone-400 transition-col` |
| 197 | hex | `#0B1325` | `className="w-full rounded-lg border border-stone-300 bg-white tone-light px-3 py-2 pr-10 text-xs text-stone-900 placeholder:text-stone-400 focus:border-[#0B1325] focus:outline-none` |
| 202 | hex | `#0B1325` | `className="absolute right-1 flex h-7 w-7 items-center justify-center rounded-md bg-[#0B1325] text-white hover:bg-[#152342] transition-colors"` |
| 202 | hex | `#152342` | `className="absolute right-1 flex h-7 w-7 items-center justify-center rounded-md bg-[#0B1325] text-white hover:bg-[#152342] transition-colors"` |
| 213 | hex | `#0B1325` | `className="rounded border-stone-300 text-[#0B1325] focus:ring-0"` |

### `src\components\career\ProductComparisonTable.tsx` - 9

| Line | Kind | Value | Context |
|---:|---|---|---|
| 16 | hex | `#071A4A` | `<h2 className="mt-2 text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#071A4A]">` |
| 36 | hex | `#071A4A` | `<th className={`py-3 px-3 rounded-t-xl w-[37.5%] ${activeProduct === "assessment" ? "bg-blue-50/70 text-[#071A4A]" : "text-[#071A4A]"}`}>` |
| 36 | hex | `#071A4A` | `<th className={`py-3 px-3 rounded-t-xl w-[37.5%] ${activeProduct === "assessment" ? "bg-blue-50/70 text-[#071A4A]" : "text-[#071A4A]"}`}>` |
| 38 | hex | `#1557D6` | `<Compass className="h-4 w-4 text-[#1557D6]" />` |
| 42 | hex | `#071A4A` | `<th className={`py-3 px-3 rounded-t-xl w-[37.5%] ${activeProduct === "acri" ? "bg-emerald-50/70 text-[#071A4A]" : "text-[#071A4A]"}`}>` |
| 42 | hex | `#071A4A` | `<th className={`py-3 px-3 rounded-t-xl w-[37.5%] ${activeProduct === "acri" ? "bg-emerald-50/70 text-[#071A4A]" : "text-[#071A4A]"}`}>` |
| 110 | hex | `#1557D6` | `className="inline-flex items-center gap-1 text-xs font-bold text-[#1557D6] hover:underline"` |
| 140 | hex | `#071A4A` | `<span className="font-semibold text-[#071A4A]">Not sure which to choose?</span> Start with{" "}` |
| 141 | hex | `#1557D6` | `<strong className="text-[#1557D6]">Career Assessment</strong> if you're deciding where to go. Choose{" "}` |

### `src\components\career-explorer\JobMatchEngine.tsx` - 9

| Line | Kind | Value | Context |
|---:|---|---|---|
| 181 | hex | `#0B152C` | `<div className="w-full max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-[#0B152C] border border-slate-800 space-y-6 text-left shadow-2xl">` |
| 217 | hex | `#070D1B` | `className="w-full h-11 px-3 rounded-xl bg-[#070D1B] border border-slate-800 font-sans text-xs text-slate-100 focus:outline-none focus:border-sky-400 cursor-pointer"` |
| 239 | hex | `#070D1B` | `className="w-full h-11 px-3 rounded-xl bg-[#070D1B] border border-slate-800 font-sans text-xs text-slate-100 focus:outline-none focus:border-sky-400 cursor-pointer"` |
| 262 | hex | `#070D1B` | `className="w-full h-11 px-3 rounded-xl bg-[#070D1B] border border-slate-800 font-sans text-xs text-slate-100 focus:outline-none focus:border-sky-400 cursor-pointer"` |
| 289 | hex | `#0C1938` | `<div className="p-6 rounded-2xl bg-gradient-to-b from-[#0C1938] to-[#070D1B] border border-sky-400/40 flex flex-col sm:flex-row items-center justify-between gap-6">` |
| 289 | hex | `#070D1B` | `<div className="p-6 rounded-2xl bg-gradient-to-b from-[#0C1938] to-[#070D1B] border border-sky-400/40 flex flex-col sm:flex-row items-center justify-between gap-6">` |
| 305 | hex | `#070D1B` | `<div className="shrink-0 p-4 rounded-xl bg-[#070D1B] border border-slate-800 text-center font-mono text-xs space-y-1">` |
| 314 | hex | `#070D1B` | `<div className="p-4 rounded-xl bg-[#070D1B] border border-emerald-500/30 space-y-2">` |
| 328 | hex | `#070D1B` | `<div className="p-4 rounded-xl bg-[#070D1B] border border-amber-500/30 space-y-2">` |

### `src\components\credibility\JDProvenanceBadge.tsx` - 9

| Line | Kind | Value | Context |
|---:|---|---|---|
| 67 | hex | `#0B1426` | `className={"rounded-3xl border border-slate-800 bg-[#0B1426] p-6 sm:p-8 " + (className ?? "")}` |
| 70 | hex | `#7DD3FC` | `<ShieldCheck className="h-3.5 w-3.5" style={{ color: "#7DD3FC" }} />` |
| 73 | hex | `#7DD3FC` | `style={{ color: "#7DD3FC" }}` |
| 94 | hex | `#7DD3FC` | `style={{ color: "#7DD3FC" }}` |
| 104 | hex | `#94A3B8` | `<p className="mt-1 text-xs" style={{ color: "#94A3B8" }}>` |
| 111 | hex | `#7DD3FC` | `style={{ color: "#7DD3FC" }}` |
| 118 | hex | `#94A3B8` | `<p className="mt-1 text-xs" style={{ color: "#94A3B8" }}>` |
| 125 | hex | `#7DD3FC` | `style={{ color: "#7DD3FC" }}` |
| 146 | hex | `#7DD3FC` | `<MapPin className="h-3.5 w-3.5" style={{ color: "#7DD3FC" }} />` |

### `src\components\landing\EditorialClosingCTA.tsx` - 9

| Line | Kind | Value | Context |
|---:|---|---|---|
| 19 | hex | `#FAF8F5` | `<section id="apply" className="py-20 sm:py-28 border-b border-stone-200 bg-[#FAF8F5]">` |
| 26 | hex | `#1B3F8B` | `<BorderBeam size={260} duration={10} delay={1} colorFrom="#1B3F8B" colorTo="#0D9488" />` |
| 26 | hex | `#0D9488` | `<BorderBeam size={260} duration={10} delay={1} colorFrom="#1B3F8B" colorTo="#0D9488" />` |
| 29 | hex | `#1B3F8B` | `<div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#1B3F8B] via-teal-500 to-[#8A6D1F]" />` |
| 29 | hex | `#8A6D1F` | `<div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#1B3F8B] via-teal-500 to-[#8A6D1F]" />` |
| 42 | hex | `#1A1A1A` | `<h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight leading-[1.12]">` |
| 59 | hex | `#1B3F8B` | `className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 sm:h-13 px-5 sm:px-8 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-slate-50 font-bold text-sm track` |
| 59 | hex | `#153270` | `className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 sm:h-13 px-5 sm:px-8 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-slate-50 font-bold text-sm track` |
| 91 | hex | `#8A6D1F` | `<ShieldCheck className="h-3.5 w-3.5 text-[#8A6D1F]" />` |

### `src\components\landing\ExitIntentQuiz.tsx` - 9

| Line | Kind | Value | Context |
|---:|---|---|---|
| 87 | hex | `#1B3F8B` | `className="h-1.5 w-full bg-gradient-to-r from-[#1B3F8B] via-[#8A6D1F] to-[#1B3F8B]"` |
| 87 | hex | `#8A6D1F` | `className="h-1.5 w-full bg-gradient-to-r from-[#1B3F8B] via-[#8A6D1F] to-[#1B3F8B]"` |
| 87 | hex | `#1B3F8B` | `className="h-1.5 w-full bg-gradient-to-r from-[#1B3F8B] via-[#8A6D1F] to-[#1B3F8B]"` |
| 105 | hex | `#1A1A1A` | `<h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A] leading-snug">` |
| 107 | hex | `#1B3F8B` | `<span className="text-[#1B3F8B] italic font-normal">your right fit?</span>` |
| 117 | hex | `#1B3F8B` | `<ClipboardCheck className="h-4 w-4 shrink-0 text-[#1B3F8B]" />` |
| 121 | hex | `#8A6D1F` | `<GraduationCap className="h-4 w-4 shrink-0 text-[#8A6D1F]" />` |
| 133 | hex | `#1B3F8B` | `className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-slate-50 font-bold text-xs shadow-md transition-all cursor-pointer"` |
| 133 | hex | `#153270` | `className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-slate-50 font-bold text-xs shadow-md transition-all cursor-pointer"` |

### `src\components\landing\IndustryResearchPublication.tsx` - 9

| Line | Kind | Value | Context |
|---:|---|---|---|
| 51 | hex | `#FAF8F5` | `<section id="research" className="py-16 sm:py-24 border-b border-stone-200 bg-[#FAF8F5]">` |
| 58 | hex | `#1B3F8B` | `<span className="px-3 py-1 rounded-full bg-[#1B3F8B] text-slate-50 font-mono text-[10px] font-bold uppercase tracking-wider shadow-xs">` |
| 66 | hex | `#1A1A1A` | `<h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">` |
| 80 | hex | `#1B3F8B` | `<ArrowRight className="h-4 w-4 text-[#1B3F8B]" />` |
| 96 | hex | `#1B3F8B` | `<BarChart3 className="h-5 w-5 text-[#1B3F8B]" />` |
| 113 | hex | `#1B3F8B` | `<span className="font-mono font-bold text-[#1B3F8B]">{item.frequency}%</span>` |
| 118 | hex | `#1B3F8B` | `className="h-full bg-gradient-to-r from-[#1B3F8B] to-blue-500 rounded-full"` |
| 147 | hex | `#1A1A1A` | `<h3 className="font-serif text-xl font-bold text-[#1A1A1A] leading-snug">` |
| 177 | hex | `#1B3F8B` | `<span className="font-mono text-[11px] font-bold text-[#1B3F8B] uppercase tracking-wider block">` |

### `src\components\landing\LivePipelineFunnel.tsx` - 9

| Line | Kind | Value | Context |
|---:|---|---|---|
| 54 | hex | `#FAF9F5` | `className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF9F5] text-[#0F2942] border-b border-stone-200"` |
| 54 | hex | `#0F2942` | `className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF9F5] text-[#0F2942] border-b border-stone-200"` |
| 60 | hex | `#0F2942` | `<span className="font-mono text-[11px] font-bold tracking-widest text-[#0F2942] uppercase block">` |
| 65 | hex | `#0F2942` | `className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#0F2942] tracking-tight leading-tight"` |
| 68 | hex | `#1B3F8B` | `<span className="italic font-normal text-[#1B3F8B]">Find out if your profile qualifies.</span>` |
| 76 | hex | `#0F2942` | `<div className="flex items-center gap-2 text-[#0F2942] font-semibold">` |
| 77 | hex | `#1B3F8B` | `<Clock className="w-3.5 h-3.5 text-[#1B3F8B] shrink-0" />` |
| 98 | hex | `#0F2942` | `item.highlight ? "text-emerald-700" : "text-[#0F2942]"` |
| 116 | hex | `#0F2942` | `<div className="bg-[#0F2942] text-slate-50 rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl border border-slate-700/60">` |

### `src\components\landing\SelectivityBlock.tsx` - 9

| Line | Kind | Value | Context |
|---:|---|---|---|
| 7 | hex | `#FAF8F5` | `* Design: Off-white background (#FAF8F5), side-by-side suitability criteria` |
| 28 | hex | `#FAF8F5` | `className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] text-[#1A1A1A] border-b border-stone-200"` |
| 28 | hex | `#1A1A1A` | `className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] text-[#1A1A1A] border-b border-stone-200"` |
| 38 | hex | `#1A1A1A` | `className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1A1A1A] tracking-tight leading-[1.18]"` |
| 57 | hex | `#065F46` | `style={{ color: "#065F46", backgroundColor: "#ECFDF5", borderColor: "#6EE7B7" }}` |
| 57 | hex | `#6EE7B7` | `style={{ color: "#065F46", backgroundColor: "#ECFDF5", borderColor: "#6EE7B7" }}` |
| 82 | hex | `#F7F5F0` | `className="flex items-center gap-3 rounded-xl border border-stone-200 bg-[#F7F5F0] p-4 text-stone-800 font-medium text-sm sm:text-base"` |
| 84 | hex | `#1B3F8B` | `<CheckCircle className="h-5 w-5 text-[#1B3F8B] shrink-0" />` |
| 91 | hex | `#1B3F8B` | `<p className="font-serif text-xl sm:text-2xl font-bold text-[#1B3F8B] italic">` |

### `src\components\workshop\WorkshopHero.tsx` - 9

| Line | Kind | Value | Context |
|---:|---|---|---|
| 47 | hex | `#020617` | `<section className="tone-dark relative overflow-hidden bg-[#020617] pt-8 sm:pt-10 pb-20 text-white selection:bg-blue-500 selection:text-white">` |
| 112 | hex | `#0f172a` | `className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-[#0f172a]/90 px-6 py-3.5 text-sm font-semibold text-slate-100 hover:text-white hover:` |
| 152 | hex | `#0f172a` | `className="w-full max-w-xl lg:max-w-2xl mx-auto rounded-2xl border border-slate-800 bg-[#0f172a]/95 p-6 sm:p-7 shadow-2xl shadow-blue-950/40 relative overflow-hidden backdrop-blur-` |
| 178 | hex | `#080d1a` | `: "bg-[#080d1a] text-slate-200 hover:text-white hover:bg-slate-800 border border-slate-800"` |
| 202 | hex | `#080d1a` | `<div className="rounded-xl bg-[#080d1a] p-4 min-h-[96px] flex flex-col justify-between border border-slate-800">` |
| 206 | hex | `#080d1a` | `<div className="rounded-xl bg-[#080d1a] p-4 min-h-[96px] flex flex-col justify-between border border-slate-800">` |
| 216 | hex | `#080d1a` | `<div className="rounded-xl bg-[#080d1a] p-4 min-h-[96px] flex flex-col justify-between border border-slate-800">` |
| 220 | hex | `#080d1a` | `<div className="rounded-xl bg-[#080d1a] p-4 min-h-[96px] flex flex-col justify-between border border-slate-800">` |
| 227 | hex | `#080d1a` | `<div className="rounded-xl bg-[#080d1a] p-4 border border-slate-800">` |

### `src\lib\email-templates\enrolment-recovery.tsx` - 9

| Line | Kind | Value | Context |
|---:|---|---|---|
| 108 | hex | `#0A0F1E` | `color: "#0A0F1E",` |
| 114 | hex | `#374151` | `color: "#374151",` |
| 120 | hex | `#BFDBFE` | `border: "1px solid #BFDBFE",` |
| 130 | hex | `#1E40AF` | `color: "#1E40AF",` |
| 137 | hex | `#0F172A` | `color: "#0F172A",` |
| 141 | hex | `#1E4D8C` | `backgroundColor: "#1E4D8C",` |
| 152 | hex | `#6B7280` | `color: "#6B7280",` |
| 156 | hex | `#1E4D8C` | `const link = { color: "#1E4D8C", textDecoration: "underline" };` |
| 158 | hex | `#9CA3AF` | `const footer = { fontSize: "12px", color: "#9CA3AF", margin: "0 0 6px", lineHeight: 1.5 };` |

### `src\routes\enrol.$tier.pay.tsx` - 9

| Line | Kind | Value | Context |
|---:|---|---|---|
| 128 | hex | `#070B17` | `<div className="min-h-screen bg-[#070B17] px-5 py-12 sm:px-6 motion-safe:animate-pulse">` |
| 591 | hex | `#3B82F6` | `themeColor: "#3B82F6",` |
| 1025 | hex | `#1A1A1A` | `<strong className="text-[#1A1A1A] font-bold">{intent.name.split(" ")[0]}</strong>.` |
| 1040 | hex | `#1A1A1A` | `<h3 className="font-sans text-2xl sm:text-3xl font-bold text-[#1A1A1A] mt-2 tracking-tight">` |
| 1052 | hex | `#1A1A1A` | `<strong className="text-[#1A1A1A] font-mono font-bold">₹1,000</strong> now to secure` |
| 1103 | hex | `#1A1A1A` | `<h3 className="font-sans text-2xl font-bold text-[#1A1A1A] mt-0.5 tracking-tight">` |
| 1129 | hex | `#1A1A1A` | `<strong className="font-mono text-[#1A1A1A] font-bold">{formatInr(total)}</strong>{" "}` |
| 1234 | hex | `#1B3F8B` | `className="h-11 flex-1 rounded-xl border border-[var(--arzon-border-strong)] bg-white px-3.5 text-xs font-mono text-[var(--arzon-ink-strong)] placeholder:text-[var(--arzon-ink-mute` |
| 1239 | hex | `#153270` | `className="h-11 px-5 rounded-xl bg-[var(--arzon-blue-700)] hover:bg-[#153270] text-white font-bold text-xs shadow-xs disabled:opacity-50"` |

### `src\routes\internships.index.tsx` - 9

| Line | Kind | Value | Context |
|---:|---|---|---|
| 146 | hex | `#FAF8F5` | `<div className="min-h-screen bg-[#FAF8F5] text-[#0B1325] font-sans pb-24">` |
| 146 | hex | `#0B1325` | `<div className="min-h-screen bg-[#FAF8F5] text-[#0B1325] font-sans pb-24">` |
| 151 | hex | `#1B3F8B` | `<Briefcase className="h-4 w-4 text-[#1B3F8B]" />` |
| 152 | hex | `#1B3F8B` | `<span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">` |
| 189 | hex | `#1B3F8B` | `<span className="font-mono text-xs font-bold text-[#1B3F8B] bg-blue-50/80 border border-blue-100 px-2.5 py-0.5 rounded">` |
| 192 | hex | `#8A6D1F` | `<span className="font-mono text-xs font-bold text-[#8A6D1F]">` |
| 242 | hex | `#0B1325` | `className="inline-flex items-center justify-between w-full h-10 px-4 rounded-lg bg-[#0B1325] hover:bg-[#1B3F8B] text-slate-50 font-mono text-xs font-bold uppercase tracking-wider t` |
| 242 | hex | `#1B3F8B` | `className="inline-flex items-center justify-between w-full h-10 px-4 rounded-lg bg-[#0B1325] hover:bg-[#1B3F8B] text-slate-50 font-mono text-xs font-bold uppercase tracking-wider t` |
| 259 | hex | `#1B3F8B` | `<AlertCircle className="h-4 w-4 text-[#1B3F8B]" />` |

### `src\components\acri\assessment\AcriWorkSimulation.tsx` - 8

| Line | Kind | Value | Context |
|---:|---|---|---|
| 60 | hex | `#07241A` | `<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-[#07241A] text-emerald-400">` |
| 140 | hex | `#0B1325` | `<h2 className="text-base sm:text-lg lg:text-xl font-bold text-[#0B1325] leading-snug">` |
| 350 | hex | `#0B1325` | `className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-[#0B1325] hover:bg-[#1B3` |
| 350 | hex | `#1B3F8B` | `className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-[#0B1325] hover:bg-[#1B3` |
| 359 | hex | `#0B1325` | `className="flex items-center gap-1 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-[#0B1325] hover:bg-[#1B3F8` |
| 359 | hex | `#1B3F8B` | `className="flex items-center gap-1 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-[#0B1325] hover:bg-[#1B3F8` |
| 568 | hex | `#0B1325` | `<span className="font-bold text-sm text-[#0B1325]">{opt.text}</span>` |
| 705 | hex | `#0B1325` | `<div className="flex items-center justify-center h-7 w-7 rounded-full bg-[#0B1325] text-white font-mono font-bold text-xs shrink-0">` |

### `src\components\career\result\ResultConversion.tsx` - 8

| Line | Kind | Value | Context |
|---:|---|---|---|
| 39 | hex | `#071A4A` | `<section className="rounded-3xl border border-[#071A4A] bg-[#071A4A] text-white p-6 sm:p-10 shadow-lg relative overflow-hidden">` |
| 39 | hex | `#071A4A` | `<section className="rounded-3xl border border-[#071A4A] bg-[#071A4A] text-white p-6 sm:p-10 shadow-lg relative overflow-hidden">` |
| 41 | hex | `#1557D6` | `<div className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-[#1557D6]/30 blur-3xl" />` |
| 44 | hex | `#D4AF37` | `<span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#D4AF37]">` |
| 61 | hex | `#1557D6` | `className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#1557D6] px-6 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-[#2878F0] transition-all tra` |
| 61 | hex | `#2878F0` | `className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#1557D6] px-6 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-[#2878F0] transition-all tra` |
| 73 | hex | `#25D366` | `<MessageCircle className="h-4 w-4 text-[#25D366]" />` |
| 81 | hex | `#D4AF37` | `<Compass className="h-3.5 w-3.5 text-[#D4AF37]" />` |

### `src\components\courses\EnquiryForm.tsx` - 8

| Line | Kind | Value | Context |
|---:|---|---|---|
| 122 | hex | `#0A0F1E` | `className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-white text-[#0A0F1E] px-5 text-sm font-semibold hover:bg-white/90"` |
| 217 | hex | `#0A0F1E` | `className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#0A0F1E] hover:bg-white/90 disabled:opacity-60"` |
| 234 | rgba | `rgba(255,255,255,0.04)` | `background: rgba(255,255,255,0.04);` |
| 235 | rgba | `rgba(255,255,255,0.12)` | `border: 1px solid rgba(255,255,255,0.12);` |
| 237 | hex | `#fff` | `color: #fff;` |
| 241 | rgba | `rgba(255,255,255,0.35)` | `.enquiry-input:focus { border-color: rgba(255,255,255,0.35); background: rgba(255,255,255,0.07); }` |
| 241 | rgba | `rgba(255,255,255,0.07)` | `.enquiry-input:focus { border-color: rgba(255,255,255,0.35); background: rgba(255,255,255,0.07); }` |
| 242 | rgba | `rgba(255,255,255,0.35)` | `.enquiry-input::placeholder { color: rgba(255,255,255,0.35); }` |

### `src\components\landing\CertificateVerifyMini.tsx` - 8

| Line | Kind | Value | Context |
|---:|---|---|---|
| 24 | hex | `#2563EB` | `<span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-50 border border-blue-100 text-[#2563EB]">` |
| 28 | hex | `#707C90` | `<p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#707C90]">` |
| 31 | hex | `#151C2E` | `<p className="font-serif text-base sm:text-lg font-bold leading-snug text-[#151C2E] mt-0.5">` |
| 34 | hex | `#5B6472` | `<p className="text-xs text-[#5B6472] mt-0.5 leading-relaxed">` |
| 36 | hex | `#151C2E` | `<code className="font-mono font-bold text-[#151C2E]">{SAMPLE_ID}</code>.` |
| 50 | hex | `#151C2E` | `className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-xs font-mono font-bold text-[#151C2E] outline-none placeholder:text-slate-400 focus:border-blue-500 shadow-sm ` |
| 57 | hex | `#1E293B` | `className="inline-flex h-10 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-[#1E293B] hover:bg-[#151C2E] px-5 text-xs font-bold text-white shadow-sm transition-` |
| 57 | hex | `#151C2E` | `className="inline-flex h-10 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-[#1E293B] hover:bg-[#151C2E] px-5 text-xs font-bold text-white shadow-sm transition-` |

### `src\components\landing\DeploymentReadyStrip.tsx` - 8

| Line | Kind | Value | Context |
|---:|---|---|---|
| 13 | hex | `#3B82F6` | `accent: "from-[#3B82F6] to-[#1E40AF]",` |
| 13 | hex | `#1E40AF` | `accent: "from-[#3B82F6] to-[#1E40AF]",` |
| 21 | hex | `#14B8A6` | `accent: "from-[#14B8A6] to-[#0E7490]",` |
| 21 | hex | `#0E7490` | `accent: "from-[#14B8A6] to-[#0E7490]",` |
| 29 | hex | `#A855F7` | `accent: "from-[#A855F7] to-[#6D28D9]",` |
| 29 | hex | `#6D28D9` | `accent: "from-[#A855F7] to-[#6D28D9]",` |
| 37 | hex | `#F59E0B` | `accent: "from-[#F59E0B] to-[#B45309]",` |
| 37 | hex | `#B45309` | `accent: "from-[#F59E0B] to-[#B45309]",` |

### `src\components\landing\MentorSection.tsx` - 8

| Line | Kind | Value | Context |
|---:|---|---|---|
| 14 | hex | `#1B3F8B` | `accent: "text-[#1B3F8B]",` |
| 16 | hex | `#1B3F8B` | `avatarBg: "bg-[#1B3F8B]",` |
| 28 | hex | `#8A6D1F` | `accent: "text-[#8A6D1F]",` |
| 30 | hex | `#8A6D1F` | `avatarBg: "bg-[#8A6D1F]",` |
| 50 | hex | `#1A1A1A` | `<section className="py-12 sm:py-16 bg-white tone-light text-[#1A1A1A] border-b border-stone-200">` |
| 58 | hex | `#1A1A1A` | `<h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1A1A1A] leading-tight">` |
| 61 | hex | `#8A6D1F` | `<span className="italic font-normal text-[#8A6D1F]">` |
| 85 | hex | `#1A1A1A` | `<h3 className="font-serif font-bold text-lg text-[#1A1A1A] leading-tight">{mentor.name}</h3>` |

### `src\components\landing\PageCTA.tsx` - 8

| Line | Kind | Value | Context |
|---:|---|---|---|
| 26 | hex | `#0F1B3A` | `<div className="tone-dark relative overflow-hidden rounded-3xl border border-slate-200/15 bg-[#0F1B3A] bg-gradient-to-br from-[#0F1B3A] to-[#111A2E] p-8 text-center sm:p-12">` |
| 26 | hex | `#0F1B3A` | `<div className="tone-dark relative overflow-hidden rounded-3xl border border-slate-200/15 bg-[#0F1B3A] bg-gradient-to-br from-[#0F1B3A] to-[#111A2E] p-8 text-center sm:p-12">` |
| 26 | hex | `#111A2E` | `<div className="tone-dark relative overflow-hidden rounded-3xl border border-slate-200/15 bg-[#0F1B3A] bg-gradient-to-br from-[#0F1B3A] to-[#111A2E] p-8 text-center sm:p-12">` |
| 31 | hex | `#9EC4FF` | `<p className="relative font-mono text-micro font-semibold uppercase tracking-[0.28em] text-[#9EC4FF]">` |
| 45 | hex | `#0056D2` | `className="inline-flex h-12 items-center rounded-md bg-[#0056D2] px-6 text-sm font-bold text-slate-50 shadow-sm transition-colors hover:bg-[#0046b0]"` |
| 45 | hex | `#0046b0` | `className="inline-flex h-12 items-center rounded-md bg-[#0056D2] px-6 text-sm font-bold text-slate-50 shadow-sm transition-colors hover:bg-[#0046b0]"` |
| 53 | hex | `#0056D2` | `className="inline-flex h-12 items-center rounded-md bg-[#0056D2] px-6 text-sm font-bold text-slate-50 shadow-sm transition-colors hover:bg-[#0046b0]"` |
| 53 | hex | `#0046b0` | `className="inline-flex h-12 items-center rounded-md bg-[#0056D2] px-6 text-sm font-bold text-slate-50 shadow-sm transition-colors hover:bg-[#0046b0]"` |

### `src\components\workshop\ArzonFloatingRegisterCard.tsx` - 8

| Line | Kind | Value | Context |
|---:|---|---|---|
| 207 | hex | `#0A1F3E` | `<div className="bg-[var(--color-medical-navy)] tone-dark px-5 sm:px-6 py-5 text-[var(--color-warm-paper)] border-b border-[#0A1F3E]">` |
| 283 | hex | `#0B1325` | `? "bg-[var(--color-clinical-teal)] text-[#0B1325]"` |
| 464 | hex | `#102E5C` | `<span className="font-bold text-[#102E5C] flex items-center gap-1.5 uppercase tracking-wider">` |
| 468 | hex | `#102E5C` | `<span className="text-[#102E5C] font-mono text-[11px] font-bold bg-white tone-light px-2 py-0.5 rounded border border-stone-300 shadow-2xs">` |
| 478 | hex | `#102E5C` | `<span className="font-semibold text-[#102E5C] bg-blue-50/80 px-1.5 py-0.5 rounded border border-blue-200/60">{degree}</span>` |
| 496 | hex | `#102E5C` | `className="text-[#102E5C] hover:underline font-bold cursor-pointer"` |
| 643 | hex | `#1B3F8B` | `? "bg-[#1B3F8B] text-white"` |
| 770 | hex | `#0A2246` | `className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[var(--color-medical-navy)] hover:bg-[#0A2246] active:scale-[0.99] text-white tone-dark fo` |

### `src\features\admin\components\admin\AdminShell.tsx` - 8

| Line | Kind | Value | Context |
|---:|---|---|---|
| 68 | hex | `#60a5fa` | `Overview:  { label: "text-blue-300 font-bold",    active: "bg-blue-500/25 text-blue-100 font-bold border border-blue-400/40 shadow-sm shadow-blue-500/20",    icon: "text-blue-300",` |
| 69 | hex | `#a78bfa` | `Pipeline:  { label: "text-violet-300 font-bold",  active: "bg-violet-500/25 text-violet-100 font-bold border border-violet-400/40 shadow-sm shadow-violet-500/20",icon: "text-violet` |
| 70 | hex | `#34d399` | `Growth:    { label: "text-emerald-300 font-bold", active: "bg-emerald-500/25 text-emerald-100 font-bold border border-emerald-400/40 shadow-sm shadow-emerald-500/20",icon: "text-em` |
| 71 | hex | `#fbbf24` | `Content:   { label: "text-amber-300 font-bold",   active: "bg-amber-500/25 text-amber-100 font-bold border border-amber-400/40 shadow-sm shadow-amber-500/20",  icon: "text-amber-30` |
| 106 | hex | `#07090E` | `<div className="dark relative min-h-dvh bg-[#07090E] text-slate-100 antialiased font-sans [color-scheme:dark]">` |
| 122 | hex | `#0A0D14` | `"bg-[#0A0D14]/95 backdrop-blur-2xl",` |
| 201 | hex | `#0A0D14` | `<span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0A0D14] bg-emerald-400 motion-safe:animate-pulse" />` |
| 223 | hex | `#07090E` | `<header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-white/10 bg-[#07090E]/85 px-4 sm:px-6 backdrop-blur-2xl">` |

### `src\lib\email-templates\career-engine-result.tsx` - 8

| Line | Kind | Value | Context |
|---:|---|---|---|
| 244 | hex | `#e2e8f0` | `border: "1px solid #e2e8f0",` |
| 249 | hex | `#0f172a` | `const h1 = { fontSize: "22px", fontWeight: 700, color: "#0f172a", margin: "0 0 4px" };` |
| 250 | hex | `#0f172a` | `const h2 = { fontSize: "16px", fontWeight: 700, color: "#0f172a", margin: "0 0 8px" };` |
| 251 | hex | `#334155` | `const text = { fontSize: "14px", color: "#334155", lineHeight: "1.5", margin: "0 0 8px" };` |
| 252 | hex | `#334155` | `const kv = { fontSize: "14px", color: "#334155", lineHeight: "1.5", margin: "0 0 4px" };` |
| 253 | hex | `#64748b` | `const subtle = { fontSize: "12px", color: "#64748b", margin: "0 0 16px" };` |
| 254 | hex | `#e2e8f0` | `const hr = { border: "none", borderTop: "1px solid #e2e8f0", margin: "20px 0" };` |
| 255 | hex | `#94a3b8` | `const footer = { fontSize: "11px", color: "#94a3b8", margin: "0" };` |

### `src\components\career\report\chapters\05DecisionHelper.tsx` - 7

| Line | Kind | Value | Context |
|---:|---|---|---|
| 133 | hex | `#0B0F19` | `className="flex flex-wrap gap-3 rounded-2xl border border-white/10 bg-[#0B0F19] p-2"` |
| 147 | hex | `#2563EB` | `? "bg-[#2563EB] text-white shadow-lg shadow-blue-600/30"` |
| 148 | hex | `#161F33` | `: "bg-[#161F33] text-slate-300 hover:bg-white/10 border border-white/10",` |
| 166 | hex | `#161F33` | `<div className="rounded-2xl border border-white/10 bg-[#161F33] p-5 space-y-3 shadow-lg">` |
| 177 | hex | `#0B0F19` | `className="flex flex-col gap-1 rounded-xl border border-white/10 bg-[#0B0F19] p-4 shadow-sm"` |
| 189 | hex | `#161F33` | `<div className="rounded-2xl border border-white/10 bg-[#161F33] p-6 space-y-4 shadow-lg">` |
| 253 | hex | `#161F33` | `<div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 rounded-2xl border border-white/10 bg-[#161F33] p-5 shadow-lg">` |

### `src\components\courses\sections\OutcomeBlock.tsx` - 7

| Line | Kind | Value | Context |
|---:|---|---|---|
| 59 | rgba | `rgba(17,26,46,1)` | `style={{ background: "rgba(17,26,46,1)", borderColor: "rgba(255,255,255,0.10)" }}` |
| 59 | rgba | `rgba(255,255,255,0.10)` | `style={{ background: "rgba(17,26,46,1)", borderColor: "rgba(255,255,255,0.10)" }}` |
| 85 | rgba | `rgba(17,26,46,1)` | `style={{ background: "rgba(17,26,46,1)", borderColor: "rgba(255,255,255,0.10)" }}` |
| 85 | rgba | `rgba(255,255,255,0.10)` | `style={{ background: "rgba(17,26,46,1)", borderColor: "rgba(255,255,255,0.10)" }}` |
| 119 | rgba | `rgba(17,26,46,1)` | `style={{ background: "rgba(17,26,46,1)", borderColor: "rgba(255,255,255,0.10)" }}` |
| 119 | rgba | `rgba(255,255,255,0.10)` | `style={{ background: "rgba(17,26,46,1)", borderColor: "rgba(255,255,255,0.10)" }}` |
| 133 | hex | `#94A3B8` | `<p className="mt-1 text-xs" style={{ color: "#94A3B8" }}>` |

### `src\components\enrol\pay\PaySideSections.tsx` - 7

| Line | Kind | Value | Context |
|---:|---|---|---|
| 62 | hex | `#0F172A` | `<section className="rounded-3xl border border-slate-800 bg-[#0F172A] p-6 sm:p-8 space-y-6 text-white shadow-2xl">` |
| 121 | hex | `#0F172A` | `<section className="rounded-3xl border border-slate-800 bg-[#0F172A] p-6 sm:p-8 space-y-6 text-white shadow-2xl">` |
| 157 | hex | `#0F172A` | `<section className="rounded-3xl border border-slate-800 bg-[#0F172A] p-6 text-center space-y-4 text-white shadow-xl">` |
| 194 | hex | `#0F172A` | `<section className="rounded-3xl border border-slate-800 bg-[#0F172A] p-6 space-y-2.5 text-white shadow-xl">` |
| 239 | hex | `#0F172A` | `<section className="rounded-3xl border border-slate-800 bg-[#0F172A] p-6 sm:p-8 space-y-4 text-white shadow-2xl">` |
| 277 | hex | `#0F172A` | `<section className="rounded-3xl border border-slate-800 bg-gradient-to-r from-[#0F172A] to-[#1E293B] p-6 sm:p-8 space-y-4 text-center text-white shadow-2xl">` |
| 277 | hex | `#1E293B` | `<section className="rounded-3xl border border-slate-800 bg-gradient-to-r from-[#0F172A] to-[#1E293B] p-6 sm:p-8 space-y-4 text-center text-white shadow-2xl">` |

### `src\components\landing\FAQ.tsx` - 7

| Line | Kind | Value | Context |
|---:|---|---|---|
| 54 | hex | `#F7F5F0` | `className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-[#F7F5F0] text-[#1A1A1A] border-b border-stone-300"` |
| 54 | hex | `#1A1A1A` | `className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-[#F7F5F0] text-[#1A1A1A] border-b border-stone-300"` |
| 64 | hex | `#1A1A1A` | `className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight"` |
| 80 | hex | `#1B3F8B` | `colorFrom="#1B3F8B"` |
| 81 | hex | `#8A6D1F` | `colorTo="#8A6D1F"` |
| 87 | hex | `#1A1A1A` | `<AccordionTrigger className="px-4 sm:px-6 py-4 sm:py-5 min-h-[48px] text-left font-serif text-base sm:text-lg font-bold text-[#1A1A1A] leading-snug hover:no-underline [&[data-state` |
| 87 | hex | `#1B3F8B` | `<AccordionTrigger className="px-4 sm:px-6 py-4 sm:py-5 min-h-[48px] text-left font-serif text-base sm:text-lg font-bold text-[#1A1A1A] leading-snug hover:no-underline [&[data-state` |

### `src\components\landing\SalaryInsightsBlock.tsx` - 7

| Line | Kind | Value | Context |
|---:|---|---|---|
| 25 | hex | `#070D1B` | `className="py-16 sm:py-24 bg-[#070D1B] text-slate-100 tone-dark border-b border-slate-800"` |
| 45 | hex | `#0B152C` | `<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto p-4 rounded-2xl bg-[#0B152C] border border-slate-800">` |
| 57 | hex | `#070D1B` | `className="w-full h-11 px-3 rounded-xl bg-[#070D1B] border border-slate-700 text-xs font-sans text-slate-100 focus:outline-none focus:border-sky-400 cursor-pointer"` |
| 78 | hex | `#070D1B` | `className="w-full h-11 px-3 rounded-xl bg-[#070D1B] border border-slate-700 text-xs font-sans text-slate-100 focus:outline-none focus:border-emerald-400 cursor-pointer"` |
| 92 | hex | `#0B152C` | `<div className="p-6 sm:p-8 rounded-3xl border border-slate-800 bg-[#0B152C] space-y-4 text-center shadow-xl">` |
| 107 | hex | `#0B152C` | `<div className="p-6 sm:p-8 rounded-3xl border border-emerald-500/40 bg-[#0B152C] space-y-4 text-center shadow-2xl relative ring-1 ring-emerald-500/20">` |
| 126 | hex | `#0B152C` | `<div className="p-6 sm:p-8 rounded-3xl border border-slate-800 bg-[#0B152C] space-y-4 text-center shadow-xl">` |

### `src\components\landing\TransformationBlock.tsx` - 7

| Line | Kind | Value | Context |
|---:|---|---|---|
| 32 | hex | `#FFFFFF` | `* Design: High-contrast paper background (#FFFFFF), side-by-side Before vs After matrix.` |
| 83 | hex | `#1A1A1A` | `className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white tone-light text-[#1A1A1A] border-b border-stone-200"` |
| 93 | hex | `#1A1A1A` | `className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1A1A1A] tracking-tight leading-[1.18]"` |
| 96 | hex | `#1B3F8B` | `<span className="italic text-[#1B3F8B]">12 weeks in the Arzon pipeline?</span>` |
| 115 | hex | `#FAF8F5` | `className="relative rounded-2xl border border-stone-300 bg-[#FAF8F5] p-6 sm:p-8 space-y-6 shadow-xs hover:shadow-md transition-shadow overflow-hidden"` |
| 150 | hex | `#1B3F8B` | `<BorderBeam colorFrom="#1B3F8B" colorTo="#8A6D1F" duration={10} delay={2} />` |
| 150 | hex | `#8A6D1F` | `<BorderBeam colorFrom="#1B3F8B" colorTo="#8A6D1F" duration={10} delay={2} />` |

### `src\design-system\primitives\AcriProgressRing.tsx` - 7

| Line | Kind | Value | Context |
|---:|---|---|---|
| 33 | hex | `#0284c7` | `developing:        "#0284c7",` |
| 38 | rgba | `rgba(22,163,74,0.12)` | `industry_ready:    "rgba(22,163,74,0.12)",` |
| 39 | rgba | `rgba(217,119,6,0.12)` | `near_ready:        "rgba(217,119,6,0.12)",` |
| 40 | rgba | `rgba(2,132,199,0.12)` | `developing:        "rgba(2,132,199,0.12)",` |
| 41 | rgba | `rgba(220,38,38,0.12)` | `building_foundations: "rgba(220,38,38,0.12)",` |
| 88 | rgba | `rgba(22,163,74,0.25)` | `stroke="rgba(22,163,74,0.25)"` |
| 146 | rgba | `rgba(22,163,74,0.3)` | `boxShadow: "0 0 0 0 rgba(22,163,74,0.3)",` |

### `src\components\acri\AcriInteractiveQuestion.tsx` - 6

| Line | Kind | Value | Context |
|---:|---|---|---|
| 95 | hex | `#07241A` | `className="relative overflow-hidden bg-[#07241A] py-16 lg:py-24 text-white"` |
| 122 | hex | `#0B1325` | `className="inline-flex items-center gap-2 rounded-xl bg-white tone-light px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#0B1325] hover:bg-emerald-50 transition-colors` |
| 155 | hex | `#0B1325` | `<p className="mt-4 text-sm font-semibold text-[#0B1325] leading-relaxed">` |
| 180 | hex | `#0B1325` | `"border-[#0B1325] bg-stone-100 text-stone-950 font-bold";` |
| 242 | hex | `#0B1325` | `className="inline-flex items-center gap-1.5 rounded-lg bg-[#0B1325] px-4 py-2 text-xs font-bold text-white hover:bg-[#152342] transition-colors cursor-pointer"` |
| 242 | hex | `#152342` | `className="inline-flex items-center gap-1.5 rounded-lg bg-[#0B1325] px-4 py-2 text-xs font-bold text-white hover:bg-[#152342] transition-colors cursor-pointer"` |

### `src\components\career\report\AiCareerCoachWidget.tsx` - 6

| Line | Kind | Value | Context |
|---:|---|---|---|
| 52 | hex | `#121723` | `<div className="rounded-2xl border border-blue-500/30 bg-[#121723] p-5 shadow-2xl space-y-4">` |
| 84 | hex | `#2563EB` | `? "bg-[#2563EB] text-white font-medium"` |
| 85 | hex | `#161F33` | `: "bg-[#161F33] border border-white/10 text-slate-200"` |
| 110 | hex | `#0B0F19` | `className="flex-1 rounded-xl border border-white/15 bg-[#0B0F19] px-3.5 py-2.5 text-xs text-white placeholder:text-slate-400 focus:border-blue-400 focus:outline-none"` |
| 115 | hex | `#2563EB` | `className="inline-flex items-center justify-center rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] px-4 text-xs font-bold text-white shadow-md disabled:opacity-50 transition-colors"` |
| 115 | hex | `#1d4ed8` | `className="inline-flex items-center justify-center rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] px-4 text-xs font-bold text-white shadow-md disabled:opacity-50 transition-colors"` |

### `src\components\career\report\BandMeter.tsx` - 6

| Line | Kind | Value | Context |
|---:|---|---|---|
| 63 | rgba | `rgba(244,63,94,0.25)` | `"linear-gradient(90deg, rgba(244,63,94,0.25) 0%, rgba(244,63,94,0.18) 35%, rgba(251,191,36,0.20) 35%, rgba(251,191,36,0.18) 70%, rgba(45,212,191,0.22) 70%, rgba(45,212,191,0.22) 10` |
| 63 | rgba | `rgba(244,63,94,0.18)` | `"linear-gradient(90deg, rgba(244,63,94,0.25) 0%, rgba(244,63,94,0.18) 35%, rgba(251,191,36,0.20) 35%, rgba(251,191,36,0.18) 70%, rgba(45,212,191,0.22) 70%, rgba(45,212,191,0.22) 10` |
| 63 | rgba | `rgba(251,191,36,0.20)` | `"linear-gradient(90deg, rgba(244,63,94,0.25) 0%, rgba(244,63,94,0.18) 35%, rgba(251,191,36,0.20) 35%, rgba(251,191,36,0.18) 70%, rgba(45,212,191,0.22) 70%, rgba(45,212,191,0.22) 10` |
| 63 | rgba | `rgba(251,191,36,0.18)` | `"linear-gradient(90deg, rgba(244,63,94,0.25) 0%, rgba(244,63,94,0.18) 35%, rgba(251,191,36,0.20) 35%, rgba(251,191,36,0.18) 70%, rgba(45,212,191,0.22) 70%, rgba(45,212,191,0.22) 10` |
| 63 | rgba | `rgba(45,212,191,0.22)` | `"linear-gradient(90deg, rgba(244,63,94,0.25) 0%, rgba(244,63,94,0.18) 35%, rgba(251,191,36,0.20) 35%, rgba(251,191,36,0.18) 70%, rgba(45,212,191,0.22) 70%, rgba(45,212,191,0.22) 10` |
| 63 | rgba | `rgba(45,212,191,0.22)` | `"linear-gradient(90deg, rgba(244,63,94,0.25) 0%, rgba(244,63,94,0.18) 35%, rgba(251,191,36,0.20) 35%, rgba(251,191,36,0.18) 70%, rgba(45,212,191,0.22) 70%, rgba(45,212,191,0.22) 10` |

### `src\components\career\report\chapters\11First90Days.tsx` - 6

| Line | Kind | Value | Context |
|---:|---|---|---|
| 162 | hex | `#2563EB` | `? "bg-[#2563EB] text-white shadow-md shadow-blue-500/20"` |
| 185 | hex | `#161F33` | `<div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-[#161F33] shadow-2xl">` |
| 267 | hex | `#161F33` | `? "border-blue-500/30 bg-[#161F33] text-blue-400"` |
| 269 | hex | `#161F33` | `? "border-emerald-500/30 bg-[#161F33] text-emerald-400"` |
| 270 | hex | `#161F33` | `: "border-amber-500/30 bg-[#161F33] text-amber-400";` |
| 285 | hex | `#0B0F19` | `<div className="flex items-start gap-2 rounded-xl border border-rose-500/30 bg-[#0B0F19] p-3 text-xs text-slate-300">` |

### `src\components\career\report\LeftChapterRail.tsx` - 6

| Line | Kind | Value | Context |
|---:|---|---|---|
| 29 | hex | `#0B0F19` | `<div className="report-print-hide lg:hidden overflow-x-auto no-scrollbar py-2.5 -mx-4 px-4 flex items-center gap-2 border-b border-white/10 bg-[#0B0F19]/90 backdrop-blur-xl sticky ` |
| 40 | hex | `#2563EB` | `? "bg-[#2563EB] text-white shadow-lg shadow-blue-500/20"` |
| 91 | hex | `#121723` | `<div className="rounded-2xl border border-white/10 bg-[#121723] p-5 space-y-3 shadow-2xl">` |
| 103 | hex | `#2563EB` | `className="h-full rounded-full bg-[#2563EB] shadow-sm transition-all duration-300"` |
| 137 | hex | `#2563EB` | `? "bg-[#2563EB] text-white font-bold shadow-lg shadow-blue-600/30"` |
| 139 | hex | `#121723` | `? "bg-[#121723] text-white hover:bg-white/10 border border-white/10"` |

### `src\components\courses\sections\ProblemBlock.tsx` - 6

| Line | Kind | Value | Context |
|---:|---|---|---|
| 33 | rgba | `rgba(239,68,68,0.06)` | `style={{ background: "rgba(239,68,68,0.06)", borderColor: "rgba(239,68,68,0.25)" }}` |
| 33 | rgba | `rgba(239,68,68,0.25)` | `style={{ background: "rgba(239,68,68,0.06)", borderColor: "rgba(239,68,68,0.25)" }}` |
| 58 | rgba | `rgba(16,185,129,0.06)` | `style={{ background: "rgba(16,185,129,0.06)", borderColor: "rgba(16,185,129,0.25)" }}` |
| 58 | rgba | `rgba(16,185,129,0.25)` | `style={{ background: "rgba(16,185,129,0.06)", borderColor: "rgba(16,185,129,0.25)" }}` |
| 62 | hex | `#6EE7B7` | `style={{ color: "#6EE7B7" }}` |
| 71 | hex | `#34D399` | `style={{ color: "#34D399" }}` |

### `src\components\landing\EtvVideoEmbed.tsx` - 6

| Line | Kind | Value | Context |
|---:|---|---|---|
| 103 | hex | `#0a0c10` | `<span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-[#0a0c10]/70 px-2.5 py-1 font-mono text-micro font-semibold uppercase tracking-[0.18em] text` |
| 115 | hex | `#0a0c10` | `<div className="tone-dark relative aspect-video w-full bg-[#0a0c10]">{fallbackPoster}</div>` |
| 121 | hex | `#0a0c10` | `<div className="tone-dark relative aspect-video w-full bg-[#0a0c10]">` |
| 132 | hex | `#0a0c10` | `className="group absolute inset-0 flex items-center justify-center text-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-off` |
| 153 | hex | `#0a0c10` | `<span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-[#0a0c10]/70 px-2.5 py-1 font-mono text-micro font-semibold uppercase tracking-[0.18em] text` |
| 163 | hex | `#0a0c10` | `<div className="tone-dark relative aspect-video w-full bg-[#0a0c10]">` |

### `src\components\landing\FinalCTA.tsx` - 6

| Line | Kind | Value | Context |
|---:|---|---|---|
| 18 | hex | `#707C90` | `<p className="text-xs font-medium uppercase tracking-widest text-[#707C90]">` |
| 22 | hex | `#151C2E` | `<h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#151C2E] tracking-tight">` |
| 23 | hex | `#8A6D1F` | `Start with the <span className="italic text-[#8A6D1F]">3-minute fit test</span>` |
| 26 | hex | `#5B6472` | `<p className="text-sm text-[#5B6472] max-w-xl mx-auto leading-relaxed">` |
| 61 | hex | `#151C2E` | `className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 px-6 text-xs font-semibold text-[#151C2E] transition-col` |
| 69 | hex | `#1D4ED8` | `<MessageCircle className="h-4 w-4 text-[#1D4ED8]" />` |

### `src\components\landing\LowFrictionProfileRegistration.tsx` - 6

| Line | Kind | Value | Context |
|---:|---|---|---|
| 75 | hex | `#0B152C` | `<section id="career-profile-registration" className="py-16 sm:py-24 bg-[#0B152C] text-slate-100 tone-dark border-b border-slate-800">` |
| 99 | hex | `#070D1B` | `<div className="p-6 sm:p-8 rounded-3xl bg-[#070D1B] border border-slate-800 space-y-5 shadow-2xl">` |
| 113 | hex | `#0B152C` | `className="w-full h-11 px-4 rounded-xl bg-[#0B152C] border border-slate-700 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-400 transition` |
| 129 | hex | `#0B152C` | `className="w-full h-11 px-4 rounded-xl bg-[#0B152C] border border-slate-700 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-400 transition` |
| 173 | hex | `#070D1B` | `<div className="p-6 rounded-3xl bg-[#070D1B] border border-slate-800 space-y-4">` |
| 184 | hex | `#0B152C` | `<div key={item.title} className="flex items-start gap-3 p-3 rounded-xl bg-[#0B152C] border border-slate-800">` |

### `src\components\workshop\ArzonEventHeader.tsx` - 6

| Line | Kind | Value | Context |
|---:|---|---|---|
| 14 | hex | `#0B1325` | `<header className="sticky top-0 z-50 w-full tone-dark bg-[#0B1325]/95 text-white border-b border-stone-800 shadow-md backdrop-blur-md">` |
| 61 | hex | `#1B3F8B` | `className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-[#1B3F8B] hover:bg-[#2552b3] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-md` |
| 61 | hex | `#2552b3` | `className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-[#1B3F8B] hover:bg-[#2552b3] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-md` |
| 82 | hex | `#0B1325` | `<div className="lg:hidden py-4 border-t border-stone-800 flex flex-col gap-3 font-sans text-sm text-stone-200 tone-dark bg-[#0B1325]">` |
| 124 | hex | `#1B3F8B` | `className="mt-2 w-full py-3 rounded-xl bg-[#1B3F8B] hover:bg-[#2552b3] text-white font-mono text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center ` |
| 124 | hex | `#2552b3` | `className="mt-2 w-full py-3 rounded-xl bg-[#1B3F8B] hover:bg-[#2552b3] text-white font-mono text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center ` |

### `src\components\workshop\CareerGuessworkEnemy.tsx` - 6

| Line | Kind | Value | Context |
|---:|---|---|---|
| 22 | hex | `#020617` | `<section className="tone-dark bg-[#020617] py-20 text-white border-t border-slate-900/60">` |
| 67 | hex | `#0f172a` | `: "bg-[#0f172a] text-slate-500 border border-slate-800"` |
| 80 | hex | `#0f172a` | `? "bg-[#0f172a]/90 text-white shadow-xl backdrop-blur-sm border border-slate-800"` |
| 81 | hex | `#0f172a` | `: "bg-[#0f172a]/30 text-slate-300 hover:bg-[#0f172a]/50"` |
| 81 | hex | `#0f172a` | `: "bg-[#0f172a]/30 text-slate-300 hover:bg-[#0f172a]/50"` |
| 100 | hex | `#0f172a` | `<div className="inline-flex flex-col sm:flex-row items-center gap-3 rounded-2xl border border-slate-800 bg-[#0f172a]/80 p-4 backdrop-blur-md">` |

### `src\components\workshop\CostOfGuessingCalculator.tsx` - 6

| Line | Kind | Value | Context |
|---:|---|---|---|
| 31 | hex | `#020617` | `<section className="tone-dark bg-[#020617] py-20 text-white border-t border-slate-900/60">` |
| 49 | hex | `#0f172a` | `<div className="max-w-4xl mx-auto rounded-2xl bg-[#0f172a]/60 p-6 sm:p-10 backdrop-blur-md border border-slate-800">` |
| 65 | hex | `#080d1a` | `className="w-full h-3 bg-[#080d1a] rounded-lg appearance-none cursor-pointer accent-blue-500"` |
| 86 | hex | `#080d1a` | `className="w-full h-3 bg-[#080d1a] rounded-lg appearance-none cursor-pointer accent-emerald-500"` |
| 95 | hex | `#080d1a` | `<div className="rounded-xl bg-[#080d1a] p-4 text-xs text-slate-300 space-y-2 font-sans border border-slate-800">` |
| 108 | hex | `#080d1a` | `<div className="rounded-2xl bg-[#080d1a] p-6 text-center flex flex-col justify-between h-full border border-rose-500/20">` |

### `src\components\workshop\HiringCompanyExplorer.tsx` - 6

| Line | Kind | Value | Context |
|---:|---|---|---|
| 44 | hex | `#020617` | `<section className="tone-dark bg-[#020617] py-20 text-white border-t border-slate-900/60">` |
| 66 | hex | `#0f172a` | `className="rounded-2xl bg-[#0f172a]/60 p-6 backdrop-blur-sm hover:bg-[#0f172a]/90 transition-all duration-200 border border-slate-800 flex flex-col justify-between"` |
| 66 | hex | `#0f172a` | `className="rounded-2xl bg-[#0f172a]/60 p-6 backdrop-blur-sm hover:bg-[#0f172a]/90 transition-all duration-200 border border-slate-800 flex flex-col justify-between"` |
| 71 | hex | `#080d1a` | `<div className="h-10 w-10 rounded-xl bg-[#080d1a] border border-slate-800 flex items-center justify-center text-white font-bold text-base font-mono">` |
| 98 | hex | `#080d1a` | `<span key={role} className="rounded-md bg-[#080d1a] border border-slate-800 px-2.5 py-1 text-[11px] font-semibold text-slate-300">` |
| 111 | hex | `#080d1a` | `className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#080d1a] border border-slate-800 px-4 py-2 text-xs font-bold text-slate-200 hover:text-white hover:bg` |

### `src\components\workshop\IndustryConnectSection.tsx` - 6

| Line | Kind | Value | Context |
|---:|---|---|---|
| 86 | hex | `#1B3F8B` | `<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#1B3F8B] font-mono text-xs font-bold uppercase tracking-wider border border-blue-200/60">` |
| 110 | hex | `#1B3F8B` | `? "bg-white tone-light text-[#1B3F8B] shadow-2xs"` |
| 122 | hex | `#1B3F8B` | `? "bg-white tone-light text-[#1B3F8B] shadow-2xs"` |
| 142 | hex | `#1B3F8B` | `<span className="font-mono text-[10px] font-bold text-[#1B3F8B] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">` |
| 195 | hex | `#1B3F8B` | `<Users2 className="w-4 h-4 text-[#1B3F8B]" />` |
| 205 | hex | `#1B3F8B` | `<div className="text-[11px] font-mono text-[#1B3F8B] pt-1 border-t border-stone-100">` |

### `src\lib\acri\acriReadiness.ts` - 6

| Line | Kind | Value | Context |
|---:|---|---|---|
| 115 | hex | `#16a34a` | `ring: "#16a34a",` |
| 116 | hex | `#14532d` | `badge: "#14532d",` |
| 122 | hex | `#78350f` | `badge: "#78350f",` |
| 127 | hex | `#0284c7` | `ring: "#0284c7",` |
| 128 | hex | `#075985` | `badge: "#075985",` |
| 134 | hex | `#7f1d1d` | `badge: "#7f1d1d",` |

### `src\lib\design-tokens.ts` - 6

| Line | Kind | Value | Context |
|---:|---|---|---|
| 39 | hex | `#0E1730` | `// by the contrast audit (>=4.5:1 against #0E1730/#0A0F1E/#070B17).` |
| 39 | hex | `#0A0F1E` | `// by the contrast audit (>=4.5:1 against #0E1730/#0A0F1E/#070B17).` |
| 39 | hex | `#070B17` | `// by the contrast audit (>=4.5:1 against #0E1730/#0A0F1E/#070B17).` |
| 41 | rgba | `rgba(255,255,255,0.85)` | `textOnDarkStrong: "rgba(255,255,255,0.85)",` |
| 42 | rgba | `rgba(255,255,255,0.70)` | `textOnDarkMuted: "rgba(255,255,255,0.70)",` |
| 43 | rgba | `rgba(255,255,255,0.60)` | `textOnDarkSubtle: "rgba(255,255,255,0.60)", // floor for readable copy` |

### `src\routes\courses.$slug.tsx` - 6

| Line | Kind | Value | Context |
|---:|---|---|---|
| 232 | hex | `#0A0F1E` | `<main className="min-h-app bg-[#0A0F1E] text-white">` |
| 291 | hex | `#0A0F1E` | `<main className="min-h-app bg-[#0A0F1E] text-white">` |
| 304 | hex | `#0A0F1E` | `className="inline-flex h-11 items-center rounded-full bg-white text-[#0A0F1E] px-5 text-sm font-semibold hover:bg-white/90"` |
| 616 | hex | `#FFFFFF` | `style={{ borderColor: RULE, background: "linear-gradient(145deg, #FFFFFF, #F8FAFC)" }}` |
| 616 | hex | `#F8FAFC` | `style={{ borderColor: RULE, background: "linear-gradient(145deg, #FFFFFF, #F8FAFC)" }}` |
| 797 | hex | `#0B0F19` | `<section className="border-t border-white/10 bg-[#0B0F19]">` |

### `src\routes\moments.index.tsx` - 6

| Line | Kind | Value | Context |
|---:|---|---|---|
| 91 | hex | `#0a0c10` | `<div className="aspect-[4/3] w-full bg-[#0a0c10]/40 backdrop-blur-md shadow-sm">` |
| 182 | hex | `#0A1024` | `? "tone-dark bg-[#0A1024] text-white hover:bg-[#0A1024]/90"` |
| 182 | hex | `#0A1024` | `? "tone-dark bg-[#0A1024] text-white hover:bg-[#0A1024]/90"` |
| 183 | hex | `#0A1024` | `: "tone-light bg-white text-[#0A1024] hover:bg-white/90",` |
| 240 | rgba | `rgba(16,185,129,0.14)` | `className="relative aspect-[4/3] w-full bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.14),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(59,130,246,0.12),transpa` |
| 240 | rgba | `rgba(59,130,246,0.12)` | `className="relative aspect-[4/3] w-full bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.14),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(59,130,246,0.12),transpa` |

### `src\components\acri\AcriProblemSection.tsx` - 5

| Line | Kind | Value | Context |
|---:|---|---|---|
| 5 | hex | `#FAF8F5` | `<section className="bg-[#FAF8F5] py-16 lg:py-24 border-b border-stone-200/80">` |
| 12 | hex | `#0B1325` | `<h2 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B1325]">` |
| 30 | hex | `#0B1325` | `<h3 className="font-sans text-xl font-bold text-[#0B1325] mt-1.5 mb-2.5">` |
| 49 | hex | `#0B1325` | `<h3 className="font-sans text-xl font-bold text-[#0B1325] mt-1.5 mb-2.5">` |
| 68 | hex | `#0B1325` | `<h3 className="font-sans text-xl font-bold text-[#0B1325] mt-1.5 mb-2.5">` |

### `src\components\career\report\chapters\13SalaryTrajectory.tsx` - 5

| Line | Kind | Value | Context |
|---:|---|---|---|
| 153 | hex | `#2563EB` | `? "bg-[#2563EB] text-white shadow-md shadow-blue-500/20"` |
| 182 | hex | `#161F33` | `<div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-[#161F33] shadow-2xl">` |
| 217 | hex | `#38BDF8` | `<td className="px-4 py-3.5 text-right font-mono font-bold text-[#38BDF8] text-base tabular-nums">` |
| 232 | hex | `#0B0F19` | `<div className="mt-3 rounded-xl border border-white/10 bg-[#0B0F19] p-3.5 text-xs text-slate-300">` |
| 239 | hex | `#161F33` | `<div className="mt-6 space-y-3 rounded-2xl border border-white/10 bg-[#161F33] p-5 shadow-lg">` |

### `src\components\career-explorer\PersonalSkillGapBlock.tsx` - 5

| Line | Kind | Value | Context |
|---:|---|---|---|
| 31 | hex | `#0B152C` | `<div className="w-full max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-[#0B152C] border border-slate-800 space-y-6 text-left shadow-2xl">` |
| 54 | hex | `#070D1B` | `className="p-5 rounded-2xl bg-[#070D1B] border border-slate-800 space-y-3 flex flex-col justify-between hover:border-sky-500/40 transition-colors group"` |
| 73 | hex | `#070D1B` | `<div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/60 to-[#070D1B] border border-indigo-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between g` |
| 97 | hex | `#0C1938` | `<div className="p-5 rounded-2xl bg-gradient-to-r from-[#0C1938] to-[#070D1B] border border-sky-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">` |
| 97 | hex | `#070D1B` | `<div className="p-5 rounded-2xl bg-gradient-to-r from-[#0C1938] to-[#070D1B] border border-sky-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">` |

### `src\components\courses\sections\ProofBlock.tsx` - 5

| Line | Kind | Value | Context |
|---:|---|---|---|
| 54 | rgba | `rgba(255,255,255,0.05)` | `background: "rgba(255,255,255,0.05)",` |
| 55 | rgba | `rgba(255,255,255,0.15)` | `borderColor: "rgba(255,255,255,0.15)",` |
| 79 | rgba | `rgba(255,255,255,0.05)` | `background: "rgba(255,255,255,0.05)",` |
| 80 | rgba | `rgba(255,255,255,0.15)` | `borderColor: "rgba(255,255,255,0.15)",` |
| 87 | hex | `#0A0F1E` | `<div className="tone-light rounded-2xl border border-white/10 bg-white p-2 text-[#0A0F1E] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] sm:p-6">` |

### `src\components\dashboard\ShareableCredentialModal.tsx` - 5

| Line | Kind | Value | Context |
|---:|---|---|---|
| 61 | hex | `#070C18` | `<div className="relative w-full max-w-lg rounded-2xl border border-white/15 bg-[#070C18] p-6 text-slate-200 shadow-2xl space-y-6">` |
| 115 | hex | `#0A66C2` | `className="flex items-center justify-center gap-2 rounded-xl bg-[#0A66C2] py-3 text-xs font-bold text-white hover:bg-[#084e96] transition-colors shadow-lg"` |
| 115 | hex | `#084e96` | `className="flex items-center justify-center gap-2 rounded-xl bg-[#0A66C2] py-3 text-xs font-bold text-white hover:bg-[#084e96] transition-colors shadow-lg"` |
| 123 | hex | `#1DA1F2` | `className="flex items-center justify-center gap-2 rounded-xl bg-[#1DA1F2] py-3 text-xs font-bold text-white hover:bg-[#0c85d0] transition-colors shadow-lg"` |
| 123 | hex | `#0c85d0` | `className="flex items-center justify-center gap-2 rounded-xl bg-[#1DA1F2] py-3 text-xs font-bold text-white hover:bg-[#0c85d0] transition-colors shadow-lg"` |

### `src\components\dashboard\SkillConstellationMap.tsx` - 5

| Line | Kind | Value | Context |
|---:|---|---|---|
| 19 | hex | `#14B8A6` | `{ name: "Domain Depth", score: 85, color: "#14B8A6 text-teal-400 border-teal-500/30" },` |
| 20 | hex | `#3B82F6` | `{ name: "Problem Solving", score: 74, color: "#3B82F6 text-blue-400 border-blue-500/30" },` |
| 21 | hex | `#F59E0B` | `{ name: "Communication & Pitch", score: 80, color: "#F59E0B text-amber-400 border-amber-500/30" },` |
| 22 | hex | `#A855F7` | `{ name: "Execution Speed", score: 68, color: "#A855F7 text-purple-400 border-purple-500/30" },` |
| 23 | hex | `#10B981` | `{ name: "Role Compliance", score: 92, color: "#10B981 text-emerald-400 border-emerald-500/30" },` |

### `src\components\landing\CertificateModal.tsx` - 5

| Line | Kind | Value | Context |
|---:|---|---|---|
| 83 | hex | `#1B3F8B` | `<span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1B3F8B] block">` |
| 111 | hex | `#1B3F8B` | `<span className="font-bold text-[#1B3F8B]">{cert.certNo \|\| cert.vmoId}</span>` |
| 147 | hex | `#1B3F8B` | `<BadgeCheck className="w-3.5 h-3.5 text-[#1B3F8B] shrink-0" />` |
| 166 | hex | `#1B3F8B` | `className="w-full h-11 inline-flex items-center justify-center gap-2 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-slate-50 font-mono text-xs font-bold shadow-xs transition-color` |
| 166 | hex | `#153270` | `className="w-full h-11 inline-flex items-center justify-center gap-2 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-slate-50 font-mono text-xs font-bold shadow-xs transition-color` |

### `src\components\landing\DegreeCareerMapSection.tsx` - 5

| Line | Kind | Value | Context |
|---:|---|---|---|
| 20 | hex | `#0B152C` | `<section id="degree-selector" className="py-16 sm:py-24 bg-[#0B152C] text-slate-100 tone-dark border-y border-slate-800">` |
| 49 | hex | `#070D1B` | `: "bg-[#070D1B] border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900"` |
| 67 | hex | `#070D1B` | `<div className="rounded-3xl border border-slate-700/80 bg-[#070D1B] p-6 sm:p-10 space-y-8 shadow-2xl relative">` |
| 91 | hex | `#0B152C` | `<div key={category} className="p-5 rounded-2xl border border-slate-800 bg-[#0B152C] space-y-4 flex flex-col justify-between">` |
| 101 | hex | `#070D1B` | `className="w-full text-left p-2.5 rounded-xl bg-[#070D1B] hover:bg-slate-900 border border-slate-800/80 hover:border-sky-400/50 text-xs font-sans font-medium text-slate-200 hover:t` |

### `src\components\landing\HealthcareHero.tsx` - 5

| Line | Kind | Value | Context |
|---:|---|---|---|
| 20 | hex | `#070D1B` | `className="relative pt-12 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#070D1B] via-[#0B152C] to-[#070D1B] tone-dark text-slate-100 overflow-hidden border-b ` |
| 20 | hex | `#0B152C` | `className="relative pt-12 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#070D1B] via-[#0B152C] to-[#070D1B] tone-dark text-slate-100 overflow-hidden border-b ` |
| 20 | hex | `#070D1B` | `className="relative pt-12 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#070D1B] via-[#0B152C] to-[#070D1B] tone-dark text-slate-100 overflow-hidden border-b ` |
| 64 | hex | `#070D1B` | `: "bg-[#070D1B] text-slate-200 border-slate-700 hover:border-sky-400 hover:text-sky-300 active:scale-95"` |
| 92 | hex | `#070D1B` | `<div className="pt-2 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#070D1B] border border-slate-800 text-slate-300 text-xs font-sans">` |

### `src\components\landing\SkillProgressChart.tsx` - 5

| Line | Kind | Value | Context |
|---:|---|---|---|
| 35 | hex | `#1A1A1A` | `<p className="font-bold text-[#1A1A1A] mb-1">{label}</p>` |
| 55 | rgba | `rgba(0,0,0,0.08)` | `<PolarGrid stroke="rgba(0,0,0,0.08)" />` |
| 58 | hex | `#6B7280` | `tick={{ fontSize: 10, fontFamily: "monospace", fill: "#6B7280", fontWeight: 600 }}` |
| 73 | hex | `#1B3F8B` | `stroke="#1B3F8B"` |
| 74 | hex | `#1B3F8B` | `fill="#1B3F8B"` |

### `src\components\opportunity\CandidateProfileIntelligence.tsx` - 5

| Line | Kind | Value | Context |
|---:|---|---|---|
| 23 | hex | `#1B3F8B` | `<div className="h-10 w-10 rounded-xl bg-[#1B3F8B]/10 border border-[#1B3F8B]/20 flex items-center justify-center text-[#1B3F8B]">` |
| 23 | hex | `#1B3F8B` | `<div className="h-10 w-10 rounded-xl bg-[#1B3F8B]/10 border border-[#1B3F8B]/20 flex items-center justify-center text-[#1B3F8B]">` |
| 23 | hex | `#1B3F8B` | `<div className="h-10 w-10 rounded-xl bg-[#1B3F8B]/10 border border-[#1B3F8B]/20 flex items-center justify-center text-[#1B3F8B]">` |
| 28 | hex | `#1B3F8B` | `<span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">` |
| 45 | hex | `#1B3F8B` | `<span className="font-serif text-2xl font-bold text-[#1B3F8B]">` |

### `src\components\transition\SpaceLoader.tsx` - 5

| Line | Kind | Value | Context |
|---:|---|---|---|
| 18 | hex | `#070B16` | `className={`pointer-events-none fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#070B16] transition-opacity duration-500 ${` |
| 29 | hex | `#60A5FA` | `"radial-gradient(60% 50% at 50% 45%, color-mix(in oklab, var(--primary-glow, #60A5FA) 22%, transparent), transparent 70%)",` |
| 51 | hex | `#60A5FA` | `"radial-gradient(circle, color-mix(in oklab, var(--primary-glow, #60A5FA) 50%, transparent) 0%, transparent 70%)",` |
| 66 | hex | `#60A5FA` | `stroke="color-mix(in oklab, var(--primary-glow, #60A5FA) 60%, transparent)"` |
| 71 | hex | `#F5C04A` | `<circle cx="50" cy="4" r="2" fill="var(--gold, #F5C04A)" />` |

### `src\components\workshop\ArzonFieldGuideSection.tsx` - 5

| Line | Kind | Value | Context |
|---:|---|---|---|
| 112 | hex | `#0A1D3A` | `<div className="relative w-[290px] sm:w-[330px] h-[400px] sm:h-[440px] rounded-xl bg-[var(--color-medical-navy)] tone-dark border-2 border-[#0A1D3A] shadow-2xl p-6 sm:p-7 flex flex` |
| 122 | hex | `#94A3B8` | `<span style={{ color: '#94A3B8' }} className="font-mono text-[9px] text-white/50 block tracking-wider">` |
| 133 | hex | `#0F766E` | `<p style={{ color: '#0F766E' }} className="font-mono text-xs text-[var(--color-clinical-teal)] font-semibold uppercase tracking-wider">` |
| 165 | rgba | `rgba(255,255,255,0.8)` | `<span className="font-sans text-xs text-white/80" style={{ color: "rgba(255,255,255,0.8)" }}>` |
| 197 | hex | `#0A2246` | `className="inline-flex items-center gap-2 py-3.5 px-6 rounded-xl bg-[var(--color-medical-navy)] tone-dark hover:bg-[#0A2246] active:scale-[0.99] text-white font-mono text-xs font-b` |

### `src\components\workshop\ArzonInstitutionalSection.tsx` - 5

| Line | Kind | Value | Context |
|---:|---|---|---|
| 13 | hex | `#1B3F8B` | `<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1B3F8B] font-mono text-[10px] sm:text-xs font-bold uppercase tracking` |
| 14 | hex | `#1B3F8B` | `<Building2 className="w-3.5 h-3.5 text-[#1B3F8B]" />` |
| 30 | hex | `#1B3F8B` | `<div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-[#1B3F8B]">` |
| 79 | hex | `#1B3F8B` | `<div className="mt-8 rounded-2xl sm:rounded-3xl border-2 border-[#1B3F8B] bg-gradient-to-br from-blue-50/70 via-white to-stone-50 p-6 sm:p-8 flex flex-col lg:flex-row items-start l` |
| 81 | hex | `#1B3F8B` | `<span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider block">` |

### `src\components\workshop\CareerDirectionsGrid.tsx` - 5

| Line | Kind | Value | Context |
|---:|---|---|---|
| 288 | hex | `#0B1325` | `<div className="w-10 h-10 rounded-xl tone-dark bg-[#0B1325] text-teal-300 flex items-center justify-center group-hover:scale-105 transition-transform">` |
| 321 | hex | `#0B1325` | `<div className="fixed inset-0 z-50 bg-[#0B1325]/75 backdrop-blur-xs flex items-center justify-center p-4">` |
| 332 | hex | `#0B1325` | `<div className="w-12 h-12 rounded-2xl tone-dark bg-[#0B1325] text-teal-300 flex items-center justify-center shrink-0">` |
| 376 | hex | `#FF6525` | `className="w-full py-3.5 rounded-xl bg-[#FF6525] hover:bg-[#e05318] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center justi` |
| 376 | hex | `#e05318` | `className="w-full py-3.5 rounded-xl bg-[#FF6525] hover:bg-[#e05318] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center justi` |

### `src\components\workshop\CareerSearchAI.tsx` - 5

| Line | Kind | Value | Context |
|---:|---|---|---|
| 44 | hex | `#020617` | `<section className="tone-dark bg-[#020617] py-20 text-white border-t border-slate-900/60 relative overflow-hidden">` |
| 66 | hex | `#0f172a` | `<div className="relative flex items-center rounded-2xl bg-[#0f172a] p-2 shadow-lg backdrop-blur-md border border-slate-800">` |
| 93 | hex | `#080d1a` | `className="text-[11px] font-sans font-semibold text-slate-200 bg-[#080d1a] hover:bg-slate-800 px-3.5 py-1.5 rounded-full transition-colors border border-slate-800 cursor-pointer"` |
| 108 | hex | `#0f172a` | `className="rounded-2xl bg-[#0f172a]/60 backdrop-blur-sm overflow-hidden transition-all duration-200 border border-slate-800"` |
| 113 | hex | `#0f172a` | `className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#0f172a]/90 transition-colors"` |

### `src\components\workshop\WorkshopComparisonTable.tsx` - 5

| Line | Kind | Value | Context |
|---:|---|---|---|
| 54 | hex | `#1B3F8B` | `<span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">` |
| 72 | hex | `#1B3F8B` | `<span className="font-mono text-[10px] font-bold text-[#1B3F8B] uppercase tracking-wide">` |
| 83 | hex | `#1B3F8B` | `<span className="font-bold text-[#1B3F8B]">Arzon Masterclass: </span>` |
| 123 | hex | `#1B3F8B` | `<div className="p-5 col-span-4 text-[#1B3F8B] bg-blue-50/50 border-l border-stone-200 flex items-center gap-2">` |
| 138 | hex | `#1B3F8B` | `<span className="font-mono text-[10px] font-extrabold uppercase tracking-widest text-[#1B3F8B]">` |

### `src\components\workshop\WorkshopStarterKitTeaser.tsx` - 5

| Line | Kind | Value | Context |
|---:|---|---|---|
| 42 | hex | `#1B3F8B` | `<div className="rounded-2xl sm:rounded-3xl border-2 border-[#1B3F8B]/20 bg-white tone-light p-4.5 sm:p-10 shadow-lg relative overflow-hidden">` |
| 47 | hex | `#1B3F8B` | `<FileText className="w-3.5 h-3.5 text-[#1B3F8B]" />` |
| 82 | hex | `#1B3F8B` | `className="text-xs font-mono font-bold text-[#1B3F8B] hover:text-[#0B1325] inline-flex items-center gap-1.5 transition-colors"` |
| 82 | hex | `#0B1325` | `className="text-xs font-mono font-bold text-[#1B3F8B] hover:text-[#0B1325] inline-flex items-center gap-1.5 transition-colors"` |
| 92 | hex | `#0B1325` | `<div className="w-12 h-12 rounded-2xl bg-[#0B1325] text-emerald-400 flex items-center justify-center shadow-md">` |

### `src\routes\locations.index.tsx` - 5

| Line | Kind | Value | Context |
|---:|---|---|---|
| 23 | hex | `#FAF9F6` | `<div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans pb-24">` |
| 27 | hex | `#1B3F8B` | `<MapPin className="h-4 w-4 text-[#1B3F8B]" />` |
| 28 | hex | `#1B3F8B` | `<span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">` |
| 57 | hex | `#1B3F8B` | `className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-white font-bold text-xs transition-colors"` |
| 57 | hex | `#153270` | `className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-white font-bold text-xs transition-colors"` |

### `src\components\acri\AcriClosingSection.tsx` - 4

| Line | Kind | Value | Context |
|---:|---|---|---|
| 18 | hex | `#06382D` | `<section className="relative overflow-hidden bg-[#06382D] py-16 lg:py-24 text-white">` |
| 45 | hex | `#06382D` | `className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-white tone-light px-7 py-4 text-sm font-bold uppercase tracking-wider text-[#06382D] hover:bg-emerald-50 tr` |
| 48 | hex | `#06382D` | `<ArrowRight className="h-4 w-4 text-[#06382D] group-hover:translate-x-1 transition-transform" />` |
| 100 | hex | `#06382D` | `<div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#06382D] to-transparent pointer-events-none flex items-end p-5">` |

### `src\components\career-explorer\DegreeSelector.tsx` - 4

| Line | Kind | Value | Context |
|---:|---|---|---|
| 38 | hex | `#0C1938` | `? "bg-gradient-to-b from-[#0C1938] to-[#070D1B] border-sky-400 shadow-xl shadow-sky-500/10 scale-[1.02]"` |
| 38 | hex | `#070D1B` | `? "bg-gradient-to-b from-[#0C1938] to-[#070D1B] border-sky-400 shadow-xl shadow-sky-500/10 scale-[1.02]"` |
| 39 | hex | `#0B152C` | `: "bg-[#0B152C] border-slate-800 hover:border-sky-500/40 hover:bg-[#0E1B38] active:scale-[0.98]"` |
| 39 | hex | `#0E1B38` | `: "bg-[#0B152C] border-slate-800 hover:border-sky-500/40 hover:bg-[#0E1B38] active:scale-[0.98]"` |

### `src\components\career-explorer\IntentSelector.tsx` - 4

| Line | Kind | Value | Context |
|---:|---|---|---|
| 49 | hex | `#0C1938` | `? "bg-gradient-to-b from-[#0C1938] to-[#070D1B] border-sky-400 shadow-xl shadow-sky-500/10 scale-[1.02]"` |
| 49 | hex | `#070D1B` | `? "bg-gradient-to-b from-[#0C1938] to-[#070D1B] border-sky-400 shadow-xl shadow-sky-500/10 scale-[1.02]"` |
| 50 | hex | `#0B152C` | `: "bg-[#0B152C] border-slate-800 hover:border-sky-500/40 hover:bg-[#0E1B38] active:scale-[0.98]"` |
| 50 | hex | `#0E1B38` | `: "bg-[#0B152C] border-slate-800 hover:border-sky-500/40 hover:bg-[#0E1B38] active:scale-[0.98]"` |

### `src\components\courses\sections\CostOfWaitingBlock.tsx` - 4

| Line | Kind | Value | Context |
|---:|---|---|---|
| 56 | rgba | `rgba(255,255,255,0.06)` | `style={{ background: "rgba(255,255,255,0.06)" }}` |
| 79 | rgba | `rgba(15,23,42,0.6)` | `style={{ background: "rgba(15,23,42,0.6)", borderColor: "rgba(255,255,255,0.10)" }}` |
| 79 | rgba | `rgba(255,255,255,0.10)` | `style={{ background: "rgba(15,23,42,0.6)", borderColor: "rgba(255,255,255,0.10)" }}` |
| 85 | hex | `#94A3B8` | `<p className="mt-1 text-caption leading-snug" style={{ color: "#94A3B8" }}>` |

### `src\components\courses\sections\FinalCtaBand.tsx` - 4

| Line | Kind | Value | Context |
|---:|---|---|---|
| 26 | hex | `#0B0F19` | `className="relative border-t py-20 sm:py-28 bg-[#0B0F19]"` |
| 28 | rgba | `rgba(255,255,255,0.10)` | `borderColor: "rgba(255,255,255,0.10)",` |
| 48 | hex | `#2563EB` | `className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] px-5 text-sm font-bold text-white shadow-lg shadow-blue-600/30 trans` |
| 48 | hex | `#1d4ed8` | `className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] px-5 text-sm font-bold text-white shadow-lg shadow-blue-600/30 trans` |

### `src\components\courses\sections\TrustRibbon.tsx` - 4

| Line | Kind | Value | Context |
|---:|---|---|---|
| 23 | rgba | `rgba(15,23,42,0.55)` | `style={{ background: "rgba(15,23,42,0.55)", borderColor: "rgba(255,255,255,0.08)" }}` |
| 23 | rgba | `rgba(255,255,255,0.08)` | `style={{ background: "rgba(15,23,42,0.55)", borderColor: "rgba(255,255,255,0.08)" }}` |
| 35 | rgba | `rgba(255,255,255,0.04)` | `background: "rgba(255,255,255,0.04)",` |
| 36 | rgba | `rgba(255,255,255,0.10)` | `borderColor: "rgba(255,255,255,0.10)",` |

### `src\components\landing\CounsellorLeadForm.tsx` - 4

| Line | Kind | Value | Context |
|---:|---|---|---|
| 101 | hex | `#161F33` | `className="h-11 w-full rounded-xl border border-white/20 bg-[#161F33] px-3.5 text-sm font-medium text-white placeholder:text-slate-400 focus:border-sky-400 focus-ring-sky shadow-in` |
| 120 | hex | `#161F33` | `className="h-11 w-full rounded-xl border border-white/20 bg-[#161F33] px-3.5 text-sm font-medium text-white placeholder:text-slate-400 focus:border-sky-400 focus-ring-sky shadow-in` |
| 132 | hex | `#2563EB` | `className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] px-4 text-xs font-bold text-white shadow-lg transition-colors disabl` |
| 132 | hex | `#1d4ed8` | `className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] px-4 text-xs font-bold text-white shadow-lg transition-colors disabl` |

### `src\components\landing\ExpertGuidanceBookingSection.tsx` - 4

| Line | Kind | Value | Context |
|---:|---|---|---|
| 95 | hex | `#070D1B` | `<section id="expert-guidance" className="py-16 sm:py-24 bg-[#070D1B] text-slate-100 tone-dark border-b border-slate-800">` |
| 122 | hex | `#0B152C` | `className="p-6 rounded-3xl bg-[#0B152C] border border-slate-800 hover:border-amber-400/40 transition-all flex flex-col justify-between space-y-5 shadow-xl"` |
| 172 | hex | `#070D1B` | `: "bg-[#070D1B] text-slate-300 border-slate-800 hover:border-amber-400/40 hover:text-amber-300"` |
| 197 | hex | `#070D1B` | `className="w-full p-3 rounded-xl bg-[#070D1B] border border-slate-700 font-sans text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400/60 resiz` |

### `src\components\landing\GovtTrustBlock.tsx` - 4

| Line | Kind | Value | Context |
|---:|---|---|---|
| 29 | hex | `#0B1325` | `<div className="tone-dark w-full border-y border-slate-200/10 bg-[#0B1325]">` |
| 35 | rgba | `rgba(245,196,81,0.10)` | `style={{ background: "rgba(245,196,81,0.10)" }}` |
| 40 | hex | `#7FB0D8` | `<p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-[#7FB0D8]">` |
| 60 | hex | `#7FB0D8` | `<Icon className="h-3.5 w-3.5 text-[#7FB0D8]" />` |

### `src\components\landing\HealthcareDiscoveryHeader.tsx` - 4

| Line | Kind | Value | Context |
|---:|---|---|---|
| 16 | hex | `#070D1B` | `<header className="sticky top-0 z-50 bg-[#070D1B]/95 backdrop-blur-md border-b border-slate-800 text-slate-100 transition-all">` |
| 63 | hex | `#1B3F8B` | `className="h-10 sm:h-11 px-4 sm:px-6 rounded-xl bg-[#1B3F8B] hover:bg-[#2552b3] text-slate-50 font-mono font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#1B3F8B]/20 hov` |
| 63 | hex | `#2552b3` | `className="h-10 sm:h-11 px-4 sm:px-6 rounded-xl bg-[#1B3F8B] hover:bg-[#2552b3] text-slate-50 font-mono font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#1B3F8B]/20 hov` |
| 63 | hex | `#1B3F8B` | `className="h-10 sm:h-11 px-4 sm:px-6 rounded-xl bg-[#1B3F8B] hover:bg-[#2552b3] text-slate-50 font-mono font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#1B3F8B]/20 hov` |

### `src\components\landing\IndustrySkillsToolsBlock.tsx` - 4

| Line | Kind | Value | Context |
|---:|---|---|---|
| 22 | hex | `#0B152C` | `<section id="skills-tools" className="py-16 sm:py-24 bg-[#0B152C] text-slate-100 tone-dark border-b border-slate-800">` |
| 44 | hex | `#070D1B` | `<div className="p-6 sm:p-8 rounded-3xl border border-slate-800 bg-[#070D1B] space-y-6 shadow-xl">` |
| 74 | hex | `#070D1B` | `<div className="p-6 sm:p-8 rounded-3xl border border-slate-800 bg-[#070D1B] space-y-6 shadow-xl">` |
| 86 | hex | `#0B152C` | `<div key={t.name} className="p-4 rounded-2xl bg-[#0B152C] border border-slate-800 space-y-1">` |

### `src\components\opportunity\MatchScoreBreakdown.tsx` - 4

| Line | Kind | Value | Context |
|---:|---|---|---|
| 57 | hex | `#1B3F8B` | `<span className="font-mono text-[#1B3F8B]">{breakdown.roleFit}%</span>` |
| 60 | hex | `#1B3F8B` | `<div className="h-full bg-gradient-to-r from-blue-600 to-[#1B3F8B] rounded-full" style={{ width: `${breakdown.roleFit}%` }} />` |
| 79 | hex | `#1B3F8B` | `<span className="font-mono text-[#1B3F8B]">{breakdown.experienceMatch}%</span>` |
| 82 | hex | `#1B3F8B` | `<div className="h-full bg-gradient-to-r from-blue-600 to-[#1B3F8B] rounded-full" style={{ width: `${breakdown.experienceMatch}%` }} />` |

### `src\components\track\TrackDomainGrid.tsx` - 4

| Line | Kind | Value | Context |
|---:|---|---|---|
| 53 | hex | `#0a0c10` | `// labels to hit AA. bg-[#0a0c10]/40 backdrop-blur-md shadow-sm over a mid-gray gradient composites` |
| 54 | hex | `#808494` | `// to ~#808494, which drops white/55 to 1.26:1.` |
| 55 | hex | `#0a0c10` | `metricBox: "border-white/15 bg-[#0a0c10]/65 backdrop-blur-sm",` |
| 96 | hex | `#0a0c10` | `className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0a0c10]/40 text-h4 ring-1 sm:h-12 sm:w-12 sm:text-h3 ${t.ring}`}` |

### `src\components\workshop\ArzonWhatYouWillSee.tsx` - 4

| Line | Kind | Value | Context |
|---:|---|---|---|
| 65 | hex | `#FAF9F6` | `<section className="py-16 sm:py-24 bg-[#FAF9F6] border-b border-stone-200 relative overflow-hidden">` |
| 69 | hex | `#1B3F8B` | `<span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B] bg-blue-50 px-3 py-1 rounded-full border border-blue-200 inline-block">` |
| 91 | hex | `#1B3F8B` | `<div className="h-10 w-10 rounded-xl bg-stone-100 flex items-center justify-center text-[#1B3F8B]">` |
| 97 | hex | `#1B3F8B` | `<h3 className="font-mono text-xs font-bold text-[#1B3F8B] tracking-wider uppercase">` |

### `src\components\workshop\InteractiveCareerSelector.tsx` - 4

| Line | Kind | Value | Context |
|---:|---|---|---|
| 114 | hex | `#0B1325` | `? "tone-dark bg-[#0B1325] border-[#0B1325] shadow-sm"` |
| 114 | hex | `#0B1325` | `? "tone-dark bg-[#0B1325] border-[#0B1325] shadow-sm"` |
| 140 | hex | `#1B3F8B` | `? "tone-dark bg-[#1B3F8B] border-[#1B3F8B] shadow-sm"` |
| 140 | hex | `#1B3F8B` | `? "tone-dark bg-[#1B3F8B] border-[#1B3F8B] shadow-sm"` |

### `src\components\workshop\WorkshopSalaryRolesMatrix.tsx` - 4

| Line | Kind | Value | Context |
|---:|---|---|---|
| 12 | hex | `#1B3F8B` | `badgeColor: "bg-blue-50 text-[#1B3F8B] border-blue-200",` |
| 65 | hex | `#1B3F8B` | `className="p-5 sm:p-7 rounded-2xl border border-stone-200/90 bg-stone-50/60 hover:bg-white hover:border-[#1B3F8B]/40 hover:shadow-md transition-all space-y-4"` |
| 77 | hex | `#1B3F8B` | `<span className="font-mono text-base sm:text-lg font-black text-[#1B3F8B] block">` |
| 104 | hex | `#1B3F8B` | `<ArrowUpRight className="w-3.5 h-3.5 text-[#1B3F8B] shrink-0" />` |

### `src\routes\admin.leads.tsx` - 4

| Line | Kind | Value | Context |
|---:|---|---|---|
| 375 | hex | `#0a0c10` | `className="absolute inset-0 bg-[#0a0c10]/60"` |
| 379 | hex | `#0b0f1c` | `<aside className="relative ml-auto h-full w-full max-w-xl overflow-y-auto bg-[#0b0f1c] p-6 text-foreground shadow-2xl">` |
| 444 | hex | `#0a0c10` | `<pre className="mt-2 max-h-64 overflow-auto rounded bg-[#0a0c10]/50 p-3 text-micro leading-snug text-foreground">` |
| 452 | hex | `#0a0c10` | `<pre className="mt-2 max-h-64 overflow-auto rounded bg-[#0a0c10]/50 p-3 text-micro leading-snug text-foreground">` |

### `src\routes\admin.results.tsx` - 4

| Line | Kind | Value | Context |
|---:|---|---|---|
| 464 | hex | `#0a0c10` | `<div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0c10]/70 p-4">` |
| 465 | hex | `#0b1020` | `<div className="w-full max-w-md rounded-2xl border border-border bg-[#0b1020] p-6 text-foreground">` |
| 591 | hex | `#0a0c10` | `<button aria-label="Close" onClick={onClose} className="flex-1 bg-[#0a0c10]/60" />` |
| 592 | hex | `#0b1020` | `<aside className="w-full max-w-lg overflow-y-auto bg-[#0b1020] border-l border-border p-6">` |

### `src\routes\admin.seo.tsx` - 4

| Line | Kind | Value | Context |
|---:|---|---|---|
| 471 | hex | `#0a0c10` | `className="w-28 rounded-md border border-border bg-[#0a0c10]/40 px-2 py-1 text-foreground"` |
| 484 | hex | `#0a0c10` | `className="w-24 rounded-md border border-border bg-[#0a0c10]/40 px-2 py-1 text-foreground"` |
| 816 | hex | `#0a0c10` | `<code className="rounded bg-[#0a0c10]/40 px-1 py-0.5 text-xs">/sitemap.xml</code> to` |
| 909 | hex | `#0a0c10` | `className="w-64 rounded-full border border-border bg-[#0a0c10]/40 px-3 py-2 text-sm text-foreground"` |

### `src\routes\courses.index.tsx` - 4

| Line | Kind | Value | Context |
|---:|---|---|---|
| 69 | hex | `#0B1325` | `<main className="min-h-app bg-[var(--arzon-surface)] text-[#0B1325]">` |
| 75 | hex | `#0B1325` | `className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--arzon-ink-soft)] transition hover:text-[#0B1325]"` |
| 150 | hex | `#707C90` | `<p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-[#707C90]">` |
| 153 | hex | `#151C2E` | `<h2 className="font-sans text-2xl sm:text-3xl font-bold text-[#151C2E] mt-1">` |

### `src\routes\curriculum.tsx` - 4

| Line | Kind | Value | Context |
|---:|---|---|---|
| 46 | hex | `#0a0c10` | `<div className="tone-dark min-h-dvh bg-[#0a0c10] text-white">` |
| 49 | rgba | `rgba(59,130,246,0.18)` | `<div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(59,130,246,0.18),transparent_70%)]" />` |
| 81 | hex | `#06080d` | `? "text-[#06080d]"` |
| 155 | hex | `#0a0c10` | `className={`h-12 w-12 rounded-full flex items-center justify-center border-2 border-[#0a0c10] shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl ${t` |

### `src\routes\pricing.tsx` - 4

| Line | Kind | Value | Context |
|---:|---|---|---|
| 187 | hex | `#1B3F8B` | `? "border-[#1B3F8B] shadow-sm ring-1 ring-[#1B3F8B]"` |
| 187 | hex | `#1B3F8B` | `? "border-[#1B3F8B] shadow-sm ring-1 ring-[#1B3F8B]"` |
| 239 | hex | `#BCE6DE` | `className="h-10 w-full inline-flex items-center justify-center gap-2 text-xs font-medium text-[var(--arzon-teal-600)] rounded-lg bg-[var(--arzon-teal-100)] border border-[#BCE6DE] ` |
| 298 | hex | `#BCE6DE` | `<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--arzon-teal-100)] text-[var(--arzon-teal-600)] shrink-0 border border-[#BCE6DE]">` |

### `src\components\candidate\ShareableAcriCard.tsx` - 3

| Line | Kind | Value | Context |
|---:|---|---|---|
| 36 | hex | `#0F172A` | `<div className={`rounded-3xl border border-slate-700 bg-gradient-to-br from-[#0F172A] via-[#0B132B] to-[#1E293B] p-6 sm:p-8 shadow-2xl text-slate-100 space-y-6 ${className}`}>` |
| 36 | hex | `#0B132B` | `<div className={`rounded-3xl border border-slate-700 bg-gradient-to-br from-[#0F172A] via-[#0B132B] to-[#1E293B] p-6 sm:p-8 shadow-2xl text-slate-100 space-y-6 ${className}`}>` |
| 36 | hex | `#1E293B` | `<div className={`rounded-3xl border border-slate-700 bg-gradient-to-br from-[#0F172A] via-[#0B132B] to-[#1E293B] p-6 sm:p-8 shadow-2xl text-slate-100 space-y-6 ${className}`}>` |

### `src\components\career\report\chapters\06SkillGapRadar.tsx` - 3

| Line | Kind | Value | Context |
|---:|---|---|---|
| 166 | hex | `#2563EB` | `className="absolute inset-y-0 left-0 rounded-full bg-[#2563EB]"` |
| 186 | hex | `#161F33` | `<div className="mt-6 rounded-2xl border border-white/10 bg-[#161F33] p-5 space-y-4 shadow-lg">` |
| 222 | hex | `#0B0F19` | `<div className="rounded-xl border border-white/10 bg-[#0B0F19] p-4 space-y-2">` |

### `src\components\career\report\NextStepCta.tsx` - 3

| Line | Kind | Value | Context |
|---:|---|---|---|
| 13 | hex | `#121723` | `className="rounded-2xl border border-white/10 bg-[#121723] p-6 sm:p-8 md:p-10 shadow-2xl space-y-6 text-white"` |
| 34 | hex | `#2563EB` | `className="h-12 px-6 rounded-xl inline-flex items-center gap-2 text-white font-bold bg-[#2563EB] hover:bg-[#1d4ed8] shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"` |
| 34 | hex | `#1d4ed8` | `className="h-12 px-6 rounded-xl inline-flex items-center gap-2 text-white font-bold bg-[#2563EB] hover:bg-[#1d4ed8] shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"` |

### `src\components\career\report\ReportCard.tsx` - 3

| Line | Kind | Value | Context |
|---:|---|---|---|
| 83 | hex | `#121723` | `"rounded-2xl border border-white/10 bg-[#121723] p-6 sm:p-8 md:p-10 shadow-2xl space-y-4 text-white",` |
| 127 | hex | `#3B82F6` | `<div className="rounded-xl border-l-4 border-l-[#3B82F6] bg-[#1A2338] p-4 text-slate-200 space-y-1">` |
| 127 | hex | `#1A2338` | `<div className="rounded-xl border-l-4 border-l-[#3B82F6] bg-[#1A2338] p-4 text-slate-200 space-y-1">` |

### `src\components\career\report\ScoreChip.tsx` - 3

| Line | Kind | Value | Context |
|---:|---|---|---|
| 53 | hex | `#3B82F6` | `? "#3B82F6"` |
| 55 | hex | `#10B981` | `? "#10B981"` |
| 104 | hex | `#121723` | `<span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/15 bg-[#121723] px-2.5 py-0.5 font-mono text-[10px] font-bold upper` |

### `src\components\career\ResultConversionStrip.tsx` - 3

| Line | Kind | Value | Context |
|---:|---|---|---|
| 31 | hex | `#1a1430` | `className="mb-6 overflow-hidden rounded-3xl border border-amber-300/30 bg-gradient-to-br from-[#1a1430] via-[#0f1a3d] to-[#0a1430] p-5 shadow-[0_24px_60px_-20px_rgba(251,191,36,0.3` |
| 31 | hex | `#0f1a3d` | `className="mb-6 overflow-hidden rounded-3xl border border-amber-300/30 bg-gradient-to-br from-[#1a1430] via-[#0f1a3d] to-[#0a1430] p-5 shadow-[0_24px_60px_-20px_rgba(251,191,36,0.3` |
| 31 | hex | `#0a1430` | `className="mb-6 overflow-hidden rounded-3xl border border-amber-300/30 bg-gradient-to-br from-[#1a1430] via-[#0f1a3d] to-[#0a1430] p-5 shadow-[0_24px_60px_-20px_rgba(251,191,36,0.3` |

### `src\components\career\v2\PrimaryFit.tsx` - 3

| Line | Kind | Value | Context |
|---:|---|---|---|
| 133 | rgba | `rgba(255,255,255,0.08)` | `<circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />` |
| 147 | hex | `#7FB0D8` | `<stop offset="0%" stopColor="#7FB0D8" />` |
| 148 | hex | `#34d399` | `<stop offset="100%" stopColor="#34d399" />` |

### `src\components\career-explorer\CareerMap.tsx` - 3

| Line | Kind | Value | Context |
|---:|---|---|---|
| 37 | hex | `#0B152C` | `className={`group relative p-6 rounded-2xl bg-[#0B152C] border transition-all duration-200 flex flex-col justify-between space-y-4 hover:shadow-xl ${` |
| 39 | hex | `#0C1938` | `? "border-sky-500/50 hover:border-sky-400 bg-gradient-to-b from-[#0C1938] to-[#0B152C]"` |
| 39 | hex | `#0B152C` | `? "border-sky-500/50 hover:border-sky-400 bg-gradient-to-b from-[#0C1938] to-[#0B152C]"` |

### `src\components\courses\ConversionSection.tsx` - 3

| Line | Kind | Value | Context |
|---:|---|---|---|
| 51 | hex | `#475569` | `style={{ color: "#475569" }}` |
| 97 | rgba | `rgba(15,23,42,0.6)` | `style={{ background: "rgba(15,23,42,0.6)", borderColor: "rgba(255,255,255,0.10)" }}` |
| 97 | rgba | `rgba(255,255,255,0.10)` | `style={{ background: "rgba(15,23,42,0.6)", borderColor: "rgba(255,255,255,0.10)" }}` |

### `src\components\courses\sections\HowItWorksTimeline.tsx` - 3

| Line | Kind | Value | Context |
|---:|---|---|---|
| 23 | rgba | `rgba(15,23,42,0.6)` | `style={{ background: "rgba(15,23,42,0.6)", borderColor: "rgba(255,255,255,0.10)" }}` |
| 23 | rgba | `rgba(255,255,255,0.10)` | `style={{ background: "rgba(15,23,42,0.6)", borderColor: "rgba(255,255,255,0.10)" }}` |
| 55 | hex | `#94A3B8` | `style={{ color: "#94A3B8" }}` |

### `src\components\courses\TrustBar.tsx` - 3

| Line | Kind | Value | Context |
|---:|---|---|---|
| 17 | hex | `#0B1325` | `className={`w-full border-y border-white/10 bg-[#0B1325] ${compact ? "py-2" : "py-2.5"}`}` |
| 23 | hex | `#60A5FA` | `style={{ color: "#60A5FA" }}` |
| 35 | hex | `#60A5FA` | `<Icon className="h-3.5 w-3.5 shrink-0" style={{ color: "#60A5FA" }} />` |

### `src\components\landing\LiveOpportunityMatcher.tsx` - 3

| Line | Kind | Value | Context |
|---:|---|---|---|
| 65 | hex | `#F7F5F0` | `<section id="opportunity-matcher" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#F7F5F0] text-stone-900 border-t border-stone-200">` |
| 69 | hex | `#1B3F8B` | `<span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider block">` |
| 154 | hex | `#1B3F8B` | `className="mt-2 h-9 px-5 rounded-xl border border-stone-300 bg-stone-100 text-xs font-mono text-stone-800 hover:bg-stone-200 transition-all font-semibold focus:outline-none focus:r` |

### `src\components\magicui\animated-gradient-text.tsx` - 3

| Line | Kind | Value | Context |
|---:|---|---|---|
| 20 | hex | `#1B3F8B` | `colorFrom = "#1B3F8B",` |
| 21 | hex | `#8A6D1F` | `colorVia = "#8A6D1F",` |
| 22 | hex | `#1B3F8B` | `colorTo = "#1B3F8B",` |

### `src\components\opportunity\OpportunityFilterBar.tsx` - 3

| Line | Kind | Value | Context |
|---:|---|---|---|
| 42 | hex | `#1B3F8B` | `className="tone-light w-full h-11 pl-10 pr-4 rounded-xl border border-stone-300 bg-white text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#1B3F8B] shad` |
| 54 | hex | `#1B3F8B` | `className="tone-light h-11 px-3 rounded-xl border border-stone-300 bg-white text-xs font-mono text-stone-800 focus:outline-none focus:border-[#1B3F8B] shadow-xs transition-all"` |
| 74 | hex | `#1B3F8B` | `? "bg-[#1B3F8B] text-white shadow-xs"` |

### `src\components\simulations\CrisisSimulationSandbox.tsx` - 3

| Line | Kind | Value | Context |
|---:|---|---|---|
| 79 | hex | `#0F172A` | `"rounded-2xl border border-amber-500/30 bg-gradient-to-br from-[#0F172A] via-[#090D16] to-[#050A15] p-6 text-slate-200 shadow-2xl space-y-5",` |
| 79 | hex | `#090D16` | `"rounded-2xl border border-amber-500/30 bg-gradient-to-br from-[#0F172A] via-[#090D16] to-[#050A15] p-6 text-slate-200 shadow-2xl space-y-5",` |
| 79 | hex | `#050A15` | `"rounded-2xl border border-amber-500/30 bg-gradient-to-br from-[#0F172A] via-[#090D16] to-[#050A15] p-6 text-slate-200 shadow-2xl space-y-5",` |

### `src\components\system\GlobalSearchModal.tsx` - 3

| Line | Kind | Value | Context |
|---:|---|---|---|
| 267 | hex | `#FAF8F5` | `<div className="h-8 w-8 rounded-md bg-[#FAF8F5] border border-stone-200 flex items-center justify-center shrink-0 text-[#1B3F8B]">` |
| 267 | hex | `#1B3F8B` | `<div className="h-8 w-8 rounded-md bg-[#FAF8F5] border border-stone-200 flex items-center justify-center shrink-0 text-[#1B3F8B]">` |
| 271 | hex | `#0B1325` | `<div className="text-xs font-semibold text-[#0B1325] truncate">` |

### `src\components\track\TrackHeroPanel.tsx` - 3

| Line | Kind | Value | Context |
|---:|---|---|---|
| 58 | hex | `#0a0c10` | `className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0a0c10]/40 text-h3 ring-1 sm:h-14 sm:w-14 sm:text-h2 ${t.ring}`}` |
| 100 | hex | `#0a0c10` | `<div className="mt-4 flex items-start gap-2 rounded-lg border border-white/10 bg-[#0a0c10]/40 backdrop-blur-md shadow-xl ring-1 ring-black/20 p-3 text-meta leading-relaxed text-whi` |
| 116 | hex | `#0a0c10` | `<div className="min-w-0 rounded-lg border border-white/10 bg-[#0a0c10]/40 backdrop-blur-md shadow-xl ring-1 ring-black/20 px-2.5 py-2 sm:px-3">` |

### `src\components\workshop\ArzonEmployerEvidence.tsx` - 3

| Line | Kind | Value | Context |
|---:|---|---|---|
| 43 | hex | `#1B3F8B` | `<span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B] bg-blue-50 px-3 py-1 rounded-full border border-blue-200 inline-block">` |
| 64 | hex | `#1B3F8B` | `<div className="h-9 w-9 rounded-xl bg-white tone-light border border-stone-200 flex items-center justify-center text-[#1B3F8B] shrink-0">` |
| 78 | hex | `#1B3F8B` | `<h3 className="font-serif text-lg font-bold text-[#1B3F8B]">` |

### `src\components\workshop\ArzonEventFooter.tsx` - 3

| Line | Kind | Value | Context |
|---:|---|---|---|
| 18 | hex | `#070D1B` | `<div className="border-b border-white/10 bg-[#070D1B] py-8">` |
| 37 | hex | `#1B3F8B` | `className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1B3F8B] hover:bg-[#2552b3] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-sm transitio` |
| 37 | hex | `#2552b3` | `className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1B3F8B] hover:bg-[#2552b3] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-sm transitio` |

### `src\components\workshop\ArzonProgramBridge.tsx` - 3

| Line | Kind | Value | Context |
|---:|---|---|---|
| 22 | hex | `#1B3F8B` | `<span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B] bg-blue-50 px-3 py-1 rounded-full border border-blue-200 inline-block">` |
| 40 | hex | `#1B3F8B` | `? "bg-[#1B3F8B] text-white"` |
| 84 | hex | `#1B3F8B` | `<p className="font-serif text-sm font-bold text-[#1B3F8B]">→ {item.role}</p>` |

### `src\components\workshop\ArzonWhoShouldAttend.tsx` - 3

| Line | Kind | Value | Context |
|---:|---|---|---|
| 23 | hex | `#1B3F8B` | `<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B3F8B]/10 border border-[#1B3F8B]/20 text-[#1B3F8B] font-mono text-xs font-bold uppercase tracking-wider` |
| 23 | hex | `#1B3F8B` | `<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B3F8B]/10 border border-[#1B3F8B]/20 text-[#1B3F8B] font-mono text-xs font-bold uppercase tracking-wider` |
| 23 | hex | `#1B3F8B` | `<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B3F8B]/10 border border-[#1B3F8B]/20 text-[#1B3F8B] font-mono text-xs font-bold uppercase tracking-wider` |

### `src\components\workshop\WorkshopProblemSection.tsx` - 3

| Line | Kind | Value | Context |
|---:|---|---|---|
| 48 | hex | `#1B3F8B` | `className="p-6 sm:p-7 rounded-2xl border border-stone-200 bg-white tone-light shadow-2xs hover:border-[#1B3F8B]/30 hover:shadow-sm transition-all space-y-3"` |
| 51 | hex | `#1B3F8B` | `<div className="w-10 h-10 rounded-xl bg-stone-100 text-[#1B3F8B] flex items-center justify-center shrink-0 border border-stone-200">` |
| 68 | hex | `#1B3F8B` | `<div className="p-5 sm:p-6 rounded-2xl bg-white tone-light border-2 border-dashed border-[#1B3F8B]/30 text-center max-w-3xl mx-auto shadow-xs">` |

### `src\hooks\useAdminErrorReporter.ts` - 3

| Line | Kind | Value | Context |
|---:|---|---|---|
| 7 | hex | `#418` | `* Also flags React hydration mismatches (#418/#423/#425) explicitly.` |
| 7 | hex | `#423` | `* Also flags React hydration mismatches (#418/#423/#425) explicitly.` |
| 7 | hex | `#425` | `* Also flags React hydration mismatches (#418/#423/#425) explicitly.` |

### `src\lib\aiAssessmentEngine.ts` - 3

| Line | Kind | Value | Context |
|---:|---|---|---|
| 110 | hex | `#10B981` | `tierColor = "#10B981";` |
| 115 | hex | `#3B82F6` | `tierColor = "#3B82F6";` |
| 120 | hex | `#8B5CF6` | `tierColor = "#8B5CF6";` |

### `src\routes\admin.audit.tsx` - 3

| Line | Kind | Value | Context |
|---:|---|---|---|
| 146 | hex | `#0a0c10` | `className="ml-2 rounded-md border border-border bg-[#0a0c10]/40 px-2 py-1 text-sm text-foreground"` |
| 161 | hex | `#0a0c10` | `className="ml-2 rounded-md border border-border bg-[#0a0c10]/40 px-2 py-1 text-sm text-foreground"` |
| 254 | hex | `#0a0c10` | `<td colSpan={6} className="bg-[#0a0c10]/40 px-3 py-3">` |

### `src\routes\admin.invites.tsx` - 3

| Line | Kind | Value | Context |
|---:|---|---|---|
| 144 | hex | `#0a0c10` | `className="mt-1 w-full rounded-lg border border-border bg-[#0a0c10]/40 backdrop-blur-md shadow-sm px-3 py-2 text-sm text-foreground"` |
| 153 | hex | `#0a0c10` | `className="mt-1 rounded-lg border border-border bg-[#0a0c10]/40 backdrop-blur-md shadow-sm px-3 py-2 text-sm text-foreground"` |
| 195 | hex | `#0a0c10` | `className="flex-1 rounded-md border border-border bg-[#0a0c10]/40 backdrop-blur-md shadow-sm px-2 py-1.5 text-xs text-foreground"` |

### `src\routes\dashboard.tsx` - 3

| Line | Kind | Value | Context |
|---:|---|---|---|
| 54 | hex | `#0A0F1E` | `<main className="tone-dark min-h-app bg-[#0A0F1E] text-white">` |
| 80 | hex | `#101A33` | `<div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#101A33] to-[#0B1224] p-7">` |
| 80 | hex | `#0B1224` | `<div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#101A33] to-[#0B1224] p-7">` |

### `src\routes\industry.$role.$city.tsx` - 3

| Line | Kind | Value | Context |
|---:|---|---|---|
| 113 | hex | `#070A14` | `<div className="min-h-dvh animate-pulse bg-[#070A14] px-4 py-16 sm:px-6">` |
| 141 | hex | `#070A14` | `<div className="min-h-dvh bg-[#070A14] text-white">` |
| 180 | hex | `#0a0c10` | `className="rounded-xl border border-white/10 bg-[#0a0c10]/40 backdrop-blur-md shadow-xl ring-1 ring-black/20 p-4"` |

### `src\routes\industry.compare.tsx` - 3

| Line | Kind | Value | Context |
|---:|---|---|---|
| 47 | hex | `#070A14` | `<div className="tone-dark min-h-dvh bg-[#070A14] text-white">` |
| 318 | hex | `#1A1300` | `className="inline-flex h-10 items-center rounded-full bg-gold px-4 text-caption font-bold text-[#1A1300] hover:bg-gold/90"` |
| 334 | hex | `#0A0E1A` | `className="sticky left-0 z-10 bg-[#0A0E1A] px-4 py-3 text-left text-micro font-medium uppercase tracking-wide text-white/50 align-top"` |

### `src\routes\r.$id.brief.tsx` - 3

| Line | Kind | Value | Context |
|---:|---|---|---|
| 55 | hex | `#0A0F1E` | `<div className="min-h-screen bg-[#0A0F1E] animate-pulse px-4 py-16 sm:px-6">` |
| 77 | hex | `#f5f7fa` | `<main className="min-h-dvh bg-[#f5f7fa] text-slate-900">` |
| 81 | hex | `#0f1b3d` | `<div className="border-b border-slate-100 bg-[#0f1b3d] px-5 py-5 text-white sm:px-7">` |

### `src\routes\r.$id.tsx` - 3

| Line | Kind | Value | Context |
|---:|---|---|---|
| 41 | hex | `#0A0F1E` | `<div className="min-h-screen bg-[#0A0F1E] animate-pulse px-4 py-24 sm:px-6">` |
| 80 | hex | `#070A14` | `<main className="min-h-dvh bg-[#070A14] text-white">` |
| 102 | rgba | `rgba(255,255,255,0.08)` | `stroke="rgba(255,255,255,0.08)"` |

### `src\routes\waitlist.tsx` - 3

| Line | Kind | Value | Context |
|---:|---|---|---|
| 113 | hex | `#2563EB` | `className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] px-6 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-a` |
| 113 | hex | `#1d4ed8` | `className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] px-6 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-a` |
| 120 | hex | `#0F172A` | `className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white tone-light hover:bg-slate-50 px-6 text-sm font-bold text-[#0F172A] shadow-` |

### `src\components\aceternity\background-beams.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 41 | rgba | `rgba(27,63,139,0.15)` | `<stop offset="0%" stopColor="rgba(27,63,139,0.15)" />` |
| 42 | rgba | `rgba(27,63,139,0)` | `<stop offset="100%" stopColor="rgba(27,63,139,0)" />` |

### `src\components\aceternity\spotlight.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 14 | rgba | `rgba(27,63,139,0.18)` | `export function Spotlight({ className, fill = "rgba(27,63,139,0.18)" }: SpotlightProps) {` |
| 73 | rgba | `rgba(27,63,139,0.12)` | `background: `radial-gradient(600px circle at ${position.x}% ${position.y}%, rgba(27,63,139,0.12) 0%, transparent 70%)`,` |

### `src\components\acri\ArzonLogo.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 53 | hex | `#071A4A` | `isDark ? "text-white" : "text-[#071A4A]"` |
| 66 | hex | `#69758A` | `: "border-slate-300 text-[#69758A]"` |

### `src\components\career\cards\primitives.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 49 | rgba | `rgba(255,255,255,0.55)` | `"radial-gradient(rgba(255,255,255,0.55) 0.5px, transparent 0.5px), radial-gradient(rgba(255,255,255,0.35) 0.5px, transparent 0.5px)",` |
| 49 | rgba | `rgba(255,255,255,0.35)` | `"radial-gradient(rgba(255,255,255,0.55) 0.5px, transparent 0.5px), radial-gradient(rgba(255,255,255,0.35) 0.5px, transparent 0.5px)",` |

### `src\components\career\report\chapters\04WhyNotThat.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 56 | hex | `#161F33` | `<div className="rounded-2xl border border-white/10 bg-[#161F33] p-5 shadow-lg space-y-3">` |
| 74 | hex | `#161F33` | `<div className="rounded-2xl border border-white/10 bg-[#161F33] p-5 shadow-lg space-y-3">` |

### `src\components\career\report\ReportActionBar.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 68 | hex | `#2563EB` | `className="h-10 px-4 rounded-xl flex items-center gap-2 text-white font-bold text-xs bg-[#2563EB] hover:bg-[#1d4ed8] shadow-md shadow-blue-500/20 transition-all"` |
| 68 | hex | `#1d4ed8` | `className="h-10 px-4 rounded-xl flex items-center gap-2 text-white font-bold text-xs bg-[#2563EB] hover:bg-[#1d4ed8] shadow-md shadow-blue-500/20 transition-all"` |

### `src\components\career\report\SectionRail.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 37 | hex | `#070B16` | `"sticky top-[57px] z-20 -mx-4 border-b border-white/10 bg-[#070B16]/85 px-4 py-3 backdrop-blur-xl sm:top-[57px] sm:-mx-6 sm:px-6",` |
| 71 | hex | `#5eead4` | `? ({ ["--rail-accent" as string]: "#5eead4" } as React.CSSProperties)` |

### `src\components\career-explorer\MyCareerContextBar.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 27 | hex | `#0B152C` | `<aside className="hidden lg:block fixed bottom-6 right-6 z-40 w-72 rounded-2xl bg-[#0B152C]/95 backdrop-blur-md border border-slate-700/80 shadow-2xl p-4 tone-dark text-slate-100 a` |
| 66 | hex | `#0B152C` | `<div className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-sm rounded-full bg-[#0B152C]/95 backdrop-blur-md border border-slate-700/80 shadow-2xl p-2.5 p` |

### `src\components\courses\EnrolmentRail.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 84 | hex | `#0A0F1E` | `<div className="pointer-events-auto mx-3 mb-3 flex items-center gap-2 rounded-full border border-white/15 bg-[#0A0F1E]/95 px-2 py-2 backdrop-blur-lg shadow-[0_-12px_40px_-10px_rgba` |
| 87 | hex | `#1A1300` | `className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-full bg-gold px-4 text-caption font-semibold text-[#1A1300] hover:bg-gold/90"` |

### `src\components\courses\MentorCard.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 10 | rgba | `rgba(17,26,46,1)` | `style={{ background: "rgba(17,26,46,1)", borderColor: "rgba(255,255,255,0.10)" }}` |
| 10 | rgba | `rgba(255,255,255,0.10)` | `style={{ background: "rgba(17,26,46,1)", borderColor: "rgba(255,255,255,0.10)" }}` |

### `src\components\courses\sections\FaqBlock.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 22 | rgba | `rgba(17,26,46,1)` | `style={{ background: "rgba(17,26,46,1)", borderColor: "rgba(255,255,255,0.10)" }}` |
| 22 | rgba | `rgba(255,255,255,0.10)` | `style={{ background: "rgba(17,26,46,1)", borderColor: "rgba(255,255,255,0.10)" }}` |

### `src\components\courses\sections\UrgencyBlock.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 51 | rgba | `rgba(15,23,42,0.6)` | `background: `linear-gradient(180deg, ${theme.hex.from}18, rgba(15,23,42,0.6))`,` |
| 59 | hex | `#94A3B8` | `<p className="mt-1 text-meta uppercase tracking-[0.18em]" style={{ color: "#94A3B8" }}>` |

### `src\components\dashboard\AchievementBadge.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 37 | hex | `#0A66C2` | `className="mt-6 w-full gap-2 rounded-full bg-[#0A66C2] text-white hover:bg-[#004182]"` |
| 37 | hex | `#004182` | `className="mt-6 w-full gap-2 rounded-full bg-[#0A66C2] text-white hover:bg-[#004182]"` |

### `src\components\feedback\AiFeedbackPrompt.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 76 | hex | `#0B1426` | `"rounded-2xl border border-white/15 bg-[#0B1426] p-4 text-sm text-white/85 shadow-lg " +` |
| 117 | hex | `#0a0c10` | `className="mt-3 w-full resize-none rounded-lg border border-white/10 bg-[#0a0c10]/40 backdrop-blur-md shadow-xl ring-1 ring-black/20 p-2 text-xs text-white/85 placeholder:text-whit` |

### `src\components\landing\CompanyRolesFeed.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 11 | hex | `#0B152C` | `<section id="company-roles" className="py-16 sm:py-24 bg-[#0B152C] text-slate-100 tone-dark border-b border-slate-800">` |
| 34 | hex | `#070D1B` | `className="p-6 rounded-3xl border border-slate-700/80 bg-[#070D1B] space-y-5 flex flex-col justify-between shadow-xl hover:border-sky-400/50 transition-all duration-300 group"` |

### `src\components\landing\DayInTheLifeStrip.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 79 | hex | `#1E40AF` | `<span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[#1E40AF] text-slate-50 ring-1 ring-white/40 shadow-[0_4px_14px_-6px` |
| 87 | hex | `#7fb0d8` | `<p className="mt-4 font-mono text-micro font-semibold uppercase tracking-[0.2em] text-[#7fb0d8]">` |

### `src\components\landing\LogoMarquee.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 45 | hex | `#0F172A` | `<div className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10 bg-gradient-to-r from-[#0F172A] to-transparent" />` |
| 46 | hex | `#0F172A` | `<div className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10 bg-gradient-to-l from-[#0F172A] to-transparent" />` |

### `src\components\landing\ParentSection.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 122 | hex | `#0F1A30` | `<div className="overflow-hidden rounded-3xl border border-slate-200/10 bg-gradient-to-br from-[#0F1A30] to-[#0B1325] p-6 sm:p-10">` |
| 122 | hex | `#0B1325` | `<div className="overflow-hidden rounded-3xl border border-slate-200/10 bg-gradient-to-br from-[#0F1A30] to-[#0B1325] p-6 sm:p-10">` |

### `src\components\magicui\border-beam.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 23 | hex | `#1B3F8B` | `colorFrom = "#1B3F8B",` |
| 24 | hex | `#8A6D1F` | `colorTo = "#8A6D1F",` |

### `src\components\magicui\meteors.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 38 | hex | `#1B3F8B` | `"bg-gradient-to-r from-[#1B3F8B]/60 via-[#8A6D1F]/40 to-transparent",` |
| 38 | hex | `#8A6D1F` | `"bg-gradient-to-r from-[#1B3F8B]/60 via-[#8A6D1F]/40 to-transparent",` |

### `src\components\magicui\shimmer-button.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 21 | rgba | `rgba(255,255,255,0.25)` | `shimmerColor = "rgba(255,255,255,0.25)",` |
| 25 | hex | `#1B3F8B` | `background = "#1B3F8B",` |

### `src\components\proof\DailyAiProofBadge.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 18 | hex | `#F8FAFC` | `<span style={{ color: "#F8FAFC" }} className="font-bold text-[#F8FAFC]">` |
| 22 | hex | `#38BDF8` | `<span style={{ color: "#38BDF8" }} className="font-mono font-bold text-sky-400">` |

### `src\components\proof\LiveProofCounter.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 36 | hex | `#7fb0d8` | `? "border-white/12 bg-white/[0.04] hover:border-[#7fb0d8]/45 hover:bg-white/[0.07]"` |
| 40 | hex | `#7fb0d8` | `const chev = isDark ? "text-[#7fb0d8]" : "text-[color:var(--teal-deep)]";` |

### `src\components\workshop\ArzonAudience.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 13 | hex | `#FAF9F6` | `<section className="py-16 sm:py-24 bg-[#FAF9F6] border-b border-stone-200 relative overflow-hidden">` |
| 16 | hex | `#1B3F8B` | `<span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B] bg-blue-50 px-3 py-1 rounded-full border border-blue-200 inline-block">` |

### `src\components\workshop\ArzonMentorDossier.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 81 | hex | `#0A66C2` | `<div className="flex items-center gap-1.5 font-mono text-xs text-[#0A66C2] font-semibold">` |
| 82 | hex | `#0A66C2` | `<span className="w-4 h-4 bg-[#0A66C2] text-white rounded flex items-center justify-center text-[9px] font-bold">in</span>` |

### `src\components\workshop\CertificationRealitySection.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 114 | hex | `#FF6525` | `className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#FF6525] hover:bg-[#e05318] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-md ` |
| 114 | hex | `#e05318` | `className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#FF6525] hover:bg-[#e05318] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-md ` |

### `src\components\workshop\GoogleReviewsSection.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 41 | hex | `#4285F4` | `fill="#4285F4"` |
| 45 | hex | `#34A853` | `fill="#34A853"` |

### `src\components\workshop\HiringMarketDiagram.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 182 | hex | `#1B3F8B` | `className="flex flex-col p-3.5 rounded-2xl bg-stone-50 tone-light border border-stone-200/90 text-center relative shadow-2xs hover:border-[#1B3F8B]/40 hover:bg-white transition-all` |
| 184 | hex | `#1B3F8B` | `<span className="font-mono text-[10px] font-bold text-[#1B3F8B] block mb-1">` |

### `src\components\workshop\WorkshopCountdown.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 40 | rgba | `rgba(0,0,0,0.3)` | `style={{ boxShadow: "inset 0 2px 8px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.06)" }}` |
| 40 | rgba | `rgba(255,255,255,0.06)` | `style={{ boxShadow: "inset 0 2px 8px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.06)" }}` |

### `src\components\workshop\WorkshopHiringStrip.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 19 | hex | `#1B3F8B` | `<Building2 className="w-3.5 h-3.5 text-[#1B3F8B]" />` |
| 31 | hex | `#1B3F8B` | `className="px-3.5 py-2 rounded-xl border border-stone-200/90 bg-white tone-light shadow-2xs hover:border-[#1B3F8B]/40 hover:shadow-xs transition-all flex flex-col items-center"` |

### `src\components\workshop\WorkshopLiveCaseTeaser.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 5 | hex | `#0B1325` | `<section className="py-16 sm:py-20 border-b border-stone-200 bg-[#0B1325] text-white tone-dark">` |
| 101 | hex | `#1B3F8B` | `className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-xl bg-[#1B3F8B] hover:bg-blue-600 text-white font-mono text-xs font-bold transition-all flex items-center justify-cente` |

### `src\components\workshop\WorkshopWhoIsThisFor.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 20 | hex | `#FAF8F5` | `<section className="py-16 sm:py-20 border-b border-stone-200 bg-[#FAF8F5] tone-light">` |
| 25 | hex | `#1B3F8B` | `<Users className="w-3.5 h-3.5 text-[#1B3F8B]" />` |

### `src\features\admin\components\admin\AdminCard.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 96 | hex | `#0d0d11` | `"relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d0d11]/80 backdrop-blur-sm text-card-foreground shadow-sm transition-all duration-200 hover:border-white/[0.1` |
| 180 | hex | `#0d0d12` | `"group relative overflow-hidden rounded-2xl border bg-[#0d0d12]/90 p-5 shadow-sm transition-all duration-200",` |

### `src\lib\dev\css-hmr-probe.ts` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 26 | hex | `#0d9488` | `"color:#0d9488;font-weight:bold;",` |
| 35 | hex | `#0d9488` | `"color:#0d9488;font-weight:bold;",` |

### `src\lib\starter-kit-pdf.ts` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 32 | hex | `#0B1325` | `const NAVY = [11, 19, 37]; // #0B1325` |
| 33 | hex | `#1B3F8B` | `const ROYAL_BLUE = [27, 63, 139]; // #1B3F8B` |

### `src\routes\admin.accept-invite.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 131 | hex | `#0a0c10` | `className="mt-1 w-full rounded-lg border border-border bg-[#0a0c10]/40 backdrop-blur-md shadow-sm px-3 py-2 text-sm text-foreground"` |
| 142 | hex | `#0a0c10` | `className="mt-1 w-full rounded-lg border border-border bg-[#0a0c10]/40 backdrop-blur-md shadow-sm px-3 py-2 text-sm text-foreground"` |

### `src\routes\admin.certificates.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 266 | hex | `#0a0c10` | `"w-full rounded-lg border border-border bg-[#0a0c10]/40 backdrop-blur-md shadow-sm px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary/60 fo` |
| 372 | hex | `#0a0c10` | `<div className="relative aspect-[1.41/1] w-full shrink-0 overflow-hidden rounded-lg bg-[#0a0c10]/40 sm:w-56">` |

### `src\routes\admin.experiments.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 223 | rgba | `rgba(255,255,255,0.5)` | `<path d={ePath} fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth={1.5} />` |
| 224 | hex | `#10B981` | `<path d={pPath} fill="none" stroke="#10B981" strokeWidth={1.5} />` |

### `src\routes\admin.metrics-domain-grid.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 97 | hex | `#0A0F1E` | `className="mt-1 rounded-md border border-border bg-[#0A0F1E] px-2 py-1.5"` |
| 108 | hex | `#0A0F1E` | `className="mt-1 w-24 rounded-md border border-border bg-[#0A0F1E] px-2 py-1.5"` |

### `src\routes\industry.$role.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 64 | hex | `#070A14` | `<div className="min-h-dvh motion-safe:animate-pulse bg-[#070A14] px-4 py-16 sm:px-6">` |
| 257 | hex | `#1A1300` | `className="inline-flex h-11 items-center gap-1.5 rounded-full bg-gold px-5 text-sm font-bold text-[#1A1300] hover:bg-gold/90"` |

### `src\routes\industry.employers.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 116 | hex | `#070A14` | `<div className="min-h-dvh bg-[#070A14] text-white">` |
| 224 | hex | `#0d1124` | `className="rounded-md border border-white/15 bg-[#0d1124] px-3 py-2 text-sm text-white focus:border-gold/60 focus:outline-none"` |

### `src\routes\industry.salaries.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 124 | hex | `#070A14` | `<div className="min-h-dvh bg-[#070A14] text-white">` |
| 230 | hex | `#0d1124` | `className="rounded-md border border-white/15 bg-[#0d1124] px-3 py-2 text-sm text-white focus:border-gold/60 focus:outline-none"` |

### `src\routes\moments.$slug.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 128 | hex | `#0a0c10` | `className="block w-full overflow-hidden rounded-xl border border-white/10 bg-[#0a0c10]/40 backdrop-blur-md shadow-xl ring-1 ring-black/20"` |
| 157 | hex | `#0a0c10` | `className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0c10]/90 p-4"` |

### `src\routes\recruiters.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 74 | hex | `#F7F9FC` | `<main className="min-h-app bg-[#F7F9FC] pb-24 text-ink">` |
| 94 | hex | `#FFF7ED` | `<div className="mt-5">{result.state === "valid" ? <div className="rounded-2xl bg-[var(--arzon-teal-100)] p-4 text-sm text-[var(--arzon-teal-600)]"><CheckCircle2 className="inline h` |

### `src\routes\_authenticated\employer.console.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 53 | hex | `#0a0c10` | `<div className="tone-dark bg-[#0a0c10] min-h-screen flex items-center justify-center">` |
| 117 | hex | `#0a0c10` | `<div className="tone-dark bg-[#0a0c10] min-h-screen text-white font-grotesk">` |

### `src\components\candidate\CandidateAiScorecard.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 67 | hex | `#0B132B` | `<div className={`rounded-3xl border border-slate-800 bg-[#0B132B] text-slate-100 p-6 sm:p-8 shadow-2xl overflow-hidden ${className}`}>` |

### `src\components\candidate\RecruiterDossierModal.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 62 | hex | `#0F172A` | `className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-700 bg-[#0F172A] text-slate-100 p-6 sm:p-8 shadow-2xl space-y-6"` |

### `src\components\career\cards\FlagshipTrackCard.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 58 | rgb | `rgb(226 232 240)` | `stroke="rgb(226 232 240)"` |

### `src\components\career\CareerStarterKitLeadMagnet.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 63 | hex | `#EEF5FF` | `<div className="overflow-hidden rounded-2xl border border-blue-200 bg-[#EEF5FF]">` |

### `src\components\career\report\chapters\01Verdict.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 62 | hex | `#161F33` | `<div className="flex flex-wrap items-center gap-4 rounded-xl border border-white/10 bg-[#161F33] p-4 text-slate-200">` |

### `src\components\career\report\chapters\03PrimaryFit.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 100 | hex | `#161F33` | `<div className="mt-5 rounded-2xl border border-white/10 bg-[#161F33] p-4 text-white">` |

### `src\components\career\report\chapters\10Tools.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 69 | hex | `#161F33` | `className="rounded-2xl border border-white/10 bg-[#161F33] p-5 space-y-2 shadow-lg hover:border-blue-500/30 transition-all"` |

### `src\components\career\report\chapters\12DayInLife.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 19 | hex | `#2563EB` | `<span className="absolute -left-[31px] mt-1.5 h-3.5 w-3.5 rounded-full bg-[#2563EB] ring-4 ring-blue-500/20 shadow-md shadow-blue-500/30" />` |

### `src\components\career\report\EvidenceExplorerModal.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 55 | hex | `#0B1120` | `<DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto border-white/10 bg-[#0B1120] text-white">` |

### `src\components\career\report\RoleFitQuiz.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 92 | hex | `#0B1120` | `<DialogContent className="max-h-[85vh] max-w-xl overflow-y-auto border-white/10 bg-[#0B1120] text-white">` |

### `src\components\career\ShareResult.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 136 | hex | `#0A66C2` | `className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#0A66C2] px-3 py-2.5 text-meta font-bold text-white shadow-sm transition hover:brightness-110 motion-red` |

### `src\components\career\v2\RoleLadder.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 103 | hex | `#0b1117` | `<DialogContent className="max-w-2xl border-white/15 bg-[#0b1117] text-white">` |

### `src\components\career\v2\SevenDayPlan.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 61 | hex | `#06080d` | `className="tone-dark mt-8 overflow-hidden rounded-3xl border border-white/10 bg-[#06080d] p-5 text-white sm:p-8"` |

### `src\components\career-explorer\ContextualProgressTracker.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 29 | hex | `#0B152C` | `<div className="w-full max-w-4xl mx-auto py-3 px-4 rounded-2xl bg-[#0B152C]/80 border border-slate-800 text-slate-100 flex items-center justify-between overflow-x-auto gap-2 font-m` |

### `src\components\career-explorer\InteractiveCareerExplorer.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 65 | hex | `#070D1B` | `<section className="w-full py-12 sm:py-16 px-4 sm:px-6 bg-[#070D1B] border-t border-b border-slate-800/80 tone-dark text-slate-100 relative">` |

### `src\components\common\TaskLogo.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 27 | hex | `#0B1220` | `color: "#0B1220",` |

### `src\components\copilot\AiArtifactCanvas.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 58 | hex | `#0B132B` | `"flex h-full flex-col rounded-2xl border border-white/10 bg-[#0B132B]/90 backdrop-blur-md text-slate-200 overflow-hidden shadow-2xl",` |

### `src\components\copilot\AiFloatingCopilotWidget.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 20 | hex | `#070C18` | `<div className="mb-3 w-[calc(100vw-2rem)] max-w-sm sm:w-96 rounded-2xl border border-white/15 bg-[#070C18]/95 p-4 sm:p-5 text-slate-200 shadow-2xl backdrop-blur-md space-y-4 animat` |

### `src\components\courses\BrochureButton.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 48 | hex | `#0f172a` | `doc.setFillColor(15, 23, 42); // #0f172a` |

### `src\components\courses\CourseCard.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 59 | hex | `#0a0c10` | `className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-[#0a0c10]/80 px-2.5 py-1 shadow-sm ring-1 backdrop-blur ${theme.ring}`}` |

### `src\components\courses\EnquiryDrawer.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 32 | hex | `#0A0F1E` | `className="w-full border-l border-white/10 bg-[#0A0F1E] p-0 text-white sm:max-w-md"` |

### `src\components\courses\JDInsights.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 21 | hex | `#111A2E` | `<div key={label} className="rounded-2xl border border-white/10 bg-[#111A2E] p-5">` |

### `src\components\courses\sections\SolutionBlock.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 55 | hex | `#94A3B8` | `<p className="mt-4 text-body-sm" style={{ color: "#94A3B8" }}>` |

### `src\components\courses\SyllabusAccordion.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 68 | hex | `#0A0F1E` | `<p className="mt-1 text-xs text-[#0A0F1E]/80">{m.jdSkill}</p>` |

### `src\components\funnel\FunnelProgress.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 44 | hex | `#0B132B` | `className="border-b border-white/10 bg-[#0B132B]/80 backdrop-blur-xl text-white w-full"` |

### `src\components\home\ArzonCareerPathGrid.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 24 | hex | `#B9CCE6` | `className="group arzon-v2-card flex min-h-28 items-center justify-between gap-4 p-5 transition hover:-translate-y-0.5 hover:border-[#B9CCE6] hover:shadow-[var(--arzon-shadow-popove` |

### `src\components\home\InfiniteReviewMarquee.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 12 | hex | `#07152F` | `<section className="overflow-hidden bg-[#07152F] py-20 text-white sm:py-24" aria-labelledby="student-stories-heading">` |

### `src\components\landing\DemandUnlockStrip.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 130 | hex | `#7fb0d8` | `className="inline-flex items-center gap-1 text-caption font-semibold text-[#7fb0d8] hover:text-primary"` |

### `src\components\landing\InterviewRoadmap.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 43 | hex | `#0a1430` | `className="tone-dark bg-[#0a1430] py-16 sm:py-20 text-slate-50"` |

### `src\components\landing\LegalRegistrationsBlock.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 30 | hex | `#0B1325` | `className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#0B1325] text-slate-100 border-y border-slate-200/10"` |

### `src\components\landing\LiveIntakeBar.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 21 | hex | `#1B3F8B` | `<div className="fixed bottom-0 inset-x-0 z-40 bg-[#1B3F8B] text-slate-50 border-t border-amber-400/40 shadow-2xl py-2.5 px-4 sm:px-6">` |

### `src\components\landing\MobileHeroProofCard.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 25 | hex | `#0a0c10` | `<div className="absolute left-2.5 top-2.5 inline-flex items-center gap-1.5 rounded-full bg-[#0a0c10]/70 px-2.5 py-1 font-mono text-micro font-semibold uppercase tracking-[0.18em] t` |

### `src\components\landing\NationalMediaBlock.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 32 | hex | `#0a0c10` | `<figure className="overflow-hidden rounded-2xl border border-slate-200/10 bg-[#0a0c10] ring-1 ring-white/5">` |

### `src\components\landing\QuickLeadRegisterModal.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 70 | hex | `#0F172A` | `className="relative w-full max-w-md rounded-3xl border border-slate-700 bg-[#0F172A] text-slate-100 p-6 sm:p-8 shadow-2xl overflow-hidden"` |

### `src\components\landing\SectionHeader.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 44 | hex | `#8A6A14` | `<span aria-hidden className="block h-px w-10 bg-[#8A6A14]/50" />` |

### `src\components\landing\StickyMobileActionBar.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 52 | hex | `#0B1325` | `className="fixed bottom-0 inset-x-0 z-40 sm:hidden border-t border-slate-800 bg-[#0B1325]/95 backdrop-blur-md px-3 py-2.5 shadow-2xl transition-all animate-in slide-in-from-bottom ` |

### `src\components\prime60\Prime60TalentExchange.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 103 | hex | `#070C18` | `className="flex flex-col justify-between rounded-2xl border border-white/15 bg-[#070C18]/90 p-5 space-y-4 shadow-xl transition-all hover:border-amber-400/40 hover:scale-[1.01]"` |

### `src\components\Prime60WaitlistForm.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 237 | hex | `#1a1305` | `? "bg-yellow-400 text-[#1a1305] hover:brightness-110"` |

### `src\components\recruiters\AiCandidateProofDossier.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 43 | hex | `#070C18` | `"rounded-2xl border border-white/15 bg-[#070C18]/95 p-6 text-slate-200 shadow-2xl backdrop-blur-md space-y-6",` |

### `src\components\recruiters\CandidatePortfolio.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 50 | hex | `#F7F9FC` | `<main className="bg-[#F7F9FC] pb-24">` |

### `src\components\track\TrackModuleCard.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 98 | hex | `#0a0c10` | `<div className="mt-3 flex items-start gap-2 rounded-lg border border-white/10 bg-[#0a0c10]/40 backdrop-blur-md shadow-xl ring-1 ring-black/20 px-3 py-2 text-micro leading-relaxed s` |

### `src\components\transition\RouteLoader.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 129 | hex | `#0a0c10` | `className="pointer-events-none fixed bottom-2 left-2 z-[200] rounded-md border border-white/20 bg-[#0a0c10]/80 px-2 py-1 font-mono text-micro leading-tight text-white shadow-lg"` |

### `src\components\ui\alert-dialog.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 19 | hex | `#0a0c10` | `"fixed inset-0 z-50 bg-[#0a0c10]/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",` |

### `src\components\ui\dialog.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 24 | hex | `#0a0c10` | `"fixed inset-0 z-50 bg-[#0a0c10]/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",` |

### `src\components\ui\drawer.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 26 | hex | `#0a0c10` | `className={cn("fixed inset-0 z-50 bg-[#0a0c10]/80", className)}` |

### `src\components\ui\Pill.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 11 | hex | `#5a4500` | `"bg-[color:var(--accent-premium-soft)] text-[#5a4500] border border-[color:var(--accent-premium)]/30",` |

### `src\components\ui\sheet.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 24 | hex | `#0a0c10` | `"fixed inset-0 z-50 bg-[#0a0c10]/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",` |

### `src\components\ui\SurfaceCard.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 10 | hex | `#0E1730` | `dark: "bg-[#0E1730] text-white border border-white/10 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)]",` |

### `src\components\workshop\ArzonEventHero.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 37 | hex | `#0B1325` | `<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full tone-dark bg-[#0B1325] text-white font-sans text-xs font-semibold shadow-xs border border-stone-800">` |

### `src\components\workshop\EmployerLogoStrip.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 15 | hex | `#070E1B` | `<div className="w-full bg-[#070E1B] text-white py-4 sm:py-5 border-b border-white/10 select-none">` |

### `src\components\workshop\EmployerSkillsSection.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 58 | hex | `#0B1325` | `<div className="max-w-3xl mx-auto tone-dark bg-[#0B1325] text-white rounded-2xl p-5 sm:p-6 border border-stone-800 flex items-start gap-4 shadow-lg">` |

### `src\components\workshop\QuickRegisterModal.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 74 | hex | `#0B1325` | `<div className="bg-[#0B1325] tone-dark text-white p-4 sm:p-5 relative shrink-0">` |

### `src\components\workshop\WorkshopBrochureDownloadButton.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 98 | hex | `#1B3F8B` | `className={`inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-[var(--color-medical-navy)] hover:bg-[#1B3F8B] text-white font-mono text-xs sm:text-sm font-bo` |

### `src\data\careerPathEvidence.ts` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 9 | hex | `#100` | `* #12…#100 becomes data work, not code work. For now: TS module, but` |

### `src\data\courseExtras.ts` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 28 | hex | `#1a1300` | `augmented: "border-amber-500/60 bg-amber-500 text-[#1a1300]",` |

### `src\features\admin\components\admin\ThumbnailCropDialog.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 94 | hex | `#0a0c10` | `<div className="relative h-[360px] w-full overflow-hidden rounded-lg bg-[#0a0c10]">` |

### `src\lib\razorpayCheckout.ts` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 71 | hex | `#3B82F6` | `theme: { color: args.themeColor ?? "#3B82F6" },` |

### `src\lib\seo\rootHead.ts` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 32 | hex | `#0A0F1E` | `{ name: "theme-color", content: "#0A0F1E" },` |

### `src\routes\admin.analytics-alerts.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 167 | hex | `#0a0c10` | `<pre className="mt-2 overflow-x-auto rounded bg-[#0a0c10]/40 backdrop-blur-md shadow-sm px-2 py-1.5 text-micro text-foreground">` |

### `src\routes\admin.content-qa-scan.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 254 | hex | `#0a0c10` | `<pre className="mt-1.5 overflow-x-auto whitespace-pre-wrap break-words rounded bg-[#0a0c10]/40 backdrop-blur-md shadow-sm px-2.5 py-1.5 font-mono text-micro text-foreground">` |

### `src\routes\admin.moments.$id.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 355 | hex | `#0a0c10` | `className="overflow-hidden rounded-lg border border-border bg-[#0a0c10]/40 backdrop-blur-md shadow-sm"` |

### `src\routes\admin.moments.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 105 | hex | `#0a0c10` | `<div className="aspect-[4/3] w-full bg-[#0a0c10]/40 backdrop-blur-md shadow-sm">` |

### `src\routes\admin.seo.settings.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 229 | hex | `#0a0c10` | `className="min-w-[280px] flex-1 rounded-full border border-border bg-[#0a0c10]/40 px-3 py-2 text-sm text-foreground"` |

### `src\routes\admin.thumbnails.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 233 | hex | `#0a0c10` | `<div className="relative aspect-[16/9] w-full bg-[#0a0c10]/40">` |

### `src\routes\build.$slug.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 387 | hex | `#0a0c10` | `<div className="grid h-8 w-8 flex-shrink-0 place-items-center rounded bg-[#0a0c10]/5 text-micro font-bold text-black/60">` |

### `src\routes\copilot.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 65 | hex | `#050A15` | `<div className="flex min-h-dvh flex-col bg-[#050A15] text-slate-300">` |

### `src\routes\dev.cards.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 128 | hex | `#0B1220` | `? "tone-dark min-h-dvh bg-[#0B1220] px-4 py-10 sm:px-8"` |

### `src\routes\legal.privacy.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 26 | hex | `#0A0F1E` | `<main className="tone-dark min-h-app bg-[#0A0F1E] text-white">` |

### `src\routes\legal.terms.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 26 | hex | `#0A0F1E` | `<main className="tone-dark min-h-app bg-[#0A0F1E] text-white">` |

### `src\routes\r.artifact.$token.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 78 | hex | `#F7F9FC` | `<main className="min-h-app bg-[#F7F9FC] pb-24 text-ink">` |

### `src\routes\refund.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 47 | hex | `#0A0F1E` | `<main className="tone-dark min-h-app bg-[#0A0F1E] text-white">` |

