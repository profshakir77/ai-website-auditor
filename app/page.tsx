'use client'

import { useState } from 'react'

export default function Home() {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  async function analyzeWebsite() {
    if (!url) return

    setLoading(true)
    setResult('')

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
        }),
      })

      const data = await response.json()

      setResult(data.result)
    } catch (error) {
      setResult('Something went wrong while analyzing the website.')
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="max-w-4xl">
          <p className="text-green-400 font-semibold mb-4">
            AI-Powered Website Growth
          </p>

          <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-6">
            Audit Any Website Using AI
          </h1>

          <p className="text-xl text-gray-400 mb-10 leading-9">
            Get instant SEO analysis, homepage optimization tips,
            conversion improvements, and AI-generated suggestions
            to grow your business faster.
          </p>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter website URL..."
              className="flex-1 px-6 py-5 rounded-2xl bg-zinc-900 border border-zinc-700 outline-none text-lg"
            />

            <button
              onClick={analyzeWebsite}
              disabled={loading}
              className="px-8 py-5 rounded-2xl bg-white text-black font-semibold hover:bg-gray-200 transition disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  Analyzing Website...
                </div>
              ) : (
                'Analyze Website'
              )}
            </button>
          </div>

          {result && (
            <div className="mt-12 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>

                  <p className="text-white font-semibold text-lg">
                    AI Website Audit Report
                  </p>
                </div>

                <button
                  onClick={() => navigator.clipboard.writeText(result)}
                  className="text-sm px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition"
                >
                  Copy Report
                </button>
              </div>

              <div className="whitespace-pre-wrap text-gray-300 leading-8">
                {result}
              </div>
            </div>
          )}

          <div className="mt-16 flex flex-wrap gap-10 text-sm text-gray-500">
            <div>
              <span className="text-white font-bold text-3xl">
                10K+
              </span>

              <p className="mt-1">Audits Generated</p>
            </div>

            <div>
              <span className="text-white font-bold text-3xl">
                3X
              </span>

              <p className="mt-1">SEO Improvement</p>
            </div>

            <div>
              <span className="text-white font-bold text-3xl">
                24/7
              </span>

              <p className="mt-1">AI Analysis</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}