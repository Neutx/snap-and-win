import { Metadata } from "next";
import { SubmissionForm } from "@/components/submission/submission-form";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";

export const metadata: Metadata = {
  title: "Submit Your Instagram Post | Snap and Win",
  description: "Submit your Instagram post to receive a discount coupon for your next purchase.",
};

export default function SubmitPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Submit Your Instagram Post</h1>
            <p className="text-muted-foreground">
              Fill out the form below to submit your Instagram post and receive your discount coupon.
            </p>
          </div>
          
          <SubmissionForm />
        </div>
      </div>
      <Footer />
    </>
  );
} 