import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { TIER_META, formatInr, type TierId } from "@/data/enrolmentTiers";
import { COURSES_BY_SLUG } from "@/data/courses";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  Check,
  ChevronDown,
  ChevronUp,
  Building2,
  MessageCircle,
  BookOpen,
  Briefcase,
  Crown,
  Shield,
  Star,
} from "lucide-react";
import { useState } from "react";
import { ResumeBanner } from "@/components/enrol/ResumeBanner";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { PremiumChip } from "@/components/ui/PremiumChip";
import { COUNSELLOR_PHONE } from "@/components/landing/constants";

export const Route = createFileRoute("/enrol/")({
  validateSearch: (search: Record<string, unknown>) =>
    z.object({ programme: z.string().trim().max(80).optional() }).parse(search),
  head: () => ({
    meta: [
      { title: "Select Workforce Readiness Tier · Arzon Global" },
      {
        name: "description",
        content:
          "Compare Essential, Career, and Elite workforce readiness tiers. Transparent pricing with zero hidden charges.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: EnrolIndex,
});

interface TierDetail {
  badge: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  icon: any;
  iconColor: string;
  targetAudience: string;
  cardBg: string;
  cardBorder: string;
  cardShadow: string;
  titleColor: string;
  audienceColor: string;
  feeLabelColor: string;
  priceColor: string;
  savingsBg: string;
  savingsText: string;
  priceBoxBg: string;
  priceBoxBorder: string;
  uniqueHookBg: string;
  uniqueHookBorder: string;
  uniqueHookText: string;
  deliverablesHeaderColor: string;
  itemTitleColor: string;
  itemDescColor: string;
  highlightedTitleColor: string;
  checkIconColor: string;
  btnBg: string;
  btnText: string;
  btnHover: string;
  btnShadow: string;
  uniqueHook: string;
  perksDetailed: { title: string; desc: string; highlighted?: boolean }[];
}

const TIER_DETAILS: Record<TierId, TierDetail> = {
  essential: {
    badge: "Self-Paced Core",
    badgeBg: "bg-stone-100",
    badgeText: "text-stone-800 font-bold",
    badgeBorder: "border-stone-200",
    icon: BookOpen,
    iconColor: "text-stone-600",
    targetAudience: "Ideal for: Independent self-starters & working pros needing flexible hours",
    cardBg: "bg-white",
    cardBorder: "border-stone-200 hover:border-stone-300",
    cardShadow: "shadow-xs hover:shadow-md",
    titleColor: "text-[#1A1A1A]",
    audienceColor: "text-stone-600",
    feeLabelColor: "text-stone-500",