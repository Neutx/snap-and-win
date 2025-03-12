import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { google } from "googleapis";

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

export async function GET(request: NextRequest) {
  try {
    // Verify the user is authenticated and is an admin
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Connect to Google Sheets
    const auth = await getAuthClient();
    const sheets = google.sheets({ version: 'v4', auth });
    
    // Fetch data from the submissions sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:K`,
    });
    
    const rows = response.data.values || [];
    
    // Skip the header row if it exists
    const dataRows = rows.length > 0 ? rows.slice(1) : [];
    
    // Transform the data into a more usable format
    const submissions = dataRows.map((row, index) => {
      return {
        id: index + 1, // Use row index as ID
        timestamp: row[0] || '',
        fullName: row[1] || '',
        phoneNumber: row[2] || '',
        instagramHandle: row[3] || '',
        orderId: row[4] || '',
        screenshot: row[5] || '',
        status: row[6] || 'Pending',
        notes: row[7] || '',
        couponCode: row[8] || '',
        processingDate: row[9] || '',
        processingNotes: row[10] || '',
      };
    });
    
    return NextResponse.json({
      success: true,
      submissions,
    });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
} 