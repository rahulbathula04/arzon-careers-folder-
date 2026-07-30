
-- 1. recommendation_outcomes
CREATE TABLE public.recommendation_outcomes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID NOT NULL UNIQUE,
  user_email TEXT,
  user_id UUID,
  recommended_family_id TEXT,
  recommended_role_slug TEXT,
  recommended_at TIMESTAMPTZ DEFAULT now(),
  stage TEXT NOT NULL DEFAULT 'recommended',
  chosen_role_slug TEXT,
  chosen_at TIMESTAMPTZ,
  employer TEXT,
  joined_at TIMESTAMPTZ,
  base_ctc NUMERIC,
  still_in_role BOOLEAN,
  status_last_checked_at TIMESTAMPTZ,
  source TEXT NOT NULL DEFAULT 'self_report',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE ON public.recommendation_outcomes TO authenticated;
GRANT ALL ON public.recommendation_outcomes TO service_role;

ALTER TABLE public.recommendation_outcomes ENABLE ROW LEVEL SECURITY;

-- Users can read/update their own outcome (matched by user_id when present)
CREATE POLICY "Users can view own outcome" ON public.recommendation_outcomes
  FOR SELECT TO authenticated
  USING (user_id IS NOT NULL AND user_id = auth.uid());

CREATE POLICY "Users can update own outcome" ON public.recommendation_outcomes
  FOR UPDATE TO authenticated
  USING (user_id IS NOT NULL AND user_id = auth.uid())
  WITH CHECK (user_id IS NOT NULL AND user_id = auth.uid());

-- Admins can view all outcomes
CREATE POLICY "Admins can view all outcomes" ON public.recommendation_outcomes
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 2. retention_checkins
CREATE TABLE public.retention_checkins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  outcome_id UUID NOT NULL REFERENCES public.recommendation_outcomes(id) ON DELETE CASCADE,
  checkin_type TEXT NOT NULL,
  sent_at TIMESTAMPTZ DEFAULT now(),
  responded_at TIMESTAMPTZ,
  response_json JSONB,
  channel TEXT NOT NULL DEFAULT 'email',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE ON public.retention_checkins TO authenticated;
GRANT ALL ON public.retention_checkins TO service_role;

ALTER TABLE public.retention_checkins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own checkins" ON public.retention_checkins
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.recommendation_outcomes o
      WHERE o.id = retention_checkins.outcome_id
        AND o.user_id IS NOT NULL
        AND o.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all checkins" ON public.retention_checkins
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 3. updated_at triggers
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_recommendation_outcomes_updated_at
  BEFORE UPDATE ON public.recommendation_outcomes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_retention_checkins_updated_at
  BEFORE UPDATE ON public.retention_checkins
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 4. Helpful indexes for retention queries
CREATE INDEX idx_outcomes_family ON public.recommendation_outcomes(recommended_family_id);
CREATE INDEX idx_outcomes_role ON public.recommendation_outcomes(chosen_role_slug);
CREATE INDEX idx_outcomes_stage ON public.recommendation_outcomes(stage);
CREATE INDEX idx_checkins_outcome ON public.retention_checkins(outcome_id);
CREATE INDEX idx_checkins_type ON public.retention_checkins(checkin_type);

-- 5. Public aggregate retention stats - safe to expose to anon.
-- Returns counts only; no PII. Caller passes family_id or role_slug.
CREATE OR REPLACE FUNCTION public.get_retention_stat(p_family TEXT, p_role TEXT DEFAULT NULL)
RETURNS TABLE (
  family_id TEXT,
  role_slug TEXT,
  total_recommended BIGINT,
  total_chose BIGINT,
  total_in_role BIGINT,
  total_still_in_role_12mo BIGINT
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    p_family,
    p_role,
    COUNT(*) FILTER (WHERE recommended_family_id = p_family) AS total_recommended,
    COUNT(*) FILTER (WHERE recommended_family_id = p_family AND chosen_role_slug IS NOT NULL
                     AND (p_role IS NULL OR chosen_role_slug = p_role)) AS total_chose,
    COUNT(*) FILTER (WHERE recommended_family_id = p_family AND stage IN ('in_role','left_role')
                     AND (p_role IS NULL OR chosen_role_slug = p_role)) AS total_in_role,
    COUNT(*) FILTER (WHERE recommended_family_id = p_family AND still_in_role = TRUE
                     AND (p_role IS NULL OR chosen_role_slug = p_role)) AS total_still_in_role_12mo
  FROM public.recommendation_outcomes;
$$;

GRANT EXECUTE ON FUNCTION public.get_retention_stat(TEXT, TEXT) TO anon, authenticated, service_role;
