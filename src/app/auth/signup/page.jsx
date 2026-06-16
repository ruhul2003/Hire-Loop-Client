"use client";

import React, { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Description, Label, Radio, RadioGroup } from "@heroui/react";

import { At, Lock, ArrowRight, Person, CircleXmarkFill } from "@gravity-ui/icons";
import { useSearchParams } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("seeker");
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";





  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const plan = role ===  "seeker" ? "seeker_free" : "recruiter_free";

    try {
      await authClient.signUp.email({
        email,
        password,
        name,
        role,
        plan
      }, {
        onRequest: () => setIsLoading(true),
        onSuccess: () => {
          setIsLoading(false);
          router.push(redirectTo);
          router.refresh();
        },
        onError: (ctx) => {
          setIsLoading(false);
          setError(ctx.error.message || "Failed to create an account.");
        }
      });
    } catch (err) {
      setIsLoading(false);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <main className="w-full min-h-[calc(100vh-120px)] bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md bg-[#0c0c0e]/80 backdrop-blur-md border border-zinc-900 rounded-2xl p-8 shadow-2xl relative z-10">

        {/* Logo/Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <Link href="/" className="flex items-center gap-0.5 font-bold text-2xl tracking-tight mb-3 select-none">
            <span className="text-[#38bdf8]">hire</span>
            <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-orange-500 bg-clip-text text-transparent">
              loop
            </span>
          </Link>
          <h2 className="text-xl font-medium text-zinc-200">Create your account</h2>
          <p className="text-sm text-zinc-500 mt-1">Get started with your hireloop account today</p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-5">
          {/* Error Message */}
          {error && (
            <div className="bg-rose-950/40 border border-rose-900/60 rounded-xl p-3 flex items-center gap-2 text-rose-400 text-xs font-medium">
              <CircleXmarkFill className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Full Name Input */}
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

          {/* Email Input */}
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

          {/* Password Input */}
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

          {/* User Role Selection*/}

          <div className="flex flex-col gap-4">
            <Label>Subscription plan</Label>
            <RadioGroup defaultValue="seeker" name="role" onChange={value => setRole(value)} orientation="horizontal">
              <Radio value="seeker">
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                <Radio.Content>
                  <Label>Job Seeker</Label>
                </Radio.Content>
              </Radio>
              <Radio value="pro">
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                <Radio.Content>
                  <Label>Recruiter</Label>
                </Radio.Content>
              </Radio>
            </RadioGroup>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 disabled:opacity-50 text-white font-medium text-sm py-3 rounded-xl shadow-lg shadow-indigo-600/10 flex items-center justify-center gap-2 transition-all active:scale-[0.99] mt-2 cursor-pointer"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign Up</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Bottom Footer Link */}
        <div className="text-center mt-6 text-xs text-zinc-500">
          Already have an account?{" "}
          <Link href={`/auth/signin?redirect=${redirectTo}`} className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
            Sign In
          </Link>
        </div>

      </div>
    </main>
  );
}