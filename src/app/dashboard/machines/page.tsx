"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Machine {
  id: string;
  machine_id: string;
  type: string;
  make: string;
  model: string;
  status: string;
  year: number | null;
  serial_number: string | null;
  businesses: { id: string; name: string } | null;
  jurisdictions: { id: string; name: string } | null;
}

interface Business { id: string; name: string }
interface Jurisdiction { id: string; name: string }

const typeLabel: Record<string, { text: string; classes: string }> = {
  self_checkout: { text: "Self-Checkout", classes: "bg-accent-mid/10 text-accent-mid" },
  driverless_vehicle: { text: "Driverless", classes: "bg-success/10 text-success" },
  humanoid_robot: { text: "Humanoid", classes: "bg-federal/10 text-federal" },
};

const emptyForm = { machine_id: "", type: "self_checkout", make: "", model: "", serial_number: "", business_id: "", jurisdiction_id: "" };

export default function MachinesPage() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [jurisdictions, setJurisdictions] = useState<Jurisdiction[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  async function fetchAll() {
    const [machRes, bizRes, jurRes] = await Promise.all([
      supabase.from("machines").select("id, machine_id, type, make, model, status, year, serial_number, businesses(id, name), jurisdictions(id, name)").order("created_at", { ascending: false }),
      supabase.from("businesses").select("id, name").order("name"),
      supabase.from("jurisdictions").select("id, name").order("name"),
    ]);
    setMachines((machRes.data as unknown as Machine[]) ?? []);
    setBusinesses((bizRes.data as Business[]) ?? []);
    setJurisdictions((jurRes.data as Jurisdiction[]) ?? []);
    setLoading(false);
  }

  useEffect(() => { fetchAll(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from("machines").insert({
      machine_id: form.machine_id,
      type: form.type,
      make: form.make,
      model: form.model,
      serial_number: form.serial_number || null,
      business_id: form.business_id || null,
      jurisdiction_id: form.jurisdiction_id || null,
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
        <h1 className="text-[22px] font-bold">Machine Registry</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-primary text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-primary-hover transition-colors">
          {showForm ? "Cancel" : "+ Register Machine"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-md p-5 mb-6">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <label className="block">
              <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">Machine ID *</span>
              <input required value={form.machine_id} onChange={e => setForm({...form, machine_id: e.target.value})} placeholder="e.g. SCO-1234" className="mt-1 block w-full border border-border rounded px-3 py-2 text-sm bg-background focus:outline-none focus:border-primary" />
            </label>
            <label className="block">
              <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">Type *</span>
              <select required value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="mt-1 block w-full border border-border rounded px-3 py-2 text-sm bg-background focus:outline-none focus:border-primary">
                <option value="self_checkout">Self-Checkout</option>
                <option value="driverless_vehicle">Driverless Vehicle</option>
                <option value="humanoid_robot">Humanoid Robot</option>
              </select>
            </label>
            <label className="block">
              <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">Make *</span>
              <input required value={form.make} onChange={e => setForm({...form, make: e.target.value})} placeholder="e.g. NCR" className="mt-1 block w-full border border-border rounded px-3 py-2 text-sm bg-background focus:outline-none focus:border-primary" />
            </label>
            <label className="block">
              <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">Model *</span>
              <input required value={form.model} onChange={e => setForm({...form, model: e.target.value})} placeholder="e.g. SelfServ 90" className="mt-1 block w-full border border-border rounded px-3 py-2 text-sm bg-background focus:outline-none focus:border-primary" />
            </label>
            <label className="block">
              <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">Serial Number</span>
              <input value={form.serial_number} onChange={e => setForm({...form, serial_number: e.target.value})} className="mt-1 block w-full border border-border rounded px-3 py-2 text-sm bg-background focus:outline-none focus:border-primary" />
            </label>
            <label className="block">
              <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">Business Owner</span>
              <select value={form.business_id} onChange={e => setForm({...form, business_id: e.target.value})} className="mt-1 block w-full border border-border rounded px-3 py-2 text-sm bg-background focus:outline-none focus:border-primary">
                <option value="">— Select —</option>
                {businesses.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">Jurisdiction</span>
              <select value={form.jurisdiction_id} onChange={e => setForm({...form, jurisdiction_id: e.target.value})} className="mt-1 block w-full border border-border rounded px-3 py-2 text-sm bg-background focus:outline-none focus:border-primary">
                <option value="">— Select —</option>
                {jurisdictions.map(j => <option key={j.id} value={j.id}>{j.name}</option>)}
              </select>
            </label>
          </div>
          <div className="mt-4">
            <button type="submit" disabled={saving} className="bg-primary text-white text-sm font-semibold px-5 py-2 rounded-md hover:bg-primary-hover transition-colors disabled:opacity-50">
              {saving ? "Saving..." : "Register Machine"}
            </button>
          </div>
        </form>
      )}

      <div className="bg-surface border border-border rounded-md">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-left text-[11px] font-semibold text-muted uppercase tracking-wider border-b border-border">
              <th className="px-5 py-3">Machine ID</th>
              <th className="px-5 py-3">Type</th>
              <th className="px-5 py-3">Make / Model</th>
              <th className="px-5 py-3">Owner</th>
              <th className="px-5 py-3">Jurisdiction</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {machines.map((m) => (
              <tr key={m.id} className="border-t border-border hover:bg-surface-warm/50">
                <td className="px-5 py-3 font-mono text-xs">{m.machine_id}</td>
                <td className="px-5 py-3">
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${typeLabel[m.type]?.classes ?? "bg-border text-muted"}`}>
                    {typeLabel[m.type]?.text ?? m.type}
                  </span>
                </td>
                <td className="px-5 py-3">{m.make} {m.model}</td>
                <td className="px-5 py-3 text-muted">{m.businesses?.name ?? "—"}</td>
                <td className="px-5 py-3 text-muted">{m.jurisdictions?.name ?? "—"}</td>
                <td className="px-5 py-3">
                  <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${m.status === "active" ? "bg-success" : "bg-warning"}`} />
                  {m.status}
                </td>
              </tr>
            ))}
            {machines.length === 0 && (
              <tr><td colSpan={6} className="px-5 py-8 text-center text-muted">No machines registered</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
