"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Category {
  id: string;
  name: string;
  description: string | null;
  machine_types: string[] | null;
}

const typeLabel: Record<string, string> = {
  self_checkout: "Self-Checkout",
  driverless_vehicle: "Driverless",
  humanoid_robot: "Humanoid",
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase
        .from("task_categories")
        .select("id, name, description, machine_types")
        .order("name");
      setCategories((data as Category[]) ?? []);
      setLoading(false);
    }
    fetch();
  }, []);

  if (loading) return <div className="text-muted text-sm p-8">Loading...</div>;

  return (
    <div>
      <h1 className="text-[22px] font-bold mb-6">Task Categories</h1>
      <div className="bg-surface border border-border rounded-md">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-left text-[11px] font-semibold text-muted uppercase tracking-wider border-b border-border">
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Description</th>
              <th className="px-5 py-3">Machine Types</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id} className="border-t border-border hover:bg-surface-warm/50">
                <td className="px-5 py-3 font-medium">{c.name}</td>
                <td className="px-5 py-3 text-muted">{c.description ?? "—"}</td>
                <td className="px-5 py-3">
                  <div className="flex gap-1.5 flex-wrap">
                    {c.machine_types?.map((t) => (
                      <span key={t} className="text-[11px] font-medium bg-surface-warm text-muted px-2 py-0.5 rounded-sm">
                        {typeLabel[t] ?? t}
                      </span>
                    )) ?? "—"}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
