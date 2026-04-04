"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddFeeForm({ caseId, clientId }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ amount: "", paid: "", mode: "cash", paymentDate: "", note: "" });
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!form.amount) return;
    setLoading(true);
    const amount = parseFloat(form.amount) || 0;
    const paid = parseFloat(form.paid) || 0;
    await fetch("/api/fees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, amount, paid, due: amount - paid, caseId, clientId }),
    });
    setLoading(false);
    setOpen(false);
    setForm({ amount: "", paid: "", mode: "cash", paymentDate: "", note: "" });
    router.refresh();
  }

  return (
    <div>
      <style>{`
        .body-font { font-family: 'DM Sans', sans-serif; }
        .input-dark { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 10px 14px; color: #fff; font-size: 14px; width: 100%; outline: none; }
        .input-dark:focus { border-color: rgba(201,168,76,0.5); }
        .input-dark option { background: #1a1206; }
        .cta-primary { background: linear-gradient(135deg, #c9a84c 0%, #e8c96a 50%, #c9a84c 100%); color: #0a0a0f; font-weight: 700; }
      `}</style>

      {!open ? (
        <button onClick={() => setOpen(true)} className="cta-primary body-font text-sm px-5 py-2.5 rounded-xl">
          + Fee Entry करो
        </button>
      ) : (
        <div className="flex flex-col gap-3 p-4 rounded-2xl border border-yellow-500/20 bg-yellow-500/5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="body-font text-xs text-gray-400 mb-1 block">Total Charged (₹) *</label>
              <input type="number" className="input-dark body-font" placeholder="5000" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
            </div>
            <div>
              <label className="body-font text-xs text-gray-400 mb-1 block">Received (₹)</label>
              <input type="number" className="input-dark body-font" placeholder="0" value={form.paid} onChange={(e) => setForm({ ...form, paid: e.target.value })} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="body-font text-xs text-gray-400 mb-1 block">Payment Mode</label>
              <select className="input-dark body-font" value={form.mode} onChange={(e) => setForm({ ...form, mode: e.target.value })}>
                <option value="cash">Cash</option>
                <option value="upi">UPI</option>
                <option value="bank">Bank Transfer</option>
                <option value="cheque">Cheque</option>
              </select>
            </div>
            <div>
              <label className="body-font text-xs text-gray-400 mb-1 block">Date</label>
              <input type="date" className="input-dark body-font" value={form.paymentDate} onChange={(e) => setForm({ ...form, paymentDate: e.target.value })} />
            </div>
          </div>
          <div>
            <label className="body-font text-xs text-gray-400 mb-1 block">Note</label>
            <input className="input-dark body-font" placeholder="जैसे: Retainer fee, Hearing fee" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
          </div>
          <div className="flex gap-3">
            <button onClick={handleSubmit} disabled={loading} className="cta-primary body-font text-sm px-5 py-2.5 rounded-xl flex-1 disabled:opacity-50">
              {loading ? "Save..." : "Save करो"}
            </button>
            <button onClick={() => setOpen(false)} className="body-font text-sm px-5 py-2.5 rounded-xl border border-white/10 text-gray-400 hover:text-white transition">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}