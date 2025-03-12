# Google Sheets Integration Setup Guide

This guide will help you set up the Google Sheets integration for the Instagram Promotion app.

## Step 1: Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note down your Project ID

## Step 2: Enable the Google Sheets API

1. In your Google Cloud project, go to "APIs & Services" > "Library"
2. Search for "Google Sheets API" and enable it
3. Also enable "Google Drive API" as it's required for Sheets access

## Step 3: Create a Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" and select "Service Account"
3. Fill in the service account details (name, description)
4. For role, select "Project" > "Editor" (or a more restricted role if preferred)
5. Click "Done"

## Step 4: Generate Service Account Key

1. In the Service Accounts list, find the one you just created
2. Click on the three dots at the end of the row and select "Manage keys"
3. Click "Add Key" > "Create new key"
4. Select JSON format and click "Create"
5. Save the downloaded JSON file securely

## Step 5: Set up Environment Variables

Extract the following values from your downloaded JSON key file:

1. `client_email` - Copy this value to the `GOOGLE_SHEETS_CLIENT_EMAIL` environment variable
2. `private_key` - Copy this value to the `GOOGLE_SHEETS_PRIVATE_KEY` environment variable

Add these to your `.env.local` file:

```
GOOGLE_SHEETS_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYourPrivateKeyHere\n-----END PRIVATE KEY-----\n"
```

## Step 6: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Rename it to something like "Instagram Promotion Submissions"
3. Create the following sheets (tabs):
   - "Submissions" - Main data with columns for all submission data
   - "Coupons" - List of available coupon codes
   - "Config" - Configuration settings
4. Share the spreadsheet with your service account email (with Editor permissions)
5. Copy the spreadsheet ID from the URL (the long string between /d/ and /edit in the URL)
6. Add this ID to your `.env.local` file:

```
GOOGLE_SHEETS_SPREADSHEET_ID=your-spreadsheet-id
```

## Step 7: Set up the Submissions Sheet

Set up the Submissions sheet with these columns:

1. Timestamp
2. Full Name
3. Phone Number
4. Instagram Handle
5. Order ID
6. Screenshot URL
7. Status (Pending/Approved/Rejected)
8. Admin Notes
9. Coupon Code
10. Approval/Rejection Date
11. Approval/Rejection Notes

## Step 8: Set up the Coupons Sheet

Set up the Coupons sheet with these columns:

1. Coupon Code
2. Value
3. Expiry Period (days)
4. Status (Available/Used/Expired)
5. Used Date
6. Assigned To (Submission ID)

## Troubleshooting

If you encounter issues with the integration:

1. Verify the service account has Editor access to the spreadsheet
2. Check that all environment variables are correctly set
3. Ensure the private key is properly formatted with newline characters
4. Verify the spreadsheet ID is correct
5. Check server logs for detailed error messages

## Testing the Integration

After setup, submit a test entry through the form and verify that:

1. The data appears in the Submissions sheet
2. The status is set to "Pending"
3. The timestamp is correctly recorded 