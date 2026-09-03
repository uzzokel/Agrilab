"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useTheme } from "@/app/components/agribarlab/ThemeContext";
import { LogIn, Mail, X } from "lucide-react";

export default function AuthModalButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const { currentTheme } = useTheme();

  const handleEmailSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    signIn("resend", { email, callbackUrl: "/dashboard" });
  };

  return (
    <>
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

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-800">
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
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.4 1.9 14.9 1 12 1 7.7 1 4 3.5 2.2 7.1l3.7 2.8C6.8 7.3 9.2 5 12 5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.9 14.9c-.2-.7-.4-1.5-.4-2.4s.2-1.7.4-2.4L2.2 7.3C1.4 8.9 1 10.4 1 12s.4 3.1 1.2 4.7l3.7-2.8z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-2.8 0-5.2-2.3-6.1-5.1L2.2 16C4 19.6 7.7 23 12 23z"
                  />
                </svg>
                Continue with Google
              </button>

              {/* GitHub Sign In */}
              <button
                onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
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