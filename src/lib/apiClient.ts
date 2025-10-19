import { ApiResponse } from "@/types/api";

// let cachedToken: string | null = null;

export const apiClient = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(`/api${endpoint}`);

  const json: ApiResponse<T> = await response.json();

  if (!response.ok) {
    throw new Error(json.message || `API Error: ${response.status}`);
  }

  return json.data;
};
