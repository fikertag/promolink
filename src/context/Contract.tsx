"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "@/context/User";

interface SocialMediaAction {
  platform: "instagram" | "tiktok" | "telegram";
  actionType: "post" | "story";
  quantity: number;
}

type ContractStatus = "draft" | "active" | "completed" | "terminated";

interface Contract {
  _id: string;
  senderId: string; // Influencer ID
  reciverId: string; // Job Poster ID
  price: number;
  socialMediaActions: SocialMediaAction[];
  deadline: string;
  status: ContractStatus;
  activatedAt?: string;
  completedAt?: string;
  terminatedAt?: string;
  influencerConfirmed?: boolean;
  ownerConfirmed?: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ContractContextType {
  contracts: Contract[];
  fetchContracts: () => Promise<void>;
  createContract: (contractData: {
    senderId: string;
    reciverId: string;
    price: number;
    socialMediaActions: SocialMediaAction[];
    deadline: string;
  }) => Promise<Contract | null>;
  updateContractStatus: (
    contractId: string,
    status: "active" | "terminated" | "influencerConfirmed" | "ownerConfirmed",
    role: "influencer" | "business"
  ) => Promise<void>;
  getContract: (contractId: string) => Contract | undefined;
}

const ContractContext = createContext<ContractContextType>({
  contracts: [],
  fetchContracts: async () => {},
  createContract: async () => null,
  updateContractStatus: async () => {},
  getContract: () => undefined,
});

export const ContractProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const { user } = useUser();

  // Fetch all contracts
  const fetchContracts = async () => {
    try {
      if (!user) return;
      const response = await axios.get(
        `/api/contract?influencerId=${user?.id}`
      );
      setContracts(response.data);
    } catch (error) {
      console.error("Error fetching contracts:", error);
    }
  };

  // Create new contract
  const createContract = async (contractData: {
    senderId: string;
    reciverId: string;
    price: number;
    socialMediaActions: SocialMediaAction[];
    deadline: string;
  }) => {
    try {
      const response = await axios.post("/api/contract", contractData);
      setContracts((prev) => [...prev, response.data]);
      return response.data;
    } catch (error) {
      console.error("Error creating contract:", error);
      throw new Error("Failed to create contract");
    }
  };

  // Update contract status
  const updateContractStatus = async (
    contractId: string,
    status: "active" | "terminated" | "influencerConfirmed" | "ownerConfirmed",
    role: "influencer" | "business"
  ) => {
    try {
      const response = await axios.patch(`/api/contract/${contractId}/status`, {
        status,
        role,
      });
      const updated = response.data;

      setContracts((prev) =>
        prev.map((contract) =>
          contract._id === contractId ? { ...contract, ...updated } : contract
        )
      );
    } catch (error) {
      console.error("Error updating contract status:", error);
    }
  };

  // Get a single contract by ID
  const getContract = (contractId: string) => {
    return contracts.find((contract) => contract._id === contractId);
  };

  useEffect(() => {
    fetchContracts();
  }, [user?.id]);

  return (
    <ContractContext.Provider
      value={{
        contracts,
        fetchContracts,
        createContract,
        updateContractStatus,
        getContract,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export const useContracts = () => {
  const context = useContext(ContractContext);
  if (!context) {
    throw new Error("useContracts must be used within a ContractProvider");
  }
  return context;
};
