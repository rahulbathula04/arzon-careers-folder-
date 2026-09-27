import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { requireAdmin } from "@/server/auth-guards.server";
import { z } from "zod";
import { createSafeAdminClient, createSafePublicClient } from "@/lib/supabaseEnv";
import { ACRI_PV_WORK_SIMULATION_ITEMS, type AcriAssessmentItem } from "@/data/acri/acriPvCaseLibrary";
import { ACRI_PV_COMPETENCIES } from "@/data/acri/acriPvStandard";
import { evaluateCandidateResponses, type CandidateResponses } from "@/lib/acri/acriScoringEngine";
import { assembleAssessmentForm, sanitizeAssessmentItemsForClient } from "@/lib/acri/acriQuestionBank";
import { ACRI_PV_CURRENT_VERSION } from "@/data/acri/acriVersioning";

// ─── Input Validation Schemas ────────────────────────────────────────────────

const ApplyCandidateSchema = z.object({
  fullName: z.string().min(2).max(120),
  email: z.string().email().max(120),
  mobile: z.string().min(10).max(20),
  highestQualification: z.string().min(2).max(120),
  collegeUniversity: z.string().min(2).max(180),
  currentlyWorking: z.enum(["yes", "no"]).default("no"),
  utmSource: z.string().max(80).optional(),
  utmMedium: z.string().max(80).optional(),
  utmCampaign: z.string().max(80).optional(),
});

const VerifyInviteSchema = z.object({
  code: z.string().min(4).max(32),
});

const StartSessionSchema = z.object({
  inviteCode: z.string().min(4).max(32),
  candidateId: z.string().optional(),
});

const AutosaveSessionSchema = z.object({
  sessionId: z.string(),
  sessionToken: z.string(),
  currentQuestionIndex: z.number().int().min(0),
  responses: z.record(z.string(), z.unknown()),
});

const SubmitAssessmentSchema = z.object({
  sessionId: z.string(),
  sessionToken: z.string(),
  candidateId: z.string().uuid().optional(),
  candidateName: z.string().min(1).optional(),
  candidateEmail: z.string().email().optional(),
  qualification: z.string().optional(),
  college: z.string().optional(),
  responses: z.record(z.string(), z.unknown()),
  timeSpentSeconds: z.record(z.string(), z.number()).optional(),
  consentPublicLeaderboard: z.boolean().default(true),
});

const GetResultSchema = z.object({
  resultId: z.string().min(3),
});

const VerifyCredentialSchema = z.object({
  credentialId: z.string().trim().min(3).max(80),
});

const ApproveCandidateSchema = z.object({
  candidateId: z.string().min(1),
  inviteCode: z.string().optional(),
});

// Helper: Generate Cryptographic Invite Code
function generateInviteCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let random = "";
  for (let i = 0; i < 5; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `ACRI-PV-${random}`;
}

// Helper: Strip sensitive answer key & rubrics from items before browser delivery
function sanitizeQuestionsForClient(items: AcriAssessmentItem[]) {
  return items.map((item) => ({
    id: item.id,
    itemNumber: item.itemNumber,
    stageName: item.stageName,
    stageCategory: item.stageCategory,
    simulationType: item.simulationType,
    competencyId: item.competencyId,
    difficulty: item.difficulty,
    clinicalScenario: item.clinicalScenario,
    prompt: item.prompt,
    evidenceRef: item.evidenceRef,
    options: item.options?.map((opt) => ({
      key: opt.key,
      text: opt.text,
      // isCorrect and rationale are strictly withheld on server
    })),
    simulationData: item.simulationData,
  }));
}

// Helper: Get database clients
function getAcriPublicDb(): any {
  return createSafePublicClient();
}

function getAcriAdminDb(): any {
  return createSafeAdminClient();
}

// ─── 1. Apply Candidate (Pending Admissions Review) ──────────────────────────

