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
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

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
    c.code.toLowerCase().includes(search.toLowerCase()),
  );

  const activeCount = coupons.filter((c) => c.is_active).length;

  if (gateStatus === "loading") {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <RefreshCw className="h-6 w-6 animate-spin text-[#1D4ED8]" />
      </div>
    );
  }

  if (gateStatus === "unauth" || gateStatus === "forbidden") {
    return (
      <div className="mx-auto max-w-md p-8 text-center space-y-2 editorial-card">
        <AlertCircle className="mx-auto h-8 w-8 text-rose-500" />
        <h2 className="font-serif text-lg font-bold text-[#151C2E]">Access Restricted</h2>
        <p className="text-xs text-[#5B6472]">
          Authenticated staff credentials required to view promotions.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen editorial-page-bg p-6 space-y-8 max-w-[1320px] mx-auto">
      <h1 className="sr-only">Promotion Engine & Flash Campaigns</h1>
      <AdminPageHeader
        title="Promotion Engine & Flash Campaigns"
        description="Manage active enrolment coupons, campaign stacking rules, and promotional price overrides."
        actions={
          <Button
            onClick={fetchPromotions}
            variant="outline"
            size="sm"
            className="bg-white border-slate-300 text-[#151C2E] hover:bg-slate-50"
          >
            <RefreshCw className="mr-1.5 h-3.5 w-3.5" /> Refresh Data
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <AdminKpi
          label="Total Active Coupons"
          value={activeCount.toString()}
          helper="Ready for checkout"
          icon={<Tag className="h-4 w-4 text-muted-foreground" />}
        />
        <AdminKpi
          label="Campaign Strategy"
          value="Phase 1 Active"
          helper="Legacy + Flash discounts"
          icon={<Sparkles className="h-4 w-4 text-muted-foreground" />}
        />
        <AdminKpi
          label="Promotion Rules"
          value="Stacking Enforced"
          helper="Token & time locked"
          icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      {statusMessage && (
        <div
          className={`flex items-center gap-2 rounded-lg p-4 text-xs font-medium ${
            statusMessage.type === "success"
              ? "border border-emerald-300 bg-emerald-50 text-emerald-800"
              : "border border-rose-300 bg-rose-50 text-rose-800"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
          ) : (
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
          )}
          {statusMessage.text}
        </div>
      )}

      {/* New Coupon Creation Form */}
      <div className="editorial-card p-6 space-y-4">
        <h2 className="font-serif text-base font-bold text-[#151C2E] flex items-center gap-2">
          <Plus className="h-4 w-4 text-[#1D4ED8]" /> Create Promo / Flash Coupon
        </h2>
        <form onSubmit={handleCreateCoupon} className="grid gap-4 sm:grid-cols-4">
          <div>
            <label className="text-xs text-[#707C90] uppercase tracking-wider font-medium">
              Coupon Code
            </label>
            <Input
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
              placeholder="e.g. LAUNCH50"
              className="mt-1 uppercase bg-[#F2F4F9] border-slate-200 text-xs text-[#151C2E] font-mono"
              required
            />
          </div>
          <div>
            <label className="text-xs text-[#707C90] uppercase tracking-wider font-medium">
              Discount %
            </label>
            <Input
              type="number"
              value={discountPct}
              onChange={(e) => setDiscountPct(e.target.value)}
              placeholder="50"
              className="mt-1 bg-[#F2F4F9] border-slate-200 text-xs text-[#151C2E] font-mono"
              min="1"
              max="100"
              required
            />
          </div>
          <div>
            <label className="text-xs text-[#707C90] uppercase tracking-wider font-medium">
              Validity (Minutes)
            </label>
            <Input
              type="number"
              value={windowMinutes}
              onChange={(e) => setWindowMinutes(e.target.value)}
              placeholder="60"
              className="mt-1 bg-[#F2F4F9] border-slate-200 text-xs text-[#151C2E] font-mono"
              min="1"
              required
            />
          </div>
          <div className="flex items-end">
            <Button
              type="submit"
              disabled={creating}
              className="w-full editorial-btn-blue text-xs font-semibold h-10"
            >
              {creating ? (
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Plus className="mr-2 h-4 w-4" />
              )}
              Create Coupon
            </Button>
          </div>
        </form>
      </div>

      {/* Active Coupons List */}
      <div className="editorial-card p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="font-serif text-base font-bold text-[#151C2E] flex items-center gap-2">
            <Layers className="h-4 w-4 text-[#1D4ED8]" /> Active Coupons & Campaign Rules (
            {filteredCoupons.length})
          </h2>
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#707C90]" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search coupon code..."
              className="pl-9 bg-[#F2F4F9] border-slate-200 text-xs text-[#151C2E]"
            />
          </div>
        </div>

        {loading ? (
          <div className="py-12 text-center text-[#707C90]">
            <RefreshCw className="mx-auto h-6 w-6 animate-spin text-[#1D4ED8]" />
            <p className="mt-2 text-xs">Loading active rules...</p>
          </div>
        ) : filteredCoupons.length === 0 ? (
          <div className="py-8 text-center text-[#707C90] border border-dashed border-slate-200 rounded-lg text-xs">
            No coupons found matching your query.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#151C2E]">
              <thead className="bg-[#F2F4F9] uppercase text-[#707C90] border-b border-slate-200 font-sans tracking-wider text-[11px]">
                <tr>
                  <th className="p-3">Code</th>
                  <th className="p-3">Discount</th>
                  <th className="p-3">Validity</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono">
                {filteredCoupons.map((coupon) => (
                  <tr key={coupon.code} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-[#151C2E]">{coupon.code}</td>
                    <td className="p-3 font-semibold text-emerald-700">
                      {coupon.discount_pct}% OFF
                    </td>
                    <td className="p-3 text-[#5B6472]">{coupon.window_minutes} mins</td>
                    <td className="p-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-sans font-medium ${
                          coupon.is_active
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-slate-100 text-slate-500 border border-slate-200"
                        }`}
                      >
                        {coupon.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="p-3 text-[#5B6472] font-sans">
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
