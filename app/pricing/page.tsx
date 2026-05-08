export default function PricingPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-20">
          <h1 className="text-6xl font-black mb-6">
            Simple Pricing
          </h1>

          <p className="text-zinc-400 text-xl">
            Start free. Upgrade when you need advanced AI growth reports.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">

          {/* FREE PLAN */}

          <div className="border border-zinc-800 rounded-3xl p-10 bg-zinc-950">
            <h2 className="text-3xl font-black mb-4">
              Free
            </h2>

            <div className="text-5xl font-black mb-8">
              $0
            </div>

            <ul className="space-y-4 text-zinc-300 mb-10">
              <li>✓ Basic AI audits</li>
              <li>✓ SEO recommendations</li>
              <li>✓ Homepage analysis</li>
              <li>✓ CTA suggestions</li>
            </ul>

            <button className="w-full py-5 rounded-2xl bg-zinc-800 text-white font-bold">
              Current Plan
            </button>
          </div>

          {/* PREMIUM PLAN */}

          <div className="border border-green-500 rounded-3xl p-10 bg-gradient-to-b from-green-950/20 to-zinc-950 relative overflow-hidden">

            <div className="absolute top-5 right-5 bg-green-500 text-black px-4 py-1 rounded-full text-sm font-bold">
              MOST POPULAR
            </div>

            <h2 className="text-3xl font-black mb-4">
              Premium
            </h2>

            <div className="text-5xl font-black mb-2">
              $29
            </div>

            <p className="text-zinc-400 mb-8">
              per month
            </p>

            <ul className="space-y-4 text-zinc-200 mb-10">
              <li>✓ Unlimited AI audits</li>
              <li>✓ Competitor analysis</li>
              <li>✓ Advanced SEO scoring</li>
              <li>✓ PDF export reports</li>
              <li>✓ AI conversion optimization</li>
              <li>✓ Priority processing</li>
            </ul>

            <a
              href="https://auditaiapp.lemonsqueezy.com/checkout/buy/92fe2eff-b860-4950-bae3-31f37ff6afc9"
              target="_blank"
              className="block w-full py-5 rounded-2xl bg-white text-black font-black hover:bg-zinc-200 transition text-lg text-center"
            >
              Upgrade Now
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}