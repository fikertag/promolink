"use client";
import { useState } from "react";

type ImageUploadProps = {
  onUpload: (url: string) => void;
  onProgress?: (progress: number) => void;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
};

export default function ImageUpload({
  onUpload,
  onProgress,
  className = "",
  children,
  disabled = false,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    setIsUploading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      onUpload(data.url);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
      onProgress?.(0);
    }
  };

  return (
    <div className={className}>
      <label
        className={`cursor-pointer ${
          isUploading || disabled ? "opacity-50" : ""
        }`}
      >
        {children || <div>{isUploading ? "Uploading..." : "Upload Image"}</div>}
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
          disabled={isUploading || disabled}
        />
      </label>
    </div>
  );
}
