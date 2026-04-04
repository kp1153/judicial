"use client";

const LEGAL_PWA_URL = "https://judicial-phi.vercel.app";
const WINDOWS_EXE_URL = "#";

const painPoints = [
  { icon: "😰", pain: "तारीख भूल गए?", fix: "अगली पेशी की reminder खुद आएगी — email पर" },
  { icon: "📞", pain: "मुवक्किल बार-बार फोन करे?", fix: "Client portal — वो खुद status देख लेगा" },
  { icon: "💸", pain: "फीस का हिसाब गड़बड़?", fix: "हर मुवक्किल का बकाया एक नज़र में" },
  { icon: "📁", pain: "कागज़ों का ढेर?", fix: "FIR, petition, order — सब digital, एक जगह" },
];

const features = [
  { icon: "⚖️", title: "Case Management", desc: "Case number, court, opposite party, filing date, status — सब एक जगह। जिला अदालत से Supreme Court तक।" },
  { icon: "📅", title: "Court Date Tracker", desc: "हर पेशी की तारीख दर्ज करो। पहले email reminder आएगा — तारीख कभी नहीं भूलेगी।" },
  { icon: "👤", title: "Client Management", desc: "हर मुवक्किल का profile — contact, cases, documents, fee — सब linked।" },
  { icon: "📋", title: "Case Diary", desc: "हर सुनवाई के बाद notes — क्या हुआ, क्या argue किया, अगली तारीख क्यों मिली।" },
  { icon: "💰", title: "Fee Ledger", desc: "कितना charge किया, कितना मिला, कितना बाकी — मुवक्किल-वार हिसाब।" },
  { icon: "📎", title: "Document Attach", desc: "Vakalatnama, FIR copy, petition, judgment — case से attach करो।" },
  { icon: "🔗", title: "Client Portal", desc: "मुवक्किल खुद अपने case की status और अगली तारीख online देख सकता है।" },
  { icon: "📊", title: "Cause List", desc: "आज के सभी cases एक नज़र में — कोर्ट जाने से पहले तैयारी।" },
  { icon: "👨‍💼", title: "Junior Management", desc: "Senior to Junior को काम assign करो। कौन किस case पर है — track करो।" },
  { icon: "📱", title: "Mobile PWA", desc: "कोर्ट रूम में भी चले — Android पर app की तरह install करो। कोई app store नहीं।" },
];

const courts = [
  "जिला अदालत", "सत्र न्यायालय", "High Court", "Supreme Court",
  "Consumer Forum", "RERA", "NCLT", "Family Court", "Labour Court", "Revenue Court",
];

const compare = [
  { label: "Court Date Reminder", them: false, us: true },
  { label: "Client Portal", them: false, us: true },
  { label: "Fee Ledger", them: false, us: true },
  { label: "Cloud Backup", them: false, us: true },
  { label: "Mobile PWA", them: false, us: true },
  { label: "Case Diary", them: true, us: true },
  { label: "Document Attach", them: true, us: true },
  { label: "GST Invoice", them: true, us: true },
];

