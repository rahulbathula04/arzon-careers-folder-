ALTER VIEW public.demand_vote_counts SET (security_invoker = true);

REVOKE EXECUTE ON FUNCTION public.demand_recount_and_promote() FROM anon, public;