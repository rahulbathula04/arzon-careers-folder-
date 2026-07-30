import { createFileRoute, useParams, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Magic-link landing page for retention check-ins.
 * GET /checkin/:token            → "Still in role?" prompt
 * GET /checkin/:token?left=1     → pre-records "left role"
 * The page calls record_retention_response() via the anon Supabase client;
 * the SECURITY DEFINER function validates the token server-side.
 */

type SearchParams = { left?: string };

export const Route = createFileRoute("/checkin/$token")({
  validateSearch: (s: Record<string, unknown>): SearchParams => ({
    left: typeof s.left === "string" ? s.left : undefined,
  }),
  component: CheckinPage,
});

function CheckinPage() {
  const { token } = useParams({ from: "/checkin/$token" });
  const search = useSearch({ from: "/checkin/$token" }) as SearchParams;
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [chosen, setChosen] = useState<boolean | null>(null);

  async function respond(stillInRole: boolean) {
    setState("sending");
    setChosen(stillInRole);
    const { error } = await supabase.rpc("record_retention_response", {
      p_token: token,
      p_still_in_role: stillInRole,
      p_response: { source: "magic_link", left_qs: search.left ?? null },
    });
    setState(error ? "error" : "done");
  }

  useEffect(() => {
    if (search.left === "1" && state === "idle") respond(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="mx-auto max-w-md px-6 py-20 text-center">
      <h1 className="text-h3 font-semibold mb-3">Arzon Careers · 1-question check-in</h1>
      {state === "done" && chosen !== null && (
        <p className="text-muted-foreground">
          Thanks - we recorded that you are {chosen ? "still" : "no longer"} in the role. This helps
          the next cohort.
        </p>
      )}
      {state === "error" && (
        <p className="text-destructive">
          That link is no longer valid. Please contact hello@arzoncareers.in if you'd like to update
          us.
        </p>
      )}
      {(state === "idle" || state === "sending") && (
        <>
          <p className="mb-6 text-muted-foreground">Are you still in the role you chose?</p>
          <div className="flex justify-center gap-3">
            <button
              className="px-5 py-2.5 rounded-md bg-primary text-primary-foreground disabled:opacity-50"
              disabled={state === "sending"}
              onClick={() => respond(true)}
            >
              Yes, still in role
            </button>
            <button
              className="px-5 py-2.5 rounded-md border disabled:opacity-50"
              disabled={state === "sending"}
              onClick={() => respond(false)}
            >
              No, I left
            </button>
          </div>
        </>
      )}
    </main>
  );
}
