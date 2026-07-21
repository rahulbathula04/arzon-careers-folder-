DROP POLICY IF EXISTS "Anyone can insert journey" ON public.readiness_journey;

-- rls-check: allow-true reason: anonymous funnel telemetry; no PII, updates blocked.
CREATE POLICY "Anyone can insert journey"
  ON public.readiness_journey FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);