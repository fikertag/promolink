import JobPreview from "@/components/JobPreview";
import { useJobs } from "@/context/Job";
import { authClient } from "@/lib/auth-client";
import { Skeleton } from "@/components/ui/skeleton";

export default function JobLists() {
  // Auth session
  const {
    data: session,
    // isPending: isSessionLoading,
    // error: sessionError,
    // refetch,
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
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[50px] w-full rounded-sm" />
            <div className="space-y-2 mb-10">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
            </div>
            <Skeleton className="h-[50px] w-full rounded-sm" />
            <div className="space-y-2 mb-10">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
            </div>
            <Skeleton className="h-[50px] w-full rounded-sm" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-full rounded-sm" />
              <Skeleton className="h-6 w-full rounded-sm" />
              <Skeleton className="h-6 w-full rounded-sm" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
