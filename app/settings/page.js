"use client";
import { useState, useEffect } from "react";

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');
  .hf { font-family: 'Playfair Display', Georgia, serif; }
  .bf { font-family: 'DM Sans', sans-serif; }
  .gold { color: #c9a84c; }
  .inp { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 10px 14px; color: #fff; font-size: 14px; width: 100%; outline: none; transition: border-color 0.2s; }
  .inp:focus { border-color: rgba(201,168,76,0.5); }
  .btn { background: linear-gradient(135deg, #c9a84c 0%, #e8c96a 50%, #c9a84c 100%); color: #0a0a0f; font-weight: 700; }
`;

export default function SettingsPage() {
  const [form, setForm] = useState({
    lawyerName: "", firmName: "", phone: "", email: "",
    address: "", barCouncilNumber: "", enrollmentNumber: "", highCourt: "",
  });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/settings").then((r) => r.json()).then((d) => {
      if (d.settings) setForm({
        lawyerName: d.settings.lawyerName || "",
        firmName: d.settings.firmName || "",
        phone: d.settings.phone || "",
        email: d.settings.email || "",
        address: d.settings.address || "",
        barCouncilNumber: d.settings.barCouncilNumber || "",
        enrollmentNumber: d.settings.enrollmentNumber || "",
        highCourt: d.settings.highCourt || "",
      });
    });
  }, []);

  async function handleSave() {
    setLoading(true);
    await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const fields = [
    { key: "lawyerName", label: "Your Full Name", placeholder: "Adv. Rajesh Kumar" },
    { key: "firmName", label: "Chamber / Firm Name", placeholder: "Kumar & Associates" },
    { key: "phone", label: "Phone Number", placeholder: "10-digit mobile" },
    { key: "email", label: "Email Address", placeholder: "you@example.com" },
    { key: "barCouncilNumber", label: "Bar Council Number", placeholder: "UP/123/2010" },
    { key: "enrollmentNumber", label: "Enrollment Number", placeholder: "Optional" },
    { key: "highCourt", label: "Primary High Court", placeholder: "Allahabad High Court" },
    { key: "address", label: "Chamber Address", placeholder: "Full address" },
  ];

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <style>{S}</style>

      <nav className="bf sticky top-0 z-50 border-b border-white/5 px-6 py-3 flex items-center justify-between" style={{ background: "rgba(10,10,15,0.95)", backdropFilter: "blur(12px)" }}>
        <a href="/dashboard" className="text-gray-400 hover:text-white text-sm transition">← Dashboard</a>
        <span className="hf text-base font-bold gold">Settings</span>
      </nav>

      <div className="max-w-xl mx-auto p-6">
        <h1 className="hf text-2xl font-black mb-6">Practice Settings</h1>

        <div className="flex flex-col gap-4">
          {fields.map((f) => (
            <div key={f.key}>
              <label className="bf text-xs text-gray-400 mb-1 block">{f.label}</label>
              <input
                className="inp bf"
                placeholder={f.placeholder}
                value={form[f.key]}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
              />
            </div>
          ))}

          <button onClick={handleSave} disabled={loading} className="btn bf py-3 rounded-xl text-sm mt-2 disabled:opacity-50">
            {loading ? "Saving..." : saved ? "✓ Saved" : "Save Settings"}
          </button>
        </div>
      </div>
    </main>
  );
}