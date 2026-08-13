import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { AiThinkingLoader } from "@/components/ui/AiThinkingLoader";
import { Loader2, Save, ExternalLink } from "lucide-react";
import { CONTENT_QA_ROWS, type Bucket } from "@/data/contentQARows";
import { listContentQAReviews, upsertContentQAReview } from "@/lib/contentQA.functions";

export const Route = createFileRoute("/admin/qa/content-rebalance")({
  head: () => ({
    meta: [
      { title: "Content QA · 70/20/10 rebalance" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: ContentQAPage,
});

const BUCKET_LABEL: Record<Bucket, string> = {
  desire: "70 · Desire",
  proof: "20 · Proof",
  sell: "10 · Sell",
  rescue: "- Rescue",
};

const STATUSES = ["pending", "reviewed", "approved", "live", "rejected"] as const;
type Status = (typeof STATUSES)[number];

type RowState = {
  status: Status;
  notes: string;
  saving?: boolean;
  savedAt?: number;
};

function ContentQAPage() {
  const list = useServerFn(listContentQAReviews);
  const save = useServerFn(upsertContentQAReview);
  const [byKey, setByKey] = useState<Record<string, RowState>>({});
  const [loading, setLoading] = useState(true);

  const keyOf = (page: string, sectionId: string) => `${page}::${sectionId}`;

  useEffect(() => {
    void (async () => {
      try {
        const { rows } = await list();
        const map: Record<string, RowState> = {};
        for (const r of rows) {
          map[keyOf(r.page, r.section_id)] = {
            status: r.status as Status,
            notes: r.notes ?? "",
          };
        }
        setByKey(map);
      } finally {
        setLoading(false);
      }
    })();
  }, [list]);

  const grouped = useMemo(() => {
    const m = new Map<string, typeof CONTENT_QA_ROWS>();
    for (const r of CONTENT_QA_ROWS) {
      const arr = m.get(r.page) ?? [];
      arr.push(r);
      m.set(r.page, arr);
    }
    return [...m.entries()];
  }, []);

  const onSave = async (page: string, sectionId: string, bucket: Bucket) => {
    const k = keyOf(page, sectionId);
    const cur = byKey[k] ?? { status: "pending", notes: "" };
    setByKey((s) => ({ ...s, [k]: { ...cur, saving: true } }));
    try {
      await save({ data: { page, sectionId, bucket, status: cur.status, notes: cur.notes } });
      setByKey((s) => ({ ...s, [k]: { ...cur, saving: false, savedAt: Date.now() } }));
    } catch (e) {
      setByKey((s) => ({ ...s, [k]: { ...cur, saving: false } }));
      alert(e instanceof Error ? e.message : "Save failed");
    }
  };

  return (
    <div className="space-y-6 p-6 text-foreground">
      <header>
        <h1 className="h-display">Content QA · 70/20/10 rebalance</h1>
        <p className="mt-1 text-sm text-foreground">
          Per-page checklist for the desire (70) / proof (20) / sell (10) rebalance and
          scroll-rescue verification before deployment.
        </p>
      </header>

      {loading ? (
        <AiThinkingLoader label="Thinking through reviews…" size="sm" />
      ) : (
        grouped.map(([page, rows]) => (
          <section key={page} className="rounded border border-border">
            <header className="flex items-center justify-between gap-3 border-b border-border px-4 py-2">
              <h2 className="font-mono text-sm">{page}</h2>
              <a
                href={page}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-eyebrow hover:underline"
              >
                Open <ExternalLink className="h-3 w-3" />
              </a>
            </header>
            <table className="w-full text-sm">
              <thead className="bg-muted text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-3 py-2">Section</th>
                  <th className="px-3 py-2">Bucket</th>
                  <th className="px-3 py-2">Action</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Notes</th>
                  <th className="px-3 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => {
                  const k = keyOf(r.page, r.sectionId);
                  const st = byKey[k] ?? { status: "pending" as Status, notes: "" };
                  return (
                    <tr key={k} className="border-t border-border align-top">
                      <td className="px-3 py-2">
                        <div className="font-medium">{r.label}</div>
                        {r.notes && (
                          <div className="mt-1 text-xs text-muted-foreground">{r.notes}</div>
                        )}
                      </td>
                      <td className="px-3 py-2 text-xs">{BUCKET_LABEL[r.bucket]}</td>
                      <td className="px-3 py-2 text-xs capitalize">{r.action}</td>
                      <td className="px-3 py-2">
                        <select
                          value={st.status}
                          onChange={(e) =>
                            setByKey((s) => ({
                              ...s,
                              [k]: { ...st, status: e.target.value as Status, savedAt: undefined },
                            }))
                          }
                          className="rounded border border-border bg-transparent px-2 py-1 text-xs"
                        >
                          {STATUSES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-3 py-2">
                        <textarea
                          rows={2}
                          value={st.notes}
                          onChange={(e) =>
                            setByKey((s) => ({
                              ...s,
                              [k]: { ...st, notes: e.target.value, savedAt: undefined },
                            }))
                          }
                          className="w-full rounded border border-border bg-transparent px-2 py-1 text-xs"
                          placeholder="Reviewer notes…"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <button
                          type="button"
                          onClick={() => onSave(r.page, r.sectionId, r.bucket)}
                          disabled={st.saving}
                          className="inline-flex items-center gap-1 rounded border border-border px-2 py-1 text-xs hover:bg-muted disabled:opacity-50"
                        >
                          {st.saving ? (
                            <Loader2 className="h-3 w-3 motion-safe:animate-spin" />
                          ) : (
                            <Save className="h-3 w-3" />
                          )}
                          Save
                        </button>
                        {st.savedAt && !st.saving && (
                          <div className="mt-1 text-micro text-sky-300">saved</div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        ))
      )}
    </div>
  );
}
