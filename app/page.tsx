'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import jsPDF from 'jspdf'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const [email, setEmail] = useState('')
  const [emailSaved, setEmailSaved] = useState(false)

  // ANALYZE WEBSITE
  async function analyzeWebsite() {
    if (!url.trim()) return

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

      // SAVE REPORT TO DATABASE
      await supabase.from('reports').insert([
        {
          website: url,
          report: data.result,
          user_email: 'guest',
        },
      ])

      setResult(data.result)
    } catch (error) {
      setResult('Failed to analyze website.')
    }

    setLoading(false)
  }

  // ENTER KEY SUPPORT
  function handleKeyDown(e: any) {
    if (e.key === 'Enter') {
      analyzeWebsite()
    }
  }

  // DOWNLOAD PDF
  function downloadPDF() {
    const doc = new jsPDF()

    doc.setFontSize(22)
    doc.text('AuditAI Website Report', 20, 20)

    doc.setFontSize(12)

    const splitText = doc.splitTextToSize(result, 170)

    doc.text(splitText, 20, 40)

    doc.save('audit-report.pdf')
  }

  // SAVE EMAIL
  async function saveEmail() {
    if (!email) return

    const { error } = await supabase
      .from('emails')
      .insert([
        {
          email,
        },
      ])

    if (!error) {
      setEmailSaved(true)
      setEmail('')
    }
  }

  // EXTRACT SCORES
  const seoScore =
    result.match(/SEO Score:\s*(\d+)/i)?.[1] || '0'

  const conversionScore =
    result.match(/Conversion Score:\s*(\d+)/i)?.[1] || '0'

  const trustScore =
    result.match(/Trust Score:\s*(\d+)/i)?.[1] || '0'

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* NAVBAR */}
      <nav className="border-b border-zinc-800 backdrop-blur-xl sticky top-0 z-50 bg-black/70">

        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>

            <h1 className="font-bold text-2xl">
              AuditAI
            </h1>

          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">

            <a
              href="/pricing"
              className="hover:text-white transition"
            >
              Pricing
            </a>

            <a
              href="/dashboard"
              className="hover:text-white transition"
            >
              Dashboard
            </a>

            <a
              href="/login"
              className="hover:text-white transition"
            >
              Login
            </a>

          </div>

        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-24 relative">

        {/* GLOW EFFECTS */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-500/10 blur-3xl rounded-full"></div>

        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-500/10 blur-3xl rounded-full"></div>

        <div className="relative z-10 max-w-5xl">

          {/* TAG */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-zinc-800 bg-zinc-900 mb-8">

            <div className="w-2 h-2 rounded-full bg-green-400"></div>

            <span className="text-sm text-gray-300">
              AI-Powered Website Growth
            </span>

          </div>

          {/* TITLE */}
          <h1 className="text-6xl md:text-8xl font-black leading-tight mb-8">
            Audit Any Website Using AI
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-14 leading-10 max-w-4xl">
            Get instant SEO analysis, conversion optimization,
            trust-building insights, and AI-generated recommendations.
          </p>

          {/* INPUT */}
          <div className="flex flex-col md:flex-row gap-5 mb-10">

            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter website URL..."
              className="flex-1 px-7 py-6 rounded-3xl bg-zinc-900 border border-zinc-700 outline-none text-xl focus:border-green-400 transition"
            />

            <button
              onClick={analyzeWebsite}
              disabled={loading}
              className="px-10 py-6 rounded-3xl bg-white text-black font-bold text-lg hover:bg-gray-200 transition disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">

                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>

                  Analyzing...

                </div>
              ) : (
                'Analyze Website'
              )}
            </button>

          </div>

          {/* SCORE CARDS */}
          {result && (
            <div className="grid md:grid-cols-3 gap-6 mb-10">

              {/* SEO */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

                <p className="text-gray-400 mb-4 uppercase text-sm">
                  SEO Score
                </p>

                <div className="flex items-end gap-2 mb-5">

                  <h2 className="text-6xl font-black text-green-400">
                    {seoScore}
                  </h2>

                  <span className="text-2xl text-gray-500 mb-2">
                    /100
                  </span>

                </div>

                <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">

                  <div
                    className="h-full bg-green-400"
                    style={{
                      width: `${seoScore}%`,
                    }}
                  ></div>

                </div>

              </div>

              {/* CONVERSION */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

                <p className="text-gray-400 mb-4 uppercase text-sm">
                  Conversion Score
                </p>

                <div className="flex items-end gap-2 mb-5">

                  <h2 className="text-6xl font-black text-blue-400">
                    {conversionScore}
                  </h2>

                  <span className="text-2xl text-gray-500 mb-2">
                    /100
                  </span>

                </div>

                <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">

                  <div
                    className="h-full bg-blue-400"
                    style={{
                      width: `${conversionScore}%`,
                    }}
                  ></div>

                </div>

              </div>

              {/* TRUST */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

                <p className="text-gray-400 mb-4 uppercase text-sm">
                  Trust Score
                </p>

                <div className="flex items-end gap-2 mb-5">

                  <h2 className="text-6xl font-black text-purple-400">
                    {trustScore}
                  </h2>

                  <span className="text-2xl text-gray-500 mb-2">
                    /100
                  </span>

                </div>

                <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">

                  <div
                    className="h-full bg-purple-400"
                    style={{
                      width: `${trustScore}%`,
                    }}
                  ></div>

                </div>

              </div>

            </div>
          )}

          {/* PREMIUM CTA */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-10 mb-10 text-black">

            <h2 className="text-4xl font-black mb-4">
              Unlock Full AI Growth Report
            </h2>

            <p className="text-lg mb-8 max-w-2xl">
              Get advanced SEO analysis, competitor insights,
              revenue opportunities, conversion optimization,
              and complete AI growth strategy.
            </p>

            <div className="flex flex-col md:flex-row gap-4">

              <a
                href="/pricing"
                className="inline-block px-8 py-5 rounded-2xl bg-black text-white font-bold hover:bg-zinc-900 transition"
              >
                Upgrade to Premium
              </a>

            </div>

          </div>

          {/* EMAIL CAPTURE */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 mb-10">

            <h2 className="text-3xl font-bold mb-4">
              Get More AI Growth Tips
            </h2>

            <p className="text-gray-400 mb-8 text-lg">
              Join our newsletter and receive advanced SEO,
              conversion, and AI marketing strategies.
            </p>

            <div className="flex flex-col md:flex-row gap-4">

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email..."
                className="flex-1 px-6 py-5 rounded-2xl bg-black border border-zinc-700 outline-none text-lg focus:border-green-400"
              />

              <button
                onClick={saveEmail}
                className="px-8 py-5 rounded-2xl bg-green-500 text-black font-bold hover:bg-green-400 transition"
              >
                {emailSaved ? 'Saved!' : 'Join Newsletter'}
              </button>

            </div>

          </div>

          {/* REPORT */}
          {result && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10">

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

                <div className="flex items-center gap-4">

                  <div className="w-4 h-4 rounded-full bg-green-400 animate-pulse"></div>

                  <h2 className="text-3xl font-bold">
                    AI Website Audit Report
                  </h2>

                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-3">

                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(result)
                    }
                    className="px-5 py-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 transition"
                  >
                    Copy Report
                  </button>

                  <button
                    onClick={downloadPDF}
                    className="px-5 py-3 rounded-2xl bg-green-500 text-black hover:bg-green-400 transition"
                  >
                    Download PDF
                  </button>

                </div>

              </div>

              {/* MARKDOWN REPORT */}
              <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-li:text-gray-300">

                <ReactMarkdown>
                  {result}
                </ReactMarkdown>

              </div>

            </div>
          )}

        </div>
      </section>
    </main>
  )
}