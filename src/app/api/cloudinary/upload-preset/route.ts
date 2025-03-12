import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function GET(request: NextRequest) {
  try {
    // Create a very simple upload preset with minimal configuration
    try {
      console.log('Creating simple upload preset...');
      
      // Delete the preset if it exists (to avoid conflicts)
      try {
        await cloudinary.api.delete_upload_preset('instagram_promotion');
        console.log('Deleted existing preset');
      } catch (err) {
        console.log('No existing preset to delete or error deleting:', err);
      }
      
      // Create a new preset with minimal settings
      await cloudinary.api.create_upload_preset({
        name: 'instagram_promotion',
        unsigned: true,
        folder: 'instagram_posts',
      });
      
      return NextResponse.json({ 
        success: true, 
        message: 'Upload preset created successfully',
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
      });
    } catch (error) {
      console.error('Error creating preset:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error configuring upload preset:', error);
    return NextResponse.json(
      { 
        error: 'Failed to configure upload preset', 
        details: JSON.stringify(error, null, 2) 
      },
      { status: 500 }
    );
  }
} 