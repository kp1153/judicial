"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const path = usePathname();
  const links = [
    { href: "/dashboard", icon: "📊", label: "Dashboard" },
    { href: "/cases/new", icon: "➕", label: "New Case" },
    { href: "/clients", icon: "👤", label: "Clients" },
    { href: "/settings", icon: "⚙️", label: "Settings" },
  ];
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 flex" style={{ background: "rgba(10,10,15,0.98)" }}>
      {links.map((l) => (
        <Link key={l.href} href={l.href} className="flex-1 flex flex-col items-center justify-center py-3 gap-0.5" style={{ color: path === l.href ? "#c9a84c" : "#666" }}>
          <span style={{ fontSize: "20px" }}>{l.icon}</span>
          <span style={{ fontSize: "10px", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>{l.label}</span>
        </Link>
      ))}
    </nav>
  );
}
