import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { TemplateEntry } from "./registry";

interface Props {
  name?: string;
  email?: string;
  phone?: string;
  whatsappOptin?: boolean;
  archetypeName?: string;
  archetypeTagline?: string;
  archetypeEmoji?: string;
  fitScore?: number;
  topPaths?: Array<{ name?: string; fit?: number } | string>;
  ranking?: Array<{ id: string; fit: number }>;
  notFit?: { id?: string; fit?: number };
  confidence?: number;
  confidenceBand?: string;
  microAccuracy?: number;
  risks?: string[];
  notFitReasons?: string[];
  breakdown?: Record<string, any>;
  traitScores?: Record<string, number>;
  evidence?: any;
  resultMeta?: any;
  cohortId?: string;
  leadId?: string;
  sessionId?: string;
  submittedAt?: string;
}

const CareerEngineResultEmail = (props: Props) => {
  const {
    name,
    email,
    phone,
    whatsappOptin,
    archetypeName,
    archetypeTagline,
    archetypeEmoji,
    fitScore,
    topPaths,
    ranking,
    notFit,
    confidence,
    confidenceBand,
    microAccuracy,
    risks,
    notFitReasons,
    traitScores,
    cohortId,
    leadId,
    sessionId,
    submittedAt,
  } = props;

  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>
        New Career Engine result{name ? ` from ${name}` : ""}
        {archetypeName ? ` — ${archetypeName}` : ""}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Career Engine Result</Heading>
          <Text style={subtle}>
            Submitted {submittedAt ? new Date(submittedAt).toLocaleString() : "just now"}
          </Text>

          <Section style={card}>
            <Heading style={h2}>Candidate</Heading>
            <Text style={kv}>
              <b>Name:</b> {name || "—"}
            </Text>
            <Text style={kv}>
              <b>Email:</b> {email || "—"}
            </Text>
            <Text style={kv}>
              <b>Phone:</b> {phone || "—"}
            </Text>
            <Text style={kv}>
              <b>WhatsApp opt-in:</b> {whatsappOptin ? "Yes" : "No"}
            </Text>
            {cohortId ? (
              <Text style={kv}>
                <b>Cohort:</b> {cohortId}
              </Text>
            ) : null}
          </Section>

          <Section style={card}>
            <Heading style={h2}>Archetype</Heading>
            <Text style={kv}>
              <b>
                {archetypeEmoji ? `${archetypeEmoji} ` : ""}
                {archetypeName || "—"}
              </b>
            </Text>
            {archetypeTagline ? <Text style={text}>{archetypeTagline}</Text> : null}
            {typeof fitScore === "number" ? (
              <Text style={kv}>
                <b>Fit Score:</b> {fitScore}
              </Text>
            ) : null}
            {typeof confidence === "number" ? (
              <Text style={kv}>
                <b>Confidence:</b> {confidence}
                {confidenceBand ? ` (${confidenceBand})` : ""}
              </Text>
            ) : null}
            {typeof microAccuracy === "number" ? (
              <Text style={kv}>
                <b>Micro accuracy:</b> {microAccuracy}
              </Text>
            ) : null}
          </Section>

          {topPaths?.length ? (
            <Section style={card}>
              <Heading style={h2}>Top Paths</Heading>
              {topPaths.map((p, i) => (
                <Text key={i} style={kv}>
                  {typeof p === "string"
                    ? `• ${p}`
                    : `• ${p?.name || ""}${typeof p?.fit === "number" ? ` — fit ${p.fit}` : ""}`}
                </Text>
              ))}
            </Section>
          ) : null}

          {ranking?.length ? (
            <Section style={card}>
              <Heading style={h2}>Full Ranking</Heading>
              {ranking.map((r, i) => (
                <Text key={i} style={kv}>
                  {i + 1}. {r.id} — fit {r.fit}
                </Text>
              ))}
              {notFit?.id ? (
                <Text style={kv}>
                  <b>Not fit:</b> {notFit.id}
                  {typeof notFit.fit === "number" ? ` — fit ${notFit.fit}` : ""}
                </Text>
              ) : null}
            </Section>
          ) : null}

          {traitScores && Object.keys(traitScores).length ? (
            <Section style={card}>
              <Heading style={h2}>Trait Scores</Heading>
              {Object.entries(traitScores).map(([k, v]) => (
                <Text key={k} style={kv}>
                  <b>{k}:</b> {String(v)}
                </Text>
              ))}
            </Section>
          ) : null}

          {risks?.length ? (
            <Section style={card}>
              <Heading style={h2}>Risks</Heading>
              {risks.map((r, i) => (
                <Text key={i} style={kv}>
                  • {r}
                </Text>
              ))}
            </Section>
          ) : null}

          {notFitReasons?.length ? (
            <Section style={card}>
              <Heading style={h2}>Not-Fit Reasons</Heading>
              {notFitReasons.map((r, i) => (
                <Text key={i} style={kv}>
                  • {r}
                </Text>
              ))}
            </Section>
          ) : null}

          <Hr style={hr} />
          <Text style={footer}>
            Lead ID: {leadId || "—"}
            <br />
            Session ID: {sessionId || "—"}
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export const template = {
  component: CareerEngineResultEmail,
  subject: (data: Record<string, any>) =>
    `Career Engine: ${data?.name || "New result"}${data?.archetypeName ? ` — ${data.archetypeName}` : ""}`,
  displayName: "Career Engine result (admin notification)",
  previewData: {
    name: "Sample Candidate",
    email: "candidate@example.com",
    phone: "9999999999",
    whatsappOptin: true,
    archetypeName: "The Analyst",
    archetypeTagline: "Loves structured problem solving",
    archetypeEmoji: "🧠",
    fitScore: 87,
    confidence: 0.82,
    confidenceBand: "High",
    microAccuracy: 0.91,
    topPaths: [
      { name: "Data Analyst", fit: 87 },
      { name: "Product Analyst", fit: 81 },
    ],
    ranking: [
      { id: "analyst", fit: 87 },
      { id: "pm", fit: 74 },
    ],
    notFit: { id: "sales", fit: 21 },
    risks: ["Limited public-speaking exposure"],
    notFitReasons: ["Low energy for outbound roles"],
    traitScores: { logic: 9, empathy: 6, drive: 8 },
    cohortId: "aug-2026",
    leadId: "lead_demo",
    sessionId: "sess_demo",
    submittedAt: new Date().toISOString(),
  },
} satisfies TemplateEntry;

const main = { backgroundColor: "#ffffff", fontFamily: "Arial, sans-serif" };
const container = { padding: "24px", maxWidth: "640px", margin: "0 auto" };
const card = {
  backgroundColor: "#f8fafc",
  border: "1px solid #e2e8f0",
  borderRadius: "8px",
  padding: "16px 20px",
  margin: "0 0 16px",
};
const h1 = { fontSize: "22px", fontWeight: 700, color: "#0f172a", margin: "0 0 4px" };
const h2 = { fontSize: "16px", fontWeight: 700, color: "#0f172a", margin: "0 0 8px" };
const text = { fontSize: "14px", color: "#334155", lineHeight: "1.5", margin: "0 0 8px" };
const kv = { fontSize: "14px", color: "#334155", lineHeight: "1.5", margin: "0 0 4px" };
const subtle = { fontSize: "12px", color: "#64748b", margin: "0 0 16px" };
const hr = { border: "none", borderTop: "1px solid #e2e8f0", margin: "20px 0" };
const footer = { fontSize: "11px", color: "#94a3b8", margin: "0" };
