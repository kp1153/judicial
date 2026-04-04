"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddHearingForm({ caseId }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ date: "", nextDate: "", outcome: "", notes: "" });
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!form.date) return;
    setLoading(true);
    await fetch("/api/hearings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, caseId }),
    });
    setLoading(false);
    setOpen(false);
    setForm({ date: "", nextDate: "", outcome: "", notes: "" });
    router.refresh();
  }

  return (
    <div>
      <style>{`
        .body-font { font-family: 'DM Sans', sans-serif; }
        .input-dark { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 10px 14px; color: #fff; font-size: 14px; width: 100%; outline: none; }
        .input-dark:focus { border-color: rgba(201,168,76,0.5); }
        .cta-primary { background: linear-gradient(135deg, #c9a84c 0%, #e8c96a 50%, #c9a84c 100%); color: #0a0a0f; font-weight: 700; }
      `}</style>

      {!open ? (
        <button onClick={() => setOpen(true)} className="cta-primary body-font text-sm px-5 py-2.5 rounded-xl">
          + Hearing Add करो
        </button>
      ) : (
        <div className="flex flex-col gap-3 p-4 rounded-2xl border border-yellow-500/20 bg-yellow-500/5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="body-font text-xs text-gray-400 mb-1 block">आज की तारीख *</label>
              <input type="date" className="input-dark body-font" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </div>
            <div>
              <label className="body-font text-xs text-gray-400 mb-1 block">अगली तारीख</label>
              <input type="date" className="input-dark body-font" value={form.nextDate} onChange={(e) => setForm({ ...form, nextDate: e.target.value })} />
            </div>
          </div>
          <div>
            <label className="body-font text-xs text-gray-400 mb-1 block">क्या हुआ (Outcome)</label>
            <input className="input-dark body-font" placeholder="जैसे: Bail granted, next date for arguments" value={form.outcome} onChange={(e) => setForm({ ...form, outcome: e.target.value })} />
          </div>
          <div>
            <label className="body-font text-xs text-gray-400 mb-1 block">Notes</label>
            <textarea className="input-dark body-font" rows={2} placeholder="विस्तार से लिखो..." value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
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