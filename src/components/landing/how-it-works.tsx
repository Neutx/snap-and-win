"use client";

import { ShoppingBag, Camera, Instagram, Mail } from "lucide-react";

export function HowItWorks() {
  const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || "Your Brand";
  const couponValue = process.env.NEXT_PUBLIC_COUPON_VALUE || "₹200";
  const instagramHandle = process.env.NEXT_PUBLIC_BRAND_INSTAGRAM || "yourbrand";

  const steps = [
    {
      icon: <ShoppingBag className="h-8 w-8" />,
      title: "Purchase",
      description: `Buy any product from ${brandName}.`,
    },
    {
      icon: <Camera className="h-8 w-8" />,
      title: "Snap",
      description: "Take a photo with your new product.",
    },
    {
      icon: <Instagram className="h-8 w-8" />,
      title: "Post",
      description: `Share it on Instagram and tag @${instagramHandle}.`,
    },
    {
      icon: <Mail className="h-8 w-8" />,
      title: "Receive",
      description: `Submit your post and get a ${couponValue} coupon for your next purchase.`,
    },
  ];

  return (
    <section className="py-12 bg-muted/50" id="how-it-works">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Follow these simple steps to get your {couponValue} discount on your next purchase.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border border-border flex flex-col items-center text-center"
            >
              <div className="bg-primary/10 p-4 rounded-full mb-4 text-primary">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 