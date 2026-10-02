import fs from 'fs';

let code = fs.readFileSync('src/routes/admin.index.tsx', 'utf8');
code = code.replace(/\r\n/g, '\n');

// 1. Add focusMode and dispatchingNext states
const stateMarker = 'const [savingStatusId, setSavingStatusId] = useState<string | null>(null);';
const newState = `const [savingStatusId, setSavingStatusId] = useState<string | null>(null);
  const [focusMode, setFocusMode] = useState<
    "all" | "needs_attention" | "high_fit_uncontacted" | "pending_review" | "pending_payment"
  >("all");
  const [dispatchingNext, setDispatchingNext] = useState(false);`;

code = code.replace(stateMarker, newState);

// 2. Add attentionMetrics calculation & one-click handlers right after handleStatusChange
const statusChangeEnd = `      toast.success(\`Updated \${item.name}'s status to \${newStatus}\`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to update status");
    } finally {
      setSavingStatusId(null);
    }
  }`;

const attentionLogic = `      toast.success(\`Updated \${item.name}'s status to \${newStatus}\`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to update status");
    } finally {
      setSavingStatusId(null);
    }
  }

  // Autonomous Attention Metrics for the Lazy Operator
  const attentionMetrics = useMemo(() => {
    if (!data || !Array.isArray(data.responses)) {
      return {
        highFitUncontacted: [],
        pendingReview: [],
        pendingPayment: [],
        hotLeads: [],
        totalNeedsAttention: 0,
      };
    }
    const now = Date.now();
    const twoHoursAgo = now - 2 * 60 * 60 * 1000;

    const highFitUncontacted = data.responses.filter(
      (r) => r.kind === "career_engine" && r.status === "uncontacted" && (r.fit_score ?? 0) >= 85
    );
    const pendingReview = data.responses.filter(
      (r) => (r.kind === "application" || r.kind === "workshop") && (r.status === "submitted" || r.status === "reviewing")
    );
    const pendingPayment = data.responses.filter(
      (r) => r.kind === "enrolment" && r.status === "pending"
    );
    const hotLeads = data.responses.filter(
      (r) => new Date(r.created_at).getTime() >= twoHoursAgo && (r.status === "uncontacted" || r.status === "submitted" || r.status === "registered")
    );

    const totalNeedsAttention =
      highFitUncontacted.length + pendingReview.length + pendingPayment.length;

    return {
      highFitUncontacted,
      pendingReview,
      pendingPayment,
      hotLeads,
      totalNeedsAttention,
    };
  }, [data]);

  // 1-Click WhatsApp + Auto-Mark Contacted for Next Priority Lead
  async function handleOneClickDispatchNextLead() {
    const nextLead = attentionMetrics.highFitUncontacted[0] || attentionMetrics.hotLeads[0];
    if (!nextLead) {
      toast.success("Zero pending urgent leads! You're all caught up.");
      return;
    }
    setDispatchingNext(true);
    try {
      const msg = getWhatsAppTemplate(nextLead, nextLead.kind === "career_engine" ? "interview" : "pass");
      const digits10 = (nextLead.phone || "").replace(/\\D/g, "").slice(-10);
      if (!digits10) {
        toast.error(\`Candidate \${nextLead.name} has no valid 10-digit phone number\`);
        return;
      }
      const waUrl = \`https://wa.me/91\${digits10}?text=\${encodeURIComponent(msg)}\`;
      window.open(waUrl, "_blank", "noopener,noreferrer");

      if (nextLead.status === "uncontacted") {
        await handleStatusChange(nextLead, "contacted");
      }
      toast.success(\`Opened WhatsApp & auto-marked \${nextLead.name} as Contacted!\`);
    } finally {
      setDispatchingNext(false);
    }
  }

  // 1-Click WhatsApp + Auto-Mark Contacted for a Specific Row
  async function handleOneClickWhatsAppRow(r: UnifiedAdminResponse) {
    const msg = getWhatsAppTemplate(r, r.kind === "career_engine" ? "interview" : "pass");
    const digits10 = (r.phone || "").replace(/\\D/g, "").slice(-10);
    if (!digits10) {
      toast.error(\`Candidate \${r.name} has no valid 10-digit phone number\`);
      return;
    }
    const waUrl = \`https://wa.me/91\${digits10}?text=\${encodeURIComponent(msg)}\`;
    window.open(waUrl, "_blank", "noopener,noreferrer");

    if (r.status === "uncontacted") {
      await handleStatusChange(r, "contacted");
    }
  }

  // Quick clipboard copy
  function handleCopy(text: string, label: string) {
    navigator.clipboard.writeText(text);
    toast.success(\`\${label} copied to clipboard\`);
  }`;

code = code.replace(statusChangeEnd, attentionLogic);

