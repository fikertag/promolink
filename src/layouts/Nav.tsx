"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Nav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <div className="grid grid-cols-3 items-center px-4 xl:px-[70px] sticky top-0 z-20 border-b h-16 shadow-xs bg-white">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-black">
              Promo<span className="text-blue-600">Link</span>
            </span>
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <div className="flex justify-end items-center col-span-2">
          <nav className="hidden sm:flex justify-center text-gray-600">
            <Link
              href="/dashboard"
              className={`hover:text-primary transition px-5 py-2  ${
                isActive("/dashboard")
                  ? "text-primary underline-offset-8 underline"
                  : ""
              }`}
              onClick={closeMobileMenu}
            >
              Dashboard
            </Link>

            <Link
              href="/message"
              className={`hover:text-primary transition px-5 py-2 ${
                isActive("/message")
                  ? "text-primary underline-offset-8 underline"
                  : ""
              }`}
              onClick={closeMobileMenu}
            >
              Message
            </Link>

            <Link
              href="/contract"
              className={`hover:text-primary transition px-5 py-2 ${
                isActive("/contract")
                  ? "text-primary underline-offset-8 underline"
                  : ""
              }`}
              onClick={closeMobileMenu}
            >
              Contract
            </Link>
            <Link
              href="/profile"
              className={`hover:text-primary transition px-5 py-2 ${
                isActive("/profile")
                  ? "text-primary underline-offset-8 underline"
                  : ""
              }`}
              onClick={closeMobileMenu}
            >
              Profile
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="sm:hidden ml-3 p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden fixed inset-0 z-10 bg-white pt-20 px-4">
          <div className="flex flex-col space-y-4">
            <Link
              href="/dashboard"
              className={`text-lg px-4 py-3 rounded-lg ${
                isActive("/dashboard")
                  ? "bg-blue-50 text-primary font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={closeMobileMenu}
            >
              Dashboard
            </Link>

            <Link
              href="/profile"
              className={`text-lg px-4 py-3 rounded-lg ${
                isActive("/profile")
                  ? "bg-blue-50 text-primary font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={closeMobileMenu}
            >
              Profile
            </Link>

            <Link
              href="/message"
              className={`text-lg px-4 py-3 rounded-lg ${
                isActive("/message")
                  ? "bg-blue-50 text-primary font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={closeMobileMenu}
            >
              Message
            </Link>

            <Link
              href="/contract"
              className={`text-lg px-4 py-3 rounded-lg ${
                isActive("/contract")
                  ? "bg-blue-50 text-primary font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={closeMobileMenu}
            >
              Contract
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
