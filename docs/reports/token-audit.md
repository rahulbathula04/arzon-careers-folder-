# Token audit report

_Generated 2026-07-27T02:57:26.018Z_

- **Total raw palette literals:** 1624
- **Files affected:** 184
- **Scope:** `src/**` (excluding `styles.css`, `data/trackTheme`, generated files, and lines annotated `@allow-raw-palette`).

## How to fix

Replace hex/rgb literals with a semantic token from `src/styles.css` (`--brand`, `--ink`, `--surface-1`, `--flag-in-*`, etc.) or a track-theme accessor from `@/data/trackTheme`. When a raw value is genuinely required (e.g. the tricolour flag glyph), add a trailing comment `/* @allow-raw-palette <reason> */` on the same line.

## Findings

### `src\styles.css` - 607

| Line | Kind | Value | Context |
|---:|---|---|---|
| 14 | hex | `#000000` | `--color-pitch-black: #000000;` |
| 15 | hex | `#05070e` | `--color-surface-dark: #05070e;` |
| 16 | hex | `#38bdf8` | `--color-accent-sky: #38bdf8;` |
| 17 | rgba | `rgba(56, 189, 248, 0.25)` | `--color-accent-glow: rgba(56, 189, 248, 0.25);` |
| 18 | rgba | `rgba(255, 255, 255, 0.15)` | `--color-border-subtle: rgba(255, 255, 255, 0.15);` |
| 25 | hex | `#000000` | `0 0 0 2px #000000,` |
| 26 | hex | `#38bdf8` | `0 0 0 4px #38bdf8;` |
| 39 | hex | `#ffffff` | `color: #ffffff;` |
| 40 | hex | `#0d1322` | `background-color: #0d1322;` |
| 41 | hex | `#38bdf8` | `caret-color: #38bdf8;` |
| 46 | hex | `#94a3b8` | `color: #94a3b8;` |
| 63 | hex | `#ffffff` | `-webkit-text-fill-color: #ffffff !important;` |
| 64 | hex | `#0d1322` | `-webkit-box-shadow: 0 0 0px 1000px #0d1322 inset !important;` |
| 65 | hex | `#0d1322` | `box-shadow: 0 0 0px 1000px #0d1322 inset !important;` |
| 67 | hex | `#ffffff` | `color: #ffffff !important;` |
| 74 | hex | `#0f172a` | `color: #0f172a;` |
| 75 | hex | `#ffffff` | `background-color: #ffffff;` |
| 76 | hex | `#2563eb` | `caret-color: #2563eb;` |
| 81 | hex | `#64748b` | `color: #64748b;` |
| 96 | hex | `#0f172a` | `-webkit-text-fill-color: #0f172a !important;` |
| 97 | hex | `#ffffff` | `-webkit-box-shadow: 0 0 0px 1000px #ffffff inset !important;` |
| 98 | hex | `#ffffff` | `box-shadow: 0 0 0px 1000px #ffffff inset !important;` |
| 99 | hex | `#0f172a` | `color: #0f172a !important;` |
| 104 | hex | `#0284c7` | `background-color: #0284c7 !important;` |
| 105 | hex | `#ffffff` | `color: #ffffff !important;` |
| 110 | rgba | `rgba(255, 255, 255, 0.72)` | `color: rgba(255, 255, 255, 0.72) !important;` |
| 115 | hex | `#94a3b8` | `color: #94a3b8 !important;` |
| 123 | hex | `#e4ebfb` | `background: radial-gradient(ellipse 1200px 800px at 50% -100px, #e4ebfb 0%, #ffffff 75%);` |
| 123 | hex | `#ffffff` | `background: radial-gradient(ellipse 1200px 800px at 50% -100px, #e4ebfb 0%, #ffffff 75%);` |
| 124 | hex | `#151c2e` | `color: #151c2e;` |
| 128 | hex | `#ffffff` | `background-color: #ffffff;` |
| 129 | hex | `#e2e8f0` | `border: 1px solid #e2e8f0;` |
| 132 | rgba | `rgba(21, 28, 46, 0.08)` | `0 10px 30px -10px rgba(21, 28, 46, 0.08),` |
| 133 | rgba | `rgba(21, 28, 46, 0.04)` | `0 2px 6px -2px rgba(21, 28, 46, 0.04);` |
| 137 | hex | `#f2f4f9` | `background-color: #f2f4f9;` |
| 139 | hex | `#e2e8f0` | `border: 1px solid #e2e8f0;` |
| 143 | hex | `#fdf6e2` | `background-color: #fdf6e2;` |
| 144 | hex | `#7c4a03` | `color: #7c4a03;` |
| 145 | hex | `#f7e4b2` | `border: 1px solid #f7e4b2;` |
| 149 | hex | `#f0a339` | `background: linear-gradient(90deg, #f0a339 0%, #c2410c 100%);` |
| 149 | hex | `#c2410c` | `background: linear-gradient(90deg, #f0a339 0%, #c2410c 100%);` |
| 153 | hex | `#1d4ed8` | `background-color: #1d4ed8;` |
| 154 | hex | `#ffffff` | `color: #ffffff;` |
| 159 | hex | `#1e40af` | `background-color: #1e40af;` |
| 173 | rgba | `rgba(255, 255, 255, 0.035)` | `linear-gradient(180deg, rgba(255, 255, 255, 0.035) 0%, rgba(255, 255, 255, 0.01) 100%),` |
| 173 | rgba | `rgba(255, 255, 255, 0.01)` | `linear-gradient(180deg, rgba(255, 255, 255, 0.035) 0%, rgba(255, 255, 255, 0.01) 100%),` |
| 174 | rgba | `rgba(10, 14, 25, 0.55)` | `rgba(10, 14, 25, 0.55);` |
| 175 | rgba | `rgba(255, 255, 255, 0.08)` | `border: 1px solid rgba(255, 255, 255, 0.08);` |
| 178 | rgba | `rgba(255, 255, 255, 0.05)` | `inset 0 1px 0 0 rgba(255, 255, 255, 0.05),` |
| 179 | rgba | `rgba(0, 0, 0, 0.35)` | `0 1px 0 0 rgba(0, 0, 0, 0.35),` |
| 180 | rgba | `rgba(0, 0, 0, 0.55)` | `0 20px 60px -30px rgba(0, 0, 0, 0.55);` |
| 185 | rgba | `rgba(255, 255, 255, 0.14)` | `border-color: rgba(255, 255, 255, 0.14);` |
| 187 | rgba | `rgba(255, 255, 255, 0.07)` | `inset 0 1px 0 0 rgba(255, 255, 255, 0.07),` |
| 188 | rgba | `rgba(0, 0, 0, 0.4)` | `0 1px 0 0 rgba(0, 0, 0, 0.4),` |
| 189 | rgba | `rgba(0, 0, 0, 0.6)` | `0 24px 70px -30px rgba(0, 0, 0, 0.6);` |
| 197 | rgba | `rgba(255, 255, 255, 0.05)` | `background: linear-gradient(180deg, rgba(255, 255, 255, 0.05), transparent 30%);` |
| 209 | rgba | `rgba(255, 255, 255, 0.1)` | `background: rgba(255, 255, 255, 0.1);` |
| 225 | rgba | `rgba(255, 255, 255, 0.85)` | `color: rgba(255, 255, 255, 0.85);` |
| 226 | rgba | `rgba(255, 255, 255, 0.04)` | `background: rgba(255, 255, 255, 0.04);` |
| 227 | rgba | `rgba(255, 255, 255, 0.12)` | `border: 1px solid rgba(255, 255, 255, 0.12);` |
| 237 | rgba | `rgba(255, 255, 255, 0.06)` | `border: 1px solid rgba(255, 255, 255, 0.06);` |
| 238 | rgba | `rgba(255, 255, 255, 0.015)` | `background: rgba(255, 255, 255, 0.015);` |
| 239 | rgba | `rgba(255, 255, 255, 0.6)` | `color: rgba(255, 255, 255, 0.6);` |
| 247 | rgba | `rgba(255, 255, 255, 0.9)` | `color: rgba(255, 255, 255, 0.9);` |
| 248 | rgba | `rgba(255, 255, 255, 0.14)` | `border-color: rgba(255, 255, 255, 0.14);` |
| 253 | hex | `#5eead4` | `background: color-mix(in oklab, var(--rail-accent, #5eead4) 8%, transparent);` |
| 254 | hex | `#5eead4` | `border-color: color-mix(in oklab, var(--rail-accent, #5eead4) 40%, transparent);` |
| 256 | hex | `#5eead4` | `0 0 0 1px color-mix(in oklab, var(--rail-accent, #5eead4) 25%, transparent),` |
| 257 | hex | `#5eead4` | `0 8px 24px -12px color-mix(in oklab, var(--rail-accent, #5eead4) 60%, transparent);` |
| 260 | rgba | `rgba(255, 255, 255, 0.75)` | `color: rgba(255, 255, 255, 0.75);` |
| 261 | rgba | `rgba(255, 255, 255, 0.1)` | `border-color: rgba(255, 255, 255, 0.1);` |
| 262 | rgba | `rgba(255, 255, 255, 0.025)` | `background: rgba(255, 255, 255, 0.025);` |
| 289 | hex | `#e5e7eb` | `border-color: #e5e7eb !important;` |
| 300 | rgba | `rgba(255, 255, 255, 0.03)` | `background: rgba(255, 255, 255, 0.03);` |
| 303 | rgba | `rgba(255, 255, 255, 0.08)` | `border: 1px solid rgba(255, 255, 255, 0.08);` |
| 304 | rgba | `rgba(0, 0, 0, 0.1)` | `box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);` |
| 308 | rgba | `rgba(255, 255, 255, 0.05)` | `background: linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%);` |
| 308 | rgba | `rgba(255, 255, 255, 0.01)` | `background: linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%);` |
| 311 | rgba | `rgba(255, 255, 255, 0.1)` | `border: 1px solid rgba(255, 255, 255, 0.1);` |
| 313 | rgba | `rgba(255, 255, 255, 0.05)` | `inset 0 1px 0 0 rgba(255, 255, 255, 0.05),` |
| 314 | rgba | `rgba(0, 0, 0, 0.3)` | `0 8px 32px 0 rgba(0, 0, 0, 0.3);` |
| 320 | rgba | `rgba(255, 255, 255, 0.07)` | `background: rgba(255, 255, 255, 0.07);` |
| 321 | rgba | `rgba(255, 255, 255, 0.2)` | `border-color: rgba(255, 255, 255, 0.2);` |
| 323 | rgba | `rgba(125, 211, 252, 0.15)` | `0 0 20px rgba(125, 211, 252, 0.15),` |
| 324 | rgba | `rgba(255, 255, 255, 0.1)` | `inset 0 1px 0 0 rgba(255, 255, 255, 0.1);` |
| 382 | hex | `#7fb0d8` | `/* Light-blue eyebrow used on dark navy surfaces (was #7fb0d8) */` |
| 383 | hex | `#7fb0d8` | `--color-eyebrow: #7fb0d8;` |
| 384 | hex | `#a9c9e6` | `--color-eyebrow-strong: #a9c9e6;` |
| 388 | hex | `#38bdf8` | `--color-accent-glow: #38bdf8;` |
| 392 | hex | `#03060d` | `--color-surface-dark: #03060d;` |
| 393 | hex | `#070b17` | `--color-surface-raised: #070b17;` |
| 394 | hex | `#050811` | `--color-surface-dim: #050811;` |
| 395 | hex | `#0a0f1e` | `--color-surface-ink: #0a0f1e;` |
| 396 | hex | `#06080d` | `--color-surface-abyss: #06080d;` |
| 397 | hex | `#1a1300` | `--color-gold-ink: #1a1300;` |
| 398 | hex | `#7fb0d8` | `--color-navy-sky: #7fb0d8;` |
| 399 | hex | `#3b6fa0` | `--color-nav-blue: #3b6fa0;` |
| 400 | hex | `#8ec5ff` | `--color-focus-accent: #8ec5ff;` |
| 401 | hex | `#dbe6f6` | `--color-edge: #dbe6f6;` |
| 411 | hex | `#0e1730` | `--color-navy-card: #0e1730;` |
| 418 | hex | `#dceaff` | `--color-cta-blue-wash: #dceaff;` |
| 422 | hex | `#0f1b3d` | `so the Footer / Nav don't inline `from-slate-900 via-[#0f1b3d]` etc. */` |
| 441 | hex | `#0f1b3d` | `Locked ramp: #0f1b3d deep navy → #1e3a5f mid navy → #3b6fa0 mid blue` |
| 441 | hex | `#1e3a5f` | `Locked ramp: #0f1b3d deep navy → #1e3a5f mid navy → #3b6fa0 mid blue` |
| 441 | hex | `#3b6fa0` | `Locked ramp: #0f1b3d deep navy → #1e3a5f mid navy → #3b6fa0 mid blue` |
| 442 | hex | `#e8edf3` | `→ #e8edf3 pale ice. Historical --teal-* / --navy-* / --mint-* tokens` |
| 445 | hex | `#0f1b3d` | `--navy: #0f1b3d; /* deep navy - hero shells */` |
| 446 | hex | `#1e3a5f` | `--navy-elevated: #1e3a5f; /* mid navy - cards */` |
| 453 | hex | `#5b8fc5` | `--teal: #5b8fc5; /* light mid-blue (chips, glows) */` |
| 454 | hex | `#2f5f8f` | `--teal-deep: #2f5f8f; /* primary CTA blue, AA on paper (5.65:1 on ice) */` |
| 455 | hex | `#1e3a5f` | `--teal-ink: #1e3a5f; /* eyebrow / link ink on light */` |
| 456 | hex | `#e8edf3` | `--teal-soft: #e8edf3; /* pale ice wash */` |
| 460 | hex | `#0f1b3d` | `--color-career-navy: #0f1b3d;` |
| 461 | hex | `#1e3a5f` | `--color-career-mid: #1e3a5f;` |
| 462 | hex | `#2f5f8f` | `--color-career-blue: #2f5f8f;` |
| 463 | hex | `#e8edf3` | `--color-career-ice: #e8edf3;` |
| 466 | hex | `#ffffff` | `--surface-1: #ffffff; /* paper card */` |
| 503 | hex | `#ffffff` | `--cta-fg: #ffffff;` |
| 506 | hex | `#0056d2` | `--cta-blue: #0056d2;` |
| 507 | hex | `#00419e` | `--cta-blue-hover: #00419e;` |
| 508 | hex | `#eaf2ff` | `--cta-blue-soft: #eaf2ff;` |
| 642 | hex | `#ff9933` | `--flag-in-saffron: #ff9933;` |
| 643 | hex | `#ffffff` | `--flag-in-white: #ffffff;` |
| 644 | hex | `#138808` | `--flag-in-green: #138808;` |
| 799 | hex | `#ffffff` | `--tone-blue-surface: #ffffff;` |
| 805 | hex | `#ffffff` | `--tone-orange-surface: #ffffff;` |
| 812 | hex | `#ffffff` | `--tone-navy-ink: #ffffff;` |
| 817 | hex | `#ffffff` | `--tone-emerald-surface: #ffffff;` |
| 823 | hex | `#ffffff` | `--tone-violet-surface: #ffffff;` |
| 830 | hex | `#ffffff` | `--tone-slate-ink: #ffffff;` |
| 841 | hex | `#e8edf3` | `--ink: #e8edf3; /* primary text on navy */` |
| 842 | hex | `#b8c4d6` | `--ink-soft: #b8c4d6;` |
| 843 | hex | `#8697b0` | `--ink-mute: #8697b0;` |
| 844 | hex | `#0a1229` | `--paper: #0a1229;` |
| 846 | hex | `#0f1b3d` | `--surface-1: #0f1b3d; /* card */` |
| 847 | hex | `#142549` | `--surface-2: #142549; /* tinted card */` |
| 848 | hex | `#1e3a5f` | `--surface-3: #1e3a5f; /* elevated */` |
| 850 | hex | `#0a1229` | `--background: #0a1229;` |
| 852 | hex | `#0f1b3d` | `--card: #0f1b3d;` |
| 854 | hex | `#0f1b3d` | `--popover: #0f1b3d;` |
| 857 | hex | `#5b8fc5` | `--primary: #5b8fc5;` |
| 858 | hex | `#0a1229` | `--primary-foreground: #0a1229;` |
| 859 | hex | `#3b6fa0` | `--primary-deep: #3b6fa0;` |
| 860 | hex | `#7fb0e0` | `--primary-glow: #7fb0e0;` |
| 862 | hex | `#142549` | `--secondary: #142549;` |
| 864 | hex | `#142549` | `--muted: #142549;` |
| 866 | hex | `#5b8fc5` | `--accent: #5b8fc5;` |
| 867 | hex | `#0a1229` | `--accent-foreground: #0a1229;` |
| 869 | rgba | `rgba(232, 237, 243, 0.1)` | `--border: rgba(232, 237, 243, 0.1);` |
| 870 | rgba | `rgba(232, 237, 243, 0.08)` | `--input: rgba(232, 237, 243, 0.08);` |
| 871 | hex | `#5b8fc5` | `--ring: #5b8fc5;` |
| 874 | hex | `#5b8fc5` | `--cta-bg: #5b8fc5;` |
| 875 | hex | `#0a1229` | `--cta-fg: #0a1229;` |
| 876 | hex | `#7fb0e0` | `--cta-hover: #7fb0e0;` |
| 877 | hex | `#3b6fa0` | `--cta-press: #3b6fa0;` |
| 878 | hex | `#7fb0e0` | `--focus-ring: #7fb0e0;` |
| 880 | hex | `#0f1b3d` | `--sidebar: #0f1b3d;` |
| 882 | hex | `#5b8fc5` | `--sidebar-primary: #5b8fc5;` |
| 883 | hex | `#0a1229` | `--sidebar-primary-foreground: #0a1229;` |
| 884 | hex | `#1e3a5f` | `--sidebar-accent: #1e3a5f;` |
| 886 | rgba | `rgba(232, 237, 243, 0.1)` | `--sidebar-border: rgba(232, 237, 243, 0.1);` |
| 887 | hex | `#5b8fc5` | `--sidebar-ring: #5b8fc5;` |
| 889 | hex | `#ffffff` | `--text-strong: #ffffff;` |
| 894 | hex | `#0a1229` | `background-color: #0a1229;` |
| 898 | rgba | `rgba(91, 143, 197, 0.18)` | `radial-gradient(120% 80% at 50% -10%, rgba(91, 143, 197, 0.18), transparent 55%),` |
| 901 | rgba | `rgba(30, 58, 95, 0.85)` | `rgba(30, 58, 95, 0.85),` |
| 902 | rgba | `rgba(15, 27, 61, 0.65)` | `rgba(15, 27, 61, 0.65) 45%,` |
| 903 | hex | `#0a1229` | `#0a1229 78%` |
| 915 | hex | `#ffffff` | `background-color: #ffffff;` |
| 920 | hex | `#ffffff` | `background-color: #ffffff;` |
| 946 | hex | `#ffffff` | `#ffffff 78%` |
| 985 | hex | `#000` | `Large bold headings use pure black (#000), not navy. Navy is reserved` |
| 1072 | hex | `#ffffff` | `background-color: #ffffff;` |
| 1086 | hex | `#070b17` | `background-color: #070b17;` |
| 1087 | hex | `#ffffff` | `color: #ffffff;` |
| 1088 | hex | `#ffffff` | `--ink: #ffffff;` |
| 1089 | rgba | `rgba(255, 255, 255, 0.86)` | `--ink-soft: rgba(255, 255, 255, 0.86);` |
| 1090 | rgba | `rgba(255, 255, 255, 0.68)` | `--ink-mute: rgba(255, 255, 255, 0.68);` |
| 1091 | hex | `#ffffff` | `--text-strong: #ffffff;` |
| 1092 | rgba | `rgba(255, 255, 255, 0.1)` | `--border: rgba(255, 255, 255, 0.1);` |
| 1100 | hex | `#070b17` | `background-color: #070b17;` |
| 1156 | rgba | `rgba(20, 184, 166, 0.45)` | `0 0 0 0 rgba(20, 184, 166, 0.45),` |
| 1157 | rgba | `rgba(20, 184, 166, 0.45)` | `0 18px 48px -16px rgba(20, 184, 166, 0.45);` |
| 1161 | rgba | `rgba(20, 184, 166, 0)` | `0 0 0 14px rgba(20, 184, 166, 0),` |
| 1162 | rgba | `rgba(20, 184, 166, 0.65)` | `0 18px 48px -16px rgba(20, 184, 166, 0.65);` |
| 1248 | rgba | `rgba(15, 27, 61, 0.1)` | `-2px 6px 0 0 rgba(15, 27, 61, 0.1),` |
| 1249 | rgba | `rgba(20, 184, 166, 0.45)` | `0 18px 40px -18px rgba(20, 184, 166, 0.45);` |
| 1254 | rgba | `rgba(15, 27, 61, 0.15)` | `0 1px 0 0 rgba(15, 27, 61, 0.15),` |
| 1255 | rgba | `rgba(20, 184, 166, 0.4)` | `0 6px 14px -10px rgba(20, 184, 166, 0.4);` |
| 1261 | hex | `#ffffff` | `0 0 0 2px #ffffff,` |
| 1263 | rgba | `rgba(15, 27, 61, 0.1)` | `-2px 6px 0 0 rgba(15, 27, 61, 0.1);` |
| 1314 | rgba | `rgba(20, 184, 166, 0.18)` | `-6px 14px 0 -8px rgba(20, 184, 166, 0.18),` |
| 1315 | rgba | `rgba(15, 27, 61, 0.25)` | `0 28px 60px -28px rgba(15, 27, 61, 0.25),` |
| 1316 | rgba | `rgba(255, 255, 255, 0.6)` | `0 2px 0 0 rgba(255, 255, 255, 0.6) inset;` |
| 1325 | hex | `#ffffff` | `0 0 0 2px #ffffff,` |
| 1327 | rgba | `rgba(20, 184, 166, 0.18)` | `-6px 14px 0 -8px rgba(20, 184, 166, 0.18);` |
| 1494 | rgba | `rgba(255, 255, 255, 0.82)` | `background: linear-gradient(180deg, rgba(255, 255, 255, 0.82), rgba(255, 255, 255, 0.62));` |
| 1494 | rgba | `rgba(255, 255, 255, 0.62)` | `background: linear-gradient(180deg, rgba(255, 255, 255, 0.82), rgba(255, 255, 255, 0.62));` |
| 1497 | rgba | `rgba(15, 27, 61, 0.08)` | `border: 1px solid rgba(15, 27, 61, 0.08);` |
| 1501 | rgba | `rgba(255, 255, 255, 0.92)` | `background: linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.82));` |
| 1501 | rgba | `rgba(255, 255, 255, 0.82)` | `background: linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.82));` |
| 1504 | rgba | `rgba(15, 27, 61, 0.1)` | `border-bottom: 1px solid rgba(15, 27, 61, 0.1);` |
| 1509 | hex | `#ffffff` | `background: #ffffff;` |
| 1517 | rgba | `rgba(255, 255, 255, 0.78)` | `background-color: rgba(255, 255, 255, 0.78);` |
| 1529 | rgba | `rgba(255, 255, 255, 0.92)` | `background-color: rgba(255, 255, 255, 0.92);` |
| 1530 | rgba | `rgba(15, 27, 61, 0.08)` | `border-bottom-color: rgba(15, 27, 61, 0.08);` |
| 1532 | rgba | `rgba(15, 27, 61, 0.18)` | `0 8px 24px -16px rgba(15, 27, 61, 0.18),` |
| 1533 | rgba | `rgba(255, 255, 255, 0.6)` | `inset 0 1px 0 rgba(255, 255, 255, 0.6);` |
| 1537 | hex | `#ffffff` | `background: #ffffff;` |
| 1540 | hex | `#ffffff` | `background: #ffffff;` |
| 1629 | rgba | `rgba(15, 27, 61, 0.1)` | `border: 1px solid rgba(15, 27, 61, 0.1);` |
| 1641 | hex | `#0f1b3d` | `#0f1b3d 0%,` |
| 1642 | hex | `#1e3a5f` | `#1e3a5f 30%,` |
| 1643 | hex | `#6fa8e8` | `#6fa8e8 50%,` |
| 1644 | hex | `#1e3a5f` | `#1e3a5f 70%,` |
| 1645 | hex | `#0f1b3d` | `#0f1b3d 100%` |
| 1673 | hex | `#ffffff` | `background: #ffffff;` |
| 1675 | hex | `#e2e8f0` | `border: 1px solid #e2e8f0;` |
| 1685 | hex | `#f4f7fb` | `background: #f4f7fb;` |
| 1687 | hex | `#e2e8f0` | `border: 1px solid #e2e8f0;` |
| 1691 | hex | `#f8fafc` | `color: #f8fafc;` |
| 1692 | rgba | `rgba(148, 163, 184, 0.14)` | `border: 1px solid rgba(148, 163, 184, 0.14);` |
| 1696 | rgba | `rgba(148, 163, 184, 0.14)` | `border-color: rgba(148, 163, 184, 0.14);` |
| 1760 | hex | `#ffffff` | `color: #ffffff;` |
| 1764 | rgba | `rgba(255, 255, 255, 0.88)` | `color: rgba(255, 255, 255, 0.88);` |
| 1767 | hex | `#bfd7f0` | `color: #bfd7f0; /* teal-300, readable on navy */` |
| 1771 | rgba | `rgba(255, 255, 255, 0.88)` | `color: rgba(255, 255, 255, 0.88);` |
| 1774 | hex | `#ffffff` | `color: #ffffff;` |
| 1788 | hex | `#ffffff` | `color: #ffffff;` |
| 1807 | hex | `#e6c97a` | `color: #e6c97a;` |
| 1808 | hex | `#e6c97a` | `-webkit-text-fill-color: #e6c97a;` |
| 1840 | hex | `#ffffff` | `--card: #ffffff;` |
| 1841 | hex | `#ffffff` | `--popover: #ffffff;` |
| 1842 | hex | `#ffffff` | `--background: #ffffff;` |
| 1846 | hex | `#ffffff` | `--primary-foreground: #ffffff;` |
| 1851 | hex | `#0a0e1a` | `color: #0a0e1a !important;` |
| 1852 | hex | `#0a0e1a` | `-webkit-text-fill-color: #0a0e1a !important;` |
| 1880 | hex | `#FFFFFF` | `AA on #FFFFFF: contrast ratio 5.4:1. */` |
| 1881 | hex | `#8a6a14` | `color: #8a6a14 !important;` |
| 1882 | hex | `#8a6a14` | `-webkit-text-fill-color: #8a6a14 !important;` |
| 1925 | rgba | `rgba(255, 255, 255, 0.55)` | `color: rgba(255, 255, 255, 0.55);` |
| 1932 | rgba | `rgba(15, 27, 61, 0.08)` | `border: 1px solid rgba(15, 27, 61, 0.08);` |
| 1933 | rgba | `rgba(255, 255, 255, 0.78)` | `background: rgba(255, 255, 255, 0.78);` |
| 1952 | rgba | `rgba(15, 27, 61, 0.12)` | `border: 1px solid rgba(15, 27, 61, 0.12);` |
| 1953 | rgba | `rgba(255, 255, 255, 0.85)` | `background: rgba(255, 255, 255, 0.85);` |
| 1969 | rgba | `rgba(15, 27, 61, 0.14)` | `border: 1px solid rgba(15, 27, 61, 0.14);` |
| 1970 | rgba | `rgba(255, 255, 255, 0.92)` | `background: rgba(255, 255, 255, 0.92);` |
| 1979 | rgba | `rgba(15, 27, 61, 0.04)` | `box-shadow: 0 1px 2px rgba(15, 27, 61, 0.04);` |
| 1991 | rgba | `rgba(255, 255, 255, 0.06)` | `background: rgba(255, 255, 255, 0.06);` |
| 1992 | rgba | `rgba(255, 255, 255, 0.18)` | `border-color: rgba(255, 255, 255, 0.18);` |
| 1993 | rgba | `rgba(255, 255, 255, 0.9)` | `color: rgba(255, 255, 255, 0.9);` |
| 2001 | hex | `#000` | `#000 16px,` |
| 2002 | hex | `#000` | `#000 calc(100% - 16px),` |
| 2008 | hex | `#000` | `#000 16px,` |
| 2009 | hex | `#000` | `#000 calc(100% - 16px),` |
| 2050 | hex | `#ffffff` | `0 0 0 2px #ffffff,` |
| 2055 | hex | `#ffffff` | `color: #ffffff;` |
| 2058 | rgba | `rgba(255, 255, 255, 0.18)` | `inset 0 1px 0 rgba(255, 255, 255, 0.18),` |
| 2059 | rgba | `rgba(0, 0, 0, 0.15)` | `inset 0 -1px 0 rgba(0, 0, 0, 0.15),` |
| 2060 | rgba | `rgba(15, 27, 61, 0.2)` | `0 1px 2px rgba(15, 27, 61, 0.2),` |
| 2061 | rgba | `rgba(0, 86, 210, 0.45)` | `0 12px 28px -12px rgba(0, 86, 210, 0.45);` |
| 2066 | rgba | `rgba(255, 255, 255, 0.22)` | `inset 0 1px 0 rgba(255, 255, 255, 0.22),` |
| 2067 | rgba | `rgba(0, 0, 0, 0.18)` | `inset 0 -1px 0 rgba(0, 0, 0, 0.18),` |
| 2068 | rgba | `rgba(15, 27, 61, 0.18)` | `0 2px 4px rgba(15, 27, 61, 0.18),` |
| 2069 | rgba | `rgba(0, 86, 210, 0.55)` | `0 18px 36px -14px rgba(0, 86, 210, 0.55);` |
| 2072 | hex | `#003b8f` | `background: #003b8f;` |
| 2074 | rgba | `rgba(0, 0, 0, 0.25)` | `inset 0 1px 2px rgba(0, 0, 0, 0.25),` |
| 2075 | rgba | `rgba(255, 255, 255, 0.05)` | `inset 0 -1px 0 rgba(255, 255, 255, 0.05),` |
| 2076 | rgba | `rgba(15, 27, 61, 0.3)` | `0 1px 2px rgba(15, 27, 61, 0.3);` |
| 2081 | hex | `#ffffff` | `background: #ffffff;` |
| 2086 | rgba | `rgba(15, 27, 61, 0.06)` | `0 1px 2px rgba(15, 27, 61, 0.06),` |
| 2087 | rgba | `rgba(255, 255, 255, 0.6)` | `inset 0 1px 0 rgba(255, 255, 255, 0.6);` |
| 2094 | rgba | `rgba(244, 247, 251, 0.95)` | `background: rgba(244, 247, 251, 0.95);` |
| 2100 | rgba | `rgba(94, 234, 212, 0.1)` | `background: rgba(94, 234, 212, 0.1);` |
| 2101 | hex | `#ffffff` | `color: #ffffff;` |
| 2102 | rgba | `rgba(94, 234, 212, 0.55)` | `border: 1px solid rgba(94, 234, 212, 0.55);` |
| 2105 | rgba | `rgba(0, 0, 0, 0.18)` | `0 1px 2px rgba(0, 0, 0, 0.18),` |
| 2106 | rgba | `rgba(255, 255, 255, 0.06)` | `inset 0 1px 0 rgba(255, 255, 255, 0.06);` |
| 2109 | rgba | `rgba(94, 234, 212, 0.18)` | `background: rgba(94, 234, 212, 0.18);` |
| 2110 | rgba | `rgba(94, 234, 212, 0.85)` | `border-color: rgba(94, 234, 212, 0.85);` |
| 2111 | hex | `#ffffff` | `color: #ffffff;` |
| 2116 | hex | `#ffffff` | `color: #ffffff;` |
| 2118 | rgba | `rgba(255, 255, 255, 0.4)` | `inset 0 1px 0 rgba(255, 255, 255, 0.4),` |
| 2119 | rgba | `rgba(0, 0, 0, 0.12)` | `inset 0 -1px 0 rgba(0, 0, 0, 0.12),` |
| 2120 | rgba | `rgba(0, 45, 115, 0.24)` | `0 1px 2px rgba(0, 45, 115, 0.24),` |
| 2121 | rgba | `rgba(0, 86, 210, 0.55)` | `0 14px 34px -12px rgba(0, 86, 210, 0.55);` |
| 2125 | hex | `#ffffff` | `color: #ffffff;` |
| 2127 | rgba | `rgba(255, 255, 255, 0.5)` | `inset 0 1px 0 rgba(255, 255, 255, 0.5),` |
| 2128 | rgba | `rgba(0, 0, 0, 0.15)` | `inset 0 -1px 0 rgba(0, 0, 0, 0.15),` |
| 2129 | rgba | `rgba(0, 45, 115, 0.24)` | `0 2px 4px rgba(0, 45, 115, 0.24),` |
| 2130 | rgba | `rgba(0, 86, 210, 0.62)` | `0 20px 40px -12px rgba(0, 86, 210, 0.62);` |
| 2133 | hex | `#003b8f` | `background: #003b8f;` |
| 2135 | rgba | `rgba(0, 0, 0, 0.2)` | `inset 0 1px 2px rgba(0, 0, 0, 0.2),` |
| 2136 | rgba | `rgba(120, 85, 0, 0.3)` | `0 1px 2px rgba(120, 85, 0, 0.3);` |
| 2140 | hex | `#ffffff` | `background: #ffffff;` |
| 2154 | hex | `#ffffff` | `background: #ffffff;` |
| 2156 | rgba | `rgba(255, 255, 255, 0.82)` | `border: 1px solid rgba(255, 255, 255, 0.82);` |
| 2162 | hex | `#ffffff` | `border-color: #ffffff;` |
| 2248 | hex | `#ffffff` | `color: #ffffff;` |
| 2256 | hex | `#1a1300` | `color: #1a1300;` |
| 2297 | hex | `#ffffff` | `background: #ffffff;` |
| 2303 | hex | `#ffffff` | `background: #ffffff;` |
| 2307 | rgba | `rgba(15, 27, 61, 0.04)` | `0 1px 2px rgba(15, 27, 61, 0.04),` |
| 2308 | rgba | `rgba(15, 27, 61, 0.1)` | `0 8px 24px -10px rgba(15, 27, 61, 0.1);` |
| 2312 | hex | `#ffffff` | `background: #ffffff;` |
| 2316 | rgba | `rgba(15, 27, 61, 0.05)` | `0 1px 2px rgba(15, 27, 61, 0.05),` |
| 2317 | rgba | `rgba(15, 27, 61, 0.14)` | `0 10px 28px -10px rgba(15, 27, 61, 0.14),` |
| 2318 | rgba | `rgba(15, 27, 61, 0.2)` | `0 28px 56px -22px rgba(15, 27, 61, 0.2);` |
| 2338 | hex | `#ffffff` | `--card: #ffffff;` |
| 2339 | hex | `#ffffff` | `--popover: #ffffff;` |
| 2340 | hex | `#ffffff` | `--background: #ffffff;` |
| 2344 | hex | `#ffffff` | `--primary-foreground: #ffffff;` |
| 2350 | hex | `#181b21` | `background: linear-gradient(180deg, #181b21 0%, #0a0c10 100%);` |
| 2350 | hex | `#0a0c10` | `background: linear-gradient(180deg, #181b21 0%, #0a0c10 100%);` |
| 2351 | hex | `#ffffff` | `color: #ffffff;` |
| 2352 | rgba | `rgba(255, 255, 255, 0.08)` | `border: 1px solid rgba(255, 255, 255, 0.08);` |
| 2355 | rgba | `rgba(255, 255, 255, 0.1)` | `inset 0 1px 0 rgba(255, 255, 255, 0.1),` |
| 2356 | rgba | `rgba(0, 0, 0, 0.2)` | `0 2px 4px rgba(0, 0, 0, 0.2),` |
| 2357 | rgba | `rgba(10, 20, 48, 0.55)` | `0 24px 48px -16px rgba(10, 20, 48, 0.55);` |
| 2372 | rgba | `rgba(15, 27, 61, 0.06)` | `0 2px 4px rgba(15, 27, 61, 0.06),` |
| 2373 | rgba | `rgba(15, 27, 61, 0.18)` | `0 14px 36px -10px rgba(15, 27, 61, 0.18),` |
| 2374 | rgba | `rgba(15, 27, 61, 0.22)` | `0 32px 64px -22px rgba(15, 27, 61, 0.22);` |
| 2377 | rgba | `rgba(255, 255, 255, 0.16)` | `border-color: rgba(255, 255, 255, 0.16);` |
| 2379 | rgba | `rgba(255, 255, 255, 0.14)` | `inset 0 1px 0 rgba(255, 255, 255, 0.14),` |
| 2380 | rgba | `rgba(0, 0, 0, 0.25)` | `0 4px 8px rgba(0, 0, 0, 0.25),` |
| 2381 | rgba | `rgba(10, 20, 48, 0.65)` | `0 32px 64px -16px rgba(10, 20, 48, 0.65);` |
| 2402 | hex | `#000` | `linear-gradient(#000 0 0) content-box,` |
| 2403 | hex | `#000` | `linear-gradient(#000 0 0);` |
| 2405 | hex | `#000` | `linear-gradient(#000 0 0) content-box,` |
| 2406 | hex | `#000` | `linear-gradient(#000 0 0);` |
| 2426 | hex | `#c9a84c` | `--card-accent: linear-gradient(90deg, #c9a84c 0%, #f0d78c 50%, #c9a84c 100%);` |
| 2426 | hex | `#f0d78c` | `--card-accent: linear-gradient(90deg, #c9a84c 0%, #f0d78c 50%, #c9a84c 100%);` |
| 2426 | hex | `#c9a84c` | `--card-accent: linear-gradient(90deg, #c9a84c 0%, #f0d78c 50%, #c9a84c 100%);` |
| 2435 | hex | `#0d7a5f` | `--card-accent: #0d7a5f;` |
| 2546 | rgba | `rgba(255, 255, 255, 0.85)` | `radial-gradient(1px 1px at 20px 30px, rgba(255, 255, 255, 0.85), transparent 60%),` |
| 2547 | rgba | `rgba(255, 255, 255, 0.7)` | `radial-gradient(1px 1px at 90px 140px, rgba(255, 255, 255, 0.7), transparent 60%),` |
| 2548 | rgba | `rgba(255, 255, 255, 0.9)` | `radial-gradient(1.2px 1.2px at 160px 60px, rgba(255, 255, 255, 0.9), transparent 60%),` |
| 2549 | rgba | `rgba(255, 255, 255, 0.75)` | `radial-gradient(1px 1px at 240px 200px, rgba(255, 255, 255, 0.75), transparent 60%),` |
| 2550 | rgba | `rgba(255, 255, 255, 0.8)` | `radial-gradient(1px 1px at 320px 90px, rgba(255, 255, 255, 0.8), transparent 60%);` |
| 2556 | rgba | `rgba(180, 210, 255, 0.85)` | `radial-gradient(1.5px 1.5px at 50px 80px, rgba(180, 210, 255, 0.85), transparent 60%),` |
| 2557 | rgba | `rgba(200, 220, 255, 0.7)` | `radial-gradient(1.5px 1.5px at 220px 160px, rgba(200, 220, 255, 0.7), transparent 60%),` |
| 2558 | rgba | `rgba(255, 255, 255, 0.8)` | `radial-gradient(1.2px 1.2px at 380px 40px, rgba(255, 255, 255, 0.8), transparent 60%);` |
| 2565 | rgba | `rgba(245, 192, 74, 0.85)` | `radial-gradient(2px 2px at 120px 220px, rgba(245, 192, 74, 0.85), transparent 60%),` |
| 2566 | rgba | `rgba(96, 165, 250, 0.85)` | `radial-gradient(1.5px 1.5px at 460px 120px, rgba(96, 165, 250, 0.85), transparent 60%);` |
| 2586 | hex | `#0a0c10` | ``text-white`, `bg-[#0a0c10]`, `bg-white/N`, `border-white/N`,` |
| 2638 | hex | `#0a0c10` | `.bg-\[\#0a0c10\]:not(.tone-dark, .tone-dark *, [class*="bg-[#0"], [class*="bg-[#0"] *) {` |
| 2639 | rgba | `rgba(255, 255, 255, 0.92)` | `background-color: rgba(255, 255, 255, 0.92) !important;` |
| 2642 | hex | `#0a0c10` | `.bg-\[\#0a0c10\]\/90:not(.tone-dark *, [class*="bg-[#0"] *) {` |
| 2643 | rgba | `rgba(255, 255, 255, 0.9)` | `background-color: rgba(255, 255, 255, 0.9) !important;` |
| 2646 | hex | `#0a0c10` | `.bg-\[\#0a0c10\]\/80:not(.tone-dark *, [class*="bg-[#0"] *) {` |
| 2647 | rgba | `rgba(255, 255, 255, 0.86)` | `background-color: rgba(255, 255, 255, 0.86) !important;` |
| 2650 | hex | `#0a0c10` | `.bg-\[\#0a0c10\]\/70:not(.tone-dark *, [class*="bg-[#0"] *) {` |
| 2651 | rgba | `rgba(255, 255, 255, 0.8)` | `background-color: rgba(255, 255, 255, 0.8) !important;` |
| 2654 | hex | `#0a0c10` | `.bg-\[\#0a0c10\]\/60:not(.tone-dark *, [class*="bg-[#0"] *) {` |
| 2655 | rgba | `rgba(255, 255, 255, 0.72)` | `background-color: rgba(255, 255, 255, 0.72) !important;` |
| 2658 | hex | `#0a0c10` | `.bg-\[\#0a0c10\]\/50:not(.tone-dark *, [class*="bg-[#0"] *) {` |
| 2659 | rgba | `rgba(255, 255, 255, 0.64)` | `background-color: rgba(255, 255, 255, 0.64) !important;` |
| 2662 | hex | `#0a0c10` | `.bg-\[\#0a0c10\]\/40:not(.tone-dark *, [class*="bg-[#0"] *) {` |
| 2663 | rgba | `rgba(255, 255, 255, 0.56)` | `background-color: rgba(255, 255, 255, 0.56) !important;` |
| 2666 | hex | `#0a0c10` | `.bg-\[\#0a0c10\]\/30:not(.tone-dark *, [class*="bg-[#0"] *) {` |
| 2667 | rgba | `rgba(255, 255, 255, 0.48)` | `background-color: rgba(255, 255, 255, 0.48) !important;` |
| 2673 | rgba | `rgba(15, 27, 61, 0.025)` | `background-color: rgba(15, 27, 61, 0.025) !important;` |
| 2676 | rgba | `rgba(15, 27, 61, 0.03)` | `background-color: rgba(15, 27, 61, 0.03) !important;` |
| 2679 | rgba | `rgba(15, 27, 61, 0.03)` | `background-color: rgba(15, 27, 61, 0.03) !important;` |
| 2682 | rgba | `rgba(15, 27, 61, 0.04)` | `background-color: rgba(15, 27, 61, 0.04) !important;` |
| 2685 | rgba | `rgba(15, 27, 61, 0.05)` | `background-color: rgba(15, 27, 61, 0.05) !important;` |
| 2688 | rgba | `rgba(15, 27, 61, 0.05)` | `background-color: rgba(15, 27, 61, 0.05) !important;` |
| 2691 | rgba | `rgba(15, 27, 61, 0.06)` | `background-color: rgba(15, 27, 61, 0.06) !important;` |
| 2694 | rgba | `rgba(255, 255, 255, 0.85)` | `background-color: rgba(255, 255, 255, 0.85) !important;` |
| 2697 | rgba | `rgba(15, 27, 61, 0.05)` | `background-color: rgba(15, 27, 61, 0.05) !important;` |
| 2700 | rgba | `rgba(255, 255, 255, 0.8)` | `background-color: rgba(255, 255, 255, 0.8) !important;` |
| 2703 | rgba | `rgba(255, 255, 255, 0.86)` | `background-color: rgba(255, 255, 255, 0.86) !important;` |
| 2706 | rgba | `rgba(255, 255, 255, 0.9)` | `background-color: rgba(255, 255, 255, 0.9) !important;` |
| 2711 | rgba | `rgba(15, 27, 61, 0.06)` | `border-color: rgba(15, 27, 61, 0.06) !important;` |
| 2714 | rgba | `rgba(15, 27, 61, 0.07)` | `border-color: rgba(15, 27, 61, 0.07) !important;` |
| 2717 | rgba | `rgba(15, 27, 61, 0.08)` | `border-color: rgba(15, 27, 61, 0.08) !important;` |
| 2720 | rgba | `rgba(15, 27, 61, 0.09)` | `border-color: rgba(15, 27, 61, 0.09) !important;` |
| 2723 | rgba | `rgba(15, 27, 61, 0.1)` | `border-color: rgba(15, 27, 61, 0.1) !important;` |
| 2726 | rgba | `rgba(15, 27, 61, 0.12)` | `border-color: rgba(15, 27, 61, 0.12) !important;` |
| 2729 | rgba | `rgba(15, 27, 61, 0.14)` | `border-color: rgba(15, 27, 61, 0.14) !important;` |
| 2732 | rgba | `rgba(15, 27, 61, 0.16)` | `border-color: rgba(15, 27, 61, 0.16) !important;` |
| 2735 | rgba | `rgba(15, 27, 61, 0.18)` | `border-color: rgba(15, 27, 61, 0.18) !important;` |
| 2738 | rgba | `rgba(15, 27, 61, 0.2)` | `border-color: rgba(15, 27, 61, 0.2) !important;` |
| 2741 | rgba | `rgba(15, 27, 61, 0.1)` | `--tw-ring-color: rgba(15, 27, 61, 0.1) !important;` |
| 2744 | rgba | `rgba(15, 27, 61, 0.12)` | `--tw-ring-color: rgba(15, 27, 61, 0.12) !important;` |
| 2747 | rgba | `rgba(15, 27, 61, 0.14)` | `--tw-ring-color: rgba(15, 27, 61, 0.14) !important;` |
| 2791 | rgba | `rgba(15, 27, 61, 0.04)` | `background-color: rgba(15, 27, 61, 0.04) !important;` |
| 2796 | rgba | `rgba(15, 27, 61, 0.05)` | `background-color: rgba(15, 27, 61, 0.05) !important;` |
| 2802 | rgba | `rgba(15, 27, 61, 0.08)` | `background-color: rgba(15, 27, 61, 0.08) !important;` |
| 2810 | rgba | `rgba(15, 27, 61, 0.1)` | `border-color: rgba(15, 27, 61, 0.1) !important;` |
| 2816 | rgba | `rgba(15, 27, 61, 0.15)` | `border-color: rgba(15, 27, 61, 0.15) !important;` |
| 2822 | rgba | `rgba(15, 27, 61, 0.12)` | `--tw-ring-color: rgba(15, 27, 61, 0.12) !important;` |
| 2832 | hex | `#0f1b3d` | `.tone-light [class*="bg-[#0f1b3d]"],` |
| 2833 | hex | `#0f1b3d` | `.tone-light [class*="bg-[#0f1b3d]"] .text-white,` |
| 2834 | hex | `#0a1430` | `.tone-light [class*="bg-[#0a1430]"],` |
| 2835 | hex | `#0a1430` | `.tone-light [class*="bg-[#0a1430]"] .text-white {` |
| 2836 | hex | `#ffffff` | `color: #ffffff !important;` |
| 2850 | hex | `#ffffff` | `background-color: #ffffff !important;` |
| 2891 | hex | `#0f1b3d` | `[style*="background-color: #0f1b3d"] .text-white,` |
| 2892 | hex | `#0f1b3d` | `[style*="background:#0f1b3d"] .text-white,` |
| 2897 | hex | `#ffffff` | `color: #ffffff !important;` |
| 2901 | hex | `#0f1b3d` | `themselves (e.g. <Link className="bg-[#0f1b3d] text-white">). The` |
| 2904 | hex | `#0f1b3d` | `[class*="bg-[#0f1b3d]"].text-white,` |
| 2905 | hex | `#1e3a5f` | `[class*="bg-[#1e3a5f]"].text-white,` |
| 2906 | hex | `#0a1430` | `[class*="bg-[#0a1430]"].text-white,` |
| 2907 | hex | `#0a1b30` | `[class*="bg-[#0a1b30]"].text-white,` |
| 2908 | hex | `#071226` | `[class*="bg-[#071226]"].text-white,` |
| 2909 | hex | `#040d1c` | `[class*="bg-[#040d1c]"].text-white,` |
| 2910 | hex | `#0A0F1E` | `[class*="bg-[#0A0F1E]"].text-white,` |
| 2916 | hex | `#ffffff` | `color: #ffffff !important;` |
| 2922 | hex | `#0f1b3d` | `background-color: #0f1b3d;` |
| 2923 | hex | `#ffffff` | `color: #ffffff !important;` |
| 2930 | hex | `#1e3a5f` | `background-color: #1e3a5f;` |
| 2933 | hex | `#0a1430` | `background-color: #0a1430;` |
| 2937 | hex | `#ffffff` | `color: #ffffff !important;` |
| 2944 | rgba | `rgba(255, 255, 255, 0.92)` | `background-color: rgba(255, 255, 255, 0.92);` |
| 2946 | rgba | `rgba(15, 27, 61, 0.12)` | `border-color: rgba(15, 27, 61, 0.12);` |
| 2963 | rgba | `rgba(20, 184, 166, 0.25)` | `background: rgba(20, 184, 166, 0.25);` |
| 2973 | hex | `#0f1b3d` | `[class*="bg-[#0f1b3d]"],` |
| 2974 | hex | `#1e3a5f` | `[class*="bg-[#1e3a5f]"],` |
| 2975 | hex | `#0a1b30` | `[class*="bg-[#0a1b30]"],` |
| 2976 | hex | `#0a1430` | `[class*="bg-[#0a1430]"],` |
| 2977 | hex | `#071226` | `[class*="bg-[#071226]"],` |
| 2978 | hex | `#040d1c` | `[class*="bg-[#040d1c]"],` |
| 2979 | hex | `#0A0F1E` | `[class*="bg-[#0A0F1E]"],` |
| 2980 | hex | `#000` | `[class*="bg-[#000"] {` |
| 2981 | hex | `#ffffff` | `color: #ffffff !important;` |
| 2983 | hex | `#0f1b3d` | `[class*="bg-[#0f1b3d]"] .text-white,` |
| 2984 | hex | `#1e3a5f` | `[class*="bg-[#1e3a5f]"] .text-white,` |
| 2985 | hex | `#0a1b30` | `[class*="bg-[#0a1b30]"] .text-white,` |
| 2986 | hex | `#0a1430` | `[class*="bg-[#0a1430]"] .text-white,` |
| 2987 | hex | `#0A0F1E` | `[class*="bg-[#0A0F1E]"] .text-white,` |
| 2988 | hex | `#000` | `[class*="bg-[#000"] .text-white,` |
| 2989 | hex | `#0f1b3d` | `[class*="bg-[#0f1b3d]"] [class*="text-white\\/"],` |
| 2990 | hex | `#1e3a5f` | `[class*="bg-[#1e3a5f]"] [class*="text-white\\/"],` |
| 2991 | hex | `#0a1430` | `[class*="bg-[#0a1430]"] [class*="text-white\\/"] {` |
| 2992 | hex | `#ffffff` | `color: #ffffff !important;` |
| 2997 | hex | `#0a1430` | `.bg-\[\#0a1430\],` |
| 2998 | hex | `#0a1430` | `.bg-\[\#0a1430\] * {` |
| 2999 | hex | `#ffffff` | `color: #ffffff;` |
| 3001 | hex | `#0a1430` | `.bg-\[\#0a1430\] .text-white\/85,` |
| 3002 | hex | `#0a1430` | `.bg-\[\#0a1430\] .text-white\/80,` |
| 3003 | hex | `#0a1430` | `.bg-\[\#0a1430\] .text-white\/75,` |
| 3004 | hex | `#0a1430` | `.bg-\[\#0a1430\] .text-white\/70,` |
| 3005 | hex | `#0a1430` | `.bg-\[\#0a1430\] .text-white\/65,` |
| 3006 | hex | `#0a1430` | `.bg-\[\#0a1430\] .text-white\/60 {` |
| 3007 | rgba | `rgba(255, 255, 255, 0.78)` | `color: rgba(255, 255, 255, 0.78) !important;` |
| 3009 | hex | `#0a1430` | `.bg-\[\#0a1430\] .btn-secondary,` |
| 3010 | hex | `#0a1430` | `.bg-\[\#0a1430\] .btn-secondary * {` |
| 3011 | hex | `#ffffff` | `color: #ffffff !important;` |
| 3015 | hex | `#0a1430` | `keep their own ink - the blanket `.bg-[#0a1430] *` rule above would` |
| 3017 | hex | `#0a1430` | `.bg-\[\#0a1430\] .tone-light,` |
| 3018 | hex | `#0a1430` | `.bg-\[\#0a1430\] .tone-light * {` |
| 3021 | hex | `#0a1430` | `.bg-\[\#0a1430\] .tone-light .text-black,` |
| 3022 | hex | `#0a1430` | `.bg-\[\#0a1430\] .tone-light .text-\[\#0f1b3d\] {` |
| 3022 | hex | `#0f1b3d` | `.bg-\[\#0a1430\] .tone-light .text-\[\#0f1b3d\] {` |
| 3023 | hex | `#000000` | `color: #000000 !important;` |
| 3025 | hex | `#0a1430` | `.bg-\[\#0a1430\] .tone-light .text-white {` |
| 3026 | hex | `#ffffff` | `color: #ffffff !important;` |
| 3031 | hex | `#0f1b3d` | `[class*="hover:bg-[#0f1b3d]"]:hover,` |
| 3032 | hex | `#1e3a5f` | `[class*="hover:bg-[#1e3a5f]"]:hover {` |
| 3033 | hex | `#ffffff` | `color: #ffffff !important;` |
| 3035 | hex | `#0f1b3d` | `[class*="hover:bg-[#0f1b3d]"]:hover .text-white,` |
| 3036 | hex | `#1e3a5f` | `[class*="hover:bg-[#1e3a5f]"]:hover .text-white {` |
| 3037 | hex | `#ffffff` | `color: #ffffff !important;` |
| 3040 | hex | `#0f1b3d` | `/* Dark navy panels rendered via inline style="background:#0f1b3d" */` |
| 3041 | hex | `#0f1b3d` | `[style*="background-color: #0f1b3d"],` |
| 3042 | hex | `#0f1b3d` | `[style*="background:#0f1b3d"],` |
| 3043 | hex | `#1e3a5f` | `[style*="background-color: #1e3a5f"],` |
| 3044 | hex | `#1e3a5f` | `[style*="background:#1e3a5f"],` |
| 3049 | hex | `#ffffff` | `color: #ffffff !important;` |
| 3055 | hex | `#f8fafc` | `color: #f8fafc;` |
| 3058 | hex | `#ffffff` | `color: #ffffff !important;` |
| 3064 | hex | `#ffffff` | `color: #ffffff !important;` |
| 3068 | hex | `#ffffff` | `color: #ffffff !important;` |
| 3073 | hex | `#0a1430` | `.bg-\[\#0a1430\] .btn-primary {` |
| 3074 | rgba | `rgba(20, 184, 166, 0.55)` | `border: 1px solid rgba(20, 184, 166, 0.55);` |
| 3076 | rgba | `rgba(20, 184, 166, 0.18)` | `0 0 0 1px rgba(20, 184, 166, 0.18),` |
| 3077 | rgba | `rgba(20, 184, 166, 0.55)` | `0 14px 36px -14px rgba(20, 184, 166, 0.55),` |
| 3078 | rgba | `rgba(20, 184, 166, 0.35)` | `0 0 24px -8px rgba(20, 184, 166, 0.35);` |
| 3080 | hex | `#0a1430` | `.bg-\[\#0a1430\] .btn-primary:hover {` |
| 3081 | rgba | `rgba(20, 184, 166, 0.85)` | `border-color: rgba(20, 184, 166, 0.85);` |
| 3083 | rgba | `rgba(20, 184, 166, 0.3)` | `0 0 0 1px rgba(20, 184, 166, 0.3),` |
| 3084 | rgba | `rgba(20, 184, 166, 0.7)` | `0 18px 44px -14px rgba(20, 184, 166, 0.7),` |
| 3085 | rgba | `rgba(20, 184, 166, 0.5)` | `0 0 32px -6px rgba(20, 184, 166, 0.5);` |
| 3087 | hex | `#0a1430` | `.bg-\[\#0a1430\] .btn-primary:active {` |
| 3089 | rgba | `rgba(20, 184, 166, 0.95)` | `border-color: rgba(20, 184, 166, 0.95);` |
| 3091 | rgba | `rgba(20, 184, 166, 0.4)` | `0 0 0 1px rgba(20, 184, 166, 0.4),` |
| 3092 | rgba | `rgba(20, 184, 166, 0.6)` | `0 8px 20px -8px rgba(20, 184, 166, 0.6);` |
| 3097 | hex | `#0a1430` | `.bg-\[\#0a1430\] .btn-secondary:hover {` |
| 3098 | hex | `#ffffff` | `background: #ffffff;` |
| 3099 | rgba | `rgba(20, 184, 166, 0.6)` | `border-color: rgba(20, 184, 166, 0.6);` |
| 3100 | rgba | `rgba(20, 184, 166, 0.45)` | `box-shadow: 0 12px 28px -14px rgba(20, 184, 166, 0.45);` |
| 3102 | hex | `#0a1430` | `.bg-\[\#0a1430\] .btn-secondary:hover,` |
| 3103 | hex | `#0a1430` | `.bg-\[\#0a1430\] .btn-secondary:hover * {` |
| 3106 | hex | `#0a1430` | `.bg-\[\#0a1430\] .btn-secondary:active {` |
| 3107 | hex | `#e8edf3` | `background: #e8edf3;` |
| 3112 | hex | `#0a1430` | `#0a1430 backdrop. Skips .btn which already has its own ring. */` |
| 3113 | hex | `#0a1430` | `.bg-\[\#0a1430\] a:not(.btn):focus-visible,` |
| 3114 | hex | `#0a1430` | `.bg-\[\#0a1430\] button:not(.btn):focus-visible {` |
| 3117 | hex | `#0a1430` | `0 0 0 2px #0a1430,` |
| 3118 | hex | `#6fa8e8` | `0 0 0 4px #6fa8e8;` |
| 3135 | hex | `#ffffff` | `background-color: #ffffff;` |
| 3138 | rgba | `rgba(59, 130, 246, 0.35)` | `rgba(59, 130, 246, 0.35),` |
| 3156 | hex | `#6fa8e8` | `outline: 2px solid #6fa8e8;` |
| 3163 | rgba | `rgba(255, 255, 255, 0.75)` | `color: rgba(255, 255, 255, 0.75) !important;` |
| 3166 | rgba | `rgba(255, 255, 255, 0.85)` | `color: rgba(255, 255, 255, 0.85) !important;` |
| 3170 | rgba | `rgba(255, 255, 255, 0.92)` | `color: rgba(255, 255, 255, 0.92) !important;` |
| 3173 | rgba | `rgba(255, 255, 255, 0.7)` | `color: rgba(255, 255, 255, 0.7) !important;` |
| 3177 | hex | `#e2e8f0` | `color: #e2e8f0 !important;` |
| 3181 | hex | `#0f1b3d` | `color: #0f1b3d !important;` |
| 3253 | rgba | `rgba(255, 255, 255, 0.97)` | `background-color: rgba(255, 255, 255, 0.97) !important;` |
| 3263 | hex | `#ffffff` | `background-color: #ffffff;` |
| 3270 | rgba | `rgba(255, 255, 255, 0.6)` | `0 0 0 1px rgba(255, 255, 255, 0.6),` |
| 3277 | hex | `#0a1430` | `.bg-\[\#0a1430\],` |
| 3279 | hex | `#0a1430` | `background-color: #0a1430 !important;` |
| 3286 | hex | `#03060d` | `with very low contrast against #03060d / #070B17. Force readable` |
| 3286 | hex | `#070B17` | `with very low contrast against #03060d / #070B17. Force readable` |
| 3312 | rgba | `rgba(255, 255, 255, 0.88)` | `color: rgba(255, 255, 255, 0.88) !important;` |
| 3321 | rgba | `rgba(255, 255, 255, 0.82)` | `color: rgba(255, 255, 255, 0.82) !important;` |
| 3332 | rgba | `rgba(255, 255, 255, 0.9)` | `color: rgba(255, 255, 255, 0.9) !important;` |
| 3340 | rgba | `rgba(255, 255, 255, 0.82)` | `color: rgba(255, 255, 255, 0.82) !important;` |
| 3344 | rgba | `rgba(255, 255, 255, 0.9)` | `color: rgba(255, 255, 255, 0.9) !important;` |
| 3349 | rgba | `rgba(255, 255, 255, 0.95)` | `color: rgba(255, 255, 255, 0.95) !important;` |
| 3367 | hex | `#ffffff` | `color: #ffffff !important;` |
| 3368 | hex | `#ffffff` | `-webkit-text-fill-color: #ffffff !important;` |
| 3433 | hex | `#ffffff` | `color: #ffffff !important;` |
| 3464 | rgba | `rgba(0, 0, 0, 0.12)` | `border-color: rgba(0, 0, 0, 0.12) !important;` |
| 3481 | rgba | `rgba(7, 11, 22, 1)` | `0 0 0 2px rgba(7, 11, 22, 1),` |
| 3482 | hex | `#5eead4` | `0 0 0 4px color-mix(in oklab, var(--card-accent, #5eead4) 80%, white);` |
| 3502 | rgba | `rgba(255, 255, 255, 0.05)` | `inset 0 1px 0 0 rgba(255, 255, 255, 0.05),` |
| 3503 | rgba | `rgba(0, 0, 0, 0.5)` | `0 8px 24px -12px rgba(0, 0, 0, 0.5) !important;` |
| 3514 | hex | `#070b16` | `background: #070b16;` |
| 3515 | rgba | `rgba(255, 255, 255, 0.08)` | `border-top: 1px solid rgba(255, 255, 255, 0.08);` |
| 3525 | hex | `#0f172a` | `color: #0f172a;` |
| 3531 | hex | `#5eead4` | `color-mix(in oklab, var(--card-accent, #5eead4) 14%, transparent) 0%,` |
| 3534 | hex | `#faf7f0` | `linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.85) 100%), #faf7f0;` |
| 3534 | rgba | `rgba(255, 255, 255, 0.9)` | `linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.85) 100%), #faf7f0;` |
| 3534 | rgba | `rgba(255, 255, 255, 0.85)` | `linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.85) 100%), #faf7f0;` |
| 3535 | rgba | `rgba(15, 23, 42, 0.08)` | `border: 1px solid rgba(15, 23, 42, 0.08);` |
| 3537 | rgba | `rgba(255, 255, 255, 0.9)` | `inset 0 1px 0 0 rgba(255, 255, 255, 0.9),` |
| 3538 | rgba | `rgba(15, 23, 42, 0.2)` | `0 24px 60px -32px rgba(15, 23, 42, 0.2);` |
| 3539 | hex | `#0f172a` | `color: #0f172a;` |
| 3548 | hex | `#0b1220` | `color: #0b1220 !important;` |
| 3557 | hex | `#0f172a` | `color: #0f172a !important;` |
| 3563 | hex | `#4b5563` | `color: #4b5563 !important;` |
| 3566 | rgba | `rgba(15, 23, 42, 0.1)` | `border-color: rgba(15, 23, 42, 0.1) !important;` |
| 3569 | rgba | `rgba(15, 23, 42, 0.04)` | `background-color: rgba(15, 23, 42, 0.04) !important;` |
| 3581 | hex | `#5eead4` | `color-mix(in oklab, #5eead4 14%, transparent) 0%,` |
| 3586 | hex | `#a78bfa` | `color-mix(in oklab, #a78bfa 12%, transparent) 0%,` |
| 3591 | hex | `#a3e635` | `color-mix(in oklab, #a3e635 8%, transparent) 0%,` |
| 3594 | hex | `#0a0f1f` | `linear-gradient(180deg, #0a0f1f 0%, #0b1226 50%, #0a0f1f 100%);` |
| 3594 | hex | `#0b1226` | `linear-gradient(180deg, #0a0f1f 0%, #0b1226 50%, #0a0f1f 100%);` |
| 3594 | hex | `#0a0f1f` | `linear-gradient(180deg, #0a0f1f 0%, #0b1226 50%, #0a0f1f 100%);` |
| 3605 | hex | `#a78bfa` | `color-mix(in oklab, #a78bfa 18%, transparent) 0%,` |
| 3610 | hex | `#5eead4` | `color-mix(in oklab, #5eead4 14%, transparent) 0%,` |
| 3613 | rgba | `rgba(255, 255, 255, 0.06)` | `linear-gradient(160deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%),` |
| 3613 | rgba | `rgba(255, 255, 255, 0.02)` | `linear-gradient(160deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%),` |
| 3614 | rgba | `rgba(20, 26, 46, 0.7)` | `rgba(20, 26, 46, 0.7);` |
| 3615 | rgba | `rgba(255, 255, 255, 0.09)` | `border: 1px solid rgba(255, 255, 255, 0.09);` |
| 3617 | rgba | `rgba(255, 255, 255, 0.08)` | `inset 0 1px 0 0 rgba(255, 255, 255, 0.08),` |
| 3618 | rgba | `rgba(94, 234, 212, 0.35)` | `0 40px 120px -40px rgba(94, 234, 212, 0.35),` |
| 3619 | rgba | `rgba(0, 0, 0, 0.6)` | `0 20px 60px -30px rgba(0, 0, 0, 0.6);` |
| 3626 | hex | `#5eead4` | `color-mix(in oklab, var(--card-accent, #5eead4) 6%, transparent) 0%,` |
| 3629 | hex | `#141a2e` | `linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%), #141a2e;` |
| 3629 | rgba | `rgba(255, 255, 255, 0.03)` | `linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%), #141a2e;` |
| 3629 | rgba | `rgba(255, 255, 255, 0.01)` | `linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%), #141a2e;` |
| 3630 | rgba | `rgba(255, 255, 255, 0.07)` | `border: 1px solid rgba(255, 255, 255, 0.07);` |
| 3641 | rgba | `rgba(255, 255, 255, 0.08)` | `scrollbar-color: rgba(255, 255, 255, 0.08) transparent;` |
| 3652 | rgba | `rgba(230, 251, 246, 0.06)` | `background: rgba(230, 251, 246, 0.06);` |
| 3656 | rgba | `rgba(94, 234, 212, 0.28)` | `background: rgba(94, 234, 212, 0.28);` |
| 3666 | rgba | `rgba(230, 251, 246, 0.42)` | `color: rgba(230, 251, 246, 0.42);` |
| 3681 | rgba | `rgba(230, 251, 246, 0.68)` | `color: rgba(230, 251, 246, 0.68);` |
| 3689 | rgba | `rgba(230, 251, 246, 0.045)` | `background: rgba(230, 251, 246, 0.045);` |
| 3690 | rgba | `rgba(230, 251, 246, 0.98)` | `color: rgba(230, 251, 246, 0.98);` |
| 3693 | hex | `#5eead4` | `background: color-mix(in oklab, #5eead4 6%, transparent);` |
| 3694 | hex | `#eafdf7` | `color: #eafdf7;` |
| 3695 | hex | `#5eead4` | `border-color: color-mix(in oklab, #5eead4 16%, transparent);` |
| 3699 | rgba | `rgba(230, 251, 246, 0.55)` | `color: rgba(230, 251, 246, 0.55);` |
| 3713 | rgba | `rgba(230, 251, 246, 0.38)` | `color: rgba(230, 251, 246, 0.38);` |
| 3717 | hex | `#5eead4` | `color: #5eead4;` |
| 3721 | rgba | `rgba(94, 234, 212, 0.55)` | `color: rgba(94, 234, 212, 0.55);` |
| 3729 | rgba | `rgba(230, 251, 246, 0.08)` | `background: rgba(230, 251, 246, 0.08);` |
| 3734 | hex | `#5eead4` | `background: #5eead4;` |
| 3735 | rgba | `rgba(94, 234, 212, 0.45)` | `box-shadow: 0 0 8px 0 rgba(94, 234, 212, 0.45);` |
| 3746 | hex | `#0a0f1f` | `background: color-mix(in oklab, #0a0f1f 85%, transparent);` |
| 3747 | rgba | `rgba(255, 255, 255, 0.08)` | `border: 1px solid rgba(255, 255, 255, 0.08);` |
| 3756 | rgba | `rgba(15, 22, 38, 0.85)` | `linear-gradient(180deg, rgba(15, 22, 38, 0.85) 0%, rgba(15, 22, 38, 0) 100%),` |
| 3756 | rgba | `rgba(15, 22, 38, 0)` | `linear-gradient(180deg, rgba(15, 22, 38, 0.85) 0%, rgba(15, 22, 38, 0) 100%),` |
| 3757 | rgba | `rgba(7, 11, 22, 0.6)` | `rgba(7, 11, 22, 0.6);` |
| 3758 | rgba | `rgba(230, 251, 246, 0.08)` | `border: 1px solid rgba(230, 251, 246, 0.08);` |
| 3766 | rgba | `rgba(255, 255, 255, 0.08)` | `background: rgba(255, 255, 255, 0.08);` |
| 3767 | rgba | `rgba(255, 255, 255, 0.12)` | `border: 1px solid rgba(255, 255, 255, 0.12);` |
| 3769 | hex | `#a3e635` | `background: linear-gradient(135deg, #a3e635, #5eead4);` |
| 3769 | hex | `#5eead4` | `background: linear-gradient(135deg, #a3e635, #5eead4);` |
| 3771 | rgba | `rgba(163, 230, 53, 0.55)` | `box-shadow: 0 0 12px 0 rgba(163, 230, 53, 0.55);` |
| 3776 | rgba | `rgba(255, 255, 255, 0.02)` | `background-color: rgba(255, 255, 255, 0.02);` |
| 3777 | rgba | `rgba(255, 255, 255, 0.1)` | `border: 1px solid rgba(255, 255, 255, 0.1);` |
| 3779 | rgba | `rgba(255, 255, 255, 0.05)` | `box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05);` |
| 3783 | rgba | `rgba(10, 12, 16, 0.6)` | `background-color: rgba(10, 12, 16, 0.6);` |
| 3784 | rgba | `rgba(255, 255, 255, 0.08)` | `border: 1px solid rgba(255, 255, 255, 0.08);` |
| 3787 | rgba | `rgba(255, 255, 255, 0.02)` | `inset 0 0 0 1px rgba(255, 255, 255, 0.02),` |
| 3788 | rgba | `rgba(0, 0, 0, 0.5)` | `0 20px 40px -10px rgba(0, 0, 0, 0.5);` |
| 3794 | rgba | `rgba(255, 255, 255, 0.04)` | `background-color: rgba(255, 255, 255, 0.04);` |
| 3795 | rgba | `rgba(255, 255, 255, 0.2)` | `border-color: rgba(255, 255, 255, 0.2);` |
| 3797 | rgba | `rgba(255, 255, 255, 0.1)` | `inset 0 0 0 1px rgba(255, 255, 255, 0.1),` |
| 3798 | rgba | `rgba(255, 255, 255, 0.05)` | `0 0 20px 0 rgba(255, 255, 255, 0.05);` |

### `src\components\credibility\JDMirror.tsx` - 56

| Line | Kind | Value | Context |
|---:|---|---|---|
| 19 | hex | `#1d4ed8` | `gradient: "from-[#1d4ed8] via-[#2563eb] to-[#0ea5e9]",` |
| 19 | hex | `#2563eb` | `gradient: "from-[#1d4ed8] via-[#2563eb] to-[#0ea5e9]",` |
| 19 | hex | `#0ea5e9` | `gradient: "from-[#1d4ed8] via-[#2563eb] to-[#0ea5e9]",` |
| 20 | hex | `#38bdf8` | `accent: "#38bdf8",` |
| 21 | hex | `#38bdf8` | `barColor: "#38bdf8",` |
| 25 | hex | `#c2410c` | `gradient: "from-[#c2410c] via-[#ea580c] to-[#d97706]",` |
| 25 | hex | `#ea580c` | `gradient: "from-[#c2410c] via-[#ea580c] to-[#d97706]",` |
| 25 | hex | `#d97706` | `gradient: "from-[#c2410c] via-[#ea580c] to-[#d97706]",` |
| 31 | hex | `#047857` | `gradient: "from-[#047857] via-[#059669] to-[#0d9488]",` |
| 31 | hex | `#059669` | `gradient: "from-[#047857] via-[#059669] to-[#0d9488]",` |
| 31 | hex | `#0d9488` | `gradient: "from-[#047857] via-[#059669] to-[#0d9488]",` |
| 32 | hex | `#34d399` | `accent: "#34d399",` |
| 33 | hex | `#34d399` | `barColor: "#34d399",` |
| 37 | hex | `#6d28d9` | `gradient: "from-[#6d28d9] via-[#7c3aed] to-[#4f46e5]",` |
| 37 | hex | `#7c3aed` | `gradient: "from-[#6d28d9] via-[#7c3aed] to-[#4f46e5]",` |
| 37 | hex | `#4f46e5` | `gradient: "from-[#6d28d9] via-[#7c3aed] to-[#4f46e5]",` |
| 43 | hex | `#be185d` | `gradient: "from-[#be185d] via-[#db2777] to-[#e11d48]",` |
| 43 | hex | `#db2777` | `gradient: "from-[#be185d] via-[#db2777] to-[#e11d48]",` |
| 43 | hex | `#e11d48` | `gradient: "from-[#be185d] via-[#db2777] to-[#e11d48]",` |
| 49 | hex | `#1e40af` | `gradient: "from-[#1e40af] via-[#2563eb] to-[#0284c7]",` |
| 49 | hex | `#2563eb` | `gradient: "from-[#1e40af] via-[#2563eb] to-[#0284c7]",` |
| 49 | hex | `#0284c7` | `gradient: "from-[#1e40af] via-[#2563eb] to-[#0284c7]",` |
| 50 | hex | `#60a5fa` | `accent: "#60a5fa",` |
| 51 | hex | `#60a5fa` | `barColor: "#60a5fa",` |
| 68 | hex | `#F8FAFC` | `className={`py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC] ${className ?? ""}`}` |
| 68 | hex | `#F1F5F9` | `className={`py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC] ${className ?? ""}`}` |
| 68 | hex | `#F8FAFC` | `className={`py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC] ${className ?? ""}`}` |
| 73 | hex | `#0F172A` | `<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-mono font-bold text-[#0F172A]">` |
| 74 | hex | `#2563EB` | `<Sparkles className="h-3.5 w-3.5 text-[#2563EB]" />` |
| 75 | hex | `#0F172A` | `<span className="text-[#0F172A] font-bold">THE JD MIRROR · LIVE CREDIBILITY</span>` |
| 77 | hex | `#0F172A` | `<h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight leading-tight">` |
| 79 | hex | `#8A6D1F` | `<span className="italic text-[#8A6D1F]">` |
| 84 | hex | `#334155` | `<p className="text-xs sm:text-sm text-[#334155] leading-relaxed font-medium">` |
| 109 | hex | `#0F172A` | `<span className="inline-flex items-center gap-1 bg-white/95 text-[#0F172A] px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm">` |
| 110 | hex | `#2563EB` | `<BookOpen className="h-2.5 w-2.5 text-[#2563EB]" />` |
| 111 | hex | `#0F172A` | `<span className="text-[#0F172A]">TRACK</span>` |
| 113 | hex | `#0F172A` | `<span className="inline-flex items-center gap-1.5 bg-white/95 text-[#0F172A] px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold shadow-sm">` |
| 118 | hex | `#0F172A` | `<span className="text-[#0F172A]">{avgCoverage}% match</span>` |
| 138 | hex | `#475569` | `<div className="flex items-center gap-2 text-xs text-[#475569] font-semibold">` |
| 139 | hex | `#0F172A` | `<span className="font-mono font-bold text-[#0F172A]">` |
| 143 | hex | `#334155` | `<span className="flex items-center gap-1 text-[#334155]">` |
| 144 | hex | `#64748B` | `<MapPin className="h-3 w-3 text-[#64748B]" />` |
| 156 | hex | `#0F172A` | `className="tone-dark bg-[#0F172A] text-slate-100 rounded-xl p-3.5 space-y-2 shadow-sm border border-slate-800"` |
| 160 | hex | `#38bdf8` | `style={{ color: "#38bdf8" }}` |
| 165 | hex | `#F8FAFC` | `className="text-xs font-bold text-[#F8FAFC] leading-snug tracking-tight"` |
| 174 | hex | `#38bdf8` | `style={{ width: `${pct}%`, backgroundColor: "#38bdf8" }}` |
| 178 | hex | `#38bdf8` | `style={{ color: "#38bdf8" }}` |
| 191 | hex | `#FEF3C7` | `<div className="bg-[#FEF3C7] border border-[#FDE68A] text-[#78350F] p-3 rounded-xl flex items-start gap-2 text-xs">` |
| 191 | hex | `#FDE68A` | `<div className="bg-[#FEF3C7] border border-[#FDE68A] text-[#78350F] p-3 rounded-xl flex items-start gap-2 text-xs">` |
| 191 | hex | `#78350F` | `<div className="bg-[#FEF3C7] border border-[#FDE68A] text-[#78350F] p-3 rounded-xl flex items-start gap-2 text-xs">` |
| 192 | hex | `#78350F` | `<RefreshCw className="h-3.5 w-3.5 text-[#78350F] shrink-0 mt-0.5" />` |
| 193 | hex | `#78350F` | `<span className="leading-snug text-[#78350F] font-medium">` |
| 194 | hex | `#78350F` | `<strong className="font-bold text-[#78350F]">` |
| 208 | hex | `#0F172A` | `className="text-xs h-10 px-4 w-full flex items-center justify-center gap-2 text-[#0F172A] font-bold rounded-xl border border-slate-300 bg-white hover:bg-slate-50 transition-colors ` |
| 210 | hex | `#0F172A` | `<span className="text-[#0F172A]">Explore track</span>` |
| 211 | hex | `#64748B` | `<ArrowRight className="h-3.5 w-3.5 text-[#64748B]" />` |

