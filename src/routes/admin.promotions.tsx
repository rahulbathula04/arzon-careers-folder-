import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Tag,
  Sparkles,
  Layers,
  CheckCircle2,
  AlertCircle,
  Plus,
  TrendingUp,
  RefreshCw,
  Search,
} from "lucide-react";
import { useAdminGate } from "@/hooks/useAdminGate";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminKpi } from "@/components/admin/AdminCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/promotions")({
  head: () => ({
    meta: [
      { title: "Promotion & Coupon Engine · Admin Arzon" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPromotions,
});

interface CouponRow {
  code: string;
  discount_pct: number;
  window_minutes: number;
  is_active: boolean;
  max_uses_per_email: number;
  created_at: string;
  campaign_id?: string | null;
  attribution_id?: string | null;
}

function AdminPromotions() {
  const { status: gateStatus } = useAdminGate(["admin", "reviewer"]);
  const [coupons, setCoupons] = useState<CouponRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [newCode, setNewCode] = useState("");
  const [discountPct, setDiscountPct] = useState("50");
  const [windowMinutes, setWindowMinutes] = useState("60");
  const [creating, setCreating] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchPromotions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("coupons")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCoupons(data || []);
    } catch (err: any) {
      console.error("[admin/promotions] fetch error:", err);
      setStatusMessage({ type: "error", text: err.message || "Failed to load promotions." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (gateStatus === "ready") {
      fetchPromotions();
    }
  }, [gateStatus]);

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim()) return;

    setCreating(true);
    setStatusMessage(null);
    try {
      const cleanCode = newCode.trim().toUpperCase();
      const pct = parseInt(discountPct, 10) || 50;
      const mins = parseInt(windowMinutes, 10) || 60;

      const { error } = await supabase.from("coupons").insert({
        code: cleanCode,
        discount_pct: pct,
        window_minutes: mins,
        is_active: true,
        max_uses_per_email: 1,
      });

      if (error) throw error;

      setStatusMessage({ type: "success", text: `Coupon ${cleanCode} (${pct}% off) created!` });
      setNewCode("");
      fetchPromotions();
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err.message || "Failed to create coupon." });
    } finally {
      setCreating(false);
    }
  };

  const filteredCoupons = coupons.filter((c) =>
    c.code.toLowerCase().includes(search.toLowerCase())
  );

  const activeCount = coupons.filter((c) => c.is_active).length;

  if (gateStatus === "loading") {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <RefreshCw className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (gateStatus === "unauth" || gateStatus === "forbidden") {
    return (
      <div className="mx-auto max-w-md p-8 text-center">
        <AlertCircle className="mx-auto h-8 w-8 text-rose-400" />
        <h2 className="mt-2 text-lg font-bold text-white">Access Denied</h2>
        <p className="mt-1 text-sm text-slate-400">You must be logged in as an admin to view promotions.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1320px] space-y-8 p-6 text-slate-100">
      <h1 className="sr-only">Promotion Engine & Flash Campaigns</h1>
      <AdminPageHeader
        title="Promotion Engine & Flash Campaigns"
        description="Manage active enrolment coupons, campaign stacking rules, and promotional price overrides."
        actions={
          <Button onClick={fetchPromotions} variant="outline" size="sm">
            <RefreshCw className="mr-1.5 h-3.5 w-3.5" /> Refresh Data
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <AdminKpi title="Total Active Coupons" value={activeCount.toString()} subtext="Ready for checkout" icon={Tag} />
        <AdminKpi title="Campaign Strategy" value="Phase 1 Active" subtext="Legacy + Flash discounts" icon={Sparkles} />
        <AdminKpi title="Promotion Rules" value="Stacking Enforced" subtext="Token & time locked" icon={TrendingUp} />
      </div>

      {statusMessage && (
        <div
          className={`flex items-center gap-2 rounded-lg p-4 text-sm font-medium ${
            statusMessage.type === "success"
              ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
              : "border border-rose-500/20 bg-rose-500/10 text-rose-300"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="h-4 w-4 shrink-0" />
          ) : (
            <AlertCircle className="h-4 w-4 shrink-0" />
          )}
          {statusMessage.text}
        </div>
      )}

      {/* New Coupon Creation Form */}
      <div className="rounded-xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <Plus className="h-5 w-5 text-primary" /> Create Promo / Flash Coupon
        </h2>
        <form onSubmit={handleCreateCoupon} className="mt-4 grid gap-4 sm:grid-cols-4">
          <div>
            <label className="text-xs text-slate-400 font-medium">Coupon Code</label>
            <Input
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
              placeholder="e.g. LAUNCH50"
              className="mt-1 uppercase bg-slate-950 border-white/10"
              required
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 font-medium">Discount %</label>
            <Input
              type="number"
              value={discountPct}
              onChange={(e) => setDiscountPct(e.target.value)}
              placeholder="50"
              className="mt-1 bg-slate-950 border-white/10"
              min="1"
              max="100"
              required
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 font-medium">Validity (Minutes)</label>
            <Input
              type="number"
              value={windowMinutes}
              onChange={(e) => setWindowMinutes(e.target.value)}
              placeholder="60"
              className="mt-1 bg-slate-950 border-white/10"
              min="1"
              required
            />
          </div>
          <div className="flex items-end">
            <Button type="submit" disabled={creating} className="w-full">
              {creating ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
              Create Coupon
            </Button>
          </div>
        </form>
      </div>

      {/* Active Coupons List */}
      <div className="rounded-xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" /> Active Coupons & Rules ({filteredCoupons.length})
          </h2>
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search coupon code..."
              className="pl-9 bg-slate-950 border-white/10 text-sm"
            />
          </div>
        </div>

        {loading ? (
          <div className="py-12 text-center text-slate-400">
            <RefreshCw className="mx-auto h-6 w-6 animate-spin" />
            <p className="mt-2 text-sm">Loading promotions...</p>
          </div>
        ) : filteredCoupons.length === 0 ? (
          <div className="py-8 text-center text-slate-400 border border-dashed border-white/10 rounded-lg">
            No coupons found matching your search.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/80 text-xs uppercase text-slate-400 border-b border-white/10">
                <tr>
                  <th className="p-3">Code</th>
                  <th className="p-3">Discount</th>
                  <th className="p-3">Validity</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredCoupons.map((coupon) => (
                  <tr key={coupon.code} className="hover:bg-white/[0.02]">
                    <td className="p-3 font-mono font-bold text-primary">{coupon.code}</td>
                    <td className="p-3 font-semibold text-emerald-400">{coupon.discount_pct}% OFF</td>
                    <td className="p-3 text-xs text-slate-400">{coupon.window_minutes} mins</td>
                    <td className="p-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          coupon.is_active
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {coupon.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="p-3 text-xs text-slate-400">
                      {new Date(coupon.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
