import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, ArrowLeft, Save, RefreshCw, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useAdminGate } from "@/hooks/useAdminGate";
import {
  listGscSites,
  getGscSettings,
  saveGscSettings,
  type GscSite,
  type GscSettings,
} from "@/lib/seo-gsc.functions";

export const Route = createFileRoute("/admin/seo/settings")({
  head: () => ({
    meta: [{ title: "GSC settings · Admin" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: AdminSeoSettings,
});

function AdminSeoSettings() {
  const navigate = useNavigate();
  const { status: gate } = useAdminGate(["admin"]);
  const listFn = useServerFn(listGscSites);
  const getFn = useServerFn(getGscSettings);
  const saveFn = useServerFn(saveGscSettings);

  const [sites, setSites] = useState<GscSite[]>([]);
  const [current, setCurrent] = useState<GscSettings | null>(null);
  const [selected, setSelected] = useState<string>("");
  const [manual, setManual] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  async function refresh() {
    setLoading(true);
    setError(null);
    try {
      const [{ sites: s }, cur] = await Promise.all([listFn({}), getFn({})]);
      setSites(s);
      setCurrent(cur);
      setSelected(cur.site_url);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (gate !== "ready") return;
    void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gate]);

  if (gate === "loading") {
    return (
      <div className="flex items-center gap-2 text-foreground">
        <Loader2 className="h-4 w-4 motion-safe:animate-spin" /> Loading…
      </div>
    );
  }
  if (gate === "unauth") {
    navigate({ to: "/admin/login" });
    return null;
  }
  if (gate === "forbidden") {
    return (
      <div className="rounded-2xl border border-border bg-muted p-6 text-foreground">
        Admin role required.
      </div>
    );
  }

  async function save(url: string) {
    if (!url) return;
    setSaving(true);
    setError(null);
    setSaved(null);
    try {
      const next = await saveFn({ data: { site_url: url } });
      setCurrent(next);
      setSelected(next.site_url);
      setSaved(`Saved · ${next.site_url}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-8">
      <header>
        <Link
          to="/admin/seo"
          className="inline-flex items-center gap-1 font-mono text-micro font-semibold uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3 w-3" /> SEO
        </Link>
        <h1 className="h-display mt-2">Search Console settings</h1>
        <p className="mt-1 text-sm text-foreground/80">
          Pick which Google Search Console property the app should use for analytics, sitemap
          submission, and URL inspection.
        </p>
      </header>

      {error && (
        <div className="inline-flex items-start gap-2 rounded-xl border border-border bg-muted p-3 text-sm text-foreground">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span className="break-words">{error}</span>
        </div>
      )}
      {saved && (
        <div className="inline-flex items-center gap-2 rounded-xl border border-border bg-muted p-3 text-sm text-foreground">
          <CheckCircle2 className="h-4 w-4 shrink-0" /> {saved}
        </div>
      )}

      <section className="rounded-2xl border border-border bg-muted/30 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Currently selected
            </h2>
            <p className="mt-2 font-display text-h3 text-foreground break-all">
              {current?.site_url ?? "—"}
            </p>
            {current?.updated_at && (
              <p className="mt-1 text-xs text-muted-foreground">
                Last changed {new Date(current.updated_at).toLocaleString()}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => void refresh()}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1.5 text-xs text-foreground hover:bg-accent"
          >
            {loading ? (
              <Loader2 className="h-3 w-3 motion-safe:animate-spin" />
            ) : (
              <RefreshCw className="h-3 w-3" />
            )}{" "}
            Refresh
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-muted/30 p-5">
        <h2 className="mb-3 font-mono text-micro font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          Your properties
        </h2>
        {loading ? (
          <div className="flex items-center gap-2 text-foreground">
            <Loader2 className="h-4 w-4 motion-safe:animate-spin" /> Loading properties from Google…
          </div>
        ) : sites.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No verified properties returned by Google. Verify the site in Search Console first, then
            refresh.
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {sites.map((s) => {
              const isCurrent = s.siteUrl === current?.site_url;
              const isSelected = s.siteUrl === selected;
              return (
                <li
                  key={s.siteUrl}
                  className="flex flex-wrap items-center justify-between gap-3 py-3"
                >
                  <label className="flex min-w-0 flex-1 cursor-pointer items-start gap-3">
                    <input
                      type="radio"
                      name="gsc-site"
                      value={s.siteUrl}
                      checked={isSelected}
                      onChange={() => setSelected(s.siteUrl)}
                      className="mt-1 h-4 w-4"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">{s.siteUrl}</p>
                      <p className="mt-0.5 text-micro text-muted-foreground">
                        Permission: {s.permissionLevel}
                      </p>
                    </div>
                  </label>
                  {isCurrent && (
                    <span className="rounded-full border border-border bg-muted px-2.5 py-0.5 font-mono text-micro uppercase tracking-[0.18em] text-foreground">
                      In use
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        )}

        <div className="mt-5 flex flex-wrap justify-end gap-2">
          <button
            type="button"
            onClick={() => void save(selected)}
            disabled={saving || !selected || selected === current?.site_url}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
          >
            {saving ? (
              <Loader2 className="h-3.5 w-3.5 motion-safe:animate-spin" />
            ) : (
              <Save className="h-3.5 w-3.5" />
            )}
            Save selection
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-muted/30 p-5">
        <h2 className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          Enter manually
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Use the exact property URL from Search Console — URL-prefix properties end with a trailing
          slash (e.g. <code>https://example.com/</code>); domain properties look like{" "}
          <code>sc-domain:example.com</code>.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <input
            value={manual}
            onChange={(e) => setManual(e.target.value)}
            placeholder="https://example.com/"
            className="min-w-[280px] flex-1 rounded-full border border-border bg-black/40 px-3 py-2 text-sm text-foreground"
          />
          <button
            type="button"
            onClick={() => void save(manual.trim())}
            disabled={saving || !manual.trim()}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-2 text-xs font-semibold text-foreground hover:bg-accent disabled:opacity-60"
          >
            {saving ? (
              <Loader2 className="h-3.5 w-3.5 motion-safe:animate-spin" />
            ) : (
              <Save className="h-3.5 w-3.5" />
            )}
            Save
          </button>
        </div>
      </section>
    </div>
  );
}
