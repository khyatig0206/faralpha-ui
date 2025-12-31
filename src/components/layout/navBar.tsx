"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 sticky top-0 z-50">
      {/* Logo */}
      <div className="text-xl font-serif font-bold">Christian Books Ai</div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">
          Home
        </Link>
        <Link href="/library" className="hover:text-gray-600 transition-colors">
          Library
        </Link>
        <Link href="/cards-progress" className="hover:text-gray-600 transition-colors">
          Cards & Progress
        </Link>
        <Link href="/discover" className="hover:text-gray-600 transition-colors">
          Discover
        </Link>
        <Link href="/ask-questions" className="hover:text-gray-600 transition-colors">
          Ask Questions
        </Link>
      </div>

      {/* Auth Buttons */}
      <div className="hidden md:flex items-center gap-3">
        <Link href="/sign-up" className="px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50 transition">
          Sign Up
        </Link>
        <Link href="/log-in" className="px-4 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition">
          Log In
        </Link>
      </div>

      {/* Mobile Menu Button (Simple) */}
      <button 
        className="md:hidden p-2 text-gray-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        Menu
      </button>

      {/* Mobile Menu (Conditionally Rendered) */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-b border-gray-100 flex flex-col p-4 gap-4 md:hidden shadow-lg">
          <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/library" onClick={() => setIsOpen(false)}>Library</Link>
          <Link href="/cards-progress" onClick={() => setIsOpen(false)}>Cards</Link>
          <Link href="/discover" onClick={() => setIsOpen(false)}>Discover</Link>
          <Link href="/ask-questions" onClick={() => setIsOpen(false)}>Ask</Link>
        </div>
      )}
    </nav>
  );
}