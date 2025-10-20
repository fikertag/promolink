"use client";
import JobPreview from "@/components/JobPreview";
import { Skeleton } from "@/components/ui/skeleton";
import { useMyJobApplications } from "@/hooks/useJobs";
import { useEffect, useState } from "react";
import { Briefcase, TrendingUp, Clock, Bookmark } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function JobLists() {
  const { data: jobs, isLoading } = useMyJobApplications();
  const [activeTab, setActiveTab] = useState("match");

  useEffect(() => {
    console.log("Jobs updated:", jobs);
  }, [jobs]);

  const ComingSoonTab = ({
    title,
    icon: Icon,
    description,
  }: {
    title: string;
    icon: any;
    description: string;
  }) => (
    <div className="col-span-full text-center py-16">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mb-4">
        <Icon className="w-8 h-8 text-blue-600" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 max-w-md mx-auto mb-6">{description}</p>
      <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
        <Clock className="w-4 h-4" />
        Coming Soon
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-200 p-4">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className=" mb-4">
          <h1 className="text-xl md:text-3xl text-gray-900">Available jobs</h1>
          <p className=" text-gray-600 max-w-2xl">
            Find the perfect collaborative opportunities to grow.
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-120 grid-cols-3 mb-2 ">
            <TabsTrigger value="match" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Matchs
            </TabsTrigger>
            <TabsTrigger value="applied" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Applied
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center gap-2">
              <Bookmark className="w-4 h-4" />
              Saved
            </TabsTrigger>
          </TabsList>

          <TabsContent value="match">
            <div className="grid gap-5 ">
              {isLoading ? (
                // Loading skeletons
                Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Skeleton className="w-12 h-12 rounded-lg" />
                      <div className="flex-1">
                        <Skeleton className="h-5 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    </div>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3 mb-4" />
                    <div className="flex gap-2 mb-4">
                      <Skeleton className="h-6 w-16 rounded-full" />
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </div>
                  </div>
                ))
              ) : jobs && jobs.length > 0 ? (
                jobs.map((job) => (
                  <div
                    key={job._id}
                    className="transform transition-all duration-300 hover:scale-101 hover:shadow-lg"
                  >
                    <JobPreview job={job} />
                  </div>
                ))
              ) : (
                // Empty state
                <div className="col-span-full text-center py-16">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                    <Briefcase className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No opportunities available
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    There are currently no open opportunities that match your
                    criteria. Check back later for new collaborations.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="applied">
            <ComingSoonTab
              title="Applied Jobs"
              icon={Briefcase}
              description="Track all the jobs you've applied to and monitor their status."
            />
          </TabsContent>

          <TabsContent value="saved">
            <ComingSoonTab
              title="Saved Jobs"
              icon={Bookmark}
              description="Keep track of interesting opportunities you want to apply to later."
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
