"use client";

import { Star } from "lucide-react";
import SocialIcon from "./SocialIcons";
import { IJob as Job } from "@/types/api";
import { formatDistanceToNow } from "date-fns";
import Comfirm from "@/app/influencer/components/comfirm";
import { useApplyToJob } from "@/hooks/useJobs";

interface JobPreviewProps {
  job: Job;
}

const JobPreview: React.FC<JobPreviewProps> = ({ job }) => {
  const { mutate: applyToJob, isPending } = useApplyToJob();
  const handleSubmit = (proposalMessage: string) => {
    applyToJob({ jobId: job._id, message: proposalMessage });
  };

  return (
    <>
      <div className="rounded-lg border border-gray-300 text-card-foreground card-hover p-5 transition-all bg-card">
        <div>
          <p className="text-sm text-[#676767] font-light text-start mb-3">
            {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
          </p>
          <div className="flex">
            <div className="flex flex-col w-full gap-1 ">
              <p className="text-xl leading-6 text-start ">{job.title}</p>
              <p className="text-gray-500 font-light">{job.description}</p>
              <p className=" text-start">
                Price: <span className="">${job.price}</span>
              </p>

              <div className="flex gap-3 container1 ">
                {job.socialMedia.map((media, index) => (
                  <div
                    key={index}
                    className="bg-gray-0 text-xs flex items-center py-1 rounded-md text-gray-700 gap-1"
                  >
                    <SocialIcon platform={media.platform} />
                    <span className="capitalize">{media.platform}</span>
                  </div>
                ))}
              </div>

              <div className="text-sm text-[#676767] flex justify-between items-center">
                <div className="flex gap-3 items-center justify-between">
                  <div>
                    Location:{" "}
                    <span className="text-black font-semibold ml-1">
                      {job.location || "Remote"}
                    </span>
                  </div>

                  <div className="flex gap-1 items-center">
                    Verified
                    {Array(4)
                      .fill(0)
                      .map((_, idx) => (
                        <Star
                          key={idx}
                          size={10}
                          color="orange"
                          fill="orange"
                        />
                      ))}
                  </div>
                </div>

                <Comfirm
                  buttonText="Apply"
                  dialogTitle="Attach your proposal"
                  dialogDescription="Please provide any additional information to support your application."
                  placeholder="your proposal message"
                  finalButtonText="Submit Application"
                  functionToRun={handleSubmit}
                  isLoading={isPending}
                />
              </div>

              <div className="flex sm:hidden justify-between items-center flex-shrink-0">
                <Comfirm
                  buttonText="Apply"
                  dialogTitle="Attach your proposal"
                  dialogDescription="Please provide any additional information to support your application."
                  placeholder="your proposal message"
                  finalButtonText="Submit Application"
                  functionToRun={handleSubmit}
                  isLoading={isPending}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobPreview;
