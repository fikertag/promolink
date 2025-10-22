"use client";

import { Star } from "lucide-react";
import SocialIcon from "./SocialIcons";
import { IJob as Job } from "@/types/api";
import { formatDistanceToNow } from "date-fns";
import Comfirm from "@/app/influencer/components/comfirm";
import { useApplyToJob, useSaveJob } from "@/hooks/useJobs";
import { BookmarkButton } from "./bookmark";
import { Button } from "./ui/button";

interface JobPreviewProps {
  job: Job;
  isApplyed?: boolean;
  isSaved?: boolean;
}

const JobPreview: React.FC<JobPreviewProps> = ({ job, isApplyed, isSaved }) => {
  const { mutate: applyToJob, isPending } = useApplyToJob();
  const { mutate: saveJob } = useSaveJob();
  const handleSubmit = (proposalMessage: string) => {
    applyToJob({ jobId: job._id, message: proposalMessage });
  };

  return (
    <>
      <div className="rounded-lg border border-gray-300 text-card-foreground card-hover p-4 sm:p-5 transition-all bg-card">
        <div>
          <p className="text-sm text-[#676767] font-light text-start sm:mb-3">
            {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
          </p>
          <div className="flex">
            <div className="flex flex-col w-full gap-1 ">
              <p className="sm:text-xl leading-6 text-start ">{job.title}</p>
              <p className="text-gray-500 text-sm sm:text-base font-light">
                {job.description}
              </p>
              <p className=" text-start text-sm sm:text-base mt-3 sm:mt-0">
                Price: <span className="">${job.price}</span>
              </p>

              <div className="flex flex-wrap gap-3 ">
                {job.socialMedia.map((media, index) => (
                  <Button variant="outline" size={"sm"} key={index}>
                    <SocialIcon platform={media.platform} />
                    <span className="capitalize">{media.platform}</span>
                  </Button>
                ))}
              </div>

              <div
                className={`text-sm text-[#676767] flex  justify-between items-center  sm:flex-row ${
                  !isApplyed && "flex-col "
                } items-start  sm:items-center gap-1  `}
              >
                <div className="flex gap-3 h-full items-center">
                  Location:
                  <span className=" ml-1">{job.location || "Remote"}</span>
                </div>
                <div
                  className={`flex items-end ${
                    !isApplyed && "w-full"
                  } sm:w-auto gap-2 flex-row-reverse`}
                >
                  <BookmarkButton
                    isSaved={!!isSaved}
                    onChange={() => {
                      saveJob({ jobId: job._id });
                    }}
                  />
                  {!isApplyed && (
                    <div className="flex-1">
                      {" "}
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
                  )}
                </div>
              </div>

              {/* <div className="flex sm:hidden justify-between items-center flex-shrink-0">
                {isApplyed && (
                  <Comfirm
                    buttonText="Apply"
                    dialogTitle="Attach your proposal"
                    dialogDescription="Please provide any additional information to support your application."
                    placeholder="your proposal message"
                    finalButtonText="Submit Application"
                    functionToRun={handleSubmit}
                    isLoading={isPending}
                  />
                )}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobPreview;
