"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useSession, signIn } from "next-auth/react";
import LoginButton from "./LoginButton";
import LogoutProfile from "@/app/components/agribarlab/LogoutProfile";
import { IoClose } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { handleGoogleSignIn } from "@/app/actions/auth-actions";

export default function AuthModal() {
  const { status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Added name field for sign-up
  const [state, setState] = useState(""); // Added state for registration
  const [designation, setDesignation] = useState(""); // Added designation for registration
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        // 1. Call your registration server action or API route for new users
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, name, state, designation }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to register.");

        // Automatically sign them in after successful registration
        await signIn("credentials", {
          email,
          password,
          callbackUrl: "/features",
        });
      } else {
        // 2. Sign in existing users via NextAuth credentials
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (result?.error) {
          throw new Error("Invalid email or password.");
        }

        window.location.href = "/features";
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
      setLoading(false);
    }
  };

  if (status === "authenticated") {
    return <LogoutProfile />;
  }

  if (status === "loading") {
    return <div className="text-xs text-slate-400">Loading...</div>;
  }

  return (
    <>
      <LoginButton onClick={() => setIsOpen(true)} />

      {isOpen && mounted && createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center backdrop-blur-xs p-4 py-12 overflow-y-auto animate-in fade-in duration-200">
          <div 
            className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full transition-colors cursor-pointer"
            >
              <IoClose size={20} />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {isSignUp ? "Create an Account" : "Welcome Back"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                {isSignUp ? "Sign up to join AgriLab" : "Sign in to access your features & blog"}
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-600 text-xs font-medium text-center">
                {error}
              </div>
            )}

            {/* OAuth Providers */}
            <div className="space-y-3 mb-5">
              <form action={handleGoogleSignIn.bind(null, "/features")}>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm cursor-pointer"
                >
                  <FcGoogle size={20} />
                  Continue with Google
                </button>
              </form>

              <button
                type="button"
                onClick={() => console.log("GitHub Login")}
                className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm cursor-pointer"
              >
                <FaGithub size={20} className="text-slate-900 dark:text-white" />
                Continue with GitHub
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-gray-900 px-3 text-slate-400 font-medium">
                  Or with email
                </span>
              </div>
            </div>

            {/* Email / Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">State</label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="e.g., Lagos"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Designation</label>
                    <input
                      type="text"
                      required
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      placeholder="e.g., Agronomist"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="farmer@agrilab.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-medium text-white transition-opacity hover:opacity-95 shadow-sm bg-green-600 cursor-pointer text-sm disabled:opacity-50"
              >
                {loading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
              </button>
            </form>

            {/* Switch Mode Footer */}
            <div className="text-center mt-6 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="font-semibold text-green-600 hover:underline cursor-pointer"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}