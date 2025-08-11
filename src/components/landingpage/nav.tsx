import { ModeToggle } from "@/components/ui/themeTogle";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function Nav() {
  return (
    <nav className="backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-15">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="font-extrabold text-3xl text-gradient cursor-pointer text-primary">
                {/* Promo<span className="text-[var(--primary)]">L</span>in */}
                Promolink
                {/* <span className="text-[var(--primary)]">k</span> */}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ModeToggle />
            <Link href={"/signup"} className="hidden md:block">
              <Button variant="default" className="ml-3 px-4 py-1.5 text-sm">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
