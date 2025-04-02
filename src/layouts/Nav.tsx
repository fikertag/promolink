"use client";

import ProfileDropdown from "@/components/profile";
import Link from "next/link";
import { usePathname } from "next/navigation"; // ✅ App Router version
// import { Menu } from "lucide-react";

export default function Nav() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className=" grid grid-cols-3 items-center px-4 xl:px-[70px] sticky top-0  z-20 border-b  h-16 shadow-xs bg-white">
      <div className=" flex items-center">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold text-black">
            Promo<span className="text-blue-600">Link</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
      </div>

      {/* Profile Dropdown */}
      <div className="flex justify-end items-center col-span-2">
        <nav className="hidden mr-10 sm:flex justify-center   dark:text-white text- font-  text-gray-600">
          <Link
            href="/dashboard"
            className={`hover:text-primary transition border-x px-5 ${
              isActive("/dashboard")
                ? "text-primary underline-offset-8 underline"
                : ""
            }`}
          >
            Dashboard
          </Link>

          <Link
            href="/profile"
            className={`hover:text-primary transition border-x px-5 ${
              isActive("/profile")
                ? "text-primary underline-offset-8 underline"
                : ""
            }`}
          >
            Profile
          </Link>

          <Link
            href="/message"
            className={`hover:text-primary transition border-x px-5 ${
              isActive("/message")
                ? "text-primary underline-offset-8 underline"
                : ""
            }`}
          >
            Message
          </Link>

          <Link
            href="/contract"
            className={`hover:text-primary transition border-x px-5 ${
              isActive("/contract")
                ? "text-primary underline-offset-8 underline"
                : ""
            }`}
          >
            contract
          </Link>
        </nav>
        <ProfileDropdown />
        {/* <Menu size={15} className=" sm:hidden ml-3" /> */}
      </div>
    </div>
  );
}