### `src\components\landing\Hero.tsx` - 36

| Line | Kind | Value | Context |
|---:|---|---|---|
| 89 | hex | `#F8FAFC` | `className="relative isolate overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"` |
| 89 | hex | `#F1F5F9` | `className="relative isolate overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"` |
| 89 | hex | `#F8FAFC` | `className="relative isolate overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"` |
| 104 | hex | `#475569` | `<div className="flex items-center gap-1 px-2.5 text-[#475569]">` |
| 105 | hex | `#2563EB` | `<Globe className="h-4 w-4 text-[#2563EB]" />` |
| 113 | hex | `#0F172A` | `? "bg-[#0F172A] text-white shadow-md font-extrabold"` |
| 114 | hex | `#334155` | `: "text-[#334155] hover:bg-slate-100 hover:text-[#0F172A]"` |
| 114 | hex | `#0F172A` | `: "text-[#334155] hover:bg-slate-100 hover:text-[#0F172A]"` |
| 132 | hex | `#0F172A` | `className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-bold text-[#0F172A] shadow-sm"` |
| 134 | hex | `#2563EB` | `<Icon className="h-3.5 w-3.5 text-[#2563EB]" />` |
| 135 | hex | `#0F172A` | `<span className="text-[#0F172A]">{label}</span>` |
| 144 | hex | `#020617` | `className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#020617] tracking-tight leading-[1.08] drop-shadow-sm"` |
| 147 | hex | `#9A7B2C` | `<span className="italic font-normal bg-gradient-to-r from-[#9A7B2C] via-[#B5943B] to-[#785E1A] bg-clip-text text-transparent">` |
| 147 | hex | `#B5943B` | `<span className="italic font-normal bg-gradient-to-r from-[#9A7B2C] via-[#B5943B] to-[#785E1A] bg-clip-text text-transparent">` |
| 147 | hex | `#785E1A` | `<span className="italic font-normal bg-gradient-to-r from-[#9A7B2C] via-[#B5943B] to-[#785E1A] bg-clip-text text-transparent">` |
| 155 | hex | `#334155` | `className="text-base sm:text-lg lg:text-xl text-[#334155] max-w-2xl leading-relaxed font-medium tracking-normal"` |
| 167 | hex | `#2563EB` | `className="text-sm h-12 px-8 flex items-center justify-center gap-3 text-white font-bold rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] shadow-lg shadow-blue-600/25 transition-all hove` |
| 167 | hex | `#1d4ed8` | `className="text-sm h-12 px-8 flex items-center justify-center gap-3 text-white font-bold rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] shadow-lg shadow-blue-600/25 transition-all hove` |
| 182 | hex | `#475569` | `<p className="text-xs font-mono font-bold uppercase tracking-wider text-[#475569]">` |
| 185 | hex | `#64748B` | `<p className="text-xs text-[#64748B] font-medium">` |
| 199 | hex | `#78350F` | `<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-300 bg-amber-50 text-[#78350F] text-xs font-bold">` |
| 201 | hex | `#78350F` | `<span className="text-[#78350F] font-bold">Admissions Open - Closing Soon</span>` |
| 205 | hex | `#64748B` | `<p className="font-mono text-xs font-bold uppercase tracking-wider text-[#64748B]">` |
| 208 | hex | `#0F172A` | `<h2 className="font-serif text-3xl font-bold text-[#0F172A] mt-1">August Cohort</h2>` |
| 211 | hex | `#475569` | `<p className="text-xs text-[#475569] leading-relaxed font-medium">` |
| 218 | hex | `#64748B` | `<span className="font-mono text-xs font-bold uppercase tracking-wider text-[#64748B]">` |
| 221 | hex | `#8A6D1F` | `<span className="font-serif italic text-base font-bold text-[#8A6D1F]">` |
| 226 | hex | `#64748B` | `<span className="text-[#64748B]">Status</span>` |
| 236 | hex | `#64748B` | `<div className="mx-auto max-w-7xl flex flex-wrap items-center justify-center gap-8 text-xs text-[#64748B]">` |
| 237 | hex | `#475569` | `<span className="font-mono font-bold uppercase tracking-wider text-[#475569]">` |
| 241 | hex | `#0F172A` | `<div className="flex items-center gap-1.5 font-bold text-[#0F172A]">` |
| 242 | hex | `#2563EB` | `<BadgeCheck className="h-4 w-4 text-[#2563EB]" />` |
| 243 | hex | `#0F172A` | `<span className="text-[#0F172A]">ISO 9001:2015</span>` |
| 245 | hex | `#0F172A` | `<div className="flex items-center gap-1.5 font-bold text-[#0F172A]">` |
| 246 | hex | `#2563EB` | `<Landmark className="h-4 w-4 text-[#2563EB]" />` |
| 247 | hex | `#0F172A` | `<span className="text-[#0F172A]">MSME Registered</span>` |

