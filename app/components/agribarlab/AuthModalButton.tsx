"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useTheme } from "@/app/components/agribarlab/ThemeContext";
import { LogIn, Mail, Github, Chrome, X } from "lucide-react";

export default function AuthModalButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const { currentTheme } = useTheme();

  const handleEmailSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Triggers email/password or magic link sign-in if configured
    signIn("resend", { email, callbackUrl: "/dashboard" });
  };

  return (
    <>
      {/* 1. Rounded Sign In Button with Icon */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all shadow-sm hover:opacity-95 cursor-pointer text-sm"
        style={{
          backgroundColor: currentTheme?.primaryColor || "#16a34a",
          color: "#ffffff",
        }}
      >
        <LogIn className="w-4 h-4" />
        Sign In
      </button>

      {/* 2. Modal Popup Form */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-800 animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Welcome to AgriLab
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Choose your preferred sign-in method
              </p>
            </div>

            <div className="space-y-3">
              {/* Google Sign In */}
              <button
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <Chrome className="w-5 h-5 text-red-500" />
                Continue with Google
              </button>

              {/* GitHub Sign In */}
              <button
                onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <Github className="w-5 h-5 text-gray-900 dark:text-white" />
                Continue with GitHub
              </button>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-gray-900 px-2 text-gray-400">
                  Or continue with email
                </span>
              </div>
            </div>

            {/* Email Form Prompt */}
            <form onSubmit={handleEmailSignIn} className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl font-medium text-white transition-opacity hover:opacity-95 shadow-sm"
                style={{
                  backgroundColor: currentTheme?.primaryColor || "#16a34a",
                }}
              >
                Continue with Email
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}