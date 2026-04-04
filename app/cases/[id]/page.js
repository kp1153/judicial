export const dynamic = "force-dynamic";
import { requireAccess } from "@/lib/access";
import { db } from "@/lib/db";
import { cases, clients, hearings, fees } from "@/lib/schema";
import { eq, and } from "drizzle-orm";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import AddHearingForm from "@/components/AddHearingForm";
import AddFeeForm from "@/components/AddFeeForm";

export default async function CaseDetailPage({ params }) {
  const { id } = await params;
  const session = await requireAccess();
  const userId = session.userId;

  const caseRow = await db.select().from(cases).where(and(eq(cases.id, parseInt(id)), eq(cases.userId, userId))).limit(1);
  if (!caseRow[0]) return <div className="p-8 text-white">Case नहीं मिला।</div>;

  const c = caseRow[0];

  const client = await db.select().from(clients).where(eq(clients.id, c.clientId)).limit(1);
  const allHearings = await db.select().from(hearings).where(eq(hearings.caseId, c.id));
  const allFees = await db.select().from(fees).where(eq(fees.caseId, c.id));

  const totalCharged = allFees.reduce((s, f) => s + f.amount, 0);
  const totalPaid = allFees.reduce((s, f) => s + f.paid, 0);
  const totalDue = totalCharged - totalPaid;

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');
        .hero-font { font-family: 'Playfair Display', Georgia, serif; }
        .body-font { font-family: 'DM Sans', sans-serif; }
        .gold { color: #c9a84c; }
        .card-dark { background: rgba(255,255,255,0.04); border: 1px solid rgba(201,168,76,0.15); }
        .cta-primary { background: linear-gradient(135deg, #c9a84c 0%, #e8c96a 50%, #c9a84c 100%); color: #0a0a0f; font-weight: 700; }
        .section-divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent); margin: 24px 0; }
      `}</style>

      <nav className="body-font sticky top-0 z-50 border-b border-white/5 px-6 py-3 flex items-center justify-between" style={{ background: 'rgba(10,10,15,0.95)', backdropFilter: 'blur(12px)' }}>
        <Link href="/dashboard" className="text-gray-400 hover:text-white text-sm transition">← Dashboard</Link>
        <LogoutButton />
      </nav>

      <div className="max-w-3xl mx-auto p-6">

        {/* Case Header */}
        <div className="card-dark rounded-2xl p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="hero-font text-2xl font-black text-white mb-1">{c.title}</h1>
              <p className="body-font text-gray-400 text-sm">{c.court} {c.courtType ? `· ${c.courtType}` : ""}</p>
            </div>
            <span className={`body-font text-xs px-3 py-1 rounded-full border ${c.status === "active" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-gray-500/10 text-gray-400 border-gray-500/20"}`}>
              {c.status}
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm body-font">
            {c.caseNumber && <div><span className="text-gray-500 text-xs">Case No.</span><div className="text-white">{c.caseNumber}</div></div>}
            {c.oppositeParty && <div><span className="text-gray-500 text-xs">Opposite Party</span><div className="text-white">{c.oppositeParty}</div></div>}
            {c.oppositeAdvocate && <div><span className="text-gray-500 text-xs">Opp. Advocate</span><div className="text-white">{c.oppositeAdvocate}</div></div>}
            {c.filingDate && <div><span className="text-gray-500 text-xs">Filing Date</span><div className="text-white">{c.filingDate}</div></div>}
            {c.nextDate && <div><span className="text-gray-500 text-xs">अगली तारीख</span><div className="text-yellow-400 font-semibold">{c.nextDate}</div></div>}
            {c.caseType && <div><span className="text-gray-500 text-xs">Type</span><div className="text-white">{c.caseType}</div></div>}
          </div>
          {c.notes && <p className="body-font text-gray-400 text-sm mt-4 border-t border-white/5 pt-4">{c.notes}</p>}
          {client[0] && (
            <div className="mt-4 border-t border-white/5 pt-4">
              <span className="body-font text-gray-500 text-xs">Client: </span>
              <span className="body-font text-white text-sm font-semibold">{client[0].name}</span>
              {client[0].phone && <span className="body-font text-gray-400 text-sm"> · {client[0].phone}</span>}
            </div>
          )}
        </div>

        {/* Fee Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Charged", value: `₹${totalCharged.toLocaleString()}`, color: "text-white" },
            { label: "Received", value: `₹${totalPaid.toLocaleString()}`, color: "text-green-400" },
            { label: "Due", value: `₹${totalDue.toLocaleString()}`, color: totalDue > 0 ? "text-red-400" : "text-green-400" },
          ].map((s, i) => (
            <div key={i} className="card-dark rounded-xl p-4 text-center">
              <div className={`hero-font text-xl font-black ${s.color}`}>{s.value}</div>
              <div className="body-font text-gray-500 text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="section-divider" />

        {/* Hearings */}
        <div className="mb-8">
          <h2 className="hero-font text-xl font-bold mb-4">📅 Hearings</h2>
          {allHearings.length === 0 ? (
            <p className="body-font text-gray-500 text-sm mb-4">अभी कोई hearing नहीं है।</p>
          ) : (
            <div className="flex flex-col gap-3 mb-4">
              {allHearings.sort((a, b) => b.date.localeCompare(a.date)).map((h) => (
                <div key={h.id} className="card-dark rounded-xl p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="body-font text-yellow-400 font-semibold text-sm">{h.date}</span>
                    {h.nextDate && <span className="body-font text-xs text-gray-400">अगली: {h.nextDate}</span>}
                  </div>
                  {h.outcome && <p className="body-font text-gray-300 text-sm">{h.outcome}</p>}
                  {h.notes && <p className="body-font text-gray-500 text-xs mt-1">{h.notes}</p>}
                </div>
              ))}
            </div>
          )}
          <AddHearingForm caseId={c.id} />
        </div>

        <div className="section-divider" />

        {/* Fees */}
        <div>
          <h2 className="hero-font text-xl font-bold mb-4">💰 Fee Ledger</h2>
          {allFees.length === 0 ? (
            <p className="body-font text-gray-500 text-sm mb-4">अभी कोई fee entry नहीं है।</p>
          ) : (
            <div className="flex flex-col gap-3 mb-4">
              {allFees.map((f) => (
                <div key={f.id} className="card-dark rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <div className="body-font text-white font-semibold text-sm">₹{f.amount.toLocaleString()} charged</div>
                    <div className="body-font text-green-400 text-xs">₹{f.paid.toLocaleString()} received · ₹{f.due.toLocaleString()} due</div>
                    {f.note && <div className="body-font text-gray-500 text-xs mt-0.5">{f.note}</div>}
                  </div>
                  <div className="text-right">
                    <div className="body-font text-gray-500 text-xs">{f.mode}</div>
                    {f.paymentDate && <div className="body-font text-gray-500 text-xs">{f.paymentDate}</div>}
                  </div>
                </div>
              ))}
            </div>
          )}
          <AddFeeForm caseId={c.id} clientId={c.clientId} />
        </div>

      </div>
    </main>
  );
}