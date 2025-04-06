"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "./User";

interface Earning {
  _id: string;
  userId: string;
  amount: number;
  status: "paid" | "unpaid";
  paymentDate?: string;
  source: string;
  metadata: string;
  createdAt: string;
  updatedAt: string;
}

interface EarningContextType {
  earnings: Earning[];
  fetchEarnings: (userId?: string, status?: "paid" | "unpaid") => Promise<void>;
  createEarning: (
    earning: Omit<Earning, "_id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  updateEarningStatus: (
    earningId: string,
    status: "paid" | "unpaid",
    paymentDate?: Date
  ) => Promise<void>;
  getTotalEarnings: () => {
    total: number;
    paid: number;
    unpaid: number;
  };
}

const EarningContext = createContext<EarningContextType>({
  earnings: [],
  fetchEarnings: async () => {},
  createEarning: async () => {},
  updateEarningStatus: async () => {},
  getTotalEarnings: () => ({ total: 0, paid: 0, unpaid: 0 }),
});

export const EarningProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [earnings, setEarnings] = useState<Earning[]>([]);
  const { user } = useUser();
  // Fetch earnings with optional filters
  const fetchEarnings = async (userId?: string, status?: "paid" | "unpaid") => {
    try {
      let url = "/api/earning";
      const params = new URLSearchParams();
      if (userId) params.append("userId", userId);
      if (status) params.append("status", status);

      if (params.toString()) url += `?${params.toString()}`;

      const response = await axios.get(url);
      setEarnings(response.data);
    } catch (error) {
      console.error("Error fetching earnings:", error);
    }
  };

  // Create new earning record
  const createEarning = async (
    earning: Omit<Earning, "_id" | "createdAt" | "updatedAt">
  ) => {
    try {
      const response = await axios.post("/api/earning", earning);
      setEarnings((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Error creating earning:", error);
    }
  };

  // Update earning status (paid/unpaid)
  const updateEarningStatus = async (
    earningId: string,
    status: "paid" | "unpaid",
    paymentDate?: Date
  ) => {
    try {
      const response = await axios.patch("/api/earning", {
        earningId,
        status,
        ...(paymentDate && { paymentDate }),
      });

      setEarnings((prev) =>
        prev.map((earning) =>
          earning._id === earningId ? response.data : earning
        )
      );
    } catch (error) {
      console.error("Error updating earning:", error);
    }
  };

  // Calculate totals
  const getTotalEarnings = () => {
    const filtered = user?.id
      ? earnings.filter((e) => e.userId === user.id)
      : earnings;

    return {
      total: filtered.reduce((sum, e) => sum + e.amount, 0),
      paid: filtered
        .filter((e) => e.status === "paid")
        .reduce((sum, e) => sum + e.amount, 0),
      unpaid: filtered
        .filter((e) => e.status === "unpaid")
        .reduce((sum, e) => sum + e.amount, 0),
    };
  };

  // Initial fetch
  useEffect(() => {
    fetchEarnings();
  }, []);

  return (
    <EarningContext.Provider
      value={{
        earnings,
        fetchEarnings,
        createEarning,
        updateEarningStatus,
        getTotalEarnings,
      }}
    >
      {children}
    </EarningContext.Provider>
  );
};

export const useEarnings = () => {
  const context = useContext(EarningContext);
  if (!context) {
    throw new Error("useEarnings must be used within an EarningProvider");
  }
  return context;
};
