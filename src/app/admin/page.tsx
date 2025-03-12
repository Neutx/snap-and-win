"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle, 
  Clock, 
  XCircle, 
  Users, 
  Tag, 
  TrendingUp,
  BarChart
} from "lucide-react";
import { AdminHeader } from "@/components/admin/admin-header";
import { RecentSubmissions } from "@/components/admin/recent-submissions";

export default function AdminDashboard() {
  // In a real application, these would be fetched from an API
  const stats = {
    totalSubmissions: 124,
    pendingSubmissions: 18,
    approvedSubmissions: 92,
    rejectedSubmissions: 14,
    totalCoupons: 200,
    usedCoupons: 45,
    conversionRate: "48.9%",
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Dashboard"
        description="Overview of your Instagram promotion campaign"
      />

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
          <TabsTrigger value="coupons">Coupons</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Submissions
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalSubmissions}</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Review
                </CardTitle>
                <Clock className="h-4 w-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pendingSubmissions}</div>
                <p className="text-xs text-muted-foreground">
                  Requires your attention
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Approved
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.approvedSubmissions}</div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((stats.approvedSubmissions / stats.totalSubmissions) * 100)}% approval rate
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Rejected
                </CardTitle>
                <XCircle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.rejectedSubmissions}</div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((stats.rejectedSubmissions / stats.totalSubmissions) * 100)}% rejection rate
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Submission Trend</CardTitle>
                <CardDescription>
                  Number of submissions over time
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-muted-foreground flex flex-col items-center">
                  <BarChart className="h-16 w-16 mb-2" />
                  <p>Submission analytics chart will appear here</p>
                  <p className="text-sm">Connect to your data source</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Coupon Status</CardTitle>
                <CardDescription>
                  Available and used coupons
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Tag className="h-4 w-4 text-primary" />
                    <span className="text-sm">Total Coupons</span>
                  </div>
                  <span className="font-medium">{stats.totalCoupons}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Used Coupons</span>
                  </div>
                  <span className="font-medium">{stats.usedCoupons}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Conversion Rate</span>
                  </div>
                  <span className="font-medium">{stats.conversionRate}</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <RecentSubmissions />
        </TabsContent>
        
        <TabsContent value="submissions">
          <Card>
            <CardHeader>
              <CardTitle>Submission Details</CardTitle>
              <CardDescription>
                View more detailed submission statistics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                For detailed submission management, go to the Submissions page
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="coupons">
          <Card>
            <CardHeader>
              <CardTitle>Coupon Management</CardTitle>
              <CardDescription>
                View and manage your coupon inventory
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                For detailed coupon management, go to the Coupons page
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 