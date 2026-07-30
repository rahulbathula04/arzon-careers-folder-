import * as React from "react";
import {
  Body,
  Button,
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
import { COUNSELLOR_PHONE } from "@/components/landing/constants";

interface Props {
  name?: string;
  tierLabel?: string;
  resumeUrl?: string;
  whatsappUrl?: string;
  finalPriceLabel?: string;
  cohortLabel?: string;
}

const EnrolmentRecoveryEmail = (props: Props) => {
  const {
    name,
    tierLabel = "your Arzon Global cohort",
    resumeUrl = "https://arzoncareers.in/enrol",
    whatsappUrl = `https://wa.me/${COUNSELLOR_PHONE}`,
    finalPriceLabel,
    cohortLabel,
  } = props;

  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Your seat in {tierLabel} is still being held - finish in 2 minutes</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>
            {name ? `${name}, your seat is still here.` : "Your seat is still here."}
          </Heading>
          <Text style={text}>
            You started enrolling in <strong>{tierLabel}</strong>
            {cohortLabel ? ` for the ${cohortLabel} cohort` : ""} but didn&apos;t complete payment.
            We&apos;ve held your spot for now - you can pick up right where you left off.
          </Text>

          {finalPriceLabel && (
            <Section style={priceBox}>
              <Text style={priceLabel}>Your locked-in price</Text>
              <Text style={priceValue}>{finalPriceLabel}</Text>
            </Section>
          )}

          <Section style={{ textAlign: "center", margin: "28px 0 8px" }}>
            <Button href={resumeUrl} style={primaryBtn}>
              Resume enrolment →
            </Button>
          </Section>

          <Text style={smallMuted}>
            Prefer WhatsApp?{" "}
            <a href={whatsappUrl} style={link}>
              Message us here
            </a>{" "}
            and a counsellor will help you finish in under 2 minutes.
          </Text>

          <Hr style={hr} />

          <Text style={footer}>
            Cohort seats are limited and re-allocated to the waitlist after 24 hours of inactivity.
            If you&apos;ve changed your mind, you can safely ignore this email - we won&apos;t send
            another reminder.
          </Text>
          <Text style={footer}>- The Arzon Global team</Text>
        </Container>
      </Body>
    </Html>
  );
};

export const template = {
  component: EnrolmentRecoveryEmail,
  subject: (data: Record<string, any>) =>
    data?.name
      ? `${data.name}, your Arzon Global seat is still held`
      : "Your Arzon Global seat is still held",
  displayName: "Enrolment recovery (abandoned cart)",
  previewData: {
    name: "Priya",
    tierLabel: "Career Track - Pharmacovigilance",
    finalPriceLabel: "₹14,999",
    cohortLabel: "August 2026",
    resumeUrl: "https://arzoncareers.in/enrol/career/pay?intent=demo",
    whatsappUrl: `https://wa.me/${COUNSELLOR_PHONE}`,
  },
} satisfies TemplateEntry;

const main = { backgroundColor: "#ffffff", fontFamily: "Inter, Arial, sans-serif" };
const container = { maxWidth: "560px", margin: "0 auto", padding: "32px 24px" };
const h1 = {
  fontSize: "22px",
  fontWeight: 700,
  color: "#0A0F1E",
  margin: "0 0 16px",
  lineHeight: 1.3,
};
const text = {
  fontSize: "15px",
  color: "#374151",
  lineHeight: 1.6,
  margin: "0 0 18px",
};
const priceBox = {
  backgroundColor: "#EFF6FF",
  border: "1px solid #BFDBFE",
  borderRadius: "12px",
  padding: "16px 18px",
  margin: "20px 0",
  textAlign: "center" as const,
};
const priceLabel = {
  fontSize: "11px",
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  color: "#1E40AF",
  margin: "0 0 4px",
  fontWeight: 600,
};
const priceValue = {
  fontSize: "24px",
  fontWeight: 700,
  color: "#0F172A",
  margin: 0,
};
const primaryBtn = {
  backgroundColor: "#1E4D8C",
  color: "#ffffff",
  padding: "14px 28px",
  borderRadius: "10px",
  fontSize: "15px",
  fontWeight: 600,
  textDecoration: "none",
  display: "inline-block",
};
const smallMuted = {
  fontSize: "13px",
  color: "#6B7280",
  textAlign: "center" as const,
  margin: "12px 0 0",
};
const link = { color: "#1E4D8C", textDecoration: "underline" };
const hr = { borderColor: "#E5E7EB", margin: "28px 0 18px" };
const footer = { fontSize: "12px", color: "#9CA3AF", margin: "0 0 6px", lineHeight: 1.5 };