### `src\routes\enrol.success.tsx` - 35

| Line | Kind | Value | Context |
|---:|---|---|---|
| 146 | hex | `#707C90` | `<p className="text-xs font-medium uppercase tracking-widest text-[#707C90]">` |
| 149 | hex | `#151C2E` | `<h1 className="font-serif text-3xl font-bold text-[#151C2E] tracking-tight">` |
| 153 | hex | `#5B6472` | `<p className="text-sm text-[#5B6472]">` |
| 154 | hex | `#151C2E` | `<span className="font-semibold text-[#151C2E]">{tierMeta.name}</span> programme` |
| 159 | hex | `#151C2E` | `<span className="font-mono text-[#151C2E] font-semibold">` |
| 167 | hex | `#5B6472` | `<p className="text-sm text-[#5B6472]">Your enrolment record has been confirmed.</p>` |
| 169 | hex | `#5B6472` | `<p className="text-xs text-[#5B6472]">` |
| 170 | hex | `#151C2E` | `Cohort: <span className="font-semibold text-[#151C2E]">{cohortLabel}</span> · Starts{" "}` |
| 174 | hex | `#5B6472` | `<div className="inline-flex items-center gap-1.5 text-xs text-[#5B6472] editorial-stat-tile px-3 py-1">` |
| 175 | hex | `#707C90` | `<Mail className="h-3.5 w-3.5 text-[#707C90]" /> Digital receipt sent to {data.email}` |
| 194 | hex | `#1e40af` | `className="flex items-center justify-between editorial-btn-blue p-4 text-white hover:bg-[#1e40af]"` |
| 211 | hex | `#8A6D1F` | `<Sparkles className="h-4 w-4 text-[#8A6D1F]" />` |
| 212 | hex | `#151C2E` | `<h2 className="font-serif text-base font-bold text-[#151C2E]">` |
| 216 | hex | `#5B6472` | `<ul className="space-y-3.5 text-xs text-[#5B6472]">` |
| 218 | hex | `#1D4ED8` | `<span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1D4ED8] text-white text-xs font-mono font-medium">` |
| 222 | hex | `#151C2E` | `<p className="font-semibold text-[#151C2E]">Admissions Outreach (within 30 min)</p>` |
| 229 | hex | `#1D4ED8` | `<span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1D4ED8] text-white text-xs font-mono font-medium">` |
| 233 | hex | `#151C2E` | `<p className="font-semibold text-[#151C2E]">` |
| 242 | hex | `#1D4ED8` | `<span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1D4ED8] text-white text-xs font-mono font-medium">` |
| 246 | hex | `#151C2E` | `<p className="font-semibold text-[#151C2E]">Cohort Kickoff ({cohortStarts})</p>` |
| 259 | hex | `#151C2E` | `className="flex items-center gap-3 editorial-stat-tile p-4 text-[#151C2E] hover:bg-slate-200/60 transition-colors"` |
| 261 | hex | `#1D4ED8` | `<ArrowRight className="h-4 w-4 text-[#1D4ED8] shrink-0" />` |
| 263 | hex | `#151C2E` | `<p className="text-xs font-semibold text-[#151C2E]">Open Student Dashboard</p>` |
| 264 | hex | `#5B6472` | `<p className="text-xs text-[#5B6472]">Track progress & module milestones.</p>` |
| 270 | hex | `#151C2E` | `<p className="text-xs font-semibold text-[#151C2E]">ISO 9001 Certified</p>` |
| 271 | hex | `#5B6472` | `<p className="text-xs text-[#5B6472]">` |
| 285 | hex | `#5B6472` | `className="flex items-center justify-center gap-2 text-xs text-[#5B6472] hover:text-[#151C2E] transition-colors pt-2"` |
| 285 | hex | `#151C2E` | `className="flex items-center justify-center gap-2 text-xs text-[#5B6472] hover:text-[#151C2E] transition-colors pt-2"` |
| 287 | hex | `#8A6D1F` | `<Share2 className="h-3.5 w-3.5 text-[#8A6D1F]" /> Share career assessment link with a peer` |
| 306 | hex | `#1D4ED8` | `<Loader2 className="mx-auto h-10 w-10 animate-spin text-[#1D4ED8]" />` |
| 307 | hex | `#707C90` | `<p className="text-xs font-medium uppercase tracking-widest text-[#707C90]">` |
| 310 | hex | `#151C2E` | `<h1 className="font-serif text-2xl font-bold text-[#151C2E]">` |
| 313 | hex | `#5B6472` | `<p className="text-xs text-[#5B6472]">` |
| 333 | hex | `#151C2E` | `<h1 className="font-serif text-2xl font-bold text-[#151C2E]">Payment Processing Issue</h1>` |
| 334 | hex | `#5B6472` | `<p className="text-xs text-[#5B6472]">` |

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

