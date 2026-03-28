"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface TaxRate {
  id: string;
  rate_type: string;
  rate_amount: number;
  effective_date: string;
  expiry_date: string | null;
  enacted_by: string | null;
  jurisdictions: { name: string; level: string } | null;
  task_categories: { name: string; code: string } | null;
}

interface Jurisdiction { id: string; name: string; level: string }
interface Category { id: string; name: string; code: string }

const levelDot: Record<string, string> = { federal: "bg-federal", state: "bg-state", local: "bg-local" };
const emptyForm = { jurisdiction_id: "", task_category_id: "", rate_type: "per_task", rate_amount: "", effective_date: new Date().toISOString().split("T")[0], enacted_by: "" };

export default function RatesPage() {
  const [rates, setRates] = useState<TaxRate[]>([]);
  const [jurisdictions, setJurisdictions] = useState<Jurisdiction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  async function fetchAll() {
    const [rateRes, jurRes, catRes] = await Promise.all([
      supabase.from("tax_rates").select("id, rate_type, rate_amount, effective_date, expiry_date, enacted_by, jurisdictions(name, level), task_categories(name, code)").order("effective_date", { ascending: false }),
      supabase.from("jurisdictions").select("id, name, level").order("level").order("name"),
      supabase.from("task_categories").select("id, name, code").order("name"),
    ]);
    setRates((rateRes.data as unknown as TaxRate[]) ?? []);
    setJurisdictions((jurRes.data as Jurisdiction[]) ?? []);
    setCategories((catRes.data as Category[]) ?? []);
    setLoading(false);
  }

  useEffect(() => { fetchAll(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from("tax_rates").insert({
      jurisdiction_id: form.jurisdiction_id,
      task_category_id: form.task_category_id,
      rate_type: form.rate_type,
      rate_amount: parseFloat(form.rate_amount),
      effective_date: form.effective_date,
      enacted_by: form.enacted_by || null,
    });
    setSaving(false);
    if (!error) {
      setForm(emptyForm);
      setShowForm(false);
      fetchAll();
    } else {
      alert(error.message);
    }
  }

  if (loading) return <div className="text-muted text-sm p-8">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[22px] font-bold">Tax Rate Config</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-primary text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-primary-hover transition-colors">
          {showForm ? "Cancel" : "+ Add Rate"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-md p-5 mb-6">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <label className="block">
              <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">Jurisdiction *</span>
              <select required value={form.jurisdiction_id} onChange={e => setForm({...form, jurisdiction_id: e.target.value})} className="mt-1 block w-full border border-border rounded px-3 py-2 text-sm bg-background focus:outline-none focus:border-primary">
                <option value="">— Select —</option>
                {jurisdictions.map(j => <option key={j.id} value={j.id}>{j.name} ({j.level})</option>)}
              </select>
            </label>
            <label className="block">
              <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">Task Category *</span>
              <select required value={form.task_category_id} onChange={e => setForm({...form, task_category_id: e.target.value})} className="mt-1 block w-full border border-border rounded px-3 py-2 text-sm bg-background focus:outline-none focus:border-primary">
                <option value="">— Select —</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name} ({c.code})</option>)}
              </select>
            </label>
            <label className="block">
              <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">Rate Type *</span>
              <select required value={form.rate_type} onChange={e => setForm({...form, rate_type: e.target.value})} className="mt-1 block w-full border border-border rounded px-3 py-2 text-sm bg-background focus:outline-none focus:border-primary">
                <option value="per_task">Per Task</option>
                <option value="per_mile">Per Mile</option>
                <option value="per_minute">Per Minute</option>
                <option value="per_unit">Per Unit</option>
              </select>
            </label>
            <label className="block">
              <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">Rate Amount ($) *</span>
              <input required type="number" step="0.000001" value={form.rate_amount} onChange={e => setForm({...form, rate_amount: e.target.value})} placeholder="0.05" className="mt-1 block w-full border border-border rounded px-3 py-2 text-sm bg-background focus:outline-none focus:border-primary" />
            </label>
            <label className="block">
              <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">Effective Date *</span>
              <input required type="date" value={form.effective_date} onChange={e => setForm({...form, effective_date: e.target.value})} className="mt-1 block w-full border border-border rounded px-3 py-2 text-sm bg-background focus:outline-none focus:border-primary" />
            </label>
            <label className="block">
              <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">Enacted By</span>
              <input value={form.enacted_by} onChange={e => setForm({...form, enacted_by: e.target.value})} placeholder="e.g. CA Legislature (AB-2847)" className="mt-1 block w-full border border-border rounded px-3 py-2 text-sm bg-background focus:outline-none focus:border-primary" />
            </label>
          </div>
          <div className="mt-4">
            <button type="submit" disabled={saving} className="bg-primary text-white text-sm font-semibold px-5 py-2 rounded-md hover:bg-primary-hover transition-colors disabled:opacity-50">
              {saving ? "Saving..." : "Add Rate"}
            </button>
          </div>
        </form>
      )}

      <div className="bg-surface border border-border rounded-md">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-left text-[11px] font-semibold text-muted uppercase tracking-wider border-b border-border">
              <th className="px-5 py-3">Jurisdiction</th>
              <th className="px-5 py-3">Level</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Type</th>
              <th className="px-5 py-3">Rate</th>
              <th className="px-5 py-3">Enacted By</th>
              <th className="px-5 py-3">Effective</th>
            </tr>
          </thead>
          <tbody>
            {rates.map((r) => (
              <tr key={r.id} className="border-t border-border hover:bg-surface-warm/50">
                <td className="px-5 py-3 font-medium">{r.jurisdictions?.name ?? "—"}</td>
                <td className="px-5 py-3">
                  <span className={`inline-block w-2.5 h-2.5 rounded-full mr-1.5 ${levelDot[r.jurisdictions?.level ?? ""] ?? "bg-muted"}`} />
                  {r.jurisdictions?.level ?? "—"}
                </td>
                <td className="px-5 py-3 text-muted">{r.task_categories?.name ?? "—"}</td>
                <td className="px-5 py-3">
                  <span className="text-[11px] font-semibold bg-surface-warm px-2 py-0.5 rounded">{r.rate_type}</span>
                </td>
                <td className="px-5 py-3 font-mono">${r.rate_amount}</td>
                <td className="px-5 py-3 text-muted text-xs">{r.enacted_by ?? "—"}</td>
                <td className="px-5 py-3 text-muted text-xs">{new Date(r.effective_date).toLocaleDateString()}</td>
              </tr>
            ))}
            {rates.length === 0 && (
              <tr><td colSpan={7} className="px-5 py-8 text-center text-muted">No tax rates configured</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
