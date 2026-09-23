"use client";

import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { FiLogOut, FiUser, FiSettings } from "react-icons/fi";

export default function LogoutProfile() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if user clicks outside of it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (status === "loading") {
    return <div className="text-xs text-slate-400">Loading...</div>;
  }

  if (status === "authenticated" && session?.user) {
    return (
      <div className="relative" ref={dropdownRef}>
        {/* Profile Avatar Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600 cursor-pointer transition-transform hover:scale-105"
        >
          <img
            src={session.user.image || "https://via.placeholder.com/150"}
            alt={session.user.name || "User profile"}
            className="w-10 h-10 rounded-full border-2 border-green-600 object-cover shadow-sm"
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 py-3 z-[99999] animate-in fade-in zoom-in-95 duration-150">
            
            {/* User Info Header */}
            <div className="px-4 pb-3 border-b border-slate-100 dark:border-slate-800">
              <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                {session.user.name}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                {session.user.email}
              </p>
            </div>

            {/* Menu Options */}
            <div className="py-2 px-2 space-y-1">
              <div className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                <FiUser size={16} className="text-slate-400" />
                Manage Profile
              </div>

              <div className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                <FiSettings size={16} className="text-slate-400" />
                Account Settings
              </div>
            </div>

            {/* Sign Out Action */}
            <div className="pt-2 px-2 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-red-600 dark:text-red-400 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
              >
                <FiLogOut size={16} />
                Sign Out
              </button>
            </div>

          </div>
        )}
      </div>
    );
  }

  return null;
}