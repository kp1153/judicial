"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const COURTS = [
  "जिला अदालत", "सत्र न्यायालय", "High Court", "Supreme Court",
  "Consumer Forum", "RERA", "NCLT", "Family Court", "Labour Court", "Revenue Court",
];

const CASE_TYPES = [
  "Civil", "Criminal", "Family", "Property", "Labour", "Consumer", "Revenue", "Other",
];

export default function NewCasePage() {
  const router = useRouter();
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({
    clientId: "",
    title: "",
    caseNumber: "",
    court: "",
    courtType: "",
    oppositeParty: "",
    oppositeAdvocate: "",
    filingDate: "",
    nextDate: "",
    caseType: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/clients").then((r) => r.json()).then((data) => setClients(data.clients || []));
  }, []);

  async function handleSubmit() {
    if (!form.title.trim() || !form.court || !form.clientId) {
      setError("Title, Court और Client ज़रूरी हैं।");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/cases", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, clientId: parseInt(form.clientId) }),
    });
    if (res.ok) {
      const data = await res.json();
      router.push(`/cases/${data.case.id}`);
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
        .input-dark option { background: #1a1206; }
        .cta-primary { background: linear-gradient(135deg, #c9a84c 0%, #e8c96a 50%, #c9a84c 100%); color: #0a0a0f; font-weight: 700; }
      `}</style>

      <nav className="body-font sticky top-0 z-50 border-b border-white/5 px-6 py-3 flex items-center gap-4" style={{ background: 'rgba(10,10,15,0.95)', backdropFilter: 'blur(12px)' }}>
        <a href="/dashboard" className="text-gray-400 hover:text-white text-sm transition">← Dashboard</a>
        <span className="hero-font text-base font-bold gold">नया Case</span>
      </nav>

      <div className="max-w-xl mx-auto p-6">
        <div className="flex flex-col gap-4">

          <div>
            <label className="body-font text-xs text-gray-400 mb-1 block">Client *</label>
            <select className="input-dark body-font" value={form.clientId} onChange={(e) => setForm({ ...form, clientId: e.target.value })}>
              <option value="">Client चुनो</option>
              {clients.map((c) => <option key={c.id} value={c.id}>{c.name} {c.phone ? `· ${c.phone}` : ""}</option>)}
            </select>
            {clients.length === 0 && <p className="body-font text-xs text-yellow-500 mt-1">पहले <a href="/clients/new" className="underline">Client बनाओ</a></p>}
          </div>

          <div>
            <label className="body-font text-xs text-gray-400 mb-1 block">Case Title *</label>
            <input className="input-dark body-font" placeholder="जैसे: Ram vs State of UP" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>

          <div>
            <label className="body-font text-xs text-gray-400 mb-1 block">Case Number</label>
            <input className="input-dark body-font" placeholder="जैसे: Cr. Case No. 123/2024" value={form.caseNumber} onChange={(e) => setForm({ ...form, caseNumber: e.target.value })} />
          </div>

          <div>
            <label className="body-font text-xs text-gray-400 mb-1 block">Court *</label>
            <select className="input-dark body-font" value={form.court} onChange={(e) => setForm({ ...form, court: e.target.value })}>
              <option value="">Court चुनो</option>
              {COURTS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="body-font text-xs text-gray-400 mb-1 block">Court Location</label>
            <input className="input-dark body-font" placeholder="जैसे: Lucknow, Varanasi" value={form.courtType} onChange={(e) => setForm({ ...form, courtType: e.target.value })} />
          </div>

          <div>
            <label className="body-font text-xs text-gray-400 mb-1 block">Case Type</label>
            <select className="input-dark body-font" value={form.caseType} onChange={(e) => setForm({ ...form, caseType: e.target.value })}>
              <option value="">Type चुनो</option>
              {CASE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div>
            <label className="body-font text-xs text-gray-400 mb-1 block">Opposite Party</label>
            <input className="input-dark body-font" placeholder="विपक्षी पार्टी का नाम" value={form.oppositeParty} onChange={(e) => setForm({ ...form, oppositeParty: e.target.value })} />
          </div>

          <div>
            <label className="body-font text-xs text-gray-400 mb-1 block">Opposite Advocate</label>
            <input className="input-dark body-font" placeholder="विपक्षी वकील का नाम" value={form.oppositeAdvocate} onChange={(e) => setForm({ ...form, oppositeAdvocate: e.target.value })} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="body-font text-xs text-gray-400 mb-1 block">Filing Date</label>
              <input type="date" className="input-dark body-font" value={form.filingDate} onChange={(e) => setForm({ ...form, filingDate: e.target.value })} />
            </div>
            <div>
              <label className="body-font text-xs text-gray-400 mb-1 block">अगली तारीख</label>
              <input type="date" className="input-dark body-font" value={form.nextDate} onChange={(e) => setForm({ ...form, nextDate: e.target.value })} />
            </div>
          </div>

          <div>
            <label className="body-font text-xs text-gray-400 mb-1 block">Notes</label>
            <textarea className="input-dark body-font" rows={3} placeholder="Case के बारे में कोई ज़रूरी जानकारी..." value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          </div>

          {error && <p className="body-font text-red-400 text-sm">{error}</p>}

          <button onClick={handleSubmit} disabled={loading} className="cta-primary body-font py-3 rounded-xl text-sm mt-2 disabled:opacity-50">
            {loading ? "Save हो रहा है..." : "Case Save करो"}
          </button>
        </div>
      </div>
    </main>
  );
}