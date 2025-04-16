import Link from "next/link";

const Welcome = () => {
  return (
    <div className="h-96 bg-blue-600 text-white flex flex-col items-center justify-center px-5  ">
      <h1 className=" text-3xl sm:text-5xl font-semibold text-center mb-3">
        Hire Marketers & Influencers for Your Business
      </h1>
      <p className="text-lg mt-2 text-center">
        Connect with skilled professionals to grow your brand and reach your
        target audience effectively
      </p>
      <div className="flex gap-4 mt-4">
        <Link
          href={"/business/influencers"}
          className="bg-white text-blue-600 px-4 py-2.5 rounded-sm mt-4 hover:bg-gray-200 transition duration-300"
        >
          Find Influencers
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
