"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');
  .hf { font-family: 'Playfair Display', Georgia, serif; }
  .bf { font-family: 'DM Sans', sans-serif; }
  .gold { color: #c9a84c; }
  .inp { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 10px 14px; color: #fff; font-size: 14px; width: 100%; outline: none; transition: border-color 0.2s; }
  .inp:focus { border-color: rgba(201,168,76,0.5); }
  .btn { background: linear-gradient(135deg, #c9a84c 0%, #e8c96a 50%, #c9a84c 100%); color: #0a0a0f; font-weight: 700; }
`;

export default function NewClientPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", aadhar: "", notes: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    if (!form.name.trim()) { setError("Name is required."); return; }
    setLoading(true);
    const res = await fetch("/api/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      router.push("/clients");
    } else {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  const fields = [
    { key: "name", label: "Full Name *", placeholder: "Client's full name" },
    { key: "phone", label: "Phone Number", placeholder: "10-digit mobile number" },
    { key: "email", label: "Email Address", placeholder: "email@example.com" },
    { key: "address", label: "Address", placeholder: "Full address" },
    { key: "aadhar", label: "Aadhar Number", placeholder: "12-digit Aadhar number" },
  ];

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <style>{S}</style>

      <nav className="bf sticky top-0 z-50 border-b border-white/5 px-6 py-3 flex items-center gap-4" style={{ background: "rgba(10,10,15,0.95)", backdropFilter: "blur(12px)" }}>
        <a href="/clients" className="text-gray-400 hover:text-white text-sm transition">← Clients</a>
        <span className="hf text-base font-bold gold">New Client</span>
      </nav>

      <div className="max-w-xl mx-auto p-6">
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

          <div>
            <label className="bf text-xs text-gray-400 mb-1 block">Notes</label>
            <textarea
              className="inp bf"
              rows={3}
              placeholder="Any relevant notes..."
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </div>

          {error && <p className="bf text-red-400 text-sm">{error}</p>}

          <button onClick={handleSubmit} disabled={loading} className="btn bf py-3 rounded-xl text-sm mt-2 disabled:opacity-50">
            {loading ? "Saving..." : "Save Client"}
          </button>
        </div>
      </div>
    </main>
  );
}