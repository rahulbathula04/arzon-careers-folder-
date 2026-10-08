import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle2, Loader2, Save, Wrench, XCircle } from "lucide-react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import {
  listAdminStatusComponents,
  updateAdminStatusComponent,
  type AdminStatusComponent,
} from "@/lib/admin-status.functions";

const STATES = [
  { value: "operational", label: "Operational", icon: CheckCircle2, tone: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  { value: "degraded", label: "Degraded", icon: AlertTriangle, tone: "text-amber-800 bg-amber-50 border-amber-200" },
  { value: "down", label: "Down", icon: XCircle, tone: "text-rose-700 bg-rose-50 border-rose-200" },
  { value: "maintenance", label: "Maintenance", icon: Wrench, tone: "text-blue-700 bg-blue-50 border-blue-200" },
] as const;

export function SystemStatusEditor() {
  const listFn = useServerFn(listAdminStatusComponents);
  const updateFn = useServerFn(updateAdminStatusComponent);
  const [components, setComponents] = useState<AdminStatusComponent[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    listFn()
      .then((result) => setComponents(result.components))
      .catch((error) => toast.error(error instanceof Error ? error.message : "Failed to load system status"))
      .finally(() => setLoading(false));
  }, [listFn]);

  function patch(id: string, patch: Partial<AdminStatusComponent>) {
    setComponents((current) => current.map((item) => item.id === id ? { ...item, ...patch } : item));
  }

  async function save(component: AdminStatusComponent) {
    setSavingId(component.id);
    try {
      const result = await updateFn({
        data: {
          id: component.id,
          state: component.state,
          note: component.note,
        },
      });
      patch(component.id, result.component);
      toast.success(`${component.name} status updated`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update status");
    } finally {
      setSavingId(null);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 rounded-2xl border border-stone-200 bg-white p-6 text-sm text-stone-500">
        <Loader2 className="h-4 w-4 motion-safe:animate-spin" /> Loading system status…
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs tone-light">
      <div className="mb-5">
        <h3 className="font-serif text-lg font-bold text-stone-900">Public System Status</h3>
        <p className="mt-1 text-xs leading-5 text-stone-500">
          These values drive <code className="font-mono">/status</code>. Updates are server-authorized
          and write directly to the status table.
        </p>
      </div>

      <div className="space-y-3">
        {components.map((component) => (
          <div key={component.id} className="grid gap-3 rounded-xl border border-stone-200 bg-stone-50 p-4 lg:grid-cols-[minmax(0,1fr)_180px_minmax(0,1fr)_auto] lg:items-center">
            <div>
              <p className="text-sm font-bold text-stone-900">{component.name}</p>
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-stone-400">
                Updated {new Date(component.updated_at).toLocaleString()}
              </p>
            </div>

            <select
              value={component.state}
              onChange={(event) => patch(component.id, { state: event.target.value as AdminStatusComponent["state"] })}
              className="h-10 rounded-lg border border-stone-300 bg-white px-3 text-xs font-semibold text-stone-800"
              aria-label={`${component.name} status`}
            >
              {STATES.map((state) => (
                <option key={state.value} value={state.value}>{state.label}</option>
              ))}
            </select>

            <input
              value={component.note ?? ""}
              onChange={(event) => patch(component.id, { note: event.target.value })}
              maxLength={500}
              placeholder="Optional public note"
              className="h-10 rounded-lg border border-stone-300 bg-white px-3 text-xs text-stone-800"
              aria-label={`${component.name} status note`}
            />

            <button
              type="button"
              disabled={savingId === component.id}
              onClick={() => save(component)}
              className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg bg-[var(--color-medical-navy)] px-4 text-xs font-bold text-white disabled:opacity-50 tone-dark" // @allow-raw-white
            >
              {savingId === component.id ? <Loader2 className="h-3.5 w-3.5 motion-safe:animate-spin" /> : <Save className="h-3.5 w-3.5" />}
              Save
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {STATES.map((state) => {
          const Icon = state.icon;
          return (
            <span key={state.value} className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold ${state.tone}`}>
              <Icon className="h-3 w-3" /> {state.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
