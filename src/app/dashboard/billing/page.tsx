"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Invoice {
  id: string;
  invoice_number: string;
  status: string;
  total_amount: number;
  period_start: string;
  period_end: string;
  due_date: string;
  businesses: { name: string } | null;
}

const statusStyle: Record<string, string> = {
  paid: "bg-success/10 text-success",
  pending: "bg-warning/10 text-warning",
  overdue: "bg-danger/10 text-danger",
  draft: "bg-border text-muted",
};

export default function BillingPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase
        .from("invoices")
        .select("id, invoice_number, status, total_amount, period_start, period_end, due_date, businesses(name)")
        .order("due_date", { ascending: false });
      setInvoices((data as unknown as Invoice[]) ?? []);
      setLoading(false);
    }
    fetch();
  }, []);

  if (loading) return <div className="text-muted text-sm p-8">Loading...</div>;

  return (
    <div>
      <h1 className="text-[22px] font-bold mb-6">Billing & Invoices</h1>
      <div className="bg-surface border border-border rounded-md">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-left text-[11px] font-semibold text-muted uppercase tracking-wider border-b border-border">
              <th className="px-5 py-3">Invoice #</th>
              <th className="px-5 py-3">Business</th>
              <th className="px-5 py-3">Period</th>
              <th className="px-5 py-3">Due Date</th>
              <th className="px-5 py-3">Amount</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className="border-t border-border hover:bg-surface-warm/50">
                <td className="px-5 py-3 font-mono text-xs">{inv.invoice_number}</td>
                <td className="px-5 py-3 font-medium">{inv.businesses?.name ?? "—"}</td>
                <td className="px-5 py-3 text-muted text-xs">
                  {new Date(inv.period_start).toLocaleDateString()} – {new Date(inv.period_end).toLocaleDateString()}
                </td>
                <td className="px-5 py-3 text-muted text-xs">{new Date(inv.due_date).toLocaleDateString()}</td>
                <td className="px-5 py-3 font-mono">${inv.total_amount.toLocaleString()}</td>
                <td className="px-5 py-3">
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${statusStyle[inv.status] ?? "bg-border text-muted"}`}>
                    {inv.status}
                  </span>
                </td>
              </tr>
            ))}
            {invoices.length === 0 && (
              <tr><td colSpan={6} className="px-5 py-8 text-center text-muted">No invoices</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
