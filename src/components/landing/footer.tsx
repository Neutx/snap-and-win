"use client";

import Link from "next/link";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || "Your Brand";
  const instagramHandle = process.env.NEXT_PUBLIC_BRAND_INSTAGRAM || "yourbrand";
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">{brandName}</h3>
            <p className="text-muted-foreground mb-4">
              Share your Kreo-Setup on Instagram and get rewarded with exclusive discounts.
            </p>
            <div className="flex space-x-4">
              <Link
                href={`https://instagram.com/${instagramHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/submit"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Submit Your Post
                </Link>
              </li>
              <li>
                <Link
                  href="#faq"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-muted-foreground mb-2">
              Have questions about the promotion?
            </p>
            <Link
              href="mailto:support@yourbrand.com"
              className="text-primary hover:underline"
            >
              support@yourbrand.com
            </Link>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} {brandName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 