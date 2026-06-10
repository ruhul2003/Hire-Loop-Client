"use client";

import React from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client"; 
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/signin"); 
          router.refresh();
        },
      },
    });
  };

  return (
    <nav className="w-full max-w-6xl mx-auto px-4 sm:px-6 my-4">
      <div className="bg-[#121214] border border-zinc-800/80 rounded-2xl px-6 py-3 flex items-center justify-between shadow-xl">
        
        {/* লোগো */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-0.5 font-bold text-2xl tracking-tight select-none">
            <span className="text-[#38bdf8]">hire</span>
            <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-orange-500 bg-clip-text text-transparent">
              loop
            </span>
          </Link>
        </div>

        {/* ডেক্সটপ নেভিগেশন লিংকসমূহ */}
        <div className="hidden sm:flex items-center gap-6">
          <Link href="/jobs" className="text-zinc-400 hover:text-white text-sm font-medium transition-colors duration-200">
            Browse Jobs
          </Link>
          <Link href="/company" className="text-zinc-400 hover:text-white text-sm font-medium transition-colors duration-200">
            Company
          </Link>
          <Link href="/pricing" className="text-zinc-400 hover:text-white text-sm font-medium transition-colors duration-200">
            Pricing
          </Link>

          <div className="h-5 w-[1px] bg-zinc-800 mx-1" />

          {/* সেশন চেকিং এবং কন্ডিশনাল রেন্ডারিং */}
          {isPending ? (
            // সেশন লোড হওয়ার সময় স্কেলেটন লোডার
            <div className="w-20 h-7 bg-zinc-800 animate-pulse rounded-lg" />
          ) : session ? (
            // ইউজার লগইন থাকলে প্রোফাইল ও সাইন আউট দেখাবে
            <div className="flex items-center gap-4">
              <span className="text-zinc-300 text-sm font-medium bg-zinc-900 px-3 py-1.5 border border-zinc-800 rounded-xl">
                {session.user?.name}
              </span>
              <button
                onClick={handleSignOut}
                className="text-sm font-medium text-rose-400 hover:text-rose-300 transition-colors duration-200 cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          ) : (
            // ইউজার লগইন না থাকলে সাইন ইন বাটনসমূহ দেখাবে
            <>
              <Link href="/auth/signin" className="text-[#6366f1] hover:text-[#4f46e5] text-sm font-medium transition-colors duration-200">
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-600/10 hover:opacity-90 active:scale-[0.98] transition-all duration-200"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* মোবাইল মেনু বাটন */}
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