export const applyAcriCandidateFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => ApplyCandidateSchema.parse(data))
  .handler(async ({ data }) => {
    const sb = getAcriPublicDb();
    const candidateId = crypto.randomUUID();

    try {
      // Resolve the active Pharmacovigilance cohort from the database.
      // Marketing code must never decide which cohort is currently live.
      const { data: cohort, error: cohortError } = await sb
        .from("acri_cohorts")
        .select("id,name,capacity,claimed_count,status,starts_at,ends_at")
        .eq("track", "pharmacovigilance")
        .eq("status", "active")
        .order("starts_at", { ascending: true, nullsFirst: true })
        .limit(1)
        .maybeSingle();

      if (cohortError || !cohort) {
        throw new Error("No active ACRI cohort is currently available.");
      }

      const cohortId = cohort.id;
      const capacity = cohort.capacity;
      const claimedCount = cohort.claimed_count;
      const remainingInvites = Math.max(0, capacity - claimedCount);
      const percentClaimed = Math.round((claimedCount / capacity) * 100);

      // 2. Persist candidate record in pending_review
      await sb.from("acri_candidates").insert({
        id: candidateId,
        full_name: data.fullName,
        email: data.email,
        mobile: data.mobile,
        highest_qualification: data.highestQualification,
        college_university: data.collegeUniversity,
        currently_working: data.currentlyWorking,
        cohort_id: cohortId,
        status: "pending_review",
        utm_source: data.utmSource ?? null,
        utm_medium: data.utmMedium ?? null,
        utm_campaign: data.utmCampaign ?? null,
      });

      // 3. Record admissions telemetry event
      await sb.from("acri_events").insert({
        event_name: "candidate_application_logged",
        candidate_id: candidateId,
        payload: {
          qualification: data.highestQualification,
          college: data.collegeUniversity,
          status: "pending_review",
        },
      });

      return {
        success: true,
        candidateId,
        cohortId,
        status: "pending_review",
        cohortName: cohort.name,
        startsAt: cohort.starts_at,
        endsAt: cohort.ends_at,
        totalInvites: capacity,
        claimedInvites: claimedCount,
        remainingInvites,
        percentClaimed,
      };
    } catch (err) {
      console.error("[applyAcriCandidateFn] Database write failed:", err);
      throw new Error("ACRI registration is temporarily unavailable. Please try again.");
    }
  });

// ─── 1b. Admin Authoritative Candidate Approval & Key Issuance ────────────────

export const approveAcriCandidateFn = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => ApproveCandidateSchema.parse(data))
   .handler(async ({ data, context }) => {
    await requireAdmin(context.userId);
    const sb = getAcriAdminDb();
    const candidateId = data.candidateId;
    const inviteCode = data.inviteCode || generateInviteCode();
    const cohortId = "ACRI-PV-2026-01";

    try {
      // 1. Update candidate status & assign invite code
      await sb
        .from("acri_candidates")
        .update({
          status: "invite_issued",
          invite_code: inviteCode,
        })
        .eq("id", candidateId);

      // 2. Persist active invitation record
      await sb.from("acri_invitations").upsert({
        code: inviteCode,
        candidate_id: candidateId,
        cohort_id: cohortId,
        track: "pharmacovigilance",
        status: "active",
        single_use: true,
      });

      // 3. Record telemetry event
      await sb.from("acri_events").insert({
        event_name: "candidate_approved_by_admin",
        candidate_id: candidateId,
        invite_code: inviteCode,
        payload: { approvedAt: new Date().toISOString() },
      });

      return {
        success: true,
        candidateId,
        inviteCode,
        status: "invite_issued",
      };
    } catch (err) {
      console.error("[approveAcriCandidateFn] Database write failed:", err);
      throw new Error("Unable to approve ACRI candidate. Please try again.");
    }
  });

// ─── 1c. Admin Candidate List ───────────────────────────────────────────────
export const getAcriAdminCandidatesFn = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requireAdmin(context.userId);
    const sb = getAcriAdminDb();
    const { data, error } = await sb.from("acri_candidates")
      .select("id,full_name,email,mobile,highest_qualification,college_university,currently_working,cohort_id,invite_code,status,created_at,updated_at")
      .order("created_at", { ascending: false });
    if (error) throw new Error("Unable to load ACRI candidates.");
    return data ?? [];
  });

