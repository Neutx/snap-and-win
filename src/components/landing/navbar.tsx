"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || "Your Brand";
  
  const isActive = (path: string) => pathname === path;
  
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/submit", label: "Submit Entry" },
    { href: "/faq", label: "FAQ" },
  ];

  return (
    <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold">
            {brandName}
          </Link>
        </div>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors hover:text-primary ${
                isActive(link.href) ? "font-medium text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild>
            <Link href="/submit">Submit Your Post</Link>
          </Button>
        </div>
        
        {/* Mobile navigation */}
        <div className="md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-lg py-2 transition-colors hover:text-primary ${
                      isActive(link.href) ? "font-medium text-primary" : "text-muted-foreground"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Button asChild className="mt-4">
                  <Link href="/submit" onClick={() => setIsMenuOpen(false)}>
                    Submit Your Post
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
} 