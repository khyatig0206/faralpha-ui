"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

// --- AUTH MODAL COMPONENT ---
const AuthModal = ({ 
  isOpen, 
  onClose, 
  initialView 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  initialView: "login" | "signup" 
}) => {
  const [view, setView] = useState<"login" | "signup">(initialView);

  // Update internal view if the prop changes (e.g., clicking a different navbar button)
  useEffect(() => {
    if (isOpen) setView(initialView);
  }, [initialView, isOpen]);

  if (!isOpen) return null;

  return (
    // Backdrop with Blur
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />
      
      {/* Card Container */}
      <div className="relative w-full max-w-[480px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-serif font-bold text-gray-900 mb-2">
            {view === "signup" ? "Sign up to Christian Books AI" : "Log in to Christian Books AI"}
          </h1>
        </div>

        {/* Social Login */}
        <button className="w-full bg-[#1a1b1e] hover:bg-black text-white font-medium py-3 px-4 rounded-full flex items-center justify-center gap-3 transition-all duration-200 mb-6 group">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" />
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px bg-gray-200 flex-1" />
          <span className="text-[11px] text-gray-400 font-semibold tracking-wider uppercase">
            or {view === "signup" ? "sign up" : "log in"} below
          </span>
          <div className="h-px bg-gray-200 flex-1" />
        </div>

        {/* Form Fields */}
        <form className="space-y-4">
          {view === "signup" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <input
                  type="text"
                  placeholder="First name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:ring-0 outline-none transition-all text-[15px]"
                />
              </div>
              <div className="space-y-1">
                <input
                  type="text"
                  placeholder="Last name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:ring-0 outline-none transition-all text-[15px]"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <input
              type="email"
              placeholder="name@work-email.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:ring-0 outline-none transition-all text-[15px]"
            />
          </div>

          <div className="space-y-1">
             <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:ring-0 outline-none transition-all text-[15px]"
            />
          </div>

          {/* Action Button */}
          <button className="w-full bg-white text-gray-900 font-semibold py-3 px-4 rounded-full border border-gray-200 hover:border-gray-900 hover:bg-gray-50 transition-all duration-200 mt-2">
            Continue
          </button>
        </form>

        {/* Switch View Footer */}
        <div className="text-center mt-6">
          <p className="text-[13px] text-gray-500">
            {view === "signup" ? "Already using Christian Books AI? " : "Don't have an account? "}
            <button 
              onClick={() => setView(view === "signup" ? "login" : "signup")} 
              className="text-blue-600 hover:underline font-medium"
            >
              {view === "signup" ? "Log in" : "Sign up"}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};

// --- MAIN NAVBAR COMPONENT ---

export default function Navbar() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authView, setAuthView] = useState<"login" | "signup">("signup");

  const openAuth = (view: "login" | "signup") => {
    setAuthView(view);
    setIsAuthOpen(true);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 flex items-center px-14 p-4 bg-white/80 backdrop-blur-md border-b border-gray-100/50">
        
        {/* Logo Section */}
        <div className="flex items-center mr-10">
          <Link 
            href="/" 
            className="text-[28px] font-serif text-black tracking-tighter lowercase leading-none hover:opacity-80 transition-opacity"
          >
            christian books ai
          </Link>
        </div>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link 
            href="/library" 
            className="text-[17px] font-medium text-gray-900 hover:text-gray-600 transition-colors"
          >
            Library
          </Link>
          {/* <Link 
            href="/progress" 
            className="text-[17px] font-medium text-gray-900 hover:text-gray-600 transition-colors"
          >
            Progress
          </Link> */}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-5 ml-auto">
          {/* Ask AI Button */}
          <button className="group flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-white border border-gray-100 shadow-[0_0_20px_-5px_rgba(124,58,237,0.3)] hover:shadow-[0_0_25px_-5px_rgba(124,58,237,0.5)] transition-all">
            <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden relative flex items-center justify-center">
            </div>
            <span className="text-[14px] font-semibold text-gray-900">Ask AI</span>
          </button>

          {/* Sign Up Button -> Triggers Modal */}
          <button 
            onClick={() => openAuth("signup")}
            className="px-5 py-2.5 rounded-full bg-[#1a1b1e] text-white text-[15px] font-medium hover:bg-black transition-colors"
          >
            Sign up
          </button>

          {/* Log In Button -> Triggers Modal */}
          <button 
            onClick={() => openAuth("login")}
            className="text-[15px] font-medium text-gray-900 hover:text-gray-600"
          >
            Log in
          </button>
        </div>
      </nav>

      {/* Render the Modal */}
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        initialView={authView} 
      />
    </>
  );
}