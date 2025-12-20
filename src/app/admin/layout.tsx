'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'

// Check if Clerk is properly configured
const isClerkConfigured = (): boolean => {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  return Boolean(key && key !== 'YOUR_PUBLISHABLE_KEY' && key.startsWith('pk_'))
}

// Dynamically import UserButton to avoid issues when Clerk isn't configured
const UserButton = dynamic(
  () => import('@clerk/nextjs').then((mod) => mod.UserButton),
  { ssr: false, loading: () => <div className="w-8 h-8 rounded-full bg-secondary-200 animate-pulse" /> }
)

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const clerkEnabled = isClerkConfigured()

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Admin Header */}
      <header className="bg-white border-b border-secondary-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">RT</span>
                </div>
                <span className="font-semibold text-secondary-600">Admin</span>
              </Link>
              <nav className="hidden md:flex items-center space-x-1">
                <Link
                  href="/admin"
                  className="px-3 py-2 text-sm font-medium text-secondary-500 hover:text-secondary-600 hover:bg-secondary-100 rounded-lg transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/admin/content"
                  className="px-3 py-2 text-sm font-medium text-secondary-500 hover:text-secondary-600 hover:bg-secondary-100 rounded-lg transition-colors"
                >
                  Content
                </Link>
                <Link
                  href="/admin/gallery"
                  className="px-3 py-2 text-sm font-medium text-secondary-500 hover:text-secondary-600 hover:bg-secondary-100 rounded-lg transition-colors"
                >
                  Gallery
                </Link>
                <Link
                  href="/admin/settings"
                  className="px-3 py-2 text-sm font-medium text-secondary-500 hover:text-secondary-600 hover:bg-secondary-100 rounded-lg transition-colors"
                >
                  Settings
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-sm text-secondary-500 hover:text-secondary-600"
              >
                View Site
              </Link>
              {clerkEnabled && (
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: 'w-8 h-8',
                    },
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Admin Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}
