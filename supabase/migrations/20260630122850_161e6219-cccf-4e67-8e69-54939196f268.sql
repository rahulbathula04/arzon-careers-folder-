DROP POLICY IF EXISTS "Anyone can insert journey" ON public.readiness_journey;

-- rls-check: allow-true reason: anonymous funnel telemetry insert; row is keyed by a client-minted session_id, contains no PII, and updates are blocked via "Block direct updates" — milestone transitions go through SECURITY DEFINER RPC mark_readiness_journey.
CREATE POLICY "Anyone can insert journey"
  ON public.readiness_journey FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);