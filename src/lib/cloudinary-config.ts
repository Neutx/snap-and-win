"use client";

// This file configures the next-cloudinary package

export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  uploadPreset: 'instagram_promotion', // Create this preset in your Cloudinary dashboard
  apiKey: process.env.CLOUDINARY_API_KEY,
  folder: 'instagram_posts',
  // Add a callback URL for notifications about upload status
  callbackUrl: typeof window !== 'undefined' 
    ? `${window.location.origin}/api/uploadcallbacks` 
    : 'http://localhost:3000/api/uploadcallbacks',
  // Fix for certain upload issues
  clientAllowedFormats: ['jpg', 'jpeg', 'png', 'gif'],
  maxFileSize: 5000000, // 5MB
  maxImageWidth: 2000, // Reasonable max width
  maxImageHeight: 2000, // Reasonable max height
  sources: ['local', 'camera', 'url'],
  multiple: false,
  // Use secure connection
  secure: true,
}; 