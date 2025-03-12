# Instagram Tag Promotion Website

A complete website system for a D2C brand promotion where customers who purchase products and post photos on Instagram (tagging the brand) receive a ₹200 discount coupon. The system handles user submissions, admin verification, and automated email responses with coupons.

## Features

- **User-Facing Frontend**
  - Responsive design for mobile and desktop
  - Clean, modern aesthetic with brand identity
  - Simple, intuitive user flow
  - Form for submitting Instagram posts with validation

- **Admin Backend**
  - Secure admin login system
  - Dashboard with statistics and overview
  - Submission management interface
  - Approval/rejection workflow

- **Email Automation**
  - Custom email templates for approvals and rejections
  - Automated dispatch based on admin actions

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: Google Sheets API
- **Authentication**: NextAuth.js
- **Email**: Resend
- **Image Upload**: Cloudinary

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Google Sheets API credentials
- Cloudinary account
- Resend API key

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/snap-and-win.git
   cd snap-and-win
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   Create a `.env.local` file in the root directory with the following variables:
   ```
   # Next Auth
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-nextauth-secret-key-change-this-in-production

   # Email (Resend)
   RESEND_API_KEY=your-resend-api-key

   # Google Sheets API
   GOOGLE_SHEETS_CLIENT_EMAIL=your-service-account-email
   GOOGLE_SHEETS_PRIVATE_KEY=your-private-key
   GOOGLE_SHEETS_SPREADSHEET_ID=your-spreadsheet-id

   # Upload settings
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret

   # Brand settings
   NEXT_PUBLIC_BRAND_NAME="Your Brand Name"
   NEXT_PUBLIC_BRAND_INSTAGRAM="yourbrand"
   NEXT_PUBLIC_COUPON_VALUE="₹200"
   ```

4. Run the development server
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Admin Access

- URL: [http://localhost:3000/admin](http://localhost:3000/admin)
- Default credentials:
  - Email: admin@example.com
  - Password: password123

## Project Structure

- `/src/app` - Next.js App Router pages
- `/src/components` - React components
  - `/ui` - UI components from shadcn
  - `/landing` - Landing page components
  - `/admin` - Admin dashboard components
  - `/submission` - Submission form components
- `/src/lib` - Utility functions and libraries
- `/public` - Static assets

## Deployment

This application can be deployed on Vercel, Netlify, or any other platform that supports Next.js.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
