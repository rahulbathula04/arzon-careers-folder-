
CREATE TABLE public.experiment_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  uid text NOT NULL,
  experiment text NOT NULL,
  variant text NOT NULL,
  event text NOT NULL,
  course_slug text,
  props jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX experiment_events_exp_variant_idx ON public.experiment_events (experiment, variant, created_at DESC);
CREATE INDEX experiment_events_uid_idx ON public.experiment_events (uid);
CREATE INDEX experiment_events_slug_idx ON public.experiment_events (course_slug);

GRANT INSERT ON public.experiment_events TO anon, authenticated;
GRANT SELECT ON public.experiment_events TO authenticated;
GRANT ALL ON public.experiment_events TO service_role;

ALTER TABLE public.experiment_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone can log experiment events"
  ON public.experiment_events FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(uid) BETWEEN 8 AND 64
    AND length(experiment) BETWEEN 1 AND 64
    AND length(variant) BETWEEN 1 AND 32
    AND length(event) BETWEEN 1 AND 64
    AND (course_slug IS NULL OR length(course_slug) BETWEEN 1 AND 80)
  );

CREATE POLICY "admins read experiment events"
  ON public.experiment_events FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));
