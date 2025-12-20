'use client'

import { ClerkProvider } from '@clerk/nextjs'

// Check if Clerk is properly configured
const isClerkConfigured = () => {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  return key && key !== 'YOUR_PUBLISHABLE_KEY' && key.startsWith('pk_')
}

export default function ClerkProviderWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  // Only wrap with ClerkProvider if Clerk is configured
  if (!isClerkConfigured()) {
    return <>{children}</>
  }

  return <ClerkProvider>{children}</ClerkProvider>
}
