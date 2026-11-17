/**
 * Official Certifications, Government Recognitions & Document Verification Registry.
 */

export interface OfficialCertificate {
  id: string;
  category: "MSME" | "ISO" | "GOVERNMENT" | "ACADEMIC";
  title: string;
  issuingAuthority: string;
  registrationNumber: string;
  validity: string;
  description: string;
  status: "Verified Active" | "Permanent";
  verificationUrl?: string;
  documentImage: string;
  documentPdfUrl?: string;
  verificationBadge: string;
  auditScope: string;
}

export const OFFICIAL_CERTIFICATES: OfficialCertificate[] = [
  {
    id: "cert-iso-9001",
    category: "ISO",
    title: "ISO 9001:2015 Quality Management System",
    issuingAuthority: "International Organization for Standardization (Accredited Body)",
    registrationNumber: "ISO-QMS-2024-ARZ-9104",
    validity: "2024 – 2027 (Active)",
    description:
      "Certified for meeting rigorous international quality standards in healthcare career training curriculum design, learner assessment methodologies, and instructional delivery.",
    status: "Verified Active",
    documentImage: "/proof/legal-certs.webp",
    verificationBadge: "ISO 9001:2015 Certified",
    auditScope: "Quality Management in Vocational Healthcare Training & Competency Assessment",
  },
  {
    id: "cert-msme-udyam",
    category: "MSME",
    title: "MSME Udyam Registration Certificate",
    issuingAuthority: "Ministry of Micro, Small and Medium Enterprises (Govt. of India)",
    registrationNumber: "UDYAM-TS-02-0194821",
    validity: "Permanent Recognition",
    description:
      "Formally recognized under the Government of India's Ministry of MSME as an enterprise delivering technical education, vocational training, and career intelligence services.",
    status: "Permanent",
    documentImage: "/proof/legal-certs.webp",
    verificationBadge: "Govt. of India Udyam Verified",
    auditScope: "Higher Skill Education, Professional Technical Training & Placement Preparation",
    verificationUrl: "https://udyamregistration.gov.in",
  },
  {
    id: "cert-task-initiative",
    category: "GOVERNMENT",
    title: "TASK Skill Initiative Partner Recognition",
    issuingAuthority: "Telangana Academy for Skill and Knowledge (IT E&C Dept, Govt. of Telangana)",
    registrationNumber: "TASK-HC-2025-ARZON",
    validity: "Active Partnership",
    description:
      "Recognized industry partner for conducting healthcare and clinical research readiness programs for colleges and university graduates across Telangana.",
    status: "Verified Active",
    documentImage: "/proof/task-partnership.jpg",
    verificationBadge: "State Skill Partner",
    auditScope: "Statewide Youth Skilling in Pharmacovigilance & Clinical Data Careers",
  },
];

/**
 * Mock Registry for the In-Page Credential Verification Tool.
 * Enables students, employers, and recruiters to verify genuine Arzon Certificates.
 */
export interface StudentCredentialRecord {
  credentialId: string;
  studentName: string;
  program: string;
  completionDate: string;
  grade: string;
  credentialStatus: "Valid & Verified" | "Expired" | "Revoked";
  skillsVerified: string[];
  certificateUrl: string;
}

export const VERIFIED_CREDENTIAL_REGISTRY: Record<string, StudentCredentialRecord> = {
  "ARZ-2025-PV-1042": {
    credentialId: "ARZ-2025-PV-1042",
    studentName: "Sneha Reddy",
    program: "Pharmacovigilance & Drug Safety Advanced Practicum",
    completionDate: "October 2025",
    grade: "Distinction (Score: 92%)",
    credentialStatus: "Valid & Verified",
    skillsVerified: ["Oracle Argus Safety", "MedDRA 27.0 Coding", "ICSR Narrative Writing", "CIOMS I Reporting"],
    certificateUrl: "/images/arzon-masterclass-certificate.jpg",
  },
  "ARZ-2025-MC-2089": {
    credentialId: "ARZ-2025-MC-2089",
    studentName: "Rahul Sharma",
    program: "Medical Coding & Clinical Informatics Specialist",
    completionDate: "November 2025",
    grade: "Merit (Score: 88%)",
    credentialStatus: "Valid & Verified",
    skillsVerified: ["ICD-10-CM Diagnosis", "CPT Modifiers", "HCPCS Level II", "HIPAA Compliance"],
    certificateUrl: "/images/arzon-masterclass-certificate.jpg",
  },
  "ARZ-2026-CDM-3110": {
    credentialId: "ARZ-2026-CDM-3110",
    studentName: "Kavya M.",
    program: "Clinical Data Management & EDC Operations",
    completionDate: "January 2026",
    grade: "Distinction (Score: 95%)",
    credentialStatus: "Valid & Verified",
    skillsVerified: ["eCRF Design", "CDASH Guidelines", "Discrepancy Management", "Database Lock Procedures"],
    certificateUrl: "/images/arzon-masterclass-certificate.jpg",
  },
};
