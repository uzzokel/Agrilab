"use client"
import { useTheme } from "@/app/components/agribarlab/ThemeContext";

export default function Home() {
  const { currentTheme } = useTheme();

  return (
    <main 
      className="w-full min-h-screen px-6 py-12 transition-colors duration-300" 
      style={{ 
        backgroundColor: currentTheme.background, 
        color: currentTheme.text 
      }}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2 py-10" style={{ color: currentTheme.primaryColor }}>
            AgriLab M&E Platform
          </h1>
          <p className="text-lg opacity-80">
            Decentralized monitoring, evaluation, and impact tracking system.
          </p>
        </div>

        {/* Inline content instead of a boxed card */}
        <div className="pt-4 border-t" style={{ borderColor: currentTheme.borderColor }}>
          <span 
            className="inline-block px-3 py-1 rounded-full text-sm font-semibold mb-2"
            style={{ backgroundColor: currentTheme.secondaryColor, color: "#ffffff" }}
          >
            Active Project
          </span>
          <h2 className="text-xl font-semibold" style={{ color: currentTheme.primaryColor }}>
            Fadama & IFAD Impact Dashboard
          </h2>
        </div>
      </div>
    </main>
  );
}