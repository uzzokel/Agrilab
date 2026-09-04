"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import LoginButton from "./LoginButton";
import { IoClose } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { handleGoogleSignIn } from "@/app/actions/auth-actions";

export default function AuthModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password, isSignUp });
  };

  return (
    <>
      {/* Use the standalone button component to trigger the modal */}
      <LoginButton onClick={() => setIsOpen(true)} />

      {/* Modal Overlay rendered via Portal directly to body */}
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
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
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
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Password
                </label>
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
                className="w-full py-3 rounded-xl font-medium text-white transition-opacity hover:opacity-95 shadow-sm bg-green-600 cursor-pointer text-sm"
              >
                {isSignUp ? "Sign Up" : "Sign In"}
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