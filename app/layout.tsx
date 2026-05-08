import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AuditAI — AI Website Auditor',
  description:
    'AI-powered SEO audits, conversion optimization, trust analysis, and growth recommendations for modern businesses.',

  keywords: [
    'AI SEO audit',
    'website audit tool',
    'SEO analyzer',
    'AI marketing',
    'website optimization',
    'conversion optimization',
  ],

  openGraph: {
    title: 'AuditAI',
    description:
      'AI-powered website audits and growth recommendations.',
    url: 'https://ai-website-auditor-self.vercel.app',
    siteName: 'AuditAI',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}