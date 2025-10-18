"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "@/context/User";

interface Job {
  _id: string;
  title: string;
  description: string;
  price: number;
  location?: string;
  socialMedia: {
    platform: "instagram" | "youtube" | "tiktok" | "telegram";
  }[];
  postedBy: string;
  status: "open" | "in-progress" | "completed" | "cancelled";
  hiredInfluencers: string[];
  proposalsSubmitted: Array<{
    _id: string;
    influencerId: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

interface JobContextType {
  jobs: Job[];
  specificJob: Job[];
  fetchJobs: () => Promise<void>;
  fetchJobByInfluncerId: () => Promise<void>;
  addJob: (job: {
    title: string;
    description: string;
    price: string | number;
    location?: string;
    socialMedia: Array<{ platform: string }>;
  }) => Promise<void>;
  addProposalToJob: (
    jobId: string,
    proposal: { _id: string; influencerId: string }
  ) => void;
}

const JobContext = createContext<JobContextType>({
  jobs: [],
  specificJob: [],
  fetchJobs: async () => {},
  fetchJobByInfluncerId: async () => {},
  addJob: async () => {},
  addProposalToJob: () => {},
});

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [specificJob, setSpecificJob] = useState<Job[]>([]);
  const { user } = useUser();

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
  const addJob = async (job: {
    title: string;
    description: string;
    price: string | number;
    location?: string;
    socialMedia: Array<{ platform: string }>;
  }) => {
    console.log("world");

    try {
      const response = await axios.post("/api/job", {
        ...job,
        postedBy: user?.id,
      });
      setJobs((prevJobs) => [...prevJobs, response.data]);
    } catch (error) {
      console.error("Error adding job:", error);
      throw error;
    }
  };

  const fetchJobByInfluncerId = async () => {
    try {
      const response = await axios.get(`/api/job/${user?.id}`);
      setSpecificJob(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  // Add a proposal to a job
  const addProposalToJob = (
    jobId: string,
    proposal: { _id: string; influencerId: string }
  ) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId
          ? {
              ...job,
              proposalsSubmitted: [...(job.proposalsSubmitted || []), proposal],
            }
          : job
      )
    );
  };
  // fetchJobByInfluncerId();

  // Fetch jobs on component mount
  useEffect(() => {
    fetchJobs();
    fetchJobByInfluncerId();
  }, []);

  return (
    <JobContext.Provider
      value={{
        jobs,
        specificJob,
        fetchJobs,
        addJob,
        addProposalToJob,
        fetchJobByInfluncerId,
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
