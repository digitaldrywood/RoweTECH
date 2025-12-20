'use client'

import Link from 'next/link'
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from '@clerk/nextjs'
import { isAuthorizedAdmin } from '@/config/authorized-users'

// Check if Clerk is properly configured
const isClerkConfigured = (): boolean => {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  return Boolean(key && key !== 'YOUR_PUBLISHABLE_KEY' && key.startsWith('pk_'))
}

export function DesktopAuthButtons() {
  const { user } = useUser()
  const isAdmin = isAuthorizedAdmin(user?.primaryEmailAddress?.emailAddress)

  if (!isClerkConfigured()) return null

  return (
    <div className="flex items-center space-x-4 ml-4 3xl:ml-6">
      <SignedOut>
        <SignInButton mode="modal">
          <button className="text-secondary-500 hover:text-secondary-600 font-medium transition-colors duration-200">
            Sign In
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        {isAdmin && (
          <Link
            href="/admin"
            className="text-secondary-500 hover:text-secondary-600 font-medium transition-colors duration-200"
          >
            Admin
          </Link>
        )}
        <UserButton
          appearance={{
            elements: {
              avatarBox: 'w-9 h-9',
            },
          }}
        />
      </SignedIn>
    </div>
  )
}

export function MobileAuthButtons() {
  const { user } = useUser()
  const isAdmin = isAuthorizedAdmin(user?.primaryEmailAddress?.emailAddress)

  if (!isClerkConfigured()) return null

  return (
    <div className="flex flex-col space-y-2 pt-4 mt-2 border-t border-secondary-200">
      <SignedOut>
        <SignInButton mode="modal">
          <button className="text-secondary-500 hover:text-secondary-600 hover:bg-secondary-100 px-4 py-3 rounded-lg font-medium transition-all duration-200 text-left">
            Sign In
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        {isAdmin && (
          <Link
            href="/admin"
            className="text-secondary-500 hover:text-secondary-600 hover:bg-secondary-100 px-4 py-3 rounded-lg font-medium transition-all duration-200"
          >
            Admin Dashboard
          </Link>
        )}
        <div className="flex items-center space-x-3 px-4 py-3">
          <UserButton
            appearance={{
              elements: {
                avatarBox: 'w-9 h-9',
              },
            }}
          />
          <span className="text-secondary-500 font-medium">Account</span>
        </div>
      </SignedIn>
    </div>
  )
}
