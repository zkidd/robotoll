"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface DashboardStats {
  machineCount: number;
  jurisdictionCount: number;
  businessCount: number;
  categoryCount: number;
}

interface Machine {
  machine_id: string;
  type: string;
  make: string;
  model: string;
  status: string;
  businesses: { name: string } | null;
  jurisdictions: { name: string } | null;
}

interface Jurisdiction {
  name: string;
  level: string;
  code: string;
  status: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({ machineCount: 0, jurisdictionCount: 0, businessCount: 0, categoryCount: 0 });
  const [machines, setMachines] = useState<Machine[]>([]);
  const [jurisdictions, setJurisdictions] = useState<Jurisdiction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [machineRes, jurisdictionRes, businessRes, categoryRes, machineListRes, jurisdictionListRes] =
        await Promise.all([
          supabase.from("machines").select("id", { count: "exact", head: true }),
          supabase.from("jurisdictions").select("id", { count: "exact", head: true }),
          supabase.from("businesses").select("id", { count: "exact", head: true }),
          supabase.from("task_categories").select("id", { count: "exact", head: true }),
          supabase.from("machines").select("machine_id, type, make, model, status, businesses(name), jurisdictions(name)").limit(10),
          supabase.from("jurisdictions").select("name, level, code, status").order("level"),
        ]);

      setStats({
        machineCount: machineRes.count ?? 0,
        jurisdictionCount: jurisdictionRes.count ?? 0,
        businessCount: businessRes.count ?? 0,
        categoryCount: categoryRes.count ?? 0,
      });
      setMachines((machineListRes.data as unknown as Machine[]) ?? []);
      setJurisdictions((jurisdictionListRes.data as Jurisdiction[]) ?? []);
      setLoading(false);
    }
    fetchData();
  }, []);

  const typeLabel: Record<string, { text: string; classes: string }> = {
    self_checkout: { text: "Self-Checkout", classes: "bg-accent-mid/10 text-accent-mid" },
    driverless_vehicle: { text: "Driverless", classes: "bg-success/10 text-success" },
    humanoid_robot: { text: "Humanoid", classes: "bg-federal/10 text-federal" },
  };

  const levelDot: Record<string, string> = {
    federal: "bg-federal",
    state: "bg-state",
    local: "bg-local",
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted text-sm">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[22px] font-bold">Dashboard</h1>
        <span className="text-xs text-muted">Live from Supabase</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Registered Machines", value: stats.machineCount },
          { label: "Active Jurisdictions", value: stats.jurisdictionCount },
          { label: "Business Accounts", value: stats.businessCount },
          { label: "Task Categories", value: stats.categoryCount },
        ].map((s) => (
          <div key={s.label} className="bg-surface border border-border rounded-md p-5">
            <div className="text-[11px] font-medium text-muted uppercase tracking-wider">{s.label}</div>
            <div className="text-[28px] font-bold mt-1">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Machines */}
        <div className="bg-surface border border-border rounded-md p-5">
          <h2 className="text-[15px] font-bold pb-3 mb-4 border-b border-border">Registered Machines</h2>
          <table className="w-full text-[13px]">
            <thead>
              <tr className="text-left text-[11px] font-semibold text-muted uppercase tracking-wider">
                <th className="pb-2 pr-3">ID</th>
                <th className="pb-2 pr-3">Type</th>
                <th className="pb-2 pr-3">Make/Model</th>
                <th className="pb-2 pr-3">Owner</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {machines.map((m) => (
                <tr key={m.machine_id} className="border-t border-border hover:bg-surface-warm/50">
                  <td className="py-2.5 pr-3 font-mono text-xs">{m.machine_id}</td>
                  <td className="py-2.5 pr-3">
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${typeLabel[m.type]?.classes ?? "bg-border text-muted"}`}>
                      {typeLabel[m.type]?.text ?? m.type}
                    </span>
                  </td>
                  <td className="py-2.5 pr-3">{m.make} {m.model}</td>
                  <td className="py-2.5 pr-3 text-muted">{m.businesses?.name ?? "—"}</td>
                  <td className="py-2.5">
                    <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${m.status === "active" ? "bg-success" : "bg-warning"}`} />
                    {m.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Jurisdictions */}
        <div className="bg-surface border border-border rounded-md p-5">
          <h2 className="text-[15px] font-bold pb-3 mb-4 border-b border-border">Jurisdictions</h2>
          <table className="w-full text-[13px]">
            <thead>
              <tr className="text-left text-[11px] font-semibold text-muted uppercase tracking-wider">
                <th className="pb-2 pr-3">Name</th>
                <th className="pb-2 pr-3">Level</th>
                <th className="pb-2 pr-3">Code</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {jurisdictions.map((j) => (
                <tr key={j.code} className="border-t border-border hover:bg-surface-warm/50">
                  <td className="py-2.5 pr-3 font-medium">{j.name}</td>
                  <td className="py-2.5 pr-3">
                    <span className={`inline-block w-2.5 h-2.5 rounded-full mr-1.5 ${levelDot[j.level] ?? "bg-muted"}`} />
                    {j.level}
                  </td>
                  <td className="py-2.5 pr-3 font-mono text-xs">{j.code}</td>
                  <td className="py-2.5">
                    <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${j.status === "active" ? "bg-success" : "bg-muted"}`} />
                    {j.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
