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
    const sb = getAcriAdminDb();
    try {
      const { data: rows, error } = await sb.rpc("acri_register_candidate", {
        p_full_name: data.fullName,
        p_email: data.email,
        p_mobile: data.mobile,
        p_highest_qualification: data.highestQualification,
        p_college_university: data.collegeUniversity,
        p_currently_working: data.currentlyWorking,
        p_utm_source: data.utmSource ?? null,
        p_utm_medium: data.utmMedium ?? null,
        p_utm_campaign: data.utmCampaign ?? null,
      });
      if (error) throw error;
      const row = Array.isArray(rows) ? rows[0] : rows;
      if (!row?.candidate_id || !row?.acri_candidate_id) {
        throw new Error("ACRI registration did not return a candidate record.");
      }
      return {
        success: true,
        candidateId: row.acri_candidate_id as string,
        canonicalCandidateId: row.candidate_id as string,
        cohortId: row.cohort_id as string,
        status: String(row.status).toLowerCase(),
        cohortName: row.cohort_name as string,
        startsAt: row.cohort_starts_at as string | null,
        endsAt: row.cohort_ends_at as string | null,
        totalInvites: row.cohort_capacity as number,
        claimedInvites: row.cohort_claimed_count as number,
        remainingInvites: Math.max(0, Number(row.cohort_capacity) - Number(row.cohort_claimed_count)),
        percentClaimed: Number(row.cohort_capacity) > 0
          ? Math.round((Number(row.cohort_claimed_count) / Number(row.cohort_capacity)) * 100)
          : 0,
        existingCandidate: Boolean(row.existing_candidate),
      };
    } catch (err) {
      console.error("[applyAcriCandidateFn] Database write failed:", err);
      throw new Error("ACRI registration is temporarily unavailable. Please try again.");
    }
  });

export const approveAcriCandidateFn = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => ApproveCandidateSchema.parse(data))
  .handler(async ({ data, context }) => {
    await requireAdmin(context.userId);
    const sb = getAcriAdminDb();
    try {
      const { data: rows, error } = await sb.rpc("acri_approve_candidate", {
        p_acri_candidate_id: data.candidateId,
        p_invite_code: data.inviteCode ?? null,
      });
      if (error) throw error;
      const row = Array.isArray(rows) ? rows[0] : rows;
      if (!row?.invite_code) throw new Error("ACRI invite issuance failed.");
      return {
        success: true,
        candidateId: row.acri_candidate_id as string,
        canonicalCandidateId: row.candidate_id as string,
        inviteCode: row.invite_code as string,
        status: String(row.status).toLowerCase(),
      };
    } catch (err) {
      console.error("[approveAcriCandidateFn] Database write failed:", err);
      throw new Error("Unable to approve ACRI candidate. Please try again.");
    }
  });

export const getAcriAdminCandidatesFn = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requireAdmin(context.userId);
    const sb = getAcriAdminDb();
    const { data, error } = await sb
      .from("acri_candidates")
      .select("id,candidate_id,full_name,email,mobile,highest_qualification,college_university,currently_working,cohort_id,invite_code,status,created_at,updated_at")
      .order("created_at", { ascending: false });
    if (error) throw new Error("Unable to load ACRI candidates.");
    return (data ?? []).map((x: any) => ({
      ...x,
      status: String(x.status).toLowerCase(),
    }));
  });

