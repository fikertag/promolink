// "use client";
// // import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import Image from "next/image";
// import toast from "react-hot-toast";
// import {
//   Edit2,
//   MapPin,
//   BadgeCheck,
//   X,
//   Camera,
//   Loader2,
//   BadgeX,
//   LogOut,
//   Building2,
//   Phone,
//   Users,
// } from "lucide-react";

// // Components
// import { authClient } from "@/lib/auth-client";
// import ImageUpload from "../../../components/ImageUpload";
// // import ConfirmationDialog from "../../../components/ConfirmationDialog";

// // Types
// type BusinessSize = "startup" | "small" | "medium" | "large";

// export default function BusinessProfilePage() {
//   // const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);
//   const [isUploading, setIsUploading] = useState(false);
//   // const [isLogoutLoading, setIsLogoutLoading] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Business profile data
//   const [profileData, setProfileData] = useState({
//     companyName: "",
//     industry: "",
//     businessPhone: "",
//     businessSize: "" as BusinessSize,
//     businessVerified: false,
//     onboarded: false,
//     location: "",
//     username: "",
//     bio: "",
//     image: "",
//   });

//   // Location options
//   const locationOptions = ["Tecno", "Main Agri", "Addis Ababa"];
//   const industryOptions = [
//     "Technology",
//     "Agriculture",
//     "Retail",
//     "Manufacturing",
//     "Services",
//   ];
//   const businessSizeOptions: BusinessSize[] = [
//     "startup",
//     "small",
//     "medium",
//     "large",
//   ];

//   // Auth session
//   const {
//     data: session,
//     isPending: isSessionLoading,
//     refetch,
//   } = authClient.useSession();

//   // Initialize data from session
//   useEffect(() => {
//     if (session?.user) {
//       setProfileData({
//         companyName: session.user.companyName || "",
//         industry: session.user.industry || "",
//         businessPhone: session.user.businessPhone || "",
//         businessSize: (session.user.businessSize as BusinessSize) || "small",
//         businessVerified: session.user.businessVerified || false,
//         onboarded: session.user.onboarded || false,
//         location: session.user.location || "",
//         username: session.user.name || "",
//         bio: session.user.bio || "",
//         image: session.user.image || "",
//       });
//     }
//   }, [session]);

//   // Handlers
//   const handleImageUpload = async (url: string) => {
//     setIsUploading(true);
//     try {
//       await authClient.updateUser({ image: url });
//       setProfileData((prev) => ({ ...prev, image: url }));
//       toast.success("Profile image updated!");
//     } catch (error) {
//       toast.error("Failed to update image");
//       console.error(error);
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const handleSave = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError(null);

//     try {
//       await authClient.updateUser({
//         name: profileData.username,
//         bio: profileData.bio,
//         location: profileData.location,
//         companyName: profileData.companyName,
//         industry: profileData.industry,
//         businessPhone: profileData.businessPhone,
//         businessSize: profileData.businessSize,
//         businessVerified: profileData.businessVerified,
//         onboarded: profileData.onboarded,
//       });

//       await refetch();
//       toast.success("Profile updated successfully!");
//       setIsEditModalOpen(false);
//     } catch (err) {
//       setError("Failed to update profile. Please try again.");
//       toast.error("Failed to update data");
//       console.error("Update error:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // const handleLogout = async () => {
//   //   setIsLogoutLoading(true);
//   //   try {
//   //     await authClient.signOut({
//   //       fetchOptions: {
//   //         onSuccess: () => {
//   //           router.push("/signup");
//   //           router.refresh();
//   //         },
//   //       },
//   //     });
//   //   } catch (error) {
//   //     console.error("Logout failed:", error);
//   //     setIsLoading(false);
//   //     setShowConfirm(false);
//   //   }
//   // };

//   if (isSessionLoading) {
//     return (
//       <div className="flex items-center justify-center h-[80vh]">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-3xl mx-auto mt-2 px-4 sm:px-6 lg:px-8">
//       {/* Profile Card */}
//       <div className="bg-white rounded-2xl shadow-sm py-6 px-2 min-[400px]:px-6 md:p-8 pb-10 md:pb-6 relative">
//         {/* Edit Button */}
//         <button
//           className="text-gray-400 hover:text-white transition-all hover:bg-primary rounded-full p-2 absolute top-3 right-4"
//           onClick={() => setIsEditModalOpen(true)}
//         >
//           <Edit2 size={18} />
//         </button>

//         {/* Profile Image */}
//         <ProfileImage
//           image={profileData.image}
//           isUploading={isUploading}
//           onUpload={handleImageUpload}
//         />

