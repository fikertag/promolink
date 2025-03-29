"use client";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, ChevronDown } from "lucide-react";

export default function ProfileDropdown() {
  const userEmail = "Fikiryilkal tages ";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center justify-end sm:gap-2 cursor-pointer relative">
          {/* <Avatar className="h-8 w-8  ">
            <AvatarImage src="/pawn.png" alt="Profile" />
            <AvatarFallback className="">F</AvatarFallback>
          </Avatar> */}

          <div className="flex items-center border px-2 py-1 rounded-sm border-gray-200 ">
            <span className="text-sm  ">{userEmail}</span>
            <ChevronDown size={15} className="mt-1 mx-1" />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-50 rounded-sm  ">
        <DropdownMenuItem>
          <Link href="/profile">Profile</Link>{" "}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* <DropdownMenuItem>
        <Link href="/Dashboard">Dashboard</Link>{" "}
        </DropdownMenuItem>

        <DropdownMenuSeparator /> */}

        <DropdownMenuItem>
          <Link href="/message">Message</Link>{" "}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>My Account</span>
        </DropdownMenuItem> */}

        <DropdownMenuItem className="text-destructive focus:text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
