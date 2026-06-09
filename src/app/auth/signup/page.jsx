"use client";

import React, { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { At, Person, Lock, ArrowRight, ShieldCheck, CircleXmarkFill } from "@gravity-ui/icons";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await authClient.signUp.email({
        email,
        password,
        name,
        callbackURL: "/dashboard",
      }, {
        onRequest: () => setIsLoading(true),
        onSuccess: () => {
          setIsLoading(false);
          setSuccess(true);
        },
        onError: (ctx) => {
          setIsLoading(false);
          setError(ctx.error.message || "Something went wrong. Please try again.");
        }
      });
    } catch (err) {
      setIsLoading(false);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <main className="w-full min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md bg-[#0c0c0e]/80 backdrop-blur-md border border-zinc-900 rounded-2xl p-8 shadow-2xl relative z-10">
        
        <div className="flex flex-col items-center mb-8 text-center">
          <Link href="/" className="flex items-center gap-0.5 font-bold text-2xl tracking-tight mb-3">
            <span className="text-[#38bdf8]">hire</span>
            <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-orange-500 bg-clip-text text-transparent">
              loop
            </span>
          </Link>
          <h2 className="text-xl font-medium text-zinc-200">Create your account</h2>
          <p className="text-sm text-zinc-500 mt-1">Join hireloop to land your dream job</p>
        </div>

        {success ? (
          <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-xl p-4 flex items-start gap-3 text-emerald-400 text-sm mb-6">
            <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-emerald-300">Registration successful!</p>
              <p className="text-zinc-400 text-xs mt-1">Please check your email or proceed to login.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSignUp} className="space-y-5">
            {error && (
              <div className="bg-rose-950/40 border border-rose-900/60 rounded-xl p-3 flex items-center gap-2 text-rose-400 text-xs font-medium">
                <CircleXmarkFill className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Full Name</label>
              <div className="w-full bg-[#121214] border border-zinc-800 focus-within:border-indigo-600 rounded-xl px-3.5 py-2.5 flex items-center gap-3 transition-colors">
                <Person className="text-zinc-500 w-4 h-4" />
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-transparent text-white text-sm w-full focus:outline-none placeholder-zinc-600"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Email Address</label>
              <div className="w-full bg-[#121214] border border-zinc-800 focus-within:border-indigo-600 rounded-xl px-3.5 py-2.5 flex items-center gap-3 transition-colors">
                <At className="text-zinc-500 w-4 h-4" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent text-white text-sm w-full focus:outline-none placeholder-zinc-600"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Password</label>
              <div className="w-full bg-[#121214] border border-zinc-800 focus-within:border-indigo-600 rounded-xl px-3.5 py-2.5 flex items-center gap-3 transition-colors">
                <Lock className="text-zinc-500 w-4 h-4" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-transparent text-white text-sm w-full focus:outline-none placeholder-zinc-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 disabled:opacity-50 text-white font-medium text-sm py-3 rounded-xl shadow-lg shadow-indigo-600/10 flex items-center justify-center gap-2 transition-all active:scale-[0.99] mt-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        <div className="text-center mt-6 text-xs text-zinc-500">
          Already have an account?{" "}
          <Link href="/signin" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
            Sign In
          </Link>
        </div>

      </div>
    </main>
  );
}