import { Input } from "@/components/ui/input";
import ProfileDropdown from "@/components/profile";

export default function Nav() {
  return (
    <div className="px-4 sm:px-8 bg-primary h-14 grid grid-cols-[1fr_2fr_1fr] items-center">
      <div className="hidden sm:flex text-3xl text-white">Promo</div>
      <div className="sm:hidden text-white">#</div>
      <div className="flex justify-center">
        <Input
          className="bg-white max-w-[500px] text-sm "
          placeholder="search influencer"
        />
      </div>
      <ProfileDropdown />
    </div>
  );
}
