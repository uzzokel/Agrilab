"use client";

import { ThemeProvider, useTheme } from "@/app/components/agribarlab/ThemeContext";
import Navbar from "@/app/components/agribarlab/Navbar";
import ScrollToTop from "@/app/components/agribarlab/ScrollToTop";

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { currentTheme } = useTheme();

  return (
    <div 
      className="min-h-screen transition-colors duration-300"
      style={{ 
        backgroundColor: currentTheme.background, 
        color: currentTheme.text 
      }}
    >
      <Navbar />
      {children}
      <ScrollToTop />
    </div>
  );
}

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ThemeWrapper>{children}</ThemeWrapper>
    </ThemeProvider>
  );
}