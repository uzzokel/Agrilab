"use client";

import { useState, useEffect } from "react";
import Logo from "./Logo";
import Menus from "./Menus";
import ThemeToggle from "./ThemeToggle";
import { theme } from "@/app/components/Styles";
import Link from "next/link";
import { GiFarmer } from "react-icons/gi";
import AuthModal from "@/app/components/agribarlab/AuthModal";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { neutralLight, neutralDark, borderColor } = theme;
  const { data: session } = useSession();

  // Check if the current logged-in user is the admin
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "uzzokel@gmail.com";
  const isAdmin = session?.user?.email === adminEmail;

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
          
          {/* Conditionally show Admin Panel Button only for Admin */}
          {isAdmin && (
            <Link
              href="/admin"
              className="bg-amber-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-amber-600 transition shadow-xs flex items-center gap-1"
            >
              Admin Panel
            </Link>
          )}

          <AuthModal />
        </div>
        {/* Theme Toggle Button Added Here */}
        <ThemeToggle />
      </div>
    </header>
  );
}