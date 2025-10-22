import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { toast } from "sonner";
import type { IJob, ApiError } from "@/types/api";

export const useNewJobs = () =>
  useQuery<IJob[], ApiError>({
    queryKey: ["new-jobs"],
    queryFn: () => apiClient<IJob[]>(`/job/new`),
  });

export const useMyAppliedJobs = () =>
  useQuery<IJob[], ApiError>({
    queryKey: ["applied-jobs"],
    queryFn: () => apiClient<IJob[]>(`/job/applied`),
  });

export const useMySavedJobs = () =>
  useQuery<IJob[], ApiError>({
    queryKey: ["saved-jobs"],
    queryFn: () => apiClient<IJob[]>(`/job/saved`),
  });

export const useSaveJob = () => {
  const qc = useQueryClient();
  return useMutation<IJob, ApiError, { jobId: string }>({
    mutationFn: (payload) =>
      apiClient<IJob>(`/job/${payload.jobId}/save`, {
        method: "POST",
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["saved-jobs"] });
      qc.invalidateQueries({ queryKey: ["new-jobs"] });
      qc.invalidateQueries({ queryKey: ["applied-jobs"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to save job. Please try again");
    },
  });
};

export const useApplyToJob = () => {
  const qc = useQueryClient();
  return useMutation<IJob, ApiError, { jobId: string; message: string }>({
    mutationFn: (payload) =>
      apiClient<IJob>(`/proposal/${payload.jobId}`, {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      toast.success("Proposal submitted successfully!");
      qc.invalidateQueries({ queryKey: ["new-jobs"] });
      qc.invalidateQueries({ queryKey: ["applied-jobs"] });
    },
    onError: (error) => {
      toast.error(
        error.message || "Failed to submit proposal. Please try again."
      );
    },
  });
};
