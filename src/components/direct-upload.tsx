"use client";

import { useState, useRef } from "react";
import { Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface DirectUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onUploadStart?: () => void;
  onUploadComplete?: () => void;
  onUploadError?: (error: any) => void;
}

export function DirectUpload({
  disabled = false,
  onChange,
  onUploadStart,
  onUploadComplete,
  onUploadError
}: DirectUploadProps) {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = "instagram_promotion";
  const folderName = "instagram_posts";

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log("Selected file:", file.name, file.type, file.size);

    // File size validation (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large", {
        description: "Maximum file size is 5MB"
      });
      return;
    }

    // Only allow certain file types
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type", {
        description: "Please upload a JPG, PNG or GIF image"
      });
      return;
    }

    setLoading(true);
    onUploadStart?.();

    try {
      // Create FormData for direct upload to Cloudinary
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);
      formData.append('cloud_name', cloudName || '');
      formData.append('folder', folderName);

      console.log("Starting direct upload to Cloudinary");
      
      // Direct upload to Cloudinary API
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      console.log("Upload response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Upload failed with status:", response.status, errorText);
        throw new Error(`Upload failed: ${response.status} ${errorText}`);
      }

      const result = await response.json();
      console.log("Upload result:", result);
      
      if (result.secure_url) {
        console.log("Upload successful, URL:", result.secure_url);
        onChange(result.secure_url);
        onUploadComplete?.();
        toast.success("Image uploaded successfully", {
          description: `Saved to Cloudinary folder: ${folderName}`
        });
      } else {
        throw new Error('No secure URL in response');
      }
    } catch (error) {
      console.error("Upload error:", error);
      onUploadError?.(error);
      toast.error("Upload failed", {
        description: "Please try again or use a different image"
      });
    } finally {
      setLoading(false);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <input
        type="file"
        accept="image/png, image/jpeg, image/gif"
        className="hidden"
        onChange={handleFileChange}
        ref={fileInputRef}
        disabled={disabled || loading}
      />

      <Button
        type="button"
        variant="outline"
        disabled={disabled || loading}
        onClick={handleButtonClick}
        className="w-full border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:bg-muted/50 transition-colors flex flex-col items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span>Uploading...</span>
            <p className="text-xs text-muted-foreground">
              Please wait while your image is uploaded
            </p>
          </>
        ) : (
          <>
            <Upload className="h-8 w-8 text-muted-foreground" />
            <span>Click to upload image</span>
            <p className="text-xs text-muted-foreground">
              JPG, PNG or GIF. Max 5MB.
            </p>
          </>
        )}
      </Button>
    </div>
  );
} 