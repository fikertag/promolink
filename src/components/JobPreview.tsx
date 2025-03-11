import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function JobPreview({}) {
  return (
    <div className=" border border-black/0 p-3 mb-3 shadow-sm rounded-sm">
      <div>
        <p className="text-xs text-[#676767] font-light">Posted 1 houre ago</p>
        <div className="flex ">
          {/* <div className="">
            <Avatar className="h-10 w-10 ">
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt="Profile"
              />
              <AvatarFallback>M</AvatarFallback>
            </Avatar>
          </div> */}
          <div className=" flex flex-col gap-2">
            <p className="text-black text-lg">
              Looking for Greek, Moroccan, or Turkish Sales Representatives
            </p>
            <p className="text-xs text-[#676767] font-light">Price: 100 birr</p>
            <p className="text-sm font-light">
              We are seeking dedicated and articulate Customer Service
              Representatives based in Mauritius to join our e-commerce team.
            </p>
            <div className="flex gap-2">
              <div className="bg-gray-200 text-xs flex items-center px-3 py-1 rounded-xl text-gray-700 ">
                Tiktok
              </div>
              <div className="bg-gray-200 text-xs flex items-center px-3 rounded-xl text-gray-700 py-1 ">
                Instagram
              </div>
              <div className="bg-gray-200 text-xs flex items-center px-3 rounded-xl text-gray-700 py-1 ">
                FaceBook
              </div>
              <div className="bg-gray-200 text-xs flex items-center px-3 rounded-xl text-gray-700 py-1 ">
                Telegram
              </div>
            </div>
            <div className="text-sm text-[#676767]">
              location: <span className=" text-black font-semibold">Tecno</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