### `src\components\landing\BentoProgrammes.tsx` - 32

| Line | Kind | Value | Context |
|---:|---|---|---|
| 47 | hex | `#64748B` | `<dt className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#64748B]">` |
| 50 | hex | `#0F172A` | `<dd className="mt-0.5 text-xs font-bold text-[#0F172A] truncate">{v}</dd>` |
| 92 | hex | `#F8FAFC` | `className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC]"` |
| 92 | hex | `#F1F5F9` | `className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC]"` |
| 92 | hex | `#F8FAFC` | `className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC]"` |
| 98 | hex | `#64748B` | `<p className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[#64748B]">` |
| 101 | hex | `#8A6D1F` | `<div className="h-0.5 w-8 bg-[#8A6D1F]/60 mt-1 rounded-full" />` |
| 103 | hex | `#8A6D1F` | `<h2 className="font-serif text-4xl sm:text-5xl lg:text-[44px] font-bold text-[#8A6D1F] italic tracking-tight leading-tight">` |
| 106 | hex | `#334155` | `<p className="text-xs sm:text-sm text-[#334155] leading-relaxed max-w-2xl mx-auto font-medium">` |
| 140 | hex | `#0F172A` | `<span className="absolute right-2 top-2 rounded-full bg-[#0F172A] text-white px-3 py-1 font-mono text-[11px] font-bold shadow-md backdrop-blur-md">` |
| 146 | hex | `#64748B` | `<p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#64748B]">` |
| 149 | hex | `#0F172A` | `<h3 className="font-serif text-xl font-bold text-[#0F172A] mt-0.5">` |
| 152 | hex | `#334155` | `<p className="text-xs text-[#334155] line-clamp-2 mt-1 leading-relaxed font-medium">` |
| 155 | hex | `#64748B` | `<p className="text-[11px] text-[#64748B] mt-1 italic font-medium">` |
| 166 | hex | `#0F172A` | `className="text-xs h-10 px-3 flex-1 flex items-center justify-center gap-1.5 text-white font-bold rounded-xl bg-[#0F172A] hover:bg-[#1E293B] transition-colors shadow-sm"` |
| 166 | hex | `#1E293B` | `className="text-xs h-10 px-3 flex-1 flex items-center justify-center gap-1.5 text-white font-bold rounded-xl bg-[#0F172A] hover:bg-[#1E293B] transition-colors shadow-sm"` |
| 174 | hex | `#0F172A` | `className="text-xs h-10 px-3 flex-1 flex items-center justify-center gap-1 text-[#0F172A] font-bold rounded-xl border border-slate-300 bg-white hover:bg-slate-50 transition-colors ` |
| 176 | hex | `#0F172A` | `<span className="text-[#0F172A] font-bold">Explore role-track</span>` |
| 177 | hex | `#64748B` | `<ArrowUpRight className="h-3.5 w-3.5 text-[#64748B]" />` |
| 191 | hex | `#2563EB` | `className={`h-1.5 rounded-full transition-all ${i === activeIdx ? "w-6 bg-[#2563EB]" : "w-1.5 bg-slate-300"}`}` |
| 216 | hex | `#0F172A` | `<span className="absolute right-3 top-3 rounded-full bg-[#0F172A] text-white px-3 py-1 font-mono text-xs font-bold shadow-md backdrop-blur-md">` |
| 223 | hex | `#64748B` | `<p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#64748B]">` |
| 226 | hex | `#0F172A` | `<h3 className="font-serif text-xl font-bold text-[#0F172A] mt-0.5">{t.role}</h3>` |
| 227 | hex | `#334155` | `<p className="text-xs text-[#334155] line-clamp-2 mt-1 leading-relaxed font-medium">` |
| 230 | hex | `#64748B` | `<p className="text-[11px] text-[#64748B] mt-1 italic font-medium">` |
| 241 | hex | `#0F172A` | `className="text-xs h-10 px-3 flex-1 flex items-center justify-center gap-1.5 text-white font-bold rounded-xl bg-[#0F172A] hover:bg-[#1E293B] shadow-sm transition-colors"` |
| 241 | hex | `#1E293B` | `className="text-xs h-10 px-3 flex-1 flex items-center justify-center gap-1.5 text-white font-bold rounded-xl bg-[#0F172A] hover:bg-[#1E293B] shadow-sm transition-colors"` |
| 250 | hex | `#0F172A` | `className="text-xs h-10 px-3 flex-1 flex items-center justify-center gap-1 text-[#0F172A] font-bold rounded-xl border border-slate-300 bg-white hover:bg-slate-50 transition-colors ` |
| 252 | hex | `#0F172A` | `<span className="text-[#0F172A] font-bold">Explore role-track</span>` |
| 253 | hex | `#64748B` | `<ArrowUpRight className="h-3.5 w-3.5 text-[#64748B]" />` |
| 266 | hex | `#2563EB` | `className="inline-flex items-center gap-2 text-xs font-bold text-white rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] px-6 py-3 shadow-lg shadow-blue-600/25 transition-all hover:scale-` |
| 266 | hex | `#1d4ed8` | `className="inline-flex items-center gap-2 text-xs font-bold text-white rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] px-6 py-3 shadow-lg shadow-blue-600/25 transition-all hover:scale-` |

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
| 121 | hex | `#F8FAFC` | `className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC]"` |
| 121 | hex | `#F1F5F9` | `className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC]"` |
| 121 | hex | `#F8FAFC` | `className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC]"` |
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

