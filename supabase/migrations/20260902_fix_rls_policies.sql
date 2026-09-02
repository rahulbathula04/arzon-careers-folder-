-- Fix career_engine_sessions table RLS policies
DROP POLICY IF EXISTS "career_engine_sessions_select" ON career_engine_sessions;
DROP POLICY IF EXISTS "career_engine_sessions_insert" ON career_engine_sessions;
DROP POLICY IF EXISTS "career_engine_sessions_update" ON career_engine_sessions;
DROP POLICY IF EXISTS "career_engine_sessions_delete" ON career_engine_sessions;

CREATE POLICY "career_engine_sessions_select" ON career_engine_sessions
  FOR SELECT USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.user_id = auth.uid() AND admin_profiles.is_admin = true
    )
  );

CREATE POLICY "career_engine_sessions_insert" ON career_engine_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "career_engine_sessions_update" ON career_engine_sessions
  FOR UPDATE USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "career_engine_sessions_delete" ON career_engine_sessions
  FOR DELETE USING (auth.uid() = user_id);

-- Fix career_engine_answers table RLS policies
DROP POLICY IF EXISTS "career_engine_answers_select" ON career_engine_answers;
DROP POLICY IF EXISTS "career_engine_answers_insert" ON career_engine_answers;
DROP POLICY IF EXISTS "career_engine_answers_update" ON career_engine_answers;
DROP POLICY IF EXISTS "career_engine_answers_delete" ON career_engine_answers;

CREATE POLICY "career_engine_answers_select" ON career_engine_answers
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM career_engine_sessions ces
      WHERE ces.id = career_engine_answers.session_id
      AND (ces.user_id = auth.uid() OR 
           EXISTS (
             SELECT 1 FROM admin_profiles
             WHERE admin_profiles.user_id = auth.uid() AND admin_profiles.is_admin = true
           ))
    )
  );

CREATE POLICY "career_engine_answers_insert" ON career_engine_answers
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM career_engine_sessions ces
      WHERE ces.id = career_engine_answers.session_id
      AND ces.user_id = auth.uid()
    )
  );

CREATE POLICY "career_engine_answers_update" ON career_engine_answers
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM career_engine_sessions ces
      WHERE ces.id = career_engine_answers.session_id
      AND ces.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM career_engine_sessions ces
      WHERE ces.id = career_engine_answers.session_id
      AND ces.user_id = auth.uid()
    )
  );

CREATE POLICY "career_engine_answers_delete" ON career_engine_answers
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM career_engine_sessions ces
      WHERE ces.id = career_engine_answers.session_id
      AND ces.user_id = auth.uid()
    )
  );

-- Fix career_engine_leads table RLS policies
DROP POLICY IF EXISTS "career_engine_leads_select" ON career_engine_leads;
DROP POLICY IF EXISTS "career_engine_leads_insert" ON career_engine_leads;
DROP POLICY IF EXISTS "career_engine_leads_update" ON career_engine_leads;
DROP POLICY IF EXISTS "career_engine_leads_delete" ON career_engine_leads;

CREATE POLICY "career_engine_leads_select" ON career_engine_leads
  FOR SELECT USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.user_id = auth.uid() AND admin_profiles.is_admin = true
    )
  );

CREATE POLICY "career_engine_leads_insert" ON career_engine_leads
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "career_engine_leads_update" ON career_engine_leads
  FOR UPDATE USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "career_engine_leads_delete" ON career_engine_leads
  FOR DELETE USING (auth.uid() = user_id);

-- Fix admin_invites table RLS policies (admin-only)
DROP POLICY IF EXISTS "admin_invites_select" ON admin_invites;
DROP POLICY IF EXISTS "admin_invites_insert" ON admin_invites;
DROP POLICY IF EXISTS "admin_invites_update" ON admin_invites;
DROP POLICY IF EXISTS "admin_invites_delete" ON admin_invites;

CREATE POLICY "admin_invites_select" ON admin_invites
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.user_id = auth.uid() AND admin_profiles.is_admin = true
    )
  );

CREATE POLICY "admin_invites_insert" ON admin_invites
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.user_id = auth.uid() AND admin_profiles.is_admin = true
    )
  );

CREATE POLICY "admin_invites_update" ON admin_invites
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.user_id = auth.uid() AND admin_profiles.is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.user_id = auth.uid() AND admin_profiles.is_admin = true
    )
  );

CREATE POLICY "admin_invites_delete" ON admin_invites
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.user_id = auth.uid() AND admin_profiles.is_admin = true
    )
  );

-- Fix assessment_shares table RLS policies
DROP POLICY IF EXISTS "assessment_shares_select" ON assessment_shares;
DROP POLICY IF EXISTS "assessment_shares_insert" ON assessment_shares;
DROP POLICY IF EXISTS "assessment_shares_update" ON assessment_shares;
DROP POLICY IF EXISTS "assessment_shares_delete" ON assessment_shares;

CREATE POLICY "assessment_shares_select" ON assessment_shares
  FOR SELECT USING (
    auth.uid() = owner_id OR
    auth.uid() = shared_with_user_id OR
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.user_id = auth.uid() AND admin_profiles.is_admin = true
    )
  );

CREATE POLICY "assessment_shares_insert" ON assessment_shares
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "assessment_shares_update" ON assessment_shares
  FOR UPDATE USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "assessment_shares_delete" ON assessment_shares
  FOR DELETE USING (auth.uid() = owner_id);

-- Fix referral_attributions table RLS policies
DROP POLICY IF EXISTS "referral_attributions_select" ON referral_attributions;
DROP POLICY IF EXISTS "referral_attributions_insert" ON referral_attributions;
DROP POLICY IF EXISTS "referral_attributions_update" ON referral_attributions;
DROP POLICY IF EXISTS "referral_attributions_delete" ON referral_attributions;

CREATE POLICY "referral_attributions_select" ON referral_attributions
  FOR SELECT USING (
    auth.uid() = referrer_id OR
    auth.uid() = referred_id OR
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.user_id = auth.uid() AND admin_profiles.is_admin = true
    )
  );

CREATE POLICY "referral_attributions_insert" ON referral_attributions
  FOR INSERT WITH CHECK (auth.uid() = referrer_id);

CREATE POLICY "referral_attributions_update" ON referral_attributions
  FOR UPDATE USING (
    auth.uid() = referrer_id OR
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.user_id = auth.uid() AND admin_profiles.is_admin = true
    )
  )
  WITH CHECK (
    auth.uid() = referrer_id OR
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.user_id = auth.uid() AND admin_profiles.is_admin = true
    )
  );

CREATE POLICY "referral_attributions_delete" ON referral_attributions
  FOR DELETE USING (
    auth.uid() = referrer_id OR
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.user_id = auth.uid() AND admin_profiles.is_admin = true
    )
  );

-- Add comment explaining RLS policy changes
COMMENT ON TABLE career_engine_sessions IS 'User career engine sessions - users can only access their own, admins can access all';
COMMENT ON TABLE career_engine_answers IS 'Answers to career engine questions - linked to session_id for access control';
COMMENT ON TABLE career_engine_leads IS 'Career engine leads - users can only access their own, admins can access all';
COMMENT ON TABLE admin_invites IS 'Admin invitations - restricted to admin users only';
COMMENT ON TABLE assessment_shares IS 'Shared assessments between users - owner and recipient can access';
COMMENT ON TABLE referral_attributions IS 'Referral tracking - referrer and referred user can access their own data';
