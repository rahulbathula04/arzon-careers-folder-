DROP POLICY IF EXISTS "Anyone can insert journey" ON public.readiness_journey;
CREATE POLICY "Anon can start a journey"
  ON public.readiness_journey
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    started_at IS NOT NULL
    AND submitted_at IS NULL
    AND paid_at IS NULL
    AND lead_id IS NULL
    AND amount_inr IS NULL
  );