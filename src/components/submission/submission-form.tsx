"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CldUploadWidget } from "next-cloudinary";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Image, Upload, X } from "lucide-react";

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

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  instagramHandle: z
    .string()
    .min(1, { message: "Instagram handle is required" })
    .refine((val) => val.startsWith("@"), {
      message: "Instagram handle must start with @",
    }),
  orderId: z.string().optional(),
  screenshot: z.string().min(1, { message: "Screenshot is required" }),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function SubmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
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

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    
    try {
      // In a real application, this would be an API call to your backend
      // For demo purposes, we're just simulating a successful submission
      console.log("Form data submitted:", data);
      
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast.success("Your submission has been received!", {
        description: "We'll review your post and email you within 48 hours.",
      });
      
      // Redirect to success page
      router.push("/submit/success?id=" + Math.random().toString(36).substring(2, 10));
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong", {
        description: "Please try again later or contact support.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleImageUpload(result: any) {
    const imageUrl = result.info.secure_url;
    setUploadedImage(imageUrl);
    form.setValue("screenshot", imageUrl);
    form.trigger("screenshot");
  }

  function removeUploadedImage() {
    setUploadedImage(null);
    form.setValue("screenshot", "");
    form.trigger("screenshot");
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
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
                    <Input placeholder="+91 9876543210" {...field} />
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
                    Your Instagram username starting with @
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
                    <Input placeholder="ORD123456" {...field} />
                  </FormControl>
                  <FormDescription>
                    If available, provide your order number for faster verification
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
                    <div className="flex flex-col items-center justify-center">
                      {!uploadedImage ? (
                        <CldUploadWidget
                          uploadPreset="instagram_promotion"
                          options={{
                            maxFiles: 1,
                            resourceType: "image",
                            maxFileSize: 5000000, // 5MB
                          }}
                          onSuccess={handleImageUpload}
                        >
                          {({ open }) => (
                            <div
                              onClick={() => open()}
                              className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center cursor-pointer hover:bg-muted/50 transition-colors flex flex-col items-center justify-center gap-2 w-full"
                            >
                              <Upload className="h-8 w-8 text-muted-foreground" />
                              <p className="text-sm text-muted-foreground font-medium">
                                Click to upload
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Max file size: 5MB
                              </p>
                              <input
                                type="hidden"
                                {...field}
                              />
                            </div>
                          )}
                        </CldUploadWidget>
                      ) : (
                        <div className="relative w-full">
                          <div className="relative aspect-square w-full max-w-md mx-auto rounded-lg overflow-hidden border border-border">
                            <img
                              src={uploadedImage}
                              alt="Instagram post screenshot"
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={removeUploadedImage}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>
                    Upload a screenshot showing your Instagram post with our product
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
                      I agree to keep my Instagram post visible for at least 30 days and allow the brand to use my post for promotional purposes.
                    </FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Your Post"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
} 