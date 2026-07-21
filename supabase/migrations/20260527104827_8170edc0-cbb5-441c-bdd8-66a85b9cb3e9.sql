-- Phase 3 foundation: backup_runs table tracks the nightly external-backup job.
CREATE TABLE public.backup_runs (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  started_at    timestamptz NOT NULL DEFAULT now(),
  finished_at   timestamptz,
  status        text NOT NULL DEFAULT 'running'
                  CHECK (status IN ('running','success','failed','skipped')),
  table_count   integer NOT NULL DEFAULT 0,
  row_count     bigint  NOT NULL DEFAULT 0,
  bytes         bigint  NOT NULL DEFAULT 0,
  destination   text,
  error         text,
  details       jsonb   NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX idx_backup_runs_started_at ON public.backup_runs (started_at DESC);

GRANT SELECT ON public.backup_runs TO authenticated;
GRANT ALL    ON public.backup_runs TO service_role;

ALTER TABLE public.backup_runs ENABLE ROW LEVEL SECURITY;

-- Admins/reviewers/support can read backup history. Writes are service_role only.
CREATE POLICY "Admins can view backup runs"
ON public.backup_runs
FOR SELECT
TO authenticated
USING (
  public.has_any_role(auth.uid(), ARRAY['admin','reviewer','support']::app_role[])
);