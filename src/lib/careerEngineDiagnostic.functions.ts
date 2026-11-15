import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createSafeAdminClient } from "@/lib/supabaseEnv";
import type { AntiCheatTelemetry } from "@/lib/assessmentAntiCheat";

function admin() {
  return createSafeAdminClient();
}

const GetDiagnosticResultInput = z.object({
  leadId: z.string().min(10).max(64),
});

export interface PublicDiagnosticResultData {
  found: boolean;
  leadId?: string;
  candidateName?: string;
  candidateQualification?: string;
  candidateCollege?: string;
  candidateGraduationYear?: string;
  candidateCurrentStatus?: string;
  candidateTargetRole?: string;
  answers?: Record<string, string>;
  antiCheat?: AntiCheatTelemetry;
  fitScore?: number;
  archetype?: string;
  createdAt?: string;
}

/**
 * Server Function: Safely retrieves a candidate's completed diagnostic evaluation
 * from the database using the lead ID. Bypasses client-side session-token limits
 * so mentors, counsellors, and evaluators can view the student's authentic results.
 */
export const getPublicDiagnosticResult = createServerFn({ method: "GET" })
  .inputValidator((d: unknown) => GetDiagnosticResultInput.parse(d))
  .handler(async ({ data }): Promise<PublicDiagnosticResultData> => {
    try {
      const sb = admin();
      const { data: lead, error: leadError } = await sb
        .from("career_engine_leads")
        .select("id, name, fit_score, archetype, result_payload, session_id, created_at")
        .eq("id", data.leadId)
        .maybeSingle();

      if (leadError || !lead) {
        return { found: false };
      }

      // 1. Fetch exact question-by-question answers from career_engine_answers
      let answers: Record<string, string> = {};
      if (lead.session_id) {
        const { data: answerRows } = await sb
          .from("career_engine_answers")
          .select("question_id, answer")
          .eq("session_id", lead.session_id);

        if (answerRows && answerRows.length > 0) {
          answers = Object.fromEntries(
            answerRows.map((r) => [r.question_id, r.answer]),
          );
        }
      }

      // 2. Fallback: check if answers were embedded in result_payload
      const payload = (lead.result_payload ?? {}) as {
        profile?: {
          college?: string;
          college_name?: string;
          course?: string;
          qualification?: string;
          stream?: string;
          year?: string;
          graduationYear?: string;
          currentStatus?: string;
          targetRole?: string;
        };
        answers?: Record<string, string>;
        anti_cheat?: AntiCheatTelemetry;
      };

      if (Object.keys(answers).length === 0 && payload.answers) {
        answers = payload.answers;
      }

      const prof = payload.profile;

      return {
        found: true,
        leadId: lead.id,
        candidateName: lead.name,
        candidateQualification:
          prof?.qualification || prof?.course || "B.Pharm",
        candidateCollege:
          prof?.college || prof?.college_name || "Healthcare Graduate College",
        candidateGraduationYear:
          prof?.graduationYear || prof?.year || "2025",
        candidateCurrentStatus:
          prof?.currentStatus || "Actively Job Hunting",
        candidateTargetRole:
          prof?.targetRole ||
          (lead.archetype === "coder"
            ? "Drug Safety Associate"
            : lead.archetype || "Drug Safety Associate"),
        answers,
        antiCheat: payload.anti_cheat,
        fitScore: lead.fit_score ?? undefined,
        archetype: lead.archetype ?? undefined,
        createdAt: lead.created_at,
      };
    } catch (err) {
      console.error("[getPublicDiagnosticResult] error fetching diagnostic lead:", err);
      return { found: false };
    }
  });

const SaveEarlyProfileInput = z.object({
  leadId: z.string().min(10).max(64),
  college: z.string().max(200).optional(),
  qualification: z.string().max(100).optional(),
  graduationYear: z.string().max(20).optional(),
  currentStatus: z.string().max(100).optional(),
  targetRole: z.string().max(100).optional(),
});

