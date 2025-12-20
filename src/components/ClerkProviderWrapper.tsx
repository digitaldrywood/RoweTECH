'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { useEffect, useState } from 'react'

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
  const [mounted, setMounted] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    setMounted(true)
    setEnabled(isClerkConfigured())
  }, [])

  // During SSR and initial mount, just render children
  if (!mounted) {
    return <>{children}</>
  }

  // Only wrap with ClerkProvider if Clerk is configured
  if (!enabled) {
    return <>{children}</>
  }

  return <ClerkProvider>{children}</ClerkProvider>
}
