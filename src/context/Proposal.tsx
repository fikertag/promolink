"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "@/context/User";
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
  influencerId: {
    _id: string;
    name: string;
    image: string;
  };
  message: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ProposalContextType {
  proposals: Proposal[];
  specificProposal: Proposal[]; // Changed from string to Proposal interface
  fetchProposals: () => Promise<void>;
  fetchProposalByBUsinessId: () => Promise<void>;
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
  specificProposal: [],
  fetchProposals: async () => {},
  fetchProposalByBUsinessId: async () => {},
  addProposal: async () => {},
  updateProposalStatus: () => {},
});

export const ProposalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useUser();
  const [proposals, setProposals] = useState<Proposal[]>([]); // Fixed variable name
  const [specificProposal, setSpecificProposal] = useState<Proposal[]>([]);

  const fetchProposals = async () => {
    if (!user) return; // Ensure user is defined before making the request
    try {
      const response = await axios.get(
        `/api/proposal?influencerId=${user?.id}`
      );
      setProposals(response.data);
    } catch (error) {
      console.error("Error fetching proposals:", error);
    }
  };

  const fetchProposalByBUsinessId = async () => {
    try {
      const response = await axios.get(
        `/api/proposal/postedBy/${"67f41045f765a5c4f529af7b"}`
      );
      setSpecificProposal(response.data);
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
      setSpecificProposal((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Error adding proposal:", error);
    }
  };

  const updateProposalStatus = async (
    proposalId: string,
    status: "accepted" | "rejected"
  ) => {
    try {
      const response = await axios.patch(`/api/proposal/${proposalId}`, {
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
    console.log("Specific Proposal", specificProposal);
  }, [specificProposal]);

  useEffect(() => {
    fetchProposals();
    fetchProposalByBUsinessId();
  }, [user?.id]);

  return (
    <ProposalContext.Provider
      value={{
        proposals, // Fixed variable name]
        specificProposal,
        fetchProposals,
        fetchProposalByBUsinessId,
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
