"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { DirectUpload } from "./direct-upload";

interface SingleUploadProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function DualUpload({ value, onChange, disabled = false }: SingleUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  
  // Display the uploaded image if there is one
  if (value) {
    return (
      <div className="relative w-full">
        <div className="relative aspect-video w-full max-w-lg mx-auto rounded-lg overflow-hidden border border-muted">
          <img
            src={value}
            alt="Uploaded image"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute top-2 right-2 flex gap-2">
          <Button
            type="button"
            size="icon"
            variant="destructive"
            onClick={() => {
              onChange("");
              toast.info("Image removed");
            }}
            disabled={disabled || isUploading}
            title="Remove image"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  // Handle upload events
  const handleUploadStart = () => {
    console.log("Upload started");
    setIsUploading(true);
    toast.info("Uploading image...");
  };

  const handleUploadComplete = () => {
    console.log("Upload completed");
    setIsUploading(false);
  };

  const handleUploadError = (error: any) => {
    console.error("Upload error:", error);
    setIsUploading(false);
    
    toast.error("Upload failed", {
      description: "Please try again or use a different image"
    });
  };

  return (
    <DirectUpload
      onChange={(url) => {
        onChange(url);
        if (url) {
          setIsUploading(false);
          toast.success("Image uploaded successfully");
        }
      }}
      disabled={disabled || isUploading}
      onUploadStart={handleUploadStart}
      onUploadComplete={handleUploadComplete}
      onUploadError={handleUploadError}
    />
  );
} 