"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { theme } from "@/app/components/Styles";

interface MenusProps {
  isScrolled: boolean;
}

const menuItems = [
  { label: "Home", path: "/" },
  { label: "Features", path: "/services" },
  { label: "About", path: "/about" },
  { label: "Blog", path: "/blog" },
];

export default function Menus({ isScrolled }: MenusProps) {
  const pathname = usePathname();
  const { secondaryColor, neutralLight, neutralMuted } = theme;

  return (
    <nav className="hidden md:flex items-center space-x-8">
      {menuItems.map((item) => {
        const isActive = pathname === item.path;
        const color = isActive 
          ? secondaryColor 
          : isScrolled 
            ? neutralLight 
            : neutralMuted;

        return (
          <Link
            key={item.path}
            href={item.path}
            className="text-sm font-medium transition-colors hover:opacity-80"
            style={{ color }}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}