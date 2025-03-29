"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import SocialIcon from "../../../components/SocialIcons";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import ImageUpload from "../../../components/ImageUpload";
import {
  Edit2,
  MapPin,
  Star,
  DollarSign,
  Users,
  X,
  Camera,
} from "lucide-react";

// Type definitions
type SocialMediaPlatform = "instagram" | "tiktok" | "telegram";
type SocialMediaData = {
  username: string;
  followers: string;
};
type SocialMediaState = Record<SocialMediaPlatform, SocialMediaData>;

function ProfilePage() {
  const handleImageUpload = async (url: string) => {
    try {
      await authClient.updateUser({
        image: url,
      });
      setImage(url);
      toast.success("Profile image updated!");
    } catch (error) {
      toast.error("Failed to update image");
    }
  };

  // State for loading and errors
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // User profile state with default empty values
  const [pricePerCampaign, setPricePerCampaign] = useState<number>(0);
  const [rating, setRating] = useState(0);
  const [socialMedia, setSocialMedia] = useState<SocialMediaState>({
    instagram: { username: "", followers: "0" },
    tiktok: { username: "", followers: "0" },
    telegram: { username: "", followers: "0" },
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");

  // Location options
  const locationOptions = ["Tecno", "Main Agri", "Addis Ababa"];

  // Auth session
  const {
    data: session,
    isPending: isSessionLoading,
    error: sessionError,
    refetch,
  } = authClient.useSession();

  // Initialize data from session/database
  useEffect(() => {
    if (session?.user) {
      // Set basic profile info from session
      setLocation(session.user.location || "");
      setUsername(session.user.name || "");
      setBio(session.user.bio || "");
      setImage(session.user.image || "");

      // Parse social media data from user metadata or use defaults
      try {
        const userSocialMedia = session.user.socialMedia
          ? JSON.parse(session.user.socialMedia)
          : null;

        if (userSocialMedia) {
          setSocialMedia({
            instagram: userSocialMedia.instagram || {
              username: "",
              followers: "0",
            },
            tiktok: userSocialMedia.tiktok || { username: "", followers: "0" },
            telegram: userSocialMedia.telegram || {
              username: "",
              followers: "0",
            },
          });
        }
      } catch (e) {
        console.error("Error parsing social media data", e);
      }

      // Set numeric values from user metadata or use 0 as default
      setPricePerCampaign(session.user.price || 0);
      setRating(session.user.rating || 0);
    }
  }, [session]);

  // Calculate total followers
  const totalFollowers = Object.values(socialMedia).reduce(
    (total, platform) => {
      const count = parseFloat(platform.followers) || 0;
      return total + count;
    },
    0
  );

  // Save handler - updates all profile data including social media
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Prepare social media data to be saved as JSON string
      const socialMediaData = JSON.stringify({
        instagram: socialMedia.instagram,
        tiktok: socialMedia.tiktok,
        telegram: socialMedia.telegram,
      });

      await authClient.updateUser({
        name: username,
        bio: bio,
        location: location,
        socialMedia: socialMediaData, // Store as JSON string
        price: pricePerCampaign,
      });

      await refetch();
      toast.success("Profile updated successfully!");
      setIsEditModalOpen(false);
    } catch (err) {
      setError("Failed to update profile. Please try again.");
      toast.error("Failed to update data");
      console.error("Update error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Update social media data
  const handleSocialMediaChange = (
    platform: SocialMediaPlatform,
    field: keyof SocialMediaData,
    value: string
  ) => {
    setSocialMedia((prev) => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        [field]: value,
      },
    }));
  };

  if (isSessionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h- bg-gray-50">
      {/* <button onClick={() => authClient.signOut()}> signout</button> */}
      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white z-10">
              <h2 className="text-xl font-semibold">Edit Profile</h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
                disabled={isLoading}
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6">
              {error && (
                <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                  {error}
                </div>
              )}

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={isLoading}
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={isLoading}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <select
                  value={location.split(",")[0] || ""}
                  onChange={(e) => setLocation(`${e.target.value}, Ethiopia`)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={isLoading}
                >
                  <option value="">Select location</option>
                  {locationOptions.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price Per Campaign ($)
                </label>
                <input
                  type="number"
                  value={pricePerCampaign}
                  onChange={(e) =>
                    setPricePerCampaign(parseFloat(e.target.value))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={isLoading}
                />
              </div>

              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Social Media
                </h3>
                <div className="space-y-4">
                  {(
                    Object.entries(socialMedia) as [
                      SocialMediaPlatform,
                      SocialMediaData
                    ][]
                  ).map(([platform, data]) => (
                    <div key={platform} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <SocialIcon platform={platform} size={18} />
                        <span className="text-gray-700 font-medium capitalize">
                          {platform}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">
                            Username
                          </label>
                          <input
                            type="text"
                            placeholder="@username"
                            value={data.username}
                            onChange={(e) =>
                              handleSocialMediaChange(
                                platform,
                                "username",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">
                            Followers
                          </label>
                          <input
                            type="text"
                            placeholder="0"
                            value={data.followers}
                            onChange={(e) =>
                              handleSocialMediaChange(
                                platform,
                                "followers",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 sticky bottom-0 bg-white py-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark flex items-center justify-center min-w-24"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6 relative">
          <button
            className="text-gray-400 hover:text-white transition-all hover:bg-primary rounded-full p-2 absolute top-3 right-4"
            onClick={() => setIsEditModalOpen(true)}
          >
            <Edit2 size={18} />
          </button>

          <div className="relative w-20 h-20 mx-auto mb-1 ">
            <div className="absolute -bottom-2 -right-2 bg-primary p-2 rounded-full">
              <Camera />
            </div>
            {image ? (
              <Image
                src={image}
                alt="Profile"
                width={80}
                height={80}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                <ImageUpload onUpload={handleImageUpload} />
              </div>
            )}
          </div>

          <div className="text-center mb-3 flex flex-col gap-1">
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-2xl font-semibold text-gray-900 mt-1">
                {username || "No username set"}
              </h1>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <MapPin size={16} />
              <span className="text-base">{location || "No location set"}</span>
            </div>
          </div>

          <div className="text-center mb-8">
            <p className="text-gray-600 max-w-lg mx-auto text-base font-light">
              {bio || "No bio set"}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {(
              Object.entries(socialMedia) as [
                SocialMediaPlatform,
                SocialMediaData
              ][]
            ).map(([platform, data]) => (
              <div key={platform} className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <SocialIcon platform={platform} />
                  <span className="text-gray-700 font-medium capitalize">
                    {platform}
                  </span>
                </div>
                {data.username ? (
                  <div className="text-center text-sm text-gray-600 mb-1">
                    @{data.username.replace("@", "")}
                  </div>
                ) : (
                  <div className="text-center text-sm text-gray-400 mb-1">
                    Not set
                  </div>
                )}
                <div className="text-2xl text-center font-bold text-gray-900">
                  {data.followers === "0" ? "0" : data.followers}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-primary mb-1">
                <Users size={20} />
                <span className="text-2xl font-bold">
                  {totalFollowers.toFixed(1)}K
                </span>
              </div>
              <p className="text-gray-600 text-sm text-center">
                Total Followers
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-primary mb-1">
                <DollarSign size={20} />
                <span className="text-2xl font-bold">
                  {pricePerCampaign === 0 ? "0" : pricePerCampaign}
                </span>
              </div>
              <p className="text-gray-600 text-sm text-center">
                Price/Campaign
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-primary mb-1">
                <Star size={20} />
                <span className="text-2xl font-bold">
                  {rating === 0 ? "0" : rating}
                </span>
              </div>
              <p className="text-gray-600 text-sm">Rating</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