//         {/* Business Info */}
//         <div className="text-center mb-2 md:mb-4 flex flex-col gap-1">
//           <div className="flex items-center justify-center gap-2">
//             <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
//               {profileData.companyName || "No company name set"}
//             </h1>
//             {profileData.businessVerified && (
//               <BadgeCheck className="text-blue-500 h-5 w-5" />
//             )}
//           </div>
//           <div className="flex items-center justify-center gap-2">
//             <Building2 size={16} className="text-gray-600" />
//             <span className="text-gray-600 text-sm md:text-base">
//               {profileData.industry || "No industry specified"}
//             </span>
//           </div>
//           <div className="flex items-center justify-center gap-2 text-gray-600">
//             <MapPin size={16} />
//             <span className="text-sm md:text-base">
//               {profileData.location || "No location set"}
//             </span>
//           </div>
//         </div>

//         {/* Bio */}
//         <div className="text-center mb-6 md:mb-8">
//           <p className="text-gray-600 max-w-lg mx-auto text-sm md:text-base font-light">
//             {profileData.bio || "No bio set"}
//           </p>
//         </div>

//         {/* Business Stats */}
//         <div className="grid grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-8">
//           <div className="text-center flex flex-col justify-between">
//             <div className="flex items-center justify-center gap-1 md:gap-2 text-primary mb-1">
//               <Phone size={20} className="text-gray-600" />
//               <span className="text-base min-[350px]:text-xl md:text-2xl font-bold">
//                 {profileData.businessPhone || "N/A"}
//               </span>
//             </div>
//             <p className="text-gray-600 text-xs md:text-sm">Business Phone</p>
//           </div>

//           <div className="text-center flex flex-col justify-between">
//             <div className="flex items-center justify-center gap-1 md:gap-2 text-primary mb-1">
//               <Users size={20} className="text-gray-600" />
//               <span className="text-base min-[350px]:text-xl md:text-2xl font-bold capitalize">
//                 {profileData.businessSize || "N/A"}
//               </span>
//             </div>
//             <p className="text-gray-600 text-xs md:text-sm">Business Size</p>
//           </div>

//           <div className="text-center flex flex-col justify-between">
//             <div className="flex flex-col items-center justify-between gap-1 md:gap-2 text-primary mb-1">
//               <div className="text-base min-[350px]:text-xl md:text-2xl font-bold mt-1">
//                 {profileData.businessVerified ? (
//                   <BadgeCheck className="text-primary w-5 h-5" />
//                 ) : (
//                   <BadgeX className="text-red-600 w-6 h-6" />
//                 )}
//               </div>
//             </div>
//             <p className="text-gray-600 text-xs md:text-sm">Verified</p>
//           </div>
//         </div>

//         {/* Logout Button */}
//         <button
//           onClick={() => setShowConfirm(true)}
//           className="flex absolute bottom-3 text-sm right-3 items-center gap-2 px-4 py-1 text-red-600 hover:text-red-800 transition-colors cursor-pointer rounded-sm border border-red-900"
//         >
//           <LogOut size={15} />
//           <span>Logout</span>
//         </button>
//       </div>

//       {/* Edit Profile Modal */}
//       <EditProfileModal
//         isOpen={isEditModalOpen}
//         onClose={() => setIsEditModalOpen(false)}
//         // profileData={profileData}
//         locationOptions={locationOptions}
//         industryOptions={industryOptions}
//         businessSizeOptions={businessSizeOptions}
//         error={error}
//         isLoading={isLoading}
//         onSave={handleSave}
//         onFieldChange={(field, value) =>
//           setProfileData((prev) => ({ ...prev, [field]: value }))
//         }
//       />

//       {/* Logout Confirmation */}
//       {/* <ConfirmationDialog
//         isOpen={showConfirm}
//         onClose={() => setShowConfirm(false)}
//         onConfirm={handleLogout}
//         title="Are you sure you want to logout?"
//         confirmText={isLogoutLoading ? "Logging out..." : "Logout"}
//         isLoading={isLogoutLoading}
//       /> */}
//     </div>
//   );
// }

