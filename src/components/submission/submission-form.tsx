"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { DualUpload } from "@/components/dual-upload";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { DirectUpload } from "@/components/direct-upload";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Phone number must include country code and number.",
  }),
  instagramHandle: z.string().min(1, {
    message: "Instagram handle is required.",
  }).refine(handle => handle.startsWith('@') || handle.startsWith('https://'), {
    message: "Please include @ at the beginning of your handle or provide a full Instagram URL.",
  }),
  orderId: z.string().optional(),
  screenshot: z.string().min(1, {
    message: "Screenshot is required. Please upload an image.",
  }),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function SubmissionForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [submissionId, setSubmissionId] = useState("");
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      instagramHandle: "@",
      orderId: "",
      screenshot: "",
      acceptTerms: false,
    },
  });

  const handleImageChange = (value: string) => {
    setUploadError("");
    form.setValue("screenshot", value, { 
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      console.log("Submitting form data:", values);
      
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      
      const result = await response.json();
      console.log("Submission result:", result);
      
      if (!response.ok) {
        throw new Error(result.error || "Failed to submit form");
      }
      
      // Store submission ID and show success screen
      setSubmissionId(result.submissionId);
      setSuccessful(true);
      toast.success("Submission received!", {
        description: "We'll review your submission and get back to you soon."
      });
      
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Submission failed", {
        description: "Please try again or contact support."
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form on successful submission
  useEffect(() => {
    if (successful) {
      form.reset();
    }
  }, [successful, form]);

  // Success screen component
  const SuccessScreen = () => (
    <div className="flex flex-col items-center justify-center space-y-6 p-8 text-center">
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
        <CheckCircle2 className="h-12 w-12 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold">Submission Received!</h2>
      <p className="text-gray-600 max-w-md">
        Thank you for your submission. Our team will review your post and send your discount coupon within 48 hours.
      </p>
      {submissionId && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <p className="text-sm text-gray-500">Your submission ID</p>
          <p className="font-mono font-bold">{submissionId}</p>
        </div>
      )}
      <div className="mt-6">
        <Button onClick={() => setSuccessful(false)}>Submit Another Entry</Button>
      </div>
    </div>
  );

  if (successful) {
    return <SuccessScreen />;
  }

  return (
    <Card>
      <CardContent className="pt-6">
        {uploadError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Upload Error</AlertTitle>
            <AlertDescription>
              {uploadError}
            </AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+91 1234567890" {...field} />
                  </FormControl>
                  <FormDescription>
                    Include your country code (e.g., +91 for India)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="instagramHandle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram Handle</FormLabel>
                  <FormControl>
                    <Input placeholder="@yourusername" {...field} />
                  </FormControl>
                  <FormDescription>
                    Please include the @ symbol
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="orderId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order ID (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Your order confirmation number" {...field} />
                  </FormControl>
                  <FormDescription>
                    This helps us verify your purchase
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="screenshot"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram Post Screenshot</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      {!field.value ? (
                        <DirectUpload
                          disabled={isLoading}
                          onChange={handleImageChange}
                          onUploadError={(error) => setUploadError("Upload failed: " + error.message)}
                        />
                      ) : (
                        <div className="relative">
                          <img 
                            src={field.value} 
                            alt="Uploaded screenshot" 
                            className="w-full max-h-80 object-contain rounded-md border" 
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => form.setValue("screenshot", "")}
                          >
                            Remove
                          </Button>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>
                    Upload a screenshot of your Instagram post tagging our brand
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="acceptTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I accept the terms and conditions
                    </FormLabel>
                    <FormDescription>
                      By checking this box, you agree to our terms and allow us to use your image for promotional purposes.
                    </FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Submitting..." : "Submit Entry"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
} 