export const dynamic = "force-dynamic";
import { requireAccess } from "@/lib/access";
import { db } from "@/lib/db";
import { cases, clients, hearings } from "@/lib/schema";
import { eq, and, gte, lte } from "drizzle-orm";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

export default async function Dashboard() {
  const session = await requireAccess();

  const userId = session.userId;

  const allCases = await db.select().from(cases).where(eq(cases.userId, userId));
  const allClients = await db.select().from(clients).where(eq(clients.userId, userId));

  const today = new Date().toISOString().split("T")[0];
  const todayCases = allCases.filter((c) => c.nextDate === today);
  const activeCases = allCases.filter((c) => c.status === "active");

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');
        .hero-font { font-family: 'Playfair Display', Georgia, serif; }
        .body-font { font-family: 'DM Sans', sans-serif; }
        .gold { color: #c9a84c; }
        .card-dark { background: rgba(255,255,255,0.04); border: 1px solid rgba(201,168,76,0.15); }
        .card-dark:hover { background: rgba(201,168,76,0.06); border-color: rgba(201,168,76,0.3); }
        .cta-primary {
          background: linear-gradient(135deg, #c9a84c 0%, #e8c96a 50%, #c9a84c 100%);
          color: #0a0a0f; font-weight: 700;
        }
        .sidebar-link { display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-radius: 10px; font-size: 14px; color: #aaa; transition: all 0.2s; }
        .sidebar-link:hover { background: rgba(201,168,76,0.08); color: #c9a84c; }
        .sidebar-link.active { background: rgba(201,168,76,0.12); color: #c9a84c; }
      `}</style>

      {/* Top Nav */}
      <nav className="body-font sticky top-0 z-50 border-b border-white/5 px-6 py-3 flex items-center justify-between" style={{ background: 'rgba(10,10,15,0.95)', backdropFilter: 'blur(12px)' }}>
        <span className="hero-font text-lg font-black">⚖️ <span className="gold">Legal</span> Pro</span>
        <div className="flex items-center gap-4">
          <span className="body-font text-gray-400 text-sm">{session.name}</span>
          <LogoutButton />
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-56 min-h-screen border-r border-white/5 p-4 body-font hidden md:block">
          <nav className="flex flex-col gap-1">
            <Link href="/dashboard" className="sidebar-link active">📊 Dashboard</Link>
            <Link href="/cases/new" className="sidebar-link">➕ नया Case</Link>
            <Link href="/clients" className="sidebar-link">👤 Clients</Link>
            <Link href="/clients/new" className="sidebar-link">➕ नया Client</Link>
          </nav>
        </aside>

        {/* Main */}
        <div className="flex-1 p-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "कुल Cases", value: allCases.length, icon: "⚖️" },
              { label: "Active Cases", value: activeCases.length, icon: "🟢" },
              { label: "आज की पेशी", value: todayCases.length, icon: "📅" },
              { label: "Clients", value: allClients.length, icon: "👤" },
            ].map((s, i) => (
              <div key={i} className="card-dark rounded-2xl p-5 transition">
                <div className="text-2xl mb-2">{s.icon}</div>
                <div className="hero-font text-3xl font-black gold">{s.value}</div>
                <div className="body-font text-gray-400 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Today's Cause List */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="hero-font text-xl font-bold">📅 आज की Cause List</h2>
              <span className="body-font text-xs text-gray-500">{today}</span>
            </div>
            {todayCases.length === 0 ? (
              <div className="card-dark rounded-2xl p-8 text-center">
                <p className="body-font text-gray-500 text-sm">आज कोई पेशी नहीं है।</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {todayCases.map((c) => (
                  <Link key={c.id} href={`/cases/${c.id}`} className="card-dark rounded-2xl p-4 flex items-center justify-between hover:border-yellow-500/30 transition">
                    <div>
                      <div className="body-font font-semibold text-white text-sm">{c.title}</div>
                      <div className="body-font text-gray-400 text-xs mt-0.5">{c.court} · {c.caseNumber || "No. pending"}</div>
                    </div>
                    <span className="body-font text-xs px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">आज</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Recent Cases */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="hero-font text-xl font-bold">⚖️ Recent Cases</h2>
              <Link href="/cases/new" className="cta-primary body-font text-xs px-4 py-2 rounded-lg">+ नया Case</Link>
            </div>
            {allCases.length === 0 ? (
              <div className="card-dark rounded-2xl p-8 text-center">
                <p className="body-font text-gray-500 text-sm mb-4">अभी कोई case नहीं है।</p>
                <Link href="/cases/new" className="cta-primary body-font inline-block text-sm px-6 py-2.5 rounded-xl">पहला Case बनाओ</Link>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {allCases.slice(0, 10).map((c) => (
                  <Link key={c.id} href={`/cases/${c.id}`} className="card-dark rounded-2xl p-4 flex items-center justify-between transition">
                    <div>
                      <div className="body-font font-semibold text-white text-sm">{c.title}</div>
                      <div className="body-font text-gray-400 text-xs mt-0.5">{c.court} · vs {c.oppositeParty || "—"}</div>
                    </div>
                    <div className="text-right">
                      <span className={`body-font text-xs px-3 py-1 rounded-full border ${c.status === "active" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-gray-500/10 text-gray-400 border-gray-500/20"}`}>
                        {c.status}
                      </span>
                      {c.nextDate && <div className="body-font text-xs text-gray-500 mt-1">{c.nextDate}</div>}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}