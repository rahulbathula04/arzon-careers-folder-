DROP VIEW IF EXISTS public.ce_funnel_summary;
CREATE VIEW public.ce_funnel_summary
WITH (security_invoker = true) AS
WITH base AS (
  SELECT date_trunc('day', created_at) AS day, event_name, session_id, lead_id
  FROM public.analytics_events
  WHERE created_at > now() - interval '30 days' AND event_name LIKE 'ce_server_%'
)
SELECT
  day,
  count(*) FILTER (WHERE event_name = 'ce_server_session_started')   AS sessions_started,
  count(DISTINCT session_id) FILTER (WHERE event_name = 'ce_server_answer_recorded') AS sessions_with_answers,
  count(*) FILTER (WHERE event_name = 'ce_server_lead_created')      AS leads_created,
  count(*) FILTER (WHERE event_name = 'ce_server_finalized')         AS leads_finalized,
  count(*) FILTER (WHERE event_name = 'ce_server_cohort_set')        AS cohorts_set,
  count(*) FILTER (WHERE event_name LIKE '%_rejected')               AS rejections,
  count(*) FILTER (WHERE event_name LIKE '%_rate_limited')           AS rate_limited
FROM base GROUP BY day ORDER BY day DESC;
GRANT SELECT ON public.ce_funnel_summary TO authenticated;