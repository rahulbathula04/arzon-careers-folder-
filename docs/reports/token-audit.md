# Token audit report

_Generated 2026-07-04T05:35:27.292Z_

- **Total raw palette literals:** 550
- **Files affected:** 115
- **Scope:** `src/**` (excluding `styles.css`, `data/trackTheme`, generated files, and lines annotated `@allow-raw-palette`).

## How to fix

Replace hex/rgb literals with a semantic token from `src/styles.css` (`--brand`, `--ink`, `--surface-1`, `--flag-in-*`, etc.) or a track-theme accessor from `@/data/trackTheme`. When a raw value is genuinely required (e.g. the tricolour flag glyph), add a trailing comment `/* @allow-raw-palette <reason> */` on the same line.

## Findings

### `src/components/landing/Pricing.tsx` — 44

| Line | Kind | Value                   | Context                                                                                                                                                                                |
| ---: | ---- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  118 | hex  | `#0d7a5f`               | `const sideAccent = isElite ? "#0d7a5f" : "#3b6fa0";`                                                                                                                                  |
|  118 | hex  | `#3b6fa0`               | `const sideAccent = isElite ? "#0d7a5f" : "#3b6fa0";`                                                                                                                                  |
|  129 | rgba | `rgba(201,168,76,0.32)` | `"radial-gradient(60% 60% at 50% 30%, rgba(201,168,76,0.32), rgba(59,111,160,0.18) 40%, transparent 75%)",`                                                                            |
|  129 | rgba | `rgba(59,111,160,0.18)` | `"radial-gradient(60% 60% at 50% 30%, rgba(201,168,76,0.32), rgba(59,111,160,0.18) 40%, transparent 75%)",`                                                                            |
|  137 | hex  | `#c9a84c`               | `? "card-dark text-white ring-1 ring-[#c9a84c]/30"`                                                                                                                                    |
|  147 | hex  | `#c9a84c`               | `? "linear-gradient(90deg, #c9a84c 0%, #f0d78c 50%, #c9a84c 100%)"`                                                                                                                    |
|  147 | hex  | `#f0d78c`               | `? "linear-gradient(90deg, #c9a84c 0%, #f0d78c 50%, #c9a84c 100%)"`                                                                                                                    |
|  147 | hex  | `#c9a84c`               | `? "linear-gradient(90deg, #c9a84c 0%, #f0d78c 50%, #c9a84c 100%)"`                                                                                                                    |
|  154 | hex  | `#c9a84c`               | `<span className="inline-flex items-center gap-1.5 rounded-full bg-[#c9a84c]/15 px-3 py-1 font-mono text-micro font-bold uppercase tracking-[0.22em] text-[#f0d78c] ring-1 ring-[#c9a` |
|  154 | hex  | `#f0d78c`               | `<span className="inline-flex items-center gap-1.5 rounded-full bg-[#c9a84c]/15 px-3 py-1 font-mono text-micro font-bold uppercase tracking-[0.22em] text-[#f0d78c] ring-1 ring-[#c9a` |
|  154 | hex  | `#c9a84c`               | `<span className="inline-flex items-center gap-1.5 rounded-full bg-[#c9a84c]/15 px-3 py-1 font-mono text-micro font-bold uppercase tracking-[0.22em] text-[#f0d78c] ring-1 ring-[#c9a` |
|  155 | hex  | `#f0d78c`               | `<Star className="h-3 w-3 fill-[#f0d78c]" /> {t.eyebrow}`                                                                                                                              |
|  189 | hex  | `#c9a84c`               | `<span className="rounded-full bg-[#c9a84c] px-2.5 py-0.5 font-mono text-micro font-bold uppercase tracking-wider text-primary! shadow-sm">`                                           |
|  197 | hex  | `#1e3a5f`               | `isAnchor ? "text-base mb-5 text-white/70!" : "text-sm mb-5 text-[#1e3a5f]/75!"`                                                                                                       |
|  207 | hex  | `#c9a84c`               | `? "bg-[#c9a84c]/12 ring-1 ring-[#c9a84c]/30"`                                                                                                                                         |
|  207 | hex  | `#c9a84c`               | `? "bg-[#c9a84c]/12 ring-1 ring-[#c9a84c]/30"`                                                                                                                                         |
|  212 | hex  | `#f0d78c`               | `className={`mt-0.5 h-4 w-4 shrink-0 ${isAnchor ? "text-[#f0d78c]!" : ""}`}`                                                                                                           |
|  226 | hex  | `#f0d78c`               | `isAnchor ? "text-[#f0d78c]!" : ""`                                                                                                                                                    |
|  248 | hex  | `#1e3a5f`               | `isAnchor ? "text-white/55!" : "text-[#1e3a5f]/55!"`                                                                                                                                   |
|  255 | hex  | `#1e3a5f`               | `isAnchor ? "text-white/75!" : "text-[#1e3a5f]/75!"`                                                                                                                                   |
|  306 | hex  | `#1e3a5f`               | `<p className="-mt-3 mb-6 text-micro italic text-[#1e3a5f]/55!">{t.lossNote}</p>`                                                                                                      |
|  350 | hex  | `#0056D2`               | `? "border-[#0056D2]/25 bg-[#EAF2FF] text-[#0056D2]! hover:border-[#0056D2] hover:bg-[#dceaff]"`                                                                                       |
|  350 | hex  | `#EAF2FF`               | `? "border-[#0056D2]/25 bg-[#EAF2FF] text-[#0056D2]! hover:border-[#0056D2] hover:bg-[#dceaff]"`                                                                                       |
|  350 | hex  | `#0056D2`               | `? "border-[#0056D2]/25 bg-[#EAF2FF] text-[#0056D2]! hover:border-[#0056D2] hover:bg-[#dceaff]"`                                                                                       |
|  350 | hex  | `#0056D2`               | `? "border-[#0056D2]/25 bg-[#EAF2FF] text-[#0056D2]! hover:border-[#0056D2] hover:bg-[#dceaff]"`                                                                                       |
|  350 | hex  | `#dceaff`               | `? "border-[#0056D2]/25 bg-[#EAF2FF] text-[#0056D2]! hover:border-[#0056D2] hover:bg-[#dceaff]"`                                                                                       |
|  351 | hex  | `#0056D2`               | `: "border-[#0056D2]/25 bg-[#EAF2FF] text-[#0056D2]! hover:border-[#0056D2] hover:bg-[#dceaff]"`                                                                                       |
|  351 | hex  | `#EAF2FF`               | `: "border-[#0056D2]/25 bg-[#EAF2FF] text-[#0056D2]! hover:border-[#0056D2] hover:bg-[#dceaff]"`                                                                                       |
|  351 | hex  | `#0056D2`               | `: "border-[#0056D2]/25 bg-[#EAF2FF] text-[#0056D2]! hover:border-[#0056D2] hover:bg-[#dceaff]"`                                                                                       |
|  351 | hex  | `#0056D2`               | `: "border-[#0056D2]/25 bg-[#EAF2FF] text-[#0056D2]! hover:border-[#0056D2] hover:bg-[#dceaff]"`                                                                                       |
|  351 | hex  | `#dceaff`               | `: "border-[#0056D2]/25 bg-[#EAF2FF] text-[#0056D2]! hover:border-[#0056D2] hover:bg-[#dceaff]"`                                                                                       |
|  365 | hex  | `#0f1b3d`               | `<div className="flex items-center gap-3 rounded-xl bg-white/70 px-4 py-3 ring-1 ring-[#0f1b3d]/10">`                                                                                  |
|  369 | hex  | `#1e3a5f`               | `<div className="text-micro text-[#1e3a5f]/70">{sub}</div>`                                                                                                                            |
|  394 | hex  | `#1e3a5f`               | `<span className="font-mono text-micro font-semibold uppercase tracking-[0.2em] text-[#1e3a5f]/80">`                                                                                   |
|  399 | hex  | `#e8edf3`               | `<div className="mx-auto mt-6 max-w-7xl rounded-[24px] bg-[#e8edf3] p-4 sm:rounded-[32px] sm:p-8 lg:p-12">`                                                                            |
|  435 | hex  | `#c9a84c`               | `<div className="relative mt-6 overflow-hidden rounded-2xl bg-primary p-5 ring-1 ring-[#c9a84c]/25 sm:mt-8 sm:p-7">`                                                                   |
|  439 | rgba | `rgba(201,168,76,0.55)` | `style={{ background: "radial-gradient(circle,rgba(201,168,76,0.55),transparent 70%)" }}`                                                                                              |
|  443 | hex  | `#c9a84c`               | `<span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#c9a84c]/15 ring-1 ring-[#c9a84c]/35">`                                                             |
|  443 | hex  | `#c9a84c`               | `<span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#c9a84c]/15 ring-1 ring-[#c9a84c]/35">`                                                             |
|  444 | hex  | `#f0d78c`               | `<Calculator className="h-5 w-5 text-[#f0d78c]" strokeWidth={2.25} />`                                                                                                                 |
|  447 | hex  | `#f0d78c`               | `<p className="font-mono text-micro uppercase tracking-[0.22em] text-[#f0d78c]">`                                                                                                      |
|  456 | hex  | `#f0d78c`               | `<span className="text-[#f0d78c]">₹{fee.toLocaleString()}</span>`                                                                                                                      |
|  460 | hex  | `#f0d78c`               | `<span className="text-[#f0d78c]">break-even in ~{breakevenDays} days.</span>`                                                                                                         |
|  472 | hex  | `#f0d78c`               | `<p className="font-display text-h2 text-[#f0d78c]">~{daysOfMonth}<span className="ml-1 text-base text-white/55">days</span></p>`                                                      |

### `src/components/courses/sections/RiskReversalBlock.tsx` — 32

| Line | Kind | Value                    | Context                                                                                                                                                                                |
| ---: | ---- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   24 | hex  | `#34d399`                | `if (v === true) return <Check className="mx-auto h-5 w-5" style={{ color: "#34d399" }} aria-label="included" />;`                                                                     |
|   25 | rgba | `rgba(248,250,252,0.55)` | `if (v === false) return <X className="mx-auto h-5 w-5" style={{ color: "rgba(248,250,252,0.55)" }} aria-label="not included" />;`                                                     |
|   48 | rgba | `rgba(255,255,255,0.10)` | `<div className="overflow-x-auto rounded-2xl border" style={{ borderColor: "rgba(255,255,255,0.10)", background: "rgba(15,23,42,0.55)" }}>`                                            |
|   48 | rgba | `rgba(15,23,42,0.55)`    | `<div className="overflow-x-auto rounded-2xl border" style={{ borderColor: "rgba(255,255,255,0.10)", background: "rgba(15,23,42,0.55)" }}>`                                            |
|   51 | rgba | `rgba(255,255,255,0.10)` | `<tr className="border-b" style={{ borderColor: "rgba(255,255,255,0.10)" }}>`                                                                                                          |
|   52 | rgba | `rgba(248,250,252,0.55)` | `<th className="px-4 py-4 text-left font-mono text-micro font-medium uppercase tracking-wider sm:px-6" style={{ color: "rgba(248,250,252,0.55)" }}></th>`                              |
|   53 | rgba | `rgba(248,250,252,0.7)`  | `<th className="px-4 py-4 text-center font-grotesk text-sm font-semibold" style={{ color: "rgba(248,250,252,0.7)" }}>Self-taught<span className="block text-micro font-normal" style=` |
|   53 | rgba | `rgba(248,250,252,0.45)` | `<th className="px-4 py-4 text-center font-grotesk text-sm font-semibold" style={{ color: "rgba(248,250,252,0.7)" }}>Self-taught<span className="block text-micro font-normal" style=` |
|   54 | rgba | `rgba(248,250,252,0.7)`  | `<th className="px-4 py-4 text-center font-grotesk text-sm font-semibold" style={{ color: "rgba(248,250,252,0.7)" }}>Average course<span className="block text-micro font-normal" sty` |
|   54 | rgba | `rgba(248,250,252,0.45)` | `<th className="px-4 py-4 text-center font-grotesk text-sm font-semibold" style={{ color: "rgba(248,250,252,0.7)" }}>Average course<span className="block text-micro font-normal" sty` |
|   56 | rgba | `rgba(245,196,81,0.15)`  | `<span className="rounded-full px-3 py-1 font-grotesk text-sm font-bold" style={{ background: "rgba(245,196,81,0.15)", color: "#F5C451" }}>Arzon Global</span>`                        |
|   62 | rgba | `rgba(255,255,255,0.02)` | `<tr key={i} style={{ background: i % 2 ? "rgba(255,255,255,0.02)" : "transparent" }}>`                                                                                                |
|   63 | rgba | `rgba(248,250,252,0.85)` | `<td className="px-4 py-3.5 sm:px-6" style={{ color: "rgba(248,250,252,0.85)" }}>{label}</td>`                                                                                         |
|   74 | hex  | `#0f1b3d`                | `<div className="relative mt-6 overflow-hidden rounded-2xl p-5 ring-1 sm:mt-8 sm:p-7" style={{ background: "#0f1b3d", boxShadow: "inset 0 0 0 1px rgba(201,168,76,0.25)" }}>`          |
|   74 | rgba | `rgba(201,168,76,0.25)`  | `<div className="relative mt-6 overflow-hidden rounded-2xl p-5 ring-1 sm:mt-8 sm:p-7" style={{ background: "#0f1b3d", boxShadow: "inset 0 0 0 1px rgba(201,168,76,0.25)" }}>`          |
|   77 | rgba | `rgba(201,168,76,0.15)`  | `<span className="inline-flex h-11 w-11 items-center justify-center rounded-xl ring-1" style={{ background: "rgba(201,168,76,0.15)", boxShadow: "inset 0 0 0 1px rgba(201,168,76,0.35` |
|   77 | rgba | `rgba(201,168,76,0.35)`  | `<span className="inline-flex h-11 w-11 items-center justify-center rounded-xl ring-1" style={{ background: "rgba(201,168,76,0.15)", boxShadow: "inset 0 0 0 1px rgba(201,168,76,0.35` |
|   88 | rgba | `rgba(248,250,252,0.55)` | `<span style={{ color: "rgba(248,250,252,0.55)" }}> ÷ </span>`                                                                                                                         |
|   90 | rgba | `rgba(248,250,252,0.55)` | `<span style={{ color: "rgba(248,250,252,0.55)" }}> median first-month salary = </span>`                                                                                               |
|   93 | rgba | `rgba(248,250,252,0.65)` | `<p className="mt-1.5 text-meta" style={{ color: "rgba(248,250,252,0.65)" }}>`                                                                                                         |
|   97 | rgba | `rgba(255,255,255,0.06)` | `<div className="rounded-xl px-4 py-3 ring-1 sm:min-w-[160px] sm:text-center" style={{ background: "rgba(255,255,255,0.06)", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.10)" }}>`  |
|   97 | rgba | `rgba(255,255,255,0.10)` | `<div className="rounded-xl px-4 py-3 ring-1 sm:min-w-[160px] sm:text-center" style={{ background: "rgba(255,255,255,0.06)", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.10)" }}>`  |
|   98 | rgba | `rgba(248,250,252,0.55)` | `<p className="font-mono text-micro uppercase tracking-[0.22em]" style={{ color: "rgba(248,250,252,0.55)" }}>Days to recover</p>`                                                      |
|   99 | rgba | `rgba(248,250,252,0.55)` | `<p className="font-display text-h2" style={{ color: "#f0d78c" }}>~{breakevenDays}<span className="ml-1 text-base" style={{ color: "rgba(248,250,252,0.55)" }}>days</span></p>`        |
|  105 | rgba | `rgba(255,255,255,0.10)` | `<div className="mt-6 grid gap-4 rounded-2xl border p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:p-6" style={{ borderColor: "rgba(255,255,255,0.10)", background: "rgba(15,23,42,0.` |
|  105 | rgba | `rgba(15,23,42,0.6)`     | `<div className="mt-6 grid gap-4 rounded-2xl border p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:p-6" style={{ borderColor: "rgba(255,255,255,0.10)", background: "rgba(15,23,42,0.` |
|  107 | rgba | `rgba(248,250,252,0.55)` | `<p className="font-mono text-micro uppercase tracking-[0.22em]" style={{ color: "rgba(248,250,252,0.55)" }}>Programme price</p>`                                                      |
|  109 | rgba | `rgba(248,250,252,0.6)`  | `{PRICE_CAREER} <span className="text-caption font-normal" style={{ color: "rgba(248,250,252,0.6)" }}>· GST included · 0% EMI (3 / 6 / 9 mo)</span>`                                   |
|  111 | rgba | `rgba(248,250,252,0.6)`  | `<p className="mt-1 text-caption" style={{ color: "rgba(248,250,252,0.6)" }}>`                                                                                                         |
|  119 | hex  | `#0A0F1E`                | `style={{ background: "#F5C451", color: "#0A0F1E" }}`                                                                                                                                  |
|  126 | hex  | `#0A0F1E`                | `<div className="tone-light mt-8 rounded-2xl border border-white/10 bg-white p-6 text-[#0A0F1E] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] sm:p-8">`                                   |
|  130 | hex  | `#94A3B8`                | `<p className="mt-6 text-caption" style={{ color: "#94A3B8" }}>`                                                                                                                       |

