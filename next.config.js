/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    domains: ['res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: `/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/**`,
      },
    ],
  },
  // Enable experimental features needed for proper API handling
  experimental: {
    serverActions: true,
  },
  // Add security headers to allow Cloudinary's widget
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; img-src 'self' blob: data: https://res.cloudinary.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://upload-widget.cloudinary.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://api.cloudinary.com https://*.cloudinary.com data:; frame-src 'self' https://upload-widget.cloudinary.com",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig; 