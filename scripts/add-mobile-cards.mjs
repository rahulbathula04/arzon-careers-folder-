import fs from 'fs';

let code = fs.readFileSync('src/routes/admin.index.tsx', 'utf8');
code = code.replace(/\r\n/g, '\n');

// 1. In Desktop table, replace the Actions cell with enhanced 1-click Contact button
const oldActionsCell = `                            {/* Action Buttons */}
                            <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center justify-end gap-1.5">
                                {r.whatsapp_link && (
                                  <button
                                    type="button"
                                    onClick={() => setActiveDispatchCandidate(r)}
                                    className="p-1.5 rounded-lg border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition cursor-pointer"
                                    title="Open WhatsApp Message Dispatcher"
                                  >
                                    <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
                                  </button>
                                )}
                                <button
                                  type="button"
                                  onClick={() => setSelectedCandidate(r)}
                                  className="p-1.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 transition cursor-pointer"
                                  title="View full candidate file"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>`;

const newActionsCell = `                            {/* Action Buttons */}
                            <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center justify-end gap-1.5">
                                {r.whatsapp_link && r.status === "uncontacted" ? (
                                  <button
                                    type="button"
                                    onClick={() => handleOneClickWhatsAppRow(r)}
                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-emerald-400 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-mono text-[10.5px] font-bold transition cursor-pointer shadow-2xs active:scale-95"
                                    title="1-Click: Open WhatsApp and auto-mark Contacted"
                                  >
                                    <Zap className="w-3 h-3 fill-current text-emerald-600" />
                                    <span>Contact</span>
                                  </button>
                                ) : r.whatsapp_link ? (
                                  <button
                                    type="button"
                                    onClick={() => setActiveDispatchCandidate(r)}
                                    className="p-1.5 rounded-lg border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition cursor-pointer"
                                    title="Open WhatsApp Dispatcher"
                                  >
                                    <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
                                  </button>
                                ) : null}
                                <button
                                  type="button"
                                  onClick={() => setSelectedCandidate(r)}
                                  className="p-1.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 transition cursor-pointer"
                                  title="View full candidate file"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>`;

code = code.replace(oldActionsCell, newActionsCell);

// 2. Add Mobile Cards View right above the Desktop Table
const oldTableBlock = `            {/* Master Responses Table */}
            <div className="rounded-2xl border border-stone-200 bg-white shadow-2xs overflow-hidden tone-light">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">`;

const newTableBlock = `            {/* Mobile Candidate Card View (Crazy Productive on Phones) */}
            <div className="block md:hidden space-y-3">
              {filteredResponses.length === 0 ? (
                <div className="p-8 text-center text-stone-500 bg-white rounded-2xl border border-stone-200 tone-light">
                  <AlertTriangle className="w-6 h-6 text-stone-400 mx-auto mb-2" />
                  <p className="font-medium text-stone-800">No applications match your filter</p>
                  <p className="text-xs text-stone-500 mt-1">Try adjusting the filter pills or search query.</p>
                </div>
              ) : (
                filteredResponses.map((r) => {
                  const sColors = STATUS_COLORS[r.status.toLowerCase()] || {
                    bg: "bg-stone-100",
                    text: "text-stone-800",
                    border: "border-stone-200",
                  };
                  return (
                    <div
                      key={r.id}
                      onClick={() => setSelectedCandidate(r)}
                      className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3 cursor-pointer hover:border-[var(--color-medical-navy)]/40 transition tone-light"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-bold text-stone-900 text-sm">{r.name}</span>
                            {r.pass_id && (
                              <span className="font-mono text-[9px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200">
                                {r.pass_id}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-stone-500 font-sans mt-0.5 truncate max-w-[220px]">
                            {r.college || "College not specified"}
                          </p>
                        </div>
                        <span className={\`font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border \${sColors.bg} \${sColors.text} \${sColors.border}\`}>
                          {r.status}
                        </span>
                      </div>

                      {/* Origin & Fit Details */}
                      <div className="flex items-center gap-2 text-xs flex-wrap">
                        <span className="font-mono text-[10px] text-stone-600 bg-stone-100 px-2 py-0.5 rounded">
                          {r.kind.replace("_", " ").toUpperCase()}
                        </span>
                        {r.archetype && (
                          <span className="font-mono text-[10px] text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
                            {r.archetype} ({r.fit_score}% fit)
                          </span>
                        )}
                        {r.amount_inr && (
                          <span className="font-mono text-[10px] text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded font-bold">
                            ₹{r.amount_inr.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>

                      {/* 1-Tap Action Row */}
                      <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-2">
                          {r.whatsapp_link && (
                            <button
                              type="button"
                              onClick={() => handleOneClickWhatsAppRow(r)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold shadow-xs active:scale-95 transition cursor-pointer"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>{r.status === "uncontacted" ? "1-Tap WhatsApp & Done" : "WhatsApp"}</span>
                            </button>
                          )}
                          {r.phone && (
                            <a
                              href={\`tel:\${r.phone}\`}
                              className="p-2 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50"
                              title="Call Candidate"
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>

                        {/* Inline Status Select */}
                        <div className="relative">
                          <select
                            value={r.status.toLowerCase()}
                            disabled={savingStatusId === r.id}
                            onChange={(e) => handleStatusChange(r, e.target.value)}
                            aria-label={\`Update status for \${r.name}\`}
                            className={\`py-1.5 pl-2.5 pr-6 rounded-xl text-xs font-mono font-bold border \${sColors.bg} \${sColors.text} \${sColors.border}\`}
                          >
                            {getAvailableStatuses(r.kind).map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="w-3 h-3 text-stone-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Master Desktop Responses Table */}
            <div className="hidden md:block rounded-2xl border border-stone-200 bg-white shadow-2xs overflow-hidden tone-light">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">`;

code = code.replace(oldTableBlock, newTableBlock);

fs.writeFileSync('src/routes/admin.index.tsx', code, 'utf8');
console.log('✓ Successfully added Mobile Cards and 1-Click Desktop Action to admin.index.tsx');
