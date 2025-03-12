"use client";

import { useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onUploadStart?: () => void;
  onUploadComplete?: () => void;
  onUploadError?: (error: any) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onUploadStart,
  onUploadComplete,
  onUploadError,
  value
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [cloudName, setCloudName] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
    // Get the cloud name from environment variable
    setCloudName(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || null);
  }, []);

  const onUpload = (result: any) => {
    console.log("Upload event received:", result.event);
    console.log("Full upload result:", result);
    
    // We need to handle different events here, not just success
    if (result.event === "success") {
      // Handle successful upload
      if (result.info?.secure_url) {
        const imageUrl = result.info.secure_url;
        onChange(imageUrl);
        setIsUploading(false);
        onUploadComplete && onUploadComplete();
        toast.success("Image uploaded successfully");
      } else {
        console.error("Missing secure_url in success result", result);
        onUploadError && onUploadError(new Error("Invalid upload response"));
        setIsUploading(false);
        toast.error("Upload failed", {
          description: "Invalid response from upload service"
        });
      }
    } else if (result.event === "close" && isUploading) {
      // If the widget closes while still uploading, it's likely an error
      console.warn("Widget closed while upload was in progress");
      setIsUploading(false);
      onUploadError && onUploadError(new Error("Upload cancelled or failed"));
    } else if (result.event === "queues-end") {
      // All files have been processed, even if not all succeeded
      console.log("Queue ended, checking for completed uploads");
      
      // If we have a public_id but no success event, try to construct the URL ourselves
      if (result.info && result.info.files && result.info.files.length > 0) {
        const file = result.info.files[0];
        if (file.uploadInfo && file.uploadInfo.public_id && !value && cloudName) {
          // Construct URL from public_id
          const format = file.uploadInfo.format || 'jpg';
          const publicId = file.uploadInfo.public_id;
          const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}.${format}`;
          
          console.log("Constructed URL from public_id:", imageUrl);
          onChange(imageUrl);
          setIsUploading(false);
          onUploadComplete && onUploadComplete();
          toast.success("Image upload detected and processed");
        }
      }
    }
  };

  const onError = (error: any) => {
    console.error("Upload error:", error);
    setIsUploading(false);
    onUploadError && onUploadError(error);
    toast.error("Upload failed", {
      description: "Please try again or use a different image"
    });
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-center">
        {value && (
          <div className="relative aspect-square w-full max-w-[200px]">
            <div className="relative aspect-square w-full overflow-hidden rounded-md border border-border">
              <img
                className="object-cover w-full h-full"
                alt="Image upload"
                src={value}
              />
            </div>
            <div className="absolute right-0 top-0">
              <Button
                type="button"
                onClick={() => onChange("")}
                variant="destructive"
                size="icon"
                disabled={disabled}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
      {!value && (
        <div className="flex flex-col items-center justify-center">
          <CldUploadWidget
            uploadPreset="instagram_promotion"
            options={{
              maxFiles: 1,
              resourceType: "image",
              clientAllowedFormats: ["jpg", "jpeg", "png", "gif"],
              maxFileSize: 5000000, // 5MB
              showUploadMoreButton: false,
              singleUploadAutoClose: false, // Prevent auto-closing
              autoMinimize: false, // Don't auto-minimize
              showAdvancedOptions: false,
              sources: ["local", "url", "camera"],
              folder: "instagram_posts",
              tags: ["instagram", "user_upload"],
              context: { alt: "Instagram post screenshot" },
              styles: {
                palette: {
                  window: "#ffffff",
                  windowBorder: "#90a0b3",
                  tabIcon: "#0078ff",
                  menuIcons: "#5a616a",
                  textDark: "#000000",
                  textLight: "#ffffff",
                  link: "#0078ff",
                  action: "#ff620c",
                  inactiveTabIcon: "#0e2f5a",
                  error: "#ff0000",
                  inProgress: "#0078ff",
                  complete: "#20b832",
                  sourceBg: "#f4f5f5"
                },
                fonts: {
                  default: null,
                  "'Poppins', sans-serif": {
                    url: "https://fonts.googleapis.com/css?family=Poppins",
                    active: true
                  }
                }
              }
            }}
            onUpload={onUpload}
            onError={onError}
            onOpen={() => {
              setIsUploading(true);
              onUploadStart && onUploadStart();
            }}
            onClose={() => {
              console.log("Widget closed");
              if (isUploading) {
                setIsUploading(false);
                onUploadComplete && onUploadComplete();
              }
            }}
          >
            {({ open }) => {
              return (
                <Button
                  type="button"
                  disabled={disabled || isUploading}
                  variant="outline"
                  onClick={() => open()}
                  className="w-full border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center hover:bg-muted/50 transition-colors flex flex-col items-center justify-center gap-2"
                >
                  {isUploading ? (
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                      <p className="text-sm text-muted-foreground font-medium">
                        Uploading...
                      </p>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground font-medium">
                        Click to upload
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Max file size: 5MB
                      </p>
                    </>
                  )}
                </Button>
              );
            }}
          </CldUploadWidget>
        </div>
      )}
    </div>
  );
};

export default ImageUpload; 