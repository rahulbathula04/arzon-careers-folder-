DROP POLICY IF EXISTS "Service role manages snapshots" ON public.ce_percentile_snapshots;

-- rls-check: allow-true reason: policy is scoped TO service_role, which already has admin bypass; keeping USING/WITH CHECK (true) documents that intent explicitly.
CREATE POLICY "Service role manages snapshots"
  ON public.ce_percentile_snapshots
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);