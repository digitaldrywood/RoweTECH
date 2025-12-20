import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { AUTHORIZED_ADMIN_EMAILS } from '@/config/authorized-users'

// Check if Clerk is properly configured
const isClerkConfigured = () => {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  return key && key !== 'YOUR_PUBLISHABLE_KEY' && key.startsWith('pk_')
}

// Simple admin route check without Clerk
const isAdminPath = (pathname: string) => pathname.startsWith('/admin')

// Middleware that handles both Clerk and non-Clerk scenarios
export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // If Clerk is not configured, allow public routes but block admin
  if (!isClerkConfigured()) {
    if (isAdminPath(pathname)) {
      // Redirect to home if trying to access admin without Clerk
      return NextResponse.redirect(new URL('/', req.url))
    }
    // Allow all other routes
    return NextResponse.next()
  }

  // If Clerk is configured, use Clerk middleware
  const isAdminRoute = createRouteMatcher(['/admin(.*)'])

  return clerkMiddleware(async (auth, req) => {
    // Protect admin routes
    if (isAdminRoute(req)) {
      const { userId, sessionClaims } = await auth()

      // Must be signed in
      if (!userId) {
        const signInUrl = new URL('/sign-in', req.url)
        signInUrl.searchParams.set('redirect_url', req.url)
        return NextResponse.redirect(signInUrl)
      }

      // Must be an authorized admin
      const email = sessionClaims?.email as string | undefined
      if (!email || !AUTHORIZED_ADMIN_EMAILS.includes(email.toLowerCase() as typeof AUTHORIZED_ADMIN_EMAILS[number])) {
        return NextResponse.redirect(new URL('/unauthorized', req.url))
      }
    }
  })(req, {} as any)
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
