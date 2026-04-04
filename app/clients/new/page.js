"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewClientPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", aadhar: "", notes: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    if (!form.name.trim()) { setError("नाम ज़रूरी है।"); return; }
    setLoading(true);
    const res = await fetch("/api/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      router.push("/clients");
    } else {
      setError("कुछ गलत हुआ। दोबारा कोशिश करो।");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');
        .hero-font { font-family: 'Playfair Display', Georgia, serif; }
        .body-font { font-family: 'DM Sans', sans-serif; }
        .gold { color: #c9a84c; }
        .input-dark {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 10px 14px;
          color: #fff;
          font-size: 14px;
          width: 100%;
          outline: none;
          transition: border-color 0.2s;
        }
        .input-dark:focus { border-color: rgba(201,168,76,0.5); }
        .cta-primary { background: linear-gradient(135deg, #c9a84c 0%, #e8c96a 50%, #c9a84c 100%); color: #0a0a0f; font-weight: 700; }
      `}</style>

      <nav className="body-font sticky top-0 z-50 border-b border-white/5 px-6 py-3 flex items-center gap-4" style={{ background: 'rgba(10,10,15,0.95)', backdropFilter: 'blur(12px)' }}>
        <a href="/clients" className="text-gray-400 hover:text-white text-sm transition">← Clients</a>
        <span className="hero-font text-base font-bold gold">नया Client</span>
      </nav>

      <div className="max-w-xl mx-auto p-6">
        <div className="flex flex-col gap-4">
          {[
            { key: "name", label: "नाम *", placeholder: "मुवक्किल का पूरा नाम" },
            { key: "phone", label: "फोन", placeholder: "10-digit mobile number" },
            { key: "email", label: "Email", placeholder: "email@example.com" },
            { key: "address", label: "पता", placeholder: "पूरा पता" },
            { key: "aadhar", label: "Aadhar No.", placeholder: "12-digit Aadhar number" },
          ].map((field) => (
            <div key={field.key}>
              <label className="body-font text-xs text-gray-400 mb-1 block">{field.label}</label>
              <input
                className="input-dark body-font"
                placeholder={field.placeholder}
                value={form[field.key]}
                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
              />
            </div>
          ))}

          <div>
            <label className="body-font text-xs text-gray-400 mb-1 block">Notes</label>
            <textarea
              className="input-dark body-font"
              rows={3}
              placeholder="कोई ज़रूरी जानकारी..."
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </div>

          {error && <p className="body-font text-red-400 text-sm">{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="cta-primary body-font py-3 rounded-xl text-sm mt-2 disabled:opacity-50"
          >
            {loading ? "Save हो रहा है..." : "Client Save करो"}
          </button>
        </div>
      </div>
    </main>
  );
}