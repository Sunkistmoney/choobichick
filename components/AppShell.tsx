"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const navLinks = [
  { href: "/chickens", label: "Chickens" },
  { href: "/inventory", label: "Inventory" },
  { href: "/sales", label: "Sales" },
  { href: "/expenses", label: "Expenses" },
  { href: "/finance", label: "Finance" },
  { href: "/egg-production", label: "Egg Production" },
];

interface AppShellProps {
  children: React.ReactNode;
  userEmail?: string | null;
  isLoggedIn: boolean;
}

export default function AppShell({ children, userEmail, isLoggedIn }: AppShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            {/* Brand */}
            <span className="text-base font-semibold text-gray-900">CHB Poultry</span>

            {isLoggedIn && (
              <>
                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-5 text-sm">
                  {navLinks.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className={`font-medium transition-colors ${
                        pathname.startsWith(href)
                          ? "text-green-700"
                          : "text-gray-500 hover:text-gray-900"
                      }`}
                    >
                      {label}
                    </Link>
                  ))}
                </nav>

                {/* Desktop user + sign out */}
                <div className="hidden md:flex items-center gap-4 text-sm">
                  <span className="text-gray-400 truncate max-w-[180px]">{userEmail}</span>
                  <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="text-gray-500 hover:text-gray-900 font-medium"
                  >
                    Sign Out
                  </button>
                </div>

                {/* Mobile hamburger */}
                <button
                  className="md:hidden p-2 rounded text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                  onClick={() => setMenuOpen((o) => !o)}
                  aria-label="Toggle menu"
                >
                  {menuOpen ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {isLoggedIn && menuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 pb-4">
            <nav className="flex flex-col mt-2 gap-1">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    pathname.startsWith(href)
                      ? "bg-green-50 text-green-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-400 truncate">{userEmail}</span>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="text-sm text-gray-600 hover:text-gray-900 font-medium px-3 py-1.5 rounded hover:bg-gray-100"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {children}
      </main>
    </div>
  );
}
