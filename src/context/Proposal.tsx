"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { authClient } from "@/lib/auth-client";

interface SocialMedia {
  platform: "instagram" | "youtube" | "tiktok" | "twitter";
  _id: string;
}

interface Job {
  _id: string;
  title: string;
  description: string;
  price: number;
  location?: string;
  socialMedia: SocialMedia[];
  status: string;
}

interface Proposal {
  _id: string;
  jobId: Job; // Changed from string to Job interface
  influencerId: string;
  message: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ProposalContextType {
  proposals: Proposal[]; // Fixed variable name (was 'proposal')
  fetchProposals: () => Promise<void>;
  addProposal: (
    proposal: Omit<
      Proposal,
      "_id" | "createdAt" | "updatedAt" | "__v" | "jobId"
    > & {
      jobId: string; // For creation, we just need the ID
    }
  ) => Promise<void>;
  updateProposalStatus: (
    proposalId: string,
    status: "accepted" | "rejected"
  ) => void;
}

const ProposalContext = createContext<ProposalContextType>({
  proposals: [],
  fetchProposals: async () => {},
  addProposal: async () => {},
  updateProposalStatus: () => {},
});

export const ProposalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: session } = authClient.useSession();
  const [proposals, setProposals] = useState<Proposal[]>([]); // Fixed variable name

  const fetchProposals = async () => {
    try {
      const response = await axios.get(
        `/api/proposal?influencerId=${session?.user.id || ""}`
      );
      setProposals(response.data);
    } catch (error) {
      console.error("Error fetching proposals:", error);
    }
  };

  const addProposal = async (
    proposal: Omit<
      Proposal,
      "_id" | "createdAt" | "updatedAt" | "__v" | "jobId"
    > & {
      jobId: string;
    }
  ) => {
    try {
      const response = await axios.post("/api/proposals", proposal);
      setProposals((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Error adding proposal:", error);
    }
  };

  const updateProposalStatus = async (
    proposalId: string,
    status: "accepted" | "rejected"
  ) => {
    try {
      const response = await axios.patch(`/api/proposals/${proposalId}`, {
        status,
      });
      setProposals((prev) =>
        prev.map((p) => (p._id === proposalId ? response.data : p))
      );
    } catch (error) {
      console.error("Error updating proposal status:", error);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  useEffect(() => {
    console.log("proposals", proposals);
  }, [proposals]);

  return (
    <ProposalContext.Provider
      value={{
        proposals, // Fixed variable name
        fetchProposals,
        addProposal,
        updateProposalStatus,
      }}
    >
      {children}
    </ProposalContext.Provider>
  );
};

export const useProposals = () => {
  const context = useContext(ProposalContext);
  if (!context) {
    throw new Error("useProposals must be used within a ProposalProvider");
  }
  return context;
};
