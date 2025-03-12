"use client";

import { CalendarDays } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Timeline() {
  const startDate = "February 1, 2024";
  const endDate = "December 31, 2024";

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Promotion Timeline</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our Instagram promotion is running for a limited time. Don&apos;t miss your chance!
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white border border-border rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-full text-primary">
              <CalendarDays className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Promotion Period</h3>
              <p className="text-muted-foreground">
                Valid for purchases and posts made during this period
              </p>
            </div>
          </div>
          
          <Separator />
          
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">Starts</h4>
              <p className="text-lg font-semibold">{startDate}</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">Ends</h4>
              <p className="text-lg font-semibold">{endDate}</p>
            </div>
          </div>
          
          <div className="bg-muted/50 p-4 text-sm text-muted-foreground">
            <p>
              * Submissions must be received within 30 days of your purchase. Coupon codes are valid for 90 days after issuance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 