### `src\components\landing\Nav.tsx` - 23

| Line | Kind | Value | Context |
|---:|---|---|---|
| 42 | hex | `#0F172A` | `<div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-[#0F172A] ring-1 ring-slate-200">` |
| 54 | hex | `#0F172A` | `<p className="font-mono text-xs font-extrabold tracking-[0.24em] text-[#0F172A]">` |
| 57 | hex | `#64748B` | `<p className="hidden xs:block font-mono text-[9px] font-bold tracking-[0.36em] text-[#64748B]">` |
| 72 | hex | `#2563EB` | `className: "text-[#2563EB] font-extrabold after:scale-x-100",` |
| 74 | hex | `#334155` | `className="relative whitespace-nowrap text-sm font-bold text-[#334155] transition-colors duration-200 hover:text-[#2563EB] after:absolute after:inset-x-0 after:-bottom-1.5 after:h-` |
| 74 | hex | `#2563EB` | `className="relative whitespace-nowrap text-sm font-bold text-[#334155] transition-colors duration-200 hover:text-[#2563EB] after:absolute after:inset-x-0 after:-bottom-1.5 after:h-` |
| 74 | hex | `#2563EB` | `className="relative whitespace-nowrap text-sm font-bold text-[#334155] transition-colors duration-200 hover:text-[#2563EB] after:absolute after:inset-x-0 after:-bottom-1.5 after:h-` |
| 86 | hex | `#2563EB` | `activeProps={{ className: "text-[#2563EB] font-bold" }}` |
| 87 | hex | `#334155` | `className="whitespace-nowrap text-sm font-bold text-[#334155] hover:text-[#2563EB]"` |
| 87 | hex | `#2563EB` | `className="whitespace-nowrap text-sm font-bold text-[#334155] hover:text-[#2563EB]"` |
| 104 | hex | `#2563EB` | `className="inline-flex h-10 shrink-0 items-center whitespace-nowrap rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] px-5 text-xs font-bold text-white shadow-md shadow-blue-600/20 transi` |
| 104 | hex | `#1d4ed8` | `className="inline-flex h-10 shrink-0 items-center whitespace-nowrap rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] px-5 text-xs font-bold text-white shadow-md shadow-blue-600/20 transi` |
| 122 | hex | `#0F172A` | `className="inline-flex h-11 w-11 touch-manipulation items-center justify-center rounded-xl text-[#0F172A] hover:bg-slate-100 transition-colors xl:hidden"` |
| 128 | hex | `#0F172A` | `<Menu className="h-6 w-6 text-[#0F172A]" />` |
| 137 | hex | `#0F172A` | `<SheetTitle className="font-mono text-xs font-extrabold tracking-[0.28em] text-[#0F172A]">` |
| 144 | hex | `#64748B` | `<p className="px-3 pb-1 font-mono text-[10px] uppercase font-bold tracking-[0.18em] text-[#64748B]">` |
| 154 | hex | `#2563EB` | `activeProps={{ className: "bg-slate-100 text-[#2563EB] font-bold" }}` |
| 155 | hex | `#334155` | `className="rounded-xl px-3 py-3 text-sm font-bold text-[#334155] hover:bg-slate-50 transition-colors"` |
| 164 | hex | `#334155` | `className="rounded-xl px-3 py-3 text-sm font-bold text-[#334155] hover:bg-slate-50 transition-colors"` |
| 172 | hex | `#334155` | `className="rounded-xl px-3 py-3 text-sm font-bold text-[#334155] hover:bg-slate-50 transition-colors"` |
| 180 | hex | `#334155` | `className="rounded-xl px-3 py-3 text-sm font-bold text-[#334155] hover:bg-slate-50 transition-colors"` |
| 199 | hex | `#2563EB` | `className="inline-flex h-12 w-full items-center justify-center gap-1.5 rounded-xl bg-[#2563EB] px-5 text-sm font-bold text-white hover:bg-[#1d4ed8] shadow-md shadow-blue-600/20"` |
| 199 | hex | `#1d4ed8` | `className="inline-flex h-12 w-full items-center justify-center gap-1.5 rounded-xl bg-[#2563EB] px-5 text-sm font-bold text-white hover:bg-[#1d4ed8] shadow-md shadow-blue-600/20"` |

### `src\routes\why-arzon.tsx` - 18

| Line | Kind | Value | Context |
|---:|---|---|---|
| 217 | hex | `#0B0F19` | `<div className="min-h-dvh bg-[#0B0F19] text-white">` |
| 237 | hex | `#121723` | `className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#121723] p-6 shadow-2xl transition-all duration-300 hover:border-teal-500/40"` |
| 264 | hex | `#121723` | `className="rounded-2xl border border-white/10 bg-[#121723] p-6 shadow-xl transition hover:border-white/20"` |
| 291 | hex | `#121723` | `<div className="mt-6 rounded-2xl border border-white/10 bg-[#121723] p-6 shadow-2xl">` |
| 316 | hex | `#121723` | `className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#121723] p-6 shadow-xl transition-all hover:border-teal-500/30"` |
| 338 | hex | `#121723` | `<div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-[#121723] shadow-2xl">` |
| 342 | hex | `#121723` | `<tr key={r.label} className={i % 2 === 0 ? "bg-[#121723]" : "bg-[#0B0F19]"}>` |
| 342 | hex | `#0B0F19` | `<tr key={r.label} className={i % 2 === 0 ? "bg-[#121723]" : "bg-[#0B0F19]"}>` |
| 367 | hex | `#121723` | `<div className="mt-6 overflow-x-auto rounded-2xl border border-white/10 bg-[#121723] shadow-2xl">` |
| 369 | hex | `#161F33` | `<thead className="bg-[#161F33] text-xs uppercase tracking-wider text-teal-400 font-bold">` |
| 382 | hex | `#121723` | `<tr key={r.row} className={i % 2 === 0 ? "bg-[#121723]" : "bg-[#0B0F19]"}>` |
| 382 | hex | `#0B0F19` | `<tr key={r.row} className={i % 2 === 0 ? "bg-[#121723]" : "bg-[#0B0F19]"}>` |
| 414 | hex | `#121723` | `<div className="rounded-2xl border border-white/10 bg-[#121723] p-6 shadow-xl text-center relative overflow-hidden group hover:border-teal-500/30 transition-all">` |
| 420 | hex | `#121723` | `<div className="rounded-2xl border border-white/10 bg-[#121723] p-6 shadow-xl text-center relative overflow-hidden group hover:border-teal-500/30 transition-all">` |
| 426 | hex | `#121723` | `<div className="rounded-2xl border border-white/10 bg-[#121723] p-6 shadow-xl text-center relative overflow-hidden group hover:border-teal-500/30 transition-all">` |
| 442 | hex | `#121723` | `<section className="mt-16 rounded-2xl border border-white/10 bg-[#121723] p-8 shadow-2xl">` |
| 455 | hex | `#2563EB` | `className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition-a` |
| 455 | hex | `#1d4ed8` | `className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition-a` |

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

### `src\routes\courses.index.tsx` - 16

| Line | Kind | Value | Context |
|---:|---|---|---|
| 60 | hex | `#F8FAFC` | `<main className="min-h-app bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC]">` |
| 60 | hex | `#F1F5F9` | `<main className="min-h-app bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC]">` |
| 60 | hex | `#F8FAFC` | `<main className="min-h-app bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC]">` |
| 66 | hex | `#707C90` | `className="inline-flex items-center gap-1.5 text-xs font-bold text-[#707C90] transition hover:text-[#151C2E]"` |
| 66 | hex | `#151C2E` | `className="inline-flex items-center gap-1.5 text-xs font-bold text-[#707C90] transition hover:text-[#151C2E]"` |
| 70 | hex | `#707C90` | `<p className="mt-5 font-mono text-xs font-bold uppercase tracking-[0.24em] text-[#707C90]">` |
| 73 | hex | `#151C2E` | `<h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#151C2E] tracking-tight leading-tight mt-3 max-w-3xl">` |
| 75 | hex | `#8A6D1F` | `<span className="italic text-[#8A6D1F]">The syllabus follows the JD.</span>` |
| 77 | hex | `#5B6472` | `<p className="mt-4 max-w-2xl text-sm sm:text-base text-[#5B6472] leading-relaxed">` |
| 84 | hex | `#151C2E` | `<h2 className="text-lg font-bold text-[#151C2E]">` |
| 90 | hex | `#151C2E` | `className="inline-flex items-center justify-center rounded-full bg-slate-50 hover:bg-slate-100 px-4 py-2 text-xs sm:text-sm font-bold text-[#151C2E] border border-slate-200 transit` |
| 96 | hex | `#151C2E` | `className="inline-flex items-center justify-center rounded-full bg-slate-50 hover:bg-slate-100 px-4 py-2 text-xs sm:text-sm font-bold text-[#151C2E] border border-slate-200 transit` |
| 102 | hex | `#151C2E` | `className="inline-flex items-center justify-center rounded-full bg-slate-50 hover:bg-slate-100 px-4 py-2 text-xs sm:text-sm font-bold text-[#151C2E] border border-slate-200 transit` |
| 107 | hex | `#5B6472` | `<p className="text-xs text-[#5B6472]">` |
| 122 | hex | `#707C90` | `<p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-[#707C90]">` |
| 125 | hex | `#151C2E` | `<h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151C2E] mt-1">` |

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
| 242 | rgba | `rgba(255,255,255,0.04)` | `background: "rgba(255,255,255,0.04)",` |
| 243 | rgba | `rgba(255,255,255,0.15)` | `borderColor: "rgba(255,255,255,0.15)",` |
| 270 | rgba | `rgba(15,23,42,0.7)` | `style={{ background: "rgba(15,23,42,0.7)", color: "#F1F5F9" }}` |

### `src\components\landing\CredibilityStrip.tsx` - 15

