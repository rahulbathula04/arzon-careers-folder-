
DROP POLICY IF EXISTS "events service insert" ON public.promotion_events;
CREATE POLICY "events self insert"
  ON public.promotion_events FOR INSERT TO authenticated
  WITH CHECK (user_id IS NULL OR user_id = auth.uid());