// 3. Update filteredResponses to support focusMode
const oldFilter = `  // Filtered response list
  const filteredResponses = useMemo(() => {
    if (!data || !Array.isArray(data.responses)) return [];
    return data.responses.filter((r) => {
      // 1. Tab filter
      if (activeTab !== "all" && activeTab !== "analytics" && activeTab !== "controls") {
        if (r.kind !== activeTab) return false;
      }`;

const newFilter = `  // Filtered response list
  const filteredResponses = useMemo(() => {
    if (!data || !Array.isArray(data.responses)) return [];
    return data.responses.filter((r) => {
      // Focus Mode Priority Queue
      if (focusMode === "high_fit_uncontacted") {
        if (!(r.kind === "career_engine" && r.status === "uncontacted" && (r.fit_score ?? 0) >= 85)) {
          return false;
        }
      } else if (focusMode === "pending_review") {
        if (!((r.kind === "application" || r.kind === "workshop") && (r.status === "submitted" || r.status === "reviewing"))) {
          return false;
        }
      } else if (focusMode === "pending_payment") {
        if (!(r.kind === "enrolment" && r.status === "pending")) {
          return false;
        }
      } else if (focusMode === "needs_attention") {
        const isHighFit = r.kind === "career_engine" && r.status === "uncontacted" && (r.fit_score ?? 0) >= 85;
        const isAppPending = (r.kind === "application" || r.kind === "workshop") && (r.status === "submitted" || r.status === "reviewing");
        const isPayPending = r.kind === "enrolment" && r.status === "pending";
        if (!isHighFit && !isAppPending && !isPayPending) {
          return false;
        }
      }

      // 1. Tab filter
      if (activeTab !== "all" && activeTab !== "analytics" && activeTab !== "controls") {
        if (r.kind !== activeTab) return false;
      }`;

code = code.replace(oldFilter, newFilter);

// Update dependency array of filteredResponses to include focusMode
code = code.replace(
  `  }, [data, activeTab, statusFilter, collegeFilter, degreeFilter, searchQuery]);`,
  `  }, [data, activeTab, statusFilter, collegeFilter, degreeFilter, searchQuery, focusMode]);`
);

// 4. Update getWhatsAppTemplate for career_engine leads
const oldTemplate = `  // Generate WhatsApp Message Template
  function getWhatsAppTemplate(candidate: UnifiedAdminResponse, tpl: typeof dispatchTemplate) {
    const meetLink = customMeetUrl || WORKSHOP_CONFIG.meetUrl;
    const timeStr = \`\${customDate || WORKSHOP_CONFIG.dateDisplay} at \${customTime || WORKSHOP_CONFIG.timeDisplay}\`;

    if (tpl === "pass") {`;

const newTemplate = `  // Generate WhatsApp Message Template
  function getWhatsAppTemplate(candidate: UnifiedAdminResponse, tpl: typeof dispatchTemplate) {
    const meetLink = customMeetUrl || WORKSHOP_CONFIG.meetUrl;
    const timeStr = \`\${customDate || WORKSHOP_CONFIG.dateDisplay} at \${customTime || WORKSHOP_CONFIG.timeDisplay}\`;

    if (candidate.kind === "career_engine") {
      return \`Hi \${candidate.name}, I reviewed your Arzon Career Engine diagnostic assessment. You scored an impressive \${candidate.fit_score ?? 90}% match for \${candidate.archetype || "Clinical Research & Safety"} roles! We would love to walk you through your personalized career roadmap and recommended industry tracks. When would be a good time for a quick 10-minute briefing call today?\`;
    }

    if (tpl === "pass") {`;

code = code.replace(oldTemplate, newTemplate);

// 5. Insert Attention Radar section right before Top KPI Strip in <main>
const kpiStrip = `<main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* ── Top KPI Strip ────────────────────────────────────────── */}`;

