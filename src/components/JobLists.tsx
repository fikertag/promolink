import JobPreview from "@/components/JobPreview";
import { useJobs } from "@/context/Job";
import { authClient } from "@/lib/auth-client";

export default function JobLists() {
  // Auth session
  const {
    data: session,
    isPending: isSessionLoading,
    error: sessionError,
    refetch,
  } = authClient.useSession();

  const { jobs } = useJobs(); // Fetch jobs from the JobContext

  return (
    <div className="text-center w-4xl mx-auto mb-8">
      <div className="text-center mx-auto mb-8">
        <h1 className=" mt-4 text-3xl text-blue-600">
          Available Opportunities
        </h1>
        <p className="text-foreground/70 mt-1">
          Find the perfect collaborative opportunities.
        </p>
      </div>
      <div className="flex flex-col gap-1">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <JobPreview
              key={job._id}
              job={job}
              influencerId={session?.user.id || ""}
            /> // Render each job dynamically
          ))
        ) : (
          <p className="text-center text-gray-500">
            No jobs available at the moment.
          </p>
        )}
      </div>
    </div>
  );
}
