export const dynamic = "force-dynamic";
import { requireAccess } from "@/lib/access";
import { db } from "@/lib/db";
import { clients } from "@/lib/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

export default async function ClientsPage() {
  const session = await requireAccess();
  const userId = session.userId;

  const allClients = await db.select().from(clients).where(eq(clients.userId, userId));

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');
        .hf { font-family: 'Playfair Display', Georgia, serif; }
        .bf { font-family: 'DM Sans', sans-serif; }
        .gold { color: #c9a84c; }
        .card { background: rgba(255,255,255,0.04); border: 1px solid rgba(201,168,76,0.15); transition: all 0.2s; }
        .card:hover { background: rgba(201,168,76,0.06); border-color: rgba(201,168,76,0.3); }
        .btn { background: linear-gradient(135deg, #c9a84c 0%, #e8c96a 50%, #c9a84c 100%); color: #0a0a0f; font-weight: 700; }
      `}</style>

      <nav className="bf sticky top-0 z-50 border-b border-white/5 px-6 py-3 flex items-center justify-between" style={{ background: "rgba(10,10,15,0.95)", backdropFilter: "blur(12px)" }}>
        <Link href="/dashboard" className="hf text-lg font-black">⚖️ <span className="gold">Legal</span> Pro</Link>
        <div className="flex items-center gap-4">
          <span className="bf text-gray-400 text-sm">{session.name}</span>
          <LogoutButton />
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="hf text-2xl font-black">Clients</h1>
          <Link href="/clients/new" className="btn bf text-sm px-5 py-2.5 rounded-xl">+ New Client</Link>
        </div>

        {allClients.length === 0 ? (
          <div className="card rounded-2xl p-12 text-center">
            <div className="text-4xl mb-4">👤</div>
            <p className="bf text-gray-400 text-sm mb-4">No clients yet.</p>
            <Link href="/clients/new" className="btn bf inline-block text-sm px-6 py-2.5 rounded-xl">Add First Client</Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {allClients.map((c) => (
              <div key={c.id} className="card rounded-2xl p-5 flex items-center justify-between">
                <div>
                  <div className="bf font-semibold text-white">{c.name}</div>
                  <div className="bf text-gray-400 text-xs mt-0.5">{c.phone || "—"} · {c.email || "—"}</div>
                </div>
                <div className="flex gap-2">
                  <a href={c.phone ? `tel:${c.phone}` : "#"} className="bf text-xs px-3 py-1.5 rounded-lg border border-green-500/30 text-green-400 hover:bg-green-500/10 transition">📞 Call</a>
                  <a href={c.phone ? `https://wa.me/91${c.phone}` : "#"} target="_blank" rel="noopener noreferrer" className="bf text-xs px-3 py-1.5 rounded-lg border border-green-500/30 text-green-400 hover:bg-green-500/10 transition">💬 WA</a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}