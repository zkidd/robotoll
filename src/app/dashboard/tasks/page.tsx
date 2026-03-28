"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Task {
  id: string;
  task_id: string;
  task_category_id: string;
  status: string;
  started_at: string;
  ended_at: string | null;
  duration_seconds: number | null;
  measured_value: number | null;
  measured_unit: string | null;
  machines: { machine_id: string; type: string } | null;
  task_categories: { name: string } | null;
}

interface Machine { id: string; machine_id: string; type: string }
interface Category { id: string; name: string; code: string; measurement_unit: string }

const emptyForm = { machine_id: "", task_category_id: "", description: "", measured_value: "", measured_unit: "tasks" };

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [machines, setMachines] = useState<Machine[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  async function fetchAll() {
    const [taskRes, machRes, catRes] = await Promise.all([
      supabase.from("tasks").select("id, task_id, task_category_id, status, started_at, ended_at, duration_seconds, measured_value, measured_unit, machines(machine_id, type), task_categories(name)").order("started_at", { ascending: false }).limit(50),
      supabase.from("machines").select("id, machine_id, type").order("machine_id"),
      supabase.from("task_categories").select("id, name, code, measurement_unit").order("name"),
    ]);
    setTasks((taskRes.data as unknown as Task[]) ?? []);
    setMachines((machRes.data as Machine[]) ?? []);
    setCategories((catRes.data as Category[]) ?? []);
    setLoading(false);
  }

  useEffect(() => { fetchAll(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const now = new Date().toISOString();
    const taskId = `TK-${Date.now().toString().slice(-7)}`;

    // Get the machine's jurisdiction
    const { data: machData } = await supabase.from("machines").select("jurisdiction_id").eq("id", form.machine_id).single();

    const { error } = await supabase.from("tasks").insert({
      task_id: taskId,
      machine_id: form.machine_id,
      task_category_id: form.task_category_id,
      description: form.description || null,
      status: "completed",
      started_at: now,
      ended_at: now,
      duration_seconds: 1,
      measured_value: parseFloat(form.measured_value) || 1,
      measured_unit: form.measured_unit,
      jurisdiction_id: machData?.jurisdiction_id || null,
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
        <h1 className="text-[22px] font-bold">Task Log</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-primary text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-primary-hover transition-colors">
          {showForm ? "Cancel" : "+ Log Task"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-md p-5 mb-6">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <label className="block">
              <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">Machine *</span>
              <select required value={form.machine_id} onChange={e => setForm({...form, machine_id: e.target.value})} className="mt-1 block w-full border border-border rounded px-3 py-2 text-sm bg-background focus:outline-none focus:border-primary">
                <option value="">— Select —</option>
                {machines.map(m => <option key={m.id} value={m.id}>{m.machine_id}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">Category *</span>
              <select required value={form.task_category_id} onChange={e => setForm({...form, task_category_id: e.target.value})} className="mt-1 block w-full border border-border rounded px-3 py-2 text-sm bg-background focus:outline-none focus:border-primary">
                <option value="">— Select —</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name} ({c.code})</option>)}
              </select>
            </label>
            <label className="block">
              <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">Measured Value</span>
              <input type="number" step="0.01" value={form.measured_value} onChange={e => setForm({...form, measured_value: e.target.value})} placeholder="e.g. 4.2" className="mt-1 block w-full border border-border rounded px-3 py-2 text-sm bg-background focus:outline-none focus:border-primary" />
            </label>
            <label className="block">
              <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">Unit</span>
              <select value={form.measured_unit} onChange={e => setForm({...form, measured_unit: e.target.value})} className="mt-1 block w-full border border-border rounded px-3 py-2 text-sm bg-background focus:outline-none focus:border-primary">
                <option value="tasks">tasks</option>
                <option value="miles">miles</option>
                <option value="minutes">minutes</option>
                <option value="items">items</option>
              </select>
            </label>
            <label className="block lg:col-span-2">
              <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">Description</span>
              <input value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Optional description" className="mt-1 block w-full border border-border rounded px-3 py-2 text-sm bg-background focus:outline-none focus:border-primary" />
            </label>
          </div>
          <div className="mt-4">
            <button type="submit" disabled={saving} className="bg-primary text-white text-sm font-semibold px-5 py-2 rounded-md hover:bg-primary-hover transition-colors disabled:opacity-50">
              {saving ? "Saving..." : "Log Task"}
            </button>
          </div>
        </form>
      )}

      <div className="bg-surface border border-border rounded-md">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-left text-[11px] font-semibold text-muted uppercase tracking-wider border-b border-border">
              <th className="px-5 py-3">Task ID</th>
              <th className="px-5 py-3">Time</th>
              <th className="px-5 py-3">Machine</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Value</th>
              <th className="px-5 py-3">Duration</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t) => (
              <tr key={t.id} className="border-t border-border hover:bg-surface-warm/50">
                <td className="px-5 py-3 font-mono text-xs">{t.task_id}</td>
                <td className="px-5 py-3 text-xs text-muted">{new Date(t.started_at).toLocaleString()}</td>
                <td className="px-5 py-3 font-mono text-xs">{t.machines?.machine_id ?? "—"}</td>
                <td className="px-5 py-3 text-muted">{t.task_categories?.name ?? "—"}</td>
                <td className="px-5 py-3 text-muted">{t.measured_value ? `${t.measured_value} ${t.measured_unit ?? ""}` : "—"}</td>
                <td className="px-5 py-3 text-muted">{t.duration_seconds ? `${t.duration_seconds}s` : "—"}</td>
                <td className="px-5 py-3">
                  <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${t.status === "completed" ? "bg-success" : t.status === "in_progress" ? "bg-warning" : "bg-danger"}`} />
                  {t.status}
                </td>
              </tr>
            ))}
            {tasks.length === 0 && (
              <tr><td colSpan={7} className="px-5 py-8 text-center text-muted">No tasks recorded</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
