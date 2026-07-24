-- Phase 1 Performance Optimization: B-Tree Indexes for 1M User Scale

-- Career Engine Indexes
CREATE INDEX IF NOT EXISTS idx_ce_leads_phone ON public.career_engine_leads(phone);
CREATE INDEX IF NOT EXISTS idx_ce_leads_email ON public.career_engine_leads(email);
CREATE INDEX IF NOT EXISTS idx_ce_leads_session ON public.career_engine_leads(session_id);

CREATE INDEX IF NOT EXISTS idx_ce_sessions_source ON public.career_engine_sessions(utm_source);
CREATE INDEX IF NOT EXISTS idx_ce_sessions_device ON public.career_engine_sessions(device);
CREATE INDEX IF NOT EXISTS idx_ce_answers_session ON public.career_engine_answers(session_id);

-- Enrolment Intents Indexes for CRM/Analytics Lookups
CREATE INDEX IF NOT EXISTS idx_enrol_intents_phone ON public.enrolment_intents(phone);
CREATE INDEX IF NOT EXISTS idx_enrol_intents_status ON public.enrolment_intents(status);
CREATE INDEX IF NOT EXISTS idx_enrol_intents_tier ON public.enrolment_intents(tier);
