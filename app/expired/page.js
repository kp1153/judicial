import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function ExpiredPage() {
  const session = await getSession();
  const email = session?.email || "";
  const hubUrl = `https://nishantsoftwares.in/payment?software=legal&email=${encodeURIComponent(email)}`;

  return (
    <main className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-gray-900 border border-gray-800 rounded-3xl shadow-lg p-8">
          <div className="text-6xl mb-4">⏰</div>
          <h1 className="text-2xl font-bold text-white mb-2">ट्रायल समाप्त</h1>
          <p className="text-gray-400 text-sm mb-6">
            आपका ७ दिन का निःशुल्क ट्रायल समाप्त हो गया है। Judicial Pro आगे चलाने के लिए कृपया लाइसेंस खरीदें।
          </p>
          <div className="bg-gray-800 rounded-2xl p-4 mb-6 text-left">
            <p className="text-sm font-semibold text-amber-400 mb-1">Judicial Pro लाइसेंस</p>
            <p className="text-2xl font-extrabold text-white mb-1">
              ₹4,999 <span className="text-sm font-normal text-gray-400">/ साल</span>
            </p>
            <p className="text-xs text-gray-500">नवीनीकरण: ₹2,500 / साल</p>
          </div>
          <a
            href={hubUrl}
            className="block w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 rounded-2xl transition mb-3"
          >
            अभी खरीदें
          </a>
          <a
            href="https://wa.me/919996865069"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-2xl transition"
          >
            WhatsApp सहायता
          </a>
        </div>
      </div>
    </main>
  );
}