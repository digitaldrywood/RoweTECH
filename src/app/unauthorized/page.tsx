'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'

// Check if Clerk is properly configured
const isClerkConfigured = (): boolean => {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  return Boolean(key && key !== 'YOUR_PUBLISHABLE_KEY' && key.startsWith('pk_'))
}

// Dynamically import SignOutButton to avoid issues when Clerk isn't configured
const SignOutButton = dynamic(
  () => import('@clerk/nextjs').then((mod) => mod.SignOutButton),
  { ssr: false }
)

export default function UnauthorizedPage() {
  const clerkEnabled = isClerkConfigured()

  return (
    <div className="min-h-screen bg-secondary-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-secondary-600 mb-2">
          Access Denied
        </h1>
        <p className="text-secondary-500 mb-6">
          You don&apos;t have permission to access the admin area. Please contact an
          administrator if you believe this is an error.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary">
            Go to Homepage
          </Link>
          {clerkEnabled ? (
            <SignOutButton>
              <button className="px-6 py-3 border border-secondary-300 text-secondary-600 font-medium rounded-lg hover:bg-secondary-100 transition-colors">
                Sign Out
              </button>
            </SignOutButton>
          ) : (
            <Link
              href="/"
              className="px-6 py-3 border border-secondary-300 text-secondary-600 font-medium rounded-lg hover:bg-secondary-100 transition-colors"
            >
              Back to Home
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
