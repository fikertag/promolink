import { Star } from "lucide-react";
import { useState } from "react";
import SocialIcon, { SocialPlatform } from "./SocialIcons";
import { useJobs } from "@/context/Job";

interface Job {
  _id: string;
  title: string;
  description: string;
  price: number;
  location?: string;
  socialMedia: {
    platform: SocialPlatform;
  }[];
  postedBy: string;
  status: "open" | "in-progress" | "completed" | "cancelled";
  hiredInfluencers: string[];
  proposalsSubmitted: Array<{
    _id: string;
    influencerId: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

interface JobPreviewProps {
  job: Job;
  influencerId: string; // Add influencerId to props
}

const JobPreview: React.FC<JobPreviewProps> = ({ job, influencerId }) => {
  const { addProposalToJob } = useJobs();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const hasAppliedOrHired =
    job.hiredInfluencers.includes(influencerId) ||
    job.proposalsSubmitted?.some(
      (proposal) => proposal.influencerId === influencerId
    );

  const handleApplyClick = () => {
    setIsModalOpen(true);
    setSubmitError(null); // Reset error when opening modal
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/proposal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobId: job._id,
          influencerId: influencerId,
          message: message,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit proposal");
      }
      const data = await response.json();
      addProposalToJob(job._id, { _id: data._id, influencerId });
      setIsModalOpen(false);

      setMessage("");
    } catch (error) {
      console.error("Error submitting proposal:", error);
      setSubmitError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="rounded-lg border border-gray-300 text-card-foreground card-hover p-5 mb-5 transition-all bg-white">
        <div>
          <p className="text-xs text-[#676767] font-light text-start">
            {new Date(job.createdAt).toLocaleDateString()}
          </p>

          <div className="flex">
            <div className="flex flex-col w-full gap-2">
              <p className="text-lg leading-6 font- text-start">{job.title}</p>

              <p className="font-bold text-start">
                Price: <span className="text-">${job.price}</span>
              </p>

              <div className="flex overflow-x-scroll gap-3 container1">
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

                <div
                  className={`hidden sm:flex w-fit px-5 cursor-pointer py-2 rounded-sm text-sm ${
                    hasAppliedOrHired
                      ? "bg-gray-300 cursor-not-allowed text-green-800 font-semibold"
                      : "bg-primary/10 hover:bg-primary/10 text-primary"
                  }`}
                  onClick={!hasAppliedOrHired ? handleApplyClick : undefined}
                >
                  {hasAppliedOrHired ? "Already Applied" : "Apply"}
                </div>
              </div>

              <div className="flex sm:hidden justify-between items-center flex-shrink-0">
                <div
                  className={`w-full px-5 cursor-pointer mt-3 py-2 rounded-sm text-sm ${
                    hasAppliedOrHired
                      ? "bg-gray-300 cursor-not-allowed text-green-800 font-semibold"
                      : "bg-primary hover:bg-primary/80"
                  }`}
                  onClick={!hasAppliedOrHired ? handleApplyClick : undefined}
                >
                  {hasAppliedOrHired ? "Already Applied" : "Apply"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Apply for {job.title}</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Write why you're a good fit for this job..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              {submitError && (
                <div className="mb-4 text-red-500 text-sm">{submitError}</div>
              )}

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                  onClick={() => {
                    setIsModalOpen(false);
                    setMessage("");
                  }}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark disabled:bg-primary/50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default JobPreview;
