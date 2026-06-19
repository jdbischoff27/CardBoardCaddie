"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { Menu, X, Package } from "lucide-react";

export function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center group-hover:bg-brand-600 transition-colors">
              <Package className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-stone-900">
              Cardboard<span className="text-brand-500">Caddie</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#how-it-works" className="text-stone-600 hover:text-stone-900 text-sm font-medium transition-colors">
              How It Works
            </Link>
            <Link href="/pricing" className="text-stone-600 hover:text-stone-900 text-sm font-medium transition-colors">
              Pricing
            </Link>
            <Link href="/business" className="text-stone-600 hover:text-stone-900 text-sm font-medium transition-colors">
              For Business
            </Link>
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-stone-600 hover:text-stone-900 text-sm font-medium transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-stone-600 hover:text-stone-900 hover:bg-stone-100"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 px-4 py-4 space-y-3">
          <Link href="/#how-it-works" className="block text-stone-700 font-medium py-2" onClick={() => setMenuOpen(false)}>
            How It Works
          </Link>
          <Link href="/pricing" className="block text-stone-700 font-medium py-2" onClick={() => setMenuOpen(false)}>
            Pricing
          </Link>
          <Link href="/business" className="block text-stone-700 font-medium py-2" onClick={() => setMenuOpen(false)}>
            For Business
          </Link>
          {session ? (
            <>
              <Link href="/dashboard" className="block text-stone-700 font-medium py-2" onClick={() => setMenuOpen(false)}>
                Dashboard
              </Link>
              <button
                onClick={() => { signOut({ callbackUrl: "/" }); setMenuOpen(false); }}
                className="block text-stone-700 font-medium py-2 w-full text-left"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="block text-stone-700 font-medium py-2" onClick={() => setMenuOpen(false)}>
                Log in
              </Link>
              <Link
                href="/register"
                className="block bg-brand-500 text-white font-semibold px-4 py-3 rounded-lg text-center"
                onClick={() => setMenuOpen(false)}
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
