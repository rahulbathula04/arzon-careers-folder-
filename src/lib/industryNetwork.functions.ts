import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import fs from "node:fs";
import path from "node:path";
import { createSafeAdminClient } from "@/lib/supabaseEnv";

export type ApplicationStatus =
  | "Submitted"
  | "Under Review"
  | "Shortlisted"
  | "Interview Scheduled"
  | "Selected"
  | "Rejected";

export interface IndustryNetworkApplicationRecord {
  id: string;
  applicationNumber: string;
  fullName: string;
  mobileNumber: string;
  email: string;
  collegeName: string;
  collegeCity: string;
  course: string;
  academicYear: string;
  photoUrl: string;
  motivation: string;
  interestConfirmation: string;
  declarationAccepted: boolean;
  status: ApplicationStatus;
  adminRemarks?: string;
  submittedAt: string;
  updatedAt: string;
}

const SubmitSchema = z.object({
  fullName: z.string().trim().min(2, "Full name must be at least 2 characters").max(100),
  mobileNumber: z
    .string()
    .trim()
    .regex(/^(?:\+91|91)?[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
  email: z.string().trim().email("Please enter a valid email address"),
  collegeName: z.string().trim().min(2, "College name is required").max(180),
  collegeCity: z.string().trim().max(100).optional().default(""),
  course: z.string().trim().optional().default("Healthcare / Life Sciences"),
  academicYear: z.string().trim().optional().default("Active Student"),
  photoBase64: z.string().optional().default(""),
  motivation: z.string().trim().optional().default("Fast-Track Application"),
  interestConfirmation: z.enum(["Yes, I am interested.", "I would like to know more."]).optional().default("Yes, I am interested."),
  declarationAccepted: z.boolean().optional().default(true),
});

function getDataFilePath(): string {
  return path.resolve(process.cwd(), "src/data/industryNetworkApplications.json");
}

export function readLocalApplications(): IndustryNetworkApplicationRecord[] {
  try {
    const file = getDataFilePath();
    if (!fs.existsSync(file)) {
      fs.writeFileSync(file, "[]", "utf8");
      return [];
    }
    const raw = fs.readFileSync(file, "utf8");
    return JSON.parse(raw || "[]");
  } catch (err) {
    console.error("[IndustryNetwork] Error reading local store:", err);
    return [];
  }
}

export function writeLocalApplications(records: IndustryNetworkApplicationRecord[]): void {
  try {
    const file = getDataFilePath();
    fs.writeFileSync(file, JSON.stringify(records, null, 2), "utf8");
  } catch (err) {
    console.error("[IndustryNetwork] Error writing local store:", err);
  }
}

function generateApplicationNumber(): string {
  const year = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `AG-INL-${year}-${rand}`;
}

/**
 * Server Function: Submit application
 */
export const submitIndustryNetworkAppFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => SubmitSchema.parse(data))
  .handler(async ({ data }) => {
    const cleanMobile = data.mobileNumber.replace(/^(\+91|91)/, "");
    const cleanEmail = data.email.toLowerCase().trim();

    const existingList = readLocalApplications();
    const duplicate = existingList.find(
      (app) =>
        app.email.toLowerCase() === cleanEmail ||
        app.mobileNumber.replace(/^(\+91|91)/, "") === cleanMobile,
    );

    if (duplicate) {
      return {
        success: true,
        isDuplicate: true,
        message: "An application with this email or mobile number already exists.",
        record: duplicate,
      };
    }

    const applicationNumber = generateApplicationNumber();
    const id = "inl_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7);
    const now = new Date().toISOString();

    const newRecord: IndustryNetworkApplicationRecord = {
      id,
      applicationNumber,
      fullName: data.fullName,
      mobileNumber: cleanMobile,
      email: cleanEmail,
      collegeName: data.collegeName,
      collegeCity: data.collegeCity,
      course: data.course,
      academicYear: data.academicYear,
      photoUrl: data.photoBase64,
      motivation: data.motivation,
      interestConfirmation: data.interestConfirmation,
      declarationAccepted: data.declarationAccepted,
      status: "Submitted",
      submittedAt: now,
      updatedAt: now,
    };

    // 1. Write to persistent local store
    existingList.unshift(newRecord);
    writeLocalApplications(existingList);

    // 2. Best-effort sync to Supabase applications table if available
    try {
      const sb = createSafeAdminClient();
      await (sb as any).rpc("submit_application", {
        p_name: data.fullName,
        p_email: cleanEmail,
        p_phone: cleanMobile,
        p_program_slug: "industry-network-lead",
        p_program_name: "Arzon Global Industry Network Programme",
        p_whatsapp_optin: true,
        p_lead_id: null,
        p_utm_source: "industry_network_apply_page",
      });
    } catch (sbErr) {
      // Non-fatal, local record is safely persisted
      console.warn("[IndustryNetwork] Supabase sync notice:", sbErr);
    }

    return {
      success: true,
      isDuplicate: false,
      message: "Application submitted successfully!",
      record: newRecord,
    };
  });

/**
 * Server Function: List applications for admin
 */
export const listIndustryNetworkAppsFn = createServerFn({ method: "GET" })
  .inputValidator((query: unknown) => {
    return (query as {
      search?: string;
      status?: string;
      course?: string;
      academicYear?: string;
    }) || {};
  })
  .handler(async ({ data }) => {
    const list = readLocalApplications();
    let filtered = [...list];

    if (data.search?.trim()) {
      const q = data.search.toLowerCase().trim();
      filtered = filtered.filter(
        (app) =>
          app.fullName.toLowerCase().includes(q) ||
          app.collegeName.toLowerCase().includes(q) ||
          app.collegeCity.toLowerCase().includes(q) ||
          app.email.toLowerCase().includes(q) ||
          app.applicationNumber.toLowerCase().includes(q) ||
          app.mobileNumber.includes(q),
      );
    }

    if (data.status && data.status !== "All") {
      filtered = filtered.filter((app) => app.status === data.status);
    }

    if (data.course && data.course !== "All") {
      filtered = filtered.filter((app) => app.course === data.course);
    }

    if (data.academicYear && data.academicYear !== "All") {
      filtered = filtered.filter((app) => app.academicYear === data.academicYear);
    }

    const stats = {
      total: list.length,
      submitted: list.filter((a) => a.status === "Submitted").length,
      underReview: list.filter((a) => a.status === "Under Review").length,
      shortlisted: list.filter((a) => a.status === "Shortlisted").length,
      interviewScheduled: list.filter((a) => a.status === "Interview Scheduled").length,
      selected: list.filter((a) => a.status === "Selected").length,
      rejected: list.filter((a) => a.status === "Rejected").length,
    };

    return {
      applications: filtered,
      stats,
    };
  });

/**
 * Server Function: Update status and remarks
 */
export const updateIndustryNetworkStatusFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => {
    return z
      .object({
        id: z.string(),
        status: z.enum([
          "Submitted",
          "Under Review",
          "Shortlisted",
          "Interview Scheduled",
          "Selected",
          "Rejected",
        ]),
        adminRemarks: z.string().optional(),
      })
      .parse(data);
  })
  .handler(async ({ data }) => {
    const list = readLocalApplications();
    const index = list.findIndex((a) => a.id === data.id);
    if (index === -1) {
      throw new Error("Application record not found");
    }

    list[index].status = data.status;
    if (data.adminRemarks !== undefined) {
      list[index].adminRemarks = data.adminRemarks;
    }
    list[index].updatedAt = new Date().toISOString();

    writeLocalApplications(list);
    return { success: true, record: list[index] };
  });
