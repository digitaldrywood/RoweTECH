'use client'

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

// Check if Clerk is properly configured
const isClerkConfigured = () => {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  return key && key !== 'YOUR_PUBLISHABLE_KEY' && key.startsWith('pk_')
}

export function DesktopAuthButtons() {
  if (!isClerkConfigured()) return null

  return (
    <div className="flex items-center space-x-3 ml-4 3xl:ml-6">
      <SignedOut>
        <SignInButton mode="modal">
          <button className="px-4 py-2 text-secondary-500 hover:text-secondary-600 font-medium transition-colors duration-200">
            Sign In
          </button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button className="btn-primary">Sign Up</button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <UserButton
          appearance={{
            elements: {
              avatarBox: 'w-10 h-10',
            },
          }}
        />
      </SignedIn>
    </div>
  )
}

export function MobileAuthButtons() {
  if (!isClerkConfigured()) return null

  return (
    <div className="flex flex-col space-y-2 pt-4 mt-2 border-t border-secondary-200">
      <SignedOut>
        <SignInButton mode="modal">
          <button className="text-secondary-500 hover:text-secondary-600 hover:bg-secondary-100 px-4 py-3 rounded-lg font-medium transition-all duration-200 text-left">
            Sign In
          </button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button className="btn-primary text-center">Sign Up</button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <div className="flex items-center space-x-3 px-4 py-3">
          <UserButton
            appearance={{
              elements: {
                avatarBox: 'w-10 h-10',
              },
            }}
          />
          <span className="text-secondary-500 font-medium">Account</span>
        </div>
      </SignedIn>
    </div>
  )
}
