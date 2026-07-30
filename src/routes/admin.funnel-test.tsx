import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Trash2, Zap } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAdminGate } from "@/hooks/useAdminGate";
import { track } from "@/lib/track";
import { clearTestEvents } from "@/lib/analytics-test.functions";

export const Route = createFileRoute("/admin/funnel-test")({
  head: () => ({
    meta: [{ title: "Funnel QA · Admin" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: FunnelTestPage,
});

type Gate = "loading" | "unauth" | "forbidden" | "ready";

const QUIZ_EVENTS = [
  { name: "quiz_started", label: "Quiz started" },
  { name: "quiz_completed", label: "Quiz completed" },
  { name: "lead_submitted", label: "Lead submitted" },
] as const;

const APPLY_EVENTS = [
  { name: "apply_started", label: "Apply started" },
  { name: "apply_programme_selected", label: "Programme selected" },
  { name: "apply_submitted", label: "Application submitted" },
  { name: "apply_success_viewed", label: "Success viewed" },
] as const;

const ADMIN_EVENTS = [
  { name: "admin_application_viewed", label: "Reviewer opened" },
  { name: "admin_application_status_changed", label: "Status changed" },
] as const;

const PROGRAMS = ["clinical-data-management", "medical-coding", "pharmacovigilance"] as const;

const UTMS = ["qa", "instagram", "whatsapp", "(none)"] as const;

type FiredEntry = { id: string; t: number; name: string; program: string; utm: string };

function uuid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function FunnelTestPage() {
  const navigate = useNavigate();
  const clearFn = useServerFn(clearTestEvents);
  const { status: gate, userId } = useAdminGate(["admin", "reviewer", "support"]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [program, setProgram] = useState<string>(PROGRAMS[0]);
  const [utm, setUtm] = useState<string>("qa");
  const [fired, setFired] = useState<FiredEntry[]>([]);
  const [bursting, setBursting] = useState(false);
  const [clearing, setClearing] = useState(false);
  const counter = useRef(0);

  useEffect(() => {
    if (gate !== "ready" || !userId) return;
    let cancelled = false;
    supabase.rpc("has_role", { _user_id: userId, _role: "admin" }).then(({ data }) => {
      if (!cancelled) setIsAdmin(data === true);
    });
    return () => {
      cancelled = true;
    };
  }, [gate, userId]);

  function fire(eventName: string, opts: { anon_id?: string } = {}) {
    const programSlug = program;
    const utmSource = utm === "(none)" ? null : utm;
    track(eventName, {
      program_slug: programSlug,
      props: {
        test: true,
        qa_run_id: counter.current,
        ...(opts.anon_id ? { override_anon: opts.anon_id } : {}),
      },
    });
    counter.current += 1;
    const entry: FiredEntry = {
      id: uuid(),
      t: Date.now(),
      name: eventName,
      program: programSlug,
      utm: utmSource ?? "-",
    };
    setFired((prev) => [entry, ...prev].slice(0, 20));
  }

  async function burst() {
    setBursting(true);
    try {
      // 10 mock users, each running through a realistic sub-funnel
      for (let i = 0; i < 10; i++) {
        // We can't override anon_id from the client (track() reads localStorage),
        // but timestamp variance + props.qa_run_id + props.mock_user gives enough fidelity
        // for visual funnel testing. For unique-anon counts, use the page from 10 different
        // browser sessions or clear localStorage between runs.
        const drop = Math.random();
        track("quiz_started", { program_slug: program, props: { test: true, mock_user: i } });
        if (drop > 0.15)
          track("quiz_completed", { program_slug: program, props: { test: true, mock_user: i } });
        if (drop > 0.35)
          track("lead_submitted", { program_slug: program, props: { test: true, mock_user: i } });
        if (drop > 0.45)
          track("apply_started", { program_slug: program, props: { test: true, mock_user: i } });
        if (drop > 0.55)
          track("apply_programme_selected", {
            program_slug: program,
            props: { test: true, mock_user: i },
          });
        if (drop > 0.7)
          track("apply_submitted", { program_slug: program, props: { test: true, mock_user: i } });
        if (drop > 0.78)
          track("apply_success_viewed", {
            program_slug: program,
            props: { test: true, mock_user: i },
          });
        if (drop > 0.6)
          track("admin_application_viewed", {
            program_slug: program,
            props: { test: true, mock_user: i },
          });
        if (drop > 0.85)
          track("admin_application_status_changed", {
            program_slug: program,
            props: { test: true, mock_user: i },
          });
        await new Promise((r) => setTimeout(r, 80));
      }
      toast.success("Burst sent: 10 mock users");
    } finally {
      setBursting(false);
    }
  }

  async function onClear() {
    if (!confirm("Delete ALL analytics_events where props.test = true?")) return;
    setClearing(true);
    try {
      const r = await clearFn();
      toast.success(`Deleted ${r.deleted} test events`);
      setFired([]);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to clear");
    } finally {
      setClearing(false);
    }
  }

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
      <div className="rounded-2xl border border-amber-400/30 bg-amber-400/5 p-6 text-amber-100">
        No staff role assigned.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow">
            Admin · QA
          </p>
          <h1 className="h-display mt-2">Funnel test bench</h1>
          <p className="mt-1 text-sm text-foreground">
            Fire events on demand to validate instrumentation. Every event carries{" "}
            <code className="rounded bg-accent px-1 py-0.5 text-xs">props.test = true</code>.
          </p>
        </div>
        <Link
          to="/admin/funnel"
          className="rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground hover:bg-accent"
        >
          Open funnel report →
        </Link>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="rounded-2xl border border-border bg-muted/60 p-4">
          <span className="block text-micro font-semibold uppercase tracking-widest text-foreground">
            Programme
          </span>
          <select
            value={program}
            onChange={(e) => setProgram(e.target.value)}
            className="mt-2 w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground"
          >
            {PROGRAMS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
        <label className="rounded-2xl border border-border bg-muted/60 p-4">
          <span className="block text-micro font-semibold uppercase tracking-widest text-foreground">
            UTM source
          </span>
          <select
            value={utm}
            onChange={(e) => setUtm(e.target.value)}
            className="mt-2 w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground"
          >
            {UTMS.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </label>
        <button
          onClick={burst}
          disabled={bursting}
          className="rounded-2xl border border-primary/40 bg-primary/15 p-4 text-left text-sm text-foreground transition hover:bg-primary/25 disabled:opacity-60"
        >
          <span className="flex items-center gap-2 text-micro font-semibold uppercase tracking-widest text-primary-glow">
            <Zap className="h-3 w-3" /> Burst
          </span>
          <span className="mt-2 block font-display text-base">10 mock users · full funnel</span>
        </button>
        <button
          onClick={onClear}
          disabled={!isAdmin || clearing}
          title={isAdmin ? "" : "Admin role required"}
          className="rounded-2xl border border-amber-400/30 bg-amber-400/5 p-4 text-left text-sm text-amber-100 transition hover:bg-amber-400/10 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className="flex items-center gap-2 text-micro font-semibold uppercase tracking-widest text-amber-300">
            <Trash2 className="h-3 w-3" /> Cleanup
          </span>
          <span className="mt-2 block font-display text-base">Delete all test events</span>
        </button>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <EventGroup
          title="Quiz funnel"
          events={QUIZ_EVENTS as unknown as ReadonlyArray<{ name: string; label: string }>}
          onFire={fire}
        />
        <EventGroup
          title="Apply funnel"
          events={APPLY_EVENTS as unknown as ReadonlyArray<{ name: string; label: string }>}
          onFire={fire}
        />
        <EventGroup
          title="Admin funnel"
          events={ADMIN_EVENTS as unknown as ReadonlyArray<{ name: string; label: string }>}
          onFire={fire}
        />
      </section>

      <section className="rounded-2xl border border-border bg-muted/60 p-5">
        <div className="flex items-baseline justify-between">
          <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground">
            Fired this session
          </p>
          <p className="font-display text-h4 text-primary-glow">{counter.current}</p>
        </div>
        <ul className="mt-4 divide-y divide-border text-xs">
          {fired.length === 0 && <li className="py-3 text-foreground">Nothing fired yet.</li>}
          {fired.map((f) => (
            <li key={f.id} className="flex items-center justify-between gap-3 py-2">
              <span className="text-foreground">{new Date(f.t).toLocaleTimeString()}</span>
              <span className="font-mono text-foreground">{f.name}</span>
              <span className="text-foreground">{f.program}</span>
              <span className="text-muted-foreground">{f.utm}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function EventGroup({
  title,
  events,
  onFire,
}: {
  title: string;
  events: ReadonlyArray<{ name: string; label: string }>;
  onFire: (name: string) => void;
}) {
  return (
    <div className="rounded-2xl border border-border bg-muted/60 p-5">
      <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground">
        {title}
      </p>
      <div className="mt-4 space-y-2">
        {events.map((e) => (
          <button
            key={e.name}
            onClick={() => onFire(e.name)}
            className="flex w-full items-center justify-between rounded-lg border border-border bg-muted px-3 py-2 text-left text-sm text-foreground transition hover:bg-accent"
          >
            <span>{e.label}</span>
            <span className="font-mono text-micro text-muted-foreground">{e.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
