"use client";
import React from "react";
import { Loader2, LogOut } from "lucide-react";

export interface ConfirmLogoutModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

export default function ConfirmLogoutModal({
  open,
  onCancel,
  onConfirm,
  isLoading,
}: ConfirmLogoutModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className=" mt-2 w-72 bg-white rounded-md shadow-lg p-4 border border-gray-200 z-50">
        <p className="text-gray-700 mb-4">Are you sure you want to logout?</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex items-center gap-1 px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors cursor-pointer"
          >
            {isLoading ? (
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
  );
}
