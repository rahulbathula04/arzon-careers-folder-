import React, { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Play,
  CheckCircle2,
  Plus,
  Minus,
  ShieldCheck,
  FileText,
  Database,
  Award,
  Briefcase,
  Laptop,
  Users,
  FileCheck,
  BarChart3,
  X,
  BookOpen,
  Calendar,
  GraduationCap,
  ExternalLink,
  ChevronRight,
  Phone,
  Building2,
  Globe,
  Dna,
  Cpu,
  Layers,
  Terminal,
  Activity,
} from "lucide-react";
import { COUNSELLOR_PHONE, SITE, absUrl } from "@/components/landing/constants";
import { trackEvent } from "@/lib/analytics";

// ── Masterclass Direct Link ──────────────────────────────────────────────────
const BIOINFO_MASTERCLASS_URL =
  "https://drive.google.com/file/d/1MZVnxdlyC2JBMfFqjs5jt_8KLrLJ91tb/view?usp=sharing";

// ── WhatsApp URL Helper ───────────────────────────────────────────────────────
const waMsg = (text: string) =>
  `https://wa.me/${COUNSELLOR_PHONE}?text=${encodeURIComponent(text)}`;

// ── Route Definition & SEO Metadata ──────────────────────────────────────────
export const Route = createFileRoute("/bioinformatics-analyst")({
  head: () => {
    const title =
      "Bioinformatics & Clinical Genomics Analyst 12-Week Pathway | Arzon Global";
    const desc =
      "Build the practical skills to start your career in Bioinformatics & Clinical Genomics. Learn how diagnostic labs process NGS data, call genetic variants with GATK, and curate reports to ACMG/AMP guidelines.";
    const url = `${SITE.origin}/bioinformatics-analyst`;
    const og = absUrl("/images/bioinformatics-workstation.jpg");
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        {
          name: "keywords",
          content:
            "bioinformatics analyst, clinical genomics training, NGS pipeline course, GATK variant calling, ACMG variant interpretation, Linux for biologists, Biopython training, Nextflow pipeline, MedGenome jobs, clinical exome sequencing",
        },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:image", content: og },
        { property: "og:locale", content: "en_IN" },
        { property: "og:site_name", content: "Arzon Global" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
        { name: "twitter:image", content: og },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: "Bioinformatics & Clinical Genomics Analyst 12-Week Pathway",
            description: desc,
            provider: {
              "@type": "Organization",
              name: "Arzon Global",
              sameAs: SITE.origin,
            },
            timeRequired: "P12W",
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE.origin },
              { "@type": "ListItem", position: 2, name: "Programmes", item: absUrl("/courses") },
              {
                "@type": "ListItem",
                position: 3,
                name: "Bioinformatics Analyst",
                item: url,
              },
            ],
          }),
        },
      ],
    };
  },
  component: BioinformaticsBlueprintPage,
});

// ── Degree Options for Quick Callback ─────────────────────────────────────────
const DEGREES = [
  "B.Tech Biotechnology / Bioinformatics",
  "M.Sc Bioinformatics / Computational Biology",
  "B.Sc / M.Sc Life Sciences / Genetics / Biochemistry",
  "B.Pharm / M.Pharm (Pharmacy Graduates)",
  "B.Tech / M.Tech Computer Science / Data Science",
  "MBBS / Medical Graduate",
  "Other Healthcare / Science Degree",
];

const PASSING_YEARS = [
  "2026 (Final Year / Pursuing)",
  "2025 (Recent Graduate)",
  "2024",
  "2023 or earlier",
];

