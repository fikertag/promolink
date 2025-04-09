"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

interface SocialMediaPlatform {
  username: string;
  followers: string | number;
}

interface SocialMedia {
  instagram?: SocialMediaPlatform;
  tiktok?: SocialMediaPlatform;
  telegram?: SocialMediaPlatform;
  [key: string]: SocialMediaPlatform | undefined;
}

interface Influencer {
  _id: string;
  name: string;
  image: string;
  bio: string;
  price: number;
  socialMedia: SocialMedia; // or SocialMedia interface if you parse it
  location: string;
  verified: boolean;
}

interface InfluencerContextType {
  influencers: Influencer[];
  loading: boolean;
  error: string | null;
  fetchInfluencers: () => Promise<void>;
  Influencer: Influencer | null; // Add this line to define the Influencer type
}

const InfluencerContext = createContext<InfluencerContextType>({
  influencers: [],
  loading: false,
  error: null,
  fetchInfluencers: async () => {},
  Influencer: null, // Initialize Influencer as null
});

export const InfluencerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInfluencers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("/api/influencer");
      setInfluencers(response.data);
    } catch (err) {
      setError("Failed to load influencers");
      console.error("Error fetching influencers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInfluencers();
  }, []);

  useEffect(() => {
    console.log("Influencers fetched:", influencers);
  }, [influencers]);

  return (
    <InfluencerContext.Provider
      value={{
        influencers,
        loading,
        error,
        fetchInfluencers,
        Influencer: null, // Set this to the influencer you want to provide
      }}
    >
      {children}
    </InfluencerContext.Provider>
  );
};

export const useInfluencers = () => useContext(InfluencerContext);
