"use client";

import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AdminHeaderProps {
  title: string;
  description?: string;
}

export function AdminHeader({ title, description }: AdminHeaderProps) {
  const { data: session } = useSession();
  const user = session?.user;
  
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="text-sm font-medium leading-none">{user?.name || "Admin User"}</p>
          <p className="text-sm text-muted-foreground">{user?.email || "admin@example.com"}</p>
        </div>
        <Avatar>
          <AvatarImage src={user?.image || ""} alt={user?.name || "Admin"} />
          <AvatarFallback>
            {user?.name
              ? user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
              : "AU"}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
} 