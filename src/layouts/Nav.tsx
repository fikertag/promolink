"use client";

import ProfileDropdown from "@/components/profile";
import Link from "next/link";
import { usePathname } from "next/navigation"; // ✅ App Router version

export default function Nav() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="h-14 grid grid-cols-2 lg:grid-cols-3 items-center border-b px-4 xl:px-[70px] sticky top-0 bg-white/85 dark:bg-black backdrop-blur-md z-20">
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-1 text-2xl font-bold dark:text-white text-gray-900"
      >
        PromoLink
      </Link>

      {/* Desktop Nav Links */}
      <nav className="hidden lg:flex justify-center gap-10 text-sm dark:text-white text-gray-700 font-medium">
        <Link
          href="/dashboard"
          className={`hover:text-primary transition ${
            isActive("/dashboard")
              ? "text-primary underline-offset-4 underline"
              : ""
          }`}
        >
          Dashboard
        </Link>

        <Link
          href="/profile"
          className={`hover:text-primary transition ${
            isActive("/profile")
              ? "text-primary underline-offset-4 underline"
              : ""
          }`}
        >
          Profile
        </Link>

        <Link
          href="/message"
          className={`hover:text-primary transition ${
            isActive("/message")
              ? "text-primary underline-offset-4 underline"
              : ""
          }`}
        >
          Messages
        </Link>
      </nav>

      {/* Profile Dropdown */}
      <div className="flex justify-end">
        <ProfileDropdown />
      </div>
    </div>
  );
}
