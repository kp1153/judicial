import AuthProvider from "@/components/AuthProvider";
import "./globals.css";

export const metadata = {
  title: "Legal Pro — Nishant Software",
  description: "Cases, Clients, Court Dates, Fee — sab ek jagah. Vakeelon ke liye.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'DM Sans', sans-serif", background: "#0a0a0f", color: "#fff", margin: 0 }}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}