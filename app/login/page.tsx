'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-10">

        <div className="flex items-center gap-3 mb-8">

          <div className="w-3 h-3 rounded-full bg-green-400"></div>

          <h1 className="text-3xl font-black">
            AuditAI
          </h1>

        </div>

        <h2 className="text-4xl font-black mb-4">
          Welcome Back
        </h2>

        <p className="text-gray-400 mb-8">
          Login or create your account.
        </p>

        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
          }}
          providers={['google']}
          theme="dark"
        />

      </div>

    </main>
  )
}