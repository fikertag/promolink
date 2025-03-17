"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Menu, User } from "lucide-react";

export default function ProfileDropdown() {
  const userEmail = "Fikiryilkal tages ";
  const userTitle = "Developer";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center justify-end sm:gap-2 cursor-pointer relative">
          <Menu className=" flex lg:hidden mr-3" />
          <Avatar className="h-8 w-8  ">
            <AvatarImage src="/pawn.png" alt="Profile" />
            <AvatarFallback className="">F</AvatarFallback>
          </Avatar>

          <div className="flex items-center gap-2 ">
            {/* Email shown only on medium screens and larger */}
            <div className="hidden lg:flex   ">
              <span className="text-md   ">{userEmail}</span>
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="black"
              className="hidden lg:flex"
            >
              <path d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z"></path>
            </svg>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 mt-2 rounded-none">
        {/* Email shown only on small screens */}
        <DropdownMenuItem className="lg:hidden cursor-default pr-1 overflow-hidden">
          <Avatar className="h-6 w-6 ">
            <AvatarImage
              src="/placeholder.svg?height=40&width=40"
              alt="Profile"
            />
            <AvatarFallback className="text-xs bg-gray-400">F</AvatarFallback>
          </Avatar>
          <div className="lg:hidden flex flex-col gap-0.5  ">
            <span className=" truncate ">{userEmail}</span>
            <span className="text-sm  ">{userTitle}</span>
          </div>
        </DropdownMenuItem>
        {/* Separator only shown on small screens */}
        <DropdownMenuSeparator className="md:hidden" />

        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>My Account</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
