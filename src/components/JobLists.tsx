import JobPreview from "@/components/JobPreview";
import { useJobs } from "@/context/Job";

export default function JobLists() {
  const { jobs } = useJobs(); // Fetch jobs from the JobContext

  return (
    <div className="mx-auto h-[calc(100vh-1rem)] overflow-y-scroll container1 pb-10 w-full pt-7">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h1 className="h2 mb-4">Available Opportunities</h1>
          <p className="text-foreground/70">
            Find the perfect collaborative opportunities between businesses and
            influencers.
          </p>
        </div>
        <div className="flex flex-col gap-1">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <JobPreview key={job._id} job={job} /> // Render each job dynamically
            ))
          ) : (
            <p className="text-center text-gray-500">
              No jobs available at the moment.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
