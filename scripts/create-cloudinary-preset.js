// This script creates or updates a Cloudinary upload preset for the Instagram promotion
// Run with: node scripts/create-cloudinary-preset.js

require('dotenv').config({ path: '.env.local' });
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

async function createUploadPreset() {
  try {
    // Check if the preset already exists
    const presets = await cloudinary.api.upload_presets();
    const presetExists = presets.some(preset => preset.name === 'instagram_promotion');
    
    // Create or update the upload preset
    if (presetExists) {
      console.log('Updating existing upload preset: instagram_promotion');
      await cloudinary.api.update_upload_preset('instagram_promotion', {
        folder: 'instagram_posts',
        allowed_formats: 'jpg,jpeg,png,gif',
        max_file_size: 5000000, // 5MB
        eager: [
          { width: 800, height: 800, crop: 'limit' } // Resize large images
        ],
        tags: ['instagram_post'],
        unsigned: false, // Require signatures for security
        callback: process.env.NEXTAUTH_URL 
          ? `${process.env.NEXTAUTH_URL}/api/uploadcallbacks`
          : 'http://localhost:3000/api/uploadcallbacks',
      });
    } else {
      console.log('Creating new upload preset: instagram_promotion');
      await cloudinary.api.create_upload_preset({
        name: 'instagram_promotion',
        folder: 'instagram_posts',
        allowed_formats: 'jpg,jpeg,png,gif',
        max_file_size: 5000000, // 5MB
        eager: [
          { width: 800, height: 800, crop: 'limit' } // Resize large images
        ],
        tags: ['instagram_post'],
        unsigned: false, // Require signatures for security
        callback: process.env.NEXTAUTH_URL 
          ? `${process.env.NEXTAUTH_URL}/api/uploadcallbacks`
          : 'http://localhost:3000/api/uploadcallbacks',
      });
    }
    
    console.log('Upload preset configured successfully!');
    console.log('You can now use this preset for secure image uploads.');
  } catch (error) {
    console.error('Error configuring upload preset:', error);
    process.exit(1);
  }
}

createUploadPreset(); 