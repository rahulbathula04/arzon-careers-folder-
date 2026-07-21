-- ============ learning_modules ============
CREATE TABLE public.learning_modules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  pillar text NOT NULL CHECK (pillar IN ('Domain','Process','Tool','Workplace')),
  minutes integer NOT NULL DEFAULT 30,
  lift integer NOT NULL DEFAULT 5,
  gaps text[] NOT NULL DEFAULT '{}',
  sort_order integer NOT NULL,
  deep_link text NOT NULL DEFAULT '/curriculum',
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.learning_modules TO anon, authenticated;
GRANT ALL ON public.learning_modules TO service_role;

ALTER TABLE public.learning_modules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read learning modules"
  ON public.learning_modules
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- ============ student_module_progress ============
CREATE TABLE public.student_module_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_id uuid NOT NULL REFERENCES public.learning_modules(id) ON DELETE CASCADE,
  status text NOT NULL CHECK (status IN ('current','done')),
  completed_at timestamptz,
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, module_id)
);

CREATE INDEX student_module_progress_user_idx ON public.student_module_progress (user_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.student_module_progress TO authenticated;
GRANT ALL ON public.student_module_progress TO service_role;

ALTER TABLE public.student_module_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own progress"
  ON public.student_module_progress
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert own progress"
  ON public.student_module_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own progress"
  ON public.student_module_progress
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users delete own progress"
  ON public.student_module_progress
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- ============ student_weekly_goals ============
CREATE TABLE public.student_weekly_goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  week_start date NOT NULL,
  module_id uuid REFERENCES public.learning_modules(id) ON DELETE SET NULL,
  task text NOT NULL,
  done boolean NOT NULL DEFAULT false,
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, week_start)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.student_weekly_goals TO authenticated;
GRANT ALL ON public.student_weekly_goals TO service_role;

ALTER TABLE public.student_weekly_goals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own weekly goal"
  ON public.student_weekly_goals
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert own weekly goal"
  ON public.student_weekly_goals
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own weekly goal"
  ON public.student_weekly_goals
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============ recruiter_profile_views ============
CREATE TABLE public.recruiter_profile_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  viewer_org text,
  viewed_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX recruiter_profile_views_user_idx ON public.recruiter_profile_views (user_id, viewed_at DESC);

GRANT SELECT ON public.recruiter_profile_views TO authenticated;
GRANT ALL ON public.recruiter_profile_views TO service_role;

ALTER TABLE public.recruiter_profile_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own recruiter views"
  ON public.recruiter_profile_views
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- ============ Seed modules ============
INSERT INTO public.learning_modules (slug, title, pillar, minutes, lift, gaps, sort_order, deep_link) VALUES
  ('ich-gcp-r3',            'ICH-GCP E6(R3) essentials',            'Domain',    40, 6, ARRAY['Regulatory literacy','Protocol interpretation'], 1, '/curriculum#ich-gcp-r3'),
  ('edit-checks',            'Edit checks & query resolution',       'Process',   45, 9, ARRAY['Data validation logic','Query cycle time'],       2, '/curriculum#edit-checks'),
  ('medidata-rave-crf',      'Medidata Rave — build a CRF',          'Tool',      60, 7, ARRAY['EDC hands-on hours','CRF design'],                3, '/curriculum#medidata-rave-crf'),
  ('sdtm-domain-mapping',    'SDTM domain mapping walkthrough',      'Process',   50, 5, ARRAY['CDISC standards','Mapping accuracy'],             4, '/curriculum#sdtm-domain-mapping'),
  ('client-standup-comms',   'Client stand-up — communication drills','Workplace',30, 4, ARRAY['Status reporting','Escalation tone'],             5, '/curriculum#client-standup-comms');