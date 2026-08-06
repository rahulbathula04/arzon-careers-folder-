-- Enterprise RLS Hardening & Audit Security Migration

-- Enforce Row Level Security on core public tables
ALTER TABLE IF EXISTS public.career_engine_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.career_engine_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.career_engine_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.enrolment_intents ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.admin_audit_logs ENABLE ROW LEVEL SECURITY;

-- Ensure service_role has full access for serverless API operations
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'career_engine_leads' AND policyname = 'Service role full access on career_engine_leads'
  ) THEN
    -- rls-check: allow-true reason: serverless service_role administrative pipeline access
    CREATE POLICY "Service role full access on career_engine_leads"
      ON public.career_engine_leads
      FOR ALL
      TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'enrolment_intents' AND policyname = 'Service role full access on enrolment_intents'
  ) THEN
    -- rls-check: allow-true reason: serverless service_role administrative enrolment pipeline access
    CREATE POLICY "Service role full access on enrolment_intents"
      ON public.enrolment_intents
      FOR ALL
      TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

-- Additional security indexes for audit log queries
CREATE INDEX IF NOT EXISTS idx_admin_audit_created ON public.admin_audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ce_answers_created ON public.career_engine_answers(created_at DESC);
