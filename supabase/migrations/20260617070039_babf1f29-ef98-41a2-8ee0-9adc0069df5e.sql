-- Payment recovery queue + recovery_attempts log on CRM leads.
CREATE TABLE IF NOT EXISTS public.payment_recovery_queue (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'pending', -- pending | sent | completed | cancelled | failed
  attempts int NOT NULL DEFAULT 0,
  max_attempts int NOT NULL DEFAULT 3,
  next_send_at timestamptz NOT NULL DEFAULT now(),
  last_channel text,
  last_error text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.payment_recovery_queue TO authenticated;
GRANT ALL ON public.payment_recovery_queue TO service_role;

ALTER TABLE public.payment_recovery_queue ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins read recovery queue"
ON public.payment_recovery_queue FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX IF NOT EXISTS payment_recovery_queue_due_idx
  ON public.payment_recovery_queue (status, next_send_at)
  WHERE status = 'pending';

CREATE INDEX IF NOT EXISTS payment_recovery_queue_app_idx
  ON public.payment_recovery_queue (application_id);

CREATE OR REPLACE FUNCTION public.touch_payment_recovery_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;

DROP TRIGGER IF EXISTS payment_recovery_queue_touch ON public.payment_recovery_queue;
CREATE TRIGGER payment_recovery_queue_touch
  BEFORE UPDATE ON public.payment_recovery_queue
  FOR EACH ROW EXECUTE FUNCTION public.touch_payment_recovery_updated_at();

-- CRM lead recovery audit (jsonb array of {attempt, channel, sent_at, message_id, error})
ALTER TABLE public.counsellor_leads
  ADD COLUMN IF NOT EXISTS recovery_attempts jsonb NOT NULL DEFAULT '[]'::jsonb;