CREATE TABLE public.ce_percentile_snapshots (
  stream text NOT NULL,
  dimension text NOT NULL,
  cdf numeric[] NOT NULL,
  sample_size integer NOT NULL,
  refreshed_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (stream, dimension)
);

GRANT SELECT ON public.ce_percentile_snapshots TO anon, authenticated;
GRANT ALL ON public.ce_percentile_snapshots TO service_role;

ALTER TABLE public.ce_percentile_snapshots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read percentile snapshots"
  ON public.ce_percentile_snapshots
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Service role manages snapshots"
  ON public.ce_percentile_snapshots
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);