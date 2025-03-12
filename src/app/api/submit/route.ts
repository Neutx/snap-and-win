import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

// Google Sheets credentials
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
const SHEET_NAME = 'Submissions';

async function getAuthClient() {
  try {
    const credentials = {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    };

    const auth = new google.auth.JWT(
      credentials.client_email,
      undefined,
      credentials.private_key,
      SCOPES
    );

    return auth;
  } catch (error) {
    console.error('Error creating auth client:', error);
    throw new Error('Failed to create auth client');
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    console.log("Received submission data:", data);

    const { fullName, phoneNumber, instagramHandle, orderId, screenshot, acceptTerms } = data;
    
    if (!fullName || !phoneNumber || !instagramHandle || !screenshot) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Prepare data for Google Sheets
    const submissionDate = new Date().toISOString();
    const submissionRow = [
      submissionDate,              // Timestamp
      fullName,                    // Full Name
      phoneNumber,                 // Phone Number
      instagramHandle,             // Instagram Handle
      orderId || 'Not provided',   // Order ID (optional)
      screenshot,                  // Screenshot URL
      'Pending',                   // Status
      '',                          // Admin Notes
      '',                          // Coupon Code (to be filled by admin)
      '',                          // Approval/Rejection Date
      '',                          // Approval/Rejection Notes
    ];
    
    // Connect to Google Sheets
    try {
      const auth = await getAuthClient();
      const sheets = google.sheets({ version: 'v4', auth });
      
      // Append data to the sheet
      const response = await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A:K`,
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        requestBody: {
          values: [submissionRow],
        },
      });
      
      console.log("Google Sheets update response:", response.data);
      
      // Generate a random submission ID
      const submissionId = Math.random().toString(36).substring(2, 10);
      
      return NextResponse.json({
        success: true,
        message: 'Submission received',
        submissionId,
      });
    } catch (error) {
      console.error('Google Sheets API error:', error);
      
      // Still return success to the user but log the error
      // In a production app, you might want to store the submission in a fallback system
      return NextResponse.json({
        success: true,
        message: 'Submission received, but there was an issue with data storage',
        submissionId: Math.random().toString(36).substring(2, 10),
      });
    }
  } catch (error) {
    console.error('Error processing submission:', error);
    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 }
    );
  }
} 