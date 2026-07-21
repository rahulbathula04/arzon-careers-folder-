/**
 * EvidenceExplorerModal — one dialog shared by SourceTag + ConfidenceBadge.
 * Opens with a list of source ids and (optionally) a confidence rationale.
 * Renders publisher, verified date, rationale, and any verbatim snippets
 * we've catalogued for that source.
 */
import { useMemo, useState, useEffect } from "react";
import { ExternalLink, FileText, Search, ShieldCheck, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SOURCES } from "@/data/industry/sources";
import { REPORT_TONES } from "./reportTones";
import { useReportState } from "./ReportStateContext";

export function EvidenceExplorerModal() {
  const state = useReportState();
  const req = state.evidence;
  const open = Boolean(req);
  const sources = (req?.ids ?? []).map((id) => SOURCES[id]).filter(Boolean);
  const [query, setQuery] = useState("");
  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);
  const q = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!q) return sources.map((s) => ({ source: s, snippets: s.snippets ?? [], matches: 0 }));
    return sources
      .map((s) => {
        const snippets = (s.snippets ?? []).filter((t) => t.toLowerCase().includes(q));
        const headerMatch =
          s.publisher.toLowerCase().includes(q) ||
          s.label.toLowerCase().includes(q) ||
          (s.rationale?.toLowerCase().includes(q) ?? false);
        const matches = snippets.length + (headerMatch ? 1 : 0);
        return {
          source: s,
          snippets: headerMatch && snippets.length === 0 ? (s.snippets ?? []) : snippets,
          matches,
        };
      })
      .filter((r) => r.matches > 0);
  }, [q, sources]);

  const totalHits = filtered.reduce((sum, r) => sum + r.matches, 0);

  return (
    <Dialog open={open} onOpenChange={(o) => (!o ? state.closeEvidence() : null)}>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto border-white/10 bg-[#0B1120] text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display text-xl text-white">
            <ShieldCheck className={`h-5 w-5 ${REPORT_TONES.secondary.iconFill}`} aria-hidden />
            {req?.title ?? "Evidence Explorer"}
          </DialogTitle>
          <DialogDescription className="text-white/70">
            The exact sources and snippets backing this claim. Every citation is a live link — click
            through to verify independently.
          </DialogDescription>
        </DialogHeader>

        {req?.level && (
          <div
            className={`rounded-xl border p-3 text-sm ${REPORT_TONES.secondary.chipBorder} ${REPORT_TONES.secondary.chipBg} ${REPORT_TONES.secondary.chipText}`}
          >
            <p
              className={`font-semibold uppercase tracking-widest text-[10px] ${REPORT_TONES.secondary.iconFill}`}
            >
              Confidence · {req.level}
            </p>
            <p className="mt-1 text-white/80">
              {req.rationale ??
                (req.level === "high"
                  ? "≥3 sources or ≥50 JDs corroborate this claim within the last 90 days."
                  : req.level === "medium"
                    ? "1–2 sources or 10–49 JDs corroborate this claim. Directional but not exhaustive."
                    : "Single reference or trend signal only — treat as directional.")}
            </p>
          </div>
        )}

        {sources.length > 0 && (
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/40"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search snippets, publisher, or claim…"
              aria-label="Search evidence"
              className="report-focus-ring w-full rounded-full border border-white/10 bg-black/30 py-2 pl-9 pr-9 text-sm text-white placeholder:text-white/40"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-white/50 hover:bg-white/10 hover:text-white"
              >
                <X className="h-3.5 w-3.5" aria-hidden />
              </button>
            )}
            {q && (
              <p className="mt-1 pl-2 font-mono text-[10px] uppercase tracking-widest text-white/50">
                {totalHits === 0
                  ? "No matches"
                  : `${totalHits} match${totalHits === 1 ? "" : "es"} across ${filtered.length} source${filtered.length === 1 ? "" : "s"}`}
              </p>
            )}
          </div>
        )}

        {sources.length === 0 ? (
          <p className="text-sm text-white/60">
            No catalogued sources yet — refreshed monthly by the Arzon research desk.
          </p>
        ) : q ? (
          filtered.length === 0 ? (
            <p className="text-sm text-white/60">No sources match “{query}”.</p>
          ) : (
            <div className="space-y-3">
              {filtered.map(({ source, snippets }) => (
                <SourcePanel key={source.id} s={source} snippetsOverride={snippets} highlight={q} />
              ))}
            </div>
          )
        ) : sources.length === 1 ? (
          <SourcePanel s={sources[0]} />
        ) : (
          <Tabs defaultValue={sources[0].id} className="w-full">
            <TabsList className="flex-wrap justify-start bg-white/5 text-white/70">
              {sources.map((s) => (
                <TabsTrigger
                  key={s.id}
                  value={s.id}
                  className="data-[state=active]:bg-white/10 data-[state=active]:text-white"
                >
                  {s.publisher}
                </TabsTrigger>
              ))}
            </TabsList>
            {sources.map((s) => (
              <TabsContent key={s.id} value={s.id} className="mt-3">
                <SourcePanel s={s} />
              </TabsContent>
            ))}
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
}

function SourcePanel({
  s,
  snippetsOverride,
  highlight,
}: {
  s: (typeof SOURCES)[string];
  snippetsOverride?: string[];
  highlight?: string;
}) {
  const snippets = snippetsOverride ?? s.snippets ?? [];
  return (
    <article className="space-y-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <header className="flex flex-wrap items-baseline justify-between gap-2">
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/50">
            {s.publisher}
          </p>
          <h3 className="mt-0.5 font-display text-lg text-white">{s.label}</h3>
        </div>
        <span
          className={`font-mono text-[10px] uppercase tracking-widest ${REPORT_TONES.secondary.chipText}`}
        >
          As of {s.asOf}
          {s.verifiedAt ? ` · verified ${s.verifiedAt}` : ""}
        </span>
      </header>

      {s.rationale && <p className="text-sm leading-relaxed text-white/75">{s.rationale}</p>}

      {snippets.length > 0 && (
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/50">
            Matching snippets
          </p>
          <ul className="mt-2 space-y-2">
            {snippets.map((snip, i) => (
              <li
                key={i}
                className="flex gap-2 rounded-lg border border-white/10 bg-black/30 p-3 text-sm text-white/80"
              >
                <FileText className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/40" aria-hidden />
                <span className="italic">{highlight ? highlightText(snip, highlight) : snip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <a
        href={s.url}
        target="_blank"
        rel="noopener nofollow"
        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-widest transition hover:brightness-110 ${REPORT_TONES.secondary.chipBorder} ${REPORT_TONES.secondary.chipBg} ${REPORT_TONES.secondary.chipText}`}
      >
        Open source <ExternalLink className="h-3 w-3" aria-hidden />
      </a>
    </article>
  );
}

function highlightText(text: string, q: string) {
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className={`rounded-sm px-0.5 not-italic text-white ${REPORT_TONES.warn.chipBg}`}>
        {text.slice(idx, idx + q.length)}
      </mark>
      {text.slice(idx + q.length)}
    </>
  );
}

export default EvidenceExplorerModal;
