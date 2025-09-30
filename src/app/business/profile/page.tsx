"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation"; // Note: different import for App Router

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
  LogOut,
} from "lucide-react";

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
  // Goals state
  const [goals, setGoals] = useState<any[]>([]);
  const [newGoal, setNewGoal] = useState({
    targetValue: 0,
    unit: "dollars",
    startDate: "",
    estimatedEndDate: "",
  });
  const [isGoalsLoading, setIsGoalsLoading] = useState(false);

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
    // load goals when session available
    if (session?.user?.id) {
      fetchGoals(session.user.id);
    }
  }, [session]);

  async function fetchGoals(businessId: string) {
    setIsGoalsLoading(true);
    try {
      const res = await fetch(`/api/goal?businessId=${businessId}`);
      if (!res.ok) throw new Error("Failed to fetch goals");
      const data = await res.json();
      setGoals(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGoalsLoading(false);
    }
  }

  async function createGoal(e: React.FormEvent) {
    e.preventDefault();
    if (!session?.user?.id) return;
    try {
      const payload = {
        businessId: session.user.id,
        targetValue: Number(newGoal.targetValue),
        unit: newGoal.unit,
        startDate: newGoal.startDate,
        estimatedEndDate: newGoal.estimatedEndDate,
      };
      const res = await fetch(`/api/goal`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to create goal");
      await fetchGoals(session.user.id);
      setNewGoal({
        targetValue: 0,
        unit: "dollars",
        startDate: "",
        estimatedEndDate: "",
      });
      toast.success("Goal created");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create goal");
    }
  }

  async function deleteGoal(goalId: string) {
    if (!confirm("Delete this goal?")) return;
    try {
      const res = await fetch(`/api/goal`, {
        method: "DELETE",
        body: JSON.stringify({ goalId }),
      });
      if (!res.ok) throw new Error("Failed to delete");
      if (session?.user?.id) await fetchGoals(session.user.id);
      toast.success("Goal deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete goal");
    }
  }

  async function updateGoal(goalId: string, updates: any) {
    try {
      const res = await fetch(`/api/goal`, {
        method: "PATCH",
        body: JSON.stringify({ goalId, ...updates }),
      });
      if (!res.ok) throw new Error("Failed to update");
      if (session?.user?.id) await fetchGoals(session.user.id);
      toast.success("Goal updated");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update goal");
    }
  }
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
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className=" mt-2 w-72 bg-white rounded-md shadow-lg p-4 border border-gray-200 z-50">
            <p className="text-gray-700 mb-4">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors cursor-pointer"
              >
                {isLogoutLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin h-4 w-4" />
                    Logging out...
                  </div>
                ) : (
                  <>
                    <LogOut size={15} />
                    <div>Logout</div>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto container12 ">
            <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white z-10">
              <h2 className="text-xl font-semibold">Edit Business Profile</h2>
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
                  Company Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={isLoading}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Industry
                </label>
                <input
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={isLoading}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Phone
                </label>
                <input
                  type="tel"
                  value={businessPhone}
                  onChange={(e) => setBusinessPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={isLoading}
                  placeholder="+251 XXX XXX XXX"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Size
                </label>
                <select
                  value={businessSize}
                  onChange={(e) => setBusinessSize(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={isLoading}
                >
                  <option value="startup">Startup</option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
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

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  About Your Business
                </label>
                <textarea
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={isLoading}
                />
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
          <div className="mb-6 md:mb-8">
            <h3 className="text-lg font-semibold mb-3">Goals</h3>
            {isGoalsLoading ? (
              <div>Loading goals...</div>
            ) : (
              <div className="space-y-3">
                {goals.length === 0 && (
                  <div className="text-sm text-muted-foreground">
                    No goals yet.
                  </div>
                )}
                {goals.map((g) => (
                  <div
                    key={g._id}
                    className="flex items-center justify-between p-3 border rounded"
                  >
                    <div>
                      <div className="font-medium">
                        Target: {g.targetValue} {g.unit}
                      </div>
                      <div className="text-sm text-gray-500">
                        Progress: {Math.round(g.currentValue)} / {g.targetValue}{" "}
                        (
                        {Math.round(
                          (g.currentValue / g.targetValue || 0) * 100
                        )}
                        %)
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateGoal(g._id, {
                            currentValue: Math.min(
                              g.targetValue,
                              Math.round(g.currentValue + g.targetValue * 0.05)
                            ),
                          })
                        }
                        className="px-2 py-1 bg-primary text-white rounded text-sm"
                      >
                        +5%
                      </button>
                      <button
                        onClick={() => deleteGoal(g._id)}
                        className="px-2 py-1 bg-red-500 text-white rounded text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={createGoal} className="mt-4 grid grid-cols-1 gap-2">
              <div className="flex gap-2">
                <input
                  type="number"
                  className="w-32 px-2 py-1 border rounded"
                  value={newGoal.targetValue}
                  onChange={(e) =>
                    setNewGoal({
                      ...newGoal,
                      targetValue: Number(e.target.value),
                    })
                  }
                  placeholder="Target"
                />
                <select
                  value={newGoal.unit}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, unit: e.target.value })
                  }
                  className="px-2 py-1 border rounded"
                >
                  <option value="dollars">dollars</option>
                  <option value="customers">customers</option>
                  <option value="sales">sales</option>
                  <option value="tickets">tickets</option>
                  <option value="hours">hours</option>
                </select>
              </div>
              <div className="flex gap-2">
                <input
                  type="date"
                  className="px-2 py-1 border rounded"
                  value={newGoal.startDate}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, startDate: e.target.value })
                  }
                />
                <input
                  type="date"
                  className="px-2 py-1 border rounded"
                  value={newGoal.estimatedEndDate}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, estimatedEndDate: e.target.value })
                  }
                />
                <button
                  className="px-3 py-1 bg-primary text-white rounded"
                  type="submit"
                >
                  Create Goal
                </button>
              </div>
            </form>
          </div>

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
