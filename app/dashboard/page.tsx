'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [reports, setReports] = useState<any[]>([])

  useEffect(() => {
    async function loadData() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      setUser(user)

      const { data } = await supabase
        .from('reports')
        .select('*')
        .order('created_at', { ascending: false })

      if (data) {
        setReports(data)
      }
    }

    loadData()
  }, [])

  async function logout() {
    await supabase.auth.signOut()

    window.location.href = '/login'
  }

  return (
    <main className="min-h-screen bg-black text-white">

      {/* NAVBAR */}
      <nav className="border-b border-zinc-800">

        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-3 h-3 rounded-full bg-green-400"></div>

            <h1 className="text-2xl font-black">
              AuditAI
            </h1>

          </div>

          <button
            onClick={logout}
            className="px-5 py-3 rounded-2xl bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 transition"
          >
            Logout
          </button>

        </div>
      </nav>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="mb-12">

          <h1 className="text-6xl font-black mb-4">
            Dashboard
          </h1>

          <p className="text-gray-400 text-xl">
            Welcome back
            {user?.email ? `, ${user.email}` : ''}
          </p>

        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

            <p className="text-gray-400 mb-4">
              Total Audits
            </p>

            <h2 className="text-5xl font-black text-green-400">
              {reports.length}
            </h2>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

            <p className="text-gray-400 mb-4">
              Premium Status
            </p>

            <h2 className="text-5xl font-black text-blue-400">
              Free
            </h2>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

            <p className="text-gray-400 mb-4">
              Saved Reports
            </p>

            <h2 className="text-5xl font-black text-purple-400">
              {reports.length}
            </h2>

          </div>

        </div>

        {/* RECENT REPORTS */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10">

          <h2 className="text-3xl font-black mb-8">
            Recent Reports
          </h2>

          <div className="space-y-5">

            {reports.map((report) => (

              <div
                key={report.id}
                className="bg-black border border-zinc-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
              >

                <div>

                  <h3 className="text-2xl font-bold mb-2 break-all">
                    {report.website}
                  </h3>

                  <p className="text-gray-400 mb-4">
                    {new Date(report.created_at).toLocaleDateString()}
                  </p>

                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 max-h-52 overflow-y-auto">

                    <pre className="whitespace-pre-wrap text-gray-300 text-sm">
                      {report.report}
                    </pre>

                  </div>

                </div>

              </div>

            ))}

            {reports.length === 0 && (

              <div className="text-center py-20">

                <h3 className="text-3xl font-bold mb-4">
                  No Reports Yet
                </h3>

                <p className="text-gray-400">
                  Start analyzing websites to see reports here.
                </p>

              </div>

            )}

          </div>

        </div>

      </section>

    </main>
  )
}