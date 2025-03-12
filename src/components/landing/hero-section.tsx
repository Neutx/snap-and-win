"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || "Your Brand";
  const couponValue = process.env.NEXT_PUBLIC_COUPON_VALUE || "₹200";
  const instagramHandle = process.env.NEXT_PUBLIC_BRAND_INSTAGRAM || "yourbrand";

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Share Your Setup, <span className="text-primary">Get {couponValue} Off</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Purchase from {brandName}, post on Instagram with #
              {instagramHandle}, and get {couponValue} off on your next order!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/submit">Submit Your Post</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#how-it-works">How It Works</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
            {/* Replace with your actual image */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 z-10 rounded-lg" />
            <Image
              src="/images/hero-image.jpg"
              alt="Instagram post example"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
} 