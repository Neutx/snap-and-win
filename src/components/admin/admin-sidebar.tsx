"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { 
  LayoutDashboard, 
  ListChecks, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  Tag,
  BarChart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  
  const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || "Your Brand";
  
  const navItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Submissions",
      href: "/admin/submissions",
      icon: <ListChecks className="h-5 w-5" />,
    },
    {
      title: "Coupons",
      href: "/admin/coupons",
      icon: <Tag className="h-5 w-5" />,
    },
    {
      title: "Analytics",
      href: "/admin/analytics",
      icon: <BarChart className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  const isActive = (path: string) => {
    if (path === "/admin" && pathname === "/admin") {
      return true;
    }
    return pathname.startsWith(path) && path !== "/admin";
  };

  return (
    <div
      className={`relative flex flex-col border-r bg-card transition-all duration-300 ${
        collapsed ? "w-[70px]" : "w-[240px]"
      }`}
    >
      <div className="flex h-16 items-center px-4">
        <Link
          href="/admin"
          className={`flex items-center gap-2 font-semibold ${
            collapsed ? "justify-center" : ""
          }`}
        >
          {!collapsed && (
            <span className="text-xl font-bold truncate">{brandName}</span>
          )}
          {collapsed && <span className="text-xl font-bold">YB</span>}
        </Link>
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-6 h-6 w-6 rounded-full border bg-background"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </Button>
      
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                isActive(item.href)
                  ? "bg-muted text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              } ${collapsed ? "justify-center" : ""}`}
            >
              {item.icon}
              {!collapsed && <span>{item.title}</span>}
            </Link>
          ))}
        </nav>
      </div>
      
      <Separator />
      
      <div className="p-2">
        <Button
          variant="ghost"
          className={`w-full justify-start text-muted-foreground hover:text-foreground ${
            collapsed ? "justify-center px-0" : ""
          }`}
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span className="ml-2">Log out</span>}
        </Button>
      </div>
    </div>
  );
} 