"use client";

import { useTheme } from "@/app/components/agribarlab/ThemeContext";
import SignInButton from "@/app/components/agribarlab/SignInButton";

export default function SignInPage() {
  const { currentTheme } = useTheme();

  return (
    <main 
      className="flex flex-col items-center justify-center min-h-[80vh] px-4"
      style={{ backgroundColor: currentTheme.background, color: currentTheme.text }}
    >
      <div 
        className="p-8 rounded-2xl shadow-xl border max-w-md w-full text-center space-y-6"
        style={{ 
          backgroundColor: currentTheme.cardBg, 
          borderColor: currentTheme.borderColor 
        }}
      >
        <div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: currentTheme.primaryColor }}>
            Welcome to AgriLab
          </h1>
          <p className="text-sm opacity-80">
            Sign in to access your monitoring, evaluation, and impact tracking dashboards.
          </p>
        </div>

        <div className="flex justify-center pt-2">
          <SignInButton />
        </div>
      </div>
    </main>
  );
}