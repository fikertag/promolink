"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ImageUpload from "../../../components/ImageUpload";
import {ProgressGoal} from "@/components/displayGoal";
import {
  Edit2,
  MapPin,
  BadgeCheck,
  X,
  Camera,
  Loader2,
  BadgeX,
  LogOut,
} from "lucide-react";
import ConfirmLogoutModal from "@/components/ConfirmLogoutModal";
import EditProfileModal from "@/components/EditProfileModal";

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
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [location, setLocation] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [industry, setIndustry] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [businessSize, setBusinessSize] = useState("");
  const [businessVerified] = useState(false);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
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
    }
  }, [session]);

  // Save handler
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await authClient.updateUser({
        name: username,
        bio: bio,
        location: location,
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

  const router = useRouter();

  const handleLogout = async () => {
    setIsLogoutLoading(true);
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/signup"); // redirect to login page
            router.refresh();
          },
        },
      });
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoading(false);
      setShowConfirm(false);
    }
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
      
      <ConfirmLogoutModal
        open={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleLogout}
        isLoading={isLogoutLoading}
      />
      <EditProfileModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleSave}
        isLoading={isLoading}
        error={error}
        companyName={companyName}
        setCompanyName={setCompanyName}
        industry={industry}
        setIndustry={setIndustry}
        businessPhone={businessPhone}
        setBusinessPhone={setBusinessPhone}
        businessSize={businessSize}
        setBusinessSize={setBusinessSize}
        location={location}
        setLocation={setLocation}
        locationOptions={locationOptions}
        bio={bio}
        setBio={setBio}
      />
      <div className="max-w-3xl mx-auto mt-2  px-4 sm:px-6 lg:px-8">
        <div className=" bg-white rounded-2xl shadow-sm py-6 px-2 min-[400px]:px-6 md:p-8 pb-10 md:pb-6  relative">
          <button
            className="text-gray-400 hover:text-white transition-all hover:bg-primary rounded-full p-2 absolute top-3 right-4"
            onClick={() => setIsEditModalOpen(true)}
          >
            <Edit2 size={18} />
          </button>

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
                    <span className="text-gray-500 text-sm">Upload Logo</span>
                  </div>
                </ImageUpload>
              </div>
            )}
          </div>

          <div className="text-center mb-2 md:mb-4 flex flex-col gap-1">
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
                {companyName || "No company name set"}
              </h1>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <MapPin size={16} />
              <span className="text-sm md:text-base">
                {location || "No location set"}
              </span>
            </div>
            {industry && (
              <div className="text-sm md:text-base text-gray-600">
                {industry}
              </div>
            )}
          </div>

          <div className="text-center mb-6 md:mb-8">
            <p className="text-gray-600 max-w-lg mx-auto text-sm md:text-base font-light">
              {bio || "No business description set"}
            </p>
          </div>

          {/* Goals section */}
          <div className="grid grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-8">
            <div className="text-center flex flex-col justify-between">
              <div className="flex items-center justify-center gap-1 md:gap-2 text-primary mb-1">
                <span className="text-base min-[350px]:text-xl md:text-2xl font-bold">
                  {businessSize
                    ? businessSize.charAt(0).toUpperCase() +
                      businessSize.slice(1)
                    : "N/A"}
                </span>
              </div>
              <p className="text-gray-600 text-xs md:text-sm">Business Size</p>
            </div>
            <div className="text-center flex flex-col justify-between">
              <div className="flex items-center justify-center gap-1 md:gap-2 text-primary mb-1">
                <span className="text-base min-[350px]:text-xl md:text-2xl font-bold">
                  {businessPhone || "N/A"}
                </span>
              </div>
              <p className="text-gray-600 text-xs md:text-sm">Business Phone</p>
            </div>
            <div className="text-center flex flex-col justify-between">
              <div className="flex flex-col items-center justify-between gap-1 md:gap-2 text-primary mb-1">
                <div className="text-base min-[350px]:text-xl md:text-2xl font-bold mt-1">
                  {businessVerified ? (
                    <BadgeCheck className="text-primary w-3 h-3 min-[450px]:w-5 min-[450px]:h-5" />
                  ) : (
                    <BadgeX
                      strokeWidth={2}
                      className="text-red-600 w-5 h-5 min-[450px]:w-6 min-[450px]:h-6"
                    />
                  )}
                </div>
              </div>
              <p className="text-gray-600 text-xs md:text-sm">Verified</p>
            </div>
          </div>
                    <ProgressGoal businessId={session?.user?.id || ""} />

          <button
            onClick={() => setShowConfirm(true)}
            className="flex absolute bottom-3 text-sm right-3 items-center gap-2 px-4 py-1 text-red-600 hover:text-red-800 transition-colors cursor-pointer rounded-sm border border-red-900"
          >
            <LogOut size={15} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
