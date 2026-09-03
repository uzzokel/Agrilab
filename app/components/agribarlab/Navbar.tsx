"use client";

import { useState, useEffect } from "react";
import Logo from "./Logo";
import Menus from "./Menus";
import ThemeToggle from "./ThemeToggle";
import { theme } from "@/app/components/Styles";
import AuthButton from "@/app/components/agribarlab/auth-button";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { neutralLight, neutralDark, borderColor } = theme;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className="sticky top-6 z-50 w-[95%] max-w-7xl mx-auto rounded-2xl border shadow-md backdrop-blur-md transition-all duration-300"
      style={{ 
        backgroundColor: isScrolled ? neutralDark : neutralLight, 
        borderColor: borderColor 
      }}
    >
      <div className="max-w-8xl mx-auto px-1 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-4 lg:gap-16">
          <nav className="hidden lg:block">
            <Menus isScrolled={isScrolled} />
          </nav>
             <AuthButton />
        </div>
        {/* Theme Toggle Button Added Here */}
          <ThemeToggle />
      </div>
    </header>
  );
}