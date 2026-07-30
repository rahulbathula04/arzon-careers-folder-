-- 1. enrolments: source-of-truth per paid seat
CREATE TABLE public.enrolments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  intent_id UUID NOT NULL REFERENCES public.enrolment_intents(id) ON DELETE RESTRICT,
  tier TEXT NOT NULL CHECK (tier IN ('essential','career','elite')),
  cohort_id TEXT,
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  amount_inr INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','paused','completed','refunded')),
  provisioned_at TIMESTAMPTZ,
  paid_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX uq_enrolments_intent ON public.enrolments(intent_id);
CREATE UNIQUE INDEX uq_enrolments_payment ON public.enrolments(razorpay_payment_id) WHERE razorpay_payment_id IS NOT NULL;
CREATE INDEX idx_enrolments_user ON public.enrolments(user_id);
CREATE INDEX idx_enrolments_email ON public.enrolments(lower(email));

GRANT SELECT, UPDATE ON public.enrolments TO authenticated;
GRANT ALL ON public.enrolments TO service_role;
ALTER TABLE public.enrolments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "learner views own enrolments"
  ON public.enrolments FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "admin views all enrolments"
  ON public.enrolments FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER touch_enrolments_updated_at
  BEFORE UPDATE ON public.enrolments
  FOR EACH ROW EXECUTE FUNCTION public.touch_enrolment_intents_updated_at();

-- 2. submissions: student work per enrolment
CREATE TABLE public.submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  enrolment_id UUID NOT NULL REFERENCES public.enrolments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  artifact_url TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted','reviewed','returned')),
  mentor_feedback TEXT,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMPTZ
);

CREATE INDEX idx_submissions_enrolment ON public.submissions(enrolment_id);
CREATE INDEX idx_submissions_user ON public.submissions(user_id);

GRANT SELECT, INSERT, UPDATE ON public.submissions TO authenticated;
GRANT ALL ON public.submissions TO service_role;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "learner views own submissions"
  ON public.submissions FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "learner creates own submissions"
  ON public.submissions FOR INSERT TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM public.enrolments e
       WHERE e.id = enrolment_id AND e.user_id = auth.uid()
    )
  );

CREATE POLICY "learner updates own submissions (pre-review)"
  ON public.submissions FOR UPDATE TO authenticated
  USING (auth.uid() = user_id AND status = 'submitted')
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "admin views all submissions"
  ON public.submissions FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER touch_submissions_updated_at
  BEFORE UPDATE ON public.submissions
  FOR EACH ROW EXECUTE FUNCTION public.touch_enrolment_intents_updated_at();

-- 3. Auto-provisioning RPC: called by webhook after payment.captured.
-- Idempotent - safe on webhook retries.
CREATE OR REPLACE FUNCTION public.provision_enrolment_from_intent(
  p_intent_id UUID,
  p_cohort_id TEXT DEFAULT NULL
)
RETURNS TABLE(enrolment_id UUID, user_email TEXT, created BOOLEAN)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_intent public.enrolment_intents%ROWTYPE;
  v_existing_id UUID;
  v_user_id UUID;
  v_new_id UUID;
BEGIN
  SELECT * INTO v_intent FROM public.enrolment_intents WHERE id = p_intent_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'intent not found'; END IF;
  IF v_intent.status <> 'paid' THEN RAISE EXCEPTION 'intent not paid'; END IF;

  SELECT id INTO v_existing_id FROM public.enrolments WHERE intent_id = p_intent_id;
  IF v_existing_id IS NOT NULL THEN
    RETURN QUERY SELECT v_existing_id, v_intent.email, false;
    RETURN;
  END IF;

  -- Try to link to an existing auth user with this email (if they've signed up before)
  SELECT u.id INTO v_user_id FROM auth.users u WHERE lower(u.email) = lower(v_intent.email) LIMIT 1;

  INSERT INTO public.enrolments (
    user_id, email, intent_id, tier, cohort_id,
    razorpay_order_id, razorpay_payment_id,
    amount_inr, paid_at, provisioned_at
  ) VALUES (
    v_user_id, v_intent.email, v_intent.id, v_intent.tier, p_cohort_id,
    v_intent.razorpay_order_id, v_intent.razorpay_payment_id,
    COALESCE(v_intent.final_price_inr, v_intent.base_price_inr),
    COALESCE(v_intent.paid_at, now()), now()
  ) RETURNING id INTO v_new_id;

  RETURN QUERY SELECT v_new_id, v_intent.email, true;
END;
$$;

-- 4. Backfill link when a user signs up after paying
CREATE OR REPLACE FUNCTION public.link_enrolments_on_signup()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.enrolments
     SET user_id = NEW.id
   WHERE user_id IS NULL
     AND lower(email) = lower(NEW.email);
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_link_enrolments ON auth.users;
CREATE TRIGGER on_auth_user_link_enrolments
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.link_enrolments_on_signup();
