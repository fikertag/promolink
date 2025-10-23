import { ApiResponse } from "@/types/api";

// let cachedToken: string | null = null;

export const apiClient = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const response = await fetch(`/api${endpoint}`, { ...options });

  const json: ApiResponse<T> = await response.json();

  if (!response.ok) {
    throw new Error(response.statusText || "request failed");
  }

  return json.data;
};
