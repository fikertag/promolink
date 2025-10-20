import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { toast } from "sonner";
import type { IJob, ApiError } from "@/types/api";

export const useMyJobApplications = () =>
  useQuery<IJob[], ApiError>({
    queryKey: ["new-jobs"],
    queryFn: () => apiClient<IJob[]>(`/job/new`),
  });

export const useApplyToJob = () => {
  const qc = useQueryClient();
  return useMutation<IJob, unknown, { jobId: string; message: string }>({
    mutationFn: (payload) =>
      apiClient<IJob>(`/proposal/${payload.jobId}`, {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      toast.success("Application submitted successfully!");
      qc.invalidateQueries({ queryKey: ["new-jobs"] });
    },
    onError: () => {
      toast.error("Failed to submit application. Please try again.");
    },
  });
};
