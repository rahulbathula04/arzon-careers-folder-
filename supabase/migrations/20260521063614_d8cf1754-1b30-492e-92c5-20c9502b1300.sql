-- Re-create the public INSERT policy on demand_votes with an inline
-- justification comment, so the build-time RLS gate (check-rls-policies.mjs)
-- recognises the permissive WITH CHECK (true) as intentional.
--
-- Behaviour is unchanged: anyone can submit a vote, but votes only count
-- toward demand thresholds after a staff member sets verified_at (see the
-- demand_recount_and_promote trigger).

DROP POLICY IF EXISTS "Anyone can submit a vote" ON public.demand_votes;

-- rls-check: allow-true reason: public vote intake; rows only count toward
-- demand thresholds after staff sets verified_at via demand_recount_and_promote.
CREATE POLICY "Anyone can submit a vote" ON public.demand_votes
  FOR INSERT TO anon, authenticated WITH CHECK (true);