const howTo = [
  { step: "01", icon: "🔐", title: "Google Login", desc: "एक click — Google account से login करो। कोई form नहीं।" },
  { step: "02", icon: "👤", title: "Client जोड़ो", desc: "मुवक्किल का नाम, contact और matter type।" },
  { step: "03", icon: "⚖️", title: "Case बनाओ", desc: "Court, opposite party, filing date — सब enter करो।" },
  { step: "04", icon: "📋", title: "हर पेशी के बाद", desc: "Notes और अगली तारीख — 30 seconds में।" },
];

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white" style={{ fontFamily: "Georgia, 'Palatino Linotype', serif" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');
        .hero-font { font-family: 'Playfair Display', Georgia, serif; }
        .body-font { font-family: 'DM Sans', sans-serif; }
        .gold { color: #c9a84c; }
        .gold-bg { background: #c9a84c; }
        .card-dark {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(201,168,76,0.15);
          transition: all 0.25s ease;
        }
        .card-dark:hover {
          background: rgba(201,168,76,0.08);
          border-color: rgba(201,168,76,0.4);
          transform: translateY(-2px);
        }
        .stamp {
          background: linear-gradient(135deg, #1a1206 0%, #2d1f08 100%);
          border: 2px solid #c9a84c;
          box-shadow: 0 0 0 4px rgba(201,168,76,0.1), inset 0 0 20px rgba(201,168,76,0.05);
        }
        .hero-bg {
          background:
            radial-gradient(ellipse 80% 60% at 50% -10%, rgba(201,168,76,0.12) 0%, transparent 70%),
            #0a0a0f;
        }
        .section-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent);
        }
        .pill {
          background: rgba(201,168,76,0.1);
          border: 1px solid rgba(201,168,76,0.3);
          color: #c9a84c;
        }
        .cta-primary {
          background: linear-gradient(135deg, #c9a84c 0%, #e8c96a 50%, #c9a84c 100%);
          color: #0a0a0f;
          font-weight: 700;
          transition: all 0.2s;
          box-shadow: 0 4px 24px rgba(201,168,76,0.3);
        }
        .cta-primary:hover { box-shadow: 0 6px 32px rgba(201,168,76,0.5); transform: translateY(-1px); }
        .cta-secondary {
          background: transparent;
          border: 1.5px solid rgba(201,168,76,0.5);
          color: #c9a84c;
          transition: all 0.2s;
        }
        .cta-secondary:hover { background: rgba(201,168,76,0.1); border-color: #c9a84c; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.6s ease forwards; }
        .d1 { animation-delay: 0.1s; opacity: 0; }
        .d2 { animation-delay: 0.2s; opacity: 0; }
        .d3 { animation-delay: 0.3s; opacity: 0; }
        .d4 { animation-delay: 0.4s; opacity: 0; }
        .court-tag {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          font-size: 0.75rem;
          padding: 4px 12px;
          border-radius: 999px;
          color: #aaa;
        }
        .num { font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 900; color: #c9a84c; line-height: 1; }
      `}</style>

      {/* Top Bar */}
      <div className="body-font bg-[#c9a84c] py-2 px-4 text-center text-sm font-semibold text-[#0a0a0f] flex flex-col sm:flex-row justify-center items-center gap-3">
        <a href="tel:+919996865069" className="hover:underline">📞 9996865069</a>
        <span className="hidden sm:inline">·</span>
        <a href="https://wa.me/919996865069" target="_blank" rel="noopener noreferrer" className="hover:underline">💬 WhatsApp पर बात करें</a>
      </div>

      {/* Nav */}
      <nav className="body-font sticky top-0 z-50 border-b border-white/5 px-4 py-3" style={{ background: 'rgba(10,10,15,0.95)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="font-bold text-white text-base">🖥️ <span className="gold">Nishant</span> Software</span>
          <a href={LEGAL_PWA_URL} className="cta-primary body-font text-xs px-4 py-2 rounded-lg">Free Trial शुरू करो</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-bg py-24 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)' }} />
        <div className="max-w-4xl mx-auto">
          <div className="pill inline-block text-sm px-5 py-1.5 rounded-full mb-6 body-font fade-up">
            ⚖️ भारत के वकीलों के लिए — District Court से Supreme Court तक
          </div>
          <h1 className="hero-font text-5xl md:text-7xl font-black mb-4 leading-tight fade-up d1">
            Nishant<br /><span className="gold">Legal Pro</span>
          </h1>
          <p className="body-font text-lg md:text-xl text-gray-300 mb-3 max-w-2xl mx-auto fade-up d2">
            Cases · Clients · Court Dates · Documents · Fee — <strong className="text-white">सब एक जगह।</strong>
          </p>
          <p className="body-font text-sm text-gray-500 mb-10 fade-up d2">
            तारीख कभी नहीं भूलेंगे। मुवक्किल बार-बार फोन नहीं करेगा। फीस का हिसाब साफ रहेगा।
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 fade-up d3">
            <a href={LEGAL_PWA_URL} target="_blank" rel="noopener noreferrer"
              className="cta-primary body-font text-base px-10 py-4 rounded-xl inline-block">
              ⚖️ Free Trial शुरू करो — 7 दिन मुफ्त
            </a>
            <a href="https://wa.me/919996865069" target="_blank" rel="noopener noreferrer"
              className="cta-secondary body-font text-base px-10 py-4 rounded-xl inline-block">
              💬 Demo देखो
            </a>
          </div>
          <p className="body-font text-xs text-gray-600 mt-4 fade-up d4">कोई card नहीं · कोई commitment नहीं · 7 दिन बाद ₹4,999/साल</p>
        </div>
      </section>

      <div className="section-divider" />

      {/* Pain Points */}
      <section className="py-14 px-4 bg-[#0d0d12]">
        <div className="max-w-4xl mx-auto">
          <h2 className="hero-font text-3xl text-center mb-2">क्या यह <span className="gold">आपकी problem</span> है?</h2>
          <p className="body-font text-center text-gray-500 text-sm mb-10">हर वकील की यही परेशानी है — Legal Pro का जवाब है</p>
          <div className="grid md:grid-cols-2 gap-4">
            {painPoints.map((p, i) => (
              <div key={i} className="card-dark rounded-2xl p-6 flex gap-5 items-start">
                <div className="text-3xl">{p.icon}</div>
                <div>
                  <div className="body-font text-red-400 font-semibold text-sm mb-1">{p.pain}</div>
                  <div className="body-font text-gray-300 text-sm">✅ {p.fix}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Courts */}
      <section className="py-12 px-4 bg-[#0a0a0f]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="hero-font text-2xl mb-2">किन Courts के लिए?</h2>
          <p className="body-font text-gray-500 text-sm mb-8">हर court, हर tribunal — सब supported</p>
          <div className="flex flex-wrap justify-center gap-3">
            {courts.map((c, i) => (
              <span key={i} className="court-tag body-font">{c}</span>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Features */}
      <section className="py-16 px-4 bg-[#0d0d12]">
        <div className="max-w-5xl mx-auto">
          <h2 className="hero-font text-3xl md:text-4xl text-center mb-2">सब कुछ जो एक <span className="gold">वकील को चाहिए</span></h2>
          <p className="body-font text-center text-gray-500 text-sm mb-10">और कुछ जो किसी और software में नहीं है</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <div key={i} className="card-dark rounded-2xl p-5">
                <div className="text-2xl mb-3">{f.icon}</div>
                <div className="body-font font-semibold text-white text-sm mb-2">{f.title}</div>
                <div className="body-font text-gray-400 text-xs leading-relaxed">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Comparison */}
      <section className="py-14 px-4 bg-[#0a0a0f]">
        <div className="max-w-3xl mx-auto">
          <h2 className="hero-font text-3xl text-center mb-2">पुराने Software से <span className="gold">तुलना</span></h2>
          <p className="body-font text-center text-gray-500 text-sm mb-8">जो पुराने software में नहीं — वो यहाँ है</p>
          <div className="rounded-2xl overflow-hidden border border-white/10">
            <table className="w-full text-sm body-font">
              <thead>
                <tr style={{ background: 'rgba(201,168,76,0.08)' }}>
                  <th className="text-left px-5 py-3 text-gray-300 font-semibold">सुविधा</th>
                  <th className="text-center px-5 py-3 text-gray-500 font-semibold">पुराना Software</th>
                  <th className="text-center px-5 py-3 gold font-semibold">Nishant Legal Pro</th>
                </tr>
              </thead>
              <tbody>
                {compare.map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                    <td className="px-5 py-3 text-gray-300">{row.label}</td>
                    <td className="px-5 py-3 text-center text-lg">{row.them ? "✅" : "❌"}</td>
                    <td className="px-5 py-3 text-center text-lg">✅</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* How to */}
      <section className="py-14 px-4 bg-[#0d0d12]">
        <div className="max-w-4xl mx-auto">
          <h2 className="hero-font text-3xl text-center mb-2">शुरू करो — <span className="gold">4 Steps में</span></h2>
          <p className="body-font text-center text-gray-500 text-sm mb-10">कोई training नहीं, कोई setup नहीं</p>
          <div className="grid md:grid-cols-4 gap-4">
            {howTo.map((h) => (
              <div key={h.step} className="card-dark rounded-2xl p-5 text-center">
                <div className="text-3xl mb-3">{h.icon}</div>
                <div className="gold text-xs font-bold mb-1 body-font">STEP {h.step}</div>
                <div className="text-white font-semibold text-sm mb-2 body-font">{h.title}</div>
                <div className="text-gray-400 text-xs body-font">{h.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Pricing */}
      <section className="py-16 px-4 bg-[#0a0a0f]">
        <div className="max-w-3xl mx-auto">
          <h2 className="hero-font text-3xl text-center mb-2"><span className="gold">मूल्य</span></h2>
          <p className="body-font text-center text-gray-500 text-sm mb-10">एक बार खरीदो — पूरा साल चलाओ</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="stamp rounded-2xl p-7 text-center relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 gold-bg text-[#0a0a0f] text-xs font-bold px-5 py-1 rounded-full body-font">नया Account</div>
              <h3 className="hero-font text-lg mb-3 text-gray-300 mt-2">पहली बार</h3>
              <div className="hero-font text-5xl font-black gold mb-1">₹4,999</div>
              <p className="body-font text-gray-500 text-sm mb-6">एक बार · 1 साल included · Free Trial 7 दिन</p>
              <a href={LEGAL_PWA_URL} target="_blank" rel="noopener noreferrer"
                className="cta-primary body-font block w-full py-3 rounded-xl text-center text-sm mb-3">
                Free Trial शुरू करो
              </a>
              <a href="https://www.web-developer-kp.com/payment?software=legal"
                className="cta-secondary body-font block w-full py-3 rounded-xl text-center text-sm">
                Buy Now — Rs.4,999
              </a>
            </div>
            <div className="card-dark rounded-2xl p-7 text-center">
              <h3 className="hero-font text-lg mb-3 text-gray-300 mt-2">Renewal</h3>
              <div className="hero-font text-5xl font-black gold mb-1">₹1,999</div>
              <p className="body-font text-gray-500 text-sm mb-6">प्रति वर्ष · सभी features · Cloud backup</p>
              <a href="https://www.web-developer-kp.com/payment?software=legal&plan=renewal"
                className="cta-primary body-font block w-full py-3 rounded-xl text-center text-sm">
                Renew Now — Rs.1,999
              </a>
            </div>
          </div>
          <div className="mt-8 card-dark rounded-2xl p-5 text-center body-font">
            <p className="text-gray-400 text-sm">
              💬 <strong className="text-white">Demo चाहिए?</strong> — WhatsApp करो, live दिखाएंगे ·
              <a href="https://wa.me/919996865069" target="_blank" rel="noopener noreferrer" className="gold ml-1 hover:underline">wa.me/919996865069</a>
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="hero-bg py-20 px-4 text-center border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <h2 className="hero-font text-3xl md:text-4xl mb-4">
            अब और कागज़ नहीं।<br /><span className="gold">Digital चलो।</span>
          </h2>
          <p className="body-font text-gray-400 text-sm mb-8">7 दिन मुफ्त — कोई card नहीं, कोई commitment नहीं।</p>
          <a href={LEGAL_PWA_URL} target="_blank" rel="noopener noreferrer"
            className="cta-primary body-font inline-block text-base px-12 py-4 rounded-xl">
            ⚖️ अभी शुरू करो — Free है
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="body-font py-6 px-4 text-center text-gray-600 text-xs border-t border-white/5 bg-[#0a0a0f]">
        © 2026 Nishant Softwares · भारत के लिए बना ·
        <a href="tel:+919996865069" className="gold hover:underline ml-1">9996865069</a>
      </footer>

    </main>
  );
}