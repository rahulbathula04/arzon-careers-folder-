-- Snapshots of GSC top query performance, captured daily
CREATE TABLE public.seo_query_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  captured_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  window_start DATE NOT NULL,
  window_end DATE NOT NULL,
  query TEXT NOT NULL,
  clicks INTEGER NOT NULL DEFAULT 0,
  impressions INTEGER NOT NULL DEFAULT 0,
  ctr NUMERIC(6,4) NOT NULL DEFAULT 0,
  position NUMERIC(6,2) NOT NULL DEFAULT 0
);
CREATE INDEX idx_seo_query_snapshots_query ON public.seo_query_snapshots(query, captured_at DESC);
CREATE INDEX idx_seo_query_snapshots_captured ON public.seo_query_snapshots(captured_at DESC);
ALTER TABLE public.seo_query_snapshots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read snapshots" ON public.seo_query_snapshots
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Alerts raised when a top query drops significantly
CREATE TABLE public.seo_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  query TEXT NOT NULL,
  metric TEXT NOT NULL CHECK (metric IN ('clicks','impressions')),
  prev_value INTEGER NOT NULL,
  curr_value INTEGER NOT NULL,
  pct_change NUMERIC(6,2) NOT NULL,
  prev_window_start DATE NOT NULL,
  prev_window_end DATE NOT NULL,
  curr_window_start DATE NOT NULL,
  curr_window_end DATE NOT NULL,
  acknowledged_at TIMESTAMPTZ,
  acknowledged_by UUID
);
CREATE INDEX idx_seo_alerts_created ON public.seo_alerts(created_at DESC);
CREATE INDEX idx_seo_alerts_unack ON public.seo_alerts(acknowledged_at) WHERE acknowledged_at IS NULL;
ALTER TABLE public.seo_alerts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read alerts" ON public.seo_alerts
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update alerts" ON public.seo_alerts
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Threshold config (single row)
CREATE TABLE public.seo_alert_config (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  min_impressions INTEGER NOT NULL DEFAULT 20,
  drop_pct NUMERIC(5,2) NOT NULL DEFAULT 50,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
INSERT INTO public.seo_alert_config (id) VALUES (1);
ALTER TABLE public.seo_alert_config ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read config" ON public.seo_alert_config
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update config" ON public.seo_alert_config
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));