import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Lock, ArrowRight, FileText, AlertTriangle, Clock } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Footer } from "@/components/landing/Footer";
import { supabase } from "@/integrations/supabase/client";
import { logVerificationEvent } from "@/lib/verificationAudit";
import { pageSeo } from "@/lib/seo";
import { WORK_SAMPLES } from "@/components/recruiters/WorkSampleCard";

interface ArtifactRequest {
  id: string;
  candidate_ref: string;
  recruiter_email: string;
  recruiter_org: string;
  jd_task: string;
  status: string;
  expires_at: string;
  created_at: string;
}

export const Route = createFileRoute("/r/artifact/$token")({
  head: ({ params }) => {
    const ps = pageSeo({
      path: `/r/artifact/${params.token}`,
      title: "Artifact verification link · Arzon Global",
      description:
        "Time-bound recruiter verification link for an Arzon candidate's de-identified artifact.",
      noindex: true,
    });
    return {
      meta: [{ title: "Artifact verification link · Arzon Global" }, ...ps.meta],
      links: ps.links,
    };
  },
  component: ArtifactViewRoute,
});

type State =
  | { kind: "loading" }
  | { kind: "missing" }
  | { kind: "expired"; req: ArtifactRequest }
  | { kind: "valid"; req: ArtifactRequest };

function ArtifactViewRoute() {
  const { token } = Route.useParams();
  const [state, setState] = useState<State>({ kind: "loading" });

  useEffect(() => {
    let active = true;
    (async () => {
      // Use the security-definer RPC so the table is no longer readable in
      // bulk by anon - the RPC returns at most one row matching the bearer
      // token in the URL.
      const { data, error } = await supabase
        .rpc("get_artifact_request_by_token", { p_token: token })
        .maybeSingle();
      if (!active) return;
      if (error || !data) {
        setState({ kind: "missing" });
        return;
      }
      const req = data as unknown as ArtifactRequest;
      const expired = new Date(req.expires_at).getTime() < Date.now();
      if (expired) {
        setState({ kind: "expired", req });
      } else {
        setState({ kind: "valid", req });
        void logVerificationEvent(req.candidate_ref, "artifact_unlocked", req.recruiter_org);
      }
    })();
    return () => {
      active = false;
    };
  }, [token]);

  return (
    <main className="min-h-app bg-[#F7F9FC] pb-24 text-ink">
      <Section size="md" className="pt-14 sm:pt-20">
        <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-[color:var(--teal-deep)]">
          Recruiter verification link · time-bound
        </p>
        <h1 className="mt-2 font-grotesk text-h1 font-bold text-ink">Artifact verification</h1>

        {state.kind === "loading" && (
          <div className="mt-6 flex items-center gap-2 text-body-sm text-muted-foreground">
            <Clock className="h-4 w-4" /> Checking link…
          </div>
        )}

        {state.kind === "missing" && (
          <div className="mt-6 rounded-2xl border border-amber-300/50 bg-gold-soft p-5">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <p className="mt-2 font-semibold text-amber-900">Link not found</p>
            <p className="mt-1 text-caption text-amber-900/80">
              This verification link is invalid or has been revoked. Request a fresh one from the
              candidate's portfolio.
            </p>
          </div>
        )}

        {state.kind === "expired" && <ExpiredView req={state.req} />}

        {state.kind === "valid" && <ValidView req={state.req} />}
      </Section>
      <Footer />
    </main>
  );
}

function ExpiredView({ req }: { req: ArtifactRequest }) {
  return (
    <div className="mt-6 rounded-2xl border border-border/60 bg-muted p-5">
      <Lock className="h-5 w-5 text-muted-foreground" />
      <p className="mt-2 font-semibold text-ink">Link expired</p>
      <p className="mt-1 text-caption text-ink">
        This verification link was issued for <span className="font-mono">{req.candidate_ref}</span>{" "}
        on {new Date(req.created_at).toLocaleString()} and has now expired. Request a fresh link
        from the candidate portfolio.
      </p>
      <Link
        to="/recruiters/candidate/$id"
        params={{ id: req.candidate_ref }}
        className="mt-3 inline-flex items-center gap-1.5 text-caption font-semibold text-[color:var(--teal-deep)] underline-offset-4 hover:underline"
      >
        Open candidate portfolio <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

function ValidView({ req }: { req: ArtifactRequest }) {
  const trackPrefix = req.candidate_ref.match(/^AG-([A-Z]+)-/)?.[1] ?? "";
  const trackSlugMap: Record<string, string> = {
    PV: "pharmacovigilance",
    MC: "medical-coding",
    CDM: "clinical-data-management",
    SAS: "sas-clinical",
    RA: "regulatory-affairs",
    MW: "medical-writing",
  };
  const sample = WORK_SAMPLES.find((s) => s.trackSlug === trackSlugMap[trackPrefix]);

  return (
    <div className="mt-6 space-y-5">
      <div className="rounded-2xl border border-sky-300/40 bg-accent-emerald-soft p-5">
        <ShieldCheck className="h-5 w-5 text-accent-emerald-deep" />
        <p className="mt-2 font-semibold text-sky-900">
          Verified link · expires {new Date(req.expires_at).toLocaleString()}
        </p>
        <dl className="mt-3 grid gap-2 text-caption sm:grid-cols-2">
          <Row k="Candidate" v={req.candidate_ref} />
          <Row k="Recruiter" v={`${req.recruiter_org}`} />
          <Row k="Requested task" v={req.jd_task} />
          <Row k="Status" v={req.status} />
        </dl>
      </div>

      <div className="rounded-2xl border border-ink/10 bg-white p-5">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-[color:var(--teal-deep)]" />
          <p className="font-mono text-micro font-semibold uppercase tracking-[0.2em] text-[color:var(--teal-deep)]">
            De-identified artifact preview
          </p>
        </div>
        <h2 className="mt-2 font-grotesk text-body font-bold text-ink">
          {sample ? sample.artifact : "Track artifact"}
        </h2>
        {sample ? (
          <>
            <p className="mt-1 font-mono text-micro text-muted-foreground">{sample.excerpt}</p>
            <ul className="mt-3 space-y-1.5 text-caption leading-relaxed text-ink">
              {sample.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[color:var(--teal-deep)]" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="mt-1 text-caption text-ink">
            The candidate's full graded deliverable is being prepared. We email a redacted PDF +
            auditor scoring sheet to <span className="font-mono">{req.recruiter_email}</span> within
            1 working day.
          </p>
        )}
        <p className="mt-4 text-meta text-muted-foreground">
          This access is logged to the public audit trail for{" "}
          <span className="font-mono">{req.candidate_ref}</span>. The candidate sees that you opened
          it; no PII is exposed.
        </p>
      </div>

      <Link
        to="/recruiters/candidate/$id"
        params={{ id: req.candidate_ref }}
        className="inline-flex items-center gap-1.5 text-caption font-semibold text-[color:var(--teal-deep)] underline-offset-4 hover:underline"
      >
        Back to candidate portfolio <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="font-mono text-micro uppercase tracking-wider text-sky-900/60">{k}</dt>
      <dd className="mt-0.5 font-mono text-sky-950">{v}</dd>
    </div>
  );
}
