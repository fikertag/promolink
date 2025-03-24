"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

interface Job {
  _id: string;
  title: string;
  description: string;
  price: number;
  location?: string;
  socialMedia: {
    platform: "instagram" | "youtube" | "tiktok" | "twitter";
  }[];
  postedBy: string;
  status: "open" | "in-progress" | "completed" | "cancelled";
  hiredInfluencers: string[];
  createdAt: string;
  updatedAt: string;
}

interface JobContextType {
  jobs: Job[];
  fetchJobs: () => Promise<void>;
  addJob: (job: Omit<Job, "_id" | "createdAt" | "updatedAt">) => Promise<void>;
}

const JobContext = createContext<JobContextType>({
  jobs: [],
  fetchJobs: async () => {},
  addJob: async () => {},
});

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [jobs, setJobs] = useState<Job[]>([]);

  // Fetch jobs from the API
  const fetchJobs = async () => {
    try {
      const response = await axios.get("/api/job");
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  // Add a new job
  const addJob = async (job: Omit<Job, "_id" | "createdAt" | "updatedAt">) => {
    try {
      const response = await axios.post("/api/jobs", job);
      setJobs((prevJobs) => [...prevJobs, response.data]); // Add the new job to the state
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  // Fetch jobs on component mount
  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    console.log(jobs);
  }, [jobs]);

  return (
    <JobContext.Provider
      value={{
        jobs,
        fetchJobs,
        addJob,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("useJobs must be used within a JobProvider");
  }
  return context;
};
