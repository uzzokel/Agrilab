"use client"; // Needs to be a client component to use useTheme

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/agribarlab/Navbar";
import ScrollToTop from "@/app/components/agribarlab/ScrollToTop"; 
import { ThemeProvider, useTheme } from "@/app/components/agribarlab/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

// Create a inner wrapper layout component so we can use the useTheme hook inside the ThemeProvider
function RootContent({ children }: { children: React.ReactNode }) {
  const { currentTheme } = useTheme();

  return (
    <div 
      className={`min-h-screen ${inter.className}`}
      style={{ 
        backgroundColor: currentTheme.background, 
        color: currentTheme.text,
        transition: "background-color 0.3s ease, color 0.3s ease" 
      }}
    >
      <Navbar />
      {children}
      <ScrollToTop />
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <RootContent>{children}</RootContent>
        </ThemeProvider>
      </body>
    </html>
  );
}