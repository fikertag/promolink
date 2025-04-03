"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "@/context/User";

interface SocialMediaAction {
  platform: "instagram" | "tiktok" | "telegram";
  actionType: "post" | "story";
  quantity: number;
}

interface Contract {
  _id: string;
  proposalId: string;
  price: number;
  socialMediaActions: SocialMediaAction[];
  deadline: string;
  status: "draft" | "active" | "completed" | "terminated";
  createdAt: string;
  updatedAt: string;
}

interface ContractContextType {
  contracts: Contract[];
  fetchContracts: () => Promise<void>;
  createContract: (proposalId: string) => Promise<Contract | null>;
  updateContractStatus: (
    contractId: string,
    status: Contract["status"]
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

  // Create new contract from proposal
  const createContract = async (proposalId: string) => {
    try {
      const response = await axios.post("/api/contracts", { proposalId });
      setContracts((prev) => [...prev, response.data]);
      return response.data;
    } catch (error) {
      console.error("Error creating contract:", error);
      return null;
    }
  };

  // Update contract status
  const updateContractStatus = async (
    contractId: string,
    status: Contract["status"]
  ) => {
    try {
      await axios.patch(`/api/contracts/${contractId}/status`, { status });
      setContracts((prev) =>
        prev.map((contract) =>
          contract._id === contractId
            ? { ...contract, status, updatedAt: new Date().toISOString() }
            : contract
        )
      );
    } catch (error) {
      console.error("Error updating contract status:", error);
    }
  };

  // Get single contract by ID
  const getContract = (contractId: string) => {
    return contracts.find((contract) => contract._id === contractId);
  };

  // Initial fetch
  useEffect(() => {
    fetchContracts();
  }, [user?.id]);

  // useEffect(() => {
  //   console.log(contracts);
  // }, [contracts]);

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