| Line | Kind | Value | Context |
|---:|---|---|---|
| 83 | hex | `#F8FAFC` | `className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC]"` |
| 83 | hex | `#F1F5F9` | `className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC]"` |
| 83 | hex | `#F8FAFC` | `className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC]"` |
| 89 | hex | `#707C90` | `<p className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[#707C90]">` |
| 92 | hex | `#8A6D1F` | `<div className="h-0.5 w-8 bg-[#8A6D1F]/60 mt-1 rounded-full" />` |
| 94 | hex | `#151C2E` | `<h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#151C2E] tracking-tight leading-tight">` |
| 96 | hex | `#8A6D1F` | `<span className="italic text-[#8A6D1F]">independently verifiable.</span>` |
| 98 | hex | `#5B6472` | `<p className="text-xs sm:text-sm text-[#5B6472] leading-relaxed max-w-xl mx-auto">` |
| 117 | hex | `#2563EB` | `<span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 border border-blue-100 text-[#2563EB]">` |
| 120 | hex | `#707C90` | `<ArrowUpRight className="h-4 w-4 text-[#707C90] group-hover:text-[#2563EB] transition-colors" />` |
| 120 | hex | `#2563EB` | `<ArrowUpRight className="h-4 w-4 text-[#707C90] group-hover:text-[#2563EB] transition-colors" />` |
| 124 | hex | `#707C90` | `<p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#707C90]">` |
| 127 | hex | `#151C2E` | `<h3 className="font-serif text-xl font-bold text-[#151C2E] mt-1">{t.value}</h3>` |
| 128 | hex | `#5B6472` | `<p className="text-xs text-[#5B6472] mt-1 leading-relaxed">{t.sub}</p>` |
| 133 | hex | `#2563EB` | `<p className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#2563EB]">` |

### `src\components\landing\LimitedSeatsCountdown.tsx` - 15

| Line | Kind | Value | Context |
|---:|---|---|---|
| 119 | hex | `#707C90` | `<p className="text-xs font-medium uppercase tracking-widest text-[#707C90]">` |
| 122 | hex | `#151C2E` | `<h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#151C2E] tracking-tight">` |
| 124 | hex | `#8A6D1F` | `<span className="italic text-[#8A6D1F]">{label}</span>` |
| 126 | hex | `#5B6472` | `<p className="text-sm text-[#5B6472] max-w-xl mx-auto">` |
| 135 | hex | `#707C90` | `<div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#707C90]">` |
| 136 | hex | `#1D4ED8` | `<Clock className="h-4 w-4 text-[#1D4ED8]" />` |
| 148 | hex | `#151C2E` | `<span className="font-serif text-2xl sm:text-3xl font-bold text-[#151C2E] tabular-nums block">` |
| 151 | hex | `#707C90` | `<span className="text-[10px] font-medium uppercase tracking-widest text-[#707C90] mt-1 block">` |
| 158 | hex | `#5B6472` | `<div className="flex items-center gap-2 text-xs text-[#5B6472]">` |
| 159 | hex | `#1D4ED8` | `<CalendarDays className="h-4 w-4 text-[#1D4ED8] shrink-0" />` |
| 170 | hex | `#707C90` | `<div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#707C90]">` |
| 171 | hex | `#1D4ED8` | `<Users2 className="h-4 w-4 text-[#1D4ED8]" />` |
| 186 | hex | `#151C2E` | `<span className="font-serif text-3xl font-bold text-[#151C2E]">{seatsLeft}</span>` |
| 187 | hex | `#5B6472` | `<span className="text-xs text-[#5B6472]">of {seatsCap} seats remaining</span>` |
| 200 | hex | `#5B6472` | `<p className="mt-3 text-xs text-[#5B6472] leading-relaxed">` |

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
| 26 | hex | `#F8FAFC` | `className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC]"` |
| 26 | hex | `#F1F5F9` | `className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC]"` |
| 26 | hex | `#F8FAFC` | `className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC]"` |
| 32 | hex | `#707C90` | `<p className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[#707C90]">` |
| 35 | hex | `#8A6D1F` | `<div className="h-0.5 w-8 bg-[#8A6D1F]/60 mt-1 rounded-full" />` |
| 37 | hex | `#151C2E` | `<h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#151C2E] tracking-tight leading-[1.15]">` |
| 39 | hex | `#8A6D1F` | `<span className="italic text-[#8A6D1F]">when our graduate applies.</span>` |
| 41 | hex | `#5B6472` | `<p className="text-sm sm:text-base text-[#5B6472] leading-relaxed max-w-2xl mx-auto">` |
| 55 | hex | `#707C90` | `<div className="hidden md:grid md:grid-cols-[1.1fr_1.3fr_1.1fr] gap-4 pb-3 border-b border-slate-200/80 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#707C90] px` |
| 74 | hex | `#151C2E` | `<p className="text-xs font-bold text-[#151C2E]">{row.pain}</p>` |
| 75 | hex | `#151C2E` | `<div className="flex items-center gap-2 text-xs font-medium text-[#151C2E]">` |
| 76 | hex | `#2563EB` | `<CheckCircle2 className="h-3.5 w-3.5 text-[#2563EB] shrink-0" />` |
| 79 | hex | `#2563EB` | `<p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#2563EB]">` |
| 87 | hex | `#707C90` | `<p className="text-center font-mono text-[10px] text-[#707C90]">` |

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

### `src\components\landing\StickyMobileCTA.tsx` - 13

| Line | Kind | Value | Context |
|---:|---|---|---|
| 93 | hex | `#0A0F1E` | `className="pointer-events-auto mx-3 mb-3 flex items-center gap-2 rounded-full border border-slate-200/15 bg-[#0A0F1E] px-2 py-2 sm:mx-auto sm:max-w-md"` |
| 96 | rgba | `rgba(255,255,255,0.08)` | `"inset 0 1px 0 rgba(255,255,255,0.08), 0 -1px 2px rgba(0,0,0,0.3), 0 -16px 48px -12px rgba(0,0,0,0.7), 0 8px 24px -8px rgba(15,27,61,0.6)",` |
| 96 | rgba | `rgba(0,0,0,0.3)` | `"inset 0 1px 0 rgba(255,255,255,0.08), 0 -1px 2px rgba(0,0,0,0.3), 0 -16px 48px -12px rgba(0,0,0,0.7), 0 8px 24px -8px rgba(15,27,61,0.6)",` |
| 96 | rgba | `rgba(0,0,0,0.7)` | `"inset 0 1px 0 rgba(255,255,255,0.08), 0 -1px 2px rgba(0,0,0,0.3), 0 -16px 48px -12px rgba(0,0,0,0.7), 0 8px 24px -8px rgba(15,27,61,0.6)",` |
| 96 | rgba | `rgba(15,27,61,0.6)` | `"inset 0 1px 0 rgba(255,255,255,0.08), 0 -1px 2px rgba(0,0,0,0.3), 0 -16px 48px -12px rgba(0,0,0,0.7), 0 8px 24px -8px rgba(15,27,61,0.6)",` |
| 102 | hex | `#3b6fa0` | `className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#3b6fa0]/15 text-[#7fb0d8] ring-1 ring-[#3b6fa0]/30 transition-all duration-200 hover:bg-[#3b6fa0]/2` |
| 102 | hex | `#7fb0d8` | `className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#3b6fa0]/15 text-[#7fb0d8] ring-1 ring-[#3b6fa0]/30 transition-all duration-200 hover:bg-[#3b6fa0]/2` |
| 102 | hex | `#3b6fa0` | `className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#3b6fa0]/15 text-[#7fb0d8] ring-1 ring-[#3b6fa0]/30 transition-all duration-200 hover:bg-[#3b6fa0]/2` |
| 102 | hex | `#3b6fa0` | `className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#3b6fa0]/15 text-[#7fb0d8] ring-1 ring-[#3b6fa0]/30 transition-all duration-200 hover:bg-[#3b6fa0]/2` |
| 102 | hex | `#3b6fa0` | `className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#3b6fa0]/15 text-[#7fb0d8] ring-1 ring-[#3b6fa0]/30 transition-all duration-200 hover:bg-[#3b6fa0]/2` |
| 102 | hex | `#7fb0d8` | `className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#3b6fa0]/15 text-[#7fb0d8] ring-1 ring-[#3b6fa0]/30 transition-all duration-200 hover:bg-[#3b6fa0]/2` |
| 102 | hex | `#0A0F1E` | `className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#3b6fa0]/15 text-[#7fb0d8] ring-1 ring-[#3b6fa0]/30 transition-all duration-200 hover:bg-[#3b6fa0]/2` |
| 130 | hex | `#0A0F1E` | `className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-slate-100/60 transition-all duration-200 hover:bg-slate-50/10 hover:text-slate-50 active:scale-90 f` |

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

### `src\components\landing\Pricing.tsx` - 12

| Line | Kind | Value | Context |
|---:|---|---|---|
| 58 | hex | `#0D1527` | `cardBg: "bg-[#0D1527]",` |
| 67 | hex | `#111A30` | `priceBoxBg: "bg-[#111A30]",` |
| 96 | hex | `#0B132B` | `cardBg: "bg-[#0B132B]",` |
| 105 | hex | `#142247` | `priceBoxBg: "bg-[#142247]",` |
| 135 | hex | `#041D17` | `cardBg: "bg-[#041D17]",` |
| 144 | hex | `#0A2D24` | `priceBoxBg: "bg-[#0A2D24]",` |
| 196 | hex | `#151C2E` | `<h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#151C2E] tracking-tight">` |
| 197 | hex | `#8A6D1F` | `Select your <span className="italic text-[#8A6D1F]">workforce readiness tier</span>` |
| 199 | hex | `#5B6472` | `<p className="text-sm text-[#5B6472]">` |
| 323 | hex | `#151C2E` | `<p className="text-xs font-semibold text-[#151C2E]">256-bit TLS Encrypted Checkout</p>` |
| 324 | hex | `#5B6472` | `<p className="text-xs text-[#5B6472]">` |
| 329 | hex | `#707C90` | `<div className="text-xs font-mono text-[#707C90]">` |

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

### `src\components\landing\ExitIntentQuiz.tsx` - 11

| Line | Kind | Value | Context |
|---:|---|---|---|
| 83 | hex | `#c9a84c` | `<div className="relative overflow-hidden rounded-[20px] card-dark ring-1 ring-[#c9a84c]/30">` |
| 88 | hex | `#c9a84c` | `style={{ background: "linear-gradient(90deg,#c9a84c 0%,#f0d78c 50%,#c9a84c 100%)" }}` |
| 88 | hex | `#f0d78c` | `style={{ background: "linear-gradient(90deg,#c9a84c 0%,#f0d78c 50%,#c9a84c 100%)" }}` |
| 88 | hex | `#c9a84c` | `style={{ background: "linear-gradient(90deg,#c9a84c 0%,#f0d78c 50%,#c9a84c 100%)" }}` |
| 95 | rgba | `rgba(201,168,76,0.45)` | `style={{ background: "radial-gradient(circle,rgba(201,168,76,0.45),transparent 70%)" }}` |
| 107 | hex | `#c9a84c` | `<span className="inline-flex items-center gap-1.5 rounded-full bg-[#c9a84c]/15 px-3 py-1 font-mono text-micro font-bold uppercase tracking-[0.22em] text-[#f0d78c] ring-1 ring-[#c9a` |
| 107 | hex | `#f0d78c` | `<span className="inline-flex items-center gap-1.5 rounded-full bg-[#c9a84c]/15 px-3 py-1 font-mono text-micro font-bold uppercase tracking-[0.22em] text-[#f0d78c] ring-1 ring-[#c9a` |
| 107 | hex | `#c9a84c` | `<span className="inline-flex items-center gap-1.5 rounded-full bg-[#c9a84c]/15 px-3 py-1 font-mono text-micro font-bold uppercase tracking-[0.22em] text-[#f0d78c] ring-1 ring-[#c9a` |
| 114 | hex | `#f0d78c` | `<span className="text-[#f0d78c]">your fit?</span>` |
| 125 | hex | `#f0d78c` | `<ClipboardCheck className="h-4 w-4 shrink-0 text-[#f0d78c]" />` |
| 129 | hex | `#f0d78c` | `<GraduationCap className="h-4 w-4 shrink-0 text-[#f0d78c]" />` |

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

### `src\routes\contact.tsx` - 11

| Line | Kind | Value | Context |
|---:|---|---|---|
| 78 | hex | `#0A0F1E` | `<main className="tone-dark min-h-app bg-[#0A0F1E] text-white">` |
| 204 | rgba | `rgba(255,255,255,0.06)` | `style={{ background: "rgba(255,255,255,0.06)", color: "#F8FAFC" }}` |
| 216 | rgba | `rgba(255,255,255,0.06)` | `style={{ background: "rgba(255,255,255,0.06)", color: "#F8FAFC" }}` |
| 227 | rgba | `rgba(255,255,255,0.06)` | `style={{ background: "rgba(255,255,255,0.06)", color: "#F8FAFC" }}` |
| 229 | hex | `#0F172A` | `<option value="" style={{ color: "#0F172A" }}>` |
| 232 | hex | `#0F172A` | `<option value="Pharmacovigilance" style={{ color: "#0F172A" }}>` |
| 235 | hex | `#0F172A` | `<option value="Medical Coding" style={{ color: "#0F172A" }}>` |
| 238 | hex | `#0F172A` | `<option value="Clinical Research" style={{ color: "#0F172A" }}>` |
| 241 | hex | `#0F172A` | `<option value="SAS Clinical" style={{ color: "#0F172A" }}>` |
| 255 | rgba | `rgba(255,255,255,0.06)` | `style={{ background: "rgba(255,255,255,0.06)", color: "#F8FAFC" }}` |
| 262 | hex | `#10B981` | `style={{ background: "#10B981", color: "#FFFFFF" }}` |

### `src\routes\enrol.index.tsx` - 11

| Line | Kind | Value | Context |
|---:|---|---|---|
| 81 | hex | `#0D1527` | `cardBg: "bg-[#0D1527]",` |
| 90 | hex | `#111A30` | `priceBoxBg: "bg-[#111A30]",` |
| 133 | hex | `#0B132B` | `cardBg: "bg-[#0B132B]",` |
| 142 | hex | `#142247` | `priceBoxBg: "bg-[#142247]",` |
| 188 | hex | `#041D17` | `cardBg: "bg-[#041D17]",` |
| 197 | hex | `#0A2D24` | `priceBoxBg: "bg-[#0A2D24]",` |
| 296 | hex | `#070B19` | `<div className="min-h-screen bg-[#070B19] text-white px-4 py-8 sm:px-8 lg:px-12">` |
| 501 | hex | `#151C2E` | `<h3 className="font-serif text-2xl font-bold text-[#151C2E]">` |
| 504 | hex | `#5B6472` | `<p className="text-xs text-[#5B6472]">` |
| 605 | hex | `#0F172A` | `style={{ color: "#0F172A" }}` |
| 608 | hex | `#0F172A` | `<span style={{ color: "#0F172A" }}>Take 3-Min Fit Test</span>` |

### `src\components\career\report\chapters\09Companies.tsx` - 10

| Line | Kind | Value | Context |
|---:|---|---|---|
| 103 | hex | `#161F33` | `<div className="rounded-2xl border border-white/10 bg-[#161F33] text-white shadow-lg overflow-hidden">` |
| 142 | hex | `#0B0F19` | `<div className="border-t border-white/10 p-5 space-y-4 bg-[#0B0F19]">` |
| 144 | hex | `#161F33` | `<div className="rounded-xl border border-white/10 bg-[#161F33] p-4 text-xs text-slate-300 space-y-2">` |
| 205 | hex | `#161F33` | `<li key={pt} className="rounded-xl border border-white/10 bg-[#161F33] p-3">` |
| 222 | hex | `#2563EB` | `className="inline-flex items-center gap-1.5 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold text-xs px-4 py-2 shadow-md transition-colors"` |
| 222 | hex | `#1d4ed8` | `className="inline-flex items-center gap-1.5 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold text-xs px-4 py-2 shadow-md transition-colors"` |
| 352 | hex | `#161F33` | `className="w-full rounded-xl border border-white/15 bg-[#161F33] px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-400"` |
| 370 | hex | `#161F33` | `className="w-full rounded-xl border border-white/15 bg-[#161F33] px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-400"` |
| 388 | hex | `#161F33` | `className="w-full rounded-xl border border-white/15 bg-[#161F33] px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-400"` |
| 417 | hex | `#161F33` | `<div className="rounded-2xl border border-white/10 bg-[#161F33] p-6 text-sm text-slate-300">` |

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

### `src\components\landing\Footer.tsx` - 9

| Line | Kind | Value | Context |
|---:|---|---|---|
| 27 | hex | `#38BDF8` | `const ACCENT = "#38BDF8";` |
| 31 | hex | `#0B0F19` | `"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19] rounded-sm";` |
| 38 | hex | `#0B0F19` | `className="tone-dark relative bg-[#0B0F19] text-white px-3 pb-3 pt-0 sm:px-5 sm:pb-5"` |
| 45 | hex | `#121723` | `<div className="relative mx-auto mb-0 max-w-7xl overflow-hidden border border-white/10 bg-[#121723] px-6 py-6 sm:px-8 rounded-t-2xl shadow-2xl">` |
| 66 | hex | `#2563EB` | `className={`inline-flex h-11 items-center justify-center rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] px-6 text-sm font-bold text-white shadow-lg transition-colors ${focusRing}`}` |
| 66 | hex | `#1d4ed8` | `className={`inline-flex h-11 items-center justify-center rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] px-6 text-sm font-bold text-white shadow-lg transition-colors ${focusRing}`}` |
| 99 | hex | `#0B0F19` | `<div className="mx-auto grid max-w-7xl grid-cols-1 border border-white/10 bg-[#0B0F19] text-white md:grid-cols-12 rounded-b-2xl shadow-2xl">` |
| 421 | hex | `#0B0F19` | `<nav aria-label="All programmes" className="border-t border-white/10 bg-[#0B0F19] p-6">` |
| 440 | hex | `#0B0F19` | `<div className="mx-auto max-w-7xl border border-t-0 border-white/10 bg-[#0B0F19] p-8 rounded-b-2xl">` |

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

### `src\components\career\CareerShell.tsx` - 8

| Line | Kind | Value | Context |
|---:|---|---|---|
| 18 | hex | `#000000` | `<main className="relative min-h-screen pb-4 sm:pb-6 bg-[#000000] text-white tone-dark selection:bg-sky-500 selection:text-white overflow-hidden flex flex-col">` |
| 24 | rgba | `rgba(56, 189, 248, 0.26)` | `radial-gradient(ellipse 90% 55% at 50% -10%, rgba(56, 189, 248, 0.26), rgba(2, 132, 199, 0.1) 50%, rgba(0, 0, 0, 0) 100%),` |
| 24 | rgba | `rgba(2, 132, 199, 0.1)` | `radial-gradient(ellipse 90% 55% at 50% -10%, rgba(56, 189, 248, 0.26), rgba(2, 132, 199, 0.1) 50%, rgba(0, 0, 0, 0) 100%),` |
| 24 | rgba | `rgba(0, 0, 0, 0)` | `radial-gradient(ellipse 90% 55% at 50% -10%, rgba(56, 189, 248, 0.26), rgba(2, 132, 199, 0.1) 50%, rgba(0, 0, 0, 0) 100%),` |
| 25 | rgba | `rgba(56, 189, 248, 0.18)` | `radial-gradient(ellipse 70% 40% at 50% 105%, rgba(56, 189, 248, 0.18), rgba(0, 0, 0, 0) 80%),` |
| 25 | rgba | `rgba(0, 0, 0, 0)` | `radial-gradient(ellipse 70% 40% at 50% 105%, rgba(56, 189, 248, 0.18), rgba(0, 0, 0, 0) 80%),` |
| 26 | rgba | `rgba(56, 189, 248, 0.12)` | `radial-gradient(ellipse 35% 50% at 0% 35%, rgba(56, 189, 248, 0.12), transparent 70%),` |
| 27 | rgba | `rgba(56, 189, 248, 0.12)` | `radial-gradient(ellipse 35% 50% at 100% 35%, rgba(56, 189, 248, 0.12), transparent 70%)` |

### `src\components\career\report\HeroSnapshot.tsx` - 8

