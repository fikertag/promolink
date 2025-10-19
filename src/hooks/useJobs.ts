import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { IJob } from "@/types/api";

// 4. Get all my job applications (GET /job-application)
export const useMyJobApplications = () =>
  useQuery<IJob[]>({
    queryKey: ["new-jobs"],
    queryFn: () => apiClient<IJob[]>(`/job/new`),
  });