// ── Work Samples Data (Section 07 Tabs) ────────────────────────────────────────
const WORK_SAMPLES = [
  {
    id: "germline-wes",
    tabLabel: "Germline WES Curation Dossier",
    tag: "ACMG/AMP 2015 Standards",
    caseId: "ARZ-WES-2026-018",
    indication: "Suspected Hereditary Nonpolyposis Colorectal Cancer (Lynch Syndrome)",
    sampleSpec: "Whole Exome Sequencing · 114x Mean Target Coverage (Illumina NovaSeq)",
    targetGene: "MSH2 (NM_000251.3): c.942+3A>T",
    triageVerdict: "PATHOGENIC · Tier 1 High Penetrance",
    criteriaBreakdown: [
      { label: "Variant Nomenclature", value: "chr2:47630514 A>T · c.942+3A>T (Splice Donor Region)" },
      { label: "ACMG Criteria Applied", value: "PVS1 (Splice site disruption) + PM2 (Absent in gnomAD) + PP3 (In silico consensus)" },
      { label: "Population Frequency", value: "gnomAD v4.1 Allele Frequency: 0.00000 (0 / 1,614,142 alleles) [VALIDATED]" },
      { label: "IGV Read Inspection", value: "Clean split-read confirmation; balanced forward/reverse strand reads; no homopolymer error" },
    ],
  },
  {
    id: "somatic-panel",
    tabLabel: "Somatic Oncology Hotspot Record",
    tag: "AMP/ASCO/CAP Tier I Actionable",
    caseId: "ARZ-SOM-2026-042",
    indication: "Non-Small Cell Lung Carcinoma (NSCLC) · Biopsy Core",
    sampleSpec: "Targeted 500-Gene Solid Tumor NGS Panel · 780x Median Depth",
    targetGene: "EGFR (NM_005228.5): p.Leu858Arg (c.2573T>G)",
    triageVerdict: "TIER I · Strong Clinical Utility (FDA Approved Target)",
    criteriaBreakdown: [
      { label: "Variant Allele Frequency", value: "38.4% VAF (312 mutant reads out of 812 total depth)" },
      { label: "Clinical Significance", value: "Sensitizing mutation for 3rd-generation EGFR TKIs (Osimertinib)" },
      { label: "Resistance Markers", value: "Negative for EGFR p.T790M and MET amplification" },
      { label: "COSMIC ID & Database Match", value: "COSM6224 / ClinVar RCV000010178.14 [Confirmed Pathogenic]" },
    ],
  },
  {
    id: "rna-seq-matrix",
    tabLabel: "RNA-Seq Differential Expression Report",
    tag: "DESeq2 / Transcriptomics",
    caseId: "ARZ-RNA-2026-118",
    indication: "HER2+ Breast Cancer vs Matched Normal Adjacent Tissue",
    sampleSpec: "Paired-End 150bp Poly-A RNA Sequencing (3 Biological Replicates)",
    targetGene: "ERBB2 / ESR1 / MKI67 Expression Profile",
    triageVerdict: "Significantly Dysregulated (FDR Adjusted p < 0.001)",
    criteriaBreakdown: [
      {
        label: "ERBB2 Log2 Fold-Change",
        value: "+3.84 Log2FC (p-adjusted: 2.1e-14) · Confirms significant transcript amplification",
      },
      {
        label: "Pathway Enrichment",
        value: "KEGG ERBB signaling pathway (hsa04012) normalized enrichment score: 2.42 (p < 0.001)",
      },
      {
        label: "QC & Normalization",
        value: "STAR alignment rate: 94.2% · Median RIN: 8.8 · DESeq2 size-factor variance stabilized",
      },
    ],
  },
  {
    id: "nextflow-run",
    tabLabel: "Production Nextflow Pipeline Audit",
    tag: "nf-core/sarek (DSL2)",
    caseId: "ARZ-NF-2026-088",
    indication: "Automated Clinical Germline Variant Discovery Run",
    sampleSpec: "Containerized Docker Execution on Ubuntu Linux Cluster / AWS",
    targetGene: "Genome-wide WES Targets (GRCh38 Reference Genome)",
    triageVerdict: "PASS · 100% Tasks Verified (No Memory Faults)",
    criteriaBreakdown: [
      { label: "Input Reads Processed", value: "48,241,920 paired-end reads (Q30 Score: 93.8%)" },
      { label: "Alignment & Duplicate Rate", value: "BWA-MEM2 mapping rate: 99.4% · PCR duplicate rate: 6.8%" },
      { label: "GATK Variant Calling", value: "HaplotypeCaller generated 84,120 raw SNVs and 9,410 Indels" },
      { label: "Execution Time & Footprint", value: "Total runtime: 3h 42m · Max Memory: 32 GB RAM · Docker reproducible" },
    ],
  },
];

// ── FAQs Data (Section 10) ────────────────────────────────────────────────────
const BLUEPRINT_FAQS = [
  {
    q: "Who can join this program?",
    a: "Graduates and final-year students of Biotechnology (B.Tech / M.Tech / B.Sc / M.Sc), Bioinformatics, Life Sciences, Genetics, Biochemistry, Microbiology, and Pharmacy (B.Pharm / M.Pharm). Your biological understanding combined with our practical Linux and pipeline training creates an industry-ready profile.",
  },
  {
    q: "Do I need prior coding or Linux experience?",
    a: "No. The 12-week curriculum begins with foundational Linux CLI, shell scripting, and basic Python for biology. We teach coding through practical biological examples (parsing FASTA/FASTQ, computing GC content, manipulating genomic coordinate tables).",
  },
  {
    q: "Will I receive a job guarantee?",
    a: "No. Arzon maintains strict transparency: we do not offer deceptive 100% placement guarantees. We provide real case-based NGS training, reproducible GitHub portfolio deliverables, and technical interview preparation. Hiring decisions remain the sole discretion of employers.",
  },
  {
    q: "What tools and software will I master?",
    a: "You will master Linux / Bash, Python (Biopython, pandas), BWA-MEM, Samtools & Bcftools, GATK v4 HaplotypeCaller, Ensembl VEP, ANNOVAR, ClinVar, gnomAD, IGV (Integrative Genomics Viewer), and Nextflow workflow orchestration.",
  },
  {
    q: "How is this different from university bioinformatics courses?",
    a: "University courses often focus on obsolete algorithms or theoretical concepts. Arzon's program is reverse-engineered from actual clinical genomics job descriptions: executing production GATK pipelines, validating reads in IGV, applying 2015 ACMG/AMP clinical variant classification, and assembling reproducible GitHub portfolios.",
  },
  {
    q: "What kind of companies hire for these roles?",
    a: "Clinical sequencing labs, diagnostic hubs, biopharma GCCs, and research organizations including MedGenome, Strand Life Sciences, Mapmygenome, Eurofins Genomics, Persistent Systems, Indegene, Reliance Life Sciences, and Thermo Fisher Scientific.",
  },
  {
    q: "What is the duration and mode of study?",
    a: "The program is 12 weeks, conducted online through structured self-paced technical modules, weekend live mentor case clinics, and hands-on portfolio assignments with cloud compute guidance.",
  },
  {
    q: "How do I speak to a counsellor?",
    a: "Click 'Talk to a Career Counsellor' anywhere on this page to share your academic background. Our team will schedule a zero-pressure 15-minute diagnostic call to review your eligibility and answer questions.",
  },
];

