"use client";
import JobPreview from "@/components/JobPreview";
import { Skeleton } from "@/components/ui/skeleton";
import { useMyJobApplications } from "@/hooks/useJobs";
import { useEffect } from "react";

export default function JobLists() {
  const { data: jobs } = useMyJobApplications();
  useEffect(() => {
    console.log("Jobs updated:", jobs);
  }, [jobs]);

  return (
    <div className="text-center w-4xl mx-auto mb-8">
      <div className="text-center mx-auto mb-8">
        <h1 className=" mt-4 text-2xl md:text-3xl text-blue-600">
          Available Opportunities
        </h1>
        <p className="text-foreground/70 mt-1">
          Find the perfect collaborative opportunities
        </p>
      </div>
      <div className="flex flex-col gap-1">
        {jobs && jobs.length > 0 ? (
          jobs.map((job) => <JobPreview key={job._id} job={job} />)
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
          </div>
        )}
      </div>
    </div>
  );
}