// // Sub-components
// const ProfileImage = ({
//   image,
//   isUploading,
//   onUpload,
// }: {
//   image: string;
//   isUploading: boolean;
//   onUpload: (url: string) => void;
// }) => (
//   <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-4">
//     {image ? (
//       <>
//         <Image
//           src={image}
//           alt="Profile"
//           width={128}
//           height={128}
//           className="rounded-full object-cover w-full h-full"
//           priority
//         />
//         <div className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md">
//           <ImageUpload
//             onUpload={onUpload}
//             className="text-primary hover:text-primary-dark"
//           >
//             <Camera size={20} />
//           </ImageUpload>
//         </div>
//         {isUploading && (
//           <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-full">
//             <div className="w-16 h-16 border-4 border-t-primary border-transparent rounded-full animate-spin"></div>
//           </div>
//         )}
//       </>
//     ) : (
//       <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
//         <ImageUpload
//           onUpload={onUpload}
//           className="w-full h-full flex items-center justify-center"
//         >
//           <div className="text-center p-4">
//             <Camera size={32} className="mx-auto text-gray-400 mb-2" />
//             <span className="text-gray-500 text-sm">Upload Photo</span>
//           </div>
//         </ImageUpload>
//       </div>
//     )}
//   </div>
// );

// const EditProfileModal = ({
//   isOpen,
//   onClose,
//   // profileData,
//   locationOptions,
//   industryOptions,
//   businessSizeOptions,
//   error,
//   isLoading,
//   onSave,
//   onFieldChange,
// }: {
//   isOpen: boolean;
//   onClose: () => void;
//   // profileData: any;
//   locationOptions: string[];
//   industryOptions: string[];
//   businessSizeOptions: BusinessSize[];
//   error: string | null;
//   isLoading: boolean;
//   onSave: (e: React.FormEvent) => void;
//   onFieldChange: (field: string, value: string | boolean) => void;
// }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
//         <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white z-10">
//           <h2 className="text-xl font-semibold">Edit Business Profile</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700"
//             disabled={isLoading}
//           >
//             <X size={24} />
//           </button>
//         </div>
//         <form onSubmit={onSave} className="px-4 pt-6 md:px-6">
//           {error && (
//             <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
//               {error}
//             </div>
//           )}

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Company Name
//             </label>
//             <input
//               type="text"
//               value={profileData.companyName}
//               onChange={(e) => onFieldChange("companyName", e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//               disabled={isLoading}
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Industry
//             </label>
//             <select
//               value={profileData.industry}
//               onChange={(e) => onFieldChange("industry", e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//               disabled={isLoading}
//             >
//               <option value="">Select industry</option>
//               {industryOptions.map((industry) => (
//                 <option key={industry} value={industry}>
//                   {industry}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Business Phone
//             </label>
//             <input
//               type="tel"
//               value={profileData.businessPhone}
//               onChange={(e) => onFieldChange("businessPhone", e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//               disabled={isLoading}
//               placeholder="+251 123 456 789"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Business Size
//             </label>
//             <select
//               value={profileData.businessSize}
//               onChange={(e) =>
//                 onFieldChange("businessSize", e.target.value as BusinessSize)
//               }
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//               disabled={isLoading}
//             >
//               {businessSizeOptions.map((size) => (
//                 <option key={size} value={size}>
//                   {size.charAt(0).toUpperCase() + size.slice(1)}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Location
//             </label>
//             <select
//               value={profileData.location.split(",")[0] || ""}
//               onChange={(e) =>
//                 onFieldChange("location", `${e.target.value}, Ethiopia`)
//               }
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//               disabled={isLoading}
//             >
//               {locationOptions.map((loc) => (
//                 <option key={loc} value={loc}>
//                   {loc}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               About Your Business
//             </label>
//             <textarea
//               rows={4}
//               value={profileData.bio}
//               onChange={(e) => onFieldChange("bio", e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//               disabled={isLoading}
//               placeholder="Tell us about your business..."
//             />
//           </div>

//           <div className="flex items-center mb-4">
//             <input
//               type="checkbox"
//               id="businessVerified"
//               checked={profileData.businessVerified}
//               onChange={(e) =>
//                 onFieldChange("businessVerified", e.target.checked)
//               }
//               className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
//               disabled={isLoading}
//             />
//             <label
//               htmlFor="businessVerified"
//               className="ml-2 block text-sm text-gray-700"
//             >
//               Verified Business
//             </label>
//           </div>

//           <div className="flex items-center mb-6">
//             <input
//               type="checkbox"
//               id="onboarded"
//               checked={profileData.onboarded}
//               onChange={(e) => onFieldChange("onboarded", e.target.checked)}
//               className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
//               disabled={isLoading}
//             />
//             <label
//               htmlFor="onboarded"
//               className="ml-2 block text-sm text-gray-700"
//             >
//               Completed Onboarding
//             </label>
//           </div>

//           <div className="flex justify-end gap-3 sticky bottom-0 bg-white py-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50"
//               disabled={isLoading}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark flex items-center justify-center min-w-24"
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <>
//                   <Loader2 className="animate-spin mr-2 h-4 w-4" />
//                   Saving...
//                 </>
//               ) : (
//                 "Save Changes"
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
