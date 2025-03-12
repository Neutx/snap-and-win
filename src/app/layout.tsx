import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { Suspense } from "react";
import { AuthProvider } from "@/components/providers/auth-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Snap and Win | Post on Instagram & Get ₹200 Off",
  description: "Purchase our products, post on Instagram with our tag, and get ₹200 off on your next purchase!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}>
        <AuthProvider>
          <Suspense fallback={null}>
            {children}
            <Toaster position="top-right" closeButton />
          </Suspense>
        </AuthProvider>
      </body>
    </html>
  );
}