const radarSection = `<main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* ── AUTONOMOUS OPERATOR ATTENTION RADAR ─────────────────── */}
        <section className="rounded-2xl border border-stone-200/90 bg-gradient-to-r from-stone-900 via-[#071A4A] to-slate-900 text-white p-5 sm:p-6 shadow-md space-y-4 tone-dark">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 motion-safe:animate-pulse" />
                  Operator Autopilot Radar
                </span>
                <span className="text-white/40 text-xs">·</span>
                <span className="text-white/70 font-mono text-xs">
                  {attentionMetrics.totalNeedsAttention === 0 ? "All queues cleared" : \`\${attentionMetrics.totalNeedsAttention} items awaiting action\`}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-white tracking-tight">
                {attentionMetrics.totalNeedsAttention === 0
                  ? "Everything is running smoothly · Zero overdue bottlenecks"
                  : \`Action Required: \${attentionMetrics.highFitUncontacted.length} high-fit leads & \${attentionMetrics.pendingReview.length} applications pending\`}
              </h2>
              <p className="text-xs text-white/70 max-w-2xl font-sans">
                Prioritized queue generated from live Career Engine diagnostics, admissions pipelines, and checkout drop-offs.
              </p>
            </div>

            {/* 1-Click Batch Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {attentionMetrics.highFitUncontacted.length > 0 && (
                <button
                  type="button"
                  onClick={handleOneClickDispatchNextLead}
                  disabled={dispatchingNext}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono font-bold text-xs shadow-md transition cursor-pointer active:scale-95 disabled:opacity-50"
                  title="Opens WhatsApp for the highest-fit lead and automatically marks them contacted"
                >
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>1-Click Contact Next Top Lead</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-slate-950/20 text-[10px]">
                    {attentionMetrics.highFitUncontacted[0]?.fit_score}% fit
                  </span>
                </button>
              )}

              {attentionMetrics.pendingReview.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    const firstApp = attentionMetrics.pendingReview[0];
                    if (firstApp) setSelectedCandidate(firstApp);
                  }}
                  className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono font-bold text-xs border border-white/20 transition cursor-pointer"
                >
                  <Briefcase className="w-3.5 h-3.5 text-purple-300" />
                  <span>Review Oldest App ({attentionMetrics.pendingReview.length})</span>
                </button>
              )}

              {focusMode !== "all" && (
                <button
                  type="button"
                  onClick={() => setFocusMode("all")}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white/80 font-mono text-xs cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Clear Queue Filter</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Filter Queue Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-white/10 text-xs">
            <button
              type="button"
              onClick={() => setFocusMode(focusMode === "high_fit_uncontacted" ? "all" : "high_fit_uncontacted")}
              className={\`p-2.5 rounded-xl text-left transition cursor-pointer border \${
                focusMode === "high_fit_uncontacted"
                  ? "bg-teal-500/20 border-teal-400/50 text-teal-200"
                  : "bg-white/5 border-white/10 hover:bg-white/10 text-white/80"
              }\`}
            >
              <div className="flex items-center justify-between font-mono text-[10px] uppercase font-bold text-teal-300">
                <span>High-Fit Leads</span>
                <span className="px-1.5 py-0.2 rounded-full bg-teal-500/20">{attentionMetrics.highFitUncontacted.length}</span>
              </div>
              <p className="text-[11px] text-white/60 mt-1 truncate">≥85% score · Uncontacted</p>
            </button>

            <button
              type="button"
              onClick={() => setFocusMode(focusMode === "pending_review" ? "all" : "pending_review")}
              className={\`p-2.5 rounded-xl text-left transition cursor-pointer border \${
                focusMode === "pending_review"
                  ? "bg-purple-500/20 border-purple-400/50 text-purple-200"
                  : "bg-white/5 border-white/10 hover:bg-white/10 text-white/80"
              }\`}
            >
              <div className="flex items-center justify-between font-mono text-[10px] uppercase font-bold text-purple-300">
                <span>Review Queue</span>
                <span className="px-1.5 py-0.2 rounded-full bg-purple-500/20">{attentionMetrics.pendingReview.length}</span>
              </div>
              <p className="text-[11px] text-white/60 mt-1 truncate">Awaiting shortlist / call</p>
            </button>

            <button
              type="button"
              onClick={() => setFocusMode(focusMode === "pending_payment" ? "all" : "pending_payment")}
              className={\`p-2.5 rounded-xl text-left transition cursor-pointer border \${
                focusMode === "pending_payment"
                  ? "bg-amber-500/20 border-amber-400/50 text-amber-200"
                  : "bg-white/5 border-white/10 hover:bg-white/10 text-white/80"
              }\`}
            >
              <div className="flex items-center justify-between font-mono text-[10px] uppercase font-bold text-amber-300">
                <span>Pending Enrolment</span>
                <span className="px-1.5 py-0.2 rounded-full bg-amber-500/20">{attentionMetrics.pendingPayment.length}</span>
              </div>
              <p className="text-[11px] text-white/60 mt-1 truncate">Checkout drop-offs</p>
            </button>

            <button
              type="button"
              onClick={() => setFocusMode(focusMode === "needs_attention" ? "all" : "needs_attention")}
              className={\`p-2.5 rounded-xl text-left transition cursor-pointer border \${
                focusMode === "needs_attention"
                  ? "bg-rose-500/20 border-rose-400/50 text-rose-200"
                  : "bg-white/5 border-white/10 hover:bg-white/10 text-white/80"
              }\`}
            >
              <div className="flex items-center justify-between font-mono text-[10px] uppercase font-bold text-rose-300">
                <span>All Urgent Items</span>
                <span className="px-1.5 py-0.2 rounded-full bg-rose-500/20">{attentionMetrics.totalNeedsAttention}</span>
              </div>
              <p className="text-[11px] text-white/60 mt-1 truncate">Combined priority queue</p>
            </button>
          </div>
        </section>

        {/* ── Top KPI Strip ────────────────────────────────────────── */}`;

code = code.replace(kpiStrip, radarSection);

fs.writeFileSync('src/routes/admin.index.tsx', code, 'utf8');
console.log('✓ Successfully enhanced admin.index.tsx with Autonomous Operator Radar and 1-click batch actions.');