| Line | Kind | Value | Context |
|---:|---|---|---|
| 68 | hex | `#121723` | `className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#121723] p-6 sm:p-8 md:p-10 shadow-2xl space-y-6"` |
| 112 | hex | `#2563EB` | `className="h-12 px-6 rounded-xl flex items-center justify-center gap-2 text-white font-bold bg-[#2563EB] hover:bg-[#1d4ed8] shadow-lg shadow-blue-600/30 transition-all hover:scale-` |
| 112 | hex | `#1d4ed8` | `className="h-12 px-6 rounded-xl flex items-center justify-center gap-2 text-white font-bold bg-[#2563EB] hover:bg-[#1d4ed8] shadow-lg shadow-blue-600/30 transition-all hover:scale-` |
| 130 | hex | `#161F33` | `<div className="rounded-xl border border-white/10 bg-[#161F33] p-4 space-y-1 shadow-lg hover:border-blue-500/30 transition-all">` |
| 137 | hex | `#161F33` | `<div className="rounded-xl border border-white/10 bg-[#161F33] p-4 space-y-1 shadow-lg hover:border-blue-500/30 transition-all">` |
| 146 | hex | `#161F33` | `<div className="rounded-xl border border-white/10 bg-[#161F33] p-4 space-y-1 shadow-lg hover:border-blue-500/30 transition-all">` |
| 153 | hex | `#161F33` | `<div className="rounded-xl border border-white/10 bg-[#161F33] p-4 space-y-1 shadow-lg hover:border-blue-500/30 transition-all">` |
| 162 | hex | `#161F33` | `<div className="rounded-xl border border-white/10 bg-[#161F33] p-4 space-y-1 shadow-lg hover:border-blue-500/30 transition-all">` |

### `src\components\courses\EnquiryForm.tsx` - 8

| Line | Kind | Value | Context |
|---:|---|---|---|
| 123 | hex | `#0A0F1E` | `className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-white text-[#0A0F1E] px-5 text-sm font-semibold hover:bg-white/90"` |
| 218 | hex | `#0A0F1E` | `className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#0A0F1E] hover:bg-white/90 disabled:opacity-60"` |
| 235 | rgba | `rgba(255,255,255,0.04)` | `background: rgba(255,255,255,0.04);` |
| 236 | rgba | `rgba(255,255,255,0.12)` | `border: 1px solid rgba(255,255,255,0.12);` |
| 238 | hex | `#fff` | `color: #fff;` |
| 242 | rgba | `rgba(255,255,255,0.35)` | `.enquiry-input:focus { border-color: rgba(255,255,255,0.35); background: rgba(255,255,255,0.07); }` |
| 242 | rgba | `rgba(255,255,255,0.07)` | `.enquiry-input:focus { border-color: rgba(255,255,255,0.35); background: rgba(255,255,255,0.07); }` |
| 243 | rgba | `rgba(255,255,255,0.35)` | `.enquiry-input::placeholder { color: rgba(255,255,255,0.35); }` |

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

### `src\components\landing\PageCTA.tsx` - 8

| Line | Kind | Value | Context |
|---:|---|---|---|
| 26 | hex | `#0F1B3A` | `<div className="tone-dark relative overflow-hidden rounded-3xl border border-slate-200/15 bg-[#0F1B3A] bg-gradient-to-br from-[#0F1B3A] to-[#111A2E] p-8 text-center sm:p-12">` |
| 26 | hex | `#0F1B3A` | `<div className="tone-dark relative overflow-hidden rounded-3xl border border-slate-200/15 bg-[#0F1B3A] bg-gradient-to-br from-[#0F1B3A] to-[#111A2E] p-8 text-center sm:p-12">` |
| 26 | hex | `#111A2E` | `<div className="tone-dark relative overflow-hidden rounded-3xl border border-slate-200/15 bg-[#0F1B3A] bg-gradient-to-br from-[#0F1B3A] to-[#111A2E] p-8 text-center sm:p-12">` |
| 31 | hex | `#9EC4FF` | `<p className="relative font-mono text-micro font-semibold uppercase tracking-[0.28em] text-[#9EC4FF]">` |
| 46 | hex | `#0056D2` | `className="inline-flex h-12 items-center rounded-md bg-[#0056D2] px-6 text-sm font-bold text-slate-50 shadow-sm transition-colors hover:bg-[#0046b0]"` |
| 46 | hex | `#0046b0` | `className="inline-flex h-12 items-center rounded-md bg-[#0056D2] px-6 text-sm font-bold text-slate-50 shadow-sm transition-colors hover:bg-[#0046b0]"` |
| 54 | hex | `#0056D2` | `className="inline-flex h-12 items-center rounded-md bg-[#0056D2] px-6 text-sm font-bold text-slate-50 shadow-sm transition-colors hover:bg-[#0046b0]"` |
| 54 | hex | `#0046b0` | `className="inline-flex h-12 items-center rounded-md bg-[#0056D2] px-6 text-sm font-bold text-slate-50 shadow-sm transition-colors hover:bg-[#0046b0]"` |

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

### `src\routes\career-engine.lead.tsx` - 8

| Line | Kind | Value | Context |
|---:|---|---|---|
| 210 | hex | `#1D4ED8` | `<span className="inline-flex items-center gap-1.5 rounded-full border border-[#1D4ED8]/30 bg-[#1D4ED8]/10 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-sk` |
| 210 | hex | `#1D4ED8` | `<span className="inline-flex items-center gap-1.5 rounded-full border border-[#1D4ED8]/30 bg-[#1D4ED8]/10 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-sk` |
| 211 | hex | `#1D4ED8` | `<Check className="h-3.5 w-3.5 text-[#1D4ED8]" /> Score ready · 30-sec unlock` |
| 235 | hex | `#1D4ED8` | `className={`h-1.5 rounded-full transition-all duration-300 ${ok ? "w-6 bg-[#1D4ED8]" : "w-3 bg-white/15"}`}` |
| 332 | hex | `#1D4ED8` | `className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/5 text-[#1D4ED8] focus:ring-[#1D4ED8]"` |
| 332 | hex | `#1D4ED8` | `className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/5 text-[#1D4ED8] focus:ring-[#1D4ED8]"` |
| 343 | hex | `#2563EB` | `className="text-sm h-12 px-4 w-full flex items-center justify-center gap-2 text-white font-bold rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] shadow-lg shadow-blue-600/30 transition-a` |
| 343 | hex | `#1d4ed8` | `className="text-sm h-12 px-4 w-full flex items-center justify-center gap-2 text-white font-bold rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] shadow-lg shadow-blue-600/30 transition-a` |

### `src\routes\courses.$slug.tsx` - 8

| Line | Kind | Value | Context |
|---:|---|---|---|
| 233 | hex | `#0A0F1E` | `<main className="min-h-app bg-[#0A0F1E] text-white">` |
| 293 | hex | `#0A0F1E` | `<main className="min-h-app bg-[#0A0F1E] text-white">` |
| 306 | hex | `#0A0F1E` | `className="inline-flex h-11 items-center rounded-full bg-white text-[#0A0F1E] px-5 text-sm font-semibold hover:bg-white/90"` |
| 613 | hex | `#FFFFFF` | `style={{ borderColor: RULE, background: "linear-gradient(145deg, #FFFFFF, #F8FAFC)" }}` |
| 613 | hex | `#F8FAFC` | `style={{ borderColor: RULE, background: "linear-gradient(145deg, #FFFFFF, #F8FAFC)" }}` |
| 795 | hex | `#0B0F19` | `<section className="border-t border-white/10 bg-[#0B0F19]">` |
| 814 | hex | `#2563EB` | `className="inline-flex h-11 items-center rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] px-6 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]` |
| 814 | hex | `#1d4ed8` | `className="inline-flex h-11 items-center rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] px-6 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]` |

### `src\routes\enrol.$tier.tsx` - 8

| Line | Kind | Value | Context |
|---:|---|---|---|
| 129 | hex | `#070B19` | `<div className="min-h-screen bg-[#070B19] text-white px-4 py-8 sm:px-6 lg:px-8">` |
| 134 | hex | `#0E172F` | `<div className="rounded-3xl border border-white/10 bg-[#0E172F] p-5 backdrop-blur-2xl shadow-xl">` |
| 172 | hex | `#0D1938` | `<div className="mt-5 flex items-center gap-3 rounded-2xl border border-blue-500/30 bg-[#0D1938] px-4.5 py-3.5 text-xs text-blue-200 font-medium shadow-md">` |
| 185 | hex | `#0E172F` | `className="mt-6 grid gap-5 rounded-3xl border border-white/10 bg-[#0E172F] p-6 sm:p-8 backdrop-blur-2xl shadow-2xl sm:grid-cols-2"` |
| 281 | hex | `#0E172F` | `<div className="rounded-3xl border border-white/10 bg-[#0E172F] p-6 sm:p-7 backdrop-blur-2xl shadow-xl space-y-5">` |
| 313 | hex | `#0E172F` | `<div className="rounded-3xl border border-white/10 bg-[#0E172F] p-5 backdrop-blur-2xl flex items-center gap-3.5 shadow-xl">` |
| 375 | hex | `#121B35` | `className="h-12 rounded-2xl border border-slate-700/80 bg-[#121B35] text-white font-medium placeholder:text-slate-400 focus:bg-[#162244] focus-visible:border-blue-500 focus-visible` |
| 375 | hex | `#162244` | `className="h-12 rounded-2xl border border-slate-700/80 bg-[#121B35] text-white font-medium placeholder:text-slate-400 focus:bg-[#162244] focus-visible:border-blue-500 focus-visible` |

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

### `src\components\courses\CourseGrid.tsx` - 7

| Line | Kind | Value | Context |
|---:|---|---|---|
| 68 | hex | `#707C90` | `<Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#707C90]" />` |
| 73 | hex | `#151C2E` | `className="h-12 w-full rounded-full border border-slate-200 bg-white pl-11 pr-10 text-sm font-semibold text-[#151C2E] placeholder:text-[#707C90] outline-none focus:border-blue-500 ` |
| 73 | hex | `#707C90` | `className="h-12 w-full rounded-full border border-slate-200 bg-white pl-11 pr-10 text-sm font-semibold text-[#151C2E] placeholder:text-[#707C90] outline-none focus:border-blue-500 ` |
| 79 | hex | `#707C90` | `className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#707C90] hover:text-[#151C2E]"` |
| 79 | hex | `#151C2E` | `className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#707C90] hover:text-[#151C2E]"` |
| 90 | hex | `#151C2E` | `className="h-12 min-w-0 flex-1 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-[#151C2E] outline-none focus:border-blue-500 shadow-sm sm:flex-initial"` |
| 100 | hex | `#151C2E` | `className="flex h-12 shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-[#151C2E] hover:bg-slate-50 shadow-sm sm:hidden"` |

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

### `src\components\landing\InstitutionalReachWall.tsx` - 7

| Line | Kind | Value | Context |
|---:|---|---|---|
| 96 | hex | `#060A12` | `className="py-12 sm:py-16 bg-[#060A12] border-y border-slate-800/80 text-slate-50 overflow-hidden relative"` |
| 130 | hex | `#060A12` | `<div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#060A12] to-transparent z-20 pointer-events-none" />` |
| 131 | hex | `#060A12` | `<div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#060A12] to-transparent z-20 pointer-events-none" />` |
| 139 | hex | `#0F172A` | `className="flex items-center gap-2 rounded-xl border border-slate-800 bg-[#0F172A] px-3.5 py-2 shadow-sm transition-all hover:border-sky-500/40 hover:bg-slate-900"` |
| 161 | hex | `#0F172A` | `className="flex items-center gap-2 rounded-xl border border-slate-800 bg-[#0F172A] px-3.5 py-2 shadow-sm transition-all hover:border-sky-500/40 hover:bg-slate-900"` |
| 184 | hex | `#0F172A` | `className="flex items-center gap-2 rounded-xl border border-slate-800 bg-[#0F172A] px-3.5 py-2 shadow-sm transition-all hover:border-sky-500/40 hover:bg-slate-900"` |
| 206 | hex | `#0F172A` | `className="flex items-center gap-2 rounded-xl border border-slate-800 bg-[#0F172A] px-3.5 py-2 shadow-sm transition-all hover:border-sky-500/40 hover:bg-slate-900"` |

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

### `src\components\landing\FinalCTA.tsx` - 6

| Line | Kind | Value | Context |
|---:|---|---|---|
| 18 | hex | `#707C90` | `<p className="text-xs font-medium uppercase tracking-widest text-[#707C90]">` |
| 22 | hex | `#151C2E` | `<h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#151C2E] tracking-tight">` |
| 23 | hex | `#8A6D1F` | `Start with the <span className="italic text-[#8A6D1F]">3-minute fit test</span>` |
| 26 | hex | `#5B6472` | `<p className="text-sm text-[#5B6472] max-w-xl mx-auto leading-relaxed">` |
| 61 | hex | `#151C2E` | `className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 px-6 text-xs font-semibold text-[#151C2E] transition-col` |
| 69 | hex | `#1D4ED8` | `<MessageCircle className="h-4 w-4 text-[#1D4ED8]" />` |

### `src\lib\design-tokens.ts` - 6

| Line | Kind | Value | Context |
|---:|---|---|---|
| 39 | hex | `#0E1730` | `// by the contrast audit (>=4.5:1 against #0E1730/#0A0F1E/#070B17).` |
| 39 | hex | `#0A0F1E` | `// by the contrast audit (>=4.5:1 against #0E1730/#0A0F1E/#070B17).` |
| 39 | hex | `#070B17` | `// by the contrast audit (>=4.5:1 against #0E1730/#0A0F1E/#070B17).` |
| 41 | rgba | `rgba(255,255,255,0.85)` | `textOnDarkStrong: "rgba(255,255,255,0.85)",` |
| 42 | rgba | `rgba(255,255,255,0.70)` | `textOnDarkMuted: "rgba(255,255,255,0.70)",` |
| 43 | rgba | `rgba(255,255,255,0.60)` | `textOnDarkSubtle: "rgba(255,255,255,0.60)", // floor for readable copy` |

### `src\routes\enrol.$tier.pay.tsx` - 6

| Line | Kind | Value | Context |
|---:|---|---|---|
| 128 | hex | `#070B17` | `<div className="min-h-screen bg-[#070B17] px-5 py-12 sm:px-6 motion-safe:animate-pulse">` |
| 591 | hex | `#3B82F6` | `themeColor: "#3B82F6",` |
| 1007 | hex | `#0B0F17` | `<div className="min-h-screen bg-[#0B0F17] text-white p-4 sm:p-6 lg:p-10">` |
| 1010 | hex | `#0F172A` | `<div className="rounded-3xl border border-slate-800 bg-[#0F172A] p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-3">` |
| 1034 | hex | `#0F172A` | `<div className="rounded-3xl border border-blue-500/40 bg-[#0F172A] p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-5 relative overflow-hidden">` |
| 1100 | hex | `#0F172A` | `<div className="rounded-3xl border border-slate-800 bg-[#0F172A] p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-5">` |

### `src\routes\moments.index.tsx` - 6

| Line | Kind | Value | Context |
|---:|---|---|---|
| 90 | hex | `#0a0c10` | `<div className="aspect-[4/3] w-full bg-[#0a0c10]/40 backdrop-blur-md shadow-sm">` |
| 181 | hex | `#0A1024` | `? "tone-dark bg-[#0A1024] text-white hover:bg-[#0A1024]/90"` |
| 181 | hex | `#0A1024` | `? "tone-dark bg-[#0A1024] text-white hover:bg-[#0A1024]/90"` |
| 182 | hex | `#0A1024` | `: "tone-light bg-white text-[#0A1024] hover:bg-white/90",` |
| 239 | rgba | `rgba(16,185,129,0.14)` | `className="relative aspect-[4/3] w-full bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.14),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(59,130,246,0.12),transpa` |
| 239 | rgba | `rgba(59,130,246,0.12)` | `className="relative aspect-[4/3] w-full bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.14),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(59,130,246,0.12),transpa` |

### `src\components\career\report\chapters\13SalaryTrajectory.tsx` - 5

| Line | Kind | Value | Context |
|---:|---|---|---|
| 153 | hex | `#2563EB` | `? "bg-[#2563EB] text-white shadow-md shadow-blue-500/20"` |
| 182 | hex | `#161F33` | `<div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-[#161F33] shadow-2xl">` |
| 217 | hex | `#38BDF8` | `<td className="px-4 py-3.5 text-right font-mono font-bold text-[#38BDF8] text-base tabular-nums">` |
| 232 | hex | `#0B0F19` | `<div className="mt-3 rounded-xl border border-white/10 bg-[#0B0F19] p-3.5 text-xs text-slate-300">` |
| 239 | hex | `#161F33` | `<div className="mt-6 space-y-3 rounded-2xl border border-white/10 bg-[#161F33] p-5 shadow-lg">` |

### `src\components\courses\sections\ProofBlock.tsx` - 5

| Line | Kind | Value | Context |
|---:|---|---|---|
| 54 | rgba | `rgba(255,255,255,0.05)` | `background: "rgba(255,255,255,0.05)",` |
| 55 | rgba | `rgba(255,255,255,0.15)` | `borderColor: "rgba(255,255,255,0.15)",` |
| 79 | rgba | `rgba(255,255,255,0.05)` | `background: "rgba(255,255,255,0.05)",` |
| 80 | rgba | `rgba(255,255,255,0.15)` | `borderColor: "rgba(255,255,255,0.15)",` |
| 87 | hex | `#0A0F1E` | `<div className="tone-light rounded-2xl border border-white/10 bg-white p-2 text-[#0A0F1E] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] sm:p-6">` |

### `src\components\landing\ApplicationForm.tsx` - 5

| Line | Kind | Value | Context |
|---:|---|---|---|
| 498 | rgba | `rgba(15,27,61,0.15)` | `style={{ background: step === 2 ? "var(--primary)" : "rgba(15,27,61,0.15)" }}` |
| 519 | hex | `#161F33` | `className={`mt-1.5 h-12 w-full rounded-xl border border-white/20 bg-[#161F33] px-3.5 text-sm font-semibold text-white placeholder:text-slate-400 outline-none transition-colors ${` |
| 559 | hex | `#161F33` | `className={`mt-1.5 h-12 w-full rounded-xl border border-white/20 bg-[#161F33] px-3.5 text-sm font-semibold text-white outline-none transition-colors ${` |
| 565 | hex | `#161F33` | `<option value="" disabled className="bg-[#161F33] text-slate-300">` |
| 569 | hex | `#161F33` | `<option key={o} value={o} className="bg-[#161F33] text-white">` |

### `src\components\landing\EtvVideoEmbed.tsx` - 5

| Line | Kind | Value | Context |
|---:|---|---|---|
| 104 | hex | `#0a0c10` | `<span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-[#0a0c10]/70 px-2.5 py-1 font-mono text-micro font-semibold uppercase tracking-[0.18em] text` |
| 116 | hex | `#0a0c10` | `<div className="tone-dark relative aspect-video w-full bg-[#0a0c10]">{fallbackPoster}</div>` |
| 122 | hex | `#0a0c10` | `<div className="tone-dark relative aspect-video w-full bg-[#0a0c10]">` |
| 154 | hex | `#0a0c10` | `<span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-[#0a0c10]/70 px-2.5 py-1 font-mono text-micro font-semibold uppercase tracking-[0.18em] text` |
| 164 | hex | `#0a0c10` | `<div className="tone-dark relative aspect-video w-full bg-[#0a0c10]">` |

### `src\components\transition\SpaceLoader.tsx` - 5

| Line | Kind | Value | Context |
|---:|---|---|---|
| 18 | hex | `#070B16` | `className={`pointer-events-none fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#070B16] transition-opacity duration-500 ${` |
| 29 | hex | `#60A5FA` | `"radial-gradient(60% 50% at 50% 45%, color-mix(in oklab, var(--primary-glow, #60A5FA) 22%, transparent), transparent 70%)",` |
| 51 | hex | `#60A5FA` | `"radial-gradient(circle, color-mix(in oklab, var(--primary-glow, #60A5FA) 50%, transparent) 0%, transparent 70%)",` |
| 66 | hex | `#60A5FA` | `stroke="color-mix(in oklab, var(--primary-glow, #60A5FA) 60%, transparent)"` |
| 71 | hex | `#F5C04A` | `<circle cx="50" cy="4" r="2" fill="var(--gold, #F5C04A)" />` |

### `src\components\courses\CourseCard.tsx` - 4

| Line | Kind | Value | Context |
|---:|---|---|---|
| 41 | hex | `#0a0c10` | `#0a0c10` |
| 56 | hex | `#0a0c10` | `className="absolute inset-0 z-20 bg-gradient-to-t from-[#0a0c10]/80 via-transparent to-transparent"` |
| 59 | hex | `#0a0c10` | `className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-[#0a0c10]/80 px-2.5 py-1 shadow-sm ring-1 backdrop-blur ${theme.ring}`}` |
| 91 | hex | `#0a0c10` | `<div className="grid grid-cols-2 gap-3 rounded-xl border border-white/10 bg-[#0a0c10]/40 backdrop-blur-md shadow-xl ring-1 ring-black/20 p-4">` |

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
| 100 | hex | `#161F33` | `className="h-11 w-full rounded-xl border border-white/20 bg-[#161F33] px-3.5 text-sm font-medium text-white placeholder:text-slate-400 focus:border-sky-400 focus-ring-sky shadow-in` |
| 119 | hex | `#161F33` | `className="h-11 w-full rounded-xl border border-white/20 bg-[#161F33] px-3.5 text-sm font-medium text-white placeholder:text-slate-400 focus:border-sky-400 focus-ring-sky shadow-in` |
| 131 | hex | `#2563EB` | `className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] px-4 text-xs font-bold text-white shadow-lg transition-colors disabl` |
| 131 | hex | `#1d4ed8` | `className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] px-4 text-xs font-bold text-white shadow-lg transition-colors disabl` |

### `src\components\landing\GovtTrustBlock.tsx` - 4

| Line | Kind | Value | Context |
|---:|---|---|---|
| 29 | hex | `#0B1325` | `<div className="tone-dark w-full border-y border-slate-200/10 bg-[#0B1325]">` |
| 35 | rgba | `rgba(245,196,81,0.10)` | `style={{ background: "rgba(245,196,81,0.10)" }}` |
| 40 | hex | `#7FB0D8` | `<p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-[#7FB0D8]">` |
| 60 | hex | `#7FB0D8` | `<Icon className="h-3.5 w-3.5 text-[#7FB0D8]" />` |

### `src\components\track\TrackDomainGrid.tsx` - 4

| Line | Kind | Value | Context |
|---:|---|---|---|
| 53 | hex | `#0a0c10` | `// labels to hit AA. bg-[#0a0c10]/40 backdrop-blur-md shadow-sm over a mid-gray gradient composites` |
| 54 | hex | `#808494` | `// to ~#808494, which drops white/55 to 1.26:1.` |
| 55 | hex | `#0a0c10` | `metricBox: "border-white/15 bg-[#0a0c10]/65 backdrop-blur-sm",` |
| 96 | hex | `#0a0c10` | `className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0a0c10]/40 text-h4 ring-1 sm:h-12 sm:w-12 sm:text-h3 ${t.ring}`}` |

### `src\routes\admin.leads.tsx` - 4

| Line | Kind | Value | Context |
|---:|---|---|---|
| 376 | hex | `#0a0c10` | `className="absolute inset-0 bg-[#0a0c10]/60"` |
| 380 | hex | `#0b0f1c` | `<aside className="relative ml-auto h-full w-full max-w-xl overflow-y-auto bg-[#0b0f1c] p-6 text-foreground shadow-2xl">` |
| 446 | hex | `#0a0c10` | `<pre className="mt-2 max-h-64 overflow-auto rounded bg-[#0a0c10]/50 p-3 text-micro leading-snug text-foreground">` |
| 454 | hex | `#0a0c10` | `<pre className="mt-2 max-h-64 overflow-auto rounded bg-[#0a0c10]/50 p-3 text-micro leading-snug text-foreground">` |

