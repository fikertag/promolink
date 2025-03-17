import { Star } from "lucide-react";
import SocialIcon, { SocialPlatform } from "./SocialIcons";

interface Job {
  postedTime: string;
  title: string;
  price: string;
  description: string;
  tags: SocialPlatform[]; // Now strictly valid platforms!
  location: string;
}

interface JobPreviewProps {
  job: Job;
}

const JobPreview: React.FC<JobPreviewProps> = ({ job }) => {
  return (
    <div className="border-[#caafb5]/10 rounded-md p-3 mb-5  transition-all bg-white">
      <div>
        <p className="text-xs text-[#676767] font-light">{job.postedTime}</p>

        <div className="flex">
          <div className="flex flex-col w-full gap-2">
            <p className="text-black text-xl leading-6 font-semibold">
              {job.title}
            </p>

            <p className="text-sm text-[#676767] font-light">
              Price: <span className=" text-primary">{job.price}</span>
            </p>

            {/* Tags + Social Icons */}
            <div className="flex w-[80vw] overflow-x-scroll gap-3 container1">
              {job.tags.map((tag, index) => (
                <div
                  key={index}
                  className="bg-gray-0 text-xs flex items-center py-1 rounded-md text-gray-700 gap-1"
                >
                  <SocialIcon platform={tag} />
                  <span className="capitalize">{tag}</span>
                </div>
              ))}
            </div>

            {/* Location and Stars */}
            <div className="text-sm text-[#676767] flex justify-between items-center">
              <div className="flex gap-3 items-center justify-between">
                <div>
                  Location:{" "}
                  <span className="text-black font-semibold ml-1">
                    {job.location}
                  </span>
                </div>

                <div className="flex gap-1 items-center">
                  Verified
                  {Array(4)
                    .fill(0)
                    .map((_, idx) => (
                      <Star key={idx} size={10} color="orange" fill="orange" />
                    ))}
                </div>
              </div>

              {/* Desktop Apply Button */}
              <div className="hidden sm:flex bg-primary/10  w-fit px-5 cursor-pointer hover:bg-primary/10 py-2 rounded-sm text-primary  mr-5 text-sm">
                Apply
              </div>
            </div>

            {/* Mobile Apply Button */}
            <div className="flex sm:hidden justify-between items-center flex-shrink-0">
              <div>Location:&nbsp;{job.location}</div>
              <div className="bg-primary w-fit px-5 cursor-pointer hover:bg-primary/80 py-2 rounded-sm text-white">
                Apply
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPreview;