export const getAcriAdminCohortFn = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requireAdmin(context.userId);
    const sb = getAcriAdminDb();
    const { data, error } = await sb.from("acri_cohorts")
      .select("id,name,capacity,claimed_count,status")
      .eq("track", "pharmacovigilance")
      .eq("status", "active")
      .order("starts_at", { ascending: true, nullsFirst: true })
      .limit(1)
      .maybeSingle();
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
    const { data: cohort, error } = await sb.from("acri_cohorts")
      .select("id,claimed_count")
      .eq("track", "pharmacovigilance")
      .eq("status", "active")
      .order("starts_at", { ascending: true, nullsFirst: true })
      .limit(1)
      .maybeSingle();
    if (error || !cohort) throw new Error("ACRI cohort not found.");
    if (data.capacity < cohort.claimed_count) throw new Error("Capacity cannot be below already claimed seats.");
    const { error: updateError } = await sb
      .from("acri_cohorts")
      .update({ capacity: data.capacity, updated_at: new Date().toISOString() })
      .eq("id", cohort.id);
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
        .select("code,candidate_id,status,expires_at,track,acri_candidates(id,candidate_id,full_name,email,highest_qualification,college_university,status)")
        .eq("code", cleanCode)
        .maybeSingle();
      if (error) throw error;
      if (!invite) return { valid: false, error: "Invitation code not found or expired." };
      if (invite.status !== "active") return { valid: false, error: "This invitation is no longer active." };
      if (new Date(invite.expires_at).getTime() <= Date.now()) return { valid: false, error: "This invitation has expired." };
      const candidate = Array.isArray(invite.acri_candidates) ? invite.acri_candidates[0] : invite.acri_candidates;
      if (!candidate || !["INVITED","STARTED"].includes(candidate.status)) {
        return { valid: false, error: "This invitation is not authorized for assessment access." };
      }
      return {
        valid: true,
        inviteCode: invite.code,
        candidateId: candidate.id,
        canonicalCandidateId: candidate.candidate_id,
        candidateName: candidate.full_name,
        qualification: candidate.highest_qualification,
        college: candidate.college_university,
        track: "Pharmacovigilance Associate",
        durationMinutes: 25,
        competencyCount: 9,
        status: candidate.status,
      };
    } catch (err) {
      console.error("[verifyAcriInviteFn] Database lookup failed:", err);
      throw new Error("ACRI verification is temporarily unavailable. Please try again.");
    }
  });

export const startAcriSessionFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => StartSessionSchema.parse(data))
  .handler(async ({ data }) => {
    const sb = getAcriAdminDb();
    const { data: rows, error } = await sb.rpc("acri_start_session", {
      p_invite_code: data.inviteCode,
    });
    if (error) {
      console.error("[startAcriSessionFn] Session start failed:", error);
      throw new Error("Invitation code is invalid, expired, or not authorized for assessment.");
    }
    const row = Array.isArray(rows) ? rows[0] : rows;
    if (!row?.session_id || !row?.session_token) {
      throw new Error("Unable to start the ACRI assessment. Please try again.");
    }
    return {
      sessionId: row.session_id as string,
      sessionToken: row.session_token as string,
      expiresAt: row.expires_at as string,
      durationMinutes: 25,
      competencyCount: 9,
      candidate: {
        id: row.acri_candidate_id as string,
        canonicalCandidateId: row.candidate_id as string,
        fullName: row.full_name as string,
        email: row.email as string,
        qualification: row.qualification as string,
        college: row.college as string,
      },
      assessmentId: row.assessment_id as string,
      version: row.version as string,
      questions: sanitizeAssessmentItemsForClient(
        assembleAssessmentForm(row.session_id as string, 40),
      ),
    };
  });

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

      const { data: lifecycleRows, error: lifecycleError } = await sb.rpc("acri_finalize_assessment", {
        p_session_id: data.sessionId,
        p_candidate_id: candidate.id,
        p_result_id: resultId,
        p_credential_id: credentialId,
      });
      if (lifecycleError) throw lifecycleError;
      const lifecycle = Array.isArray(lifecycleRows) ? lifecycleRows[0] : lifecycleRows;
      if (!lifecycle?.status) throw new Error("Assessment lifecycle finalization did not complete.");

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
        .eq("track", "pharmacovigilance")
        .eq("status", "active")
        .order("starts_at", { ascending: true, nullsFirst: true })
        .limit(1)
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
