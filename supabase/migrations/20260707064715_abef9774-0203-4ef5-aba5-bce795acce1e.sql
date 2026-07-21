DROP POLICY IF EXISTS "Anyone can report an RLS incident" ON public.rls_incidents;
DROP POLICY IF EXISTS "Service role manages RLS incidents" ON public.rls_incidents;

-- rls-check: allow-true reason: incident reporter must accept writes from anon+authenticated visitors so we can capture the exact "permission denied" event that broke their page; rows are staff-read-only and rate-limited client-side.
CREATE POLICY "Anyone can report an RLS incident"
  ON public.rls_incidents
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- rls-check: allow-true reason: service_role bypasses RLS by design; explicit ALL policy documents intent for maintenance/backfill jobs on this staff-only incidents table.
CREATE POLICY "Service role manages RLS incidents"
  ON public.rls_incidents
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);