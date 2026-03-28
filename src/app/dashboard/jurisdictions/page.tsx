"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Jurisdiction {
  id: string;
  name: string;
  level: string;
  code: string;
  status: string;
  parent_jurisdiction_id: string | null;
}

const levelDot: Record<string, string> = {
  federal: "bg-federal",
  state: "bg-state",
  local: "bg-local",
};

export default function JurisdictionsPage() {
  const [jurisdictions, setJurisdictions] = useState<Jurisdiction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase
        .from("jurisdictions")
        .select("id, name, level, code, status, parent_jurisdiction_id")
        .order("level")
        .order("name");
      setJurisdictions((data as Jurisdiction[]) ?? []);
      setLoading(false);
    }
    fetch();
  }, []);

  if (loading) return <div className="text-muted text-sm p-8">Loading...</div>;

  return (
    <div>
      <h1 className="text-[22px] font-bold mb-6">Jurisdictions</h1>
      <div className="bg-surface border border-border rounded-md">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-left text-[11px] font-semibold text-muted uppercase tracking-wider border-b border-border">
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Level</th>
              <th className="px-5 py-3">Code</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {jurisdictions.map((j) => (
              <tr key={j.id} className="border-t border-border hover:bg-surface-warm/50">
                <td className="px-5 py-3 font-medium">{j.name}</td>
                <td className="px-5 py-3">
                  <span className={`inline-block w-2.5 h-2.5 rounded-full mr-1.5 ${levelDot[j.level] ?? "bg-muted"}`} />
                  {j.level}
                </td>
                <td className="px-5 py-3 font-mono text-xs">{j.code}</td>
                <td className="px-5 py-3">
                  <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${j.status === "active" ? "bg-success" : "bg-muted"}`} />
                  {j.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
