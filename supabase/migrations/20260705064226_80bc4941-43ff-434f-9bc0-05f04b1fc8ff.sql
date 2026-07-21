
CREATE TABLE public.report_progress (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  quiz_profile JSONB,
  employer_tracker JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.report_progress TO authenticated;
GRANT ALL ON public.report_progress TO service_role;

ALTER TABLE public.report_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own report progress"
  ON public.report_progress FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert own report progress"
  ON public.report_progress FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own report progress"
  ON public.report_progress FOR UPDATE TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users delete own report progress"
  ON public.report_progress FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

CREATE TRIGGER update_report_progress_updated_at
  BEFORE UPDATE ON public.report_progress
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
