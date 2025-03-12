"use client";

import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Instagram, Share2 } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const submissionId = searchParams.get("id") || "UNKNOWN";
  const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || "Your Brand";
  const instagramHandle = process.env.NEXT_PUBLIC_BRAND_INSTAGRAM || "yourbrand";

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Card className="border-green-200 bg-green-50/50">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-green-800">
                Submission Successful!
              </CardTitle>
              <CardDescription className="text-green-700">
                Your Instagram post has been submitted for review.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-6 mt-2 space-y-4 text-sm text-muted-foreground">
                <p>
                  <strong>Submission ID:</strong> {submissionId}
                </p>
                <p>
                  Our team will review your submission within 48 hours. Once approved, 
                  we'll email you a coupon code for your next purchase.
                </p>
                <p>
                  Make sure to check your email inbox (and spam folder) for updates.
                </p>
              </div>

              <div className="mt-8 space-y-4">
                <h3 className="text-lg font-medium">Follow Us on Social Media</h3>
                <div className="flex justify-center gap-4">
                  <Button variant="outline" size="sm" asChild>
                    <Link
                      href={`https://instagram.com/${instagramHandle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Instagram className="h-4 w-4" />
                      Follow on Instagram
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        `https://yourbrand.com/promotion`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Share2 className="h-4 w-4" />
                      Share Promotion
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="mt-8">
                <Button asChild>
                  <Link href="/">Return to Home</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
} 