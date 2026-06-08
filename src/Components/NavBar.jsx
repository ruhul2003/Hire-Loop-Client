"use client";

import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full max-w-6xl mx-auto px-4 sm:px-6 my-4">
      <div className="bg-[#121214] border border-zinc-800/80 rounded-2xl px-6 py-3 flex items-center justify-between shadow-xl">
        
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-0.5 font-bold text-2xl tracking-tight select-none">
            <span className="text-[#38bdf8]">hire</span>
            <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-orange-500 bg-clip-text text-transparent">
              loop
            </span>
          </Link>
        </div>

        <div className="hidden sm:flex items-center gap-6">
          <Link 
            href="/jobs" 
            className="text-zinc-400 hover:text-white text-sm font-medium transition-colors duration-200"
          >
            Browse Jobs
          </Link>
          <Link 
            href="/company" 
            className="text-zinc-400 hover:text-white text-sm font-medium transition-colors duration-200"
          >
            Company
          </Link>
          <Link 
            href="/pricing" 
            className="text-zinc-400 hover:text-white text-sm font-medium transition-colors duration-200"
          >
            Pricing
          </Link>

          <div className="h-5 w-[1px] bg-zinc-800 mx-1" />

          <Link 
            href="/signin" 
            className="text-[#6366f1] hover:text-[#4f46e5] text-sm font-medium transition-colors duration-200"
          >
            Sign In
          </Link>

          <Link
            href="/signup"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-600/10 hover:opacity-90 active:scale-[0.98] transition-all duration-200"
          >
            Get Started
          </Link>
        </div>

        <div className="sm:hidden">
          <button className="text-zinc-400 hover:text-white focus:outline-none">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

      </div>
    </nav>
  );
}