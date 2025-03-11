import Nav from "@/layouts/Nav";
import JobPreview from "@/components/JobPreview";
export default function Home() {
  return (
    <div className="bg-white">
      <Nav />

      <div className="grid grid-cols-[8fr_3fr] h-screen mx-10">
        <div className=" bg-white p-10">
          <div className="text-3xl font-bold mb-8">Dashboard</div>
          <div className="flex justify-between gap-5 flex-wrap mb-10">
            <div className="border h-30 w-45 p-4 rounded-lg shadow-sm">
              <div className="text-lg font-bold mb-2 ">Total earning</div>
              <div className="text-2xl font-bold">1290 Br</div>
              <div className="text-xs text-[#676767]">
                {" "}
                490 Br in this month
              </div>
            </div>
            <div className="border h-30 w-45 p-4 rounded-lg shadow-sm">
              <div className="text-lg font-bold mb-2 ">Total Followers</div>
              <div className="text-2xl font-bold">1.7M</div>
              <div className="text-xs text-[#676767]">+5k this month</div>
            </div>
            <div className="border h-30 w-45 p-4 rounded-lg shadow-sm">
              <div className="text-lg font-bold mb-2 ">Total earning</div>
              <div className="text-2xl font-bold">1290 Br</div>
              <div className="text-xs text-[#676767]">
                {" "}
                490 Br in this month
              </div>
            </div>
            <div className="border h-30 w-45 p-4 rounded-lg shadow-sm">
              <div className="text-lg font-bold mb-2 ">Total earning</div>
              <div className="text-2xl font-bold">1290 Br</div>
              <div className="text-xs text-[#676767]">
                {" "}
                490 Br in this month
              </div>
            </div>
          </div>
          <h1 className="text-xl mb-5">Jobs you might like</h1>
          <JobPreview />
          <JobPreview />
          <JobPreview />
          <JobPreview />
        </div>
        <div className="bg-white border mt-10 flex justify-center">
          <div className="border h-10">Edit profile</div>
        </div>
      </div>
    </div>
  );
}
