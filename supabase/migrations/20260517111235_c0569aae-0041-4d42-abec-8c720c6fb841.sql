DROP POLICY IF EXISTS "Anyone can join the prime60 waitlist" ON public.arzonprime60_waitlist;

-- rls-check: allow-true reason: public waitlist signup; server fn validates + dedupes; SELECT staff-only
CREATE POLICY "Anyone can join the prime60 waitlist"
  ON public.arzonprime60_waitlist
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