export const getAcriAdminCohortFn = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requireAdmin(context.userId);
    const sb = getAcriAdminDb();
    const { data, error } = await sb.from("acri_cohorts")
      .select("id,name,capacity,claimed_count,status").eq("id","ACRI-PV-2026-01").maybeSingle();
    if (error || !data) throw new Error("Unable to load ACRI cohort.");
    return {
      cohortId: data.id, name: data.name, totalInvites: data.capacity,
      claimedInvites: data.claimed_count, remainingInvites: Math.max(0,data.capacity-data.claimed_count),
      percentClaimed: Math.round((data.claimed_count/data.capacity)*100), status: data.status,
    };
  });

export const setAcriCohortCapacityFn = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ capacity: z.number().int().min(10).max(100000) }).parse(data))
  .handler(async ({ data, context }) => {
    await requireAdmin(context.userId);
    const sb = getAcriAdminDb();
    const { data: cohort, error } = await sb.from("acri_cohorts").select("claimed_count").eq("id","ACRI-PV-2026-01").maybeSingle();
    if (error || !cohort) throw new Error("ACRI cohort not found.");
    if (data.capacity < cohort.claimed_count) throw new Error("Capacity cannot be below already claimed seats.");
    const { error: updateError } = await sb.from("acri_cohorts").update({ capacity: data.capacity, updated_at: new Date().toISOString() }).eq("id","ACRI-PV-2026-01");
    if (updateError) throw new Error("Unable to update ACRI cohort capacity.");
    return { success: true, capacity: data.capacity };
  });

// ─── 2. Verify Invite Code ───────────────────────────────────────────────────

export const verifyAcriInviteFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => VerifyInviteSchema.parse(data))
  .handler(async ({ data }) => {
    const sb = getAcriAdminDb();
    const cleanCode = data.code.trim().toUpperCase();

    try {
      const { data: invite, error } = await sb
        .from("acri_invitations")
        .select("*, acri_candidates(*)")
        .eq("code", cleanCode)
        .maybeSingle();

      if (error) {
        console.error("[verifyAcriInviteFn] invitation lookup failed:", error);
        throw new Error("ACRI verification is temporarily unavailable. Please try again.");
      }

      if (!invite) {
        return { valid: false, error: "Invitation code not found or expired." };
      }

      if (invite.status === "used") {
        return { valid: false, error: "This single-use invitation has already been redeemed." };
      }
      if (invite.status === "revoked") {
        return { valid: false, error: "This invitation code has been revoked by administration." };
      }

      return {
        valid: true,
        inviteCode: invite.code,
        candidateId: invite.candidate_id,
        candidateName: invite.acri_candidates?.full_name ?? "Candidate",
        qualification: invite.acri_candidates?.highest_qualification ?? "",
        college: invite.acri_candidates?.college_university ?? "",
        track: "Pharmacovigilance Associate",
        durationMinutes: 25,
        competencyCount: 9,
        status: invite.status,
      };
    } catch (err) {
      console.error("[verifyAcriInviteFn] Database lookup failed:", err);
      throw new Error("ACRI verification is temporarily unavailable. Please try again.");
    }
  });

// ─── 3. Start Assessment Session & Deliver Sanitized Items ────────────────────

export const startAcriSessionFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => StartSessionSchema.parse(data))
  .handler(async ({ data }) => {
    const sb = getAcriAdminDb();
    const sessionId = crypto.randomUUID();
    const sessionToken = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 25 * 60 * 1000).toISOString();

    const { data: invite, error: inviteError } = await sb
      .from("acri_invitations")
      .select("id, code, candidate_id, status, expires_at")
      .eq("code", data.inviteCode.trim().toUpperCase())
      .maybeSingle();
    if (inviteError || !invite || invite.status !== "active" || new Date(invite.expires_at) < new Date()) {
      throw new Error("Invitation code is invalid, expired, or already used.");
    }

    const { data: candidate, error: candidateError } = await sb
      .from("acri_candidates")
      .select("id, full_name, email, highest_qualification, college_university, status")
      .eq("id", invite.candidate_id)
      .maybeSingle();
    if (candidateError || !candidate) throw new Error("Candidate record could not be loaded.");

    const { error } = await sb.from("acri_sessions").insert({
      id: sessionId,
      session_token: sessionToken,
      candidate_id: candidate.id,
      invite_id: invite.id,
      assessment_id: "ACRI-PV",
      version: ACRI_PV_CURRENT_VERSION,
      expires_at: expiresAt,
      status: "in_progress",
    });
    if (error) throw new Error("Unable to start the ACRI assessment. Please try again.");

    await sb.from("acri_candidates").update({ status: "in_assessment", updated_at: new Date().toISOString() }).eq("id", candidate.id);
    await sb.from("acri_events").insert({ event_name: "assessment_started", candidate_id: candidate.id, invite_code: invite.code, session_id: sessionId });

    return {
      sessionId, sessionToken, expiresAt, durationMinutes: 25, competencyCount: 9,
      candidate: {
        id: candidate.id, fullName: candidate.full_name, email: candidate.email,
        qualification: candidate.highest_qualification, college: candidate.college_university,
      },
      questions: sanitizeAssessmentItemsForClient(assembleAssessmentForm(sessionId, 40)),
    };
  });

