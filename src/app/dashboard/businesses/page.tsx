"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Business {
  id: string;
  name: string;
  ein: string | null;
  contact_name: string | null;
  contact_email: string | null;
  city: string | null;
  state_code: string | null;
  status: string;
  created_at: string;
}

const emptyForm = { name: "", ein: "", contact_name: "", contact_email: "", city: "", state_code: "" };

export default function BusinessesPage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  async function fetchAll() {
    const { data } = await supabase.from("businesses").select("id, name, ein, contact_name, contact_email, city, state_code, status, created_at").order("name");
    setBusinesses((data as Business[]) ?? []);
    setLoading(false);
  }

  useEffect(() => { fetchAll(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from("businesses").insert({
      name: form.name,
      ein: form.ein || null,
      contact_name: form.contact_name || null,
      contact_email: form.contact_email || null,
      city: form.city || null,
      state_code: form.state_code || null,
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
        <h1 className="text-[22px] font-bold">Business Accounts</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-primary text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-primary-hover transition-colors">
          {showForm ? "Cancel" : "+ Add Business"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-md p-5 mb-6">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <label className="block">
              <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">Business Name *</span>
              <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="mt-1 block w-full border border-border rounded px-3 py-2 text-sm bg-background focus:outline-none focus:border-primary" />
            </label>
            <label className="block">
              <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">EIN</span>
              <input value={form.ein} onChange={e => setForm({...form, ein: e.target.value})} placeholder="XX-XXXXXXX" className="mt-1 block w-full border border-border rounded px-3 py-2 text-sm bg-background focus:outline-none focus:border-primary" />
            </label>
            <label className="block">
              <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">Contact Name</span>
              <input value={form.contact_name} onChange={e => setForm({...form, contact_name: e.target.value})} className="mt-1 block w-full border border-border rounded px-3 py-2 text-sm bg-background focus:outline-none focus:border-primary" />
            </label>
            <label className="block">
              <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">Contact Email</span>
              <input type="email" value={form.contact_email} onChange={e => setForm({...form, contact_email: e.target.value})} className="mt-1 block w-full border border-border rounded px-3 py-2 text-sm bg-background focus:outline-none focus:border-primary" />
            </label>
            <label className="block">
              <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">City</span>
              <input value={form.city} onChange={e => setForm({...form, city: e.target.value})} className="mt-1 block w-full border border-border rounded px-3 py-2 text-sm bg-background focus:outline-none focus:border-primary" />
            </label>
            <label className="block">
              <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">State</span>
              <input value={form.state_code} onChange={e => setForm({...form, state_code: e.target.value})} placeholder="CA" maxLength={2} className="mt-1 block w-full border border-border rounded px-3 py-2 text-sm bg-background focus:outline-none focus:border-primary" />
            </label>
          </div>
          <div className="mt-4">
            <button type="submit" disabled={saving} className="bg-primary text-white text-sm font-semibold px-5 py-2 rounded-md hover:bg-primary-hover transition-colors disabled:opacity-50">
              {saving ? "Saving..." : "Add Business"}
            </button>
          </div>
        </form>
      )}

      <div className="bg-surface border border-border rounded-md">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-left text-[11px] font-semibold text-muted uppercase tracking-wider border-b border-border">
              <th className="px-5 py-3">Business</th>
              <th className="px-5 py-3">EIN</th>
              <th className="px-5 py-3">Contact</th>
              <th className="px-5 py-3">Location</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Registered</th>
            </tr>
          </thead>
          <tbody>
            {businesses.map((b) => (
              <tr key={b.id} className="border-t border-border hover:bg-surface-warm/50">
                <td className="px-5 py-3 font-medium">{b.name}</td>
                <td className="px-5 py-3 font-mono text-xs text-muted">{b.ein ?? "—"}</td>
                <td className="px-5 py-3 text-muted">
                  {b.contact_name && <div>{b.contact_name}</div>}
                  {b.contact_email && <div className="text-xs">{b.contact_email}</div>}
                  {!b.contact_name && !b.contact_email && "—"}
                </td>
                <td className="px-5 py-3 text-muted">{[b.city, b.state_code].filter(Boolean).join(", ") || "—"}</td>
                <td className="px-5 py-3">
                  <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${b.status === "active" ? "bg-success" : "bg-warning"}`} />
                  {b.status ?? "active"}
                </td>
                <td className="px-5 py-3 text-muted text-xs">{new Date(b.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
            {businesses.length === 0 && (
              <tr><td colSpan={6} className="px-5 py-8 text-center text-muted">No businesses registered</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