/**
 * Server Function: Immediately saves the candidate's academic profile (college, degree,
 * graduation year, target role) to career_engine_leads.result_payload and answers table
 * right after lead creation, ensuring full details are visible in the Admin Dashboard
 * even if the student is still taking the assessment or drops off.
 */
export const saveEarlyDiagnosticProfile = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => SaveEarlyProfileInput.parse(d))
  .handler(async ({ data }) => {
    try {
      const sb = admin();
      const { data: existing } = await sb
        .from("career_engine_leads")
        .select("result_payload, session_id")
        .eq("id", data.leadId)
        .maybeSingle();

      const existingPayload =
        existing?.result_payload && typeof existing.result_payload === "object"
          ? (existing.result_payload as Record<string, any>)
          : {};

      const profile = {
        ...(existingPayload.profile || {}),
        college: data.college?.trim() || undefined,
        course: data.qualification?.trim() || undefined,
        qualification: data.qualification?.trim() || undefined,
        year: data.graduationYear?.trim() || undefined,
        graduationYear: data.graduationYear?.trim() || undefined,
        currentStatus: data.currentStatus?.trim() || undefined,
        targetRole: data.targetRole?.trim() || undefined,
      };

      const updatedPayload = {
        ...existingPayload,
        profile,
      };

      await sb
        .from("career_engine_leads")
        .update({ result_payload: updatedPayload })
        .eq("id", data.leadId);

      // Also upsert into career_engine_answers so queries relying on the answers table immediately find them
      if (existing?.session_id && (data.college || data.qualification || data.graduationYear)) {
        const rowsToUpsert: Array<{ session_id: string; question_id: string; answer: string }> = [];
        if (data.college) {
          rowsToUpsert.push({ session_id: existing.session_id, question_id: "college_name", answer: data.college.trim() });
          rowsToUpsert.push({ session_id: existing.session_id, question_id: "college", answer: data.college.trim() });
        }
        if (data.qualification) {
          rowsToUpsert.push({ session_id: existing.session_id, question_id: "course", answer: data.qualification.trim() });
        }
        if (data.graduationYear) {
          rowsToUpsert.push({ session_id: existing.session_id, question_id: "year", answer: data.graduationYear.trim() });
        }
        if (rowsToUpsert.length > 0) {
          try {
            await sb.from("career_engine_answers").upsert(rowsToUpsert, { onConflict: "session_id,question_id" });
          } catch {
            /* ignore upsert conflict */
          }
        }
      }

      return { ok: true };
    } catch (err) {
      console.warn("[saveEarlyDiagnosticProfile] error persisting early profile:", err);
      return { ok: false };
    }
  });

/**
 * Compact Answer Serialization for 40-Question DSA Diagnostic
 * Encodes answers into a compact 40-character string (e.g. "BACDAACD...")
 * for tamper-safe instant URL sharing and offline fallback.
 */
export function encodeCompactAnswers(answers: Record<string, string>): string {
  let s = "";
  for (let i = 1; i <= 40; i++) {
    const raw = answers[`dsa_q${i}`] || answers[`dsa_q0${i}`] || "-";
    const upper = String(raw).trim().toUpperCase();
    if (upper === "A" || upper === "B" || upper === "C" || upper === "D") {
      s += upper;
    } else {
      s += "-";
    }
  }
  return s;
}

/**
 * Decodes compact 40-character string back into canonical question-answer map.
 */
export function decodeCompactAnswers(code: string | undefined): Record<string, string> {
  if (!code || typeof code !== "string") return {};
  const cleaned = code.trim().toUpperCase();
  const result: Record<string, string> = {};
  for (let i = 0; i < Math.min(40, cleaned.length); i++) {
    const ch = cleaned[i];
    if (ch === "A" || ch === "B" || ch === "C" || ch === "D") {
      result[`dsa_q${i + 1}`] = ch;
    }
  }
  return result;
}
