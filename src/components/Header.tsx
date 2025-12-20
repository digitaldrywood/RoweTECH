'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Capabilities', href: '/capabilities' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Contact', href: '/contact' },
]

// Check if Clerk is properly configured
const isClerkConfigured = () => {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  return key && key !== 'YOUR_PUBLISHABLE_KEY' && key.startsWith('pk_')
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const clerkEnabled = isClerkConfigured()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-secondary-300/20 border-b border-secondary-200/50'
        : 'bg-white/90 backdrop-blur-sm'
    }`}>
      <nav className="container-custom" aria-label="Main navigation">
        <div className="flex items-center justify-between h-20 3xl:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 3xl:space-x-4 group">
            <div className="relative">
              <div className="w-12 h-12 3xl:w-14 3xl:h-14 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg 3xl:rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                <span className="text-white font-bold text-xl 3xl:text-2xl">RT</span>
              </div>
              <div className="absolute inset-0 bg-primary-500 rounded-lg 3xl:rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl 3xl:text-2xl font-bold text-secondary-600">RoweTech</span>
              <span className="block text-xs 3xl:text-sm text-primary-500 font-medium tracking-wider uppercase">Machine & Engineering</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 3xl:space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative px-4 py-2 3xl:px-5 3xl:py-3 text-secondary-500 hover:text-secondary-600 font-medium 3xl:text-lg transition-colors duration-200 group"
              >
                {item.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}

            {/* Clerk Authentication - Only show if configured */}
            {clerkEnabled && (
              <div className="flex items-center space-x-3 ml-4 3xl:ml-6">
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="px-4 py-2 text-secondary-500 hover:text-secondary-600 font-medium transition-colors duration-200">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="btn-primary">
                      Sign Up
                    </button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "w-10 h-10"
                      }
                    }}
                  />
                </SignedIn>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-lg text-secondary-500 hover:text-secondary-600 hover:bg-secondary-100 transition-colors duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'
          }`}
          id="mobile-menu"
        >
          <div className="flex flex-col space-y-1 bg-white/95 backdrop-blur-md rounded-xl p-4 border border-secondary-200">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-secondary-500 hover:text-secondary-600 hover:bg-secondary-100 px-4 py-3 rounded-lg font-medium transition-all duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* Clerk Authentication - Mobile - Only show if configured */}
            {clerkEnabled && (
              <div className="flex flex-col space-y-2 pt-4 mt-2 border-t border-secondary-200">
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="text-secondary-500 hover:text-secondary-600 hover:bg-secondary-100 px-4 py-3 rounded-lg font-medium transition-all duration-200 text-left">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="btn-primary text-center">
                      Sign Up
                    </button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <div className="flex items-center space-x-3 px-4 py-3">
                    <UserButton
                      appearance={{
                        elements: {
                          avatarBox: "w-10 h-10"
                        }
                      }}
                    />
                    <span className="text-secondary-500 font-medium">Account</span>
                  </div>
                </SignedIn>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