// ─── 4. Autosave Progress ────────────────────────────────────────────────────

export const autosaveAcriSessionFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => AutosaveSessionSchema.parse(data))
  .handler(async ({ data }) => {
    const sb = getAcriAdminDb();
    try {
      const { data: session, error: sessionError } = await sb
        .from("acri_sessions")
        .select("id, session_token, status, expires_at, candidate_id")
        .eq("id", data.sessionId)
        .eq("session_token", data.sessionToken)
        .maybeSingle();
      if (sessionError || !session) throw new Error("Assessment session is invalid.");
      if (session.status !== "in_progress" || new Date(session.expires_at) < new Date()) throw new Error("Assessment session has expired.");
      const { error } = await sb
        .from("acri_sessions")
        .update({
          current_question_index: data.currentQuestionIndex,
          autosaved_responses: data.responses,
        })
        .eq("id", data.sessionId);

      if (error) {
        throw new Error("Assessment progress could not be saved.");
      }

      return { success: true, autosavedAt: new Date().toISOString() };
    } catch (err) {
      console.error("[autosaveAcriSessionFn] persistence failed:", err);
      throw new Error("Assessment progress could not be saved.");
    }
  });

// ─── 5. Server-Side Assessment Evaluation & Credential Issuance ──────────────

export const submitAcriAssessmentFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => SubmitAssessmentSchema.parse(data))
  .handler(async ({ data }) => {
    const sb = getAcriAdminDb();
    const { data: session, error: sessionError } = await sb.from("acri_sessions")
      .select("id, session_token, candidate_id, status, expires_at, invite_id")
      .eq("id", data.sessionId).eq("session_token", data.sessionToken).maybeSingle();
    if (sessionError || !session || session.status !== "in_progress" || new Date(session.expires_at) < new Date()) {
      throw new Error("Assessment session is invalid, expired, or already submitted.");
    }
    const { data: candidate, error: candidateError } = await sb.from("acri_candidates")
      .select("id, full_name, email, highest_qualification, college_university")
      .eq("id", session.candidate_id).maybeSingle();
    if (candidateError || !candidate) throw new Error("Candidate record could not be loaded.");
    const candidateName = candidate.full_name;
    const candidateEmail = candidate.email;
    const qualification = candidate.highest_qualification;
    const college = candidate.college_university;
    const resultId = `AZ-ACRI-EVAL-${crypto.randomUUID().replaceAll("-", "").slice(0, 12).toUpperCase()}`;
    const completedAt = new Date().toISOString();

    // 1. Authoritative Server-Side Evaluation against identical assembled 40-item battery
    const candidateResponses: CandidateResponses = {
      answers: data.responses,
      timeSpentSeconds: data.timeSpentSeconds,
    };

    const assembledItems = assembleAssessmentForm(data.sessionId, 40);
    const evaluated = evaluateCandidateResponses(
      candidateResponses,
      assembledItems as any
    );

    const score = evaluated.compositeScore;
    const readinessLevel =
      score >= 80
        ? "Industry Ready"
        : score >= 60
          ? "Near Ready"
          : score >= 40
            ? "Developing"
            : "Foundation Building";
    const passedGates = evaluated.passedGates;
    const percentile = Math.min(99, Math.max(1, Math.round(score * 0.95)));

    // Extract competency scores
    const dimensionScores = evaluated.dimensionScores;
    const competencyBreakdowns = Object.entries(dimensionScores).map(
      ([id, compScore]) => {
        const comp = (ACRI_PV_COMPETENCIES as Record<string, any>)[id];
        return {
          competencyId: id,
          competencyName: comp?.name ?? id,
          score: compScore,
          benchmark: 80,
          status: compScore >= 80 ? "mastered" : compScore >= 60 ? "near_ready" : "gap",
        };
      }
    );

    // Generate Credential if score >= 80
    const credentialId = score >= 80 ? `ACRI-PV-${new Date().getUTCFullYear()}-${crypto.randomUUID().replaceAll("-", "").slice(0, 8).toUpperCase()}` : null;

    try {
      // 2. Lock session
      await sb
        .from("acri_sessions")
        .update({ status: "submitted", completed_at: completedAt })
        .eq("id", data.sessionId);

      // 3. Persist Result
      await sb.from("acri_results").insert({
        id: resultId,
        session_id: data.sessionId,
        candidate_id: candidate.id,
        candidate_name: candidateName,
        candidate_email: candidateEmail,
        qualification,
        college,
        score,
        percentile,
        readiness_level: readinessLevel,
        passed_gates: passedGates,
        summary: `Demonstrated ${readinessLevel} operational proficiency across 9 core Pharmacovigilance competencies.`,
        dimension_scores: dimensionScores,
        completed_at: completedAt,
      });

      // 4. Persist Competency Records
      for (const comp of competencyBreakdowns) {
        await sb.from("acri_competency_scores").insert({
          result_id: resultId,
          competency_id: comp.competencyId,
          competency_name: comp.competencyName,
          score: comp.score,
          benchmark: 80,
          status: comp.status,
        });
      }

      // 5. Issue Credential if eligible
      if (credentialId) {
        await sb.from("acri_credentials").insert({
          credential_id: credentialId,
          result_id: resultId,
          candidate_id: candidate.id,
          candidate_name: candidateName,
          track: "Pharmacovigilance Associate",
          score,
          readiness_level: readinessLevel,
          institution: college,
          issued_at: completedAt,
          is_verified: true,
          verification_url: `https://arzoncareers.in/verify?id=${credentialId}`,
        });
      }

      // 6. Add to Leaderboard if candidate consented
      if (data.consentPublicLeaderboard) {
        await sb.from("acri_leaderboard_entries").insert({
          candidate_id: candidate.id,
          display_name: candidateName.split(" ")[0] + (candidateName.split(" ")[1] ? ` ${candidateName.split(" ")[1][0]}.` : ""),
          score,
          college,
          qualification,
          consent_public: true,
        });
      }

      await sb.from("acri_invitations").update({ status: "used", used_at: completedAt }).eq("id", session.invite_id).eq("status", "active");
      await sb.from("acri_candidates").update({ status: "completed", updated_at: completedAt }).eq("id", candidate.id);

      // 7. Record Telemetry Event
      await sb.from("acri_events").insert({
        event_name: "assessment_submitted",
        candidate_id: candidate.id,
        session_id: data.sessionId,
        payload: { score, readinessLevel, credentialIssued: !!credentialId },
      });
    } catch (err) {
      console.error("[submitAcriAssessmentFn] Database persistence failed:", err);
      throw new Error("Assessment submission could not be persisted. Please do not retry repeatedly; contact support.");
    }

    return {
      resultId,
      credentialId,
      score,
      percentile,
      readinessLevel,
      passedGates,
      dimensionScores,
      competencies: competencyBreakdowns,
      completedAt,
    };
  });

