"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;
    
    setIsLoading(false);
    
    // Only redirect to login if not on the login page already
    if (status === "unauthenticated" && !pathname.includes('/admin/login')) {
      router.push(`/admin/login?callbackUrl=${encodeURIComponent(pathname)}`);
    }
  }, [status, router, pathname]);

  if (isLoading || status === "loading") {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // If not authenticated and not on login page, don't render anything
  if (status === "unauthenticated" && !pathname.includes('/admin/login')) {
    return null;
  }

  // Render the login page directly if that's where we are
  if (pathname.includes('/admin/login')) {
    return children;
  }

  // Otherwise render the admin layout with sidebar
  return (
    <div className="flex min-h-screen bg-muted/30">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <div className="container py-6 px-4 md:px-6">
          {children}
        </div>
      </div>
    </div>
  );
} 