### `src\routes\admin.results.tsx` - 4

| Line | Kind | Value | Context |
|---:|---|---|---|
| 468 | hex | `#0a0c10` | `<div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0c10]/70 p-4">` |
| 469 | hex | `#0b1020` | `<div className="w-full max-w-md rounded-2xl border border-border bg-[#0b1020] p-6 text-foreground">` |
| 595 | hex | `#0a0c10` | `<button aria-label="Close" onClick={onClose} className="flex-1 bg-[#0a0c10]/60" />` |
| 596 | hex | `#0b1020` | `<aside className="w-full max-w-lg overflow-y-auto bg-[#0b1020] border-l border-border p-6">` |

### `src\routes\admin.seo.tsx` - 4

| Line | Kind | Value | Context |
|---:|---|---|---|
| 476 | hex | `#0a0c10` | `className="w-28 rounded-md border border-border bg-[#0a0c10]/40 px-2 py-1 text-foreground"` |
| 489 | hex | `#0a0c10` | `className="w-24 rounded-md border border-border bg-[#0a0c10]/40 px-2 py-1 text-foreground"` |
| 821 | hex | `#0a0c10` | `<code className="rounded bg-[#0a0c10]/40 px-1 py-0.5 text-xs">/sitemap.xml</code> to` |
| 914 | hex | `#0a0c10` | `className="w-64 rounded-full border border-border bg-[#0a0c10]/40 px-3 py-2 text-sm text-foreground"` |

### `src\routes\career-engine.enrol.tsx` - 4

| Line | Kind | Value | Context |
|---:|---|---|---|
| 266 | hex | `#0A0F1E` | `? "border-primary-glow bg-primary-glow text-[#0A0F1E]"` |
| 464 | rgb | `rgb(255 255 255 / 0.10)` | `border: 1px solid rgb(255 255 255 / 0.10);` |
| 465 | rgb | `rgb(255 255 255 / 0.03)` | `background: rgb(255 255 255 / 0.03);` |
| 470 | rgb | `rgb(255 255 255 / 0.30)` | `.ce-input::placeholder { color: rgb(255 255 255 / 0.30); }` |

### `src\routes\curriculum.tsx` - 4

| Line | Kind | Value | Context |
|---:|---|---|---|
| 46 | hex | `#0a0c10` | `<div className="tone-dark min-h-dvh bg-[#0a0c10] text-white">` |
| 49 | rgba | `rgba(59,130,246,0.18)` | `<div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(59,130,246,0.18),transparent_70%)]" />` |
| 81 | hex | `#06080d` | `? "text-[#06080d]"` |
| 155 | hex | `#0a0c10` | `className={`h-12 w-12 rounded-full flex items-center justify-center border-2 border-[#0a0c10] shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl ${t` |

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

### `src\components\career\v2\ResultNextStepCard.tsx` - 3

| Line | Kind | Value | Context |
|---:|---|---|---|
| 19 | rgba | `rgba(255,255,255,0.08)` | `<section className="mt-10 rounded-[28px] border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-5 shadow-[0_24px_80px_-40px_rgba(0,0,0,` |
| 19 | rgba | `rgba(255,255,255,0.03)` | `<section className="mt-10 rounded-[28px] border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-5 shadow-[0_24px_80px_-40px_rgba(0,0,0,` |
| 32 | hex | `#091425` | `<div className="rounded-2xl border border-white/10 bg-[#091425]/80 px-4 py-3 text-sm text-white/80">` |

### `src\components\career\v2\StickyResultCta.tsx` - 3

| Line | Kind | Value | Context |
|---:|---|---|---|
| 30 | hex | `#0B0F19` | `<div className="rounded-2xl border border-white/15 bg-[#0B0F19]/95 p-3.5 shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">` |
| 60 | hex | `#2563EB` | `className="flex-1 text-xs px-5 py-3 rounded-xl inline-flex flex-col items-center justify-center text-white font-bold bg-[#2563EB] hover:bg-[#1d4ed8] shadow-lg shadow-blue-600/30 tr` |
| 60 | hex | `#1d4ed8` | `className="flex-1 text-xs px-5 py-3 rounded-xl inline-flex flex-col items-center justify-center text-white font-bold bg-[#2563EB] hover:bg-[#1d4ed8] shadow-lg shadow-blue-600/30 tr` |

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

### `src\components\landing\TaskPartnershipBlock.tsx` - 3

| Line | Kind | Value | Context |
|---:|---|---|---|
| 93 | hex | `#060A12` | `className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#060A12] border-y border-slate-800/80 text-slate-50 overflow-hidden relative"` |
| 123 | hex | `#0F172A` | `<div className="rounded-2xl border border-slate-800 bg-[#0F172A] p-3 shadow-2xl flex flex-col justify-between h-full">` |
| 148 | hex | `#0F172A` | `<div className="rounded-2xl border border-slate-800 bg-[#0F172A] p-6 space-y-6 shadow-xl flex-1 flex flex-col justify-between">` |

### `src\components\track\TrackHeroPanel.tsx` - 3

| Line | Kind | Value | Context |
|---:|---|---|---|
| 58 | hex | `#0a0c10` | `className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0a0c10]/40 text-h3 ring-1 sm:h-14 sm:w-14 sm:text-h2 ${t.ring}`}` |
| 100 | hex | `#0a0c10` | `<div className="mt-4 flex items-start gap-2 rounded-lg border border-white/10 bg-[#0a0c10]/40 backdrop-blur-md shadow-xl ring-1 ring-black/20 p-3 text-meta leading-relaxed text-whi` |
| 116 | hex | `#0a0c10` | `<div className="min-w-0 rounded-lg border border-white/10 bg-[#0a0c10]/40 backdrop-blur-md shadow-xl ring-1 ring-black/20 px-2.5 py-2 sm:px-3">` |

### `src\hooks\useAdminErrorReporter.ts` - 3

| Line | Kind | Value | Context |
|---:|---|---|---|
| 7 | hex | `#418` | `* Also flags React hydration mismatches (#418/#423/#425) explicitly.` |
| 7 | hex | `#423` | `* Also flags React hydration mismatches (#418/#423/#425) explicitly.` |
| 7 | hex | `#425` | `* Also flags React hydration mismatches (#418/#423/#425) explicitly.` |

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

### `src\routes\enrol.tsx` - 3

| Line | Kind | Value | Context |
|---:|---|---|---|
| 32 | hex | `#070B19` | `<main className="min-h-screen bg-[#070B19] text-white w-full">` |
| 33 | hex | `#0A1024` | `<header className="border-b border-white/10 bg-[#0A1024]/90 backdrop-blur-xl w-full">` |
| 36 | hex | `#070B17` | `<div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-[#070B17] ring-1 ring-white/20">` |

### `src\routes\industry.$role.$city.tsx` - 3

| Line | Kind | Value | Context |
|---:|---|---|---|
| 113 | hex | `#070A14` | `<div className="min-h-dvh animate-pulse bg-[#070A14] px-4 py-16 sm:px-6">` |
| 141 | hex | `#070A14` | `<div className="min-h-dvh bg-[#070A14] text-white">` |
| 180 | hex | `#0a0c10` | `className="rounded-xl border border-white/10 bg-[#0a0c10]/40 backdrop-blur-md shadow-xl ring-1 ring-black/20 p-4"` |

### `src\routes\industry.$role.tsx` - 3

| Line | Kind | Value | Context |
|---:|---|---|---|
| 63 | hex | `#070A14` | `<div className="min-h-dvh motion-safe:animate-pulse bg-[#070A14] px-4 py-16 sm:px-6">` |
| 88 | hex | `#070A14` | `<div className="min-h-dvh bg-[#070A14] text-white">` |
| 198 | hex | `#1A1300` | `className="inline-flex h-11 items-center gap-1.5 rounded-full bg-gold px-5 text-sm font-bold text-[#1A1300] hover:bg-gold/90"` |

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

### `src\components\career\cards\primitives.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 49 | rgba | `rgba(255,255,255,0.55)` | `"radial-gradient(rgba(255,255,255,0.55) 0.5px, transparent 0.5px), radial-gradient(rgba(255,255,255,0.35) 0.5px, transparent 0.5px)",` |
| 49 | rgba | `rgba(255,255,255,0.35)` | `"radial-gradient(rgba(255,255,255,0.55) 0.5px, transparent 0.5px), radial-gradient(rgba(255,255,255,0.35) 0.5px, transparent 0.5px)",` |

### `src\components\career\report\CareerFitReportV3.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 181 | hex | `#121723` | `<section className="rounded-2xl border border-white/10 bg-[#121723] p-6 shadow-2xl space-y-4">` |
| 202 | hex | `#161F33` | `className="rounded-xl border border-white/10 bg-[#161F33] p-4 space-y-1 shadow-md"` |

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
| 44 | hex | `#0A66C2` | `className="mt-6 w-full gap-2 rounded-full bg-[#0A66C2] text-white hover:bg-[#004182]"` |
| 44 | hex | `#004182` | `className="mt-6 w-full gap-2 rounded-full bg-[#0A66C2] text-white hover:bg-[#004182]"` |

### `src\components\feedback\AiFeedbackPrompt.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 76 | hex | `#0B1426` | `"rounded-2xl border border-white/15 bg-[#0B1426] p-4 text-sm text-white/85 shadow-lg " +` |
| 117 | hex | `#0a0c10` | `className="mt-3 w-full resize-none rounded-lg border border-white/10 bg-[#0a0c10]/40 backdrop-blur-md shadow-xl ring-1 ring-black/20 p-2 text-xs text-white/85 placeholder:text-whit` |

### `src\components\landing\DayInTheLifeStrip.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 79 | hex | `#1E40AF` | `<span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[#1E40AF] text-slate-50 ring-1 ring-white/40 shadow-[0_4px_14px_-6px` |
| 87 | hex | `#7fb0d8` | `<p className="mt-4 font-mono text-micro font-semibold uppercase tracking-[0.2em] text-[#7fb0d8]">` |

### `src\components\landing\ParentSection.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 122 | hex | `#0F1A30` | `<div className="overflow-hidden rounded-3xl border border-slate-200/10 bg-gradient-to-br from-[#0F1A30] to-[#0B1325] p-6 sm:p-10">` |
| 122 | hex | `#0B1325` | `<div className="overflow-hidden rounded-3xl border border-slate-200/10 bg-gradient-to-br from-[#0F1A30] to-[#0B1325] p-6 sm:p-10">` |

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

### `src\lib\dev\css-hmr-probe.ts` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 26 | hex | `#0d9488` | `"color:#0d9488;font-weight:bold;",` |
| 35 | hex | `#0d9488` | `"color:#0d9488;font-weight:bold;",` |

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

### `src\routes\career-engine.start.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 383 | hex | `#2563EB` | `className="inline-flex h-12 sm:min-w-[220px] items-center justify-center rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] px-6 text-sm font-bold text-white shadow-lg shadow-blue-600/30 t` |
| 383 | hex | `#1d4ed8` | `className="inline-flex h-12 sm:min-w-[220px] items-center justify-center rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] px-6 text-sm font-bold text-white shadow-lg shadow-blue-600/30 t` |

### `src\routes\cohorts.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 27 | hex | `#0A0F1E` | `<main className="tone-dark min-h-app bg-[#0A0F1E] text-white">` |
| 65 | hex | `#0a1229` | `style={{ color: "#0a1229", boxShadow: "var(--shadow-glow)" }}` |

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

### `src\routes\verify.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 67 | hex | `#0A0F1E` | `<main className="tone-dark min-h-app bg-[#0A0F1E] text-white">` |
| 83 | hex | `#0b1220` | `className="h-12 flex-1 rounded-full border border-white/10 bg-[#0b1220] px-5 text-sm text-white outline-none ring-primary/30 placeholder:text-white/80 focus:ring-2"` |

### `src\routes\_authenticated\employer.console.tsx` - 2

| Line | Kind | Value | Context |
|---:|---|---|---|
| 50 | hex | `#0a0c10` | `<div className="tone-dark bg-[#0a0c10] min-h-screen flex items-center justify-center">` |
| 114 | hex | `#0a0c10` | `<div className="tone-dark bg-[#0a0c10] min-h-screen text-white font-grotesk">` |

### `src\components\career\cards\FlagshipTrackCard.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 58 | rgb | `rgb(226 232 240)` | `stroke="rgb(226 232 240)"` |

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
| 138 | hex | `#0A66C2` | `className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#0A66C2] px-3 py-2.5 text-meta font-bold text-white shadow-sm transition hover:brightness-110 motion-red` |

### `src\components\career\v2\RoleLadder.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 103 | hex | `#0b1117` | `<DialogContent className="max-w-2xl border-white/15 bg-[#0b1117] text-white">` |

### `src\components\career\v2\SevenDayPlan.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 61 | hex | `#06080d` | `className="tone-dark mt-8 overflow-hidden rounded-3xl border border-white/10 bg-[#06080d] p-5 text-white sm:p-8"` |

### `src\components\common\TaskLogo.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 27 | hex | `#0B1220` | `color: "#0B1220",` |

### `src\components\courses\BrochureButton.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 48 | hex | `#0f172a` | `doc.setFillColor(15, 23, 42); // #0f172a` |

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

### `src\components\landing\DemandUnlockStrip.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 130 | hex | `#7fb0d8` | `className="inline-flex items-center gap-1 text-caption font-semibold text-[#7fb0d8] hover:text-primary"` |

### `src\components\landing\FAQ.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 112 | hex | `#0a0c10` | `<Section id="faq" size="lg" containerSize="md" className="tone-dark bg-[#0a0c10]">` |

### `src\components\landing\HiringPartnerWall.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 34 | hex | `#0a0c10` | `className="tone-dark relative overflow-hidden bg-[#0a0c10] py-12 sm:py-16"` |

### `src\components\landing\InterviewRoadmap.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 43 | hex | `#0a1430` | `className="tone-dark bg-[#0a1430] py-16 sm:py-20 text-slate-50"` |

### `src\components\landing\MobileHeroProofCard.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 25 | hex | `#0a0c10` | `<div className="absolute left-2.5 top-2.5 inline-flex items-center gap-1.5 rounded-full bg-[#0a0c10]/70 px-2.5 py-1 font-mono text-micro font-semibold uppercase tracking-[0.18em] t` |

### `src\components\landing\NationalMediaBlock.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 32 | hex | `#0a0c10` | `<figure className="overflow-hidden rounded-2xl border border-slate-200/10 bg-[#0a0c10] ring-1 ring-white/5">` |

### `src\components\landing\SectionHeader.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 44 | hex | `#8A6A14` | `<span aria-hidden className="block h-px w-10 bg-[#8A6A14]/50" />` |

### `src\components\Prime60WaitlistForm.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 236 | hex | `#1a1305` | `? "bg-yellow-400 text-[#1a1305] hover:brightness-110"` |

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

### `src\features\applications\components\apply\ApplyShell.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 56 | hex | `#070B17` | `<div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-[#070B17] ring-1 ring-ink/10">` |

### `src\lib\razorpayCheckout.ts` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 71 | hex | `#3B82F6` | `theme: { color: args.themeColor ?? "#3B82F6" },` |

### `src\lib\seo\rootHead.ts` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 32 | hex | `#0A0F1E` | `{ name: "theme-color", content: "#0A0F1E" },` |

### `src\routes\about.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 51 | hex | `#0A0F1E` | `<main className="tone-dark min-h-app bg-[#0A0F1E] text-white">` |

### `src\routes\acri.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 51 | hex | `#F7F9FC` | `<main className="min-h-app bg-[#F7F9FC] pb-24 text-ink">` |

### `src\routes\admin.analytics-alerts.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 159 | hex | `#0a0c10` | `<pre className="mt-2 overflow-x-auto rounded bg-[#0a0c10]/40 backdrop-blur-md shadow-sm px-2 py-1.5 text-micro text-foreground">` |

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
| 234 | hex | `#0a0c10` | `className="min-w-[280px] flex-1 rounded-full border border-border bg-[#0a0c10]/40 px-3 py-2 text-sm text-foreground"` |

### `src\routes\admin.thumbnails.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 233 | hex | `#0a0c10` | `<div className="relative aspect-[16/9] w-full bg-[#0a0c10]/40">` |

### `src\routes\build.$slug.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 386 | hex | `#0a0c10` | `<div className="grid h-8 w-8 flex-shrink-0 place-items-center rounded bg-[#0a0c10]/5 text-micro font-bold text-black/60">` |

### `src\routes\copilot.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 64 | hex | `#050A15` | `<div className="flex min-h-dvh flex-col bg-[#050A15] text-slate-300">` |

### `src\routes\dev.cards.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 128 | hex | `#0B1220` | `? "tone-dark min-h-dvh bg-[#0B1220] px-4 py-10 sm:px-8"` |

### `src\routes\faq.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 30 | hex | `#0a1430` | `<section className="tone-dark bg-[#0a1430] py-14 text-white sm:py-20">` |

### `src\routes\industry.index.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 27 | hex | `#070A14` | `<div className="min-h-dvh bg-[#070A14] text-white">` |

### `src\routes\legal.privacy.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 26 | hex | `#0A0F1E` | `<main className="tone-dark min-h-app bg-[#0A0F1E] text-white">` |

### `src\routes\legal.terms.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 26 | hex | `#0A0F1E` | `<main className="tone-dark min-h-app bg-[#0A0F1E] text-white">` |

### `src\routes\placements.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 99 | hex | `#0A0F1E` | `<div className="tone-dark min-h-dvh bg-[#0A0F1E] text-white">` |

### `src\routes\r.artifact.$token.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 78 | hex | `#F7F9FC` | `<main className="min-h-app bg-[#F7F9FC] pb-24 text-ink">` |

### `src\routes\recruiters.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 73 | hex | `#F7F9FC` | `<main className="min-h-app bg-[#F7F9FC] pb-24 text-ink">` |

### `src\routes\refund.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 47 | hex | `#0A0F1E` | `<main className="tone-dark min-h-app bg-[#0A0F1E] text-white">` |

### `src\routes\tpos.tsx` - 1

| Line | Kind | Value | Context |
|---:|---|---|---|
| 42 | hex | `#F7F9FC` | `<main className="min-h-app bg-[#F7F9FC] pb-24 text-ink">` |

