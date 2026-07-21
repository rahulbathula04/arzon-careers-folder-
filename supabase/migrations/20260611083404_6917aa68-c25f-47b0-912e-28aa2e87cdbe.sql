CREATE TABLE public.landing_copy_changes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  changed_at timestamptz NOT NULL DEFAULT now(),
  actor_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  actor_email text,
  file_path text NOT NULL,
  section text,
  before_text text NOT NULL DEFAULT '',
  after_text text NOT NULL DEFAULT '',
  reason text,
  source text NOT NULL DEFAULT 'agent' CHECK (source IN ('agent','admin','migration','scanner'))
);

CREATE INDEX idx_landing_copy_changes_changed_at ON public.landing_copy_changes (changed_at DESC);
CREATE INDEX idx_landing_copy_changes_file ON public.landing_copy_changes (file_path);

GRANT SELECT ON public.landing_copy_changes TO authenticated;
GRANT ALL ON public.landing_copy_changes TO service_role;

ALTER TABLE public.landing_copy_changes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can view landing copy changes"
  ON public.landing_copy_changes
  FOR SELECT
  TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['admin'::app_role,'reviewer'::app_role]));