// ─── 6. Get Result Dossier ───────────────────────────────────────────────────

export const getAcriResultFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => GetResultSchema.parse(data))
  .handler(async ({ data }) => {
    const sb = getAcriAdminDb();
    try {
      const { data: result } = await sb
        .from("acri_results")
        .select("*, acri_competency_scores(*), acri_credentials(*)")
        .eq("id", data.resultId)
        .maybeSingle();

      if (result) {
        return {
          resultId: result.id,
          candidateName: result.candidate_name,
          qualification: result.qualification,
          college: result.college,
          score: result.score,
          percentile: result.percentile,
          readinessLevel: result.readiness_level,
          passedGates: result.passed_gates,
          summary: result.summary,
          dimensionScores: result.dimension_scores as Record<string, number>,
          credentialId: result.acri_credentials?.[0]?.credential_id ?? null,
          completedAt: result.completed_at,
        };
      }
    } catch (err) {
      console.warn("[getAcriResultFn] DB error:", err);
    }
    return null;
  });

// ─── 7. Public Credential Verification ───────────────────────────────────────

export const verifyAcriCredentialFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => VerifyCredentialSchema.parse(data))
  .handler(async ({ data }) => {
    const sb = getAcriAdminDb();
    const cleanId = data.credentialId.trim();

    try {
      // Public verification is authoritative only when a verified credential
      // record exists. A result record alone is never promoted into a
      // synthetic certificate.
      const { data: cred, error } = await sb
        .from("acri_credentials")
        .select(
          "credential_id,result_id,candidate_name,track,score,readiness_level,institution,issued_at,verification_url"
        )
        .eq("credential_id", cleanId)
        .eq("is_verified", true)
        .maybeSingle();

      if (error) {
        console.error("[verifyAcriCredentialFn] credential lookup failed:", error);
        throw new Error("Credential verification is temporarily unavailable. Please try again.");
      }

      if (!cred) {
        return {
          verified: false,
          error: "No matching verified credential found in Arzon Global registry.",
        };
      }

      return {
        verified: true,
        credentialId: cred.credential_id,
        resultId: cred.result_id,
        candidateName: cred.candidate_name,
        track: cred.track,
        score: cred.score,
        readinessLevel: cred.readiness_level,
        institution: cred.institution ?? "Affiliated Pharmacy College",
        issuedAt: cred.issued_at,
        verificationUrl:
          cred.verification_url ??
          `https://arzoncareers.in/verify?id=${encodeURIComponent(cred.credential_id)}`,
      };
    } catch (err) {
      console.error("[verifyAcriCredentialFn] Database verification failed:", err);
      throw new Error("Credential verification is temporarily unavailable. Please try again.");
    }
  });

