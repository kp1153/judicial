import Link from "next/link";

export default function ExpiredPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');
        .hero-font { font-family: 'Playfair Display', Georgia, serif; }
        .body-font { font-family: 'DM Sans', sans-serif; }
        .gold { color: #c9a84c; }
        .stamp {
          background: linear-gradient(135deg, #1a1206 0%, #2d1f08 100%);
          border: 2px solid #c9a84c;
          box-shadow: 0 0 0 4px rgba(201,168,76,0.1);
        }
        .cta-primary {
          background: linear-gradient(135deg, #c9a84c 0%, #e8c96a 50%, #c9a84c 100%);
          color: #0a0a0f;
          font-weight: 700;
          transition: all 0.2s;
        }
        .cta-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 32px rgba(201,168,76,0.4); }
      `}</style>

      <div className="stamp rounded-3xl p-10 w-full max-w-md text-center">
        <div className="text-5xl mb-4">⏰</div>
        <h1 className="hero-font text-3xl font-black text-white mb-2">Trial Expired</h1>
        <p className="body-font text-gray-400 text-sm mb-6">
          आपका 7-दिन का free trial समाप्त हो गया है।<br />
          License खरीदें और Legal Pro use करते रहें।
        </p>

        <div className="bg-black/30 rounded-2xl p-5 mb-6 text-left">
          <p className="body-font text-xs text-gray-500 mb-1">Legal Pro License</p>
          <p className="hero-font text-4xl font-black gold mb-1">₹4,999 <span className="text-sm font-normal text-gray-500">/ साल</span></p>
          <p className="body-font text-xs text-gray-600">Renewal: ₹1,999/साल</p>
        </div>

        <a
          href="https://www.web-developer-kp.com/payment?software=legal"
          className="cta-primary body-font block w-full py-3 rounded-xl text-center text-sm mb-3"
        >
          License खरीदें — Rs.4,999
        </a>

        <a
          href="https://wa.me/919996865069"
          target="_blank"
          rel="noopener noreferrer"
          className="body-font block w-full py-3 rounded-xl text-center text-sm mb-6 text-green-400 border border-green-400/30 hover:bg-green-400/10 transition"
        >
          💬 WhatsApp Support
        </a>

        <Link href="/login" className="body-font text-gray-600 hover:text-gray-400 text-xs transition">
          Login page पर जाएं
        </Link>
      </div>
    </main>
  );
}