### `src/components/credibility/JDMirror.tsx` — 27

| Line | Kind | Value     | Context                                                          |
| ---: | ---- | --------- | ---------------------------------------------------------------- |
|   18 | hex  | `#1f3a8a` | `gradient: "from-[#1f3a8a] via-[#2563eb] to-[#0ea5e9]",`         |
|   18 | hex  | `#2563eb` | `gradient: "from-[#1f3a8a] via-[#2563eb] to-[#0ea5e9]",`         |
|   18 | hex  | `#0ea5e9` | `gradient: "from-[#1f3a8a] via-[#2563eb] to-[#0ea5e9]",`         |
|   19 | hex  | `#38bdf8` | `accent: "#38bdf8",`                                             |
|   25 | hex  | `#7c2d12` | `gradient: "from-[#7c2d12] via-[#ea580c] to-[#f59e0b]",`         |
|   25 | hex  | `#ea580c` | `gradient: "from-[#7c2d12] via-[#ea580c] to-[#f59e0b]",`         |
|   25 | hex  | `#f59e0b` | `gradient: "from-[#7c2d12] via-[#ea580c] to-[#f59e0b]",`         |
|   32 | hex  | `#064e3b` | `gradient: "from-[#064e3b] via-[#059669] to-[#34d399]",`         |
|   32 | hex  | `#059669` | `gradient: "from-[#064e3b] via-[#059669] to-[#34d399]",`         |
|   32 | hex  | `#34d399` | `gradient: "from-[#064e3b] via-[#059669] to-[#34d399]",`         |
|   33 | hex  | `#34d399` | `accent: "#34d399",`                                             |
|   39 | hex  | `#4c1d95` | `gradient: "from-[#4c1d95] via-[#7c3aed] to-[#a78bfa]",`         |
|   39 | hex  | `#7c3aed` | `gradient: "from-[#4c1d95] via-[#7c3aed] to-[#a78bfa]",`         |
|   39 | hex  | `#a78bfa` | `gradient: "from-[#4c1d95] via-[#7c3aed] to-[#a78bfa]",`         |
|   46 | hex  | `#831843` | `gradient: "from-[#831843] via-[#db2777] to-[#f472b6]",`         |
|   46 | hex  | `#db2777` | `gradient: "from-[#831843] via-[#db2777] to-[#f472b6]",`         |
|   46 | hex  | `#f472b6` | `gradient: "from-[#831843] via-[#db2777] to-[#f472b6]",`         |
|   53 | hex  | `#1e3a8a` | `gradient: "from-[#1e3a8a] via-[#3b82f6] to-[#93c5fd]",`         |
|   53 | hex  | `#3b82f6` | `gradient: "from-[#1e3a8a] via-[#3b82f6] to-[#93c5fd]",`         |
|   53 | hex  | `#93c5fd` | `gradient: "from-[#1e3a8a] via-[#3b82f6] to-[#93c5fd]",`         |
|   54 | hex  | `#60a5fa` | `accent: "#60a5fa",`                                             |
|  106 | hex  | `#0b7d72` | `style={{ color: "var(--teal-ink, #0b7d72)", fontWeight: 600 }}` |
|  120 | hex  | `#0B1426` | `<div className="tone-dark mt-10 rounded-3xl bg-[#0B1426] p-1">` |
|  150 | hex  | `#0f172a` | `style={{ color: "#0f172a", WebkitTextFillColor: "#0f172a" }}`   |
|  150 | hex  | `#0f172a` | `style={{ color: "#0f172a", WebkitTextFillColor: "#0f172a" }}`   |
|  156 | hex  | `#0f172a` | `style={{ color: "#0f172a", WebkitTextFillColor: "#0f172a" }}`   |
|  156 | hex  | `#0f172a` | `style={{ color: "#0f172a", WebkitTextFillColor: "#0f172a" }}`   |

### `src/components/landing/HowItWorks.tsx` — 27

| Line | Kind | Value                   | Context                                                                                                                                                                                |
| ---: | ---- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   41 | hex  | `#2563eb`               | `accent: "#2563eb",`                                                                                                                                                                   |
|   42 | hex  | `#1e3a8a`               | `gradient: "from-[#1e3a8a] via-[#2563eb] to-[#38bdf8]",`                                                                                                                               |
|   42 | hex  | `#2563eb`               | `gradient: "from-[#1e3a8a] via-[#2563eb] to-[#38bdf8]",`                                                                                                                               |
|   42 | hex  | `#38bdf8`               | `gradient: "from-[#1e3a8a] via-[#2563eb] to-[#38bdf8]",`                                                                                                                               |
|   59 | hex  | `#7c2d12`               | `gradient: "from-[#7c2d12] via-[#ea580c] to-[#fb923c]",`                                                                                                                               |
|   59 | hex  | `#ea580c`               | `gradient: "from-[#7c2d12] via-[#ea580c] to-[#fb923c]",`                                                                                                                               |
|   59 | hex  | `#fb923c`               | `gradient: "from-[#7c2d12] via-[#ea580c] to-[#fb923c]",`                                                                                                                               |
|   75 | hex  | `#059669`               | `accent: "#059669",`                                                                                                                                                                   |
|   76 | hex  | `#064e3b`               | `gradient: "from-[#064e3b] via-[#059669] to-[#34d399]",`                                                                                                                               |
|   76 | hex  | `#059669`               | `gradient: "from-[#064e3b] via-[#059669] to-[#34d399]",`                                                                                                                               |
|   76 | hex  | `#34d399`               | `gradient: "from-[#064e3b] via-[#059669] to-[#34d399]",`                                                                                                                               |
|   92 | hex  | `#7c3aed`               | `accent: "#7c3aed",`                                                                                                                                                                   |
|   93 | hex  | `#4c1d95`               | `gradient: "from-[#4c1d95] via-[#7c3aed] to-[#a78bfa]",`                                                                                                                               |
|   93 | hex  | `#7c3aed`               | `gradient: "from-[#4c1d95] via-[#7c3aed] to-[#a78bfa]",`                                                                                                                               |
|   93 | hex  | `#a78bfa`               | `gradient: "from-[#4c1d95] via-[#7c3aed] to-[#a78bfa]",`                                                                                                                               |
|  114 | hex  | `#f1f4f9`               | `<div className="mt-10 rounded-[24px] bg-gradient-to-b from-[#f1f4f9] to-[#e3e9f1] p-4 shadow-[0_30px_80px_-30px_rgba(15,27,61,0.45)] sm:rounded-[32px] sm:p-8 lg:p-12">`              |
|  114 | hex  | `#e3e9f1`               | `<div className="mt-10 rounded-[24px] bg-gradient-to-b from-[#f1f4f9] to-[#e3e9f1] p-4 shadow-[0_30px_80px_-30px_rgba(15,27,61,0.45)] sm:rounded-[32px] sm:p-8 lg:p-12">`              |
|  117 | hex  | `#0f1b3d`               | `<span className="inline-flex items-center gap-2 rounded-full border border-[#0f1b3d]/15 bg-white px-4 py-1.5 font-sans text-micro font-bold uppercase tracking-[0.18em] text-primary` |
|  140 | hex  | `#2563eb`               | `className="pointer-events-none absolute left-[27px] top-6 bottom-10 w-[3px] rounded-full bg-gradient-to-b from-[#2563eb] via-[#ea580c] via-50% to-[#7c3aed]"`                         |
|  140 | hex  | `#ea580c`               | `className="pointer-events-none absolute left-[27px] top-6 bottom-10 w-[3px] rounded-full bg-gradient-to-b from-[#2563eb] via-[#ea580c] via-50% to-[#7c3aed]"`                         |
|  140 | hex  | `#7c3aed`               | `className="pointer-events-none absolute left-[27px] top-6 bottom-10 w-[3px] rounded-full bg-gradient-to-b from-[#2563eb] via-[#ea580c] via-50% to-[#7c3aed]"`                         |
|  202 | hex  | `#2563eb`               | `<stop offset="0%" stopColor="#2563eb" />`                                                                                                                                             |
|  204 | hex  | `#059669`               | `<stop offset="66%" stopColor="#059669" />`                                                                                                                                            |
|  205 | hex  | `#7c3aed`               | `<stop offset="90%" stopColor="#7c3aed" />`                                                                                                                                            |
|  267 | hex  | `#0f1b3d`               | `className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#0f1b3d]/10 bg-white shadow-[0_8px_24px_-12px_rgba(15,27,61,0.25)] transition-all duration-300 hove` |
|  273 | rgba | `rgba(255,255,255,0.3)` | `<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.3),transparent_55%)]" />`                                                                 |
|  321 | hex  | `#0f1b3d`               | `<div className="mt-4 pt-3 border-t border-[#0f1b3d]/8">`                                                                                                                              |

### `src/components/landing/Footer.tsx` — 19