// ── Main Component ───────────────────────────────────────────────────────────
function BioinformaticsBlueprintPage() {
  const [isCounsellorModalOpen, setIsCounsellorModalOpen] = useState(false);
  const [activeWorkSampleTab, setActiveWorkSampleTab] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Counsellor Form State
  const [counsellorForm, setCounsellorForm] = useState({
    name: "",
    phone: "",
    degree: DEGREES[0],
    year: PASSING_YEARS[0],
    question: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    trackEvent("bioinfo_page_view", {
      path: "/bioinformatics-analyst",
      source: "blueprint_alignment_v1",
    });
  }, []);

  const openCounsellor = (triggerSource = "direct") => {
    trackEvent("counsellor_modal_open", { source: triggerSource });
    setFormSubmitted(false);
    setIsCounsellorModalOpen(true);
  };

  const handleCounsellorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!counsellorForm.name.trim() || !counsellorForm.phone.trim()) return;

    setIsSubmitting(true);
    trackEvent("counsellor_form_submit", {
      degree: counsellorForm.degree,
      year: counsellorForm.year,
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      try {
        const text = `Hi Arzon Guidance Team! I would like to speak to a counsellor about the Bioinformatics & Clinical Genomics 12-Week Pathway:\nName: ${counsellorForm.name}\nPhone: ${counsellorForm.phone}\nDegree: ${counsellorForm.degree} (${counsellorForm.year})\nQuestion: ${counsellorForm.question || "Discussing eligibility and curriculum"}`;
        window.open(waMsg(text), "_blank");
      } catch {}
    }, 400);
  };

  const currentSample = WORK_SAMPLES[activeWorkSampleTab];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#081F38] font-sans antialiased selection:bg-[#2563EB] selection:text-white">
      {/* ── 01. HERO (ABOVE THE FOLD) ────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white tone-light card-light border-b border-slate-200/80 pt-10 pb-16 sm:pt-16 sm:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs font-mono text-[#64748B] mb-8"
          >
            <Link to="/" className="hover:text-[#081F38] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link to="/courses" className="hover:text-[#081F38] transition-colors">
              Programmes
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#081F38] font-bold">Bioinformatics Analyst</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E6F7F1] border border-[#10B981]/25 text-[#081F38] font-mono text-xs font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                BIOINFORMATICS &amp; GENOMICS · 12-WEEK PRACTICAL PROGRAM
              </span>

              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-[#081F38] leading-[1.12]">
                Build the Skills to Start Your Career in{" "}
                <span className="bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent [box-decoration-break:clone]">
                  Bioinformatics &amp; Genomics.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#64748B] font-normal leading-relaxed">
                Learn how diagnostic genomics labs process Next-Generation Sequencing (NGS) data, call genetic variants with GATK, and curate clinical molecular reports to ACMG/AMP guidelines. Develop practical skills through structured training, case-based exercises and reproducible pipeline workflows.
              </p>

              {/* Dual CTA Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => openCounsellor("hero_primary")}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm shadow-sm transition-all active:scale-[0.99] cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>Talk to a Career Counsellor</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={BIOINFO_MASTERCLASS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent("masterclass_click", { source: "hero_secondary" })
                  }
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white tone-light card-light border border-slate-200/80 hover:bg-[#F8FAFC] text-[#081F38] font-bold text-sm shadow-2xs transition-all active:scale-[0.99] cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current text-[#2563EB]" />
                  <span>Watch Free Masterclass</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#64748B]" />
                </a>
              </div>

              {/* 4 Feature Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-200/80 text-xs text-[#64748B]">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#2563EB] shrink-0" />
                  <span className="font-medium text-[#081F38] leading-tight">
                    Guided by Genomics Professionals
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#2563EB] shrink-0" />
                  <span className="font-medium text-[#081F38] leading-tight">
                    Practical NGS Case Exercises
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#2563EB] shrink-0" />
                  <span className="font-medium text-[#081F38] leading-tight">
                    Biotech &amp; Life Sciences Fit
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#10B981] shrink-0" />
                  <span className="font-medium text-[#081F38] leading-tight">
                    Transparent Guidance (No Guarantee)
                  </span>
                </div>
              </div>
            </div>

            {/* Right Workstation Visual Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 bg-white tone-light card-light shadow-xl">
                <img
                  src="/images/bioinformatics-thumbnail.png"
                  alt="Bioinformatics & Genomics Data Analysis Programme Thumbnail"
                  className="w-full h-80 sm:h-96 object-cover object-center"
                />

                {/* Floating Walkthrough Badge */}
                <a
                  href={BIOINFO_MASTERCLASS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 inset-x-4 p-3.5 rounded-2xl bg-white/95 tone-light card-light backdrop-blur-md border border-slate-200/90 shadow-lg flex items-center justify-between gap-3 transition-transform hover:scale-[1.01] cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#2563EB] flex items-center justify-center text-white shrink-0 shadow-xs">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                    <div className="text-left">
                      <strong className="text-xs font-bold text-[#081F38] block leading-tight">
                        See an NGS Case Walkthrough
                      </strong>
                      <span className="text-[11px] text-[#64748B] block leading-tight">
                        From raw FASTQ reads to ACMG report sign-off.
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#2563EB] shrink-0" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02. UNDERSTAND THE CAREER (WHAT IS BIOINFORMATICS?) ───────────────── */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Narrative */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#2563EB] shadow-2xs tone-light card-light">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                <span>02 · UNDERSTAND THE CAREER</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#081F38]">
                What is{" "}
                <span className="bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent [box-decoration-break:clone]">
                  Bioinformatics &amp; Genomics?
                </span>
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Bioinformatics bridges biological science with computational data analysis. Clinical genomics laboratories sequence DNA and RNA to uncover mutations, diagnose rare genetic disorders, profile tumor biologies, and tailor personalized therapies for patients.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => openCounsellor("section_02_explore")}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] transition-colors cursor-pointer"
                >
                  <span>Explore the Career Path</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right 6 Modular Icon Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {[
                {
                  icon: Terminal,
                  title: "Secondary NGS Processing",
                  desc: "Inspect FASTQ quality, perform reference mapping with BWA-MEM, and generate coordinate-sorted BAM files.",
                },
                {
                  icon: Cpu,
                  title: "GATK Variant Calling",
                  desc: "Execute GATK HaplotypeCaller with BQSR calibration to identify SNVs, Indels, and structural mutations.",
                },
                {
                  icon: Database,
                  title: "Annotation & Population Filters",
                  desc: "Cross-reference candidate variants against Ensembl VEP, ClinVar, gnomAD, and dbSNP database catalogues.",
                },
                {
                  icon: Dna,
                  title: "ACMG/AMP Clinical Classification",
                  desc: "Score variant pathogenicity using the 2015 5-tier framework (PVS1, PM2, PP3) for diagnostic sign-off.",
                },
                {
                  icon: Activity,
                  title: "Transcriptomics & RNA-Seq",
                  desc: "Quantify gene expression with STAR and DESeq2 to identify differentially expressed disease biomarkers.",
                },
                {
                  icon: Layers,
                  title: "Production Nextflow Pipelines",
                  desc: "Orchestrate reproducible pipelines with Nextflow DSL2 and Docker containerization for audit readiness.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white tone-light card-light border border-slate-200/80 shadow-2xs space-y-2 hover:border-[#BFDBFE] transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#EEF6FF] flex items-center justify-center text-[#2563EB]">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-[#081F38]">{item.title}</h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 03. CAREER OPPORTUNITIES (COMPARE PATHS) ──────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white tone-light card-light border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#2563EB] shadow-2xs tone-light card-light">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
              <span>03 · CAREER OPPORTUNITIES</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#081F38]">
              Where Do Clinical Genomics Graduates Work?
            </h2>
            <p className="text-sm sm:text-base text-[#64748B]">
              Bioinformatics and genomics skills open direct pathways into high-demand precision medicine diagnostic hubs and global healthcare GCCs across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {[
              {
                role: "Clinical Genomics Labs",
                companies: "MedGenome · Strand · Mapmygenome · Eurofins",
                focus: "Germline whole-exome sequencing, carrier screening, and rare Mendelian disease discovery.",
                salary: "₹4.8 – 7.5 LPA",
              },
              {
                role: "Somatic Oncology Profiling",
                companies: "Core Diagnostics · Neuberg · SciGenom",
                focus: "Solid tumor gene panels, liquid biopsies, and actionable targeted therapy matching (Tier I/II).",
                salary: "₹5.0 – 8.2 LPA",
              },
              {
                role: "Pharmacogenomics Units",
                companies: "Tata 1mg Genomics · Reliance Life Sciences",
                focus: "Drug-gene interaction analysis (CPIC guidelines) to optimize dosing and prevent ADRs.",
                salary: "₹4.5 – 7.0 LPA",
              },
              {
                role: "Global Bio-IT & GCCs",
                companies: "Persistent Systems · Indegene · Syngene · Illumina",
                focus: "Cloud genomic workflows, Nextflow pipeline engineering, and clinical trial molecular data curation.",
                salary: "₹5.5 – 9.5 LPA",
              },
            ].map((path, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 hover:bg-white hover:border-[#BFDBFE] hover:shadow-xs transition-all tone-light card-light flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EEF6FF] flex items-center justify-center text-[#2563EB]">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#081F38]">{path.role}</h3>
                  <div className="text-[11px] font-mono font-semibold text-[#2563EB]">
                    {path.companies}
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">{path.focus}</p>
                </div>
                <div className="pt-4 border-t border-slate-200/80 mt-4 flex items-center justify-between">
                  <span className="text-[11px] text-[#64748B]">Entry Compensation:</span>
                  <span className="text-xs font-bold text-[#081F38]">{path.salary}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04. SEE THE WORK (REAL CASE WORKFLOW) ─────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#2563EB] shadow-2xs tone-light card-light">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
              <span>04 · SEE THE WORK</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#081F38]">
              The 5-Stage Clinical NGS Analysis Workflow
            </h2>
            <p className="text-sm sm:text-base text-[#64748B]">
              Every module in the 12-week curriculum is anchored directly in the end-to-end clinical genomic workflow used by accredited diagnostic sequencing facilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5 text-left">
            {[
              {
                step: "01",
                title: "FASTQ Intake & QC",
                tag: "FastQC / MultiQC",
                desc: "Assess base quality scores (Q30 > 90%), adapter content, and sequence duplication before alignment.",
              },
              {
                step: "02",
                title: "Read Alignment",
                tag: "BWA-MEM / Samtools",
                desc: "Align reads against GRCh38 human reference; sort, index, and mark PCR duplicates with Picard tools.",
              },
              {
                step: "03",
                title: "Variant Discovery",
                tag: "GATK HaplotypeCaller",
                desc: "Apply Base Quality Score Recalibration (BQSR) and discover germline SNVs, Indels, and copy number shifts.",
              },
              {
                step: "04",
                title: "Tertiary Annotation",
                tag: "Ensembl VEP / gnomAD",
                desc: "Filter candidate mutations by minor allele frequency (< 0.01) and query ClinVar and OMIM records.",
              },
              {
                step: "05",
                title: "ACMG Sign-Off",
                tag: "IGV / Clinical Dossier",
                desc: "Visually verify alignments in IGV, assign 5-tier ACMG scores, and draft the final diagnostic report.",
              },
            ].map((stage, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white tone-light card-light border border-slate-200/80 shadow-2xs space-y-2.5 relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-[#2563EB] bg-[#EEF6FF] px-2 py-0.5 rounded-md">
                      STAGE {stage.step}
                    </span>
                    <span className="text-[10px] font-mono text-[#64748B]">{stage.tag}</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#081F38]">{stage.title}</h3>
                  <p className="text-xs text-[#64748B] leading-relaxed mt-1">{stage.desc}</p>
                </div>
                <div className="pt-2">
                  <div className="h-1 w-full bg-[#EEF6FF] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#2563EB] rounded-full"
                      style={{ width: `${(idx + 1) * 20}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 05. SKILLS EMPLOYERS LOOK FOR (INDUSTRY INSIGHTS) ─────────────────── */}
      <section className="py-16 sm:py-24 bg-white tone-light card-light border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4 text-left">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#2563EB] shadow-2xs tone-light card-light">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                <span>05 · SKILLS IN DEMAND</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#081F38]">
                Reverse-Engineered From 150+ Verified JDs
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Recruiters screening freshers for Bioinformatics Analyst and Clinical Genomics positions look for demonstrable proof of tool execution, not generic theory.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => openCounsellor("section_05_skills")}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
                >
                  <span>Request Full JD Skill Breakdown</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {[
                {
                  skill: "Linux & Shell Scripting",
                  pct: "94% of JDs require",
                  details: "Bash automation, file pipes, awk/sed parsing of biological text streams.",
                },
                {
                  skill: "Python for Biology",
                  pct: "88% of JDs require",
                  details: "Biopython SeqIO parsing, pandas tabular transformations, REST API queries.",
                },
                {
                  skill: "GATK Best Practices",
                  pct: "86% of JDs require",
                  details: "End-to-end secondary pipeline execution: FASTQ to calibrated VCF files.",
                },
                {
                  skill: "ACMG/AMP Variant Curation",
                  pct: "82% of JDs require",
                  details: "5-tier clinical interpretation using ClinVar, gnomAD, and in silico predictors.",
                },
                {
                  skill: "IGV Read Visualization",
                  pct: "78% of JDs require",
                  details: "Inspection of split reads, mapping quality, homopolymers, and strand biases.",
                },
                {
                  skill: "Nextflow Workflows",
                  pct: "74% of JDs require",
                  details: "Reproducible pipeline orchestration, nf-core standards, and Docker containers.",
                },
              ].map((s, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200/80 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#081F38]">{s.skill}</span>
                    <span className="text-[10px] font-mono font-bold text-[#10B981] bg-[#E6F7F1] px-2 py-0.5 rounded-md">
                      {s.pct}
                    </span>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">{s.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 06. THE 12-WEEK LEARNING PATHWAY ─────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#2563EB] shadow-2xs tone-light card-light">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
              <span>06 · STRUCTURED CURRICULUM</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#081F38]">
              The 12-Week Role Readiness Pathway
            </h2>
            <p className="text-sm sm:text-base text-[#64748B]">
              Organized into 6 sequential two-week modules, each producing an audit-ready technical deliverable for your interview portfolio.
            </p>
          </div>

          <div className="space-y-4 text-left">
            {[
              {
                weeks: "WEEKS 01–02",
                title: "Linux Foundations, Shell Automation & Python for Biology",
                hours: "24 Hours",
                topics: [
                  "Unix shell commands, filesystem navigation, pipes and I/O redirection",
                  "Automated biological text processing with grep, awk, and sed",
                  "Python 3 core, Biopython SeqIO, and FASTA/FASTQ sequence parsing",
                  "Tabular data wrangling with pandas & version control using Git",
                ],
                deliverable: "Automated sequence QC inspection script & Git repository portfolio",
                jdSkill: "Linux + Python scripting fluency required by 92% of genomics JDs",
              },
              {
                weeks: "WEEKS 03–04",
                title: "Biological Databases, Sequence Alignment & BLAST Homology",
                hours: "24 Hours",
                topics: [
                  "NCBI, Ensembl, UniProt, and UCSC Genome Browser APIs and accessions",
                  "Pairwise and multiple sequence alignment (Clustal Omega, MUSCLE)",
                  "Local BLAST+ database configuration, query optimization, and E-value interpretation",
                  "Evolutionary conservation scoring (phyloP, phastCons) and active site mapping",
                ],
                deliverable: "Comparative ortholog alignment and sequence conservation dossier",
                jdSkill: "Biological database navigation & sequence homology screening",
              },
              {
                weeks: "WEEKS 05–06",
                title: "NGS Secondary Analysis Pipeline (FASTQ → BAM → VCF)",
                hours: "28 Hours",
                topics: [
                  "Illumina paired-end sequencing mechanics & FastQC/MultiQC metric evaluation",
                  "Human reference indexing (GRCh38/hg38) & alignment with BWA-MEM",
                  "BAM sorting, indexing, duplicate marking via Picard & Samtools",
                  "GATK v4 HaplotypeCaller execution & Base Quality Score Recalibration (BQSR)",
                ],
                deliverable: "End-to-end germline analysis on sample whole-exome sequencing (WES) dataset",
                jdSkill: "GATK Best Practices pipeline execution and troubleshooting",
              },
              {
                weeks: "WEEKS 07–08",
                title: "Variant Annotation, Filtering & IGV Read-Level Visualization",
                hours: "28 Hours",
                topics: [
                  "VCF format dissection: genotype quality (GQ), read depth (DP), and allele frequency (AF)",
                  "Functional consequence annotation via Ensembl VEP and ANNOVAR",
                  "Population frequency filtering using gnomAD v4 and 1000 Genomes",
                  "Integrative Genomics Viewer (IGV) inspection: validating true variants vs artifacts",
                ],
                deliverable: "50-variant filtered and annotated spreadsheet with IGV inspection snapshots",
                jdSkill: "Variant annotation and IGV read-level verification",
              },
              {
                weeks: "WEEKS 09–10",
                title: "Clinical Variant Interpretation (ACMG/AMP 5-Tier Guidelines)",
                hours: "26 Hours",
                topics: [
                  "ACMG/AMP 2015 5-tier classification: Pathogenic, Likely Pathogenic, VUS, Likely Benign, Benign",
                  "Scoring rules: Null variants (PVS1), hot-spot codons (PM1), population data (PM2/BA1)",
                  "In silico predictors (REVEL, CADD, AlphaMissense) & ClinVar concordance",
                  "Somatic oncology variant categorization (AMP/ASCO/CAP Tier I–IV standards)",
                ],
                deliverable: "Clinical Molecular Genetics Case Report for hereditary oncology & cardiology panels",
                jdSkill: "ACMG/AMP variant classification and clinical report synthesis",
              },
              {
                weeks: "WEEKS 11–12",
                title: "Transcriptomics (RNA-Seq), Nextflow Workflows & Capstone Viva",
                hours: "30 Hours",
                topics: [
                  "RNA-seq quantification (STAR aligner, Salmon) & differential expression (DESeq2)",
                  "Pathway enrichment analysis using Gene Ontology (GO) and KEGG",
                  "Introduction to Nextflow DSL2, nf-core architectures & Docker containerization",
                  "Mock technical interview, GitHub portfolio review & technical viva",
                ],
                deliverable: "Capstone Nextflow pipeline GitHub repository + Published Clinical Dossier",
                jdSkill: "Production, reproducible bioinformatics workflows & interview readiness",
              },
            ].map((module, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white tone-light card-light border border-slate-200/80 shadow-2xs space-y-4 hover:border-[#BFDBFE] transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-200/80 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#2563EB] bg-[#EEF6FF] px-2.5 py-1 rounded-md">
                      {module.weeks}
                    </span>
                    <h3 className="text-base font-bold text-[#081F38]">{module.title}</h3>
                  </div>
                  <span className="text-xs font-mono text-[#64748B]">{module.hours}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#64748B]">
                      {module.topics.map((t, tIdx) => (
                        <div key={tIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                          <span>{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-4 p-3.5 rounded-xl bg-[#F8FAFC] border border-slate-200/80 space-y-1 text-xs">
                    <div className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#2563EB]">
                      STUDENT DELIVERABLE
                    </div>
                    <div className="font-semibold text-[#081F38] leading-tight">
                      {module.deliverable}
                    </div>
                    <div className="text-[11px] text-[#64748B] pt-1">
                      <span className="font-medium text-[#081F38]">JD Skill:</span> {module.jdSkill}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 07. WORK SAMPLES (REAL OUTPUT & EVIDENCE) ─────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white tone-light card-light border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#2563EB] shadow-2xs tone-light card-light">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
              <span>07 · PROOF OF WORK</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#081F38]">
              Audit-Ready Clinical Deliverables
            </h2>
            <p className="text-sm sm:text-base text-[#64748B]">
              Every graduate leaves with an authenticated portfolio containing real clinical work samples, demonstrating to employers that you can evaluate genomic data accurately.
            </p>
          </div>

          {/* Interactive Tabs */}
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2 border-b border-slate-200/80 pb-3">
              {WORK_SAMPLES.map((sample, idx) => (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => setActiveWorkSampleTab(idx)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeWorkSampleTab === idx
                      ? "bg-[#2563EB] text-white shadow-xs"
                      : "bg-[#F8FAFC] text-[#64748B] hover:text-[#081F38] hover:bg-[#EEF6FF]"
                  }`}
                >
                  {sample.tabLabel}
                </button>
              ))}
            </div>

            {/* Active Sample Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200/80 space-y-6 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 pb-6">
                <div>
                  <span className="text-xs font-mono font-bold text-[#2563EB] bg-[#EEF6FF] px-2.5 py-1 rounded-md">
                    {currentSample.tag}
                  </span>
                  <h3 className="text-xl font-bold text-[#081F38] mt-2">
                    {currentSample.caseId} · {currentSample.targetGene}
                  </h3>
                  <div className="text-xs text-[#64748B] mt-1">
                    Indication: <span className="font-medium text-[#081F38]">{currentSample.indication}</span>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-[11px] font-mono text-[#64748B]">CLINICAL VERDICT</div>
                  <div className="text-sm font-bold text-[#10B981] bg-[#E6F7F1] px-3 py-1 rounded-lg inline-block mt-1">
                    {currentSample.triageVerdict}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentSample.criteriaBreakdown.map((crit, cIdx) => (
                  <div
                    key={cIdx}
                    className="p-4 rounded-xl bg-white tone-light card-light border border-slate-200/80 space-y-1"
                  >
                    <div className="text-[11px] font-mono font-bold text-[#64748B] uppercase">
                      {crit.label}
                    </div>
                    <div className="text-xs text-[#081F38] font-medium leading-relaxed">
                      {crit.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                  <span>Sample Specification: {currentSample.sampleSpec}</span>
                </div>
                <button
                  type="button"
                  onClick={() => openCounsellor(`sample_${currentSample.id}`)}
                  className="text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Request Full Dossier Template</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 08. MENTOR AND MASTERCLASS (LEARN FROM EXPERTS) ───────────────────── */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4 text-left">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#2563EB] shadow-2xs tone-light card-light">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                <span>08 · INDUSTRY MENTORSHIP</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#081F38]">
                Mentored by Experienced Genomics Scientists
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Learn directly from senior bioinformaticians and molecular geneticists who have processed thousands of clinical exomes, oncology panels, and rare disease cases at accredited genomics diagnostic centers.
              </p>
              <div className="pt-2">
                <a
                  href={BIOINFO_MASTERCLASS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white tone-light card-light border border-slate-200/80 hover:bg-[#F8FAFC] text-[#081F38] font-bold text-xs shadow-2xs transition-all cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current text-[#2563EB]" />
                  <span>Access Recorded Case Walkthrough</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#64748B]" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="p-6 sm:p-8 rounded-3xl bg-white tone-light card-light border border-slate-200/80 shadow-sm space-y-6 text-left">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] flex items-center justify-center text-white text-2xl font-bold shadow-md">
                    <Dna className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#081F38]">
                      Clinical Genomics Advisory Faculty
                    </h3>
                    <div className="text-xs text-[#2563EB] font-mono font-semibold">
                      Senior Bioinformatics Specialists &amp; Variant Curators
                    </div>
                    <div className="text-xs text-[#64748B] mt-0.5">
                      Leading clinical NGS labs &amp; global precision oncology teams
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-center">
                  <div className="p-3 rounded-xl bg-[#F8FAFC] border border-slate-200/80">
                    <div className="text-lg font-bold text-[#081F38]">150+</div>
                    <div className="text-[11px] text-[#64748B]">JDs Benchmarked</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F8FAFC] border border-slate-200/80">
                    <div className="text-lg font-bold text-[#081F38]">100%</div>
                    <div className="text-[11px] text-[#64748B]">Practical Pipelines</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F8FAFC] border border-slate-200/80">
                    <div className="text-lg font-bold text-[#081F38]">12 Weeks</div>
                    <div className="text-[11px] text-[#64748B]">Cohort Duration</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 09. CAREER GUIDANCE & NEXT STEPS ─────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white tone-light card-light border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#2563EB] shadow-2xs tone-light card-light">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
              <span>09 · CAREER GUIDANCE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#081F38]">
              How Arzon Prepares You for Real Recruiter Interviews
            </h2>
            <p className="text-sm sm:text-base text-[#64748B]">
              We go beyond video lessons: your preparation culminates in a GitHub pipeline portfolio and rigorous technical viva drills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#EEF6FF] flex items-center justify-center text-[#2563EB]">
                <Laptop className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#081F38]">GitHub Pipeline Portfolio</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Recruiters test your command-line fluency. You will publish reproducible Nextflow workflows and clean Python code with documented READMEs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#EEF6FF] flex items-center justify-center text-[#2563EB]">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#081F38]">ACMG Molecular Case Dossier</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Walk into technical interviews with a binder of validated clinical case interpretations demonstrating your exact scoring methodology.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#EEF6FF] flex items-center justify-center text-[#2563EB]">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#081F38]">Mock Technical Viva Drills</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Practice answering complex recruiter screening questions: explaining Ti/Tv ratios, strand biases in IGV, and VUS reclassification rationales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. FREQUENTLY ASKED QUESTIONS ────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#2563EB] shadow-2xs tone-light card-light">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
              <span>10 · FAQS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#081F38]">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-[#64748B]">
              Clear answers to the most common questions from students and graduates.
            </p>
          </div>

          <div className="space-y-3">
            {BLUEPRINT_FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white tone-light card-light border border-slate-200/80 overflow-hidden shadow-2xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#081F38] cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {openFaqIndex === idx ? (
                    <Minus className="w-4 h-4 text-[#2563EB] shrink-0" />
                  ) : (
                    <Plus className="w-4 h-4 text-[#64748B] shrink-0" />
                  )}
                </button>
                {openFaqIndex === idx && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#64748B] leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. INSTITUTIONAL & REGULATORY TRANSPARENCY NOTICE ─────────────────── */}
      <section className="py-12 bg-white tone-light card-light border-b border-slate-200/80 text-left">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 text-xs text-[#64748B] space-y-2">
            <div className="font-bold text-[#081F38] uppercase tracking-wider font-mono text-[11px] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              <span>INSTITUTIONAL QUALITY &amp; RECRUITER COMPLIANCE NOTICE</span>
            </div>
            <p className="leading-relaxed">
              Arzon Global does not guarantee job placements. We provide practical role-based education, portfolio deliverables, and technical interview preparation. All curriculum modules adhere strictly to ACMG/AMP 2015 Standards and Guidelines for the Interpretation of Sequence Variants, CAP/CLIA NGS validation standards, and GA4GH genomic exchange frameworks.
            </p>
          </div>
        </div>
      </section>

      {/* ── MOBILE STICKY ACTION DOCK ────────────────────────────────────────── */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 bg-white/95 tone-light card-light backdrop-blur-md border-t border-slate-200/90 p-3 z-40 flex items-center gap-2 shadow-lg">
        <button
          type="button"
          onClick={() => openCounsellor("mobile_dock")}
          className="flex-1 py-3 px-4 rounded-full bg-[#2563EB] text-white font-bold text-xs shadow-xs text-center cursor-pointer"
        >
          Talk to a Counsellor
        </button>
        <a
          href={waMsg("Hi Arzon! I want to enquire about the Bioinformatics Analyst program.")}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 shrink-0"
          aria-label="Chat on WhatsApp"
        >
          <Phone className="w-4 h-4" />
        </a>
      </div>

      {/* ── QUALIFIED COUNSELLOR CALLBACK MODAL ───────────────────────────────── */}
      {isCounsellorModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="bg-white tone-light card-light rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 text-left shadow-2xl relative border border-slate-200/90 my-8">
            <button
              type="button"
              onClick={() => setIsCounsellorModalOpen(false)}
              className="absolute top-5 right-5 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {formSubmitted ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 bg-[#E6F7F1] text-[#10B981] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#081F38]">Request Received!</h3>
                <p className="text-xs sm:text-sm text-[#64748B] max-w-sm mx-auto">
                  Thank you, <span className="font-bold text-[#081F38]">{counsellorForm.name}</span>. An Arzon Career Advisor will reach out via WhatsApp/phone within 24 hours.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCounsellorModalOpen(false)}
                    className="px-6 py-2.5 rounded-full bg-[#2563EB] text-white text-xs font-bold shadow-xs cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleCounsellorSubmit} className="space-y-4">
                <div>
                  <div className="text-[10px] font-mono font-bold text-[#2563EB] uppercase tracking-wider">
                    DIRECT ADMISSIONS &amp; ELIGIBILITY
                  </div>
                  <h3 className="text-xl font-bold text-[#081F38] mt-1">
                    Talk to a Career Counsellor
                  </h3>
                  <p className="text-xs text-[#64748B] mt-1">
                    Evaluate your degree and background against current clinical genomics hiring criteria.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-[#081F38] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Ayesha Khan / R. Sharma"
                      value={counsellorForm.name}
                      onChange={(e) =>
                        setCounsellorForm({ ...counsellorForm, name: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200/90 text-xs text-[#081F38] focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#081F38] mb-1">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={counsellorForm.phone}
                      onChange={(e) =>
                        setCounsellorForm({ ...counsellorForm, phone: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200/90 text-xs text-[#081F38] focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#081F38] mb-1">
                        Degree / Specialization
                      </label>
                      <select
                        value={counsellorForm.degree}
                        onChange={(e) =>
                          setCounsellorForm({ ...counsellorForm, degree: e.target.value })
                        }
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200/90 text-xs text-[#081F38] focus:outline-none focus:border-[#2563EB] bg-white tone-light card-light"
                      >
                        {DEGREES.map((d, dIdx) => (
                          <option key={dIdx} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#081F38] mb-1">
                        Passing Year
                      </label>
                      <select
                        value={counsellorForm.year}
                        onChange={(e) =>
                          setCounsellorForm({ ...counsellorForm, year: e.target.value })
                        }
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200/90 text-xs text-[#081F38] focus:outline-none focus:border-[#2563EB] bg-white tone-light card-light"
                      >
                        {PASSING_YEARS.map((y, yIdx) => (
                          <option key={yIdx} value={y}>
                            {y}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#081F38] mb-1">
                      Specific Question or Career Goal (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Can I transition from B.Tech Biotech into NGS data analysis?"
                      value={counsellorForm.question}
                      onChange={(e) =>
                        setCounsellorForm({ ...counsellorForm, question: e.target.value })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200/90 text-xs text-[#081F38] focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <span>Request Free 15-Min Diagnostic Call</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[10px] text-center text-[#64748B] mt-2">
                    Zero spam guarantee. Directly routed to an Arzon Career Advisor.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