// ─── 8. Leaderboard Entries & Stats ──────────────────────────────────────────

export const getAcriLeaderboardFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const sb = getAcriPublicDb();
    try {
      const { data: entries } = await sb
        .from("acri_leaderboard_entries")
        .select("*")
        .eq("consent_public", true)
        .order("score", { ascending: false })
        .limit(25);

      const items: any[] = entries ?? [];
      const totalCompleted = items.length;
      const averageScore = totalCompleted > 0
        ? Math.round(items.reduce((acc: number, curr: any) => acc + (curr.score || 0), 0) / totalCompleted)
        : 0;
      const industryReadyCount = items.filter((i: any) => (i.score || 0) >= 80).length;

      return {
        entries: items.map((item: any, index: number) => ({
          rank: index + 1,
          name: item.display_name,
          score: item.score,
          college: item.college,
          qualification: item.qualification,
        })),
        stats: {
          totalCompleted,
          averageScore,
          industryReadyCount,
        },
      };
    } catch {
      throw new Error("ACRI leaderboard is temporarily unavailable.");
    }
  }
);

// ─── 9. Cohort Metrics Counter ───────────────────────────────────────────────

export const getAcriCohortMetricsFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const sb = getAcriPublicDb();
    try {
      const { data: cohort } = await sb
        .from("acri_cohorts")
        .select("*")
        .eq("id", "ACRI-PV-2026-01")
        .maybeSingle();

      if (!cohort) throw new Error("ACRI cohort not found.");
      const total = cohort.capacity;
      const claimed = cohort.claimed_count;
      const remaining = Math.max(0, total - claimed);
      const percent = Math.round((claimed / total) * 100);

      return {
        cohortId: cohort.id,
        name: cohort.name,
        totalInvites: total,
        claimedInvites: claimed,
        remainingInvites: remaining,
        percentClaimed: percent,
        status: cohort.status,
      };
    } catch (err) {
      console.error("[getAcriCohortMetricsFn] Database lookup failed:", err);
      throw new Error("ACRI cohort metrics are temporarily unavailable.");
    }
  }
);
