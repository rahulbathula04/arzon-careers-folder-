ALTER TABLE public.career_engine_leads
  ADD COLUMN IF NOT EXISTS contacted_at timestamptz,
  ADD COLUMN IF NOT EXISTS contacted_by uuid;

CREATE POLICY "Staff can update lead contact state"
  ON public.career_engine_leads
  FOR UPDATE
  TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['admin'::app_role, 'reviewer'::app_role, 'support'::app_role]))
  WITH CHECK (public.has_any_role(auth.uid(), ARRAY['admin'::app_role, 'reviewer'::app_role, 'support'::app_role]));