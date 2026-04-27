"use client";
import { useEffect, useState } from "react";

export default function ExpiredPage() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (data?.user?.email) setEmail(data.user.email);
      })
      .catch(() => {});
  }, []);

  const paymentUrl = `https://nishantsoftwares.in/payment?software=legal${email ? "&email=" + encodeURIComponent(email) : ""}`;

  return (
    <main style={{ minHeight: "100vh", background: "#0a0f1e", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
      <div style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: "24px", padding: "40px 32px", width: "100%", maxWidth: "400px", textAlign: "center" }}>
        <div style={{ fontSize: "52px", marginBottom: "12px" }}>⏰</div>
        <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#fff", marginBottom: "8px" }}>ट्रायल समाप्त</h1>
        <p style={{ color: "#9ca3af", fontSize: "15px", marginBottom: "24px" }}>
          आपका ७ दिन का निःशुल्क ट्रायल समाप्त हो गया है। Judicial Pro आगे चलाने के लिए कृपया लाइसेंस खरीदें।
        </p>
        <div style={{ background: "#1f2937", borderRadius: "16px", padding: "20px", marginBottom: "24px" }}>
          <p style={{ color: "#9ca3af", fontSize: "13px", margin: "0 0 4px" }}>Judicial Pro License</p>
          <p style={{ fontSize: "36px", fontWeight: "800", color: "#f59e0b", margin: "0 0 4px" }}>
            ₹4,999 <span style={{ fontSize: "14px", fontWeight: "400", color: "#6b7280" }}>/साल</span>
          </p>
          <p style={{ color: "#6b7280", fontSize: "12px", margin: 0 }}>नवीनीकरण: ₹2,500/साल</p>
        </div>
        <a href={paymentUrl} style={{ display: "block", width: "100%", padding: "14px", background: "#f59e0b", color: "#000", fontSize: "16px", fontWeight: "700", borderRadius: "14px", textDecoration: "none", marginBottom: "12px" }}>
          अभी खरीदें — ₹4,999
        </a>
        <a href="https://wa.me/919996865069" target="_blank" rel="noopener noreferrer" style={{ display: "block", width: "100%", padding: "14px", background: "#25d366", color: "#fff", fontSize: "16px", fontWeight: "700", borderRadius: "14px", textDecoration: "none", marginBottom: "20px" }}>
          WhatsApp सहायता
        </a>
        <a href="/login" style={{ color: "#6b7280", fontSize: "13px" }}>Back to Login</a>
      </div>
    </main>
  );
}