| Line | Kind | Value     | Context                                                                                                                                                                                |
| ---: | ---- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   19 | hex  | `#8EC5FF` | `const ACCENT = "#8EC5FF";`                                                                                                                                                            |
|   20 | hex  | `#0056D2` | `const ACCENT_STRONG = "#0056D2";`                                                                                                                                                     |
|   27 | hex  | `#8EC5FF` | `"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8EC5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#070B17] rounded-sm";`                           |
|   27 | hex  | `#070B17` | `"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8EC5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#070B17] rounded-sm";`                           |
|   34 | hex  | `#03060d` | `className="tone-dark relative bg-[#03060d] px-3 pb-3 pt-0 sm:px-5 sm:pb-5"`                                                                                                           |
|   40 | hex  | `#dbe6f6` | `className="tone-light relative mx-auto mb-0 max-w-7xl overflow-hidden border border-[#dbe6f6] border-b-0 bg-white px-6 py-6 sm:px-8"`                                                 |
|   42 | hex  | `#0056D2` | `<div aria-hidden className="pointer-events-none absolute inset-x-8 h-px bg-gradient-to-r from-transparent via-[#0056D2]/50 to-transparent" />`                                        |
|   48 | hex  | `#1e3a5f` | `<p className="mt-1 text-sm text-[#1e3a5f]">`                                                                                                                                          |
|   59 | hex  | `#0056D2` | `className={`inline-flex h-11 items-center justify-center rounded-md bg-[#0056D2] px-6 text-caption font-bold text-white transition-colors hover:bg-[#00419E] ${focusRing}`}`          |
|   59 | hex  | `#00419E` | `className={`inline-flex h-11 items-center justify-center rounded-md bg-[#0056D2] px-6 text-caption font-bold text-white transition-colors hover:bg-[#00419E] ${focusRing}`}`          |
|   69 | hex  | `#0056D2` | `className={`inline-flex h-11 items-center justify-center rounded-md border border-[#0056D2]/35 bg-[#EAF2FF] px-5 text-caption font-bold text-[#0056D2] transition-colors hover:borde` |
|   69 | hex  | `#EAF2FF` | `className={`inline-flex h-11 items-center justify-center rounded-md border border-[#0056D2]/35 bg-[#EAF2FF] px-5 text-caption font-bold text-[#0056D2] transition-colors hover:borde` |
|   69 | hex  | `#0056D2` | `className={`inline-flex h-11 items-center justify-center rounded-md border border-[#0056D2]/35 bg-[#EAF2FF] px-5 text-caption font-bold text-[#0056D2] transition-colors hover:borde` |
|   69 | hex  | `#0056D2` | `className={`inline-flex h-11 items-center justify-center rounded-md border border-[#0056D2]/35 bg-[#EAF2FF] px-5 text-caption font-bold text-[#0056D2] transition-colors hover:borde` |
|   69 | hex  | `#dceaff` | `className={`inline-flex h-11 items-center justify-center rounded-md border border-[#0056D2]/35 bg-[#EAF2FF] px-5 text-caption font-bold text-[#0056D2] transition-colors hover:borde` |
|   78 | hex  | `#070B17` | `<div className="mx-auto grid max-w-7xl grid-cols-1 border border-white/10 bg-[#070B17] md:grid-cols-12">`                                                                             |
|  278 | hex  | `#050811` | `className="border-t border-white/10 bg-[#050811] p-6"`                                                                                                                                |
|  298 | hex  | `#050811` | `<div className="mx-auto max-w-7xl border border-t-0 border-white/10 bg-[#050811] p-8">`                                                                                               |
|  314 | hex  | `#070B17` | `<span className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-white font-mono text-micro font-bold tracking-[0.16em] text-[#070B17]">`                                |

### `src/components/landing/EdtechLies.tsx` — 17

| Line | Kind | Value     | Context                                                                                                                                                                                |
| ---: | ---- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   63 | hex  | `#c2654a` | `<div className="mt-5 rounded-xl border border-[#c2654a]/25 bg-[#fdf2ee] p-4">`                                                                                                        |
|   63 | hex  | `#fdf2ee` | `<div className="mt-5 rounded-xl border border-[#c2654a]/25 bg-[#fdf2ee] p-4">`                                                                                                        |
|   65 | hex  | `#c2654a` | `<span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#c2654a]/15 ring-1 ring-[#c2654a]/30">`                                                             |
|   65 | hex  | `#c2654a` | `<span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#c2654a]/15 ring-1 ring-[#c2654a]/30">`                                                             |
|   66 | hex  | `#9b4423` | `<X className="h-3.5 w-3.5 text-[#9b4423]" strokeWidth={3} />`                                                                                                                         |
|   68 | hex  | `#9b4423` | `<span className="font-mono text-micro font-bold uppercase tracking-[0.22em] text-[#9b4423]">`                                                                                         |
|   72 | hex  | `#5c2018` | `<p className="mt-2 text-caption leading-relaxed text-[#5c2018]/85">{l.lie}</p>`                                                                                                       |
|   76 | hex  | `#0d7a5f` | `<div className="mt-3 rounded-xl border border-[#0d7a5f]/25 bg-[#ecf6f1] p-4">`                                                                                                        |
|   76 | hex  | `#ecf6f1` | `<div className="mt-3 rounded-xl border border-[#0d7a5f]/25 bg-[#ecf6f1] p-4">`                                                                                                        |
|   78 | hex  | `#0d7a5f` | `<span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#0d7a5f]/15 ring-1 ring-[#0d7a5f]/30">`                                                             |
|   78 | hex  | `#0d7a5f` | `<span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#0d7a5f]/15 ring-1 ring-[#0d7a5f]/30">`                                                             |
|   79 | hex  | `#0d7a5f` | `<Check className="h-3.5 w-3.5 text-[#0d7a5f]" strokeWidth={3} />`                                                                                                                     |
|   81 | hex  | `#0d7a5f` | `<span className="font-mono text-micro font-bold uppercase tracking-[0.22em] text-[#0d7a5f]">`                                                                                         |
|   88 | hex  | `#1e3a5f` | `<p className="mt-4 flex items-start gap-1.5 text-micro text-[#1e3a5f]/60">`                                                                                                           |
|   97 | hex  | `#1e3a5f` | `<p className="mx-auto mt-8 flex max-w-3xl items-center justify-center gap-2 rounded-full bg-primary/[0.04] px-4 py-2 text-center text-meta text-[#1e3a5f]/80 ring-1 ring-[#0f1b3d]/1` |
|   97 | hex  | `#0f1b3d` | `<p className="mx-auto mt-8 flex max-w-3xl items-center justify-center gap-2 rounded-full bg-primary/[0.04] px-4 py-2 text-center text-meta text-[#1e3a5f]/80 ring-1 ring-[#0f1b3d]/1` |
|   98 | hex  | `#9b4423` | `<AlertTriangle className="h-3.5 w-3.5 text-[#9b4423]" />`                                                                                                                             |

### `src/components/landing/CounterProof.tsx` — 16

| Line | Kind | Value                   | Context                                                                                                                      |
| ---: | ---- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
|   28 | hex  | `#3B82F6`               | `navy: { accent: "from-[#3B82F6] to-[#1E40AF]", halo: "rgba(59,130,246,0.10)",  bar: "#3b6fa0" },`                           |
|   28 | hex  | `#1E40AF`               | `navy: { accent: "from-[#3B82F6] to-[#1E40AF]", halo: "rgba(59,130,246,0.10)",  bar: "#3b6fa0" },`                           |
|   28 | hex  | `#3b6fa0`               | `navy: { accent: "from-[#3B82F6] to-[#1E40AF]", halo: "rgba(59,130,246,0.10)",  bar: "#3b6fa0" },`                           |
|   28 | rgba | `rgba(59,130,246,0.10)` | `navy: { accent: "from-[#3B82F6] to-[#1E40AF]", halo: "rgba(59,130,246,0.10)",  bar: "#3b6fa0" },`                           |
|   29 | hex  | `#14B8A6`               | `teal: { accent: "from-[#14B8A6] to-[#0E7490]", halo: "rgba(20,184,166,0.10)", bar: "#0d7a5f" },`                            |
|   29 | hex  | `#0E7490`               | `teal: { accent: "from-[#14B8A6] to-[#0E7490]", halo: "rgba(20,184,166,0.10)", bar: "#0d7a5f" },`                            |
|   29 | hex  | `#0d7a5f`               | `teal: { accent: "from-[#14B8A6] to-[#0E7490]", halo: "rgba(20,184,166,0.10)", bar: "#0d7a5f" },`                            |
|   29 | rgba | `rgba(20,184,166,0.10)` | `teal: { accent: "from-[#14B8A6] to-[#0E7490]", halo: "rgba(20,184,166,0.10)", bar: "#0d7a5f" },`                            |
|   30 | hex  | `#F59E0B`               | `gold: { accent: "from-[#F59E0B] to-[#B45309]", halo: "rgba(245,158,11,0.14)", bar: "#c9a84c" },`                            |
|   30 | hex  | `#B45309`               | `gold: { accent: "from-[#F59E0B] to-[#B45309]", halo: "rgba(245,158,11,0.14)", bar: "#c9a84c" },`                            |
|   30 | rgba | `rgba(245,158,11,0.14)` | `gold: { accent: "from-[#F59E0B] to-[#B45309]", halo: "rgba(245,158,11,0.14)", bar: "#c9a84c" },`                            |
|   31 | hex  | `#F97316`               | `rust: { accent: "from-[#F97316] to-[#9A3412]", halo: "rgba(249,115,22,0.12)", bar: "#c2654a" },`                            |
|   31 | hex  | `#9A3412`               | `rust: { accent: "from-[#F97316] to-[#9A3412]", halo: "rgba(249,115,22,0.12)", bar: "#c2654a" },`                            |
|   31 | rgba | `rgba(249,115,22,0.12)` | `rust: { accent: "from-[#F97316] to-[#9A3412]", halo: "rgba(249,115,22,0.12)", bar: "#c2654a" },`                            |
|  108 | hex  | `#F59E0B`               | `className="h-full rounded-full bg-gradient-to-r from-[#F59E0B] to-[#B45309] transition-[width] duration-[1200ms] ease-out"` |
|  108 | hex  | `#B45309`               | `className="h-full rounded-full bg-gradient-to-r from-[#F59E0B] to-[#B45309] transition-[width] duration-[1200ms] ease-out"` |

### `src/components/landing/StudentQuestionBank.tsx` — 16

| Line | Kind | Value     | Context                                                                                                                                                                                |
| ---: | ---- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  144 | hex  | `#0056D2` | `<Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0056D2]" />`                                                                           |
|  151 | hex  | `#0056D2` | `className="w-full rounded-md border border-[#0056D2]/20 bg-white py-3 pl-11 pr-4 text-sm font-medium text-primary shadow-sm placeholder:text-[#52657f] outline-none transition focus` |
|  151 | hex  | `#52657f` | `className="w-full rounded-md border border-[#0056D2]/20 bg-white py-3 pl-11 pr-4 text-sm font-medium text-primary shadow-sm placeholder:text-[#52657f] outline-none transition focus` |
|  151 | hex  | `#0056D2` | `className="w-full rounded-md border border-[#0056D2]/20 bg-white py-3 pl-11 pr-4 text-sm font-medium text-primary shadow-sm placeholder:text-[#52657f] outline-none transition focus` |
|  151 | hex  | `#0056D2` | `className="w-full rounded-md border border-[#0056D2]/20 bg-white py-3 pl-11 pr-4 text-sm font-medium text-primary shadow-sm placeholder:text-[#52657f] outline-none transition focus` |
|  167 | hex  | `#0056D2` | `? "border-[#0056D2] bg-[#0056D2] text-white"`                                                                                                                                         |
|  167 | hex  | `#0056D2` | `? "border-[#0056D2] bg-[#0056D2] text-white"`                                                                                                                                         |
|  168 | hex  | `#0056D2` | `: "border-[#0056D2]/20 bg-white text-[#0056D2] hover:border-[#0056D2] hover:bg-[#EAF2FF]"`                                                                                            |
|  168 | hex  | `#0056D2` | `: "border-[#0056D2]/20 bg-white text-[#0056D2] hover:border-[#0056D2] hover:bg-[#EAF2FF]"`                                                                                            |
|  168 | hex  | `#0056D2` | `: "border-[#0056D2]/20 bg-white text-[#0056D2] hover:border-[#0056D2] hover:bg-[#EAF2FF]"`                                                                                            |
|  168 | hex  | `#EAF2FF` | `: "border-[#0056D2]/20 bg-white text-[#0056D2] hover:border-[#0056D2] hover:bg-[#EAF2FF]"`                                                                                            |
|  179 | hex  | `#dbe6f6` | `<div className="mt-8 divide-y divide-[#dbe6f6] overflow-hidden rounded-xl border border-[#dbe6f6] bg-white shadow-sm">`                                                               |
|  179 | hex  | `#dbe6f6` | `<div className="mt-8 divide-y divide-[#dbe6f6] overflow-hidden rounded-xl border border-[#dbe6f6] bg-white shadow-sm">`                                                               |
|  196 | hex  | `#F7FAFF` | `<div key={i} className={isOpen ? "bg-[#F7FAFF]" : "bg-white"}>`                                                                                                                       |
|  199 | hex  | `#F7FAFF` | `className="flex min-h-[56px] w-full items-start justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-[#F7FAFF] focus-visible:outline-none focus-visible:ring-2 focus` |
|  199 | hex  | `#0056D2` | `className="flex min-h-[56px] w-full items-start justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-[#F7FAFF] focus-visible:outline-none focus-visible:ring-2 focus` |

### `src/components/courses/CourseHero.tsx` — 15

| Line | Kind | Value                    | Context                                                                                                              |
| ---: | ---- | ------------------------ | -------------------------------------------------------------------------------------------------------------------- |
|   76 | hex  | `#0A0F1E`                | `<div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1E]/70 via-[#0A0F1E]/85 to-[#0A0F1E]" />`              |
|   76 | hex  | `#0A0F1E`                | `<div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1E]/70 via-[#0A0F1E]/85 to-[#0A0F1E]" />`              |
|   76 | hex  | `#0A0F1E`                | `<div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1E]/70 via-[#0A0F1E]/85 to-[#0A0F1E]" />`              |
|   87 | hex  | `#94A3B8`                | `style={{ color: "#94A3B8" }}`                                                                                       |
|   93 | hex  | `#0F172A`                | `style={{ background: "#0F172A", borderColor: "rgba(255,255,255,0.12)", color: "#E2E8F0" }}`                         |
|   93 | rgba | `rgba(255,255,255,0.12)` | `style={{ background: "#0F172A", borderColor: "rgba(255,255,255,0.12)", color: "#E2E8F0" }}`                         |
|  117 | rgba | `rgba(15,23,42,0.7)`     | `style={{ background: "rgba(15,23,42,0.7)", color: "#F1F5F9" }}`                                                     |
|  155 | rgba | `rgba(15,23,42,0.6)`     | `style={{ background: "rgba(15,23,42,0.6)", borderColor: "rgba(56,189,248,0.25)", color: "#E0F2FE" }}`               |
|  155 | rgba | `rgba(56,189,248,0.25)`  | `style={{ background: "rgba(15,23,42,0.6)", borderColor: "rgba(56,189,248,0.25)", color: "#E0F2FE" }}`               |
|  157 | hex  | `#7DD3FC`                | `<ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "#7DD3FC" }} aria-hidden />`                       |
|  162 | hex  | `#7DD3FC`                | `<p className="mt-0.5 font-mono text-micro font-semibold uppercase tracking-[0.18em]" style={{ color: "#7DD3FC" }}>` |
|  181 | hex  | `#1A1300`                | `style={{ background: "#F5C451", color: "#1A1300" }}`                                                                |
|  205 | rgba | `rgba(255,255,255,0.04)` | `style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.15)", color: "#F8FAFC" }}`          |
|  205 | rgba | `rgba(255,255,255,0.15)` | `style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.15)", color: "#F8FAFC" }}`          |
|  226 | rgba | `rgba(15,23,42,0.7)`     | `style={{ background: "rgba(15,23,42,0.7)", color: "#F1F5F9" }}`                                                     |

### `src/components/courses/DeploymentReadyBlock.tsx` — 14

| Line | Kind | Value     | Context                                                                                                         |
| ---: | ---- | --------- | --------------------------------------------------------------------------------------------------------------- |
|   12 | hex  | `#3B82F6` | `domain: "from-[#3B82F6] to-[#1E40AF]",`                                                                        |
|   12 | hex  | `#1E40AF` | `domain: "from-[#3B82F6] to-[#1E40AF]",`                                                                        |
|   13 | hex  | `#14B8A6` | `process: "from-[#14B8A6] to-[#0E7490]",`                                                                       |
|   13 | hex  | `#0E7490` | `process: "from-[#14B8A6] to-[#0E7490]",`                                                                       |
|   14 | hex  | `#A855F7` | `tools: "from-[#A855F7] to-[#6D28D9]",`                                                                         |
|   14 | hex  | `#6D28D9` | `tools: "from-[#A855F7] to-[#6D28D9]",`                                                                         |
|   15 | hex  | `#F59E0B` | `workplace: "from-[#F59E0B] to-[#B45309]",`                                                                     |
|   15 | hex  | `#B45309` | `workplace: "from-[#F59E0B] to-[#B45309]",`                                                                     |
|   75 | hex  | `#0F1A33` | `className="rounded-2xl border border-white/10 bg-[#0F1A33] p-6"`                                               |
|  100 | hex  | `#34D399` | `<CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#34D399]" />`                                      |
|  111 | hex  | `#0F1A33` | `<div className="rounded-2xl border border-white/10 bg-[#0F1A33] p-6 sm:p-8">`                                  |
|  118 | hex  | `#34D399` | `{ key: "understand", label: "I Understand",      items: data.outcome.understand,  accent: "text-[#34D399]" },` |
|  119 | hex  | `#F59E0B` | `{ key: "practiced",  label: "I Have Practiced",  items: data.outcome.practiced,   accent: "text-[#F59E0B]" },` |
|  120 | hex  | `#A855F7` | `{ key: "exposureTo", label: "I Have Exposure To", items: data.outcome.exposureTo, accent: "text-[#A855F7]" },` |

### `src/components/landing/FAQ.tsx` — 14

| Line | Kind | Value     | Context                                                                                                                                                                                |
| ---: | ---- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   37 | hex  | `#dbe6f6` | `<div className="mt-8 divide-y divide-[#dbe6f6] overflow-hidden rounded-2xl border border-[#dbe6f6] bg-white shadow-sm md:mt-12">`                                                     |
|   37 | hex  | `#dbe6f6` | `<div className="mt-8 divide-y divide-[#dbe6f6] overflow-hidden rounded-2xl border border-[#dbe6f6] bg-white shadow-sm md:mt-12">`                                                     |
|   41 | hex  | `#F7FAFF` | `<div key={i} className={isOpen ? "bg-[#F7FAFF]" : "bg-white"}>`                                                                                                                       |
|   44 | hex  | `#F7FAFF` | `className="group flex min-h-[60px] w-full items-start justify-between gap-4 px-5 py-5 text-left transition-colors duration-200 hover:bg-[#F7FAFF] focus-visible:bg-[#F7FAFF] focus-v` |
|   44 | hex  | `#F7FAFF` | `className="group flex min-h-[60px] w-full items-start justify-between gap-4 px-5 py-5 text-left transition-colors duration-200 hover:bg-[#F7FAFF] focus-visible:bg-[#F7FAFF] focus-v` |
|   44 | hex  | `#0056D2` | `className="group flex min-h-[60px] w-full items-start justify-between gap-4 px-5 py-5 text-left transition-colors duration-200 hover:bg-[#F7FAFF] focus-visible:bg-[#F7FAFF] focus-v` |
|   52 | hex  | `#0056D2` | `? "bg-[#0056D2] text-white ring-[#0056D2] rotate-45"`                                                                                                                                 |
|   52 | hex  | `#0056D2` | `? "bg-[#0056D2] text-white ring-[#0056D2] rotate-45"`                                                                                                                                 |
|   53 | hex  | `#EAF2FF` | `: "bg-[#EAF2FF] text-[#0056D2] ring-[#0056D2]/20 group-hover:bg-[#dceaff] group-hover:ring-[#0056D2]/35"`                                                                             |
|   53 | hex  | `#0056D2` | `: "bg-[#EAF2FF] text-[#0056D2] ring-[#0056D2]/20 group-hover:bg-[#dceaff] group-hover:ring-[#0056D2]/35"`                                                                             |
|   53 | hex  | `#0056D2` | `: "bg-[#EAF2FF] text-[#0056D2] ring-[#0056D2]/20 group-hover:bg-[#dceaff] group-hover:ring-[#0056D2]/35"`                                                                             |
|   53 | hex  | `#dceaff` | `: "bg-[#EAF2FF] text-[#0056D2] ring-[#0056D2]/20 group-hover:bg-[#dceaff] group-hover:ring-[#0056D2]/35"`                                                                             |
|   53 | hex  | `#0056D2` | `: "bg-[#EAF2FF] text-[#0056D2] ring-[#0056D2]/20 group-hover:bg-[#dceaff] group-hover:ring-[#0056D2]/35"`                                                                             |
|   60 | hex  | `#1e3a5f` | `<div className="px-5 pb-6 text-sm leading-relaxed text-[#1e3a5f] animate-fade-in sm:px-6 sm:pr-16">`                                                                                  |

### `src/components/landing/StickyMobileCTA.tsx` — 13

| Line | Kind | Value                    | Context                                                                                                                                                                                |
| ---: | ---- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   92 | hex  | `#0A0F1E`                | `className="pointer-events-auto mx-3 mb-3 flex items-center gap-2 rounded-full border border-white/15 bg-[#0A0F1E] px-2 py-2 sm:mx-auto sm:max-w-md"`                                  |
|   95 | rgba | `rgba(255,255,255,0.08)` | `"inset 0 1px 0 rgba(255,255,255,0.08), 0 -1px 2px rgba(0,0,0,0.3), 0 -16px 48px -12px rgba(0,0,0,0.7), 0 8px 24px -8px rgba(15,27,61,0.6)",`                                          |
|   95 | rgba | `rgba(0,0,0,0.3)`        | `"inset 0 1px 0 rgba(255,255,255,0.08), 0 -1px 2px rgba(0,0,0,0.3), 0 -16px 48px -12px rgba(0,0,0,0.7), 0 8px 24px -8px rgba(15,27,61,0.6)",`                                          |
|   95 | rgba | `rgba(0,0,0,0.7)`        | `"inset 0 1px 0 rgba(255,255,255,0.08), 0 -1px 2px rgba(0,0,0,0.3), 0 -16px 48px -12px rgba(0,0,0,0.7), 0 8px 24px -8px rgba(15,27,61,0.6)",`                                          |
|   95 | rgba | `rgba(15,27,61,0.6)`     | `"inset 0 1px 0 rgba(255,255,255,0.08), 0 -1px 2px rgba(0,0,0,0.3), 0 -16px 48px -12px rgba(0,0,0,0.7), 0 8px 24px -8px rgba(15,27,61,0.6)",`                                          |
|  101 | hex  | `#3b6fa0`                | `className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#3b6fa0]/15 text-[#7fb0d8] ring-1 ring-[#3b6fa0]/30 transition-all duration-200 hover:bg-[#3b6fa0]/2` |
|  101 | hex  | `#7fb0d8`                | `className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#3b6fa0]/15 text-[#7fb0d8] ring-1 ring-[#3b6fa0]/30 transition-all duration-200 hover:bg-[#3b6fa0]/2` |
|  101 | hex  | `#3b6fa0`                | `className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#3b6fa0]/15 text-[#7fb0d8] ring-1 ring-[#3b6fa0]/30 transition-all duration-200 hover:bg-[#3b6fa0]/2` |
|  101 | hex  | `#3b6fa0`                | `className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#3b6fa0]/15 text-[#7fb0d8] ring-1 ring-[#3b6fa0]/30 transition-all duration-200 hover:bg-[#3b6fa0]/2` |
|  101 | hex  | `#3b6fa0`                | `className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#3b6fa0]/15 text-[#7fb0d8] ring-1 ring-[#3b6fa0]/30 transition-all duration-200 hover:bg-[#3b6fa0]/2` |
|  101 | hex  | `#7fb0d8`                | `className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#3b6fa0]/15 text-[#7fb0d8] ring-1 ring-[#3b6fa0]/30 transition-all duration-200 hover:bg-[#3b6fa0]/2` |
|  101 | hex  | `#0A0F1E`                | `className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#3b6fa0]/15 text-[#7fb0d8] ring-1 ring-[#3b6fa0]/30 transition-all duration-200 hover:bg-[#3b6fa0]/2` |
|  129 | hex  | `#0A0F1E`                | `className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white/60 transition-all duration-200 hover:bg-white/10 hover:text-white active:scale-90 focus-visib` |

### `src/components/learn/PlayerLayout.tsx` — 12

| Line | Kind | Value                  | Context                                                                                                                                                                                |
| ---: | ---- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  136 | hex  | `#0f172a`              | `<div className="min-h-app bg-[#0f172a] text-white">`                                                                                                                                  |
|  138 | hex  | `#0f172a`              | `<header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-3 border-b border-white/10 bg-[#0f172a]/95 px-3 backdrop-blur sm:px-5">`                              |
|  206 | hex  | `#0b1220`              | `} border-r border-white/10 bg-[#0b1220] lg:block`}`                                                                                                                                   |
|  307 | rgba | `rgba(59,130,246,0.6)` | `style={{ boxShadow: "0 8px 24px -8px rgba(59,130,246,0.6)" }}`                                                                                                                        |
|  339 | hex  | `#0b1220`              | `<aside className="hidden border-l border-white/10 bg-[#0b1220] p-5 lg:block">`                                                                                                        |
|  465 | hex  | `#0b1220`              | `<SheetContent side="right" className="w-full border-l border-white/10 bg-[#0b1220] text-white sm:max-w-md">`                                                                          |
|  710 | rgba | `rgba(59,130,246,0.6)` | `style={{ boxShadow: "0 8px 24px -8px rgba(59,130,246,0.6)" }}`                                                                                                                        |
|  769 | hex  | `#0b1220`              | `className="mt-4 h-28 w-full resize-none rounded-xl border border-white/10 bg-[#0b1220] p-3 text-xs text-white outline-none ring-amber-300/30 placeholder:text-slate-500 focus:ring-2` |
|  775 | hex  | `#0b1220`              | `className="mt-3 h-11 w-full rounded-full border border-white/10 bg-[#0b1220] px-4 text-xs text-white outline-none ring-amber-300/30 placeholder:text-slate-500 focus:ring-2"`         |
|  785 | hex  | `#1A1300`              | `className="rounded-full bg-amber-400 text-[#1A1300] hover:bg-amber-300"`                                                                                                              |
|  882 | hex  | `#0b1220`              | `className="mt-4 h-28 w-full resize-none rounded-xl border border-white/10 bg-[#0b1220] p-3 text-xs text-white outline-none ring-blue-400/30 placeholder:text-slate-500 focus:ring-2"` |
|  888 | hex  | `#0b1220`              | `className="mt-3 h-11 w-full rounded-full border border-white/10 bg-[#0b1220] px-4 text-xs text-white outline-none ring-blue-400/30 placeholder:text-slate-500 focus:ring-2"`          |

### `src/components/landing/ExitIntentQuiz.tsx` — 11

| Line | Kind | Value                   | Context                                                                                                                                                                                |
| ---: | ---- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   79 | hex  | `#c9a84c`               | `<div className="relative overflow-hidden rounded-[20px] card-dark ring-1 ring-[#c9a84c]/30">`                                                                                         |
|   84 | hex  | `#c9a84c`               | `style={{ background: "linear-gradient(90deg,#c9a84c 0%,#f0d78c 50%,#c9a84c 100%)" }}`                                                                                                 |
|   84 | hex  | `#f0d78c`               | `style={{ background: "linear-gradient(90deg,#c9a84c 0%,#f0d78c 50%,#c9a84c 100%)" }}`                                                                                                 |
|   84 | hex  | `#c9a84c`               | `style={{ background: "linear-gradient(90deg,#c9a84c 0%,#f0d78c 50%,#c9a84c 100%)" }}`                                                                                                 |
|   91 | rgba | `rgba(201,168,76,0.45)` | `style={{ background: "radial-gradient(circle,rgba(201,168,76,0.45),transparent 70%)" }}`                                                                                              |
|  103 | hex  | `#c9a84c`               | `<span className="inline-flex items-center gap-1.5 rounded-full bg-[#c9a84c]/15 px-3 py-1 font-mono text-micro font-bold uppercase tracking-[0.22em] text-[#f0d78c] ring-1 ring-[#c9a` |
|  103 | hex  | `#f0d78c`               | `<span className="inline-flex items-center gap-1.5 rounded-full bg-[#c9a84c]/15 px-3 py-1 font-mono text-micro font-bold uppercase tracking-[0.22em] text-[#f0d78c] ring-1 ring-[#c9a` |
|  103 | hex  | `#c9a84c`               | `<span className="inline-flex items-center gap-1.5 rounded-full bg-[#c9a84c]/15 px-3 py-1 font-mono text-micro font-bold uppercase tracking-[0.22em] text-[#f0d78c] ring-1 ring-[#c9a` |
|  109 | hex  | `#f0d78c`               | `Wait before you go, is healthcare even <span className="text-[#f0d78c]">your fit?</span>`                                                                                             |
|  120 | hex  | `#f0d78c`               | `<ClipboardCheck className="h-4 w-4 shrink-0 text-[#f0d78c]" />`                                                                                                                       |
|  124 | hex  | `#f0d78c`               | `<GraduationCap className="h-4 w-4 shrink-0 text-[#f0d78c]" />`                                                                                                                        |

### `src/routes/contact.tsx` — 11

| Line | Kind | Value                    | Context                                                                                     |
| ---: | ---- | ------------------------ | ------------------------------------------------------------------------------------------- |
|   69 | hex  | `#0A0F1E`                | `<main className="tone-dark min-h-app bg-[#0A0F1E] text-white">`                            |
|  169 | rgba | `rgba(255,255,255,0.06)` | `style={{ background: "rgba(255,255,255,0.06)", color: "#F8FAFC" }}`                        |
|  181 | rgba | `rgba(255,255,255,0.06)` | `style={{ background: "rgba(255,255,255,0.06)", color: "#F8FAFC" }}`                        |
|  189 | rgba | `rgba(255,255,255,0.06)` | `style={{ background: "rgba(255,255,255,0.06)", color: "#F8FAFC" }}`                        |
|  191 | hex  | `#0F172A`                | `<option value="" style={{ color: "#0F172A" }}>Not sure yet — help me decide</option>`      |
|  192 | hex  | `#0F172A`                | `<option value="Pharmacovigilance" style={{ color: "#0F172A" }}>Pharmacovigilance</option>` |
|  193 | hex  | `#0F172A`                | `<option value="Medical Coding" style={{ color: "#0F172A" }}>Medical Coding</option>`       |
|  194 | hex  | `#0F172A`                | `<option value="Clinical Research" style={{ color: "#0F172A" }}>Clinical Research</option>` |
|  195 | hex  | `#0F172A`                | `<option value="SAS Clinical" style={{ color: "#0F172A" }}>SAS Clinical</option>`           |
|  204 | rgba | `rgba(255,255,255,0.06)` | `style={{ background: "rgba(255,255,255,0.06)", color: "#F8FAFC" }}`                        |
|  211 | hex  | `#10B981`                | `style={{ background: "#10B981", color: "#FFFFFF" }}`                                       |

### `src/components/credibility/JDProvenanceBadge.tsx` — 9

| Line | Kind | Value     | Context                                                                |
| ---: | ---- | --------- | ---------------------------------------------------------------------- |
|   68 | hex  | `#0B1426` | `"rounded-3xl border border-slate-800 bg-[#0B1426] p-6 sm:p-8 " +`     |
|   73 | hex  | `#7DD3FC` | `<ShieldCheck className="h-3.5 w-3.5" style={{ color: "#7DD3FC" }} />` |
|   76 | hex  | `#7DD3FC` | `style={{ color: "#7DD3FC" }}`                                         |
|  100 | hex  | `#7DD3FC` | `style={{ color: "#7DD3FC" }}`                                         |
|  110 | hex  | `#94A3B8` | `<p className="mt-1 text-xs" style={{ color: "#94A3B8" }}>`            |
|  117 | hex  | `#7DD3FC` | `style={{ color: "#7DD3FC" }}`                                         |
|  127 | hex  | `#94A3B8` | `<p className="mt-1 text-xs" style={{ color: "#94A3B8" }}>`            |
|  134 | hex  | `#7DD3FC` | `style={{ color: "#7DD3FC" }}`                                         |
|  155 | hex  | `#7DD3FC` | `<MapPin className="h-3.5 w-3.5" style={{ color: "#7DD3FC" }} />`      |

### `src/lib/email-templates/enrolment-recovery.tsx` — 9

| Line | Kind | Value     | Context                                                                                     |
| ---: | ---- | --------- | ------------------------------------------------------------------------------------------- |
|  105 | hex  | `#0A0F1E` | `color: '#0A0F1E',`                                                                         |
|  111 | hex  | `#374151` | `color: '#374151',`                                                                         |
|  117 | hex  | `#BFDBFE` | `border: '1px solid #BFDBFE',`                                                              |
|  127 | hex  | `#1E40AF` | `color: '#1E40AF',`                                                                         |
|  134 | hex  | `#0F172A` | `color: '#0F172A',`                                                                         |
|  138 | hex  | `#1E4D8C` | `backgroundColor: '#1E4D8C',`                                                               |
|  149 | hex  | `#6B7280` | `color: '#6B7280',`                                                                         |
|  153 | hex  | `#1E4D8C` | `const link = { color: '#1E4D8C', textDecoration: 'underline' }`                            |
|  155 | hex  | `#9CA3AF` | `const footer = { fontSize: '12px', color: '#9CA3AF', margin: '0 0 6px', lineHeight: 1.5 }` |

### `src/components/courses/EnquiryForm.tsx` — 8

| Line | Kind | Value                    | Context                                                                                                                                                                            |
| ---: | ---- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  110 | hex  | `#0A0F1E`                | `className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-white text-[#0A0F1E] px-5 text-sm font-semibold hover:bg-white/90"`                          |
|  200 | hex  | `#0A0F1E`                | `className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#0A0F1E] hover:bg-white/90 disabled:opacity-60"` |
|  213 | rgba | `rgba(255,255,255,0.04)` | `background: rgba(255,255,255,0.04);`                                                                                                                                              |
|  214 | rgba | `rgba(255,255,255,0.12)` | `border: 1px solid rgba(255,255,255,0.12);`                                                                                                                                        |
|  216 | hex  | `#fff`                   | `color: #fff;`                                                                                                                                                                     |
|  220 | rgba | `rgba(255,255,255,0.35)` | `.enquiry-input:focus { border-color: rgba(255,255,255,0.35); background: rgba(255,255,255,0.07); }`                                                                               |
|  220 | rgba | `rgba(255,255,255,0.07)` | `.enquiry-input:focus { border-color: rgba(255,255,255,0.35); background: rgba(255,255,255,0.07); }`                                                                               |
|  221 | rgba | `rgba(255,255,255,0.35)` | `.enquiry-input::placeholder { color: rgba(255,255,255,0.35); }`                                                                                                                   |

### `src/components/landing/CounsellorLeadForm.tsx` — 8

| Line | Kind | Value     | Context                                                                                                                                                                                |
| ---: | ---- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|    5 | hex  | `#0056D2` | `const GOLD = "#0056D2";`                                                                                                                                                              |
|    7 | hex  | `#8EC5FF` | `"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8EC5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#070B17]";`                                      |
|    7 | hex  | `#070B17` | `"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8EC5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#070B17]";`                                      |
|   65 | hex  | `#C9A84C` | `className="rounded-md border border-[#C9A84C]/40 bg-[#C9A84C]/10 p-4 text-sm text-white"`                                                                                             |
|   65 | hex  | `#C9A84C` | `className="rounded-md border border-[#C9A84C]/40 bg-[#C9A84C]/10 p-4 text-sm text-white"`                                                                                             |
|   93 | hex  | `#52657f` | `className={`h-11 w-full rounded-md border border-white/25 bg-white px-3 text-sm font-medium text-primary placeholder:text-[#52657f] ${focusRing}`}`                                   |
|  110 | hex  | `#52657f` | `className={`h-11 w-full rounded-md border border-white/25 bg-white px-3 text-sm font-medium text-primary placeholder:text-[#52657f] ${focusRing}`}`                                   |
|  119 | hex  | `#00419E` | `className={`inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-md px-4 text-caption font-bold transition-colors hover:bg-[#00419E] disabled:opacity-60 ${focusRing}` |

### `src/components/landing/DeploymentReadyStrip.tsx` — 8

| Line | Kind | Value     | Context                                  |
| ---: | ---- | --------- | ---------------------------------------- |
|   13 | hex  | `#3B82F6` | `accent: "from-[#3B82F6] to-[#1E40AF]",` |
|   13 | hex  | `#1E40AF` | `accent: "from-[#3B82F6] to-[#1E40AF]",` |
|   21 | hex  | `#14B8A6` | `accent: "from-[#14B8A6] to-[#0E7490]",` |
|   21 | hex  | `#0E7490` | `accent: "from-[#14B8A6] to-[#0E7490]",` |
|   29 | hex  | `#A855F7` | `accent: "from-[#A855F7] to-[#6D28D9]",` |
|   29 | hex  | `#6D28D9` | `accent: "from-[#A855F7] to-[#6D28D9]",` |
|   37 | hex  | `#F59E0B` | `accent: "from-[#F59E0B] to-[#B45309]",` |
|   37 | hex  | `#B45309` | `accent: "from-[#F59E0B] to-[#B45309]",` |

### `src/components/landing/PageCTA.tsx` — 8

| Line | Kind | Value     | Context                                                                                                                                                                      |
| ---: | ---- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   26 | hex  | `#0F1B3A` | `<div className="tone-dark relative overflow-hidden rounded-3xl border border-white/15 bg-[#0F1B3A] bg-gradient-to-br from-[#0F1B3A] to-[#111A2E] p-8 text-center sm:p-12">` |
|   26 | hex  | `#0F1B3A` | `<div className="tone-dark relative overflow-hidden rounded-3xl border border-white/15 bg-[#0F1B3A] bg-gradient-to-br from-[#0F1B3A] to-[#111A2E] p-8 text-center sm:p-12">` |
|   26 | hex  | `#111A2E` | `<div className="tone-dark relative overflow-hidden rounded-3xl border border-white/15 bg-[#0F1B3A] bg-gradient-to-br from-[#0F1B3A] to-[#111A2E] p-8 text-center sm:p-12">` |
|   31 | hex  | `#9EC4FF` | `<p className="relative font-mono text-micro font-semibold uppercase tracking-[0.28em] text-[#9EC4FF]">`                                                                     |
|   48 | hex  | `#0056D2` | `className="inline-flex h-12 items-center rounded-md bg-[#0056D2] px-6 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#0046b0]"`                         |
|   48 | hex  | `#0046b0` | `className="inline-flex h-12 items-center rounded-md bg-[#0056D2] px-6 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#0046b0]"`                         |
|   56 | hex  | `#0056D2` | `className="inline-flex h-12 items-center rounded-md bg-[#0056D2] px-6 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#0046b0]"`                         |
|   56 | hex  | `#0046b0` | `className="inline-flex h-12 items-center rounded-md bg-[#0056D2] px-6 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#0046b0]"`                         |

### `src/lib/email-templates/career-engine-result.tsx` — 8

| Line | Kind | Value     | Context                                                                                     |
| ---: | ---- | --------- | ------------------------------------------------------------------------------------------- |
|  207 | hex  | `#e2e8f0` | `border: '1px solid #e2e8f0',`                                                              |
|  212 | hex  | `#0f172a` | `const h1 = { fontSize: '22px', fontWeight: 700, color: '#0f172a', margin: '0 0 4px' }`     |
|  213 | hex  | `#0f172a` | `const h2 = { fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: '0 0 8px' }`     |
|  214 | hex  | `#334155` | `const text = { fontSize: '14px', color: '#334155', lineHeight: '1.5', margin: '0 0 8px' }` |
|  215 | hex  | `#334155` | `const kv = { fontSize: '14px', color: '#334155', lineHeight: '1.5', margin: '0 0 4px' }`   |
|  216 | hex  | `#64748b` | `const subtle = { fontSize: '12px', color: '#64748b', margin: '0 0 16px' }`                 |
|  217 | hex  | `#e2e8f0` | `const hr = { border: 'none', borderTop: '1px solid #e2e8f0', margin: '20px 0' }`           |
|  218 | hex  | `#94a3b8` | `const footer = { fontSize: '11px', color: '#94a3b8', margin: '0' }`                        |

### `src/components/courses/sections/OutcomeBlock.tsx` — 7

| Line | Kind | Value                    | Context                                                                             |
| ---: | ---- | ------------------------ | ----------------------------------------------------------------------------------- |
|   33 | rgba | `rgba(17,26,46,1)`       | `style={{ background: "rgba(17,26,46,1)", borderColor: "rgba(255,255,255,0.10)" }}` |
|   33 | rgba | `rgba(255,255,255,0.10)` | `style={{ background: "rgba(17,26,46,1)", borderColor: "rgba(255,255,255,0.10)" }}` |
|   55 | rgba | `rgba(17,26,46,1)`       | `style={{ background: "rgba(17,26,46,1)", borderColor: "rgba(255,255,255,0.10)" }}` |
|   55 | rgba | `rgba(255,255,255,0.10)` | `style={{ background: "rgba(17,26,46,1)", borderColor: "rgba(255,255,255,0.10)" }}` |
|   75 | rgba | `rgba(17,26,46,1)`       | `style={{ background: "rgba(17,26,46,1)", borderColor: "rgba(255,255,255,0.10)" }}` |
|   75 | rgba | `rgba(255,255,255,0.10)` | `style={{ background: "rgba(17,26,46,1)", borderColor: "rgba(255,255,255,0.10)" }}` |
|   82 | hex  | `#94A3B8`                | `{hint && <p className="mt-1 text-xs" style={{ color: "#94A3B8" }}>{hint}</p>}`     |

### `src/components/courses/sections/ProblemBlock.tsx` — 6

| Line | Kind | Value                   | Context                                                                                                       |
| ---: | ---- | ----------------------- | ------------------------------------------------------------------------------------------------------------- |
|   25 | rgba | `rgba(239,68,68,0.06)`  | `style={{ background: "rgba(239,68,68,0.06)", borderColor: "rgba(239,68,68,0.25)" }}`                         |
|   25 | rgba | `rgba(239,68,68,0.25)`  | `style={{ background: "rgba(239,68,68,0.06)", borderColor: "rgba(239,68,68,0.25)" }}`                         |
|   41 | rgba | `rgba(16,185,129,0.06)` | `style={{ background: "rgba(16,185,129,0.06)", borderColor: "rgba(16,185,129,0.25)" }}`                       |
|   41 | rgba | `rgba(16,185,129,0.25)` | `style={{ background: "rgba(16,185,129,0.06)", borderColor: "rgba(16,185,129,0.25)" }}`                       |
|   43 | hex  | `#6EE7B7`               | `<p className="font-mono text-micro font-semibold uppercase tracking-[0.22em]" style={{ color: "#6EE7B7" }}>` |
|   49 | hex  | `#34D399`               | `<CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "#34D399" }} aria-hidden />`               |

### `src/components/landing/Hero.tsx` — 6

| Line | Kind | Value                    | Context                                                                                                            |
| ---: | ---- | ------------------------ | ------------------------------------------------------------------------------------------------------------------ |
|   18 | hex  | `#06080d`                | `* Locked palette: navy #06080d, sky-300 accent, brand gold CTA, white/10 chrome.`                                 |
|   63 | hex  | `#06080d`                | `className="tone-dark relative isolate overflow-hidden bg-[#06080d] text-white"`                                   |
|   71 | rgba | `rgba(125,211,252,0.16)` | `"radial-gradient(60% 60% at 50% 0%, rgba(125,211,252,0.16), transparent 70%)",`                                   |
|  108 | hex  | `#d4b76a`                | `className="text-[color:var(--brand-gold,#d4b76a)] italic"`                                                        |
|  168 | hex  | `#06080d`                | `className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06080d] via-[#06080d]/30 to-transparent"` |
|  168 | hex  | `#06080d`                | `className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06080d] via-[#06080d]/30 to-transparent"` |

### `src/lib/design-tokens.ts` — 6

| Line | Kind | Value                    | Context                                                                  |
| ---: | ---- | ------------------------ | ------------------------------------------------------------------------ |
|   39 | hex  | `#0E1730`                | `// by the contrast audit (>=4.5:1 against #0E1730/#0A0F1E/#070B17).`    |
|   39 | hex  | `#0A0F1E`                | `// by the contrast audit (>=4.5:1 against #0E1730/#0A0F1E/#070B17).`    |
|   39 | hex  | `#070B17`                | `// by the contrast audit (>=4.5:1 against #0E1730/#0A0F1E/#070B17).`    |
|   41 | rgba | `rgba(255,255,255,0.85)` | `textOnDarkStrong: "rgba(255,255,255,0.85)",`                            |
|   42 | rgba | `rgba(255,255,255,0.70)` | `textOnDarkMuted: "rgba(255,255,255,0.70)",`                             |
|   43 | rgba | `rgba(255,255,255,0.60)` | `textOnDarkSubtle: "rgba(255,255,255,0.60)", // floor for readable copy` |

### `src/routes/enrol.$tier.pay.tsx` — 6

| Line | Kind | Value                   | Context                                                                                                                                                                                |
| ---: | ---- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  493 | hex  | `#3B82F6`               | `themeColor: "#3B82F6",`                                                                                                                                                               |
|  923 | rgba | `rgba(59,130,246,0.18)` | `<div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_45%_at_15%_0%,rgba(59,130,246,0.18),transparent_60%),radial-gradient(50%_40%_at_100%_` |
|  923 | rgba | `rgba(212,175,55,0.10)` | `<div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_45%_at_15%_0%,rgba(59,130,246,0.18),transparent_60%),radial-gradient(50%_40%_at_100%_` |
| 1505 | hex  | `#070B17`               | `<div className="flex flex-wrap items-stretch gap-2 rounded-2xl border border-white/10 bg-[#070B17] p-1.5 ring-1 ring-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] focus-wit` |
| 1583 | hex  | `#040814`               | `<div aria-hidden className="pointer-events-none absolute inset-x-0 -top-6 h-6 bg-gradient-to-t from-[#040814]/90 to-transparent" />`                                                  |
| 1584 | hex  | `#070B16`               | `<div className="mx-3 mb-2 overflow-hidden rounded-2xl border border-white/10 bg-[#070B16]/90 px-3.5 py-3 shadow-[0_18px_45px_-12px_rgba(0,0,0,0.75)] backdrop-blur-xl">`              |

### `src/components/courses/sections/FinalCtaBand.tsx` — 5

| Line | Kind | Value                    | Context                                                                                                                                                                                |
| ---: | ---- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   26 | rgba | `rgba(255,255,255,0.10)` | `borderColor: "rgba(255,255,255,0.10)",`                                                                                                                                               |
|   27 | hex  | `#0A0F1E`                | `background: `radial-gradient(120% 60% at 50% 0%, ${theme.hex.from}26, rgba(10,15,30,0)), #0A0F1E`,`                                                                                   |
|   27 | rgba | `rgba(10,15,30,0)`       | `background: `radial-gradient(120% 60% at 50% 0%, ${theme.hex.from}26, rgba(10,15,30,0)), #0A0F1E`,`                                                                                   |
|   56 | hex  | `#0A0F1E`                | `className="tone-light inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-5 text-body-sm font-bold text-[#0A0F1E] shadow-[0_18px_40px_-18px_rgba(127,` |
|   73 | hex  | `#94A3B8`                | `style={{ color: "#94A3B8" }}`                                                                                                                                                         |

### `src/components/courses/sections/ProofBlock.tsx` — 5

| Line | Kind | Value                    | Context                                                                                                                                         |
| ---: | ---- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
|   44 | rgba | `rgba(255,255,255,0.05)` | `background: "rgba(255,255,255,0.05)",`                                                                                                         |
|   45 | rgba | `rgba(255,255,255,0.15)` | `borderColor: "rgba(255,255,255,0.15)",`                                                                                                        |
|   68 | rgba | `rgba(255,255,255,0.05)` | `style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.15)", color: "#F8FAFC" }}`                                     |
|   68 | rgba | `rgba(255,255,255,0.15)` | `style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.15)", color: "#F8FAFC" }}`                                     |
|   73 | hex  | `#0A0F1E`                | `<div className="tone-light rounded-2xl border border-white/10 bg-white p-2 text-[#0A0F1E] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] sm:p-6">` |

### `src/components/landing/FinalCTA.tsx` — 5

| Line | Kind | Value     | Context                                                                                                                                                                                |
| ---: | ---- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   15 | hex  | `#0E1730` | `<div className="tone-dark card-dark card-hairline-gradient card-accent-strip relative overflow-hidden rounded-2xl border border-white/10 bg-[#0E1730] px-5 py-8 sm:rounded-[28px] sm` |
|   16 | hex  | `#3b6fa0` | `<div aria-hidden className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#3b6fa0]/60 to-transparent" />`                                                      |
|   18 | hex  | `#7fb0d8` | `<p className="font-sans text-micro font-semibold uppercase tracking-[0.16em] text-[#7fb0d8]">Ready to start?</p>`                                                                     |
|   39 | hex  | `#1a1300` | `<span className="inline-block h-2 w-2 rounded-full bg-[#1a1300] motion-safe:animate-pulse" />`                                                                                        |
|   61 | hex  | `#7fb0d8` | `<MessageCircle className="h-4 w-4 text-[#7fb0d8]" />`                                                                                                                                 |

### `src/components/landing/GovtTrustBlock.tsx` — 5

| Line | Kind | Value                   | Context                                                                                                                                                                                |
| ---: | ---- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   19 | hex  | `#0B1325`               | `<div className="tone-dark w-full border-y border-white/10 bg-[#0B1325]">`                                                                                                             |
|   25 | rgba | `rgba(245,196,81,0.10)` | `style={{ background: "rgba(245,196,81,0.10)" }}`                                                                                                                                      |
|   30 | hex  | `#7FB0D8`               | `<p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-[#7FB0D8]">`                                                                                        |
|   50 | hex  | `#7FB0D8`               | `<Icon className="h-3.5 w-3.5 text-[#7FB0D8]" />`                                                                                                                                      |
|   66 | hex  | `#1A1300`               | `className="inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-full bg-gold px-4 text-caption font-semibold text-[#1A1300] shadow-sm transition hover:bg-gold/90 act` |

### `src/components/transition/SpaceLoader.tsx` — 5

| Line | Kind | Value     | Context                                                                                                                                                  |
| ---: | ---- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   22 | hex  | `#070B16` | `className={`pointer-events-none fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#070B16] transition-opacity duration-500 ${` |
|   33 | hex  | `#60A5FA` | `"radial-gradient(60% 50% at 50% 45%, color-mix(in oklab, var(--primary-glow, #60A5FA) 22%, transparent), transparent 70%)",`                            |
|   55 | hex  | `#60A5FA` | `"radial-gradient(circle, color-mix(in oklab, var(--primary-glow, #60A5FA) 50%, transparent) 0%, transparent 70%)",`                                     |
|   70 | hex  | `#60A5FA` | `stroke="color-mix(in oklab, var(--primary-glow, #60A5FA) 60%, transparent)"`                                                                            |
|   75 | hex  | `#F5C04A` | `<circle cx="50" cy="4" r="2" fill="var(--gold, #F5C04A)" />`                                                                                            |

### `src/routes/moments.index.tsx` — 5

| Line | Kind | Value                   | Context                                                                                                                                                                                |
| ---: | ---- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  178 | hex  | `#0A1024`               | `? "tone-dark bg-[#0A1024] text-white hover:bg-[#0A1024]/90"`                                                                                                                          |
|  178 | hex  | `#0A1024`               | `? "tone-dark bg-[#0A1024] text-white hover:bg-[#0A1024]/90"`                                                                                                                          |
|  179 | hex  | `#0A1024`               | `: "tone-light bg-white text-[#0A1024] hover:bg-white/90",`                                                                                                                            |
|  229 | rgba | `rgba(16,185,129,0.14)` | `className="relative aspect-[4/3] w-full bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.14),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(59,130,246,0.12),transpa` |
|  229 | rgba | `rgba(59,130,246,0.12)` | `className="relative aspect-[4/3] w-full bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.14),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(59,130,246,0.12),transpa` |

### `src/components/courses/sections/CostOfWaitingBlock.tsx` — 4

| Line | Kind | Value                    | Context                                                                               |
| ---: | ---- | ------------------------ | ------------------------------------------------------------------------------------- |
|   46 | rgba | `rgba(255,255,255,0.06)` | `style={{ background: "rgba(255,255,255,0.06)" }}`                                    |
|   69 | rgba | `rgba(15,23,42,0.6)`     | `style={{ background: "rgba(15,23,42,0.6)", borderColor: "rgba(255,255,255,0.10)" }}` |
|   69 | rgba | `rgba(255,255,255,0.10)` | `style={{ background: "rgba(15,23,42,0.6)", borderColor: "rgba(255,255,255,0.10)" }}` |
|   73 | hex  | `#94A3B8`                | `<p className="mt-1 text-caption leading-snug" style={{ color: "#94A3B8" }}>{v}</p>`  |

### `src/components/courses/sections/TrustRibbon.tsx` — 4

| Line | Kind | Value                    | Context                                                                                   |
| ---: | ---- | ------------------------ | ----------------------------------------------------------------------------------------- |
|   22 | rgba | `rgba(15,23,42,0.55)`    | `style={{ background: "rgba(15,23,42,0.55)", borderColor: "rgba(255,255,255,0.08)" }}`    |
|   22 | rgba | `rgba(255,255,255,0.08)` | `style={{ background: "rgba(15,23,42,0.55)", borderColor: "rgba(255,255,255,0.08)" }}`    |
|   33 | rgba | `rgba(255,255,255,0.04)` | `style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.10)" }}` |
|   33 | rgba | `rgba(255,255,255,0.10)` | `style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.10)" }}` |

### `src/components/landing/BentoProgrammes.tsx` — 4

| Line | Kind | Value  | Context                                                                                         |
| ---: | ---- | ------ | ----------------------------------------------------------------------------------------------- |
|  129 | hex  | `#000` | `"linear-gradient(90deg, transparent 0, #000 16px, #000 calc(100% - 28px), transparent 100%)",` |
|  129 | hex  | `#000` | `"linear-gradient(90deg, transparent 0, #000 16px, #000 calc(100% - 28px), transparent 100%)",` |
|  131 | hex  | `#000` | `"linear-gradient(90deg, transparent 0, #000 16px, #000 calc(100% - 28px), transparent 100%)",` |
|  131 | hex  | `#000` | `"linear-gradient(90deg, transparent 0, #000 16px, #000 calc(100% - 28px), transparent 100%)",` |

### `src/components/landing/LimitedSeatsCountdown.tsx` — 4

| Line | Kind | Value     | Context                                                                                                                                                      |
| ---: | ---- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|  190 | hex  | `#F59E0B` | `<span className="ml-1 inline-flex items-center rounded-full bg-[#F59E0B]/15 px-2 py-0.5 font-mono text-micro uppercase tracking-[0.22em] text-[#B45309]">`  |
|  190 | hex  | `#B45309` | `<span className="ml-1 inline-flex items-center rounded-full bg-[#F59E0B]/15 px-2 py-0.5 font-mono text-micro uppercase tracking-[0.22em] text-[#B45309]">`  |
|  197 | hex  | `#F59E0B` | `className={`h-full rounded-full transition-[width] duration-[1200ms] ease-out ${locked ? "bg-rose-500" : "bg-gradient-to-r from-[#F59E0B] to-[#B45309]"}`}` |
|  197 | hex  | `#B45309` | `className={`h-full rounded-full transition-[width] duration-[1200ms] ease-out ${locked ? "bg-rose-500" : "bg-gradient-to-r from-[#F59E0B] to-[#B45309]"}`}` |

### `src/routes/career-engine.enrol.tsx` — 4

| Line | Kind | Value                     | Context                                                                                  |
| ---: | ---- | ------------------------- | ---------------------------------------------------------------------------------------- |
|  228 | hex  | `#0A0F1E`                 | `isSelected ? "border-primary-glow bg-primary-glow text-[#0A0F1E]" : "border-white/25",` |
|  385 | rgb  | `rgb(255 255 255 / 0.10)` | `border: 1px solid rgb(255 255 255 / 0.10);`                                             |
|  386 | rgb  | `rgb(255 255 255 / 0.03)` | `background: rgb(255 255 255 / 0.03);`                                                   |
|  391 | rgb  | `rgb(255 255 255 / 0.30)` | `.ce-input::placeholder { color: rgb(255 255 255 / 0.30); }`                             |

### `src/components/career/CareerShell.tsx` — 3

| Line | Kind | Value     | Context                                                                                            |
| ---: | ---- | --------- | -------------------------------------------------------------------------------------------------- |
|   16 | hex  | `#070B16` | `<main className="tone-dark relative min-h-app bg-[#070B16] pb-20 text-white">`                    |
|   17 | hex  | `#040d1c` | `<header className="sticky top-0 z-30 border-b border-white/10 bg-[#040d1c]/85 backdrop-blur-md">` |
|   25 | hex  | `#7FB0D8` | `<span style={{ color: "#7FB0D8" }}>`                                                              |

### `src/components/career/ResultConversionStrip.tsx` — 3

| Line | Kind | Value     | Context                                                                                                                                                                                |
| ---: | ---- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   32 | hex  | `#1a1430` | `className="mb-6 overflow-hidden rounded-3xl border border-amber-300/30 bg-gradient-to-br from-[#1a1430] via-[#0f1a3d] to-[#0a1430] p-5 shadow-[0_24px_60px_-20px_rgba(251,191,36,0.3` |
|   32 | hex  | `#0f1a3d` | `className="mb-6 overflow-hidden rounded-3xl border border-amber-300/30 bg-gradient-to-br from-[#1a1430] via-[#0f1a3d] to-[#0a1430] p-5 shadow-[0_24px_60px_-20px_rgba(251,191,36,0.3` |
|   32 | hex  | `#0a1430` | `className="mb-6 overflow-hidden rounded-3xl border border-amber-300/30 bg-gradient-to-br from-[#1a1430] via-[#0f1a3d] to-[#0a1430] p-5 shadow-[0_24px_60px_-20px_rgba(251,191,36,0.3` |

### `src/components/career/v2/PrimaryFit.tsx` — 3

| Line | Kind | Value                    | Context                                                                                        |
| ---: | ---- | ------------------------ | ---------------------------------------------------------------------------------------------- |
|  132 | rgba | `rgba(255,255,255,0.08)` | `<circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />` |
|  146 | hex  | `#7FB0D8`                | `<stop offset="0%" stopColor="#7FB0D8" />`                                                     |
|  147 | hex  | `#34d399`                | `<stop offset="100%" stopColor="#34d399" />`                                                   |

### `src/components/courses/ConversionSection.tsx` — 3

| Line | Kind | Value                    | Context                                                                               |
| ---: | ---- | ------------------------ | ------------------------------------------------------------------------------------- |
|   41 | hex  | `#475569`                | `style={{ color: "#475569" }}`                                                        |
|   84 | rgba | `rgba(15,23,42,0.6)`     | `style={{ background: "rgba(15,23,42,0.6)", borderColor: "rgba(255,255,255,0.10)" }}` |
|   84 | rgba | `rgba(255,255,255,0.10)` | `style={{ background: "rgba(15,23,42,0.6)", borderColor: "rgba(255,255,255,0.10)" }}` |

### `src/components/courses/TrustBar.tsx` — 3

| Line | Kind | Value     | Context                                                                  |
| ---: | ---- | --------- | ------------------------------------------------------------------------ |
|   17 | hex  | `#0B1325` | `className={`w-full border-y border-white/10 bg-[#0B1325] ${`            |
|   25 | hex  | `#60A5FA` | `style={{ color: "#60A5FA" }}`                                           |
|   37 | hex  | `#60A5FA` | `<Icon className="h-3.5 w-3.5 shrink-0" style={{ color: "#60A5FA" }} />` |

### `src/components/courses/sections/HowItWorksTimeline.tsx` — 3

| Line | Kind | Value                    | Context                                                                                                            |
| ---: | ---- | ------------------------ | ------------------------------------------------------------------------------------------------------------------ |
|   23 | rgba | `rgba(15,23,42,0.6)`     | `style={{ background: "rgba(15,23,42,0.6)", borderColor: "rgba(255,255,255,0.10)" }}`                              |
|   23 | rgba | `rgba(255,255,255,0.10)` | `style={{ background: "rgba(15,23,42,0.6)", borderColor: "rgba(255,255,255,0.10)" }}`                              |
|   47 | hex  | `#94A3B8`                | `<p className="mt-3 font-mono text-micro font-semibold uppercase tracking-[0.18em]" style={{ color: "#94A3B8" }}>` |

### `src/components/landing/ParentSection.tsx` — 3

| Line | Kind | Value     | Context                                                                                                                          |
| ---: | ---- | --------- | -------------------------------------------------------------------------------------------------------------------------------- |
|   70 | hex  | `#0F1A30` | `<div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F1A30] to-[#0B1325] p-6 sm:p-10">` |
|   70 | hex  | `#0B1325` | `<div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F1A30] to-[#0B1325] p-6 sm:p-10">` |
|   88 | hex  | `#1A1300` | `? "bg-gold text-[#1A1300]"`                                                                                                     |

### `src/hooks/useAdminErrorReporter.ts` — 3

| Line | Kind | Value  | Context                                                                |
| ---: | ---- | ------ | ---------------------------------------------------------------------- |
|    7 | hex  | `#418` | `* Also flags React hydration mismatches (#418/#423/#425) explicitly.` |
|    7 | hex  | `#423` | `* Also flags React hydration mismatches (#418/#423/#425) explicitly.` |
|    7 | hex  | `#425` | `* Also flags React hydration mismatches (#418/#423/#425) explicitly.` |

### `src/routes/courses.$slug.tsx` — 3

| Line | Kind | Value     | Context                                                                                                                       |
| ---: | ---- | --------- | ----------------------------------------------------------------------------------------------------------------------------- |
|  223 | hex  | `#0A0F1E` | `<main className="min-h-app bg-[#0A0F1E] text-white">`                                                                        |
|  256 | hex  | `#0A0F1E` | `<main className="min-h-app bg-[#0A0F1E] text-white">`                                                                        |
|  269 | hex  | `#0A0F1E` | `className="inline-flex h-11 items-center rounded-full bg-white text-[#0A0F1E] px-5 text-sm font-semibold hover:bg-white/90"` |

### `src/routes/curriculum.tsx` — 3

| Line | Kind | Value                   | Context                                                                                                                    |
| ---: | ---- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------- |
|   39 | hex  | `#06080d`               | `<div className="tone-dark min-h-dvh bg-[#06080d] text-white">`                                                            |
|   42 | rgba | `rgba(59,130,246,0.18)` | `<div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(59,130,246,0.18),transparent_70%)]" />` |
|   69 | hex  | `#06080d`               | `? "border-accent-glow/40 bg-sky-300 text-[#06080d] shadow-[0_0_0_3px_rgba(125,211,252,0.15)]"`                            |

### `src/routes/dashboard.tsx` — 3

| Line | Kind | Value     | Context                                                                                                  |
| ---: | ---- | --------- | -------------------------------------------------------------------------------------------------------- |
|   55 | hex  | `#0A0F1E` | `<main className="tone-dark min-h-app bg-[#0A0F1E] text-white">`                                         |
|   80 | hex  | `#101A33` | `<div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#101A33] to-[#0B1224] p-7">` |
|   80 | hex  | `#0B1224` | `<div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#101A33] to-[#0B1224] p-7">` |

### `src/routes/industry.compare.tsx` — 3

| Line | Kind | Value     | Context                                                                                                                                                   |
| ---: | ---- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   43 | hex  | `#070A14` | `<div className="tone-dark min-h-dvh bg-[#070A14] text-white">`                                                                                           |
|  215 | hex  | `#1A1300` | `<Link to="/career-engine" className="inline-flex h-10 items-center rounded-full bg-gold px-4 text-caption font-bold text-[#1A1300] hover:bg-gold/90">`   |
|  228 | hex  | `#0A0E1A` | `<th scope="row" className="sticky left-0 z-10 bg-[#0A0E1A] px-4 py-3 text-left text-micro font-medium uppercase tracking-wide text-white/50 align-top">` |

### `src/components/career/cards/primitives.tsx` — 2

| Line | Kind | Value                    | Context                                                                                                                                 |
| ---: | ---- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
|   49 | rgba | `rgba(255,255,255,0.55)` | `"radial-gradient(rgba(255,255,255,0.55) 0.5px, transparent 0.5px), radial-gradient(rgba(255,255,255,0.35) 0.5px, transparent 0.5px)",` |
|   49 | rgba | `rgba(255,255,255,0.35)` | `"radial-gradient(rgba(255,255,255,0.55) 0.5px, transparent 0.5px), radial-gradient(rgba(255,255,255,0.35) 0.5px, transparent 0.5px)",` |

### `src/components/courses/EnrolmentRail.tsx` — 2

| Line | Kind | Value     | Context                                                                                                                                                                                |
| ---: | ---- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   90 | hex  | `#0A0F1E` | `<div className="pointer-events-auto mx-3 mb-3 flex items-center gap-2 rounded-full border border-white/15 bg-[#0A0F1E]/95 px-2 py-2 backdrop-blur-lg shadow-[0_-12px_40px_-10px_rgba` |
|   93 | hex  | `#1A1300` | `className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-full bg-gold px-4 text-caption font-semibold text-[#1A1300] hover:bg-gold/90"`                                |

### `src/components/courses/MentorCard.tsx` — 2

| Line | Kind | Value                    | Context                                                                             |
| ---: | ---- | ------------------------ | ----------------------------------------------------------------------------------- |
|   10 | rgba | `rgba(17,26,46,1)`       | `style={{ background: "rgba(17,26,46,1)", borderColor: "rgba(255,255,255,0.10)" }}` |
|   10 | rgba | `rgba(255,255,255,0.10)` | `style={{ background: "rgba(17,26,46,1)", borderColor: "rgba(255,255,255,0.10)" }}` |

### `src/components/courses/sections/FaqBlock.tsx` — 2

| Line | Kind | Value                    | Context                                                                             |
| ---: | ---- | ------------------------ | ----------------------------------------------------------------------------------- |
|   22 | rgba | `rgba(17,26,46,1)`       | `style={{ background: "rgba(17,26,46,1)", borderColor: "rgba(255,255,255,0.10)" }}` |
|   22 | rgba | `rgba(255,255,255,0.10)` | `style={{ background: "rgba(17,26,46,1)", borderColor: "rgba(255,255,255,0.10)" }}` |

### `src/components/courses/sections/UrgencyBlock.tsx` — 2

| Line | Kind | Value                | Context                                                                                          |
| ---: | ---- | -------------------- | ------------------------------------------------------------------------------------------------ |
|   39 | rgba | `rgba(15,23,42,0.6)` | `background: `linear-gradient(180deg, ${theme.hex.from}18, rgba(15,23,42,0.6))`,`                |
|   45 | hex  | `#94A3B8`            | `<p className="mt-1 text-meta uppercase tracking-[0.18em]" style={{ color: "#94A3B8" }}>{v}</p>` |

### `src/components/landing/CohortStories.tsx` — 2

| Line | Kind | Value     | Context                                                                                         |
| ---: | ---- | --------- | ----------------------------------------------------------------------------------------------- |
|   42 | hex  | `#070B17` | `<section aria-labelledby="stories-heading" className="tone-dark bg-[#070B17] py-16 sm:py-20">` |
|   58 | hex  | `#7fb0d8` | `<p className="font-mono text-micro font-semibold uppercase tracking-[0.16em] text-[#7fb0d8]">` |

### `src/components/landing/Comparison.tsx` — 2

| Line | Kind | Value     | Context                                                                                                                                                  |
| ---: | ---- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   63 | hex  | `#0f1b3d` | `<div className="mt-8 flex flex-col items-start gap-3 rounded-2xl border border-gold/25 bg-[#0f1b3d] p-5 sm:flex-row sm:items-center sm:gap-5 sm:p-6">`  |
|   87 | hex  | `#0A0F1E` | `className="inline-flex h-11 items-center justify-center gap-2 self-start rounded-full bg-gold px-5 text-body-sm font-bold text-[#0A0F1E] sm:self-auto"` |

### `src/components/landing/DayInTheLifeStrip.tsx` — 2

| Line | Kind | Value     | Context                                                                                                                                                                                |
| ---: | ---- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   79 | hex  | `#1E40AF` | `<span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[#1E40AF] text-white ring-1 ring-white/40 shadow-[0_4px_14px_-6px_rg` |
|   87 | hex  | `#7fb0d8` | `<p className="mt-4 font-mono text-micro font-semibold uppercase tracking-[0.2em] text-[#7fb0d8]">`                                                                                    |

### `src/components/landing/EtvVideoEmbed.tsx` — 2

| Line | Kind | Value     | Context                                                                                                                                         |
| ---: | ---- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
|  100 | hex  | `#1A1300` | `<span className="relative inline-flex items-center gap-2 rounded-full bg-gold/95 px-5 py-2.5 text-sm font-semibold text-[#1A1300] shadow-xl">` |
|  148 | hex  | `#1A1300` | `<span className="relative inline-flex items-center gap-2 rounded-full bg-gold/95 px-5 py-2.5 text-sm font-semibold text-[#1A1300] shadow-xl">` |

### `src/components/landing/MobileWhatsAppFAB.tsx` — 2

| Line | Kind | Value     | Context                                                                                                                                                                                |
| ---: | ---- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   97 | hex  | `#25D366` | `className={`fixed right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-6px_rgba(37,211,102,0.55)] ring-1 ring-white/15 ` |
|  104 | hex  | `#25D366` | `className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 motion-safe:animate-ping"`                                                                                           |

### `src/components/landing/TaskPartnershipBlock.tsx` — 2

| Line | Kind | Value                   | Context                                                                                                            |
| ---: | ---- | ----------------------- | ------------------------------------------------------------------------------------------------------------------ |
|   80 | hex  | `#06080d`               | `className="tone-dark relative overflow-hidden border-y border-white/10 bg-[#06080d] text-white"`                  |
|   84 | rgba | `rgba(59,130,246,0.18)` | `className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(59,130,246,0.18),transparent_70%)]"` |

### `src/components/proof/LiveProofCounter.tsx` — 2

| Line | Kind | Value     | Context                                                                               |
| ---: | ---- | --------- | ------------------------------------------------------------------------------------- |
|   36 | hex  | `#7fb0d8` | `? "border-white/12 bg-white/[0.04] hover:border-[#7fb0d8]/45 hover:bg-white/[0.07]"` |
|   40 | hex  | `#7fb0d8` | `const chev = isDark ? "text-[#7fb0d8]" : "text-[color:var(--teal-deep)]";`           |

### `src/lib/dev/css-hmr-probe.ts` — 2

| Line | Kind | Value     | Context                                                                                                                          |
| ---: | ---- | --------- | -------------------------------------------------------------------------------------------------------------------------------- |
|   21 | hex  | `#0d9488` | `"color:#0d9488;font-weight:bold;",`                                                                                             |
|   27 | hex  | `#0d9488` | `console.log("%c[CSS HMR]%c probe armed — edit src/styles.css to verify", "color:#0d9488;font-weight:bold;", "color:inherit;");` |

### `src/routes/admin.experiments.tsx` — 2

| Line | Kind | Value                   | Context                                                                           |
| ---: | ---- | ----------------------- | --------------------------------------------------------------------------------- |
|  216 | rgba | `rgba(255,255,255,0.5)` | `<path d={ePath} fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth={1.5} />` |
|  217 | hex  | `#10B981`               | `<path d={pPath} fill="none" stroke="#10B981" strokeWidth={1.5} />`               |

### `src/routes/admin.metrics-domain-grid.tsx` — 2

| Line | Kind | Value     | Context                                                                          |
| ---: | ---- | --------- | -------------------------------------------------------------------------------- |
|   88 | hex  | `#0A0F1E` | `className="mt-1 rounded-md border border-border bg-[#0A0F1E] px-2 py-1.5"`      |
|   99 | hex  | `#0A0F1E` | `className="mt-1 w-24 rounded-md border border-border bg-[#0A0F1E] px-2 py-1.5"` |

### `src/routes/admin.results.tsx` — 2

| Line | Kind | Value     | Context                                                                                               |
| ---: | ---- | --------- | ----------------------------------------------------------------------------------------------------- |
|  350 | hex  | `#0b1020` | `<div className="w-full max-w-md rounded-2xl border border-border bg-[#0b1020] p-6 text-foreground">` |
|  412 | hex  | `#0b1020` | `<aside className="w-full max-w-lg overflow-y-auto bg-[#0b1020] border-l border-border p-6">`         |

### `src/routes/industry.$role.tsx` — 2

| Line | Kind | Value     | Context                                                                                                                         |
| ---: | ---- | --------- | ------------------------------------------------------------------------------------------------------------------------------- |
|   64 | hex  | `#070A14` | `<div className="min-h-dvh bg-[#070A14] text-white">`                                                                           |
|  161 | hex  | `#1A1300` | `className="inline-flex h-11 items-center gap-1.5 rounded-full bg-gold px-5 text-sm font-bold text-[#1A1300] hover:bg-gold/90"` |

### `src/routes/industry.employers.tsx` — 2

| Line | Kind | Value     | Context                                                                                                                           |
| ---: | ---- | --------- | --------------------------------------------------------------------------------------------------------------------------------- |
|  118 | hex  | `#070A14` | `<div className="min-h-dvh bg-[#070A14] text-white">`                                                                             |
|  206 | hex  | `#0d1124` | `className="rounded-md border border-white/15 bg-[#0d1124] px-3 py-2 text-sm text-white focus:border-gold/60 focus:outline-none"` |

### `src/routes/industry.salaries.tsx` — 2

| Line | Kind | Value     | Context                                                                                                                           |
| ---: | ---- | --------- | --------------------------------------------------------------------------------------------------------------------------------- |
|  126 | hex  | `#070A14` | `<div className="min-h-dvh bg-[#070A14] text-white">`                                                                             |
|  209 | hex  | `#0d1124` | `className="rounded-md border border-white/15 bg-[#0d1124] px-3 py-2 text-sm text-white focus:border-gold/60 focus:outline-none"` |

### `src/routes/r.$id.brief.tsx` — 2

| Line | Kind | Value     | Context                                                                                 |
| ---: | ---- | --------- | --------------------------------------------------------------------------------------- |
|   61 | hex  | `#f5f7fa` | `<main className="min-h-dvh bg-[#f5f7fa] text-slate-900">`                              |
|   65 | hex  | `#0f1b3d` | `<div className="border-b border-slate-100 bg-[#0f1b3d] px-5 py-5 text-white sm:px-7">` |

### `src/routes/r.$id.tsx` — 2

| Line | Kind | Value                    | Context                                                                                         |
| ---: | ---- | ------------------------ | ----------------------------------------------------------------------------------------------- |
|   69 | hex  | `#070A14`                | `<main className="min-h-dvh bg-[#070A14] text-white">`                                          |
|   87 | rgba | `rgba(255,255,255,0.08)` | `<circle cx="50" cy="50" r="42" stroke="rgba(255,255,255,0.08)" strokeWidth="6" fill="none" />` |

### `src/routes/verify.tsx` — 2

| Line | Kind | Value     | Context                                                                                                                                                                |
| ---: | ---- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   73 | hex  | `#0A0F1E` | `<main className="tone-dark min-h-app bg-[#0A0F1E] text-white">`                                                                                                       |
|   92 | hex  | `#0b1220` | `className="h-12 flex-1 rounded-full border border-white/10 bg-[#0b1220] px-5 text-sm text-white outline-none ring-primary/30 placeholder:text-white/80 focus:ring-2"` |

### `src/components/Prime60WaitlistForm.tsx` — 1

| Line | Kind | Value     | Context                                                 |
| ---: | ---- | --------- | ------------------------------------------------------- |
|  232 | hex  | `#1a1305` | `? "bg-yellow-400 text-[#1a1305] hover:brightness-110"` |

### `src/components/apply/ApplyShell.tsx` — 1

| Line | Kind | Value     | Context                                                                                                                 |
| ---: | ---- | --------- | ----------------------------------------------------------------------------------------------------------------------- |
|   42 | hex  | `#070B17` | `<div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-[#070B17] ring-1 ring-ink/10">` |

### `src/components/career/ShareResult.tsx` — 1

| Line | Kind | Value     | Context                                                                                                                                                                                |
| ---: | ---- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  109 | hex  | `#0A66C2` | `className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#0A66C2] px-3 py-2.5 text-meta font-bold text-white shadow-sm transition hover:brightness-110 motion-red` |

### `src/components/career/cards/FlagshipTrackCard.tsx` — 1

| Line | Kind | Value              | Context                                                                                                           |
| ---: | ---- | ------------------ | ----------------------------------------------------------------------------------------------------------------- |
|   54 | rgb  | `rgb(226 232 240)` | `<circle cx={ringSize / 2} cy={ringSize / 2} r={r} stroke="rgb(226 232 240)" strokeWidth={stroke} fill="none" />` |

### `src/components/career/v2/RoleLadder.tsx` — 1

| Line | Kind | Value     | Context                                                                         |
| ---: | ---- | --------- | ------------------------------------------------------------------------------- |
|   80 | hex  | `#0b1117` | `<DialogContent className="max-w-2xl border-white/15 bg-[#0b1117] text-white">` |

### `src/components/career/v2/SevenDayPlan.tsx` — 1

| Line | Kind | Value     | Context                                                                                                            |
| ---: | ---- | --------- | ------------------------------------------------------------------------------------------------------------------ |
|   61 | hex  | `#06080d` | `className="tone-dark mt-8 overflow-hidden rounded-3xl border border-white/10 bg-[#06080d] p-5 text-white sm:p-8"` |

### `src/components/career/v2/StickyResultCta.tsx` — 1

| Line | Kind | Value     | Context                                                                                                                                                                                |
| ---: | ---- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   35 | hex  | `#040d1c` | `<div className="flex flex-col items-stretch gap-2 rounded-2xl border border-white/12 bg-[#040d1c]/95 p-2.5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)] backdrop-blur sm:flex-row sm:i` |

### `src/components/courses/BrochureButton.tsx` — 1

| Line | Kind | Value     | Context                                    |
| ---: | ---- | --------- | ------------------------------------------ |
|   48 | hex  | `#0f172a` | `doc.setFillColor(15, 23, 42); // #0f172a` |

### `src/components/courses/EnquiryDrawer.tsx` — 1

| Line | Kind | Value     | Context                                                                               |
| ---: | ---- | --------- | ------------------------------------------------------------------------------------- |
|   26 | hex  | `#0A0F1E` | `className="w-full border-l border-white/10 bg-[#0A0F1E] p-0 text-white sm:max-w-md"` |

### `src/components/courses/JDInsights.tsx` — 1

| Line | Kind | Value     | Context                                                           |
| ---: | ---- | --------- | ----------------------------------------------------------------- |
|   19 | hex  | `#111A2E` | `className="rounded-2xl border border-white/10 bg-[#111A2E] p-5"` |

### `src/components/courses/SyllabusAccordion.tsx` — 1

| Line | Kind | Value     | Context                                                         |
| ---: | ---- | --------- | --------------------------------------------------------------- |
|   62 | hex  | `#0A0F1E` | `<p className="mt-1 text-xs text-[#0A0F1E]/80">{m.jdSkill}</p>` |

### `src/components/courses/sections/SolutionBlock.tsx` — 1

| Line | Kind | Value     | Context                                                          |
| ---: | ---- | --------- | ---------------------------------------------------------------- |
|   33 | hex  | `#94A3B8` | `<p className="mt-4 text-body-sm" style={{ color: "#94A3B8" }}>` |

### `src/components/feedback/AiFeedbackPrompt.tsx` — 1

| Line | Kind | Value     | Context                                                                                                                        |
| ---: | ---- | --------- | ------------------------------------------------------------------------------------------------------------------------------ |
|   64 | hex  | `#0B1426` | `<div className={"rounded-2xl border border-white/15 bg-[#0B1426] p-4 text-sm text-white/85 shadow-lg " + (className ?? "")}>` |

### `src/components/landing/ApplicationForm.tsx` — 1

| Line | Kind | Value                 | Context                                                                         |
| ---: | ---- | --------------------- | ------------------------------------------------------------------------------- |
|  430 | rgba | `rgba(15,27,61,0.15)` | `style={{ background: step === 2 ? "var(--primary)" : "rgba(15,27,61,0.15)" }}` |

### `src/components/landing/AssayExplainer.tsx` — 1

| Line | Kind | Value     | Context                                                                        |
| ---: | ---- | --------- | ------------------------------------------------------------------------------ |
|  125 | hex  | `#0A0F1E` | `<div className="mt-4 rounded-xl border border-white/10 bg-[#0A0F1E]/70 p-3">` |

### `src/components/landing/DemandUnlockStrip.tsx` — 1

| Line | Kind | Value     | Context                                                                                                   |
| ---: | ---- | --------- | --------------------------------------------------------------------------------------------------------- |
|  124 | hex  | `#7fb0d8` | `className="inline-flex items-center gap-1 text-caption font-semibold text-[#7fb0d8] hover:text-primary"` |

### `src/components/landing/HiringPartnerWall.tsx` — 1

| Line | Kind | Value     | Context                                                                      |
| ---: | ---- | --------- | ---------------------------------------------------------------------------- |
|   34 | hex  | `#0a1430` | `className="tone-dark relative overflow-hidden bg-[#0a1430] py-12 sm:py-16"` |

### `src/components/landing/InterviewRoadmap.tsx` — 1

| Line | Kind | Value     | Context                                                                                                                    |
| ---: | ---- | --------- | -------------------------------------------------------------------------------------------------------------------------- |
|   15 | hex  | `#0a1430` | `<section id="roadmap" aria-labelledby="roadmap-heading" className="tone-dark bg-[#0a1430] py-16 sm:py-20 text-slate-50">` |

### `src/components/landing/LiveBar.tsx` — 1

| Line | Kind | Value     | Context                                                                                           |
| ---: | ---- | --------- | ------------------------------------------------------------------------------------------------- |
|    7 | hex  | `#070B17` | `<div className="tone-dark relative z-30 border-b border-white/5 bg-[#070B17]/90 backdrop-blur">` |

### `src/components/landing/MidPageReserveStrip.tsx` — 1

| Line | Kind | Value     | Context                                                                                                                                                              |
| ---: | ---- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   27 | hex  | `#1A1300` | `className="mt-5 inline-flex h-12 w-full items-center justify-center gap-1.5 rounded-full bg-gold px-5 text-sm font-bold text-[#1A1300] hover:bg-gold/90 sm:w-auto"` |

### `src/components/recruiters/CandidatePortfolio.tsx` — 1

| Line | Kind | Value     | Context                                 |
| ---: | ---- | --------- | --------------------------------------- |
|   50 | hex  | `#F7F9FC` | `<main className="bg-[#F7F9FC] pb-24">` |

### `src/components/ui/Pill.tsx` — 1

| Line | Kind | Value     | Context                                                                                                           |
| ---: | ---- | --------- | ----------------------------------------------------------------------------------------------------------------- |
|   10 | hex  | `#5a4500` | `premium: "bg-[color:var(--accent-premium-soft)] text-[#5a4500] border border-[color:var(--accent-premium)]/30",` |

### `src/components/ui/SurfaceCard.tsx` — 1

| Line | Kind | Value     | Context                                                                                        |
| ---: | ---- | --------- | ---------------------------------------------------------------------------------------------- |
|   13 | hex  | `#0E1730` | `"bg-[#0E1730] text-white border border-white/10 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)]",` |

### `src/data/careerPathEvidence.ts` — 1

| Line | Kind | Value  | Context                                                                |
| ---: | ---- | ------ | ---------------------------------------------------------------------- |
|    9 | hex  | `#100` | `* #12…#100 becomes data work, not code work. For now: TS module, but` |

### `src/data/courseExtras.ts` — 1

| Line | Kind | Value     | Context                                                         |
| ---: | ---- | --------- | --------------------------------------------------------------- |
|   28 | hex  | `#1a1300` | `augmented: "border-amber-500/60 bg-amber-500 text-[#1a1300]",` |

### `src/lib/razorpayCheckout.ts` — 1

| Line | Kind | Value     | Context                                           |
| ---: | ---- | --------- | ------------------------------------------------- |
|   58 | hex  | `#3B82F6` | `theme: { color: args.themeColor ?? "#3B82F6" },` |

### `src/routes/__root.tsx` — 1

| Line | Kind | Value     | Context                                        |
| ---: | ---- | --------- | ---------------------------------------------- |
|   75 | hex  | `#0A0F1E` | `{ name: "theme-color", content: "#0A0F1E" },` |

### `src/routes/about.tsx` — 1

| Line | Kind | Value     | Context                                                          |
| ---: | ---- | --------- | ---------------------------------------------------------------- |
|   51 | hex  | `#0A0F1E` | `<main className="tone-dark min-h-app bg-[#0A0F1E] text-white">` |

### `src/routes/acri.tsx` — 1

| Line | Kind | Value     | Context                                                    |
| ---: | ---- | --------- | ---------------------------------------------------------- |
|   51 | hex  | `#F7F9FC` | `<main className="min-h-app bg-[#F7F9FC] pb-24 text-ink">` |

### `src/routes/admin.leads.tsx` — 1

| Line | Kind | Value     | Context                                                                                                                   |
| ---: | ---- | --------- | ------------------------------------------------------------------------------------------------------------------------- |
|  266 | hex  | `#0b0f1c` | `<aside className="relative ml-auto h-full w-full max-w-xl overflow-y-auto bg-[#0b0f1c] p-6 text-foreground shadow-2xl">` |

### `src/routes/cohorts.tsx` — 1

| Line | Kind | Value     | Context                                                          |
| ---: | ---- | --------- | ---------------------------------------------------------------- |
|   27 | hex  | `#0A0F1E` | `<main className="tone-dark min-h-app bg-[#0A0F1E] text-white">` |

### `src/routes/dev.cards.tsx` — 1

| Line | Kind | Value     | Context                                                   |
| ---: | ---- | --------- | --------------------------------------------------------- |
|  119 | hex  | `#0B1220` | `? "tone-dark min-h-dvh bg-[#0B1220] px-4 py-10 sm:px-8"` |

### `src/routes/enrol.$tier.tsx` — 1

| Line | Kind | Value     | Context                                                                                                                                                                            |
| ---: | ---- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  188 | hex  | `#0b1220` | `className="h-11 rounded-lg border-white/10 bg-[#0b1220] text-white placeholder:text-white/80 focus-visible:border-primary/60 focus-visible:ring-2 focus-visible:ring-primary/30"` |

### `src/routes/enrol.tsx` — 1

| Line | Kind | Value     | Context                                                                                                                 |
| ---: | ---- | --------- | ----------------------------------------------------------------------------------------------------------------------- |
|   23 | hex  | `#070B17` | `<div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-[#070B17] ring-1 ring-ink/10">` |

### `src/routes/faq.tsx` — 1

| Line | Kind | Value     | Context                                                                  |
| ---: | ---- | --------- | ------------------------------------------------------------------------ |
|   28 | hex  | `#0a1430` | `<section className="tone-dark bg-[#0a1430] py-14 text-white sm:py-20">` |

### `src/routes/industry.$role.$city.tsx` — 1

| Line | Kind | Value     | Context                                               |
| ---: | ---- | --------- | ----------------------------------------------------- |
|   91 | hex  | `#070A14` | `<div className="min-h-dvh bg-[#070A14] text-white">` |

### `src/routes/industry.index.tsx` — 1

| Line | Kind | Value     | Context                                               |
| ---: | ---- | --------- | ----------------------------------------------------- |
|   23 | hex  | `#070A14` | `<div className="min-h-dvh bg-[#070A14] text-white">` |

### `src/routes/legal.privacy.tsx` — 1

| Line | Kind | Value     | Context                                                          |
| ---: | ---- | --------- | ---------------------------------------------------------------- |
|   26 | hex  | `#0A0F1E` | `<main className="tone-dark min-h-app bg-[#0A0F1E] text-white">` |

### `src/routes/legal.terms.tsx` — 1

| Line | Kind | Value     | Context                                                          |
| ---: | ---- | --------- | ---------------------------------------------------------------- |
|   26 | hex  | `#0A0F1E` | `<main className="tone-dark min-h-app bg-[#0A0F1E] text-white">` |

### `src/routes/r.artifact.$token.tsx` — 1

| Line | Kind | Value     | Context                                                    |
| ---: | ---- | --------- | ---------------------------------------------------------- |
|   74 | hex  | `#F7F9FC` | `<main className="min-h-app bg-[#F7F9FC] pb-24 text-ink">` |

### `src/routes/recruiters.tsx` — 1

| Line | Kind | Value     | Context                                                    |
| ---: | ---- | --------- | ---------------------------------------------------------- |
|   68 | hex  | `#F7F9FC` | `<main className="min-h-app bg-[#F7F9FC] pb-24 text-ink">` |

### `src/routes/refund.tsx` — 1

| Line | Kind | Value     | Context                                                          |
| ---: | ---- | --------- | ---------------------------------------------------------------- |
|   37 | hex  | `#0A0F1E` | `<main className="tone-dark min-h-app bg-[#0A0F1E] text-white">` |

### `src/routes/tpos.tsx` — 1

| Line | Kind | Value     | Context                                                    |
| ---: | ---- | --------- | ---------------------------------------------------------- |
|   42 | hex  | `#F7F9FC` | `<main className="min-h-app bg-[#F7F9FC] pb-24 text-ink">` |
