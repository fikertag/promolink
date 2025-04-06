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
  BadgeCheck,
  X,
  Camera,
  Loader2,
  BadgeX,
} from "lucide-react";

// Type definitions
type SocialMediaPlatform = "instagram" | "tiktok" | "telegram";
type SocialMediaData = {
  username: string;
  followers: string;
};
type SocialMediaState = Record<SocialMediaPlatform, SocialMediaData>;

function ProfilePage() {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (url: string) => {
    setIsUploading(true);
    try {
      await authClient.updateUser({
        image: url,
      });
      setImage(url);
      toast.success("Profile image updated!");
    } catch (error) {
      toast.error("Failed to update image");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  // State for loading and errors
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // User profile state with default empty values
  const [pricePerCampaign, setPricePerCampaign] = useState<number>(0);
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
  const [Verified, setVerified] = useState(false);

  // Location options
  const locationOptions = ["Tecno", "Main Agri", "Addis Ababa"];

  // Auth session
  const {
    data: session,
    isPending: isSessionLoading,
    refetch,
  } = authClient.useSession();

  // Initialize data from session/database
  useEffect(() => {
    if (session?.user) {
      setLocation(session.user.location || "");
      setUsername(session.user.name || "");
      setBio(session.user.bio || "");
      setImage(session.user.image || "");
      setVerified(session.user.verified || false);

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

      setPricePerCampaign(session.user.price || 0);
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

  // Save handler
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const socialMediaData = JSON.stringify({
        instagram: socialMedia.instagram,
        tiktok: socialMedia.tiktok,
        telegram: socialMedia.telegram,
      });

      await authClient.updateUser({
        name: username,
        bio: bio,
        location: location,
        socialMedia: socialMediaData,
        price: pricePerCampaign,
        verified: false,
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
      <div className=" flex items-center justify-center h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className=" ">
      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto container12 ">
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
            <form onSubmit={handleSave} className="px-4 pt-6 md:px-6">
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
                      <Loader2 className="animate-spin mr-2 h-4 w-4" />
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
      <div className="max-w-3xl mx-auto mt-2  px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm py-6 px-2 min-[400px]:px-6 md:p-8  relative">
          <button
            className="text-gray-400 hover:text-white transition-all hover:bg-primary rounded-full p-2 absolute top-3 right-4"
            onClick={() => setIsEditModalOpen(true)}
          >
            <Edit2 size={18} />
          </button>

          {/* In your ProfilePage component, replace the image upload section with this: */}
          <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-4">
            {image ? (
              <>
                <Image
                  src={image}
                  alt="Profile"
                  width={128}
                  height={128}
                  className="rounded-full object-cover w-full h-full"
                  priority
                />
                <div className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md">
                  <ImageUpload
                    onUpload={handleImageUpload}
                    className="text-primary hover:text-primary-dark"
                  >
                    <Camera size={20} />
                  </ImageUpload>
                </div>
                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-full">
                    <div className="w-16 h-16 border-4 border-t-primary border-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <ImageUpload
                  onUpload={handleImageUpload}
                  className="w-full h-full flex items-center justify-center"
                >
                  <div className="text-center p-4">
                    <Camera size={32} className="mx-auto text-gray-400 mb-2" />
                    <span className="text-gray-500 text-sm">Upload Photo</span>
                  </div>
                </ImageUpload>
              </div>
            )}
          </div>

          <div className="text-center mb-2 md:mb-4 flex flex-col gap-1">
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
                {username || "No username set"}
              </h1>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <MapPin size={16} />
              <span className="text-sm md:text-base">
                {location || "No location set"}
              </span>
            </div>
          </div>

          <div className="text-center mb-6 md:mb-8">
            <p className="text-gray-600 max-w-lg mx-auto text-sm md:text-base font-light">
              {bio || "No bio set"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
            {(
              Object.entries(socialMedia) as [
                SocialMediaPlatform,
                SocialMediaData
              ][]
            ).map(([platform, data]) => (
              <div key={platform} className="bg-gray-50 rounded-xl p-3 md:p-4">
                <div className="flex items-center justify-center gap-2 mb-1 md:mb-2">
                  <SocialIcon platform={platform} size={18} />
                  <span className="text-gray-700 font-medium text-sm md:text-base capitalize">
                    {platform}
                  </span>
                </div>
                {data.username ? (
                  <div className="text-center text-xs md:text-sm text-gray-600 mb-1">
                    @{data.username.replace("@", "")}
                  </div>
                ) : (
                  <div className="text-center text-xs md:text-sm text-gray-400 mb-1">
                    Not set
                  </div>
                )}
                <div className="text-xl md:text-2xl text-center font-bold text-gray-900">
                  {data.followers === "0" ? "0" : data.followers}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-8">
            <div className="text-center flex flex-col justify-between">
              <div className="flex items-center justify-center gap-1 md:gap-2 text-primary mb-1">
                <span className="text-base min-[350px]:text-xl md:text-2xl font-bold">
                  {totalFollowers}
                </span>
              </div>
              <p className="text-gray-600 text-xs md:text-sm">
                Total Followers
              </p>
            </div>
            <div className="text-center flex flex-col justify-between">
              <div className="flex items-center justify-center gap-1 md:gap-2 text-primary mb-1">
                <span className="text-base min-[350px]:text-xl md:text-2xl font-bold">
                  {pricePerCampaign === 0 ? "0" : pricePerCampaign} Birr
                </span>
              </div>
              <p className="text-gray-600 text-xs md:text-sm">Price/Campaign</p>
            </div>
            <div className="text-center flex flex-col justify-between">
              <div className="flex flex-col items-center justify-between gap-1 md:gap-2 text-primary mb-1">
                <div className="text-base min-[350px]:text-xl md:text-2xl font-bold mt-1">
                  {Verified ? (
                    <BadgeCheck className="text-primary w-3 h-3 min-[450px]:w-5 min-[450px]:h-5" />
                  ) : (
                    <BadgeX
                      // size={25}
                      strokeWidth={2}
                      className="text-red-600 w-5 h-5 min-[450px]:w-6 min-[450px]:h-6"
                    />
                  )}
                </div>
              </div>
              <p className="text-gray-600 text-xs md:text-sm">Verified</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
