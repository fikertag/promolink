"use client";
import React from "react";
import { Loader2, X } from "lucide-react";

export interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  error: string | null;
  companyName: string;
  setCompanyName: (v: string) => void;
  industry: string;
  setIndustry: (v: string) => void;
  businessPhone: string;
  setBusinessPhone: (v: string) => void;
  businessSize: string;
  setBusinessSize: (v: string) => void;
  location: string;
  setLocation: (v: string) => void;
  locationOptions: string[];
  bio: string;
  setBio: (v: string) => void;
}

export default function EditProfileModal(props: EditProfileModalProps) {
  const {
    open,
    onClose,
    onSubmit,
    isLoading,
    error,
    companyName,
    setCompanyName,
    industry,
    setIndustry,
    businessPhone,
    setBusinessPhone,
    businessSize,
    setBusinessSize,
    location,
    setLocation,
    locationOptions,
    bio,
    setBio,
  } = props;

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto container12 ">
        <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold">Edit Business Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            disabled={isLoading}
          >
            <X size={24} />
          </button>
        </div>
        <form onSubmit={onSubmit} className="px-4 pt-6 md:px-6">
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={isLoading}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Business Phone</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Business Size</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
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
              onClick={onClose}
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
  );
}
